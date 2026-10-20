'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { deleteNews, setNewsPublished } from '@/app/admin/actions';

type NewsItem = { id: string; title: string; slug: string; excerpt: string; isPublished: boolean; publishedAt: Date | null; createdAt: Date };

export default function NewsTable({ articles, disabled = false }: { articles: NewsItem[]; disabled?: boolean }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function publish(id: string, value: boolean) {
    startTransition(async () => { await setNewsPublished(id, value); router.refresh(); });
  }
  function remove(id: string) {
    if (!window.confirm('Supprimer définitivement cet article ?')) return;
    startTransition(async () => { await deleteNews(id); router.refresh(); });
  }

  return (
    <div className="mt-5 overflow-x-auto rounded-lg border border-[#14272A]/10 bg-[#FCFCFC]">
      <table className="w-full min-w-[760px] border-collapse text-left text-sm">
        <thead className="bg-[#0E5A5F]/7"><tr><th className="px-4 py-3">Article</th><th className="px-4 py-3">Statut</th><th className="px-4 py-3">Date</th><th className="px-4 py-3">Actions</th></tr></thead>
        <tbody>{articles.map((article) => <tr key={article.id} className="border-t border-[#14272A]/10 align-top">
          <td className="max-w-xl px-4 py-4"><p className="font-semibold">{article.title}</p><p className="mt-1 text-xs text-[#14272A]/55">/{article.slug}</p><p className="mt-2 line-clamp-2 text-xs text-[#14272A]/65">{article.excerpt}</p></td>
          <td className="px-4 py-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${article.isPublished ? 'bg-[#0E5A5F]/10 text-[#0E5A5F]' : 'bg-[#14272A]/8 text-[#14272A]/65'}`}>{article.isPublished ? 'Publié' : 'Brouillon'}</span></td>
          <td className="px-4 py-4 text-xs text-[#14272A]/65">{(article.publishedAt ?? article.createdAt).toLocaleDateString('fr-FR')}</td>
          <td className="px-4 py-4"><div className="flex flex-wrap gap-2"><button type="button" disabled={disabled || pending} onClick={() => publish(article.id, !article.isPublished)} className="rounded-full border border-[#0E5A5F]/35 px-3 py-1.5 text-xs font-semibold text-[#0E5A5F] disabled:opacity-40">{article.isPublished ? 'Dépublier' : 'Publier'}</button><button type="button" disabled={disabled || pending} onClick={() => remove(article.id)} className="rounded-full border border-red-700/30 px-3 py-1.5 text-xs font-semibold text-red-700 disabled:opacity-40">Supprimer</button></div></td>
        </tr>)}</tbody>
      </table>
      {articles.length === 0 && <p className="px-4 py-6 text-sm text-[#14272A]/65">Aucun article pour le moment.</p>}
    </div>
  );
}
