import React, { useEffect, useMemo, useState } from 'react';
import { Mail, Lock, ArrowRight, Sparkles, CheckCircle2, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import aurexisLogoWebp from '../src/assets/aurexis-logo.webp';
import aurexisLogoPng from '../src/assets/aurexis-logo.png';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, user, loading } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && user) {
      navigate('/admin', { replace: true });
    }
  }, [loading, user, navigate]);

  const isDisabled = useMemo(() => submitting || loading || !form.email || !form.password, [submitting, loading, form]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isDisabled) return;
    setSubmitting(true);
    setError(null);
    try {
      await login(form.email, form.password);
      navigate('/admin', { replace: true });
    } catch (err: any) {
      console.warn(err);
      const message = err?.code === 'auth/invalid-credential'
        ? 'Invalid email or password. Please try again.'
        : err?.message ?? 'Unable to log in. Please try again.';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (field: 'email' | 'password', value: string) => setForm(prev => ({ ...prev, [field]: value }));

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-[#050915] dark:via-[#050915] dark:to-[#050915]">
      {/* Abstract gradient backdrop */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-12 w-80 h-80 bg-blue-200 blur-3xl rounded-full opacity-70 dark:bg-blue-500/20"></div>
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-purple-100 blur-[160px] rounded-full opacity-70 dark:bg-purple-500/20"></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-cyan-100 blur-[140px] rounded-full opacity-60 dark:bg-cyan-400/10"></div>
        <div className="noise-overlay opacity-20 dark:opacity-30"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-32 pb-16 grid lg:grid-cols-2 gap-12">
        {/* Story & highlights */}
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-slate-600 dark:bg-white/10 dark:border-white/20 dark:text-white/80 backdrop-blur">
            <Sparkles size={16} className="text-blue-500" />
            <span className="uppercase tracking-wide text-xs font-semibold">Admin Portal</span>
          </div>

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold leading-tight text-slate-900 dark:text-white">
            Login to orchestrate
            <span className="block text-blue-600 dark:text-blue-200">projects, pricing, and growth.</span>
          </h1>

          <p className="mt-6 text-lg text-slate-600 dark:text-white/70 leading-relaxed max-w-xl">
            Access the Aurexis command center to manage services, update pricing tiers,
            launch marketing experiments, and monitor delivery pipelines — all in one
            place designed for velocity.
          </p>

          <div className="mt-12 space-y-3 text-sm">
            <div className="flex items-center gap-3 text-slate-500 dark:text-white/70">
              <CheckCircle2 className="text-emerald-500 dark:text-emerald-300" size={18} />
              <span>Secure Firebase Auth login required.</span>
            </div>
            <div className="flex items-center gap-3 text-slate-500 dark:text-white/70">
              <CheckCircle2 className="text-emerald-500 dark:text-emerald-300" size={18} />
              <span>Use the admin credentials provisioned in Firebase.</span>
            </div>
          </div>

        </div>

        {/* Auth card */}
        <div>
          <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-[0_30px_80px_rgba(15,23,42,0.12)] dark:shadow-2xl border border-slate-100 dark:border-gray-800 p-10">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-[18px] bg-white shadow-lg dark:bg-white/10 backdrop-blur-2xl border border-white/80 dark:border-white/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent opacity-80"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/40 via-indigo-500/30 to-purple-500/30 mix-blend-screen"></div>
                <picture>
                  <source srcSet={aurexisLogoWebp} type="image/webp" />
                  <img
                    src={aurexisLogoPng}
                    alt="Aurexis logo"
                    className="w-12 h-12 object-contain relative z-10"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              </div>
              <div>
                <p className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">Aurexis Control</p>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Sign in to continue</h2>
              </div>
            </div>

            {error && (
              <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200">
                {error}
              </div>
            )}

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    className="w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/60 py-3 pl-12 pr-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    placeholder="you@aurexis.com"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="password"
                    className="w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/60 py-3 pl-12 pr-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    required
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                Remember this device
              </label>

              <button
                type="submit"
                disabled={isDisabled}
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 text-white font-semibold py-3.5 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Login
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

          </div>

          <div className="mt-6 text-xs text-slate-500 dark:text-white/70 text-center">
            By continuing you agree to Aurexis Solution&apos;s internal usage policies.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
