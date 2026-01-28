import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type FlowerType = 'rose' | 'lotus' | 'cherry' | 'cosmos' | 'starlight' | 'aurora';

interface FlowerProps {
  type: FlowerType;
  message: string;
  author?: string;
  x: number;
  y: number;
  delay?: number;
  onClick?: () => void;
}

const flowerColors: Record<FlowerType, { primary: string; secondary: string; glow: string }> = {
  rose: { 
    primary: 'hsl(330, 70%, 65%)', 
    secondary: 'hsl(15, 80%, 65%)',
    glow: 'hsla(330, 70%, 65%, 0.5)'
  },
  lotus: { 
    primary: 'hsl(270, 60%, 70%)', 
    secondary: 'hsl(280, 80%, 70%)',
    glow: 'hsla(270, 60%, 70%, 0.5)'
  },
  cherry: { 
    primary: 'hsl(15, 80%, 65%)', 
    secondary: 'hsl(330, 70%, 75%)',
    glow: 'hsla(15, 80%, 65%, 0.5)'
  },
  cosmos: { 
    primary: 'hsl(175, 60%, 55%)', 
    secondary: 'hsl(180, 60%, 40%)',
    glow: 'hsla(175, 60%, 55%, 0.5)'
  },
  starlight: { 
    primary: 'hsl(45, 90%, 60%)', 
    secondary: 'hsl(45, 80%, 70%)',
    glow: 'hsla(45, 90%, 60%, 0.5)'
  },
  aurora: { 
    primary: 'hsl(150, 50%, 60%)', 
    secondary: 'hsl(200, 70%, 50%)',
    glow: 'hsla(150, 50%, 60%, 0.5)'
  },
};

export const Flower = ({ type, message, author, x, y, delay = 0, onClick }: FlowerProps) => {
  const [stage, setStage] = useState<'seed' | 'sprout' | 'bloom'>('seed');
  const [isHovered, setIsHovered] = useState(false);
  const colors = flowerColors[type];

  useEffect(() => {
    const timer1 = setTimeout(() => setStage('sprout'), delay + 500);
    const timer2 = setTimeout(() => setStage('bloom'), delay + 1500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [delay]);

  const renderFlower = () => {
    const petalCount = type === 'lotus' ? 8 : type === 'rose' ? 12 : 6;
    
    return (
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full"
        style={{ color: colors.primary }}
      >
        {/* Stem */}
        <motion.path
          d="M50 95 Q50 70 50 55"
          stroke="hsl(120, 40%, 30%)"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: stage !== 'seed' ? 1 : 0, 
            opacity: stage !== 'seed' ? 1 : 0 
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        
        {/* Leaves */}
        <AnimatePresence>
          {stage !== 'seed' && (
            <>
              <motion.ellipse
                cx="42"
                cy="75"
                rx="8"
                ry="4"
                fill="hsl(120, 50%, 35%)"
                transform="rotate(-30 42 75)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
              <motion.ellipse
                cx="58"
                cy="70"
                rx="8"
                ry="4"
                fill="hsl(120, 50%, 35%)"
                transform="rotate(30 58 70)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              />
            </>
          )}
        </AnimatePresence>
        
        {/* Petals */}
        <AnimatePresence>
          {stage === 'bloom' && (
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "backOut" }}
            >
              {Array.from({ length: petalCount }).map((_, i) => {
                const angle = (i * 360) / petalCount;
                const petalLength = type === 'rose' ? 18 : type === 'lotus' ? 22 : 16;
                return (
                  <motion.ellipse
                    key={i}
                    cx="50"
                    cy={35 - petalLength / 2}
                    rx={type === 'lotus' ? 8 : 6}
                    ry={petalLength}
                    fill={i % 2 === 0 ? colors.primary : colors.secondary}
                    transform={`rotate(${angle} 50 40)`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: i * 0.05,
                      ease: "backOut"
                    }}
                    style={{
                      filter: `drop-shadow(0 0 4px ${colors.glow})`,
                    }}
                  />
                );
              })}
              {/* Center */}
              <motion.circle
                cx="50"
                cy="40"
                r="8"
                fill={colors.secondary}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                style={{ filter: `drop-shadow(0 0 8px ${colors.glow})` }}
              />
              <motion.circle
                cx="50"
                cy="40"
                r="4"
                fill="hsl(45, 100%, 70%)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              />
            </motion.g>
          )}
        </AnimatePresence>
        
        {/* Seed */}
        {stage === 'seed' && (
          <motion.ellipse
            cx="50"
            cy="85"
            rx="5"
            ry="8"
            fill="hsl(30, 40%, 30%)"
            initial={{ scale: 0, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
        
        {/* Sprout */}
        {stage === 'sprout' && (
          <motion.g
            initial={{ scale: 0, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "backOut" }}
          >
            <ellipse
              cx="47"
              cy="50"
              rx="6"
              ry="10"
              fill="hsl(120, 50%, 40%)"
              transform="rotate(-15 47 50)"
            />
            <ellipse
              cx="53"
              cy="50"
              rx="6"
              ry="10"
              fill="hsl(120, 50%, 45%)"
              transform="rotate(15 53 50)"
            />
          </motion.g>
        )}
      </svg>
    );
  };

  return (
    <motion.div
      className="absolute cursor-pointer group"
      style={{ 
        left: `${x}%`, 
        top: `${y}%`,
        width: '80px',
        height: '100px',
        transform: 'translate(-50%, -100%)',
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {renderFlower()}
      
      {/* Message tooltip */}
      <AnimatePresence>
        {isHovered && stage === 'bloom' && (
          <motion.div 
            className="absolute bottom-full left-1/2 mb-2 px-4 py-2 rounded-lg bg-card/95 backdrop-blur-sm border border-border shadow-lg min-w-[150px] max-w-[250px] z-50"
            style={{ 
              boxShadow: `0 0 20px ${colors.glow}`,
              x: '-50%',
            }}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-sm text-foreground text-center leading-relaxed">{message}</p>
            {author && (
              <p className="text-xs text-muted-foreground text-center mt-1">— {author}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
