"use client";

import { useEffect } from "react";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import { splits } from "@/data/splits";

export default function SplitsPage() {
  const totalPilots = splits.reduce((acc, s) => acc + s.pilots.length, 0);

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

      <Footer showOrganizadores />
    </>
  );
}
