import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import { videoGroups, videoTypes, allVideos } from '../data/videos'
import { easeExpo } from '../lib/motion'

function VideoThumb({ v, onPlay }) {
  return (
    <button onClick={() => onPlay(v)} className="group block w-full text-left" data-cursor="hover">
      <div className="relative aspect-video overflow-hidden rounded-xl border border-white/8">
        <img
          src={v.thumb}
          alt={v.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-ink/30 transition-colors group-hover:bg-ink/10" />
        {/* play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-ink/40 text-lg text-white backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-blood group-hover:bg-blood">
            ▶
          </span>
        </div>
        <span className="absolute bottom-3 right-3 rounded bg-ink/70 px-2 py-1 text-[10px] font-medium text-chrome backdrop-blur-sm">
          {v.duration}
        </span>
        <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-ink/50 px-2.5 py-1 text-[9px] uppercase tracking-wider text-chrome-dim backdrop-blur-sm">
          {v.type}
        </span>
      </div>
      <h4 className="mt-3 font-heading text-sm uppercase tracking-wide text-chrome transition-colors group-hover:text-blood">
        {v.title}
      </h4>
    </button>
  )
}

function Lightbox({ video, onClose }) {
  return (
    <AnimatePresence>
      {video && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            transition={{ duration: 0.4, ease: easeExpo }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl"
          >
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 flex items-center gap-2 font-heading text-xs uppercase tracking-ultra text-chrome-dim transition-colors hover:text-blood"
            >
              Close ✕
            </button>
            <div className="aspect-video overflow-hidden rounded-xl border border-white/10 bg-black">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <h3 className="font-display text-2xl uppercase tracking-tight text-chrome">
                {video.title}
              </h3>
              {video.project && (
                <span className="font-heading text-xs uppercase tracking-ultra text-chrome-dark">
                  {video.project}
                </span>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Videos() {
  const [active, setActive] = useState('All')
  const [query, setQuery] = useState('')
  const [playing, setPlaying] = useState(null)

  const q = query.trim().toLowerCase()

  // When searching or filtering by type, show a flat grid; otherwise grouped by project.
  const flat = useMemo(() => {
    return allVideos.filter((v) => {
      const matchType = active === 'All' || v.type === active
      const matchQ =
        !q || v.title.toLowerCase().includes(q) || v.project.toLowerCase().includes(q)
      return matchType && matchQ
    })
  }, [active, q])

  const grouped = active === 'All' && q === ''

  return (
    <PageWrapper>
      <PageHero
        eyebrow="Videos"
        title="Trailers, reels & breakdowns."
        accentWord="breakdowns."
        subtitle="Trailers, teasers, behind-the-scenes and craft breakdowns from the films we finish."
      />

      {/* Search */}
      <section className="container-x -mt-2 mb-10">
        <div className="relative mx-auto max-w-2xl">
          <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-chrome-dark">
            ⌕
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a video or film..."
            className="w-full rounded-full border border-white/12 bg-ink-800/60 py-4 pl-12 pr-5 text-chrome outline-none transition-colors placeholder:text-chrome-dark/60 focus:border-blood"
          />
        </div>
      </section>

      {/* Type filter */}
      <section className="container-x mb-12 flex flex-wrap gap-3">
        {videoTypes.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`rounded-full border px-5 py-2 font-heading text-xs uppercase tracking-wider transition-all duration-300 ${
              active === t
                ? 'border-blood bg-blood text-white'
                : 'border-white/10 text-chrome-dark hover:border-white/30 hover:text-white'
            }`}
          >
            {t}
          </button>
        ))}
      </section>

      <section className="container-x pb-24">
        {grouped ? (
          videoGroups.map((g, gi) => (
            <Reveal key={g.slug} className="mb-16">
              <div className="mb-6 flex items-end justify-between border-b border-white/8 pb-4">
                <h3 className="font-display text-3xl uppercase tracking-tight text-chrome md:text-4xl">
                  {g.project}
                </h3>
                <span className="font-heading text-xs uppercase tracking-ultra text-chrome-dark">
                  {g.videos.length} videos
                </span>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {g.videos.map((v) => (
                  <VideoThumb key={v.id} v={{ ...v, project: g.project }} onPlay={setPlaying} />
                ))}
              </div>
            </Reveal>
          ))
        ) : flat.length === 0 ? (
          <p className="py-16 text-center text-chrome-dark">No videos match your search.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {flat.map((v) => (
              <VideoThumb key={v.id} v={v} onPlay={setPlaying} />
            ))}
          </div>
        )}
      </section>

      <Lightbox video={playing} onClose={() => setPlaying(null)} />
    </PageWrapper>
  )
}
