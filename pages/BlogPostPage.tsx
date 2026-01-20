import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useData } from '../context/DataContext';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { blogPosts } = useData();

  const post = blogPosts.find((entry) => entry.slug === slug);

  const particles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, idx) => ({
        id: idx,
        size: Math.random() * 7 + 3,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: Math.random() * 4
      })),
    []
  );

  const safeHtml = useMemo(() => {
    if (!post?.content) return '';
    if (post.content.trim().startsWith('<')) return post.content;
    return post.content
      .split('\n')
      .map((paragraph) => paragraph.trim())
      .filter(Boolean)
      .map((paragraph) => `<p>${paragraph}</p>`)
      .join('');
  }, [post?.content]);

  if (!blogPosts.length && !post) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="ml-3 text-sm tracking-wide uppercase text-slate-500">Loading blog content...</span>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
        <p className="text-sm uppercase tracking-[0.5em] text-fuchsia-500">404</p>
        <h1 className="mt-4 text-3xl font-bold">We couldn&apos;t find that story.</h1>
        <p className="mt-2 text-slate-600 dark:text-white/70">It may have been moved or unpublished.</p>
        <button
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-600 hover:border-fuchsia-400 hover:text-fuchsia-400 dark:border-white/10 dark:text-white/80 dark:hover:border-fuchsia-300"
          onClick={() => navigate('/blog')}
        >
          <ArrowLeft size={16} /> Back to articles
        </button>
      </div>
    );
  }

  const createdAtDate = post.createdAt ? new Date(post.createdAt) : null;
  const createdLabel = createdAtDate
    ? createdAtDate.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })
    : 'Recently';
  const readingTime = Math.max(2, Math.round((post.content?.split(/\s+/).length ?? 400) / 200));
  const fallbackImage =
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80';
  const heroImage = post.imageUrl?.trim().startsWith('http')
    ? post.imageUrl.trim()
    : fallbackImage;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white">
      <section className="relative overflow-hidden px-4 pt-24 pb-16 sm:px-6 lg:px-12">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-200/40 via-white to-purple-100 dark:from-[#060914] dark:via-[#05081b] dark:to-[#031016]" />
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
          {particles.map((particle) => (
            <motion.span
              key={particle.id}
              className="absolute rounded-full bg-fuchsia-400/60 dark:bg-cyan-200/70"
              style={{ width: particle.size, height: particle.size, left: particle.left, top: particle.top }}
              animate={{ y: ['0%', '-8%', '6%'], opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 10, repeat: Infinity, delay: particle.delay }}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto max-w-4xl space-y-8">
          <button
            className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-slate-600 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-white/70"
            onClick={() => navigate('/blog')}
          >
            <ArrowLeft size={14} /> Back
          </button>

          <div>
            <p className="text-xs uppercase tracking-[0.5em] text-fuchsia-500">Aurexis Dispatch</p>
            <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">{post.title}</h1>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-white/70">
              <span>{createdLabel}</span>
              <span className="h-2 w-2 rounded-full bg-slate-400 dark:bg-white/60" />
              <span>{readingTime} min read</span>
              {post.tags?.length ? (
                <>
                  <span className="h-2 w-2 rounded-full bg-slate-400 dark:bg-white/60" />
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-slate-200/70 px-3 py-1 text-xs uppercase tracking-[0.3em] dark:border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          </div>

          <div className="overflow-hidden rounded-[32px] border border-slate-200 shadow-[0_40px_80px_rgba(15,23,42,0.25)] dark:border-white/10 dark:shadow-[0_40px_80px_rgba(5,8,22,0.8)]">
            <img
              src={heroImage}
              alt={post.title}
              className="h-96 w-full object-cover"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = fallbackImage;
              }}
            />
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-12 rounded-t-[32px] bg-white px-4 pb-24 pt-14 shadow-[0_-20px_60px_rgba(15,23,42,0.08)] dark:bg-slate-950/95 dark:shadow-[0_-30px_70px_rgba(5,8,22,0.9)] sm:px-6 lg:px-12">
        <div className="mx-auto flex max-w-4xl flex-col gap-16 md:flex-row">
          <article className="prose max-w-none text-lg text-slate-700 dark:prose-invert dark:text-white/80">
            <div dangerouslySetInnerHTML={{ __html: safeHtml }} />
          </article>

          <aside className="w-full rounded-3xl border border-slate-100 bg-slate-50/80 p-4 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-white/70 md:max-w-[260px] space-y-4 md:self-start md:sticky md:top-28">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500 dark:text-white/50">Editorial</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">{post.author || 'Aurexis Solution'}</h3>
            <p className="text-xs leading-relaxed text-slate-500 dark:text-white/60">
              AI-assisted by our editorial copilots. Every post is reviewed by the delivery team before it ships.
            </p>
            {post.generatedFrom && (
              <div className="rounded-2xl border border-fuchsia-200/70 bg-fuchsia-50/60 px-3 py-2 text-xs text-fuchsia-700 dark:border-fuchsia-500/40 dark:bg-fuchsia-500/10 dark:text-fuchsia-100 space-y-1">
                <p className="font-semibold tracking-wide text-[11px] uppercase">Prompt</p>
                <p className="whitespace-pre-line text-[11px] leading-snug">{post.generatedFrom}</p>
              </div>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
};

export default BlogPostPage;
