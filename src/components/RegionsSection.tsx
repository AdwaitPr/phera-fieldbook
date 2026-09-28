import React, { useCallback, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import type { Region } from "../data/regions";
import { REGIONS } from "../data/regions";
import motifPhulkari from "../assets/motif-phulkari.jpg";
import motifAlpana from "../assets/motif-alpana.jpg";
import motifJasmine from "../assets/motif-jasmine.jpg";

type MotifKind = Region["key"];

const IMAGES: Record<MotifKind, string> = {
  phulkari: motifPhulkari,
  alpana: motifAlpana,
  jasmine: motifJasmine,
};

const EASE = "cubic-bezier(.16,.84,.24,1)";

/* ——— the three motifs, drawn rather than photographed ——— */

/** Phulkari's 'bagh' — a field of diamonds, stitched in four colours. */
function PhulkariMotif({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 180" aria-hidden className={className} preserveAspectRatio="xMidYMid meet">
      <g fill="none">
        <path d="M90 24 156 90 90 156 24 90 90 24Z" stroke="currentColor" strokeWidth=".9" opacity=".62" />
        <path d="M90 42 138 90 90 138 42 90 90 42Z" stroke="currentColor" strokeWidth=".6" opacity=".5" />
        <path d="M90 66 114 90 90 114 66 90 90 66Z" fill="currentColor" opacity=".9" />
        <path d="M90 82 98 90 90 98 82 90 90 82Z" fill="currentColor" opacity=".38" />
        {[66, 96, 126].map((y) =>
          [54, 126].map((x) =>
            [0, 1].map((s) => (
              <path key={`${x}-${y}-${s}`} d={`M${x} ${y}l10 ${s ? -10 : 10} 10 ${s ? -10 : 10}-10 ${s ? -10 : 10}z`} fill="currentColor" opacity={y === 96 ? ".34" : ".24"} />
            )),
          ),
        )}
        {[36, 150].map((y) => (
          <g key={y} opacity=".45">
            {[40, 66, 92, 118, 144].map((x, i) => (
              <path key={x} d={`M${x} ${y}l10 10-10 10-10-10 10-10z`} fill="currentColor" opacity={i % 2 ? ".55" : "1"} />
            ))}
          </g>
        ))}
      </g>
    </svg>
  );
}

/** Alpana — concentric petals, fish and dot-rings, one hand's tremor intact. */
function AlpanaMotif({ className = "" }: { className?: string }) {
  const petals = useMemo(
    () => Array.from({ length: 8 }, (_, i) => (i / 8) * Math.PI * 2),
    [],
  );
  const rings = useMemo(
    () => Array.from({ length: 16 }, (_, i) => (i / 16) * Math.PI * 2),
    [],
  );

  return (
    <svg viewBox="0 0 180 180" aria-hidden className={className} preserveAspectRatio="xMidYMid meet">
      <g fill="currentColor">
        {rings.map((a, i) => (
          <circle
            key={`d${i}`}
            cx={90 + Math.cos(a) * 78}
            cy={90 + Math.sin(a) * 78}
            r={i % 2 ? 1.2 : 1.9}
            opacity={0.44 - (i % 3) * 0.08}
          />
        ))}
        {petals.map((a, i) => (
          <ellipse
            key={`p${i}`}
            cx={90 + Math.cos(a) * 58}
            cy={90 + Math.sin(a) * 58}
            rx={6.5}
            ry={17}
            opacity=".78"
            transform={`rotate(${(a * 180) / Math.PI + 90} ${90 + Math.cos(a) * 58} ${90 + Math.sin(a) * 58})`}
          />
        ))}
        {petals.map((a, i) => (
          <ellipse
            key={`q${i}`}
            cx={90 + Math.cos(a + Math.PI / 8) * 34}
            cy={90 + Math.sin(a + Math.PI / 8) * 34}
            rx={4}
            ry={11}
            opacity=".46"
            transform={`rotate(${((a + Math.PI / 8) * 180) / Math.PI + 90} ${90 + Math.cos(a + Math.PI / 8) * 34} ${90 + Math.sin(a + Math.PI / 8) * 34})`}
          />
        ))}
        <circle cx={90} cy={90} r={6} opacity=".9" />
        <circle cx={75.5} cy={84} r={1.6} opacity=".7" />
        <circle cx={104.5} cy={84} r={1.6} opacity=".7" />
        <circle cx={90} cy={104.5} r={1.6} opacity=".62" />
      </g>
      {/* the fish, drawn as one lozenge with fins */}
      <path
        d="M90 118c5 4.4 6.4 12.5 0 22-6.4-9.5-5-17.6 0-22Zm-8.5 13.5c2.6 2.1 2.7 6 0 8.2m15-8.2c-2.6 2.1-2.7 6 0 8.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity=".68"
      />
    </svg>
  );
}

/** Malligai — one garland loop of many small blossoms, leaning as cloth does. */
function JasmineMotif({ className = "" }: { className?: string }) {
  const blossoms = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => {
        const x = 92 + Math.sin(i * 0.46 + 0.35) * 30 + (i % 4 === 0 ? 9 : -5);
        const y = 18 + i * 4.8;
        const r = 7.2 - i * 0.11;
        return { x, y, r, a: i * 23 };
      }),
    [],
  );

  return (
    <svg viewBox="0 0 180 180" aria-hidden className={className} preserveAspectRatio="xMidYMid meet">
      <g fill="currentColor">
        {blossoms.map((b, i) => (
          <g key={i} transform={`rotate(${b.a} ${b.x} ${b.y})`} opacity={0.96 - i * 0.016}>
            {[0, 72, 144, 216, 288].map((deg) => (
              <ellipse
                key={deg}
                cx={b.x}
                cy={b.y - b.r * 0.82}
                rx={b.r * 0.74}
                ry={b.r * 1.05}
                transform={`rotate(${deg} ${b.x} ${b.y})`}
              />
            ))}
            <circle cx={b.x} cy={b.y} r={b.r * 0.32} opacity=".55" />
          </g>
        ))}
      </g>
    </svg>
  );
}

const MOTIFS: Record<MotifKind, React.ComponentType<{ className?: string }>> = {
  phulkari: PhulkariMotif,
  alpana: AlpanaMotif,
  jasmine: JasmineMotif,
};

function Card({ region, index }: { region: Region; index: number }) {
  const [painted, setPainted] = useState(false);
  const [open, setOpen] = useState(false);
  const Img = IMAGES[region.key];
  const Motif = MOTIFS[region.key];

  const onPaint = useCallback((el: HTMLImageElement | null) => {
    if (el?.complete && el.naturalWidth > 1) setPainted(true);
  }, []);

  const activate = () => setOpen(true);
  const close = () => setOpen(false);

  return (
    <Reveal as="li" delay={index * 130}>
      <article
        tabIndex={0}
        aria-expanded={open}
        aria-label={`${region.family} — ${region.motif}. Press to unfold.`}
        onMouseEnter={activate}
        onMouseLeave={close}
        onFocus={activate}
        onBlur={close}
        onClick={open ? close : activate}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            open ? close() : activate();
          }
        }}
        className="group relative h-full cursor-pointer select-none overflow-hidden rounded-[26px] bg-ink-soft outline-none transition-all duration-[1300ms] ease-[cubic-bezier(.16,.84,.24,1)] focus-visible:ring-1 focus-visible:ring-ochre-soft/55"
        style={{
          transform: open ? "translateY(-6px)" : "translateY(0)",
          boxShadow: open ? "0 30px 60px -34px #0d0907b8" : "0 18px 44px -30px #0d090766",
        }}
      >
        {/* the base tint — the card's own memory of the pigment */}
        <span aria-hidden className="absolute inset-0" style={{ background: region.tint }} />

        {/* the LQIP — the motif as it is first remembered */}
        <img
          src={region.lqip(60, 76)}
          alt=""
          aria-hidden
          className="lqip absolute inset-0 h-full w-full object-cover"
          style={{ opacity: painted ? 0 : 1 }}
        />

        {/* the photograph — 60% of the card until you lean in, then the whole thing */}
        <div
          className={`absolute inset-0 transition-[opacity] duration-[1600ms] ease-[cubic-bezier(.16,.84,.24,1)] ${
            painted ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            ref={onPaint}
            src={Img}
            alt={region.credit}
            loading="lazy"
            decoding="async"
            fetchPriority={index === 0 ? "high" : "low"}
            onLoad={() => setPainted(true)}
            className="grade h-full w-full object-cover"
            style={{
              transform: open ? "scale(1.09)" : "scale(1.028)",
              transformOrigin: region.key === "jasmine" ? "50% 20%" : region.key === "alpana" ? "50% 50%" : "50% 42%",
              transition: `transform 2600ms ${EASE}`,
            }}
          />
        </div>

        {/* the ground — darkening from the prose, never from a hard line */}
        <span
          aria-hidden
          className={`absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/78 to-transparent transition-opacity duration-[1400ms] ${
            open ? "opacity-100" : "opacity-[0.88]"
          }`}
        />
        <span
          aria-hidden
          className="absolute inset-0 opacity-25 mix-blend-soft-light"
          style={{ background: `radial-gradient(120% 90% at 70% 10%, ${region.tint}66, transparent 65%)` }}
        />

        {/* the copy plate — sealed until you lean in */}
        <div
          className="absolute inset-x-0 bottom-0 p-6 transition-[transform] duration-[1200ms] ease-[cubic-bezier(.16,.84,.24,1)]"
          style={{ transform: open ? "translateY(0)" : "translateY(calc(100% - 148px))" }}
        >
          <div className="flex items-baseline justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="font-display text-[10px] italic text-ochre-soft/90">{region.numeral}</span>
              <Motif className={`h-9 w-9 ${region.key === "jasmine" ? "text-cream" : "text-ivory/92"}`} />
              <h3 className="font-display text-[26px] leading-none text-ivory">{region.region}</h3>
            </div>
            <span
              className={`tabular text-[8.5px] track-wide uppercase text-ivory/40 transition-opacity duration-700 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            >
              read
            </span>
          </div>

          <p className="mt-1.5 text-[8.5px] track-wide uppercase text-ivory/45">{region.family}</p>

          <div
            className={`grid transition-[grid-template-rows,opacity] duration-[1200ms] ease-[cubic-bezier(.16,.84,.24,1)] ${
              open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
            style={{ transitionProperty: "grid-template-rows" }}
          >
            <div className="min-h-0 overflow-hidden">
              <p className="mt-5 max-w-[38ch] text-[12.5px] leading-[1.8] text-ivory/85">
                {region.prose}
              </p>

              <div className="mt-6 border-l border-ochre-soft/35 pl-4">
                <p className="text-[8.5px] track-wide uppercase text-ochre-soft/85">{region.whisper.label}</p>
                <p className="mt-1.5 font-display text-[14px] italic leading-snug text-ivory/90">
                  {region.whisper.value}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between gap-4">
                <p className="text-[8.5px] track-wide uppercase text-ivory/40">{region.credit}</p>
                <a
                  href="#enquire"
                  className="flex items-center gap-2 text-[9px] track-wide uppercase text-ivory/75 transition-colors duration-500 hover:text-ivory"
                >
                  Ask the atelier
                  <ArrowRight className="h-3 w-3 transition-transform duration-700 ease-[cubic-bezier(.16,.84,.24,1)] group-hover:translate-x-1" strokeWidth={1.25} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function RegionsSection() {
  return (
    <section id="regions" className="bg-cream text-ink">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <Reveal>
            <p className="flex items-center gap-3 text-[9px] track-wide uppercase text-vermilion">
              <span className="inline-block h-[5px] w-[5px] rotate-45 bg-vermilion" />
              Chapter III · The Regional Guide
            </p>
            <h2 className="mt-6 font-display text-[clamp(1.7rem,4.4vw,2.9rem)] leading-[1.06] tracking-[-0.015em]">
              Three languages
              <br />
              for the same vow.
              <br />
              <em className="italic opacity-90">We read each.</em>
            </h2>
          </Reveal>

          <Reveal delay={180} className="self-end">
            <p className="max-w-[46ch] text-[13.5px] leading-[1.8] text-ink/60">
              A wedding planner who has only worked in one region knows one wedding. The platform cites the
              pandit, the embroidery, the paste in its own hand — in the regions, not in the review section.
              Below, three households read the same day and hear three different mornings.
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-5 lg:grid-cols-3 lg:gap-6">
          {REGIONS.map((r, i) => (
            <Card key={r.key} region={r} index={i} />
          ))}
        </ul>

        <Reveal className="mt-10 flex flex-wrap items-center justify-between gap-5 border-t border-shell pt-6 text-[8.5px] track-wide uppercase text-clay">
          <span>Motifs kept in the atelier's dyehouse · not fetched from the archive</span>
          <button
            type="button"
            className="group flex items-center gap-2 text-ink/70 transition-colors duration-500 hover:text-vermilion"
          >
            View the whole fieldbook
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-[900ms] ease-[cubic-bezier(.16,.84,.24,1)] group-hover:translate-x-1.5" strokeWidth={1.25} />
          </button>
        </Reveal>
      </div>

      {/* a quiet coda of foothill lamps — same lamps, three ridge lines */}
      <div aria-hidden className="relative h-28 overflow-hidden border-t border-shell/70 sm:h-36">
        {[
          { fill: "#7c5c3e00", ridge: "M0 96c42-26 88-30 138 66 54-40 116-48 166-2 48 42 88 46 132-2V160H0Z", depth: "0.5" },
          { fill: "#7c5c3e36", ridge: "M0 112c58-42 118-44 186 12 60-36 122-34 174 4 52 36 96 36 140 0V160H0Z", depth: "0.75" },
          { fill: "#7c5c3e5c", ridge: "M0 128c50-38 110-38 186 8 66-30 124-26 174 8 54-34 102-32 150 6V160H0Z", depth: "1" },
        ].map((r, i) => (
          <svg key={i} viewBox="0 0 500 160" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 w-full" style={{ height: `${78 + i * 6}%`, opacity: 0.5 + i * 0.25 }}>
            <path d={r.ridge} fill={i === 0 ? "#8a6a45" : i === 1 ? "#69503a" : "#4a382c"} />
          </svg>
        ))}
        {[
          { x: "12%", y: "38%", cls: "fx-lamp-a" },
          { x: "33%", y: "52%", cls: "fx-lamp-b" },
          { x: "57%", y: "34%", cls: "fx-lamp-c" },
          { x: "71%", y: "58%", cls: "fx-lamp-a" },
          { x: "86%", y: "42%", cls: "fx-lamp-b" },
          { x: "23%", y: "62%", cls: "fx-lamp-c" },
          { x: "47%", y: "56%", cls: "fx-lamp-a" },
        ].map((l, i) => (
          <span
            key={i}
            className={`${l.cls} absolute block rounded-full bg-ochre-soft`}
            style={{ left: l.x, top: l.y, width: "2.5px", height: "2.5px", boxShadow: "0 0 6px 1px #d0a45790" }}
          />
        ))}
      </div>
    </section>
  );
}
