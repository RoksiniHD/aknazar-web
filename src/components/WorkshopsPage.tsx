import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
import { useLanguageContext } from '../hooks/useLanguage';

interface WorkshopsPageProps {
  onNavigateHome: () => void;
  onNavigateToContact: () => void;
  onNavigateToProducts: () => void;
  onNavigateToBlog?: () => void;
}

interface SliderData {
  image: string;
  title: string;
  description: string;
}

const WorkshopsPage: React.FC<WorkshopsPageProps> = ({ onNavigateHome, onNavigateToContact, onNavigateToProducts, onNavigateToBlog }) => {
  const { currentLanguage, changeLanguage, t, getLanguageDisplay } = useLanguageContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const [currentSlides, setCurrentSlides] = useState({
    knitting: 0,
    dyeing: 0,
    finishing: 0,
    quality: 0
  });

  // Hero animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHeroVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Scroll animation for sections
  useEffect(() => {
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

    const sectionElements = document.querySelectorAll('[data-section-id]');
    sectionElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const workshopData = {
    knitting: [
      {
        image: 'https://images.pexels.com/photos/6765414/pexels-photo-6765414.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        title: 'Circular Knitting Machines',
        description: 'Our high-speed circular knitting machines produce seamless tubular fabrics with consistent tension and superior quality. These machines can handle various yarn types and create different fabric weights.'
      },
      {
        image: 'https://images.pexels.com/photos/6765419/pexels-photo-6765419.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        title: 'Flat Knitting Process',
        description: 'Precision flat knitting creates structured fabrics with clean edges. Our computerized flat knitting machines ensure consistent stitch formation and pattern accuracy for premium textiles.'
      },
      {
        image: 'https://images.pexels.com/photos/6765413/pexels-photo-6765413.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        title: 'Quality Yarn Selection',
        description: 'We carefully select premium yarns from trusted suppliers, ensuring each batch meets our strict quality standards for strength, consistency, and color fastness.'
      }
    ],
    dyeing: [
      {
        image: 'https://images.pexels.com/photos/6765415/pexels-photo-6765415.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        title: 'Color Mixing Laboratory',
        description: 'Our advanced color laboratory ensures precise color matching and consistency. We use eco-friendly dyes and maintain strict quality control for every batch.'
      },
      {
        image: 'https://images.pexels.com/photos/6765414/pexels-photo-6765414.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        title: 'Industrial Dyeing Vats',
        description: 'Large-capacity dyeing machines handle bulk orders while maintaining color uniformity. Our process includes pre-treatment, dyeing, and post-treatment for optimal results.'
      },
      {
        image: 'https://images.pexels.com/photos/6765419/pexels-photo-6765419.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        title: 'Eco-Friendly Process',
        description: 'We implement water recycling systems and use biodegradable chemicals to minimize environmental impact while maintaining superior dyeing quality.'
      }
    ],
    finishing: [
      {
        image: 'https://images.pexels.com/photos/6765413/pexels-photo-6765413.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        title: 'Steam Finishing',
        description: 'High-pressure steam finishing removes wrinkles and sets the fabric structure, ensuring dimensional stability and professional appearance.'
      },
      {
        image: 'https://images.pexels.com/photos/6765415/pexels-photo-6765415.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        title: 'Calendaring Process',
        description: 'Our calendaring machines apply controlled pressure and heat to achieve the desired fabric hand-feel, from soft and supple to crisp and structured.'
      },
      {
        image: 'https://images.pexels.com/photos/6765414/pexels-photo-6765414.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        title: 'Texture Enhancement',
        description: 'Specialized finishing treatments add unique textures, improve drape, and enhance the fabric\'s performance characteristics for specific applications.'
      }
    ],
    quality: [
      {
        image: 'https://images.pexels.com/photos/6765419/pexels-photo-6765419.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        title: 'Laboratory Testing',
        description: 'Comprehensive testing includes color fastness, shrinkage, tensile strength, and pilling resistance to ensure every fabric meets international standards.'
      },
      {
        image: 'https://images.pexels.com/photos/6765413/pexels-photo-6765413.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        title: 'Visual Inspection',
        description: 'Trained quality inspectors examine every meter of fabric for defects, ensuring consistent quality and appearance throughout each roll.'
      },
      {
        image: 'https://images.pexels.com/photos/6765415/pexels-photo-6765415.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        title: 'Certification Process',
        description: 'Final quality certification includes detailed documentation and compliance verification before fabrics are approved for shipment to customers.'
      }
    ]
  };

  const nextSlide = (workshop: keyof typeof currentSlides) => {
    setCurrentSlides(prev => ({
      ...prev,
      [workshop]: (prev[workshop] + 1) % workshopData[workshop].length
    }));
  };

  const prevSlide = (workshop: keyof typeof currentSlides) => {
    setCurrentSlides(prev => ({
      ...prev,
      [workshop]: prev[workshop] === 0 ? workshopData[workshop].length - 1 : prev[workshop] - 1
    }));
  };

  const goToSlide = (workshop: keyof typeof currentSlides, index: number) => {
    setCurrentSlides(prev => ({
      ...prev,
      [workshop]: index
    }));
  };

  const handleLanguageSelect = (language: string) => {
    const langCode = language === 'English' ? 'en' : language === 'Русский' ? 'ru' : 'uz';
    changeLanguage(langCode);
    setIsLanguageOpen(false);
  };

  const WorkshopSlider = ({ 
    workshop, 
    data, 
    isReversed = false 
  }: { 
    workshop: keyof typeof currentSlides; 
    data: SliderData[]; 
    isReversed?: boolean;
  }) => {
    const currentIndex = currentSlides[workshop];
    const currentSlide = data[currentIndex];

    return (
      <div className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 items-center`}>
        {/* Image Section */}
        <div className="w-full lg:w-1/2">
          <div className="relative">
            <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
              <img 
                src={currentSlide.image} 
                alt={currentSlide.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Navigation Buttons */}
            <button
              onClick={() => prevSlide(workshop)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={() => nextSlide(workshop)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>

            {/* Slide Counter */}
            <div className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} of {data.length}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {data.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(workshop, index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex 
                    ? 'bg-[#2F463E] scale-110' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full lg:w-1/2">
          <div className="bg-[#F5F3EE] rounded-xl p-8">
            <h3 className="text-2xl font-bold text-[#2F463E] mb-4">
              {currentSlide.title}
            </h3>
            <p className="text-[#666666] leading-relaxed text-lg">
              {currentSlide.description}
            </p>
          </div>
        </div>
      </div>
    );
  };

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
                    onClick={() => handleLanguageSelect('Eng')}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors text-sm"
                  >
                    Eng
                  </button>
                  <button
                    onClick={() => handleLanguageSelect('Rus')}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors text-sm"
                  >
                    Rus
                  </button>
                  <button
                    onClick={() => handleLanguageSelect('Uzb')}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors text-sm"
                  >
                    Uzb
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
              <button onClick={onNavigateToProducts} className="text-white hover:text-gray-200 transition-colors font-medium text-sm">
                {t('products')}
              </button>
              <span className="text-white font-medium text-sm opacity-75">
                {t('production')}
              </span>
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
                <button onClick={onNavigateToProducts} className="text-white hover:text-gray-200 transition-colors font-medium text-sm text-left">
                  {t('products')}
                </button>
                <span className="text-white font-medium text-sm opacity-75">
                  {t('production')}
                </span>
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
      <section className="relative min-h-screen flex items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/6765414/pexels-photo-6765414.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#2F463E] bg-opacity-40" />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-32">
          <div className="text-center">
            <h1 className={`text-white text-5xl md:text-6xl font-bold leading-tight mb-6 transition-all duration-1000 ${
              isHeroVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}>
              {t('whereFabricMeetsExcellence')}
            </h1>
          </div>
        </div>
      </section>

      {/* Raw Materials Warehouse Section */}
      <section 
        className="py-16 bg-[#F5F3EE]"
        data-section-id="raw-materials"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className={`flex flex-col lg:flex-row gap-8 items-center transition-all duration-1000 ${
            visibleSections.includes('raw-materials')
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}>
            {/* Image */}
            <div className="w-full lg:w-1/2">
              <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.pexels.com/photos/6765419/pexels-photo-6765419.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                  alt="Raw Materials Warehouse"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Content */}
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl font-bold text-[#2F463E] mb-6">{t('rawMaterialsWarehouse')}</h2>
              <p className="text-[#666666] leading-relaxed text-lg">
                {t('rawMaterialsDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Knitting Workshop */}
      <section 
        className="py-16 bg-white"
        data-section-id="knitting-workshop"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className={`transition-all duration-1000 ${
            visibleSections.includes('knitting-workshop')
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}>
            <h2 className="text-3xl font-bold text-[#2F463E] mb-12 text-center">
              {t('knittingWorkshop')}
            </h2>
            <WorkshopSlider 
              workshop="knitting" 
              data={workshopData.knitting} 
            />
          </div>
        </div>
      </section>

      {/* Dyeing Workshop */}
      <section 
        className="py-16 bg-[#F5F3EE]"
        data-section-id="dyeing-workshop"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className={`transition-all duration-1000 ${
            visibleSections.includes('dyeing-workshop')
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}>
            <h2 className="text-3xl font-bold text-[#2F463E] mb-12 text-center">
              {t('dyeingWorkshop')}
            </h2>
            <WorkshopSlider 
              workshop="dyeing" 
              data={workshopData.dyeing} 
              isReversed={true}
            />
          </div>
        </div>
      </section>

      {/* Finishing Workshop */}
      <section 
        className="py-16 bg-white"
        data-section-id="finishing-workshop"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className={`transition-all duration-1000 ${
            visibleSections.includes('finishing-workshop')
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}>
            <h2 className="text-3xl font-bold text-[#2F463E] mb-12 text-center">
              {t('finishingWorkshop')}
            </h2>
            <WorkshopSlider 
              workshop="finishing" 
              data={workshopData.finishing} 
            />
          </div>
        </div>
      </section>

      {/* Quality Control */}
      <section 
        className="py-16 bg-[#F5F3EE]"
        data-section-id="quality-control"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className={`transition-all duration-1000 ${
            visibleSections.includes('quality-control')
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}>
            <h2 className="text-3xl font-bold text-[#2F463E] mb-12 text-center">
              {t('qualityControl')}
            </h2>
            <WorkshopSlider 
              workshop="quality" 
              data={workshopData.quality} 
              isReversed={true}
            />
          </div>
        </div>
      </section>

      {/* Design Shop */}
      <section 
        className="py-16 bg-white"
        data-section-id="design-shop"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className={`flex flex-col lg:flex-row gap-8 items-center transition-all duration-1000 ${
            visibleSections.includes('design-shop')
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}>
            {/* Image */}
            <div className="w-full lg:w-1/2">
              <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.pexels.com/photos/6765413/pexels-photo-6765413.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                  alt="Design Shop"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Content */}
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl font-bold text-[#2F463E] mb-6">{t('designShop')}</h2>
              <p className="text-[#666666] leading-relaxed text-lg">
                {t('designShopDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Packing Shop */}
      <section 
        className="py-16 bg-[#F5F3EE]"
        data-section-id="packing-shop"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className={`flex flex-col lg:flex-row-reverse gap-8 items-center transition-all duration-1000 ${
            visibleSections.includes('packing-shop')
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}>
            {/* Image */}
            <div className="w-full lg:w-1/2">
              <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.pexels.com/photos/6765415/pexels-photo-6765415.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                  alt="Packing Shop"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Content */}
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl font-bold text-[#2F463E] mb-6">{t('packingShop')}</h2>
              <p className="text-[#666666] leading-relaxed text-lg">
                {t('packingShopDesc')}
              </p>
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
                <li><button onClick={onNavigateHome} className="text-gray-300 hover:text-white transition-colors text-sm text-left">{t('home')}</button></li>
                <li><button onClick={onNavigateToProducts} className="text-gray-300 hover:text-white transition-colors text-sm text-left">{t('products')}</button></li>
                <li><span className="text-gray-300 text-sm opacity-75">{t('production')}</span></li>
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
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
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

export default WorkshopsPage;