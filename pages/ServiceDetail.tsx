import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Check, 
  ArrowRight,
  Globe,
  Zap,
  Shield,
  BarChart,
  Server,
  Database,
  Lock,
  Cpu,
  MousePointer2,
  ChevronRight,
  Play,
  TrendingUp,
  MessageCircle,
  Brain,
  Sparkles
} from 'lucide-react';
import { SERVICE_DETAILS, EXTENDED_SERVICE_DATA, SERVICES } from '../constants';
import { useData } from '../context/DataContext';
import * as Icons from 'lucide-react';

import HeroChallenges from '../components/HeroChallenges';
import AppChallenges from '../components/AppChallenges';
import AiHeroWidget from '../components/AiHeroWidget';
import AppMetricsCarousel from '../components/AppMetricsCarousel';
import AppServicesCarousel from '../components/AppServicesCarousel';
import AppTransparentPricing from '../components/AppTransparentPricing';
import CloudDashboard from '../components/CloudDashboard';
import CloudBottlenecks from '../components/CloudBottlenecks';
import CloudHolo from '../components/CloudHolo';
import CloudReliabilityCard from '../components/CloudReliabilityCard';
import CloudTransparentPricing from '../components/CloudTransparentPricing';
import DataHeroWidget from '../components/DataHeroWidget';
import ServiceChallengesSection from '../components/ServiceChallengesSection';
import DataOpsStrip from '../components/DataOpsStrip';
import DataAnalysisCarousel from '../components/DataAnalysisCarousel';
import PerformanceHero from '../components/PerformanceHero';
import PerformancePodium from '../components/PerformancePodium';
import DataPricingShowcase from '../components/DataPricingShowcase';
import WebDevDashboard from '../components/WebDevDashboard';
import { SERVICE_PAGE_CONFIG } from '../config/servicePageConfig';
import ServicesCarousel from '../components/ServicesCarousel';
import ResultsGrid from '../components/ResultsGrid';
import HoloPerf from '../components/HoloPerf';
import AppDevPerf from '../components/AppDevPerf';
import CTALauncher from '../components/CTALauncher';
import WebServicesCarousel from '../components/WebServicesCarousel';
import WebTransparentPricing from '../components/WebTransparentPricing';

const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);
  const [pricingPeriod, setPricingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const { serviceDetails } = useData();

  const service = useMemo(() => {
    if (!id) return null;
    return serviceDetails[id] || SERVICE_DETAILS[id] || SERVICES.find(s => s.id === id);
  }, [id, serviceDetails]);

  const extendedData = useMemo(() => {
    if (!id) return null;
    return EXTENDED_SERVICE_DATA[id];
  }, [id]);

  const faqItems = useMemo(() => {
    if (service?.faqItems && service.faqItems.length) {
      return service.faqItems.map(item => ({
        question: item.question,
        answer: item.answer
      }));
    }
    if (id === 'cloud') {
      return [
        {
          question: 'How long does a full cloud migration take?',
          answer:
            'Most clients complete production migrations in 4-6 weeks. We run assessment and landing zone prep in week 1, dual-run rehearsal by week 3, then a monitored 24h cutover with no downtime.'
        },
        {
          question: 'Can you deploy inside our VPC with our security controls?',
          answer:
            'Yes. We operate within your AWS/Azure/GCP accounts with least-privilege IAM, integrate with your SIEM, and provide artifacts for SOC2/ISO/GDPR reviews.'
        },
        {
          question: 'What does managed operations include after launch?',
          answer:
            'You get a mission-control pod with 24/7 monitoring, weekly FinOps reviews, automated patching, chaos drills, and an on-call SRE who can triage incidents under 30 minutes.'
        },
        {
          question: 'How do you keep cloud costs predictable?',
          answer:
            'We implement tagging, budgets, and anomaly alerts in week 1, then automate rightsizing + savings plans. Teams receive monthly cost reports with optimization playbooks.'
        }
      ];
    }
    if (id === 'app') {
      return [
        {
          question: 'How fast can a ready-to-ship build be delivered?',
          answer:
            'Most launches ship a beta build in 6-8 weeks. Week 1 covers discovery, week 2-4 design + architecture, and week 5-8 production-ready code with QA.'
        },
        {
          question: 'Do you handle native + cross-platform teams?',
          answer:
            'Yes. We assemble Swift/Kotlin or Flutter/React Native pods with shared component libraries, OTA updates, and CI/CD pipelines.'
        },
        {
          question: 'What does ongoing support include?',
          answer:
            'You get release management, crash triage, store compliance updates, UX analytics reviews, and 24/7 monitoring of mission-critical flows.'
        },
        {
          question: 'How do you guarantee design parity across platforms?',
          answer:
            'We ship a living design system, motion specs, and regression snapshots for each OS so iOS, Android, and web stay in lock-step.'
        }
      ];
    }
    if (id === 'data') {
      return [
        {
          question: 'How quickly can you unify our sources into a warehouse?',
          answer:
            'Week 1 covers source discovery and ingestion setup, week 2 lands data into your chosen warehouse with dbt models, and by week 3 we have governed marts ready for dashboards.'
        },
        {
          question: 'Can you plug into the tools we already use?',
          answer:
            'Yes. We connect to CRMs, ERPs, spreadsheets, and SaaS APIs via managed connectors or custom ETL. We keep credentials in your vault and deploy inside your cloud if preferred.'
        },
        {
          question: 'How do you guarantee dashboards stay fresh?',
          answer:
            'Every pipeline ships with freshness monitors, on-call alerts, and automatic backfills. Stakeholders see real-time SLA badges so they know if a metric is up-to-the-minute.'
        },
        {
          question: 'Is our data secure and compliant?',
          answer:
            'Data never leaves your tenancy. We encrypt in transit and at rest, follow SOC2/GDPR playbooks, and provide audit logs plus role-based access so finance, ops, and exec teams see only what they need.'
        }
      ];
    }
    if (id === 'web') {
      return [
        {
          question: 'Can you guarantee Lighthouse + Core Web Vitals targets?',
          answer:
            'Yes. Every sprint ships with LCP, CLS, and TBT budgets plus automated Lighthouse sweeps. We hold 90+ on desktop and mobile before release and keep alerts wired to Slack if drift happens.'
        },
        {
          question: 'Do you manage the deploy pipeline (Vercel/CDN)?',
          answer:
            'We run CI/CD via Vercel + Cloudflare edge deploys, scripted rollbacks, preview URLs, and QA gates. Deploys average 24ms and we handle config, env secrets, and governance.'
        },
        {
          question: 'How do you keep bundles lean as features grow?',
          answer:
            'We enforce per-route code splitting, image orchestration, third-party budgets, and bundle analyzer reports each sprint. No page ships above 50KB without a remediation plan.'
        },
        {
          question: 'What happens after launch?',
          answer:
            'You get a publishing pod for content edits, regression snapshots, and weekly vitals reports. We maintain the design system, frameworks, and dependencies so the site stays blazing fast.'
        }
      ];
    }
    return [
      {
        question: 'How quickly can you launch an automation pilot?',
        answer:
          'Most pilots go live in 3-4 weeks. We audit your stack on week 1, ship a working workflow by week 3, and iterate with your ops team before scaling.'
      },
      {
        question: 'Do you integrate with our existing CRM/ERP tools?',
        answer:
          'Yes. We build on top of HubSpot, Salesforce, Zoho, SAP and custom data warehouses. Our engineers handle auth, API limits, and QA.'
      },
      {
        question: 'What does support look like after launch?',
        answer:
          'You get a dedicated automation lead, weekly optimization calls, and 24/7 monitoring for mission-critical flows. Most issues are resolved in under 2 hours.'
      },
      {
        question: 'Is my data secure with your AI stack?',
        answer:
          'We follow SOC2 playbooks, encrypt data in transit and at rest, and can deploy in your VPC if preferred. No training data is reused across clients.'
      }
    ];
  }, [id, service]);

  const pageRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: pageRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const node = pageRef.current;
    if (!node) return;
    if (window.getComputedStyle(node).position === 'static') {
      node.style.position = 'relative';
    }
  }, []);

  if (!service || !extendedData) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Service Not Found</h1>
          <button onClick={() => navigate('/services')} className="text-blue-400 hover:text-blue-300">
            ← Back to Services
          </button>
        </div>
      </div>
    );
  }

  // Generate fake pricing tiers based on the base price
  const basePriceNum = parseInt(service.price.replace(/\D/g, '')) || 3000;
  const pricingTiers = [
    {
      name: 'Starter',
      price: pricingPeriod === 'monthly' ? Math.floor(basePriceNum * 0.6) : Math.floor(basePriceNum * 0.6 * 10),
      desc: 'Essential features for small teams.',
      features: extendedData.includedFeatures.slice(0, 4),
      highlight: false
    },
    {
      name: 'Growth',
      price: pricingPeriod === 'monthly' ? basePriceNum : basePriceNum * 10,
      desc: 'Perfect for scaling businesses.',
      features: extendedData.includedFeatures.slice(0, 8),
      highlight: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      desc: 'For large-scale organizations.',
      features: [...extendedData.includedFeatures, 'Dedicated Support', 'SLA', 'Custom Integrations'],
      highlight: false
    }
  ];

  const IconComponent = Icons[service.icon as keyof typeof Icons] as React.ComponentType<any> || Globe;
  const heroContent = service.heroContent ?? {
    badge: '',
    headline: '',
    highlight: '',
    description: '',
    stats: []
  };
  const heroBadge = heroContent.badge || 'New Release';
  const heroHeadline = heroContent.headline || 'Scale Faster with';
  const heroHighlight = heroContent.highlight || service.title;
  const heroDescription =
    heroContent.description || service.tagline || service.description || service.longDescription || extendedData.solution;

  return (
    <div ref={pageRef} className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-900 font-sans selection:bg-blue-500/30 dark:from-[#020617] dark:via-[#030c2b] dark:to-[#050e30] dark:text-slate-300">
      
      {/* 1. HERO SECTION */}
      {id === 'data' ? (
        <DataHeroWidget />
      ) : (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden text-slate-900 dark:text-white">
          {/* Background Effects */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-blue-200 blur-[120px] dark:bg-blue-600/10" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-200 blur-[100px] dark:bg-purple-600/10" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              
              {/* Left Content */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  {heroBadge}
                </motion.div>
                
                <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6 dark:text-white">
                  {heroHeadline} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
                    {heroHighlight}
                  </span>
                </h1>
                
                <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed max-w-lg">
                  {heroDescription}
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-8 py-4 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 hover:opacity-95 text-slate-900 rounded-lg font-semibold transition-all shadow-[0_0_20px_rgba(37,99,235,0.25)]"
                  >
                    Get Started
                  </button>
                  <button
                    onClick={() => navigate('/contact')}
                    className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-lg font-semibold transition-all hover:bg-slate-50 dark:bg-slate-800/50 dark:hover:bg-slate-800 dark:text-white dark:border-slate-700"
                  >
                    Talk to Sales
                  </button>
                </div>

                <div className="mt-10 flex items-center gap-6 text-sm font-medium text-slate-500 dark:text-slate-500">
                  <div className="flex items-center gap-2">
                    <Check className="text-emerald-400" size={16} />
                    99.99% Uptime
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="text-emerald-400" size={16} />
                    SOC2 Compliant
                  </div>
                </div>
              </motion.div>

              {/* Right Visual */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                {id === 'ai' ? (
                  <AiHeroWidget stats={heroContent.stats} />
                ) : id === 'app' ? (
                  <AppMetricsCarousel />
                ) : id === 'cloud' ? (
                  <CloudDashboard />
                ) : id === 'web' ? (
                  <div className="flex justify-center">
                    <WebDevDashboard />
                  </div>
                ) : (
                  <div className="relative aspect-square max-w-[500px] mx-auto">
                    {/* Card Container simulating the globe container */}
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-800/40 to-slate-900/40 rounded-3xl border border-slate-700/50 backdrop-blur-sm overflow-hidden">
                      {/* Abstract Animated Elements */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          className="w-[80%] h-[80%] rounded-full border border-blue-500/20 border-dashed"
                        />
                        <motion.div 
                          animate={{ rotate: -360 }}
                          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                          className="absolute w-[60%] h-[60%] rounded-full border border-purple-500/20 border-dashed"
                        />
                        <IconComponent size={120} className="text-blue-500/80 drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]" />
                      </div>
                      
                      {/* Floating Stats Cards */}
                      <motion.div 
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="absolute bottom-8 left-8 bg-slate-900/90 border border-slate-700 p-4 rounded-xl backdrop-blur-md shadow-xl min-w-[180px]"
                      >
                        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-slate-400 mb-3">
                          <span className="px-2 py-1 rounded-full bg-white/5 text-white/80 tracking-[0.2em]">iOS/Android</span>
                        </div>
                        <div className="text-xs text-slate-400 mb-1">Total Downloads</div>
                        <div className="text-2xl font-bold text-white">+24k Installs</div>
                        <div className="text-xs text-emerald-400 flex items-center gap-1">
                          <Zap size={12} /> +12%
                        </div>
                      </motion.div>

                      <motion.div 
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="absolute bottom-8 right-8 bg-slate-900/90 border border-slate-700 p-4 rounded-xl backdrop-blur-md shadow-xl min-w-[180px]"
                      >
                        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-slate-400 mb-3">
                          <span />
                          <span className="px-2 py-1 rounded-full bg-white/5 text-white/80 tracking-[0.2em]">Firebase Backend</span>
                        </div>
                        <div className="text-xs text-slate-400 mb-1">Crash-Free Users</div>
                        <div className="text-2xl font-bold text-white">99.9%</div>
                        <div className="w-24 h-1 bg-slate-700 rounded-full mt-2 overflow-hidden">
                          <div className="w-[99%] h-full bg-emerald-500" />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* 2. CHALLENGES GRID - Conditional Render */}
      {service.challengeContent?.cards?.length ? (
        <HeroChallenges content={service.challengeContent} />
      ) : id === 'ai' ? (
        <HeroChallenges />
      ) : id === 'app' ? (
        <AppChallenges />
      ) : id === 'cloud' ? (
        <CloudBottlenecks />
      ) : id === 'data' ? (
        <DataOpsStrip />
      ) : (
        <ServiceChallengesSection
          data={
            SERVICE_PAGE_CONFIG[id ?? '']?.challenges ?? {
              badgeLabel: 'Challenges',
              title: `${service.title} Challenges We Solve`,
              subtitle: extendedData.tagline ?? 'We remove bottlenecks so teams can launch faster.',
              cards: [
                {
                  icon: 'Zap',
                  title: 'Performance Debt',
                  body: 'Modernize your stack to meet enterprise SLAs.',
                  badge: 'Impact: +30% velocity',
                  glow: 'from-cyan-500/30 via-blue-500/20 to-transparent'
                },
                {
                  icon: 'Shield',
                  title: 'Security Gaps',
                  body: 'Zero-trust reference architectures baked in.',
                  badge: 'Impact: 0 critical alerts',
                  glow: 'from-emerald-500/25 via-teal-500/20 to-transparent'
                },
                {
                  icon: 'TrendingUp',
                  title: 'Scaling Chaos',
                  body: 'Automation-first pipelines keep launches predictable.',
                  badge: 'Impact: 50% faster ship',
                  glow: 'from-purple-500/25 via-pink-500/20 to-transparent'
                }
              ]
            }
          }
        />
      )}

      {/* 3. INTERACTIVE FEATURES (Tabbed) */}
      {id === 'ai' ? (
        <>
          <ServicesCarousel />
          <ResultsGrid />
        </>
      ) : id === 'app' ? (
        <AppServicesCarousel />
      ) : id === 'web' ? (
        <WebServicesCarousel />
      ) : id === 'cloud' ? (
        <CloudHolo />
      ) : id === 'data' ? (
        <DataAnalysisCarousel />
      ) : (
        <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-900 dark:bg-[#020617] dark:text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
              <div className="lg:w-1/3">
                <h2 className="text-3xl font-bold text-slate-900 mb-8 dark:text-white">End-to-End {service.title} Services</h2>
                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveFeature(idx)}
                      className={`w-full text-left px-6 py-4 rounded-xl transition-all duration-300 flex items-center justify-between group border ${
                        activeFeature === idx 
                          ? 'bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 text-slate-900 shadow-lg border-transparent dark:text-white' 
                          : 'bg-white text-slate-500 hover:bg-slate-100 border-slate-200 dark:bg-transparent dark:text-slate-400 dark:hover:bg-slate-800 dark:border-slate-700'
                      }`}
                    >
                      <span className="font-medium">{feature}</span>
                      {activeFeature === idx && <ChevronRight size={16} />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="lg:w-2/3">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFeature}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-3xl p-8 lg:p-12 border border-slate-200 h-full relative overflow-hidden shadow-xl dark:bg-[#0f172a] dark:border-slate-800"
                  >
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-6 text-blue-500 dark:bg-blue-500/20 dark:text-blue-400">
                        <Zap size={24} />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-4 dark:text-white">{service.features[activeFeature]}</h3>
                      <p className="text-slate-600 mb-8 leading-relaxed text-lg dark:text-slate-400">
                        Accelerate your {service.title.toLowerCase()} capabilities with our proven {service.features[activeFeature].toLowerCase()} methodology.
                        We ensure seamless integration and maximum efficiency.
                      </p>
                      
                      <div className="grid sm:grid-cols-2 gap-4 mb-8 text-slate-600 dark:text-slate-300">
                        {['Zero Downtime', 'Audit Compliant', 'Cost Analysis', '24/7 Support'].map((item, i) => (
                          <div key={i} className="flex items-center gap-3 text-sm">
                            <Check className="text-emerald-500 dark:text-emerald-400" size={16} />
                            {item}
                          </div>
                        ))}
                      </div>

                      <div className="bg-slate-100 rounded-xl p-6 border border-slate-200 flex items-center gap-4 dark:bg-slate-900/50 dark:border-slate-800">
                        <div className="w-16 h-16 rounded-lg bg-white flex-shrink-0 flex items-center justify-center dark:bg-slate-800">
                          <Server className="text-slate-500" />
                        </div>
                        <div>
                          <div className="text-sm text-blue-500 font-medium mb-1 dark:text-blue-400">Case Study: FinTech Corp</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">Migrated 50TB of sensitive data in 48 hours.</div>
                        </div>
                        <button className="ml-auto text-blue-500 text-sm hover:underline dark:text-blue-400">Read Story</button>
                      </div>
                    </div>
                    
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200 blur-[80px] dark:bg-blue-600/5" />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. PROCESS / STRATEGY */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-slate-100 text-slate-900 dark:bg-[#0B1121] dark:bg-none dark:text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 dark:text-white">Our 4-Step Deployment Strategy</h2>
            <p className="text-slate-500 dark:text-slate-400">A proven methodology to get you running fast.</p>
          </div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-16 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-200 to-transparent dark:via-slate-800" />

            <div className="grid md:grid-cols-4 gap-8 relative z-10">
              {service.process.map((step, idx) => (
                <div key={idx} className="text-center group">
                  <div className="w-20 h-20 mx-auto bg-white/90 border-2 border-slate-200 rounded-full flex items-center justify-center text-slate-500 mb-6 shadow-[0_10px_40px_rgba(15,23,42,0.12)] group-hover:border-blue-500 group-hover:text-blue-600 transition-colors relative dark:bg-[#0B1121] dark:border-slate-700 dark:text-slate-400 dark:group-hover:text-white">
                    <span className="text-xl font-bold">{idx + 1}</span>
                    {activeFeature === idx && (
                      <span className="absolute inset-0 rounded-full border-2 border-blue-500 animate-ping opacity-40" />
                    )}
                  </div>
                  <div className="bg-white/80 border border-slate-200 rounded-2xl px-4 py-6 shadow-sm backdrop-blur dark:bg-[#0f172a]/60 dark:border-slate-800">
                    <h3 className="text-lg font-bold text-slate-900 mb-2 dark:text-white">{step.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed px-2 dark:text-slate-400">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. PERFORMANCE BANNER */}
      {id === 'ai' ? (
        <HoloPerf />
      ) : id === 'app' ? (
        <AppDevPerf />
      ) : id === 'cloud' ? (
        <CloudReliabilityCard />
      ) : id === 'data' ? (
        <PerformanceHero />
      ) : (
        <PerformancePodium />
      )}

      {/* 6. PRICING / CTA */}
      {service.ctaContent?.cards?.length || service.ctaContent?.banner ? (
        <div id="pricing">
          <CTALauncher content={service.ctaContent} />
        </div>
      ) : id === 'ai' ? (
        <div id="pricing">
          <CTALauncher />
        </div>
      ) : id === 'app' ? (
        <AppTransparentPricing />
      ) : id === 'cloud' ? (
        <CloudTransparentPricing />
      ) : id === 'data' ? (
        <DataPricingShowcase />
      ) : id === 'web' ? (
        <WebTransparentPricing />
      ) : (
        <section id="pricing" className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-900 dark:bg-[#0B1121] dark:text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 dark:text-white">Transparent Pricing</h2>
              <p className="text-slate-500 mb-8 dark:text-slate-400">Choose the perfect plan for your infrastructure needs.</p>
              
              <div className="inline-flex bg-white rounded-full p-1 border border-slate-200 dark:bg-slate-900 dark:border-slate-800">
                <button 
                  onClick={() => setPricingPeriod('monthly')}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    pricingPeriod === 'monthly' ? 'bg-blue-500 text-white shadow' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  Monthly
                </button>
                <button 
                  onClick={() => setPricingPeriod('yearly')}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    pricingPeriod === 'yearly' ? 'bg-blue-500 text-white shadow' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  Yearly <span className="text-xs text-blue-400 ml-1">(Save 20%)</span>
                </button>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {pricingTiers.map((tier, index) => (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`rounded-2xl border p-8 flex flex-col gap-6 transition-all bg-white text-slate-900 border-slate-200 shadow-lg dark:border-slate-800 dark:bg-slate-900 ${
                    tier.highlight ? 'ring-2 ring-blue-400/70 scale-[1.01] dark:shadow-[0_0_30px_rgba(59,130,246,0.35)]' : 'hover:border-blue-500/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-1 dark:text-white">{tier.name}</h3>
                      <p className="text-blue-500 text-sm dark:text-blue-400">{tier.desc}</p>
                    </div>
                    {tier.highlight && (
                      <span className="px-3 py-1 text-xs uppercase tracking-wide bg-blue-500/15 text-blue-500 rounded-full border border-blue-500/30 dark:bg-blue-500/20 dark:text-blue-300">
                        Popular
                      </span>
                    )}
                  </div>
                  {typeof tier.price === 'number' && (
                    <div className="text-4xl font-black text-slate-900 dark:text-white">
                      RM {tier.price.toLocaleString()}
                    </div>
                  )}
                  <ul className="space-y-3 text-slate-600 text-sm dark:text-slate-300">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-300">
                          <Check size={16} />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="mt-auto bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 text-slate-900 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 dark:text-white">
                    Select Plan <ArrowRight size={16} />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. FAQ */}
      <section className="py-20 border-t border-slate-200 bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-900 dark:border-slate-800 dark:bg-[#020617] dark:bg-none dark:text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.4em] text-blue-500 mb-3 dark:text-blue-400">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 dark:text-white">Questions we hear every week</h2>
            <p className="text-slate-500 max-w-2xl mx-auto dark:text-slate-400">
              Straight answers on scoping, automation, and support so decision makers can move fast.
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <div
                key={item.question}
                className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-lg hover:shadow-xl transition-all duration-300 dark:border-slate-800 dark:bg-slate-900/40"
              >
                <div className="flex items-start gap-4">
                  <span className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center font-semibold dark:text-blue-400">
                    {idx + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2 dark:text-white">{item.question}</h3>
                    <p className="text-slate-500 leading-relaxed dark:text-slate-400">{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default ServiceDetail;
