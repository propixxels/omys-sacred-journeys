-- Add DELETE policy for bookings table (admin users only)
CREATE POLICY "Admin users can delete bookings" 
ON public.bookings 
FOR DELETE 
USING (is_admin_user());

-- Add CASCADE delete to booking_notes foreign key
ALTER TABLE public.booking_notes
DROP CONSTRAINT IF EXISTS booking_notes_booking_id_fkey;

ALTER TABLE public.booking_notes
ADD CONSTRAINT booking_notes_booking_id_fkey
FOREIGN KEY (booking_id)
REFERENCES public.bookings(id)
ON DELETE CASCADE;

-- Add CASCADE delete to booking_payments foreign key
ALTER TABLE public.booking_payments
DROP CONSTRAINT IF EXISTS booking_payments_booking_id_fkey;

ALTER TABLE public.booking_payments
ADD CONSTRAINT booking_payments_booking_id_fkey
FOREIGN KEY (booking_id)
REFERENCES public.bookings(id)
ON DELETE CASCADE;