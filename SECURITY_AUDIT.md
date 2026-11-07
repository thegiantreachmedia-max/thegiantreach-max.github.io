# SECURITY_AUDIT.md — Legacy static site

**Scope:** full Git history, 142 commits. This is a legacy static repository, separate from the currently deployed `giant-reach-ai` website.

## Findings

| ID | Severity | Location | Finding | Status |
|---|---|---|---|---|
| LEG-01 | High | `tgr-discovery.html:463-466`, commit `1ce980ded08ce875ed64526d064af084f2bb6d62` | SERP API key and Groq API key committed in static HTML. | Rotate if not already rotated |
| LEG-02 | High | `tgr-portal-1.html:369-373`, commit `31ec8387a335e635e4b2f8eb1fcf440ae219f2bf` | Notion integration token and Resend API key committed in static HTML. | Rotate if not already rotated |
| LEG-03 | High | `tgr-ops.html:789-839`, commits `3d829916c92e514b3069492243014e67d6dbf551`, `f199de48ebea59eaba35d02ea660689809443e0e`, `80d5bb92292206155e3f6d9c1b5daa5100529f27` | Supabase key and Groq key repeated in historical Ops HTML. | Classify key; rotate if secret |
| LEG-04 | Medium | Multiple copied `tgr-portal*.html` and `tgr-discovery*.html` files | Gitleaks reported 32 matches, largely repeated copies of the same credentials. | Historical exposure |
| LEG-05 | Low | Repository root | No `package.json`; npm audit and lockfile are not applicable. | N/A |

The 32 Gitleaks matches collapse to the same private credential types found in TGR Ops: SERP API, Groq, Notion and Resend. Supabase `sbKey` matches were publishable/anon keys, not service-role credentials. Rotate the four private credentials if not already rotated. The legacy repository's current domain/deployment status was not changed by this audit.

Do not publish these HTML snapshots again. If this repository is still served publicly, remove all client-side provider secrets and route privileged operations through authenticated server-side functions.
