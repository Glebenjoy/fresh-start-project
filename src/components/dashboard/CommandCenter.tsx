import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Mic } from "lucide-react";
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
      {/* Command Center Panel */}
      <div className="relative rounded-2xl bg-zinc-900/50 backdrop-blur-xl border border-white/10 
                      shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] p-6 md:p-8">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white tracking-tight">Dream Input</h2>
          <p className="text-sm text-zinc-400 mt-1">Describe your dream in detail</p>
        </div>

        {/* Input Area */}
        <div className="relative">
          <Textarea
            value={dreamText}
            onChange={handleTextChange}
            placeholder="Tell me your dream..."
            className="w-full min-h-[180px] bg-zinc-800/50 border border-white/5 rounded-xl
                       text-white text-base leading-relaxed p-5 resize-none
                       placeholder:text-zinc-500 placeholder:italic
                       focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30
                       focus-visible:ring-offset-0 transition-all duration-200"
            disabled={isLoading}
          />
          
          {/* Voice Button */}
          <button 
            className="absolute bottom-4 right-4 p-2 text-zinc-500 hover:text-zinc-300 transition-colors"
            disabled={isLoading}
          >
            <Mic size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* Footer with Counter & Button */}
        <div className="mt-5 flex items-center justify-between">
          <span className="text-xs text-zinc-500 font-medium">
            {dreamText.length} characters
          </span>

          <button
            onClick={handleSubmit}
            disabled={isLoading || dreamText.trim().length < 10}
            className="group px-6 py-2.5 rounded-lg font-medium text-sm
                       bg-violet-600 hover:bg-violet-500
                       text-white
                       shadow-lg shadow-violet-600/20
                       hover:shadow-violet-500/30
                       disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-violet-600
                       transition-all duration-200
                       flex items-center gap-2"
          >
            <Sparkles size={16} strokeWidth={2} className="opacity-80" />
            Visualize
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommandCenter;
