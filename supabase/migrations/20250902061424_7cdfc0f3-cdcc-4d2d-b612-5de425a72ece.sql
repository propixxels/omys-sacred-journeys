-- The other tables already have RLS policies but RLS wasn't enabled
-- Enable RLS on tables that have policies but RLS disabled

-- Enable RLS on admin_users table (already has policies)
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Enable RLS on tours table (already has policies) 
ALTER TABLE public.tours ENABLE ROW LEVEL SECURITY;

-- Enable RLS on bookings table (already has policies)
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;