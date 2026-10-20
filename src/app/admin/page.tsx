import Link from 'next/link';
import { FileImage, FileText } from 'lucide-react';
import { getDatabaseClient } from '@/lib/server/db';
import { adminLoginConfigured, isAdminSessionValid } from '@/lib/server/admin-session';
import { loginAction, logoutAction, setAdhesionStatusAction } from './actions';
import AdminTable from '@/components/admin/AdminTable';
import AddPractitionerForm from '@/components/admin/AddPractitionerForm';
import AddEventForm from '@/components/admin/AddEventForm';
import EventTable from '@/components/admin/EventTable';
import RegistrationsTable from '@/components/admin/RegistrationsTable';
import AdminOverview from '@/components/admin/AdminOverview';
import NewsTable from '@/components/admin/NewsTable';
import AddNewsForm from '@/components/admin/AddNewsForm';

export const dynamic = 'force-dynamic';

type SearchParams = Promise<{ tab?: string; error?: string; notice?: string }>;

function LoginPage({ configured, error }: { configured: boolean; error?: string }) {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl items-center px-6 py-12">
      <section className="w-full border-y border-[#0E5A5F]/20 py-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C4623B]">CSNPT · Administration</p>
        <h1 className="mt-3 font-serif text-4xl">Espace de gestion</h1>
        <p className="mt-3 text-sm text-[#14272A]/75">Accès réservé au comité média et à la trésorerie.</p>
        {!configured ? (
          <p className="mt-6 border-l-2 border-[#C4623B] pl-4 text-sm" role="status">
            Configurez CSNPT_ADMIN_PASSWORD et CSNPT_ADMIN_SESSION_SECRET dans l’environnement du serveur pour activer la connexion.
          </p>
        ) : (
          <form action={loginAction} className="mt-7 grid gap-3">
            <label htmlFor="admin-password" className="text-sm font-medium">Mot de passe</label>
            <input id="admin-password" name="password" type="password" autoComplete="current-password" required className="rounded-md border border-[#14272A]/25 bg-[#FCFCFC] px-4 py-3 outline-none focus:ring-2 focus:ring-[#0E5A5F]" />
            {error === 'login' && <p className="text-sm text-red-800" role="alert">Mot de passe invalide.</p>}
            <button className="mt-2 w-fit rounded-full bg-[#0E5A5F] px-6 py-3 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Se connecter</button>
          </form>
        )}
        <Link href="/" className="mt-8 inline-block text-sm text-[#0E5A5F] underline underline-offset-4">Retour au site</Link>
      </section>
    </main>
  );
}

export default async function AdminPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const authenticated = await isAdminSessionValid();
  if (!authenticated) return <LoginPage configured={adminLoginConfigured()} error={params.error} />;

  let practitioners: { id: string; fullName: string; specialty: string; city: string; governorate: string; phone: string; exactAddress: string; isPublished: boolean; createdAt: Date }[] = [];
  let requests: Awaited<ReturnType<ReturnType<typeof getDatabaseClient>['adhesionRequest']['findMany']>> = [];
  let events: Awaited<ReturnType<ReturnType<typeof getDatabaseClient>['event']['findMany']>> = [];
  let registrations: { id: string; fullName: string; email: string; phone: string; status: string; createdAt: Date; event: { title: string } }[] = [];
  let news: Awaited<ReturnType<ReturnType<typeof getDatabaseClient>['news']['findMany']>> = [];
  let registrationCount = 0;
  let databaseAvailable = false;
  try {
    const db = getDatabaseClient();
    const results = await Promise.allSettled([
      db.psychomotricien.findMany({ select: { id: true, fullName: true, specialty: true, city: true, governorate: true, phone: true, exactAddress: true, isPublished: true, createdAt: true }, orderBy: { createdAt: 'desc' } }),
      db.adhesionRequest.findMany({ orderBy: { createdAt: 'desc' } }),
      db.event.findMany({ orderBy: { date: 'asc' } }),
      db.eventRegistration.findMany({ include: { event: { select: { title: true } } }, orderBy: { createdAt: 'desc' } }),
      db.news.findMany({ orderBy: { createdAt: 'desc' } }),
      db.eventRegistration.count(),
    ]);
    if (results[0].status === 'fulfilled') practitioners = results[0].value;
    else console.error('Admin practitioner query failed:', results[0].reason);
    if (results[1].status === 'fulfilled') requests = results[1].value;
    else console.error('Admin membership query failed:', results[1].reason);
    if (results[2].status === 'fulfilled') events = results[2].value;
    else console.error('Admin event query failed:', results[2].reason);
    if (results[3].status === 'fulfilled') registrations = results[3].value;
    else console.error('Admin event registration query failed:', results[3].reason);
    if (results[4].status === 'fulfilled') news = results[4].value;
    else console.error('Admin news query failed:', results[4].reason);
    if (results[5].status === 'fulfilled') registrationCount = results[5].value;
    else console.error('Admin registration count query failed:', results[5].reason);
    databaseAvailable = results.every((result) => result.status === 'fulfilled');
  } catch (error) {
    console.error('Admin database connection/query failed:', error);
    databaseAvailable = false;
  }

  const activeTab = params.tab === 'directory' || params.tab === 'memberships' || params.tab === 'events' || params.tab === 'registrations' || params.tab === 'news' ? params.tab : 'overview';
  const monthlyCounts = new Map<string, number>();
  const now = new Date();
  for (let offset = 5; offset >= 0; offset -= 1) {
    const date = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - offset, 1));
    monthlyCounts.set(date.toISOString().slice(0, 7), 0);
  }
  for (const registration of registrations) {
    const key = registration.createdAt.toISOString().slice(0, 7);
    if (monthlyCounts.has(key)) monthlyCounts.set(key, (monthlyCounts.get(key) ?? 0) + 1);
  }
  const chartData = [...monthlyCounts].map(([key, count]) => ({ month: new Intl.DateTimeFormat('fr-TN', { month: 'short', timeZone: 'UTC' }).format(new Date(`${key}-01T00:00:00Z`)), count }));
  const recentActivity = registrations.slice(0, 5).map((registration) => ({ id: registration.id, fullName: registration.fullName, eventTitle: registration.event.title, createdAt: registration.createdAt.toISOString() }));
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-5 py-8 pb-24 sm:px-8 lg:px-12">
      <header className="flex flex-wrap items-start justify-between gap-5 border-b border-[#0E5A5F]/20 pb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C4623B]">CSNPT · Administration</p>
          <h1 className="mt-2 font-serif text-4xl">Tableau de bord</h1>
          <p className="mt-2 text-sm text-[#14272A]/70">Gestion de l’annuaire et des demandes d’adhésion.</p>
        </div>
        <form action={logoutAction}><button className="rounded-full border border-[#0E5A5F]/40 px-4 py-2 text-sm hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0E5A5F]">Se déconnecter</button></form>
      </header>

      {!databaseAvailable && <p className="mt-6 border-l-2 border-[#C4623B] bg-white/60 px-4 py-3 text-sm" role="status">Base de données indisponible. Configurez DATABASE_URL et appliquez le schéma Prisma pour gérer les dossiers.</p>}
      {params.error === 'database' && <p className="mt-4 text-sm text-red-800" role="alert">L’opération a échoué. Vérifiez la connexion à la base de données puis réessayez.</p>}
      {params.notice === 'created' && <p className="mt-4 text-sm text-[#0E5A5F]" role="status">Le professionnel a été ajouté en brouillon.</p>}

      <nav aria-label="Sections d’administration" className="mt-7 flex gap-6 border-b border-[#14272A]/15">
        <Link href="/admin?tab=overview" aria-current={activeTab === 'overview' ? 'page' : undefined} className={`pb-3 text-sm ${activeTab === 'overview' ? 'border-b-2 border-[#0E5A5F] font-semibold text-[#0E5A5F]' : 'text-[#14272A]/65'}`}>Vue d’ensemble</Link>
        <Link href="/admin?tab=directory" aria-current={activeTab === 'directory' ? 'page' : undefined} className={`pb-3 text-sm ${activeTab === 'directory' ? 'border-b-2 border-[#0E5A5F] font-semibold text-[#0E5A5F]' : 'text-[#14272A]/65'}`}>Annuaire ({practitioners.length})</Link>
        <Link href="/admin?tab=memberships" aria-current={activeTab === 'memberships' ? 'page' : undefined} className={`pb-3 text-sm ${activeTab === 'memberships' ? 'border-b-2 border-[#0E5A5F] font-semibold text-[#0E5A5F]' : 'text-[#14272A]/65'}`}>Adhésions ({requests.filter((request) => request.status.toUpperCase() === 'PENDING').length})</Link>
        <Link href="/admin?tab=events" aria-current={activeTab === 'events' ? 'page' : undefined} className={`pb-3 text-sm ${activeTab === 'events' ? 'border-b-2 border-[#0E5A5F] font-semibold text-[#0E5A5F]' : 'text-[#14272A]/65'}`}>Événements ({events.length})</Link>
        <Link href="/admin?tab=registrations" aria-current={activeTab === 'registrations' ? 'page' : undefined} className={`pb-3 text-sm ${activeTab === 'registrations' ? 'border-b-2 border-[#0E5A5F] font-semibold text-[#0E5A5F]' : 'text-[#14272A]/65'}`}>Inscriptions ({registrations.length})</Link>
        <Link href="/admin?tab=news" aria-current={activeTab === 'news' ? 'page' : undefined} className={`pb-3 text-sm ${activeTab === 'news' ? 'border-b-2 border-[#0E5A5F] font-semibold text-[#0E5A5F]' : 'text-[#14272A]/65'}`}>Actualités ({news.length})</Link>
      </nav>

      {activeTab === 'overview' ? (
        <AdminOverview practitioners={practitioners.length} events={events.length} registrations={registrationCount} pendingAdhesions={requests.filter((request) => request.status.toUpperCase() === 'PENDING').length} recentActivity={recentActivity} chartData={chartData} />
      ) : activeTab === 'directory' ? (
        <section className="py-7" aria-labelledby="directory-title">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><h2 id="directory-title" className="font-serif text-2xl">Annuaire professionnel</h2><p className="mt-1 text-sm text-[#14272A]/65">Les fiches ne sont publiques qu’après validation.</p></div>
            <a href="#add-practitioner" className="rounded-full bg-[#0E5A5F] px-4 py-2.5 text-sm font-semibold text-white">Ajouter un professionnel</a>
          </div>
          <AdminTable practitioners={practitioners} disabled={!databaseAvailable} />
          <AddPractitionerForm disabled={!databaseAvailable} />
        </section>
      ) : activeTab === 'memberships' ? (
        <section className="py-7" aria-labelledby="memberships-title">
          <h2 id="memberships-title" className="font-serif text-2xl">Demandes d’adhésion</h2>
          <div className="mt-5 overflow-x-auto rounded-lg border border-[#14272A]/10 bg-[#FCFCFC]">
            <table className="w-full min-w-[920px] border-collapse text-left text-sm"><thead className="bg-[#0E5A5F]/7"><tr><th className="px-4 py-3">Demande</th><th className="px-4 py-3">Situation</th><th className="px-4 py-3">Pièces</th><th className="px-4 py-3">Statut</th><th className="px-4 py-3">Décision</th></tr></thead>
              <tbody>{requests.map((request) => <tr key={request.id} className="border-t border-[#14272A]/10 align-top"><td className="px-4 py-3"><p className="font-medium">{request.fullName}</p><p className="mt-1 text-xs text-[#14272A]/65">{request.email}</p><p className="text-xs text-[#14272A]/65">{request.phone}</p><p className="mt-2 max-w-sm whitespace-pre-line text-xs text-[#14272A]/75">{request.message}</p></td><td className="px-4 py-3">{request.professionalStatus}</td><td className="px-4 py-3"><div className="flex flex-col items-start gap-1">{([['diplomaFile', 'diploma', 'Diplôme'], ['patenteFile', 'patente', 'Patente'], ['rneFile', 'rne', 'RNE']] as const).map(([field, kind, label]) => request[field] ? <a key={field} href={`/admin/adhesion-files/${request.id}/${kind}`} aria-label={`Télécharger ${label}`} className="inline-flex min-h-9 items-center gap-2 rounded-full border border-[#0E5A5F]/20 px-3 text-xs font-semibold text-[#0E5A5F] hover:bg-[#0E5A5F]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0E5A5F]">{request[field]?.toLowerCase().endsWith('.pdf') ? <FileText className="h-4 w-4" aria-hidden="true" /> : <FileImage className="h-4 w-4" aria-hidden="true" />}<span>Télécharger</span><span className="text-[#14272A]/50">{label}</span></a> : null)}{!request.diplomaFile && !request.patenteFile && !request.rneFile && <span className="text-xs text-[#14272A]/55">Aucun document</span>}</div></td><td className="px-4 py-3">{request.status}</td><td className="px-4 py-3"><div className="flex gap-2">{(['APPROVED', 'REJECTED'] as const).map((status) => <form key={status} action={setAdhesionStatusAction}><input type="hidden" name="id" value={request.id} /><input type="hidden" name="status" value={status} /><button disabled={!databaseAvailable || request.status.toUpperCase() !== 'PENDING'} className="rounded-full border border-[#0E5A5F]/30 px-3 py-1.5 text-xs text-[#0E5A5F] disabled:opacity-40">{status === 'APPROVED' ? 'Valider' : 'Rejeter'}</button></form>)}</div></td></tr>)}</tbody>
            </table>
            {requests.length === 0 && <p className="px-4 py-6 text-sm text-[#14272A]/65">Aucune demande d?adh?sion en attente.</p>}
          </div>
        </section>
      ) : activeTab === 'events' ? (
        <section className="py-7" aria-labelledby="events-title">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><h2 id="events-title" className="font-serif text-2xl">Événements</h2><p className="mt-1 text-sm text-[#14272A]/65">Gérez les formations et séminaires proposés par la CSNPT.</p></div>
          </div>
          <EventTable events={events} disabled={!databaseAvailable} />
          <AddEventForm disabled={!databaseAvailable} />
        </section>
      ) : activeTab === 'registrations' ? (
        <section className="py-7" aria-labelledby="registrations-title">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><h2 id="registrations-title" className="font-serif text-2xl">Inscriptions aux événements</h2><p className="mt-1 text-sm text-[#14272A]/65">Consultez les demandes et confirmez les places attribuées.</p></div>
          </div>
          <RegistrationsTable registrations={registrations} disabled={!databaseAvailable} />
        </section>
      ) : (
        <section className="py-7" aria-labelledby="news-title">
          <div><h2 id="news-title" className="font-serif text-2xl">Actualités</h2><p className="mt-1 text-sm text-[#14272A]/65">Rédigez, relisez et publiez les nouvelles de la CSNPT.</p></div>
          <NewsTable articles={news} disabled={!databaseAvailable} />
          <AddNewsForm disabled={!databaseAvailable} />
        </section>
      )}
    </main>
  );
}

