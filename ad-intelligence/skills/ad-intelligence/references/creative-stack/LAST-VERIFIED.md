# Creative stack — last verified

| Item | Last verified | Notes |
| --- | --- | --- |
| Seedance 2.5 | 2026-10-10 | Up to ~30s single-pass; omni_reference; video_edit / extension; native audio; region/timestamp edits. Available via BytePlus/Lumina, CapCut/Dreamina, TikTok Symphony, Higgsfield `seedance_2_5`. |
| Seedance 2.0 | 2026-10-10 | Strong multimodal refs; multi-SKU; Higgsfield `seedance_2_0`; still valid fallback. |
| Higgsfield workflows | 2026-10-10 | ads-studio, ugc-video, ad-multiplier, product-photoshoot, marketing-studio, katana, brand-asset-creation, thumbnail-generation, faceless-video, video-montage, video-editing. Always call `get_workflow_instructions` first when MCP connected. |
| Higgsfield video models | 2026-10-10 | Also: `marketing_studio_video`, `ad_multiplier_v2`, `grok_video_v15`, `gemini_omni` / `gemini_omni_flash_1_1`, `minimax_h3_max`. Prefer `models_explore(action:'recommend')` at runtime. |
| Meta / TikTok / YT norms | 2026-10-10 | Muted-first social; Spark clearing; synthetic-media disclosure evolving — see platform-specs + rights tree. |

**Agent rule:** If today’s date is >90 days after Last verified, say so in the package and recommend re-checking model lists via MCP / vendor docs before expensive generates.
