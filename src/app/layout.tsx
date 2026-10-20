import type { Metadata } from "next";
import SensoryModeControl from "@/components/SensoryModeControl";
import SensoryChatbot from "@/components/chatbot/SensoryChatbot";
import SmoothScroll from "@/components/layout/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  title: "CSNPT — Chambre Syndicale Nationale des Psychomotriciens Tunisiens",
  description:
    "Plateforme professionnelle de la Chambre Syndicale Nationale des Psychomotriciens Tunisiens.",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      dir="ltr"
      data-scroll-behavior="smooth"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll>
          {children}
          <SensoryModeControl />
          <SensoryChatbot />
        </SmoothScroll>
      </body>
    </html>
  );
}
