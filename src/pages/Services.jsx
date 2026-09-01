import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { services } from '../data/services'

function ServiceBlock({ s, i }) {
  const reversed = i % 2 === 1
  return (
    <div className="group relative border-t border-white/8 py-14 md:py-20 last:border-b">
      <div
        className={`container-x grid grid-cols-1 items-start gap-8 lg:grid-cols-12 ${
          reversed ? '' : ''
        }`}
      >
        {/* Index + title */}
        <div className="lg:col-span-5">
          <div className="flex items-start gap-6">
            <span
              className="font-display text-5xl text-transparent md:text-6xl"
              style={{ WebkitTextStroke: '1px rgba(225,17,35,0.55)' }}
            >
              {s.index}
            </span>
            <div>
              <span className="font-heading text-xs uppercase tracking-ultra text-blood-light">
                {s.tag}
              </span>
              <h3 className="mt-2 font-display text-5xl uppercase leading-none tracking-tight text-chrome transition-colors duration-500 group-hover:text-blood md:text-6xl">
                {s.title}
              </h3>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="lg:col-span-4">
          <p className="text-lg leading-relaxed text-chrome-dim">{s.description}</p>
        </div>

        {/* Capabilities */}
        <div className="lg:col-span-3">
          <ul className="space-y-3">
            {s.capabilities.map((c) => (
              <li key={c} className="flex items-center gap-3 text-sm text-chrome-dark">
                <span className="h-1 w-1 rounded-full bg-blood" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default function Services() {
  return (
    <PageWrapper>
      <PageHero
        eyebrow="Our Services"
        title="Every craft under one roof."
        accentWord="craft"
        subtitle="Six disciplines, one seamless pipeline. Bring us a single service or hand us the whole post-production chain. Either way, it ships flawless."
      />

      <section className="relative">
        {services.map((s, i) => (
          <Reveal key={s.id} amount={0.2}>
            <ServiceBlock s={s} i={i} />
          </Reveal>
        ))}
      </section>

      {/* Pipeline callout */}
      <section className="relative border-t border-white/5 bg-ink-800/30 py-16 md:py-32">
        <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow="End to End"
            title="One pipeline. Zero handoff friction."
          />
          <div className="space-y-6">
            <Reveal>
              <p className="text-lg leading-relaxed text-chrome-dim">
                Because editorial, color, sound and VFX live under one roof, your
                project never gets lost in translation between vendors. Notes flow
                instantly. Versions stay in sync. Deadlines hold.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex flex-wrap gap-3">
                {['DaVinci Resolve', 'Pro Tools', 'Nuke', 'After Effects', 'Avid', 'Dolby Atmos'].map(
                  (t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 px-4 py-2 font-heading text-xs uppercase tracking-wider text-chrome-dim"
                    >
                      {t}
                    </span>
                  )
                )}
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <Link to="/contact" className="btn-primary mt-4">
                Discuss Your Project <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
