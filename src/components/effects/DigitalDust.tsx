import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  color: "white" | "purple";
}

const DigitalDust = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < 20; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 1.5 + 1.5, // 1.5px - 3px
          duration: Math.random() * 15 + 20, // 20-35s
          delay: Math.random() * 10,
          opacity: Math.random() * 0.4 + 0.1, // 0.1 - 0.5
          color: Math.random() > 0.6 ? "purple" : "white",
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-dust-float"
          style={{
            left: `${particle.x}%`,
            bottom: `-5%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color === "purple" 
              ? "rgba(139, 92, 246, 0.6)" 
              : "rgba(255, 255, 255, 0.5)",
            boxShadow: particle.color === "purple"
              ? "0 0 6px rgba(139, 92, 246, 0.4)"
              : "0 0 4px rgba(255, 255, 255, 0.3)",
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
            opacity: particle.opacity,
          }}
        />
      ))}
    </div>
  );
};

export default DigitalDust;
