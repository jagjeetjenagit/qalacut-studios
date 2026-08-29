import { motion } from 'framer-motion'
import { stagger, maskUp } from '../lib/motion'

// Reusable interior-page hero with masked title reveal.
export default function PageHero({ eyebrow, title, subtitle, accentWord }) {
  const words = title.split(' ')
  return (
    <section className="relative overflow-hidden pb-16 pt-40 md:pb-24 md:pt-52">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,#17171c_0%,#0a0a0b_55%)]" />
      <div className="absolute left-1/2 top-0 h-[40vh] w-[60vh] -translate-x-1/2 rounded-full bg-blood/10 blur-[130px]" />
      <div className="container-x relative">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="eyebrow mb-6"
        >
          <span className="inline-block h-px w-10 bg-blood" />
          {eyebrow}
        </motion.span>

        <motion.h1
          variants={stagger(0.08, 0.1)}
          initial="hidden"
          animate="show"
          className="font-display text-6xl uppercase leading-[0.9] tracking-tight sm:text-7xl md:text-8xl lg:text-[7.5rem]"
        >
          {words.map((word, i) => (
            <span key={i} className="mr-[0.25em] inline-block overflow-hidden pb-[0.05em] align-bottom">
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
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-chrome-dim"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  )
}
