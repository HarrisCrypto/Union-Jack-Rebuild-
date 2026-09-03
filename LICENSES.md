# Media licences — Union Jack rebuild

| Asset | Source | Licence / notes |
|---|---|---|
| `media/drive-cinematic.mp4` | Higgsfield Cinema Studio Video 3.0 (`cinematic_studio_3_0`), job `6fe850bb-ac6f-4c1a-8e9c-e7cc59e569cf`, 2026-09-03. Start frame: occupied Healey still (`nano_banana_pro` job `c0a5b3e9-4eed-4024-89b8-de8214c2cef9`, from previous empty-cockpit poster). Encoded 1440×812, GOP 48, silent, ~5.3MB. Driver seen from behind — not a likeness of John or Marcello Locascio. | Generated for this redesign. Prototype only — confirm commercial licence with Higgsfield before production launch. |
| `media/drive-poster.jpg` | First frame of the occupied Cinema Studio clip | **LCP / reduced-motion / no-video fallback.** Driver visible. |
| `media/hero-chase.jpg`, `hero-bonnet.jpg`, `hero-side.jpg` | Earlier still set | Unused by the live hero |
| Workshop stills | Client Wix CDN (`static.wixstatic.com/media/0d4294_*`) | Client-owned. Do not invent owner / year / colour / duration stories for specific cars |
| `media/shop/healey-arrive.jpg` | Re-hosted from the live Union Jack Wix gallery (`0d4294_19c654a9…`) — Healey on a rollback | Client-owned shop photograph. Arrival / how they come in. Not claimed as the same car as the finished 3000 |
| `media/shop/healey-finished.jpg` | Re-hosted from the live Union Jack homepage gallery (`0d4294_47c9e453…`) — finished Austin-Healey 3000, UK plate NWJ 14D | Client-owned shop photograph. Finished work they already publish |
| `media/shop/jaguar-finished.jpg` | Re-hosted from Union Jack Wix (`0d4294_a0f10c7c…`) at native 4:3 — finished Jaguar saloon at the San Martin shop | Client-owned. Full vehicle, no Facebook UI |
| `media/shop/mgb-finished.jpg` | Re-hosted from Union Jack Wix (`0d4294_1a87ccca…`) at native 4:3 — finished MGB roadster | Client-owned. Full vehicle, no Facebook UI |
| `media/shop/triumph-tr3.jpg` | Re-hosted from Union Jack Wix (`0d4294_993ba683…`) at native 4:3 — Triumph TR3 | Client-owned |
| `media/shop/morris-minor.jpg` | Re-hosted from Union Jack Wix (`0d4294_d80e6208…`) at native 4:3 — Morris Minor | Client-owned |
| `logo.png` | Recovered raster from existing signage | Obtain vector before print |
| Fonts EB Garamond / IBM Plex Sans | Google Fonts | OFL |
| GSAP / Lenis | npm, bundled in `assets/app.js` | MIT / GreenSock standard — verify GSAP production licence |

## Why there is no real-time GLTF / HDRI hero

A licensed interior-ready E-Type / Healey / MGA GLTF + Poly Haven HDRI + CSM + GTAO + motion blur + bokeh cannot honestly hit 60fps on an M1 Air, 30fps on a phone, LCP &lt; 2.5s, and &lt; 8MB of hero assets in this repo. The brief’s alternative is what ships: a pre-rendered photoreal loop, scroll-scrubbed. No Lambert-sphere lane. No mouse-look.
