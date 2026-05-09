import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, Users, Layers, Package, Lightbulb,
  HelpCircle, MessageSquare, Menu, X, Globe, Briefcase, Star, BookOpen
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { key: "nav.home", icon: Home, href: "#home" },
  { key: "nav.about", icon: Users, href: "#about" },
  { key: "nav.mirror", icon: Layers, href: "#mirror" },
  { key: "nav.solutions", icon: Lightbulb, href: "#solutions" },
  { key: "nav.packages", icon: Package, href: "#packages" },
  { key: "nav.portfolio", icon: Briefcase, href: "#portfolio" },
  { key: "nav.testimonials", icon: Star, href: "#testimonials" },
  { key: "nav.faq", icon: HelpCircle, href: "#faq" },
  { key: "nav.blog", icon: BookOpen, href: "#blog" },
  { key: "nav.contact", icon: MessageSquare, href: "#contact" },
];

const SideNav = () => {
  const { t, lang, setLang, langLabels, langOrder } = useLanguage();
  const [hovered, setHovered] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const handleClick = (href: string) => {
    setActive(href);
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const isRtl = lang === "ar";

  const cycleLang = () => {
    setLangMenuOpen(!langMenuOpen);
  };

  return (
    <>
      {/* Unified Mobile Top Navbar */}
      <div className="fixed top-0 left-0 right-0 h-[72px] z-50 md:hidden glass-strong border-b border-border/40 flex items-center px-4 shadow-sm">
        
        {/* Toggle Button */}
        <div className="flex-1 flex justify-start">
          <button 
            onClick={() => setMobileOpen(!mobileOpen)} 
            className="p-2.5 rounded-xl bg-secondary/50 hover:bg-primary/20 transition-colors border border-border/50"
          >
             {mobileOpen ? <X className="w-5 h-5 text-foreground" /> : <Menu className="w-5 h-5 text-foreground" />}
          </button>
        </div>

        {/* Center Logo */}
        <div className="flex items-center gap-2.5 shrink-0 pointer-events-none">
          <div className="w-10 h-10 rounded-full border-2 border-primary/40 shadow-sm flex items-center justify-center p-1.5 shrink-0 bg-black overflow-hidden">
            <img src="/img/suriix2.png" alt="Suriix Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-bold text-xl gradient-text tracking-wide">Suriix</span>
        </div>

        {/* Language & Theme Controls */}
        <div className="flex-1 flex justify-end items-center gap-1.5">
          <div className="relative">
            <button 
              onClick={cycleLang} 
              className="p-2.5 rounded-xl bg-secondary/50 border border-border/50 hover:bg-primary/20 text-sm font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline-block">{langLabels[lang]}</span>
              <span className="sm:hidden uppercase">{lang}</span>
            </button>
            <AnimatePresence>
              {langMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 5, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.95 }}
                  className="absolute top-14 end-0 glass-strong border border-border/50 rounded-xl overflow-hidden min-w-[120px] shadow-xl z-50"
                >
                  {langOrder.map((l) => (
                    <button
                      key={l}
                      onClick={() => { setLang(l); setLangMenuOpen(false); }}
                      className={`w-full px-4 py-3 text-sm text-start font-medium transition-colors ${
                        lang === l ? "text-primary bg-primary/10" : "text-foreground hover:bg-secondary/50"
                      }`}
                    >
                      {langLabels[l]}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Desktop Language switcher - top corner */}
      <div className="fixed top-4 z-50 hidden md:flex items-center gap-2" style={{ [isRtl ? "left" : "right"]: "1rem" }}>
        <ThemeToggle />
        <button
          onClick={cycleLang}
          className="p-3 glass rounded-lg neon-border flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
        >
          <Globe className="w-4 h-4" />
          {langLabels[lang]}
        </button>
        <AnimatePresence>
          {langMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute top-14 end-0 glass-strong rounded-xl neon-border overflow-hidden min-w-[120px]"
            >
              {langOrder.map((l) => (
                <button
                  key={l}
                  onClick={() => { setLang(l); setLangMenuOpen(false); }}
                  className={`w-full px-4 py-2.5 text-sm text-start transition-colors ${
                    lang === l ? "text-primary bg-primary/10" : "text-foreground hover:bg-secondary/50"
                  }`}
                >
                  {langLabels[l]}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop sidebar */}
      <nav
        className="fixed top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-2 p-2 glass-strong rounded-2xl neon-border"
        style={{ [isRtl ? "right" : "left"]: "1rem" }}
      >
        <div className="flex flex-col items-center justify-center mb-6 p-2 mt-2">
          <div className="w-16 h-16 rounded-full border-2 border-primary/50 pulse-glow shadow-lg flex items-center justify-center p-2.5 shrink-0 bg-black overflow-hidden">
            <img src="/img/suriix2.png" alt="Suriix Logo" className="w-full h-full object-contain" />
          </div>
        </div>
        {navItems.map((item) => (
          <div
            key={item.key}
            className="relative"
            onMouseEnter={() => setHovered(item.key)}
            onMouseLeave={() => setHovered(null)}
          >
            <button
              onClick={() => handleClick(item.href)}
              className={`p-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                active === item.href
                  ? "bg-primary/20 text-primary neon-glow"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <AnimatePresence>
                {hovered === item.key && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="text-sm font-medium whitespace-nowrap overflow-hidden"
                  >
                    {t(item.key)}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        ))}
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
             initial={{ opacity: 0, x: isRtl ? 100 : -100 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: isRtl ? 100 : -100 }}
             className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center md:hidden pt-[80px]"
          >
            <div className="flex flex-col items-center gap-2 mb-4 mt-2 shrink-0">
              <div className="w-20 h-20 rounded-full border-2 border-primary/50 pulse-glow shadow-lg flex items-center justify-center p-3 shrink-0 bg-black overflow-hidden">
                <img src="/img/suriix2.png" alt="Suriix Logo" className="w-full h-full object-contain" />
              </div>
              <p className="gradient-text font-bold text-2xl tracking-wide">Suriix</p>
            </div>
            
            <div className="w-full flex-1 overflow-y-auto px-4 pb-4 pt-1 flex flex-col gap-1.5 custom-scrollbar items-center">
              <div className="w-full max-w-[280px] flex flex-col gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => handleClick(item.href)}
                    className={`flex items-center gap-3 px-5 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                      active === item.href
                        ? "bg-primary/20 text-primary neon-glow"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    }`}
                  >
                    <item.icon className="w-5 h-5 shrink-0" />
                    {t(item.key)}
                  </button>
                ))}
                <div className="h-px bg-border/50 my-2 w-full" />
                <div className="flex justify-center items-center py-2">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SideNav;
