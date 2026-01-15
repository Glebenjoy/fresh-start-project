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
      {/* Phantom Input - Floating in the void */}
      <div className="relative">
        <Textarea
          value={dreamText}
          onChange={handleTextChange}
          placeholder="Tell me your dream..."
          className="phantom-input min-h-[200px] w-full p-8 caret-purple-400"
          disabled={isLoading}
        />
        
        {/* Voice input button */}
        <button 
          className="absolute bottom-8 right-4 p-2 
                     text-white/20 hover:text-white/50 transition-colors"
          disabled={isLoading}
        >
          <Mic size={20} strokeWidth={1.5} />
        </button>
      </div>

      {/* Character counter - ultra subtle */}
      <div className="flex justify-center text-xs text-white/20 tracking-widest font-body">
        <span>{dreamText.length} characters</span>
      </div>

      {/* Minimal Glass Button */}
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={isLoading || dreamText.trim().length < 10}
          className="px-10 py-4 rounded-full text-base font-medium tracking-wide
                     bg-white/5 backdrop-blur-md border border-white/10
                     text-white/90
                     transition-all duration-300 ease-out
                     hover:bg-white/10 hover:border-white/20
                     hover:shadow-[0_0_40px_rgba(168,85,247,0.3)]
                     active:scale-95
                     disabled:opacity-30 disabled:cursor-not-allowed
                     disabled:hover:bg-white/5 disabled:hover:border-white/10 disabled:hover:shadow-none
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
