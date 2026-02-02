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
      {/* Command Center Panel - High-Contrast Glass */}
      <div className="relative rounded-3xl bg-white/10 backdrop-blur-2xl 
                      border border-white/20
                      shadow-[0_0_60px_rgba(139,92,246,0.25)]
                      p-8 md:p-10">
        
        {/* Input Area */}
        <div className="relative">
          <Textarea
            value={dreamText}
            onChange={handleTextChange}
            placeholder="I was walking through a forest when suddenly..."
            className="w-full min-h-[180px] bg-transparent border-0
                       text-white text-lg leading-relaxed p-0 resize-none
                       placeholder:text-white/40
                       focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0
                       transition-all duration-300
                       caret-violet-400"
            style={{ fontFamily: "'Cormorant', serif" }}
            disabled={isLoading}
          />
        </div>

        {/* Subtle divider */}
        <div className="h-px bg-white/10 my-6" />

        {/* Footer with Counter & Visualize Button */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-white/40 uppercase tracking-[0.25em]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {dreamText.length} characters
          </span>

          {/* Visualize Button - Bright Gradient */}
          <button
            onClick={handleSubmit}
            disabled={isLoading || dreamText.trim().length < 10}
            className="group px-8 py-3 rounded-full 
                       text-sm font-bold uppercase tracking-[0.15em]
                       bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500
                       border border-white/20
                       shadow-[0_0_30px_rgba(168,85,247,0.5)]
                       text-white
                       transition-all duration-300 ease-out
                       hover:shadow-[0_0_50px_rgba(168,85,247,0.7)]
                       hover:scale-105 hover:brightness-110
                       active:scale-95
                       disabled:opacity-40 disabled:cursor-not-allowed
                       disabled:hover:scale-100 disabled:hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]
                       flex items-center gap-3"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <Sparkles size={16} strokeWidth={2} className="opacity-90" />
            Visualize
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommandCenter;
