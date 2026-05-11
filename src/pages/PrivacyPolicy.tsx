import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, Cookie, Lock, UserCheck, AlertTriangle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import FooterSection from "@/components/FooterSection";
import { useEffect } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const PrivacyPolicy = () => {
  const { t, lang, setLang, langLabels, langOrder } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = lang === "ar" ? "سياسة الخصوصية | Suriix" : "Privacy Policy | Suriix";
    window.scrollTo(0, 0);
  }, [lang]);

  const texts = {
    ar: {
      title: "سياسة الخصوصية",
      subtitle: "نحن نهتم بخصوصيتك ونحمي بياناتك بأعلى المعايير الأمنية",
      lastUpdated: "آخر تحديث: مايو 2026",
      sections: [
        {
          icon: <Cookie className="w-6 h-6 text-primary" />,
          title: "استخدام ملفات تعريف الارتباط (Cookies)",
          content: "نستخدم ملفات تعريف الارتباط لتحسين تجربة المستخدم وتحليل الزيارات. تساعدنا هذه الملفات على فهم كيفية تفاعل المستخدمين مع منصتنا وتقديم محتوى مخصص."
        },
        {
          icon: <AlertTriangle className="w-6 h-6 text-primary" />,
          title: "Google AdSense & Analytics",
          content: "يستخدم موقعنا خدمات جوجل لتحليل البيانات والإعلانات. قد تقوم جوجل باستخدام ملفات تعريف الارتباط لعرض إعلانات بناءً على زياراتك السابقة. يمكنك إدارة تفضيلات الإعلانات من خلال إعدادات حساب جوجل الخاص بك."
        },
        {
          icon: <Lock className="w-6 h-6 text-primary" />,
          title: "حماية البيانات",
          content: "نتخذ إجراءات أمنية صارمة لحماية بياناتك الشخصية من الوصول غير المصرح به أو التعديل أو الإفشاء أو الإتلاف. نستخدم تقنيات تشفير متقدمة لحماية المعلومات الحساسة."
        },
        {
          icon: <UserCheck className="w-6 h-6 text-primary" />,
          title: "حقوق المستخدم",
          content: "يحق لك في أي وقت الوصول إلى بياناتك الشخصية، أو طلب تعديلها أو حذفها. كما يمكنك سحب موافقتك على استخدام بياناتك لأغراض تسويقية بمراسلتنا مباشرة."
        }
      ]
    },
    en: {
      title: "Privacy Policy",
      subtitle: "We care about your privacy and protect your data with the highest security standards",
      lastUpdated: "Last Updated: May 2026",
      sections: [
        {
          icon: <Cookie className="w-6 h-6 text-primary" />,
          title: "Use of Cookies",
          content: "We use cookies to improve user experience and analyze traffic. These files help us understand how users interact with our platform and provide personalized content."
        },
        {
          icon: <AlertTriangle className="w-6 h-6 text-primary" />,
          title: "Google AdSense & Analytics",
          content: "Our site uses Google services for data analysis and ads. Google may use cookies to serve ads based on your previous visits. You can manage your ad preferences through your Google account settings."
        },
        {
          icon: <Lock className="w-6 h-6 text-primary" />,
          title: "Data Protection",
          content: "We take strict security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. We use advanced encryption technologies to protect sensitive information."
        },
        {
          icon: <UserCheck className="w-6 h-6 text-primary" />,
          title: "User Rights",
          content: "You have the right at any time to access your personal data, request its modification or deletion. You can also withdraw your consent to use your data for marketing purposes by contacting us directly."
        }
      ]
    },
    zh: {
      title: "隐私政策",
      subtitle: "我们关心您的隐私，并以最高安全标准保护您的数据",
      lastUpdated: "最后更新：2026年5月",
      sections: [
        {
          icon: <Cookie className="w-6 h-6 text-primary" />,
          title: "使用Cookies",
          content: "我们使用cookies来改善用户体验和分析流量。这些文件帮助我们了解用户如何与我们的平台互动并提供个性化内容。"
        },
        {
          icon: <AlertTriangle className="w-6 h-6 text-primary" />,
          title: "Google AdSense & Analytics",
          content: "我们的网站使用Google服务进行数据分析和广告。Google可能会使用cookies根据您之前的访问来投放广告。您可以通过您的Google帐户设置管理您的广告偏好。"
        },
        {
          icon: <Lock className="w-6 h-6 text-primary" />,
          title: "数据保护",
          content: "我们采取严格的安全措施保护您的个人数据免遭未经授权的访问、更改、披露或破坏。我们使用先进的加密技术保护敏感信息。"
        },
        {
          icon: <UserCheck className="w-6 h-6 text-primary" />,
          title: "用户权利",
          content: "您随时有权访问您的个人数据，要求修改或删除。您也可以通过直接与我们联系撤回您将数据用于营销目的的同意。"
        }
      ]
    }
  };

  const currentTexts = texts[lang as keyof typeof texts];

  return (
    <div className="min-h-screen bg-background grid-bg flex flex-col">
      {/* Navbar for subpages */}
      <nav className="sticky top-0 z-50 glass-strong border-b border-border/40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
          <img src="/img/suriix_final.png" alt="Suriix Logo" className="w-10 h-10 object-cover rounded-full" />
          <span className="font-bold text-xl text-[#26163c] dark:text-white tracking-wide hidden sm:block">Suriix</span>
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

      <main className="flex-1 max-w-4xl mx-auto px-6 py-16 w-full">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {t("privacy.back")}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-primary/10 text-primary mb-6 ring-1 ring-primary/20 shadow-[0_0_30px_rgba(var(--primary),0.2)]">
            <Shield className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#26163c] dark:text-white mb-4 tracking-tight">
            {currentTexts.title}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {currentTexts.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-strong rounded-3xl neon-border p-8 md:p-12 mb-12 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -z-10" />
          
          <p className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-10">
            {currentTexts.lastUpdated}
          </p>
          
          <div className="space-y-12">
            {currentTexts.sections.map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: lang === 'ar' ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col md:flex-row gap-6 items-start"
              >
                <div className="p-4 rounded-2xl glass neon-border group-hover:bg-primary/5 group-hover:scale-105 transition-all duration-300 shrink-0">
                  {section.icon}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {section.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed text-base">
                    {section.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
      
      <FooterSection />
    </div>
  );
};

export default PrivacyPolicy;
