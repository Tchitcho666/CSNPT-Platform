'use client';

import { useActionState } from 'react';
import { submitInternshipRequest, type InternshipState } from './actions';

const initialState: InternshipState = { success: false, message: '' };

export default function InternshipForm() {
  const [state, action, pending] = useActionState(submitInternshipRequest, initialState);
  return (
    <form action={action} className="grid gap-5 rounded-3xl border border-[#dcd6cb] bg-[#f1ede5] p-6 md:grid-cols-2 md:p-9">
      <label className="grid gap-2 text-sm font-semibold">Nom et prénom<input name="fullName" required maxLength={200} autoComplete="name" className="rounded-xl border border-[#dcd6cb] bg-[#fcfaf6] px-4 py-3 font-normal" /></label>
      <label className="grid gap-2 text-sm font-semibold">Adresse e-mail<input name="email" type="email" required maxLength={254} autoComplete="email" className="rounded-xl border border-[#dcd6cb] bg-[#fcfaf6] px-4 py-3 font-normal" /></label>
      <label className="grid gap-2 text-sm font-semibold">Pays<input name="country" required maxLength={120} autoComplete="country-name" className="rounded-xl border border-[#dcd6cb] bg-[#fcfaf6] px-4 py-3 font-normal" /></label>
      <label className="grid gap-2 text-sm font-semibold">Université<input name="university" required maxLength={200} autoComplete="organization" className="rounded-xl border border-[#dcd6cb] bg-[#fcfaf6] px-4 py-3 font-normal" /></label>
      <label className="grid gap-2 text-sm font-semibold">Niveau d’études<select name="level" required defaultValue="" className="rounded-xl border border-[#dcd6cb] bg-[#fcfaf6] px-4 py-3 font-normal"><option value="" disabled>Sélectionner</option><option>Licence</option><option>Master</option><option>Doctorat</option><option>Autre</option></select></label>
      <label className="grid gap-2 text-sm font-semibold">Lien vers le CV <span className="font-normal text-[#68716e]">(facultatif)</span><input name="cvUrl" type="url" maxLength={2000} placeholder="https://…" className="rounded-xl border border-[#dcd6cb] bg-[#fcfaf6] px-4 py-3 font-normal" /></label>
      <label className="grid gap-2 text-sm font-semibold md:col-span-2">Lettre de motivation<textarea name="motivationLetter" required minLength={30} maxLength={5000} rows={7} className="resize-y rounded-xl border border-[#dcd6cb] bg-[#fcfaf6] px-4 py-3 font-normal" placeholder="Présentez votre parcours et les objectifs de ce stage…" /></label>
      {state.message && <p role={state.success ? 'status' : 'alert'} aria-live="polite" className={`md:col-span-2 rounded-xl px-4 py-3 text-sm ${state.success ? 'bg-[#dcebe6] text-[#164c5d]' : 'bg-[#fff0e9] text-[#8a432d]'}`}>{state.message}</p>}
      <button type="submit" disabled={pending} className="w-fit rounded-full bg-[#164c5d] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#287d78] disabled:opacity-60 md:col-span-2">{pending ? 'Envoi en cours…' : 'Envoyer ma demande'}</button>
    </form>
  );
}
