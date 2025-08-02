export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured: boolean;
  published: boolean;
  tags: string[];
  seo: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
}

export interface BlogState {
  posts: BlogPost[];
  categories: BlogCategory[];
  currentView: 'list' | 'single' | 'admin';
  currentPost: BlogPost | null;
  selectedCategory: string;
  searchQuery: string;
  isLoading: boolean;
}