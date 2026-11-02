import { standings as rawStandings } from "./standings";

export interface TeamStanding {
  pos: number;
  name: string;
  total: number;
  driverCount: number;
  drivers: string[];
}

const driverTeamRaw: Record<string, string> = {};

const teamDisplay: Record<string, string> = {
  "sport team": "Sport Team",
  "prema e-sports": "Prema Esports",
  "prema esports": "Prema Esports",
  "prema eSports": "Prema Esports",
  "sparking team": "Sparking Team",
  "overtake racing": "Overtake Racing",
  "kattrus": "Kattru's",
};

function normalizeTeam(name: string): string {
  const lower = name.trim().toLowerCase();
  if (teamDisplay[lower]) return teamDisplay[lower];
  return name.trim();
}

function findTeam(driverName: string): string {
  const raw = driverTeamRaw[driverName];
  if (raw && raw.length > 0) return normalizeTeam(raw);
  return "Sin equipo";
}

export function getTeam(driverName: string): string {
  return findTeam(driverName);
}

export function computeTeamStandings(): TeamStanding[] {
  const teamPoints: Record<string, number> = {};
  const teamDrivers: Record<string, number> = {};
  const teamDriverList: Record<string, string[]> = {};

  for (const row of rawStandings) {
    const team = findTeam(row.name);
    const norm = normalizeTeam(team);
    if (norm === "Sin equipo") continue;
    teamPoints[norm] = (teamPoints[norm] || 0) + row.total;
    teamDrivers[norm] = (teamDrivers[norm] || 0) + 1;
    if (!teamDriverList[norm]) teamDriverList[norm] = [];
    teamDriverList[norm].push(row.name);
  }

  return Object.entries(teamPoints)
    .map(([name, total]) => ({
      name,
      total,
      driverCount: teamDrivers[name],
      drivers: teamDriverList[name] ?? [],
    }))
    .sort((a, b) => b.total - a.total || a.name.localeCompare(b.name))
    .map((entry, i) => ({ ...entry, pos: i + 1 }));
}
