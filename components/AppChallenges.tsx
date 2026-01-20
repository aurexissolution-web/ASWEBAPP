import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Cpu, ArrowDown } from 'lucide-react';

const cards = [
  {
    title: 'Slow Load Times',
    body: '3G crashes lose 70% users? React Native + lazy split = 1.8s loads Malaysia-ready.',
    icon: Smartphone,
    glow: 'from-rose-600/40 via-orange-500/30 to-rose-400/20',
    badge: 'Impact: +42% Session Length'
  },
  {
    title: 'Platform Duplication',
    body: 'RM20k double iOS/Android costs? Single React Native → App Store + Play Store.',
    icon: Cpu,
    glow: 'from-sky-500/35 via-blue-500/25 to-indigo-500/20',
    badge: 'Impact: 55% Faster Ship'
  },
  {
    title: 'Poor Retention',
    body: '65% D1 drop-off? Push + offline PWA = 99.9% Week 1 retention.',
    icon: ArrowDown,
    glow: 'from-fuchsia-500/30 via-purple-500/25 to-violet-500/20',
    badge: 'Impact: 3.2x Reactivation'
  }
] as const;

const codeSnippets = [
  `const useNetworkGate = () => navigator.connection?.effectiveType === '3g';`,
  `<View className="bg-slate-900/80 rounded-3xl shadow-glow">`,
  `TailwindRN({ 'text-emerald-300': metric >= 0.99 })`,
  `const pipelines = ['design','build','test','live'];`,
  `await push('firebase', { segment: 'week1', locale: 'MY' });`
];

const AppChallenges: React.FC = () => {
  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-900 overflow-hidden dark:bg-[#050B18] dark:text-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.2),transparent_55%)] opacity-70 dark:hidden" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(165,180,252,0.15),transparent_60%)] opacity-70 dark:hidden" />
        <div className="absolute inset-0 hidden dark:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.18),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(168,85,247,0.16),transparent_60%)]" />
        </div>
      </div>
      {/* Floating code snippets */}
      {codeSnippets.map((snippet, idx) => (
        <motion.pre
          key={snippet}
          className="absolute text-[11px] font-mono text-slate-500 bg-white/70 border border-slate-200 rounded-xl px-4 py-3 backdrop-blur-xl shadow-[0_10px_40px_rgba(15,23,42,0.08)] dark:text-cyan-200/70 dark:bg-cyan-500/5 dark:border-cyan-500/15"
          style={{
            top: `${10 + idx * 15}%`,
            left: `${idx % 2 === 0 ? 15 : 55}%`
          }}
          animate={{ opacity: [0.25, 0.6, 0.25], y: [0, -20, 0] }}
          transition={{ duration: 18 + idx * 3, repeat: Infinity, ease: 'easeInOut', delay: idx * 2 }}
        >
          {snippet}
        </motion.pre>
      ))}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative text-center mb-16">
          <h2 className="text-emerald-500 font-semibold tracking-[0.35em] uppercase text-xs mb-3 dark:text-emerald-300">
            The Problem
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            App Development Challenges We Solve
          </h3>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto dark:text-slate-300">
            We transform slow apps into high-performance revenue drivers.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ translateY: -8 }}
                className="relative overflow-hidden rounded-3xl bg-white/95 border border-slate-200 backdrop-blur-2xl p-8 transition-all duration-500 group shadow-[0_25px_80px_rgba(15,23,42,0.08)] dark:bg-gradient-to-br dark:from-[#0d1324]/90 dark:via-[#0b1220]/60 dark:to-transparent dark:border-white/10 dark:shadow-[0_25px_70px_rgba(2,6,23,0.85)]"
              >
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br ${card.glow} blur-3xl transition-opacity duration-500`} />
                <div className="relative flex flex-col gap-6">
                  <div className="w-12 h-12 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-white">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h4 className="text-2xl font-semibold text-slate-900 mb-3 dark:text-white">{card.title}</h4>
                    <p className="text-slate-600 leading-relaxed dark:text-slate-200">{card.body}</p>
                  </div>
                  <div className="h-[1px] bg-slate-200 dark:bg-white/10" />
                  <motion.span
                    className="text-sm font-semibold text-emerald-500 uppercase tracking-[0.4em] dark:text-emerald-300"
                    animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                  >
                    {card.badge}
                  </motion.span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AppChallenges;
