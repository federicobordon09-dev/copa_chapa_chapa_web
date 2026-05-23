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
    splits: ["Split 1 · 1° Alejandro Rodriguez", "Split 2 · 1° Bruno Koller"],
    statusLabel: "Finalizada",
  },
  {
    num: "03",
    status: "next",
    fechaLabel: "⚑ Próxima · Lunes 25 de Mayo · 21:30 hs",
    name: "Toay La Pampa",
    circuit: "Circuito de La Pampa",
    location: "Argentina",
    splits: ["Split 1 · Por definir", "Split 2 · Por definir"],
    statusLabel: "Próxima",
  },
  {
    num: "04",
    status: "upcoming",
    fechaLabel: "Fecha 4 · Por anunciar",
    name: "TBA",
    circuit: "Circuito por confirmar",
    location: "Argentina",
    splits: ["Split 1 · Por definir", "Split 2 · Por definir"],
    statusLabel: "Por anunciar",
  },
];
