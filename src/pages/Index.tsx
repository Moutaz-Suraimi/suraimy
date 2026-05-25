import React, { useState, memo, useCallback } from "react";
import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import DigitalMirror from "@/components/DigitalMirror";
import SolutionsSection from "@/components/SolutionsSection";
import PackagesSection from "@/components/PackagesSection";
import PortfolioSection from "@/components/PortfolioSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
import ReadyWebsitesSection from "@/components/ReadyWebsitesSection";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import ChatbotWidget from "@/components/ChatbotWidget";
import CinematicIntro from "@/components/CinematicIntro";
import { useLanguage } from "@/contexts/LanguageContext";

// ── Cinematic section wrapper: fade + slide-up on scroll entry ────────────
// memo prevents re-renders when parent re-renders (e.g. lang change)
const SectionReveal = memo(
  ({ children, id }: { children: React.ReactNode; id?: string }) => (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
);
SectionReveal.displayName = "SectionReveal";

const Index = () => {
  const { lang } = useLanguage();
  const [showIntro, setShowIntro] = useState(() => {
    try {
      return !sessionStorage.getItem("suriix-intro-seen");
    } catch (e) {
      return true;
    }
  });

  // Stable callback reference — prevents CinematicIntro re-render
  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
    try {
      sessionStorage.setItem("suriix-intro-seen", "true");
    } catch (e) {
      // Ignore storage errors in restricted environments
    }
  }, []);

  React.useEffect(() => {
    // Dynamic SEO update for Main Page
    const titles = {
      ar: "Suriix | تصميم مواقع ومتاجر إلكترونية احترافية",
      en: "Suriix | Professional Web Design & E-Commerce Solutions",
      zh: "Suriix | 专业网页设计与电子商务解决方案"
    };
    const descriptions = {
      ar: "وكالة رقمية متخصصة في تصميم المواقع والمتاجر الإلكترونية وتطوير الهوية البصرية والحلول الرقمية الحديثة.",
      en: "Premium digital agency specializing in professional website design, e-commerce development, branding, and modern digital growth solutions.",
      zh: "专业的数字化代理商，专注于企业网站设计、电商平台开发、品牌视觉形象升级与创新的数字化增长策略。"
    };

    document.title = titles[lang as "ar" | "en" | "zh"] || titles.en;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", descriptions[lang as "ar" | "en" | "zh"] || descriptions.en);
    }
  }, [lang]);

  React.useEffect(() => {
    if (!showIntro && window.location.hash) {
      setTimeout(() => {
        const id = window.location.hash.substring(1);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [showIntro]);

  return (
    <div className="min-h-screen bg-transparent overflow-x-hidden">
      {/* CinematicIntro — only shown once per session */}
      {showIntro && (
        <CinematicIntro onComplete={handleIntroComplete} />
      )}

      <ScrollProgressBar />

      <main className="w-full">
        <HeroSection />

        <SectionReveal><AboutSection /></SectionReveal>
        <SectionReveal><DigitalMirror /></SectionReveal>
        <SectionReveal><SolutionsSection /></SectionReveal>
        <SectionReveal><PackagesSection /></SectionReveal>
        <SectionReveal><ReadyWebsitesSection /></SectionReveal>
        <SectionReveal><PortfolioSection /></SectionReveal>
        <SectionReveal><TestimonialsSection /></SectionReveal>
        <SectionReveal><FAQSection /></SectionReveal>
        <SectionReveal><BlogSection /></SectionReveal>
        <SectionReveal><ContactSection /></SectionReveal>
        <FooterSection />
      </main>

      <ChatbotWidget />
    </div>
  );
};

export default Index;

