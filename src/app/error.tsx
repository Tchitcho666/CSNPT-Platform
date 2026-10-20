'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f4ed] px-6 text-[#102824]">
      <section className="w-full max-w-xl rounded-3xl border border-[#ded9cf] bg-[#f0ede5] p-8 text-center shadow-sm md:p-12">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#287d78]">CSNPT</p>
        <h1 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">Une erreur est survenue</h1>
        <p className="mt-5 text-base leading-7 text-[#68716e]">Veuillez réessayer ou contacter l'administrateur</p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-8 rounded-2xl bg-[#164c5d] px-7 py-4 text-sm font-bold text-white transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#287d78]"
        >
          Réessayer
        </button>
      </section>
    </main>
  );
}
