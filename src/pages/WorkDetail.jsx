import { useParams, Link, Navigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import PageWrapper from '../components/PageWrapper'
import Reveal from '../components/Reveal'
import { getProject, projects } from '../data/projects'
import { stagger, maskUp } from '../lib/motion'

export default function WorkDetail() {
  const { slug } = useParams()
  const project = getProject(slug)
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12])

  if (!project) return <Navigate to="/films" replace />

  const idx = projects.findIndex((p) => p.slug === slug)
  const next = projects[(idx + 1) % projects.length]
  const words = project.title.split(' ')

  return (
    <PageWrapper>
      {/* Hero */}
      <section ref={heroRef} className="relative h-[85svh] min-h-[520px] overflow-hidden">
        <motion.img
          style={{ y, scale }}
          src={project.poster}
          alt={project.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/30" />
        <div className="absolute inset-0 bg-grain opacity-[0.05]" />

        <div className="container-x relative flex h-full flex-col justify-end pb-16">
          <Link
            to="/films"
            className="mb-8 inline-flex items-center gap-2 font-heading text-xs uppercase tracking-ultra text-chrome-dim transition-colors hover:text-blood"
          >
            ← Back to Work
          </Link>
          <span
            className="mb-4 inline-flex w-fit rounded-full border px-4 py-1 font-heading text-[11px] uppercase tracking-ultra"
            style={{ borderColor: project.accent, color: project.accent }}
          >
            {project.category}
          </span>
          <motion.h1
            variants={stagger(0.08, 0.1)}
            initial="hidden"
            animate="show"
            className="font-display text-6xl uppercase leading-[0.88] tracking-tight text-chrome sm:text-7xl md:text-8xl"
          >
            {words.map((w, i) => (
              <span key={i} className="mr-[0.2em] inline-block overflow-hidden align-bottom">
                <motion.span variants={maskUp} className="inline-block">
                  {w}
                </motion.span>
              </span>
            ))}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-4 max-w-xl text-lg text-chrome-dim"
          >
            {project.tagline}
          </motion.p>
        </div>
      </section>

      {/* Meta + summary */}
      <section className="container-x grid grid-cols-1 gap-12 py-20 lg:grid-cols-12 md:py-28">
        <div className="lg:col-span-4">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <span className="font-heading text-xs uppercase tracking-ultra text-chrome-dark">
                Client
              </span>
              <p className="mt-2 text-chrome">{project.client}</p>
            </div>
            <div>
              <span className="font-heading text-xs uppercase tracking-ultra text-chrome-dark">
                Year
              </span>
              <p className="mt-2 text-chrome">{project.year}</p>
            </div>
            <div className="col-span-2">
              <span className="font-heading text-xs uppercase tracking-ultra text-chrome-dark">
                Services
              </span>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.services.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-chrome-dim"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <Reveal>
            <p className="text-2xl leading-relaxed text-chrome-dim md:text-3xl">
              {project.summary}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/5 bg-ink-800/40 py-14">
        <div className="container-x grid grid-cols-1 gap-8 sm:grid-cols-3">
          {project.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="text-center">
              <span className="font-display text-5xl text-chrome md:text-6xl">{s.value}</span>
              <span className="mt-2 block font-heading text-xs uppercase tracking-ultra text-chrome-dark">
                {s.label}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="container-x space-y-6 py-20 md:py-28">
        {project.gallery.map((g, i) => (
          <Reveal key={i} amount={0.15}>
            <div className="card-edge overflow-hidden">
              <img
                src={g}
                alt={`${project.title} still ${i + 1}`}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        ))}
      </section>

      {/* Next project */}
      <section className="relative border-t border-white/5">
        <Link
          to={`/films/${next.slug}`}
          className="group container-x flex flex-col items-center gap-4 py-24 text-center"
          data-cursor="hover"
        >
          <span className="font-heading text-xs uppercase tracking-ultra text-chrome-dark">
            Next Project
          </span>
          <span className="font-display text-5xl uppercase tracking-tight text-chrome transition-colors duration-500 group-hover:text-blood md:text-8xl">
            {next.title}
          </span>
          <span className="text-2xl text-blood transition-transform duration-500 group-hover:translate-x-2">
            →
          </span>
        </Link>
      </section>
    </PageWrapper>
  )
}
