import express from "express";

import { firestore } from "../config/firebaseAdmin.js";
import { generateOtp, isValidOtp } from "../utils/otp.js";

const router = express.Router();

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

router.post("/new", async (req, res, next) => {
  try {
    console.log("Creating new room");
    const otp = await createUniqueOtp();
    const expiresAt = computeExpiresAt();

    const db = firestore();
    await db.collection("rooms").doc(otp).set({
      roomId: otp,
      otp,
      createdAt: new Date(),
      expiresAt,
    });

    return res.json({ otp, roomId: otp, expiresAt });
  } catch (err) {
    next(err);
  }
});

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

    return res.json({ ok: true, otp, roomId: otp, expiresAt });
  } catch (err) {
    next(err);
  }
});

export default router;
