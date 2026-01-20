import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

const tabs = [
  {
    id: 'serverless',
    label: 'Serverless',
    title: 'Serverless Orchestration Pods',
    description:
      'Serverless capabilities with proven methodology. IaC templates, blue/green deploy, and cost guardrails baked in.',
    bullets: ['Zero Downtime', 'Audit Ready', '24/7 Support']
  },
  {
    id: 'devops',
    label: 'DevOps',
    title: 'DevOps Automation Squads',
    description:
      'DevOps capabilities ensure integration between code, infra, and compliance. Pipelines, tests, and monitoring orchestrated end-to-end.',
    bullets: ['GitOps Pipelines', 'Policy-as-Code', 'Runbook Automation']
  },
  {
    id: 'providers',
    label: 'AWS / GCP / Azure',
    title: 'AWS / GCP / Azure Landing Zones',
    description:
      'AWS/GCP/Azure capabilities delivered with FinOps dashboards, DR playbooks, and KMS/IAM enforcement.',
    bullets: ['Multi-Region DR', 'FinOps Insights', 'Managed KMS + IAM']
  }
] as const;

const nodes = [
  { id: 'n1', x: 10, y: 20 },
  { id: 'n2', x: 25, y: 8 },
  { id: 'n3', x: 38, y: 18 },
  { id: 'n4', x: 56, y: 10 },
  { id: 'n5', x: 72, y: 18 },
  { id: 'n6', x: 88, y: 28 },
  { id: 'n7', x: 18, y: 36 },
  { id: 'n8', x: 34, y: 34 },
  { id: 'n9', x: 52, y: 32 },
  { id: 'n10', x: 70, y: 36 },
  { id: 'n11', x: 14, y: 56 },
  { id: 'n12', x: 32, y: 54 },
  { id: 'n13', x: 52, y: 50 },
  { id: 'n14', x: 74, y: 54 },
  { id: 'n15', x: 90, y: 62 },
  { id: 'n16', x: 24, y: 72 },
  { id: 'n17', x: 42, y: 70 },
  { id: 'n18', x: 60, y: 68 },
  { id: 'n19', x: 78, y: 72 },
  { id: 'n20', x: 50, y: 85 }
] as const;

const links: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [0, 6],
  [6, 7],
  [7, 8],
  [8, 9],
  [9, 5],
  [6, 10],
  [7, 11],
  [8, 12],
  [9, 13],
  [13, 14],
  [10, 11],
  [11, 12],
  [12, 13],
  [11, 15],
  [12, 16],
  [13, 17],
  [14, 18],
  [16, 17],
  [17, 18],
  [17, 19],
  [12, 19],
  [18, 19]
];

const tabNodeClusters: number[][] = [
  [0, 1, 2, 6, 7, 11],
  [7, 8, 12, 16, 17, 19],
  [3, 4, 5, 13, 14, 18, 19]
];

const CloudNeural: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredTab, setHoveredTab] = useState<number | null>(null);

  const highlightIndices = hoveredTab ?? activeTab;
  const nodesHighlighted = tabNodeClusters[highlightIndices];
  const activeContent = tabs[activeTab];

  const highlightedLinks = useMemo(() => {
    const cluster = new Set(nodesHighlighted);
    return new Set(
      links
        .filter(([from, to]) => cluster.has(from) && cluster.has(to))
        .map(([from, to]) => `${from}-${to}`)
    );
  }, [nodesHighlighted]);

  return (
    <section className="relative py-24 overflow-hidden bg-[#030a1c] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.08),transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(34,197,94,0.08),transparent_70%)]" />
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(90deg,rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '100px 100px' }} />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[320px_1fr] gap-12">
        <div className="space-y-8">
          <div>
            <p className="text-xs uppercase tracking-[0.5em] text-cyan-300 mb-4">End-to-End Cloud</p>
            <h2 className="text-4xl md:text-5xl font-semibold leading-tight">
              End-to-End Cloud Orchestration Services—Mission Control for Multi-Cloud
            </h2>
            <p className="text-slate-300 mt-4">
              The same AI automation rigor, tuned for cloud. Choose a lane to preview the exact squad workflow, security guardrails, and hand-offs.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {tabs.map((tab, idx) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(idx)}
                onMouseEnter={() => setHoveredTab(idx)}
                onMouseLeave={() => setHoveredTab(null)}
                className={`relative px-5 py-3 rounded-2xl text-left border transition-all ${
                  activeTab === idx
                    ? 'bg-white/10 border-cyan-400/50 text-white shadow-[0_15px_45px_rgba(6,182,212,0.35)]'
                    : 'bg-white/5 border-white/5 text-slate-300 hover:border-white/20'
                }`}
              >
                <span className="text-sm font-semibold tracking-wide">{tab.label}</span>
                {activeTab === idx && (
                  <motion.span layoutId="tabGlow" className="absolute inset-0 rounded-2xl bg-cyan-500/20 blur-2xl" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="relative rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8 overflow-hidden">
          <div className="absolute inset-0 opacity-50 pointer-events-none" style={{ backgroundImage: 'linear-gradient(120deg,rgba(56,189,248,0.08),transparent,rgba(16,185,129,0.08))' }} />

          <div className="absolute inset-0">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {links.map(([fromIdx, toIdx], idx) => {
                const start = nodes[fromIdx];
                const end = nodes[toIdx];
                const key = `${fromIdx}-${toIdx}`;
                const highlighted = highlightedLinks.has(key);
                return (
                  <motion.line
                    key={key}
                    x1={start.x}
                    y1={start.y}
                    x2={end.x}
                    y2={end.y}
                    stroke={highlighted ? 'rgba(14,165,233,0.9)' : 'rgba(59,130,246,0.35)'}
                    strokeWidth={highlighted ? 1.6 : 0.8}
                    strokeDasharray="6 18"
                    animate={{ strokeDashoffset: [0, -60] }}
                    transition={{ duration: highlighted ? 2 : 6 + idx * 0.2, repeat: Infinity, ease: 'linear' }}
                    filter="url(#neuralGlow)"
                  />
                );
              })}

              <defs>
                <filter id="neuralGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
            </svg>

            {nodes.map((node, idx) => {
              const highlighted = nodesHighlighted.includes(idx);
              return (
                <motion.span
                  key={node.id}
                  className="absolute rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(6,182,212,0.7)]"
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    width: highlighted ? 12 : 9,
                    height: highlighted ? 12 : 9
                  }}
                  animate={{
                    scale: highlighted ? [1, 1.3, 1] : [1, 1.15, 1],
                    opacity: highlighted ? [0.8, 1, 0.8] : [0.4, 0.8, 0.4]
                  }}
                  transition={{ duration: highlighted ? 1.6 : 3, repeat: Infinity }}
                />
              );
            })}
          </div>

          <div className="relative grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white/5 rounded-2xl border border-white/10 p-6 shadow-[0_15px_45px_rgba(2,6,23,0.45)]">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-cyan-300">Case</p>
                    <h4 className="text-2xl font-semibold text-white">Feltech — 24h</h4>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/40 text-xs font-semibold">
                    Live
                  </span>
                </div>
                <p className="text-sm text-slate-200">
                  AWS migration, controls certified in 24 hours with zero downtime.
                </p>
                <motion.button
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200"
                  whileHover={{ x: 4, color: '#ffffff' }}
                >
                  Read the breakdown <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>

              <div className="space-y-4">
                {['Zero Downtime', 'Audit Ready', 'Ops Support'].map((item, idx) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-4 py-3"
                  >
                    <span className="w-8 h-8 rounded-2xl bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-center">
                      <Check className="w-4 h-4 text-cyan-300" />
                    </span>
                    <span className="text-sm text-slate-100">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeContent.id}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -25 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <p className="text-xs uppercase tracking-[0.5em] text-cyan-300">{activeContent.label}</p>
                  <h3 className="text-3xl font-semibold">{activeContent.title}</h3>
                  <p className="text-slate-200 leading-relaxed">{activeContent.description}</p>
                  <div className="space-y-3">
                    {activeContent.bullets.map((bullet) => (
                      <div key={bullet} className="flex items-center gap-3 text-sm text-slate-200">
                        <span className="w-6 h-6 rounded-full bg-white/10 border border-white/10 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-cyan-300" />
                        </span>
                        {bullet}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CloudNeural;
