import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, Cloud, Cpu, ShieldCheck } from 'lucide-react';

const tabs = [
  {
    id: 'serverless',
    label: 'Serverless',
    title: 'Serverless Pods',
    description:
      'Serverless capabilities with proven methodology. IaC templates, blue/green flips, and autoscaling guardrails in under 30 minutes per environment.',
    metrics: [
      { icon: Cloud, label: 'Blueprints', value: '12 live' },
      { icon: Cpu, label: 'Deploy', value: '30m cutover' }
    ]
  },
  {
    id: 'devops',
    label: 'DevOps',
    title: 'DevOps Automation',
    description:
      'DevOps capabilities ensure integration between code, infra, and compliance. Pipelines, tests, and monitors wired directly to mission control.',
    metrics: [
      { icon: Cpu, label: 'Deploy speed', value: '+65%' },
      { icon: ShieldCheck, label: 'Incidents', value: '0 Sev-1' }
    ]
  },
  {
    id: 'providers',
    label: 'AWS / GCP / Azure',
    title: 'AWS / GCP / Azure Landing Zones',
    description:
      'AWS/GCP/Azure capabilities deployed across 3 regions with FinOps dashboards, DR rehearsals, and managed KMS/IAM.',
    metrics: [
      { icon: Cloud, label: 'Regions', value: '3 active' },
      { icon: ShieldCheck, label: 'KMS/IAM', value: '100% policy' }
    ]
  }
] as const;

const bulletBadges = [
  { label: 'Zero Downtime', detail: '100% SLA — blue/green cutovers verified.' },
  { label: 'Audit Ready', detail: 'SOC2 + ISO controls pre-configured.' },
  { label: '24/7 Support', detail: 'Ops bridge with 99.9% response SLA.' }
] as const;

const nebulaNodes = Array.from({ length: 18 }, () => ({
  left: Math.random() * 100,
  top: Math.random() * 100,
  size: 4 + Math.random() * 6,
  delay: Math.random() * 6,
  duration: 12 + Math.random() * 10
}));

const dashStyles = `
@keyframes spinSlow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spinSlow 8s linear infinite;
}
@keyframes pulseGlow {
  0% { opacity: 0.6; transform: scale(0.9); }
  50% { opacity: 1; transform: scale(1); }
  100% { opacity: 0.6; transform: scale(0.9); }
}
.graph-dot {
  animation: pulseGlow 2.4s ease-in-out infinite;
}
.graph-shimmer {
  animation: shimmerSweep 3.8s ease-in-out infinite;
}
@keyframes shimmerSweep {
  0% { transform: translateX(-120%); opacity: 0; }
  20% { opacity: 0.6; }
  50% { opacity: 0.9; }
  80% { opacity: 0.6; }
  100% { transform: translateX(120%); opacity: 0; }
}
`;

const CloudHolo: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [expandedBadge, setExpandedBadge] = useState<string | null>(null);

  const activeContent = tabs[activeTab];

  return (
    <section className="relative py-16 sm:py-20 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-900 dark:bg-[#030516] dark:bg-none dark:text-white">
      <style>{dashStyles}</style>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.18),transparent_55%),radial-gradient(circle_at_80%_10%,rgba(14,165,233,0.15),transparent_50%),radial-gradient(circle_at_50%_80%,rgba(124,58,237,0.15),transparent_60%)] opacity-70 dark:bg-none dark:hidden" />
        <div className="hidden dark:block absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.25),transparent_55%),radial-gradient(circle_at_80%_10%,rgba(14,165,233,0.2),transparent_50%),radial-gradient(circle_at_50%_80%,rgba(124,58,237,0.35),transparent_60%)]" />
        {nebulaNodes.map((node, idx) => (
          <motion.span
            key={idx}
            className="absolute rounded-full bg-cyan-300/30 blur-[1px] dark:bg-cyan-300/40"
            style={{ width: node.size, height: node.size, left: `${node.left}%`, top: `${node.top}%` }}
            animate={{ y: ['0%', '-120%'], opacity: [0, 0.8, 0] }}
            transition={{ duration: node.duration, repeat: Infinity, delay: node.delay }}
          />
        ))}
        <div className="absolute inset-0 opacity-[0.07] dark:opacity-10" style={{ backgroundImage: 'url("https://assets-global.website-files.com/63d8011d3d38d50ca92c9d1e/63d8011d3d38d582e72c9d41_hex-grid.svg")', backgroundSize: '420px' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 lg:gap-10">
        <div className="space-y-7">
          <div>
            <p className="text-xs uppercase tracking-[0.6em] text-blue-500 mb-4 dark:text-cyan-300">
              End-to-End Cloud
            </p>
            <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 leading-tight dark:text-white">
              End-to-End Cloud Orchestration Mission Control for Multi-Cloud
            </h2>
            <p className="text-slate-600 mt-4 dark:text-slate-300">
              The same AI automation rigor, tuned for cloud workloads. Pick a lane to preview the
              exact squad workflow, guardrails, and hand-offs.
            </p>
          </div>

          <div className="relative rounded-[28px] border border-slate-200 px-5 py-6 backdrop-blur-md bg-white shadow-[0_25px_70px_rgba(15,23,42,0.12)] dark:border-cyan-400/40 dark:bg-transparent dark:shadow-[0_20px_70px_rgba(6,182,212,0.25)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeContent.id}
                initial={{ rotateX: -20, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                exit={{ rotateX: 10, opacity: 0 }}
                transition={{ duration: 0.45 }}
                className="space-y-4.5"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">{activeContent.title}</h3>
                  <span className="text-xs uppercase tracking-[0.4em] text-slate-400 dark:text-slate-400">
                    {activeContent.label}
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed dark:text-slate-200">{activeContent.description}</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {activeContent.metrics.map((metric) => {
                    const Icon = metric.icon;
                    return (
                      <motion.div
                        key={metric.label}
                        className="rounded-2xl border border-slate-200 px-4 py-3 flex items-center gap-3 bg-white shadow-sm dark:border-white/15 dark:bg-transparent backdrop-blur-sm"
                        whileHover={{ y: -4 }}
                      >
                        <span className="w-10 h-10 rounded-2xl border border-cyan-200 bg-cyan-50 text-cyan-600 flex items-center justify-center dark:border-cyan-400/30 dark:bg-cyan-500/10 dark:text-cyan-200">
                          <Icon className="w-5 h-5" />
                        </span>
                        <div>
                          <p className="text-xs uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">
                            {metric.label}
                          </p>
                          <p className="text-lg font-semibold text-slate-900 dark:text-white">{metric.value}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-wrap gap-3">
            {tabs.map((tab, idx) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(idx)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border backdrop-blur transition ${
                  activeTab === idx
                    ? 'bg-white text-slate-900 shadow-[0_15px_35px_rgba(15,23,42,0.15)] border-transparent dark:bg-white/10 dark:text-white dark:border-cyan-400 dark:shadow-[0_10px_30px_rgba(6,182,212,0.35)]'
                    : 'border-slate-200 text-slate-500 hover:text-slate-900 bg-white/70 dark:border-white/15 dark:text-slate-300 dark:bg-transparent dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[28px] border border-slate-200 p-5 backdrop-blur-xl bg-white relative overflow-hidden shadow-[0_30px_90px_rgba(15,23,42,0.12)] dark:border-white/15 dark:bg-transparent">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-blue-500 dark:text-cyan-300">Case Study</p>
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">Feltech — 24h</h3>
              </div>
              <span className="px-3 py-1 rounded-full border border-emerald-200 text-emerald-600 text-xs font-semibold flex items-center gap-2 dark:border-emerald-400/50 dark:text-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse dark:bg-emerald-300" />
                Live
              </span>
            </div>
            <p className="text-slate-600 mb-5 dark:text-slate-300">
              AWS migration zero downtime certified in 24 hours with stacked compliance playbooks.
            </p>
            <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm backdrop-blur-sm dark:bg-transparent dark:border-white/10">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-3 px-1 uppercase tracking-[0.35em] dark:text-slate-400">
                <span>0h</span>
                <span>12h</span>
                <span>24h</span>
              </div>
              <div className="relative h-24 flex flex-col items-center justify-center gap-3">
                <div className="absolute inset-x-8 top-5 h-12 bg-cyan-400/5 blur-3xl rounded-full pointer-events-none" />
                <div className="relative w-full max-w-[240px]">
                  <div className="relative h-5 rounded-full bg-slate-100 border border-slate-200 overflow-hidden dark:bg-slate-950/70 dark:border-white/15">
                    <div className="absolute inset-0 rounded-full bg-[linear-gradient(120deg,rgba(15,118,230,0.25),rgba(255,255,255,0.08)_35%,transparent)]" />
                    <div className="absolute inset-0 rounded-full border border-white/5" />
                    <div className="absolute inset-y-0 left-6 right-6 grid grid-cols-10">
                      {[...Array(9)].map((_, idx) => (
                        <span key={idx} className="w-px h-full bg-white/5" />
                      ))}
                    </div>
                    <div className="absolute inset-y-0 left-0 w-[75%] bg-[conic-gradient(from_180deg_at_0%_50%,rgba(34,211,238,0.95),rgba(59,130,246,0.85),rgba(124,58,237,0.8),rgba(34,211,238,0.95))]" />
                    <div className="graph-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent mix-blend-screen" />
                    <div className="absolute left-[75%] top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
                      <span className="block w-px h-5 bg-cyan-400/70 dark:bg-cyan-200/70" />
                      <span className="graph-dot block w-3 h-3 rounded-full bg-cyan-500 shadow-[0_0_20px_rgba(14,165,233,0.6)] dark:bg-white dark:shadow-[0_0_20px_rgba(14,165,233,0.9)]" />
                      <span className="text-[10px] text-cyan-500 uppercase tracking-[0.35em] dark:text-cyan-100">cutover</span>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-between text-[11px] text-slate-500 uppercase tracking-[0.3em] dark:text-slate-300">
                    <span className="text-emerald-500 flex items-center gap-2 dark:text-emerald-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-300" />
                      Downtime
                    </span>
                    <span className="text-slate-600 dark:text-white/80">0 mins</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400 uppercase tracking-[0.3em]">
                    <span>Transfer</span>
                    <span>23h 41m</span>
                  </div>
                </div>
                <div className="text-xs text-slate-200">24h → 0 downtime marker</div>
              </div>
            </div>
            <motion.button
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-cyan-200"
              whileHover={{ x: 6 }}
            >
              Read breakdown →
            </motion.button>
          </div>

          <div className="grid gap-4">
            {bulletBadges.map((badge) => (
              <motion.button
                key={badge.label}
                onClick={() => setExpandedBadge((prev) => (prev === badge.label ? null : badge.label))}
                className={`rounded-2xl border px-4 py-3 text-left backdrop-blur transition ${
                  expandedBadge === badge.label
                    ? 'border-blue-400 text-slate-900 shadow-[0_10px_30px_rgba(15,23,42,0.1)] dark:border-cyan-400/60 dark:text-white'
                    : 'border-slate-200 text-slate-600 bg-white dark:border-white/15 dark:text-slate-200 dark:bg-transparent'
                }`}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center gap-3 text-sm font-semibold">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      expandedBadge === badge.label
                        ? 'border-blue-400 text-blue-500 bg-blue-50 dark:border-cyan-400/50 dark:text-cyan-200 dark:bg-transparent'
                        : 'border-slate-200 text-slate-500 bg-slate-50 dark:border-cyan-400/50 dark:text-cyan-200 dark:bg-transparent'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  {badge.label}
                </div>
                <AnimatePresence>
                  {expandedBadge === badge.label && (
                    <motion.p
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="text-sm text-slate-500 mt-2 dark:text-slate-300"
                    >
                      {badge.detail}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CloudHolo;
