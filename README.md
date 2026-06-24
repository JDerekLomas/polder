# Polder

**The sovereign coding agent for European research & education.**

Polder is an open-source AI software-engineering agent that runs entirely on European
infrastructure. The goal: give institutions that *cannot* use US-hosted assistants
(GitHub Copilot, Claude Code) a coding agent they are actually allowed to deploy —
GDPR-native, auditable, self-hostable, no data leaving the EU.

🔗 Live concept site: https://polder.vercel.app

## Why

European universities and research groups hit a wall with US-hosted AI coding tools:

- Source code, research data and prompts leave the EU (US CLOUD Act / Schrems II).
- No DPA they can sign; procurement says no.
- Student and research data fall under GDPR.
- A standing mandate to reduce dependence on US Big Tech.

The capability gap isn't the problem — *permission* is. Polder is the tool they're allowed to use.

## The stack

Polder is a thin, transparent layer — **not a hard fork** — over a proven open-source agent,
assembling three swappable open layers:

| Layer | Today | Roadmap |
|-------|-------|---------|
| Agent (UI / tools) | [opencode](https://opencode.ai) | — |
| Model (open weights) | Mistral (Codestral / Large) · GLM 5.2 | GPT-NL, OpenGPT-X/Teuken |
| Compute (EU) | EU API gateway | SURF / EuroHPC · on-prem |

European-origin models (Mistral) are the default for the sovereignty story; larger
open-weight models can be self-hosted where the GPUs exist.

## Deployment tiers

- **Tier 0 — Gateway:** EU-hosted API endpoint. Live in days. Pilot path.
- **Tier 1 — National hosting:** model served on SURF / EuroHPC academic compute.
- **Tier 2 — On-prem / air-gapped:** your own cluster, nothing leaves the network.

## Status

Early-stage concept. This repo currently holds the marketing/concept site.
The agent distribution (provider abstraction, SSO, audit logging, policy guardrails)
is the proposed v0 — see `docs/` (coming soon).

## Disclaimer

"Mistral", "Codestral", "GLM", "GPT-NL", "SURF", "SURFconext", "EuroHPC" and "TU Delft"
refer to third-party models, infrastructure and institutions; names and trademarks belong
to their respective owners and are referenced for context, not as endorsements or partnerships.
