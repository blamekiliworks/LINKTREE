import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase, Release, trackPageView, trackLinkClick } from '../lib/supabase';
import { Music, Youtube, Calendar, ArrowLeft, Disc3 } from 'lucide-react';
import { useCountdown } from '../hooks/useCountdown';

export function ReleasePage() {
  const { slug } = useParams<{ slug: string }>();
  const [release, setRelease] = useState<Release | null>(null);
  const [loading, setLoading] = useState(true);
  const timeLeft = useCountdown(release?.release_date || '');

  useEffect(() => {
    trackPageView();

    async function fetchRelease() {
      const { data, error } = await supabase
        .from('releases')
        .select('*')
        .ilike('title', slug || '')
        .single();

      if (error) {
        console.error('Error fetching release:', error);
      } else if (data) {
        setRelease(data);
      }
      setLoading(false);
    }

    fetchRelease();
  }, [slug]);

  const handleLinkClick = (linkType: 'spotify' | 'apple_music' | 'youtube') => {
    if (release) {
      trackLinkClick(release.id, linkType);
    }
  };

  const getImage = () => {
    switch (release?.title) {
      case 'OHM':
        return './PortadaOHMsinnombre.jpeg';
      case 'VIDA':
        return './vida_portada_spoty(1).jpg';
      case 'EXTASIS':
        return './extasis_portada_spoty(1).png';
      case 'LATELY':
        return './latelly_portada_spoty.png';
      default:
        return './extasis.shot.1-6(2).jpg';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-cyan-400 text-xl font-mono font-bold">
          <span className="animate-pulse">[LOADING...]</span>
        </div>
      </div>
    );
  }

  if (!release) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-cyan-400 text-xl font-mono font-bold mb-4">
            [RELEASE NOT FOUND]
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const releaseDate = new Date(release.release_date);
  const isReleased = release.is_released;
  const hasLinks = release.spotify_link || release.apple_music_link || release.youtube_link;
  const showCountdown = !isReleased && timeLeft;

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <div className="relative bg-black overflow-x-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-black/50 border-2 border-cyan-500/50 rounded-lg hover:border-cyan-400 hover:bg-cyan-500/10 transition-all duration-300 mb-8"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-300 font-mono font-bold text-sm uppercase tracking-wider">Back</span>
          </Link>

          <div className="bg-gradient-to-br from-black via-gray-900 to-black border border-cyan-500/30 rounded-3xl overflow-hidden">
            <div className="relative h-64 md:h-96 overflow-hidden">
              <img
                src={getImage()}
                alt={release.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black"></div>
            </div>

            <div className="p-8 md:p-12">
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-4 rounded-2xl ${release.type === 'album' ? 'bg-gradient-to-br from-amber-500 to-orange-600' : 'bg-gradient-to-br from-blue-500 to-cyan-600'}`}>
                  {release.type === 'album' ? (
                    <Disc3 className="w-8 h-8 text-white" />
                  ) : (
                    <Music className="w-8 h-8 text-white" />
                  )}
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-wider">
                    <span className="text-cyan-400">[</span>{release.title}<span className="text-cyan-400">]</span>
                  </h1>
                  <p className="text-gray-400 text-sm uppercase tracking-wider mt-2">
                    {release.type === 'album' ? 'Album' : 'Single'}
                  </p>
                </div>
              </div>

              {isReleased && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-400 text-emerald-400 text-sm font-bold rounded-full mb-6 uppercase">
                  DISPONIBLE AHORA
                </div>
              )}

              {!isReleased && (
                <div className="flex items-center gap-2 text-cyan-300 text-lg mb-6">
                  <Calendar className="w-5 h-5" />
                  <span className="font-mono font-bold">
                    {releaseDate.toLocaleDateString('es-ES', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
              )}

              {showCountdown && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-cyan-400 mb-4 uppercase tracking-wider">Cuenta Regresiva</h2>
                  <div className="flex gap-4 flex-wrap">
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl px-6 py-4 border border-cyan-500/30">
                      <div className="text-3xl md:text-4xl font-bold text-white">{timeLeft.days}</div>
                      <div className="text-gray-400 text-sm uppercase text-center mt-1">Días</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl px-6 py-4 border border-cyan-500/30">
                      <div className="text-3xl md:text-4xl font-bold text-white">{timeLeft.hours}</div>
                      <div className="text-gray-400 text-sm uppercase text-center mt-1">Horas</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl px-6 py-4 border border-cyan-500/30">
                      <div className="text-3xl md:text-4xl font-bold text-white">{timeLeft.minutes}</div>
                      <div className="text-gray-400 text-sm uppercase text-center mt-1">Minutos</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl px-6 py-4 border border-cyan-500/30">
                      <div className="text-3xl md:text-4xl font-bold text-white">{timeLeft.seconds}</div>
                      <div className="text-gray-400 text-sm uppercase text-center mt-1">Segundos</div>
                    </div>
                  </div>
                </div>
              )}

              {hasLinks && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-cyan-400 mb-4 uppercase tracking-wider">
                    {isReleased ? 'Escúchalo Ahora' : 'Pre-Save'}
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {release.spotify_link && (
                      <a
                        href={release.spotify_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleLinkClick('spotify')}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-base font-bold transition-colors"
                      >
                        <img src="./adobe_express_-_file(1).png" alt="Spotify" className="w-12 h-12 -my-4 -ml-2" />
                        Spotify
                      </a>
                    )}
                    {release.apple_music_link && (
                      <a
                        href={release.apple_music_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleLinkClick('apple_music')}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-lg text-base font-bold transition-colors"
                      >
                        <Music className="w-5 h-5" />
                        Apple Music
                      </a>
                    )}
                    {release.youtube_link && (
                      <a
                        href={release.youtube_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleLinkClick('youtube')}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg text-base font-bold transition-colors"
                      >
                        <Youtube className="w-5 h-5" />
                        YouTube
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-12 border-t border-cyan-500/30 pt-8">
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-6">
              <a
                href="https://open.spotify.com/artist/2sxBFdC1obLZ8oEQE0ITkf?si=aLcfD_tPQf2V31kL2Vnu_g"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 sm:px-6 py-3 bg-black/50 border-2 border-cyan-500/50 rounded-lg hover:border-cyan-400 hover:bg-cyan-500/10 transition-all duration-300"
              >
                <Music className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="text-cyan-300 font-mono font-bold text-xs sm:text-sm uppercase tracking-wider">Spotify</span>
              </a>

              <a
                href="https://www.youtube.com/@blamekili2150"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 sm:px-6 py-3 bg-black/50 border-2 border-cyan-500/50 rounded-lg hover:border-cyan-400 hover:bg-cyan-500/10 transition-all duration-300"
              >
                <Youtube className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="text-cyan-300 font-mono font-bold text-xs sm:text-sm uppercase tracking-wider">YouTube</span>
              </a>

              <a
                href="https://www.instagram.com/blamekili/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 sm:px-6 py-3 bg-black/50 border-2 border-cyan-500/50 rounded-lg hover:border-cyan-400 hover:bg-cyan-500/10 transition-all duration-300"
              >
                <svg className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span className="text-cyan-300 font-mono font-bold text-xs sm:text-sm uppercase tracking-wider">Instagram</span>
              </a>

              <a
                href="https://www.tiktok.com/@blamekili"
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
