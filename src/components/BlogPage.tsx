import React, { useState, useEffect } from 'react';
import { ArrowLeft, Menu, X, Calendar, User, ArrowRight, Clock, Tag, Search, Settings } from 'lucide-react';
import { useLanguageContext } from '../hooks/useLanguage';
import { useBlog } from '../hooks/useBlog';
import BlogSinglePost from './BlogSinglePost';
import BlogAdmin from './BlogAdmin';

interface BlogPageProps {
  onNavigateHome: () => void;
  onNavigateToWorkshops: () => void;
  onNavigateToContact: () => void;
  onNavigateToProducts: () => void;
}

const BlogPage: React.FC<BlogPageProps> = ({ 
  onNavigateHome, 
  onNavigateToWorkshops, 
  onNavigateToContact,
  onNavigateToProducts 
}) => {
  const { currentLanguage, changeLanguage, t, getLanguageDisplay } = useLanguageContext();
  const {
    currentView,
    currentPost,
    filteredPosts,
    featuredPost,
    categories,
    selectedCategory,
    searchQuery,
    setSelectedCategory,
    setSearchQuery,
    navigateToPost,
    navigateToList,
    navigateToAdmin,
    formatDate,
    getCategoryBySlug
  } = useBlog();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [visiblePosts, setVisiblePosts] = useState<number[]>([]);

  // Hero animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHeroVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Scroll animation for blog posts
  useEffect(() => {
    setVisiblePosts([]); // Reset visible posts when category changes
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const postIndex = parseInt(entry.target.getAttribute('data-post-index') || '0');
            setVisiblePosts(prev => [...new Set([...prev, postIndex])]);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    // Use setTimeout to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      const postElements = document.querySelectorAll('[data-post-index]');
      postElements.forEach(el => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [selectedCategory]);

  const handleLanguageSelect = (language: string) => {
    const langCode = language === 'English' ? 'en' : language === 'Русский' ? 'ru' : 'uz';
    changeLanguage(langCode);
    setIsLanguageOpen(false);
  };

  // Handle post click
  const handlePostClick = (slug: string) => {
    navigateToPost(slug);
  };

  // If viewing single post, render single post component
  if (currentView === 'single' && currentPost) {
    return (
      <BlogSinglePost
        post={currentPost}
        onBack={navigateToList}
        onNavigateHome={onNavigateHome}
        onNavigateToWorkshops={onNavigateToWorkshops}
        onNavigateToContact={onNavigateToContact}
        onNavigateToProducts={onNavigateToProducts}
      />
    );
  }

  // If viewing admin, render admin component
  if (currentView === 'admin') {
    return (
      <BlogAdmin 
        onBack={navigateToList}
        onNavigateHome={onNavigateHome}
        onNavigateToWorkshops={onNavigateToWorkshops}
        onNavigateToContact={onNavigateToContact}
        onNavigateToProducts={onNavigateToProducts}
        onNavigateToBlog={navigateToList}
      />
    );
  }

  // Get posts for display
  const regularPosts = filteredPosts.filter(post => !post.featured);
  const allCategories = ['All', ...categories.map(cat => cat.name)];

  // Debug logging
  console.log('Blog Debug:', {
    filteredPosts: filteredPosts.length,
    regularPosts: regularPosts.length,
    featuredPost: featuredPost?.title,
    selectedCategory,
    searchQuery
  });
  return (
    <div className="min-h-screen bg-white">
      {/* Announcement Bar */}
      <div className="bg-[#F5F3EE] py-2 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center text-sm">
          {/* Shipping Information */}
          <div className="mb-2 sm:mb-0">
            <p className="text-[#666666] font-medium">
              We ship across Central Asia and Europe
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
              <button onClick={onNavigateToProducts} className="text-white hover:text-gray-200 transition-colors font-medium text-sm">
                {t('products')}
              </button>
              <button onClick={onNavigateToWorkshops} className="text-white hover:text-gray-200 transition-colors font-medium text-sm">
                {t('production')}
              </button>
              <button onClick={() => { onNavigateHome(); setTimeout(() => { const element = document.getElementById('journey-section'); if (element) element.scrollIntoView({ behavior: 'smooth' }); }, 100); }} className="text-white hover:text-gray-200 transition-colors font-medium text-sm">
                {t('aboutUs')}
              </button>
              <span className="text-white font-medium text-sm opacity-75">
                {t('blog')}
              </span>
              <button onClick={onNavigateToContact} className="text-white hover:text-gray-200 transition-colors font-medium text-sm">
                {t('contact')}
              </button>
              <button onClick={navigateToAdmin} className="text-white hover:text-gray-200 transition-colors font-medium text-sm flex items-center">
                <Settings className="w-4 h-4 mr-1" />
                {t('admin')}
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
                <button onClick={onNavigateToWorkshops} className="text-white hover:text-gray-200 transition-colors font-medium text-sm text-left">
                  {t('production')}
                </button>
                <button onClick={() => { onNavigateHome(); setTimeout(() => { const element = document.getElementById('journey-section'); if (element) element.scrollIntoView({ behavior: 'smooth' }); }, 100); }} className="text-white hover:text-gray-200 transition-colors font-medium text-sm text-left">
                  {t('aboutUs')}
                </button>
                <span className="text-white font-medium text-sm opacity-75">
                  {t('blog')}
                </span>
                <button onClick={onNavigateToContact} className="text-white hover:text-gray-200 transition-colors font-medium text-sm text-left">
                  {t('contact')}
                </button>
                <button onClick={navigateToAdmin} className="text-white hover:text-gray-200 transition-colors font-medium text-sm text-left flex items-center">
                  <Settings className="w-4 h-4 mr-2" />
                  {t('admin')}
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
            backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=600&fit=crop&crop=center')`
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#2F463E] bg-opacity-50" />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h1 className={`text-white text-4xl md:text-5xl font-bold leading-tight mb-4 transition-all duration-1000 ${
            isHeroVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            {t('textileInsights')}
          </h1>
          <p className={`text-white text-lg md:text-xl leading-relaxed max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
            isHeroVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            {t('blogHeroDescription')}
          </p>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t('searchArticles')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F463E] focus:border-transparent transition-colors"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[t('all'), ...categories.map(cat => t(cat.slug as keyof typeof t))].map((category, index) => {
              const categoryKey = index === 0 ? 'All' : categories[index - 1]?.name;
              return (
              <button
                key={categoryKey}
                onClick={() => setSelectedCategory(categoryKey)}
                className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                  selectedCategory === categoryKey
                    ? 'bg-[#2F463E] text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
              );
            })}
          </div>

          {/* Featured Post */}
          {featuredPost && selectedCategory === 'All' && !searchQuery && (
            <div className="mb-16">
              <div 
                className="bg-[#F5F3EE] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                onClick={() => handlePostClick(featuredPost.slug)}
              >
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img 
                      src={featuredPost.image} 
                      alt={featuredPost.title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-8">
                    <div className="flex items-center mb-4">
                      <span className="bg-[#2F463E] text-white px-3 py-1 rounded-full text-xs font-medium mr-3">
                        {t('featured')}
                      </span>
                      <span className={`px-2 py-1 md:px-3 rounded-full text-xs font-medium ${getCategoryBySlug(featuredPost.category)?.color || 'bg-gray-200 text-gray-700'}`}>
                        {t(getCategoryBySlug(featuredPost.category)?.slug as keyof typeof t)}
                      </span>
                    </div>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2F463E] mb-4 leading-tight">
                      {featuredPost.title}
                    </h2>
                    <p className="text-sm md:text-base text-gray-600 mb-6 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-xs md:text-sm text-gray-500">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {featuredPost.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(featuredPost.date)}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {featuredPost.readTime}
                        </div>
                      </div>
                      <button 
                        className="bg-[#2F463E] text-white px-4 py-2 md:px-6 rounded-lg text-sm md:text-base font-medium hover:bg-[#3a5a4e] transition-colors flex items-center group"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePostClick(featuredPost.slug);
                        }}
                      >
                        {t('readMore')}
                        <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Regular Posts Grid */}
          {regularPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <article 
                key={post.id}
                data-post-index={index}
                className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-700 overflow-hidden transform hover:-translate-y-2 group cursor-pointer ${
                  visiblePosts.includes(index)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => handlePostClick(post.slug)}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`bg-white bg-opacity-90 px-2 py-1 md:px-3 rounded-full text-xs font-medium flex items-center ${getCategoryBySlug(post.category)?.color || 'text-[#2F463E]'}`}>
                      <Tag className="w-3 h-3 mr-1" />
                      {t(getCategoryBySlug(post.category)?.slug as keyof typeof t)}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg md:text-xl font-bold text-[#2F463E] mb-3 leading-tight group-hover:text-[#3a5a4e] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-xs md:text-sm mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 text-xs text-gray-500 mb-4">
                    <div className="flex items-center">
                      <User className="w-3 h-3 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(post.date)}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <button 
                    className="w-full bg-[#F5F3EE] text-[#2F463E] py-2 rounded-lg text-sm font-medium hover:bg-[#2F463E] hover:text-white transition-all duration-300 flex items-center justify-center group/btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePostClick(post.slug);
                    }}
                  >
                    {t('readArticle')}
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </article>
            ))}
          </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-500 text-base md:text-lg mb-4">{t('noArticlesFound')}</div>
              <p className="text-gray-400 text-sm md:text-base">
                {searchQuery 
                  ? `${t('noArticlesMatch')} "${searchQuery}"`
                  : selectedCategory !== 'All'
                  ? `${t('noArticlesCategory')} ${selectedCategory} category`
                  : t('noArticlesAvailable')
                }
              </p>
              {(searchQuery || selectedCategory !== 'All') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="mt-4 text-[#2F463E] hover:text-[#3a5a4e] font-medium text-sm md:text-base"
                >
                  {t('clearFilters')}
                </button>
              )}
            </div>
          )}


          {/* Load More Button */}
          {regularPosts.length > 9 && (
            <div className="text-center mt-12">
              <button className="bg-[#2F463E] text-white px-6 py-2 md:px-8 md:py-3 rounded-lg text-sm md:text-base font-semibold hover:bg-[#3a5a4e] transition-all duration-300 transform hover:scale-105">
                {t('loadMoreArticles')}
              </button>
            </div>
          )}
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

            {/* Company Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">{t('company')}</h4>
              <ul className="space-y-3">
                <li><button onClick={onNavigateHome} className="text-gray-300 hover:text-white transition-colors text-sm text-left">{t('home')}</button></li>
                <li><button onClick={onNavigateToProducts} className="text-gray-300 hover:text-white transition-colors text-sm text-left">{t('products')}</button></li>
                <li><button onClick={onNavigateToWorkshops} className="text-gray-300 hover:text-white transition-colors text-sm text-left">{t('production')}</button></li>
                <li><button onClick={() => { onNavigateHome(); setTimeout(() => { const element = document.getElementById('journey-section'); if (element) element.scrollIntoView({ behavior: 'smooth' }); }, 100); }} className="text-gray-300 hover:text-white transition-colors text-sm text-left">{t('aboutUs')}</button></li>
                <li><span className="text-gray-300 text-sm opacity-75">{t('blog')}</span></li>
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

export default BlogPage;