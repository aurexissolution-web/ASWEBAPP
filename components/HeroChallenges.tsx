import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Shield, TrendingUp, DollarSign, LucideIcon, AlertTriangle } from 'lucide-react';
import type { ServiceChallengeContent } from '../types';

const ICON_MAP: Record<string, LucideIcon> = {
  Shield,
  TrendingUp,
  DollarSign,
  AlertTriangle
};

const DEFAULT_CONTENT: ServiceChallengeContent = {
  eyebrow: 'Manual Ops Killing Sales?',
  title: 'AI Takes Over 24/7',
  description: 'Malaysian SMEs lose RM50k+/year to infrastructure headaches. We deploy AI to secure, scale, and slash costs by 40%—in days.',
  cards: [
    {
      title: 'Chatbot Gaps',
      body: 'Missed leads after hours? Manual chats lose 60% inquiries.',
      stat: '60% Lead Recovery',
      icon: 'Shield',
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      title: 'Process Bottlenecks',
      body: 'Repetitive tasks bury teams? Data entry wastes 30+ hrs/week.',
      stat: '80% Time Saved',
      icon: 'TrendingUp',
      gradient: 'from-blue-500 to-indigo-500'
    },
    {
      title: 'Generic AI Fails',
      body: 'One-size-fits-all tools miss local needs? Wrong insights cost sales.',
      stat: '3x Prediction Accuracy',
      icon: 'DollarSign',
      gradient: 'from-purple-500 to-pink-500'
    }
  ]
};

interface HeroChallengesProps {
  content?: ServiceChallengeContent;
}

const HeroChallenges: React.FC<HeroChallengesProps> = ({ content }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const node = containerRef.current;
    if (!node) return;
    if (window.getComputedStyle(node).position === 'static') {
      node.style.position = 'relative';
    }
  }, []);

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Particle configuration
  const particles = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    size: Math.random() * 12 + 4,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5
  }));

  const data = content ?? DEFAULT_CONTENT;
  const cards = data.cards.map(card => {
    const Icon = card.icon ? ICON_MAP[card.icon] ?? AlertTriangle : Shield;
    return {
      ...card,
      Icon,
      gradient: card.gradient ?? 'from-cyan-500 to-blue-500'
    };
  });

  return (
    <section 
      ref={containerRef} 
      className="relative w-full py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-900 dark:bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] dark:from-[#0A0F2B] dark:via-[#050816] dark:to-black dark:text-white"
    >
      {/* Background Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-cyan-400/20 blur-[2px] dark:bg-cyan-500/20"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay
          }}
        />
      ))}

      {/* Optional Faint Malaysia Map or Abstract Glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-200/40 blur-[160px] rounded-full pointer-events-none dark:bg-blue-900/10" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Headlines */}
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-black tracking-tighter mb-6"
          >
            <span className="text-slate-900 drop-shadow-[0_0_15px_rgba(59,130,246,0.25)] dark:text-white dark:drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
              {data.eyebrow ?? DEFAULT_CONTENT.eyebrow}
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent animate-pulse-slow">
              {data.title}
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed dark:text-gray-300/90"
          >
            {data.description}
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + (index * 0.15) }}
              whileHover={{ scale: 1.02 }}
              className="group relative rounded-3xl p-8 lg:p-10 bg-white/95 backdrop-blur-xl border border-slate-200 shadow-[0_20px_60px_rgba(15,23,42,0.08)] hover:border-blue-400/60 hover:shadow-[0_25px_70px_rgba(59,130,246,0.25)] transition-all duration-500 dark:bg-[#050817]/90 dark:border-white/10 dark:shadow-[0_25px_70px_rgba(2,6,23,0.85)]"
            >
              {/* Floating Icon */}
              <div className="absolute -right-4 -top-4 w-20 h-20 opacity-10 group-hover:opacity-80 group-hover:scale-110 transition-all duration-500 rotate-12">
                <card.Icon 
                  strokeWidth={1.5} 
                  className={`w-full h-full text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.35)] dark:text-cyan-400 dark:drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]`} 
                />
              </div>

              {/* Inner Content */}
              <div className="relative z-10 h-full flex flex-col">
                <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-6 bg-gradient-to-r from-slate-900 to-slate-500 bg-clip-text dark:text-white dark:from-white dark:to-gray-400">
                  {card.title}
                </h3>
                
                <p className="text-lg text-slate-600 mb-8 leading-snug flex-grow transition-colors group-hover:text-slate-800 dark:text-gray-400 dark:group-hover:text-gray-200">
                  {card.body}
                </p>

                <div className="mt-auto">
                  <div className={`text-3xl lg:text-4xl font-black bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent drop-shadow-sm`}>
                    {card.stat}
                  </div>
                </div>
              </div>

              {/* Glow Effect on Hover */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none dark:from-cyan-500/5 dark:to-purple-500/5" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroChallenges;
