import React from 'react';

const sections = [
  {
    title: 'Information We Collect',
    description:
      'We collect information that you voluntarily provide to us when you contact our team, request a proposal, or sign up for a service. This may include basic contact details, project information, and any materials you choose to share.'
  },
  {
    title: 'How We Use Information',
    description:
      'Your data is used to respond to inquiries, deliver contracted services, improve our offerings, and provide occasional updates that may interest you. We never sell your information to third parties.'
  },
  {
    title: 'Data Protection',
    description:
      'All information is stored in secure systems with role-based access. We implement administrative and technical safeguards to protect your data and regularly review our practices for compliance.'
  },
  {
    title: 'Your Rights',
    description:
      'You may request access, updates, or deletion of your personal information at any time. Simply reach out to admin@aurexissolution.com and we will respond within a reasonable timeframe.'
  }
];

const PrivacyPolicy: React.FC = () => {
  return (
    <main className="relative z-10 min-h-screen bg-white pt-28 pb-16 dark:bg-slate-950">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-blue-500">Policy</p>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Privacy Policy</h1>
          <p className="text-base text-slate-600 dark:text-slate-400">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            We take privacy seriously. This page explains how Aurexis Solution collects, uses, and protects the
            information you share with us.
          </p>
        </div>

        <div className="space-y-10">
          {sections.map((section) => (
            <section
              key={section.title}
              className="rounded-3xl border border-slate-200/80 bg-white/70 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur dark:border-slate-800 dark:bg-white/5"
            >
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">{section.title}</h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">{section.description}</p>
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-blue-200 bg-blue-50/70 p-6 text-center dark:border-blue-500/30 dark:bg-blue-500/10">
          <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100">Have a privacy question?</h3>
          <p className="mt-2 text-sm text-blue-900/80 dark:text-blue-100/70">
            Contact us anytime at <a href="mailto:admin@aurexissolution.com" className="underline">admin@aurexissolution.com</a>.
          </p>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
