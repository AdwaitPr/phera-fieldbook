import { ArrowRight } from "lucide-react";
import { MATERIALS, materialCrop } from "../data/frames";
import type { Frame } from "../data/frames";

/**
 * The text column. 20% of the composition, and it does all the talking.
 * `tone="ink"` when it sits on the ivory plate, `tone="ivory"` when it sits on the frame.
 */
export default function Plate({
  frame,
  index,
  tone,
  clock,
}: {
  frame: Frame;
  index: number;
  tone: "ink" | "ivory";
  clock: string;
}) {
  const ink = tone === "ink";

  const c = {
    eyebrow: ink ? "text-vermilion" : "text-ochre-soft",
    head: ink ? "text-ink" : "text-ivory",
    body: ink ? "text-ink/62" : "text-ivory/72",
    rule: ink ? "bg-shell" : "bg-ivory/25",
    hair: ink ? "border-ink/20 hover:border-ink/45" : "border-ivory/30 hover:border-ochre-soft/70",
    ctaText: ink ? "text-ink group-hover:text-ivory" : "text-ivory group-hover:text-ink",
    ctaFill: ink ? "bg-vermilion" : "bg-ivory",
    meta: ink ? "text-clay" : "text-ivory/45",
  };

  return (
    <div className="flex w-full flex-col justify-end gap-7">
      <p className={`reveal flex items-center gap-3 text-[9.5px] track-wide uppercase ${c.eyebrow}`} style={{ animationDelay: "260ms" }}>
        <span className={`inline-block h-[5px] w-[5px] rotate-45 ${ink ? "bg-vermilion" : "bg-ochre-soft"}`} />
        Estd. 2009 · Jaipur · Udaipur · Kochi
      </p>

      <h1
        className={`reveal-wide font-display text-[clamp(2.05rem,8.6vw,4.3rem)] leading-[0.96] tracking-[-0.015em] xl:text-[clamp(1.75rem,2.9vw,2.7rem)] ${c.head}`}
        style={{ animationDelay: "400ms" }}
      >
        <span className="block">Ninety-one marigolds,</span>
        <span className="block">
          <em className="font-display italic font-normal opacity-90">and not one</em> of them
        </span>
        <span className="block">late.</span>
      </h1>

      <div className={`reveal-rule h-px w-full max-w-[300px] ${c.rule}`} style={{ animationDelay: "900ms" }} />

      <p
        className={`reveal max-w-[46ch] text-[13.5px] leading-[1.75] ${c.body}`}
        style={{ animationDelay: "1020ms" }}
      >
        One atelier holds the whole day — ritual sequencing, the florist who counts the blossoms, the
        4 a.m. lamp, the guests no one remembered. Thirty-two ceremonies a year, so that nothing is
        left to the morning.
      </p>

      {/* the single, quiet CTA */}
      <div className="reveal" style={{ animationDelay: "1180ms" }}>
        <a
          href="#method"
          className={`group relative inline-flex items-center gap-4 overflow-hidden border px-8 py-4 text-[10px] track-wide uppercase transition-colors duration-700 ease-[cubic-bezier(.16,.84,.24,1)] ${c.hair} ${c.ctaText}`}
        >
          <span
            aria-hidden
            className={`absolute inset-0 origin-left scale-x-0 transition-transform duration-[1100ms] ease-[cubic-bezier(.16,.84,.24,1)] group-hover:scale-x-100 ${c.ctaFill}`}
          />
          <span className="relative">Discover Your Style</span>
          <ArrowRight className="relative h-3.5 w-3.5 transition-transform duration-[900ms] ease-[cubic-bezier(.16,.84,.24,1)] group-hover:translate-x-1.5" strokeWidth={1.25} />
        </a>
        <p className={`mt-3 text-[9.5px] track-wide uppercase ${c.meta}`}>
          Eight quiet minutes · a planner, not a salesperson
        </p>
      </div>

      {/* in today's frame — the materials */}
      <div className="reveal flex items-end gap-5" style={{ animationDelay: "1320ms" }}>
        <span className={`text-[9px] track-wide uppercase leading-[1.6] ${c.meta}`}>
          In today’s
          <br />
          frame
        </span>
        <ul className="flex items-end gap-3">
          {MATERIALS.map((m, i) => (
            <li key={m.label} className="group/mat relative">
              <span
                className={`block h-11 w-9 overflow-hidden transition-[filter,transform] duration-[1100ms] ease-[cubic-bezier(.16,.84,.24,1)] group-hover/mat:-translate-y-1 ${
                  ink ? "shadow-[0_6px_18px_-10px_#1b1512aa]" : ""
                }`}
                style={{ transform: `rotate(${i === 1 ? 0 : i === 0 ? -2 : 2}deg)` }}
              >
                <img
                  src={materialCrop(m.id, 160, 200)}
                  alt={m.label}
                  loading="lazy"
                  decoding="async"
                  className="grade h-full w-full scale-105 object-cover opacity-90 transition-[opacity,filter] duration-[1100ms] group-hover/mat:opacity-100 group-hover/mat:saturate-100"
                  style={{ objectPosition: m.pos }}
                />
              </span>
              <span
                className={`pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 whitespace-nowrap text-[8.5px] track-wide uppercase opacity-0 transition-opacity duration-700 group-hover/mat:opacity-100 ${c.meta}`}
              >
                {m.label} — {m.sub}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* current chapter line, synced to the frame underneath */}
      <div className={`flex items-center justify-between gap-6 border-t pt-4 ${ink ? "border-shell" : "border-ivory/20"}`}>
        <span key={frame.key} className="reveal flex items-baseline gap-3 text-[9.5px] track-wide uppercase">
          <span className={c.eyebrow}>{frame.numeral}</span>
          <span className={ink ? "text-ink/70" : "text-ivory/80"}>
            {frame.ritual} — {frame.scene}
          </span>
        </span>
        <span className={`tabular text-[9px] track-wide uppercase ${c.meta}`}>
          <span className="mr-1.5 inline-block h-1 w-1 -translate-y-[1px] rounded-full bg-ochre align-middle opacity-80" />
          {index + 1}/4 · Jaipur {clock}
        </span>
      </div>
    </div>
  );
}
