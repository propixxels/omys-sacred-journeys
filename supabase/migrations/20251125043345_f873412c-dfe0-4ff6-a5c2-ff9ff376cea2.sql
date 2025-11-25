-- Fix the ambiguous column reference in update_tour_booking_counts function
-- The issue is that the variable name 'total_capacity' conflicts with the column name
-- when used in the UPDATE statement context

CREATE OR REPLACE FUNCTION public.update_tour_booking_counts()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  tour_uuid uuid;
  total_confirmed integer;
  tour_capacity integer;  -- Renamed from total_capacity to avoid ambiguity
BEGIN
  -- Get the tour_id from the NEW or OLD record
  tour_uuid := COALESCE(NEW.tour_id, OLD.tour_id);
  
  -- Calculate total confirmed bookings for this tour
  SELECT COALESCE(SUM(number_of_people), 0)
  INTO total_confirmed
  FROM bookings
  WHERE tour_id = tour_uuid 
    AND status = 'confirmed';
  
  -- Get the total capacity
  SELECT tours.total_capacity
  INTO tour_capacity
  FROM tours
  WHERE id = tour_uuid;
  
  -- Update the tours table
  UPDATE tours
  SET 
    confirmed_bookings = total_confirmed,
    available_seats = GREATEST(0, tour_capacity - total_confirmed),
    updated_at = now()
  WHERE id = tour_uuid;
  
  RETURN COALESCE(NEW, OLD);
END;
$function$;