import React, { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import FooterSection from "@/components/FooterSection";
import ThemeToggle from "@/components/ThemeToggle";
import PackagesSection from "@/components/PackagesSection";

const Packages = () => {
  const { t, lang, setLang, langLabels, langOrder } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    const titles = {
      ar: "باقات وأسعار تصميم المواقع والمتاجر | Suriix",
      en: "Pricing & Web Development Packages | Suriix",
      zh: "套餐与价格方案 - 网页设计与电商开发 | Suriix"
    };
    const descriptions = {
      ar: "تعرف على باقات وأسعار تصميم المواقع التعريفيّة والمتاجر الإلكترونية وحلول الذكاء الاصطناعي المخصصة لمشروعك من Suriix.",
      en: "Explore our web development pricing, custom e-commerce packages, and tailored AI business automation plans from Suriix.",
      zh: "查看 Suriix 团队为您定制的专属网页设计、品牌出海电商平台与人工智能系统开发套餐及价格方案。"
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
        <PackagesSection />
      </main>
      
      <FooterSection />
    </div>
  );
};

export default Packages;
