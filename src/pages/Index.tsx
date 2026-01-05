import { useState } from "react";
import { Eye } from "lucide-react";
import DreamInput from "@/components/dream/DreamInput";
import ProcessingScreen from "@/components/dream/ProcessingScreen";
import DreamResult from "@/components/dream/DreamResult";
import { 
  analyzeDream, 
  getSessionId, 
  DreamAnalysisResult,
  clearSavedResult,
  clearSavedDreamText
} from "@/services/dreamService";

type AppState = "input" | "processing" | "result";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("input");
  const [dreamResult, setDreamResult] = useState<DreamAnalysisResult | null>(null);

  const handleDreamSubmit = async (text: string) => {
    setAppState("processing");
    
    try {
      const sessionId = getSessionId();
      const result = await analyzeDream(text, sessionId);
      setDreamResult(result);
      setAppState("result");
    } catch (error) {
      console.error("Dream analysis failed:", error);
      setAppState("input");
    }
  };

  const handleReset = () => {
    clearSavedResult();
    clearSavedDreamText();
    setDreamResult(null);
    setAppState("input");
  };

  return (
    <div className="min-h-screen gradient-mystic">
      {/* Ambient background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px]
                        bg-gradient-to-b from-amber-900/20 via-amber-800/5 to-transparent
                        blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 min-h-screen
                      flex flex-col">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-2 rounded-full bg-amber-500/10 border border-amber-500/20">
              <Eye size={24} strokeWidth={1.5} className="text-amber-400" />
            </div>
          </div>
          
          <h1 className="font-display text-4xl md:text-5xl font-semibold 
                         text-gradient-amber mb-3">
            VISURA AI
          </h1>
          
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
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
            />
          )}
        </main>

        {/* Footer */}
        <footer className="text-center py-6">
          <p className="text-muted-foreground/50 text-sm">
            Powered by Jungian Psychology & AI
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
