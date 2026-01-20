import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, Zap, Gauge, ArrowRight, Sparkles, PhoneCall, Mail } from 'lucide-react';

type WebServiceCard = {
  id: string;
  title: string;
  metric: string;
  description: string;
  href: string;
  accent: 'cyan' | 'purple' | 'amber';
  icon: React.ComponentType<{ className?: string }>;
};

const webCards: WebServiceCard[] = [
  {
    id: 'core-web-vitals',
    title: 'Core Web Vitals Pod',
    metric: 'Lighthouse 99%',
    description: 'Daily vitals sweeps, code budgets, and render streaming baked into every deploy.',
    href: '/contact',
    accent: 'cyan',
    icon: Gauge
  },
  {
    id: 'edge-deploys',
    title: 'Edge Deploy Pod',
    metric: '24ms Deploys',
    description: 'Zero-downtime releases across Vercel + Cloudflare with scripted rollbacks and QA gates.',
    href: '/contact',
    accent: 'purple',
    icon: Zap
  },
  {
    id: 'bundle-audit',
    title: 'Bundle Diet Pod',
    metric: '50KB Avg Bundle',
    description: 'Code splitting, image orchestration, and third-party policing that keep payloads lean.',
    href: '/contact',
    accent: 'amber',
    icon: Globe
  }
];

const accentStyles: Record<WebServiceCard['accent'], { ring: string; glow: string; gradient: string; icon: string }> = {
  cyan: {
    ring: 'border-cyan-400/40',
    glow: 'shadow-[0_20px_70px_rgba(6,182,212,0.25)]',
    gradient: 'from-cyan-500/70 via-blue-500/60 to-indigo-500/70',
    icon: 'text-cyan-200'
  },
  purple: {
    ring: 'border-purple-400/40',
    glow: 'shadow-[0_20px_70px_rgba(139,92,246,0.25)]',
    gradient: 'from-violet-500/80 via-purple-500/60 to-fuchsia-500/70',
    icon: 'text-purple-200'
  },
  amber: {
    ring: 'border-amber-400/40',
    glow: 'shadow-[0_20px_70px_rgba(245,158,11,0.25)]',
    gradient: 'from-amber-400/80 via-orange-500/60 to-pink-500/70',
    icon: 'text-amber-200'
  }
};

const WebTransparentPricing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-28 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#020613]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.25),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_60%,rgba(14,165,233,0.2),transparent_55%)]" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 mix-blend-overlay" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-white/5 text-xs tracking-[0.35em] uppercase text-cyan-200">
            <Sparkles className="w-4 h-4 text-cyan-300" />
            Web Performance
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500">
              Built for Web Performance
            </span>
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Pick your pod—each comes with deploy speed guarantees, Lighthouse score SLAs, and bundle-size enforcement out of the box.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {webCards.map((card, index) => {
            const Icon = card.icon;
            const accent = accentStyles[card.accent];
            return (
              <motion.article
                key={card.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className={`relative group rounded-[28px] border bg-white/5 backdrop-blur-2xl p-8 flex flex-col gap-6 overflow-hidden transition-transform duration-500 hover:-translate-y-2 ${accent.ring} ${accent.glow}`}
              >
                <div className={`absolute -inset-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${accent.gradient} blur-3xl`} />
                <div className="relative flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-slate-300 uppercase tracking-[0.35em]">WEB POD</p>
                    <h3 className="text-2xl font-bold text-white">{card.title}</h3>
                  </div>
                  <div className={`w-14 h-14 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center ${accent.icon}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <p className="relative text-base text-slate-200 leading-relaxed">{card.description}</p>
                <div className="relative">
                  <span className="text-sm font-semibold text-slate-400 uppercase tracking-[0.35em]">Guaranteed</span>
                  <div className="mt-3 text-4xl font-black text-white">{card.metric}</div>
                </div>
                <button
                  onClick={() => navigate(card.href)}
                  className="relative inline-flex items-center justify-between rounded-2xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:pl-7 group"
                >
                  View Pod Pricing
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
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-cyan-200">Web Launch Hotline</p>
          <h3 className="text-3xl sm:text-4xl font-bold text-white">Ship a faster web stack with our performance architects.</h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/60164071129?text=Hi%20Aurexis%20Solution%20-%20Book%20my%20Web%20performance%20audit"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-3 rounded-full px-8 py-3 bg-gradient-to-r from-emerald-400 to-emerald-600 text-white font-semibold shadow-[0_20px_45px_rgba(16,185,129,0.35)] transition-transform duration-300 hover:scale-[1.03]"
            >
              <PhoneCall className="w-5 h-5" />
              WhatsApp Team
            </a>
            <a
              href="mailto:aurexissolution@gmail.com?subject=Web%20Performance%20Pods"
              className="flex items-center justify-center gap-3 rounded-full px-8 py-3 bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-semibold shadow-[0_20px_45px_rgba(59,130,246,0.35)] transition-transform duration-300 hover:scale-[1.03]"
            >
              <Mail className="w-5 h-5" />
              Email the Pod
            </a>
          </div>
          <p className="text-slate-300 text-sm">Audit, playbook, and pricing blueprint delivered within 48 hours.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default WebTransparentPricing;
