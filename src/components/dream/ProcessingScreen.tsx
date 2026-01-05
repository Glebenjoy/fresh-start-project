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
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-12 animate-fade-in-up">
      {/* Breathing amber sphere */}
      <div className="relative">
        {/* Outer glow */}
        <div className="absolute inset-0 w-32 h-32 rounded-full 
                        bg-gradient-to-br from-amber-400 to-amber-600
                        animate-breathe opacity-60" />
        
        {/* Inner sphere */}
        <div className="relative w-32 h-32 rounded-full 
                        bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600
                        animate-pulse-glow shadow-2xl
                        flex items-center justify-center">
          <div className="w-16 h-16 rounded-full 
                          bg-gradient-to-br from-amber-200 to-amber-400
                          opacity-80 blur-sm" />
        </div>
      </div>

      {/* Status text */}
      <div className="text-center space-y-4">
        <p className="text-lg text-foreground/90 font-medium">
          {status}
        </p>
        
        {/* Rotating fact with fade animation */}
        <p 
          key={currentFactIndex}
          className="text-sm text-muted-foreground max-w-sm mx-auto
                     italic animate-fade-in-up"
        >
          {DREAM_FACTS[currentFactIndex]}
        </p>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-amber-500/50 animate-pulse"
            style={{ animationDelay: `${i * 200}ms` }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProcessingScreen;
