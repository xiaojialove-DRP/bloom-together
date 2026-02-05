import { useState, useEffect, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IrisRenderer,
  PoppyRenderer,
  RoseRenderer,
  SunflowerRenderer,
  LavenderRenderer,
  DaisyRenderer,
  FlowerStage,
} from './flowers/FlowerRenderers';

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
    primary: 'hsl(260, 65%, 60%)', 
    secondary: 'hsl(280, 70%, 50%)',
    shadow: 'hsla(260, 65%, 60%, 0.5)'
  },
  poppy: { 
    primary: 'hsl(0, 85%, 55%)', 
    secondary: 'hsl(20, 90%, 50%)',
    shadow: 'hsla(0, 85%, 55%, 0.5)'
  },
  rose: { 
    primary: 'hsl(340, 75%, 60%)', 
    secondary: 'hsl(350, 80%, 50%)',
    shadow: 'hsla(340, 75%, 60%, 0.5)'
  },
  wildflower: { 
    primary: 'hsl(45, 95%, 55%)', 
    secondary: 'hsl(35, 90%, 50%)',
    shadow: 'hsla(45, 95%, 55%, 0.5)'
  },
  lavender: { 
    primary: 'hsl(270, 55%, 70%)', 
    secondary: 'hsl(280, 60%, 60%)',
    shadow: 'hsla(270, 55%, 70%, 0.5)'
  },
  daisy: { 
    primary: 'hsl(0, 0%, 98%)', 
    secondary: 'hsl(48, 100%, 50%)',
    shadow: 'hsla(48, 100%, 50%, 0.5)'
  },
};

// Using forwardRef to fix AnimatePresence warning in Garden component
export const ImpressionistFlower = forwardRef<HTMLDivElement, FlowerProps>(
  ({ type, message, author, x, y, delay = 0, onClick, isHighlighted = false }, ref) => {
    const [stage, setStage] = useState<FlowerStage>('seed');
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
      const props = { stage, colors };
      switch (type) {
        case 'iris': return <IrisRenderer {...props} />;
        case 'poppy': return <PoppyRenderer {...props} />;
        case 'rose': return <RoseRenderer {...props} />;
        case 'wildflower': return <SunflowerRenderer {...props} />;
        case 'lavender': return <LavenderRenderer {...props} />;
        case 'daisy': return <DaisyRenderer {...props} />;
        default: return <DaisyRenderer {...props} />;
      }
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
