/*
  # Add Page Views Tracking
  
  This migration adds functionality to track website visitors.
  
  1. New Tables
    - `page_views`
      - `id` (uuid, primary key)
      - `created_at` (timestamptz) - timestamp of the visit
      - `user_agent` (text) - optional browser/device info
      - `referrer` (text) - optional referrer URL
  
  2. Security
    - Enable RLS on `page_views` table
    - Add policy for admin users to view page views
    
  3. Functions
    - `record_page_view` - securely record a page view
    - `get_total_page_views` - get total count of page views
*/

-- Create page_views table
CREATE TABLE IF NOT EXISTS page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  user_agent text,
  referrer text
);

-- Enable RLS
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Policy for admin users to view page views
CREATE POLICY "Admin users can view page views"
  ON page_views FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Function to record a page view (callable by anyone)
CREATE OR REPLACE FUNCTION record_page_view(
  p_user_agent text DEFAULT NULL,
  p_referrer text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO page_views (user_agent, referrer)
  VALUES (p_user_agent, p_referrer);
END;
$$;

-- Function to get total page views (for admin dashboard)
CREATE OR REPLACE FUNCTION get_total_page_views()
RETURNS bigint
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT COUNT(*) FROM page_views;
$$;
