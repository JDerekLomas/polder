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
| 3 | Real login works (GitLab OAuth live) | ⛔ **gap** — needs registered OAuth app |
| 4 | Invisible save / versioning works | ✅ built (local verified) |
| 5 | Publish yields a real **public** URL | 🟡 local/LAN done; ⛔ **gap** = public EU URL (Scaleway) |
| 6 | The EU-infra claim is **true, not aspirational** (GLM-host guarantee verified) | ⛔ **gap** — Scout must verify no-retention/no-training/no-EU-exit |
| 7 | Legal minimum to lawfully onboard a student (Privacy Policy + ToS + AI notice) | ⛔ **gap** — Counsel-Draft produces v0 |

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
