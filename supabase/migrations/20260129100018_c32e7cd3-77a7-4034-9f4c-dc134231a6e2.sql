-- Create flowers table for global sharing
CREATE TABLE public.flowers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL,
  message TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT 'Anonymous',
  mood TEXT,
  x NUMERIC NOT NULL,
  y NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.flowers ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view flowers (public garden)
CREATE POLICY "Anyone can view flowers" 
ON public.flowers 
FOR SELECT 
USING (true);

-- Allow anyone to create flowers (public garden - no auth required)
CREATE POLICY "Anyone can plant flowers" 
ON public.flowers 
FOR INSERT 
WITH CHECK (true);

-- Enable realtime for flowers table
ALTER PUBLICATION supabase_realtime ADD TABLE public.flowers;