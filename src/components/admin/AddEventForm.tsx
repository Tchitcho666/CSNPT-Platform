'use client';

import { useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { createEvent } from '@/app/admin/actions';

function EventFormFields({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  const isDisabled = disabled || pending;

  return (
    <fieldset disabled={isDisabled} className="contents">
      <legend className="sr-only">Informations de l’événement</legend>
      <div className="sm:col-span-2 lg:col-span-4">
        <h3 className="font-serif text-xl">Ajouter un événement</h3>
        <p className="mt-1 text-sm text-[#14272A]/65">Les événements sont enregistrés en brouillon et ne sont visibles publiquement qu’après publication.</p>
      </div>
      <label htmlFor="event-title" className="grid gap-1.5 text-sm sm:col-span-2">Titre<input id="event-title" name="title" required maxLength={200} className="rounded-md border border-[#14272A]/20 bg-[#FCFCFC] px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#0E5A5F] disabled:opacity-60" /></label>
      <label htmlFor="event-description" className="grid gap-1.5 text-sm sm:col-span-2 lg:col-span-4">Description courte<textarea id="event-description" name="description" rows={3} maxLength={1000} className="resize-y rounded-md border border-[#14272A]/20 bg-[#FCFCFC] px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#0E5A5F] disabled:opacity-60" /></label>
      <label htmlFor="event-type" className="grid gap-1.5 text-sm">Type<select id="event-type" name="type" required defaultValue="Formation" className="rounded-md border border-[#14272A]/20 bg-[#FCFCFC] px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#0E5A5F] disabled:opacity-60"><option>Formation</option><option>Séminaire</option></select></label>
      <label htmlFor="event-date" className="grid gap-1.5 text-sm">Date<input id="event-date" type="date" name="date" required className="rounded-md border border-[#14272A]/20 bg-[#FCFCFC] px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#0E5A5F] disabled:opacity-60" /></label>
      <label htmlFor="event-start-time" className="grid gap-1.5 text-sm">Heure de début<input id="event-start-time" type="time" name="startTime" required className="rounded-md border border-[#14272A]/20 bg-[#FCFCFC] px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#0E5A5F] disabled:opacity-60" /></label>
      <label htmlFor="event-end-time" className="grid gap-1.5 text-sm">Heure de fin<input id="event-end-time" type="time" name="endTime" required className="rounded-md border border-[#14272A]/20 bg-[#FCFCFC] px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#0E5A5F] disabled:opacity-60" /></label>
      <label htmlFor="event-location" className="grid gap-1.5 text-sm sm:col-span-2">Lieu<input id="event-location" name="locationName" required maxLength={200} className="rounded-md border border-[#14272A]/20 bg-[#FCFCFC] px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#0E5A5F] disabled:opacity-60" /></label>
      <label htmlFor="event-capacity" className="grid gap-1.5 text-sm">Capacité<input id="event-capacity" type="number" name="capacity" required min={1} max={100000} step={1} className="rounded-md border border-[#14272A]/20 bg-[#FCFCFC] px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#0E5A5F] disabled:opacity-60" /></label>
      <label htmlFor="event-audience" className="grid gap-1.5 text-sm">Public<select id="event-audience" name="audience" required defaultValue="Professionnels" className="rounded-md border border-[#14272A]/20 bg-[#FCFCFC] px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#0E5A5F] disabled:opacity-60"><option>Adhérents</option><option>Public</option><option>Professionnels</option></select></label>
      <button type="submit" disabled={isDisabled} className="inline-flex min-h-11 w-fit items-center justify-center gap-2 self-end rounded-full bg-[#0E5A5F] px-5 py-2.5 text-sm font-semibold text-white disabled:cursor-wait disabled:opacity-60">
        {pending && <span aria-hidden="true" className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />}
        {pending ? 'Enregistrement…' : 'Créer en brouillon'}
      </button>
    </fieldset>
  );
}

export default function AddEventForm({ disabled = false }: { disabled?: boolean }) {
  const [message, setMessage] = useState<{ success: boolean; text: string } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function submitEvent(formData: FormData) {
    setMessage(null);
    const result = await createEvent(formData);
    setMessage({ success: result.success, text: result.message });
    if (result.success) formRef.current?.reset();
  }

  return (
    <form ref={formRef} action={submitEvent} className="grid gap-4 border-t border-[#14272A]/15 pt-6 sm:grid-cols-2 lg:grid-cols-4">
      <EventFormFields disabled={disabled} />
      {message && <p className={`sm:col-span-2 lg:col-span-4 text-sm ${message.success ? 'text-[#0E5A5F]' : 'text-red-700'}`} role={message.success ? 'status' : 'alert'}>{message.text}</p>}
    </form>
  );
}
