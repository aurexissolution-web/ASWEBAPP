import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
import {
  Sparkles,
  Zap,
  Brain,
  MessageCircle,
  Activity,
  Globe,
  ShieldCheck,
  DollarSign,
  Shield,
  TrendingUp
} from 'lucide-react';
import type { ServiceHeroStat } from '../types';

type StatCardProps = {
  title: string;
  value: string;
  subtext: string;
  textColor: string;
  glowColor: string;
  borderColor: string;
  icon: React.ComponentType<{ size?: number }>;
  position: { x: number; y: number };
  delay: number;
  parallaxX: any;
  parallaxY: any;
};

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtext,
  textColor,
  glowColor,
  borderColor,
  icon: Icon,
  position,
  delay,
  parallaxX,
  parallaxY
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const x = useTransform(parallaxX, value => value + position.x);
  const y = useTransform(parallaxY, value => value + position.y);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 60, damping: 12 }}
      style={{ x, y, zIndex: 20 }}
      className={`absolute hidden md:flex flex-col items-start justify-center p-4 rounded-xl backdrop-blur-xl border border-slate-200 bg-white/80 shadow-2xl transition-all duration-500 group min-w-[200px] hover:scale-105 hover:bg-white dark:border-white/10 dark:bg-slate-900/60 dark:hover:bg-slate-800/80 ${borderColor}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Holographic Header Bar */}
      <div className={`absolute top-0 left-0 right-0 h-0.5 rounded-t-xl bg-gradient-to-r ${glowColor.replace('bg-', 'from-')} to-transparent opacity-60`} />
      
      {/* Hover Particles */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${glowColor}`}
              initial={{ x: "50%", y: "50%", opacity: 1, scale: 0 }}
              animate={{
                x: `${50 + (Math.random() - 0.5) * 200}%`,
                y: `${50 + (Math.random() - 0.5) * 200}%`,
                opacity: 0,
                scale: Math.random() * 2,
              }}
              transition={{ duration: 0.8, ease: "easeOut", repeat: Infinity, repeatDelay: Math.random() * 0.5 }}
            />
          ))}
        </div>
      )}

      <div className="flex items-center gap-2 mb-2 w-full">
        <div className={`p-2 rounded-lg bg-white text-slate-700 ring-1 ring-slate-100 transition-colors group-hover:ring-slate-200 dark:bg-white/5 dark:text-white dark:ring-white/10 ${textColor}`}>
          <Icon size={18} />
        </div>
        <div className={`h-[1px] flex-1 bg-gradient-to-r ${glowColor.replace('bg-', 'from-')} to-transparent opacity-60`} />
      </div>
      
      <div className={`text-3xl font-black ${textColor} drop-shadow-[0_0_10px_rgba(59,130,246,0.15)] mb-0.5 tracking-tight tabular-nums`}>
        {value}
      </div>
      
      <div className="text-xs font-bold text-slate-600 mb-0.5 tracking-wide dark:text-white">{title}</div>
      <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1 dark:text-slate-400">
        <div className={`w-1.5 h-1.5 rounded-full ${glowColor} animate-pulse`} />
        {subtext}
      </div>
    </motion.div>
  );
};

const ConnectionLine = ({ start, end, color }) => {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
      <defs>
        <linearGradient id={`grad-${color}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor={color} stopOpacity="0.5" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <motion.path
        d={`M${start.x + (window.innerWidth >= 1024 ? 0 : 0)} ${start.y} L${end.x} ${end.y}`} // Simplified logic, assumes center is 0,0 relative to SVG center? No, SVG is typically full width.
        // We need coordinates relative to the SVG center.
        // Since we can't easily get exact absolute pixel coords in this setup without refs, 
        // we'll rely on the parent being flex centered and use relative offsets from center (50% 50%).
        stroke={`url(#grad-${color})`}
        strokeWidth="1"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />
      {/* Data packet */}
      <motion.circle
        r="2"
        fill={color}
        initial={{ offsetDistance: "0%" }}
        animate={{ offsetDistance: "100%" }}
        style={{ offsetPath: `path("M${start.x} ${start.y} L${end.x} ${end.y}")` }} // Modern browsers only
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  );
};
// Note: ConnectionLine logic above is tricky with responsive/centered coords. 
// A better approach is using absolute divs for lines rotated to connect.
// Or just drawing lines from center (0,0) to (x,y) inside a group translated to center.

const Beam = ({ angle, length, color, delay }) => {
  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: length, opacity: 1 }}
      transition={{ duration: 0.8, delay }}
      className="absolute top-1/2 left-1/2 h-[1px] origin-left z-0"
      style={{ 
        rotate: angle, 
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`
      }}
    >
      <motion.div 
        className={`absolute top-1/2 right-0 w-1 h-1 rounded-full ${color.replace('rgba', 'rgb').replace('0.5', '1')} blur-[1px] -translate-y-1/2`}
        animate={{ opacity: [0, 1, 0], scale: [1, 1.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
}

interface MobileStatCardProps {
  title: string;
  value: string;
  subtext: string;
  textColor: string;
  bgIconColor: string;
  icon: React.ComponentType<{ size?: number }>;
}

const MobileStatCard: React.FC<MobileStatCardProps> = ({ title, value, subtext, textColor, bgIconColor, icon: Icon }) => (
  <div className="flex items-center gap-4 p-4 rounded-xl backdrop-blur-xl border border-slate-200 bg-white/90 w-full max-w-sm mx-auto shadow-lg relative overflow-hidden group dark:border-white/10 dark:bg-slate-900/60">
    <div className={`absolute inset-0 bg-gradient-to-r ${bgIconColor} opacity-0 group-hover:opacity-15 transition-opacity duration-300`} />
    <div className={`p-2.5 rounded-lg bg-white text-slate-700 shadow-sm ${textColor} relative z-10 dark:bg-white/5 dark:text-white`}>
      <Icon size={24} />
    </div>
    <div className="flex-1 relative z-10">
      <div className={`text-2xl font-black ${textColor}`}>{value}</div>
      <div className="text-sm font-bold text-slate-700 dark:text-white">{title}</div>
    </div>
    <div className="text-xs text-slate-500 text-right max-w-[100px] leading-tight relative z-10 dark:text-slate-400">{subtext}</div>
  </div>
);

const accentStyles = {
  cyan: { text: 'text-cyan-400', glow: 'bg-cyan-400', border: 'border-cyan-500/30', mobileBg: 'from-cyan-500/20 to-transparent' },
  emerald: { text: 'text-emerald-400', glow: 'bg-emerald-400', border: 'border-emerald-500/30', mobileBg: 'from-emerald-500/20 to-transparent' },
  purple: { text: 'text-fuchsia-400', glow: 'bg-fuchsia-400', border: 'border-fuchsia-500/30', mobileBg: 'from-fuchsia-500/20 to-transparent' },
  blue: { text: 'text-blue-400', glow: 'bg-blue-400', border: 'border-blue-500/30', mobileBg: 'from-blue-500/20 to-transparent' },
  pink: { text: 'text-pink-400', glow: 'bg-pink-400', border: 'border-pink-500/30', mobileBg: 'from-pink-500/20 to-transparent' }
};

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  MessageCircle,
  Zap,
  Sparkles,
  Brain,
  Activity,
  Globe,
  ShieldCheck,
  DollarSign,
  Shield,
  TrendingUp
};

const DEFAULT_STATS: ServiceHeroStat[] = [
  { title: 'Leads Captured', value: '+2.4k', subtext: '24/7 Auto-Pilot', icon: 'MessageCircle', accent: 'emerald' },
  { title: 'Time Saved', value: '80%', subtext: 'Process Optimization', icon: 'Zap', accent: 'cyan' },
  { title: 'AI Accuracy', value: '99.9%', subtext: 'Predictive Models', icon: 'Sparkles', accent: 'purple' }
];

interface AiHeroWidgetProps {
  stats?: ServiceHeroStat[];
}

const AiHeroWidget: React.FC<AiHeroWidgetProps> = ({ stats }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width - 0.5);
    mouseY.set((e.clientY - top) / height - 0.5);
  };

  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  const parallaxX = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);
  const parallaxY = useTransform(mouseY, [-0.5, 0.5], [-20, 20]);

  const positions = [
    { x: 0, y: -160 },
    { x: -200, y: 80 },
    { x: 200, y: 80 }
  ];

  const resolvedStats = (stats && stats.length ? stats : DEFAULT_STATS).slice(0, 3);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-[400px] lg:h-[500px] flex items-center justify-center perspective-1000 overflow-visible"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full h-full flex flex-col items-center justify-center"
      >
        {/* Connection Beams (Desktop) - Angles calculated roughly based on positions */}
        <div className="hidden md:block absolute inset-0 pointer-events-none">
          {/* Top Beam (-90 deg) */}
          <Beam angle={-90} length={160} color="rgba(52, 211, 153, 0.5)" delay={0.5} />
          {/* Bottom Left Beam (157 deg approx) */}
          <Beam angle={157} length={215} color="rgba(34, 211, 238, 0.5)" delay={0.7} />
          {/* Bottom Right Beam (23 deg approx) */}
          <Beam angle={23} length={215} color="rgba(232, 121, 249, 0.5)" delay={0.9} />
        </div>

        {/* Orbital Rings - Background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <motion.div 
            animate={{ rotate: 360, scale: [1, 1.02, 1] }}
            transition={{ rotate: { duration: 40, repeat: Infinity, ease: "linear" }, scale: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
            className="w-[280px] h-[280px] md:w-[480px] md:h-[480px] rounded-full border border-cyan-500/10 border-dashed"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute w-[220px] h-[220px] md:w-[360px] md:h-[360px] rounded-full border border-emerald-500/10 border-dotted opacity-50"
          />
          {/* Inner tight ring */}
          <div className="absolute w-[140px] h-[140px] rounded-full border border-slate-200/60 animate-pulse dark:border-white/5" />
        </div>

        {/* Central Core */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1, type: "spring" }}
          className="relative z-10 mb-8 md:mb-0"
        >
          {/* Core Glow */}
          <div className="w-32 h-32 md:w-44 md:h-44 rounded-full bg-gradient-radial from-cyan-400/20 via-blue-100/10 to-transparent blur-3xl animate-pulse-slow absolute inset-0 -translate-x-4 -translate-y-4 dark:from-cyan-500/20 dark:via-blue-900/10" />
          
          {/* Core Body */}
          <div className="w-24 h-24 md:w-36 md:h-36 rounded-full bg-white/80 backdrop-blur-xl border border-slate-200/80 overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.15)] relative flex items-center justify-center group cursor-pointer transition-all duration-500 hover:shadow-[0_0_80px_rgba(6,182,212,0.3)] hover:border-cyan-400/50 dark:bg-black/60 dark:border-cyan-500/30">
            {/* Inner Neural Net Animation */}
            <svg className="absolute inset-0 w-full h-full opacity-60 group-hover:opacity-100 transition-opacity duration-500" viewBox="0 0 100 100">
              <defs>
                <radialGradient id="coreGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(6, 182, 212, 0.2)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>
              <circle cx="50" cy="50" r="50" fill="url(#coreGradient)" />
              
              {/* Spinning Rings inside core */}
              <g className="animate-[spin_10s_linear_infinite] origin-center">
                 <circle cx="50" cy="50" r="35" fill="none" stroke="cyan" strokeWidth="0.2" strokeDasharray="4 4" opacity="0.5" />
                 <path d="M50,15 L50,85 M15,50 L85,50" stroke="cyan" strokeWidth="0.1" opacity="0.3" />
              </g>
              <g className="animate-[spin_15s_linear_infinite_reverse] origin-center">
                 <circle cx="50" cy="50" r="25" fill="none" stroke="cyan" strokeWidth="0.5" strokeDasharray="10 10" opacity="0.6" />
              </g>
            </svg>
            
            <div className="relative z-20 flex flex-col items-center">
                <Brain size={36} className="text-cyan-200 drop-shadow-[0_0_20px_rgba(34,211,238,0.8)] md:w-12 md:h-12 animate-float-slow" />
                <div className="mt-1.5 text-[8px] md:text-[10px] font-mono text-cyan-400 tracking-[0.2em] opacity-80">NEURAL</div>
            </div>
            
            {/* Core Particles */}
            <div className="absolute inset-0 z-10">
               {Array.from({ length: 8 }).map((_, i) => (
                 <motion.div
                   key={i}
                   className="absolute w-0.5 h-0.5 bg-cyan-300 rounded-full"
                   style={{ left: '50%', top: '50%' }}
                   animate={{
                     x: Math.cos(i * 45 * Math.PI / 180) * 45,
                     y: Math.sin(i * 45 * Math.PI / 180) * 45,
                     opacity: [0, 1, 0],
                     scale: [0, 1.5, 0]
                   }}
                   transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.2, ease: "easeOut" }}
                 />
               ))}
            </div>
          </div>
        </motion.div>

        {/* Desktop Hologram Stats (Orbital) */}
        {resolvedStats.map((stat, index) => {
          const accent = accentStyles[stat.accent ?? 'cyan'] ?? accentStyles.cyan;
          const Icon = iconMap[stat.icon ?? 'Sparkles'] ?? Sparkles;
          return (
            <StatCard
              key={`${stat.title}-${index}`}
              title={stat.title}
              value={stat.value}
              subtext={stat.subtext}
              textColor={accent.text}
              glowColor={accent.glow}
              borderColor={accent.border}
              icon={Icon}
              position={positions[index] ?? positions[0]}
              delay={0.2 + index * 0.2}
              parallaxX={parallaxX}
              parallaxY={parallaxY}
            />
          );
        })}

        {/* Mobile Stats (Stacked) */}
        <div className="md:hidden flex flex-col gap-4 w-full px-4 z-20 mt-8">
          {resolvedStats.map((stat, index) => {
            const accent = accentStyles[stat.accent ?? 'cyan'] ?? accentStyles.cyan;
            const Icon = iconMap[stat.icon ?? 'Sparkles'] ?? Sparkles;
            return (
              <MobileStatCard
                key={`mobile-${stat.title}-${index}`}
                title={stat.title}
                value={stat.value}
                subtext={stat.subtext}
                textColor={accent.text}
                bgIconColor={accent.mobileBg}
                icon={Icon}
              />
            );
          })}
        </div>

      </motion.div>
    </div>
  );
};

export default AiHeroWidget;
