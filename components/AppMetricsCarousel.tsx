import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { DownloadCloud, Users, Sparkles } from 'lucide-react';

const metrics = [
  {
    title: '+24k Downloads',
    subtitle: 'App Store + Play',
    accent: 'from-cyan-400 via-sky-500 to-blue-500',
    icon: DownloadCloud
  },
  {
    title: '2.4k DAU',
    subtitle: 'Daily Active Users',
    accent: 'from-emerald-400 via-teal-500 to-emerald-500',
    icon: Users
  },
  {
    title: '99.9% D1 Retention',
    subtitle: 'Launch Cohort',
    accent: 'from-purple-400 via-fuchsia-500 to-pink-500',
    icon: Sparkles
  }
] as const;

const betaBadges = ['iOS Beta', 'Android Beta'];

const releaseStages = [
  { title: 'Design', subtitle: 'UX approved', badge: '✓', accent: 'text-emerald-400' },
  { title: 'Build', subtitle: 'Code freeze in 2d', badge: '✓', accent: 'text-emerald-400' },
  { title: 'Test', subtitle: '80% regression', badge: '80%', accent: 'text-cyan-300' }
] as const;

const AppMetricsCarousel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (event.clientX - left) / width - 0.5;
    const y = (event.clientY - top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative flex flex-col items-center gap-10 py-12 px-4 bg-gradient-to-br from-slate-50 via-white to-blue-50 rounded-[40px] border border-slate-200 shadow-[0_35px_90px_rgba(15,23,42,0.08)] dark:bg-[#060b18] dark:bg-none dark:border-white/10 dark:shadow-none"
    >
      <div className="relative flex items-center justify-center w-full">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-72 h-72 rounded-full bg-gradient-to-br from-blue-200/50 via-transparent to-transparent blur-3xl dark:from-slate-900/50"
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
            className="absolute w-64 h-64 rounded-full border border-blue-300/30 dark:border-cyan-500/15"
          />
        </div>

        <motion.div
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          className="relative"
        >
          <motion.div
            className="relative w-40 h-80 rounded-[28px] bg-gradient-to-b from-white via-blue-50 to-white border border-slate-200 shadow-[0_25px_60px_rgba(15,23,42,0.15)] p-4 flex flex-col dark:from-[#0b1220] dark:via-[#0f1828] dark:to-[#0b1220] dark:border-white/10 dark:shadow-[0_20px_45px_rgba(2,6,23,0.7)]"
            animate={{ boxShadow: ['0 25px 60px rgba(2,6,23,0.4)', '0 35px 80px rgba(2,6,23,0.7)', '0 25px 60px rgba(2,6,23,0.4)'] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="flex items-center justify-between text-[10px] text-slate-500 tracking-[0.35em] uppercase mb-3 dark:text-slate-400">
              <span>Aurexis</span>
              <span>9:41</span>
            </div>
            <motion.div
              className="relative flex-1 rounded-[22px] border border-slate-200 bg-white overflow-hidden px-1.5 py-2.5 dark:border-white/5 dark:bg-[#0d1624]/80"
              style={{ rotateX: 0, rotateY: 0 }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(59,130,246,0.2),transparent_65%)] dark:bg-[radial-gradient(circle,_rgba(15,118,255,0.25),transparent_65%)]" />
              <div className="relative h-full w-full flex flex-col gap-4">
                {releaseStages.map(stage => (
                  <div key={stage.title} className="flex items-center justify-between px-3">
                    <div>
                      <p className="text-slate-900 text-sm font-semibold dark:text-white">{stage.title}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{stage.subtitle}</p>
                    </div>
                    <span className={`text-sm font-semibold ${stage.accent}`}>{stage.badge}</span>
                  </div>
                ))}
                <div className="mt-auto px-3">
                  <p className="text-[10px] uppercase tracking-[0.4em] text-slate-500 mb-2">Release Window</p>
                  <div className="h-1 rounded-full bg-slate-200 overflow-hidden dark:bg-slate-800">
                    <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 w-[78%]" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Metrics row */}
      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map(metric => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.title}
              whileHover={{ translateY: -6, scale: 1.01 }}
              className="relative p-5 rounded-3xl bg-white border border-slate-200 shadow-[0_15px_45px_rgba(15,23,42,0.1)] overflow-hidden group dark:bg-white/5 dark:border-white/10 dark:shadow-none"
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${metric.accent} blur-3xl`} />
              <div className={`relative inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-gradient-to-r ${metric.accent} text-white font-semibold`}>
                <Icon size={18} />
                {metric.title}
              </div>
              <p className="relative mt-3 text-sm text-slate-500 dark:text-slate-400">{metric.subtitle}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-slate-400">
        {betaBadges.map(badge => (
          <span
            key={badge}
            className="px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm hover:border-blue-200 transition-colors dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
          >
            {badge}
          </span>
        ))}
      </div>
    </section>
  );
};

export default AppMetricsCarousel;
