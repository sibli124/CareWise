import React, { useState, useCallback } from 'react';
import { HealthTopicResult, HealthFact, WebSource, YouTubeVideo } from '../types';
import { getMockHealthInformation } from '../services/geminiService';
import { LoadingSpinner } from './LoadingSpinner';
import { Alert } from './Alert';
import { FeatureSection } from '../constants';
import { useLanguage } from '../languageContext';

export const HealthEducationHub: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchResult, setSearchResult] = useState<HealthTopicResult | null>(null);
  const [showTip, setShowTip] = useState<boolean>(false);

  const handleSearch = useCallback(async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchTerm.trim()) {
      setSearchResult(null);
      setError(null); // Clear previous errors or no results message
      return;
    }
    setIsLoading(true);
    setError(null);
    setSearchResult(null);

    try {
      const result = await getMockHealthInformation(searchTerm);
      if (result) {
        setSearchResult(result);
      } else {
        setError(t.healthEducationNoResults.replace('{searchTerm}', searchTerm));
      }
    } catch (err: any) {
      setError(t.healthEducationSearchError);
      console.error("Error fetching health information:", err);
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, t]);

  const renderKeyFacts = (facts: HealthFact[]) => (
    <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-gray-700">
      {facts.map(fact => <li key={fact.id}>{fact.text}</li>)}
    </ul>
  );

  const renderWebSources = (sources: WebSource[]) => (
    <div className="space-y-2">
      {sources.map(source => (
        <a
          key={source.id}
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-3 bg-white hover:bg-gray-100 rounded-md border border-gray-200 transition-colors"
        >
          <p className="font-semibold text-primary hover:underline text-sm sm:text-base">{source.title}</p>
          {source.displayUrl && <p className="text-xs text-gray-500">{source.displayUrl}</p>}
        </a>
      ))}
    </div>
  );

  const renderYouTubeVideos = (videos: YouTubeVideo[]) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {videos.map(video => (
        <a
          key={video.id}
          href={`https://www.youtube.com/watch?v=${video.videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block group"
        >
          <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            {video.thumbnailUrl ? (
              <img src={video.thumbnailUrl} alt={video.title} className="w-full h-auto aspect-video object-cover" />
            ) : (
              <div className="w-full h-auto aspect-video bg-gray-200 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9A2.25 2.25 0 0 0 13.5 5.25h-9A2.25 2.25 0 0 0 2.25 7.5v9A2.25 2.25 0 0 0 4.5 18.75Z" />
                </svg>
              </div>
            )}
            <div className="p-3">
              <p className="font-semibold text-sm text-gray-800 group-hover:text-primary transition-colors">{video.title}</p>
              {video.duration && <p className="text-xs text-gray-500 mt-1">{video.duration}</p>}
            </div>
          </div>
        </a>
      ))}
    </div>
  );

  return (
    <section id={FeatureSection.HealthEducation} className="p-4 sm:p-6 bg-white shadow-xl rounded-xl border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 sm:w-8 sm:h-8 text-indigo-500 mr-2 sm:mr-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
          </svg>
          <h3 className="text-xl sm:text-2xl font-semibold text-indigo-700">{t.healthEducationTitle}</h3>
        </div>
        <button
          onClick={() => setShowTip(!showTip)}
          className="p-1 text-indigo-500 hover:text-indigo-700 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-300"
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
        <div className="text-sm text-gray-600 mb-4 bg-indigo-50 p-3 rounded-md border border-indigo-200 shadow-sm">
          <p><strong>{t.healthEducationHubTipTitle}</strong> {t.healthEducationHubTipContent}</p>
        </div>
      )}

      <form onSubmit={handleSearch} className="mb-6">
        <label htmlFor="health-search" className="sr-only">{t.searchHealthTopicsPlaceholder}</label>
        <div className="flex gap-2">
          <input
            type="search"
            id="health-search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-4 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors bg-white text-gray-700 placeholder-gray-500"
            placeholder={t.searchHealthTopicsPlaceholder}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !searchTerm.trim()}
            className="px-4 py-2.5 sm:px-6 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? <LoadingSpinner size="sm" /> : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            )}
          </button>
        </div>
      </form>

      {isLoading && <div className="flex justify-center my-8"><LoadingSpinner size="lg" color="text-indigo-600" /></div>}
      {error && <Alert type="warning" message={error} onClose={() => setError(null)} />}
      
      {!isLoading && searchResult && (
        <div className="space-y-6">
          <section>
            <h4 className="text-lg sm:text-xl font-semibold text-indigo-700 mb-2">{searchResult.topicName}</h4>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{searchResult.summary}</p>
          </section>

          {searchResult.keyFacts && searchResult.keyFacts.length > 0 && (
            <section>
              <h5 className="text-md sm:text-lg font-semibold text-indigo-600 mb-2">{t.healthEducationKeyFacts}</h5>
              {renderKeyFacts(searchResult.keyFacts)}
            </section>
          )}

          {searchResult.webSources && searchResult.webSources.length > 0 && (
            <section>
              <h5 className="text-md sm:text-lg font-semibold text-indigo-600 mb-2">{t.healthEducationLearnMore}</h5>
              {renderWebSources(searchResult.webSources)}
            </section>
          )}

          {searchResult.youtubeVideos && searchResult.youtubeVideos.length > 0 && (
            <section>
              <h5 className="text-md sm:text-lg font-semibold text-indigo-600 mb-2">{t.healthEducationVideos}</h5>
              {renderYouTubeVideos(searchResult.youtubeVideos)}
            </section>
          )}
        </div>
      )}
      {!isLoading && !searchResult && !error && searchTerm && (
        <p className="text-center text-gray-500 py-4">{t.healthEducationSearchPrompt}</p>
      )}

      {/* Removed empathetic brand message new div */}
    </section>
  );
};