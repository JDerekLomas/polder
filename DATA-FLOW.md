# MakeMode — Data Flow & Sub-Processor Map

> Input for: our counsel, the three DPAs, TU Delft's DPIA, and the grant's
> sovereignty section. Companion to `PLAYBOOK.md` §5 (Legal).
> **Status: first-pass. Items marked ⚠️ CONFIRM are claims we assert but have not yet
> verified contractually — these are exactly what the DPAs must pin down.**
>
> **DECISION (2026-06-28): inference moved to Scaleway Generative APIs (France).** The
> app defaults to **GLM 5.2** (open weights, EU-hosted on Scaleway's Paris region), with
> **Devstral 2** (Mistral, fully French provenance) available as an option. This
> **consolidates inference and publishing onto one French EU vendor (Scaleway) under a
> single GDPR DPA** and removes the EUrouter router-opacity problem. Net effect on this
> map: the "EUrouter/GLM host" sub-processor below is replaced by **Scaleway** for *both*
> inference and publishing. **Provenance note:** the default (GLM) is Chinese-origin open
> weights — EU-*hosted*, so the data path is sovereign. A fully-EU-provenance default
> (Devstral 2, Mistral/FR) is the intended end state but the opencode engine doesn't yet
> resolve it (`ProviderModelNotFoundError`) — a tracked fix, not yet a config flip.
> EUrouter retained as a documented alternative (`verification/eu-inference-alternatives.md`).
> Sub-processor DPA to sign: **Scaleway** (standard, published).

## Who's who under GDPR

| Party | Role | Why |
|---|---|---|
| **Student** | Data subject | The person making projects |
| **TU Delft** | Controller | Decides the tool is used, owns the relationship to the student |
| **MakeMode** | Processor (for TU Delft) | Operates the tool on TU Delft's behalf |
| **EUrouter / GLM host** | Sub-processor | Runs inference on prompts/code |
| **Scaleway (fr-par)** | Sub-processor | Hosts published projects + stored project data |
| **GitLab (gitlab.tudelft.nl)** | TU Delft infra | Code host; *TU Delft's own system*, not our sub-processor |
| **SURF (SURFconext)** | Sub-processor / IdP | Identity (later phase) |

> Note: institutional **GitLab is TU Delft's own infrastructure**, which is a
> sovereignty *advantage* — that data never leaves the institution and isn't our
> sub-processor relationship to paper.

## What data exists

- **Identity:** name/email or institutional ID (via GitLab OAuth → later SURFconext).
- **Prompts & generated code:** what the student types to the agent + what it produces.
- **Project files:** the actual source/assets of their project.
- **Published artifacts:** the built static site behind a public URL.
- **Telemetry:** cost/token/CO₂ readings (local; aim to keep non-personal).

## The flow, step by step

```
STUDENT
  │ 1. LOG IN ──────────► GitLab OAuth (TU Delft instance)        [TU Delft infra]
  │                        → identity token only
  │
  │ 2. MAKE  ───────────► EUrouter / GLM host                     [⚠️ sub-processor]
  │                        → prompts + code context leave the device
  │                        → ⚠️ CONFIRM: EU-hosted, no retention, no training
  │
  │ 3. SEE IT ──────────► local preview server                    [on-device]
  │                        → no data leaves the machine
  │
  │ 4. SAVE  ───────────► gitlab.tudelft.nl                       [TU Delft infra]
  │                        → project commits, stays in institution
  │
  │ 5. SHARE ───────────► Scaleway Object Storage (fr-par)        [sub-processor]
  │                        → built artifact becomes a public EU URL
  │
  └─ Telemetry ─────────► local HUD only                          [on-device, aim non-personal]
```

## The three DPAs this map produces

1. **TU Delft ⇄ MakeMode** (we are processor). Their DPA; lists our sub-processors
   (EUrouter/GLM, Scaleway, SURF). Gated by everything below being true.
2. **MakeMode ⇄ EUrouter/GLM host** (sub-processor). **The critical one.** Must
   contractually guarantee:
   - ⚠️ Inference runs on **EU-located** infrastructure (which country, which entity).
   - ⚠️ **No retention** of prompts/code beyond the request.
   - ⚠️ **No training** on customer data.
   - ⚠️ **No onward transfer** outside the EU (the GLM provenance concern — model
     weights being Chinese-origin is fine *if the hosting and data path are EU and
     contractually sealed*; confirm the data never reaches a non-EU endpoint).
3. **MakeMode ⇄ Scaleway** (sub-processor). Scaleway publishes a standard GDPR DPA;
   confirm fr-par region pinning + retention/deletion terms.

## The honest sovereignty line (for the pitch & the grant)

> "Identity and code stay on TU Delft's own GitLab. Inference runs EU-hosted with a
> contractual no-retention / no-training / no-EU-exit guarantee. Publishing lands on
> EU object storage. No US vendor touches student data."

This line is **only true once the ⚠️ items are confirmed in writing.** Until then it's
the target, not a fact — don't put it on the site as a guarantee yet.

## Open confirmations (assign + close these)

> **Scout verification (see `verification/glm-sovereignty.md`):** app endpoint is
> `https://api.eurouter.ai/api/v1`, model `eurouter/glm-5.2`. Operator = **EUrouter B.V.
> (NL, KVK-registered)** — an EU, GDPR-bindable entity. EUrouter is a *router*, and
> GLM-5.2's only two upstreams are EU-hosted (**Tensorix, Ireland** / **Regolo, Italy**),
> both zero-retention. Published terms claim EU-only processing + zero retention + no
> training. **But:** region is a routing *default* not a hard pin; the privacy policy
> allows EEA-exit under SCCs; no explicit no-forward-to-non-EU-origin guarantee for GLM.
> **Verdict: ASPIRATIONAL, credible path to TRUE — keep the ⚠️ markers until the DPA is
> signed.** 11 specific DPA questions are listed in the verification file.

- [~] EUrouter/GLM: hosting country, legal entity, retention policy, training policy,
      data-residency clause. *Partially verified (above); closes on signed DPA.*
- [ ] Scaleway: confirm fr-par pinning + DPA + deletion SLA.
- [ ] Telemetry: verify CO₂/cost data is non-personal (no prompt content) so it stays
      out of scope.
- [ ] SURFconext: data shared at SP registration (later phase).

## Future services & modalities (all kept on Scaleway = same DPA)

The sovereignty model scales cleanly: each new capability is either already on Scaleway
(same France hosting, **same single DPA — no new sub-processor**) or, if not, another
EU-hosted provider (one more sub-processor DPA — same playbook as the inference DPA).

- **Transactional email** (share/invite/"your site is live" emails) → **Scaleway
  Transactional Email (TEM)** — the chosen provider. France-hosted, same vendor, same DPA.
  (French alternatives if ever needed: Brevo, Mailjet. Avoid US: Resend/Postmark/SendGrid.)
- **Vision / image understanding** → **Pixtral 12B** on Scaleway (same DPA) — already available.
- **Speech-to-text** → **Whisper / Voxtral** on Scaleway (same DPA) — already available.
- **Image *generation* (text→image)** → the one gap. Not on Scaleway today. Target: **FLUX**
  (Black Forest Labs, German/EU-origin) on an EU host → one more sub-processor DPA.
- **Hosting / compute / storage / secrets** → all Scaleway already (Object Storage,
  Serverless Functions, Secret Manager — all fr-par).
