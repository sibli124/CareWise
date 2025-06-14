import React, { useState, useEffect, useCallback } from 'react';
import { Place, FilterSet, PlaceType } from '../types';
import { MOCK_PLACES_DATA, FeatureSection } from '../constants';
import { LoadingSpinner } from './LoadingSpinner';
import { Alert } from './Alert';
import { useLanguage } from '../languageContext';

export const NearbyTreatment: React.FC = () => {
  const { t } = useLanguage();
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<FilterSet>({
    freeClinics: false,
    pharmacies: false,
    urgentCare: false,
    openNow: false,
  });
  const [showTip, setShowTip] = useState<boolean>(false);
  const [permissionStatus, setPermissionStatus] = useState<'prompt' | 'granted' | 'denied' | 'error'>('prompt');
  const [attemptedLocationFetch, setAttemptedLocationFetch] = useState(false);
  const [manualSearchQuery, setManualSearchQuery] = useState('');


  const requestUserLocationAndFetchPlaces = useCallback(() => {
    setIsLoading(true);
    setError(null);
    setAttemptedLocationFetch(true);

    if (!navigator.geolocation) {
      setError(t.geolocationNotSupported);
      setPermissionStatus('error');
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setPermissionStatus('granted');
        // Simulate fetching places based on location - using mock data for now
        setPlaces(MOCK_PLACES_DATA);
        setIsLoading(false);
      },
      (geoError) => {
        switch (geoError.code) {
          case geoError.PERMISSION_DENIED:
            setError(t.locationPermissionDenied);
            setPermissionStatus('denied');
            break;
          case geoError.POSITION_UNAVAILABLE:
            setError(t.locationUnavailable);
            setPermissionStatus('error');
            break;
          case geoError.TIMEOUT:
            setError(t.locationRequestTimeout);
            setPermissionStatus('error');
            break;
          default:
            setError(t.locationErrorUnknown);
            setPermissionStatus('error');
            break;
        }
        setIsLoading(false);
      },
      { timeout: 10000 }
    );
  }, [t]);

  useEffect(() => {
    let currentPlaces = places;

    if (activeFilters.freeClinics) {
      currentPlaces = currentPlaces.filter(p => p.isFreeClinic);
    }
    if (activeFilters.pharmacies) {
      currentPlaces = currentPlaces.filter(p => p.type === 'Pharmacy');
    }
    if (activeFilters.urgentCare) {
      // Assuming 'Urgent Care' is a specific type, or you might filter by name/keywords
      currentPlaces = currentPlaces.filter(p => p.type === 'Urgent Care');
    }
    if (activeFilters.openNow) {
      currentPlaces = currentPlaces.filter(p => p.isOpenNow);
    }
    setFilteredPlaces(currentPlaces);
  }, [places, activeFilters]);

  const handleFilterToggle = (filterKey: keyof FilterSet) => {
    setActiveFilters(prev => ({ ...prev, [filterKey]: !prev[filterKey] }));
  };
  
  const getPlaceTypeIcon = (type: PlaceType) => {
    switch (type) {
      case 'Hospital': return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-500"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>; // Hospital (Red cross variant)
      case 'Pharmacy': return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-500"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>; // Pharmacy (Pill/capsule like)
      case 'Clinic': return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-500"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h.008v.008h-.008v-.008Zm0 0H20.625a1.125 1.125 0 0 0 1.125-1.125V14.25m-17.25 4.5h16.5M3.375 14.25V6.75A2.25 2.25 0 0 1 5.625 4.5h12.75a2.25 2.25 0 0 1 2.25 2.25v7.5" /></svg>; // Clinic (Building/Stethoscope like)
      case 'Urgent Care': return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-orange-500"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" /></svg>; // Urgent Care (Exclamation/Warning like)
      default: return null;
    }
  };

  const FilterChip: React.FC<{ label: string; active: boolean; onClick: () => void; }> = ({ label, active, onClick }) => (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-full border transition-colors duration-150
                  ${active ? 'bg-secondary text-white border-secondary-dark' : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'}`}
    >
      {label}
    </button>
  );

  return (
    <section id={FeatureSection.NearbyTreatment} className="p-4 sm:p-6 bg-white shadow-xl rounded-xl border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 sm:w-8 sm:h-8 text-secondary mr-2 sm:mr-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
          </svg>
          <h3 className="text-xl sm:text-2xl font-semibold text-secondary-dark">{t.nearbyTreatmentTitle}</h3>
        </div>
        <button
          onClick={() => setShowTip(!showTip)}
          className="p-1 text-green-500 hover:text-green-700 rounded-full focus:outline-none focus:ring-2 focus:ring-green-300"
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
        <div className="text-sm text-gray-600 mb-4 bg-green-50 p-3 rounded-md border border-green-200 shadow-sm">
          <p><strong>{t.nearbyTreatmentTipTitle}</strong> {t.nearbyTreatmentTipContent}</p>
        </div>
      )}

      {!attemptedLocationFetch && (
        <button
          onClick={requestUserLocationAndFetchPlaces}
          className="w-full flex items-center justify-center px-4 py-2.5 sm:px-6 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-lg shadow-sm text-white bg-secondary hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-dark transition duration-150 mb-4"
          disabled={isLoading}
        >
          {isLoading ? (
            <> <LoadingSpinner size="sm" /> <span className="ml-2">{t.loadingLocation}</span></>
          ) : (
             <><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg> {t.findNearbyButton}</>
          )}
        </button>
      )}

      {isLoading && <div className="flex justify-center my-6"><LoadingSpinner size="lg" color="text-secondary" /></div>}
      {error && <Alert type="error" message={error} onClose={() => {setError(null); if (permissionStatus === 'denied' || permissionStatus === 'error') setAttemptedLocationFetch(false);}} />}
      
      {attemptedLocationFetch && !isLoading && !error && permissionStatus !== 'denied' && (
        <>
          <div className="my-4 space-y-2 sm:space-y-0 sm:flex sm:flex-wrap sm:gap-2">
            <FilterChip label={t.filterFreeClinics} active={activeFilters.freeClinics} onClick={() => handleFilterToggle('freeClinics')} />
            <FilterChip label={t.filterPharmacies} active={activeFilters.pharmacies} onClick={() => handleFilterToggle('pharmacies')} />
            <FilterChip label={t.filterUrgentCare} active={activeFilters.urgentCare} onClick={() => handleFilterToggle('urgentCare')} />
            <FilterChip label={t.filterOpenNow} active={activeFilters.openNow} onClick={() => handleFilterToggle('openNow')} />
          </div>

          {/* Mock Map Area */}
          <div className="my-4 h-48 sm:h-64 bg-gray-200 rounded-lg flex items-center justify-center border border-gray-300">
            <div className="text-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto mb-2 opacity-50"><path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.37-1.625-.87L12.5 8.25m0 0L3.125 4.2C2.38 3.7 1.5 4.236 1.5 5.072V19.2c0 .836.88 1.37 1.625.87l7.5-3.75Z" /></svg>
              <p className="text-sm">{t.mapPlaceholder}</p>
              {userLocation && <p className="text-xs mt-1">{t.yourLocationPin}</p>}
            </div>
          </div>
          
          {/* Manual Search Placeholder */}
           <div className="my-4">
            <input
              type="text"
              value={manualSearchQuery}
              onChange={(e) => setManualSearchQuery(e.target.value)}
              placeholder={t.manualSearchPlaceholder}
              disabled // Keep disabled for now
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-secondary focus:border-secondary text-sm cursor-not-allowed bg-gray-100"
            />
          </div>


          {filteredPlaces.length > 0 ? (
            <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {filteredPlaces.map(place => (
                <div key={place.id} className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 pt-1">{getPlaceTypeIcon(place.type)}</div>
                    <div>
                      <h4 className="text-md font-semibold text-secondary-dark">{place.name}</h4>
                      <p className="text-xs text-gray-500">{place.type}</p>
                      <p className="text-sm text-gray-700 mt-1">{place.address}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                        {place.distance && <span>{place.distance}</span>}
                        {place.rating && <span>| ⭐ {place.rating}</span>}
                        <span>| <span className={place.isOpenNow ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>{place.isOpenNow ? t.openNow : t.closedNow}</span></span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-right">
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(place.name + ", " + place.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md text-white bg-secondary hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-secondary-dark"
                    >
                      {t.getDirectionsButton}
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 ml-1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-4">{t.noPlacesFound}</p>
          )}
        </>
      )}
      {attemptedLocationFetch && permissionStatus === 'denied' && (
         <div className="mt-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded-md">
            <p className="font-bold">{t.locationAccessNeededTitle}</p>
            <p>{t.locationAccessDeniedMessage}</p>
        </div>
      )}
      {/* Removed empathetic brand message new div */}
    </section>
  );
};