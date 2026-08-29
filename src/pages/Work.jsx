import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import PageHero from '../components/PageHero'
import { projects, categories } from '../data/projects'
import { easeExpo } from '../lib/motion'

function ProjectCard({ p, i }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.6, ease: easeExpo, delay: (i % 3) * 0.05 }}
    >
      <Link to={`/work/${p.slug}`} className="group card-edge block" data-cursor="hover">
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={p.thumb}
            alt={p.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent opacity-90" />
          <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-ink/50 px-3 py-1 font-heading text-[10px] uppercase tracking-ultra text-chrome backdrop-blur-sm">
            {p.category}
          </span>

          {/* service tags - always visible on touch, hover-reveal on desktop */}
          <div className="absolute inset-x-0 bottom-0 p-4 opacity-100 transition-all duration-500 sm:p-6 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
            <div className="flex flex-wrap gap-2">
              {p.services.map((s) => (
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

export default function Work() {
  const [active, setActive] = useState('All')
  const filtered =
    active === 'All' ? projects : projects.filter((p) => p.category === active)

  return (
    <PageWrapper>
      <PageHero
        eyebrow="Selected Work"
        title="The finished cut."
        accentWord="cut."
        subtitle="A selection of films, series, commercials and music videos finished at QalaCut. Every frame graded, mixed and mastered in-house."
      />

      {/* Filter bar */}
      <section className="container-x sticky top-[72px] z-30 -mt-4 mb-12 flex flex-wrap gap-3 bg-ink/70 py-4 backdrop-blur-md">
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

      <section className="container-x pb-32">
        <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProjectCard key={p.slug} p={p} i={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </PageWrapper>
  )
}
