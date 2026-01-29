import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Petal {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
  color: string;
  swayAmount: number;
}

const petalColors = [
  'hsla(340, 60%, 75%, 0.7)',   // pink
  'hsla(330, 55%, 80%, 0.6)',   // light pink
  'hsla(270, 50%, 70%, 0.6)',   // lavender
  'hsla(45, 90%, 85%, 0.5)',    // cream
  'hsla(5, 70%, 75%, 0.6)',     // coral
  'hsla(320, 65%, 75%, 0.6)',   // magenta
];

export const FallingPetals = () => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const generatePetals = () => {
      const newPetals: Petal[] = [];
      for (let i = 0; i < 20; i++) {
        newPetals.push({
          id: i,
          x: Math.random() * 100,
          delay: Math.random() * 15,
          duration: 12 + Math.random() * 10,
          size: 8 + Math.random() * 12,
          rotation: Math.random() * 360,
          color: petalColors[Math.floor(Math.random() * petalColors.length)],
          swayAmount: 30 + Math.random() * 40,
        });
      }
      setPetals(newPetals);
    };

    generatePetals();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 5 }}>
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.x}%`,
            top: '-5%',
            width: petal.size,
            height: petal.size * 1.3,
          }}
          initial={{ 
            y: '-10vh',
            rotate: petal.rotation,
            opacity: 0
          }}
          animate={{
            y: '110vh',
            x: [0, petal.swayAmount, -petal.swayAmount, petal.swayAmount / 2, 0],
            rotate: petal.rotation + 720,
            opacity: [0, 0.8, 0.8, 0.8, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'linear',
            x: {
              duration: petal.duration,
              delay: petal.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }
          }}
        >
          {/* Petal SVG */}
          <svg
            viewBox="0 0 20 26"
            className="w-full h-full"
            style={{ filter: 'blur(0.5px)' }}
          >
            <ellipse
              cx="10"
              cy="13"
              rx="8"
              ry="12"
              fill={petal.color}
              transform="rotate(-15 10 13)"
            />
            <ellipse
              cx="10"
              cy="13"
              rx="5"
              ry="10"
              fill={petal.color.replace('0.7', '0.4').replace('0.6', '0.3').replace('0.5', '0.25')}
              transform="rotate(10 10 13)"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};
