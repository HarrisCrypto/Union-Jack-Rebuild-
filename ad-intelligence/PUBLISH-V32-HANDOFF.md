# Publish Ad Intelligence v3.2.0

Implementing agent cannot push to HarrisCrypto/ad-intelligence (403).

## Paste prompt for agent WITH write access

Repo: HarrisCrypto/ad-intelligence

```bash
curl -L -o v3.2.0.patch \
  https://raw.githubusercontent.com/HarrisCrypto/Union-Jack-Rebuild-/cursor/ad-intelligence-v32-mirror-3683/ad-intelligence/v3.2.0.patch
git checkout -b cursor/ad-intelligence-v32-upgrades
git apply v3.2.0.patch
# or copy tree from Union-Jack branch path ad-intelligence/
node skills/ad-intelligence/scripts/lint-package.mjs skills/ad-intelligence/examples/beauty-dtc-dual-track.md
node skills/ad-intelligence/scripts/retrieve.mjs --niche plumbing --limit 3
git add -A && git commit -m "Upgrade ad-intelligence to v3.2 mechanical lint + MCP-correct renders"
git push -u origin HEAD
```

v3.2 adds: lint-package, render-plan, connected-run-protocol, claim-firewall, brief-defaults, policy-precheck, retrieve aliases, 47 pattern routes, full beauty gold fixture.
