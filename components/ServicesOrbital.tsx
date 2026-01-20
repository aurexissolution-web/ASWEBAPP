import React, { useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useAnimationFrame } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

const tabs = [
  {
    id: 'serverless',
    label: 'Serverless Pipelines',
    title: 'Serverless Acceleration Pods',
    description: 'Serverless capabilities with proven methodology. Ship IaC templates, blue/green rollout and observability in under 30 days.',
    bullets: ['Zero Downtime Playbooks', 'Audit-Ready Policies', '24/7 Ops Support']
  },
  {
    id: 'providers',
    label: 'AWS / GCP / Azure',
    title: 'Multi-Cloud Landing Zones',
    description: 'AWS/GCP/Azure capabilities with cost guardrails and workload blueprints built by certified SRE leads.',
    bullets: ['Cross-Region DR', 'FinOps Dashboards', 'Managed KMS + IAM']
  },
  {
    id: 'devops',
    label: 'DevOps Automation',
    title: 'DevOps & Release Automation',
    description: 'DevOps capabilities ensure integration between code, infra, and compliance. Pipelines, tests, and alerts orchestrated end-to-end.',
    bullets: ['GitOps & Policy-as-Code', 'AIOps Monitoring', 'Runbook Automation']
  }
] as const;

const ambientNodes = [
  { x: 8, y: 15 },
  { x: 22, y: 5 },
  { x: 80, y: 12 },
  { x: 12, y: 70 },
  { x: 90, y: 68 },
  { x: 72, y: 80 }
];

const ServicesOrbital: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [orbitPaused, setOrbitPaused] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<number | null>(null);

  const orbitGroupRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);
  const baseSpeed = 8;
  const speedRef = useRef(baseSpeed);

  const tabAngleOffsets = useMemo(() => tabs.map((_, idx) => idx * (360 / tabs.length)), []);

  useAnimationFrame((_, delta) => {
    if (!orbitPaused) {
      rotationRef.current = rotationRef.current + (speedRef.current * delta) / 1000;
      const group = orbitGroupRef.current;
      if (group) {
        group.style.transform = `rotate(${rotationRef.current}deg)`;
      }
    }
  });

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    speedRef.current = baseSpeed + 6;
    setTimeout(() => {
      speedRef.current = baseSpeed;
    }, 1400);
  };

  const handleHoverStart = (index: number) => {
    setOrbitPaused(true);
    setHoveredTab(index);
  };

  const handleHoverEnd = () => {
    setOrbitPaused(false);
    setHoveredTab(null);
  };

  const activeContent = tabs[activeTab];

  const ringIndicator = useMemo(() => {
    const angle = tabAngleOffsets[activeTab] + rotationRef.current;
    const radius = 100;
    const x = 100 + radius * Math.cos((angle * Math.PI) / 180);
    const y = 100 + radius * Math.sin((angle * Math.PI) / 180);
    return { x, y };
  }, [activeTab, rotationRef, tabAngleOffsets]);

  const radialBurst = hoveredTab !== null;

  return (
    <section className="relative py-24 overflow-hidden bg-[#040b1f] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.08),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(34,197,94,0.08),transparent_65%)]" />
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(90deg,rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '90px 90px' }} />
      {ambientNodes.map((node, idx) => (
        <motion.span
          key={idx}
          className="absolute w-2 h-2 rounded-full bg-cyan-300/40"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.4, 1] }}
          transition={{ duration: 6 + idx, repeat: Infinity }}
        />
      ))}

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div>
            <p className="text-xs uppercase tracking-[0.5em] text-cyan-300 mb-4">End-to-End Cloud</p>
            <h2 className="text-4xl md:text-5xl font-semibold leading-tight">Cloud Services Orchestrated Like Mission Control</h2>
            <p className="text-slate-300 mt-4 max-w-xl">
              One playbook for every layer: serverless workloads, multi-cloud migrations, and audited DevOps automation. Tap a lane to preview the exact squad workflow.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {tabs.map((tab, idx) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(idx)}
                onMouseEnter={() => handleHoverStart(idx)}
                onMouseLeave={handleHoverEnd}
                className={`relative px-4 py-2 rounded-full text-sm font-semibold transition border ${
                  activeTab === idx ? 'bg-white/10 border-cyan-400/50 text-white shadow-[0_10px_30px_rgba(6,182,212,0.35)]' : 'bg-white/5 border-white/10 text-slate-300 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 -top-8 blur-3xl bg-cyan-500/10 rounded-full" />
          <div className="relative rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8 overflow-hidden">
            <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'linear-gradient(120deg,rgba(56,189,248,0.08),transparent,rgba(16,185,129,0.08))' }} />

            <div className="relative grid md:grid-cols-[260px_1fr] gap-6">
              <div className="flex items-center justify-center">
                <div className="relative w-[220px] h-[220px] sm:w-[260px] sm:h-[260px]">
                  <div className="absolute inset-0 rounded-full border border-white/10" />
                  <div className="absolute inset-8">
                    <motion.svg className="w-full h-full" viewBox="0 0 200 200">
                      <motion.circle
                        cx="100"
                        cy="100"
                        r="90"
                        fill="none"
                        stroke="url(#orbTrail)"
                        strokeWidth="1.8"
                        strokeDasharray="12 30"
                        animate={{ strokeDashoffset: [0, -120] }}
                        transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                      />
                      <defs>
                        <linearGradient id="orbTrail" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.7" />
                          <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.1" />
                          <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.7" />
                        </linearGradient>
                      </defs>
                    </motion.svg>
                  </div>

                  <div ref={orbitGroupRef} className="absolute inset-0 transition-transform">
                    {tabs.map((tab, idx) => {
                      const angle = tabAngleOffsets[idx];
                      const radius = 92;
                      const x = 100 + radius * Math.cos((angle * Math.PI) / 180);
                      const y = 100 + radius * Math.sin((angle * Math.PI) / 180);
                      return (
                        <motion.button
                          key={tab.id}
                          onMouseEnter={() => handleHoverStart(idx)}
                          onMouseLeave={handleHoverEnd}
                          onClick={() => handleTabChange(idx)}
                          className={`absolute -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full text-xs font-semibold border ${
                            activeTab === idx ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-[0_10px_30px_rgba(6,182,212,0.4)]' : 'bg-white/10 border-white/10 text-slate-200'
                          }`}
                          style={{ left: `${x}%`, top: `${y}%` }}
                          whileHover={{ scale: 1.08 }}
                        >
                          {tab.label.split(' ')[0]}
                        </motion.button>
                      );
                    })}
                  </div>

                  <motion.div
                    className="absolute w-3 h-3 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.9)]"
                    animate={{
                      left: `${ringIndicator.x}%`,
                      top: `${ringIndicator.y}%`
                    }}
                    transition={{ duration: 0.4 }}
                  />

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, repeat: Infinity, repeatType: 'mirror' }}
                    className="absolute inset-8 rounded-full border border-cyan-400/30"
                  />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, ease: 'linear', duration: 18 }}
                    className="absolute inset-12 rounded-full border border-white/5 border-dashed"
                  />

                  <motion.div
                    className="absolute inset-16 rounded-full bg-gradient-to-br from-cyan-500/30 via-sky-500/10 to-transparent flex flex-col items-center justify-center text-center px-4 py-6 border border-white/10 shadow-[0_25px_60px_rgba(6,182,212,0.35)]"
                    animate={{ scale: [1, 1.04, 1], rotate: [-1, 1, -1] }}
                    transition={{ duration: 6, repeat: Infinity }}
                  >
                    <p className="text-xs uppercase tracking-[0.4em] text-slate-200 mb-2">Case Study</p>
                    <h4 className="text-2xl font-semibold text-white">Feltech — 24h</h4>
                    <p className="text-slate-200/80 text-sm">Full AWS migration audited within one day.</p>
                    <motion.button
                      className="mt-4 relative inline-flex items-center gap-2 px-5 py-1.5 text-xs font-semibold rounded-full bg-white/15 border border-white/30"
                      whileHover={{ scale: 1.06 }}
                    >
                      <span className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl opacity-0 group-hover:opacity-100 transition" />
                      Read <ArrowRight className="w-3.5 h-3.5" />
                    </motion.button>
                  </motion.div>

                  {radialBurst && (
                    <motion.div
                      className="absolute inset-0 rounded-full border border-cyan-400/20"
                      initial={{ scale: 0.8, opacity: 0.8 }}
                      animate={{ scale: 1.2, opacity: 0 }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />
                  )}
                </div>
              </div>

              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeContent.id}
                    initial={{ opacity: 0, scale: 0.96, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.94, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-4"
                  >
                    <p className="text-xs uppercase tracking-[0.5em] text-cyan-300">{activeContent.label}</p>
                    <h3 className="text-2xl font-semibold">{activeContent.title}</h3>
                    <p className="text-slate-300">{activeContent.description}</p>
                    <div className="space-y-3 pt-2 relative">
                      {activeContent.bullets.map((bullet, idx) => (
                        <motion.div
                          key={bullet}
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ delay: 0.1 * idx }}
                          className="flex items-center gap-3 text-sm text-slate-200"
                        >
                          <span className="w-7 h-7 rounded-full bg-white/10 border border-white/10 flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 text-cyan-300" />
                          </span>
                          {bullet}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesOrbital;
