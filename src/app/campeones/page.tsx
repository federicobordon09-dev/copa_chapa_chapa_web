"use client";

import { useState, useEffect } from "react";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";

const champions = [
  {
    temporada: "Temporada 1",
    year: "2026",
    nombre: "Franco Perez",
    numero: "02",
    equipo: "Berna Racing Team",
    puntos: 64,
    podios: 2,
    victorias: 0,
    mejorPosicion: "2°",
    totalFechas: 4,
    resultados: [
      { fecha: "Comodoro Rivadavia", split: "S1", pos: "—", pts: 0 },
      { fecha: "Comodoro Rivadavia", split: "S2", pos: "2°", pts: 19 },
      { fecha: "Buenos Aires", split: "S1", pos: "4°", pts: 17 },
      { fecha: "Buenos Aires", split: "S2", pos: "—", pts: 0 },
      { fecha: "La Pampa", split: "S1", pos: "8°", pts: 9 },
      { fecha: "La Pampa", split: "S2", pos: "—", pts: 0 },
      { fecha: "La Plata", split: "S1", pos: "2°", pts: 19 },
    ],
    bio: "Franco Perez se coronó como el primer campeón de la Copa Chapa Chapa con una actuación consistente a lo largo de las 4 fechas. Aunque no logró ninguna victoria, su regularidad y capacidad de sumar puntos en cada fecha lo llevaron al primer puesto con 64 puntos. Sus mejores rendimientos fueron en Comodoro Rivadavia S2 y La Plata S1, donde logró sendos segundos puestos que fueron clave para su consagración.",
  },
];

function TrophySvg({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 8h32v4H16z" fill="currentColor" opacity="0.3" />
      <path d="M20 12h24v20c0 8-5.37 14-12 14s-12-6-12-14V12z" fill="currentColor" />
      <path d="M20 16c-6 0-10 4-10 10s4 10 10 10h2v-6c-3.31 0-6-2.69-6-6s2.69-6 6-6v-8z" fill="currentColor" opacity="0.6" />
      <path d="M44 16c6 0 10 4 10 10s-4 10-10 10h-2v-6c3.31 0 6-2.69 6-6s-2.69-6-6-6v-8z" fill="currentColor" opacity="0.6" />
      <rect x="26" y="46" width="12" height="4" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="22" y="50" width="20" height="5" rx="2" fill="currentColor" />
      <path d="M32 20l2.5 5 5.5.8-4 3.9.9 5.3-4.9-2.6-4.9 2.6.9-5.3-4-3.9 5.5-.8z" fill="var(--color-black)" opacity="0.4" />
    </svg>
  );
}

function CloseSvg() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function CampeonesPage() {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [active]);

  return (
    <>
      <PageHeader
        eyebrow="Historial"
        title="Campeones"
        subtitle="Los pilotos que se coronaron en cada temporada"
      />

      <section className="section">
        <div className="container">
          <div className="champions-grid">
            {champions.map((champ, i) => (
              <button
                className="champion-card"
                key={champ.temporada}
                onClick={() => setActive(i)}
              >
                <div className="champion-card-trophy">
                  <TrophySvg />
                </div>
                <div className="champion-card-content">
                  <span className="champion-card-season">{champ.temporada} · {champ.year}</span>
                  <h2 className="champion-card-name">{champ.nombre}</h2>
                  <div className="champion-card-tags">
                    <span>#{champ.numero}</span>
                    <span>{champ.equipo}</span>
                  </div>
                  <div className="champion-card-pts">
                    <span className="champion-card-pts-val">{champ.puntos}</span>
                    <span className="champion-card-pts-label">pts</span>
                  </div>
                </div>
                <div className="champion-card-arrow">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {active !== null && (
        <div className="champion-modal-overlay" onClick={() => setActive(null)}>
          <div className="champion-modal" onClick={(e) => e.stopPropagation()}>
            <button className="champion-modal-close" onClick={() => setActive(null)}>
              <CloseSvg />
            </button>

            <div className="champion-modal-header">
              <TrophySvg className="champion-modal-trophy" />
              <div>
                <span className="champion-modal-season">{champions[active].temporada} · {champions[active].year}</span>
                <h2 className="champion-modal-name">{champions[active].nombre}</h2>
                <div className="champion-modal-tags">
                  <span>#{champions[active].numero}</span>
                  <span>{champions[active].equipo}</span>
                </div>
              </div>
            </div>

            <div className="champion-modal-stats">
              <div className="champion-modal-stat">
                <span className="champion-modal-stat-val">{champions[active].puntos}</span>
                <span className="champion-modal-stat-label">Puntos</span>
              </div>
              <div className="champion-modal-stat">
                <span className="champion-modal-stat-val">{champions[active].podios}</span>
                <span className="champion-modal-stat-label">Podios</span>
              </div>
              <div className="champion-modal-stat">
                <span className="champion-modal-stat-val">{champions[active].victorias}</span>
                <span className="champion-modal-stat-label">Victorias</span>
              </div>
              <div className="champion-modal-stat">
                <span className="champion-modal-stat-val">{champions[active].mejorPosicion}</span>
                <span className="champion-modal-stat-label">Mejor Pos.</span>
              </div>
            </div>

            <div className="champion-modal-divider" />

            <p className="champion-modal-bio">{champions[active].bio}</p>

            <div className="champion-modal-resultados">
              <h3 className="champion-modal-resultados-title">Resultados por fecha</h3>
              <div className="champion-modal-resultados-list">
                {champions[active].resultados.map((r, j) => (
                  <div className={`champion-modal-resultado ${r.pts > 0 ? "sumo" : "no-sumo"}`} key={j}>
                    <div className="champion-modal-resultado-info">
                      <span className="champion-modal-resultado-fecha">{r.fecha}</span>
                      <span className="champion-modal-resultado-split">{r.split}</span>
                    </div>
                    <div className="champion-modal-resultado-pos">{r.pos}</div>
                    <div className="champion-modal-resultado-pts">{r.pts > 0 ? `${r.pts} pts` : "—"}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer showOrganizadores />
    </>
  );
}
