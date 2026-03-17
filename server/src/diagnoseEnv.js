import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import util from "util";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, "../.env");
dotenv.config({ path: envPath });

console.log(`Loaded env from: ${envPath}`);

function mask(value) {
  if (!value) return "(missing)";
  const v = String(value);
  if (v.length <= 6) return "(set)";
  return `${v.slice(0, 2)}***${v.slice(-2)}`;
}

function assertPresent(name) {
  const val = process.env[name];
  if (!val || !String(val).trim()) {
    const err = new Error(`${name} is missing`);
    err.code = "ENV_MISSING";
    throw err;
  }
}

async function checkMongo() {
  throw new Error("Mongo diagnostics are no longer supported after Firebase migration");
}

async function checkCloudinary() {
  throw new Error(
    "Cloudinary diagnostics are no longer supported after Firebase migration"
  );
}

async function checkFirebase() {
  const { getFirebaseApp, firestore, storage } = await import(
    "./config/firebaseAdmin.js"
  );

  let saProjectId;
  let saClientEmail;
  try {
    const sa = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON || "{}");
    saProjectId = sa?.project_id;
    saClientEmail = sa?.client_email;
  } catch {
    saProjectId = undefined;
    saClientEmail = undefined;
  }

  console.log(
    `Firebase: project_id=${mask(process.env.FIREBASE_PROJECT_ID)} bucket=${mask(
      process.env.FIREBASE_STORAGE_BUCKET
    )} service_account_json=${process.env.FIREBASE_SERVICE_ACCOUNT_JSON ? "(set)" : "(missing)"}`
  );
  console.log(
    `ServiceAccount: project_id=${saProjectId ? saProjectId : "(missing)"} client_email=${
      saClientEmail ? saClientEmail : "(missing)"
    }`
  );

  const fbApp = getFirebaseApp();
  console.log(
    `FirebaseApp: projectId=${fbApp?.options?.projectId ? fbApp.options.projectId : "(unknown)"}`
  );

  const databaseId = (process.env.FIREBASE_FIRESTORE_DATABASE_ID || "").trim();
  console.log(`Firestore: databaseId=${databaseId ? databaseId : "(default)"}`);

  try {
    await firestore().listCollections();
    console.log("Firestore: OK");
  } catch (err) {
    const e = new Error(
      "Firestore check failed. If you see NOT_FOUND, either Firestore Database is not created/enabled for THIS project, or the Firestore API isn't enabled for this project, or your service account belongs to a different project."
    );
    e.grpcCode = err?.code;
    e.grpcDetails = err?.details;
    e.cause = err;
    throw e;
  }

  try {
    await storage().bucket().getMetadata();
    console.log("Storage: OK");
  } catch (err) {
    const bucket = process.env.FIREBASE_STORAGE_BUCKET;
    const e = new Error(
      `Storage check failed. If you see NOT_FOUND, your FIREBASE_STORAGE_BUCKET may be wrong or Storage not enabled. Current bucket=${bucket || "(missing)"}. Common value is <project-id>.appspot.com.`
    );
    e.cause = err;
    throw e;
  }

  console.log("Firebase: OK");
}

async function main() {
  assertPresent("FIREBASE_STORAGE_BUCKET");
  assertPresent("FIREBASE_SERVICE_ACCOUNT_JSON");

  console.log("\n== Credential Diagnostics ==\n");

  await checkFirebase();

  console.log("\nAll credentials look valid.\n");
  process.exit(0);
}

main().catch((err) => {
  const isObject = err && typeof err === "object";
  const msg = err?.message || (isObject ? undefined : String(err)) || "Unknown error";
  const code = err?.http_code || err?.code || err?.error?.http_code || "UNKNOWN";

  console.error(`\nDiagnostics failed${msg ? `: ${msg}` : ""}`);
  console.error(`Code: ${code}`);
  if (isObject) {
    console.error("Details:");
    console.error(util.inspect(err, { depth: 8, colors: false }));
  }
  process.exit(1);
});
