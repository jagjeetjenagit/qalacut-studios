import PageWrapper from '../components/PageWrapper'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { Link } from 'react-router-dom'

const face = (seed) => `https://picsum.photos/seed/${seed}/800/1000?grayscale`

const team = [
  { name: 'Kabir Rahman', role: 'Founder / Creative Director', seed: 'team-kabir' },
  { name: 'Anaya Sharma', role: 'Lead Editor', seed: 'team-anaya' },
  { name: 'Marcus Vale', role: 'Senior Colorist', seed: 'team-marcus' },
  { name: 'Leila Haddad', role: 'Supervising Sound Designer', seed: 'team-leila' },
  { name: 'Devon Cole', role: 'VFX Supervisor', seed: 'team-devon' },
  { name: 'Priya Nair', role: 'Motion Design Lead', seed: 'team-priya' },
  { name: 'Tomas Reyes', role: 'Finishing / DI Artist', seed: 'team-tomas' },
  { name: 'Sana Iqbal', role: 'Post Producer', seed: 'team-sana' },
]

function Member({ m, i }) {
  return (
    <Reveal delay={(i % 4) * 0.08}>
      <div className="group relative overflow-hidden rounded-2xl border border-white/8 bg-ink-800/50">
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={face(m.seed)}
            alt={m.name}
            loading="lazy"
            className="h-full w-full object-cover grayscale transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
          {/* red slash on hover */}
          <div className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 scale-x-0 bg-blood transition-transform duration-500 group-hover:scale-x-100" style={{ boxShadow: '0 0 14px rgba(225,17,35,0.8)' }} />
        </div>
        <div className="p-5">
          <h3 className="font-heading text-lg font-medium uppercase tracking-wide text-chrome">
            {m.name}
          </h3>
          <p className="mt-1 text-sm text-blood-light">{m.role}</p>
        </div>
      </div>
    </Reveal>
  )
}

export default function Team() {
  return (
    <PageWrapper>
      <PageHero
        eyebrow="The People"
        title="Artists behind the cut."
        accentWord="cut."
        subtitle="A tight crew of editors, colorists, mixers and VFX artists, each obsessed with a different piece of the final frame."
      />

      <section className="container-x pb-24 md:pb-32">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <Member key={m.name} m={m} i={i} />
          ))}
        </div>
      </section>

      {/* Join us */}
      <section className="relative border-t border-white/5 bg-ink-800/30 py-16 md:py-32">
        <div className="container-x grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <SectionHeading eyebrow="Careers" title="Think you belong here?" accentWord="here?" />
          <div className="space-y-6">
            <Reveal>
              <p className="text-lg leading-relaxed text-chrome-dim">
                We're always looking for artists who sweat the details. If you
                live for a clean timeline, a perfect grade or a mix that hits in
                the chest, send us your reel.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <Link to="/contact" className="btn-primary">
                Send Your Reel <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
