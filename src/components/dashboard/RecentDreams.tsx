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
        <h3 className="text-[10px] uppercase tracking-[0.25em] text-white/30" 
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Recent Visions
        </h3>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex-shrink-0 w-28 h-36 rounded-2xl bg-white/[0.02] animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (dreams.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-[10px] uppercase tracking-[0.25em] text-white/30" 
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Recent Visions
        </h3>
        <div className="flex items-center justify-center py-10 px-6 rounded-2xl 
                        bg-transparent border border-white/5 border-dashed">
          <div className="text-center">
            <Sparkles className="w-5 h-5 text-white/15 mx-auto mb-3" strokeWidth={1.5} />
            <p className="text-white/30 text-sm italic" style={{ fontFamily: "'Cormorant', serif" }}>
              Your journey begins tonight.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-[10px] uppercase tracking-[0.25em] text-white/30" 
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        Recent Visions
      </h3>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {dreams.map((dream) => (
          <div
            key={dream.id}
            className="flex-shrink-0 w-28 rounded-2xl overflow-hidden
                       bg-transparent border border-white/5
                       hover:border-white/15 hover:shadow-[0_0_25px_rgba(255,255,255,0.08)]
                       transition-all duration-300 cursor-pointer group"
          >
            {dream.image_url ? (
              <div className="relative aspect-[3/4]">
                <img
                  src={dream.image_url}
                  alt={dream.title || "Dream"}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                <p className="absolute bottom-2 left-2 right-2 text-[10px] text-white/70 truncate"
                   style={{ fontFamily: "'Cormorant', serif" }}>
                  {dream.title || "Untitled"}
                </p>
              </div>
            ) : (
              <div className="aspect-[3/4] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white/15" strokeWidth={1.5} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentDreams;
