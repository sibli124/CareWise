
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SymptomChecker } from './components/SymptomChecker';
import { ImageDiagnosis } from './components/ImageDiagnosis';
import { EmailCollectorModal } from './components/EmailCollectorModal';
import { DisclaimerAcceptanceModal } from './components/DisclaimerAcceptanceModal';
import { NavigationBar } from './components/NavigationBar';
import { NearbyTreatment } from './components/NearbyTreatment';
import { HealthEducationHub } from './components/HealthEducationHub'; 
// import { AdBanner } from './components/AdBanner'; // Removed AdBanner import
import { FeatureSection } from './constants';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useLanguage } from './languageContext'; 

const App: React.FC = () => {
  const { lang, t } = useLanguage(); 

  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailStore, setEmailStore] = useLocalStorage<{ email: string | null; prompted: boolean }>('carewise-email-info', { email: null, prompted: false });
  const [disclaimerAccepted, setDisclaimerAccepted] = useLocalStorage<boolean>('carewise-disclaimer-accepted', false);
  // const [adBannerDismissed, setAdBannerDismissed] = useLocalStorage<boolean>('carewise-ad-banner-main-dismissed', false); // Removed adBannerDismissed state

  const symptomCheckerRef = useRef<HTMLDivElement>(null);
  const imageDiagnosisRef = useRef<HTMLDivElement>(null);
  const nearbyTreatmentRef = useRef<HTMLDivElement>(null);
  const healthEducationRef = useRef<HTMLDivElement>(null);

  const sectionRefs = {
    [FeatureSection.SymptomChecker]: symptomCheckerRef,
    [FeatureSection.ImageDiagnosis]: imageDiagnosisRef,
    [FeatureSection.NearbyTreatment]: nearbyTreatmentRef,
    [FeatureSection.HealthEducation]: healthEducationRef,
  };

  const didMountRef = useRef(false); 

  useEffect(() => {
    if (didMountRef.current) {
      setDisclaimerAccepted(false);
    } else {
      didMountRef.current = true;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]); 


  const scrollToSection = useCallback((sectionId: FeatureSection) => {
    sectionRefs[sectionId]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [sectionRefs]);

  const handleSymptomCheckCompletion = useCallback(() => {
    if (!emailStore.prompted && !emailStore.email) {
      setShowEmailModal(true);
    }
    scrollToSection(FeatureSection.ImageDiagnosis);
  }, [emailStore, scrollToSection]);

  const handleImageAnalysisCompletion = useCallback(() => {
    scrollToSection(FeatureSection.NearbyTreatment);
  }, [scrollToSection]);

  const handleEmailSubmit = (email: string) => {
    setEmailStore({ email, prompted: true });
    setShowEmailModal(false);
  };

  const handleModalDismiss = () => {
    setEmailStore(prev => ({ ...prev, prompted: true }));
    setShowEmailModal(false);
  };

  const openEmailModalFromLink = () => {
    setShowEmailModal(true);
  };

  const handleAcceptDisclaimer = () => {
    setDisclaimerAccepted(true);
  };

  // const handleAdBannerClose = () => { // Removed handler for AdBanner
  //   setAdBannerDismissed(true);
  // };

  if (!disclaimerAccepted) {
    return <DisclaimerAcceptanceModal onAccept={handleAcceptDisclaimer} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-sky-100">
      <Header onOpenEmailModal={openEmailModalFromLink} />
      <main className="flex-grow container mx-auto px-4 py-8 space-y-12">
        <section id="mission" className="text-center p-6 bg-white shadow-lg rounded-xl border border-blue-200">
          <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">{t.missionShort}</p>
        </section>

        {/* Removed AdBanner rendering logic
        {!adBannerDismissed && ( 
          <AdBanner
            text={t.missionShort} 
            onClose={handleAdBannerClose}
            ariaLabel={t.adBannerAriaLabel}
            ariaLabelClose={t.adBannerCloseButtonLabel}
          />
        )}
        */}

        <div ref={symptomCheckerRef}>
          <SymptomChecker onCheckComplete={handleSymptomCheckCompletion} />
        </div>
        <div ref={imageDiagnosisRef}>
          <ImageDiagnosis onAnalysisComplete={handleImageAnalysisCompletion} />
        </div>
        
        <div ref={nearbyTreatmentRef}>
          <NearbyTreatment /> 
        </div>

        <div ref={healthEducationRef}>
          <HealthEducationHub />
        </div>

      </main>
      <Footer onOpenEmailModal={openEmailModalFromLink} />
      {showEmailModal && (
        <EmailCollectorModal
          onSubmit={handleEmailSubmit}
          onDismiss={handleModalDismiss}
        />
      )}
      <NavigationBar onNavigate={scrollToSection} />
    </div>
  );
};

export default App;
