# Ad Intelligence — LLM ad pattern skill

A **pattern-first** database of high-performing ad blueprints packaged as a
Cursor Agent Skill / plugin. Built so harnessed LLMs (Cursor, Hermes, Claude,
Grok, etc.) stop guessing at “what an ad feels like” and instead retrieve
proven structures: hooks, beats, visual systems, CTAs, and output contracts.

## Why not the usual “scrape Meta + dump into a vector DB” plan?

Scraping archives is useful **later**, as a *private* enrichment layer. For a
skill you can put on GitHub (and sell), you want:

| Scrape-first (fragile) | Pattern-first (this package) |
| --- | --- |
| ToS / copyright risk if you redistribute creatives | Ships structures you own |
| One similar ad → surface imitation | Many styles → transferable craft |
| Unstructured transcripts | Schema + retrieval + output contracts |
| Model still invents weak flow | Beat sheets force commercial pacing |

Live ingest docs: [`ingest/README.md`](./ingest/README.md).

## What’s inside

```
ad-intelligence/
  .cursor-plugin/plugin.json          # Cursor plugin manifest
  skills/ad-intelligence/SKILL.md     # Agent instructions
  skills/ad-intelligence/database/    # Patterns, hooks, flows, niches
  skills/ad-intelligence/scripts/retrieve.mjs
  skills/ad-intelligence/examples/
  schema/ad-blueprint.schema.json
  ingest/                             # How to add private live ads
  LICENSE
```

**10 blueprints** covering UGC, PAS, before/after, social proof, founder story,
local trust, meme/native, product loop, listicle, cinematic brand — plus niche
packs (including `auto_restoration`), hook/flow libraries, and anti-patterns.

## Use in Cursor (this repo)

```bash
# From the skill directory
cd ad-intelligence/skills/ad-intelligence
node scripts/retrieve.mjs --niche auto_restoration --platform meta --limit 3
node scripts/retrieve.mjs --list
```

Ask the agent: *“Using the ad-intelligence skill, write 3 Meta ads for …”*

Project install: the skill is linked at `.cursor/skills/ad-intelligence`.

## Package & sell on GitHub / Cursor marketplace

1. Copy the `ad-intelligence/` folder into its **own repository** (recommended
   for a sellable product — don’t mix it forever with a client marketing site).
2. Keep `.cursor-plugin/plugin.json` and `skills/ad-intelligence/SKILL.md`.
3. For a multi-plugin marketplace repo, add a root
   `.cursor-plugin/marketplace.json` entry with `"source": "ad-intelligence"`.
4. Users install via Cursor **Customize → From GitHub Repository** (or your
   team marketplace).
5. Choose a license in `LICENSE` (MIT for open; commercial license for paid).

### Positioning for sale

- **Product:** “Ad Intelligence Skill — 10+ production blueprints + retrieval CLI for AI ad agents”
- **Buyer:** agencies, DTC founders, local-service operators, AI agent builders
- **Upsell:** private ingest pipeline + monthly niche pack updates (you keep scraped data private)

## Agent harness integration (Hermes / custom)

1. Mount `skills/ad-intelligence/` in the agent’s skill or RAG root.
2. On “write an ad” intents, call `node scripts/retrieve.mjs …`.
3. Force the model to emit the selected blueprint’s `output_contract.deliverables`.
4. Optionally merge private vector hits from your ingest pipeline.

## Extend

1. Copy `ingest/sample-ingest.json` → new file under a **private** blueprints dir.
2. Or add a public pattern under `database/patterns/` and register it in
   `database/index.json`.
3. Validate shape against `schema/ad-blueprint.schema.json`.

## Legal

See [`LICENSE`](./LICENSE). Do not redistribute third-party ad media or verbatim
competitor copy inside public packages.
