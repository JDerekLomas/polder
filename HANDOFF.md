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
- (Old `polder-app`/`polder` names redirect.) The Polder→MakeMode rename is now complete down to the Rust crate (`makemode-app`); the only `polder` left in the app is the `XK` XOR pad in `lib.rs`, kept deliberately (renaming it breaks baked-key decoding). "polder" in *this* site repo is the intentional sovereignty metaphor (the `.polder` texture + copy) — leave it.

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
- Scaleway **Edge Services CLI/API is buggy** — `plan list` panics; **the pipeline head (`dns_stage_id`) cannot be set via CLI or API** (PATCH 200s but drops the field). Pipeline creation/head-linking must be done in the **Console**. Reads/deletes/stage-creates via CLI work fine.

## OPEN ITEMS / where to resume (priority)
1. **app.makemode.nl** — **BLOCKED on a Scaleway Edge Services bug; needs the Console (UI) to finish.** Confirmed 2026-06-29: the pipeline head (`dns_stage_id`) cannot be set via CLI or raw API — the CLI rejects `dns-stage-id`; a raw `PATCH /pipelines/{id}` with `dns_stage_id` returns HTTP 200 but silently drops the field; creating stages nested under a pipeline never auto-registers the head. Deleted the original `625f0046…` and **rebuilt a fresh, fully-linked clean chain** — same `pipeline_missing_head_stage`, so it's systematic, not corruption. Current pipeline **`14c668f8-26d5-4e1e-b7ad-5147d4c37bcc`** (status `warning`/missing-head) with a complete canonical chain already built and linked:
   - backend `4be92c83-8e6a-4b93-9bbd-3550049ff576` → S3 bucket `makemode-app` (fr-par, website)
   - cache `72d8a97e-af18-4ece-bcd5-095da38503d6`
   - TLS `53a65a3b-67a1-4eab-8e01-c4ae32c9b697` (managed Let's Encrypt cert)
   - DNS `a6d96ee7-36d3-4439-97ae-ae8a8bf8607c` → `app.makemode.nl` (still `inactive`, `default_fqdn` empty until head is set)
   **To finish (Console only):** https://console.scaleway.com/edge-services/pipelines → open `makemode-app`. Either it lets you set/confirm the DNS stage as the entry (head) and the pipeline flips to `ready`, **or** delete `14c668f8…` and use the console's create-pipeline wizard (backend = bucket `makemode-app` → TLS managed cert → DNS `app.makemode.nl`), which sets the head correctly. Then the DNS stage shows a CNAME target like `xxxxx.svc.edge.scw.cloud`. **Emma** adds `app CNAME → <that endpoint>` in makemode.nl's Vercel DNS; managed cert auto-provisions → https://app.makemode.nl serves the bucket.
   **Cost:** the Starter **plan** is the flat charge (not per-pipeline); deleting the pipeline doesn't cancel it. To truly stop billing, unsubscribe the plan (`scw edge-services plan delete`). The app works fine on the S3 URL meanwhile, so finishing the domain is polish, not blocking.
   **Tear-down (if abandoning):** `scw edge-services pipeline delete pipeline-id=14c668f8-26d5-4e1e-b7ad-5147d4c37bcc` (cascade-delete its stages first if needed), then optionally unsubscribe the plan. makemode.nl is Emma's (Vercel DNS); makemode.eu is available.
2. **Emma** runs the app (GETTING-STARTED.md) + tries it.
3. **Pilot-side = the real leverage (per STRATEGY/PLAYBOOK):** TU Delft IDE studio via Emma + the AI initiative; a grant draft (WBSO once BV exists, Sovereign Tech Fund, NLnet, AiNed); retain a Dutch tech lawyer + review `legal/` drafts; sign Scaleway's standard DPA.
4. **Product polish:** streaming the make-loop (watch-it-build); the heavier opencode agent path (unblock Devstral-in-opencode); **image generation (FLUX)** = the one missing modality (EU host → +1 sub-processor DPA). Vision (Pixtral) + STT (Whisper/Voxtral) already same-DPA on Scaleway.

## Doc map (makemode-site)
`README` (north-star + status) · `STRATEGY` · `PLAYBOOK` (team/funding/90-day) · `TABLE-STAKES` · `DATA-FLOW` (GDPR sub-processors + future modalities) · `LEGAL-COMPLIANCE` (+ Secret Manager logged as a control) · `GRANTS` · `AGENT-TEAM` · `UX-FLOWS` · `USER-JOURNEYS` · `verification/` · `legal/` (v0 drafts, lawyer-review pending) · `outreach/` · `scw-function/`. App: `makemode-app/PROGRESS.md`, `GETTING-STARTED.md`.
