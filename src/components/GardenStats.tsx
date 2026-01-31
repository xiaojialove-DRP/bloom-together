import { motion } from 'framer-motion';

interface GardenStatsProps {
  flowerCount: number;
}

export const GardenStats = ({ flowerCount }: GardenStatsProps) => {
  return (
    <motion.div 
      className="inline-flex"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4 }}
    >
      <div 
        className="px-4 py-2 rounded-full flex items-center gap-2"
        style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
        }}
      >
        <span className="text-lg">🌸</span>
        <span className="text-white font-body text-sm" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
          {flowerCount} {flowerCount === 1 ? 'flower' : 'flowers'}
        </span>
      </div>
    </motion.div>
  );
};
