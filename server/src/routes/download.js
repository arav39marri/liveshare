import express from "express";
import { firestore, storage } from "../config/firebaseAdmin.js";

const router = express.Router();

function safeFilename(name) {
  const fallback = "download";
  const str = String(name || fallback);
  return str.replace(/[\r\n"]/g, "_");
}

router.get("/:id", async (req, res, next) => {
  try {
    const id = String(req.params.id || "");

    const db = firestore();
    const snap = await db
      .collectionGroup("files")
      .where("fileId", "==", id)
      .limit(1)
      .get();

    if (snap.empty) {
      return res.status(404).json({ error: "File not found" });
    }

    const file = snap.docs[0].data() || {};
    const expiresAt = file.expiresAt?.toDate ? file.expiresAt.toDate() : file.expiresAt;
    if (expiresAt && expiresAt <= new Date()) {
      return res.status(410).json({ error: "File expired" });
    }

    const storagePath = file.storagePath;
    if (!storagePath) {
      const err = new Error("File storage path missing");
      err.statusCode = 500;
      throw err;
    }

    const filename = safeFilename(file.original_filename || file.fileName);
    const contentType = file.contentType || file.fileType || "application/octet-stream";

    res.setHeader("Content-Type", contentType);
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

    const bucket = storage().bucket();
    const fileRef = bucket.file(storagePath);
    fileRef
      .createReadStream()
      .on("error", (e) => {
        const err = new Error("Storage read failed");
        err.statusCode = 502;
        err.cause = e;
        next(err);
      })
      .pipe(res);
  } catch (err) {
    next(err);
  }
});

export default router;
