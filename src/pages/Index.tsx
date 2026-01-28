import { motion } from 'framer-motion';
import { CosmicBackground } from '@/components/CosmicBackground';
import { Garden } from '@/components/Garden';
import { MessageForm } from '@/components/MessageForm';
import { GardenStats } from '@/components/GardenStats';
import { useFlowers } from '@/hooks/useFlowers';
import { FlowerType } from '@/components/Flower';

const Index = () => {
  const { flowers, addFlower, isLoaded } = useFlowers();

  const handleSubmitMessage = (message: string, author: string, flowerType: FlowerType) => {
    addFlower(message, author, flowerType);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Cosmic Background */}
      <CosmicBackground />
      
      {/* Header */}
      <motion.header 
        className="relative z-10 pt-6 sm:pt-8 pb-4 text-center px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl font-display text-glow text-foreground mb-2"
          animate={{
            textShadow: [
              '0 0 10px hsla(280, 80%, 70%, 0.5), 0 0 30px hsla(280, 80%, 70%, 0.3)',
              '0 0 20px hsla(280, 80%, 70%, 0.7), 0 0 40px hsla(280, 80%, 70%, 0.4)',
              '0 0 10px hsla(280, 80%, 70%, 0.5), 0 0 30px hsla(280, 80%, 70%, 0.3)',
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          宇宙花园
        </motion.h1>
        <motion.p 
          className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto"
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
