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
        "transition-all duration-300",
        isSelected
          ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white hover:border-violet-500/40 hover:shadow-[0_0_15px_rgba(139,92,246,0.25)]"
      )}
    >
      {label}
    </button>
  );
};

export default MoodChip;
