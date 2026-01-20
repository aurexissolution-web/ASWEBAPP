import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import type { PricingHeroContent, PricingHeroMetric } from '../types';

const commands = [
  'npx create-vite@latest client-site --template react',
  'cd client-site && npm i tailwindcss postcss autoprefixer',
  'npx tailwindcss init -p',
  'npm run dev',
  '// Preview: http://localhost:5173 live on Vercel',
  'Lighthouse score: 100/100 | 3s Load | Core Vitals Pass ✅',
  'Shopee API integrated'
];

const previewSteps = ['Hero live', 'Services grid', 'Pricing pods', 'Portfolio stories', 'Contact automation'];

const defaultHeroMetrics = [
  { label: 'RM12k/mo', sub: 'Pod retainer' },
  { label: '98.9% Speed', sub: 'Deploy success' },
  { label: '40+ Templates', sub: 'React • Vite' },
  { label: 'Core Web Vitals', sub: 'Pass guarantee' }
];

const defaultChips = ['40+ Templates', '98.9% Speed', '∞ Scale'];

interface WebDevTerminalHeroProps {
  hero: PricingHeroContent;
}

const WebDevTerminalHero: React.FC<WebDevTerminalHeroProps> = ({ hero }) => {
  const [typedCommand, setTypedCommand] = useState('');
  const [commandIndex, setCommandIndex] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const [previewIndex, setPreviewIndex] = useState(0);

  const metricChips = hero.chips && hero.chips.length > 0 ? hero.chips : defaultChips;
  const heroMetrics: { label: string; sub?: string }[] =
    hero.metrics && hero.metrics.length > 0
      ? hero.metrics.map((metric: PricingHeroMetric) => ({
          label: metric.value || metric.label,
          sub: metric.label || metric.subtext
        }))
      : defaultHeroMetrics;

  useEffect(() => {
    const current = commands[commandIndex];
    if (!current) return;

    if (typedCommand === current) {
      const timeout = setTimeout(() => {
        setHistory((prev) => [...prev.slice(-5), current]);
        setCommandIndex((prev) => (prev + 1) % commands.length);
        setTypedCommand('');
      }, 900);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setTypedCommand(current.slice(0, typedCommand.length + 1));
    }, 70);

    return () => clearTimeout(timeout);
  }, [typedCommand, commandIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      setPreviewIndex((prev) => (prev + 1) % previewSteps.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[80vh] w-full px-4 sm:px-6 lg:px-0 flex flex-col gap-10">
      <div className="grid gap-10 lg:grid-cols-[0.55fr_0.45fr] items-center">
        <div className="space-y-6 text-left">
          {(hero.eyebrow || hero.badge) && (
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/40 bg-emerald-50 px-6 py-2 text-xs uppercase tracking-[0.45em] text-emerald-700 dark:border-white/20 dark:bg-white/5 dark:text-emerald-200">
              {hero.eyebrow || hero.badge}
            </div>
          )}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-500 drop-shadow-[0_25px_80px_rgba(6,182,212,0.25)] dark:from-cyan-200 dark:via-white dark:to-sky-200 dark:drop-shadow-[0_25px_80px_rgba(6,182,212,0.35)]">
            {hero.title || 'Spin Up Your Web Dev Pod with Aurexis workflows'}
          </h1>
          {hero.subtitle && <p className="text-lg text-slate-600 dark:text-white/80">{hero.subtitle}</p>}
          {hero.description && <p className="text-base text-slate-500 dark:text-white/70">{hero.description}</p>}
          <div className="grid grid-cols-2 gap-3 w-full">
            {heroMetrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 shadow-md dark:border-white/15 dark:bg-white/5">
                <p className="text-xl font-black text-slate-900 dark:text-white">{metric.label}</p>
                <p className="text-[10px] uppercase tracking-[0.4em] text-slate-500 dark:text-white/60 mt-1">{metric.sub}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href={hero.ctas?.primaryLink ?? 'https://calendly.com/aurexis/45min'}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-300 via-emerald-400 to-cyan-400 px-8 py-4 text-slate-900 font-semibold shadow-[0_20px_60px_rgba(34,197,94,0.5)] hover:translate-y-[-2px] transition-transform"
            >
              {hero.ctas?.primaryLabel || 'Book Live Code Demo'} <ArrowRight size={18} />
            </a>
            {hero.ctas?.secondaryLink && hero.ctas?.secondaryLabel && (
              <a
                href={hero.ctas.secondaryLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-4 text-white font-semibold hover:bg-white/10 transition"
              >
                <Download size={16} /> {hero.ctas.secondaryLabel}
              </a>
            )}
            {!hero.ctas?.secondaryLink && (
              <a
                href="https://stripe.com/payments"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-4 text-white font-semibold hover:bg-white/10 transition"
              >
                <Download size={16} /> Download Blueprint PDF
              </a>
            )}
          </div>
          <div className="flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.45em] text-cyan-700 dark:text-cyan-100">
            {metricChips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-cyan-300 bg-cyan-50 px-4 py-1 text-cyan-800 dark:border-cyan-400/30 dark:bg-cyan-500/10 dark:text-cyan-100"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

        <div className="flex-1 rounded-[30px] border border-slate-200 bg-slate-900/5 backdrop-blur-xl shadow-[0_35px_80px_rgba(15,23,42,0.15)] p-0 overflow-hidden dark:border-white/10 dark:bg-[#050c1f]/70 dark:shadow-[0_35px_120px_rgba(1,8,22,0.6)]">
          <div className="flex items-center gap-2 text-xs text-slate-500 px-4 py-3 border-b border-slate-200 bg-white dark:text-white/50 dark:border-white/5 dark:bg-white/5">
            <div className="flex gap-1">
              {['#ff5f56', '#ffbd2e', '#27c93f'].map((color) => (
                <span key={color} className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
              ))}
            </div>
            <span>VS Code — Terminal</span>
          </div>
          <div className="px-4 py-6 font-['JetBrains_Mono',monospace] text-sm text-emerald-600 space-y-3 dark:text-emerald-200">
            <div className="text-slate-500 dark:text-white/60">~/aurexis/client-site</div>
            <div className="space-y-1 text-slate-700 dark:text-white/70">
              {history.slice(-6).map((line, idx) => (
                <p key={`${line}-${idx}`} className="text-emerald-600/90 dark:text-emerald-200/90">{`$ ${line}`}</p>
              ))}
            </div>
            <p className="text-cyan-600 dark:text-cyan-200">
              $ {typedCommand}
              <span className="animate-pulse">▌</span>
            </p>
          </div>
        </div>

      </div>

    </section>
  );
};

export default WebDevTerminalHero;
