'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { deletePractitioner, togglePublish } from '@/app/admin/actions';

type PractitionerRow = {
  id: string;
  fullName: string;
  specialty: string;
  city: string;
  phone: string;
  isPublished: boolean;
};

export default function AdminTable({
  practitioners,
  disabled = false,
}: {
  practitioners: PractitionerRow[];
  disabled?: boolean;
}) {
  const router = useRouter();
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function publish(person: PractitionerRow) {
    setPendingId(person.id);
    startTransition(async () => {
      try {
        await togglePublish(person.id, !person.isPublished);
        router.refresh();
      } finally {
        setPendingId(null);
      }
    });
  }

  function remove(person: PractitionerRow) {
    if (!window.confirm(`Supprimer définitivement la fiche de ${person.fullName} ?`)) return;
    setPendingId(person.id);
    startTransition(async () => {
      try {
        await deletePractitioner(person.id);
        router.refresh();
      } finally {
        setPendingId(null);
      }
    });
  }

  return (
    <div className="mt-5 overflow-x-auto rounded-lg border border-[#14272A]/10 bg-[#FCFCFC]">
      <table className="w-full min-w-[760px] border-collapse text-left text-sm">
        <thead className="bg-[#0E5A5F]/7 text-[#14272A]/75">
          <tr>{['Nom', 'Spécialité', 'Ville', 'Téléphone', 'Publication', 'Actions'].map((title) => <th key={title} className="px-4 py-3 font-semibold">{title}</th>)}</tr>
        </thead>
        <tbody>
          {practitioners.map((person) => {
            const rowPending = isPending && pendingId === person.id;
            return (
              <tr key={person.id} className="border-t border-[#14272A]/10">
                <td className="px-4 py-3 font-medium">{person.fullName}</td>
                <td className="px-4 py-3">{person.specialty}</td>
                <td className="px-4 py-3">{person.city}</td>
                <td className="px-4 py-3">{person.phone}</td>
                <td className="px-4 py-3 text-xs text-[#14272A]/65">{person.isPublished ? 'Publié' : 'En attente'}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <button type="button" disabled={disabled || rowPending || isPending} onClick={() => publish(person)} className="rounded-full border border-[#0E5A5F]/30 px-3 py-1.5 text-xs font-semibold text-[#0E5A5F] disabled:opacity-40">
                      {rowPending ? 'Mise à jour…' : person.isPublished ? 'Retirer' : 'Publier'}
                    </button>
                    <button type="button" disabled={disabled || rowPending || isPending} onClick={() => remove(person)} className="rounded-full border border-red-600/40 px-3 py-1.5 text-xs font-semibold text-red-700 disabled:opacity-40">
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {practitioners.length === 0 && <p className="px-4 py-6 text-sm text-[#14272A]/65">Aucun professionnel enregistré.</p>}
    </div>
  );
}
