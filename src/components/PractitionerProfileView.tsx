'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useDocumentLanguage from '@/lib/useDocumentLanguage';
import type { PublicPractitioner } from '@/lib/types';

const copy = {
  fr: { eyebrow: 'CSNPT · ANNUAIRE', back: 'Retour à l’annuaire', missing: 'Profil introuvable', missingText: 'Ce profil n’est pas disponible dans l’annuaire actuel.', role: 'Profession', location: 'Ville', explore: 'Explorer les professionnels', directory: 'Retour à l’annuaire' },
  ar: { eyebrow: 'CSNPT · الدليل', back: 'العودة إلى الدليل', missing: 'الملف غير موجود', missingText: 'هذا الملف غير متاح في الدليل الحالي.', role: 'الاختصاص', location: 'المدينة', explore: 'استكشاف المهنيين', directory: 'العودة إلى الدليل' },
  en: { eyebrow: 'CSNPT · DIRECTORY', back: 'Back to the directory', missing: 'Profile not found', missingText: 'This profile is not available in the current directory.', role: 'Profession', location: 'City', explore: 'Explore professionals', directory: 'Back to directory' },
} as const;

export default function PractitionerProfileView({ profile }: { profile: PublicPractitioner | null }) {
  const language = useDocumentLanguage();
  const t = copy[language];
  const isRtl = language === 'ar';

  return (
    <>
      <Navbar currentLang={language} />
      <main dir={isRtl ? 'rtl' : 'ltr'} className="min-h-[70vh] bg-[var(--paper)] text-[var(--ink)]">
        {!profile ? (
          <section className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-24">
            <p className="text-xs font-bold uppercase tracking-[.16em] text-[var(--teal)]">{t.eyebrow}</p>
            <h1 className="mt-5 text-5xl md:text-7xl">{t.missing}</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--muted)]">{t.missingText}</p>
            <Link className="mt-8 inline-flex min-h-11 items-center border-b border-[var(--teal)] font-semibold text-[var(--teal)]" href="/trouver">{t.back}</Link>
          </section>
        ) : (
          <>
            <section className="border-b border-[var(--line)]">
              <div className="mx-auto max-w-5xl px-6 py-12 md:px-10 md:py-20">
                <Link href="/trouver" className="inline-flex min-h-11 items-center border-b border-[var(--line)] text-sm font-semibold text-[var(--teal)]">{t.back}</Link>
                <p className="mt-10 text-xs font-bold uppercase tracking-[.16em] text-[var(--teal)]">{t.eyebrow}</p>
                <h1 className="mt-5 max-w-4xl text-5xl leading-[1.05] md:text-7xl"><bdi>{profile.name}</bdi></h1>
                <p className="mt-5 text-lg font-semibold text-[var(--muted)]">{profile.roleOrSpecialty[language]}</p>
              </div>
            </section>
            <section className="mx-auto grid max-w-5xl gap-8 px-6 py-12 md:grid-cols-2 md:px-10 md:py-16">
              <div className="border-t border-[var(--teal)] pt-4">
                <p className="text-xs font-bold uppercase tracking-[.13em] text-[var(--muted)]">{t.role}</p>
                <p className="mt-3 text-xl">{profile.roleOrSpecialty[language]}</p>
              </div>
              <div className="border-t border-[var(--teal)] pt-4">
                <p className="text-xs font-bold uppercase tracking-[.13em] text-[var(--muted)]">{t.location}</p>
                <p className="mt-3 text-xl">{profile.city[language]}</p>
              </div>
            </section>
            <section className="bg-[var(--teal)] text-white">
              <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10">
                <h2 className="text-2xl md:text-3xl">{t.explore}</h2>
                <Link href="/trouver" className="inline-flex min-h-11 items-center border-b border-white/70 font-semibold">{t.directory}</Link>
              </div>
            </section>
          </>
        )}
      </main>
      <Footer currentLang={language} />
    </>
  );
}
