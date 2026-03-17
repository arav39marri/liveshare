import { apiUrl } from "../api.js";

function formatBytes(bytes) {
  if (!Number.isFinite(bytes)) return "";
  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit++;
  }
  return `${value.toFixed(unit === 0 ? 0 : 1)} ${units[unit]}`;
}

export default function FileList({ files }) {
  if (!files || files.length === 0) return null;

  return (
    <div className="files">
      {files.map((f) => {
        const key = f._id || f.public_id || f.secure_url;

        return (
          <div className="file" key={key}>
            <div className="meta">
              <div className="name">{f.original_filename}</div>
              <div className="sub">
                {f.bytes ? formatBytes(f.bytes) : ""}
              </div>
              <a
                className="button primary"
                href={f._id ? apiUrl(`/api/download/${f._id}`) : f.secure_url}
                download
              >
                Download
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
