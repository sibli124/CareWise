
import React from 'react';
import { useLanguage } from '../languageContext'; // Import useLanguage

interface ShareButtonsProps {
  resultText: string;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ resultText }) => {
  const { t } = useLanguage(); // Get translation function

  const handleShare = (platform: 'email' | 'sms' | 'copy') => {
    const subject = "CareWise AI Analysis Result"; // This could also be translated if needed
    switch (platform) {
      case 'email':
        window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(resultText)}`;
        break;
      case 'sms':
        if (navigator.share) {
            navigator.share({
                title: subject,
                text: resultText,
            }).catch(console.error);
        } else {
            alert(t.smsShareNotSupported);
        }
        break;
      case 'copy':
        navigator.clipboard.writeText(resultText)
          .then(() => alert(t.resultCopied))
          .catch(err => console.error('Failed to copy: ', err));
        break;
    }
  };

  return (
    <div className="mt-4">
      <h5 className="text-md font-semibold text-gray-700 mb-2">{t.shareResultTitle}</h5>
      <div className="flex space-x-3">
        <button
          onClick={() => handleShare('email')}
          title={t.shareViaEmail}
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
          </svg>
        </button>
        <button
          onClick={() => handleShare('sms')}
          title={t.shareViaSMS}
          className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
             <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
          </svg>
        </button>
         <button
          onClick={() => handleShare('copy')}
          title={t.copyToClipboard}
          className="p-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 4.625-2.625 2.625m2.625-2.625V17.25m0-4.5V11.25m0 0H12m2.25 0H12m2.25 0V7.875m0 0H12m2.25 0V4.5m0 0H12m2.25 0H7.875M12 12.75h.008v.008H12v-.008Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
