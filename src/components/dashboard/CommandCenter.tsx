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
      {/* Command Center Panel - The Monolith */}
      <div className="relative rounded-3xl bg-black/40 backdrop-blur-2xl 
                      border border-white/5
                      p-8 md:p-10">
        
        {/* Input Area - Transparent, sits on card */}
        <div className="relative">
          <Textarea
            value={dreamText}
            onChange={handleTextChange}
            placeholder="I was walking through a forest when suddenly..."
            className="w-full min-h-[180px] bg-transparent border-0
                       text-white/90 text-lg leading-relaxed p-0 resize-none
                       placeholder:text-white/20 placeholder:italic
                       focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0
                       transition-all duration-300
                       caret-violet-400"
            style={{ fontFamily: "'Cormorant', serif" }}
            disabled={isLoading}
          />
        </div>

        {/* Subtle divider */}
        <div className="h-px bg-white/5 my-6" />

        {/* Footer with Counter & Prism Trigger Button */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-white/25 uppercase tracking-[0.25em]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {dreamText.length} characters
          </span>

          {/* Prism Trigger Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading || dreamText.trim().length < 10}
            className="group px-8 py-3 rounded-full 
                       text-xs uppercase tracking-[0.2em]
                       bg-black/60 backdrop-blur-md
                       border border-violet-400/50
                       shadow-[inset_0_0_20px_rgba(139,92,246,0.15)]
                       text-white/90
                       transition-all duration-300 ease-out
                       animate-prism-pulse
                       hover:border-violet-300/70
                       hover:shadow-[inset_0_0_30px_rgba(139,92,246,0.3),0_0_40px_rgba(139,92,246,0.35)]
                       active:shadow-[inset_0_0_40px_rgba(139,92,246,0.4),0_0_50px_rgba(139,92,246,0.5)]
                       disabled:opacity-20 disabled:cursor-not-allowed
                       disabled:animate-none
                       disabled:hover:border-violet-400/50 
                       disabled:hover:shadow-[inset_0_0_20px_rgba(139,92,246,0.15)]
                       flex items-center gap-3"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <Sparkles size={14} strokeWidth={1.5} className="opacity-60 group-hover:opacity-100 transition-opacity" />
            Visualize
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommandCenter;
