"use client";

import { useEffect, useState } from "react";

const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Dubai", hour: "2-digit", minute: "2-digit", weekday: "short" });

/** Live local time in Dubai (GST, UTC+4), so visitors abroad know when to call. */
export function LocalTime() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const t = setInterval(tick, 30_000);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="inline-flex items-center gap-1.5 tabular-nums">
      <span className="text-muted">Dubai</span>
      <span className="font-semibold">{now ?? "--:--"}</span>
      <span className="text-muted">GST</span>
    </span>
  );
}
