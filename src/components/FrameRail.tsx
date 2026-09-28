import { thumbFor } from "../data/frames";
import type { CropKey, Frame } from "../data/frames";

const RATIOS: Record<CropKey, string> = {
  mobile: "9:16",
  tablet: "3:4",
  desktop: "16:9",
  ultrawide: "21:9",
};

/**
 * The chapter index. Vertical along the right edge on wide screens, a horizontal
 * filmstrip on touch. Choosing a chapter re-frames the whole backdrop.
 */
export default function FrameRail({
  frames,
  active,
  onPick,
  cropKey,
  dur,
  tick,
  reduced,
}: {
  frames: Frame[];
  active: number;
  onPick: (i: number) => void;
  cropKey: CropKey;
  dur: number;
  tick: number;
  reduced: boolean;
}) {
  const vertical = cropKey === "desktop" || cropKey === "ultrawide";

  if (!vertical) {
    return (
      <div>
        <p className="tabular mb-3 flex items-center gap-2 text-[8.5px] uppercase track-wide text-ivory/35">
          <span className="h-px w-4 bg-ivory/25" />
          this viewport · framing {RATIOS[cropKey]} · {frames[active].crops[cropKey].w}×
          {frames[active].crops[cropKey].h} · LQIP 60px
        </p>
        <div className="no-bar flex gap-3 overflow-x-auto pb-1">
        {frames.map((f, i) => (
          <button
            key={f.key}
            type="button"
            onClick={() => onPick(i)}
            aria-current={i === active}
            className="group relative flex shrink-0 items-center gap-2.5"
          >
            <span
              className={`block h-14 w-10 overflow-hidden transition-[filter,opacity,transform] duration-[1100ms] ease-[cubic-bezier(.16,.84,.24,1)] ${
                i === active ? "opacity-100" : "opacity-45 saturate-50 group-hover:opacity-80"
              }`}
            >
              <img
                src={thumbFor(f.crops[cropKey], 110, 154)}
                alt=""
                loading="lazy"
                decoding="async"
                className="grade h-full w-full scale-110 object-cover"
                style={{ objectPosition: f.crops[cropKey].pos }}
              />
            </span>
            <span className="flex flex-col items-start gap-1 pr-1">
              <span
                className={`text-[9px] track-wide uppercase ${
                  i === active ? "text-ochre-soft" : "text-ivory/45"
                } transition-colors duration-700`}
              >
                {f.numeral} · {f.ritual}
              </span>
              <span className="relative block h-px w-10 overflow-hidden bg-ivory/20">
                {i === active && (
                  <span
                    key={`${tick}-${cropKey}`}
                    className={`absolute inset-0 block bg-ochre-soft ${reduced ? "" : "fx-progress"}`}
                    style={{ ["--dur" as string]: `${dur}ms` }}
                  />
                )}
              </span>
            </span>
          </button>
        ))}
        </div>
      </div>
    );
  }

  return (
    <div className="pointer-events-auto absolute right-0 top-1/2 z-30 hidden -translate-y-1/2 xl:block">
      <ul className="flex flex-col items-end gap-1 pr-6">
        {frames.map((f, i) => {
          const isActive = i === active;
          const crop = f.crops[cropKey];
          return (
            <li key={f.key}>
              <button
                type="button"
                onClick={() => onPick(i)}
                aria-current={isActive}
                className="group flex w-full items-center justify-end gap-4 py-3 text-right"
              >
                <span className="flex flex-col items-end gap-1">
                  <span
                    className={`text-[9px] track-wide uppercase transition-colors duration-[900ms] ${
                      isActive ? "text-ochre-soft" : "text-ivory/45 group-hover:text-ivory/85"
                    }`}
                  >
                    {f.numeral}
                  </span>
                  <span
                    className={`font-display text-[15px] leading-none transition-all duration-[1100ms] ease-[cubic-bezier(.16,.84,.24,1)] ${
                      isActive
                        ? "text-ivory opacity-100"
                        : "text-ivory/55 opacity-70 group-hover:text-ivory group-hover:opacity-100"
                    }`}
                  >
                    {f.ritual}
                  </span>
                  <span
                    className={`relative mt-1 block h-px w-16 overflow-hidden bg-ivory/15 transition-opacity duration-700 ${
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-40"
                    }`}
                  >
                    {isActive && (
                      <span
                        key={`${tick}-${cropKey}`}
                        className={`absolute inset-0 block bg-ochre-soft ${reduced ? "" : "fx-progress"}`}
                        style={{ ["--dur" as string]: `${dur}ms` }}
                      />
                    )}
                  </span>
                </span>
                <span
                  className={`relative block h-[74px] w-[54px] overflow-hidden transition-[clip-path,transform,filter,opacity] duration-[1300ms] ease-[cubic-bezier(.16,.84,.24,1)] ${
                    isActive ? "saturate-100" : "opacity-55 saturate-[.4] group-hover:opacity-90"
                  }`}
                  style={{ clipPath: isActive ? "inset(0% 0% 0% 0%)" : "inset(14% 0% 14% 0%)" }}
                >
                  <img
                    src={thumbFor(crop, 150, 210)}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="grade h-full w-full scale-110 object-cover transition-transform duration-[2000ms] ease-[cubic-bezier(.16,.84,.24,1)] group-hover:scale-100"
                    style={{ objectPosition: crop.pos }}
                  />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <div className="mt-5 flex flex-col items-end gap-2.5 pr-6 text-[8.5px] track-wide uppercase text-ivory/35">
        <span className="flex items-center gap-2">
          <span className="fx-pulse-line block h-3 w-px origin-top bg-ochre-soft/70" />
          Sequence on · {(dur / 1000).toFixed(1)}s
        </span>
        {/* which crop this viewport is actually being served */}
        <span className="flex items-center gap-2">
          {(["mobile", "tablet", "desktop", "ultrawide"] as CropKey[]).map((k) => (
            <span
              key={k}
              className={`transition-colors duration-[900ms] ${k === cropKey ? "text-ochre-soft" : "hover:text-ivory/60"}`}
            >
              {RATIOS[k]}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}
