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
        "px-5 py-2 rounded-full whitespace-nowrap",
        "text-sm tracking-wide",
        "bg-transparent backdrop-blur-sm",
        "border transition-all duration-300",
        isSelected
          ? "border-white/40 text-white shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          : "border-white/10 text-white/50 hover:text-white/80 hover:border-white/25 hover:shadow-[0_0_12px_rgba(255,255,255,0.1)]"
      )}
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {label}
    </button>
  );
};

export default MoodChip;
