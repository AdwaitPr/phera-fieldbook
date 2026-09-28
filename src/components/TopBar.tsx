import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const LINKS = [
  { label: "Rituals", note: "haldi → vidaai", href: "#rituals" },
  { label: "The Atelier", note: "how we work", href: "#method" },
  { label: "Venues", note: "22 houses, 9 cities", href: "#method" },
  { label: "Journal", note: "field notes", href: "#method" },
];

function Mark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="none">
      <path d="M12 1.6 22.4 12 12 22.4 1.6 12 12 1.6Z" stroke="currentColor" strokeWidth="1" />
      <path d="M12 6.4 17.6 12 12 17.6 6.4 12 12 6.4Z" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

export default function TopBar({ ink }: { ink: boolean }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-40 flex items-start justify-between gap-4 px-5 pt-5 sm:px-8 sm:pt-7 xl:px-10 xl:pt-8">
        {/* brand — sits on the ivory plate at xl, over the frame below it */}
        <a
          href="#top"
          className={`group pointer-events-auto flex items-center gap-3 transition-colors duration-700 ${
            ink ? "text-ink" : "text-ivory"
          }`}
        >
          <Mark className="h-[18px] w-[18px] shrink-0 transition-transform duration-[1400ms] ease-[cubic-bezier(.16,.84,.24,1)] group-hover:rotate-90" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-[15px] uppercase tracking-[0.42em]">Mangala</span>
            <span className={`mt-[6px] text-[8.5px] uppercase track-wide ${ink ? "text-clay" : "text-ivory/55"}`}>
              Ceremonial Atelier
            </span>
          </span>
        </a>

        <nav className="pointer-events-auto hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="group relative text-[10.5px] uppercase track-wide text-ivory/70 transition-colors duration-500 hover:text-ivory"
            >
              {l.label}
              <span className="absolute -bottom-[6px] left-0 h-px w-full origin-left scale-x-0 bg-ochre-soft transition-transform duration-700 ease-[cubic-bezier(.16,.84,.24,1)] group-hover:scale-x-100" />
            </a>
          ))}
          <a
            href="#enquire"
            className="group flex items-center gap-2 border border-ivory/25 px-4 py-2 text-[10px] uppercase track-wide text-ivory/85 transition-colors duration-700 hover:border-ochre-soft/70 hover:bg-ivory/5"
          >
            Enquire
            <ArrowUpRight
              className="h-3 w-3 transition-transform duration-700 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
              strokeWidth={1.25}
            />
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open the menu"
          className="pointer-events-auto flex items-center gap-2 text-[10px] uppercase track-wide text-ivory/80 transition-colors duration-500 hover:text-ivory lg:hidden"
        >
          Menu
          <Menu className="h-4 w-4" strokeWidth={1.25} />
        </button>
      </div>

      {/* mobile + tablet overlay */}
      <div
        className={`fixed inset-0 z-50 flex flex-col bg-ivory text-ink transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(.16,.84,.24,1)] lg:hidden ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between px-5 py-6">
          <span className="font-display text-[15px] uppercase tracking-[0.42em]">Mangala</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close the menu"
            className="flex items-center gap-2 text-[10px] uppercase track-wide text-ink/70"
          >
            Close
            <X className="h-4 w-4" strokeWidth={1.25} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col justify-center gap-1 px-6 pb-16">
          {LINKS.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="group flex items-baseline justify-between border-b border-shell/70 py-5"
              style={{
                transitionDelay: `${i * 60}ms`,
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(10px)",
                transitionProperty: "opacity, transform",
                transitionDuration: "900ms",
                transitionTimingFunction: "cubic-bezier(.16,.84,.24,1)",
              }}
            >
              <span className="font-display text-[30px] leading-none transition-colors duration-500 group-hover:text-vermilion">
                {l.label}
              </span>
              <span className="text-[9px] uppercase track-wide text-clay">{l.note}</span>
            </a>
          ))}
          <a
            href="#enquire"
            onClick={() => setOpen(false)}
            className="mt-8 self-start border border-vermilion/40 px-6 py-3 text-[10px] uppercase track-wide text-vermilion transition-colors duration-500 hover:bg-vermilion hover:text-ivory"
          >
            Begin an enquiry
          </a>
        </nav>

        <p className="border-t border-shell px-6 py-5 text-[8.5px] uppercase track-wide text-clay">
          Mangala · Estd. 2009 · Jaipur Udaipur Jodhpur Kochi
        </p>
      </div>
    </>
  );
}
