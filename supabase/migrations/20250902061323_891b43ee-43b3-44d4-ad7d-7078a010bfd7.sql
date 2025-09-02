-- Enable Row Level Security on booking_notes table
ALTER TABLE public.booking_notes ENABLE ROW LEVEL SECURITY;

-- Policy to allow admin users to view all booking notes
CREATE POLICY "Admin users can view all booking notes" 
ON public.booking_notes 
FOR SELECT 
USING (EXISTS ( 
  SELECT 1
  FROM admin_users
  WHERE (admin_users.email = (auth.jwt() ->> 'email'::text))
));

-- Policy to allow admin users to create booking notes
CREATE POLICY "Admin users can create booking notes" 
ON public.booking_notes 
FOR INSERT 
WITH CHECK (EXISTS ( 
  SELECT 1
  FROM admin_users
  WHERE (admin_users.email = (auth.jwt() ->> 'email'::text))
));

-- Policy to allow admin users to update booking notes
CREATE POLICY "Admin users can update booking notes" 
ON public.booking_notes 
FOR UPDATE 
USING (EXISTS ( 
  SELECT 1
  FROM admin_users
  WHERE (admin_users.email = (auth.jwt() ->> 'email'::text))
));

-- Policy to allow admin users to delete booking notes
CREATE POLICY "Admin users can delete booking notes" 
ON public.booking_notes 
FOR DELETE 
USING (EXISTS ( 
  SELECT 1
  FROM admin_users
  WHERE (admin_users.email = (auth.jwt() ->> 'email'::text))
));