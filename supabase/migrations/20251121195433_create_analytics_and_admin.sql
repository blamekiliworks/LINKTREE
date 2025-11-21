/*
  # Analytics and Admin System

  1. New Tables
    - `link_analytics`
      - `id` (uuid, primary key)
      - `release_id` (uuid, foreign key to releases)
      - `link_type` (text) - 'spotify', 'apple_music', or 'youtube'
      - `click_count` (integer) - number of clicks
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `admin_users`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `link_analytics` table
    - Enable RLS on `admin_users` table
    - Add policies for admin access only
    - Add policy for public to increment click counts via function
    
  3. Functions
    - `increment_link_click` - safely increment click counter
*/

-- Create link_analytics table
CREATE TABLE IF NOT EXISTS link_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  release_id uuid REFERENCES releases(id) ON DELETE CASCADE,
  link_type text NOT NULL CHECK (link_type IN ('spotify', 'apple_music', 'youtube')),
  click_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(release_id, link_type)
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE link_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policies for link_analytics
CREATE POLICY "Admin users can view analytics"
  ON link_analytics FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Admin users can update analytics"
  ON link_analytics FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Policies for admin_users
CREATE POLICY "Admin users can view admin list"
  ON admin_users FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Function to increment click count (callable by anyone)
CREATE OR REPLACE FUNCTION increment_link_click(
  p_release_id uuid,
  p_link_type text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO link_analytics (release_id, link_type, click_count, updated_at)
  VALUES (p_release_id, p_link_type, 1, now())
  ON CONFLICT (release_id, link_type)
  DO UPDATE SET 
    click_count = link_analytics.click_count + 1,
    updated_at = now();
END;
$$;

-- Initialize analytics for OHM release
INSERT INTO link_analytics (release_id, link_type, click_count)
SELECT id, 'spotify', 0
FROM releases
WHERE title = 'OHM'
ON CONFLICT (release_id, link_type) DO NOTHING;

INSERT INTO link_analytics (release_id, link_type, click_count)
SELECT id, 'youtube', 0
FROM releases
WHERE title = 'OHM'
ON CONFLICT (release_id, link_type) DO NOTHING;