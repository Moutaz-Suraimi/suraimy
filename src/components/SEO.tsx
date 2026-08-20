import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  schema?: object;
  noIndex?: boolean;
}

const siteUrl = "https://suriix.com";
const defaultOgImage = `${siteUrl}/favicon-192x192.png`;

// High-quality default localized meta tags for all static routes
const metaDefaults: Record<
  string,
  {
    title: { ar: string; en: string; zh: string };
    description: { ar: string; en: string; zh: string };
    keywords: { ar: string; en: string; zh: string };
  }
> = {
  "/": {
    title: {
      ar: "Suriix | سوريكس - حلول رقمية متكاملة لنمو الأعمال",
      en: "Suriix | Professional Web Design & E-Commerce Solutions",
      zh: "Suriix | 专业网页设计与智能电商独立站开发",
    },
    description: {
      ar: "سوريكس Suriix تقدم حلولًا رقمية متكاملة لنمو الأعمال، تشمل تصميم وتطوير المواقع والمتاجر الإلكترونية والتسويق الرقمي والتصميم.",
      en: "Suriix is a premier digital agency specializing in professional web design, customized e-commerce development, branding, and AI-driven business automation. Founded by Eng. Moutaz Wael Nabeel Al-Suraimi.",
      zh: "Suriix 是一家顶尖的数字化代理商，专注于高转化率网页设计、企业出海电商独立站开发、品牌视觉升级与人工智能系统定制服务。由 Eng. Moutaz Wael Nabeel Al-Suraimi 创立。",
    },
    keywords: {
      ar: "تصميم مواقع, تصميم متاجر إلكترونية, برمجة مواقع, هوية بصرية, تسويق رقمي, وكالة رقمية, Suriix, سوريكس, معتز الصريمي, مهندس معتز وائل نبيل الصريمي",
      en: "web design, e-commerce development, website programming, visual identity, digital marketing, digital agency, Suriix, Suriix Agency, Moutaz Al-Suraimi, Moutaz Wael Nabeel Al-Suraimi",
      zh: "网页设计, 电商独立站, 网站开发, 品牌视觉, 数字营销, 数字化代理商, Suriix",
    },
  },
  "/about": {
    title: {
      ar: "من نحن | SURIix",
      en: "About Us | SURIix",
      zh: "关于我们 | SURIix",
    },
    description: {
      ar: "تعرف على وكالة SURIix الرقمية ومؤسسها المهندس معتز وائل نبيل الصريمي، ورؤيتنا لتقديم حلول مبتكرة تسهم في نمو وانتشار أعمالك الرقمية.",
      en: "Learn about SURIix Digital Agency, its founder Eng. Moutaz Wael Nabeel Al-Suraimi, and our vision to deliver innovative solutions that drive growth.",
      zh: "了解 SURIix 数字代理商及其创始人 Eng. Moutaz Wael Nabeel Al-Suraimi，以及我们为您的业务增长提供创新解决方案的愿景。",
    },
    keywords: {
      ar: "من نحن, رؤية SURIix, وكالة رقمية, معتز الصريمي, مؤسس SURIix",
      en: "about us, SURIix vision, digital agency, Moutaz Al-Suraimi, SURIix founder",
      zh: "关于我们, SURIix愿景, 数字化代理商, 关于SURIix",
    },
  },
  "/solutions": {
    title: {
      ar: "حلولنا الرقمية | SURIix",
      en: "Our Digital Solutions | SURIix",
      zh: "我们的数字解决方案 | SURIix",
    },
    description: {
      ar: "اكتشف حلولنا البرمجية المتكاملة، وتصميم المواقع، والمتاجر الإلكترونية، وأتمتة الذكاء الاصطناعي لتنمية أعمالك مع SURIix.",
      en: "Explore SURIix's integrated software solutions, web design, e-commerce development, and AI-driven automation.",
      zh: "探索 SURIix 的一站式软件解决方案、网页设计、电商独立站建设与人工智能系统定制服务。",
    },
    keywords: {
      ar: "حلول رقمية, أتمتة الذكاء الاصطناعي, تصميم مواقع, تجارة إلكترونية, SURIix",
      en: "digital solutions, AI automation, web design, e-commerce, SURIix",
      zh: "数字解决方案, AI自动化, 网页设计, 电子商务, SURIix",
    },
  },
  "/packages": {
    title: {
      ar: "باقات الخدمات الرقمية | SURIix",
      en: "Digital Service Packages | SURIix",
      zh: "数字服务套餐 | SURIix",
    },
    description: {
      ar: "شاهد باقات تصميم المواقع والمتاجر وإدارة الحملات الإعلانية والتسويق المتكاملة لدى SURIix.",
      en: "Check out SURIix's website and store design packages, ad campaigns, and integrated digital marketing services.",
      zh: "查看 SURIix 的网站和电商独立站设计套餐、广告活动和整合数字营销服务。",
    },
    keywords: {
      ar: "باقات تصميم مواقع, أسعار المتاجر الإلكترونية, باقات التسويق الرقمي, SURIix",
      en: "web design packages, e-commerce pricing, digital marketing packages, SURIix",
      zh: "网站设计套餐, 电商独立站价格, 数字营销套餐, SURIix",
    },
  },
  "/portfolio": {
    title: {
      ar: "معرض أعمالنا | SURIix",
      en: "Our Portfolio | SURIix",
      zh: "我们的作品集 | SURIix",
    },
    description: {
      ar: "تصفح المشاريع والمواقع التي قامت SURIix بتطويرها لعملائنا في مختلف القطاعات والمجالات.",
      en: "Browse the projects and websites SURIix has developed for clients across various industries.",
      zh: "浏览 SURIix 在各个行业为客户开发的项目和网站。",
    },
    keywords: {
      ar: "معرض الأعمال, مشاريع SURIix, سابقة أعمالنا, تصميم مواقع العملاء",
      en: "portfolio, SURIix projects, our work, client website design",
      zh: "作品集, SURIix项目, 我们的作品, 客户网站设计",
    },
  },
  "/ready-websites": {
    title: {
      ar: "مواقع جاهزة للتسليم | SURIix",
      en: "Ready-made Websites | SURIix",
      zh: "现成网站交付 | SURIix",
    },
    description: {
      ar: "مجموعة مميزة من المواقع والمتاجر الجاهزة من SURIix لتبدأ نشاطك التجاري على الفور وبأقل تكلفة.",
      en: "A collection of ready-made websites and stores from SURIix to launch your business immediately with minimal cost.",
      zh: "SURIix 精选现成网站和独立站，以最低的成本立即启动您的业务。",
    },
    keywords: {
      ar: "مواقع جاهزة, شراء موقع جاهز, متجر جاهز للتسليم, مواقع ويب سريعة, SURIix",
      en: "ready-made websites, buy a website, ready e-commerce store, SURIix",
      zh: "现成网站, 购买网站, 现成电商独立站, SURIix",
    },
  },
  "/faq": {
    title: {
      ar: "الأسئلة الشائعة | SURIix",
      en: "Frequently Asked Questions | SURIix",
      zh: "常见问题 | SURIix",
    },
    description: {
      ar: "إجابات شاملة على الأسئلة الأكثر شيوعاً حول تصميم المواقع، المتاجر الإلكترونية، الدعم الفني، وخدمات SEO من وكالة SURIix.",
      en: "Comprehensive answers to frequently asked questions about SURIix web design, e-commerce, support, and SEO services.",
      zh: "关于 SURIix 网页设计、电商独立站、技术支持和 SEO 服务的常见问题的全面解答。",
    },
    keywords: {
      ar: "الأسئلة الشائعة, استفسارات العملاء, أسئلة تصميم المواقع, SURIix, معتز الصريمي",
      en: "FAQ, customer inquiries, web design questions, SURIix, Moutaz Al-Suraimi",
      zh: "常见问题, 客户咨询, 网页设计问题, SURIix",
    },
  },
  "/testimonials": {
    title: {
      ar: "آراء وتجارب عملائنا | SURIix",
      en: "Client Testimonials | SURIix",
      zh: "客户评价与体验 | SURIix",
    },
    description: {
      ar: "ماذا يقول شركاء نجاحنا عن تجربتهم مع خدمات SURIix الرقمية وتأثيرها على نمو أعمالهم.",
      en: "What our success partners say about their experience with SURIix digital services and their impact on growth.",
      zh: "我们的合作伙伴对 SURIix 数字服务及其对业务增长影响的评价。",
    },
    keywords: {
      ar: "آراء العملاء, تجارب العملاء مع SURIix, تقييمات العملاء",
      en: "client testimonials, SURIix customer reviews, customer ratings",
      zh: "客户评价, SURIix客户评价, 客户评级",
    },
  },
  "/blog": {
    title: {
      ar: "المدونة الرقمية | SURIix",
      en: "Digital Blog | SURIix",
      zh: "数字博客 | SURIix",
    },
    description: {
      ar: "مقالات تثقيفية، نصائح برمجية، واستراتيجيات تسويقية من فريق SURIix لمساعدتك على النجاح في سوق العمل الرقمي.",
      en: "Educational articles, coding tips, and marketing strategies from SURIix to help you succeed in the digital market.",
      zh: "SURIix 团队的教育性文章、编程技巧和营销策略，帮助您在数字市场中取得成功。",
    },
    keywords: {
      ar: "المدونة, مقالات تسويقية, نصائح برمجية, مدونة SURIix",
      en: "blog, marketing articles, coding tips, SURIix blog",
      zh: "博客, 营销文章, 编程技巧, SURIix博客",
    },
  },
  "/contact": {
    title: {
      ar: "تواصل معنا | SURIix",
      en: "Contact Us | SURIix",
      zh: "联系我们 | SURIix",
    },
    description: {
      ar: "تواصل مع فريق SURIix اليوم لمناقشة مشروعك الرقمي القادم وبدء تحقيق أهداف أعمالك.",
      en: "Get in touch with the SURIix team today to discuss your next digital project and start achieving your business goals.",
      zh: "立即与 SURIix 团队联系，讨论您的下一个数字项目并开始实现您的业务目标。",
    },
    keywords: {
      ar: "تواصل معنا, رقم SURIix, حجز مشروع, نموذج الاتصال",
      en: "contact us, SURIix number, book project, contact form",
      zh: "联系我们, SURIix电话, 预约项目, 联系表单",
    },
  },
  "/privacy": {
    title: {
      ar: "سياسة الخصوصية | SURIix",
      en: "Privacy Policy | SURIix",
      zh: "隐私政策 | SURIix",
    },
    description: {
      ar: "تعرف على كيفية جمع واستخدام وحماية البيانات الشخصية لزوار وعملاء وكالة SURIix.",
      en: "Learn how SURIix collects, uses, and protects the personal data of its visitors and clients.",
      zh: "了解 SURIix 如何收集、使用和保护访问者和客户的个人数据。",
    },
    keywords: {
      ar: "سياسة الخصوصية, حماية البيانات, خصوصية العملاء, SURIix",
      en: "privacy policy, data protection, client privacy, SURIix",
      zh: "隐私政策, 数据保护, 客户隐私, SURIix",
    },
  },
  "/terms": {
    title: {
      ar: "شروط الخدمة والاستخدام | SURIix",
      en: "Terms of Service & Use | SURIix",
      zh: "服务条款与使用 | SURIix",
    },
    description: {
      ar: "القواعد والشروط القانونية التي تحكم استخدام خدمات وموقع وكالة SURIix الرقمية.",
      en: "The legal terms and conditions governing the use of SURIix Digital Agency's services and website.",
      zh: "管理使用 SURIix 数字代理商服务和网站的法律条款和条件。",
    },
    keywords: {
      ar: "شروط الخدمة, شروط الاستخدام, القواعد القانونية, SURIix",
      en: "terms of service, terms of use, legal terms, SURIix",
      zh: "服务条款, 使用条款, 法律条款, SURIix",
    },
  },
};

// ─── Global Entity Graph — injected on every page for SEO / GEO / Entity Search ──
const globalEntityGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://suriix.com/#organization",
      name: "Suriix",
      legalName: "Suriix Digital Agency",
      alternateName: "سوريكس",
      url: "https://suriix.com",
      logo: {
        "@type": "ImageObject",
        url: "https://suriix.com/favicon-192x192.png",
        width: 192,
        height: 192,
      },
      image: "https://suriix.com/favicon-192x192.png",
      description:
        "سوريكس Suriix تقدم حلولًا رقمية متكاملة لنمو الأعمال، تشمل تصميم وتطوير المواقع والمتاجر الإلكترونية والتسويق الرقمي والتصميم.",
      foundingDate: "2023",
      founder: { "@id": "https://suriix.com/#founder" },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+967780930635",
          contactType: "customer service",
          availableLanguage: ["Arabic", "English"],
        },
      ],
      email: "info@suriix.com",
      sameAs: [
        "https://www.facebook.com/share/1HT2PRwNYJ/",
        "https://www.instagram.com/sur_iix_",
        "https://www.linkedin.com/in/eng-moutaz-wael-9566962bb/",
      ],
      knowsAbout: [
        "Web Design",
        "E-Commerce Development",
        "Digital Marketing",
        "AI Automation",
        "Branding",
        "SEO",
      ],
    },
    {
      "@type": "Person",
      "@id": "https://suriix.com/#founder",
      name: "Eng. Moutaz Wael Nabeel Al-Suraimi",
      alternateName: [
        "المهندس معتز وائل نبيل الصريمي",
        "Moutaz Al-Suraimi",
        "معتز الصريمي",
        "Moutaz Wael Al-Suraimi",
        "معتز وائل الصريمي",
      ],
      jobTitle: "Founder & CEO",
      worksFor: { "@id": "https://suriix.com/#organization" },
      url: "https://suriix.com/about",
      sameAs: ["https://www.linkedin.com/in/eng-moutaz-wael-9566962bb/"],
      knowsAbout: [
        "Software Engineering",
        "Web Development",
        "Digital Agency Management",
        "E-Commerce",
        "AI Integration",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://suriix.com/#website",
      url: "https://suriix.com",
      name: "SURIix",
      description:
        "SURIix — Professional Web Design, E-Commerce & AI-driven digital solutions.",
      publisher: { "@id": "https://suriix.com/#organization" },
      inLanguage: ["ar", "en", "zh"],
      potentialAction: {
        "@type": "SearchAction",
        target: "https://suriix.com/?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  ogImage = defaultOgImage,
  ogType = "website",
  schema,
  noIndex = false,
}) => {
  const { pathname } = useLocation();
  const { lang } = useLanguage();

  // Normalize path by stripping trailing slash
  const normPath = pathname === "/" ? "/" : pathname.replace(/\/$/, "");

  // Resolve localized text defaults or fall back to English
  const defaults = metaDefaults[normPath] || metaDefaults["/"];
  const pageTitle = title || defaults.title[lang] || defaults.title.en;
  const pageDescription =
    description || defaults.description[lang] || defaults.description.en;
  const pageKeywords = keywords || defaults.keywords[lang] || defaults.keywords.en;

  // Build absolute URLs for meta tags
  const canonicalUrl = `${siteUrl}${normPath === "/" ? "" : normPath}`;

  // Localized alternate URL tags
  const alternateAr = canonicalUrl;
  const alternateEn = `${canonicalUrl}?lang=en`;
  const alternateZh = `${canonicalUrl}?lang=zh`;

  return (
    <Helmet>
      {/* Search Engine Robots Indexing */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
      )}

      {/* Primary Metadata */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      <meta name="author" content="Eng. Moutaz Wael Nabeel Al-Suraimi / SURIix" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Multilingual Alternate Translations (Hreflang) */}
      <link rel="alternate" hrefLang="ar" href={alternateAr} />
      <link rel="alternate" hrefLang="en" href={alternateEn} />
      <link rel="alternate" hrefLang="zh" href={alternateZh} />
      <link rel="alternate" hrefLang="x-default" href={alternateAr} />

      {/* Open Graph Tags */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={lang === "ar" ? "ar_YE" : lang === "zh" ? "zh_CN" : "en_US"} />
      <meta property="og:site_name" content="SURIix" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@SURIix" />

      {/* Global Entity Graph JSON-LD (Organization + Founder + WebSite) */}
      <script type="application/ld+json">
        {JSON.stringify(globalEntityGraph)}
      </script>

      {/* Page-specific JSON-LD Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
