import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="section-eyebrow">Error 404</span>
          <h1 className="page-header-title">Página no encontrada</h1>
          <p className="page-header-sub">
            La página que buscás no existe o fue movida
          </p>
        </div>
        <div className="page-header-bar" />
      </section>

      <section className="section" style={{ textAlign: "center" }}>
        <div className="container">
          <div style={{ fontSize: "clamp(6rem, 20vw, 12rem)", fontFamily: "var(--font-display)", color: "var(--color-yellow)", lineHeight: 1, marginBottom: "var(--space-sm)" }}>
            404
          </div>
          <p style={{ fontSize: "1.1rem", color: "var(--color-gray-dark)", maxWidth: 500, margin: "0 auto var(--space-lg)", lineHeight: 1.7 }}>
            Parece que te fuiste a pista para el lado equivocado.
            No hay nada por acá.
          </p>
          <Link href="/" className="btn btn-primary">
            Volver al inicio
          </Link>
        </div>
      </section>
    </>
  );
}
