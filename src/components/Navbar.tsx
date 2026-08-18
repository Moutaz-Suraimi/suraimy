import React, { useState, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Globe, ChevronDown, Menu, X, Sparkles } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const WHATSAPP = "https://wa.me/967780930635";

interface NavItem {
  key: string;
  href: string;
  labelAr: string;
  labelEn: string;
  labelZh: string;
}

const NAV_ITEMS: NavItem[] = [
  { key: "nav.home", href: "/", labelAr: "الرئيسية", labelEn: "Home", labelZh: "首页" },
  { key: "nav.store", href: "/store", labelAr: "متجر سوريكس", labelEn: "Suriix Store", labelZh: " سوريكس 商店" },
  { key: "nav.packages", href: "/packages", labelAr: "الباقات", labelEn: "Packages", labelZh: "套餐" },
  { key: "nav.portfolio", href: "/portfolio", labelAr: "أعمالنا", labelEn: "Portfolio", labelZh: "案例" },
  { key: "nav.solutions", href: "/solutions", labelAr: "الحلول", labelEn: "Solutions", labelZh: "解决方案" },
  { key: "nav.about", href: "/about", labelAr: "من نحن", labelEn: "About Us", labelZh: "关于我们" },
  { key: "nav.contact", href: "/contact", labelAr: "تواصل معنا", labelEn: "Contact", labelZh: "联系" },
];

const Navbar = memo(() => {
  const { lang, setLang, langLabels, langOrder } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = useCallback((href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith("/")) {
      if (location.pathname === href) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate(href);
        window.scrollTo(0, 0);
      }
    } else {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [navigate, location.pathname]);

  const getItemLabel = (item: NavItem) => {
    if (lang === "ar") return item.labelAr;
    if (lang === "zh") return item.labelZh;
    return item.labelEn;
  };

  const isLinkActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* --- Floating Pill Top Navbar (Light & Dark Theme Adaptive) --- */}
      <div className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl mx-auto transition-all duration-300">
        <nav
          className={`w-full backdrop-blur-xl rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between transition-all duration-300
            bg-white/85 text-slate-800 border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.08),0_0_20px_rgba(124,58,237,0.1)]
            dark:bg-[#0b0c16]/95 dark:text-white dark:border-white/15 dark:shadow-[0_10px_35px_rgba(0,0,0,0.6),0_0_25px_rgba(124,58,237,0.22)]
            ${
              isScrolled 
                ? "border-purple-500/40 shadow-[0_12px_40px_rgba(124,58,237,0.18)] dark:border-purple-500/30 dark:shadow-[0_12px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(139,92,246,0.3)]" 
                : ""
            }`}
        >
          {/* Logo & Brand Name */}
          <div
            className="flex items-center gap-3 cursor-pointer group shrink-0"
            onClick={() => handleNavClick("/")}
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-500 to-purple-400 p-[2px] shadow-lg shadow-purple-500/30 group-hover:scale-105 transition-transform duration-300">
              <img
                src="/favicon-192x192.png"
                alt="SURIix Logo"
                className="w-full h-full rounded-full object-cover bg-white dark:bg-[#0d0d1a]"
              />
            </div>
            <span className="font-display font-extrabold text-xl sm:text-2xl tracking-wide bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-600 dark:from-purple-400 dark:via-indigo-300 dark:to-purple-500 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
              Suriix
            </span>
          </div>

          {/* Center Navigation Links - Desktop */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {NAV_ITEMS.map((item) => {
              const active = isLinkActive(item.href);
              return (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative text-sm font-semibold transition-all duration-200 py-1.5 cursor-pointer ${
                    active
                      ? "text-purple-700 dark:text-white font-bold"
                      : "text-slate-600 hover:text-slate-900 dark:text-white/70 dark:hover:text-white"
                  }`}
                >
                  {getItemLabel(item)}
                  {active && (
                    <motion.div
                      layoutId="activePillNavUnderline"
                      className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-gradient-to-r from-purple-600 to-indigo-500 dark:from-purple-500 dark:to-indigo-400 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.6)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right / Controls Action Buttons */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {/* CTA Button: ابدأ مشروعك الآن */}
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-500 border border-purple-400/30 shadow-[0_0_20px_rgba(139,92,246,0.35)] hover:shadow-[0_0_30px_rgba(139,92,246,0.65)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 cursor-pointer overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                {lang === "ar" ? "ابدأ مشروعك الآن" : lang === "zh" ? "立即启动项目" : "Start Project Now"}
                <Sparkles className="w-4 h-4 text-purple-200 group-hover:rotate-12 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                aria-haspopup="listbox"
                aria-expanded={langMenuOpen}
                aria-label="Select language"
                className="px-3.5 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm
                  bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80 hover:border-purple-300
                  dark:bg-[#14142b]/90 dark:hover:bg-[#1f1f3d] dark:text-white/90 dark:border-white/10 dark:hover:border-purple-500/50"
              >
                <Globe className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span className="uppercase tracking-wider">{lang}</span>
                <ChevronDown className={`w-3 h-3 text-slate-500 dark:text-white/60 transition-transform ${langMenuOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {langMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-12 right-0 rounded-2xl overflow-hidden min-w-[130px] shadow-2xl z-50 backdrop-blur-xl p-1
                      bg-white/95 border border-slate-200 text-slate-800
                      dark:bg-[#0d0d1a] dark:border-white/15 dark:text-white"
                  >
                    {langOrder.map((l) => (
                      <button
                        key={l}
                        onClick={() => { setLang(l); setLangMenuOpen(false); }}
                        className={`w-full px-3.5 py-2 rounded-xl text-xs text-start font-bold transition-all cursor-pointer ${
                          lang === l 
                            ? "text-purple-700 bg-purple-100 dark:text-purple-300 dark:bg-purple-600/30 dark:border dark:border-purple-500/40" 
                            : "text-slate-700 hover:bg-slate-100 dark:text-white/80 dark:hover:bg-white/10"
                        }`}
                      >
                        {langLabels[l]}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle Button */}
            <div className="p-1 rounded-full bg-slate-100 border border-slate-200 hover:border-purple-300 dark:bg-[#14142b]/90 dark:border-white/10 dark:hover:border-purple-500/40 transition-colors">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Controls */}
          <div className="flex lg:hidden items-center gap-2.5">
            <div className="p-1 rounded-full bg-slate-100 border border-slate-200 dark:bg-[#14142b]/90 dark:border-white/10">
              <ThemeToggle />
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-full transition-colors cursor-pointer
                bg-slate-100 border border-slate-200 text-slate-800 hover:bg-slate-200
                dark:bg-[#14142b]/90 dark:border-white/10 dark:text-white dark:hover:bg-white/10"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* --- Mobile Drawer Menu (Light & Dark Theme Adaptive) --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            className="fixed top-20 left-4 right-4 z-40 backdrop-blur-2xl rounded-3xl p-6 flex flex-col gap-4 shadow-2xl lg:hidden
              bg-white/95 border border-slate-200 text-slate-800
              dark:bg-[#0d0d1a]/95 dark:border-white/15 dark:text-white"
          >
            <div className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => {
                const active = isLinkActive(item.href);
                return (
                  <button
                    key={item.key}
                    onClick={() => handleNavClick(item.href)}
                    className={`w-full py-3 px-4 rounded-xl text-start font-bold text-base transition-all cursor-pointer ${
                      active
                        ? "bg-purple-100 text-purple-700 border border-purple-200 dark:bg-purple-600/30 dark:text-white dark:border-purple-500/40"
                        : "text-slate-700 hover:bg-slate-100 dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white"
                    }`}
                  >
                    {getItemLabel(item)}
                  </button>
                );
              })}
            </div>

            <div className="h-px bg-slate-200 dark:bg-white/10 my-1" />

            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-semibold text-slate-500 dark:text-white/60">
                {lang === "ar" ? "اللغة:" : "Language:"}
              </span>
              <div className="flex gap-2">
                {langOrder.map((l) => (
                  <button
                    key={l}
                    onClick={() => { setLang(l); setMobileMenuOpen(false); }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      lang === l 
                        ? "bg-purple-600 text-white border-purple-400" 
                        : "bg-slate-100 border-slate-200 text-slate-700 dark:bg-white/5 dark:border-white/10 dark:text-white/80"
                    }`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg shadow-purple-600/30 text-center"
            >
              {lang === "ar" ? "ابدأ مشروعك الآن 🚀" : lang === "zh" ? "立即启动项目 🚀" : "Start Project Now 🚀"}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
