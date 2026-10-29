"use client";

import Script from "next/script";
import { useEffect } from "react";
import { track } from "@/lib/analytics";

const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

/**
 * Loads Plausible (cookie-free, no banner needed) when a domain is configured,
 * and sends an event for every click on an element with data-track="event_name".
 */
export function Analytics() {
  useEffect(() => {
    if (!domain) return;
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-track]");
      if (el?.dataset.track) track(el.dataset.track, { path: location.pathname });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!domain) return null;
  return (
    <>
      <Script id="plausible-queue" strategy="afterInteractive">
        {`window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}`}
      </Script>
      <Script src="https://plausible.io/js/script.tagged-events.js" data-domain={domain} strategy="afterInteractive" />
    </>
  );
}
