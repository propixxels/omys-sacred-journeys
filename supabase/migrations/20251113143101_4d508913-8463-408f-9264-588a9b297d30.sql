-- Add booking count columns to tours table
ALTER TABLE tours 
ADD COLUMN confirmed_bookings integer DEFAULT 0,
ADD COLUMN available_seats integer DEFAULT 0;

-- Create function to update tour booking counts
CREATE OR REPLACE FUNCTION update_tour_booking_counts()
RETURNS TRIGGER AS $$
DECLARE
  tour_uuid uuid;
  total_confirmed integer;
  total_capacity integer;
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
  INTO total_capacity
  FROM tours
  WHERE id = tour_uuid;
  
  -- Update the tours table
  UPDATE tours
  SET 
    confirmed_bookings = total_confirmed,
    available_seats = GREATEST(0, total_capacity - total_confirmed),
    updated_at = now()
  WHERE id = tour_uuid;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for INSERT on bookings
CREATE TRIGGER update_tour_counts_on_insert
AFTER INSERT ON bookings
FOR EACH ROW
EXECUTE FUNCTION update_tour_booking_counts();

-- Create trigger for UPDATE on bookings
CREATE TRIGGER update_tour_counts_on_update
AFTER UPDATE ON bookings
FOR EACH ROW
WHEN (OLD.status IS DISTINCT FROM NEW.status OR OLD.number_of_people IS DISTINCT FROM NEW.number_of_people)
EXECUTE FUNCTION update_tour_booking_counts();

-- Create trigger for DELETE on bookings
CREATE TRIGGER update_tour_counts_on_delete
AFTER DELETE ON bookings
FOR EACH ROW
EXECUTE FUNCTION update_tour_booking_counts();

-- Backfill existing tour booking counts
UPDATE tours
SET 
  confirmed_bookings = COALESCE((
    SELECT SUM(number_of_people)
    FROM bookings
    WHERE bookings.tour_id = tours.id 
      AND bookings.status = 'confirmed'
  ), 0),
  available_seats = GREATEST(0, tours.total_capacity - COALESCE((
    SELECT SUM(number_of_people)
    FROM bookings
    WHERE bookings.tour_id = tours.id 
      AND bookings.status = 'confirmed'
  ), 0));

-- Add comment for documentation
COMMENT ON COLUMN tours.confirmed_bookings IS 'Total number of people with confirmed bookings (automatically updated by triggers)';
COMMENT ON COLUMN tours.available_seats IS 'Remaining available seats (total_capacity - confirmed_bookings, automatically updated by triggers)';