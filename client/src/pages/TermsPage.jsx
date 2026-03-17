import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#070B14] text-white">
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-20 lg:px-8">
        <div className="mb-12">
          <h1 className="font-display text-4xl font-bold tracking-tight text-white mb-3">Terms &amp; Conditions</h1>
          <p className="text-gray-500 text-sm font-body">Last updated: March 17, 2026</p>
        </div>

        <div className="space-y-10 font-body text-gray-300 leading-7">

          <section>
            <h2 className="font-display text-xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using FileShare ("the Service"), you agree to be bound by these Terms and Conditions. If you
              do not agree to these terms, please do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-white mb-3">2. Description of Service</h2>
            <p>
              FileShare is a temporary, anonymous file and clipboard sharing service. Users can create rooms, upload files,
              and share clipboard content with others. Rooms and all associated content are automatically deleted after 24 hours.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-white mb-3">3. Acceptable Use</h2>
            <p className="mb-3">You agree not to use the Service to upload, share, or transmit content that:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li>Is illegal under any applicable law or regulation</li>
              <li>Infringes any intellectual property rights of a third party</li>
              <li>Contains malware, viruses, or other harmful code</li>
              <li>Is abusive, threatening, defamatory, or harassing</li>
              <li>Constitutes spam or unsolicited commercial communication</li>
              <li>Violates the privacy of any individual</li>
              <li>Exploits or harms minors in any way</li>
            </ul>
            <p className="mt-3">
              We reserve the right to remove content and terminate access to the Service at any time, without notice, for
              violation of these terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-white mb-3">4. User Responsibility</h2>
            <p>
              You are solely responsible for the content you upload and share using the Service. FileShare does not
              review, moderate, or endorse user-generated content. You represent and warrant that you have the legal right
              to share all content you upload.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-white mb-3">5. Data &amp; Content Expiry</h2>
            <p>
              All files and room data are automatically and permanently deleted 24 hours after creation. You are responsible
              for maintaining your own copies of any important content. FileShare does not guarantee data availability
              within the 24-hour window and accepts no liability for lost content.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-white mb-3">6. Service Availability</h2>
            <p>
              The Service is provided "as-is" and may be modified, suspended, or discontinued at any time without prior
              notice. We do not guarantee uninterrupted or error-free operation.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-white mb-3">7. Disclaimer of Warranties</h2>
            <p>
              THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
              LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT
              WARRANT THAT THE SERVICE WILL BE SECURE, UNINTERRUPTED, OR ERROR-FREE.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-white mb-3">8. Limitation of Liability</h2>
            <p>
              TO THE FULLEST EXTENT PERMITTED BY LAW, FILESHARE AND ITS OPERATORS SHALL NOT BE LIABLE FOR ANY INDIRECT,
              INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF DATA OR PROFITS, ARISING FROM
              YOUR USE OF THE SERVICE.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-white mb-3">9. Advertising</h2>
            <p>
              The Service may display third-party advertisements served by Google AdSense. We are not responsible for the
              content of such advertisements or for any products or services they promote.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-white mb-3">10. Changes to Terms</h2>
            <p>
              We reserve the right to update these Terms at any time. Updated terms will be posted on this page with a
              revised date. Your continued use of the Service after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-white mb-3">11. Governing Law</h2>
            <p>
              These Terms are governed by and construed in accordance with applicable law. Any disputes shall be resolved
              through the appropriate courts of competent jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-white mb-3">12. Contact</h2>
            <p>
              For questions about these Terms, contact us at:{' '}
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
