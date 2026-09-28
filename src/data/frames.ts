/**
 * Art-directed image sequence.
 *
 * Every frame is a *ritual detail*, never a smiling couple. Each frame carries four
 * separate renders of itself — a 9:16 vertical close-up for phones, a 3:4 portrait plate for
 * tablets, a 16:9 cinematic crop for desktop and a 21:9 crop for ultrawide — each requested
 * from the CDN at its own dimensions with its own focal point, so the crop is genuinely
 * re-art-directed per breakpoint (not a scaled-down master).
 */

export type CropKey = "mobile" | "tablet" | "desktop" | "ultrawide";

const photo = (id: number, w: number, h: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}&dpr=1`;

/** A ~40px rendition of the exact same crop — the blur-up plate. */
const lqip = (id: number, w: number, h: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${Math.round(
    w,
  )}&h=${Math.round(h)}&dpr=1`;

const videoPoster = (id: number, w: number, h: number) =>
  `https://images.pexels.com/videos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}&dpr=1`;

export interface Crop {
  /** CDN photo id, or "video:<pexels id>" for the moving frame */
  src: string;
  /** human-readable framing metadata, surfaced in the HUD */
  ratio: string;
  w: number;
  h: number;
  /** focal point for this breakpoint */
  pos: string;
  /** slight optical zoom used on the tighter crops */
  scale: number;
}

export interface Frame {
  key: string;
  numeral: string;
  ritual: string;
  scene: string;
  line: string;
  /** flat tint used underneath the LQIP while bytes travel */
  tint: string;
  alt: string;
  crops: Record<CropKey, Crop>;
}

const VIDEO_ID = 8844355;

function imageCrop(
  id: number,
  ratio: CropKey,
  opts: { pos: string; scale?: number },
): Crop {
  const dims =
    ratio === "mobile"
      ? { w: 810, h: 1440, label: "9:16 · vertical close crop" }
      : ratio === "tablet"
        ? { w: 1020, h: 1360, label: "3:4 · portrait plate" }
        : ratio === "desktop"
          ? { w: 1920, h: 1080, label: "16:9 · cinematic" }
          : { w: 2320, h: 995, label: "21:9 · ultrawide letterbox" };
  return {
    src: photo(id, dims.w, dims.h),
    ratio: dims.label,
    w: dims.w,
    h: dims.h,
    pos: opts.pos,
    scale: opts.scale ?? 1,
  };
}

function videoCrop(ratio: CropKey, opts: { pos: string; scale?: number }): Crop {
  const dims =
    ratio === "mobile"
      ? { w: 630, h: 1120, label: "9:16 · vertical close crop" }
      : ratio === "tablet"
        ? { w: 700, h: 933, label: "3:4 · portrait plate" }
        : ratio === "desktop"
          ? { w: 1000, h: 563, label: "16:9 · cinematic" }
          : { w: 1200, h: 515, label: "21:9 · ultrawide letterbox" };
  return {
    src: `video:${VIDEO_ID}`,
    ratio: dims.label,
    w: dims.w,
    h: dims.h,
    pos: opts.pos,
    scale: opts.scale ?? 1,
  };
}

export const FRAMES: Frame[] = [
  {
    key: "haldi",
    numeral: "I",
    ritual: "Haldi",
    scene: "The turmeric morning",
    line: "Twenty-one hands, one brass bowl, and the first gold of the day.",
    tint: "#6d4c17",
    alt: "Henna-decorated hands sprinkling turmeric over a coconut during a haldi ceremony",
    crops: {
      mobile: imageCrop(12718210, "mobile", { pos: "50% 36%", scale: 1.04 }),
      tablet: imageCrop(19551686, "tablet", { pos: "50% 26%" }),
      desktop: imageCrop(31002035, "desktop", { pos: "50% 62%" }),
      ultrawide: imageCrop(31002035, "ultrawide", { pos: "50% 55%" }),
    },
  },
  {
    key: "sindoor",
    numeral: "II",
    ritual: "Sindoor",
    scene: "Vermilion at the parting",
    line: "A pinch, a breath, and a name that changes its ending.",
    tint: "#5d1d1c",
    alt: "Close-up of hennaed hands holding a small bowl of red sindoor vermilion",
    crops: {
      mobile: imageCrop(7410740, "mobile", { pos: "50% 44%", scale: 1.05 }),
      tablet: imageCrop(30184615, "tablet", { pos: "50% 24%", scale: 1.03 }),
      desktop: imageCrop(7410740, "desktop", { pos: "50% 50%" }),
      ultrawide: imageCrop(7410740, "ultrawide", { pos: "50% 47%" }),
    },
  },
  {
    key: "jaimala",
    numeral: "III",
    ritual: "Jaimala",
    scene: "Garlands, still warm",
    line: "Six thousand flowers, strung before the light turns.",
    tint: "#3a4a2c",
    alt: "Hands holding freshly strung flower garlands, moving footage",
    crops: {
      mobile: videoCrop("mobile", { pos: "50% 40%", scale: 1.02 }),
      tablet: videoCrop("tablet", { pos: "50% 38%" }),
      desktop: videoCrop("desktop", { pos: "50% 52%" }),
      ultrawide: videoCrop("ultrawide", { pos: "50% 50%" }),
    },
  },
  {
    key: "mangalya",
    numeral: "IV",
    ritual: "Mangalya",
    scene: "The tying, at dusk",
    line: "Three knots, seven rounds, and the whole village holding still.",
    tint: "#402a1c",
    alt: "Sacred thread and flowers wound around a coconut during a wedding ceremony at dusk",
    crops: {
      mobile: imageCrop(38780794, "mobile", { pos: "50% 40%", scale: 1.05 }),
      tablet: imageCrop(27060278, "tablet", { pos: "50% 34%" }),
      desktop: imageCrop(36782322, "desktop", { pos: "50% 54%" }),
      ultrawide: imageCrop(36782322, "ultrawide", { pos: "50% 48%" }),
    },
  },
];

/** Small crops shown as "in today's frame" — the materials the day is made of. */
export const MATERIALS = [
  { id: 27809239, label: "Genda", sub: "marigold · Dhalegaon", pos: "50% 50%" },
  { id: 12432503, label: "Zarri", sub: "gold leaf · Kutch", pos: "50% 42%" },
  { id: 34056580, label: "Deepa", sub: "brass lamps · Thanjavur", pos: "50% 55%" },
];

export const materialCrop = (id: number, w = 220, h = 260) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}&dpr=1`;

/** For a moving frame the "full asset" is its poster until the loop can play. */
export const posterFor = (crop: Crop) => {
  if (crop.src.startsWith("video:")) return videoPoster(Number(crop.src.split(":")[1]), crop.w, crop.h);
  return crop.src;
};

/** Tiny index-card rendition of whatever crop this breakpoint is showing. */
export const thumbFor = (crop: Crop, w = 150, h = 194) => {
  if (crop.src.startsWith("video:")) return videoPoster(Number(crop.src.split(":")[1]), w, h);
  const id = Number(crop.src.match(/photos\/(\d+)\//)?.[1] ?? 0);
  return photo(id, w, h);
};

export const lqipForFrame = (crop: Crop) => {
  const w = 60;
  if (crop.src.startsWith("video:")) {
    const id = Number(crop.src.split(":")[1]);
    return videoPoster(id, w, Math.max(30, Math.round((w * crop.h) / crop.w)));
  }
  const id = Number(crop.src.match(/photos\/(\d+)\//)?.[1] ?? 0);
  return lqip(id, w, Math.max(30, Math.round((w * crop.h) / crop.w)));
};

export const VIDEO_SOURCES = [
  `https://videos.pexels.com/video-files/${VIDEO_ID}/${VIDEO_ID}-sd_540_960_30fps.mp4`,
  `https://videos.pexels.com/video-files/${VIDEO_ID}/${VIDEO_ID}-hd_1080_1920_30fps.mp4`,
  `https://videos.pexels.com/video-files/${VIDEO_ID}/${VIDEO_ID}-uhd_2160_3840_30fps.mp4`,
];
