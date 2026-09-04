import { useState, useMemo, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'
import { projects } from '../data/projects'
import { allVideos } from '../data/videos'
import { news, formatDate } from '../data/news'

export default function Search() {
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') || '')

  useEffect(() => {
    setQuery(params.get('q') || '')
  }, [params])

  const q = query.trim().toLowerCase()

  const results = useMemo(() => {
    if (!q) return { films: [], videos: [], articles: [] }
    return {
      films: projects.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.client.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.services.join(' ').toLowerCase().includes(q)
      ),
      videos: allVideos.filter(
        (v) => v.title.toLowerCase().includes(q) || v.project.toLowerCase().includes(q)
      ),
      articles: news.filter(
        (n) => n.title.toLowerCase().includes(q) || n.excerpt.toLowerCase().includes(q)
      ),
    }
  }, [q])

  const total = results.films.length + results.videos.length + results.articles.length

  const onChange = (e) => {
    const v = e.target.value
    setQuery(v)
    setParams(v ? { q: v } : {}, { replace: true })
  }

  return (
    <PageWrapper>
      <section className="pt-32 md:pt-40">
        <div className="container-x mx-auto max-w-3xl">
          <span className="eyebrow mb-6">
            Search
          </span>
          <div className="relative">
            <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-2xl text-chrome-dark">
              ⌕
            </span>
            <input
              autoFocus
              value={query}
              onChange={onChange}
              placeholder="Search films, videos, news..."
              className="w-full border-b-2 border-white/15 bg-transparent py-5 pl-12 pr-4 font-display text-2xl uppercase tracking-tight text-chrome outline-none transition-colors placeholder:text-chrome-dark/40 focus:border-blood md:text-4xl"
            />
          </div>
          {q && (
            <p className="mt-5 font-heading text-xs uppercase tracking-ultra text-chrome-dark">
              {total} result{total === 1 ? '' : 's'} for "{query}"
            </p>
          )}
        </div>
      </section>

      <section className="container-x mx-auto max-w-3xl pb-28 pt-12">
        {!q && (
          <p className="text-chrome-dark">Start typing to search across the whole studio.</p>
        )}

        {q && total === 0 && (
          <p className="text-chrome-dark">No results found. Try a different term.</p>
        )}

        {results.films.length > 0 && (
          <Group title="Films">
            {results.films.map((p) => (
              <ResultRow
                key={p.slug}
                to={`/films/${p.slug}`}
                title={p.title}
                meta={`${p.category} · ${p.year}`}
                thumb={p.thumb}
              />
            ))}
          </Group>
        )}

        {results.videos.length > 0 && (
          <Group title="Videos">
            {results.videos.map((v) => (
              <ResultRow
                key={v.id}
                to={`/videos`}
                title={v.title}
                meta={`${v.type} · ${v.project}`}
                thumb={v.thumb}
              />
            ))}
          </Group>
        )}

        {results.articles.length > 0 && (
          <Group title="News">
            {results.articles.map((n) => (
              <ResultRow
                key={n.slug}
                to={`/news/${n.slug}`}
                title={n.title}
                meta={formatDate(n.date)}
                thumb={n.image}
              />
            ))}
          </Group>
        )}
      </section>
    </PageWrapper>
  )
}

function Group({ title, children }) {
  return (
    <div className="mb-12">
      <h2 className="mb-5 font-heading text-xs uppercase tracking-ultra text-blood-light">
        {title}
      </h2>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

function ResultRow({ to, title, meta, thumb }) {
  return (
    <Link
      to={to}
      className="group flex items-center gap-4 rounded-xl border border-transparent p-3 transition-colors hover:border-white/10 hover:bg-ink-800/50"
      data-cursor="hover"
    >
      <div className="h-14 w-20 flex-shrink-0 overflow-hidden rounded-lg">
        <img src={thumb} alt="" className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-heading text-base uppercase tracking-wide text-chrome transition-colors group-hover:text-blood">
          {title}
        </h3>
        <p className="text-sm text-chrome-dark">{meta}</p>
      </div>
      <span className="text-chrome-dark transition-all group-hover:translate-x-1 group-hover:text-blood">
        →
      </span>
    </Link>
  )
}
