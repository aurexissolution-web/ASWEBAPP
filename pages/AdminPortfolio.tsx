import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Plus, Save, Trash2, ShieldAlert, LogOut, Home, FileText, Settings, Coins, Grid, UploadCloud, Sparkles } from 'lucide-react';
import { useData } from '../context/DataContext';
import type { PortfolioProject, ProjectCategory } from '../types';

const CATEGORY_OPTIONS: { label: string; value: ProjectCategory }[] = [
  { label: 'AI Automation', value: 'ai' },
  { label: 'Web Platforms', value: 'web' },
  { label: 'Cloud / DevOps', value: 'cloud' },
  { label: 'Data / Analytics', value: 'data' },
  { label: 'E-commerce', value: 'ecommerce' },
  { label: 'Workflow Automation', value: 'automation' }
];

interface PortfolioFormState {
  title: string;
  summary: string;
  category: ProjectCategory;
  techInput: string;
  durationDays: number;
  link: string;
  image: string;
  order: number;
  featured: boolean;
}

const EMPTY_FORM: PortfolioFormState = {
  title: '',
  summary: '',
  category: 'web',
  techInput: '',
  durationDays: 30,
  link: '',
  image: '',
  order: 0,
  featured: false
};

const AdminPortfolio: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { projects, addProject, updateProject, deleteProject } = useData();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [form, setForm] = useState<PortfolioFormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const cloudinaryConfig = useMemo(
    () => ({
      cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
      unsignedPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    }),
    []
  );

  const sortedProjects = useMemo(
    () =>
      [...projects].sort((a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER)),
    [projects]
  );

  const selectedProject = useMemo(() => sortedProjects.find(project => project.id === selectedId), [sortedProjects, selectedId]);

  useEffect(() => {
    if (selectedProject) {
      setForm({
        title: selectedProject.title,
        summary: selectedProject.summary,
        category: selectedProject.category,
        techInput: selectedProject.tech.join(', '),
        durationDays: selectedProject.durationDays,
        link: selectedProject.link ?? '',
        image: selectedProject.image ?? '',
        order: selectedProject.order ?? 0,
        featured: Boolean(selectedProject.featured)
      });
    } else {
      setForm({
        ...EMPTY_FORM,
        order: sortedProjects.length
      });
    }
  }, [selectedProject, sortedProjects.length]);

  const handleInput = <K extends keyof PortfolioFormState>(key: K, value: PortfolioFormState[K]) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleImageUpload = async (file: File) => {
    if (!cloudinaryConfig.cloudName || !cloudinaryConfig.unsignedPreset) {
      setErrorMessage('Cloudinary is not configured. Please provide VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET.');
      return;
    }
    setUploadingImage(true);
    setStatusMessage(null);
    setErrorMessage(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', cloudinaryConfig.unsignedPreset);
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (!response.ok || !data.secure_url) {
        throw new Error(data.error?.message ?? 'Upload failed');
      }
      setForm(prev => ({ ...prev, image: data.secure_url }));
      setStatusMessage('Image uploaded. Remember to save the project.');
    } catch (error) {
      console.warn(error);
      setErrorMessage(error instanceof Error ? error.message : 'Unable to upload image. Please try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleImageFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageUpload(file);
      event.target.value = '';
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setStatusMessage(null);
    setErrorMessage(null);
    const payload: Omit<PortfolioProject, 'id'> = {
      title: form.title.trim(),
      summary: form.summary.trim(),
      category: form.category,
      tech: form.techInput.split(',').map(token => token.trim()).filter(Boolean),
      durationDays: Number(form.durationDays) || 0,
      link: form.link.trim(),
      image: form.image.trim(),
      showcaseImages: [],
      featured: form.featured,
      order: Number(form.order) || 0
    };

    try {
      if (selectedId) {
        await updateProject(selectedId, payload);
        setStatusMessage('Project updated.');
      } else {
        await addProject(payload);
        setStatusMessage('Project created.');
        setSelectedId(null);
      }
    } catch (error) {
      console.warn(error);
      setErrorMessage('Unable to save project. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedId) return;
    if (!confirm('Delete this project? This action cannot be undone.')) return;
    setSaving(true);
    setStatusMessage(null);
    setErrorMessage(null);
    try {
      await deleteProject(selectedId);
      setStatusMessage('Project deleted.');
      setSelectedId(null);
    } catch (error) {
      console.warn(error);
      setErrorMessage('Unable to delete project.');
    } finally {
      setSaving(false);
    }
  };

  const tabButtonClass = (path: string) =>
    `flex items-center gap-2 px-6 py-3 border-b-2 transition-colors ${
      location.pathname === path ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-300'
    }`;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-10 space-y-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-blue-400">AurexisSolution</p>
            <h1 className="text-3xl font-bold mt-1">Portfolio Control Center</h1>
            <p className="text-sm text-slate-400 mt-1">Upload new case studies, manage screenshots, and control ordering.</p>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-400">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-4 py-2 hover:bg-slate-900 transition"
            >
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
          <button onClick={() => navigate('/admin')} className={tabButtonClass('/admin')}>
            <Home size={18} />
            Homepage & Social
          </button>
          <button onClick={() => navigate('/admin/about')} className={tabButtonClass('/admin/about')}>
            <FileText size={18} />
            About Page
          </button>
          <button onClick={() => navigate('/admin/services')} className={tabButtonClass('/admin/services')}>
            <Settings size={18} />
            Services
          </button>
          <button onClick={() => navigate('/admin/pricing')} className={tabButtonClass('/admin/pricing')}>
            <Coins size={18} />
            Pricing
          </button>
          <button onClick={() => navigate('/admin/portfolio')} className={tabButtonClass('/admin/portfolio')}>
            <Grid size={18} />
            Portfolio Projects
          </button>
          <button onClick={() => navigate('/admin/blog')} className={tabButtonClass('/admin/blog')}>
            <Sparkles size={18} />
            Blog
          </button>
        </div>

        {(statusMessage || errorMessage) && (
          <div
            className={`flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm ${
              errorMessage ? 'border-red-500/40 bg-red-500/10 text-red-200' : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200'
            }`}
          >
            <ShieldAlert size={16} />
            <span>{errorMessage ?? statusMessage}</span>
          </div>
        )}

        <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Project Inventory</p>
              <h2 className="text-2xl font-semibold">Select a project to edit</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedId(null)}
                className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:border-blue-500/50"
              >
                <Plus size={16} />
                New Project
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {sortedProjects.map(project => (
              <button
                key={project.id}
                onClick={() => setSelectedId(project.id)}
                className={`rounded-2xl border px-4 py-3 text-left transition ${
                  project.id === selectedId
                    ? 'border-cyan-400/60 bg-cyan-400/10'
                    : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold">{project.title || 'Untitled project'}</span>
                  <span className="text-xs uppercase tracking-[0.3em] text-slate-400">{project.durationDays}d</span>
                </div>
                <p className="text-xs text-slate-400">{project.category.toUpperCase()}</p>
              </button>
            ))}
            {sortedProjects.length === 0 && (
              <div className="rounded-2xl border border-slate-800 bg-slate-950/40 px-4 py-6 text-center text-sm text-slate-400">
                No projects yet. Click “New Project” to add your first case study.
              </div>
            )}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.35)] space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
                {selectedId ? 'Edit Project' : 'Create Project'}
              </p>
              <h2 className="text-2xl font-semibold">{selectedId ? 'Update case study content' : 'Add new case study'}</h2>
            </div>
            <div className="ml-auto flex flex-wrap gap-3">
              {selectedId && (
                <button
                  onClick={handleDelete}
                  className="inline-flex items-center gap-2 rounded-full border border-red-500/50 px-4 py-2 text-sm text-red-200 hover:bg-red-500/10"
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
                {saving ? 'Saving…' : 'Save Project'}
              </button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm text-slate-300">
              Title
              <input
                className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 focus:border-cyan-400 focus:outline-none"
                value={form.title}
                onChange={e => handleInput('title', e.target.value)}
              />
            </label>
            <label className="block text-sm text-slate-300">
              Category
              <select
                className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 focus:border-cyan-400 focus:outline-none"
                value={form.category}
                onChange={e => handleInput('category', e.target.value as ProjectCategory)}
              >
                {CATEGORY_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="block text-sm text-slate-300">
            Summary
            <textarea
              rows={3}
              className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 focus:border-cyan-400 focus:outline-none"
              value={form.summary}
              onChange={e => handleInput('summary', e.target.value)}
            />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm text-slate-300">
              Tech Stack (comma separated)
              <input
                className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 focus:border-cyan-400 focus:outline-none"
                value={form.techInput}
                onChange={e => handleInput('techInput', e.target.value)}
                placeholder="Next.js, Firebase, Stripe"
              />
            </label>
            <label className="block text-sm text-slate-300">
              Duration in days
              <input
                type="number"
                min={0}
                className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 focus:border-cyan-400 focus:outline-none"
                value={form.durationDays}
                onChange={e => handleInput('durationDays', Number(e.target.value))}
              />
            </label>
          </div>

  <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm text-slate-300">
              Live link
              <input
                className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 focus:border-cyan-400 focus:outline-none"
                value={form.link}
                onChange={e => handleInput('link', e.target.value)}
                placeholder="https://..."
              />
            </label>
            <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-300">
              <label className="block">
                Cover image URL
                <input
                  className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 focus:border-cyan-400 focus:outline-none"
                  value={form.image}
                  onChange={e => handleInput('image', e.target.value)}
                  placeholder="https://..."
                />
              </label>
              <div className="flex flex-wrap items-center gap-3">
                <label className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-400 hover:border-cyan-400/60 cursor-pointer">
                  <UploadCloud size={14} />
                  Upload from device
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageFileChange} />
                </label>
                {uploadingImage && <span className="text-xs text-cyan-300">Uploading…</span>}
              </div>
              {form.image && (
                <div className="overflow-hidden rounded-2xl border border-slate-800">
                  <img src={form.image} alt="Cover preview" className="h-32 w-full object-cover" />
                </div>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm text-slate-300">
              Ordering (lower numbers appear first)
              <input
                type="number"
                className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 focus:border-cyan-400 focus:outline-none"
                value={form.order}
                onChange={e => handleInput('order', Number(e.target.value))}
              />
            </label>
            <label className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-300">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={e => handleInput('featured', e.target.checked)}
                className="h-4 w-4 rounded border border-slate-600 bg-slate-900 text-cyan-400 focus:ring-cyan-400"
              />
              Mark as featured
            </label>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminPortfolio;
