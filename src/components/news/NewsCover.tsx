'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function NewsCover({ src, className = '' }: { src?: string | null; className?: string }) {
  const [failed, setFailed] = useState(!src);
  if (failed || !src) return <div aria-hidden="true" className={`relative overflow-hidden bg-[#0E5A5F] ${className}`}>
    <svg className="absolute inset-0 h-full w-full opacity-50" viewBox="0 0 600 360" fill="none" preserveAspectRatio="xMidYMid slice">
      <path d="M-40 300C90 280 85 65 255 65s160 240 390 170" stroke="#F6F1E9" strokeWidth="3" />
      <path d="M-20 340C125 310 130 115 280 115s170 220 360 150" stroke="#C4623B" strokeWidth="3" />
      <circle cx="255" cy="65" r="12" fill="#C4623B" />
      <path d="M450 20c-60 38-64 90-8 112 6-56 9-83 8-112Zm20 15c54 38 60 84 9 109-10-52-12-77-9-109Z" fill="#B7C8A6" fillOpacity=".65" />
    </svg>
  </div>;
  return <Image src={src} alt="" width={1200} height={720} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px" unoptimized onError={() => setFailed(true)} className={`w-full object-cover ${className}`} />;
}
