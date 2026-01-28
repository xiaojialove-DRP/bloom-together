import { useState, useEffect } from 'react';
import { FlowerData } from '@/components/Garden';
import { FlowerType } from '@/components/ImpressionistFlower';

const STORAGE_KEY = 'impressionist-garden-flowers';

// Sample encouraging messages with impressionist flower types
const sampleMessages: { message: string; author: string; type: FlowerType }[] = [
  { message: '你今天做得很好，继续加油！', author: '来自远方的朋友', type: 'iris' },
  { message: '每一个小进步都值得庆祝 ✨', author: '星光使者', type: 'lavender' },
  { message: '无论发生什么，你都不是一个人', author: '温暖的人', type: 'rose' },
  { message: '相信自己，你比想象中更强大', author: '勇气之花', type: 'poppy' },
  { message: '今天也要开心哦！', author: '快乐小精灵', type: 'daisy' },
];

const generatePosition = (existingFlowers: FlowerData[]): { x: number; y: number } => {
  let attempts = 0;
  const maxAttempts = 50;
  
  while (attempts < maxAttempts) {
    const x = 10 + Math.random() * 80;
    const y = 60 + Math.random() * 30;
    
    const tooClose = existingFlowers.some((flower) => {
      const dx = Math.abs(flower.x - x);
      const dy = Math.abs(flower.y - y);
      return dx < 7 && dy < 6;
    });
    
    if (!tooClose) {
      return { x, y };
    }
    
    attempts++;
  }
  
  return {
    x: 10 + Math.random() * 80,
    y: 60 + Math.random() * 30,
  };
};

export const useFlowers = () => {
  const [flowers, setFlowers] = useState<FlowerData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Validate flower types - migrate old types to new ones
        const validTypes: FlowerType[] = ['iris', 'poppy', 'rose', 'wildflower', 'lavender', 'daisy'];
        const migratedFlowers = parsed.map((flower: FlowerData) => {
          if (!validTypes.includes(flower.type as FlowerType)) {
            // Map old types to new types
            const typeMap: Record<string, FlowerType> = {
              'lotus': 'iris',
              'cherry': 'rose',
              'cosmos': 'wildflower',
              'starlight': 'lavender',
              'aurora': 'daisy',
            };
            return { ...flower, type: typeMap[flower.type] || 'iris' };
          }
          return flower;
        });
        setFlowers(migratedFlowers);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(migratedFlowers));
      } catch (e) {
        console.error('Failed to parse stored flowers:', e);
        initializeSampleFlowers();
      }
    } else {
      initializeSampleFlowers();
    }
    setIsLoaded(true);
  }, []);

  const initializeSampleFlowers = () => {
    const initialFlowers: FlowerData[] = [];
    
    sampleMessages.forEach((sample, index) => {
      const pos = generatePosition(initialFlowers);
      const flower: FlowerData = {
        id: `init-${index}-${Date.now()}`,
        type: sample.type,
        message: sample.message,
        author: sample.author,
        x: pos.x,
        y: pos.y,
        createdAt: Date.now() - (sampleMessages.length - index) * 60000,
      };
      initialFlowers.push(flower);
    });
    
    setFlowers(initialFlowers);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialFlowers));
  };

  const addFlower = (message: string, author: string, type: FlowerType) => {
    const position = generatePosition(flowers);
    const newFlower: FlowerData = {
      id: `flower-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      message,
      author,
      x: position.x,
      y: position.y,
      createdAt: Date.now(),
    };
    
    const updatedFlowers = [...flowers, newFlower];
    setFlowers(updatedFlowers);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFlowers));
    
    return newFlower;
  };

  return { flowers, addFlower, isLoaded };
};
