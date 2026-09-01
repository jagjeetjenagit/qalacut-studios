import { Link } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import Marquee from '../components/Marquee'

const values = [
  {
    n: '01',
    title: 'Story First',
    text: 'Every technical decision serves the emotion of the scene. Craft is invisible when it works.',
  },
  {
    n: '02',
    title: 'Obsessive Finish',
    text: 'We live for the final 10%. The frame-accurate polish most never notice, but everyone feels.',
  },
  {
    n: '03',
    title: 'True Partnership',
    text: 'Directors and producers work beside us, not behind a portal. Your vision leads, our craft follows.',
  },
  {
    n: '04',
    title: 'Future-Ready',
    text: 'HDR, Atmos, virtual production, AI-assisted workflows. We adopt what elevates the work.',
  },
]

const timeline = [
  { year: '2014', text: 'QalaCut founded as a two-room editorial suite.' },
  { year: '2017', text: 'Added a full DaVinci color grading pipeline & HDR mastering.' },
  { year: '2020', text: 'Opened a Dolby Atmos-ready sound stage.' },
  { year: '2023', text: 'Launched in-house VFX & motion graphics division.' },
  { year: '2026', text: '250+ projects finished for film, streaming & global brands.' },
]

export default function About() {
  return (
    <PageWrapper>
      <PageHero
        eyebrow="About the Studio"
        title="We finish what others start."
        accentWord="finish"
        subtitle="QalaCut is a post-production house where editors, colorists, sound designers and VFX artists share one obsession: making the final cut unforgettable."
      />

      {/* Manifesto */}
      <section className="relative py-16 md:py-32">
        <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Our Philosophy" title="Craft in the shadows." />
          </div>
          <div className="space-y-8 lg:col-span-7 lg:col-start-6">
            <Reveal>
              <p className="text-xl leading-relaxed text-chrome-dim md:text-2xl">
                Post-production is where a film is truly made, or lost. It's the
                unseen labour behind every goosebump, every held breath, every
                cut that lands exactly when it should.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="leading-relaxed text-chrome-dark">
                We built QalaCut to be the room directors trust with that
                responsibility. A place where technology, taste and stamina
                converge to give stories the finish they deserve: quietly,
                precisely, and without ego.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <Marquee
        items={['Precision', 'Emotion', 'Craft', 'Cinema', 'Detail', 'Finish']}
        className="border-y border-white/5 bg-ink-900"
      />

      {/* Values */}
      <section className="relative py-16 md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="What Drives Us" title="Four values, zero compromise." className="mb-16" />
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 md:grid-cols-2">
            {values.map((v) => (
              <Reveal key={v.n} className="bg-ink-900 p-8 md:p-12">
                <span
                  className="font-display text-5xl text-transparent"
                  style={{ WebkitTextStroke: '1px rgba(225,17,35,0.5)' }}
                >
                  {v.n}
                </span>
                <h3 className="mb-3 mt-5 font-heading text-2xl font-medium uppercase tracking-wide text-chrome">
                  {v.title}
                </h3>
                <p className="leading-relaxed text-chrome-dark">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative border-t border-white/5 bg-ink-800/30 py-16 md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="The Journey" title="From two rooms to a full house." className="mb-16" />
          <div className="relative">
            {timeline.map((t, i) => (
              <Reveal key={t.year} delay={i * 0.08}>
                <div className="group flex items-start gap-8 border-t border-white/8 py-8 transition-colors hover:border-blood/40 last:border-b">
                  <span className="font-display text-4xl text-chrome transition-colors group-hover:text-blood md:text-5xl">
                    {t.year}
                  </span>
                  <p className="max-w-xl pt-2 leading-relaxed text-chrome-dim">{t.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="relative py-24">
        <div className="container-x flex flex-col items-center gap-8 text-center">
          <SectionHeading eyebrow="Work With Us" title="Bring us your footage." align="center" accentWord="footage." />
          <Reveal>
            <Link to="/contact" className="btn-primary">
              Start a Project <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </PageWrapper>
  )
}
