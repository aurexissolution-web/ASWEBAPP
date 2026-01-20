import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Server, DollarSign, Shield } from 'lucide-react';

const cards = [
  {
    title: 'Infrastructure Debt',
    metric: '+65% deploy speed',
    impact: 'IaC pipelines ship identical stacks in minutes.',
    description: 'Containers + Terraform automate every environment so product and ops ship without manual patching.',
    icon: Server
  },
  {
    title: 'Unpredictable Costs',
    metric: 'RM24k/mo saved',
    impact: 'FinOps dashboards + auto-scaling keep spend visible.',
    description: 'Budgets, alerts, and right-sizing policies trim idle workloads before they hit your AWS invoice.',
    icon: DollarSign
  },
  {
    title: 'Compliance & Recovery',
    metric: '0 critical alerts',
    impact: 'Zero-trust network + encrypted backups.',
    description: 'SOC2-ready policies, KMS encryption, and failover drills keep auditors and executives calm.',
    icon: Shield
  }
] as const;

const nodes = [
  { id: 'a', x: 20, y: 18 },
  { id: 'b', x: 40, y: 12 },
  { id: 'c', x: 60, y: 18 },
  { id: 'd', x: 30, y: 34 },
  { id: 'e', x: 50, y: 30 },
  { id: 'f', x: 70, y: 36 },
  { id: 'g', x: 20, y: 52 },
  { id: 'h', x: 40, y: 48 },
  { id: 'i', x: 60, y: 54 },
  { id: 'j', x: 30, y: 70 },
  { id: 'k', x: 50, y: 66 },
  { id: 'l', x: 70, y: 72 }
] as const;

const hexLoops = [
  [0, 1, 4, 7, 6, 3],
  [1, 2, 5, 8, 7, 4],
  [4, 5, 8, 11, 10, 7]
] as const;

const loopPaths = hexLoops.map((loop) => {
  const segments = loop.map((idx, position) => {
    const node = nodes[idx];
    return `${position === 0 ? 'M' : 'L'}${node.x} ${node.y}`;
  });
  return `${segments.join(' ')} Z`;
});

const buildConnections = (loops: readonly (readonly number[])[]): Array<[number, number]> => {
  const map = new Map<string, [number, number]>();
  loops.forEach((loop) => {
    loop.forEach((fromIdx, position) => {
      const toIdx = loop[(position + 1) % loop.length];
      const key = fromIdx < toIdx ? `${fromIdx}-${toIdx}` : `${toIdx}-${fromIdx}`;
      if (!map.has(key)) {
        map.set(key, [fromIdx, toIdx]);
      }
    });
  });
  return Array.from(map.values());
};

const connections = buildConnections(hexLoops);

const cardNodeLinks: number[][] = [
  [0, 1, 3, 6, 7, 10],
  [1, 2, 4, 5, 7, 8],
  [4, 5, 7, 8, 10, 11]
];

const cardLoopMap = [0, 1, 2] as const;

const CloudBottlenecks: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="relative py-24 bg-[#030817] text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#040b1c] via-[#030817] to-[#050f26]" />
      <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Animated network */}
      <div className="absolute inset-0 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="cloudLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#0ea5e9" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.15" />
            </linearGradient>
            <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {loopPaths.map((d, idx) => {
            const isHighlighted = hoveredCard !== null && cardLoopMap[hoveredCard] === idx;
            return (
              <motion.path
                key={`loop-${idx}`}
                d={d}
                fill="none"
                stroke="url(#cloudLine)"
                strokeWidth={isHighlighted ? 1.4 : 0.7}
                strokeDasharray="6 14"
                strokeLinecap="round"
                initial={{ strokeDashoffset: 80 }}
                animate={{ strokeDashoffset: isHighlighted ? -80 : -40 }}
                transition={{ duration: isHighlighted ? 4 : 10, repeat: Infinity, ease: 'linear' }}
                filter="url(#softGlow)"
                opacity={isHighlighted ? 0.9 : 0.5}
              />
            );
          })}

          {connections.map(([fromIdx, toIdx], idx) => {
            const from = nodes[fromIdx];
            const to = nodes[toIdx];
            const isHighlighted =
              hoveredCard !== null &&
              cardNodeLinks[hoveredCard].includes(fromIdx) &&
              cardNodeLinks[hoveredCard].includes(toIdx);
            return (
              <motion.path
                key={`${from.id}-${to.id}`}
                d={`M${from.x} ${from.y} L${to.x} ${to.y}`}
                fill="none"
                stroke="url(#cloudLine)"
                strokeWidth={isHighlighted ? 1.6 : 0.9}
                strokeDasharray={isHighlighted ? '4 6' : '1.5 6'}
                strokeLinecap="round"
                initial={{ strokeDashoffset: 30 }}
                animate={{ strokeDashoffset: isHighlighted ? -60 : -30 }}
                transition={{
                  repeat: Infinity,
                  duration: isHighlighted ? 2.4 : 5 + idx * 0.4,
                  ease: 'linear'
                }}
                filter="url(#softGlow)"
              />
            );
          })}
        </svg>
        {nodes.map((node, idx) => {
          const highlighted = hoveredCard !== null && cardNodeLinks[hoveredCard].includes(idx);
          return (
          <motion.span
            key={node.id}
            className="absolute rounded-full bg-cyan-300/80 shadow-[0_0_15px_rgba(34,211,238,0.9)]"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              width: highlighted ? 14 : 10,
              height: highlighted ? 14 : 10
            }}
            animate={{
              scale: [1, highlighted ? 1.7 : 1.3, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: highlighted ? 1.6 : 3,
              repeat: Infinity,
              delay: idx * 0.1
            }}
          />
        )})}
        {/* Bottom server row */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-6 opacity-70">
          {[0, 1, 2].map((rack) => (
            <div
              key={rack}
              className="w-32 h-10 rounded-xl border border-white/5 bg-white/5 backdrop-blur text-transparent"
            >
              <div className="flex gap-2 p-2">
                {[0, 1, 2].map((slot) => (
                  <div key={slot} className="flex-1 h-5 rounded-lg bg-slate-900/80 border border-white/10" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.4em] text-cyan-300 mb-3">Cloud Bottlenecks</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            The 3 Roadblocks We Neutralize
          </h2>
          <p className="text-slate-300 max-w-3xl mx-auto">
            From infrastructure debt to unpredictable AWS invoices, our migration pods replace chaos with automation-first playbooks.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 relative z-10">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -12, boxShadow: '0 35px 80px rgba(6,182,212,0.25)' }}
                onHoverStart={() => setHoveredCard(idx)}
                onHoverEnd={() => setHoveredCard((current) => (current === idx ? null : current))}
                className="relative bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-emerald-400/10 opacity-0 hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-cyan-300">
                      <Icon size={22} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Impact</p>
                      <p className="text-lg font-semibold text-white">{card.metric}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">{card.title}</h3>
                    <p className="text-cyan-200 text-sm mb-3">{card.impact}</p>
                    <p className="text-slate-300 text-sm leading-relaxed">{card.description}</p>
                  </div>
                  <div className="pt-3 border-t border-white/10 text-xs uppercase tracking-[0.4em] text-slate-400">
                    Hover to inspect nodes
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CloudBottlenecks;
