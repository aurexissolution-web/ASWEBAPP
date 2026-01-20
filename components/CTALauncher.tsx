import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MessageCircle,
  Zap,
  Brain,
  ArrowRight,
  Sparkles,
  PhoneCall,
  Mail,
  LucideIcon
} from 'lucide-react';
import type { ServiceCTAContent } from '../types';

type ServiceCard = {
  id: string;
  title: string;
  metric: string;
  description: string;
  href: string;
  accent: 'cyan' | 'purple' | 'emerald';
  icon: React.ComponentType<{ className?: string; size?: number }>;
};

const ICON_MAP: Record<string, LucideIcon> = {
  MessageCircle,
  Zap,
  Brain,
  Sparkles,
  PhoneCall,
  Mail
};

const SUPPORTED_PRICING_ROUTES = new Set([
  '/pricing/ai',
  '/app-development',
  '/cloud-solutions',
  '/data-analysis',
  '/web-development'
]);

const PRICING_REMAPS: { test: RegExp; target: string }[] = [
  { test: /^\/pricing\/web/i, target: '/web-development' },
  { test: /^\/pricing\/data/i, target: '/data-analysis' },
  { test: /^\/pricing\/cloud/i, target: '/cloud-solutions' },
  { test: /^\/pricing\/app/i, target: '/app-development' },
  { test: /^\/pricing\/ai/i, target: '/pricing/ai' }
];

const resolvePricingLink = (href?: string) => {
  if (!href) return '/pricing/ai';
  if (SUPPORTED_PRICING_ROUTES.has(href)) return href;

  for (const { test, target } of PRICING_REMAPS) {
    if (test.test(href)) return target;
  }

  if (href.startsWith('/pricing/')) return '/pricing/ai';
  return href;
};

const defaultCTAContent: ServiceCTAContent = {
  eyebrow: 'AI Automation',
  title: 'Ready to Automate Your Business?',
  subtitle: 'Pick your service → get an instant pricing experience tailored to AI automation outcomes.',
  cards: [
    {
      title: 'Chatbots',
      metric: '24/7 Lead Recovery',
      description: 'Conversational agents that qualify leads, book demos, and handle support without human lag.',
      href: '/pricing/ai',
      accent: 'cyan',
      icon: 'MessageCircle',
      buttonLabel: 'View Pricing'
    },
    {
      title: 'Process Automation',
      metric: '80% Time Saved',
      description: 'Workflow orchestration that eliminates repetitive back-office work across your stack.',
      href: '/pricing/ai',
      accent: 'purple',
      icon: 'Zap',
      buttonLabel: 'View Pricing'
    },
    {
      title: 'Custom AI',
      metric: '3x Prediction Power',
      description: 'Domain-trained copilots and intelligence layers tuned to your proprietary data.',
      href: '/pricing/ai',
      accent: 'emerald',
      icon: 'Brain',
      buttonLabel: 'View Pricing'
    }
  ],
  banner: {
    eyebrow: 'Free 30min Audit',
    heading: 'Spin up a roadmap with our AI architects.',
    body: 'Zero obligation. We ship an actionable automation brief in under 48 hours.',
    primaryLabel: 'WhatsApp Team',
    primaryLink: 'https://wa.me/60164071129?text=Hi%20Aurexis%20Solution%20-%20Book%20my%20AI%20audit',
    secondaryLabel: 'Email the Architects',
    secondaryLink: 'mailto:aurexissolution@gmail.com?subject=AI%20Automation%20Audit'
  }
};

const accentStyles: Record<ServiceCard['accent'], { ring: string; glow: string; gradient: string; icon: string; pill: string; button: string; metric: string }> = {
  cyan: {
    ring: 'border-cyan-200 dark:border-cyan-400/40',
    glow: 'shadow-[0_25px_80px_rgba(14,165,233,0.18)] dark:shadow-[0_25px_80px_rgba(6,182,212,0.25)]',
    gradient: 'from-cyan-200/70 via-blue-200/60 to-indigo-200/60 dark:from-cyan-500/80 dark:via-blue-500/60 dark:to-indigo-500/70',
    icon: 'text-cyan-500 dark:text-cyan-200',
    pill: 'bg-cyan-100 text-cyan-700 dark:bg-white/10 dark:text-slate-300',
    button: 'from-cyan-500 to-blue-500',
    metric: 'text-cyan-600 dark:text-white'
  },
  purple: {
    ring: 'border-purple-200 dark:border-purple-400/40',
    glow: 'shadow-[0_25px_80px_rgba(139,92,246,0.18)] dark:shadow-[0_25px_80px_rgba(139,92,246,0.25)]',
    gradient: 'from-violet-200/70 via-purple-200/60 to-fuchsia-200/60 dark:from-violet-500/80 dark:via-purple-500/60 dark:to-fuchsia-500/70',
    icon: 'text-purple-500 dark:text-purple-200',
    pill: 'bg-purple-100 text-purple-700 dark:bg-white/10 dark:text-slate-300',
    button: 'from-purple-500 to-indigo-500',
    metric: 'text-purple-600 dark:text-white'
  },
  emerald: {
    ring: 'border-emerald-200 dark:border-emerald-400/40',
    glow: 'shadow-[0_25px_80px_rgba(16,185,129,0.18)] dark:shadow-[0_25px_80px_rgba(16,185,129,0.25)]',
    gradient: 'from-emerald-200/70 via-teal-200/60 to-cyan-200/60 dark:from-emerald-500/80 dark:via-teal-500/60 dark:to-cyan-500/70',
    icon: 'text-emerald-500 dark:text-emerald-200',
    pill: 'bg-emerald-100 text-emerald-700 dark:bg-white/10 dark:text-slate-300',
    button: 'from-emerald-500 to-teal-500',
    metric: 'text-emerald-600 dark:text-white'
  }
};

interface CTALauncherProps {
  content?: ServiceCTAContent;
}

const CTALauncher: React.FC<CTALauncherProps> = ({ content }) => {
  const navigate = useNavigate();
  const data = content && (content.cards?.length || content.banner) ? content : defaultCTAContent;
  const cards =
    data.cards && data.cards.length
      ? data.cards
      : defaultCTAContent.cards;
  const banner = data.banner ?? defaultCTAContent.banner;

  return (
    <section className="relative py-24 sm:py-28 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-900 dark:text-white dark:bg-[#030712] dark:bg-none">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.25),transparent_55%)] opacity-40 dark:hidden" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(109,40,217,0.2),transparent_55%)] opacity-40 dark:hidden" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay dark:hidden" />
        <div className="absolute inset-0 hidden dark:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.25),transparent_60%)] opacity-30" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(59,7,100,0.35),transparent_60%)] opacity-40" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay" />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="text-center space-y-5"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-slate-200 bg-white text-xs tracking-[0.35em] uppercase text-slate-500 dark:border-white/20 dark:bg-white/5 dark:text-cyan-200">
            <Sparkles className="w-4 h-4 text-blue-500 dark:text-cyan-300" />
            {data.eyebrow ?? defaultCTAContent.eyebrow}
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight dark:text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-500 to-indigo-600">
              {data.title ?? defaultCTAContent.title}
            </span>
          </h2>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto dark:text-slate-300">
            {data.subtitle ?? defaultCTAContent.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {cards.map((card, index) => {
            const Icon =
              (card.icon && ICON_MAP[card.icon]) ||
              ICON_MAP.Sparkles ||
              MessageCircle;
            const accent = accentStyles[card.accent];
            return (
              <motion.article
                key={`${card.title}-${index}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className={`relative group rounded-3xl border bg-white shadow-[0_25px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl p-8 flex flex-col gap-6 overflow-hidden transition-transform duration-500 hover:-translate-y-2 ${accent.ring} ${accent.glow} dark:bg-white/5 dark:shadow-none`}
              >
                <div className={`absolute -inset-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${accent.gradient} blur-3xl`} />
                <div className="relative flex items-center justify-between">
                  <div className="space-y-2">
                    <p className={`text-xs font-semibold tracking-[0.35em] uppercase ${accent.pill}`}>AI SERVICE</p>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{card.title}</h3>
                  </div>
                  <div className={`w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center ${accent.icon} dark:bg-white/10 dark:border-white/15`}>
                    <Icon className="w-7 h-7" />
                  </div>
                </div>
                <div className="relative">
                  <p className="text-base text-slate-600 leading-relaxed dark:text-slate-300">{card.description}</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-cyan-200">
                    <span className={`text-[32px] font-bold ${accent.metric}`}>{card.metric}</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate(resolvePricingLink(card.href))}
                  className={`relative inline-flex items-center justify-between rounded-2xl border border-slate-200 bg-gradient-to-r ${accent.button} px-6 py-3 font-semibold text-white transition-all duration-300 hover:pl-7 group shadow-[0_20px_40px_rgba(59,130,246,0.25)] dark:border-white/20`}
                >
                  {card.buttonLabel ?? 'View Pricing'}
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
          className="rounded-[40px] border border-slate-200 bg-white/95 shadow-[0_40px_120px_rgba(15,23,42,0.1)] backdrop-blur-2xl p-8 sm:p-10 flex flex-col gap-6 text-center dark:border-white/10 dark:bg-gradient-to-br dark:from-[#040814] dark:via-[#060b1c] dark:to-[#02050d] dark:shadow-[0_35px_100px_rgba(2,6,23,0.85)]"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-blue-500 dark:text-cyan-200">{banner.eyebrow}</p>
          <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">{banner.heading}</h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={banner.primaryLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-3 rounded-full px-8 py-3 bg-gradient-to-r from-emerald-400 to-emerald-600 text-white font-semibold shadow-[0_20px_45px_rgba(16,185,129,0.35)] transition-transform duration-300 hover:scale-[1.03] dark:shadow-[0_20px_45px_rgba(16,185,129,0.25)]"
            >
              <PhoneCall className="w-5 h-5" />
              {banner.primaryLabel}
            </a>
            {banner.secondaryLabel && banner.secondaryLink && (
              <a
                href={banner.secondaryLink}
                className="flex items-center justify-center gap-3 rounded-full px-8 py-3 bg-white text-slate-900 font-semibold border border-slate-200 shadow hover:scale-[1.02] transition-transform duration-300 dark:bg-gradient-to-r dark:from-cyan-400 dark:to-blue-600 dark:text-white dark:border-white/15 dark:shadow-[0_20px_45px_rgba(59,130,246,0.25)]"
              >
                <Mail className="w-5 h-5" />
                {banner.secondaryLabel}
              </a>
            )}
          </div>
          <p className="text-slate-500 text-sm dark:text-slate-300">{banner.body}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTALauncher;

