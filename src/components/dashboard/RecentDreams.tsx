import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles } from "lucide-react";

interface DreamPreview {
  id: string;
  title: string | null;
  image_url: string | null;
  created_at: string | null;
}

const RecentDreams = () => {
  const [dreams, setDreams] = useState<DreamPreview[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecentDreams = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setIsLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from("dreams")
          .select("id, title, image_url, created_at")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(3);

        if (error) throw error;
        setDreams(data || []);
      } catch (error) {
        console.error("Error fetching recent dreams:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentDreams();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-xs uppercase tracking-[0.2em] text-white/40 font-semibold">
          Recent Visions
        </h3>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex-shrink-0 w-28 h-36 rounded-[24px] bg-white/[0.03] animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (dreams.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-xs uppercase tracking-[0.2em] text-white/40 font-semibold">
          Recent Visions
        </h3>
        <div className="flex items-center justify-center py-12 px-6 rounded-[32px] 
                        bg-white/[0.03] backdrop-blur-2xl
                        border border-white/[0.15]
                        shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
          <div className="text-center">
            <Sparkles className="w-6 h-6 text-white/30 mx-auto mb-4" strokeWidth={1.5} />
            <p className="text-white/50 text-base font-medium">
              Your journey begins tonight.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xs uppercase tracking-[0.2em] text-white/40 font-semibold">
        Recent Visions
      </h3>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {dreams.map((dream) => (
          <div
            key={dream.id}
            className="flex-shrink-0 w-28 rounded-[24px] overflow-hidden
                       bg-white/[0.03] backdrop-blur-2xl
                       border border-white/[0.15]
                       shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]
                       hover:border-white/[0.25] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_0_25px_rgba(139,92,246,0.2)]
                       transition-all duration-300 cursor-pointer group"
          >
            {dream.image_url ? (
              <div className="relative aspect-[3/4]">
                <img
                  src={dream.image_url}
                  alt={dream.title || "Dream"}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                <p className="absolute bottom-3 left-3 right-3 text-[10px] text-white/80 truncate font-semibold">
                  {dream.title || "Untitled"}
                </p>
              </div>
            ) : (
              <div className="aspect-[3/4] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white/30" strokeWidth={1.5} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentDreams;
