import React from 'react';

const commitments = [
  {
    title: 'Engagement Scope',
    description:
      'All projects begin with a mutually agreed scope that defines deliverables, milestones, and success metrics. Any requested change in scope will be reviewed together and reflected in an updated statement of work.'
  },
  {
    title: 'Client Responsibilities',
    description:
      'To keep delivery on schedule, we rely on timely feedback, access to required systems, and the appointment of a primary stakeholder who can make or route decisions.'
  },
  {
    title: 'Intellectual Property',
    description:
      'Upon full payment, all work products and associated intellectual property created for your project transfer to you unless otherwise specified in the contract.'
  },
  {
    title: 'Payment Terms',
    description:
      'Invoices follow the cadence described in your proposal. Late payments may pause active work until the balance is resolved. We accept wire transfer, major credit cards, and standard Malaysian payment rails.'
  }
];

const TermsOfService: React.FC = () => {
  return (
    <main className="relative z-10 min-h-screen bg-white pt-28 pb-16 dark:bg-slate-950">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-indigo-500">Agreement</p>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Terms of Service</h1>
          <p className="text-base text-slate-600 dark:text-slate-400">
            Effective as of {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            These terms outline how Aurexis Solution partners with clients to plan, build, and launch technology initiatives.
          </p>
        </div>

        <div className="space-y-10">
          {commitments.map((item) => (
            <section
              key={item.title}
              className="rounded-3xl border border-slate-200/80 bg-white/70 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur dark:border-slate-800 dark:bg-white/5"
            >
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">{item.title}</h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">{item.description}</p>
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-purple-200 bg-purple-50/70 p-6 text-center dark:border-purple-500/30 dark:bg-purple-500/10">
          <h3 className="text-xl font-semibold text-purple-900 dark:text-purple-100">Need a signed copy?</h3>
          <p className="mt-2 text-sm text-purple-900/80 dark:text-purple-100/70">
            Email <a href="mailto:contact@aurexissolution.com" className="underline">contact@aurexissolution.com</a> for a PDF or custom agreement.
          </p>
        </div>
      </div>
    </main>
  );
};

export default TermsOfService;
