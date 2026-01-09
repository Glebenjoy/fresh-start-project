import { DreamAnalysisResult } from "@/services/dreamService";
import { Share2, Lock, RotateCcw, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DreamResultProps {
  result: DreamAnalysisResult;
  onReset: () => void;
  isUnlocked: boolean;
  onUnlockClick: () => void;
}

const DreamResult = ({ result, onReset, isUnlocked, onUnlockClick }: DreamResultProps) => {
  return (
    <div className="w-full max-w-lg mx-auto space-y-6 animate-fade-in">
      {/* Dream Image - Sharp corners */}
      <div className="relative rounded-lg overflow-hidden">
        <img
          src={result.image_url}
          alt="Dream visualization"
          className="w-full aspect-[4/3] object-cover"
        />
        
        {/* Share button overlay */}
        <button 
          className="absolute top-4 right-4 p-3 rounded-full
                     bg-black/50 backdrop-blur-sm border border-white/10
                     hover:bg-black/70 transition-colors
                     text-white/90 hover:text-white"
        >
          <Share2 size={20} strokeWidth={1.5} />
        </button>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 
                        bg-gradient-to-t from-black/80 via-black/50 to-transparent
                        p-6 pt-16">
          <h2 className="text-2xl font-semibold text-white">
            {result.title}
          </h2>
        </div>
      </div>

      {/* Analysis Card */}
      <div className="surface rounded-lg p-6 space-y-4 border border-white/10">
        {/* Hook text - Always Visible */}
        <p className="text-foreground/90 text-lg leading-relaxed font-medium">
          "{result.hook_text}"
        </p>

        {/* Full analysis */}
        <div className="relative">
          <p className={`text-muted-foreground leading-relaxed transition-all duration-500 ${
            isUnlocked ? "" : "blur-reveal"
          }`}>
            {result.full_analysis}
          </p>
          
          {/* Unlock overlay - only shown when locked */}
          {!isUnlocked && (
            <div className="absolute inset-0 flex items-center justify-center
                            bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent
                            pt-12">
              <Button
                onClick={onUnlockClick}
                className="rounded-lg px-6 py-6 h-auto
                           bg-primary text-primary-foreground font-medium text-base
                           transition-all duration-300
                           hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                <Lock size={18} strokeWidth={1.5} className="mr-2" />
                Unlock Full Analysis
              </Button>
            </div>
          )}
        </div>

        {/* Unlocked indicator */}
        {isUnlocked && (
          <div className="flex items-center gap-2 text-muted-foreground text-sm pt-2">
            <Unlock size={14} strokeWidth={1.5} />
            <span>Full analysis unlocked</span>
          </div>
        )}
      </div>

      {/* New dream button */}
      <Button
        onClick={onReset}
        variant="ghost"
        className="w-full h-12 rounded-lg text-muted-foreground
                   hover:text-foreground hover:bg-white/5
                   transition-colors"
      >
        <RotateCcw size={18} strokeWidth={1.5} className="mr-2" />
        Analyze Another Dream
      </Button>
    </div>
  );
};

export default DreamResult;
