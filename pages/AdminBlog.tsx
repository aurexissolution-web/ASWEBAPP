import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  FileText,
  Home,
  LogOut,
  PenSquare,
  Plus,
  Save,
  ShieldAlert,
  Sparkles,
  Trash2
} from 'lucide-react';
import { useData } from '../context/DataContext';
import type { BlogPost, BlogPostStatus } from '../types';

const EMPTY_POST = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  author: 'Aurexis Solution',
  imageUrl: '',
  tags: '',
  status: 'draft' as BlogPostStatus,
  generatedFrom: ''
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const AdminBlog: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost } = useData();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_POST);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiGenerating, setAiGenerating] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('aurexis_ai_key') || '');
  const geminiModel = import.meta.env.VITE_GEMINI_MODEL?.trim() || 'gemini-2.5-flash-lite';

  useEffect(() => {
    if (apiKey) {
      localStorage.setItem('aurexis_ai_key', apiKey);
    }
  }, [apiKey]);

  const sortedPosts = useMemo(() => [...blogPosts].sort((a, b) => (b.updatedAt ?? '').localeCompare(a.updatedAt ?? '')), [blogPosts]);

  useEffect(() => {
    if (!selectedId) {
      setForm(EMPTY_POST);
      return;
    }
    const post = blogPosts.find((item) => item.id === selectedId);
    if (post) {
      setForm({
        title: post.title ?? '',
        slug: post.slug ?? '',
        excerpt: post.excerpt ?? '',
        content: post.content ?? '',
        author: post.author ?? 'Aurexis Solution',
        imageUrl: post.imageUrl ?? '',
        tags: post.tags?.join(', ') ?? '',
        status: post.status ?? 'draft',
        generatedFrom: post.generatedFrom ?? ''
      });
    }
  }, [selectedId, blogPosts]);

  const handleInput = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setStatusMessage(null);
    setErrorMessage(null);
    const payload = {
      title: form.title.trim(),
      slug: form.slug.trim() || slugify(form.title || ''),
      excerpt: form.excerpt.trim(),
      content: form.content,
      author: form.author.trim() || 'Aurexis Solution',
      imageUrl: form.imageUrl.trim(),
      tags: form.tags
        .split(',')
        .map((token) => token.trim())
        .filter(Boolean),
      status: form.status,
      generatedFrom: form.generatedFrom
    } as Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>;

    try {
      if (selectedId) {
        await updateBlogPost(selectedId, payload as Partial<BlogPost>);
        setStatusMessage('Post updated.');
      } else {
        await addBlogPost(payload);
        setStatusMessage('Post created.');
        setSelectedId(null);
      }
    } catch (error) {
      console.warn(error);
      setErrorMessage('Unable to save blog post. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedId) return;
    if (!window.confirm('Delete this post? This action cannot be undone.')) return;
    setSaving(true);
    setStatusMessage(null);
    setErrorMessage(null);
    try {
      await deleteBlogPost(selectedId);
      setSelectedId(null);
      setStatusMessage('Post deleted.');
    } catch (error) {
      console.warn(error);
      setErrorMessage('Unable to delete blog post.');
    } finally {
      setSaving(false);
    }
  };

  const generateWithAI = async () => {
    const keyToUse = apiKey || process.env.GEMINI_API_KEY || process.env.API_KEY;
    if (!keyToUse) {
      setErrorMessage('Please provide a Gemini API key before generating content.');
      return;
    }
    if (!aiPrompt.trim()) {
      setErrorMessage('Enter a prompt describing the article you want to generate.');
      return;
    }

    setAiGenerating(true);
    setErrorMessage(null);
    setStatusMessage(null);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${keyToUse}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Write a Markdown blog post for Aurexis Solution about: ${aiPrompt}.
Include:
- A compelling title
- 2-3 paragraph intro
- 3-4 sections with headings
- Bullet list for insights
- Short conclusion
Return a JSON object with "title", "excerpt", "contentMarkdown" fields.`
                  }
                ]
              }
            ]
          })
        }
      );

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => ({}));
        const apiError =
          errorPayload?.error?.message ??
          errorPayload?.error?.status ??
          `Gemini API returned ${response.status}`;
        throw new Error(apiError);
      }

      const data = await response.json();
      const rawText =
        data?.candidates?.[0]?.content?.parts?.map((part: { text?: string }) => part.text ?? '').join('\n') ??
        data?.candidates?.[0]?.output ??
        '';

      const stripCodeFences = (value: string) =>
        value
          .replace(/^```(?:json)?/i, '')
          .replace(/```$/i, '')
          .trim();

      const sanitizedText = stripCodeFences(rawText);

      const parsed =
        (() => {
          try {
            return JSON.parse(sanitizedText);
          } catch {
            return null;
          }
        })() || {};

      const normalizeTags = (input: unknown): string[] => {
        if (Array.isArray(input)) {
          return input.map((tag) => `${tag}`.trim()).filter(Boolean);
        }
        if (typeof input === 'string') {
          return input
            .split(/[,|]/)
            .map((tag) => tag.trim())
            .filter(Boolean);
        }
        const keywords = aiPrompt
          .split(/[,]/)
          .map((token) => token.trim())
          .filter(Boolean);
        return keywords.slice(0, 4);
      };

      const deriveExcerpt = (content: string, fallback: string) =>
        content
          .replace(/[#*>`]/g, '')
          .replace(/\s+/g, ' ')
          .trim()
          .split('. ')
          .slice(0, 2)
          .join('. ')
          .trim() || fallback;

      const deriveImageUrl = (provided?: string) => {
        if (provided?.startsWith('http')) return provided;
        const keywordsForImage =
          normalizeTags(parsed.tags ?? parsed.keywords ?? []).join(',') ||
          aiPrompt
            .split(/\s+/)
            .slice(0, 3)
            .join(',');
        return `https://source.unsplash.com/featured/?${encodeURIComponent(
          `technology,${keywordsForImage || 'ai'}`
        )}`;
      };

      setForm((prev) => {
        const title = `${parsed.title ?? prev.title}`.trim();
        const contentMarkdown = parsed.contentMarkdown ?? parsed.content ?? sanitizedText;
        const excerpt = parsed.excerpt ?? deriveExcerpt(contentMarkdown, prev.excerpt || '');
        const tagsArray = normalizeTags(parsed.tags ?? parsed.keywords);
        const slugValue = prev.slug || slugify(title || parsed.slug || '');
        return {
          ...prev,
          title: title || prev.title,
          slug: slugValue,
          excerpt,
          content: contentMarkdown,
          imageUrl: deriveImageUrl(parsed.imageUrl ?? parsed.image ?? parsed.heroImage),
          tags: tagsArray.length ? tagsArray.join(', ') : prev.tags,
          generatedFrom: aiPrompt
        };
      });
      setStatusMessage('AI draft imported. Review and polish before publishing.');
    } catch (error) {
      console.warn(error);
      setErrorMessage('Unable to generate content. Check your API key and prompt.');
    } finally {
      setAiGenerating(false);
    }
  };

  const navButtonClass = (path: string) =>
    `flex items-center gap-2 px-6 py-3 border-b-2 transition-colors ${
      location.pathname === path ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-300'
    }`;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-10 space-y-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-fuchsia-400">Aurexis Admin</p>
            <h1 className="text-3xl font-bold mt-1">Manage Blog Posts</h1>
            <p className="text-sm text-slate-400 mt-1">Start writing your blog post...</p>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-400">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-4 py-2 hover:bg-slate-900 transition"
            >
              <Home size={16} />
              Back to site
            </button>
            <button
              onClick={() => navigate('/logout', { replace: true })}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-500 px-4 py-2 shadow-lg shadow-blue-500/20"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </header>

        <div className="flex items-center gap-2 border-b border-slate-800">
          <button onClick={() => navigate('/admin')} className={navButtonClass('/admin')}>
            <Home size={18} />
            Homepage & Social
          </button>
          <button onClick={() => navigate('/admin/about')} className={navButtonClass('/admin/about')}>
            <FileText size={18} />
            About
          </button>
          <button onClick={() => navigate('/admin/services')} className={navButtonClass('/admin/services')}>
            <PenSquare size={18} />
            Services
          </button>
          <button onClick={() => navigate('/admin/pricing')} className={navButtonClass('/admin/pricing')}>
            <FileText size={18} />
            Pricing
          </button>
          <button onClick={() => navigate('/admin/portfolio')} className={navButtonClass('/admin/portfolio')}>
            <FileText size={18} />
            Portfolio
          </button>
          <button onClick={() => navigate('/admin/blog')} className={navButtonClass('/admin/blog')}>
            <Sparkles size={18} />
            Blog
          </button>
        </div>

        {(statusMessage || errorMessage) && (
          <div
            className={`rounded-2xl border px-4 py-3 text-sm flex items-center gap-2 ${
              errorMessage ? 'border-red-500/40 bg-red-500/10 text-red-200' : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200'
            }`}
          >
            <ShieldAlert size={16} />
            <span>{errorMessage ?? statusMessage}</span>
          </div>
        )}

        <section className="grid gap-8 lg:grid-cols-[300px_1fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Inventory</p>
                <h2 className="text-xl font-semibold">Posts</h2>
              </div>
              <button
                onClick={() => {
                  setSelectedId(null);
                  setForm(EMPTY_POST);
                }}
                className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300 hover:border-fuchsia-500/60"
              >
                <Plus size={14} />
                New
              </button>
            </div>
            <div className="space-y-3">
              {sortedPosts.length === 0 && (
                <p className="text-xs text-slate-500">No posts yet. Generate one with AI or create manually.</p>
              )}
              {sortedPosts.map((post) => (
                <button
                  key={post.id}
                  onClick={() => setSelectedId(post.id)}
                  className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                    selectedId === post.id ? 'border-fuchsia-400/60 bg-fuchsia-400/10' : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'
                  }`}
                >
                  <p className="text-sm font-semibold">{post.title || 'Untitled post'}</p>
                  <p className="text-xs text-slate-500">{post.status?.toUpperCase()}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <section className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/60 to-slate-950/80 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.45)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-fuchsia-400">Generate Content with AI</p>
                  <p className="text-sm text-slate-400 mt-1">
                    Provide a topic for the blog post, e.g., “The top 5 observability trends in 2026”.
                  </p>
                </div>
                <Sparkles className="text-fuchsia-400" />
              </div>

              <textarea
                rows={3}
                className="mt-4 w-full rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                placeholder="Enter a detailed prompt for AI blog generation..."
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
              />

              <div className="grid gap-4 md:grid-cols-2">
                <label className="text-xs uppercase tracking-[0.4em] text-slate-500">
                  API Key
                  <input
                    className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                    placeholder="Override GEMINI_API_KEY..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                </label>
                <div className="text-xs text-slate-400 space-y-1">
                  <p>Pro tips:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Be specific about the topic and target audience.</li>
                    <li>Request sections (introduction, main points, conclusion).</li>
                    <li>Ask for bullet lists, code blocks, or quotes.</li>
                  </ul>
                </div>
              </div>

              <button
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-fuchsia-600/90 px-5 py-2 text-sm font-semibold hover:bg-fuchsia-500 disabled:opacity-60"
                onClick={generateWithAI}
                disabled={aiGenerating}
              >
                <Sparkles size={16} />
                {aiGenerating ? 'Generating...' : 'Generate with AI'}
              </button>
            </section>

            <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.45)] space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
                    {selectedId ? 'Edit Post' : 'Add Post'}
                  </p>
                  <h2 className="text-2xl font-semibold">{selectedId ? 'Update blog content' : 'Draft a new article'}</h2>
                </div>
                <div className="ml-auto flex flex-wrap gap-3">
                  {selectedId && (
                    <button
                      onClick={handleDelete}
                      className="inline-flex items-center gap-2 rounded-full border border-red-500/50 px-4 py-2 text-sm text-red-200 hover:bg-red-500/10 disabled:opacity-60"
                      disabled={saving}
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  )}
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="inline-flex items-center gap-2 rounded-full bg-blue-600/90 px-5 py-2 text-sm font-semibold hover:bg-blue-600 disabled:opacity-60"
                  >
                    <Save size={16} />
                    {saving ? 'Saving…' : 'Save Post'}
                  </button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="text-sm text-slate-300">
                  Title
                  <input
                    className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.title}
                    onChange={(e) => handleInput('title', e.target.value)}
                  />
                </label>
                <label className="text-sm text-slate-300">
                  Slug (auto-generated if blank)
                  <input
                    className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.slug}
                    onChange={(e) => handleInput('slug', e.target.value)}
                  />
                </label>
              </div>

              <label className="text-sm text-slate-300">
                Content
                <textarea
                  rows={10}
                  className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.content}
                  onChange={(e) => handleInput('content', e.target.value)}
                  placeholder="Start writing your blog post..."
                />
              </label>

              <p className="text-xs text-slate-500">
                Markdown shortcuts: **bold**, *italic*, # heading, - list, `code`
              </p>

              <label className="text-sm text-slate-300">
                Excerpt
                <textarea
                  rows={3}
                  className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.excerpt}
                  onChange={(e) => handleInput('excerpt', e.target.value)}
                />
              </label>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="text-sm text-slate-300">
                  Image URL
                  <input
                    className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.imageUrl}
                    onChange={(e) => handleInput('imageUrl', e.target.value)}
                    placeholder="https://..."
                  />
                </label>
                <label className="text-sm text-slate-300">
                  Author
                  <input
                    className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.author}
                    onChange={(e) => handleInput('author', e.target.value)}
                  />
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="text-sm text-slate-300">
                  Tags (comma separated)
                  <input
                    className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.tags}
                    onChange={(e) => handleInput('tags', e.target.value)}
                    placeholder="AI, Observability, Automation"
                  />
                </label>
                <label className="text-sm text-slate-300">
                  Status
                  <select
                    className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.status}
                    onChange={(e) => handleInput('status', e.target.value as BlogPostStatus)}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </label>
              </div>

              <label className="text-sm text-slate-300">
                Prompt (saved for reference)
                <textarea
                  rows={3}
                  className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.generatedFrom}
                  onChange={(e) => handleInput('generatedFrom', e.target.value)}
                />
              </label>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminBlog;
