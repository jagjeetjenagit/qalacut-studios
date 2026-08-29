import { motion } from 'framer-motion'
import { easeExpo } from '../lib/motion'

// Wraps a page with an enter/exit transition + a sweeping red panel wipe.
export default function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: easeExpo }}
    >
      {/* wipe panel */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[70] origin-top bg-blood"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.7, ease: easeExpo }}
        style={{ transformOrigin: 'top' }}
      />
      {children}
    </motion.div>
  )
}
