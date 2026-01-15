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

      {/* Glowing Gradient Button */}
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={isLoading || dreamText.trim().length < 10}
          className="px-10 py-4 rounded-full text-base font-medium tracking-wide
                     bg-gradient-to-r from-violet-600/80 to-indigo-600/80
                     backdrop-blur-md border border-white/20
                     text-white
                     transition-all duration-300 ease-out
                     hover:from-violet-500/90 hover:to-indigo-500/90
                     hover:border-white/30
                     hover:shadow-[0_0_30px_rgba(124,58,237,0.5)]
                     active:scale-95
                     disabled:opacity-30 disabled:cursor-not-allowed
                     disabled:from-violet-600/40 disabled:to-indigo-600/40
                     disabled:hover:shadow-none
                     flex items-center gap-3"
        >
          <Sparkles size={18} strokeWidth={1.5} />
          Visualize Dream
        </button>
      </div>
    </div>
  );
};

export default DreamInput;
