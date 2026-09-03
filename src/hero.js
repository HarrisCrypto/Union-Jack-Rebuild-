/**
 * Homepage launch film.
 *
 * iOS Safari will not paint frames of a paused <video> when you only seek
 * currentTime (Apple-style scroll-scrub). On iPhone that is a black rectangle
 * covering the poster. We never hide the poster on loadedmetadata.
 *
 * Path we ship:
 *   - iPhone / iPad / viewports ≤760px / coarse-pointer phones: muted
 *     autoplay + loop. Pin height collapses to 100vh (no fake scrub).
 *     A playing movie on the phone beats a perfect scrub that is black.
 *   - Desktop (fine pointer, wider than 760px): muted play → pause to unlock
 *     decode, then GSAP ScrollTrigger scrubs currentTime.
 *   - prefers-reduced-motion: strip the <video>, static poster only.
 */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function initHero() {
  const video = document.getElementById('heroFilm')
  const poster = document.querySelector('.hero-fallback')
  const pin = document.querySelector('.hero-pin')
  const copy = document.querySelector('.hero-copy')
  const sticky = document.querySelector('.sticky-call')
  if (!video || !pin) return

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) {
    pin.classList.add('is-still')
    video.querySelectorAll('source').forEach((node) => node.remove())
    video.removeAttribute('src')
    video.load()
    video.remove()
    poster?.classList.add('is-locked')
    return
  }

  video.muted = true
  video.defaultMuted = true
  video.playsInline = true
  video.setAttribute('playsinline', '')
  video.setAttribute('webkit-playsinline', 'true')
  video.setAttribute('muted', '')
  video.preload = 'auto'

  const iosLike =
    /iP(hone|ad|od)/i.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  const phoneLike =
    window.matchMedia('(pointer: coarse)').matches &&
    window.matchMedia('(max-width: 900px)').matches
  const narrow = window.matchMedia('(max-width: 760px)').matches
  const autoplayLoop = iosLike || phoneLike || narrow

  let playedOk = false
  let painted = false

  const revealFrame = () => {
    if (painted || !playedOk) return
    if (video.videoWidth < 2) return
    painted = true
    video.classList.add('is-ready')
    poster?.classList.add('is-behind')
  }

  const onPlayOk = () => {
    playedOk = true
    if (typeof video.requestVideoFrameCallback === 'function') {
      video.requestVideoFrameCallback(() => revealFrame())
    }
    revealFrame()
  }

  video.addEventListener('playing', revealFrame)
  video.addEventListener('timeupdate', revealFrame)
  video.addEventListener('seeked', revealFrame)
  video.addEventListener('error', () => {
    painted = false
    video.classList.remove('is-ready')
    poster?.classList.remove('is-behind')
  })

  if (sticky && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      ([entry]) => {
        sticky.classList.toggle('is-away', !entry.isIntersecting)
      },
      { threshold: 0.05 }
    )
    io.observe(pin)
  }

  const tryPlay = () => {
    const play = video.play()
    if (play && typeof play.then === 'function') {
      play.then(onPlayOk).catch(() => {})
    } else {
      onPlayOk()
    }
  }

  if (autoplayLoop) {
    pin.classList.add('is-phone-loop')
    video.loop = true
    video.autoplay = true
    video.setAttribute('loop', '')
    video.setAttribute('autoplay', '')
    if (video.readyState >= 2) tryPlay()
    else video.addEventListener('canplay', tryPlay, { once: true })
    document.addEventListener('touchstart', tryPlay, { once: true, passive: true })
    document.addEventListener('click', tryPlay, { once: true })
    return
  }

  gsap.registerPlugin(ScrollTrigger)

  const unlock = async () => {
    try {
      await video.play()
      onPlayOk()
      video.pause()
    } catch (_) {
      /* Poster stays until a later gesture paints a frame. */
    }
  }
  if (video.readyState >= 2) unlock()
  else video.addEventListener('loadeddata', unlock, { once: true })

  const bindScrub = () => {
    const duration = video.duration
    if (!Number.isFinite(duration) || duration < 0.2) return

    gsap.to(video, {
      currentTime: duration - 0.04,
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

  if (video.readyState >= 1) bindScrub()
  else {
    video.addEventListener('loadedmetadata', bindScrub, { once: true })
  }
}
