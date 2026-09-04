import { motion } from 'framer-motion'
import { stagger, maskUp } from '../lib/motion'

// Big display heading with per-word mask reveal + cinematic kicker.
// Optional `index` renders an oversized outlined numeral (editorial / big-budget feel).
export default function SectionHeading({
  eyebrow,
  title,
  align = 'left',
  className = '',
  accentWord,
  index,
}) {
  const centered = align === 'center'
  const words = title.split(' ')
  return (
    <div
      className={`flex flex-col ${centered ? 'items-center text-center' : 'items-start'} ${className}`}
    >
      {index && (
        <motion.span
          aria-hidden
          className="mb-1 font-display text-[3.5rem] leading-none tracking-tight text-transparent md:text-[4.5rem]"
          style={{ WebkitTextStroke: '1.2px rgba(225,17,35,0.4)' }}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {index}
        </motion.span>
      )}

      {eyebrow && (
        <motion.span
          className={`mb-5 ${centered ? 'eyebrow eyebrow-center' : 'eyebrow'}`}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {eyebrow}
        </motion.span>
      )}

      <motion.h2
        className="font-display text-4xl leading-[0.95] uppercase tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        style={{ filter: 'drop-shadow(0 6px 24px rgba(0,0,0,0.5))' }}
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

      <motion.span
        className="accent-rule mt-6 block"
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: centered ? 72 : 88, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  )
}
