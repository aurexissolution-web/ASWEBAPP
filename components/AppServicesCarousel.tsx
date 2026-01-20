import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Code2, PenTool, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const colorStyles = {
  cyan: {
    active: 'bg-cyan-50 text-cyan-600 ring-1 ring-cyan-200 shadow-[0_10px_30px_rgba(14,165,233,0.25)] dark:bg-cyan-500/10 dark:text-cyan-300 dark:ring-cyan-500/60',
    badge: 'bg-cyan-100 text-cyan-700 border-cyan-200 dark:bg-cyan-500/10 dark:text-cyan-300 dark:border-cyan-400/40',
    bullet: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-600/10 dark:text-cyan-300',
    button: 'from-cyan-500 to-blue-600 hover:shadow-cyan-500/40',
    ring: 'border-slate-200 dark:border-white/10',
    glow: 'hover:shadow-[0_35px_90px_rgba(59,130,246,0.25)] dark:hover:shadow-[0_35px_90px_rgba(2,6,23,0.6)]'
  },
  emerald: {
    active: 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200 shadow-[0_10px_30px_rgba(16,185,129,0.25)] dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/60',
    badge: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-400/40',
    bullet: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-600/10 dark:text-emerald-300',
    button: 'from-emerald-500 to-teal-600 hover:shadow-emerald-500/40',
    ring: 'border-slate-200 dark:border-white/10',
    glow: 'hover:shadow-[0_35px_90px_rgba(16,185,129,0.25)] dark:hover:shadow-[0_35px_90px_rgba(2,6,23,0.6)]'
  },
  purple: {
    active: 'bg-purple-50 text-purple-600 ring-1 ring-purple-200 shadow-[0_10px_30px_rgba(168,85,247,0.25)] dark:bg-purple-500/10 dark:text-purple-300 dark:ring-purple-500/60',
    badge: 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-300 dark:border-purple-400/40',
    bullet: 'bg-purple-100 text-purple-700 dark:bg-purple-600/10 dark:text-purple-300',
    button: 'from-purple-500 to-pink-600 hover:shadow-purple-500/40',
    ring: 'border-slate-200 dark:border-white/10',
    glow: 'hover:shadow-[0_35px_90px_rgba(168,85,247,0.25)] dark:hover:shadow-[0_35px_90px_rgba(2,6,23,0.6)]'
  }
} as const;

const tabs = [
  {
    id: 'ios',
    label: 'iOS & Android',
    icon: Smartphone,
    color: 'cyan',
    headline: 'iOS & Android Launch Sprints',
    context: 'Native performance iOS/Android. Shopee-integrated apps live on Play Store/App Store in 7 days. Firebase auth & push ready.',
    bullets: [
      'Cross-platform code',
      'App Store approval',
      'RM3,999 starter'
    ]
  },
  {
    id: 'flutter',
    label: 'Flutter / React Native',
    icon: Code2,
    color: 'emerald',
    headline: 'Flutter & React Native Delivery',
    context: 'Single codebase → both stores. 60fps smooth, offline-first for Malaysia 3G corridors.',
    bullets: [
      '50% dev time saved',
      'Firebase realtime',
      'RM4,999 project'
    ]
  },
  {
    id: 'ux',
    label: 'User-Centric UX/UI',
    icon: PenTool,
    color: 'purple',
    headline: 'User-Centric UX/UI Pods',
    context: 'Conversion-optimized designs. Figma → React Native shipped in 3-day sprints.',
    bullets: [
      'A/B testing built-in',
      'Dark / light modes',
      'RM2,999 design sprint'
    ]
  }
] as const;

const AppServicesCarousel: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-900 dark:bg-[#020617] dark:bg-none dark:text-white overflow-hidden">
      {/* Floating phone mockups */}
      {[0, 1, 2].map((idx) => (
        <motion.div
          key={idx}
          className="absolute w-48 h-24 border border-cyan-500/10 rounded-[32px] bg-white/5 blur-[0.5px]"
          style={{ top: `${15 + idx * 20}%`, left: `${10 + idx * 25}%`, opacity: 0.15 }}
          animate={{ rotate: [0, 5, -5, 0], y: [0, -10, 0] }}
          transition={{ duration: 14 + idx * 2, repeat: Infinity, ease: 'easeInOut', delay: idx }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.35em] text-blue-500 uppercase mb-3 dark:text-cyan-400">App Stack</p>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 via-emerald-400 to-purple-400 text-transparent bg-clip-text">
            Ship App Experiences in Weeks
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto mt-3 dark:text-slate-400">
            Pick the lane that matches your sprint. Tabs mirror our AI automation layout with app-first playbooks.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {tabs.map((tab, idx) => {
            const Icon = tab.icon;
            const isActive = idx === activeTab;
            const styles = colorStyles[tab.color as keyof typeof colorStyles];
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(idx)}
                className={`relative group rounded-3xl border bg-white shadow-[0_25px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl p-8 flex flex-col gap-6 overflow-hidden transition-transform duration-500 hover:-translate-y-2 ${styles.ring} ${styles.glow} dark:bg-slate-900/60 dark:border-white/10 dark:shadow-[0_30px_80px_rgba(2,6,23,0.65)]`}
              >
                <Icon size={16} />
                {tab.label}
                {isActive && (
                  <motion.div
                    layoutId="app-tab-indicator"
                    className="absolute inset-0 rounded-full blur-lg bg-white/10 -z-10"
                    transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="rounded-[32px] border border-slate-200 bg-white/95 backdrop-blur-2xl p-8 shadow-[0_30px_80px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-slate-900/60 dark:shadow-2xl"
            >
              {(() => {
                const tab = tabs[activeTab];
                const Icon = tab.icon;
                const styles = colorStyles[tab.color as keyof typeof colorStyles];

                return (
                  <div className="grid md:grid-cols-2 gap-10 items-center">
                    <div>
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${styles.badge} text-[11px] uppercase tracking-[0.4em] mb-5`}>
                        <Icon size={14} />
                        {tab.label}
                      </div>
                      <h3 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">{tab.headline}</h3>
                      <p className="text-slate-600 mb-8 leading-relaxed dark:text-slate-300">{tab.context}</p>
                      <ul className="space-y-4">
                        {tab.bullets.map((bullet, i) => (
                          <motion.li
                            key={bullet}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-200"
                          >
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center ${styles.bullet}`}>
                              <Check size={12} />
                            </span>
                            {bullet}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className="relative bg-white border border-slate-200 rounded-3xl p-6 overflow-hidden shadow-[0_25px_60px_rgba(15,23,42,0.1)] dark:bg-[#0a1128]/80 dark:border-white/10">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-200/40 via-transparent to-purple-200/40 blur-3xl dark:from-cyan-500/5 dark:to-purple-500/5" />
                      <div className="relative space-y-6">
                        <div>
                          <p className="text-xs uppercase tracking-[0.4em] text-slate-500 mb-2 dark:text-slate-400">Case Study</p>
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-xl font-semibold text-slate-900 dark:text-white">Tech Corp</h4>
                              <p className="text-slate-500 text-sm dark:text-slate-400">47% sales lift post-launch</p>
                            </div>
                            <Link
                              to="/case-studies/tech-corp-app"
                              className="inline-flex items-center gap-1 text-blue-500 text-sm font-semibold hover:text-blue-700 dark:text-cyan-300 dark:hover:text-white"
                            >
                              Read Case <ArrowRight size={14} />
                            </Link>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          {['Firebase push', 'Shopee API', 'Figma handoff', 'Crash-free 99.9%'].map((badge) => (
                            <div key={badge} className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                              {badge}
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-white/10">
                          <div>
                            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Playbook</p>
                            <h5 className="text-lg font-semibold text-slate-900 dark:text-white">Aurexis Launch Kit</h5>
                          </div>
                          <Link
                            to="/blog"
                            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold bg-gradient-to-r ${styles.button}`}
                          >
                            Read <ArrowRight size={14} />
                          </Link>
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

export default AppServicesCarousel;
