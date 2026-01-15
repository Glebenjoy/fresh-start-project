import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Mic } from "lucide-react";
import { saveDreamText, getSavedDreamText } from "@/services/dreamService";

interface DreamInputProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

const DreamInput = ({ onSubmit, isLoading }: DreamInputProps) => {
  const [dreamText, setDreamText] = useState("");

  // Restore saved dream text on mount
  useEffect(() => {
    const saved = getSavedDreamText();
    if (saved) {
      setDreamText(saved);
    }
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setDreamText(newText);
    saveDreamText(newText); // Save on every keystroke
  };

  const handleSubmit = () => {
    if (dreamText.trim().length < 10) return;
    onSubmit(dreamText.trim());
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-10 animate-fade-in">
      {/* Glass Surface Input */}
      <div className="relative">
        <Textarea
          value={dreamText}
          onChange={handleTextChange}
          placeholder="Tell me your dream..."
          className="phantom-input min-h-[220px] w-full caret-purple-400"
          disabled={isLoading}
        />
        
        {/* Voice input button */}
        <button 
          className="absolute bottom-6 right-6 p-2 
                     text-white/20 hover:text-white/40 transition-colors"
          disabled={isLoading}
        >
          <Mic size={20} strokeWidth={1.5} />
        </button>
      </div>

      {/* Character counter - ultra subtle */}
      <div className="flex justify-center text-xs text-white/20 tracking-widest font-body">
        <span>{dreamText.length} characters</span>
      </div>

      {/* The Amulet Button - Breathing */}
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={isLoading || dreamText.trim().length < 10}
          className="group px-12 py-4 rounded-full 
                     font-mono text-sm font-semibold uppercase tracking-[0.3em]
                     bg-black/40 backdrop-blur-md
                     border border-violet-400/70
                     shadow-[inset_0_0_20px_rgba(139,92,246,0.25)]
                     text-white
                     transition-all duration-500 ease-out
                     animate-prism-pulse
                     hover:bg-violet-500/20 hover:border-violet-300
                     hover:shadow-[inset_0_0_30px_rgba(139,92,246,0.5),0_0_30px_rgba(139,92,246,0.6)]
                     active:shadow-[inset_0_0_40px_rgba(139,92,246,0.7),0_0_40px_rgba(139,92,246,0.8)]
                     disabled:opacity-30 disabled:cursor-not-allowed
                     disabled:animate-none
                     disabled:hover:shadow-none disabled:hover:border-violet-400/70 disabled:hover:bg-black/40
                     flex items-center gap-4"
        >
          <Sparkles size={16} strokeWidth={1.5} className="opacity-60 group-hover:opacity-100 transition-opacity" />
          Visualize
        </button>
      </div>
    </div>
  );
};

export default DreamInput;
