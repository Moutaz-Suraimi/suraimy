import { useState, useMemo, useEffect, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, SlidersHorizontal, X, ChevronDown,
  Grid3X3, Cpu, Briefcase, PlayCircle, Code2, Palette,
  MoreHorizontal, Calendar, User, TrendingUp, MessageCircle,
  Sun, Moon,
} from "lucide-react";

const WA_BASE = "https://wa.me/967780930635";

/* ─── Types ──────────────────────────────────────────────────────────────── */
type Lang = "ar" | "en" | "zh";

interface LangT {
  dir: "ltr" | "rtl";
  badge: string;
  headingMain: string;
  headingAccent: string;
  subheading: string;
  searchPlaceholder: string;
  available: string;
  contactPrice: string;
  orderWa: string;
  sortBy: string;
  sortPopular: string;
  sortNewest: string;
  foundCount: (n: number) => string;
  noResults: string;
  noResultsSub: string;
  ctaTitle: string;
  ctaDesc: string;
  ctaBtn: string;
  filters: string;
  clearFilters: string;
  filterCategory: string;
  filterDuration: string;
  filterPrice: string;
  filterAccount: string;
  allCategories: string;
  chooseDuration: string;
  anyPrice: string;
  chooseAccount: string;
  monthly: string;
  quarterly: string;
  semiYearly: string;
  yearly: string;
  duration: string;
  accountType: string;
  privateAccount: string;
  sharedAccount: string;
  darkMode: string;
  lightMode: string;
  cats: Record<string, string>;
}

/* ─── i18n ───────────────────────────────────────────────────────────────── */
const I18N: Record<Lang, LangT> = {
  ar: {
    dir: "rtl",
    badge: "اشتراكات رقمية موثوقة",
    headingMain: "اشتراكات",
    headingAccent: "رقمية",
    subheading: "اكتشف الخدمات والاشتراكات الرقمية التي تحتاجها،\nواطلب خدمتك بسهولة عبر واتساب.",
    searchPlaceholder: "ابحث عن اشتراك ... مثل ChatGPT أو Canva أو Microsoft Office",
    available: "متوفر",
    contactPrice: "تواصل لمعرفة السعر",
    orderWa: "اطلب عبر واتساب",
    sortBy: "ترتيب حسب:",
    sortPopular: "الأكثر شعبية",
    sortNewest: "الأحدث",
    foundCount: (n) => `تم العثور على ${n} اشتراك رقمي`,
    noResults: "لا توجد نتائج",
    noResultsSub: "جرب كلمة بحث مختلفة أو غيّر الفلاتر",
    ctaTitle: "هل تحتاج خدمة غير موجودة؟",
    ctaDesc: "تواصل معنا عبر واتساب وسنساعدك في الحصول على أي اشتراك رقمي تحتاجه بأفضل الأسعار.",
    ctaBtn: "تواصل معنا الآن",
    filters: "الفلاتر",
    clearFilters: "مسح الفلاتر",
    filterCategory: "التصنيف",
    filterDuration: "المدة",
    filterPrice: "السعر",
    filterAccount: "نوع الحساب",
    allCategories: "جميع التصنيفات",
    chooseDuration: "اختر المدة",
    anyPrice: "أي سعر",
    chooseAccount: "اختر نوع الحساب",
    monthly: "شهر",
    quarterly: "3 أشهر",
    semiYearly: "6 أشهر",
    yearly: "سنة",
    duration: "شهر / سنة",
    accountType: "حساب خاص",
    privateAccount: "حساب خاص",
    sharedAccount: "حساب مشترك",
    darkMode: "الوضع الداكن",
    lightMode: "الوضع الفاتح",
    cats: {
      "الكل": "الكل",
      "ذكاء اصطناعي": "الذكاء الاصطناعي",
      "إنتاجية ومكاتب": "الإنتاجية والمكاتب",
      "ترفيه ومشاهدة": "الترفيه والمشاهدة",
      "برمجة وتطوير": "البرمجة والتطوير",
      "تصميم وإبداع": "التصميم والإبداع",
      "تسويق رقمي": "تسويق رقمي",
      "خدمات أخرى": "خدمات أخرى",
    },
  },
  en: {
    dir: "ltr",
    badge: "Trusted Digital Subscriptions",
    headingMain: "Monthly",
    headingAccent: "Subscriptions",
    subheading: "Discover the digital services and subscriptions you need,\norder easily via WhatsApp.",
    searchPlaceholder: "Search ... e.g. ChatGPT, Canva, Microsoft Office",
    available: "Available",
    contactPrice: "Contact for price",
    orderWa: "Order via WhatsApp",
    sortBy: "Sort by:",
    sortPopular: "Most Popular",
    sortNewest: "Newest",
    foundCount: (n) => `Found ${n} digital subscription${n !== 1 ? "s" : ""}`,
    noResults: "No results found",
    noResultsSub: "Try a different search term or change the filters",
    ctaTitle: "Need a service not listed?",
    ctaDesc: "Contact us via WhatsApp and we'll help you get any digital subscription at the best prices.",
    ctaBtn: "Contact Us Now",
    filters: "Filters",
    clearFilters: "Clear Filters",
    filterCategory: "Category",
    filterDuration: "Duration",
    filterPrice: "Price",
    filterAccount: "Account Type",
    allCategories: "All Categories",
    chooseDuration: "Choose Duration",
    anyPrice: "Any Price",
    chooseAccount: "Choose Account Type",
    monthly: "Monthly",
    quarterly: "3 Months",
    semiYearly: "6 Months",
    yearly: "Yearly",
    duration: "Month / Year",
    accountType: "Private Account",
    privateAccount: "Private Account",
    sharedAccount: "Shared Account",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    cats: {
      "الكل": "All",
      "ذكاء اصطناعي": "AI Tools",
      "إنتاجية ومكاتب": "Productivity",
      "ترفيه ومشاهدة": "Entertainment",
      "برمجة وتطوير": "Dev & Code",
      "تصميم وإبداع": "Design",
      "تسويق رقمي": "Marketing",
      "خدمات أخرى": "Other",
    },
  },
  zh: {
    dir: "ltr",
    badge: "可信赖的数字订阅",
    headingMain: "每月",
    headingAccent: "订阅服务",
    subheading: "发现您需要的数字服务和订阅，\n通过WhatsApp轻松下单。",
    searchPlaceholder: "搜索订阅 ... 例如 ChatGPT、Canva、Office",
    available: "可用",
    contactPrice: "联系获取价格",
    orderWa: "通过WhatsApp订购",
    sortBy: "排序：",
    sortPopular: "最受欢迎",
    sortNewest: "最新",
    foundCount: (n) => `找到 ${n} 个数字订阅`,
    noResults: "未找到结果",
    noResultsSub: "请尝试不同的搜索词或更改筛选条件",
    ctaTitle: "需要未列出的服务？",
    ctaDesc: "通过WhatsApp联系我们，以最优惠的价格获取所需的任何数字订阅。",
    ctaBtn: "立即联系我们",
    filters: "筛选",
    clearFilters: "清除筛选",
    filterCategory: "类别",
    filterDuration: "时长",
    filterPrice: "价格",
    filterAccount: "账户类型",
    allCategories: "所有类别",
    chooseDuration: "选择时长",
    anyPrice: "任意价格",
    chooseAccount: "选择账户类型",
    monthly: "月付",
    quarterly: "3个月",
    semiYearly: "6个月",
    yearly: "年付",
    duration: "月 / 年",
    accountType: "私人账户",
    privateAccount: "私人账户",
    sharedAccount: "共享账户",
    darkMode: "暗黑模式",
    lightMode: "明亮模式",
    cats: {
      "الكل": "全部",
      "ذكاء اصطناعي": "人工智能",
      "إنتاجية ومكاتب": "生产力工具",
      "ترفيه ومشاهدة": "娱乐",
      "برمجة وتطوير": "开发编程",
      "تصميم وإبداع": "设计创意",
      "تسويق رقمي": "数字营销",
      "خدمات أخرى": "其他服务",
    },
  },
};

/* ─── Theme Toggle ───────────────────────────────────────────────────────── */
const ThemeToggleInline = ({ t }: { t: LangT }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("suriix_theme");
      setIsDark(saved === "dark");
    } catch (_) {
      setIsDark(false);
    }
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const toggle = useCallback(() => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
    try { localStorage.setItem("suriix_theme", next ? "dark" : "light"); } catch (_) {}
  }, [isDark]);

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.93 }}
      aria-label={isDark ? t.lightMode : t.darkMode}
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-semibold transition-all duration-300 cursor-pointer select-none
        bg-white/80 border-slate-200 text-slate-700 shadow-sm hover:border-purple-300 hover:text-purple-700
        dark:bg-white/5 dark:border-white/15 dark:text-white/85 dark:hover:border-purple-400/60 dark:hover:text-purple-300"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ rotate: -60, opacity: 0, scale: 0.7 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 60, opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.25 }}
          className="flex items-center"
        >
          {isDark
            ? <Sun className="w-4 h-4 text-amber-400" />
            : <Moon className="w-4 h-4 text-indigo-500" />}
        </motion.span>
      </AnimatePresence>
      <span>{isDark ? t.lightMode : t.darkMode}</span>
    </motion.button>
  );
};

/* ─── Language Switcher ──────────────────────────────────────────────────── */
const LangToggle = ({ lang, onChange }: { lang: string; onChange: (l: Lang) => void }) => {
  const opts: { key: Lang; label: string; flag: string }[] = [
    { key: "ar", label: "عربي", flag: "🇸🇦" },
    { key: "en", label: "EN",   flag: "🇬🇧" },
    { key: "zh", label: "中文", flag: "🇨🇳" },
  ];
  return (
    <div className="inline-flex items-center gap-0.5 p-1 rounded-full border border-border/40 bg-secondary/30 dark:bg-white/5 dark:border-white/10">
      {opts.map((o) => (
        <motion.button
          key={o.key}
          onClick={() => onChange(o.key)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 ${
            lang === o.key
              ? "bg-primary text-white shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <span>{o.flag}</span>
          <span>{o.label}</span>
        </motion.button>
      ))}
    </div>
  );
};

/* ─── Brand SVG Logos ────────────────────────────────────────────────────── */
const LOGOS: Record<string, JSX.Element> = {
  netflix: (
    <svg viewBox="0 0 111 30" xmlns="http://www.w3.org/2000/svg" className="w-14 h-8">
      <path d="M105.062 14.28L111 30c-1.75-.25-3.499-.563-5.28-.845l-3.345-8.686-3.437 7.969c-1.687-.282-3.344-.376-5.031-.595l6.218-14.280-5.75-14.562h5.188l3.067 8.25 3.157-8.25h5.281l-6.006 14.28zM80.907 0h4.937v24.44c1.657.094 3.312.188 4.938.344V0h4.937v29.349c-4.812-.313-9.656-.5-14.812-.5V0zm-10.5 9.875v5.125h6.343V20h-6.343V30h-4.938V5.001h12.03v4.875h-7.09zm-18.25-4.875V30h-4.937V5h-4.375V.001h13.687V5h-4.375zm-14.437 0h-5V30h5V5zm-7.344 0H24.688v4.875h5.125v5.125H24.69V30h-4.938V0h14.625v5zm-17.75 0v24.438C8.376 28.875 4.189 29 0 29V0h4.937v24.124c1.47.094 2.937.22 4.407.375V5H12.626z" fill="#E50914"/>
    </svg>
  ),
  chatgpt: (
    <svg viewBox="0 0 41 41" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <path d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835 9.964 9.964 0 0 0-6.371-2.825 10.079 10.079 0 0 0-9.63 6.988 9.967 9.967 0 0 0-6.67 4.818 10.079 10.079 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 6.371 2.825 10.079 10.079 0 0 0 9.63-6.988 9.967 9.967 0 0 0 6.67-4.818 10.079 10.079 0 0 0-1.24-11.817zm-14.223 19.569a7.474 7.474 0 0 1-4.801-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.487 7.05zM6.392 33.006a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103l-8.051 4.649a7.504 7.504 0 0 1-10.24-2.744zM4.297 13.62A7.469 7.469 0 0 1 8.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.012L7.044 23.86a7.504 7.504 0 0 1-2.747-10.24zm27.658 6.437l-9.724-5.615 3.367-1.943a.121.121 0 0 1 .114-.012l8.048 4.648a7.498 7.498 0 0 1-1.158 13.528v-9.476a1.293 1.293 0 0 0-.647-1.13zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.05-4.645a7.497 7.497 0 0 1 11.135 7.763zm-21.063 6.929l-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225zm1.829-3.943l4.33-2.501 4.332 2.497v4.998l-4.331 2.5-4.331-2.5V18z" fill="#10a37f"/>
    </svg>
  ),
  microsoft: (
    <svg viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <path fill="#f1511b" d="M11.077 0H0v11.077h11.077z"/>
      <path fill="#80cc28" d="M23 0H11.923v11.077H23z"/>
      <path fill="#00adef" d="M11.077 11.923H0V23h11.077z"/>
      <path fill="#fbbc09" d="M23 11.923H11.923V23H23z"/>
    </svg>
  ),
  canva: (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <circle cx="16" cy="16" r="16" fill="#00C4CC"/>
      <path d="M22.1 11.9c-.9-1.7-2.7-2.9-4.7-2.9-3 0-5.4 2.4-5.4 5.4 0 .3 0 .6.1.9-.3-.1-.5-.1-.8-.1-1.5 0-2.7 1.2-2.7 2.7s1.2 2.7 2.7 2.7c.2 0 .4 0 .6-.1.7 1.2 2 2 3.5 2 2.2 0 4-1.8 4-4 0-.5-.1-.9-.2-1.4.6.5 1.3.8 2.1.8 1.8 0 3.2-1.4 3.2-3.2.1-1.3-.8-2.4-2.4-2.8z" fill="white"/>
    </svg>
  ),
  adobe: (
    <svg viewBox="0 0 240 234" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <path d="M42.5 0h155C221 0 240 19 240 42.5v149c0 23.5-19 42.5-42.5 42.5h-155C19 234 0 215 0 191.5v-149C0 19 19 0 42.5 0z" fill="#EB1000"/>
      <path d="M133 30h55l-82 174h-42l22-46H55l-22-128h43l14 95 43-95z" fill="white"/>
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" fill="#24292e"/>
    </svg>
  ),
  figma: (
    <svg viewBox="0 0 38 57" xmlns="http://www.w3.org/2000/svg" className="w-7 h-10">
      <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1abcfe"/>
      <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z" fill="#0acf83"/>
      <path d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19z" fill="#ff7262"/>
      <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#f24e1e"/>
      <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#a259ff"/>
    </svg>
  ),
  spotify: (
    <svg viewBox="0 0 168 168" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <path fill="#1ED760" d="M84 0C37.6 0 0 37.6 0 84s37.6 84 84 84 84-37.6 84-84S130.4 0 84 0zm38.6 121.2c-1.5 2.4-4.7 3.2-7.1 1.7-19.4-11.9-43.8-14.5-72.6-8-2.8.6-5.5-1.1-6.1-3.9-.6-2.8 1.1-5.5 3.9-6.1 31.5-7.2 58.5-4.1 80.3 9.2 2.4 1.5 3.2 4.7 1.6 7.1zm10.3-22.9c-1.9 3-5.9 4-8.9 2.1-22.2-13.7-56.1-17.6-82.3-9.6-3.3 1-6.8-.9-7.8-4.2-1-3.3.9-6.8 4.2-7.8 30.1-9.1 67.5-4.7 93 11 3 1.9 4 5.9 1.8 8.5zM35.9 67.9c-3.9 0-7.1-3.2-7.1-7.1s3.2-7.1 7.1-7.1 7.1 3.2 7.1 7.1-3.2 7.1-7.1 7.1zm92.4 3.1c-3.1 0-5.7-2.5-5.7-5.7 0-3.1 2.5-5.7 5.7-5.7s5.7 2.5 5.7 5.7c0 3.1-2.5 5.7-5.7 5.7zm-24.8-7.7c-27.8-16.5-73.7-18-100.3-9.9-4.3 1.3-8.8-1.1-10.1-5.4-1.3-4.3 1.1-8.8 5.4-10.1C28.4 28.8 79.4 31.8 111 50.6c3.8 2.3 5.1 7.2 2.8 11-2.2 3.8-7.2 5.1-11 2.7z"/>
    </svg>
  ),
  notion: (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <rect width="100" height="100" rx="14" fill="white"/>
      <path d="M6.6 7.9c2.7 2.2 3.7 2 8.7 1.7L87 5.9c1.1 0 .1-1.1-.3-1.3l-11.9-8.6C72.5-5.5 71.2-5.1 64.7-4.4L5.7.6C3.3.9 2.8 2.1 3.7 3L6.6 7.9z" fill="#000" transform="translate(5 15) scale(0.9)"/>
      <path d="M9.5 18.2v66.4c0 3.6 1.8 4.9 5.9 4.7l77.9-4.5c4.1-.2 5.1-2.7 5.1-5.9V13c0-3.2-1.3-4.9-4.2-4.6l-80.4 4.7c-3.1.2-4.3 1.8-4.3 5.1z" fill="white" stroke="#000" strokeWidth="2" transform="translate(0 5)"/>
      <path d="M60 25L33 28v4l5 1v30l-5 2v4l18-1v-4l-5-2V35l17 28h7V29l5-1v-4z" fill="#000"/>
    </svg>
  ),
  semrush: (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <rect width="200" height="200" rx="30" fill="#FF642D"/>
      <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fontSize="120" fontWeight="900" fontFamily="Arial Black,sans-serif" fill="white">S</text>
    </svg>
  ),
  dropbox: (
    <svg viewBox="0 0 43 40" xmlns="http://www.w3.org/2000/svg" className="w-11 h-10">
      <path d="M12.5 0L0 8.3l8.6 6.9 12.5-7.9L12.5 0zm18 0l-8.6 7.3 12.5 7.9 8.6-6.9L30.5 0zm-18 22.5L0 31l12.5 7.5 9-6.2v-.1l9 6.3L43 31l-12.5-8.5-9 6.2-9-6.2zm18 0L21.1 29l9 6.2L42.5 31l-12-8.5z" fill="#0061FF"/>
    </svg>
  ),
  midjourney: (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <rect width="200" height="200" rx="30" fill="#1a1a2e"/>
      <path d="M100 30 L160 140 H40 Z" fill="none" stroke="white" strokeWidth="8" strokeLinejoin="round"/>
      <path d="M60 140 L100 80 L140 140" fill="none" stroke="white" strokeWidth="6" strokeLinejoin="round" opacity="0.6"/>
      <circle cx="100" cy="158" r="8" fill="white"/>
    </svg>
  ),
  grammarly: (
    <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <circle cx="25" cy="25" r="25" fill="#15C39A"/>
      <path d="M25 10a15 15 0 0 0 0 30 15.3 15.3 0 0 0 9-2.9l-3.1-3.2A10.5 10.5 0 0 1 25 35a10 10 0 1 1 10-10v2h-10v4h14.6A15 15 0 0 0 25 10z" fill="white"/>
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 228 160" xmlns="http://www.w3.org/2000/svg" className="w-14 h-10">
      <path d="M223.1 25.2c-2.6-9.8-10.3-17.5-20.1-20.1C185 0 114 0 114 0S43 0 25 5.1C15.2 7.7 7.5 15.4 4.9 25.2 0 43.2 0 80 0 80s0 36.8 4.9 54.8c2.6 9.8 10.3 17.5 20.1 20.1C43 160 114 160 114 160s71 0 89-5.1c9.8-2.6 17.5-10.3 20.1-20.1C228 116.8 228 80 228 80s0-36.8-4.9-54.8z" fill="#FF0000"/>
      <path d="M91 114.3V45.7L150.2 80z" fill="white"/>
    </svg>
  ),
  envato: (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <rect width="200" height="200" rx="30" fill="#81B441"/>
      <path d="M100 30L40 170h50l10-25h50l-10-25H100l20-50 30 75h-15l5 25h35L100 30z" fill="white"/>
    </svg>
  ),
  claude: (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <rect width="200" height="200" rx="30" fill="#D97706"/>
      <path d="M100 35 C65 35 40 60 40 95 C40 118 53 138 72 148 L72 165 L88 155 C91.5 156 95.7 157 100 157 C135 157 160 132 160 97 C160 62 135 35 100 35 Z" fill="white" opacity="0.95"/>
      <circle cx="78" cy="97" r="8" fill="#D97706"/>
      <circle cx="100" cy="97" r="8" fill="#D97706"/>
      <circle cx="122" cy="97" r="8" fill="#D97706"/>
    </svg>
  ),
};

/* ─── Logo renderer ──────────────────────────────────────────────────────── */
const LogoImg = ({ id, name, color }: { id: string; name: string; color: string }) => {
  const svg = LOGOS[id];
  if (svg) return <div className="w-12 h-12 flex items-center justify-center">{svg}</div>;
  return (
    <div
      className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-xl shrink-0"
      style={{ background: color }}
    >
      {name[0]}
    </div>
  );
};

/* ─── Subscription data ─────────────────────────────────────────────────── */
interface Sub {
  id: string; name: string;
  desc: { ar: string; en: string; zh: string };
  logo: string; color: string; category: string;
  duration: string; accountType: string;
  popular?: boolean; price?: string;
}

const SUBS: Sub[] = [
  {
    id: "netflix", name: "Netflix", popular: true, color: "#e50914",
    desc: {
      ar: "استمتع بمشاهدة أحدث الأفلام والمسلسلات بدون إعلانات وجودة عالية.",
      en: "Enjoy the latest movies and series without ads in stunning high quality.",
      zh: "享受观看最新电影和剧集，无广告，高清画质体验。",
    },
    logo: "", category: "ترفيه ومشاهدة", duration: "شهر,3 أشهر,6 أشهر,سنة", accountType: "حساب خاص",
  },
  {
    id: "chatgpt", name: "ChatGPT Plus", popular: true, color: "#10a37f",
    desc: {
      ar: "الوصول إلى أحدث نموذج GPT-4 مع ميزات إضافية وأداء أعلى.",
      en: "Access the latest GPT-4 model with advanced features and higher performance.",
      zh: "访问最新的GPT-4模型，具备更多高级功能和卓越性能。",
    },
    logo: "", category: "ذكاء اصطناعي", duration: "شهر / سنة", accountType: "حساب خاص",
    price: "$20.00 شهرياً",
  },
  {
    id: "microsoft", name: "Microsoft 365", popular: true, color: "#0078d4",
    desc: {
      ar: "أدوات المكتب الكاملة لزيادة إنتاجيتك وتنظيم أعمالك.",
      en: "Complete office tools to boost your productivity and organize your work.",
      zh: "完整的办公工具套件，全面提升您的工作效率和组织能力。",
    },
    logo: "", category: "إنتاجية ومكاتب", duration: "شهر / سنة", accountType: "حساب خاص",
    price: "$9.99 شهرياً",
  },
  {
    id: "canva", name: "Canva Pro", popular: true, color: "#00c4cc",
    desc: {
      ar: "تصميم احترافي سهل وسريع لتصاميمك ووسائل التواصل الاجتماعي.",
      en: "Easy and fast professional design for your projects and social media content.",
      zh: "简单快速的专业设计工具，完美适合社交媒体内容创作。",
    },
    logo: "", category: "تصميم وإبداع", duration: "شهر / سنة", accountType: "حساب خاص",
    price: "$12.99 شهرياً",
  },
  {
    id: "adobe", name: "Adobe Creative Cloud", color: "#ff0000",
    desc: {
      ar: "جميع برامج أدوبي للمصممين والمطورين في اشتراك واحد بلا حدود.",
      en: "All Adobe apps for designers and developers in one unlimited subscription.",
      zh: "所有Adobe应用程序，为设计师和开发者提供的一站式无限订阅。",
    },
    logo: "", category: "تصميم وإبداع", duration: "شهر / سنة", accountType: "حساب خاص",
  },
  {
    id: "github", name: "GitHub Pro", color: "#24292e",
    desc: {
      ar: "أدوات متقدمة للمطورين وإدارة المشاريع البرمجية الاحترافية.",
      en: "Advanced developer tools and professional code project management.",
      zh: "高级开发者工具，支持专业代码项目管理与协作。",
    },
    logo: "", category: "برمجة وتطوير", duration: "شهر / سنة", accountType: "حساب خاص",
    price: "$4.00 شهرياً",
  },
  {
    id: "figma", name: "Figma Pro", color: "#f24e1e",
    desc: {
      ar: "أدوات تصميم وتعاون احترافية بمزايا تفاعلية فريدة.",
      en: "Professional design and collaboration tools with unique interactive features.",
      zh: "专业设计与团队协作工具，具有独特的交互功能。",
    },
    logo: "", category: "تصميم وإبداع", duration: "شهر / سنة", accountType: "حساب خاص",
    price: "$12.00 شهرياً",
  },
  {
    id: "spotify", name: "Spotify Premium", color: "#1db954",
    desc: {
      ar: "استمع بالموسيقى والبودكاست بدون إعلانات وبجودة صوت عالية.",
      en: "Listen to music and podcasts without ads in high audio quality.",
      zh: "无广告收听音乐和播客，享受卓越音质体验。",
    },
    logo: "", category: "ترفيه ومشاهدة", duration: "شهر / سنة", accountType: "حساب خاص",
  },
  {
    id: "notion", name: "Notion Pro", color: "#000000",
    desc: {
      ar: "منصة الإنتاجية المتكاملة لتنظيم فريق العمل والمشاريع.",
      en: "The all-in-one productivity platform to organize your team and projects.",
      zh: "一体化生产力平台，轻松管理团队和项目进度。",
    },
    logo: "", category: "إنتاجية ومكاتب", duration: "شهر / سنة", accountType: "حساب خاص",
  },
  {
    id: "semrush", name: "SEMrush", color: "#ff642d",
    desc: {
      ar: "أداة تحليل السيو والتسويق الرقمي الرائدة عالمياً.",
      en: "The world-leading SEO analysis and digital marketing platform.",
      zh: "全球领先的SEO分析和数字营销工具平台。",
    },
    logo: "", category: "تسويق رقمي", duration: "شهر / سنة", accountType: "حساب خاص",
  },
  {
    id: "dropbox", name: "Dropbox Plus", color: "#0061ff",
    desc: {
      ar: "تخزين سحابي آمن ومشاركة ملفات سريعة لفريق عملك.",
      en: "Secure cloud storage and fast file sharing for your team.",
      zh: "安全云存储和快速文件共享，专为团队协作设计。",
    },
    logo: "", category: "إنتاجية ومكاتب", duration: "شهر / سنة", accountType: "حساب خاص",
  },
  {
    id: "midjourney", name: "Midjourney", color: "#000000",
    desc: {
      ar: "إنشاء صور فنية احترافية بالذكاء الاصطناعي بجودة استثنائية.",
      en: "Create professional AI-generated artwork with exceptional quality.",
      zh: "使用人工智能创作专业艺术作品，品质卓越无比。",
    },
    logo: "", category: "ذكاء اصطناعي", duration: "شهر / سنة", accountType: "حساب خاص",
  },
  {
    id: "grammarly", name: "Grammarly Premium", color: "#15c39a",
    desc: {
      ar: "تصحيح وتحسين كتاباتك بالذكاء الاصطناعي للمحترفين.",
      en: "AI-powered writing correction and enhancement for professionals.",
      zh: "面向专业人士的AI智能写作纠正和提升工具。",
    },
    logo: "", category: "ذكاء اصطناعي", duration: "شهر / سنة", accountType: "حساب خاص",
  },
  {
    id: "youtube", name: "YouTube Premium", color: "#ff0000",
    desc: {
      ar: "شاهد يوتيوب بدون إعلانات مع تشغيل الفيديو في الخلفية.",
      en: "Watch YouTube without ads with background video playback support.",
      zh: "无广告观看YouTube，支持后台播放视频。",
    },
    logo: "", category: "ترفيه ومشاهدة", duration: "شهر / سنة", accountType: "حساب خاص",
  },
  {
    id: "envato", name: "Envato Elements", color: "#81b441",
    desc: {
      ar: "ملايين الأصول الإبداعية للتصميم والبرمجة بلا حقوق ملكية.",
      en: "Millions of creative assets for design and development, royalty-free.",
      zh: "数百万创意资产，设计和开发免版权商业使用。",
    },
    logo: "", category: "تصميم وإبداع", duration: "شهر / سنة", accountType: "حساب خاص",
  },
  {
    id: "claude", name: "Claude Pro", color: "#d97706",
    desc: {
      ar: "مساعد الذكاء الاصطناعي المتقدم من Anthropic للكتابة والتحليل.",
      en: "Anthropic's advanced AI assistant for writing, analysis, and coding.",
      zh: "Anthropic的高级AI助手，专注写作、分析和编程辅助。",
    },
    logo: "", category: "ذكاء اصطناعي", duration: "شهر / سنة", accountType: "حساب خاص",
  },
];

/* ─── Category tabs ──────────────────────────────────────────────────────── */
const CATS = [
  { key: "الكل",            icon: Grid3X3 },
  { key: "ذكاء اصطناعي",   icon: Cpu },
  { key: "إنتاجية ومكاتب", icon: Briefcase },
  { key: "ترفيه ومشاهدة",  icon: PlayCircle },
  { key: "برمجة وتطوير",   icon: Code2 },
  { key: "تصميم وإبداع",   icon: Palette },
  { key: "تسويق رقمي",     icon: TrendingUp },
  { key: "خدمات أخرى",     icon: MoreHorizontal },
];

/* ─── Card ───────────────────────────────────────────────────────────────── */
const SubCard = ({ sub, t, lang }: { sub: Sub; t: LangT; lang: Lang }) => {
  const waMsg = `${WA_BASE}?text=${encodeURIComponent(`مرحباً، أريد الاشتراك في ${sub.name} — عبر موقع Suriix`)}`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col rounded-2xl border border-border/50 bg-card overflow-hidden shadow-sm hover:shadow-lg hover:border-primary/30 hover:shadow-primary/5 transition-all duration-300 group"
    >
      {/* Top */}
      <div className="relative flex flex-col items-center pt-6 pb-4 px-4 bg-gradient-to-b from-secondary/40 to-transparent">
        <span
          className={`absolute top-3 start-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white shadow-sm ${
            sub.popular ? "bg-gradient-to-r from-purple-600 to-indigo-500" : "bg-muted-foreground/50"
          }`}
        >
          {t.available}
        </span>
        <div className="w-[76px] h-[76px] rounded-2xl bg-white dark:bg-white flex items-center justify-center shadow-md overflow-hidden border border-border/20 mb-3">
          <LogoImg id={sub.id} name={sub.name} color={sub.color} />
        </div>
        <h3 className="font-bold text-base text-foreground text-center leading-tight">{sub.name}</h3>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 px-4 pb-4 gap-3">
        <p className="text-muted-foreground text-xs leading-relaxed">{sub.desc[lang]}</p>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-primary/60" />{t.duration}
          </span>
          <span className="flex items-center gap-1">
            <User className="w-3 h-3 text-primary/60" />{t.accountType}
          </span>
        </div>

        <div className="h-px bg-border/40" />

        <div className="flex items-center gap-1.5">
          <MessageCircle className="w-3.5 h-3.5 text-primary/70 shrink-0" />
          {sub.price
            ? <span className="font-bold text-sm text-foreground">{sub.price}</span>
            : <span className="text-sm font-semibold text-primary">{t.contactPrice}</span>
          }
        </div>

        <a
          href={waMsg}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] shadow-sm"
          style={{ background: "linear-gradient(135deg,#25d366,#128c7e)" }}
        >
          <WaIcon />
          {t.orderWa}
        </a>
      </div>
    </motion.div>
  );
};

/* WhatsApp SVG */
const WaIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="white" className="shrink-0">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.845L0 24l6.336-1.507A11.956 11.956 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.367l-.36-.213-3.724.886.902-3.626-.235-.373A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z"/>
  </svg>
);

/* ─── Filter Select — dark mode fixed ───────────────────────────────────── */
const FltSelect = ({
  label, value, onChange, options, defaultLabel,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  defaultLabel: string;
}) => (
  <div className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/40 bg-secondary/30 dark:bg-slate-800 dark:border-slate-600 text-xs cursor-pointer">
    <span className="text-muted-foreground/60 dark:text-slate-400 shrink-0">{label}:</span>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="appearance-none bg-transparent text-foreground dark:text-slate-100 pe-5 outline-none cursor-pointer text-xs"
    >
      <option value="" style={{ background: "var(--select-bg, #1e293b)", color: "var(--select-text, #f1f5f9)" }}>
        {defaultLabel}
      </option>
      {options.map((o) => (
        <option
          key={o.value}
          value={o.value}
          style={{ background: "var(--select-bg, #1e293b)", color: "var(--select-text, #f1f5f9)" }}
        >
          {o.label}
        </option>
      ))}
    </select>
    <ChevronDown className="absolute start-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground/50 dark:text-slate-400 pointer-events-none" />
  </div>
);

/* ─── Main Component ─────────────────────────────────────────────────────── */
interface Props { lang?: string; } // kept for backward compat, not used internally

const SubscriptionsSection: React.FC<Props> = () => {
  // ✅ Read lang directly from global context — stays in sync with Navbar switcher
  const { lang: ctxLang, setLang: ctxSetLang } = useLanguage();
  const lang = (ctxLang as Lang) in I18N ? (ctxLang as Lang) : "ar";
  const setLang = (l: Lang) => ctxSetLang(l as Parameters<typeof ctxSetLang>[0]);

  const t                             = I18N[lang];
  const [search, setSearch]           = useState("");
  const [activeTab, setActiveTab]     = useState("الكل");
  const [filterDuration, setDuration] = useState("الكل");
  const [filterAccount, setAccount]   = useState("الكل");
  const [sortBy, setSort]             = useState<"popular" | "newest">("popular");

  // Reset search on lang change
  useEffect(() => { setSearch(""); }, [lang]);

  const filtered = useMemo(() => {
    let list = SUBS.filter((s) => {
      const matchCat = activeTab === "الكل" || s.category === activeTab;
      const q = search.toLowerCase();
      const matchQ =
        s.name.toLowerCase().includes(q) ||
        s.desc.ar.includes(search) ||
        s.desc.en.toLowerCase().includes(q) ||
        s.desc.zh.includes(search);
      const matchDur = filterDuration === "الكل" || s.duration.split(",").includes(filterDuration);
      const matchAcc = filterAccount === "الكل" || s.accountType === filterAccount;
      return matchCat && matchQ && matchDur && matchAcc;
    });
    if (sortBy === "popular") list = [...list].sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
    return list;
  }, [search, activeTab, filterDuration, filterAccount, sortBy]);

  const hasFilters = activeTab !== "الكل" || filterDuration !== "الكل" || filterAccount !== "الكل" || !!search;
  const heroLogos  = SUBS.slice(0, 5);

  return (
    <section
      id="subscriptions"
      dir={t.dir}
      className="relative min-h-screen overflow-hidden bg-background"
      style={{
        /* CSS vars for native select option colors */
        ["--select-bg" as string]: "#1e293b",
        ["--select-text" as string]: "#f1f5f9",
      } as React.CSSProperties}
    >
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[140px] bg-primary/10 dark:bg-primary/20 animate-glow-pulse" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[120px] bg-accent/8 dark:bg-accent/15" />
      </div>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <div className="relative px-4 sm:px-8 pt-28 pb-14 max-w-7xl mx-auto">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12">

          {/* Phone mockup — 3D styled */}
          <motion.div
            initial={{ opacity: 0, x: -40, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative shrink-0 hidden lg:block select-none pe-8"
          >
            {/* Ambient glow */}
            <div className="absolute -inset-10 rounded-full bg-purple-600/20 blur-[60px] pointer-events-none" />
            <div className="absolute -inset-6 rounded-full bg-blue-500/10 blur-[40px] pointer-events-none" />

            {/* Rotating ring */}
            <div
              className="absolute -inset-6 rounded-[3.5rem] border border-purple-400/20 animate-spin pointer-events-none"
              style={{ animationDuration: "30s" }}
            />

            {/* Phone shell */}
            <div
              className="relative w-[220px] h-[420px] rounded-[3rem] overflow-hidden"
              style={{
                transform: "perspective(1100px) rotateY(14deg) rotateX(-5deg)",
                background: "linear-gradient(160deg, #1a0533 0%, #0d0620 50%, #0a0318 100%)",
                boxShadow:
                  "0 0 0 1.5px rgba(147,51,234,0.5), 0 0 40px rgba(147,51,234,0.35), 0 30px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              {/* Top rim highlight */}
              <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-300/60 to-transparent" />
              {/* Notch */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-4 rounded-full bg-black/80" />
              {/* Inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-blue-900/20 pointer-events-none" />

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap"
              >
                <span
                  className="text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                  style={{
                    background: "rgba(147,51,234,0.25)",
                    border: "1px solid rgba(167,139,250,0.4)",
                    color: "#c4b5fd",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {t.badge}
                </span>
              </motion.div>

              {/* App Icons 2×3 grid */}
              <div className="absolute top-24 left-4 right-4 grid grid-cols-2 gap-3">
                {heroLogos.map((s, i) => (
                  <motion.div
                    key={s.id}
                    animate={{ y: [0, i % 2 === 0 ? -6 : -4, 0] }}
                    transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
                    className="aspect-square rounded-2xl flex items-center justify-center overflow-hidden"
                    style={{
                      background:
                        s.id === "chatgpt"   ? "linear-gradient(135deg,#0d9f6e,#065f46)" :
                        s.id === "microsoft" ? "linear-gradient(135deg,#ffffff,#e8e8e8)" :
                        s.id === "canva"     ? "linear-gradient(135deg,#1da1f2,#0078d4)" :
                        s.id === "netflix"   ? "linear-gradient(135deg,#141414,#1a1a1a)" :
                        s.id === "adobe"     ? "linear-gradient(135deg,#eb1000,#a00000)" :
                        "linear-gradient(135deg,#374151,#1f2937)",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)",
                    }}
                  >
                    {LOGOS[s.id]
                      ? <div className="flex items-center justify-center" style={{ transform: "scale(0.72)" }}>{LOGOS[s.id]}</div>
                      : (
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-lg"
                          style={{ background: s.color }}
                        >
                          {s.name[0]}
                        </div>
                      )
                    }
                  </motion.div>
                ))}
              </div>

              {/* Bottom bars */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col gap-1.5 items-center">
                <div className="w-20 h-[2px] rounded-full bg-white/15" />
                <div className="w-12 h-[2px] rounded-full bg-white/10" />
              </div>

              {/* Bottom gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a0318] to-transparent pointer-events-none" />
              {/* Side reflection */}
              <div className="absolute inset-y-0 right-0 w-[3px] bg-gradient-to-b from-purple-400/30 via-transparent to-purple-400/10" />
            </div>

          </motion.div>

          {/* Text + Search */}
          <motion.div
            initial={{ opacity: 0, x: t.dir === "rtl" ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1 text-start"
          >


            <h1 className="text-5xl sm:text-6xl font-black text-foreground leading-tight mb-4">
              {t.headingMain}{" "}
              <span className="gradient-text">{t.headingAccent}</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-lg leading-relaxed" style={{ whiteSpace: "pre-line" }}>
              {t.subheading}
            </p>

            {/* Search */}
            <div className="relative max-w-xl">
              <Search className={`absolute top-1/2 -translate-y-1/2 ${t.dir === "rtl" ? "end-4" : "start-4"} w-5 h-5 text-muted-foreground/50`} />
              <input
                type="text"
                dir={t.dir}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t.searchPlaceholder}
                className={`w-full ${t.dir === "rtl" ? "pe-12 ps-5" : "ps-12 pe-5"} py-4 rounded-2xl text-sm text-foreground placeholder-muted-foreground/40 bg-secondary/50 border border-border/50 outline-none focus:border-primary/50 focus:bg-secondary/80 transition-all duration-200`}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className={`absolute top-1/2 -translate-y-1/2 ${t.dir === "rtl" ? "start-4" : "end-4"}`}
                >
                  <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── CATEGORY TABS ────────────────────────────────────────── */}
      <div className="sticky top-[72px] z-30 border-b border-border/30 px-4 sm:px-8 py-3 bg-background/95 backdrop-blur-lg overflow-x-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 w-max">
            {CATS.map((cat) => {
              const Icon    = cat.icon;
              const active  = activeTab === cat.key;
              const catLabel = t.cats[cat.key] ?? cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveTab(cat.key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 border ${
                    active
                      ? "gradient-purple text-white border-transparent shadow-md"
                      : "text-muted-foreground border-border/40 hover:border-primary/30 hover:text-foreground bg-transparent"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {catLabel}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── FILTER BAR ───────────────────────────────────────────── */}
      <div className="border-b border-border/20 px-4 sm:px-8 py-2.5 bg-secondary/20">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-semibold shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5" /> {t.filters}
          </span>
          <div className="h-4 w-px bg-border/50" />

          {/* Category filter */}
          <FltSelect
            label={t.filterCategory}
            value={activeTab === "الكل" ? "" : activeTab}
            onChange={(v) => setActiveTab(v || "الكل")}
            defaultLabel={t.allCategories}
            options={CATS.filter((c) => c.key !== "الكل").map((c) => ({
              value: c.key,
              label: t.cats[c.key] ?? c.key,
            }))}
          />

          {/* Duration filter */}
          <FltSelect
            label={t.filterDuration}
            value={filterDuration === "الكل" ? "" : filterDuration}
            onChange={(v) => setDuration(v || "الكل")}
            defaultLabel={t.chooseDuration}
            options={[
              { value: "شهر",     label: t.monthly },
              { value: "3 أشهر", label: t.quarterly },
              { value: "6 أشهر", label: t.semiYearly },
              { value: "سنة",     label: t.yearly },
            ]}
          />

          {/* Price (decorative) */}
          <FltSelect
            label={t.filterPrice}
            value=""
            onChange={() => {}}
            defaultLabel={t.anyPrice}
            options={[]}
          />

          {/* Account type filter */}
          <FltSelect
            label={t.filterAccount}
            value={filterAccount === "الكل" ? "" : filterAccount}
            onChange={(v) => setAccount(v || "الكل")}
            defaultLabel={t.chooseAccount}
            options={[
              { value: "حساب خاص",   label: t.privateAccount },
              { value: "حساب مشترك", label: t.sharedAccount },
            ]}
          />

          {/* Clear */}
          {hasFilters && (
            <button
              onClick={() => { setSearch(""); setActiveTab("الكل"); setDuration("الكل"); setAccount("الكل"); }}
              className="flex items-center gap-1 text-xs text-red-500 dark:text-red-400 border border-red-300/40 dark:border-red-500/25 hover:border-red-400 px-2.5 py-1.5 rounded-lg transition-all"
            >
              <X className="w-3 h-3" /> {t.clearFilters}
            </button>
          )}
        </div>
      </div>

      {/* ── SORT + COUNT ──────────────────────────────────────────── */}
      <div className="border-b border-border/10 px-4 sm:px-8 py-2.5 bg-background/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{t.sortBy}</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSort(e.target.value as "popular" | "newest")}
                className="appearance-none ps-3 pe-6 py-1.5 rounded-lg text-xs bg-secondary/60 dark:bg-slate-800 border border-border/40 dark:border-slate-600 text-foreground dark:text-slate-100 outline-none cursor-pointer"
              >
                <option value="popular" style={{ background: "#1e293b", color: "#f1f5f9" }}>{t.sortPopular}</option>
                <option value="newest" style={{ background: "#1e293b", color: "#f1f5f9" }}>{t.sortNewest}</option>
              </select>
              <ChevronDown className="absolute top-1/2 -translate-y-1/2 start-1 w-3 h-3 text-muted-foreground pointer-events-none" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            <span className="text-primary font-bold">{filtered.length}</span>
            {" "}{lang === "ar" ? "اشتراك رقمي متاح" : lang === "zh" ? "个数字订阅" : `digital subscription${filtered.length !== 1 ? "s" : ""} found`}
          </p>
        </div>
      </div>

      {/* ── GRID ─────────────────────────────────────────────────── */}
      <div className="px-4 sm:px-8 py-10 max-w-7xl mx-auto relative z-10">
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((sub) => <SubCard key={sub.id} sub={sub} t={t} lang={lang} />)}
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24 text-muted-foreground">
              <Search className="w-10 h-10 mx-auto mb-3 opacity-20" />
              <p className="font-semibold">{t.noResults}</p>
              <p className="text-sm mt-1 opacity-60">{t.noResultsSub}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── BOTTOM CTA ───────────────────────────────────────────── */}
      <div className="px-4 sm:px-8 pb-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`neon-border rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-primary/5 dark:bg-primary/10 ${t.dir === "rtl" ? "text-end md:text-start" : "text-start"}`}
        >
          <div>
            <h3 className="text-xl font-black text-foreground mb-2">{t.ctaTitle}</h3>
            <p className="text-muted-foreground text-sm max-w-md">{t.ctaDesc}</p>
          </div>
          <a
            href={WA_BASE}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-2 px-7 py-3.5 rounded-2xl text-white font-bold text-sm gradient-purple shadow-lg hover:scale-105 hover:opacity-90 transition-all duration-300"
          >
            <MessageCircle className="w-4 h-4" />
            {t.ctaBtn}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default SubscriptionsSection;
