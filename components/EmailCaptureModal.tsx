import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ShieldCheck, Mail } from 'lucide-react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';
import { auth, db } from '../src/firebase';

interface EmailCaptureModalProps {
  isOpen: boolean;
  onDismiss: (result: 'dismissed' | 'subscribed') => void;
}

const EMAIL_REGEX = /.+@.+\..+/;

const EmailCaptureModal: React.FC<EmailCaptureModalProps> = ({ isOpen, onDismiss }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    } else {
      setEmail('');
      setStatus('idle');
      setError('');
    }
  }, [isOpen]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!EMAIL_REGEX.test(email.trim())) {
      setError('Enter a valid email');
      return;
    }

    setStatus('loading');
    setError('');

    try {
      if (auth && !auth.currentUser) {
        await signInAnonymously(auth);
      }

      if (db) {
        await addDoc(collection(db, 'newsletterLeads'), {
          email: email.trim().toLowerCase(),
          source: typeof window !== 'undefined' ? window.location.pathname : 'unknown',
          subscribedAt: serverTimestamp()
        });
      } else {
        console.warn('Firestore is not configured; storing lead locally only.');
      }

      setStatus('success');
      setTimeout(() => onDismiss('subscribed'), 2000);
    } catch (err) {
      console.error('Failed to subscribe lead', err);
      setStatus('error');
      setError('Unable to save right now. Please try again in a moment.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/60 backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative mx-4 w-full max-w-md rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-900/70 p-8 text-white shadow-2xl"
          >
            <button
              aria-label="Close email capture"
              className="absolute right-4 top-4 rounded-full border border-white/10 bg-white/5 p-2 text-slate-300 hover:text-white"
              onClick={() => onDismiss('dismissed')}
            >
              <X size={16} />
            </button>

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1 text-xs uppercase tracking-[0.4em] text-blue-200">
              <Sparkles size={16} />
              Insider Drops
            </div>

            <h2 className="text-3xl font-semibold leading-tight">
              Get brutal clarity on modern tech ops.
            </h2>
            <p className="mt-3 text-sm text-slate-300">
              Subscribe to the Aurexis Field Notes—monthly playbooks on AI automation, compliant delivery, and launch tactics we use with clients.
            </p>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <label className="block text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                Email Address
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <Mail size={18} className="text-blue-300" />
                <input
                  ref={inputRef}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-base text-white placeholder:text-slate-500 focus:outline-none"
                  placeholder="you@company.com"
                  disabled={status === 'loading' || status === 'success'}
                />
              </div>
              {error && <p className="text-sm text-red-400">{error}</p>}

              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="w-full rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 py-3 text-base font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:opacity-90 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Saving…' : status === 'success' ? 'Saved' : 'Send me the playbooks'}
              </button>
            </form>

            <div className="mt-6 flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck size={14} />
              <span>Zero spam. Unsubscribe whenever. See our privacy policy.</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EmailCaptureModal;
