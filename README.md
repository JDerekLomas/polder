# MakeMode

> **The one line:** MakeMode lets a non-coding European design student *describe* what they
> want, watch an AI agent *build* it, and *publish* a shareable link — all on infrastructure
> their university is actually allowed to approve.

**makemode.nl** · the calm make-and-publish loop of Lovable, with the composure of the Claude
app, on EU-sovereign rails — for designers, not developers.

---

## Why this exists (the purpose)

European design students increasingly need to make interactive things — portfolios, concepts,
data visualisations — but they aren't coders, and every tool that would help routes their work
through US infrastructure their institution can't fully sanction. MakeMode is the European,
design-school answer: **Claude-Code-grade agent power, wrapped in a surface a designer can use,
on infrastructure that's GDPR-native and EU-hosted end to end.**

The pattern is proven: Anthropic's **Claude Cowork** (Claude Code's power for non-developers,
shipped in ~10 days *using* Claude Code) shows the shape works. MakeMode is that shape pointed at
a specific, underserved, sovereignty-sensitive niche no US tool occupies — **TU Delft design
students first**, then EU design education broadly.

Two buyers, one product: the **student** adopts it free and spreads it by sharing live links;
the **institution** pays, because sovereignty is what lets them say yes.

## Current status (honest, 2026-06-29)

**Works, verified end-to-end:**
- **A WEB version is LIVE and fully Scaleway-hosted (sovereign):**
  **https://makemode-app.s3-website.fr-par.scw.cloud** — frontend on Scaleway Object Storage,
  backend on a Scaleway Function (fr-par), inference + publish on Scaleway. **No US vendor in
  the product path.** Describe → build → live preview → publish to a real EU URL. No install.
- **The make-loop** — describe → a model builds a single-file page → live preview → publish.
  Verified in both the **desktop app** (Tauri, `../makemode-app`) and the web app.
- **Model picker** on arrival — Mistral (fast, default) / Devstral 2 / GLM 5.2, all EU-hosted.
- **Version History** — auto-snapshot every change; roll back to any version.
- **Claude-style sidebar** — your projects, current highlighted, "+ New".
- **Save → GitLab** (desktop) + **Publish → public EU URL** (Scaleway), verified.
- Sovereign stack on **one French vendor (Scaleway)** — hosting + inference + publish = one DPA.

**In progress:**
- **The full opencode *agent* path** (for ambitious multi-file / tool-using work) still needs the
  model-resolution fix (opencode resolves GLM but not Devstral). The simple make-loop is
  unblocked by calling Scaleway directly; the agent is the next tier for bigger tasks.

**Not started (deliberately — these gate the pilot, not the build):**
- Pilot with a TU Delft studio · grant submissions · signed DPAs · lawyer review of `legal/`

## The stack

- **Agent engine:** [opencode](https://opencode.ai) (open source), run headless
- **Model:** GLM 5.2 (open weights) on Scaleway/France; Devstral 2 is the intended snappier
  default once it resolves in opencode
- **Code host:** GitLab (gitlab.com today → institutional gitlab.tudelft.nl)
- **Publish host:** Scaleway Object Storage (fr-par) static hosting
- **Shell:** desktop app (Tauri) — the MakeMode UI in front of the engine

## Documentation map

Start here, then go to the doc for the question you have:

**Why & vision**
- [STRATEGY.md](STRATEGY.md) — how MakeMode wins; the phased arc with gates
- [USER-JOURNEYS.md](USER-JOURNEYS.md) — the student's end-to-end journey (the emotional arc)

**How we execute**
- [PLAYBOOK.md](PLAYBOOK.md) — team, funding doors, sales motion, 90-day plan
- [TABLE-STAKES.md](TABLE-STAKES.md) — the definition-of-done for "ready to pilot"
- [AGENT-TEAM.md](AGENT-TEAM.md) — running the venture as a fleet of AI agents

**Product & UX**
- [UX-FLOWS.md](UX-FLOWS.md) — the core flows + the Claude/Lovable/Cowork north stars
- `../makemode-app/shell-prototype.html` — the working shell prototype (open in a browser)
- `../makemode-app/PROGRESS.md` — what the app does today

**Legal & sovereignty**
- [LEGAL-COMPLIANCE.md](LEGAL-COMPLIANCE.md) — the full legal/policy/certifications checklist
- [DATA-FLOW.md](DATA-FLOW.md) — the GDPR sub-processor map (the 3 DPAs)
- [legal/](legal/) — v0 Privacy Policy, ToS, AI-transparency notice (DRAFTS, for counsel)
- [verification/](verification/) — sovereignty verification + EU inference alternatives

**Money**
- [GRANTS.md](GRANTS.md) — the non-dilutive funding pipeline

**Marketing site** (deployed)
- `index.html` · `pitch.html` · `calculator.html`

> Early-stage. GLM, GPT-NL, SURF, Mistral, Scaleway and TU Delft are referenced as relevant
> models / infrastructure / institutions, not as endorsements or partners.
