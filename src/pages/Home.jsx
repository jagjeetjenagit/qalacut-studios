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
import { stagger, maskUp } from '../lib/motion'

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

      {/* Content - stays fixed in place, does not travel with scroll */}
      <motion.div
        style={{ opacity }}
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

        {/* One-line wordmark - QALA + C(red) + UT */}
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
              View Our Portfolio <span aria-hidden>▶</span>
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
              sound designers who are obsessed with the final 10%. The part that
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
        </div>
      </div>
    </section>
  )
}

/* ---------- FOUNDER / OWNER ---------- */
function Founder() {
  return (
    <section className="relative overflow-hidden border-t border-white/5 py-16 md:py-36">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -left-40 top-1/2 h-[55vh] w-[55vh] -translate-y-1/2 rounded-full bg-blood/10 blur-[170px]" />
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.05]" />

      <div className="container-x grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
        {/* Portrait */}
        <Reveal className="lg:col-span-5">
          <div className="relative mx-auto max-w-md">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80"
                alt="Founder portrait"
                loading="lazy"
                className="h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                style={{ filter: 'contrast(1.05) brightness(0.9)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            </div>
            {/* cinematic frame accents */}
            <div className="absolute -bottom-4 -right-4 h-24 w-24 border-b-2 border-r-2 border-blood/70" />
            <div className="absolute -left-4 -top-4 h-24 w-24 border-l-2 border-t-2 border-white/15" />
          </div>
        </Reveal>

        {/* Note */}
        <div className="lg:col-span-6 lg:col-start-7">
          <SectionHeading
            eyebrow="From the Founder"
            title="A studio built on obsession."
            accentWord="obsession."
          />
          <Reveal delay={0.1}>
            <p className="mt-8 font-display text-2xl leading-snug text-chrome md:text-3xl">
              &ldquo;We don&rsquo;t hand back a file. We hand back the version of
              your film you always heard in your head.&rdquo;
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-6 leading-relaxed text-chrome-dark">
              I started QalaCut because the last mile of a film deserves the same
              fire as the first frame. Every project that leaves this studio
              carries the whole team&rsquo;s craft, and my name behind it.
            </p>
          </Reveal>
          <Reveal delay={0.26}>
            <div className="mt-10 flex items-center gap-5">
              <span className="h-px w-12 bg-blood" />
              <div>
                <p className="font-heading text-lg uppercase tracking-wide text-chrome">
                  Founder Name
                </p>
                <p className="font-heading text-xs uppercase tracking-ultra text-chrome-dark">
                  Founder &amp; Creative Director
                </p>
              </div>
            </div>
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

/* ---------- PORTFOLIO (NETFLIX-STYLE ROW) ---------- */
function PortfolioRow() {
  const scrollerRef = useRef(null)
  // duplicate a couple so the row always feels full/scrollable
  const items = projects

  const scrollBy = (dir) => {
    const el = scrollerRef.current
    if (!el) return
    const amount = Math.min(el.clientWidth * 0.8, 640)
    el.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  return (
    <section className="relative py-16 md:py-28">
      <div className="container-x mb-8 flex flex-col items-start justify-between gap-6 md:mb-10 md:flex-row md:items-end">
        <SectionHeading eyebrow="View Our Portfolio" title="Recent finishes." accentWord="finishes." />
        <Reveal>
          <div className="flex items-center gap-4">
            {/* arrow controls, Netflix-style */}
            <div className="hidden items-center gap-2 md:flex">
              <button
                type="button"
                aria-label="Scroll left"
                onClick={() => scrollBy(-1)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-chrome-dim transition-colors hover:border-blood hover:text-blood"
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Scroll right"
                onClick={() => scrollBy(1)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-chrome-dim transition-colors hover:border-blood hover:text-blood"
              >
                ›
              </button>
            </div>
            <Link to="/films" className="btn-ghost">
              View All Films
            </Link>
          </div>
        </Reveal>
      </div>

      {/* the row itself - full-bleed, horizontally scrollable with snap */}
      <div className="relative">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-ink to-transparent md:w-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-ink to-transparent md:w-20" />

        <div
          ref={scrollerRef}
          className="no-scrollbar mx-auto flex max-w-[1440px] snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 md:gap-5 md:px-10 lg:px-16"
          style={{ scrollbarWidth: 'none' }}
        >
          {items.map((p) => (
            <Link
              key={p.slug}
              to={`/films/${p.slug}`}
              data-cursor="hover"
              className="group relative aspect-[2/3] w-[62vw] flex-none snap-start overflow-hidden rounded-md border border-white/8 transition-transform duration-500 will-change-transform hover:z-20 hover:scale-[1.04] sm:w-[38vw] md:w-[300px] lg:w-[340px]"
            >
              <img
                src={p.thumb}
                alt={p.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
              />
              {/* category chip */}
              <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-ink/50 px-3 py-1 font-heading text-[10px] uppercase tracking-ultra text-chrome backdrop-blur-sm">
                {p.category}
              </span>
              {/* bottom gradient + title on hover */}
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink via-ink/30 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <h3 className="font-display text-2xl uppercase leading-none tracking-tight text-chrome md:text-3xl">
                  {p.title}
                </h3>
                <p className="mt-1 text-xs text-chrome-dim">
                  {p.client} · {p.year}
                </p>
              </div>
              {/* always-visible red underline accent on hover */}
              <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-blood transition-all duration-500 group-hover:w-full" />
            </Link>
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
      {/* 1. Simple loader (App-level) + 2. moving front page */}
      <Hero />
      <div className="relative bg-ink">
        {/* 3. Sound / VFX crafts strip - small */}
        <Marquee
          items={['Editorial', 'Color', 'Sound', 'VFX', 'Motion', 'Finishing']}
          className="border-y border-white/5 bg-ink-900"
          size="sm"
        />
        {/* 4. Who we are */}
        <Intro />
        {/* 5. Recent finishes - Netflix-style portfolio */}
        <PortfolioRow />
        {/* 6. 250+ finished / 18 awards */}
        <Stats />
        {/* 7. What we do */}
        <ServicesPreview />
        {/* 8. How we work */}
        <Process />
        {/* 9. News & events */}
        <LatestNews />
        {/* 10. From the founder */}
        <Founder />
      </div>
    </PageWrapper>
  )
}
