import React from 'react';

export enum UserRole {
  GUEST = 'GUEST',
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  icon: string;
  description: string;
  features: string[];
  price: string;
}

export interface ServiceHeroStat {
  title: string;
  value: string;
  subtext: string;
  icon?: string;
  accent?: 'cyan' | 'purple' | 'emerald' | 'fuchsia' | 'pink' | 'blue';
}

export interface ServiceHeroContent {
  badge?: string;
  headline?: string;
  highlight?: string;
  subheadline?: string;
  description?: string;
  stats?: ServiceHeroStat[];
}

export interface ServiceChallengeCard {
  title: string;
  body: string;
  stat: string;
  icon?: string;
  gradient?: string;
}

export interface ServiceChallengeContent {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  cards: ServiceChallengeCard[];
}

export interface ServiceCTAServiceCard {
  title: string;
  metric: string;
  description: string;
  href: string;
  accent?: 'cyan' | 'purple' | 'emerald';
  icon?: string;
  buttonLabel?: string;
}

export interface ServiceCTABanner {
  eyebrow?: string;
  heading: string;
  body: string;
  primaryLabel: string;
  primaryLink: string;
  secondaryLabel?: string;
  secondaryLink?: string;
}

export interface ServiceCTAContent {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  cards: ServiceCTAServiceCard[];
  banner: ServiceCTABanner;
}

export interface ServiceFAQItem {
  question: string;
  answer: string;
}

export interface ServiceDetailContent extends ServiceItem {
  tagline: string;
  longDescription: string;
  benefits: { title: string; description: string; icon: string }[];
  process: { step: number; title: string; description: string }[];
  technologies: string[];
  heroContent?: ServiceHeroContent;
  challengeContent?: ServiceChallengeContent;
  ctaContent?: ServiceCTAContent;
  faqItems?: ServiceFAQItem[];
}

export type BlogPostStatus = 'draft' | 'published';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  imageUrl?: string;
  status: BlogPostStatus;
  tags?: string[];
  generatedFrom?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  name: string;
  status: 'In Progress' | 'Completed' | 'Pending' | 'Review';
  dueDate: string;
  progress: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  note?: string;
  features: string[];
  recommended?: boolean;
}

export interface FaqItem {
  id: string;
  q: string;
  a: string;
}

export type PricingPageId = 'web' | 'ai' | 'app' | 'data' | 'cloud';

export interface PricingHeroMetric {
  id: string;
  label: string;
  value: string;
  subtext?: string;
}

export interface PricingHeroCTAs {
  primaryLabel: string;
  primaryLink: string;
  secondaryLabel?: string;
  secondaryLink?: string;
}

export interface PricingHeroContent {
  eyebrow?: string;
  badge?: string;
  title: string;
  highlight?: string;
  subtitle: string;
  description?: string;
  bullets?: string[];
  chips?: string[];
  metrics?: PricingHeroMetric[];
  ctas?: PricingHeroCTAs;
}

export interface PricingMetricBubble {
  id: string;
  label: string;
  value: string;
  context: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  priceLabel: string;
  priceValue: number;
  priceSuffix?: string;
  description: string;
  bullets: string[];
  signal?: string;
  recommended?: boolean;
  cta: string;
  tags?: string[];
  bestFor?: string;
}

export interface PricingFaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface PricingRoiSlider {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  unitPrefix?: string;
  unitSuffix?: string;
  format?: 'number' | 'percent' | 'currency' | 'hours';
}

export interface PricingRoiConfig {
  headline: string;
  description?: string;
  baselineCost: number;
  sliders: PricingRoiSlider[];
}

export interface PricingPageContent {
  id: PricingPageId;
  hero: PricingHeroContent;
  metricBubbles: PricingMetricBubble[];
  plans: PricingPlan[];
  faqs: PricingFaqItem[];
  roi?: PricingRoiConfig;
  updatedAt?: string;
}

export type ProjectCategory = 'ai' | 'web' | 'cloud' | 'data' | 'ecommerce' | 'automation';

export interface PortfolioProject {
  id: string;
  title: string;
  summary: string;
  category: ProjectCategory;
  tech: string[];
  durationDays: number;
  link?: string;
  image?: string;
  showcaseImages?: string[];
  featured?: boolean;
  order?: number;
}

export interface HomepageSettings {
  heroBadge: string;
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  heroDescription: string;
  aboutTitle: string;
  aboutText: string;
  logoUrl: string;
}

export interface SocialLinks {
  linkedin: string;
  facebook: string;
  instagram: string;
  whatsapp: string;
  twitter: string;
  youtube: string;
}

export interface HomepageProblem {
  id: string;
  title: string;
  description: string;
  impacts: string[];
  category: string;
}

export interface HomepageContent {
  problemEyebrow: string;
  problemTitle: string;
  problemSubtitle: string;
  problems: HomepageProblem[];
  ctaPill: string;
  ctaHeadline: string;
  ctaBody: string;
  ctaPrimaryLabel: string;
  ctaPrimaryLink: string;
}

export interface AboutPageSettings {
  heroTitle: string;
  heroHighlight: string;
  heroPrimaryCtaLabel: string;
  heroPrimaryCtaLink: string;
  heroSecondaryCtaLabel: string;
  heroSecondaryCtaLink: string;
  heroMessages: string[];
  storyHighlights: { icon: string; text: string }[];
  ourStoryTitle: string;
  ourStoryText: string;
  missionTitle: string;
  missionText: string;
  principlesTitle: string;
  principlesSubtitle: string;
  principles: { title: string; body: string }[];
  founderName: string;
  founderRole: string;
  founderLocation: string;
  founderBio: string;
  founderLinkedIn?: string;
  founderInstagram?: string;
  founderWhatsApp?: string;
  howWeWorkTitle: string;
  howWeWorkSubtitle: string;
  whyNowTitle: string;
  whyNowSubtitle: string;
  whyUsTitle: string;
  whyUsSubtitle: string;
}
