import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, MessageSquare, Send, CheckCircle2, Mail, 
  User, Shield, Clock
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import FooterSection from "@/components/FooterSection";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import SEO from "@/components/SEO";
import { supabase } from "@/lib/supabase";

const WHATSAPP_NUMBER = "967780930635";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

const ContactUs = () => {
  const { t, lang, setLang, langLabels, langOrder } = useLanguage();
  const navigate = useNavigate();

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSending, setIsSending] = useState(false);

  const isRtl = lang === "ar";
  const l = lang as "ar" | "en" | "zh";

  // Local translations
  const f = {
    ar: {
      nameLabel: "الاسم الكامل",
      namePlaceholder: "الاسم الكامل",
      emailLabel: "البريد الإلكتروني",
      emailPlaceholder: "البريد الإلكتروني",
      messageLabel: "الرسالة",
      messagePlaceholder: "الرسالة",
      send: "إرسال",
      sending: "جاري الإرسال...",
      nameRequired: "يرجى إدخال اسمك الكامل",
      emailRequired: "يرجى إدخال بريدك الإلكتروني",
      emailInvalid: "يرجى إدخال بريد إلكتروني صحيح",
      messageRequired: "يرجى كتابة رسالتك",
      waHello: "*طلب تواصل جديد من الموقع* 🚀",
      waName: "*الاسم الكامل:*",
      waEmail: "*البريد الإلكتروني:*",
      waMsg: "*الرسالة:*",
      subtitle: "تواصل معنا مباشرة عبر النموذج أو واتساب",
    },
    en: {
      nameLabel: "Full Name",
      namePlaceholder: "Full Name",
      emailLabel: "Email Address",
      emailPlaceholder: "Email Address",
      messageLabel: "Message",
      messagePlaceholder: "Message",
      send: "Send",
      sending: "Sending...",
      nameRequired: "Full name is required",
      emailRequired: "Email address is required",
      emailInvalid: "Please enter a valid email address",
      messageRequired: "Message content is required",
      waHello: "*New Contact Request* 🚀",
      waName: "*Full Name:*",
      waEmail: "*Email:*",
      waMsg: "*Message:*",
      subtitle: "Contact us directly via the form or WhatsApp",
    },
    zh: {
      nameLabel: "完整姓名",
      namePlaceholder: "完整姓名",
      emailLabel: "电子邮件",
      emailPlaceholder: "电子邮件",
      messageLabel: "留言",
      messagePlaceholder: "留言",
      send: "发送",
      sending: "发送中...",
      nameRequired: "请输入您的完整姓名",
      emailRequired: "请输入您的电子邮件",
      emailInvalid: "请输入有效的电子邮件地址",
      messageRequired: "请输入留言内容",
      waHello: "*来自网站的新联络请求* 🚀",
      waName: "*全名:*",
      waEmail: "*电子邮件:*",
      waMsg: "*留言:*",
      subtitle: "直接通过表单或 WhatsApp 与我们联系",
    }
  }[lang as "ar" | "en" | "zh"] || {
    nameLabel: "Full Name",
    namePlaceholder: "Full Name",
    emailLabel: "Email Address",
    emailPlaceholder: "Email Address",
    messageLabel: "Message",
    messagePlaceholder: "Message",
    send: "Send",
    sending: "Sending...",
    nameRequired: "Full name is required",
    emailRequired: "Email address is required",
    emailInvalid: "Please enter a valid email address",
    messageRequired: "Message content is required",
    waHello: "*New Contact Request* 🚀",
    waName: "*Full Name:*",
    waEmail: "*Email:*",
    waMsg: "*Message:*",
    subtitle: "Contact us directly via the form or WhatsApp",
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = f.nameRequired;
    
    if (!email.trim()) {
      errs.email = f.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = f.emailInvalid;
    }
    
    if (!message.trim()) errs.message = f.messageRequired;
    
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSending(true);

    // Save to database
    try {
      await supabase.from('support_messages').insert({
        name,
        email,
        message
      });
    } catch(err) {
      console.error('Failed to save message:', err);
    }

    // Format WhatsApp message
    const waText = [
      f.waHello,
      `${f.waName} ${name}`,
      `${f.waEmail} ${email}`,
      f.waMsg,
      message
    ].join("\n");

    setSubmitted(true);
    setIsSending(false);
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`,
      "_blank"
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const texts = {
    ar: {
      title: "تواصل معنا",
      subtitle: "نحن هنا للإجابة على استفساراتك وتحويل أفكارك إلى واقع رقمي مدهش",
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

  return (
    <div className="min-h-screen bg-transparent flex flex-col">
      <SEO />
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
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -24 }}
                    className="flex flex-col h-full gap-5 text-start"
                  >
                    {/* Full Name input */}
                    <div className="space-y-2 relative z-10">
                      <label className="block text-sm font-bold text-foreground/90">
                        {f.nameLabel}
                      </label>
                      <div className="relative">
                        <User className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/60 ${isRtl ? "right-4" : "left-4"}`} />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                          }}
                          placeholder={f.namePlaceholder}
                          dir={isRtl ? "rtl" : "ltr"}
                          className={`w-full py-4 rounded-2xl bg-secondary/40 border transition-all duration-300 text-foreground placeholder:text-muted-foreground/45 text-base
                            ${isRtl ? "pr-12 pl-4" : "pl-12 pr-4"}
                            ${
                              errors.name
                                ? "border-destructive/60 focus:border-destructive focus:ring-2 focus:ring-destructive/20"
                                : "border-border/50 hover:border-primary/45 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:shadow-[0_0_20px_hsl(var(--neon-purple)/0.15)]"
                            } focus:outline-none`}
                        />
                      </div>
                      {errors.name && (
                        <p className="text-destructive text-xs px-1">{errors.name}</p>
                      )}
                    </div>

                    {/* Email input */}
                    <div className="space-y-2 relative z-10">
                      <label className="block text-sm font-bold text-foreground/90">
                        {f.emailLabel}
                      </label>
                      <div className="relative">
                        <Mail className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/60 ${isRtl ? "right-4" : "left-4"}`} />
                        <input
                          type="text"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                          }}
                          placeholder={f.emailPlaceholder}
                          dir="ltr"
                          className={`w-full py-4 rounded-2xl bg-secondary/40 border transition-all duration-300 text-foreground placeholder:text-muted-foreground/45 text-base text-start
                            ${isRtl ? "pr-12 pl-4" : "pl-12 pr-4"}
                            ${
                              errors.email
                                ? "border-destructive/60 focus:border-destructive focus:ring-2 focus:ring-destructive/20"
                                : "border-border/50 hover:border-primary/45 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:shadow-[0_0_20px_hsl(var(--neon-purple)/0.15)]"
                            } focus:outline-none`}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-destructive text-xs px-1">{errors.email}</p>
                      )}
                    </div>

                    {/* Message textarea */}
                    <div className="space-y-2 relative z-10">
                      <label className="block text-sm font-bold text-foreground/90">
                        {f.messageLabel}
                      </label>
                      <div className="relative">
                        <MessageSquare className={`absolute top-5 w-5 h-5 text-muted-foreground/60 ${isRtl ? "right-4" : "left-4"}`} />
                        <textarea
                          rows={5}
                          value={message}
                          onChange={(e) => {
                            setMessage(e.target.value);
                            if (errors.message) setErrors((prev) => ({ ...prev, message: "" }));
                          }}
                          placeholder={f.messagePlaceholder}
                          dir={isRtl ? "rtl" : "ltr"}
                          className={`w-full py-4 rounded-2xl bg-secondary/40 border transition-all duration-300 text-foreground placeholder:text-muted-foreground/45 text-base resize-none
                            ${isRtl ? "pr-12 pl-4" : "pl-12 pr-4"}
                            ${
                              errors.message
                                ? "border-destructive/60 focus:border-destructive focus:ring-2 focus:ring-destructive/20"
                                : "border-border/50 hover:border-primary/45 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:shadow-[0_0_20px_hsl(var(--neon-purple)/0.15)]"
                            } focus:outline-none`}
                        />
                      </div>
                      {errors.message && (
                        <p className="text-destructive text-xs px-1">{errors.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2 relative z-10">
                      <motion.button
                        type="submit"
                        disabled={isSending}
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0 0 30px hsl(var(--neon-purple)/0.4)",
                        }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base gradient-purple text-primary-foreground neon-glow transition-all disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {isSending ? (
                          <span>{f.sending}</span>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            <span>{f.send}</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </motion.form>
                ) : (
                  /* Success State */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", bounce: 0.35 }}
                    className="glass-strong rounded-3xl p-8 neon-border text-center flex flex-col items-center justify-center h-full w-full relative overflow-hidden"
                  >
                    {/* Subtle inner glow */}
                    <div
                      className="absolute inset-0 rounded-3xl pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(ellipse at 50% 0%, hsl(var(--neon-purple)/0.07) 0%, transparent 70%)",
                      }}
                    />
                    <div className="relative w-20 h-20 mx-auto mb-6 relative z-10">
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", bounce: 0.5, delay: 0.15 }}
                        className="absolute inset-0 rounded-full gradient-purple neon-glow-strong flex items-center justify-center"
                      >
                        <CheckCircle2 className="w-10 h-10 text-primary-foreground" />
                      </motion.div>
                      <motion.div
                        initial={{ scale: 1.5, opacity: 0 }}
                        animate={{ scale: 2.2, opacity: 0 }}
                        transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                        className="absolute inset-0 rounded-full border-2 border-primary/60"
                      />
                    </div>

                    <motion.h3
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-2xl font-bold gradient-text mb-2 relative z-10"
                    >
                      {t("contact.success.title")}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55 }}
                      className="text-muted-foreground text-xs max-w-sm mx-auto relative z-10"
                    >
                      {t("contact.success.message")}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
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
