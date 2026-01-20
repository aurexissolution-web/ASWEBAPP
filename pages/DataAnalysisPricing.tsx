import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import {
  Sparkles,
  BarChart3,
  Layers,
  Brain,
  Rocket,
  Workflow,
  ChevronRight,
  ShieldCheck,
  MessageSquare,
  Link2,
  CheckCircle2
} from 'lucide-react';

const BOOKING_LINK = 'https://calendly.com/admin-aurexissolution/30min?month=2026-01';

const heroBadges = ['Power BI', 'Python notebooks', 'Tableau flows', 'Shopee connectors', 'MY compliance'];

const heroMetrics = [
  { label: 'RM12k/mo', sub: 'Data pod retainer', target: 12, formatter: (value: number) => `RM ${Math.round(value)}k/mo` },
  { label: '98.9% Accuracy', sub: 'Data QA rituals', target: 98.9, formatter: (value: number) => `${value.toFixed(1)}% Accuracy` },
  { label: '40+ Viz Kits', sub: 'Power BI • Tableau', target: 40, formatter: (value: number) => `${Math.round(value)}+ Kits` },
  { label: 'GDPR/SOC2 Ready', sub: 'Compliance pods' }
];

const heroCards = [
  {
    eyebrow: 'Power BI Dash',
    title: 'Executive KPIs',
    copy: 'Interactive scorecards with row-level security refreshed every 15 minutes.',
    icon: BarChart3
  },
  {
    eyebrow: 'Python Insights',
    title: 'Pandas + ML lanes',
    copy: 'Notebook factories for churn, attribution, and demand forecasting.',
    icon: Brain
  },
  {
    eyebrow: 'Tableau Flows',
    title: 'Shopee + CRM blends',
    copy: 'Automated flows that clean, join, and push viz-ready datasets nightly.',
    icon: Layers
  }
];

const pricingTiers = [
  {
    name: 'Launch Pad',
    price: 4999,
    description: 'Dashboard in 30 days with KPI clarity, Shopee viz, and Excel/Python cleanup.',
    bullets: ['Power BI MVP', 'KPI tracking', 'Data cleaning', 'Excel/Python basics', 'Shopee sales viz'],
    cta: 'https://calendly.com/admin-aurexissolution/30min?month=2026-01',
    signal: 'Best for MVPs'
  },
  {
    name: 'Growth Ops',
    price: 8000,
    description: 'Advanced analytics plus GA4 integration, predictive models, and experimentation.',
    bullets: ['Tableau dashboards', 'Predictive models', 'GA4 integration', 'A/B statistics', 'Custom reports'],
    recommended: true,
    cta: 'https://calendly.com/admin-aurexissolution/30min?month=2026-01',
    signal: 'Most picked'
  },
  {
    name: 'Enterprise',
    price: 15000,
    suffix: '+',
    description: 'Snowflake/BigQuery, streaming, ML pipelines, and full compliance audits.',
    bullets: ['Snowflake / BigQuery', 'Python/TensorFlow pipelines', 'Real-time streaming', 'Compliance audits'],
    cta: 'https://calendly.com/admin-aurexissolution/30min?month=2026-01',
    signal: 'Governed industries'
  }
];

const faqItems = [
  {
    question: 'How fast do we ship the first dashboard?',
    answer: 'Most pods show the first Power BI dashboard within 27 days after data model alignment and QA rituals.'
  },
  {
    question: 'How is data security handled?',
    answer: 'Data is encrypted at rest, notebook execution is logged, and every pipeline maps to SOC2/GDPR controls with evidence packs.'
  },
  {
    question: 'Can you integrate CRM or Shopee data?',
    answer: 'Yes—we maintain Shopee/Lazada connectors plus CRM APIs (HubSpot, Salesforce, Zoho) with PDPA-compliant audit logs.'
  }
];

const metricBubbles = [
  { label: 'Insights / week', value: '62', context: '62 new insight cards ship weekly via Power BI alerts and Slack digests.' },
  { label: 'Decision speed', value: '3.4×', context: 'Teams act 3.4× faster using ready-to-deploy Python notebooks and viz templates.' },
  { label: 'Efficiency', value: '+48%', context: 'Data prep automation reclaimed 48% of analyst hours for strategic work.' },
  { label: 'Payback', value: '<6 weeks', context: 'Revenue trend dashboards plus automation offset retainers in roughly six weeks.' }
];

const sliderClass =
  'w-full accent-cyan-500 dark:accent-cyan-300 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-500 [&::-webkit-slider-thumb]:shadow-[0_0_18px_rgba(34,211,238,0.5)] h-1 rounded-full bg-slate-200 dark:bg-white/10';

const useCountUp = (target?: number, active?: boolean) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (typeof target !== 'number' || !active) return;
    const controls = animate(0, target, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate: (latest) => setValue(latest)
    });
    return () => controls.stop();
  }, [target, active]);
  return typeof target === 'number' ? value : undefined;
};

const MetricStat: React.FC<{ metric: (typeof heroMetrics)[number]; index: number }> = ({ metric, index }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const animatedValue = useCountUp(metric.target, inView);
  const text =
    typeof metric.target === 'number' && animatedValue !== undefined && metric.formatter
      ? metric.formatter(animatedValue)
      : metric.label;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={`rounded-2xl border p-4 ${
        index === 0
          ? 'bg-gradient-to-r from-emerald-200 via-cyan-100 to-blue-100 text-slate-900 border-transparent shadow-[0_20px_60px_rgba(6,182,212,0.25)] dark:from-emerald-300/30 dark:via-cyan-300/20 dark:to-blue-400/25 dark:text-slate-900 dark:border-white/15 dark:shadow-[0_20px_60px_rgba(6,182,212,0.35)]'
          : 'bg-white text-slate-800 border-slate-200 dark:bg-white/5 dark:text-white dark:border-white/15'
      }`}
    >
      <p className="text-xl font-black">{text}</p>
      <p className="text-[10px] uppercase tracking-[0.4em] mt-2 text-slate-500 dark:text-white/60">{metric.sub}</p>
    </motion.div>
  );
};

const DataAnalysisPricing: React.FC = () => {
  const [activeMetric, setActiveMetric] = useState(0);
  const [leadsAnalyzed, setLeadsAnalyzed] = useState(1200);
  const [revenueTrend, setRevenueTrend] = useState(18);
  const [timeSaved, setTimeSaved] = useState(35);
  const [activePlan, setActivePlan] = useState(1);

  const projections = useMemo(() => {
    const leadValue = leadsAnalyzed * 25;
    const revenueValue = revenueTrend * 3500;
    const timeValue = timeSaved * 1200;
    const total = leadValue + revenueValue + timeValue;
    const roi = ((total - 4999) / 4999) * 100;
    return { leadValue, revenueValue, timeValue, total, roi };
  }, [leadsAnalyzed, revenueTrend, timeSaved]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50 text-slate-900 transition-colors dark:from-[#040a1f] dark:via-[#0a1330] dark:to-[#151b3d] dark:text-white">
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="data-grid" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(59,130,246,0.25)" />
              <stop offset="100%" stopColor="rgba(16,185,129,0.25)" />
            </linearGradient>
          </defs>
          {[...Array(24)].map((_, idx) => (
            <line key={`grid-${idx}`} x1="0" y1={idx * 60} x2="100%" y2={idx * 60} stroke="url(#data-grid)" strokeWidth="0.5" />
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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-emerald-200 bg-emerald-50 text-xs tracking-[0.45em] uppercase text-emerald-700 dark:border-white/20 dark:bg-white/5 dark:text-emerald-200">
                <Sparkles size={16} /> Data Pod
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-cyan-600 to-sky-500 drop-shadow-[0_30px_70px_rgba(6,182,212,0.25)] dark:from-cyan-200 dark:via-white dark:to-sky-200 dark:drop-shadow-[0_30px_70px_rgba(6,182,212,0.35)]">
                Spin Up Your Data Pod
                <br /> with Aurexis Solution workflows
              </h1>
              <p className="text-lg text-slate-600 dark:text-white/75 max-w-2xl">
                Unlock insights with live dashboards, Malaysian data compliance, and Shopee-ready connectors.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={BOOKING_LINK}
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
              <div className="grid grid-cols-2 gap-4">
                {heroMetrics.map((metric, index) => (
                  <MetricStat key={metric.label} metric={metric} index={index} />
                ))}
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
              className="relative mx-auto w-full max-w-md rounded-[32px] border border-slate-200 bg-gradient-to-br from-white via-emerald-50 to-cyan-50 p-8 shadow-[0_18px_70px_rgba(6,148,162,0.15)] dark:border-white/10 dark:bg-gradient-to-br dark:from-[#07142a] dark:via-[#0a1b35] dark:to-[#102948] dark:shadow-[0_18px_70px_rgba(6,148,162,0.3)]"
            >
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 10% 0%, rgba(34,197,94,0.3), transparent 45%), radial-gradient(circle at 90% 20%, rgba(59,130,246,0.25), transparent 55%)'
                }}
              />
              <div className="relative z-10 space-y-5 text-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="h-14 w-14 rounded-full border border-cyan-300/40 flex items-center justify-center text-cyan-700 bg-white shadow-[0_10px_30px_rgba(6,182,212,0.25)] dark:text-white dark:bg-white/5">
                    <Rocket size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking_[0.55em] text-emerald-600 dark:text-emerald-200">Data pod intel</p>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white">What customers never see</h3>
                    <p className="text-sm text-slate-600 mt-1 dark:text-white/70">Live telemetry from your Power BI, Python, and Tableau rituals.</p>
                  </div>
                </div>
                <div className="space-y-3 text-left">
                  {heroCards.map((card) => (
                    <div key={card.title} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 flex items-start gap-3 shadow-sm dark:border-white/12 dark:bg-white/5">
                      <div className="h-9 w-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 dark:bg-white/10 dark:border-white/15 dark:text-emerald-200">
                        <card.icon size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{card.eyebrow}</p>
                        <p className="text-xs text-slate-600 dark:text-white/75">{card.copy}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 flex items-center justify-between text-xs text-slate-500 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white/70">
                  <div>
                    <p className="uppercase tracking_[0.45em] text-emerald-600 dark:text-emerald-200">Next refresh</p>
                    <p className="text-base font-semibold text-slate-900 dark:text-white">15 min cadence</p>
                  </div>
                  <div className="text-right">
                    <p className="uppercase tracking_[0.45em] text-emerald-600 dark:text-emerald-200">Alerts</p>
                    <p className="text-base font-semibold text-slate-900 dark:text-white">Slack + WhatsApp</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
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
                  index === activeMetric
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
            <p className="text-xs uppercase tracking-[0.5em] text-emerald-600 dark:text-emerald-200">Transparent plans for Data Execution</p>
            <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-cyan-600 to-sky-500 drop-shadow-[0_20px_70px_rgba(6,182,212,0.2)] dark:from-cyan-200 dark:via-white dark:to-sky-300">
              Choose your data pod lane
            </h2>
            <p className="text-slate-600 text-base dark:text-white/70">Switch anytime, Malaysian support, compliant insights.</p>
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
                      <p className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white">
                        RM {tier.price.toLocaleString()}
                        {tier.suffix}
                      </p>
                      <p className="text-xs uppercase tracking-[0.45em] text-slate-500 dark:text-white/60 mt-2">per month</p>
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
                        <CheckCircle2 className="text-emerald-500 dark:text-emerald-300" size={18} /> <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.35em] text-slate-500 dark:text-white/60">
                    {['Power BI', 'Python notebooks', 'Tableau flows', 'Shopee connectors', 'MY compliance', 'Weekly retros'].map((chip) => (
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
            <p className="text-xs uppercase tracking_[0.45em] text-slate-500 dark:text-white/60">Plan intel</p>
            <p className="text-lg font-semibold mt-2">{pricingTiers[activePlan].name}</p>
            <p className="mt-2">{pricingTiers[activePlan].description}</p>
            <p className="mt-4 text-xs uppercase tracking_[0.45em] text-slate-500 dark:text-white/60">Best when you need</p>
            <p className="mt-1">
              {activePlan === 0 && 'Fast dashboard MVPs, KPI clarity, and Shopee/Excel blends.'}
              {activePlan === 1 && 'Predictive analytics, experimentation support, and blended GA4 dashboards.'}
              {activePlan === 2 && 'Snowflake-scale data lakes, ML pipelines, and regulated audit trails.'}
            </p>
          </motion.div>
        </section>

        {/* FAQ */}
        <section className="space-y-6">
          <div className="text-center space-y-4">
            <p className="text-xs uppercase tracking_[0.4em] text-slate-500 dark:text-white/60">Frequently Asked Questions</p>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white">Data clarity for Malaysian SMEs</h2>
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

        {/* ROI */}
        <section className="space-y-10">
          <div className="space-y-3 max-w-3xl">
            <p className="text-xs uppercase tracking_[0.5em] text-slate-500 dark:text-white/60">Your analytics ROI</p>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white">Interactive ROI calculator</h2>
            <p className="text-slate-600 dark:text-white/70">Adjust processed leads, revenue lifts, and saved analyst hours to see RM gains.</p>
          </div>
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-6 rounded-[36px] border border-slate-200 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-white/5">
              {[
                { label: 'Leads analyzed / month', value: leadsAnalyzed, display: `${leadsAnalyzed.toLocaleString()} leads`, setter: setLeadsAnalyzed, min: 200, max: 4000, step: 100 },
                { label: 'Revenue trend lift (%)', value: revenueTrend, display: `${revenueTrend}%`, setter: setRevenueTrend, min: 5, max: 45, step: 1 },
                { label: 'Analyst hours saved / month', value: timeSaved, display: `${timeSaved} hrs`, setter: setTimeSaved, min: 10, max: 80, step: 1 }
              ].map((slider) => (
                <div key={slider.label} className="space-y-2">
                  <div className="flex items-center justify-between text-xs uppercase tracking_[0.4em] text-slate-500 dark:text-white/60">
                    <span>{slider.label}</span>
                    <span className="text-slate-700 dark:text-white/80">{slider.display}</span>
                  </div>
                  <input
                    type="range"
                    min={slider.min}
                    max={slider.max}
                    step={slider.step}
                    value={slider.value}
                    onChange={(e) => slider.setter(Number(e.target.value))}
                    className={sliderClass}
                  />
                </div>
              ))}
              <div className="flex flex-wrap gap-4">
                <a href="https://stripe.com/payments" target="_blank" rel="noreferrer" className="px-6 py-3 rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 text-slate-900 font-semibold">
                  Download Report
                </a>
                <a href={BOOKING_LINK} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-full border border-slate-300 text-slate-700 font-semibold dark:border-white/30 dark:text-white">
                  Schedule ROI Call
                </a>
              </div>
            </div>
            <div className="space-y-6 rounded-[36px] border border-slate-200 bg-slate-50 p-8 text-slate-800 shadow-lg dark:border-white/10 dark:bg-black/30 dark:text-white/80">
              <div>
                <p className="text-xs uppercase tracking_[0.4em] text-slate-500 dark:text-white/60">Projected annual impact</p>
                <p className="text-4xl font-black text-cyan-700 dark:text-cyan-100 mt-2">RM {Math.round(projections.total * 12).toLocaleString()}</p>
                <p className="text-emerald-600 font-semibold dark:text-emerald-300">ROI {Math.max(0, projections.roi).toFixed(0)}%</p>
              </div>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="rounded-2xl bg-white p-4 text-slate-700 shadow dark:bg-white/5 dark:text-white/80">
                  <p className="text-xs uppercase tracking_[0.3em] text-slate-500 dark:text-white/60">Leads value</p>
                  <p className="text-xl font-semibold mt-2 text-slate-900 dark:text-white">RM {Math.round(projections.leadValue * 12).toLocaleString()}</p>
                </div>
                <div className="rounded-2xl bg-white p-4 text-slate-700 shadow dark:bg-white/5 dark:text-white/80">
                  <p className="text-xs uppercase tracking_[0.3em] text-slate-500 dark:text-white/60">Revenue lift</p>
                  <p className="text-xl font-semibold mt-2 text-slate-900 dark:text-white">RM {Math.round(projections.revenueValue * 12).toLocaleString()}</p>
                </div>
                <div className="rounded-2xl bg-white p-4 text-slate-700 shadow dark:bg-white/5 dark:text-white/80">
                  <p className="text-xs uppercase tracking_[0.3em] text-slate-500 dark:text-white/60">Hours saved</p>
                  <p className="text-xl font-semibold mt-2 text-slate-900 dark:text-white">RM {Math.round(projections.timeValue * 12).toLocaleString()}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-2xl bg-white p-4 text-slate-700 shadow dark:bg-white/5 dark:text-white/80">
                  <p className="text-xs uppercase tracking_[0.3em] text-slate-500 dark:text-white/60">Compliance signals</p>
                  <p className="text-xl font-semibold mt-2 text-slate-900 dark:text-white">PDPA + SOC2</p>
                </div>
                <div className="rounded-2xl bg-white p-4 text-slate-700 shadow dark:bg-white/5 dark:text-white/80">
                  <p className="text-xs uppercase tracking_[0.3em] text-slate-500 dark:text-white/60">Refresh cadence</p>
                  <p className="text-xl font-semibold mt-2 text-slate-900 dark:text-white">15 min</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer hero */}
        <section className="relative overflow-hidden rounded_[40px] border border-slate-200 bg-gradient-to-br from-white via-emerald-50 to-cyan-50 p-10 space-y-8 shadow-xl dark:border-white/10 dark:bg-gradient-to-br dark:from-indigo-900/50 dark:via-slate-900/60 dark:to-slate-950">
          <div className="flex flex-col lg:flex-row justify_between gap-8">
            <div className="space-y-4 max-w-xl">
              <p className="text-xs uppercase tracking_[0.4em] text-slate-500 dark:text-white/60">Magnetic Footer Hero</p>
              <h2 className="text-4xl font-black leading-tight text-slate-900 dark:text-white">Route Power BI, Tableau, and Python rituals into one pod</h2>
              <p className="text-slate-600 dark:text-white/75">
                Malaysian SMEs tap Aurexis pods for automated Shopee/CRM data prep, compliance guardrails, and CFO-grade visualizations with the same polish as our AI/App pages.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href={BOOKING_LINK} target="_blank" rel="noreferrer" className="px-8 py-4 rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 text-slate-900 font-semibold inline-flex items-center gap-2 shadow-lg">
                  Book Demo <ChevronRight size={18} />
                </a>
                <a href="https://stripe.com/payments" target="_blank" rel="noreferrer" className="px-8 py-4 rounded-full border border-slate-300 text-slate-700 font-semibold inline-flex items-center gap-2 dark:border-white/30 dark:text-white">
                  Download Playbook
                </a>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-700 dark:text-white/80">
              {[
                { icon: ShieldCheck, label: 'Compliance', value: 'PDPA + SOC2 mapped' },
                { icon: MessageSquare, label: 'Alerts', value: 'Slack + WhatsApp pulses' },
                { icon: Workflow, label: 'Pipelines', value: 'dbt + Airflow ready' },
                { icon: Link2, label: 'Connectors', value: 'Shopee / HubSpot / GA4' }
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="rounded-3xl border border-slate-200 bg-white p-4 flex items-center gap-3 shadow-sm dark:border-white/10 dark:bg-white/5">
                  <Icon size={20} />
                  <div>
                    <p className="text-xs uppercase tracking_[0.3em] text-slate-500 dark:text-white/60">{label}</p>
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

export default DataAnalysisPricing;
