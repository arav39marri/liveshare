import { firestore, storage } from "../config/firebaseAdmin.js";

export async function cleanupExpired() {
  const now = new Date();

  const db = firestore();
  const bucket = storage().bucket();

  const roomsSnap = await db.collection("rooms").where("expiresAt", "<=", now).get();
  if (roomsSnap.empty) return { deletedOtps: 0, deletedFiles: 0 };

  let deletedFiles = 0;
  let deletedOtps = 0;

  for (const roomDoc of roomsSnap.docs) {
    const otp = roomDoc.id;

    try {
      await bucket.deleteFiles({ prefix: `rooms/${otp}/` });
    } catch {
      // ignore storage delete errors for individual rooms
    }

    const filesSnap = await roomDoc.ref.collection("files").get();
    deletedFiles += filesSnap.size;

    const batch = db.batch();
    for (const f of filesSnap.docs) batch.delete(f.ref);
    batch.delete(roomDoc.ref);
    await batch.commit();

    deletedOtps += 1;
  }

  return { deletedOtps, deletedFiles };
}
