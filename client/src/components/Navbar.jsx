import React from 'react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/5 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center gap-2">
            <span className="font-display text-2xl font-bold text-white tracking-tight">
              FileShare<span className="text-indigo-500">.</span>
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium">
                How it Works
              </a>
              <a href="#features" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium">
                Features
              </a>
              <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ml-4 border border-white/10">
                Install App
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
