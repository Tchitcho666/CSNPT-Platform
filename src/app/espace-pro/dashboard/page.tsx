import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getDatabaseClient } from '@/lib/server/db';
import { getProfessionalSessionId } from '@/lib/server/professional-session';
import { professionalLogout } from './actions';

export const dynamic = 'force-dynamic';

export default async function ProfessionalDashboardPage() {
  const id = await getProfessionalSessionId();
  if (!id) redirect('/espace-pro/login');
  const practitioner = await getDatabaseClient().psychomotricien.findUnique({
    where: { id }, select: { fullName: true, specialty: true, city: true, governorate: true, phone: true, exactAddress: true, email: true, isPublished: true },
  });
  if (!practitioner) redirect('/espace-pro/login');
  return <main className="min-h-screen bg-[#F6F1E9] px-5 py-10 text-[#14272A] sm:px-8">
    <div className="mx-auto max-w-4xl">
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-[#0E5A5F]/20 pb-6">
        <div><p className="text-xs font-semibold uppercase tracking-[.18em] text-[#C4623B]">CSNPT · Espace professionnel</p><h1 className="mt-3 font-serif text-4xl">Bonjour, {practitioner.fullName}</h1><p className="mt-2 text-sm text-[#14272A]/65">Votre fiche et son statut de publication.</p></div>
        <form action={professionalLogout}><button className="rounded-full border border-[#0E5A5F]/35 px-4 py-2 text-sm">Se déconnecter</button></form>
      </header>
      <section className="mt-8 border border-[#14272A]/10 bg-[#FCFCFC] p-6" aria-labelledby="profile-title">
        <div className="flex flex-wrap items-center justify-between gap-3"><h2 id="profile-title" className="font-serif text-2xl">Votre profil</h2><span className={`rounded-full px-3 py-1 text-xs font-semibold ${practitioner.isPublished ? 'bg-[#0E5A5F]/10 text-[#0E5A5F]' : 'bg-[#C4623B]/10 text-[#8a432d]'}`}>{practitioner.isPublished ? 'Publié dans l’annuaire' : 'En attente de validation'}</span></div>
        <dl className="mt-6 grid gap-5 sm:grid-cols-2">{[['Spécialité', practitioner.specialty], ['Ville', practitioner.city], ['Gouvernorat', practitioner.governorate], ['Téléphone', practitioner.phone], ['E-mail', practitioner.email || 'Non renseigné'], ['Adresse professionnelle', practitioner.exactAddress]].map(([label, value]) => <div key={label}><dt className="text-xs font-semibold uppercase tracking-wide text-[#14272A]/55">{label}</dt><dd className="mt-1 text-sm">{value}</dd></div>)}</dl>
      </section>
      <Link href="/contact" className="mt-6 inline-flex min-h-11 items-center border-b border-[#0E5A5F] text-sm font-semibold text-[#0E5A5F]">Contacter la chambre</Link>
    </div>
  </main>;
}
