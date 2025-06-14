
import React from 'react';
import { Disclaimer } from './Disclaimer'; 
import { useLanguage } from '../languageContext'; // Import useLanguage

interface DisclaimerAcceptanceModalProps {
  onAccept: () => void;
}

export const DisclaimerAcceptanceModal: React.FC<DisclaimerAcceptanceModalProps> = ({ onAccept }) => {
  const { t } = useLanguage(); // Get translation function

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-90 flex items-center justify-center p-4 z-[200] backdrop-blur-sm">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-2xl transform transition-all max-h-[90vh] flex flex-col">
        <div className="flex-shrink-0">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary-dark mb-4 text-center">{t.disclaimerModalTitle}</h2>
          <p className="text-sm text-gray-600 mb-1 text-center">{t.disclaimerModalIntro}</p>
           <hr className="my-4" />
        </div>

        <div className="overflow-y-auto flex-grow pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <Disclaimer />
        </div>
        
        <div className="mt-6 sm:mt-8 flex-shrink-0 border-t pt-6">
          <p className="text-xs text-gray-500 mb-4">
            {t.disclaimerModalAcknowledge}
          </p>
          <button
            onClick={onAccept}
            className="w-full px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark transition duration-150"
            aria-label={t.disclaimerModalAcceptButton}
          >
            {t.disclaimerModalAcceptButton}
          </button>
        </div>
      </div>
    </div>
  );
};
