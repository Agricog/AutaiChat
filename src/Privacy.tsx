import { useEffect } from 'react';

export default function Privacy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=DM+Sans:wght@400;500;700&display=swap');
        body { font-family: 'DM Sans', sans-serif; }
        .font-display { font-family: 'Crimson Pro', serif; }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="font-display text-2xl font-bold">
            <span className="text-amber-500">Auto</span>
            <span className="text-slate-100">ReplyChat</span>
          </a>
          <a 
            href="/" 
            className="text-slate-300 hover:text-amber-500 transition-colors text-sm font-medium"
          >
            ← Back to Home
          </a>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-20">
        <h1 className="font-display text-5xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-slate-400 mb-12">Last updated: 7 February 2026</p>

        <div className="space-y-8 text-slate-300 leading-relaxed">
          <section>
            <h2 className="font-display text-2xl font-bold text-slate-100 mb-4">1. Introduction</h2>
            <p>AutoReplyChat ("we", "our", "us") is operated by Autaimate. We are committed to protecting the privacy of our customers and their end users. This policy explains how we collect, use, and safeguard your information when you use our platform.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-slate-100 mb-4">2. Information We Collect</h2>
            <p className="mb-3">We collect the following types of information:</p>
            <p className="mb-2"><strong className="text-slate-100">Account Information:</strong> When you sign up, we collect your name, email address, and business email address. Your password is securely hashed and never stored in plain text.</p>
            <p className="mb-2"><strong className="text-slate-100">Content You Upload:</strong> Documents, website URLs, and other training materials you provide to train your chatbot. This content is processed and stored as vector embeddings to power AI responses.</p>
            <p className="mb-2"><strong className="text-slate-100">Chat Data:</strong> Conversations between your website visitors and your chatbot, including any lead information (name, email, phone) voluntarily provided by visitors through the lead capture form.</p>
            <p><strong className="text-slate-100">Usage Data:</strong> Basic analytics such as login times, number of conversations, and feature usage to help us improve the service.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-slate-100 mb-4">3. How We Use Your Information</h2>
            <p className="mb-2">We use collected information to provide and maintain the AutoReplyChat service, including generating AI-powered responses from your training content, delivering lead notifications to your specified email addresses, and improving our platform.</p>
            <p>We do not sell, rent, or share your personal information or your training content with third parties for marketing purposes.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-slate-100 mb-4">4. Third-Party Services</h2>
            <p className="mb-2">We use the following third-party services to operate the platform:</p>
            <p className="mb-2"><strong className="text-slate-100">Anthropic (Claude AI):</strong> Chat messages and relevant training content are sent to Anthropic's API to generate responses. Anthropic's privacy policy applies to this processing.</p>
            <p className="mb-2"><strong className="text-slate-100">Railway:</strong> Our infrastructure is hosted on Railway's cloud platform.</p>
            <p><strong className="text-slate-100">Resend:</strong> Used to deliver lead notification emails to your business email address.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-slate-100 mb-4">5. Data Security</h2>
            <p>We implement industry-standard security measures including encrypted connections (HTTPS), secure password hashing (bcrypt), session-based authentication with automatic timeout, and tenant isolation ensuring customers cannot access each other's data. While no system is 100% secure, we take reasonable precautions to protect your information.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-slate-100 mb-4">6. Data Retention</h2>
            <p>Your account data, training content, and chat logs are retained for as long as your account is active. Upon account deletion, all associated data including training content, embeddings, chat history, and lead information will be permanently removed within 30 days.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-slate-100 mb-4">7. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal data at any time. You can export your lead data from the dashboard. To request full account deletion or data export, contact us at mick@autoreplychat.com.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-slate-100 mb-4">8. Cookies</h2>
            <p>We use a single session cookie (sessionId) to maintain your login state. This is essential for the service to function and expires after 15 minutes of inactivity. We do not use tracking cookies or third-party advertising cookies.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-slate-100 mb-4">9. Changes to This Policy</h2>
            <p>We may update this privacy policy from time to time. We will notify registered users of any material changes via email.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-slate-100 mb-4">10. Contact</h2>
            <p>If you have questions about this privacy policy, contact us at:</p>
            <p className="mt-2">Email: <a href="mailto:mick@autoreplychat.com" className="text-amber-500 hover:text-amber-400">mick@autoreplychat.com</a></p>
            <p>Phone: <a href="tel:+447501439406" className="text-amber-500 hover:text-amber-400">07501 439406</a></p>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <a href="/" className="font-display text-xl font-bold">
              <span className="text-amber-500">Auto</span>
              <span className="text-slate-100">ReplyChat</span>
            </a>
            <div className="flex gap-8 text-sm text-slate-400">
              <a href="/privacy" className="text-amber-500">Privacy</a>
              <a href="/terms" className="hover:text-amber-500 transition-colors">Terms</a>
            </div>
            <div className="text-sm text-slate-500">
              © 2026 AutoReplyChat. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
