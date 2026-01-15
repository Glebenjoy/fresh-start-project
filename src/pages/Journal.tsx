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
      {/* Aurora Background Blobs */}
      <div className="aurora-blob w-[600px] h-[600px] bg-indigo-600/20 top-[-200px] left-[-200px] aurora-float" />
      <div className="aurora-blob w-[500px] h-[500px] bg-fuchsia-600/10 bottom-[-150px] right-[-150px] aurora-float-delayed" />
      
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
              <h1 className="text-3xl md:text-4xl font-bold 
                             bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
                Dream Journal
              </h1>
              <p className="text-muted-foreground text-sm">
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
    <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20 
                    flex items-center justify-center border border-white/10">
      <Sparkles size={40} strokeWidth={1} className="text-indigo-400" />
    </div>
    <h2 className="text-2xl font-semibold text-foreground mb-2">
      Your subconscious is waiting...
    </h2>
    <p className="text-muted-foreground text-center max-w-md mb-8">
      You haven't recorded any dreams yet. Start your journey into the depths of your mind.
    </p>
    <Link to="/">
      <Button className="btn-holographic px-8 py-3 h-auto text-base">
        <Plus size={20} strokeWidth={2} className="mr-2" />
        Record a Dream
      </Button>
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
    <div className="glass-card rounded-xl overflow-hidden 
                    transition-all duration-300 
                    hover:border-white/20 hover:scale-[1.02]
                    hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]">
      {dream.image_url && (
        <div className="relative overflow-hidden">
          <img
            src={dream.image_url}
            alt={dream.title || "Dream visualization"}
            className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      )}
      <div className="p-4">
        <h3 className="font-semibold text-foreground text-lg mb-1 line-clamp-2">
          {dream.title || "Untitled Dream"}
        </h3>
        {dream.interpretation_preview && (
          <p className="text-muted-foreground text-sm line-clamp-2">
            {dream.interpretation_preview}
          </p>
        )}
        <p className="text-muted-foreground/60 text-xs mt-2">
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
