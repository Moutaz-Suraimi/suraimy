import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import SEO from '@/components/SEO';

const SuriixStore = () => {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  return (
    <div className="min-h-screen bg-transparent flex flex-col justify-between">
      <SEO />
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 gradient-text">
            {isAr ? "متجر سوريكس" : "Suriix Store"}
          </h1>
          
          <div className="text-2xl sm:text-3xl font-bold mb-6 text-purple-400 border border-purple-500/30 bg-purple-500/10 rounded-2xl px-8 py-5 inline-block shadow-lg shadow-purple-500/15 animate-pulse">
            {isAr ? "قريباً 🚀" : "Coming Soon 🚀"}
          </div>
          
          <p className="text-lg md:text-xl text-muted-foreground mt-4 max-w-2xl mx-auto font-medium leading-relaxed">
            {isAr 
              ? "قريباً سيتم إطلاق متجر سوريكس ليقدم أفضل الحلول الرقمية، المواقع الجاهزة، والنماذج البرمجية المتطورة! ترقبوا الإطلاق الكبير." 
              : "Suriix Store will be launching soon to deliver premier digital solutions, turn-key websites, and cutting-edge software templates! Stay tuned."}
          </p>
        </motion.div>
      </main>

      <FooterSection />
    </div>
  );
};

export default SuriixStore;
