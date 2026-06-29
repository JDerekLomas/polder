# CLAUDE.md — MakeMode (web app, marketing & docs)

Guidance for Claude Code and for human collaborators (Derek & Emma). Read this first.

## Mission — start with the why
MakeMode is **a coding agent for non-coding European design students**: describe a thing →
it builds a page → publish a shareable link. The whole reason it exists is that it's
**EU-sovereign end to end** — the tool a European university is actually *allowed* to use on
real student data. North stars: Claude Cowork (a calm agentic surface) + Lovable
(make → preview → publish), on EU rails. When deciding anything, ask: *does this serve a
design student getting from idea to a shared link, without their data leaving the EU?*

This repo is the **web app + marketing site + docs + the Scaleway backend function**. The
desktop app is a separate repo: `../makemode-app` (github.com/JDerekLomas/makemode-app).

## On the word "polder"
This repo is full of "polder" **on purpose** — it's the core metaphor, not old branding:
*a polder is land a nation makes for itself and keeps for itself; sovereign infrastructure
is the same idea, for software.* The `.polder` CSS texture, the Dutch-polder imagery, and
that copy are intentional. **Do not rename them.** (The product was renamed Polder→MakeMode;
that rename is done. "MakeMode" is the product, "polder" is the metaphor.)

## What's here
- **Marketing / brochure pages** (static HTML): `index.html`, `plan.html` (the page for Emma),
  `demo.html`, `pitch.html`, `terp.html`, `calculator.html`, `app.html`. `legacy-index.html` is
  the previous homepage, kept for reference.
- **Strategy & ops docs** (markdown): `STRATEGY.md`, `PLAYBOOK.md`, `USER-JOURNEYS.md`,
  `UX-FLOWS.md`, `GRANTS.md`, `LEGAL-COMPLIANCE.md`, `DATA-FLOW.md`, `AGENT-TEAM.md`,
  `TABLE-STAKES.md`, and `HANDOFF.md` (always read HANDOFF.md first — it's the current pick-up point).
- **`scw-function/`** — the real backend: a **Scaleway Function** (`makemode-api`, node22, fr-par)
  that handles make + publish, routed by an `action` field. Deps must be **bundled into the zip**
  — Scaleway does not run `npm install`. `handler.js` is the entry.
- **`verification/`, `legal/`, `outreach/`** — supporting research, legal text, and outreach material.

> The former Vercel `api/` functions (`make.js`, `publish.js`) were **removed** — they were
> orphaned (no page called them) and the only inference/publish path is now the Scaleway
> function in `scw-function/`. Keep it that way: MakeMode is all-Scaleway. See `DEPLOY.md`.

## Live URLs
- **Web app (sovereign, no install):** https://makemode-app.s3-website.fr-par.scw.cloud
- **Marketing / plan / demo (Vercel):** https://makemode.vercel.app · `/plan.html` · `/demo.html`
- **Published student projects land at:** `makemode-publish.s3-website.fr-par.scw.cloud/<slug>/`

> Everything that processes data runs on **Scaleway, France** = a single GDPR DPA. The Vercel
> deploy is brochure-ware only — keep anything that touches user data on Scaleway.

## How we work together — workflow
We use **branches + Pull Requests**. Nobody commits straight to `main`. This way neither of us
breaks the other's copy, and Vercel auto-builds a shareable **preview** for every branch/PR.

The loop for any change:
1. `git checkout main && git pull`
2. `git checkout -b feat/short-name` (or `fix/...`, `chore/...`, `docs/...`)
3. Commit as you go, with clear messages.
4. `git push -u origin HEAD` then `gh pr create --base main`.
5. Open the Vercel **preview URL** on the PR, check it looks right, get a quick look, merge.
6. After merge: `git checkout main && git pull`, delete the branch.

Rules of thumb:
- **`main` is always working.** Fixing a broken `main` is priority #1.
- **One idea per PR.** Small PRs merge fast.
- **Pushing to a feature branch = a free preview link** to share with anyone (lawyer, TU Delft, Emma).
- **Don't commit secrets.** Keys live in Vercel/Scaleway env, never in tracked files.
- **Deploying prod** is a Vercel push from `main` (brochure) — but the *real* app is the Scaleway
  bucket + function, deployed separately (see `scw-function/README.md`). Merging a PR does not
  redeploy the Scaleway function.

> *Optional — worktrees.* Only needed if you run several Claude Code sessions on the **same
> machine** at once (a `git checkout` in one breaks the others). Two people on two laptops don't
> need them — plain branches are enough.

## Don'ts / sharp edges
- **Don't rename the "polder" metaphor** (see above).
- **Scaleway functions don't `npm install`** — bundle dependencies into the deployment zip.
- **Keep data-processing on Scaleway, not Vercel** — Vercel is the brochure layer; the sovereignty
  claim depends on user data staying in fr-par.
- **`makemode-api` function id is `cef7a827-afd8-46a3-b55f-c47c1c1bd336`** — referenced in HANDOFF.md;
  source of truth for the backend is `scw-function/`.
