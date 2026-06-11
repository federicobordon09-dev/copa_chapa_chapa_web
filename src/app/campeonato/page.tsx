import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Campeonato",
};

const points = [
  { pos: "1°", val: "25", cls: "p1" },
  { pos: "2°", val: "22", cls: "p2" },
  { pos: "3°", val: "19", cls: "p3" },
  { pos: "4°", val: "17", cls: "" },
  { pos: "5°", val: "15", cls: "" },
  { pos: "6°", val: "13", cls: "" },
  { pos: "7°", val: "11", cls: "" },
  { pos: "8°", val: "9", cls: "" },
  { pos: "9°", val: "7", cls: "" },
  { pos: "10°", val: "5", cls: "" },
  { pos: "11°", val: "3", cls: "" },
  { pos: "12°", val: "1", cls: "" },
];

const infoBlocks = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Simulador",
    text: "Assetto Corsa — la simulación de conducción más fiel del automovilismo. Física real, circuitos reales, autos reales."
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Formato de Splits",
    text: "Los pilotos se dividen en splits según su nivel. Cada split tiene su propia largada y tabla de resultados. Todos corren, todos suman."
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    title: "4 Fechas · Temporada 1",
    text: "Cuatro citas en circuitos argentinos e internacionales. Los puntos de cada fecha se acumulan en la tabla general."
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5C7 4 6 9 6 9Z" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5C17 4 18 9 18 9Z" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
      </svg>
    ),
    title: "Tabla General",
    text: "Al final de la temporada, el piloto con más puntos acumulados se corona Campeón de la Copa Chapa Chapa."
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: "Online",
    text: "Las carreras se disputan en servidor privado. La organización gestiona la inscripción, los servers y los resultados."
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "+60 Pilotos",
    text: "La primera temporada convocó a más de 80 pilotos de distintas ciudades del país. La grilla más grande hasta la fecha."
  },
];

const rules = [
  { title: "Respeto en pista", desc: "El contacto intencional, el bloqueo agresivo y las maniobras peligrosas están prohibidos. La deportividad es obligatoria." },
  { title: "Puntualidad", desc: "Los pilotos deben estar conectados al servidor 10 minutos antes de la hora de largada. La carrera no espera." },
  { title: "Configuración del auto", desc: "Se permite setup libre dentro de los parámetros del servidor. No se admiten mods o modificaciones externas." },
  { title: "Incidentes y protestas", desc: "Los incidentes se reportan con clip de video al staff dentro de las 24 hs posteriores a la carrera. El fallo de los organizadores es definitivo." },
  { title: "Conexión y abandono", desc: "Un piloto que abandona el servidor durante la carrera sin causa de fuerza mayor no recibe puntos. La desconexión repetida puede resultar en descalificación." },
  { title: "Asistencias de conducción", desc: "Queda a criterio de cada piloto el uso de ABS, TC y ayudas automáticas. El servidor puede tener restricciones específicas por fecha." },
  { title: "Fair play", desc: "Cualquier conducta antideportiva, lenguaje ofensivo o actitud irrespetuosa hacia otros pilotos u organizadores puede resultar en sanción o baja del campeonato." },
  { title: "Inscripción", desc: "La participación queda confirmada únicamente al completar el formulario oficial y recibir confirmación del staff. Los cupos son limitados por split." },
];

export default function CampeonatoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Temporada 1"
        title="El Campeonato"
        subtitle="Formato · Reglamento · Sistema de puntos"
      />

      {/* ¿QUÉ ES? */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">El concepto</span>
            <h2 className="section-title" style={{ color: "var(--color-black)" }}>
              ¿Qué es la Copa Chapa Chapa?
            </h2>
          </div>
          <p style={{ fontSize: "1.05rem", color: "var(--color-gray-dark)", lineHeight: 1.8, maxWidth: 760, marginBottom: "var(--space-lg)" }}>
            La <strong>Copa Chapa Chapa</strong> es un campeonato de simracing disputado en <strong>Assetto Corsa</strong>,
            organizado para reunir pilotos de todo el país en una competencia seria, accesible y emocionante.
            El formato de splits garantiza que cada piloto compita contra rivales de nivel similar,
            haciendo cada fecha un duelo parejo del principio al final.
          </p>
          <div className="info-grid">
            {infoBlocks.map((b) => (
              <div className="info-block" key={b.title}>
                <span className="info-block-icon">{b.icon}</span>
                <div className="info-block-title">{b.title}</div>
                <div className="info-block-text">{b.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SISTEMA DE PUNTOS */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Puntuación</span>
            <h2 className="section-title">Sistema de Puntos</h2>
          </div>
          <p style={{ fontSize: "var(--fs-small)", color: "var(--color-gray)", marginBottom: "var(--space-md)", letterSpacing: "0.04em", lineHeight: 1.7, maxWidth: 600 }}>
            Los puntos se otorgan a los 12 primeros clasificados de cada split.
            Cada split suma a la tabla general acumulada de la temporada.
          </p>
          <div className="puntos-grid" style={{ gap: "0.5rem", flexWrap: "wrap" }}>
            {points.map((p) => (
              <div className={`punto-badge ${p.cls}`} key={p.pos}>
                <span className="punto-pos">{p.pos}</span>
                <span className="punto-val">{p.val}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REGLAMENTO */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Normas</span>
            <h2 className="section-title" style={{ color: "var(--color-black)" }}>
              Reglamento
            </h2>
          </div>
          <div className="reglamento-list">
            {rules.map((r) => (
              <div className="reglamento-item" key={r.title}>
                <p><strong>{r.title}</strong> {r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ORGANIZADORES */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-header" style={{ textAlign: "center" }}>
            <span className="section-eyebrow">Detrás del campeonato</span>
            <h2 className="section-title">Los Organizadores</h2>
          </div>
          <div className="org-grid">
            <div className="org-card">
              <img src="/assets/images/logo_tomika.png" alt="Tomikka" className="org-avatar" />
              <div className="org-name">Tomikka</div>
              <span className="org-role">Fundador &amp; Organizador</span>
              <p className="org-desc" />
              <a href="https://www.twitch.tv/tomikka" target="_blank" rel="noopener noreferrer" className="org-twitch">
                <svg className="twitch-icon" viewBox="0 0 24 24"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" /></svg>
                twitch.tv/tomikka
              </a>
            </div>
            <div className="org-card">
              <img src="/assets/images/logo_cunial.png" alt="Maticunial" className="org-avatar" />
              <div className="org-name">Maticunial</div>
              <span className="org-role">Fundador &amp; Organizador</span>
              <p className="org-desc" />
              <a href="https://www.twitch.tv/maticunial" target="_blank" rel="noopener noreferrer" className="org-twitch">
                <svg className="twitch-icon" viewBox="0 0 24 24"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" /></svg>
                twitch.tv/maticunial
              </a>
            </div>
          </div>
        </div>
      </section>


      <Footer showOrganizadores />
    </>
  );
}
