/*
  # Fix Admin Users RLS Policy
  
  The current policy prevents users from checking if they're an admin
  because it requires them to already be an admin to query the admin_users table.
  
  This migration fixes the circular dependency by allowing authenticated users
  to check if they exist in the admin_users table.
  
  ## Changes
  - Drop the existing restrictive policy
  - Create a new policy that allows authenticated users to view their own admin status
*/

-- Drop the existing policy
DROP POLICY IF EXISTS "Admin users can view admin list" ON admin_users;

-- Create a new policy that allows authenticated users to check if they're an admin
CREATE POLICY "Authenticated users can view own admin status"
  ON admin_users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);
