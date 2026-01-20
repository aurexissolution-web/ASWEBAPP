import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Shield, Zap } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  Cell
} from 'recharts';

const INITIAL_DATA = [
  { label: 'Mon', uptime: 99.4, latency: 28 },
  { label: 'Tue', uptime: 99.6, latency: 25 },
  { label: 'Wed', uptime: 99.7, latency: 22 },
  { label: 'Thu', uptime: 99.8, latency: 21 },
  { label: 'Fri', uptime: 99.9, latency: 20 },
  { label: 'Sat', uptime: 99.9, latency: 19 },
  { label: 'Sun', uptime: 99.95, latency: 18 }
];

const bulletItems = [
  'Edge caching + render streaming',
  'Automatic image/script optimization',
  'Vercel + global CDN ready deploys'
];

const orbitBadges = [
  { label: 'DEPLOY', value: '24ms', icon: <Zap size={14} /> },
  { label: 'BUNDLE', value: '50KB', icon: <Shield size={14} /> }
];

const PerformancePodium: React.FC = () => {
  const [chartData, setChartData] = useState(INITIAL_DATA);

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData((prev) =>
        prev.map((point) => ({
          ...point,
          latency: Math.max(16, Math.min(32, point.latency + (Math.random() - 0.5) * 4)),
          uptime: Math.min(99.99, Math.max(99.4, point.uptime + (Math.random() - 0.5) * 0.1))
        }))
      );
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const latencyColor = useMemo(() => ['#34d399', '#22d3ee', '#a855f7'], []);

  return (
    <section className="relative min-h-[80vh] py-20 lg:py-24 px-6 lg:px-20 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-blue-100 text-slate-900 dark:bg-[#050b1a] dark:bg-none dark:text-white">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0 opacity-20 dark:hidden"
          animate={{ backgroundPosition: ['0px 0px', '160px 140px', '0px 0px'] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          style={{
            backgroundImage:
              'linear-gradient(120deg, rgba(148,163,184,0.12) 1px, transparent 1px), linear-gradient(300deg, rgba(148,163,184,0.08) 1px, transparent 1px)',
            backgroundSize: '120px 120px'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-blue-100/40 to-transparent dark:hidden" />
        <div className="hidden dark:block absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#030714] via-[#050b1a] to-[#01040a]" />
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{ backgroundPosition: ['0px 0px', '160px 140px', '0px 0px'] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            style={{
              backgroundImage:
                'linear-gradient(120deg, rgba(148,163,184,0.15) 1px, transparent 1px), linear-gradient(300deg, rgba(148,163,184,0.1) 1px, transparent 1px)',
              backgroundSize: '120px 120px'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/30 to-[#020617]" />
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto grid lg:grid-cols-[1fr_1fr] gap-12 items-center">
        <div className="space-y-10">
          <div>
            <p className="text-xs uppercase tracking-[0.5em] text-cyan-600 mb-4 dark:text-cyan-200">Built for Performance</p>
            <motion.h3
              className="text-3xl lg:text-4xl font-black leading-tight mb-5 max-w-xl text-slate-900 dark:text-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.9 }}
            >
              Velvet canvas for live telemetry. Reliability you feel, not just read.
            </motion.h3>
            <motion.p
              className="text-slate-500 text-base max-w-xl dark:text-slate-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.9, delay: 0.2 }}
            >
              SRE pods dissolve into your releases: chaos drills, synthetic probes, and predictive alerting keep SLAs green
              from prelaunch to scale.
            </motion.p>
          </div>

          <div className="space-y-4">
            {bulletItems.map((item, idx) => (
              <motion.div
                key={item}
                className="flex items-start gap-3 text-slate-700 text-sm lg:text-base dark:text-white"
                initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
                whileInView={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
              >
                <span className="w-5 h-5 rounded-full border border-emerald-400/60 flex items-center justify-center flex-shrink-0">
                  <Check size={14} className="text-emerald-500 dark:text-emerald-300" />
                </span>
                {item}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="relative w-full h-56">
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1 }}
            >
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-cyan-300 via-blue-400 to-purple-500 blur-[18px] opacity-60" />
            </motion.div>
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ scale: [1, 1.05, 1], opacity: [0.9, 1, 0.9] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <div className="w-40 h-40 rounded-full border border-slate-200 flex items-center justify-center dark:border-white/20">
                <div className="text-center">
                  <p className="text-xs uppercase tracking-[0.5em] text-slate-500 mb-2 dark:text-white/60">uptime</p>
                  <motion.span
                    className="text-5xl font-black text-slate-900 drop-shadow-[0_15px_55px_rgba(14,165,233,0.45)] dark:text-white"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    99.9%
                  </motion.span>
                  <p className="text-xs text-slate-500 mt-2 dark:text-white/70">SLA across 420 deploys</p>
                </div>
              </div>
            </motion.div>

            {orbitBadges.map((badge, idx) => (
              <motion.div
                key={badge.label}
                className="absolute px-4 py-2 rounded-2xl text-xs flex items-center gap-2 backdrop-blur bg-white/80 text-slate-900 border border-white/40 shadow-lg dark:bg-white/10 dark:text-white dark:border-white/20"
                style={{
                  top: idx === 0 ? '15%' : '70%',
                  right: idx === 0 ? '5%' : '-5%'
                }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3 + idx, repeat: Infinity, ease: 'easeInOut' }}
              >
                {badge.icon}
                <div>
                  <p className="font-semibold">{badge.value}</p>
                  <p className="text-[10px] tracking-[0.3em] text-white/60">{badge.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="pl-4 border-l border-slate-200/70 dark:border-white/10"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9 }}
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs uppercase tracking-[0.4em] text-slate-500 dark:text-white/60">Latency trend</p>
              <span className="text-slate-500 text-xs dark:text-white/70">Live</span>
            </div>
            <div className="h-48 rounded-3xl bg-white/80 border border-slate-200 px-4 py-4 shadow-lg dark:bg-white/5 dark:border-white/10">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="label" stroke="#94a3b8" tickLine={false} axisLine={false} />
                  <Tooltip
                    cursor={{ fill: 'rgba(15,23,42,0.04)' }}
                    contentStyle={{
                      background: '#ffffff',
                      border: '1px solid rgba(148,163,184,0.4)',
                      borderRadius: '12px',
                      color: '#0f172a'
                    }}
                  />
                  <Bar dataKey="latency" radius={[20, 20, 4, 4]} maxBarSize={34}>
                    {chartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={latencyColor[index % latencyColor.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PerformancePodium;
