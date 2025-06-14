
import React from 'react';
import { useLanguage } from '../languageContext';

interface ImagePreviewProps {
  src: string;
  altText: string;
  onRemove: () => void;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ src, altText, onRemove }) => {
  const { t } = useLanguage();
  return (
    <div className="relative group border border-gray-200 rounded-lg overflow-hidden shadow">
      <img src={src} alt={altText} className="w-full h-48 object-cover" />
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-700"
        aria-label={t.imagePreviewRemoveAlt}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};
