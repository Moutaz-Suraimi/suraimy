import React, { memo } from "react";

/**
 * Global Tech Aurora Background Component
 * 
 * Provides a unified visual identity for SURIix across all pages:
 * - Light Mode: Soft white-purple base (#FAF9FF) with soft purple, violet & blue aurora gradients.
 * - Dark Mode: Deep tech night base (#070711) with subtle glowing cyber gradients.
 * - Tech Layers: Low-opacity tech grid, flowing data waves, PCB circuit trace lines, dot matrices, and micro sparkles.
 * - Performance: 100% GPU composited, pure SVG & CSS keyframe animations, zero JS runtime overhead.
 */
const PageBackground = memo(({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen bg-[#FAF9FF] dark:bg-[#070711] text-foreground transition-colors duration-500">

      {/* ── Fixed Background Visual Atmosphere ───────────────────────────────── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">

        {/* 1. Soft Aurora Mesh Gradient Orbs (Corner Diffused Illumination) */}
        {/* Top-Left Aurora Sphere (Purple / Violet) */}
        <div
          className="absolute -top-32 -left-32 w-[650px] h-[650px] sm:w-[850px] sm:h-[850px] rounded-full opacity-70 dark:opacity-40 blur-[90px] sm:blur-[130px] transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(circle, rgba(168, 85, 247, 0.35) 0%, rgba(192, 132, 252, 0.18) 40%, rgba(216, 180, 254, 0.05) 65%, transparent 80%)",
          }}
        />

        {/* Bottom-Left Aurora Sphere (Cyan / Blue Accent) */}
        <div
          className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] rounded-full opacity-65 dark:opacity-35 blur-[80px] sm:blur-[120px] transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(circle, rgba(59, 130, 246, 0.30) 0%, rgba(147, 197, 253, 0.15) 45%, transparent 75%)",
          }}
        />

        {/* Top-Right Aurora Sphere (Violet / Indigo Accent) */}
        <div
          className="absolute -top-20 -right-20 w-[550px] h-[550px] sm:w-[750px] sm:h-[750px] rounded-full opacity-60 dark:opacity-30 blur-[90px] sm:blur-[130px] transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.28) 0%, rgba(168, 85, 247, 0.12) 50%, transparent 80%)",
          }}
        />

        {/* Bottom-Right Aurora Sphere (Vibrant Tech Purple) */}
        <div
          className="absolute -bottom-28 -right-28 w-[700px] h-[700px] sm:w-[900px] sm:h-[900px] rounded-full opacity-75 dark:opacity-45 blur-[100px] sm:blur-[140px] transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(circle, rgba(147, 51, 234, 0.35) 0%, rgba(168, 85, 247, 0.20) 40%, rgba(99, 102, 241, 0.08) 70%, transparent 85%)",
          }}
        />

        {/* 2. Ultra-Subtle Technical Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06] transition-opacity duration-500"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(124, 58, 237, 0.6) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(124, 58, 237, 0.6) 1px, transparent 1px)
            `,
            backgroundSize: "56px 56px",
          }}
        />

        {/* 3. High-Tech SVG Vectors: Flowing Data Waves, PCB Circuits, Dot Matrix & Sparkles */}
        <svg
          className="absolute w-full h-full opacity-80 dark:opacity-50 transition-opacity duration-500"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Top-Left Wave Line Gradient */}
            <linearGradient id="waveTopLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.65" />
              <stop offset="40%" stopColor="#c084fc" stopOpacity="0.40" />
              <stop offset="80%" stopColor="#60a5fa" stopOpacity="0.30" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
            </linearGradient>

            {/* Bottom-Right Wave Line Gradient */}
            <linearGradient id="waveBottomRightGrad" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#9333ea" stopOpacity="0.70" />
              <stop offset="35%" stopColor="#a855f7" stopOpacity="0.45" />
              <stop offset="70%" stopColor="#818cf8" stopOpacity="0.30" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
            </linearGradient>

            {/* PCB Trace Gradient */}
            <linearGradient id="pcbTraceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c084fc" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0.15" />
            </linearGradient>

            {/* Subtle glow filter for sparkles */}
            <filter id="sparkleGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Keyframe animation inline styles for floating waves & subtle sparkles */}
            <style>{`
              @keyframes subtlePulse {
                0%, 100% { opacity: 0.4; transform: scale(1); }
                50% { opacity: 0.95; transform: scale(1.15); }
              }
              @keyframes floatSlow {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-8px); }
              }
              .animate-sparkle-1 { animation: subtlePulse 4s ease-in-out infinite; transform-origin: 140px 120px; }
              .animate-sparkle-2 { animation: subtlePulse 5s ease-in-out 1.5s infinite; transform-origin: 1260px 180px; }
              .animate-sparkle-3 { animation: subtlePulse 4.5s ease-in-out 0.8s infinite; transform-origin: 1320px 760px; }
              .animate-sparkle-4 { animation: subtlePulse 6s ease-in-out 2.2s infinite; transform-origin: 160px 780px; }
            `}</style>
          </defs>

          {/* ── A. FLOWING DATA WAVE LINES (Top-Left Corner) ───────────────── */}
          <g opacity="0.85">
            <path
              d="M -120 40 Q 150 120, 320 280 T 600 520"
              stroke="url(#waveTopLeftGrad)"
              strokeWidth="1.8"
              fill="none"
            />
            <path
              d="M -100 80 Q 170 160, 350 320 T 640 560"
              stroke="url(#waveTopLeftGrad)"
              strokeWidth="1.2"
              strokeDasharray="4 4"
              fill="none"
            />
            <path
              d="M -80 120 Q 190 200, 380 360 T 680 600"
              stroke="url(#waveTopLeftGrad)"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M -60 160 Q 210 240, 410 400 T 720 640"
              stroke="url(#waveTopLeftGrad)"
              strokeWidth="0.8"
              strokeOpacity="0.6"
              fill="none"
            />
          </g>

          {/* ── B. FLOWING DATA WAVE LINES (Bottom-Right Corner) ───────────── */}
          <g opacity="0.85">
            <path
              d="M 1560 860 Q 1290 780, 1120 620 T 840 380"
              stroke="url(#waveBottomRightGrad)"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M 1540 820 Q 1270 740, 1090 580 T 800 340"
              stroke="url(#waveBottomRightGrad)"
              strokeWidth="1.2"
              strokeDasharray="5 5"
              fill="none"
            />
            <path
              d="M 1520 780 Q 1250 700, 1060 540 T 760 300"
              stroke="url(#waveBottomRightGrad)"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M 1500 740 Q 1230 660, 1030 500 T 720 260"
              stroke="url(#waveBottomRightGrad)"
              strokeWidth="0.7"
              strokeOpacity="0.5"
              fill="none"
            />
          </g>

          {/* ── C. PCB CIRCUIT TRACE LINES & CONNECTION NODES ─────────────── */}
          {/* Top-Left Circuit Traces */}
          <g stroke="url(#pcbTraceGrad)" strokeWidth="1.2" fill="none">
            <path d="M 60 140 H 220 L 280 200 V 290" />
            <path d="M 120 90 H 260 L 330 160 H 420" />
            <path d="M 180 340 V 240 L 240 180" />
          </g>

          {/* Top-Left Node Dots */}
          <g fill="#c084fc">
            <circle cx="220" cy="140" r="3" />
            <circle cx="280" cy="200" r="2.5" />
            <circle cx="290" cy="290" r="3.5" />
            <circle cx="420" cy="160" r="3" />
            <circle cx="180" cy="340" r="2.5" />
          </g>

          {/* Bottom-Right Circuit Traces */}
          <g stroke="url(#pcbTraceGrad)" strokeWidth="1.2" fill="none">
            <path d="M 1380 760 H 1220 L 1160 700 V 610" />
            <path d="M 1320 810 H 1180 L 1110 740 H 1020" />
            <path d="M 1260 560 V 660 L 1200 720" />
          </g>

          {/* Bottom-Right Node Dots */}
          <g fill="#a855f7">
            <circle cx="1220" cy="760" r="3" />
            <circle cx="1160" cy="700" r="2.5" />
            <circle cx="1160" cy="610" r="3.5" />
            <circle cx="1020" cy="740" r="3" />
            <circle cx="1260" cy="560" r="2.5" />
          </g>

          {/* ── D. DOT MATRIX CLUSTERS ─────────────────────────────────────── */}
          {/* Top-Left Dot Matrix (4x4) */}
          <g fill="#a855f7" opacity="0.35">
            {[0, 1, 2, 3].map((row) =>
              [0, 1, 2, 3].map((col) => (
                <circle key={`tl-${row}-${col}`} cx={130 + col * 12} cy={130 + row * 12} r="1.5" />
              ))
            )}
          </g>

          {/* Top-Right Dot Matrix (3x3) */}
          <g fill="#818cf8" opacity="0.30">
            {[0, 1, 2].map((row) =>
              [0, 1, 2].map((col) => (
                <circle key={`tr-${row}-${col}`} cx={1240 + col * 14} cy={220 + row * 14} r="1.5" />
              ))
            )}
          </g>

          {/* Bottom-Left Dot Matrix (4x4) */}
          <g fill="#60a5fa" opacity="0.30">
            {[0, 1, 2, 3].map((row) =>
              [0, 1, 2, 3].map((col) => (
                <circle key={`bl-${row}-${col}`} cx={200 + col * 12} cy={720 + row * 12} r="1.5" />
              ))
            )}
          </g>

          {/* Bottom-Right Dot Matrix (4x4) */}
          <g fill="#a855f7" opacity="0.35">
            {[0, 1, 2, 3].map((row) =>
              [0, 1, 2, 3].map((col) => (
                <circle key={`br-${row}-${col}`} cx={1270 + col * 12} cy={740 + row * 12} r="1.5" />
              ))
            )}
          </g>

          {/* ── E. SPARKLES & TECH MICRO PARTICLES ──────────────────────────── */}
          {/* Top-Left 4-Point Sparkle */}
          <g className="animate-sparkle-1" filter="url(#sparkleGlow)">
            <path
              d="M 140 112 Q 140 120 148 120 Q 140 120 140 128 Q 140 120 132 120 Q 140 120 140 112 Z"
              fill="#c084fc"
            />
          </g>

          {/* Top-Right 4-Point Sparkle */}
          <g className="animate-sparkle-2" filter="url(#sparkleGlow)">
            <path
              d="M 1260 172 Q 1260 180 1268 180 Q 1260 180 1260 188 Q 1260 180 1252 180 Q 1260 180 1260 172 Z"
              fill="#a855f7"
            />
          </g>

          {/* Bottom-Right 4-Point Sparkle */}
          <g className="animate-sparkle-3" filter="url(#sparkleGlow)">
            <path
              d="M 1320 752 Q 1320 760 1328 760 Q 1320 760 1320 768 Q 1320 760 1312 760 Q 1320 760 1320 752 Z"
              fill="#c084fc"
            />
          </g>

          {/* Bottom-Left 4-Point Sparkle */}
          <g className="animate-sparkle-4" filter="url(#sparkleGlow)">
            <path
              d="M 160 772 Q 160 780 168 780 Q 160 780 160 788 Q 160 780 152 780 Q 160 780 160 772 Z"
              fill="#60a5fa"
            />
          </g>

          {/* Micro Ambient Particles */}
          <circle cx="280" cy="90" r="1.5" fill="#e9d5ff" opacity="0.6" />
          <circle cx="450" cy="220" r="1.5" fill="#c084fc" opacity="0.5" />
          <circle cx="1150" cy="140" r="1.5" fill="#a855f7" opacity="0.5" />
          <circle cx="980" cy="800" r="1.5" fill="#818cf8" opacity="0.6" />
          <circle cx="1350" cy="680" r="1.5" fill="#e9d5ff" opacity="0.5" />
        </svg>
      </div>

      {/* ── Main Page Content Container ─────────────────────────────────────── */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
});

PageBackground.displayName = "PageBackground";

export default PageBackground;
