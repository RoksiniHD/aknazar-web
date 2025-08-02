import React, { useState, useEffect } from 'react';
import { ArrowLeft, Menu, X, Plus, Edit, Trash2, Save, Eye, EyeOff, Search, Filter } from 'lucide-react';
import { useLanguageContext } from '../hooks/useLanguage';
import { useBlog } from '../hooks/useBlog';
import { BlogPost } from '../types/blog';

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
    selectedCategory,
    searchQuery,
    setSelectedCategory,
    setSearchQuery,
    formatDate,
    getCategoryBySlug,
    generateSlug
  } = useBlog();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'list' | 'edit' | 'create'>('list');
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: '',
    tags: '',
    image: '',
    featured: false,
    published: true
  });

  const handleLanguageSelect = (language: string) => {
    const langCode = language === 'English' ? 'en' : language === 'Русский' ? 'ru' : 'uz';
    changeLanguage(langCode);
    setIsLanguageOpen(false);
  };

  const handleCreateNew = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      author: 'Admin',
      category: categories[0]?.id || '',
      tags: '',
      image: '',
      featured: false,
      published: true
    });
    setEditingPost(null);
    setCurrentView('create');
  };

  const handleEdit = (post: BlogPost) => {
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      category: post.category,
      tags: post.tags.join(', '),
      image: post.image,
      featured: post.featured,
      published: post.published
    });
    setEditingPost(post);
    setCurrentView('edit');
  };

  const handleSave = () => {
    // In a real app, this would save to a backend
    console.log('Saving post:', formData);
    setCurrentView('list');
  };

  const handleDelete = (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      // In a real app, this would delete from backend
      console.log('Deleting post:', postId);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (currentView === 'create' || currentView === 'edit') {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-[#2F463E] shadow-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setCurrentView('list')}
                  className="text-white hover:text-gray-200 transition-colors p-2 hover:bg-white hover:bg-opacity-10 rounded-lg"
                >
                  <ArrowLeft size={20} />
                </button>
                <h1 className="text-white text-xl sm:text-2xl font-bold tracking-wide">
                  {currentView === 'create' ? t('createPost') : t('editPost')}
                </h1>
              </div>
              
              {/* Mobile Save Button */}
              <button
                onClick={handleSave}
                className="md:hidden bg-white text-[#2F463E] px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center"
              >
                <Save className="w-4 h-4 mr-1" />
                {t('save')}
              </button>
            </div>
          </div>
        </header>

        {/* Form */}
        <section className="py-6 sm:py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 sm:p-6 lg:p-8">
                <form className="space-y-4 sm:space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-[#2F463E] mb-2">
                      {t('title')} *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F463E] focus:border-transparent transition-colors text-sm sm:text-base"
                      placeholder={t('enterTitle')}
                      required
                    />
                  </div>

                  {/* Meta Information Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Author */}
                    <div>
                      <label className="block text-sm font-medium text-[#2F463E] mb-2">
                        {t('author')}
                      </label>
                      <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F463E] focus:border-transparent transition-colors text-sm"
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-[#2F463E] mb-2">
                        {t('category')}
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F463E] focus:border-transparent transition-colors text-sm"
                      >
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Tags */}
                    <div className="sm:col-span-2 lg:col-span-1">
                      <label className="block text-sm font-medium text-[#2F463E] mb-2">
                        {t('tags')}
                      </label>
                      <input
                        type="text"
                        name="tags"
                        value={formData.tags}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F463E] focus:border-transparent transition-colors text-sm"
                        placeholder="tag1, tag2, tag3"
                      />
                    </div>
                  </div>

                  {/* Image URL */}
                  <div>
                    <label className="block text-sm font-medium text-[#2F463E] mb-2">
                      {t('imageUrl')}
                    </label>
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F463E] focus:border-transparent transition-colors text-sm sm:text-base"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  {/* Excerpt */}
                  <div>
                    <label className="block text-sm font-medium text-[#2F463E] mb-2">
                      {t('excerpt')} *
                    </label>
                    <textarea
                      name="excerpt"
                      value={formData.excerpt}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F463E] focus:border-transparent transition-colors resize-vertical text-sm sm:text-base"
                      placeholder={t('enterExcerpt')}
                      required
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <label className="block text-sm font-medium text-[#2F463E] mb-2">
                      {t('content')} *
                    </label>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      rows={12}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F463E] focus:border-transparent transition-colors resize-vertical text-sm sm:text-base font-mono"
                      placeholder={t('enterContent')}
                      required
                    />
                  </div>

                  {/* Checkboxes */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-3 sm:space-y-0">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-[#2F463E] bg-gray-100 border-gray-300 rounded focus:ring-[#2F463E] focus:ring-2"
                      />
                      <span className="ml-2 text-sm text-gray-700">{t('featured')}</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="published"
                        checked={formData.published}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-[#2F463E] bg-gray-100 border-gray-300 rounded focus:ring-[#2F463E] focus:ring-2"
                      />
                      <span className="ml-2 text-sm text-gray-700">{t('published')}</span>
                    </label>
                  </div>

                  {/* Desktop Action Buttons */}
                  <div className="hidden md:flex justify-end space-x-4 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => setCurrentView('list')}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      {t('cancel')}
                    </button>
                    <button
                      type="button"
                      onClick={handleSave}
                      className="px-6 py-3 bg-[#2F463E] text-white rounded-lg hover:bg-[#3a5a4e] transition-colors font-medium flex items-center"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {currentView === 'create' ? t('createPost') : t('updatePost')}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Mobile Action Buttons */}
            <div className="md:hidden mt-6 flex flex-col space-y-3">
              <button
                type="button"
                onClick={handleSave}
                className="w-full px-4 py-3 bg-[#2F463E] text-white rounded-lg hover:bg-[#3a5a4e] transition-colors font-medium flex items-center justify-center"
              >
                <Save className="w-4 h-4 mr-2" />
                {currentView === 'create' ? t('createPost') : t('updatePost')}
              </button>
              <button
                type="button"
                onClick={() => setCurrentView('list')}
                className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                {t('cancel')}
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Announcement Bar */}
      <div className="bg-[#F5F3EE] py-2 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center text-sm">
          <div className="mb-2 sm:mb-0">
            <p className="text-[#666666] font-medium">
              {t('adminPanel')}
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
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
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#2F463E] shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="text-white hover:text-gray-200 transition-colors p-2 hover:bg-white hover:bg-opacity-10 rounded-lg"
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-white text-xl sm:text-2xl font-bold tracking-wide">
                {t('blogAdmin')}
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
              <button onClick={onNavigateToBlog} className="text-white hover:text-gray-200 transition-colors font-medium text-sm">
                {t('blog')}
              </button>
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
                <button onClick={onNavigateToWorkshops} className="text-white hover:text-gray-200 transition-colors font-medium text-sm text-left">
                  {t('production')}
                </button>
                <button onClick={onNavigateToBlog} className="text-white hover:text-gray-200 transition-colors font-medium text-sm text-left">
                  {t('blog')}
                </button>
                <button onClick={onNavigateToContact} className="text-white hover:text-gray-200 transition-colors font-medium text-sm text-left">
                  {t('contact')}
                </button>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Admin Content */}
      <section className="py-6 sm:py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Controls */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 flex-1 lg:max-w-2xl">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder={t('searchPosts')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F463E] focus:border-transparent transition-colors text-sm sm:text-base"
                  />
                </div>

                {/* Category Filter */}
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full sm:w-auto pl-10 pr-8 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F463E] focus:border-transparent transition-colors text-sm sm:text-base appearance-none bg-white"
                  >
                    <option value="All">{t('allCategories')}</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Create Button */}
              <button
                onClick={handleCreateNew}
                className="w-full sm:w-auto bg-[#2F463E] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-[#3a5a4e] transition-colors font-medium flex items-center justify-center text-sm sm:text-base"
              >
                <Plus className="w-4 h-4 mr-2" />
                {t('createPost')}
              </button>
            </div>
          </div>

          {/* Posts List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F5F3EE]">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-[#2F463E]">{t('title')}</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-[#2F463E]">{t('author')}</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-[#2F463E]">{t('category')}</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-[#2F463E]">{t('date')}</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-[#2F463E]">{t('status')}</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-[#2F463E]">{t('actions')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {post.featured && (
                            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full mr-2">
                              {t('featured')}
                            </span>
                          )}
                          <span className="font-medium text-gray-900 truncate max-w-xs">
                            {post.title}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{post.author}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryBySlug(post.category)?.color || 'bg-gray-200 text-gray-700'}`}>
                          {getCategoryBySlug(post.category)?.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{formatDate(post.date)}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {post.published ? (
                            <Eye className="w-4 h-4 text-green-500 mr-1" />
                          ) : (
                            <EyeOff className="w-4 h-4 text-gray-400 mr-1" />
                          )}
                          <span className={`text-sm ${post.published ? 'text-green-600' : 'text-gray-500'}`}>
                            {post.published ? t('published') : t('draft')}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(post)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden">
              {filteredPosts.map((post) => (
                <div key={post.id} className="p-4 border-b border-gray-200 last:border-b-0">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center mb-2">
                        {post.featured && (
                          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full mr-2 flex-shrink-0">
                            {t('featured')}
                          </span>
                        )}
                        <h3 className="font-medium text-gray-900 truncate text-sm">
                          {post.title}
                        </h3>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-2">
                        <span>{post.author}</span>
                        <span>•</span>
                        <span>{formatDate(post.date)}</span>
                        <span>•</span>
                        <span className={`px-2 py-1 rounded-full font-medium ${getCategoryBySlug(post.category)?.color || 'bg-gray-200 text-gray-700'}`}>
                          {getCategoryBySlug(post.category)?.name}
                        </span>
                      </div>

                      <div className="flex items-center text-xs">
                        {post.published ? (
                          <>
                            <Eye className="w-3 h-3 text-green-500 mr-1" />
                            <span className="text-green-600">{t('published')}</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3 text-gray-400 mr-1" />
                            <span className="text-gray-500">{t('draft')}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Mobile Action Buttons */}
                    <div className="flex space-x-2 ml-3 flex-shrink-0">
                      <button
                        onClick={() => handleEdit(post)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                <p className="text-base mb-2">{t('noPostsFound')}</p>
                <p className="text-sm">
                  {searchQuery || selectedCategory !== 'All' 
                    ? t('tryAdjustingFilters')
                    : t('createFirstPost')
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogAdmin;