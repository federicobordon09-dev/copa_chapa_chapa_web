export interface StandingsRow {
  pos: number;
  name: string;
  f1s1: string;
  f1s2: string;
  f2s1: string;
  f2s2: string;
  f3s1: string;
  f3s2: string;
  total: number;
  status?: string;
}

function p(v: string): number {
  return v === "—" ? 0 : Number.parseInt(v, 10);
}

function oldTotal(row: StandingsRow): number {
  return p(row.f1s1) + p(row.f1s2) + p(row.f2s1) + p(row.f2s2);
}

function rowTotal(row: StandingsRow): number {
  return oldTotal(row) + p(row.f3s1) + p(row.f3s2);
}

export function computeStandings(
  rows: StandingsRow[]
): StandingsRow[] {
  const oldOrder = [...rows].sort((a, b) => {
    const d = oldTotal(b) - oldTotal(a);
    if (d !== 0) return d;
    return a.name.localeCompare(b.name);
  });
  const oldPosMap = new Map<string, number>();
  oldOrder.forEach((r, i) => oldPosMap.set(r.name, i + 1));

  const sorted = [...rows].sort((a, b) => {
    const d = rowTotal(b) - rowTotal(a);
    if (d !== 0) return d;
    return (oldPosMap.get(a.name) ?? 999) - (oldPosMap.get(b.name) ?? 999);
  });

  return sorted.map((r, i) => ({ ...r, pos: i + 1, total: rowTotal(r) }));
}

export interface PositionChange {
  delta: number;
}

export function getPositionChanges(
  rows: StandingsRow[]
): Map<string, PositionChange> {
  const oldOrder = [...rows].sort((a, b) => {
    const d = oldTotal(b) - oldTotal(a);
    if (d !== 0) return d;
    return a.name.localeCompare(b.name);
  });
  const oldPosMap = new Map<string, number>();
  oldOrder.forEach((r, i) => oldPosMap.set(r.name, i + 1));

  const lastOldPos = oldOrder.length;

  const newOrder = computeStandings(rows);
  const changes = new Map<string, PositionChange>();
  newOrder.forEach((r, i) => {
    const newPos = i + 1;
    const oldPos = oldPosMap.get(r.name) ?? lastOldPos + 1;
    changes.set(r.name, { delta: oldPos - newPos });
  });
  return changes;
}

export const standings: StandingsRow[] = computeStandings([
  { pos: 1, name: "Santino Casciano", f1s1: "13", f1s2: "—", f2s1: "22", f2s2: "—", f3s1: "25", f3s2: "—", total: 60 },
  { pos: 2, name: "Franco Perez", f1s1: "—", f1s2: "19", f2s1: "17", f2s2: "—", f3s1: "9", f3s2: "—", total: 45 },
  { pos: 3, name: "Joaquin Gutierrez", f1s1: "—", f1s2: "—", f2s1: "—", f2s2: "22", f3s1: "—", f3s2: "22", total: 44 },
  { pos: 4, name: "Damian Ludueña", f1s1: "—", f1s2: "25", f2s1: "—", f2s2: "19", f3s1: "—", f3s2: "—", total: 44 },
  { pos: 5, name: "Bruno Koller", f1s1: "—", f1s2: "—", f2s1: "25", f2s2: "—", f3s1: "17", f3s2: "—", total: 42 },
  { pos: 6, name: "Marcos Turri", f1s1: "22", f1s2: "—", f2s1: "1", f2s2: "—", f3s1: "15", f3s2: "—", total: 38 },
  { pos: 7, name: "Fabian Gamero", f1s1: "25", f1s2: "—", f2s1: "9", f2s2: "—", f3s1: "—", f3s2: "—", total: 34 },
  { pos: 8, name: "Julian Varlas", f1s1: "—", f1s2: "17", f2s1: "15", f2s2: "—", f3s1: "—", f3s2: "—", total: 32 },
  { pos: 9, name: "Fernando Ali", f1s1: "—", f1s2: "15", f2s1: "—", f2s2: "—", f3s1: "—", f3s2: "15", total: 30 },
  { pos: 10, name: "Agustin Moles", f1s1: "—", f1s2: "—", f2s1: "—", f2s2: "15", f3s1: "13", f3s2: "—", total: 28 },
  { pos: 11, name: "Lucio Focaccia", f1s1: "—", f1s2: "11", f2s1: "—", f2s2: "—", f3s1: "—", f3s2: "17", total: 28 },
  { pos: 12, name: "Eric Priemer", f1s1: "—", f1s2: "—", f2s1: "5", f2s2: "—", f3s1: "22", f3s2: "—", total: 27 },
  { pos: 13, name: "Patricio Aguerreche", f1s1: "9", f1s2: "—", f2s1: "—", f2s2: "—", f3s1: "19", f3s2: "—", total: 28 },
  { pos: 14, name: "Alejandro Rodriguez", f1s1: "—", f1s2: "—", f2s1: "—", f2s2: "25", f3s1: "—", f3s2: "—", total: 25, status: "SUSPENDIDO" },
  { pos: 15, name: "Brian Campos", f1s1: "—", f1s2: "22", f2s1: "—", f2s2: "—", f3s1: "—", f3s2: "25", total: 47 },
  { pos: 16, name: "Agustin Carreras", f1s1: "5", f1s2: "—", f2s1: "—", f2s2: "17", f3s1: "—", f3s2: "—", total: 22 },
  { pos: 17, name: "Matteo Viñas", f1s1: "1", f1s2: "—", f2s1: "19", f2s2: "—", f3s1: "—", f3s2: "—", total: 20 },
  { pos: 18, name: "Facundo Toledo", f1s1: "—", f1s2: "—", f2s1: "—", f2s2: "—", f3s1: "—", f3s2: "19", total: 19 },
  { pos: 19, name: "Bernardo Morico", f1s1: "19", f1s2: "—", f2s1: "—", f2s2: "—", f3s1: "—", f3s2: "—", total: 19 },
  { pos: 20, name: "Lucas Nin", f1s1: "—", f1s2: "7", f2s1: "—", f2s2: "—", f3s1: "—", f3s2: "11", total: 18 },
  { pos: 21, name: "Agustin Rojas", f1s1: "15", f1s2: "—", f2s1: "—", f2s2: "3", f3s1: "—", f3s2: "—", total: 18 },
  { pos: 22, name: "Agustin Chijanoski", f1s1: "—", f1s2: "—", f2s1: "11", f2s2: "—", f3s1: "7", f3s2: "—", total: 18 },
  { pos: 23, name: "Nacho Davin", f1s1: "17", f1s2: "—", f2s1: "—", f2s2: "—", f3s1: "—", f3s2: "—", total: 17 },
  { pos: 24, name: "Matias Pacheco", f1s1: "—", f1s2: "5", f2s1: "—", f2s2: "11", f3s1: "—", f3s2: "—", total: 16 },
  { pos: 25, name: "Franco Guerreros", f1s1: "—", f1s2: "9", f2s1: "—", f2s2: "5", f3s1: "—", f3s2: "—", total: 14 },
  { pos: 26, name: "Gustavo Corrales", f1s1: "—", f1s2: "—", f2s1: "—", f2s2: "—", f3s1: "—", f3s2: "13", total: 13 },
  { pos: 27, name: "Kevin Lhuillier", f1s1: "—", f1s2: "13", f2s1: "—", f2s2: "—", f3s1: "—", f3s2: "—", total: 13 },
  { pos: 28, name: "Gonzalo Alonso", f1s1: "—", f1s2: "—", f2s1: "13", f2s2: "—", f3s1: "—", f3s2: "—", total: 13 },
  { pos: 29, name: "Uriel Manzanelli", f1s1: "—", f1s2: "—", f2s1: "—", f2s2: "13", f3s1: "—", f3s2: "—", total: 13 },
  { pos: 30, name: "Luca Díaz", f1s1: "—", f1s2: "—", f2s1: "—", f2s2: "—", f3s1: "11", f3s2: "—", total: 11 },
  { pos: 31, name: "Juan Jose Sanchez", f1s1: "11", f1s2: "—", f2s1: "—", f2s2: "—", f3s1: "—", f3s2: "—", total: 11 },
  { pos: 32, name: "Maximiliano Dieringer", f1s1: "—", f1s2: "—", f2s1: "—", f2s2: "—", f3s1: "—", f3s2: "9", total: 9 },
  { pos: 33, name: "Matias Cayrus Riffel", f1s1: "—", f1s2: "—", f2s1: "—", f2s2: "9", f3s1: "—", f3s2: "—", total: 9 },
  { pos: 34, name: "Nico Valero", f1s1: "—", f1s2: "1", f2s1: "—", f2s2: "7", f3s1: "—", f3s2: "—", total: 8 },
  { pos: 35, name: "Valentin Corts", f1s1: "—", f1s2: "—", f2s1: "—", f2s2: "—", f3s1: "—", f3s2: "7", total: 7 },
  { pos: 36, name: "Julian Valiñas", f1s1: "7", f1s2: "—", f2s1: "—", f2s2: "—", f3s1: "3", f3s2: "—", total: 10 },
  { pos: 37, name: "Agustin Savone", f1s1: "3", f1s2: "—", f2s1: "7", f2s2: "—", f3s1: "—", f3s2: "—", total: 10 },
  { pos: 38, name: "Martin Diaz", f1s1: "—", f1s2: "—", f2s1: "—", f2s2: "—", f3s1: "—", f3s2: "5", total: 5 },
  { pos: 39, name: "Alan Truffe", f1s1: "—", f1s2: "—", f2s1: "—", f2s2: "—", f3s1: "5", f3s2: "—", total: 5 },
  { pos: 40, name: "Luka Sanchez", f1s1: "—", f1s2: "3", f2s1: "—", f2s2: "—", f3s1: "—", f3s2: "1", total: 4 },
  { pos: 41, name: "Ramiro Grazzini", f1s1: "—", f1s2: "—", f2s1: "—", f2s2: "—", f3s1: "—", f3s2: "3", total: 3 },
  { pos: 42, name: "Santiago Ortiz Ocampo", f1s1: "—", f1s2: "—", f2s1: "3", f2s2: "—", f3s1: "—", f3s2: "—", total: 3 },
  { pos: 43, name: "Lucas Morel", f1s1: "—", f1s2: "—", f2s1: "—", f2s2: "1", f3s1: "—", f3s2: "—", total: 1 },
  { pos: 44, name: "Juan Ignacio Kuchen", f1s1: "—", f1s2: "—", f2s1: "—", f2s2: "—", f3s1: "1", f3s2: "—", total: 1 },
  { pos: 45, name: "Alejandro Guerrero", f1s1: "—", f1s2: "—", f2s1: "—", f2s2: "—", f3s1: "—", f3s2: "—", total: 0 },
  { pos: 46, name: "Alejandro Jara", f1s1: "—", f1s2: "—", f2s1: "—", f2s2: "—", f3s1: "—", f3s2: "—", total: 0 },
  { pos: 47, name: "Daniel Castro", f1s1: "—", f1s2: "—", f2s1: "—", f2s2: "—", f3s1: "—", f3s2: "—", total: 0 },
  { pos: 48, name: "Fede Landa", f1s1: "—", f1s2: "—", f2s1: "—", f2s2: "—", f3s1: "—", f3s2: "—", total: 0 },
  { pos: 49, name: "Francisco Piccinini", f1s1: "—", f1s2: "—", f2s1: "—", f2s2: "—", f3s1: "—", f3s2: "—", total: 0 },
  { pos: 50, name: "Gonzalo Bariffuzza", f1s1: "—", f1s2: "—", f2s1: "—", f2s2: "—", f3s1: "—", f3s2: "—", total: 0 },
  { pos: 51, name: "Ignacio Aprikian", f1s1: "—", f1s2: "—", f2s1: "—", f2s2: "—", f3s1: "—", f3s2: "—", total: 0 },
  { pos: 52, name: "Jonathan Molleker", f1s1: "—", f1s2: "—", f2s1: "—", f2s2: "—", f3s1: "—", f3s2: "—", total: 0 },
  { pos: 53, name: "Julian Agustin Reynoso Zuñiga", f1s1: "—", f1s2: "—", f2s1: "—", f2s2: "—", f3s1: "—", f3s2: "—", total: 0 },
  { pos: 54, name: "Lucas Berti", f1s1: "—", f1s2: "—", f2s1: "—", f2s2: "—", f3s1: "—", f3s2: "—", total: 0 },
  { pos: 55, name: "Luciano Bogado", f1s1: "—", f1s2: "—", f2s1: "—", f2s2: "—", f3s1: "—", f3s2: "—", total: 0 },
  { pos: 56, name: "Luciano Bravo", f1s1: "—", f1s2: "—", f2s1: "—", f2s2: "—", f3s1: "—", f3s2: "—", total: 0 },
  { pos: 57, name: "Manuel Camarero", f1s1: "—", f1s2: "—", f2s1: "—", f2s2: "—", f3s1: "—", f3s2: "—", total: 0 },
  { pos: 58, name: "Marcelo Haase", f1s1: "—", f1s2: "—", f2s1: "—", f2s2: "—", f3s1: "—", f3s2: "—", total: 0 },
  { pos: 59, name: "Marcos Donner", f1s1: "—", f1s2: "—", f2s1: "—", f2s2: "—", f3s1: "—", f3s2: "—", total: 0 },
  { pos: 60, name: "Mariano Sale", f1s1: "—", f1s2: "—", f2s1: "—", f2s2: "—", f3s1: "—", f3s2: "—", total: 0 },
  { pos: 61, name: "Mateo Magri", f1s1: "—", f1s2: "—", f2s1: "—", f2s2: "—", f3s1: "—", f3s2: "—", total: 0 },
  { pos: 62, name: "Matias Dowojak", f1s1: "—", f1s2: "—", f2s1: "—", f2s2: "—", f3s1: "—", f3s2: "—", total: 0 },
  { pos: 63, name: "Nicolas Davin", f1s1: "—", f1s2: "—", f2s1: "—", f2s2: "—", f3s1: "—", f3s2: "—", total: 0 },
  { pos: 64, name: "Nicolas Marsilio", f1s1: "—", f1s2: "—", f2s1: "—", f2s2: "—", f3s1: "—", f3s2: "—", total: 0 },
  { pos: 65, name: "Nicolas Picone", f1s1: "—", f1s2: "—", f2s1: "—", f2s2: "—", f3s1: "—", f3s2: "—", total: 0 },
  { pos: 66, name: "Samir Monier", f1s1: "—", f1s2: "—", f2s1: "—", f2s2: "—", f3s1: "—", f3s2: "—", total: 0 },
  { pos: 67, name: "Joaquin Campolieti", f1s1: "—", f1s2: "—", f2s1: "—", f2s2: "—", f3s1: "—", f3s2: "—", total: 0 },
]);

export interface SplitResult {
  pos: number;
  name: string;
  pts: number;
  status?: string;
}

export interface RaceData {
  id: string;
  label: string;
  splits: {
    label: string;
    results: SplitResult[];
  }[];
}

const circuitNames: Record<string, string> = {
  como: "Comodoro",
  bsas: "Buenos Aires",
  pampa: "La Pampa",
};

export function circuitName(id: string): string {
  return circuitNames[id] ?? "";
}

export const races: RaceData[] = [
  {
    id: "como",
    label: "📍 Fecha 1 — Comodoro",
    splits: [
      {
        label: "Split 1",
        results: [
          { pos: 1, name: "Fabian Gamero", pts: 25 },
          { pos: 2, name: "Marcos Turri", pts: 22 },
          { pos: 3, name: "Bernardo Morico", pts: 19 },
          { pos: 4, name: "Nacho Davin", pts: 17 },
          { pos: 5, name: "Agustin Rojas", pts: 15 },
          { pos: 6, name: "Santino Casciano", pts: 13 },
          { pos: 7, name: "Juan Jose Sanchez", pts: 11 },
          { pos: 8, name: "Patricio Aguerreche", pts: 9 },
          { pos: 9, name: "Julian Valiñas", pts: 7 },
          { pos: 10, name: "Agustin Carreras", pts: 5 },
          { pos: 11, name: "Agustin Savone", pts: 3 },
          { pos: 12, name: "Matteo Viñas", pts: 1 },
        ],
      },
      {
        label: "Split 2",
        results: [
          { pos: 1, name: "Damian Ludueña", pts: 25 },
          { pos: 2, name: "Brian Campos", pts: 22 },
          { pos: 3, name: "Franco Perez", pts: 19 },
          { pos: 4, name: "Julian Varlas", pts: 17 },
          { pos: 5, name: "Fernando Ali", pts: 15 },
          { pos: 6, name: "Kevin Lhuillier", pts: 13 },
          { pos: 7, name: "Lucio Focaccia", pts: 11 },
          { pos: 8, name: "Franco Guerreros", pts: 9 },
          { pos: 9, name: "Lucas Nin", pts: 7 },
          { pos: 10, name: "Matias Pacheco", pts: 5 },
          { pos: 11, name: "Luka Sanchez", pts: 3 },
          { pos: 12, name: "Nico Valero", pts: 1 },
        ],
      },
    ],
  },
  {
    id: "bsas",
    label: "📍 Fecha 2 — Buenos Aires",
    splits: [
      {
        label: "Split 1",
        results: [
          { pos: 1, name: "Bruno Koller", pts: 25 },
          { pos: 2, name: "Santino Casciano", pts: 22 },
          { pos: 3, name: "Matteo Viñas", pts: 19 },
          { pos: 4, name: "Franco Perez", pts: 17 },
          { pos: 5, name: "Julian Varlas", pts: 15 },
          { pos: 6, name: "Gonzalo Alonso", pts: 13 },
          { pos: 7, name: "Agustin Chijanoski", pts: 11 },
          { pos: 8, name: "Fabian Gamero", pts: 9 },
          { pos: 9, name: "Agustin Savone", pts: 7 },
          { pos: 10, name: "Eric Priemer", pts: 5 },
          { pos: 11, name: "Santiago Ortiz Ocampo", pts: 3 },
          { pos: 12, name: "Marcos Turri", pts: 1 },
        ],
      },
      {
        label: "Split 2",
        results: [
          { pos: 1, name: "Alejandro Rodriguez", pts: 25, status: "SUSPENDIDO" },
          { pos: 2, name: "Joaquin Gutierrez", pts: 22 },
          { pos: 3, name: "Damian Ludueña", pts: 19 },
          { pos: 4, name: "Agustin Carreras", pts: 17 },
          { pos: 5, name: "Agustin Moles", pts: 15 },
          { pos: 6, name: "Uriel Manzanelli", pts: 13 },
          { pos: 7, name: "Matias Pacheco", pts: 11 },
          { pos: 8, name: "Matias Cayrus Riffel", pts: 9 },
          { pos: 9, name: "Nico Valero", pts: 7 },
          { pos: 10, name: "Franco Guerreros", pts: 5 },
          { pos: 11, name: "Agustin Rojas", pts: 3 },
          { pos: 12, name: "Lucas Morel", pts: 1 },
        ],
      },
    ],
  },
  {
    id: "pampa",
    label: "📍 Fecha 3 — La Pampa",
    splits: [
      {
        label: "Split 1",
        results: [
          { pos: 1, name: "Santino Casciano", pts: 25 },
          { pos: 2, name: "Eric Priemer", pts: 22 },
          { pos: 3, name: "Patricio Aguerreche", pts: 19 },
          { pos: 4, name: "Bruno Koller", pts: 17 },
          { pos: 5, name: "Marcos Turri", pts: 15 },
          { pos: 6, name: "Agustin Moles", pts: 13 },
          { pos: 7, name: "Luca Díaz", pts: 11 },
          { pos: 8, name: "Franco Perez", pts: 9 },
          { pos: 9, name: "Agustin Chijanoski", pts: 7 },
          { pos: 10, name: "Alan Truffe", pts: 5 },
          { pos: 11, name: "Julian Valiñas", pts: 3 },
          { pos: 12, name: "Juan Ignacio Kuchen", pts: 1 },
        ],
      },
      {
        label: "Split 2",
        results: [
          { pos: 1, name: "Brian Campos", pts: 25 },
          { pos: 2, name: "Joaquin Gutierrez", pts: 22 },
          { pos: 3, name: "Facundo Toledo", pts: 19 },
          { pos: 4, name: "Lucio Focaccia", pts: 17 },
          { pos: 5, name: "Fernando Ali", pts: 15 },
          { pos: 6, name: "Gustavo Corrales", pts: 13 },
          { pos: 7, name: "Lucas Nin", pts: 11 },
          { pos: 8, name: "Maximiliano Dieringer", pts: 9 },
          { pos: 9, name: "Valentin Corts", pts: 7 },
          { pos: 10, name: "Martin Diaz", pts: 5 },
          { pos: 11, name: "Ramiro Grazzini", pts: 3 },
          { pos: 12, name: "Luka Sanchez", pts: 1 },
        ],
      },
    ],
  },
];

export const top5Preview = standings.slice(0, 5);
