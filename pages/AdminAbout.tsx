import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Plus, Trash2, Save, LogOut, Home, FileText, Settings, Coins, Grid, ShieldAlert, Sparkles } from 'lucide-react';
import { useData } from '../context/DataContext';
import type { AboutPageSettings } from '../types';
import { DEFAULT_ABOUT_PAGE_SETTINGS } from '../constants';

const AdminAbout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { aboutPageSettings, updateAboutPageSettings } = useData();

  const [form, setForm] = useState<AboutPageSettings>(aboutPageSettings);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setForm(aboutPageSettings);
  }, [aboutPageSettings]);

  const handleInput = (field: keyof AboutPageSettings, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleStoryHighlightChange = (index: number, field: 'icon' | 'text', value: string) => {
    setForm(prev => {
      const highlights = [...(prev.storyHighlights ?? [])];
      const current = highlights[index] ?? { icon: '', text: '' };
      highlights[index] = { ...current, [field]: value };
      return { ...prev, storyHighlights: highlights };
    });
  };

  const handleAddStoryHighlight = () => {
    setForm(prev => ({
      ...prev,
      storyHighlights: [...(prev.storyHighlights ?? []), { icon: '', text: '' }]
    }));
  };

  const handleRemoveStoryHighlight = (index: number) => {
    setForm(prev => {
      const highlights = [...(prev.storyHighlights ?? [])];
      highlights.splice(index, 1);
      return { ...prev, storyHighlights: highlights };
    });
  };

  const handleArrayInput = (field: 'heroMessages' | 'principles', index: number, subField: string, value: string) => {
    setForm(prev => {
      const newArray = [...(prev[field] as any[])];
      if (field === 'principles') {
        newArray[index] = { ...newArray[index], [subField]: value };
      } else {
        newArray[index] = value;
      }
      return { ...prev, [field]: newArray };
    });
  };

  const handleAddArrayItem = (field: 'heroMessages' | 'principles') => {
    setForm(prev => {
      if (field === 'heroMessages') {
        return { ...prev, heroMessages: [...prev.heroMessages, ''] };
      } else {
        return { ...prev, principles: [...prev.principles, { title: '', body: '' }] };
      }
    });
  };

  const handleRemoveArrayItem = (field: 'heroMessages' | 'principles', index: number) => {
    setForm(prev => {
      const newArray = [...(prev[field] as any[])];
      newArray.splice(index, 1);
      return { ...prev, [field]: newArray };
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setStatusMessage(null);
    setErrorMessage(null);
    try {
      await updateAboutPageSettings(form);
      setStatusMessage('About page content saved successfully.');
    } catch (error) {
      console.warn(error);
      setErrorMessage('Unable to save about page content. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleInitialize = async () => {
    setSaving(true);
    setStatusMessage(null);
    setErrorMessage(null);
    try {
      await updateAboutPageSettings(DEFAULT_ABOUT_PAGE_SETTINGS);
      setStatusMessage('About page content initialized with default values.');
      setForm(DEFAULT_ABOUT_PAGE_SETTINGS);
    } catch (error) {
      console.warn(error);
      setErrorMessage('Unable to initialize about page content.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    navigate('/logout', { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-blue-400">AurexisSolution</p>
            <h1 className="text-3xl font-bold mt-1">About Page Editor</h1>
            <p className="text-sm text-slate-400 mt-1">Edit all content for the About page.</p>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-400">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-700 bg-slate-900/60 hover:bg-slate-900 transition"
            >
              <Home size={16} />
              Back to site
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-500 shadow-lg shadow-blue-500/20"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800">
          <button onClick={() => navigate('/admin')} className={`flex items-center gap-2 px-6 py-3 border-b-2 ${location.pathname === '/admin' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-300'} transition-colors`}>
            <Home size={18} />
            Homepage & Social
          </button>
          <button onClick={() => navigate('/admin/about')} className={`flex items-center gap-2 px-6 py-3 border-b-2 ${location.pathname === '/admin/about' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-300'} transition-colors`}>
            <FileText size={18} />
            About Page
          </button>
          <button onClick={() => navigate('/admin/services')} className={`flex items-center gap-2 px-6 py-3 border-b-2 ${location.pathname === '/admin/services' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-300'} transition-colors`}>
            <Settings size={18} />
            Services
          </button>
          <button onClick={() => navigate('/admin/pricing')} className={`flex items-center gap-2 px-6 py-3 border-b-2 ${location.pathname === '/admin/pricing' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-300'} transition-colors`}>
            <Coins size={18} />
            Pricing
          </button>
          <button onClick={() => navigate('/admin/portfolio')} className={`flex items-center gap-2 px-6 py-3 border-b-2 ${location.pathname === '/admin/portfolio' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-300'} transition-colors`}>
            <Grid size={18} />
            Portfolio
          </button>
          <button onClick={() => navigate('/admin/blog')} className={`flex items-center gap-2 px-6 py-3 border-b-2 ${location.pathname === '/admin/blog' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-300'} transition-colors`}>
            <Sparkles size={18} />
            Blog
          </button>
        </div>

        {(errorMessage || statusMessage) && (
          <div className={`rounded-2xl border px-4 py-3 text-sm flex items-center gap-2 ${errorMessage ? 'border-red-500/40 bg-red-500/10 text-red-200' : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200'}`}>
            <ShieldAlert size={16} />
            <span>{errorMessage ?? statusMessage}</span>
          </div>
        )}

        {/* Hero Section */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Hero Section</p>
              <h2 className="text-xl font-semibold">Hero Content</h2>
            </div>
            <button
              onClick={() => handleAddArrayItem('heroMessages')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-700 bg-slate-900/60 hover:bg-slate-900 transition"
            >
              <Plus size={16} />
              Add Message
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-xs uppercase tracking-[0.4em] text-slate-500 mb-2">Hero Title</label>
              <input
                className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.heroTitle}
                onChange={(e) => handleInput('heroTitle', e.target.value)}
                placeholder="Building Malaysia's"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.4em] text-slate-500 mb-2">Hero Highlight</label>
              <input
                className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.heroHighlight}
                onChange={(e) => handleInput('heroHighlight', e.target.value)}
                placeholder="AI Future"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-xs uppercase tracking-[0.4em] text-slate-500 mb-2">Primary CTA Label</label>
              <input
                className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.heroPrimaryCtaLabel}
                onChange={(e) => handleInput('heroPrimaryCtaLabel', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.4em] text-slate-500 mb-2">Primary CTA Link</label>
              <input
                className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.heroPrimaryCtaLink ?? ''}
                onChange={(e) => handleInput('heroPrimaryCtaLink', e.target.value)}
                placeholder="/portfolio"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.4em] text-slate-500 mb-2">Secondary CTA Label</label>
              <input
                className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.heroSecondaryCtaLabel}
                onChange={(e) => handleInput('heroSecondaryCtaLabel', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.4em] text-slate-500 mb-2">Secondary CTA Link</label>
              <input
                className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.heroSecondaryCtaLink ?? ''}
                onChange={(e) => handleInput('heroSecondaryCtaLink', e.target.value)}
                placeholder="https://calendly.com/aurexis/30min"
              />
            </div>
          </div>

          <div className="space-y-3">
            {form.heroMessages.map((message, index) => (
              <div key={index} className="flex items-center gap-3">
                <input
                  className="flex-1 rounded-2xl bg-slate-900 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={message}
                  onChange={(e) => handleArrayInput('heroMessages', index, '', e.target.value)}
                  placeholder={`Hero message ${index + 1}`}
                />
                <button
                  onClick={() => handleRemoveArrayItem('heroMessages', index)}
                  className="px-3 py-3 rounded-2xl border border-red-500/40 text-red-400 hover:bg-red-500/10 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Our Story Section */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Our Story</p>
            <h2 className="text-xl font-semibold">Our Story Section</h2>
          </div>
          <div className="space-y-4">
            <label className="block text-xs uppercase tracking-[0.4em] text-slate-500">Title</label>
            <input
              className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.ourStoryTitle}
              onChange={(e) => handleInput('ourStoryTitle', e.target.value)}
            />
            <label className="block text-xs uppercase tracking-[0.4em] text-slate-500">Text</label>
            <textarea
              rows={4}
              className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              value={form.ourStoryText}
              onChange={(e) => handleInput('ourStoryText', e.target.value)}
            />
            <div className="flex items-center justify-between pt-2">
              <label className="text-xs uppercase tracking-[0.4em] text-slate-500">Story Highlights</label>
              <button
                type="button"
                onClick={handleAddStoryHighlight}
                className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-900/60"
              >
                <Plus size={14} />
                Add Highlight
              </button>
            </div>
            <div className="space-y-4">
              {(form.storyHighlights ?? []).map((highlight, index) => (
                <div key={index} className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4 space-y-3">
                  <div className="flex items-center justify-between text-sm text-slate-400">
                    <span>Highlight {index + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveStoryHighlight(index)}
                      className="inline-flex items-center gap-1 rounded-full border border-red-500/30 px-3 py-1 text-red-300 hover:bg-red-500/10"
                    >
                      <Trash2 size={14} />
                      Remove
                    </button>
                  </div>
                  <div className="grid gap-3 md:grid-cols-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-1">Icon / Emoji</label>
                      <input
                        className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={highlight?.icon ?? ''}
                        onChange={(e) => handleStoryHighlightChange(index, 'icon', e.target.value)}
                        placeholder="🤖"
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label className="block text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-1">Text</label>
                      <textarea
                        rows={2}
                        className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        value={highlight?.text ?? ''}
                        onChange={(e) => handleStoryHighlightChange(index, 'text', e.target.value)}
                        placeholder="Key proof point"
                      />
                    </div>
                  </div>
                </div>
              ))}
              {(form.storyHighlights?.length ?? 0) === 0 && (
                <p className="text-sm text-slate-500">No highlights yet. Add a few bullet points to match the four cards on the About page.</p>
              )}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Mission</p>
            <h2 className="text-xl font-semibold">Mission Section</h2>
          </div>
          <div className="space-y-4">
            <label className="block text-xs uppercase tracking-[0.4em] text-slate-500">Title</label>
            <input
              className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.missionTitle}
              onChange={(e) => handleInput('missionTitle', e.target.value)}
            />
            <label className="block text-xs uppercase tracking-[0.4em] text-slate-500">Text</label>
            <textarea
              rows={4}
              className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              value={form.missionText}
              onChange={(e) => handleInput('missionText', e.target.value)}
            />
          </div>
        </section>

        {/* Principles Section */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Principles</p>
              <h2 className="text-xl font-semibold">Principles Section</h2>
            </div>
            <button
              onClick={() => handleAddArrayItem('principles')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-700 bg-slate-900/60 hover:bg-slate-900 transition"
            >
              <Plus size={16} />
              Add Principle
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-[0.4em] text-slate-500 mb-2">Section Title</label>
              <input
                className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.principlesTitle}
                onChange={(e) => handleInput('principlesTitle', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.4em] text-slate-500 mb-2">Section Subtitle</label>
              <input
                className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.principlesSubtitle}
                onChange={(e) => handleInput('principlesSubtitle', e.target.value)}
              />
            </div>
            <div className="space-y-4">
              {form.principles.map((principle, index) => (
                <div key={index} className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Principle {index + 1}</span>
                    <button
                      onClick={() => handleRemoveArrayItem('principles', index)}
                      className="px-3 py-1 rounded-lg border border-red-500/40 text-red-400 hover:bg-red-500/10 transition text-sm"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <input
                    className="w-full rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={principle.title}
                    onChange={(e) => handleArrayInput('principles', index, 'title', e.target.value)}
                    placeholder="Principle title"
                  />
                  <textarea
                    rows={2}
                    className="w-full rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    value={principle.body}
                    onChange={(e) => handleArrayInput('principles', index, 'body', e.target.value)}
                    placeholder="Principle description"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Founder</p>
            <h2 className="text-xl font-semibold">Founder Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-[0.4em] text-slate-500 mb-2">Name</label>
              <input
                className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.founderName}
                onChange={(e) => handleInput('founderName', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.4em] text-slate-500 mb-2">Role</label>
              <input
                className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.founderRole}
                onChange={(e) => handleInput('founderRole', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.4em] text-slate-500 mb-2">Location</label>
              <input
                className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.founderLocation}
                onChange={(e) => handleInput('founderLocation', e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs uppercase tracking-[0.4em] text-slate-500 mb-2">Bio</label>
              <textarea
                rows={3}
                className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                value={form.founderBio}
                onChange={(e) => handleInput('founderBio', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.4em] text-slate-500 mb-2">LinkedIn URL</label>
              <input
                className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.founderLinkedIn || ''}
                onChange={(e) => handleInput('founderLinkedIn', e.target.value)}
                placeholder="https://linkedin.com/in/..."
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.4em] text-slate-500 mb-2">Instagram URL</label>
              <input
                className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.founderInstagram || ''}
                onChange={(e) => handleInput('founderInstagram', e.target.value)}
                placeholder="https://instagram.com/..."
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.4em] text-slate-500 mb-2">WhatsApp URL</label>
              <input
                className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.founderWhatsApp || ''}
                onChange={(e) => handleInput('founderWhatsApp', e.target.value)}
                placeholder="https://wa.me/..."
              />
            </div>
          </div>
        </section>

        {/* How We Work Section */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">How We Work</p>
            <h2 className="text-xl font-semibold">How We Work Section</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-[0.4em] text-slate-500 mb-2">Title</label>
              <input
                className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.howWeWorkTitle}
                onChange={(e) => handleInput('howWeWorkTitle', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.4em] text-slate-500 mb-2">Subtitle</label>
              <input
                className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.howWeWorkSubtitle}
                onChange={(e) => handleInput('howWeWorkSubtitle', e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Why Now Section */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Why Now</p>
            <h2 className="text-xl font-semibold">Why Now Section</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-[0.4em] text-slate-500 mb-2">Title</label>
              <input
                className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.whyNowTitle}
                onChange={(e) => handleInput('whyNowTitle', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.4em] text-slate-500 mb-2">Subtitle</label>
              <input
                className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.whyNowSubtitle}
                onChange={(e) => handleInput('whyNowSubtitle', e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Why Us Section */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Why Us</p>
            <h2 className="text-xl font-semibold">Why Us Section</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-[0.4em] text-slate-500 mb-2">Title</label>
              <input
                className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.whyUsTitle}
                onChange={(e) => handleInput('whyUsTitle', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.4em] text-slate-500 mb-2">Subtitle</label>
              <input
                className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.whyUsSubtitle}
                onChange={(e) => handleInput('whyUsSubtitle', e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Save Button */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handleInitialize}
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-700 bg-slate-900/60 hover:bg-slate-900 transition disabled:opacity-60"
          >
            Initialize Defaults
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600/90 hover:bg-blue-600 transition disabled:opacity-60"
          >
            <Save size={18} />
            {saving ? 'Saving...' : 'Save All Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAbout;
