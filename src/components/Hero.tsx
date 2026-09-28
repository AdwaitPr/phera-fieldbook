import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import { FRAMES } from "../data/frames";
import { useAmbientVideoEnabled, useArtDirection, useClock, usePrefersReducedMotion } from "../hooks/useArtDirection";
import HeroBackdrop from "./HeroBackdrop";
import Plate from "./Plate";
import FrameRail from "./FrameRail";
import TopBar from "./TopBar";

const DUR = 7600;
const CITIES = "Jaipur · Udaipur · Jodhpur · Kochi · Ahobilam · Varanasi · Alibaug · Shillong";

export default function Hero() {
  const { crop } = useArtDirection();
  const reduced = usePrefersReducedMotion();
  const ambient = useAmbientVideoEnabled();
  const clock = useClock();

  const [active, setActive] = useState(0);
  const [tick, setTick] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [held, setHeld] = useState(false);
  const [scrolled, setScrolled] = useState(0);

  const paused = hidden || held || reduced;
  const frame = FRAMES[active];
  const ultrawide = crop === "ultrawide";
  const plate = crop === "desktop" || crop === "ultrawide";

  /* the sequence — slow, and it stops when you ask it to */
  useEffect(() => {
    if (paused) return;
    const t = window.setTimeout(() => {
      setTick((x) => x + 1);
      setActive((a) => (a + 1) % FRAMES.length);
    }, DUR);
    return () => window.clearTimeout(t);
  }, [paused, active, tick]);

  useEffect(() => {
    const onVis = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!e.target) return;
      if (e.key === "ArrowRight") pick((active + 1) % FRAMES.length);
      if (e.key === "ArrowLeft") pick((active - 1 + FRAMES.length) % FRAMES.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(() => {
    const onScroll = () => {
      const h = window.innerHeight || 1;
      setScrolled(Math.min(1, Math.max(0, window.scrollY / h)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function pick(i: number) {
    setActive(i);
    setTick((x) => x + 1);
  }

  const cropOfFrame = frame.crops[crop];

  return (
    <section
      id="rituals"
      className="relative min-h-[100svh] w-full overflow-hidden bg-ink text-ivory"
    >
      {/* ————— the frame: 80% of everything ————— */}
      <div
        className={`absolute overflow-hidden transition-[top,bottom] duration-[1200ms] ease-[cubic-bezier(.16,.84,.24,1)] ${
          ultrawide ? "inset-x-0 top-[6.5%] bottom-[6.5%]" : "inset-0"
        }`}
      >
        <HeroBackdrop frames={FRAMES} active={active} cropKey={crop} reduced={reduced} ambient={ambient} />

        {ultrawide && (
          <>
            <span className="absolute inset-x-0 -top-px h-px bg-ivory/15" />
            <span className="absolute inset-x-0 -bottom-px h-px bg-ivory/15" />
          </>
        )}
      </div>

      {/* ————— the ivory plate: the only place with ink on paper ————— */}
      <div
        className="absolute inset-y-0 left-0 z-20 hidden w-[34%] min-w-[368px] max-w-[520px] flex-col justify-end bg-ivory px-8 pb-10 pt-32 text-ink shadow-[34px_0_90px_-30px_#120e0cb0] xl:flex 2xl:px-10"
        style={{ transform: `translate3d(0,${scrolled * -20}px,0)` }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-50 mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23p)' opacity='0.05'/%3E%3C/svg%3E\")",
          }}
        />
        <span aria-hidden className="absolute right-0 top-0 h-full w-px bg-shell" />
        <Plate frame={frame} index={active} tone="ink" clock={clock} />
        <div className="mt-8 flex items-center gap-4">
          <span className="text-[9px] track-wide uppercase text-clay">Unroll the day</span>
          <span className="relative block h-10 w-px overflow-hidden bg-shell">
            <span
              className="fx-drift absolute inset-x-0 top-0 block h-4 bg-vermilion/70"
              style={reduced ? { animation: "none" } : undefined}
            />
          </span>
        </div>
      </div>

      {/* ————— foreground flow + the frame-side HUD ————— */}
      <div className="relative z-20 flex min-h-[100svh] flex-col">
        <TopBar ink={plate} />

        <div className="mt-auto flex flex-col px-5 pb-6 pt-24 sm:px-8 xl:grid xl:grid-cols-[35%_1fr] xl:items-end xl:gap-0 xl:px-10 xl:pb-8">
          {/* before the plate exists, the copy sits on the frame itself */}
          <div
            className="relative -mx-5 px-5 pb-2 pt-14 sm:-mx-8 sm:px-8 xl:hidden"
            style={{ background: "linear-gradient(to top,#120e0cf5 0%,#120e0ce0 46%,rgba(18,14,12,0) 100%)" }}
          >
            <Plate frame={frame} index={active} tone="ivory" clock={clock} />
            <div className="mt-7">
              <FrameRail
                frames={FRAMES}
                active={active}
                onPick={pick}
                cropKey={crop}
                dur={DUR}
                tick={tick}
                reduced={reduced}
              />
            </div>
          </div>

          <div
            className="hidden xl:col-start-2 xl:block xl:pl-12 2xl:pl-16"
            style={
              reduced ? undefined : { transform: `translate3d(0,${scrolled * 26}px,0)`, opacity: 1 - scrolled * 0.85 }
            }
          >
            <div aria-live="polite" className="flex max-w-[52ch] items-end justify-between gap-8">
              <div>
                <p
                  key={`${frame.key}-kicker`}
                  className="reveal flex flex-wrap items-center gap-x-3 gap-y-1 text-[9px] track-wide uppercase text-ivory/55"
                  style={{ animationDuration: "1200ms" }}
                >
                  <span className="text-ochre-soft">Frame {String(active + 1).padStart(2, "0")}</span>
                  <span className="h-px w-6 bg-ivory/25" />
                  {frame.ritual} · {frame.scene}
                </p>
                <p
                  key={`${frame.key}-line`}
                  className="reveal mt-3 font-display text-[clamp(1.05rem,1.5vw,1.45rem)] italic leading-[1.35] text-ivory/90"
                  style={{ animationDuration: "1600ms", animationDelay: "120ms" }}
                >
                  {frame.line}
                </p>
                <p className="tabular mt-4 text-[8.5px] uppercase track-wide text-ivory/40" style={{ letterSpacing: "0.16em" }}>
                  {cropOfFrame.ratio} · {cropOfFrame.w}×{cropOfFrame.h} · focal {cropOfFrame.pos} · LQIP 60px ·{" "}
                  {cropOfFrame.src.startsWith("video:") ? "loop" : "still"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setHeld((h) => !h)}
                aria-label={held ? "Resume the sequence" : "Hold this frame"}
                className="group flex shrink-0 items-center gap-2 border border-ivory/20 px-3 py-2 text-[8.5px] track-wide uppercase text-ivory/60 transition-colors duration-700 hover:border-ochre-soft/60 hover:text-ivory"
              >
                {held ? (
                  <Play className="h-3 w-3 fill-current" strokeWidth={0} />
                ) : (
                  <Pause className="h-3 w-3" strokeWidth={1.25} />
                )}
                {held ? "Resume" : "Hold"}
              </button>
            </div>
          </div>
        </div>

        <div className="relative z-30 hidden items-center justify-between gap-6 border-t border-ivory/10 px-10 py-3 text-[8.5px] track-wide uppercase text-ivory/45 xl:flex">
          <span>{CITIES}</span>
          <span className="flex items-center gap-3">
            <span className="h-1 w-1 rounded-full bg-forest-soft" />
            Currently holding three dates for November
          </span>
        </div>
      </div>

      {/* the chapter index, on the far edge once there is room for it */}
      {plate && (
        <FrameRail
          frames={FRAMES}
          active={active}
          onPick={pick}
          cropKey={crop}
          dur={DUR}
          tick={tick}
          reduced={reduced}
        />
      )}
    </section>
  );
}
