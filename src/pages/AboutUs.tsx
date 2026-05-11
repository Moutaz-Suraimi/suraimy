import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { ArrowLeft, Users, Eye, Target, Cpu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import FooterSection from "@/components/FooterSection";
import { useEffect } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const AboutUs = () => {
  const { t, lang, setLang, langLabels, langOrder } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = lang === "ar" ? "من نحن | Suriix" : "About Us | Suriix";
    window.scrollTo(0, 0);
  }, [lang]);

  const texts = {
    ar: {
      title: "من نحن",
      subtitle: "نحن في Suriix نبني المستقبل الرقمي للأعمال من خلال الابتكار والذكاء الاصطناعي",
      sections: [
        {
          icon: <Users className="w-6 h-6 text-primary" />,
          title: "منصة Suriix",
          content: "Suriix هي وكالة رقمية متكاملة تقدم حلولاً برمجية وتسويقية متطورة. نحن لا نبيع مجرد خدمات، بل نبني لك حضوراً رقمياً متكاملاً ونساعدك في نمو أعمالك لتتصدر المنافسة في العالم الرقمي المتسارع."
        },
        {
          icon: <Eye className="w-6 h-6 text-primary" />,
          title: "رؤيتنا",
          content: "رؤيتنا هي أن نصبح الشريك الرقمي الأول للشركات الطموحة في المنطقة العربية والعالم، من خلال تحويل الأفكار التقليدية إلى مشاريع تقنية رائدة تتميز بالتصميم العصري والأداء الاستثنائي."
        },
        {
          icon: <Target className="w-6 h-6 text-primary" />,
          title: "أهدافنا",
          content: "نهدف إلى تمكين الشركات، سواء الناشئة أو الكبيرة، من تحقيق أهدافها الربحية والتوسعية. نحن نركز على تحسين تجربة المستخدم، وزيادة معدلات التحويل، وبناء هوية بصرية راسخة تدوم طويلاً."
        },
        {
          icon: <Cpu className="w-6 h-6 text-primary" />,
          title: "الذكاء الاصطناعي والتقنيات",
          content: "نعتمد في Suriix على أحدث تقنيات الويب والذكاء الاصطناعي لأتمتة العمليات، وتقديم تحليلات دقيقة للسوق، وتطوير واجهات تفاعلية ذكية تتكيف مع سلوك المستخدم لضمان أعلى مستويات الكفاءة."
        }
      ]
    },
    en: {
      title: "About Us",
      subtitle: "At Suriix, we build the digital future of businesses through innovation and AI",
      sections: [
        {
          icon: <Users className="w-6 h-6 text-primary" />,
          title: "Suriix Platform",
          content: "Suriix is a full-service digital agency offering cutting-edge software and marketing solutions. We don't just sell services; we build a complete digital presence for you and help grow your business to lead the competition in the fast-paced digital world."
        },
        {
          icon: <Eye className="w-6 h-6 text-primary" />,
          title: "Our Vision",
          content: "Our vision is to become the premier digital partner for ambitious companies in the Arab region and the world, by transforming traditional ideas into pioneering tech projects characterized by modern design and exceptional performance."
        },
        {
          icon: <Target className="w-6 h-6 text-primary" />,
          title: "Our Goals",
          content: "We aim to empower businesses, whether startups or large enterprises, to achieve their profitability and expansion goals. We focus on improving user experience, increasing conversion rates, and building a lasting visual identity."
        },
        {
          icon: <Cpu className="w-6 h-6 text-primary" />,
          title: "AI and Technologies",
          content: "At Suriix, we rely on the latest web technologies and artificial intelligence to automate processes, provide accurate market analysis, and develop smart interactive interfaces that adapt to user behavior to ensure the highest levels of efficiency."
        }
      ]
    },
    zh: {
      title: "关于我们",
      subtitle: "在Suriix，我们通过创新和人工智能构建企业的数字未来",
      sections: [
        {
          icon: <Users className="w-6 h-6 text-primary" />,
          title: "Suriix平台",
          content: "Suriix是一家提供尖端软件和营销解决方案的全方位数字服务代理机构。我们不只是销售服务；我们为您建立完整的数字存在，并帮助您的业务在快节奏的数字世界中领先于竞争对手。"
        },
        {
          icon: <Eye className="w-6 h-6 text-primary" />,
          title: "我们的愿景",
          content: "我们的愿景是成为阿拉伯地区及全球雄心勃勃的公司的首选数字合作伙伴，通过将传统理念转化为以现代设计和卓越性能为特征的先锋科技项目。"
        },
        {
          icon: <Target className="w-6 h-6 text-primary" />,
          title: "我们的目标",
          content: "我们旨在赋能企业，无论是初创公司还是大型企业，实现其盈利和扩张目标。我们专注于改善用户体验，提高转化率，并建立持久的视觉形象。"
        },
        {
          icon: <Cpu className="w-6 h-6 text-primary" />,
          title: "AI与技术",
          content: "在Suriix，我们依靠最新的网络技术和人工智能来自动化流程，提供准确的市场分析，并开发适应用户行为的智能交互界面，以确保最高水平的效率。"
        }
      ]
    }
  };

  const currentTexts = texts[lang as keyof typeof texts];

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

      <main className="flex-1 max-w-4xl mx-auto px-6 py-16 w-full">
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
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-primary/10 text-primary mb-6 ring-1 ring-primary/20 shadow-[0_0_30px_rgba(var(--primary),0.2)]">
            <Users className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#26163c] dark:text-white mb-4 tracking-tight">
            {currentTexts.title}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {currentTexts.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-strong rounded-3xl neon-border p-8 md:p-12 mb-12 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -z-10" />
          
          <div className="grid sm:grid-cols-2 gap-8">
            {currentTexts.sections.map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 rounded-2xl glass neon-border hover:bg-primary/5 transition-all duration-300 flex flex-col items-start gap-4"
              >
                <div className="p-3 rounded-xl glass neon-border group-hover:scale-110 transition-transform duration-300">
                  {section.icon}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {section.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                    {section.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
      
      <FooterSection />
    </div>
  );
};

export default AboutUs;
