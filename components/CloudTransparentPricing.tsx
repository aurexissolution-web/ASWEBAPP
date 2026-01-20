import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Server, ShieldCheck, Network, ArrowRight, Sparkles, Cloud, Zap, Globe } from 'lucide-react';

const cards = [
  {
    id: 'mission-control',
    icon: Server,
    title: 'Cloud Mission Control',
    metric: 'Zero-drift SLOs',
    description:
      'Dedicated pods operating your multi-cloud estate with 24/7 runbooks, compliance checks, and live FinOps dashboards.',
    href: '/pricing/cloud/mission-control',
    accent: 'cyan'
  },
  {
    id: 'migration',
    icon: Cloud,
    title: 'Migration Strike Team',
    metric: '24h cutovers',
    description:
      'AWS / Azure / GCP migrations with dual-run traffic, automated testing matrices, and no-downtime playbooks.',
    href: '/pricing/cloud/migration',
    accent: 'purple'
  },
  {
    id: 'shield',
    icon: ShieldCheck,
    title: 'Security & Resilience',
    metric: '0 Sev-1 alerts',
    description:
      'Managed WAF, threat intelligence, chaos drills, and disaster recovery orchestration across 34 regions.',
    href: '/pricing/cloud/security',
    accent: 'amber'
  }
] as const;

const accentStyles = {
  cyan: {
    ring: 'border-cyan-200 dark:border-cyan-400/40',
    gradient: 'from-cyan-200/40 via-sky-200/30 to-transparent dark:from-cyan-400/25 dark:via-sky-500/20 dark:to-transparent',
    icon: 'text-cyan-600 dark:text-cyan-200'
  },
  purple: {
    ring: 'border-violet-200 dark:border-violet-400/40',
    gradient: 'from-violet-200/40 via-indigo-200/30 to-transparent dark:from-violet-400/30 dark:via-indigo-500/20 dark:to-transparent',
    icon: 'text-violet-600 dark:text-violet-200'
  },
  amber: {
    ring: 'border-amber-200 dark:border-amber-400/40',
    gradient: 'from-amber-200/35 via-orange-200/25 to-transparent dark:from-amber-400/25 dark:via-orange-500/20 dark:to-transparent',
    icon: 'text-amber-600 dark:text-amber-200'
  }
} as const;

type AccentKey = keyof typeof accentStyles;

const CloudTransparentPricing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section
      id="pricing"
      className="relative py-20 sm:py-24 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-900 dark:bg-[#020617] dark:text-white"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.2),transparent_55%),radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.15),transparent_60%),radial-gradient(circle_at_50%_90%,rgba(109,40,217,0.2),transparent_65%)] opacity-70 dark:opacity-100" />
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'linear-gradient(90deg,rgba(15,23,42,0.08) 1px, transparent 1px), linear-gradient(rgba(15,23,42,0.08) 1px, transparent 1px)', backgroundSize: '140px 140px' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-slate-200 bg-white text-xs tracking-[0.35em] uppercase text-slate-500 dark:border-white/15 dark:bg-white/5 dark:text-cyan-200">
            <Sparkles className="w-4 h-4 text-blue-500 dark:text-cyan-300" />
            Cloud Solutions
          </div>
          <h2 className="text-3xl sm:text-[42px] font-bold text-slate-900 leading-tight dark:text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 dark:from-cyan-200 dark:via-indigo-400 dark:to-emerald-300">
              Transparent Cloud Pricing Built for Scale
            </span>
          </h2>
          <p className="text-lg text-slate-500 max-w-3xl mx-auto dark:text-slate-300">
            Pick the lane that fits your infra goals. Every engagement ships with observability, compliance guardrails, and proactive FinOps reviews.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {cards.map((card, index) => {
            const accent = accentStyles[card.accent as AccentKey];
            const Icon = card.icon;
            return (
              <motion.article
                key={card.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className={`relative rounded-3xl border bg-white p-8 flex flex-col gap-6 overflow-hidden transition-all duration-500 hover:-translate-y-2 shadow-[0_25px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl ${accent.ring} dark:bg-white/5 dark:shadow-none`}
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
                    <p className="text-xs uppercase tracking-[0.4em] text-slate-500 mb-1 dark:text-slate-500">Promise</p>
                    <span className="text-3xl font-bold text-slate-900 dark:text-white">{card.metric}</span>
                  </div>
                  <div className="text-right text-xs uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500">
                    30-day go-live
                  </div>
                </div>
                <button
                  onClick={() => navigate(card.href)}
                  className="relative inline-flex items-center justify-between rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-900/90 to-slate-800/90 px-6 py-3 font-semibold text-white transition-all duration-300 hover:pl-7 dark:border-white/20 dark:from-white/10 dark:to-white/10"
                >
                  View scope
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
          className="rounded-[32px] border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur-3xl p-8 sm:p-10 flex flex-col gap-6 text-center dark:border-white/10 dark:bg-gradient-to-br dark:from-white/10 dark:via-white/5 dark:to-transparent"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-blue-500 dark:text-cyan-200">Infra Readiness Audit</p>
          <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">Blueprint a resilient multi-cloud stack in 10 days.</h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/contact')}
              className="flex items-center justify-center gap-3 rounded-full px-8 py-3 bg-gradient-to-r from-cyan-400 to-indigo-600 text-white font-semibold shadow-[0_20px_45px_rgba(59,130,246,0.35)] transition-transform duration-300 hover:scale-[1.03]"
            >
              <Zap className="w-5 h-5" />
              Book assessment
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="flex items-center justify-center gap-3 rounded-full px-8 py-3 bg-white text-slate-900 font-semibold border border-slate-200 shadow transition-transform duration-300 hover:scale-[1.02] dark:bg-white/10 dark:text-white dark:border-white/20"
            >
              <Globe className="w-5 h-5" />
              Download scope
            </button>
          </div>
          <p className="text-slate-500 text-sm dark:text-slate-300">
            Includes architecture review, cost benchmark, and operations roadmap with staffing model.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CloudTransparentPricing;
