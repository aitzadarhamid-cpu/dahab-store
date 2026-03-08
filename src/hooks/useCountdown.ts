"use client";

import { useState, useEffect } from "react";

interface CountdownResult {
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
}

export function useCountdown(targetDate: Date): CountdownResult {
  const [timeLeft, setTimeLeft] = useState(() =>
    Math.max(0, targetDate.getTime() - Date.now())
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = Math.max(0, targetDate.getTime() - Date.now());
      setTimeLeft(remaining);
      if (remaining <= 0) clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const expired = timeLeft <= 0;
  return {
    hours: Math.floor((timeLeft / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((timeLeft / (1000 * 60)) % 60),
    seconds: Math.floor((timeLeft / 1000) % 60),
    expired,
  };
}

export function getEndOfDay(): Date {
  const now = new Date();
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);
  return end;
}
