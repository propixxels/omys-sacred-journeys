-- Fix infinite recursion by creating a security definer function for admin checks
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM admin_users 
    WHERE email = (auth.jwt() ->> 'email'::text)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = public;

-- Drop and recreate policies to fix recursion issues

-- Tours should be publicly viewable, only admin operations restricted
DROP POLICY IF EXISTS "Admin users can manage tours" ON public.tours;
DROP POLICY IF EXISTS "Anyone can view tours" ON public.tours;

CREATE POLICY "Anyone can view tours" 
ON public.tours 
FOR SELECT 
USING (true);

CREATE POLICY "Admin users can insert tours" 
ON public.tours 
FOR INSERT 
WITH CHECK (public.is_admin_user());

CREATE POLICY "Admin users can update tours" 
ON public.tours 
FOR UPDATE 
USING (public.is_admin_user());

CREATE POLICY "Admin users can delete tours" 
ON public.tours 
FOR DELETE 
USING (public.is_admin_user());

-- Fix booking policies to use the security definer function
DROP POLICY IF EXISTS "Admin users can view all bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admin users can update bookings" ON public.bookings;

CREATE POLICY "Admin users can view all bookings" 
ON public.bookings 
FOR SELECT 
USING (public.is_admin_user());

CREATE POLICY "Admin users can update bookings" 
ON public.bookings 
FOR UPDATE 
USING (public.is_admin_user());

-- Fix booking_notes policies
DROP POLICY IF EXISTS "Admin users can view all booking notes" ON public.booking_notes;
DROP POLICY IF EXISTS "Admin users can create booking notes" ON public.booking_notes;
DROP POLICY IF EXISTS "Admin users can update booking notes" ON public.booking_notes;
DROP POLICY IF EXISTS "Admin users can delete booking notes" ON public.booking_notes;

CREATE POLICY "Admin users can view all booking notes" 
ON public.booking_notes 
FOR SELECT 
USING (public.is_admin_user());

CREATE POLICY "Admin users can create booking notes" 
ON public.booking_notes 
FOR INSERT 
WITH CHECK (public.is_admin_user());

CREATE POLICY "Admin users can update booking notes" 
ON public.booking_notes 
FOR UPDATE 
USING (public.is_admin_user());

CREATE POLICY "Admin users can delete booking notes" 
ON public.booking_notes 
FOR DELETE 
USING (public.is_admin_user());

-- Fix booking_payments policies
DROP POLICY IF EXISTS "Admin users can view all booking payments" ON public.booking_payments;
DROP POLICY IF EXISTS "Admin users can create booking payments" ON public.booking_payments;
DROP POLICY IF EXISTS "Admin users can update booking payments" ON public.booking_payments;
DROP POLICY IF EXISTS "Admin users can delete booking payments" ON public.booking_payments;

CREATE POLICY "Admin users can view all booking payments" 
ON public.booking_payments 
FOR SELECT 
USING (public.is_admin_user());

CREATE POLICY "Admin users can create booking payments" 
ON public.booking_payments 
FOR INSERT 
WITH CHECK (public.is_admin_user());

CREATE POLICY "Admin users can update booking payments" 
ON public.booking_payments 
FOR UPDATE 
USING (public.is_admin_user());

CREATE POLICY "Admin users can delete booking payments" 
ON public.booking_payments 
FOR DELETE 
USING (public.is_admin_user());