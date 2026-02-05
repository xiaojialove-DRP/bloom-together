import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ImpressionistBackground } from '@/components/ImpressionistBackground';
import { Garden, FlowerData } from '@/components/Garden';
import { ChatDialog } from '@/components/ChatDialog';
import { GlobalStats } from '@/components/GlobalStats';
import { FallingPetals } from '@/components/FallingPetals';
import { FlowerCard } from '@/components/FlowerCard';
import { useGlobalFlowers } from '@/hooks/useGlobalFlowers';
import { FlowerType } from '@/components/ImpressionistFlower';
import { useLanguage } from '@/hooks/useLanguage';

const Index = () => {
  const { t } = useLanguage();
  const { flowers, addLocalFlower, isLoaded } = useGlobalFlowers();
  const [selectedFlower, setSelectedFlower] = useState<FlowerData | null>(null);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [newlyPlantedId, setNewlyPlantedId] = useState<string | null>(null);
  const [scrollToPosition, setScrollToPosition] = useState<{ x: number; y: number } | null>(null);

  // Auto-clear highlight after some time
  useEffect(() => {
    if (newlyPlantedId) {
      const timer = setTimeout(() => {
        setNewlyPlantedId(null);
      }, 8000); // Highlight lasts 8 seconds
      return () => clearTimeout(timer);
    }
  }, [newlyPlantedId]);

  const handleFlowerPlanted = (flower: {
    type: FlowerType;
    message: string;
    author: string;
    x: number;
    y: number;
  }) => {
    const newFlower = addLocalFlower(flower);
    
    // Auto-show the flower card for the newly planted flower
    if (newFlower) {
      setNewlyPlantedId(newFlower.id);
      setSelectedFlower(newFlower);
      // Scroll to the flower position
      setScrollToPosition({ x: flower.x, y: flower.y });
      // Delay opening card to let the flower bloom animation play
      setTimeout(() => {
        setIsCardOpen(true);
      }, 1800);
    }
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
      
      {/* Global Stats + Map (top-right corner) */}
      <GlobalStats flowerCount={flowers.length} flowers={flowers} />
      
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
          {t.appName}
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
          {t.tagline}
        </motion.p>
      </motion.header>
      
      {/* Garden */}
      {isLoaded && (
        <Garden 
          flowers={flowers} 
          onFlowerClick={handleFlowerClick}
          highlightedFlowerId={newlyPlantedId}
          scrollToPosition={scrollToPosition}
          onScrollComplete={() => setScrollToPosition(null)}
        />
      )}
      
      {/* Chat Dialog */}
      <ChatDialog onFlowerPlanted={handleFlowerPlanted} />

      {/* Flower Card Modal - one-click save */}
      <FlowerCard 
        isOpen={isCardOpen} 
        onClose={() => setIsCardOpen(false)} 
        flower={selectedFlower}
        isNewlyPlanted={selectedFlower?.id === newlyPlantedId}
      />
    </div>
  );
};

export default Index;
