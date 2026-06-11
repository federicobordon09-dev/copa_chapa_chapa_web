import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

import Footer from "@/components/Footer";
import { calendarEntries } from "@/data/calendar";

export const metadata: Metadata = {
  title: "Calendario",
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
              <span className="info-block-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </span>
              <div className="info-block-title">Horario</div>
              <div className="info-block-text">
                Las carreras se disputan los lunes a las 21:30 hs (hora Argentina, ART UTC-3). Conectarse al servidor 10 minutos antes.
              </div>
            </div>
            <div className="info-block">
              <span className="info-block-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </span>
              <div className="info-block-title">División en Splits</div>
              <div className="info-block-text">
                Antes de cada fecha, los pilotos se agrupan en splits según tiempos de clasificación. Cada split corre por separado con su propia grilla.
              </div>
            </div>
            <div className="info-block">
              <span className="info-block-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </span>
              <div className="info-block-title">Puntos por fecha</div>
              <div className="info-block-text">
                Los 12 primeros de cada split suman puntos a la tabla general. El ganador se lleva 25 pts y el 12° se lleva 1 pt. Cada punto cuenta.
              </div>
            </div>
            <div className="info-block">
              <span className="info-block-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </span>
              <div className="info-block-title">Transmisión en vivo</div>
              <div className="info-block-text">
                Las fechas se transmiten en vivo desde los canales de Twitch de los organizadores. Seguí la acción en tiempo real.
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
