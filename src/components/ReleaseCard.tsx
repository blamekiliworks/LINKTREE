import { Music, Calendar, Disc3 } from 'lucide-react';
import { Release } from '../lib/supabase';

interface ReleaseCardProps {
  release: Release;
}

export function ReleaseCard({ release }: ReleaseCardProps) {
  const releaseDate = new Date(release.release_date);
  const isReleased = releaseDate.getTime() <= new Date().getTime();
  const hasLinks = release.spotify_link || release.apple_music_link || release.youtube_link;
  const hasPresave = !isReleased && release.presave_link;

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all">
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-xl ${release.type === 'album' ? 'bg-gradient-to-br from-amber-500 to-orange-600' : 'bg-gradient-to-br from-blue-500 to-cyan-600'}`}>
          {release.type === 'album' ? (
            <Disc3 className="w-6 h-6 text-white" />
          ) : (
            <Music className="w-6 h-6 text-white" />
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-white">{release.title}</h3>
              {isReleased && (
                <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-full">
                  DISPONIBLE
                </span>
              )}
            </div>
            {hasPresave && (
              <a
                href={release.presave_link!}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/10 hover:bg-white/15 border border-white/20 text-gray-300 hover:text-white rounded-md text-xs font-medium transition-all"
              >
                <Music className="w-3 h-3" />
                Presave
              </a>
            )}
          </div>

          <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
            <Calendar className="w-4 h-4" />
            <span>{releaseDate.toLocaleDateString('es-ES', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>

          {isReleased && hasLinks && (
            <div className="flex flex-wrap gap-2">
              {release.spotify_link && (
                <a
                  href={release.spotify_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Spotify
                </a>
              )}
              {release.apple_music_link && (
                <a
                  href={release.apple_music_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Apple Music
                </a>
              )}
              {release.youtube_link && (
                <a
                  href={release.youtube_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  YouTube
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
