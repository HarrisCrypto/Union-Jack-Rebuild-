---
name: ad-intelligence
description: >-
  Pattern-first database of high-performing ad blueprints for LLM agents.
  Use when writing ads, scripts, shot lists, UGC briefs, Meta/TikTok/YouTube
  creatives, swipe-file style references, or improving weak ad generations.
  Retrieves hooks, flows, styles, niche angles, and output contracts — not
  scraped competitor creatives.
---

# Ad Intelligence

You have a **pattern library**, not a dump of stolen ads. Winning ads share
structures. Retrieve those structures, then write original creative for the
user’s brand.

## When to use

- User asks for ads, ad scripts, hooks, creatives, UGC, waitlists, local lead ads
- User says prior LLM ad output was generic, weak, or “doesn’t feel like a real ad”
- User wants a swipe-file / competitive inspiration **without** pasting copyrighted copy

## Hard rules

1. **Never invent testimonials, star ratings, awards, or performance metrics.**
2. **Never reproduce scraped competitor ads verbatim** (copy, frames, audio).
3. Prefer **one job per ad**. If they need variants, use an A/B matrix.
4. Assume **muted autoplay** unless told otherwise — hook must work as text or pure visual.
5. Match **landing promise** to the hook.
6. Check `database/anti-patterns.json` before finalizing.

## Workflow (do this every time)

### 1. Brief intake (infer if obvious; ask only if blocked)

- Platform(s): meta | tiktok | youtube | google_display | linkedin | organic_short
- Funnel: tof_awareness | mof_consideration | bof_conversion | retargeting
- Niche / offer / geo
- Proof assets the user actually has (reviews, before/after, facility footage)
- Desired length and CTA type

### 2. Retrieve blueprints

From this skill directory, run:

```bash
node scripts/retrieve.mjs --niche <niche> --platform <platform> --funnel <stage> --job "<keywords>" --limit 3
```

Examples:

```bash
node scripts/retrieve.mjs --niche auto_restoration --platform meta --limit 3
node scripts/retrieve.mjs --style before_after --job "transformation craft"
node scripts/retrieve.mjs --list
```

If you cannot run the script, open `database/index.json`, pick the best 2–3
pattern files under `database/patterns/`, plus the matching niche file under
`database/niches/` when relevant. Also read `database/hooks/library.json` and
`database/flows/library.json`.

### 3. Select 1 primary pattern (+ optional 1 challenger)

Score mentally on: platform fit, funnel, available proof, production difficulty.
Tell the user which pattern id you chose and why (one sentence).

### 4. Generate using the pattern’s `output_contract`

Emit only what the contract asks for, in this order when present:

1. **Pattern id + why**
2. **Hook options** (3) — from hook library + niche angles
3. **Full script** with timecodes matching `body.beats`
4. **Shot list** / visual system notes
5. **Caption track** (muted-first)
6. **Primary text + headline** (paid social)
7. **CTA variants** (1 primary + 2 alts — separate, not stacked in one cut)
8. **A/B test matrix** (what changes between variants)
9. **Landing mirror notes**

Fill brand facts from the user. Leave `[PLACEHOLDER]` for missing proof — do
not fabricate.

### 5. Self-critique against anti-patterns

Reject and rewrite if you detect: logo-first cold open, feature laundry list,
fake UGC polish, multi-CTA, invented proof, muted-illegible text, promise
mismatch, forced trend.

## Database map

| Path | Purpose |
| --- | --- |
| `database/index.json` | Master index for retrieval |
| `database/patterns/*.json` | Full ad blueprints (schema-validated shape) |
| `database/hooks/library.json` | Hook templates |
| `database/flows/library.json` | Beat sheets |
| `database/niches/*.json` | Niche angles, lexicon, CTAs |
| `database/anti-patterns.json` | What not to generate |
| `../../schema/ad-blueprint.schema.json` | Blueprint JSON Schema |
| `scripts/retrieve.mjs` | Local retrieval CLI |

## Why this beats “paste one reference ad”

One reference teaches imitation of surface style. A pattern library teaches
**transferable structure** (hook window, beat purpose, visual system, CTA type)
across styles so the agent can invent new ads that still feel commercially real.

## Extending with live ads (optional)

See `../../ingest/README.md`. Ingest structured **breakdowns** you have rights
to analyze. Do not ship third-party creatives inside a public skill package.
