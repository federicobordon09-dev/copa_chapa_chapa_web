import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Copa Chapa Chapa",
};

export default function CopaChapaChapaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Temporada finalizada"
        title="Copa Chapa Chapa"
        subtitle="Próximamente · Nueva temporada en preparación"
      />

      {/* PROXIMAMENTE */}
      <section
        className="section section-dark"
        style={{ minHeight: "50vh", display: "flex", alignItems: "center" }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "rgba(245,196,0,0.08)",
              border: "2px solid rgba(245,196,0,0.2)",
              marginBottom: "1.5rem",
              fontSize: "2.2rem",
            }}
          >
            🏁
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 8vw, 5rem)",
              color: "var(--color-yellow)",
              lineHeight: 1,
              letterSpacing: "0.04em",
              marginBottom: "0.75rem",
            }}
          >
            PRÓXIMAMENTE
          </h2>
          <p
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "var(--fs-body)",
              color: "var(--color-gray)",
              letterSpacing: "0.04em",
              lineHeight: 1.7,
              maxWidth: 480,
              margin: "0 auto var(--space-md)",
            }}
          >
            La tabla general, los resultados y el campeonato de equipos vuelven
            con la próxima temporada.
          </p>
          <div
            style={{
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
              borderRadius: 999,
              marginBottom: "1.5rem",
            }}
          >
            <span style={{ fontSize: "0.6rem" }}>●</span>
            Temporada 1 finalizada
          </div>
          <div>
            <Link
              href="/campeones"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "var(--fs-label)",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--color-black)",
                background: "var(--color-yellow)",
                padding: "0.7rem 1.6rem",
                borderRadius: 999,
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Ver al campeón
            </Link>
          </div>
        </div>
      </section>

      <Footer showOrganizadores />
    </>
  );
}
