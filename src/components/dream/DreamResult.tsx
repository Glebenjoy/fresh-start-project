import { DreamAnalysisResult } from "@/services/dreamService";
import { Share2, Lock, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DreamResultProps {
  result: DreamAnalysisResult;
  onReset: () => void;
}

const DreamResult = ({ result, onReset }: DreamResultProps) => {
  return (
    <div className="w-full max-w-lg mx-auto space-y-6 animate-fade-in-up">
      {/* Dream Image - Full clarity */}
      <div className="relative rounded-3xl overflow-hidden glass">
        <img
          src={result.image_url}
          alt="Dream visualization"
          className="w-full aspect-[4/3] object-cover"
        />
        
        {/* Share button overlay */}
        <button 
          className="absolute top-4 right-4 p-3 rounded-full
                     bg-black/50 backdrop-blur-sm border border-white/20
                     hover:bg-black/70 transition-colors
                     text-white/90 hover:text-white"
        >
          <Share2 size={20} strokeWidth={1.5} />
        </button>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 
                        bg-gradient-to-t from-black/80 via-black/50 to-transparent
                        p-6 pt-16">
          <h2 className="font-display text-2xl font-semibold text-white">
            {result.title}
          </h2>
        </div>
      </div>

      {/* Analysis Card - Blurred hook */}
      <div className="glass rounded-3xl p-6 space-y-4">
        {/* Hook text - Visible */}
        <p className="text-foreground/90 text-lg leading-relaxed font-medium">
          "{result.hook_text}"
        </p>

        {/* Full analysis - Blurred */}
        <div className="relative">
          <p className="text-muted-foreground leading-relaxed blur-reveal">
            {result.full_analysis}
          </p>
          
          {/* Unlock overlay */}
          <div className="absolute inset-0 flex items-center justify-center
                          bg-gradient-to-t from-card via-card/80 to-transparent
                          pt-12">
            <Button
              className="rounded-2xl px-6 py-6 h-auto
                         bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500
                         hover:from-amber-400 hover:via-amber-300 hover:to-amber-400
                         text-primary-foreground font-medium text-base
                         shadow-lg hover:shadow-[0_0_30px_hsl(45_100%_50%/0.3)]
                         transition-all duration-300"
            >
              <Lock size={18} strokeWidth={1.5} className="mr-2" />
              Unlock Full Analysis
            </Button>
          </div>
        </div>
      </div>

      {/* New dream button */}
      <Button
        onClick={onReset}
        variant="ghost"
        className="w-full h-12 rounded-2xl text-muted-foreground
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
