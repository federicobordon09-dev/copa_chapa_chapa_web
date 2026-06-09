"use client";

import { useEffect } from "react";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";

export default function SplitsPage() {
  useEffect(() => {
    document.title = "Splits Oficiales — Copa Chapa Chapa";
  }, []);

  return (
    <>
      <PageHeader
        eyebrow="Copa Chapa Chapa"
        title="SPLITS OFICIALES"
        subtitle="Temporada 1 · Finalizada"
      />

      <section className="section section-dark" style={{ minHeight: "50vh", display: "flex", alignItems: "center" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "rgba(245,196,0,0.08)",
            border: "2px solid rgba(245,196,0,0.2)",
            marginBottom: "1.5rem",
            fontSize: "2.2rem"
          }}>
            🔒
          </div>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--fs-h1)",
            color: "var(--color-white)",
            lineHeight: 1.1,
            marginBottom: "0.75rem"
          }}>
            Sección bloqueada
          </h2>
          <p style={{
            fontFamily: "var(--font-heading)",
            fontSize: "var(--fs-body)",
            color: "var(--color-gray)",
            letterSpacing: "0.04em",
            lineHeight: 1.7,
            maxWidth: 480,
            margin: "0 auto var(--space-md)"
          }}>
            La información de splits solo está disponible durante la temporada activa.
          </p>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            fontFamily: "var(--font-heading)",
            fontSize: "var(--fs-label)",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--color-yellow)",
            background: "rgba(245,196,0,0.1)",
            border: "1px solid rgba(245,196,0,0.25)",
            padding: "0.5rem 1.2rem",
            borderRadius: 999
          }}>
            <span style={{ fontSize: "0.6rem" }}>●</span>
            Temporada 1 finalizada
          </div>
        </div>
      </section>

      <Footer showOrganizadores />
    </>
  );
}
