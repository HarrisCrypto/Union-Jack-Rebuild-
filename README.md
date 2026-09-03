# Union Jack British Auto Restoration — site

Static marketing site for Union Jack (San Martin, CA). Vite bundles the homepage motion; GitHub Pages serves the repo root.

```bash
npm install
npm run build    # writes assets/app.js
npm run dev      # http://127.0.0.1:5173
# or, after a build:
python3 -m http.server 8000
```

Live: https://harriscrypto.github.io/Union-Jack-Rebuild-/

## Hero — why this is a film, not real-time 3D

Jason asked for a manufacturer-launch drive: licensed GLTF (E-Type / Healey / MGA), MeshPhysicalMaterial, HDRI + CSM, GTAO, motion blur, bokeh, bloom, under 8MB, 60fps on an M1 Air, 30fps on mid-range Android, LCP &lt; 2.5s, and “must not read as 3D on a website” on iPhone.

That budget cannot be hit honestly in this repo:

- A redistributable, interior-ready British roadster GLTF with PBR textures is not sitting in the tree, and a photoreal car + HDRI + road + foliage will not stay under 8MB after Draco/KTX2 once the renderer and post stack are counted.
- The full post list (GTAO, velocity blur, bokeh, bloom, CA, grain, SMAA, god rays, CSM) will not hold 30fps in iPhone Safari. That is the device he looked at.
- Shipping a Lambert-sphere lane, or a half-post WebGL car, would look like a game demo. He already rejected that.

So the hero is the brief’s stated alternative: a **pre-rendered photoreal cinematic, scroll-scrubbed frame by frame** (Apple product-page pattern). Poster paints first. Scroll (Lenis + GSAP `scrub: 1`) drives `video.currentTime`. `prefers-reduced-motion` keeps the poster and turns every motion effect off. No mouse-look.

The old Ken-Burns / morph mp4 is **not** used.

**iPhone / Safari:** scroll-scrub of a paused video is a black void on iOS (Safari will not paint frames when you only set `currentTime`). The poster stays stacked on top of the `<video>` until a real frame exists (`videoWidth > 0` and a `timeupdate` / `seeked` / `playing` after a successful muted `play()`). On iPhone, iPad, coarse-pointer phones, and viewports ≤760px the film **autoplays muted and loops**. Desktop keeps Lenis + GSAP `scrub: 1`. `prefers-reduced-motion` removes the video entirely.

## Design system

`--ink #12203F`, `--brass #B8912E` / `--brass-l #E2C56F`, `--paper #EDE9DF`, `--green #12352A`. EB Garamond + IBM Plex Sans. Marques as chassis plates. Sentence case. Concours d'Elegance.

## Facts

John & Marcello Locascio · 1988 · 13555 Depot Ave, San Martin, CA 95046 · (408) 686-1101 · Mon–Fri 9–5, Sat by appointment. `info@unionjack.com` is proposed — flagged in the footer.
