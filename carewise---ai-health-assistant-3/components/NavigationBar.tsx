import React, { useState, useRef, useEffect } from 'react';
import { FeatureSection } from '../constants';
import { useLanguage } from '../languageContext'; // Import useLanguage

interface NavigationBarProps {
  onNavigate: (sectionId: FeatureSection) => void;
}

const NavMenuItem: React.FC<{
  label: string;
  icon: JSX.Element;
  onClick: () => void;
  isComingSoon?: boolean;
  comingSoonSuffix?: string;
}> = ({ label, icon, onClick, isComingSoon = false, comingSoonSuffix }) => {
  const fullLabel = isComingSoon ? `${label} ${comingSoonSuffix || ''}`.trim() : label;
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full text-left p-3 hover:bg-gray-100 focus:bg-gray-100 rounded-md transition-colors duration-150 group
                  ${isComingSoon ? 'text-gray-400 cursor-default' : 'text-gray-700 hover:text-primary focus:text-primary'}`}
      aria-label={fullLabel}
      disabled={isComingSoon}
    >
      <div className={`mr-3 ${isComingSoon ? 'opacity-50' : 'text-primary group-hover:text-accent-dark group-focus:text-accent-dark'}`}>
        {React.cloneElement(icon, { className: "w-5 h-5 sm:w-6 sm:h-6"})}
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium">{label}</span>
        {isComingSoon && comingSoonSuffix && <span className="text-[10px] opacity-70 leading-tight">{comingSoonSuffix}</span>}
      </div>
    </button>
  );
};

export const NavigationBar: React.FC<NavigationBarProps> = ({ onNavigate }) => {
  const { t } = useLanguage(); 
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavigate = (sectionId: FeatureSection) => {
    onNavigate(sectionId);
    setIsOpen(false); 
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const navItems = [
    { labelKey: 'navSymptomCheck', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" /></svg>, sectionId: FeatureSection.SymptomChecker },
    { labelKey: 'navImageScan', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>, sectionId: FeatureSection.ImageDiagnosis },
    { labelKey: 'navFindCare', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>, sectionId: FeatureSection.NearbyTreatment, isComingSoon: false },
    { labelKey: 'navLearn', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg>, sectionId: FeatureSection.HealthEducation, isComingSoon: false },
  ];

  return (
    <div className="fixed bottom-4 right-4 md:hidden z-40" ref={menuRef}>
      {isOpen && (
        <div 
            className="absolute bottom-16 right-0 mb-2 w-60 bg-white rounded-lg shadow-xl border border-gray-200 py-2 transition-all duration-300 ease-out transform scale-100 opacity-100 origin-bottom-right"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="fab-menu-button"
        >
          <div className="px-2 py-1 border-b border-gray-200">
             <span className="block text-sm font-semibold text-gray-700 px-2 py-1">{t.navMenuTitle}</span>
          </div>
          <div className="space-y-1 px-2 pt-1">
            {navItems.map(item => (
              <NavMenuItem
                key={item.sectionId}
                label={t[item.labelKey as keyof typeof t] || item.labelKey}
                icon={item.icon}
                onClick={() => handleNavigate(item.sectionId)}
                isComingSoon={item.isComingSoon}
                comingSoonSuffix={item.isComingSoon ? t.navComingSoonSuffix : undefined}
              />
            ))}
          </div>
        </div>
      )}
      <button
        id="fab-menu-button"
        onClick={toggleMenu}
        className="p-3 bg-accent text-white rounded-full shadow-lg hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-accent-dark focus:ring-offset-2 transition-transform duration-150 active:scale-95"
        aria-label={isOpen ? t.navToggleMenuClose : t.navToggleMenuOpen}
        title={isOpen ? t.navToggleMenuClose : t.navToggleMenuOpen}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>
    </div>
  );
};