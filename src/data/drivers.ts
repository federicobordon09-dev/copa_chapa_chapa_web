import { standings } from "./standings";
import { getTeam } from "./teams";

export interface Driver {
  num: string;
  initials: string;
  name: string;
  pts: number;
  split: string;
  avatarGradient: string;
  team: string;
}

function p(v: string): number {
  return v === "—" ? 0 : Number.parseInt(v, 10);
}

function lastSplit(row: typeof standings[number]): string {
  if (p(row.f4s1) > 0) return "Split 1 La Plata";
  if (p(row.f4s2) > 0) return "Split 2 La Plata";
  if (p(row.f3s1) > 0) return "Split 1 La Pampa";
  if (p(row.f3s2) > 0) return "Split 2 La Pampa";
  if (p(row.f2s1) > 0) return "Split 1 Bs. Aires";
  if (p(row.f2s2) > 0) return "Split 2 Bs. Aires";
  if (p(row.f1s1) > 0) return "Split 1 Comodoro";
  if (p(row.f1s2) > 0) return "Split 2 Comodoro";
  return "Recién inscripto";
}

const initials = (name: string): string =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0].toUpperCase())
    .slice(0, 2)
    .join("");

const existingMetadata = new Map<string, { num: string; initials: string; name: string; avatarGradient: string }>();

const rawDrivers = standings.map((row) => {
  const old = existingMetadata.get(row.name);
  return {
    num: old?.num ?? "",
    initials: old?.initials ?? initials(row.name),
    name: row.name,
    pts: row.total,
    split: lastSplit(row),
    avatarGradient:
      old?.avatarGradient ??
      `linear-gradient(135deg,#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0")},#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0")})`,
  };
}).sort((a, b) => b.pts - a.pts || a.name.localeCompare(b.name))
  .map((d, i) => ({ ...d, num: String(i + 1).padStart(2, "0") }));

export const drivers: Driver[] = rawDrivers.map((d) => ({
  ...d,
  team: getTeam(d.name),
}));

export const top3 = drivers.slice(0, 3);
