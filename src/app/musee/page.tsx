import SensoryMuseum from '@/components/musee/SensoryMuseum';
import MuseumAudioControl from '@/components/musee/MuseumAudioControl';

export default function MuseumPage() {
  return (
    <main className="relative min-h-screen bg-[#F7F3EB] text-[#14272A]">
      <div className="relative h-[500vh]">
        <SensoryMuseum />
      </div>
      <div className="fixed right-4 top-4 z-50 flex flex-wrap justify-end gap-2 sm:right-8 sm:top-6">
        <MuseumAudioControl />
      </div>
    </main>
  );
}
