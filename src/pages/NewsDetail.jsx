import { useParams, Link, Navigate } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'
import Reveal from '../components/Reveal'
import { getArticle, news, formatDate } from '../data/news'

export default function NewsDetail() {
  const { slug } = useParams()
  const article = getArticle(slug)
  if (!article) return <Navigate to="/news" replace />

  const more = news.filter((n) => n.slug !== slug).slice(0, 3)

  return (
    <PageWrapper>
      <article className="pt-32 md:pt-40">
        <div className="container-x mx-auto max-w-3xl">
          <Link
            to="/news"
            className="mb-8 inline-flex items-center gap-2 font-heading text-xs uppercase tracking-ultra text-chrome-dim transition-colors hover:text-blood"
          >
            ← All News
          </Link>
          <div className="mb-6 flex items-center gap-3">
            <span className="rounded-full border border-blood/40 px-3 py-1 text-[10px] uppercase tracking-wider text-blood-light">
              {article.category}
            </span>
            <span className="font-heading text-xs uppercase tracking-ultra text-chrome-dark">
              {formatDate(article.date)}
            </span>
          </div>
          <h1 className="font-display text-4xl uppercase leading-[0.95] tracking-tight text-chrome sm:text-5xl md:text-6xl">
            {article.title}
          </h1>
        </div>

        <div className="container-x mx-auto my-12 max-w-5xl">
          <div className="card-edge overflow-hidden">
            <img src={article.image} alt={article.title} className="h-full w-full object-cover" />
          </div>
        </div>

        <div className="container-x mx-auto max-w-3xl space-y-6 pb-16">
          {article.body.map((p, i) => (
            <Reveal key={i}>
              <p className="text-lg leading-relaxed text-chrome-dim">{p}</p>
            </Reveal>
          ))}
        </div>
      </article>

      {/* More news */}
      <section className="border-t border-white/5 py-20">
        <div className="container-x">
          <h2 className="mb-10 font-display text-3xl uppercase tracking-tight text-chrome md:text-4xl">
            More <span className="text-blood">News</span>
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {more.map((n) => (
              <Link key={n.slug} to={`/news/${n.slug}`} className="group card-edge block" data-cursor="hover">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={n.image}
                    alt={n.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <span className="font-heading text-[10px] uppercase tracking-ultra text-chrome-dark">
                    {formatDate(n.date)}
                  </span>
                  <h3 className="mt-2 font-heading text-lg font-medium uppercase leading-tight tracking-wide text-chrome transition-colors group-hover:text-blood">
                    {n.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
