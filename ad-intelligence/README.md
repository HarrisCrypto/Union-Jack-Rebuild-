# Ad Intelligence — one-stop perfect ad maker

> **Install:** [`INSTALL.md`](./INSTALL.md) · **Changelog:** [`CHANGELOG.md`](./CHANGELOG.md)

A harness-agnostic skill (Cursor, Claude, Grok, Hermes, OpenClaw, …) that produces
**Seedance / Higgsfield-quality ads on the first shot** for any niche —

- **Connected tools** → call Higgsfield MCP / generators  
- **Not connected** → emit the same quality as Seedance YAML, Higgsfield briefs, CapCut finishing, media-buy checklists  

**Leverage = patterns + consistency sheets + QA/self-critique**, not model vibes.

## What’s inside (v3.1)

| Layer | Contents |
| --- | --- |
| Patterns | 47 blueprints (viral, share, cinema, DR) |
| Consistency | Product sheet + character sheet templates (Soul-ID / multi-angle locks) |
| Creative stack | Seedance 2.0/2.5, Higgsfield workflows, Kling, Runway, CapCut, Meta/TikTok… |
| Self-critique | Rubric → failure modes → A/B/C variants (hard gate) |
| Swipe signals | Anonymized high-longevity formats + common failures |
| Examples | 5 gold filled packages |
| QA | First-time-right checklist + mistakes library |
| Retrieval | `skills/ad-intelligence/scripts/retrieve.mjs` |

## Quick start

```bash
cd skills/ad-intelligence
node scripts/retrieve.mjs --niche beauty --tag viral --limit 5
```

Ask: *Using ad-intelligence, make a first-shot dual-track package for [brand] with product/character sheets, Seedance prompts, self-critique, and variants.*

## Design principles

1. Never invent proof — user-supplied or `[PLACEHOLDER]`  
2. Sheets before generate  
3. Muted-first, one CTA, timed beats, product/character lock  
4. Dual-track default for serious brands  
5. Self-critique before delivery  

## Legal

See [`LICENSE`](./LICENSE). No scraped competitor creatives in this package.
