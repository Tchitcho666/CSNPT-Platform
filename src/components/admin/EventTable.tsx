'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { deleteEvent, updateEventStatus } from '@/app/admin/actions';

type EventRow = {
  id: string;
  title: string;
  description: string | null;
  type: string;
  date: Date;
  startTime: string;
  endTime: string;
  locationName: string;
  capacity: number;
  audience: string;
  status: string;
};

const statusStyles: Record<string, string> = {
  DRAFT: 'bg-gray-100 text-gray-700',
  PUBLISHED: 'bg-emerald-100 text-emerald-800',
  CANCELLED: 'bg-red-100 text-red-800',
};

export default function EventTable({ events, disabled = false }: { events: EventRow[]; disabled?: boolean }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [isPending, startTransition] = useTransition();

  function update(id: string, status: string) {
    setPending(true);
    startTransition(async () => {
      try {
        await updateEventStatus(id, status);
        router.refresh();
      } finally {
        setPending(false);
      }
    });
  }

  function remove(event: EventRow) {
    if (!window.confirm(`Supprimer définitivement « ${event.title} » ?`)) return;
    setPending(true);
    startTransition(async () => {
      try {
        await deleteEvent(event.id);
        router.refresh();
      } finally {
        setPending(false);
      }
    });
  }

  return (
    <div className="mt-5 overflow-x-auto rounded-lg border border-[#14272A]/10 bg-[#FCFCFC]">
      <table className="w-full min-w-[980px] border-collapse text-left text-sm">
        <thead className="bg-[#0E5A5F]/7 text-[#14272A]/75"><tr>{['Événement', 'Date et horaires', 'Lieu', 'Public', 'Capacité', 'Statut', 'Actions'].map((label) => <th key={label} className="px-4 py-3 font-semibold">{label}</th>)}</tr></thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id} className="border-t border-[#14272A]/10">
              <td className="px-4 py-3"><span className="block font-medium">{event.title}</span><span className="text-xs text-[#14272A]/60">{event.type}</span>{event.description && <span className="mt-1 block max-w-xs text-xs text-[#14272A]/60">{event.description}</span>}</td>
              <td className="px-4 py-3">{new Intl.DateTimeFormat('fr-TN', { dateStyle: 'medium', timeZone: 'UTC' }).format(new Date(event.date))}<span className="block text-xs text-[#14272A]/60">{event.startTime}–{event.endTime}</span></td>
              <td className="px-4 py-3">{event.locationName}</td>
              <td className="px-4 py-3">{event.audience}</td>
              <td className="px-4 py-3">{event.capacity}</td>
              <td className="px-4 py-3"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[event.status] ?? statusStyles.DRAFT}`}>{event.status}</span></td>
              <td className="px-4 py-3"><div className="flex gap-2">
                {event.status !== 'PUBLISHED' && <button type="button" disabled={disabled || pending || isPending} onClick={() => update(event.id, 'PUBLISHED')} className="rounded-full border border-emerald-700/30 px-3 py-1.5 text-xs font-semibold text-emerald-800 disabled:opacity-40">Publier</button>}
                {event.status !== 'CANCELLED' && <button type="button" disabled={disabled || pending || isPending} onClick={() => update(event.id, 'CANCELLED')} className="rounded-full border border-red-600/30 px-3 py-1.5 text-xs font-semibold text-red-700 disabled:opacity-40">Annuler</button>}
                <button type="button" disabled={disabled || pending || isPending} onClick={() => remove(event)} className="rounded-full border border-[#14272A]/20 px-3 py-1.5 text-xs font-semibold text-[#14272A] disabled:opacity-40">Supprimer</button>
              </div></td>
            </tr>
          ))}
        </tbody>
      </table>
      {events.length === 0 && <p className="px-4 py-6 text-sm text-[#14272A]/65">Aucun événement enregistré.</p>}
    </div>
  );
}
