import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Smartphone, Code2, Layers, ArrowRight, Sparkles, AppWindow, PlayCircle, Palette } from 'lucide-react';

const cards = [
  {
    id: 'native',
    icon: Smartphone,
    title: 'iOS & Android Launch',
    metric: '6 week pilots',
    description:
      'Swift + Kotlin squads that ship production-ready builds with native performance and offline resiliency.',
    href: '/pricing/app/native',
    accent: 'cyan'
  },
  {
    id: 'cross-platform',
    icon: Layers,
    title: 'Flutter / React Native',
    metric: '40% faster delivery',
    description:
      'Single codebase pipelines with shared component libraries, OTA updates, and CI/CD baked in.',
    href: '/pricing/app/cross-platform',
    accent: 'purple'
  },
  {
    id: 'product-design',
    icon: Palette,
    title: 'Product UX Systems',
    metric: '+68 NPS gains',
    description:
      'Design systems, UX research, and motion guidelines that keep multi-platform journeys perfectly aligned.',
    href: '/pricing/app/ux',
    accent: 'emerald'
  }
] as const;

const accentStyles = {
  cyan: {
    ring: 'border-cyan-200 dark:border-cyan-400/40',
    gradient: 'from-cyan-200/50 via-sky-200/40 to-transparent dark:from-cyan-400/30 dark:via-sky-500/20 dark:to-transparent',
    icon: 'text-cyan-600 dark:text-cyan-200',
    cta: 'from-cyan-500 to-blue-600'
  },
  purple: {
    ring: 'border-purple-200 dark:border-purple-400/40',
    gradient: 'from-violet-200/50 via-purple-200/40 to-transparent dark:from-violet-400/30 dark:via-purple-500/20 dark:to-transparent',
    icon: 'text-purple-600 dark:text-purple-200',
    cta: 'from-purple-500 to-indigo-500'
  },
  emerald: {
    ring: 'border-emerald-200 dark:border-emerald-400/40',
    gradient: 'from-emerald-200/50 via-teal-200/40 to-transparent dark:from-emerald-400/30 dark:via-teal-500/20 dark:to-transparent',
    icon: 'text-emerald-600 dark:text-emerald-200',
    cta: 'from-emerald-500 to-teal-500'
  }
} as const;

type AccentKey = keyof typeof accentStyles;

const AppTransparentPricing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section
      id="pricing"
      className="relative py-24 sm:py-28 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-900 dark:bg-[#030712] dark:text-white"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),transparent_55%)] opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(6,182,212,0.2),transparent_55%)] opacity-40" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay dark:opacity-20" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="text-center space-y-5"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-slate-200 bg-white text-xs tracking-[0.35em] uppercase text-slate-500 dark:border-white/15 dark:bg-white/5 dark:text-cyan-200">
            <Sparkles className="w-4 h-4 text-blue-500 dark:text-cyan-300" />
            App Development
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight dark:text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-600">
              Ready to Develop Your App?
            </span>
          </h2>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto dark:text-slate-300">
            Scope, budget, and team composition in one glass dashboard. Every engagement ships with delivery SLAs, QA, and launch readiness baked in.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {cards.map((card, index) => {
            const accent = accentStyles[card.accent as AccentKey];
            const Icon = card.icon;
            return (
              <motion.article
                key={card.id}
                data-pricing-card
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className={`relative rounded-3xl border bg-white p-8 flex flex-col gap-6 overflow-hidden transition-all duration-500 hover:-translate-y-2 shadow-[0_25px_80px_rgba(15,23,42,0.08)] ${accent.ring} dark:bg-white/5 dark:shadow-none`}
              >
                <div className={`absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${accent.gradient}`} />
                <div className="relative flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-[0.35em] dark:text-slate-400">Delivery lane</p>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{card.title}</h3>
                  </div>
                  <div className={`w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center ${accent.icon} dark:bg-white/10 dark:border-white/15`}>
                    <Icon className="w-7 h-7" />
                  </div>
                </div>
                <p className="text-base text-slate-600 leading-relaxed relative dark:text-slate-300">{card.description}</p>
                <div className="flex items-center justify-between text-sm font-semibold text-slate-600 dark:text-slate-200">
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-slate-500 mb-1 dark:text-slate-500">Speed</p>
                    <span className="text-3xl font-bold text-slate-900 dark:text-white">{card.metric}</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate(card.href)}
                  className={`relative inline-flex items-center justify-between rounded-2xl border border-slate-200 bg-gradient-to-r ${accent.cta} px-6 py-3 font-semibold text-white transition-all duration-300 shadow-[0_20px_45px_rgba(59,130,246,0.25)] hover:pl-7 dark:border-white/20`}
                >
                  View package
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.article>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="rounded-3xl border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur-3xl p-8 sm:p-10 flex flex-col gap-6 text-center dark:border-white/10 dark:bg-gradient-to-br dark:from-white/10 dark:via-white/5 dark:to-transparent"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-blue-500 dark:text-cyan-200">Launch Audit</p>
          <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">Ship a clickable prototype in 10 days.</h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/contact')}
              className="flex items-center justify-center gap-3 rounded-full px-8 py-3 bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-semibold shadow-[0_20px_45px_rgba(59,130,246,0.35)] transition-transform duration-300 hover:scale-[1.03]"
            >
              <PlayCircle className="w-5 h-5" />
              Book a walkthrough
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="flex items-center justify-center gap-3 rounded-full px-8 py-3 bg-white text-slate-900 font-semibold border border-slate-200 shadow hover:scale-[1.02] transition-transform duration-300 dark:bg-white/10 dark:text-white dark:border-white/20"
            >
              <AppWindow className="w-5 h-5" />
              Download proposal
            </button>
          </div>
          <p className="text-slate-500 text-sm dark:text-slate-300">Includes scoped requirements, squad composition, and transparent estimates.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default AppTransparentPricing;
