import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { FlowerType } from './ImpressionistFlower';
import { getFlowerEmoji } from '@/lib/flowerDatabase';
import { useLanguage } from '@/hooks/useLanguage';

interface FlowerCardProps {
  isOpen: boolean;
  onClose: () => void;
  flower: {
    type: FlowerType;
    message: string;
    author: string;
    country?: string;
    city?: string;
  } | null;
}

const flowerColors: Record<FlowerType, { bg: string; accent: string }> = {
  iris: { bg: 'linear-gradient(135deg, #E8E0F0 0%, #D4C6E8 100%)', accent: '#9B7ED9' },
  poppy: { bg: 'linear-gradient(135deg, #FFE8E0 0%, #FFD4C6 100%)', accent: '#E85D3C' },
  rose: { bg: 'linear-gradient(135deg, #FFE8F0 0%, #FFD0E0 100%)', accent: '#E87D9A' },
  wildflower: { bg: 'linear-gradient(135deg, #F8E8F8 0%, #E8D0E8 100%)', accent: '#C85DC8' },
  lavender: { bg: 'linear-gradient(135deg, #E8E4F8 0%, #D8D0F0 100%)', accent: '#8B7DC8' },
  daisy: { bg: 'linear-gradient(135deg, #FFFDE8 0%, #FFF8D0 100%)', accent: '#DAA520' },
};

export const FlowerCard = ({ isOpen, onClose, flower }: FlowerCardProps) => {
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!flower) return null;

  const colors = flowerColors[flower.type];
  const emoji = getFlowerEmoji(flower.type);

  const handleDownload = async () => {
    if (!cardRef.current || isDownloading) return;
    setIsDownloading(true);

    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
      });

      const link = document.createElement('a');
      link.download = `cosmic-garden-${flower.type}-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Failed to download card:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    const shareText = `🌸 ${flower.message}\n\n— ${flower.author}\n\n${t.appName} 🌱`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: t.appName,
          text: shareText,
          url: window.location.href,
        });
      } catch {
        console.log('Share cancelled');
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      toast.success(t.messageCopied);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            className="relative z-10"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            {/* The actual card for download */}
            <div
              ref={cardRef}
              className="relative w-[300px] sm:w-[340px] rounded-3xl overflow-hidden"
              style={{
                background: colors.bg,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              }}
            >
              {/* Decorative elements */}
              <div
                className="absolute top-0 right-0 w-28 h-28 opacity-20"
                style={{
                  background: `radial-gradient(circle, ${colors.accent} 0%, transparent 70%)`,
                }}
              />
              <div
                className="absolute bottom-0 left-0 w-36 h-36 opacity-15"
                style={{
                  background: `radial-gradient(circle, ${colors.accent} 0%, transparent 70%)`,
                }}
              />

              {/* Content */}
              <div className="relative p-7 sm:p-8">
                {/* Header */}
                <div className="text-center mb-5">
                  <motion.div
                    className="text-5xl mb-3"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {emoji}
                  </motion.div>
                  <p className="text-xs uppercase tracking-widest text-gray-500 font-body">
                    {t.appName}
                  </p>
                </div>

                {/* Message */}
                <div className="text-center mb-5">
                  <p className="text-lg text-gray-800 font-body leading-relaxed italic">
                    "{flower.message}"
                  </p>
                </div>

                {/* Author */}
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600 font-body">
                    — {flower.author}
                  </p>
                  {(flower.city || flower.country) && (
                    <p className="text-xs text-gray-400 mt-1 font-body">
                      📍 {[flower.city, flower.country].filter(Boolean).join(', ')}
                    </p>
                  )}
                </div>

                {/* Footer */}
                <div className="text-center pt-3 border-t border-gray-200/50">
                  <p className="text-xs text-gray-400 font-body">
                    🌱 {t.spreadKindness}
                  </p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-center gap-2 mt-4">
              <motion.button
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-white font-body text-sm"
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={14} />
                {isDownloading ? t.saving : t.saveCard}
              </motion.button>
              
              <motion.button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-white font-body text-sm"
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Share2 size={14} />
                {t.share}
              </motion.button>

              <motion.button
                onClick={onClose}
                className="flex items-center justify-center w-9 h-9 rounded-full text-white"
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X size={16} />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
