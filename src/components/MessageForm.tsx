import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlowerType } from './ImpressionistFlower';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { toast } from 'sonner';

interface MessageFormProps {
  onSubmit: (message: string, author: string, flowerType: FlowerType) => void;
}

const flowerOptions: { type: FlowerType; name: string; emoji: string }[] = [
  { type: 'iris', name: '鸢尾花', emoji: '💜' },
  { type: 'poppy', name: '罂粟花', emoji: '🌺' },
  { type: 'rose', name: '玫瑰', emoji: '🌹' },
  { type: 'wildflower', name: '野花', emoji: '🌸' },
  { type: 'lavender', name: '薰衣草', emoji: '💐' },
  { type: 'daisy', name: '雏菊', emoji: '🌼' },
];

export const MessageForm = ({ onSubmit }: MessageFormProps) => {
  const [message, setMessage] = useState('');
  const [author, setAuthor] = useState('');
  const [selectedFlower, setSelectedFlower] = useState<FlowerType>('iris');
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isSubmitting) {
      setIsSubmitting(true);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      onSubmit(message.trim(), author.trim() || '匿名', selectedFlower);
      
      const selectedOption = flowerOptions.find(f => f.type === selectedFlower);
      toast.success(
        `${selectedOption?.emoji} 你的${selectedOption?.name}已种下！`,
        {
          description: '感谢你为花园增添了一份美丽 🌿',
          duration: 3000,
        }
      );
      
      setMessage('');
      setAuthor('');
      setIsOpen(false);
      setIsSubmitting(false);
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
              className="group relative px-10 py-4 bg-white/10 border-2 border-white rounded-full text-white font-body text-lg tracking-wider transition-all duration-300 hover:bg-white/20"
              style={{
                boxShadow: '0 4px 24px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(8px)',
              }}
              whileHover={{ scale: 1.02, boxShadow: '0 6px 32px rgba(255, 255, 255, 0.3)' }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center gap-3">
                <motion.span 
                  className="text-xl"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 8, -8, 0] 
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  🌱
                </motion.span>
                种下一朵花
              </span>
              
              {/* Decorative corner elements */}
              <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/70 rounded-tl-lg" />
              <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/70 rounded-tr-lg" />
              <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/70 rounded-bl-lg" />
              <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/70 rounded-br-lg" />
            </motion.button>
          </motion.div>
        ) : (
          <motion.div 
            key="form"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative bg-white backdrop-blur-md rounded-2xl p-6 sm:p-7 border-2 border-white w-full sm:w-[400px] max-w-[calc(100vw-2rem)]"
            style={{
              boxShadow: '0 12px 48px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.08)',
            }}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted/30"
              disabled={isSubmitting}
            >
              ✕
            </button>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Title */}
              <div className="text-center pb-2">
                <h3 className="text-lg font-display text-foreground">种下一朵花</h3>
                <p className="text-sm text-muted-foreground font-body mt-1">分享你的温暖与善意</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-3 font-body">
                  选择花朵
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {flowerOptions.map((option) => (
                    <motion.button
                      key={option.type}
                      type="button"
                      onClick={() => setSelectedFlower(option.type)}
                      className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                        selectedFlower === option.type
                          ? 'border-primary bg-primary/5 shadow-sm'
                          : 'border-border/40 hover:border-primary/30 bg-white'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.span 
                        className="text-2xl inline-block"
                        animate={selectedFlower === option.type ? {
                          scale: [1, 1.12, 1],
                        } : {}}
                        transition={{ duration: 0.35 }}
                      >
                        {option.emoji}
                      </motion.span>
                      <p className="text-xs mt-1.5 text-foreground/80 font-body">{option.name}</p>
                    </motion.button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2 font-body">
                  你的鼓励 ✨
                </label>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="写下你想对世界说的温暖话语..."
                  className="bg-muted/20 border-border/40 focus:border-primary focus:bg-white resize-none text-foreground placeholder:text-muted-foreground/70 font-body rounded-xl transition-all"
                  rows={3}
                  maxLength={200}
                />
                <p className="text-xs text-muted-foreground mt-1.5 text-right font-body">
                  {message.length}/200
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2 font-body">
                  署名 <span className="text-muted-foreground font-normal">(可选)</span>
                </label>
                <Input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="匿名"
                  className="bg-muted/20 border-border/40 focus:border-primary focus:bg-white text-foreground placeholder:text-muted-foreground/70 font-body rounded-xl transition-all"
                  maxLength={20}
                />
              </div>
              
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={!message.trim() || isSubmitting}
                  className="w-full py-3.5 px-6 bg-primary text-primary-foreground rounded-xl font-body text-base hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    boxShadow: !message.trim() || isSubmitting ? 'none' : '0 4px 16px hsla(280, 45%, 55%, 0.25)',
                  }}
                >
                  {isSubmitting ? (
                    <motion.span
                      className="inline-block"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      ✨
                    </motion.span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      种下花朵
                      <span className="text-lg">🌸</span>
                    </span>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
