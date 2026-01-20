import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';

const Blog: React.FC = () => {
  const { blogPosts } = useData();

  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, idx) => ({
        id: idx,
        size: Math.random() * 6 + 3,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: Math.random() * 3
      })),
    []
  );

  const publishedPosts = blogPosts.filter((post) => post.status === 'published');

  const formattedPosts = publishedPosts.map((post) => {
    const createdAt = post.createdAt ? new Date(post.createdAt) : null;
    const readingTime = Math.max(2, Math.round((post.content?.split(/\s+/).length ?? 400) / 200));
    const excerpt =
      post.excerpt ||
      post.content?.replace(/<[^>]+>/g, '').split('\n').filter(Boolean).slice(0, 3).join(' ') ||
      'Stay tuned for the full article.';
    return {
      ...post,
      createdLabel: createdAt ? createdAt.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently',
      readingTime,
      excerpt
    };
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-12">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-200/40 via-white to-purple-100 dark:from-indigo-900 dark:via-slate-950 dark:to-emerald-900" />
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
          {particles.map((particle) => (
            <motion.span
              key={particle.id}
              className="absolute rounded-full bg-fuchsia-400/60 dark:bg-cyan-200/70"
              style={{ width: particle.size, height: particle.size, left: particle.left, top: particle.top }}
              animate={{ y: ['0%', '-10%', '5%'], opacity: [0.1, 0.7, 0.1] }}
              transition={{ duration: 8, repeat: Infinity, delay: particle.delay }}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto max-w-5xl space-y-6 text-center">
          <p className="text-xs uppercase tracking-[0.6em] text-fuchsia-600 dark:text-fuchsia-200">Aurexis Dispatch</p>
          <h1 className="text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
            Stories from the edge of{' '}
            <span className="bg-gradient-to-r from-fuchsia-500 to-indigo-500 bg-clip-text text-transparent dark:from-cyan-300 dark:to-blue-400">
              telemetry & AI.
            </span>
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-slate-700 dark:text-white/80">
            Internal playbooks, sprint retros, and AI automation notes straight from the Aurexis delivery room. Every post is generated,
            edited, and shipped from the same admin cockpit your team will use.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-600 dark:text-white/70">
            <span className="rounded-full border border-slate-200/60 px-4 py-2 backdrop-blur dark:border-white/15">
              {publishedPosts.length || '—'} published essays
            </span>
            <span className="rounded-full border border-slate-200/60 px-4 py-2 backdrop-blur dark:border-white/15">
              Crafted in-house with AI copilots
            </span>
            <span className="rounded-full border border-slate-200/60 px-4 py-2 backdrop-blur dark:border-white/15">Updated weekly</span>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="relative z-10 -mt-12 rounded-t-[32px] bg-white px-4 pb-24 pt-16 shadow-[0_-20px_60px_rgba(15,23,42,0.08)] transition-colors dark:bg-slate-950/95 dark:shadow-[0_-20px_60px_rgba(15,23,42,0.9)] sm:px-6 lg:px-12">
        <div className="mx-auto max-w-6xl space-y-8">
          {formattedPosts.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-slate-50/60 px-8 py-16 text-center text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-white/70">
              <p className="text-lg font-medium tracking-wide">AI-crafted insights will appear here after you publish your first post.</p>
              <p className="mt-3 text-sm text-slate-500 dark:text-white/50">Head to Admin → Blog to generate and ship a new story.</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {formattedPosts.map((post) => (
                <motion.article
                  key={post.id}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_25px_60px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:border-fuchsia-300 dark:border-white/5 dark:bg-gradient-to-br dark:from-white/5 dark:via-slate-900/60 dark:to-slate-900/90 dark:shadow-[0_20px_35px_rgba(5,8,22,0.6)]"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="relative">
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={
                          post.imageUrl?.trim().startsWith('http')
                            ? post.imageUrl.trim()
                            : 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80'
                        }
                        alt={post.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        onError={(event) => {
                          event.currentTarget.onerror = null;
                          event.currentTarget.src =
                            'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80';
                        }}
                      />
                    </div>
                    <div className="absolute left-4 top-4 rounded-full border border-white/60 bg-white/90 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-700 dark:border-white/20 dark:bg-slate-900/80 dark:text-white/70">
                      {post.createdLabel}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col gap-4 px-6 py-6">
                    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-white/60">
                      {post.tags?.length ? (
                        post.tags.map((tag) => (
                          <span key={tag} className="rounded-full border border-slate-200 px-3 py-1 text-[10px] dark:border-white/15">
                            {tag}
                          </span>
                        ))
                      ) : (
                        <span>INSIGHT</span>
                      )}
                      <span className="text-[10px] font-semibold text-fuchsia-500 dark:text-fuchsia-300">{post.readingTime} min read</span>
                    </div>

                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">{post.title}</h2>
                    <p className="text-slate-600 dark:text-white/75">{post.excerpt}</p>

                    <div className="mt-auto flex items-center justify-between text-sm text-slate-500 dark:text-white/60">
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-fuchsia-500/40 to-indigo-500/40 backdrop-blur" />
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">{post.author || 'Aurexis Solution'}</p>
                          <p className="text-xs uppercase tracking-[0.3em]">Editorial</p>
                        </div>
                      </div>
                      <button
                        className="inline-flex items-center gap-2 text-sm font-semibold text-fuchsia-600 hover:text-fuchsia-500 dark:text-fuchsia-300"
                        onClick={() => window.open(`/#/blog/${post.slug}`, '_blank')}
                      >
                        Read Post
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M7 7h10v10" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
