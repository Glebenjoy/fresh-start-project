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
    <div className="col-span-12">
      {/* Command Center Panel - Premium Frosted Glass */}
      <div className="relative rounded-2xl bg-white/[0.03] backdrop-blur-2xl 
                      border border-white/[0.15]
                      shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]
                      hover:border-white/[0.25]
                      transition-all duration-300
                      p-6 md:p-8">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-violet-500/15 border border-violet-400/25 text-violet-300">
            <PenLine size={18} strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-tight uppercase">Dream Input</h2>
            <p className="text-xs text-zinc-400 mt-0.5">Describe your dream in detail</p>
          </div>
        </div>

        {/* Input Area - Dark Recessed Slate */}
        <div className="relative">
          <Textarea
            value={dreamText}
            onChange={handleTextChange}
            placeholder="I was walking through a forest when suddenly..."
            className="w-full min-h-[180px] bg-black/40 border border-white/[0.1] rounded-xl
                       text-white text-base leading-relaxed p-5 resize-none
                       placeholder:text-zinc-500 placeholder:italic
                       focus:border-violet-400/40 focus:bg-black/50
                       focus:ring-1 focus:ring-violet-400/20
                       focus-visible:ring-offset-0 transition-all duration-300
                       caret-violet-400"
            disabled={isLoading}
          />
          
          {/* Voice Button */}
          <button 
            className="absolute bottom-4 right-4 p-2.5 rounded-lg
                       bg-white/[0.05] border border-white/[0.1]
                       text-zinc-400 hover:text-white hover:bg-white/[0.1] hover:border-white/[0.2]
                       transition-all duration-200"
            disabled={isLoading}
          >
            <Mic size={16} strokeWidth={1.5} />
          </button>
        </div>

        {/* Footer with Counter & Prism Trigger Button */}
        <div className="mt-5 flex items-center justify-between">
          <span className="text-[11px] text-zinc-500 font-medium uppercase tracking-widest">
            {dreamText.length} characters
          </span>

          {/* Prism Trigger Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading || dreamText.trim().length < 10}
            className="group px-8 py-3 rounded-full 
                       font-semibold text-sm uppercase tracking-[0.15em]
                       bg-black/60 backdrop-blur-md
                       border border-violet-400/70
                       shadow-[inset_0_0_20px_rgba(139,92,246,0.25)]
                       text-white
                       transition-all duration-300 ease-out
                       animate-prism-pulse
                       hover:bg-violet-500/20 hover:border-violet-300
                       hover:shadow-[inset_0_0_30px_rgba(139,92,246,0.4),0_0_40px_rgba(139,92,246,0.5)]
                       active:shadow-[inset_0_0_40px_rgba(139,92,246,0.6),0_0_50px_rgba(139,92,246,0.7)]
                       disabled:opacity-30 disabled:cursor-not-allowed
                       disabled:animate-none
                       disabled:hover:bg-black/60 disabled:hover:border-violet-400/70 
                       disabled:hover:shadow-[inset_0_0_20px_rgba(139,92,246,0.25)]
                       flex items-center gap-3"
          >
            <Sparkles size={16} strokeWidth={2} className="opacity-70 group-hover:opacity-100 transition-opacity" />
            Visualize
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommandCenter;
