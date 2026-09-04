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
            style={{ filter: 'grayscale(0.55) contrast(1.05) brightness(0.38) saturate(0.85)' }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// Running SMPTE-style timecode - a small post-production authenticity cue in the HUD.
function Timecode() {
  const [frames, setFrames] = useState(0)
  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setFrames(24 * 12 + 4) // sit at a static 00:00:12:04
      return
    }
    const id = setInterval(() => setFrames((f) => f + 1), 42) // ~24 fps
    return () => clearInterval(id)
  }, [])
  const fps = 24
  const p = (n) => String(n).padStart(2, '0')
  const f = frames % fps
  const totalSec = Math.floor(frames / fps)
  const s = totalSec % 60
  const m = Math.floor(totalSec / 60) % 60
  const h = Math.floor(totalSec / 3600) % 24
  return (
    <span className="font-mono tabular-nums">
      {p(h)}:{p(m)}:{p(s)}
      <span className="text-blood">:{p(f)}</span>
    </span>
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
        {/* cinematic grade overlays - legibility first */}
        {/* 1. flat global darken so the image reads as mood, not subject */}
        <div className="absolute inset-0 bg-ink/45" />
        {/* 2. central scrim: darkest right behind the wordmark + copy, fades out to the edges */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_center,rgba(10,10,11,0.82)_0%,rgba(10,10,11,0.45)_45%,rgba(10,10,11,0.15)_75%)]" />
        {/* 3. top + bottom anchors for navbar and HUD legibility */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-ink via-ink/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
        {/* 4. edge vignette for the cinematic frame */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(10,10,11,0.85)_100%)]" />
        <div className="absolute inset-0 bg-grain opacity-[0.07]" />
        {/* red ambient glow */}
        <div className="absolute left-1/2 top-1/2 h-[55vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blood/10 blur-[150px]" />
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
          className="eyebrow eyebrow-center mb-5 md:mb-8"
        >
          Post-Production Studio
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

        {/* signature red laser slash */}
        <motion.span
          aria-hidden
          className="laser-line mt-5 block w-40 md:w-56"
          style={{ transformOrigin: 'center' }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />

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

      {/* Cinematic viewfinder safe-frame with corner ticks */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 1 }}
        className="pointer-events-none absolute inset-x-4 top-[4.5rem] bottom-5 z-20 md:inset-x-8 md:top-24 md:bottom-8"
      >
        <span className="absolute left-0 top-0 h-5 w-5 border-l border-t border-white/25 md:h-9 md:w-9" />
        <span className="absolute right-0 top-0 h-5 w-5 border-r border-t border-white/25 md:h-9 md:w-9" />
        <span className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-white/25 md:h-9 md:w-9" />
        <span className="absolute bottom-0 right-0 h-5 w-5 border-b border-r border-white/25 md:h-9 md:w-9" />

        {/* HUD: REC + running timecode (bottom-left) */}
        <div className="absolute bottom-1 left-2 flex items-center gap-2 font-heading text-[9px] uppercase tracking-ultra text-chrome-dim md:bottom-2 md:left-3 md:text-[10px]">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blood shadow-[0_0_8px_1px_rgba(225,17,35,0.8)]" />
            Rec
          </span>
          <span className="text-chrome-dark">·</span>
          <Timecode />
        </div>

        {/* HUD: location / coordinates (bottom-right, desktop) */}
        <div className="absolute bottom-2 right-3 hidden font-heading text-[10px] uppercase tracking-ultra text-chrome-dim md:block">
          Mumbai · 19.07°N
        </div>
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
          <SectionHeading index="01" eyebrow="The Studio" title="Where films get their last 10%." accentWord="10%." />
        </div>
        <div className="flex flex-col justify-center gap-8 lg:col-span-6 lg:col-start-7">
          <Reveal>
            <p className="text-lg leading-relaxed text-chrome-dim md:text-xl">
              QalaCut is where films come to be finished. Editors, colorists,
              mixers and VFX artists under one roof, chasing the last ten percent
              nobody notices and everybody feels.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="leading-relaxed text-chrome-dark">
              We don't just export a master. We sit in the dark with directors,
              agencies and studios until the cut breathes exactly the way it was
              always meant to.
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
            index="06"
            eyebrow="The Founder"
            title="Every frame has my name on it."
            accentWord="name"
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
            <div className="mt-10 flex items-center gap-4 md:gap-5">
              <span className="signature-accent h-[2px] w-10 flex-none rounded-full md:w-14" />
              <div>
                <p className="font-heading text-lg uppercase tracking-wide text-chrome">
                  Founder Name
                </p>
                <p className="mt-0.5 font-heading text-[0.7rem] uppercase tracking-ultra text-chrome-dark">
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
          <SectionHeading index="03" eyebrow="The Craft" title="Six rooms. One final cut." accentWord="cut." />
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
                className="group relative flex items-center justify-between gap-4 border-t border-white/8 py-7 transition-colors duration-500 hover:border-blood/40 last:border-b md:gap-6 md:py-8"
              >
                <div className="flex min-w-0 flex-col gap-2 md:flex-row md:items-baseline md:gap-6">
                  <div className="flex items-baseline gap-4 md:gap-6">
                    <span className="font-heading text-sm text-blood">{s.index}</span>
                    <h3 className="font-display text-[2rem] uppercase leading-none tracking-tight text-chrome transition-all duration-500 group-hover:translate-x-3 group-hover:text-blood md:text-6xl">
                      {s.title}
                    </h3>
                  </div>
                  {/* short description: stacked under the title on mobile, hidden on desktop (desktop shows it on the right) */}
                  <p className="pl-8 text-sm leading-relaxed text-chrome-dark md:hidden">
                    {s.short}
                  </p>
                </div>
                <div className="hidden max-w-xs text-right text-sm text-chrome-dark md:block">
                  {s.short}
                </div>
                <span className="flex-none text-2xl text-chrome-dark transition-all duration-500 group-hover:translate-x-2 group-hover:text-blood">
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
    const amount = Math.min(el.clientWidth * 0.9, 760)
    el.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  return (
    <section className="relative py-16 md:py-28">
      <div className="container-x mb-8 flex flex-col items-start justify-between gap-6 md:mb-10 md:flex-row md:items-end">
        <SectionHeading index="02" eyebrow="Selected Work" title="Straight out of the suite." accentWord="suite." />
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
              className="group relative aspect-[16/10] w-[80vw] flex-none snap-start overflow-hidden rounded-xl border border-white/10 bg-ink-800 transition-all duration-500 will-change-transform hover:z-20 hover:border-blood/40 sm:w-[62vw] md:w-[440px] lg:w-[520px]"
            >
              <img
                src={p.poster}
                alt={p.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
              />
              {/* always-on cinematic grade for legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />

              {/* top row: category + status */}
              <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
                <span className="rounded-full border border-white/20 bg-ink/40 px-3 py-1 font-heading text-[10px] uppercase tracking-ultra text-chrome backdrop-blur-sm">
                  {p.category}
                </span>
                {p.status === 'upcoming' && (
                  <span className="rounded-full border border-blood/50 bg-blood/10 px-3 py-1 font-heading text-[10px] uppercase tracking-ultra text-blood-light backdrop-blur-sm">
                    Upcoming
                  </span>
                )}
              </div>

              {/* always-visible title block */}
              <div className="absolute inset-x-0 bottom-0 flex flex-col p-5 md:p-6">
                <h3 className="font-display text-3xl uppercase leading-[0.9] tracking-tight text-chrome md:text-4xl">
                  {p.title}
                </h3>
                <p className="mt-2 font-heading text-[11px] uppercase tracking-[0.2em] text-chrome-dim">
                  {p.client} · {p.year}
                </p>
                <span className="mt-4 h-[2px] w-10 bg-blood transition-all duration-500 group-hover:w-24" />
              </div>
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
          index="04"
          eyebrow="The Method"
          title="Obsessed with the last mile."
          accentWord="mile."
          className="mb-16 md:mb-20"
        />
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.12} className="relative">
              <div className="mb-6 flex items-center gap-4">
                <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full border border-blood/40 bg-blood/5 font-heading text-base text-blood-light">
                  {s.n}
                </span>
                <span className="font-heading text-[0.7rem] uppercase tracking-ultra text-chrome-dark">
                  Step {s.n} of 03
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
          <SectionHeading index="05" eyebrow="Dispatches" title="Notes from the studio floor." accentWord="floor." />
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
