# GLM / EUrouter Sovereignty Verification

> Scout report — verifies the inference-layer sovereignty claim that the whole MakeMode
> value proposition rests on (see `STRATEGY.md` dominant risk + `DATA-FLOW.md` step 2).
> Method: read the shipped app config (ground truth) + public web sources for EUrouter
> and its GLM upstreams. Date: 2026-06-28.
>
> **Bottom line (one line):** The sovereignty claim is **PLAUSIBLE-BUT-UNVERIFIED /
> ASPIRATIONAL** — the configured path points at a real Netherlands-registered EU
> gateway (EUrouter B.V.) that publishes EU-residency, zero-retention, no-training terms
> and routes GLM-5.2 only to two EU-hosted upstreams (Tensorix/IE, Regolo/IT); but none
> of it is yet contractually bound to MakeMode, the "no data ever leaves the EU" guarantee
> has one unresolved tension (privacy policy allows EEA-exit under SCCs) and one
> unconfirmed link (whether the GLM weights run on the upstreams' own EU GPUs vs. proxy
> to a non-EU origin). It becomes TRUE only after the DPA below is signed.

---

## 1. What the app actually points to (ground truth from the code)

Source of truth: `/Users/dereklomas/polder-app/src-tauri/src/lib.rs` (`seed_engine`, lines 75–115).
On first run the shipped build writes this opencode engine config:

- **Provider id:** `eurouter`  (display name "EUrouter (EU-hosted)")
- **Base URL / endpoint:** `https://api.eurouter.ai/api/v1`  (OpenAI-compatible, via `@ai-sdk/openai-compatible`)
- **Default model:** `eurouter/glm-5.2`  (display "GLM 5.2 (EU)", 1M ctx / 131k out)
- **Auth:** a **pilot EUrouter API key baked into the binary** at build time
  (`POLDER_BAKED_KEY_OBFUS`, XOR-obfuscated — see lib.rs lines 137–157). The code's own
  comment admits this "blocks casual extraction, NOT a determined attacker — ship a
  budget-capped, rotatable key. The real fix is a server-side proxy."

**Doc inconsistency to fix:** `polder-app/README.md` says the default provider is
**Mistral** with GLM as an opt-in. The actual shipped code + `PROGRESS.md` default to
**GLM-5.2 via EUrouter**. The code is ground truth; the README is stale. This matters
because the sovereignty story is currently being carried by EUrouter/GLM, not Mistral.

So the entity MakeMode is trusting is **EUrouter**, and behind it, whoever EUrouter routes
GLM-5.2 to.

---

## 2. VERIFIED facts (from credible public sources)

- **EUrouter is a router/gateway, not a single inference host.** It's an OpenRouter-style
  aggregator that fans each request out to an upstream inference provider. (eurouter.ai,
  infrabase.ai, edenai.co.) → *Implication: "where is GLM hosted" = "which upstream did
  EUrouter pick", which is the real question.*
- **Operating legal entity:** **EUrouter B.V.**, registered in the **Netherlands**
  (KVK 42054357), Jacob van Lennepstraat 78H, Amsterdam. (eurouter.ai privacy policy.)
  → An EU entity, GDPR-bindable. Good.
- **GLM-5.2's upstreams on EUrouter are exactly two, both EU-based:**
  - **Tensorix / TensorX** — Irish provider; inference in **Dublin + Helsinki** (marketing
    also cites Frankfurt/Paris); "zero data retention," "no training on prompts,"
    ephemeral enclaves. (eurouter.ai/providers/tensorix, tensorx.ai, cortecs.ai.)
  - **Regolo** — Italian provider; GPUs in **Italian data centers operated by Seeweb**
    (an Italian company under EU law only); architectural (not just contractual) zero
    retention; no training. (regolo.ai, codemotion.com.)
- **EUrouter ToS state (verbatim-quoted by source):** "All processing of Customer data
  through the Service takes place **exclusively within the European Union or the European
  Economic Area**"; "EUrouter applies a **zero data retention** policy to the content of
  API Requests and Outputs by default"; "EUrouter shall **not use Input Data … to train,
  fine-tune, or improve any AI Model**." A **separate DPA is offered** to business
  customers and referenced throughout the ToS.
- **EUrouter privacy policy states:** "By default, we do not store the prompts, inputs,
  uploaded files, outputs and model responses after they have been processed and
  returned"; "your API requests are routed only through AI providers with EU/EEA
  configurations." EUrouter's *own* sub-processors are EU/EEA (Scaleway, Mollie, PostHog
  EU, Cookiebot, Brevo, Sentry EU).
- **GLM weights are open / EU-runnable.** GLM-5.2 is open-weight (lib.rs comment says MIT),
  and the upstreams advertise running it themselves on EU GPUs. A **Z.ai (the Chinese
  GLM maker) announcement confirms a partnership "GLM models are now live on Tensorix,"**
  i.e. Tensorix licenses/hosts the weights — consistent with self-hosting on EU GPUs
  rather than proxying to Z.ai's China API. (x.com/Zai_org.)

→ On the four DATA-FLOW questions, the *public-claim* answers are: **EU-hosted (IE/IT)**,
**no retention**, **no training**, **no EU exit** — and the routing/host facts are
verifiable; the *guarantees* are vendor-stated, see §3–4.

---

## 3. CLAIMED by providers but NOT independently verified

- Zero-retention and no-training are **vendor self-assertions** (EUrouter ToS + Tensorix
  + Regolo marketing). Credible and consistent across three parties, but not audited,
  not certified to us, and not yet contractually owed **to MakeMode**.
- "All processing exclusively within the EU/EEA" (ToS) is asserted but not evidenced with
  a region-pinning mechanism we've inspected.
- Tensorix's "ephemeral enclaves, wiped instantly" and Regolo's "architectural" retention
  are architecture *claims* — plausible, not confirmed by a third party.

---

## 4. UNKNOWNS (resolvable only by a direct contractual / DPA request)

1. **Routing determinism for GLM-5.2.** EUrouter is a router with smart routing +
   automatic failover. We have NOT confirmed that GLM-5.2 traffic is *pinned* to the two
   EU upstreams under all conditions (load, outage, failover). If failover can spill to a
   non-listed provider, the guarantee leaks. The baked pilot key's routing settings
   (country/EEA whitelist, retention window, training opt-out) are configurable per-key —
   **we have not verified how MakeMode's pilot key is configured.**
2. **The GLM origin-proxy question (the Chinese-provenance concern).** Neither Tensorix's
   nor Regolo's public page *explicitly rules out* backend proxying to a non-EU origin
   (e.g. Z.ai's API in China) for GLM specifically. The Z.ai↔Tensorix partnership tweet
   *implies* local hosting, but "GLM live on Tensorix" is not the same as "Tensorix runs
   the weights on its own EU GPUs and never calls Z.ai." **Must be confirmed in writing.**
3. **The privacy-policy EEA-exit clause.** The privacy policy allows transfers outside the
   EEA "under appropriate safeguards (adequacy / SCCs)." This is in tension with the ToS's
   "exclusively within the EU/EEA." We need to know whether that clause can ever touch
   *prompt/code content* (vs. only billing/account metadata). For the sovereignty claim,
   content must never leave; metadata-only exit may be tolerable but should be documented.
4. **Sub-processor chain past the upstream.** Regolo's GPUs are operated by **Seeweb**;
   Tensorix uses unnamed Dublin/Helsinki DC operators. The full sub-processor list under
   EUrouter (and each upstream's own sub-processors) is not public to us.
5. **Whether EUrouter B.V. will actually sign a DPA with MakeMode** on these terms (the ToS
   says a DPA exists for business customers — getting *our* signed copy is the open item).
6. **Key architecture.** A budget-capped baked key is fine for a pilot but is not a
   sovereignty control; the planned server-side proxy (per the code comment + DATA-FLOW)
   is what would let MakeMode *enforce* region/retention rather than *trust* it.

---

## 5. RED FLAGS

- 🟡 **It's a router, not a host.** Sovereignty via a routing layer is only as strong as
  the routing policy. Without a contractual region-pin + failover-pin for GLM-5.2, "EU
  hosted" is a default, not a guarantee. (Mitigated by EUrouter's per-key country/EEA
  whitelist — but only if MakeMode's key is set that way; **unverified**.)
- 🟡 **EEA-exit-under-SCCs clause** in the privacy policy directly undercuts the "nothing
  leaves the EU" line unless we confirm it can't touch prompt/code content.
- 🟡 **GLM origin-proxy not explicitly excluded.** The single biggest substantive risk to
  the "Chinese model but EU data path" story: get a written statement that GLM inference
  executes on the upstream's own EU GPUs and no request (or any derivative) is forwarded
  to a non-EU endpoint, including Z.ai.
- 🟢 **Not a red flag, but note:** AWS Bedrock and Microsoft Foundry appear in EUrouter's
  *overall* provider list (US-HQ companies, EU deployments). They are **not** among the
  two GLM-5.2 upstreams, so they don't touch MakeMode's default path — but they confirm the
  router *can* route to US-controlled entities, reinforcing the need for a hard per-key pin.
- 🟢 **Baked API key** is a security/cost issue (extractable, the code says so), not a
  sovereignty issue per se. Ship it budget-capped + rotatable; replace with the proxy.

**Fallback if the DPA fails** (per STRATEGY.md): route GLM-5.2 directly to a single named
EU host with its own DPA (Regolo/Seeweb-IT or Tensorix-IE) instead of through the router,
OR switch the default to **Mistral** (Mistral AI, FR — already the README's stated EU
default and a first-party EU model), OR self-host GLM weights on rented EU GPUs
(OVHcloud/Scaleway/Exoscale). All three keep the claim intact without EUrouter.

---

## 6. Exact questions for the EUrouter / GLM-host DPA

Hosting & routing
1. For model `glm-5.2`, name **every** upstream provider it can be routed to, and the
   **physical country + data-center/operator** for each. Confirm the set is limited to
   EU/EEA and name them (we believe: Tensorix-IE, Regolo-IT via Seeweb).
2. Can our API key be **hard-pinned** so GLM-5.2 requests *only* ever reach those named
   EU upstreams — including under load-balancing and **failover**? Confirm no fallback to
   any non-listed or US-controlled provider (e.g. Bedrock, Foundry) is possible.
3. Confirm in writing that GLM-5.2 inference **executes on the upstream's own EU GPUs**
   and that **no request, prompt, code, output, or derivative is forwarded to any non-EU
   endpoint, including Z.ai or any China-based GLM API**, at any point including failover
   or debugging.

Retention
4. Confirm **zero retention** of prompt/code/output content at (a) EUrouter and (b) each
   GLM upstream — and provide the retention window for any logs/metadata, with field list.
5. Is zero-retention **architectural or only contractual** at each layer? Provide the
   mechanism (ephemeral compute, no disk persistence, log scrubbing).

Training
6. Written guarantee that **no Input/Output data is used to train, fine-tune, or improve
   any model** — binding on EUrouter *and* each upstream and their sub-processors.

EU exit
7. Reconcile the ToS ("exclusively within EU/EEA") with the privacy policy's
   "transfer outside the EEA under SCCs/adequacy." **Can prompt/code content ever leave
   the EEA?** We require: content never leaves EU/EEA; if any metadata can, list exactly
   what and under which safeguard.
8. Provide the **full sub-processor list** for EUrouter and for each GLM upstream
   (incl. DC operators, e.g. Seeweb), with countries.

Contract & operations
9. Provide EUrouter B.V.'s **signed DPA** (Art. 28 GDPR) with: controller/processor roles,
   SCCs if any, audit rights, breach notification, sub-processor change notice, and
   **deletion-on-termination**.
10. Confirm the **legal entity + jurisdiction** for each upstream (Tensorix Ltd-IE,
    Regolo S.r.l.-IT?) and that each will flow these terms down (back-to-back DPA).
11. Pilot-key specifics: confirm our baked key is **budget-capped, rotatable, and
    pre-configured** with the EU/EEA country whitelist + zero-retention + training-opt-out
    settings. Share the exact settings on our key.

---

## 7. Verdict

**ASPIRATIONAL (currently), with a credible path to TRUE.** The configured endpoint is a
real, Netherlands-registered EU gateway whose published terms and GLM-5.2 routing (two
EU upstreams, IE + IT) *support* every clause of MakeMode's sovereignty line — no US vendor
on the default path, EU hosting, stated zero-retention/no-training, EU-only processing.
But today it rests on **vendor self-assertions and default settings, not a signed DPA**,
and three items must be closed in writing before the line can ship as a guarantee:
(a) hard region+failover pin for GLM-5.2, (b) explicit no-proxy-to-non-EU-origin (the
Z.ai/China concern), and (c) reconciliation of the privacy policy's EEA-exit clause for
content. Until §6 is signed, keep the DATA-FLOW.md ⚠️ markers; do **not** present the
sovereignty line as a fact on the site.

---

### Sources
- App config (ground truth): `/Users/dereklomas/polder-app/src-tauri/src/lib.rs`,
  `polder-app/README.md`, `polder-app/PROGRESS.md`
- https://www.eurouter.ai/privacy · https://www.eurouter.ai/terms ·
  https://www.eurouter.ai/providers · https://www.eurouter.ai/models ·
  https://www.eurouter.ai/models/glm-5.2 · https://www.eurouter.ai/providers/tensorix
- https://regolo.ai/zero-data-retention/ · https://regolo.ai/zero-data-retention-llms-why-it-matters/ ·
  https://www.codemotion.com/magazine/ai-ml/zero-data-retention-regolo-ai/
- https://tensorx.ai/ · https://cortecs.ai/providerView/tensorix · https://infrabase.ai/inference-apis/tensorix
- https://x.com/Zai_org/status/2054410799670788329 (Z.ai↔Tensorix GLM partnership)
- https://infrabase.ai/inference-apis/eurouter · https://www.edenai.co/post/top-european-alternatives-to-openrouter
