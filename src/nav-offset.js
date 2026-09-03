/* Sticky-nav clearance for hash jumps and scrollIntoView.
   CSS scroll-padding and scroll-margin stack; Lenis ignores both.
   Measure the bar and apply one offset everywhere. */

const EXTRA = 24 /* at least 16px below the measured bar */
let anchorsStarted = false

export function syncNavOffset() {
  const bar = document.querySelector('#nav .nav-inner') || document.getElementById('nav')
  const height = bar ? bar.getBoundingClientRect().height : 67
  const px = Math.ceil(height) + EXTRA
  document.documentElement.style.setProperty('--nav-offset', `${px}px`)
  return px
}

export function navClearance() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--nav-offset').trim()
  const n = parseFloat(raw)
  if (!Number.isFinite(n) || n <= 0) return 91
  if (raw.endsWith('rem')) {
    const fs = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
    return n * fs
  }
  return n
}

function usesAnchorPad(el) {
  return !!(el && el.matches && el.matches('h2, .lede, .steps h3'))
}

function lenisOffset(el) {
  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0
  const pad = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0
  const fakePad = usesAnchorPad(el) ? navClearance() : 0
  const desiredRectTop = fakePad ? 0 : navClearance()
  return margin + pad - desiredRectTop
}

export function scrollToClearNav(el, { immediate = true, duration = 0.9 } = {}) {
  if (!el) return
  const lenis = window.__ujLenis
  if (lenis) {
    lenis.scrollTo(el, {
      offset: lenisOffset(el),
      immediate,
      duration: immediate ? 0 : duration,
    })
    return
  }
  const offset = usesAnchorPad(el) ? 0 : -navClearance()
  const y = el.getBoundingClientRect().top + (window.scrollY || 0) + offset
  window.scrollTo({ top: Math.max(0, y), behavior: immediate ? 'auto' : 'smooth' })
}

export function installAnchorScrolling() {
  if (anchorsStarted) return
  anchorsStarted = true
  syncNavOffset()
  window.addEventListener('resize', syncNavOffset, { passive: true })

  if (!Element.prototype.__ujScrollIntoView) {
    const orig = Element.prototype.scrollIntoView
    Element.prototype.__ujScrollIntoView = orig
    Element.prototype.scrollIntoView = function scrollIntoViewPatched(arg) {
      if (this.nodeType !== 1) return orig.call(this, arg)
      const immediate = !(arg && typeof arg === 'object' && arg.behavior === 'smooth')
      scrollToClearNav(this, { immediate })
    }
  }

  const targetForHash = (hash) => {
    if (!hash || hash === '#') return null
    try {
      return document.querySelector(hash)
    } catch {
      return null
    }
  }

  const goHash = (immediate) => {
    const el = targetForHash(window.location.hash)
    if (el) scrollToClearNav(el, { immediate })
  }

  requestAnimationFrame(() => goHash(true))
  setTimeout(() => goHash(true), 80)
  window.addEventListener('hashchange', () => goHash(true))

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]')
    if (!link) return
    const hash = link.getAttribute('href')
    const el = targetForHash(hash)
    if (!el) return
    event.preventDefault()
    history.pushState(null, '', hash)
    const phone = window.matchMedia('(max-width: 760px)').matches
    scrollToClearNav(el, { immediate: phone })
  })
}
