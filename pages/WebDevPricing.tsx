import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MonitorSmartphone, MessageSquare, Phone, FileDown, CheckCircle2, ChevronRight } from 'lucide-react';
import WebDevTerminalHero from '../components/WebDevTerminalHero';
import { useData } from '../context/DataContext';
import { DEFAULT_PRICING_PAGE_CONTENT } from '../constants';

const sliderClass =
  'w-full accent-cyan-500 dark:accent-cyan-300 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-500 [&::-webkit-slider-thumb]:shadow-[0_0_18px_rgba(34,211,238,0.4)] h-1 rounded-full bg-slate-200 dark:bg-white/10';

const BOOKING_LINK = 'https://calendly.com/admin-aurexissolution/30min?month=2026-01';

const WebDevPricing: React.FC = () => {
  const { pricingPages } = useData();
  const pageContent = pricingPages?.web || DEFAULT_PRICING_PAGE_CONTENT.web;
  const metricBubbles = pageContent.metricBubbles;
  const pricingTiers = pageContent.plans;
  const faqItems = pageContent.faqs;
  const roiConfig = pageContent.roi;
  const [activeMetric, setActiveMetric] = useState(0);
  const [activePlan, setActivePlan] = useState(1);
  const sliderDefs = roiConfig?.sliders ?? [];
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

  const handleSliderChange = (id: string, value: number) => {
    setSliderValues(prev => ({ ...prev, [id]: value }));
  };

  const pagesBuilt = sliderValues['pages'] ?? 8;
  const conversionLift = sliderValues['conversion'] ?? 20;
  const opsHours = sliderValues['ops'] ?? 30;

  const projections = useMemo(() => {
    const pageValue = pagesBuilt * 1800;
    const conversionValue = conversionLift * 450;
    const opsValue = opsHours * 180;
    const total = pageValue + conversionValue + opsValue;
    const roi = ((total - (roiConfig?.baselineCost ?? 4999)) / (roiConfig?.baselineCost ?? 4999)) * 100;
    return { pageValue, conversionValue, opsValue, total, roi };
  }, [pagesBuilt, conversionLift, opsHours, roiConfig?.baselineCost]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-900 transition-colors dark:from-[#030712] dark:via-[#050c1b] dark:to-[#0a183a] dark:text-white">
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="web-grid" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(59,130,246,0.3)" />
              <stop offset="100%" stopColor="rgba(14,165,233,0.3)" />
            </linearGradient>
          </defs>
          {[...Array(26)].map((_, idx) => (
            <line key={`grid-${idx}`} x1="0" y1={idx * 50} x2="100%" y2={idx * 50} stroke="url(#web-grid)" strokeWidth="0.4" />
          ))}
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0.35, scale: 0.8 }}
        animate={{ opacity: [0.35, 0.8, 0.35], scale: [0.8, 1.05, 0.8] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-20 right-10 h-72 w-72 rounded-full bg-cyan-500/25 blur-[160px]"
      />
      <motion.div
        initial={{ opacity: 0.4, scale: 0.8 }}
        animate={{ opacity: [0.4, 0.85, 0.4], scale: [0.8, 1.1, 0.8] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-purple-600/25 blur-[180px]"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 pt-24 pb-16 space-y-24">
        <WebDevTerminalHero hero={pageContent.hero} />

        {/* Metrics */}
        <section className="space-y-6">
          <div className="flex flex-wrap gap-4 rounded-[32px] border border-slate-200 bg-white/90 p-4 shadow-lg dark:border-white/10 dark:bg-white/5">
            {metricBubbles.map((metric, index) => (
              <motion.button
                key={metric.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => setActiveMetric(index)}
                onFocus={() => setActiveMetric(index)}
                className={`flex-1 min-w-[150px] rounded-[26px] px-4 py-3 border transition ${
                  index === activeMetric
                    ? 'bg-gradient-to-br from-cyan-50 to-white text-slate-900 border-slate-100 shadow-[0_15px_40px_rgba(15,118,110,0.2)] dark:bg-white dark:text-slate-900'
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
            <p className="text-xs uppercase tracking-[0.5em] text-emerald-600 dark:text-emerald-200">Transparent plans for Web Execution</p>
            <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-500 to-sky-500 drop-shadow-[0_20px_70px_rgba(6,182,212,0.25)] dark:from-cyan-200 dark:via-white dark:to-sky-300">
              Choose your web pod lane
            </h2>
            <p className="text-slate-600 text-base dark:text-white/70">Switch anytime, Malaysian support, compliant hosting.</p>
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
            className="grid gap-6 lg:grid-cols-3"
          >
            {pricingTiers.map((tier, index) => {
              const active = activePlan === index;
              return (
                <motion.article
                  key={tier.id}
                  variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
                  whileHover={{ scale: 1.015 }}
                  onMouseEnter={() => setActivePlan(index)}
                  onFocus={() => setActivePlan(index)}
                  tabIndex={0}
                  className={`relative overflow-hidden rounded-[34px] border p-8 flex flex-col gap-5 transition shadow-[0_25px_80px_rgba(2,6,23,0.15)] dark:shadow-[0_25px_80px_rgba(2,6,23,0.45)] ${
                    tier.recommended
                      ? 'bg-gradient-to-b from-cyan-50 via-white to-blue-50 text-slate-900 border-cyan-100 ring-2 ring-cyan-300/60 dark:from-[#08203a] dark:via-[#06172b] dark:to-[#041020] dark:text-white dark:border-white/10'
                      : 'bg-white text-slate-900 border-slate-200 dark:bg-gradient-to-b dark:from-[#040b16] dark:via-[#050f1f] dark:to-[#030910] dark:text-white dark:border-white/10'
                  }`}
                >
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),transparent_65%)] dark:opacity-40" />
                  <div className="relative flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking_[0.5em] text-slate-500 dark:text-white/60">{tier.name}</p>
                      <p className="text-4xl md:text-5xl font-black mt-2 text-slate-900 dark:text-white">
                        {tier.priceLabel || `RM ${tier.priceValue?.toLocaleString()}`}
                        {tier.priceSuffix}
                      </p>
                      <p className="text-[11px] uppercase tracking_[0.5em] text-slate-500 dark:text-white/50 mt-1">{tier.bestFor ?? 'Per month'}</p>
                    </div>
                    {tier.signal && (
                      <span className="px-3 py-1 rounded-full border text-[10px] uppercase tracking_[0.35em] text-slate-700 shadow_[0_10px_30px_rgba(6,182,212,0.25)] dark:border-white/30 dark:text-white/80 dark:shadow_[0_10px_30px_rgba(6,182,212,0.35)]">
                        {tier.signal}
                      </span>
                    )}
                  </div>
                  <p className="relative text-slate-600 text-base leading-relaxed dark:text-white/80">{tier.description}</p>
                  <ul className="relative space-y-3 text-sm text-slate-700 dark:text-white/85">
                    {tier.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-center gap-3">
                        <CheckCircle2 className="text-emerald-500 dark:text-emerald-300" size={18} /> <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="relative flex flex-wrap gap-2 text-[11px] uppercase tracking_[0.35em] text-slate-500 dark:text-white/60">
                    {(tier.tags ?? []).map((chip) => (
                      <span
                        key={`${tier.id}-${chip}`}
                        className={`px-3 py-1 rounded-full border ${
                          active
                            ? 'border-cyan-300 bg-cyan-50 text-cyan-800 dark:border-white/40 dark:bg-white/15 dark:text-white'
                            : 'border-slate-200 text-slate-500 dark:border-white/15 dark:text-white/70'
                        }`}
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                  <a
                    href={BOOKING_LINK}
                    target="_blank"
                    rel="noreferrer"
                    className="relative mt-auto inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-400 text-slate-900 font-semibold shadow_[0_15px_45px_rgba(6,182,212,0.35)] hover:translate-y-[-2px] transition-transform"
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
            className="rounded_[28px] border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-lg dark:border-white/10 dark:bg-white/5 dark:text-white/80"
          >
            <p className="text-xs uppercase tracking_[0.45em] text-slate-500 dark:text-white/60">Plan intel</p>
            <p className="text-lg font-semibold mt-2">{pricingTiers[activePlan]?.name}</p>
            <p className="mt-2">{pricingTiers[activePlan]?.description}</p>
            <p className="mt-4 text-xs uppercase tracking_[0.45em] text-slate-500 dark:text-white/60">Best when you need</p>
            <p className="mt-1">
              {pricingTiers[activePlan]?.bestFor ?? 'Founder-led pods with Malaysian timezone support.'}
            </p>
          </motion.div>
        </section>

        {/* FAQ */}
        <section className="space-y-6">
          <div className="text-center space-y-4">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500 dark:text-white/60">Frequently Asked Questions</p>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white">Web clarity for Malaysian SMEs</h2>
          </div>
          <div className="space-y-4">
            {faqItems.map(faq => (
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
                <p className="mt-4 leading-relaxed text-slate-600 dark:text-white/75">{faq.answer}</p>
              </motion.details>
            ))}
          </div>
        </section>

        {/* ROI */}
        <section className="space-y-10">
          <div className="space-y-3 max-w-3xl">
            <p className="text-xs uppercase tracking_[0.5em] text-slate-500 dark:text-white/60">Your web ROI</p>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white">{roiConfig?.headline ?? 'Interactive ROI calculator'}</h2>
            <p className="text-slate-600 dark:text-white/70">{roiConfig?.description ?? 'Adjust the sliders to see projected ROI.'}</p>
          </div>
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-white/5">
              {sliderDefs.map(slider => (
                <div key={slider.id} className="space-y-2">
                  <div className="flex items-center justify-between text-xs uppercase tracking_[0.4em] text-slate-500 dark:text-white/60">
                    <span>{slider.label}</span>
                    <span className="text-slate-700 dark:text-white/80">
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
                <a href="https://stripe.com/payments" target="_blank" rel="noreferrer" className="px-6 py-3 rounded_full bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 text-slate-900 font-semibold">
                  Download Report
                </a>
                <a href={BOOKING_LINK} target="_blank" rel="noreferrer" className="px-6 py-3 rounded_full border border-slate-300 text-slate-700 font-semibold dark:border-white/30 dark:text-white">
                  Schedule ROI Call
                </a>
              </div>
            </div>
            <div className="space-y-6 rounded_[36px] border border-slate-200 bg-slate-50 p-8 text-slate-800 shadow-lg dark:border-white/10 dark:bg-black/30 dark:text-white/80">
              <div>
                <p className="text-xs uppercase tracking_[0.4em] text-slate-500 dark:text-white/60">Projected annual impact</p>
                <p className="text-4xl font-black text-cyan-700 dark:text-cyan-100 mt-2">RM {Math.round(projections.total * 12).toLocaleString()}</p>
                <p className="text-emerald-600 font-semibold dark:text-emerald-300">ROI {Math.max(0, projections.roi).toFixed(0)}%</p>
              </div>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="rounded-2xl bg-white p-4 text-slate-700 shadow dark:bg-white/5 dark:text-white/80">
                  <p className="text-xs uppercase tracking_[0.3em] text-slate-500 dark:text-white/60">Pages value</p>
                  <p className="text-xl font-semibold mt-2 text-slate-900 dark:text-white">RM {Math.round(projections.pageValue * 12).toLocaleString()}</p>
                </div>
                <div className="rounded-2xl bg-white p-4 text-slate-700 shadow dark:bg-white/5 dark:text-white/80">
                  <p className="text-xs uppercase tracking_[0.3em] text-slate-500 dark:text-white/60">Conversion lift</p>
                  <p className="text-xl font-semibold mt-2 text-slate-900 dark:text-white">RM {Math.round(projections.conversionValue * 12).toLocaleString()}</p>
                </div>
                <div className="rounded-2xl bg-white p-4 text-slate-700 shadow dark:bg-white/5 dark:text-white/80">
                  <p className="text-xs uppercase tracking_[0.3em] text-slate-500 dark:text-white/60">Ops savings</p>
                  <p className="text-xl font-semibold mt-2 text-slate-900 dark:text-white">RM {Math.round(projections.opsValue * 12).toLocaleString()}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-2xl bg-white p-4 text-slate-700 shadow dark:bg-white/5 dark:text-white/80">
                  <p className="text-xs uppercase tracking_[0.3em] text-slate-500 dark:text-white/60">Preview stack</p>
                  <p className="text-xl font-semibold mt-2 text-slate-900 dark:text-white">React/Vite/Tailwind</p>
                </div>
                <div className="rounded-2xl bg-white p-4 text-slate-700 shadow dark:bg-white/5 dark:text-white/80">
                  <p className="text-xs uppercase tracking_[0.3em] text-slate-500 dark:text-white/60">Deploy ops</p>
                  <p className="text-xl font-semibold mt-2 text-slate-900 dark:text-white">Vercel + Firebase</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Magnetic footer hero */}
        <section className="relative overflow-hidden rounded_[40px] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-cyan-50 p-10 space-y-8 shadow-xl dark:border-white/10 dark:bg-gradient-to-br dark:from-indigo-900/50 dark:via-slate-900/60 dark:to-slate-950">
          <div className="flex flex-col lg:flex-row justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <p className="text-xs uppercase tracking_[0.4em] text-slate-500 dark:text-white/60">Web Forge Hero</p>
              <h2 className="text-4xl font-black leading-tight text-slate-900 dark:text-white">Route WhatsApp leads + Shopee signals into Web Forge pods</h2>
              <p className="text-slate-600 dark:text-white/75">
                Our web squads pair React/Next, Firebase, and Shopee APIs with Malaysian time-zone support so SMEs launch lightning-fast storefronts.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://wa.me/60164071129?text=Hi%20Aurexis%20Solution%20-%20Book%20my%20Web%20performance%20audit"
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-4 rounded-full bg_gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 text-slate-900 font-semibold inline-flex items-center gap-2 shadow-lg"
                >
                  <Phone size={18} />
                  WhatsApp Team
                </a>
                <a
                  href={BOOKING_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-4 rounded-full border border-slate-300 text-slate-700 font-semibold inline-flex items-center gap-2 dark:border-white/30 dark:text-white"
                >
                  <ChevronRight size={18} />
                  Book Strategy Call
                </a>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-700 dark:text-white/80">
              {[
                { icon: MonitorSmartphone, label: 'Live preview', value: 'React/Vite staging' },
                { icon: MessageSquare, label: 'Pods online', value: 'Malaysian timezone' },
                { icon: MonitorSmartphone, label: 'UI Kits', value: 'Tailwind + Figma' },
                { icon: MessageSquare, label: 'Deploy fabric', value: 'Vercel • Firebase • Cloudflare' }
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

export default WebDevPricing;
