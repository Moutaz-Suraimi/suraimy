import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { readyWebsitesData } from "@/data/readyWebsites";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, CheckCircle2, ShoppingCart, Globe, Shield, Zap } from "lucide-react";
import FooterSection from "@/components/FooterSection";
import ScrollProgressBar from "@/components/ScrollProgressBar";

const ReadyWebsiteDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const product = readyWebsitesData.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">{isAr ? "الموقع غير موجود" : "Website Not Found"}</h1>
          <Button onClick={() => navigate("/")}>{isAr ? "العودة للرئيسية" : "Back to Home"}</Button>
        </div>
      </div>
    );
  }

  const handleBuy = () => {
    const message = isAr 
      ? `مرحباً، أرغب في شراء الموقع الجاهز: ${product.titleAr} بسعر $${product.price}`
      : `Hello, I'd like to purchase the ready website: ${product.title} for $${product.price}`;
    window.open(`https://wa.me/967780930635?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <ScrollProgressBar />
      
      {/* Top Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-border/50 py-4 px-6 md:px-12 flex justify-between items-center">
        <button 
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium"
        >
          {isAr ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
          {isAr ? "العودة للرئيسية" : "Back to Home"}
        </button>
        <div className="text-xl font-bold gradient-text tracking-wider">SURIIX</div>
      </nav>

      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="relative px-6 md:px-12 max-w-7xl mx-auto mt-8">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            {/* Left: Content */}
            <motion.div 
              initial={{ opacity: 0, x: isAr ? 30 : -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-start"
            >
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-3 py-1 text-sm">
                {isAr ? product.categoryAr : product.category}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {isAr ? product.titleAr : product.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {isAr ? product.descriptionAr : product.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-6 mb-8 p-6 glass rounded-2xl border-border/50 w-full">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{isAr ? "السعر" : "Price"}</p>
                  <div className="text-4xl font-bold gradient-text">${product.price}</div>
                </div>
                <div className="hidden sm:block w-px h-12 bg-border/50 mx-2" />
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span>{isAr ? "تصميم فريد - نسخة واحدة" : "Unique Design - Single Copy"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span>{isAr ? "تسليم وإعداد فوري" : "Instant Delivery & Setup"}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row w-full gap-4">
                <Button 
                  onClick={handleBuy}
                  size="lg" 
                  className="flex-1 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_30px_-5px_rgba(139,92,246,0.5)] transition-all h-14 text-lg"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {isAr ? "شراء وإطلاق الآن" : "Buy & Launch Now"}
                </Button>
                {product.demoUrl && (
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="flex-1 rounded-xl border-border hover:bg-primary/10 hover:text-primary transition-all h-14 text-lg"
                    onClick={() => window.open(product.demoUrl, "_blank")}
                  >
                    <Globe className="w-5 h-5 mr-2" />
                    {isAr ? "معاينة حية" : "Live Demo"}
                  </Button>
                )}
              </div>
            </motion.div>

            {/* Right: Mockup */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-2xl glass p-4 border border-border/50 neon-glow"
            >
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-auto rounded-xl shadow-2xl object-cover"
              />
              <Badge 
                className={`absolute top-8 ${isAr ? 'left-8' : 'right-8'} z-20 text-sm px-3 py-1 ${
                  product.status === 'Available' ? 'bg-green-500/20 text-green-400 border-green-500/50' :
                  product.status === 'Limited' ? 'bg-orange-500/20 text-orange-400 border-orange-500/50' :
                  'bg-red-500/20 text-red-400 border-red-500/50'
                }`}
                variant="outline"
              >
                {isAr ? product.statusAr : product.status}
              </Badge>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto mt-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{isAr ? "ماذا يتضمن هذا المشروع؟" : "What's Included?"}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {isAr ? "جميع مواقعنا الجاهزة تأتي مع الميزات التالية لضمان إطلاق ناجح لعملك." : "All our ready websites come with the following features to ensure a successful launch."}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(isAr ? product.featuresAr : product.features).map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-6 rounded-2xl border border-border/50 hover:border-primary/50 transition-colors flex flex-col items-center text-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">{feature}</h3>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
};

export default ReadyWebsiteDetails;
