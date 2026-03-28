import express from "express";

import { upload } from "../middleware/multer.js";
import { generateOtp, isValidOtp } from "../utils/otp.js";
import { firestore, storage } from "../config/firebaseAdmin.js";

const router = express.Router();

function safePart(str) {
  return String(str || "file").replace(/[^a-zA-Z0-9._-]/g, "_");
}

function ttlHours() {
  const hours = process.env.OTP_TTL_HOURS ? Number(process.env.OTP_TTL_HOURS) : 24;
  return Number.isFinite(hours) && hours > 0 ? hours : 24;
}

function computeExpiresAt() {
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + ttlHours());
  return expiresAt;
}

async function createUniqueOtp() {
  const db = firestore();
  for (let i = 0; i < 10; i++) {
    const otp = generateOtp();
    const snap = await db.collection("rooms").doc(otp).get();
    if (!snap.exists) return otp;
  }
  const err = new Error("Failed to generate OTP");
  err.statusCode = 500;
  throw err;
}

async function handleUploadToOtp({ otp, files }) {
  const db = firestore();
  const bucket = storage().bucket();

  const roomRef = db.collection("rooms").doc(otp);
  const roomSnap = await roomRef.get();
  if (!roomSnap.exists) {
    const err = new Error("OTP not found");
    err.statusCode = 404;
    throw err;
  }

  const room = roomSnap.data() || {};
  const expiresAt = room.expiresAt?.toDate ? room.expiresAt.toDate() : room.expiresAt;
  if (expiresAt && expiresAt <= new Date()) {
    const err = new Error("OTP expired");
    err.statusCode = 410;
    throw err;
  }

  const uploadedAt = new Date();

  const uploaded = [];
  for (const f of files) {
    const originalName = f.originalname || "file";
    const storedName = `${Date.now()}_${safePart(originalName)}`;
    const storagePath = `rooms/${otp}/${storedName}`;

    const contentType = f.mimetype || "application/octet-stream";
    const size = Number.isFinite(f.size) ? f.size : undefined;

    const fileRef = bucket.file(storagePath);
    await fileRef.save(f.buffer, {
      contentType,
      resumable: false,
      metadata: {
        contentType,
        metadata: {
          otp,
          originalName,
        },
      },
    });

    const docRef = roomRef.collection("files").doc();
    const fileId = docRef.id;
    await docRef.set({
      fileId,
      otp,
      original_filename: originalName,
      fileName: originalName,
      fileSize: size,
      fileType: contentType,
      bytes: size,
      contentType,
      storagePath,
      uploadedAt,
      expiresAt: room.expiresAt || null,
    });

    uploaded.push({
      _id: fileId,
      otp,
      original_filename: originalName,
      bytes: size,
      contentType,
      uploadedAt,
      expiresAt: room.expiresAt || null,
    });
  }

  return { expiresAt: room.expiresAt || null, uploaded };
}

router.post("/new", upload.array("files", 10), async (req, res, next) => {
  try {
    const files = req.files || [];
    if (files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const otp = await createUniqueOtp();
    const expiresAt = computeExpiresAt();

    const db = firestore();
    await db.collection("rooms").doc(otp).set({
      roomId: otp,
      otp,
      createdAt: new Date(),
      expiresAt,
    });

    const { uploaded } = await handleUploadToOtp({ otp, files });

    return res.json({
      otp,
      expiresAt,
      files: uploaded,
    });
  } catch (err) {
    next(err);
  }
});

router.post(
  "/existing",
  upload.array("files", 10),
  async (req, res, next) => {
    try {
      const otp = String(req.body?.otp || "");
      if (!isValidOtp(otp)) {
        return res.status(400).json({ error: "Invalid OTP" });
      }

      const files = req.files || [];
      if (files.length === 0) {
        return res.status(400).json({ error: "No files uploaded" });
      }

      const { expiresAt, uploaded } = await handleUploadToOtp({ otp, files });

      return res.json({
        otp,
        expiresAt,
        files: uploaded,
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
