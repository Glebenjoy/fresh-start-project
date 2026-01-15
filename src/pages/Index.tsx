import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import DreamInput from "@/components/dream/DreamInput";
import ProcessingScreen from "@/components/dream/ProcessingScreen";
import DreamResult from "@/components/dream/DreamResult";
import AuthModal from "@/components/auth/AuthModal";
import { 
  analyzeDream, 
  getSessionId, 
  DreamAnalysisResult,
  clearSavedResult,
  clearSavedDreamText,
  getSavedDreamResult,
  getSavedDreamText
} from "@/services/dreamService";

type AppState = "input" | "processing" | "result";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("input");
  const [dreamResult, setDreamResult] = useState<DreamAnalysisResult | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [currentDreamId, setCurrentDreamId] = useState<string | null>(null);

  // Restore state from localStorage on mount
  useEffect(() => {
    const savedResult = getSavedDreamResult();
    const savedDreamText = getSavedDreamText();
    
    if (savedResult) {
      setDreamResult(savedResult);
      setCurrentDreamId(savedResult.id || null);
      setAppState("result");
    } else if (savedDreamText) {
      // User had typed but not submitted - stay on input
      setAppState("input");
    }
  }, []);

  // Auth state listener
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        // If user just signed in and we have a pending dream, unlock it
        if (event === "SIGNED_IN" && session?.user) {
          setIsAuthModalOpen(false);
          setIsUnlocked(true);
          
          // Link dream to user in database
          if (currentDreamId) {
            setTimeout(() => {
              linkDreamToUser(currentDreamId, session.user.id);
            }, 0);
          }
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        setIsUnlocked(true);
      }
    });

    return () => subscription.unsubscribe();
  }, [currentDreamId]);

  const linkDreamToUser = async (dreamId: string, userId: string) => {
    try {
      await supabase
        .from("dreams")
        .update({ user_id: userId })
        .eq("id", dreamId);
      console.log("Dream linked to user successfully");
    } catch (error) {
      console.error("Failed to link dream to user:", error);
    }
  };

  const handleDreamSubmit = async (text: string) => {
    setAppState("processing");
    
    try {
      const sessionId = getSessionId();
      const result = await analyzeDream(text, sessionId);
      setDreamResult(result);
      setCurrentDreamId(result.id || null);
      setAppState("result");
      
      // If user is already logged in, unlock immediately
      if (user) {
        setIsUnlocked(true);
      }
    } catch (error) {
      console.error("Dream analysis failed:", error);
      setAppState("input");
    }
  };

  const handleReset = () => {
    clearSavedResult();
    clearSavedDreamText();
    setDreamResult(null);
    setCurrentDreamId(null);
    setIsUnlocked(user !== null);
    setAppState("input");
  };

  const handleUnlockClick = () => {
    if (user) {
      setIsUnlocked(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Aurora Background Blobs */}
      <div className="aurora-blob w-[600px] h-[600px] bg-indigo-600/20 top-[-200px] left-[-200px] aurora-float" />
      <div className="aurora-blob w-[500px] h-[500px] bg-fuchsia-600/10 bottom-[-150px] right-[-150px] aurora-float-delayed" />
      
      <div className="relative z-10 container mx-auto px-4 py-12 min-h-screen flex flex-col">
        {/* Top Navigation */}
        {user && (
          <div className="absolute top-4 right-4 z-20 animate-fade-in">
            <Link to="/journal">
              <Button 
                variant="ghost" 
                size="icon"
                className="text-muted-foreground hover:text-foreground hover:bg-white/10
                           border border-white/10 backdrop-blur-sm"
              >
                <BookOpen size={20} strokeWidth={1.5} />
              </Button>
            </Link>
          </div>
        )}

        {/* Header with fade-in-up */}
        <header className="text-center mb-16 animate-fade-in">
          {/* Logo Title - Gradient text */}
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-[-0.05em] mb-4
                         bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
            VISURA AI
          </h1>
          
          <p className="text-[#94A3B8] text-lg max-w-md mx-auto font-normal">
            Decode your subconscious. Visualize the hidden meanings in your dreams.
          </p>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center py-8">
          {appState === "input" && (
            <DreamInput 
              onSubmit={handleDreamSubmit} 
              isLoading={false} 
            />
          )}

          {appState === "processing" && (
            <ProcessingScreen />
          )}

          {appState === "result" && dreamResult && (
            <DreamResult 
              result={dreamResult} 
              onReset={handleReset}
              isUnlocked={isUnlocked}
              onUnlockClick={handleUnlockClick}
            />
          )}
        </main>

        {/* Footer */}
        <footer className="text-center py-6 animate-fade-in">
          <p className="text-[#94A3B8]/50 text-sm font-normal">
            Powered by Jungian Psychology & AI
          </p>
        </footer>
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </div>
  );
};

export default Index;
