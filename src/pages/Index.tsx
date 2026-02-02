import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { BookOpen, Flame } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CommandCenter from "@/components/dashboard/CommandCenter";
import MoodChip from "@/components/dashboard/MoodChip";
import RecentDreams from "@/components/dashboard/RecentDreams";
import ProcessingScreen from "@/components/dream/ProcessingScreen";
import DreamResult from "@/components/dream/DreamResult";
import AuthModal from "@/components/auth/AuthModal";
import DigitalDust from "@/components/effects/DigitalDust";
import { 
  analyzeDream, 
  getSessionId, 
  DreamAnalysisResult,
  clearSavedResult,
  clearSavedDreamText,
  getSavedDreamResult,
  getSavedDreamText,
  RateLimitError
} from "@/services/dreamService";

type AppState = "input" | "processing" | "result";

const MOODS = ["Anxious", "Calm", "Inspired", "Tired", "Mystical"];

const Index = () => {
  const { toast } = useToast();
  const [appState, setAppState] = useState<AppState>("input");
  const [dreamResult, setDreamResult] = useState<DreamAnalysisResult | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [currentDreamId, setCurrentDreamId] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [greeting, setGreeting] = useState("Good Evening");

  // Set greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting("Good Morning");
    } else if (hour >= 12 && hour < 17) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  // Restore state from localStorage on mount
  useEffect(() => {
    const savedResult = getSavedDreamResult();
    const savedDreamText = getSavedDreamText();
    
    if (savedResult) {
      setDreamResult(savedResult);
      setCurrentDreamId(savedResult.id || null);
      setAppState("result");
    } else if (savedDreamText) {
      setAppState("input");
    }
  }, []);

  // Auth state listener
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        if (event === "SIGNED_IN" && session?.user) {
          setIsAuthModalOpen(false);
          setIsUnlocked(true);
          
          if (currentDreamId) {
            setTimeout(() => {
              linkDreamToUser(currentDreamId, session.user.id);
            }, 0);
          }
        }
      }
    );

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
      
      if (user) {
        setIsUnlocked(true);
      }
    } catch (error) {
      console.error("Dream analysis failed:", error);
      
      if (error instanceof RateLimitError) {
        toast({
          variant: "destructive",
          title: "Daily Limit Reached ✨",
          description: error.message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: "Failed to analyze your dream. Please try again.",
        });
      }
      
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

  const getUserDisplayName = () => {
    if (!user) return "Dreamer";
    return user.user_metadata?.full_name?.split(" ")[0] || 
           user.email?.split("@")[0] || 
           "Dreamer";
  };

  return (
    <div className="min-h-screen bg-[#000000] relative overflow-hidden">
      {/* Digital Dust Particles */}
      <DigitalDust />
      
      {/* Subtle Violet Spotlight - Top Center */}
      <div className="fixed top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] 
                      bg-violet-600/15 blur-[200px] rounded-full pointer-events-none" />
      
      {/* Secondary Indigo Accent - Subtle */}
      <div className="fixed top-[40%] left-1/2 -translate-x-1/2 w-[500px] h-[300px] 
                      bg-indigo-500/8 blur-[150px] rounded-full pointer-events-none" />
      
      {/* Edge Glow - Very Subtle */}
      <div className="fixed bottom-[-15%] right-[-10%] w-[400px] h-[400px] 
                      bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Film grain noise texture overlay */}
      <div className="fixed inset-0 opacity-[0.04] pointer-events-none"
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
             backgroundRepeat: 'repeat'
           }} />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Main Content Container */}
        <div className="flex-1 py-6 md:py-10">
          <div className="max-w-2xl mx-auto px-4 space-y-8">
            
            {appState === "input" && (
              <div className="animate-fade-in space-y-8">
                
                {/* ===== SECTION 1: Header ===== */}
                <header className="flex items-center justify-between">
                  {/* Left: Greeting */}
                  <div>
                    <h1 
                      className="text-4xl md:text-5xl font-light italic text-white/90"
                      style={{ fontFamily: "'Cormorant', serif" }}
                    >
                      {greeting}, {getUserDisplayName()}
                    </h1>
                    <p className="text-[10px] text-white/30 mt-2 uppercase tracking-[0.25em]"
                       style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      What did you dream?
                    </p>
                  </div>

                  {/* Right: Streak + Journal */}
                  <div className="flex items-center gap-3">
                    {/* Streak Indicator */}
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full
                                    bg-transparent border border-white/10">
                      <Flame size={14} className="text-orange-400/60" strokeWidth={1.5} />
                      <span className="text-xs text-white/40 tracking-wide"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}>0 Days</span>
                    </div>

                    {/* Journal Button */}
                    {user ? (
                      <Link to="/journal">
                        <button className="p-2.5 rounded-full
                                           bg-transparent border border-white/10
                                           text-white/40 hover:text-white/80 hover:border-white/25
                                           hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]
                                           transition-all duration-300">
                          <BookOpen size={16} strokeWidth={1.5} />
                        </button>
                      </Link>
                    ) : (
                      <button 
                        onClick={() => setIsAuthModalOpen(true)}
                        className="px-4 py-2 rounded-full text-xs uppercase tracking-[0.15em]
                                   bg-transparent border border-white/10
                                   text-white/40 hover:text-white/80 hover:border-white/25
                                   hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]
                                   transition-all duration-300"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Sign In
                      </button>
                    )}
                  </div>
                </header>

                {/* ===== SECTION 2: Emotion Check-in ===== */}
                <section className="space-y-4">
                  <h2 className="text-[10px] uppercase tracking-[0.25em] text-white/30"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Current Mood
                  </h2>
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {MOODS.map((mood) => (
                      <MoodChip
                        key={mood}
                        label={mood}
                        isSelected={selectedMood === mood}
                        onClick={() => setSelectedMood(selectedMood === mood ? null : mood)}
                      />
                    ))}
                  </div>
                </section>

                {/* ===== SECTION 3: Main Control Card ===== */}
                <section>
                  <CommandCenter 
                    onSubmit={handleDreamSubmit} 
                    isLoading={false} 
                  />
                </section>

                {/* ===== SECTION 4: Recent Dreams ===== */}
                <section>
                  <RecentDreams />
                </section>

              </div>
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
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-white/5 py-6">
          <div className="max-w-2xl mx-auto px-4">
            <div className="flex items-center justify-between">
              <Link 
                to="/" 
                className="text-lg font-bold tracking-tight text-white/60 hover:text-white transition-colors"
              >
                VISURA
              </Link>
              <p className="text-zinc-600 text-xs">
                Powered by Jungian Psychology & AI
              </p>
            </div>
          </div>
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
