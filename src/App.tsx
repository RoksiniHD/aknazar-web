import React from 'react';
import { Menu, X, ArrowRight, Shield, Award, Globe, Users, Heart, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLanguageContext } from './hooks/useLanguage';
import WorkshopsPage from './components/WorkshopsPage';
import ContactPage from './components/ContactPage';
import ProductsPage from './components/ProductsPage';
import BlogPage from './components/BlogPage';

function App() {
  const { currentLanguage, changeLanguage, t, getLanguageDisplay } = useLanguageContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const [hasNavigatedToHome, setHasNavigatedToHome] = useState(false);

  const fabricCards = [
    {
      image: 'https://plus.unsplash.com/premium_photo-1675799745794-914dcb172a0f?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: t('knitFabrics'),
      description: t('knitDescription')
    },
    {
      image: 'https://plus.unsplash.com/premium_photo-1673469111857-a73b7331962b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: t('flatKnit'),
      description: t('flatKnitDescription')
    },
    {
      image: 'https://plus.unsplash.com/premium_photo-1754143399857-e5265eb26b26?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: t('laceTextiles'),
      description: t('laceDescription')
    },
    {
      image: 'https://plus.unsplash.com/premium_photo-1747054588078-696772a1b18d?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: t('crochetFabrics'),
      description: t('crochetDescription')
    },
    {
      image: 'https://cdn11.bigcommerce.com/s-z9t2ne/images/stencil/1280x1280/products/52242/482146/pkl-studio-merge-woven-jacquard-burnished__52614.1685490192.jpg?c=2?imbypass=on',
      title: t('jacquardWeaves'),
      description: t('jacquardDescription')
    },
    {
      image: 'https://images.unsplash.com/photo-1598616068517-c75ad397a436?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: t('organicCotton'),
      description: t('organicCottonDescription')
    },
    {
      image: 'https://www.furnituretoday.com/wp-content/uploads/2023/08/PERF-Valdese-Weavers-Sustain_QueenBey_1.jpg',
      title: t('performanceBlends'),
      description: t('performanceDescription')
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    // Hero animation
    // Reset section animations when navigating to home (but keep hero visible)
    if (currentPage === 'home') {
      setVisibleSections([]);
      setHasNavigatedToHome(true);
    }
  }, [currentPage]);

  // Hero animation
  useEffect(() => {
    const heroTimer = setTimeout(() => {
      setIsHeroVisible(true);
    }, 100);

    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const nextSlide = prev + 1;
        // Reset to 0 when we reach the end of original cards
        if (nextSlide >= fabricCards.length) {
          return 0;
        }
        return nextSlide;
      });
    }, 3000); // Change slide every 3 seconds

    return () => {
      clearTimeout(heroTimer);
      clearInterval(interval);
    };
  }, [fabricCards.length, hasNavigatedToHome]);

  // Scroll animation for sections
  useEffect(() => {
    // Clear previous observers
    setVisibleSections([]);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('data-section-id');
            if (sectionId) {
              setVisibleSections(prev => [...new Set([...prev, sectionId])]);
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    // Use setTimeout to ensure DOM is ready after navigation
    const timeoutId = setTimeout(() => {
      const sectionElements = document.querySelectorAll('[data-section-id]');
      sectionElements.forEach(el => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [currentPage, hasNavigatedToHome]);

  const scrollToJourney = () => {
    const journeySection = document.getElementById('journey-section');
    if (journeySection) {
      journeySection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navigateToWorkshops = () => {
    setCurrentPage('workshops');
    window.scrollTo(0, 0);
  };

  const navigateToContact = () => {
    setCurrentPage('contact');
    window.scrollTo(0, 0);
  };

  const navigateToProducts = () => {
    setCurrentPage('products');
    window.scrollTo(0, 0);
  };

  const navigateToBlog = () => {
    setCurrentPage('blog');
    window.scrollTo(0, 0);
  };

  const navigateToWorkshopSection = (section: string) => {
    setCurrentPage('workshops');
    // Use setTimeout to ensure the page renders before scrolling
    setTimeout(() => {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const navigateToHome = () => {
    setCurrentPage('home');
    window.scrollTo(0, 0);
    setHasNavigatedToHome(true);
  };

  const handleLanguageSelect = (language: string) => {
    const langCode = language === 'English' ? 'en' : language === 'Русский' ? 'ru' : 'uz';
    changeLanguage(langCode);
    setIsLanguageOpen(false);
  };

  if (currentPage === 'workshops') {
    return <WorkshopsPage onNavigateHome={navigateToHome} onNavigateToContact={navigateToContact} onNavigateToProducts={navigateToProducts} onNavigateToBlog={navigateToBlog} />;
  }

  if (currentPage === 'contact') {
    return <ContactPage onNavigateHome={navigateToHome} onNavigateToWorkshops={navigateToWorkshops} onNavigateToProducts={navigateToProducts} onNavigateToBlog={navigateToBlog} />;
  }

  if (currentPage === 'products') {
    return <ProductsPage onNavigateHome={navigateToHome} onNavigateToWorkshops={navigateToWorkshops} onNavigateToContact={navigateToContact} onNavigateToBlog={navigateToBlog} />;
  }

  if (currentPage === 'blog') {
    return <BlogPage onNavigateHome={navigateToHome} onNavigateToWorkshops={navigateToWorkshops} onNavigateToContact={navigateToContact} onNavigateToProducts={navigateToProducts} />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Announcement Bar */}
      <div className="bg-[#F5F3EE] py-2 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center text-sm">
          {/* Shipping Information */}
          <div className="mb-2 sm:mb-0">
            <p className="text-[#666666] font-medium">
              {t('shippingInfo')}
            </p>
          </div>
          
          {/* Language Selection and Business Hours */}
          <div className="flex items-center space-x-6">
            {/* Language Selection */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-2 text-[#666666] hover:text-[#2F463E] transition-colors px-3 py-1 rounded hover:bg-white hover:bg-opacity-50"
              >
                <span>{getLanguageDisplay(currentLanguage)}</span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 ${isLanguageOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              {isLanguageOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[120px] z-50">
                  <button
                    onClick={() => handleLanguageSelect('English')}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors text-sm"
                  >
                    English
                  </button>
                  <button
                    onClick={() => handleLanguageSelect('Русский')}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors text-sm"
                  >
                    Русский
                  </button>
                  <button
                    onClick={() => handleLanguageSelect("O'zbek")}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors text-sm"
                  >
                    O'zbek
                  </button>
                </div>
              )}
            </div>
            
            {/* Business Hours */}
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-[#666666]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-[#666666] font-medium">{t('businessHours')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#2F463E] shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-white text-2xl font-bold tracking-wide">
                Aknazar Textile
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button onClick={navigateToHome} className="text-white hover:text-gray-200 transition-colors font-medium text-sm">
                {t('home')}
              </button>
              <button onClick={navigateToProducts} className="text-white hover:text-gray-200 transition-colors font-medium text-sm">
                {t('products')}
              </button>
              <button onClick={navigateToWorkshops} className="text-white hover:text-gray-200 transition-colors font-medium text-sm">
                {t('production')}
              </button>
              <button onClick={scrollToJourney} className="text-white hover:text-gray-200 transition-colors font-medium text-sm">
                {t('aboutUs')}
              </button>
              <button onClick={navigateToBlog} className="text-white hover:text-gray-200 transition-colors font-medium text-sm">
                {t('blog')}
              </button>
              <button onClick={navigateToContact} className="text-white hover:text-gray-200 transition-colors font-medium text-sm">
                {t('contact')}
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t border-green-600 pt-4">
              <div className="flex flex-col space-y-3">
                <button onClick={navigateToHome} className="text-white hover:text-gray-200 transition-colors font-medium text-sm text-left">
                  {t('home')}
                </button>
                <button onClick={navigateToProducts} className="text-white hover:text-gray-200 transition-colors font-medium text-sm text-left">
                  {t('products')}
                </button>
                <button onClick={navigateToWorkshops} className="text-white hover:text-gray-200 transition-colors font-medium text-sm text-left">
                  {t('production')}
                </button>
                <button onClick={scrollToJourney} className="text-white hover:text-gray-200 transition-colors font-medium text-sm text-left">
                  {t('aboutUs')}
                </button>
                <button onClick={navigateToBlog} className="text-white hover:text-gray-200 transition-colors font-medium text-sm text-left">
                  {t('blog')}
                </button>
                <button onClick={navigateToContact} className="text-white hover:text-gray-200 transition-colors font-medium text-sm text-left">
                  {t('contact')}
                </button>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1675176785803-bffbbb0cd2f4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#2F463E] bg-opacity-40" />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-2xl">
            <h1 className={`text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 transition-all duration-1000 ${
              isHeroVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}>
              {t('heroTitle')}
            </h1>
            
            <p className={`text-white text-lg md:text-xl leading-relaxed mb-8 max-w-xl transition-all duration-1000 delay-200 ${
              isHeroVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}>
              {t('heroSubtitle')}
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-400 ${
              isHeroVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}>
              <button onClick={navigateToProducts} className="bg-[#2F463E] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#3a5a4e] transition-all duration-300 flex items-center justify-center group">
                {t('exploreFabrics')}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Workshops Section */}
      <section 
        className="py-16 bg-[#F5F3EE]"
        data-section-id="workshops-section"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className={`text-center mb-12 transition-all duration-1000 ${
            visibleSections.includes('workshops-section')
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2F463E] mb-4">{t('ourWorkshops')}</h2>
            <p className="text-lg text-[#666666] max-w-3xl mx-auto">
              {t('workshopsDescription')}
            </p>
          </div>

          {/* Workshop Cards */}
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 delay-200 ${
            visibleSections.includes('workshops-section')
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}>
            {/* Knitting Workshop */}
            <div 
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <div className="bg-[#F5F3EE] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#2F463E] transition-colors duration-300">
                <svg className="w-8 h-8 text-[#2F463E] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2F463E] mb-3 text-center">{t('knitting')}</h3>
              <p className="text-[#666666] text-sm text-center leading-relaxed">
                {t('knittingDescription')}
              </p>
              <div className="mt-4 text-center">
                <button
                  onClick={() => navigateToWorkshopSection('knitting')}
                  className="inline-flex items-center px-4 py-2 bg-[#2F463E] text-white text-sm font-medium rounded-lg hover:bg-[#3a5a4e] transition-all duration-300 transform hover:scale-105 group/btn"
                >
                  {t('learnMore')}
                  <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Dyeing Workshop */}
            <div 
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <div className="bg-[#F5F3EE] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#2F463E] transition-colors duration-300">
                <svg className="w-8 h-8 text-[#2F463E] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 3H5a2 2 0 00-2 2v12a4 4 0 004 4h2a2 2 0 002-2V5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2F463E] mb-3 text-center">Dyeing</h3>
              <p className="text-[#666666] text-sm text-center leading-relaxed">
                Color that lasts. Our dyeing unit ensures consistent shades and eco-friendly processes.
              </p>
              <div className="mt-4 text-center">
                <button
                  onClick={() => navigateToWorkshopSection('dyeing')}
                  className="inline-flex items-center px-4 py-2 bg-[#2F463E] text-white text-sm font-medium rounded-lg hover:bg-[#3a5a4e] transition-all duration-300 transform hover:scale-105 group/btn"
                >
                  Learn More
                  <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Finishing Workshop */}
            <div 
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <div className="bg-[#F5F3EE] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#2F463E] transition-colors duration-300">
                <svg className="w-8 h-8 text-[#2F463E] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2F463E] mb-3 text-center">{t('finishing')}</h3>
              <p className="text-[#666666] text-sm text-center leading-relaxed">
                {t('finishingDescription')}
              </p>
              <div className="mt-4 text-center">
                <button
                  onClick={() => navigateToWorkshopSection('finishing')}
                  className="inline-flex items-center px-4 py-2 bg-[#2F463E] text-white text-sm font-medium rounded-lg hover:bg-[#3a5a4e] transition-all duration-300 transform hover:scale-105 group/btn"
                >
                  {t('learnMore')}
                  <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Quality Control Workshop */}
            <div 
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <div className="bg-[#F5F3EE] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#2F463E] transition-colors duration-300">
                <svg className="w-8 h-8 text-[#2F463E] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2F463E] mb-3 text-center">{t('qualityControl')}</h3>
              <p className="text-[#666666] text-sm text-center leading-relaxed">
                {t('qualityControlDescription')}
              </p>
              <div className="mt-4 text-center">
                <button
                  onClick={() => navigateToWorkshopSection('quality-control')}
                  className="inline-flex items-center px-4 py-2 bg-[#2F463E] text-white text-sm font-medium rounded-lg hover:bg-[#3a5a4e] transition-all duration-300 transform hover:scale-105 group/btn"
                >
                  {t('learnMore')}
                  <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Products Section */}
      <section 
        id="products-section" 
        className="py-20 bg-white"
        data-section-id="products-section"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className={`text-center mb-16 transition-all duration-1000 ${
            visibleSections.includes('products-section')
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">{t('ourPremiumFabrics')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('productsDescription')}
            </p>
          </div>

          {/* Product Carousel */}
          <div className={`overflow-hidden mb-12 transition-all duration-1000 delay-200 ${
            visibleSections.includes('products-section')
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}>
              <div 
                className="flex transition-transform duration-1000 ease-in-out"
                style={{ 
                  transform: window.innerWidth < 768 
                    ? `translateX(-${currentSlide * 100}%)` 
                    : `translateX(-${currentSlide * (100 / 4)}%)`
                }}
              >
                {[...fabricCards, ...fabricCards, ...fabricCards].map((card, index) => (
                  <div key={index} className="w-full md:w-1/4 flex-shrink-0 px-4">
                    <div className="group cursor-pointer">
                      <div className="relative overflow-hidden rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300">
                        <div 
                          className="h-64 bg-cover bg-center transition-all duration-500 group-hover:scale-110 group-hover:blur-sm"
                          style={{
                            backgroundImage: `url('${card.image}')`
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/80 transition-all duration-300" />
                        
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <h3 className="text-lg font-bold mb-2 transform group-hover:translate-y-1 transition-transform duration-300">{card.title}</h3>
                          <p className="text-sm text-gray-200 leading-relaxed transform group-hover:translate-y-1 transition-transform duration-300 group-hover:text-white">{card.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          {/* CTA Button */}
          <div className={`text-center transition-all duration-1000 delay-400 ${
            visibleSections.includes('products-section')
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}>
            <button onClick={navigateToProducts} className="bg-[#2F463E] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#3a5a4e] transition-all duration-300 flex items-center justify-center mx-auto group">
              {t('viewAllProducts')}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section 
        className="bg-gray-50 py-12"
        data-section-id="trust-section"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className={`text-center mb-8 transition-all duration-1000 ${
            visibleSections.includes('trust-section')
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}>
            <h2 className="text-gray-600 text-lg font-medium">
              {t('trustedByDesigners')}
            </h2>
          </div>
          
          <div className={`grid grid-cols-1 md:grid-cols-4 gap-8 text-center transition-all duration-1000 delay-200 ${
            visibleSections.includes('trust-section')
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}>
            <div className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-full mb-3 shadow-sm">
                <Shield className="w-8 h-8 text-[#2F463E]" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{t('isoCertified')}</h3>
              <p className="text-gray-600 text-sm">{t('qualityGuaranteed')}</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-full mb-3 shadow-sm">
                <Globe className="w-8 h-8 text-[#2F463E]" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{t('globalShipping')}</h3>
              <p className="text-gray-600 text-sm">{t('reliableDelivery')}</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-full mb-3 shadow-sm">
                <Award className="w-8 h-8 text-[#2F463E]" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{t('premiumQuality')}</h3>
              <p className="text-gray-600 text-sm">{t('traditionalCraftsmanship')}</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-full mb-3 shadow-sm">
                <Users className="w-8 h-8 text-[#2F463E]" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{t('expertSupport')}</h3>
              <p className="text-gray-600 text-sm">{t('freeConsultation')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Journey Section */}
      <section 
        id="journey-section" 
        className="py-20 bg-white"
        data-section-id="journey-section"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className={`text-center mb-16 transition-all duration-1000 ${
            visibleSections.includes('journey-section')
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">{t('ourJourney')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('journeyDescription')}
            </p>
          </div>

          {/* Timeline */}
          <div className={`relative mb-20 transition-all duration-1000 delay-200 ${
            visibleSections.includes('journey-section')
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}>
            {/* Timeline Line */}
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-[#2F463E] via-gray-300 to-[#2F463E]"></div>
            
            {/* Timeline Items */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {/* 1995 */}
              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-white border-4 border-[#2F463E] rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Heart className="w-6 h-6 text-[#2F463E]" />
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <h3 className="font-bold text-[#2F463E] text-xl mb-2">1995</h3>
                  <h4 className="font-semibold text-gray-800 mb-3">{t('humbleBeginnings')}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{t('humbleBeginnersDesc')}</p>
                </div>
              </div>

              {/* 2003 */}
              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-white border-4 border-[#2F463E] rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Globe className="w-6 h-6 text-[#2F463E]" />
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <h3 className="font-bold text-[#2F463E] text-xl mb-2">2003</h3>
                  <h4 className="font-semibold text-gray-800 mb-3">{t('firstExportSuccess')}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{t('firstExportDesc')}</p>
                </div>
              </div>

              {/* 2010 */}
              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-white border-4 border-[#2F463E] rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Award className="w-6 h-6 text-[#2F463E]" />
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <h3 className="font-bold text-[#2F463E] text-xl mb-2">2010</h3>
                  <h4 className="font-semibold text-gray-800 mb-3">{t('isoCertification')}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{t('isoCertificationDesc')}</p>
                </div>
              </div>

              {/* 2018 */}
              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-white border-4 border-[#2F463E] rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Star className="w-6 h-6 text-[#2F463E]" />
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <h3 className="font-bold text-[#2F463E] text-xl mb-2">2018</h3>
                  <h4 className="font-semibold text-gray-800 mb-3">{t('europeanMarkets')}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{t('europeanMarketsDesc')}</p>
                </div>
              </div>

              {/* 2024 */}
              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-white border-4 border-[#2F463E] rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-6 h-6 text-[#2F463E]" />
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <h3 className="font-bold text-[#2F463E] text-xl mb-2">2024</h3>
                  <h4 className="font-semibold text-gray-800 mb-3">{t('digitalInnovation')}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{t('digitalInnovationDesc')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className={`text-center mb-12 transition-all duration-1000 delay-400 ${
            visibleSections.includes('journey-section')
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{t('meetOurMasterCraftsmen')}</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('masterCraftsmenDesc')}
            </p>
          </div>

          {/* Team Cards */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 delay-600 ${
            visibleSections.includes('journey-section')
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}>
            {/* Founder */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="h-64 bg-gradient-to-br from-[#2F463E] to-[#3a5a4e] relative overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3">
                    <Heart className="w-8 h-8 text-[#2F463E]" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-800 mb-2">Shukur Nazarov</h4>
                <p className="text-[#2F463E] font-semibold mb-3">{t('founderMasterCraftsman')}</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t('founderDesc')}
                </p>
              </div>
            </div>

            {/* Quality Director */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="h-64 bg-gradient-to-br from-amber-500 to-orange-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3">
                    <Award className="w-8 h-8 text-amber-600" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-800 mb-2">Dilshoda Nazarova</h4>
                <p className="text-[#2F463E] font-semibold mb-3">{t('qualityControlDirector')}</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t('qualityDirectorDesc')}
                </p>
              </div>
            </div>

            {/* Export Manager */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="h-64 bg-gradient-to-br from-blue-500 to-indigo-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3">
                    <Globe className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-800 mb-2">Rustam Abdullayev</h4>
                <p className="text-[#2F463E] font-semibold mb-3">{t('internationalSalesManager')}</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t('salesManagerDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2F463E] text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="md:col-span-1">
              <h3 className="text-2xl font-bold mb-4">Aknazar Textile</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                {t('companyDescription')}
              </p>
              {/* Social Media Icons */}
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Products Links */}

            {/* Company Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">{t('company')}</h4>
              <ul className="space-y-3">
                <li><button onClick={navigateToHome} className="text-gray-300 hover:text-white transition-colors text-sm text-left">{t('home')}</button></li>
                <li><button onClick={navigateToProducts} className="text-gray-300 hover:text-white transition-colors text-sm text-left">{t('products')}</button></li>
                <li><button onClick={navigateToWorkshops} className="text-gray-300 hover:text-white transition-colors text-sm text-left">{t('production')}</button></li>
                <li><button onClick={scrollToJourney} className="text-gray-300 hover:text-white transition-colors text-sm text-left">{t('aboutUs')}</button></li>
                <li><button onClick={navigateToBlog} className="text-gray-300 hover:text-white transition-colors text-sm text-left">{t('blog')}</button></li>
                <li><button onClick={navigateToContact} className="text-gray-300 hover:text-white transition-colors text-sm text-left">{t('contact')}</button></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-semibold mb-4">{t('newsletter')}</h4>
              <p className="text-gray-300 text-sm mb-4">
                {t('newsletterDescription')}
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder={t('enterEmail')}
                  className="flex-1 px-4 py-2 rounded-l-lg bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#3a5a4e]"
                />
                <button className="px-4 py-2 bg-[#3a5a4e] hover:bg-[#4a6a5e] rounded-r-lg transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center mt-3">
                <input
                  type="checkbox"
                  id="privacy"
                  className="w-4 h-4 text-[#3a5a4e] bg-gray-100 border-gray-300 rounded focus:ring-[#3a5a4e] focus:ring-2"
                />
                <label htmlFor="privacy" className="ml-2 text-xs text-gray-300">
                  {t('agreeWith')} <a href="#" className="underline hover:text-white">{t('privacyPolicy')}</a>
                </label>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-600 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-300 text-sm">
                {t('allRightsReserved')}
              </p>
              <p className="text-gray-300 text-sm mt-2 md:mt-0">
                {t('craftedWithTradition')}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;