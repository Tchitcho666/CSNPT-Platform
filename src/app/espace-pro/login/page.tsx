import Link from 'next/link';
import { professionalLogin } from './actions';

export const dynamic = 'force-dynamic';
type Props = { searchParams: Promise<{ error?: string }> };

export default async function ProfessionalLoginPage({ searchParams }: Props) {
  const { error } = await searchParams;
  return <main className="flex min-h-screen items-center justify-center bg-[#F6F1E9] px-5 py-12 text-[#14272A]">
    <section className="w-full max-w-md border-y border-[#0E5A5F]/20 py-10">
      <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#C4623B]">CSNPT · Espace professionnel</p>
      <h1 className="mt-4 font-serif text-4xl">Connexion</h1>
      <p className="mt-3 text-sm leading-6 text-[#14272A]/70">Connectez-vous avec l’adresse e-mail ou le téléphone associé à votre fiche.</p>
      {error && <p role="alert" className="mt-5 border-s-2 border-[#C4623B] bg-white/60 px-4 py-3 text-sm">{error === 'unavailable' ? 'Connexion momentanément indisponible.' : 'Identifiants incorrects.'}</p>}
      <form action={professionalLogin} className="mt-7 grid gap-4">
        <label className="grid gap-1.5 text-sm font-medium">E-mail ou téléphone<input required name="identifier" autoComplete="username" className="rounded-md border border-[#14272A]/20 bg-[#FCFCFC] px-4 py-3 outline-none focus:ring-2 focus:ring-[#0E5A5F]" /></label>
        <label className="grid gap-1.5 text-sm font-medium">Mot de passe<input required name="password" type="password" autoComplete="current-password" className="rounded-md border border-[#14272A]/20 bg-[#FCFCFC] px-4 py-3 outline-none focus:ring-2 focus:ring-[#0E5A5F]" /></label>
        <button className="mt-2 rounded-full bg-[#0E5A5F] px-5 py-3 text-sm font-semibold text-white">Se connecter</button>
      </form>
      <Link href="/" className="mt-7 inline-block text-sm text-[#0E5A5F] underline underline-offset-4">Retour au site</Link>
    </section>
  </main>;
}
