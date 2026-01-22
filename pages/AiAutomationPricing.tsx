import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';
import { DEFAULT_PRICING_PAGE_CONTENT } from '../constants';
import type { PricingPlan, PricingMetricBubble, PricingFaqItem } from '../types';
import {
  Sparkles,
  Bot,
  Gauge,
  ShieldCheck,
  Rocket,
  Zap,
  ChevronRight,
  MessageSquare,
  Workflow,
  BarChart3
} from 'lucide-react';

const BOOKING_LINK = 'https://calendly.com/admin-aurexissolution/30min?month=2026-01';

const gridLinePositions = Array.from({ length: 8 }, (_, i) => (i + 1) * 10);

const nodeConfigs = [
  { top: '6%', left: '12%' },
  { top: '12%', left: '32%' },
  { top: '8%', left: '55%' },
  { top: '18%', left: '74%' },
  { top: '10%', left: '88%' },
  { top: '32%', left: '18%' },
  { top: '40%', left: '42%' },
  { top: '52%', left: '66%' },
  { top: '46%', left: '84%' },
  { top: '66%', left: '26%' },
  { top: '74%', left: '52%' },
  { top: '70%', left: '78%' }
];

const pilotBenefits = ['Custom fine-tuned agents', 'Live performance cockpit', 'Audit + guardrails'];

const pilotMetrics = [
  { label: 'Workflow blueprint', value: '48 hrs' },
  { label: 'Automation uptime', value: '99.9%' },
  { label: 'Reporting suite', value: 'Included' },
  { label: 'Compliance docs', value: 'SOC2-ready' }
];

const tierGradients = [
  {
    light: 'from-emerald-400/80 via-cyan-400/80 to-blue-500/80',
    dark: 'dark:from-[#032420] dark:via-[#082c3a] dark:to-[#020f1a]'
  },
  {
    light: 'from-purple-500 via-indigo-500 to-blue-500',
    dark: 'dark:from-[#1a1036] dark:via-[#221148] dark:to-[#090717]'
  },
  {
    light: 'from-amber-400 via-orange-500 to-rose-500',
    dark: 'dark:from-[#2e0d15] dark:via-[#3c151d] dark:to-[#140407]'
  }
];

const orbVariants = {
  initial: { opacity: 0, scale: 0.6 },
  animate: { opacity: 0.45, scale: 1, transition: { duration: 8, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' } }
};

const AiAutomationPricing: React.FC = () => {
  const { pricingPages } = useData();
  const pageContent = pricingPages?.ai || DEFAULT_PRICING_PAGE_CONTENT.ai;
  const hero = pageContent.hero;
  const heroBullets = hero.bullets && hero.bullets.length > 0
    ? hero.bullets
    : ['3-7 agent pods orchestrated across WhatsApp, HubSpot, and Sheets', 'SOC2-ready guardrails with human-in-loop approvals', 'Live KPI cockpit + anomaly nudges every dawn'];
  const heroChips = hero.chips && hero.chips.length > 0 ? hero.chips : ['Lead Concierge', 'Ops Pilot', 'Insights Copilot'];
  const metricBubbles: PricingMetricBubble[] = pageContent.metricBubbles ?? [];
  const pricingTiers: PricingPlan[] = pageContent.plans ?? [];
  const faqItems: PricingFaqItem[] = pageContent.faqs ?? [];
  const roiConfig = pageContent.roi;

  const resultsHighlights = hero.metrics && hero.metrics.length > 0
    ? hero.metrics.map(metric => ({ label: metric.label || metric.value || 'Metric', value: metric.value || metric.label || '' }))
    : [
        { label: 'Avg. Hours Saved', value: '62 /week' },
        { label: 'Sales Speed Increase', value: '3.4× faster' },
        { label: 'Lead Qualification Boost', value: '+48%' },
        { label: 'Payback Period', value: 'under 6 weeks' }
      ];

  const sliderDefs = roiConfig?.sliders?.length
    ? roiConfig.sliders
    : [
        { id: 'dailyLeads', label: 'Daily qualified leads', min: 20, max: 200, step: 1, defaultValue: 80 },
        { id: 'closeRate', label: 'Close rate (%)', min: 5, max: 60, step: 1, defaultValue: 18, unitSuffix: '%', format: 'percent' },
        { id: 'avgDealValue', label: 'Average deal (RM)', min: 800, max: 6000, step: 100, defaultValue: 2200, unitPrefix: 'RM ', format: 'currency' },
        { id: 'hoursSaved', label: 'Hours saved / week', min: 10, max: 120, step: 5, defaultValue: 55, unitSuffix: 'hrs', format: 'hours' }
      ];

  const initialSliderValues = useMemo(
    () =>
      sliderDefs.reduce<Record<string, number>>((acc, slider) => {
        acc[slider.id] = slider.defaultValue ?? slider.min ?? 0;
        return acc;
      }, {}),
    [sliderDefs]
  );

  const [sliderValues, setSliderValues] = useState<Record<string, number>>(initialSliderValues);

  useEffect(() => {
    setSliderValues(initialSliderValues);
  }, [initialSliderValues]);

  const getSliderValue = (id: string, fallback: number) => sliderValues[id] ?? fallback;

  const dailyLeads = getSliderValue('dailyLeads', 80);
  const conversionRate = getSliderValue('closeRate', 18);
  const avgDealValue = getSliderValue('avgDealValue', 2200);
  const hoursSaved = getSliderValue('hoursSaved', 55);

  const projections = useMemo(() => {
    const monthlyLeads = dailyLeads * 26; // approximate working days
    const manualRevenue = monthlyLeads * (conversionRate / 100) * avgDealValue;
    const automationLift = manualRevenue * 0.35; // 35% uplift baseline
    const hoursValue = hoursSaved * 4 * 65; // RM/hr estimate

    return {
      manualRevenue,
      automationRevenue: manualRevenue + automationLift,
      liftAmount: automationLift,
      hoursValue,
      roi: ((automationLift + hoursValue - 4999) / 4999) * 100
    };
  }, [dailyLeads, conversionRate, avgDealValue, hoursSaved]);

  const sliderClass =
    'w-full accent-cyan-500 dark:accent-cyan-300 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-500 [&::-webkit-slider-thumb]:shadow-[0_0_18px_rgba(34,211,238,0.3)] h-1 rounded-full bg-slate-200 dark:bg-white/10';

  const handleSliderChange = (id: string, value: number) => {
    setSliderValues(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-900 transition-colors dark:from-slate-900 dark:via-blue-950/80 dark:to-slate-900/90 dark:text-white">
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="magnetic-grid-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(45,212,191,0.35)" />
              <stop offset="100%" stopColor="rgba(14,165,233,0.4)" />
            </linearGradient>
          </defs>
          {gridLinePositions.map((pos) => (
            <motion.line
              key={`grid-v-${pos}`}
              x1={`${pos}%`}
              y1="0"
              x2={`${pos}%`}
              y2="100%"
              stroke="url(#magnetic-grid-stroke)"
              strokeWidth="0.6"
              strokeDasharray="12 18"
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: -160 }}
              transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
            />
          ))}
          {gridLinePositions.map((pos) => (
            <motion.line
              key={`grid-h-${pos}`}
              x1="0"
              y1={`${pos}%`}
              x2="100%"
              y2={`${pos}%`}
              stroke="url(#magnetic-grid-stroke)"
              strokeWidth="0.6"
              strokeDasharray="12 18"
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: -160 }}
              transition={{ duration: 14, repeat: Infinity, ease: 'linear', delay: 0.4 }}
            />
          ))}
        </svg>
        {nodeConfigs.map((node, index) => (
          <motion.span
            key={`${node.top}-${node.left}`}
            className="absolute h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.7)]"
            style={{ top: node.top, left: node.left }}
            animate={{ scale: [0.8, 1.15, 0.8], opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }}
          />
        ))}
      </div>

      <div className="relative z-10 px-6 lg:px-16">
        {/* Magnetic Pricing Hero */}
        <section className="py-16 lg:py-20 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-center">
          <div className="space-y-6 text-left">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-emerald-200 bg-emerald-50 backdrop-blur text-xs uppercase tracking-[0.35em] text-emerald-700 dark:border-white/20 dark:bg-white/5 dark:text-emerald-200">
              {hero.eyebrow ?? 'MAGNETIC AI PODS'}
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.65)]" />
              {hero.badge ?? 'RM 4,999 LAUNCH'}
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl lg:text-[52px] font-black leading-snug">
              <span className="block text-[1.1em] bg-gradient-to-r from-slate-900 via-cyan-700 to-blue-600 bg-clip-text text-transparent dark:from-white dark:via-cyan-50 dark:to-blue-100">{hero.title ?? 'Magnetic AI Automation'}</span>
              <span className="block text-[1.05em] bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">{hero.highlight ?? 'Pricing Hero'}</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-base lg:text-lg text-slate-600 max-w-2xl dark:text-white/85">
              {hero.subtitle ?? 'Asymmetric hero built for revenue teams adopting AI pods. Plug in automation blueprints, surface live ROI, and let prospects experience the demo bot mid-scroll.'}
            </motion.p>
            <div className="space-y-3">
              {heroBullets.map((item) => (
                <div key={item} className="flex items-center gap-3 text-slate-600 dark:text-white/80">
                  <span className="h-2 w-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.6)]" />
                  <span className="text-base lg:text-lg">{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href={hero.ctas?.primaryLink || BOOKING_LINK}
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 text-slate-900 font-semibold text-lg shadow-[0_15px_40px_rgba(6,182,212,0.35)] hover:translate-y-[-2px] transition-transform"
              >
                {hero.ctas?.primaryLabel ?? 'Book AI Pricing Lab'}
              </a>
              <button className="px-8 py-4 rounded-full border border-slate-300 text-slate-700 font-semibold text-lg backdrop-blur hover:bg-slate-100 transition dark:border-white/30 dark:text-white"
                onClick={() => hero.ctas?.secondaryLink && window.open(hero.ctas.secondaryLink, '_blank')}
                type="button"
              >
                {hero.ctas?.secondaryLabel ?? 'Download Playbook'}
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-white/60">
                {heroChips.map((chip) => (
                  <span key={chip} className="px-4 py-1 rounded-full border border-slate-200 dark:border-white/20 dark:text-white/80">
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="relative max-w-md w-full ml-auto mr-auto lg:mr-0">
            <div className="rounded-[26px] border border-slate-200 bg-white/90 backdrop-blur-2xl p-4 lg:p-5 shadow-[0_15px_50px_rgba(6,95,70,0.15)] space-y-4 dark:border-white/10 dark:bg-white/5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-white/10">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.4em] text-slate-500 dark:text-white/60">Live automation demo</p>
                  <p className="text-xl font-black text-slate-900 mt-1 dark:text-white">Aurexis Pod Atlas</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-200">
                  <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
                  Online
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { role: 'user', text: 'We need WhatsApp + HubSpot leads synced in under 2 mins.' },
                  { role: 'bot', text: 'Done. Pod Atlas qualifies leads, pushes to HubSpot, and triggers Slack alerts instantly.' },
                  { role: 'user', text: 'Compliance wants guardrails for RM approvals.' },
                  { role: 'bot', text: 'Human-in-loop layer inserted. Approvals logged + exported to Sheets nightly.' }
                ].map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: msg.role === 'bot' ? 18 : -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.08 }}
                    className={`rounded-2xl p-3 border ${msg.role === 'bot' ? 'bg-gradient-to-r from-emerald-100 to-cyan-100 text-slate-900 border-emerald-100 dark:from-emerald-400/20 dark:to-cyan-400/20 dark:text-white dark:border-white/10' : 'bg-slate-50 text-slate-700 border-slate-100 dark:bg-white/10 dark:text-white/90 dark:border-white/10'}`}
                  >
                    <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500 mb-1 dark:text-white/60">{msg.role === 'bot' ? 'Pod Atlas' : 'You'}</p>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                  </motion.div>
                ))}
              </div>
              <div className="rounded-2xl border border-cyan-200 bg-gradient-to-r from-cyan-50 to-blue-50 p-3.5 dark:border-cyan-400/20 dark:from-cyan-400/15 dark:to-blue-400/10">
                <p className="text-[11px] uppercase tracking-[0.4em] text-slate-500 dark:text-white/60">Automation lift</p>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-2xl font-black text-slate-900 dark:text-white">RM 128k / mo</p>
                  <p className="text-emerald-600 font-semibold dark:text-emerald-300">+36% vs manual</p>
                </div>
                <div className="mt-3 flex gap-2 text-xs text-slate-500 dark:text-white/70">
                  {['Lead Concierge', 'Ops Pilot', 'Insights Copilot'].map((tag) => (
                    <span key={tag} className="flex-1 rounded-full border border-slate-200 px-3 py-1.5 text-center dark:border-white/15">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Revenue Calculator */}
        <section className="py-24 px-6 lg:px-16 space-y-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-3 max-w-5xl">
            <p className="text-xs uppercase tracking-[0.5em] text-slate-500 dark:text-white/60">Live ROI cockpit</p>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white">Your Revenue Lift</h2>
            <p className="text-lg text-slate-600 max-w-2xl dark:text-white/75">See AI automation ROI before you buy. Drag the sliders, watch automation lift and ROI update instantly.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] relative">
            <div className="space-y-8 rounded-[36px] border border-slate-200 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-white/5">
              {sliderDefs.map(slider => (
                <div key={slider.id} className="space-y-2">
                  <div className="flex justify-between text-xs uppercase tracking-[0.4em] text-slate-500 dark:text-white/60">
                    <span>{slider.label}</span>
                    <span className="text-slate-700 dark:text-white/85">
                      {slider.format === 'currency'
                        ? `${slider.unitPrefix ?? 'RM '}${(sliderValues[slider.id] ?? slider.defaultValue ?? slider.min).toLocaleString()}${slider.unitSuffix ?? ''}`
                        : `${slider.unitPrefix ?? ''}${sliderValues[slider.id] ?? slider.defaultValue ?? slider.min}${slider.unitSuffix ?? ''}`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={slider.min}
                    max={slider.max}
                    step={slider.step}
                    value={sliderValues[slider.id] ?? slider.defaultValue ?? slider.min}
                    onChange={e => handleSliderChange(slider.id, Number(e.target.value))}
                    className={sliderClass}
                  />
                </div>
              ))}
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 text-slate-900 font-semibold">
                  Download ROI Report
                </button>
                <button className="px-6 py-3 rounded-full border border-slate-300 text-slate-700 font-semibold dark:border-white/30 dark:text-white">
                  Share Dashboard
                </button>
              </div>
            </div>
            <div className="space-y-6 rounded-[36px] border border-slate-200 bg-blue-50 p-8 text-slate-800 shadow-lg dark:border-white/10 dark:bg-white/5 dark:text-white/80">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-slate-500 dark:text-white/60">Automation projection</p>
                <p className="text-sm text-slate-500 dark:text-white/60">Monthly Revenue with AI</p>
                <p className="text-4xl font-black text-cyan-700 dark:text-cyan-100 mt-2">RM {Math.round(projections.automationRevenue).toLocaleString()}</p>
                <p className="text-emerald-600 font-semibold dark:text-emerald-300">+RM {Math.round(projections.liftAmount).toLocaleString()} lift</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white p-4 text-slate-700 shadow dark:bg-white/5 dark:text-white/80">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-white/60">Manual revenue</p>
                  <p className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">RM {Math.round(projections.manualRevenue).toLocaleString()}</p>
                </div>
                <div className="rounded-2xl bg-white p-4 text-slate-700 shadow dark:bg-white/5 dark:text-white/80">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-white/60">Hours value</p>
                  <p className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">RM {Math.round(projections.hoursValue).toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-white/60">Projected ROI</p>
                  <p className="text-3xl font-black text-emerald-600 dark:text-emerald-300">{Math.max(0, projections.roi).toFixed(0)}%</p>
                </div>
                <a
                  href={BOOKING_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-900 font-semibold"
                >
                  Schedule ROI Review
                  <ChevronRight size={18} />
                </a>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {[
                  { label: 'Monthly leads', value: (dailyLeads * 26).toLocaleString() },
                  { label: 'Automation lift', value: `RM ${Math.round(projections.liftAmount).toLocaleString()}` },
                  { label: 'Hours saved', value: `${hoursSaved} hrs/week` },
                  { label: 'Baseline retainer', value: 'RM 4,999' }
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl bg-white p-4 text-slate-700 shadow dark:bg-white/5 dark:text-white/80">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-white/60">{stat.label}</p>
                    <p className="text-xl font-semibold mt-2 text-slate-900 dark:text-white">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Pricing tiers */}
        <section className="py-10">
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="text-center space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-white/50">Choose Your Launch Mode</p>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white">Transparent plans for AI execution</h2>
              <p className="text-lg text-slate-600 dark:text-white/80">Switch plans anytime. Every tier includes Malaysian timezone support, compliance-ready playbooks and success rituals.</p>
            </div>
            <div className="grid gap-8 lg:grid-cols-3">
              {pricingTiers.map((tier, index) => {
                const gradients = tierGradients[index % tierGradients.length];
                const priceDisplay = tier.priceLabel || (tier.priceValue ? `RM ${tier.priceValue.toLocaleString()}` : '');
                const priceSuffix = tier.priceSuffix ?? '';
                const tags = tier.tags ?? [];
                return (
                  <motion.div
                    key={tier.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className={`relative rounded-[32px] border p-8 flex flex-col gap-6 shadow-[0_25px_80px_rgba(15,118,110,0.15)] bg-gradient-to-br ${gradients.light} text-slate-900 border-slate-200 dark:border-white/10 dark:bg-gradient-to-br ${gradients.dark} dark:text-white ${
                      tier.recommended ? 'ring-2 ring-cyan-400/60 shadow-2xl shadow-cyan-500/20' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-white/60">{tier.signal ?? tier.bestFor ?? 'Pod lane'}</p>
                        <h3 className="text-3xl font-black mt-3">{tier.name}</h3>
                      </div>
                      {tier.recommended && (
                        <span className="px-3 py-1 rounded-full border border-emerald-200 bg-white/70 text-[10px] uppercase tracking-[0.35em] text-emerald-700 dark:border-white/20 dark:bg-white/20 dark:text-white">
                          Most picked
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="text-4xl font-black text-slate-900 dark:text-white">
                        {priceDisplay}
                        {priceSuffix}
                      </div>
                      <div className="text-slate-500 dark:text-white/70">{tier.bestFor ?? 'Per month'}</div>
                    </div>
                    <p className="text-slate-600 dark:text-white/70">{tier.description}</p>
                    <div className="space-y-3">
                      {(tier.bullets ?? []).map((bullet) => (
                        <div key={bullet} className="flex items-center gap-3 text-slate-700 dark:text-white/80">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 flex items-center justify-center text-white shadow">
                            <Sparkles size={16} />
                          </div>
                          {bullet}
                        </div>
                      ))}
                    </div>
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.35em] text-slate-500 dark:text-white/60">
                        {tags.map((chip) => (
                          <span
                            key={`${tier.id}-${chip}`}
                            className={`px-3 py-1 rounded-full border ${tier.recommended ? 'border-cyan-200 bg-cyan-50 text-cyan-800 dark:border-white/40 dark:bg-white/15 dark:text-white' : 'border-slate-200 text-slate-500 dark:border-white/15 dark:text-white/70'}`}
                          >
                            {chip}
                          </span>
                        ))}
                      </div>
                    )}
                    <a
                      href={tier.cta || BOOKING_LINK}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-auto w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 text-slate-900 font-semibold flex items-center justify-center gap-2"
                    >
                      Book This Plan <ChevronRight size={18} />
                    </a>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Results strip */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
            {resultsHighlights.map((item) => (
              <div key={item.label} className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-md dark:border-white/10 dark:bg-white/5">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-white/50">{item.label}</p>
                <p className="text-3xl font-black mt-3 text-emerald-600 dark:text-emerald-200">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-white/50">Need clarity?</p>
              <h2 className="text-4xl font-black text-slate-900 dark:text-white">AI pricing questions, answered</h2>
            </div>
            <div className="space-y-6">
              {faqItems.map((faq) => (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md text-slate-800 dark:bg-white/5 dark:border-white/10 dark:text-white"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-200">
                      <MessageSquare size={18} />
                    </div>
                    <h3 className="text-xl font-semibold">{faq.question}</h3>
                  </div>
                  <p className="text-slate-600 mt-3 leading-relaxed dark:text-white/75">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Full Deployment Offer */}
        <section className="py-24 px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-[40px] border border-slate-200 bg-gradient-to-r from-white via-cyan-50 to-blue-100 p-10 flex flex-col lg:flex-row gap-8 items-center shadow-xl dark:border-white/10 dark:bg-gradient-to-r dark:from-emerald-500/20 dark:via-cyan-500/20 dark:to-blue-500/20"
          >
            <div className="space-y-4 flex-1">
              <p className="text-sm uppercase tracking-[0.4em] text-slate-500 dark:text-white/70">Full deployment experience</p>
              <h2 className="text-4xl font-black text-slate-900 dark:text-white">Launch pods across WhatsApp, HubSpot, Sheets & Slack</h2>
              <p className="text-slate-600 text-lg dark:text-white/80">
                We pair automation strategists, compliance leads, and AI engineers into one pod. Launch timeline, ROI model, adoption playbook, and human-in-loop guardrails included.
              </p>
              <div className="flex flex-wrap gap-3 text-sm">
                {['24/7 monitoring', 'Compliance + SOC2 docs', 'CX + Ops playbooks', 'Dedicated pod strategist'].map((chip) => (
                  <span key={chip} className="px-4 py-2 rounded-full border border-slate-200 text-slate-600 dark:border-white/20 dark:text-white/80">
                    {chip}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <button className="px-8 py-4 rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 text-slate-900 font-semibold inline-flex items-center gap-2 justify-center">
                Book Deployment Call <ChevronRight size={18} />
              </button>
              <button className="px-8 py-4 rounded-full border border-slate-300 text-slate-700 font-semibold inline-flex items-center gap-2 justify-center dark:border-white/30 dark:text-white">
                Download Deployment Guide
              </button>
            </div>
          </motion.div>
        </section>

        <section className="py-24 px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full grid gap-12 lg:grid-cols-[0.55fr_0.45fr] rounded-[40px] border border-slate-200 bg-gradient-to-br from-white via-blue-50 to-indigo-100 p-10 shadow-2xl text-slate-900 dark:border-white/10 dark:bg-gradient-to-r dark:from-emerald-500/20 dark:via-cyan-500/20 dark:to-blue-500/20 dark:text-white"
          >
            <div className="space-y-6 max-w-3xl">
              <p className="text-xs uppercase tracking-[0.45em] text-slate-500 dark:text-white/60">Ready in 21 days</p>
              <h2 className="text-4xl lg:text-[48px] font-black leading-tight">Spin up your AI automation pod with Aurexis Solution</h2>
              <p className="text-lg text-slate-600 max-w-2xl dark:text-white/75">
                We run discovery, map your revenue workflows, and deploy guardrailed agents that compound results. Local Malaysian team, enterprise security.
              </p>
              <div className="flex flex-wrap gap-3 text-sm text-slate-600 dark:text-white/85">
                {pilotBenefits.map((benefit) => (
                  <span key={benefit} className="px-4 py-1 text-[11px] uppercase tracking-[0.35em] bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-white/85">
                    {benefit}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 text-slate-900 font-semibold text-lg inline-flex items-center gap-2">
                  Book live demo
                  <ChevronRight size={18} />
                </button>
                <button className="px-8 py-4 border border-slate-300 text-slate-700 font-semibold text-lg dark:border-white/30 dark:text-white">Download pricing PDF</button>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-500 dark:text-white/60">Pilot offer</p>
                  <p className="text-3xl font-black text-slate-900 dark:text-white">RM 12k</p>
                  <p className="text-slate-600 dark:text-white/70">All-in launch (3 sprints)</p>
                </div>
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-white dark:text-slate-900">
                  <Rocket size={28} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 text-sm text-slate-600 dark:text-white/80">
                {pilotMetrics.map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-xs uppercase tracking-[0.4em] text-slate-500 dark:text-white/50">{label}</p>
                    <p className="text-2xl font-semibold mt-1">{value}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-6 text-sm text-slate-600 dark:text-white/75">
                {[{ icon: Workflow, title: 'Workflow blueprint' }, { icon: Bot, title: 'Custom agents' }, { icon: Gauge, title: 'Performance cockpit' }, { icon: ShieldCheck, title: 'Audit-ready' }].map(({ icon: Icon, title }) => (
                  <div key={title} className="flex items-center gap-3">
                    <Icon size={20} />
                    <span>{title}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default AiAutomationPricing;
