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

type ChatStep = 'greeting' | 'askName' | 'planting' | 'done';

interface ChatMessage {
  role: 'ai' | 'user';
  content: string;
}

const quickEmojis = ['😊', '❤️', '🌟', '💪', '🙏', '✨', '🌈', '💐'];

export const ChatDialog = ({ onFlowerPlanted }: ChatDialogProps) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [step, setStep] = useState<ChatStep>('greeting');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userMessage, setUserMessage] = useState('');
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
      setMessages([{ role: 'ai', content: t.aiGreeting }]);
      setStep('greeting');
      setUserMessage('');
      setInput('');
    }
  }, [isOpen, t.aiGreeting]);

  const generatePosition = (): { x: number; y: number } => ({
    x: 10 + Math.random() * 80,
    y: 60 + Math.random() * 30,
  });

  const addMessage = (role: 'ai' | 'user', content: string) => {
    setMessages(prev => [...prev, { role, content }]);
  };

  const simulateTyping = async (response: string) => {
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 600 + Math.random() * 400));
    setIsTyping(false);
    addMessage('ai', response);
  };

  const plantFlower = async (message: string, author: string) => {
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
        body: { message: message.trim(), author: author || undefined }
      });

      if (error) throw error;

      const flowerType = mapToVisualType(data.flowerType || 'wildflower');
      const flowerInfo = getFlowerInfo(data.flowerType);
      const processedMessage = data.message || message.trim();
      const finalAuthor = author || data.author || t.anonymous;
      const position = generatePosition();

      // Save to database
      const { error: insertError } = await supabase
        .from('flowers')
        .insert({
          type: flowerType,
          message: processedMessage,
          author: finalAuthor,
          mood: message.trim(),
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
      setTimeout(() => setIsOpen(false), 1500);

    } catch (err) {
      console.error('Error:', err);
      toast.error('Failed to plant flower. Please try again.');
      setStep('greeting');
    }
  };

  const handleSend = async (quickEmoji?: string) => {
    const text = quickEmoji || input.trim();
    if (!text || isTyping) return;

    addMessage('user', text);
    setInput('');

    if (step === 'greeting') {
      // User shared their mood/message
      setUserMessage(text);
      await simulateTyping(t.aiAskName);
      setStep('askName');
    } else if (step === 'askName') {
      // User provided name (or skip)
      setStep('planting');
      await simulateTyping(t.aiThankYou);
      await plantFlower(userMessage, text);
      setStep('done');
    }
  };

  const handleSkipName = async () => {
    if (isTyping) return;
    addMessage('user', `✨ ${t.skipName}`);
    setStep('planting');
    await simulateTyping(t.aiThankYou);
    await plantFlower(userMessage, '');
    setStep('done');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
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
            className="relative w-full sm:w-[380px] max-w-[calc(100vw-2rem)]"
            style={{
              background: 'rgba(255, 255, 255, 0.18)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              borderRadius: '20px',
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

            {/* Chat messages */}
            <div className="max-h-[280px] overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm font-body ${
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
                  <div className="px-3 py-2 rounded-2xl rounded-bl-md bg-white/10">
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

            {/* Quick emojis - only show in greeting step */}
            {step === 'greeting' && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5 justify-center">
                {quickEmojis.map((emoji) => (
                  <motion.button
                    key={emoji}
                    type="button"
                    onClick={() => handleSend(emoji)}
                    disabled={isTyping}
                    className="w-9 h-9 flex items-center justify-center rounded-full text-lg transition-all disabled:opacity-50"
                    style={{
                      background: 'rgba(255, 255, 255, 0.12)',
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
            <div className="p-3 pt-2" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div className="flex gap-2">
                <div 
                  className="flex-1 flex items-center px-3 py-2 rounded-xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.12)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                  }}
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={step === 'askName' ? t.anonymous : t.shareMoodPlaceholder}
                    disabled={isTyping || step === 'planting' || step === 'done'}
                    className="flex-1 bg-transparent text-white placeholder:text-white/40 font-body text-sm outline-none"
                    style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
                    maxLength={200}
                  />
                </div>

                {/* Skip name button */}
                {step === 'askName' && !isTyping && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    type="button"
                    onClick={handleSkipName}
                    className="px-3 py-2 rounded-xl text-white/70 text-xs font-body hover:text-white transition-colors"
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                    whileHover={{ background: 'rgba(255, 255, 255, 0.12)' }}
                  >
                    {t.skipName}
                  </motion.button>
                )}

                {/* Send button */}
                <motion.button
                  type="button"
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isTyping || step === 'planting' || step === 'done'}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white disabled:opacity-30 transition-all"
                  style={{
                    background: input.trim() ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                  whileHover={input.trim() ? { scale: 1.05 } : {}}
                  whileTap={input.trim() ? { scale: 0.95 } : {}}
                >
                  {step === 'planting' ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      ✨
                    </motion.span>
                  ) : (
                    <span>🌱</span>
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