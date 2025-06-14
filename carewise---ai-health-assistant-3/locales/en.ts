
// locales/en.ts
const en = {
  // Header
  appName: "CareWise",
  appTagline: "One app. Every person. Smarter health for all.",
  subscribeForUpdates: "Subscribe for updates",
  languageOptions: "Language options", // Used as title for select
  english: "English",
  bangla: "বাংলা",
  spanish: "Español",
  logoAltText: "CareWise Logo",

  // App Mission
  missionShort: "AI symptom insights & health information at your fingertips.",

  // Ad Banner - REMOVED
  // adBannerAriaLabel: "Promotional message",
  // adBannerCloseButtonLabel: "Dismiss this message",

  // Symptom Checker
  symptomCheckerTitle: "AI Symptom Checker",
  symptomCheckerTipTitle: "Tip:",
  symptomCheckerTipContent: "Describe your symptoms clearly, like “headache and fever for 2 days.” More details = better help from the AI.",
  symptomsLabel: "Your Symptoms:",
  symptomsPlaceholder: "e.g., I feel tired, have a cough, and a slight fever...",
  checkSymptomsButton: "Check Symptoms",
  analyzingButton: "Thinking for you...", // Updated
  analysisError: "Error analyzing symptoms: {message}. Please try again. If the issue persists, the service might be temporarily unavailable.",
  unknownAnalysisError: "An unknown error occurred while analyzing symptoms.",
  symptomsRequiredError: "Please describe your symptoms.",
  aiAnalysisTitle: "AI Analysis & Advice:",
  saveResultButton: "Save this result (Coming Soon)",
  saveResultDescription: "Your symptom history will be stored locally on your device.",

  // Image Diagnosis
  imageDiagnosisTitle: "Image-Based Analysis (Beta)",
  imageDiagnosisTipTitle: "Tip:",
  imageDiagnosisTipContent: "Upload up to {MAX_IMAGE_UPLOADS} clear photos (e.g., skin rash, eye redness) for a simulated visual analysis. Ensure good lighting.",
  uploadImagesLabel: "Upload Images:",
  imagesSelectedCount: "{count} / {max} selected",
  maxImagesError: "You can upload a maximum of {MAX_IMAGE_UPLOADS} images. {excessCount} file(s) were not added.",
  clearAllImagesButton: "Clear All Images",
  analyzeImagesButton: "Analyze Images (Mock)",
  analyzingImagesButton: "Looking at your images...", // Updated
  uploadAtLeastOneImageError: "Please upload at least one image.",
  imageAnalysisError: "An unexpected error occurred during image analysis.",
  mockAnalysisResultTitle: "Mock Analysis Results:",
  mockConfidenceLevel: "Mock Confidence Level:",
  disclaimerLabel: "Disclaimer:",
  
  // Share Buttons
  shareResultTitle: "Share Result:",
  shareViaEmail: "Share via Email",
  shareViaSMS: "Share via SMS / Other Apps",
  copyToClipboard: "Copy to Clipboard",
  resultCopied: "Result copied to clipboard!",
  smsShareNotSupported: "To share via SMS, please copy the text and paste it into your messaging app. Automatic SMS sharing is not supported on this browser/device.",


  // Nearby Treatment
  nearbyTreatmentTitle: "Nearby Treatment Locator",
  nearbyTreatmentTipTitle: "Tip:",
  nearbyTreatmentTipContent: "Use this feature to find healthcare facilities near your current location. Allow location access for best results.",
  findNearbyButton: "Find Nearby Care",
  loadingLocation: "Getting your location...",
  geolocationNotSupported: "Geolocation is not supported by your browser.",
  locationPermissionDenied: "Location access denied. Please enable it in your browser settings to find nearby places.",
  locationUnavailable: "Your location could not be determined.",
  locationRequestTimeout: "The request to get your location timed out.",
  locationErrorUnknown: "An unknown error occurred while trying to get your location.",
  mapPlaceholder: "Map area placeholder. Results will appear below.",
  yourLocationPin: "Your approximate location will be shown here.",
  filterFreeClinics: "Free Clinics",
  filterPharmacies: "Pharmacies",
  filterUrgentCare: "Urgent Care",
  filterOpenNow: "Open Now",
  getDirectionsButton: "Get Directions",
  openNow: "Open",
  closedNow: "Closed",
  noPlacesFound: "No places found matching your criteria. Try adjusting filters or ensuring location access is enabled.",
  locationAccessNeededTitle: "Location Access Needed",
  locationAccessDeniedMessage: "To find nearby treatment options, CareWise needs access to your location. Please enable location permissions in your browser or system settings and try again.",
  manualSearchPlaceholder: "Search city or ZIP code (Coming Soon)",
  retryLocationButtonLabel: "Retry Finding Location",


  // Health Education Hub
  healthEducationTitle: "Health Education Hub",
  healthEducationHubTipTitle: "Tip:", 
  healthEducationHubTipContent: "Enter a health topic, condition, or question to get information. Examples: 'common cold', 'how to manage stress', 'diabetes symptoms'.",
  searchHealthTopicsPlaceholder: "Search health topics (e.g., flu, headache)...",
  healthEducationSearchButton: "Search",
  healthEducationNoResults: "No information found for '{searchTerm}'. Please try a different topic.",
  healthEducationSearchError: "An error occurred while searching. Please try again.",
  healthEducationKeyFacts: "Key Facts:",
  healthEducationLearnMore: "Learn More (Sources):",
  healthEducationVideos: "Helpful Videos:",
  healthEducationSearchPrompt: "Enter a health topic above to get started.",

  // Footer
  footerSubscribe: "Subscribe for Updates",
  footerCopyright: "© {year} CareWise. All rights reserved.",
  footerDisclaimer1: "This is an AI-powered health assistant. Information provided is not medical advice.",
  footerDisclaimer2: "Always consult a healthcare professional for medical concerns.",
  footerLegacy: "Tech with purpose. This is my legacy.",

  // Email Modal
  emailModalTitle: "Stay Updated with CareWise",
  emailModalDescription: "Get updates on new features, health tips, and more. No spam, ever.",
  emailModalLabel: "Email Address:",
  emailModalPlaceholder: "you@example.com",
  emailModalSubmitButton: "Submit",
  emailModalNoThanksButton: "No, thanks",
  emailModalErrorEnterEmail: "Please enter your email address.",
  emailModalErrorInvalidEmail: "Please enter a valid email address.",
  emailModalSuccessTitle: "You're Subscribed!",
  emailModalSuccessMessage: "Great! We'll keep you updated with the latest from CareWise.",
  emailModalDoneButton: "Done",


  // Disclaimer Acceptance Modal
  disclaimerModalTitle: "Welcome to CareWise",
  disclaimerModalIntro: "Before you continue, please read and accept our terms and medical disclaimer.",
  disclaimerModalAcknowledge: "By clicking \"I Understand and Accept\", you acknowledge that you have read and understood the disclaimer. You agree that CareWise provides AI-generated information and suggestions for general guidance only, and is not a substitute for professional medical advice, diagnosis, or treatment. CareWise strongly recommends consulting a qualified healthcare professional for any medical concerns.",
  disclaimerModalAcceptButton: "I Understand and Accept",

  // Disclaimer Component (key parts)
  disclaimerTitle: "Medical Disclaimer & AI Assistant Role",
  disclaimerP1: "CareWise is an AI assistant designed to provide general health information and suggestions based on your input. It does NOT offer medical advice, diagnosis, or treatment.",
  disclaimerP2: "The information and suggestions generated by CareWise are for informational and educational purposes only. They should NOT be considered a substitute for consultation, diagnosis, or treatment from a qualified healthcare professional. CareWise strongly recommends consulting a healthcare professional for any health concerns.",
  disclaimerP3Title: "Beta/Simulated Features:",
  disclaimerP3Content: "Some features within CareWise, such as Image-Based Analysis during its beta phase, may provide a simulated analysis for demonstration or informational purposes only. Such outputs are NOT a real medical diagnosis. Always consult a qualified healthcare professional for any actual medical concerns or for a definitive diagnosis.",
  disclaimerP4: "Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read or received from CareWise.",
  disclaimerP5: "If you think you may have a medical emergency, call your doctor or emergency services immediately. Reliance on any information provided by CareWise is solely at your own risk.",
  disclaimerP6Support: "While CareWise is not a substitute for professional medical consultation, our aim is to provide information that helps you feel more informed and supported on your health journey.",
  disclaimerPartialTranslationNote: "(Note: The full detailed disclaimer is currently provided in English. Key summaries have been translated. Full translation is in progress.)",
  
  // Navigation Bar
  navSymptomCheck: "Symptom Check",
  navImageScan: "Image Scan",
  navFindCare: "Find Care",
  navLearn: "Learn",
  navComingSoonSuffix: "(Soon)",
  navMenuTitle: "Navigation Menu", // Title for the expanded FAB menu
  navToggleMenuOpen: "Open navigation menu",
  navToggleMenuClose: "Close navigation menu",

  // General UI
  tipGeneral: "Tip", 
  errorGeneral: "Error",
  loadingGeneral: "Loading...",
  submitGeneral: "Submit",
  closeButton: "Close",
  hideTip: "Hide tip",
  showTip: "Show tip",
  empatheticBrandMessage: "CareWise is not a doctor — but it helps you ask better questions.",
  alertErrorDefault: "An error occurred.",
  alertSuccessDefault: "Success!",
  alertWarningDefault: "Warning.",
  alertInfoDefault: "Please note.",
  dismissAlert: "Dismiss",

  imagePreviewRemoveAlt: "Remove image",

  // Feedback UI
  feedbackQuery: "Was this information helpful?",
  feedbackYes: "Yes",
  feedbackNo: "No",
  feedbackThanks: "Thanks for your feedback!",
};

export type TranslationKeys = typeof en;
export default en;
