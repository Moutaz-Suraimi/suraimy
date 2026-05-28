import React, { useState, memo, useCallback, lazy, Suspense, useEffect } from "react";
import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import CinematicIntro from "@/components/CinematicIntro";
import { useLanguage } from "@/contexts/LanguageContext";

// Lazy load non-critical sections & widgets for faster bundle parsing and hydration
const AboutSection = lazy(() => import("@/components/AboutSection"));
const DigitalMirror = lazy(() => import("@/components/DigitalMirror"));
const SolutionsSection = lazy(() => import("@/components/SolutionsSection"));
const PackagesSection = lazy(() => import("@/components/PackagesSection"));
const ReadyWebsitesSection = lazy(() => import("@/components/ReadyWebsitesSection"));
const PortfolioSection = lazy(() => import("@/components/PortfolioSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const BlogSection = lazy(() => import("@/components/BlogSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const FooterSection = lazy(() => import("@/components/FooterSection"));
const ChatbotWidget = lazy(() => import("@/components/ChatbotWidget"));

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
      ar: "Suriix | سوريكس - تصميم مواقع ومتاجر إلكترونية احترافية",
      en: "Suriix | Professional Web Design & E-Commerce Solutions",
      zh: "Suriix | 专业网页设计与智能电商独立站开发"
    };
    const descriptions = {
      ar: "Suriix | سوريكس هي وكالة رقمية متخصصة في تصميم مواقع الإنترنت الاحترافية، وتطوير المتاجر الإلكترونية، وبناء الهوية البصرية، والحلول البرمجية المدعومة بالذكاء الاصطناعي.",
      en: "Suriix is a premier digital agency specializing in professional web design, customized e-commerce development, branding, and AI-driven business automation.",
      zh: "Suriix 是一家顶尖的数字化代理商，专注于高转化率网页设计、企业出海电商独立站开发、品牌视觉升级与人工智能系统定制服务。"
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

  // Defer Google AdSense script loading until 2500ms after cinematic intro finishes.
  // This avoids main-thread script evaluation during scroll interactions or initial animations,
  // preventing scroll jank while keeping page load speeds high.
  useEffect(() => {
    if (!showIntro) {
      const timer = setTimeout(() => {
        try {
          const script = document.createElement("script");
          script.async = true;
          script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4479803404171955";
          script.crossOrigin = "anonymous";
          document.body.appendChild(script);
        } catch (e) {
          console.error("Failed to load Google AdSense:", e);
        }
      }, 2500);

      return () => clearTimeout(timer);
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
        <HeroSection isIntroActive={showIntro} />

        <Suspense fallback={<div className="min-h-[200px] w-full flex items-center justify-center bg-transparent" />}>
          <SectionReveal><AboutSection /></SectionReveal>
          <SectionReveal><DigitalMirror /></SectionReveal>
          <SectionReveal><SolutionsSection /></SectionReveal>
          <SectionReveal><PackagesSection isHome={true} /></SectionReveal>
          <SectionReveal><ReadyWebsitesSection /></SectionReveal>
          <SectionReveal><PortfolioSection /></SectionReveal>
          <SectionReveal><TestimonialsSection /></SectionReveal>
          <SectionReveal><FAQSection /></SectionReveal>
          <SectionReveal><BlogSection /></SectionReveal>
          <SectionReveal><ContactSection /></SectionReveal>
          <FooterSection />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <ChatbotWidget />
      </Suspense>
    </div>
  );
};

export default Index;

