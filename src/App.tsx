import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import Footer from './components/Footer';
import ServicesPage from './components/ServicesPage';
import PricingPage from './components/PricingPage';
import GalleryPage from './components/GalleryPage';
import CarCarePage from './components/CarCarePage';
import FAQPage from './components/FAQPage';
import FAQAIPage from './components/FAQAIPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import PrivacyPage from './components/PrivacyPage';
import ThemeToggle from './components/ThemeToggle';
import AppointmentModal from './components/AppointmentModal';
import Logo from './components/Logo';
import WrapBrands from './components/WrapBrands';
import ConfiguratorPage from './components/ConfiguratorPage';
import NavigationItems from './components/Navigation/NavigationItems';
import { CookieNotification } from './components/CookieConsent';
import { initializeGA, trackPageView } from './lib/analytics/google-analytics';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  useEffect(() => {
    // Initialize Google Analytics
    initializeGA();
  }, []);

  useEffect(() => {
    // Track page views when currentPage changes
    trackPageView(`/${currentPage === 'home' ? '' : currentPage}`);
  }, [currentPage]);

  useEffect(() => {
    const handleNavigation = (e: CustomEvent) => {
      setCurrentPage(e.detail);
    };
    window.addEventListener('navigate' as any, handleNavigation);
    return () => window.removeEventListener('navigate' as any, handleNavigation);
  }, []);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <HelmetProvider>
      <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <Helmet>
          <title>Kustom Auto Wrx | Gainesville Auto Customization Experts</title>
          <meta name="description" content="Transform your vehicle with Gainesville's premier auto customization studio. Expert vehicle wraps, custom paint, and professional modifications." />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="canonical" href="https://kustomautowrx.com" />
          <meta name="google-site-verification" content="468460573" />
        </Helmet>

        <ThemeToggle isDark={isDark} toggle={() => setIsDark(!isDark)} />
        
        <header className="fixed w-full z-50">
          <nav className="bg-black/50 backdrop-blur-sm border-b border-white/10">
            <div className="flex justify-center items-center py-4 border-b border-white/10">
              <Logo />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-center">
                <div className="hidden lg:flex items-center space-x-6 py-4">
                  <NavigationItems
                    currentPage={currentPage}
                    isMobile={false}
                    onPageChange={setCurrentPage}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsAppointmentOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Book Now
                  </motion.button>
                </div>

                <button
                  className="lg:hidden p-4"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label="Toggle navigation menu"
                >
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                </button>
              </div>
            </div>

            <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} lg:hidden`}>
              <div className="px-4 pt-2 pb-4 space-y-2">
                <NavigationItems
                  currentPage={currentPage}
                  isMobile={true}
                  onPageChange={setCurrentPage}
                  onMobileClose={() => setIsMobileMenuOpen(false)}
                />
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setIsAppointmentOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Book Now
                </motion.button>
              </div>
            </div>
          </nav>
        </header>

        <main className="min-h-screen pt-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={{ duration: 0.3 }}
            >
              {currentPage === 'home' && <Hero onOpenAppointment={() => setIsAppointmentOpen(true)} />}
              {currentPage === 'services' && <ServicesPage onOpenAppointment={() => setIsAppointmentOpen(true)} />}
              {currentPage === 'wrap-brands' && <WrapBrands />}
              {currentPage === 'configurator' && <ConfiguratorPage />}
              {currentPage === 'pricing' && <PricingPage onOpenAppointment={() => setIsAppointmentOpen(true)} />}
              {currentPage === 'car-care' && <CarCarePage />}
              {currentPage === 'gallery' && <GalleryPage />}
              {currentPage === 'faq' && <FAQPage />}
              {currentPage === 'faqai' && <FAQAIPage />}
              {currentPage === 'about' && <AboutPage />}
              {currentPage === 'contact' && <ContactPage />}
              {currentPage === 'privacy' && <PrivacyPage />}
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer />
        
        <AppointmentModal
          isOpen={isAppointmentOpen}
          onClose={() => setIsAppointmentOpen(false)}
        />

        <CookieNotification />
      </div>
    </HelmetProvider>
  );
}

export default App;