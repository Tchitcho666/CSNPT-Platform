'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { deletePractitioner, setPractitionerApprovalAction } from './actions';

export function PractitionerApprovalForm({
  id,
  isApproved,
  disabled,
}: {
  id: string;
  isApproved: boolean;
  disabled: boolean;
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function submit(formData: FormData) {
    setPending(true);
    try {
      await setPractitionerApprovalAction(formData);
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  async function remove() {
    if (!window.confirm('Supprimer définitivement ce professionnel ? Cette action est irréversible.')) return;
    setPending(true);
    try {
      await deletePractitioner(id);
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
    <form action={submit}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="isApproved" value={String(!isApproved)} />
      <button
        disabled={disabled || pending}
        aria-busy={pending}
        className="rounded-full border border-[#0E5A5F]/30 px-3 py-1.5 text-xs font-semibold text-[#0E5A5F] disabled:opacity-40"
      >
        {pending ? 'Mise à jour…' : isApproved ? 'Retirer' : 'Approuver'}
      </button>
      <span className="ml-2 text-xs text-[#14272A]/65">
        {isApproved ? 'Publié' : 'En attente'}
      </span>
    </form>
    <form action={remove}>
      <button
        disabled={disabled || pending}
        aria-busy={pending}
        className="rounded-full border border-red-600/40 px-3 py-1.5 text-xs font-semibold text-red-700 disabled:opacity-40"
      >
        Supprimer
      </button>
    </form>
    </div>
  );
}
