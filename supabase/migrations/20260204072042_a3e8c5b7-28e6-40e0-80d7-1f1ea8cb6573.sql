-- Fix overly permissive RLS policy for INSERT
-- Drop the current permissive policy
DROP POLICY IF EXISTS "Anyone can plant flowers" ON public.flowers;

-- Create a more restrictive INSERT policy
-- Still allows public inserts but validates basic constraints
CREATE POLICY "Anyone can plant flowers with valid data" 
ON public.flowers 
FOR INSERT 
WITH CHECK (
  -- Ensure message is not empty
  message IS NOT NULL AND 
  length(message) > 0 AND
  length(message) <= 200 AND
  -- Ensure type is not empty
  type IS NOT NULL AND
  length(type) > 0 AND
  -- Ensure coordinates are within valid range
  x >= 0 AND x <= 100 AND
  y >= 0 AND y <= 100
);

-- Add a comment explaining the policy
COMMENT ON POLICY "Anyone can plant flowers with valid data" ON public.flowers IS 
'Allows public flower creation with server-side validation for message length, type, and coordinates';