# MakeMode — UX & Core User Flows

> The design brief for the experience layer. Table stakes (the loop *works*) is done;
> this is the human-centered design phase. North stars: **Claude app** (calm, chat-first,
> artifact-beside-chat) when in doubt on feel; **Lovable** (describe → live preview →
> publish) for the build loop. The user is a **non-coding TU Delft design student** — a
> maker, not a developer.

## The core insight

Today MakeMode renders the **opencode engine UI** — a *developer* coding agent (file
tree, diffs, terminal, code editor). That's the wrong **altitude** for a designer. A
design student doesn't want to see code; they want to **describe → see it → share it**.
We just verified the engine + publish services work headlessly via their APIs — so the
right move is to treat **opencode as the headless brain** and put a **MakeMode-designed
surface** in front of it, Lovable-shaped and Claude-calm.

The bar in one line: **"Lovable's build loop with Claude's composure, on EU rails."**

## The main flows to support (in priority order)

### 1. First run / onboarding  — *Claude empty-state · Lovable "what do you want to build?"*
- **Want:** open the app and immediately be able to start making. Zero setup (already
  true — model/keys/host are pre-wired). A warm empty state with a prompt box and a few
  **starter ideas / templates** ("a portfolio page", "an interactive timeline", "a quiz").
- **Now:** drops straight into a coding IDE. No guidance, technical.
- **Target:** one calm screen — "What do you want to make?" + 3–4 example chips.

### 2. Make — the core loop  — *Lovable split: chat left, live preview right*
- **Want:** describe in plain language → agent builds → **see the result update live** →
  refine by describing changes. This is THE flow; 90% of time lives here.
- **Now:** opencode shows code/diffs/tool output — designer-hostile.
- **Target:** two panes. **Left:** conversational chat (Claude-style bubbles, calm).
  **Right:** **live rendered preview** of their project, auto-refreshing on each change.
  Code exists but is **tucked behind a "view code" toggle**, not the default.

### 3. See it / preview  — *Claude artifacts panel*
- **Want:** a real, interactive preview — click around the thing they're making.
- **Now:** there's a LAN/`/p/` preview server, but it's not foregrounded as the hero.
- **Target:** the preview **is** the right half of the app, always visible, with a
  device-width toggle (desktop/mobile) and a "pop out" to full screen.

### 4. Save / history  — *invisible, calm — NOT git*
- **Want:** never lose work; "go back to how it was an hour ago" without knowing git.
- **Now:** ✅ autosnapshot every 90s + GitLab push (verified). But it's invisible with no
  way to *see* or *restore* history.
- **Target:** a quiet "History" affordance — a timeline of snapshots with thumbnails,
  one-click restore. The word "git" never appears.

### 5. Publish & share  — *Lovable's publish moment*
- **Want:** one obvious button → a shareable link, with a small moment of delight.
- **Now:** ✅ works (verified: real EU URL). But it's a small HUD button.
- **Target:** a prominent **Publish** action → a celebratory sheet with the live link,
  copy button, QR for phones, and "share to crit". This link is the **growth engine** —
  make it feel good to send.

### 6. Projects / home  — *Lovable dashboard · Claude history*
- **Want:** come back tomorrow and find their projects.
- **Now:** none — single working dir, no project concept in the UI.
- **Target:** a **home gallery** of project cards (thumbnail, name, last-edited, live-link
  badge). "New project" → flow #1.

### 7. Trust & cost HUD  — *MakeMode's own signature*
- **Want:** quiet reassurance it's sovereign + cheap (the cost / CO₂ / EU readout).
- **Now:** ✅ the cream HUD overlay (cost, tokens, hamburger-CO₂, theme toggle).
- **Target:** keep it, calm it — a small status chip, expandable, not a dev overlay.
  This is a differentiator; no competitor shows "% of a hamburger".

## Architecture choice

- **Reskin opencode (tactical):** inject CSS/JS to hide the file tree/terminal, elevate
  the preview, simplify chat. Fast, but there's a ceiling — we're fighting a tool built
  for developers.
- **MakeMode shell (strategic, recommended):** a custom frontend (the Lovable split +
  Claude calm) that talks to the **opencode engine API** (sessions/messages — verified
  working) and the **MakeMode publish/save server** (verified working). opencode stays as
  the headless agent; we own the experience end-to-end. This is the "real work," and it's
  what turns MakeMode from "a reskinned IDE" into a product a design student loves.

## Recommended sequence

1. **Now (tactical):** ship the reskin we started — force the preview pane to the
   foreground, hide the most developer-y chrome, keep iterating the cream theme. Gets a
   credibly-designed surface in front of the first pilot.
2. **Design sprint:** wireframe the 7 flows against Claude/Lovable; prototype the MakeMode
   shell (flows #1, #2, #5 first — onboarding, make-loop, publish).
3. **Build the shell** on the proven engine + publish APIs; migrate off the raw opencode
   UI.
4. **Pilot → observe → refine** (the HCD loop from `TABLE-STAKES.md`).

> The thing to internalize: opencode gave us a working *brain* for free. The product —
> the reason a designer chooses MakeMode over a US tool — is the *surface*. That surface
> is Lovable's loop, Claude's calm, on EU rails.
