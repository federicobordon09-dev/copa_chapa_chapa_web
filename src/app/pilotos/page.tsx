import PageHeader from "@/components/PageHeader";
import ScrollReveal from "@/components/ScrollReveal";
import Footer from "@/components/Footer";
import { drivers, top3 } from "@/data/drivers";

const medals = ["👑", "", ""];
const medalColors = ["rgba(245,196,0,0.12),rgba(245,196,0,0.03)", "var(--color-dark-mid)", "var(--color-dark-mid)"];
const medalBorders = ["rgba(245,196,0,0.3)", "rgba(192,192,192,0.15)", "rgba(205,127,50,0.15)"];
const medalBarColors = ["var(--color-yellow)", "#c0c0c0", "#cd7f32"];
const medalPosColors = ["var(--color-yellow)", "#c0c0c0", "#cd7f32"];
const medalPtsColors = ["var(--color-yellow)", "#c0c0c0", "#cd7f32"];

export default function PilotosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Temporada 2026"
        title="Pilotos"
        subtitle="34 pilotos · 4 splits · 2 fechas disputadas"
      />

      {/* TOP 3 */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Líderes</span>
            <h2 className="section-title">Top 3 General</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", gap: "var(--space-md)", maxWidth: 860 }}>
            {top3.map((d, i) => (
              <div
                key={d.name}
                style={{
                  background: i === 0
                    ? "linear-gradient(135deg,rgba(245,196,0,0.12),rgba(245,196,0,0.03))"
                    : "var(--color-dark-mid)",
                  border: `1px solid ${medalBorders[i]}`,
                  borderRadius: "var(--radius-md)",
                  padding: "var(--space-md)",
                  textAlign: "center",
                  position: "relative",
                  order: i === 0 ? 2 : i,
                }}
              >
                <div style={{ position: "absolute", top: -1, left: 0, right: 0, height: 3, background: medalBarColors[i], borderRadius: "var(--radius-md) var(--radius-md) 0 0" }} />
                {i === 0 && <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>👑</div>}
                <div style={{ fontFamily: "var(--font-display)", fontSize: i === 0 ? "3rem" : "3rem", color: medalPosColors[i], lineHeight: 1, marginTop: i === 0 ? 0 : "3.5rem" }}>
                  {i + 1}
                </div>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: i === 0 ? "1.2rem" : "1.1rem", fontWeight: 700, color: "var(--color-white)", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0.4rem 0" }}>
                  {d.name}
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: i === 0 ? "2.5rem" : "2.2rem", color: medalPtsColors[i] }}>
                  {d.pts} <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", color: "var(--color-gray)", textTransform: "uppercase" }}>pts</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GRILLA COMPLETA */}
      <section className="section" style={{ background: "var(--color-dark)" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Todos los pilotos</span>
            <h2 className="section-title">Grilla Completa</h2>
          </div>
          <div className="pilotos-grid">
            {drivers.map((d) => (
              <div className="piloto-card" data-num={d.num} key={d.name}>
                <div className="piloto-avatar" style={{ background: d.avatarGradient }}>
                  {d.initials}
                </div>
                <div className="piloto-name">{d.name}</div>
                <div className="piloto-pts">{d.pts}</div>
                <div className="piloto-pts-label">puntos</div>
                <span className="piloto-split-tag">{d.split}</span>
              </div>
            ))}
          </div>
          <p style={{ marginTop: "var(--space-md)", fontSize: "var(--fs-label)", color: "var(--color-gray)", fontFamily: "var(--font-heading)", letterSpacing: "0.06em" }}>
            * Puntos acumulados en la Tabla General.
          </p>
        </div>
      </section>

      <Footer showOrganizadores />
    </>
  );
}
