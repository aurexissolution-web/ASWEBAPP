import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import {
  ShieldAlert,
  Save,
  LogOut,
  Home,
  FileText,
  Settings,
  Coins,
  Plus,
  Trash2,
  Grid,
  Sparkles
} from 'lucide-react';
import type {
  PricingFaqItem,
  PricingHeroMetric,
  PricingMetricBubble,
  PricingPageContent,
  PricingPageId,
  PricingPlan,
  PricingRoiSlider
} from '../types';

const PRICING_PAGE_LABELS: Record<PricingPageId, string> = {
  web: 'Web Development',
  ai: 'AI Automation',
  app: 'App Development',
  data: 'Data Analysis',
  cloud: 'Cloud Solutions'
};

type EditablePlan = PricingPlan & {
  bulletsText: string;
  tagsText: string;
};

type PricingFormState = {
  heroEyebrow: string;
  heroBadge: string;
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  heroDescription: string;
  heroBulletsText: string;
  heroChipsText: string;
  heroPrimaryLabel: string;
  heroPrimaryLink: string;
  heroSecondaryLabel: string;
  heroSecondaryLink: string;
  heroMetrics: PricingHeroMetric[];
  metricBubbles: PricingMetricBubble[];
  plans: EditablePlan[];
  faqs: PricingFaqItem[];
  roiHeadline: string;
  roiDescription: string;
  roiBaseline: number;
  roiSliders: PricingRoiSlider[];
};

const DEFAULT_FORM_STATE: PricingFormState = {
  heroEyebrow: '',
  heroBadge: '',
  heroTitle: '',
  heroHighlight: '',
  heroSubtitle: '',
  heroDescription: '',
  heroBulletsText: '',
  heroChipsText: '',
  heroPrimaryLabel: '',
  heroPrimaryLink: '',
  heroSecondaryLabel: '',
  heroSecondaryLink: '',
  heroMetrics: [],
  metricBubbles: [],
  plans: [],
  faqs: [],
  roiHeadline: '',
  roiDescription: '',
  roiBaseline: 0,
  roiSliders: []
};

const newId = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2, 11);

const AdminPricing: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pricingPages, updatePricingPage } = useData();

  const [selectedPage, setSelectedPage] = useState<PricingPageId>('web');
  const [form, setForm] = useState<PricingFormState>(DEFAULT_FORM_STATE);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const selectedContent: PricingPageContent | undefined = pricingPages[selectedPage];

  useEffect(() => {
    if (!selectedContent) {
      setForm(DEFAULT_FORM_STATE);
      return;
    }
    setForm({
      heroEyebrow: selectedContent.hero.eyebrow ?? '',
      heroBadge: selectedContent.hero.badge ?? '',
      heroTitle: selectedContent.hero.title ?? '',
      heroHighlight: selectedContent.hero.highlight ?? '',
      heroSubtitle: selectedContent.hero.subtitle ?? '',
      heroDescription: selectedContent.hero.description ?? '',
      heroBulletsText: (selectedContent.hero.bullets ?? []).join('\n'),
      heroChipsText: (selectedContent.hero.chips ?? []).join('\n'),
      heroPrimaryLabel: selectedContent.hero.ctas?.primaryLabel ?? '',
      heroPrimaryLink: selectedContent.hero.ctas?.primaryLink ?? '',
      heroSecondaryLabel: selectedContent.hero.ctas?.secondaryLabel ?? '',
      heroSecondaryLink: selectedContent.hero.ctas?.secondaryLink ?? '',
      heroMetrics: selectedContent.hero.metrics ? [...selectedContent.hero.metrics] : [],
      metricBubbles: selectedContent.metricBubbles ? [...selectedContent.metricBubbles] : [],
      plans: (selectedContent.plans ?? []).map(plan => ({
        ...plan,
        bulletsText: plan.bullets.join('\n'),
        tagsText: (plan.tags ?? []).join(', ')
      })),
      faqs: selectedContent.faqs ? [...selectedContent.faqs] : [],
      roiHeadline: selectedContent.roi?.headline ?? '',
      roiDescription: selectedContent.roi?.description ?? '',
      roiBaseline: selectedContent.roi?.baselineCost ?? 0,
      roiSliders: selectedContent.roi?.sliders ? [...selectedContent.roi.sliders] : []
    });
  }, [selectedPage, selectedContent]);

  const tabButtonClass = (path: string) =>
    `flex items-center gap-2 px-6 py-3 border-b-2 transition-colors ${
      location.pathname === path
        ? 'border-blue-500 text-blue-400'
        : 'border-transparent text-slate-400 hover:text-slate-300'
    }`;

  const updateHeroMetric = (index: number, field: keyof PricingHeroMetric, value: string) => {
    setForm(prev => {
      const next = [...prev.heroMetrics];
      next[index] = { ...next[index], [field]: value };
      return { ...prev, heroMetrics: next };
    });
  };

  const updateMetricBubble = (index: number, field: keyof PricingMetricBubble, value: string) => {
    setForm(prev => {
      const next = [...prev.metricBubbles];
      next[index] = { ...next[index], [field]: value };
      return { ...prev, metricBubbles: next };
    });
  };

  const updatePlan = (index: number, field: keyof EditablePlan, value: string | number | boolean) => {
    setForm(prev => {
      const next = [...prev.plans];
      next[index] = { ...next[index], [field]: value };
      return { ...prev, plans: next };
    });
  };

  const updateFaq = (index: number, field: keyof PricingFaqItem, value: string) => {
    setForm(prev => {
      const next = [...prev.faqs];
      next[index] = { ...next[index], [field]: value };
      return { ...prev, faqs: next };
    });
  };

  const updateSlider = (index: number, field: keyof PricingRoiSlider, value: string | number) => {
    setForm(prev => {
      const next = [...prev.roiSliders];
      next[index] = { ...next[index], [field]: value };
      return { ...prev, roiSliders: next };
    });
  };

  const addHeroMetric = () =>
    setForm(prev => ({
      ...prev,
      heroMetrics: [...prev.heroMetrics, { id: newId(), label: '', value: '', subtext: '' }]
    }));

  const addMetricBubble = () =>
    setForm(prev => ({
      ...prev,
      metricBubbles: [...prev.metricBubbles, { id: newId(), label: '', value: '', context: '' }]
    }));

  const addPlan = () =>
    setForm(prev => ({
      ...prev,
      plans: [
        ...prev.plans,
        {
          id: newId(),
          name: 'New Plan',
          priceLabel: 'RM 0',
          priceValue: 0,
          priceSuffix: '',
          description: '',
          bullets: [],
          bulletsText: '',
          signal: '',
          recommended: false,
          cta: '',
          tags: [],
          tagsText: '',
          bestFor: ''
        }
      ]
    }));

  const addFaq = () =>
    setForm(prev => ({
      ...prev,
      faqs: [...prev.faqs, { id: newId(), question: '', answer: '' }]
    }));

  const addSlider = () =>
    setForm(prev => ({
      ...prev,
      roiSliders: [
        ...prev.roiSliders,
        { id: newId(), label: 'Slider', min: 0, max: 100, step: 1, defaultValue: 10, format: 'number' }
      ]
    }));

  const removeByIndex = <T,>(list: T[], index: number) => list.filter((_, i) => i !== index);

  const removeHeroMetric = (index: number) =>
    setForm(prev => ({ ...prev, heroMetrics: removeByIndex(prev.heroMetrics, index) }));

  const removeMetricBubble = (index: number) =>
    setForm(prev => ({ ...prev, metricBubbles: removeByIndex(prev.metricBubbles, index) }));

  const removePlan = (index: number) =>
    setForm(prev => ({ ...prev, plans: removeByIndex(prev.plans, index) }));

  const removeFaq = (index: number) =>
    setForm(prev => ({ ...prev, faqs: removeByIndex(prev.faqs, index) }));

  const removeSlider = (index: number) =>
    setForm(prev => ({ ...prev, roiSliders: removeByIndex(prev.roiSliders, index) }));

  const handleSave = async () => {
    if (!selectedPage) return;
    setSaving(true);
    setStatusMessage(null);
    setErrorMessage(null);
    const payload: Partial<PricingPageContent> = {
      hero: {
        eyebrow: form.heroEyebrow,
        badge: form.heroBadge,
        title: form.heroTitle,
        highlight: form.heroHighlight,
        subtitle: form.heroSubtitle,
        description: form.heroDescription,
        bullets: form.heroBulletsText.split('\n').map(line => line.trim()).filter(Boolean),
        chips: form.heroChipsText.split('\n').map(line => line.trim()).filter(Boolean),
        metrics: form.heroMetrics,
        ctas: {
          primaryLabel: form.heroPrimaryLabel,
          primaryLink: form.heroPrimaryLink,
          secondaryLabel: form.heroSecondaryLabel,
          secondaryLink: form.heroSecondaryLink
        }
      },
      metricBubbles: form.metricBubbles,
      plans: form.plans.map(plan => ({
        ...plan,
        priceValue: Number(plan.priceValue) || 0,
        bullets: plan.bulletsText.split('\n').map(line => line.trim()).filter(Boolean),
        tags: plan.tagsText.split(',').map(tag => tag.trim()).filter(Boolean)
      })),
      faqs: form.faqs,
      roi: {
        headline: form.roiHeadline,
        description: form.roiDescription,
        baselineCost: Number(form.roiBaseline) || 0,
        sliders: form.roiSliders.map(slider => ({
          ...slider,
          min: Number(slider.min),
          max: Number(slider.max),
          step: Number(slider.step),
          defaultValue: Number(slider.defaultValue)
        }))
      }
    };
    try {
      await updatePricingPage(selectedPage, payload);
      setStatusMessage('Pricing page saved successfully.');
    } catch (error: any) {
      setErrorMessage(error?.message ?? 'Unable to save pricing page.');
    } finally {
      setSaving(false);
    }
  };

  const navigationTabs = useMemo(
    () => (
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
          Portfolio
        </button>
        <button onClick={() => navigate('/admin/blog')} className={tabButtonClass('/admin/blog')}>
          <Sparkles size={18} />
          Blog
        </button>
      </div>
    ),
    [location.pathname, navigate]
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-blue-400">AurexisSolution</p>
            <h1 className="text-3xl font-bold mt-1">Pricing Control Center</h1>
            <p className="text-sm text-slate-400 mt-1">Edit hero, metric bubbles, plans, FAQs, and ROI sliders for every pricing pod.</p>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-400">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-700 bg-slate-900/60 hover:bg-slate-900 transition"
            >
              Back to site
            </button>
            <button
              onClick={() => navigate('/logout', { replace: true })}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-500 shadow-lg shadow-blue-500/20"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </header>

        {navigationTabs}

        {(errorMessage || statusMessage) && (
          <div
            className={`rounded-2xl border px-4 py-3 text-sm flex items-center gap-2 ${
              errorMessage
                ? 'border-red-500/40 bg-red-500/10 text-red-200'
                : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200'
            }`}
          >
            <ShieldAlert size={16} />
            <span>{errorMessage ?? statusMessage}</span>
          </div>
        )}

        <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Select Pricing Page</p>
              <h2 className="text-2xl font-semibold">Choose a pricing pod to edit</h2>
            </div>
            <select
              value={selectedPage}
              onChange={e => setSelectedPage(e.target.value as PricingPageId)}
              className="rounded-2xl bg-slate-950 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            >
              {Object.entries(PRICING_PAGE_LABELS).map(([id, label]) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </section>

        {!selectedContent ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6 text-sm text-slate-400">
            Pricing content is still loading. Please wait a moment.
          </div>
        ) : (
          <div className="space-y-8">
            <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Hero Section</p>
                  <h2 className="text-xl font-semibold">Narrative & CTA</h2>
                </div>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/90 hover:bg-blue-600 transition disabled:opacity-60"
                >
                  <Save size={16} />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <label className="block text-xs uppercase tracking-[0.4em] text-slate-500">
                  Eyebrow
                  <input
                    className="mt-2 w-full rounded-2xl bg-slate-950 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.heroEyebrow}
                    onChange={e => setForm(prev => ({ ...prev, heroEyebrow: e.target.value }))}
                  />
                </label>
                <label className="block text-xs uppercase tracking-[0.4em] text-slate-500">
                  Badge
                  <input
                    className="mt-2 w-full rounded-2xl bg-slate-950 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.heroBadge}
                    onChange={e => setForm(prev => ({ ...prev, heroBadge: e.target.value }))}
                  />
                </label>
              </div>

              <label className="block text-xs uppercase tracking-[0.4em] text-slate-500">
                Title
                <input
                  className="mt-2 w-full rounded-2xl bg-slate-950 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.heroTitle}
                  onChange={e => setForm(prev => ({ ...prev, heroTitle: e.target.value }))}
                />
              </label>

              <div className="grid md:grid-cols-2 gap-4">
                <label className="block text-xs uppercase tracking-[0.4em] text-slate-500">
                  Highlight
                  <input
                    className="mt-2 w-full rounded-2xl bg-slate-950 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.heroHighlight}
                    onChange={e => setForm(prev => ({ ...prev, heroHighlight: e.target.value }))}
                  />
                </label>
                <label className="block text-xs uppercase tracking-[0.4em] text-slate-500">
                  Subtitle
                  <input
                    className="mt-2 w-full rounded-2xl bg-slate-950 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.heroSubtitle}
                    onChange={e => setForm(prev => ({ ...prev, heroSubtitle: e.target.value }))}
                  />
                </label>
              </div>

              <label className="block text-xs uppercase tracking-[0.4em] text-slate-500">
                Description
                <textarea
                  rows={3}
                  className="mt-2 w-full rounded-2xl bg-slate-950 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.heroDescription}
                  onChange={e => setForm(prev => ({ ...prev, heroDescription: e.target.value }))}
                />
              </label>

              <div className="grid md:grid-cols-2 gap-4">
                <label className="block text-xs uppercase tracking-[0.4em] text-slate-500">
                  Hero bullets (one per line)
                  <textarea
                    rows={4}
                    className="mt-2 w-full rounded-2xl bg-slate-950 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.heroBulletsText}
                    onChange={e => setForm(prev => ({ ...prev, heroBulletsText: e.target.value }))}
                  />
                </label>
                <label className="block text-xs uppercase tracking-[0.4em] text-slate-500">
                  Hero chips (one per line)
                  <textarea
                    rows={4}
                    className="mt-2 w-full rounded-2xl bg-slate-950 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.heroChipsText}
                    onChange={e => setForm(prev => ({ ...prev, heroChipsText: e.target.value }))}
                  />
                </label>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <label className="block text-xs uppercase tracking-[0.4em] text-slate-500">
                  Primary CTA Label
                  <input
                    className="mt-2 w-full rounded-2xl bg-slate-950 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.heroPrimaryLabel}
                    onChange={e => setForm(prev => ({ ...prev, heroPrimaryLabel: e.target.value }))}
                  />
                </label>
                <label className="block text-xs uppercase tracking-[0.4em] text-slate-500">
                  Primary CTA Link
                  <input
                    className="mt-2 w-full rounded-2xl bg-slate-950 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.heroPrimaryLink}
                    onChange={e => setForm(prev => ({ ...prev, heroPrimaryLink: e.target.value }))}
                  />
                </label>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <label className="block text-xs uppercase tracking-[0.4em] text-slate-500">
                  Secondary CTA Label
                  <input
                    className="mt-2 w-full rounded-2xl bg-slate-950 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.heroSecondaryLabel}
                    onChange={e => setForm(prev => ({ ...prev, heroSecondaryLabel: e.target.value }))}
                  />
                </label>
                <label className="block text-xs uppercase tracking-[0.4em] text-slate-500">
                  Secondary CTA Link
                  <input
                    className="mt-2 w-full rounded-2xl bg-slate-950 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.heroSecondaryLink}
                    onChange={e => setForm(prev => ({ ...prev, heroSecondaryLink: e.target.value }))}
                  />
                </label>
              </div>
            </section>

            <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Hero Metrics</p>
                  <h2 className="text-xl font-semibold">Inline stats</h2>
                </div>
                <button
                  onClick={addHeroMetric}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-700 bg-slate-900/60 hover:bg-slate-900 transition"
                >
                  <Plus size={16} />
                  Add Metric
                </button>
              </div>
              <div className="space-y-4">
                {form.heroMetrics.map((metric, index) => (
                  <div key={metric.id} className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-sm text-slate-400">
                      <span>Metric {index + 1}</span>
                      <button
                        onClick={() => removeHeroMetric(index)}
                        className="px-3 py-1 rounded-xl border border-red-500/40 text-red-400 hover:bg-red-500/10 transition text-sm"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="grid md:grid-cols-3 gap-3">
                      <input
                        className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Label"
                        value={metric.label}
                        onChange={e => updateHeroMetric(index, 'label', e.target.value)}
                      />
                      <input
                        className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Value"
                        value={metric.value}
                        onChange={e => updateHeroMetric(index, 'value', e.target.value)}
                      />
                      <input
                        className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Subtext"
                        value={metric.subtext ?? ''}
                        onChange={e => updateHeroMetric(index, 'subtext', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
                {form.heroMetrics.length === 0 && (
                  <p className="text-sm text-slate-500 border border-dashed border-slate-800 rounded-2xl p-4 text-center">
                    No hero metrics yet. Add one to highlight instant stats.
                  </p>
                )}
              </div>
            </section>

            <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Metric Bubbles</p>
                  <h2 className="text-xl font-semibold">Performance context</h2>
                </div>
                <button
                  onClick={addMetricBubble}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-700 bg-slate-900/60 hover:bg-slate-900 transition"
                >
                  <Plus size={16} />
                  Add Bubble
                </button>
              </div>
              <div className="space-y-4">
                {form.metricBubbles.map((bubble, index) => (
                  <div key={bubble.id} className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-sm text-slate-400">
                      <span>Bubble {index + 1}</span>
                      <button
                        onClick={() => removeMetricBubble(index)}
                        className="px-3 py-1 rounded-xl border border-red-500/40 text-red-400 hover:bg-red-500/10 transition text-sm"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="grid md:grid-cols-3 gap-3">
                      <input
                        className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="ID / Slug"
                        value={bubble.id}
                        onChange={e => updateMetricBubble(index, 'id', e.target.value)}
                      />
                      <input
                        className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Label"
                        value={bubble.label}
                        onChange={e => updateMetricBubble(index, 'label', e.target.value)}
                      />
                      <input
                        className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Value"
                        value={bubble.value}
                        onChange={e => updateMetricBubble(index, 'value', e.target.value)}
                      />
                    </div>
                    <textarea
                      rows={2}
                      className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Context"
                      value={bubble.context}
                      onChange={e => updateMetricBubble(index, 'context', e.target.value)}
                    />
                  </div>
                ))}
                {form.metricBubbles.length === 0 && (
                  <p className="text-sm text-slate-500 border border-dashed border-slate-800 rounded-2xl p-4 text-center">
                    No metric bubbles yet. Add narrative context for the hero stats here.
                  </p>
                )}
              </div>
            </section>

            <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Pricing Plans</p>
                  <h2 className="text-xl font-semibold">Card content</h2>
                </div>
                <button
                  onClick={addPlan}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-700 bg-slate-900/60 hover:bg-slate-900 transition"
                >
                  <Plus size={16} />
                  Add Plan
                </button>
              </div>
              <div className="space-y-4">
                {form.plans.map((plan, index) => (
                  <div key={plan.id} className="p-5 rounded-2xl bg-slate-950/40 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-sm text-slate-400">
                      <span>{plan.name || `Plan ${index + 1}`}</span>
                      <button
                        onClick={() => removePlan(index)}
                        className="px-3 py-1 rounded-xl border border-red-500/40 text-red-400 hover:bg-red-500/10 transition text-sm"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      <input
                        className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Name"
                        value={plan.name}
                        onChange={e => updatePlan(index, 'name', e.target.value)}
                      />
                      <input
                        className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Price label"
                        value={plan.priceLabel}
                        onChange={e => updatePlan(index, 'priceLabel', e.target.value)}
                      />
                    </div>
                    <div className="grid md:grid-cols-4 gap-3">
                      <input
                        type="number"
                        className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Price value"
                        value={plan.priceValue}
                        onChange={e => updatePlan(index, 'priceValue', Number(e.target.value))}
                      />
                      <input
                        className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Price suffix"
                        value={plan.priceSuffix ?? ''}
                        onChange={e => updatePlan(index, 'priceSuffix', e.target.value)}
                      />
                      <input
                        className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Signal (badge)"
                        value={plan.signal ?? ''}
                        onChange={e => updatePlan(index, 'signal', e.target.value)}
                      />
                      <label className="inline-flex items-center gap-2 text-sm text-slate-400">
                        <input
                          type="checkbox"
                          className="rounded border-slate-700 bg-slate-900 text-blue-500 focus:ring-blue-500"
                          checked={!!plan.recommended}
                          onChange={e => updatePlan(index, 'recommended', e.target.checked)}
                        />
                        Recommended
                      </label>
                    </div>
                    <textarea
                      rows={2}
                      className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Description"
                      value={plan.description}
                      onChange={e => updatePlan(index, 'description', e.target.value)}
                    />
                    <textarea
                      rows={4}
                      className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Bullets (one per line)"
                      value={plan.bulletsText}
                      onChange={e => updatePlan(index, 'bulletsText', e.target.value)}
                    />
                    <div className="grid md:grid-cols-2 gap-3">
                      <input
                        className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Tags (comma separated)"
                        value={plan.tagsText}
                        onChange={e => updatePlan(index, 'tagsText', e.target.value)}
                      />
                      <input
                        className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="CTA URL"
                        value={plan.cta}
                        onChange={e => updatePlan(index, 'cta', e.target.value)}
                      />
                    </div>
                    <input
                      className="w-full rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Best for"
                      value={plan.bestFor ?? ''}
                      onChange={e => updatePlan(index, 'bestFor', e.target.value)}
                    />
                  </div>
                ))}
                {form.plans.length === 0 && (
                  <p className="text-sm text-slate-500 border border-dashed border-slate-800 rounded-2xl p-4 text-center">
                    No plans yet. Add at least one tier to populate your pricing page.
                  </p>
                )}
              </div>
            </section>

            <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify_between">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-500">FAQs</p>
                  <h2 className="text-xl font-semibold">Address buying objections</h2>
                </div>
                <button
                  onClick={addFaq}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-700 bg-slate-900/60 hover:bg-slate-900 transition"
                >
                  <Plus size={16} />
                  Add FAQ
                </button>
              </div>
              <div className="space-y-4">
                {form.faqs.map((faq, index) => (
                  <div key={faq.id} className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-sm text-slate-400">
                      <span>FAQ {index + 1}</span>
                      <button
                        onClick={() => removeFaq(index)}
                        className="px-3 py-1 rounded-xl border border-red-500/40 text-red-400 hover:bg-red-500/10 transition text-sm"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <input
                      className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Question"
                      value={faq.question}
                      onChange={e => updateFaq(index, 'question', e.target.value)}
                    />
                    <textarea
                      rows={3}
                      className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Answer"
                      value={faq.answer}
                      onChange={e => updateFaq(index, 'answer', e.target.value)}
                    />
                  </div>
                ))}
                {form.faqs.length === 0 && (
                  <p className="text-sm text-slate-500 border border-dashed border-slate-800 rounded-2xl p-4 text-center">
                    No FAQs yet. Add common questions to boost trust.
                  </p>
                )}
              </div>
            </section>

            <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-500">ROI Calculator</p>
                  <h2 className="text-xl font-semibold">Interactive sliders</h2>
                </div>
                <button
                  onClick={addSlider}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-700 bg-slate-900/60 hover:bg-slate-900 transition"
                >
                  <Plus size={16} />
                  Add Slider
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <label className="block text-xs uppercase tracking-[0.4em] text-slate-500">
                  ROI headline
                  <input
                    className="mt-2 w-full rounded-2xl bg-slate-950 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.roiHeadline}
                    onChange={e => setForm(prev => ({ ...prev, roiHeadline: e.target.value }))}
                  />
                </label>
                <label className="block text-xs uppercase tracking-[0.4em] text-slate-500">
                  Baseline cost (RM)
                  <input
                    type="number"
                    className="mt-2 w-full rounded-2xl bg-slate-950 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.roiBaseline}
                    onChange={e => setForm(prev => ({ ...prev, roiBaseline: Number(e.target.value) }))}
                  />
                </label>
              </div>
              <label className="block text-xs uppercase tracking-[0.4em] text-slate-500">
                Description
                <textarea
                  rows={3}
                  className="mt-2 w-full rounded-2xl bg-slate-950 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.roiDescription}
                  onChange={e => setForm(prev => ({ ...prev, roiDescription: e.target.value }))}
                />
              </label>
              <div className="space-y-4">
                {form.roiSliders.map((slider, index) => (
                  <div key={slider.id} className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-sm text-slate-400">
                      <span>Slider {index + 1}</span>
                      <button
                        onClick={() => removeSlider(index)}
                        className="px-3 py-1 rounded-xl border border-red-500/40 text-red-400 hover:bg-red-500/10 transition text-sm"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      <input
                        className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Label"
                        value={slider.label}
                        onChange={e => updateSlider(index, 'label', e.target.value)}
                      />
                      <input
                        className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Format (number | percent | currency | hours)"
                        value={slider.format ?? ''}
                        onChange={e => updateSlider(index, 'format', e.target.value as PricingRoiSlider['format'])}
                      />
                    </div>
                    <div className="grid md:grid-cols-4 gap-3">
                      <input
                        type="number"
                        className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Min"
                        value={slider.min}
                        onChange={e => updateSlider(index, 'min', Number(e.target.value))}
                      />
                      <input
                        type="number"
                        className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Max"
                        value={slider.max}
                        onChange={e => updateSlider(index, 'max', Number(e.target.value))}
                      />
                      <input
                        type="number"
                        className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Step"
                        value={slider.step}
                        onChange={e => updateSlider(index, 'step', Number(e.target.value))}
                      />
                      <input
                        type="number"
                        className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Default"
                        value={slider.defaultValue}
                        onChange={e => updateSlider(index, 'defaultValue', Number(e.target.value))}
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      <input
                        className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Unit prefix"
                        value={slider.unitPrefix ?? ''}
                        onChange={e => updateSlider(index, 'unitPrefix', e.target.value)}
                      />
                      <input
                        className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Unit suffix"
                        value={slider.unitSuffix ?? ''}
                        onChange={e => updateSlider(index, 'unitSuffix', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
                {form.roiSliders.length === 0 && (
                  <p className="text-sm text-slate-500 border border-dashed border-slate-800 rounded-2xl p-4 text-center">
                    No ROI sliders yet. Add them to power the interactive calculator on the pricing page.
                  </p>
                )}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPricing;
