import React, { useState, useMemo, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, SlidersHorizontal, X, ChevronDown,
  Grid3X3, Cpu, Briefcase, PlayCircle, Code2, Palette,
  MoreHorizontal, Calendar, TrendingUp, MessageCircle,
  Sparkles, ShieldCheck, Zap, ArrowUpDown, Check, Info
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
  searchQuick: string;
  available: string;
  popularBadge: string;
  instantDelivery: string;
  contactPrice: string;
  orderWa: string;
  sortBy: string;
  sortPopular: string;
  sortNewest: string;
  foundCount: (n: number) => string;
  noResults: string;
  noResultsSub: string;
  resetFilters: string;
  ctaTitle: string;
  ctaDesc: string;
  ctaBtn: string;
  filters: string;
  clearFilters: string;
  filterDuration: string;
  filterAccount: string;
  allDurations: string;
  allAccounts: string;
  monthly: string;
  yearly: string;
  duration: string;
  accountType: string;
  privateAccount: string;
  sharedAccount: string;
  toolBenefitsTitle: string;
  viewBenefits: string;
  orderViaWhatsApp: string;
  instantDeliveryText: string;
  modalClose: string;
  cats: Record<string, string>;
}

/* ─── i18n ───────────────────────────────────────────────────────────────── */
const I18N: Record<Lang, LangT> = {
  ar: {
    dir: "rtl",
    badge: "اشتراكات رقمية موثوقة ومضمونة 100%",
    headingMain: "اشتراكات",
    headingAccent: "رقمية أصلية",
    subheading: "احصل على أفضل الاشتراكات الرقمية وأدوات الذكاء الاصطناعي والتصميم والترفيه بأفضل الأسعار مع تفعيل فوري وضمان كامل.",
    searchPlaceholder: "ابحث عن اشتراك ... مثل ChatGPT، Gemini، Disney+، Steam، Canva",
    searchQuick: "عمليات بحث شائعة:",
    available: "متوفر فوراً",
    popularBadge: "الأكثر طلباً",
    instantDelivery: "تفعيل فوري",
    contactPrice: "تواصل لمعرفة السعر",
    orderWa: "اطلب الآن عبر واتساب",
    sortBy: "ترتيب حسب:",
    sortPopular: "الأكثر طلباً",
    sortNewest: "الأحدث",
    foundCount: (n) => `تم العثور على ${n} اشتراك متاح`,
    noResults: "لم يتم العثور على نتائج مطابقة",
    noResultsSub: "جرب البحث بكلمة مختلفة أو قم بإعادة تعيين الفلاتر لعرض كافة الاشتراكات.",
    resetFilters: "إعادة ضبط الفلاتر",
    ctaTitle: "هل تبحث عن اشتراك أو خدمة غير معروضة؟",
    ctaDesc: "فريق Suriix جاهز لتوفير أي اشتراك أو أداة برمجية مخصصة تحتاجها بأفضل سعر وضمان كامل.",
    ctaBtn: "تواصل معنا مباشرة",
    filters: "تصفية سريعة",
    clearFilters: "مسح الفلاتر",
    filterDuration: "المدة",
    filterAccount: "نوع الحساب",
    allDurations: "جميع المدد",
    allAccounts: "جميع الحسابات",
    monthly: "شهري",
    yearly: "سنوي",
    duration: "المدة",
    accountType: "نوع الحساب",
    privateAccount: "حساب خاص",
    sharedAccount: "حساب مشترك",
    toolBenefitsTitle: "ما هي فائدة واستخدامات هذه الأداة؟",
    viewBenefits: "فائدة ومميزات الأداة",
    orderViaWhatsApp: "اطلب هذا الاشتراك الآن عبر واتساب",
    instantDeliveryText: "تسليم فوري بعد الدفع",
    modalClose: "إغلاق",
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
    badge: "100% Guaranteed & Trusted Digital Subscriptions",
    headingMain: "Premium",
    headingAccent: "Digital Subscriptions",
    subheading: "Unlock top AI tools, productivity suites, design software, and entertainment at competitive rates with instant delivery and full warranty.",
    searchPlaceholder: "Search subscriptions ... e.g. ChatGPT, Gemini, Disney+, Steam, Canva",
    searchQuick: "Popular searches:",
    available: "In Stock",
    popularBadge: "Most Popular",
    instantDelivery: "Instant Activation",
    contactPrice: "Contact for price",
    orderWa: "Order via WhatsApp",
    sortBy: "Sort by:",
    sortPopular: "Most Popular",
    sortNewest: "Newest",
    foundCount: (n) => `Found ${n} available subscription${n !== 1 ? "s" : ""}`,
    noResults: "No matching subscriptions found",
    noResultsSub: "Try using different keywords or reset your filters to view all available services.",
    resetFilters: "Reset All Filters",
    ctaTitle: "Need a subscription that isn't listed?",
    ctaDesc: "The Suriix team can provide virtually any software subscription or custom digital service at the best market rates.",
    ctaBtn: "Chat with Us Now",
    filters: "Quick Filters",
    clearFilters: "Clear Filters",
    filterDuration: "Duration",
    filterAccount: "Account Type",
    allDurations: "All Durations",
    allAccounts: "All Accounts",
    monthly: "Monthly",
    yearly: "Yearly",
    duration: "Duration",
    accountType: "Account",
    privateAccount: "Private Account",
    sharedAccount: "Shared Account",
    toolBenefitsTitle: "What are the benefits & use cases of this tool?",
    viewBenefits: "Features & Benefits",
    orderViaWhatsApp: "Order This Subscription on WhatsApp",
    instantDeliveryText: "Instant activation after confirmation",
    modalClose: "Close",
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
    badge: "100% 正品保障与可信数字订阅",
    headingMain: "精选",
    headingAccent: "数字订阅服务",
    subheading: "以超值价格获取顶级人工智能、办公套件、创意设计与流媒体娱乐服务，即时交付并享有全额保障。",
    searchPlaceholder: "搜索订阅 ... 例如 ChatGPT、Gemini、Disney+、Steam、Canva",
    searchQuick: "热门搜索：",
    available: "即时开通",
    popularBadge: "最受欢迎",
    instantDelivery: "极速发货",
    contactPrice: "联系获取底价",
    orderWa: "通过 WhatsApp 订购",
    sortBy: "排序：",
    sortPopular: "最受欢迎",
    sortNewest: "最新上架",
    foundCount: (n) => `已找到 ${n} 个可用订阅`,
    noResults: "未找到匹配的订阅服务",
    noResultsSub: "请尝试不同的关键词，或重置所有筛选器以查看全部服务。",
    resetFilters: "重置所有筛选",
    ctaTitle: "需要未列出的专属服务或软件？",
    ctaDesc: "Suriix 团队可随时为您代订各种海外工具或定制数字服务，价格实惠且全程售后保障。",
    ctaBtn: "立即在线咨询",
    filters: "快速筛选",
    clearFilters: "清除筛选",
    filterDuration: "服务周期",
    filterAccount: "账户类型",
    allDurations: "全部周期",
    allAccounts: "全部类型",
    monthly: "月付",
    yearly: "年付",
    duration: "周期",
    accountType: "账户",
    privateAccount: "独享账号",
    sharedAccount: "共享账号",
    toolBenefitsTitle: "该工具的用途与核心价值是什么？",
    viewBenefits: "查看工具用途与优势",
    orderViaWhatsApp: "通过 WhatsApp 立即订购此服务",
    instantDeliveryText: "确认后极速开通交付",
    modalClose: "关闭",
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

/* ─── Brand SVG Logos ────────────────────────────────────────────────────── */
const LOGOS: Record<string, JSX.Element> = {
  netflix: (
    <img src="/img/netflix.svg" alt="Netflix" className="h-9 w-auto object-contain drop-shadow-sm select-none" />
  ),
  chatgpt: (
    <img src="/img/chatgpt.svg" alt="ChatGPT" className="w-10 h-10 object-contain rounded-xl select-none" />
  ),
  gemini: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <path d="M12 2C12 7.523 7.523 12 2 12c5.523 0 10 4.477 10 10 0-5.523 4.477-10 10-10-5.523 0-10-4.477-10-10z" fill="url(#gemini_sparkle_grad)"/>
      <defs>
        <linearGradient id="gemini_sparkle_grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4285F4"/>
          <stop offset="0.5" stopColor="#9B72CB"/>
          <stop offset="1" stopColor="#D96570"/>
        </linearGradient>
      </defs>
    </svg>
  ),
  disney: (
    <img src="/img/disney-plus.svg" alt="Disney+" className="w-11 h-auto object-contain select-none" />
  ),
  crunchyroll: (
    <img src="/img/crunchyroll.svg" alt="Crunchyroll" className="w-10 h-10 object-contain select-none" />
  ),
  grok: (
    <img src="/img/grok.svg" alt="Grok" className="w-10 h-10 object-contain select-none" />
  ),
  wps: (
    <img src="/img/wps.png" alt="WPS Office" className="w-10 h-10 object-contain rounded-lg shadow-xs select-none" />
  ),
  steam: (
    <img src="/img/steam.svg" alt="Steam" className="w-10 h-10 object-contain select-none" />
  ),
  seedance: (
    <img src="/img/seedance_logo.webp" alt="SeeDance 2.0 AI" className="w-10 h-10 object-contain rounded-xl shadow-xs select-none" />
  ),
  higgsfield: (
    <img src="/img/higgsfield.svg" alt="Higgsfield AI" className="w-10 h-10 object-contain rounded-xl shadow-xs select-none" />
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
    <div className="w-10 h-10 rounded-full bg-[#181717] flex items-center justify-center p-1.5 shadow-sm">
      <img src="/img/github-light.svg" alt="GitHub" className="w-full h-full object-contain select-none" />
    </div>
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
      <rect width="100" height="100" rx="14" fill="#ffffff" className="dark:fill-slate-900"/>
      <path d="M6.6 7.9c2.7 2.2 3.7 2 8.7 1.7L87 5.9c1.1 0 .1-1.1-.3-1.3l-11.9-8.6C72.5-5.5 71.2-5.1 64.7-4.4L5.7.6C3.3.9 2.8 2.1 3.7 3L6.6 7.9z" fill="currentColor" transform="translate(5 15) scale(0.9)"/>
      <path d="M9.5 18.2v66.4c0 3.6 1.8 4.9 5.9 4.7l77.9-4.5c4.1-.2 5.1-2.7 5.1-5.9V13c0-3.2-1.3-4.9-4.2-4.6l-80.4 4.7c-3.1.2-4.3 1.8-4.3 5.1z" fill="transparent" stroke="currentColor" strokeWidth="2" transform="translate(0 5)"/>
      <path d="M60 25L33 28v4l5 1v30l-5 2v4l18-1v-4l-5-2V35l17 28h7V29l5-1v-4z" fill="currentColor"/>
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
      <rect width="200" height="200" rx="30" fill="#12131c"/>
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
    <img src="/img/claude.svg" alt="Claude AI" className="w-10 h-10 object-contain select-none" />
  ),
};

/* ─── Logo renderer ──────────────────────────────────────────────────────── */
const LogoImg = ({ id, name, color }: { id: string; name: string; color: string }) => {
  const svg = LOGOS[id];
  if (svg) return <div className="w-12 h-12 flex items-center justify-center">{svg}</div>;
  return (
    <div
      className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-xl shrink-0 shadow-sm"
      style={{ background: color }}
    >
      {name[0]}
    </div>
  );
};

/* ─── Subscription data ─────────────────────────────────────────────────── */
interface Sub {
  id: string;
  name: string;
  desc: { ar: string; en: string; zh: string };
  benefits: { ar: string[]; en: string[]; zh: string[] };
  logo: string;
  color: string;
  category: string;
  duration: string;
  accountType: string;
  popular?: boolean;
}

const SUBS: Sub[] = [
  {
    id: "netflix",
    name: "Netflix Premium",
    popular: true,
    color: "#e50914",
    desc: {
      ar: "شاهد أحدث الأفلام والمسلسلات الحصرية بدقة 4K فائقة الوضوح وبدون أي إعلانات.",
      en: "Stream top movies and exclusive TV series in stunning 4K Ultra HD without any ads.",
      zh: "畅享海量高清 4K 原创电影与热门剧集，免广告纯净观影体验。",
    },
    benefits: {
      ar: [
        "مشاهدة آلاف الأفلام والمسلسلات والبرامج الوثائقية الحصرية بدقة 4K Ultra HD",
        "بدون أي إعلانات مزعجة نهائياً مع تشغيل غير محدود على جميع شاشاتك",
        "إمكانية تنزيل المحتوى ومشاهدته بدون إنترنت أثناء السفر والتنقل",
        "صوت محيطي سينمائي Dolby Atmos مع دعم الترجمة والدبلجة لجميع اللغات",
      ],
      en: [
        "Stream thousands of exclusive movies, TV series and documentaries in 4K UHD",
        "Completely ad-free continuous streaming experience across all your screens",
        "Download titles to watch offline anywhere on mobile or tablet",
        "Dolby Atmos spatial audio with multi-language subtitles and dubbing",
      ],
      zh: [
        "独家畅享数万部 4K 超高清电影、热门美剧及纪录片",
        "全程零广告打扰，无限制纯净跨设备观影",
        "支持离线下载，旅途中无需网络随时观看",
        "配备杜比全景声与多国语言超清字幕",
      ],
    },
    logo: "",
    category: "ترفيه ومشاهدة",
    duration: "شهر / 3 أشهر / سنة",
    accountType: "حساب خاص",
  },
  {
    id: "chatgpt",
    name: "ChatGPT Plus",
    popular: true,
    color: "#10a37f",
    desc: {
      ar: "وصول غير محدود لأحدث نماذج GPT-4o والتحليل المتقدم وتوليد الصور DALL·E البرمجي.",
      en: "Unlimited priority access to GPT-4o, advanced data analysis, and creative DALL-E image generation.",
      zh: "尊享 GPT-4o 优先访问特权、高级数据分析与 DALL-E 智能绘图能力。",
    },
    benefits: {
      ar: [
        "وصول أولوي وغير محدود لأحدث نماذج GPT-4o و o1 ذات القدرات المنطقية الفائقة",
        "إنشاء وتوليد الصور الاحترافية فوراً بجودة سينمائية عبر نموذج DALL·E 3",
        "تحليل الملفات الضخمة وجداول البيانات Excel وتوليد الرسوم البيانية والأكواد",
        "إنشاء واستكشاف مساعدين ذكاء اصطناعي مخصصين (Custom GPTs) لكل متطلباتك",
      ],
      en: [
        "Priority access to flagship GPT-4o & advanced reasoning models",
        "Instant high-resolution image creation powered by DALL-E 3",
        "Upload and analyze massive spreadsheets, PDFs, and codebases effortlessly",
        "Create and explore personalized Custom GPT agents for any task",
      ],
      zh: [
        "优先畅享 GPT-4o 旗舰模型与前沿深度推理能力",
        "集成 DALL-E 3 顶尖商业图像设计生成",
        "支持直接上传海量 Excel 表格、长文档与代码工程深度分析",
        "自由定制与使用私有化 Custom GPT 智能体",
      ],
    },
    logo: "",
    category: "ذكاء اصطناعي",
    duration: "شهر / سنة",
    accountType: "حساب خاص",
  },
  {
    id: "gemini",
    name: "Google Gemini Advanced",
    popular: true,
    color: "#4285f4",
    desc: {
      ar: "مساعد جوجل فائق الذكاء مع سياق مليون توكن ومساحة تخزين سحابية 2TB على Google One.",
      en: "Google's most capable AI with a massive 1M token context window and 2TB cloud storage.",
      zh: "谷歌顶级多模态 AI，支持百万 Token 超大上下文窗口并赠送 2TB 谷歌云盘。",
    },
    benefits: {
      ar: [
        "الوصول إلى أقوى نموذج ذكاء اصطناعي من جوجل Gemini 1.5 Pro للتحليل العميق",
        "نافذة سياق ثورية بسعة 1,000,000 توكن لتحليل كتب كاملة وفيديوهات مدتها ساعة",
        "مساحة تخزين سحابية ضخمة 2TB مشمولة ومجانية مع اشتراك Google One",
        "تكامل مباشر مع تطبيقات Google Workspace (Gmail، Docs، Sheets) لمساعدتك في العمل",
      ],
      en: [
        "Access Google's state-of-the-art Gemini 1.5 Pro reasoning model",
        "Revolutionary 1M token context window analyzing entire books or 1-hour video",
        "Includes 2TB of premium Google One cloud storage",
        "Seamless native integration with Gmail, Google Docs, Sheets, and Drive",
      ],
      zh: [
        "优先享用谷歌巅峰大模型 Gemini 1.5 Pro 超强推理能力",
        "革命性 100 万 Token 上下文窗口，支持整本书与长视频深度拆解",
        "免费附带 2TB 谷歌官方 Google One 高速云端存储空间",
        "原生深度嵌入 Gmail、谷歌文档与表格，全自动化赋能日常办公",
      ],
    },
    logo: "",
    category: "ذكاء اصطناعي",
    duration: "شهر / سنة",
    accountType: "حساب خاص",
  },
  {
    id: "disney",
    name: "Disney+ Premium",
    popular: true,
    color: "#0063e5",
    desc: {
      ar: "عالم كامل من إنتاجات ديزني، بيكسار، مارفل، ستار وورز، وناشيونال جيوغرافيك بدقة 4K.",
      en: "The greatest stories from Disney, Pixar, Marvel, Star Wars, and Nat Geo in 4K UHD.",
      zh: "汇聚迪士尼、皮克斯、漫威、星球大战与国家地理独家高清影视大片。",
    },
    benefits: {
      ar: [
        "المقر الحصري لجميع أعمال ديزني، بيكسار، مارفل، ستار وورز وناشيونال جيوغرافيك",
        "بث فائق الجودة بدقة 4K HDR وميزة IMAX Enhanced لصورة وصوت سينمائي",
        "تحميل غير محدود للمشاهدة بدون إنترنت على الهاتف والتابلت والشاشات الذكية",
        "باقة Star الترفيهية للأعمال الدرامية العالمية الحصرية للكبار بدون إعلانات",
      ],
      en: [
        "Exclusive home of Disney, Pixar, Marvel, Star Wars, and Nat Geo productions",
        "Ultra HD 4K HDR streaming with IMAX Enhanced presentation and Dolby Atmos",
        "Unlimited offline downloads across multiple registered devices",
        "Full access to the Star entertainment hub for premium global dramas",
      ],
      zh: [
        "迪士尼、皮克斯、漫威、星战与国家地理独家汇聚一处",
        "4K HDR 超高清画质配合 IMAX Enhanced 震撼影院视效",
        "支持多设备无限次离线下载随时随地随心看",
        "尊享 Star 影视板块，收录海量全球独家高分剧集",
      ],
    },
    logo: "",
    category: "ترفيه ومشاهدة",
    duration: "شهر / 3 أشهر / سنة",
    accountType: "حساب خاص",
  },
  {
    id: "crunchyroll",
    name: "Crunchyroll Mega Fan",
    popular: true,
    color: "#f47521",
    desc: {
      ar: "أكبر مكتبة أنمي مرخصة عالمياً بدون إعلانات مع الحلقات الجديدة فور صدورها في اليابان.",
      en: "Stream the world's largest anime library ad-free with simulcast episodes from Japan.",
      zh: "全球最大正版动漫库，日本同步连载极速超清无广告观看。",
    },
    benefits: {
      ar: [
        "أكبر مكتبة أنمي مرخصة عالمياً تضم أكثر من 1,000 عنوان و 40,000 حلقة",
        "مشاهدة أحدث الحلقات بعد ساعة واحدة فقط من بثها الرسمي في اليابان (Simulcast)",
        "بث بدقة عالية 1080p كاملة وبدون إعلانات مع دعم الدبلجة والترجمة العربية الرسمية",
        "تحميل الحلقات لمشاهدتها بدون إنترنت على أجهزتك المحمولة في أي وقت",
      ],
      en: [
        "The world's largest official anime streaming catalog with 40,000+ episodes",
        "Simulcast episodes streaming just 1 hour after broadcast in Japan",
        "Full 1080p HD streaming with zero ads and multi-language subs/dubs",
        "Offline viewing support on mobile apps for on-the-go streaming",
      ],
      zh: [
        "全球最大正版动漫流媒体平台，汇聚四万余集热门动漫",
        "日本同步连载新番播出仅一小时内即享极速上线",
        "全高清 1080p 纯净零广告，内嵌多语种专业字幕",
        "支持移动端一键离线缓存，出行无网络也能追番",
      ],
    },
    logo: "",
    category: "ترفيه ومشاهدة",
    duration: "شهر / 3 أشهر / سنة",
    accountType: "حساب خاص",
  },
  {
    id: "grok",
    name: "xAI Grok (X Premium+)",
    popular: true,
    color: "#000000",
    desc: {
      ar: "الذكاء الاصطناعي الأسرع من إيلون ماسك مع بيانات لحظية من X وتوليد صور Flux وتوثيق الحساب.",
      en: "Elon Musk's xAI assistant with real-time X data, Flux image generation, and X Premium+.",
      zh: "埃隆·马斯克旗下 xAI 助手，实时联网获取推特全网热点，集成 Flux 顶尖出图。",
    },
    benefits: {
      ar: [
        "مساعد الذكاء الاصطناعي الأسرع وصولاً للأخبار والمعلومات اللحظية من منصة X (تويتر)",
        "توليد صور واقعية وفنية فائقة الدقة بنموذج Flux بدون قيود أو رقابة مشددة",
        "تفكير منطقي وحل للمسائل الرياضية والبرمجية بنبرة ذكية ومرحة وفريدة",
        "يشمل اشتراك X Premium+ مع العلامة الزرقاء وإلغاء الإعلانات على تويتر بالكامل",
      ],
      en: [
        "Real-time access to breaking news and live discussions directly on X (Twitter)",
        "Unrestricted, photo-realistic image synthesis powered by state-of-the-art Flux",
        "Deep technical reasoning, coding, and problem-solving with witty personality",
        "Includes full X Premium+ perks: blue checkmark badge and zero timeline ads",
      ],
      zh: [
        "实时获取 X (原 Twitter) 平台最新全网突发热点资讯与深度情报",
        "集成顶尖 Flux 模型，支持极速超写实画质创意出图",
        "高超的数学逻辑推理与代码辅助，具备幽默犀利的独特问答风格",
        "包含 X Premium+ 会员全部特权：尊贵蓝标认证与全站免广告推文",
      ],
    },
    logo: "",
    category: "ذكاء اصطناعي",
    duration: "شهر / سنة",
    accountType: "حساب خاص",
  },
  {
    id: "wps",
    name: "WPS Office Pro",
    color: "#ff4d4f",
    desc: {
      ar: "الحزمة المكتبية السريعة والبديل الأخف لأوفيس مع أدوات PDF المتقدمة ومساعد الذكاء الاصطناعي.",
      en: "Fast, all-in-one Office suite with powerful PDF tools, cloud sync, and AI writing.",
      zh: "轻巧极速全能办公套件，内置强大 PDF 编辑转换工具与 AI 智能创作助手。",
    },
    benefits: {
      ar: [
        "حزمة مكتبية متكاملة وسريعة بديلة لمايكروسوفت أوفيس (المستندات، الجداول، العروض)",
        "محرر ومحول ملفات PDF احترافي مع إمكانية التعديل والدمج وتوقيع المستندات",
        "مساعد ذكاء اصطناعي مدمج لكتابة المحتوى وتلخيص التقارير وصياغة المعادلات المعقدة",
        "مزامنة سحابية فورية ومكتبة ضخمة تضم آلاف القوالب الاحترافية الجاهزة للعمل",
      ],
      en: [
        "All-in-one lightweight Office suite compatible with Word, Excel & PPT",
        "Advanced PDF converter and editor with document signing and merging",
        "Built-in AI assistant for document drafting, summarization, and formula help",
        "Real-time multi-device cloud synchronization with thousands of premium templates",
      ],
      zh: [
        "轻量极速的全能办公套件，全面完美兼容 Word、Excel、PPT 格式",
        "专业级 PDF 编辑器与转换器，支持自由修改、拆分合并与电子签名",
        "内置 WPS AI 智能写作副驾驶，一键快速润色总结与生成函数公式",
        "跨平台云端实时同步并尊享数万套正版高价值商业模板",
      ],
    },
    logo: "",
    category: "إنتاجية ومكاتب",
    duration: "سنة",
    accountType: "حساب خاص",
  },
  {
    id: "steam",
    name: "Steam Store & Wallet",
    color: "#171a21",
    desc: {
      ar: "شحن رصيد وشراء ألعاب الكمبيوتر الأصلية من أكبر منصة ألعاب في العالم مع تفعيل فوري.",
      en: "Official PC game purchases and Steam wallet top-ups with instant, secure activation.",
      zh: "全球最大 PC 正版游戏平台钱包充值与游戏激活，官方正规渠道秒发货。",
    },
    benefits: {
      ar: [
        "شراء وتحميل آلاف ألعاب الكمبيوتر الأصلية من أكبر متجر ألعاب في العالم",
        "حفظ تقدم الألعاب تلقائياً في السحاب (Steam Cloud) ومشاركتها مع العائلة",
        "الوصول إلى مجتمع اللاعبين والتعديلات وورشة العمل (Steam Workshop)",
        "عروض وتخفيضات موسمية هائلة مع تفعيل فوري وضمان الحساب بالكامل",
      ],
      en: [
        "Purchase and download top original PC games on the world's premier platform",
        "Automatic game progress backup with Steam Cloud and Family Library Sharing",
        "Instant access to community forums, player mods, and Steam Workshop",
        "Massive seasonal game discounts with instant, secure account activation",
      ],
      zh: [
        "畅享全球最大 PC 正版游戏分发平台，海量游戏随时入库开玩",
        "支持 Steam 云存档自动同步与家庭库无缝共享",
        "一键订阅全球创意工坊 (Steam Workshop) 海量 MOD 与玩家社区",
        "尽享官方季节特惠促销，账号正规充值即时极速激活",
      ],
    },
    logo: "",
    category: "ترفيه ومشاهدة",
    duration: "رصيد / دائم",
    accountType: "حساب خاص",
  },
  {
    id: "seedance",
    name: "SeeDance 2.0 AI",
    popular: true,
    color: "#ec4899",
    desc: {
      ar: "تحويل أي صورة ثابتة إلى مقاطع رقص وحركات واقعية بالذكاء الاصطناعي مع مزامنة الإيقاع.",
      en: "Transform static photos into realistic dancing video animations with beat synchronization.",
      zh: "单张照片一键生成逼真舞蹈视频，精准人体骨骼动态捕捉与节拍律动同步。",
    },
    benefits: {
      ar: [
        "تحويل أي صورة شخصية أو شخصية كرتونية إلى مقطع فيديو راقص واقعي مذهل",
        "تزامن دقيق لحركات الجسم والرقصات المنتشرة مع إيقاع الموسيقى بالذكاء الاصطناعي",
        "جودة تصدير عالية الدقة ومناسبة لنشر التريندات على TikTok و Instagram Reels",
        "سهولة تامة في الاستخدام بدون الحاجة لخبرة سابقة في المونتاج أو التحريك ثلاثي الأبعاد",
      ],
      en: [
        "Turn any static character or selfie into dynamic, fluid dance videos",
        "AI-powered body pose synchronisation matching viral beats and music tempos",
        "High-definition video rendering tailored for viral TikTok, Shorts & Reels content",
        "Extremely intuitive UI requiring zero motion graphics or animation background",
      ],
      zh: [
        "将任意单张照片或动漫角色一键生成流畅逼真的动感舞蹈视频",
        "AI 精准人体骨骼动作捕捉，完美贴合热门音乐节拍律动",
        "超高清视频渲染输出，专为抖音、TikTok 与短视频爆款内容打造",
        "简单易用零门槛，无需任何传统后期剪辑或动画制作经验",
      ],
    },
    logo: "",
    category: "ذكاء اصطناعي",
    duration: "شهر / سنة",
    accountType: "حساب خاص",
  },
  {
    id: "higgsfield",
    name: "Higgsfield AI Video",
    popular: true,
    color: "#d1fe17",
    desc: {
      ar: "المنصة الرائدة لإنشاء فيديوهات سينمائية واقعية بالذكاء الاصطناعي مع تحكم متطور بالكاميرا.",
      en: "Cinema-grade AI video generation platform with advanced virtual camera choreography.",
      zh: "电影级 AI 视频生成平台，支持专业虚拟运镜与超写实人物动作模拟。",
    },
    benefits: {
      ar: [
        "منصة توليد فيديو سينمائي متطورة بالذكاء الاصطناعي للمخرجين وصناع المحتوى",
        "تحكم كامل بزوايا الكاميرا وحركتها (Zoom, Pan, Tilt, Dolly) بدقة ميكانيكية",
        "توليد شخصيات بشرية واقعية بحركات تعبيرية طبيعية وتناسق بصري مذهل",
        "تصدير فيديوهات إعلانية وسينمائية بجودة 4K جاهزة للإنتاج والتسويق التجاري",
      ],
      en: [
        "Advanced AI cinema-grade video synthesis for filmmakers and creative creators",
        "Total virtual camera choreography: full control over pan, zoom, tilt, and dolly",
        "Hyper-realistic human character generation with natural emotive gestures",
        "Commercial-ready high resolution video outputs for ads and social media",
      ],
      zh: [
        "专为影视导演与高端内容创作者打造的电影级 AI 视频生成平台",
        "提供真正虚拟摄影机运镜调度（推拉摇移、俯仰变焦全掌控）",
        "生成超写实人物角色，动作肢体表情自然，光影前后一致性极高",
        "支持商业级高清视频输出，适用于专业广告创意与大片制作",
      ],
    },
    logo: "",
    category: "ذكاء اصطناعي",
    duration: "شهر / سنة",
    accountType: "حساب خاص",
  },
  {
    id: "microsoft",
    name: "Microsoft 365",
    popular: true,
    color: "#0078d4",
    desc: {
      ar: "حزمة أوفيس المتكاملة (Word, Excel, PowerPoint) مع مساحة سحابية 1TB على OneDrive.",
      en: "Complete Office productivity suite with 1TB OneDrive cloud storage per user.",
      zh: "完整 Office 办公套件（Word、Excel、PPT）及 1TB OneDrive 专属云存储空间。",
    },
    benefits: {
      ar: [
        "أحدث إصدارات برامج Office الأصلية (Word, Excel, PowerPoint, Outlook, OneNote)",
        "مساحة تخزين سحابية ضخمة 1TB على OneDrive مع تشفير متقدم ومزامنة فورية",
        "تثبيت رسمي على ما يصل إلى 5 أجهزة للمستخدم الواحد (كمبيوتر، ماك، جوال، تابلت)",
        "تحديثات أمان وميزات جديدة مستمرة مع إمكانية العمل المشترك المباشر على الملفات",
      ],
      en: [
        "Latest desktop & mobile apps for Word, Excel, PowerPoint, Outlook, and OneNote",
        "1TB of secure OneDrive cloud storage with ransomware detection and recovery",
        "Official installation on up to 5 concurrent devices (PC, Mac, iOS, Android)",
        "Continuous cloud updates, real-time multi-user document collaboration",
      ],
      zh: [
        "正版 Word、Excel、PowerPoint 及 Outlook 桌面与移动端应用完整套件",
        "赠送专属 1TB OneDrive 极速云盘，带勒索病毒防御与安全文件保护",
        "单个账号支持在多达 5 台设备同时激活运行（Windows、Mac、手机和平板）",
        "持续享有官方功能升级与实时多人在线协同办公支持",
      ],
    },
    logo: "",
    category: "إنتاجية ومكاتب",
    duration: "سنة",
    accountType: "حساب خاص",
  },
  {
    id: "canva",
    name: "Canva Pro",
    popular: true,
    color: "#00c4cc",
    desc: {
      ar: "ملايين القوالب الاحترافية والأدوات السحرية لإزالة الخلفيات وتصميم السوشيال ميديا.",
      en: "Millions of premium templates, magic AI design tools, and brand kits for creators.",
      zh: "数百万高级商用设计模板、AI 一键智能抠图与全套品牌素材库。",
    },
    benefits: {
      ar: [
        "إمكانية الوصول لأكثر من 100 مليون صورة وفيديو ورسم بياني وخط حصري بدون حقوق",
        "أداة إزالة خلفية الصور والفيديوهات بنقرة زر واحدة وبدقة متناهية بالذكاء الاصطناعي",
        "أدوات الذكاء الاصطناعي السحرية: تغيير المقاس الذكي، وتوليد وتعديل وتوسيع الصور",
        "إعداد الهوية البصرية للعلامة التجارية (Brand Kit) لحفظ الألوان والخطوط والشعارات",
      ],
      en: [
        "Unlimited access to 100+ million premium stock photos, videos, and fonts",
        "Instant one-click AI background remover for both images and video clips",
        "Magic Studio AI toolset: instant layout resizing, image generation, and expansion",
        "Organize Brand Kits with custom palettes, fonts, and company logos in one click",
      ],
      zh: [
        "解锁逾一亿项正版商用级免版权高清照片、视频素材与独家字体库",
        "AI 一键智能抠图黑科技，瞬间移除图片与视频背景",
        "Magic Studio 魔法设计工具箱：智能画布尺寸转换与 AI 绘图拓展",
        "专属品牌工具包 (Brand Kit)，快速规范统一样式、调色板与企业 Logo",
      ],
    },
    logo: "",
    category: "تصميم وإبداع",
    duration: "شهر / سنة",
    accountType: "حساب خاص",
  },
  {
    id: "adobe",
    name: "Adobe Creative Cloud",
    popular: true,
    color: "#eb1000",
    desc: {
      ar: "الحزمة الشاملة لأكثر من 20 تطبيقاً للمحترفين بما في ذلك Photoshop و Premiere و Illustrator.",
      en: "All 20+ professional creative apps including Photoshop, Premiere Pro, and Illustrator.",
      zh: "全套 20+ 款专业设计软件，涵盖 Photoshop、Illustrator 及 Premiere Pro。",
    },
    benefits: {
      ar: [
        "حزمة أدوبي الكاملة بأكثر من 20 برنامجاً (Photoshop, Premiere, Illustrator, After Effects)",
        "أدوات الذكاء الاصطناعي التوليدي Adobe Firefly للتصميم والتعديل والمونتاج الفوري",
        "مساحة تخزين سحابية 100GB مع مزامنة الخطوط Adobe Fonts ومكتبات Creative Cloud",
        "تحديثات مستمرة وتثبيت أصلي مع ترخيص تجاري كامل لجميع مشاريعك وأعمالك",
      ],
      en: [
        "Complete suite of 20+ professional apps (Photoshop, Premiere, Illustrator, After Effects)",
        "Integrated Adobe Firefly Generative AI tools for design, vector, and video editing",
        "100GB of secure cloud storage with access to thousands of Adobe Fonts",
        "Official application updates with commercial licensing for all creative outputs",
      ],
      zh: [
        "完整拥有 20+ 款全球顶级创意软件（Photoshop、Premiere、Illustrator 等）",
        "内置最新 Adobe Firefly 生成式 AI 引擎，深度革新平面与视频制作流",
        "包含 100GB 高速官方云空间及 Adobe Fonts 万款正版商用字库",
        "享受官方即时云端更新，成果具备全面商业授权保障",
      ],
    },
    logo: "",
    category: "تصميم وإبداع",
    duration: "شهر / سنة",
    accountType: "حساب خاص",
  },
  {
    id: "claude",
    name: "Claude Pro",
    popular: true,
    color: "#d97757",
    desc: {
      ar: "مساعد الذكاء الاصطناعي الأقوى في البرمجة والتحليل المعقد من شركة Anthropic بسعة ذاكرة هائلة.",
      en: "Anthropic's most capable AI model for coding, in-depth research, and complex document analysis.",
      zh: "Anthropic 旗舰大模型，专为长文档推理、高阶编程与深度研究打造。",
    },
    benefits: {
      ar: [
        "سعة استخدام مضاعفة 5 مرات لأحدث نموذج Claude 3.5 Sonnet الرائد عالمياً",
        "أقوى أداة في العالم لكتابة وفحص وبناء الأكواد البرمجية والمشاريع التقنية المتكاملة",
        "ميزة مساحات العمل والمشاريع (Projects) وتفاعل مرئي حي عبر خاصية Artifacts",
        "تحليل المستندات المعقدة وقراءة الصور والرسوم البيانية بدقة استثنائية وبدون أخطاء",
      ],
      en: [
        "5x more usage capacity on the world-leading Claude 3.5 Sonnet model",
        "The undisputed #1 coding and code generation AI assistant in benchmarks",
        "Interactive Artifacts feature for running React apps, previews, and SVG designs live",
        "Superb comprehension of multi-page technical PDFs, charts, and large datasets",
      ],
      zh: [
        "尊享全球权威榜首 Claude 3.5 Sonnet 模型五倍以上高额对话用量",
        "公认行业第一的编程与复杂代码工程重构专家级 AI 助手",
        "独家 Artifacts 功能，实时即刻预览运行 React 应用、前端代码与矢量图",
        "超长复杂学术论文、技术白皮书及多模态图表解析极其准确可靠",
      ],
    },
    logo: "",
    category: "ذكاء اصطناعي",
    duration: "شهر / سنة",
    accountType: "حساب خاص",
  },
  {
    id: "midjourney",
    name: "Midjourney",
    popular: true,
    color: "#12131c",
    desc: {
      ar: "الأداة الأولى عالمياً لتوليد الصور الفنية الواقعية بالذكاء الاصطناعي بدقة استثنائية.",
      en: "The world's leading generative AI model for hyper-realistic imagery and conceptual art.",
      zh: "全球领先的 AI 艺术生成工具，创造令人惊叹的超写实画作与创意概念图。",
    },
    benefits: {
      ar: [
        "المنصة الأولى عالمياً لإنتاج وتوليد الصور الفنية والواقعية بالذكاء الاصطناعي",
        "تفاصيل فائقة النعومة ودقة تصوير سينمائي تنافس كاميرات التصوير الاحترافية",
        "ساعات حوسبة سريعة (Fast Hours) لتوليد الصور خلال ثوانٍ معدودة",
        "حقوق ملكية تجارية كاملة للصور واستخدام غير محدود في النمط الهادئ (Relax Mode)",
      ],
      en: [
        "The industry's gold standard AI for hyper-realistic conceptual image creation",
        "Cinema-grade lighting, textures, and realism that rival professional cameras",
        "Dedicated Fast GPU compute hours delivering renders in mere seconds",
        "Commercial usage rights for generated artwork with unlimited Relax generation",
      ],
      zh: [
        "全球无可争议的 AI 艺术创意与超写实视觉设计巅峰平台",
        "电影级景深虚化、物理光照与超写实材质细节还原",
        "赠送充足 GPU 高速算力时间，数秒内即刻生成震撼视效大作",
        "生成画作享有完整商业使用权，支持 Relax 模式无限次作图",
      ],
    },
    logo: "",
    category: "ذكاء اصطناعي",
    duration: "شهر / سنة",
    accountType: "حساب خاص",
  },
  {
    id: "figma",
    name: "Figma Pro",
    color: "#f24e1e",
    desc: {
      ar: "منصة تصميم واجهات وتجربة المستخدم (UI/UX) الرائدة للفرق والمصممين المحترفين.",
      en: "Collaborative interface and UI/UX design platform with unlimited projects and version history.",
      zh: "行业标杆级协同 UI/UX 界面设计工具，支持无限历史版本与团队协作。",
    },
    benefits: {
      ar: [
        "المساحة الاحترافية لتصميم وتطوير واجهات وتجربة المستخدم (UI/UX Design)",
        "عدد غير محدود من ملفات ومشاريع التصميم مع تاريخ كامل للإصدارات السابقة",
        "مكتبات مشتركة لمكونات التصميم (Design Systems) لتوحيد هوية الفريق",
        "ميزة Dev Mode المخصصة للمبرمجين لاستخراج الأكواد والأبعاد والمقاسات بدقة",
      ],
      en: [
        "Industry-standard collaborative workspace for UI/UX product design",
        "Unlimited design files and shared team spaces with complete version history",
        "Publish and maintain shared Design System component libraries",
        "Advanced Dev Mode translating UI specifications into production code effortlessly",
      ],
      zh: [
        "全球互联网产品 UI/UX 界面设计与交互原型协同行业标准工具",
        "支持无限设计文件与团队项目空间，享有永久版本历史记录",
        "全团队统一共享与发布 Design System 核心设计组件库",
        "专属 Dev Mode 开发者模式，一键精准导出 CSS/iOS/Android 样式代码",
      ],
    },
    logo: "",
    category: "تصميم وإبداع",
    duration: "شهر / سنة",
    accountType: "حساب خاص",
  },
  {
    id: "github",
    name: "GitHub Pro",
    color: "#24292e",
    desc: {
      ar: "أدوات متطورة للمطورين ومساحات عمل خاصة وGitHub Codespaces مع ساعات حوسبة مضاعفة.",
      en: "Advanced developer workflow tools, Codespaces compute hours, and protected branch permissions.",
      zh: "专业开发者套件，提供专属 Codespaces 算力时长及增强型代码分支保护。",
    },
    benefits: {
      ar: [
        "أدوات متقدمة للمطورين مع حماية الفروع وتدقيق الكود وسجلات المراجعة",
        "ساعات حوسبة مجانية مضاعفة على GitHub Codespaces لتطوير المشاريع سحابياً",
        "مساحة تخزين ورفعات GitHub Actions مضاعفة لأتمتة الاختبار والنشر المستمر",
        "شارة GitHub Pro الفاخرة على ملفك الشخصي لتعزيز مصداقيتك كمطور برمجيات",
      ],
      en: [
        "Advanced developer toolset with protected branches and code review tools",
        "Double free compute hours on cloud-hosted GitHub Codespaces environments",
        "Increased storage and GitHub Actions workflow minutes for CI/CD automation",
        "Exclusive Pro badge displayed on your public GitHub profile",
      ],
      zh: [
        "进阶开发者利器，享有分支保护规则、精细化代码审查与洞察图表",
        "GitHub Codespaces 云端在线开发环境算力时长翻倍赠送",
        "拥有更高配额的 GitHub Actions 持续集成自动化分钟数与存储空间",
        "在公开个人主页点亮独家 GitHub Pro 尊贵身份铭牌",
      ],
    },
    logo: "",
    category: "برمجة وتطوير",
    duration: "شهر / سنة",
    accountType: "حساب خاص",
  },
  {
    id: "spotify",
    name: "Spotify Premium",
    color: "#1db954",
    desc: {
      ar: "استمتع بملايين المقاطع الصوتية والبودكاست بدون إعلانات وبأعلى جودة صوتية مع ميزة التحميل.",
      en: "Ad-free music and podcasts streaming with offline downloads and highest fidelity sound.",
      zh: "无广告畅听海量音乐与播客，支持离线下载并享受极高无损音质。",
    },
    benefits: {
      ar: [
        "الاستماع لأكثر من 100 مليون أغنية وبودكاست بدون أي فواصل إعلانية نهائياً",
        "جودة صوت فائقة النقاء (Very High Quality 320kbps)",
        "تحميل الأغاني والبودكاست للمشاهدة والاستماع في أي مكان بدون اتصال إنترنت",
        "إمكانية التخطي اللانهائي واختيار الأغاني بدقة وتشغيل جماعي مع الأصدقاء",
      ],
      en: [
        "Ad-free uninterrupted streaming across 100+ million music tracks and podcasts",
        "Experience crystal-clear audio fidelity at 320 kbps very high bitrate",
        "Download albums and playlists for seamless offline listening anywhere",
        "Unlimited skips on mobile and create group listening sessions with friends",
      ],
      zh: [
        "全球逾一亿首海量曲库与播客电台纯享，全程无任何广告插播",
        "畅享 320kbps 极高无损纯净高品质音频体验",
        "支持整张专辑与歌单离线批量下载，无网环境下依旧顺畅收听",
        "手机端自由随心切歌，支持发起远程好友协同聆听房间",
      ],
    },
    logo: "",
    category: "ترفيه ومشاهدة",
    duration: "شهر / 3 أشهر / سنة",
    accountType: "حساب خاص",
  },
  {
    id: "youtube",
    name: "YouTube Premium",
    popular: true,
    color: "#ff0000",
    desc: {
      ar: "مشاهدة يوتيوب بدون إعلانات نهائياً مع التشغيل في الخلفية واشتراك YouTube Music مجاناً.",
      en: "Ad-free video playback, background audio playback, and included YouTube Music Premium.",
      zh: "全平台免除任何视频广告干扰，支持锁屏后台播放，赠送 YouTube Music 会员。",
    },
    benefits: {
      ar: [
        "مشاهدة مقاطع يوتيوب بدون أي إعلانات نهائياً على جميع الأجهزة والشاشات",
        "تشغيل الفيديو في الخلفية أثناء قفل الشاشة أو استخدام تطبيقات أخرى",
        "تحميل الفيديوهات بجودة عالية لمشاهدتها لاحقاً بدون الحاجة للإنترنت",
        "اشتراك كامل ومجاني في تطبيق الموسيقى المستقل YouTube Music Premium",
      ],
      en: [
        "Ad-free video viewing across all devices: smartphone, smart TV, and desktop",
        "Background playback keeps audio playing when switching apps or locking screen",
        "Download long videos in full resolution to watch offline without Wi-Fi",
        "Includes full access to the dedicated YouTube Music Premium service",
      ],
      zh: [
        "全终端（电视、电脑、手机）彻底免除任何片头及贴片视频广告",
        "支持锁屏或切换应用时的真正后台无缝音频播放",
        "全分辨率离线批量下载视频，差旅途中随时离线尽情观看",
        "随赠完整 YouTube Music Premium 音乐会员特权",
      ],
    },
    logo: "",
    category: "ترفيه ومشاهدة",
    duration: "شهر / 6 أشهر / سنة",
    accountType: "حساب خاص",
  },
  {
    id: "notion",
    name: "Notion Pro",
    color: "#000000",
    desc: {
      ar: "مساحة العمل الشاملة لإدارة المشاريع والملاحظات وتوثيق المعرفة مع تكامل الذكاء الاصطناعي.",
      en: "The connected workspace for docs, project roadmaps, wikis, and AI-powered notes.",
      zh: "高度模块化的一体化生产力工作台，整合项目看板、知识库与智能 AI 助手。",
    },
    benefits: {
      ar: [
        "مساحة العمل المتكاملة للملاحظات وإدارة المشاريع وبناء قواعد المعرفة والمهام",
        "رفع ملفات ومستندات بحجم غير محدود مع سجل زمني لتاريخ التعديلات",
        "مشاركة مساحات العمل مع الضيوف وفرق العمل وإدارتها باحترافية وسهولة",
        "تنظيم متقدم باستخدام قواعد البيانات المرتبطة (Databases) وعروض Kanban",
      ],
      en: [
        "Connected workspace organizing docs, project tasks, wikis, and notes",
        "Unlimited file upload size with comprehensive page revision history",
        "Collaborate smoothly with extended guest permissions and team workspaces",
        "Powerful relational databases with Kanban, timeline, calendar, and table views",
      ],
      zh: [
        "全球领先的一体化知识库、团队看板与笔记协同超级工作台",
        "突破单文件上传大小限制，提供详尽的页面修改历史版本回溯",
        "自由邀请外部协作者与团队成员并精细分配权限",
        "强大的关系型数据库视图（看板、甘特图、时间线及日历模式）",
      ],
    },
    logo: "",
    category: "إنتاجية ومكاتب",
    duration: "شهر / سنة",
    accountType: "حساب خاص",
  },
  {
    id: "semrush",
    name: "SEMrush Pro",
    color: "#ff642d",
    desc: {
      ar: "أقوى منصة تحليل السيو والكلمات المفتاحية ومراقبة المنافسين وتحسين محركات البحث.",
      en: "Comprehensive digital marketing suite for keyword research, competitor SEO, and analytics.",
      zh: "全球领先的搜索引擎优化 (SEO)、关键词挖掘与竞品流量追踪营销利器。",
    },
    benefits: {
      ar: [
        "المنصة الرائدة في تحليل السيو (SEO) والكلمات المفتاحية ومراقبة ترتيب المواقع",
        "كشف استراتيجيات المنافسين ومصادر زياراتهم وأفضل إعلاناتهم المدفوعة بدقة",
        "فحص شامل لأخطاء الموقع التقنية وتقديم حلول فورية لتحسين سرعته وتصدره",
        "تتبع الروابط الخلفية (Backlinks) والفرص التسويقية لبناء النفوذ الرقمي",
      ],
      en: [
        "World-leading digital marketing & keyword research search engine suite",
        "Spy on competitors' top organic keywords, traffic channels, and Google Ads",
        "Deep technical site audits pinpointing indexing issues and on-page fixes",
        "Comprehensive backlink analytics and competitive link-building opportunities",
      ],
      zh: [
        "全球公认第一的搜索引擎营销 (SEO/SEM) 与全网流量分析利器",
        "精准深度探测竞争对手核心引流关键词、流量来源与投放广告策略",
        "全站技术性健康诊断，即刻定位页面死链、收录障碍与代码优化方案",
        "全面监控高质量反向链接 (Backlinks)，挖掘蓝海增长机会",
      ],
    },
    logo: "",
    category: "تسويق رقمي",
    duration: "شهر / سنة",
    accountType: "حساب خاص",
  },
  {
    id: "dropbox",
    name: "Dropbox Plus",
    color: "#0061ff",
    desc: {
      ar: "تخزين سحابي فائق الأمان بسعة 2TB ومشاركة ملفات مشفرة ومزامنة فورية لجميع أجهزتك.",
      en: "2TB of secure, encrypted cloud storage with effortless device syncing and file recovery.",
      zh: "2TB 极速加密云端存储，跨设备秒级同步与误删文件还原保障。",
    },
    benefits: {
      ar: [
        "مساحة تخزين سحابية آمنة بسعة 2,000 جيجابايت (2TB) لجميع ملفاتك وصورك",
        "مزامنة فائقة السرعة للملفات عبر الكمبيوتر والجوال مع استهلاك منخفض للإنترنت",
        "ميزة Dropbox Rewind لاستعادة الملفات المحذوفة أو المعدلة حتى 30 يوماً",
        "مشاركة الروابط بكلمات مرور محمية وتحديد تواريخ انتهاء الصلاحية للملفات",
      ],
      en: [
        "2,000 GB (2TB) of secure, encrypted cloud storage for your entire digital life",
        "Industry-fastest smart synchronization across all connected devices",
        "Dropbox Rewind feature to recover deleted files or accidental edits up to 30 days",
        "Share password-protected links with customizable expiry dates",
      ],
      zh: [
        "独享 2,000 GB (2TB) 高度安全加密云盘，装下全部海量文件与照片",
        "业内公认顶尖的增量同步技术，跨设备传输极速且不占带宽",
        "Dropbox Rewind 时光机功能，长达 30 天内误删误改文件一键还原",
        "支持为分享链接设置独立访问密码与自动过期时限，确保隐私安全",
      ],
    },
    logo: "",
    category: "إنتاجية ومكاتب",
    duration: "شهر / سنة",
    accountType: "حساب خاص",
  },
  {
    id: "grammarly",
    name: "Grammarly Premium",
    color: "#15c39a",
    desc: {
      ar: "التدقيق اللغوي الاحترافي وإعادة الصياغة الذكية بنبرة احترافية للبريد والتقارير.",
      en: "Advanced AI writing assistant providing full-sentence rewrites, tone detection, and grammar fixes.",
      zh: "高阶英文写作纠错与润色助手，提供整句润色、学术语气优化与拼写查错。",
    },
    benefits: {
      ar: [
        "تدقيق لغوي ونحوي وإملائي فائق الدقة بالذكاء الاصطناعي لكافة النصوص الإنجليزية",
        "إعادة صياغة الجمل الطويلة والغامضة لجعلها أكثر احترافية وجاذبية ووضوحاً",
        "كاشف الانتحال والسرقات الأدبية (Plagiarism Checker) مع مصادر الاقتباس",
        "ضبط نبرة الصوت (Tone Detector) لتناسب المراسلات الرسمية والرسائل الأكاديمية",
      ],
      en: [
        "AI-powered grammar, punctuation, and contextual spelling corrections in real time",
        "Full-sentence rewrites improving clarity, conciseness, and executive vocabulary",
        "Comprehensive plagiarism detector scanning billions of web pages and journals",
        "Advanced tone adjustments ensuring your emails and papers sound confident and polite",
      ],
      zh: [
        "专业级实时英文语法纠错、拼写智能检查与地道用词优化",
        "提供整句深度润色建议，大幅提升学术论文与商务邮件的精炼度与可读性",
        "内置全网数十亿学术论文与网页防剽窃查重检测系统 (Plagiarism)",
        "智能语气与口吻分析检测，确保措辞严谨、自信且富有感染力",
      ],
    },
    logo: "",
    category: "ذكاء اصطناعي",
    duration: "شهر / سنة",
    accountType: "حساب خاص",
  },
  {
    id: "envato",
    name: "Envato Elements",
    color: "#81b441",
    desc: {
      ar: "تحميل غير محدود لملايين ملفات التصميم والفيديو والموسيقى وقوالب الويب المرخصة تجارياً.",
      en: "Unlimited downloads of millions of stock videos, audio tracks, graphics, and CMS themes.",
      zh: "无限次下载数百万套商用视频、音效素材、平面设计源文件及网站主题模板。",
    },
    benefits: {
      ar: [
        "تحميل غير محدود لملايين ملفات التصميم والفيديو والموسيقى وقوالب الويب",
        "قوالب WordPress و Shopify ومواقع جاهزة مع إضافات برمجية احترافية",
        "فيديوهات ومؤثرات صوتية وموسيقى خلفية بدون حقوق ملكية لليوتيوب والريلز",
        "ترخيص تجاري كامل يمنحك الأمان القانوني لاستخدام الأصول في مشاريع عملائك",
      ],
      en: [
        "Unlimited downloads across millions of stock videos, audio, graphics, and themes",
        "Premium WordPress & CMS templates with exclusive plugin toolkits included",
        "Royalty-free background music and sound effects for YouTube, TikTok, and ads",
        "Commercial license giving you 100% legal security on client and personal projects",
      ],
      zh: [
        "无限量畅享下载数百万套商用矢量设计图、高清视频样片、音效与字体",
        "包含大量顶尖 WordPress/Shopify 商业建站主题及配套专业插件包",
        "免版权背景音乐、短视频音效库，专为 YouTube、短剧及商业广告打造",
        "附带终身有效商业授权凭证，合规安全无虞用于客户商用项目",
      ],
    },
    logo: "",
    category: "تصميم وإبداع",
    duration: "شهر / سنة",
    accountType: "حساب خاص",
  },
];

/* ─── Category tabs ──────────────────────────────────────────────────────── */
const CATS = [
  { key: "الكل", icon: Grid3X3 },
  { key: "ذكاء اصطناعي", icon: Cpu },
  { key: "إنتاجية ومكاتب", icon: Briefcase },
  { key: "ترفيه ومشاهدة", icon: PlayCircle },
  { key: "برمجة وتطوير", icon: Code2 },
  { key: "تصميم وإبداع", icon: Palette },
  { key: "تسويق رقمي", icon: TrendingUp },
  { key: "خدمات أخرى", icon: MoreHorizontal },
];

/* ─── WhatsApp SVG ────────────────────────────────────────────────────────── */
const WaIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white" className="shrink-0">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.845L0 24l6.336-1.507A11.956 11.956 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.367l-.36-.213-3.724.886.902-3.626-.235-.373A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z"/>
  </svg>
);

/* ─── Detail Modal Component ──────────────────────────────────────────────── */
const SubscriptionDetailModal = ({
  sub,
  t,
  lang,
  onClose,
}: {
  sub: Sub;
  t: LangT;
  lang: Lang;
  onClose: () => void;
}) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const waMsg = `${WA_BASE}?text=${encodeURIComponent(
    `مرحباً، أريد الاشتراك في خدمة ${sub.name} — عبر منصة Suriix`
  )}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md overflow-y-auto"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ type: "spring", stiffness: 360, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-3xl border border-border/60 bg-card/95 dark:bg-slate-900/95 backdrop-blur-2xl shadow-2xl overflow-hidden my-8"
        dir={t.dir}
      >
        {/* Top brand ambient gradient */}
        <div
          className="h-2 w-full"
          style={{
            background: `linear-gradient(90deg, ${sub.color}, hsl(var(--primary)), ${sub.color})`,
          }}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label={t.modalClose}
          className={`absolute top-4 ${
            t.dir === "rtl" ? "left-4" : "right-4"
          } p-2 rounded-full bg-secondary/80 hover:bg-secondary border border-border/40 text-muted-foreground hover:text-foreground transition-all cursor-pointer z-20`}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-5 text-center sm:text-start">
            <div
              className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center p-3 shadow-lg border border-border/40 shrink-0"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(240,240,250,0.85))",
              }}
            >
              <LogoImg id={sub.id} name={sub.name} color={sub.color} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
                  {t.cats[sub.category] ?? sub.category}
                </span>
                {sub.popular && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-500 shadow-xs">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    {t.popularBadge}
                  </span>
                )}
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                  <Check className="w-3 h-3" />
                  {t.available}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
                {sub.name}
              </h2>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6 p-3.5 rounded-2xl bg-secondary/35 border border-border/30">
            {sub.desc[lang]}
          </p>

          {/* Benefits Box */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <h3 className="text-sm sm:text-base font-extrabold text-foreground">
                {t.toolBenefitsTitle}
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {sub.benefits[lang].map((benefit, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-card border border-border/40 hover:border-primary/30 transition-colors"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm text-foreground/90 font-medium leading-relaxed">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Specs grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6 text-xs">
            <div className="p-2.5 rounded-xl bg-secondary/40 border border-border/30 flex flex-col gap-0.5 text-center sm:text-start">
              <span className="text-muted-foreground text-[11px] flex items-center justify-center sm:justify-start gap-1">
                <Calendar className="w-3 h-3 text-primary" /> {t.duration}
              </span>
              <span className="font-bold text-foreground truncate">{sub.duration}</span>
            </div>

            <div className="p-2.5 rounded-xl bg-secondary/40 border border-border/30 flex flex-col gap-0.5 text-center sm:text-start">
              <span className="text-muted-foreground text-[11px] flex items-center justify-center sm:justify-start gap-1">
                <ShieldCheck className="w-3 h-3 text-primary" /> {t.accountType}
              </span>
              <span className="font-bold text-foreground truncate">{sub.accountType}</span>
            </div>

            <div className="p-2.5 rounded-xl bg-secondary/40 border border-border/30 flex flex-col gap-0.5 text-center sm:text-start">
              <span className="text-muted-foreground text-[11px] flex items-center justify-center sm:justify-start gap-1">
                <Zap className="w-3 h-3 text-amber-500" /> {t.instantDelivery}
              </span>
              <span className="font-bold text-foreground truncate">{t.instantDeliveryText}</span>
            </div>

            <div className="p-2.5 rounded-xl bg-secondary/40 border border-border/30 flex flex-col gap-0.5 text-center sm:text-start">
              <span className="text-muted-foreground text-[11px] flex items-center justify-center sm:justify-start gap-1">
                <Sparkles className="w-3 h-3 text-primary" /> الضمان
              </span>
              <span className="font-bold text-foreground truncate">ضمان كامل ومستمر</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-3 border-t border-border/40">
            <a
              href={waMsg}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 flex items-center justify-center gap-2.5 py-3 px-6 rounded-2xl font-bold text-sm text-white transition-all duration-200 hover:opacity-95 hover:shadow-xl hover:shadow-emerald-500/20 active:scale-[0.98]"
              style={{ background: "linear-gradient(135deg, #10b981 0%, #059669 100%)" }}
            >
              <WaIcon />
              <span>{t.orderViaWhatsApp}</span>
            </a>

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm text-muted-foreground hover:text-foreground bg-secondary/60 hover:bg-secondary transition-all"
            >
              {t.modalClose}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─── SubCard Component ──────────────────────────────────────────────────── */
const SubCard = ({
  sub,
  t,
  lang,
  onOpenDetails,
}: {
  sub: Sub;
  t: LangT;
  lang: Lang;
  onOpenDetails: (s: Sub) => void;
}) => {
  const waMsg = `${WA_BASE}?text=${encodeURIComponent(`مرحباً، أريد الاشتراك في خدمة ${sub.name} — عبر منصة Suriix`)}`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      onClick={() => onOpenDetails(sub)}
      className="group relative flex flex-col rounded-3xl border border-border/50 bg-card/80 dark:bg-card/40 backdrop-blur-md overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/40 hover:shadow-primary/10 transition-all duration-300 cursor-pointer"
    >
      {/* Top subtle color glow bar */}
      <div
        className="h-1.5 w-full transition-all duration-300 opacity-80 group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, ${sub.color}, hsl(var(--primary)))`
        }}
      />

      {/* Card Header & Brand Icon */}
      <div className="relative flex flex-col items-center pt-5 pb-3 px-5 text-center">
        {/* Badges container */}
        <div className="w-full flex items-center justify-between mb-3">
          {sub.popular ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-500 shadow-sm shadow-purple-500/20">
              <Sparkles className="w-3 h-3 text-amber-300" />
              {t.popularBadge}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
              <Check className="w-3 h-3" />
              {t.available}
            </span>
          )}

          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground/80 bg-secondary/50 px-2 py-0.5 rounded-md">
            <Zap className="w-3 h-3 text-amber-500" />
            {t.instantDelivery}
          </span>
        </div>

        {/* Brand Icon Showcase */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center p-2.5 mb-3 transition-transform duration-300 group-hover:scale-105 shadow-md border border-border/40"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(240,240,250,0.8))",
          }}
        >
          <LogoImg id={sub.id} name={sub.name} color={sub.color} />
        </div>

        {/* Title */}
        <h3 className="font-extrabold text-base sm:text-lg text-foreground tracking-tight group-hover:text-primary transition-colors">
          {sub.name}
        </h3>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 px-5 pb-5 pt-1 gap-3.5">
        {/* Description */}
        <p className="text-muted-foreground text-xs sm:text-[13px] leading-relaxed line-clamp-2 min-h-[2.5rem]">
          {sub.desc[lang]}
        </p>

        {/* Specs & Chips */}
        <div className="grid grid-cols-2 gap-2 text-[11px] font-medium text-muted-foreground">
          <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-secondary/40 border border-border/30">
            <Calendar className="w-3.5 h-3.5 text-primary shrink-0" />
            <span className="truncate">{sub.duration}</span>
          </div>
          <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-secondary/40 border border-border/30">
            <ShieldCheck className="w-3.5 h-3.5 text-primary shrink-0" />
            <span className="truncate">{sub.accountType}</span>
          </div>
        </div>

        {/* Interactive Benefits trigger button */}
        <div className="flex items-center justify-between text-xs pt-0.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(sub);
            }}
            className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:underline"
          >
            <Info className="w-3.5 h-3.5 text-primary" />
            <span>{t.viewBenefits}</span>
          </button>
          <span className="font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-lg border border-primary/20 text-[11px]">
            {t.contactPrice}
          </span>
        </div>

        <div className="h-px bg-border/40 my-0.5" />

        {/* Order Button */}
        <div className="mt-auto flex flex-col">
          <a
            href={waMsg}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:opacity-95 hover:shadow-lg hover:shadow-emerald-500/20 active:scale-[0.98]"
            style={{ background: "linear-gradient(135deg, #10b981 0%, #059669 100%)" }}
          >
            <WaIcon />
            <span>{t.orderWa}</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Main Component ─────────────────────────────────────────────────────── */
interface Props {
  lang?: string;
}

const SubscriptionsSection: React.FC<Props> = () => {
  const { lang: ctxLang } = useLanguage();
  const lang = (ctxLang as Lang) in I18N ? (ctxLang as Lang) : "ar";
  const t = I18N[lang];

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("الكل");
  const [filterDuration, setDuration] = useState("الكل");
  const [filterAccount, setAccount] = useState("الكل");
  const [sortBy, setSort] = useState<"popular" | "newest">("popular");
  const [selectedSub, setSelectedSub] = useState<Sub | null>(null);

  // Reset search when language changes
  useEffect(() => {
    setSearch("");
  }, [lang]);

  // Filtering logic
  const filtered = useMemo(() => {
    let list = SUBS.filter((s) => {
      // 1. Category tab
      const matchCat = activeTab === "الكل" || s.category === activeTab;

      // 2. Search query in all languages & titles
      const q = search.trim().toLowerCase();
      const matchQ =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.desc.ar.toLowerCase().includes(q) ||
        s.desc.en.toLowerCase().includes(q) ||
        s.desc.zh.toLowerCase().includes(q);

      // 3. Duration match (flexible check)
      const matchDur =
        filterDuration === "الكل" ||
        (filterDuration === "شهر" && s.duration.includes("شهر")) ||
        (filterDuration === "سنة" && s.duration.includes("سنة"));

      // 4. Account match
      const matchAcc =
        filterAccount === "الكل" || s.accountType === filterAccount;

      return matchCat && matchQ && matchDur && matchAcc;
    });

    if (sortBy === "popular") {
      list = [...list].sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
    }
    return list;
  }, [search, activeTab, filterDuration, filterAccount, sortBy]);

  const hasFilters =
    activeTab !== "الكل" ||
    filterDuration !== "الكل" ||
    filterAccount !== "الكل" ||
    search.trim().length > 0;

  const resetAllFilters = () => {
    setSearch("");
    setActiveTab("الكل");
    setDuration("الكل");
    setAccount("الكل");
    setSort("popular");
  };

  const heroShowcaseSubs = SUBS.filter((s) => s.popular).slice(0, 6);

  return (
    <section
      id="subscriptions"
      dir={t.dir}
      className="relative min-h-screen overflow-hidden bg-background"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 right-1/4 w-[550px] h-[550px] rounded-full blur-[140px] bg-primary/10 dark:bg-primary/20 animate-glow-pulse" />
        <div className="absolute top-1/2 -left-32 w-[450px] h-[450px] rounded-full blur-[130px] bg-accent/10 dark:bg-accent/15" />
      </div>

      {/* ── HERO SECTION ─────────────────────────────────────────── */}
      <div className="relative px-4 sm:px-8 pt-6 sm:pt-10 pb-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Column (Text & Search) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col items-start text-start"
          >
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/25 text-xs font-bold text-primary mb-5 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
              <span>{t.badge}</span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-foreground leading-[1.18] mb-4 tracking-tight">
              {t.headingMain}{" "}
              <span className="gradient-text">{t.headingAccent}</span>
            </h1>

            {/* Subheading */}
            <p className="text-muted-foreground text-base sm:text-lg mb-8 max-w-2xl leading-relaxed">
              {t.subheading}
            </p>

            {/* Unified Search Input */}
            <div className="w-full max-w-xl relative group">
              <Search
                className={`absolute top-1/2 -translate-y-1/2 ${
                  t.dir === "rtl" ? "end-4" : "start-4"
                } w-5 h-5 text-muted-foreground/60 group-focus-within:text-primary transition-colors`}
              />
              <input
                type="text"
                dir={t.dir}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t.searchPlaceholder}
                className={`w-full ${
                  t.dir === "rtl" ? "pe-12 ps-10" : "ps-12 pe-10"
                } py-4 rounded-2xl text-sm font-medium text-foreground placeholder-muted-foreground/50 bg-secondary/50 dark:bg-card/60 backdrop-blur-md border border-border/60 shadow-inner outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all duration-200`}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className={`absolute top-1/2 -translate-y-1/2 ${
                    t.dir === "rtl" ? "start-3.5" : "end-3.5"
                  } p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors`}
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick search chips */}
            <div className="flex flex-wrap items-center gap-2 mt-3.5 text-xs text-muted-foreground">
              <span className="font-semibold text-muted-foreground/80">{t.searchQuick}</span>
              {["ChatGPT", "Gemini", "Disney+", "Steam", "Crunchyroll", "Grok"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearch(tag)}
                  className="px-2.5 py-1 rounded-lg bg-secondary/40 hover:bg-primary/10 hover:text-primary border border-border/30 transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right Column (Hero 3D Interactive Showcase) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative hidden sm:flex items-center justify-center select-none"
          >
            {/* Glowing orb backdrop */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-purple-500/20 via-indigo-500/15 to-blue-500/10 rounded-3xl blur-2xl pointer-events-none" />

            {/* Floating Cards Container */}
            <div className="relative w-full max-w-md p-6 rounded-3xl border border-primary/20 bg-card/60 dark:bg-slate-900/40 backdrop-blur-xl shadow-2xl shadow-primary/10">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-border/40">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs font-black tracking-wider uppercase text-primary">
                  Suriix Subscriptions Hub
                </span>
              </div>

              {/* Grid of top apps */}
              <div className="grid grid-cols-3 gap-3">
                {heroShowcaseSubs.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.05, y: -4 }}
                    animate={{ y: [0, idx % 2 === 0 ? -4 : 4, 0] }}
                    transition={{
                      duration: 3.5 + idx * 0.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    onClick={() => setSelectedSub(item)}
                    className="flex flex-col items-center justify-center p-3 rounded-2xl border border-border/40 bg-card/80 hover:border-primary/40 hover:shadow-md cursor-pointer transition-all"
                  >
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-1.5 p-1 bg-white shadow-sm border border-border/20">
                      <LogoImg id={item.id} name={item.name} color={item.color} />
                    </div>
                    <span className="text-[11px] font-bold text-foreground text-center truncate max-w-full">
                      {item.name.split(" ")[0]}
                    </span>
                    <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
                      {t.available}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Bottom security assurance pill */}
              <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  ضمان كامل ومستمر
                </span>
                <span className="flex items-center gap-1.5 font-bold text-primary">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  تسليم خلال دقائق
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── STICKY NAVIGATION & CATEGORY BAR ────────────────────────── */}
      <div className="sticky top-[72px] z-30 border-y border-border/40 bg-background/90 backdrop-blur-xl shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          {/* Category Tabs */}
          <div className="py-2.5 overflow-x-auto scrollbar-none flex items-center gap-2">
            {CATS.map((cat) => {
              const Icon = cat.icon;
              const active = activeTab === cat.key;
              const catLabel = t.cats[cat.key] ?? cat.key;

              // Calculate count per category
              const catCount =
                cat.key === "الكل"
                  ? SUBS.length
                  : SUBS.filter((s) => s.category === cat.key).length;

              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveTab(cat.key)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 border shrink-0 ${
                    active
                      ? "gradient-purple text-white border-transparent shadow-md shadow-primary/20"
                      : "text-muted-foreground border-border/40 hover:border-primary/30 hover:text-foreground bg-secondary/30 hover:bg-secondary/60"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{catLabel}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-md text-[10px] font-bold ${
                      active ? "bg-white/25 text-white" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {catCount}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Unified Filters Toolbar */}
          <div className="py-2.5 border-t border-border/30 flex flex-wrap items-center justify-between gap-3 text-xs">
            
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1 font-bold text-muted-foreground shrink-0 pe-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-primary" />
                {t.filters}:
              </span>

              {/* Duration filter chips */}
              <div className="inline-flex rounded-xl p-0.5 bg-secondary/50 border border-border/40">
                <button
                  onClick={() => setDuration("الكل")}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                    filterDuration === "الكل"
                      ? "bg-card text-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t.allDurations}
                </button>
                <button
                  onClick={() => setDuration("شهر")}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                    filterDuration === "شهر"
                      ? "bg-card text-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t.monthly}
                </button>
                <button
                  onClick={() => setDuration("سنة")}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                    filterDuration === "سنة"
                      ? "bg-card text-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t.yearly}
                </button>
              </div>

              {/* Account Type filter chips */}
              <div className="inline-flex rounded-xl p-0.5 bg-secondary/50 border border-border/40">
                <button
                  onClick={() => setAccount("الكل")}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                    filterAccount === "الكل"
                      ? "bg-card text-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t.allAccounts}
                </button>
                <button
                  onClick={() => setAccount("حساب خاص")}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                    filterAccount === "حساب خاص"
                      ? "bg-card text-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t.privateAccount}
                </button>
              </div>

              {/* Clear filters button */}
              {hasFilters && (
                <button
                  onClick={resetAllFilters}
                  className="flex items-center gap-1 text-xs font-bold text-red-500 hover:text-red-600 dark:text-red-400 bg-red-500/10 hover:bg-red-500/15 border border-red-500/20 px-2.5 py-1 rounded-xl transition-all"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>{t.clearFilters}</span>
                </button>
              )}
            </div>

            {/* Sort & Counter */}
            <div className="flex items-center gap-3 ms-auto">
              {/* Sort Selector */}
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <ArrowUpDown className="w-3.5 h-3.5" />
                <span>{t.sortBy}</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSort(e.target.value as "popular" | "newest")}
                    className="appearance-none ps-2.5 pe-6 py-1 rounded-lg bg-card border border-border/50 text-foreground font-semibold outline-none cursor-pointer focus:border-primary/50"
                  >
                    <option value="popular">{t.sortPopular}</option>
                    <option value="newest">{t.sortNewest}</option>
                  </select>
                  <ChevronDown className={`absolute top-1/2 -translate-y-1/2 ${t.dir === "rtl" ? "left-1.5" : "right-1.5"} w-3 h-3 text-muted-foreground pointer-events-none`} />
                </div>
              </div>

              {/* Results counter */}
              <div className="px-3 py-1 rounded-xl bg-primary/10 border border-primary/20 text-primary font-bold">
                {t.foundCount(filtered.length)}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* ── SUBSCRIPTIONS GRID ───────────────────────────────────── */}
      <div className="px-4 sm:px-8 py-10 max-w-7xl mx-auto relative z-10">
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {filtered.map((sub) => (
                <SubCard
                  key={sub.id}
                  sub={sub}
                  t={t}
                  lang={lang}
                  onOpenDetails={(s) => setSelectedSub(s)}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20 px-4 max-w-md mx-auto"
            >
              <div className="w-16 h-16 rounded-3xl bg-secondary/70 border border-border/50 flex items-center justify-center mx-auto mb-4 text-muted-foreground">
                <Search className="w-8 h-8 opacity-40" />
              </div>
              <h3 className="font-extrabold text-lg text-foreground mb-1">
                {t.noResults}
              </h3>
              <p className="text-sm text-muted-foreground mb-5">
                {t.noResultsSub}
              </p>
              <button
                onClick={resetAllFilters}
                className="px-5 py-2.5 rounded-xl font-bold text-xs text-white gradient-purple shadow-md hover:opacity-90 transition-all"
              >
                {t.resetFilters}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── DETAIL MODAL (WHEN A SUBSCRIPTION IS CLICKED) ─────────── */}
      <AnimatePresence>
        {selectedSub && (
          <SubscriptionDetailModal
            sub={selectedSub}
            t={t}
            lang={lang}
            onClose={() => setSelectedSub(null)}
          />
        )}
      </AnimatePresence>

      {/* ── BOTTOM CALL TO ACTION ─────────────────────────────────── */}
      <div className="px-4 sm:px-8 pb-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="neon-border rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-primary/10 via-card to-accent/10 backdrop-blur-md relative overflow-hidden"
        >
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 text-start">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              خدمة حسب الطلب
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-foreground mb-2">
              {t.ctaTitle}
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl leading-relaxed">
              {t.ctaDesc}
            </p>
          </div>

          <a
            href={WA_BASE}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 relative z-10 flex items-center gap-2.5 px-8 py-4 rounded-2xl text-white font-bold text-sm gradient-purple shadow-xl shadow-primary/25 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5" />
            <span>{t.ctaBtn}</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default SubscriptionsSection;
