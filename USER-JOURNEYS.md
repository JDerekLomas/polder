# MakeMode — User Journeys

> The end-to-end story of a design student using MakeMode, mapped to the flows in
> `UX-FLOWS.md` and the working prototype (`makemode-app/shell-prototype.html`, viewable
> in a browser). North stars: **Claude Cowork** (calm agentic surface for non-developers),
> **Lovable** (make → live preview → publish), **Claude Code** (real system power = the moat).

## Who, and the moment

**Iris**, 2nd-year Industrial Design Engineering at TU Delft. She has an idea — a portfolio,
an interactive concept, a data viz for a report. She is *not* a coder. Today her options are
learn-to-code or a US sandbox tool. She opens MakeMode.

## The arc (emotional beats)

```
  "I have an idea"        →  describe it, no setup, no fear        [calm, invited]
  "It's making it"        →  watch it appear, live                 [delight, trust]
  "That's not quite it"   →  say the change, it updates            [in control]
  "It's mine, it's real"  →  one link, hosted, shareable           [pride]
  "I sent it to my crit"  →  the link spreads                      [the growth loop]
```

The whole product exists to move Iris through those five beats with **zero friction and a
feeling of calm power** — Cowork's composure, not an IDE's intimidation.

## The journey, step by step

### 1 · Arrive → Onboarding  *(flow #1 — Claude empty-state)*
- **Sees:** a calm cream screen, "What do you want to make?", one big input + a few starter
  ideas. A quiet line: *runs on European infrastructure · nothing leaves the EU*.
- **Does:** types in plain language (or taps a starter chip), hits **Make it**.
- **Feels:** invited, not tested. No project setup, no model picker, no git, no keys.
- **Under the hood:** spins up an opencode session, seeds the EU model — invisible.

### 2 · Build → The make loop  *(flow #2 — Lovable split + Cowork agency)*
- **Sees:** chat on the left, **live preview on the right**. The agent narrates calmly
  ("I'll build a hero, a projects grid, a contact form…"), shows a quiet *Building…* state,
  then the real thing renders on the right. A small EU/cost chip reassures (€, %-of-a-burger).
- **Does:** describes changes in words ("make the header warmer, add an About section"); the
  preview updates. Code exists behind a **‹/› code** toggle but is never forced on her.
- **Feels:** in control, fast, like collaborating — not coding.
- **The moat (Claude Code power):** this isn't a sandbox. The agent has *real* access — it can
  pull in real data, wire multiple files, add a library, call a tool, prep a deploy. Iris can
  be *ambitious*; Lovable's toy ceiling isn't there.

### 3 · Save → Invisible history  *(flow #4)*
- **Sees:** nothing, until she wants it — then a calm timeline of versions to restore.
- **Under the hood:** auto-snapshot every 90s + push to (institutional) GitLab. The word
  "git" never appears. *(Verified working today.)*

### 4 · Share → The publish moment  *(flow #5 — Lovable's payoff)*
- **Sees:** one **Publish & share** button → a small celebration: "Your project is live",
  the link, a QR for phones, *Share to crit*, and *nothing left Europe*.
- **Does:** copies the link, drops it in a crit / her portfolio / a group chat.
- **Feels:** pride — and that's the **growth engine**: every shared link seeds the next student.
- **Under the hood:** build → EU object storage (Scaleway fr-par) → public URL. *(Verified.)*

### 5 · Return → Projects home  *(flow #6)*
- **Sees:** a gallery of her project cards (thumbnail, name, live-link badge). "New project"
  → back to beat 1.

## Taking it to the next level

The prototype shows beats 1–4. The ambition beyond a "page maker":

- **Cowork-grade agency:** MakeMode shouldn't just emit a static page — it should *do the
  project*. "Turn this spreadsheet into an interactive dashboard and publish it." "Scrape my
  Are.na channel into a gallery." The agent plans + executes real multi-step work on real
  files. That's Cowork's model, pointed at *making/publishing* instead of office docs.
- **The sovereign edge no US tool can copy:** Claude-Code power + EU rails + institution-
  sanctioned. Lovable can't be EU-sovereign without gutting its stack; Cowork isn't EU-hosted
  or education-targeted. MakeMode is the *European, design-school* expression of the pattern.
- **Calm, not cockpit:** as capability grows, the surface must stay Cowork-calm. Power lives
  under a quiet hood; the student only ever sees describe → see → share.

## Build path (prototype → product)

1. **Prototype (done):** `shell-prototype.html` — flows #1/#2/#5, real cream design system,
   viewable in a browser. *(This doc's screenshots come from it.)*
2. **Wire to the proven APIs:** the opencode **engine API** (sessions/messages — verified)
   for the make loop, and the **publish/save server** (verified) for save + publish.
3. **Replace the opencode UI:** the Tauri window loads the MakeMode shell instead of the raw
   engine UI; opencode becomes the headless brain.
4. **Pilot → observe → refine** (the HCD loop) with a real IDE studio.

> The reframe that makes this tractable: Anthropic built **Cowork in ~10 days using Claude
> Code**. We're building MakeMode the same way — an agent building its own non-coder sibling,
> on EU rails, for designers.
