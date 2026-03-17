import express from "express";

import { isValidOtp } from "../utils/otp.js";
import { firestore } from "../config/firebaseAdmin.js";

const router = express.Router();

router.get("/:otp", async (req, res, next) => {
  try {
    const otp = String(req.params.otp || "");
    if (!isValidOtp(otp)) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    const db = firestore();
    const roomSnap = await db.collection("rooms").doc(otp).get();
    if (!roomSnap.exists) {
      return res.status(404).json({ error: "OTP not found" });
    }

    const room = roomSnap.data() || {};
    const expiresAt = room.expiresAt?.toDate ? room.expiresAt.toDate() : room.expiresAt;
    if (expiresAt && expiresAt <= new Date()) {
      return res.status(410).json({ error: "OTP expired" });
    }

    const filesSnap = await db
      .collection("rooms")
      .doc(otp)
      .collection("files")
      .orderBy("uploadedAt", "desc")
      .get();

    const files = filesSnap.docs.map((d) => {
      const data = d.data() || {};
      const uploadedAt = data.uploadedAt?.toDate ? data.uploadedAt.toDate() : data.uploadedAt;
      return {
        _id: d.id,
        ...data,
        uploadedAt,
      };
    });

    return res.json({
      otp,
      expiresAt,
      files,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
