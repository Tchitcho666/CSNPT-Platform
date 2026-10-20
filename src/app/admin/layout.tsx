import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Administration | CSNPT',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="min-h-screen bg-[#F7F3EB] text-[#14272A]">{children}</div>;
}
