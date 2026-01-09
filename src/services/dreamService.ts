// Dream Service - Phase 1 MVP
// Currently uses MOCK data for UI testing
// TODO: Connect to n8n webhook in production

export interface DreamAnalysisResult {
  id?: string;
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
 * Analyze dream using AI via n8n webhook
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
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 90000); // 90 second timeout
  
  try {
    const response = await fetch('https://aikakoydev.app.n8n.cloud/webhook/dream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        session_id: sessionId,
      }),
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    const apiResponse = await response.json();
    console.log('[dreamService] API response:', apiResponse);
    
    if (!apiResponse.success || !apiResponse.data) {
      throw new Error('Invalid API response format');
    }
    
    // Map API response to DreamAnalysisResult
    const result: DreamAnalysisResult = {
      id: crypto.randomUUID(),
      title: apiResponse.data.title,
      hook_text: apiResponse.data.hook,
      full_analysis: apiResponse.data.full_analysis || apiResponse.data.hook, // Fallback if no full analysis
      image_url: apiResponse.data.image_url,
    };
    
    console.log('[dreamService] Mapped result:', result);
    
    // Save result for recovery
    saveDreamResult(result);
    
    return result;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timed out. The AI is taking longer than expected. Please try again.');
    }
    
    console.error('[dreamService] Error:', error);
    throw error;
  }
};
