import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Mail, Github, Globe } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#070B14] text-white">
      <Navbar />
      <main className="mx-auto max-w-2xl px-6 py-20 lg:px-8">
        <div className="mb-12">
          <h1 className="font-display text-4xl font-bold tracking-tight text-white mb-4">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">Us</span>
          </h1>
          <p className="text-gray-400 text-lg font-body leading-8">
            Have a question, issue, or feedback? We'd love to hear from you.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8 space-y-6">
            <h2 className="font-display text-xl font-bold text-white">Get in Touch</h2>

            <a
              href="mailto:contact@livesharefile.app"
              className="flex items-center gap-4 group hover:bg-white/5 rounded-xl p-4 -mx-4 transition-colors duration-200"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 shrink-0">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-body">Email</p>
                <p className="text-white font-body group-hover:text-indigo-400 transition-colors">
                  contact@livesharefile.app
                </p>
              </div>
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 group hover:bg-white/5 rounded-xl p-4 -mx-4 transition-colors duration-200"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400 shrink-0">
                <Github size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-body">GitHub</p>
                <p className="text-white font-body group-hover:text-violet-400 transition-colors">
                  github.com/livesharefile
                </p>
              </div>
            </a>

            <a
              href="/"
              className="flex items-center gap-4 group hover:bg-white/5 rounded-xl p-4 -mx-4 transition-colors duration-200"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
                <Globe size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-body">Website</p>
                <p className="text-white font-body group-hover:text-emerald-400 transition-colors">
                  livesharefile.app
                </p>
              </div>
            </a>
          </div>

          <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8">
            <h2 className="font-display text-lg font-bold text-white mb-3">Response Time</h2>
            <p className="text-gray-400 font-body leading-7 text-sm">
              We typically respond to emails within 1–2 business days. For bug reports, please
              include your browser, operating system, and a description of the issue.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
