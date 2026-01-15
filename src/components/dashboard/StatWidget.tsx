import { LucideIcon } from "lucide-react";

interface StatWidgetProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subtext?: string;
}

const StatWidget = ({ icon: Icon, label, value, subtext }: StatWidgetProps) => {
  return (
    <div className="rounded-2xl bg-zinc-900/30 backdrop-blur-md border border-white/5 p-5
                    shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]
                    hover:border-white/10 transition-all duration-200">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-zinc-800/50 text-zinc-400">
          <Icon size={18} strokeWidth={1.5} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-zinc-500 font-medium uppercase tracking-wide">{label}</p>
          <p className="text-2xl font-bold text-white mt-1 tracking-tight">{value}</p>
          {subtext && (
            <p className="text-xs text-zinc-500 mt-1">{subtext}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatWidget;
