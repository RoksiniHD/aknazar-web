import { useState, useEffect, createContext, useContext } from 'react';

export type Language = 'en' | 'ru' | 'uz';

export interface Translations {
  // Common
  home: string;
  products: string;
  production: string;
  aboutUs: string;
  blog: string;
  contact: string;
  admin: string;
  
  // Announcement Bar
  shippingInfo: string;
  businessHours: string;
  
  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  exploreFabrics: string;
  
  // Workshops Section
  ourWorkshops: string;
  workshopsDescription: string;
  knitting: string;
  knittingDescription: string;
  dyeing: string;
  dyeingDescription: string;
  finishing: string;
  finishingDescription: string;
  qualityControl: string;
  qualityControlDescription: string;
  learnMore: string;
  
  // Products Section
  ourPremiumFabrics: string;
  productsDescription: string;
  viewAllProducts: string;
  
  // Trust Section
  trustedByDesigners: string;
  isoCertified: string;
  qualityGuaranteed: string;
  globalShipping: string;
  reliableDelivery: string;
  premiumQuality: string;
  traditionalCraftsmanship: string;
  expertSupport: string;
  freeConsultation: string;
  
  // Journey Section
  ourJourney: string;
  journeyDescription: string;
  humbleBeginnings: string;
  humbleBeginnersDesc: string;
  firstExportSuccess: string;
  firstExportDesc: string;
  isoCertification: string;
  isoCertificationDesc: string;
  europeanMarkets: string;
  europeanMarketsDesc: string;
  digitalInnovation: string;
  digitalInnovationDesc: string;
  meetOurMasterCraftsmen: string;
  masterCraftsmenDesc: string;
  founderMasterCraftsman: string;
  founderDesc: string;
  qualityControlDirector: string;
  qualityDirectorDesc: string;
  internationalSalesManager: string;
  salesManagerDesc: string;
  
  // Footer
  companyDescription: string;
  company: string;
  newsletter: string;
  newsletterDescription: string;
  enterEmail: string;
  privacyPolicy: string;
  agreeWith: string;
  allRightsReserved: string;
  craftedWithTradition: string;
  
  // Blog
  textileInsights: string;
  blogHeroDescription: string;
  searchArticles: string;
  all: string;
  featured: string;
  readMore: string;
  readArticle: string;
  noArticlesFound: string;
  noArticlesMatch: string;
  noArticlesCategory: string;
  noArticlesAvailable: string;
  clearFilters: string;
  loadMoreArticles: string;
  relatedArticles: string;
  shareArticle: string;
  
  // Contact
  getInTouch: string;
  contactHeroDescription: string;
  sendMessage: string;
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  message: string;
  enterFullName: string;
  enterEmail: string;
  enterPhone: string;
  tellUsRequirements: string;
  contactInformation: string;
  address: string;
  phone: string;
  email: string;
  
  // Admin
  blogAdministration: string;
  adminDescription: string;
  newPost: string;
  totalPosts: string;
  published: string;
  drafts: string;
  managePosts: string;
  edit: string;
  delete: string;
  createNewPost: string;
  editPost: string;
  postDetails: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  selectCategory: string;
  featuredImage: string;
  author: string;
  featuredPost: string;
  markAsFeatured: string;
  publishPost: string;
  saveAsDraft: string;
  tags: string;
  addTag: string;
  seoSettings: string;
  metaTitle: string;
  metaDescription: string;
  cancel: string;
  save: string;
  confirmDelete: string;
  deletePostConfirm: string;
  
  // Categories
  sustainability: string;
  craftsmanship: string;
  quality: string;
  business: string;
  technology: string;
  design: string;
  
  // Fabric Types
  knitFabrics: string;
  flatKnit: string;
  laceTextiles: string;
  crochetFabrics: string;
  jacquardWeaves: string;
  organicCotton: string;
  performanceBlends: string;
  
  // Fabric Descriptions
  knitDescription: string;
  flatKnitDescription: string;
  laceDescription: string;
  crochetDescription: string;
  jacquardDescription: string;
  organicCottonDescription: string;
  performanceDescription: string;
  
  // Products Page
  ourCompleteCollection: string;
  completeCollectionDesc: string;
  premiumKnitFabrics: string;
  flatKnitCollection: string;
  elegantLaceTextiles: string;
  handcraftedCrochet: string;
  luxuryJacquardWeaves: string;
  organicCottonBlend: string;
  silkBlendFabrics: string;
  woolBlendCollection: string;
  specialtyTextiles: string;
  
  // Workshop Details
  whereFabricMeetsExcellence: string;
  rawMaterialsWarehouse: string;
  rawMaterialsDesc: string;
  knittingWorkshop: string;
  dyeingWorkshop: string;
  finishingWorkshop: string;
  designShop: string;
  designShopDesc: string;
  packingShop: string;
  packingShopDesc: string;
  
  // Time and Date
  minRead: string;
  readTime: string;
  
  // Form Validation
  required: string;
  optional: string;
}

const translations: Record<Language, Translations> = {
  en: {
    // Common
    home: 'Home',
    products: 'Our Products',
    production: 'Production',
    aboutUs: 'About Us',
    blog: 'Blog',
    contact: 'Contact',
    admin: 'Admin',
    
    // Announcement Bar
    shippingInfo: 'We ship across Central Asia and Europe',
    businessHours: 'Mon-Sat: 9:00-18:00',
    
    // Hero Section
    heroTitle: "Uzbekistan's Trusted Fabric Supplier",
    heroSubtitle: 'Discover quality textiles crafted with tradition and care. Supplying premium Knit, Flat Knit, Lace, and Crochet fabrics across Central Asia and Europe.',
    exploreFabrics: 'Explore Our Fabrics',
    
    // Workshops Section
    ourWorkshops: 'Our Workshops',
    workshopsDescription: 'We combine technology and craftsmanship to deliver consistent, high-quality fabric.',
    knitting: 'Knitting',
    knittingDescription: 'Where our yarns take shape. We produce circular and flat knit fabrics with precision and speed.',
    dyeing: 'Dyeing',
    dyeingDescription: 'Color that lasts. Our dyeing unit ensures consistent shades and eco-friendly processes.',
    finishing: 'Finishing',
    finishingDescription: 'Softness, strength, and perfect texture — every fabric is fine-tuned for performance.',
    qualityControl: 'Quality Control',
    qualityControlDescription: 'Every batch is inspected for color, durability, and accuracy before dispatch.',
    learnMore: 'Learn More',
    
    // Products Section
    ourPremiumFabrics: 'Our Premium Fabrics',
    productsDescription: 'Discover our extensive collection of high-quality textiles, each crafted with traditional Uzbek techniques and modern precision.',
    viewAllProducts: 'View All Products',
    
    // Trust Section
    trustedByDesigners: 'Trusted by Designers Across Central Asia',
    isoCertified: 'ISO Certified',
    qualityGuaranteed: 'Quality guaranteed materials',
    globalShipping: 'Global Shipping',
    reliableDelivery: 'Reliable delivery worldwide',
    premiumQuality: 'Premium Quality',
    traditionalCraftsmanship: 'Traditional craftsmanship',
    expertSupport: 'Expert Support',
    freeConsultation: 'Free consultation available',
    
    // Journey Section
    ourJourney: 'Our Journey',
    journeyDescription: 'From a small workshop in Tashkent to serving designers across continents, our story is woven with tradition, quality, and innovation.',
    humbleBeginnings: 'Humble Beginnings',
    humbleBeginnersDesc: 'Founded by master craftsman Aknazar in a small workshop, focusing on traditional Uzbek textile techniques.',
    firstExportSuccess: 'First Export Success',
    firstExportDesc: 'Expanded beyond local markets, establishing our first international partnerships across Central Asia.',
    isoCertification: 'ISO Certification',
    isoCertificationDesc: 'Achieved international quality standards while preserving our traditional craftsmanship methods.',
    europeanMarkets: 'European Markets',
    europeanMarketsDesc: 'Successfully entered European textile markets, bringing Uzbek quality to fashion houses across the continent.',
    digitalInnovation: 'Digital Innovation',
    digitalInnovationDesc: 'Launched our digital platform to connect directly with designers and manufacturers worldwide.',
    meetOurMasterCraftsmen: 'Meet Our Master Craftsmen',
    masterCraftsmenDesc: 'Behind every thread is a story of expertise, passion, and dedication to preserving Uzbek textile traditions.',
    founderMasterCraftsman: 'Founder & Master Craftsman',
    founderDesc: 'With over 30 years of experience, Aknazar founded our company with a vision to share Uzbekistan\'s rich textile heritage with the world.',
    qualityControlDirector: 'Quality Control Director',
    qualityDirectorDesc: 'Ensuring every fabric meets international standards while maintaining the authentic touch of traditional Uzbek craftsmanship.',
    internationalSalesManager: 'International Sales Manager',
    salesManagerDesc: 'Building bridges between Uzbek textile artisans and designers across Central Asia and Europe for over 15 years.',
    
    // Footer
    companyDescription: 'Aknazar Textile is a premium fabric supplier based in Uzbekistan, specializing in traditional craftsmanship and modern quality standards.',
    company: 'Company',
    newsletter: 'Newsletter',
    newsletterDescription: 'Stay updated with our latest fabric collections and industry insights.',
    enterEmail: 'Enter your email',
    privacyPolicy: 'privacy policy',
    agreeWith: 'I agree with',
    allRightsReserved: '© 2025 Aknazar Textile. All rights reserved.',
    craftedWithTradition: 'Crafted with tradition in Uzbekistan',
    
    // Blog
    textileInsights: 'Textile Insights & News',
    blogHeroDescription: 'Stay updated with industry trends, company news, and textile innovations',
    searchArticles: 'Search articles...',
    all: 'All',
    featured: 'Featured',
    readMore: 'Read More',
    readArticle: 'Read Article',
    noArticlesFound: 'No articles found',
    noArticlesMatch: 'No articles match',
    noArticlesCategory: 'No articles in',
    noArticlesAvailable: 'No articles available',
    clearFilters: 'Clear filters',
    loadMoreArticles: 'Load More Articles',
    relatedArticles: 'Related Articles',
    shareArticle: 'Share this article:',
    
    // Contact
    getInTouch: 'Get in Touch',
    contactHeroDescription: 'Let\'s connect and discuss how we can help you',
    sendMessage: 'Send us a Message',
    fullName: 'Full Name',
    emailAddress: 'Email Address',
    phoneNumber: 'Phone Number',
    message: 'Message',
    enterFullName: 'Enter your full name',
    enterEmail: 'Enter your email address',
    enterPhone: 'Enter your phone number (optional)',
    tellUsRequirements: 'Tell us about your requirements...',
    contactInformation: 'Contact Information',
    address: 'Address',
    phone: 'Phone',
    email: 'Email',
    
    // Admin
    blogAdministration: 'Blog Administration',
    adminDescription: 'Manage your blog posts, create new content, and organize your articles.',
    newPost: 'New Post',
    totalPosts: 'Total Posts',
    published: 'Published',
    drafts: 'Drafts',
    managePosts: 'Manage Posts',
    edit: 'Edit',
    delete: 'Delete',
    createNewPost: 'Create New Post',
    editPost: 'Edit Post',
    postDetails: 'Post Details',
    title: 'Title',
    excerpt: 'Excerpt',
    content: 'Content',
    category: 'Category',
    selectCategory: 'Select a category',
    featuredImage: 'Featured Image',
    author: 'Author',
    featuredPost: 'Featured Post',
    markAsFeatured: 'Mark this post as featured',
    publishPost: 'Publish Post',
    saveAsDraft: 'Save as Draft',
    tags: 'Tags',
    addTag: 'Add Tag',
    seoSettings: 'SEO Settings',
    metaTitle: 'Meta Title',
    metaDescription: 'Meta Description',
    cancel: 'Cancel',
    save: 'Save',
    confirmDelete: 'Confirm Delete',
    deletePostConfirm: 'Are you sure you want to delete this post? This action cannot be undone.',
    
    // Categories
    sustainability: 'Sustainability',
    craftsmanship: 'Craftsmanship',
    quality: 'Quality',
    business: 'Business',
    technology: 'Technology',
    design: 'Design',
    
    // Fabric Types
    knitFabrics: 'Knit Fabrics',
    flatKnit: 'Flat Knit',
    laceTextiles: 'Lace Textiles',
    crochetFabrics: 'Crochet Fabrics',
    jacquardWeaves: 'Jacquard Weaves',
    organicCotton: 'Organic Cotton',
    performanceBlends: 'Performance Blends',
    
    // Fabric Descriptions
    knitDescription: 'Soft, flexible knitted textiles perfect for comfortable garments and modern fashion.',
    flatKnitDescription: 'Smooth, even-textured fabrics ideal for structured clothing and professional wear.',
    laceDescription: 'Delicate, intricate patterns that add elegance and sophistication to any design.',
    crochetDescription: 'Handcrafted textures with traditional patterns, perfect for unique fashion pieces.',
    jacquardDescription: 'Complex woven patterns with rich textures, ideal for luxury fashion and home textiles.',
    organicCottonDescription: 'Sustainable, eco-friendly cotton fabrics with superior softness and breathability.',
    performanceDescription: 'Advanced fabric blends engineered for durability, moisture-wicking, and comfort.',
    
    // Products Page
    ourCompleteCollection: 'Our Complete Collection',
    completeCollectionDesc: 'Explore our full range of premium fabrics, each crafted with traditional Uzbek techniques and modern precision.',
    premiumKnitFabrics: 'Premium Knit Fabrics',
    flatKnitCollection: 'Flat Knit Collection',
    elegantLaceTextiles: 'Elegant Lace Textiles',
    handcraftedCrochet: 'Handcrafted Crochet',
    luxuryJacquardWeaves: 'Luxury Jacquard Weaves',
    organicCottonBlend: 'Organic Cotton Blend',
    silkBlendFabrics: 'Silk Blend Fabrics',
    woolBlendCollection: 'Wool Blend Collection',
    specialtyTextiles: 'Specialty Textiles',
    
    // Workshop Details
    whereFabricMeetsExcellence: 'Where Fabric Meets Excellence',
    rawMaterialsWarehouse: 'Raw Materials Warehouse',
    rawMaterialsDesc: 'Where it all begins — premium yarns and materials are stored and prepared in a controlled environment to ensure fabric integrity.',
    knittingWorkshop: 'Knitting Workshop',
    dyeingWorkshop: 'Dyeing Workshop',
    finishingWorkshop: 'Finishing Workshop',
    designShop: 'Design Shop',
    designShopDesc: 'Our design shop brings creativity to the loom — from concept to pattern, our team turns ideas into tangible textures.',
    packingShop: 'Packing Shop',
    packingShopDesc: 'Each finished roll is carefully packaged, labeled, and made ready for safe delivery to clients across Central Asia and Europe.',
    
    // Time and Date
    minRead: 'min read',
    readTime: 'Read Time',
    
    // Form Validation
    required: '*',
    optional: '',
  },
  
  ru: {
    // Common
    home: 'Главная',
    products: 'Наши Продукты',
    production: 'Производство',
    aboutUs: 'О Нас',
    blog: 'Блог',
    contact: 'Контакты',
    admin: 'Админ',
    
    // Announcement Bar
    shippingInfo: 'Мы доставляем по Центральной Азии и Европе',
    businessHours: 'Пн-Сб: 9:00-18:00',
    
    // Hero Section
    heroTitle: 'Надежный поставщик тканей из Узбекистана',
    heroSubtitle: 'Откройте для себя качественный текстиль, созданный с традициями и заботой. Поставляем премиальные трикотажные, плоские, кружевные и вязаные ткани по Центральной Азии и Европе.',
    exploreFabrics: 'Изучить Наши Ткани',
    
    // Workshops Section
    ourWorkshops: 'Наши Мастерские',
    workshopsDescription: 'Мы сочетаем технологии и мастерство для производства качественных тканей.',
    knitting: 'Вязание',
    knittingDescription: 'Здесь наши нити обретают форму. Мы производим круговые и плоские трикотажные ткани с точностью и скоростью.',
    dyeing: 'Окрашивание',
    dyeingDescription: 'Цвет, который держится. Наш цех окрашивания обеспечивает стабильные оттенки и экологичные процессы.',
    finishing: 'Отделка',
    finishingDescription: 'Мягкость, прочность и идеальная текстура — каждая ткань настроена для производительности.',
    qualityControl: 'Контроль Качества',
    qualityControlDescription: 'Каждая партия проверяется на цвет, долговечность и точность перед отправкой.',
    learnMore: 'Узнать Больше',
    
    // Products Section
    ourPremiumFabrics: 'Наши Премиальные Ткани',
    productsDescription: 'Откройте для себя нашу обширную коллекцию высококачественного текстиля, созданного с традиционными узбекскими техниками и современной точностью.',
    viewAllProducts: 'Посмотреть Все Продукты',
    
    // Trust Section
    trustedByDesigners: 'Доверие дизайнеров по всей Центральной Азии',
    isoCertified: 'ISO Сертифицировано',
    qualityGuaranteed: 'Гарантированное качество материалов',
    globalShipping: 'Глобальная Доставка',
    reliableDelivery: 'Надежная доставка по всему миру',
    premiumQuality: 'Премиальное Качество',
    traditionalCraftsmanship: 'Традиционное мастерство',
    expertSupport: 'Экспертная Поддержка',
    freeConsultation: 'Бесплатная консультация',
    
    // Journey Section
    ourJourney: 'Наш Путь',
    journeyDescription: 'От небольшой мастерской в Ташкенте до обслуживания дизайнеров на континентах, наша история соткана из традиций, качества и инноваций.',
    humbleBeginnings: 'Скромное Начало',
    humbleBeginnersDesc: 'Основана мастером-ремесленником Акназаром в небольшой мастерской, сосредоточившись на традиционных узбекских текстильных техниках.',
    firstExportSuccess: 'Первый Экспортный Успех',
    firstExportDesc: 'Расширились за пределы местных рынков, установив первые международные партнерства по Центральной Азии.',
    isoCertification: 'ISO Сертификация',
    isoCertificationDesc: 'Достигли международных стандартов качества, сохранив традиционные методы мастерства.',
    europeanMarkets: 'Европейские Рынки',
    europeanMarketsDesc: 'Успешно вошли на европейские текстильные рынки, принеся узбекское качество в дома моды по всему континенту.',
    digitalInnovation: 'Цифровые Инновации',
    digitalInnovationDesc: 'Запустили нашу цифровую платформу для прямого подключения к дизайнерам и производителям по всему миру.',
    meetOurMasterCraftsmen: 'Познакомьтесь с Нашими Мастерами',
    masterCraftsmenDesc: 'За каждой нитью стоит история экспертизы, страсти и преданности сохранению узбекских текстильных традиций.',
    founderMasterCraftsman: 'Основатель и Мастер-Ремесленник',
    founderDesc: 'С более чем 30-летним опытом, Акназар основал нашу компанию с видением поделиться богатым текстильным наследием Узбекистана с миром.',
    qualityControlDirector: 'Директор по Контролю Качества',
    qualityDirectorDesc: 'Обеспечивает соответствие каждой ткани международным стандартам, сохраняя аутентичное прикосновение традиционного узбекского мастерства.',
    internationalSalesManager: 'Менеджер по Международным Продажам',
    salesManagerDesc: 'Строит мосты между узбекскими текстильными мастерами и дизайнерами по Центральной Азии и Европе более 15 лет.',
    
    // Footer
    companyDescription: 'Aknazar Textile - премиальный поставщик тканей из Узбекистана, специализирующийся на традиционном мастерстве и современных стандартах качества.',
    company: 'Компания',
    newsletter: 'Рассылка',
    newsletterDescription: 'Будьте в курсе наших последних коллекций тканей и отраслевых новостей.',
    enterEmail: 'Введите ваш email',
    privacyPolicy: 'политикой конфиденциальности',
    agreeWith: 'Я согласен с',
    allRightsReserved: '© 2025 Aknazar Textile. Все права защищены.',
    craftedWithTradition: 'Создано с традициями в Узбекистане',
    
    // Blog
    textileInsights: 'Новости и Аналитика Текстиля',
    blogHeroDescription: 'Будьте в курсе отраслевых трендов, новостей компании и текстильных инноваций',
    searchArticles: 'Поиск статей...',
    all: 'Все',
    featured: 'Рекомендуемые',
    readMore: 'Читать Далее',
    readArticle: 'Читать Статью',
    noArticlesFound: 'Статьи не найдены',
    noArticlesMatch: 'Нет статей, соответствующих',
    noArticlesCategory: 'Нет статей в категории',
    noArticlesAvailable: 'Статьи недоступны',
    clearFilters: 'Очистить фильтры',
    loadMoreArticles: 'Загрузить Больше Статей',
    relatedArticles: 'Похожие Статьи',
    shareArticle: 'Поделиться этой статьей:',
    
    // Contact
    getInTouch: 'Связаться с Нами',
    contactHeroDescription: 'Давайте свяжемся и обсудим, как мы можем вам помочь',
    sendMessage: 'Отправить Сообщение',
    fullName: 'Полное Имя',
    emailAddress: 'Email Адрес',
    phoneNumber: 'Номер Телефона',
    message: 'Сообщение',
    enterFullName: 'Введите ваше полное имя',
    enterEmail: 'Введите ваш email адрес',
    enterPhone: 'Введите ваш номер телефона (необязательно)',
    tellUsRequirements: 'Расскажите нам о ваших требованиях...',
    contactInformation: 'Контактная Информация',
    address: 'Адрес',
    phone: 'Телефон',
    email: 'Email',
    
    // Admin
    blogAdministration: 'Администрирование Блога',
    adminDescription: 'Управляйте постами блога, создавайте новый контент и организуйте ваши статьи.',
    newPost: 'Новый Пост',
    totalPosts: 'Всего Постов',
    published: 'Опубликовано',
    drafts: 'Черновики',
    managePosts: 'Управление Постами',
    edit: 'Редактировать',
    delete: 'Удалить',
    createNewPost: 'Создать Новый Пост',
    editPost: 'Редактировать Пост',
    postDetails: 'Детали Поста',
    title: 'Заголовок',
    excerpt: 'Выдержка',
    content: 'Содержание',
    category: 'Категория',
    selectCategory: 'Выберите категорию',
    featuredImage: 'Главное Изображение',
    author: 'Автор',
    featuredPost: 'Рекомендуемый Пост',
    markAsFeatured: 'Отметить этот пост как рекомендуемый',
    publishPost: 'Опубликовать Пост',
    saveAsDraft: 'Сохранить как Черновик',
    tags: 'Теги',
    addTag: 'Добавить Тег',
    seoSettings: 'SEO Настройки',
    metaTitle: 'Мета Заголовок',
    metaDescription: 'Мета Описание',
    cancel: 'Отмена',
    save: 'Сохранить',
    confirmDelete: 'Подтвердить Удаление',
    deletePostConfirm: 'Вы уверены, что хотите удалить этот пост? Это действие нельзя отменить.',
    
    // Categories
    sustainability: 'Устойчивость',
    craftsmanship: 'Мастерство',
    quality: 'Качество',
    business: 'Бизнес',
    technology: 'Технологии',
    design: 'Дизайн',
    
    // Fabric Types
    knitFabrics: 'Трикотажные Ткани',
    flatKnit: 'Плоский Трикотаж',
    laceTextiles: 'Кружевной Текстиль',
    crochetFabrics: 'Вязаные Ткани',
    jacquardWeaves: 'Жаккардовые Переплетения',
    organicCotton: 'Органический Хлопок',
    performanceBlends: 'Функциональные Смеси',
    
    // Fabric Descriptions
    knitDescription: 'Мягкие, гибкие трикотажные ткани, идеальные для удобной одежды и современной моды.',
    flatKnitDescription: 'Гладкие, равномерно текстурированные ткани, идеальные для структурированной одежды и профессиональной одежды.',
    laceDescription: 'Деликатные, сложные узоры, которые добавляют элегантность и изысканность любому дизайну.',
    crochetDescription: 'Ручные текстуры с традиционными узорами, идеальные для уникальных модных изделий.',
    jacquardDescription: 'Сложные тканые узоры с богатыми текстурами, идеальные для роскошной моды и домашнего текстиля.',
    organicCottonDescription: 'Устойчивые, экологически чистые хлопковые ткани с превосходной мягкостью и воздухопроницаемостью.',
    performanceDescription: 'Передовые тканевые смеси, разработанные для долговечности, отвода влаги и комфорта.',
    
    // Products Page
    ourCompleteCollection: 'Наша Полная Коллекция',
    completeCollectionDesc: 'Изучите наш полный ассортимент премиальных тканей, каждая из которых создана с традиционными узбекскими техниками и современной точностью.',
    premiumKnitFabrics: 'Премиальные Трикотажные Ткани',
    flatKnitCollection: 'Коллекция Плоского Трикотажа',
    elegantLaceTextiles: 'Элегантный Кружевной Текстиль',
    handcraftedCrochet: 'Ручное Вязание',
    luxuryJacquardWeaves: 'Роскошные Жаккардовые Переплетения',
    organicCottonBlend: 'Смесь Органического Хлопка',
    silkBlendFabrics: 'Ткани из Шелковой Смеси',
    woolBlendCollection: 'Коллекция Шерстяных Смесей',
    specialtyTextiles: 'Специальный Текстиль',
    
    // Workshop Details
    whereFabricMeetsExcellence: 'Где Ткань Встречает Совершенство',
    rawMaterialsWarehouse: 'Склад Сырья',
    rawMaterialsDesc: 'Здесь все начинается — премиальные нити и материалы хранятся и подготавливаются в контролируемой среде для обеспечения целостности ткани.',
    knittingWorkshop: 'Вязальная Мастерская',
    dyeingWorkshop: 'Красильная Мастерская',
    finishingWorkshop: 'Отделочная Мастерская',
    designShop: 'Дизайн-Студия',
    designShopDesc: 'Наша дизайн-студия привносит креативность в ткацкий станок — от концепции до узора, наша команда превращает идеи в осязаемые текстуры.',
    packingShop: 'Упаковочный Цех',
    packingShopDesc: 'Каждый готовый рулон тщательно упаковывается, маркируется и готовится к безопасной доставке клиентам по Центральной Азии и Европе.',
    
    // Time and Date
    minRead: 'мин чтения',
    readTime: 'Время Чтения',
    
    // Form Validation
    required: '*',
    optional: '',
  },
  
  uz: {
    // Common
    home: 'Bosh sahifa',
    products: 'Mahsulotlarimiz',
    production: 'Ishlab chiqarish',
    aboutUs: 'Biz haqimizda',
    blog: 'Blog',
    contact: 'Aloqa',
    admin: 'Admin',
    
    // Announcement Bar
    shippingInfo: 'Biz Markaziy Osiyo va Yevropa bo\'ylab yetkazib beramiz',
    businessHours: 'Du-Sha: 9:00-18:00',
    
    // Hero Section
    heroTitle: 'O\'zbekistonning ishonchli mato yetkazib beruvchisi',
    heroSubtitle: 'An\'ana va g\'amxo\'rlik bilan yaratilgan sifatli to\'qimachilikni kashf eting. Markaziy Osiyo va Yevropa bo\'ylab yuqori sifatli trikotaj, tekis trikotaj, to\'r va toquv matolarini yetkazib beramiz.',
    exploreFabrics: 'Matolarimizni o\'rganing',
    
    // Workshops Section
    ourWorkshops: 'Bizning ustaxonalarimiz',
    workshopsDescription: 'Biz texnologiya va hunarmandchilikni birlashtirib, barqaror, yuqori sifatli mato ishlab chiqaramiz.',
    knitting: 'To\'quv',
    knittingDescription: 'Bu yerda bizning iplar shakl oladi. Biz aniqlik va tezlik bilan dumaloq va tekis trikotaj matolarini ishlab chiqaramiz.',
    dyeing: 'Bo\'yash',
    dyeingDescription: 'Bardoshli rang. Bizning bo\'yash bo\'limiz barqaror ranglar va ekologik toza jarayonlarni ta\'minlaydi.',
    finishing: 'Yakunlash',
    finishingDescription: 'Yumshoqlik, mustahkamlik va mukammal tekstura — har bir mato ishlash uchun sozlanadi.',
    qualityControl: 'Sifat nazorati',
    qualityControlDescription: 'Har bir partiya jo\'natishdan oldin rang, bardoshlilik va aniqlik uchun tekshiriladi.',
    learnMore: 'Batafsil',
    
    // Products Section
    ourPremiumFabrics: 'Bizning yuqori sifatli matolarimiz',
    productsDescription: 'An\'anaviy o\'zbek texnikasi va zamonaviy aniqlik bilan yaratilgan yuqori sifatli to\'qimachilik kolleksiyamizni kashf eting.',
    viewAllProducts: 'Barcha mahsulotlarni ko\'rish',
    
    // Trust Section
    trustedByDesigners: 'Markaziy Osiyo bo\'ylab dizaynerlar tomonidan ishoniladi',
    isoCertified: 'ISO sertifikatlangan',
    qualityGuaranteed: 'Sifat kafolatlangan materiallar',
    globalShipping: 'Global yetkazib berish',
    reliableDelivery: 'Dunyo bo\'ylab ishonchli yetkazib berish',
    premiumQuality: 'Yuqori sifat',
    traditionalCraftsmanship: 'An\'anaviy hunarmandchilik',
    expertSupport: 'Mutaxassis yordami',
    freeConsultation: 'Bepul maslahat mavjud',
    
    // Journey Section
    ourJourney: 'Bizning yo\'limiz',
    journeyDescription: 'Toshkentdagi kichik ustaxonadan qit\'alar bo\'ylab dizaynerlarga xizmat ko\'rsatishgacha, bizning hikoyamiz an\'ana, sifat va innovatsiya bilan to\'qilgan.',
    humbleBeginnings: 'Kamtarin boshlanish',
    humbleBeginnersDesc: 'Usta hunarmand Aknazar tomonidan kichik ustaxonada asos solingan, an\'anaviy o\'zbek to\'qimachilik texnikasiga e\'tibor qaratilgan.',
    firstExportSuccess: 'Birinchi eksport muvaffaqiyati',
    firstExportDesc: 'Mahalliy bozorlardan tashqariga chiqib, Markaziy Osiyo bo\'ylab birinchi xalqaro hamkorliklarni o\'rnatdi.',
    isoCertification: 'ISO sertifikatlash',
    isoCertificationDesc: 'An\'anaviy hunarmandchilik usullarini saqlab qolgan holda xalqaro sifat standartlariga erishdi.',
    europeanMarkets: 'Yevropa bozorlari',
    europeanMarketsDesc: 'Yevropa to\'qimachilik bozorlariga muvaffaqiyatli kirdi, o\'zbek sifatini qit\'a bo\'ylab moda uylariga olib keldi.',
    digitalInnovation: 'Raqamli innovatsiya',
    digitalInnovationDesc: 'Dunyo bo\'ylab dizaynerlar va ishlab chiqaruvchilar bilan to\'g\'ridan-to\'g\'ri bog\'lanish uchun raqamli platformamizni ishga tushirdik.',
    meetOurMasterCraftsmen: 'Bizning usta hunarmandlarimiz bilan tanishing',
    masterCraftsmenDesc: 'Har bir ipning orqasida tajriba, ishtiyoq va o\'zbek to\'qimachilik an\'analarini saqlab qolishga bag\'ishlanganlik hikoyasi bor.',
    founderMasterCraftsman: 'Asoschisi va usta hunarmand',
    founderDesc: '30 yildan ortiq tajriba bilan Aknazar kompaniyamizni O\'zbekistonning boy to\'qimachilik merosini dunyo bilan baham ko\'rish maqsadida asos solgan.',
    qualityControlDirector: 'Sifat nazorati direktori',
    qualityDirectorDesc: 'An\'anaviy o\'zbek hunarmandchiligining asl ta\'sirini saqlab qolgan holda har bir matoning xalqaro standartlarga javob berishini ta\'minlaydi.',
    internationalSalesManager: 'Xalqaro savdo menejeri',
    salesManagerDesc: '15 yildan ortiq vaqt davomida o\'zbek to\'qimachilik ustalarini Markaziy Osiyo va Yevropa dizaynerlari bilan bog\'lovchi ko\'priklar quradi.',
    
    // Footer
    companyDescription: 'Aknazar Textile - O\'zbekistonda joylashgan yuqori sifatli mato yetkazib beruvchi, an\'anaviy hunarmandchilik va zamonaviy sifat standartlariga ixtisoslashgan.',
    company: 'Kompaniya',
    newsletter: 'Yangiliklar',
    newsletterDescription: 'Eng so\'nggi mato kolleksiyalarimiz va sanoat yangiliklari bilan tanishib turing.',
    enterEmail: 'Emailingizni kiriting',
    privacyPolicy: 'maxfiylik siyosati',
    agreeWith: 'Men roziman',
    allRightsReserved: '© 2025 Aknazar Textile. Barcha huquqlar himoyalangan.',
    craftedWithTradition: 'O\'zbekistonda an\'ana bilan yaratilgan',
    
    // Blog
    textileInsights: 'To\'qimachilik yangiliklari va tahlillari',
    blogHeroDescription: 'Sanoat tendentsiyalari, kompaniya yangiliklari va to\'qimachilik innovatsiyalari bilan tanishib turing',
    searchArticles: 'Maqolalarni qidirish...',
    all: 'Hammasi',
    featured: 'Tavsiya etilgan',
    readMore: 'Davomini o\'qish',
    readArticle: 'Maqolani o\'qish',
    noArticlesFound: 'Maqolalar topilmadi',
    noArticlesMatch: 'Hech qanday maqola mos kelmaydi',
    noArticlesCategory: 'Kategoriyada maqolalar yo\'q',
    noArticlesAvailable: 'Maqolalar mavjud emas',
    clearFilters: 'Filtrlarni tozalash',
    loadMoreArticles: 'Ko\'proq maqolalar yuklash',
    relatedArticles: 'Tegishli maqolalar',
    shareArticle: 'Ushbu maqolani baham ko\'ring:',
    
    // Contact
    getInTouch: 'Bog\'laning',
    contactHeroDescription: 'Keling, bog\'lanaylik va sizga qanday yordam bera olishimizni muhokama qilaylik',
    sendMessage: 'Bizga xabar yuboring',
    fullName: 'To\'liq ism',
    emailAddress: 'Email manzil',
    phoneNumber: 'Telefon raqami',
    message: 'Xabar',
    enterFullName: 'To\'liq ismingizni kiriting',
    enterEmail: 'Email manzilingizni kiriting',
    enterPhone: 'Telefon raqamingizni kiriting (ixtiyoriy)',
    tellUsRequirements: 'Talablaringiz haqida bizga ayting...',
    contactInformation: 'Aloqa ma\'lumotlari',
    address: 'Manzil',
    phone: 'Telefon',
    email: 'Email',
    
    // Admin
    blogAdministration: 'Blog boshqaruvi',
    adminDescription: 'Blog postlaringizni boshqaring, yangi kontent yarating va maqolalaringizni tartibga soling.',
    newPost: 'Yangi post',
    totalPosts: 'Jami postlar',
    published: 'Nashr etilgan',
    drafts: 'Qoralamalar',
    managePosts: 'Postlarni boshqarish',
    edit: 'Tahrirlash',
    delete: 'O\'chirish',
    createNewPost: 'Yangi post yaratish',
    editPost: 'Postni tahrirlash',
    postDetails: 'Post tafsilotlari',
    title: 'Sarlavha',
    excerpt: 'Qisqacha',
    content: 'Kontent',
    category: 'Kategoriya',
    selectCategory: 'Kategoriyani tanlang',
    featuredImage: 'Asosiy rasm',
    author: 'Muallif',
    featuredPost: 'Tavsiya etilgan post',
    markAsFeatured: 'Ushbu postni tavsiya etilgan deb belgilang',
    publishPost: 'Postni nashr etish',
    saveAsDraft: 'Qoralama sifatida saqlash',
    tags: 'Teglar',
    addTag: 'Teg qo\'shish',
    seoSettings: 'SEO sozlamalari',
    metaTitle: 'Meta sarlavha',
    metaDescription: 'Meta tavsif',
    cancel: 'Bekor qilish',
    save: 'Saqlash',
    confirmDelete: 'O\'chirishni tasdiqlash',
    deletePostConfirm: 'Ushbu postni o\'chirishni xohlaysizmi? Bu amalni bekor qilib bo\'lmaydi.',
    
    // Categories
    sustainability: 'Barqarorlik',
    craftsmanship: 'Hunarmandchilik',
    quality: 'Sifat',
    business: 'Biznes',
    technology: 'Texnologiya',
    design: 'Dizayn',
    
    // Fabric Types
    knitFabrics: 'Trikotaj matolar',
    flatKnit: 'Tekis trikotaj',
    laceTextiles: 'To\'r to\'qimachilik',
    crochetFabrics: 'Toquv matolar',
    jacquardWeaves: 'Jakar to\'quv',
    organicCotton: 'Organik paxta',
    performanceBlends: 'Funktsional aralashmalar',
    
    // Fabric Descriptions
    knitDescription: 'Qulay kiyimlar va zamonaviy moda uchun mukammal yumshoq, moslashuvchan trikotaj matolar.',
    flatKnitDescription: 'Tuzilgan kiyimlar va professional kiyimlar uchun ideal silliq, bir xil teksturali matolar.',
    laceDescription: 'Har qanday dizaynga nafislik va murakkablik qo\'shadigan nozik, murakkab naqshlar.',
    crochetDescription: 'Noyob moda buyumlari uchun mukammal an\'anaviy naqshlar bilan qo\'lda ishlangan teksturalar.',
    jacquardDescription: 'Hashamatli moda va uy to\'qimachiligi uchun ideal boy teksturalar bilan murakkab to\'qilgan naqshlar.',
    organicCottonDescription: 'Yuqori yumshoqlik va nafas olish qobiliyati bilan barqaror, ekologik toza paxta matolar.',
    performanceDescription: 'Bardoshlilik, namlikni chiqarish va qulaylik uchun ishlab chiqilgan ilg\'or mato aralashmalari.',
    
    // Products Page
    ourCompleteCollection: 'Bizning to\'liq kolleksiyamiz',
    completeCollectionDesc: 'An\'anaviy o\'zbek texnikasi va zamonaviy aniqlik bilan yaratilgan yuqori sifatli matolarimizning to\'liq assortimentini o\'rganing.',
    premiumKnitFabrics: 'Yuqori sifatli trikotaj matolar',
    flatKnitCollection: 'Tekis trikotaj kolleksiyasi',
    elegantLaceTextiles: 'Nafis to\'r to\'qimachilik',
    handcraftedCrochet: 'Qo\'lda ishlangan toquv',
    luxuryJacquardWeaves: 'Hashamatli jakar to\'quv',
    organicCottonBlend: 'Organik paxta aralashmasi',
    silkBlendFabrics: 'Ipak aralashmasi matolar',
    woolBlendCollection: 'Jun aralashmasi kolleksiyasi',
    specialtyTextiles: 'Maxsus to\'qimachilik',
    
    // Workshop Details
    whereFabricMeetsExcellence: 'Mato mukammallik bilan uchrashgan joy',
    rawMaterialsWarehouse: 'Xom ashyo ombori',
    rawMaterialsDesc: 'Hammasi shu yerdan boshlanadi — yuqori sifatli iplar va materiallar mato yaxlitligini ta\'minlash uchun nazorat ostidagi muhitda saqlanadi va tayyorlanadi.',
    knittingWorkshop: 'To\'quv ustaxonasi',
    dyeingWorkshop: 'Bo\'yash ustaxonasi',
    finishingWorkshop: 'Yakunlash ustaxonasi',
    designShop: 'Dizayn do\'koni',
    designShopDesc: 'Bizning dizayn do\'konimiz to\'quv dastgohiga ijodkorlik olib keladi — kontseptsiyadan naqshgacha, bizning jamoamiz g\'oyalarni qo\'lga tegadigan teksturalarga aylantiradi.',
    packingShop: 'Qadoqlash do\'koni',
    packingShopDesc: 'Har bir tayyor rulon ehtiyotkorlik bilan qadoqlanadi, belgilanadi va Markaziy Osiyo va Yevropa mijozlariga xavfsiz yetkazib berish uchun tayyorlanadi.',
    
    // Time and Date
    minRead: 'daq o\'qish',
    readTime: 'O\'qish vaqti',
    
    // Form Validation
    required: '*',
    optional: '',
  }
};

export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  const changeLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('language', language);
  };

  const t = (key: keyof Translations): string => {
    return translations[currentLanguage][key] || translations.en[key] || key;
  };

  const getLanguageDisplay = (lang: Language): string => {
    const displays = {
      en: 'English',
      ru: 'Русский',
      uz: "O'zbek"
    };
    return displays[lang];
  };

  // Load saved language on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['en', 'ru', 'uz'].includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  return {
    currentLanguage,
    changeLanguage,
    t,
    getLanguageDisplay
  };
};

// Create context for language
export const LanguageContext = createContext<{
  currentLanguage: Language;
  changeLanguage: (language: Language) => void;
  t: (key: keyof Translations) => string;
  getLanguageDisplay: (lang: Language) => string;
} | null>(null);

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguageContext must be used within a LanguageProvider');
  }
  return context;
};