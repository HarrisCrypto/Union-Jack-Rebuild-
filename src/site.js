/* Shared chrome: nav drawer, solid nav on scroll, homepage call bar */
import { installAnchorScrolling, syncNavOffset } from './nav-offset.js'

let started = false

export function initNav() {
  if (started) return
  started = true
  const nav = document.getElementById('nav')
  const toggle = document.getElementById('navToggle')
  const drawer = document.getElementById('navDrawer')
  installAnchorScrolling()

  function onScroll() {
    if (!nav) return
    if (nav.classList.contains('page-nav')) return
    nav.classList.toggle('is-solid', (window.scrollY || 0) > 40)
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  if (toggle && drawer) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true'
      const next = !open
      toggle.setAttribute('aria-expanded', next ? 'true' : 'false')
      if (next) {
        drawer.removeAttribute('hidden')
        nav?.classList.add('is-open')
      } else {
        drawer.setAttribute('hidden', '')
        nav?.classList.remove('is-open')
      }
      syncNavOffset()
    })
  }

  initStickyCall()
}

function initStickyCall() {
  const sticky = document.querySelector('.sticky-call')
  if (!sticky) return

  const root = document.documentElement
  const pin = document.querySelector('.hero-pin')
  let docked = root.classList.contains('call-docked')

  const dock = (on) => {
    if (on === docked) return
    docked = on
    sticky.classList.toggle('is-away', on)
    root.classList.toggle('call-docked', on)
  }

  if (!pin || !root.classList.contains('home')) {
    dock(true)
    return
  }

  if (!('IntersectionObserver' in window)) {
    dock(true)
    return
  }

  /* Hysteresis: show only when the pin is nearly gone; hide only when
     it is clearly back. A single 0.08 threshold + Lenis.resize() was
     flipping call-docked at the 100svh phone-hero edge. */
  const io = new IntersectionObserver(
    ([entry]) => {
      if (!entry) return
      const ratio = entry.intersectionRatio
      if (docked) {
        if (ratio > 0.16) dock(false)
      } else if (ratio < 0.03) {
        dock(true)
      }
    },
    { threshold: [0, 0.03, 0.08, 0.16, 1] }
  )
  io.observe(pin)
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNav)
} else {
  initNav()
}
