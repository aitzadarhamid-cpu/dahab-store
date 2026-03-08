"use client";

import { useEffect, useCallback, useRef } from "react";

export function useExitIntent(onExit: () => void, delay = 3000) {
  const hasFired = useRef(false);

  const handler = useCallback(
    (e: MouseEvent) => {
      if (e.clientY <= 10 && !hasFired.current) {
        hasFired.current = true;
        onExit();
      }
    },
    [onExit]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handler);
    }, delay);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handler);
    };
  }, [handler, delay]);
}
