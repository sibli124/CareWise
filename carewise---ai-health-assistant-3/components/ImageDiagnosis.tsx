import React, { useState, useCallback, ChangeEvent } from 'react';
import { getMockImageAnalysis } from '../services/geminiService';
import { LoadingSpinner } from './LoadingSpinner';
import { Alert } from './Alert';
import { ImagePreview } from './ImagePreview';
import { ShareButtons } from './ShareButtons';
import { ImageAnalysisData } from '../types';
import { MAX_IMAGE_UPLOADS, MOCK_IMAGE_ANALYSIS_DISCLAIMER } from '../constants';
import { useLanguage } from '../languageContext'; // Import useLanguage

interface ImageDiagnosisProps {
  onAnalysisComplete: () => void;
}

export const ImageDiagnosis: React.FC<ImageDiagnosisProps> = ({ onAnalysisComplete }) => {
  const { t } = useLanguage(); 
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [analysisResult, setAnalysisResult] = useState<ImageAnalysisData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showTip, setShowTip] = useState<boolean>(false);
  const [imageFeedbackSubmitted, setImageFeedbackSubmitted] = useState<boolean>(false);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      const currentCount = uploadedImages.length;
      const filesToAdd = filesArray.slice(0, MAX_IMAGE_UPLOADS - currentCount);
      
      if (filesArray.length > filesToAdd.length) {
         setError(t.maxImagesError.replace('{MAX_IMAGE_UPLOADS}', MAX_IMAGE_UPLOADS.toString()).replace('{excessCount}', (filesArray.length - filesToAdd.length).toString()));
      }

      if (filesToAdd.length > 0) {
        setUploadedImages(prevImages => [...prevImages, ...filesToAdd]);
        const newPreviews = filesToAdd.map(file => URL.createObjectURL(file));
        setImagePreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
      }
    }
    if(event.target) event.target.value = '';
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(imagePreviews[index]);
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    if (uploadedImages.length -1 === 0) { 
        setAnalysisResult(null);
        setImageFeedbackSubmitted(false); 
    }
    setError(null);
  };

  const clearAllImages = () => {
    imagePreviews.forEach(url => URL.revokeObjectURL(url));
    setUploadedImages([]);
    setImagePreviews([]);
    setAnalysisResult(null);
    setImageFeedbackSubmitted(false);
    setError(null);
  };

  const handleSubmit = useCallback(async () => {
    if (uploadedImages.length === 0) {
      setError(t.uploadAtLeastOneImageError);
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    setImageFeedbackSubmitted(false); // Reset feedback

    try {
      const result = await getMockImageAnalysis(uploadedImages);
      if (result.observations.toLowerCase().includes("error") || result.observations.toLowerCase().includes("hiccup") || result.observations.toLowerCase().includes("longer than expected") || result.observations.toLowerCase().includes("api key not configured") || result.observations.toLowerCase().includes("service configuration")) {
        setError(result.observations); // Display the user-friendly error from the service
        setAnalysisResult(null);
      } else {
        setAnalysisResult(result);
        onAnalysisComplete();
      }
    } catch (err) { // Should be less likely if service handles its errors
      setError(err instanceof Error ? err.message : t.imageAnalysisError);
    } finally {
      setIsLoading(false);
    }
  }, [uploadedImages, onAnalysisComplete, t]);

  const handleFeedbackClick = () => {
    setImageFeedbackSubmitted(true);
    // In a real app, you might send this feedback to a server
  };

  return (
    <section id="image-diagnosis" className="p-4 sm:p-6 bg-white shadow-xl rounded-xl border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 sm:w-8 sm:h-8 text-accent mr-2 sm:mr-3">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
        <h3 className="text-xl sm:text-2xl font-semibold text-accent-dark">{t.imageDiagnosisTitle}</h3>
        </div>
        <button
          onClick={() => setShowTip(!showTip)}
          className="p-1 text-teal-500 hover:text-teal-700 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-300"
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
        <div className="text-sm text-gray-600 mb-4 bg-teal-50 p-3 rounded-md border border-teal-200 shadow-sm">
          <p>
            <strong>{t.imageDiagnosisTipTitle}</strong> {t.imageDiagnosisTipContent.replace('{MAX_IMAGE_UPLOADS}', MAX_IMAGE_UPLOADS.toString())}
          </p>
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700">
              {t.uploadImagesLabel}
            </label>
            <span className="text-xs text-gray-500">
              {t.imagesSelectedCount.replace('{count}', uploadedImages.length.toString()).replace('{max}', MAX_IMAGE_UPLOADS.toString())}
            </span>
          </div>
          <input
            type="file"
            id="imageUpload"
            multiple
            accept="image/*,.heic,.heif"
            onChange={handleImageChange}
            disabled={isLoading || uploadedImages.length >= MAX_IMAGE_UPLOADS}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-white hover:file:bg-accent-dark cursor-pointer disabled:opacity-50"
            aria-label={`${t.uploadImagesLabel}, maximum ${MAX_IMAGE_UPLOADS}`}
          />
        </div>

        {imagePreviews.length > 0 && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
              {imagePreviews.map((previewUrl, index) => (
                <ImagePreview key={index} src={previewUrl} onRemove={() => removeImage(index)} altText={`${t.uploadImagesLabel} ${index + 1}`} />
              ))}
            </div>
            <button
              type="button"
              onClick={clearAllImages}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium rounded-md text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 transition duration-150"
            >
              {t.clearAllImagesButton}
            </button>
          </>
        )}
        
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading || uploadedImages.length === 0}
          className="w-full flex items-center justify-center px-4 py-2.5 sm:px-6 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-lg shadow-sm text-white bg-accent hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-dark disabled:bg-gray-300 disabled:cursor-not-allowed transition duration-150"
        >
          {isLoading ? (
            <>
              <LoadingSpinner size="sm" />
              <span className="ml-2">{t.analyzingImagesButton}</span>
            </>
          ) : (
            t.analyzeImagesButton
          )}
        </button>
      </div>

      {error && <Alert type="error" message={error} onClose={() => setError(null)} />}

      {analysisResult && !isLoading && (
        <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-teal-50 border border-teal-200 rounded-lg">
          <h4 className="text-lg sm:text-xl font-semibold text-accent-dark mb-2">{t.mockAnalysisResultTitle}</h4>
          <p className="text-sm sm:text-base text-gray-700 mb-2 whitespace-pre-wrap">{analysisResult.observations}</p>
          <div className="my-3 p-3 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 text-xs sm:text-sm">
            <p className="font-bold">{t.disclaimerLabel}</p>
            <p>{analysisResult.disclaimer}</p>
          </div>
          <div className="text-sm sm:text-base text-gray-600 mb-4">
            {t.mockConfidenceLevel} <span className="font-bold text-accent">{analysisResult.confidence}%</span>
          </div>
          
          <div className="mt-6 pt-4 border-t border-teal-100">
            {!imageFeedbackSubmitted ? (
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
          
          <ShareButtons resultText={`CareWise Mock Image Analysis:\nObservations: ${analysisResult.observations}\nConfidence: ${analysisResult.confidence}%\nDisclaimer: ${MOCK_IMAGE_ANALYSIS_DISCLAIMER}`} />
        </div>
      )}
      {/* Removed empathetic brand message new div */}
    </section>
  );
};