'use client';

import { useEffect, type ReactNode } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let lenis: Lenis | null = null;
    let frame = 0;

    const stop = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      lenis?.destroy();
      lenis = null;
    };

    const syncMode = () => {
      const calmMode = root.dataset.sensoryMode === 'calm';
      if (calmMode || reducedMotion.matches) {
        stop();
        return;
      }
      if (lenis) return;

      lenis = new Lenis({
        duration: 1.1,
        easing: (progress) => 1 - Math.pow(1 - progress, 4),
        smoothWheel: true,
      });

      const animate = (time: number) => {
        lenis?.raf(time);
        if (lenis) frame = window.requestAnimationFrame(animate);
      };
      frame = window.requestAnimationFrame(animate);
    };

    const observer = new MutationObserver(syncMode);
    observer.observe(root, { attributes: true, attributeFilter: ['data-sensory-mode'] });
    reducedMotion.addEventListener('change', syncMode);
    syncMode();

    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener('change', syncMode);
      stop();
    };
  }, []);

  return <>{children}</>;
}
