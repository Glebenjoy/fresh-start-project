import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Sparkles, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import DreamCardModal from "@/components/dream/DreamCardModal";

interface Dream {
  id: string;
  title: string | null;
  image_url: string | null;
  interpretation_preview: string | null;
  interpretation_full: string | null;
  created_at: string | null;
}

const Journal = () => {
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [selectedDream, setSelectedDream] = useState<Dream | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        navigate("/");
        return;
      }
      
      setUser(session.user);
      await fetchDreams(session.user.id);
    };

    checkAuthAndFetch();
  }, [navigate]);

  const fetchDreams = async (userId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("dreams")
        .select("id, title, image_url, interpretation_preview, interpretation_full, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setDreams(data || []);
    } catch (error) {
      console.error("Failed to fetch dreams:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Living Aurora Background */}
      <div className="aurora-blob w-[800px] h-[800px] bg-purple-900/30 blur-[120px] top-[-300px] left-[-300px] aurora-breathe" />
      <div className="aurora-blob w-[600px] h-[600px] bg-cyan-900/30 blur-[120px] bottom-[-200px] right-[-200px] aurora-breathe-alt" />
      
      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between mb-8 animate-fade-in">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button 
                variant="ghost" 
                size="icon"
                className="text-muted-foreground hover:text-foreground hover:bg-white/5"
              >
                <ArrowLeft size={20} strokeWidth={1.5} />
              </Button>
            </Link>
            <div>
              <h1 className="font-mystic text-4xl md:text-5xl font-medium italic text-white tracking-wide">
                Dream Journal
              </h1>
              <p className="text-white/30 text-sm font-body mt-1">
                Your subconscious archive
              </p>
            </div>
          </div>
          
          <Link to="/">
            <Button className="btn-holographic px-5 py-2 h-auto">
              <Plus size={18} strokeWidth={2} className="mr-2" />
              New Dream
            </Button>
          </Link>
        </header>

        {/* Content */}
        <main className="flex-1">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-12 h-12 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : dreams.length === 0 ? (
            <EmptyState />
          ) : (
            <MasonryGrid dreams={dreams} onDreamClick={setSelectedDream} />
          )}
        </main>
      </div>

      {/* Dream Modal */}
      <DreamCardModal 
        dream={selectedDream}
        isOpen={!!selectedDream}
        onClose={() => setSelectedDream(null)}
      />
    </div>
  );
};

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
    <div className="w-24 h-24 mb-6 rounded-full bg-white/[0.03] backdrop-blur-md
                    flex items-center justify-center">
      <Sparkles size={40} strokeWidth={1} className="text-purple-400/60" />
    </div>
    <h2 className="font-mystic text-3xl italic text-white mb-3">
      Your subconscious is waiting...
    </h2>
    <p className="text-white/30 text-center max-w-md mb-10 font-body">
      You haven't recorded any dreams yet. Start your journey into the depths of your mind.
    </p>
    <Link to="/">
      <button className="px-8 py-3 rounded-full text-base font-medium
                         bg-white/5 backdrop-blur-md border border-white/10
                         text-white/90 hover:bg-white/10 hover:border-white/20
                         transition-all duration-300 flex items-center gap-2">
        <Plus size={18} strokeWidth={2} />
        Record a Dream
      </button>
    </Link>
  </div>
);

interface MasonryGridProps {
  dreams: Dream[];
  onDreamClick: (dream: Dream) => void;
}

const MasonryGrid = ({ dreams, onDreamClick }: MasonryGridProps) => (
  <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 animate-fade-in">
    {dreams.map((dream, index) => (
      <DreamCard 
        key={dream.id} 
        dream={dream} 
        onClick={() => onDreamClick(dream)}
        delay={index * 0.1}
      />
    ))}
  </div>
);

interface DreamCardProps {
  dream: Dream;
  onClick: () => void;
  delay: number;
}

const DreamCard = ({ dream, onClick, delay }: DreamCardProps) => (
  <div 
    onClick={onClick}
    className="break-inside-avoid mb-4 group cursor-pointer"
    style={{ animationDelay: `${delay}s` }}
  >
    <div className="shard-card overflow-hidden">
      {dream.image_url && (
        <div className="relative overflow-hidden">
          <img
            src={dream.image_url}
            alt={dream.title || "Dream visualization"}
            className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}
      <div className="p-5">
        <h3 className="font-mystic text-xl italic text-white mb-2 line-clamp-2">
          {dream.title || "Untitled Dream"}
        </h3>
        {dream.interpretation_preview && (
          <p className="text-white/40 text-sm line-clamp-2 font-body">
            {dream.interpretation_preview}
          </p>
        )}
        <p className="text-white/20 text-xs mt-3 font-body tracking-wide">
          {dream.created_at 
            ? new Date(dream.created_at).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
              })
            : ""}
        </p>
      </div>
    </div>
  </div>
);

export default Journal;
