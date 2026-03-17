import React, { useState, useCallback, useEffect } from 'react';
import { UploadCloud, CheckCircle, Loader2 } from 'lucide-react';

export default function UploadRing({ onDrop, isUploading }) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadDone, setUploadDone] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isBursting, setIsBursting] = useState(false);

  useEffect(() => {
    if (isHovered) {
      setIsBursting(true);
      const timer = setTimeout(() => setIsBursting(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isHovered]);

  const handleDragOver = useCallback((e) => { e.preventDefault(); setIsDragging(true); }, []);
  const handleDragLeave = useCallback((e) => { e.preventDefault(); setIsDragging(false); }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length > 0) {
      onDrop(Array.from(e.dataTransfer.files));
    }
  }, [onDrop]);

  const handleFileSelect = (e) => {
    if (e.target.files?.length > 0) {
      onDrop(Array.from(e.target.files));
    }
  };

  const ringStyle = {
    background: 'linear-gradient(#070B14, #070B14) padding-box, linear-gradient(135deg, #10B981, #059669, rgba(16,185,129,0.15)) border-box',
    boxShadow: isDragging ? '0 0 60px rgba(16, 185, 129, 0.4), 0 0 120px rgba(16, 185, 129, 0.2)' : '0 0 30px rgba(16, 185, 129, 0.15)',
    transition: 'all 0.3s ease'
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        className="relative flex items-center justify-center w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] cursor-pointer"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Hidden file input */}
        <input
          type="file"
          multiple
          className="absolute inset-0 w-full h-full opacity-0 z-50 cursor-pointer"
          onChange={handleFileSelect}
        />

        {/* Animated gradient border ring */}
        <div
          className={`absolute inset-0 rounded-full border-[6px] border-transparent ${
            isDragging || isBursting ? 'rotate-ring-fast scale-105' : 'rotate-ring'
          } transition-all duration-300`}
          style={ringStyle}
        />

        {/* Inner circle content */}
        <div className={`absolute inset-3 rounded-full flex flex-col items-center justify-center transition-colors duration-300 ${
          isDragging ? 'bg-emerald-500/15' : (uploadDone ? 'bg-emerald-500/10' : 'bg-emerald-500/5')
        } border border-emerald-500/10`}>
          {isUploading ? (
            <>
              <Loader2 size={36} className="text-indigo-400 animate-spin mb-2" />
              <p className="text-xs text-indigo-300 font-display">Uploading...</p>
            </>
          ) : uploadDone ? (
            <div className="flex flex-col items-center justify-center pulse-soft">
              <CheckCircle size={36} className="text-emerald-400 mb-2" />
              <p className="text-xs text-emerald-300 font-display">Done!</p>
            </div>
          ) : (
            <>
              <div className={`p-3 rounded-full mb-2 transition-colors ${isDragging ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/5 text-gray-400'}`}>
                <UploadCloud size={32} />
              </div>
              <p className="text-xs font-medium text-center text-gray-300 px-4 font-display leading-tight">
                {isDragging ? "Drop it!" : "Drop files\nor click"}
              </p>
            </>
          )}
        </div>
      </div>

      <p className="text-xs text-gray-500 font-body">Any file type · Up to 10 files at once</p>
    </div>
  );
}
