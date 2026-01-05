// Dream Service - Phase 1 MVP
// Currently uses MOCK data for UI testing
// TODO: Connect to n8n webhook in production

export interface DreamAnalysisResult {
  title: string;
  hook_text: string;
  full_analysis: string;
  image_url: string;
}

// Generate or retrieve session_id from localStorage
export const getSessionId = (): string => {
  const STORAGE_KEY = 'visura_session_id';
  let sessionId = localStorage.getItem(STORAGE_KEY);
  
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem(STORAGE_KEY, sessionId);
  }
  
  return sessionId;
};

// Save current dream text to localStorage (for page refresh recovery)
export const saveDreamText = (text: string): void => {
  localStorage.setItem('current_dream_text', text);
};

// Get saved dream text from localStorage
export const getSavedDreamText = (): string | null => {
  return localStorage.getItem('current_dream_text');
};

// Clear saved dream text
export const clearSavedDreamText = (): void => {
  localStorage.removeItem('current_dream_text');
};

// Save dream result to localStorage
export const saveDreamResult = (result: DreamAnalysisResult): void => {
  localStorage.setItem('current_dream_result', JSON.stringify(result));
};

// Get saved dream result from localStorage
export const getSavedDreamResult = (): DreamAnalysisResult | null => {
  const saved = localStorage.getItem('current_dream_result');
  return saved ? JSON.parse(saved) : null;
};

// Clear saved dream result
export const clearSavedResult = (): void => {
  localStorage.removeItem('current_dream_result');
};

/**
 * Analyze dream using AI (currently MOCK)
 * @param text - Dream description from user
 * @param sessionId - Session ID for guest users
 * @returns Promise with analysis result
 */
export const analyzeDream = async (
  text: string,
  sessionId: string
): Promise<DreamAnalysisResult> => {
  console.log('[dreamService] analyzeDream called', { text, sessionId });
  
  // Save dream text for recovery
  saveDreamText(text);
  
  // Simulate 3-second network delay
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // MOCK DATA for UI testing
  const mockResult: DreamAnalysisResult = {
    title: "The Amber Void",
    hook_text: "You are standing on the edge of a great change. The silence in your dream screams of unspoken decisions.",
    full_analysis: "This dream reflects a deep internal conflict regarding your recent choices. The void represents the unknown potential of your future. The amber color symbolizes a warm, yet cautionary energy — your subconscious is urging you to proceed with awareness. Jung would interpret this as a confrontation with your Shadow: the parts of yourself you have yet to acknowledge. The silence is not emptiness, but rather a space waiting to be filled by your conscious decisions.",
    image_url: "https://images.unsplash.com/photo-1487147264018-f937fba0c817"
  };
  
  console.log('[dreamService] Returning mock result:', mockResult);
  
  // Save result for recovery
  saveDreamResult(mockResult);
  
  return mockResult;
};
