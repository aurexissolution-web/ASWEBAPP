import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Database, Activity, LineChart, ShieldCheck } from 'lucide-react';

const FloatingOrb = ({
  icon: Icon,
  title,
  subtitle,
  gradient,
  delay
}: {
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  subtitle: string;
  gradient: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ delay, duration: 0.5 }}
    className="group relative flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 text-slate-900 shadow-[0_20px_45px_rgba(15,23,42,0.08)] hover:-translate-y-1 transition-all duration-300 dark:bg-slate-900/60 dark:border-cyan-500/10 dark:text-white dark:backdrop-blur-2xl hover:border-slate-300 dark:hover:border-cyan-400/40"
  >
    <div className="relative w-12 h-12 flex-shrink-0">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        className={`absolute inset-0 rounded-full bg-gradient-to-tr ${gradient} blur-md opacity-40 group-hover:opacity-80`}
      />
      <div className="absolute inset-0 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-900 dark:bg-slate-900/70 dark:border-white/10 dark:text-white">
        <Icon size={20} />
      </div>
    </div>
    <div>
      <p className="font-semibold">{title}</p>
      <p className="text-xs uppercase tracking-[0.35em] text-slate-400 dark:text-slate-400">{subtitle}</p>
    </div>
  </motion.div>
);

const ChartBar = ({
  label,
  percentage,
  color,
  delay
}: {
  label: string;
  percentage: number;
  color: string;
  delay: number;
}) => (
  <div className="flex-1 flex flex-col items-center gap-2">
    <motion.div
      initial={{ height: 0 }}
      whileInView={{ height: `${percentage}%` }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8, ease: 'easeOut' }}
      className={`w-full rounded-2xl bg-gradient-to-t ${color} shadow-[0_20px_40px_rgba(15,23,42,0.35)] dark:shadow-[0_20px_40px_rgba(15,23,42,0.65)]`}
      style={{ minHeight: '40px' }}
    />
    <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">{label}</p>
  </div>
);

const PerformanceHero: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const motionX = useMotionValue(0);
  const motionY = useMotionValue(0);

  const xSpring = useSpring(motionX, { stiffness: 150, damping: 25 });
  const ySpring = useSpring(motionY, { stiffness: 150, damping: 25 });

  const rotateX = useTransform(ySpring, [-0.5, 0.5], ['15deg', '-15deg']);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ['-15deg', '15deg']);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPos = (event.clientX - rect.left) / rect.width - 0.5;
    const yPos = (event.clientY - rect.top) / rect.height - 0.5;
    motionX.set(xPos);
    motionY.set(yPos);
  };

  const handleMouseLeave = () => {
    motionX.set(0);
    motionY.set(0);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-900 relative overflow-hidden dark:bg-[#020817] dark:bg-none dark:text-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.12),transparent_55%),radial-gradient(circle_at_bottom,_rgba(79,70,229,0.08),transparent_65%)] opacity-70 dark:hidden" />
        <div className="hidden dark:block absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.15),transparent_55%),radial-gradient(circle_at_bottom,_rgba(14,116,144,0.2),transparent_60%)] opacity-90" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
        </div>
      </div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none dark:hidden" />

      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-6xl mx-auto px-4 relative z-10"
      >
        <div className="relative bg-white border border-slate-200 rounded-[32px] shadow-[0_35px_120px_rgba(15,23,42,0.12)] overflow-hidden dark:bg-slate-900/70 dark:border-white/10 dark:shadow-[0_30px_120px_rgba(8,47,73,0.7)]">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-200/30 via-blue-200/15 to-transparent pointer-events-none dark:from-transparent" />
          <div className="p-10 grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-cyan-200 text-cyan-600 text-xs uppercase tracking-[0.4em] bg-white/80 shadow-sm dark:border-cyan-500/30 dark:text-cyan-200 dark:bg-transparent">
                LIVE
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight dark:text-white">
                Data Ops Command
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-400 dark:from-cyan-400 dark:via-blue-400 dark:to-emerald-400">
                  Performance Deck
                </span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                The same cinematic, glassmorphic control room we ship with AI Automation now powers data reliability—every pipeline,
                every freshness SLA, orchestrated in one holographic surface.
              </p>
              <div className="space-y-4">
                <FloatingOrb
                  icon={Database}
                  title="15 live ingestion streams"
                  subtitle="sources monitored"
                  gradient="from-cyan-400 to-blue-500"
                  delay={0.1}
                />
                <FloatingOrb
                  icon={Activity}
                  title="1.4M rows / min"
                  subtitle="warehouse ingest"
                  gradient="from-emerald-400 to-teal-500"
                  delay={0.2}
                />
                <FloatingOrb
                  icon={LineChart}
                  title="+22% forecast accuracy"
                  subtitle="predictive layer"
                  gradient="from-purple-500 to-pink-500"
                  delay={0.3}
                />
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 blur-[120px] bg-cyan-400/20 dark:bg-cyan-400/20" />
              <div className="relative bg-white border border-slate-200 rounded-[28px] p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:bg-slate-950/70 dark:border-white/10 dark:backdrop-blur-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.5em] text-slate-500 dark:text-slate-500">Mission Control</p>
                    <p className="text-slate-900 font-semibold dark:text-white">Live SLO Dashboard</p>
                  </div>
                  <ShieldCheck className="text-emerald-500 dark:text-emerald-400" size={28} />
                </div>
                <div className="grid grid-cols-3 gap-4 h-44 mb-8">
                  <ChartBar label="Freshness" percentage={90} color="from-cyan-400 to-blue-500" delay={0.2} />
                  <ChartBar label="Pipeline" percentage={75} color="from-emerald-400 to-teal-400" delay={0.3} />
                  <ChartBar label="Forecast" percentage={60} color="from-purple-500 to-pink-500" delay={0.4} />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-slate-500 dark:text-slate-300">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
                    <p className="text-xs uppercase tracking-[0.4em] text-slate-500 mb-1 dark:text-slate-500">Latency</p>
                    <p className="text-2xl font-semibold text-slate-900 dark:text-white">24ms</p>
                    <p className="text-slate-600 text-xs mt-1 dark:text-slate-400">Edge-to-warehouse</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
                    <p className="text-xs uppercase tracking-[0.4em] text-slate-500 mb-1 dark:text-slate-500">SLA</p>
                    <p className="text-2xl font-semibold text-slate-900 dark:text-white">99.9%</p>
                    <p className="text-slate-600 text-xs mt-1 dark:text-slate-400">Pipelines green</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default PerformanceHero;
