import React, { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  ArrowLeft, Globe, ShoppingCart, Bot, Palette, 
  Megaphone, Search, ArrowUpRight, CheckCircle2 
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import FooterSection from "@/components/FooterSection";
import ThemeToggle from "@/components/ThemeToggle";

const WHATSAPP_URL = "https://wa.me/967780930635";

const Solutions = () => {
  const { t, lang, setLang, langLabels, langOrder } = useLanguage();
  const navigate = useNavigate();
  const isRtl = lang === "ar";

  useEffect(() => {
    document.title = lang === "ar" ? "حلولنا الرقمية المتكاملة | Suriix" : lang === "zh" ? "我们的数字化解决方案 | Suriix" : "Our Digital Solutions & Services | Suriix";
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", lang === "ar" 
        ? "اكتشف حلولنا الرقمية الفاخرة: تصميم مواقع الويب الاحترافية، المتاجر الإلكترونية المتكاملة، أتمتة الذكاء الاصطناعي، الهوية البصرية، وحملات النمو." 
        : "Discover our premium digital solutions: professional web design, fully integrated e-commerce, custom AI automation, brand identities, and digital growth campaigns.");
    }
    
    window.scrollTo(0, 0);
  }, [lang]);

  const texts = {
    ar: {
      heroTitle: "حلولنا الرقمية المتكاملة",
      heroSubtitle: "نحن في Suriix نبني منصات رقمية فائقة التطور تجمع بين روعة التصميم وقوة الأداء لمساعدة عملائنا على تصدر المنافسة وقيادة قطاع الأعمال.",
      ctaStart: "استشارة مجانية عبر واتساب",
      ctaContact: "اطلب الخدمة الآن",
      techUsed: "التقنيات والأدوات المستخدمة:",
      featuresTitle: "ما تقدمه لك هذه الخدمة:",
      
      sol1Title: "المواقع التعريفية والشركات",
      sol1Desc1: "نحن نؤمن بأن موقعك الإلكتروني هو الواجهة الأولى والممثل الرقمي الدائم لعلامتك التجارية. نقوم بتصميم وتطوير مواقع ويب عصرية وسريعة جداً تعكس احترافية شركتك وتبني جسوراً من الثقة المطلقة مع عملائك.",
      sol1Desc2: "نهتم بأدق تفاصيل تجربة المستخدم (UI/UX)، وندعم تعدد اللغات بشكل كامل مع واجهات متجاوبة كلياً تناسب جميع مقاسات الهواتف والتابلت، مع تهيئة برمجية شاملة لمحركات البحث وسرعات تحميل قياسية.",
      sol1Features: [
        "تصميم واجهات وتجربة مستخدم مخصصة وفريدة (غير مكررة).",
        "تجاوب كامل وانسيابي مع الهواتف الذكية والأجهزة اللوحية.",
        "دعم كامل لتعدد اللغات (العربية، الإنجليزية، الصينية، وغيرها).",
        "لوحة تحكم إدارية سهلة للغاية لتحديث محتوى الموقع بدون خبرة برمجية.",
        "ربط أدوات التحليل والإحصائيات مثل Google Analytics."
      ],
      sol1Tech: ["React", "Next.js", "WordPress", "Tailwind CSS", "Framer Motion"],

      sol2Title: "المتاجر الإلكترونية المتكاملة",
      sol2Desc1: "حول متجرك التقليدي إلى إمبراطورية تجارية عابرة للحدود. نقوم ببناء متاجر إلكترونية متكاملة مصممة خصيصاً لزيادة معدل المبيعات وتسهيل عمليات الشراء وعرض منتجاتك بأكثر الطرق جاذبية وإقناعاً.",
      sol2Desc2: "نوفر لك أنظمة تتبع المخزون والطلبات بدقة، وندمج بوابات الدفع الإلكتروني المحلية والعالمية بكل أمان وسلاسة، مع تهيئة كاملة لشاشات الهاتف لتجربة تسوق سريعة وممتعة تضمن ولاء العملاء وتكرار الشراء.",
      sol2Features: [
        "سلة تسوق ذكية وصفحة دفع سريعة مخصصة لرفع معدل التحويل.",
        "ربط بوابات الدفع الآمنة (Stripe, PayPal, وبوابات الدفع المحلية).",
        "نظام متكامل لإدارة المنتجات، المخزون، والخصومات الترويجية.",
        "تقارير وإحصائيات فورية للمبيعات، الأرباح وسلوك الزوار.",
        "تكامل مع شركات الشحن والخدمات اللوجستية لتتبع الطلبات تلقائياً."
      ],
      sol2Tech: ["WooCommerce", "Shopify", "Node.js", "Stripe API", "PWA Tech"],

      sol3Title: "أنظمة الويب المخصصة وأتمتة الذكاء الاصطناعي",
      sol3Desc1: "إذا كان مشروعك فريداً ويتطلب لوجيك برمجي مخصص أو أنظمة إدارية سحابية، فنحن شريكك التقني المثالي. نقوم بتصميم وتطوير أنظمة ويب مخصصة بالكامل تخدم طبيعة عملك وتوفر لك كفاءة تشغيلية مطلقة.",
      sol3Desc2: "ندمج بذكاء تقنيات الذكاء الاصطناعي لتطوير روبوتات الدردشة الذكية لخدمة العملاء على مدار الساعة، وأتمتة المهام اليومية المتكررة، وبناء لوحات بيانات (Dashboards) تفاعلية لتحليل البيانات واتخاذ القرارات الذكية.",
      sol3Features: [
        "تطوير قواعد بيانات وأنظمة إدارة وعلاقات العملاء (CRM) مخصصة.",
        "بناء لوحات تحكم إدارية ذكية ومحمية لعرض البيانات وتصدير التقارير.",
        "تطوير روبوتات دردشة ذكية (AI Chatbots) مدمجة بخدمة العملاء.",
        "أتمتة العمليات اليومية وتوفير التكاليف التشغيلية للمؤسسة.",
        "أنظمة أمان وحماية متطورة وتشفير كامل للبيانات الحساسة."
      ],
      sol3Tech: ["Python", "Node.js", "OpenAI API", "PostgreSQL", "Supabase"],

      sol4Title: "الهوية البصرية وتصميم الواجهات (UI/UX)",
      sol4Desc1: "الهوية البصرية هي الروح البصرية لمشروعك والركيزة الأساسية لبناء علامة تجارية راسخة في أذهان الجمهور. نحن نصمم لك هوية متكاملة تتحدث لغة الفخامة والاحترافية وتنقل رسالة مشروعك بدقة متناهية.",
      sol4Desc2: "نقوم بدراسة السوق والمنافسين وتصميم شعارات (Logos) أيقونية، واختيار باليتات ألوان متناغمة (HSL/RGB)، وتصميم النماذج الأولية للواجهات الرقمية (Wireframes & Prototypes) لضمان تجربة مستخدم مبهرة وسهلة.",
      sol4Features: [
        "تصميم شعارات أيقونية ومبتكرة تعبر عن رؤية علامتك التجارية.",
        "إعداد دليل كامل ومفصل للهوية (Brand Book) يشمل الخطوط والألوان.",
        "تصميم واجهات مستخدم (UI) عصرية وجذابة للمواقع والتطبيقات.",
        "هيكلة تجربة مستخدم (UX) مدروسة علمياً لتسهيل تصفح الزوار.",
        "تقديم تصاميم متناسقة لوسائل التواصل الاجتماعي والقرطاسية."
      ],
      sol4Tech: ["Figma", "Adobe Illustrator", "Photoshop", "Adobe XD"],

      sol5Title: "التسويق الرقمي ونمو المبيعات",
      sol5Desc1: "بناء منصتك الرقمية هو البداية فقط، الخطوة التالية هي جذب العملاء المستهدفين وتحقيق الأرباح. نحن نصمم وننفذ استراتيجيات تسويق ذكية تعتمد على البيانات والاستهداف الدقيق للوصول لجمهورك المثالي.",
      sol5Desc2: "ندير حملاتك الإعلانية الممولة باحترافية لضمان أعلى عائد على الاستثمار (ROI)، ونقوم بصناعة وإدارة محتوى حسابات التواصل الاجتماعي بطرق مبتكرة تزيد من التفاعل وبناء قاعدة عملاء حقيقية لعلامتك التجارية.",
      sol5Features: [
        "إدارة وإطلاق الإعلانات الممولة (Google Ads, Meta Ads, TikTok Ads).",
        "كتابة وصناعة المحتوى الإبداعي والتسويقي الجذاب للجمهور المستهدف.",
        "استراتيجيات تحسين معدل التحويل (CRO) لزيادة المبيعات والأرباح.",
        "إدارة وتنمية صفحات التواصل الاجتماعي وزيادة أعداد المتابعين الحقيقيين.",
        "تقارير دورية شفافة ومفصلة تقيس أداء الحملات ومعدلات النجاح."
      ],
      sol5Tech: ["Google Ads Manager", "Meta Business Suite", "TikTok Ads", "Copywriting Tools"],

      sol6Title: "تحسين محركات البحث وسرعة الأداء (SEO)",
      sol6Desc1: "كن في صدارة جوجل ودع عملائك يجدونك تلقائياً دون تكاليف إعلانية مستمرة. نقدم خدمة تهيئة شاملة ومتطورة لمحركات البحث (Technical & On-Page SEO) تضمن لموقعك ظهوراً ممتازاً في الكلمات المفتاحية الأكثر ربحية لعملك.",
      sol6Desc2: "نهتم برفع كفاءة وسرعة الموقع لدرجات قياسية (Core Web Vitals) وضمان توافق تام مع خوارزميات جوجل، مع إعداد هيكلية روابط ممتازة وخرائط مواقع ذكية تضمن زحفاً وفهرسة سريعة لصفحاتك.",
      sol6Features: [
        "تحليل الكلمات المفتاحية الأكثر بحثاً وربحية لقطاع عملك.",
        "تهيئة تقنية كاملة للموقع وكتابة الأكواد المتوافقة مع محركات البحث.",
        "تسريع أداء وتحميل الموقع بنسب ممتازة تتوافق مع معايير Google.",
        "بناء استراتيجية محتوى متوافقة مع الـ SEO لزيادة الزوار بشكل مجاني.",
        "إعداد خرائط الموقع (Sitemaps) وملفات Robots.txt وربطها بـ Search Console."
      ],
      sol6Tech: ["Google Search Console", "Screaming Frog", "Lighthouse", "Google PageSpeed Insights"]
    },
    en: {
      heroTitle: "Our Comprehensive Digital Solutions",
      heroSubtitle: "At Suriix, we build ultra-advanced digital platforms combining stunning design and raw power to help our clients lead their industries.",
      ctaStart: "Free Consultation via WhatsApp",
      ctaContact: "Get Started Now",
      techUsed: "Technologies & Tools:",
      featuresTitle: "What we offer in this service:",
      
      sol1Title: "Business & Showcase Websites",
      sol1Desc1: "We believe your website is your brand's digital headquarters. We design and build modern, incredibly fast websites that reflect your corporate professionalism and construct absolute trust with your visitors.",
      sol1Desc2: "We specialize in tailored UX/UI experiences, supporting full multi-language capabilities, fluid mobile/tablet responsiveness, clean SEO foundations, and stellar load speeds.",
      sol1Features: [
        "Unique and bespoke UI/UX designs crafted specifically for your brand.",
        "Full, fluid responsiveness across smartphones, tablets, and desktops.",
        "Complete multi-language system support (Arabic, English, Chinese, etc.).",
        "Super easy administration panel to edit text and images without coding.",
        "Integration with analytics platforms such as Google Analytics."
      ],
      sol1Tech: ["React", "Next.js", "WordPress", "Tailwind CSS", "Framer Motion"],

      sol2Title: "Integrated E-Commerce Systems",
      sol2Desc1: "Turn your local business into a global e-commerce powerhouse. We build feature-rich online stores specifically designed to maximize sales, reduce cart abandonment, and showcase your products in an elegant manner.",
      sol2Desc2: "We integrate seamless tracking for inventory and orders, set up secure international and local payment gateways, and ensure a fluid mobile checkout experience that drives customer retention.",
      sol2Features: [
        "Smart cart and fast-checkout flows designed to maximize conversion rates.",
        "Secure payment integrations (Stripe, PayPal, local Yemeni/Gulf gateways).",
        "Integrated inventory, stock, variations, and promo coupon engines.",
        "Real-time sales, revenue, and customer behavior reports.",
        "Shipping integrations with automated delivery and tracking systems."
      ],
      sol2Tech: ["WooCommerce", "Shopify", "Node.js", "Stripe API", "PWA Tech"],

      sol3Title: "Custom Web Systems & AI Automations",
      sol3Desc1: "If your business requires a tailored application, complex workflows, or custom cloud portals, we are your ideal technical partner. We construct bespoke web systems matching your exact operational demands.",
      sol3Desc2: "We integrate smart Artificial Intelligence to deploy 24/7 customer service AI Chatbots, automate daily routine tasks, and build interactive analytics dashboards for database decisions.",
      sol3Features: [
        "Custom database setups and fully tailored CRM/ERP systems.",
        "Secure custom administrative dashboards to analyze and export reports.",
        "Intelligent customer service chatbots integrated with OpenAI APIs.",
        "Task automation scripts that significantly reduce operational costs.",
        "High-grade security, full encryption, and safe cloud infrastructure."
      ],
      sol3Tech: ["Python", "Node.js", "OpenAI API", "PostgreSQL", "Supabase"],

      sol4Title: "Brand Identity & UI/UX Design",
      sol4Desc1: "Your visual identity is the soul of your business and the foundation of building a lasting connection. We design premium brand styles that project luxury and professionalism.",
      sol4Desc2: "We analyze the market to create iconic logos, cohesive HSL/RGB palettes, comprehensive brand guidelines, and interactive high-fidelity UI/UX wireframes and prototypes.",
      sol4Features: [
        "Iconic logo design representing your brand's philosophy.",
        "Comprehensive Brand Book detailing typography, fonts, and color guidelines.",
        "Modern, interactive User Interface (UI) design for web and apps.",
        "Research-driven User Experience (UX) layouts to optimize visitor flows.",
        "Cohesive stationery, business cards, and social media templates."
      ],
      sol4Tech: ["Figma", "Adobe Illustrator", "Photoshop", "Adobe XD"],

      sol5Title: "Digital Marketing & Performance Growth",
      sol5Desc1: "Building your platform is only the first step. The next is attracting targeted visitors and converting them into loyal clients. We design and execute data-driven digital campaigns.",
      sol5Desc2: "We professionally manage paid media to guarantee the highest Return on Investment (ROI), while curating organic social media content to boost audience engagement.",
      sol5Features: [
        "Paid ad campaigns across Google Ads, Meta Ads (Facebook/Instagram), and TikTok.",
        "Creative copywriting and content generation that persuades and converts.",
        "Conversion Rate Optimization (CRO) strategies to maximize transaction volume.",
        "Social media management and organic follower growth strategies.",
        "Transparent weekly/monthly performance reporting and metrics."
      ],
      sol5Tech: ["Google Ads Manager", "Meta Business Suite", "TikTok Ads", "Copywriting Tools"],

      sol6Title: "Search Engine Optimization (SEO) & Performance",
      sol6Desc1: "Secure the top spots on Google search results and let clients discover you organically. We provide advanced SEO setups ensuring high visibility in your industry's most lucrative terms.",
      sol6Desc2: "We optimize loading speeds and Core Web Vitals to comply with Google's strict requirements, alongside generating high-quality sitemaps and indexing structures.",
      sol6Features: [
        "Detailed research for the most searched and highly profitable keywords.",
        "Technical and on-page code optimization for rapid indexing.",
        "Optimizing Core Web Vitals for speed benchmarks set by Google.",
        "High-end organic content planning to drive free Google traffic.",
        "Sitemaps, robots.txt setups, and Webmaster search console linkages."
      ],
      sol6Tech: ["Google Search Console", "Screaming Frog", "Lighthouse", "Google PageSpeed Insights"]
    },
    zh: {
      heroTitle: "我们全面的数字化解决方案",
      heroSubtitle: "在 Suriix，我们构建融合了精美设计和强大性能的超前数字化平台，帮助我们的客户引领行业竞争。",
      ctaStart: "通过 WhatsApp 免费咨询",
      ctaContact: "立即获取解决方案",
      techUsed: "技术与工具：",
      featuresTitle: "在此项服务中我们提供：",
      
      sol1Title: "企业及企业展示网站",
      sol1Desc1: "我们相信您的网站是您品牌的数字总部。我们设计并构建现代、极速的网站，反射出您公司的专业素养，并在您的访问者中建立绝对的信任。",
      sol1Desc2: "我们专注于量身定制的 UI/UX 体验、全多语言系统支持、流畅的手机和折叠屏自适应、干净的 SEO 基础和卓越的加载速度。",
      sol1Features: [
        "为您的品牌量身定制的独特 UI/UX 设计。",
        "在智能手机、平板电脑和桌面端实现完全、流畅的自适应。",
        "完整的英文、阿拉伯文、中文等多语言系统支持。",
        "极其简便的管理后台，无需代码即可轻松编辑内容。",
        "集成 Google Analytics 等专业的数据分析平台。"
      ],
      sol1Tech: ["React", "Next.js", "WordPress", "Tailwind CSS", "Framer Motion"],

      sol2Title: "完整电子商务商城系统",
      sol2Desc1: "将您的传统业务转变为全球电子商务帝国。我们构建功能丰富的在线商店，旨在最大化销量、降低购物车流失率并以优雅的方式展示您的产品。",
      sol2Desc2: "我们集成无缝的库存和订单跟踪、集成安全的国际和本地支付网关，并确保流畅的移动端结账体验，从而提高客户留存率。",
      sol2Features: [
        "旨在最大化转化率的智能购物车和快速结账流程。",
        "安全的支付集成 (Stripe, PayPal, 以及本地的支付网关)。",
        "集成的库存、规格和优惠券促销管理引擎。",
        "实时的销售、收入和消费者行为分析报告。",
        "支持物流派送对接和自动化的订单追踪系统。"
      ],
      sol2Tech: ["WooCommerce", "Shopify", "Node.js", "Stripe API", "PWA Tech"],

      sol3Title: "定制网络系统与人工智能自动化",
      sol3Desc1: "如果您的业务需要定制开发应用程序、复杂的工作流或定制的云门户网站，我们是您理想的技术合作伙伴。我们构建符合您确切业务运营需求的定制网络系统。",
      sol3Desc2: "我们智能地融合人工智能技术，开发 24/7 全天候客户服务的 AI 聊天机器人，自动化日常重复性任务，并构建交互式的分析仪表板以实现数据决策。",
      sol3Features: [
        "定制的数据库设置和完全量身定制的 CRM/ERP 系统。",
        "安全可靠的定制管理后台，以分析并导出专业报告。",
        "与 OpenAI API 对接的智能客户服务聊天机器人 (AI Chatbots)。",
        "可大幅降低企业日常运营成本的流程自动化脚本。",
        "高级别的安全防护、数据全加密及安全的云基础架构。"
      ],
      sol3Tech: ["Python", "Node.js", "OpenAI API", "PostgreSQL", "Supabase"],

      sol4Title: "品牌视觉恒等与 UI/UX 交互设计",
      sol4Desc1: "您的视觉形象是您品牌的数字化灵魂，也是在受众心中建立持久印记的基础。我们设计展现奢华与专业精神的高端品牌风格。",
      sol4Desc2: "我们深入分析市场，设计标志性的 Logo、协调的颜色搭配、全面的品牌手册，以及具有高度交互性的 UI/UX 线框图和原型设计。",
      sol4Features: [
        "代表您品牌哲学的标志性 Logo 设计。",
        "包含字体、颜色和使用规范的全面品牌视觉手册 (Brand Book)。",
        "针对网页和 APP 现代而有吸引力的用户界面 (UI) 设计。",
        "基于用户行为学研究的交互体验 (UX) 布局以优化访问流程。",
        "全套相契合的社交媒体模板、名片和信签纸设计。"
      ],
      sol4Tech: ["Figma", "Adobe Illustrator", "Photoshop", "Adobe XD"],

      sol5Title: "数字化营销与商业增长策划",
      sol5Desc1: "构建您的平台只是第一步。下一步是吸引精准的目标受众并实现商业转化。我们为您设计并执行基于数据分析和精准定位的营销策略。",
      sol5Desc2: "我们以专业的方式管理您的付费媒体，以确保最高的投资回报率 (ROI)，同时为您策划极具创意的社交媒体内容以提高受众参与度。",
      sol5Features: [
        "管理并投放 Google Ads, Meta Ads 和 TikTok 广告。",
        "撰写具有高说服力和高转化率的创意文案与推广内容。",
        "旨在最大化交易量和订单金额的转化率优化 (CRO) 策略。",
        "社交媒体页面的全面代运营与真实粉丝增长策划。",
        "透明且详细的周度/月度广告效果与分析报告。"
      ],
      sol5Tech: ["Google Ads Manager", "Meta Business Suite", "TikTok Ads", "Copywriting Tools"],

      sol6Title: "搜索引擎优化 (SEO) 与整站提速",
      sol6Desc1: "在谷歌搜索中名列前茅，让您的客户自动找到您，免去源源不断的广告费支出。我们提供全面的搜索引擎技术优化，确保您的网站具有极高的行业曝光度。",
      sol6Desc2: "我们严格优化网站加载速度和核心网页指标 (Core Web Vitals)，完全符合 Google 搜索引擎算法的高标准，同时生成完美的站点地图和抓取结构。",
      sol6Features: [
        "深度研究您行业中最具搜索量和最高商业回报的关键词。",
        "全站代码与技术优化，确保搜索引擎极速抓取与收录。",
        "优化核心网页指标，达到 Google PageSpeed 官方的高分基准。",
        "制定高端的 SEO 内容策略以获取源源不断的免费谷歌流量。",
        "配置站点地图 (Sitemaps)、Robots.txt 并绑定站长平台 (Google Search Console)。"
      ],
      sol6Tech: ["Google Search Console", "Screaming Frog", "Lighthouse", "Google PageSpeed Insights"]
    }
  };

  const currentTexts = texts[lang as keyof typeof texts] || texts.en;

  const solutionsList = [
    {
      title: currentTexts.sol1Title,
      desc1: currentTexts.sol1Desc1,
      desc2: currentTexts.sol1Desc2,
      features: currentTexts.sol1Features,
      tech: currentTexts.sol1Tech,
      icon: Globe,
      color: "from-blue-500 to-indigo-600",
      shadow: "shadow-blue-500/10"
    },
    {
      title: currentTexts.sol2Title,
      desc1: currentTexts.sol2Desc1,
      desc2: currentTexts.sol2Desc2,
      features: currentTexts.sol2Features,
      tech: currentTexts.sol2Tech,
      icon: ShoppingCart,
      color: "from-emerald-500 to-teal-600",
      shadow: "shadow-emerald-500/10"
    },
    {
      title: currentTexts.sol3Title,
      desc1: currentTexts.sol3Desc1,
      desc2: currentTexts.sol3Desc2,
      features: currentTexts.sol3Features,
      tech: currentTexts.sol3Tech,
      icon: Bot,
      color: "from-purple-500 to-pink-600",
      shadow: "shadow-purple-500/10"
    },
    {
      title: currentTexts.sol4Title,
      desc1: currentTexts.sol4Desc1,
      desc2: currentTexts.sol4Desc2,
      features: currentTexts.sol4Features,
      tech: currentTexts.sol4Tech,
      icon: Palette,
      color: "from-orange-500 to-rose-600",
      shadow: "shadow-orange-500/10"
    },
    {
      title: currentTexts.sol5Title,
      desc1: currentTexts.sol5Desc1,
      desc2: currentTexts.sol5Desc2,
      features: currentTexts.sol5Features,
      tech: currentTexts.sol5Tech,
      icon: Megaphone,
      color: "from-sky-500 to-blue-600",
      shadow: "shadow-sky-500/10"
    },
    {
      title: currentTexts.sol6Title,
      desc1: currentTexts.sol6Desc1,
      desc2: currentTexts.sol6Desc2,
      features: currentTexts.sol6Features,
      tech: currentTexts.sol6Tech,
      icon: Search,
      color: "from-violet-500 to-purple-600",
      shadow: "shadow-violet-500/10"
    }
  ];

  return (
    <div className="min-h-screen bg-transparent flex flex-col">
      {/* Navbar Header */}
      <nav className="sticky top-0 z-50 glass-strong px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate("/")}>
          <img
            src="/favicon-192x192.png"
            alt="Suriix Logo"
            className="w-9 h-9 rounded-full object-cover border border-primary/20 shadow-sm"
          />
          <span className="font-bold text-xl gradient-text tracking-wide hidden sm:block">Suriix</span>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="flex bg-secondary/50 p-1 rounded-xl border border-border/50">
            {langOrder.map((code) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  lang === code ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {langLabels[code]}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {t("privacy.back")}
        </Link>

        {/* Hero Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold border border-primary/30 bg-primary/10 text-primary mb-4 uppercase tracking-widest">
            {isRtl ? "خدمات ووكالة رقمية" : "PREMIUM AGENCY SOLUTIONS"}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold gradient-text tracking-tight mb-6">
            {currentTexts.heroTitle}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg font-medium leading-relaxed">
            {currentTexts.heroSubtitle}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-primary to-accent hover:opacity-95 shadow-[0_8px_20px_rgba(139,92,246,0.25)] hover:shadow-primary/35 transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              {currentTexts.ctaStart}
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <Link
              to="/contact"
              className="px-6 py-3.5 rounded-2xl font-bold text-sm border border-border/80 bg-secondary/50 text-foreground hover:bg-secondary/80 transition-all"
            >
              {isRtl ? "احجز استشارة برمجية" : "Book Technical Consultation"}
            </Link>
          </div>
        </div>

        {/* Detailed Solutions Section Showcase */}
        <div className="space-y-12">
          {solutionsList.map((sol, index) => {
            const IconComponent = sol.icon;
            return (
              <div 
                key={index}
                className="glass-strong rounded-[2.5rem] p-8 md:p-10 lg:p-12 shadow-xl neon-border relative overflow-hidden flex flex-col gap-8"
              >
                {/* Background ambient lighting per card */}
                <div className={`absolute -top-24 -right-24 w-80 h-80 bg-gradient-to-br ${sol.color} opacity-[0.03] dark:opacity-[0.05] rounded-full blur-3xl pointer-events-none -z-10`} />

                {/* Header of Service */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border/30">
                  <div className="flex items-center gap-4 text-start">
                    {/* Glowing rounded Icon box */}
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${sol.color} flex items-center justify-center text-white shrink-0 shadow-lg ${sol.shadow} shadow-purple-500/20`}>
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">
                        {sol.title}
                      </h2>
                      <span className="inline-block mt-1 px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-primary/10 text-primary border border-primary/20">
                        {isRtl ? "حل احترافي" : "PROFESSIONAL SOLUTION"}
                      </span>
                    </div>
                  </div>
                  
                  {/* Whatsapp Quick Order CTA */}
                  <a
                    href={`${WHATSAPP_URL}?text=${encodeURIComponent(isRtl ? `مرحباً، أود الاستفسار عن خدمة: ${sol.title}` : `Hello, I'm interested in the service: ${sol.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-3 rounded-xl border border-border/60 hover:border-emerald-500/40 bg-secondary/30 hover:bg-emerald-500/5 text-sm font-semibold text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300 cursor-pointer self-start md:self-auto"
                  >
                    {currentTexts.ctaContact}
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>

                {/* Service structured detailed paragraphs */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Detailed descriptions */}
                  <div className="lg:col-span-7 space-y-4 text-start">
                    <p className="text-muted-foreground leading-relaxed text-base md:text-lg font-medium">
                      {sol.desc1}
                    </p>
                    <p className="text-muted-foreground/80 leading-relaxed text-sm md:text-base font-normal">
                      {sol.desc2}
                    </p>

                    {/* Bullet list of features */}
                    <div className="pt-4 space-y-3">
                      <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">
                        {currentTexts.featuresTitle}
                      </h3>
                      <ul className="space-y-2 text-sm text-muted-foreground font-medium">
                        {sol.features.map((feat: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Sidebar of the solution: Tech Stack & Tools used */}
                  <div className="lg:col-span-5 bg-secondary/15 dark:bg-secondary/40 border border-border/30 rounded-3xl p-6 flex flex-col gap-4 text-start self-stretch justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-foreground mb-3 tracking-wide">
                        {currentTexts.techUsed}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {sol.tech.map((tItem: string, idx: number) => (
                          <span 
                            key={idx}
                            className="px-3.5 py-1.5 rounded-xl text-xs font-bold border border-border/60 bg-background/50 text-foreground"
                          >
                            {tItem}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Decorative trust badge */}
                    <div className="border-t border-border/30 pt-4 flex items-center gap-3 mt-4 text-xs text-muted-foreground/80 font-semibold">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      <span>
                        {isRtl 
                          ? "ضمان أداء عالي وسرعة فائقة متطابقة مع شروط جوجل." 
                          : "Guaranteed high performance and dynamic SEO compliance."}
                      </span>
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* Global CTA at footer of solutions */}
        <div className="mt-16 text-center glass-strong rounded-[2.5rem] p-8 md:p-12 shadow-xl neon-border relative overflow-hidden">
          <h2 className="text-3xl font-extrabold gradient-text mb-4">
            {isRtl ? "هل لديك مشروع رقمي جاهز للبدء؟" : "Do you have a project ready to build?"}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8 text-sm md:text-base font-medium">
            {isRtl 
              ? "تواصل معنا الآن للحصول على استشارة برمجية مجانية متكاملة وبدء رحلتك الرقمية معنا لبناء منصة استثنائية." 
              : "Contact us today for a free technology consultation and start your digital growth journey with Suriix."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-7 py-4 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-primary to-accent hover:opacity-95 shadow-lg shadow-purple-500/20 cursor-pointer"
            >
              {isRtl ? "ابدأ مشروعك الآن" : "Start Your Project Now"}
              <ArrowLeft className="w-4 h-4 rtl:rotate-0 rotate-180" />
            </a>
            <Link 
              to="/contact"
              className="px-7 py-4 rounded-2xl font-bold text-sm border border-border/80 bg-secondary/50 text-foreground hover:bg-secondary/80 transition-all"
            >
              {isRtl ? "تواصل معنا" : "Contact Us Page"}
            </Link>
          </div>
        </div>

      </main>

      <FooterSection />
    </div>
  );
};

export default Solutions;
