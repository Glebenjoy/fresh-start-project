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
        "backdrop-blur-md transition-all duration-300",
        isSelected
          ? "bg-white text-black border border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white hover:border-white/20"
      )}
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {label}
    </button>
  );
};

export default MoodChip;
