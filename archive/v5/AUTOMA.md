# Automa / AI Opponents

*The current state of the AI seats in `play.html` and the harnesses that gate them.
History and per-version teaching notes live in `DESIGN.md` §9 and git history; this doc
describes what stands today (v5.3b).*

## The ladder — five tiers, live in `play.html`

Any seat may be human or AI, any mix, 2–4p (5p runs). **No tier ever cheats on the
economy** — no bonus goods, no free presence; tiers differ only in decision quality.

| Tier | Engine | Character |
|---|---|---|
| **Apprentice** | greedy + decision noise, feature-blind (ignores majorities/goals) | "a new player can win" |
| **Journeyman** | the full greedy skeleton | the solid operator |
| **Trader** | greedy + the scoring systems (Flight push, tempered majority swing, endgame sense); carries the persona vocabulary | the strong heuristic |
| **Guildmaster** | **flat Monte Carlo** — enumerate the prompt's options, clone `(S,UI)`, determinize the decks, journeyman rollouts to game end, margin objective; budget `GUILD_MS` ⚙ 250 | the fast search oracle |
| **Cellarmaster** | **deep MC** — competent completion-biased rollouts, determinized hidden decks, **sequential halving** concentrating the budget on real contenders; `CELLAR_MS` ⚙ 1200 | the designer's arch-nemesis |

- **Objective = margin** (own score minus best rival's), never raw score — the
  anti-kingmaker rule for 3–4p search.
- **The Guildmaster defaults to the designer's 'quality' persona at 2–3p** (quality early
  and often; a Hopped/Gruit tempo valve; hops banked to the next high recipe) and to
  **pure search at 4p+** (the persona starves there — re-read before trusting GM seats at
  four). **The Cellarmaster is always pure search** — the contrast pair is deliberate: the
  designer's line vs the unbiased optimum.
- **Personas** ride the Trader (and the GM's fallbacks + rollout seat): the PATHWAYS lanes
  **majority · lifter · builder · breadth**, plus **'quality'** and the hall-committed
  **'hall'**. Assigned by instruments (`PERSONAS=1`), never a default; an explicit persona
  always overrides.

## Why this architecture (the surviving verdicts)

- **Every tier drives the canonical engine** — the same `UI.sub`/`UI.stage` prompt machine
  the buttons call, never a reimplementation. A rules change is inherited immediately; the
  one revision class that costs bot work is a **new decision type** (one new case in one
  dispatcher), and the sim gate surfaces a missed case as a stuck bot instantly.
- **Flat MC over a tree.** At this branching (~2–10 options per decision point) flat Monte
  Carlo captures most of a tree's benefit. Turn-level UCT was built and measured — it did
  not earn the default (slower per decision, weaker at equal wall-clock); it stays behind
  `CELLAR_MCTS` (default false) as a seam.
- **No handcrafted static eval** — it would be a second balance surface invalidated by
  every ⚙ retune. Playouts evaluate the rules as they now are, which is why the MC tiers
  absorb balance passes for free.
- **No learning-based tier** while the game is in balance flux; the CEM weight tuner is
  retired — the current heuristics carry no weight table.
- **The AI is a design instrument, not just an opponent:** the ladder is a standing
  regression test after every balance pass, and a *widening* GM-vs-Trader gap after a
  revision flags a discoverable line the heuristics can't see — a degenerate-strategy
  detector that fires before a human playtest.

## What the seats know (capability level)

The greedy skeleton (inherited by every tier, and by the MC rollouts): fee-netted
acquisition values and cheapest-net picks, true Flight marginals, dice-clock racing when
ahead, horizon sense at short runway, a probe-taught specialist-value table with
late-game decay on the openers, load/lift decisions netted against the open demand
(Manifest lines), Venture placement and the L2 climb, Bourse-aware pricing of shifts and
timed sails, and new-tile placement preferences. The MC pair additionally **samples every
branch as a first-class option** (venture grounds, shift targets, re-deals, hall pours)
and prices whole lines through `scorePlayer` — a rollout's own deliveries are the value
function.

**Expansions:** the Specialty Beers ride the normal draft unaided; **Jopenbier** is
explicitly wired (offered at the recipe channels with a hops-poor demotion, hops banked
toward it, a *cellar-then-cash* hold policy — never stranded); **hall mode** carries the
pour policy (the win bid · the door-slam · the fill, each netted against the port
alternative) with the MC sampling the largest and smallest eligible die per open Tasting.

## Difficulty design principles

- **Never cheat on the economy.** Euro players forgive a weak bot, not a dishonest one.
- **Dials that degrade gracefully:** ε-noise and feature blindness (Apprentice) · persona
  lean (readable table personality) · MC budget (`GUILD_MS`/`CELLAR_MS`).
- **Mixed tables are free** — the engine is hotseat-sequential; nothing cares which seats
  are human.

## Harnesses & gates

- **`playtests/ai-ladder.js`** — every higher tier beats the one below **≥60% at 2p**, 0
  errors; **shard the MC rungs** (`PAIR=` + bulk budgets — bulk budgets read low vs
  in-page strength).
- **`playtests/ai-render-smoke.js`** — full AI games (GM/CM + the expansion toggles)
  through the REAL render layer.
- **`playtests/sim.js`** — the robustness/pace gate riding the engine's own `aiStep`;
  `PERSONAS=1` prints the PATHWAYS lane report.
- **Standing rule:** the greedy tiers gate **robustness and pace**, never strategy or
  balance — they under-pilot deep lines by construction. Strategy reads = the MC tiers,
  the probes (`strategy-probe.js` · `flow-probe.js`) and the human table.

## The physical automa deck (queued — the end-state export)

A card-driven tabletop bot (Automa Factory / Garphill style) is unusually natural here —
the bot needs no private economy. Shape: a ~14-card deck, each card a line to run + a
per-station priority row; scores deliveries/majorities normally, skips brewing's
bookkeeping via a fixed maturation row; difficulty = deck composition. **Author it from
sim data, not intuition, and only once the ⚙ numbers settle** — printed cards are the one
AI artifact that cannot absorb a rules revision. Until then the digital tiers are the
automa.

## Open (AI-only; none gates a rules read)

- The GM 'quality' persona at 4p (count-gated to pure search) — re-read persona/budgets
  before trusting GM seats at four.
- The Cellarmaster's loss shape under hoarding (goods held at the horn) — a low-priority
  tuning glance.
- Sub-Guildmaster MC budget tiers, and a blind-AI option (mask rival-visible info), remain
  optional ideas.
