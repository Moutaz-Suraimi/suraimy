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
  { key: "nav.store", href: "/store", labelAr: "المتجر", labelEn: "Store", labelZh: "商店" },
  { key: "nav.subscriptions", href: "/subscriptions", labelAr: "الاشتراكات", labelEn: "Subscriptions", labelZh: "订阅" },
  { key: "nav.packages", href: "/packages", labelAr: "الباقات", labelEn: "Packages", labelZh: "套餐" },
  { key: "nav.portfolio", href: "/portfolio", labelAr: "أعمالنا", labelEn: "Portfolio", labelZh: "案例" },
  { key: "nav.solutions", href: "/solutions", labelAr: "الحلول", labelEn: "Solutions", labelZh: "解决方案" },
  { key: "nav.about", href: "/about", labelAr: "من نحن", labelEn: "About", labelZh: "关于" },
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
      <div className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-[96%] max-w-7xl mx-auto transition-all duration-300">
        <nav
          className={`pill-navbar-container ${isScrolled ? "scrolled" : ""}`}
        >
          {/* Logo & Brand Name */}
          <div
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0"
            onClick={() => handleNavClick("/")}
          >
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-500 to-purple-400 p-[2px] shadow-lg shadow-purple-500/30 group-hover:scale-105 transition-transform duration-300">
              <img
                src="/favicon-192x192.png"
                alt="SURIix Logo"
                className="w-full h-full rounded-full object-cover bg-white dark:bg-[#0d0d1a]"
              />
            </div>
            <span className="font-display font-extrabold text-lg sm:text-xl xl:text-2xl tracking-tight bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-600 dark:from-purple-400 dark:via-indigo-300 dark:to-purple-500 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
              Suriix
            </span>
          </div>

          {/* Center Navigation Links - Desktop (Harmonious & Responsive) */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2.5 2xl:gap-4 shrink min-w-0">
            {NAV_ITEMS.map((item) => {
              const active = isLinkActive(item.href);
              return (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.href)}
                  className={`pill-nav-btn relative text-xs xl:text-[13px] 2xl:text-sm font-semibold tracking-tight whitespace-nowrap px-2 xl:px-2.5 py-1 rounded-full transition-all duration-200 ${
                    active
                      ? "text-purple-700 dark:text-white font-bold"
                      : "text-slate-600 hover:text-slate-900 dark:text-white/70 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-white/5"
                  }`}
                >
                  {getItemLabel(item)}
                  {active && (
                    <motion.div
                      layoutId="activePillNavUnderline"
                      className="absolute -bottom-0.5 left-1.5 right-1.5 h-[2px] bg-gradient-to-r from-purple-600 to-indigo-500 dark:from-purple-500 dark:to-indigo-400 rounded-full shadow-sm"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right / Controls Action Buttons */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
            {/* CTA Button: Start Project */}
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-1.5 px-3.5 xl:px-4 2xl:px-5 py-1.5 xl:py-2 rounded-full font-bold text-xs xl:text-sm text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-500 border border-purple-400/30 shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 cursor-pointer overflow-hidden group shrink-0"
            >
              <span className="relative z-10 flex items-center gap-1.5 whitespace-nowrap">
                <span className="hidden xl:inline">
                  {lang === "ar" ? "ابدأ مشروعك الآن" : lang === "zh" ? "立即启动项目" : "Start Project"}
                </span>
                <span className="xl:hidden">
                  {lang === "ar" ? "ابدأ الآن" : lang === "zh" ? "启动项目" : "Start"}
                </span>
                <Sparkles className="w-3.5 h-3.5 text-purple-200 group-hover:rotate-12 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>

            {/* Language Selector Dropdown */}
            <div className="relative shrink-0">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                aria-haspopup="listbox"
                aria-expanded={langMenuOpen}
                aria-label="Select language"
                className="pill-nav-btn px-2.5 xl:px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shadow-sm
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
                    className="absolute top-11 right-0 rounded-2xl overflow-hidden min-w-[130px] shadow-2xl z-50 backdrop-blur-xl p-1
                      bg-white/95 border border-slate-200 text-slate-800
                      dark:bg-[#0d0d1a] dark:border-white/15 dark:text-white"
                  >
                    {langOrder.map((l) => (
                      <button
                        key={l}
                        onClick={() => { setLang(l); setLangMenuOpen(false); }}
                        className={`pill-nav-btn w-full px-3.5 py-2 rounded-xl text-xs text-start font-bold transition-all cursor-pointer ${
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
            <div className="p-1 rounded-full bg-slate-100 border border-slate-200 hover:border-purple-300 dark:bg-[#14142b]/90 dark:border-white/10 dark:hover:border-purple-500/40 transition-colors shrink-0">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Controls */}
          <div className="flex lg:hidden items-center gap-2">
            <div className="p-1 rounded-full bg-slate-100 border border-slate-200 dark:bg-[#14142b]/90 dark:border-white/10">
              <ThemeToggle />
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="pill-nav-btn p-2 rounded-full transition-colors cursor-pointer
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
            className="fixed top-20 left-4 right-4 z-40 backdrop-blur-2xl rounded-3xl p-5 flex flex-col gap-3.5 shadow-2xl lg:hidden
              bg-white/95 border border-slate-200 text-slate-800
              dark:bg-[#0d0d1a]/95 dark:border-white/15 dark:text-white"
          >
            <div className="flex flex-col gap-1.5">
              {NAV_ITEMS.map((item) => {
                const active = isLinkActive(item.href);
                return (
                  <button
                    key={item.key}
                    onClick={() => handleNavClick(item.href)}
                    className={`pill-nav-btn w-full py-2.5 px-4 rounded-xl text-start font-bold text-sm transition-all cursor-pointer ${
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

            <div className="h-px bg-slate-200 dark:bg-white/10 my-0.5" />

            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-semibold text-slate-500 dark:text-white/60">
                {lang === "ar" ? "اللغة:" : "Language:"}
              </span>
              <div className="flex gap-2">
                {langOrder.map((l) => (
                  <button
                    key={l}
                    onClick={() => { setLang(l); setMobileMenuOpen(false); }}
                    className={`pill-nav-btn px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
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
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg shadow-purple-600/30 text-center text-sm"
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
