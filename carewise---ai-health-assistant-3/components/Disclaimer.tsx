
import React from 'react';
import { useLanguage } from '../languageContext'; // Import useLanguage

export const Disclaimer: React.FC = () => {
  const { t, lang } = useLanguage(); // Get translation function and current language

  return (
    <div className="p-1 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 rounded-md">
      <div className="flex">
        <div className="flex-shrink-0 pt-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-yellow-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-bold">{t.disclaimerTitle}</h3>
          {(lang === 'bn' || lang === 'es') && (
            <p className="text-xs italic my-2 text-yellow-600">
              {t.disclaimerPartialTranslationNote}
            </p>
          )}
          <div className="text-sm space-y-2">
            <p>{t.disclaimerP1}</p>
            <p>{t.disclaimerP2}</p>
            <p>
              <strong className="font-semibold">{t.disclaimerP3Title}</strong> {t.disclaimerP3Content}
            </p>
            <p>{t.disclaimerP4}</p>
            <p>{t.disclaimerP5}</p>
            <p className="mt-3 pt-2 border-t border-yellow-300">
              {t.disclaimerP6Support}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
