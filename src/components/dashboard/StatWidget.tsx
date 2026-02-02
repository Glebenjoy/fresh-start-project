import { LucideIcon } from "lucide-react";

interface StatWidgetProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subtext?: string;
}

const StatWidget = ({ icon: Icon, label, value, subtext }: StatWidgetProps) => {
  return (
    <div className="group rounded-[32px] 
                    bg-white/[0.03] backdrop-blur-2xl 
                    border border-white/[0.15]
                    shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]
                    hover:border-white/[0.25] 
                    hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_0_30px_rgba(139,92,246,0.15)]
                    transition-all duration-300 p-6">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-2xl 
                        bg-white/[0.05] border border-white/[0.1]
                        text-white/60 group-hover:text-white 
                        group-hover:border-violet-400/40 group-hover:bg-violet-500/10
                        transition-all duration-300">
          <Icon size={20} strokeWidth={1.5} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-white/40 font-semibold uppercase tracking-[0.2em]">{label}</p>
          <p className="text-3xl font-extrabold mt-2 tracking-tight text-white">
            {value}
          </p>
          {subtext && (
            <p className="text-xs text-white/30 mt-1">{subtext}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatWidget;
