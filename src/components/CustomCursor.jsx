import { useEffect, useRef, useState } from 'react'

// A dual-ring cursor with a red core. Grows over interactive elements.
export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setHidden(true)
      return
    }

    const dot = dotRef.current
    const ring = ringRef.current
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX = mouseX
    let ringY = mouseY
    let rafId

    const move = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`
    }

    const render = () => {
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`
      rafId = requestAnimationFrame(render)
    }

    const over = (e) => {
      if (e.target.closest('a, button, [data-cursor="hover"], input, textarea')) {
        ring.classList.add('cursor-grow')
      }
    }
    const out = (e) => {
      if (e.target.closest('a, button, [data-cursor="hover"], input, textarea')) {
        ring.classList.remove('cursor-grow')
      }
    }
    const leave = () => (dot.style.opacity = ring.style.opacity = '0')
    const enter = () => (dot.style.opacity = ring.style.opacity = '1')

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    window.addEventListener('mouseout', out)
    document.addEventListener('mouseleave', leave)
    document.addEventListener('mouseenter', enter)
    rafId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      window.removeEventListener('mouseout', out)
      document.removeEventListener('mouseleave', leave)
      document.removeEventListener('mouseenter', enter)
      cancelAnimationFrame(rafId)
    }
  }, [])

  if (hidden) return null

  return (
    <>
      <style>{`
        .cursor-dot, .cursor-ring {
          position: fixed; top: 0; left: 0; z-index: 9999;
          pointer-events: none; border-radius: 9999px;
          margin-left: -4px; margin-top: -4px;
          mix-blend-mode: difference;
        }
        .cursor-dot { width: 8px; height: 8px; background: #ff3b48; }
        .cursor-ring {
          width: 40px; height: 40px; margin-left: -20px; margin-top: -20px;
          border: 1px solid rgba(255,255,255,0.6);
          transition: width .3s ease, height .3s ease, margin .3s ease, background .3s ease;
        }
        .cursor-ring.cursor-grow {
          width: 68px; height: 68px; margin-left: -34px; margin-top: -34px;
          background: rgba(225,17,35,0.12); border-color: rgba(255,59,72,0.8);
        }
      `}</style>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
