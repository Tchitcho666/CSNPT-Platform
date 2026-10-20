import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ConfidentialitePage() {
  return (
    <>
    <Navbar />
    <main className="min-h-screen bg-[#f7f4ed] px-6 py-16 text-[#142522] md:px-10 md:py-24">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#287d78]">
          CSNPT · Informations
        </p>
        <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">
          Confidentialité / الخصوصية
        </h1>

        <div className="mt-8 rounded-2xl border border-[#ded9cf] bg-[#f0ede5] p-5 text-sm font-bold text-[#8a543f]">
          BROUILLON — la notice définitive est en attente de validation juridique et de gouvernance.
        </div>

        <section lang="fr" className="mt-10 space-y-4 leading-7">
          <h2 className="text-2xl font-bold">Brouillon — français</h2>
          <p>
            Cette page est un document de travail. Elle ne constitue pas la notice définitive de confidentialité de la CSNPT.
          </p>
          <p>
            Principe de préparation : ne demander que les informations nécessaires à la demande concernée. Les finalités précises, les destinataires, les modalités de traitement et toute durée applicable restent à valider avant publication de la notice définitive.
          </p>
          <p>
            Le contenu définitif doit être examiné et approuvé par les responsables compétents de la CSNPT avant d’être présenté comme une information institutionnelle validée.
          </p>
        </section>

        <section lang="ar" dir="rtl" className="mt-12 space-y-4 text-right leading-8">
          <h2 className="text-2xl font-bold">مسودة — العربية</h2>
          <p>
            هذه الصفحة وثيقة عمل، وليست إشعار الخصوصية النهائي للغرفة النقابية الوطنية لأخصائيي علم النفس الحركي التونسيين.
          </p>
          <p>
            مبدأ الإعداد: طلب المعلومات الضرورية فقط لمعالجة الطلب المعني. وتبقى الأغراض الدقيقة والجهات التي قد تتلقى المعلومات وكيفية معالجتها وأي مدة للاحتفاظ بها أموراً تحتاج إلى التحقق قبل نشر الإشعار النهائي.
          </p>
          <p>
            يجب أن يراجع المسؤولون المختصون في الغرفة النقابية هذا المحتوى ويوافقوا عليه قبل تقديمه باعتباره معلومة مؤسساتية نهائية.
          </p>
        </section>
      </div>
    </main>
    <Footer />
    </>
  );
}
