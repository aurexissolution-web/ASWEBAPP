import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Cog, Brain, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const colorStyles = {
  cyan: {
    activeTab: 'bg-cyan-50 text-cyan-600 ring-1 ring-cyan-200 shadow-[0_8px_30px_rgba(14,165,233,0.25)] dark:bg-cyan-500/10 dark:text-cyan-400 dark:ring-cyan-500/50',
    textActive: 'text-cyan-600 dark:text-cyan-400',
    tabGlow: 'bg-cyan-400/40',
    badge: 'bg-cyan-50 border-cyan-200 text-cyan-600 dark:bg-cyan-500/10 dark:border-cyan-500/20 dark:text-cyan-400',
    bgGlow: 'bg-cyan-200/40 dark:bg-cyan-500/10',
    bulletIcon: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400',
    button: 'from-cyan-500 to-blue-500 hover:shadow-cyan-400/30',
    iconColor: 'text-cyan-200 dark:text-cyan-500/20',
  },
  purple: {
    activeTab: 'bg-purple-50 text-purple-600 ring-1 ring-purple-200 shadow-[0_8px_30px_rgba(168,85,247,0.25)] dark:bg-purple-500/10 dark:text-purple-400 dark:ring-purple-500/50',
    textActive: 'text-purple-600 dark:text-purple-400',
    tabGlow: 'bg-purple-400/30',
    badge: 'bg-purple-50 border-purple-200 text-purple-600 dark:bg-purple-500/10 dark:border-purple-500/20 dark:text-purple-400',
    bgGlow: 'bg-purple-200/40 dark:bg-purple-500/10',
    bulletIcon: 'bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400',
    button: 'from-purple-500 to-indigo-500 hover:shadow-purple-400/30',
    iconColor: 'text-purple-200 dark:text-purple-500/20',
  },
  emerald: {
    activeTab: 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200 shadow-[0_8px_30px_rgba(16,185,129,0.25)] dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/50',
    textActive: 'text-emerald-600 dark:text-emerald-400',
    tabGlow: 'bg-emerald-400/30',
    badge: 'bg-emerald-50 border-emerald-200 text-emerald-600 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400',
    bgGlow: 'bg-emerald-200/40 dark:bg-emerald-500/10',
    bulletIcon: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400',
    button: 'from-emerald-500 to-teal-500 hover:shadow-emerald-400/30',
    iconColor: 'text-emerald-200 dark:text-emerald-500/20',
  }
};

const badgeColors = {
  cyan: 'border-cyan-200 text-cyan-600 bg-white shadow-[0_5px_20px_rgba(14,165,233,0.15)] hover:shadow-cyan-500/30 hover:border-cyan-300 dark:border-cyan-500/30 dark:text-cyan-300 dark:bg-white/5',
  emerald: 'border-emerald-200 text-emerald-600 bg-white shadow-[0_5px_20px_rgba(16,185,129,0.15)] hover:shadow-emerald-500/30 hover:border-emerald-300 dark:border-emerald-500/30 dark:text-emerald-300 dark:bg-white/5',
  purple: 'border-purple-200 text-purple-600 bg-white shadow-[0_5px_20px_rgba(168,85,247,0.15)] hover:shadow-purple-500/30 hover:border-purple-300 dark:border-purple-500/30 dark:text-purple-300 dark:bg-white/5',
  gold: 'border-amber-200 text-amber-600 bg-white shadow-[0_5px_20px_rgba(251,191,36,0.15)] hover:shadow-amber-500/30 hover:border-amber-300 dark:border-amber-500/30 dark:text-amber-300 dark:bg-white/5',
  blue: 'border-blue-200 text-blue-600 bg-white shadow-[0_5px_20px_rgba(59,130,246,0.15)] hover:shadow-blue-500/30 hover:border-blue-300 dark:border-blue-500/30 dark:text-blue-300 dark:bg-white/5',
  pink: 'border-pink-200 text-pink-600 bg-white shadow-[0_5px_20px_rgba(236,72,153,0.15)] hover:shadow-pink-500/30 hover:border-pink-300 dark:border-pink-500/30 dark:text-pink-300 dark:bg-white/5',
};

const tabs = [
  {
    id: 'chatbots',
    label: 'Chatbots',
    icon: MessageCircle,
    colorKey: 'cyan',
    content: {
      headline: '24/7 Lead Recovery Chatbots',
      context: 'Missed WhatsApp inquiries cost RM10k/mo—deploy no-code bots in 48hrs for Shopee/Lazada.',
      bullets: [
        '60% lead recovery',
        'Multi-channel (WA/IG)',
        'RM999/mo starter'
      ],
      ctaLink: '/blog',
      badges: [
        { text: "RM10k/mo Leads", color: "cyan" },
        { text: "60% Recovery", color: "emerald" },
        { text: "48hr Deploy", color: "purple" },
        { text: "50+ SMEs", color: "gold" }
      ]
    }
  },
  {
    id: 'process',
    label: 'Process Automation',
    icon: Cog,
    colorKey: 'purple',
    content: {
      headline: 'End Repetitive Hell',
      context: 'Automate orders/emails—inventory sync saves 80% time.',
      bullets: [
        'Shopee/Lazada API',
        'Custom workflows',
        'RM1,999 one-time'
      ],
      ctaLink: '/services/ai',
      badges: [
        { text: "RM15k/yr Saved", color: "emerald" },
        { text: "80% Time", color: "purple" },
        { text: "Shopify Sync", color: "blue" },
        { text: "Unlimited Flows", color: "pink" }
      ]
    }
  },
  {
    id: 'custom',
    label: 'Custom AI Models',
    icon: Brain,
    colorKey: 'emerald',
    content: {
      headline: 'Bespoke AI for MY SMEs',
      context: 'Train models on your sales data—3x predict accuracy.',
      bullets: [
        'Firebase deploy',
        'RM4,999 project',
        'Scale to 10k users'
      ],
      ctaLink: '/services/ai',
      badges: [
        { text: "3x Accuracy", color: "emerald" },
        { text: "RM50k ROI", color: "gold" },
        { text: "Firebase Ready", color: "cyan" },
        { text: "Local Data", color: "blue" }
      ]
    }
  }
];

const ServicesCarousel = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-900 dark:bg-[#020617] dark:bg-none dark:text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:18px_28px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_60%,transparent_100%)] dark:bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)]" />
      </div>
      
      {/* Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-blue-200/60 blur-[150px] rounded-full pointer-events-none dark:bg-blue-500/20" />
      <div className="absolute bottom-0 right-0 w-[700px] h-[500px] bg-purple-100/60 blur-[120px] rounded-full pointer-events-none dark:bg-purple-500/10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
            End-to-End AI Automation
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm dark:text-slate-400">
            Choose the solution that scales with your business.
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {tabs.map((tab, idx) => {
            const Icon = tab.icon;
            const isActive = activeTab === idx;
            // @ts-ignore
            const styles = colorStyles[tab.colorKey];
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(idx)}
                className={`relative px-5 py-2.5 rounded-full flex items-center gap-2 transition-all duration-300 text-sm ${
                  isActive 
                    ? styles.activeTab
                    : 'bg-white text-slate-500 hover:text-slate-900 shadow-sm hover:shadow-md dark:bg-white/5 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white'
                }`}
              >
                <Icon size={16} className={isActive ? styles.textActive : ''} />
                <span className="font-semibold">{tab.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTabGlow"
                    className={`absolute inset-0 rounded-full blur-md -z-10 ${styles.tabGlow}`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Content Panel */}
        <div className="relative min-h-[350px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-5xl mx-auto"
            >
              {(() => {
                const tab = tabs[activeTab];
                // @ts-ignore
                const styles = colorStyles[tab.colorKey];
                const Icon = tab.icon;

                return (
                  <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/95 backdrop-blur-xl p-8 shadow-[0_30px_80px_rgba(15,23,42,0.12)] group transition-all duration-500 dark:border-white/10 dark:bg-slate-900/60">
                    
                    {/* Background Gradient Glow */}
                    <div className={`absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none ${styles.bgGlow}`} />

                    <div className="grid md:grid-cols-2 gap-8 relative z-10 items-center">
                      {/* Left Column: Content */}
                      <div>
                        <div className={`inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4 ${styles.badge}`}>
                          <Icon size={12} />
                          {tab.label}
                        </div>

                        <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight dark:text-white">
                          {tab.content.headline}
                        </h3>
                        
                        <p className="text-base text-slate-600 mb-6 leading-relaxed dark:text-slate-300">
                          {tab.content.context}
                        </p>

                        <ul className="space-y-3 mb-8">
                          {tab.content.bullets.map((bullet, i) => (
                            <motion.li 
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 + 0.2 }}
                              className="flex items-center gap-2 text-slate-600 text-sm dark:text-slate-300"
                            >
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${styles.bulletIcon}`}>
                                <Check size={12} />
                              </div>
                              {bullet}
                            </motion.li>
                          ))}
                        </ul>

                        <Link 
                          to={tab.content.ctaLink}
                          className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r text-white text-sm font-bold hover:shadow-lg transition-all transform hover:-translate-y-1 ${styles.button}`}
                        >
                          Deep Dive
                          <ArrowRight size={16} />
                        </Link>
                      </div>

                      {/* Right Column: Metric Badges Grid */}
                      <div className="relative">
                        {/* Decorative Icon Background */}
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${styles.iconColor} opacity-40 scale-[1.5]`}>
                          <Icon size={180} strokeWidth={0.5} />
                        </div>

                        <div className="grid grid-cols-2 gap-3 relative z-10">
                          {tab.content.badges.map((badge, i) => {
                             // @ts-ignore
                             const badgeStyle = badgeColors[badge.color] || badgeColors.blue;
                             return (
                               <motion.div
                                 key={i}
                                 initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                 animate={{ opacity: 1, scale: 1, y: 0 }}
                                 transition={{ delay: 0.3 + (i * 0.1), type: "spring", stiffness: 100 }}
                                 className={`aspect-[4/3] rounded-xl border backdrop-blur-md flex items-center justify-center p-3 text-center group/badge transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-default ${badgeStyle}`}
                              >
                                <span className="text-base md:text-lg font-bold leading-tight group-hover/badge:scale-110 transition-transform duration-300 drop-shadow-lg">
                                  {badge.text}
                                </span>
                              </motion.div>
                             );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ServicesCarousel;
