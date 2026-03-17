import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#070B14] text-white">
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-20 lg:px-8">
        <div className="mb-12">
          <h1 className="font-display text-4xl font-bold tracking-tight text-white mb-4">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">FileShare</span>
          </h1>
          <p className="text-gray-400 text-lg font-body leading-8">
            FileShare is a fast, privacy-first tool for sharing files and clipboard content in real time — no sign-up required.
          </p>
        </div>

        <div className="space-y-10">
          <section className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8">
            <h2 className="font-display text-xl font-bold text-white mb-3">Our Mission</h2>
            <p className="text-gray-400 font-body leading-7">
              We believe sharing files should be as simple as passing a note. FileShare removes every barrier — no accounts,
              no app downloads, no waiting. Just create a room, share the code, and transfer anything instantly across
              devices.
            </p>
          </section>

          <section className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8">
            <h2 className="font-display text-xl font-bold text-white mb-3">How It Works</h2>
            <ul className="space-y-3 text-gray-400 font-body leading-7">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500 shrink-0" />
                Create a unique room — a temporary, secure workspace.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500 shrink-0" />
                Share the room code or link with anyone.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500 shrink-0" />
                Upload files or paste clipboard content — all synced instantly via Firebase in real time.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500 shrink-0" />
                Rooms and files automatically expire after 24 hours.
              </li>
            </ul>
          </section>

          {/* <section className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8">
            <h2 className="font-display text-xl font-bold text-white mb-3">Tech Stack</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {['React', 'Node.js', 'Firebase', 'Tailwind CSS', 'PWA', 'Vite'].map((tech) => (
                <div key={tech} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-300 font-body text-center">
                  {tech}
                </div>
              ))}
            </div>
          </section> */}

          <section className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8">
            <h2 className="font-display text-xl font-bold text-white mb-3">Privacy First</h2>
            <p className="text-gray-400 font-body leading-7">
              We never read your files. All transfers happen server-side temporarily and are permanently deleted after 24 hours.
              We don't sell data. We don't require sign-up. Your files are yours.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
