import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Sparkles } from 'lucide-react';

const satellites = [
  { id: 'aws', label: 'AWS', tone: 'from-rose-500 to-orange-400', copy: 'Migrate 67% Faster' },
  { id: 'gcp', label: 'GCP', tone: 'from-sky-500 to-blue-500', copy: 'Infinite Scale' },
  { id: 'firebase', label: 'Firebase', tone: 'from-emerald-400 to-lime-400', copy: 'RM45k Savings' },
  { id: 'shopee', label: 'Shopee', tone: 'from-amber-400 to-orange-500', copy: 'MY Edge Ready' },
  { id: 'soc2', label: 'SOC2', tone: 'from-yellow-400 to-orange-300', copy: 'Zero-Trust' },
  { id: 'finops', label: 'FinOps', tone: 'from-fuchsia-400 to-purple-500', copy: 'Live Dashboards' }
] as const;

const rayMetrics = [
  { label: '99.8% Uptime', detail: 'managed SLO arc' },
  { label: '40+ Blueprints', detail: 'orbit pulse' },
  { label: '27-Day Deploys', detail: 'flash lane' }
];

const blueprintSlides = [
  {
    title: 'AWS → Firebase pods',
    body: 'VPC peering, Firestore sync, Shopee-ready webhooks and SOC2 guardrails.',
    chips: ['RM45k savings', 'Zero-downtime', 'MY compliance']
  },
  {
    title: 'SOC2 automation packs',
    body: 'Control matrix, evidence snapshots, Slack + Notion audit rituals included.',
    chips: ['Zero-trust', 'Audit logs', 'Weekly pulse']
  },
  {
    title: 'FinOps + Live Dashboards',
    body: 'Cost anomaly alerts, GA4 + CloudWatch overlays, CFO-ready exports.',
    chips: ['3.4× faster', 'Live savings', 'Atlas-ready']
  }
];

const particleVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: [0.2, 0.8, 0],
    scale: [0.8, 1.4, 1.8],
    transition: { duration: 2.4, repeat: Infinity, ease: 'easeOut' }
  }
};

const QuantumCloudCore: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const currentSlide = useMemo(() => blueprintSlides[activeSlide], [activeSlide]);

  return (
    <section className="relative overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-[#031226]/95 via-[#061b34]/95 to-[#0b1f3d]/95 p-8 sm:p-12 text-white shadow-[0_40px_140px_rgba(6,182,212,0.25)]">
      <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(16,185,129,0.25), transparent 55%), radial-gradient(circle at 80% 10%, rgba(59,130,246,0.25), transparent 55%)' }} />
      <div className="relative z-10 space-y-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.5em] text-emerald-200 flex items-center gap-2">
              <Sparkles size={14} /> Quantum Cloud Core
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-400">
              RM12k/mo – Power Your Cloud Core
            </h2>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-500 text-slate-900 font-semibold shadow-[0_18px_45px_rgba(6,182,212,0.55)] hover:translate-y-[-2px] transition-transform"
          >
            Ignite Audit <ChevronRight size={18} />
          </button>
        </div>

        <div className="relative">
          <motion.div
            animate={{ rotate: expanded ? 0 : 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            className="hidden sm:block absolute inset-0 mx-auto my-auto h-[460px] w-[460px] rounded-full border border-white/5 pointer-events-none"
          />
          <div className="grid lg:grid-cols-[0.65fr_0.35fr] gap-8 items-center">
            <div className="relative flex items-center justify-center">
              <motion.button
                onClick={() => setExpanded(!expanded)}
                animate={{ scale: expanded ? 1.05 : [0.95, 1.05, 0.95] }}
                transition={expanded ? { duration: 0.3 } : { duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative h-56 w-56 sm:h-72 sm:w-72 rounded-full bg-gradient-to-br from-[#00ff88] via-[#13c9a6] to-[#1e3f5e] shadow-[0_0_80px_rgba(16,185,129,0.4)] border border-white/15 flex flex-col items-center justify-center text-center"
              >
                <span className="text-xs uppercase tracking-[0.55em] text-slate-900/70">Core Reactor</span>
                <span className="text-3xl font-black text-white">Ignition</span>
                <p className="text-sm text-white/70 mt-2 px-6">Tap to reveal AWS→Firebase blueprints & SOC2 checklists.</p>
                <motion.div variants={particleVariants} initial="initial" animate="animate" className="absolute inset-0 rounded-full border border-white/30" />
                <motion.span
                  className="absolute h-3 w-3 rounded-full bg-white/80 shadow-[0_0_30px_rgba(255,255,255,0.7)]"
                  animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.button>

              {!expanded && (
                <motion.ul
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.1 } }
                  }}
                  className="hidden sm:block absolute inset-0"
                >
                  {satellites.map((satellite, index) => {
                    const angle = (index / satellites.length) * Math.PI * 2;
                    const radius = 190;
                    return (
                      <motion.li
                        key={satellite.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * index }}
                        className="absolute"
                        style={{
                          left: `calc(50% + ${Math.cos(angle) * radius}px)`,
                          top: `calc(50% + ${Math.sin(angle) * radius}px)`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <motion.span
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 3 + index, repeat: Infinity }}
                            className={`h-12 w-12 rounded-2xl border border-white/20 bg-gradient-to-br ${satellite.tone} shadow-[0_0_25px_rgba(255,255,255,0.2)] flex items-center justify-center text-xs font-semibold`}
                          >
                            {satellite.label}
                          </motion.span>
                          <p className="text-[11px] uppercase tracking-[0.35em] text-white/70">{satellite.copy}</p>
                        </div>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              )}

              <div className="mt-6 sm:mt-0 sm:hidden space-y-4 w-full">
                {satellites.map((satellite) => (
                  <div key={satellite.id} className="flex items-center justify-between px-4 py-3 rounded-2xl border border-white/10 bg-white/5">
                    <span className="text-sm font-semibold">{satellite.label}</span>
                    <span className="text-xs uppercase tracking-[0.3em] text-white/60">{satellite.copy}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-3 text-sm text-white/80">
                {rayMetrics.map((metric) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center"
                  >
                    <p className="text-lg font-bold">{metric.label}</p>
                    <p className="text-[11px] uppercase tracking-[0.35em] text-white/60 mt-1">{metric.detail}</p>
                  </motion.div>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {expanded ? (
                  <motion.div
                    key="carousel"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    className="rounded-[28px] border border-white/10 bg-white/5 p-6 space-y-4"
                  >
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.4em] text-white/60">
                      Blueprint carousel
                      <div className="flex gap-2">
                        {blueprintSlides.map((_, idx) => (
                          <button
                            key={`dot-${idx}`}
                            onClick={() => setActiveSlide(idx)}
                            className={`h-2 w-6 rounded-full transition ${idx === activeSlide ? 'bg-cyan-300' : 'bg-white/20'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <h3 className="text-2xl font-black">{currentSlide.title}</h3>
                    <p className="text-white/75">{currentSlide.body}</p>
                    <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.35em] text-white/70">
                      {currentSlide.chips.map((chip) => (
                        <span key={chip} className="px-3 py-1 rounded-full border border-white/20">
                          {chip}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="collapsed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="rounded-[28px] border border-white/10 bg-white/5 p-6 space-y-4"
                  >
                    <p className="text-xs uppercase tracking-[0.4em] text-white/60">Live rays</p>
                    <p className="text-lg text-white/80">
                      Reactor pushes AWS, GCP, Firebase and Shopee signals through FinOps rails. Tap the core to open flows and SOC2 checklists.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {['AWS→Firebase flows', 'SOC2 checklists', 'FinOps dashboards'].map((chip) => (
                        <span key={chip} className="px-4 py-1.5 rounded-full border border-white/20 text-xs uppercase tracking-[0.35em] text-white/70">
                          {chip}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuantumCloudCore;
