import { motion } from 'framer-motion';
import { ImpressionistBackground } from '@/components/ImpressionistBackground';
import { Garden } from '@/components/Garden';
import { MessageForm } from '@/components/MessageForm';
import { GardenStats } from '@/components/GardenStats';
import { useFlowers } from '@/hooks/useFlowers';
import { FlowerType } from '@/components/ImpressionistFlower';

const Index = () => {
  const { flowers, addFlower, isLoaded } = useFlowers();

  const handleSubmitMessage = (message: string, author: string, flowerType: FlowerType) => {
    addFlower(message, author, flowerType);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Impressionist Background */}
      <ImpressionistBackground />
      
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
          印象派花园
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
          来自世界各地的鼓励与善意，在这里绽放成花
        </motion.p>
      </motion.header>
      
      {/* Garden Stats */}
      <GardenStats flowerCount={flowers.length} />
      
      {/* Garden */}
      {isLoaded && <Garden flowers={flowers} />}
      
      {/* Message Form */}
      <MessageForm onSubmit={handleSubmitMessage} />
    </div>
  );
};

export default Index;
