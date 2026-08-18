import React, { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import FooterSection from "@/components/FooterSection";
import ThemeToggle from "@/components/ThemeToggle";
import PackagesSection from "@/components/PackagesSection";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";

const Packages = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-transparent flex flex-col">
      <SEO />
      <Navbar />

      <main className="flex-1 w-full max-w-6xl mx-auto px-6 pt-24">
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
