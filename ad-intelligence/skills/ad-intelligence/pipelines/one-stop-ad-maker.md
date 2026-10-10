# One-stop perfect ad maker — master pipeline

Default path for **any company / any niche**. Goal: **first-shot production packages** — no slop, no redo loops.

```
BRIEF → RETRIEVE (+ swipe signals) → STACK → CONSISTENCY SHEETS → GENERATE → FINISH → SELF-CRITIQUE/VARIANTS → QA → DISTRIBUTE → SCALE
```

## 1) Brief (5 minutes)

| Field | Example |
| --- | --- |
| Company / product | … |
| Niche | from niches/* |
| Goal | awareness / traffic / leads / purchases / app installs |
| Platforms | TikTok, Meta, YT, CTV… |
| Offer | … |
| Proof on hand | stills, reviews, footage, URL — never invent |
| Budget posture | AI-only / hybrid / live shoot |
| Dual-track? | viral + cinema (**default YES** for serious brands) |
| Tool access | Higgsfield MCP connected / prompt-handoff |

## 2) Retrieve intelligence

```bash
node scripts/retrieve.mjs --niche <niche> --platform <platform> --limit 5
node scripts/retrieve.mjs --tag viral --limit 3
node scripts/retrieve.mjs --production premium_cinema --limit 3
```

Also load:

- `references/swipe-signals.json` (high-longevity formats + failure modes)
- style catalog, viral OS, mistakes library, platform specs

Pick: **primary + challenger + dual-track twin**. Prefer high-longevity formats when user wants evergreen.

## 3) Pick creative stack

Use `references/creative-stack/pattern-to-pipeline.json`. Check `LAST-VERIFIED.md`.

| Track | Stack |
| --- | --- |
| High-production | Sheets → stills → **Seedance 2.5 omni_reference** → CapCut → aspects |
| Viral / UGC | Sheets → Higgsfield `ugc-video` or creator brief → CapCut → Spark/Meta |
| Static | Ads Studio / product-photoshoot / Canva |
| Scale winner | Ad Multiplier (one variable) |

**Connected tools → call them. Not connected → same quality via handoff prompts.**

## 4) Consistency systems / asset kit (BEFORE generate) — hard gate

Must complete or explicitly request gaps:

- [ ] **Product sheet** (`product-sheet-template.md`) — hero, ¾, label, macro, Soul-ID
- [ ] **Character sheet** (`character-sheet-template.md`) if talent/UGC avatar
- [ ] Logo for endcard only
- [ ] 1–2 real proof items or `[PLACEHOLDER]`
- [ ] Brand palette + forbidden claims
- [ ] Synthetic disclosure plan if AI talent

Do **not** generate film prompts until sheets exist or gaps are listed for the user.

## 5) Generate

Emit timed script + Seedance YAML/prompt **with sheet locks** + Higgsfield brief + static twin.

Order:

1. Hook tests (5–8s) ×3  
2. Full spot (15–30s)  
3. Static/carousel twin  
4. Cinema twin if dual-track (same locks)

## 6) Finish

- Captions burned (muted-first)  
- One CTA  
- Safe margins  
- Paid-safe audio path  
- Required aspects  

## 7) Self-critique & variants (mandatory — kills redo)

1. Score every rubric dimension (incl. `consistency_lock`)  
2. List **2–3** most likely failure modes for this niche/platform (use swipe-signals + mistakes library)  
3. Emit **A/B/C** variants that each fix one failure (one variable each)  

## 8) QA gate

`checklists/first-time-right.json` — including consistency-sheets + self-critique-variants + rights-disclosure.  
`references/mistakes-library.json`  
Seedance quality bar  

## 9) Distribute

Platform-specs native signals + synthetic disclosure + rights tree.  
Naming: `brand_pattern_posture_aspect_variant`

## 10) Scale

Ad Multiplier / Spark / weekly trend ops — preserve product/character lock.

## Agent self-check before saying “done”

- [ ] Pattern ids cited  
- [ ] Sheets filled or gaps requested  
- [ ] Tool stack named + prompts copy-pasteable  
- [ ] Dual-track if serious brand  
- [ ] No invented proof  
- [ ] Self-critique + variants present  
- [ ] Output template complete  
- [ ] All first-time-right gates PASS  
