import { motion, AnimatePresence } from 'framer-motion';
import { ImpressionistFlower } from './ImpressionistFlower';
import { useLanguage } from '@/hooks/useLanguage';
import { FlowerData } from '@/hooks/useGlobalFlowers';

// Re-export for backwards compatibility
export type { FlowerData };

interface GardenProps {
  flowers: FlowerData[];
  onFlowerClick?: (flower: FlowerData) => void;
  highlightedFlowerId?: string | null;
}

export const Garden = ({ flowers, onFlowerClick, highlightedFlowerId }: GardenProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Flowers */}
      <AnimatePresence>
        {flowers.map((flower, index) => (
          <ImpressionistFlower
            key={flower.id}
            type={flower.type}
            message={flower.message}
            author={flower.author}
            x={flower.x}
            y={flower.y}
            delay={index * 80}
            onClick={() => onFlowerClick?.(flower)}
            isHighlighted={flower.id === highlightedFlowerId}
          />
        ))}
      </AnimatePresence>
      
      {/* Empty state */}
      {flowers.length === 0 && (
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div 
            className="text-center px-8 py-6 rounded-2xl"
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            }}
          >
            <motion.p 
              className="text-4xl mb-3"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              🌱
            </motion.p>
            <p className="text-lg text-white font-body" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
              {t.emptyGardenTitle}
            </p>
            <p className="text-sm text-white/70 mt-2 font-body">
              {t.emptyGardenSubtitle}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};
