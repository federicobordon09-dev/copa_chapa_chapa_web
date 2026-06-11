import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campeones",
};

export default function CampeonesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
