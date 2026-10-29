/**
 * Privacy-friendly event tracking. Uses Plausible when its script is loaded
 * (set NEXT_PUBLIC_PLAUSIBLE_DOMAIN) and does nothing otherwise.
 */
type Plausible = (event: string, options?: { props?: Record<string, string> }) => void;

export function track(event: string, props?: Record<string, string>) {
  if (typeof window === "undefined") return;
  const plausible = (window as unknown as { plausible?: Plausible }).plausible;
  plausible?.(event, props ? { props } : undefined);
}
