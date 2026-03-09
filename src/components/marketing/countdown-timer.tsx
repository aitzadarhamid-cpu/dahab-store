"use client";

import { useCountdown, getEndOfDay } from "@/hooks/useCountdown";
import { useMemo, useState, useEffect } from "react";

export function CountdownTimer() {
  const endOfDay = useMemo(() => getEndOfDay(), []);
  const { hours, minutes, seconds, expired } = useCountdown(endOfDay);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (expired) return null;

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-brand-black text-brand-gold font-display text-2xl md:text-3xl font-bold w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-lg">
        {mounted ? String(value).padStart(2, "0") : "--"}
      </div>
      <span className="text-xs text-gray-600 mt-1 uppercase tracking-wide">
        {label}
      </span>
    </div>
  );

  return (
    <div className="bg-brand-cream border border-brand-gold/20 rounded-2xl p-6 text-center">
      <p className="text-sm font-medium text-brand-gold uppercase tracking-widest mb-1">
        Offre Flash du Jour
      </p>
      <p className="text-brand-black font-display text-lg mb-4">
        Livraison GRATUITE sur toutes les commandes
      </p>
      <div className="flex items-center justify-center gap-3">
        <TimeBlock value={hours} label="Heures" />
        <span className="text-2xl font-bold text-brand-gold mt-[-20px]">
          :
        </span>
        <TimeBlock value={minutes} label="Min" />
        <span className="text-2xl font-bold text-brand-gold mt-[-20px]">
          :
        </span>
        <TimeBlock value={seconds} label="Sec" />
      </div>
    </div>
  );
}
