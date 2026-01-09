import { useState, useEffect } from "react";

const SYSTEM_OPERATIONS = [
  "Connecting to subconscious...",
  "Detecting emotional patterns...",
  "Weaving visual textures...",
  "Rendering high-fidelity dreamscape...",
];

const ProcessingScreen = () => {
  const [currentOpIndex, setCurrentOpIndex] = useState(0);

  // Rotate operations every 800ms (fast, dynamic)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOpIndex((prev) => (prev + 1) % SYSTEM_OPERATIONS.length);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-16 animate-fade-in">
      {/* Hypnotic Orb - Multiple spinning rings */}
      <div className="relative w-40 h-40 flex items-center justify-center">
        {/* Outer ring */}
        <div 
          className="absolute inset-0 rounded-full border-2 border-indigo-500 orb-ring"
          style={{ borderStyle: 'dashed' }}
        />
        
        {/* Middle ring */}
        <div 
          className="absolute inset-4 rounded-full border-2 border-cyan-400 orb-ring-reverse"
          style={{ borderStyle: 'dotted' }}
        />
        
        {/* Inner ring */}
        <div 
          className="absolute inset-8 rounded-full border border-pink-500 orb-ring-slow"
        />
        
        {/* Core - breathing gradient */}
        <div className="relative w-12 h-12 rounded-full orb-core bg-gradient-to-br from-indigo-500 via-cyan-400 to-pink-500" />
      </div>

      {/* System Operations text */}
      <div className="text-center space-y-2">
        <p 
          key={currentOpIndex}
          className="text-lg text-foreground/90 font-medium tracking-wide animate-fade-in"
        >
          {SYSTEM_OPERATIONS[currentOpIndex]}
        </p>
        
        {/* Subtle tech indicator */}
        <div className="flex justify-center gap-1 mt-4">
          {SYSTEM_OPERATIONS.map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === currentOpIndex 
                  ? 'bg-gradient-to-r from-indigo-500 to-pink-500 scale-125' 
                  : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProcessingScreen;
