// Infinite horizontal marquee of words separated by a red slash mark.
export default function Marquee({ items, className = '' }) {
  const row = (
    <div className="marquee-track">
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="px-8 font-display text-5xl uppercase tracking-tight text-white/90 md:text-7xl">
            {item}
          </span>
          <span className="text-blood text-5xl md:text-7xl" aria-hidden>
            /
          </span>
        </span>
      ))}
    </div>
  )
  return (
    <div className={`relative flex overflow-hidden py-6 ${className}`}>
      {row}
      {row}
    </div>
  )
}
