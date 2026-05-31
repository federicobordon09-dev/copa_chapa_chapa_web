import { standings as rawStandings } from "./standings";

export interface TeamStanding {
  pos: number;
  name: string;
  total: number;
  driverCount: number;
}

const driverTeamRaw: Record<string, string> = {
  "Santino Casciano": "ANTIKUKAS Racing",
  "Matias Cayrus Riffel": "enano maldito team",
  "Bruno Koller": "Sport team",
  "Jonathan Molleker": "Joni Fps",
  "Alan Truffe": "Kattrus",
  "Ramiro Grazzini": "Grazzini racing",
  "Gonzalo Bariffuzza": "BFZ Racing",
  "Maximiliano Dieringer": "SIET",
  "Fede Landa": "Petaca Racing Team",
  "Brian Campos": "Sociedad de Fomento Vikingos",
  "Agustin Carreras": "Bull competicion",
  "Facundo Toledo": "toledo racing",
  "Juan Ignacio Kuchen": "JK Competicion",
  "Martin Diaz": "APL",
  "Luca Díaz": "PREMA E-Sports",
  "Valentin Corts": "MENDUCO",
  "Julian Valiñas": "MJ Racing",
  "Alejandro Guerrero": "WarriorTeam",
  "Samir Monier": "PREMA eSports",
  "Agustin Rojas": "La Mafilia",
  "Bernardo Morico": "Motorock Racing",
  "Gustavo Corrales": "Villaguay competiciones",
  "Matteo Viñas": "Viñas Competicion",
  "Franco Guerreros": "guerreros racing",
  "Matias Dowojak": "Coso tim",
  "Lucas Nin": "PRO CARS#1",
  "Marcos Turri": "MJ Racing",
  "Lucio Focaccia": "TK",
  "Nacho Davin": "Tío Nacho Manzanilla",
  "Luciano Bogado": "Overtake Racing",
  "Fabian Gamero": "FG Motorsport",
  "Alejandro Jara": "aleJara",
  "Agustin Savone": "SVN",
  "Fernando Ali": "Kattru's",
  "Eric Priemer": "Pañalera",
  "Luciano Bravo": "GSW3",
  "Mariano Sale": "Goticas Qlonas Racing Team",
  "Ignacio Aprikian": "No Doblo",
  "Franco Perez": "Berna Racing Team",
  "Nicolas Davin": "kotorra",
  "Julian Agustin Reynoso Zuñiga": "Sparking Team",
  "Lucas Berti": "show",
  "Nicolas Marsilio": "NM Racing",
  "Manuel Camarero": "pipón team",
  "Nicolas Picone": "Cokimbo Racing",
  "Marcos Donner": "Turdera Racing",
  "Santiago Ortiz Ocampo": "Panchos Racing",
  "Joaquin Campolieti": "CamposRR",
  "Matias Pacheco": "Seguro pero lento",
  "Uriel Manzanelli": "sparking team",
  "Agustin Chijanoski": "Prema Esports",
  "Luka Sanchez": "Luka Sanchez TK",
  "Daniel Castro": "Lento Pero Seguro",
  "Nico Valero": "ADTC team",
  "Juan Jose Sanchez": "Jäger Team",
  "Julian Varlas": "Overtake Racing",
  "Gonzalo Alonso": "overtake racing",
  "Lucas Morel": "CM Racing",
  "Kevin Lhuillier": "KL",
  "Mateo Magri": "LaTripleta",
  "Patricio Aguerreche": "",
  "Francisco Piccinini": "Franchuke22",
  "Marcelo Haase": "Haase motorsport",
  "Agustin Moles": "Agustin Moles",
  "Damian Ludueña": "APL",
  "Joaquin Gutierrez": "Tres razones para abortar",
  "Alvaro Guzman": "",
  "Gaspar Stanoss": "",
  "Maxi Fayon": "",
  "Matias Ramirez": "",
  "Brian Bonato": "",
  "Francisco Czerniawski": "",
};

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
    .sort((a, b) => b.total - a.total || a.name.localeCompare(b.name))
    .map((entry, i) => ({ ...entry, pos: i + 1 }));
}
