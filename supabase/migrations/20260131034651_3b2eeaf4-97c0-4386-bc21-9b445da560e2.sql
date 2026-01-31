-- Add latitude and longitude columns for geographic display
ALTER TABLE public.flowers 
ADD COLUMN latitude numeric,
ADD COLUMN longitude numeric,
ADD COLUMN country text,
ADD COLUMN city text;