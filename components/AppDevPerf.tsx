import React from 'react';
import { motion } from 'framer-motion';

const badges = [
  { label: '1.8s Load', desc: 'Malaysia 3G tested', accent: 'bg-cyan-50 border-cyan-200 text-cyan-700 dark:text-cyan-200 dark:border-cyan-400/40 dark:bg-transparent' },
  { label: '99.9% Crash-Free', desc: 'Firebase monitoring', accent: 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:text-emerald-200 dark:border-emerald-400/40 dark:bg-transparent' },
  { label: '60fps Smooth', desc: 'GPU tuned UI', accent: 'bg-fuchsia-50 border-fuchsia-200 text-fuchsia-700 dark:text-fuchsia-200 dark:border-fuchsia-400/40 dark:bg-transparent' }
] as const;

const bars = [
  { label: 'Downloads', value: '24k', height: 140, color: 'from-cyan-400 to-cyan-200' },
  { label: 'DAU', value: '2.4k', height: 100, color: 'from-emerald-400 to-lime-200' },
  { label: 'Retention', value: '99.9%', height: 160, color: 'from-purple-400 to-pink-300' }
] as const;

const bottomStats = ['iOS / Android', 'Firebase Backend', 'Play Store Ready'];

const dataWaves = [
  { id: 'wave-1', top: '10%', color: 'rgba(56,189,248,0.25)', duration: 18, delay: 0 },
  { id: 'wave-2', top: '25%', color: 'rgba(59,130,246,0.2)', duration: 22, delay: 1 },
  { id: 'wave-3', top: '40%', color: 'rgba(79,70,229,0.2)', duration: 20, delay: 0.5 },
  { id: 'wave-4', top: '58%', color: 'rgba(236,72,153,0.2)', duration: 24, delay: 1.5 },
  { id: 'wave-5', top: '72%', color: 'rgba(45,212,191,0.2)', duration: 26, delay: 0.8 }
] as const;

const AppDevPerf: React.FC = () => {
  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-900 overflow-hidden dark:bg-[#030712] dark:text-white">
      {/* Aurora Borealis Effect */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50 to-slate-100 dark:from-[#030712] dark:via-[#0c1222] dark:to-[#030712]" />
        
        {/* Aurora ribbons */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[600px]"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(59,130,246,0.18) 20%, rgba(14,165,233,0.12) 40%, rgba(139,92,246,0.1) 60%, transparent 100%)',
            filter: 'blur(80px)',
          }}
          animate={{ opacity: [0.6, 1, 0.6], y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-20 left-[10%] w-[40%] h-[400px] rounded-full"
          style={{
            background: 'linear-gradient(135deg, rgba(59,130,246,0.25) 0%, rgba(14,165,233,0.2) 50%, transparent 100%)',
            filter: 'blur(90px)',
          }}
          animate={{ x: [0, 50, 0], opacity: [0.5, 0.8, 0.5], rotate: [0, 5, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-40 right-[5%] w-[35%] h-[350px] rounded-full"
          style={{
            background: 'linear-gradient(225deg, rgba(147,197,253,0.23) 0%, rgba(199,210,254,0.15) 50%, transparent 100%)',
            filter: 'blur(90px)',
          }}
          animate={{ x: [0, -40, 0], opacity: [0.4, 0.7, 0.4], rotate: [0, -5, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.div
          className="absolute bottom-20 left-[30%] w-[50%] h-[300px] rounded-full"
          style={{
            background: 'linear-gradient(45deg, rgba(16,185,129,0.2) 0%, rgba(6,182,212,0.15) 50%, transparent 100%)',
            filter: 'blur(110px)',
          }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        />
      </div>

      {/* Holographic shimmer overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(59,130,246,0.08) 45%, rgba(14,165,233,0.08) 50%, rgba(236,72,153,0.05) 55%, transparent 60%)',
          backgroundSize: '200% 100%',
        }}
        animate={{ backgroundPosition: ['200% 0%', '-200% 0%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />

      {/* Constellation dots */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.2 + Math.random() * 0.3,
            }}
            animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.3, 1] }}
            transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 3 }}
          />
        ))}
      </div>

      {/* Hex grid pattern */}
      <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      {/* Subtle grain */}
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.08] mix-blend-overlay dark:opacity-[0.15]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/95 border border-slate-200 rounded-[32px] p-10 backdrop-blur-3xl shadow-[0_35px_90px_rgba(15,23,42,0.12)] dark:bg-gradient-to-br dark:from-[#050817]/90 dark:via-[#070b1b]/80 dark:to-[#060918]/70 dark:border-white/10 dark:shadow-[0_35px_90px_rgba(2,6,23,0.85)]">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left column */}
            <div>
              <p className="text-xs tracking-[0.4em] uppercase text-blue-500 mb-4 dark:text-cyan-300">
                Built for App Performance
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-8 dark:text-white">
                Built for App Performance
              </h2>

              <div className="space-y-4">
                {badges.map((badge, idx) => (
                  <motion.div
                    key={badge.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className={`rounded-3xl p-5 border backdrop-blur-lg transition-colors shadow-[0_15px_40px_rgba(15,23,42,0.08)] ${badge.accent}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-lg font-semibold text-slate-900 dark:text-white`}>{badge.label}</p>
                        <p className="text-slate-500 text-sm dark:text-slate-400">{badge.desc}</p>
                      </div>
                      <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse shadow-[0_0_12px_rgba(59,130,246,0.5)]" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right column */}
            <div className="relative bg-white border border-slate-200 rounded-3xl p-8 backdrop-blur-xl overflow-hidden group shadow-[0_25px_60px_rgba(15,23,42,0.12)] dark:bg-slate-950/70 dark:border-white/10">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:36px_36px] opacity-60 dark:bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-blue-100/50 dark:to-black/50" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Live Analytics</p>
                    <p className="text-slate-900 text-xl font-semibold dark:text-white">App Signals</p>
                  </div>
                  <div className="px-3 py-1 rounded-full border border-slate-200 text-xs text-slate-500 dark:border-white/10 dark:text-slate-300">
                    Auto-sync
                  </div>
                </div>

                <div className="flex gap-10 items-end justify-center h-48 mb-6">
                  {bars.map((bar, idx) => (
                    <motion.div
                      key={bar.label}
                      className="flex flex-col items-center gap-3"
                      initial={{ opacity: 0, y: 25 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.15 }}
                    >
                      <div className="text-sm font-semibold text-slate-900 bg-white rounded-full px-4 py-1 border border-slate-200 dark:text-white dark:bg-slate-900/70 dark:border-white/5">
                        {bar.value}
                      </div>
                      <motion.div
                        className="relative w-16 rounded-t-xl overflow-hidden border border-slate-200 bg-slate-100 dark:border-white/5 dark:bg-slate-900/40"
                        style={{ height: bar.height }}
                      >
                        <motion.div
                          initial={{ height: 0 }}
                          whileInView={{ height: bar.height }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: idx * 0.1, ease: 'easeOut' }}
                          className={`absolute bottom-0 left-0 right-0 rounded-t-[10px] bg-gradient-to-t ${bar.color}`}
                        />
                      </motion.div>
                      <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500 font-medium dark:text-slate-400">{bar.label}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap gap-4 dark:border-white/10">
                  {bottomStats.map((stat) => (
                    <motion.div
                      key={stat}
                      className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white uppercase tracking-[0.35em] text-[11px] text-slate-600 shadow-[0_10px_25px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-[#0a112c]/70 dark:text-slate-100"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.6)] animate-pulse" />
                      {stat}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDevPerf;
