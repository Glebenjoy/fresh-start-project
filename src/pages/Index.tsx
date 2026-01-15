import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { BookOpen, Moon, Flame, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CommandCenter from "@/components/dashboard/CommandCenter";
import StatWidget from "@/components/dashboard/StatWidget";
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

const Index = () => {
  const { toast } = useToast();
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

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Digital Dust Particles */}
      <DigitalDust />
      
      {/* Massive Violet/Indigo Spotlight - IGNITED */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] 
                      from-indigo-600/30 via-purple-900/15 to-black pointer-events-none" />
      
      {/* Primary Purple Orb - Bright Core */}
      <div className="fixed top-[15%] left-1/2 -translate-x-1/2 w-[1000px] h-[700px] 
                      bg-violet-500/20 blur-[180px] rounded-full pointer-events-none" />
      
      {/* Secondary Indigo Wash */}
      <div className="fixed top-[30%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] 
                      bg-indigo-400/15 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Accent Cyan Edge Glow */}
      <div className="fixed bottom-[-10%] right-[-5%] w-[600px] h-[500px] 
                      bg-cyan-500/12 blur-[150px] rounded-full pointer-events-none" />
      
      {/* Film grain noise texture overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none"
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
             backgroundRepeat: 'repeat'
           }} />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Top Navigation */}
        <nav className="border-b border-white/[0.06] backdrop-blur-2xl bg-white/[0.02]">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link 
                to="/" 
                className="text-xl font-bold tracking-tight 
                           bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70
                           hover:from-white hover:to-white/90 transition-all duration-300"
              >
                VISURA
              </Link>

              {/* Right Side */}
              <div className="flex items-center gap-2">
                {user ? (
                  <Link to="/journal">
                    <button className="px-4 py-2 rounded-xl text-sm font-medium
                                       bg-white/[0.03] backdrop-blur-xl border border-white/[0.08]
                                       shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]
                                       text-zinc-300 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.12]
                                       transition-all duration-200
                                       flex items-center gap-2">
                      <BookOpen size={16} strokeWidth={1.5} />
                      Journal
                    </button>
                  </Link>
                ) : (
                  <button 
                    onClick={() => setIsAuthModalOpen(true)}
                    className="px-4 py-2 rounded-xl text-sm font-medium
                               bg-white/[0.03] backdrop-blur-xl border border-white/[0.08]
                               shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]
                               text-zinc-300 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.12]
                               transition-all duration-200"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 py-8 md:py-12">
          <div className="max-w-4xl mx-auto px-4">
            {appState === "input" && (
              <div className="animate-fade-in">
                {/* Header */}
                <header className="mb-10 md:mb-14">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white">
                    Dream Analysis
                  </h1>
                  <p className="text-xs md:text-sm text-zinc-400 mt-4 uppercase tracking-[0.2em] font-medium">
                    AI-powered Jungian interpretation
                  </p>
                </header>

                {/* Bento Grid */}
                <div className="grid grid-cols-12 gap-4">
                  {/* Main Command Center */}
                  <CommandCenter 
                    onSubmit={handleDreamSubmit} 
                    isLoading={false} 
                  />

                  {/* Stats Widgets Row */}
                  <div className="col-span-12 grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                    <StatWidget 
                      icon={Moon}
                      label="Dreams Recorded"
                      value={12}
                      subtext="This month"
                    />
                    <StatWidget 
                      icon={Flame}
                      label="Current Streak"
                      value="3 Days"
                    />
                    <StatWidget 
                      icon={Sparkles}
                      label="Insights Found"
                      value={47}
                      subtext="Total patterns"
                    />
                  </div>
                </div>
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
        </main>

        {/* Footer */}
        <footer className="border-t border-white/5 py-6">
          <div className="max-w-4xl mx-auto px-4">
            <p className="text-zinc-500 text-sm text-center">
              Powered by Jungian Psychology & AI
            </p>
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
