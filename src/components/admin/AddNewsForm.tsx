'use client';

import { useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { createNews } from '@/app/admin/actions';

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button disabled={pending} className="min-h-11 rounded-full bg-[#0E5A5F] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60">{pending ? 'Enregistrement…' : 'Enregistrer en brouillon'}</button>;
}

export default function AddNewsForm({ disabled = false }: { disabled?: boolean }) {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  async function submit(formData: FormData) {
    setMessage(null);
    const result = await createNews(formData);
    setMessage({ ok: result.success, text: result.message });
    if (result.success) {
      formRef.current?.reset();
      router.refresh();
    }
  }

  const fieldClass = 'w-full rounded-md border border-[#14272A]/20 bg-[#FCFCFC] px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#0E5A5F] disabled:opacity-60';
  return (
    <form ref={formRef} action={submit} className="mt-8 grid gap-4 border-t border-[#14272A]/15 pt-6 md:grid-cols-2" aria-labelledby="add-news-title">
      <div className="md:col-span-2"><h3 id="add-news-title" className="font-serif text-xl">Nouvel article</h3><p className="mt-1 text-sm text-[#14272A]/65">L’article est créé en brouillon. Publiez-le après relecture.</p></div>
      <fieldset disabled={disabled} className="contents">
        <label htmlFor="news-title" className="grid gap-1.5 text-sm">Titre<input id="news-title" name="title" required maxLength={200} className={fieldClass} /></label>
        <label htmlFor="news-cover" className="grid gap-1.5 text-sm">Image de couverture (URL)<input id="news-cover" name="coverImage" type="url" maxLength={2000} className={fieldClass} placeholder="https://…" /></label>
        <label htmlFor="news-excerpt" className="grid gap-1.5 text-sm md:col-span-2">Résumé<textarea id="news-excerpt" name="excerpt" required maxLength={500} rows={2} className={fieldClass} /></label>
        <label htmlFor="news-content" className="grid gap-1.5 text-sm md:col-span-2">Contenu<textarea id="news-content" name="content" required maxLength={30000} rows={8} className={fieldClass} /></label>
        <div className="md:col-span-2"><SubmitButton /></div>
      </fieldset>
      {message && <p className={`text-sm md:col-span-2 ${message.ok ? 'text-[#0E5A5F]' : 'text-red-700'}`} role={message.ok ? 'status' : 'alert'}>{message.text}</p>}
    </form>
  );
}
