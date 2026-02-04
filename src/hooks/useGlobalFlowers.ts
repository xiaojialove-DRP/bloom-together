import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { FlowerType } from '@/components/ImpressionistFlower';
import { mapToVisualType } from '@/lib/flowerDatabase';

// Central FlowerData interface - exported for use across the app
export interface FlowerData {
  id: string;
  type: FlowerType;
  message: string;
  author: string;
  x: number;
  y: number;
  createdAt: number;
  latitude?: number;
  longitude?: number;
  country?: string;
  city?: string;
}

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
        type: mapToVisualType(f.type),
        message: f.message,
        author: f.author || 'Anonymous',
        x: Number(f.x),
        y: Number(f.y),
        createdAt: new Date(f.created_at).getTime(),
        latitude: f.latitude ? Number(f.latitude) : undefined,
        longitude: f.longitude ? Number(f.longitude) : undefined,
        country: f.country || undefined,
        city: f.city || undefined,
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
            latitude?: number;
            longitude?: number;
            country?: string;
            city?: string;
          };

          const mappedFlower: FlowerData = {
            id: newFlower.id,
            type: mapToVisualType(newFlower.type),
            message: newFlower.message,
            author: newFlower.author || 'Anonymous',
            x: Number(newFlower.x),
            y: Number(newFlower.y),
            createdAt: new Date(newFlower.created_at).getTime(),
            latitude: newFlower.latitude ? Number(newFlower.latitude) : undefined,
            longitude: newFlower.longitude ? Number(newFlower.longitude) : undefined,
            country: newFlower.country || undefined,
            city: newFlower.city || undefined,
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

  const addLocalFlower = (flower: Omit<FlowerData, 'id' | 'createdAt'>): FlowerData => {
    const newFlower: FlowerData = {
      ...flower,
      id: `local-${Date.now()}`,
      createdAt: Date.now(),
    };
    setFlowers((prev) => [...prev, newFlower]);
    return newFlower;
  };

  return { flowers, addLocalFlower, isLoaded };
};
