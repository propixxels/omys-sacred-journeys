-- Fix recursive RLS policy on admin_users causing login failures
BEGIN;

-- Ensure RLS is enabled (idempotent)
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Drop the recursive policy (if it exists)
DROP POLICY IF EXISTS "Allow admins to view all admin records" ON public.admin_users;

-- Recreate policy using security definer function to avoid recursion
CREATE POLICY "Allow admins to view all admin records"
ON public.admin_users
FOR SELECT
USING (public.is_admin_user());

COMMIT;