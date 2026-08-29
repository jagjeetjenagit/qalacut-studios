import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { easeExpo } from '../lib/motion'

// First-load cinematic intro: counter + laser slash reveal of the wordmark.
export default function Loader({ onDone }) {
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const start = performance.now()
    const duration = 1900
    let raf
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration)
      // ease-out
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(eased * 100))
      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setTimeout(() => setDone(true), 350)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: easeExpo }}
        >
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <span className="font-display text-6xl uppercase tracking-tight text-chrome sm:text-8xl">
                Qala<span className="text-blood">Cut</span>
              </span>
              {/* laser slash */}
              <motion.span
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease: easeExpo }}
                className="absolute left-[-8%] top-1/2 h-[2px] w-[116%] origin-left -rotate-[8deg] bg-blood"
                style={{ boxShadow: '0 0 18px 2px rgba(225,17,35,0.9)' }}
              />
            </motion.div>
            <span className="mt-4 font-heading text-xs uppercase tracking-mega text-chrome-dark">
              Studios
            </span>
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
