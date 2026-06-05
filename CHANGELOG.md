# Changelog — *Brewhouse of the Hanse*

Compact version history. The **full rationale ("the why")** lives in `DESIGN.md` (§21 = v0.7, §20 = v0.6, §19 = v0.5, and the dated entries before them); the **current rules** are `RULES.md`. This file also compacts the retired `PLAY-TODO.md` brief, the `PLAYTEST.md` v0.1 snapshot, and the `playtests/` sim write-ups — the originals remain in git history if ever needed.

> **⚠ v0.7 doc/code split:** v0.7 lands in the **markdown specs + `learn.html`** first. **`play.html`, `rulebook.html`, `index.html`, and `printables.html` still reflect v0.6** and are scheduled for a follow-up pass. Until then, the markdown is the source of truth; the older pages are knowingly stale.

---

## v0.7 — "The Wharf": a ground-up reel-in to GWT/Distilled weight (2026-06-05)
A near-total redesign that re-targets the game from "Lacerda-grade" to **Great Western Trail / Distilled** weight — *too much game, the right amount of theme.* Keeps the grid, the perimeter ring, the dual-role cask, the merchant-shipping fantasy, and the theme; **cuts roughly half the rules.** (Full rationale + the pace-model findings: `DESIGN.md` §21.)
- **One legible loop, walked on the grid.** The four cells **are** the loop and the forced-move circuit walks it: **A Market (Source) → B Brewhouse (Brew) → D Cellar (Age) → C Harbor (Ship)**. Every line is two adjacent loop-steps. (The v0.6 build×cash-out diagonal is retired for legibility.)
- **The cask is a dual-role action-tile in 3 states:** **maturing** (private vessel) → **on the wharf** (a shared ring slot — your cargo + a **public, chunky, loop-advancing action** by type: Gruit→Source · Hopped→Age · L3→free Load · L4→+presence · L5→Wild) → **delivered** (shipped → scores → gone). Only wharf casks are public/contestable; the brewery is private.
- **The wharf = the perimeter ring,** a transient mix of **deployed casks + owned ships + 2–3 seeded neutral buildings.** **One fire rule,** everything **on the active player's turn** (no out-of-turn skims — the v0.6 thing that felt wrong).
- **Value lives in *destinations*, not two tracks.** Ship to **kontore** for trade value + majorities (volume), or to **the Hall** for prestige (scarcity). Same verb, different destination. **Aging** is the new value-over-time signal. **Demand market, type frontier, and the Hall cell are cut.**
- **Non-destructive interaction:** you may **ship a rival's wharf cask** on your ship — they score it & pick the benefit; you get the slot/ship/timing. *A 1350 brewmaster doesn't fully control where their casks go.*
- **Deliver → earn an Upgrade → brew better → deliver better** (Distilled-style). Upgrades (Rooms + Modifiers) subsume v0.6's Privileges; **Fairs, route-lane tiles, the recipe card deck/boons/tuck, twins, and aging cubes are cut.**
- **Pace fixes** (the model put v0.6's first voyage at turn 6): **warm start** (1 Cog + 1 Ready cask), **start with 2 vessels**, **base verbs always work**, **all destinations open** → first voyage ≈ turn 2–3. **Recipes reel in to Gruit + Hopped start + plain permission tiles.**
- **Scoring:** delivery value (by destination) + majorities + goals (best few). No reach/standing tracks.
- **This pass:** markdown specs + `learn.html` updated to v0.7; `play.html` + the other pages follow.

## v0.6 — the Brewhouse Floor · recipe cards · single-use ships · the Sailed-Ships clock (2026-06-04)
- **Player board → the Brewhouse Floor.** One row of **4 multi-use slots**, each a **Room** (permanent) *or* a **working Cask** (temporary) — replaces the old separate room slots + personal cask slots. **Extra Vessel is a Room** that eats a Floor slot; a Ready cask with no open slot **clogs its vessel** (Floor scarcity and brewing back-pressure are now one tension).
- **Recipes → dual-use Market cards.** Big one-time **on-collect boon** by tier (L2 *Stocked Pantry* / L3 *Brewmaster's Push* / L4 *Grand Market* / L5 *Master's Privilege* = choose one) **+** a permanent **brew strip** tucked under the board's edge. **6-card soft cap**; still **pumps the type +1** on collect.
- **Ships → single-use destination carriers.** Built to a kontor (cap **Cog 2 / Hulk 3**), **loaded on line-fire by anyone** (loader benefit, owner skims a good); **full → sail** → casks become route presence, the **owner banks a per-kontor destination bonus**, and the ship tile moves to the shared **Sailed-Ships track**.
- **Reach split.** Harbor **direct-deploy = Bruges only** → a perimeter-slot cask (fires an action, **enshrine-able by anyone**). The **far kontore are reached only by ship** → **committed route presence** (not a slot, no action, **can't be enshrined**). The **Quay room** upgrades direct-deploy to any open route. Routes + ships are now reach's **engine** — the **merchant archetype** — mirroring standing's engine (rooms + summit brewing).
- **Differentiated route-lane skims** (Bruges +1G · Bergen toll · London Privilege · Novgorod +1H/advance). **Weak alternates:** Harbor *dockwork*, Hall *petition*.
- **End clock reworked.** Primary = the **Sailed-Ships track fills** (self-accelerating). Backstop = **N casks enshrined** (replaces the turn cap). **City-saturation retired** as a trigger (route caps now only clamp presence / settle majorities).
- **`play.html`:** full engine rewrite to the above; save `KEY → v7`; verified 2–5p crash-free to game-over.

## v0.5 — the dual-role cask restored as the spine; the demand market (2026-06-03)
- The **cask in 3 states** — *working* (engine) / *reach* (presence) / *standing* (enshrined); enshrining **converts** a cask and removes its presence.
- **The demand market:** one shared value per beer type; a cask's enshrine payout = its type's value **at that instant**. Realizing a type **either way** drops it −1; a recipe-buy or Fair pump raises it +1. **VP tokens retired** (folded into this one number).
- **Any player may enshrine a deployed cask** (the positive-interaction churn). Cell **C: Kontor → Hall** (the standing sink, distinct from the reach kontore).

## v0.4 — consistency pass (2026-06-03)
- Recipe **book** made canonical (claim-on-fire slot model retired); all pages re-aligned to the v0.3 model.

## v0.3 — recipe book · type ladder · value economy (2026-06-03)
- Beer split into **type + recipe** (a private book of collected recipes with variable cost profiles). Anchored **Gruit→Hopped** spine + a **dealt L3–L5 summit** (Bock/Mumme/Broyhan/Keut). A global **type frontier** gates the Market's recipe supply.

## v0.2 — first balance pass (from the 3p engine sim)
- Lane skim **→ +1G** (it had been +1 presence, which ran away — a 3p sim ended on turn 4). **Presence clamped to route caps**; enshrine **direct from a Ready cask**; standing values 3/5/7/10.

## v0.1 — architecture + first paper pressure-test
- The **2×2 build×cash-out grid** + 8 perimeter slots; the cask family walked on paper (2p, breadth vs depth). Confirmed the grid produces real opening variety and the breadth-vs-depth tension.

---

## Balance lessons carried forward (distilled from the retired sims)
These are *why the current rules look the way they do* — keep them in mind before re-tuning:

1. **Whichever scoring axis is left uncapped becomes the dominant strategy.** Across passes, **tokens → standing-goals → lane-stacking** each ran away in turn. Hence: the **best-3 goal cap**, **capped lane value**, and **no passive faucets**.
2. **Standing structurally out-scored reach** in early builds, because reach was **capacity-bounded** (routes fill, then you can't sell) while standing was **unbounded** *and* uniquely carried **goals**. v0.6's answer: give reach its **own engine** (ships + routes + the self-accelerating Sailed-Ships clock + destination bonuses) and keep the **cycled best-3 goals** (each rewards the axis you *didn't* bank).
3. **The game was throughput-bound** (1 vessel + multi-step brews → only a few casks all game) → **passive aging**, **vessel scaling**, and **big recipe boons** now grease tempo.
4. **The old end-clocks never fired** (heritage threshold too high; the reach/city clock rare) → the **self-accelerating Sailed-Ships track** + the **enshrine backstop**.
5. **The random opening was unfair** (a Tripel start won ~1.7× a Hopped start) → start with **2 random premium recipe cards** (narrowed the swing to ~1.4×).
6. **The three "leanings" are not orthogonal:** *Engine* overlaps *Standing* (you climb the ladder by banking higher casks), and both sell-modes feed the same value-timing. The honest model is **Reach vs Standing, tempo-tuned by engine** — a *pure* extreme should lose to a **blend** (the GWT ideal).
7. **2p wants lower route caps** so majorities settle meaningfully and games don't drag.
8. **(v0.7) Ambition was the bug.** v0.6 chased Lacerda weight; a play-through + a headless pace model (first voyage **turn 6**, goods-/geometry-bound, the optimal line invisible) showed the cost. The fix wasn't another subsystem — it was **cutting** to one walkable loop and making the actions chunky and on-turn. *Lessons #1/#2 (cap the axes; give each path its engine) are now served by **destinations**, not parallel tracks; #3 (throughput) by the **warm start + base-verbs-always-work**.*

> The pre-v0.7 open questions (esp. #2 and #6) are largely **dissolved** by the §21 reframe (one delivery pile, no parallel reach/standing tracks). The new top question is the same as always: a **human playtest** — now of the v0.7 loop's *feel* and pace — before the `⚙` numbers are trusted. See `DESIGN.md` §21 "Still open / next dials (v0.7)."

---

## Working the repo
- **Source of truth order:** `DESIGN.md` (why) → `RULES.md` (spec) → `play.html` (the de-facto reference implementation — correctness fixes here are rules fixes). Keep the docs, the published pages (`index`/`learn`/`rulebook`/`printables`), and `play.html` **in sync** — a change is never local.
- **⚠ During the v0.7 transition (2026-06-05):** the **markdown specs + `learn.html` are canonical (v0.7)**; `play.html`, `rulebook.html`, `index.html`, and `printables.html` are **still v0.6** and must be ported in a follow-up pass before they're trusted. The v0.7 `play.html` rewrite is specced in `DESIGN.md` §21 "Engine deltas."
- **Smoke-test `play.html` before merge:** extract the inline `<script>`, run it in a mocked-DOM node `vm`, drive a bot off the rendered buttons' `onclick` strings, and assert **2–5p games run crash-free to game-over** (expect the Sailed-Ships or enshrine clock, or the `MAX_TURN` safety). **Bump the save `KEY`** on any state-shape change.
- **Publish:** develop on the feature branch, then fast-forward `main` (GitHub Pages serves `main`).
