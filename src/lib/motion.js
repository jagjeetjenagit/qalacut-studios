// Shared Framer Motion variants for a consistent, cinematic reveal language.

export const easeExpo = [0.16, 1, 0.3, 1]

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: easeExpo },
  },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1, ease: easeExpo } },
}

export const stagger = (staggerChildren = 0.12, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
})

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: 1, ease: easeExpo } },
}

// Per-word / per-letter mask reveal
export const maskUp = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 0.9, ease: easeExpo } },
}
