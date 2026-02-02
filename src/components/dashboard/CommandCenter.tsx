import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";
import { saveDreamText, getSavedDreamText } from "@/services/dreamService";

interface CommandCenterProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

const CommandCenter = ({ onSubmit, isLoading }: CommandCenterProps) => {
  const [dreamText, setDreamText] = useState("");

  useEffect(() => {
    const saved = getSavedDreamText();
    if (saved) {
      setDreamText(saved);
    }
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setDreamText(newText);
    saveDreamText(newText);
  };

  const handleSubmit = () => {
    if (dreamText.trim().length < 10) return;
    onSubmit(dreamText.trim());
  };

  return (
    <div className="w-full">
      {/* Main Input Card - Purple Glow Centerpiece */}
      <div className="relative rounded-[28px] h-64
                      bg-white/[0.03] backdrop-blur-2xl 
                      border border-violet-500/30
                      shadow-[0_0_30px_rgba(124,58,237,0.15),inset_0_1px_0_0_rgba(255,255,255,0.1)]
                      p-6 flex flex-col">
        
        {/* Textarea - Takes top ~80% */}
        <div className="flex-1">
          <Textarea
            value={dreamText}
            onChange={handleTextChange}
            placeholder="I was walking through a forest when suddenly..."
            className="w-full h-full bg-transparent border-0
                       text-white text-lg leading-relaxed p-0 resize-none
                       placeholder:text-white/25
                       focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            disabled={isLoading}
          />
        </div>

        {/* Footer - Character count left, Button right */}
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
          <span className="text-xs text-white/30 uppercase tracking-[0.15em] font-medium">
            {dreamText.length} characters
          </span>

          {/* Visualize Button - Small Capsule inside card */}
          <button
            onClick={handleSubmit}
            disabled={isLoading || dreamText.trim().length < 10}
            className="rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 
                       px-6 py-2.5 text-sm font-bold tracking-widest text-white uppercase
                       shadow-[0_0_20px_rgba(139,92,246,0.4)] 
                       hover:scale-105 hover:shadow-[0_0_25px_rgba(139,92,246,0.6)]
                       active:scale-95
                       transition-all duration-300
                       disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100
                       flex items-center gap-2"
          >
            <Sparkles size={14} strokeWidth={2} />
            Visualize
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommandCenter;
