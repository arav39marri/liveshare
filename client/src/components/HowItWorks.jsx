import React from 'react';
import { Share2, KeyRound, Download } from 'lucide-react';

const steps = [
  {
    name: 'Create a room',
    description: 'Upload files or share your clipboard. A distinct room code is generated instantly.',
    icon: Share2,
  },
  {
    name: 'Share the link or code',
    description: 'Send the 6-digit room code or a direct link to the receiver.',
    icon: KeyRound,
  },
  {
    name: 'Receiver opens & downloads',
    description: 'The receiver enters the code to access and download the files securely.',
    icon: Download,
  },
];

export default function HowItWorks() {
  return (
    <div id="how-it-works" className="py-24 sm:py-32 bg-white/[0.01]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-display">How it works</h2>
          <p className="mt-6 text-lg leading-8 text-gray-400 font-body">
            Share files in three simple steps without creating an account.
          </p>
        </div>
        
        {/* Ad Slot: Leaderboard */}
        <div className="mt-12 mb-16 flex justify-center w-full min-h-[90px] bg-white/5 rounded-xl border border-white/10 items-center overflow-hidden relative">
          <span className="text-xs text-gray-500 absolute top-2 right-2">Advertisement</span>
          <ins className="adsbygoogle"
               style={{ display: 'inline-block', width: '728px', height: '90px' }}
               data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
               data-ad-slot="XXXXXXXXXX"></ins>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.name} className="flex flex-col items-center text-center relative group">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 ring-1 ring-white/10 shadow-lg transform transition-all duration-300 group-hover:bg-indigo-500/20 group-hover:scale-110">
                  <step.icon aria-hidden="true" className="h-8 w-8" />
                </div>
                <dt className="text-xl font-bold leading-7 text-white font-display">
                  {step.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-400 font-body">
                  <p className="flex-auto">{step.description}</p>
                </dd>
                
                {/* Connector Line (Desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+4rem)] right-[calc(-50%+4rem)] h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"></div>
                )}
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
