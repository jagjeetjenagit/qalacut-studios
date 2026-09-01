import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import {
  projects,
  categories,
  upcomingProjects,
  releasedProjects,
  distributionProjects,
} from '../data/projects'
import { easeExpo } from '../lib/motion'

function FilmCard({ p, i, large = false }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.6, ease: easeExpo, delay: (i % 3) * 0.05 }}
    >
      <Link to={`/films/${p.slug}`} className="group card-edge block" data-cursor="hover">
        <div className={`relative overflow-hidden ${large ? 'aspect-[16/10]' : 'aspect-[4/5]'}`}>
          <img
            src={large ? p.poster : p.thumb}
            alt={p.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent opacity-90" />
          <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-ink/50 px-3 py-1 font-heading text-[10px] uppercase tracking-ultra text-chrome backdrop-blur-sm">
            {p.status === 'upcoming' ? p.releaseDate : p.category}
          </span>
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
            <div className="flex flex-wrap gap-2 opacity-100 transition-all duration-500 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
              {p.services.slice(0, 3).map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-white/15 bg-ink/40 px-3 py-1 text-[10px] uppercase tracking-wider text-chrome-dim backdrop-blur-sm"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-end justify-between p-6">
          <div>
            <h3 className="font-display text-3xl uppercase tracking-tight text-chrome transition-colors group-hover:text-blood">
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
    </motion.div>
  )
}

export default function Films() {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState('All')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return releasedProjects.filter((p) => {
      const matchCat = active === 'All' || p.category === active
      const matchQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.client.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      return matchCat && matchQ
    })
  }, [query, active])

  return (
    <PageWrapper>
      <PageHero
        eyebrow="Our Films"
        title="Every frame, finished."
        accentWord="finished."
        subtitle="Features, series, commercials and music videos finished at QalaCut, graded, mixed and mastered in-house."
      />

      {/* Search */}
      <section className="container-x -mt-2 mb-14">
        <div className="relative mx-auto max-w-2xl">
          <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-chrome-dark">
            ⌕
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a film, client or category..."
            className="w-full rounded-full border border-white/12 bg-ink-800/60 py-4 pl-12 pr-5 text-chrome outline-none transition-colors placeholder:text-chrome-dark/60 focus:border-blood"
          />
        </div>
      </section>

      {/* Upcoming */}
      {upcomingProjects.length > 0 && query.trim() === '' && (
        <section className="container-x mb-20">
          <SectionHeading eyebrow="In Post / Coming Soon" title="Upcoming" className="mb-10" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {upcomingProjects.map((p, i) => (
              <FilmCard key={p.slug} p={p} i={i} large />
            ))}
          </div>
        </section>
      )}

      {/* Filters */}
      <section className="container-x mb-10 flex flex-wrap gap-3">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`rounded-full border px-5 py-2 font-heading text-xs uppercase tracking-wider transition-all duration-300 ${
              active === c
                ? 'border-blood bg-blood text-white'
                : 'border-white/10 text-chrome-dark hover:border-white/30 hover:text-white'
            }`}
          >
            {c}
          </button>
        ))}
      </section>

      {/* Released grid */}
      <section className="container-x pb-24">
        {filtered.length === 0 ? (
          <p className="py-16 text-center text-chrome-dark">
            No films match "{query}". Try another search.
          </p>
        ) : (
          <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <FilmCard key={p.slug} p={p} i={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* Distribution */}
      {distributionProjects.length > 0 && query.trim() === '' && (
        <section className="container-x border-t border-white/5 py-20">
          <SectionHeading
            eyebrow="Dharma-style catalogue"
            title="QalaCut Distribution"
            className="mb-10"
          />
          <p className="mb-10 max-w-2xl text-chrome-dark">
            Selected titles we finished and helped bring to audiences worldwide.
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {distributionProjects.map((p, i) => (
              <FilmCard key={p.slug} p={p} i={i} />
            ))}
          </div>
        </section>
      )}
    </PageWrapper>
  )
}
