import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  Tooltip,
  BarChart,
  Bar
} from 'recharts';

interface DataAnalysisCarouselProps {
  initialTab?: number;
}

type MiniTrendPoint = { step: number; value: number };

type MiniMetric = {
  label: string;
  value: string;
  delta: string;
  trend: MiniTrendPoint[];
};

type PanelConfig = {
  id: string;
  title: string;
  description: string;
  checks: string[];
  badge: string;
  vizType: 'miniMetrics' | 'forecast' | 'stacked';
  metrics?: MiniMetric[];
  dataset?: any[];
  icon: React.ReactNode;
};

const miniMetricData: MiniMetric[] = [
  {
    label: 'Engagement',
    value: '72%',
    delta: '+12%',
    trend: [
      { step: 1, value: 52 },
      { step: 2, value: 48 },
      { step: 3, value: 56 },
      { step: 4, value: 60 },
      { step: 5, value: 65 },
      { step: 6, value: 72 }
    ]
  },
  {
    label: 'NPS',
    value: '68',
    delta: '+6',
    trend: [
      { step: 1, value: 40 },
      { step: 2, value: 46 },
      { step: 3, value: 50 },
      { step: 4, value: 54 },
      { step: 5, value: 60 },
      { step: 6, value: 68 }
    ]
  },
  {
    label: 'Adoption',
    value: '89%',
    delta: '+9%',
    trend: [
      { step: 1, value: 55 },
      { step: 2, value: 60 },
      { step: 3, value: 64 },
      { step: 4, value: 74 },
      { step: 5, value: 82 },
      { step: 6, value: 89 }
    ]
  },
  {
    label: 'Refresh Lag',
    value: '1.2m',
    delta: '-32s',
    trend: [
      { step: 1, value: 4 },
      { step: 2, value: 3.6 },
      { step: 3, value: 3.1 },
      { step: 4, value: 2.4 },
      { step: 5, value: 1.8 },
      { step: 6, value: 1.2 }
    ]
  }
];

const predictiveData = [
  { label: 'Week 1', actual: 420, forecast: 390 },
  { label: 'Week 2', actual: 460, forecast: 440 },
  { label: 'Week 3', actual: 520, forecast: 500 },
  { label: 'Week 4', actual: 610, forecast: 580 },
  { label: 'Week 5', actual: 680, forecast: 640 }
];

const reportingData = [
  { name: 'Ops', realtime: 45, finance: 30 },
  { name: 'Sales', realtime: 52, finance: 32 },
  { name: 'CX', realtime: 38, finance: 28 },
  { name: 'Supply', realtime: 60, finance: 34 }
];

const panelConfig: PanelConfig[] = [
  {
    id: 'bi',
    title: 'BI Dashboards',
    description:
      'Accelerate your analytics capabilities with proven dashboard methodologies that guarantee adoption, governance, and speed.',
    checks: ['✅ Downtime', '✅ SLAs'],
    badge: '+94% efficiency in 48 hrs',
    vizType: 'miniMetrics',
    metrics: miniMetricData,
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12 text-cyan-400" fill="none" stroke="currentColor" strokeWidth={1.6}>
        <rect x="6" y="6" width="36" height="36" rx="10" className="opacity-30" />
        <path d="M16 30l6-10 5 6 5-12" />
        <circle cx="32" cy="14" r="3" />
      </svg>
    )
  },
  {
    id: 'predictive',
    title: 'Predictive Analytics',
    description:
      'Scale predictive capabilities with hardened data science playbooks that plug into your stack without rewrites or shadow models.',
    checks: ['✅ Cost Savings', '✅ Audit Compliance'],
    badge: '42% faster forecasts',
    vizType: 'forecast',
    dataset: predictiveData,
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12 text-sky-400" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M10 24c6-12 22-12 28 0" />
        <path d="M12 30c6-10 18-10 24 0" className="opacity-70" />
        <circle cx="24" cy="24" r="4" />
      </svg>
    )
  },
  {
    id: 'reporting',
    title: 'Reporting',
    description:
      'Operational reporting pipelines with governed layers, live freshness checks, and broadcast-ready narratives built-in.',
    checks: ['✅ Downtime', '✅ SLA Compliance'],
    badge: '2.1M refreshed rows / hr',
    vizType: 'stacked',
    dataset: reportingData,
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12 text-indigo-400" fill="none" stroke="currentColor" strokeWidth={1.4}>
        <path d="M12 34V18" />
        <path d="M22 34V12" />
        <path d="M32 34V22" />
        <rect x="10" y="34" width="28" height="4" rx="2" className="opacity-40" />
      </svg>
    )
  }
];

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 100 : -100, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction < 0 ? 100 : -100, opacity: 0 })
};

const MiniDashboardGrid: React.FC<{ data: MiniMetric[] }> = ({ data }) => (
  <div className="grid grid-cols-2 gap-3">
    {data.map(metric => (
      <div
        key={metric.label}
        className="rounded-2xl border border-slate-200 bg-white p-3 space-y-1 shadow-[0_12px_35px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/5 dark:backdrop-blur-xl"
      >
        <div className="text-[10px] uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">{metric.label}</div>
        <div className="text-xl font-semibold text-slate-900 dark:text-white">{metric.value}</div>
        <div className={`text-xs ${metric.delta.startsWith('+') ? 'text-emerald-600 dark:text-emerald-400' : 'text-pink-500 dark:text-pink-400'}`}>{metric.delta}</div>
        <div className="h-10">
          <ResponsiveContainer width="100%" height={40}>
            <AreaChart data={metric.trend} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={`mini-${metric.label}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.7} />
                  <stop offset="100%" stopColor="#e2e8f0" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={2} fill={`url(#mini-${metric.label})`} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    ))}
  </div>
);

const ForecastLineChart: React.FC<{ data: typeof predictiveData }> = ({ data }) => (
  <ResponsiveContainer width="100%" height={180}>
    <LineChart data={data} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.25)" />
      <XAxis dataKey="label" stroke="#94a3b8" tick={{ fontSize: 12, fill: '#475569' }} />
      <Tooltip
        cursor={{ stroke: 'rgba(14,165,233,0.4)', strokeWidth: 2 }}
        contentStyle={{ background: '#ffffff', borderRadius: 12, border: '1px solid rgba(148,163,184,0.35)', color: '#0f172a' }}
        labelStyle={{ color: '#0f172a' }}
      />
      <Line type="monotone" dataKey="actual" stroke="#0ea5e9" strokeWidth={3} dot={false} />
      <Line type="monotone" dataKey="forecast" stroke="#6366f1" strokeDasharray="6 6" strokeWidth={3} dot={false} />
    </LineChart>
  </ResponsiveContainer>
);

const ReportingStackedBar: React.FC<{ data: typeof reportingData }> = ({ data }) => (
  <ResponsiveContainer width="100%" height={180}>
    <BarChart data={data} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
      <CartesianGrid strokeDasharray="4 4" stroke="rgba(148,163,184,0.2)" />
      <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 12, fill: '#475569' }} />
      <Tooltip
        contentStyle={{ background: '#ffffff', borderRadius: 12, border: '1px solid rgba(148,163,184,0.35)', color: '#0f172a' }}
        labelStyle={{ color: '#0f172a' }}
      />
      <Bar dataKey="realtime" stackId="a" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
      <Bar dataKey="finance" stackId="a" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
);

const DataAnalysisCarousel: React.FC<DataAnalysisCarouselProps> = ({ initialTab = 0 }) => {
  const [activeIndex, setActiveIndex] = useState(initialTab);
  const [direction, setDirection] = useState(0);

  const safeIndex = useMemo(() => Math.min(Math.max(activeIndex, 0), panelConfig.length - 1), [activeIndex]);

  const goTo = useCallback(
    (nextIndex: number) => {
      if (nextIndex === safeIndex || nextIndex < 0 || nextIndex >= panelConfig.length) return;
      setDirection(nextIndex > safeIndex ? 1 : -1);
      setActiveIndex(nextIndex);
    },
    [safeIndex]
  );

  const handleKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        goTo(Math.min(safeIndex + 1, panelConfig.length - 1));
      }
      if (event.key === 'ArrowLeft') {
        goTo(Math.max(safeIndex - 1, 0));
      }
    },
    [goTo, safeIndex]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  const renderViz = (panel: PanelConfig) => {
    if (panel.vizType === 'forecast' && panel.dataset) {
      return <ForecastLineChart data={panel.dataset as typeof predictiveData} />;
    }
    if (panel.vizType === 'stacked' && panel.dataset) {
      return <ReportingStackedBar data={panel.dataset as typeof reportingData} />;
    }
    if (panel.metrics) {
      return <MiniDashboardGrid data={panel.metrics} />;
    }
    return null;
  };

  const currentPanel = panelConfig[safeIndex];

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-900 dark:bg-[#040814] dark:text-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(37,99,235,0.15),transparent_60%),radial-gradient(circle_at_80%_20%,rgba(165,180,252,0.18),transparent_55%),radial-gradient(circle_at_50%_90%,rgba(14,165,233,0.12),transparent_70%)] opacity-70 dark:hidden" />
        <div
          className="absolute inset-0 opacity-[0.08] dark:hidden"
          style={{
            backgroundImage:
              'linear-gradient(90deg, rgba(15,23,42,0.08) 1px, transparent 1px), linear-gradient(rgba(15,23,42,0.08) 1px, transparent 1px)',
            backgroundSize: '140px 140px'
          }}
        />
        <div className="hidden dark:block absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#040814] via-[#050b1b] to-[#080c18]" />
          <div className="absolute inset-0 opacity-50">
            <div className="absolute -top-32 left-1/4 w-[420px] h-[420px] bg-cyan-500/15 blur-[150px]" />
            <div className="absolute top-20 right-1/5 w-[480px] h-[480px] bg-purple-500/20 blur-[180px]" />
            <div className="absolute -bottom-40 left-0 w-[520px] h-[520px] bg-blue-500/15 blur-[170px]" />
          </div>
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',
              backgroundSize: '140px 140px'
            }}
          />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.08]" />
        </div>
      </div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] dark:hidden" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
            End-to-End Data Analysis
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto dark:text-slate-300">
            Give every team a single glass dashboard—from governed BI to predictive ops—inside one immersive carousel experience.
          </p>
        </div>

        <div className="flex justify-center gap-3 mb-6">
          {panelConfig.map((panel, idx) => {
            const isActive = idx === safeIndex;
            return (
              <button
                key={panel.id}
                onClick={() => goTo(idx)}
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-8 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_12px_rgba(34,211,238,0.6)]'
                    : 'w-2 h-2 bg-cyan-500/40 dark:bg-cyan-500/40 bg-cyan-200/80'
                }`}
                aria-label={`Go to ${panel.title}`}
              />
            );
          })}
        </div>

        <div className="bg-white/95 backdrop-blur-2xl border border-slate-200 rounded-3xl p-6 md:p-10 shadow-[0_40px_120px_rgba(15,23,42,0.12)] relative overflow-hidden dark:bg-black/20 dark:border-white/10">
          <div className="absolute inset-x-12 top-10 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-white/10" />
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentPanel.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) {
                  goTo(Math.min(safeIndex + 1, panelConfig.length - 1));
                }
                if (info.offset.x > 80) {
                  goTo(Math.max(safeIndex - 1, 0));
                }
              }}
              className="relative flex flex-col gap-8 md:flex-row items-center md:items-start snap-center"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 p-6 md:p-8 rounded-3xl w-full"
              >
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-slate-200 shadow-[0_20px_45px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-gradient-to-br dark:from-blue-500/30 dark:to-cyan-500/30">
                  {currentPanel.icon}
                </div>

                <div className="flex-1 space-y-4">
                  <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-900 via-blue-500 to-purple-500 bg-clip-text text-transparent dark:from-cyan-200 dark:via-blue-300 dark:to-purple-300">
                    {currentPanel.title}
                  </h3>
                  <p className="text-lg text-slate-600 leading-relaxed max-w-xl dark:text-slate-200/90">{currentPanel.description}</p>

                  <div className="flex flex-wrap gap-3">
                    {currentPanel.checks.map(check => (
                      <span
                        key={check}
                        className="px-4 py-2 bg-emerald-500/10 border border-emerald-400/25 rounded-full text-sm font-medium text-emerald-700 dark:bg-emerald-500/15 dark:border-emerald-400/40 dark:text-emerald-100"
                      >
                        {check}
                      </span>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-slate-200 flex items-center gap-4 dark:border-white/10">
                    <div className="w-16 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 font-semibold dark:bg-white/10 dark:text-white">FT</div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Fintech Corp</p>
                      <p className="font-semibold text-cyan-500 dark:text-cyan-400">{currentPanel.badge}</p>
                    </div>
                    <a
                      href="#"
                      className="ml-auto text-sm underline decoration-cyan-500 hover:no-underline text-cyan-600 dark:text-cyan-200"
                    >
                      Case Study →
                    </a>
                  </div>
                </div>

                <div className="w-full md:w-64 bg-white border border-slate-200 rounded-2xl p-4 shadow-inner dark:bg-black/40 dark:border-white/10">
                  {renderViz(currentPanel)}
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default DataAnalysisCarousel;
