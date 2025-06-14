
export interface SymptomAnalysisResult {
  possibleCauses: string[];
  advice: string;
  disclaimer: string;
}

export interface ImageAnalysisData {
  observations: string;
  confidence: number; // Percentage
  disclaimer: string;
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
  retrievedContext?: {
    uri: string;
    title: string;
  };
  // Add other types if needed, e.g., for Google Drive, etc.
}

export interface GroundingMetadata {
  searchQuery?: string;
  groundingAttributions?: GroundingChunk[]; // Older field name
  groundingChunks?: GroundingChunk[]; // Newer field name
}

export interface Candidate {
  content: {
    parts: Array<{ text?: string; inlineData?: any }>;
    role: string;
  };
  finishReason: string;
  index: number;
  safetyRatings: Array<{ category: string; probability: string }>;
  groundingMetadata?: GroundingMetadata;
}

// Simplified version, actual GenerateContentResponse is more complex
export interface GeminiApiResponse {
  text: string; // Direct text access
  candidates?: Candidate[]; // For more complex data like grounding
}

// For NearbyTreatment feature
export type PlaceType = 'Hospital' | 'Pharmacy' | 'Clinic' | 'Urgent Care';

export interface Place {
  id: string;
  name: string;
  type: PlaceType;
  address: string;
  distance?: string; // e.g., "1.2 km" - simulated
  rating?: number; // e.g., 4.5
  isOpenNow: boolean;
  isFreeClinic?: boolean; // For filtering
  phone?: string; // Optional
  latitude: number; // For mock map plotting or actual map integration
  longitude: number; // For mock map plotting or actual map integration
}

export interface FilterSet {
  freeClinics: boolean;
  pharmacies: boolean;
  urgentCare: boolean;
  openNow: boolean;
}

// For Health Education Hub feature
export interface HealthFact {
  id: string;
  text: string; // Could be localized if facts are predefined
}

export interface WebSource {
  id: string;
  title: string;
  url: string; // Real or mock URL
  displayUrl?: string; // Shortened or cleaned URL for display
}

export interface YouTubeVideo {
  id: string;
  title: string;
  videoId: string; // YouTube video ID
  thumbnailUrl?: string; // URL to a thumbnail image
  duration?: string; // e.g., "5:32"
}

export interface HealthTopicResult {
  id: string; // Unique ID for the topic
  topicName: string; // e.g., "Common Cold" - could be a key for localization
  summary: string; // Localized summary
  keyFacts: HealthFact[];
  webSources: WebSource[];
  youtubeVideos: YouTubeVideo[];
}
