import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Share2 } from "lucide-react";

interface Dream {
  id: string;
  title: string | null;
  image_url: string | null;
  interpretation_preview: string | null;
  interpretation_full: string | null;
  created_at: string | null;
}

interface DreamCardModalProps {
  dream: Dream | null;
  isOpen: boolean;
  onClose: () => void;
}

const DreamCardModal = ({ dream, isOpen, onClose }: DreamCardModalProps) => {
  if (!dream) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-[#0A0A0A] border-white/10 p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Image Header */}
        {dream.image_url && (
          <div className="relative">
            <img
              src={dream.image_url}
              alt={dream.title || "Dream visualization"}
              className="w-full aspect-[4/3] object-cover"
            />
            
            {/* Share button overlay */}
            <button 
              className="absolute top-4 right-4 p-3 rounded-full
                         bg-black/50 backdrop-blur-sm border border-white/10
                         hover:bg-black/70 transition-colors
                         text-white/90 hover:text-white"
            >
              <Share2 size={20} strokeWidth={1.5} />
            </button>
          </div>
        )}

        <div className="p-6 space-y-4">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-foreground">
              {dream.title || "Untitled Dream"}
            </DialogTitle>
            {dream.created_at && (
              <p className="text-muted-foreground/60 text-sm">
                {new Date(dream.created_at).toLocaleDateString('en-US', { 
                  weekday: 'long',
                  month: 'long', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            )}
          </DialogHeader>

          {/* Hook Text */}
          {dream.interpretation_preview && (
            <p className="text-foreground/90 text-lg leading-relaxed font-medium italic">
              "{dream.interpretation_preview}"
            </p>
          )}

          {/* Full Interpretation */}
          {dream.interpretation_full && (
            <div className="pt-2">
              <p className="text-muted-foreground leading-relaxed">
                {dream.interpretation_full}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DreamCardModal;
