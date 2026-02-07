import { useEffect, useState } from 'react';

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const script = document.createElement('script');
    script.src = 'https://autoreplychat.com/embed.js';
    script.defer = true;
    script.dataset.botId = '7090162816048314af2455bf';
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      {/* Custom Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=DM+Sans:wght@400;500;700&display=swap');
        
        :root {
          --color-primary: #0f172a;
          --color-accent: #f59e0b;
          --color-slate: #1e293b;
          --color-slate-light: #334155;
        }
        
        body {
          font-family: 'DM Sans', sans-serif;
        }
        
        .font-display {
          font-family: 'Crimson Pro', serif;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .grain {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
        
        .gradient-mesh {
          position: absolute;
          inset: 0;
          opacity: 0.4;
          background: 
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(245, 158, 11, 0.15), transparent),
            radial-gradient(ellipse 60% 50% at 80% 50%, rgba(59, 130, 246, 0.1), transparent);
          filter: blur(80px);
        }
      `}</style>

      {/* Grain Texture */}
      <div className="grain" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-display text-2xl font-bold">
            <span className="text-amber-500">Auto</span>
            <span className="text-slate-100">ReplyChat</span>
          </div>
          <div className="flex gap-6 items-center">
            <a href="#features" className="text-slate-300 hover:text-amber-500 transition-colors text-sm font-medium">
              Features
            </a>
            <a href="#demo" className="text-slate-300 hover:text-amber-500 transition-colors text-sm font-medium">
              Demo
            </a>
            <a href="#pricing" className="text-slate-300 hover:text-amber-500 transition-colors text-sm font-medium">
              Pricing
            </a>
            <a 
              href="https://api.autoreplychat.com/login" 
              className="px-5 py-2 bg-amber-500 text-slate-950 rounded-lg font-medium hover:bg-amber-400 transition-all hover:scale-105 text-sm"
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="gradient-mesh" />
        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Copy */}
            <div className="space-y-8">
              <div className={`space-y-6 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                <div className="inline-block px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-500 text-sm font-medium">
                  AI-Powered Customer Support
                </div>
                <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight">
                  Answer every
                  <br />
                  customer,
                  <br />
                  <span className="text-amber-500">instantly.</span>
                </h1>
                <p className="text-xl text-slate-400 leading-relaxed max-w-xl">
                  Train Claude AI on your documentation and let it handle customer questions 24/7. 
                  Capture leads, integrate with your workflow, and never miss an opportunity.
                </p>
              </div>
              
              <div className={`flex flex-col sm:flex-row gap-4 ${isVisible ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}>
                <a 
                  href="https://api.autoreplychat.com/signup" 
                  className="px-8 py-4 bg-amber-500 text-slate-950 rounded-lg font-bold text-lg hover:bg-amber-400 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/20 text-center"
                >
                  Start Free Trial
                </a>
                <a 
                  href="#demo" 
                  className="px-8 py-4 bg-slate-800/50 text-slate-100 rounded-lg font-bold text-lg hover:bg-slate-800 transition-all border border-slate-700 text-center"
                >
                  See It Live →
                </a>
              </div>

              <div className={`flex items-center gap-8 pt-6 ${isVisible ? 'animate-fade-in-up delay-300' : 'opacity-0'}`}>
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i} 
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 border-2 border-slate-950"
                    />
                  ))}
                </div>
                <div className="text-sm text-slate-400">
                  <span className="text-slate-100 font-semibold">500+</span> teams already using AutoReplyChat
                </div>
              </div>
            </div>

            {/* Right Column - Visual */}
            <div className={`relative ${isVisible ? 'animate-fade-in-up delay-400' : 'opacity-0'}`}>
              <div className="relative">
                {/* Decorative Elements */}
                <div className="absolute -top-20 -right-20 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                
                {/* Chat Preview Card */}
                <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-700 flex-shrink-0" />
                      <div className="flex-1 bg-slate-800 rounded-2xl rounded-tl-none p-4 text-sm text-slate-300">
                        Hey! What are your business hours?
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 justify-end">
                      <div className="flex-1 bg-amber-500 rounded-2xl rounded-tr-none p-4 text-sm text-slate-950 font-medium">
                        We're open Monday-Friday, 9 AM to 6 PM EST. 
                        I can help you right now though!
                      </div>
                      <div className="w-8 h-8 rounded-full bg-amber-500 flex-shrink-0 flex items-center justify-center text-slate-950 font-bold text-xs">
                        AI
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-700 flex-shrink-0" />
                      <div className="flex-1 bg-slate-800 rounded-2xl rounded-tl-none p-4 text-sm text-slate-300">
                        Can you integrate with Slack?
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 justify-end">
                      <div className="flex-1 bg-amber-500 rounded-2xl rounded-tr-none p-4 text-sm text-slate-950 font-medium">
                        Yes! We have native Slack integration. 
                        Would you like me to show you how to set it up?
                      </div>
                      <div className="w-8 h-8 rounded-full bg-amber-500 flex-shrink-0 flex items-center justify-center text-slate-950 font-bold text-xs">
                        AI
                      </div>
                    </div>
                  </div>
                  
                  {/* Typing Indicator */}
                  <div className="flex items-center gap-2 mt-4 text-xs text-slate-500">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-slate-600 rounded-full animate-pulse" />
                      <div className="w-2 h-2 bg-slate-600 rounded-full animate-pulse delay-100" />
                      <div className="w-2 h-2 bg-slate-600 rounded-full animate-pulse delay-200" />
                    </div>
                    <span>AI is typing...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-32 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Everything you need.
              <br />
              <span className="text-amber-500">Nothing you don't.</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Built for modern teams who want AI that actually works.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🧠',
                title: 'Train on Your Docs',
                description: 'Upload PDFs, paste URLs, or scrape your website. Claude learns your product inside-out.'
              },
              {
                icon: '⚡',
                title: 'Instant Responses',
                description: 'No wait times. No tickets. Just immediate, accurate answers powered by Claude AI.'
              },
              {
                icon: '📊',
                title: 'Lead Capture',
                description: 'Every chat is an opportunity. Collect emails and get notified when prospects engage.'
              },
              {
                icon: '🎨',
                title: 'Branded Widget',
                description: 'Customize colors, position, and behavior. Make it yours in seconds.'
              },
              {
                icon: '🔐',
                title: 'Secure & Private',
                description: 'Enterprise-grade security. Your data stays yours. SOC 2 compliant.'
              },
              {
                icon: '🚀',
                title: 'One-Line Install',
                description: 'Copy, paste, done. Works on any website. No developers required.'
              }
            ].map((feature, i) => (
              <div 
                key={i}
                className="group bg-slate-900/30 border border-slate-800 rounded-2xl p-8 hover:bg-slate-900/50 hover:border-amber-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-amber-500/5"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="font-display text-2xl font-bold mb-3 group-hover:text-amber-500 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section id="demo" className="relative py-32 border-t border-slate-800/50">
        <div className="gradient-mesh opacity-20" />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Try it <span className="text-amber-500">right now.</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              This is a real AI assistant trained on our documentation. 
              Ask it anything about AutoReplyChat.
            </p>
          </div>

          {/* Demo Widget Container */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 to-blue-500/20 rounded-3xl blur-2xl" />
            <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl">
              <div className="bg-slate-800/50 rounded-xl p-12 text-center border border-slate-700">
                <p className="text-slate-400 mb-4">
                  👉 <span className="text-amber-500 font-semibold">Click the chat widget</span> in the bottom-right corner to test our AI
                </p>
                <p className="text-sm text-slate-500">
                  This is the actual widget your customers will interact with
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-500 text-sm mb-4">
              Impressed? Get your own AI assistant in under 5 minutes.
            </p>
            <a 
              href="https://api.autoreplychat.com/signup" 
              className="inline-block px-8 py-4 bg-amber-500 text-slate-950 rounded-lg font-bold text-lg hover:bg-amber-400 transition-all hover:scale-105"
            >
              Start Your Free Trial
            </a>
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section id="pricing" className="relative py-32 border-t border-slate-800/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-5xl md:text-6xl font-bold mb-6">
            Simple, transparent pricing.
          </h2>
          <p className="text-xl text-slate-400 mb-12">
            Start free. Upgrade when you're ready.
          </p>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12">
            <div className="mb-8">
              <div className="font-display text-6xl font-bold text-amber-500 mb-2">
                $99<span className="text-2xl text-slate-400">/mo</span>
              </div>
              <p className="text-slate-400">Everything included. No hidden fees.</p>
            </div>

            <ul className="space-y-4 mb-8 text-left max-w-md mx-auto">
              {[
                'Unlimited conversations',
                'Train on unlimited docs',
                'Lead capture & notifications',
                'Custom branding',
                'Priority support',
                '30-day free trial'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <a 
              href="https://api.autoreplychat.com/signup" 
              className="inline-block px-8 py-4 bg-amber-500 text-slate-950 rounded-lg font-bold text-lg hover:bg-amber-400 transition-all hover:scale-105 w-full max-w-md"
            >
              Start Free Trial →
            </a>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative py-32 border-t border-slate-800/50">
        <div className="gradient-mesh opacity-30" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="font-display text-5xl md:text-6xl font-bold mb-6">
            Ready to automate
            <br />
            your <span className="text-amber-500">customer support?</span>
          </h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
            Join hundreds of teams using AutoReplyChat to deliver instant, accurate answers to every customer question.
          </p>
          <a 
            href="https://api.autoreplychat.com/signup" 
            className="inline-block px-12 py-5 bg-amber-500 text-slate-950 rounded-lg font-bold text-xl hover:bg-amber-400 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/20"
          >
            Get Started Free
          </a>
          <p className="text-slate-500 text-sm mt-6">
            No credit card required • 30-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="font-display text-xl font-bold">
              <span className="text-amber-500">Auto</span>
              <span className="text-slate-100">ReplyChat</span>
            </div>
            <div className="flex gap-8 text-sm text-slate-400">
              <a href="#" className="hover:text-amber-500 transition-colors">Privacy</a>
              <a href="#" className="hover:text-amber-500 transition-colors">Terms</a>
              <a href="#" className="hover:text-amber-500 transition-colors">Contact</a>
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
