# Changelog — *Brewhouses of the Hanse*

Compact version history. The **full rationale ("the why")** lives in `DESIGN.md` (§21 = v0.7, §20 = v0.6, §19 = v0.5, and the dated entries before them); the **current rules** are `RULES.md`. This file also compacts the retired `PLAY-TODO.md` brief, the `PLAYTEST.md` v0.1 snapshot, and the `playtests/` sim write-ups — the originals remain in git history if ever needed.

> **✅ v0.10 is live across the whole repo:** the markdown specs **and all four HTML pages** (`learn` · `index` · `printables` · `play`) are on v0.10 "The Wharf." *(Docs were consolidated back in v0.9 — `TILES.md` + `PLAYERBOARD.md` folded into `COMPONENTS.md`, and the former `rulebook.html` merged into `index.html` as "Rulebook & Components.")*

---

## v0.10 — every kontor a competitive majority, then BIG motivating majorities (2026-06-08)
Make the majority game live at **all four kontore** (not just Bergen) and make it a **big end-game motivator**. A partial revert of v0.9's "concentrate at Bergen," landed in two passes; the v0.9 warning (broad majorities starve prestige) was answered with two coupled rebalances. Engine (`play.html`, `KEY → v21`) + all docs and pages updated.
- **Big majorities at every kontor (the live numbers):** **Bruges 5/3/0 · London 6/4/2 · Novgorod 8/5/2 · Bergen 10/6/3** ⚙ — **Bergen the rich anchor** (its goods benefit is token, ≈ a Market visit, so the majority is its draw); Novgorod high for its hard Q3 reach but capped below Bergen (it already tops value + grants an upgrade). *(Pass 1 first tried a modest laddered spread ≈ v0.9's pool — 2/1/1…5/2/1 — but 2–3-pt majorities don't motivate; the designer pushed them up.)*
- **Per-cask delivery values cut** (Bruges 2→1, London/Bergen 3→2, Novgorod 5→4) so end-game points move **out of flat value and into the majority race**. Winner score split shifted `deliv 24 / maj 5` → `deliv ~18 / maj ~11` — majorities now a chunk on par with delivery and goals.
- **The Hall bumped Q×2 → Q×2.5** (floored: Q2→5 · Q3→7 · Q4→10 · Q5→12). Forced, not optional: prestige contests no majority, so big majorities tilt the game to the kontore and prestige needs a matching per-cask hit (Q×2 starved it to ~16%; Q×3 over-corrected; **Q×2.5 balances**).
- **Bergen normalized → goods** (+2 on delivery; an *upgrade* would re-clone it with London). Benefit pairing: **liquidity (Bruges/Bergen → goods)** vs **engine (London/Novgorod → an Upgrade)**. Flavor renamed **Monopoly → Bryggen**.
- **The structural insight:** presence = delivered-cask count, so **majorities are won by shipping WIDE, not by concentrating** — "go for majorities" *is* a volume play. The real axis stays **kontore (volume+majority) vs the Hall (prestige)**. (Harness's persona `majority` bot was also rebuilt to contest the richest reachable kontore, not camp one; it still trails by construction.)
- **Verified.** PERSONAS (N=500 × 2–5p): the volume-vs-prestige axis is balanced (**4p 26/26/23, 5p 21/24/15**, fair 25/20; 2p 52/51/47), prestige healthy everywhere; concentrate-`majority` persona trails at 3p/5p (structural). Greedy (N=500 × 2–5p): **0 crashes / 0 deadlocks, ~100% clock-ended, pace 13.8–14.4 (in band)**, winner scores ~45–47. Sim outputs: `playtests/sim-results-v21.txt`, `sim-results-v21-personas.txt`.

---

## v0.9 — tiered majorities · the London/Bergen identity split · seat compensation (2026-06-07)
Three balance changes, each **sim-validated** on the persona-driven harness (a bot that *commits* to a lean, so the Hall and Bergen are actually played — exposing what the old greedy bot couldn't). Engine (`play.html`, `KEY → v19`) + all docs and pages updated.
- **The headline de-risk:** with lean-committed bots, **volume vs prestige is balanced and viable** and the GWT "blend beats pure" thesis holds (blended winners 23% → ~70%). The earlier "prestige is marginal (3% Hall)" reading was a **greedy-bot artifact**, not a design flaw — the Hall needed no buff.
- **Tiered, ranked majorities (Lacerda-style).** Each kontor's majority now pays **1st/2nd/3rd** by delivered-cask count; **2-player skips 2nd** (winner-take-all); ties split the occupied tiers. The rich majority is **concentrated at Bergen (10/6/3 ⚙)**, with the other kontore minor (Bruges/London 2, Novgorod 3) and value-led. *Why concentrate:* broad tiered majorities at every kontor over-feed the volume lean and **starve prestige** (the lean that contests no majority); concentrating at Bergen fixed the previously-underpowered **majority** lean while keeping prestige viable. *Why not 15/10/5:* the literal Lacerda numbers overshoot our ~45-pt score scale (majority dominates, prestige tanks, scores inflate to ~50); **10/6/3** is the sim-balanced version of the same structure. Result: **all three leans within ~1–3 pts of fair at every count** (the "no pure path wins" ideal, finally measured).
- **London = the engine kontor; Bergen = the majority kontor.** They were near-clones (both Q2, value 3, upgrade). **Bergen no longer grants an upgrade** (its whole draw is the majority); **London** is now the accessible Q2 upgrade destination. Upgrade-earning kontore: **London + Novgorod** (the greedy economy is unchanged — total upgrades/game held steady, since the bot never shipped Bergen anyway).
- **Seat compensation: +1 G to every seat after the first** (`SEAT_COMP ⚙`). Fixed turn order gives P1 a real structural edge (sim: P1 54.7% at 2p, monotonic 38/34/28 at 3p). +1 G flattens it — seat-win-rate spread **2p 9.4→2.2, 3p 10.2→3.6**; 4–5p improved (residual middle/last-seat wobble for human playtest).
- **Verified (N=1000 × 2–5p, persona + greedy):** 0 crashes / 0 deadlocks, pace 14.0–14.4 rounds (in band), ~99–100% clock-ended, score scale unchanged (~45). Harness gained `PERSONAS` (lean-committed bots) and a `TUNE` hook (DEST re-stats). Sim outputs: `playtests/sim-results-v19-final.txt`, `sim-eval-v19-final-personas.txt`.

---

## v0.8 — occupancy pressure · the "Wharf" naming · fixed-quality exports · all six neutral buildings (2026-06-06 → 06-07)
Incremental refinements on the v0.7 "The Wharf" architecture (full rationale: `DESIGN.md` §21, dated entries).
- **Occupancy pressure (the de-rondel dial).** Moving onto a station a **rival already occupies** costs **1 `G`** to the supply (only your destination station, never the line; opening placement free; capped, never blocks). Chosen over the build×cash-out diagonal (prototyped, parked) because it keeps the loop legible while making position matter; it's also the first **seat balancer**. `KEY → v15`.
- **Naming locked.** "The Loop" → retired. **The Wharf** = the whole core area; **stations** = the four action spaces (was "cells"); **slots** = the 8 perimeter spaces (was "the wharf"/"ring"); **a line** = two stations + their two slots. Migrated across every page + doc; an **Action Reference** table was added to `rulebook.html`.
- **Export beers now carry fixed quality; deal 3 of 4 (variable ladder shape).** Was: four names shuffled onto fixed L3–L5 rungs (full ladder every game). Now: **Broyhan** Q3 · **Keut** Q3 · **Mumme** Q4 · **Bock** Q5, with **3 of the 4 dealt** each game — drop a Q3 → full Q3→Q5 climb; drop Mumme → no Q4; drop Bock → no Q5. The action follows the **quality** (Q3 Load · Q4 Reach · Q5 Wild); Hall (Q2) and Novgorod (Q3, always ≥1 Q3 present) are never locked out. `KEY → v16`.
- **All six neutral buildings now live in the engine.** Added **Towncrier** (draw a goal from the face-up goal supply — your best 2 still score) and **Almshouse** (+1 presence at a kontor you already lead) to `play.html` alongside Market Stall / Cooper / Crane / Counting House. The seeder now places **2–3** of the 6 each game (was a flat 2; scales with open slots — 3 at 2–3p, 2 at 4p, 1 at the tight 5p ring), matching the spec. `KEY → v18`.
- **Verified:** 500-game headless sims (2/3/4p) at each KEY — **0 crashes / 0 deadlocks**, pace **14.5–14.8 rounds** (in the 12–25 band), ~99–100% clock-ended (`playtests/sim-results-v18.txt`).
- **Print & Play fixes:** recipe-card title strip no longer ellipsizes (full beer name always prints — cost wraps instead); destinations-board upgrade row tightened (`.uprow` gap `.109in`) so the tiles stay on one row; **upgrade buy costs corrected to 4–5 `G`** to match the engine/spec (were stale at 2–3 G).
- **⚙ Parked for a later pass (noted in `DESIGN.md` §21):** the recipe-card **"acquire bonus"** stays a printed *placeholder* (not active) — to be designed and reintroduced after a human playtest.

---

## v0.7 — "The Wharf": a ground-up reel-in to GWT/Distilled weight (2026-06-05)
A near-total redesign that re-targets the game from "Lacerda-grade" to **Great Western Trail / Distilled** weight — *too much game, the right amount of theme.* Keeps the grid, the perimeter ring, the dual-role cask, the merchant-shipping fantasy, and the theme; **cuts roughly half the rules.** (Full rationale + the pace-model findings: `DESIGN.md` §21.)
- **One legible loop, walked on the grid.** The four stations **are** the loop and the forced-move circuit walks it: **A Market (Source) → B Brewhouse (Brew) → D Cellar (Age) → C Harbor (Ship)**. Every line is two adjacent loop-steps. (The v0.6 build×cash-out diagonal is retired for legibility.)
- **The cask is a dual-role action-tile in 3 states:** **maturing** (private vessel) → **on a slot** (a shared ring slot — your cargo + a **public, chunky, loop-advancing action** by type: Gruit→Source · Hopped→Age · L3→free Load · L4→+presence · L5→Wild) → **delivered** (shipped → scores → gone). Only cask on a slot are public/contestable; the brewery is private.
- **The wharf = the perimeter ring,** a transient mix of **deployed casks + owned ships + 2–3 seeded neutral buildings.** **One fire rule,** everything **on the active player's turn** (no out-of-turn skims — the v0.6 thing that felt wrong).
- **Value lives in *destinations*, not two tracks.** Ship to **kontore** for trade value + majorities (volume), or to **the Hall** for prestige (scarcity). Same verb, different destination. **Aging** is the new value-over-time signal. **Demand market, type frontier, and the Hall station are cut.**
- **Non-destructive interaction:** you may **ship a rival's cask on a slot** on your ship — they score it & pick the benefit; you get the slot/ship/timing. *A 1350 brewmaster doesn't fully control where their casks go.*
- **Deliver → earn an Upgrade → brew better → deliver better** (Distilled-style). Upgrades (Rooms + Modifiers) subsume v0.6's Privileges; **Fairs, route-lane tiles, the recipe card deck/boons/tuck, twins, and aging cubes are cut.**
- **Pace fixes** (the model put v0.6's first voyage at turn 6): **warm start** (1 Cog + 1 Ready cask), **start with 2 vessels**, **base verbs always work**, **all destinations open** → first voyage ≈ turn 2–3. **Recipes reel in to Gruit + Hopped start + plain permission tiles.**
- **Scoring:** delivery value (by destination) + majorities + goals (best few). No reach/standing tracks.
- **The Charter relief valve (added in the `play.html` port).** Porting the engine exposed a hard deadlock the bare wharf model allows (all your ships sailed + the ring full + vessels clogged = no legal move). Fix: at the Harbor you may always pay **⚙2 `G`** to ship **one** Ready cask (vessel *or* wharf) on an immediate single-cask voyage — it delivers and advances the Sailed-Ships clock, but at one cask for the fare it's strictly worse per cask than a Cog/Hulk, so owning ships stays the race. The deadlock guard; folded into `RULES.md`/`DESIGN.md §21·E′`/`COMPONENTS.md`/`TILES.md`.
- **Pace target ~12–25 rounds:** the `MAX_ROUND` ceiling reeled from 40 → **25** (top of the band); good play ends earlier on the Sailed-Ships clock. A **500-game sim** then showed the old linear clock caps (~6/8/10/12) ended 4–5p games in ~8 rounds (under the band, compressing the export climb), so the caps were **steepened to ~7/11/15/19 ⚙** (≈ +4 per player — the shared clock fills faster with more players). Re-sim: 2–5p medians 12–15 rounds, 99–100% clock-ended, all content (l4/l5, Novgorod, the Hall, every upgrade, the Wild action) reached; **0 invariant violations, 0 deadlocks across 500 games.**
- **Novgorod now earns an Upgrade** (on top of its highest value), addressing the sim's "Novgorod thinnest kontor" signal — the premium Q3 long-haul now pays the most *and* earns a perk. A benefit-aware re-sim shipped **2.4× more casks to Novgorod**.
- **Market "option B" — a face-up Upgrade display.** Recipes & ships stay an always-available supply; **upgrades** sit in a shared **face-up display** (~4 tiles drawn from a shuffled supply, refilling as taken). **Buy** from it (pay cost) **or earn** one *free* by delivering to **London / Bergen / Novgorod** — the same display, so *"you don't fully know what'll be on offer at the kontor."* The room/modifier split between the three engine-kontore dissolves into the one display (they differ by value/majority/gate); Bruges→goods, Hall→prestige stay the outliers. Save `KEY → v9`; verified (160-game headless: 0 violations, all 11 upgrades reached). Benefit map now: **Bruges→goods · London/Bergen/Novgorod→take an Upgrade from the display · Hall→prestige (Q×2)**, Bergen with the biggest majority, Novgorod with top value. *(⚙ parked: an escalating Charter fare on a track; and **evolving recipe acquisition** beyond a flat supply — both left for later.)*
- **Done this pass:** **all five HTML pages now on v0.7.** The `play.html` rewrite was **smoke-tested headlessly** (mocked-DOM `vm`, bot off the engine): 100+ games at 2–5p reach game-over crash-free & deadlock-free; a targeted test covers every cask action, the convert, the London/Bergen benefit pickers, and scoring. Save `KEY` → `hanse-hotseat-v8`.

## v0.7.1 — terminology + setup trims + Letter-landscape PnP (2026-06-06)
- Game title pluralized → **Brewhouses of the Hanse**. Premium beer tier **"Summit" → "Export"** (theme, not design jargon; the dealt Bock/Mumme/Broyhan/Keut still show in play).
- **Starting Gruit** now begins **Ready in a vessel** (deploy turn 1) instead of pre-placed on the shared slots — de-jams the ring at setup. The Cog stays the warm-start anchor.
- **First-player rotation removed** — turn order is **fixed** all game. Seat compensation (likely extra starting goods for later seats) is an open ⚙, to size at playtest.
- **Print & Play** fully redesigned for **US Letter landscape**: legible card-corner quality on casks (gem icon + number, no "Q"), 1/8″ tile/token bleed for cutting, recipes as **cards** (board tuck strip + a TBD dual-purpose bonus), and a reworked **Destinations** board (clean title bars · `L#+` gates with a quality icon · `★` VP icons · one cask slot + a per-player presence/majority marker track). Save `KEY → v10`.

## v0.6 — the Brewhouse Floor · recipe cards · single-use ships · the Sailed-Ships clock (2026-06-04)
- **Player board → the Brewhouse Floor.** One row of **4 multi-use slots**, each a **Room** (permanent) *or* a **working Cask** (temporary) — replaces the old separate room slots + personal cask slots. **Extra Vessel is a Room** that eats a Floor slot; a Ready cask with no open slot **clogs its vessel** (Floor scarcity and brewing back-pressure are now one tension).
- **Recipes → dual-use Market cards.** Big one-time **on-collect boon** by tier (L2 *Stocked Pantry* / L3 *Brewmaster's Push* / L4 *Grand Market* / L5 *Master's Privilege* = choose one) **+** a permanent **brew strip** tucked under the board's edge. **6-card soft cap**; still **pumps the type +1** on collect.
- **Ships → single-use destination carriers.** Built to a kontor (cap **Cog 2 / Hulk 3**), **loaded on line-fire by anyone** (loader benefit, owner skims a good); **full → sail** → casks become route presence, the **owner banks a per-kontor destination bonus**, and the ship tile moves to the shared **Sailed-Ships track**.
- **Reach split.** Harbor **direct-deploy = Bruges only** → a perimeter-slot cask (fires an action, **enshrine-able by anyone**). The **far kontore are reached only by ship** → **committed route presence** (not a slot, no action, **can't be enshrined**). The **Quay room** upgrades direct-deploy to any open route. Routes + ships are now reach's **engine** — the **merchant archetype** — mirroring standing's engine (rooms + export brewing).
- **Differentiated route-lane skims** (Bruges +1G · Bergen toll · London Privilege · Novgorod +1H/advance). **Weak alternates:** Harbor *dockwork*, Hall *petition*.
- **End clock reworked.** Primary = the **Sailed-Ships track fills** (self-accelerating). Backstop = **N casks enshrined** (replaces the turn cap). **City-saturation retired** as a trigger (route caps now only clamp presence / settle majorities).
- **`play.html`:** full engine rewrite to the above; save `KEY → v7`; verified 2–5p crash-free to game-over.

## v0.5 — the dual-role cask restored as the spine; the demand market (2026-06-03)
- The **cask in 3 states** — *working* (engine) / *reach* (presence) / *standing* (enshrined); enshrining **converts** a cask and removes its presence.
- **The demand market:** one shared value per beer type; a cask's enshrine payout = its type's value **at that instant**. Realizing a type **either way** drops it −1; a recipe-buy or Fair pump raises it +1. **VP tokens retired** (folded into this one number).
- **Any player may enshrine a deployed cask** (the positive-interaction churn). Station **C: Kontor → Hall** (the standing sink, distinct from the reach kontore).

## v0.4 — consistency pass (2026-06-03)
- Recipe **book** made canonical (claim-on-fire slot model retired); all pages re-aligned to the v0.3 model.

## v0.3 — recipe book · type ladder · value economy (2026-06-03)
- Beer split into **type + recipe** (a private book of collected recipes with variable cost profiles). Anchored **Gruit→Hopped** spine + a **dealt L3–L5 export** (Bock/Mumme/Broyhan/Keut). A global **type frontier** gates the Market's recipe supply.

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
- **✅ v0.8 is complete repo-wide (2026-06-07):** the markdown specs **and all five HTML pages** are on v0.8. `play.html` is canonical again (the de-facto reference implementation).
- **Smoke-test `play.html` before merge:** extract the inline `<script>`, run it in a mocked-DOM node `vm`, drive a bot off the engine (the rendered buttons' `onclick` handlers), and assert **2–5p games run crash-free *and deadlock-free* to game-over** (expect the **Sailed-Ships clock**, or the `MAX_ROUND` ≈25 ceiling). **Bump the save `KEY`** on any state-shape change.
- **Publish:** develop on the feature branch, then fast-forward `main` (GitHub Pages serves `main`).
