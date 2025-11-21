import { useEffect, useState } from 'react';
import { BarChart3, LogOut, Music, Youtube } from 'lucide-react';
import { supabase, LinkAnalytics, Release } from '../lib/supabase';

interface AnalyticsWithRelease extends LinkAnalytics {
  release?: Release;
}

export function AdminDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsWithRelease[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkAuth();
    loadAnalytics();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const loadAnalytics = async () => {
    try {
      const { data: analyticsData } = await supabase
        .from('link_analytics')
        .select(`
          *,
          release:releases(*)
        `)
        .order('click_count', { ascending: false });

      if (analyticsData) {
        setAnalytics(analyticsData as any);
      }
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-emerald-400" />
            <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm">{user?.email}</span>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>

        <div className="grid gap-6">
          {analytics.map((item) => {
            const release = item.release as unknown as Release;
            return (
              <div
                key={item.id}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              >
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${
                      item.link_type === 'spotify'
                        ? 'bg-emerald-500/20'
                        : item.link_type === 'youtube'
                        ? 'bg-red-500/20'
                        : 'bg-pink-500/20'
                    }`}>
                      {item.link_type === 'spotify' && <Music className="w-6 h-6 text-emerald-400" />}
                      {item.link_type === 'youtube' && <Youtube className="w-6 h-6 text-red-400" />}
                      {item.link_type === 'apple_music' && <Music className="w-6 h-6 text-pink-400" />}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{release?.title}</h3>
                      <p className="text-gray-400 text-sm capitalize">{item.link_type.replace('_', ' ')}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-white">{item.click_count}</div>
                    <div className="text-gray-400 text-sm">Total Clicks</div>
                  </div>
                </div>
              </div>
            );
          })}

          {analytics.length === 0 && (
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-12 border border-white/10 text-center">
              <BarChart3 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No analytics data yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
