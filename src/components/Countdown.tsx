import { useCountdown } from '../hooks/useCountdown';
import { Music } from 'lucide-react';

interface CountdownProps {
  targetDate: string;
  title: string;
  presaveLink?: string | null;
}

export function Countdown({ targetDate, title, presaveLink }: CountdownProps) {
  const timeLeft = useCountdown(targetDate);

  if (!timeLeft) {
    return (
      <div className="text-center">
        <div className="text-emerald-400 text-lg font-medium mb-2">DISPONIBLE</div>
        <h2 className="text-3xl font-bold text-white">{title}</h2>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div className="hidden md:block flex-1"></div>
        <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
        <div className="flex-1 flex justify-center md:justify-end">
          {presaveLink && (
            <a
              href={presaveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/15 border border-white/20 text-gray-300 hover:text-white rounded-md text-xs font-medium transition-all"
            >
              <Music className="w-3.5 h-3.5" />
              Presave
            </a>
          )}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/10">
          <div className="text-3xl sm:text-4xl font-bold text-white mb-1">{timeLeft.days}</div>
          <div className="text-gray-400 text-xs uppercase tracking-wider">Días</div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/10">
          <div className="text-3xl sm:text-4xl font-bold text-white mb-1">{timeLeft.hours}</div>
          <div className="text-gray-400 text-xs uppercase tracking-wider">Horas</div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/10">
          <div className="text-3xl sm:text-4xl font-bold text-white mb-1">{timeLeft.minutes}</div>
          <div className="text-gray-400 text-xs uppercase tracking-wider">Min</div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/10">
          <div className="text-3xl sm:text-4xl font-bold text-white mb-1">{timeLeft.seconds}</div>
          <div className="text-gray-400 text-xs uppercase tracking-wider">Seg</div>
        </div>
      </div>
    </div>
  );
}
