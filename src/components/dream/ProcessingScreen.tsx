import { useState, useEffect } from "react";

const DREAM_FACTS = [
  "Did you know? 12% of people dream in black and white...",
  "Dreams help your brain process emotions and memories...",
  "The most common nightmare is falling...",
  "On average, you forget 95% of dreams within 5 minutes of waking...",
  "Lucid dreaming can be learned with practice...",
  "Blind people dream with other senses: sounds, touch, smells...",
];

const ProcessingScreen = () => {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [status, setStatus] = useState("Synchronizing...");

  // Rotate facts every 4 seconds
  useEffect(() => {
    const factInterval = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % DREAM_FACTS.length);
    }, 4000);

    return () => clearInterval(factInterval);
  }, []);

  // Update status messages
  useEffect(() => {
    const timer1 = setTimeout(() => setStatus("Analyzing symbols..."), 1500);
    const timer2 = setTimeout(() => setStatus("Generating visualization..."), 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-12 animate-fade-in">
      {/* Pulsing white sphere */}
      <div className="relative">
        {/* Outer glow */}
        <div className="absolute inset-0 w-32 h-32 rounded-full 
                        bg-white/20 animate-ping" />
        
        {/* Inner sphere */}
        <div className="relative w-32 h-32 rounded-full 
                        bg-white/10 border border-white/20
                        flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white/30 animate-pulse" />
        </div>
      </div>

      {/* Status text */}
      <div className="text-center space-y-4">
        <p className="text-lg text-foreground/90 font-medium">
          {status}
        </p>
        
        {/* Rotating fact */}
        <p 
          key={currentFactIndex}
          className="text-sm text-muted-foreground max-w-sm mx-auto italic animate-fade-in"
        >
          {DREAM_FACTS[currentFactIndex]}
        </p>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-white/30 animate-pulse"
            style={{ animationDelay: `${i * 200}ms` }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProcessingScreen;
