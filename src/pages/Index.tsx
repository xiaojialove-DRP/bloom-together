import { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { ImpressionistBackground } from '@/components/ImpressionistBackground';
import { Garden, FlowerData } from '@/components/Garden';
import { ChatDialog } from '@/components/ChatDialog';
import { GardenStats } from '@/components/GardenStats';
import { FallingPetals } from '@/components/FallingPetals';
import { FlowerCard } from '@/components/FlowerCard';
import { WorldMap } from '@/components/WorldMap';
import { useGlobalFlowers } from '@/hooks/useGlobalFlowers';
import { FlowerType } from '@/components/ImpressionistFlower';

const Index = () => {
  const { flowers, addLocalFlower, isLoaded } = useGlobalFlowers();
  const [selectedFlower, setSelectedFlower] = useState<FlowerData | null>(null);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);

  const handleFlowerPlanted = (flower: {
    type: FlowerType;
    message: string;
    author: string;
    x: number;
    y: number;
  }) => {
    addLocalFlower(flower);
  };

  const handleFlowerClick = (flower: FlowerData) => {
    setSelectedFlower(flower);
    setIsCardOpen(true);
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
      
      {/* Garden Stats + World Map Button */}
      <div className="relative z-10 flex items-center justify-center gap-3 mb-4">
        <GardenStats flowerCount={flowers.length} />
        <motion.button
          onClick={() => setIsMapOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-white font-body text-sm"
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Globe size={16} />
          <span>World Map</span>
        </motion.button>
      </div>
      
      {/* Garden */}
      {isLoaded && <Garden flowers={flowers} onFlowerClick={handleFlowerClick} />}
      
      {/* Chat Dialog */}
      <ChatDialog onFlowerPlanted={handleFlowerPlanted} />

      {/* Flower Card Modal */}
      <FlowerCard 
        isOpen={isCardOpen} 
        onClose={() => setIsCardOpen(false)} 
        flower={selectedFlower}
      />

      {/* World Map Modal */}
      <WorldMap 
        isOpen={isMapOpen} 
        onClose={() => setIsMapOpen(false)} 
        flowers={flowers}
      />
    </div>
  );
};

export default Index;
