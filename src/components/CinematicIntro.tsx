import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Volume2, VolumeX, SkipForward } from "lucide-react";

const introText: Record<string, { line1: string; line2: string }> = {
  ar: {
    line1: "مرحباً بك…",
    line2: "لقد دخلت الآن عالم Suriix الرقمي",
  },
  en: {
    line1: "Welcome…",
    line2: "You have entered the digital world of Suriix",
  },
  zh: {
    line1: "欢迎…",
    line2: "你已进入苏里米数字世界",
  },
};

const CinematicIntro = ({ onComplete }: { onComplete: () => void }) => {
  const { lang } = useLanguage();
  const [phase, setPhase] = useState<"logo" | "text" | "fadeout">("logo");
  const [muted, setMuted] = useState(true);
  const [typedLine1, setTypedLine1] = useState("");
  const [typedLine2, setTypedLine2] = useState("");
  const timerRef = useRef<number>();

  const text = introText[lang] || introText.en;

  const skip = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setPhase("fadeout");
    setTimeout(onComplete, 600);
  }, [onComplete]);

  // Phase progression
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("text"), 1500);
    return () => { clearTimeout(t1); };
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (phase !== "text") return;

    let i = 0;
    const line1 = text.line1;
    const line2 = text.line2;

    const typeLine1 = () => {
      if (i <= line1.length) {
        setTypedLine1(line1.slice(0, i));
        i++;
        timerRef.current = window.setTimeout(typeLine1, 60);
      } else {
        i = 0;
        timerRef.current = window.setTimeout(typeLine2, 300);
      }
    };

    const typeLine2 = () => {
      if (i <= line2.length) {
        setTypedLine2(line2.slice(0, i));
        i++;
        timerRef.current = window.setTimeout(typeLine2, 40);
      } else {
        timerRef.current = window.setTimeout(() => {
          setPhase("fadeout");
          setTimeout(onComplete, 800);
        }, 1500);
      }
    };

    typeLine1();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [phase, text, onComplete]);

  return (
    <AnimatePresence>
      {phase !== "fadeout" ? (
        <motion.div
          key="intro"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(135deg, #F2FEFA 0%, #E8E5F6 50%, #B8B3F3 100%)" }}
        >
          {/* Optimized High-Performance Animated Background Elements */}
          <motion.div 
            className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] opacity-70"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] rounded-full" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)" }} />
            <div className="absolute bottom-[20%] right-[20%] w-[45%] h-[45%] rounded-full" style={{ background: "radial-gradient(circle, rgba(184,179,243,0.8) 0%, transparent 70%)" }} />
            <div className="absolute top-[40%] right-[30%] w-[40%] h-[40%] rounded-full" style={{ background: "radial-gradient(circle, rgba(242,254,250,0.9) 0%, transparent 70%)" }} />
            <div className="absolute bottom-[30%] left-[30%] w-[35%] h-[35%] rounded-full" style={{ background: "radial-gradient(circle, rgba(35,20,60,0.15) 0%, transparent 70%)" }} />
          </motion.div>
          
          {/* Light Overlay without heavy blur */}
          <div className="absolute inset-0 bg-white/10" />

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md px-6">
            <AnimatePresence mode="wait">
              {(phase === "logo" || phase === "text") && (
                <motion.div
                  key="logo-text"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center justify-center gap-6"
                >
                  <div className="flex items-center justify-center">
                    <img 
                      src="/img/suriix_final.png" 
                      alt="Suriix Logo" 
                      className="w-28 h-28 md:w-36 md:h-36 object-cover rounded-full shadow-[0_0_40px_rgba(255,255,255,0.15)]" 
                    />
                  </div>
                  
                  <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#26163c] mb-2 drop-shadow-sm tracking-tight">
                      Suriix
                    </h1>
                    <div className="flex items-center justify-center gap-2">
                      <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#2c1558]/30" />
                      <p className="text-xs md:text-sm tracking-[0.4em] text-[#2c1558]/70 uppercase font-bold">
                        Digital
                      </p>
                      <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#2c1558]/30" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Premium Typewriter text */}
            <div className="mt-12 h-20 flex flex-col items-center justify-center">
              {phase === "text" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-3 text-center w-full"
                >
                  <p className="text-lg md:text-xl text-[#2c1558]/90 font-bold tracking-wide">
                    {typedLine1}
                    {typedLine1.length < text.line1.length && (
                      <span className="inline-block w-[2px] h-5 bg-[#462b78] animate-pulse ml-1 align-middle" />
                    )}
                  </p>
                  <p className="text-sm md:text-base text-[#2c1558]/70 font-semibold tracking-wider">
                    {typedLine2}
                    {typedLine1.length >= text.line1.length && typedLine2.length < text.line2.length && (
                      <span className="inline-block w-[2px] h-4 bg-[#462b78] animate-pulse ml-1 align-middle" />
                    )}
                  </p>
                </motion.div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="absolute bottom-8 right-8 flex items-center gap-3 z-20">
            <button
              onClick={() => setMuted(!muted)}
              className="p-3 bg-black/5 hover:bg-black/10 border border-black/10 backdrop-blur-md rounded-full text-[#2c1558]/70 hover:text-[#2c1558] transition-all shadow-lg"
            >
              {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={skip}
              className="flex items-center gap-2 px-5 py-3 bg-black/5 hover:bg-black/10 border border-black/10 backdrop-blur-md rounded-full text-[#2c1558]/70 hover:text-[#2c1558] transition-all shadow-lg text-sm font-bold tracking-wide"
            >
              <SkipForward className="w-4 h-4" />
              تخطي
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default CinematicIntro;
