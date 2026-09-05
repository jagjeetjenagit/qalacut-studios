import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// First-load cinematic intro - production-house loader:
// letter-by-letter blur reveal, growing accent line, pulsing dots,
// and a bottom progress bar with an eased counter that snaps to 100 on load.
const WORDS = ['QALACUT', 'STUDIOS']
// first letter of each word is red: [Q]ALACUT [S]TUDIOS

export default function Loader({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const minLoadTime = 2800
    const start = Date.now()

    // ease the counter up, capping at 96 until the page is actually ready
    const interval = setInterval(() => {
      setProgress((p) => (p >= 96 ? 96 : p + Math.max(1, Math.round((100 - p) * 0.05))))
    }, 90)

    const complete = () => {
      const remaining = Math.max(0, minLoadTime - (Date.now() - start))
      setTimeout(() => {
        clearInterval(interval)
        setProgress(100)
        setTimeout(() => setVisible(false), 550) // hold on 100% then wipe
      }, remaining)
    }

    if (document.readyState === 'complete') complete()
    else window.addEventListener('load', complete)

    return () => {
      clearInterval(interval)
      window.removeEventListener('load', complete)
    }
  }, [])

  const pct = Math.min(progress, 100)

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-ink"
        >
          {/* Ambient red glow */}
          <motion.div
            className="pointer-events-none absolute"
            style={{
              width: 'min(95vw, 900px)',
              height: 'min(95vw, 900px)',
              top: '8%',
              background: 'radial-gradient(circle, rgba(225,17,35,0.16), transparent 62%)',
              filter: 'blur(50px)',
            }}
            animate={{ opacity: [0.35, 0.7, 0.35] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Vignette for depth */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at center, transparent 42%, rgba(10,10,11,0.75) 100%)' }}
          />
          <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.05]" />

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            {/* Eyebrow */}
            <motion.span
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="mb-6 font-heading text-[9px] font-medium uppercase text-chrome-dark sm:mb-8 sm:text-[11px]"
              style={{ letterSpacing: '0.5em', textIndent: '0.5em' }}
            >
              Post Production House
            </motion.span>

            {/* Wordmark - letter-by-letter blur reveal */}
            <h1
              className="flex flex-wrap items-center justify-center gap-x-4 font-display uppercase leading-[0.95] tracking-tight sm:gap-x-6"
              style={{ fontSize: 'clamp(1.8rem, 8.5vw, 5rem)' }}
            >
              {WORDS.map((w, wi) => (
                <span key={wi} className="inline-flex whitespace-nowrap">
                  {w.split('').map((ch, i) => {
                    const idx = wi * 8 + i
                    const isRed = i === 0
                    return (
                      <motion.span
                        key={i}
                        className={isRed ? 'text-blood' : 'text-chrome'}
                        initial={{ opacity: 0, y: 26, filter: 'blur(6px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ delay: 0.35 + idx * 0.045, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        style={{ display: 'inline-block' }}
                      >
                        {ch}
                      </motion.span>
                    )
                  })}
                </span>
              ))}
            </h1>

            {/* Accent line */}
            <motion.div
              className="mt-6 h-px bg-gradient-to-r from-transparent via-blood to-transparent sm:mt-7"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 180, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8, ease: 'easeOut' }}
            />

            {/* Loading dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="mt-5 flex items-center gap-2"
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-blood"
                  animate={{ opacity: [0.25, 1, 0.25], scale: [0.8, 1.25, 0.8] }}
                  transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }}
                />
              ))}
            </motion.div>
          </div>

          {/* Bottom cinematic progress bar */}
          <div className="absolute bottom-0 left-0 right-0">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="flex items-center justify-between px-5 pb-3 sm:px-10"
            >
              <span className="font-heading text-[9px] uppercase text-chrome-dark sm:text-[10px]" style={{ letterSpacing: '0.3em' }}>
                Loading
              </span>
              <span
                className="font-heading text-[11px] font-semibold text-chrome sm:text-sm"
                style={{ fontVariantNumeric: 'tabular-nums', letterSpacing: '0.1em' }}
              >
                {String(pct).padStart(3, '0')}
                <span className="ml-0.5 text-blood">%</span>
              </span>
            </motion.div>
            <div className="h-[2px] w-full bg-white/10">
              <div
                className="h-full"
                style={{
                  width: `${pct}%`,
                  background: 'linear-gradient(90deg, #e11123, #ff7a18)',
                  transition: 'width 120ms linear',
                  boxShadow: '0 0 12px rgba(225,17,35,0.6)',
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
