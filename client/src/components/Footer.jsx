import React from 'react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-white/[0.01]">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="md:flex md:items-start md:justify-between gap-8">
          {/* Brand */}
          <div className="mb-8 md:mb-0">
            <span className="font-display text-xl font-bold text-white tracking-tight">
              FileShare<span className="text-indigo-500">.</span>
            </span>
            <p className="mt-2 text-sm text-gray-500 font-body max-w-xs">
              Fast, private, zero-signup file sharing. Create a room and share anything — instantly.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-8">
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 font-body">
                Legal
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="/privacy-policy" className="text-sm text-gray-500 hover:text-white transition-colors font-body">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-sm text-gray-500 hover:text-white transition-colors font-body">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 font-body">
                Company
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="/about" className="text-sm text-gray-500 hover:text-white transition-colors font-body">
                    About
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-sm text-gray-500 hover:text-white transition-colors font-body">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600 font-body">
            &copy; {year} FileShare. All rights reserved.
          </p>
          <p className="text-xs text-gray-600 font-body">
            Files expire after 24 hours &bull; No sign-up required
          </p>
        </div>
      </div>
    </footer>
  );
}
