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

export interface LinkAnalytics {
  id: string;
  release_id: string;
  link_type: 'spotify' | 'apple_music' | 'youtube';
  click_count: number;
  created_at: string;
  updated_at: string;
}

export async function trackLinkClick(releaseId: string, linkType: 'spotify' | 'apple_music' | 'youtube') {
  try {
    await supabase.rpc('increment_link_click', {
      p_release_id: releaseId,
      p_link_type: linkType
    });
  } catch (error) {
    console.error('Error tracking click:', error);
  }
}

export async function trackPageView() {
  try {
    const userAgent = navigator.userAgent;
    const referrer = document.referrer || null;

    await supabase.rpc('record_page_view', {
      p_user_agent: userAgent,
      p_referrer: referrer
    });
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
}

export async function isAdmin(): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { data } = await supabase
    .from('admin_users')
    .select('id')
    .eq('id', user.id)
    .maybeSingle();

  return !!data;
}
