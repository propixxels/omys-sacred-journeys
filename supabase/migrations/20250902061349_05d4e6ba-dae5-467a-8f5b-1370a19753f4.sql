-- Enable RLS on booking_payments table
ALTER TABLE public.booking_payments ENABLE ROW LEVEL SECURITY;

-- Admin users can view all booking payments
CREATE POLICY "Admin users can view all booking payments" 
ON public.booking_payments 
FOR SELECT 
USING (EXISTS ( 
  SELECT 1
  FROM admin_users
  WHERE (admin_users.email = (auth.jwt() ->> 'email'::text))
));

-- Admin users can create booking payments
CREATE POLICY "Admin users can create booking payments" 
ON public.booking_payments 
FOR INSERT 
WITH CHECK (EXISTS ( 
  SELECT 1
  FROM admin_users
  WHERE (admin_users.email = (auth.jwt() ->> 'email'::text))
));

-- Admin users can update booking payments
CREATE POLICY "Admin users can update booking payments" 
ON public.booking_payments 
FOR UPDATE 
USING (EXISTS ( 
  SELECT 1
  FROM admin_users
  WHERE (admin_users.email = (auth.jwt() ->> 'email'::text))
));

-- Admin users can delete booking payments
CREATE POLICY "Admin users can delete booking payments" 
ON public.booking_payments 
FOR DELETE 
USING (EXISTS ( 
  SELECT 1
  FROM admin_users
  WHERE (admin_users.email = (auth.jwt() ->> 'email'::text))
));

-- Fix the function search path issue
CREATE OR REPLACE FUNCTION public.update_booking_modified_time()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
  NEW.last_modified_at = now();
  RETURN NEW;
END;
$function$;