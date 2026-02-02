import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Mic, PenLine } from "lucide-react";
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
      {/* Command Center Panel - Large Glass Card */}
      <div className="relative rounded-3xl bg-zinc-900/40 backdrop-blur-xl 
                      border border-white/10
                      shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]
                      p-6 md:p-8">
        {/* Header */}
        <div className="mb-5 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-violet-500/15 border border-violet-400/20 text-violet-300">
            <PenLine size={16} strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white tracking-tight uppercase"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Dream Input
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">Describe your dream in detail</p>
          </div>
        </div>

        {/* Input Area - Dark Recessed Slate */}
        <div className="relative">
          <Textarea
            value={dreamText}
            onChange={handleTextChange}
            placeholder="I was walking through a forest when suddenly..."
            className="w-full min-h-[160px] bg-black/50 border border-white/[0.08] rounded-xl
                       text-white text-base leading-relaxed p-5 resize-none
                       placeholder:text-zinc-600 placeholder:italic
                       focus:border-violet-400/40 focus:bg-black/60
                       focus:ring-1 focus:ring-violet-400/20
                       focus-visible:ring-offset-0 transition-all duration-300
                       caret-violet-400"
            disabled={isLoading}
          />
          
          {/* Voice Button */}
          <button 
            className="absolute bottom-4 right-4 p-2 rounded-lg
                       bg-white/[0.03] border border-white/[0.08]
                       text-zinc-500 hover:text-white hover:bg-white/[0.08]
                       transition-all duration-200"
            disabled={isLoading}
          >
            <Mic size={14} strokeWidth={1.5} />
          </button>
        </div>

        {/* Footer with Counter & Prism Trigger Button */}
        <div className="mt-5 flex items-center justify-between">
          <span className="text-[11px] text-zinc-600 font-medium uppercase tracking-widest">
            {dreamText.length} characters
          </span>

          {/* Prism Trigger Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading || dreamText.trim().length < 10}
            className="group px-7 py-2.5 rounded-full 
                       font-semibold text-sm uppercase tracking-[0.12em]
                       bg-black/70 backdrop-blur-md
                       border border-violet-400/60
                       shadow-[inset_0_0_15px_rgba(139,92,246,0.2)]
                       text-white
                       transition-all duration-300 ease-out
                       animate-prism-pulse
                       hover:bg-violet-500/20 hover:border-violet-300
                       hover:shadow-[inset_0_0_25px_rgba(139,92,246,0.35),0_0_35px_rgba(139,92,246,0.45)]
                       active:shadow-[inset_0_0_35px_rgba(139,92,246,0.5),0_0_45px_rgba(139,92,246,0.6)]
                       disabled:opacity-30 disabled:cursor-not-allowed
                       disabled:animate-none
                       disabled:hover:bg-black/70 disabled:hover:border-violet-400/60 
                       disabled:hover:shadow-[inset_0_0_15px_rgba(139,92,246,0.2)]
                       flex items-center gap-2.5"
          >
            <Sparkles size={14} strokeWidth={2} className="opacity-70 group-hover:opacity-100 transition-opacity" />
            Visualize
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommandCenter;
