/* Lenis + GSAP ScrollTrigger for the desktop hero scrub.
   No fade-in-on-scroll: those tweens were leaving type at partial opacity. */
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const NAV_OFFSET = 120

export function initMotion() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) {
    document.documentElement.classList.add('reduced-motion')
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    return
  }

  if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

  gsap.registerPlugin(ScrollTrigger)

  const lenis = new Lenis({
    duration: 1.05,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
  window.__ujLenis = lenis

  const targetForHash = (hash) => {
    if (!hash || hash === '#') return null
    try {
      return document.querySelector(hash)
    } catch {
      return null
    }
  }

  const scrollToHash = (immediate = true) => {
    const el = targetForHash(window.location.hash)
    if (!el) return
    lenis.scrollTo(el, { offset: -NAV_OFFSET, immediate, duration: 0.9 })
  }

  requestAnimationFrame(() => scrollToHash(true))
  setTimeout(() => scrollToHash(true), 60)
  window.addEventListener('hashchange', () => scrollToHash(false))

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]')
    if (!link) return
    const hash = link.getAttribute('href')
    const el = targetForHash(hash)
    if (!el) return
    event.preventDefault()
    history.pushState(null, '', hash)
    lenis.scrollTo(el, { offset: -NAV_OFFSET, duration: 0.9 })
  })
}
