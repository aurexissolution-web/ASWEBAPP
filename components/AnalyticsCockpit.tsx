import React, { useEffect, useMemo, useState } from 'react';
import { motion, animate, useMotionValue } from 'framer-motion';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

type Metrics = {
  queries: string;
  uptime: string;
  velocity: string;
};

interface Props {
  metrics?: Metrics;
}

const defaultMetrics: Metrics = {
  queries: '24k Queries',
  uptime: '98% Uptime',
  velocity: '5x Velocity'
};

const areaData = [
  { quarter: 'Q1', revenue: 28, prediction: 30 },
  { quarter: 'Q2', revenue: 34, prediction: 36 },
  { quarter: 'Q3', revenue: 45, prediction: 46 },
  { quarter: 'Q4', revenue: 52, prediction: 60 }
];

const AnalyticsCockpit: React.FC<Props> = ({ metrics = defaultMetrics }) => {
  const parsedVelocity = useMemo(() => {
    const numeric = parseFloat(metrics.velocity.replace(/[^0-9.]/g, ''));
    return Number.isFinite(numeric) ? numeric : 5;
  }, [metrics.velocity]);

  const velocityMotion = useMotionValue(0);
  const [velocityDisplay, setVelocityDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(velocityMotion, parsedVelocity, { duration: 1.4, ease: 'easeOut' });
    const unsubscribe = velocityMotion.on('change', (latest) => setVelocityDisplay(Number(latest.toFixed(1))));
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [parsedVelocity, velocityMotion]);

  const dialCards = useMemo(
    () => [
      {
        title: metrics.queries.split(' ')[0] ?? '24k',
        subtitle: '🟢 QUERIES',
        detail: 'GREEN CHANNEL',
        accent: 'from-emerald-400 via-emerald-300 to-cyan-300'
      },
      {
        title: metrics.uptime.split(' ')[0] ?? '98%',
        subtitle: '🛡️ UPTIME',
        detail: 'SHIELD STACK',
        accent: 'from-sky-400 via-blue-400 to-indigo-400'
      },
      {
        title: metrics.velocity.split(' ')[0] ?? '5x',
        subtitle: '🧠 FORECAST',
        detail: 'PREDICTIVE PATH',
        accent: 'from-purple-400 via-violet-400 to-pink-400'
      }
    ],
    [metrics]
  );

  const reveal = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  } as const;

  return (
    <section className="relative overflow-hidden bg-[#01030c] py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.35),transparent_60%),radial-gradient(circle_at_bottom,_rgba(147,51,234,0.25),transparent_65%)]" />
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(120deg,rgba(255,255,255,0.05) 1px,transparent 1px),linear-gradient(rgba(255,255,255,0.05) 1px,transparent 1px)',
          backgroundSize: '140px 140px'
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-1.5 text-[11px] uppercase tracking-[0.45em] text-cyan-200 shadow-[0_10px_30px_rgba(8,17,35,0.4)]">
            Data Intelligence
          </div>
          <motion.h1 variants={reveal} className="text-4xl font-semibold text-white drop-shadow-[0_15px_45px_rgba(2,6,17,0.7)] sm:text-5xl">
            Data Intelligence Cockpit
          </motion.h1>
          <motion.p variants={reveal} className="text-lg text-slate-200/90 leading-relaxed">
            Master predictive power—secure pipelines, real-time velocity, and 5× revenue acceleration for next-gen Malaysian enterprises.
          </motion.p>
          <motion.div variants={reveal} className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 px-8 py-3 text-sm font-semibold text-white shadow-[0_25px_55px_rgba(45,115,255,0.5)] transition-all hover:shadow-[0_30px_60px_rgba(56,189,248,0.55)]"
            >
              Launch Cockpit
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              className="relative overflow-hidden rounded-full border border-white/20 px-8 py-3 text-sm font-semibold text-white/80 backdrop-blur-lg"
            >
              <span className="relative z-10">Live Forecast</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[pulse_2s_linear_infinite]" />
            </motion.button>
          </motion.div>

          <motion.div variants={reveal} className="grid gap-4 sm:grid-cols-3">
            {dialCards.map((item, idx) => (
              <motion.div
                key={item.subtitle}
                whileHover={{ y: -6, rotate: -3 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative rounded-2xl bg-gradient-to-br from-white/15 via-white/5 to-transparent p-[1px]"
              >
                <div className="relative rounded-2xl bg-black/30 backdrop-blur-2xl px-4 py-4 shadow-[0_25px_60px_rgba(2,6,18,0.6)]">
                  <span className="block text-6xl font-semibold tracking-tight text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.55)]">
                    {item.title.toUpperCase()}
                  </span>
                  <span className="mt-1 block whitespace-nowrap text-sm font-semibold tracking-tight text-white/90">
                    {item.subtitle}
                  </span>
                  <span className="mt-1 block whitespace-nowrap text-[11px] tracking-[0.28em] text-slate-400/80">
                    {item.detail}
                  </span>
                  <div className={`pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br ${item.accent}`} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="space-y-8"
        >
          <motion.div variants={reveal} className="relative rounded-[40px] bg-gradient-to-r from-emerald-400/60 via-blue-500/60 to-violet-500/60 p-[2px] shadow-[0_80px_160px_rgba(0,0,0,0.85)]">
            <div className="flex flex-col gap-6 rounded-[38px] bg-black/30 p-6 text-white backdrop-blur-2xl">
              <div className="flex flex-col gap-6 lg:flex-row">
                <div className="flex flex-1 flex-col items-center gap-4">
                  <div className="relative h-64 w-64 rounded-[40px] border border-white/10 bg-[#050b1c] shadow-[inset_0_0_60px_rgba(8,13,31,0.8)] flex items-center justify-center">
                    <div className="absolute inset-5 rounded-full border border-white/10" />
                    <div className="relative h-52 w-52 rounded-full bg-gradient-to-br from-[#18234a] to-[#040917] shadow-[0_0_40px_rgba(68,132,255,0.35)]">
                      <div className="absolute -inset-3 rounded-full" style={{ background: 'conic-gradient(rgba(255,255,255,0.35),rgba(14,165,233,0.35),rgba(99,102,241,0.3),rgba(255,255,255,0.35))' }} />
                      <div className="absolute inset-0 rounded-full bg-[#040917]" />
                      <div
                        className="absolute inset-4 rounded-full border-4 border-white/10"
                        style={{
                          background: 'conic-gradient(#1dd6ff 0deg, #5f5dff 260deg, rgba(255,255,255,0.25) 360deg)'
                        }}
                      />
                      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
                        <motion.line
                          x1="100"
                          y1="100"
                          x2="100"
                          y2="20"
                          stroke="#38bdf8"
                          strokeWidth="4"
                          strokeLinecap="round"
                          style={{ transformOrigin: '100px 100px' }}
                          animate={{ rotate: [0, parsedVelocity * 60, parsedVelocity * 58] }}
                          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                        />
                      </svg>
                      <div className="absolute inset-16 rounded-full bg-[#040918] flex flex-col items-center justify-center text-center shadow-[inset_0_0_30px_rgba(0,0,0,0.65)]">
                        <p className="text-[12px] uppercase tracking-[0.45em] text-slate-400">Velocity</p>
                        <p className="text-4xl font-semibold text-white tabular-nums">{velocityDisplay.toFixed(1)}x</p>
                      </div>
                    </div>
                    <motion.div
                      className="absolute -right-6 top-4 rounded-2xl border border-emerald-400/40 bg-emerald-400/15 px-4 py-2 text-[11px] tracking-[0.4em]"
                      animate={{ rotateY: [0, 18, 0] }}
                      transition={{ duration: 7, repeat: Infinity, repeatDelay: 1 }}
                    >
                      SOC2 / ISO 27001
                    </motion.div>
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-4">
                  {[
                    { label: '24k Queries', description: 'Green channel', accent: 'from-emerald-400 via-emerald-300 to-cyan-300' },
                    { label: '98% Uptime', description: 'Shielded stack', accent: 'from-sky-400 via-blue-400 to-indigo-400' },
                    { label: 'Neural Forecast', description: 'Predictive path', accent: 'from-purple-400 via-violet-400 to-pink-400' }
                  ].map((dial, idx) => (
                    <motion.div
                      key={dial.label}
                      whileHover={{ scale: 1.06, rotate: 3 }}
                      className="group flex items-center gap-5 rounded-2xl border border-white/15 bg-[#050b1b]/90 px-5 py-4 shadow-[0_20px_55px_rgba(4,7,18,0.65)]"
                    >
                      <div className={`h-32 w-32 rounded-full bg-gradient-to-br ${dial.accent} p-[3px] shadow-[0_0_25px_rgba(56,189,248,0.25)]`}>
                        <div className="h-full w-full rounded-full bg-[#040917] border-4 border-white/10 shadow-[inset_0_0_20px_rgba(34,197,94,0.2)] flex flex-col items-center justify-center">
                          <p className="text-[10px] uppercase tracking-[0.5em] text-white/60">Dial</p>
                          <motion.div
                            className="mt-3 h-2 w-12 rounded-full bg-white/80"
                            animate={{ scaleX: [0.5, 1, 0.7] }}
                            transition={{ duration: 1.8 + idx, repeat: Infinity }}
                          />
                        </div>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white whitespace-nowrap">{dial.label}</p>
                        <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400 whitespace-nowrap">{dial.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="rounded-[26px] border border-white/15 bg-[#040b1b]/80 p-5 shadow-[inset_0_0_20px_rgba(8,15,32,0.8)]">
                <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.4em] text-slate-400">
                  <span>Revenue Trajectory</span>
                  <span>Live Forecast</span>
                </div>
                <div className="h-56">
                  <ResponsiveContainer>
                    <AreaChart data={areaData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" />
                      <defs>
                        <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1} />
                        </linearGradient>
                        <linearGradient id="line" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#22d3ee" />
                          <stop offset="50%" stopColor="#60a5fa" />
                          <stop offset="100%" stopColor="#a855f7" />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="quarter"
                        stroke="#cbd5f5"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontWeight: 700, fontSize: 12, fill: '#e2e8f0' }}
                      />
                      <Tooltip
                        contentStyle={{
                          background: '#0f172a',
                          border: '1px solid rgba(148,163,184,0.4)',
                          borderRadius: 16
                        }}
                      />
                      <Area type="monotone" dataKey="revenue" stroke="url(#line)" fillOpacity={1} fill="url(#area)" strokeWidth={3} />
                      <Area
                        type="monotone"
                        dataKey="prediction"
                        strokeDasharray="8 6"
                        stroke="url(#line)"
                        strokeWidth={2}
                        fillOpacity={0}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AnalyticsCockpit;
