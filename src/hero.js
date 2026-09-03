/**
 * Homepage launch film.
 *
 * Muted autoplay + loop on every viewport. Poster stays on top until a
 * real frame paints. We never hide the poster on loadedmetadata (iOS
 * paints a black rectangle for a paused video).
 *
 * Scroll-scrub is gone: currentTime no longer follows Lenis/GSAP.
 * If play() is blocked, the first tap or click retries — not scroll.
 * prefers-reduced-motion: strip the <video>, static poster only.
 */
export function initHero() {
  const video = document.getElementById('heroFilm')
  const poster = document.querySelector('.hero-fallback')
  const pin = document.querySelector('.hero-pin')
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

  /* Same land-and-play path on desktop and phone. Pin collapses to
     one screen so the old 240vh scrub track is not left behind. */
  pin.classList.add('is-phone-loop')
  video.loop = true
  video.autoplay = true
  video.setAttribute('loop', '')
  video.setAttribute('autoplay', '')

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
}
