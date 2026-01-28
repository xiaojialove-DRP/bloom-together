import { motion, AnimatePresence } from 'framer-motion';
import { ImpressionistFlower, FlowerType } from './ImpressionistFlower';

export interface FlowerData {
  id: string;
  type: FlowerType;
  message: string;
  author: string;
  x: number;
  y: number;
  createdAt: number;
}

interface GardenProps {
  flowers: FlowerData[];
  onFlowerClick?: (flower: FlowerData) => void;
}

export const Garden = ({ flowers, onFlowerClick }: GardenProps) => {
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
          <div className="text-center px-8 py-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60 shadow-lg">
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
            <p className="text-lg text-foreground font-body">
              这个花园还在等待第一朵花...
            </p>
            <p className="text-sm text-muted-foreground mt-2 font-body">
              点击下方按钮，种下你的鼓励吧
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};
