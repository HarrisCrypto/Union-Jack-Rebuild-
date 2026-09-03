/* Lenis + GSAP ScrollTrigger for the desktop hero scrub.
   No fade-in-on-scroll: those tweens were leaving type at partial opacity.
   In-page anchors live in nav-offset.js so Lenis does not stack on CSS. */
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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
    anchors: false,
  })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
  window.__ujLenis = lenis
}
