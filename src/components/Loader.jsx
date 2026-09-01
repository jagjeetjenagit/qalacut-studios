import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { easeExpo } from '../lib/motion'

// First-load cinematic intro (trihari-style): a clean mask-revealed wordmark,
// a smooth counter, and a single seamless upward wipe. No slash / no cut.
export default function Loader({ onDone }) {
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const start = performance.now()
    const duration = 2200
    let raf
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration)
      // gentle ease-in-out so the number never snaps
      const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2
      setCount(Math.round(eased * 100))
      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setTimeout(() => setDone(true), 450)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const progress = count / 100

  return (
    <AnimatePresence onExitComplete={onDone}>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
          exit={{ y: '-100%' }}
          transition={{ duration: 1.05, ease: easeExpo }}
        >
          <div className="relative flex flex-col items-center">
            {/* mask-revealed wordmark - rises smoothly into place */}
            <span className="overflow-hidden pb-[0.12em]">
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1, ease: easeExpo }}
                className="inline-block font-display text-6xl uppercase tracking-tight text-chrome sm:text-8xl"
              >
                Qala<span className="text-blood">Cut</span>
              </motion.span>
            </span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-4 font-heading text-xs uppercase tracking-mega text-chrome-dark"
            >
              Studios
            </motion.span>

            {/* thin progress line that fills as it loads - the only motion cue */}
            <div className="mt-8 h-px w-52 overflow-hidden bg-white/10 sm:w-72">
              <motion.div
                className="h-full origin-left bg-blood"
                style={{ scaleX: progress }}
              />
            </div>
          </div>

          <div className="absolute bottom-10 left-0 right-0 flex items-end justify-between px-8 md:px-16">
            <span className="font-heading text-xs uppercase tracking-ultra text-chrome-dark">
              Post Production
            </span>
            <span className="font-display text-5xl text-white/90 tabular-nums md:text-7xl">
              {count}
              <span className="text-blood">%</span>
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
