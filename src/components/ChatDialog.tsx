import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { FlowerType } from './ImpressionistFlower';
import { mapToVisualType, getFlowerInfo } from '@/lib/flowerDatabase';
import { useLanguage } from '@/hooks/useLanguage';

interface ChatDialogProps {
  onFlowerPlanted: (flower: {
    type: FlowerType;
    message: string;
    author: string;
    x: number;
    y: number;
  }) => void;
}

type ChatStep = 'sharing' | 'signing' | 'planting' | 'done';

interface ChatMessage {
  role: 'ai' | 'user';
  content: string;
}

const moodEmojis = ['😊', '❤️', '🌟', '💪', '😢', '🙏', '✨', '🌈'];

export const ChatDialog = ({ onFlowerPlanted }: ChatDialogProps) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [step, setStep] = useState<ChatStep>('sharing');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userMood, setUserMood] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when open
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setMessages([{ role: 'ai', content: t.aiSimpleGreeting }]);
      setStep('sharing');
      setUserMood('');
      setInput('');
    }
  }, [isOpen, t.aiSimpleGreeting]);

  const generatePosition = (): { x: number; y: number } => ({
    x: 10 + Math.random() * 80,
    y: 60 + Math.random() * 30,
  });

  const addMessage = (role: 'ai' | 'user', content: string) => {
    setMessages(prev => [...prev, { role, content }]);
  };

  const simulateTyping = async (response: string, delay = 600) => {
    setIsTyping(true);
    await new Promise(r => setTimeout(r, delay + Math.random() * 300));
    setIsTyping(false);
    addMessage('ai', response);
  };

  const plantFlower = async (mood: string, author: string) => {
    try {
      // Get user's location
      let geoData: { latitude?: number; longitude?: number; country?: string; city?: string } = {};
      try {
        const geoResponse = await fetch('https://ipapi.co/json/');
        if (geoResponse.ok) {
          const geo = await geoResponse.json();
          geoData = {
            latitude: geo.latitude,
            longitude: geo.longitude,
            country: geo.country_name,
            city: geo.city,
          };
        }
      } catch {
        console.log('Could not get location');
      }

      const { data, error } = await supabase.functions.invoke('generate-flower', {
        body: { message: mood.trim(), author: author || undefined }
      });

      if (error) throw error;

      const flowerType = mapToVisualType(data.flowerType || 'wildflower');
      const flowerInfo = getFlowerInfo(data.flowerType);
      const processedMessage = data.message || mood.trim();
      const finalAuthor = author || data.author || t.anonymous;
      const position = generatePosition();

      // Save to database
      const { error: insertError } = await supabase
        .from('flowers')
        .insert({
          type: flowerType,
          message: processedMessage,
          author: finalAuthor,
          mood: mood.trim(),
          x: position.x,
          y: position.y,
          latitude: geoData.latitude,
          longitude: geoData.longitude,
          country: geoData.country,
          city: geoData.city,
        });

      if (insertError) throw insertError;

      const flowerName = flowerInfo?.name || flowerType.replace('_', ' ');
      
      onFlowerPlanted({
        type: flowerType,
        message: processedMessage,
        author: finalAuthor,
        x: position.x,
        y: position.y,
      });

      toast.success(`🌸 ${t.plantedFlower} ${flowerName}!`, {
        description: t.thankYouPlanting,
      });

      // Close dialog after success
      setTimeout(() => setIsOpen(false), 1200);

    } catch (err) {
      console.error('Error:', err);
      toast.error('Failed to plant flower. Please try again.');
      setStep('sharing');
    }
  };

  const handleSend = async (quickEmoji?: string) => {
    const text = quickEmoji || input.trim();
    if (!text || isTyping) return;

    addMessage('user', text);
    setInput('');

    if (step === 'sharing') {
      // User shared their feeling - move to optional signing
      setUserMood(text);
      await simulateTyping(t.aiAskSign, 400);
      setStep('signing');
    } else if (step === 'signing') {
      // User provided name - plant the flower
      setStep('planting');
      await simulateTyping(t.aiPlanting, 300);
      await plantFlower(userMood, text);
      setStep('done');
    }
  };

  const handlePlantNow = async () => {
    if (isTyping) return;
    addMessage('user', `🌱 ${t.plantNow}`);
    setStep('planting');
    await simulateTyping(t.aiPlanting, 300);
    await plantFlower(userMood, '');
    setStep('done');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getPlaceholder = () => {
    switch (step) {
      case 'sharing':
        return t.moodPlaceholder;
      case 'signing':
        return t.signPlaceholder;
      default:
        return '...';
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
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  🌱
                </motion.span>
                {t.plantFlower}
              </span>
            </motion.button>
          </motion.div>
        ) : (
          <motion.div 
            key="dialog"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full sm:w-[400px] max-w-[calc(100vw-2rem)]"
            style={{
              background: 'rgba(255, 255, 255, 0.18)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 24px 80px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
              overflow: 'hidden',
            }}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center text-white/50 hover:text-white transition-colors rounded-full hover:bg-white/10 z-10"
            >
              ✕
            </button>

            {/* Step indicator */}
            <div className="px-4 pt-4 pb-2">
              <div className="flex justify-center gap-2">
                {['sharing', 'signing'].map((s, i) => (
                  <div
                    key={s}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      ['sharing', 'signing', 'planting', 'done'].indexOf(step) >= i
                        ? 'bg-white/70 w-10'
                        : 'bg-white/20 w-6'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Chat messages */}
            <div className="max-h-[300px] overflow-y-auto px-4 pb-2 space-y-3">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm font-body leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-white/25 text-white rounded-br-md' 
                        : 'bg-white/10 text-white/90 rounded-bl-md'
                    }`}
                    style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="px-4 py-2.5 rounded-2xl rounded-bl-md bg-white/10">
                    <motion.span
                      className="flex gap-1"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    >
                      <span className="w-1.5 h-1.5 bg-white/60 rounded-full" />
                      <span className="w-1.5 h-1.5 bg-white/60 rounded-full" />
                      <span className="w-1.5 h-1.5 bg-white/60 rounded-full" />
                    </motion.span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick mood emojis - only show in sharing step */}
            {step === 'sharing' && !isTyping && (
              <div className="px-4 pb-3 flex flex-wrap gap-2 justify-center">
                {moodEmojis.map((emoji) => (
                  <motion.button
                    key={emoji}
                    type="button"
                    onClick={() => handleSend(emoji)}
                    disabled={isTyping}
                    className="w-10 h-10 flex items-center justify-center rounded-full text-xl transition-all disabled:opacity-50"
                    style={{
                      background: 'rgba(255, 255, 255, 0.15)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                    }}
                    whileHover={{ scale: 1.1, background: 'rgba(255, 255, 255, 0.2)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {emoji}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Input area */}
            <div className="p-4 pt-2" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div className="flex gap-2 items-center">
                <div 
                  className="flex-1 flex items-center px-4 py-3 rounded-2xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                  }}
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={getPlaceholder()}
                    disabled={isTyping || step === 'planting' || step === 'done'}
                    className="flex-1 bg-transparent text-white placeholder:text-white/40 font-body text-sm outline-none"
                    style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
                    maxLength={200}
                  />
                </div>

                {/* Plant now button - show only in signing step */}
                {step === 'signing' && !isTyping && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    type="button"
                    onClick={handlePlantNow}
                    className="px-4 py-3 rounded-2xl text-white text-sm font-body whitespace-nowrap"
                    style={{
                      background: 'rgba(255, 255, 255, 0.15)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                    }}
                    whileHover={{ scale: 1.02, background: 'rgba(255, 255, 255, 0.2)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    🌱 {t.plantNow}
                  </motion.button>
                )}

                {/* Send button */}
                <motion.button
                  type="button"
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isTyping || step === 'planting' || step === 'done'}
                  className="w-11 h-11 rounded-2xl flex items-center justify-center text-white disabled:opacity-30 transition-all"
                  style={{
                    background: input.trim() ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                  whileHover={input.trim() ? { scale: 1.05 } : {}}
                  whileTap={input.trim() ? { scale: 0.95 } : {}}
                >
                  {step === 'planting' ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    >
                      🌸
                    </motion.span>
                  ) : (
                    <span className="text-lg">→</span>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
