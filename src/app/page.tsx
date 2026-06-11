import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { top5Preview } from "@/data/standings";

export const metadata: Metadata = {
  title: "Inicio",
};

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg">
          <img
            src="/assets/images/banner.webp"
            alt="Copa Chapa Chapa Banner"
            className="hero-bg-img"
          />
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              Assetto Corsa &nbsp;·&nbsp; Temporada 1
            </div>
            <h1 className="hero-title">
              Copa<br />
              <span>Chapa</span>
              Chapa
            </h1>
            <p className="hero-subtitle">
              Acá se separan los que están para competir de los que no lo están
            </p>
            <div className="hero-actions">
              <Link href="/copa-chapa-chapa" className="btn btn-primary">
                Ver Copa Chapa Chapa →
              </Link>
              <Link href="/campeonato" className="btn btn-outline">
                Conocé el campeonato
              </Link>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-number">+60</span>
                <span className="hero-stat-label">Pilotos</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-number">4</span>
                <span className="hero-stat-label">Fechas</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-number">4</span>
                <span className="hero-stat-label">Circuitos</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-number">Temporada 1</span>
                <span className="hero-stat-label">Temporada</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STANDINGS PREVIEW */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Temporada 1</span>
            <h2 className="section-title">Clasificación General</h2>
          </div>

          <table className="standings-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Piloto</th>
                <th>Auto</th>
                <th style={{ textAlign: "right" }}>Pts</th>
              </tr>
            </thead>
            <tbody>
              {top5Preview.map((row, i) => (
                <tr key={row.pos}>
                  <td className={`standings-pos${i < 3 ? " top-3" : ""}`}>
                    {String(row.pos).padStart(2, "0")}
                  </td>
                  <td>
                    <div className="standings-driver">{row.name.toUpperCase()}</div>
                    <div className="standings-team" />
                  </td>
                  <td className="standings-team">Gol G3 · Corsa</td>
                  <td className="standings-pts">{row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: "var(--space-md)" }}>
            <Link href="/copa-chapa-chapa" className="btn btn-outline">
              Ver clasificación completa →
            </Link>
          </div>
        </div>
      </section>

      <Footer showOrganizadores={false} />
    </>
  );
}