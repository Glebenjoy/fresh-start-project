import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
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
    <div className="w-full max-w-xl mx-auto space-y-8 animate-fade-in">
      {/* Stealth Mode Input - Typing into the void */}
      <div className="relative">
        <Textarea
          value={dreamText}
          onChange={(e) => setDreamText(e.target.value)}
          placeholder="Describe your dream..."
          className="min-h-[180px] bg-transparent border-0 border-b border-transparent
                     text-foreground text-2xl text-center font-light
                     placeholder:text-white/20
                     focus:ring-0 focus:border-b focus:border-white/30
                     focus-visible:ring-0 focus-visible:ring-offset-0
                     resize-none leading-relaxed p-6
                     caret-pink-500 transition-all duration-300"
          disabled={isLoading}
        />
        
        {/* Voice input button */}
        <button 
          className="absolute bottom-6 right-2 p-2 
                     text-white/30 hover:text-white/60 transition-colors"
          disabled={isLoading}
        >
          <Mic size={20} strokeWidth={1.5} />
        </button>
      </div>

      {/* Character counter - subtle */}
      <div className="flex justify-center text-xs text-white/30 tracking-wide">
        <span>{dreamText.length} / 10 min</span>
      </div>

      {/* Holographic Action Button */}
      <button
        onClick={handleSubmit}
        disabled={isLoading || dreamText.trim().length < 10}
        className="w-full h-14 rounded-full text-lg font-semibold tracking-wide
                   bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                   text-white
                   transition-all duration-200 ease-out
                   hover:scale-105 hover:brightness-110
                   hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]
                   active:scale-95
                   disabled:opacity-40 disabled:cursor-not-allowed
                   disabled:hover:scale-100 disabled:hover:shadow-none disabled:hover:brightness-100
                   flex items-center justify-center gap-2"
      >
        <Sparkles size={20} strokeWidth={1.5} />
        Visualize Dream
      </button>
    </div>
  );
};

export default DreamInput;
