import React, { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Users, Eye, Target, Cpu, CheckCircle2, 
  Award, ShieldCheck, HeartHandshake, Zap, Compass 
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import FooterSection from "@/components/FooterSection";
import ThemeToggle from "@/components/ThemeToggle";
import SEO from "@/components/SEO";

const AboutUs = () => {
  const { t, lang, setLang, langLabels, langOrder } = useLanguage();
  const navigate = useNavigate();
  const isRtl = lang === "ar";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const texts = {
    ar: {
      heroTitle: "من نحن — قصة الابتكار الرقمي",
      heroSubtitle: "نحن في Suriix لا نقوم ببيع خدمات تقنية عادية، بل نحن شريكك التقني الموثوق لبناء الحضور الرقمي وصياغة مستقبل الأعمال بالذكاء الاصطناعي.",
      
      introHeading: "الوكالة الرقمية الرائدة في قيادة التغيير التقني",
      introPara1: "Suriix هي وكالة رقمية متكاملة متخصصة في هندسة البرمجيات الفاخرة وتطوير المواقع والأنظمة السحابية المخصصة وإدارة حملات التسويق الرقمي وتكامل الذكاء الاصطناعي. تأسست Suriix لتكسر القوالب التقليدية وتضع معايير جديدة للفخامة والسرعة والجودة في العالم الرقمي.",
      introPara2: "نحن نمزج ببراعة فائقة بين الإبداع الفني للتصميم العصري المذهل وقوة الكود البرمجي النظيف والسريع، لنضمن لعملائنا من الشركات الناشئة والمؤسسات الكبرى تحولاً رقمياً آمناً وممتعاً يضمن لهم الريادة في سوق عمل سريع الحركة ومتطور كلياً.",
    
      visionTitle: "المؤسس — المهندس معتز وائل الصريمي",
      visionText : "تأسست Suriix على يد المهندس معتز وائل الصريمي، انطلاقًا من رؤية تهدف إلى تقديم حلول رقمية حديثة تجمع بين هندسة البرمجيات، التصميم، التسويق الرقمي والذكاء الاصطناعي.يقود معتز توجه Suriix نحو بناء حلول تقنية عملية وعالية الجودة تساعد الشركات والمشاريع الطموحة على تطوير حضورها الرقمي والاستفادة من أحدث التقنيات. " ,
      
      mvTitle: "الرؤية والرسالة",
      visionTitle: "رؤيتنا الرقمية",
      visionText: "أن نصبح الشريك والوكالة الرقمية الأولى للشركات والمشاريع الطموحة في الوطن العربي والعالم، عبر تشييد بنية تحتية رقمية غاية في الأمان والتطور تتميز بالسرعات الفائقة والجمال الجمالي المتناهي، لنشكل معاً ملامح العهد الرقمي الجديد.",
      missionTitle: "مهمتنا السامية",
      missionText: "تمكين أصحاب الأعمال والشركات من رقمنة عملياتهم بالكامل وتوفير التكاليف التشغيلية عبر حلول الأتمتة المتقدمة، وصناعة واجهات مستخدم مدهشة تسهم مباشرة في رفع معدلات التحويل وزيادة المبيعات والأرباح المستدامة.",

      valuesTitle: "القيم الأساسية التي توجه خطانا",
      val1Title: "الابتكار المستمر",
      val1Text: "نحن لا نتوقف أبداً عن البحث والتعلم؛ نعتمد أحدث تقنيات الويب (React, Next.js, Node.js) وحلول الذكاء الاصطناعي المبتكرة لنصنع لعملائنا حلولاً سابقة لعصرها.",
      val2Title: "الجودة البرمجية الفائقة",
      val2Text: "نلتزم بكتابة كود برمجي نظيف جداً ومنظم يتوافق مع المعايير القياسية العالمية وسرعات جوجل الفائقة ومبادئ الأرشفة الفعالة لمشروع يدوم ويتحمل ضغط الزوار.",
      val3Title: "الشراكة وبناء الثقة",
      val3Text: "نحن لا ننظر لعملائنا كصفقة تجارية عابرة، بل كشريك نجاح نسير معه خطوة بخطوة من الفكرة المبدئية، مروراً بالتنفيذ والدعم التقني المستمر والاستشارات المجانية.",

      processTitle: "منهجية العمل الاحترافية لدينا",
      proc1Title: "1. التحليل والبلورة",
      proc1Text: "نبدأ بجلسات استشارية عميقة لفهم متطلبات مشروعك بدقة، ودراسة السوق والمنافسين وتحديد الكلمات المفتاحية الأكثر ربحية وخارطة الطريق الواضحة.",
      proc2Title: "2. التصميم الإبداعي (UI/UX)",
      proc2Text: "نقوم ببناء هياكل تجربة المستخدم السلسة وتصاميم واجهات مبهرة مخصصة بالكامل على Figma تعكس فخامة علامتك التجارية وتبسط عملية تصفح العملاء.",
      proc3Title: "3. الهندسة والتطوير",
      proc3Text: "يقوم مهندسو البرمجيات لدينا بتحويل التصاميم إلى أكواد فائقة السرعة والأداء، مع دمج الذكاء الاصطناعي وتجهيز لوحات التحكم وقواعد البيانات بكل أمان.",
      proc4Title: "4. الاختبار وضمان الجودة",
      proc4Text: "نخضع الموقع والأنظمة لاختبارات أداء صارمة وسرعات تحميل قياسية على مختلف أحجام الشاشات وتدقيق أمني شامل للروابط والبيانات قبل إطلاقها.",
      proc5Title: "5. الإطلاق والنمو المستمر",
      proc5Text: "نرفع موقعك على أفضل الخوادم السحابية ونربط أدوات جوجل، ونبدأ معك رحلة الترويج والتسويق والدعم الفني الدوري لضمان الحفاظ على الصدارة التامة."
    },
    en: {
      heroTitle: "About Us — The Story of Digital Innovation",
      heroSubtitle: "At Suriix, we don't just sell standard technology services; we are your trusted technical partner to build premium presence and shape the business future with AI.",
      
      introHeading: "The Premier Digital Agency Leading Tech Transformation",
      introPara1: "Suriix is a full-service digital agency specializing in premium software engineering, bespoke web development, cloud architectures, customized marketing growth, and advanced AI integration. Suriix was founded to challenge traditional patterns and lay outstanding standards of speed and luxury in the digital realm.",
      introPara2: "We masterfully blend the creative artistry of stunning visual designs with the raw power of clean, high-performance code. This guarantees our clients—from ambitious startups to large enterprises—a secure and beautiful digital transformation to command their fast-moving markets.",

      mvTitle: "Vision & Mission",
      visionTitle: "Our Vision",
      visionText: "To become the first choice digital agency and technical partner for ambitious businesses in the region and globally, building robust, ultra-fast, and breathtakingly aesthetic digital infrastructure to shape the new digital era.",
      missionTitle: "Our Mission",
      missionText: "To empower business owners to digitize their operations completely, reduce operational costs with smart automation, and craft spectacular user interfaces that directly boost conversion rates and drive sustainable growth.",

      valuesTitle: "Core Values That Drive Us",
      val1Title: "Continuous Innovation",
      val1Text: "We never stop researching; we integrate the latest technology stacks (React, Next.js, Node.js) and clever AI workflows to build future-proof products.",
      val2Title: "Absolute Code Quality",
      val2Text: "We commit to writing clean, organized, and robust code complying with global speed standards, ensuring smooth scalability and dynamic SEO indexing.",
      val3Title: "Long-term Partnership",
      val3Text: "We do not treat our clients as mere contracts; we treat them as long-term partners, walking step-by-step from initial thoughts to ongoing technical support.",

      processTitle: "Our Professional Work Methodology",
      proc1Title: "1. Strategy & Analysis",
      proc1Text: "We start with deep consulting sessions to analyze your requirements, study target audiences, and sketch a detailed technical roadmap.",
      proc2Title: "2. Creative UI/UX Design",
      proc2Text: "We formulate smooth user experience wireframes and spectacular user interface layouts on Figma, projecting your brand's luxury.",
      proc3Title: "3. Coding & Engineering",
      proc3Text: "Our software engineers turn visual designs into ultra-fast, high-performance web systems with robust administrative dashboards.",
      proc4Title: "4. Strict Quality Assurance",
      proc4Text: "We run rigid performance audits, responsive screen tests, secure backend checks, and speed validations before the final deployment.",
      proc5Title: "5. Launch & Growth Support",
      proc5Text: "We deploy on elite cloud servers, connect search consoles, and initiate support systems to maintain your long-term success."
    },
    zh: {
      heroTitle: "关于我们 — 数字创新的故事",
      heroSubtitle: "在 Suriix，我们不仅销售标准的技术服务；我们是您值得信赖的技术合作伙伴，通过人工智能构建卓越的企业形象并塑造商业未来。",
      
      introHeading: "引领技术变革的顶尖数字化服务代理机构",
      introPara1: "Suriix 是一家全方位的数字化代理机构，专注于高端软件工程、定制化网站与云端系统开发、数字化增长策略及人工智能系统的深度整合。Suriix 的创立旨在打破传统开发模式，在数字领域树立超凡的速度与品质标杆。",
      introPara2: "我们巧妙地将极具创意的现代视觉设计与极速、整洁的代码工程融合在一起。这保证了我们的客户（从充满雄心的初创公司到大型企业集团）能实现安全、平稳且精美的数字化转型，在瞬息万变的市场竞争中稳操胜券。",

      mvTitle: "愿景与使命",
      visionTitle: "我们的数字化愿景",
      visionText: "通过构建极高安全性、超快运行速度和具有非凡艺术美感的数字基础设施，成为全球野心勃勃的企业首选的技术合作伙伴与数字化代理机构，共同定义数字时代的新面貌。",
      missionTitle: "我们的神圣使命",
      missionText: "赋能企业主全面实现业务流程的数字化，通过先进的自动化解决方案降低日常运营成本，并打造令人惊叹的用户交互界面，直接提升商业转化率与持续性的利润增长。",

      valuesTitle: "引导我们前行的核心价值观",
      val1Title: "持续不断的创新",
      val1Text: "我们从未停止技术探索；我们采用最先进的网络技术栈 (React, Next.js, Node.js) 和极具创意的人工智能接口，为客户量身打造领先时代的产品。",
      val2Title: "超凡的代码质量",
      val2Text: "我们承诺编写非常整洁、结构严谨且具有高度扩展性的代码，符合全球极速运行标准与谷歌搜索引擎优化规范，确保系统在巨大流量下依然稳如磐石。",
      val3Title: "长期的伙伴关系",
      val3Text: "我们不把客户仅仅当做一次性的商业合同；我们将客户视为长期的事业合作伙伴，从最初的想法交流，到最终上线运行以及持久的技术顾问支持，我们一路同行。",

      processTitle: "我们的专业工作流程体系",
      proc1Title: "1. 需求分析与战略谋划",
      proc1Text: "我们从深度的咨询交流开始，精准理解您项目的核心诉求，调研行业竞争格局，制定出清晰透明的技术开发路线图。",
      proc2Title: "2. 交互与创意视觉设计",
      proc2Text: "我们在 Figma 上设计极其流畅的用户交互原型与视觉界面，彰显您品牌的高端档次，最大化简化用户的浏览与使用体验。",
      proc3Title: "3. 软件工程与敏捷开发",
      proc3Text: "我们的软件工程师将视觉设计转化为运行速度极快的代码，整合人工智能模块，并搭建安全性高、可管理性强的管理后台。",
      proc4Title: "4. 严苛的质量与安全性测试",
      proc4Text: "在最终上线前，我们对系统在多尺寸设备上的兼容性、接口的安全性、数据库承压能力和响应速度进行全方位的严苛审计测试。",
      proc5Title: "5. 顺利上线与增长护航",
      proc5Text: "我们将您的产品部署在顶尖的云端服务器上，对接搜索引擎平台，并开启长期的技术支持与咨询保障，为您的长效商业成功保驾护航。"
    }
  };

  const currentTexts = texts[lang as keyof typeof texts] || texts.en;

  return (
    <div className="min-h-screen bg-transparent flex flex-col">
      <SEO />
      {/* Navbar header */}
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
        
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {t("privacy.back")}
        </Link>

        {/* Hero Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center p-4 rounded-3xl bg-gradient-to-tr from-primary to-accent shadow-xl shadow-purple-500/20 mb-6 animate-glow-pulse">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold gradient-text tracking-tight mb-6">
            {currentTexts.heroTitle}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg font-medium leading-relaxed">
            {currentTexts.heroSubtitle}
          </p>
        </div>

        {/* Introduction Paragraphs (Highly detailed & professional layout) */}
        <div className="glass-strong rounded-[2.5rem] p-8 md:p-12 shadow-xl neon-border relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />
          
          <div className="max-w-4xl mx-auto text-start">
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-6 flex items-center gap-3">
              <Compass className="w-8 h-8 text-primary shrink-0" />
              {currentTexts.introHeading}
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed text-base md:text-lg">
              <p className="font-semibold text-foreground/90">
                {currentTexts.introPara1}
              </p>
              <p className="font-normal text-muted-foreground/80">
                {currentTexts.introPara2}
              </p>
            </div>

            {/* Micro details grid inside about us */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 pt-8 border-t border-border/30">
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div className="text-start">
                  <p className="font-bold text-foreground text-sm">{isRtl ? "جودة غير مساومة" : "Premium Standards"}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{isRtl ? "كود نظيف وأداء خارق" : "Clean robust architectures"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <HeartHandshake className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div className="text-start">
                  <p className="font-bold text-foreground text-sm">{isRtl ? "شراكة ممتدة" : "Client-centric Support"}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{isRtl ? "استشارات وحلول مستمرة" : "Consultations & ongoing support"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div className="text-start">
                  <p className="font-bold text-foreground text-sm">{isRtl ? "أمان وحماية تامة" : "High Security Protocols"}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{isRtl ? "تشفير وحلول سحابية آمنة" : "Encrypted databases & clouds"}</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Vision & Mission Double Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Vision card */}
          <div className="glass-strong rounded-[2.5rem] p-8 lg:p-10 shadow-xl neon-border relative overflow-hidden text-start">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-500/10">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-extrabold text-foreground mb-4">
              {currentTexts.visionTitle}
            </h3>
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              {currentTexts.visionText}
            </p>
          </div>

          {/* Mission card */}
          <div className="glass-strong rounded-[2.5rem] p-8 lg:p-10 shadow-xl neon-border relative overflow-hidden text-start">
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-600 flex items-center justify-center text-white mb-6 shadow-lg shadow-purple-500/10">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-extrabold text-foreground mb-4">
              {currentTexts.missionTitle}
            </h3>
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              {currentTexts.missionText}
            </p>
          </div>
        </div>

        {/* Core Values Paragraph Blocks */}
        <div className="glass-strong rounded-[2.5rem] p-8 md:p-12 shadow-xl neon-border relative overflow-hidden mb-12">
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none -z-10" />
          
          <h2 className="text-3xl font-extrabold gradient-text mb-10 text-center">
            {currentTexts.valuesTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="flex flex-col items-start text-start gap-4 p-5 rounded-2xl hover:bg-primary/5 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl gradient-purple flex items-center justify-center text-white shrink-0 shadow-sm">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                {currentTexts.val1Title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {currentTexts.val1Text}
              </p>
            </div>

            {/* Value 2 */}
            <div className="flex flex-col items-start text-start gap-4 p-5 rounded-2xl hover:bg-primary/5 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl gradient-purple flex items-center justify-center text-white shrink-0 shadow-sm">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                {currentTexts.val2Title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {currentTexts.val2Text}
              </p>
            </div>

            {/* Value 3 */}
            <div className="flex flex-col items-start text-start gap-4 p-5 rounded-2xl hover:bg-primary/5 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl gradient-purple flex items-center justify-center text-white shrink-0 shadow-sm">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                {currentTexts.val3Title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {currentTexts.val3Text}
              </p>
            </div>
          </div>
        </div>

        {/* Work Methodology Timeline (Highly professional) */}
        <div className="glass-strong rounded-[2.5rem] p-8 md:p-12 shadow-xl neon-border relative overflow-hidden text-start">
          <div className="absolute top-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />

          <h2 className="text-3xl font-extrabold gradient-text mb-10 text-center">
            {currentTexts.processTitle}
          </h2>

          <div className="flex flex-col gap-8 md:pl-6 rtl:md:pr-6 border-l-2 rtl:border-l-0 rtl:border-r border-dashed border-primary/30 relative">
            
            {/* Step 1 */}
            <div className="relative pl-6 rtl:pl-0 rtl:pr-6">
              <div className="absolute -left-[31px] rtl:-left-auto rtl:-right-[31px] top-0 w-4 h-4 rounded-full bg-primary ring-4 ring-primary/20 shadow-md shrink-0" />
              <h3 className="text-lg font-bold text-foreground">
                {currentTexts.proc1Title}
              </h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed mt-2 max-w-3xl">
                {currentTexts.proc1Text}
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative pl-6 rtl:pl-0 rtl:pr-6">
              <div className="absolute -left-[31px] rtl:-left-auto rtl:-right-[31px] top-0 w-4 h-4 rounded-full bg-primary ring-4 ring-primary/20 shadow-md shrink-0" />
              <h3 className="text-lg font-bold text-foreground">
                {currentTexts.proc2Title}
              </h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed mt-2 max-w-3xl">
                {currentTexts.proc2Text}
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative pl-6 rtl:pl-0 rtl:pr-6">
              <div className="absolute -left-[31px] rtl:-left-auto rtl:-right-[31px] top-0 w-4 h-4 rounded-full bg-primary ring-4 ring-primary/20 shadow-md shrink-0" />
              <h3 className="text-lg font-bold text-foreground">
                {currentTexts.proc3Title}
              </h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed mt-2 max-w-3xl">
                {currentTexts.proc3Text}
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative pl-6 rtl:pl-0 rtl:pr-6">
              <div className="absolute -left-[31px] rtl:-left-auto rtl:-right-[31px] top-0 w-4 h-4 rounded-full bg-primary ring-4 ring-primary/20 shadow-md shrink-0" />
              <h3 className="text-lg font-bold text-foreground">
                {currentTexts.proc4Title}
              </h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed mt-2 max-w-3xl">
                {currentTexts.proc4Text}
              </p>
            </div>

            {/* Step 5 */}
            <div className="relative pl-6 rtl:pl-0 rtl:pr-6">
              <div className="absolute -left-[31px] rtl:-left-auto rtl:-right-[31px] top-0 w-4 h-4 rounded-full bg-primary ring-4 ring-primary/20 shadow-md shrink-0" />
              <h3 className="text-lg font-bold text-foreground">
                {currentTexts.proc5Title}
              </h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed mt-2 max-w-3xl">
                {currentTexts.proc5Text}
              </p>
            </div>

          </div>
        </div>

      </main>

      <FooterSection />
    </div>
  );
};

export default AboutUs;
