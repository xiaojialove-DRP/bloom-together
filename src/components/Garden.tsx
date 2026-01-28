import { motion, AnimatePresence } from 'framer-motion';
import { Flower, FlowerType } from './Flower';

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
      {/* Ground gradient */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-1/3"
        style={{
          background: 'linear-gradient(to top, hsla(120, 30%, 8%, 0.8) 0%, hsla(120, 20%, 5%, 0.4) 50%, transparent 100%)',
        }}
      />
      
      {/* Grass effect */}
      <div className="absolute bottom-0 left-0 right-0 h-20 opacity-30">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-0"
            style={{
              left: `${i * 2}%`,
              width: '4px',
              height: `${20 + Math.random() * 30}px`,
              background: `linear-gradient(to top, hsl(120, 40%, 25%), hsl(120, 50%, 35%))`,
              transformOrigin: 'bottom center',
            }}
            animate={{
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      {/* Flowers */}
      <AnimatePresence>
        {flowers.map((flower, index) => (
          <Flower
            key={flower.id}
            type={flower.type}
            message={flower.message}
            author={flower.author}
            x={flower.x}
            y={flower.y}
            delay={index * 100}
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
          <div className="text-center px-8">
            <motion.p 
              className="text-4xl mb-4"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              🌱
            </motion.p>
            <p className="text-lg text-muted-foreground">
              这个花园还在等待第一朵花...
            </p>
            <p className="text-sm text-muted-foreground/70 mt-2">
              点击下方按钮，种下你的鼓励吧
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};
