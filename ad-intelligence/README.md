# Ad Intelligence — universal LLM ad pattern skill

> **How to point your agent here:** see [`INSTALL.md`](./INSTALL.md)  
> Already on GitHub in this repo (`ad-intelligence/` + root marketplace). Use `/ad-intelligence` in Cursor, or Customize → From GitHub Repository → `HarrisCrypto/Union-Jack-Rebuild-`.


A **comprehensive, pattern-first** database of high-performing ad blueprints for AI agents — spanning **viral trend formats**, **share-engineered content**, and **high-production / cinematic** films, plus classic performance creative.

Built to be installed as a **Cursor Agent Skill / plugin** and reused in any harness (Cursor, Claude, Hermes, Grok, custom RAG).

## Who this is for

Agencies, DTC brands, app studios, entertainment marketers, local services, B2B, creators — **any vertical**. This package is intentionally **not** tied to a single client or industry.

## What’s inside (v2)

| Layer | Contents |
| --- | --- |
| Patterns | **47** blueprints across UGC, viral, DR, and premium cinema |
| Viral OS | Trend classes, weekly ops, virality checklist |
| Production tiers | `native_ugc` → `hybrid_polished` → `high_production` → `premium_cinema` |
| Virality postures | `evergreen_dr` · `trend_reactive` · `share_engineered` · `brand_film` |
| Niches | Beauty, fashion, fitness, food, ecommerce, SaaS, fintech, gaming, education, travel, real estate, health, pets, home, apps, B2B, creator, entertainment, luxury, automotive, nonprofit, local, kids/family |
| Retrieval | `scripts/retrieve.mjs` with tier / virality / tag filters |
| Packaging | Cursor `.cursor-plugin` manifests for GitHub / marketplace sale |

### Pattern coverage (highlights)

**Viral / native:** POV day-in-life, duet/stitch react, green-screen rant, skit/sketch, GRWM, street interview, challenges, series cliffhangers, hot takes, text-story slideshows, save/share bait, meme/trend hijack, cultural moments, influencer seeding briefs.

**High production:** Hero product film, fashion editorial, beauty/food macro tabletop, CGI/3D, motion-design explainer, documentary cutdown, music-video brand, VFX transformation, performance/sports cinema, launch teasers, cinematic testimonials, BTS making-of, kinetic type.

**Performance DR:** UGC confession, PAS, before/after, proof stacks, founder story, local trust, product loops, listicles, offer urgency, comparison, objection FAQ, lead magnets, app UI demos, podcast clips.

## Why pattern-first (not scrape-first)

| Scrape-first | This skill |
| --- | --- |
| ToS / copyright risk if redistributed | Ships structures you can sell publicly |
| One similar ad → surface imitation | Many styles → transferable craft |
| Unstructured transcripts | Schema + retrieval + output contracts |
| Still weak on “what viral means” | Explicit viral operating system |

Live competitor ingest stays **private**: [`ingest/README.md`](./ingest/README.md).

## Quick start

```bash
cd skills/ad-intelligence

# Viral / share-friendly for a niche
node scripts/retrieve.mjs --niche beauty --tag viral --limit 5

# Premium cinema / high production
node scripts/retrieve.mjs --production premium_cinema --limit 5

# TikTok job-based
node scripts/retrieve.mjs --platform tiktok --job "pov skit challenge" --limit 5

node scripts/retrieve.mjs --list
node scripts/retrieve.mjs --list-niches
```

Ask your agent: *Using the ad-intelligence skill, create a viral TikTok + a high-production hero film for [brand/offer].*

## Package & sell

1. Copy `ad-intelligence/` into its **own GitHub repository** (recommended for a product).
2. Keep `.cursor-plugin/plugin.json` + `skills/ad-intelligence/SKILL.md`.
3. Users install via Cursor **Customize → From GitHub Repository** or a team marketplace.
4. License: edit `LICENSE` (MIT for open; commercial for paid).

**Positioning:** “Ad Intelligence — 40+ viral & high-production ad blueprints + retrieval CLI for AI creative agents.”

**Upsells:** private vector ingest of licensed swipe files, monthly niche packs, brand-specific fine-tune packs.

## Layout

```
ad-intelligence/
  .cursor-plugin/plugin.json
  README.md
  LICENSE
  schema/
  ingest/
  scripts/rebuild-index.mjs
  skills/ad-intelligence/
    SKILL.md
    scripts/retrieve.mjs
    database/
      index.json
      patterns/
      niches/
      hooks/
      flows/
      trends/
      anti-patterns.json
    examples/
```

## Legal

See [`LICENSE`](./LICENSE). Do not redistribute third-party ad media or verbatim competitor copy in public packages.
