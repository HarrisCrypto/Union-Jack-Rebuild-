/* Apple-style cinematic hero: poster first, then scroll-scrubs a
   pre-rendered photoreal drive. No mouse-look. No WebGL. */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function initHero() {
  const pin = document.querySelector('.hero-pin')
  const film = document.getElementById('heroFilm')
  const fallback = document.querySelector('.hero-fallback')
  const copy = document.querySelector('.hero-copy')
  if (!pin) return

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) {
    document.documentElement.classList.add('reduced-motion')
    pin.classList.add('is-still')
    if (film) film.removeAttribute('autoplay')
    return
  }

  if (!film) return

  gsap.registerPlugin(ScrollTrigger)

  const reveal = () => {
    film.classList.add('is-ready')
    if (fallback) fallback.classList.add('is-hidden')
    document.documentElement.classList.add('film-live')
  }

  const bindScrub = () => {
    if (!Number.isFinite(film.duration) || film.duration < 0.2) return
    film.pause()
    film.currentTime = 0.01
    reveal()

    gsap.to(film, {
      currentTime: film.duration - 0.04,
      ease: 'none',
      scrollTrigger: {
        trigger: pin,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        invalidateOnRefresh: true,
      },
    })

    if (copy) {
      gsap.to(copy, {
        opacity: 0,
        y: 24,
        ease: 'none',
        scrollTrigger: {
          trigger: pin,
          start: 'top top',
          end: 'center top',
          scrub: 1,
        },
      })
    }
  }

  const start = () => {
    film.pause()
    if (film.readyState >= 1) bindScrub()
  }

  if (film.readyState >= 1) start()
  else {
    film.addEventListener('loadedmetadata', start, { once: true })
    film.addEventListener('loadeddata', start, { once: true })
  }

  film.addEventListener('error', () => {
    film.classList.remove('is-ready')
    if (fallback) fallback.classList.remove('is-hidden')
  })
}
