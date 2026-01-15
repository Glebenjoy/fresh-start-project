import { LucideIcon } from "lucide-react";

interface StatWidgetProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subtext?: string;
}

const StatWidget = ({ icon: Icon, label, value, subtext }: StatWidgetProps) => {
  return (
    <div className="group rounded-2xl bg-white/[0.03] backdrop-blur-2xl 
                    border border-white/[0.15]
                    shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]
                    hover:border-white/[0.3] 
                    hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_0_40px_rgba(124,58,237,0.15)]
                    transition-all duration-300 p-5">
      <div className="flex items-start gap-3">
        <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1]
                        text-zinc-300 group-hover:text-white 
                        group-hover:border-violet-400/40 group-hover:bg-violet-500/15
                        transition-all duration-300">
          <Icon size={18} strokeWidth={1.5} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-[0.15em]">{label}</p>
          <p className="text-2xl font-bold mt-1.5 tracking-tight text-white
                        drop-shadow-[0_0_15px_rgba(255,255,255,0.25)]">
            {value}
          </p>
          {subtext && (
            <p className="text-[11px] text-zinc-500 mt-1">{subtext}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatWidget;
