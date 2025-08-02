import { useState, useEffect } from 'react';
import { BlogPost, BlogCategory, BlogState } from '../types/blog';
import { blogPosts, blogCategories } from '../data/blogData';

export const useBlog = () => {
  const [state, setState] = useState<BlogState>({
    posts: [],
    categories: [],
    currentView: 'list',
    currentPost: null,
    selectedCategory: 'All',
    searchQuery: '',
    isLoading: true
  });

  // Initialize data
  useEffect(() => {
    setState(prev => ({
      ...prev,
      posts: blogPosts.filter(post => post.published),
      categories: blogCategories,
      isLoading: false
    }));
  }, []);

  // Get filtered posts
  const getFilteredPosts = () => {
    let filtered = state.posts;

    // Filter by category
    if (state.selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === state.selectedCategory);
    }

    // Filter by search query
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  // Get post by slug
  const getPostBySlug = (slug: string): BlogPost | null => {
    return state.posts.find(post => post.slug === slug) || null;
  };

  // Get featured post
  const getFeaturedPost = (): BlogPost | null => {
    return state.posts.find(post => post.featured) || null;
  };

  // Get related posts
  const getRelatedPosts = (currentPost: BlogPost, limit: number = 3): BlogPost[] => {
    return state.posts
      .filter(post => 
        post.id !== currentPost.id && 
        (post.category === currentPost.category || 
         post.tags.some(tag => currentPost.tags.includes(tag)))
      )
      .slice(0, limit);
  };

  // Get posts by category
  const getPostsByCategory = (categorySlug: string): BlogPost[] => {
    return state.posts.filter(post => post.category === categorySlug);
  };

  // Get category by slug
  const getCategoryBySlug = (slug: string): BlogCategory | null => {
    return state.categories.find(cat => cat.slug === slug) || null;
  };

  // Actions
  const setSelectedCategory = (category: string) => {
    setState(prev => ({ ...prev, selectedCategory: category }));
  };

  const setSearchQuery = (query: string) => {
    setState(prev => ({ ...prev, searchQuery: query }));
  };

  const setCurrentView = (view: 'list' | 'single' | 'admin') => {
    setState(prev => ({ ...prev, currentView: view }));
  };

  const setCurrentPost = (post: BlogPost | null) => {
    setState(prev => ({ ...prev, currentPost: post }));
  };

  const navigateToPost = (slug: string) => {
    const post = getPostBySlug(slug);
    if (post) {
      setCurrentPost(post);
      setCurrentView('single');
    }
  };

  const navigateToList = () => {
    setCurrentPost(null);
    setCurrentView('list');
  };

  const navigateToAdmin = () => {
    setCurrentView('admin');
  };

  // Generate slug from title
  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  // Format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get reading time
  const calculateReadingTime = (content: string): string => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  return {
    // State
    ...state,
    
    // Computed
    filteredPosts: getFilteredPosts(),
    featuredPost: getFeaturedPost(),
    
    // Methods
    getPostBySlug,
    getRelatedPosts,
    getPostsByCategory,
    getCategoryBySlug,
    
    // Actions
    setSelectedCategory,
    setSearchQuery,
    setCurrentView,
    setCurrentPost,
    navigateToPost,
    navigateToList,
    navigateToAdmin,
    
    // Utilities
    generateSlug,
    formatDate,
    calculateReadingTime
  };
};