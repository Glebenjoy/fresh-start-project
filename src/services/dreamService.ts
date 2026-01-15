// Dream Service - Phase 1 MVP
// Connected to n8n webhook for AI analysis

import { supabase } from '@/integrations/supabase/client';

export interface DreamAnalysisResult {
  id?: string;
  title: string;
  hook_text: string;
  full_analysis: string;
  image_url: string;
}

export class RateLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RateLimitError';
  }
}

/**
 * Check if user can generate a dream (rate limiting)
 * Pro users: unlimited
 * Free users: 1 per 24 hours
 */
export const checkUserLimit = async (userId: string): Promise<boolean> => {
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('is_pro, last_generation_date')
    .eq('id', userId)
    .maybeSingle();

  if (error) {
    console.error('[dreamService] Error fetching profile:', error);
    // If we can't check, allow the request (fail open for MVP)
    return true;
  }

  // No profile found - user might be new, allow request
  if (!profile) {
    return true;
  }

  // Pro users have unlimited access
  if (profile.is_pro) {
    return true;
  }

  // Free users: check 24-hour limit
  if (profile.last_generation_date) {
    const lastGeneration = new Date(profile.last_generation_date);
    const now = new Date();
    const hoursSinceLastGeneration = (now.getTime() - lastGeneration.getTime()) / (1000 * 60 * 60);
    
    if (hoursSinceLastGeneration < 24) {
      const hoursRemaining = Math.ceil(24 - hoursSinceLastGeneration);
      throw new RateLimitError(
        `You've used your free dream for today. Come back in ${hoursRemaining} hour${hoursRemaining !== 1 ? 's' : ''} or upgrade to Pro for unlimited dreams.`
      );
    }
  }

  return true;
};

/**
 * Update user's last generation date after successful dream analysis
 */
export const updateLastGenerationDate = async (userId: string): Promise<void> => {
  const { error } = await supabase
    .from('profiles')
    .update({ last_generation_date: new Date().toISOString() })
    .eq('id', userId);

  if (error) {
    console.error('[dreamService] Error updating last_generation_date:', error);
    // Non-critical error, don't throw
  }
};

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
  
  // Get current user (if authenticated)
  const { data: { user } } = await supabase.auth.getUser();
  
  // Check rate limit for authenticated users only
  if (user) {
    await checkUserLimit(user.id);
  }
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 120000); // 120 second timeout for DALL-E generation
  
  try {
    const response = await fetch('https://aikakoydev.app.n8n.cloud/webhook/dream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        session_id: sessionId,
        user_id: user?.id ?? null,
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
      full_analysis: apiResponse.data.interpretation_full || apiResponse.data.hook, // Fallback if no full analysis
      image_url: apiResponse.data.image_url,
    };
    
    console.log('[dreamService] Mapped result:', result);
    
    // Save result for recovery
    saveDreamResult(result);
    
    // Update last_generation_date for authenticated users
    if (user) {
      await updateLastGenerationDate(user.id);
    }
    
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
