"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import ScrollReveal from "@/components/ScrollReveal";
import Footer from "@/components/Footer";
import { standings, races } from "@/data/standings";

function posClass(pos: number) {
  if (pos === 1) return "pos-1";
  if (pos === 2) return "pos-2";
  if (pos === 3) return "pos-3";
  return "";
}

function spClass(pos: number) {
  if (pos === 1) return "sp-gold";
  if (pos === 2) return "sp-silver";
  if (pos === 3) return "sp-bronze";
  return "";
}

export default function ClasificacionPage() {
  const [activeTab, setActiveTab] = useState(races[0].id);

  return (
    <>
      <PageHeader
        eyebrow="Temporada 2026"
        title="Clasificación"
        subtitle="2 Fechas disputadas · 4 Splits completados"
      />

      {/* PODIO */}
      <section className="podio-section section-dark">
        <div className="container">
          <div className="podio">
            <div className="podio-card podio-2">
              <div className="podio-pos">2</div>
              <div className="podio-name">Franco Perez</div>
              <div className="podio-pts">36 <span>pts</span></div>
              <div className="podio-block podio-block-2" />
            </div>
            <div className="podio-card podio-1">
              <div className="podio-crown">👑</div>
              <div className="podio-pos">1</div>
              <div className="podio-name">Damian Ludueña</div>
              <div className="podio-pts">44 <span>pts</span></div>
              <div className="podio-block podio-block-1" />
            </div>
            <div className="podio-card podio-3">
              <div className="podio-pos">3</div>
              <div className="podio-name">Santino Casciano</div>
              <div className="podio-pts">35 <span>pts</span></div>
              <div className="podio-block podio-block-3" />
            </div>
          </div>
        </div>
      </section>

      {/* TABLA GENERAL */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Acumulado</span>
            <h2 className="section-title" style={{ color: "var(--color-black)" }}>
              Tabla General
            </h2>
          </div>
          <div className="table-wrapper">
            <table className="cls-table">
              <thead>
                <tr>
                  <th className="col-pos">#</th>
                  <th className="col-driver">Piloto</th>
                  <th className="col-split">Split 1<br /><span /></th>
                  <th className="col-split">Split 2<br /><span /></th>
                  <th className="col-split">Split 1<br /><span /></th>
                  <th className="col-split">Split 2<br /><span /></th>
                  <th className="col-total">Total</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((row) => (
                  <tr key={row.pos} className={row.pos <= 3 ? "row-top3" : ""}>
                    <td className={`col-pos ${posClass(row.pos)}`}>
                      {String(row.pos).padStart(2, "0")}
                    </td>
                    <td className="col-driver">
                      <span className="driver-name">{row.name}</span>
                    </td>
                    <td className="col-split">{row.f1s1}</td>
                    <td className="col-split">{row.f1s2}</td>
                    <td className="col-split">{row.f2s1}</td>
                    <td className="col-split">{row.f2s2}</td>
                    <td className="col-total">{row.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="table-note">
            — Sin datos registrados para esa fecha/split. Los puntos con — indican
            que el piloto no corrió o no tiene resultado cargado aún.
          </p>
        </div>
      </section>

      {/* RESULTADOS POR FECHA */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Detalle por fecha</span>
            <h2 className="section-title">Resultados</h2>
          </div>
          <div className="tabs">
            {races.map((r) => (
              <button
                key={r.id}
                className={`tab-btn${activeTab === r.id ? " active" : ""}`}
                onClick={() => setActiveTab(r.id)}
              >
                {r.label}
              </button>
            ))}
          </div>
          {races.map((r) => (
            <div
              key={r.id}
              className={`tab-content${activeTab === r.id ? " active" : ""}`}
            >
              <div className="splits-grid">
                {r.splits.map((split) => (
                  <div className="split-card" key={split.label}>
                    <div className="split-header">
                      <span className="split-label">{split.label}</span>
                      <span className="split-circuit">
                        {r.id === "bsas" ? "Buenos Aires" : "Comodoro"}
                      </span>
                    </div>
                    <table className="split-table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Piloto</th>
                          <th>Pts</th>
                        </tr>
                      </thead>
                      <tbody>
                        {split.results.map((res) => (
                          <tr key={res.pos}>
                            <td className={`sp-pos ${spClass(res.pos)}`}>
                              {res.pos}°
                            </td>
                            <td>{res.name}</td>
                            <td className="sp-pts">{res.pts}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer showOrganizadores={false} />
    </>
  );
}
