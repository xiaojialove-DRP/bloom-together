import { motion } from 'framer-motion';

interface GardenStatsProps {
  flowerCount: number;
}

export const GardenStats = ({ flowerCount }: GardenStatsProps) => {
  const getGardenLevel = (count: number) => {
    if (count === 0) return { name: '荒芜之地', emoji: '🌑', progress: 0 };
    if (count < 5) return { name: '萌芽花园', emoji: '🌱', progress: count / 5 };
    if (count < 15) return { name: '初春花园', emoji: '🌷', progress: (count - 5) / 10 };
    if (count < 30) return { name: '繁花花园', emoji: '🌸', progress: (count - 15) / 15 };
    if (count < 50) return { name: '仙境花园', emoji: '🌺', progress: (count - 30) / 20 };
    return { name: '天堂花园', emoji: '🏵️', progress: 1 };
  };

  const level = getGardenLevel(flowerCount);

  return (
    <motion.div 
      className="fixed top-4 left-4 sm:top-6 sm:left-6 z-20"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div 
        className="bg-card/80 backdrop-blur-lg rounded-xl px-3 py-2 sm:px-4 sm:py-3 border border-border"
        style={{
          boxShadow: '0 0 20px hsla(280, 80%, 70%, 0.1), 0 4px 16px rgba(0,0,0,0.2)',
        }}
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <motion.span 
            className="text-xl sm:text-2xl"
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {level.emoji}
          </motion.span>
          <div>
            <p className="text-xs sm:text-sm font-medium text-foreground">{level.name}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              {flowerCount} 朵花绽放中
            </p>
          </div>
        </div>
        
        {/* Progress bar */}
        {flowerCount > 0 && flowerCount < 50 && (
          <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${level.progress * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};
