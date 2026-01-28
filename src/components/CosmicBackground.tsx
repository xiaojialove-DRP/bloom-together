import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

interface Particle {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
}

export const CosmicBackground = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stars = useMemo<Star[]>(() => 
    Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      delay: Math.random() * 5,
      duration: 2 + Math.random() * 3,
    })), []);

  const particles = useMemo<Particle[]>(() => {
    const colors = [
      'hsla(280, 70%, 70%, 0.6)',
      'hsla(200, 70%, 70%, 0.6)',
      'hsla(320, 70%, 70%, 0.6)',
      'hsla(45, 80%, 70%, 0.6)',
    ];
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 15,
      duration: 12 + Math.random() * 8,
      size: Math.random() * 5 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Deep space gradient */}
      <div className="absolute inset-0 cosmic-bg" />
      
      {/* Aurora overlay */}
      <div className="absolute inset-0 aurora-overlay opacity-50" />
      
      {/* Nebula clouds */}
      <motion.div 
        className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, hsla(280, 60%, 40%, 0.5) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, hsla(180, 60%, 40%, 0.5) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.2, 0.15, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Center glow */}
      <motion.div 
        className="absolute top-1/3 left-1/2 w-full h-1/2 rounded-full"
        style={{
          background: 'radial-gradient(ellipse at center, hsla(280, 60%, 50%, 0.1) 0%, transparent 50%)',
          transform: 'translateX(-50%)',
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            boxShadow: '0 0 6px rgba(255, 255, 255, 0.8)',
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: star.delay,
          }}
        />
      ))}
      
      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: particle.color,
            filter: 'blur(1px)',
          }}
          initial={{ 
            y: '100vh', 
            opacity: 0,
            scale: 0.5,
          }}
          animate={{ 
            y: '-10vh', 
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1, 1, 0.5],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
            delay: particle.delay,
          }}
        />
      ))}
      
      {/* Shooting star (occasional) */}
      <motion.div
        className="absolute w-20 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"
        style={{
          top: '20%',
          left: '10%',
          transformOrigin: 'left center',
        }}
        initial={{ 
          x: 0, 
          y: 0, 
          opacity: 0,
          rotate: 30,
        }}
        animate={{ 
          x: ['0vw', '80vw'], 
          y: ['0vh', '30vh'], 
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 8,
          ease: "easeIn",
        }}
      />
    </div>
  );
};
