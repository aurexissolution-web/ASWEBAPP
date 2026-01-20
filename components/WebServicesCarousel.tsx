import React, { useMemo, useState, useCallback } from 'react';
import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import { Check, Sparkles, ArrowUpRight, Cpu, Globe, Layout } from 'lucide-react';

type CarouselTab = {
  id: 'seo' | 'responsive' | 'react';
  label: string;
  headline: string;
  description: string;
  badges: string[];
  features: string[];
  metrics: { label: string; value: string; sublabel?: string }[];
  caseStudy: {
    client: string;
    achievement: string;
    duration: string;
    accent: string;
  };
  accent: string;
};

const TABS: CarouselTab[] = [
  {
    id: 'seo',
    label: 'SEO Optimization',
    headline: 'Search-first architecture with Core Web Vitals baked in.',
    description:
      'We refactor your front-end, schema, and content pipeline so Google sees a lightning-fast, structured experience. Automated audits keep rankings climbing every sprint.',
    badges: ['Core Web Vitals < 1.2s', 'Programmatic SEO', 'Structured Data'],
    features: ['Automated lighthouse sweeps', 'Content cluster strategy', 'Edge caching & CDN tuning', 'Schema + sitemap automation'],
    metrics: [
      { label: 'Organic traffic lift', value: '+58%', sublabel: 'within 90 days' },
      { label: 'Keyword takeover', value: '12 new #1s' }
    ],
    caseStudy: {
      client: 'FinTech SEO Sprint',
      achievement: 'Ranked #1 for 6 competitive keywords after a 60-day rebuild.',
      duration: '60-day rebuild',
      accent: 'from-cyan-500/30 via-blue-500/20 to-purple-500/20'
    },
    accent: 'from-cyan-400 via-blue-400 to-purple-400'
  },
  {
    id: 'responsive',
    label: 'Responsive Design',
    headline: 'Pixel-perfect device coverage with adaptive storytelling.',
    description:
      'Component libraries adapt fluidly from 320px to 4K. Motion guidelines, scroll choreography, and accessibility checks make every viewport feel intentional.',
    badges: ['Device matrix tested', 'WCAG 2.2 AA', 'Micro-interactions'],
    features: ['Fluid grid + clamp scales', 'Gesture + motion specs', 'Accessibility QA suite', 'Design token automation'],
    metrics: [
      { label: 'Mobile conversions', value: '+42%' },
      { label: 'Bounce rate', value: '-37%', sublabel: 'on tablet & mobile' }
    ],
    caseStudy: {
      client: 'Luxury Retail Replatform',
      achievement: 'Reduced mobile bounce to 18% with progressive enhancement and tactile motion.',
      duration: '8-week rollout',
      accent: 'from-emerald-400/30 via-teal-400/20 to-cyan-400/20'
    },
    accent: 'from-emerald-400 via-teal-400 to-cyan-400'
  },
  {
    id: 'react',
    label: 'React/Next.js',
    headline: 'Modern stacks with hybrid rendering + automation hooks.',
    description:
      'Composable React and Next.js builds ship with ISR, API routes, and deployment workflows wired to your CMS or product ops tooling.',
    badges: ['Next.js 14 App Router', 'Edge-ready APIs', 'CI/CD Automation'],
    features: ['ISR + streaming fallback', 'Design system integration', 'CMS + DAM bridges', 'Observability dashboards'],
    metrics: [
      { label: 'Deploy cadence', value: '3x faster', sublabel: 'with CI automations' },
      { label: 'TTFB', value: '<180ms', sublabel: 'global average' }
    ],
    caseStudy: {
      client: 'B2B SaaS Platform',
      achievement: 'Cut deploy time from 40 min to 8 min with GitHub Actions + Vercel pipelines.',
      duration: '5-week modernization',
      accent: 'from-fuchsia-500/30 via-purple-500/20 to-blue-500/20'
    },
    accent: 'from-fuchsia-400 via-purple-400 to-blue-400'
  }
];

const iconMap: Record<CarouselTab['id'], React.ReactNode> = {
  seo: <Globe className="w-6 h-6" />,
  responsive: <Layout className="w-6 h-6" />,
  react: <Cpu className="w-6 h-6" />
};

const orbitNodes = Array.from({ length: 18 }).map((_, idx) => ({
  id: idx,
  size: 6 + Math.random() * 10,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  delay: Math.random() * 4
}));

const WebServicesCarousel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CarouselTab['id']>('seo');

  const activeIndex = useMemo(() => TABS.findIndex((tab) => tab.id === activeTab), [activeTab]);
  const activeData = TABS[activeIndex];

  const navigateTo = useCallback(
    (direction: 'next' | 'prev') => {
      const nextIndex =
        direction === 'next'
          ? (activeIndex + 1) % TABS.length
          : (activeIndex - 1 + TABS.length) % TABS.length;
      setActiveTab(TABS[nextIndex].id);
    },
    [activeIndex]
  );

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (info.offset.x < -80) {
        navigateTo('next');
      } else if (info.offset.x > 80) {
        navigateTo('prev');
      }
    },
    [navigateTo]
  );

  return (
    <section className="relative py-24 px-6 lg:px-12 min-h-[620px] overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-900 dark:bg-[#030a16] dark:bg-none dark:text-white">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-40 dark:hidden"
          style={{
            backgroundImage:
              'linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(0deg, rgba(15,23,42,0.04) 1px, transparent 1px)',
            backgroundSize: '100px 100px'
          }}
        />
        <motion.div
          className="absolute inset-0 dark:hidden"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            backgroundImage:
              'radial-gradient(circle at 30% 20%, rgba(59,130,246,0.12), transparent 55%), radial-gradient(circle at 70% 60%, rgba(14,165,233,0.12), transparent 60%)'
          }}
        />
        <div className="hidden dark:block absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#030915] via-[#040b1a] to-[#01040a]" />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(0deg, rgba(148,163,184,0.08) 1px, transparent 1px)',
              backgroundSize: '80px 80px'
            }}
          />
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              backgroundImage:
                'radial-gradient(circle at 45% 15%, rgba(6,182,212,0.22), transparent 65%), radial-gradient(circle at 70% 65%, rgba(79,70,229,0.2), transparent 55%)'
            }}
          />
        </div>
        {orbitNodes.map((node) => (
          <motion.span
            key={node.id}
            className="absolute rounded-full bg-cyan-300/70 shadow-[0_0_16px_rgba(6,182,212,0.5)] dark:bg-cyan-400/80 dark:shadow-[0_0_22px_rgba(6,182,212,0.6)]"
            style={{ width: node.size, height: node.size, left: node.left, top: node.top }}
            animate={{ opacity: [0.2, 0.7, 0.2], scale: [0.8, 1.1, 0.8] }}
            transition={{ duration: 4 + node.delay, repeat: Infinity, ease: 'easeInOut', delay: node.delay }}
          />
        ))}
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.5em] text-cyan-600 mb-4 dark:text-cyan-300">End-to-End Web Development</p>
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4 dark:text-white">Inline Service Pillars, Zero Clutter</h2>
          <p className="text-slate-500 max-w-3xl mx-auto dark:text-slate-300">
            Tabs trigger magnetic pillars to glide in place—each pillar holds a full pod story with metrics, badges, and a flipping case study token.
          </p>
        </div>

        <div className="flex items-center gap-3 max-w-4xl mx-auto mb-12">
          {TABS.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 rounded-2xl text-sm font-semibold tracking-wide border transition-all ${
                  isActive
                    ? 'text-slate-900 border-cyan-300/70 bg-white shadow-[0_15px_40px_rgba(15,23,42,0.08)] dark:text-white dark:bg-cyan-500/10'
                    : 'text-slate-400 border-slate-200 hover:text-slate-900 hover:border-cyan-300/40 dark:border-white/10 dark:text-slate-400 dark:hover:text-white'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                {tab.label}
              </motion.button>
            );
          })}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {TABS.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <motion.article
                key={tab.id}
                animate={{ flex: isActive ? 1.15 : 0.8, opacity: isActive ? 1 : 0.6 }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                className="group relative rounded-[26px] border px-6 py-8 overflow-hidden flex flex-col justify-between min-h-[420px] bg-white/90 border-slate-200 shadow-[0_25px_80px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/5 dark:backdrop-blur-2xl"
              >
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                >
                  <div className={`absolute inset-0 bg-gradient-to-b ${tab.accent} blur-3xl opacity-70`} />
                </motion.div>

                <div className="relative z-10 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-slate-700 dark:text-white">
                      <div className="w-10 h-10 rounded-2xl border border-slate-200 flex items-center justify-center bg-white dark:border-white/20 dark:bg-white/10">
                        {iconMap[tab.id]}
                      </div>
                      <span className="text-sm uppercase tracking-[0.4em] text-slate-400 dark:text-white/60">Pillar</span>
                    </div>
                    <motion.span
                      className="text-xs font-semibold text-cyan-600 dark:text-cyan-300"
                      animate={{ opacity: isActive ? 1 : 0.4 }}
                    >
                      {isActive ? 'Active' : 'Idle'}
                    </motion.span>
                  </div>

                  <motion.h3
                    className="text-2xl font-black text-slate-900 leading-tight dark:text-white"
                    animate={{ letterSpacing: isActive ? '0.02em' : '0.08em' }}
                    transition={{ duration: 0.4 }}
                  >
                    {tab.headline}
                  </motion.h3>

                  {isActive ? (
                    <>
                      <p className="text-slate-600 text-sm leading-relaxed dark:text-slate-200">{tab.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {tab.badges.map((badge) => (
                          <motion.span
                            key={badge}
                            className="px-3 py-1 rounded-full border border-slate-200 bg-white text-[11px] uppercase tracking-[0.2em] text-cyan-600 dark:border-white/20 dark:bg-transparent dark:text-cyan-100"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            {badge}
                          </motion.span>
                        ))}
                      </div>
                      <div className="space-y-3">
                        {tab.features.slice(0, 3).map((feature) => (
                          <div key={feature} className="flex items-center gap-2 text-sm text-slate-600 dark:text-white/80">
                            <Check className="text-emerald-500 dark:text-emerald-300" size={16} />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <p className="text-slate-500 text-sm leading-relaxed dark:text-slate-400">{tab.description.split('.')[0]}.</p>
                  )}
                </div>

                <div className="relative z-10 pt-6 mt-4 border-t border-slate-200 dark:border-white/10">
                  <div className="flex items-center justify-between text-slate-600 text-xs uppercase tracking-[0.3em] dark:text-white/80">
                    {tab.metrics.map((metric) => (
                      <div key={`${tab.id}-${metric.label}`} className="text-center">
                        <p className="text-[10px] text-slate-400 dark:text-white/50">{metric.label}</p>
                        <p className="text-xl font-bold text-slate-900 dark:text-white">{metric.value}</p>
                        {metric.sublabel && <p className="text-[10px] text-slate-400 dark:text-white/40">{metric.sublabel}</p>}
                      </div>
                    ))}
                  </div>

                  {isActive && (
                    <motion.div
                      className="mt-6 relative h-24 rounded-2xl border border-slate-200 bg-white/70 perspective-1000 shadow-inner dark:border-white/20 dark:bg-white/10"
                      whileHover={{ rotateY: 6 }}
                    >
                      <motion.div
                        className="absolute inset-0 rounded-2xl p-4 flex flex-col justify-between backface-hidden text-slate-800 dark:text-white"
                        whileHover={{ rotateY: 180 }}
                        transition={{ duration: 0.7 }}
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.4em] text-slate-500 dark:text-white/70">Case Study</p>
                          <p className="text-sm font-semibold">{tab.caseStudy.client}</p>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-white/70">{tab.caseStudy.achievement}</p>
                      </motion.div>
                    </motion.div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WebServicesCarousel;
