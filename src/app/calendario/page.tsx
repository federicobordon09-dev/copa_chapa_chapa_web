import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Countdown from "@/components/Countdown";

import Footer from "@/components/Footer";
import { calendarEntries } from "@/data/calendar";

export const metadata: Metadata = {
  title: "Calendario",
  description:
    "Calendario de la Copa Chapa Chapa 2026. 4 fechas de simracing en Assetto Corsa en circuitos argentinos e internacionales.",
};

export default function CalendarioPage() {
  const doneCount = calendarEntries.filter((e) => e.status === "done").length;
  const remainingCount = calendarEntries.filter((e) => e.status !== "done").length;

  return (
    <>
      <PageHeader
        eyebrow="Temporada 1"
        title="Calendario"
        subtitle={`4 Fechas · ${doneCount} Disputadas · ${remainingCount} Por correr`}
      />

      {/* PRÓXIMA CARRERA */}
      <div className="next-race">
        <div className="container">
          <div className="next-race-inner">
            <div className="next-race-details">
              <div className="next-race-label">⚑ Próxima carrera</div>
              <div className="next-race-name">Fecha 4 — La Plata</div>
              <div className="next-race-info">Lunes 1 de Junio · 21:30 HS</div>
            </div>
            <Countdown />
          </div>
        </div>
      </div>

      {/* LISTA DE FECHAS */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Fixture completo</span>
            <h2 className="section-title">Todas las fechas</h2>
          </div>
          <div className="calendar-list">
            {calendarEntries.map((entry) => (
              <div className={`calendar-item ${entry.status}`} key={entry.num}>
                <div className="cal-num">{entry.num}</div>
                <div className="cal-info">
                  <div className="cal-fecha-label">{entry.fechaLabel}</div>
                  <div className="cal-name">{entry.name}</div>
                  <div className="cal-circuit">
                    <strong>{entry.circuit}</strong> · {entry.location}
                  </div>
                  <div className="cal-splits">
                    {entry.splits.map((s, i) => (
                      <span className="cal-split-tag" key={i}>{s}</span>
                    ))}
                  </div>
                </div>
                <span className={`cal-status status-${entry.status}`}>
                  {entry.statusLabel}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INFO DEL FORMATO */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Cómo funciona</span>
            <h2 className="section-title" style={{ color: "var(--color-black)" }}>
              Formato de cada fecha
            </h2>
          </div>
          <div className="info-grid">
            <div className="info-block">
              <span className="info-block-icon">🕘</span>
              <div className="info-block-title">Horario</div>
              <div className="info-block-text">
                Las carreras se disputan los lunes a las 21:30 hs (hora Argentina, ART UTC-3). Conectarse al servidor 10 minutos antes.
              </div>
            </div>
            <div className="info-block">
              <span className="info-block-icon">✂️</span>
              <div className="info-block-title">División en Splits</div>
              <div className="info-block-text">
                Antes de cada fecha, los pilotos se agrupan en splits según tiempos de clasificación. Cada split corre por separado con su propia grilla.
              </div>
            </div>
            <div className="info-block">
              <span className="info-block-icon">📊</span>
              <div className="info-block-title">Puntos por fecha</div>
              <div className="info-block-text">
                Los 12 primeros de cada split suman puntos a la tabla general. El ganador se lleva 25 pts y el 12° se lleva 1 pt. Cada punto cuenta.
              </div>
            </div>
            <div className="info-block">
              <span className="info-block-icon">🔴</span>
              <div className="info-block-title">Transmisión en vivo</div>
              <div className="info-block-text">
                Las fechas se transmiten en vivo desde los canales de Twitch de los organizadores. Seguí la acción en tiempo real.
              </div>
            </div>
          </div>
          <div style={{ marginTop: "var(--space-md)", display: "flex", gap: "var(--space-sm)", flexWrap: "wrap" }}>
            <a href="https://www.twitch.tv/tomikka" target="_blank" rel="noopener noreferrer"
               style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-heading)", fontSize: "var(--fs-small)", fontWeight: 700, letterSpacing: "0.06em", color: "#9146ff", background: "rgba(145,70,255,0.08)", border: "1px solid rgba(145,70,255,0.2)", padding: "0.5rem 1.2rem", borderRadius: 999, transition: "all 0.2s ease", textDecoration: "none" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#9146ff"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/></svg>
              Ver en Twitch · Tomikka
            </a>
            <a href="https://www.twitch.tv/maticunial" target="_blank" rel="noopener noreferrer"
               style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-heading)", fontSize: "var(--fs-small)", fontWeight: 700, letterSpacing: "0.06em", color: "#9146ff", background: "rgba(145,70,255,0.08)", border: "1px solid rgba(145,70,255,0.2)", padding: "0.5rem 1.2rem", borderRadius: 999, transition: "all 0.2s ease", textDecoration: "none" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#9146ff"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/></svg>
              Ver en Twitch · Maticunial
            </a>
          </div>
        </div>
      </section>

      <Footer showOrganizadores />
    </>
  );
}
