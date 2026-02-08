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
      description: 'Fully managed AI chatbot service for businesses. We build, train, and maintain your AI customer support chatbot.',
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
      name: 'AutoReplyChat | Fully Managed AI Chatbot for Your Website',
      description: 'We build, train, and manage a custom AI chatbot for your website. You just add one line of code. Powered by Claude AI.',
      isPartOf: { '@id': 'https://autoreplychat.com/#organization' },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', '.quick-answer']
      }
    },
    {
      '@type': 'Service',
      name: 'AutoReplyChat Managed Chatbot',
      serviceType: 'AI Chatbot Management',
      provider: { '@id': 'https://autoreplychat.com/#organization' },
      description: 'Fully managed AI chatbot service. We handle setup, training, customisation, and ongoing maintenance. You just paste one line of code on your website.',
      offers: {
        '@type': 'Offer',
        price: '99.00',
        priceCurrency: 'GBP',
        priceValidUntil: '2026-12-31',
        description: '£300 one-time setup fee plus £99 per month'
      },
      featureList: [
        'Custom AI chatbot trained on your content',
        'Built-in lead capture with email notifications',
        'Fully branded to match your website',
        'Multi-language support for 95+ languages',
        'Ongoing maintenance and updates',
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
            text: 'We build a custom AI chatbot trained on your website content, documents, and any other material you provide. Once it is ready, you paste one line of code on your website and the chatbot goes live. We handle everything — you never need to touch a dashboard or manage anything.'
          }
        },
        {
          '@type': 'Question',
          name: 'What do I need to provide?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'It depends on your business. At minimum, we just need your website URL and we will scrape the content. If you have additional documents like PDFs, brochures, or FAQs, we can train the chatbot on those too. We will discuss your needs when you get in touch.'
          }
        },
        {
          '@type': 'Question',
          name: 'How long does setup take?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Most chatbots are built, trained, and ready to go live within 24 to 48 hours of receiving your content. Complex setups with large amounts of documentation may take a little longer.'
          }
        },
        {
          '@type': 'Question',
          name: 'Does the chatbot capture leads?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. The chatbot includes built-in lead capture that collects visitor names, email addresses, and phone numbers. You receive instant email notifications whenever a new lead engages with your chatbot.'
          }
        },
        {
          '@type': 'Question',
          name: 'What AI model powers the chatbot?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'AutoReplyChat is powered by Claude AI from Anthropic, one of the most capable and safe AI models available. Claude provides accurate, helpful responses grounded in your content rather than making things up.'
          }
        },
        {
          '@type': 'Question',
          name: 'Will the chatbot match my website branding?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. We fully customise the chatbot colours, header text, welcome message, and position to match your brand. It looks and feels like a native part of your website.'
          }
        },
        {
          '@type': 'Question',
          name: 'How much does it cost?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'AutoReplyChat is a one-time £300 setup fee plus £99 per month (£399 to start). Everything is included — unlimited conversations, lead capture, custom branding, multi-language support, and ongoing maintenance. We offer a 30-day free trial so you can see it working before you pay.'
          }
        },
        {
          '@type': 'Question',
          name: 'Is my data secure?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. We use enterprise-grade security including encrypted databases, bcrypt password hashing, session-based authentication, and strict tenant isolation. Your data is never shared with or accessible to other customers.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can the chatbot handle multiple languages?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. The chatbot automatically detects your visitor\'s browser language and can respond in over 95 languages. Ideal for businesses with international customers.'
          }
        },
        {
          '@type': 'Question',
          name: 'Do I need any technical knowledge?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. We handle everything — building, training, branding, and maintaining your chatbot. The only thing you need to do is paste one line of code on your website, and we will walk you through that too if needed.'
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
        <title>AutoReplyChat | Fully Managed AI Chatbot for Your Website</title>
        <meta name="description" content="We build, train, and manage a custom AI chatbot for your website. Lead capture, branded widget, 24/7 instant answers. 30-day free trial." />
        <link rel="canonical" href="https://autoreplychat.com" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://autoreplychat.com" />
        <meta property="og:title" content="AutoReplyChat | Fully Managed AI Chatbot for Your Website" />
        <meta property="og:description" content="We build, train, and manage a custom AI chatbot for your website. Lead capture, branded widget, 24/7 instant answers." />
        <meta property="og:image" content="https://autoreplychat.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AutoReplyChat | Fully Managed AI Chatbot" />
        <meta name="twitter:description" content="We build, train, and manage a custom AI chatbot for your website. 30-day free trial." />
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
        AutoReplyChat is a fully managed AI chatbot service. We build, train, and maintain a custom chatbot for your website so you can answer customer questions 24/7.
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
              href="#contact" 
              className="px-5 py-2 bg-amber-500 text-slate-950 rounded-lg font-medium hover:bg-amber-400 transition-all hover:scale-105 text-sm"
            >
              Get in Touch
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
                  Fully Managed AI Chatbot Service
                </div>
                <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight">
                  Answer every
                  <br />
                  customer,
                  <br />
                  <span className="text-amber-500">instantly.</span>
                </h1>
                <p className="text-xl text-slate-400 leading-relaxed max-w-xl">
                  We build, train, and manage a custom AI chatbot for your website. 
                  You just paste one line of code. We handle the rest.
                </p>
              </div>
              
              <div className={`flex flex-col sm:flex-row gap-4 ${isVisible ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}>
                <a 
                  href="#contact" 
                  className="px-8 py-4 bg-amber-500 text-slate-950 rounded-lg font-bold text-lg hover:bg-amber-400 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/20 text-center"
                >
                  Get Your Chatbot
                </a>
                <a 
                  href="#demo" 
                  className="px-8 py-4 bg-slate-800/50 text-slate-100 rounded-lg font-bold text-lg hover:bg-slate-800 transition-all border border-slate-700 text-center"
                >
                  See It Live →
                </a>
              </div>

              <div className={`flex items-center gap-6 pt-6 flex-wrap ${isVisible ? 'animate-fade-in-up delay-300' : 'opacity-0'}`}>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  30-day free trial
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  No technical skills needed
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Live in 24–48 hours
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
                        We're open Monday-Friday, 9 AM to 6 PM. 
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
                        Absolutely! Every chatbot starts with a 30-day free trial — full features, no card required.
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
              We handle everything.
              <br />
              <span className="text-amber-500">You get the results.</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              No dashboards to learn. No software to manage. We build your chatbot, train it on your content, brand it to your website, and keep it running. You just paste one line of code.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🧠',
                title: 'Trained on Your Content',
                description: 'We train Claude AI on your website, PDFs, documents, FAQs, and any other material you provide. Your chatbot gives accurate answers based on your actual business information — not generic responses.'
              },
              {
                icon: '⚡',
                title: '24/7 Instant Answers',
                description: 'Your chatbot never sleeps. Every customer gets an immediate, helpful response — whether it is 2 PM or 2 AM. No more missed enquiries outside business hours.'
              },
              {
                icon: '📊',
                title: 'Lead Capture Built In',
                description: 'Every conversation is an opportunity. The chatbot collects visitor names, emails, and phone numbers automatically. You get instant email notifications when new leads come in.'
              },
              {
                icon: '🎨',
                title: 'Branded to Your Website',
                description: 'We match the chatbot colours, styling, and tone to your brand. It looks and feels like a native part of your website — not a third-party bolt-on.'
              },
              {
                icon: '🌍',
                title: '95+ Languages',
                description: 'The chatbot automatically detects your visitor\'s language and responds accordingly. Ideal if you serve international customers or multilingual audiences.'
              },
              {
                icon: '🔐',
                title: 'Enterprise-Grade Security',
                description: 'Encrypted databases, secure authentication, and strict data isolation. Your business data is protected and never shared with anyone else.'
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
              How it works.
              <br />
              <span className="text-amber-500">Simple as that.</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              You tell us about your business. We do the rest. Most chatbots are live within 24 to 48 hours.
            </p>
          </div>

          <div className="space-y-16">
            {[
              {
                step: '01',
                title: 'Get in Touch',
                description: 'Fill in the enquiry form below and tell us about your business. Share your website URL and any documents or FAQs you want the chatbot to know about. We will review everything and get back to you to discuss your needs — whether that is a quick email exchange or a discovery call.'
              },
              {
                step: '02',
                title: 'We Build Your Chatbot',
                description: 'We scrape your website, process your documents, and train Claude AI on your content. We customise the widget to match your brand — colours, header text, welcome message, and chat style. We configure lead capture, email notifications, and multi-language support. You do not need to touch anything.'
              },
              {
                step: '03',
                title: 'Paste One Line of Code',
                description: 'When your chatbot is ready, we send you a single line of embed code. Paste it on your website and your AI chatbot goes live immediately. It works on any platform — WordPress, Shopify, Squarespace, Wix, or custom-built sites. If you need help adding the code, we will walk you through it.'
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
              This is a real AI chatbot trained on our own documentation. 
              Ask it anything and see the quality of responses for yourself.
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
                  This is exactly what your customers will see — trained on your content, branded to your website
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-500 text-sm mb-4">
              Impressed? Let us build one for your business.
            </p>
            <a 
              href="#contact" 
              className="inline-block px-8 py-4 bg-amber-500 text-slate-950 rounded-lg font-bold text-lg hover:bg-amber-400 transition-all hover:scale-105"
            >
              Get in Touch
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
              Whether you run a local service or a national company, we will build a chatbot that handles your customer questions so you can focus on what matters.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'E-commerce & Retail',
                description: 'Answer product questions, shipping queries, and return policies instantly. Reduce support tickets by up to 80% while capturing leads from browsers who might otherwise leave without buying.'
              },
              {
                title: 'Professional Services',
                description: 'Law firms, accountants, consultants — let your chatbot explain your services, answer questions about processes and fees, and capture enquiries from potential clients visiting outside business hours.'
              },
              {
                title: 'SaaS & Technology',
                description: 'Train your chatbot on product documentation, knowledge base articles, and guides. Provide instant technical support and free up your team from repetitive support queries.'
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

      {/* Pricing Section */}
      <section id="pricing" className="relative py-32 border-t border-slate-800/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-5xl md:text-6xl font-bold mb-6">
            Simple, transparent pricing.
          </h2>
          <p className="text-xl text-slate-400 mb-12">
            One plan. Everything included. We handle it all.
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
                'Custom-built AI chatbot',
                'Trained on your content',
                'Branded to your website',
                'Lead capture & email notifications',
                'Multi-language support (95+ languages)',
                'Ongoing maintenance & updates',
                'Unlimited conversations',
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
              href="#contact" 
              className="inline-block px-8 py-4 bg-amber-500 text-slate-950 rounded-lg font-bold text-lg hover:bg-amber-400 transition-all hover:scale-105 w-full max-w-md"
            >
              Get in Touch →
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
              Everything you need to know about our managed chatbot service. Still have questions? Try the live demo or get in touch.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                q: 'How does AutoReplyChat work?',
                a: 'We build a custom AI chatbot trained on your website content, documents, and any other material you provide. Once it is ready, you paste one line of code on your website and the chatbot goes live. We handle everything — you never need to manage a dashboard or configure anything yourself.'
              },
              {
                q: 'What do I need to provide?',
                a: 'It depends on your business. At minimum, we just need your website URL and we will scrape the content. If you have additional documents like PDFs, brochures, or FAQs, we can train the chatbot on those too. We will discuss your specific needs when you get in touch.'
              },
              {
                q: 'How long does setup take?',
                a: 'Most chatbots are built, trained, and ready to go live within 24 to 48 hours of receiving your content. Complex setups with large amounts of documentation may take a little longer.'
              },
              {
                q: 'Does the chatbot capture leads?',
                a: 'Yes. The chatbot collects visitor names, email addresses, and phone numbers during conversations. You receive instant email notifications whenever a new lead engages, so you can follow up quickly.'
              },
              {
                q: 'What AI model powers the chatbot?',
                a: 'AutoReplyChat is powered by Claude AI from Anthropic, one of the most capable and safe AI models available. Claude provides accurate, helpful responses grounded in your content rather than making things up.'
              },
              {
                q: 'Will the chatbot match my website branding?',
                a: 'Yes. We fully customise the chatbot colours, header text, welcome message, and position to match your brand. It looks and feels like a native part of your website.'
              },
              {
                q: 'Is there a free trial?',
                a: 'Yes. Every chatbot starts with a 30-day free trial with full features. You can see it working on your website before you pay anything. No credit card is required upfront.'
              },
              {
                q: 'How much does it cost after the trial?',
                a: 'AutoReplyChat is a one-time £300 setup fee plus £99 per month (£399 to start). Everything is included — unlimited conversations, lead capture, custom branding, multi-language support, and ongoing maintenance.'
              },
              {
                q: 'Is my data secure?',
                a: 'Yes. We use enterprise-grade security including encrypted databases, bcrypt password hashing, session-based authentication, and strict data isolation. Your information is never shared with or accessible to other customers.'
              },
              {
                q: 'Do I need any technical knowledge?',
                a: 'No. We handle everything — building, training, branding, and maintaining your chatbot. The only thing you need to do is paste one line of code on your website, and we will help you with that too if needed.'
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

      {/* Contact Form Section */}
      <section id="contact" className="relative py-32 border-t border-slate-800/50">
        <div className="gradient-mesh opacity-30" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Ready to get
              <br />
              <span className="text-amber-500">your chatbot?</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Fill in the form below and we will be in touch to discuss your chatbot. Most businesses are live within 48 hours.
            </p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 shadow-2xl">
            <iframe 
              src="https://app.smartsuite.com/form/sba974gi/dN2DczjvGd?header=false" 
              width="100%" 
              height="600px" 
              frameBorder="0"
              title="AutoReplyChat Enquiry Form"
              style={{ border: 'none', borderRadius: '12px' }}
            />
          </div>

          <div className="text-center mt-8">
            <p className="text-slate-500 text-sm">
              Prefer to get in touch directly?{' '}
              <a href="mailto:mick@autoreplychat.com" className="text-amber-500 hover:text-amber-400 transition-colors">
                mick@autoreplychat.com
              </a>
              {' '}or call{' '}
              <a href="tel:+447501439406" className="text-amber-500 hover:text-amber-400 transition-colors">
                07501 439406
              </a>
            </p>
          </div>
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
                <p>Fully managed AI chatbots by{' '}
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
