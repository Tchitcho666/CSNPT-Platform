import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getDatabaseClient } from '@/lib/server/db';

export const metadata: Metadata = {
  title: 'La Chambre | Équipe et héritage de la CSNPT',
  description: 'Découvrez les membres du bureau et les anciens membres de la Chambre Syndicale Nationale des Psychomotriciens Tunisiens.',
};

const initialBoard = [
  { fullName: 'Ameni', role: 'Membre du bureau', biography: null, image: null, yearsActive: null },
  { fullName: 'Fatma', role: 'Membre du bureau', biography: null, image: null, yearsActive: null },
  { fullName: 'Hela', role: 'Membre du bureau', biography: null, image: null, yearsActive: null },
  { fullName: 'Monira', role: 'Membre du bureau', biography: null, image: null, yearsActive: null },
];

export default async function LaChambrePage() {
  let members: Awaited<ReturnType<ReturnType<typeof getDatabaseClient>['teamMember']['findMany']>> = [];
  try {
    members = await getDatabaseClient().teamMember.findMany({ where: { isPublished: true }, orderBy: { sortOrder: 'asc' } });
  } catch (error) {
    console.error('Team page query failed:', error);
  }
  const currentMembers = members.filter((member) => !member.isAlumni);
  const alumni = members.filter((member) => member.isAlumni);
  const board = currentMembers.length ? currentMembers : initialBoard;
  return <div className="min-h-screen bg-[#f7f4ed] text-[#102824]"><Navbar /><main><header className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28"><p className="text-xs font-bold uppercase tracking-[0.25em] text-[#287d78]">CSNPT · Gouvernance</p><h1 className="mt-5 max-w-4xl font-serif text-5xl font-semibold leading-tight md:text-7xl">La Chambre</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-[#68716e]">Le collectif qui représente et accompagne les psychomotriciens tunisiens, ainsi que celles et ceux qui ont contribué à son histoire.</p></header><section className="mx-auto max-w-7xl px-6 pb-20 md:px-10"><div className="flex items-end justify-between gap-5 border-b border-[#dcd6cb] pb-5"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#287d78]">Le cercle</p><h2 className="mt-2 font-serif text-3xl md:text-4xl">Équipe actuelle</h2></div><span className="text-sm text-[#68716e]">{board.length} membres</span></div><div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{board.map((member) => <article key={`${member.fullName}-${member.role}`} className="overflow-hidden rounded-3xl border border-[#ded9cf] bg-[#f0ede5]">{member.image ? <img src={member.image} alt={`Portrait de ${member.fullName}`} className="h-64 w-full object-cover" /> : <div aria-hidden="true" className="flex h-64 items-end bg-gradient-to-br from-[#dcebe6] via-[#b7d5ce] to-[#164c5d] p-6"><span className="font-serif text-7xl font-semibold text-white/90">{member.fullName.slice(0, 1)}</span></div>}<div className="p-6"><h3 className="text-xl font-bold">{member.fullName}</h3><p className="mt-2 text-sm font-semibold text-[#287d78]">{member.role}</p>{member.yearsActive && <p className="mt-2 text-xs text-[#68716e]">{member.yearsActive}</p>}{member.biography && <p className="mt-4 text-sm leading-6 text-[#68716e]">{member.biography}</p>}</div></article>)}</div></section><section className="border-t border-[#ded9cf] bg-[#f0ede5]"><div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#287d78]">L’héritage</p><h2 className="mt-2 font-serif text-3xl md:text-4xl">Anciennes et anciens membres</h2>{alumni.length ? <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{alumni.map((member) => <article key={member.id} className="rounded-2xl border border-[#ded9cf] bg-[#f7f4ed] p-6"><h3 className="font-bold">{member.fullName}</h3><p className="mt-1 text-sm text-[#287d78]">{member.role}</p>{member.yearsActive && <p className="mt-3 text-xs text-[#68716e]">{member.yearsActive}</p>}</article>)}</div> : <p className="mt-5 max-w-xl text-sm leading-7 text-[#68716e]">Les membres ayant contribué aux précédents bureaux seront présentés ici.</p>}</div></section></main><Footer /></div>;
}
