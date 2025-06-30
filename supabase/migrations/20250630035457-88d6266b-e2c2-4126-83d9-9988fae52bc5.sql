
-- Add domestic/international classification and capacity to tours table
ALTER TABLE public.tours 
ADD COLUMN trip_type text DEFAULT 'domestic' CHECK (trip_type IN ('domestic', 'international')),
ADD COLUMN total_capacity integer DEFAULT 50;

-- Update existing tours to have default values
UPDATE public.tours 
SET trip_type = 'domestic', total_capacity = 50 
WHERE trip_type IS NULL OR total_capacity IS NULL;
