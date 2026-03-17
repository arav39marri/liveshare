import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-white/[0.01]">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <a href="/privacy-policy" className="text-sm leading-6 text-gray-400 hover:text-white font-body">
            Privacy Policy
          </a>
          <a href="/terms" className="text-sm leading-6 text-gray-400 hover:text-white font-body">
            Terms & Conditions
          </a>
          <a href="/about" className="text-sm leading-6 text-gray-400 hover:text-white font-body">
            About
          </a>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-gray-500 font-body">
            &copy; {new Date().getFullYear()} FileShare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
