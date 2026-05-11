import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { ArrowLeft, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  const { t, lang, setLang, langLabels, langOrder } = useLanguage();
  const sections = [
    { title: t("legal.privacy.title"), content: t("legal.privacy.content") },
    { title: t("legal.terms.title"), content: t("legal.terms.content") },
    { title: t("legal.refund.title"), content: t("legal.refund.content") },
  ];

  return (
    <div className="min-h-screen bg-background grid-bg">
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* أزرار تبديل اللغة */}
        <div className="flex justify-center gap-2 mb-6">
          {langOrder.map((code) => (
            <button
              key={code}
              onClick={() => setLang(code)}
              className={`px-3 py-1 rounded border text-sm font-medium transition-colors ${lang === code ? "bg-primary text-primary-foreground border-primary" : "bg-background border-muted text-muted-foreground hover:bg-muted"}`}
            >
              {langLabels[code]}
            </button>
          ))}
        </div>
        <h1
          className={`text-3xl md:text-4xl font-bold text-center mb-8 mt-8 ${lang === "ar" ? "text-primary" : "text-[#26163c] dark:text-white"}`}
        >
          {lang === "ar" ? "جميع السياسات القانونية" : t("privacy.title")}
        </h1>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("privacy.back")}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong rounded-2xl neon-border p-8 md:p-12"
        >
          <p className="text-muted-foreground text-sm mb-10">
            {t("privacy.lastUpdated")}: 2026-02-16
          </p>
          <div className="space-y-8">
            {sections.map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-6 neon-border"
              >
                <h2 className="text-lg font-semibold text-foreground mb-3">
                  {i + 1}. {section.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
