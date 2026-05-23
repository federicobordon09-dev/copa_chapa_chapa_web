import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Copa Chapa Chapa | Simracing Championship",
  description: "Copa Chapa Chapa — Campeonato oficial de Assetto Corsa",
  icons: {
    icon: "/assets/images/isotipo_cc.png",
    apple: "/assets/images/isotipo_cc.png",
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
