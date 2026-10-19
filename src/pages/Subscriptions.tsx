import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import SubscriptionsSection from "@/components/SubscriptionsSection";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

const Subscriptions = () => {
  const { lang } = useLanguage();

  return (
    <>
      <SEO
        title={lang === "ar" ? "الاشتراكات الرقمية | Suriix" : "Digital Subscriptions | Suriix"}
        description={
          lang === "ar"
            ? "احصل على أفضل الاشتراكات الرقمية عبر Suriix — Netflix، ChatGPT، Canva، Adobe وغيرها بأفضل الأسعار."
            : "Get the best digital subscriptions via Suriix — Netflix, ChatGPT, Canva, Adobe and more at the best prices."
        }
      />
      <Navbar />
      <main className="min-h-screen pt-24">
        <SubscriptionsSection lang={lang} />
      </main>
      <FooterSection />
    </>
  );
};

export default Subscriptions;
