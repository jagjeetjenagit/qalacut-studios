import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { easeExpo } from '../lib/motion'
import Magnetic from './Magnetic'

// Primary desktop nav
const links = [
  { to: '/films', label: 'Films' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
]

// Full list for the mobile menu
const mobileLinks = [
  { to: '/', label: 'Home' },
  { to: '/films', label: 'Films' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/team', label: 'Team' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const goSearch = () => {
    setOpen(false)
    navigate('/search')
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => setOpen(false), [location.pathname])

  // Lock scroll when menu open
  useEffect(() => {
    if (open) window.__lenis?.stop()
    else window.__lenis?.start()
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || open
            ? 'border-b border-white/5 bg-ink/80 backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <div className="container-x flex items-center justify-between py-4">
          <Link to="/" className="group flex items-center gap-3" aria-label="QalaCut Studios home">
            <span className="font-display text-2xl uppercase leading-none tracking-tight text-chrome md:text-3xl">
              Qala<span className="text-blood">Cut</span>
            </span>
            <span className="hidden font-heading text-[10px] uppercase tracking-mega text-chrome-dark sm:inline">
              Studios
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `relative font-heading text-sm uppercase tracking-[0.18em] transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-chrome-dark hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1.5 left-0 h-px w-full bg-blood"
                        style={{ boxShadow: '0 0 8px rgba(225,17,35,0.8)' }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
            <button
              onClick={goSearch}
              aria-label="Search"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-chrome-dim transition-colors hover:border-blood/60 hover:text-white"
            >
              ⌕
            </button>
            <Magnetic strength={0.5}>
              <Link to="/contact" className="btn-primary !px-6 !py-3 !text-xs">
                Start a Project
              </Link>
            </Magnetic>
          </nav>

          {/* Mobile controls */}
          <div className="flex items-center gap-1 lg:hidden">
            <button
              onClick={goSearch}
              aria-label="Search"
              className="relative z-50 flex h-10 w-10 items-center justify-center text-xl text-white"
            >
              ⌕
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[6px]"
              aria-label="Toggle menu"
            >
            <span
              className={`h-[2px] w-7 bg-white transition-all duration-300 ${open ? 'translate-y-[8px] rotate-45' : ''}`}
            />
            <span
              className={`h-[2px] w-7 bg-white transition-all duration-300 ${open ? 'opacity-0' : ''}`}
            />
            <span
              className={`h-[2px] w-7 bg-white transition-all duration-300 ${open ? '-translate-y-[8px] -rotate-45' : ''}`}
            />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-ink lg:hidden"
          >
            <div className="absolute inset-0 bg-grain opacity-[0.05]" />
            <nav className="container-x relative flex max-h-[85vh] flex-col gap-1 overflow-y-auto py-20">
              {mobileLinks.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.5, ease: easeExpo }}
                >
                  <Link
                    to={l.to}
                    className="group flex items-baseline gap-4 py-1.5"
                    onClick={() => setOpen(false)}
                  >
                    <span className="font-heading text-xs text-blood">0{i + 1}</span>
                    <span className="font-display text-4xl uppercase tracking-tight text-chrome transition-colors group-hover:text-blood sm:text-5xl">
                      {l.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
              <motion.button
                onClick={goSearch}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5, ease: easeExpo }}
                className="mt-6 flex items-center gap-3 font-heading text-sm uppercase tracking-[0.18em] text-chrome-dim"
              >
                <span className="text-lg text-blood">⌕</span> Search the studio
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
