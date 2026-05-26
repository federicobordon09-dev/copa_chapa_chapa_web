"use client";

import { useEffect } from "react";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import { splits } from "@/data/splits";

export default function SplitsPage() {
  const totalPilots = splits.reduce((acc, s) => acc + s.pilots.length, 0);
  const today = new Date().getDay();
  const isSunday = today === 0;

  useEffect(() => {
    document.title = "Splits Oficiales — Copa Chapa Chapa";
  }, []);

  return (
    <>
      <PageHeader
        eyebrow="Copa Chapa Chapa"
        title="SPLITS OFICIALES"
        subtitle={`${totalPilots} pilotos · ${splits.length} splits`}
      />

      {isSunday ? (
        <section className="section-compact section-dark splits-page">
          <div className="container">
            <div className="splits-grid">
              {splits.map((split, i) => (
                <div
                  className="split-card"
                  key={split.label}
                  data-split={i === 0 ? "top" : "regular"}
                >
                  <div className="split-header">
                    <span className="split-label">{split.label}</span>
                    <span className="split-circuit">
                      {split.pilots.length} pilotos
                    </span>
                  </div>
                  <table className="split-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Piloto</th>
                      </tr>
                    </thead>
                    <tbody>
                      {split.pilots.map((name, j) => (
                        <tr key={name}>
                          <td className="sp-pos">{j + 1}</td>
                          <td>{name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="section section-dark">
          <div className="container">
            <div className="section-header">
              <span className="section-eyebrow">Acceso restringido</span>
              <h2 className="section-title" style={{ color: "var(--color-white)" }}>
                Splits bloqueados
              </h2>
            </div>
            <p style={{ textAlign: "center", color: "var(--color-gray)", maxWidth: 480, margin: "0 auto", lineHeight: 1.6 }}>
              La sección de splits solo está disponible los días domingo.
              Volvé el próximo domingo para consultar la grilla completa de pilotos.
            </p>
          </div>
        </section>
      )}

      <Footer showOrganizadores />
    </>
  );
}
