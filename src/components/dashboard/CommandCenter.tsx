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
      {/* Command Center Panel - Frosted Glass */}
      <div className="relative rounded-2xl bg-white/[0.03] backdrop-blur-2xl 
                      border border-white/[0.08]
                      shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),0_0_80px_rgba(99,102,241,0.05)]
                      p-6 md:p-8">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400">
            <PenLine size={18} strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white tracking-tight uppercase">Dream Input</h2>
            <p className="text-xs text-zinc-500 mt-0.5 tracking-wide">Describe your dream in detail</p>
          </div>
        </div>

        {/* Input Area */}
        <div className="relative">
          <Textarea
            value={dreamText}
            onChange={handleTextChange}
            placeholder="I was walking through a forest when suddenly..."
            className="w-full min-h-[180px] bg-white/[0.02] border border-white/[0.06] rounded-xl
                       text-white/90 text-base leading-relaxed p-5 resize-none
                       placeholder:text-zinc-600 placeholder:italic
                       focus:border-violet-500/40 focus:bg-white/[0.03]
                       focus:ring-1 focus:ring-violet-500/20
                       focus-visible:ring-offset-0 transition-all duration-300"
            disabled={isLoading}
          />
          
          {/* Voice Button */}
          <button 
            className="absolute bottom-4 right-4 p-2.5 rounded-lg
                       bg-white/[0.03] border border-white/[0.06]
                       text-zinc-500 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.1]
                       transition-all duration-200"
            disabled={isLoading}
          >
            <Mic size={16} strokeWidth={1.5} />
          </button>
        </div>

        {/* Footer with Counter & Button */}
        <div className="mt-5 flex items-center justify-between">
          <span className="text-[11px] text-zinc-600 font-medium uppercase tracking-widest">
            {dreamText.length} characters
          </span>

          <button
            onClick={handleSubmit}
            disabled={isLoading || dreamText.trim().length < 10}
            className="group px-6 py-2.5 rounded-xl font-semibold text-sm
                       bg-gradient-to-r from-violet-600 to-indigo-600
                       hover:from-violet-500 hover:to-indigo-500
                       text-white
                       shadow-[0_0_20px_rgba(139,92,246,0.3),inset_0_1px_0_0_rgba(255,255,255,0.1)]
                       hover:shadow-[0_0_30px_rgba(139,92,246,0.4),inset_0_1px_0_0_rgba(255,255,255,0.15)]
                       disabled:opacity-30 disabled:cursor-not-allowed 
                       disabled:hover:from-violet-600 disabled:hover:to-indigo-600
                       disabled:hover:shadow-[0_0_20px_rgba(139,92,246,0.3),inset_0_1px_0_0_rgba(255,255,255,0.1)]
                       transition-all duration-300
                       flex items-center gap-2"
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
