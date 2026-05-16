'use client';

import { useState, useEffect } from 'react';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(23, 59, 59, 999);
      const diff = midnight.getTime() - now.getTime();
      return {
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      };
    };
    setTimeLeft(calc());
    const id = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, '0');

  const blocks = [
    { label: 'Heures', value: timeLeft.hours },
    { label: 'Min', value: timeLeft.minutes },
    { label: 'Sec', value: timeLeft.seconds },
  ];

  return (
    <div className="flex items-center gap-2 justify-center">
      {blocks.map(({ label, value }, i) => (
        <div key={label} className="flex items-center gap-2">
          {i > 0 && <span className="text-cyan-400 text-2xl font-bold leading-none mb-4">:</span>}
          <div className="flex flex-col items-center">
            <div className="bg-[#0a0f1e] border-2 border-cyan-500/50 rounded-xl px-4 py-3 min-w-[68px] text-center shadow-[0_0_20px_rgba(0,212,255,0.15)]">
              <span className="text-3xl font-bold text-white tabular-nums">{pad(value)}</span>
            </div>
            <span className="text-xs text-gray-400 mt-1 uppercase tracking-wider">{label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
