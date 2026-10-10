# Product sheet template (consistency lock)

**Hard rule:** Before any Seedance / Higgsfield / Kling / Runway generation for a physical or packaged product, fill this sheet (or mark gaps as `[REQUEST FROM USER]`). Paste the filled sheet into prompts as **IDENTITY LOCK**.

Agents must **produce** this sheet in the output package under “Consistency systems,” even if some fields are placeholders.

```markdown
## Product sheet — [PRODUCT NAME / SKU]

### Identity
- Official name:
- SKU / variant / colorway:
- Category / niche:
- One-line mechanism (not feature laundry):

### Visual lock (attach files)
| Role | File | Notes |
| --- | --- | --- |
| Hero pack (front, true color) | `[PRODUCT_HERO.png]` | Straight-on, even light |
| ¾ angle | `[PRODUCT_34.png]` | Depth + silhouette |
| Label / logo close-up | `[PRODUCT_LABEL.png]` | Readable type |
| In-hand / scale | `[PRODUCT_HAND.png]` | Size truth |
| Detail / texture / macro | `[PRODUCT_MACRO.png]` | Material truth |
| Open / in-use (if relevant) | `[PRODUCT_USE.png]` | Demo state |

### Non-negotiable visual truths
- Shape / silhouette:
- Exact colors (hex or plain language):
- Materials / finish (matte, gloss, glass, fabric…):
- Label text that must stay legible:
- Forbidden morphs (no melting logo, no wrong cap color, no extra bottle…):

### Do-not-generate claims
- Banned on-pack or on-screen claims:
- Medical / finance / performance claims status: user-approved only / none

### Style lock (grade)
- Lighting preference:
- Grade / LUT vibe:
- Backgrounds allowed:
- Backgrounds forbidden:

### Soul-ID notes (keep constant across variants)
- “This product always looks like: …”
- “Never looks like: …”
```

## How to inject into Seedance

```text
PRODUCT SHEET LOCK — obey every frame:
[paste filled sheet summary]
References attached: hero, ¾, label, macro.
If conflict between prompt and sheet, SHEET WINS.
```
