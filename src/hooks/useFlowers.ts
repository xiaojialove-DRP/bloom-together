import { useState, useEffect } from 'react';
import { FlowerData } from '@/components/Garden';
import { FlowerType } from '@/components/Flower';

const STORAGE_KEY = 'cosmic-garden-flowers';

// Sample encouraging messages
const sampleMessages: { message: string; author: string; type: FlowerType }[] = [
  { message: '你今天做得很好，继续加油！', author: '来自远方的朋友', type: 'rose' },
  { message: '每一个小进步都值得庆祝 ✨', author: '星光使者', type: 'starlight' },
  { message: '无论发生什么，你都不是一个人', author: '温暖的人', type: 'lotus' },
  { message: '相信自己，你比想象中更强大', author: '勇气之花', type: 'cherry' },
  { message: '今天也要开心哦！', author: '快乐小精灵', type: 'cosmos' },
];

const generatePosition = (existingFlowers: FlowerData[]): { x: number; y: number } => {
  let attempts = 0;
  const maxAttempts = 50;
  
  while (attempts < maxAttempts) {
    const x = 10 + Math.random() * 80; // 10% to 90% from left
    const y = 65 + Math.random() * 25; // 65% to 90% from top (bottom area)
    
    // Check if too close to existing flowers
    const tooClose = existingFlowers.some((flower) => {
      const dx = Math.abs(flower.x - x);
      const dy = Math.abs(flower.y - y);
      return dx < 8 && dy < 8;
    });
    
    if (!tooClose) {
      return { x, y };
    }
    
    attempts++;
  }
  
  // Fallback: just return a random position
  return {
    x: 10 + Math.random() * 80,
    y: 65 + Math.random() * 25,
  };
};

export const useFlowers = () => {
  const [flowers, setFlowers] = useState<FlowerData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load flowers from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setFlowers(parsed);
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
