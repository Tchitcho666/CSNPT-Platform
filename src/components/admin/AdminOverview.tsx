'use client';

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type Activity = { id: string; fullName: string; eventTitle: string; createdAt: string };
type Props = {
  practitioners: number;
  events: number;
  registrations: number;
  pendingAdhesions: number;
  chartData: { month: string; count: number }[];
  recentActivity: Activity[];
};

const metrics: { key: keyof Pick<Props, 'practitioners' | 'events' | 'registrations' | 'pendingAdhesions'>; label: string; note: string; tone: string }[] = [
  { key: 'practitioners', label: 'Psychomotriciens', note: 'dans l’annuaire', tone: 'border-[#0E5A5F]' },
  { key: 'events', label: 'Événements', note: 'formations et rencontres', tone: 'border-[#C4623B]' },
  { key: 'registrations', label: 'Inscriptions', note: 'demandes enregistrées', tone: 'border-[#0E5A5F]' },
  { key: 'pendingAdhesions', label: 'Adhésions à traiter', note: 'en attente de décision', tone: 'border-[#C4623B]' },
];

export default function AdminOverview(props: Props) {
  return (
    <section className="py-7" aria-labelledby="overview-title">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C4623B]">Activité de la plateforme</p>
        <h2 id="overview-title" className="mt-2 font-serif text-3xl text-[#14272A]">Vue d’ensemble</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <article key={metric.key} className={`min-h-36 border-l-4 ${metric.tone} bg-[#FCFCFC] p-5 shadow-sm`}>
            <p className="text-sm font-medium text-[#14272A]/75">{metric.label}</p>
            <p className="mt-3 font-serif text-4xl tabular-nums text-[#0E5A5F]">{props[metric.key]}</p>
            <p className="mt-1 text-xs text-[#14272A]/60">{metric.note}</p>
          </article>
        ))}
      </div>
      <div className="mt-7 grid gap-6 xl:grid-cols-[1fr_1fr]">
        <section className="border border-[#14272A]/10 bg-[#FCFCFC] p-5" aria-labelledby="registrations-chart-title">
          <h3 id="registrations-chart-title" className="font-serif text-xl">Inscriptions par mois</h3>
          <div className="mt-4 h-64 w-full" role="img" aria-label="Graphique des inscriptions des six derniers mois">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={props.chartData} margin={{ top: 8, right: 8, left: -20, bottom: 4 }}>
                <CartesianGrid stroke="#14272A" strokeOpacity={0.12} vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#14272A', fontSize: 12 }} />
                <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fill: '#14272A', fontSize: 12 }} />
                <Tooltip cursor={{ fill: '#0E5A5F', fillOpacity: 0.08 }} />
                <Bar dataKey="count" name="Inscriptions" fill="#0E5A5F" radius={[4, 4, 0, 0]} maxBarSize={42} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
        <section className="border border-[#14272A]/10 bg-[#FCFCFC] p-5" aria-labelledby="recent-activity-title">
          <h3 id="recent-activity-title" className="font-serif text-xl">Activité récente</h3>
          <div className="mt-4 divide-y divide-[#14272A]/10 border-y border-[#14272A]/10">
            {props.recentActivity.map((activity) => <article key={activity.id} className="flex flex-wrap items-start justify-between gap-3 py-3 text-sm">
              <div><p className="font-semibold text-[#14272A]">{activity.fullName}</p><p className="mt-1 text-xs text-[#14272A]/65">{activity.eventTitle}</p></div>
              <time className="text-xs text-[#14272A]/60">{new Intl.DateTimeFormat('fr-TN', { dateStyle: 'medium', timeZone: 'UTC' }).format(new Date(activity.createdAt))}</time>
            </article>)}
            {props.recentActivity.length === 0 && <p className="py-5 text-sm text-[#14272A]/60">Aucune inscription récente.</p>}
          </div>
        </section>
      </div>
    </section>
  );
}
