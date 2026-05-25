import React, { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import FooterSection from "@/components/FooterSection";
import ThemeToggle from "@/components/ThemeToggle";
import BlogSection from "@/components/BlogSection";

const Blog = () => {
  const { t, lang, setLang, langLabels, langOrder } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    const titles = {
      ar: "مدونة Suriix | مقالات ونصائح تقنية ورقمية",
      en: "Suriix Blog | Tech Insights, Web Design & Digital Tips",
      zh: "Suriix 博客 | 技术分享与数字化商业指南"
    };
    const descriptions = {
      ar: "اقرأ مقالات ونصائح خبراء Suriix في تصميم المواقع، زيادة مبيعات المتاجر، اتجاهات الذكاء الاصطناعي، واستراتيجيات التسويق الحديثة.",
      en: "Read articles and expert tips from Suriix on custom website design, e-commerce conversion optimization, AI trends, and digital marketing.",
      zh: "获取来自 Suriix 专家的独家干货：高转化率网页设计技巧、独立站运营增长方案及前沿人工智能商业化指南。"
    };

    document.title = titles[lang as "ar" | "en" | "zh"] || titles.en;
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", descriptions[lang as "ar" | "en" | "zh"] || descriptions.en);
    }
    
    window.scrollTo(0, 0);
  }, [lang]);

  return (
    <div className="min-h-screen bg-transparent flex flex-col">
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

      <main className="flex-1 w-full max-w-6xl mx-auto px-6 pt-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {t("privacy.back")}
        </Link>
        <BlogSection />
      </main>
      
      <FooterSection />
    </div>
  );
};

export default Blog;
