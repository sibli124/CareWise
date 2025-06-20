
// locales/bn.ts
import { TranslationKeys } from './en'; // For type safety

const bn: TranslationKeys = {
  appName: "কেয়ারওয়াইজ",
  appTagline: "এক অ্যাপ। প্রতিটি মানুষ। সকলের জন্য স্মার্ট স্বাস্থ্য।",
  subscribeForUpdates: "আপডেট পেতে সাবস্ক্রাইব করুন",
  languageOptions: "ভাষা বিকল্প",
  english: "English",
  bangla: "বাংলা",
  spanish: "Español",
  logoAltText: "কেয়ারওয়াইজ লোগো",

  missionShort: "এআই চালিত লক্ষণ বিশ্লেষণ এবং স্বাস্থ্য তথ্য আপনার হাতের মুঠোয়।",
  
  // Ad Banner - REMOVED
  // adBannerAriaLabel: "প্রচারমূলক বার্তা",
  // adBannerCloseButtonLabel: "এই বার্তাটি খারিজ করুন",

  symptomCheckerTitle: "এআই লক্ষণ চেকার",
  symptomCheckerTipTitle: "পরামর্শ:",
  symptomCheckerTipContent: "আপনার লক্ষণগুলি পরিষ্কারভাবে বর্ণনা করুন, যেমন '২ দিন ধরে মাথাব্যথা এবং জ্বর'। আরও বিস্তারিত দিলে এআই আরও ভালোভাবে সাহায্য করতে পারবে।",
  symptomsLabel: "আপনার লক্ষণসমূহ:",
  symptomsPlaceholder: "যেমন, আমি ক্লান্ত বোধ করছি, কাশি এবং সামান্য জ্বর...",
  checkSymptomsButton: "লক্ষণ পরীক্ষা করুন",
  analyzingButton: "আপনার জন্য ভাবছি...", // Updated
  analysisError: "লক্ষণ বিশ্লেষণে ত্রুটি: {message}। অনুগ্রহ করে আবার চেষ্টা করুন। সমস্যাটি যদি থেকে যায়, পরিষেবাটি সাময়িকভাবে অনুপলব্ধ হতে পারে।",
  unknownAnalysisError: "লক্ষণ বিশ্লেষণের সময় একটি অজানা ত্রুটি ঘটেছে।",
  symptomsRequiredError: "অনুগ্রহ করে আপনার লক্ষণগুলি বর্ণনা করুন।",
  aiAnalysisTitle: "এআই বিশ্লেষণ ও পরামর্শ:",
  saveResultButton: "এই ফলাফল সংরক্ষণ করুন (শীঘ্রই আসছে)",
  saveResultDescription: "আপনার লক্ষণের ইতিহাস আপনার ডিভাইসে স্থানীয়ভাবে সংরক্ষণ করা হবে।",

  imageDiagnosisTitle: "ছবি-ভিত্তিক বিশ্লেষণ (বিটা)",
  imageDiagnosisTipTitle: "পরামর্শ:",
  imageDiagnosisTipContent: "{MAX_IMAGE_UPLOADS}টি পর্যন্ত পরিষ্কার ছবি আপলোড করুন (যেমন ত্বকের ফুসকুড়ি, চোখের লালভাব) একটি সিমুলেটেড ভিজ্যুয়াল বিশ্লেষণের জন্য। ভালো আলো নিশ্চিত করুন।",
  uploadImagesLabel: "ছবি আপলোড করুন:",
  imagesSelectedCount: "{count} / {max} নির্বাচিত",
  maxImagesError: "আপনি সর্বাধিক {MAX_IMAGE_UPLOADS}টি ছবি আপলোড করতে পারবেন। {excessCount}টি ফাইল যোগ করা হয়নি।",
  clearAllImagesButton: "সব ছবি মুছে ফেলুন",
  analyzeImagesButton: "ছবি বিশ্লেষণ করুন (মক)",
  analyzingImagesButton: "আপনার ছবিগুলো দেখছি...", // Updated
  uploadAtLeastOneImageError: "অনুগ্রহ করে অন্তত একটি ছবি আপলোড করুন।",
  imageAnalysisError: "ছবি বিশ্লেষণের সময় একটি অপ্রত্যাশিত ত্রুটি ঘটেছে।",
  mockAnalysisResultTitle: "মক বিশ্লেষণ ফলাফল:",
  mockConfidenceLevel: "মক আত্মবিশ্বাসের স্তর:",
  disclaimerLabel: "দাবিত্যাগ:",

  shareResultTitle: "ফলাফল শেয়ার করুন:",
  shareViaEmail: "ইমেলের মাধ্যমে শেয়ার করুন",
  shareViaSMS: "এসএমএস / অন্যান্য অ্যাপের মাধ্যমে শেয়ার করুন",
  copyToClipboard: "ক্লিপবোর্ডে অনুলিপি করুন",
  resultCopied: "ফলাফল ক্লিপবোর্ডে অনুলিপি করা হয়েছে!",
  smsShareNotSupported: "এসএমএসের মাধ্যমে শেয়ার করতে, অনুগ্রহ করে টেক্সটটি কপি করে আপনার মেসেজিং অ্যাপে পেস্ট করুন। এই ব্রাউজার/ডিভাইসে স্বয়ংক্রিয় এসএমএস শেয়ারিং সমর্থিত নয়।",

  nearbyTreatmentTitle: "কাছাকাছি চিকিৎসা কেন্দ্র",
  nearbyTreatmentTipTitle: "পরামর্শ:",
  nearbyTreatmentTipContent: "আপনার বর্তমান অবস্থানের কাছাকাছি স্বাস্থ্যসেবা সুবিধাগুলি খুঁজে পেতে এই বৈশিষ্ট্যটি ব্যবহার করুন। সেরা ফলাফলের জন্য অবস্থান অ্যাক্সেসের অনুমতি দিন।",
  findNearbyButton: "কাছাকাছি যত্ন খুঁজুন",
  loadingLocation: "আপনার অবস্থান জানা হচ্ছে...",
  geolocationNotSupported: "আপনার ব্রাউজারে জিওলোকেশন সমর্থিত নয়।",
  locationPermissionDenied: "অবস্থান অ্যাক্সেস অস্বীকার করা হয়েছে। কাছাকাছি স্থান খুঁজে পেতে দয়া করে আপনার ব্রাউজার সেটিংসে এটি সক্ষম করুন।",
  locationUnavailable: "আপনার অবস্থান নির্ধারণ করা যায়নি।",
  locationRequestTimeout: "আপনার অবস্থান জানার অনুরোধের সময়সীমা শেষ হয়েছে।",
  locationErrorUnknown: "আপনার অবস্থান জানার চেষ্টা করার সময় একটি অজানা ত্রুটি ঘটেছে।",
  mapPlaceholder: "মানচিত্র এলাকার স্থানধারক। ফলাফল নীচে প্রদর্শিত হবে।",
  yourLocationPin: "আপনার আনুমানিক অবস্থান এখানে দেখানো হবে।",
  filterFreeClinics: "বিনামূল্যে ক্লিনিক",
  filterPharmacies: "ফার্মেসী",
  filterUrgentCare: "জরুরী সেবা",
  filterOpenNow: "এখন খোলা",
  getDirectionsButton: "দিকনির্দেশ পান",
  openNow: "খোলা",
  closedNow: "বন্ধ",
  noPlacesFound: "আপনার মানদণ্ডের সাথে মেলে এমন কোনও স্থান পাওয়া যায়নি। ফিল্টারগুলি সামঞ্জস্য করার চেষ্টা করুন বা অবস্থান অ্যাক্সেস সক্ষম আছে কিনা তা নিশ্চিত করুন।",
  locationAccessNeededTitle: "অবস্থান অ্যাক্সেস প্রয়োজন",
  locationAccessDeniedMessage: "কাছাকাছি চিকিৎসার বিকল্পগুলি খুঁজে পেতে, কেয়ারওয়াইজের আপনার অবস্থানে অ্যাক্সেস প্রয়োজন। অনুগ্রহ করে আপনার ব্রাউজার বা সিস্টেম সেটিংসে অবস্থান অনুমতিগুলি সক্ষম করুন এবং আবার চেষ্টা করুন।",
  manualSearchPlaceholder: "শহর বা জিপ কোড অনুসন্ধান করুন (শীঘ্রই আসছে)",
  retryLocationButtonLabel: "অবস্থান খোঁজার আবার চেষ্টা করুন",
  
  healthEducationTitle: "স্বাস্থ্য শিক্ষা কেন্দ্র",
  healthEducationHubTipTitle: "পরামর্শ:",
  healthEducationHubTipContent: "তথ্য পেতে একটি স্বাস্থ্য বিষয়, অবস্থা বা প্রশ্ন লিখুন। উদাহরণ: 'সাধারণ সর্দি', 'কীভাবে মানসিক চাপ পরিচালনা করবেন', 'ডায়াবেটিসের লক্ষণ'।",
  searchHealthTopicsPlaceholder: "স্বাস্থ্য বিষয় অনুসন্ধান করুন (যেমন, ফ্লু, মাথাব্যথা)...",
  healthEducationSearchButton: "অনুসন্ধান করুন",
  healthEducationNoResults: "'{searchTerm}' এর জন্য কোনও তথ্য পাওয়া যায়নি। অনুগ্রহ করে অন্য একটি বিষয় চেষ্টা করুন।",
  healthEducationSearchError: "অনুসন্ধান করার সময় একটি ত্রুটি ঘটেছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
  healthEducationKeyFacts: "মূল তথ্য:",
  healthEducationLearnMore: "আরও জানুন (উৎস):",
  healthEducationVideos: "সহায়ক ভিডিও:",
  healthEducationSearchPrompt: "শুরু করতে উপরে একটি স্বাস্থ্য বিষয় লিখুন।",

  footerSubscribe: "আপডেটের জন্য সাবস্ক্রাইব করুন",
  footerCopyright: "© {year} কেয়ারওয়াইজ। সর্বস্বত্ব সংরক্ষিত।",
  footerDisclaimer1: "এটি একটি এআই-চালিত স্বাস্থ্য সহায়ক। প্রদত্ত তথ্য চিকিৎসা পরামর্শ নয়।",
  footerDisclaimer2: "চিকিৎসা সংক্রান্ত উদ্বেগের জন্য সর্বদা একজন স্বাস্থ্যসেবা পেশাদারের সাথে পরামর্শ করুন।",
  footerLegacy: "উদ্দেশ্য সহ প্রযুক্তি। এটাই আমার উত্তরাধিকার।",

  emailModalTitle: "কেয়ারওয়াইজের সাথে আপডেট থাকুন",
  emailModalDescription: "নতুন বৈশিষ্ট্য, স্বাস্থ্য টিপস এবং আরও অনেক কিছুর আপডেট পান। কোন স্প্যাম নেই, কখনও না।",
  emailModalLabel: "ইমেল ঠিকানা:",
  emailModalPlaceholder: "you@example.com",
  emailModalSubmitButton: "জমা দিন",
  emailModalNoThanksButton: "না, ধন্যবাদ",
  emailModalErrorEnterEmail: "অনুগ্রহ করে আপনার ইমেল ঠিকানা লিখুন।",
  emailModalErrorInvalidEmail: "অনুগ্রহ করে একটি বৈধ ইমেল ঠিকানা লিখুন।",
  emailModalSuccessTitle: "আপনি সাবস্ক্রাইব করেছেন!",
  emailModalSuccessMessage: "দারুণ! আমরা আপনাকে কেয়ারওয়াইজের সর্বশেষ খবরের সাথে আপডেট রাখব।",
  emailModalDoneButton: "সম্পন্ন",

  disclaimerModalTitle: "কেয়ারওয়াইজে স্বাগতম",
  disclaimerModalIntro: "চালিয়ে যাওয়ার আগে, অনুগ্রহ করে আমাদের শর্তাবলী এবং চিকিৎসা দাবিত্যাগ পড়ুন এবং গ্রহণ করুন।",
  disclaimerModalAcknowledge: "\"আমি বুঝি এবং গ্রহণ করি\" ক্লিক করার মাধ্যমে, আপনি স্বীকার করছেন যে আপনি দাবিত্যাগটি পড়েছেন এবং বুঝেছেন। আপনি সম্মত হন যে কেয়ারওয়াইজ শুধুমাত্র সাধারণ নির্দেশনার জন্য এআই-উত্পন্ন তথ্য এবং পরামর্শ প্রদান করে এবং এটি পেশাদার চিকিৎসা পরামর্শ, রোগ নির্ণয় বা চিকিৎসার বিকল্প নয়। কেয়ারওয়াইজ কোনও চিকিৎসা সংক্রান্ত উদ্বেগের জন্য একজন যোগ্য স্বাস্থ্যসেবা পেশাদারের সাথে পরামর্শ করার জন্য দৃঢ়ভাবে সুপারিশ করে।",
  disclaimerModalAcceptButton: "আমি বুঝি এবং গ্রহণ করি",

  disclaimerTitle: "চিকিৎসা দাবিত্যাগ এবং এআই সহকারীর ভূমিকা",
  disclaimerP1: "কেয়ারওয়াইজ একটি এআই সহকারী যা আপনার ইনপুটের উপর ভিত্তি করে সাধারণ স্বাস্থ্য তথ্য এবং পরামর্শ প্রদানের জন্য ডিজাইন করা হয়েছে। এটি চিকিৎসা পরামর্শ, রোগ নির্ণয় বা চিকিৎসা প্রদান করে না।",
  disclaimerP2: "কেয়ারওয়াইজ দ্বারা উত্পন্ন তথ্য এবং পরামর্শগুলি শুধুমাত্র তথ্যগত এবং শিক্ষাগত উদ্দেশ্যে। এগুলিকে কোনও যোগ্য স্বাস্থ্যসেবা পেশাদারের পরামর্শ, রোগ নির্ণয় বা চিকিৎসার বিকল্প হিসাবে বিবেচনা করা উচিত নয়। কেয়ারওয়াইজ কোনও স্বাস্থ্য সংক্রান্ত উদ্বেগের জন্য একজন স্বাস্থ্যসেবা পেশাদারের সাথে পরামর্শ করার জন্য দৃঢ়ভাবে সুপারিশ করে।",
  disclaimerP3Title: "বিটা/সিমুলেটেড বৈশিষ্ট্য:",
  disclaimerP3Content: "কেয়ারওয়াইজের মধ্যে কিছু বৈশিষ্ট্য, যেমন বিটা পর্যায়ে ছবি-ভিত্তিক বিশ্লেষণ, শুধুমাত্র প্রদর্শন বা তথ্যমূলক উদ্দেশ্যে একটি সিমুলেটেড বিশ্লেষণ প্রদান করতে পারে। এই ধরনের আউটপুটগুলি একটি বাস্তব চিকিৎসা تشخیص নয়। কোনও প্রকৃত চিকিৎসা উদ্বেগ বা একটি নির্দিষ্ট تشخیصের জন্য সর্বদা একজন যোগ্য স্বাস্থ্যসেবা পেশাদারের সাথে পরামর্শ করুন।",
  disclaimerP4: "কোনও চিকিৎসা পরিস্থিতি সম্পর্কে আপনার যে কোনও প্রশ্নের জন্য সর্বদা আপনার চিকিত্সক বা অন্যান্য যোগ্য স্বাস্থ্যসেবা প্রদানকারীর পরামর্শ নিন। কেয়ারওয়াইজ থেকে আপনি যা পড়েছেন বা পেয়েছেন তার কারণে কখনও পেশাদার চিকিৎসা পরামর্শ উপেক্ষা করবেন না বা এটি পেতে দেরি করবেন না।",
  disclaimerP5: "যদি আপনি মনে করেন আপনার কোনও মেডিকেল ইমার্জেন্সি হতে পারে, অবিলম্বে আপনার ডাক্তার বা জরুরি পরিষেবাগুলিতে কল করুন। কেয়ারওয়াইজ কর্তৃক প্রদত্ত কোনও তথ্যের উপর নির্ভরতা সম্পূর্ণরূপে আপনার নিজের ঝুঁকিতে।",
  disclaimerP6Support: "যদিও কেয়ারওয়াইজ পেশাদার চিকিৎসা পরামর্শের বিকল্প নয়, আমাদের লক্ষ্য হল এমন তথ্য প্রদান করা যা আপনাকে আপনার স্বাস্থ্য যাত্রায় আরও অবগত এবং সমর্থিত বোধ করতে সহায়তা করে।",
  disclaimerPartialTranslationNote: "(নোট: সম্পূর্ণ বিস্তারিত দাবিত্যাগ বর্তমানে ইংরেজিতে প্রদান করা হয়েছে। মূল সারাংশগুলি অনুবাদ করা হয়েছে। সম্পূর্ণ অনুবাদ প্রক্রিয়াধীন রয়েছে।)",

  navSymptomCheck: "লক্ষণ পরীক্ষা",
  navImageScan: "ছবি স্ক্যান",
  navFindCare: "চিকিৎসা খুঁজুন",
  navLearn: "শিখুন",
  navComingSoonSuffix: "(শীঘ্রই)",
  navMenuTitle: "নেভিগেশন মেনু",
  navToggleMenuOpen: "নেভিগেশন মেনু খুলুন",
  navToggleMenuClose: "নেভিগেশন মেনু বন্ধ করুন",

  tipGeneral: "পরামর্শ",
  errorGeneral: "ত্রুটি",
  loadingGeneral: "লোড হচ্ছে...",
  submitGeneral: "জমা দিন",
  closeButton: "বন্ধ করুন",
  hideTip: "পরামর্শ লুকান",
  showTip: "পরামর্শ দেখান",
  empatheticBrandMessage: "কেয়ারওয়াইজ ডাক্তার নয় — তবে এটি আপনাকে আরও ভালো প্রশ্ন করতে সাহায্য করে।",
  alertErrorDefault: "একটি ত্রুটি ঘটেছে।",
  alertSuccessDefault: "সফল!",
  alertWarningDefault: "সতর্কবার্তা।",
  alertInfoDefault: "অনুগ্রহ করে ಗಮನಿಸಿ।",
  dismissAlert: "খারিজ করুন",
  imagePreviewRemoveAlt: "ছবি সরান",
  
  // Feedback UI
  feedbackQuery: "এই তথ্য সহায়ক ছিল?",
  feedbackYes: "হ্যাঁ",
  feedbackNo: "না",
  feedbackThanks: "আপনার মতামতের জন্য ধন্যবাদ!",
};

export default bn;
