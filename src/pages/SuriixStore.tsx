import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const SuriixStore = () => {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 pt-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 gradient-text">
          {isAr ? "متجر سوريكس" : "Suriix Store"}
        </h1>
        
        <div className="text-3xl font-bold mb-4 text-primary animate-pulse border border-primary/20 bg-primary/5 rounded-2xl p-6 inline-block">
          {isAr ? "قريباً" : "Coming Soon"}
        </div>
        
        <p className="text-lg md:text-xl text-muted-foreground mt-4 max-w-2xl mx-auto">
          {isAr 
            ? "نبذة عن هذه الخدمة: قريباً سيتم إطلاق متجر سوريكس ليقدم أفضل الحلول الرقمية، ترقبوا المزيد!" 
            : "A brief description of this service: Suriix Store will launch soon to provide the best digital solutions, stay tuned!"}
        </p>
      </motion.div>
    </div>
  );
};

export default SuriixStore;
