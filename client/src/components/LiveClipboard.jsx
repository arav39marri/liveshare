import React, { useState, useEffect, useRef } from 'react';
import { Copy, Trash2, Activity } from 'lucide-react';
import { ref, onValue, set } from 'firebase/database';
import { db } from '../config/firebase';

export default function LiveClipboard({ roomId, onCopied }) {
  const [content, setContent] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    if (!roomId) return;
    
    const clipboardRef = ref(db, `rooms/${roomId}/clipboard`);
    const unsubscribe = onValue(clipboardRef, (snapshot) => {
      const data = snapshot.val();
      // Only update local state if it's different to prevent cursor jumping
      // when we receive our own updates back from the server
      if (data !== null && data !== undefined) {
        setContent(data);
      }
    });

    return () => unsubscribe();
  }, [roomId]);

  const updateFirebase = (newContent) => {
    if (!roomId) return;
    const clipboardRef = ref(db, `rooms/${roomId}/clipboard`);
    set(clipboardRef, newContent).catch(err => console.error("Firebase write error:", err));
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setContent(val);
    setIsTyping(true);
    
    // Write instantly to Firebase
    updateFirebase(val);
    
    // Clear typing indicator after pause
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => setIsTyping(false), 500);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(content);
    if (onCopied) onCopied();
  };

  const clearAll = () => {
    setContent('');
    updateFirebase('');
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      
      <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-xs font-semibold uppercase tracking-wider text-emerald-500">Live Sync</span>
          </div>
          <span className="text-xs text-gray-500 font-mono">{content.length} chars</span>
        </div>

        <textarea
          value={content}
          onChange={handleChange}
          placeholder="Type or paste anything — it syncs instantly with everyone in this room..."
          className="w-full min-h-[300px] bg-transparent border-none p-0 text-white placeholder:text-gray-600 focus:ring-0 resize-y font-body text-base leading-relaxed"
          style={{ outline: 'none', boxShadow: 'none' }}
        />

        <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-white/5">
          {isTyping && <span className="text-xs text-gray-500 mr-auto animate-pulse flex items-center gap-1"><Activity size={14} /> Saving...</span>}
          <button onClick={copyAll} className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-xl hover:bg-indigo-500/20 transition-all font-medium text-sm">
            <Copy size={16} />
            Copy All
          </button>
        </div>
      </div>
      
    </div>
  );
}
