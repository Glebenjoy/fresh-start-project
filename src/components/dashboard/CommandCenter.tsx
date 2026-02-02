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
      {/* Command Center Panel - Ultra-Clear Glass */}
      <div className="relative rounded-[32px] 
                      bg-white/[0.03] backdrop-blur-2xl 
                      border border-white/[0.15]
                      shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]
                      p-8 md:p-10">
        
        {/* Input Area */}
        <div className="relative">
          <Textarea
            value={dreamText}
            onChange={handleTextChange}
            placeholder="I was walking through a forest when suddenly..."
            className="w-full min-h-[180px] bg-transparent border-0
                       text-white text-xl leading-relaxed p-0 resize-none
                       placeholder:text-white/30
                       focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0
                       transition-all duration-300"
            disabled={isLoading}
          />
        </div>

        {/* Subtle divider */}
        <div className="h-px bg-white/[0.08] my-8" />

        {/* Footer with Counter & Visualize Button */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/40 uppercase tracking-[0.2em] font-medium">
            {dreamText.length} characters
          </span>

          {/* Visualize Button - Neon Capsule */}
          <button
            onClick={handleSubmit}
            disabled={isLoading || dreamText.trim().length < 10}
            className="rounded-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] 
                       px-8 py-4 text-lg font-bold tracking-widest text-white 
                       shadow-[0_0_30px_rgba(139,92,246,0.5)] 
                       hover:scale-105 hover:shadow-[0_0_40px_rgba(139,92,246,0.7)]
                       active:scale-95
                       transition-all duration-300
                       disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100
                       flex items-center gap-3 uppercase"
          >
            <Sparkles size={18} strokeWidth={2} />
            Visualize
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommandCenter;
