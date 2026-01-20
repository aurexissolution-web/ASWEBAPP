import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Zap, Brain, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const cards = [
  {
    id: 'chatbots',
    title: 'Chatbot Results Live',
    icon: MessageCircle,
    color: 'cyan',
    metrics: [
      { label: 'Leads', value: '+60%' },
      { label: 'Saved', value: 'RM10k/mo' },
      { label: 'Speed', value: '48hr Deploy' }
    ],
    bullets: [
      'Auto-reply 24/7 on WhatsApp',
      'Qualify leads before human',
      'Sync to CRM instantly'
    ],
    link: '/services/ai' // Adjust link if needed
  },
  {
    id: 'automation',
    title: 'Automation Results Live',
    icon: Zap,
    color: 'purple',
    metrics: [
      { label: 'Time Saved', value: '80%' },
      { label: 'Value', value: 'RM15k/yr' },
      { label: 'Tech', value: 'API Sync' }
    ],
    bullets: [
      'Zero data entry errors',
      'Inventory updates real-time',
      'Auto-invoice generation'
    ],
    link: '/services/ai'
  },
  {
    id: 'custom',
    title: 'Custom AI Results Live',
    icon: Brain,
    color: 'emerald',
    metrics: [
      { label: 'Accuracy', value: '3x' },
      { label: 'Scale', value: 'Unlimited' },
      { label: 'Backend', value: 'Firebase' }
    ],
    bullets: [
      'Trained on YOUR data',
      'Predict sales trends',
      'Secure private deployment'
    ],
    link: '/services/ai'
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
};

const colorStyles = {
  cyan: {
    border: 'border-cyan-200 dark:border-cyan-500/20',
    hoverBorder: 'hover:border-cyan-400/60 dark:hover:border-cyan-400/50',
    iconBg: 'bg-cyan-100 dark:bg-cyan-500/10',
    iconText: 'text-cyan-600 dark:text-cyan-200',
    metricText: 'text-cyan-600 dark:text-cyan-200',
    bulletIcon: 'text-cyan-500 dark:text-cyan-200',
    glow: 'group-hover:shadow-[0_20px_50px_rgba(14,165,233,0.25)] dark:group-hover:shadow-[0_20px_60px_rgba(6,182,212,0.35)]',
    cta: 'text-cyan-600 hover:text-cyan-500 dark:text-cyan-200 dark:hover:text-cyan-100',
    lightGlow: 'from-cyan-200/40 to-blue-100/30',
    darkGlow: 'from-cyan-500/15 via-transparent to-blue-500/5'
  },
  purple: {
    border: 'border-purple-200 dark:border-purple-500/20',
    hoverBorder: 'hover:border-purple-400/60 dark:hover:border-purple-400/50',
    iconBg: 'bg-purple-100 dark:bg-purple-500/10',
    iconText: 'text-purple-600 dark:text-purple-200',
    metricText: 'text-purple-600 dark:text-purple-200',
    bulletIcon: 'text-purple-500 dark:text-purple-200',
    glow: 'group-hover:shadow-[0_20px_50px_rgba(168,85,247,0.25)] dark:group-hover:shadow-[0_20px_60px_rgba(168,85,247,0.35)]',
    cta: 'text-purple-600 hover:text-purple-500 dark:text-purple-200 dark:hover:text-purple-100',
    lightGlow: 'from-purple-200/40 to-indigo-100/30',
    darkGlow: 'from-purple-500/15 via-transparent to-indigo-500/5'
  },
  emerald: {
    border: 'border-emerald-200 dark:border-emerald-500/20',
    hoverBorder: 'hover:border-emerald-400/60 dark:hover:border-emerald-400/50',
    iconBg: 'bg-emerald-100 dark:bg-emerald-500/10',
    iconText: 'text-emerald-600 dark:text-emerald-200',
    metricText: 'text-emerald-600 dark:text-emerald-200',
    bulletIcon: 'text-emerald-500 dark:text-emerald-200',
    glow: 'group-hover:shadow-[0_20px_50px_rgba(16,185,129,0.25)] dark:group-hover:shadow-[0_20px_60px_rgba(16,185,129,0.35)]',
    cta: 'text-emerald-600 hover:text-emerald-500 dark:text-emerald-200 dark:hover:text-emerald-100',
    lightGlow: 'from-emerald-200/40 to-teal-100/30',
    darkGlow: 'from-emerald-500/15 via-transparent to-teal-500/5'
  }
} as const;

const ResultsGrid: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-900 dark:bg-[#030716] dark:bg-none dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {cards.map((card) => {
            // @ts-ignore
            const styles = colorStyles[card.color];
            const Icon = card.icon;

            return (
              <motion.div
                key={card.id}
                variants={item}
                className={`group relative bg-white/95 text-slate-900 backdrop-blur-xl rounded-3xl p-8 border ${styles.border} ${styles.hoverBorder} transition-all duration-300 hover:-translate-y-2 shadow-[0_15px_45px_rgba(15,23,42,0.12)] ${styles.glow} overflow-hidden dark:bg-[#060d1f]/90 dark:border-white/10 dark:text-white dark:shadow-[0_35px_90px_rgba(2,6,23,0.85)]`}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${styles.lightGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 dark:hidden`} />
                <div className={`absolute inset-0 hidden dark:block bg-gradient-to-br ${styles.darkGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${styles.iconBg} ${styles.iconText}`}>
                      <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 leading-tight dark:text-white">
                      {card.title}
                    </h3>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-3 gap-2 mb-8 border-y border-slate-200 py-4 dark:border-slate-800/50">
                    {card.metrics.map((metric, i) => (
                      <div key={i} className="text-center px-1">
                        <div className={`text-sm font-bold ${styles.metricText} mb-1`}>{metric.value}</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider dark:text-slate-500">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-3 mb-8">
                    {card.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                        <CheckCircle2 size={16} className={`mt-0.5 flex-shrink-0 ${styles.bulletIcon}`} />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link 
                    to={card.link}
                    className={`inline-flex items-center gap-2 font-semibold text-sm transition-colors ${styles.cta}`}
                  >
                    Scale Now
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ResultsGrid;
