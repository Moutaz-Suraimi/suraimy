import { motion } from "framer-motion";

const PageBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-tr from-[#e3e8ff] via-[#fbfcff] to-[#eddfff] dark:from-[#090714] dark:via-[#0e0b21] dark:to-[#171530] transition-colors duration-300">
      
      {/* ── Fixed background layers (pointer-events:none, z-0) ─────────── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-40 dark:opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(hsl(270 100% 65% / 0.04) 1px, transparent 1px), linear-gradient(90deg, hsl(270 100% 65% / 0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Curving SVG neon paths */}
        <svg
          className="absolute w-full h-full opacity-60 dark:opacity-30"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="globalLine1" x1="0" y1="0" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#a855f7" stopOpacity="0.7" />
              <stop offset="50%"  stopColor="#c084fc" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="globalLine2" x1="0" y1="100%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#818cf8" stopOpacity="0.5" />
              <stop offset="50%"  stopColor="#ec4899" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="globalLine3" x1="100%" y1="0" x2="0%" y2="100%">
              <stop offset="0%"   stopColor="#c084fc" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0.15" />
            </linearGradient>
          </defs>

          {/* Primary sweep — top-left to bottom-right */}
          <motion.path
            d="M -100 350 C 250 150, 750 650, 1540 250"
            stroke="url(#globalLine1)"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          />

          {/* Secondary sweep — bottom */}
          <motion.path
            d="M -50 700 C 350 850, 900 200, 1600 600"
            stroke="url(#globalLine2)"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }}
          />

          {/* Tertiary accent — upper-right */}
          <motion.path
            d="M 700 -50 C 900 200, 1200 100, 1500 400"
            stroke="url(#globalLine3)"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.8, delay: 0.8, ease: "easeInOut" }}
          />
        </svg>

        {/* Ambient glow orbs */}
        <div className="absolute top-[-5%] right-[-5%] w-[600px] h-[600px] rounded-full bg-primary/12 dark:bg-primary/5 blur-[150px] animate-glow-pulse" />
        <div className="absolute bottom-[5%] left-[-5%] w-[550px] h-[550px] rounded-full bg-accent/12 dark:bg-accent/5 blur-[140px] animate-glow-pulse" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-[40%] right-[15%] w-[400px] h-[400px] rounded-full bg-purple-300/8 dark:bg-purple-900/4 blur-[120px] animate-glow-pulse" style={{ animationDelay: "3s" }} />

      </div>

      {/* ── Page content on top ─────────────────────────────────────────── */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default PageBackground;
