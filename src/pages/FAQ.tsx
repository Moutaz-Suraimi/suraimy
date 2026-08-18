import React, { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import FooterSection from "@/components/FooterSection";
import ThemeToggle from "@/components/ThemeToggle";
import FAQSection from "@/components/FAQSection";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";

const FAQ = () => {
  const { t, lang, setLang, langLabels, langOrder } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": t("faq.q1"),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t("faq.a1")
        }
      },
      {
        "@type": "Question",
        "name": t("faq.q2"),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t("faq.a2")
        }
      },
      {
        "@type": "Question",
        "name": t("faq.q3"),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t("faq.a3")
        }
      },
      {
        "@type": "Question",
        "name": t("faq.q4"),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t("faq.a4")
        }
      },
      {
        "@type": "Question",
        "name": t("faq.q5"),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t("faq.a5")
        }
      },
      {
        "@type": "Question",
        "name": t("faq.q6"),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t("faq.a6")
        }
      },
      {
        "@type": "Question",
        "name": t("faq.q7"),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t("faq.a7")
        }
      },
      {
        "@type": "Question",
        "name": t("faq.q8"),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t("faq.a8")
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col">
      <SEO schema={faqSchema} />
      {/* Floating Dark Pill Navbar */}
      <Navbar />

      <main className="flex-1 w-full max-w-6xl mx-auto px-6 pt-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {t("privacy.back")}
        </Link>
        <FAQSection />
      </main>
      
      <FooterSection />
    </div>
  );
};

export default FAQ;
