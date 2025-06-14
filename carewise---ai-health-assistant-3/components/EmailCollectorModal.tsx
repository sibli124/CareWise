
import React, { useState } from 'react';
import { useLanguage } from '../languageContext'; // Import useLanguage

interface EmailCollectorModalProps {
  onSubmit: (email: string) => void;
  onDismiss: () => void;
}

export const EmailCollectorModal: React.FC<EmailCollectorModalProps> = ({ onSubmit, onDismiss }) => {
  const { t } = useLanguage(); 
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitted) return; // Prevent re-submission

    if (!email.trim()) {
      setError(t.emailModalErrorEnterEmail);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(t.emailModalErrorInvalidEmail);
      return;
    }
    
    setError('');
    setIsSubmitted(true); // Show success message

    // Call the original onSubmit (which saves and eventually closes modal via App.tsx) after a delay
    setTimeout(() => {
      onSubmit(email); 
    }, 2500); // User sees success message for 2.5 seconds
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-[100]">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-2xl w-full max-w-md transform transition-all">
        {isSubmitted ? (
          <>
            <h2 className="text-2xl font-semibold text-green-600 mb-4 text-center">{t.emailModalSuccessTitle}</h2>
            <p className="text-gray-700 mb-6 text-center">{t.emailModalSuccessMessage}</p>
            <button
              type="button"
              onClick={onDismiss} // Close button now directly dismisses
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:text-sm"
            >
              {t.emailModalDoneButton}
            </button>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-primary-dark">{t.emailModalTitle}</h2>
              <button onClick={onDismiss} className="text-gray-400 hover:text-gray-600" aria-label={t.closeButton}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-gray-600 mb-4">
              {t.emailModalDescription}
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email-collector" className="block text-sm font-medium text-gray-700">
                  {t.emailModalLabel}
                </label>
                <input
                  type="email"
                  id="email-collector"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder={t.emailModalPlaceholder}
                  required
                  disabled={isSubmitted}
                />
                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
              </div>
              <div className="flex flex-col sm:flex-row-reverse gap-3">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:w-auto sm:text-sm"
                  disabled={isSubmitted}
                >
                  {t.emailModalSubmitButton}
                </button>
                <button
                  type="button"
                  onClick={onDismiss}
                  className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  disabled={isSubmitted}
                >
                  {t.emailModalNoThanksButton}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};