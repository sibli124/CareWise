
import { GoogleGenAI, GenerateContentResponse, Part } from "@google/genai";
import { GEMINI_TEXT_MODEL, SYMPTOM_CHECKER_SYSTEM_INSTRUCTION, GEMINI_VISION_MODEL, IMAGE_ANALYSIS_SYSTEM_INSTRUCTION_MOCK, MOCK_IMAGE_ANALYSIS_DISCLAIMER, MOCK_HEALTH_TOPICS_DATA } from '../constants';
import { ImageAnalysisData, Candidate, HealthTopicResult } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY for Gemini is not set in environment variables.");
  // Potentially throw an error or handle this state in the UI
}

const ai = new GoogleGenAI({ apiKey: API_KEY || "MISSING_API_KEY" });

export const getSymptomsAnalysis = async (symptoms: string): Promise<string> => {
  if (!API_KEY) return "API Key not configured. Please contact support.";
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_TEXT_MODEL,
      contents: [{ role: "user", parts: [{text: symptoms}] }],
      config: {
        systemInstruction: SYMPTOM_CHECKER_SYSTEM_INSTRUCTION,
        temperature: 0.5, // Lower temperature for more factual, less creative responses
        topP: 0.9,
        topK: 40,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API for symptoms:", error);
    if (error instanceof Error) {
      if (error.message.toLowerCase().includes('deadline exceeded') || error.message.toLowerCase().includes('timeout')) {
        return "I'm taking a bit longer than expected to process that. Could you please check your connection and try again in a moment?";
      }
      if (error.message.toLowerCase().includes('api key not valid')) {
        return "There seems to be an issue with the service configuration. Please try again later.";
      }
       return `I encountered a little hiccup while analyzing your symptoms. Please try again. (Details: ${error.message})`;
    }
    return "An unknown error occurred while I was analyzing symptoms. Please give it another try.";
  }
};

// This is a MOCK function for image analysis as requested.
// A real implementation would convert image files to base64 and use a multimodal prompt.
export const getMockImageAnalysis = async (images: File[]): Promise<ImageAnalysisData> => {
  if (!API_KEY) {
    return {
      observations: "API Key not configured. Image analysis unavailable.",
      confidence: 0,
      disclaimer: MOCK_IMAGE_ANALYSIS_DISCLAIMER,
    };
  }
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const userPrompt = `Analyze these ${images.length} image(s) and provide a mock visual diagnosis. Focus on general observations. Remember this is a simulation.`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_VISION_MODEL, 
      contents: [{ role: "user", parts: [{text: userPrompt}] }],
      config: {
        systemInstruction: IMAGE_ANALYSIS_SYSTEM_INSTRUCTION_MOCK,
        temperature: 0.3,
      },
    });
    
    const responseText = response.text;
    let observations = responseText;
    let confidence = Math.floor(Math.random() * (85 - 60 + 1)) + 60; 

    const confidenceMatch = responseText.match(/Confidence: (\d+)%/i);
    if (confidenceMatch && confidenceMatch[1]) {
      confidence = parseInt(confidenceMatch[1], 10);
      observations = responseText.replace(confidenceMatch[0], '').trim();
    }
    
    return {
      observations: observations || "Mock analysis: The AI observed general features in the image(s). For specific concerns, please see a doctor.",
      confidence: confidence,
      disclaimer: MOCK_IMAGE_ANALYSIS_DISCLAIMER,
    };

  } catch (error) {
    console.error("Error calling (mock) Gemini API for image analysis:", error);
     if (error instanceof Error) {
        let errorMessage = "I encountered a little hiccup during the mock image analysis. Please try again.";
        if (error.message.toLowerCase().includes('deadline exceeded') || error.message.toLowerCase().includes('timeout')) {
          errorMessage = "I'm taking a bit longer than expected to look at the images. Could you please check your connection and try again in a moment?";
        } else if (error.message.toLowerCase().includes('api key not valid')) {
           errorMessage = "There seems to be an issue with the service configuration for image analysis. Please try again later.";
        } else {
            errorMessage = `Error during mock image analysis: ${error.message}`;
        }
        return {
            observations: errorMessage,
            confidence: 0,
            disclaimer: MOCK_IMAGE_ANALYSIS_DISCLAIMER,
        };
    }
    return {
        observations: "An unknown error occurred during mock image analysis. Please give it another try.",
        confidence: 0,
        disclaimer: MOCK_IMAGE_ANALYSIS_DISCLAIMER,
    };
  }
};

// Helper to extract grounding information (URLs) if Google Search is used
export const extractGroundingSources = (candidates?: Candidate[]): { title: string; uri: string }[] => {
  if (!candidates || candidates.length === 0) {
    return [];
  }
  const sources: { title: string; uri: string }[] = [];
  const groundingMeta = candidates[0].groundingMetadata;
  const chunks = groundingMeta?.groundingChunks || groundingMeta?.groundingAttributions;

  if (chunks) {
    for (const chunk of chunks) {
      if (chunk.web && chunk.web.uri) {
        sources.push({ title: chunk.web.title || chunk.web.uri, uri: chunk.web.uri });
      } else if (chunk.retrievedContext && chunk.retrievedContext.uri) {
        // Handle other types of grounding if necessary
         sources.push({ title: chunk.retrievedContext.title || chunk.retrievedContext.uri, uri: chunk.retrievedContext.uri });
      }
    }
  }
  // Deduplicate sources based on URI
  return Array.from(new Map(sources.map(item => [item.uri, item])).values());
};

// MOCK function for Health Education Hub
export const getMockHealthInformation = async (topic: string): Promise<HealthTopicResult | null> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 700));

  const searchTerm = topic.trim().toLowerCase();
  if (!searchTerm) return null;

  const foundTopic = MOCK_HEALTH_TOPICS_DATA.find(
    t => t.topicName.toLowerCase().includes(searchTerm) || t.id.toLowerCase().includes(searchTerm)
  );

  if (foundTopic) {
    return foundTopic;
  }
  
  // If no exact match, try to find keywords in summary or facts (very basic search)
  const keywordMatch = MOCK_HEALTH_TOPICS_DATA.find(t => 
    t.summary.toLowerCase().includes(searchTerm) || 
    t.keyFacts.some(f => f.text.toLowerCase().includes(searchTerm))
  );

  return keywordMatch || null;
};