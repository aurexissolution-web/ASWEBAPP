import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldAlert, Save, LogOut, Home, FileText, Settings, Plus, Trash2, Coins, Grid, Sparkles } from 'lucide-react';
import { useData } from '../context/DataContext';
import type {
  ServiceDetailContent,
  ServiceHeroStat,
  ServiceChallengeCard,
  ServiceCTAServiceCard,
  ServiceCTABanner,
  ServiceFAQItem
} from '../types';

type ServiceFormState = {
  title: string;
  price: string;
  description: string;
  tagline: string;
  longDescription: string;
  featuresText: string;
  technologiesText: string;
  benefits: ServiceDetailContent['benefits'];
  process: ServiceDetailContent['process'];
  heroContent: ServiceDetailContent['heroContent'];
  challengeContent: ServiceDetailContent['challengeContent'];
  ctaContent: ServiceDetailContent['ctaContent'];
  faqItems: ServiceFAQItem[];
};

const DEFAULT_FORM_STATE: ServiceFormState = {
  title: '',
  price: '',
  description: '',
  tagline: '',
  longDescription: '',
  featuresText: '',
  technologiesText: '',
  benefits: [],
  process: [],
  heroContent: {
    badge: '',
    subheadline: '',
    headline: '',
    highlight: '',
    description: '',
    stats: []
  },
  challengeContent: {
    eyebrow: '',
    title: '',
    highlight: '',
    description: '',
    cards: []
  },
  ctaContent: {
    cards: [],
    banner: {
      eyebrow: '',
      heading: '',
      body: '',
      primaryLabel: '',
      primaryLink: '',
      secondaryLabel: '',
      secondaryLink: ''
    }
  },
  faqItems: []
};

const AdminServices: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { services, serviceDetails, updateService } = useData();

  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const [form, setForm] = useState<ServiceFormState>(DEFAULT_FORM_STATE);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedServiceId && services.length) {
      setSelectedServiceId(services[0].id);
    }
  }, [services, selectedServiceId]);

  const selectedService = useMemo<ServiceDetailContent | null>(() => {
    if (!selectedServiceId) return null;
    return serviceDetails[selectedServiceId] ?? (services.find(s => s.id === selectedServiceId) as ServiceDetailContent | undefined) ?? null;
  }, [selectedServiceId, serviceDetails, services]);

  useEffect(() => {
    if (!selectedService) {
      setForm(DEFAULT_FORM_STATE);
      return;
    }
    setForm({
      title: selectedService.title ?? '',
      price: selectedService.price ?? '',
      description: selectedService.description ?? '',
      tagline: selectedService.tagline ?? '',
      longDescription: selectedService.longDescription ?? '',
      featuresText: (selectedService.features ?? []).join('\n'),
      technologiesText: (selectedService.technologies ?? []).join('\n'),
      benefits: selectedService.benefits ? [...selectedService.benefits] : [],
      process: selectedService.process ? [...selectedService.process] : [],
      heroContent: {
        badge: selectedService.heroContent?.badge ?? '',
        subheadline: selectedService.heroContent?.subheadline ?? '',
        headline: selectedService.heroContent?.headline ?? '',
        highlight: selectedService.heroContent?.highlight ?? '',
        description: selectedService.heroContent?.description ?? '',
        stats: selectedService.heroContent?.stats ? [...selectedService.heroContent.stats] : []
      },
      challengeContent: {
        eyebrow: selectedService.challengeContent?.eyebrow ?? '',
        title: selectedService.challengeContent?.title ?? '',
        highlight: selectedService.challengeContent?.highlight ?? '',
        description: selectedService.challengeContent?.description ?? '',
        cards: selectedService.challengeContent?.cards ? [...selectedService.challengeContent.cards] : []
      },
      ctaContent: {
        eyebrow: selectedService.ctaContent?.eyebrow ?? '',
        title: selectedService.ctaContent?.title ?? '',
        subtitle: selectedService.ctaContent?.subtitle ?? '',
        cards: selectedService.ctaContent?.cards ? [...selectedService.ctaContent.cards] : [],
        banner: {
          eyebrow: selectedService.ctaContent?.banner?.eyebrow ?? '',
          heading: selectedService.ctaContent?.banner?.heading ?? '',
          body: selectedService.ctaContent?.banner?.body ?? '',
          primaryLabel: selectedService.ctaContent?.banner?.primaryLabel ?? '',
          primaryLink: selectedService.ctaContent?.banner?.primaryLink ?? '',
          secondaryLabel: selectedService.ctaContent?.banner?.secondaryLabel ?? '',
          secondaryLink: selectedService.ctaContent?.banner?.secondaryLink ?? ''
        }
      },
      faqItems: selectedService.faqItems ? [...selectedService.faqItems] : []
    });
  }, [selectedServiceId, selectedService]);

  const tabButtonClass = (path: string) =>
    `flex items-center gap-2 px-6 py-3 border-b-2 transition-colors ${
      location.pathname === path
        ? 'border-blue-500 text-blue-400'
        : 'border-transparent text-slate-400 hover:text-slate-300'
    }`;

  const handleInput = (field: keyof ServiceFormState, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleBenefitChange = (index: number, field: 'title' | 'description' | 'icon', value: string) => {
    setForm(prev => {
      const next = [...prev.benefits];
      next[index] = { ...next[index], [field]: value };
      return { ...prev, benefits: next };
    });
  };

  const handleProcessChange = (index: number, field: 'title' | 'description', value: string) => {
    setForm(prev => {
      const next = [...prev.process];
      next[index] = { ...next[index], [field]: value, step: index + 1 };
      return { ...prev, process: next };
    });
  };

  const handleHeroContentInput = (field: keyof NonNullable<ServiceFormState['heroContent']>, value: string) => {
    setForm(prev => ({
      ...prev,
      heroContent: {
        ...prev.heroContent,
        [field]: value
      }
    }));
  };

  const handleHeroStatChange = (index: number, field: keyof ServiceHeroStat, value: string) => {
    setForm(prev => {
      const stats = prev.heroContent?.stats ? [...prev.heroContent.stats] : [];
      stats[index] = { ...stats[index], [field]: value };
      return {
        ...prev,
        heroContent: {
          ...prev.heroContent,
          stats
        }
      };
    });
  };

  const addHeroStat = () => {
    setForm(prev => ({
      ...prev,
      heroContent: {
        ...prev.heroContent,
        stats: [...(prev.heroContent?.stats ?? []), { title: '', value: '', subtext: '', icon: 'Sparkles', accent: 'cyan' }]
      }
    }));
  };

  const removeHeroStat = (index: number) => {
    setForm(prev => {
      const stats = prev.heroContent?.stats ? [...prev.heroContent.stats] : [];
      stats.splice(index, 1);
      return {
        ...prev,
        heroContent: {
          ...prev.heroContent,
          stats
        }
      };
    });
  };

  const handleChallengeInput = (field: keyof NonNullable<ServiceFormState['challengeContent']>, value: string) => {
    setForm(prev => ({
      ...prev,
      challengeContent: {
        ...prev.challengeContent,
        [field]: value
      }
    }));
  };

  const handleChallengeCardChange = (index: number, field: keyof ServiceChallengeCard, value: string) => {
    setForm(prev => {
      const cards = prev.challengeContent?.cards ? [...prev.challengeContent.cards] : [];
      cards[index] = { ...cards[index], [field]: value };
      return {
        ...prev,
        challengeContent: {
          ...prev.challengeContent,
          cards
        }
      };
    });
  };

  const addChallengeCard = () => {
    setForm(prev => ({
      ...prev,
      challengeContent: {
        ...prev.challengeContent,
        cards: [...(prev.challengeContent?.cards ?? []), { title: '', body: '', stat: '', icon: 'Shield', gradient: 'from-cyan-500 to-blue-500' }]
      }
    }));
  };

  const removeChallengeCard = (index: number) => {
    setForm(prev => {
      const cards = prev.challengeContent?.cards ? [...prev.challengeContent.cards] : [];
      cards.splice(index, 1);
      return {
        ...prev,
        challengeContent: {
          ...prev.challengeContent,
          cards
        }
      };
    });
  };

  const handleCTAInput = (field: keyof NonNullable<ServiceFormState['ctaContent']>, value: string) => {
    setForm(prev => ({
      ...prev,
      ctaContent: {
        ...prev.ctaContent,
        [field]: value
      }
    }));
  };

  const handleCTACardChange = (index: number, field: keyof ServiceCTAServiceCard, value: string) => {
    setForm(prev => {
      const cards = prev.ctaContent?.cards ? [...prev.ctaContent.cards] : [];
      cards[index] = { ...cards[index], [field]: value };
      return {
        ...prev,
        ctaContent: {
          ...prev.ctaContent,
          cards
        }
      };
    });
  };

  const addCTACard = () => {
    setForm(prev => ({
      ...prev,
      ctaContent: {
        ...prev.ctaContent,
        cards: [
          ...(prev.ctaContent?.cards ?? []),
          { title: '', metric: '', description: '', href: '', accent: 'cyan', icon: 'Sparkles', buttonLabel: 'View Pricing' }
        ]
      }
    }));
  };

  const removeCTACard = (index: number) => {
    setForm(prev => {
      const cards = prev.ctaContent?.cards ? [...prev.ctaContent.cards] : [];
      cards.splice(index, 1);
      return {
        ...prev,
        ctaContent: {
          ...prev.ctaContent,
          cards
        }
      };
    });
  };

  const handleCTABannerChange = (field: keyof ServiceCTABanner, value: string) => {
    setForm(prev => ({
      ...prev,
      ctaContent: {
        ...prev.ctaContent,
        banner: {
          ...prev.ctaContent?.banner,
          [field]: value
        }
      }
    }));
  };

  const handleFaqChange = (index: number, field: keyof ServiceFAQItem, value: string) => {
    setForm(prev => {
      const faqItems = [...(prev.faqItems ?? [])];
      faqItems[index] = { ...faqItems[index], [field]: value };
      return { ...prev, faqItems };
    });
  };

  const addFaqItem = () => {
    setForm(prev => ({
      ...prev,
      faqItems: [...prev.faqItems, { question: '', answer: '' }]
    }));
  };

  const removeFaqItem = (index: number) => {
    setForm(prev => {
      const faqItems = [...prev.faqItems];
      faqItems.splice(index, 1);
      return { ...prev, faqItems };
    });
  };

  const addBenefit = () => {
    setForm(prev => ({
      ...prev,
      benefits: [...prev.benefits, { title: '', description: '', icon: 'Zap' }]
    }));
  };

  const removeBenefit = (index: number) => {
    setForm(prev => {
      const next = [...prev.benefits];
      next.splice(index, 1);
      return { ...prev, benefits: next };
    });
  };

  const addProcessStep = () => {
    setForm(prev => ({
      ...prev,
      process: [...prev.process, { step: prev.process.length + 1, title: '', description: '' }]
    }));
  };

  const removeProcessStep = (index: number) => {
    setForm(prev => {
      const next = [...prev.process];
      next.splice(index, 1);
      return {
        ...prev,
        process: next.map((step, idx) => ({ ...step, step: idx + 1 }))
      };
    });
  };

  const handleSave = async () => {
    if (!selectedServiceId) return;
    setSaving(true);
    setStatusMessage(null);
    setErrorMessage(null);
    const featureList = form.featuresText
      .split('\n')
      .map(item => item.trim())
      .filter(Boolean);
    const technologyList = form.technologiesText
      .split('\n')
      .map(item => item.trim())
      .filter(Boolean);

    try {
      await updateService(selectedServiceId, {
        title: form.title,
        price: form.price,
        description: form.description,
        tagline: form.tagline,
        longDescription: form.longDescription,
        features: featureList,
        technologies: technologyList,
        benefits: form.benefits.map(item => ({
          title: item.title,
          description: item.description,
          icon: item.icon || 'Zap'
        })),
        process: form.process.map((step, index) => ({
          step: index + 1,
          title: step.title,
          description: step.description
        })),
        heroContent: {
          badge: form.heroContent?.badge ?? '',
          subheadline: form.heroContent?.subheadline ?? '',
          headline: form.heroContent?.headline ?? '',
          highlight: form.heroContent?.highlight ?? '',
          description: form.heroContent?.description ?? '',
          stats: form.heroContent?.stats?.map(stat => ({
            title: stat.title,
            value: stat.value,
            subtext: stat.subtext,
            icon: stat.icon,
            accent: stat.accent
          })) ?? []
        },
        challengeContent: {
          eyebrow: form.challengeContent?.eyebrow ?? '',
          title: form.challengeContent?.title ?? '',
          highlight: form.challengeContent?.highlight ?? '',
          description: form.challengeContent?.description ?? '',
          cards: form.challengeContent?.cards?.map(card => ({
            title: card.title,
            body: card.body,
            stat: card.stat,
            icon: card.icon,
            gradient: card.gradient
          })) ?? []
        },
        ctaContent: {
          eyebrow: form.ctaContent?.eyebrow ?? '',
          title: form.ctaContent?.title ?? '',
          subtitle: form.ctaContent?.subtitle ?? '',
          cards: form.ctaContent?.cards?.map(card => ({
            title: card.title,
            metric: card.metric,
            description: card.description,
            href: card.href,
            accent: card.accent,
            icon: card.icon,
            buttonLabel: card.buttonLabel
          })) ?? [],
          banner: {
            eyebrow: form.ctaContent?.banner?.eyebrow ?? '',
            heading: form.ctaContent?.banner?.heading ?? '',
            body: form.ctaContent?.banner?.body ?? '',
            primaryLabel: form.ctaContent?.banner?.primaryLabel ?? '',
            primaryLink: form.ctaContent?.banner?.primaryLink ?? '',
            secondaryLabel: form.ctaContent?.banner?.secondaryLabel ?? '',
            secondaryLink: form.ctaContent?.banner?.secondaryLink ?? ''
          }
        },
        faqItems: form.faqItems?.map(item => ({
          question: item.question,
          answer: item.answer
        })) ?? []
      });
      setStatusMessage('Service updated successfully.');
    } catch (error: any) {
      setErrorMessage(error?.message ?? 'Unable to save changes.');
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
            <h1 className="text-3xl font-bold mt-1">Services Control Center</h1>
            <p className="text-sm text-slate-400 mt-1">Pick a service, adjust the copy + metrics, and push live instantly.</p>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-400">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-700 bg-slate-900/60 hover:bg-slate-900 transition"
            >
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

        {(errorMessage || statusMessage) && (
          <div
            className={`rounded-2xl border px-4 py-3 text-sm flex items-center gap-2 ${
              errorMessage ? 'border-red-500/40 bg-red-500/10 text-red-200' : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200'
            }`}
          >
            <ShieldAlert size={16} />
            <span>{errorMessage ?? statusMessage}</span>
          </div>
        )}

        <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Select Service</p>
              <h2 className="text-2xl font-semibold">Choose a service pod to edit</h2>
            </div>
            <select
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(e.target.value)}
              className="rounded-2xl bg-slate-950 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            >
              {services.map(service => (
                <option key={service.id} value={service.id}>
                  {service.title}
                </option>
              ))}
            </select>
          </div>

          {!selectedService && (
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6 text-sm text-slate-400">
              No service selected or service content is still loading. Choose a service above to start editing.
            </div>
          )}
        </section>

        {selectedService && (
          <div className="space-y-8">
            <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Core Messaging</p>
                  <h2 className="text-xl font-semibold">Identity & Pricing</h2>
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
                <label className="block">
                  <span className="text-xs uppercase tracking-[0.4em] text-slate-500">Service Title</span>
                  <input
                    className="mt-2 w-full rounded-2xl bg-slate-950 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.title}
                    onChange={(e) => handleInput('title', e.target.value)}
                  />
                </label>
                <label className="block">
                  <span className="text-xs uppercase tracking-[0.4em] text-slate-500">Price Label</span>
                  <input
                    className="mt-2 w-full rounded-2xl bg-slate-950 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.price}
                    onChange={(e) => handleInput('price', e.target.value)}
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-xs uppercase tracking-[0.4em] text-slate-500">Short Description</span>
                <textarea
                  rows={2}
                  className="mt-2 w-full rounded-2xl bg-slate-950 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  value={form.description}
                  onChange={(e) => handleInput('description', e.target.value)}
                />
              </label>

              <div className="grid md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-xs uppercase tracking-[0.4em] text-slate-500">Hero Tagline</span>
                  <input
                    className="mt-2 w-full rounded-2xl bg-slate-950 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.tagline}
                    onChange={(e) => handleInput('tagline', e.target.value)}
                  />
                </label>
                <label className="block">
                  <span className="text-xs uppercase tracking-[0.4em] text-slate-500">Detailed Description</span>
                  <textarea
                    rows={3}
                    className="mt-2 w-full rounded-2xl bg-slate-950 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.longDescription}
                    onChange={(e) => handleInput('longDescription', e.target.value)}
                  />
                </label>
              </div>
            </section>

            {/* HERO CONTENT */}
            <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Hero Content</p>
                  <h2 className="text-xl font-semibold">Headline & Stats</h2>
                </div>
                <button
                  onClick={addHeroStat}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-700 bg-slate-900/60 hover:bg-slate-900 transition"
                >
                  <Plus size={16} />
                  Add Stat
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-xs uppercase tracking-[0.4em] text-slate-500">Badge</span>
                  <input
                    className="mt-2 w-full rounded-2xl bg-slate-950 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.heroContent?.badge ?? ''}
                    onChange={(e) => handleHeroContentInput('badge', e.target.value)}
                  />
                </label>
                <label className="block">
                  <span className="text-xs uppercase tracking-[0.4em] text-slate-500">Highlight</span>
                  <input
                    className="mt-2 w-full rounded-2xl bg-slate-950 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.heroContent?.highlight ?? ''}
                    onChange={(e) => handleHeroContentInput('highlight', e.target.value)}
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-xs uppercase tracking-[0.4em] text-slate-500">Headline</span>
                <input
                  className="mt-2 w-full rounded-2xl bg-slate-950 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.heroContent?.headline ?? ''}
                  onChange={(e) => handleHeroContentInput('headline', e.target.value)}
                />
              </label>

              <label className="block">
                <span className="text-xs uppercase tracking-[0.4em] text-slate-500">Description</span>
                <textarea
                  rows={3}
                  className="mt-2 w-full rounded-2xl bg-slate-950 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.heroContent?.description ?? ''}
                  onChange={(e) => handleHeroContentInput('description', e.target.value)}
                />
              </label>

              <div className="space-y-4">
                {(form.heroContent?.stats ?? []).map((stat, index) => (
                  <div key={index} className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-sm text-slate-400">
                      <span>Stat {index + 1}</span>
                      <button
                        onClick={() => removeHeroStat(index)}
                        className="px-3 py-1 rounded-xl border border-red-500/40 text-red-400 hover:bg-red-500/10 transition text-sm"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="grid md:grid-cols-3 gap-3">
                      <input
                        className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Title"
                        value={stat.title}
                        onChange={(e) => handleHeroStatChange(index, 'title', e.target.value)}
                      />
                      <input
                        className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Value"
                        value={stat.value}
                        onChange={(e) => handleHeroStatChange(index, 'value', e.target.value)}
                      />
                      <input
                        className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Subtext"
                        value={stat.subtext}
                        onChange={(e) => handleHeroStatChange(index, 'subtext', e.target.value)}
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      <input
                        className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Accent (cyan | emerald | purple...)"
                        value={stat.accent ?? ''}
                        onChange={(e) => handleHeroStatChange(index, 'accent', e.target.value as any)}
                      />
                      <input
                        className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Icon (e.g., Sparkles)"
                        value={stat.icon ?? ''}
                        onChange={(e) => handleHeroStatChange(index, 'icon', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
                {(form.heroContent?.stats ?? []).length === 0 && (
                  <p className="text-sm text-slate-500 border border-dashed border-slate-800 rounded-2xl p-4 text-center">
                    No hero stats yet. Add one to highlight core metrics.
                  </p>
                )}
              </div>
            </section>

            <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Feature Matrix</p>
                  <h2 className="text-xl font-semibold">Features & Tech Stack</h2>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-xs uppercase tracking-[0.4em] text-slate-500">Key Features (one per line)</span>
                  <textarea
                    rows={6}
                    className="mt-2 w-full rounded-2xl bg-slate-950 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.featuresText}
                    onChange={(e) => handleInput('featuresText', e.target.value)}
                  />
                </label>
                <label className="block">
                  <span className="text-xs uppercase tracking-[0.4em] text-slate-500">Technologies (one per line)</span>
                  <textarea
                    rows={6}
                    className="mt-2 w-full rounded-2xl bg-slate-950 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.technologiesText}
                    onChange={(e) => handleInput('technologiesText', e.target.value)}
                  />
                </label>
              </div>
            </section>

            {/* CHALLENGE CARDS */}
            <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Challenges</p>
                  <h2 className="text-xl font-semibold">Problem Statements</h2>
                </div>
                <button
                  onClick={addChallengeCard}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-700 bg-slate-900/60 hover:bg-slate-900 transition"
                >
                  <Plus size={16} />
                  Add Card
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-xs uppercase tracking-[0.4em] text-slate-500">Eyebrow</span>
                  <input
                    className="mt-2 w-full rounded-2xl bg-slate-950 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.challengeContent?.eyebrow ?? ''}
                    onChange={(e) => handleChallengeInput('eyebrow', e.target.value)}
                  />
                </label>
                <label className="block">
                  <span className="text-xs uppercase tracking-[0.4em] text-slate-500">Title</span>
                  <input
                    className="mt-2 w-full rounded-2xl bg-slate-950 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.challengeContent?.title ?? ''}
                    onChange={(e) => handleChallengeInput('title', e.target.value)}
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-xs uppercase tracking-[0.4em] text-slate-500">Description</span>
                <textarea
                  rows={3}
                  className="mt-2 w-full rounded-2xl bg-slate-950 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.challengeContent?.description ?? ''}
                  onChange={(e) => handleChallengeInput('description', e.target.value)}
                />
              </label>

              <div className="space-y-4">
                {(form.challengeContent?.cards ?? []).map((card, index) => (
                  <div key={index} className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-sm text-slate-400">
                      <span>Card {index + 1}</span>
                      <button
                        onClick={() => removeChallengeCard(index)}
                        className="px-3 py-1 rounded-xl border border-red-500/40 text-red-400 hover:bg-red-500/10 transition text-sm"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      <input
                        className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Title"
                        value={card.title}
                        onChange={(e) => handleChallengeCardChange(index, 'title', e.target.value)}
                      />
                      <input
                        className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Stat"
                        value={card.stat}
                        onChange={(e) => handleChallengeCardChange(index, 'stat', e.target.value)}
                      />
                    </div>
                    <textarea
                      rows={2}
                      className="w-full rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      placeholder="Body"
                      value={card.body}
                      onChange={(e) => handleChallengeCardChange(index, 'body', e.target.value)}
                    />
                    <div className="grid md:grid-cols-2 gap-3">
                      <input
                        className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Icon (e.g., Shield)"
                        value={card.icon ?? ''}
                        onChange={(e) => handleChallengeCardChange(index, 'icon', e.target.value)}
                      />
                      <input
                        className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Gradient (from-cyan-500 to-blue-500)"
                        value={card.gradient ?? ''}
                        onChange={(e) => handleChallengeCardChange(index, 'gradient', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
                {(form.challengeContent?.cards ?? []).length === 0 && (
                  <p className="text-sm text-slate-500 border border-dashed border-slate-800 rounded-2xl p-4 text-center">
                    Add challenge cards to match the public service page.
                  </p>
                )}
              </div>
            </section>

            <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Value Props</p>
                  <h2 className="text-xl font-semibold">Benefits</h2>
                </div>
                <button
                  onClick={addBenefit}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-700 bg-slate-900/60 hover:bg-slate-900 transition"
                >
                  <Plus size={16} />
                  Add Benefit
                </button>
              </div>
              <div className="space-y-4">
                {form.benefits.map((benefit, index) => (
                  <div key={index} className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">Benefit {index + 1}</span>
                      <button
                        onClick={() => removeBenefit(index)}
                        className="px-3 py-1 rounded-xl border border-red-500/40 text-red-400 hover:bg-red-500/10 transition text-sm"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="grid md:grid-cols-3 gap-3">
                      <input
                        className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Title"
                        value={benefit.title}
                        onChange={(e) => handleBenefitChange(index, 'title', e.target.value)}
                      />
                      <input
                        className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Icon (Lucide name)"
                        value={benefit.icon}
                        onChange={(e) => handleBenefitChange(index, 'icon', e.target.value)}
                      />
                      <textarea
                        rows={2}
                        className="md:col-span-3 rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        placeholder="Description"
                        value={benefit.description}
                        onChange={(e) => handleBenefitChange(index, 'description', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
                {form.benefits.length === 0 && (
                  <p className="text-sm text-slate-500 border border-dashed border-slate-800 rounded-2xl p-4 text-center">
                    No benefits yet. Add at least one to populate the service cards.
                  </p>
                )}
              </div>
            </section>

            {/* CTA SECTION */}
            <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-500">CTA Cards</p>
                  <h2 className="text-xl font-semibold">Pricing Pods & Contact</h2>
                </div>
                <button
                  onClick={addCTACard}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-700 bg-slate-900/60 hover:bg-slate-900 transition"
                >
                  <Plus size={16} />
                  Add CTA Card
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <label className="block md:col-span-1">
                  <span className="text-xs uppercase tracking-[0.4em] text-slate-500">Section Eyebrow</span>
                  <input
                    className="mt-2 w-full rounded-2xl bg-slate-950 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.ctaContent?.eyebrow ?? ''}
                    onChange={(e) => handleCTAInput('eyebrow', e.target.value)}
                  />
                </label>
                <label className="block md:col-span-1">
                  <span className="text-xs uppercase tracking-[0.4em] text-slate-500">Title</span>
                  <input
                    className="mt-2 w-full rounded-2xl bg-slate-950 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.ctaContent?.title ?? ''}
                    onChange={(e) => handleCTAInput('title', e.target.value)}
                  />
                </label>
                <label className="block md:col-span-1">
                  <span className="text-xs uppercase tracking-[0.4em] text-slate-500">Subtitle</span>
                  <input
                    className="mt-2 w-full rounded-2xl bg-slate-950 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.ctaContent?.subtitle ?? ''}
                    onChange={(e) => handleCTAInput('subtitle', e.target.value)}
                  />
                </label>
              </div>

              <div className="space-y-4">
                {(form.ctaContent?.cards ?? []).map((card, index) => (
                  <div key={index} className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-sm text-slate-400">
                      <span>CTA Card {index + 1}</span>
                      <button
                        onClick={() => removeCTACard(index)}
                        className="px-3 py-1 rounded-xl border border-red-500/40 text-red-400 hover:bg-red-500/10 transition text-sm"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      <input
                        className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Title"
                        value={card.title}
                        onChange={(e) => handleCTACardChange(index, 'title', e.target.value)}
                      />
                      <input
                        className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Metric"
                        value={card.metric}
                        onChange={(e) => handleCTACardChange(index, 'metric', e.target.value)}
                      />
                    </div>
                    <textarea
                      rows={2}
                      className="w-full rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      placeholder="Description"
                      value={card.description}
                      onChange={(e) => handleCTACardChange(index, 'description', e.target.value)}
                    />
                    <div className="grid md:grid-cols-3 gap-3">
                      <input
                        className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Link"
                        value={card.href}
                        onChange={(e) => handleCTACardChange(index, 'href', e.target.value)}
                      />
                      <input
                        className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Accent (cyan/purple/emerald)"
                        value={card.accent ?? ''}
                        onChange={(e) => handleCTACardChange(index, 'accent', e.target.value as any)}
                      />
                      <input
                        className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Icon (e.g., MessageCircle)"
                        value={card.icon ?? ''}
                        onChange={(e) => handleCTACardChange(index, 'icon', e.target.value)}
                      />
                    </div>
                    <input
                      className="w-full rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Button Label"
                      value={card.buttonLabel ?? 'View Pricing'}
                      onChange={(e) => handleCTACardChange(index, 'buttonLabel', e.target.value)}
                    />
                  </div>
                ))}
                {(form.ctaContent?.cards ?? []).length === 0 && (
                  <p className="text-sm text-slate-500 border border-dashed border-slate-800 rounded-2xl p-4 text-center">
                    Add CTA cards to mirror the service pricing pods.
                  </p>
                )}
              </div>

              <div className="border border-slate-800 rounded-2xl p-4 space-y-4">
                <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Banner</p>
                <div className="grid md:grid-cols-2 gap-3">
                  <input
                    className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Eyebrow"
                    value={form.ctaContent?.banner?.eyebrow ?? ''}
                    onChange={(e) => handleCTABannerChange('eyebrow', e.target.value)}
                  />
                  <input
                    className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Heading"
                    value={form.ctaContent?.banner?.heading ?? ''}
                    onChange={(e) => handleCTABannerChange('heading', e.target.value)}
                  />
                </div>
                <textarea
                  rows={2}
                  className="w-full rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Body"
                  value={form.ctaContent?.banner?.body ?? ''}
                  onChange={(e) => handleCTABannerChange('body', e.target.value)}
                />
                <div className="grid md:grid-cols-2 gap-3">
                  <input
                    className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Primary Label"
                    value={form.ctaContent?.banner?.primaryLabel ?? ''}
                    onChange={(e) => handleCTABannerChange('primaryLabel', e.target.value)}
                  />
                  <input
                    className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Primary Link"
                    value={form.ctaContent?.banner?.primaryLink ?? ''}
                    onChange={(e) => handleCTABannerChange('primaryLink', e.target.value)}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  <input
                    className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Secondary Label"
                    value={form.ctaContent?.banner?.secondaryLabel ?? ''}
                    onChange={(e) => handleCTABannerChange('secondaryLabel', e.target.value)}
                  />
                  <input
                    className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Secondary Link"
                    value={form.ctaContent?.banner?.secondaryLink ?? ''}
                    onChange={(e) => handleCTABannerChange('secondaryLink', e.target.value)}
                  />
                </div>
              </div>
            </section>

            <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Delivery Blueprint</p>
                  <h2 className="text-xl font-semibold">Process Steps</h2>
                </div>
                <button
                  onClick={addProcessStep}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-700 bg-slate-900/60 hover:bg-slate-900 transition"
                >
                  <Plus size={16} />
                  Add Step
                </button>
              </div>
              <div className="space-y-4">
                {form.process.map((step, index) => (
                  <div key={index} className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">Step {index + 1}</span>
                      <button
                        onClick={() => removeProcessStep(index)}
                        className="px-3 py-1 rounded-xl border border-red-500/40 text-red-400 hover:bg-red-500/10 transition text-sm"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <input
                      className="w-full rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Title"
                      value={step.title}
                      onChange={(e) => handleProcessChange(index, 'title', e.target.value)}
                    />
                    <textarea
                      rows={2}
                      className="w-full rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      placeholder="Description"
                      value={step.description}
                      onChange={(e) => handleProcessChange(index, 'description', e.target.value)}
                    />
                  </div>
                ))}
                {form.process.length === 0 && (
                  <p className="text-sm text-slate-500 border border-dashed border-slate-800 rounded-2xl p-4 text-center">
                    Add at least one process step to outline how the service is delivered.
                  </p>
                )}
              </div>
            </section>

            {/* FAQ SECTION */}
            <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-500">FAQs</p>
                  <h2 className="text-xl font-semibold">Questions & Answers</h2>
                </div>
                <button
                  onClick={addFaqItem}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-700 bg-slate-900/60 hover:bg-slate-900 transition"
                >
                  <Plus size={16} />
                  Add FAQ
                </button>
              </div>
              <div className="space-y-4">
                {form.faqItems.map((faq, index) => (
                  <div key={index} className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-sm text-slate-400">
                      <span>FAQ {index + 1}</span>
                      <button
                        onClick={() => removeFaqItem(index)}
                        className="px-3 py-1 rounded-xl border border-red-500/40 text-red-400 hover:bg-red-500/10 transition text-sm"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <input
                      className="w-full rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Question"
                      value={faq.question}
                      onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
                    />
                    <textarea
                      rows={2}
                      className="w-full rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      placeholder="Answer"
                      value={faq.answer}
                      onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
                    />
                  </div>
                ))}
                {form.faqItems.length === 0 && (
                  <p className="text-sm text-slate-500 border border-dashed border-slate-800 rounded-2xl p-4 text-center">
                    Add FAQs to match what appears on the service page.
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

export default AdminServices;
