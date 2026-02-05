import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

export type ChallengeCard = {
  icon: keyof typeof Icons;
  title: string;
  body: string;
  badge: string;
  glow: string;
  metricColor?: string;
  solution?: string;
  accentGradient?: string;
  iconBg?: string;
};

export type ServiceChallengesData = {
  badgeLabel: string;
  title: string;
  subtitle: string;
  cards: ChallengeCard[];
  codeSnippets?: string[];
  background?: {
    top?: string;
    bottom?: string;
  };
  layout?: 'default' | 'metric' | 'inline' | 'cinematic' | 'cyberpunk';
};

const defaultSnippets = [
  `const runAudit = async () => await lighthouse(url, { perf: 'p95' });`,
  `pipeline.step('deploy').with({ zeroDowntime: true });`,
  `const users = await db.metric('retention').rolling(7);`
];

const ServiceChallengesSection: React.FC<{ data: ServiceChallengesData }> = ({ data }) => {
  const snippets = data.codeSnippets ?? defaultSnippets;
  const isMetricLayout = data.layout === 'metric';
  const isInlineLayout = data.layout === 'inline';
  const isCinematicLayout = data.layout === 'cinematic';
  const isCyberpunkLayout = data.layout === 'cyberpunk';

  const particlePoints = Array.from({ length: 24 }).map((_, idx) => ({
    id: idx,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 2 + Math.random() * 4,
    delay: Math.random() * 4
  }));

  const stormParticles = Array.from({ length: 32 }).map((_, idx) => ({
    id: idx,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 6
  }));

  if (isInlineLayout) {
    return (
      <section className="py-32 px-6 lg:px-10 bg-gradient-to-r from-slate-900 via-blue-900/20 to-purple-900/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-24">
            <h2 className="text-5xl lg:text-6xl font-black leading-tight">
              <span className="bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">Web Challenges</span>
              <span className="block text-4xl lg:text-5xl bg-gradient-to-r from-orange-400 via-rose-400 to-pink-500 bg-clip-text text-transparent">
                We Neutralize
              </span>
            </h2>
            <p className="text-xl lg:text-2xl text-white/80 leading-relaxed">
              Slow vitals, chaotic CMS workflows, and brittle hosting disappear when our automation stack takes over.
            </p>
          </div>

          <div className="space-y-14">
            {data.cards.map((card, idx) => {
              const IconComponent = Icons[card.icon] ?? Icons.Zap;
              return (
                <React.Fragment key={`${card.title}-inline`}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="relative rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-6 lg:p-10 overflow-hidden"
                  >
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                      <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-44 h-44 rounded-full blur-[120px] opacity-60" style={{ background: 'rgba(248,113,113,0.35)' }} />
                      <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-52 h-52 rounded-full blur-[150px] opacity-40" style={{ background: 'rgba(16,185,129,0.4)' }} />
                    </div>

                    <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
                      <div className="flex items-center gap-4 min-w-[200px]">
                        <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-orange-200">
                          <IconComponent className="w-8 h-8" />
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-[0.4em] text-white/50">Pain</p>
                          <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-rose-400 to-red-400">
                            {card.title}
                          </h3>
                        </div>
                      </div>

                      <div className="flex-1 text-white/85 text-lg leading-relaxed">
                        {card.body}
                      </div>

                      <div className="text-right min-w-[220px]">
                        <p className="text-xs uppercase tracking-[0.4em] text-white/50 mb-2">Impact</p>
                        <div className={`text-3xl font-black tracking-tight ${card.metricColor ?? 'text-emerald-300'}`}>
                          {card.badge}
                        </div>
                        {card.solution && <p className="text-sm text-white/70 mt-2">{card.solution}</p>}
                      </div>
                    </div>
                  </motion.div>

                  {idx < data.cards.length - 1 && (
                    <div className="flex items-center justify-center gap-2 text-white/30">
                      <div className="w-2 h-2 rounded-full bg-cyan-400" />
                      <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                      <div className="w-2 h-2 rounded-full bg-cyan-400" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  if (isCyberpunkLayout) {
    return (
      <section className="relative py-28 lg:py-32 px-4 lg:px-12 overflow-hidden min-h-[70vh] bg-[linear-gradient(180deg,#000_0%,#050112_40%,#130020_100%)]">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.25),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.2),transparent_60%)]" />
          <motion.div
            className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.08)_0px,rgba(255,255,255,0.08)_1px,transparent_1px,transparent_4px)] opacity-10"
            animate={{ backgroundPositionY: ['0px', '80px'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
          {stormParticles.map((particle) => (
            <motion.div
              key={`storm-${particle.id}`}
              className="absolute rounded-full bg-cyan-400/80 shadow-[0_0_20px_rgba(6,182,212,0.8)]"
              style={{
                width: 2,
                height: 10,
                left: `${particle.x}%`,
                top: `${particle.y}%`
              }}
              animate={{ opacity: [0, 1, 0], y: [-20, 20, -20] }}
              transition={{ duration: particle.duration, repeat: Infinity, ease: 'easeInOut', delay: particle.delay }}
            />
          ))}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute left-1/3 top-0 w-px h-full bg-gradient-to-b from-cyan-300 via-transparent to-transparent opacity-40"
              animate={{ scaleY: [0.5, 1, 0.5] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute right-1/4 top-0 w-px h-full bg-gradient-to-b from-purple-400 via-transparent to-transparent opacity-30"
              animate={{ scaleY: [1, 0.6, 1] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </div>

        <div className="relative z-10 text-center mb-28">
          <motion.p
            className="text-xs uppercase tracking-[0.8em] text-cyan-300/80 mb-6"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {data.badgeLabel}
          </motion.p>
          <motion.h2
            className="text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 via-white to-purple-200 drop-shadow-[0_0_25px_rgba(59,130,246,0.6)]"
            animate={{ textShadow: ['0 0 20px rgba(6,182,212,0.4)', '0 0 35px rgba(14,165,233,0.8)', '0 0 20px rgba(6,182,212,0.4)'] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Web Challenges DESTROYED
          </motion.h2>
          <p className="mt-6 text-lg lg:text-2xl text-white/80 max-w-3xl mx-auto">
            Lightning-fast eradication of vitals debt, CMS chaos, and brittle hosting. Scroll-proof impact.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {data.cards.map((card, idx) => {
            const IconComponent = Icons[card.icon] ?? Icons.Zap;
            return (
              <motion.article
                key={`${card.title}-cyber`}
                initial={{ opacity: 0, scale: 0.6, y: 80 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: idx * 0.15, type: 'spring' }}
                whileHover={{
                  rotateY: 8,
                  rotateX: -4,
                  scale: 1.08,
                  boxShadow: '0 30px 120px rgba(59,130,246,0.6)'
                }}
                className="relative group rounded-[36px] border border-cyan-400/30 bg-gradient-to-br from-[#05050f]/80 via-[#0b1024]/60 to-transparent backdrop-blur-[30px] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
                style={{ transformStyle: 'preserve-3d', perspective: 1500 }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute inset-0 blur-3xl bg-gradient-to-br ${card.glow}`} />
                </div>
                <motion.div
                  className="absolute inset-2 border border-cyan-400/40 rounded-[30px] opacity-30 group-hover:opacity-90"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <div className="absolute inset-0">
                  <motion.div
                    className="absolute inset-0 bg-[url('/noise.svg')] opacity-10 mix-blend-screen"
                    animate={{ opacity: [0.05, 0.15, 0.05] }}
                    transition={{ duration: 5, repeat: Infinity }}
                  />
                </div>

                <div className="relative flex flex-col gap-6">
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="w-16 h-16 rounded-3xl border border-cyan-400/40 bg-cyan-500/10 flex items-center justify-center shadow-[0_0_25px_rgba(6,182,212,0.7)]"
                      animate={{ rotate: [0, 2, -2, 0], scale: [1, 1.05, 0.98, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: idx * 0.1 }}
                    >
                      <IconComponent className="w-8 h-8 text-cyan-200" />
                    </motion.div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.5em] text-cyan-300/80">Problem</p>
                      <h3 className="text-2xl font-bold text-white glitch-text relative">
                        {card.title}
                        <span className="absolute inset-0 text-cyan-400 opacity-60 translate-x-1 blur-[1px]"> {card.title}</span>
                      </h3>
                    </div>
                  </div>

                  <p className="text-base lg:text-lg text-white/80 leading-relaxed">{card.body}</p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + idx * 0.05 }}
                    className="flex items-center justify-between"
                  >
                    <div className="text-sm uppercase tracking-[0.4em] text-purple-300/70">Impact</div>
                    <div className={`text-3xl font-black ${card.metricColor ?? 'text-cyan-300'}`}>
                      {card.badge}
                    </div>
                  </motion.div>

                  {card.solution && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + idx * 0.05 }}
                      className="rounded-2xl border border-white/20 bg-white/5/5 p-4 text-sm text-white/80"
                    >
                      {card.solution}
                    </motion.div>
                  )}
                </div>

                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-10 bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-500 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-10 bg-gradient-to-b from-purple-500 via-pink-500 to-cyan-400 rounded-l-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.article>
            );
          })}
        </div>
      </section>
    );
  }

  if (isCinematicLayout) {
    return (
      <section className="relative py-32 px-8 lg:px-20 overflow-hidden bg-[#0a0f1e] min-h-screen">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(14,165,233,0.25),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(147,51,234,0.22),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.08),transparent_70%)]" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '1s' }} />
          {particlePoints.map((particle) => (
            <motion.div
              key={`particle-${particle.id}`}
              className="absolute rounded-full bg-cyan-400/60 shadow-[0_0_25px_rgba(6,182,212,0.7)]"
              style={{
                width: particle.size,
                height: particle.size,
                left: `${particle.left}%`,
                top: `${particle.top}%`
              }}
              animate={{ 
                opacity: [0.2, 0.9, 0.2], 
                y: [-15, 15, -15],
                x: [-8, 8, -8],
                scale: [1, 1.3, 1]
              }}
              transition={{ duration: 8 + particle.delay, repeat: Infinity, ease: 'easeInOut', delay: particle.delay }}
            />
          ))}
          <motion.div
            className="absolute inset-0 opacity-15"
            animate={{ backgroundPositionY: ['0%', '100%'] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{
              backgroundImage:
                'linear-gradient(180deg, rgba(59,130,246,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.15) 1px, transparent 1px)',
              backgroundSize: '100px 80px'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/5 to-transparent" />
        </div>

        <div className="text-center relative z-10 mb-28">
          <h2 className="text-5xl lg:text-7xl font-black bg-gradient-to-r from-white via-cyan-50 to-blue-100 bg-clip-text text-transparent drop-shadow-[0_20px_80px_rgba(59,130,246,0.35)] mb-8">
            Web Challenges
            <span className="block text-4xl lg:text-5xl bg-gradient-to-r from-emerald-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
              We Neutralize
            </span>
          </h2>
          <p className="text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Cinematic reporting of the bottlenecks keeping your site from scaling—solved with our automation pods.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10">
          {data.cards.map((card, idx) => {
            const IconComponent = Icons[card.icon] ?? Icons.Zap;
            return (
              <motion.article
                key={`${card.title}-cinematic`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: idx * 0.15, type: 'spring', stiffness: 100 }}
                whileHover={{ 
                  scale: 1.08, 
                  rotateY: 5,
                  rotateX: -2,
                  transition: { duration: 0.3 }
                }}
                className="group relative rounded-[40px] border border-white/15 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-3xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.4)]"
                style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.glow} opacity-50 blur-xl`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 via-transparent to-transparent" />
                </div>
                <motion.div
                  className="absolute inset-0 border-2 border-cyan-400/40 rounded-[40px] opacity-0 group-hover:opacity-100 shadow-[0_0_40px_rgba(6,182,212,0.5)]"
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative p-8 lg:p-10 flex flex-col gap-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <motion.div
                        className="w-20 h-20 rounded-3xl bg-gradient-to-br from-white/15 to-white/5 flex items-center justify-center text-cyan-300 shadow-[0_0_30px_rgba(6,182,212,0.5)] border border-white/10"
                        whileHover={{ 
                          rotate: [0, -10, 10, -10, 0],
                          scale: 1.15
                        }}
                        transition={{ duration: 0.6 }}
                      >
                        <IconComponent className="w-10 h-10" />
                      </motion.div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.4em] text-emerald-300/70 font-semibold">Problem</p>
                        <h3 className="text-2xl lg:text-3xl font-black text-white leading-tight">{card.title}</h3>
                      </div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + idx * 0.1, type: 'spring', stiffness: 200 }}
                      className={`text-3xl lg:text-4xl font-black ${card.metricColor ?? 'text-emerald-300'} drop-shadow-[0_0_15px_rgba(16,185,129,0.6)]`}
                    >
                      {card.badge}
                    </motion.div>
                  </div>

                  <p className="text-lg text-white/85 leading-relaxed">{card.body}</p>

                  {card.solution && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 0.4 + idx * 0.1, type: 'spring' }}
                      className="rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 to-cyan-500/5 p-6 shadow-[0_10px_40px_rgba(16,185,129,0.1)]"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                        <p className="text-xs uppercase tracking-[0.35em] text-emerald-300/80 font-bold">Solution</p>
                      </div>
                      <p className="text-white/90 leading-relaxed">{card.solution}</p>
                    </motion.div>
                  )}
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.article>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-24 bg-[#050B18] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.14),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(168,85,247,0.12),transparent_60%)]" />

      {snippets.map((snippet, idx) => (
        <motion.pre
          key={`${snippet}-${idx}`}
          className="absolute text-[11px] font-mono text-cyan-200/30 bg-cyan-500/5 border border-cyan-500/10 rounded-xl px-4 py-3 backdrop-blur-xl"
          style={{
            top: `${10 + idx * 15}%`,
            left: `${idx % 2 === 0 ? 12 : 55}%`
          }}
          animate={{ opacity: [0.15, 0.4, 0.15], y: [0, -20, 0] }}
          transition={{ duration: 18 + idx * 3, repeat: Infinity, ease: 'easeInOut', delay: idx * 2 }}
        >
          {snippet}
        </motion.pre>
      ))}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-emerald-300 font-semibold tracking-[0.35em] uppercase text-xs mb-3">
            {data.badgeLabel}
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white">{data.title}</h3>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">{data.subtitle}</p>
        </div>

        <div className={`grid md:grid-cols-3 ${isMetricLayout ? 'gap-6' : 'gap-8'}`}>
          {data.cards.map((card, idx) => {
            const IconComponent = Icons[card.icon] ?? Icons.Zap;
            return isMetricLayout ? (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c1a2e]/70 p-6 sm:p-8 min-h-[240px]"
              >
                <div className="absolute top-3 right-3 text-cyan-400/10 pointer-events-none">
                  <IconComponent size={90} strokeWidth={1.2} />
                </div>
                {idx === 0 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-cyan-400 z-10" />
                )}
                <div className="relative flex h-full flex-col justify-between">
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold text-white leading-tight mb-3">{card.title}</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">{card.body}</p>
                  </div>
                  <div className={`text-xl sm:text-2xl font-black mt-4 ${card.metricColor ?? 'text-cyan-300'}`}>
                    {card.badge}
                  </div>
                </div>
              </motion.article>
            ) : (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ translateY: -8 }}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0d1324]/90 via-[#0b1220]/60 to-transparent border border-white/5 backdrop-blur-2xl p-8 transition-all duration-500 group"
              >
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br ${card.glow} blur-3xl transition-opacity duration-500`} />
                <div className="relative flex flex-col gap-6">
                  <div className="w-12 h-12 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 text-white">
                    <IconComponent size={24} />
                  </div>
                  <div>
                    <h4 className="text-2xl font-semibold text-white mb-3">{card.title}</h4>
                    <p className="text-slate-200 leading-relaxed">{card.body}</p>
                  </div>
                  <div className="h-[1px] bg-white/10" />
                  <motion.span
                    className="text-sm font-semibold text-emerald-300 uppercase tracking-[0.4em]"
                    animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                  >
                    {card.badge}
                  </motion.span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceChallengesSection;
