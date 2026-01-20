import React from 'react';
import { Shield, Globe, Zap } from 'lucide-react';

const uptimeBars = [42, 65, 55, 72, 88, 61, 70, 95, 78, 100, 92, 85];

const CloudReliabilityCard: React.FC = () => {
  return (
    <section className="relative py-16 text-slate-900 dark:text-white overflow-hidden bg-white dark:bg-[#04091c]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.18),transparent_60%),radial-gradient(circle_at_80%_10%,rgba(14,165,233,0.15),transparent_65%),radial-gradient(circle_at_50%_90%,rgba(109,40,217,0.15),transparent_70%)] opacity-70 dark:hidden" />
        <div className="absolute inset-0 opacity-[0.06] dark:hidden" style={{ backgroundImage: 'linear-gradient(120deg, rgba(15,23,42,0.15) 1px, transparent 1px), linear-gradient(rgba(15,23,42,0.15) 1px, transparent 1px)', backgroundSize: '140px 140px' }} />
        <div className="hidden dark:block absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.25),transparent_55%),radial-gradient(circle_at_80%_10%,rgba(14,165,233,0.2),transparent_60%),radial-gradient(circle_at_50%_90%,rgba(109,40,217,0.25),transparent_65%)] opacity-90" />
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(120deg, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '140px 140px' }} />
        </div>
      </div>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-white/95 px-4 py-8 sm:px-8 sm:py-10 shadow-[0_35px_90px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-gradient-to-r dark:from-[#0d1533] dark:via-[#151844] dark:to-[#1a0f32] dark:shadow-[0_25px_80px_rgba(2,6,23,0.6)]">
          <div className="absolute -right-14 top-6 w-56 h-56 bg-cyan-200/40 blur-[120px] dark:bg-cyan-500/25" />
          <div className="absolute -left-16 bottom-0 w-48 h-48 bg-purple-200/35 blur-[110px] dark:bg-purple-500/20" />
          <div className="relative grid gap-10 lg:grid-cols-2 items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:border-white/20 dark:bg-white/5 dark:text-cyan-200">
                Cloud Reliability Stack
              </p>
              <h2 className="mt-5 text-3xl md:text-4xl font-semibold text-slate-900 leading-tight dark:text-white">
                Built for Performance &amp; Reliability
              </h2>
              <p className="mt-4 text-slate-600 text-base dark:text-slate-200">
                Mission control for cloud workloads tuned to deliver zero-downtime releases, sub-30ms response, and
                instant failover across regions.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  {
                    icon: <Globe className="w-4 h-4 text-cyan-500" />,
                    title: 'Global CDN Mesh',
                    desc: '200+ edge POPs, latency-aware routing, sovereign data controls.'
                  },
                  {
                    icon: <Shield className="w-4 h-4 text-sky-500" />,
                    title: 'Enterprise Security',
                    desc: 'Inline threat intelligence, WAF rules, automated compliance attestation.'
                  },
                  {
                    icon: <Zap className="w-4 h-4 text-purple-500" />,
                    title: 'Predictive Ops',
                    desc: 'AIOps playbooks, anomaly scoring, and self-healing pipelines.'
                  }
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="h-10 w-10 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center dark:bg-white/10 dark:border-white/20">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-slate-900 font-semibold dark:text-white">{item.title}</h4>
                      <p className="text-slate-500 text-sm dark:text-slate-300">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  { label: 'Edge Regions', value: '34 active' },
                  { label: 'Failover', value: '< 30s' }
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/15 dark:bg-white/5">
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-300">{item.label}</p>
                    <p className="text-2xl font-semibold text-slate-900 mt-1 dark:text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white shadow-[0_25px_60px_rgba(15,23,42,0.12)] backdrop-blur-2xl p-5 sm:p-6 dark:border-white/15 dark:bg-white/5">
              <div className="flex flex-wrap gap-4 items-end justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-500 dark:text-slate-200">Average uptime</p>
                  <p className="text-4xl font-bold text-slate-900 mt-2 dark:text-white">99.99%</p>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-500 dark:text-slate-200">SLA Tier</p>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">Mission Critical</p>
                </div>
              </div>

              <div className="mt-5 rounded-3xl border border-slate-200 bg-slate-50 p-3 dark:border-white/10 dark:bg-[#0d1533]/80">
                <div className="relative h-28">
                  <div className="absolute inset-4 grid grid-cols-6 text-[10px] uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500">
                    {[...Array(5)].map((_, idx) => (
                      <span key={idx} className="border-l border-white/5" />
                    ))}
                  </div>
                  <div className="absolute inset-3 flex items-end gap-2">
                    {uptimeBars.map((height, idx) => (
                      <div
                        key={idx}
                        className="flex-1 rounded-full bg-gradient-to-t from-cyan-400/30 via-cyan-300/80 to-white shadow-[0_8px_25px_rgba(6,182,212,0.3)] dark:from-cyan-400/40 dark:via-cyan-300/80"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  { label: 'Response Time', value: '24ms', helper: 'Edge to origin' },
                  { label: 'Incidents Resolved', value: '100%', helper: 'Automated runbooks' }
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/10">
                    <p className="text-[11px] uppercase tracking-[0.4em] text-slate-500 dark:text-slate-200">{item.label}</p>
                    <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">{item.value}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-300">{item.helper}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-4 items-center justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.4em] text-slate-500 dark:text-slate-200">Global coverage</p>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">100% availability</p>
                </div>
                <div className="relative h-20 w-20">
                  <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_120deg,rgba(34,211,238,0.9),rgba(99,102,241,0.8),rgba(14,165,233,0.9))] dark:opacity-100 opacity-80" />
                  <div className="absolute inset-2 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-900 font-semibold dark:bg-[#0f1533] dark:border-white/10 dark:text-white">
                    100%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CloudReliabilityCard;
