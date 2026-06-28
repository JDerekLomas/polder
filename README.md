# MakeMode

**The sovereign coding agent for European research & education.**

An open-source AI software-engineering agent that runs entirely on European infrastructure — the coding assistant institutions like TU Delft are *actually allowed to use*. GDPR-native, auditable, no US vendor, no data leaving the EU.

- **Client:** [opencode](https://opencode.ai) (open source) + a custom EU provider
- **Model:** GLM 5.2 (MIT open weights) — swappable backend
- **Hosting:** EU gateway today → self-hosted on rented EU GPUs (interactive by day, batch by night)

Marketing concept: https://polder.vercel.app

## Plan
- [#1](../../issues/1) — v0 institutional fork (SURFconext SSO, audit logging, no-telemetry, guardrails)
- [#2](../../issues/2) — MakeMode Gateway: be our own EU inference endpoint

> Early-stage concept. GLM, GPT-NL, SURF and TU Delft are referenced as relevant models/infrastructure/institutions, not as endorsements or partners.

## This repo
- `index.html` — the marketing landing page (static, deployed to Vercel)
