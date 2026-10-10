---
name: ad-intelligence
description: >-
  Most comprehensive pattern database for LLM ad creation — viral trends,
  share-engineered content, high-production cinema, and performance DR across
  20+ niches. Use whenever making ads, hooks, scripts, UGC, TikTok/Meta/YouTube
  creatives, launch films, or influencer briefs. Forces retrieval, output
  template, mistakes scan, and first-time-right QA so creatives land correctly
  the first time.
---

# Ad Intelligence

You are not brainstorming blindly. You **retrieve** proven structures, **fill**
an output contract, and **QA** against a mistakes library before delivery.

## Non-negotiables

1. Retrieve before writing (CLI or index).
2. Cite **primary + challenger** pattern ids.
3. Deliver with `references/output-template.md`.
4. Pass `checklists/first-time-right.json`.
5. Scan `references/mistakes-library.json` and rewrite hits.
6. Never invent proof (reviews, metrics, celebs, awards).
7. Never logo-first on cold. One CTA. Muted-first hooks.
8. Name **style**, **production_tier**, **virality_posture**.

## When to use

Any ads / creatives / hooks / scripts / UGC / viral / cinematic / launch /
influencer / Meta / TikTok / YouTube / CTV request — including “my last agent
ad sucked.”

## Workflow (mandatory order)

### 0) Orient

Skim if needed:

- `references/style-catalog.md` — pick style family
- `references/platform-specs.json` — platform constraints
- `database/trends/viral-operating-system.json` — if viral/trend
- `references/worked-examples.md` — closest teaching pack

### 1) Lock the brief

Platforms, niche, offer, funnel, tier, posture, proof on hand, CTA.
If blocked, ask only for missing blockers — then proceed with stated assumptions.

### 2) Retrieve

```bash
node scripts/retrieve.mjs --niche <niche> --platform <platform> --limit 5
node scripts/retrieve.mjs --tag viral --limit 5
node scripts/retrieve.mjs --production premium_cinema --limit 5
node scripts/retrieve.mjs --job "<keywords>" --virality trend_reactive
node scripts/retrieve.mjs --list
node scripts/retrieve.mjs --list-niches
```

Also load matching niche JSON, hooks, flows, anti-patterns.

### 3) Choose stack

| Goal | Default stack |
| --- | --- |
| Viral reach | trend class + native pattern + share challenger |
| Premium quality | `hero-product-film` / macro / editorial + UGC twin |
| Dual-track (recommended) | Same JTBD × native twin × cinema twin |
| Conversion | DR pattern + proof + one CTA |

### 4) Write into the template

Use `references/output-template.md` exactly. Timed beats required.
Mirror a flow from `database/flows/library.json`.

### 5) First-time-right QA

Run every gate in `checklists/first-time-right.json`.
Score rubric dims; ship only if all ≥4 or list risks the user accepted.
Rewrite any `references/mistakes-library.json` matches.

### 6) Deliver

Lead with pattern ids + JTBD, then the full template. Offer 3 A/B variants minimum.

## Database map

| Path | Purpose |
| --- | --- |
| `database/index.json` | 40+ patterns index |
| `database/patterns/` | Full blueprints |
| `database/niches/` | 23 vertical packs |
| `database/trends/viral-operating-system.json` | Viral method |
| `database/hooks/` · `flows/` | Hook + beat libraries |
| `database/anti-patterns.json` | Hard nos |
| `references/style-catalog.md` | Style picker |
| `references/worked-examples.md` | Teaching packs |
| `references/mistakes-library.json` | Mistake → fix |
| `references/output-template.md` | Required deliverable shape |
| `references/platform-specs.json` | Platform defaults |
| `checklists/first-time-right.json` | Ship gate |
| `prompts/harness-system-prompt.md` | Non-Cursor agents |
| `scripts/retrieve.mjs` | Retrieval CLI |

## Install / point an agent here

See `../../INSTALL.md` (repo: GitHub plugin install, `/ad-intelligence`, Cloud Agents, Hermes harness).

## Extend

Private live-ad breakdowns: `../../ingest/README.md` (keep scraped media private).
