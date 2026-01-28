import { motion } from 'framer-motion';

interface GardenStatsProps {
  flowerCount: number;
}

export const GardenStats = ({ flowerCount }: GardenStatsProps) => {
  const getGardenLevel = (count: number) => {
    if (count === 0) return { name: '荒芜之地', emoji: '🌾', progress: 0 };
    if (count < 5) return { name: '萌芽花园', emoji: '🌱', progress: count / 5 };
    if (count < 15) return { name: '初春花园', emoji: '🌷', progress: (count - 5) / 10 };
    if (count < 30) return { name: '繁花花园', emoji: '🌸', progress: (count - 15) / 15 };
    if (count < 50) return { name: '莫奈花园', emoji: '🎨', progress: (count - 30) / 20 };
    return { name: '天堂花园', emoji: '🏵️', progress: 1 };
  };

  const level = getGardenLevel(flowerCount);

  return (
    <motion.div 
      className="fixed top-4 left-4 sm:top-6 sm:left-6 z-20"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div 
        className="bg-white/95 backdrop-blur-md rounded-xl px-4 py-3 sm:px-5 sm:py-4 border-2 border-white"
        style={{
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05)',
        }}
      >
        <div className="flex items-center gap-3">
          <motion.span 
            className="text-2xl sm:text-3xl"
            animate={{ 
              rotate: [0, 6, -6, 0],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {level.emoji}
          </motion.span>
          <div>
            <p className="text-sm sm:text-base font-medium text-foreground font-body">{level.name}</p>
            <p className="text-xs sm:text-sm text-muted-foreground font-body">
              {flowerCount} 朵花绽放中
            </p>
          </div>
        </div>
        
        {/* Progress bar */}
        {flowerCount > 0 && flowerCount < 50 && (
          <div className="mt-3 h-1.5 bg-muted/40 rounded-full overflow-hidden">
            <motion.div 
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, hsl(270, 50%, 55%), hsl(340, 60%, 60%))',
              }}
              initial={{ width: 0 }}
              animate={{ width: `${level.progress * 100}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};
