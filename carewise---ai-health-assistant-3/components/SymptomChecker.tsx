import React, { useState, useCallback } from 'react';
import { getSymptomsAnalysis } from '../services/geminiService';
import { LoadingSpinner } from './LoadingSpinner';
import { Alert } from './Alert';
import { MarkdownRenderer } from './MarkdownRenderer';
import { useLanguage } from '../languageContext'; // Import useLanguage

interface SymptomCheckerProps {
  onCheckComplete: () => void;
}

export const SymptomChecker: React.FC<SymptomCheckerProps> = ({ onCheckComplete }) => {
  const { t } = useLanguage(); 
  const [symptoms, setSymptoms] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showTip, setShowTip] = useState<boolean>(false);
  const [symptomFeedbackSubmitted, setSymptomFeedbackSubmitted] = useState<boolean>(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) {
      setError(t.symptomsRequiredError);
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    setSymptomFeedbackSubmitted(false); // Reset feedback on new submission

    try {
      const result = await getSymptomsAnalysis(symptoms);
      // Check if the result indicates an error message from the service itself
      if (result.toLowerCase().includes("error") || result.toLowerCase().includes("hiccup") || result.toLowerCase().includes("longer than expected") || result.toLowerCase().includes("api key not configured") || result.toLowerCase().includes("service configuration")) {
        setError(t.analysisError.replace('{message}', result));
        setAnalysisResult(null);
      } else {
        setAnalysisResult(result);
        onCheckComplete();
      }
    } catch (err: unknown) { 
      // This catch block might be less likely to be hit if geminiService handles its own errors and returns strings
      let message = t.unknownAnalysisError;
      if (err instanceof Error) {
        message = err.message;
      }
      setError(t.analysisError.replace('{message}', message));
    } finally {
      setIsLoading(false);
    }
  }, [symptoms, onCheckComplete, t]);

  const handleFeedbackClick = () => {
    setSymptomFeedbackSubmitted(true);
    // In a real app, you might send this feedback to a server
  };

  return (
    <section id="symptom-checker" className="p-4 sm:p-6 bg-white shadow-xl rounded-xl border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 sm:w-8 sm:h-8 text-primary mr-2 sm:mr-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" />
          </svg>
          <h3 className="text-xl sm:text-2xl font-semibold text-primary-dark">{t.symptomCheckerTitle}</h3>
        </div>
        <button
          onClick={() => setShowTip(!showTip)}
          className="p-1 text-blue-500 hover:text-blue-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
          aria-label={showTip ? t.hideTip : t.showTip}
          aria-expanded={showTip}
          title={showTip ? t.hideTip : t.showTip}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
      
      {showTip && (
        <div className="text-sm text-gray-600 mb-4 bg-blue-50 p-3 rounded-md border border-blue-200 shadow-sm">
          <p>
            <strong>{t.symptomCheckerTipTitle}</strong> {t.symptomCheckerTipContent}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 mb-1">
            {t.symptomsLabel}
          </label>
          <textarea
            id="symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            rows={5}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary transition duration-150 text-sm sm:text-base bg-white text-gray-700 placeholder-gray-500"
            placeholder={t.symptomsPlaceholder}
            disabled={isLoading}
            aria-label={t.symptomsLabel}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !symptoms.trim()}
          className="w-full flex items-center justify-center px-4 py-2.5 sm:px-6 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-lg shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark disabled:bg-gray-300 disabled:cursor-not-allowed transition duration-150"
        >
          {isLoading ? (
            <>
              <LoadingSpinner size="sm" />
              <span className="ml-2">{t.analyzingButton}</span>
            </>
          ) : (
            t.checkSymptomsButton
          )}
        </button>
      </form>

      {error && <Alert type="error" message={error} onClose={() => setError(null)} />}

      {analysisResult && !isLoading && (
        <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-white border border-sky-200 rounded-lg">
          <h4 className="text-lg sm:text-xl font-semibold text-primary-dark mb-3">{t.aiAnalysisTitle}</h4>
          <MarkdownRenderer content={analysisResult} />
          
          <div className="mt-6 pt-4 border-t border-sky-100">
            {!symptomFeedbackSubmitted ? (
              <div>
                <p className="text-sm text-gray-600 mb-2">{t.feedbackQuery}</p>
                <div className="flex space-x-3">
                  <button
                    onClick={handleFeedbackClick}
                    className="px-4 py-2 text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 border border-green-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-500 transition-colors"
                    aria-label={t.feedbackYes}
                  >
                    {t.feedbackYes}
                  </button>
                  <button
                    onClick={handleFeedbackClick}
                    className="px-4 py-2 text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 border border-red-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500 transition-colors"
                    aria-label={t.feedbackNo}
                  >
                    {t.feedbackNo}
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-green-600 font-medium">{t.feedbackThanks}</p>
            )}
          </div>
          <div className="mt-4 pt-4 border-t border-sky-200">
            <button
              type="button"
              disabled
              className="px-4 py-2 text-sm font-medium rounded-md text-gray-400 bg-gray-200 cursor-not-allowed"
              title={t.saveResultButton}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 inline-block mr-1 align-text-bottom">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              {t.saveResultButton}
            </button>
            <p className="text-xs text-gray-500 mt-1">{t.saveResultDescription}</p>
          </div>
        </div>
      )}
      {/* Removed empathetic brand message new div */}
    </section>
  );
};