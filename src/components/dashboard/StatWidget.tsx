import { LucideIcon } from "lucide-react";

interface StatWidgetProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subtext?: string;
}

const StatWidget = ({ icon: Icon, label, value, subtext }: StatWidgetProps) => {
  return (
    <div className="group rounded-2xl bg-white/[0.02] backdrop-blur-2xl 
                    border border-white/[0.06]
                    shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]
                    hover:bg-white/[0.04] hover:border-white/[0.1]
                    hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),0_0_40px_rgba(99,102,241,0.06)]
                    transition-all duration-300 p-5">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.06]
                        text-zinc-400 group-hover:text-white/80 transition-colors duration-300">
          <Icon size={18} strokeWidth={1.5} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-[0.15em]">{label}</p>
          <p className="text-2xl font-bold mt-1.5 tracking-tight
                        bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80
                        drop-shadow-[0_0_10px_rgba(255,255,255,0.15)]">
            {value}
          </p>
          {subtext && (
            <p className="text-[11px] text-zinc-600 mt-1 tracking-wide">{subtext}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatWidget;
