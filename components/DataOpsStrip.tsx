import React from 'react';
import { motion } from 'framer-motion';
import { Database, Activity, LineChart } from 'lucide-react';

type Card = {
  id: string;
  number: string;
  title: string;
  description: string;
  impact: string;
  icon: React.ComponentType<{ className?: string }>;
};

const cards: Card[] = [
  {
    id: 'sources',
    number: '01',
    title: 'Disconnected Sources',
    description:
      'CRM, POS, and ad platforms scattered? We land every stream into a governed warehouse with reliable pipelines.',
    impact: 'Impact: 1 hr dashboard',
    icon: Database
  },
  {
    id: 'reporting',
    number: '02',
    title: 'Slow Reporting',
    description:
      'Manual Excel and static decks? Automated refresh pushes real-time KPIs to every team and device.',
    impact: 'Impact: 90% faster insights',
    icon: Activity
  },
  {
    id: 'forecasting',
    number: '03',
    title: 'No Forecasting',
    description:
      'Gut-feel decisions? ML models predict inventory, revenue, and risk with confidence intervals.',
    impact: 'Impact: +22% forecast accuracy',
    icon: LineChart
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  })
};

const DataOpsStrip: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-24 sm:py-28 px-4 bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-900 dark:bg-[#080c18] dark:text-white">
      {/* Aurora / Northern Lights premium dark background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:bg-[#080c18]" />
      {/* Animated aurora bands */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          initial={{ x: '-30%', opacity: 0.5 }}
          animate={{ x: ['−30%', '30%', '-30%'], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 18, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
          className="absolute top-0 left-0 w-[140%] h-[55%] bg-gradient-to-r from-emerald-300/20 via-cyan-200/25 to-blue-400/25 blur-[100px] rounded-full dark:from-emerald-500/30 dark:via-cyan-400/20 dark:to-blue-600/25"
        />
        <motion.div
          initial={{ x: '20%', opacity: 0.35 }}
          animate={{ x: ['20%', '-20%', '20%'], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 22, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
          className="absolute bottom-0 right-0 w-[120%] h-[50%] bg-gradient-to-l from-fuchsia-300/20 via-violet-300/20 to-indigo-400/20 blur-[110px] rounded-full dark:from-fuchsia-500/25 dark:via-violet-500/20 dark:to-indigo-600/20"
        />
        {/* Soft glowing orbs */}
        <motion.div
          initial={{ scale: 1, opacity: 0.18 }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.18, 0.28, 0.18] }}
          transition={{ duration: 10, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
          className="absolute top-[18%] left-[12%] w-56 h-56 rounded-full bg-cyan-300/20 blur-[80px]"
        />
        <motion.div
          initial={{ scale: 1, opacity: 0.14 }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.14, 0.22, 0.14] }}
          transition={{ duration: 14, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
          className="absolute bottom-[15%] right-[14%] w-48 h-48 rounded-full bg-fuchsia-300/15 blur-[70px]"
        />
        {/* Subtle mesh/wave pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="mesh" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M0 30 Q15 0 30 30 T60 30" fill="none" stroke="#fff" strokeWidth="0.5" />
              <path d="M0 60 Q15 30 30 60 T60 60" fill="none" stroke="#fff" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mesh)" />
        </svg>
        {/* Grain overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.07]" />
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-6 right-8 text-[10px] tracking-[0.45em] uppercase text-slate-400/70">
          {'const pipeline = dag("data-ops").every("10m");'}
        </div>
        <div className="absolute top-24 left-8 text-[10px] tracking-[0.45em] uppercase text-slate-400/70">
          {'warehouse.table("sales").refresh({ incremental: true });'}
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-16">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="text-center space-y-5"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-slate-200 bg-white text-xs tracking-[0.35em] uppercase text-emerald-600 dark:border-white/10 dark:bg-white/5 dark:text-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
            Data Ops
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight dark:text-white">Data Challenges We Untangle</h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto dark:text-slate-300">
            Give every stakeholder a single version of truth with governed analytics.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="relative"
        >
          <div className="hidden md:block absolute top-12 left-16 right-16 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {cards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.article
                  key={card.id}
                  custom={index}
                  variants={fadeUp}
                  className="relative rounded-[30px] border border-slate-200 bg-white px-7 py-8 flex flex-col gap-5 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_70px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-white/5 dark:backdrop-blur-xl dark:hover:border-cyan-400/60 dark:hover:shadow-2xl"
                >
                  <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-transparent dark:from-cyan-500/10 dark:via-blue-500/10" />
                  <div className="relative flex items-center gap-4">
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 text-white text-sm font-semibold tracking-[0.2em]">
                      {card.number}
                    </span>
                    <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.25)] dark:bg-white/10 dark:border-white/15 dark:text-cyan-200">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="relative space-y-2">
                    <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">{card.title}</h3>
                    <p className="text-base text-slate-600 leading-relaxed line-clamp-3 dark:text-slate-300">{card.description}</p>
                  </div>
                  <div className="relative mt-auto">
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-400/15 to-cyan-400/15 border border-emerald-400/30 text-[11px] font-semibold text-emerald-600 tracking-[0.3em] uppercase dark:text-emerald-200">
                      {card.impact}
                    </span>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DataOpsStrip;
