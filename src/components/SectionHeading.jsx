import { motion } from 'framer-motion'
import { stagger, maskUp } from '../lib/motion'

// Big display heading with per-word mask reveal + eyebrow label.
export default function SectionHeading({
  eyebrow,
  title,
  align = 'left',
  className = '',
  accentWord,
}) {
  const words = title.split(' ')
  return (
    <div
      className={`flex flex-col ${align === 'center' ? 'items-center text-center' : 'items-start'} ${className}`}
    >
      {eyebrow && (
        <motion.span
          className="eyebrow mb-5"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block h-px w-8 bg-blood" />
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        className="font-display text-4xl leading-[0.95] uppercase tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
      >
        {words.map((word, i) => (
          <span key={i} className="mr-[0.25em] inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span
              variants={maskUp}
              className={`inline-block ${
                accentWord && word.toLowerCase().includes(accentWord.toLowerCase())
                  ? 'text-blood'
                  : 'text-chrome'
              }`}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.h2>
    </div>
  )
}
