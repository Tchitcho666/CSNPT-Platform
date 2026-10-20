import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Politique de confidentialité | CSNPT',
  description: 'Informations sur la collecte, l’utilisation, la conservation et la protection de vos données personnelles par le CSNPT.',
  openGraph: {
    title: 'Politique de confidentialité | CSNPT',
    description: 'Comment le CSNPT traite et protège vos données personnelles.',
    images: ['/images/editorial/community-tunisia-gemini.png'],
  },
};

export default function ConfidentialitePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f7f4ed] px-6 py-16 text-[#142522] md:px-10 md:py-24">
        <article className="mx-auto max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#287d78]">CSNPT · Informations</p>
          <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">Politique de confidentialité</h1>
          <p className="mt-5 text-sm text-[#68716e]">Mise à jour : 20 octobre 2026</p>

          <div lang="fr" className="mt-10 space-y-8 leading-7">
            <section className="space-y-3">
              <h2 className="text-2xl font-bold">Responsable et champ d’application</h2>
              <p>La Chambre Syndicale Nationale des Psychomotriciens Tunisiens (CSNPT) est responsable des traitements décrits dans cette notice pour les demandes reçues sur son site. Cette politique concerne notamment les formulaires de contact et d’adhésion, ainsi que les pièces justificatives transmises avec une demande.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold">Données collectées et finalités</h2>
              <p>Selon le formulaire utilisé, la CSNPT peut recueillir votre nom, vos coordonnées, votre situation professionnelle, le contenu de votre message et les renseignements nécessaires au traitement de votre demande.</p>
              <p>Dans le cadre d’une demande d’adhésion, les documents transmis peuvent inclure un diplôme, une patente et un extrait du Registre National des Entreprises (RNE). Ces données et documents servent uniquement à recevoir, instruire et suivre la demande, vérifier les informations professionnelles utiles et communiquer avec vous à son sujet. Ils ne sont pas utilisés à des fins publicitaires.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold">Accès et conservation</h2>
              <p>L’accès aux demandes et aux pièces justificatives est limité aux personnes habilitées au sein de la CSNPT qui en ont besoin pour traiter le dossier. Les fichiers sont conservés dans un espace à accès restreint. La CSNPT met en œuvre des mesures destinées à prévenir leur accès, leur perte ou leur divulgation non autorisés.</p>
              <p>Les données relatives à une demande et les pièces justificatives associées sont conservées pendant la durée nécessaire à son instruction et à son suivi, puis supprimées ou rendues inaccessibles au plus tard cinq ans après la clôture du dossier, sauf obligation légale ou nécessité de conservation pour la constatation, l’exercice ou la défense de droits.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold">Destinataires</h2>
              <p>La CSNPT ne vend pas vos données et ne les communique pas à des tiers à des fins commerciales. Elles sont destinées aux personnes habilitées de la CSNPT. Pour l’acheminement des messages du formulaire de contact, un prestataire technique de courrier électronique peut traiter les informations nécessaires à cet envoi, uniquement pour fournir ce service. Les pièces justificatives d’adhésion ne sont pas jointes à ces messages.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold">Vos droits et demandes</h2>
              <p>Conformément à la législation tunisienne relative à la protection des données personnelles, notamment la loi organique n° 2004-63 du 27 juillet 2004, vous pouvez demander l’accès aux données vous concernant et leur rectification lorsqu’elles sont inexactes ou incomplètes. Vous pouvez également demander leur mise à jour ou leur effacement dans les cas prévus par la loi.</p>
              <p>Pour exercer ces droits ou poser une question sur vos données, écrivez à <a className="font-semibold text-[#287d78] underline" href="mailto:contact@csnpt.tn">contact@csnpt.tn</a> en précisant l’objet de votre demande. Vous pouvez également vous adresser à l’Instance Nationale de Protection des Données Personnelles (INPDP).</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold">Contact</h2>
              <p>Pour toute question relative à cette politique ou au traitement de vos données, contactez la CSNPT à l’adresse <a className="font-semibold text-[#287d78] underline" href="mailto:contact@csnpt.tn">contact@csnpt.tn</a>.</p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
