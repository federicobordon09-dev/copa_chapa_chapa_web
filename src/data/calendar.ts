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

export const calendarEntries: CalendarEntry[] = [];
