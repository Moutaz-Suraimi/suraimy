import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, Sparkles } from "lucide-react";

const WHATSAPP_NUMBER = "967780930635";

interface Message {
  role: "bot" | "user";
  text: string;
}

const ChatbotWidget = () => {
  const { t, lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [hasOpened, setHasOpened] = useState(false);

  const quickReplies = [
    { key: "chatbot.quick.pricing", section: "packages" },
    { key: "chatbot.quick.portfolio", section: "portfolio" },
    { key: "chatbot.quick.contact", section: "contact" },
    { key: "chatbot.quick.services", section: "solutions" },
  ];

  const handleOpen = () => {
    setIsOpen(true);
    if (!hasOpened) {
      setHasOpened(true);
      setMessages([{ role: "bot", text: t("chatbot.welcome") }]);
    }
  };

  const handleQuickReply = (key: string, section: string) => {
    const userText = t(key);
    setMessages((prev) => [...prev, { role: "user", text: userText }]);

    // Bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: t(`chatbot.reply.${section}`) },
      ]);
    }, 600);

    // Scroll to section
    setTimeout(() => {
      const el = document.getElementById(section);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }, 1500);
  };

  const generateAIResponse = (text: string, lang: string): string => {
    const t = text.toLowerCase();
    
    if (lang === "ar") {
      if (t.includes("سعر") || t.includes("اسعار") || t.includes("بكم") || t.includes("باقة") || t.includes("تكلفة")) {
        return "أسعارنا مصممة لتناسب مختلف الاحتياجات: \n• مواقع الشركات تبدأ من 300$\n• المتاجر الإلكترونية المتكاملة من 1000$\n• باقة النمو والتسويق تبدأ من 200$\nهل تبحث عن خدمة محددة؟";
      }
      if (t.includes("خدمات") || t.includes("تقدمون") || t.includes("ايش تسوون") || t.includes("تصميم")) {
        return "في Suriix نحن نبني ونكبر أعمالك! نقدم خدمات:\n1. تصميم وبرمجة المواقع (WordPress وغيرها)\n2. تصميم المتاجر الإلكترونية لزيادة المبيعات\n3. تحسين محركات البحث SEO\n4. إدارة الحملات الإعلانية\nهل ترغب بتفاصيل إحدى هذه الخدمات؟";
      }
      if (t.includes("مدة") || t.includes("كم ياخذ") || t.includes("وقت") || t.includes("متى")) {
        return "متوسط مدة تنفيذ المشاريع يتراوح بين 5 إلى 30 يوم عمل، ويعتمد ذلك على حجم المشروع وميزاته المطلوبة. نحن نحرص على تسليم العمل بأعلى جودة وفي وقت قياسي.";
      }
      if (t.includes("دعم") || t.includes("مساعدة") || t.includes("بعد التسليم")) {
        return "بالتأكيد! نحن في Suriix نقدم خدمات الدعم الفني والصيانة المستمرة بعد تسليم المشروع لضمان استقرار ونمو عملك الرقمي.";
      }
      if (t.includes("تواصل") || t.includes("رقم") || t.includes("واتس") || t.includes("كيف")) {
        return "يمكنك التواصل المباشر مع فريق خبرائنا مجاناً عبر الواتساب على الرقم: 967780930635+";
      }
      if (t.includes("سلام") || t.includes("مرحبا") || t.includes("أهلا") || t.includes("يا هلا")) {
        return "أهلاً بك في Suriix! أنا الذكاء الاصطناعي المساعد للموقع. أستطيع إجابتك حول خدماتنا، باقاتنا، وكيفية بناء وتطوير مشروعك الرقمي. كيف يمكنني مساعدتك؟";
      }
      return "أنا هنا للإجابة بناءً على معلومات الموقع المتاحة. لاستفسارك هذا وللحصول على استشارة دقيقة، أنصحك بالتحدث مع خبيرنا التقني بالنقر على الزر أدناه للانتقال للواتساب!";
    }

    // English logic
    if (t.includes("price") || t.includes("cost") || t.includes("package") || t.includes("how much")) {
      return "Our pricing is transparent:\n• Corporate Websites start at $300\n• Full E-Commerce goes from $1,000\n• Starter Growth/SEO deals from $200.\nWhich one are you interested in?";
    }
    if (t.includes("service") || t.includes("offer") || t.includes("do you") || t.includes("build")) {
      return "At Suriix we offer:\n1. Custom Website Development\n2. E-Commerce Solutions\n3. SEO & Digital Marketing\n4. Brand Identity & Strategy\nLet me know if you need details on any of these!";
    }
    if (t.includes("time") || t.includes("long") || t.includes("when") || t.includes("duration")) {
      return "Most projects are completed within 5 to 30 business days, depending on complexity. We prioritize quality alongside speed.";
    }
    if (t.includes("hello") || t.includes("hi") || t.includes("hey")) {
      return "Hello! Welcome to Suriix. I am the digital intelligence assistant here. You can ask me about our services, pricing, and work!";
    }
    
    return "I am trained on Suriix website data. For this particular inquiry, I highly recommend talking directly with our experts via WhatsApp!";
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userText = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userText }]);

    // AI thinking effect
    setTimeout(() => {
      const response = generateAIResponse(userText, lang);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: response },
      ]);
    }, 800);
  };

  const isRtl = lang === "ar";

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleOpen}
            className="fixed bottom-6 z-50 w-14 h-14 rounded-full gradient-purple text-primary-foreground flex items-center justify-center neon-glow-strong cursor-pointer"
            style={{ [isRtl ? "left" : "right"]: "1.5rem" }}
          >
            <MessageCircle className="w-6 h-6" />
            {/* Pulse indicator — mirrors for RTL */}
            <span className={`absolute -top-1 ${isRtl ? "-left-1" : "-right-1"} w-4 h-4 rounded-full bg-accent animate-ping`} />
            <span className={`absolute -top-1 ${isRtl ? "-left-1" : "-right-1"} w-4 h-4 rounded-full bg-accent`} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 z-50 w-[340px] max-h-[480px] flex flex-col glass-strong rounded-2xl neon-border overflow-hidden"
            style={{ [isRtl ? "left" : "right"]: "1.5rem" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/30 gradient-purple">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary-foreground">
                    {t("chatbot.title")}
                  </p>
                  <p className="text-[10px] text-primary-foreground/70 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
                    {t("chatbot.online")}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-primary-foreground/10 transition-colors text-primary-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px] max-h-[300px] custom-scrollbar">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-3 py-2 rounded-xl text-sm whitespace-pre-line ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm shadow-md"
                        : "glass neon-border text-foreground rounded-bl-sm"
                    }`}
                  >
                    {msg.role === "bot" && (
                      <Sparkles className="w-3 h-3 text-primary inline mr-1 mb-0.5" />
                    )}
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick action: Talk to Human */}
            <div className="px-4 py-2 border-t border-border/20">
               <button 
                 onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank')}
                 className="w-full py-2 text-xs font-semibold rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground flex items-center justify-center gap-2"
               >
                 <MessageCircle className="w-3.5 h-3.5" />
                 {lang === 'ar' ? 'تحدث مع خبير حقيقي (واتساب)' : 'Talk to a human (WhatsApp)'}
               </button>
            </div>

            {/* Quick replies */}
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {quickReplies.map((qr) => (
                <button
                  key={qr.key}
                  onClick={() => handleQuickReply(qr.key, qr.section)}
                  className="px-3 py-1.5 rounded-full text-xs glass neon-border text-primary hover:bg-primary/10 transition-colors"
                >
                  {t(qr.key)}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="px-4 pb-4 pt-1">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder={t("chatbot.placeholder")}
                  className="flex-1 px-3 py-2 rounded-xl bg-secondary/50 border border-border/50 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/50"
                />
                <button
                  onClick={handleSend}
                  className="p-2 rounded-xl gradient-purple text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget;
