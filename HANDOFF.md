# MakeMode — Session Handoff (2026-06-29)

> Pick-up point for a fresh session. The product works end-to-end (web + desktop), **fully
> Scaleway-sovereign**. Repos renamed Polder→MakeMode. Emma added to Scaleway. The real
> leverage now is **pilot-side** (TU Delft studio, grants, lawyer), not more code.

## What MakeMode is
A coding agent for non-coding European **design students** — describe → it builds a page →
publish a shareable link. EU-sovereign end to end (the tool a university is *allowed* to use).
North stars: Claude Cowork (calm agentic surface) + Lovable (make/preview/publish) on EU rails.

## Live URLs
- **Web app (sovereign, no install):** https://makemode-app.s3-website.fr-par.scw.cloud
- **Marketing / plan / demo (Vercel — brochures only):** https://makemode.vercel.app · `/plan.html` (for Emma) · `/demo.html`
- **Published projects land at:** `makemode-publish.s3-website.fr-par.scw.cloud/<slug>/`

## Repos
- **github.com/JDerekLomas/makemode-app** — desktop Tauri app + Rust control server. Local: `~/makemode-app`
- **github.com/JDerekLomas/makemode-site** — web app, Scaleway function, all docs, marketing. Local: `~/makemode-site`
- (Old `polder-app`/`polder` names redirect.) Internal Rust crate is still named `polder-app` (kept to avoid build churn — invisible).

## Architecture — everything on Scaleway/France = ONE DPA
- **Inference:** Scaleway Generative APIs. Model picker on arrival: **Mistral (fast, default) / Devstral 2 / GLM 5.2.**
- **Web frontend:** Scaleway Object Storage bucket `makemode-app` (website hosting).
- **Web backend:** Scaleway **Function `makemode-api`** (id `cef7a827-afd8-46a3-b55f-c47c1c1bd336`, node22, fr-par) — handles make+publish, routed by `action` field. Source in `makemode-site/scw-function/`. Deps must be bundled in the zip (Scaleway doesn't npm-install).
- **Publish storage:** Scaleway bucket `makemode-publish`.
- **Secrets:** Scaleway **Secret Manager** (fr-par) = central vault. Also in Derek's secret-lover (global): `SCALEWAY_SECRET_KEY/ACCESS_KEY`, `MAKEMODE_GITLAB_CLIENT_ID/SECRET`.
- **Desktop app:** Tauri window loads the control server (`:4272`) which serves the shell + make/publish (Scaleway direct) + spawns the opencode engine (`:4271`) for the heavier agent path. Bundle id `nl.makemode.app`; env vars `MAKEMODE_*` + `SCALEWAY_*` (see `.env.example` / `run.sh`).

## Access
- **Emma** (emmaelinefuria@gmail.com) added to Scaleway org as a **member** (id `2ce3313d-14fe-41a9-aea5-5ba4a96b5efb`), in IAM group **`makemode-team`** → policy `makemode-team-access` = **AllProductsFullAccess on the project**. She logs in (Scaleway emailed her), makes her own API key → no secret handoff. See `makemode-app/GETTING-STARTED.md`.

## Features live (verified)
Make-loop (describe→build→preview→publish) · model picker · **Version History** (snapshot every change, roll back) · **Claude-style project sidebar** · Recent projects · cream design system + light/dark · GitLab login+auto-push (desktop) · EU publish.

## Technical gotchas (save time)
- **opencode resolves only `glm-5.2`** for our custom provider (Devstral throws `ProviderModelNotFoundError`) → the desktop *agent* path uses GLM; the **make-loop calls Scaleway directly** (Mistral, fast) bypassing opencode.
- Desktop app **seeds config once** → to change model/provider, clear `~/Library/Application Support/nl.makemode.app/engine-config|engine-data/opencode/*.json` + `opencode.db`.
- opencode message API: `model` is an **object** `{providerID, modelID}`.
- **Running desktop dev:** `kill -9` anything on ports 1420/4271/4272 before relaunch (stale instances block it); `cargo clean` in `src-tauri` after any dir move.
- Scaleway **IAM policy rules**: bind permission sets via `policy update`, NOT `policy create` (create silently drops them).
- Scaleway **Edge Services CLI is buggy** (`plan list` panics) — use the console.

## OPEN ITEMS / where to resume (priority)
1. **app.makemode.nl** — half-built via CLI then bailed (Edge Services CLI too buggy). **Starter plan IS subscribed (billing).** Pipeline `625f0046-5793-482b-9aa2-5af0765f5a13` + backend/TLS/DNS stages exist but pipeline shows `missing head stage` and no CNAME surfaced. **DECISION NEEDED:** finish in Scaleway Console (Edge Services → makemode-app → fix head + grab CNAME endpoint → Emma adds `app CNAME → endpoint` to makemode.nl), **or tear it down to stop billing.** makemode.nl is Emma's (Vercel DNS); makemode.eu is available.
2. **Emma** runs the app (GETTING-STARTED.md) + tries it.
3. **Pilot-side = the real leverage (per STRATEGY/PLAYBOOK):** TU Delft IDE studio via Emma + the AI initiative; a grant draft (WBSO once BV exists, Sovereign Tech Fund, NLnet, AiNed); retain a Dutch tech lawyer + review `legal/` drafts; sign Scaleway's standard DPA.
4. **Product polish:** streaming the make-loop (watch-it-build); the heavier opencode agent path (unblock Devstral-in-opencode); **image generation (FLUX)** = the one missing modality (EU host → +1 sub-processor DPA). Vision (Pixtral) + STT (Whisper/Voxtral) already same-DPA on Scaleway.

## Doc map (makemode-site)
`README` (north-star + status) · `STRATEGY` · `PLAYBOOK` (team/funding/90-day) · `TABLE-STAKES` · `DATA-FLOW` (GDPR sub-processors + future modalities) · `LEGAL-COMPLIANCE` (+ Secret Manager logged as a control) · `GRANTS` · `AGENT-TEAM` · `UX-FLOWS` · `USER-JOURNEYS` · `verification/` · `legal/` (v0 drafts, lawyer-review pending) · `outreach/` · `scw-function/`. App: `makemode-app/PROGRESS.md`, `GETTING-STARTED.md`.
