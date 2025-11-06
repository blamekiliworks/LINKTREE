import { useEffect, useState } from 'react';
import { supabase, Release } from './lib/supabase';
import { Countdown } from './components/Countdown';
import { ReleaseCard } from './components/ReleaseCard';
import { Music, Youtube, Instagram } from 'lucide-react';

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
    <div className="min-h-screen bg-black overflow-x-hidden">
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img
          src="./extasis.shot.1-6(2).jpg"
          alt="Header"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black"></div>
      </div>

      <div className="relative bg-black overflow-x-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-16 max-w-4xl">
          <div className="text-center mb-20">
            <h1 className="text-6xl md:text-7xl font-black text-white mb-4 tracking-wider uppercase">
              <span className="text-cyan-400">[</span>GÉNESIS<span className="text-cyan-400">]</span>
            </h1>
            <p className="text-cyan-300 text-sm uppercase tracking-[0.2em] font-mono font-bold">
              &gt; SE VIENEN COSITAS...
            </p>
          </div>

        {nextRelease && (
          <div className="mb-20 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-pink-500/20 to-cyan-500/20 rounded-xl blur-lg"></div>
            <div className="relative bg-black/50 backdrop-blur-md rounded-xl p-10 md:p-14 border-2 border-cyan-500/50">
              <Countdown
                targetDate={nextRelease.release_date}
                title={nextRelease.title}
                presaveLink={nextRelease.presave_link}
              />
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-transparent"></div>
            <h2 className="text-2xl font-black text-white uppercase tracking-wider">
              <span className="text-cyan-400">&gt;</span> Lanzamientos
            </h2>
          </div>
          {releases.map((release) => (
            <ReleaseCard key={release.id} release={release} />
          ))}
        </div>

          <div className="mt-20 border-t border-cyan-500/30 pt-12">
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-6">
              <a
                href="https://open.spotify.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 sm:px-6 py-3 bg-black/50 border-2 border-cyan-500/50 rounded-lg hover:border-cyan-400 hover:bg-cyan-500/10 transition-all duration-300"
              >
                <Music className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="text-cyan-300 font-mono font-bold text-xs sm:text-sm uppercase tracking-wider">Spotify</span>
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 sm:px-6 py-3 bg-black/50 border-2 border-cyan-500/50 rounded-lg hover:border-cyan-400 hover:bg-cyan-500/10 transition-all duration-300"
              >
                <Youtube className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="text-cyan-300 font-mono font-bold text-xs sm:text-sm uppercase tracking-wider">YouTube</span>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 sm:px-6 py-3 bg-black/50 border-2 border-cyan-500/50 rounded-lg hover:border-cyan-400 hover:bg-cyan-500/10 transition-all duration-300"
              >
                <Instagram className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="text-cyan-300 font-mono font-bold text-xs sm:text-sm uppercase tracking-wider">Instagram</span>
              </a>

              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 sm:px-6 py-3 bg-black/50 border-2 border-cyan-500/50 rounded-lg hover:border-cyan-400 hover:bg-cyan-500/10 transition-all duration-300"
              >
                <svg className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
                <span className="text-cyan-300 font-mono font-bold text-xs sm:text-sm uppercase tracking-wider">TikTok</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
