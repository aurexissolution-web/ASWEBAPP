import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

type TerminalLine = {
  id: number;
  prefix: 'success' | 'info' | 'arrow' | 'cmd';
  text: string;
  detail?: string;
  progress?: number;
};

const terminalLines: TerminalLine[] = [
  { id: 1, prefix: 'cmd', text: '$ npm run build' },
  { id: 2, prefix: 'info', text: 'Next.js 14.2.0', detail: 'optimizing...' },
  { id: 3, prefix: 'success', text: 'Compiled successfully', detail: '24ms' },
  { id: 4, prefix: 'arrow', text: 'Tailwind CSS purged', progress: 100 },
  { id: 5, prefix: 'cmd', text: '$ vercel --prod' },
  { id: 6, prefix: 'info', text: 'Deploying to edge...', detail: 'global' },
  { id: 7, prefix: 'success', text: '2,400+ deploys', detail: 'lifetime' },
  { id: 8, prefix: 'success', text: '98.9% success rate', detail: 'live' },
  { id: 9, prefix: 'arrow', text: 'Ready', detail: 'https://www.aurexissolution.com' }
];

const prefixIcons: Record<TerminalLine['prefix'], { icon: string; color: string }> = {
  success: { icon: '✔', color: 'text-emerald-400' },
  info: { icon: '◆', color: 'text-cyan-400' },
  arrow: { icon: '→', color: 'text-blue-400' },
  cmd: { icon: '', color: 'text-slate-400' }
};

const WebDevDashboard: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const inView = useInView(terminalRef, { once: true, margin: '-10% 0px -10% 0px' });
  const [visibleLines, setVisibleLines] = useState<number[]>([]);

  useEffect(() => {
    if (!inView) return;
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < terminalLines.length) {
        const nextLine = terminalLines[idx];
        if (nextLine) {
          setVisibleLines((prev) => (prev.includes(nextLine.id) ? prev : [...prev, nextLine.id]));
        }
        idx++;
      } else {
        clearInterval(interval);
      }
    }, 600);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <div
      ref={terminalRef}
      className="relative w-full max-w-lg rounded-3xl border-2 border-cyan-900/50 bg-gradient-to-b from-slate-900 to-black/90 shadow-[0_30px_80px_rgba(8,145,178,0.25)] backdrop-blur-2xl overflow-hidden"
    >
      <div className="flex items-center gap-2 border-b border-cyan-900/40 bg-slate-800/60 px-5 py-3">
        <span className="h-3 w-3 rounded-full bg-red-500" />
        <span className="h-3 w-3 rounded-full bg-yellow-500" />
        <span className="h-3 w-3 rounded-full bg-emerald-500" />
        <span className="ml-4 font-mono text-xs text-cyan-400/80">aurexis-deploy@webdev ~/project</span>
      </div>

      <div className="h-80 overflow-y-auto px-5 py-4 font-mono text-sm leading-relaxed scrollbar-thin scrollbar-thumb-cyan-900/40">
        {terminalLines.map((line) => {
          const isVisible = visibleLines.includes(line.id);
          const { icon, color } = prefixIcons[line.prefix];
          return (
            <motion.div
              key={line.id}
              initial={{ opacity: 0, x: -10 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.35 }}
              className={`mb-2 flex items-center gap-2 ${!isVisible ? 'invisible' : ''}`}
            >
              {icon && <span className={color}>{icon}</span>}
              <span className={line.prefix === 'cmd' ? 'text-slate-300' : 'text-white/90'}>{line.text}</span>
              {line.detail && <span className="ml-auto text-xs text-cyan-300/70">{line.detail}</span>}
              {line.progress !== undefined && (
                <div className="ml-auto h-1.5 w-20 overflow-hidden rounded-full bg-slate-700">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isVisible ? { width: `${line.progress}%` } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                  />
                </div>
              )}
            </motion.div>
          );
        })}

        <motion.span
          className="mt-2 inline-block h-5 w-2 bg-cyan-400"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </div>

      <div className="flex items-center justify-between border-t border-cyan-900/40 bg-slate-900/70 px-5 py-2 text-xs">
        <div className="flex items-center gap-2 text-emerald-400">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Build complete
        </div>
        <div className="flex items-center gap-3 font-mono text-white/50">
          <span className="text-cyan-300/80">React 18</span>
          <span className="text-white/30">·</span>
          <span className="text-sky-300/80">Next 14</span>
          <span className="text-white/30">·</span>
          <span className="text-purple-300/80">TW 3</span>
        </div>
      </div>
    </div>
  );
};

export default WebDevDashboard;
