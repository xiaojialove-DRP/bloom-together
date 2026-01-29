import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { FlowerType } from '@/components/ImpressionistFlower';

export interface FlowerData {
  id: string;
  type: FlowerType;
  message: string;
  author: string;
  x: number;
  y: number;
  createdAt: number;
}

// Extended flower types including new AI-generated ones
const validFlowerTypes: FlowerType[] = [
  'iris', 'poppy', 'rose', 'wildflower', 'lavender', 'daisy'
];

const mapFlowerType = (type: string): FlowerType => {
  // Map extended types to base types
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

  if (validFlowerTypes.includes(type as FlowerType)) {
    return type as FlowerType;
  }
  return typeMap[type] || 'wildflower';
};

export const useGlobalFlowers = () => {
  const [flowers, setFlowers] = useState<FlowerData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load initial flowers
  useEffect(() => {
    const loadFlowers = async () => {
      const { data, error } = await supabase
        .from('flowers')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error loading flowers:', error);
        setIsLoaded(true);
        return;
      }

      const mappedFlowers: FlowerData[] = (data || []).map((f) => ({
        id: f.id,
        type: mapFlowerType(f.type),
        message: f.message,
        author: f.author || 'Anonymous',
        x: Number(f.x),
        y: Number(f.y),
        createdAt: new Date(f.created_at).getTime(),
      }));

      setFlowers(mappedFlowers);
      setIsLoaded(true);
    };

    loadFlowers();
  }, []);

  // Subscribe to realtime updates
  useEffect(() => {
    const channel = supabase
      .channel('flowers-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'flowers',
        },
        (payload) => {
          const newFlower = payload.new as {
            id: string;
            type: string;
            message: string;
            author: string;
            x: number;
            y: number;
            created_at: string;
          };

          const mappedFlower: FlowerData = {
            id: newFlower.id,
            type: mapFlowerType(newFlower.type),
            message: newFlower.message,
            author: newFlower.author || 'Anonymous',
            x: Number(newFlower.x),
            y: Number(newFlower.y),
            createdAt: new Date(newFlower.created_at).getTime(),
          };

          setFlowers((prev) => {
            // Avoid duplicates
            if (prev.some((f) => f.id === mappedFlower.id)) {
              return prev;
            }
            return [...prev, mappedFlower];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const addLocalFlower = (flower: Omit<FlowerData, 'id' | 'createdAt'>) => {
    const newFlower: FlowerData = {
      ...flower,
      id: `local-${Date.now()}`,
      createdAt: Date.now(),
    };
    setFlowers((prev) => [...prev, newFlower]);
  };

  return { flowers, addLocalFlower, isLoaded };
};
