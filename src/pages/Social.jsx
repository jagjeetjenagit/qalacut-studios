import { Link } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'

const socials = [
  { name: 'Instagram', handle: '@qalacut', desc: 'Frames, looks & studio life.', href: '#' },
  { name: 'Vimeo', handle: '/qalacut', desc: 'Our reels in full quality.', href: '#' },
  { name: 'YouTube', handle: '@qalacutstudios', desc: 'Breakdowns & behind the scenes.', href: '#' },
  { name: 'LinkedIn', handle: '/qalacut-studios', desc: 'News, hiring & partnerships.', href: '#' },
]

const feed = (seed) => `https://picsum.photos/seed/${seed}/600/600`
const posts = ['soc1', 'soc2', 'soc3', 'soc4', 'soc5', 'soc6', 'soc7', 'soc8']

export default function Social() {
  return (
    <PageWrapper>
      <PageHero
        eyebrow="Social & Community"
        title="Come behind the cut."
        accentWord="cut."
        subtitle="Entertainment, interaction and craft - we bring you the best of the QalaCut family."
      />

      {/* Social links */}
      <section className="container-x pb-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {socials.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.06}>
              <a
                href={s.href}
                className="group card-edge flex h-full flex-col justify-between p-6 transition-colors hover:border-blood/40"
                data-cursor="hover"
              >
                <div className="mb-10 flex items-center justify-between">
                  <span className="font-heading text-sm uppercase tracking-wide text-chrome">
                    {s.name}
                  </span>
                  <span className="text-chrome-dark transition-all duration-300 group-hover:translate-x-1 group-hover:text-blood">
                    ↗
                  </span>
                </div>
                <div>
                  <p className="font-display text-2xl uppercase tracking-tight text-chrome transition-colors group-hover:text-blood">
                    {s.handle}
                  </p>
                  <p className="mt-2 text-sm text-chrome-dark">{s.desc}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Feed */}
      <section className="container-x py-16">
        <SectionHeading eyebrow="Latest" title="From the feed" className="mb-10" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {posts.map((p, i) => (
            <Reveal key={p} delay={(i % 4) * 0.05}>
              <a
                href="#"
                data-cursor="hover"
                className="group relative block aspect-square overflow-hidden rounded-xl border border-white/8"
              >
                <img
                  src={feed(p)}
                  alt="Social post"
                  loading="lazy"
                  className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-ink/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="text-2xl text-white">♥</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Fan corner CTA */}
      <section className="relative overflow-hidden border-t border-white/5 py-20 md:py-28">
        <div className="absolute left-1/2 top-1/2 h-[40vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blood/10 blur-[130px]" />
        <div className="container-x relative flex flex-col items-center gap-8 text-center">
          <SectionHeading
            eyebrow="Fan Corner"
            title="Join the QalaCut family."
            align="center"
            accentWord="family."
          />
          <p className="max-w-xl text-chrome-dim">
            Get early looks, breakdowns and behind-the-scenes access. Follow along
            and be first to see what we finish next.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="btn-primary">
              Follow Us <span aria-hidden>→</span>
            </a>
            <Link to="/contact" className="btn-ghost">
              Work With Us
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
