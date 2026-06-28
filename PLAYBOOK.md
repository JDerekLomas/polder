# Polder — Execution Playbook

> The canonical "how we actually build and ship this" doc for Derek + Emma.
> Living document — update as milestones land. For the product/status overview see
> `polder-app/PROGRESS.md`; for the concept and pitch see `index.html` / `pitch.html`.

## The one sentence everything serves

**A non-coding TU Delft design student logs in, builds something with an AI agent,
and publishes a shareable link — zero setup, all on infrastructure the institution
can approve.**

Everything below is whatever makes that sentence true and defensible.

## The business shape (read this first)

Polder is a **two-sided motion, not a classic SaaS sale.** Students adopt it for
free and spread it by sharing live links; the **institution pays** for the managed
workspace. Early on, "sales" and "fundraising" are the same activity: landing
TU Delft as a lighthouse customer is simultaneously the proof, the revenue, and the
fundraising story.

Growth engine = **students sharing published links from crits.** That's why the
public-URL (Scaleway) blocker is the highest-leverage thing to unblock before any
pilot.

---

## 1. The concept map (five bands)

```
WHY:   a coding agent for non-coders, on infra Europe can approve

STUDENT SEES:  log in → make → see it → save → share
                  │       │       │       │       │
RUNS ON (EU):  GitLab   GLM5.2  preview  GitLab  Scaleway
               OAuth    EUrouter         (auto)  (public URL)
                  │
WRAPPED IN:    Tauri desktop shell + CO2/cost trust HUD
                  │
STOOD UP ONCE: institution registers OAuth, bucket, SSO,
               compliance, + a faculty sponsor
                  │
GROWS BY:      students sharing live links from crits
```

**Reality check:** product + stack + shell are built and locally verified. The two
unlit *features* (live GitLab login, public sharing) are blocked by **arrangement,
not code** — a registered GitLab OAuth app and a Scaleway bucket. Growth is blocked
by one faculty sponsor.

---

## 2. Team & roles

**Now: Derek + Emma.**

- **Derek — outward & commercial.** Sovereignty narrative, grants/fundraising, the
  institutional deal, product direction. The front of the company.
- **Emma — TU Delft + AI/product.** Recent TU Delft grad, strong at AI, works with a
  TU Delft AI initiative. Owns the faculty/AI-initiative relationship (warm path to
  the sponsor), agent/model quality, and is the credible face to students & faculty.

**Emma de-risks the single hardest blocker:** landing a faculty sponsor goes from
cold outreach to a warm intro. The AI initiative is a potential combined
**pilot host + grant co-applicant + credibility stamp** — treat it as a first-class
partner.

### Hiring sequence (triggered by milestone, not calendar)

1. **Product/UX designer** — trigger: sponsor secured, pilot scheduled. *Highest-
   leverage hire; the differentiator is experience, not capability.*
2. **Desktop/integration engineer** — trigger: pilot demand or first paid contract.
   Owns the Tauri/GitLab/Scaleway glue that survives 30 students. *Slips later only
   if Emma can harden it herself — see Open Question 2.*
3. **Fractional Dutch tech lawyer** (retainer) — trigger: **now.**
4. **BD / institutional partnerships** — trigger: second institution in pipeline.
5. **Infra/security, DPO** — trigger: moving past non-confidential data, or an
   institution's security review demands it.

---

## 3. Funding — three doors, deliberate order

**Door 1 — Non-dilutive / grants (lead with this).** Sovereignty + EU + education is
exceptionally grant-friendly. Targets: EU sovereign-tech / digital-autonomy funds,
Dutch innovation money (RVO / WBSO), TU Delft valorization/innovation funds, SURF
pilot funding, NGI / EU Horizon education calls. Funds *and* validates without
dilution. Ideally co-submitted with the TU Delft AI initiative.

**Door 2 — Lighthouse revenue (strongest proof).** TU Delft pilot → paid
managed-workspace contract. One signed institutional deal beats a deck of
projections.

**Door 3 — Equity (later, optional).** EU deep-tech / sovereignty-thesis angels &
pre-seed. Walk through *after* pilot evidence + ideally a grant, so you raise from
strength. Raising too early sells the company cheap and puts a growth clock on a
trust-built mission.

> **Fork to decide consciously:** grant-and-customer-funded (slower, non-dilutive,
> in control) vs. VC-backed (faster, dilutive, hyper-growth pressure). Recommendation
> for a sovereignty/education play: lead non-dilutive, treat equity as post-PMF fuel.

---

## 4. Sales motion (land → prove → expand)

1. **Land a sponsor** — one IDE faculty member (warm via Emma / the AI initiative).
2. **Run one course as the pilot** — free for students, fully set up by us.
3. **Instrument it** — students activated, projects published, links shared in crits,
   time-to-first-published-thing, "couldn't have made this otherwise" quotes. This
   dataset = sales deck + grant report + VC traction slide, simultaneously.
4. **Convert** — sponsoring department → first paid managed-workspace contract.
5. **Expand** — second course → faculty → second institution (TU/e, EU design schools).

---

## 5. Legal & policy checklist

**DPA is three relationships, not one:**

1. **Polder ⇄ TU Delft** — they are *controller*, we are *processor*; sign their DPA.
   This gates the pilot contract.
2. **Polder ⇄ each sub-processor** — DPA *from* **Scaleway, the EUrouter/GLM host,
   SURF.** The GLM DPA is the most important document we own — it's the written
   guarantee that prompts/code stay in the EU and aren't retained/trained on. The
   whole sovereignty claim is only as strong as this.
3. **Public sub-processor list** disclosing all three.

**v0 blockers (no student onboards without these):**
- Privacy Policy (external)
- Terms of Service / EULA + Acceptable Use Policy
- AI transparency notice (EU AI Act limited-risk: users know output is AI-generated)
- OSS license compliance (NOTICE/attribution for opencode + deps; confirm commercial
  redistribution of the bundled binary is permitted)

**Before/at the TU Delft contract:**
- The three DPAs above
- DPIA (TU Delft's job as controller; we supply inputs — may be required even for v0)
- Records of Processing (RoPA, Art. 30) — internal register
- Information Security Policy (their security questionnaire will demand it)
- Data retention & deletion policy + incident/breach response policy (72h notification)
- International transfer assessment (confirm no EU exit on GLM path; SCCs only if one)

**Lower-cost, do early:**
- Trademark (Polder/Terp); entity (Dutch BV); IP assignment from every contributor;
  contractor NDAs
- Accessibility statement (European Accessibility Act — education tools in scope)
- Cookie/analytics notice on the marketing site

**On Arvind (TU Delft legal) — conflict flag:** if Arvind represents TU Delft, he sits
*across the table* from us on the DPA, not on our side. Great relationship for the
institutional/DPIA/procurement side and for telling us what TU Delft will require —
but we still need **our own** counsel for entity, ToS/privacy policy, OSS audit, and
*negotiating* that DPA. He can't ethically be both. Clarify his role before relying on
him for our-side work.

---

## 6. The next 90 days

**Weeks 1–2 — unblock + foundations**
- Derek: provision **GitLab OAuth app** + **Scaleway bucket** (the two keys).
- Engineer/Emma: light up live GitLab login + public sharing.
- Emma: map the AI initiative as pilot host + grant co-applicant; line up faculty intro.
- Derek: retain Dutch tech lawyer; kick off OSS audit + Privacy Policy/ToS. File trademark.

**Weeks 3–6 — lock the pilot**
- Convert Emma's warm intro into a committed pilot course (or pilot *inside* the AI
  initiative directly, skipping the cold-sponsor step).
- Stand up the managed workspace for that cohort.

**Weeks 6–10 — run + instrument**
- Run the pilot. Collect published links + quotes + activation metrics.

**Weeks 10–13 — package**
- Grant submission (ideally co-submitted with the AI initiative).
- One-page institutional offer to convert the department to paid.
- Seed of an investor narrative *if* pursuing Door 3.

**End state:** a live cohort, links spreading, one grant in flight, a paid-contract
conversation open — positioned to stay non-dilutive or raise from strength.

---

## Open questions (resolve to finalize the plan)

1. **Can the TU Delft AI initiative host a pilot or co-apply for a grant** — does it
   have budget / cohorts / faculty backing, or is it just Emma's affiliation?
2. **How strong is Emma's engineering** — can she harden the pilot herself, or is the
   integration engineer the actual first hire alongside the designer?
3. **Funding fork** — lead non-dilutive (grants + lighthouse revenue) or pursue an
   equity raise soon? (Recommendation: non-dilutive first.)
4. **Arvind's role** — confirm whether he's available as *our* counsel or only as
   TU Delft's side; if the latter, line up independent counsel.
