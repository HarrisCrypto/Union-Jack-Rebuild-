#!/usr/bin/env node
/**
 * Retrieve ad blueprints by platform / style / funnel / niche / job keywords.
 *
 * Usage:
 *   node retrieve.mjs --niche auto_restoration --limit 3
 *   node retrieve.mjs --platform meta --funnel tof_awareness
 *   node retrieve.mjs --job "before after craft" --style before_after
 *   node retrieve.mjs --list
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_ROOT = path.join(__dirname, "..", "database");
const INDEX_PATH = path.join(DB_ROOT, "index.json");

function parseArgs(argv) {
  const out = { limit: 3, list: false };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    const next = argv[i + 1];
    if (a === "--list") out.list = true;
    else if (a === "--platform" && next) { out.platform = next; i++; }
    else if (a === "--style" && next) { out.style = next; i++; }
    else if (a === "--funnel" && next) { out.funnel_stage = next; i++; }
    else if (a === "--niche" && next) { out.niche = next; i++; }
    else if (a === "--job" && next) { out.job = next; i++; }
    else if (a === "--limit" && next) { out.limit = Number(next) || 3; i++; }
    else if (a === "--id" && next) { out.id = next; i++; }
  }
  return out;
}

function loadJson(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function scoreEntry(entry, q) {
  let score = 0;
  const hay = [
    entry.id,
    entry.style,
    entry.funnel_stage,
    ...(entry.platforms || []),
    ...(entry.niches || []),
    ...(entry.tags || []),
  ]
    .join(" ")
    .toLowerCase();

  if (q.id && entry.id === q.id) return 1000;
  if (q.platform && q.platform !== "any") {
    if ((entry.platforms || []).includes(q.platform)) score += 5;
    else score -= 2;
  }
  if (q.style) {
    if (entry.style === q.style || entry.style.includes(q.style) || entry.id.includes(q.style))
      score += 6;
  }
  if (q.funnel_stage && q.funnel_stage !== "any") {
    if (entry.funnel_stage === q.funnel_stage) score += 4;
  }
  if (q.niche) {
    const n = q.niche.toLowerCase();
    if ((entry.niches || []).some((x) => x.toLowerCase().includes(n) || n.includes(x.toLowerCase())))
      score += 6;
    if (hay.includes(n)) score += 2;
  }
  if (q.job) {
    for (const token of q.job.toLowerCase().split(/\s+/).filter(Boolean)) {
      if (hay.includes(token)) score += 2;
    }
  }
  return score;
}

function main() {
  const q = parseArgs(process.argv);
  const index = loadJson(INDEX_PATH);

  if (q.list) {
    console.log(JSON.stringify(index.patterns.map((p) => ({
      id: p.id,
      style: p.style,
      funnel_stage: p.funnel_stage,
      platforms: p.platforms,
      niches: p.niches,
    })), null, 2));
    return;
  }

  const ranked = index.patterns
    .map((p) => ({ entry: p, score: scoreEntry(p, q) }))
    .filter((x) => x.score > 0 || (!q.platform && !q.style && !q.funnel_stage && !q.niche && !q.job && !q.id))
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.min(Math.max(q.limit, 1), 10));

  // If nothing scored but filters were light, fall back to top of index
  const picks = ranked.length
    ? ranked
    : index.patterns.slice(0, q.limit).map((p) => ({ entry: p, score: 0 }));

  const results = picks.map(({ entry, score }) => {
    const full = loadJson(path.join(DB_ROOT, entry.file));
    return { score, blueprint: full };
  });

  // Attach niche pack if requested
  let nichePack = null;
  if (q.niche) {
    const nicheHit = index.niches.find(
      (n) =>
        n.id === q.niche ||
        q.niche.toLowerCase().includes(n.id) ||
        n.id.includes(q.niche.toLowerCase())
    );
    if (nicheHit) nichePack = loadJson(path.join(DB_ROOT, nicheHit.file));
  }

  console.log(
    JSON.stringify(
      {
        query: q,
        count: results.length,
        results,
        niche: nichePack,
        anti_patterns_file: "database/anti-patterns.json",
        hooks_file: "database/hooks/library.json",
        flows_file: "database/flows/library.json",
      },
      null,
      2
    )
  );
}

main();
