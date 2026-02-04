import { useState, useEffect, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type FlowerType = 'iris' | 'poppy' | 'rose' | 'wildflower' | 'lavender' | 'daisy';

interface FlowerProps {
  type: FlowerType;
  message: string;
  author?: string;
  x: number;
  y: number;
  delay?: number;
  onClick?: () => void;
  isHighlighted?: boolean;
}

const flowerColors: Record<FlowerType, { primary: string; secondary: string; shadow: string }> = {
  iris: { 
    primary: 'hsl(270, 50%, 55%)', 
    secondary: 'hsl(280, 55%, 45%)',
    shadow: 'hsla(270, 50%, 55%, 0.4)'
  },
  poppy: { 
    primary: 'hsl(5, 70%, 50%)', 
    secondary: 'hsl(15, 75%, 55%)',
    shadow: 'hsla(5, 70%, 50%, 0.4)'
  },
  rose: { 
    primary: 'hsl(340, 60%, 65%)', 
    secondary: 'hsl(330, 55%, 55%)',
    shadow: 'hsla(340, 60%, 65%, 0.4)'
  },
  wildflower: { 
    primary: 'hsl(320, 65%, 55%)', 
    secondary: 'hsl(310, 60%, 45%)',
    shadow: 'hsla(320, 65%, 55%, 0.4)'
  },
  lavender: { 
    primary: 'hsl(265, 45%, 60%)', 
    secondary: 'hsl(270, 50%, 50%)',
    shadow: 'hsla(265, 45%, 60%, 0.4)'
  },
  daisy: { 
    primary: 'hsl(55, 90%, 95%)', 
    secondary: 'hsl(45, 95%, 60%)',
    shadow: 'hsla(55, 90%, 95%, 0.4)'
  },
};

// Using forwardRef to fix AnimatePresence warning in Garden component
export const ImpressionistFlower = forwardRef<HTMLDivElement, FlowerProps>(
  ({ type, message, author, x, y, delay = 0, onClick, isHighlighted = false }, ref) => {
    const [stage, setStage] = useState<'seed' | 'sprout' | 'bloom'>('seed');
    const [isHovered, setIsHovered] = useState(false);
    const colors = flowerColors[type];

    useEffect(() => {
      const timer1 = setTimeout(() => setStage('sprout'), delay + 400);
      const timer2 = setTimeout(() => setStage('bloom'), delay + 1200);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }, [delay]);

    const renderFlower = () => {
      const petalCount = type === 'iris' ? 6 : type === 'daisy' ? 12 : 8;
      
      return (
        <svg 
          viewBox="0 0 100 120" 
          className="w-full h-full"
        >
          {/* Stem - organic, curved */}
          <motion.path
            d="M50 115 Q45 90 50 70 Q55 50 50 35"
            stroke="hsl(120, 45%, 35%)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: stage !== 'seed' ? 1 : 0, 
              opacity: stage !== 'seed' ? 1 : 0 
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          
          {/* Leaves - painterly organic shapes */}
          {stage !== 'seed' && (
            <>
              <motion.ellipse
                cx="38"
                cy="85"
                rx="12"
                ry="5"
                fill="hsl(110, 50%, 40%)"
                transform="rotate(-40 38 85)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.9 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              />
              <motion.ellipse
                cx="62"
                cy="75"
                rx="12"
                ry="5"
                fill="hsl(115, 45%, 45%)"
                transform="rotate(35 62 75)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.9 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              />
            </>
          )}
          
          {/* Petals - impressionist style with soft edges */}
          {stage === 'bloom' && (
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "backOut" }}
            >
              {Array.from({ length: petalCount }).map((_, i) => {
                const angle = (i * 360) / petalCount;
                const petalLength = type === 'iris' ? 20 : type === 'daisy' ? 14 : 16;
                const petalWidth = type === 'daisy' ? 3 : 7;
                return (
                  <motion.ellipse
                    key={i}
                    cx="50"
                    cy={28 - petalLength / 2}
                    rx={petalWidth}
                    ry={petalLength}
                    fill={i % 2 === 0 ? colors.primary : colors.secondary}
                    transform={`rotate(${angle} 50 32)`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: i * 0.04,
                      ease: "backOut"
                    }}
                    style={{
                      filter: 'blur(0.3px)',
                    }}
                  />
                );
              })}
              {/* Flower center */}
              <motion.circle
                cx="50"
                cy="32"
                r={type === 'daisy' ? 6 : 5}
                fill={type === 'daisy' ? colors.secondary : 'hsl(45, 90%, 55%)'}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              />
            </motion.g>
          )}
          
          {/* Seed */}
          {stage === 'seed' && (
            <motion.ellipse
              cx="50"
              cy="105"
              rx="4"
              ry="6"
              fill="hsl(30, 50%, 30%)"
              initial={{ scale: 0, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            />
          )}
          
          {/* Sprout */}
          {stage === 'sprout' && (
            <motion.g
              initial={{ scale: 0, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "backOut" }}
            >
              <ellipse
                cx="46"
                cy="45"
                rx="5"
                ry="10"
                fill="hsl(110, 55%, 45%)"
                transform="rotate(-12 46 45)"
              />
              <ellipse
                cx="54"
                cy="45"
                rx="5"
                ry="10"
                fill="hsl(115, 50%, 50%)"
                transform="rotate(12 54 45)"
              />
            </motion.g>
          )}
        </svg>
      );
    };

    return (
      <motion.div
        ref={ref}
        className="absolute cursor-pointer"
        style={{ 
          left: `${x}%`, 
          top: `${y}%`,
          width: '70px',
          height: '90px',
          transform: 'translate(-50%, -100%)',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: isHighlighted ? [1, 1.15, 1] : 1, 
          opacity: 1,
        }}
        exit={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1.08 }}
        transition={{ 
          duration: isHighlighted ? 1.5 : 0.3,
          repeat: isHighlighted ? Infinity : 0,
          ease: "easeInOut",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        {/* Glow effect for highlighted flower */}
        {isHighlighted && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, ${colors.shadow} 0%, transparent 70%)`,
              filter: 'blur(15px)',
              transform: 'scale(2.5) translateY(-20%)',
            }}
            animate={{
              opacity: [0.6, 1, 0.6],
              scale: [2.2, 2.8, 2.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
        
        <motion.div
          animate={{
            rotate: [-2, 2, -2],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative z-10"
        >
          {renderFlower()}
        </motion.div>
        
        {/* Message tooltip - elegant white card */}
        <AnimatePresence>
          {isHovered && stage === 'bloom' && (
            <motion.div 
              className="absolute bottom-full left-1/2 mb-3 px-5 py-4 rounded-xl bg-white/98 backdrop-blur-sm border border-white shadow-xl min-w-[150px] max-w-[240px] z-50"
              style={{ 
                boxShadow: `0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px ${colors.shadow}`,
                transform: 'translateX(-50%)',
              }}
              initial={{ opacity: 0, y: 10, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.92 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <p className="text-sm text-foreground text-center leading-relaxed font-body">{message}</p>
              {author && (
                <p className="text-xs text-muted-foreground text-center mt-2 font-body italic">— {author}</p>
              )}
              
              <div 
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-r border-b border-white/50"
                style={{ boxShadow: '2px 2px 4px rgba(0,0,0,0.05)' }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }
);

ImpressionistFlower.displayName = 'ImpressionistFlower';
