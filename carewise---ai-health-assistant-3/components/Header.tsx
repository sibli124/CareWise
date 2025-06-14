
import React from 'react';
import { useLanguage } from '../languageContext'; // Import useLanguage

interface HeaderProps {
  onOpenEmailModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenEmailModal }) => {
  const { lang, setLang, t, availableLanguages } = useLanguage();

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLang(event.target.value);
  };

  return (
    <header className="bg-gradient-to-r from-primary to-accent text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
        <div className="flex items-center">
          {/* Reverted to SVG heart icon for reliability */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="w-8 h-8 sm:w-10 sm:h-10 text-white mr-2 sm:mr-3"
            role="img"
            aria-label={t.logoAltText}
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.218l-.022.012-.007.004-.004.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{t.appName}</h1>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-3">
          <p className="text-xs sm:text-sm italic hidden md:block">{t.appTagline}</p>
          
          <button
            onClick={onOpenEmailModal}
            className="p-2 rounded-full hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label={t.subscribeForUpdates}
            title={t.subscribeForUpdates}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
          </button>

          <div className="relative">
            <select
              value={lang}
              onChange={handleLanguageChange}
              className="p-1.5 rounded-md border-transparent bg-white/10 hover:bg-white/20 text-white text-xs focus:ring-2 focus:ring-white/50 focus:outline-none appearance-none pr-6"
              aria-label={t.languageOptions}
              title={t.languageOptions}
            >
              {availableLanguages.map(language => (
                <option key={language.code} value={language.code} className="text-gray-800 bg-white">
                  {language.name}
                </option>
              ))}
            </select>
             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-white">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.516 7.548c.436-.446 1.043-.48 1.576 0L10 10.405l2.908-2.857c.533-.48 1.141-.446 1.574 0 .436.445.408 1.197 0 1.615-.406.418-4.695 4.502-4.695 4.502a1.095 1.095 0 0 1-1.576 0S4.94 9.581 4.534 9.163c-.409-.418-.436-1.17 0-1.615z"/></svg>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
