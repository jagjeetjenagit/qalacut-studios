import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import PageHero from '../components/PageHero'
import { news, formatDate, monthsList } from '../data/news'
import { easeExpo } from '../lib/motion'

const years = [...new Set(news.map((n) => new Date(n.date).getFullYear()))].sort((a, b) => b - a)

export default function News() {
  const [query, setQuery] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return news
      .filter((n) => {
        const d = new Date(n.date)
        const matchQ =
          !q || n.title.toLowerCase().includes(q) || n.excerpt.toLowerCase().includes(q)
        const matchMonth = !month || d.getMonth() === monthsList.indexOf(month)
        const matchYear = !year || d.getFullYear() === Number(year)
        return matchQ && matchMonth && matchYear
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  }, [query, month, year])

  const selectCls =
    'rounded-full border border-white/12 bg-ink-800/60 px-4 py-3 text-sm text-chrome outline-none transition-colors focus:border-blood'

  return (
    <PageWrapper>
      <PageHero
        eyebrow="News & Events"
        title="From the cutting room."
        accentWord="room."
        subtitle="Premieres, studio updates, awards and the occasional peek behind the curtain."
      />

      {/* Filter bar */}
      <section className="container-x -mt-2 mb-14">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-chrome-dark">
              ⌕
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search news..."
              className="w-full rounded-full border border-white/12 bg-ink-800/60 py-3 pl-12 pr-5 text-chrome outline-none transition-colors placeholder:text-chrome-dark/60 focus:border-blood"
            />
          </div>
          <select value={month} onChange={(e) => setMonth(e.target.value)} className={selectCls}>
            <option value="">All months</option>
            {monthsList.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <select value={year} onChange={(e) => setYear(e.target.value)} className={selectCls}>
            <option value="">All years</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* News list */}
      <section className="container-x pb-24">
        {filtered.length === 0 ? (
          <p className="py-16 text-center text-chrome-dark">No articles match your filters.</p>
        ) : (
          <div className="mx-auto max-w-4xl space-y-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((n, i) => (
                <motion.div
                  key={n.slug}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: easeExpo, delay: (i % 4) * 0.05 }}
                >
                  <Link
                    to={`/news/${n.slug}`}
                    className="group card-edge grid grid-cols-1 gap-0 sm:grid-cols-[240px_1fr]"
                    data-cursor="hover"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden sm:aspect-auto">
                      <img
                        src={n.image}
                        alt={n.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col justify-center p-6">
                      <div className="mb-3 flex items-center gap-3">
                        <span className="rounded-full border border-blood/40 px-3 py-1 text-[10px] uppercase tracking-wider text-blood-light">
                          {n.category}
                        </span>
                        <span className="font-heading text-xs uppercase tracking-ultra text-chrome-dark">
                          {formatDate(n.date)}
                        </span>
                      </div>
                      <h3 className="font-heading text-xl font-medium uppercase leading-tight tracking-wide text-chrome transition-colors group-hover:text-blood md:text-2xl">
                        {n.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-chrome-dark">{n.excerpt}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>
    </PageWrapper>
  )
}
