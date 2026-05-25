import React, { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import FooterSection from "@/components/FooterSection";
import ThemeToggle from "@/components/ThemeToggle";
import PortfolioSection from "@/components/PortfolioSection";

const Portfolio = () => {
  const { t, lang, setLang, langLabels, langOrder } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    const titles = {
      ar: "أعمالنا | مشاريع وتصاميم Suriix",
      en: "Our Portfolio | Suriix Projects & Custom Designs",
      zh: "我们的作品集 | Suriix 精选项目与定制设计"
    };
    const descriptions = {
      ar: "استعرض أحدث مشاريع وتصاميم Suriix الاحترافية في تصميم المواقع والمتاجر الإلكترونية والهوية البصرية.",
      en: "Browse the latest professional projects and custom web designs by Suriix digital agency.",
      zh: "展示 Suriix 团队在网页设计、电商系统开发、品牌视觉形象升级等领域的精选成功案例。"
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
        <PortfolioSection />
      </main>
      
      <FooterSection />
    </div>
  );
};

export default Portfolio;
