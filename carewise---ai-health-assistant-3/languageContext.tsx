import React, { createContext, useContext, useState, useMemo, useCallback, useEffect } from "react";
import enTranslations from "./locales/en";
import bnTranslations from "./locales/bn";
import esTranslations from "./locales/es";
import { TranslationKeys } from "./locales/en"; 

interface LanguageContextType {
  lang: string;
  setLang: (lang: string) => void;
  t: TranslationKeys;
  availableLanguages: { code: string; name: string }[];
}

const languages = {
  en: enTranslations,
  bn: bnTranslations,
  es: esTranslations,
};

const availableLanguagesList = [
  { code: "en", name: "English" },
  { code: "bn", name: "বাংলা" },
  { code: "es", name: "Español" },
];

const CAREWISE_LANG_KEY = 'carewise-lang';

// Ensure all language files have the same keys as 'en' for consistency
if (process.env.NODE_ENV === 'development') {
  const enKeys = Object.keys(enTranslations);
  Object.entries(languages).forEach(([langCode, translations]) => {
    if (langCode === 'en') return;
    const langKeys = Object.keys(translations);
    if (enKeys.length !== langKeys.length) {
      console.warn(`Language '${langCode}' has a different number of keys than 'en'.`);
    }
    enKeys.forEach(key => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!(key in (translations as any))) {
        console.warn(`Language '${langCode}' is missing key: '${key}'`);
      }
    });
  });
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLangState] = useState<string>(() => {
    try {
      const savedLang = window.localStorage.getItem(CAREWISE_LANG_KEY);
      if (savedLang && languages[savedLang as keyof typeof languages]) {
        return savedLang;
      }
    } catch (error) {
      console.warn("Error reading language from localStorage:", error);
    }
    return 'en'; // Default language
  });

  const t = useMemo(() => languages[lang as keyof typeof languages] || enTranslations, [lang]);

  const setLang = useCallback((newLang: string) => {
    if (languages[newLang as keyof typeof languages]) {
      setLangState(newLang);
      try {
        window.localStorage.setItem(CAREWISE_LANG_KEY, newLang);
      } catch (error) {
        console.warn("Error saving language to localStorage:", error);
      }
    } else {
      console.warn(`Language ${newLang} not found, defaulting to English.`);
      setLangState('en');
      try {
        window.localStorage.setItem(CAREWISE_LANG_KEY, 'en');
      } catch (error) {
        console.warn("Error saving default language to localStorage:", error);
      }
    }
  }, []);
  
  // Effect to update state if localStorage changes from another tab
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === CAREWISE_LANG_KEY && event.newValue) {
        if (languages[event.newValue as keyof typeof languages]) {
          setLangState(event.newValue);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const contextValue = useMemo(() => ({
    lang,
    setLang,
    t,
    availableLanguages: availableLanguagesList,
  }), [lang, setLang, t]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};