import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, Scale, Ban, Copyright, AlertOctagon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import FooterSection from "@/components/FooterSection";
import { useEffect } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const TermsOfUse = () => {
  const { t, lang, setLang, langLabels, langOrder } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = lang === "ar" ? "شروط الاستخدام | Suriix" : "Terms of Use | Suriix";
    window.scrollTo(0, 0);
  }, [lang]);

  const texts = {
    ar: {
      title: "شروط الاستخدام",
      subtitle: "يرجى قراءة هذه الشروط بعناية قبل استخدام خدمات منصة Suriix",
      lastUpdated: "آخر تحديث: مايو 2026",
      sections: [
        {
          icon: <Scale className="w-6 h-6 text-primary" />,
          title: "شروط استخدام المنصة",
          content: "باستخدامك لمنصة Suriix، فإنك توافق على الالتزام بهذه الشروط والأحكام. يحق لنا تعديل هذه الشروط في أي وقت، ويعتبر استمرارك في استخدام خدماتنا موافقة على التعديلات الجديدة. يجب أن تكون دقيقاً وصادقاً في جميع المعلومات المقدمة لنا."
        },
        {
          icon: <Ban className="w-6 h-6 text-primary" />,
          title: "منع إساءة الاستخدام",
          content: "يُمنع منعاً باتاً استخدام خدماتنا لأي أغراض غير قانونية أو ضارة أو تنتهك حقوق الآخرين. يشمل ذلك إرسال رسائل مزعجة (سبام)، محاولة اختراق أنظمتنا، أو نشر محتوى مسيء أو عنصري من خلال المنصات التي نطورها لك."
        },
        {
          icon: <Copyright className="w-6 h-6 text-primary" />,
          title: "حقوق الملكية",
          content: "جميع المحتويات والأكواد والتصاميم التي نقدمها في إطار مشاريعنا محفوظة الحقوق لمنصة Suriix حتى يتم تسليمها بالكامل ودفع كامل المستحقات. لا يحق للعميل إعادة بيع القوالب أو الأكواد الأساسية كمنتجات منفصلة دون موافقة خطية."
        },
        {
          icon: <AlertOctagon className="w-6 h-6 text-primary" />,
          title: "حدود المسؤولية",
          content: "نسعى جاهدين لتقديم أفضل الخدمات والنتائج، لكننا لا نضمن نتائج محددة (مثل أرقام المبيعات) كجزء من خدمات التسويق، لأنها تعتمد على ظروف السوق. منصة Suriix غير مسؤولة عن أي خسائر غير مباشرة أو تبعية ناتجة عن استخدام خدماتنا أو انقطاعها لظروف خارجة عن إرادتنا."
        }
      ]
    },
    en: {
      title: "Terms of Use",
      subtitle: "Please read these terms carefully before using Suriix platform services",
      lastUpdated: "Last Updated: May 2026",
      sections: [
        {
          icon: <Scale className="w-6 h-6 text-primary" />,
          title: "Platform Terms of Use",
          content: "By using the Suriix platform, you agree to be bound by these terms and conditions. We reserve the right to modify these terms at any time, and your continued use of our services constitutes acceptance of the new amendments. You must be accurate and truthful in all information provided to us."
        },
        {
          icon: <Ban className="w-6 h-6 text-primary" />,
          title: "Prevention of Abuse",
          content: "It is strictly prohibited to use our services for any illegal, harmful purposes or to violate the rights of others. This includes sending spam, attempting to hack our systems, or publishing offensive or racist content through the platforms we develop for you."
        },
        {
          icon: <Copyright className="w-6 h-6 text-primary" />,
          title: "Intellectual Property",
          content: "All content, codes, and designs we provide as part of our projects are copyrighted to Suriix until fully delivered and fully paid. The client does not have the right to resell base templates or codes as separate products without written consent."
        },
        {
          icon: <AlertOctagon className="w-6 h-6 text-primary" />,
          title: "Limitation of Liability",
          content: "We strive to provide the best services and results, but we do not guarantee specific outcomes (such as sales figures) as part of marketing services, as they depend on market conditions. Suriix is not liable for any indirect or consequential losses resulting from the use of our services or their interruption due to circumstances beyond our control."
        }
      ]
    },
    zh: {
      title: "使用条款",
      subtitle: "在使用Suriix平台服务之前，请仔细阅读这些条款",
      lastUpdated: "最后更新：2026年5月",
      sections: [
        {
          icon: <Scale className="w-6 h-6 text-primary" />,
          title: "平台使用条款",
          content: "使用Suriix平台即表示您同意遵守这些条款和条件。我们保留随时修改这些条款的权利，您继续使用我们的服务即构成对新修订的接受。您提供给我们的所有信息必须准确真实。"
        },
        {
          icon: <Ban className="w-6 h-6 text-primary" />,
          title: "防止滥用",
          content: "严禁将我们的服务用于任何非法、有害目的或侵犯他人权利。这包括发送垃圾邮件、试图黑入我们的系统，或通过我们为您开发的平台发布冒犯性或种族主义内容。"
        },
        {
          icon: <Copyright className="w-6 h-6 text-primary" />,
          title: "知识产权",
          content: "在我们项目范围内提供的所有内容、代码和设计均受Suriix版权保护，直到完全交付并全额付款。未经书面同意，客户无权将基础模板或代码作为独立产品转售。"
        },
        {
          icon: <AlertOctagon className="w-6 h-6 text-primary" />,
          title: "责任限制",
          content: "我们努力提供最好的服务和结果，但我们不保证作为营销服务一部分的特定结果（如销售数据），因为它们取决于市场条件。对于因使用我们的服务或因超出我们控制范围的情况而中断而导致的任何间接或后果性损失，Suriix不承担责任。"
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
            <FileText className="w-10 h-10" />
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
          
          <p className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-10">
            {currentTexts.lastUpdated}
          </p>
          
          <div className="space-y-12">
            {currentTexts.sections.map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: lang === 'ar' ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col md:flex-row gap-6 items-start"
              >
                <div className="p-4 rounded-2xl glass neon-border group-hover:bg-primary/5 group-hover:scale-105 transition-all duration-300 shrink-0">
                  {section.icon}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {section.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed text-base">
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

export default TermsOfUse;
