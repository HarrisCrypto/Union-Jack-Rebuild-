# Seedance prompt contract (Higgsfield-quality handoff)

Use this whenever the stack includes **Seedance 2.0 / 2.5** (BytePlus, CapCut/Dreamina, TikTok Symphony, or Higgsfield `seedance_2_*`).  
Even with **no API connected**, emit this block so anyone can paste into Seedance and hit ad-grade output.

See `LAST-VERIFIED.md` for model freshness.

## Golden rules

1. **Product / character lock first** — fill `product-sheet-template.md` and/or `character-sheet-template.md`. Attach multi-angle refs. No text-only ecommerce.
2. **One job per generation** — match the pattern’s JTBD; don’t cram feature laundry.
3. **Timed beats in the prompt** — `0–3s / 3–10s / …` blocks.
4. **Native audio OK** — `generate_audio: true`, plus burned captions for muted feeds.
5. **No tiny legal text / perfect logo kerning inside the model** — CapCut/endcard in post.
6. **Variants** — change ONE variable. Prefer region/timestamp edit on 2.5 when available.
7. **Sheet wins** — if prompt conflicts with product/character sheet, the sheet wins.

## Settings block (emit always)

```yaml
tool: seedance
model: seedance_2_5   # or seedance_2_0 if 2.5 unavailable
mode: omni_reference  # prefer over t2v for ads
duration_s: 15        # 8–12 hooks | 15–30 full spots
resolution: 1080p
aspect_ratio: "9:16"  # also deliver 16:9 twin brief
generate_audio: true
bitrate_mode: high
consistency:
  product_sheet: true
  character_sheet: false  # true if talent on camera
references:
  - role: product_hero
    file: "[PRODUCT_HERO.png]"
  - role: product_34
    file: "[PRODUCT_34.png]"
  - role: product_label
    file: "[PRODUCT_LABEL.png]"
  - role: product_macro
    file: "[PRODUCT_MACRO.png]"
  - role: character_front
    file: "[FACE_FRONT.png]"   # omit if none
  - role: style_lock
    file: "[OPTIONAL_GRADE_REF.png]"
  - role: audio_mood
    file: "[OPTIONAL_BED.mp3]"
negative:
  - "blurry logo, melted text, wrong label, color shift, extra fingers, watermark, stock lower-third, brand parody, different person, beauty-filter identity drift"
```

## Prompt skeleton (copy-paste)

```text
COMMERCIAL AD SPOT — [NICHE] — [PATTERN_ID]
Job-to-be-done: [ONE SENTENCE]
Style: [cinematic|ugc-hybrid|macro|performance] · Grade: [describe] · Lens: [e.g. 35mm / macro 100mm]
Aspect feel: vertical social, subject centered with safe margins for captions.

PRODUCT SHEET LOCK (sheet wins):
[2–6 lines from filled product sheet: silhouette, colorway, label truths, forbidden morphs]

CHARACTER SHEET LOCK (if any; sheet wins):
[2–4 lines: likeness, wardrobe, energy — Soul-ID]

TIMELINE:
0–2s HOOK: [exact visual + on-screen idea — no logo]. Pattern interrupt: […].
2–8s BODY: [mechanism / demo / desire]. Camera: [move]. Product must match references exactly.
8–12s PROOF OR ESCALATION: [result / proof — never invent numbers on screen].
12–15s CTA BEAT: [action] with clean end pose; leave lower 20% quieter for caption burn-in.

AUDIO: [VO line if any — short]. SFX: [whoosh/impact]. Music energy: [low/medium/high]. No copyrighted song titles.

IDENTITY LOCK: Same product (+ same person if cast) every frame. No beautify-into-stranger. No packaging morph.
PHYSICS: Believable materials; correct reflections; no melting type.
```

## Hook-test mini prompt (5–8s)

```text
Thumb-stop hook only. Product sheet lock on. 0–1s: [spectacle or confession visual]. 1–5s: product enters as solution matching hero+label refs. Hard stop before CTA. Vertical 9:16. generate_audio true.
```

## Edit brief (Seedance 2.5 region/timestamp)

```text
EDIT MODE — keep product/character identity + grade:
- Replace 0–3s hook with: […]
- Replace final 3s CTA with: […]
Do not change product identity, label, or talent likeness.
```

## Quality bar checklist (Seedance)

- [ ] Product sheet filled or gaps requested
- [ ] Multi-angle refs attached (hero + label minimum)
- [ ] Character sheet if talent used
- [ ] Product recognizable vs reference every beat
- [ ] Hook works muted
- [ ] No melted logos / fake metrics on screen
- [ ] Length matches media plan
- [ ] Vertical + horizontal twin planned
- [ ] Rights: original/licensed audio for paid
- [ ] Synthetic disclosure noted if AI talent
