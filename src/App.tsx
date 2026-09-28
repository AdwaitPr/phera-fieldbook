import Hero from "./components/Hero";
import RegionsSection from "./components/RegionsSection";
import Reveal from "./components/Reveal";

/**
 * Mangala — one landing page, three held chapters.
 * The hero carries the day's first frame; the regional guide carries
 * the atelier's cultural authority; the method carries the ledger
 * a family actually leans on. One hand, from haldi to vidaai.
 */

const HELD = [
  { n: "01", t: "Ritual sequencing", d: "Every knot, lamp and circling, timed to the pandit's clock." },
  { n: "02", t: "Floristry & craft", d: "Marigold by the kilo from Dhalegaon; silk by the loom." },
  { n: "03", t: "Guests & logistics", d: "Four hundred rooms, eleven transfers, one unread spreadsheet." },
  { n: "04", t: "Light, sound, rain", d: "A generator, a mandap roof, and a plan no one has to hear." },
];

export default function App() {
  return (
    <main id="top" className="min-h-screen bg-ink">
      <Hero />
      <RegionsSection />

      {/* the atelier's ledger, in the same hand */}
      <section id="method" className="bg-ivory text-ink">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-20 lg:py-28">
          <Reveal>
            <p className="flex items-center gap-3 text-[9px] track-wide uppercase text-vermilion">
              <span className="inline-block h-[5px] w-[5px] rotate-45 bg-vermilion" />
              Chapter II · The Method
            </p>
            <h2 className="mt-6 font-display text-[clamp(1.7rem,4.4vw,2.9rem)] leading-[1.06] tracking-[-0.015em]">
              We do not stage weddings.
              <br />
              <em className="italic opacity-90">We keep the rituals</em> — and the
              <br />
              hundred small hours around them.
            </h2>
            <p className="mt-7 max-w-[52ch] text-[13.5px] leading-[1.8] text-ink/60">
              One planner per family, from the first tilak to the last bow. No packages, no upsell at the
              venue, no call you cannot return. Two decades of Mondays in Rajasthan, and a ledger of
              craftsmen who answer at four in the morning.
            </p>
          </Reveal>

          <ul className="divide-y divide-shell border-y border-shell">
            {HELD.map((h, i) => (
              <Reveal as="li" key={h.n} delay={160 + i * 110}>
                <div className="group flex items-start gap-6 py-6 transition-[padding] duration-[900ms] ease-[cubic-bezier(.16,.84,.24,1)] hover:pl-3">
                  <span className="tabular mt-1 text-[9px] track-wide uppercase text-clay transition-colors duration-700 group-hover:text-vermilion">
                    {h.n}
                  </span>
                  <div>
                    <h3 className="font-display text-[20px] leading-snug transition-colors duration-700 group-hover:text-vermilion">
                      {h.t}
                    </h3>
                    <p className="mt-1.5 max-w-[42ch] text-[12.5px] leading-relaxed text-ink/55">{h.d}</p>
                  </div>
                  <span className="ml-auto mt-2 h-px w-0 bg-vermilion/60 transition-all duration-[1100ms] ease-[cubic-bezier(.16,.84,.24,1)] group-hover:w-10" />
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="border-t border-shell/70 px-5 py-4 text-[8.5px] track-wide uppercase text-clay sm:px-8">
          <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4">
            <span>Mangala · Ceremonial Atelier · Estd. 2009</span>
            <span className="text-ink/45">Frames by Rohit Photography, Darshan Dave &amp; Lara Jameson</span>
            <span id="enquire">Enquiries · studio@mangala.atelier</span>
          </div>
        </div>
      </section>
    </main>
  );
}
