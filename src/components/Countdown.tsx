import { useCountdown } from '../hooks/useCountdown';

interface CountdownProps {
  targetDate: string;
  title: string;
}

export function Countdown({ targetDate, title }: CountdownProps) {
  const timeLeft = useCountdown(targetDate);

  if (!timeLeft) {
    return (
      <div className="text-center">
        <div className="text-emerald-400 text-lg font-medium mb-2">OUT NOW</div>
        <h2 className="text-3xl font-bold text-white">{title}</h2>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="text-gray-400 text-sm uppercase tracking-wider mb-4">Next Release</div>
      <h2 className="text-3xl font-bold text-white mb-8">{title}</h2>

      <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <div className="text-4xl font-bold text-white mb-1">{timeLeft.days}</div>
          <div className="text-gray-400 text-xs uppercase tracking-wider">Days</div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <div className="text-4xl font-bold text-white mb-1">{timeLeft.hours}</div>
          <div className="text-gray-400 text-xs uppercase tracking-wider">Hours</div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <div className="text-4xl font-bold text-white mb-1">{timeLeft.minutes}</div>
          <div className="text-gray-400 text-xs uppercase tracking-wider">Min</div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <div className="text-4xl font-bold text-white mb-1">{timeLeft.seconds}</div>
          <div className="text-gray-400 text-xs uppercase tracking-wider">Sec</div>
        </div>
      </div>
    </div>
  );
}
