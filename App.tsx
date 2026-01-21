import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import AiAutomationPricing from './pages/AiAutomationPricing';
import AppDevelopmentPricing from './pages/AppDevelopmentPricing';
import CloudSolutionsPricing from './pages/CloudSolutionsPricing';
import DataAnalysisPricing from './pages/DataAnalysisPricing';
import WebDevPricing from './pages/WebDevPricing';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import BlogPostPage from './pages/BlogPostPage';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Admin from './pages/Admin';
import AdminAbout from './pages/AdminAbout';
import AdminServices from './pages/AdminServices';
import AdminPricing from './pages/AdminPricing';
import AdminPortfolio from './pages/AdminPortfolio';
import AdminBlog from './pages/AdminBlog';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CustomCursor from './components/CustomCursor';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import EmailCaptureModal from './components/EmailCaptureModal';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

// Scroll to top on route change
const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

const GenericPage = ({ title }: { title: string }) => (
    <div className="min-h-screen pt-32 pb-12 px-4 max-w-7xl mx-auto relative z-10">
        <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">{title}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">Content for {title} page would go here. This is a placeholder for the routing structure.</p>
    </div>
);

const EMAIL_MODAL_STORAGE_KEY = 'aurexis-email-capture';

const AppRoutes: React.FC<{ darkMode: boolean; toggleDarkMode: () => void }> = ({ darkMode, toggleDarkMode }) => {
  const location = useLocation();
  const hideChrome = location.pathname.startsWith('/admin') || location.pathname.startsWith('/logout');
  const [showEmailModal, setShowEmailModal] = useState(false);

  const modalEligible = useMemo(() => !hideChrome && !location.pathname.startsWith('/login'), [hideChrome, location.pathname]);

  useEffect(() => {
    if (!modalEligible) {
      setShowEmailModal(false);
      return;
    }

    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem(EMAIL_MODAL_STORAGE_KEY);
      const hasOpted = Boolean(stored);
      if (!hasOpted) {
        setShowEmailModal(true);
      }
    }

    return undefined;
  }, [modalEligible, location.pathname]);

  const handleModalDismiss = (result: 'dismissed' | 'subscribed') => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(
        EMAIL_MODAL_STORAGE_KEY,
        JSON.stringify({ status: result, timestamp: new Date().toISOString() })
      );
    }
    setShowEmailModal(false);
  };

  return (
    <>
      {!hideChrome && (
        <Navbar 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode}
        />
      )}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
        <Route path="/pricing/ai" element={<AiAutomationPricing />} />
        <Route path="/app-development" element={<AppDevelopmentPricing />} />
        <Route path="/data-analysis" element={<DataAnalysisPricing />} />
        <Route path="/web-development" element={<WebDevPricing />} />
        <Route path="/cloud-solutions" element={<CloudSolutionsPricing />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path="/admin/about" element={<ProtectedRoute><AdminAbout /></ProtectedRoute>} />
        <Route path="/admin/services" element={<ProtectedRoute><AdminServices /></ProtectedRoute>} />
        <Route path="/admin/pricing" element={<ProtectedRoute><AdminPricing /></ProtectedRoute>} />
        <Route path="/admin/portfolio" element={<ProtectedRoute><AdminPortfolio /></ProtectedRoute>} />
        <Route path="/admin/blog" element={<ProtectedRoute><AdminBlog /></ProtectedRoute>} />
        <Route path="/logout" element={<Logout />} />
      </Routes>

      {!hideChrome && <Footer />}
      <EmailCaptureModal isOpen={modalEligible && showEmailModal} onDismiss={handleModalDismiss} />
    </>
  );
};

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <AuthProvider>
      <DataProvider>
        <Router>
        <ScrollToTop />
        {/* 
          Global Fluid Animated Background 
          - Works across all routes
          - Adjusts for Light/Dark mode via CSS classes in index.html
        */}
        <div className="animated-bg">
          <div className="bg-orb orb-1"></div>
          <div className="bg-orb orb-2"></div>
          <div className="bg-orb orb-3"></div>
          <div className="noise-overlay"></div>
        </div>
        
        {/* Custom Mouse Cursor */}
        <CustomCursor />
        
        <div className="min-h-screen text-gray-900 dark:text-white font-sans transition-colors duration-300 relative">
          <AppRoutes darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
};

export default App;