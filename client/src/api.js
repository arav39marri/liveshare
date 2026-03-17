function getApiBase() {
  const base = import.meta.env.VITE_API_BASE_URL;
  return base ? String(base).replace(/\/+$/, "") : "";
}

export function apiUrl(path) {
  const base = getApiBase();
  if (!base) return path;
  return `${base}${path}`;
}

export function uploadFiles({ endpoint, otp, files, onProgress }) {
  return new Promise((resolve, reject) => {
    const form = new FormData();
    for (const f of files) form.append("files", f);
    if (otp) form.append("otp", otp);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", apiUrl(endpoint));

    xhr.upload.onprogress = (evt) => {
      if (!evt.lengthComputable) return;
      const pct = Math.round((evt.loaded / evt.total) * 100);
      onProgress?.(pct);
    };

    xhr.onload = () => {
      try {
        const data = JSON.parse(xhr.responseText || "{}");
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(data);
          return;
        }
        const msg = data.errorId
          ? `${data.error || "Request failed"} (Error ID: ${data.errorId})`
          : data.error || `Request failed (${xhr.status})`;
        reject(new Error(msg));
      } catch {
        reject(new Error(`Request failed (${xhr.status})`));
      }
    };

    xhr.onerror = () => reject(new Error("Network error"));
    xhr.send(form);
  });
}

export async function fetchFilesByOtp(otp) {
  const res = await fetch(apiUrl(`/api/files/${encodeURIComponent(otp)}`));
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data.errorId
      ? `${data.error || "Failed to fetch files"} (Error ID: ${data.errorId})`
      : data.error || "Failed to fetch files";
    throw new Error(msg);
  }
  return data;
}
