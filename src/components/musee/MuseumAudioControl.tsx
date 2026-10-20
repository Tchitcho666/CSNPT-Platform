'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useMuseumAudio } from './useMuseumAudio';

function subscribeToSensoryMode(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-sensory-mode'],
  });
  return () => observer.disconnect();
}

function isCalmMode() {
  return document.documentElement.dataset.sensoryMode === 'calm';
}

export default function MuseumAudioControl() {
  const calmMode = useSyncExternalStore(subscribeToSensoryMode, isCalmMode, () => true);
  const { startAudio, stopAudio, updateMovement, isPlaying } = useMuseumAudio();

  useEffect(() => {
    if (calmMode && isPlaying) void stopAudio();
  }, [calmMode, isPlaying, stopAudio]);

  useEffect(() => {
    if (calmMode) return;

    let pointerX = 0;
    let pointerY = 0;
    let frame = 0;
    const update = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = window.scrollY / maxScroll;
      updateMovement(pointerX, pointerY, progress);
      frame = 0;
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const onPointerMove = (event: PointerEvent) => {
      pointerX = (event.clientX / Math.max(1, window.innerWidth)) * 2 - 1;
      pointerY = (event.clientY / Math.max(1, window.innerHeight)) * 2 - 1;
      scheduleUpdate();
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    scheduleUpdate();
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [calmMode, updateMovement]);

  return (
    <div>
      {calmMode ? (
        <span className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#14272A]/20 bg-[#F7F3EB] px-4 text-sm text-[#14272A]/70" role="status">
          <VolumeX aria-hidden="true" size={17} />
          Audio désactivé en Mode Calme
        </span>
      ) : (
        <button
          type="button"
          onClick={() => void (isPlaying ? stopAudio() : startAudio())}
          aria-pressed={isPlaying}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#0E5A5F]/30 bg-[#F7F3EB] px-4 text-sm font-medium text-[#0E5A5F] shadow-sm transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E5A5F]"
        >
          {isPlaying ? <VolumeX aria-hidden="true" size={17} /> : <Volume2 aria-hidden="true" size={17} />}
          {isPlaying ? 'Désactiver le son' : 'Activer le son'}
        </button>
      )}
    </div>
  );
}
