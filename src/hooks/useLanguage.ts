import { useState, useEffect, createContext, useContext } from 'react';
import { Language, Translations, detectLanguage, getTranslations } from '@/lib/i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

export const LanguageContext = createContext<LanguageContextType | null>(null);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    // Fallback for when context is not available
    const [language, setLanguage] = useState<Language>(() => {
      const saved = localStorage.getItem('cosmic-garden-lang');
      return (saved as Language) || detectLanguage();
    });
    
    const t = getTranslations(language);
    
    return { language, setLanguage, t };
  }
  return context;
};

export const useLanguageProvider = () => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('cosmic-garden-lang');
    return (saved as Language) || detectLanguage();
  });

  useEffect(() => {
    localStorage.setItem('cosmic-garden-lang', language);
  }, [language]);

  const t = getTranslations(language);

  return { language, setLanguage, t };
};
