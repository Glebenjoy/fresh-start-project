import { cn } from "@/lib/utils";

interface MoodChipProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const MoodChip = ({ label, isSelected, onClick }: MoodChipProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-5 py-2.5 rounded-full whitespace-nowrap",
        "text-sm font-medium tracking-wide",
        "backdrop-blur-xl transition-all duration-300",
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]",
        isSelected
          ? "bg-white text-black border border-white shadow-[0_0_15px_rgba(255,255,255,0.25)]"
          : "bg-white/[0.03] border border-white/[0.08] text-zinc-400 hover:bg-white/[0.06] hover:text-white hover:border-white/[0.15] hover:shadow-[0_0_10px_rgba(255,255,255,0.1)]"
      )}
    >
      {label}
    </button>
  );
};

export default MoodChip;
