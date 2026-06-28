# EU-Sovereign Inference Alternatives for Polder

> Companion to `glm-sovereignty.md`. Maps the realistic options for Polder's inference
> layer so the EUrouter/GLM dependency is a *choice*, not a single point of failure.
> The app points opencode at an **OpenAI-compatible** endpoint
> (`@ai-sdk/openai-compatible`, base URL `https://api.eurouter.ai/api/v1` in
> `polder-app/src-tauri/src/lib.rs`), so **switching providers = changing a base URL +
> model id + key.** That makes nearly every option below a low-effort swap.
> Verified = read from the provider's own page; Claimed = vendor marketing not yet
> contractually bound to Polder. Date: 2026-06-28.

---

## Headline recommendation

- **Best primary (cleanest procurement story): Scaleway Generative APIs (FR).**
  It is the *one* option that is simultaneously: a real EU cloud with a standard GDPR
  DPA, **France-only hosting**, OpenAI-compatible, "we do not collect/read/reuse your
  inputs," AND **serves GLM-5.2 directly** ("Chat and code") *plus* **Devstral** (Mistral's
  coding-agent model) and Mistral Medium. It removes the router-opacity problem entirely
  (one named EU host, one DPA) while still letting us keep GLM-5.2 if we want it — or
  pivot to a fully-EU-provenance coding model on the same endpoint with no app change.
- **Best fallback / strategic hedge: Mistral AI direct (FR) — Codestral / Devstral / Mistral Large.**
  Fully **EU-origin weights *and* EU host** = the strongest sovereignty + procurement
  narrative (no Chinese-provenance footnote at all). OpenAI-compatible, published DPA,
  no-training, ZDR available (Scale plan). Codestral is purpose-built for code and ~5×
  cheaper than US frontier models. This is the model to fall back to if the GLM origin
  question (see glm-sovereignty.md) can't be closed.
- **Lowest-effort single switch:** because the app already targets an OpenAI-compatible
  base URL, the minimal change in `seed_engine` (lib.rs) is: set
  `"baseURL": "https://api.scaleway.ai/v1"` (or Mistral's), set `"model"` to the
  Scaleway/Mistral model id, and swap the baked key. **No new SDK, no architecture change.**
- **Strategic note (procurement):** GLM is Chinese-*provenance* open weights. Even when
  EU-hosted, that's a footnote a procurement officer may snag on. A fully-EU-provenance
  default (**Mistral Codestral/Devstral**) is the cleaner story for the institutional
  buyer, even though GLM is technically fine if EU-hosted and contractually sealed.
  Recommended posture: **default to an EU-provenance coding model (Mistral/Devstral),
  offer GLM-5.2 as an EU-hosted option** — and run both behind one EU host (Scaleway)
  so there's a single DPA to sign.

---

## The three buckets

### Bucket 1 — EU model aggregators / routers (EUrouter-equivalents)

Same shape as EUrouter: one OpenAI-compatible API, fans out to upstream EU model hosts.
Convenient, but inherit the **router-opacity risk** (which upstream actually ran it? can
failover spill outside the named set?) flagged in glm-sovereignty.md.

| Provider | Jurisdiction | Coding models | EU residency / retention / training | DPA | OpenAI-compat | Cost posture | Notes |
|---|---|---|---|---|---|---|---|
| **EUrouter** | EUrouter B.V. — **NL** (Amsterdam) | GLM-5.2 (→Tensorix-IE / Regolo-IT), Mistral, Qwen, Devstral | Claimed: EU/EEA-only, zero-retention default, no-training (ToS). One EEA-exit-under-SCCs clause to reconcile. | Yes (offered) | Yes | Pass-through to upstreams | Current default. Full analysis in glm-sovereignty.md. |
| **Requesty (EU)** | "Requesty Ltd" — jurisdiction unclear (likely **UK/US-parent**); gateway in **Frankfurt** (AWS eu-central-1) | Routes Claude/GPT/Gemini/**Mistral** via EU endpoints; GLM/Qwen routing unconfirmed | Verified-claimed: "all data in Frankfurt," "zero data retention," "never train on your data" | Yes (on request) | Yes (1-line) | Cost-optimization focus | 🟡 Runs on **AWS** (US CLOUD Act exposure debate) and entity jurisdiction unclear — weaker sovereignty story than a native-EU cloud. |
| **Eden AI** | **FR** | Broad (incl. Mistral); coding via routed models | EU endpoint + EU residency options, DPA | Yes | Yes | Aggregator markup | Broad AI coverage, less a pure-sovereign play. |
| **Cortecs** | EU-positioned | Open models incl. GLM-class (Tensorix is on Cortecs) | "Sovereign enterprise" positioning | Yes | Yes | — | Enterprise/sovereign framing; smaller. |

→ **Verdict on routers:** only worth it for multi-model breadth. For Polder's single-model
coding-agent need, a **direct EU host is cleaner** (one named processor, no failover
opacity). If we keep a router, EUrouter (native-EU NL entity) beats Requesty (AWS/Frankfurt,
unclear entity) on the sovereignty story.

### Bucket 2 — First-party / direct EU model hosts (no router) — RECOMMENDED LANE

One named EU processor, one DPA, deterministic hosting. Best fit for the procurement story.

| Provider | Jurisdiction | Coding models served | EU residency / retention / training | DPA | OpenAI-compat | Cost posture | Coding fit |
|---|---|---|---|---|---|---|---|
| **Scaleway Generative APIs** ⭐ | **FR** (Iliad group) | **GLM-5.2**, **Devstral-2-123B**, **Qwen3-Coder-30B**, Qwen3.5/3.6, Mistral Medium 3.5 | Verified: "all models in a France/Paris DC only"; "we do not collect, read, reuse or analyse your inputs/prompts/outputs" | Yes (standard Scaleway DPA, fr-par) | Yes (use OpenAI libs) | Per-1M-token, competitive | **Excellent** — serves both GLM *and* Devstral on one endpoint. **Top pick.** |
| **Mistral AI direct** ⭐ | **FR** | **Codestral** (FIM, IDE-tuned), **Devstral** (agentic coding), Mistral Large/Medium | Verified: EU-hosted by default; **DPA published**; **no training** on customer data; **ZDR** (Scale plan, stateless); else 30-day abuse-monitoring retention | Yes (legal.mistral.ai) | Yes | Codestral $0.30/$0.90 per 1M; ~5× cheaper than US frontier | **Excellent** — purpose-built coding models. **Fully EU-provenance = cleanest story.** |
| **OVHcloud AI Endpoints** | **FR** | **Qwen3-Coder-30B**, Qwen3.5, gpt-oss, Mistral, Llama 3.3 | Verified-claimed: EU hosting, **zero data retention, no training on prompts**, OpenAI-compatible | Yes (GDPR/ISO/HDS certified) | Yes | Serverless per-token, low | **Good** — Qwen-Coder; no GLM/Codestral. Solid sovereign backup. |
| **IONOS AI Model Hub** | **DE** | Open models (Llama/Mistral-class); coding via general models | EU residency, OpenAI-compatible | Yes | Yes | Low | Fewer/weaker coding-specific models; strong DE-sovereign credentials. |
| **Aleph Alpha (Pharia)** | **DE** (runs on STACKIT/Schwarz, no US hyperscaler) | Pharia LLMs (general; not a top coding model); on-prem capable | Strongest sovereignty framing (no CLOUD Act) | Yes | API-compatible wrapper | Premium | 🟡 **Acquired/merged by Cohere (Canadian) Apr 2026** — dilutes the "EU-owned" story; weak on coding benchmarks. Not recommended as the coding default. |
| **Regolo (IT)** / **Tensorix (IE)** | IT (Seeweb) / IE | GLM-5.2 + open models | Architectural zero-retention (Regolo), ephemeral enclaves (Tensorix), no training | Likely (B2B) | Yes | Competitive | The actual GLM upstreams behind EUrouter — can be used **direct** to remove the router. Good "named EU GLM host" fallback. |

### Bucket 3 — Self-host open weights on rented EU GPUs

Run GLM-5.2 / Mistral / Devstral / Qwen-Coder ourselves on EU GPU instances. Maximum
control and sovereignty (we are the only processor), but real ops burden.

| Provider | Jurisdiction | Hardware / cost | Notes |
|---|---|---|---|
| **Scaleway GPU** | FR (Paris/Warsaw) | H100 ~€2.73/hr | Same vendor as their managed API; clean DPA. |
| **OVHcloud GPU** | FR | H100 instances, GDPR/ISO/HDS | Up to ~70B comfortably; EU-certified. |
| **IONOS dedicated** | DE | H100/H200 flat ~$3,990/mo | Predictable flat cost, EU residency. |
| **Exoscale** | CH/EU | Dedicated inference, EU-sovereign | Swiss/EU sovereign positioning. |

**Reality check:** GLM-5.2 self-host needs roughly **8×H200 (vLLM)** → ~$4k–$10k/mo for
multi-H100/H200 boxes running 24/7. That's only rational at sustained scale; for a pilot
it's far more expensive and more ops than a per-token managed EU API. **Keep self-host as
the Phase-3+ lever** (when volume justifies it or a contract demands single-processor
control), not the pilot path.

---

## Decision summary

1. **Primary:** **Scaleway Generative APIs (FR)** — one EU host, one DPA, France-only,
   OpenAI-compatible, serves **both GLM-5.2 and Devstral**. Removes router opacity; keeps
   model optionality. Switch = change base URL + model id + key in `lib.rs::seed_engine`.
2. **Default model on it:** prefer **Devstral or Codestral (EU-provenance)** for the
   cleanest procurement story; offer **GLM-5.2 (EU-hosted)** as a selectable option.
3. **Fallback:** **Mistral direct (FR)** if we want the model maker's own DPA/ZDR, or
   **OVHcloud (Qwen-Coder)** as a second sovereign source.
4. **Keep EUrouter** only if multi-model routing breadth becomes valuable; otherwise the
   direct host is the stronger sovereignty story.
5. **Self-host (Scaleway/OVH/IONOS GPU):** Phase-3+ option at scale, not for the pilot.

**Lowest-effort switch, concretely:** in `polder-app/src-tauri/src/lib.rs` `seed_engine`,
the provider block's `baseURL` + the `"model"` id + the baked key are the only things that
change. Everything else (opencode, the OpenAI-compatible SDK, the app shell) stays. A swap
to Scaleway or Mistral is a one-file, few-line change.

---

### Sources
- https://www.scaleway.com/en/generative-apis/ · https://www.scaleway.com/en/h100/ · https://www.scaleway.com/en/pricing/gpu/
- https://legal.mistral.ai/terms/data-processing-addendum · https://help.mistral.ai/en/articles/347612-can-i-activate-zero-data-retention-zdr · https://tokencostcalculators.com/blog/mistral-api-pricing-guide/
- https://www.ovhcloud.com/en/public-cloud/ai-endpoints/catalog/ · https://www.ovhcloud.com/en/public-cloud/gpu/h100/
- https://www.requesty.ai/eu · https://www.requesty.ai/blog/openrouter-eu-alternative-european-ai-gateway
- https://www.edenai.co/post/top-european-alternatives-to-openrouter · https://www.edenai.co/post/european-ai-gateways-comparing-edenai-ovhcloud-ai-endpoints-and-scaleway-generative-apis · https://www.edenai.co/post/best-european-llm-model-providers
- https://beam.ai/llm/luminous-pharia/ · https://www.heise.de/en/news/Aleph-Alpha-New-AI-architecture-for-sovereign-LLMs-10252393.html (Cohere acquisition)
- https://www.spheron.network/blog/gpu-cloud-pricing-comparison-2026/ · https://ofox.ai/blog/glm-5-2-self-host-vllm-hardware-cost-2026/
