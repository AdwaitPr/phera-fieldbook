import { useEffect, useState } from "react";
import type { CropKey } from "../data/frames";

/**
 * Breakpoint → art direction selector.
 * Mobile crops to a 9:16 vertical close-up, tablet to a 3:4 portrait plate,
 * desktop to 16:9, and true ultrawide viewports re-frame again to 21:9.
 */
/* The Tailwind `xl` breakpoint (1280px) is where the ivory plate appears, so the
   media crops switch on the same threshold the layout does. */
const QUERIES: Array<{ key: CropKey; query: string }> = [
  { key: "mobile", query: "(max-width: 719px)" },
  { key: "tablet", query: "(min-width: 720px) and (max-width: 1279px)" },
  { key: "ultrawide", query: "(min-width: 1280px) and (min-aspect-ratio: 2/1)" },
  { key: "desktop", query: "(min-width: 1280px)" },
];

function read(): { crop: CropKey; labels: Record<CropKey, boolean> } {
  const active = QUERIES.find(({ query }) => window.matchMedia(query).matches);
  const crop = (active?.key ?? "desktop") as CropKey;
  const labels = {} as Record<CropKey, boolean>;
  for (const q of QUERIES) labels[q.key] = q.query === active?.query;
  return { crop, labels };
}

export function useArtDirection() {
  const [state, setState] = useState(() =>
    typeof window === "undefined"
      ? { crop: "desktop" as CropKey, labels: {} as Record<CropKey, boolean> }
      : read(),
  );

  useEffect(() => {
    const mqls = QUERIES.map(({ query }) => window.matchMedia(query));
    const onChange = () => setState(read());
    mqls.forEach((m) => m.addEventListener?.("change", onChange));
    window.addEventListener("orientationchange", onChange);
    onChange();
    return () => {
      mqls.forEach((m) => m.removeEventListener?.("change", onChange));
      window.removeEventListener("orientationchange", onChange);
    };
  }, []);

  return state;
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mql.matches);
    const onChange = () => setReduced(mql.matches);
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

/** True only when the device will comfortably stream a looping video layer. */
export function useAmbientVideoEnabled() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const nav = navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } };
    const conn = nav.connection;
    const ok =
      !conn?.saveData &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      !window.matchMedia("(max-width: 719px)").matches &&
      (!conn?.effectiveType || /4g|5g/.test(conn.effectiveType));
    setEnabled(ok);
  }, []);
  return enabled;
}

export function useClock(timeZone = "en-IN") {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(t);
  }, []);
  return new Intl.DateTimeFormat(timeZone, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Kolkata",
  }).format(now);
}
