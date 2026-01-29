import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { FlowerType } from './ImpressionistFlower';

// Map extended AI flower types to base types
const mapFlowerType = (type: string): FlowerType => {
  const validTypes: FlowerType[] = ['iris', 'poppy', 'rose', 'wildflower', 'lavender', 'daisy'];
  if (validTypes.includes(type as FlowerType)) {
    return type as FlowerType;
  }
  const typeMap: Record<string, FlowerType> = {
    'sunflower': 'daisy',
    'tulip': 'rose',
    'orchid': 'iris',
    'lily': 'lavender',
    'cherry_blossom': 'rose',
    'lotus': 'iris',
    'magnolia': 'rose',
    'peony': 'rose',
    'hibiscus': 'poppy',
    'carnation': 'rose',
    'chrysanthemum': 'daisy',
    'daffodil': 'daisy',
  };
  return typeMap[type] || 'wildflower';
};

interface ChatDialogProps {
  onFlowerPlanted: (flower: {
    type: FlowerType;
    message: string;
    author: string;
    x: number;
    y: number;
  }) => void;
}

const quickEmojis = ['😊', '❤️', '🌟', '💪', '🙏', '✨', '🌈', '💐'];

export const ChatDialog = ({ onFlowerPlanted }: ChatDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const generatePosition = (): { x: number; y: number } => ({
    x: 10 + Math.random() * 80,
    y: 60 + Math.random() * 30,
  });

  const handleSubmit = async (inputMessage?: string) => {
    const finalMessage = inputMessage || message;
    if (!finalMessage.trim() || isGenerating) return;

    setIsGenerating(true);
    setAiResponse(null);

    try {
      const { data, error } = await supabase.functions.invoke('generate-flower', {
        body: { message: finalMessage.trim() }
      });

      if (error) {
        console.error('Error generating flower:', error);
        throw error;
      }

      const flowerType = mapFlowerType(data.flowerType || 'wildflower');
      const processedMessage = data.message || finalMessage.trim();
      const author = data.author || 'Anonymous';
      const position = generatePosition();

      // Save to database
      const { error: insertError } = await supabase
        .from('flowers')
        .insert({
          type: flowerType,
          message: processedMessage,
          author: author,
          mood: finalMessage.trim(),
          x: position.x,
          y: position.y
        });

      if (insertError) {
        console.error('Error saving flower:', insertError);
        throw insertError;
      }

      setAiResponse(`🌸 Planted a beautiful ${flowerType.replace('_', ' ')}!`);
      
      onFlowerPlanted({
        type: flowerType,
        message: processedMessage,
        author: author,
        x: position.x,
        y: position.y,
      });

      toast.success('Your flower has been planted! 🌱', {
        description: 'Thank you for adding beauty to the garden',
      });

      setMessage('');
      
      setTimeout(() => {
        setAiResponse(null);
        setIsOpen(false);
      }, 2000);

    } catch (err) {
      console.error('Error:', err);
      toast.error('Failed to plant flower. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="fixed bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 w-full px-4 sm:px-0 sm:w-auto">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="button"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="flex justify-center"
          >
            <motion.button
              onClick={() => setIsOpen(true)}
              className="group relative px-8 py-4 rounded-full text-white font-body text-lg tracking-wide"
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
              }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center gap-3">
                <motion.span 
                  className="text-xl"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0] 
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  🌱
                </motion.span>
                Plant a Flower
              </span>
            </motion.button>
          </motion.div>
        ) : (
          <motion.div 
            key="dialog"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full sm:w-[420px] max-w-[calc(100vw-2rem)]"
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.35)',
              boxShadow: '0 24px 80px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
              overflow: 'hidden',
            }}
          >
            {/* Glass header */}
            <div 
              className="px-6 py-4 flex items-center justify-between"
              style={{
                borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                background: 'rgba(255, 255, 255, 0.1)',
              }}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🌸</span>
                <div>
                  <h3 className="text-white font-display text-base" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
                    Cosmic Garden
                  </h3>
                  <p className="text-white/70 text-xs font-body">Share your thoughts & plant a flower</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors rounded-full hover:bg-white/10"
                disabled={isGenerating}
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* AI Response */}
              <AnimatePresence>
                {aiResponse && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-2xl"
                    style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                    }}
                  >
                    <p className="text-white font-body text-center" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                      {aiResponse}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Quick emoji buttons */}
              <div className="flex flex-wrap gap-2 justify-center">
                {quickEmojis.map((emoji) => (
                  <motion.button
                    key={emoji}
                    type="button"
                    onClick={() => handleSubmit(emoji)}
                    disabled={isGenerating}
                    className="w-10 h-10 flex items-center justify-center rounded-full text-xl transition-all disabled:opacity-50"
                    style={{
                      background: 'rgba(255, 255, 255, 0.15)',
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                    }}
                    whileHover={{ scale: 1.1, background: 'rgba(255, 255, 255, 0.25)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {emoji}
                  </motion.button>
                ))}
              </div>

              {/* Input area */}
              <div 
                className="flex items-center gap-3 p-3 rounded-2xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Share your mood or encouragement..."
                  disabled={isGenerating}
                  className="flex-1 bg-transparent text-white placeholder:text-white/50 font-body text-sm outline-none"
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
                  maxLength={200}
                />
                <motion.button
                  type="button"
                  onClick={() => handleSubmit()}
                  disabled={!message.trim() || isGenerating}
                  className="w-10 h-10 flex items-center justify-center rounded-full text-white disabled:opacity-40 transition-all"
                  style={{
                    background: message.trim() ? 'rgba(255, 255, 255, 0.25)' : 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                  }}
                  whileHover={message.trim() ? { scale: 1.05 } : {}}
                  whileTap={message.trim() ? { scale: 0.95 } : {}}
                >
                  {isGenerating ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      ✨
                    </motion.span>
                  ) : (
                    '→'
                  )}
                </motion.button>
              </div>

              <p className="text-center text-white/50 text-xs font-body">
                AI will choose a flower based on your message ✨
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
