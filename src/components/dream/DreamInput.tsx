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
    <div className="w-full max-w-lg mx-auto space-y-6 animate-fade-in">
      {/* Minimalist textarea */}
      <div className="relative">
        <Textarea
          value={dreamText}
          onChange={(e) => setDreamText(e.target.value)}
          placeholder="Describe your dream..."
          className="min-h-[160px] bg-transparent border-0 border-b border-white/20 
                     rounded-none text-foreground text-lg font-light
                     placeholder:text-muted-foreground/40
                     focus:ring-0 focus:border-white/40
                     resize-none leading-relaxed p-4 pl-0"
          disabled={isLoading}
        />
        
        {/* Voice input button */}
        <button 
          className="absolute bottom-4 right-0 p-2 
                     text-muted-foreground hover:text-foreground transition-colors"
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

      {/* Submit button - White with prism hover */}
      <Button
        onClick={handleSubmit}
        disabled={isLoading || dreamText.trim().length < 10}
        className="w-full h-14 rounded-lg text-lg font-medium
                   bg-primary text-primary-foreground
                   transition-all duration-300 ease-out
                   hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]
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
