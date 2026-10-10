---
name: ad-intelligence
description: >-
  Comprehensive pattern database for every kind of ad — viral trend formats,
  share-engineered content, and high-production / cinematic films — plus
  performance DR across niches. Use when writing ads, scripts, shot lists,
  UGC, TikTok/Meta/YouTube creatives, launch films, influencer briefs, or
  when prior LLM ad output feels generic or off-trend.
---

# Ad Intelligence (universal)

You have a **cross-vertical pattern library** optimized for:

1. **Viral / trend-reactive** formats (POV, stitch, challenges, memes, serials)
2. **Share-engineered** utility and spectacle (saves, skits, VFX, checklists)
3. **High-production / premium cinema** (hero films, editorial, macro, CGI, sports cine)
4. **Performance DR** (offers, proof, PAS, app demos, lead magnets)

This is **not** a single-brand pack. Pick patterns by platform, niche, production tier, and virality posture.

## When to use

- Any request to create or improve ads, creatives, hooks, scripts, or briefs
- User wants “viral,” “trending,” “high production,” “cinematic,” “UGC,” or “performance”
- Prior model output looks like a brochure, not a feed-native or film-native ad

## Hard rules

1. **Never invent testimonials, metrics, awards, or celebrity endorsements.**
2. **Never reproduce scraped competitor ads verbatim** (copy, frames, audio).
3. **One job per ad.** Variants go in an A/B matrix.
4. Assume **muted autoplay** unless told otherwise.
5. Match **landing / store / bio promise** to the hook.
6. For trends: borrow **format**, invent **payload**; clear rights for paid audio/footage.
7. Read `database/anti-patterns.json` and `database/trends/viral-operating-system.json` before finalizing viral or cinema work.

## Workflow

### 1. Brief intake

Capture (infer if obvious):

| Field | Examples |
| --- | --- |
| Platforms | tiktok, meta, youtube, shorts, CTV, linkedin, spark/influencer |
| Goal | views/follows, saves, leads, purchases, brand memory |
| Niche | beauty, saas, gaming, food, etc. |
| Production tier | native_ugc · hybrid_polished · high_production · premium_cinema |
| Virality posture | evergreen_dr · trend_reactive · share_engineered · brand_film |
| Proof on hand | real reviews, footage, creators, macros, CGI budget |
| Length + CTA | |

### 2. Retrieve

```bash
node scripts/retrieve.mjs --niche <niche> --platform <platform> --tag viral --limit 5
node scripts/retrieve.mjs --production premium_cinema --virality brand_film
node scripts/retrieve.mjs --job "pov challenge skit" --platform tiktok
node scripts/retrieve.mjs --list
node scripts/retrieve.mjs --list-niches
```

If you cannot run the script: open `database/index.json`, pick 3–5 patterns, plus niche file + viral OS + hooks/flows.

### 3. Select stack

Default stack for strong output:

- **1 primary pattern** (matches tier + posture)
- **1 challenger** (different posture — e.g. cinema + UGC twin, or trend + DR twin)
- **1 hook family** from `database/hooks/library.json`
- **1 flow** from `database/flows/library.json`

Say the pattern ids and why (one sentence each).

### 4. Generate to `output_contract`

Typical order:

1. Pattern ids + postures
2. Trend class used (if any) from viral OS
3. Hook options (3–5)
4. Timed script / beat sheet
5. Shot list + visual system + audio notes
6. Caption track (muted-first)
7. Primary text / headline / description
8. CTA variants + A/B matrix
9. Production notes (tier, rights, creator brief if influencer)
10. Landing / store mirror notes

Use `[PLACEHOLDER]` for missing proof — never fabricate.

### 5. Dual-track recommendation (when relevant)

If the user wants growth **and** brand:

- Ship a **trend_reactive or share_engineered** cut for distribution
- Ship a **high_production / premium_cinema** cut for memory and whitelisting
- Keep the same job-to-be-done across both

### 6. Self-critique

Reject logo-first opens, feature laundry, fake UGC, multi-CTA, invented proof, forced trends, tragedy jacking, uncleared audio, pretty films with no job, empty engagement bait, cliffhangers without a Part 2 plan.

## Database map

| Path | Purpose |
| --- | --- |
| `database/index.json` | Master index (~40+ patterns) |
| `database/patterns/*.json` | Full blueprints |
| `database/trends/viral-operating-system.json` | Trend classes + virality checklist |
| `database/hooks/library.json` | Hook templates |
| `database/flows/library.json` | Beat sheets |
| `database/niches/*.json` | Vertical angle packs |
| `database/anti-patterns.json` | Do-not-generate list |
| `scripts/retrieve.mjs` | CLI retrieval |

## Extending

Private live-ad breakdowns: `../../ingest/README.md`. Keep scraped media out of public skill packages.
