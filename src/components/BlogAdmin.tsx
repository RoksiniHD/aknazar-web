import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Edit, Trash2, Save, X, Eye, EyeOff, Menu, ArrowRight } from 'lucide-react';
import { BlogPost, BlogCategory } from '../types/blog';
import { useLanguageContext } from '../hooks/useLanguage';
import { useBlog } from '../hooks/useBlog';

interface BlogAdminProps {
  onBack: () => void;
  onNavigateHome: () => void;
  onNavigateToWorkshops: () => void;
  onNavigateToContact: () => void;
  onNavigateToProducts: () => void;
  onNavigateToBlog: () => void;
}

const BlogAdmin: React.FC<BlogAdminProps> = ({ 
  onBack, 
  onNavigateHome, 
  onNavigateToWorkshops, 
  onNavigateToContact, 
  onNavigateToProducts, 
  onNavigateToBlog 
}) => {
  const { currentLanguage, changeLanguage, t, getLanguageDisplay } = useLanguageContext();
  const {
    posts,
    categories,
    generateSlug,
    calculateReadingTime,
    formatDate
  } = useBlog();

  const [currentView, setCurrentView] = useState<'list' | 'create' | 'edit'>('list');
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isAnimated, setIsAnimated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    excerpt: '',
    content: '',
    author: 'Aknazar Karimov',
    category: 'business',
    image: '',
    featured: false,
    published: true,
    tags: [],
    seo: {
      metaTitle: '',
      metaDescription: ''
    }
  });

  const [newTag, setNewTag] = useState('');

  // Animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleLanguageSelect = (language: string) => {
    const langCode = language === 'English' ? 'en' : language === 'Русский' ? 'ru' : 'uz';
    changeLanguage(langCode);
    setIsLanguageOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name.startsWith('seo.')) {
      const seoField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        seo: {
          ...prev.seo,
          [seoField]: value
        }
      }));
    } else if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const now = new Date().toISOString().split('T')[0];
    const slug = generateSlug(formData.title || '');
    const readTime = calculateReadingTime(formData.content || '');
    
    const postData: BlogPost = {
      id: editingPost?.id || Date.now().toString(),
      title: formData.title || '',
      slug,
      excerpt: formData.excerpt || '',
      content: formData.content || '',
      author: formData.author || 'Aknazar Karimov',
      date: editingPost?.date || now,
      readTime,
      category: formData.category || 'business',
      image: formData.image || 'https://images.pexels.com/photos/6765414/pexels-photo-6765414.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      featured: formData.featured || false,
      published: formData.published || true,
      tags: formData.tags || [],
      seo: formData.seo || {}
    };

    // In a real app, this would save to a database
    console.log('Saving post:', postData);
    
    // Reset form and go back to list
    resetForm();
    setCurrentView('list');
  };

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      author: 'Aknazar Karimov',
      category: 'business',
      image: '',
      featured: false,
      published: true,
      tags: [],
      seo: {
        metaTitle: '',
        metaDescription: ''
      }
    });
    setEditingPost(null);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData(post);
    setCurrentView('edit');
  };

  const handleDelete = (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      // In a real app, this would delete from database
      console.log('Deleting post:', postId);
    }
  };

  const handleCreateNew = () => {
    resetForm();
    setCurrentView('create');
  };

  const getCategoryColor = (categorySlug: string) => {
    const category = categories.find(cat => cat.slug === categorySlug);
    return category?.color || 'bg-gray-100 text-gray-800';
  };

  const getCategoryName = (categorySlug: string) => {
    const category = categories.find(cat => cat.slug === categorySlug);
    return category?.name || categorySlug;
  };

  // List View
  if (currentView === 'list') {
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
              {/* Logo with Back Button */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={onBack}
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
                <button onClick={onNavigateToBlog} className="text-white hover:text-gray-200 transition-colors font-medium text-sm">
                  {t('blog')}
                </button>
                <button onClick={onNavigateToContact} className="text-white hover:text-gray-200 transition-colors font-medium text-sm">
                  {t('contact')}
                </button>
                <span className="text-white font-medium text-sm opacity-75 bg-white bg-opacity-20 px-3 py-1 rounded-full">
                  {t('admin')}
                </span>
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
                  <button onClick={onNavigateToBlog} className="text-white hover:text-gray-200 transition-colors font-medium text-sm text-left">
                    {t('blog')}
                  </button>
                  <button onClick={onNavigateToContact} className="text-white hover:text-gray-200 transition-colors font-medium text-sm text-left">
                    {t('contact')}
                  </button>
                  <span className="text-white font-medium text-sm opacity-75">
                    {t('admin')}
                  </span>
                </div>
              </nav>
            )}
          </div>
        </header>

        {/* Admin Content */}
        <div className="min-h-screen bg-gradient-to-br from-[#F5F3EE] to-white py-8">
          <div className="max-w-6xl mx-auto px-6">
            {/* Admin Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-[#2F463E] mb-4">{t('blogAdministration')}</h1>
              <p className="text-lg text-[#666666] max-w-2xl mx-auto">
                {t('adminDescription')}
              </p>
            </div>

            {/* Action Bar */}
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center space-x-4">
                <div className="bg-white rounded-lg px-4 py-2 shadow-sm border">
                  <span className="text-sm text-[#666666]">{t('totalPosts')}: </span>
                  <span className="font-bold text-[#2F463E]">{posts.length}</span>
                </div>
                <div className="bg-white rounded-lg px-4 py-2 shadow-sm border">
                  <span className="text-sm text-[#666666]">{t('published')}: </span>
                  <span className="font-bold text-green-600">{posts.filter(p => p.published).length}</span>
                </div>
                <div className="bg-white rounded-lg px-4 py-2 shadow-sm border">
                  <span className="text-sm text-[#666666]">{t('drafts')}: </span>
                  <span className="font-bold text-orange-600">{posts.filter(p => !p.published).length}</span>
                </div>
              </div>
              <button
                onClick={handleCreateNew}
                className="bg-[#2F463E] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#3a5a4e] transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Plus className="w-5 h-5 mr-2" />
                {t('newPost')}
              </button>
            </div>

          <div className={`transition-all duration-1000 ${
            isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-[#2F463E] to-[#3a5a4e] px-6 py-6">
                <h2 className="text-xl font-bold text-white">{t('managePosts')}</h2>
                <p className="text-gray-200 text-sm mt-1">Manage and organize your content</p>
              </div>
              
              <div className="divide-y divide-gray-100">
                {posts.map((post, index) => (
                  <div 
                    key={post.id} 
                    className="p-6 hover:bg-[#F5F3EE] transition-all duration-300 group"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-bold text-[#2F463E] group-hover:text-[#3a5a4e] transition-colors">{post.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                            {getCategoryName(post.category)}
                          </span>
                          {post.featured && (
                            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                              Featured
                            </span>
                          )}
                          <div className="flex items-center">
                            {post.published ? (
                              <div className="flex items-center bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                                <Eye className="w-3 h-3 mr-1" />
                                {t('published')}
                              </div>
                            ) : (
                              <div className="flex items-center bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                                <EyeOff className="w-3 h-3 mr-1" />
                                Draft
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-[#666666] text-sm mb-3 leading-relaxed">{post.excerpt}</p>
                        <div className="flex items-center space-x-6 text-xs text-[#666666]">
                          <div className="flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                            {post.author}
                          </div>
                          <div className="flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                            {formatDate(post.date)}
                          </div>
                          <div className="flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            {post.readTime}
                          </div>
                          <div className="flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                            </svg>
                            {post.tags.length} tags
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 ml-6">
                        <button
                          onClick={() => handleEdit(post)}
                          className="p-2 text-[#666666] hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 transform hover:scale-110"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="p-2 text-[#666666] hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 transform hover:scale-110"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </div>
        </div>

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
                  <li><button onClick={onNavigateToBlog} className="text-gray-300 hover:text-white transition-colors text-sm text-left">{t('blog')}</button></li>
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
  }

  // Create/Edit Form View
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
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo with Back Button */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentView('list')}
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
              <button onClick={onNavigateToBlog} className="text-white hover:text-gray-200 transition-colors font-medium text-sm">
                {t('blog')}
              </button>
              <button onClick={onNavigateToContact} className="text-white hover:text-gray-200 transition-colors font-medium text-sm">
                {t('contact')}
              </button>
              <span className="text-white font-medium text-sm opacity-75 bg-white bg-opacity-20 px-3 py-1 rounded-full">
                {t('admin')}
              </span>
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
                <button onClick={onNavigateToBlog} className="text-white hover:text-gray-200 transition-colors font-medium text-sm text-left">
                  {t('blog')}
                </button>
                <button onClick={onNavigateToContact} className="text-white hover:text-gray-200 transition-colors font-medium text-sm text-left">
                  {t('contact')}
                </button>
                <span className="text-white font-medium text-sm opacity-75">
                  {t('admin')}
                </span>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Form Content */}
      <div className="min-h-screen bg-gradient-to-br from-[#F5F3EE] to-white py-8">
        <div className="max-w-4xl mx-auto px-6">
          {/* Form Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#2F463E] mb-4">
              {currentView === 'create' ? 'Create New Post' : 'Edit Post'}
            </h1>
            <p className="text-lg text-[#666666] max-w-2xl mx-auto">
              {currentView === 'create' 
                ? 'Share your textile industry insights and company updates with your audience.'
                : 'Update your post content and settings to keep your audience informed.'
              }
            </p>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentView('list')}
                className="flex items-center px-4 py-2 text-[#666666] hover:text-[#2F463E] transition-colors bg-white rounded-lg shadow-sm border hover:shadow-md"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Posts
              </button>
            </div>
            <div className="text-sm text-[#666666]">
              {currentView === 'create' ? 'Creating new post' : `Editing: ${editingPost?.title}`}
            </div>
          </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-1 h-8 bg-[#2F463E] rounded-full mr-4"></div>
              <h2 className="text-2xl font-bold text-[#2F463E]">Basic Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F463E] focus:border-transparent transition-all duration-200 hover:border-[#2F463E]"
                  placeholder="Enter post title"
                />
              </div>

              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                  Author
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F463E] focus:border-transparent transition-all duration-200 hover:border-[#2F463E]"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F463E] focus:border-transparent transition-all duration-200 hover:border-[#2F463E]"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.slug}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image URL
                </label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F463E] focus:border-transparent transition-all duration-200 hover:border-[#2F463E]"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                  Excerpt *
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F463E] focus:border-transparent transition-all duration-200 hover:border-[#2F463E] resize-vertical"
                  placeholder="Brief description of the post"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-1 h-8 bg-[#2F463E] rounded-full mr-4"></div>
              <h2 className="text-2xl font-bold text-[#2F463E]">Content</h2>
            </div>
            
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Post Content *
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
                rows={15}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F463E] focus:border-transparent transition-all duration-200 hover:border-[#2F463E] resize-vertical font-mono text-sm"
                placeholder="Write your post content here... You can use markdown-like formatting:&#10;&#10;# Heading 1&#10;## Heading 2&#10;### Heading 3&#10;&#10;**Bold text**&#10;*Italic text*&#10;&#10;- List item 1&#10;- List item 2"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-1 h-8 bg-[#2F463E] rounded-full mr-4"></div>
              <h2 className="text-2xl font-bold text-[#2F463E]">Tags</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F463E] focus:border-transparent transition-all duration-200 hover:border-[#2F463E]"
                  placeholder="Add a tag"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-6 py-3 bg-[#2F463E] text-white rounded-lg hover:bg-[#3a5a4e] transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                >
                  Add
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {formData.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-[#F5F3EE] text-[#2F463E] px-4 py-2 rounded-full text-sm flex items-center font-medium border border-gray-200 hover:bg-[#2F463E] hover:text-white transition-all duration-200"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-2 text-gray-500 hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* SEO */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-1 h-8 bg-[#2F463E] rounded-full mr-4"></div>
              <h2 className="text-2xl font-bold text-[#2F463E]">SEO Settings</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="seo.metaTitle" className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Title
                </label>
                <input
                  type="text"
                  id="seo.metaTitle"
                  name="seo.metaTitle"
                  value={formData.seo?.metaTitle || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F463E] focus:border-transparent transition-all duration-200 hover:border-[#2F463E]"
                  placeholder="SEO title for search engines"
                />
              </div>
              
              <div>
                <label htmlFor="seo.metaDescription" className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Description
                </label>
                <textarea
                  id="seo.metaDescription"
                  name="seo.metaDescription"
                  value={formData.seo?.metaDescription || ''}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F463E] focus:border-transparent transition-all duration-200 hover:border-[#2F463E] resize-vertical"
                  placeholder="SEO description for search engines"
                />
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-1 h-8 bg-[#2F463E] rounded-full mr-4"></div>
              <h2 className="text-2xl font-bold text-[#2F463E]">Post Settings</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-[#F5F3EE] rounded-lg">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured || false}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-[#2F463E] bg-gray-100 border-gray-300 rounded focus:ring-[#2F463E] focus:ring-2"
                />
                <label htmlFor="featured" className="ml-3 text-sm font-medium text-[#2F463E]">
                  Featured Post
                </label>
                <span className="ml-2 text-xs text-[#666666]">(Will appear prominently on blog page)</span>
              </div>
              
              <div className="flex items-center p-4 bg-[#F5F3EE] rounded-lg">
                <input
                  type="checkbox"
                  id="published"
                  name="published"
                  checked={formData.published || false}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-[#2F463E] bg-gray-100 border-gray-300 rounded focus:ring-[#2F463E] focus:ring-2"
                />
                <label htmlFor="published" className="ml-3 text-sm font-medium text-[#2F463E]">
                  Published
                </label>
                <span className="ml-2 text-xs text-[#666666]">(Uncheck to save as draft)</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-between items-center pt-6">
            <button
              type="button"
              onClick={() => setCurrentView('list')}
              className="px-6 py-3 text-[#666666] hover:text-[#2F463E] transition-colors bg-white border border-gray-300 rounded-lg hover:border-[#2F463E] font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#2F463E] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#3a5a4e] transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Save className="w-5 h-5 mr-2" />
              {currentView === 'create' ? 'Create Post' : 'Update Post'}
            </button>
          </div>
        </form>
        </div>
      </div>

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
                <li><button onClick={onNavigateToBlog} className="text-gray-300 hover:text-white transition-colors text-sm text-left">{t('blog')}</button></li>
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

export default BlogAdmin;