import React from 'react';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [installVisible, setInstallVisible] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setInstallVisible(true);
    };
    window.addEventListener('beforeinstallprompt', handler);

    // Show in dev so it can be tested
    if (import.meta.env.DEV) {
      setInstallVisible(true);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      alert('To install, open this site in Chrome on your phone or desktop and look for the install prompt in the address bar.');
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log('Install outcome:', outcome);
    setDeferredPrompt(null);
    setInstallVisible(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/5 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <a href="/" className="font-display text-2xl font-bold text-white tracking-tight">
              FileShare<span className="text-indigo-500">.</span>
            </a>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium">
              How it Works
            </a>
            <a href="#features" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium">
              Features
            </a>
            {installVisible && (
              <button
                onClick={handleInstall}
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border border-white/10"
              >
                Install FileShare
              </button>
            )}
          </div>

          {/* Mobile: only show Install button */}
          <div className="flex md:hidden">
            {installVisible && (
              <button
                onClick={handleInstall}
                className="bg-indigo-500 hover:bg-indigo-400 active:bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 shadow-lg shadow-indigo-500/20"
              >
                Install FileShare
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
