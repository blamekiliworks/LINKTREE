import { useEffect, useState } from 'react';
import { supabase, Release } from './lib/supabase';
import { Countdown } from './components/Countdown';
import { ReleaseCard } from './components/ReleaseCard';
import { Zap } from 'lucide-react';

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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-cyan-400 text-xl font-mono font-bold">
          <span className="animate-pulse">[LOADING...]</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url(/extasis.shot.1-6(2).jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      ></div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/90 to-black"></div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-20">
          <div className="mb-6 inline-block">
            <div className="border-2 border-cyan-400 p-4 rounded-lg bg-black/50 backdrop-blur">
              <Zap className="w-8 h-8 text-cyan-400 mx-auto" />
            </div>
          </div>
          <h1 className="text-6xl md:text-7xl font-black text-white mb-4 tracking-wider uppercase">
            <span className="text-cyan-400">[</span>MUSIC<span className="text-cyan-400">]</span>
          </h1>
          <p className="text-cyan-300 text-sm uppercase tracking-[0.2em] font-mono font-bold">
            &gt; RELEASE PROTOCOL INITIATED
          </p>
        </div>

        {nextRelease && (
          <div className="mb-20 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-pink-500/20 to-cyan-500/20 rounded-xl blur-lg"></div>
            <div className="relative bg-black/50 backdrop-blur-md rounded-xl p-10 md:p-14 border-2 border-cyan-500/50">
              <Countdown
                targetDate={nextRelease.release_date}
                title={nextRelease.title}
              />
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-transparent"></div>
            <h2 className="text-2xl font-black text-white uppercase tracking-wider">
              <span className="text-cyan-400">&gt;</span> Release Schedule
            </h2>
          </div>
          {releases.map((release) => (
            <ReleaseCard key={release.id} release={release} />
          ))}
        </div>

        <div className="mt-20 text-center border-t border-cyan-500/30 pt-8">
          <p className="text-cyan-300/70 text-xs uppercase tracking-widest font-mono font-bold">
            4 SINGLES EVERY 2 WEEKS → 1 MONTH PAUSE → FULL ALBUM + 6 TRACKS
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
