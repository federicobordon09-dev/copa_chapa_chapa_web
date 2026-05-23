"use client";

import { useState, useEffect } from "react";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";
import { standings, races } from "@/data/standings";
import { drivers } from "@/data/drivers";
import { computeTeamStandings, type TeamStanding } from "@/data/teams";

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

function matchesSearch(name: string, search: string): boolean {
  if (!search) return true;
  const parts = search.toLowerCase().split(/\s+/);
  const lower = name.toLowerCase();
  return parts.every((p) => lower.includes(p));
}

const PER_PAGE_TABLE = 10;
const PER_PAGE_DRIVERS = 12;
const PER_PAGE_TEAMS = 10;

export default function CopaChapaChapaPage() {
  const [search, setSearch] = useState("");
  const [tablePage, setTablePage] = useState(1);
  const [driverPage, setDriverPage] = useState(1);
  const [teamPage, setTeamPage] = useState(1);
  const [activeTab, setActiveTab] = useState(races[0].id);

  useEffect(() => {
    document.title = "Copa Chapa Chapa";
  }, []);

  const handleSearch = (val: string) => {
    setSearch(val);
    setTablePage(1);
    setDriverPage(1);
  };

  const searchLower = search.toLowerCase();

  const filteredStandings = standings.filter((row) =>
    matchesSearch(row.name, searchLower)
  );
  const filteredDrivers = drivers.filter((d) =>
    matchesSearch(d.name, searchLower)
  );

  const tableTotalPages = Math.ceil(filteredStandings.length / PER_PAGE_TABLE) || 1;
  const paginatedStandings = filteredStandings.slice(
    (tablePage - 1) * PER_PAGE_TABLE,
    tablePage * PER_PAGE_TABLE
  );

  const driverTotalPages = Math.ceil(filteredDrivers.length / PER_PAGE_DRIVERS) || 1;
  const paginatedDrivers = filteredDrivers.slice(
    (driverPage - 1) * PER_PAGE_DRIVERS,
    driverPage * PER_PAGE_DRIVERS
  );

  const teamStandingsAll: TeamStanding[] = computeTeamStandings();
  const teamTotalPages = Math.ceil(teamStandingsAll.length / PER_PAGE_TEAMS) || 1;
  const paginatedTeams = teamStandingsAll.slice(
    (teamPage - 1) * PER_PAGE_TEAMS,
    teamPage * PER_PAGE_TEAMS
  );

  return (
    <>
      <PageHeader
        eyebrow="Temporada 1"
        title="Copa Chapa Chapa"
        subtitle="66 pilotos · 2 Fechas disputadas · 4 Splits completados"
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

      {/* TABLA GENERAL + BUSCADOR */}
      <section className="section-compact">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Acumulado</span>
            <h2 className="section-title" style={{ color: "var(--color-black)" }}>
              Tabla General
            </h2>
          </div>
          <SearchBar value={search} onChange={handleSearch} />
          <div className="table-wrapper">
            <table className="cls-table">
              <thead>
                <tr>
                  <th className="col-pos">#</th>
                  <th className="col-driver">Piloto</th>
                  <th className="col-split">Split 1<br /><span>Comodoro</span></th>
                  <th className="col-split">Split 2<br /><span>Comodoro</span></th>
                  <th className="col-split">Split 1<br /><span>Bs. Aires</span></th>
                  <th className="col-split">Split 2<br /><span>Bs. Aires</span></th>
                  <th className="col-total">Total</th>
                </tr>
              </thead>
              <tbody>
                {paginatedStandings.map((row) => (
                  <tr key={row.pos} className={row.pos <= 3 ? "row-top3" : ""}>
                    <td className={`col-pos ${posClass(row.pos)}`}>
                      {String(row.pos).padStart(2, "0")}
                    </td>
                    <td className="col-driver">
                      <span className="driver-name">
                        {row.name}
                        {row.status && (
                          <span className="driver-status"> ({row.status})</span>
                        )}
                      </span>
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
          <Pagination
            page={tablePage}
            totalPages={tableTotalPages}
            onPageChange={setTablePage}
          />
          <p className="table-note">
            — Sin datos registrados para esa fecha/split. Los puntos con — indican
            que el piloto no corrió o no tiene resultado cargado aún.
          </p>
        </div>
      </section>

      {/* RESULTADOS POR FECHA (TABS) */}
      <section className="section-compact section-dark">
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
                        {r.id === "como" ? "Comodoro" : "Buenos Aires"}
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
                            <td>
                              {res.name}
                              {res.status && (
                                <span className="driver-status"> ({res.status})</span>
                              )}
                            </td>
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

      {/* CAMPEONATO DE EQUIPOS */}
      <section className="section-compact">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Acumulado por equipo</span>
            <h2 className="section-title" style={{ color: "var(--color-black)" }}>
              Campeonato de Equipos
            </h2>
          </div>
          <div className="table-wrapper">
            <table className="cls-table">
              <thead>
                <tr>
                  <th className="col-pos">#</th>
                  <th className="col-driver">Equipo</th>
                  <th className="col-split">Pilotos</th>
                  <th className="col-total">Puntos</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTeams.map((team) => (
                  <tr key={team.name} className={team.pos <= 3 ? "row-top3" : ""}>
                    <td className={`col-pos ${posClass(team.pos)}`}>
                      {String(team.pos).padStart(2, "0")}
                    </td>
                    <td className="col-driver">
                      <span className="driver-name">{team.name}</span>
                    </td>
                    <td className="col-split">{team.driverCount}</td>
                    <td className="col-total">{team.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            page={teamPage}
            totalPages={teamTotalPages}
            onPageChange={setTeamPage}
          />
        </div>
      </section>

      {/* GRILLA COMPLETA DE PILOTOS */}
      <section className="section-compact section-dark">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Todos los pilotos</span>
            <h2 className="section-title">Grilla Completa</h2>
          </div>
          <div className="pilotos-grid">
            {paginatedDrivers.map((d) => (
              <div className="piloto-card" data-num={d.num} key={d.name}>
                <div className="piloto-avatar" style={{ background: d.avatarGradient }}>
                  {d.initials}
                </div>
                <div className="piloto-name">{d.name}</div>
                <div className="piloto-team-tag">{d.team}</div>
                <div className="piloto-pts">{d.pts}</div>
                <div className="piloto-pts-label">puntos</div>
                <span className="piloto-split-tag">{d.split}</span>
              </div>
            ))}
          </div>
          <Pagination
            page={driverPage}
            totalPages={driverTotalPages}
            onPageChange={setDriverPage}
          />
          <p className="table-note" style={{ marginTop: "var(--space-md)" }}>
            * Puntos acumulados en la Tabla General.
          </p>
        </div>
      </section>

      <Footer showOrganizadores />
    </>
  );
}
