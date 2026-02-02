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
        <h3 className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-medium">
          Recent Visions
        </h3>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex-shrink-0 w-28 h-36 rounded-3xl bg-white/[0.02] animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (dreams.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-medium">
          Recent Visions
        </h3>
        <div className="flex items-center justify-center py-10 px-6 rounded-3xl 
                        bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl
                        shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
          <div className="text-center">
            <Sparkles className="w-5 h-5 text-zinc-600 mx-auto mb-3" strokeWidth={1.5} />
            <p className="text-zinc-400 text-sm font-medium">
              Your journey begins tonight.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-medium">
        Recent Visions
      </h3>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {dreams.map((dream) => (
          <div
            key={dream.id}
            className="flex-shrink-0 w-28 rounded-3xl overflow-hidden
                       bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl
                       shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]
                       hover:border-white/[0.15] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),0_0_20px_rgba(124,58,237,0.15)]
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
                <p className="absolute bottom-2 left-2 right-2 text-[10px] text-zinc-300 truncate font-medium">
                  {dream.title || "Untitled"}
                </p>
              </div>
            ) : (
              <div className="aspect-[3/4] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-zinc-600" strokeWidth={1.5} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentDreams;
