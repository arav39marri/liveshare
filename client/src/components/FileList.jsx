import React from 'react';
import { File, X, Download, FileImage, FileVideo, FileAudio, FileText, FileArchive } from 'lucide-react';

function getFileIcon(fileType = '') {
  if (fileType.startsWith('image/')) return <FileImage size={20} />;
  if (fileType.startsWith('video/')) return <FileVideo size={20} />;
  if (fileType.startsWith('audio/')) return <FileAudio size={20} />;
  if (fileType.includes('zip') || fileType.includes('rar') || fileType.includes('tar')) return <FileArchive size={20} />;
  return <FileText size={20} />;
}

function formatBytes(bytes) {
  if (!bytes) return '—';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export default function FileList({ files, mode = 'send', onRemove }) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "";

  if (!files || files.length === 0) {
    if (mode === 'receive') {
      return (
        <div className="text-center py-16 text-gray-500">
          <FileText size={48} className="mx-auto mb-4 opacity-40" />
          <p className="font-body">No files in this room yet.</p>
          <p className="text-sm mt-1">Switch to Send mode to upload files.</p>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="w-full max-w-lg mt-8 mb-24">
      <h4 className="text-sm font-semibold text-gray-400 mb-4 px-2 tracking-wide uppercase font-display">
        {mode === 'receive' ? `${files.length} file${files.length > 1 ? 's' : ''} available` : 'Selected Files'}
      </h4>
      <ul className="space-y-3">
        {files.map((file, idx) => {
          const name = file.name || file.fileName || file.original_filename || 'Unknown file';
          const size = file.size || file.fileSize || file.bytes;
          const fileType = file.type || file.fileType || file.contentType || '';
          const fileId = file._id || file.fileId || idx;

          return (
            <li key={fileId} className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex items-center justify-between group hover:bg-white/[0.05] transition-colors">
              <div className="flex items-center gap-4 overflow-hidden">
                <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg shrink-0">
                  {getFileIcon(fileType)}
                </div>
                <div className="truncate">
                  <p className="text-sm font-medium text-white truncate font-body">{name}</p>
                  <p className="text-xs text-gray-500 font-body">{formatBytes(size)}</p>
                </div>
              </div>

              {mode === 'receive' ? (
                <a
                  href={`${baseUrl}/api/download/${fileId}`}
                  download={name}
                  className="p-2 text-gray-400 hover:text-indigo-400 rounded-lg hover:bg-white/10 transition-colors shrink-0"
                  aria-label="Download file"
                >
                  <Download size={18} />
                </a>
              ) : (
                <button
                  onClick={() => onRemove && onRemove(idx)}
                  className="p-2 text-gray-500 hover:text-red-400 rounded-lg hover:bg-white/5 transition-colors shrink-0"
                  aria-label="Remove file"
                >
                  <X size={18} />
                </button>
              )}
            </li>
          );
        })}
      </ul>

      {mode === 'send' && (
        <button className="w-full mt-6 rounded-full bg-indigo-500 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-95">
          Upload {files.length} {files.length === 1 ? 'file' : 'files'}
        </button>
      )}

      {mode === 'receive' && (
        <a
          href={`${baseUrl}/api/download/${files[0]?._id}`}
          download
          className="w-full mt-6 rounded-full bg-indigo-500 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-95 text-center block"
        >
          Download All ({files.length})
        </a>
      )}
    </div>
  );
}
