import { motion } from 'framer-motion';
import { ImpressionistBackground } from '@/components/ImpressionistBackground';
import { Garden } from '@/components/Garden';
import { ChatDialog } from '@/components/ChatDialog';
import { GardenStats } from '@/components/GardenStats';
import { FallingPetals } from '@/components/FallingPetals';
import { useGlobalFlowers } from '@/hooks/useGlobalFlowers';
import { FlowerType } from '@/components/ImpressionistFlower';

const Index = () => {
  const { flowers, addLocalFlower, isLoaded } = useGlobalFlowers();

  const handleFlowerPlanted = (flower: {
    type: FlowerType;
    message: string;
    author: string;
    x: number;
    y: number;
  }) => {
    addLocalFlower(flower);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Impressionist Background */}
      <ImpressionistBackground />
      
      {/* Falling Petals */}
      <FallingPetals />
      
      {/* Header */}
      <motion.header 
        className="relative z-10 pt-10 sm:pt-14 pb-6 text-center px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl font-display text-white mb-4"
          style={{
            textShadow: '2px 3px 12px rgba(0, 0, 0, 0.35), 0 0 40px rgba(255, 255, 255, 0.15)',
            letterSpacing: '0.05em',
          }}
        >
          Cosmic Garden
        </motion.h1>
        <motion.p 
          className="text-base sm:text-lg text-white/95 max-w-lg mx-auto font-body leading-relaxed"
          style={{
            textShadow: '1px 1px 6px rgba(0, 0, 0, 0.3)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Encouragement and kindness from around the world, blooming into flowers
        </motion.p>
      </motion.header>
      
      {/* Garden Stats */}
      <GardenStats flowerCount={flowers.length} />
      
      {/* Garden */}
      {isLoaded && <Garden flowers={flowers} />}
      
      {/* Chat Dialog */}
      <ChatDialog onFlowerPlanted={handleFlowerPlanted} />
    </div>
  );
};

export default Index;
