import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Check, Star, MessageCircle } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const WHATSAPP_NUMBER = "967780930635";
type LangKey = "ar" | "en" | "zh";

interface PkgCard {
  icon: string;
  name: { ar: string; en: string; zh: string };
  desc: { ar: string; en: string; zh: string };
  features: { ar: string; en: string; zh: string }[];
  target: { ar: string; en: string; zh: string };
  badge?: "requested" | null;
}

const packages: PkgCard[] = [
  {
    icon: "⚡",
    name: { ar: "باقة الانطلاقة (Start)", en: "Start Package", zh: "启动套餐" },
    desc: { ar: "ابدأ مشروعك الرقمي بسرعة واحتراف", en: "Start your digital project quickly and professionally", zh: "快速专业地启动您的数字项目" },
    badge: null,
    features: [
      { ar: "صفحة هبوط احترافية (Landing Page)", en: "Professional Landing Page", zh: "专业登陆页面" },
      { ar: "تصميم متجاوب لجميع الأجهزة", en: "Responsive design for all devices", zh: "响应式设计" },
      { ar: "ربط واتساب + وسائل التواصل", en: "WhatsApp + Social Media integration", zh: "WhatsApp与社交媒体整合" },
      { ar: "تحسين أساسي للهوية", en: "Basic identity optimization", zh: "基础品牌优化" },
      { ar: "تسليم سريع خلال 3–5 أيام", en: "Fast delivery within 3–5 days", zh: "3-5天内快速交付" },
    ],
    target: { ar: "👉 مناسبة للأفراد والمشاريع الجديدة", en: "👉 Ideal for individuals and new projects", zh: "👉 适合个人和新项目" },
  },
  {
    icon: "🚀",
    name: { ar: "باقة النمو (Growth)", en: "Growth Package", zh: "成长套餐" },
    desc: { ar: "لتحويل مشروعك إلى علامة تجارية قوية", en: "To transform your project into a strong brand", zh: "将您的项目转化为强大品牌" },
    badge: "requested",
    features: [
      { ar: "موقع متعدد الصفحات (حتى 5 صفحات)", en: "Multi-page website (up to 5 pages)", zh: "多页网站（最多5页）" },
      { ar: "تصميم UI/UX احترافي", en: "Professional UI/UX design", zh: "专业UI/UX设计" },
      { ar: "هوية بصرية متناسقة", en: "Consistent visual identity", zh: "统一的视觉形象" },
      { ar: "تحسين سرعة الأداء", en: "Performance & speed optimization", zh: "性能和速度优化" },
      { ar: "إعداد SEO أساسي", en: "Basic SEO setup", zh: "基础SEO设置" },
      { ar: "دعم الربط مع الأنظمة", en: "Systems integration support", zh: "系统集成支持" },
    ],
    target: { ar: "👉 مناسبة للشركات الصغيرة والمتوسطة", en: "👉 Suitable for small & medium businesses", zh: "👉 适合中小型企业" },
  },
  {
    icon: "🏢",
    name: { ar: "باقة الاحتراف (Premium)", en: "Premium Package", zh: "专业套餐" },
    desc: { ar: "حل متكامل للشركات والعلامات التجارية", en: "A complete solution for companies and brands", zh: "针对公司和品牌的完整解决方案" },
    badge: null,
    features: [
      { ar: "تصميم موقع احترافي كامل ومخصص", en: "Fully custom professional website", zh: "完全定制的专业网站" },
      { ar: "تجربة مستخدم متقدمة", en: "Advanced user experience", zh: "高级用户体验" },
      { ar: "تحسين SEO احترافي", en: "Professional SEO optimization", zh: "专业SEO优化" },
      { ar: "إعدادات أداء وسرعة عالية", en: "High performance & speed settings", zh: "高性能和速度设置" },
      { ar: "دعم فني بعد التسليم", en: "Post-delivery technical support", zh: "交付后技术支持" },
      { ar: "ربط دومين + استضافة", en: "Domain + Hosting setup", zh: "域名与主机设置" },
      { ar: "إمكانية إضافة لوحة تحكم", en: "Control panel capability", zh: "可添加控制面板" },
    ],
    target: { ar: "👉 مناسبة للشركات الجادة في السوق", en: "👉 Suitable for serious businesses in the market", zh: "👉 适合市场上的认真企业" },
  }
];

const PackageCard = ({ pkg, lang }: { pkg: PkgCard; lang: LangKey }) => {
  const { t } = useLanguage();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = e.clientX - rect.left - rect.width / 2;
    const cy = e.clientY - rect.top - rect.height / 2;
    setTilt({ x: (cy / rect.height) * 10, y: -(cx / rect.width) * 10 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const sendWhatsApp = () => {
    const msg = lang === "ar" 
      ? `مرحباً، أنا مهتم بـ ${pkg.name.ar} وأريد معرفة المزيد.`
      : lang === "zh"
      ? `你好，我对 ${pkg.name.zh} 感兴趣，想了解更多。`
      : `Hello, I'm interested in the ${pkg.name.en} and would like to know more.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const isRequested = pkg.badge === "requested";

  return (
    <motion.div
      layout
      style={{ rotateX: tilt.x, rotateY: tilt.y, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.03, y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative rounded-2xl p-6 glass neon-border flex flex-col overflow-hidden cursor-default ${
        isRequested
          ? "ring-2 ring-primary/60 shadow-[0_0_30px_hsl(var(--neon-purple)/0.25)]"
          : ""
      }`}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      {isRequested && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute top-4 end-4 z-10"
        >
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold gradient-purple text-primary-foreground neon-glow shadow-lg">
            <Star className="w-3 h-3 fill-current" />
            {t("packages.requested")}
          </span>
        </motion.div>
      )}

      <div className="text-4xl mb-4">{pkg.icon}</div>
      <h4 className={`text-xl font-black gradient-text mb-2 ${isRequested ? "pe-24" : ""}`}>
        {pkg.name[lang]}
      </h4>
      <p className="text-sm text-muted-foreground mb-6">
        {pkg.desc[lang]}
      </p>

      <ul className="space-y-3 mb-6 flex-1">
        {pkg.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-secondary-foreground">
            <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span>{f[lang]}</span>
          </li>
        ))}
      </ul>
      
      <div className="mb-6 pt-4 border-t border-border/30">
        <p className="text-sm font-semibold text-primary">{pkg.target[lang]}</p>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={sendWhatsApp}
        className="w-full py-3 rounded-xl gradient-purple text-primary-foreground font-semibold flex items-center justify-center gap-2 neon-glow hover:shadow-[0_0_40px_hsl(var(--neon-purple)/0.4)] transition-shadow text-sm"
      >
        <MessageCircle className="w-4 h-4" />
        {t("packages.cta")}
      </motion.button>
    </motion.div>
  );
};

const PackagesSection = () => {
  const { lang } = useLanguage();
  
  const title = lang === "ar" ? "باقات Suriix" : lang === "zh" ? "Suriix 套餐" : "Suriix Packages";
  const subtitle = lang === "ar" 
    ? "اختر الباقة المناسبة لمشروعك" 
    : lang === "zh" 
    ? "选择适合您项目的套餐" 
    : "Choose the right package for your project";
  
  const noteText = lang === "ar"
    ? "جميع الباقات قابلة للتخصيص حسب احتياج مشروعك، تواصل معنا لنصمم لك الحل المناسب."
    : lang === "zh"
    ? "所有套餐均可根据您的项目需求进行定制，请联系我们为您设计合适的解决方案。"
    : "All packages are customizable according to your project needs, contact us to design the right solution for you.";

  return (
    <section id="packages" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-1/3 start-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 end-1/4 w-64 h-64 rounded-full bg-accent/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-14">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass neon-border text-xs font-semibold text-primary mb-4"
            >
              <Star className="w-3 h-3 fill-current" />
              {lang === "ar" ? "باقاتنا" : lang === "zh" ? "我们的套餐" : "Our Packages"}
            </motion.span>
            <h2 className="text-3xl md:text-5xl font-black gradient-text mb-4">
              {title}
            </h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
              {subtitle}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <PackageCard pkg={pkg} lang={lang as LangKey} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <p className="text-center text-sm font-medium text-foreground mt-12 max-w-2xl mx-auto p-4 rounded-xl glass neon-border">
            {noteText}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default PackagesSection;

