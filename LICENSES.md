# Media licences — Union Jack rebuild

| Asset | Source | Licence / notes |
|---|---|---|
| `media/drive-cinematic.mp4` | Higgsfield Cinema Studio Video 3.0 (`cinematic_studio_3_0`), job `6fe850bb-ac6f-4c1a-8e9c-e7cc59e569cf`, 2026-09-03. Start frame: occupied Healey still (`nano_banana_pro` job `c0a5b3e9-4eed-4024-89b8-de8214c2cef9`, from previous empty-cockpit poster). Encoded 1440×812, GOP 48, silent, ~5.3MB. Driver seen from behind — not a likeness of John or Marcello Locascio. | Generated for this redesign. Prototype only — confirm commercial licence with Higgsfield before production launch. |
| `media/drive-poster.jpg` | First frame of the occupied Cinema Studio clip | **LCP / reduced-motion / no-video fallback.** Driver visible. |
| `media/hero-chase.jpg`, `hero-bonnet.jpg`, `hero-side.jpg` | Earlier still set | Unused by the live hero |
| Workshop stills | Client Wix CDN (`static.wixstatic.com/media/0d4294_*`) | Client-owned. Do not invent owner / year / colour / duration stories for specific cars |
| `media/shop/healey-before.jpg`, `healey-after.jpg` | Re-hosted from Wix (`0d4294_200d81e…`, `0d4294_99bd54f…`), warmed toward the hero grade | Client-owned shop photographs. Two stages — not a claimed concours finish |
| `logo.png` | Recovered raster from existing signage | Obtain vector before print |
| Fonts EB Garamond / IBM Plex Sans | Google Fonts | OFL |
| GSAP / Lenis | npm, bundled in `assets/app.js` | MIT / GreenSock standard — verify GSAP production licence |

## Why there is no real-time GLTF / HDRI hero

A licensed interior-ready E-Type / Healey / MGA GLTF + Poly Haven HDRI + CSM + GTAO + motion blur + bokeh cannot honestly hit 60fps on an M1 Air, 30fps on a phone, LCP &lt; 2.5s, and &lt; 8MB of hero assets in this repo. The brief’s alternative is what ships: a pre-rendered photoreal loop, scroll-scrubbed. No Lambert-sphere lane. No mouse-look.
