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

  const tryPlay = () => {
    if (playedOk && !video.paused) return
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

    /* iOS often never fires canplay until a gesture, so waiting on that
       one event left the film still. The first touch of a scroll then
       succeeded — it looked like scroll started playback. Kick now, and
       retry on media/visibility/gesture. Never bind scrub or listen to scroll. */
    const kick = () => {
      if (playedOk && !video.paused) return
      tryPlay()
    }
    const onVisible = () => {
      if (document.visibilityState === 'visible') kick()
    }
    video.addEventListener('loadeddata', kick)
    video.addEventListener('canplay', kick)
    document.addEventListener('visibilitychange', onVisible)
    window.addEventListener('pageshow', kick)
    document.addEventListener('touchstart', kick, { passive: true })
    document.addEventListener('click', kick)
    kick()
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
