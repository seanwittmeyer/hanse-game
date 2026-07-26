# Fresh-eyes design brief — Brewhouses of the Hanse (v3.0 direction)

> This is the exact, self-contained prompt for a clean-context design exploration. It may be
> given to any agent or designer with access to this repository. It deliberately contains NO
> design direction beyond the designer's own brief — the point is an independent evaluation.

---

You are a senior tabletop game designer brought in as an outside consultant on **Brewhouses of
the Hanse**, a 2–4 player medieval-Hanseatic brewing euro (Great Western Trail / Distilled
weight). You have never seen this game before. The design team wants your genuinely independent
read — your value is that you owe nothing to any prior internal exploration.

## The designer's brief (verbatim — this is your client's ask)

"Big play-test night last night which I want to engage with here. We have a lot going on in the
slots and in a physical game, you have a lot working in a space that can be pretty finicky. I
want to consider two changes.

First, line activation. The line consists of slots (deploy for buildings/empty slots, load for
ships, cask actions on casks) plus two stations. Each station is pretty complex — multiple
options, some offer multiple actions, it is too much. Evaluate the game and consider how we can
reduce the stations to a single action for each space. This doesn't mean the actions don't need
to be simple, but they can be simplified — the market space comes to mind where I could see us
allowing either 'gain 2 goods' or 'buy 1 item from market' (which is what we have but it's a
simple this or that which reduces analysis paralysis), same with cellar improve + age which is
fine. 2 actions max. Along the lines of this (pun intended), what does it look like to restrict
deploy or load to the space in the line (one player argued that it was confusing that you could
activate deploy but deploy the cask to any slot, not the slot you activated to deploy). I don't
know if this is a good idea but consider and analyze.

Second theme is all that is happening in the slots. The buildings are the flavor (more so than
the casks). In order to convey all of the states and data in the game, we have buildings (with
an ownership ring) which you can place ships on which you slide cask cards under (with a
presence token and a potential die driven by the building, plus a potential second cask card,
die, and marker). It is a lot. When you swap a building, you have to 're-calculate' all of the
dice. It is finicky and requires a lot to parse. What would it look like (remember, this is a
board game — the digital game and its hidden states and automatic calculations are effectively
'cheating' when the components in physical space are required to convey all values and game
data) if the dice weren't part of it? Would it require a rethink of buildings? Are there other
ways to add in ways to manipulate the core loop of source, brew, age, ship through buildings
that don't impact cask value?

Do a deep dive and explore both of these. This is where we are really struggling in game design
right now — how do we refine this. There is a game here and playing it is fun on the web where
these finicky things are taken for granted. The buildings are rich and make each play
interesting and strategic. The floor is a fun alternate path and maybe it becomes a more
intentional (I need to do the floor this turn even though I also need to do a line in the
wharf) thing in these explorations. The floor also can't be too overpowered or too valuable.
How can it be the thing you need to do sometimes but it means you can't visit the wharf if you
do it? That big decision tension of two good things but one turn is the kind of tension we
want. The beer types are fun once you play with enough unique ones (the differences between the
base game 6 beers isn't enough but the specialty beers and jopenbier does add some zest that is
nice). Players didn't explore the hall or the flight enough but struggled to keep going with
shipping. Presence and majorities was a key focus and a balancing factor but it almost felt
like the primary goal — are there other paths to victory we could introduce as we simplify and
streamline? We don't want the game to be simpler, but we want the decisions to be more
strategic between easy-to-understand paths that are a puzzle to explore for gamers. Dive in."

## What to read (in this order)

All paths relative to the repository root (`/home/user/hanse-game`).

1. `CLAUDE.md` — the project's working doctrine. Adopt its table-first designer lens (physical
   components carry all state; icons over prose; player interaction is core).
2. `DESIGN.md` — pillars, architecture (§6), the balance lessons (§8 — these are hard-won
   canon: structure levers over value levers; content not rules; the pole/negation test), and
   the version history (§9).
3. `RULES.md` — the operational rules, complete.
4. `COMPONENTS.md` — the physical manifest, complete (§17's known-gaps table is directly
   relevant to Theme 2).
5. `play.html` — the reference implementation. Skip the CSS (lines 1–443) and the AI/render
   layers (lines ~2120 onward). Read the engine: constants & data (~444–800), state & setup
   (~808–890), helpers incl. the demand-die/value functions (~890–1101), the turn machine &
   stations (~1217–1460), brew/age/cellar/deploy/tap/blend (~1456–1628), load/sail/deliver/
   benefits (~1629–1806), harbor/charter/enshrine (~1808–1878), end-of-turn & scoring
   (~1879–1935).
6. Playtest evidence:
   - `playtests/logs/REVIEW-NOTES-v94.md` — a 30-game AI play-by-play corpus (10 per player
     count) with per-game notes and a synthesis of behavioral trends on the CURRENT rules.
   - `playtests/logs/REVIEW-NOTES.md` — the prior (v92) 15-game + human-log review that
     motivated the v2.9 changes.
   - `playtests/logs/human/` — logs of real human games (older rule iterations; read for
     behavior, not arithmetic).
   - Sample at least three raw play-by-play logs (`playtests/logs/pbp-*.log`) of your choosing
     to ground-truth the summaries.

## Hard exclusions (they exist to keep your read independent)

- Do NOT open anything under `archive/` — any path containing `archive`.
- Do NOT run `git log`, `git show`, or otherwise read repository history.
- Some documents reference a shelved "v3.0 exploration", a "table pass", or files named
  `TABLE-PASS*`. Do not seek any of that out; treat it as if it does not exist. Your job is to
  answer the brief from the game itself and the evidence, not from prior internal proposals.
- Do NOT read anything under `/tmp`.

## Your deliverable

Write your exploration to `/home/user/hanse-game/FRESH-EYES.md` (create it; overwrite if it
exists). It should be a working design document, not a summary — opinionated, specific, and
honest about trade-offs. Required coverage:

1. **Your independent diagnosis** of where the table cost actually lives (grounded in the rules,
   the engine, and the playtest evidence — cite specific games/moments).
2. **Theme 1 — line activation.** Evaluate the current station menus; design the ≤2-action
   station faces; analyze restricting deploy and/or load to the activated line's own slots
   (the designer explicitly wants this considered and analyzed, not assumed either way);
   state what breaks, what it costs, and how you'd validate it.
3. **Theme 2 — the slot stack.** What the game looks like without the demand dice; whether that
   forces a building rethink and of what kind; alternative ways buildings could manipulate the
   source→brew→age→ship loop without touching cask value; at least two structurally different
   candidate directions with a trade ledger, and your recommendation.
4. **The Floor** as a deliberate one-turn tension (good sometimes, never a default, mutually
   exclusive with the wharf) — concrete mechanisms.
5. **Paths to victory**: why the table fixated on presence/majorities while the Hall and the
   Flight went under-explored; whether new paths are warranted as the game streamlines, and if
   so what kind — under the constraint "not simpler; more strategic between easy-to-understand
   paths."
6. **A recommended package** (what you'd actually build first), a validation plan using the
   repo's existing sim/gate tooling, and an explicit list of what you would NOT change and why.

Constraints that are canon (from the docs): no dice-as-randomizers, no cards-as-hand, no money;
goods are the only currency; every value must live printed on a physical component; the
2×2-stations-plus-8-slots wharf and the move-then-activate turn are the game's identity; all
numbers are tunable ⚙ placeholders. Mark every number you propose ⚙.

Change no code and no existing files — your only write is `FRESH-EYES.md`. Your final message
should be an executive summary of the document (the document itself is the deliverable).
