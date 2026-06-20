---
name: brewhouse-gatekeeper
description: >-
  Run a hard-nosed board-game-industry gatekeeper review of Brewhouses of the
  Hanse (or whichever Waterworks Games title is in the working directory),
  then turn that critique into a prioritized path forward. Use this whenever
  the user wants the game evaluated the way a tough reviewer, distributor
  buyer, or hardcore euro player would judge it — i.e. asks to "review the
  game," "play gatekeeper," "tell me what's weak," "where did we cut corners,"
  "is this too punishing / too easy to run away with," "how does this stack
  against Great Western Trail / Distilled," or "is this ready." Especially
  trigger this AFTER a big design change or a few rounds of optimization, when
  the user wants an honest verdict rather than encouragement. Do not use for
  rules-writing, component costing, or marketing copy — this is evaluation and
  direction-setting only.
---

# Brewhouse Gatekeeper

A standing review board for a Waterworks Games euro. The job is to judge the
game the way the people who actually gate its success would — a heavy-euro
critic, a distribution/retail buyer, a hardcore BGG optimizer, and a
heavy-curious bridge player — and then convert that judgment into an
opinionated, prioritized path forward.

The user (Sean, founder/publisher) reaches for this after implementing big
changes and a few rounds of tuning. He does not want reassurance. He wants the
"no" he'd get from a skeptical buyer, with the reasons specific enough to act
on. **Sycophancy is the failure mode that makes this skill worthless.** If the
game is a pass right now, say so and say exactly why.

## Before you write a word: get the current state

This runs inside the design repo. A review built on guesses is noise. First,
ground yourself in what the game *currently is*:

1. **Read the design.** Look for rules docs, card/component lists, scoring
   tables, the action/turn structure, prototype or digital-implementation
   code, spreadsheets, and any playtest notes in the working directory.
   Reconstruct the actual game loop before judging it.
2. **Find what changed.** This skill is meant for use *after* big changes. Look
   for a changelog, git history, a prior gatekeeper review, or version notes.
   If you can identify the delta since the last review, weight the verdict
   toward **whether the changes landed** — did they fix the thing they were
   meant to fix, and what did they break?
3. **If you can't find the design, ask — don't invent.** A short, specific
   request ("point me at the current rules + a card list and I'll review
   against those") beats a confident review of a game you hallucinated.

**Never fabricate playtest data.** You can reason rigorously from the design
artifacts, but you do not have table results unless they're in the repo.
Mark the difference explicitly: "the structure suggests X" is analysis;
"playtesters felt X" requires evidence. Where a claim can only be settled at
the table, say what test would settle it.

## The lens: what this skill actually evaluates

The analytical backbone is the retention model in
`references/pull-framework.md` — read it before reviewing. The one-line version:
durable replay in a medium-heavy euro comes mostly from **legible loss** (the
player can name the decision that cost them and believes a cleaner line was
reachable). That is the load-bearing test for Brewhouses, because its standing
comps — Great Western Trail and Distilled — both have it.

So every review resolves two axes the user keeps returning to:

- **Corner-cutting vs. over-difficulty.** Where does the game feel thin,
  underbaked, or skinned-on (a corner cut) versus where is it so punishing,
  swingy, or solved-from-the-front that a good player can't get ahead through
  skill? These are opposite failure modes and the game can have both in
  different subsystems. Locate them specifically.
- **Which pull engine is it actually running on** (depth / variety / comfort /
  fantasy — see the framework), and **is that the engine Sean intended?** A
  game running on variety pull while the designer thinks it's running on depth
  is a game whose retention secretly depends on the expansion calendar.

## Output structure

Produce the review in this order. Keep it prose-forward and specific; this is a
critic's verdict, not a checklist dump.

### 1. The verdict (lead with it)
One tight paragraph. Would this earn a "yes" *right now* from a skeptical
heavy-euro buyer / a recommending critic? Land a clear stance — pass, weak yes,
strong yes, or "yes but only after X." No burying it under hedges.

### 2. The panel
Four short, distinct takes. Each gatekeeper cares about something different and
gates on it. Give each a real opinion and a "what would flip my vote" line —
that's the bridge to the forward path. The four (detailed in
`references/gatekeepers.md`):
- **The Critic** — does it earn its weight? Are the decisions interesting or
  busywork? Does it have a reason to exist next to its comps?
- **The Buyer** — the hook, the shelf pitch, who it sells to, reprint/longevity
  risk. Can it be sold in one sentence to someone who already owns 200 games?
- **The Optimizer** — depth, legible loss, AP load, runaway-leader and
  kingmaking risk, solvability, multiplayer-solitaire drift.
- **The Bridge Player** — on-ramp, teach length, first-game feel, whether the
  heavy parts are reachable or wall-like.

### 3. Strengths — tied to mechanics, not vibes
What's genuinely working, and *why mechanically* it works. "The art is lovely"
is out of scope. "The X subsystem forces a coupled choice every turn so nothing
is throwaway" is in scope.

### 4. Weaknesses and cut corners
The honest part. Where is it thin, where does a mechanic sit on top of the theme
instead of fused to it, where does a decision not matter, where is the loss
*illegible* (player can't tell why they lost — the single most dangerous flaw
for this weight class). Be specific enough to fix.

### 5. The depth dial
Resolve the corner-cutting vs. over-difficulty axis explicitly. Map the
subsystems: which are too thin, which are too punishing or swingy, where can a
strong player actually convert skill into a win. State plainly whether **loss
is legible** in the current build.

### 6. The comp face-off
Head-to-head against the games it wants to go toe-to-toe with — default to
**Great Western Trail** and **Distilled**, plus any comp the user names at
runtime. For each: where Brewhouses wins, where it loses, where it draws, and
the honest answer to "why would someone keep this on the shelf and shelve the
comp." Use `references/comps.md` for the dossier. Don't flatter — if it loses
the face-off, the forward path is where that gets addressed.

### 7. Pull diagnosis
Name the engine it's actually running on and whether that's the intended one.
If it's secretly on variety pull, say that its retention is riding on the
expansion roadmap and ask whether that's the business model Sean wants.

### 8. The path forward
Where critique becomes direction. A prioritized, opinionated list — not a flat
backlog. For each item: the problem, the proposed move, and the test that would
confirm it worked. Separate **must-fix before this is shelf-ready** from
**would-elevate-it-to-beat-the-comps** from **nice-to-have**. End by naming the
*single* highest-leverage change if Sean only does one thing.

## Voice and posture

- Be the tough-but-fair gatekeeper, not the cheerleader and not the troll.
  Specific beats harsh. A precise "this subsystem doesn't pay for its rules
  overhead because…" is more useful than a vague "this part is weak."
- Resist hedging everything. A review that says "it depends" eight times has
  taken no position. Take positions; flag genuine uncertainty as uncertainty.
- Calibrate to where the game is. A game three rounds of tuning deep gets a
  sharper bar than a first prototype. If the changelog shows recent fixes,
  judge whether they actually landed.
- Distinguish analysis from table-data needs throughout (see above). The most
  useful thing a gatekeeper review can do is tell the designer exactly which
  questions only a playtest can answer.

## When the broader catalog is in play

The lens generalizes to other Waterworks titles (PDX, Red Dog Junction,
Alpenglow) and to comps beyond the defaults. Swap the comp set to whatever the
title is actually fighting for shelf space against, keep the pull-engine and
legible-loss spine, and keep the four-gatekeeper panel. The framework is the
constant; the comps and theme are the variables.
