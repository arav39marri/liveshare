import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Copy, QrCode, Link, ArrowLeft, Check, UploadCloud } from 'lucide-react';
import Navbar from '../components/Navbar';
import UploadRing from '../components/UploadRing';
import FileList from '../components/FileList';
import LiveClipboard from '../components/LiveClipboard';
import QrModal from '../components/QrModal';

const API = import.meta.env.VITE_API_BASE_URL || "";

function Toast({ message, type = 'success' }) {
  return (
    <div className={`fixed top-20 right-6 z-[100] px-5 py-3 rounded-xl shadow-2xl text-sm font-medium font-body flex items-center gap-2 transition-all duration-300 ${
      type === 'success' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'
    }`}>
      {type === 'success' && <Check size={16} />}
      {message}
    </div>
  );
}

export default function RoomPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('files');
  const [mode, setMode] = useState('send');
  const [roomFiles, setRoomFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [toast, setToast] = useState(null);
  const [roomNotFound, setRoomNotFound] = useState(false);
  const [localFiles, setLocalFiles] = useState([]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchRoomFiles = useCallback(async () => {
    if (!roomId) return;
    try {
      const res = await fetch(`${API}/api/files/${roomId}`);
      if (res.status === 404 || res.status === 410) {
        setRoomNotFound(true);
        return;
      }
      const data = await res.json();
      if (data.files) {
        setRoomFiles(data.files);
        if (data.files.length > 0) setMode('receive');
      }
    } catch (err) {
      console.error('Error fetching files:', err);
    }
  }, [roomId]);

  useEffect(() => {
    if (!roomId) { navigate('/'); return; }
    fetchRoomFiles();
  }, [roomId, navigate, fetchRoomFiles]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Link copied to clipboard!');
  };

  const copyCode = () => {
    navigator.clipboard.writeText(roomId || '');
    showToast('Room code copied!');
  };

  const handleUpload = async (droppedFiles) => {
    if (!droppedFiles?.length) return;
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('otp', roomId);
      droppedFiles.forEach(f => formData.append('files', f));

      const res = await fetch(`${API}/api/upload/existing`, { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Upload failed');

      showToast(`${droppedFiles.length} file${droppedFiles.length > 1 ? 's' : ''} uploaded!`);
      setLocalFiles([]);
      await fetchRoomFiles();
      setMode('receive');
    } catch (err) {
      console.error(err);
      showToast('Upload failed. Please try again.', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  if (roomNotFound) {
    return (
      <div className="min-h-screen bg-[#070B14] text-white flex flex-col items-center justify-center gap-6">
        <Navbar />
        <div className="text-center">
          <p className="text-6xl mb-4">💨</p>
          <h2 className="text-2xl font-bold font-display mb-2">Room not found or expired</h2>
          <p className="text-gray-400 font-body">This room may have expired after 24 hours.</p>
          <button onClick={() => navigate('/')} className="mt-6 px-6 py-3 bg-indigo-500 hover:bg-indigo-400 rounded-full font-medium transition-colors">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070B14] text-white relative pb-32">
      {toast && <Toast message={toast.message} type={toast.type} />}
      {showQr && <QrModal url={window.location.href} onClose={() => setShowQr(false)} />}

      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">

        {/* Share Options Bar */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/')} className="p-2 text-gray-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors">
              <ArrowLeft size={20} />
            </button>
            <div>
              <p className="text-xs text-indigo-400 uppercase tracking-wider font-semibold mb-1">Room Code</p>
              <div className="flex items-center gap-2">
                <span className="font-mono text-2xl tracking-widest bg-white/10 px-3 py-1 rounded-lg border border-white/10">
                  {roomId}
                </span>
                <button onClick={copyCode} className="p-2 text-gray-400 hover:text-indigo-400 rounded-lg hover:bg-white/10 transition-colors">
                  <Copy size={18} />
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={copyLink} className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-xl hover:bg-indigo-500/20 transition-all font-medium text-sm">
              <Link size={16} />
              Copy Link
            </button>
            <button onClick={() => setShowQr(true)} className="flex items-center gap-2 px-4 py-2 bg-white/5 text-gray-300 border border-white/10 rounded-xl hover:bg-white/10 transition-all font-medium text-sm">
              <QrCode size={16} />
              QR Code
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-10">
          <div className="bg-white/5 p-1 rounded-full border border-white/10 inline-flex relative">
            <div className="flex w-full absolute inset-0 z-0 p-1 pointer-events-none">
              <div className={`w-1/2 h-full bg-indigo-500 rounded-full transition-transform duration-300 ease-in-out ${activeTab === 'clipboard' ? 'translate-x-full' : 'translate-x-0'}`} />
            </div>
            <button onClick={() => setActiveTab('files')} className={`relative z-10 font-medium text-sm px-6 py-2 rounded-full transition-colors w-36 ${activeTab === 'files' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
              File Share
            </button>
            <button onClick={() => setActiveTab('clipboard')} className={`relative z-10 font-medium text-sm px-6 py-2 rounded-full transition-colors w-36 ${activeTab === 'clipboard' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
              Live Clipboard
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'files' ? (
          <div className="flex flex-col items-center">
            {mode === 'send' ? (
              <UploadRing onDrop={handleUpload} isUploading={isUploading} />
            ) : (
              <div className="w-full max-w-lg flex flex-col items-center">
                <FileList files={roomFiles} mode="receive" />
              </div>
            )}

            {/* Send/Receive Floating Pill */}
            {activeTab === 'files' && (
              <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-black/60 backdrop-blur-xl border border-white/20 p-1 rounded-full shadow-2xl flex">
                <div className="absolute inset-0 z-0 p-1 pointer-events-none flex overflow-hidden rounded-full">
                  <div className={`w-1/2 h-full bg-indigo-500 rounded-full transition-transform duration-300 ease-in-out ${mode === 'receive' ? 'translate-x-full' : 'translate-x-0'}`} />
                </div>
                <button onClick={() => setMode('send')} className={`relative z-10 font-medium text-sm px-8 py-2.5 rounded-full transition-colors w-32 ${mode === 'send' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
                  Send
                </button>
                <button onClick={() => setMode('receive')} className={`relative z-10 font-medium text-sm px-8 py-2.5 rounded-full transition-colors w-32 ${mode === 'receive' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
                  Receive
                </button>
              </div>
            )}

            {/* Ad Slot */}
            <div className="mt-20 mb-4 flex justify-center w-full">
              <div className="w-[300px] h-[250px] bg-white/5 rounded-xl border border-white/10 flex items-center justify-center relative overflow-hidden">
                <span className="text-xs text-gray-500 absolute top-2 right-2">Advertisement</span>
                {/* Ad Slot: File Share Tab */}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <LiveClipboard roomId={roomId} onCopied={() => showToast('Clipboard copied!')} />
            
            {/* Ad Slot */}
            <div className="mt-12 mb-4 flex justify-center w-full">
              <div className="w-[300px] h-[250px] bg-white/5 rounded-xl border border-white/10 flex items-center justify-center relative overflow-hidden">
                <span className="text-xs text-gray-500 absolute top-2 right-2">Advertisement</span>
                {/* Ad Slot: Clipboard Tab */}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
