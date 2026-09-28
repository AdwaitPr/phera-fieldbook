/**
 * The specialist's curation — three families of ceremony, each introduced
 * through the material the whole house reads it by.
 */

/* ——— the LQIPs, painted directly in SVG ———
   Each is the *same crop* shown before the photograph arrives: a few
   soft, oversized strokes of the motif, blurred, so the dissolve is
   perceived as a photograph emerging from paint, never as a swap. */

const enc = (svg: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(svg).replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29")}`;

function phulkariLqip(w: number, h: number): string {
  const s = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'><filter id='b'><feGaussianBlur stdDeviation='14'/></filter><rect width='${w}' height='${h}' fill='#6b1f20'/><g filter='url(#b)' opacity='.85'><path d='M${w * 0.06} ${h * 0.45}l${w * 0.24}-${w * 0.24} ${w * 0.24} ${w * 0.24}-${w * 0.24} ${w * 0.24}z' fill='#d9a24f'/><path d='M${w * 0.18} ${h * 0.68}l${w * 0.13}-${w * 0.13} ${w * 0.13} ${w * 0.13}-${w * 0.13} ${w * 0.13}z' fill='#ece3d1'/><path d='M${w * 0.38} ${h * 0.55}l${w * 0.1}-${w * 0.1} ${w * 0.1} ${w * 0.1}-${w * 0.1} ${w * 0.1}z' fill='#8f2b2e'/><path d='M${w * 0.02} ${h * 0.16}l${w * 0.09}-${w * 0.09} ${w * 0.09} ${w * 0.09}-${w * 0.09} ${w * 0.09}z' fill='#31473a'/><path d='M${w * 0.52} ${h * 0.2}l${w * 0.07}-${w * 0.07} ${w * 0.07} ${w * 0.07}-${w * 0.07} ${w * 0.07}z' fill='#c98a1e'/></g></svg>`;
  return enc(s);
}

function alpanaLqip(w: number, h: number): string {
  const c = Math.min(w, h);
  const r = c * 0.34;
  let petals = "";
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    petals += `<ellipse cx='${w / 2 + Math.cos(a) * r}' cy='${h / 2 + Math.sin(a) * r}' rx='${c * 0.05}' ry='${c * 0.13}' fill='#f1e7d2' opacity='.75' transform='rotate(${(a * 180) / Math.PI + 90} ${w / 2 + Math.cos(a) * r} ${h / 2 + Math.sin(a) * r})'/>`;
  }
  let dots = "";
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    dots += `<circle cx='${w / 2 + Math.cos(a) * r * 1.42}' cy='${h / 2 + Math.sin(a) * r * 1.42}' r='${c * 0.013}' fill='#f1e7d2' opacity='.7'/>`;
  }
  const s = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'><filter id='b'><feGaussianBlur stdDeviation='${c * 0.02}'/></filter><rect width='${w}' height='${h}' fill='#a25a2e'/><g filter='url(#b)'><circle cx='${w / 2}' cy='${h / 2}' r='${r * 1.55}' fill='none' stroke='#f1e7d2' stroke-opacity='.5' stroke-width='${c * 0.012}'/>${petals}${dots}</g></svg>`;
  return enc(s);
}

function jasmineLqip(w: number, h: number): string {
  const cx = w / 2;
  let loop = "";
  for (let i = 0; i < 26; i++) {
    const x = cx + Math.sin(i * 0.46 + 0.4) * w * 0.16 + (i % 4 === 0 ? w * 0.05 : -w * 0.03);
    const y = h * 0.06 + i * (h * 0.034);
    loop += `<ellipse cx='${x}' cy='${y}' rx='${w * 0.075}' ry='${w * 0.05}' fill='#f3efe4' opacity='${0.9 - i * 0.012}' transform='rotate(${i * 7} ${x} ${y})'/>`;
  }
  const s = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'><filter id='b'><feGaussianBlur stdDeviation='12'/></filter><rect width='${w}' height='${h}' fill='#2f4634'/><g filter='url(#b)'>${loop}</g></svg>`;
  return enc(s);
}

export type MotifKind = "phulkari" | "alpana" | "jasmine";

export interface Region {
  key: MotifKind;
  numeral: string;
  region: string;
  languages: string;
  family: string;
  motif: string;
  /** the flat colour shown while the photograph travels — the LQIP in paint */
  tint: string;
  /** the first brush of the motif, visible before the photograph travels */
  lqip: (w: number, h: number) => string;
  /** narratives, not information */
  prose: string;
  /** the extra line the card keeps in its sleeve until you lean in */
  whisper: { label: string; value: string };
  credit: string;
}

export const REGIONS: Region[] = [
  {
    key: "phulkari",
    numeral: "I",
    region: "Punjab & Rajasthan",
    languages: "Punjabi · Marwari",
    family: "Punjabi · Marwari tradition",
    motif: "Phulkari — ‘flower work’, khadi",
    tint: "#6b1f20",
    lqip: phulkariLqip,
    prose:
      "Here the wedding is carried, not staged. A phulkari shawl, stitched for a daughter before she can count its threads, is pulled over her head at the Milni; by the Anand Karaj it is her whole sky. Seven vows are taken on the laavan's slow circles, and the phere around the sacred fire run deep into the night, saada jeera still warm in brass cups.",
    whisper: {
      label: "The atelier keeps",
      value: "a 1936 bagh panel from Moga — resold to its family this winter.",
    },
    credit: "Phulkari reference, dyehouse study · Punjab",
  },
  {
    key: "alpana",
    numeral: "II",
    region: "Bengal",
    languages: "Bangla · Santiniketan line",
    family: "Bengali tradition",
    motif: "Alpana — rice paste on clay",
    tint: "#a25a2e",
    lqip: alpanaLqip,
    prose:
      "At dawn the alpana is drawn on wet clay — fish, lotus, the house's whole memory in rice paste — and the bride is hidden behind two leaves of the shaal-paat, the mala badal her first act as an equal, not a spectator. Beneath the chadantala the saat paak circles the sacred fire; by sindoor daan, the alpana is already a memory, rubbed thin by a hundred feet.",
    whisper: {
      label: "The atelier keeps",
      value: "a maachher alpana from a Barasat courtyard, redrawn each Poush.",
    },
    credit: "Alpana, fingertip & kheerab, dusk · Kolkata",
  },
  {
    key: "jasmine",
    numeral: "III",
    region: "Tamil Nadu & Telugu lands",
    languages: "Tamil · Telugu · Kannada",
    family: "South Indian tradition",
    motif: "Malligai — jasmine, strung by hand",
    tint: "#2f4634",
    lqip: jasmineLqip,
    prose:
      "The ceremony is led by scent long before it is led by sound. Gauri Pooja is finished while the malligai is still sweat-cool in the bride's braid; the Muhurtam is struck, Mangalya Dharanam is tied in three knots against her marriage line — and the jasmine hangs for two more days, browning only when the silence has been observed.",
    whisper: {
      label: "The atelier keeps",
      value: "sixteen kg of jasmine from Madurai, picked before sunup, dry-iced.",
    },
    credit: "Malligai on brass, studio still · Madurai",
  },
];
