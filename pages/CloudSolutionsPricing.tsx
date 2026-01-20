import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import {
  Sparkles,
  Shield,
  Gauge,
  Layers,
  Cloud,
  Rocket,
  Workflow,
  BarChart3,
  ChevronRight,
  ShieldCheck,
  MessageSquare,
  Zap,
  Link2,
  CheckCircle2
} from 'lucide-react';

const heroBadges = ['AWS landing zones', 'GCP pods', 'Firebase managed', 'Shopee connectors', 'Zero-trust guardrails'];

const cloudInsights = [
  {
    title: 'Data residency reality',
    highlight: '3× MY AZ coverage',
    body: 'PDPA + Bank Negara guidance now expects triple availability zones with documented failover rehearsals.'
  },
  {
    title: 'Evidence burden',
    highlight: '87 SOC2 artifacts',
    body: 'Every microservice change needs change-logs, Terraform diffs, and Firebase rule proofs linked to control IDs.'
  },
  {
    title: 'Commerce latency',
    highlight: '55ms Shopee edge',
    body: 'Marketplace buyers churn after 80ms. We pre-warm Lambdas and CDN edges for each mega-sale window.'
  }
];

const cloudFacts = [
  'Idle staging clusters average RM18k/yr waste—FinOps bots pause them nightly.',
  'Zero-downtime migrations demand a signed rollback script and blue/green rehearsal recording.',
  'HubSpot ↔ Shopee connectors must keep audit logs for 90 days to satisfy PDPA breach rules.'
];

const heroMetrics = [
  { label: 'RM12k/mo', sub: 'Cloud pod retainer', target: 12, formatter: (value: number) => `RM ${Math.round(value)}k/mo` },
  { label: '98.9% Uptime', sub: 'Managed SLOs', target: 98.9, formatter: (value: number) => `${value.toFixed(1)}% uptime` },
  { label: '40+ Blueprints', sub: 'AWS • GCP • Firebase', target: 40, formatter: (value: number) => `${Math.round(value)}+ blueprints` },
  { label: 'SOC2-Ready', sub: 'Compliance pods' },
  { label: 'Compliance Pods', sub: 'QA + audit toolkit' },
  { label: 'Live Integrations', sub: 'AWS • GCP • Firebase • Shopee' }
];

const featureCards = [
  {
    eyebrow: 'AI-Optimized Infra',
    title: 'Predictive scaling lanes',
    copy: 'FinOps AI tunes workloads, Firebase scale kits, and GA4 dashboards for live command.',
    icons: [Sparkles, Gauge, BarChart3],
    chips: ['Autoscale', 'FinOps', 'GA4']
  },
  {
    eyebrow: 'Pre-Built Clusters',
    title: 'Firebase + Kubernetes pods',
    copy: 'Blueprints wire auth, managed DBs, and GCP pods with Malaysian runbooks.',
    icons: [Cloud, Layers, MessageSquare],
    chips: ['Firebase auth', 'GCP pods', 'Managed DBs']
  },
  {
    eyebrow: 'SOC2 Templates',
    title: 'Compliance automation',
    copy: 'Zero-trust guardrails, audit artifacts, and Shopee-ready connectors.',
    icons: [ShieldCheck, Shield, Workflow],
    chips: ['Zero-trust', 'Audit docs', 'Chaos drills']
  }
];

const pricingTiers = [
  {
    name: 'Launch Pad',
    price: 4999,
    description: 'Deploy cloud in 30 days with Malaysian pods and live dashboards.',
    bullets: ['AWS / GCP basics', 'Firebase scaling kits', 'CI/CD pipelines', 'Basic monitoring', 'Malaysian edge zones'],
    cta: 'https://calendly.com/admin-aurexissolution/30min?month=2026-01',
    signal: 'Best for MVPs'
  },
  {
    name: 'Growth Ops',
    price: 8000,
    description: 'Multi-cloud orchestration plus analytics, FinOps, and compliance.',
    bullets: ['Hybrid AWS / GCP / Firebase', 'Dashboards (CloudWatch + GA4)', 'Auto-scaling rituals', 'Cost optimization playbooks', 'VPC peering'],
    recommended: true,
    cta: 'https://calendly.com/admin-aurexissolution/30min?month=2026-01',
    signal: 'Most picked'
  },
  {
    name: 'Enterprise Velocity',
    price: 15000,
    suffix: '+',
    description: 'Custom infra, zero-trust guardrails, and multi-region DR.',
    bullets: ['Private clouds', 'Kubernetes + Helm', 'SOC2 audits', 'Multi-region DR', 'ERP / CRM integrations'],
    cta: 'https://calendly.com/admin-aurexissolution/30min?month=2026-01',
    signal: 'Governed industries'
  }
];

const faqItems = [
  {
    question: 'How fast do we deploy the first cloud cluster?',
    answer: 'Most Malaysian SMEs go live in 27 days. Week 1 maps landing zones, weeks 2-3 wire infra + security, week 4 handles QA, cutover, and dashboards.'
  },
  {
    question: 'What about data security?',
    answer: 'Pods operate on SOC2-ready infrastructure with zero-trust templates, private repos, VPN access, and automated compliance snapshots.'
  },
  {
    question: 'Can we integrate HubSpot, ERP, or Shopee data?',
    answer: 'Yes. We ship managed connectors for HubSpot, Shopee, Lazada, SAP/Oracle ERPs, and custom REST/GraphQL adapters.'
  }
];

const metricBubbles = [
  { label: 'Leads / week', value: '62', context: 'Lead velocity pods rebuilt Shopee+HubSpot sync for 62 qualified demos weekly.' },
  { label: 'Efficiency', value: '3.4×', context: 'Ops team ship 3.4x more releases using shared Terraform kits + Firebase lanes.' },
  { label: 'Uptime gains', value: '+48%', context: 'Chaos drills and blue/green cutovers bumped SLOs by 48% YoY.' },
  { label: 'Payback', value: '<6 weeks', context: 'FinOps savings + automation offsets retainers in under 6 weeks.' }
];

const footerIntegrations = [
  { icon: Workflow, label: 'WhatsApp ↔ HubSpot', value: 'Playbooks synced to pods' },
  { icon: Gauge, label: 'Playbook cadence', value: 'RM 12k / month pods' },
  { icon: Link2, label: 'Atlas integrations', value: 'AWS • GCP • Firebase • Shopee' },
  { icon: ShieldCheck, label: 'Compliance guardrails', value: 'SOC2 + ISO templates' }
];

const sliderClass =
  'w-full accent-cyan-500 dark:accent-cyan-300 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-500 [&::-webkit-slider-thumb]:shadow-[0_0_18px_rgba(34,211,238,0.4)] h-1 rounded-full bg-slate-200 dark:bg-white/10';

const useCountUp = (target?: number, active?: boolean) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (typeof target !== 'number' || !active) return;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate: (latest) => setValue(latest)
    });
    return () => controls.stop();
  }, [target, active]);
  return typeof target === 'number' ? value : undefined;
};

const MetricPill: React.FC<{ metric: (typeof heroMetrics)[number]; index: number }> = ({ metric, index }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const animatedValue = useCountUp(metric.target, inView);
  const text =
    typeof metric.target === 'number' && typeof animatedValue === 'number'
      ? metric.formatter
        ? metric.formatter(animatedValue)
        : `${Math.round(animatedValue)}`
      : metric.label;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={`rounded-2xl border p-4 ${
        index === 0
          ? 'bg-gradient-to-r from-emerald-200 via-cyan-100 to-blue-100 text-slate-900 border-transparent shadow-[0_20px_60px_rgba(6,182,212,0.2)] dark:from-emerald-300/30 dark:via-cyan-300/20 dark:to-blue-400/25 dark:border-white/15 dark:shadow-[0_20px_60px_rgba(6,182,212,0.35)]'
          : 'bg-white text-slate-800 border-slate-200 dark:bg-white/5 dark:text-white dark:border-white/15'
      }`}
    >
      <p className="text-xl font-black">{text}</p>
      <p className={`text-[10px] uppercase tracking-[0.4em] mt-2 ${index === 0 ? 'text-slate-700 dark:text-slate-900/70' : 'text-slate-500 dark:text-white/55'}`}>{metric.sub}</p>
    </motion.div>
  );
};

const AnimatedPrice: React.FC<{ amount: number; suffix?: string }> = ({ amount, suffix }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const animatedValue = useCountUp(amount, inView);
  const display = animatedValue ?? amount;

  return (
    <div ref={ref}>
      <p className="text-4xl md:text-5xl font-black text-slate-900 drop-shadow-[0_20px_60px_rgba(6,182,212,0.2)] dark:text-white dark:drop-shadow-[0_20px_60px_rgba(6,182,212,0.35)]">
        RM {Math.round(display).toLocaleString()}
        {suffix}
      </p>
      <p className="text-xs uppercase tracking-[0.45em] text-slate-500 mt-2 dark:text-white/60">per month</p>
    </div>
  );
};

const CloudSolutionsPricing: React.FC = () => {
  const [cloudCost, setCloudCost] = useState(90000);
  const [appsScaled, setAppsScaled] = useState(14);
  const [downtimeSaved, setDowntimeSaved] = useState(42);
  const [activeMetric, setActiveMetric] = useState(0);
  const [activePlan, setActivePlan] = useState(1);

  const projections = useMemo(() => {
    const savings = cloudCost * 0.45;
    const appsValue = appsScaled * 8500;
    const downtimeValue = downtimeSaved * 1400;
    const projected = savings + appsValue + downtimeValue;
    const roi = ((projected - 4999) / 4999) * 100;
    return { savings, appsValue, downtimeValue, projected, roi };
  }, [cloudCost, appsScaled, downtimeSaved]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-cyan-50 text-slate-900 transition-colors dark:from-[#040a1f] dark:via-[#0a1330] dark:to-[#151b3d] dark:text-white">
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="cloud-grid" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(45,212,191,0.25)" />
              <stop offset="100%" stopColor="rgba(14,165,233,0.25)" />
            </linearGradient>
          </defs>
          {[...Array(24)].map((_, idx) => (
            <line key={`grid-${idx}`} x1="0" y1={idx * 60} x2="100%" y2={idx * 60} stroke="url(#cloud-grid)" strokeWidth="0.5" />
          ))}
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0.4, scale: 0.8 }}
        animate={{ opacity: [0.4, 0.9, 0.4], scale: [0.8, 1.05, 0.8] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        className="absolute -top-24 right-10 h-64 w-64 rounded-full bg-cyan-500/30 blur-[140px]"
      />
      <motion.div
        initial={{ opacity: 0.35, scale: 0.8 }}
        animate={{ opacity: [0.35, 0.8, 0.35], scale: [0.8, 1.1, 0.8] }}
        transition={{ duration: 9, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-indigo-500/30 blur-[160px]"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 pt-28 pb-16 space-y-24">
        {/* Hero */}
        <section className="space-y-12">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-8">
              <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-emerald-200 bg-emerald-50 text-xs tracking-[0.45em] uppercase text-emerald-700 dark:border-white/20 dark:bg-white/5 dark:text-emerald-200">
                <Sparkles size={16} /> Cloud Pod
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-500 drop-shadow-[0_30px_70px_rgba(6,182,212,0.2)] dark:from-cyan-200 dark:via-white dark:to-sky-200 dark:drop-shadow-[0_30px_70px_rgba(6,182,212,0.35)]">
                Spin Up Your Cloud Pod
                <br /> with Aurexis Solution workflows
              </h1>
              <p className="text-lg text-slate-600 dark:text-white/75 max-w-2xl">
                Deploy compliant cloud infra with live dashboards, Malaysian timezones, and Shopee-ready connectors that mirror the magnetic AI/App pricing experience.
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
                  className="px-8 py-4 rounded-full border border-slate-300 text-slate-700 font-semibold shadow-[0_0_25px_rgba(59,130,246,0.15)] hover:bg-slate-100 transition dark:border-white/30 dark:text-white dark:shadow-[0_0_25px_rgba(59,130,246,0.25)] dark:hover:bg-white/10"
                >
                  Download PDF
                </a>
              </div>
              <div className="flex flex-wrap gap-3">
                {heroBadges.map((chip) => (
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-[#07142a] via-[#0a1b35] to-[#102948] p-5 shadow-[0_18px_70px_rgba(6,148,162,0.3)]"
            >
              <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle at 10% 0%, rgba(34,197,94,0.3), transparent 45%), radial-gradient(circle at 90% 20%, rgba(59,130,246,0.25), transparent 55%)' }} />
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.55em] text-emerald-200">Cloud brief</p>
                    <h3 className="text-xl font-black text-white">Must-know truths for Malaysian infra</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full border border-cyan-300/40 flex items-center justify-center text-white bg-white/5">
                    <Rocket size={18} />
                  </div>
                </div>
                <div className="space-y-3">
                  {cloudInsights.map((intel) => (
                    <div key={intel.title} className="rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm dark:border-white/12 dark:bg-white/5">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{intel.title}</p>
                        <span className="text-[10px] uppercase tracking-[0.35em] text-emerald-600 dark:text-emerald-200">{intel.highlight}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 dark:text-white/70">{intel.body}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-3 space-y-2 text-xs text-slate-600 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white/70">
                  {cloudFacts.map((fact) => (
                    <div key={fact} className="flex items-start gap-2">
                      <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-emerald-400 dark:bg-emerald-300" />
                      <p className="text-slate-600 dark:text-white/70">{fact}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15 } } }}
            className="grid gap-6 md:grid-cols-3"
          >
            {featureCards.map((card) => (
              <motion.div
                key={card.title}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="rounded-[32px] border border-slate-200 bg-gradient-to-br from-white via-emerald-50 to-cyan-50 p-6 text-slate-900 hover:-translate-y-2 transition-transform shadow-[0_20px_80px_rgba(15,118,110,0.15)] dark:border-white/10 dark:bg-gradient-to-br dark:from-white/5 dark:to-transparent dark:text-white dark:shadow-[0_20px_80px_rgba(15,118,110,0.25)]"
              >
                <p className="text-[11px] uppercase tracking-[0.45em] text-emerald-700 dark:text-white/60">{card.eyebrow}</p>
                <h3 className="text-2xl font-black mt-2 text-slate-900 dark:text-white">{card.title}</h3>
                <p className="text-slate-600 text-sm mt-2 dark:text-white/75">{card.copy}</p>
                <div className="flex items-center gap-3 mt-4">
                  {card.icons.map((Icon, idx) => (
                    <span key={`${card.title}-icon-${idx}`} className="h-10 w-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-emerald-600 shadow-sm dark:bg-white/10 dark:border-white/15 dark:text-white/80">
                      <Icon size={18} />
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mt-4 text-[11px] uppercase tracking-[0.35em] text-slate-500 dark:text-white/70">
                  {card.chips.map((chip) => (
                    <span key={chip} className="px-3 py-1 rounded-full border border-slate-200 dark:border-white/20">
                      {chip}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Metrics */}
        <section className="space-y-6">
          <div className="flex flex-wrap gap-4 rounded-[32px] border border-slate-200 bg-white/90 p-4 shadow-lg dark:border-white/10 dark:bg-white/5">
            {metricBubbles.map((metric, index) => (
              <motion.button
                key={metric.label}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => setActiveMetric(index)}
                onFocus={() => setActiveMetric(index)}
                className={`flex-1 min-w-[150px] rounded-[26px] px-4 py-3 border transition ${
                  activeMetric === index
                    ? 'bg-gradient-to-br from-emerald-50 to-white text-slate-900 border-emerald-100 shadow-[0_15px_40px_rgba(15,118,110,0.2)] dark:bg-white dark:text-slate-900'
                    : 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-white/20 dark:text-white dark:border-white/30'
                }`}
              >
                <p className="text-[11px] uppercase tracking-[0.4em]">{metric.label}</p>
                <p className="text-2xl font-black mt-1">{metric.value}</p>
              </motion.button>
            ))}
          </div>
          <motion.div
            key={activeMetric}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-[28px] border border-slate-200 bg-white p-6 text-slate-600 text-sm shadow-lg dark:border-white/10 dark:bg-white/10 dark:text-white/80"
          >
            {metricBubbles[activeMetric]?.context}
          </motion.div>
        </section>

        {/* Pricing */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <p className="text-xs uppercase tracking-[0.5em] text-emerald-600 dark:text-emerald-200">Transparent pricing</p>
            <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-sky-500 drop-shadow-[0_20px_70px_rgba(6,182,212,0.2)] dark:from-cyan-200 dark:via-white dark:to-sky-300">
              Transparent plans for Cloud Execution
            </h2>
            <p className="text-slate-600 text-base dark:text-white/70">Switch anytime, Malaysian support, compliant results.</p>
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid gap-6 lg:grid-cols-3"
          >
            {pricingTiers.map((tier, index) => {
              const active = activePlan === index;
              return (
                <motion.article
                  key={tier.name}
                  variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
                  whileHover={{ scale: 1.02 }}
                  onMouseEnter={() => setActivePlan(index)}
                  onFocus={() => setActivePlan(index)}
                  tabIndex={0}
                  className={`relative rounded-[34px] border p-7 flex flex-col gap-5 backdrop-blur-xl transition ${
                    active
                      ? 'bg-gradient-to-br from-emerald-50 via-cyan-50 to-white text-slate-900 border-emerald-100 shadow-[0_45px_120px_rgba(14,165,233,0.25)] dark:from-emerald-300/30 dark:via-cyan-300/20 dark:to-indigo-300/20 dark:text-white dark:border-white/40 dark:shadow-[0_45px_140px_rgba(14,165,233,0.45)]'
                      : 'bg-white text-slate-900 border-slate-200 dark:bg-white/5 dark:text-white dark:border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.45em] text-slate-500 dark:text-white/70">{tier.name}</p>
                      <AnimatedPrice amount={tier.price} suffix={tier.suffix} />
                    </div>
                    {tier.signal && (
                      <span className="px-3 py-1 rounded-full border border-emerald-200 text-[10px] uppercase tracking-[0.35em] text-emerald-700 dark:border-white/20 dark:text-white/80">
                        {tier.signal}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 text-base leading-relaxed dark:text-white/80">{tier.description}</p>
                  <ul className="space-y-3 text-sm text-slate-700 dark:text-white/85">
                    {tier.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-center gap-3">
                        <CheckCircle2 className="text-emerald-500 dark:text-emerald-300" size={18} />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.35em] text-slate-500 dark:text-white/60">
                    {['Switch anytime', 'Local support', 'Weekly reports'].map((chip) => (
                      <span
                        key={`${tier.name}-${chip}`}
                        className={`px-3 py-1 rounded-full border ${
                          active ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-white/40 dark:bg-white/10 dark:text-white' : 'border-slate-200 text-slate-500 dark:border-white/15 dark:text-white/70'
                        }`}
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                  <a
                    href={tier.cta}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-auto inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 bg-gradient-to-r from-emerald-300 via-cyan-300 to-sky-400 text-slate-900 font-semibold shadow-[0_15px_45px_rgba(6,182,212,0.45)] hover:translate-y-[-2px] transition-transform"
                  >
                    Book This Plan <ChevronRight size={18} />
                  </a>
                </motion.article>
              );
            })}
          </motion.div>
          <motion.div
            key={activePlan}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[28px] border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-lg dark:border-white/10 dark:bg-white/5 dark:text-white/80"
          >
            <p className="text-xs uppercase tracking-[0.45em] text-slate-500 dark:text-white/60">Plan intel</p>
            <p className="text-lg font-semibold mt-2">{pricingTiers[activePlan].name}</p>
            <p className="mt-2">{pricingTiers[activePlan].description}</p>
            <p className="mt-4 text-xs uppercase tracking-[0.45em] text-slate-500 dark:text-white/60">Best when you need</p>
            <p className="mt-1">
              {activePlan === 0 && 'Fast pod activation, MVP velocity, Malaysian compliance guidance.'}
              {activePlan === 1 && 'Balanced multi-cloud pods with strong FinOps + analytics rituals.'}
              {activePlan === 2 && 'Full zero-trust governance, multi-region DR, and ERP-grade integrations.'}
            </p>
          </motion.div>
        </section>

        {/* ROI */}
        <section className="space-y-10">
          <div className="space-y-3 max-w-3xl">
            <p className="text-xs uppercase tracking-[0.5em] text-slate-500 dark:text-white/60">Your cloud ROI</p>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white">Interactive ROI calculator</h2>
            <p className="text-slate-600 dark:text-white/70">Adjust costs, apps, and downtime to see RM savings for Malaysian SMEs.</p>
          </div>
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-6 rounded-[36px] border border-slate-200 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-white/5">
              {[
                { label: 'Cloud costs saved / year (RM)', value: cloudCost, display: `RM ${cloudCost.toLocaleString()}`, setter: setCloudCost, min: 20000, max: 200000, step: 5000 },
                { label: 'Apps scaled per year', value: appsScaled, display: `${appsScaled} apps`, setter: setAppsScaled, min: 4, max: 40, step: 1 },
                { label: 'Downtime reduced (hrs)', value: downtimeSaved, display: `${downtimeSaved} hrs`, setter: setDowntimeSaved, min: 10, max: 120, step: 5 }
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
                <a href="https://stripe.com/payments" target="_blank" rel="noreferrer" className="px-6 py-3 rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 text-slate-900 font-semibold">
                  Download Report
                </a>
                <a href="https://calendly.com/admin-aurexissolution/30min?month=2026-01" target="_blank" rel="noreferrer" className="px-6 py-3 rounded-full border border-slate-300 text-slate-700 font-semibold dark:border-white/30 dark:text-white">
                  Schedule ROI Call
                </a>
              </div>
            </div>
            <div className="space-y-6 rounded-[36px] border border-slate-200 bg-slate-50 p-8 text-slate-800 shadow-lg dark:border-white/10 dark:bg-black/30 dark:text-white/80">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-slate-500 dark:text-white/60">Projected annual savings</p>
                <p className="text-4xl font-black text-cyan-700 dark:text-cyan-100 mt-2">RM {Math.round(projections.projected).toLocaleString()}</p>
                <p className="text-emerald-600 font-semibold dark:text-emerald-300">ROI {Math.max(0, projections.roi).toFixed(0)}%</p>
              </div>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="rounded-2xl bg-white p-4 text-slate-700 shadow dark:bg-white/5 dark:text-white/80">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-white/60">Cost savings</p>
                  <p className="text-xl font-semibold mt-2 text-slate-900 dark:text-white">RM {Math.round(projections.savings).toLocaleString()}</p>
                </div>
                <div className="rounded-2xl bg-white p-4 text-slate-700 shadow dark:bg-white/5 dark:text-white/80">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-white/60">App value</p>
                  <p className="text-xl font-semibold mt-2 text-slate-900 dark:text-white">RM {Math.round(projections.appsValue).toLocaleString()}</p>
                </div>
                <div className="rounded-2xl bg-white p-4 text-slate-700 shadow dark:bg-white/5 dark:text-white/80">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-white/60">Downtime saved</p>
                  <p className="text-xl font-semibold mt-2 text-slate-900 dark:text-white">RM {Math.round(projections.downtimeValue).toLocaleString()}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-2xl bg-white p-4 text-slate-700 shadow dark:bg-white/5 dark:text-white/80">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-white/60">Apps scaled</p>
                  <p className="text-xl font-semibold mt-2 text-slate-900 dark:text-white">{appsScaled}/yr</p>
                </div>
                <div className="rounded-2xl bg-white p-4 text-slate-700 shadow dark:bg-white/5 dark:text-white/80">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-white/60">Downtime reduced</p>
                  <p className="text-xl font-semibold mt-2 text-slate-900 dark:text-white">{downtimeSaved} hrs</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-6">
          <div className="text-center space-y-4">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500 dark:text-white/60">Frequently Asked Questions</p>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white">Cloud clarity for Malaysian SMEs</h2>
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
        <section className="relative overflow-hidden rounded-[40px] border border-slate-200 bg-gradient-to-br from-white via-emerald-50 to-cyan-50 p-10 space-y-8 shadow-xl dark:border-white/10 dark:bg-gradient-to-br dark:from-indigo-900/50 dark:via-slate-900/60 dark:to-slate-950">
          <div className="flex flex-col lg:flex-row justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <p className="text-xs uppercase tracking-[0.4em] text-slate-500 dark:text-white/60">Magnetic Cloud Hero</p>
              <h2 className="text-4xl font-black leading-tight text-slate-900 dark:text-white">Route WhatsApp + HubSpot signals into Atlas cloud pods</h2>
              <p className="text-slate-600 dark:text-white/75">
                Malaysian pods orchestrate copy, design, infra, and compliance with the same sprint rituals we run for automation. Dashboards, integration maps, and guardrails included.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="https://calendly.com/admin-aurexissolution/30min?month=2026-01" target="_blank" rel="noreferrer" className="px-8 py-4 rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 text-slate-900 font-semibold inline-flex items-center gap-2 shadow-lg">
                  Book Demo <ChevronRight size={18} />
                </a>
                <a href="https://stripe.com/payments" target="_blank" rel="noreferrer" className="px-8 py-4 rounded-full border border-slate-300 text-slate-700 font-semibold inline-flex items-center gap-2 dark:border-white/30 dark:text-white">
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

export default CloudSolutionsPricing;
