import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, MessageSquare, Send, CheckCircle2, AlertCircle, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import FooterSection from "@/components/FooterSection";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const ContactUs = () => {
  const { t, lang, setLang, langLabels, langOrder } = useLanguage();
  const navigate = useNavigate();

  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    document.title = lang === "ar" ? "تواصل معنا | Suriix" : "Contact Us | Suriix";
    window.scrollTo(0, 0);
  }, [lang]);

  const texts = {
    ar: {
      title: "تواصل معنا",
      subtitle: "نحن هنا للإجابة على استفساراتك وتحويل أفكارك إلى واقع رقمي مذهل",
      name: "الاسم الكامل",
      email: "البريد الإلكتروني",
      message: "الرسالة",
      send: "إرسال الرسالة",
      sending: "جاري الإرسال...",
      success: "تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.",
      error: "حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.",
      required: "يرجى ملء جميع الحقول المطلوبة."
    },
    en: {
      title: "Contact Us",
      subtitle: "We are here to answer your questions and turn your ideas into a stunning digital reality",
      name: "Full Name",
      email: "Email Address",
      message: "Message",
      send: "Send Message",
      sending: "Sending...",
      success: "Your message has been sent successfully! We will contact you soon.",
      error: "An error occurred while sending. Please try again.",
      required: "Please fill in all required fields."
    },
    zh: {
      title: "联系我们",
      subtitle: "我们在这里回答您的问题，并将您的想法转化为惊人的数字现实",
      name: "全名",
      email: "电子邮件地址",
      message: "留言",
      send: "发送留言",
      sending: "发送中...",
      success: "您的留言已成功发送！我们将尽快与您联系。",
      error: "发送时发生错误。请重试。",
      required: "请填写所有必填项。"
    }
  };

  const currentTexts = texts[lang as keyof typeof texts];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }
    
    setStatus("submitting");
    
    // إرسال البيانات عبر FormSubmit (AJAX)
    fetch("https://formsubmit.co/ajax/moutazw3@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: `رسالة جديدة من موقع Suriix - ${formState.name}`,
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
        setTimeout(() => setStatus("idle"), 5000);
      })
      .catch((error) => {
        console.error(error);
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      });
  };

  return (
    <div className="min-h-screen bg-background grid-bg flex flex-col">
      <nav className="sticky top-0 z-50 glass-strong border-b border-border/40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
          <img src="/img/suriix_final.png" alt="Suriix Logo" className="w-10 h-10 object-cover rounded-full" />
          <span className="font-bold text-xl text-[#26163c] dark:text-white tracking-wide hidden sm:block">Suriix</span>
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

      <main className="flex-1 max-w-3xl mx-auto px-6 py-16 w-full">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {t("privacy.back")}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 flex flex-col items-center"
        >
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-primary/10 text-primary mb-4 ring-1 ring-primary/20 shadow-[0_0_30px_rgba(var(--primary),0.2)]">
            <MessageSquare className="w-10 h-10" />
          </div>
          <a href="mailto:moutazw3@gmail.com" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 font-medium bg-secondary/50 px-4 py-2 rounded-full border border-border/50">
            <Mail className="w-4 h-4" /> moutazw3@gmail.com
          </a>
          <h1 className="text-4xl md:text-5xl font-bold text-[#26163c] dark:text-white mb-4 tracking-tight">
            {currentTexts.title}
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {currentTexts.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-strong rounded-3xl neon-border p-8 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -z-10" />
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 p-4 rounded-xl flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <p className="text-sm font-medium">{currentTexts.success}</p>
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 p-4 rounded-xl flex items-center gap-3"
                >
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p className="text-sm font-medium">{!formState.name || !formState.email || !formState.message ? currentTexts.required : currentTexts.error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {currentTexts.name}
                </label>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full bg-background/50 border border-border/50 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder={currentTexts.name}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {currentTexts.email}
                </label>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full bg-background/50 border border-border/50 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder={currentTexts.email}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {currentTexts.message}
                </label>
                <textarea
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  rows={5}
                  className="w-full bg-background/50 border border-border/50 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                  placeholder={currentTexts.message}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 rounded-xl transition-all shadow-lg hover:shadow-primary/25 hover:-translate-y-1 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:pointer-events-none"
            >
              {status === "submitting" ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  {currentTexts.sending}
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  {currentTexts.send}
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </button>
          </form>
        </motion.div>
      </main>
      
      <FooterSection />
    </div>
  );
};

export default ContactUs;
