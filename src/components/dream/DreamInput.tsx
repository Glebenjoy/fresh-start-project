import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles, Mic } from "lucide-react";

interface DreamInputProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

const DreamInput = ({ onSubmit, isLoading }: DreamInputProps) => {
  const [dreamText, setDreamText] = useState("");

  const handleSubmit = () => {
    if (dreamText.trim().length < 10) return;
    onSubmit(dreamText.trim());
  };

  return (
    <div className="w-full max-w-lg mx-auto space-y-6 animate-fade-in-up">
      {/* Textarea with glass effect */}
      <div className="relative">
        <Textarea
          value={dreamText}
          onChange={(e) => setDreamText(e.target.value)}
          placeholder="Describe your dream in detail... What did you see? How did you feel?"
          className="min-h-[160px] glass rounded-2xl border-white/10 bg-white/5 
                     text-foreground placeholder:text-muted-foreground/60
                     focus:ring-2 focus:ring-primary/50 focus:border-primary/30
                     resize-none text-base leading-relaxed p-4"
          disabled={isLoading}
        />
        
        {/* Voice input button (placeholder) */}
        <button 
          className="absolute bottom-4 right-4 p-2 rounded-full 
                     bg-white/10 hover:bg-white/20 transition-colors
                     text-muted-foreground hover:text-foreground"
          disabled={isLoading}
        >
          <Mic size={20} strokeWidth={1.5} />
        </button>
      </div>

      {/* Character counter */}
      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <span>{dreamText.length} characters</span>
        <span className="text-xs opacity-60">Minimum 10 characters</span>
      </div>

      {/* Submit button with glow effect */}
      <Button
        onClick={handleSubmit}
        disabled={isLoading || dreamText.trim().length < 10}
        className="w-full h-14 rounded-2xl text-lg font-medium
                   bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500
                   hover:from-amber-400 hover:via-amber-300 hover:to-amber-400
                   text-primary-foreground shadow-lg
                   transition-all duration-300 ease-out
                   hover:shadow-[0_0_40px_hsl(45_100%_50%/0.4)]
                   disabled:opacity-50 disabled:cursor-not-allowed
                   disabled:hover:shadow-none"
      >
        <Sparkles size={20} strokeWidth={1.5} className="mr-2" />
        Visualize Dream
      </Button>
    </div>
  );
};

export default DreamInput;
