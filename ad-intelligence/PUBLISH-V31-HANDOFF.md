# Publish Ad Intelligence v3.1.0 to HarrisCrypto/ad-intelligence

Implementing agent cannot push (403: App install only covers Union-Jack-Rebuild-).

## Ready-to-paste prompt for agent WITH write access to ad-intelligence

Repo: HarrisCrypto/ad-intelligence

Apply Ad Intelligence **v3.1.0** (first-shot production package). Commit already prepared locally as `6f79177` on branch `cursor/ad-intelligence-v31-upgrades-3683` but push was denied for the other agent.

### Required changes (do not invent a parallel system)

1. Version bump to `3.1.0` in `.cursor-plugin/plugin.json` and `.cursor-plugin/marketplace.json`.
2. Add root `CHANGELOG.md` for 3.1.0.
3. Update `README.md` for consistency sheets, self-critique, gold examples, swipe-signals.
4. Under `skills/ad-intelligence/`:
   - **NEW** `references/creative-stack/product-sheet-template.md`
   - **NEW** `references/creative-stack/character-sheet-template.md`
   - **NEW** `references/creative-stack/LAST-VERIFIED.md` (Seedance 2.5 / Higgsfield freshness)
   - Expand `references/creative-stack/seedance-prompt-contract.md` + `higgsfield-playbook.md` with product-sheet / character-sheet / style-lock / Soul-ID language
   - **NEW** `references/swipe-signals.json` (anonymized hook families, longevity formats, failure modes — no scraped creatives)
   - Expand `references/platform-specs.json` with native format signals, caption expectations, 2026 synthetic-media disclosure flags, rights decision trees
   - Expand `references/output-template.md` with mandatory **Self-critique & variants** + **AI disclosure & rights** blocks
   - Wire self-critique as hard gate in `checklists/first-time-right.json`
   - Update `pipelines/one-stop-ad-maker.md` asset kit: must produce/request product+character sheets before generation; run self-critique after first package
   - Polish `SKILL.md` + `prompts/harness-system-prompt.md` to reference consistency + self-critique
   - **NEW gold examples** (full output template + self-critique + product/character lock):
     - `examples/beauty-dtc-dual-track.md`
     - `examples/local-service-trust.md`
     - `examples/saas-demo-pas.md`
     - `examples/physical-product-hero.md`
     - `examples/entertainment-creator-series.md`
   - Update `scripts/retrieve.mjs` so results include `swipe_signals` + `consistency_templates`
5. Preserve pattern DB, retrieve CLI flags, dual-path (call Higgsfield MCP when available; else Seedance YAML + briefs), never invent proof.
6. Smoke: `node skills/ad-intelligence/scripts/retrieve.mjs --niche beauty` → must show swipe_signals + consistency_templates.
7. Commit + push to `main` (or open PR). Tag/note version 3.1.0.

### Artifacts from implementing agent
- Patch: ask user for `ad-intelligence-v3.1.0.patch` / bundle if transferred
- Mirror may exist under Union-Jack workspace path `ad-intelligence/` (files only)

If patch unavailable, implement from the checklist above by reading current SKILL.md, pipelines/one-stop-ad-maker.md, references/output-template.md, seedance-prompt-contract.md, and first-time-right.json first.
