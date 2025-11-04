import { useEffect, useState } from 'react';
import { supabase, Release } from './lib/supabase';
import { Countdown } from './components/Countdown';
import { ReleaseCard } from './components/ReleaseCard';
import { Music2 } from 'lucide-react';

function App() {
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextRelease, setNextRelease] = useState<Release | null>(null);

  useEffect(() => {
    async function fetchReleases() {
      const { data, error } = await supabase
        .from('releases')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) {
        console.error('Error fetching releases:', error);
      } else if (data) {
        setReleases(data);

        const now = new Date().getTime();
        const upcoming = data.find(
          (release) => new Date(release.release_date).getTime() > now
        );
        setNextRelease(upcoming || null);
      }
      setLoading(false);
    }

    fetchReleases();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bS0yIDRoMnYtMmgtMnYyem0wIDRoMnYtMmgtMnYyem0wIDRoMnYtMmgtMnYyem0wIDRoMnYtMmgtMnYyem0wIDRoMnYtMmgtMnYyem0wIDRoMnYtMmgtMnYyem0wIDRoMnYtMmgtMnYyem0wIDRoMnYtMmgtMnYyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>

      <div className="relative z-10 container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full mb-6 shadow-lg shadow-blue-500/50">
            <Music2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Music Releases
          </h1>
          <p className="text-gray-400 text-lg">
            Follow the journey as new music drops
          </p>
        </div>

        {nextRelease && (
          <div className="mb-16 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
            <Countdown
              targetDate={nextRelease.release_date}
              title={nextRelease.title}
            />
          </div>
        )}

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full"></div>
            Release Schedule
          </h2>
          {releases.map((release) => (
            <ReleaseCard key={release.id} release={release} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm">
            4 singles releasing every 2 weeks, followed by a full album with 6 additional tracks
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
