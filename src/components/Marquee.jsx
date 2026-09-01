// Infinite horizontal marquee of words separated by a red slash mark.
// `size="sm"` renders a compact strip (used for the home crafts row).
export default function Marquee({ items, className = '', size = 'lg' }) {
  const isSm = size === 'sm'
  const textSize = isSm
    ? 'text-lg md:text-2xl'
    : 'text-5xl md:text-7xl'
  const gap = isSm ? 'px-5' : 'px-8'
  const pad = isSm ? 'py-3' : 'py-6'

  const row = (
    <div className="marquee-track">
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className={`${gap} font-display ${textSize} uppercase tracking-tight text-white/90`}>
            {item}
          </span>
          <span className={`text-blood ${textSize}`} aria-hidden>
            /
          </span>
        </span>
      ))}
    </div>
  )
  return (
    <div className={`relative flex overflow-hidden ${pad} ${className}`}>
      {row}
      {row}
    </div>
  )
}
