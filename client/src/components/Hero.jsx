import React, { useState } from 'react';
import { Upload, ArrowRight } from 'lucide-react';

export default function Hero({ onCreateRoom, onJoinRoom }) {
  const [joinCode, setJoinCode] = useState('');

  return (
    <div className="relative isolate pt-14">
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#6366f1] to-[#8b5cf6] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
      </div>

      <div className="py-24 sm:py-32 lg:pb-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
              Send anything. <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">Instantly.</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-400 font-body">
              No sign-up. No limits. Just create a room and share.
            </p>
          </div>

          <div className="mt-16 flow-root sm:mt-24">
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center max-w-4xl mx-auto">
              
              {/* Create Room Card */}
              <div className="w-full md:w-1/2 group relative bg-white/[0.03] backdrop-blur-xl rounded-3xl border border-white/[0.07] p-8 hover:bg-white/[0.05] transition-all duration-300">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                  <Upload size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 font-display">Create a Room</h3>
                <p className="text-gray-400 mb-8 font-body">Upload files or share your clipboard with a unique room link.</p>
                <button 
                  onClick={onCreateRoom}
                  className="w-full rounded-full bg-indigo-500 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 transition-all duration-200 transform hover:scale-[1.02]"
                >
                  Create Room
                </button>
              </div>

              {/* Join Room Card */}
              <div className="w-full md:w-1/2 group relative bg-white/[0.03] backdrop-blur-xl rounded-3xl border border-white/[0.07] p-8 hover:bg-white/[0.05] transition-all duration-300">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                  <ArrowRight size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 font-display">Join a Room</h3>
                <p className="text-gray-400 mb-8 font-body">Have a room code or link? Enter it to access shared files.</p>
                <div className="flex gap-3">
                  <input 
                    type="text" 
                    placeholder="Enter room code" 
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value)}
                    className="w-full rounded-xl border-0 bg-white/5 px-4 py-3.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                  <button 
                    onClick={() => onJoinRoom(joinCode)}
                    disabled={!joinCode.trim()}
                    className="flex-none rounded-xl bg-white/10 px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Join
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
