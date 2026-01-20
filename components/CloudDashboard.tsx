import React from 'react';
import { motion } from 'framer-motion';

const chips = ['Firebase Migrate', 'AWS Scale', 'Azure Cost-Opt'];

const rackLights = Array.from({ length: 3 }, (_, rackIndex) =>
  Array.from({ length: 4 }, (_, row) => ({
    key: `${rackIndex}-${row}`,
    cx: 80 + rackIndex * 100,
    cy: 60 + row * 35,
    delay: rackIndex * 0.4 + row * 0.2
  }))
).flat();

const CloudDashboard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative rounded-[32px] bg-gradient-to-br from-[#050915]/90 via-[#040a1a] to-[#020711] border border-white/10 p-8 sm:p-10 overflow-hidden shadow-[0_40px_90px_rgba(3,7,18,0.8)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.12),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(16,185,129,0.12),transparent_70%)]" />
      <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="relative z-10 flex flex-col gap-8">
        <div className="relative rounded-[28px] border border-white/10 bg-[#030814]/80 backdrop-blur-2xl p-8 overflow-hidden group">
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(14,165,233,0.08),transparent,rgba(16,185,129,0.08))]" />
          <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
            <div className="text-white space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-xs tracking-[0.4em] text-cyan-200 uppercase">
                Cloud Control
              </div>
              <h3 className="text-3xl font-bold leading-tight">Live Infrastructure Dashboard</h3>
              <p className="text-slate-400">
                Observe racks, traffic, and spend in one glass console. Hover nodes to inspect heartbeats in real-time.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                {chips.map((chip) => (
                  <span
                    key={chip}
                    className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-semibold tracking-[0.2em] text-slate-200"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <motion.div
              className="relative bg-[#060d1f] border border-cyan-500/10 rounded-3xl p-6 shadow-[0_30px_70px_rgba(3,7,18,0.6)]"
              whileHover={{ scale: 1.01 }}
            >
              <svg viewBox="0 0 360 240" className="w-full h-full text-white/70">
                <defs>
                  <linearGradient id="rack" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop stopColor="#0f172a" offset="0%" />
                    <stop stopColor="#050b18" offset="100%" />
                  </linearGradient>
                </defs>
                {[0, 1, 2].map((rack) => (
                  <g key={rack} transform={`translate(${40 + rack * 95}, 30)`}>
                    <rect
                      width="80"
                      height="180"
                      rx="14"
                      fill="url(#rack)"
                      stroke="rgba(148,163,184,0.25)"
                      className="transition-all duration-500 group-hover:stroke-cyan-400/40"
                    />
                    {[0, 1, 2, 3].map((row) => (
                      <rect
                        key={row}
                        x="12"
                        y={20 + row * 38}
                        width="56"
                        height="20"
                        rx="6"
                        fill="rgba(15,23,42,0.8)"
                        stroke="rgba(99,102,241,0.2)"
                      />
                    ))}
                  </g>
                ))}

                {rackLights.map((light) => (
                  <motion.circle
                    key={light.key}
                    cx={light.cx}
                    cy={light.cy}
                    r="6"
                    fill="rgba(16,185,129,0.6)"
                    animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.3, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: light.delay }}
                    className="drop-shadow-[0_0_8px_rgba(16,185,129,0.9)]"
                  />
                ))}

                <motion.circle
                  cx="300"
                  cy="200"
                  r="18"
                  fill="rgba(239,68,68,0.8)"
                  animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  className="drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]"
                />
                <text
                  x="300"
                  y="210"
                  textAnchor="middle"
                  className="fill-white/70 text-xs font-semibold"
                >
                  failover
                </text>
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CloudDashboard;
