'use client';

import dynamic from 'next/dynamic';
import { useSyncExternalStore } from 'react';

const MuseumSceneCanvas = dynamic(() => import('./MuseumSceneCanvas'), {
  ssr: false,
  loading: () => <div className="sticky top-0 h-screen w-full bg-[#F7F3EB]" aria-hidden="true" />,
});

const rooms = [
  { title: 'Auditive', description: 'Écouter, distinguer et explorer les sons.' },
  { title: 'Visuelle', description: 'Observer les formes, les couleurs et les repères.' },
  { title: 'Tactile', description: 'Découvrir les matières et les sensations du toucher.' },
  { title: 'Vestibulaire', description: 'Explorer l’équilibre et les déplacements dans l’espace.' },
  { title: 'Proprioceptive', description: 'Sentir la position et les mouvements du corps.' },
];

function subscribeToAccessibility(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-sensory-mode'],
  });
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  motionPreference.addEventListener('change', callback);
  return () => {
    observer.disconnect();
    motionPreference.removeEventListener('change', callback);
  };
}

function getAccessibleStaticMode() {
  return document.documentElement.dataset.sensoryMode === 'calm' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function SensoryMuseum() {
  // Render the static version on the server and during hydration. Once mounted,
  // standard-motion users transition to the client-only canvas.
  const useStaticExperience = useSyncExternalStore(
    subscribeToAccessibility,
    getAccessibleStaticMode,
    () => true,
  );

  if (useStaticExperience) {
    return (
      <section className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-20 sm:px-10">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#C4623B]">
          Corps · Espace · Mouvement
        </p>
        <h1 className="mb-10 font-serif text-4xl text-[#0E5A5F] sm:text-5xl">
          Musée sensoriel
        </h1>
        <ol className="divide-y divide-[#14272A]/15 border-y border-[#14272A]/15">
          {rooms.map((room, index) => (
            <li key={room.title} className="grid gap-2 py-5 sm:grid-cols-[4rem_12rem_1fr] sm:items-baseline">
              <span className="text-xs font-semibold tracking-wider text-[#C4623B]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h2 className="font-serif text-2xl text-[#0E5A5F]">{room.title}</h2>
              <p className="max-w-xl text-sm leading-relaxed text-[#14272A]/75">{room.description}</p>
            </li>
          ))}
        </ol>
      </section>
    );
  }

  return (
    <>
      <MuseumSceneCanvas />
      <ol className="sr-only" aria-label="Salles du musée sensoriel">
        {rooms.map((room) => <li key={room.title}>{room.title}: {room.description}</li>)}
      </ol>
    </>
  );
}
