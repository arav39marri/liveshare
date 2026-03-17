import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

// Lightweight QR code using a free API (no extra npm package needed)
export default function QrModal({ url, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&qzone=2&data=${encodeURIComponent(url)}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div ref={modalRef} className="bg-[#0D1117] border border-white/10 rounded-3xl p-8 flex flex-col items-center gap-6 shadow-2xl w-72 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
        >
          <X size={18} />
        </button>

        <h3 className="font-display text-lg font-bold text-white">Scan to join</h3>

        <div className="bg-white p-3 rounded-2xl">
          <img src={qrUrl} alt="QR Code" width={200} height={200} className="block" />
        </div>

        <p className="text-xs text-gray-500 text-center break-all font-mono">{url}</p>
      </div>
    </div>
  );
}
