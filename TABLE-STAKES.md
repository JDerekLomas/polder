# Polder — Table Stakes (Phase 0 Definition of Done)

> The operating principle: **get to table stakes, then do human-centered design from real
> student needs.** Table stakes is the price of entry — definable from the desk, not a
> matter of taste. The differentiated experience is NOT defined here; it comes from
> watching real students in the pilot. Don't design the experience in the abstract.

## Two things people blur

- **Table stakes** — the non-differentiating must-haves. You don't win on them; you're
  disqualified without them. Knowable today as a checklist.
- **The design** — the experience that makes a designer say "I couldn't have made this
  otherwise." **Cannot** be designed from the desk. Comes from observed friction in the
  pilot. This is the human-centered phase, and it *starts* once table stakes is reliable.

## The table-stakes loop

> A student can **log in → make → see it → it saves itself → publish a shareable link** —
> reliably, on credibly-EU infrastructure, legal to use.

## The 7 must-trues

| # | Must be true | Status (vs PROGRESS.md) |
|---|---|---|
| 1 | App installs + engine boots reliably (not just on a dev machine) | ✅ built — confirm reliability beyond Derek's machine |
| 2 | Agent core loop produces working output | ✅ built, verified with live inference |
| 3 | Real login works (GitLab OAuth live) | 🟢 **wired** — auto-push verified end-to-end on gitlab.com (create-repo + `oauth2:token` push smoke-tested OK; PAT seeded so the app shows connected now). **OAuth "Log in with GitLab" registered** (App ID + secret in secret-lover, injected via `.secrets.json`; `connect_gitlab` now sends the secret so confidential *or* public apps work; redirect `http://127.0.0.1:4272/oauth/callback`). Remaining: one live run to confirm the button flow end-to-end |
| 4 | Invisible save / versioning works | ✅ built (local verified) |
| 5 | Publish yields a real **public** URL | 🟡 local/LAN done; ⛔ **gap** = public EU URL (Scaleway) |
| 6 | The EU-infra claim is **true, not aspirational** (EU-host guarantee verified) | 🟢 **provider switched to Scaleway Generative APIs (FR)** — default model **GLM 5.2** (EU-hosted on Scaleway's Paris region), **Devstral 2** (fully EU-provenance coding model) available as an option. Removes the router-opacity problem; Scaleway publishes a standard GDPR DPA and is *also* the publish host (one vendor, one DPA). Note: GLM is Chinese-origin open weights — EU-*hosted* so the data path is sovereign, but a procurement story needing zero non-EU provenance can flip the default to Devstral. Remaining: sign the Scaleway DPA. EUrouter kept as documented alternative |
| 7 | Legal minimum to lawfully onboard a student (Privacy Policy + ToS + AI notice) | 🟡 **v0 drafts done** (`legal/`) — pending Dutch counsel review + placeholders (entity, KvK, retention) |

## The gap is exactly four things

3 (live GitLab login), 5 (public publish URL), 6 (GLM verification), 7 (v0 legal). **None
is "design"** — all four are arrangement + verification. Close them and Polder is at the
starting line.

## Then: human-centered design begins

Once the loop is reliable, the pilot becomes the **HCD research engine**, not just grant
evidence:
- Put it in front of one IDE studio.
- **Observe** — where they stall, what they reach for, what delights, what they ignore.
- Design the differentiated experience **from those needs**, not from assumptions.
- The metrics in `PLAYBOOK.md` §4 double as both research signal and proof.

> Reframe of Phase 0 (`STRATEGY.md`): Phase 0's real definition-of-done is **these four
> gaps closed.** The pilot (Phase 1) is where design actually starts.
