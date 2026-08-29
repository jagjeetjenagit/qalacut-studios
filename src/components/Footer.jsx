import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Magnetic from './Magnetic'

const columns = [
  {
    title: 'Studio',
    links: [
      { to: '/about', label: 'About' },
      { to: '/services', label: 'Services' },
      { to: '/work', label: 'Work' },
      { to: '/team', label: 'Team' },
    ],
  },
  {
    title: 'Services',
    links: [
      { to: '/services', label: 'Editorial' },
      { to: '/services', label: 'Color Grading' },
      { to: '/services', label: 'Sound Design' },
      { to: '/services', label: 'VFX & CGI' },
    ],
  },
]

const socials = ['Instagram', 'Vimeo', 'YouTube', 'LinkedIn']

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-ink-900 pt-24">
      <div className="container-x">
        {/* CTA */}
        <div className="flex flex-col items-start justify-between gap-10 pb-20 md:flex-row md:items-end">
          <div>
            <span className="eyebrow mb-5">
              <span className="inline-block h-px w-8 bg-blood" /> Let's build something
            </span>
            <h2 className="font-display text-5xl uppercase leading-[0.95] tracking-tight text-chrome sm:text-6xl md:text-7xl">
              Ready to make <br />
              <span className="text-blood">the final cut?</span>
            </h2>
          </div>
          <Magnetic strength={0.4}>
            <Link to="/contact" className="btn-primary">
              Start a Project
              <span aria-hidden>→</span>
            </Link>
          </Magnetic>
        </div>

        <div className="laser-line mb-16" />

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-10 pb-16 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="font-display text-3xl uppercase tracking-tight text-chrome">
              Qala<span className="text-blood">Cut</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-chrome-dark">
              A premium post-production studio. Editorial, color, sound, VFX and finishing  - 
              where the final cut becomes cinema.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-5 font-heading text-xs uppercase tracking-ultra text-chrome-dark">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((l, i) => (
                  <li key={i}>
                    <Link
                      to={l.to}
                      className="text-sm text-chrome-dim transition-colors hover:text-blood"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="mb-5 font-heading text-xs uppercase tracking-ultra text-chrome-dark">
              Connect
            </h4>
            <ul className="space-y-3">
              {socials.map((s) => (
                <li key={s}>
                  <a
                    href="#"
                    className="group inline-flex items-center gap-2 text-sm text-chrome-dim transition-colors hover:text-blood"
                  >
                    <span className="h-px w-0 bg-blood transition-all duration-300 group-hover:w-4" />
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Giant wordmark */}
        <div className="relative -mb-6 select-none overflow-hidden">
          <motion.h3
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="whitespace-nowrap text-center font-display text-[18vw] uppercase leading-none tracking-tighter text-transparent"
            style={{ WebkitTextStroke: '1px rgba(255,255,255,0.08)' }}
          >
            QALACUT
          </motion.h3>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 py-8 text-xs text-chrome-dark md:flex-row">
          <span>© {new Date().getFullYear()} QalaCut Studios. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-chrome">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-chrome">
              Terms
            </a>
            <span className="text-chrome-dark/60">Crafted with precision.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
