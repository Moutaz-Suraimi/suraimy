import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("suriix_theme");
      if (saved === "dark") {
        setIsDark(true);
        document.documentElement.classList.remove("light");
        document.documentElement.classList.add("dark");
      } else {
        setIsDark(false);
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
        if (!saved) localStorage.setItem("suriix_theme", "light");
      }
    } catch (e) {
      // Default to light theme in restricted environments
      setIsDark(false);
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  }, []);

  const toggle = () => {
    // Create a style element to disable all transitions temporarily
    const css = document.createElement('style');
    css.appendChild(
      document.createTextNode(
        `* {
          -webkit-transition: none !important;
          -moz-transition: none !important;
          -o-transition: none !important;
          -ms-transition: none !important;
          transition: none !important;
        }`
      )
    );
    document.head.appendChild(css);

    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      try {
        localStorage.setItem("suriix_theme", "dark");
      } catch (e) {}
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      try {
        localStorage.setItem("suriix_theme", "light");
      } catch (e) {}
    }

    // Force browser repaint before re-enabling transitions
    window.getComputedStyle(css).opacity;
    document.head.removeChild(css);
  };

  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.9 }}
      className="p-2.5 rounded-lg glass neon-border text-foreground hover:text-primary transition-colors"
      aria-label="Toggle theme"
    >
      <motion.div
        key={isDark ? "moon" : "sun"}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
