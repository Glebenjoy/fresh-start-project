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
        "font-medium text-sm tracking-wide",
        "bg-white/[0.03] backdrop-blur-xl",
        "border transition-all duration-300",
        isSelected
          ? "border-violet-400/70 text-white shadow-[0_0_20px_rgba(139,92,246,0.4),inset_0_0_15px_rgba(139,92,246,0.2)]"
          : "border-white/[0.1] text-zinc-400 hover:text-white hover:border-white/[0.25] hover:bg-white/[0.05]"
      )}
    >
      {label}
    </button>
  );
};

export default MoodChip;
