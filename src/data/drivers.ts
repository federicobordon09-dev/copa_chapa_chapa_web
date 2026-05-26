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

const existingMetadata = new Map(
  [
    { num: "01", initials: "DL", name: "Damian Ludueña", avatarGradient: "linear-gradient(135deg,#F5C400,#c9a000)" },
    { num: "02", initials: "FP", name: "Franco Perez", avatarGradient: "linear-gradient(135deg,#e84040,#a01c1c)" },
    { num: "03", initials: "SC", name: "Santino Casciano", avatarGradient: "linear-gradient(135deg,#4090e8,#1a5cb0)" },
    { num: "04", initials: "FG", name: "Fabian Gamero", avatarGradient: "linear-gradient(135deg,#e8a040,#a06010)" },
    { num: "05", initials: "JV", name: "Julian Varlas", avatarGradient: "linear-gradient(135deg,#9b59b6,#6c3483)" },
    { num: "06", initials: "AR", name: "Alejandro Rodriguez", avatarGradient: "linear-gradient(135deg,#27ae60,#1a7a40)" },
    { num: "07", initials: "BK", name: "Bruno Koller", avatarGradient: "linear-gradient(135deg,#1abc9c,#0e8a70)" },
    { num: "08", initials: "MT", name: "Marcos Turri", avatarGradient: "linear-gradient(135deg,#e84087,#a01c55)" },
    { num: "09", initials: "AC", name: "Agustin Carreras", avatarGradient: "linear-gradient(135deg,#3498db,#1a6ea0)" },
    { num: "10", initials: "BC", name: "Brian Campos", avatarGradient: "linear-gradient(135deg,#e8a040,#c97d10)" },
    { num: "11", initials: "JG", name: "Joaquin Gutierrez", avatarGradient: "linear-gradient(135deg,#e8c240,#a08810)" },
    { num: "12", initials: "MV", name: "Matteo Viñas", avatarGradient: "linear-gradient(135deg,#e86840,#a03010)" },
    { num: "13", initials: "BM", name: "Bernardo Morico", avatarGradient: "linear-gradient(135deg,#8e44ad,#5b2c6f)" },
    { num: "14", initials: "AR", name: "Agustin Rojas", avatarGradient: "linear-gradient(135deg,#16a085,#0d6655)" },
    { num: "15", initials: "ND", name: "Nacho Davin", avatarGradient: "linear-gradient(135deg,#2980b9,#1a5276)" },
    { num: "16", initials: "MP", name: "Matias Pacheco", avatarGradient: "linear-gradient(135deg,#c0392b,#922b21)" },
    { num: "17", initials: "FA", name: "Fernando Ali", avatarGradient: "linear-gradient(135deg,#f39c12,#a06000)" },
    { num: "18", initials: "AM", name: "Agustin Moles", avatarGradient: "linear-gradient(135deg,#1abc9c,#148f77)" },
    { num: "19", initials: "FG", name: "Franco Guerreros", avatarGradient: "linear-gradient(135deg,#7f8c8d,#515a5a)" },
    { num: "20", initials: "KL", name: "Kevin Lhuillier", avatarGradient: "linear-gradient(135deg,#9b59b6,#76448a)" },
    { num: "21", initials: "GA", name: "Gonzalo Alonso", avatarGradient: "linear-gradient(135deg,#27ae60,#1e8449)" },
    { num: "22", initials: "UM", name: "Uriel Manzanelli", avatarGradient: "linear-gradient(135deg,#e74c3c,#c0392b)" },
    { num: "23", initials: "LF", name: "Lucio Focaccia", avatarGradient: "linear-gradient(135deg,#2c3e50,#1a252f)" },
    { num: "24", initials: "JS", name: "Juan Jose Sanchez", avatarGradient: "linear-gradient(135deg,#3498db,#2980b9)" },
    { num: "25", initials: "AC", name: "Agustin Chijanoski", avatarGradient: "linear-gradient(135deg,#f1c40f,#d4ac00)" },
    { num: "26", initials: "AS", name: "Agustin Savone", avatarGradient: "linear-gradient(135deg,#e67e22,#ca6f1e)" },
    { num: "27", initials: "PA", name: "Patricio Aguerreche", avatarGradient: "linear-gradient(135deg,#1abc9c,#17a589)" },
    { num: "28", initials: "MC", name: "Matias Cayrus Riffel", avatarGradient: "linear-gradient(135deg,#8e44ad,#7d3c98)" },
    { num: "29", initials: "NV", name: "Nico Valero", avatarGradient: "linear-gradient(135deg,#2ecc71,#27ae60)" },
    { num: "30", initials: "LN", name: "Lucas Nin", avatarGradient: "linear-gradient(135deg,#c0392b,#a93226)" },
    { num: "31", initials: "JV", name: "Julian Valiñas", avatarGradient: "linear-gradient(135deg,#2980b9,#2471a3)" },
    { num: "32", initials: "EP", name: "Eric Priemer", avatarGradient: "linear-gradient(135deg,#7f8c8d,#626567)" },
    { num: "33", initials: "SO", name: "Santiago Ortiz Ocampo", avatarGradient: "linear-gradient(135deg,#e84040,#922b21)" },
    { num: "34", initials: "LS", name: "Luka Sanchez", avatarGradient: "linear-gradient(135deg,#1abc9c,#148f77)" },
    { num: "35", initials: "LM", name: "Lucas Morel", avatarGradient: "linear-gradient(135deg,#aab7b8,#717d7e)" },
    { num: "36", initials: "AG", name: "Alejandro Guerrero", avatarGradient: "linear-gradient(135deg,#e84393,#a01c6a)" },
    { num: "37", initials: "AJ", name: "Alejandro Jara", avatarGradient: "linear-gradient(135deg,#6c5ce7,#4527a0)" },
    { num: "38", initials: "DC", name: "Daniel Castro", avatarGradient: "linear-gradient(135deg,#00b894,#008060)" },
    { num: "39", initials: "FT", name: "Facundo Toledo", avatarGradient: "linear-gradient(135deg,#e17055,#b0533a)" },
    { num: "40", initials: "FL", name: "Fede Landa", avatarGradient: "linear-gradient(135deg,#0984e3,#0652a0)" },
    { num: "41", initials: "FP", name: "Francisco Piccinini", avatarGradient: "linear-gradient(135deg,#fdcb6e,#d4a040)" },
    { num: "42", initials: "GB", name: "Gonzalo Bariffuzza", avatarGradient: "linear-gradient(135deg,#e84393,#c03070)" },
    { num: "43", initials: "GC", name: "Gustavo Corrales", avatarGradient: "linear-gradient(135deg,#00cec9,#009a96)" },
    { num: "44", initials: "IA", name: "Ignacio Aprikian", avatarGradient: "linear-gradient(135deg,#ffeaa7,#d4c080)" },
    { num: "45", initials: "JM", name: "Jonathan Molleker", avatarGradient: "linear-gradient(135deg,#fd79a8,#c0507a)" },
    { num: "46", initials: "JK", name: "Juan Ignacio Kuchen", avatarGradient: "linear-gradient(135deg,#55efc4,#30b090)" },
    { num: "47", initials: "JR", name: "Julian Agustin Reynoso Zuñiga", avatarGradient: "linear-gradient(135deg,#74b9ff,#4090c0)" },
    { num: "48", initials: "LD", name: "Luca Díaz", avatarGradient: "linear-gradient(135deg,#a29bfe,#7060c0)" },
    { num: "49", initials: "LB", name: "Lucas Berti", avatarGradient: "linear-gradient(135deg,#fab1a0,#c08070)" },
    { num: "50", initials: "LB", name: "Luciano Bogado", avatarGradient: "linear-gradient(135deg,#81ecec,#50b0b0)" },
    { num: "51", initials: "LB", name: "Luciano Bravo", avatarGradient: "linear-gradient(135deg,#e17055,#b05040)" },
    { num: "52", initials: "MC", name: "Manuel Camarero", avatarGradient: "linear-gradient(135deg,#00b4d8,#007090)" },
    { num: "53", initials: "MH", name: "Marcelo Haase", avatarGradient: "linear-gradient(135deg,#f8a5c2,#c07080)" },
    { num: "54", initials: "MD", name: "Marcos Donner", avatarGradient: "linear-gradient(135deg,#778beb,#5058a0)" },
    { num: "55", initials: "MS", name: "Mariano Sale", avatarGradient: "linear-gradient(135deg,#f19066,#c07040)" },
    { num: "56", initials: "MD", name: "Martin Diaz", avatarGradient: "linear-gradient(135deg,#e77f67,#c05040)" },
    { num: "57", initials: "MM", name: "Mateo Magri", avatarGradient: "linear-gradient(135deg,#3dc1d3,#2090a0)" },
    { num: "58", initials: "MD", name: "Matias Dowojak", avatarGradient: "linear-gradient(135deg,#e15f41,#c04030)" },
    { num: "59", initials: "MD", name: "Maximiliano Dieringer", avatarGradient: "linear-gradient(135deg,#546de5,#3040a0)" },
    { num: "60", initials: "ND", name: "Nicolas Davin", avatarGradient: "linear-gradient(135deg,#63cdda,#309090)" },
    { num: "61", initials: "NM", name: "Nicolas Marsilio", avatarGradient: "linear-gradient(135deg,#cf6a87,#a04060)" },
    { num: "62", initials: "NP", name: "Nicolas Picone", avatarGradient: "linear-gradient(135deg,#786fa6,#504080)" },
    { num: "63", initials: "RG", name: "Ramiro Grazzini", avatarGradient: "linear-gradient(135deg,#f3a683,#c07050)" },
    { num: "64", initials: "SM", name: "Samir Monier", avatarGradient: "linear-gradient(135deg,#b8e994,#70a060)" },
    { num: "65", initials: "AT", name: "Alan Truffe", avatarGradient: "linear-gradient(135deg,#d980fa,#a040c0)" },
    { num: "66", initials: "VC", name: "Valentin Corts", avatarGradient: "linear-gradient(135deg,#82ccdd,#5090a0)" },
    { num: "67", initials: "JC", name: "Joaquin Campolieti", avatarGradient: "linear-gradient(135deg,#00cec9,#009a96)" },
  ].map((d) => [d.name, d] as const)
);

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
