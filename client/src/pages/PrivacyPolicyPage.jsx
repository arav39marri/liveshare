import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#070B14] text-white">
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-20 lg:px-8">
        <div className="mb-12">
          <h1 className="font-display text-4xl font-bold tracking-tight text-white mb-3">Privacy Policy</h1>
          <p className="text-gray-500 text-sm font-body">Last updated: March 17, 2026</p>
        </div>

        <div className="space-y-10 font-body text-gray-300 leading-7">

          <section>
            <h2 className="font-display text-xl font-bold text-white mb-3">1. Overview</h2>
            <p>
              FileShare ("we", "us", or "our") operates the website <strong>livesharefile.app</strong>. This Privacy Policy explains
              how we collect, use, and protect information when you use our service. By using FileShare, you agree to the
              practices described in this policy.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-white mb-3">2. Information We Collect</h2>
            <h3 className="font-semibold text-white mb-2">Files and Content</h3>
            <p className="mb-4">
              When you upload files or use the live clipboard feature, that content is temporarily stored on our servers
              and in Firebase Realtime Database solely to facilitate delivery to your intended recipients. We do not read,
              analyse, or sell the contents of your files or clipboard.
            </p>
            <h3 className="font-semibold text-white mb-2">Usage Data</h3>
            <p className="mb-4">
              We automatically receive standard server log data when you access our service. This may include your IP address,
              browser type, operating system, referring URLs, and pages visited. This data is used only for security and
              performance monitoring.
            </p>
            <h3 className="font-semibold text-white mb-2">Cookies</h3>
            <p>
              We use cookies and similar tracking technologies for the following purposes:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-400">
              <li>To maintain session state within a room</li>
              <li>To deliver and measure Google AdSense advertisements</li>
              <li>To improve site performance via Firebase Analytics (if applicable)</li>
            </ul>
            <p className="mt-3">
              You can control cookie preferences through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-white mb-3">3. How We Use Information</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li>To operate and improve the FileShare service</li>
              <li>To facilitate file and clipboard transfers between users in the same room</li>
              <li>To detect and prevent abuse or illegal activity</li>
              <li>To serve relevant advertisements via Google AdSense</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-white mb-3">4. Data Retention</h2>
            <p>
              All uploaded files and room data are <strong>automatically and permanently deleted after 24 hours</strong>.
              We do not maintain long-term backups of user content. Server access logs may be retained for up to 30 days
              for security purposes.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-white mb-3">5. Third-Party Services</h2>
            <h3 className="font-semibold text-white mb-2">Google AdSense</h3>
            <p className="mb-4">
              We use Google AdSense to display advertisements. Google may use the DoubleClick cookie or other cookies to
              serve ads based on your prior visits to this or other websites. You can opt out at{' '}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300">
                google.com/settings/ads
              </a>.
            </p>
            <h3 className="font-semibold text-white mb-2">Firebase (Google)</h3>
            <p>
              FileShare uses Firebase Realtime Database and Firebase Storage for real-time syncing and temporary file hosting.
              Firebase is subject to{' '}
              <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300">
                Google's Privacy Policy
              </a>.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-white mb-3">6. Children's Privacy</h2>
            <p>
              FileShare is not directed at children under the age of 13. We do not knowingly collect personal information
              from children. If you believe a child has provided us with personal data, please contact us and we will
              delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-white mb-3">7. Your Rights</h2>
            <p>
              Depending on your jurisdiction, you may have rights to access, correct, or delete personal information we
              hold about you. Since we do not require sign-up, we hold minimal personal data. For any data-related
              requests, please contact us at{' '}
              <a href="mailto:contact@livesharefile.app" className="text-indigo-400 hover:text-indigo-300">
                contact@livesharefile.app
              </a>.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-white mb-3">8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated
              date. Your continued use of FileShare after any changes constitutes your acceptance of the new policy.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-white mb-3">9. Contact</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at:{' '}
              <a href="mailto:contact@livesharefile.app" className="text-indigo-400 hover:text-indigo-300">
                contact@livesharefile.app
              </a>
            </p>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
}
