import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Share } from 'lucide-react';

export default function InstallPWA() {
  const [promptInstall, setPromptInstall] = useState<any>(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const dismissed = localStorage.getItem('suriix-pwa-dismissed');
    if (dismissed) {
      setIsDismissed(true);
    }

    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true) {
      setIsInstalled(true);
    }

    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    const handler = (e: any) => {
      e.preventDefault();
      setPromptInstall(e);
    };

    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setIsDismissed(true);
    });

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const onClick = async () => {
    if (promptInstall) {
      promptInstall.prompt();
      const { outcome } = await promptInstall.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
    } else if (isIOS) {
      setShowIOSInstructions(true);
    } else {
      alert("للتثبيت، يرجى الضغط على خيارات المتصفح (⋮) ثم اختيار 'الإضافة إلى الشاشة الرئيسية' (Add to Home screen)");
    }
  };

  const onDismiss = () => {
    setIsDismissed(true);
    setShowIOSInstructions(false);
    localStorage.setItem('suriix-pwa-dismissed', 'true');
  };

  if (!mounted || isInstalled || isDismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 150, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 150, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200, delay: 1 }} 
        className="fixed bottom-0 left-0 right-0 z-[100] p-4 pb-6 sm:p-6 sm:pb-8 pointer-events-none"
        dir="rtl"
      >
        <div className="mx-auto max-w-md pointer-events-auto bg-black/90 dark:bg-black/95 backdrop-blur-xl shadow-[0_-10px_40px_-15px_rgba(255,255,255,0.1)] rounded-2xl border border-white/10 p-4 flex flex-col gap-3 relative overflow-hidden">
          
          <button 
            onClick={onDismiss}
            className="absolute top-2 left-2 p-1.5 text-gray-400 hover:text-white rounded-full transition-colors z-10"
            aria-label="إغلاق"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-4 z-10">
            <img src="/img/suriix_final.png" alt="Suriix Logo" className="w-14 h-14 object-cover rounded-full" />
            
            <div className="flex-1">
              <h3 className="text-base font-bold text-white leading-tight" style={{ fontFamily: 'sans-serif' }}>Suriix</h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                ثبّت التطبيق لتجربة أسرع للوكالة
              </p>
            </div>
            
            <button
              onClick={onClick}
              className="shrink-0 bg-white hover:bg-gray-200 text-black text-sm font-bold px-5 py-2.5 rounded-full shadow-lg flex items-center gap-2 transition-all active:scale-95"
            >
              <Download className="w-4 h-4" />
              تثبيت
            </button>
          </div>

          {showIOSInstructions && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="z-10 mt-1 p-3 bg-white/5 border border-white/10 rounded-xl text-xs md:text-sm text-gray-300 flex flex-col gap-2"
            >
              <p className="font-semibold text-white">لتثبيت التطبيق على جهازك:</p>
              <div className="flex items-center gap-2">
                <span>1. اضغط على زر المشاركة بالأسفل</span>
                <Share className="w-4 h-4 inline text-blue-400" />
              </div>
              <div>
                <span>2. ثم اختر <strong>"إضافة للشاشة الرئيسية"</strong> (Add to Home Screen)</span>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
