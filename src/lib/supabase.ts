import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Release {
  id: string;
  title: string;
  release_date: string;
  type: 'single' | 'album';
  spotify_link: string | null;
  apple_music_link: string | null;
  youtube_link: string | null;
  presave_link: string | null;
  is_released: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}
