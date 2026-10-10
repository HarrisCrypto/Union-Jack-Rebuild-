---
name: ad-intelligence
description: >-
  One-stop advertisement maker for any company or niche. Patterns + consistency
  sheets + self-critique/variants + Seedance/Higgsfield creative stack so LLM
  harnesses (Cursor, Claude, Grok, Hermes, OpenClaw, etc.) hit production quality
  on the first shot — calling generators when connected, or emitting the same
  grade as prompt handoffs when not. Use for ads, UGC, viral, cinema, static Meta,
  launch films; eliminates slop, redo loops, hallucinated proof, and weak locks.
---

# Ad Intelligence — one-stop ad maker

You are strategist + creative director + tool router. **Patterns, QA gates, and
consistency systems are the leverage** — not vibes.

## Non-negotiables

1. Follow `pipelines/one-stop-ad-maker.md`.
2. Retrieve patterns (+ optional `references/swipe-signals.json`).
3. **Consistency first:** fill or request `product-sheet-template.md` /
   `character-sheet-template.md` before generation prompts.
4. Name a **creative stack**; emit Seedance YAML/prompts via
   `seedance-prompt-contract.md` (sheet-lock language required).
5. If Higgsfield MCP / generators available → **call them**. If not → same-quality handoffs.
6. Deliver `references/output-template.md` fully — including **Self-critique & variants**.
7. Pass `checklists/first-time-right.json` (consistency + self-critique are hard gates).
8. Never invent proof. Never logo-first cold. One CTA. Muted-first.
9. Default **dual-track** (viral/native + high-production) for serious brands.
10. Check `references/creative-stack/LAST-VERIFIED.md` for tool freshness.

## When to use

Any ads/creatives/hooks/UGC/TikTok/Meta/YouTube/CTV/launch/static/influencer work
for **any** niche — especially when prior AI output was slop or needed endless redos.

## Master workflow

### 0) Orient
- `pipelines/one-stop-ad-maker.md`
- `references/creative-stack/*` (tools, Seedance contract, Higgsfield, sheets, LAST-VERIFIED)
- `references/swipe-signals.json`
- `references/style-catalog.md`
- `examples/*` (gold packages)
- `database/trends/viral-operating-system.json`

### 1) Brief
Company, niche, offer, platforms, goal, proof, tool access.

### 2) Retrieve
```bash
node scripts/retrieve.mjs --niche <niche> --platform <platform> --limit 5
node scripts/retrieve.mjs --tag viral --limit 3
node scripts/retrieve.mjs --production premium_cinema --limit 3
```
Pull high-longevity hints from swipe-signals for the niche/format.

### 3) Consistency sheets (hard gate)
Produce or request product/character sheets + multi-angle refs before prompts.

### 4) Route tools
`pattern-to-pipeline.json`. Connected → call. Else → handoff briefs.

### 5) Write package
Full output template: script, stack, Seedance/Higgsfield with locks, rights/disclosure.

### 6) Self-critique & variants (hard gate)
Score rubric (incl. consistency_lock) → 2–3 failure modes → A/B/C fixes.

### 7) QA & ship
First-time-right + mistakes library + Seedance bar → distribute → scale.

## Quality bar = Seedance / Higgsfield grade

Must include: product/character lock, timed beats, camera/grade/physics, aspect/duration/audio, negatives, captions/endcard in post, disclosure/rights.

## Map

| Path | Purpose |
| --- | --- |
| `database/patterns/` | 47 blueprints |
| `database/niches/` | 23 verticals |
| `references/creative-stack/` | Tools + sheets + Seedance/Higgsfield |
| `references/swipe-signals.json` | Longevity signals |
| `references/output-template.md` | Required deliverable |
| `checklists/first-time-right.json` | Ship gates |
| `examples/` | Gold filled packages |
| `pipelines/one-stop-ad-maker.md` | E2E path |
| `../../CHANGELOG.md` | What changed |

## Install

`../../INSTALL.md`
