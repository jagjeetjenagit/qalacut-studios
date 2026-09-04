import { Link } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'

export default function NotFound() {
  return (
    <PageWrapper>
      <section className="relative flex min-h-[80svh] flex-col items-center justify-center overflow-hidden text-center">
        <div className="absolute left-1/2 top-1/2 h-[50vh] w-[50vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blood/15 blur-[120px]" />
        <span className="eyebrow mb-6 relative">
          Lost the reel
        </span>
        <h1 className="relative font-display text-[28vw] leading-none text-chrome md:text-[18vw]">
          4<span className="text-blood">0</span>4
        </h1>
        <p className="relative mt-4 max-w-sm text-chrome-dark">
          This cut didn't make the final edit. Let's get you back to the good stuff.
        </p>
        <Link to="/" className="btn-primary relative mt-10">
          Back to Home <span aria-hidden>→</span>
        </Link>
      </section>
    </PageWrapper>
  )
}
