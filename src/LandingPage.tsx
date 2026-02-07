import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://autoreplychat.com/#organization',
      name: 'AutoReplyChat',
      url: 'https://autoreplychat.com',
      logo: 'https://autoreplychat.com/og-image.png',
      description: 'AI-powered customer support chatbot platform for businesses.',
      founder: {
        '@type': 'Person',
        name: 'Mick',
        jobTitle: 'Founder'
      },
      parentOrganization: {
        '@type': 'Organization',
        name: 'Autaimate',
        url: 'https://autaimate.com'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'mick@autoreplychat.com',
        telephone: '+447501439406',
        contactType: 'customer support'
      }
    },
    {
      '@type': 'WebPage',
      '@id': 'https://autoreplychat.com/#webpage',
      url: 'https://autoreplychat.com',
      name: 'AutoReplyChat | AI Customer Support Chatbot for Your Website',
      description: 'Train AI on your docs and deploy a customer support chatbot in minutes. Lead capture, branded widget, 24/7 instant answers. 30-day free trial.',
      isPartOf: { '@id': 'https://autoreplychat.com/#organization' },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', '.quick-answer']
      }
    },
    {
      '@type': 'SoftwareApplication',
      name: 'AutoReplyChat',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description: 'AI-powered customer support chatbot that trains on your documentation and answers customer questions 24/7.',
      offers: {
        '@type': 'Offer',
        price: '99.00',
        priceCurrency: 'GBP',
        priceValidUntil: '2026-12-31'
      },
      featureList: [
        'AI chatbot trained on your documents',
        'Lead capture with email notifications',
        'Customisable branded widget',
        'PDF, Word, CSV file upload training',
        'Website scraping for content training',
        'YouTube transcript extraction',
        'Multi-language support',
        'One-line embed code installation'
      ]
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://autoreplychat.com'
        }
      ]
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How does AutoReplyChat work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Upload your documentation (PDFs, Word files, website URLs, or YouTube videos) and AutoReplyChat uses Claude AI to train a chatbot that answers customer questions based on your content. Simply add one line of code to your website to deploy the widget.'
          }
        },
        {
          '@type': 'Question',
          name: 'What file types can I use to train my chatbot?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'AutoReplyChat supports PDF documents, Microsoft Word files, plain text files, CSV spreadsheets (up to 20MB each), website scraping (single page or full site), and YouTube video transcript extraction.'
          }
        },
        {
          '@type': 'Question',
          name: 'How long does it take to set up?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Most businesses are up and running in under 5 minutes. Create an account, upload your content, customise your widget colours, and paste the embed code on your website. Your chatbot starts answering questions immediately.'
          }
        },
        {
          '@type': 'Question',
          name: 'Does AutoReplyChat capture leads?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. AutoReplyChat includes built-in lead capture that collects visitor names, email addresses, and phone numbers. You receive instant email notifications whenever a new lead engages with your chatbot.'
          }
        },
        {
          '@type': 'Question',
          name: 'What AI model powers the chatbot?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'AutoReplyChat is powered by Claude AI from Anthropic, one of the most capable and safe AI models available. Claude provides accurate, helpful responses grounded in your uploaded documentation.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can I customise how the chatbot looks?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. You can fully customise the widget colours, header text, welcome message, position on your page, and chat bubble style to match your brand. All customisation is done through the dashboard with a live preview.'
          }
        },
        {
          '@type': 'Question',
          name: 'Is there a free trial?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Every new account gets a 30-day free trial with full access to all features including unlimited conversations, document uploads, lead capture, and custom branding. No credit card required to start.'
          }
        },
        {
          '@type': 'Question',
          name: 'How much does AutoReplyChat cost?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'After your 30-day free trial, AutoReplyChat is a one-time £300 setup fee plus £99 per month (£399 to start). Everything is included — unlimited conversations, unlimited document training, lead capture, custom branding, multi-language support, and priority support.'
          }
        },
        {
          '@type': 'Question',
          name: 'Is my data secure?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. AutoReplyChat uses enterprise-grade security including encrypted databases, bcrypt password hashing, session-based authentication, and strict tenant isolation. Your data is never shared with or accessible to other customers.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can the chatbot handle multiple languages?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'AutoReplyChat automatically detects your visitor\'s browser language and can respond in over 95 languages. This makes it ideal for businesses serving international customers.'
          }
        }
      ]
    }
  ]
};

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
      <Helmet>
        <title>AutoReplyChat | AI Customer Support Chatbot for Your Website</title>
        <meta name="description" content="Train AI on your docs and deploy a customer support chatbot in minutes. Lead capture, branded widget, 24/7 instant answers. 30-day free trial." />
        <link rel="canonical" href="https://autoreplychat.com" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://autoreplychat.com" />
        <meta property="og:title" content="AutoReplyChat | AI Customer Support Chatbot for Your Website" />
        <meta property="og:description" content="Train AI on your docs and deploy a customer support chatbot in minutes. Lead capture, branded widget, 24/7 instant answers." />
        <meta property="og:image" content="https://autoreplychat.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AutoReplyChat | AI Customer Support Chatbot" />
        <meta name="twitter:description" content="Train AI on your docs and deploy a customer support chatbot in minutes. 30-day free trial." />
        <meta name="twitter:image" content="https://autoreplychat.com/og-image.png" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

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

      {/* Quick Answer Box for Voice Search / AI Snippets */}
      <div className="quick-answer sr-only" aria-hidden="true">
        AutoReplyChat is an AI-powered customer support chatbot that trains on your documentation and answers customer questions 24/7 on your website.
      </div>

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
            <a href="#how-it-works" className="text-slate-300 hover:text-amber-500 transition-colors text-sm font-medium">
              How It Works
            </a>
            <a href="#demo" className="text-slate-300 hover:text-amber-500 transition-colors text-sm font-medium">
              Demo
            </a>
            <a href="#pricing" className="text-slate-300 hover:text-amber-500 transition-colors text-sm font-medium">
              Pricing
            </a>
            <a href="#faq" className="text-slate-300 hover:text-amber-500 transition-colors text-sm font-medium">
              FAQ
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
                <div className="absolute -top-20 -right-20 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                
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
                        Do you offer a free trial?
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 justify-end">
                      <div className="flex-1 bg-amber-500 rounded-2xl rounded-tr-none p-4 text-sm text-slate-950 font-medium">
                        Absolutely! Every account starts with a 30-day free trial — full access, no credit card required.
                      </div>
                      <div className="w-8 h-8 rounded-full bg-amber-500 flex-shrink-0 flex items-center justify-center text-slate-950 font-bold text-xs">
                        AI
                      </div>
                    </div>
                  </div>
                  
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
              Built for modern teams who want AI customer support that actually works. No complex setup, no coding required, just results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🧠',
                title: 'Train on Your Docs',
                description: 'Upload PDFs, Word documents, CSV files, paste URLs, or scrape your entire website. Claude AI learns your product inside-out and answers questions based on your actual content.'
              },
              {
                icon: '⚡',
                title: 'Instant Responses',
                description: 'No wait times. No support tickets. No frustrated customers. Just immediate, accurate answers powered by Claude AI, available around the clock, every day of the year.'
              },
              {
                icon: '📊',
                title: 'Lead Capture',
                description: 'Every chat is an opportunity. Automatically collect visitor names, emails, and phone numbers. Get instant email notifications when new prospects engage with your chatbot.'
              },
              {
                icon: '🎨',
                title: 'Branded Widget',
                description: 'Customise colours, header text, welcome messages, and widget position to match your brand perfectly. Your chatbot looks and feels like a native part of your website.'
              },
              {
                icon: '🔐',
                title: 'Secure & Private',
                description: 'Enterprise-grade security with encrypted databases, bcrypt password hashing, session-based authentication, and strict multi-tenant isolation. Your data stays yours.'
              },
              {
                icon: '🚀',
                title: 'One-Line Install',
                description: 'Copy one line of code, paste it before your closing body tag, and you are done. Works on any website — WordPress, Shopify, Squarespace, custom builds, or anything else.'
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

      {/* How It Works Section */}
      <section id="how-it-works" className="relative py-32 border-t border-slate-800/50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Up and running in
              <br />
              <span className="text-amber-500">three steps.</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Most businesses have their AI chatbot live on their website within five minutes. No technical knowledge required.
            </p>
          </div>

          <div className="space-y-16">
            {[
              {
                step: '01',
                title: 'Upload Your Content',
                description: 'Sign up for a free account and upload the content you want your chatbot to know. This can be PDF documents, Word files, CSV spreadsheets, website URLs, or even YouTube video links. AutoReplyChat processes your content and creates a knowledge base that Claude AI uses to answer questions accurately. You can upload as many documents as you need — there are no limits on training content. The more information you provide, the more comprehensive and helpful your chatbot becomes.'
              },
              {
                step: '02',
                title: 'Customise Your Widget',
                description: 'Make the chatbot yours. Choose your brand colours, write a custom welcome message, set the header text, and pick where the widget appears on your page. The appearance editor gives you a live preview so you can see exactly how it will look before going live. You can also configure bot instructions to control the tone and style of responses — whether you want formal, friendly, technical, or casual. Everything is managed through your dashboard with no code changes needed.'
              },
              {
                step: '03',
                title: 'Embed and Go Live',
                description: 'Copy the single line of embed code from your dashboard and paste it into your website. That is it. Your AI chatbot is now live and ready to answer customer questions 24 hours a day, 7 days a week. It works on any platform — WordPress, Shopify, Squarespace, Wix, custom HTML, React apps, or anything that supports a script tag. The widget loads asynchronously so it will not slow down your site, and it is fully responsive on mobile devices.'
              }
            ].map((item, i) => (
              <div key={i} className="flex gap-8 items-start">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                  <span className="font-display text-2xl font-bold text-amber-500">{item.step}</span>
                </div>
                <div>
                  <h3 className="font-display text-3xl font-bold text-slate-100 mb-4">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-lg">{item.description}</p>
                </div>
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
              Ask it anything about AutoReplyChat and see the quality of responses for yourself.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 to-blue-500/20 rounded-3xl blur-2xl" />
            <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl">
              <div className="bg-slate-800/50 rounded-xl p-12 text-center border border-slate-700">
                <p className="text-slate-400 mb-4">
                  👉 <span className="text-amber-500 font-semibold">Click the chat widget</span> in the bottom-right corner to test our AI
                </p>
                <p className="text-sm text-slate-500">
                  This is the actual widget your customers will interact with — trained on AutoReplyChat's own documentation
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

      {/* Use Cases Section */}
      <section className="relative py-32 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Built for <span className="text-amber-500">every business.</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Whether you run a local service or a global SaaS, AutoReplyChat handles your customer questions so you can focus on growing your business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'E-commerce & Retail',
                description: 'Answer product questions, shipping queries, and return policies instantly. Reduce support tickets by up to 80% while capturing leads from interested browsers who might otherwise leave your site without buying.'
              },
              {
                title: 'Professional Services',
                description: 'Law firms, accountants, consultants — let your chatbot explain your services, answer common questions about processes and fees, and capture enquiries from potential clients visiting your website outside business hours.'
              },
              {
                title: 'SaaS & Technology',
                description: 'Train your chatbot on your product documentation, API guides, and knowledge base articles. Provide instant technical support to users and free up your engineering team from repetitive support queries.'
              },
              {
                title: 'Healthcare & Care Homes',
                description: 'Help families find information about your services, visiting hours, admission processes, and facilities. Capture enquiry details so your team can follow up personally during working hours.'
              }
            ].map((useCase, i) => (
              <div key={i} className="bg-slate-900/30 border border-slate-800 rounded-2xl p-8">
                <h3 className="font-display text-2xl font-bold text-slate-100 mb-4">{useCase.title}</h3>
                <p className="text-slate-400 leading-relaxed">{useCase.description}</p>
              </div>
            ))}
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
            Start free. Upgrade when you're ready. No hidden fees, no usage limits.
          </p>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12">
            <div className="mb-8">
              <div className="font-display text-6xl font-bold text-amber-500 mb-2">
                £99<span className="text-2xl text-slate-400">/mo</span>
              </div>
              <p className="text-slate-400">£300 one-time setup fee + £99/mo. 30-day free trial first.</p>
            </div>

            <ul className="space-y-4 mb-8 text-left max-w-md mx-auto">
              {[
                'Unlimited conversations',
                'Train on unlimited docs',
                'Lead capture & notifications',
                'Custom branding',
                'Multi-language support (95+ languages)',
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

      {/* FAQ Section */}
      <section id="faq" className="relative py-32 border-t border-slate-800/50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Frequently asked <span className="text-amber-500">questions.</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Everything you need to know about AutoReplyChat. Can't find your answer? Try the live demo chatbot — it knows everything about us.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                q: 'How does AutoReplyChat work?',
                a: 'Upload your documentation — PDFs, Word files, website URLs, or YouTube videos — and AutoReplyChat uses Claude AI to train a chatbot that answers customer questions based on your content. Add one line of code to your website and the chatbot goes live immediately.'
              },
              {
                q: 'What file types can I use to train my chatbot?',
                a: 'AutoReplyChat supports PDF documents, Microsoft Word files (.doc, .docx), plain text files, and CSV spreadsheets up to 20MB each. You can also scrape single web pages or entire websites, and extract transcripts from YouTube videos automatically.'
              },
              {
                q: 'How long does it take to set up?',
                a: 'Most businesses are up and running in under five minutes. Create an account, upload your content, customise your widget colours, and paste the embed code on your website. Your chatbot starts answering questions immediately.'
              },
              {
                q: 'Does AutoReplyChat capture leads?',
                a: 'Yes. Built-in lead capture collects visitor names, email addresses, and phone numbers during conversations. You receive instant email notifications whenever a new lead engages, so you can follow up quickly.'
              },
              {
                q: 'What AI model powers the chatbot?',
                a: 'AutoReplyChat is powered by Claude AI from Anthropic, one of the most capable and safe AI models available. Claude provides accurate, helpful responses grounded in your uploaded documentation rather than making things up.'
              },
              {
                q: 'Can I customise how the chatbot looks?',
                a: 'Absolutely. You can customise widget colours, header text, welcome messages, position on your page, and chat bubble style. Everything is done through the dashboard with a live preview so you can see changes before they go live.'
              },
              {
                q: 'Is there a free trial?',
                a: 'Yes. Every new account gets a 30-day free trial with full access to all features including unlimited conversations, document uploads, lead capture, and custom branding. No credit card is required to get started.'
              },
              {
                q: 'How much does it cost after the trial?',
                a: 'After your 30-day free trial, AutoReplyChat is a one-time £300 setup fee plus £99 per month (£399 to start). Everything is included — unlimited conversations, unlimited document training, lead capture, custom branding, multi-language support, and priority support.'
              },
              {
                q: 'Is my data secure?',
                a: 'Yes. We use enterprise-grade security including encrypted PostgreSQL databases, bcrypt password hashing, session-based authentication with automatic timeout, and strict multi-tenant isolation. Your data is never shared with or accessible to other customers.'
              },
              {
                q: 'Can the chatbot handle multiple languages?',
                a: 'Yes. AutoReplyChat automatically detects your visitor\'s browser language and can respond in over 95 languages. This makes it ideal for businesses with international customers or multilingual audiences.'
              }
            ].map((faq, i) => (
              <div key={i} className="bg-slate-900/30 border border-slate-800 rounded-2xl p-6">
                <h3 className="font-display text-xl font-bold text-slate-100 mb-3">{faq.q}</h3>
                <p className="text-slate-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
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
            Join hundreds of teams using AutoReplyChat to deliver instant, accurate answers to every customer question. Set up in minutes, not weeks.
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
          <div className="flex flex-col md:flex-row justify-between items-start gap-10">
            {/* Brand & Contact */}
            <div className="space-y-4">
              <div className="font-display text-xl font-bold">
                <span className="text-amber-500">Auto</span>
                <span className="text-slate-100">ReplyChat</span>
              </div>
              <div className="text-sm text-slate-400 space-y-1">
                <p>AI-powered customer support by{' '}
                  <a href="https://autaimate.com" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-amber-500 transition-colors">
                    Autaimate
                  </a>
                </p>
                <p>
                  <a href="mailto:mick@autoreplychat.com" className="hover:text-amber-500 transition-colors">
                    mick@autoreplychat.com
                  </a>
                </p>
                <p>
                  <a href="tel:+447501439406" className="hover:text-amber-500 transition-colors">
                    07501 439406
                  </a>
                </p>
              </div>
            </div>

            {/* Links */}
            <div className="flex gap-8 text-sm text-slate-400">
              <a href="/privacy" className="hover:text-amber-500 transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-amber-500 transition-colors">Terms of Service</a>
            </div>

            {/* Copyright */}
            <div className="text-sm text-slate-500">
              © 2026 AutoReplyChat. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
