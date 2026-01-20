import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart3, Activity, Layers, Sparkles, ArrowRight, PhoneCall, Mail, Database } from 'lucide-react';

type DataServiceCard = {
  id: string;
  title: string;
  metric: string;
  description: string;
  href: string;
  accent: 'aqua' | 'violet' | 'indigo';
  icon: React.ComponentType<{ className?: string; size?: number }>;
};

const dataCards: DataServiceCard[] = [
  {
    id: 'bi',
    title: 'BI Dashboards',
    metric: '+94% adoption',
    description: 'Executive-ready dashboards with governed metrics, live freshness, and pixel-perfect narratives.',
    href: '/contact?service=bi',
    accent: 'aqua',
    icon: BarChart3
  },
  {
    id: 'forecast',
    title: 'Predictive Analytics',
    metric: '42% faster',
    description: 'Pre-built ML playbooks that plug into your warehouse for forecasting, churn, and supply accuracy.',
    href: '/contact?service=forecast',
    accent: 'violet',
    icon: Activity
  },
  {
    id: 'pipelines',
    title: 'Data Pipelines',
    metric: '1.4M rows/min',
    description: 'Observable ingestion mesh with auto-heal, SLO tracking, and one-click replay support.',
    href: '/contact?service=pipelines',
    accent: 'indigo',
    icon: Layers
  }
];

const accentStyles: Record<DataServiceCard['accent'], { ring: string; glow: string; gradient: string; icon: string }> = {
  aqua: {
    ring: 'border-cyan-300/40',
    glow: 'shadow-[0_25px_80px_rgba(34,211,238,0.25)]',
    gradient: 'from-cyan-500/80 via-blue-500/60 to-slate-900/80',
    icon: 'text-cyan-200'
  },
  violet: {
    ring: 'border-violet-300/40',
    glow: 'shadow-[0_25px_80px_rgba(167,139,250,0.25)]',
    gradient: 'from-violet-500/80 via-purple-500/60 to-slate-900/80',
    icon: 'text-violet-100'
  },
  indigo: {
    ring: 'border-indigo-300/40',
    glow: 'shadow-[0_25px_80px_rgba(99,102,241,0.25)]',
    gradient: 'from-indigo-500/80 via-blue-500/60 to-slate-900/80',
    icon: 'text-indigo-100'
  }
};

const DataPricingShowcase: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="pricing" className="relative py-16 sm:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[#030512]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(79,70,229,0.18),transparent_55%)]" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 mix-blend-screen" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/15 bg-white/5 text-[11px] tracking-[0.4em] uppercase text-cyan-200">
            <Database className="w-4 h-4 text-cyan-300" />
            Data Analysis
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-500">
              Transparent Pricing for Modern Data Teams
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Choose the pod you need—BI, predictive, or data ops—and we deploy the same battle-tested automation stack we run for AI.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {dataCards.map((card, index) => {
            const Icon = card.icon;
            const accent = accentStyles[card.accent];
            return (
              <motion.article
                key={card.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className={`relative group rounded-3xl border bg-white/5 backdrop-blur-2xl p-8 flex flex-col gap-6 overflow-hidden transition-transform duration-500 hover:-translate-y-2 ${accent.ring} ${accent.glow}`}
              >
                <div className={`absolute -inset-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${accent.gradient} blur-3xl`} />
                <div className="relative flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-slate-300 uppercase tracking-[0.3em]">Data Pod</p>
                    <h3 className="text-2xl font-bold text-white">{card.title}</h3>
                  </div>
                  <div className={`w-16 h-16 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center ${accent.icon}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                </div>
                <p className="text-base text-slate-300 leading-relaxed">{card.description}</p>
                <div className="text-4xl font-black text-white">{card.metric}</div>
                <button
                  onClick={() => navigate(card.href)}
                  className="relative inline-flex items-center justify-between rounded-2xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:pl-7 group"
                >
                  Build Pricing →{' '}
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                </button>
              </motion.article>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-3xl p-8 sm:p-10 flex flex-col gap-6 text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-cyan-200">Free 48hr Data Audit</p>
          <h3 className="text-3xl sm:text-4xl font-bold text-white">Get the same AI automation audit, tuned for data stacks.</h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/60164071129?text=Hi%20Aurexis%20Solution%20-%20Book%20my%20Data%20Audit"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-3 rounded-full px-8 py-3 bg-gradient-to-r from-emerald-400 to-emerald-600 text-white font-semibold shadow-[0_20px_45px_rgba(16,185,129,0.35)] transition-transform duration-300 hover:scale-[1.03]"
            >
              <PhoneCall className="w-5 h-5" />
              WhatsApp Data Pod
            </a>
            <a
              href="mailto:aurexissolution@gmail.com?subject=Data%20Analysis%20Audit"
              className="flex items-center justify-center gap-3 rounded-full px-8 py-3 bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-semibold shadow-[0_20px_45px_rgba(59,130,246,0.35)] transition-transform duration-300 hover:scale-[1.03]"
            >
              <Mail className="w-5 h-5" />
              Email Delivery Team
            </a>
          </div>
          <p className="text-slate-300 text-sm">
            Zero fluff. We map your sources, surface bottlenecks, and ship a rollout budget aligned to your KPIs.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default DataPricingShowcase;
