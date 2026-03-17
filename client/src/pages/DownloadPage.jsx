import { useState } from "react";

import { fetchFilesByOtp } from "../api.js";
import FileList from "../components/FileList.jsx";

export default function DownloadPage() {
  const [otp, setOtp] = useState("");
  const [expiresAt, setExpiresAt] = useState(null);
  const [files, setFiles] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function fetchFiles() {
    try {
      setError("");
      setBusy(true);
      const data = await fetchFilesByOtp(otp.trim());
      setExpiresAt(data.expiresAt || null);
      setFiles(data.files || []);
    } catch (e) {
      setFiles([]);
      setExpiresAt(null);
      setError(e.message || "Failed to fetch");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="card">
      <h2>Download</h2>
      <p className="hint">Enter the OTP to view available files.</p>

      <div className="field" style={{ marginTop: 12, maxWidth: 360 }}>
        <label>OTP</label>
        <input
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="6-digit OTP"
          inputMode="numeric"
          maxLength={6}
        />
      </div>

      <div className="actions" style={{ marginTop: 12 }}>
        <button
          className="button primary"
          onClick={fetchFiles}
          disabled={busy || otp.trim().length !== 6}
        >
          {busy ? "Fetching..." : "Fetch Files"}
        </button>
      </div>

      {error ? (
        <div className="hint" style={{ marginTop: 12, color: "#ef4444" }}>
          {error}
        </div>
      ) : null}

      {expiresAt ? (
        <div className="hint" style={{ marginTop: 12 }}>
          Expires: {new Date(expiresAt).toLocaleString()}
        </div>
      ) : null}

      <div style={{ marginTop: 12 }}>
        <FileList files={files} />
        {!error && otp.trim().length === 6 && files.length === 0 && expiresAt ? (
          <div className="hint" style={{ marginTop: 12 }}>
            No files found for this OTP.
          </div>
        ) : null}
      </div>
    </div>
  );
}
