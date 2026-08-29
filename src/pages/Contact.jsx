import { useState } from 'react'
import { motion } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'

const departments = [
  { label: 'New Projects', email: 'projects@qalacut.studio' },
  { label: 'Careers & Reels', email: 'talent@qalacut.studio' },
  { label: 'General', email: 'hello@qalacut.studio' },
]

const services = ['Editorial', 'Color Grading', 'Sound Design', 'VFX & CGI', 'Motion Graphics', 'DI & Finishing']

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' })
  const [sent, setSent] = useState(false)

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    // Placeholder submit - wire to a backend / form service (Formspree, Resend) later.
    setSent(true)
  }

  return (
    <PageWrapper>
      <PageHero
        eyebrow="Contact"
        title="Let's cut something great."
        accentWord="great."
        subtitle="Tell us about your project. Send a link to your footage, a brief, or just a bold idea - we'll take it from there."
      />

      <section className="container-x grid grid-cols-1 gap-16 pb-28 lg:grid-cols-12">
        {/* Left: info */}
        <div className="space-y-12 lg:col-span-4">
          <Reveal>
            <div>
              <h3 className="mb-5 font-heading text-xs uppercase tracking-ultra text-chrome-dark">
                Studio
              </h3>
              <p className="text-lg leading-relaxed text-chrome-dim">
                QalaCut Studios
                <br />
                Post-Production House
                <br />
                Mumbai · Remote worldwide
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-5">
              {departments.map((d) => (
                <div key={d.label}>
                  <span className="font-heading text-xs uppercase tracking-ultra text-chrome-dark">
                    {d.label}
                  </span>
                  <a
                    href={`mailto:${d.email}`}
                    className="mt-1 block text-lg text-chrome transition-colors hover:text-blood"
                  >
                    {d.email}
                  </a>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex gap-4">
              {['Instagram', 'Vimeo', 'YouTube', 'LinkedIn'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="rounded-full border border-white/10 px-4 py-2 font-heading text-xs uppercase tracking-wider text-chrome-dim transition-all hover:border-blood/60 hover:text-white"
                >
                  {s}
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right: form */}
        <div className="lg:col-span-7 lg:col-start-6">
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card-edge flex min-h-[400px] flex-col items-center justify-center gap-4 p-12 text-center"
            >
              <span className="font-display text-6xl text-blood">✓</span>
              <h3 className="font-display text-4xl uppercase tracking-tight text-chrome">
                Message sent
              </h3>
              <p className="max-w-md text-chrome-dark">
                Thanks, {form.name || 'friend'}. We'll be in touch within one
                business day. Meanwhile, keep the footage rolling.
              </p>
            </motion.div>
          ) : (
            <Reveal>
              <form onSubmit={submit} className="space-y-8">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <Field label="Your name" value={form.name} onChange={update('name')} required />
                  <Field
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={update('email')}
                    required
                  />
                </div>

                <div>
                  <label className="mb-4 block font-heading text-xs uppercase tracking-ultra text-chrome-dark">
                    Service needed
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {services.map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setForm((f) => ({ ...f, service: s }))}
                        className={`rounded-full border px-4 py-2 font-heading text-xs uppercase tracking-wider transition-all ${
                          form.service === s
                            ? 'border-blood bg-blood text-white'
                            : 'border-white/10 text-chrome-dark hover:border-white/30 hover:text-white'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="group relative">
                  <label className="mb-2 block font-heading text-xs uppercase tracking-ultra text-chrome-dark">
                    Tell us about the project
                  </label>
                  <textarea
                    value={form.message}
                    onChange={update('message')}
                    rows={5}
                    required
                    className="w-full resize-none border-b border-white/15 bg-transparent py-3 text-lg text-chrome outline-none transition-colors placeholder:text-chrome-dark/50 focus:border-blood"
                    placeholder="Runtime, deadline, deliverables, links..."
                  />
                </div>

                <button type="submit" className="btn-primary w-full sm:w-auto">
                  Send Message <span aria-hidden>→</span>
                </button>
              </form>
            </Reveal>
          )}
        </div>
      </section>
    </PageWrapper>
  )
}

function Field({ label, value, onChange, type = 'text', required }) {
  return (
    <div>
      <label className="mb-2 block font-heading text-xs uppercase tracking-ultra text-chrome-dark">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border-b border-white/15 bg-transparent py-3 text-lg text-chrome outline-none transition-colors focus:border-blood"
      />
    </div>
  )
}
