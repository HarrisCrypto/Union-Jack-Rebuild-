/* Shared chrome: nav drawer, solid nav on scroll, homepage call bar */
export function initNav() {
  const nav = document.getElementById('nav')
  const toggle = document.getElementById('navToggle')
  const drawer = document.getElementById('navDrawer')

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
      toggle.setAttribute('aria-expanded', open ? 'false' : 'true')
      if (open) drawer.setAttribute('hidden', '')
      else drawer.removeAttribute('hidden')
    })
  }

  initStickyCall()
}

function initStickyCall() {
  const sticky = document.querySelector('.sticky-call')
  if (!sticky) return

  const root = document.documentElement
  const pin = document.querySelector('.hero-pin')

  const dock = (on) => {
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

  const io = new IntersectionObserver(
    ([entry]) => dock(!entry.isIntersecting),
    { threshold: 0.08 }
  )
  io.observe(pin)
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNav)
} else {
  initNav()
}
