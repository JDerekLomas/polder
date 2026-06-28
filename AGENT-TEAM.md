# MakeMode — Agent Team Plan

> How two founders execute a multi-workstream venture: not by hiring, but by running a
> fleet of specialized AI agents with founders as supervisors. The agent team **is** the
> "recruits we'll add later" from the playbook — deployed now, reviewed by humans.
> Companion to `PLAYBOOK.md`. Source of truth for each agent = the planning docs in this
> repo + `polder-app/PROGRESS.md`.

## The premise

`PLAYBOOK.md` concluded: founders cover product/UX + build, so **headcount isn't the v0
constraint — focus is.** An agent fleet is how you hold many workstreams at once without
splitting two people across all of them. Each agent owns a lane, reads the shared
planning docs, does the work, and proposes changes back. **Founders stay the
decision-makers and the only ones who act outward** (talk to TU Delft, sign things, spend
money, deploy prod).

## Governance — the autonomy tiers

Every agent action falls in one tier. This is the safety model; it mirrors Derek's
standing rules (stop for credentials, irreversible, or outward-facing actions).

- **Tier 1 — Auto** (agent just does it): research, drafting, code on a branch, doc
  updates, analysis. Reversible, internal.
- **Tier 2 — Review** (agent proposes, founder merges): code to main, published site
  copy, anything a third party will read.
- **Tier 3 — Founder-only** (agent prepares, human executes): anything outward-facing or
  irreversible — emails to TU Delft, signing/sending legal docs, grant *submissions*,
  prod deploys, spending money, touching credentials.

## The roster

Each agent: **mission · owns · tools · reads · produces · tier · supervisor.**

### 0. Chief of Staff (orchestrator)
- **Mission:** decompose goals into agent tasks, dispatch, track the playbook, report.
- **Owns:** the task board, sequencing, "what's blocked on what," weekly status to founders.
- **Tools:** all (read-heavy); spawns the others.
- **Reads:** every planning doc. **Produces:** status reports, the dispatch plan.
- **Tier 1.** **Supervisor:** Derek.

### 1. Engine (build / integration)
- **Mission:** wrap opencode, harden the Tauri shell, integrate GitLab + Scaleway, keep
  the two blocked features lit once keys exist.
- **Owns:** `polder-app` codebase, builds, tests, the open-source EU adapter.
- **Tools:** code, bash, git. **Reads:** `PROGRESS.md`, `DATA-FLOW.md`.
- **Produces:** working features on branches + tests + PRs.
- **Tier 1** on branches, **Tier 2** to merge. **Supervisor:** Emma.

### 2. Designer (product / UX)
- **Mission:** make the non-coder flow effortless; polish UI, copy, onboarding,
  accessibility (WCAG/EAA).
- **Owns:** the student journey (log in → make → see → save → share), UI components.
- **Tools:** code, browser (screenshots/visual review), design critique.
- **Reads:** `PLAYBOOK.md` §1. **Produces:** UI components, flow critiques, copy.
- **Tier 1/2.** **Supervisor:** Derek + Emma (it's the differentiator).

### 3. Steward (pilot / ops)
- **Mission:** stand up cohort workspaces, instrument the pilot, collect evidence.
- **Owns:** pilot setup, the metrics spec (activation, projects published, links shared,
  time-to-first-publish, quotes).
- **Tools:** code, bash, data analysis. **Reads:** `PLAYBOOK.md` §4.
- **Produces:** workspace setup scripts, the instrumentation, the evidence dataset.
- **Tier 1/2.** **Supervisor:** Emma.

### 4. Counsel-Draft (legal / policy)
- **Mission:** draft the v0 legal artifacts and track the compliance checklist. **Drafts
  only — never a substitute for the lawyer; every output stamped "lawyer must review."**
- **Owns:** Privacy Policy, ToS, Acceptable Use, AI-transparency notice, OSS license
  audit, RoPA scaffold, DPA review notes, the `LEGAL-COMPLIANCE.md` checklist state.
- **Tools:** code (docs), web (regulation lookup). **Reads:** `LEGAL-COMPLIANCE.md`,
  `DATA-FLOW.md`.
- **Produces:** first-pass legal drafts + a redline-ready packet for the lawyer.
- **Tier 2** (founder reviews) → **Tier 3** to send to counsel. **Supervisor:** Derek.

### 5. Fundraiser (grants)
- **Mission:** monitor calls, draft applications, track deadlines.
- **Owns:** the `GRANTS.md` pipeline, draft applications (WBSO, Sovereign Tech Fund,
  NLnet, AiNed), deadline calendar.
- **Tools:** web search/fetch, code (drafts). **Reads:** `GRANTS.md`, `PLAYBOOK.md` §3.
- **Produces:** application drafts, a live deadline tracker, fit assessments.
- **Tier 1** (research/draft) → **Tier 3** (founder submits). **Supervisor:** Emma.

### 6. Scout (research / intel)
- **Mission:** watch the landscape — AI Act changes, sovereignty/competitor moves, and
  **verify the GLM/EUrouter sovereignty assumptions** in `DATA-FLOW.md`.
- **Owns:** the four ⚠️ open confirmations (EU-hosting, no-retention, no-training,
  no-EU-exit), competitor/regulatory monitoring.
- **Tools:** web search/fetch. **Reads:** `DATA-FLOW.md`, `LEGAL-COMPLIANCE.md`.
- **Produces:** verification findings, a watch-list digest.
- **Tier 1.** **Supervisor:** Derek.

### 7. Storyteller (narrative / marketing)
- **Mission:** keep the site + pitch sharp; turn pilot evidence into case studies.
- **Owns:** `index.html` / `pitch.html` / `calculator.html`, the deck, case studies.
- **Tools:** code, browser. **Reads:** `PLAYBOOK.md`, pilot evidence from Steward.
- **Produces:** site updates, pitch material, case studies.
- **Constraint:** must not publish unverified sovereignty claims (coordinate with Scout).
- **Tier 2.** **Supervisor:** Derek.

## How they coordinate

- **Single source of truth = this repo's planning docs.** Agents read them, act, and
  propose edits via PR. The docs are the shared memory.
- **Chief of Staff runs the loop:** reads the docs → identifies the next unblocked tasks →
  dispatches the right agents (in parallel where independent) → collects outputs →
  updates the board → reports to founders.
- **Founders are the gates:** every Tier 2 merge and every Tier 3 outward action passes
  through Derek or Emma. Agents prepare; founders decide and act.
- **Dependencies:** Engine + Steward unblock the pilot; Counsel-Draft + Scout unblock the
  contract; Fundraiser runs in parallel; Storyteller follows pilot evidence.

## Mapping to the 90-day plan

| Phase | Active agents |
|---|---|
| Wks 1–2 (unblock) | Engine (light up features), Counsel-Draft (OSS audit, Privacy/ToS), Scout (verify GLM), Fundraiser (WBSO + STF drafts) |
| Wks 3–6 (lock pilot) | Steward (workspace + instrumentation), Designer (onboarding polish), Engine (hardening) |
| Wks 6–10 (run) | Steward (collect evidence), Designer (fix friction live), Scout (monitor) |
| Wks 10–13 (package) | Fundraiser (submit), Storyteller (case studies), Counsel-Draft (contract prep) |

Chief of Staff active throughout.

## Instantiating this in Claude Code

These map directly to **`.claude/agents/*.md` subagent definitions** (one per roster
entry) plus a **Workflow** for the Chief-of-Staff orchestration loop. Recommended build
order: Engine, Counsel-Draft, Fundraiser, Scout first (the wks 1–2 fleet), then the rest.

> Next step when ready: scaffold the agent definition files so they're dispatchable, and
> a starter Chief-of-Staff workflow that reads the planning docs and proposes the week's
> task board.
