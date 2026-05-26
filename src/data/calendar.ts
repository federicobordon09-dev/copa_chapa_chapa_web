export interface CalendarEntry {
  num: string;
  status: "done" | "next" | "upcoming";
  fechaLabel: string;
  name: string;
  circuit: string;
  location: string;
  splits: string[];
  statusLabel: string;
}

export const calendarEntries: CalendarEntry[] = [
  {
    num: "01",
    status: "done",
    fechaLabel: "Fecha 1 · Completada",
    name: "Comodoro Rivadavia",
    circuit: "Auto Moto Club Comodoro Rivadavia",
    location: "Chubut",
    splits: ["Split 1 · 1° Fabian Gamero", "Split 2 · 1° Damian Ludueña"],
    statusLabel: "Finalizada",
  },
  {
    num: "02",
    status: "done",
    fechaLabel: "Fecha 2 · Completada",
    name: "Buenos Aires",
    circuit: "Autódromo Oscar y Juan Gálvez",
    location: "Argentina",
    splits: ["Split 1 · 1° Bruno Koller", "Split 2 · 1° Alejandro Rodriguez"],
    statusLabel: "Finalizada",
  },
  {
    num: "03",
    status: "done",
    fechaLabel: "Fecha 3 · Completada",
    name: "Toay La Pampa",
    circuit: "Circuito de La Pampa",
    location: "Argentina",
    splits: ["Split 1 · 1° Santino Casciano", "Split 2 · 1° Brian Campos"],
    statusLabel: "Finalizada",
  },
  {
    num: "04",
    status: "next",
    fechaLabel: "⚑ Próxima · Lunes 1 de Junio · 21:30 hs",
    name: "La Plata",
    circuit: "Autódromo Roberto Mouras",
    location: "Buenos Aires",
    splits: ["Split 1 · Por definir", "Split 2 · Por definir"],
    statusLabel: "Próxima",
  },
];
