"use client";

import { useEffect, useState } from "react";

const RACE_DATE = new Date("2026-06-01T21:30:00-03:00");

export default function Countdown() {
  const [display, setDisplay] = useState<string[]>(["--", "--", "--", "--"]);

  useEffect(() => {
    function update() {
      const diff = RACE_DATE.getTime() - Date.now();
      if (diff <= 0) {
        setDisplay(["00", "00", "00", "00"]);
        return;
      }
      const pad = (n: number) => String(n).padStart(2, "0");
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setDisplay([pad(d), pad(h), pad(m), pad(s)]);
    }
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const labels = ["Días", "Horas", "Min", "Seg"];

  return (
    <div className="countdown">
      {display.map((val, i) => (
        <div className="countdown-unit" key={labels[i]}>
          <span className="countdown-number">{val}</span>
          <span className="countdown-label">{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}
