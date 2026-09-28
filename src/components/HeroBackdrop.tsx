import { useCallback, useEffect, useRef, useState } from "react";
import { lqipForFrame, posterFor } from "../data/frames";
import type { Crop, CropKey, Frame } from "../data/frames";
import { VIDEO_SOURCES } from "../data/frames";

const EASE = "cubic-bezier(.16,.84,.24,1)";

const isVideoCrop = (crop: Crop) => crop.src.startsWith("video:");

/** Full-bleed image that reports back the moment it has actually painted. */
function ArtImage({
  src,
  alt,
  pos,
  priority,
  className,
  style,
  onPaint,
  onError,
}: {
  src: string;
  alt?: string;
  pos: string;
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onPaint?: () => void;
  onError?: () => void;
}) {
  const ref = useCallback(
    (el: HTMLImageElement | null) => {
      if (el?.complete && el.naturalWidth > 1) onPaint?.();
    },
    [onPaint],
  );
  return (
    <img
      ref={ref}
      src={src}
      alt={alt ?? ""}
      decoding="async"
      fetchPriority={priority ? "high" : "low"}
      onLoad={onPaint}
      onError={onError}
      className={["absolute inset-0 h-full w-full object-cover", className ?? ""].join(" ")}
      style={{ objectPosition: pos, ...style }}
    />
  );
}

/** The one moving frame in the sequence — degrades silently to its art-directed poster. */
function MovingFrame({
  crop,
  live,
  onLive,
}: {
  crop: Crop;
  live: boolean;
  onLive: () => void;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const p = ref.current?.play();
    if (p && typeof p.catch === "function") p.catch(() => undefined);
  }, []);

  return (
    <video
      ref={ref}
      aria-hidden
      muted
      loop
      autoPlay
      playsInline
      disablePictureInPicture
      preload="metadata"
      poster={posterFor(crop)}
      onPlaying={onLive}
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[2400ms] ${
        live ? "opacity-100" : "opacity-0"
      }`}
      style={{ objectPosition: crop.pos, transitionTimingFunction: EASE }}
    >
      {VIDEO_SOURCES.map((src) => (
        <source key={src} src={src} type="video/mp4" />
      ))}
    </video>
  );
}

function Layer({
  frame,
  crop,
  active,
  load,
  reduced,
  ambient,
  pointer,
}: {
  frame: Frame;
  crop: Crop;
  active: boolean;
  load: boolean;
  reduced: boolean;
  ambient: boolean;
  pointer: { x: number; y: number };
}) {
  const [painted, setPainted] = useState(false);
  const [plateOk, setPlateOk] = useState(true);
  const [videoLive, setVideoLive] = useState(false);
  const video = isVideoCrop(crop);

  // re-run the blur-up whenever the breakpoint re-frames the shot
  useEffect(() => setPainted(false), [crop.src]);

  const dissolve = (video ? videoLive : painted) || (load && !plateOk);
  const zoom = reduced ? 1.015 : active ? 1.112 : 1.055;

  return (
    <div
      aria-hidden={!active}
      className="absolute inset-0 overflow-hidden"
      style={{
        zIndex: active ? 10 : 0,
        opacity: active ? 1 : 0,
        backgroundColor: frame.tint,
        transform: reduced ? undefined : `translate3d(${pointer.x * -13}px, ${pointer.y * -9}px, 0) scale(1.06)`,
        transitionProperty: "opacity, transform",
        transitionDuration: "1900ms, 1600ms",
        transitionTimingFunction: EASE,
        willChange: "opacity",
      }}
    >
      {/* LQIP — a 60px rendition of the same crop, blurred up, dissolving as the asset lands */}
      <ArtImage
        src={lqipForFrame(crop)}
        pos={crop.pos}
        priority={active}
        onPaint={() => undefined}
        onError={() => setPlateOk(false)}
        className="lqip"
        style={{ opacity: dissolve ? 0 : 1 }}
      />

      {/* the art-directed crop for this breakpoint, drifting almost imperceptibly */}
      {load && (
        <div
          className="absolute inset-0"
          style={{
            transform: `scale(${zoom})`,
            transition: reduced ? "none" : `transform ${active ? "27s" : "1900ms"} cubic-bezier(.22,.55,.1,1)`,
          }}
        >
          <div
            className="grade absolute inset-0"
            style={{ opacity: dissolve ? 1 : 0, transition: `opacity 1500ms ${EASE}` }}
          >
            {video ? (
              <>
                <ArtImage
                  src={posterFor(crop)}
                  alt={frame.alt}
                  pos={crop.pos}
                  priority={active}
                  onPaint={() => setPainted(true)}
                />
                {ambient && active && <MovingFrame crop={crop} live={videoLive} onLive={() => setVideoLive(true)} />}
              </>
            ) : (
              <ArtImage
                src={crop.src}
                alt={frame.alt}
                pos={crop.pos}
                priority={active}
                onPaint={() => setPainted(true)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function HeroBackdrop({
  frames,
  active,
  cropKey,
  reduced,
  ambient,
}: {
  frames: Frame[];
  active: number;
  cropKey: CropKey;
  reduced: boolean;
  ambient: boolean;
}) {
  const root = useRef<HTMLDivElement | null>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [seen, setSeen] = useState<number[]>([active]);

  useEffect(() => {
    setSeen((prev) => (prev.includes(active) ? prev : [...prev, active]));
  }, [active]);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = root.current?.getBoundingClientRect();
        if (!r) return;
        setPointer({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
      });
    };
    const onLeave = () => setPointer({ x: 0, y: 0 });
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  return (
    <div ref={root} className="absolute inset-0 overflow-hidden bg-ink">
      {frames.map((f, i) => (
        <Layer
          key={f.key}
          frame={f}
          crop={f.crops[cropKey]}
          active={i === active}
          load={i === active || i === (active + 1) % frames.length || seen.includes(i)}
          reduced={reduced}
          ambient={ambient}
          pointer={pointer}
        />
      ))}

      {/* ——— the grade: four different photographs, one film ——— */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(190deg,#1b1512d9 0%,transparent 32%,transparent 56%,#120e0ce8 100%)" }}
      />
      <div
        className="pointer-events-none absolute inset-0 mix-blend-soft-light"
        style={{ background: "radial-gradient(120% 90% at 72% 16%, #d0a45755 0%, transparent 55%)" }}
      />
      <div className="pointer-events-none absolute inset-0" style={{ background: "#7c1f2222", mixBlendMode: "multiply" }} />
      <div
        className="fx-leak pointer-events-none absolute -top-1/3 left-[58%] h-[150%] w-[70%] -translate-x-1/2"
        style={{ background: "radial-gradient(closest-side,#d8a24a66,transparent 72%)", mixBlendMode: "screen" }}
      />
      <div className="pointer-events-none absolute inset-0" style={{ boxShadow: "inset 0 0 24vw 5vw #100c0ab8" }} />
      <div
        className="fx-grain pointer-events-none absolute -inset-[60%] opacity-[0.17] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='260' height='260' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
