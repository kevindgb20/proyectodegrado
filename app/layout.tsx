import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IA Iluminación · Traducción sonora en iluminación escénica",
  description:
    "Experiencia de traducción sonora en iluminación escénica apoyada con inteligencia artificial: de la BOSS RC-505 MK2 a la luz DMX.",
};

export const viewport: Viewport = {
  themeColor: "#0d0f14",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
