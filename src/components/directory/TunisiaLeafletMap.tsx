"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";

const ObservatoryMap = dynamic(
  () => import("@/components/sections/ObservatoryMap"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-80 rounded-3xl bg-[#F6F1E9]" aria-label="Chargement de la carte" />
    ),
  },
);

type Props = ComponentProps<typeof ObservatoryMap>;

export default function TunisiaLeafletMap(props: Props) {
  return <ObservatoryMap {...props} />;
}
