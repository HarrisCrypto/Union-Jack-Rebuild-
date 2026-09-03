/* Lenis + GSAP ScrollTrigger. Everything off under prefers-reduced-motion. */
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function initMotion() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) {
    document.documentElement.classList.add('reduced-motion')
    return
  }

  gsap.registerPlugin(ScrollTrigger)

  const lenis = new Lenis({
    duration: 1.05,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)

  gsap.utils
    .toArray(
      '.section-head, .lede, .factsheet, .steps li, .case-copy, .marque-grid a, .pull, .faq-list details, .contact-grid > *'
    )
    .forEach((el, i) => {
      gsap.from(el, {
        y: 22,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: (i % 5) * 0.07,
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      })
    })

}
