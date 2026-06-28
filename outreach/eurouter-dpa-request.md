# Outreach — EUrouter B.V. data-residency / DPA request

> Ready-to-send email to EUrouter B.V. Converts the 11 DPA questions from
> `verification/glm-sovereignty.md` §6 into a vendor-friendly request. Posture: a paying
> pilot customer doing institutional due diligence (gets fuller answers than a legal
> demand). Send from Derek. Fill the [brackets] before sending.
>
> **To:** [EUrouter support / privacy contact — privacy@eurouter.ai or support@eurouter.ai]
> **Subject:** Data residency & DPA request — EU university pilot on GLM-5.2

---

Hello EUrouter team,

I'm building **Polder**, a coding-agent desktop app for European universities that runs
on EUrouter — our pilot routes the `glm-5.2` model through `api.eurouter.ai`. Our first
deployment is with design students at **TU Delft**, and because we sell into public
institutions, EU data residency and a signed DPA are hard requirements for us, not
nice-to-haves. Your published EU-only / zero-retention / no-training terms are exactly why
we chose you — I'd like to confirm a few specifics in writing and get a countersigned DPA
in place.

Could you help with the following? I've grouped them; happy to jump on a call.

**1. Hosting & routing (GLM-5.2)**
- Which upstream providers can `glm-5.2` be routed to, and the physical country + data-
  centre operator for each? (We understand the set to be Tensorix/Ireland and
  Regolo/Italy via Seeweb — please confirm and complete.)
- Can our API key be **hard-pinned** so GLM-5.2 only ever reaches named EU/EEA upstreams,
  **including under load-balancing and failover** — with no fallback to any non-listed or
  US-controlled provider (e.g. Bedrock, Foundry)?
- Written confirmation that GLM-5.2 inference **executes on the upstream's own EU GPUs**
  and that **no request, prompt, code, output, or derivative is ever forwarded to a non-EU
  endpoint — including Z.ai or any China-based GLM API** — at any point, including failover
  or debugging.

**2. Retention**
- Confirm **zero retention** of prompt/code/output content at EUrouter and at each GLM
  upstream. For any logs/metadata retained, the retention window and the field list.
- Is zero-retention **architectural or contractual** at each layer? Please describe the
  mechanism (ephemeral compute, no disk persistence, log scrubbing).

**3. Training**
- A written guarantee that **no input/output data is used to train, fine-tune, or improve
  any model**, binding on EUrouter and each upstream and their sub-processors.

**4. EU exit**
- Your Terms say processing is "exclusively within the EU/EEA," while the privacy policy
  permits transfers outside the EEA under SCCs/adequacy. Can you confirm **prompt/code
  content never leaves the EU/EEA**? If any *metadata* can, please list exactly what and
  under which safeguard.
- The **full sub-processor list** for EUrouter and for each GLM upstream (including DC
  operators such as Seeweb), with countries.

**5. Contract & operations**
- Your **signed DPA** (Art. 28 GDPR) — controller/processor roles, SCCs if any, audit
  rights, breach notification, sub-processor change notice, and deletion-on-termination.
- The **legal entity + jurisdiction** for each upstream, and confirmation each will flow
  these terms down (back-to-back DPA).
- For our pilot key: please confirm it is **budget-capped, rotatable, and pre-configured**
  with the EU/EEA country whitelist + zero-retention + training-opt-out settings, and
  share the exact settings currently on our key.

This is for a live pilot, so a quick turnaround would be a big help — even partial answers
while the DPA is prepared. Thank you,

[Derek Lomas]
[Polder — title]
[email] · [phone]

---

### Notes for Derek (not part of the email)
- The three answers that actually gate shipping the sovereignty claim are **1c (no proxy
  to non-EU origin), 1b (failover pin), and 4 (content never leaves EEA).** If any of
  those comes back soft, trigger the fallback in `verification/glm-sovereignty.md` §5
  (route direct to a named EU host, switch default to Mistral-FR, or self-host).
- If they won't sign a DPA or won't hard-pin routing, that's decisive — don't build the
  sovereignty pitch on a router you can't contractually constrain.
