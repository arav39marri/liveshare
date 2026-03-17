import React from 'react';
import { Files, UserX, ShieldCheck, Timer } from 'lucide-react';

const features = [
  {
    name: 'Any file type',
    description: 'Share documents, images, videos, or archives up to the size limit.',
    icon: Files,
  },
  {
    name: 'No sign-up',
    description: 'Start sharing instantly. We don\'t ask for your personal info.',
    icon: UserX,
  },
  {
    name: 'OTP secured',
    description: 'Files are protected by a unique 6-digit code for the receiver.',
    icon: ShieldCheck,
  },
  {
    name: 'Auto-expires in 24h',
    description: 'We do not keep your data forever. Rooms self-destruct after 24 hours.',
    icon: Timer,
  },
];

export default function Features() {
  return (
    <div id="features" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-display">Everything you need</h2>
          <p className="mt-6 text-lg leading-8 text-gray-400 font-body">
            A fast, secure, and privacy-first way to transfer files between devices.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="relative bg-white/[0.03] backdrop-blur-xl border border-white/[0.07] p-8 rounded-3xl hover:bg-white/[0.05] transition-all duration-300 group">
                <dt className="flex items-center gap-x-3 text-lg font-bold leading-7 text-white font-display mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon aria-hidden="true" className="h-5 w-5" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-400 font-body">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Ad Slot: Medium Rectangle */}
        <div className="mt-20 flex justify-center w-full">
          <div className="w-[300px] h-[250px] bg-white/5 rounded-xl border border-white/10 flex items-center justify-center relative overflow-hidden">
             <span className="text-xs text-gray-500 absolute top-2 right-2 z-10">Advertisement</span>
             <ins className="adsbygoogle"
                 style={{ display: 'inline-block', width: '300px', height: '250px' }}
                 data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                 data-ad-slot="XXXXXXXXXX"></ins>
          </div>
        </div>

      </div>
    </div>
  );
}
