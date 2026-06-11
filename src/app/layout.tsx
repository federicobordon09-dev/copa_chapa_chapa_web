import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const siteUrl = "https://copachapachapa.vercel.app";

export const metadata: Metadata = {
  title: "Copa Chapa Chapa",
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
  verification: {
    google: "eeKY2FPAJTtT2ojEPqhX61phsFlxYKvgaQqV2MORKz0",
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
    <html lang="es" data-scroll-behavior="smooth">
      <body>
        <Navbar />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
