import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

interface GrassStroke {
  id: number;
  x: number;
  height: number;
  delay: number;
  hue: number;
}

interface Brushstroke {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  hue: number;
  saturation: number;
  lightness: number;
  opacity: number;
}

interface BackgroundFlower {
  id: number;
  x: number;
  y: number;
  size: number;
  hue: number;
  delay: number;
}

export const ImpressionistBackground = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate painterly grass strokes
  const grassStrokes = useMemo<GrassStroke[]>(() => 
    Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: (i / 100) * 100 + (Math.random() - 0.5) * 2,
      height: 25 + Math.random() * 45,
      delay: Math.random() * 3,
      hue: 85 + Math.random() * 55,
    })), []);

  // Generate impressionist brushstrokes for the background foliage
  const brushstrokes = useMemo<Brushstroke[]>(() => 
    Array.from({ length: 200 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 70,
      width: 12 + Math.random() * 35,
      height: 6 + Math.random() * 18,
      rotation: Math.random() * 360,
      hue: [95, 110, 125, 140, 75, 60][Math.floor(Math.random() * 6)],
      saturation: 35 + Math.random() * 35,
      lightness: 30 + Math.random() * 40,
      opacity: 0.25 + Math.random() * 0.45,
    })), []);

  // Background flowers - impressionist style dots
  const backgroundFlowers = useMemo<BackgroundFlower[]>(() => 
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 50 + Math.random() * 45,
      size: 4 + Math.random() * 10,
      hue: [270, 280, 320, 340, 5, 15, 265][Math.floor(Math.random() * 7)],
      delay: Math.random() * 4,
    })), []);

  // Tree trunks
  const trees = useMemo(() => 
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: 8 + i * 17 + (Math.random() - 0.5) * 8,
      height: 35 + Math.random() * 25,
      width: 8 + Math.random() * 6,
    })), []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Sky gradient - soft impressionist teal/green */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, hsl(175, 40%, 70%) 0%, hsl(140, 35%, 65%) 25%, hsl(110, 40%, 55%) 50%, hsl(100, 45%, 45%) 75%, hsl(95, 50%, 35%) 100%)',
        }}
      />
      
      {/* Impressionist brushstrokes - foliage texture */}
      {brushstrokes.map((stroke) => (
        <motion.div
          key={stroke.id}
          className="absolute rounded-full"
          style={{
            left: `${stroke.x}%`,
            top: `${stroke.y}%`,
            width: `${stroke.width}px`,
            height: `${stroke.height}px`,
            background: `hsl(${stroke.hue}, ${stroke.saturation}%, ${stroke.lightness}%)`,
            opacity: stroke.opacity,
            transform: `rotate(${stroke.rotation}deg)`,
            filter: 'blur(1.5px)',
          }}
          animate={{
            opacity: [stroke.opacity, stroke.opacity * 0.85, stroke.opacity],
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Background flowers - impressionist color dots */}
      {backgroundFlowers.map((flower) => (
        <motion.div
          key={`bgflower-${flower.id}`}
          className="absolute rounded-full"
          style={{
            left: `${flower.x}%`,
            top: `${flower.y}%`,
            width: `${flower.size}px`,
            height: `${flower.size}px`,
            background: `hsl(${flower.hue}, 55%, 55%)`,
            filter: 'blur(1px)',
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: flower.delay,
          }}
        />
      ))}

      {/* Tree trunks - brown organic curved shapes */}
      {trees.map((tree) => (
        <motion.div
          key={tree.id}
          className="absolute bottom-0"
          style={{
            left: `${tree.x}%`,
            width: `${tree.width}px`,
            height: `${tree.height}%`,
            background: `linear-gradient(90deg, hsl(20, 45%, 22%) 0%, hsl(25, 40%, 32%) 50%, hsl(20, 45%, 22%) 100%)`,
            borderRadius: '6px 6px 0 0',
            transformOrigin: 'bottom center',
          }}
          animate={{
            rotate: [-0.5, 0.5, -0.5],
          }}
          transition={{
            duration: 7 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Terracotta path - perspective */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{
          width: '22%',
          height: '40%',
          background: 'linear-gradient(180deg, hsl(18, 55%, 58%) 0%, hsl(22, 50%, 48%) 50%, hsl(25, 45%, 40%) 100%)',
          clipPath: 'polygon(38% 0%, 62% 0%, 78% 100%, 22% 100%)',
          opacity: 0.75,
          filter: 'blur(0.5px)',
        }}
      />
      
      {/* Grass layer - bottom of screen */}
      <div className="absolute bottom-0 left-0 right-0 h-1/4">
        {grassStrokes.map((stroke) => (
          <motion.div
            key={stroke.id}
            className="absolute bottom-0"
            style={{
              left: `${stroke.x}%`,
              width: '3px',
              height: `${stroke.height}px`,
              background: `linear-gradient(to top, hsl(${stroke.hue}, 55%, 28%), hsl(${stroke.hue + 15}, 50%, 48%))`,
              transformOrigin: 'bottom center',
              borderRadius: '1px 1px 0 0',
            }}
            animate={{
              rotate: [-2.5, 2.5, -2.5],
            }}
            transition={{
              duration: 3.5 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: stroke.delay,
            }}
          />
        ))}
      </div>

      {/* Soft sunlight overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 65% 25%, hsl(50, 85%, 92%, 0.18) 0%, transparent 45%)',
        }}
      />
      
      {/* Subtle vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, hsl(100, 30%, 20%, 0.15) 100%)',
        }}
      />
    </div>
  );
};
