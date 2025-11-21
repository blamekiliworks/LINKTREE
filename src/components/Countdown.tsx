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
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 uppercase tracking-wider">{title}</h2>

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
