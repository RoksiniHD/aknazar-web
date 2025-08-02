import React, { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, User, Clock, Tag, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { useLanguageContext } from '../hooks/useLanguage';
import { BlogPost } from '../types/blog';
import { useBlog } from '../hooks/useBlog';

interface BlogSinglePostProps {
  post: BlogPost;
  onBack: () => void;
  onNavigateHome: () => void;
  onNavigateToWorkshops: () => void;
  onNavigateToContact: () => void;
  onNavigateToProducts: () => void;
}

const BlogSinglePost: React.FC<BlogSinglePostProps> = ({
  post,
  onBack,
  onNavigateHome,
  onNavigateToWorkshops,
  onNavigateToContact,
  onNavigateToProducts
}) => {
  const { t } = useLanguageContext();
  const { getRelatedPosts, navigateToPost, formatDate, getCategoryBySlug } = useBlog();
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [visibleSections, setVisibleSections] = useState<string[]>([]);

  const relatedPosts = getRelatedPosts(post);
  const category = getCategoryBySlug(post.category);

  // Content animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsContentVisible(true);
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

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = post.title;

  const handleShare = (platform: string) => {
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    };
    
    window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400');
  };

  // Convert markdown-like content to HTML
  const formatContent = (content: string) => {
    return content
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold text-[#2F463E] mb-6 mt-8">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold text-[#2F463E] mb-4 mt-6">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold text-[#2F463E] mb-3 mt-4">$1</h3>')
      .replace(/^\*\*(.*?)\*\*/gm, '<strong class="font-semibold text-[#2F463E]">$1</strong>')
      .replace(/^\* (.*$)/gm, '<li class="mb-2">$1</li>')
      .replace(/^- \*\*(.*?)\*\* - (.*$)/gm, '<li class="mb-2"><strong class="text-[#2F463E]">$1</strong> - $2</li>')
      .replace(/^(\d+)\. \*\*(.*?)\*\* - (.*$)/gm, '<li class="mb-2"><strong class="text-[#2F463E]">$2</strong> - $3</li>')
      .replace(/^\*(.*?)\*$/gm, '<p class="text-center italic text-[#666666] my-6">$1</p>')
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/^(?!<[h|l|p])(.*$)/gm, '<p class="mb-4">$1</p>');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${post.image}')`
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#2F463E] bg-opacity-70" />

        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-6 left-6 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        >
          <ArrowLeft size={20} />
        </button>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className={`transition-all duration-1000 ${
            isContentVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            {/* Category Badge */}
            {category && (
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 ${category.color}`}>
                {t(category.slug as keyof typeof t)}
              </span>
            )}
            
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              {post.title}
            </h1>
            
            {/* Meta Information */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-white text-sm">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                {post.author}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {formatDate(post.date)}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {post.readTime}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          {/* Article Body */}
          <div 
            className={`prose prose-lg max-w-none transition-all duration-1000 delay-200 ${
              isContentVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div 
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
            />
          </div>

          {/* Tags */}
          <div 
            className={`mt-12 pt-8 border-t border-gray-200 transition-all duration-1000 delay-400 ${
              isContentVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex flex-wrap items-center gap-3">
              <Tag className="w-5 h-5 text-[#2F463E]" />
              {post.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="bg-[#F5F3EE] text-[#2F463E] px-3 py-1 rounded-full text-sm font-medium hover:bg-[#2F463E] hover:text-white transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Share Section */}
          <div 
            className={`mt-8 pt-8 border-t border-gray-200 transition-all duration-1000 delay-500 ${
              isContentVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Share2 className="w-5 h-5 text-[#2F463E]" />
                <span className="text-[#2F463E] font-medium">{t('shareArticle')}</span>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleShare('facebook')}
                  className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  className="p-2 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="p-2 bg-blue-800 text-white rounded-full hover:bg-blue-900 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section 
          className="py-16 bg-[#F5F3EE]"
          data-section-id="related-posts"
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className={`transition-all duration-1000 ${
              visibleSections.includes('related-posts')
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-12'
            }`}>
              <h2 className="text-3xl font-bold text-[#2F463E] mb-12 text-center">
                {t('relatedArticles')}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost, index) => (
                  <article 
                    key={relatedPost.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2 group cursor-pointer"
                    onClick={() => navigateToPost(relatedPost.slug)}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={relatedPost.image} 
                        alt={relatedPost.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white bg-opacity-90 text-[#2F463E] px-3 py-1 rounded-full text-xs font-medium">
                          {t(getCategoryBySlug(relatedPost.category)?.slug as keyof typeof t)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-[#2F463E] mb-3 leading-tight group-hover:text-[#3a5a4e] transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        {relatedPost.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center">
                          <User className="w-3 h-3 mr-1" />
                          {relatedPost.author}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {relatedPost.readTime}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogSinglePost;