export interface StandingsRow {
  pos: number;
  name: string;
  f1s1: string;
  f1s2: string;
  f2s1: string;
  f2s2: string;
  f3s1: string;
  f3s2: string;
  f4s1: string;
  f4s2: string;
  total: number;
  status?: string;
}

function p(v: string): number {
  return v === "—" ? 0 : Number.parseInt(v, 10);
}

function oldTotal(row: StandingsRow): number {
  return p(row.f1s1) + p(row.f1s2) + p(row.f2s1) + p(row.f2s2) + p(row.f3s1) + p(row.f3s2);
}

function rowTotal(row: StandingsRow): number {
  return oldTotal(row) + p(row.f4s1) + p(row.f4s2);
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

export const standings: StandingsRow[] = [];

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
  laplata: "La Plata",
};

export function circuitName(id: string): string {
  return circuitNames[id] ?? "";
}

export const races: RaceData[] = [];

export const top5Preview = standings.slice(0, 5);
