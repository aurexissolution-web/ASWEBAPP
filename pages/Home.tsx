import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import Hero from '../components/Hero';
import { SERVICES as STATIC_SERVICES, TESTIMONIALS, PRICING_TIERS, FAQ_ITEMS, DEFAULT_HOMEPAGE_CONTENT } from '../constants';
import { useData } from '../context/DataContext';
import { FaqItem, HomepageProblem, PricingTier } from '../types';
import * as Icons from 'lucide-react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate, Variants, useReducedMotion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Tech Stack Data (Static)
const TECH_STACK = [
  { name: 'Next.js', icon: 'LayoutTemplate' },
  { name: 'React', icon: 'Code2' },
  { name: 'TypeScript', icon: 'FileCode' },
  { name: 'Tailwind CSS', icon: 'Palette' },
  { name: 'Node.js', icon: 'Server' },
  { name: 'Python', icon: 'Terminal' },
  { name: 'AWS', icon: 'Cloud' },
  { name: 'Docker', icon: 'Box' },
  { name: 'PostgreSQL', icon: 'Database' },
  { name: 'TensorFlow', icon: 'Cpu' },
];

// Spotlight Card Component
interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  isDark?: boolean;
  variant?: 'default' | 'glass';
}

const TiltCard: React.FC<TiltCardProps> = ({ children, className, isDark = false, variant = 'default' }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const rectRef = useRef<DOMRect | null>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth physics for the spotlight movement
    const smoothX = useSpring(mouseX, { stiffness: 300, damping: 30 });
    const smoothY = useSpring(mouseY, { stiffness: 300, damping: 30 });

    // Tilt Rotation physics - stronger tilt for more 3D feel
    const rotateX = useTransform(smoothY, [-300, 300], [20, -20]); 
    const rotateY = useTransform(smoothX, [-300, 300], [-20, 20]);

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        if (!rectRef.current && containerRef.current) {
            rectRef.current = containerRef.current.getBoundingClientRect();
        }
        const rect = rectRef.current;
        if (!rect) return;

        const xCenter = e.clientX - rect.left - rect.width / 2;
        const yCenter = e.clientY - rect.top - rect.height / 2;
        
        // Update Motion Values
        mouseX.set(xCenter);
        mouseY.set(yCenter);
    }

    const handleMouseEnter = () => {
        if (containerRef.current) {
            rectRef.current = containerRef.current.getBoundingClientRect();
        }
    };

    // Dynamic Gradient for the Spotlight
    const spotlightBg = useMotionTemplate`radial-gradient(400px circle at ${useTransform(smoothX, x => x + 200)}px ${useTransform(smoothY, y => y + 250)}px, ${isDark ? 'rgba(59, 130, 246, 0.15)' : 'rgba(59, 130, 246, 0.1)'}, transparent 80%)`;
    const borderSpotlight = useMotionTemplate`radial-gradient(250px circle at ${useTransform(smoothX, x => x + 200)}px ${useTransform(smoothY, y => y + 250)}px, ${isDark ? 'rgba(59, 130, 246, 0.8)' : 'rgba(59, 130, 246, 0.6)'}, transparent 80%)`;

    return (
        <div className={`${className} perspective-1000 group`}>
            <motion.div
                ref={containerRef}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={() => { 
                    mouseX.set(0); 
                    mouseY.set(0); 
                    rectRef.current = null;
                }}
                whileHover={{ y: -8, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="relative h-full"
            >
                 {/* Border Gradient Layer */}
                <motion.div 
                    className="absolute -inset-[1px] rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
                    style={{ background: borderSpotlight }} 
                />
                
                {/* Main Card Background */}
                <div
                    className={`absolute inset-0 rounded-[23px] transition-all duration-500 pointer-events-none border ${
                        variant === 'glass'
                            ? 'bg-[rgba(255,255,255,0.85)] dark:bg-[rgba(7,12,20,0.85)] border-white/40 dark:border-white/10 backdrop-blur-[18px] shadow-[0_25px_60px_rgba(17,33,56,0.18)] dark:shadow-[0_40px_90px_rgba(3,12,24,0.65)] group-hover:bg-[rgba(255,255,255,0.92)] dark:group-hover:bg-[rgba(10,22,36,0.92)] group-hover:shadow-[0_35px_110px_rgba(50,184,198,0.28)] dark:group-hover:shadow-[0_45px_120px_rgba(159,58,232,0.4)] group-hover:border-cyan-100/60 dark:group-hover:border-cyan-400/30'
                            : isDark
                                ? 'bg-white/5 border-white/10 backdrop-blur-xl shadow-sm group-hover:bg-white/10 group-hover:shadow-2xl'
                                : 'bg-white/60 dark:bg-slate-900/60 border-white/40 dark:border-white/10 backdrop-blur-xl shadow-sm group-hover:bg-blue-50/40 dark:group-hover:bg-blue-900/20 group-hover:shadow-2xl'
                    }`}
                />

                {variant === 'glass' && (
                    <div className="absolute inset-0 rounded-[23px] opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none blur-2xl" style={{ background: 'linear-gradient(120deg, rgba(50,184,198,0.35), rgba(159,58,232,0.3))' }} />
                )}

                {/* Spotlight Overlay */}
                <motion.div
                    className="absolute inset-0 rounded-[23px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: spotlightBg }}
                />
                {/* Noise Texture */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none rounded-[23px]" />
                
                {/* Content Container - Preserves 3D for children */}
                <div className="relative h-full p-8 flex flex-col" style={{ transformStyle: "preserve-3d" }}>
                    {children}
                </div>
            </motion.div>
        </div>
    );
};

// Parallax Background Item
interface ParallaxShapeProps {
  yOffset: any;
  className: string;
  speed?: number;
  children?: React.ReactNode;
}

const ParallaxShape: React.FC<ParallaxShapeProps> = ({ yOffset, className, speed = 0.5, children }) => {
    const y = useTransform(yOffset, [0, 1], [0, 500 * speed]);
    return <motion.div style={{ y }} className={`absolute pointer-events-none -z-10 ${className}`}>{children}</motion.div>;
};

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
}

const InteractiveParticleBackground: React.FC<{ reducedMotion: boolean; active?: boolean }> = ({
  reducedMotion,
  active = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersCoarsePointer = typeof window !== 'undefined' ? window.matchMedia('(pointer: coarse)').matches : false;
  const pointer = useRef({ x: 0, y: 0, active: false, radius: 160 });

  useEffect(() => {
    if (reducedMotion || !active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const dpr = window.devicePixelRatio || 1;
    let particles: Particle[] = [];
    let animationFrame: number;
    const baseColorsDark = ['#32B8C6', '#9F3AE8'];
    const baseColorsLight = ['#2180A1', '#B99FD9'];
    const getColors = () => (document.documentElement.classList.contains('dark') ? baseColorsDark : baseColorsLight);
    const connectionDistance = 110;
    const maxConnections = 10;

    const setCanvasSize = () => {
      const parentRect = canvas.parentElement?.getBoundingClientRect();
      const width = parentRect?.width ?? window.innerWidth;
      const height = parentRect?.height ?? window.innerHeight * 0.6;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    const particleCount = () => {
      if (window.innerWidth < 640) return 70;
      if (window.innerWidth < 1024) return 140;
      return 200;
    };

    const initParticles = () => {
      particles = Array.from({ length: particleCount() }).map(() => {
        const size = Math.random() * 2.2 + 0.6;
        const palette = getColors();
        return {
          x: Math.random() * canvas.clientWidth,
          y: Math.random() * canvas.clientHeight,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size,
          color: palette[Math.floor(Math.random() * palette.length)],
          opacity: Math.random() * 0.8 + 0.2
        };
      });
    };

    const updatePointer = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      pointer.current = {
        x: clientX - rect.left,
        y: clientY - rect.top,
        active: true,
        radius: window.innerWidth < 768 ? 110 : 180
      };
    };

    const deactivatePointer = () => {
      pointer.current = { ...pointer.current, active: false };
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      ctx.globalCompositeOperation = 'lighter';

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;

        if (p.x < 0 || p.x > canvas.clientWidth) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.clientHeight) p.vy *= -1;

        if (pointer.current.active && !isCoarse) {
          const dx = pointer.current.x - p.x;
          const dy = pointer.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < pointer.current.radius) {
            const force = (pointer.current.radius - dist) / pointer.current.radius;
            const directionX = dx / (dist || 1);
            const directionY = dy / (dist || 1);
            p.vx += directionX * force * 0.8;
            p.vy += directionY * force * 0.8;
            if (dist < pointer.current.radius * 0.4) {
              p.vx -= directionX * force * 1.2;
              p.vy -= directionY * force * 1.2;
            }
          }
        }

        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 6);
        gradient.addColorStop(0, `${p.color}${Math.floor(p.opacity * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fill();
      });

      let connections = 0;
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length && connections < maxConnections; i++) {
        for (let j = i + 1; j < Math.min(i + 25, particles.length); j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDistance) {
            const opacity = 1 - dist / connectionDistance;
            ctx.strokeStyle = `${particles[i].color}${Math.floor(opacity * 128 + 64)
              .toString(16)
              .padStart(2, '0')}`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            connections++;
          }
        }
      }

      ctx.globalCompositeOperation = 'source-over';
      animationFrame = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      setCanvasSize();
      initParticles();
    };

    setCanvasSize();
    initParticles();
    animate();

    const mouseMove = (e: MouseEvent) => updatePointer(e.clientX, e.clientY);
    const mouseLeave = () => deactivatePointer();
    const touchMove = (e: TouchEvent) => {
      if (e.touches[0]) updatePointer(e.touches[0].clientX, e.touches[0].clientY);
    };
    const touchEnd = () => deactivatePointer();

    window.addEventListener('resize', handleResize);
    if (!isCoarse) {
      window.addEventListener('mousemove', mouseMove);
      window.addEventListener('mouseleave', mouseLeave);
    } else {
      window.addEventListener('touchmove', touchMove, { passive: true });
      window.addEventListener('touchend', touchEnd);
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseleave', mouseLeave);
      window.removeEventListener('touchmove', touchMove);
      window.removeEventListener('touchend', touchEnd);
    };
  }, [reducedMotion, active]);

  if (reducedMotion || !active) {
    return (
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#E5E9EF_0%,#DEE2E8_100%)] dark:bg-[linear-gradient(180deg,#03050A_0%,#010204_100%)] opacity-95" />
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#E5E9EF_0%,#DEE2E8_100%)] dark:bg-[linear-gradient(180deg,#010204_0%,#000000_100%)]" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(50,184,198,0.25),transparent_55%)] dark:bg-[radial-gradient(circle_at_70%_15%,rgba(50,184,198,0.4),transparent_65%)] opacity-30" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.08] dark:opacity-[0.12] mix-blend-overlay" />
    </div>
  );
};

const ProblemShapes: React.FC<{ reducedMotion: boolean }> = ({ reducedMotion }) => {
  const shapes = [
    { size: 420, className: 'bg-[radial-gradient(circle_at_top,#32B8C660,#F5F5F520)] light-saturate', duration: 16, delay: 0, type: 'blob' },
    { size: 320, className: 'bg-[radial-gradient(circle_at_bottom,#E6816140,#ffffff00)]', duration: 18, delay: 2, type: 'blob' },
    { size: 260, className: 'bg-[radial-gradient(circle_at_center,#7B61FF30,#32B8C610)] light-glow', duration: 14, delay: 4, type: 'blob' },
    { size: 640, className: 'border border-white/5 dark:border-white/5 rounded-[40%] rotate-[15deg]', duration: 20, delay: 1, type: 'grid' }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {shapes.map((shape, idx) => (
        <motion.div
          key={idx}
          className={`absolute blur-3xl opacity-70 dark:opacity-40 pointer-events-none mix-blend-screen ${shape.className}`}
          style={{
            width: shape.size,
            height: shape.size,
            left: `${idx * 18 + 8}%`,
            top: idx % 2 === 0 ? '-10%' : '50%',
            borderRadius: shape.type === 'grid' ? undefined : '50%'
          }}
          animate={
            reducedMotion
              ? undefined
              : {
                  x: [0, idx % 2 === 0 ? 40 : -40, 0],
                  y: [0, idx % 2 === 0 ? -25 : 25, 0],
                  rotate: shape.type === 'grid' ? ['0deg', '8deg', '-4deg', '0deg'] : ['0deg', '12deg', '-8deg', '0deg']
                }
          }
          transition={
            reducedMotion
              ? undefined
              : { duration: shape.duration, repeat: Infinity, ease: 'easeInOut', delay: shape.delay }
          }
        />
      ))}

      {/* Floating shapes */}
      {!reducedMotion && (
        <>
          {[...Array(6)].map((_, idx) => (
            <motion.div
              key={`dot-${idx}`}
              className="absolute rounded-full bg-white/80 dark:bg-white/40 shadow-[0_0_20px_rgba(50,184,198,0.5)]"
              style={{
                width: idx % 3 === 0 ? 12 : 8,
                height: idx % 3 === 0 ? 12 : 8,
                left: `${10 + idx * 12}%`,
                top: `${20 + (idx % 3) * 18}%`
              }}
              animate={{ y: ['0%', '-20%', '0%'], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 6 + idx, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </>
      )}
      <div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(255,255,255,0.12)_0%,rgba(245,245,245,0.05)_35%,rgba(255,255,255,0.1)_70%,rgba(255,255,255,0)_100%)] dark:bg-[linear-gradient(130deg,rgba(32,38,57,0.7)_0%,rgba(19,66,82,0.45)_35%,rgba(10,18,27,0.6)_100%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.4),rgba(255,255,255,0)_55%)] dark:bg-[radial-gradient(circle_at_50%_20%,rgba(50,184,198,0.15),rgba(0,0,0,0)_65%)] pointer-events-none" />
    </div>
  );
};

const ProblemCard: React.FC<{ problem: HomepageProblem; index: number }> = ({ problem, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 70, damping: 20 }}
      className="relative group"
    >
      <div className="absolute inset-0 rounded-[24px] bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-xl shadow-cyan-500/10 dark:shadow-cyan-400/5 transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:shadow-cyan-500/20" />
      <div className="relative p-8 rounded-[24px] text-left">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-cyan-100/70 dark:bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 flex items-center justify-center shadow-inner shadow-white/40">
            <Icons.AlertTriangle className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
            {problem.category}
          </span>
        </div>
        <h3 className="text-2xl font-display font-semibold text-slate-900 dark:text-white mb-4">{problem.title}</h3>
        <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mb-6">{problem.description}</p>
        <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
          {problem.impacts.map((impact, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <Icons.CircleDot className="w-4 h-4 text-cyan-500 mt-0.5" />
              <span>{impact}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const WHY_BENEFITS = [
  { icon: '⚡', title: 'Rapid Delivery', description: 'MVP in weeks, not months. We use modern stacks to move fast.' },
  { icon: '💰', title: 'Cost Effective', description: 'Enterprise quality at startup-friendly rates.' },
  { icon: '⚙️', title: 'Future Proof', description: 'Built on scalable architecture (Next.js, Cloud Native).' },
  { icon: '📱', title: 'Mobile First', description: 'Perfect experiences on every device, guaranteed.' }
];

const WHY_FLOATING_ICONS = [
  { id: 'bolt', char: '⚡', top: '15%', left: '10%', size: 120 },
  { id: 'rocket', char: '🚀', top: '20%', right: '15%', size: 100 },
  { id: 'brain', char: '🧠', top: '55%', left: '8%', size: 110 },
  { id: 'gear', char: '⚙️', top: '50%', right: '12%', size: 130 },
  { id: 'phone', char: '📱', top: '80%', left: '12%', size: 100 },
  { id: 'cloud', char: '☁️', top: '85%', right: '18%', size: 120 },
  { id: 'code', char: '💻', top: '10%', left: '48%', size: 90, hideOnMobile: true },
  { id: 'nodes', char: '🔗', top: '75%', left: '52%', size: 95, hideOnMobile: true }
];

const NOISE_TEXTURE =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSBiYXNlRnJlcXVlbmN5PSIuNSIgbnVtT2N0YXZlcz0iNSIgc3RpdGNoVGlsZXM9InN0aXRjaCI+PC9mZVR1cmJ1bGVuY2U+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWx0ZXI9InVybCgjbm9pc2UpIi8+PC9zdmc+";

const STATIC_TESTIMONIAL_THEMES = [
  {
    service: 'AI Automation',
    badgeColor: '#B366FF',
    metricColor: '#B366FF',
    borderColor: 'rgba(179, 102, 255, 0.6)',
    borderHoverColor: 'rgba(179, 102, 255, 0.9)',
    glowShadow: '0 0 35px rgba(179, 102, 255, 0.35)',
    accentOverlay: 'radial-gradient(circle at 30% 20%, rgba(179,102,255,0.35), transparent 55%)',
    metric: '+40% Productivity'
  },
  {
    service: 'App Development',
    badgeColor: '#33E8FF',
    metricColor: '#33E8FF',
    borderColor: 'rgba(50, 184, 198, 0.6)',
    borderHoverColor: 'rgba(50, 184, 198, 0.9)',
    glowShadow: '0 0 35px rgba(51, 232, 255, 0.32)',
    accentOverlay: 'radial-gradient(circle at 75% 15%, rgba(51,232,255,0.35), transparent 60%)',
    metric: '+65% User Adoption'
  },
  {
    service: 'Web Development',
    badgeColor: '#33F0FF',
    metricColor: '#33F0FF',
    borderColor: 'rgba(50, 212, 230, 0.6)',
    borderHoverColor: 'rgba(50, 212, 230, 0.9)',
    glowShadow: '0 0 35px rgba(51, 240, 255, 0.32)',
    accentOverlay: 'radial-gradient(circle at 25% 75%, rgba(51,240,255,0.35), transparent 55%)',
    metric: 'Delivered in 8 weeks'
  },
  {
    service: 'Cloud Solutions',
    badgeColor: '#5BA3FF',
    metricColor: '#5BA3FF',
    borderColor: 'rgba(91, 163, 255, 0.6)',
    borderHoverColor: 'rgba(91, 163, 255, 0.9)',
    glowShadow: '0 0 35px rgba(91, 163, 255, 0.32)',
    accentOverlay: 'radial-gradient(circle at 80% 65%, rgba(91,163,255,0.35), transparent 55%)',
    metric: 'Saved RM 120k/year'
  }
];

type PricingCardMeta = {
  icon: keyof typeof Icons;
  iconColor: string;
  accent: 'teal' | 'purple';
  badge?: string;
};

type PricingTeaserCard = PricingTier & PricingCardMeta & { badge?: string };

const PRICING_CARD_META: Record<string, PricingCardMeta> = {
  web: { icon: 'Globe', iconColor: '#32B8C6', accent: 'teal' },
  app: { icon: 'Smartphone', iconColor: '#9F3AE8', accent: 'purple' },
  ai: { icon: 'Brain', iconColor: '#32B8C6', accent: 'teal', badge: 'Most Popular' },
  data: { icon: 'BarChart3', iconColor: '#9F3AE8', accent: 'purple' },
  cloud: { icon: 'Cloud', iconColor: '#32B8C6', accent: 'teal' }
};

const DEFAULT_PRICING_CARD_META: PricingCardMeta = {
  icon: 'Package',
  iconColor: '#32B8C6',
  accent: 'teal'
};

const PricingTeaser: React.FC<{ active?: boolean; cards: PricingTeaserCard[] }> = ({ active = true, cards }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const prefersMotionReduced = useReducedMotion();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);
  const frameRef = useRef<number | null>(null);

  const getCardScrollDistance = useCallback(() => {
    const el = scrollRef.current;
    if (!el || typeof window === 'undefined') return 360;
    const firstCard = el.querySelector<HTMLElement>('[data-pricing-card]');
    const style = window.getComputedStyle(el);
    const gap = parseFloat(style.columnGap || '32') || 32;
    const width = firstCard?.getBoundingClientRect().width ?? 320;
    return width + gap;
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (document.getElementById(FAQ_SECTION_STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = FAQ_SECTION_STYLE_ID;
    style.innerHTML = `
      .faq-section {
        position: relative;
        padding: 80px 20px;
        --color-background: linear-gradient(135deg, #F5F7FB 0%, #EEF2F8 100%);
        --color-text: #1F2121;
        --color-text-secondary: #626C71;
        --color-primary: #32B8C6;
        --color-border: rgba(50, 184, 198, 0.3);
        --faq-item-bg: #FFFFFF;
        --faq-item-hover: rgba(50, 184, 198, 0.08);
        --badge-bg: rgba(50, 184, 198, 0.08);
        --badge-border: #32B8C6;
        --badge-shadow: 0 12px 30px rgba(50, 184, 198, 0.12);
        --faq-icon-bg: rgba(50, 184, 198, 0.12);
        --card-shadow: 0 20px 45px rgba(15, 23, 42, 0.08);
        --card-hover-shadow: 0 25px 60px rgba(50, 184, 198, 0.25);
        --overlay-gradient: radial-gradient(circle at 30% 40%, rgba(50,184,198,0.08), transparent 55%), linear-gradient(135deg, rgba(50,184,198,0.12), transparent);
        --overlay-blend: lighten;
        --overlay-opacity: 0.14;
        --overlay-blur: 50px;
        background: var(--color-background);
        overflow: hidden;
      }
      .dark .faq-section {
        --color-background: linear-gradient(135deg, #050812 0%, #0F1C2A 35%, #051F2F 100%);
        --color-text: #F5F5F5;
        --color-text-secondary: rgba(167, 169, 169, 0.7);
        --color-primary: #32B8C6;
        --color-border: rgba(50, 184, 198, 0.15);
        --faq-item-bg: rgba(60, 80, 100, 0.3);
        --faq-item-hover: rgba(50, 184, 198, 0.25);
        --badge-bg: rgba(50, 184, 198, 0.1);
        --badge-border: rgba(50, 184, 198, 0.7);
        --badge-shadow: 0 0 35px rgba(50, 184, 198, 0.4);
        --faq-icon-bg: rgba(50, 184, 198, 0.2);
        --card-shadow: 0 18px 45px rgba(0, 0, 0, 0.45);
        --card-hover-shadow: 0 35px 70px rgba(50, 184, 198, 0.35);
        --overlay-gradient: radial-gradient(circle at 25% 45%, rgba(50,184,198,0.25), transparent 55%), radial-gradient(circle at 70% 30%, rgba(139,92,246,0.18), transparent 60%), radial-gradient(circle at 45% 70%, rgba(59,130,246,0.15), transparent 65%);
        --overlay-blend: screen;
        --overlay-opacity: 0.32;
        --overlay-blur: 55px;
        background: var(--color-background);
      }
      .faq-gradient-overlay {
        position: absolute;
        inset: -30% -15%;
        background: var(--overlay-gradient);
        background-size: 160% 160%;
        animation: none;
        will-change: auto;
        pointer-events: none;
        mix-blend-mode: var(--overlay-blend);
        opacity: var(--overlay-opacity);
        filter: blur(var(--overlay-blur));
        z-index: -1;
      }
      @keyframes faqGradientFlow {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `;
    document.head.appendChild(style);
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (document.getElementById(CTA_SECTION_STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = CTA_SECTION_STYLE_ID;
    style.innerHTML = `
      .cta-section {
        position: relative;
        padding: 100px 20px;
        --cta-background: linear-gradient(135deg, #F5F7FB 0%, #EEF2F8 100%);
        --cta-text: #1F2121;
        --cta-subtext: #626C71;
        --cta-highlight: rgba(50,184,198,0.1);
        --cta-button-border: rgba(50,184,198,0.3);
        --cta-button-bg: #FFFFFF;
        --cta-button-text: #0F172A;
        --cta-social-shadow: rgba(15,23,42,0.12);
        background: var(--cta-background);
        overflow: hidden;
      }
      .dark .cta-section {
        --cta-background: linear-gradient(135deg, #050812 0%, #0F1C2A 35%, #051F2F 100%);
        --cta-text: #F5F5F5;
        --cta-subtext: rgba(226, 234, 249, 0.78);
        --cta-highlight: rgba(50,184,198,0.2);
        --cta-button-border: rgba(50,184,198,0.5);
        --cta-button-bg: #F8FBFF;
        --cta-button-text: #0F172A;
        --cta-social-shadow: rgba(50,184,198,0.2);
      }
      .cta-glow-overlay {
        position: absolute;
        inset: -30% -10%;
        background: var(--cta-overlay-gradient, radial-gradient(circle at 25% 35%, rgba(50,184,198,0.2), transparent 55%), radial-gradient(circle at 70% 50%, rgba(139,92,246,0.18), transparent 60%));
        background-size: 180% 180%;
        filter: blur(calc(var(--cta-overlay-blur, 70px) * 0.8));
        opacity: var(--cta-overlay-opacity, 0.16);
        mix-blend-mode: normal;
        animation: none;
        pointer-events: none;
        z-index: -2;
      }
      .dark .cta-glow-overlay {
        --cta-overlay-gradient: radial-gradient(circle at 25% 35%, rgba(50,184,198,0.25), transparent 55%), radial-gradient(circle at 70% 50%, rgba(139,92,246,0.2), transparent 60%), radial-gradient(circle at 60% 70%, rgba(59,130,246,0.18), transparent 65%);
        --cta-overlay-opacity: 0.32;
        --cta-overlay-blur: 95px;
        --cta-overlay-blend: screen;
      }
      .cta-glow-wave {
        position: absolute;
        inset: -20% -5%;
        background: linear-gradient(110deg, rgba(50,184,198,0.16), rgba(139,92,246,0.12), rgba(59,130,246,0.14));
        filter: blur(80px);
        opacity: 0.18;
        animation: none;
        mix-blend-mode: normal;
        pointer-events: none;
        z-index: -1;
      }
      .cta-card {
        max-width: 800px;
        margin: 0 auto;
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 24px;
      }
      .cta-headline {
        font-family: 'Space Grotesk', sans-serif;
        font-size: clamp(40px, 6vw, 64px);
        font-weight: 700;
        letter-spacing: -0.02em;
        color: var(--cta-text);
        line-height: 1.2;
        text-shadow: 0 10px 35px rgba(10,150,170,0.35);
        margin: 0;
      }
      .cta-subtitle {
        font-size: clamp(16px, 3vw, 18px);
        line-height: 1.6;
        margin: 0 auto 32px;
        max-width: 600px;
        color: var(--cta-subtext);
      }
      .cta-primary-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        padding: 16px 48px;
        border-radius: 999px;
        border: 2px solid var(--cta-button-border);
        background: var(--cta-button-bg);
        color: var(--cta-button-text);
        font-weight: 600;
        font-size: 16px;
        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        box-shadow: 0 20px 50px rgba(15,23,42,0.15);
      }
      .cta-primary-btn:hover {
        transform: scale(1.05);
        box-shadow: 0 15px 40px rgba(50,184,198,0.25);
      }
      .cta-primary-btn:focus-visible {
        outline: 2px solid #32B8C6;
        outline-offset: 4px;
      }
      .cta-socials {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 16px;
      }
      .cta-social-btn {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        border-radius: 999px;
        font-weight: 600;
        font-size: 14px;
        padding: 12px 24px;
        color: #fff;
        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .cta-social-btn:hover {
        transform: scale(1.05);
      }
      .cta-social-btn.linkedin {
        background: #0A66C2;
        box-shadow: 0 8px 20px rgba(10,102,194,0.3);
      }
      .cta-social-btn.linkedin:hover {
        background: #004182;
        box-shadow: 0 12px 24px rgba(10,102,194,0.35);
      }
      .cta-social-btn.whatsapp {
        background: #25D366;
        box-shadow: 0 8px 20px rgba(37,211,102,0.3);
      }
      .cta-social-btn.whatsapp:hover {
        background: #1ba745;
        box-shadow: 0 12px 24px rgba(37,211,102,0.4);
      }
      @keyframes ctaGlowFlow {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      @keyframes ctaWaveDrift {
        0% { transform: translateX(-5%) translateY(0); }
        50% { transform: translateX(5%) translateY(-3%); }
        100% { transform: translateX(-5%) translateY(0); }
      }
    `;
    document.head.appendChild(style);
  }, []);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < maxScroll - 8);
    if (maxScroll <= 0) {
      setScrollPercent(1);
    } else {
      setScrollPercent(Math.min(1, Math.max(0, el.scrollLeft / maxScroll)));
    }

    if (window.innerWidth >= 768) {
      const cardWidth = getCardScrollDistance();
      setActiveIndex(Math.round(el.scrollLeft / cardWidth));
    } else {
      setActiveIndex(0);
    }
  }, [getCardScrollDistance]);

  const scheduleUpdate = useCallback(() => {
    if (frameRef.current) return;
    frameRef.current = requestAnimationFrame(() => {
      updateScrollState();
      frameRef.current = null;
    });
  }, [updateScrollState]);

  const scrollByCards = useCallback(
    (direction: 'left' | 'right') => {
      const el = scrollRef.current;
      if (!el) return;
      const cardWidth = getCardScrollDistance();
      el.scrollBy({
        left: direction === 'left' ? -cardWidth : cardWidth,
        behavior: prefersMotionReduced ? 'auto' : 'smooth'
      });
      scheduleUpdate();
    },
    [prefersMotionReduced, getCardScrollDistance, scheduleUpdate]
  );

  const handleLearnMore = useCallback(() => {
    const target = document.getElementById('services');
    if (target) {
      target.scrollIntoView({ behavior: prefersMotionReduced ? 'auto' : 'smooth', block: 'start' });
    }
  }, [prefersMotionReduced]);

  useEffect(() => {
    if (!active) {
      setCanScrollLeft(false);
      setCanScrollRight(true);
      setActiveIndex(0);
      setScrollPercent(0);
      return;
    }

    const el = scrollRef.current;
    if (!el) return;
    scheduleUpdate();
    const onScroll = () => scheduleUpdate();
    const onResize = () => scheduleUpdate();

    const wheelHandler = (event: WheelEvent) => {
      if (window.innerWidth < 768) return;
      if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        event.preventDefault();
        el.scrollBy({
          left: event.deltaY,
          behavior: prefersMotionReduced ? 'auto' : 'smooth'
        });
      }
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    el.addEventListener('wheel', wheelHandler, { passive: false });

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => scheduleUpdate());
      resizeObserver.observe(el);
      Array.from(el.children).forEach((child) => resizeObserver?.observe(child as Element));
    }

    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      el.removeEventListener('wheel', wheelHandler);
      resizeObserver?.disconnect();
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [scheduleUpdate, prefersMotionReduced, active]);

  return (
    <section className="pricing-section relative py-36 overflow-hidden bg-[linear-gradient(135deg,#F5F7FB_0%,#EEF2F8_100%)] dark:bg-[#050810] dark:!bg-[#050810] dark:bg-none transition-colors duration-500">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#F5F7FB_0%,#EEF2F8_100%)] dark:bg-[#050810] dark:bg-none" />
      </div>

      <div className="pricing-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="pricing-header text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 dark:bg-white/10 border border-white/70 dark:border-white/5 text-xs font-bold tracking-[0.35em] uppercase text-slate-500 dark:text-slate-200 shadow-lg shadow-cyan-500/10">
            <Icons.BadgeDollarSign className="w-4 h-4" /> Pricing Teaser
          </span>
          <h2 className="pricing-section-title mt-6 text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white">
            Transparent Pricing
          </h2>
          <p className="pricing-section-subtitle text-lg md:text-xl text-slate-600 dark:text-slate-300 mt-4 max-w-3xl mx-auto">
            No hidden fees. Just clear ROI.
          </p>
        </motion.div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#F7FAFF] to-transparent hidden md:block dark:hidden" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#F7FAFF] to-transparent hidden md:block dark:hidden" />

          <div
            ref={scrollRef}
            className="pricing-cards-grid flex flex-col gap-6 md:flex-row md:gap-8 md:overflow-x-auto md:scroll-smooth md:snap-x md:snap-mandatory md:pb-10 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {cards.map((card, idx) => {
              const Icon = (Icons as any)[card.icon] || Icons.Package;
              const accentClass =
                card.accent === 'teal'
                  ? 'border-[#32B8C6] shadow-[0_0_15px_rgba(50,184,198,0.15)] dark:shadow-[0_0_35px_rgba(50,184,198,0.55)]'
                  : 'border-[#9F3AE8] shadow-[0_0_15px_rgba(159,58,232,0.15)] dark:shadow-[0_0_35px_rgba(159,58,232,0.55)]';

              return (
                <motion.article
                  key={card.id}
                  data-pricing-card
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  viewport={{ once: true }}
                  className={`pricing-card relative isolate flex flex-col justify-between rounded-[20px] p-8 gap-6 border-2 bg-white/95 text-[#1A1A1A] shadow-[0_10px_30px_rgba(15,23,42,0.08)] hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_20px_45px_rgba(15,23,42,0.15)] dark:bg-[rgba(15,20,35,0.85)] dark:text-white dark:shadow-[0_10px_45px_rgba(0,0,0,0.55)] backdrop-blur-[20px] md:flex-[0_0_330px] md:w-[330px] md:snap-start group overflow-hidden ${accentClass}`}
                >
                  <div className="pricing-card-content relative z-10 flex flex-col h-full gap-6">
                    {card.badge && (
                      <span className="pricing-badge self-start px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-[linear-gradient(135deg,#32B8C6,#9F3AE8)] text-white shadow-lg">
                        {card.badge}
                      </span>
                    )}
                    <div
                      className={`pricing-card-icon w-14 h-14 rounded-2xl bg-gradient-to-br from-white to-white/80 dark:from-white/5 dark:to-white/0 flex items-center justify-center border border-white/80 dark:border-white/15 transition-transform group-hover:scale-105 ${
                        card.accent === 'teal'
                          ? 'shadow-[0_0_12px_rgba(50,184,198,0.35)]'
                          : 'shadow-[0_0_12px_rgba(159,58,232,0.35)]'
                      }`}
                    >
                      <Icon className="w-7 h-7" style={{ color: card.iconColor }} />
                    </div>
                    <div>
                      <h3 className="pricing-card-title text-[20px] font-display font-semibold mb-4 text-[#1A1A1A] dark:text-white">{card.name}</h3>
                      <div className="flex items-baseline gap-2">
                        <span className="pricing-card-price text-[32px] leading-none font-bold text-[#32B8C6] dark:text-[#7DE6F7]">{card.price}</span>
                        <span className="pricing-card-price-unit text-[14px] text-[#666666] dark:text-[#A0A0A0]">{card.note}</span>
                      </div>
                    </div>
                    <ul className="pricing-card-features space-y-3 text-[14px] text-[#333333] dark:text-[#E0E0E0] flex-1">
                      {card.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-left leading-relaxed text-current"
                        >
                          <span className="text-[#32B8C6] text-lg font-semibold">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={handleLearnMore}
                    className="pricing-card-button relative z-10 mt-auto inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#32B8C6] to-[#1E6FA8] text-white font-semibold py-3 px-4 w-full transition-all duration-300 hover:scale-[1.02] shadow-[0_0_12px_rgba(50,184,198,0.35)] hover:shadow-[0_0_20px_rgba(50,184,198,0.55)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#32B8C6] dark:focus-visible:ring-offset-[#050810]"
                  >
                    Learn More <Icons.ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </motion.article>
              );
            })}
          </div>

          <div className="hidden md:flex items-center justify-between mt-10">
            <div className="flex gap-2">
              {cards.map((_, idx) => (
                <span
                  key={`dot-${idx}`}
                  className={`h-2 w-2 rounded-full transition-all ${
                    idx === Math.min(activeIndex, Math.max(cards.length - 1, 0))
                      ? 'bg-[#0F172A] dark:bg-[#32B8C6] w-6'
                      : 'bg-[#0F172A]/20 dark:bg-white/20'
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-4">
              <button
                className="flex items-center justify-center w-12 h-12 rounded-full bg-white/90 dark:bg-white/10 text-slate-900 dark:text-white shadow-xl disabled:opacity-30 disabled:cursor-not-allowed transition"
                onClick={() => scrollByCards('left')}
                disabled={!canScrollLeft}
                aria-label="Scroll pricing cards left"
              >
                <Icons.ChevronLeft />
              </button>
              <button
                className="flex items-center justify-center w-12 h-12 rounded-full bg-white/90 dark:bg-white/10 text-slate-900 dark:text-white shadow-xl disabled:opacity-30 disabled:cursor-not-allowed transition"
                onClick={() => scrollByCards('right')}
                disabled={!canScrollRight}
                aria-label="Scroll pricing cards right"
              >
                <Icons.ChevronRight />
              </button>
            </div>
          </div>

          <div className="hidden md:block mt-6">
            <div className="h-1 rounded-full bg-white/10 dark:bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#32B8C6] to-[#9F3AE8] transition-[width] duration-500"
                style={{ width: `${scrollPercent * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQ_SECTION_STYLE_ID = 'faq-section-style';
const CTA_SECTION_STYLE_ID = 'cta-section-style';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { services, testimonials, pricing, faqs, socialLinks, homepageContent } = useData();
  const resolvedContent = useMemo(() => {
    return {
      ...DEFAULT_HOMEPAGE_CONTENT,
      ...homepageContent,
      problems: (homepageContent?.problems?.length ? homepageContent.problems : DEFAULT_HOMEPAGE_CONTENT.problems).map((problem) => ({
        ...problem,
        id: problem.id ?? crypto.randomUUID()
      }))
    };
  }, [homepageContent]);
  const resolvedTestimonials = useMemo(() => {
    const source = testimonials.length ? testimonials : TESTIMONIALS;
    return source.map((testimonial, index) => {
      const theme = STATIC_TESTIMONIAL_THEMES[index % STATIC_TESTIMONIAL_THEMES.length];
      return {
        id: testimonial.id,
        name: testimonial.name,
        company: testimonial.company,
        quote: testimonial.content,
        rating: testimonial.rating,
        ...theme
      };
    });
  }, [testimonials]);
  const resolvedServices = useMemo(() => {
    return services.length ? services : STATIC_SERVICES;
  }, [services]);
  const resolvedPricing = useMemo(() => {
    const source = pricing.length ? pricing : PRICING_TIERS;
    return source.map<PricingTeaserCard>((tier) => {
      const meta = PRICING_CARD_META[tier.id] ?? DEFAULT_PRICING_CARD_META;
      return {
        ...tier,
        ...meta,
        badge: tier.recommended ? meta.badge ?? 'Recommended' : meta.badge
      };
    });
  }, [pricing]);
  const resolvedFaqs = useMemo(() => {
    const source = faqs.length ? faqs : FAQ_ITEMS;
    return source.map(item => ({
      id: item.id,
      question: (item as FaqItem & { question?: string }).question ?? item.q,
      answer: (item as FaqItem & { answer?: string }).answer ?? item.a
    }));
  }, [faqs]);
  const resolvedSocial = useMemo(() => ({
    linkedin: socialLinks.linkedin || 'https://linkedin.com',
    whatsapp: socialLinks.whatsapp || 'https://wa.me/60164071129?text=Hi%20Aurexis%20Solution'
  }), [socialLinks]);

  const containerRef = useRef<HTMLDivElement>(null);
  const servicesSectionRef = useRef<HTMLElement | null>(null);
  const pricingSectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const prefersReducedMotion = useReducedMotion();
  const servicesInView = useInView(servicesSectionRef, { margin: '-25% 0px -25% 0px' });
  const pricingInView = useInView(pricingSectionRef, { margin: '-25% 0px -25% 0px' });
  const [flippedCard, setFlippedCard] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [openFaqs, setOpenFaqs] = useState<string[]>([]);
  const [hoveredFaq, setHoveredFaq] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const node = containerRef.current;
    if (!node) return;
    if (window.getComputedStyle(node).position === 'static') {
      node.style.position = 'relative';
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const root = document.documentElement;
    const updateTheme = () => setIsDarkMode(root.classList.contains('dark'));
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const toggleFaq = useCallback((id: string) => {
    setOpenFaqs((prev) => (prev.includes(id) ? prev.filter((faqId) => faqId !== id) : [...prev, id]));
  }, []);
  const isFaqOpen = useCallback((id: string) => openFaqs.includes(id), [openFaqs]);
  
  const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
    const IconComponent = (Icons as any)[name];
    return IconComponent ? <IconComponent className={className} /> : <Icons.Activity className={className} />;
  };

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemAnim: Variants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 15 } }
  };

  return (
    <div ref={containerRef} className="relative overflow-x-hidden selection:bg-blue-500 selection:text-white">
      <Hero />

      {/* Tech Stack Strip */}
      <div className="py-12 border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm relative z-20">
        <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
             <p className="text-xs font-bold text-gray-500 dark:text-gray-500 uppercase tracking-widest font-display">Powered By Modern Tech Stack</p>
        </div>
        <div className="relative flex overflow-x-hidden group">
            <div className="flex animate-[scroll_40s_linear_infinite] group-hover:[animation-play-state:paused] space-x-20 whitespace-nowrap py-4">
                 {[...Array(3)].map((_, setIndex) => (
                    <React.Fragment key={setIndex}>
                        {TECH_STACK.map((tech, i) => {
                            const Icon = (Icons as any)[tech.icon] || Icons.Code;
                            return (
                                <span key={i} className="group/item text-xl font-bold text-gray-400 dark:text-gray-600 flex items-center gap-3 grayscale hover:grayscale-0 transition-all duration-300 cursor-default hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 font-display">
                                    <Icon className="w-6 h-6 opacity-50 group-hover/item:opacity-100 transition-opacity" /> {tech.name}
                                </span>
                            );
                        })}
                    </React.Fragment>
                 ))}
            </div>
            {/* Fade edges */}
            <div className="absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-white dark:from-gray-950 to-transparent z-10" />
            <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-white dark:from-gray-950 to-transparent z-10" />
        </div>
      </div>

      {/* Problem Statement Section */}
      <section className="relative py-24">
        <div className="absolute inset-0">
          <ProblemShapes reducedMotion={!!prefersReducedMotion} />
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/80 to-white dark:from-[#0B1120] dark:via-[#0B1120]/95 dark:to-[#0B1120] pointer-events-none" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/70 dark:bg-white/10 text-slate-600 dark:text-slate-200 text-xs uppercase tracking-[0.35em] border border-white/70 dark:border-white/10 shadow-lg shadow-white/30 backdrop-blur">
              <Icons.Radar className="w-4 h-4" /> {resolvedContent.problemEyebrow}
            </span>
            <h2 id="problem-statement" className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mt-6 mb-4">
              {resolvedContent.problemTitle}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              {resolvedContent.problemSubtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-100/40 via-transparent to-orange-100/40 dark:from-cyan-500/10 dark:via-transparent dark:to-purple-500/10 blur-3xl pointer-events-none rounded-[60px]" />
            {resolvedContent.problems.map((problem, index) => (
              <ProblemCard key={problem.title} problem={problem} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - Interactive Particle Background */}
      <section className="relative py-32 overflow-hidden" id="services" ref={servicesSectionRef}>
        <div className="absolute inset-0">
          <InteractiveParticleBackground reducedMotion={!!prefersReducedMotion} active={servicesInView || false} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-24"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 dark:bg-white/10 border border-white/70 dark:border-white/10 text-xs font-bold tracking-[0.35em] uppercase text-slate-500 dark:text-slate-200 shadow-lg shadow-cyan-500/10">
              <Icons.Sparkles className="w-4 h-4 text-cyan-500" /> Services
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 font-display mt-6">
                Digital Mastery,<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#32B8C6] to-[#9F3AE8]"> Delivered.</span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Comprehensive technical solutions designed to scale your business from startup to enterprise.
            </p>
          </motion.div>

          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {resolvedServices.map((service, index) => (
              <motion.div key={service.id} variants={itemAnim} className="h-full">
                <TiltCard className="h-full" variant="glass">
                    <div
                      className="flex flex-col h-full"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                          {/* 3D Floating Icon Box */}
                          <div style={{ transform: "translateZ(50px)" }} className="mb-8">
                              <div className="w-16 h-16 rounded-2xl bg-[rgba(255,255,255,0.7)] dark:bg-[rgba(255,255,255,0.05)] border border-white/80 dark:border-white/10 shadow-[0_20px_40px_rgba(2,18,33,0.12)] flex items-center justify-center group-hover:scale-110 transition-transform duration-500 relative overflow-hidden">
                                  <div className="absolute inset-0 bg-gradient-to-tr from-[#32B8C6]/50 to-[#9F3AE8]/40 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                  <DynamicIcon name={service.icon} className="w-8 h-8 text-[#0F172A] dark:text-[#32B8C6] relative z-10" />
                              </div>
                          </div>
                          
                          <h3 
                              style={{ transform: "translateZ(30px)" }} 
                              className="text-2xl font-bold text-slate-900 dark:text-white mb-4 font-display group-hover:text-[#32B8C6] dark:group-hover:text-[#32B8C6] transition-colors"
                          >
                              {service.title}
                          </h3>
                          
                          <p 
                              style={{ transform: "translateZ(20px)" }} 
                              className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed flex-grow text-sm"
                          >
                              {service.description}
                          </p>
                          
                          {/* Interactive 3D Tech Pills */}
                          <div style={{ transform: "translateZ(25px)" }} className="flex flex-wrap gap-2 mb-8">
                              {service.features.map((f, i) => (
                                  <span 
                                      key={i} 
                                      className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] bg-white/60 dark:bg-white/5 text-slate-600 dark:text-slate-200 border border-white/70 dark:border-white/10 hover:text-white hover:bg-gradient-to-r hover:from-[#32B8C6] hover:to-[#9F3AE8] transition-all cursor-default hover:scale-105 hover:shadow-[0_12px_24px_rgba(50,184,198,0.25)]"
                                  >
                                      {f}
                                  </span>
                              ))}
                          </div>
                          
                          <div style={{ transform: "translateZ(20px)" }} className="flex items-center justify-between border-t border-white/70 dark:border-white/10 pt-6 mt-auto">
                              <span className="text-sm font-bold text-slate-500 dark:text-slate-300">{service.price}</span>
                              <div 
                                onClick={() => navigate(`/services/${service.id}`)}
                                className="flex items-center gap-2 text-[#32B8C6] font-semibold text-sm group-hover:gap-3 transition-all cursor-pointer hover:text-[#9F3AE8]"
                              >
                                  Learn More <Icons.ArrowRight size={16} />
                              </div>
                          </div>
                    </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Aurexis Solution */}
      <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(135deg,#F5F7FB_0%,#EEF2F8_100%)] dark:bg-[linear-gradient(135deg,#1F2121_0%,#134252_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
        <div className="absolute inset-0 pointer-events-none">
          {WHY_FLOATING_ICONS.map((icon) => (
            <span
              key={icon.id}
              className={`floating-icon absolute text-[#32B8C6] drop-shadow-[0_0_20px_rgba(50,184,198,0.4)] opacity-35 font-bold ${icon.hideOnMobile ? 'hidden md:block' : ''}`}
              style={{
                fontSize: icon.size,
                top: icon.top,
                left: icon.left ?? undefined,
                right: icon.right ?? undefined
              }}
            >
              {icon.char}
            </span>
          ))}
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <div>
                <p className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
                  Why <span className="text-[#32B8C6]">Aurexis Solution?</span>
                </p>
                <p className="mt-6 text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                  We don&apos;t just write code; we engineer competitive advantages. Our stack is modern, our process is transparent, and our results are measurable.
                </p>
              </div>
              <button
                className="inline-flex items-center justify-center rounded-lg bg-white text-[#1A1A1A] font-semibold text-base md:text-lg px-7 py-3 transition-all duration-200 shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_18px_35px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#32B8C6]"
              >
                Schedule a Discovery Call
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {WHY_BENEFITS.map((benefit, idx) => (
                <div
                  key={benefit.title}
                  className="relative p-6 rounded-2xl border border-[#32B8C6]/25 bg-white/90 dark:bg-[rgba(20,30,50,0.7)] backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-[#32B8C6]/50 hover:shadow-[0_30px_60px_rgba(50,184,198,0.18)]"
                >
                  <div className="w-14 h-14 rounded-xl border border-[#32B8C6]/30 bg-[#32B8C6]/10 text-[#32B8C6] flex items-center justify-center text-3xl mb-5">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{benefit.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Teaser - Horizontal Scroll */}
      <section
        id="pricing"
        ref={pricingSectionRef}
        className="relative py-24"
      >
        <PricingTeaser active={pricingInView || false} cards={resolvedPricing} />
      </section>

      {/* Client Success Stories */}
      <section className="relative overflow-hidden py-20 sm:py-24 bg-gradient-to-b from-[#F5F7FB] to-[#EEF2F8] dark:bg-[#050810] dark:from-[#050810] dark:to-[#050810]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="hidden dark:block absolute -top-40 -left-32 w-[32rem] h-[32rem] bg-[#32B8C6]/20 blur-[140px]" />
          <div className="hidden dark:block absolute bottom-[-20%] right-[-10%] w-[36rem] h-[36rem] bg-[#9F3AE8]/15 blur-[150px]" />
        </div>
        <div className="relative max-w-[1300px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-14">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-[rgba(50,184,198,0.3)] bg-[rgba(50,184,198,0.15)] mx-auto">
              <span className="text-[#32B8C6] text-[16px]" role="img" aria-label="speech bubble">💬</span>
              <span className="text-[12px] font-semibold tracking-[0.2em] text-[#A0A0A0] uppercase">Testimonials</span>
            </div>
            <h2 className="mt-4 text-[32px] sm:text-[40px] md:text-[48px] font-bold text-white font-display leading-tight">
              Client Success Stories
            </h2>
            <p className="mt-3 text-base text-[#A0A0A0]">
              See what our clients achieved with Aurexis Solution.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {resolvedTestimonials.map((story) => {
              const darkBaseGradient = 'linear-gradient(135deg, rgba(35, 55, 85, 0.88), rgba(25, 45, 75, 0.75))';
              const darkHoverGradient = 'linear-gradient(135deg, rgba(45, 65, 95, 0.95), rgba(30, 50, 80, 0.88))';
              const lightBaseGradient = 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(228,235,248,0.9))';
              const lightHoverGradient = 'linear-gradient(135deg, rgba(250,252,255,0.98), rgba(220,230,248,0.95))';
              const cardGradient = isDarkMode ? darkBaseGradient : lightBaseGradient;
              const hoverGradient = isDarkMode ? darkHoverGradient : lightHoverGradient;
              const baseBackground = `${cardGradient}, ${story.accentOverlay}`;
              const hoverBackground = `${hoverGradient}, ${story.accentOverlay}`;
              const baseShadow = isDarkMode
                ? '0 8px 32px rgba(0,0,0,0.35), 0 0 20px rgba(50,184,198,0.18)'
                : '0 12px 30px rgba(15,23,42,0.12), 0 0 16px rgba(50,184,198,0.15)';
              const hoverShadow = isDarkMode
                ? '0 18px 50px rgba(0,0,0,0.45), 0 0 32px rgba(50,184,198,0.3)'
                : '0 20px 45px rgba(15,23,42,0.18), 0 0 28px rgba(50,184,198,0.28)';
              const nameColor = isDarkMode ? '#ffffff' : '#101828';
              const companyColor = isDarkMode ? '#A0A0A0' : '#4B5565';
              const hintColor = isDarkMode ? '#707070' : '#5F6B7C';
              const quoteColor = isDarkMode ? 'rgba(255,255,255,0.5)' : 'rgba(15,23,42,0.4)';
              if (prefersReducedMotion) {
                return (
                  <div key={story.id} className="flex justify-center">
                    <div
                      className="relative w-full max-w-[300px] h-[340px] overflow-hidden rounded-[16px] backdrop-blur-[20px] p-8 space-y-5 text-white before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.25),transparent_60%)] before:opacity-60 before:content-[''] after:absolute after:inset-[2px] after:rounded-[14px] after:border after:border-white/5 after:content-['']"
                      style={{
                        borderWidth: '1.5px',
                        borderColor: hoveredCard === story.id ? story.borderHoverColor : story.borderColor,
                        backgroundImage: hoveredCard === story.id ? hoverBackground : baseBackground,
                        backgroundBlendMode: 'screen',
                        boxShadow: `${hoveredCard === story.id ? hoverShadow : baseShadow}, ${story.glowShadow}`
                      }}
                      onMouseEnter={() => setHoveredCard(story.id)}
                      onMouseLeave={() => setHoveredCard((prev) => (prev === story.id ? null : prev))}
                    >
                      <div className="relative z-10">
                        <span
                          className="inline-flex items-center justify-center text-white font-semibold text-[12px] rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
                          style={{
                            backgroundColor: story.badgeColor,
                            padding: '8px 16px'
                          }}
                        >
                          {story.service}
                        </span>
                      </div>
                      <div className="relative z-10 mt-5">
                        <p className="text-[24px] font-semibold" style={{ color: nameColor }}>
                          {story.name}
                        </p>
                        <p className="mt-2 text-[13px]" style={{ color: companyColor }}>
                          {story.company}
                        </p>
                      </div>
                      <div className="relative z-10 mt-6 text-yellow-400 text-lg">{"⭐".repeat(story.rating)}</div>
                      <p className="relative z-10 text-sm italic text-slate-100 leading-relaxed mt-4 flex-1">“{story.quote}”</p>
                      <div className="relative z-10 text-base font-semibold" style={{ color: story.metricColor }}>
                        {story.metric}
                      </div>
                    </div>
                  </div>
                );
              }

              const isFlipped = flippedCard === story.id;

              return (
                <div key={story.id} className="flex justify-center">
                  <div
                    className="group/card relative h-[340px] w-full max-w-[300px] cursor-pointer transition-transform duration-[300ms] [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-[8px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#32B8C6]"
                    style={{ perspective: '1000px' }}
                    onClick={() => setFlippedCard((prev) => (prev === story.id ? null : story.id))}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setFlippedCard((prev) => (prev === story.id ? null : story.id));
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isFlipped}
                    aria-label={`${story.name} testimonial card`}
                    onMouseEnter={() => setHoveredCard(story.id)}
                    onMouseLeave={() => setHoveredCard((prev) => (prev === story.id ? null : prev))}
                  >
                    <div
                      className={`relative h-full w-full transition-[transform] duration-[650ms] ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] [transform-style:preserve-3d] ${
                        isFlipped ? '[transform:rotateY(180deg)]' : ''
                      }`}
                    >
                      <div
                        className="absolute inset-0 rounded-[16px] backdrop-blur-[20px] transition-all duration-300 [backface-visibility:hidden] p-8 flex flex-col justify-between text-white overflow-hidden before:absolute before:inset-0 before:bg-[linear-gradient(120deg,rgba(255,255,255,0.25),transparent_65%)] before:opacity-60 before:content-[''] after:absolute after:inset-[2px] after:rounded-[14px] after:border after:border-white/5 after:content-['']"
                        style={{
                          borderWidth: '1.5px',
                          borderColor: hoveredCard === story.id ? story.borderHoverColor : story.borderColor,
                          backgroundImage: hoveredCard === story.id ? hoverBackground : baseBackground,
                          backgroundBlendMode: 'screen',
                          boxShadow: `${hoveredCard === story.id ? hoverShadow : baseShadow}, ${story.glowShadow}`
                        }}
                      >
                        <div className="flex">
                          <span
                            className="inline-flex items-center justify-center text-white font-semibold text-[12px] rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
                            style={{
                              backgroundColor: story.badgeColor,
                              padding: '8px 16px'
                            }}
                          >
                            {story.service}
                          </span>
                        </div>
                        <div className="mt-5">
                          <p className="text-[24px] font-semibold" style={{ color: nameColor }}>
                          {story.name}
                        </p>
                          <p className="mt-2 text-[13px]" style={{ color: companyColor }}>
                            {story.company}
                          </p>
                        </div>
                        <div className="mt-6 flex flex-col items-center gap-5 text-center text-slate-300">
                          <span className="text-[40px] leading-none" style={{ color: quoteColor }}>
                            “
                          </span>
                          <p className="text-xs italic" style={{ color: hintColor }}>
                            Click to reveal story
                          </p>
                        </div>
                      </div>

                      <div
                        className="absolute inset-0 rounded-[16px] backdrop-blur-[20px] text-white p-8 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.2),transparent_60%)] before:opacity-50 before:content-[''] after:absolute after:inset-[2px] after:rounded-[14px] after:border after:border-white/5 after:content-['']"
                        style={{
                          borderWidth: '1.5px',
                          borderColor: hoveredCard === story.id ? story.borderHoverColor : story.borderColor,
                          background: hoveredCard === story.id ? hoverGradient : cardGradient,
                          boxShadow: hoveredCard === story.id ? hoverShadow : baseShadow
                        }}
                      >
                        <div className="text-yellow-400 text-xl mb-5">{"⭐".repeat(story.rating)}</div>
                        <p className="text-sm italic text-slate-100 leading-relaxed flex-1">“{story.quote}”</p>
                        <div className="text-base font-semibold" style={{ color: story.metricColor }}>
                          {story.metric}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="faq-section relative overflow-hidden py-20 sm:py-24 px-5 sm:px-8">
        <div className="faq-gradient-overlay" />
        <div
          className="absolute inset-0 -z-[5] mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: `url(${NOISE_TEXTURE})`, opacity: 0.04 }}
        />
        <div className="absolute -top-40 right-[-10%] w-[520px] h-[520px] bg-[#32B8C6]/20 blur-[140px] opacity-70 pointer-events-none z-[2]" />
        <div className="absolute bottom-[-20%] left-[-15%] w-[420px] h-[420px] bg-[#9F3AE8]/15 blur-[130px] opacity-70 pointer-events-none z-[2]" />

        <div className="relative z-10 max-w-[900px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="space-y-4 mb-16"
          >
            <div
              className="faq-badge inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full border-2 text-xs font-semibold tracking-[0.35em] uppercase mx-auto transition-all"
              style={{
                borderColor: 'var(--badge-border)',
                color: 'var(--color-primary)',
                background: 'var(--badge-bg)',
                boxShadow: 'var(--badge-shadow)'
              }}
            >
              <Icons.HelpCircle className="w-4 h-4" />
              <span>F A Q</span>
            </div>
            <h2
              className="text-4xl sm:text-5xl font-semibold font-display leading-tight mt-6"
              style={{ color: 'var(--color-text)' }}
            >
              Questions? Answered.
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Everything you need to know about our services
            </p>
          </motion.div>

          <div className="space-y-3 sm:space-y-4 text-left">
            {resolvedFaqs.map((item, idx) => {
              const open = isFaqOpen(item.id);
              return (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: idx * 0.05 }}
                  onMouseEnter={() => setHoveredFaq(item.id)}
                  onMouseLeave={() => setHoveredFaq((prev) => (prev === item.id ? null : prev))}
                  className="group rounded-2xl border-2 backdrop-blur-xl px-5 sm:px-6 py-4 sm:py-6 transition-all duration-300 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-transparent"
                  style={{
                    background:
                      hoveredFaq === item.id || open ? 'var(--faq-item-hover)' : 'var(--faq-item-bg)',
                    borderColor: hoveredFaq === item.id || open ? 'var(--color-primary)' : 'var(--color-border)',
                    boxShadow: hoveredFaq === item.id || open ? 'var(--card-hover-shadow)' : 'var(--card-shadow)'
                  }}
                >
                  <button
                    id={`faq-trigger-${item.id}`}
                    aria-controls={`faq-panel-${item.id}`}
                    aria-expanded={open}
                    onClick={() => toggleFaq(item.id)}
                    className="flex w-full items-center gap-4 sm:gap-6 text-left focus-visible:outline-none"
                  >
                    <div className="flex-1">
                      <p
                        className="text-lg sm:text-xl font-semibold tracking-tight transition-colors duration-300"
                        style={{ color: open ? 'var(--color-primary)' : 'var(--color-text)' }}
                      >
                        {item.question}
                      </p>
                    </div>
                    <motion.span
                      aria-hidden="true"
                      animate={{ rotate: open ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      className="flex h-11 w-11 items-center justify-center rounded-full shadow-[0_10px_30px_rgba(50,184,198,0.2)] transition-colors"
                      style={{
                        border: `1px solid var(--color-border)`,
                        background: 'var(--faq-icon-bg)',
                        color: 'var(--color-primary)'
                      }}
                    >
                      <Icons.Plus className="w-5 h-5" />
                    </motion.span>
                  </button>
                  <motion.div
                    id={`faq-panel-${item.id}`}
                    role="region"
                    aria-labelledby={`faq-trigger-${item.id}`}
                    initial={false}
                    animate={{
                      height: open ? 'auto' : 0,
                      opacity: open ? 1 : 0,
                      marginTop: open ? 16 : 0
                    }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div
                      className="pt-4 border-t text-base leading-relaxed"
                      style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}
                    >
                      {item.answer}
                    </div>
                  </motion.div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="cta-section relative overflow-hidden text-center px-4">
        <div className="cta-glow-overlay" />
        <div className="cta-glow-wave" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6"
        >
          <div className="cta-pill tracking-[0.35em] font-semibold">
            <Icons.Sparkles className="w-4 h-4" />
            {resolvedContent.ctaPill || 'CTA'}
          </div>
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="text-[48px] sm:text-[56px] md:text-[64px] font-display font-bold leading-tight"
            style={{ color: 'var(--cta-text)', textShadow: '0 10px 35px rgba(10,150,170,0.35)' }}
          >
            {resolvedContent.ctaHeadline}
          </motion.h2>
          <p
            className="text-lg sm:text-xl max-w-2xl mx-auto"
            style={{ color: 'var(--cta-subtext)' }}
          >
            {resolvedContent.ctaBody}
          </p>
          <div className="flex flex-col items-center gap-5 mt-4">
            <button
              onClick={() => navigate(resolvedContent.ctaPrimaryLink || '/contact')}
              className="cta-primary-btn group"
            >
              {resolvedContent.ctaPrimaryLabel}
              <Icons.ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            <p className="text-sm" style={{ color: 'var(--cta-subtext)' }}>
              Or connect with us directly:
            </p>
            <div className="cta-socials">
              <a
                href={resolvedSocial.linkedin}
                target="_blank"
                rel="noreferrer"
                className="cta-social-btn linkedin"
              >
                <Icons.Linkedin className="w-5 h-5" />
                LinkedIn
              </a>
              <a
                href={resolvedSocial.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="cta-social-btn whatsapp"
              >
                <Icons.MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
            </div>
            <p className="text-[13px] mt-4" style={{ color: 'var(--cta-subtext)' }}>
              No commitment required. 100% free discovery call.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;