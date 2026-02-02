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
      {/* Command Center Panel - Soft Glass */}
      <div className="relative rounded-3xl bg-white/[0.02] backdrop-blur-xl 
                      border border-white/[0.08]
                      shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),0_0_40px_rgba(124,58,237,0.15)]
                      p-8 md:p-10">
        
        {/* Input Area */}
        <div className="relative">
          <Textarea
            value={dreamText}
            onChange={handleTextChange}
            placeholder="I was walking through a forest when suddenly..."
            className="w-full min-h-[180px] bg-transparent border-0
                       text-white text-lg leading-relaxed p-0 resize-none
                       placeholder:text-zinc-500
                       focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0
                       transition-all duration-300
                       caret-violet-400"
            style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400 }}
            disabled={isLoading}
          />
        </div>

        {/* Subtle divider */}
        <div className="h-px bg-white/[0.06] my-6" />

        {/* Footer with Counter & Visualize Button */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-medium">
            {dreamText.length} characters
          </span>

          {/* Visualize Button - Hero Capsule */}
          <button
            onClick={handleSubmit}
            disabled={isLoading || dreamText.trim().length < 10}
            className="group px-8 py-3.5 rounded-full 
                       text-sm font-bold uppercase tracking-widest
                       bg-gradient-to-r from-violet-600 to-indigo-600
                       shadow-[0_0_20px_rgba(124,58,237,0.4)]
                       text-white
                       transition-all duration-300 ease-out
                       hover:shadow-[0_0_30px_rgba(124,58,237,0.6)]
                       hover:scale-[1.02] hover:brightness-110
                       active:scale-[0.98]
                       disabled:opacity-40 disabled:cursor-not-allowed
                       disabled:hover:scale-100 disabled:hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]
                       flex items-center gap-3"
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
