import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

const siteUrl = "https://copachapachapa.vercel.app";

export const metadata: Metadata = {
  title: "Copa Chapa Chapa",
  description:
    "Copa Chapa Chapa — Campeonato oficial de simracing en Assetto Corsa. +60 pilotos, 4 fechas, formato de splits. Competí y sumate a la grilla más grande del país.",
  keywords: [
    "simracing",
    "assetto corsa",
    "copa chapa chapa",
    "campeonato simracing",
    "carreras virtuales",
    "argentina simracing",
    "competicion automovilismo virtual",
  ],
  authors: [{ name: "Copa Chapa Chapa" }],
  creator: "Copa Chapa Chapa",
  publisher: "Copa Chapa Chapa",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: siteUrl,
    siteName: "Copa Chapa Chapa",
    title: "Copa Chapa Chapa",
    description:
      "Campeonato oficial de simracing en Assetto Corsa. +60 pilotos, formato de splits, 4 fechas. Competí en la copa más picante del país.",
    images: [
      {
        url: "/assets/images/banner.webp",
        width: 1920,
        height: 1080,
        alt: "Copa Chapa Chapa Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Copa Chapa Chapa",
    description:
      "Campeonato oficial de simracing en Assetto Corsa. +60 pilotos, 4 fechas.",
    images: ["/assets/images/banner.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/assets/images/isotipo_cc.webp",
    apple: "/assets/images/isotipo_cc.webp",
    shortcut: "/assets/images/isotipo_cc.webp",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
