import React, { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import FooterSection from "@/components/FooterSection";
import ThemeToggle from "@/components/ThemeToggle";
import ReadyWebsitesSection from "@/components/ReadyWebsitesSection";

const ReadyWebsites = () => {
  const { t, lang, setLang, langLabels, langOrder } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    const titles = {
      ar: "مواقع جاهزة للبيع | جاهزة ومخصصة لمشروعك",
      en: "Ready Websites for Sale | Pre-built & Customized for You",
      zh: "现成网页独立站出售 | 极速上线与品牌定制开发"
    };
    const descriptions = {
      ar: "تصفح واشترِ مواقع إنترنت ومتاجر إلكترونية جاهزة بأفضل الأسعار وبأعلى جودة برمجية وتصميم متجاوب.",
      en: "Browse and buy pre-built, high-quality websites and online stores customized for your brand instantly.",
      zh: "浏览并购买现成的、高品质的网站和在线商城，即时为您的品牌进行定制开发与极速上线服务。"
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
        <ReadyWebsitesSection />
      </main>
      
      <FooterSection />
    </div>
  );
};

export default ReadyWebsites;
