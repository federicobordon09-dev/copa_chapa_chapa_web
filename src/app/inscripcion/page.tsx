"use client";

import { useState, FormEvent, useEffect, useRef } from "react";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";

interface FormData {
  nombreApellido: string;
  usuarioDiscord: string;
  nombreAssetto: string;
  steamGuid: string;
  honeypot: string;
}

const COOLDOWN_SECONDS = 10;
const MIN_FORM_TIME_MS = 4000;

export default function InscripcionPage() {
  const [form, setForm] = useState<FormData>({
    nombreApellido: "",
    usuarioDiscord: "",
    nombreAssetto: "",
    steamGuid: "",
    honeypot: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.dataset.mounted = String(Date.now());
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (cooldown > 0) return;

    if (form.honeypot) return;

    const elapsed = Date.now() - (formRef.current?.dataset?.mounted
      ? parseInt(formRef.current.dataset.mounted)
      : Date.now());
    if (elapsed < MIN_FORM_TIME_MS) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const mounted = formRef.current?.dataset?.mounted
        ? parseInt(formRef.current.dataset.mounted)
        : Date.now();

      const res = await fetch("/api/inscripcion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombreApellido: form.nombreApellido,
          usuarioDiscord: form.usuarioDiscord,
          nombreAssetto: form.nombreAssetto,
          steamGuid: form.steamGuid,
          honeypot: form.honeypot,
          formMounted: mounted,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al enviar el formulario");
      }

      setStatus("success");
      setCooldown(COOLDOWN_SECONDS);
      setForm({
        nombreApellido: "",
        usuarioDiscord: "",
        nombreAssetto: "",
        steamGuid: "",
        honeypot: "",
      });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Error desconocido");
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Evento Especial"
        title="Inscripciones"
        subtitle="Dust2 · Lunes"
      />

      {/* FORMULARIO */}
      <section className="section section-dark">
        <div className="container">
          <div className="inscripcion-layout">
            <div className="inscripcion-info">
              <h2 className="section-title" style={{ color: "var(--color-white)" }}>
                Evento Especial
              </h2>
              <p style={{ fontSize: "var(--fs-small)", color: "var(--color-gray)", lineHeight: 1.7, marginBottom: "var(--space-sm)" }}>
                Evento de <strong style={{ color: "var(--color-yellow)" }}>entretenimiento</strong> en
                Dust2 — sin pre-qualifying, sin presión. Los splits se arman de forma
                <strong style={{ color: "var(--color-yellow)" }}> aleatoria</strong> en grupos de
                <strong> 9 autos</strong>. La cantidad de splits depende de la cantidad de
                inscriptos del lunes. No es competitivo, es para divertirse y compartir la pista.
              </p>
              <p style={{ fontSize: "var(--fs-small)", color: "var(--color-gray)", lineHeight: 1.7, marginBottom: "var(--space-md)" }}>
                Completá el formulario para sumarte. Necesitás tener instalados estos archivos:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-xs)", marginBottom: "var(--space-lg)" }}>
                <a
                  href="https://drive.google.com/file/d/1kpB6Zxk8quwuvpBM-ZFyZ73AylGgAmLU/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-download"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "var(--space-xs)" }}>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Descargar circuito — Dust2
                </a>
                <a
                  href="https://drive.google.com/file/d/1Vgy7NGbNxGer4T-zynDEwOYYRpFPfqHv/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-download"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "var(--space-xs)" }}>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Descargar auto
                </a>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-sm)" }}>
                <div className="org-card" style={{ padding: "var(--space-sm)" }}>
                  <img src="/assets/images/logo_tomika.png" alt="Tomikka" className="org-avatar" style={{ width: 64, height: 64 }} />
                  <div className="org-name" style={{ fontSize: "1.2rem" }}>Tomikka</div>
                  <span className="org-role" style={{ fontSize: "0.65rem" }}></span>
                  <a href="https://www.twitch.tv/tomikka" target="_blank" rel="noopener noreferrer" className="org-twitch" style={{ fontSize: "var(--fs-label)", padding: "0.3rem 0.75rem" }}>
                    <svg className="twitch-icon" viewBox="0 0 24 24"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" /></svg>
                    twitch.tv/tomikka
                  </a>
                </div>
                <div className="org-card" style={{ padding: "var(--space-sm)" }}>
                  <img src="/assets/images/logo_cunial.png" alt="Maticunial" className="org-avatar" style={{ width: 64, height: 64 }} />
                  <div className="org-name" style={{ fontSize: "1.2rem" }}>Maticunial</div>
                  <span className="org-role" style={{ fontSize: "0.65rem" }}></span>
                  <a href="https://www.twitch.tv/maticunial" target="_blank" rel="noopener noreferrer" className="org-twitch" style={{ fontSize: "var(--fs-label)", padding: "0.3rem 0.75rem" }}>
                    <svg className="twitch-icon" viewBox="0 0 24 24"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" /></svg>
                    twitch.tv/maticunial
                  </a>
                </div>
              </div>
            </div>

            <div className="inscripcion-form-wrap">
              <div className="form-card">
                <div className="form-card-header">
                  <h2 className="form-card-title">INSCRIBITE</h2>
                  <span className="form-card-badge">OBLIGATORIO</span>
                </div>
                <div className="form-card-body">
                  {status === "success" ? (
                    <div className="form-success-inline">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-yellow)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Inscripción enviada correctamente</span>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} autoComplete="off" ref={formRef}>
                      <div className="form-group">
                        <label htmlFor="nombreApellido">Nombre y apellido</label>
                        <input
                          type="text"
                          id="nombreApellido"
                          name="nombreApellido"
                          value={form.nombreApellido}
                          onChange={handleChange}
                          placeholder="Ej: Gordo Comisario"
                          autoComplete="nope"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="usuarioDiscord">Usuario de Discord</label>
                        <input
                          type="text"
                          id="usuarioDiscord"
                          name="usuarioDiscord"
                          value={form.usuarioDiscord}
                          onChange={handleChange}
                          placeholder="Ej: gordocomisario"
                          autoComplete="nope"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="nombreAssetto">Nombre en Assetto Corsa</label>
                        <input
                          type="text"
                          id="nombreAssetto"
                          name="nombreAssetto"
                          value={form.nombreAssetto}
                          onChange={handleChange}
                          placeholder="Tu nombre en Content Manager"
                          autoComplete="nope"
                          required
                        />
                        <span className="form-hint">
                          Content Manager → OPCIONES → CONTENT MANAGER → CONDUCIR → NOMBRE DEL JUGADOR
                        </span>
                      </div>

                      <div className="form-group">
                        <label htmlFor="steamGuid">Steam GUID</label>
                        <input
                          type="text"
                          id="steamGuid"
                          name="steamGuid"
                          value={form.steamGuid}
                          onChange={handleChange}
                          placeholder="Tu Steam GUID"
                          autoComplete="nope"
                          required
                        />
                        <span className="form-hint">
                          Configuración → Content Manager → General
                        </span>
                      </div>

                      <div className="form-group" style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, overflow: "hidden" }}>
                        <label htmlFor="honeypot">No llenar</label>
                        <input
                          type="text"
                          id="honeypot"
                          name="honeypot"
                          value={form.honeypot}
                          onChange={handleChange}
                          tabIndex={-1}
                          autoComplete="off"
                        />
                      </div>

                      {status === "error" && (
                        <div className="form-error">
                          <p>{errorMsg}</p>
                        </div>
                      )}

                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        disabled={status === "loading" || cooldown > 0}
                      >
                        {status === "loading"
                          ? "ENVIANDO..."
                          : cooldown > 0
                            ? `ESPERÁ ${cooldown}S`
                            : "INSCRIBIRME"}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer showOrganizadores={false} />
    </>
  );
}
