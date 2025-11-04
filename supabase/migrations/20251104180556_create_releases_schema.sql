/*
  # Music Release Schedule Schema

  1. New Tables
    - `releases`
      - `id` (uuid, primary key)
      - `title` (text) - Song or album title
      - `release_date` (timestamptz) - When the content is released
      - `type` (text) - 'single' or 'album'
      - `spotify_link` (text, nullable) - Link to Spotify
      - `apple_music_link` (text, nullable) - Link to Apple Music
      - `youtube_link` (text, nullable) - Link to YouTube
      - `is_released` (boolean) - Whether the content is available
      - `order_index` (integer) - Display order
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  
  2. Security
    - Enable RLS on `releases` table
    - Add policy for public read access (anyone can view releases)
    
  3. Initial Data
    - Insert 4 singles (every 2 weeks starting Nov 21, 2025)
    - Insert 1 album (1 month after last single with 6 additional songs)
*/

CREATE TABLE IF NOT EXISTS releases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  release_date timestamptz NOT NULL,
  type text NOT NULL CHECK (type IN ('single', 'album')),
  spotify_link text,
  apple_music_link text,
  youtube_link text,
  is_released boolean DEFAULT false,
  order_index integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE releases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view releases"
  ON releases FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can view releases (authenticated)"
  ON releases FOR SELECT
  TO authenticated
  USING (true);

INSERT INTO releases (title, release_date, type, order_index) VALUES
  ('Single #1', '2025-11-21T00:00:00Z', 'single', 1),
  ('Single #2', '2025-12-05T00:00:00Z', 'single', 2),
  ('Single #3', '2025-12-19T00:00:00Z', 'single', 3),
  ('Single #4', '2026-01-02T00:00:00Z', 'single', 4),
  ('Full Album', '2026-02-02T00:00:00Z', 'album', 5)
ON CONFLICT DO NOTHING;