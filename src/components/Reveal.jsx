import { motion } from 'framer-motion'
import { fadeUp } from '../lib/motion'

// Scroll-triggered reveal. Pass `as` to change the element, `delay` to offset.
export default function Reveal({
  children,
  variants = fadeUp,
  delay = 0,
  className = '',
  once = true,
  amount = 0.25,
  ...rest
}) {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
