import React, { useState, useEffect } from 'react';
import { ArrowLeft, Menu, X, ArrowRight } from 'lucide-react';
import { useLanguageContext } from '../hooks/useLanguage';

interface ProductsPageProps {
  onNavigateHome: () => void;
  onNavigateToWorkshops: () => void;
  onNavigateToContact: () => void;
  onNavigateToBlog?: () => void;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ 
  onNavigateHome, 
  onNavigateToWorkshops, 
  onNavigateToContact,
  onNavigateToBlog
}) => {
  const { currentLanguage, changeLanguage, t, getLanguageDisplay } = useLanguageContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  // Hero animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHeroVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Scroll animation for cards
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardIndex = parseInt(entry.target.getAttribute('data-card-index') || '0');
            setVisibleCards(prev => [...new Set([...prev, cardIndex])]);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    const cardElements = document.querySelectorAll('[data-card-index]');
    cardElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleLanguageSelect = (language: string) => {
    const langCode = language === 'English' ? 'en' : language === 'Русский' ? 'ru' : 'uz';
    changeLanguage(langCode);
    setIsLanguageOpen(false);
  };

  const products = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1643016087636-69ebfe9c6450?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: t('premiumKnitFabrics'),
      description: t('knitDescription'),
      category: 'Knit',
      price: 'From $12/meter'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1689694423271-994e60a933de?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: t('flatKnitCollection'),
      description: t('flatKnitDescription'),
      category: 'Flat Knit',
      price: 'From $15/meter'
    },
    {
      id: 3,
      image: 'https://plus.unsplash.com/premium_photo-1698950330236-0d44a039e0d2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: t('elegantLaceTextiles'),
      description: t('laceDescription'),
      category: 'Lace',
      price: 'From $25/meter'
    },
    {
      id: 4,
      image: 'https://plus.unsplash.com/premium_photo-1675799745780-87b6fe5c5822?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: t('handcraftedCrochet'),
      description: t('crochetDescription'),
      category: 'Crochet',
      price: 'From $20/meter'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1650091431369-4562adde47d3?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: t('luxuryJacquardWeaves'),
      description: t('jacquardDescription'),
      category: 'Jacquard',
      price: 'From $30/meter'
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1623929710342-02a8cd2dae25?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: t('organicCottonBlend'),
      description: t('organicCottonDescription'),
      category: 'Cotton',
      price: 'From $18/meter'
    },
    {
      id: 7,
      image: 'https://plus.unsplash.com/premium_photo-1673310535178-7c6069f28917?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: t('performanceBlends'),
      description: t('performanceDescription'),
      category: 'Performance',
      price: 'From $22/meter'
    },
    {
      id: 8,
      image: 'https://images.unsplash.com/photo-1630961680768-998a170045fa?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: t('silkBlendFabrics'),
      description: t('performanceDescription'),
      category: 'Silk',
      price: 'From $35/meter'
    },
    {
      id: 9,
      image: 'https://images.unsplash.com/photo-1718116325027-1928c85a10c3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: t('woolBlendCollection'),
      description: t('performanceDescription'),
      category: 'Wool',
      price: 'From $28/meter'
    },
    {
      id: 10,
      image: 'https://plus.unsplash.com/premium_photo-1726837257209-ac129836e21b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: t('specialtyTextiles'),
      description: t('performanceDescription'),
      category: 'Specialty',
      price: 'From $40/meter'
    }
  ];

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
              <span className="text-[#666666] font-medium">Mon-Sat: 9:00-18:00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#2F463E] shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo with Back Button */}
            <div className="flex items-center space-x-4">
              <button
                onClick={onNavigateHome}
                className="text-white hover:text-gray-200 transition-colors p-2 hover:bg-white hover:bg-opacity-10 rounded-lg"
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-white text-2xl font-bold tracking-wide">
                Aknazar Textile
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button onClick={onNavigateHome} className="text-white hover:text-gray-200 transition-colors font-medium text-sm">
                {t('home')}
              </button>
              <span className="text-white font-medium text-sm opacity-75">
                {t('products')}
              </span>
              <button onClick={onNavigateToWorkshops} className="text-white hover:text-gray-200 transition-colors font-medium text-sm">
                {t('production')}
              </button>
              <button onClick={() => { onNavigateHome(); setTimeout(() => { const element = document.getElementById('journey-section'); if (element) element.scrollIntoView({ behavior: 'smooth' }); }, 100); }} className="text-white hover:text-gray-200 transition-colors font-medium text-sm">
                {t('aboutUs')}
              </button>
              {onNavigateToBlog && (
                <button onClick={onNavigateToBlog} className="text-white hover:text-gray-200 transition-colors font-medium text-sm">
                  {t('blog')}
                </button>
              )}
              <button onClick={onNavigateToContact} className="text-white hover:text-gray-200 transition-colors font-medium text-sm">
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
                <button onClick={onNavigateHome} className="text-white hover:text-gray-200 transition-colors font-medium text-sm text-left">
                  {t('home')}
                </button>
                <span className="text-white font-medium text-sm opacity-75">
                  {t('products')}
                </span>
                <button onClick={onNavigateToWorkshops} className="text-white hover:text-gray-200 transition-colors font-medium text-sm text-left">
                  {t('production')}
                </button>
                <button onClick={() => { onNavigateHome(); setTimeout(() => { const element = document.getElementById('journey-section'); if (element) element.scrollIntoView({ behavior: 'smooth' }); }, 100); }} className="text-white hover:text-gray-200 transition-colors font-medium text-sm text-left">
                  {t('aboutUs')}
                </button>
                {onNavigateToBlog && (
                  <button onClick={onNavigateToBlog} className="text-white hover:text-gray-200 transition-colors font-medium text-sm text-left">
                    {t('blog')}
                  </button>
                )}
                <button onClick={onNavigateToContact} className="text-white hover:text-gray-200 transition-colors font-medium text-sm text-left">
                  {t('contact')}
                </button>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-80 flex items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://static.vecteezy.com/system/resources/thumbnails/024/946/449/small_2x/vibrant-silk-textiles-in-a-colorful-heap-generated-by-ai-free-photo.jpg')`
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#2F463E] bg-opacity-50" />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h1 className={`text-white text-5xl md:text-6xl font-bold leading-tight transition-all duration-1000 ${
            isHeroVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            {t('products')}
          </h1>
        </div>
      </section>

      {/* Products Grid Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{t('ourCompleteCollection')}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('completeCollectionDesc')}
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {products.map((product, index) => (
              <div 
                key={product.id} 
                data-card-index={index}
                className={`group cursor-pointer transition-all duration-700 ${
                  visibleCards.includes(index)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${(index % 2) * 200}ms` }}
              >
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-3">
                  {/* Product Image */}
                  <div className="relative overflow-hidden">
                    <div 
                      className="h-80 bg-cover bg-center transition-all duration-300 group-hover:scale-105"
                      style={{
                        backgroundImage: `url('${product.image}')`
                      }}
                    />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#2F463E] text-white px-3 py-1 rounded-full text-xs font-medium">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-[#2F463E] mb-3 group-hover:text-[#3a5a4e] transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-[#666666] text-sm leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
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
                <li><button onClick={onNavigateHome} className="text-gray-300 hover:text-white transition-colors text-sm text-left">{t('home')}</button></li>
                <li><span className="text-gray-300 text-sm opacity-75">{t('products')}</span></li>
                <li><button onClick={onNavigateToWorkshops} className="text-gray-300 hover:text-white transition-colors text-sm text-left">{t('production')}</button></li>
                <li><button onClick={() => { onNavigateHome(); setTimeout(() => { const element = document.getElementById('journey-section'); if (element) element.scrollIntoView({ behavior: 'smooth' }); }, 100); }} className="text-gray-300 hover:text-white transition-colors text-sm text-left">{t('aboutUs')}</button></li>
                {onNavigateToBlog && (
                  <li><button onClick={onNavigateToBlog} className="text-gray-300 hover:text-white transition-colors text-sm text-left">{t('blog')}</button></li>
                )}
                <li><button onClick={onNavigateToContact} className="text-gray-300 hover:text-white transition-colors text-sm text-left">{t('contact')}</button></li>
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
};

export default ProductsPage;