export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=DM+Sans:wght@400;500;700&display=swap');
        body { font-family: 'DM Sans', sans-serif; }
        .font-display { font-family: 'Crimson Pro', serif; }
      `}</style>

      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="font-display text-2xl font-bold">
            <span className="text-amber-500">Auto</span>
            <span className="text-slate-100">ReplyChat</span>
          </a>
          <a 
            href="https://api.autoreplychat.com/login" 
            className="px-5 py-2 bg-amber-500 text-slate-950 rounded-lg font-medium hover:bg-amber-400 transition-all text-sm"
          >
            Get Started
          </a>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 pt-32 pb-20">
        <h1 className="font-display text-5xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-slate-400 mb-12">Last updated: February 2026</p>

        <div className="space-y-8 text-slate-300 leading-relaxed">
          <section>
            <h2 className="font-display text-2xl font-bold text-slate-100 mb-3">1. Introduction</h2>
            <p>AutoReplyChat ("we", "our", "us") is operated by Autaimate. We are committed to protecting the privacy of our customers and their end users. This policy explains how we collect, use, and safeguard your data.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-slate-100 mb-3">2. Information We Collect</h2>
            <p className="mb-3">We collect the following information:</p>
            <p><strong className="text-slate-100">Account Information:</strong> Name, email address, and business email provided during signup.</p>
            <p className="mt-2"><strong className="text-slate-100">Content Data:</strong> Documents, URLs, and other training materials you upload to train your chatbot.</p>
            <p className="mt-2"><strong className="text-slate-100">Chat Data:</strong> Conversations between your chatbot and your website visitors, including any lead information (name, email, phone) voluntarily provided by visitors.</p>
            <p className="mt-2"><strong className="text-slate-100">Usage Data:</strong> Login activity, feature usage, and session information to maintain and improve our service.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-slate-100 mb-3">3. How We Use Your Information</h2>
            <p>We use your information to provide and maintain the AutoReplyChat service, including powering AI-generated responses from your uploaded content, delivering lead capture notifications, and improving service reliability and performance. We do not sell your data to third parties.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-slate-100 mb-3">4. Data Storage & Security</h2>
            <p>All data is stored in secure PostgreSQL databases with encryption at rest. We use industry-standard security practices including bcrypt password hashing, session-based authentication with automatic timeout, and HTTPS encryption for all data in transit. Your data is logically isolated from other customers in our multi-tenant architecture.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-slate-100 mb-3">5. Third-Party Services</h2>
            <p>We use the following third-party services to operate AutoReplyChat:</p>
            <p className="mt-2"><strong className="text-slate-100">Anthropic (Claude AI):</strong> To generate chatbot responses based on your training content.</p>
            <p className="mt-2"><strong className="text-slate-100">Resend:</strong> To deliver lead capture email notifications.</p>
            <p className="mt-2"><strong className="text-slate-100">Railway:</strong> For secure application hosting.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-slate-100 mb-3">6. Data Retention</h2>
            <p>We retain your data for as long as your account is active. If you cancel your account, we will delete your data within 30 days of cancellation. You may request deletion of your data at any time by contacting us.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-slate-100 mb-3">7. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal data. You may export your data or request its deletion by contacting us at mick@autoreplychat.com.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-slate-100 mb-3">8. Contact</h2>
            <p>If you have questions about this privacy policy, contact us at:</p>
            <p className="mt-2">Email: <a href="mailto:mick@autoreplychat.com" className="text-amber-500 hover:underline">mick@autoreplychat.com</a></p>
            <p>Phone: <a href="tel:07501439406" className="text-amber-500 hover:underline">07501 439406</a></p>
          </section>
        </div>
      </div>

      <footer className="border-t border-slate-800/50 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <a href="/" className="font-display text-xl font-bold">
              <span className="text-amber-500">Auto</span>
              <span className="text-slate-100">ReplyChat</span>
            </a>
            <div className="flex gap-8 text-sm text-slate-400">
              <a href="/privacy" className="hover:text-amber-500 transition-colors">Privacy</a>
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
