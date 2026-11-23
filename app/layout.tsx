import type { Metadata, Viewport } from "next";
import { Michroma, Montserrat } from "next/font/google";
import "./globals.css";

const display = Michroma({ weight: "400", subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Montserrat({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], style: ["normal", "italic"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  title: "Experiencia de traducción sonora en iluminación escénica",
  description:
    "Experiencia de traducción sonora en iluminación escénica apoyada con inteligencia artificial. Kevin Daniel Guzmán Bernal · Universidad Colegio Mayor de Cundinamarca · Diseño Digital y Multimedia.",
};

export const viewport: Viewport = {
  themeColor: "#050507",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
