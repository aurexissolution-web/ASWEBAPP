import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ImageIcon, UploadCloud, Save, RefreshCcw, Link as LinkIcon, ShieldAlert, LogOut, Home, FileText, Settings, Grid, Sparkles, Plus, Trash2 } from 'lucide-react';
import { useData } from '../context/DataContext';
import type {
  HomepageSettings,
  SocialLinks,
  HomepageContent,
  HomepageProblem,
  ServiceItem,
  PricingTier
} from '../types';

const SOCIAL_FIELDS: { key: keyof SocialLinks; label: string; placeholder: string }[] = [
  { key: 'linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/company/aurexissolution' },
  { key: 'facebook', label: 'Facebook', placeholder: 'https://facebook.com/aurexissolution' },
  { key: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/aurexissolution' },
  { key: 'whatsapp', label: 'WhatsApp', placeholder: 'https://wa.me/...' },
  { key: 'twitter', label: 'Twitter / X', placeholder: 'https://twitter.com/aurexissolution' },
  { key: 'youtube', label: 'YouTube', placeholder: 'https://youtube.com/@aurexissolution' }
];

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    services,
    pricing,
    homepageSettings,
    socialLinks,
    homepageContent,
    updateHomepageSettings,
    updateHomepageContent,
    updateSocialLinks,
    updateService,
    updatePricing
  } = useData();

  const [heroForm, setHeroForm] = useState<HomepageSettings>(homepageSettings);
  const [socialForm, setSocialForm] = useState<SocialLinks>(socialLinks);
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const [selectedPricingId, setSelectedPricingId] = useState<string>('');
  const [serviceQuickForm, setServiceQuickForm] = useState<ServiceItem | null>(null);
  const [pricingQuickForm, setPricingQuickForm] = useState<PricingTier | null>(null);
  const [heroSaving, setHeroSaving] = useState(false);
  const [socialSaving, setSocialSaving] = useState(false);
  const [serviceSaving, setServiceSaving] = useState(false);
  const [pricingSaving, setPricingSaving] = useState(false);
  const [logoUploading, setLogoUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [contentForm, setContentForm] = useState<HomepageContent>(homepageContent);
  const [contentSaving, setContentSaving] = useState(false);

  const cloudinaryConfig = useMemo(() => ({
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    unsignedPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
  }), []);

  useEffect(() => setHeroForm(homepageSettings), [homepageSettings]);
  useEffect(() => setSocialForm(socialLinks), [socialLinks]);
  useEffect(() => setContentForm(homepageContent), [homepageContent]);
  useEffect(() => {
    if (!selectedServiceId && services.length) {
      setSelectedServiceId(services[0].id);
    }
  }, [services, selectedServiceId]);

  useEffect(() => {
    if (!selectedPricingId && pricing.length) {
      setSelectedPricingId(pricing[0].id);
    }
  }, [pricing, selectedPricingId]);

  useEffect(() => {
    const service = services.find((s) => s.id === selectedServiceId) ?? null;
    if (service) {
      setServiceQuickForm({
        ...service,
        features: service.features ?? []
      });
    }
  }, [services, selectedServiceId]);

  useEffect(() => {
    const tier = pricing.find((p) => p.id === selectedPricingId) ?? null;
    if (tier) {
      setPricingQuickForm({
        ...tier,
        features: tier.features ?? []
      });
    }
  }, [pricing, selectedPricingId]);

  const handleHeroInput = (field: keyof HomepageSettings, value: string) => {
    setHeroForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSocialInput = (field: keyof SocialLinks, value: string) => {
    setSocialForm(prev => ({ ...prev, [field]: value }));
  };

  const updateServiceForm = (field: keyof ServiceItem, value: string) => {
    setServiceQuickForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const updateServiceFeatures = (value: string) => {
    setServiceQuickForm((prev) =>
      prev ? { ...prev, features: value.split('\n').map((line) => line.trim()).filter(Boolean) } : prev
    );
  };

  const updatePricingForm = (field: keyof PricingTier, value: string | boolean) => {
    setPricingQuickForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const updatePricingFeatures = (value: string) => {
    setPricingQuickForm((prev) =>
      prev ? { ...prev, features: value.split('\n').map((line) => line.trim()).filter(Boolean) } : prev
    );
  };

  const handleContentInput = (field: keyof HomepageContent, value: string) => {
    setContentForm(prev => ({ ...prev, [field]: value }));
  };

  const handleProblemChange = (index: number, field: keyof HomepageProblem, value: string | string[]) => {
    setContentForm(prev => {
      const nextProblems = [...(prev.problems ?? [])];
      const target = nextProblems[index] ?? { id: crypto.randomUUID(), title: '', description: '', impacts: [], category: '' };
      nextProblems[index] = { ...target, [field]: value } as HomepageProblem;
      return { ...prev, problems: nextProblems };
    });
  };

  const handleProblemImpactChange = (index: number, value: string) => {
    const impacts = value.split('\n').map(line => line.trim()).filter(Boolean);
    handleProblemChange(index, 'impacts', impacts);
  };

  const addProblem = () => {
    setContentForm(prev => ({
      ...prev,
      problems: [
        ...(prev.problems ?? []),
        { id: crypto.randomUUID(), title: '', description: '', impacts: [], category: '' }
      ]
    }));
  };

  const removeProblem = (index: number) => {
    setContentForm(prev => {
      const nextProblems = [...(prev.problems ?? [])];
      nextProblems.splice(index, 1);
      return { ...prev, problems: nextProblems };
    });
  };

  const handleHeroSave = async () => {
    setHeroSaving(true);
    setStatusMessage(null);
    try {
      await updateHomepageSettings(heroForm);
      setStatusMessage('Hero content saved successfully.');
    } catch (error) {
      console.warn(error);
      setErrorMessage('Unable to save hero content. Please try again.');
    } finally {
      setHeroSaving(false);
    }
  };

  const handleServiceQuickSave = async () => {
    if (!serviceQuickForm) return;
    setServiceSaving(true);
    setStatusMessage(null);
    try {
      await updateService(serviceQuickForm.id, {
        title: serviceQuickForm.title,
        description: serviceQuickForm.description,
        price: serviceQuickForm.price,
        features: serviceQuickForm.features
      } as Partial<ServiceItem>);
      setStatusMessage('Service card updated.');
    } catch (error) {
      console.warn(error);
      setErrorMessage('Unable to save service card.');
    } finally {
      setServiceSaving(false);
    }
  };

  const handlePricingQuickSave = async () => {
    if (!pricingQuickForm) return;
    setPricingSaving(true);
    setStatusMessage(null);
    const payload: Partial<PricingTier> = {
      name: pricingQuickForm.name,
      price: pricingQuickForm.price,
      note: pricingQuickForm.note,
      features: pricingQuickForm.features,
      recommended: Boolean(pricingQuickForm.recommended)
    };
    try {
      await updatePricing(pricingQuickForm.id, payload);
      setStatusMessage('Pricing card updated.');
    } catch (error) {
      console.warn(error);
      setErrorMessage('Unable to save pricing card.');
    } finally {
      setPricingSaving(false);
    }
  };

  const handleContentSave = async () => {
    setContentSaving(true);
    setStatusMessage(null);
    try {
      await updateHomepageContent(contentForm);
      setStatusMessage('Homepage problem & CTA content saved.');
    } catch (error) {
      console.warn(error);
      setErrorMessage('Unable to save homepage problem/CTA content. Please try again.');
    } finally {
      setContentSaving(false);
    }
  };

  const handleSocialSave = async () => {
    setSocialSaving(true);
    setStatusMessage(null);
    try {
      await updateSocialLinks(socialForm);
      setStatusMessage('Social links updated.');
    } catch (error) {
      console.warn(error);
      setErrorMessage('Unable to save social links. Please try again.');
    } finally {
      setSocialSaving(false);
    }
  };

  const handleLogoUpload = async (file: File) => {
    if (!cloudinaryConfig.cloudName || !cloudinaryConfig.unsignedPreset) {
      setErrorMessage('Cloudinary environment variables are missing. Please provide VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET.');
      return;
    }
    setLogoUploading(true);
    setErrorMessage(null);
    setStatusMessage(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', cloudinaryConfig.unsignedPreset);
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (data.secure_url) {
        await updateHomepageSettings({ logoUrl: data.secure_url });
        setStatusMessage('Logo uploaded successfully.');
      } else {
        throw new Error(data.error?.message ?? 'Upload failed');
      }
    } catch (error: any) {
      console.warn(error);
      setErrorMessage(error?.message ?? 'Unable to upload logo.');
    } finally {
      setLogoUploading(false);
    }
  };

  const handleLogoFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleLogoUpload(file);
      event.target.value = '';
    }
  };

  const handleLogoReset = async () => {
    setStatusMessage(null);
    try {
      await updateHomepageSettings({ logoUrl: '' });
      setStatusMessage('Logo cleared.');
    } catch (error) {
      console.warn(error);
      setErrorMessage('Unable to clear logo.');
    }
  };

  const handleLogout = () => {
    navigate('/logout', { replace: true });
  };

  const currentPath = location.pathname;
  const tabButtonClass = (path: string) =>
    `flex items-center gap-2 px-6 py-3 border-b-2 transition-colors ${
      currentPath === path
        ? 'border-blue-500 text-blue-400'
        : 'border-transparent text-slate-400 hover:text-slate-300'
    }`;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-blue-400">AurexisSolution</p>
            <h1 className="text-3xl font-bold mt-1">Aurexis Content Console</h1>
            <p className="text-sm text-slate-400 mt-1">Edit hero content, branding, and social media in one place.</p>
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

        {/* Navigation Tabs */}
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
            <Settings size={18} />
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
          <div className={`rounded-2xl border px-4 py-3 text-sm flex items-center gap-2 ${errorMessage ? 'border-red-500/40 bg-red-500/10 text-red-200' : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200'}`}>
            <ShieldAlert size={16} />
            <span>{errorMessage ?? statusMessage}</span>
          </div>
        )}

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Page Content</p>
                <h2 className="text-xl font-semibold">Hero & About</h2>
              </div>
              <button
                onClick={handleHeroSave}
                disabled={heroSaving}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/90 hover:bg-blue-600 transition disabled:opacity-60"
              >
                <Save size={16} />
                {heroSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>

            <div className="space-y-4">
              <label className="block text-xs uppercase tracking-[0.4em] text-slate-500">Hero Badge</label>
              <input
                className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={heroForm.heroBadge}
                onChange={(e) => handleHeroInput('heroBadge', e.target.value)}
              />

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-[0.4em] text-slate-500">Hero Title</label>
                  <input
                    className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={heroForm.heroTitle}
                    onChange={(e) => handleHeroInput('heroTitle', e.target.value)}
                  />
                </div>
                <div>
                    <label className="block text-xs uppercase tracking-[0.4em] text-slate-500">Hero Highlight</label>
                    <input
                      className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={heroForm.heroHighlight}
                      onChange={(e) => handleHeroInput('heroHighlight', e.target.value)}
                    />
                </div>
              </div>

              <label className="block text-xs uppercase tracking-[0.4em] text-slate-500">Hero Subtitle</label>
              <input
                className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={heroForm.heroSubtitle}
                onChange={(e) => handleHeroInput('heroSubtitle', e.target.value)}
              />

              <label className="block text-xs uppercase tracking-[0.4em] text-slate-500">Hero Description</label>
              <textarea
                rows={3}
                className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                value={heroForm.heroDescription}
                onChange={(e) => handleHeroInput('heroDescription', e.target.value)}
              />

              <label className="block text-xs uppercase tracking-[0.4em] text-slate-500">About Title</label>
              <input
                className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={heroForm.aboutTitle}
                onChange={(e) => handleHeroInput('aboutTitle', e.target.value)}
              />

              <label className="block text-xs uppercase tracking-[0.4em] text-slate-500">About Text</label>
              <textarea
                rows={3}
                className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                value={heroForm.aboutText}
                onChange={(e) => handleHeroInput('aboutText', e.target.value)}
              />
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Branding</p>
                <h2 className="text-xl font-semibold">Upload Logo</h2>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-6 flex flex-col items-center justify-center text-center gap-4 min-h-[220px]">
              {homepageSettings.logoUrl ? (
                <img src={homepageSettings.logoUrl} alt="Current logo" className="max-h-28 object-contain" />
              ) : (
                <>
                  <ImageIcon className="w-12 h-12 text-slate-600" />
                  <p className="text-slate-500 text-sm">No logo uploaded</p>
                </>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <label className="inline-flex items-center gap-2 cursor-pointer rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 hover:border-blue-500/60 transition">
                <UploadCloud size={18} />
                <span>{logoUploading ? 'Uploading...' : 'Choose File'}</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoFileChange}
                  disabled={logoUploading}
                />
              </label>
              <button
                onClick={handleLogoReset}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl border border-slate-800 text-slate-400 hover:border-red-500/40 hover:text-red-200 transition"
              >
                <RefreshCcw size={16} />
                Remove Logo
              </button>
              <p className="text-xs text-slate-500">
                Uploads use Cloudinary (unsigned preset). Supported formats: PNG, JPG, SVG. Recommended size 512×512+.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Social Presence</p>
              <h2 className="text-xl font-semibold">Social Media Links</h2>
            </div>
            <button
              onClick={handleSocialSave}
              disabled={socialSaving}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/90 hover:bg-blue-600 transition disabled:opacity-60"
            >
              <Save size={16} />
              {socialSaving ? 'Saving...' : 'Save Links'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SOCIAL_FIELDS.map(field => (
              <label key={field.key} className="block">
                <span className="text-xs uppercase tracking-[0.4em] text-slate-500 flex items-center gap-1">
                  <LinkIcon size={12} /> {field.label}
                </span>
                <input
                  className="mt-1 w-full rounded-2xl bg-slate-900 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={socialForm[field.key] ?? ''}
                  onChange={(e) => handleSocialInput(field.key, e.target.value)}
                  placeholder={field.placeholder}
                />
              </label>
            ))}
          </div>
        </section>

        <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Homepage Services</p>
              <h2 className="text-xl font-semibold">Quick Service Card Edit</h2>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}
                className="rounded-2xl bg-slate-950/60 border border-slate-800 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.title}
                  </option>
                ))}
              </select>
              <button
                onClick={handleServiceQuickSave}
                disabled={serviceSaving || !serviceQuickForm}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/90 hover:bg-blue-600 transition disabled:opacity-60"
              >
                <Save size={16} />
                {serviceSaving ? 'Saving...' : 'Save Service'}
              </button>
            </div>
          </div>

          {serviceQuickForm ? (
            <div className="grid md:grid-cols-3 gap-6">
              <label className="block space-y-2 md:col-span-1">
                <span className="text-xs uppercase tracking-[0.4em] text-slate-500">Title</span>
                <input
                  className="w-full rounded-2xl bg-slate-950/60 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={serviceQuickForm.title}
                  onChange={(e) => updateServiceForm('title', e.target.value)}
                />
              </label>
              <label className="block space-y-2 md:col-span-1">
                <span className="text-xs uppercase tracking-[0.4em] text-slate-500">Price Label</span>
                <input
                  className="w-full rounded-2xl bg-slate-950/60 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={serviceQuickForm.price}
                  onChange={(e) => updateServiceForm('price', e.target.value)}
                />
              </label>
              <label className="block space-y-2 md:col-span-1">
                <span className="text-xs uppercase tracking-[0.4em] text-slate-500">Icon Name</span>
                <input
                  className="w-full rounded-2xl bg-slate-950/60 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={serviceQuickForm.icon}
                  onChange={(e) => updateServiceForm('icon', e.target.value)}
                />
              </label>
              <label className="block space-y-2 md:col-span-3">
                <span className="text-xs uppercase tracking-[0.4em] text-slate-500">Description</span>
                <textarea
                  rows={3}
                  className="w-full rounded-2xl bg-slate-950/60 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  value={serviceQuickForm.description}
                  onChange={(e) => updateServiceForm('description', e.target.value)}
                />
              </label>
              <label className="block space-y-2 md:col-span-3">
                <span className="text-xs uppercase tracking-[0.4em] text-slate-500">Features (one per line)</span>
                <textarea
                  rows={3}
                  className="w-full rounded-2xl bg-slate-950/60 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={(serviceQuickForm.features ?? []).join('\n')}
                  onChange={(e) => updateServiceFeatures(e.target.value)}
                />
              </label>
            </div>
          ) : (
            <p className="text-slate-400 text-sm">No service selected.</p>
          )}
        </section>

        <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Homepage Pricing</p>
              <h2 className="text-xl font-semibold">Quick Pricing Card Edit</h2>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={selectedPricingId}
                onChange={(e) => setSelectedPricingId(e.target.value)}
                className="rounded-2xl bg-slate-950/60 border border-slate-800 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {pricing.map((tier) => (
                  <option key={tier.id} value={tier.id}>
                    {tier.name}
                  </option>
                ))}
              </select>
              <button
                onClick={handlePricingQuickSave}
                disabled={pricingSaving || !pricingQuickForm}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/90 hover:bg-blue-600 transition disabled:opacity-60"
              >
                <Save size={16} />
                {pricingSaving ? 'Saving...' : 'Save Pricing'}
              </button>
            </div>
          </div>

          {pricingQuickForm ? (
            <div className="grid md:grid-cols-3 gap-6">
              <label className="block space-y-2">
                <span className="text-xs uppercase tracking-[0.4em] text-slate-500">Plan Name</span>
                <input
                  className="w-full rounded-2xl bg-slate-950/60 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={pricingQuickForm.name}
                  onChange={(e) => updatePricingForm('name', e.target.value)}
                />
              </label>
              <label className="block space-y-2">
                <span className="text-xs uppercase tracking-[0.4em] text-slate-500">Price Label</span>
                <input
                  className="w-full rounded-2xl bg-slate-950/60 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={pricingQuickForm.price}
                  onChange={(e) => updatePricingForm('price', e.target.value)}
                />
              </label>
              <label className="block space-y-2">
                <span className="text-xs uppercase tracking-[0.4em] text-slate-500">Note (per month, etc.)</span>
                <input
                  className="w-full rounded-2xl bg-slate-950/60 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={pricingQuickForm.note ?? ''}
                  onChange={(e) => updatePricingForm('note', e.target.value)}
                />
              </label>
              <label className="inline-flex items-center gap-3 text-sm text-slate-300">
                <input
                  type="checkbox"
                  checked={!!pricingQuickForm.recommended}
                  onChange={(e) => updatePricingForm('recommended', e.target.checked)}
                  className="rounded border border-slate-800 bg-slate-950/60 text-blue-500 focus:ring-blue-500"
                />
                Mark as “Most Popular”
              </label>
              <label className="block space-y-2 md:col-span-3">
                <span className="text-xs uppercase tracking-[0.4em] text-slate-500">Features (one per line)</span>
                <textarea
                  rows={3}
                  className="w-full rounded-2xl bg-slate-950/60 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={(pricingQuickForm.features ?? []).join('\n')}
                  onChange={(e) => updatePricingFeatures(e.target.value)}
                />
              </label>
            </div>
          ) : (
            <p className="text-slate-400 text-sm">No pricing tier selected.</p>
          )}
        </section>

        <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-8 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Homepage Story</p>
              <h2 className="text-xl font-semibold">Problem Statement & CTA</h2>
            </div>
            <button
              onClick={handleContentSave}
              disabled={contentSaving}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/90 hover:bg-blue-600 transition disabled:opacity-60"
            >
              <Save size={16} />
              {contentSaving ? 'Saving...' : 'Save Homepage Content'}
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <label className="block space-y-2">
              <span className="text-xs uppercase tracking-[0.4em] text-slate-500">Problem Eyebrow</span>
              <input
                className="w-full rounded-2xl bg-slate-950/60 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={contentForm.problemEyebrow}
                onChange={(e) => handleContentInput('problemEyebrow', e.target.value)}
              />
            </label>
            <label className="block space-y-2">
              <span className="text-xs uppercase tracking-[0.4em] text-slate-500">Problem Title</span>
              <input
                className="w-full rounded-2xl bg-slate-950/60 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={contentForm.problemTitle}
                onChange={(e) => handleContentInput('problemTitle', e.target.value)}
              />
            </label>
            <label className="block space-y-2">
              <span className="text-xs uppercase tracking-[0.4em] text-slate-500">CTA Pill Label</span>
              <input
                className="w-full rounded-2xl bg-slate-950/60 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={contentForm.ctaPill}
                onChange={(e) => handleContentInput('ctaPill', e.target.value)}
              />
            </label>
          </div>

          <label className="block space-y-2">
            <span className="text-xs uppercase tracking-[0.4em] text-slate-500">Problem Subtitle</span>
            <textarea
              rows={3}
              className="w-full rounded-2xl bg-slate-950/60 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              value={contentForm.problemSubtitle}
              onChange={(e) => handleContentInput('problemSubtitle', e.target.value)}
            />
          </label>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Problem Cards</p>
                <p className="text-sm text-slate-400">Edit the four blockers shown in the homepage carousel.</p>
              </div>
              <button
                onClick={addProblem}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-dashed border-slate-700 hover:border-blue-500 text-slate-400 hover:text-white transition"
              >
                <Plus size={16} />
                Add Problem
              </button>
            </div>

            <div className="space-y-6">
              {(contentForm.problems ?? []).map((problem, index) => (
                <div key={problem.id ?? index} className="rounded-3xl border border-slate-800 bg-slate-950/40 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
                      Problem {index + 1}
                    </p>
                    <button
                      onClick={() => removeProblem(index)}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm border border-slate-800 text-slate-400 hover:border-red-500/40 hover:text-red-200 transition"
                    >
                      <Trash2 size={14} />
                      Remove
                    </button>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <label className="block space-y-2">
                      <span className="text-xs uppercase tracking-[0.4em] text-slate-500">Category</span>
                      <input
                        className="w-full rounded-2xl bg-slate-950/60 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={problem.category}
                        onChange={(e) => handleProblemChange(index, 'category', e.target.value)}
                      />
                    </label>
                    <label className="block space-y-2 md:col-span-2">
                      <span className="text-xs uppercase tracking-[0.4em] text-slate-500">Title</span>
                      <input
                        className="w-full rounded-2xl bg-slate-950/60 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={problem.title}
                        onChange={(e) => handleProblemChange(index, 'title', e.target.value)}
                      />
                    </label>
                  </div>
                  <label className="block space-y-2">
                    <span className="text-xs uppercase tracking-[0.4em] text-slate-500">Description</span>
                    <textarea
                      rows={3}
                      className="w-full rounded-2xl bg-slate-950/60 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      value={problem.description}
                      onChange={(e) => handleProblemChange(index, 'description', e.target.value)}
                    />
                  </label>
                  <label className="block space-y-2">
                    <span className="text-xs uppercase tracking-[0.4em] text-slate-500">Impacts (one per line)</span>
                    <textarea
                      rows={3}
                      className="w-full rounded-2xl bg-slate-950/60 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={(problem.impacts ?? []).join('\n')}
                      onChange={(e) => handleProblemImpactChange(index, e.target.value)}
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <label className="block space-y-2">
              <span className="text-xs uppercase tracking-[0.4em] text-slate-500">CTA Headline</span>
              <input
                className="w-full rounded-2xl bg-slate-950/60 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={contentForm.ctaHeadline}
                onChange={(e) => handleContentInput('ctaHeadline', e.target.value)}
              />
            </label>
            <label className="block space-y-2">
              <span className="text-xs uppercase tracking-[0.4em] text-slate-500">CTA Button Label</span>
              <input
                className="w-full rounded-2xl bg-slate-950/60 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={contentForm.ctaPrimaryLabel}
                onChange={(e) => handleContentInput('ctaPrimaryLabel', e.target.value)}
              />
            </label>
          </div>

          <label className="block space-y-2">
            <span className="text-xs uppercase tracking-[0.4em] text-slate-500">CTA Body</span>
            <textarea
              rows={3}
              className="w-full rounded-2xl bg-slate-950/60 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              value={contentForm.ctaBody}
              onChange={(e) => handleContentInput('ctaBody', e.target.value)}
            />
          </label>

          <label className="block space-y-2">
            <span className="text-xs uppercase tracking-[0.4em] text-slate-500">CTA Primary Link</span>
            <input
              className="w-full rounded-2xl bg-slate-950/60 border border-slate-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={contentForm.ctaPrimaryLink}
              onChange={(e) => handleContentInput('ctaPrimaryLink', e.target.value)}
            />
          </label>
        </section>
      </div>
    </div>
  );
};

export default Admin;
