
import React, { memo, useState, useEffect, useMemo, useRef } from 'react';
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { SERVICES, PRICING_TIERS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [pricingDropdownOpen, setPricingDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobilePricingOpen, setMobilePricingOpen] = useState(false);
  const navigate = useNavigate();
  const { homepageSettings, services, pricing } = useData();
  const logoUrl = useMemo(() => homepageSettings.logoUrl?.trim() ?? '', [homepageSettings.logoUrl]);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const pricingDropdownRef = useRef<HTMLDivElement>(null);
  
  const availableServices = useMemo(() => {
    return services.length > 0 ? services : SERVICES;
  }, [services]);

  const availablePricing = useMemo(() => {
    return pricing.length > 0 ? pricing : PRICING_TIERS;
  }, [pricing]);

  const resolvePricingRoute = (tier: (typeof availablePricing)[number]) => {
    const routeMap: Record<string, string> = {
      ai: '/pricing/ai',
      'ai-automation': '/pricing/ai',
      app: '/app-development',
      'app-development': '/app-development',
      web: '/web-development',
      'web-development': '/web-development',
      cloud: '/cloud-solutions',
      'cloud-solutions': '/cloud-solutions',
      data: '/data-analysis',
      'data-analysis': '/data-analysis'
    };

    const normalize = (value?: string) => value?.trim().toLowerCase().replace(/\s+/g, '-');
    const candidates = [tier.id, normalize(tier.id), tier.name, normalize(tier.name)].filter(Boolean) as string[];

    for (const key of candidates) {
      const normalized = normalize(key) ?? key;
      if (normalized && routeMap[normalized]) {
        return routeMap[normalized];
      }
    }

    const fallbackSlug = normalize(tier.id ?? tier.name) ?? 'cloud';
    return `/services/${fallbackSlug}`;
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
        setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    if (servicesDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [servicesDropdownOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pricingDropdownRef.current && !pricingDropdownRef.current.contains(event.target as Node)) {
        setPricingDropdownOpen(false);
      }
    };
    if (pricingDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [pricingDropdownOpen]);

  useEffect(() => {
    if (!isOpen) {
      setServicesDropdownOpen(false);
      setPricingDropdownOpen(false);
      setMobileServicesOpen(false);
      setMobilePricingOpen(false);
    }
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    // Services and Pricing handled separately
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleNav = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
        ? 'bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50 py-2' 
        : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* LEFT SIDE: Logo */}
          <div 
            className="flex-shrink-0 cursor-pointer flex items-center gap-2.5 group" 
            onClick={() => handleNav('/')}
          >
            {/* Compact Logo Container */}
            <div className="relative h-10 w-10 rounded-xl border-2 border-white dark:border-slate-800 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-blue-300 dark:group-hover:border-blue-600 group-hover:shadow-md">
              {/* Light blue square background */}
              <div className="h-8 w-8 rounded-lg bg-blue-100/80 dark:bg-blue-900/40 flex items-center justify-center">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt="Aurexis Solution logo"
                    className="h-6 w-6 object-contain"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                  <div className="flex flex-col items-center justify-center px-1">
                    {/* Network icon above E */}
                    <div className="mb-0.5">
                      <svg width="6" height="4" viewBox="0 0 6 4" className="text-slate-500">
                        <circle cx="1" cy="1" r="0.5" fill="currentColor" />
                        <circle cx="3" cy="1" r="0.5" fill="currentColor" />
                        <circle cx="5" cy="1" r="0.5" fill="currentColor" />
                        <line x1="1" y1="1" x2="3" y2="1" stroke="currentColor" strokeWidth="0.3" />
                        <line x1="3" y1="1" x2="5" y2="1" stroke="currentColor" strokeWidth="0.3" />
                      </svg>
                    </div>
                    {/* AUREXIS with blue E */}
                    <div className="text-[5px] font-black text-slate-900 dark:text-slate-100 leading-tight tracking-tight">
                      AUR<span className="text-blue-600 dark:text-blue-400">E</span>XIS
                    </div>
                    {/* SOLUTION */}
                    <div className="text-[4px] font-medium text-slate-600 dark:text-slate-400 leading-tight">
                      SOLUTION
                    </div>
                    {/* 3D cube/diamond below */}
                    <div className="mt-0.5">
                      <svg width="5" height="5" viewBox="0 0 5 5" className="text-blue-500">
                        <path d="M2.5 0 L5 2.5 L2.5 5 L0 2.5 Z" fill="currentColor" />
                      </svg>
                    </div>
                </div>
              )}
              </div>
            </div>
            
            {/* Brand Name - Compact */}
            <div className="hidden sm:block">
              <span className="text-lg font-semibold text-slate-900 dark:text-white">
                Aurexis
              </span>
              <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                Solution
              </span>
            </div>
            <div className="sm:hidden">
              <span className="text-base font-semibold text-slate-900 dark:text-white">
              AS
            </span>
            </div>
          </div>

          {/* CENTER: Desktop Menu */}
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-8">
              <button
                onClick={() => handleNav('/')}
                className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Home
              </button>
              
              <button
                onClick={() => handleNav('/about')}
                className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                About
              </button>

              {/* Services Dropdown */}
              <div className="relative" ref={servicesDropdownRef}>
                <button
                  onClick={() => {
                    setServicesDropdownOpen(!servicesDropdownOpen);
                  }}
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                  className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 group"
                >
                  Services
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform duration-200 group-hover:text-blue-500 ${servicesDropdownOpen ? 'rotate-180 text-blue-600' : ''}`}
                  />
                </button>
                
                <AnimatePresence>
                  {servicesDropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-72 bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-800/50 py-3 z-50 overflow-hidden"
                      onMouseLeave={() => setServicesDropdownOpen(false)}
                    >
                      <div className="flex flex-col p-1">
                        {availableServices.map((service) => {
                          const IconComponent = Icons[service.icon as keyof typeof Icons] as React.ElementType || Icons.Globe;
                          return (
                            <button
                              key={service.id}
                              onClick={() => {
                                handleNav(`/services/${service.id}`);
                                setServicesDropdownOpen(false);
                              }}
                              className="w-full text-left px-4 py-3 text-sm rounded-xl text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 group transition-all flex items-start gap-3"
                            >
                              <div className="flex-shrink-0 mt-0.5 p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                <IconComponent size={16} />
                              </div>
                              <div>
                                <span className="font-semibold block text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                  {service.title}
                                </span>
                                <span className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5 group-hover:text-slate-600 dark:group-hover:text-slate-300">
                                  {service.description}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Pricing Dropdown */}
              <div className="relative" ref={pricingDropdownRef}>
                <button
                  onClick={() => {
                    setPricingDropdownOpen(!pricingDropdownOpen);
                  }}
                  onMouseEnter={() => setPricingDropdownOpen(true)}
                  className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 group"
                >
                  Pricing
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 group-hover:text-blue-500 ${pricingDropdownOpen ? 'rotate-180 text-blue-600' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {pricingDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-80 bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-800/50 py-3 z-50 overflow-hidden"
                      onMouseLeave={() => setPricingDropdownOpen(false)}
                    >
                      <div className="flex flex-col p-1">
                        {availablePricing.map((tier) => (
                          <button
                            key={tier.id}
                            onClick={() => {
                              handleNav(resolvePricingRoute(tier));
                              setPricingDropdownOpen(false);
                            }}
                            className="w-full text-left px-4 py-3 text-sm rounded-xl text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 group transition-all flex gap-3 items-start"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                                  {tier.name}
                                </span>
                                {tier.recommended && (
                                  <span className="text-[10px] font-semibold uppercase tracking-wide text-purple-600 dark:text-purple-300 bg-purple-100/80 dark:bg-purple-900/30 px-2 py-0.5 rounded-full">
                                    Recommended
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                                {tier.features.slice(0, 2).join(' • ')}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-base font-semibold text-purple-600 dark:text-purple-300">
                                {tier.price}
                              </div>
                              {tier.note && (
                                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                                  {tier.note}
                                </div>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navLinks.filter(link => link.name !== 'Home' && link.name !== 'About').map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNav(link.path)}
                  className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: Controls & Actions */}
          <div className="flex items-center gap-4">
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Desktop Login CTA */}
            <button
              onClick={() => handleNav('/login')}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all"
            >
              <span>Welcome Back</span>
            </button>
            
            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-blue-500 focus:outline-none"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNav(link.path)}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:bg-gray-50 dark:hover:bg-gray-900 block w-full text-left px-3 py-3 rounded-lg text-base font-medium transition-colors"
                >
                  {link.name}
                </button>
              ))}
              
              {/* Mobile Services Dropdown */}
              <div className="space-y-1">
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:bg-gray-50 dark:hover:bg-gray-900 block w-full text-left px-3 py-3 rounded-lg text-base font-medium transition-colors flex items-center justify-between"
                >
                  Services
                  <ChevronDown 
                    size={20} 
                    className={`transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 space-y-1 overflow-hidden"
                    >
                      {availableServices.map((service) => (
                        <button
                          key={service.id}
                          onClick={() => {
                            handleNav(`/services/${service.id}`);
                            setMobileServicesOpen(false);
                          }}
                          className="text-gray-600 dark:text-gray-400 hover:text-blue-500 hover:bg-gray-50 dark:hover:bg-gray-900 block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50"></span>
                          {service.title}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="space-y-1">
                <button
                  onClick={() => setMobilePricingOpen(!mobilePricingOpen)}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:bg-gray-50 dark:hover:bg-gray-900 block w-full text-left px-3 py-3 rounded-lg text-base font-medium transition-colors flex items-center justify-between"
                >
                  Pricing
                  <ChevronDown
                    size={20}
                    className={`transition-transform duration-200 ${mobilePricingOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {mobilePricingOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 space-y-1 overflow-hidden"
                    >
                      {availablePricing.map((tier) => (
                        <button
                          key={tier.id}
                          onClick={() => {
                            handleNav(resolvePricingRoute(tier));
                            setMobilePricingOpen(false);
                          }}
                          className="text-gray-600 dark:text-gray-400 hover:text-purple-500 hover:bg-gray-50 dark:hover:bg-gray-900 block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50"></span>
                          {tier.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <button
                onClick={() => handleNav('/login')}
                className="w-full text-left px-3 py-3 rounded-lg text-base font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 hover:opacity-90 transition mt-4"
              >
                Welcome Back
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default memo(Navbar);
