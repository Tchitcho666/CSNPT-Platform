'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { updateRegistrationStatus } from '@/app/admin/actions';

type RegistrationRow = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  status: string;
  createdAt: Date;
  event: { title: string };
};

const statusStyle: Record<string, string> = {
  PENDING: 'bg-amber-100 text-amber-900',
  CONFIRMED: 'bg-emerald-100 text-emerald-900',
  CANCELLED: 'bg-rose-100 text-rose-900',
};

export default function RegistrationsTable({ registrations, disabled = false }: { registrations: RegistrationRow[]; disabled?: boolean }) {
  const router = useRouter();
  const [savingId, setSavingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function updateStatus(id: string, status: 'CONFIRMED' | 'CANCELLED') {
    setSavingId(id);
    startTransition(async () => {
      try {
        await updateRegistrationStatus(id, status);
        router.refresh();
      } finally {
        setSavingId(null);
      }
    });
  }

  return (
    <div className="mt-5 overflow-x-auto rounded-lg border border-[#14272A]/10 bg-[#FCFCFC]">
      <table className="w-full min-w-[850px] border-collapse text-left text-sm">
        <thead className="bg-[#0E5A5F]/7 text-[#14272A]/75">
          <tr>
            <th scope="col" className="px-4 py-3 font-semibold">Événement</th>
            <th scope="col" className="px-4 py-3 font-semibold">Nom</th>
            <th scope="col" className="px-4 py-3 font-semibold">E-mail</th>
            <th scope="col" className="px-4 py-3 font-semibold">Téléphone</th>
            <th scope="col" className="px-4 py-3 font-semibold">Statut</th>
            <th scope="col" className="px-4 py-3 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((registration) => (
            <tr key={registration.id} className="border-t border-[#14272A]/10 align-middle">
              <td className="max-w-64 px-4 py-3 font-medium">{registration.event.title}</td>
              <td className="px-4 py-3">{registration.fullName}</td>
              <td className="px-4 py-3">{registration.email}</td>
              <td className="px-4 py-3" dir="ltr">{registration.phone}</td>
              <td className="px-4 py-3"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle[registration.status] ?? 'bg-slate-100 text-slate-800'}`}>{registration.status}</span></td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={() => updateStatus(registration.id, 'CONFIRMED')} disabled={disabled || isPending || registration.status === 'CONFIRMED'} className="rounded-full border border-[#0E5A5F]/35 px-3 py-1.5 text-xs font-semibold text-[#0E5A5F] hover:bg-[#0E5A5F]/5 disabled:cursor-not-allowed disabled:opacity-40">{savingId === registration.id && isPending ? 'Mise à jour…' : 'Confirmer'}</button>
                  <button type="button" onClick={() => updateStatus(registration.id, 'CANCELLED')} disabled={disabled || isPending || registration.status === 'CANCELLED'} className="rounded-full border border-rose-300 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-40">{savingId === registration.id && isPending ? 'Mise à jour…' : 'Annuler'}</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {registrations.length === 0 && <p className="px-4 py-7 text-sm text-[#14272A]/65">Aucune inscription reçue pour le moment.</p>}
    </div>
  );
}
