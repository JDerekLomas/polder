> ⚠️ **DRAFT — NOT LEGAL ADVICE.** Prepared by an AI assistant for review by qualified Dutch/EU counsel before any use. Do not publish as-is.

# Polder — Privacy Policy

**Version:** v0 draft · **Last updated:** [DATE]

This Privacy Policy explains what personal data Polder processes when you use the Polder application, why, on what legal basis, who else may handle it, and the rights you have. It is written for students and other users of the app.

> **Plain-language summary (not a substitute for the policy below):** When you use Polder, you log in with your institution's GitLab account, and the things you type to the AI assistant — along with the code and context it needs — are sent to an EU-hosted AI model to generate responses. Your project files live on your own machine and on your institution's GitLab. If you publish a project, the built result is stored on EU-based object storage and given a public web address. Your institution, not Polder, decides that the tool is used and is the party legally responsible for your data; Polder operates the tool on the institution's behalf.

---

## 1. Who is responsible for your data (controller and processor)

Polder is offered to you through your educational institution.

- **[TU Delft / your institution]** is the **data controller**. It decides that the tool is used in your course or programme and is the party that holds the primary relationship with you. Questions about *why* your data is processed in connection with your studies should be directed to the institution.
- **[POLDER LEGAL ENTITY NAME, e.g. Polder B.V.]** ("Polder", "we", "us") is the **data processor**. We operate the application on the institution's behalf and only process your data according to the institution's instructions and our agreement with them (a Data Processing Agreement, or "DPA").

> 🔖 **For counsel:** This controller/processor split assumes the TU Delft ⇄ Polder DPA is in place and that the institution is the controller for all processing described here. Confirm whether any processing (e.g. Polder's own product telemetry or service-improvement activity) makes Polder an independent controller for that limited purpose, and adjust this section accordingly.

**Polder's details:**
- Legal entity: [POLDER LEGAL ENTITY NAME]
- Registered address: [REGISTERED ADDRESS]
- Chamber of Commerce (KvK) number: [KVK NUMBER]
- Contact for privacy questions: [PRIVACY/DPO CONTACT EMAIL]
- Data Protection Officer: [DPO NAME / "Not appointed — see Section 11" — for counsel to determine]

---

## 2. What data we process

| Category | Examples | Where it comes from |
|---|---|---|
| **Identity data** | Your name, email address and/or institutional identifier (user ID), and an authentication token | From your institution's GitLab when you log in (GitLab OAuth) |
| **Prompts and AI context** | The instructions and questions you type to the AI assistant, plus the portions of your code and project files that are sent as context for the AI to respond | From you, as you use the assistant |
| **AI-generated output** | The code, text and suggestions the AI produces in response | Generated during your session |
| **Project files** | The source files and assets of the project you are building | Created by you on your device |
| **Published artifacts** | The built website or output you choose to publish, and its public web address | Created when you choose to publish |
| **Local telemetry** | Cost, token-usage and CO₂ estimates shown in the app | Generated locally on your device |

> 🔖 **For counsel:** We intend the local telemetry (cost/token/CO₂ estimates) to be **non-personal** — derived measurements that do not contain prompt content or identify you. This must be verified before relying on it (see DATA-FLOW.md open confirmations). If any telemetry is transmitted off-device or can be linked to you, it must be treated as personal data and disclosed here accordingly.

We do **not** intentionally collect special categories of personal data (e.g. data revealing health, religion, ethnicity, etc.). Please do not enter such data into the assistant. Note that **anything you type into a prompt is sent to the AI model** — avoid entering personal data about yourself or others that is not necessary for your work.

---

## 3. Why we process it, and the legal basis

> 🔖 **For counsel — legal basis is a determination you must make.** The most likely basis is **performance of a task / the institution's legitimate interest in providing educational tooling, or performance of the contract between the student and the institution**, rather than consent (which is generally weak in a student–institution relationship). Confirm the correct Article 6(1) GDPR basis for each purpose and finalise the table. The entries below are placeholders pending that determination.

| Purpose | What it involves | Likely legal basis (GDPR Art. 6) — *to be confirmed by counsel* |
|---|---|---|
| Authenticating you and securing your account | Identity data from GitLab OAuth | [Art. 6(1)(b) contract / 6(1)(f) legitimate interest — TBC] |
| Providing the AI assistant | Sending prompts + code context to the AI model and returning output | [Art. 6(1)(b) / 6(1)(f) — TBC] |
| Storing and publishing your projects | Project storage and publishing to a public URL at your request | [Art. 6(1)(b) — TBC] |
| Operating, securing and maintaining the service | Logging, abuse prevention, troubleshooting | [Art. 6(1)(f) legitimate interest — TBC] |

---

## 4. How your data flows (and the AI model hop)

When you use Polder, data moves like this:

1. **Log in.** You authenticate via **GitLab OAuth on your institution's own GitLab instance** (`[gitlab.tudelft.nl]`). This returns an identity token. GitLab here is your institution's own infrastructure, not a Polder sub-processor — that data stays within the institution.

2. **Use the AI assistant ("Make").** When you prompt the assistant, your prompt together with the relevant code and project context is **sent off your device to an EU-hosted AI model provider** (the inference host) so that a response can be generated. **This is the key point to understand: the text and code you send to the assistant leave your machine and are processed by the AI model provider in order to produce a response.**

3. **Preview ("See it").** Previewing your project runs locally on your device; this preview data does not leave your machine.

4. **Save.** Saving commits your project to your institution's GitLab (`[gitlab.tudelft.nl]`), which stays within the institution's infrastructure.

5. **Publish ("Share").** If you choose to publish, the built output is stored on **EU-based object storage (Scaleway, Paris region "fr-par")** and made available at a public web address. Anything you publish becomes publicly accessible to anyone with the link.

> **On data location:** Polder is designed so that processing takes place on **EU-based infrastructure**, and we aim to keep student data within the EU. We describe this as our **design intent and operating goal**. We are **not, at this stage, asserting a contractual guarantee** about the AI model provider's data residency, retention or training practices; those terms are being established in our agreements with the relevant providers. This policy will be updated to state any such guarantees only once they are contractually in place.

> 🔖 **For counsel:** This deliberately avoids asserting unverified "EU-only / no-retention / no-training / no-EU-exit" guarantees about the GLM inference host, which are not yet contractually confirmed (see DATA-FLOW.md). Once the GLM-host DPA is signed, this section and Section 6 should be tightened to state the confirmed guarantees. If the inference host is **outside the EEA** or any onward transfer occurs, an international transfer assessment and a transfer mechanism (e.g. SCCs) are required before launch.

---

## 5. Who else processes your data (sub-processors)

Polder uses the following sub-processors to deliver the service. Each operates under a data processing agreement with Polder:

| Sub-processor | Role | Location / region |
|---|---|---|
| **[EUrouter / GLM inference host — confirm legal entity name]** | Runs the AI model that processes your prompts and code context to generate responses | [EU — country/entity to be confirmed] |
| **Scaleway** | Object storage for published projects | France (Paris, "fr-par" region) |
| **SURF (SURFconext)** | Identity provider — **planned for a later phase**, not active at v0 | Netherlands |

> Your institution's **GitLab** instance is the institution's own infrastructure and is **not** a Polder sub-processor.

We maintain an up-to-date sub-processor list and will notify the controller of changes in accordance with our DPA.

> 🔖 **For counsel:** Confirm each sub-processor's legal entity name, hosting country, and that a signed DPA exists before this list goes live. SURF should be listed as "planned/later phase" until activated, or removed from the v0 public version.

---

## 6. How long we keep your data (retention)

> 🔖 **For counsel — retention periods must be set in/aligned with the TU Delft DPA and Polder's retention policy. The values below are placeholders.**

| Data | Retention | 
|---|---|
| Identity / authentication tokens | [e.g. for the duration of your session / account; tokens expire after [PERIOD] — TBC] |
| Prompts and AI context sent to the model | **Intended:** processed for the request and not retained by Polder beyond what is needed to return a response. **The AI model provider's retention is governed by the provider's terms and is [to be confirmed in the GLM-host DPA].** |
| Project files | Stored on your device and your institution's GitLab; retention governed by your institution |
| Published artifacts | Kept until you (or the institution) unpublish/delete them, or until [PERIOD] after account closure — TBC |
| Operational logs | [RETENTION PERIOD — TBC] |

When data is no longer needed for the purposes above, it is deleted or anonymised.

---

## 7. Your rights

Under the GDPR you have the right to:

- **Access** the personal data we hold about you;
- **Rectify** inaccurate or incomplete data;
- **Erasure** ("right to be forgotten"), where applicable;
- **Restrict** or **object to** processing, where applicable;
- **Data portability** — receive your data in a structured, commonly used format;
- **Withdraw consent** at any time, where processing is based on consent (without affecting prior processing);
- **Lodge a complaint** with a supervisory authority — in the Netherlands, the **Autoriteit Persoonsgegevens** ([https://autoriteitpersoonsgegevens.nl](https://autoriteitpersoonsgegevens.nl)).

Because **[your institution] is the controller**, you can usually exercise these rights either through your institution or through us. If you contact us, we will act on the institution's instructions and may forward your request to them. To make a request, contact [PRIVACY/DPO CONTACT EMAIL] or your institution's data protection contact.

---

## 8. Security

We apply technical and organisational measures appropriate to the risk to protect your data, and our security controls are written to be ISO 27001-aligned. No system is perfectly secure, but we work to keep your data safe and will notify the controller of any personal data breach without undue delay, in line with our DPA and GDPR Articles 33/34.

---

## 9. Cookies and tracking

The Polder desktop application [does not use advertising or third-party tracking cookies]. Authentication uses tokens needed to keep you logged in. [If the marketing website uses analytics, that is covered by a separate notice on that site.]

> 🔖 **For counsel:** Confirm the actual cookie/token behaviour of the desktop app and whether any separate cookie notice is needed for the marketing site.

---

## 10. Children

Polder is intended for use by students at higher-education institutions and is not directed at children under [16].

---

## 11. Data Protection Officer

> 🔖 **For counsel:** Determine whether Polder is required to appoint a DPO under Art. 37 GDPR at this stage (the v0 pilot involves non-confidential design-student data). State the DPO contact here if appointed, or document the basis for not appointing one.

---

## 12. Changes to this policy

We may update this policy. Material changes will be communicated through the application or by your institution. The "Last updated" date at the top shows the current version.

## 13. Contact

For any privacy question, contact:
**[POLDER LEGAL ENTITY NAME]** — [PRIVACY/DPO CONTACT EMAIL] — [REGISTERED ADDRESS]
Or your institution's data protection contact: [INSTITUTION DPO CONTACT].
