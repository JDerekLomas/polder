# MakeMode — Strategy & Timeline

> The winning logic and the phased arc. Sits above `PLAYBOOK.md` (how) and the workstream
> docs. Dates anchored to June 2026.

## The thesis — how MakeMode wins

1. **Start where there's no wall.** The beachhead — non-coding TU Delft design students —
   is underserved (no GUI agent built for them), their data is **non-confidential** (no
   compliance wall blocks v0), and access is **warm** (Emma + the AI initiative). Win here
   on **UX**, not on sovereignty the student feels.
2. **Two buyers, one product.** The student adopts for free and spreads it by sharing live
   links; the **institution pays**, and for the institution *sovereignty is the
   procurement key* — the reason they're allowed to say yes. Sales and fundraising are the
   same motion early: land TU Delft = proof + revenue + grant story at once.
3. **Land and expand, deliberately up-market.** One course → faculty → institution →
   second institution → EU design schools → **eventually higher-sensitivity research**,
   where sovereignty *is* felt and the value is highest. Ship where it's easy; climb
   toward where it's valuable.
4. **Two moats that US incumbents can't cheaply copy:**
   - **Institutional integration depth** — GitLab, SURFconext, the managed workspace.
     Sticky, sanctioned, hard to rip out.
   - **An open-source EU sovereign stack** — grant-funded, community-credible, and
     impossible for a US vendor to match without gutting their own model/hosting economics.
5. **Operating leverage = two founders + an agent fleet.** Near-zero burn, long runway,
   so you can **stay non-dilutive and keep control** (see `AGENT-TEAM.md`).

## Why now

- EU digital sovereignty is **politically funded** right now (Sovereign Tech Fund, NGI,
  AiNed, Growth Fund).
- The **AI Act** is creating real procurement pressure against US-hosted tools in public
  institutions.
- **Open weights** (GLM) are finally good enough, and **coding agents** (opencode) have
  matured — the substrate exists to wrap rather than build.
- Universities are **actively hunting** for AI tools they're allowed to use.

## The timeline

Each phase has a **gate** — the single thing that must be true to enter the next.

### Phase 0 — Foundation & Unblock · now → end Q3 2026 (Jul–Sep)
Build is done; this phase is *arrangement*. Provision the three keys (sponsor via Emma,
GitLab OAuth app, Scaleway bucket); light up the two blocked features; draft v0 legal
(Privacy/ToS/AI-notice, OSS audit); **verify the GLM sovereignty claims**; draft WBSO +
Sovereign Tech Fund.
- **Single metric:** the GLM-host no-retention/no-EU-exit guarantee confirmed.
- **Gate → P1:** pilot course committed + both features live + sovereignty claim verified.

### Phase 1 — Pilot · Q4 2026 (Oct–Dec)
Run one IDE course (or run it *inside* the AI initiative). Free for students, set up by
founders. Instrument relentlessly.
- **Single metric:** number of student projects **published and shared** in crits.
- **Gate → P2:** an evidence dataset (activation, published links, quotes) + students
  actually sharing.

### Phase 2 — Prove & Fund · Q4 2026 → Q1 2027
Convert the sponsoring department to the **first paid managed-workspace contract**. Submit
grants from strength (NLnet reopened, AiNed, Sovereign Tech Fund). Turn pilot evidence
into case studies.
- **Single metric:** first signed institutional contract.
- **Gate → P3:** one paid contract **and** ≥1 grant secured.

### Phase 3 — Expand & (optionally) Raise · 2027
Second faculty, then second institution (TU/e, EU design schools). Decide the funding fork
**from strength**: stay non-dilutive, or take equity to accelerate. First human hires by
trigger — integration engineer, then BD.
- **Single metric:** second institution in pipeline.
- **Gate → P4:** 2nd institution live + funding sustainable.

### Phase 4 — Institutionalize & Climb · 2027–2028
Build the full **managed EU workspace** (students set up nothing); add **SURFconext** SSO;
**harden compliance** (DPIA, ISO 27001, the sub-processor wall) — precisely to climb from
design students toward **higher-sensitivity research**, the high-value market where
sovereignty is the whole point. This is where the early "honest trade" gets repaid.
- **Single metric:** first higher-sensitivity (research) workspace live.

## Strategic risks → mitigations

| Risk | Mitigation |
|---|---|
| **GLM-host DPA fails** — can't get EU/no-retention guarantee → claim is hollow | Scout verifies in Phase 0, *before* the claim ships; fallback to another EU-hosted model or self-host on rented EU GPUs |
| **Sponsor dependency** — one professor is a single point of failure | Use the AI initiative as institutional host; cultivate >1 faculty contact |
| **Sovereignty isn't felt by the student** — adoption must be won purely on UX | Relentless UX focus (Designer agent); lean on sanction + the share-loop, not the sovereignty story, for student pull |
| **US incumbent ships an EU-hosted version** — commoditizes sovereignty | Integration depth + open-source + institutional trust are the durable moats; move fast while the window is open |
| **AI Act grading trap** — touching assessment flips it to high-risk | Documented boundary; stay firmly on the "making things" side |

## The one-line strategy

**Ship a beautiful coding agent to the EU niche that has no compliance wall, win it on UX,
let shared links spread it, get the institution to pay because sovereignty unlocks
procurement — then use that beachhead, its evidence, and non-dilutive funding to harden
compliance and climb toward the high-value research market where sovereignty truly bites.**
