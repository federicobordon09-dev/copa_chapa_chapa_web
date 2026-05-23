import { standings as rawStandings } from "./standings";

export interface TeamStanding {
  pos: number;
  name: string;
  total: number;
  driverCount: number;
}

const driverTeamRaw: Record<string, string> = {
  "Bruno Koller": "Sport Team",
  "Marcos Turri": "MJ Racing",
  "Matteo Viñas": "Viñas Competicion",
  "Agustin Carreras": "Bull competicion",
  "Julian Varlas": "Overtake Racing",
  "Agustin Moles": "Agustin Moles",
  "Joaquin Gutierrez": "Tres razones para abortar",
  "Fernando Ali": "Kattru's",
  "Kevin Lhuillier": "KL",
  "Gonzalo Alonso": "overtake racing",
  "Matias Pacheco": "Seguro pero lento",
  "Lucio Focaccia": "TK",
  "Agustin Rojas": "La Mafilia",
  "Juan Jose Sanchez": "Jäger Team",
  "Matias Cayrus Riffel": "enano maldito team",
  "Franco Guerreros": "guerreros racing",
  "Nico Valero": "ADTC team",
  "Lucas Nin": "PRO CARS#1",
  "Agustin Savone": "SVN",
  "Eric Priemer": "Pañalera",
  "Santiago Ortiz Ocampo": "Panchos Racing",
  "Luka Sanchez": "Luka Sanchez TK",
  "Nacho Davin": "Tío Nacho Manzanilla",
  "Bernardo Morico": "Motorock Racing",
  "Julian Valiñas": "MJ Racing",
  "Uriel Manzanelli": "sparking team",
  "Agustin Chijanoski": "Prema Esports",
  "Lucas Morel": "CM Racing",
  "Brian Campos": "Sociedad de Fomento Vikingos",
  "Maximiliano Dieringer": "SIET",
  "Luciano Bravo": "GSW3",
  "Fede Landa": "Petaca Racing Team",
  "Nicolas Picone": "Cokimbo Racing",
  "Gustavo Corrales": "Villaguay competiciones",
  "Gonzalo Bariffuzza": "BFZ Racing",
  "Marcos Donner": "Turdera Racing",
  "Jonathan Molleker": "Joni Fps",
  "Luca Díaz": "PREMA E-Sports",
  "Nicolas Marsilio": "NM Racing",
  "Valentin Corts": "MENDUCO",
  "Ignacio Aprikian": "No Doblo",
  "Daniel Castro": "Lento Pero Seguro",
  "Samir Monier": "PREMA eSports",
  "Nicolas Davin": "kotorra",
  "Mariano Sale": "Goticas Qlonas Racing Team",
  "Mateo Magri": "LaTripleta",
  "Francisco Piccinini": "Franchuke22",
  "Martin Diaz": "APL",
  "Marcelo Haase": "Haase motorsport",
  "Manuel Camarero": "pipón team",
  "Alejandro Jara": "aleJara",
  "Lucas Berti": "show",
  "Ramiro Grazzini": "Grazzini racing",
  "Matias Dowojak": "Coso tim",
  "Juan Ignacio Kuchen": "JK Competicion",
  "Julian Agustin Reynoso Zuñiga": "Sparking Team",
  "Luciano Bogado": "Overtake Racing",
  "Facundo Toledo": "toledo racing",
  "Alejandro Guerrero": "WarriorTeam",
};

const teamNormalization: Record<string, string> = {
  "overtake racing": "Overtake Racing",
  "prema e-sports": "Prema Esports",
  "prema esports": "Prema Esports",
  "sparking team": "Sparking Team",
};

function normalizeTeam(name: string): string {
  const lower = name.toLowerCase();
  if (teamNormalization[lower]) return teamNormalization[lower];
  return name;
}

function findTeam(driverName: string): string {
  const raw = driverTeamRaw[driverName];
  if (raw) return normalizeTeam(raw);
  return "Sin equipo";
}

export function getTeam(driverName: string): string {
  return findTeam(driverName);
}

export function computeTeamStandings(): TeamStanding[] {
  const teamPoints: Record<string, number> = {};
  const teamDrivers: Record<string, number> = {};

  for (const row of rawStandings) {
    const team = findTeam(row.name);
    const norm = normalizeTeam(team);
    if (norm === "Sin equipo") continue;
    teamPoints[norm] = (teamPoints[norm] || 0) + row.total;
    teamDrivers[norm] = (teamDrivers[norm] || 0) + 1;
  }

  return Object.entries(teamPoints)
    .map(([name, total]) => ({
      name,
      total,
      driverCount: teamDrivers[name],
    }))
    .sort((a, b) => b.total - a.total)
    .map((entry, i) => ({ ...entry, pos: i + 1 }));
}
