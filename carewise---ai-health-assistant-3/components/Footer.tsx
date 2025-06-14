
import React from 'react';
import { useLanguage } from '../languageContext'; // Import useLanguage

interface FooterProps {
  onOpenEmailModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenEmailModal }) => {
  const { t } = useLanguage(); // Get translation function
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8 text-center">
      <div className="container mx-auto px-4">
        <p className="mb-3">
          <button 
            onClick={onOpenEmailModal}
            className="text-primary-light hover:text-white underline hover:no-underline transition-colors duration-150"
          >
            {t.footerSubscribe}
          </button>
        </p>
        <p className="text-sm">{t.footerCopyright.replace('{year}', currentYear.toString())}</p>
        <p className="text-xs mt-2">
          {t.footerDisclaimer1}
          <br /> 
          {t.footerDisclaimer2}
        </p>
        <p className="text-xs mt-1">{t.footerLegacy}</p>
      </div>
    </footer>
  );
};
