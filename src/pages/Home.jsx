import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'

import PageWrapper from '../components/PageWrapper'
import Reveal from '../components/Reveal'
import Magnetic from '../components/Magnetic'
import Marquee from '../components/Marquee'
import SectionHeading from '../components/SectionHeading'
import { services } from '../data/services'
import { projects } from '../data/projects'
import { news, formatDate } from '../data/news'
import { stagger, fadeUp, maskUp, easeExpo } from '../lib/motion'

/* ---------- HERO ---------- */
// Full-bleed crossfading film-still montage with slow zoom (Ken Burns).
const heroShots = [
  'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1920&q=80',
  'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1920&q=80',
  'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1920&q=80',
  'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&q=80',
]

function BackgroundMontage() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % heroShots.length), 5000)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="absolute inset-0 overflow-hidden bg-ink">
      <AnimatePresence>
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.6, ease: 'easeInOut' }, scale: { duration: 6, ease: 'linear' } }}
          className="absolute inset-0"
        >
          <img
            src={heroShots[index]}
            alt=""
            className="h-full w-full object-cover"
            style={{ filter: 'grayscale(0.35) contrast(1.15) brightness(0.55) saturate(1.1)' }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '80%'])

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      {/* Background montage + grade */}
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <BackgroundMontage />
        {/* cinematic grade overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(10,10,11,0.9)_100%)]" />
        <div className="absolute inset-0 bg-grain opacity-[0.07]" />
        {/* red ambient glow */}
        <div className="absolute left-1/2 top-1/2 h-[60vh] w-[85vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blood/10 blur-[150px]" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity, y: textY }}
        className="container-x relative z-10 flex h-full flex-col items-center justify-center text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="eyebrow mb-5 md:mb-8"
        >
          <span className="inline-block h-px w-10 bg-blood" />
          Post-Production Studio
          <span className="inline-block h-px w-10 bg-blood" />
        </motion.span>

        {/* One-line wordmark with laser slash - QALA + C(red) + UT */}
        <div className="relative">
          <motion.h1
            variants={stagger(0.05, 0.5)}
            initial="hidden"
            animate="show"
            className="whitespace-nowrap font-display text-[15vw] uppercase leading-[0.85] tracking-tight md:text-[14vw] lg:text-[13vw]"
          >
            <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <motion.span variants={maskUp} className="inline-block text-chrome" style={{ filter: 'drop-shadow(0 6px 30px rgba(0,0,0,0.6))' }}>
                QALA
              </motion.span>
            </span>
            <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <motion.span variants={maskUp} className="inline-block text-blood" style={{ filter: 'drop-shadow(0 0 24px rgba(225,17,35,0.6))' }}>
                C
              </motion.span>
            </span>
            <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <motion.span variants={maskUp} className="inline-block text-chrome" style={{ filter: 'drop-shadow(0 6px 30px rgba(0,0,0,0.6))' }}>
                UT
              </motion.span>
            </span>
          </motion.h1>

          {/* laser slash across the wordmark (like the logo) */}
          <motion.span
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.9, ease: easeExpo }}
            className="pointer-events-none absolute left-[-6%] top-1/2 h-[3px] w-[112%] origin-left -translate-y-1/2 -rotate-[7deg] bg-gradient-to-r from-transparent via-blood to-transparent"
            style={{ boxShadow: '0 0 22px 3px rgba(225,17,35,0.9)' }}
          />
        </div>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="mt-2 font-heading text-sm uppercase tracking-mega text-chrome-dim md:text-base"
        >
          Studios
        </motion.span>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-6 max-w-md px-2 text-sm leading-relaxed text-chrome-dim md:mt-8 md:max-w-xl md:text-lg"
        >
          Where the final cut becomes cinema. We craft editorial, color, sound
          and VFX for films, series and brands that refuse to blend in.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.55, duration: 0.8 }}
          className="mt-8 flex w-full flex-col items-center justify-center gap-3 px-6 sm:w-auto sm:flex-row sm:gap-4 md:mt-10"
        >
          <Magnetic strength={0.4} className="w-full sm:w-auto">
            <Link to="/films" className="btn-primary w-full sm:w-auto">
              View Our Reel <span aria-hidden>▶</span>
            </Link>
          </Magnetic>
          <Magnetic strength={0.4} className="w-full sm:w-auto">
            <Link to="/services" className="btn-ghost w-full sm:w-auto">
              Explore Services
            </Link>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-heading text-[10px] uppercase tracking-ultra text-chrome-dark">
            Scroll
          </span>
          <div className="h-12 w-px overflow-hidden bg-white/10">
            <motion.div
              animate={{ y: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="h-1/2 w-full bg-blood"
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}

/* ---------- STATS ---------- */
const stats = [
  { value: '250+', label: 'Projects Finished' },
  { value: '18', label: 'Awards Won' },
  { value: '40M+', label: 'Views Delivered' },
  { value: '12', label: 'Years of Craft' },
]

function Stats() {
  return (
    <section className="relative border-y border-white/5 bg-ink-800/40 py-16">
      <div className="container-x grid grid-cols-2 gap-y-10 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal
            key={s.label}
            delay={i * 0.1}
            className="flex flex-col items-center border-white/5 text-center md:border-r md:last:border-r-0"
          >
            <span className="font-display text-5xl text-chrome md:text-6xl">{s.value}</span>
            <span className="mt-2 font-heading text-xs uppercase tracking-ultra text-chrome-dark">
              {s.label}
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ---------- INTRO ---------- */
function Intro() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="container-x grid grid-cols-1 gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow="Who We Are" title="The room where films are finished." />
        </div>
        <div className="flex flex-col justify-center gap-8 lg:col-span-6 lg:col-start-7">
          <Reveal>
            <p className="text-lg leading-relaxed text-chrome-dim">
              QalaCut is a post-production studio built by editors, colorists and
              sound designers who are obsessed with the final 10% - the part that
              separates good from unforgettable.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="leading-relaxed text-chrome-dark">
              From the first assembly to the last deliverable, we treat every
              frame like it matters. Because it does. We partner with directors,
              agencies and studios to give their stories the finish they deserve.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Magnetic strength={0.3}>
              <Link
                to="/about"
                className="group inline-flex items-center gap-3 font-heading text-sm uppercase tracking-[0.18em] text-white"
              >
                <span className="h-px w-8 bg-blood transition-all duration-300 group-hover:w-14" />
                More about the studio
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ---------- SERVICES PREVIEW ---------- */
function ServicesPreview() {
  return (
    <section className="relative border-t border-white/5 py-16 md:py-36">
      <div className="container-x">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="What We Do" title="Six crafts. One final cut." />
          <Reveal>
            <Link to="/services" className="btn-ghost">
              All Services
            </Link>
          </Reveal>
        </div>

        <div className="flex flex-col">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.05}>
              <Link
                to="/services"
                className="group relative flex items-center justify-between gap-6 border-t border-white/8 py-8 transition-colors duration-500 hover:border-blood/40 last:border-b"
              >
                <div className="flex items-baseline gap-6">
                  <span className="font-heading text-sm text-blood">{s.index}</span>
                  <h3 className="font-display text-4xl uppercase tracking-tight text-chrome transition-all duration-500 group-hover:translate-x-3 group-hover:text-blood md:text-6xl">
                    {s.title}
                  </h3>
                </div>
                <div className="hidden max-w-xs text-right text-sm text-chrome-dark md:block">
                  {s.short}
                </div>
                <span className="text-2xl text-chrome-dark transition-all duration-500 group-hover:translate-x-2 group-hover:text-blood">
                  →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- FEATURED WORK ---------- */
function FeaturedWork() {
  const featured = projects.slice(0, 4)
  return (
    <section className="relative py-16 md:py-36">
      <div className="container-x">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="Selected Work" title="Recent finishes." accentWord="finishes." />
          <Reveal>
            <Link to="/films" className="btn-ghost">
              View All Films
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.1}>
              <Link
                to={`/films/${p.slug}`}
                className={`group card-edge block ${i % 3 === 0 ? 'md:mt-0' : 'md:mt-12'}`}
                data-cursor="hover"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={p.poster}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent opacity-80" />
                  <span
                    className="absolute left-5 top-5 rounded-full border border-white/20 bg-ink/50 px-3 py-1 font-heading text-[10px] uppercase tracking-ultra text-chrome backdrop-blur-sm"
                  >
                    {p.category}
                  </span>
                </div>
                <div className="flex items-end justify-between p-6">
                  <div>
                    <h3 className="font-display text-3xl uppercase tracking-tight text-chrome transition-colors group-hover:text-blood md:text-4xl">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-sm text-chrome-dark">
                      {p.client} · {p.year}
                    </p>
                  </div>
                  <span className="text-xl text-chrome-dark transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blood">
                    ↗
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- PROCESS ---------- */
const steps = [
  { n: '01', title: 'Ingest & Assembly', text: 'We organise, sync and build the first structure of your story.' },
  { n: '02', title: 'Craft & Iterate', text: 'Editorial, color, sound and VFX evolve together through review cycles.' },
  { n: '03', title: 'Finish & Master', text: 'Conform, QC and deliver flawless masters for every platform.' },
]

function Process() {
  return (
    <section className="relative border-t border-white/5 bg-ink-800/30 py-16 md:py-36">
      <div className="container-x">
        <SectionHeading
          eyebrow="How We Work"
          title="A process built for the final 10%."
          align="center"
          className="mb-20"
        />
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.12} className="relative">
              <div className="mb-6 flex items-center gap-4">
                <span className="font-display text-6xl text-transparent" style={{ WebkitTextStroke: '1px rgba(225,17,35,0.6)' }}>
                  {s.n}
                </span>
                <span className="h-px flex-1 bg-white/10" />
              </div>
              <h3 className="mb-3 font-heading text-2xl font-medium uppercase tracking-wide text-chrome">
                {s.title}
              </h3>
              <p className="leading-relaxed text-chrome-dark">{s.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- LATEST NEWS ---------- */
function LatestNews() {
  const latest = [...news].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3)
  return (
    <section className="relative py-16 md:py-36">
      <div className="container-x">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="News & Events" title="Latest from the studio." accentWord="studio." />
          <Reveal>
            <Link to="/news" className="btn-ghost">
              All News
            </Link>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {latest.map((n, i) => (
            <Reveal key={n.slug} delay={i * 0.08}>
              <Link to={`/news/${n.slug}`} className="group card-edge block h-full" data-cursor="hover">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={n.image}
                    alt={n.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                </div>
                <div className="p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="rounded-full border border-blood/40 px-3 py-1 text-[10px] uppercase tracking-wider text-blood-light">
                      {n.category}
                    </span>
                    <span className="font-heading text-xs uppercase tracking-ultra text-chrome-dark">
                      {formatDate(n.date)}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-medium uppercase leading-tight tracking-wide text-chrome transition-colors group-hover:text-blood">
                    {n.title}
                  </h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <PageWrapper>
      <Hero />
      <div className="relative bg-ink">
        <Marquee
          items={['Editorial', 'Color', 'Sound', 'VFX', 'Motion', 'Finishing']}
          className="border-y border-white/5 bg-ink-900"
        />
        <Stats />
        <Intro />
        <ServicesPreview />
        <FeaturedWork />
        <Process />
        <LatestNews />
      </div>
    </PageWrapper>
  )
}
