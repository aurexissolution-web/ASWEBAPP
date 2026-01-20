import { ServiceChallengesData } from '../components/ServiceChallengesSection';

export type ServicePageConfig = {
  challenges: ServiceChallengesData;
};

export const SERVICE_PAGE_CONFIG: Record<string, ServicePageConfig> = {
  web: {
    challenges: {
      badgeLabel: 'Web Performance',
      title: 'Web Challenges We Neutralize',
      subtitle: 'From Core Web Vitals to CMS chaos, we ensure your site ships fast and stays editable.',
      layout: 'cyberpunk',
      cards: [
        {
          icon: 'Zap',
          title: 'Slow Core Web Vitals',
          body: 'Bounce rate spikes above 3s loads? Largest contentful paint blocks conversions.',
          solution: 'Edge rendering, image pipelines, and script budgets cut LCP below 1.2s.',
          badge: '+31% conversions',
          glow: 'from-cyan-500/30 via-blue-500/20 to-transparent',
          accentGradient: 'from-emerald-400 via-cyan-400 to-blue-500',
          iconBg: 'bg-cyan-500/15',
          metricColor: 'text-cyan-300'
        },
        {
          icon: 'Globe',
          title: 'Messy CMS Workflows',
          body: 'Marketing blocked by dev teams? Campaigns miss deadlines without preview + roles.',
          solution: 'Headless CMS with visual preview + approval rails gives comms same-day edits.',
          badge: '5x content velocity',
          glow: 'from-emerald-500/25 via-teal-500/20 to-transparent',
          accentGradient: 'from-emerald-500 via-teal-400 to-cyan-400',
          iconBg: 'bg-emerald-500/15',
          metricColor: 'text-emerald-300'
        },
        {
          icon: 'Shield',
          title: 'Security & Hosting Debt',
          body: 'Shared hosting drops under traffic? TLS, WAF, and autoscaling missing.',
          solution: 'Hardened Vercel/Cloudflare stack with autoscale + 24/7 threat response.',
          badge: '99.99% uptime',
          glow: 'from-purple-500/25 via-fuchsia-500/20 to-transparent',
          accentGradient: 'from-purple-500 via-fuchsia-400 to-pink-500',
          iconBg: 'bg-purple-500/15',
          metricColor: 'text-fuchsia-300'
        }
      ],
      codeSnippets: [
        `const vitals = await lighthouse(url, { budgets: ['ttfb<0.8s'] });`,
        `cms.preview.enable({ role: 'marketing', schedule: true });`,
        `edgeMiddleware({ rateLimit: '1k/10s', waf: true });`
      ]
    }
  },
  cloud: {
    challenges: {
      badgeLabel: 'Cloud Bottlenecks',
      title: 'Cloud Migration Issues We Solve',
      subtitle: 'Prevent surprise bills and downtime with automation-first cloud ops.',
      cards: [
        {
          icon: 'Server',
          title: 'Legacy Infrastructure',
          body: 'Monolithic VPS slowing teams? Containers + IaC spin up identical stacks in minutes.',
          badge: 'Impact: 65% faster deploys',
          glow: 'from-blue-500/30 via-indigo-500/20 to-transparent'
        },
        {
          icon: 'DollarSign',
          title: 'Unpredictable Costs',
          body: 'RM50k surprise AWS bill? FinOps dashboards & auto-scaling keep spend transparent.',
          badge: 'Impact: -38% monthly spend',
          glow: 'from-emerald-500/25 via-lime-500/20 to-transparent'
        },
        {
          icon: 'Shield',
          title: 'Security & Compliance',
          body: 'SOC2 & PDPA blockers? Zero-trust network + encrypted backups keep auditors happy.',
          badge: 'Impact: 0 critical alerts',
          glow: 'from-purple-500/25 via-pink-500/20 to-transparent'
        }
      ],
      codeSnippets: [
        `pipeline.deploy({ region: 'ap-southeast-1', zeroDowntime: true });`,
        `const alarms = cloudwatch.bind({ budget: 5000, threshold: 0.8 });`,
        `kms.encrypt('customer-data', { rotation: '30d' });`
      ]
    }
  },
  data: {
    challenges: {
      badgeLabel: 'Data Ops',
      title: 'Data Challenges We Untangle',
      subtitle: 'Give every stakeholder a single version of truth with governed analytics.',
      cards: [
        {
          icon: 'Layers',
          title: 'Disconnected Sources',
          body: 'CRM + POS + Ads siloed? ETL pipelines land everything into a governed warehouse.',
          badge: 'Impact: 1 HR dashboard',
          glow: 'from-cyan-500/30 via-blue-500/20 to-transparent'
        },
        {
          icon: 'Activity',
          title: 'Slow Reporting',
          body: 'Manual Excel each Monday? Automated Looker/PowerBI refresh pushes real-time KPIs.',
          badge: 'Impact: 90% faster insights',
          glow: 'from-emerald-500/25 via-teal-500/20 to-transparent'
        },
        {
          icon: 'TrendingUp',
          title: 'No Forecasting',
          body: 'Gut-feel forecasting? ML models predict inventory and revenue confidence intervals.',
          badge: 'Impact: +22% accuracy',
          glow: 'from-purple-500/25 via-pink-500/20 to-transparent'
        }
      ],
      codeSnippets: [
        `const pipeline = dag('marketing-blend').every('1h');`,
        `warehouse.table('sales').refresh({ incremental: true });`,
        `model.predict('revenue').confidence(0.92);`
      ]
    }
  }
};
