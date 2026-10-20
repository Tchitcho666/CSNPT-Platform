import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InternshipForm from './InternshipForm';

export const metadata: Metadata = {
  title: 'Stages internationaux | CSNPT',
  description: 'Présentez votre candidature pour un stage international en psychomotricité auprès de la CSNPT.',
};

export default function InternationalInternshipsPage() {
  return <div className="min-h-screen bg-[#f7f4ed] text-[#102824]"><Navbar /><main><header className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28"><p className="text-xs font-bold uppercase tracking-[0.25em] text-[#287d78]">CSNPT · Mobilité</p><h1 className="mt-5 max-w-4xl font-serif text-5xl font-semibold leading-tight md:text-7xl">Stages internationaux</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-[#68716e]">La CSNPT accueille les demandes de stage d’étudiants internationaux en psychomotricité. Présentez votre parcours et votre projet au comité.</p></header><section className="mx-auto max-w-4xl px-6 pb-24 md:px-10"><InternshipForm /></section></main><Footer /></div>;
}
