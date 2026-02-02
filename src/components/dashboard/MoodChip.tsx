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
        "px-6 py-3 rounded-full whitespace-nowrap",
        "text-sm font-semibold tracking-wide",
        "backdrop-blur-2xl transition-all duration-300",
        isSelected
          ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)]"
          : "bg-white/[0.03] border border-white/[0.15] text-white/60 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] hover:bg-white/[0.08] hover:text-white hover:border-white/[0.25]"
      )}
    >
      {label}
    </button>
  );
};

export default MoodChip;
