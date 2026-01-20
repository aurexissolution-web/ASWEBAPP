import React, { useEffect, useMemo, useRef, useState } from 'react';
import { animate, motion, useInView } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
  Sparkles,
  Shield,
  Gauge,
  Layers,
  Smartphone,
  Rocket,
  Workflow,
  Zap,
  Code,
  MessageSquare,
  BarChart3,
  ChevronRight,
  ServerCog,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

type PricingTierCard = {
  name: string;
  priceLabel: string;
  priceValue: number;
  priceSuffix?: string;
  description: string;
  bullets: string[];
  cta: string;
  gradientLight: string;
  gradientDark: string;
  recommended?: boolean;
};

const tierData: PricingTierCard[] = [
  {
    name: 'Launch Pad',
    priceLabel: 'RM 4,999',
    priceValue: 4999,
    description: 'Deploy app in 30 days with Malaysian sprint pods.',
    bullets: ['React Native MVP', 'Firebase auth & backend', 'CI/CD pipelines', 'Shopee API starter', 'WhatsApp notifications'],
    cta: 'https://calendly.com/admin-aurexissolution/30min?month=2026-01',
    gradientLight: 'from-white via-emerald-50 to-cyan-50',
    gradientDark: 'dark:from-[#032420] dark:via-[#072c3a] dark:to-[#020f1a]'
  },
  {
    name: 'Growth Ops',
    priceLabel: 'RM 8,000',
    priceValue: 8000,
    description: 'Multi-platform iOS, Android, and Web orchestrated pods.',
    bullets: [
      'Flutter cross-platform',
      'Analytics dashboards (Firebase GA4)',
      'A/B testing rituals',
      'Lazada integrations',
      'Push notifications & Crashlytics'
    ],
    cta: 'https://calendly.com/admin-aurexissolution/30min?month=2026-01',
    recommended: true,
    gradientLight: 'from-white via-violet-50 to-indigo-50',
    gradientDark: 'dark:from-[#1a1036] dark:via-[#221148] dark:to-[#090717]'
  },
  {
    name: 'Enterprise Velocity',
    priceLabel: 'RM 15,000',
    priceValue: 15000,
    priceSuffix: '+',
    description: 'Custom integrations and enterprise scaling guardrails.',
    bullets: ['PWAs + native hybrids', 'Custom APIs (HubSpot/CRM/ERP)', 'Enterprise auth (SSO)', 'Private cloud deploys', 'SOC2 audits'],
    cta: 'https://calendly.com/admin-aurexissolution/30min?month=2026-01',
    gradientLight: 'from-white via-amber-50 to-rose-50',
    gradientDark: 'dark:from-[#2e0d15] dark:via-[#3c151d] dark:to-[#140407]'
  }
];

type HeroMetric = {
  heading: string;
  subheading: string;
  countTarget?: number;
  formatter?: (value: number) => string;
};

const heroMetricBlocks: HeroMetric[] = [
  {
    heading: 'RM12k/mo',
    subheading: 'Pod retainer',
    countTarget: 12,
    formatter: (value) => `RM ${Math.round(value)}k/mo`
  },
  {
    heading: '98.9% Uptime',
    subheading: 'Managed SLOs',
    countTarget: 98.9,
    formatter: (value) => `${value.toFixed(1)}% Uptime`
  },
  {
    heading: '40+ Blueprints',
    subheading: 'React Native & Flutter',
    countTarget: 40,
    formatter: (value) => `${Math.round(value)}+ Blueprints`
  },
  {
    heading: 'SOC2-Ready',
    subheading: 'Compliance pods'
  },
  {
    heading: 'Compliance Pods',
    subheading: 'QA + audit toolkit'
  },
  {
    heading: 'Live Atlas Integrations',
    subheading: 'Shopee · Firebase · Xero'
  }
];

type HeroFeatureCard = {
  eyebrow: string;
  title: string;
  description: string;
  iconStack: LucideIcon[];
  chips: string[];
  gradientLight: string;
  gradientDark: string;
  accentGradient: string;
};

const heroFeatureCards: HeroFeatureCard[] = [
  {
    eyebrow: 'AI Pilots',
    title: '3 demo-ready pilots',
    description: 'React Native + Flutter builds with WhatsApp + Shopee sandboxes.',
    iconStack: [Sparkles, Smartphone, Workflow],
    chips: ['SMS + WhatsApp', 'Shopee sandbox', 'Firebase auth'],
    gradientLight: 'from-white/95 via-rose-50/90 to-indigo-50/80',
    gradientDark: 'dark:from-[#06142c] dark:via-[#0a1c36] dark:to-[#030712]',
    accentGradient: 'dark:from-emerald-400/40 dark:via-cyan-400/30 dark:to-blue-500/40'
  },
  {
    eyebrow: 'Pre-Built Flows',
    title: 'Managed Firebase pods',
    description: 'Live performance dashboards, crash ops, and Atlas automations baked in.',
    iconStack: [ServerCog, BarChart3, Zap],
    chips: ['Realtime QA', 'Crashlytics', 'Atlas automations'],
    gradientLight: 'from-white/95 via-slate-50/90 to-blue-50/80',
    gradientDark: 'dark:from-[#071127] dark:via-[#0b1935] dark:to-[#040915]',
    accentGradient: 'dark:from-sky-400/30 dark:via-indigo-500/25 dark:to-purple-500/35'
  },
  {
    eyebrow: 'SOC2 Deploy',
    title: 'Compliance toolkit',
    description: 'Guardrails, audit artifacts, and pen-test ready release rituals.',
    iconStack: [ShieldCheck, Shield, Gauge],
    chips: ['SOC2 docs', 'Audit logs', 'Pen-test ready'],
    gradientLight: 'from-white/95 via-amber-50/85 to-rose-50/75',
    gradientDark: 'dark:from-[#120b22] dark:via-[#1b102f] dark:to-[#080613]',
    accentGradient: 'dark:from-amber-400/30 dark:via-orange-400/25 dark:to-rose-500/35'
  }
];

const heroStackChips = ['React Native pods', 'Flutter squads', 'Firebase managed', 'Shopee + Lazada', 'WhatsApp automations'];

const useAnimatedCounter = (target?: number, active?: boolean) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (typeof target !== 'number' || !active) {
      return;
    }
    const controls = animate(0, target, {
      duration: 1.8,
      ease: 'easeOut',
      onUpdate: (latest) => setValue(latest)
    });
    return () => controls.stop();
  }, [target, active]);

  return typeof target === 'number' ? value : undefined;
};

const MetricItem: React.FC<{ metric: HeroMetric; index: number; highlight?: boolean }> = ({ metric, index, highlight }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const animatedValue = useAnimatedCounter(metric.countTarget, isInView);

  const displayText =
    typeof metric.countTarget === 'number' && typeof animatedValue === 'number'
      ? metric.formatter
        ? metric.formatter(animatedValue)
        : `${Math.round(animatedValue)}`
      : metric.heading;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={`rounded-2xl border p-4 ${
        highlight
          ? 'bg-gradient-to-r from-rose-200 via-pink-100 to-amber-100 text-slate-900 border-transparent shadow-[0_20px_60px_rgba(236,72,153,0.25)] dark:from-emerald-300/25 dark:via-cyan-300/20 dark:to-blue-400/25 dark:border-white/15 dark:shadow-[0_20px_60px_rgba(34,211,238,0.35)]'
          : 'bg-white text-slate-800 border-slate-200 dark:bg-white/5 dark:text-white dark:border-white/15'
      }`}
    >
      <p className="text-xl font-black drop-shadow-[0_8px_20px_rgba(236,72,153,0.2)] dark:drop-shadow-[0_8px_20px_rgba(15,118,110,0.35)]">{displayText}</p>
      <p className={`text-[10px] uppercase tracking-[0.4em] mt-2 ${highlight ? 'text-slate-700 dark:text-slate-900/70' : 'text-slate-500 dark:text-white/55'}`}>
        {metric.subheading}
      </p>
    </motion.div>
  );
};

const AnimatedPrice: React.FC<{ amount: number; suffix?: string; index: number }> = ({ amount, suffix, index }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const animatedValue = useAnimatedCounter(amount, isInView);

  const displayAmount = animatedValue ?? amount;

  return (
    <div ref={ref}>
      <p className="text-4xl md:text-5xl font-black text-slate-900 drop-shadow-[0_20px_60px_rgba(236,72,153,0.2)] dark:text-white dark:drop-shadow-[0_20px_60px_rgba(6,182,212,0.35)]">
        RM {Math.round(displayAmount).toLocaleString()}
        {suffix}
      </p>
      <p className="text-xs uppercase tracking-[0.45em] text-slate-500 mt-2 dark:text-white/60">per month</p>
    </div>
  );
};

const metrics = [
  {
    label: 'Leads / week',
    value: '62',
    lightGradient: 'from-white via-emerald-50 to-cyan-50',
    darkGradient: 'dark:from-[#08223d] dark:via-[#092848] dark:to-[#040b18]'
  },
  {
    label: 'Sales speed',
    value: '3.4× faster',
    lightGradient: 'from-white via-indigo-50 to-purple-50',
    darkGradient: 'dark:from-[#120f2c] dark:via-[#1a1540] dark:to-[#080716]'
  },
  {
    label: 'Uptime gains',
    value: '+48%',
    lightGradient: 'from-white via-teal-50 to-emerald-50',
    darkGradient: 'dark:from-[#052a25] dark:via-[#0a3a34] dark:to-[#031713]'
  },
  {
    label: 'Payback',
    value: '<6 weeks',
    lightGradient: 'from-white via-amber-50 to-orange-50',
    darkGradient: 'dark:from-[#321208] dark:via-[#3f1910] dark:to-[#160603]'
  }
];

const faqItems = [
  {
    question: 'How fast can I launch my first app?',
    answer:
      'Most Malaysian SMEs go live in 27 days. Week 1 maps workflows, weeks 2-3 build core experiences, week 4 runs QA, store submission, and analytics wiring.'
  },
  {
    question: 'Does my data stay secure?',
    answer: 'Yes. Pods run on SOC2 infrastructure with private repos, VPN access, and automated compliance snapshots every sprint.'
  },
  {
    question: 'Can I integrate our CRM or marketplaces?',
    answer: 'We ship connectors for HubSpot, Deskera, Shopee, Lazada, WhatsApp Business, and custom REST/GraphQL adapters.'
  }
];

const footerIntegrations = [
  { icon: Workflow, label: 'Atlas workflows', value: 'WhatsApp ↔ HubSpot playbooks' },
  { icon: Gauge, label: 'Playbook cadence', value: 'RM 12k / month pods' },
  { icon: Zap, label: 'Marketplace connectors', value: 'Shopee • Lazada • Stripe' },
  { icon: MessageSquare, label: 'Ops cockpit', value: 'Live performance + QA' }
];

const orbVariants = {
  initial: { opacity: 0.4, scale: 0.8 },
  animate: {
    opacity: [0.4, 0.9, 0.4],
    scale: [0.8, 1.1, 0.8],
    transition: { duration: 8, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
  }
};

const AppDevelopmentPricing: React.FC = () => {
  const [dailyLeads, setDailyLeads] = useState(80);
  const [avgDeal, setAvgDeal] = useState(2200);
  const [hoursSaved, setHoursSaved] = useState(55);

  const projections = useMemo(() => {
    const manualRevenue = dailyLeads * 26 * avgDeal * 0.18;
    const automationRevenue = manualRevenue * 1.55;
    const lift = automationRevenue - manualRevenue;
    const roi = ((lift + hoursSaved * 4 * 65 - 4999) / 4999) * 100;

    return { manualRevenue, automationRevenue, lift, roi };
  }, [dailyLeads, avgDeal, hoursSaved]);

  const sliderClass =
    'w-full accent-cyan-500 dark:accent-cyan-300 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-500 [&::-webkit-slider-thumb]:shadow-[0_0_18px_rgba(34,211,238,0.3)] h-1 rounded-full bg-slate-200 dark:bg-white/10';

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-rose-50 text-slate-900 transition-colors dark:from-[#0a0f2b] dark:via-[#10163a] dark:to-[#1e1e3f] dark:text-white">
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="grid-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(59,130,246,0.2)" />
              <stop offset="100%" stopColor="rgba(6,182,212,0.25)" />
            </linearGradient>
          </defs>
          {[...Array(24)].map((_, idx) => (
            <line key={`grid-${idx}`} x1="0" y1={idx * 60} x2="100%" y2={idx * 60} stroke="url(#grid-stroke)" strokeWidth="0.5" />
          ))}
        </svg>
      </div>

      <motion.div variants={orbVariants} initial="initial" animate="animate" className="absolute -top-24 right-10 h-64 w-64 rounded-full bg-cyan-500/30 blur-[140px]" />
      <motion.div variants={orbVariants} initial="initial" animate="animate" className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-indigo-500/30 blur-[160px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 pt-28 pb-16 space-y-24">
        {/* Hero */}
        <section className="space-y-12">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-8">
              <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-pink-200 bg-pink-50 text-xs tracking-[0.45em] uppercase text-pink-700 dark:border-white/20 dark:bg-white/5 dark:text-rose-200">
                <Sparkles size={16} /> App Pod
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-fuchsia-600 to-indigo-500 drop-shadow-[0_30px_70px_rgba(236,72,153,0.25)] dark:from-cyan-200 dark:via-white dark:to-sky-200 dark:drop-shadow-[0_30px_70px_rgba(6,182,212,0.35)]">
                Spin Up Your App Dev Pod<br /> with Aurexis Solution workflows
              </h1>
              <p className="text-lg text-slate-600 dark:text-white/75 max-w-2xl">
                Deploy quality apps with live performance guarantees, Malaysian timezones, and Shopee-ready launch kits that mirror our AI Automation hero.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://calendly.com/admin-aurexissolution/30min?month=2026-01"
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-emerald-300 via-emerald-400 to-cyan-400 text-slate-900 font-semibold inline-flex items-center gap-2 shadow-[0_20px_60px_rgba(34,197,94,0.5)] hover:translate-y-[-2px] transition-transform"
                >
                  Book Demo <ChevronRight size={18} />
                </a>
                <a
                  href="https://stripe.com/payments"
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-4 rounded-full border border-slate-300 text-slate-700 font-semibold shadow-[0_0_25px_rgba(236,72,153,0.2)] hover:bg-slate-100 transition dark:border-white/25 dark:text-white dark:hover:bg-white/10"
                >
                  Download PDF
                </a>
              </div>
              <div className="flex flex-wrap gap-3">
                {heroStackChips.map((chip) => (
                  <span
                    key={chip}
                    className="px-4 py-1.5 rounded-full border border-slate-200 text-xs uppercase tracking-[0.4em] text-slate-500 dark:border-white/20 dark:text-white/60"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative rounded-[40px] border border-slate-200 bg-gradient-to-br from-white via-rose-50 to-pink-50 p-8 space-y-6 shadow-[0_35px_120px_rgba(236,72,153,0.25)] dark:border-white/15 dark:bg-gradient-to-br dark:from-white/10 dark:via-white/5 dark:to-black/40 dark:shadow-[0_35px_120px_rgba(6,182,212,0.35)]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.45em] text-pink-600 dark:text-white/60">Reliability pod</p>
                  <p className="text-3xl font-black text-slate-900 drop-shadow-[0_12px_30px_rgba(236,72,153,0.3)] dark:text-white">RM 12k / month</p>
                </div>
                <div className="rounded-3xl bg-white border border-pink-100 p-4 text-pink-500 shadow-sm dark:bg-white/10 dark:border-white/15 dark:text-white">
                  <Rocket size={24} />
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed dark:text-white/70">
                Malaysian squads orchestrate React Native, Flutter, Firebase + Shopee flows with compliance-ready Atlas integrations. Zero-popout, full-bleed gloss.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {heroMetricBlocks.map((metric, index) => (
                  <MetricItem key={metric.heading} metric={metric} index={index} highlight={index === 0} />
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15 } }
            }}
            className="grid gap-6 md:grid-cols-3"
          >
            {heroFeatureCards.map((card) => (
              <motion.div
                key={card.title}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className={`rounded-[32px] border p-6 hover:-translate-y-2 transition-transform shadow-[0_20px_80px_rgba(236,72,153,0.2)] bg-gradient-to-br ${card.gradientLight} border-slate-200 text-slate-900 dark:border-white/12 dark:bg-gradient-to-br ${card.gradientDark} dark:text-white`}
              >
                <p className="text-[11px] uppercase tracking-[0.45em] text-rose-500 dark:text-white/60">{card.eyebrow}</p>
                <h3 className="text-2xl font-black mt-2 text-slate-900 dark:text-white">{card.title}</h3>
                <p className="text-slate-600 text-sm mt-2 dark:text-white/75">{card.description}</p>
                <div className="flex items-center gap-3 mt-4">
                  {card.iconStack.map((Icon, idx) => (
                    <span key={`${card.title}-icon-${idx}`} className="h-10 w-10 rounded-2xl bg-white border border-rose-100 flex items-center justify-center text-rose-500 shadow-sm dark:border-white/20 dark:bg-gradient-to-r dark:${card.accentGradient} dark:text-white">
                      <Icon size={18} />
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mt-4 text-[11px] uppercase tracking-[0.35em] text-slate-500 dark:text-white/70">
                  {card.chips.map((chip) => (
                    <span key={chip} className="px-3 py-1 rounded-full border border-slate-200 dark:border-white/25 dark:bg-white/5">
                      {chip}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Metrics */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`rounded-[32px] p-5 border text-center font-bold shadow-[0_20px_60px_rgba(236,72,153,0.2)] bg-gradient-to-br ${metric.lightGradient} text-slate-900 border-slate-200 dark:border-white/15 dark:bg-gradient-to-br dark:${metric.darkGradient} dark:text-white`}
            >
              <p className="text-xs uppercase tracking-[0.4em] text-slate-600 dark:text-white/70">{metric.label}</p>
              <p className="text-3xl mt-2 text-slate-900 dark:text-white">{metric.value}</p>
            </motion.div>
          ))}
        </section>

        {/* Pricing cards */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <p className="text-xs uppercase tracking-[0.5em] text-rose-600 dark:text-emerald-200">Transparent pricing</p>
            <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-fuchsia-500 to-indigo-500 drop-shadow-[0_20px_70px_rgba(236,72,153,0.25)] dark:from-cyan-200 dark:via-white dark:to-sky-300">
              Transparent plans for App Execution
            </h2>
            <p className="text-slate-600 text-base dark:text-white/70">
              Switch plans every invoice, Malaysian support, compliant results.
            </p>
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } }
            }}
            className="grid gap-8 lg:grid-cols-3"
          >
            {tierData.map((tier, index) => (
              <motion.article
                key={tier.name}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', duration: 0.6 }}
                className={`relative rounded-[38px] border p-8 flex flex-col gap-6 shadow_[0_35px_120px_rgba(236,72,153,0.25)] backdrop-blur-xl group bg-gradient-to-br ${tier.gradientLight} text-slate-900 border-slate-200 dark:border-white/10 dark:bg-gradient-to-br ${tier.gradientDark} dark:text-white`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.45em] text-slate-500 dark:text-white/70">{tier.name}</p>
                    <AnimatedPrice amount={tier.priceValue} suffix={tier.priceSuffix} index={index} />
                  </div>
                  {tier.recommended && (
                    <span className="px-3 py-1 rounded-full border border-rose-200 bg-white/70 text-[10px] uppercase tracking-[0.35em] text-rose-600 dark:border-white/20 dark:bg-white/20 dark:text-white">
                      Most picked
                    </span>
                  )}
                </div>
                <p className="text-slate-600 text-base leading-relaxed dark:text-white/80">{tier.description}</p>
                <ul className="space-y-3 text-sm text-slate-700 dark:text-white/85">
                  {tier.bullets.map((bullet) => (
                    <motion.li
                      key={bullet}
                      whileHover={{ x: 6, opacity: 1 }}
                      initial={{ opacity: 0.95 }}
                      transition={{ duration: 0.25 }}
                      className="flex items-center gap-3"
                    >
                      <span className="h-8 w-8 rounded-2xl bg-white border border-emerald-100 flex items-center justify-center text-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)] group-hover:bg-emerald-50 transition dark:bg-white/15 dark:border-white/20 dark:text-emerald-200">
                        <CheckCircle2 size={16} />
                      </span>
                      <span className="text-slate-800 dark:text-white/90">{bullet}</span>
                    </motion.li>
                  ))}
                </ul>
                <a
                  href="https://calendly.com/admin-aurexissolution/30min?month=2026-01"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 bg-gradient-to-r from-emerald-300 via-cyan-300 to-sky-400 text-slate-900 font-semibold shadow-[0_15px_45px_rgba(6,182,212,0.55)] hover:translate-y-[-2px] transition-transform"
                >
                  Book This Plan <ChevronRight size={18} />
                </a>
              </motion.article>
            ))}
          </motion.div>
        </section>

        {/* ROI */}
        <section className="space-y-10">
          <div className="space-y-3 max-w-3xl">
            <p className="text-xs uppercase tracking-[0.5em] text-rose-500 dark:text-white/60">Your revenue lift</p>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white">Interactive ROI calculator</h2>
          </div>
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-6 rounded-[36px] border border-slate-200 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-white/5">
              {[
                { label: 'Daily leads', value: dailyLeads, display: dailyLeads, setter: setDailyLeads, min: 20, max: 240, step: 5 },
                { label: 'Avg deal size (RM)', value: avgDeal, display: `RM ${avgDeal.toLocaleString()}`, setter: setAvgDeal, min: 800, max: 6000, step: 100 },
                { label: 'Hours saved / week', value: hoursSaved, display: `${hoursSaved} hrs`, setter: setHoursSaved, min: 10, max: 150, step: 5 }
              ].map((slider) => (
                <div key={slider.label} className="space-y-2">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.4em] text-slate-500 dark:text-white/60">
                    <span>{slider.label}</span>
                    <span className="text-slate-700 dark:text-white/80">{slider.display}</span>
                  </div>
                  <input type="range" min={slider.min} max={slider.max} step={slider.step} value={slider.value} onChange={(e) => slider.setter(Number(e.target.value))} className={sliderClass} />
                </div>
              ))}
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://stripe.com/payments"
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 text-slate-900 font-semibold"
                >
                  Download Report
                </a>
                <a
                  href="https://calendly.com/aurexis/ROI"
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-full border border-slate-300 text-slate-700 font-semibold dark:border-white/30 dark:text-white"
                >
                  Schedule ROI Call
                </a>
              </div>
            </div>
            <div className="space-y-6 rounded-[36px] border border-slate-200 bg-rose-50 p-8 text-slate-800 shadow-lg dark:border-white/10 dark:bg-black/30 dark:text-white/80">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-rose-500 dark:text-white/60">Monthly revenue with AI</p>
                <p className="text-4xl font-black text-rose-600 dark:text-cyan-100 mt-2">RM {Math.round(projections.automationRevenue).toLocaleString()}</p>
                <p className="text-emerald-600 font-semibold dark:text-emerald-300">+RM {Math.round(projections.lift).toLocaleString()} lift</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-2xl bg-white p-4 text-slate-700 shadow dark:bg-white/5 dark:text-white/80">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-white/60">Manual revenue</p>
                  <p className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">RM {Math.round(projections.manualRevenue).toLocaleString()}</p>
                </div>
                <div className="rounded-2xl bg-white p-4 text-slate-700 shadow dark:bg-white/5 dark:text-white/80">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-white/60">Projected ROI</p>
                  <p className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">{Math.max(0, projections.roi).toFixed(0)}%</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-2xl bg-white p-4 text-slate-700 shadow dark:bg-white/5 dark:text-white/80">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-white/60">Monthly leads</p>
                  <p className="text-xl font-semibold mt-2 text-slate-900 dark:text-white">{(dailyLeads * 26).toLocaleString()}</p>
                </div>
                <div className="rounded-2xl bg-white p-4 text-slate-700 shadow dark:bg-white/5 dark:text-white/80">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-white/60">Hours saved</p>
                  <p className="text-xl font-semibold mt-2 text-slate-900 dark:text-white">{hoursSaved} hrs/week</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-6">
          <div className="text-center space-y-4">
            <p className="text-xs uppercase tracking-[0.4em] text-rose-500 dark:text-white/60">Frequently Asked Questions</p>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white">App dev clarity for Malaysian SMEs</h2>
          </div>
          <div className="space-y-4">
            {faqItems.map((faq) => (
              <motion.details
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group rounded-[32px] border border-slate-200 bg-white p-6 text-slate-800 shadow-md dark:border-white/10 dark:bg-white/5 dark:text-white"
              >
                <summary className="flex items-center justify-between cursor-pointer text-xl font-semibold">
                  {faq.question}
                  <ChevronRight className="transition group-open:rotate-90" />
                </summary>
                <p className="text-slate-600 mt-4 leading-relaxed dark:text-white/75">{faq.answer}</p>
              </motion.details>
            ))}
          </div>
        </section>

        {/* Footer hero */}
        <section className="relative overflow-hidden rounded-[40px] border border-slate-200 bg-gradient-to-br from-white via-rose-50 to-amber-50 p-10 space-y-8 shadow-xl dark:border-white/10 dark:bg-gradient-to-br dark:from-indigo-900/50 dark:via-slate-900/60 dark:to-slate-950">
          <div className="flex flex-col lg:flex-row justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <p className="text-xs uppercase tracking-[0.4em] text-rose-500 dark:text-white/60">Magnetic App Dev Hero</p>
              <h2 className="text-4xl font-black leading-tight text-slate-900 dark:text-white">Route WhatsApp + HubSpot leads into your Atlas playbooks</h2>
              <p className="text-slate-600 dark:text-white/75">
                Malaysian pods orchestrate copy, design, and code with the same sprint rituals we use for AI automation. Replay dashboards, integration maps, and compliance guardrails included.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="https://calendly.com/aurexis/45min" target="_blank" rel="noreferrer" className="px-8 py-4 rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 text-slate-900 font-semibold inline-flex items-center gap-2 shadow-lg">
                  Book Demo <ChevronRight size={18} />
                </a>
                <a
                  href="https://stripe.com/payments"
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-4 rounded-full border border-slate-300 text-slate-700 font-semibold inline-flex items-center gap-2 dark:border-white/30 dark:text-white"
                >
                  Download Playbook
                </a>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-700 dark:text-white/80">
              {footerIntegrations.map(({ icon: Icon, label, value }) => (
                <div key={label} className="rounded-3xl border border-slate-200 bg-white p-4 flex items-center gap-3 shadow-sm dark:border-white/10 dark:bg-white/5">
                  <Icon size={20} />
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-white/60">{label}</p>
                    <p className="font-semibold text-slate-900 dark:text-white">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AppDevelopmentPricing;
