import { Music, Calendar, Disc3, Youtube } from 'lucide-react';
import { Release } from '../lib/supabase';
import { useCountdown } from '../hooks/useCountdown';

interface ReleaseCardProps {
  release: Release;
}

export function ReleaseCard({ release }: ReleaseCardProps) {
  const releaseDate = new Date(release.release_date);
  const isReleased = releaseDate.getTime() <= new Date().getTime();
  const hasLinks = release.spotify_link || release.apple_music_link || release.youtube_link;
  const timeLeft = useCountdown(release.release_date);
  const showCountdown = !isReleased && timeLeft && release.title === 'VIDA';

  if (showCountdown) {
    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl ${release.type === 'album' ? 'bg-gradient-to-br from-amber-500 to-orange-600' : 'bg-gradient-to-br from-blue-500 to-cyan-600'}`}>
            {release.type === 'album' ? (
              <Disc3 className="w-6 h-6 text-white" />
            ) : (
              <Music className="w-6 h-6 text-white" />
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold text-white">{release.title}</h3>
            </div>

            <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
              <Calendar className="w-4 h-4" />
              <span>{releaseDate.toLocaleDateString('es-ES', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>

            <div className="flex justify-center">
              <div className="flex gap-2">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-white/10">
                  <div className="text-lg font-bold text-white">{timeLeft.days}</div>
                  <div className="text-gray-400 text-xs uppercase text-center">Días</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-white/10">
                  <div className="text-lg font-bold text-white">{timeLeft.hours}</div>
                  <div className="text-gray-400 text-xs uppercase text-center">Hrs</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-white/10">
                  <div className="text-lg font-bold text-white">{timeLeft.minutes}</div>
                  <div className="text-gray-400 text-xs uppercase text-center">Min</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-white/10">
                  <div className="text-lg font-bold text-white">{timeLeft.seconds}</div>
                  <div className="text-gray-400 text-xs uppercase text-center">Seg</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all">
      <div className="flex items-center gap-4">
        {release.title === 'OHM' ? (
          <img
            src="./PortadaOHMsinnombre.jpeg"
            alt="OHM"
            className="w-12 h-12 rounded-xl object-cover"
          />
        ) : (
          <div className={`p-3 rounded-xl ${release.type === 'album' ? 'bg-gradient-to-br from-amber-500 to-orange-600' : 'bg-gradient-to-br from-blue-500 to-cyan-600'}`}>
            {release.type === 'album' ? (
              <Disc3 className="w-6 h-6 text-white" />
            ) : (
              <Music className="w-6 h-6 text-white" />
            )}
          </div>
        )}

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-bold text-white">{release.title}</h3>
            {isReleased && (
              <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-full">
                DISPONIBLE
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
            <Calendar className="w-4 h-4" />
            <span>{releaseDate.toLocaleDateString('es-ES', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>

          {hasLinks && (
            <div className="flex justify-center">
              <div className="flex flex-wrap gap-2">
                {release.spotify_link && (
                  <a
                    href={release.spotify_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    <Music className="w-4 h-4" />
                    Spotify
                  </a>
                )}
                {release.apple_music_link && (
                  <a
                    href={release.apple_music_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    <Music className="w-4 h-4" />
                    Apple Music
                  </a>
                )}
                {release.youtube_link && (
                  <a
                    href={release.youtube_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    <Youtube className="w-4 h-4" />
                    YouTube
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
