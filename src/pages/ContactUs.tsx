import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, MessageSquare, Send, CheckCircle2, AlertCircle, Mail, 
  User, Shield, Clock, HelpCircle 
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import FooterSection from "@/components/FooterSection";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const WHATSAPP_URL = "https://wa.me/967780930635";

const ContactUs = () => {
  const { t, lang, setLang, langLabels, langOrder } = useLanguage();
  const navigate = useNavigate();

  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    const titles = {
      ar: "تواصل معنا | Suriix",
      en: "Contact Us | Suriix",
      zh: "联系我们 | Suriix"
    };
    const descriptions = {
      ar: "تواصل مع فريق Suriix للحصول على حلول رقمية احترافية وتصميم مواقع ومتاجر إلكترونية حديثة.",
      en: "Get in touch with Suriix for premium digital solutions, custom web design, and advanced systems development.",
      zh: "联系 Suriix 团队，获取专业的数字化解决方案、现代化网站与电商平台定制开发服务。"
    };

    document.title = titles[lang as "ar" | "en" | "zh"] || titles.en;
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", descriptions[lang as "ar" | "en" | "zh"] || descriptions.en);
    }
    
    window.scrollTo(0, 0);
  }, [lang]);

  const texts = {
    ar: {
      title: "تواصل معنا",
      subtitle: "نحن هنا للإجابة على استفساراتك وتحويل أفكارك إلى واقع رقمي مدهش",
      name: "الاسم الكامل",
      namePlaceholder: "الاسم الكامل",
      email: "البريد الإلكتروني",
      emailPlaceholder: "البريد الإلكتروني",
      message: "الرسالة",
      messagePlaceholder: "اكتب رسالتك هنا...",
      send: "إرسال الرسالة",
      sending: "جاري الإرسال...",
      success: "تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.",
      error: "حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.",
      required: "يرجى ملء جميع الحقول المطلوبة.",
      contactVia: "تواصل معنا عبر",
      whatsapp: "واتساب",
      whatsappSub: "تحدث معنا الآن",
      emailDirect: "البريد الإلكتروني",
      emailDirectSub: "راسلنا مباشرة",
      responseTime: "وقت الاستجابة",
      responseHours: "خلال 24 ساعة",
      followUs: "تابعنا",
      stayInTouch: "ابق على تواصل",
      privacyText: "نحن نقدر خصوصيتك، معلوماتك آمنة لدينا."
    },
    en: {
      title: "Contact Us",
      subtitle: "We are here to answer your questions and turn your ideas into a stunning digital reality",
      name: "Full Name",
      namePlaceholder: "Enter your full name",
      email: "Email Address",
      emailPlaceholder: "Enter your email address",
      message: "Message",
      messagePlaceholder: "Write your message here...",
      send: "Send Message",
      sending: "Sending...",
      success: "Your message has been sent successfully! We will contact you soon.",
      error: "An error occurred while sending. Please try again.",
      required: "Please fill in all required fields.",
      contactVia: "Contact us via",
      whatsapp: "WhatsApp",
      whatsappSub: "Chat with us now",
      emailDirect: "Email",
      emailDirectSub: "Email us directly",
      responseTime: "Response Time",
      responseHours: "Within 24 hours",
      followUs: "Follow Us",
      stayInTouch: "Stay in touch",
      privacyText: "We value your privacy, your information is safe with us."
    },
    zh: {
      title: "联系我们",
      subtitle: "我们在这里回答您的问题，并将您的想法转化为惊人的数字现实",
      name: "全名",
      namePlaceholder: "输入您的全名",
      email: "电子邮件地址",
      emailPlaceholder: "输入您的电子邮件地址",
      message: "留言",
      messagePlaceholder: "在这里写下您的留言...",
      send: "发送留言",
      sending: "发送中...",
      success: "您的留言已成功发送！我们将尽快与您联系。",
      error: "发送时发生错误。请重试。",
      required: "请填写所有必填项。",
      contactVia: "联系我们",
      whatsapp: "WhatsApp",
      whatsappSub: "立即与我们联系",
      emailDirect: "电子邮件",
      emailDirectSub: "直接发邮件给我们",
      responseTime: "响应时间",
      responseHours: "24小时内",
      followUs: "关注我们",
      stayInTouch: "保持联系",
      privacyText: "我们重视您的隐私，您的信息是安全的。"
    }
  };

  const currentTexts = texts[lang as keyof typeof texts] || texts.en;
  const isRtl = lang === "ar";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
      return;
    }
    
    setStatus("submitting");
    
    fetch("https://formsubmit.co/ajax/info@suriix.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: `New contact from Suriix website - ${formState.name}`,
        Name: formState.name,
        Email: formState.email,
        Message: formState.message,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success === "true" || data.success === true) {
          setStatus("success");
          setFormState({ name: "", email: "", message: "" });
        } else {
          setStatus("error");
        }
        setTimeout(() => setStatus("idle"), 6000);
      })
      .catch((error) => {
        console.error(error);
        setStatus("error");
        setTimeout(() => setStatus("idle"), 6000);
      });
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col">
      {/* Dynamic Nav Header */}
      <nav className="sticky top-0 z-50 glass-strong px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate("/")}>
          <img
            src="/favicon-192x192.png"
            alt="Suriix Logo"
            className="w-9 h-9 rounded-full object-cover border border-primary/20 shadow-sm"
          />
          <span className="font-bold text-xl gradient-text tracking-wide hidden sm:block">Suriix</span>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="flex bg-secondary/50 p-1 rounded-xl border border-border/50">
            {langOrder.map((code) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  lang === code ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {langLabels[code]}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {t("privacy.back")}
        </Link>

        {/* Cinematic Header matching Mockup */}
        <div className="flex flex-col items-center text-center mb-12">
          {/* Glowing Speech Bubble Icon Container */}
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-to-tr from-primary to-accent shadow-xl shadow-purple-500/20 flex items-center justify-center mb-6 animate-glow-pulse">
            <MessageSquare className="w-10 h-10 md:w-12 md:h-12 text-white" />
          </div>

          {/* Pill Email link */}
          <a
            href="mailto:info@suriix.com"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-border/50 bg-secondary/50 hover:bg-secondary/80 text-sm font-semibold text-muted-foreground hover:text-primary transition-all duration-300 mb-6"
          >
            <Mail className="w-4 h-4" />
            info@suriix.com
          </a>

          {/* Heading title */}
          <h1 className="text-4xl md:text-5xl font-extrabold gradient-text tracking-tight mb-4">
            {currentTexts.title}
          </h1>
          
          {/* Subtitle */}
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            {currentTexts.subtitle}
          </p>
        </div>

        {/* Premium Layout Card */}
        <div className="glass-strong rounded-[2.5rem] p-6 md:p-8 lg:p-10 shadow-2xl neon-border relative overflow-hidden">
          {/* Background mesh lighting */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 lg:gap-12">
            
            {/* Left Column: Contact Form (Col Span 7) */}
            <div className="md:col-span-7 flex flex-col justify-between">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Alert Banners */}
                <AnimatePresence mode="wait">
                  {status === "success" && (
                    <div className="bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 p-4 rounded-2xl flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 shrink-0" />
                      <p className="text-sm font-medium">{currentTexts.success}</p>
                    </div>
                  )}
                  {status === "error" && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 p-4 rounded-2xl flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <p className="text-sm font-medium">
                        {!formState.name || !formState.email || !formState.message ? currentTexts.required : currentTexts.error}
                      </p>
                    </div>
                  )}
                </AnimatePresence>

                {/* Form fields */}
                <div className="space-y-5">
                  {/* Name field */}
                  <div>
                    <label className="block text-sm font-bold text-foreground mb-2 text-start">
                      {currentTexts.name} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full bg-secondary/10 dark:bg-secondary/40 border border-border/40 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 rounded-2xl px-5 py-4 text-foreground placeholder:text-muted-foreground transition-all duration-300 pr-12 pl-5 rtl:pl-12 rtl:pr-5 focus:outline-none"
                        placeholder={currentTexts.namePlaceholder}
                        required
                      />
                      <User className="absolute right-5 rtl:right-auto rtl:left-5 text-muted-foreground w-5 h-5" />
                    </div>
                  </div>

                  {/* Email field */}
                  <div>
                    <label className="block text-sm font-bold text-foreground mb-2 text-start">
                      {currentTexts.email} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type="email"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full bg-secondary/10 dark:bg-secondary/40 border border-border/40 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 rounded-2xl px-5 py-4 text-foreground placeholder:text-muted-foreground transition-all duration-300 pr-12 pl-5 rtl:pl-12 rtl:pr-5 focus:outline-none"
                        placeholder={currentTexts.emailPlaceholder}
                        required
                      />
                      <Mail className="absolute right-5 rtl:right-auto rtl:left-5 text-muted-foreground w-5 h-5" />
                    </div>
                  </div>

                  {/* Message field */}
                  <div>
                    <label className="block text-sm font-bold text-foreground mb-2 text-start">
                      {currentTexts.message} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-start">
                      <textarea
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        rows={5}
                        className="w-full bg-secondary/10 dark:bg-secondary/40 border border-border/40 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 rounded-2xl px-5 py-4 text-foreground placeholder:text-muted-foreground transition-all duration-300 pr-12 pl-5 rtl:pl-12 rtl:pr-5 focus:outline-none resize-none"
                        placeholder={currentTexts.messagePlaceholder}
                        required
                      />
                      <Send className="absolute right-5 top-5 rtl:right-auto rtl:left-5 text-muted-foreground w-5 h-5 rotate-45" />
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full relative overflow-hidden rounded-2xl cursor-pointer disabled:opacity-70 disabled:pointer-events-none group"
                  style={{ padding: 0, border: "none", background: "transparent" }}
                >
                  {/* Gradient background */}
                  <span
                    className="absolute inset-0 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:opacity-90"
                    style={{ borderRadius: "inherit" }}
                  />
                  {/* Shine overlay on hover */}
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/10 rounded-2xl" />
                  {/* Content */}
                  <span className="relative flex items-center justify-center gap-3 py-4 px-8 text-white font-bold text-base tracking-wide">
                    {status === "submitting" ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
                        <span>{currentTexts.sending}</span>
                      </>
                    ) : (
                      <>
                        <span>{currentTexts.send}</span>
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                      </>
                    )}
                  </span>
                </button>

                {/* Privacy shield footer inside LTR/RTL wrapper */}
                <div className="flex items-center justify-center gap-2 mt-5 text-muted-foreground/80 text-xs font-semibold">
                  <Shield className="w-4 h-4 text-primary" />
                  <p>{currentTexts.privacyText}</p>
                </div>
              </form>
            </div>

            {/* Right Column: Contact Channels & Info Sidebar (Col Span 5) */}
            <div className="md:col-span-5 flex flex-col gap-6 md:border-l rtl:md:border-l-0 rtl:md:border-r border-border/30 md:pl-8 rtl:md:pr-8">
              
              {/* Sidebar subtitle */}
              <h2 className="text-lg font-extrabold text-primary dark:text-[#a78bfa] text-start mb-2">
                {currentTexts.contactVia}
              </h2>

              {/* Channels Grid / Stack */}
              <div className="flex flex-col gap-4">
                {/* Channel 1: WhatsApp */}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-5 rounded-2xl border-2 border-emerald-500/10 hover:border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10 cursor-pointer shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 group"
                >
                  <div className="text-start">
                    <p className="text-emerald-600 dark:text-emerald-400 font-extrabold text-base">
                      {currentTexts.whatsapp}
                    </p>
                    <p className="text-muted-foreground text-sm font-semibold mt-0.5">
                      {currentTexts.whatsappSub}
                    </p>
                  </div>
                  {/* WhatsApp SVG Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-9 h-9 text-emerald-500 shrink-0 group-hover:scale-110 transition-transform duration-300"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </a>

                {/* Channel 2: Email Direct */}
                <a
                  href="mailto:info@suriix.com"
                  className="flex items-center justify-between p-5 rounded-2xl border-2 border-primary/10 hover:border-primary/30 bg-primary/5 hover:bg-primary/10 cursor-pointer shadow-lg hover:shadow-primary/5 transition-all duration-300 group"
                >
                  <div className="text-start">
                    <p className="text-primary font-extrabold text-base">
                      {currentTexts.emailDirect}
                    </p>
                    <p className="text-muted-foreground text-sm font-semibold mt-0.5">
                      {currentTexts.emailDirectSub}
                    </p>
                  </div>
                  <Mail className="w-9 h-9 text-primary shrink-0 group-hover:scale-110 transition-transform duration-300" />
                </a>
              </div>

              {/* Decorative dotted detailed list */}
              <div className="flex flex-col gap-5 mt-4">
                
                {/* Detail 1: Email Row */}
                <div className="border-t border-dashed border-border/50 pt-5 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary/50 flex items-center justify-center border border-border/50">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <span className="font-semibold text-muted-foreground">
                      {currentTexts.emailDirect}
                    </span>
                  </div>
                  <span className="font-bold text-foreground">info@suriix.com</span>
                </div>

                {/* Detail 2: Response time */}
                <div className="border-t border-dashed border-border/50 pt-5 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary/50 flex items-center justify-center border border-border/50">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <span className="font-semibold text-muted-foreground">
                      {currentTexts.responseTime}
                    </span>
                  </div>
                  <span className="font-bold text-foreground">
                    {currentTexts.responseHours}
                  </span>
                </div>

                {/* Detail 3: Follow us */}
                <div className="border-t border-dashed border-border/50 pt-5 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary/50 flex items-center justify-center border border-border/50">
                      <Send className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <span className="font-semibold text-muted-foreground">
                      {currentTexts.followUs}
                    </span>
                  </div>
                  <span className="font-bold text-foreground">
                    {currentTexts.stayInTouch}
                  </span>
                </div>

              </div>

            </div>

          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default ContactUs;
