import { useMemo, useState } from "react";

import { uploadFiles } from "../api.js";
import FileList from "../components/FileList.jsx";

export default function UploadPage() {
  const [fileInputKey, setFileInputKey] = useState(0);
  const [selected, setSelected] = useState([]);
  const [resultOtp, setResultOtp] = useState("");
  const [expiresAt, setExpiresAt] = useState(null);
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const canUpload = useMemo(() => selected.length > 0 && !busy, [selected, busy]);

  async function doUpload(mode) {
    try {
      setError("");
      setProgress(0);
      setBusy(true);

      const endpoint = mode === "add" ? "/api/upload/existing" : "/api/upload/new";
      const otp = mode === "add" ? resultOtp : undefined;

      const data = await uploadFiles({
        endpoint,
        otp,
        files: selected,
        onProgress: setProgress,
      });

      setResultOtp(data.otp || resultOtp || "");
      setExpiresAt(data.expiresAt || null);
      if (mode === "add") {
        setFiles((prev) => [...(data.files || []), ...prev]);
      } else {
        setFiles(data.files || []);
      }
      setSelected([]);
      setFileInputKey((k) => k + 1);
    } catch (e) {
      setError(e.message || "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  async function copyOtp() {
    if (!resultOtp) return;
    await navigator.clipboard.writeText(resultOtp);
  }

  return (
    <div className="grid">
      <div className="card">
        <h2>Upload</h2>
        <p className="hint">Any file type. Multiple files allowed.</p>
        {resultOtp ? (
          <p className="hint">Select more files and click Add to reuse the same OTP.</p>
        ) : null}

        <div className="field" style={{ marginTop: 12 }}>
          <label>Select files</label>
          <input
            key={fileInputKey}
            type="file"
            multiple
            onChange={(e) => setSelected(Array.from(e.target.files || []))}
          />
        </div>

        <div className="actions" style={{ marginTop: 12 }}>
          {!resultOtp ? (
            <button
              className="button primary"
              disabled={!canUpload}
              onClick={() => doUpload("new")}
            >
              Upload
            </button>
          ) : (
            <button
              className="button primary"
              disabled={!canUpload}
              onClick={() => doUpload("add")}
            >
              Add
            </button>
          )}
        </div>

        <div style={{ marginTop: 12 }}>
          <div className="progress">
            <div style={{ width: `${progress}%` }} />
          </div>
          <div className="hint" style={{ marginTop: 6 }}>
            {busy ? `Uploading... ${progress}%` : ""}
          </div>
        </div>

        {error ? (
          <div className="hint" style={{ marginTop: 12, color: "#ef4444" }}>
            {error}
          </div>
        ) : null}

        {resultOtp ? (
          <div style={{ marginTop: 14 }}>
            <div className="otp">
              <div>
                OTP: <code>{resultOtp}</code>
              </div>
              <button className="button secondary" onClick={copyOtp}>
                Copy
              </button>
            </div>
            {expiresAt ? (
              <div className="hint" style={{ marginTop: 6 }}>
                Expires: {new Date(expiresAt).toLocaleString()}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="card">
        <h2>Uploaded files</h2>
        <p className="hint">Share the OTP with the receiver.</p>
        <div style={{ marginTop: 12 }}>
          <FileList files={files} />
        </div>
      </div>
    </div>
  );
}
