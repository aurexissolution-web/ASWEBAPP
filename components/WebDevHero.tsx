import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  motion,
  animate,
  useMotionValue,
  useTransform,
  useInView,
  useScroll
} from 'framer-motion';
import { ArrowRight, Zap, Gauge, Rocket } from 'lucide-react';

const benefitItems = [
  {
    label: 'Speed',
    description: 'Edge-rendered React sites deploy in under 90ms globally.',
    icon: Zap
  },
  {
    label: 'Scale',
    description: 'Autoscale pipelines + SOC 2 controls baked in.',
    icon: Rocket
  },
  {
    label: 'SEO',
    description: 'Semantic markup + Core Web Vitals monitoring out of the box.',
    icon: Gauge
  }
];

const typewriterPhrases = ['Speed', 'Scale', 'SEO edge'];

type MagneticButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
};

const MagneticButton = React.memo<MagneticButtonProps>(({ children, variant = 'primary', onClick }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseEnter = () => {
    if (ref.current) {
        rectRef.current = ref.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Fallback if rect isn't cached yet
    if (!rectRef.current && ref.current) {
        rectRef.current = ref.current.getBoundingClientRect();
    }
    const rect = rectRef.current;
    if (!rect) return;
    
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);
    x.set(offsetX * 0.15);
    y.set(offsetY * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    rectRef.current = null;
  };

  const baseClasses =
    variant === 'primary'
      ? 'group flex-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 shadow-[0_25px_60px_rgba(6,182,212,0.35)] hover:shadow-[0_30px_70px_rgba(6,182,212,0.5)]'
      : 'group flex-1 border border-white/30 bg-white/5 hover:border-cyan-300/80 hover:bg-white/10 backdrop-blur-xl';

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x, y }}
      whileTap={{ scale: 0.97 }}
      className={`relative overflow-hidden rounded-2xl px-8 py-5 text-lg font-semibold text-white transition-all duration-300 ${baseClasses}`}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      {variant === 'primary' && (
        <span className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent blur-3xl" />
        </span>
      )}
    </motion.button>
  );
});

const OrbitingMetric = ({
  value,
  label,
  delay,
  gradient
}: {
  value: React.ReactNode;
  label: string;
  delay: number;
  gradient: string;
}) => (
  <motion.div
    className="absolute inset-0 pointer-events-none"
    initial={{ rotate: 40 * delay }}
    animate={{ rotate: 360 + 40 * delay }}
    transition={{ duration: 28 + delay * 2, repeat: Infinity, ease: 'linear' }}
  >
    <div
      className="absolute left-1/2 top-1/2 -translate-y-1/2"
      style={{ transform: 'translate(-50%, -50%) translateX(235px)' }}
    >
      <div
        className={`min-w-[150px] rounded-2xl border border-white/20 px-4 py-3 text-center font-mono text-sm text-white shadow-[0_15px_40px_rgba(56,189,248,0.35)] backdrop-blur-xl ${gradient}`}
      >
        <div className="text-2xl font-bold leading-none">{value}</div>
        <div className="text-[11px] uppercase tracking-[0.35em] text-white/70 mt-1">{label}</div>
      </div>
    </div>
  </motion.div>
);

const WebDevHero: React.FC = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLElement>(null);
  const isInView = useInView(heroRef, { once: true, margin: '-20% 0px -20% 0px' });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start end', 'end start']
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const node = heroRef.current;
    if (!node) return;
    if (window.getComputedStyle(node).position === 'static') {
      node.style.position = 'relative';
    }
  }, []);

  const particleDrift = useTransform(scrollYProgress, [0, 1], [30, -40]);
  const particleOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.15, 0.6, 0.25]);

  const installsValue = useMotionValue(0);
  const successValue = useMotionValue(0);
  const [installsDisplay, setInstallsDisplay] = useState('0');
  const [successDisplay, setSuccessDisplay] = useState('0%');

  const [typewriter, setTypewriter] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    const controls1 = animate(installsValue, 2400, { duration: 2.2, ease: 'easeOut' });
    const controls2 = animate(successValue, 98.9, { duration: 2, ease: 'easeOut' });
    return () => {
      controls1.stop();
      controls2.stop();
    };
  }, [isInView, installsValue, successValue]);

  useEffect(() => installsValue.on('change', (value) => setInstallsDisplay(Math.round(value).toLocaleString())), [installsValue]);
  useEffect(
    () =>
      successValue.on('change', (value) => {
        setSuccessDisplay(`${value.toFixed(1)}%`);
      }),
    [successValue]
  );

  useEffect(() => {
    if (!isInView) return;
    const currentPhrase = typewriterPhrases[phraseIndex % typewriterPhrases.length];

    if (!isDeleting && typewriter === currentPhrase) {
      const pause = setTimeout(() => setIsDeleting(true), 1200);
      return () => clearTimeout(pause);
    }

    if (isDeleting && typewriter === '') {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % typewriterPhrases.length);
    }

    const timeout = setTimeout(() => {
      const nextLength = typewriter.length + (isDeleting ? -1 : 1);
      setTypewriter(currentPhrase.slice(0, nextLength));
    }, isDeleting ? 50 : 110);

    return () => clearTimeout(timeout);
  }, [typewriter, isDeleting, phraseIndex, isInView]);

  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, idx) => ({
        id: idx,
        size: Math.random() * 6 + 3,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: Math.random() * 3
      })),
    []
  );

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950/80 to-purple-950/70 text-white"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(147,51,234,0.2),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: 'linear-gradient(120deg,rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '180px 180px' }} />
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-16 px-4 py-28 sm:px-6 lg:flex-row lg:items-center lg:gap-12 lg:py-32 xl:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-1/2"
        >
          <div className="space-y-10 pl-2 pr-2 lg:pr-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-cyan-200 backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              NEW: Web Dev v2 Launch
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl font-black leading-[0.85] text-white sm:text-6xl lg:text-7xl xl:text-8xl">
                Scale Faster with
                <span className="block bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">Secure Web</span>
              </h1>
              <p className="text-xl text-white/80 lg:text-2xl">
                Speed, Scale & SEO built-in. We engineer responsive experiences using modern frameworks so your teams can launch content without friction.
              </p>
            </div>

            <div className="text-lg font-mono text-cyan-200">
              <span className="opacity-70">Typing:</span> <span className="pl-2">{typewriter}</span>
              <span className="ml-1 inline-block h-6 w-[2px] bg-cyan-200 animate-pulse" />
            </div>

            <div className="space-y-4">
              {benefitItems.map((item) => (
                <motion.div key={item.label} className="flex items-start gap-4 rounded-3xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-lg">
                  <div className="rounded-2xl bg-white/5 p-3 shadow-[0_10px_30px_rgba(59,130,246,0.35)]">
                    <item.icon className="h-5 w-5 text-cyan-300" />
                  </div>
                  <div>
                    <div className="text-sm uppercase tracking-[0.4em] text-white/60">{item.label}</div>
                    <p className="text-base text-white/90">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="lg:hidden rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
              <div className="relative flex flex-col items-center gap-6">
                <div className="relative h-48 w-48">
                  <div className="absolute inset-0 rounded-full border border-cyan-400/30" />
                  <div className="absolute inset-4 rounded-full border border-blue-300/20 border-dashed" />
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-blue-500/20 blur-3xl" />
                </div>
                <div className="flex w-full flex-col gap-4 sm:flex-row">
                  <div className="flex-1 rounded-2xl border border-white/15 bg-gradient-to-br from-cyan-500/20 to-blue-500/10 px-4 py-3 text-center">
                    <div className="text-3xl font-bold">{installsDisplay}+</div>
                    <div className="text-xs uppercase tracking-[0.35em] text-white/60">Installs</div>
                  </div>
                  <div className="flex-1 rounded-2xl border border-white/15 bg-gradient-to-br from-purple-500/20 to-blue-500/10 px-4 py-3 text-center">
                    <div className="text-3xl font-bold">{successDisplay}</div>
                    <div className="text-xs uppercase tracking-[0.35em] text-white/60">Success</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-6 sm:flex-row">
              <MagneticButton variant="primary" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>
                Get Started
                <ArrowRight className="h-5 w-5" />
              </MagneticButton>
              <MagneticButton variant="secondary" onClick={() => navigate('/contact')}>
                Talk to Sales
              </MagneticButton>
            </div>

            <div className="flex items-center gap-3 pt-4 text-sm text-white/80">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 font-black text-slate-950 shadow-lg">
                SOC&nbsp;2
              </div>
              <div>
                <div className="font-semibold tracking-wide text-white">Compliance Locked</div>
                <p className="text-xs text-white/60">Audit-ready controls & zero-trust hosting</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative hidden w-full items-center justify-center lg:flex lg:w-1/2"
        >
          <div className="relative">
            <div className="absolute inset-0 -translate-y-6 translate-x-4 blur-3xl opacity-60">
              <div className="h-[420px] w-[420px] rounded-full bg-gradient-to-r from-cyan-500/40 via-blue-500/40 to-purple-500/40" />
            </div>

            <div className="relative flex h-[480px] w-[480px] items-center justify-center rounded-[40px] border border-white/10 bg-white/5/40 p-10 backdrop-blur-3xl">
              <div className="absolute inset-4 rounded-[32px] border border-white/5 bg-gradient-to-tr from-slate-900/60 via-slate-900/20 to-transparent" />
              <div className="absolute inset-0 opacity-50" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.12) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

              <div className="relative h-full w-full">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                  className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/40"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
                  className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-300/30 border-dashed"
                />

                <motion.div
                  animate={{ rotateY: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="h-64 w-64 rounded-full bg-gradient-to-br from-cyan-500/30 via-blue-600/30 to-purple-500/20 blur-[2px] shadow-[inset_0_0_60px_rgba(15,118,230,0.25)]">
                    <div className="relative h-full w-full">
                      <div className="absolute inset-[14%] rounded-full border border-white/20 opacity-40" />
                      <div className="absolute inset-[25%] rounded-full border border-white/15 border-dashed opacity-60" />
                      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.25), transparent 45%)' }} />
                    </div>
                  </div>
                </motion.div>

                {particles.map((particle) => (
                  <motion.span
                    key={particle.id}
                    className="absolute rounded-full bg-cyan-300"
                    style={{
                      width: particle.size,
                      height: particle.size,
                      left: particle.left,
                      top: particle.top,
                      y: particleDrift,
                      opacity: particleOpacity
                    }}
                    animate={{ scale: [0.6, 1.3, 0.6] }}
                    transition={{ duration: 3.5, repeat: Infinity, delay: particle.delay }}
                  />
                ))}

                <OrbitingMetric value={`${installsDisplay}+`} label="Installs" delay={0} gradient="bg-gradient-to-r from-cyan-500/40 to-blue-500/40" />
                <OrbitingMetric value={successDisplay} label="Success" delay={4} gradient="bg-gradient-to-r from-purple-500/40 to-blue-500/30" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WebDevHero;
