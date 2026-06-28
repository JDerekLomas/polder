# MakeMode — Legal, Policy & Certifications Checklist

> The full list. Owner: Derek + fractional Dutch tech lawyer. Companion to
> `DATA-FLOW.md` (the sub-processor map) and `PLAYBOOK.md` §5.
> Staged by when it bites: **[v0]** = before any student onboards · **[contract]** =
> before/at the TU Delft deal · **[scale]** = before expanding past non-confidential
> design-student data.

## A. Corporate & foundational

- [ ] **[v0]** Entity — Dutch **BV** (EU entity is itself part of the sovereignty story)
- [ ] **[v0]** KvK (Chamber of Commerce) registration + VAT/BTW registration
- [ ] **[v0]** Founder / shareholder agreement (Derek + Emma; vesting)
- [ ] **[v0]** **IP assignment** from every contributor (founders included) — company owns the code
- [ ] **[v0]** Contractor NDAs + IP-assignment clauses for anyone who touches the code

## B. Data protection (GDPR)

**The three DPAs** (detail in `DATA-FLOW.md`):
- [ ] **[contract]** TU Delft ⇄ MakeMode DPA — we are *processor*; sign their paper
- [ ] **[v0]** MakeMode ⇄ **EUrouter/GLM host** DPA — *the critical one*: EU-hosting,
      no-retention, no-training, no-EU-exit. Whole sovereignty claim rests here
- [ ] **[v0]** MakeMode ⇄ **Scaleway** DPA — confirm fr-par pinning + deletion SLA
- [ ] **[v0]** Public **sub-processor list**

**Policies & registers:**
- [ ] **[v0]** Privacy Policy (external, student-facing)
- [ ] **[contract]** Records of Processing Activities (RoPA, Art. 30) — internal register
- [ ] **[contract]** **DPIA** — TU Delft's duty as controller; we supply inputs (may be
      required even for v0)
- [ ] **[v0]** Data retention & deletion policy
- [ ] **[v0]** Data breach / incident response policy (72-hour notification, Art. 33/34)
- [ ] **[v0]** International transfer assessment — confirm no EU exit on the GLM path;
      SCCs only if one exists
- [ ] **[scale]** Appoint a **DPO** (or document why not required) when handling
      higher-sensitivity data

## C. EU AI Act

- [ ] **[v0]** **Risk classification** — document that MakeMode is **limited-risk**
      (a prototype-building assistant), not high-risk
- [ ] **[v0]** **AI transparency notice** — users must know output is AI-generated
- [ ] **[v0]** Confirm **GPAI obligations sit with the model provider** (GLM host), not us;
      we carry only downstream-deployer transparency duties
- [ ] **[scale]** ⚠️ **High-risk trap** — if the tool ever touches **student
      assessment/grading**, that can flip it to high-risk (conformity assessment, CE
      marking, EU-database registration). Keep it on the "making things" side and
      document the boundary

## D. Certifications & security standards

> Honest staging: a **v0 pilot with non-confidential design-student data does not
> require formal certification** — but TU Delft's security review will still ask for
> policies. Be *"ISO 27001-aligned"* (have the controls/policies written) for the pilot;
> pursue actual certification (6–18 months, costly) only when scaling/selling broadly.

- [ ] **[contract]** **Information Security Policy** + control set — written, ISO 27001-
      aligned. This is what the security questionnaire actually checks
- [ ] **[contract]** Be ready for TU Delft's **vendor security assessment** (SURF
      Vendor Assessment / HECVAT-style questionnaire) — they will send one
- [ ] **[contract]** **SURFaudit / Normenkader Informatiebeveiliging HO** — the Dutch
      higher-ed security baseline institutions map vendors against. Know it
- [ ] **[scale]** **ISO/IEC 27001** certification (information security mgmt) — the
      gatekeeper cert for institutional SaaS at scale
- [ ] **[scale]** **ISO/IEC 27701** (privacy info mgmt, extends 27001) — GDPR-aligned
- [ ] **[scale]** **ISO/IEC 27017 / 27018** (cloud security / PII-in-cloud) — if we
      operate cloud infra directly
- [ ] **[scale, health only]** **NEN 7510** — Dutch health-info security standard, *only*
      if expanding into medical/health research data
- [ ] Note: **SOC 2** is US-oriented; for an EU-sovereignty pitch prefer ISO 27001.
      Pursue SOC 2 only if a specific customer demands it

## E. Accessibility

- [ ] **[v0]** Design to **EN 301 549 / WCAG 2.1 AA** — the European Accessibility Act
      covers education tools; cheaper to build in than retrofit
- [ ] **[contract]** Publish an **Accessibility Statement**

## F. Product / commercial agreements

- [ ] **[v0]** Terms of Service / EULA
- [ ] **[v0]** Acceptable Use Policy (student-facing)
- [ ] **[v0]** **AI output ownership & liability** clause — who owns generated code,
      warranty disclaimer on AI output
- [ ] **[v0]** **OSS license compliance** — audit `opencode` + all deps; NOTICE/
      attribution file; confirm commercial redistribution of the bundled binary is
      permitted (copyleft reach check)
- [ ] **[contract]** SaaS / institutional agreement + SLA with TU Delft
- [ ] **[scale]** Cyber + professional liability insurance (procurement often requires it)

## G. Brand & site

- [ ] **[v0]** Trademark search + registration (MakeMode); secure domains
- [ ] **[v0]** Cookie / analytics notice on the marketing site (if it tracks)

## Conflict flag — Arvind (TU Delft legal)

If Arvind represents **TU Delft**, he sits *across the table* on the DPA and **cannot**
also be our counsel for the entity, our ToS/Privacy Policy, the OSS audit, or
*negotiating* that DPA. Use him as the inside read on what TU Delft will require; retain
**independent** Dutch tech counsel for our-side work.

## The 5 things that actually gate the pilot

Everything above matters eventually, but only these block a v0 pilot:
1. BV + IP assignment (A)
2. Privacy Policy + ToS + Acceptable Use + AI transparency notice (B, C, F)
3. The **GLM-host DPA** with the no-retention/no-training/no-EU-exit guarantee (B)
4. OSS license audit of opencode (F)
5. A written, ISO-aligned Information Security Policy for TU Delft's questionnaire (D)

The rest (DPIA, RoPA, ISO certification, SURFconext, NEN 7510) is contract- or
scale-stage — real, but not in front of shipping.
