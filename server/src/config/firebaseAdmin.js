import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

let app;

function parseServiceAccountJson(json) {
  try {
    return JSON.parse(json);
  } catch (err) {
    const e = new Error(
      "Invalid Firebase service account JSON. It must be valid JSON."
    );
    e.cause = err;
    throw e;
  }
}

function normalizeServiceAccount(serviceAccount) {
  if (!serviceAccount || typeof serviceAccount !== "object") return serviceAccount;

  const normalized = { ...serviceAccount };
  if (typeof normalized.private_key === "string") {
    normalized.private_key = normalized.private_key.replace(/\\n/g, "\n");
  }
  return normalized;
}

function loadServiceAccountFromEnv() {
  const json = (process.env.FIREBASE_SERVICE_ACCOUNT_JSON || "").trim();
  if (!json) {
    throw new Error("Missing env variable: FIREBASE_SERVICE_ACCOUNT_JSON");
  }

  return parseServiceAccountJson(json);
}

function assertServiceAccountShape(serviceAccount) {
  if (!serviceAccount) return;
  const required = ["project_id", "client_email", "private_key"];
  for (const k of required) {
    if (!serviceAccount[k] || !String(serviceAccount[k]).trim()) {
      throw new Error(
        `Firebase service account JSON missing required field: ${k}`
      );
    }
  }
}

export function getFirebaseApp() {
  if (app) return app;

  const serviceAccount = normalizeServiceAccount(loadServiceAccountFromEnv());
  assertServiceAccountShape(serviceAccount);
  const projectId = (process.env.FIREBASE_PROJECT_ID || "").trim();
  const storageBucket = (process.env.FIREBASE_STORAGE_BUCKET || "").trim();

  if (!storageBucket) {
    throw new Error("FIREBASE_STORAGE_BUCKET is required");
  }

  if (!admin.apps.length) {
    const credential = admin.credential.cert(serviceAccount);
    admin.initializeApp({
      credential,
      projectId: serviceAccount?.project_id || projectId || undefined,
      storageBucket: storageBucket || undefined,
      databaseURL: (process.env.FIREBASE_DATABASE_URL || "").trim() || undefined,
    });
  }

  app = admin.app();

  return app;
}

export function firestore() {
  const fbApp = getFirebaseApp();
  const databaseId = (process.env.FIREBASE_FIRESTORE_DATABASE_ID || "").trim();
  return databaseId ? getFirestore(fbApp, databaseId) : getFirestore(fbApp);
}

export function storage() {
  getFirebaseApp();
  return admin.storage();
}
