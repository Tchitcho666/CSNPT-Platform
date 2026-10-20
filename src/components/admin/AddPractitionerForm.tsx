import { addPractitioner } from '@/app/admin/actions';

const fields = [
  ['fullName', 'Nom complet'],
  ['specialty', 'Spécialité'],
  ['city', 'Ville'],
  ['governorate', 'Gouvernorat'],
  ['phone', 'Téléphone'],
  ['exactAddress', 'Adresse exacte'],
] as const;

export default function AddPractitionerForm({ disabled = false }: { disabled?: boolean }) {
  return (
    <form action={addPractitioner} className="mt-9 grid gap-4 border-t border-[#14272A]/15 pt-6 sm:grid-cols-2 lg:grid-cols-3">
      <div className="sm:col-span-2 lg:col-span-3">
        <h3 className="font-serif text-xl">Ajouter un professionnel</h3>
        <p className="mt-1 text-sm text-[#14272A]/65">La nouvelle fiche reste en attente jusqu’à son approbation.</p>
      </div>
      {fields.map(([name, label]) => (
        <label key={name} className="grid gap-1.5 text-sm">
          {label}
          <input name={name} required maxLength={name === 'exactAddress' ? 500 : 200} className="rounded-md border border-[#14272A]/20 bg-[#FCFCFC] px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#0E5A5F]" />
        </label>
      ))}
      <label className="grid gap-1.5 text-sm">E-mail professionnel (facultatif)<input name="email" type="email" maxLength={254} autoComplete="email" className="rounded-md border border-[#14272A]/20 bg-[#FCFCFC] px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#0E5A5F]" /></label>
      <label className="grid gap-1.5 text-sm">Mot de passe initial (10 caractères minimum)<input name="initialPassword" type="password" minLength={10} autoComplete="new-password" className="rounded-md border border-[#14272A]/20 bg-[#FCFCFC] px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#0E5A5F]" /></label>
      <button disabled={disabled} className="w-fit rounded-full bg-[#0E5A5F] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-40">Enregistrer</button>
    </form>
  );
}
