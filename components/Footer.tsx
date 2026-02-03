import React from 'react';
import { Facebook, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

const Footer: React.FC = () => {
  const { socialLinks } = useData();
  const resolvedLinks = {
    linkedin: socialLinks.linkedin || '#',
    facebook: socialLinks.facebook || '#',
    instagram: socialLinks.instagram || '#'
  };

  const companyLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Careers', href: '/careers' },
    { label: 'Blog', href: '/blog' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' }
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Aurexis<span className="text-blue-500">Solution</span>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Transforming businesses through intelligent technology, modern design, and robust automation.
            </p>
            <div className="flex space-x-4">
              <a href={resolvedLinks.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors"><Linkedin size={20} /></a>
              <a href={resolvedLinks.facebook} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors"><Facebook size={20} /></a>
              <a href={resolvedLinks.instagram} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors"><Instagram size={20} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Services</h4>
            <ul className="space-y-2">
              {['Web Development', 'App Development', 'AI Automation', 'Cloud Solutions', 'Data Analysis'].map((item) => (
                <li key={item}><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 text-sm transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-gray-600 dark:text-gray-400 hover:text-blue-500 text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-600 dark:text-gray-400 text-sm">
                <MapPin size={18} className="mt-0.5 text-blue-500 shrink-0" />
                <span>Sungai Petani,<br />Kedah, Malaysia</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400 text-sm">
                <Phone size={18} className="text-blue-500 shrink-0" />
                <span>+60 16-407 1129</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400 text-sm">
                <Mail size={18} className="text-blue-500 shrink-0" />
                <span>contact@aurexissolution.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Aurexis Solution. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-500 dark:text-gray-400">
             <Link to="/privacy" className="hover:text-blue-500">Privacy Policy</Link>
             <Link to="/terms" className="hover:text-blue-500">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;