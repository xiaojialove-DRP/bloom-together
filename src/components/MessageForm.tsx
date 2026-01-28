import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlowerType } from './Flower';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { toast } from 'sonner';

interface MessageFormProps {
  onSubmit: (message: string, author: string, flowerType: FlowerType) => void;
}

const flowerOptions: { type: FlowerType; name: string; emoji: string }[] = [
  { type: 'rose', name: '玫瑰', emoji: '🌹' },
  { type: 'lotus', name: '莲花', emoji: '🪷' },
  { type: 'cherry', name: '樱花', emoji: '🌸' },
  { type: 'cosmos', name: '宇宙花', emoji: '💫' },
  { type: 'starlight', name: '星光花', emoji: '⭐' },
  { type: 'aurora', name: '极光花', emoji: '🌈' },
];

export const MessageForm = ({ onSubmit }: MessageFormProps) => {
  const [message, setMessage] = useState('');
  const [author, setAuthor] = useState('');
  const [selectedFlower, setSelectedFlower] = useState<FlowerType>('rose');
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isSubmitting) {
      setIsSubmitting(true);
      
      // Small delay for animation
      await new Promise(resolve => setTimeout(resolve, 300));
      
      onSubmit(message.trim(), author.trim() || '匿名', selectedFlower);
      
      const selectedOption = flowerOptions.find(f => f.type === selectedFlower);
      toast.success(
        `${selectedOption?.emoji} 你的${selectedOption?.name}已种下！`,
        {
          description: '感谢你为这个世界增添了一份温暖 💫',
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
    <div className="fixed bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 w-full px-4 sm:px-0 sm:w-auto">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="button"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="flex justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => setIsOpen(true)}
                className="px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground rounded-full shadow-lg"
                style={{
                  boxShadow: '0 0 30px hsla(280, 80%, 70%, 0.4), 0 4px 20px rgba(0,0,0,0.3)',
                }}
              >
                <motion.span 
                  className="mr-2 inline-block"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🌱
                </motion.span>
                种下一朵花
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            key="form"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-card/95 backdrop-blur-lg rounded-2xl p-4 sm:p-6 shadow-xl border border-border w-full sm:w-[400px] max-w-[calc(100vw-2rem)]"
            style={{
              boxShadow: '0 0 40px hsla(280, 80%, 70%, 0.2), 0 8px 32px rgba(0,0,0,0.4)',
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  选择你的花朵
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {flowerOptions.map((option) => (
                    <motion.button
                      key={option.type}
                      type="button"
                      onClick={() => setSelectedFlower(option.type)}
                      className={`p-2 sm:p-3 rounded-lg border-2 transition-colors duration-200 ${
                        selectedFlower === option.type
                          ? 'border-primary bg-primary/20'
                          : 'border-border hover:border-primary/50'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.span 
                        className="text-xl sm:text-2xl inline-block"
                        animate={selectedFlower === option.type ? {
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, -10, 0],
                        } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        {option.emoji}
                      </motion.span>
                      <p className="text-xs mt-1 text-foreground">{option.name}</p>
                    </motion.button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  你的鼓励或善意 ✨
                </label>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="写下你想对世界说的温暖话语..."
                  className="bg-muted/50 border-border focus:border-primary resize-none text-foreground placeholder:text-muted-foreground"
                  rows={3}
                  maxLength={200}
                />
                <p className="text-xs text-muted-foreground mt-1 text-right">
                  {message.length}/200
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  你的名字 (可选)
                </label>
                <Input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="匿名"
                  className="bg-muted/50 border-border focus:border-primary text-foreground placeholder:text-muted-foreground"
                  maxLength={20}
                />
              </div>
              
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 border-border hover:bg-muted"
                  disabled={isSubmitting}
                >
                  取消
                </Button>
                <Button
                  type="submit"
                  disabled={!message.trim() || isSubmitting}
                  className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      ✨
                    </motion.span>
                  ) : (
                    '种下花朵 🌸'
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
