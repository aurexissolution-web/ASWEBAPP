import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';

const Portfolio: React.FC = () => {
  const { projects } = useData();

  const particles = useMemo(
    () =>
      Array.from({ length: 35 }, (_, idx) => ({
        id: idx,
        size: Math.random() * 5 + 3,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: Math.random() * 4
      })),
    []
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-12">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-200/40 via-white to-blue-100 dark:from-cyan-500/10 dark:via-slate-900 dark:to-indigo-900" />
          <div
            className="absolute inset-0 opacity-40"
            style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
          />
          {particles.map(particle => (
            <motion.span
              key={particle.id}
              className="absolute rounded-full bg-cyan-400/50 dark:bg-cyan-200/60"
              style={{ width: particle.size, height: particle.size, left: particle.left, top: particle.top }}
              animate={{ y: ['0%', '-15%', '10%'], opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 10, repeat: Infinity, delay: particle.delay }}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto max-w-5xl space-y-6 text-center">
          <p className="text-xs uppercase tracking-[0.6em] text-cyan-500 dark:text-cyan-200">Portfolio</p>
          <h1 className="text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
            Immersive builds engineered in{' '}
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent dark:from-cyan-300 dark:to-blue-400">
              30-day sprints.
            </span>
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-slate-700 dark:text-white/80">
            From AI operations copilots to e-commerce command centers, each deployment ships with analytics, DevOps, and
            go-live automation baked in.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-600 dark:text-white/70">
            <span className="rounded-full border border-slate-200/60 px-4 py-2 backdrop-blur dark:border-white/15">30-day deployment guarantee</span>
            <span className="rounded-full border border-slate-200/60 px-4 py-2 backdrop-blur dark:border-white/15">Unlimited sprint revisions</span>
            <span className="rounded-full border border-slate-200/60 px-4 py-2 backdrop-blur dark:border-white/15">24/7 Malaysian support desk</span>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="relative z-10 -mt-12 rounded-t-[32px] bg-white px-4 pb-24 pt-16 shadow-[0_-20px_60px_rgba(15,23,42,0.08)] transition-colors dark:bg-slate-950/95 dark:shadow-[0_-20px_60px_rgba(15,23,42,0.9)] sm:px-6 lg:px-12">
        <div className="mx-auto max-w-6xl">
          {projects.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-slate-50/60 px-8 py-16 text-center text-slate-600 dark:border-white/5 dark:bg-slate-900/60 dark:text-white/70">
              <p className="text-lg font-medium tracking-wide">Projects will appear here once you publish them from the admin panel.</p>
              <p className="mt-3 text-sm text-slate-500 dark:text-white/50">Head to Admin → Portfolio to add your first showcase.</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {projects
                .sort((a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER))
                .map(project => {
                  const durationLabel = project.durationDays ? `${project.durationDays} days` : '30 days';
                  const techStack = project.tech?.length ? project.tech : ['Custom Stack'];
                  const coverImage =
                    project.image ||
                    'https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&w=1200&q=80';

                  return (
                    <motion.article
                      key={project.id ?? project.title}
                      className="group flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-gradient-to-b from-white via-slate-50 to-slate-100 shadow-[0_25px_60px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:border-cyan-200 dark:border-white/10 dark:bg-gradient-to-br dark:from-[#081126] dark:via-[#0c1c38] dark:to-[#060a18] dark:shadow-[0_25px_70px_rgba(2,6,23,0.8)]"
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="relative h-60 overflow-hidden sm:h-64">
                        <img
                          src={coverImage}
                          alt={project.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-white/5 to-transparent dark:from-slate-950/80 dark:via-slate-950/10" />
                      </div>
                      <div className="flex items-center justify-between px-6 pt-6">
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">{project.title}</h2>
                        <span className="text-xs uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-200">{durationLabel}</span>
                      </div>
                      <div className="px-6 pb-6">
                        <div className="mt-4 rounded-[24px] border border-white/50 bg-gradient-to-br from-white/85 via-slate-50/80 to-slate-100/70 p-5 shadow-inner shadow-white/30 dark:border-white/10 dark:bg-gradient-to-br dark:from-[#0d1f3a]/85 dark:via-[#102848]/8 dark:to-[#060e1d]/88 dark:shadow-[inset_0_0_28px_rgba(6,14,29,0.55)]">
                          <p className="text-base text-slate-600 leading-relaxed dark:text-white/80">{project.summary}</p>

                          <div className="mt-5 flex flex-wrap gap-2">
                            {techStack.map(tech => (
                              <span
                                key={tech}
                                className="rounded-full border border-slate-200/70 bg-white/70 px-3 py-1 text-xs text-slate-600 shadow-sm dark:border-white/15 dark:bg-white/5 dark:text-white/70"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          <div className="mt-6 flex items-center justify-between text-sm">
                            <a
                              href={project.link || '#'}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 font-semibold text-cyan-600 hover:text-cyan-500 dark:text-cyan-300 dark:hover:text-cyan-100"
                            >
                              View live build
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M7 7h10v10" />
                              </svg>
                            </a>
                            <span className="text-slate-500 dark:text-white/60">Launch-ready</span>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
