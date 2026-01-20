import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { cn } from '@/lib/utils';
import { useData } from '../context/DataContext';
import { HoverBorderGradient } from '../components/HoverBorderGradient';
import 'swiper/css';
import 'swiper/css/autoplay';
// Import founder image
import founderPortrait from '../src/assets/founder.jpg';
import { DEFAULT_ABOUT_PAGE_SETTINGS } from '../constants';
import {
  ArrowRight,
  Award,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Compass,
  Globe,
  Handshake,
  MapPin,
  MessageCircle,
  Rocket,
  Shield,
  Sparkles,
  Star,
  Target,
  Zap,
  Linkedin,
  MessageSquare,
  Share2,
  Plus,
  Download,
  Github,
  BookOpen,
  BarChart3,
  User,
  Brain,
  Server,
  Eye,
  DollarSign,
  Wrench,
  Instagram,
} from 'lucide-react';

const interactiveCards = [
  {
    title: 'Hands-on Operators',
    highlight: 'We build, ship & iterate with you.',
    desc: 'Embedded with your team until workflows run on their own.',
    icon: <Wrench className="h-11 w-11 text-sky-300" />,
    spin: 360,
  },
  {
    title: 'SME-First Playbooks',
    highlight: 'Built for Malaysian SMEs, not unicorns.',
    desc: 'Battle-tested on local tools, budgets, and hiring realities.',
    icon: <BookOpen className="h-11 w-11 text-emerald-300" />,
    spin: -360,
  },
  {
    title: 'Transparent Outcomes',
    highlight: '20h/week saved → RMxx extra margin.',
    desc: 'Every project scoped with crystal-clear before/after metrics.',
    icon: <BarChart3 className="h-11 w-11 text-fuchsia-300" />,
    spin: 360,
  },
  {
    title: 'Small Team, Big Leverage',
    highlight: 'Founder-led on every engagement.',
    desc: 'Direct access to the people designing and shipping your stack.',
    icon: <User className="h-11 w-11 text-cyan-300" />,
    spin: -360,
  },
];

// legacy alias to avoid old references during hot reload
const heroServices = interactiveCards;

const InteractiveCard: React.FC<{
  card: (typeof interactiveCards)[number];
  index: number;
  isDark: boolean;
  compact?: boolean;
}> = ({ card, index, isDark, compact = false }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltY, { stiffness: 80, damping: 20 });
  const rotateY = useSpring(tiltX, { stiffness: 80, damping: 20 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPercent = ((event.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((event.clientY - rect.top) / rect.height) * 100;
    setGlow({ x: xPercent, y: yPercent });

    const relativeX = xPercent / 100 - 0.5;
    const relativeY = yPercent / 100 - 0.5;
    tiltX.set(relativeX * 12);
    tiltY.set(-relativeY * 12);
    if (!isHovering) setIsHovering(true);
  };

  const baseClasses = isDark
    ? 'border-white/10 bg-gradient-to-b from-white/5 via-white/0 to-transparent text-white/90'
    : 'border-slate-200/80 bg-white/95 text-slate-900 shadow-xl';

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        tiltX.set(0);
        tiltY.set(0);
        setIsHovering(false);
      }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: index * 0.12, duration: 0.6, type: 'spring' }}
      className={cn(
        'group relative w-full overflow-hidden rounded-3xl border-2 transition-all duration-500',
        compact ? 'flex h-full min-h-[190px] flex-col justify-between px-5 py-6 shadow-xl' : 'min-h-[190px] p-5',
        'backdrop-blur-xl hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(59,130,246,0.25)]',
        'cursor-pointer',
        baseClasses,
      )}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        initial={{ scale: 0.9 }}
        whileHover={{ scale: 1 }}
      >
        <motion.div
          className="absolute inset-0 rounded-2xl blur-xl"
          style={{
            background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(59,130,246,0.35), transparent 60%)`,
          }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 0.3 }}
        />
        <Sparkles className="absolute right-4 top-4 h-4 w-4 text-sky-400 animate-pulse" />
      </motion.div>
      <motion.span
        className="pointer-events-none absolute h-3 w-3 rounded-full bg-sky-300/80 blur-[1px]"
        style={{ left: `${glow.x}%`, top: `${glow.y}%`, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: isHovering ? 1 : 0 }}
      />
      <motion.div
        className={cn(
          'relative z-10 mb-4 inline-flex rounded-2xl bg-white/5 text-white',
          compact ? 'p-1.5' : 'p-2',
        )}
      >
        {card.icon}
      </motion.div>
      <h3 className="relative z-10 text-base font-semibold leading-tight">{card.title}</h3>
      <div className="relative z-10 mt-2 text-lg font-black text-transparent drop-shadow-lg">
        <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-fuchsia-400 bg-clip-text">
          {card.highlight}
        </span>
      </div>
      <p
        className={cn(
          'relative z-10 mt-2 text-xs transition-opacity duration-500 group-hover:text-white',
          isDark ? 'text-slate-400/90' : 'text-slate-500',
        )}
      >
        {card.desc}
      </p>
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-radial from-white/10 via-transparent to-transparent" />
      </div>
    </motion.div>
  );
};

const PrinciplesSection = () => {
  const container = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.95 },
    show: (index: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: 0.3 + index * 0.12, duration: 0.45, ease: 'easeOut' },
    }),
  };

  return (
    <section className="relative w-full py-20">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
        className="relative mx-auto max-w-6xl px-4 sm:px-6"
      >
        <div className="principles-shell relative overflow-hidden rounded-[44px] border border-white/20 px-6 py-14 shadow-[0_25px_80px_rgba(10,15,30,0.55)] dark:border-white/10 sm:px-12">
          <div className="relative z-10 space-y-4 text-center text-slate-900 dark:text-white">
            <p className="text-xs uppercase tracking-[0.5em] text-purple-500/90 dark:text-purple-300">What Guides Every Build</p>
            <h2 className="text-3xl font-black text-slate-900 drop-shadow-[0_0_25px_rgba(168,85,247,0.45)] dark:text-white sm:text-4xl">
              Principles powering every AI/web/cloud project for Malaysian SMEs.
            </h2>
            <p className="mx-auto max-w-3xl text-base text-slate-600 dark:text-slate-200">
              Principles powering every AI/web/cloud project for Malaysian SMEs.
            </p>
          </div>

          <div className="relative z-10 mt-12 grid gap-6 sm:grid-cols-2">
            {guidingPrinciples.map((principle, idx) => (
              <motion.article
                key={principle.title}
                custom={idx}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="group relative overflow-hidden rounded-3xl border border-white/15 bg-white/75 p-6 text-left text-slate-900 shadow-[0_15px_45px_rgba(15,23,42,0.2)] backdrop-blur-2xl dark:border-purple-500/40 dark:bg-white/5 dark:text-white"
                aria-label={principle.title}
              >
                <div className="absolute inset-0 rounded-3xl border border-purple-500/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:border-purple-400/50" />
                <div className="relative z-10 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/80 to-indigo-500/80 text-white shadow-[0_0_25px_rgba(147,51,234,0.4)] dark:from-purple-600/90 dark:to-indigo-500/90">
                    <principle.Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold">{principle.title}</h3>
                </div>
                <p className="relative z-10 mt-3 text-sm text-slate-600 dark:text-slate-200">{principle.body}</p>
                <span className="relative z-10 mt-4 block h-[3px] w-full rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-400 to-cyan-400 opacity-70 transition group-hover:opacity-100" />
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
                  animate={{ opacity: [0, 0.55, 0], scale: [0.95, 1, 1.02] }}
                  transition={{ repeat: Infinity, repeatType: 'loop', duration: 6, delay: idx * 0.25 }}
                >
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/15 via-transparent to-cyan-500/15 blur-3xl" />
                </motion.div>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
const BackgroundLines: React.FC<{ children: React.ReactNode; isDark: boolean }> = ({ children, isDark }) => (
  <div
    className={`relative h-screen min-h-[100vh] w-full overflow-hidden ${
      isDark ? 'bg-black text-white' : 'bg-[#eef2ff] text-slate-900'
    }`}
  >
    <LinesSVG isDark={isDark} />
    <div className="absolute inset-0 z-20 flex items-center justify-center px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto grid h-full w-full max-w-7xl items-center gap-10 lg:gap-12 lg:grid-cols-12">
        {children}
      </div>
    </div>
  </div>
);

const LinesSVG = ({ isDark }: { isDark: boolean }) => (
  <div className="absolute inset-0">
    <svg
      className="h-full w-full"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="lineStroke" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={isDark ? '#3b82f6' : '#6366f1'} stopOpacity={isDark ? 0.1 : 0.2} />
          <stop offset="50%" stopColor={isDark ? '#6366f1' : '#a855f7'} stopOpacity={isDark ? 0.45 : 0.65} />
          <stop offset="100%" stopColor={isDark ? '#8b5cf6' : '#3b82f6'} stopOpacity={isDark ? 0.1 : 0.2} />
        </linearGradient>
        <radialGradient id="pulseGlow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor={isDark ? '#4338ca' : '#c7d2fe'} stopOpacity={isDark ? 0.4 : 0.7} />
          <stop offset="100%" stopColor={isDark ? '#020617' : '#eef2ff'} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1600" height="900" fill="url(#pulseGlow)" />

      {Array.from({ length: 14 }).map((_, idx) => {
        const offset = idx * 60;
        return (
          <motion.line
            key={`h-${idx}`}
            x1="0"
            y1={offset}
            x2="1600"
            y2={offset + 80}
            stroke="url(#lineStroke)"
            strokeWidth="0.6"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 3.5, repeat: Infinity, repeatType: 'reverse', delay: idx * 0.15 }}
          />
        );
      })}

      {Array.from({ length: 8 }).map((_, idx) => {
        const offset = idx * 120;
        return (
          <motion.line
            key={`v-${idx}`}
            x1={offset}
            y1="0"
            x2={offset + 120}
            y2="900"
            stroke="url(#lineStroke)"
            strokeWidth="0.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.25 }}
            transition={{ duration: 4.8, repeat: Infinity, repeatType: 'reverse', delay: idx * 0.2 }}
          />
        );
      })}
    </svg>
    <div
      className={`pointer-events-none absolute inset-x-0 top-0 h-1/3 ${
        isDark
          ? 'bg-gradient-to-b from-black via-black/10 to-transparent'
          : 'bg-gradient-to-b from-white via-white/60 to-transparent'
      }`}
    />
    <div
      className={`pointer-events-none absolute inset-x-0 bottom-0 h-1/3 ${
        isDark
          ? 'bg-gradient-to-t from-black via-black/20 to-transparent'
          : 'bg-gradient-to-t from-white via-white/70 to-transparent'
      }`}
    />
  </div>
);

const HeroSection = () => {
  const { aboutPageSettings } = useData();
  const [isDark, setIsDark] = useState(() => {
    if (typeof document === 'undefined') return true;
    return document.documentElement.classList.contains('dark');
  });
  const [isMobileCarousel, setIsMobileCarousel] = useState(false);

  const heroMessages = useMemo(() => {
    const messages = aboutPageSettings?.heroMessages?.filter((msg) => msg && msg.trim());
    if (messages && messages.length) return messages;
    return DEFAULT_ABOUT_PAGE_SETTINGS.heroMessages;
  }, [aboutPageSettings]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const updateTheme = () => setIsDark(document.documentElement.classList.contains('dark'));
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const [messageIndex, setMessageIndex] = useState(0);
  const [typedMessage, setTypedMessage] = useState(() => heroMessages[0] ?? '');

  useEffect(() => {
    setMessageIndex(0);
    setTypedMessage(heroMessages[0] ?? '');
  }, [heroMessages]);

  useEffect(() => {
    if (!heroMessages.length) {
      setTypedMessage('');
      return;
    }
    const message = heroMessages[messageIndex % heroMessages.length] ?? '';
    let charIndex = 0;
    setTypedMessage('');

    const typeInterval = window.setInterval(() => {
      charIndex += 1;
      setTypedMessage(message.slice(0, charIndex));
      if (charIndex >= message.length) {
        window.clearInterval(typeInterval);
      }
    }, 40);

    const holdTimeout = window.setTimeout(() => {
      setMessageIndex((prev) => (prev + 1) % heroMessages.length);
    }, message.length * 40 + 2200);

    return () => {
      window.clearInterval(typeInterval);
      window.clearTimeout(holdTimeout);
    };
  }, [messageIndex, heroMessages]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(max-width: 1023px)');
    const update = () => setIsMobileCarousel(mediaQuery.matches);
    update();
    mediaQuery.addEventListener?.('change', update);
    mediaQuery.addListener?.(update);
    return () => {
      mediaQuery.removeEventListener?.('change', update);
      mediaQuery.removeListener?.(update);
    };
  }, []);

  return (
    <section className="relative isolate">
      <BackgroundLines isDark={isDark}>
        <div className="order-2 w-full lg:order-2 lg:col-span-5">
          <div className="hidden gap-4 lg:grid lg:grid-cols-2">
            {interactiveCards.map((card, idx) => (
              <InteractiveCard key={card.title} card={card} index={idx} isDark={isDark} />
            ))}
          </div>
          <div className="lg:hidden flex w-full flex-col items-center">
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              loop
              slidesPerView={1}
              spaceBetween={0}
              className="h-64 w-full max-w-sm"
            >
              {interactiveCards.map((card, idx) => (
                <SwiperSlide key={card.title} className="!flex !h-full !w-full items-center justify-center px-3">
                  <InteractiveCard card={card} index={idx} isDark={isDark} compact />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <motion.div
          className="order-1 w-full space-y-6 text-left lg:order-1 lg:col-span-7"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
            <HoverBorderGradient
              containerClassName={`w-fit rounded-full border border-white/30 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.35em] sm:text-[10px] sm:tracking-[0.4em] ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
              className={isDark ? 'bg-black/60 text-white' : 'bg-white text-slate-900'}
              as="div"
            >
              About Us
            </HoverBorderGradient>
          </motion.div>
          <div className="space-y-2 sm:space-y-4">
            <motion.h1
              className={`text-3xl font-black leading-tight drop-shadow-2xl sm:text-4xl lg:text-5xl xl:text-6xl ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
            >
              {aboutPageSettings.heroTitle || DEFAULT_ABOUT_PAGE_SETTINGS.heroTitle}
            </motion.h1>
            <motion.h2
              className="text-3xl font-black leading-tight text-transparent drop-shadow-2xl sm:text-4xl lg:text-5xl xl:text-6xl"
              style={{ backgroundImage: 'linear-gradient(105deg,#3b82f6,#6366f1,#8b5cf6)', WebkitBackgroundClip: 'text' }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {aboutPageSettings.heroHighlight || DEFAULT_ABOUT_PAGE_SETTINGS.heroHighlight}
            </motion.h2>
          </div>
          <p
            className={`flex min-h-[3rem] w-full max-w-md flex-col gap-1 text-base font-semibold leading-snug drop-shadow-lg sm:flex-row sm:items-center sm:gap-3 sm:text-lg lg:max-w-xl lg:text-2xl ${
              isDark ? 'text-gray-200' : 'text-slate-700'
            }`}
          >
            <span>{typedMessage}</span>
            <span className="h-4 w-[2px] self-center animate-pulse bg-gradient-to-b from-sky-400 to-transparent sm:self-auto" />
          </p>
          <div className="flex flex-col items-start gap-3 pt-4 sm:flex-row sm:items-stretch sm:justify-start">
            <motion.a
              href={aboutPageSettings.heroPrimaryCtaLink || DEFAULT_ABOUT_PAGE_SETTINGS.heroPrimaryCtaLink}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.03, y: -2 }}
              className="w-full max-w-xs rounded-2xl bg-gradient-to-r from-sky-500 to-blue-700 px-6 py-4 text-base font-semibold text-white shadow-xl shadow-blue-900/40 transition-all sm:max-w-sm sm:flex-1 lg:max-w-[260px] text-center"
            >
              {aboutPageSettings.heroPrimaryCtaLabel || DEFAULT_ABOUT_PAGE_SETTINGS.heroPrimaryCtaLabel}
            </motion.a>
            <motion.a
              href={aboutPageSettings.heroSecondaryCtaLink || DEFAULT_ABOUT_PAGE_SETTINGS.heroSecondaryCtaLink}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.03 }}
              className={`w-full max-w-xs rounded-2xl border px-6 py-4 text-base font-semibold transition-all sm:max-w-sm sm:flex-1 lg:max-w-[260px] text-center ${
                isDark
                  ? 'border-white/40 text-white hover:bg-white/10'
                  : 'border-slate-900/20 text-slate-900 hover:bg-slate-900/5'
              }`}
            >
              {aboutPageSettings.heroSecondaryCtaLabel || DEFAULT_ABOUT_PAGE_SETTINGS.heroSecondaryCtaLabel}
            </motion.a>
          </div>
        </motion.div>
      </BackgroundLines>

      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-4 flex flex-col items-center text-[10px] font-semibold uppercase tracking-[0.4em]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.85, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <span className={isDark ? 'text-white/70' : 'text-slate-700/80'}>Scroll Down</span>
        <motion.span
          className="mt-2 flex h-10 w-[2px] items-start justify-center overflow-hidden rounded-full bg-white/20"
          animate={{ height: ['28px', '12px', '28px'] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <span className="block h-3 w-full rounded-full bg-gradient-to-b from-sky-400 to-transparent" />
        </motion.span>
      </motion.div>
    </section>
  );
};

const missionMetrics = [
  { value: '120 Ops', label: 'Critical workflows automated', accent: 'from-purple-400 via-fuchsia-400 to-purple-600' },
  { value: '40%+', label: 'Ops cost reduction avg.', accent: 'from-cyan-400 via-emerald-400 to-cyan-500' },
  { value: '3x Faster', label: 'Automation deployment speed', accent: 'from-indigo-400 via-purple-400 to-sky-400' },
];

const guidingPrinciples = [
  {
    title: 'Automation First',
    body: 'AI streamlines ops so you grow faster.',
    Icon: Rocket,
  },
  {
    title: 'Transparency Always',
    body: 'Clear pricing/updates, no SME surprises.',
    Icon: Eye,
  },
  {
    title: 'Local First',
    body: 'Built for Malaysia markets and regulations.',
    Icon: MapPin,
  },
  {
    title: 'Security Guaranteed',
    body: 'Enterprise-grade data protection 24/7.',
    Icon: Shield,
  },
];

const MissionSection = () => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltY, { stiffness: 70, damping: 18 });
  const rotateY = useSpring(tiltX, { stiffness: 70, damping: 18 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width - 0.5;
    const relY = (event.clientY - rect.top) / rect.height - 0.5;
    tiltX.set(relX * 15);
    tiltY.set(-relY * 15);
  };

  const resetTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  const missionVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  const metricVariants = {
    hidden: { opacity: 0, y: 18 },
    show: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.35 + index * 0.15, duration: 0.5 },
    }),
  };

  return (
    <section className="neon-circuit-bg relative w-full overflow-hidden py-20 text-slate-900 dark:text-white">
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-4 sm:px-6">
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={resetTilt}
          style={{ rotateX, rotateY, transformPerspective: 1600 }}
          variants={missionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="glass-mission-card w-full p-[2px]"
          aria-label="Aurexis Solution mission statement"
        >
          <div className="relative z-10 rounded-[32px] border border-white/10 bg-white/70 p-6 text-left text-slate-900 shadow-[0_20px_80px_rgba(2,6,23,0.08)] dark:border-white/5 dark:bg-white/5 dark:text-white sm:p-10">
            <div className="relative flex flex-col gap-6">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="flex flex-col gap-4 text-left"
              >
                <div className="inline-flex items-center gap-3 rounded-full border border-purple-500/40 bg-purple-500/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-purple-600 dark:text-purple-200">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                  Our Mission
                </div>
                <h2 className="text-3xl font-black leading-tight text-slate-900 dark:text-white sm:text-4xl">
                  Democratize enterprise-grade tech for Malaysian SMEs.
                </h2>
                <p className="text-base text-slate-600 dark:text-slate-200 sm:text-lg">
                  We embed AI operators, ship modern web experiences, and harden cloud stacks with startup-friendly pricing—helping 50+ clients cut
                  40% ops cost while scaling workloads 3× faster.
                </p>
              </motion.div>

              <div className="grid w-full gap-4 sm:grid-cols-3">
                {missionMetrics.map((metric, index) => (
                  <motion.div
                    key={metric.value}
                    custom={index}
                    variants={metricVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="group relative overflow-hidden rounded-2xl border border-white/40 bg-white/50 px-4 py-5 text-left shadow-[inset_0_1px_6px_rgba(255,255,255,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
                  >
                    <div className="text-2xl font-extrabold text-slate-900 dark:text-white">{metric.value}</div>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-white/60">{metric.label}</p>
                    <span
                      className={`mt-4 block h-[2px] w-full rounded-full bg-gradient-to-r ${metric.accent} transition-all duration-500 group-hover:scale-x-105`}
                    />
                  </motion.div>
                ))}
              </div>

              <motion.button
                className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-emerald-400 bg-emerald-400/15 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700 transition hover:bg-emerald-400/25 dark:border-emerald-300/80 dark:bg-transparent dark:text-emerald-200"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle className="h-4 w-4" />
                Ready to scale? WhatsApp us
              </motion.button>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="pointer-events-none absolute -left-10 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-purple-500/40 blur-[90px] dark:bg-purple-600/50"
            />
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="pointer-events-none absolute -bottom-8 right-6 h-28 w-28 rounded-full bg-cyan-400/50 blur-[100px]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const OurStorySection = () => {
  const { aboutPageSettings } = useData();
  const storyTitle = aboutPageSettings.ourStoryTitle || DEFAULT_ABOUT_PAGE_SETTINGS.ourStoryTitle;
  const storyText = aboutPageSettings.ourStoryText || DEFAULT_ABOUT_PAGE_SETTINGS.ourStoryText;
  const storyHighlights = useMemo(() => {
    const highlights = aboutPageSettings.storyHighlights?.
      map((highlight) => ({
        icon: highlight?.icon?.trim() || '•',
        text: highlight?.text?.trim() || '',
      }))
      .filter((highlight) => highlight.text.length);

    if (highlights && highlights.length > 0) return highlights;
    return DEFAULT_ABOUT_PAGE_SETTINGS.storyHighlights;
  }, [aboutPageSettings.storyHighlights]);

  return (
  <section className="relative min-h-[80vh] w-full overflow-hidden bg-gradient-to-b from-[#edf2ff] via-white to-white text-slate-900 dark:bg-black dark:text-white">
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#f5f7ff] via-white to-[#eef2ff] dark:from-black dark:via-[#03030a] dark:to-black" />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 60%, rgba(217,70,239,0.45), transparent 55%), radial-gradient(circle at 45% 40%, rgba(168,85,247,0.55), transparent 60%), radial-gradient(circle at 70% 35%, rgba(59,130,246,0.55), transparent 60%), radial-gradient(circle at 85% 55%, rgba(14,165,233,0.45), transparent 60%)',
          filter: 'blur(30px)',
          WebkitMaskImage: 'linear-gradient(120deg, transparent 5%, rgba(255,255,255,0.9) 45%, rgba(255,255,255,0.9) 65%, transparent 95%)',
          maskImage: 'linear-gradient(120deg, transparent 5%, rgba(255,255,255,0.9) 45%, rgba(255,255,255,0.9) 65%, transparent 95%)',
        }}
      />
      <div className="absolute inset-0">
        <div className="block opacity-35 mix-blend-multiply dark:hidden">
          <LinesSVG isDark={false} />
        </div>
        <div className="hidden opacity-40 mix-blend-screen dark:block">
          <LinesSVG isDark />
        </div>
      </div>
      <div className="absolute inset-0 opacity-15 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyIiBoZWlnaHQ9IjIiPjxmaWx0ZXIgaWQ9Im4iPjxmZUdhdXNzaWFuU29pemUgc3RkRGV2aWF0aW9uPSIyIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjIiIGhlaWdodD0iMiIgZmlsdGVyPSJ1cmwoI24pIiBmaWxsPSJibGFjayIvPjwvc3ZnPg==')]" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white via-white/60 to-transparent dark:from-black dark:via-black/60 dark:to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/50 to-transparent dark:from-black dark:via-black/50 dark:to-transparent" />
    </div>

    <div className="relative z-20 flex min-h-[80vh] w-full items-center justify-center px-4 py-10 text-slate-900 dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-5xl gap-5 lg:grid-cols-2 lg:items-center lg:gap-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="relative order-2 w-full lg:order-1"
        >
          <div className="relative h-80 w-full overflow-hidden rounded-3xl bg-gradient-to-br from-blue-200/60 via-indigo-100/70 to-purple-100/70 shadow-[0_25px_70px_rgba(15,23,42,0.15)] dark:from-blue-900/50 dark:via-indigo-900/40 dark:to-purple-900/50 dark:shadow-[0_18px_60px_rgba(15,23,42,0.65)] lg:h-[440px]">
            <img
              src="https://n8niostorageaccount.blob.core.windows.net/n8nio-strapi-blobs-prod/assets/IT_Ops_can_828946c680.webp"
              alt="Founded in Sungai Petani"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent dark:from-black/60" />
            <div className="absolute top-6 left-6 h-20 w-20 rounded-2xl bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-xl" />
            <div className="absolute bottom-8 right-8 h-16 w-16 rounded-full bg-gradient-to-r from-purple-500/30 to-blue-500/30 blur-xl animate-pulse" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="order-1 space-y-3 text-center sm:space-y-4 lg:order-2 lg:max-w-lg lg:space-y-5 lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex rounded-3xl border border-slate-200/80 bg-white/70 px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.25em] text-slate-600 shadow-sm dark:border-white/20 dark:bg-white/5 dark:text-white"
          >
            Our Story
          </motion.div>

          <motion.h2
            className="text-4xl font-black leading-tight text-slate-900 sm:text-5xl lg:text-6xl xl:text-7xl dark:text-transparent dark:bg-gradient-to-r dark:from-white dark:via-blue-100 dark:to-blue-300 dark:bg-clip-text dark:drop-shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {storyTitle}
          </motion.h2>

          <motion.p
            className="text-base leading-normal text-slate-600 sm:text-lg lg:text-xl dark:text-gray-200"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {storyText}
          </motion.p>

          <motion.div
            className="grid gap-3 pt-3 sm:grid-cols-2 sm:gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            {storyHighlights.map((feature, idx) => (
              <motion.div
                key={`${feature.text}-${idx}`}
                className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white/80 p-4 text-left text-sm text-slate-700 shadow-sm backdrop-blur-xl transition-colors hover:border-purple-400 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:text-white lg:text-base"
                whileHover={{ x: 8 }}
              >
                <span className="mt-1 text-2xl">{feature.icon}</span>
                <span>{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="pt-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <div className="inline-flex rounded-full border border-slate-200/80 bg-white/70 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-600 shadow-sm dark:border-white/30 dark:bg-white/10 dark:text-white/80">
              Boots-on-ground since 2025
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </section>
  );
};

const missionHighlights = [
  'Deliver enterprise-grade automation without KL retainers.',
  'Launch telemetry + dashboards together so stakeholders see ROI.',
  'Grow Malaysia’s AI workforce by embedding alongside operators.',
];

const differentiatorCards = [
  {
    title: 'Founder Direct Access',
    body: 'Strategy calls with CEO, no gatekeepers.',
    metric: 'Weekly founder syncs',
    Icon: User,
  },
  {
    title: 'SME Startup Pricing',
    body: 'Enterprise quality, 50% less cost.',
    metric: '50%+ cost savings',
    Icon: DollarSign,
  },
  {
    title: 'Malaysia Delivery Speed',
    body: 'Custom builds live in weeks.',
    metric: 'Launch in ≤14 days',
    Icon: Rocket,
  },
  {
    title: 'True Partnership Model',
    body: 'Your wins = our obsession.',
    metric: '50+ projects shipped',
    Icon: Handshake,
  },
];

const founderMetricChips = ['50+ Delivered', 'RM1500 Fixed', '7-Day Live'];

const founderSkills = [
  {
    title: 'Frontend Architecture',
    value: 92,
    stack: ['React', 'Vue', 'Tailwind', 'WebGL'],
  },
  {
    title: 'Backend Systems',
    value: 85,
    stack: ['Node', 'Postgres', 'Redis'],
  },
  {
    title: 'AI & Product Automation',
    value: 78,
    stack: ['LangChain', 'Python', 'RPA'],
  },
];

const founderFocusAreas = ['SME Platforms', 'AI Automation', 'Fintech', 'Design Systems'];

const workflow = [
  { title: 'Discover', text: 'Audit goals, data, constraints.', icon: Compass },
  { title: 'Prototype', text: 'Ship prompts, dashboards, automations.', icon: Sparkles },
  { title: 'Test', text: 'Embed with teams, capture Bahasa feedback.', icon: Shield },
  { title: 'Deploy', text: 'Launch to secure cloud with monitoring.', icon: Rocket },
  { title: 'Scale', text: 'Expand wins with governance.', icon: Zap },
];

const WorkflowStepCard: React.FC<{ step: typeof workflow[number]; index: number }> = ({ step, index }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltY, { stiffness: 150, damping: 25 });
  const rotateY = useSpring(tiltX, { stiffness: 150, damping: 25 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPercent = ((event.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((event.clientY - rect.top) / rect.height) * 100;
    setGlow({ x: xPercent, y: yPercent });

    const relativeX = xPercent / 100 - 0.5;
    const relativeY = yPercent / 100 - 0.5;
    tiltX.set(relativeX * 10);
    tiltY.set(-relativeY * 10);
  };

  const handleMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  const gradientColors = [
    'from-blue-500 to-cyan-500',
    'from-indigo-500 to-blue-500',
    'from-purple-500 to-indigo-500',
    'from-pink-500 to-purple-500',
    'from-cyan-500 to-blue-500',
  ];

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: 0.1 + index * 0.15, duration: 0.6, type: 'spring' }}
      className="group relative"
    >
      {/* Glow effect on hover */}
      <motion.div
        className="pointer-events-none absolute -inset-1 rounded-3xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(99, 102, 241, 0.4), transparent 70%)`,
        }}
      />

      <div className="relative h-full rounded-3xl border border-slate-200/80 bg-white/90 p-6 text-left shadow-xl backdrop-blur-sm transition-all duration-500 dark:border-white/10 dark:bg-slate-900/80 dark:shadow-2xl group-hover:border-blue-300/50 group-hover:shadow-2xl group-hover:shadow-blue-500/20 dark:group-hover:border-blue-400/30">
        {/* Step Number Badge */}
        <motion.div
          className={`absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r ${gradientColors[index]} text-xs font-bold text-white shadow-lg`}
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + index * 0.15, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.2, rotate: 360 }}
        >
          {index + 1}
        </motion.div>

        {/* Icon Container */}
        <motion.div
          className={`mb-4 inline-flex rounded-2xl bg-gradient-to-r ${gradientColors[index]} p-3 shadow-lg`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <step.icon className="h-6 w-6 text-white" />
        </motion.div>

        {/* Content */}
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
          Step {index + 1}
        </p>
        <h4 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">{step.title}</h4>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{step.text}</p>

        {/* Animated underline */}
        <motion.div
          className={`mt-4 h-1 w-0 rounded-full bg-gradient-to-r ${gradientColors[index]}`}
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 + index * 0.15, duration: 0.8, ease: 'easeOut' }}
        />

        {/* Hover shine effect */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 via-transparent to-transparent" />
        </div>
      </div>
    </motion.div>
  );
};

const whyNow = [
  { heading: 'AI budgets unlocked', detail: 'SMEs now earmark RM50k–RM200k yearly for automation pilots.' },
  { heading: 'Talent crunch', detail: 'Ops leaders can’t hire fast enough—automation fills the gap.' },
  { heading: 'Regional competition', detail: 'SEA players are entering Malaysia; local SMEs must modernize.' },
];

const ParallaxGlow = ({ className, y }: { className: string; y: any }) => (
  <motion.div style={{ y }} className={`absolute blur-[110px] ${className}`} />
);

const SectionWrapper: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <section className={`relative z-10 px-4 py-20 sm:px-6 lg:px-10 ${className ?? ''}`}>{children}</section>
);

const FounderSection = () => {
  const { aboutPageSettings } = useData();
  const cardRef = useRef<HTMLDivElement | null>(null);
  const avatarRef = useRef<HTMLDivElement | null>(null);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltY, { stiffness: 100, damping: 30 });
  const rotateY = useSpring(tiltX, { stiffness: 100, damping: 30 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPercent = ((event.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((event.clientY - rect.top) / rect.height) * 100;
    const relativeX = xPercent / 100 - 0.5;
    const relativeY = yPercent / 100 - 0.5;
    tiltX.set(relativeX * 8);
    tiltY.set(-relativeY * 8);
  };

  const handleMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <section className="founder-quantum relative overflow-hidden py-12 text-white sm:py-16">
      {/* Animated Background Elements */}
      <div className="prism-cluster" />
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="mb-8 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-block"
          >
            <HoverBorderGradient
              containerClassName="rounded-full border border-white/30 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.35em] text-white"
              className="bg-black/60 text-white"
              as="div"
            >
              Meet The Founder
            </HoverBorderGradient>
          </motion.div>
          <motion.h2
            className="mt-4 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent">
              The Mind Behind
            </span>
            <br />
            <span className="text-white">The Mission</span>
          </motion.h2>
          <motion.p
            className="mx-auto mt-3 max-w-2xl text-sm text-slate-300 sm:text-base"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Founder-led expertise delivering enterprise-grade solutions with transparent pricing for Malaysian SMEs.
          </motion.p>
        </motion.div>

        {/* Founder Card */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformPerspective: 1200 }}
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="founder-glass relative mx-auto grid gap-6 lg:grid-cols-[280px,1fr]"
        >
          {/* Profile Side */}
          <motion.div
            ref={avatarRef}
            className="space-y-4"
            whileHover={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="flex items-start justify-between">
              <motion.div
                className="relative h-24 w-24 sm:h-28 sm:w-28"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <img
                  src={founderPortrait}
                  alt="Sanjay Gunabalan - Founder & AI Architect"
                  className="h-full w-full rounded-2xl object-cover shadow-lg shadow-purple-500/30"
                  loading="lazy"
                />
                <motion.span
                  className="absolute -right-1 -bottom-1 h-3 w-3 rounded-full border-2 border-slate-900 bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.8)]"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <motion.button
                type="button"
                className="founder-icon-button text-white/70 transition hover:text-white"
                aria-label="Share profile"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
              >
                <Share2 className="h-4 w-4" />
              </motion.button>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-white sm:text-2xl">{aboutPageSettings.founderName}</h3>
              <motion.p
                className="founder-role-badge mt-1.5 inline-block text-sm text-white"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                {aboutPageSettings.founderRole}
              </motion.p>
            </motion.div>

            <motion.div
              className="flex items-center gap-2 text-sm text-slate-300"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <MapPin className="h-4 w-4 text-purple-300" />
              <span>{aboutPageSettings.founderLocation}</span>
            </motion.div>

            <motion.p
              className="text-sm leading-relaxed text-slate-300"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              {aboutPageSettings.founderBio}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            >
              <motion.button
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/50"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus className="h-4 w-4" />
                Connect
              </motion.button>
              <motion.button
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-white/90 backdrop-blur-sm transition hover:bg-white/10"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <BookOpen className="h-4 w-4" />
                Case Study
              </motion.button>
            </motion.div>

            <motion.div
              className="flex items-center gap-4 text-slate-400"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <motion.a
                href={aboutPageSettings.founderLinkedIn || '#'}
                target="_blank"
                rel="noreferrer"
                className="founder-icon-button text-white/70 transition hover:text-white"
                aria-label="LinkedIn"
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin className="h-4 w-4" />
              </motion.a>
              <motion.a
                href={aboutPageSettings.founderInstagram || '#'}
                target="_blank"
                rel="noreferrer"
                className="founder-icon-button text-white/70 transition hover:text-white"
                aria-label="Instagram"
                whileHover={{ scale: 1.15, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Instagram className="h-4 w-4" />
              </motion.a>
              <motion.a
                href={aboutPageSettings.founderWhatsApp || '#'}
                target="_blank"
                rel="noreferrer"
                className="founder-icon-button text-white/70 transition hover:text-white"
                aria-label="WhatsApp"
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <MessageCircle className="h-4 w-4" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Skills Side */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-purple-300">Skills Matrix</p>
                <p className="text-[10px] text-slate-400">Updated Q4</p>
              </div>
              <motion.div
                className="rounded-full border border-emerald-400/50 bg-emerald-400/10 px-2.5 py-0.5 text-[10px] text-emerald-300"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Verified
              </motion.div>
            </div>
            <div className="space-y-4">
              {founderSkills.map((skill, index) => (
                <motion.div
                  key={skill.title}
                  className="space-y-3"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between text-sm font-medium">
                    <span className="text-white">{skill.title}</span>
                    <motion.span
                      className="text-purple-300"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      {skill.value}%
                    </motion.span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-800/80 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500 shadow-lg shadow-purple-500/50"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.value}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7 + index * 0.1, duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                  <div className="text-xs uppercase tracking-[0.3em] text-slate-400">{skill.stack.join('   ')}</div>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 }}
            >
              <p className="text-sm uppercase tracking-[0.4em] text-slate-400">Focus Areas</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {founderFocusAreas.map((area, index) => (
                  <motion.span
                    key={area}
                    className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs text-slate-200 backdrop-blur-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 + index * 0.1 }}
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  >
                    {area}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Glow Effects */}
          <motion.div
            className="pointer-events-none absolute -left-20 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-purple-500/40 blur-[80px]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="pointer-events-none absolute -bottom-10 right-10 h-32 w-32 rounded-full bg-cyan-400/50 blur-[70px]"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          />
        </motion.div>
      </div>
    </section>
  );
};

const AboutPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const countersRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: pageRef, offset: ['start start', 'end end'] });
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const statsY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const countersInView = useInView(countersRef, { once: true, amount: 0.4 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const node = pageRef.current;
    if (!node) return;
    if (window.getComputedStyle(node).position === 'static') {
      node.style.position = 'relative';
    }
  }, []);

  const impactStats = useMemo(
    () => [
      { label: 'Successful rollouts', value: countersInView ? 50 : 0, suffix: '+' },
      { label: 'Hours saved monthly', value: countersInView ? 620 : 0, suffix: '+' },
      { label: 'Average ROI', value: countersInView ? 3 : 0, suffix: 'x' },
    ],
    [countersInView],
  );

  return (
    <div ref={pageRef} className="relative isolate bg-white text-[#111322] transition-colors duration-300 dark:bg-[#080b15] dark:text-white">
      {/* Background glows */}
      <ParallaxGlow y={glowY} className="left-10 top-20 h-80 w-80 bg-blue-500/20" />
      <ParallaxGlow y={glowY} className="right-[-5%] top-1/3 h-96 w-96 bg-purple-500/20" />

      {/* HERO */}
      <HeroSection />

      <OurStorySection />

      <MissionSection />

      <PrinciplesSection />

      <SectionWrapper>
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="differentiators-shell mx-auto max-w-5xl px-6 py-16 text-[#0f172a] dark:text-white sm:px-10"
        >
          <div className="relative z-10 space-y-4 text-center sm:text-left">
            <p className="text-xs uppercase tracking-[0.5em] text-purple-500/70 dark:text-purple-300/90">What Makes Us Different</p>
            <h2 className="text-3xl font-black text-[#0f172a] drop-shadow-[0_0_25px_rgba(168,85,247,0.2)] dark:text-white dark:drop-shadow-[0_0_25px_rgba(168,85,247,0.6)] sm:text-4xl">
              What Makes Us Different
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-200">
              Founder-led, SME-priced enterprise tech—direct expertise, zero agency bloat.
            </p>
          </div>

          <div className="relative z-10 mt-10 grid gap-5 sm:grid-cols-2">
            {differentiatorCards.map((card, index) => (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="differentiator-card group p-5 text-[#0f172a] dark:text-white"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 via-indigo-500 to-cyan-400 text-white shadow-[0_0_20px_rgba(129,140,248,0.45)] dark:shadow-[0_0_20px_rgba(129,140,248,0.55)]">
                    <card.Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{card.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-200">{card.body}</p>
                  </div>
                </div>
                <div className="mt-4 rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-500/10 via-transparent to-cyan-400/10 px-4 py-3 text-xs uppercase tracking-[0.3em] text-purple-800 dark:border-white/10 dark:bg-white/5 dark:text-purple-100/90">
                  {card.metric}
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>
      </SectionWrapper>

      <FounderSection />

      {/* HOW WE WORK */}
      <section className="workflow-section relative overflow-hidden py-20">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-950 dark:via-indigo-950/30 dark:to-slate-950" />
          <div className="absolute inset-0 opacity-40 dark:opacity-20">
            <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-blue-400/30 blur-3xl dark:bg-blue-500/20" />
            <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-purple-400/30 blur-3xl dark:bg-purple-500/20" />
            <div className="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-400/20 blur-3xl dark:bg-indigo-500/15" />
          </div>
          {/* Animated grid pattern */}
          <div className="absolute inset-0 opacity-10 dark:opacity-5">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)`,
                backgroundSize: '50px 50px',
              }}
            />
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          {/* Section Header */}
              <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="mb-12 text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-block"
            >
              <HoverBorderGradient
                containerClassName="rounded-full border border-blue-300/50 dark:border-blue-400/50 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.4em] text-blue-600 dark:text-blue-400"
                className="bg-white/80 dark:bg-slate-900/80 text-blue-600 dark:text-blue-400"
                as="div"
              >
                How We Work
              </HoverBorderGradient>
              </motion.div>
            <motion.h3
              className="mt-6 text-3xl font-black leading-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
                Practical Playbooks
              </span>
              <br />
              <span className="text-slate-900 dark:text-white">Shipped in Weeks</span>
            </motion.h3>
            <motion.p
              className="mx-auto mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              A proven 5-step process that transforms your business operations from concept to scale.
            </motion.p>
          </motion.div>

          {/* Workflow Steps */}
          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block">
              <svg className="absolute top-1/2 left-0 h-0.5 w-full -translate-y-1/2" aria-hidden="true">
                <motion.line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="url(#workflowGradient)"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 0.5 }}
                />
                <defs>
                  <linearGradient id="workflowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#6366f1" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="grid gap-6 md:grid-cols-5">
              {workflow.map((step, idx) => (
                <WorkflowStepCard key={step.title} step={step} index={idx} />
            ))}
          </div>
        </div>
        </div>
      </section>

      {/* WHY NOW / WHY US */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-blue-50/80 to-indigo-50/60 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/50" />
          
          {/* Animated orbs */}
          <motion.div
            className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-blue-400/30 blur-3xl dark:bg-blue-500/20"
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-purple-400/30 blur-3xl dark:bg-purple-500/20"
            animate={{
              x: [0, -50, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-400/20 blur-3xl dark:bg-indigo-500/15"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
          
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)`,
                backgroundSize: '50px 50px',
              }}
            />
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* WHY NOW Section */}
        <motion.div
          ref={countersRef}
              initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
        >
          <div>
                <HoverBorderGradient
                  containerClassName="rounded-full border border-blue-300/50 dark:border-blue-400/50 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.4em] text-blue-600 dark:text-blue-400"
                  className="bg-white/90 dark:bg-slate-900/90 text-blue-600 dark:text-blue-400"
                  as="div"
                >
                  Why Now
                </HoverBorderGradient>
                </div>
              
              <h3 className="text-3xl font-black leading-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
                Malaysia&apos;s SMEs are at an{' '}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
                  inflection point
                </span>
                .
              </h3>
              
              <div className="mt-8 space-y-4">
                {whyNow.map((item, idx) => (
                  <motion.div
                    key={item.heading}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + idx * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 dark:border-white/10 dark:bg-slate-800/50 dark:shadow-xl"
                  >
                    {/* Left accent bar */}
                    <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    
                    <div className="relative z-10">
                      <div className="mb-3 flex items-center gap-3">
                        <motion.div
                          className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg shadow-blue-500/50"
                          animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
                          transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                        />
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white">{item.heading}</h4>
                      </div>
                      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.detail}</p>
                    </div>

                    {/* Hover glow */}
                    <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-indigo-500/0 to-purple-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:from-blue-500/10 group-hover:via-indigo-500/10 group-hover:to-purple-500/10" />
                  </motion.div>
              ))}
            </div>
            </motion.div>

            {/* WHY US Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="space-y-6"
            >
              <div>
                <HoverBorderGradient
                  containerClassName="rounded-full border border-purple-300/50 dark:border-purple-400/50 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.4em] text-purple-600 dark:text-purple-400"
                  className="bg-white/90 dark:bg-slate-900/90 text-purple-600 dark:text-purple-400"
                  as="div"
                >
                  Why Us
                </HoverBorderGradient>
          </div>
              
              <h3 className="text-3xl font-black leading-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
                Proven outcomes for{' '}
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent dark:from-purple-400 dark:via-pink-400 dark:to-indigo-400">
                  Malaysian operators
                </span>
                .
              </h3>
              
            <div className="grid gap-4 sm:grid-cols-3">
                {impactStats.map((stat, idx) => (
                  <motion.div
                  key={stat.label}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + idx * 0.1, duration: 0.6, type: 'spring' }}
                    whileHover={{ scale: 1.05, y: -4 }}
                    className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 p-6 text-center shadow-lg backdrop-blur-sm transition-all duration-300 dark:border-white/10 dark:bg-slate-800/50 dark:shadow-xl"
                  >
                    {/* Top gradient accent */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="relative z-10">
                      <motion.p
                        className="text-4xl font-black sm:text-5xl"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + idx * 0.1, type: 'spring', stiffness: 200 }}
                      >
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400">
                    {stat.value}
                        </span>
                        <span className="text-slate-900 dark:text-white">{stat.suffix}</span>
                      </motion.p>
                      <motion.p
                        className="mt-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + idx * 0.1 }}
                      >
                        {stat.label}
                      </motion.p>
                </div>

                    {/* Hover glow */}
                    <div className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-indigo-500/0 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-50 group-hover:from-blue-500/30 group-hover:via-purple-500/30 group-hover:to-indigo-500/30" />
                  </motion.div>
              ))}
            </div>
          </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-20">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-purple-950 dark:from-black dark:via-slate-950 dark:to-indigo-950" />
          
          {/* Animated gradient orbs */}
        <motion.div
            className="absolute -left-40 top-0 h-[600px] w-[600px] rounded-full bg-blue-500/30 blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -right-40 bottom-0 h-[600px] w-[600px] rounded-full bg-purple-500/30 blur-3xl"
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/20 blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          />
          
          {/* Animated mesh gradient overlay */}
          <div className="absolute inset-0 opacity-30">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.4), transparent 50%),
                  radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.4), transparent 50%),
                  radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.3), transparent 70%)`,
              }}
            />
          </div>
          
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
                backgroundSize: '60px 60px',
              }}
            />
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="relative overflow-hidden rounded-[48px] border border-white/20 bg-gradient-to-r from-blue-600/90 via-violet-600/90 to-purple-600/90 p-8 text-center text-white shadow-2xl backdrop-blur-xl sm:p-12 lg:p-16"
          >
            {/* Animated border glow */}
            <motion.div
              className="absolute inset-0 rounded-[48px]"
              style={{
                background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.5), rgba(168, 85, 247, 0.5), rgba(99, 102, 241, 0.5))',
                padding: '2px',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            />

            {/* Inner glow effects */}
            <div className="absolute inset-0 rounded-[48px] bg-gradient-to-br from-white/10 via-transparent to-transparent" />
            <div className="absolute inset-0 rounded-[48px] bg-gradient-to-t from-purple-500/20 via-transparent to-transparent" />

            <div className="relative z-10">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-block"
              >
                <HoverBorderGradient
                  containerClassName="rounded-full border border-white/30 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.4em] text-white/90"
                  className="bg-white/10 text-white backdrop-blur-sm"
                  as="div"
                >
                  Ready?
                </HoverBorderGradient>
              </motion.div>

              {/* Heading */}
              <motion.h3
                className="mt-6 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Let&apos;s architect your{' '}
                <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                  next growth leap
                </span>
                .
              </motion.h3>

              {/* Description */}
              <motion.p
                className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/90 sm:text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                We partner with Malaysian SMEs ready to automate, modernize, and scale. Book a discovery sprint and we&apos;ll map ROI within 14 days.
              </motion.p>

              {/* Buttons */}
              <motion.div
                className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <motion.button
                  className="group relative w-full overflow-hidden rounded-2xl bg-white px-8 py-4 text-base font-bold text-blue-700 shadow-xl transition-all duration-300 sm:w-auto"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
              Book discovery sprint
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>

                <motion.button
                  className="group relative w-full overflow-hidden rounded-2xl border-2 border-white/60 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/90 hover:bg-white/20 sm:w-auto"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Download className="h-4 w-4" />
              Download capabilities deck
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.button>
              </motion.div>
          </div>

            {/* Floating particles */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-2 w-2 rounded-full bg-white/40"
                style={{
                  left: `${10 + i * 12}%`,
                  top: `${20 + (i % 3) * 30}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.7, 0.3],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: 'easeInOut',
                }}
              />
            ))}
        </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
