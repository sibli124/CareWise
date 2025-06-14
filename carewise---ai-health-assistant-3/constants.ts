
import { Place, HealthTopicResult } from './types';

export const GEMINI_TEXT_MODEL = 'gemini-2.5-flash-preview-04-17';
export const GEMINI_VISION_MODEL = 'gemini-2.5-flash-preview-04-17'; // Vision capable model
export const IMAGEN_MODEL = 'imagen-3.0-generate-002'; // For pure image generation, not used here.

export const CAREWISE_GO_TO_PROMPT = "CareWise is an AI-powered mobile health assistant that lets anyone — especially in underserved communities — check their symptoms, upload health images, find local treatment, and learn about health in their language. No doctor visit needed. No data taken beyond what's necessary for the service. Just care, made wise.";

export const SYMPTOM_CHECKER_SYSTEM_INSTRUCTION = `You are CareWise, an AI-powered health assistant. Your primary goal is to help users understand potential causes for their symptoms by providing information and to suggest general, safe, and actionable advice.
Key Instructions:
1.  Medical Disclaimer: ALWAYS start your response with a clear disclaimer: "Important: I am an AI assistant. The information I provide is based on the symptoms you describe and is for general guidance only. I cannot make a medical diagnosis. My suggestions are not a substitute for professional medical advice. CareWise strongly recommends consulting a qualified healthcare professional if your symptoms are severe, worsen, or if you have any health concerns."
2.  Empathetic Tone: Use a calm, empathetic, and supportive tone.
3.  Symptom Analysis: Based on the user's input, list 2-3 potential, common conditions that might cause such symptoms. Avoid alarming or rare conditions unless the symptoms strongly suggest a serious issue that warrants immediate attention. Frame these as possibilities for discussion with a doctor.
4.  General Advice: For each potential condition, provide general, safe, self-care advice or suggest when to see a doctor. Examples: rest, hydration, over-the-counter remedies (mention specific types if appropriate, e.g., "pain relievers like ibuprofen or acetaminophen"), or lifestyle adjustments.
5.  Actionable Steps: Suggest clear next steps, such as monitoring symptoms, trying specific home care measures, or seeking medical attention.
6.  Urgency: If symptoms sound urgent (e.g., chest pain, difficulty breathing, severe bleeding), strongly advise seeking immediate medical help.
7.  No Personal Data Request: Do NOT ask for personally identifiable information (PII) beyond the symptoms described.
8.  Conciseness: Keep responses concise and easy to understand. Use bullet points or numbered lists for clarity.
9.  Focus: Stick to analyzing the provided symptoms. Do not go off-topic.
10. Final Reminder: End with a reminder to consult a doctor if symptoms persist or worsen, reinforcing that the AI's information is not a diagnosis.
Example user query: "I have a sore throat, runny nose, and a slight fever for two days."
Example of how to structure the response:
Important: I am an AI assistant. The information I provide is based on the symptoms you describe...

Based on your symptoms, here are a few possibilities for you to consider and discuss with a healthcare professional if needed, along with some general advice:

1.  **Common Cold:**
    *   **Could involve symptoms like:** Sore throat, runny nose, cough, mild fever, fatigue.
    *   **General advice:** Get plenty of rest, drink warm fluids (like tea with honey or broth), use a humidifier or take a steamy shower to ease congestion. Over-the-counter cold remedies might help manage symptoms.
    *   **Consider seeing a doctor if:** Symptoms last more than 10 days, fever is high or persistent, or you have difficulty breathing.

2.  **Allergies (Hay Fever):**
    *   **Could involve symptoms like:** Runny nose (often clear mucus), sneezing, itchy eyes, sometimes a scratchy throat. Fever is uncommon.
    *   **General advice:** Try to identify and avoid allergens. Over-the-counter antihistamines can help. Saline nasal rinses can clear nasal passages.
    *   **Consider seeing a doctor if:** Symptoms are severe, persistent, or don't respond to OTC treatments.

Please monitor your symptoms. If they worsen, don't improve in a few days, or if you have any concerns, it's best to consult a healthcare professional for a proper diagnosis and advice.
`;

export const IMAGE_ANALYSIS_SYSTEM_INSTRUCTION_MOCK = `You are CareWise, an AI assistant providing a *mock* analysis for uploaded images.
This is a demonstration feature. The analysis provided is NOT a real medical diagnosis and is for informational purposes only.
Based on the general appearance of common skin/eye conditions (this is a simulation):
- If the image shows redness and bumps, you might say: "The image appears to show some redness and raised bumps. In general, this could be indicative of a local irritation or mild allergic reaction. Common causes include contact dermatitis or insect bites. A healthcare professional can provide a proper assessment."
- If the image shows a mole, you might say: "The image shows a pigmented area. It's important for any new or changing moles to be evaluated by a dermatologist to rule out serious conditions. This simulated view is not a substitute for that."
- If it's an eye, you might say: "The eye appears red. This could be due to various factors like dry eyes, allergies, or conjunctivitis (pink eye). A doctor can determine the cause."

Always include:
1. A clear statement that this is a MOCK/SIMULATED analysis for informational purposes and NOT a diagnosis.
2. General observations (simulated).
3. A strong recommendation to consult a healthcare professional or dermatologist for any real concerns and for an actual diagnosis.
4. A mock confidence score between 60-85%, clearly stating this is also part of the simulation.
`;

export const MOCK_IMAGE_ANALYSIS_DISCLAIMER = "This is a simulated analysis based on visual patterns and is for informational purposes only. It is NOT a medical diagnosis. CareWise strongly recommends you consult a qualified healthcare professional for any health concerns or before making any decisions related to your health or treatment.";
export const MAX_IMAGE_UPLOADS = 3;

export enum FeatureSection {
  SymptomChecker = 'symptom-checker-section',
  ImageDiagnosis = 'image-diagnosis-section',
  NearbyTreatment = 'nearby-treatment-section',
  HealthEducation = 'health-education-section',
}

export const MOCK_PLACES_DATA: Place[] = [
  { id: '1', name: 'City General Hospital', type: 'Hospital', address: '123 Main St, Anytown, USA', distance: '0.8 km', rating: 4.5, isOpenNow: true, latitude: 34.0522, longitude: -118.2437 },
  { id: '2', name: 'Community Care Clinic', type: 'Clinic', address: '456 Oak Ave, Anytown, USA', distance: '1.2 km', rating: 4.2, isOpenNow: true, isFreeClinic: true, latitude: 34.0550, longitude: -118.2400 },
  { id: '3', name: 'Wellness Pharmacy', type: 'Pharmacy', address: '789 Pine Ln, Anytown, USA', distance: '1.5 km', rating: 4.8, isOpenNow: false, latitude: 34.0500, longitude: -118.2500 },
  { id: '4', name: 'Downtown Urgent Care', type: 'Urgent Care', address: '101 Central Sq, Anytown, USA', distance: '2.1 km', rating: 4.0, isOpenNow: true, latitude: 34.0580, longitude: -118.2450 },
  { id: '5', name: 'Northside Clinic', type: 'Clinic', address: '234 Elm Rd, Anytown, USA', distance: '3.5 km', rating: 3.9, isOpenNow: true, latitude: 34.0600, longitude: -118.2300 },
  { id: '6', name: 'Healing Hands Pharmacy', type: 'Pharmacy', address: '567 Maple Dr, Anytown, USA', distance: '0.5 km', rating: 4.9, isOpenNow: true, latitude: 34.0510, longitude: -118.2420 },
  { id: '7', name: 'St. Luke\'s Hospital', type: 'Hospital', address: '890 Birch St, Anytown, USA', distance: '4.0 km', rating: 4.3, isOpenNow: false, latitude: 34.0400, longitude: -118.2200 },
  { id: '8', name: 'Peoples Free Clinic', type: 'Clinic', address: '111 Charity Way, Anytown, USA', distance: '2.8 km', rating: 4.6, isOpenNow: true, isFreeClinic: true, latitude: 34.0450, longitude: -118.2600 },
  { id: '9', 'name': "QuickMed Urgent Care", 'type': "Urgent Care", 'address': "777 Rapid Ave, Anytown, USA", 'distance': "1.0 km", 'rating': 4.1, 'isOpenNow': false, latitude: 34.0533, longitude: -118.2467 },
  { id: '10', 'name': "Central Pharmacy", 'type': "Pharmacy", 'address': "Central Plaza, Anytown, USA", 'distance': "2.5 km", 'rating': 4.7, 'isOpenNow': true, latitude: 34.0570, longitude: -118.2390 }
];

export const MOCK_HEALTH_TOPICS_DATA: HealthTopicResult[] = [
  {
    id: 'common-cold',
    topicName: 'Common Cold', // This would be a key in a real i18n setup
    summary: 'The common cold is a viral infection that primarily affects your nose and throat (upper respiratory tract). It\'s usually harmless, although it might not feel that way.',
    keyFacts: [
      { id: 'ccf1', text: 'Caused by viruses, most commonly rhinoviruses.' },
      { id: 'ccf2', text: 'Symptoms include runny nose, sore throat, cough, congestion, sneezing, and mild body aches or headache.' },
      { id: 'ccf3', text: 'Spread through droplets in the air when someone who is sick coughs, sneezes or talks.' },
      { id: 'ccf4', text: 'No cure, but symptoms can be managed with rest, fluids, and over-the-counter medications.' },
      { id: 'ccf5', text: 'Antibiotics are not effective against cold viruses.' },
    ],
    webSources: [
      { id: 'ccw1', title: 'Common Cold - Mayo Clinic', url: 'https://www.mayoclinic.org/diseases-conditions/common-cold/symptoms-causes/syc-20351605', displayUrl: 'mayoclinic.org' },
      { id: 'ccw2', title: 'Common Colds: Protect Yourself and Others - CDC', url: 'https://www.cdc.gov/features/rhinoviruses/index.html', displayUrl: 'cdc.gov' },
    ],
    youtubeVideos: [
      { id: 'ccv1', title: 'What is a Common Cold? - Explained', videoId: 't_2aVqT0V0E', thumbnailUrl: 'https://i.ytimg.com/vi/t_2aVqT0V0E/hqdefault.jpg', duration: '3:45' },
      { id: 'ccv2', title: 'How To Get Rid Of A Cold FAST', videoId: '5R8At-S7_Wc', thumbnailUrl: 'https://i.ytimg.com/vi/5R8At-S7_Wc/hqdefault.jpg', duration: '7:12' },
    ],
  },
  {
    id: 'influenza',
    topicName: 'Influenza (Flu)',
    summary: 'Influenza, commonly known as the flu, is a contagious respiratory illness caused by influenza viruses. It can cause mild to severe illness, and at times can lead to death.',
    keyFacts: [
      { id: 'iff1', text: 'Symptoms are often more severe than a cold and can include fever, chills, muscle aches, cough, congestion, headache, and fatigue.' },
      { id: 'iff2', text: 'Annual vaccination is the best way to prevent the flu.' },
      { id: 'iff3', text: 'Antiviral drugs can treat flu illness if started early.' },
      { id: 'iff4', text: 'Most people recover in a few days to less than two weeks, but some can develop complications (like pneumonia).' },
    ],
    webSources: [
      { id: 'ifw1', title: 'Key Facts About Influenza (Flu) - CDC', url: 'https://www.cdc.gov/flu/about/keyfacts.htm', displayUrl: 'cdc.gov' },
      { id: 'ifw2', title: 'Influenza (flu) - World Health Organization', url: 'https://www.who.int/news-room/fact-sheets/detail/influenza-(seasonal)', displayUrl: 'who.int' },
    ],
    youtubeVideos: [
      { id: 'ifv1', title: 'The Difference Between a Cold and The Flu', videoId: 'PhxV_4jM_G0', thumbnailUrl: 'https://i.ytimg.com/vi/PhxV_4jM_G0/hqdefault.jpg', duration: '4:02' },
    ],
  },
  {
    id: 'headache',
    topicName: 'Headache',
    summary: 'A headache is pain in any region of the head. Headaches may occur on one or both sides of the head, be isolated to a certain location, radiate across the head from one point, or have a viselike quality.',
    keyFacts: [
      { id: 'hdf1', text: 'Common types include tension headaches, migraines, and cluster headaches.' },
      { id: 'hdf2', text: 'Triggers can vary widely, including stress, dehydration, lack of sleep, certain foods, and environmental factors.' },
      { id: 'hdf3', text: 'Most headaches aren\'t serious and can be treated with rest, hydration, and over-the-counter pain relievers.' },
      { id: 'hdf4', text: 'Seek medical attention for severe, sudden, or persistent headaches, or headaches accompanied by other concerning symptoms (e.g., fever, stiff neck, confusion, weakness).' },
    ],
    webSources: [
      { id: 'hdw1', title: 'Headache: Types, Causes, and Treatment - Medical News Today', url: 'https://www.medicalnewstoday.com/articles/73936', displayUrl: 'medicalnewstoday.com' },
      { id: 'hdw2', title: 'Migraine - The Migraine Trust', url: 'https://migrainetrust.org/understand-migraine/', displayUrl: 'migrainetrust.org' },
    ],
    youtubeVideos: [
      { id: 'hdv1', title: 'What Causes Headaches? - Emma Bryce', videoId: 'cv0JJA0x3Gk', thumbnailUrl: 'https://i.ytimg.com/vi/cv0JJA0x3Gk/hqdefault.jpg', duration: '5:15' },
    ],
  },
  {
    id: 'skin-rash',
    topicName: 'Skin Rash',
    summary: 'A skin rash is a noticeable change in the texture or color of your skin. Your skin may become itchy, bumpy, scaly, or otherwise irritated.',
    keyFacts: [
      { id: 'srf1', text: 'Many things can cause rashes, including allergies (contact dermatitis, eczema), infections (fungal, bacterial, viral), autoimmune conditions (psoriasis), and insect bites.' },
      { id: 'srf2', text: 'Symptoms vary widely depending on the cause, but can include redness, itching, blisters, bumps, or dry, scaly skin.' },
      { id: 'srf3', text: 'Treatment depends on the cause. Mild rashes may respond to home care like cool compresses and avoiding irritants.' },
      { id: 'srf4', text: 'See a doctor if a rash is widespread, painful, doesn’t improve with home care, or is accompanied by fever or other systemic symptoms.' },
    ],
    webSources: [
      { id: 'srw1', title: 'Skin Rashes: Types, Causes, Symptoms & Treatment - Cleveland Clinic', url: 'https://my.clevelandclinic.org/health/diseases/17413-skin-rashes', displayUrl: 'clevelandclinic.org' },
      { id: 'srw2', title: 'Eczema types: What are they? - National Eczema Association', url: 'https://nationaleczema.org/eczema/types-of-eczema/', displayUrl: 'nationaleczema.org' },
    ],
    youtubeVideos: [
      { id: 'srv1', title: 'What Causes Skin Rashes? | Dr. Ian Smith', videoId: '0gQQ5w30z9A', thumbnailUrl: 'https://i.ytimg.com/vi/0gQQ5w30z9A/hqdefault.jpg', duration: '2:30' },
    ],
  },
];
