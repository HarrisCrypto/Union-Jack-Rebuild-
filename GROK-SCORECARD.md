# Grok prompt scorecard — Union Jack

## Hero
| Item | Status |
|---|---|
| One Three.js scene in `drive.js` | Done — CDN ESM r160, loaded from `index.html` |
| English country lane at dawn | Done — narrow lane, no centre line, hedges, posts, trees, hills, fog = horizon |
| Dark bonnet silhouette | Done — `.bonnet` overlay |
| Mouse look / scroll speed | Done — mouse only (touch does not yaw; avoids iPhone shake) |
| Camera faces down the road, on the tarmac | Done — `lookAt` a point ahead on the lane |
| ~60fps; cut instance counts first | Done — `HEDGE_N` / `TREE_N` / `POST_N` drop on narrow viewports; pixel ratio only after 50 slow frames |
| `prefers-reduced-motion` | One still frame, then stop |
| No WebGL | Painted dawn gradient + static poster; type readable |
| Not the Ken-Burns mp4 | `drive-hero.mp4` is not the hero; grain overlay removed |

## Site
| Item | Status |
|---|---|
| Static, no required build | Done — `python3 -m http.server` |
| Badge palette, plates not cards, sentence case | Done |
| Concours spelling / NAP / proposed email flagged | Done |
| Unique titles, canonicals, one h1, FAQ ↔ JSON-LD | Done |
