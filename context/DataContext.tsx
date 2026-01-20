import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  collection,
  onSnapshot,
  QuerySnapshot,
  DocumentData,
  doc,
  setDoc,
  deleteDoc
} from 'firebase/firestore';
import {
  SERVICES,
  TESTIMONIALS,
  PRICING_TIERS,
  FAQ_ITEMS,
  SERVICE_DETAILS,
  DEFAULT_HOMEPAGE_SETTINGS,
  DEFAULT_SOCIAL_LINKS,
  DEFAULT_HOMEPAGE_CONTENT,
  DEFAULT_ABOUT_PAGE_SETTINGS,
  DEFAULT_PRICING_PAGE_CONTENT
} from '../constants';
import {
  ServiceItem,
  Testimonial,
  PricingTier,
  FaqItem,
  ServiceDetailContent,
  ServiceHeroContent,
  HomepageSettings,
  SocialLinks,
  HomepageContent,
  AboutPageSettings,
  PricingPageContent,
  PricingPageId,
  PortfolioProject,
  ServiceChallengeContent,
  ServiceCTAContent,
  ServiceCTABanner,
  BlogPost,
  BlogPostStatus
} from '../types';
import { db, auth } from '../src/firebase';

interface DataContextType {
  services: ServiceItem[];
  testimonials: Testimonial[];
  pricing: PricingTier[];
  faqs: FaqItem[];
  serviceDetails: Record<string, ServiceDetailContent>;
  homepageSettings: HomepageSettings;
  homepageContent: HomepageContent;
  socialLinks: SocialLinks;
  aboutPageSettings: AboutPageSettings;
  pricingPages: Record<PricingPageId, PricingPageContent>;
  projects: PortfolioProject[];
  blogPosts: BlogPost[];
  
  updateService: (id: string, data: Partial<ServiceDetailContent>) => Promise<void>;
  updateTestimonial: (id: string, data: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;
  addTestimonial: (data: Omit<Testimonial, 'id'>) => void;
  
  updatePricing: (id: string, data: Partial<PricingTier>) => Promise<void> | void;
  
  updateFaq: (id: string, data: Partial<FaqItem>) => void;
  addFaq: (data: Omit<FaqItem, 'id'>) => void;
  deleteFaq: (id: string) => void;
  updatePricingPage: (id: PricingPageId, data: Partial<PricingPageContent>) => Promise<void>;

  updateHomepageSettings: (data: Partial<HomepageSettings>) => Promise<void> | void;
  updateHomepageContent: (data: Partial<HomepageContent>) => Promise<void> | void;
  updateSocialLinks: (data: Partial<SocialLinks>) => Promise<void> | void;
  updateAboutPageSettings: (data: Partial<AboutPageSettings>) => Promise<void> | void;

  addProject: (data: Omit<PortfolioProject, 'id'>) => Promise<void>;
  updateProject: (id: string, data: Partial<PortfolioProject>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;

  addBlogPost: (data: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateBlogPost: (id: string, data: Partial<BlogPost>) => Promise<void>;
  deleteBlogPost: (id: string) => Promise<void>;

  resetData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const mergeHeroContent = (
  base?: ServiceHeroContent,
  override?: ServiceHeroContent
): ServiceHeroContent | undefined => {
  if (!base && !override) return undefined;
  return {
    badge: override?.badge ?? base?.badge,
    headline: override?.headline ?? base?.headline,
    highlight: override?.highlight ?? base?.highlight,
    subheadline: override?.subheadline ?? base?.subheadline,
    description: override?.description ?? base?.description,
    stats: override?.stats ?? base?.stats
  };
};

const mergeChallengeContent = (
  base?: ServiceChallengeContent,
  override?: ServiceChallengeContent
): ServiceChallengeContent | undefined => {
  if (!base && !override) return undefined;
  const fallbackTitle = override?.title ?? base?.title ?? 'Challenges we solve';
  return {
    eyebrow: override?.eyebrow ?? base?.eyebrow,
    title: fallbackTitle,
    highlight: override?.highlight ?? base?.highlight,
    description: override?.description ?? base?.description,
    cards: override?.cards ?? base?.cards ?? []
  };
};

const mergeCtaBanner = (
  base?: ServiceCTABanner,
  override?: ServiceCTABanner
): ServiceCTABanner | undefined => {
  if (!base && !override) return undefined;
  const heading = override?.heading ?? base?.heading ?? 'Book a strategy call';
  const body = override?.body ?? base?.body ?? '';
  const primaryLabel = override?.primaryLabel ?? base?.primaryLabel ?? 'Chat with us';
  const primaryLink = override?.primaryLink ?? base?.primaryLink ?? '/contact';
  return {
    eyebrow: override?.eyebrow ?? base?.eyebrow,
    heading,
    body,
    primaryLabel,
    primaryLink,
    secondaryLabel: override?.secondaryLabel ?? base?.secondaryLabel,
    secondaryLink: override?.secondaryLink ?? base?.secondaryLink
  };
};

const mergeCtaContent = (
  base?: ServiceCTAContent,
  override?: ServiceCTAContent
): ServiceCTAContent | undefined => {
  if (!base && !override) return undefined;
  const banner = mergeCtaBanner(base?.banner, override?.banner);
  return {
    eyebrow: override?.eyebrow ?? base?.eyebrow,
    title: override?.title ?? base?.title,
    subtitle: override?.subtitle ?? base?.subtitle,
    cards: override?.cards ?? base?.cards ?? [],
    banner: banner ?? {
      heading: 'Book a strategy call',
      body: '',
      primaryLabel: 'Chat with us',
      primaryLink: '/contact'
    }
  };
};

const mergeServiceDetailContent = (
  base: ServiceDetailContent,
  override?: Partial<ServiceDetailContent>
): ServiceDetailContent => {
  if (!override) return base;

  return {
    ...base,
    ...override,
    heroContent: mergeHeroContent(base.heroContent, override.heroContent),
    challengeContent: mergeChallengeContent(base.challengeContent, override.challengeContent),
    ctaContent: mergeCtaContent(base.ctaContent, override.ctaContent)
  };
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [pricing, setPricing] = useState<PricingTier[]>([]);
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [serviceDetails, setServiceDetails] = useState<Record<string, ServiceDetailContent>>(SERVICE_DETAILS);
  const [homepageSettings, setHomepageSettings] = useState<HomepageSettings>(DEFAULT_HOMEPAGE_SETTINGS);
  const [homepageContent, setHomepageContent] = useState<HomepageContent>(DEFAULT_HOMEPAGE_CONTENT);
  const [socialLinks, setSocialLinks] = useState<SocialLinks>(DEFAULT_SOCIAL_LINKS);
  const [aboutPageSettings, setAboutPageSettings] = useState<AboutPageSettings>(DEFAULT_ABOUT_PAGE_SETTINGS);
  const [pricingPages, setPricingPages] = useState<Record<PricingPageId, PricingPageContent>>(DEFAULT_PRICING_PAGE_CONTENT);
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  const mapDocsToArray = <T,>(snapshot: QuerySnapshot<DocumentData>) =>
    snapshot.docs.map(docSnap => ({ id: docSnap.id, ...(docSnap.data() as DocumentData) })) as T[];

  useEffect(() => {
    const homepageRef = doc(db, 'siteSettings', 'homepage');
    const homepageContentRef = doc(db, 'siteSettings', 'homepageContent');
    const socialRef = doc(db, 'siteSettings', 'socialLinks');
    const aboutRef = doc(db, 'siteSettings', 'aboutPage');
    const pricingPagesRef = collection(db, 'pricingPages');
    const projectsRef = collection(db, 'projects');
    const blogPostsRef = collection(db, 'blogPosts');

    const unsubServices = onSnapshot(
      collection(db, 'services'),
      snapshot => setServices(mapDocsToArray<ServiceItem>(snapshot)),
      error => console.warn('Unable to load Firestore services collection', error)
    );

    const unsubServiceDetails = onSnapshot(
      collection(db, 'serviceDetails'),
      snapshot => {
        const merged: Record<string, ServiceDetailContent> = { ...SERVICE_DETAILS };
        snapshot.forEach(docSnap => {
          const id = docSnap.id;
          const base =
            merged[id] ||
            (() => {
              const serviceItem = SERVICES.find(s => s.id === id);
              if (!serviceItem) return undefined;
              return {
                ...serviceItem,
                tagline: serviceItem.description,
                longDescription: serviceItem.description,
                benefits: [],
                process: [],
                technologies: serviceItem.features
              } as ServiceDetailContent;
            })();

          if (!base) return;

          merged[id] = {
            ...base,
            ...(docSnap.data() as Partial<ServiceDetailContent>)
          };
        });

        setServiceDetails(merged);
      },
      error => console.warn('Unable to load Firestore serviceDetails collection', error)
    );

    const unsubTestimonials = onSnapshot(
      collection(db, 'testimonials'),
      snapshot => setTestimonials(mapDocsToArray<Testimonial>(snapshot)),
      error => console.warn('Unable to load Firestore testimonials collection', error)
    );

    const unsubPricing = onSnapshot(
      collection(db, 'pricingTiers'),
      snapshot => setPricing(mapDocsToArray<PricingTier>(snapshot)),
      error => console.warn('Unable to load Firestore pricingTiers collection', error)
    );

    const unsubFaqs = onSnapshot(
      collection(db, 'faqs'),
      snapshot => setFaqs(mapDocsToArray<FaqItem>(snapshot)),
      error => console.warn('Unable to load Firestore faqs collection', error)
    );

    const unsubHomepage = onSnapshot(
      homepageRef,
      snapshot => {
        if (snapshot.exists()) {
          setHomepageSettings({
            ...DEFAULT_HOMEPAGE_SETTINGS,
            ...(snapshot.data() as Partial<HomepageSettings>)
          });
        } else {
          // Don't auto-seed - use admin panel to initialize
          setHomepageSettings(DEFAULT_HOMEPAGE_SETTINGS);
        }
      },
      error => console.warn('Unable to load homepage settings', error)
    );

    const unsubHomepageContent = onSnapshot(
      homepageContentRef,
      snapshot => {
        if (snapshot.exists()) {
          setHomepageContent({
            ...DEFAULT_HOMEPAGE_CONTENT,
            ...(snapshot.data() as Partial<HomepageContent>)
          });
        } else {
          setHomepageContent(DEFAULT_HOMEPAGE_CONTENT);
        }
      },
      error => console.warn('Unable to load homepage content', error)
    );

    const unsubSocial = onSnapshot(
      socialRef,
      snapshot => {
        if (snapshot.exists()) {
          setSocialLinks({
            ...DEFAULT_SOCIAL_LINKS,
            ...(snapshot.data() as Partial<SocialLinks>)
          });
        } else {
          // Don't auto-seed - use admin panel to initialize
          setSocialLinks(DEFAULT_SOCIAL_LINKS);
        }
      },
      error => console.warn('Unable to load social links', error)
    );

    const unsubAbout = onSnapshot(
      aboutRef,
      snapshot => {
        if (snapshot.exists()) {
          setAboutPageSettings({
            ...DEFAULT_ABOUT_PAGE_SETTINGS,
            ...(snapshot.data() as Partial<AboutPageSettings>)
          });
        } else {
          // Don't auto-seed - use admin panel to initialize
          setAboutPageSettings(DEFAULT_ABOUT_PAGE_SETTINGS);
        }
      },
      error => console.warn('Unable to load about page settings', error)
    );

    const unsubPricingPages = onSnapshot(
      pricingPagesRef,
      snapshot => {
        const merged: Record<PricingPageId, PricingPageContent> = { ...DEFAULT_PRICING_PAGE_CONTENT };
        snapshot.forEach(docSnap => {
          const id = docSnap.id as PricingPageId;
          if (!merged[id]) return;
          merged[id] = {
            ...merged[id],
            ...(docSnap.data() as Partial<PricingPageContent>)
          };
        });
        setPricingPages(merged);
      },
      error => console.warn('Unable to load pricingPages collection', error)
    );

    const unsubProjects = onSnapshot(
      projectsRef,
      snapshot => {
        const items = snapshot.docs.map(docSnap => {
          const data = docSnap.data() as Partial<PortfolioProject>;
          return {
            id: docSnap.id,
            title: data.title ?? '',
            summary: data.summary ?? '',
            category: (data.category ?? 'web') as PortfolioProject['category'],
            tech: Array.isArray(data.tech) ? data.tech : [],
            durationDays: typeof data.durationDays === 'number' ? data.durationDays : Number(data.durationDays ?? 0),
            link: data.link ?? '',
            image: data.image ?? '',
            showcaseImages: Array.isArray(data.showcaseImages) ? data.showcaseImages : [],
            featured: Boolean(data.featured),
            order: typeof data.order === 'number' ? data.order : Number(data.order ?? 0)
          } as PortfolioProject;
        });
        items.sort((a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER));
        setProjects(items);
      },
      error => console.warn('Unable to load projects collection', error)
    );

    const unsubBlogPosts = onSnapshot(
      blogPostsRef,
      (snapshot) => {
        const items = snapshot.docs.map((docSnap) => {
          const data = docSnap.data() as Partial<BlogPost>;
          return {
            id: docSnap.id,
            title: data.title ?? 'Untitled Post',
            slug: data.slug ?? docSnap.id,
            content: data.content ?? '',
            excerpt: data.excerpt ?? '',
            author: data.author ?? 'Aurexis Solution',
            imageUrl: data.imageUrl ?? '',
            status: (data.status as BlogPostStatus) ?? 'draft',
            tags: Array.isArray(data.tags) ? data.tags : [],
            generatedFrom: data.generatedFrom ?? '',
            createdAt: data.createdAt ?? new Date().toISOString(),
            updatedAt: data.updatedAt ?? data.createdAt ?? new Date().toISOString()
          } as BlogPost;
        });
        items.sort((a, b) => (b.createdAt ?? '').localeCompare(a.createdAt ?? ''));
        setBlogPosts(items);
      },
      (error) => console.warn('Unable to load blogPosts collection', error)
    );

    return () => {
      unsubServices();
      unsubServiceDetails();
      unsubTestimonials();
      unsubPricing();
      unsubFaqs();
      unsubHomepage();
      unsubHomepageContent();
      unsubSocial();
      unsubAbout();
      unsubPricingPages();
      unsubProjects();
      unsubBlogPosts();
    };
  }, []);

  // Actions
  const updateService = async (id: string, data: Partial<ServiceDetailContent>) => {
    setServices(prev => prev.map(item => item.id === id ? { ...item, ...data } : item));
    setServiceDetails(prev => {
      const fallback =
        prev[id] ||
        SERVICE_DETAILS[id] ||
        (() => {
          const serviceItem = SERVICES.find(s => s.id === id);
          if (!serviceItem) return undefined;
          return {
            ...serviceItem,
            tagline: serviceItem.description,
            longDescription: serviceItem.description,
            benefits: [],
            process: [],
            technologies: serviceItem.features
          } as ServiceDetailContent;
        })();

      if (!fallback) return prev;

      return {
        ...prev,
        [id]: {
          ...fallback,
          ...data
        }
      };
    });
    if (!db) {
      console.warn('Firestore is not configured. Service changes are only applied locally.');
      return;
    }
    try {
      await Promise.all([
        setDoc(doc(db, 'services', id), data, { merge: true }),
        setDoc(doc(db, 'serviceDetails', id), data, { merge: true })
      ]);
    } catch (error) {
      console.warn(`Unable to persist service ${id}`, error);
      throw error;
    }
  };

  const addProject = async (data: Omit<PortfolioProject, 'id'>) => {
    const payload: PortfolioProject = {
      ...data,
      durationDays: Number(data.durationDays) || 0,
      order: data.order ?? projects.length,
      tech: Array.isArray(data.tech) ? data.tech : [],
      id: doc(collection(db, 'projects')).id
    };

    setProjects(prev => [...prev, payload]);

    if (!db) {
      console.warn('Firestore is not configured. Project changes are only applied locally.');
      return;
    }

    try {
      await setDoc(doc(db, 'projects', payload.id), payload, { merge: true });
    } catch (error) {
      console.warn('Unable to add project', error);
      throw error;
    }
  };

  const updateProject = async (id: string, data: Partial<PortfolioProject>) => {
    setProjects(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              ...data,
              tech: data.tech ? [...data.tech] : item.tech,
              durationDays: data.durationDays !== undefined ? Number(data.durationDays) : item.durationDays,
              order: data.order !== undefined ? Number(data.order) : item.order
            }
          : item
      )
    );

    if (!db) {
      console.warn('Firestore is not configured. Project changes are only applied locally.');
      return;
    }

    try {
      await setDoc(doc(db, 'projects', id), data, { merge: true });
    } catch (error) {
      console.warn(`Unable to update project ${id}`, error);
      throw error;
    }
  };

  const deleteProject = async (id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id));

    if (!db) {
      console.warn('Firestore is not configured. Project changes are only applied locally.');
      return;
    }

    try {
      await deleteDoc(doc(db, 'projects', id));
    } catch (error) {
      console.warn(`Unable to delete project ${id}`, error);
      throw error;
    }
  };

  const addBlogPost = async (data: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newDocRef = doc(collection(db, 'blogPosts'));
    const timestamp = new Date().toISOString();
    const payload: BlogPost = {
      ...data,
      id: newDocRef.id,
      slug: data.slug?.trim() || slugify(data.title ?? newDocRef.id),
      createdAt: timestamp,
      updatedAt: timestamp
    };

    setBlogPosts(prev => [...prev, payload]);

    if (!db) {
      console.warn('Firestore is not configured. Blog post changes are only applied locally.');
      return;
    }

    try {
      await setDoc(newDocRef, payload, { merge: true });
    } catch (error) {
      console.warn('Unable to add blog post', error);
      throw error;
    }
  };

  const updateBlogPost = async (id: string, data: Partial<BlogPost>) => {
    const timestamp = new Date().toISOString();
    setBlogPosts(prev =>
      prev.map(post =>
        post.id === id
          ? {
              ...post,
              ...data,
              slug: data.slug?.trim() || post.slug,
              updatedAt: timestamp
            }
          : post
      )
    );

    if (!db) {
      console.warn('Firestore is not configured. Blog post changes are only applied locally.');
      return;
    }

    try {
      await setDoc(
        doc(db, 'blogPosts', id),
        {
          ...data,
          slug: data.slug?.trim(),
          updatedAt: timestamp
        },
        { merge: true }
      );
    } catch (error) {
      console.warn(`Unable to update blog post ${id}`, error);
      throw error;
    }
  };

  const deleteBlogPost = async (id: string) => {
    setBlogPosts(prev => prev.filter(post => post.id !== id));

    if (!db) {
      console.warn('Firestore is not configured. Blog post deletions are only applied locally.');
      return;
    }

    try {
      await deleteDoc(doc(db, 'blogPosts', id));
    } catch (error) {
      console.warn(`Unable to delete blog post ${id}`, error);
      throw error;
    }
  };

  const updateTestimonial = (id: string, data: Partial<Testimonial>) => {
    setTestimonials(prev => prev.map(item => item.id === id ? { ...item, ...data } : item));
  };
  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(item => item.id !== id));
  };
  const addTestimonial = (data: Omit<Testimonial, 'id'>) => {
    const newId = Math.random().toString(36).substr(2, 9);
    setTestimonials(prev => [...prev, { ...data, id: newId }]);
  };

  const updatePricing = async (id: string, data: Partial<PricingTier>) => {
    setPricing(prev => prev.map(item => item.id === id ? { ...item, ...data } : item));

    if (!db) {
      console.warn('Firestore is not configured. Pricing changes are only applied locally.');
      return;
    }

    try {
      await setDoc(doc(db, 'pricingTiers', id), data, { merge: true });
    } catch (error) {
      console.warn(`Unable to persist pricing tier ${id}`, error);
      throw error;
    }
  };

  const updateFaq = (id: string, data: Partial<FaqItem>) => {
    setFaqs(prev => prev.map(item => item.id === id ? { ...item, ...data } : item));
  };
  const addFaq = (data: Omit<FaqItem, 'id'>) => {
    const newId = Math.random().toString(36).substr(2, 9);
    setFaqs(prev => [...prev, { ...data, id: newId }]);
  };
  const deleteFaq = (id: string) => {
    setFaqs(prev => prev.filter(item => item.id !== id));
  };

  const updateHomepageSettings = async (data: Partial<HomepageSettings>) => {
    setHomepageSettings(prev => ({ ...prev, ...data }));
    try {
      await setDoc(doc(db, 'siteSettings', 'homepage'), data, { merge: true });
    } catch (error) {
      console.warn('Unable to update homepage settings', error);
    }
  };

  const updateHomepageContent = async (data: Partial<HomepageContent>) => {
    setHomepageContent(prev => ({ ...prev, ...data }));
    try {
      await setDoc(doc(db, 'siteSettings', 'homepageContent'), data, { merge: true });
    } catch (error) {
      console.warn('Unable to update homepage content', error);
    }
  };

  const updateSocialLinks = async (data: Partial<SocialLinks>) => {
    setSocialLinks(prev => ({ ...prev, ...data }));
    try {
      await setDoc(doc(db, 'siteSettings', 'socialLinks'), data, { merge: true });
    } catch (error) {
      console.warn('Unable to update social links', error);
    }
  };

  const updateAboutPageSettings = async (data: Partial<AboutPageSettings>) => {
    setAboutPageSettings(prev => ({ ...prev, ...data }));
    try {
      console.log('Attempting to update aboutPage settings. Auth user:', auth?.currentUser?.email);
      await setDoc(doc(db, 'siteSettings', 'aboutPage'), data, { merge: true });
      console.log('Successfully updated aboutPage settings');
    } catch (error: any) {
      console.error('Firebase permission error detail:', {
        code: error.code,
        message: error.message,
        path: 'siteSettings/aboutPage',
        isAuthenticated: !!auth?.currentUser
      });
      throw error;
    }
  };

  const updatePricingPage = async (id: PricingPageId, data: Partial<PricingPageContent>) => {
    const timestamp = new Date().toISOString();
    setPricingPages(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        ...data,
        updatedAt: timestamp
      }
    }));
    try {
      await setDoc(doc(db, 'pricingPages', id), { ...data, updatedAt: timestamp }, { merge: true });
    } catch (error) {
      console.warn(`Unable to update pricing page ${id}`, error);
      throw error;
    }
  };

  const resetData = () => {
    setServices(SERVICES);
    setTestimonials(TESTIMONIALS);
    setPricing(PRICING_TIERS);
    setFaqs(FAQ_ITEMS);
    setServiceDetails(SERVICE_DETAILS);
    setHomepageSettings(DEFAULT_HOMEPAGE_SETTINGS);
    setHomepageContent(DEFAULT_HOMEPAGE_CONTENT);
    setSocialLinks(DEFAULT_SOCIAL_LINKS);
    setAboutPageSettings(DEFAULT_ABOUT_PAGE_SETTINGS);
    setPricingPages(DEFAULT_PRICING_PAGE_CONTENT);
    localStorage.clear();
  };

  return (
    <DataContext.Provider value={{
      services,
      testimonials,
      pricing,
      faqs,
      serviceDetails,
      homepageSettings,
      homepageContent,
      socialLinks,
      aboutPageSettings,
      pricingPages,
      projects,
      blogPosts,
      updateService,
      updateTestimonial,
      deleteTestimonial,
      addTestimonial,
      updatePricing,
      updateFaq,
      addFaq,
      deleteFaq,
      updatePricingPage,
      updateHomepageSettings,
      updateHomepageContent,
      updateSocialLinks,
      updateAboutPageSettings,
      addProject,
      updateProject,
      deleteProject,
      addBlogPost,
      updateBlogPost,
      deleteBlogPost,
      resetData
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
