import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

const revenueData = [
  { q: 'Q1', actual: 22, forecast: 24 },
  { q: 'Q2', actual: 30, forecast: 33 },
  { q: 'Q3', actual: 41, forecast: 46 },
  { q: 'Q4', actual: 53, forecast: 60 }
];

const DataHeroWidget: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden pt-28 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-900 dark:bg-[#020617] dark:bg-none dark:text-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(37,99,235,0.18),transparent_55%),radial-gradient(circle_at_85%_20%,rgba(99,102,241,0.15),transparent_55%),radial-gradient(circle_at_50%_90%,rgba(14,165,233,0.18),transparent_65%)] opacity-80 dark:hidden" />
        <div
          className="absolute inset-0 opacity-[0.06] dark:hidden"
          style={{
            backgroundImage:
              'linear-gradient(90deg,rgba(15,23,42,0.08) 1px, transparent 1px), linear-gradient(rgba(15,23,42,0.08) 1px, transparent 1px)',
            backgroundSize: '140px 140px'
          }}
        />
        <div className="hidden dark:block absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(37,99,235,0.25),transparent_55%),radial-gradient(circle_at_85%_20%,rgba(99,102,241,0.22),transparent_55%),radial-gradient(circle_at_50%_90%,rgba(14,165,233,0.18),transparent_65%)]" />
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                'linear-gradient(90deg,rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
              backgroundSize: '140px 140px'
            }}
          />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-7"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2 text-[11px] uppercase tracking-[0.45em] text-slate-500 shadow-sm dark:border-white/15 dark:bg-white/5 dark:text-cyan-200">
              Data Intelligence
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 tracking-tight leading-[1.05] dark:text-white">
              Scale Faster with
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-sky-400 to-indigo-500">
                Secure Data Analysis
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl dark:text-slate-300">
              Turn numbers into narrative. We transform scattered data into warehouse insights, build interactive
              dashboards, and deliver real-time decisions that drive revenue.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-[0_18px_45px_rgba(37,99,235,0.4)] transition-transform duration-300 hover:scale-[1.02]"
              >
                Get Started
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="px-8 py-4 rounded-xl bg-white border border-slate-200 text-slate-900 font-semibold shadow-sm transition-colors hover:bg-slate-50 dark:bg-white/5 dark:border-white/15 dark:text-white dark:hover:bg-white/10"
              >
                Talk to Sales
              </button>
            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-[520px] mx-auto w-full"
          >
            <motion.div
              whileHover={{ y: -6, boxShadow: '0 45px 120px rgba(14,165,233,0.35)' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-[36px] bg-white p-[1.5px] shadow-[0_35px_120px_rgba(15,23,42,0.15)] dark:bg-[#050c1d] dark:border dark:border-white/10 dark:shadow-[0_50px_130px_rgba(2,8,30,0.7)]"
            >
              <div className="relative rounded-[34px] border border-slate-100 bg-white/95 backdrop-blur-3xl p-6 overflow-hidden text-slate-900 dark:border-white/15 dark:bg-[#050c1f] dark:bg-none dark:text-white dark:shadow-[0_60px_160px_rgba(1,6,23,0.85)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.3),transparent_60%)] dark:hidden" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(14,165,233,0.18),transparent_55%)] dark:hidden" />
                <div className="absolute inset-0 opacity-10 dark:hidden" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(15,23,42,0.12) 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
                <div className="absolute inset-0 opacity-30 dark:hidden" style={{ backgroundImage: 'radial-gradient(circle at 55% 45%, rgba(56,189,248,0.45) 1px, transparent 1px)', backgroundSize: '70px 70px' }} />
                <div className="absolute -right-20 -top-16 w-60 h-60 bg-cyan-400/15 blur-[140px] dark:hidden" />
                <div className="absolute -left-16 bottom-0 w-52 h-52 bg-indigo-500/20 blur-[130px] dark:hidden" />
                <div className="hidden dark:block absolute inset-0">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(59,130,246,0.18),transparent_55%),radial-gradient(circle_at_85%_80%,rgba(14,165,233,0.15),transparent_55%),radial-gradient(circle_at_80%_10%,rgba(236,72,153,0.15),transparent_70%)] opacity-80" />
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15" />
                  <div className="absolute inset-x-6 top-0 h-40 bg-gradient-to-b from-cyan-500/25 via-transparent to-transparent blur-2xl" />
                  <div className="absolute inset-x-12 bottom-0 h-48 bg-gradient-to-t from-indigo-500/20 via-transparent to-transparent blur-3xl" />
                </div>
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-8 left-8 h-px w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-cyan-200/40" />
                  <div className="absolute bottom-12 right-6 h-px w-20 bg-gradient-to-r from-transparent via-cyan-200/60 to-transparent animate-pulse dark:via-indigo-300/50" />
                </div>

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.5em] text-slate-500 dark:text-slate-400">Dashboard</p>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Realtime Overview</h3>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-emerald-200 bg-emerald-400/10 border border-emerald-400/20 px-3 py-1 rounded-full">
                      <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                      Live
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3 text-[10px] uppercase tracking-[0.4em]">
                    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-300" />
                      Realtime
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-300" />
                      Drift 0.4%
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-4 relative overflow-hidden shadow-[inset_0_0_15px_rgba(15,23,42,0.04)] dark:border-white/10 dark:bg-[#030a16] dark:bg-none dark:shadow-[0_45px_120px_rgba(1,6,23,0.85)]">
                    <div className="absolute -top-10 -right-10 w-44 h-44 bg-sky-500/20 blur-[90px] dark:hidden" />
                    <div className="absolute -top-16 -right-6 w-52 h-52 hidden dark:block bg-cyan-400/25 blur-[150px]" />
                    <div className="absolute -bottom-12 left-10 w-48 h-48 bg-indigo-500/15 blur-[100px] dark:hidden" />
                    <div className="absolute -bottom-20 left-0 w-60 h-60 hidden dark:block bg-indigo-500/30 blur-[160px]" />
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.5em] text-slate-500 dark:text-slate-400">Revenue Growth</p>
                        <p className="text-4xl font-semibold text-slate-900 mt-2 dark:text-white">+38%</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[11px] uppercase tracking-[0.5em] text-slate-500 dark:text-slate-500">Accuracy</p>
                        <p className="text-3xl font-semibold text-slate-900 mt-2 dark:text-white">98.9%</p>
                      </div>
                    </div>

                    <div className="mt-5 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-3.5 shadow-[inset_0_0_26px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-[#020915] dark:bg-none dark:shadow-[0_30px_70px_rgba(1,5,17,0.8)]">
                      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.45em] text-slate-500 dark:text-slate-300">
                        <span>Trajectory</span>
                        <span className="text-cyan-600 dark:text-cyan-200">Forecast</span>
                      </div>
                      <div className="relative mt-2 h-32 min-w-0 min-h-[128px]">
                        <div className="absolute inset-0 rounded-2xl bg-white/70 border border-slate-200 dark:hidden pointer-events-none" />
                        <div className="hidden dark:block absolute inset-0 rounded-2xl border border-white/10 bg-gradient-to-b from-[#04122c] via-[#020a16] to-[#01040a] pointer-events-none" />
                        <ResponsiveContainer width="100%" height={128}>
                          <AreaChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.25)" />
                            <defs>
                              <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.7} />
                                <stop offset="100%" stopColor="#6366f1" stopOpacity={0.05} />
                              </linearGradient>
                              <linearGradient id="revStroke" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#22d3ee" />
                                <stop offset="50%" stopColor="#60a5fa" />
                                <stop offset="100%" stopColor="#a855f7" />
                              </linearGradient>
                            </defs>
                            <XAxis
                              dataKey="q"
                              stroke="#cbd5f5"
                              tickLine={false}
                              axisLine={false}
                              tick={{ fontWeight: 700, fontSize: 12, fill: '#e2e8f0' }}
                            />
                            <Tooltip
                              cursor={{ fill: 'rgba(56,189,248,0.08)' }}
                              contentStyle={{
                                background: '#ffffff',
                                border: '1px solid rgba(148,163,184,0.3)',
                                borderRadius: 16,
                                color: '#0f172a'
                              }}
                              labelStyle={{ color: '#0f172a' }}
                            />
                            <Area
                              type="monotone"
                              dataKey="actual"
                              stroke="url(#revStroke)"
                              fill="url(#revFill)"
                              strokeWidth={3}
                              fillOpacity={1}
                            />
                            <Area
                              type="monotone"
                              dataKey="forecast"
                              stroke="url(#revStroke)"
                              strokeDasharray="8 6"
                              strokeWidth={2}
                              fillOpacity={0}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3.5">
                    <div className="relative rounded-2xl border border-slate-200 bg-white p-3.5 overflow-hidden dark:border-white/10 dark:bg-[#030c1d] dark:shadow-[0_25px_80px_rgba(0,6,28,0.6)]">
                      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.3),transparent_65%)]" />
                      <p className="text-[11px] uppercase tracking-[0.45em] text-slate-500 dark:text-slate-400">Data Freshness</p>
                      <p className="text-3xl font-semibold text-slate-900 mt-2 dark:text-white">2m</p>
                      <p className="text-xs text-emerald-600 mt-1 dark:text-emerald-300">P95 ingest lag</p>
                      <div className="mt-3 h-2 w-full rounded-full bg-slate-100 dark:bg-white/5">
                        <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500" />
                      </div>
                    </div>
                    <div className="relative rounded-2xl border border-slate-200 bg-white p-3.5 overflow-hidden dark:border-white/10 dark:bg-[#020915]/80 dark:shadow-[0_25px_80px_rgba(0,6,28,0.6)]">
                      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.35),transparent_70%)]" />
                      <p className="text-[11px] uppercase tracking-[0.45em] text-slate-500 dark:text-slate-400">Pipeline Success</p>
                      <p className="text-3xl font-semibold text-slate-900 mt-2 dark:text-white">99.8%</p>
                      <div className="mt-1 text-xs text-slate-500 dark:text-slate-300">4 regions monitored</div>
                      <div className="mt-3 flex gap-1.5">
                        {[90, 85, 92, 88].map((pct, idx) => (
                          <div
                            key={idx}
                            className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden dark:bg-white/10"
                          >
                            <div
                              className="h-full bg-gradient-to-r from-emerald-400 to-cyan-300"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/contact')}
                    className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-100 via-white to-slate-50 px-5 py-2.5 font-semibold text-slate-900 transition-all hover:border-slate-300 text-sm dark:border-white/15 dark:bg-gradient-to-r dark:from-cyan-500/10 dark:via-transparent dark:to-transparent dark:text-white dark:hover:border-white/30"
                  >
                    View live demo
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DataHeroWidget;
