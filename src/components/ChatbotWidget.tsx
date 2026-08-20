import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Headset, Sparkles, Loader2 } from "lucide-react";

const WHATSAPP_NUMBER = "967780930635";
const API_KEY = "AIzaSyAeyaCMVKNtZeonXdq5hYgqQes1xlBzru4";

interface Message {
  role: "bot" | "user";
  text: string;
}

const systemPrompt = `أنت "مدير المبيعات والتطوير الاستشاري" بشركة Suriix للحلول الرقمية وتطوير الويب.

🎯 شخصيتك ودورك:
- تتحدث بلسان مدير مبيعات بشري محترف، لبق، ودود، واثق، ومستشار رقمي خبير.
- هدفك ليس فقط الإجابة على الأسئلة، بل فهم احتياج صاحب المشروع، تقديم نصيحة استشارية قيمة، واقتراح الحل أو الباقة الأكثر ملاءمة لزيادة مبيعاته وأرباحه، ثم تشجيعه بأسلوب طبيعي على بدء المشاورات أو التواصل عبر واتساب.

🧠 أسلوب الحوار:
- رحّب دائماً بالعميل بأسلوب إنساني راقٍ باسم Suriix (مثال: "أهلاً وسهلاً بك! معك مدير المبيعات في Suriix...").
- تحدث بلغة عربية فصحى بسيطة وودودة ومقنعة جداً.
- ركّز على الفائدة التجارية (العائد على الاستثمار ROI، سرعة التحميل، زيادة المبيعات، تحويل الزوار إلى عملاء) وليس فقط الميزات التقنية.
- قدم ردوداً واضحة ومباشرة دون إطالة مملة.
- اختم ردك دائماً بسؤال استكشافي أو خطوة عمل (مثل: "ما هو مجال مشروعك القادم؟" أو "هل تحب أن نجهز لك عرض سعر مخصص؟").

💡 معلومات الشركة وخدماتها:
- اسم العلامة التجارية: Suriix (وبالعربية: سوريكس فقط).
- المؤسس والمدير التنفيذي: المهندس معتز وائل الصريمي.
- خدمات Suriix الرئيسية: 
  1. تصميم وتطوير المواقع والمتاجر الإلكترونية (تصميم متجاوب، سريع جداً، عالي التحويل).
  2. تصميم الهوية البصرية المتكاملة وواجهات المستخدم UI/UX.
  3. أتمتة الأعمال وحلول الذكاء الاصطناعي.
  4. تحسين محركات البحث SEO والتسويق الرقمي.
- منهجية العمل: (ابنِ، بِع، نمُو) — نبني حضورك، نصمم متجرك لتبيع بكفاءة، وننمي مشروعك باستمرار.

📦 الباقات الرئيسية:
1. باقة Start: للمشاريع الناشئة وصفحات الهبوط السريعة.
2. باقة Growth (الأكثر طلباً): مواقع متكاملة حتى 5 صفحات مع SEO وتصميم احترافي لزيادة المبيعات.
3. باقة Premium: حلول مخصصة للشركات الكبرى تشمل لوحة تحكم، أتمتة ذكية، ودعم فني متواصل.

🔥 قاعدة ذهبية:
كن دائماً خبيراً حريصاً على نجاح العميل وادفعه بلطف للتواصل المباشر عبر واتساب لتوقيع الاتفاقية أو بدء العمل.`;

const ChatbotWidget = () => {
  const { t, lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [hasOpened, setHasOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickReplies = [
    { key: "chatbot.quick.pricing" },
    { key: "chatbot.quick.portfolio" },
    { key: "chatbot.quick.contact" },
    { key: "chatbot.quick.services" },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleOpen = () => {
    setIsOpen(true);
    if (!hasOpened) {
      setHasOpened(true);
      const welcomeText = lang === 'ar' 
        ? "أهلاً وسهلاً بك! 👋 معك مدير المبيعات في Suriix.\nيسعدني جداً مساعدتك في اختيار وتصميم الحل الرقمي الأنسب لنمو مشروعك وزيادة مبيعاتك. كيف يمكنني خدمتك اليوم؟"
        : lang === 'zh'
        ? "您好，欢迎！👋 我是 Suriix 的销售经理。\n很高兴为您提供专业的数字解决方案咨询，协助打造高转化率的网站与品牌。今天有什么可以帮您的？"
        : "Hello & welcome! 👋 I am the Sales Manager at Suriix.\nI'd be thrilled to consult with you on building high-converting websites and digital solutions tailored to scale your business. How can I help you today?";
      setMessages([{ role: "bot", text: welcomeText }]);
    }
  };

  const getSmartLocalResponse = (text: string, currentLang: string): string => {
    const lower = text.toLowerCase().trim();

    if (
      lower.includes("سعر") ||
      lower.includes("أسعار") ||
      lower.includes("باقة") ||
      lower.includes("باقات") ||
      lower.includes("pricing") ||
      lower.includes("package") ||
      lower.includes("套餐") ||
      lower.includes("价格")
    ) {
      if (currentLang === "ar") {
        return `أهلاً بك! بصفتي مدير المبيعات في Suriix، يسعدني أن أصمم لك الخيار الأكثر جدوى لاستثمارك 💼\n\nنحن نقدم 3 باقات استراتيجية تتناسب مع مرحلة نمو مشروعك:\n\n📦 1. باقة Start:\nممتازة للمشاريع الناشئة والصفحات التعريفية السريعة والمركزة.\n\n📈 2. باقة Growth (الأكثر طلباً 🌟):\nموقع متكامل حتى 5 صفحات، مصمم خصيصاً لزيادة تحويل الزوار إلى عملاء مع تحسين كامل للـ SEO.\n\n🚀 3. باقة Premium:\nحلول مخصصة وشاملة للشركات الكبرى، تشمل أتمتة الذكاء الاصطناعي وأنظمة إدارية فائقة الأداء.\n\nما هو مجال مشروعك القادم لأرشح لك الباقة الأنسب بدقة؟`;
      } else if (currentLang === "zh") {
        return `您好！作为 Suriix 的销售经理，我很高兴为您量身定制最符合投入产出比的方案 💼\n\n我们提供 3 款针对不同成长阶段的套餐：\n\n📦 1. Start 套餐：适合初创项目与单页快速上线。\n📈 2. Growth 套餐（最受欢迎🌟）：多达 5 页的定制型高转化率网站与 SEO 优化。\n🚀 3. Premium 套餐：企业级高定解决方案与 AI 自动化系统。\n\n请问您的项目属于什么行业？我可以为您精准推荐！`;
      }
      return `Hello! As the Sales Manager at Suriix, I'd be glad to recommend the most profitable option for your investment 💼\n\nWe offer 3 strategic packages:\n\n📦 1. Start Package: Perfect for startups & high-converting landing pages.\n📈 2. Growth Package (Most Popular 🌟): Complete 5-page website engineered for maximum conversion & SEO.\n🚀 3. Premium Package: Tailored corporate solutions with advanced AI automations.\n\nWhat industry is your project in? I can help tailor the perfect setup!`;
    }

    if (
      lower.includes("أعمال") ||
      lower.includes("سابقة") ||
      lower.includes("معرض") ||
      lower.includes("portfolio") ||
      lower.includes("project") ||
      lower.includes("作品")
    ) {
      if (currentLang === "ar") {
        return `سعيد باهتمامك برؤية أعمالنا! 🎨\nفي Suriix، قمنا بتنفيذ هويات رقمية ومواقع استثنائية لشركات في هولندا والسعودية واليمن والخليج، وحققنا لعملائنا معدلات تحويل مبيعات مرتفعة (تصل إلى +340%).\n\nتفضل بتصفح قسم 'أعمالنا' بالصفحة، أو أخبرني عن نشاطك التجاري لأرسل لك نماذج مشاريع مشابهة لمجالك عبر واتساب فوراً 📲`;
      }
      return `Delighted by your interest in our portfolio! 🎨\nAt Suriix, we have crafted custom digital platforms for clients in Europe & the Middle East with exceptional growth rates (up to 340% sales increase).\n\nBrowse our Portfolio section on the site, or tell me your industry and I'll send relevant live samples to your WhatsApp!`;
    }

    if (
      lower.includes("خدم") ||
      lower.includes("ماذا تقدم") ||
      lower.includes("service") ||
      lower.includes("what do you do") ||
      lower.includes("服务")
    ) {
      if (currentLang === "ar") {
        return `في Suriix، نركز كفريق مبيعات وتطوير على تحقيق نتيجة واحدة: زيادة نمو أرباحك وتواجدك الرقمي 🚀\n\nخدماتنا الأساسية تشمل:\n💻 1. تصميم وتطوير المواقع والمتاجر الإلكترونية فائقة السرعة.\n🎨 2. بناء الهوية البصرية والوجهة التجارية المتكاملة.\n⚡ 3. أتمتة الأعمال وأنظمة الذكاء الاصطناعي.\n📈 4. تحسين محركات البحث SEO والتسويق الرقمي.\n\nأي من هذه الخدمات يمثل أولوية لمشروعك الآن؟`;
      }
      return `At Suriix, our sales & engineering teams focus on one goal: accelerating your digital revenue 🚀\n\nOur core services include:\n💻 1. High-Performance Web & E-Commerce Development\n🎨 2. Visual Identity & Brand Strategy\n⚡ 3. AI Automation & Custom Workflows\n📈 4. Advanced SEO & Growth Marketing\n\nWhich service is your top priority right now?`;
    }

    if (
      lower.includes("تواصل") ||
      lower.includes("اتصل") ||
      lower.includes("واتس") ||
      lower.includes("contact") ||
      lower.includes("whatsapp") ||
      lower.includes("联系")
    ) {
      if (currentLang === "ar") {
        return `أنا جاهز تماماً للبدء معك! 📞\nيمكننا مناقشة التفاصيل الفنية والمالية لمشروعك مباشرة ونجهز لك عرض سعر مخصص خلال دقائق.\n\nاضغط على زر 'تحدث مع خبير حقيقي (واتساب)' بالأسفل أو تواصل معي عبر الرقم: 967780930635+ وسأكون معك خطوة بخطوة 🤝`;
      }
      return `I am fully ready to assist you! 📞\nWe can discuss technical & pricing details directly to prepare a custom proposal for your project.\n\nClick the "Talk to a human (WhatsApp)" button below or reach me directly at +967780930635!`;
    }

    // Default friendly response for any other query
    if (currentLang === "ar") {
      return `أهلاً بك! يسعدني تواصلك معي مباشرة 👋\nبصفتي مدير المبيعات في Suriix، أضمن لك الحصول على حل رقمي مبتكر يناسب ميزانيتك ويرفع مبيعاتك.\n\nأخبرني، ما هي تفاصيل مشروعك الحالي أو الفكرة التي ترغب في تحويلها إلى موقع أو متجر ناجح؟`;
    }
    return `Welcome! Great connecting with you 👋\nAs the Sales Manager at Suriix, I ensure you receive an innovative digital solution that fits your budget & drives revenue.\n\nTell me, what are the details of your current project or idea?`;
  };

  const generateAIResponse = async (userText: string, chatHistory: Message[]): Promise<string> => {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

      const validHistory = [...chatHistory];
      // Gemini strictly requires the first message to be from the 'user'
      while (validHistory.length > 0 && validHistory[0].role === "bot") {
        validHistory.shift();
      }

      const mergedContents: { role: string; parts: { text: string }[] }[] = [];
      
      for (const msg of validHistory) {
        const role = msg.role === "bot" ? "model" : "user";
        if (mergedContents.length > 0 && mergedContents[mergedContents.length - 1].role === role) {
          mergedContents[mergedContents.length - 1].parts[0].text += "\n" + msg.text;
        } else {
          mergedContents.push({ role, parts: [{ text: msg.text }] });
        }
      }

      // Add current user input
      if (mergedContents.length > 0 && mergedContents[mergedContents.length - 1].role === "user") {
        mergedContents[mergedContents.length - 1].parts[0].text += "\n" + userText;
      } else {
        mergedContents.push({ role: "user", parts: [{ text: userText }] });
      }

      // Inject system prompt into the first user message to guarantee compatibility
      if (mergedContents.length > 0) {
        mergedContents[0].parts[0].text = `[System Instructions: ${systemPrompt}]\n\nUser Input: ` + mergedContents[0].parts[0].text;
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: mergedContents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000,
          }
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.warn("API Call status not ok, falling back to smart local response:", data);
        return getSmartLocalResponse(userText, lang);
      }

      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      }
      return getSmartLocalResponse(userText, lang);
    } catch (error) {
      console.warn("AI Network Error, using smart local response:", error);
      return getSmartLocalResponse(userText, lang);
    }
  };

  const processUserMessage = async (userText: string) => {
    if (!userText.trim() || isLoading) return;
    
    setInput("");
    const currentHistory = [...messages];
    
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setIsLoading(true);

    const response = await generateAIResponse(userText, currentHistory);
    
    setMessages((prev) => [
      ...prev,
      { role: "bot", text: response },
    ]);
    setIsLoading(false);
  };

  const handleSend = () => {
    processUserMessage(input);
  };

  const handleQuickReply = (key: string) => {
    // If the translation key exists, use it. Otherwise use a fallback (we only care to trigger the AI).
    const fallbackText = lang === 'ar' ? "أخبرني المزيد" : "Tell me more";
    const userText = t(key) !== key ? t(key) : fallbackText;
    processUserMessage(userText);
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
            {/* Pulse indicator */}
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
            className="fixed bottom-6 z-50 w-[340px] max-h-[500px] flex flex-col glass-strong rounded-2xl neon-border overflow-hidden shadow-2xl"
            style={{ [isRtl ? "left" : "right"]: "1.5rem" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/30 gradient-purple">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Headset className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary-foreground">
                    {lang === 'ar' ? 'مستشار المبيعات | Suriix' : lang === 'zh' ? '销售经理 | Suriix' : 'Sales Manager | Suriix'}
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
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[250px] max-h-[350px] custom-scrollbar">
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
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="px-3 py-2 rounded-xl glass neon-border text-foreground rounded-bl-sm">
                    <Loader2 className="w-4 h-4 text-primary animate-spin" />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
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

            {/* Quick replies (only show if few messages to save space) */}
            {messages.length < 3 && !isLoading && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {quickReplies.map((qr) => (
                  t(qr.key) !== qr.key ? (
                    <button
                      key={qr.key}
                      onClick={() => handleQuickReply(qr.key)}
                      className="px-3 py-1.5 rounded-full text-xs glass neon-border text-primary hover:bg-primary/10 transition-colors"
                    >
                      {t(qr.key)}
                    </button>
                  ) : null
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-4 pb-4 pt-1">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder={t("chatbot.placeholder")}
                  disabled={isLoading}
                  className="flex-1 px-3 py-2 rounded-xl bg-secondary/50 border border-border/50 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/50 disabled:opacity-50"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading}
                  className="p-2 rounded-xl gradient-purple text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
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
