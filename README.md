# Union Jack British Auto Restoration — site

Static site for Union Jack (San Martin, CA). No build step. Serve the repo root.

```bash
python3 -m http.server 8000
```

GitHub Pages publishes from `main` at the branch root:
https://harriscrypto.github.io/Union-Jack-Rebuild-/

## Hero

One Three.js scene in `drive.js` (CDN ESM). English country lane at dawn: hedgerows, fence posts, trees, hills, dark bonnet silhouette. Mouse look, scroll speeds the drive, camera faces down the road and stays on the tarmac.

- No WebGL → painted dawn gradient + static poster, type still readable
- `prefers-reduced-motion: reduce` → one still frame, then stop
- `media/drive-hero.mp4` is **not** the hero (Ken-Burns stills). Poster is fallback only.

## Design system

Badge tokens: `--ink #12203F`, `--brass #B8912E`, `--paper #EDE9DF`, `--green #12352A`, EB Garamond / IBM Plex Sans. Marques as chassis build plates. Sentence case. Concours d'Elegance.

## Content / SEO / AEO

- Facts only: John & Marcello Locascio, 1988, 13555 Depot Ave, San Martin CA 95046, (408) 686-1101, Mon–Fri 9–5, Sat by appointment
- `info@unionjack.com` is proposed — flagged in the footer, not silently swapped to sbcglobal
- Unique titles, canonicals, one h1, `tel:` links, schema on index + marque pages, FAQ HTML ↔ JSON-LD

## Before production

- Host photos on own domain (still Wix CDN hotlinks)
- Confirm `info@unionjack.com`
- Drop `.html` via host config
- Vector logo; live Google review feed; true same-car before/after from the shop
