import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Share } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function InstallPWA() {
  const { lang } = useLanguage();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [promptInstall, setPromptInstall] = useState<any>(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSHint, setShowIOSHint] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasPulsed, setHasPulsed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    // Check if user previously dismissed or installed
    try {
      const dismissed = localStorage.getItem("suriix-pwa-dismissed-v3");
      if (dismissed) {
        setIsDismissed(true);
      }
    } catch (e) {
      // Ignore storage errors in restricted environments
    }

    // Check if app is already running in standalone mode (installed)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone === true) {
      setIsInstalled(true);
    }

    // Detect iOS devices
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Listen for browser PWA install event
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handler = (e: any) => {
      e.preventDefault();
      setPromptInstall(e);
    };

    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setIsDismissed(true);
    });

    // Delay initial appearance by 4 seconds for a calm, non-intrusive entry
    const entryTimer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    // Trigger a single subtle pulse light 1.5 seconds after appearance
    const pulseTimer = setTimeout(() => {
      setHasPulsed(true);
    }, 5500);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      clearTimeout(entryTimer);
      clearTimeout(pulseTimer);
    };
  }, []);

  const handleInstallClick = useCallback(async () => {
    // Prevent triggering click when user was dragging the icon
    if (isDraggingRef.current) return;

    if (promptInstall) {
      promptInstall.prompt();
      const { outcome } = await promptInstall.userChoice;
      if (outcome === "accepted") {
        setIsInstalled(true);
        setIsDismissed(true);
      }
    } else if (isIOS) {
      setShowIOSHint((prev) => !prev);
    } else {
      // Direct browser fallback instructions
      alert(
        lang === "ar"
          ? "للتثبيت، يرجى الضغط على خيارات المتصفح (⋮) ثم اختيار 'الإضافة إلى الشاشة الرئيسية'."
          : lang === "zh"
          ? "如需安装，请点击浏览器菜单 (⋮) 并选择 '添加到主屏幕'。"
          : "To install, open your browser menu (⋮) and select 'Add to Home screen'."
      );
    }
  }, [promptInstall, isIOS, lang]);

  const handleDismiss = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDismissed(true);
    try {
      localStorage.setItem("suriix-pwa-dismissed-v3", "true");
    } catch (err) {
      // Ignore storage errors
    }
  }, []);

  // Do not render if installed, dismissed, or before delay timer
  if (isInstalled || isDismissed || !isVisible) {
    return null;
  }

  // Localized texts
  const titleText =
    lang === "ar"
      ? "ثبّت Suriix كتطبيق ✨"
      : lang === "zh"
      ? "安装 Suriix 应用 ✨"
      : "Install Suriix App ✨";

  const subtitleText =
    lang === "ar"
      ? "تجربة أسرع بنقرة واحدة"
      : lang === "zh"
      ? "一键获得更流畅的体验"
      : "Faster experience in one click";

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.1}
      onDragStart={() => {
        isDraggingRef.current = true;
      }}
      onDragEnd={() => {
        // Small timeout to distinguish click from drag completion
        setTimeout(() => {
          isDraggingRef.current = false;
        }, 150);
      }}
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-40 dir-rtl select-none touch-none cursor-grab active:cursor-grabbing"
    >
      <div className="relative flex flex-col items-center">
        {/* --- Floating Interactive Tooltip --- */}
        <AnimatePresence>
          {(isHovered || showIOSHint) && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute bottom-full mb-3.5 left-1/2 -translate-x-1/2 w-max max-w-[280px] p-3.5 rounded-2xl shadow-2xl backdrop-blur-xl pointer-events-auto border transition-colors
                bg-white/90 border-purple-200/80 text-slate-800 shadow-purple-900/10
                dark:bg-[#0d0d1a]/90 dark:border-purple-500/30 dark:text-white dark:shadow-purple-950/40"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col text-start">
                  <span className="text-xs font-extrabold tracking-wide flex items-center gap-1 text-purple-700 dark:text-purple-300">
                    {titleText}
                  </span>
                  <span className="text-[11px] font-medium text-slate-600 dark:text-white/70 mt-0.5 leading-snug">
                    {subtitleText}
                  </span>
                </div>

                <button
                  onClick={handleDismiss}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-700 dark:text-white/40 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                  title={lang === "ar" ? "إغلاق" : "Close"}
                  aria-label="Close"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* iOS Safari Installation Guide Helper */}
              {isIOS && showIOSHint && (
                <div className="mt-2.5 pt-2 border-t border-slate-200 dark:border-white/10 text-[11px] text-slate-600 dark:text-white/80 space-y-1">
                  <div className="flex items-center gap-1.5 font-semibold text-purple-600 dark:text-purple-400">
                    <Share className="w-3.5 h-3.5" />
                    <span>
                      {lang === "ar"
                        ? "1. اضغط على زر المشاركة"
                        : "1. Tap the Share button"}
                    </span>
                  </div>
                  <div>
                    <span>
                      {lang === "ar"
                        ? '2. اختر "الإضافة إلى الشاشة الرئيسية"'
                        : '2. Select "Add to Home Screen"'}
                    </span>
                  </div>
                </div>
              )}

              {/* Tooltip Down Arrow */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-white/90 dark:border-t-[#0d0d1a]/90" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- Single Subtle Glow Pulse Ring (Runs once after entry) --- */}
        <AnimatePresence>
          {!hasPulsed && (
            <motion.span
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 1.6, opacity: 0 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 blur-sm pointer-events-none"
            />
          )}
        </AnimatePresence>

        {/* --- Main Floating Suriix Logo Trigger Icon --- */}
        <button
          onClick={handleInstallClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label={titleText}
          className="relative group p-[2px] rounded-full cursor-pointer overflow-hidden shadow-lg transition-all duration-300
            bg-gradient-to-tr from-purple-600 via-indigo-500 to-purple-400
            hover:shadow-purple-500/30 hover:shadow-xl active:scale-95"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full p-1.5 flex items-center justify-center transition-colors
            bg-white/90 backdrop-blur-md dark:bg-[#0d0d1a]/90"
          >
            <img
              src="/favicon-192x192.png"
              alt="Suriix App Icon"
              className="w-full h-full object-cover rounded-full group-hover:rotate-6 transition-transform duration-300 pointer-events-none"
            />

            {/* Micro Badge Sparkle */}
            <span className="absolute -top-0.5 -right-0.5 p-0.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm pointer-events-none">
              <Sparkles className="w-2.5 h-2.5 text-purple-200" />
            </span>
          </div>
        </button>
      </div>
    </motion.div>
  );
}
