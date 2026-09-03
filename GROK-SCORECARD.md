# Scorecard — Union Jack

## Hero
| Item | Status |
|---|---|
| Photoreal, film-like, not a WebGL toy | **Pre-rendered cinematic** — real-time GLTF+HDRI+full post cannot hit the budget (see README) |
| Continuous drive, not Ken-Burns stills | Done — Cinema Studio clip, one locked chase shot, same BRG roadster |
| Scroll scrubs the film (`scrub: 1`) | **Desktop** — Lenis + GSAP on `video.currentTime`. **iPhone** — muted autoplay+loop (Safari will not paint paused/seeked frames) |
| No mouse-look | Done |
| Poster first, LCP | Poster stays on top until a decoded frame (`videoWidth` + `play()`). Never hide on `loadedmetadata` |
| Hero weight | Poster 0.14MB + film 5.5MB = **5.6MB** (under 8MB) |
| Reduced motion | Static poster; `<video>` stripped; no pin, no Lenis, no fades |
| No-video / iOS fallback | Poster visible; video opacity 0 until a frame; sticky call hidden over the hero |
| FPS plan | Film decode + CSS. Target 60fps desktop / 30fps phone because we are not running GTAO/CSM/DOF |

## Homepage (this cut)
| Item | Status |
|---|---|
| Vite bundle | `npm run build` → `assets/app.js` |
| One Healey case study + slider | Done — re-hosted shop stills, no five-card grid |
| Google reviews | One verified quote; no invented testimonials |
| Badge palette, plates, sentence case | Kept |
| Concours / NAP / live shop email | Kept — unionjack@sbcglobal.net |
| SEO in HTML | Title 54 chars, canonical, one h1, FAQ ↔ JSON-LD |
| Not in this run | Mini page, American classics, journal, new quote form |
