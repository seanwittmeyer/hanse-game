# Automa / AI Opponent — Plan & Status

> **v4.15 "Guildhall" (2026-08-10): the enshrine teaches.** The greedy tiers gain ONE
> compact policy — `aiEnshrineBest` scores every (cask · shelf · menu-option) triple against
> the port alternative (~pips + 1.6 slack) with a +1.6 first-appearance kicker, and the
> `stops` case fires it when it beats the line's best stop; the ★-pick nets shelf★ − alt,
> the action picks net a flat engine value (age 2.4 · brew 2.4 · seal 2.0+best-row-★ …).
> Safety-net greedy cases for the 'enshrine'/'seal'/'parti' prompts. **The MC pair samples
> every enshrine triple** as first-class options in the 'stops' branch — playouts price the
> lane through `scorePlayer` (the crown rides the module's ext seam). The greedy tiers are
> the robustness read as ever; the menu-value question is the SWEEP's job (sim `HALL=1` +
> `HALL_STARS`/`HALL_MENU` + the pick histogram), not the greedy prior's.

> **v4.14 "Beer Atlas" (2026-08-09): the expansion-beer teaches (light).** The greedy tiers
> inherit the four new STYLES for free (brew keys, load values, dest picks all read the die);
> the specific teaches are three small guards — **Jopenbier demotion when hops-poor** (the
> recipe channels subtract ~2.5–3 from its rank at `hops<6` so racers don't strand 3H on a
> 2G4H beer they can't fund), the **parti-gyle heuristic** (an AI takes the free Gruit at
> `trayDice>2` ⚙ — the runway prices the runnings), and the greedy `case 'parti'` safety net.
> The MC pair prices all four signatures through `scorePlayer` unaided (a delivered Duckstein
> IS its lifted die; a Jopenbier climb is a rollout's 6/8★). The greedy tiers under-pilot the
> signatures as ever — persona/MC/human reads govern the expansion balance.

> **v4.7 "Every Cask" (2026-08-02): the ruled AI pass.** (1) **`aiSpecVal` re-taught to the
> SPECIALIST-VALUE-STUDY's probe truth** — new base table (supercargo 4.4 · granary 4.2 ·
> scholar 3.8 · shipwright 3.4 · cellar 3.2 · braumeister 3.0 · innkeeper 2.8 · crane 2.6 ·
> hopgarden 2.4 · alderman/chandler 2.2 · chronicler/towncrier 1.8) + a **late-game ×0.5
> decay on the openers** (supercargo/scholar/shipwright/cellar — they measured +18…29 start
> → +2…6 mid); the Chronicler/Alderman dynamics stand. (2) **The GM's 'quality' persona is
> COUNT-GATED**: 2–3p only — at 4p+ `aiPersona` returns null (pure search), off the #26
> starvation; an explicit PATHWAYS persona still overrides at any count. (3) **The
> Merchants' Exchange over-cycle is damped** (stop value 1.1 → 0.7 / 0.3 → 0.15) — real
> verbs outrank the shuffle (~8 cycles/game in v4.6 smoke polluted the verb reads). The
> engine also grew `innkeeperTick` (the v4.7 rework — fires beside the Braumeister's at
> turn start; the AI needs no new teach, the drip is automatic).

> **WATCH (2026-08-02, off playtests #26/#27):** the **Guildmaster's v45f 'quality' persona
> starves at 4p ONLY** — #26 (4p): a GM seat managed 3 brews / 3 deliveries in 11 rounds,
> CMs finished 1-2 (69/45 vs 34/22); **#27 (3p): the GM pair went 1-2 (64/50 vs 44)**, the
> quality line (Braumeister drip → Mumme → Novgorod premium → a 2-die Bergen majority)
> winning exactly as the persona intends — and the GM, not the CM, raced the clock. So the
> watch narrows: re-read the persona/budgets **at 4p** before trusting GM seats there.
> Also: `aiSpecVal` needs a probe re-teach — the SPECIALIST-VALUE-STUDY shows it over-seats
> the Cellarman and badly under-seats Supercargo/Grain Factor/Shipwright vs their measured
> lifts. And the CM's #27 loss shape (9 brews, 6 conversions, 11 goods hoarded at the horn)
> is a low-priority tuning glance. All AI-only; none gates a rules read.

> **v4.6 "Guildbook" (2026-08-02): every tier re-taught to the roster program.** The greedy
> skeleton gains `aiSpecVal` (one specialist-value table for the hire verb, the Hiring Post
> and the Bergen prize — Innkeeper 3.4 · Scholar 2.8 + a missing-recipes kicker · Chandler
> 2.6 · the collectors dynamic off ladings/presence ⚙), the **Scholar/Shipwright waivers**
> flow through `recipeFeeFor`/`commCostFor` (every AI valuation and affordability check reads
> them), `aiChandler` swaps toward the bound currency at turn start, the **Exchange** cycles
> the lowest-value order none of its Ready casks can claim (watch: greedy tiers over-cycle —
> ~8/game in early smoke; a robustness tic, damp the verb value if it pollutes reads), and the
> **Capstan** warps via `aiCapPair` (empty hull my casks can serve → a lift/shaper slot). The
> MC pair samples the new branches (`AI_MC_SUBS` + aiMCOptions: every cycle target · every
> warp pair). Seat-gates ride `hireable` → every channel respects them for free. Gates at
> v4.6 (light): verify 168/168 · sim 12 crash-free; the ladder/PATHWAYS re-read is queued
> with the next full battery.

> **v45f (2026-08-01, designer-ruled): the GUILDMASTER plays the designer's line.** A standing
> **'quality' persona** ("quality early and often; maximize points per cask, but Hopped when
> needed") rides the GM's greedy fallbacks AND its own seat inside the MC rollouts, plus a
> small **style prior** on the sampled option margins ((Q−2)·0.7 on brew labels, −0.8 on
> face-1 bumps ⚙ — breaks near-ties toward the line, never overrides a clear margin; the
> pure-margin pick alone did NOT move the mix, because the bottleneck was upstream: post-v45e
> the lane must BANK HOPS toward its next high recipe, which the source case now does). The
> lane's teaches: Q-weighted brews with a Hopped/Gruit **tempo valve** (a low-gate hull one
> cask from sailing, or the endgame) · hops banked to the next missing export's fee+brew ·
> lifter-strength die weight on loads · bumps at 0.55 · Q-pulled recipe acquisition. An
> explicit persona (PATHWAYS) overrides; **the Cellarmaster stays pure search** — the contrast
> pair is deliberate (the designer's line vs the unbiased optimum). **Probe** (12g 2p vs
> journeyman @60ms): Mumme+Bock brew share 18→24%, Q3+ 55%, **pips/delivered cask 2.93 vs
> 2.63**, Hopped 33% (the valve working), 92% wins, +22 avg margin. Rung re-check in
> `playtests/ladder-v45f-tg.txt`.

> **v4.5b “Open Orders” (2026-07-31): all five tiers were RE-TAUGHT to the #24 program.**
> Greedy skeleton (every tier inherits): the commission **de-mint** (hull value = berth tempo +
> the free load + any lading the load could claim — never ★), **`aiLadingBonus`** (the open row
> prices every load/commission/ship pick at 0.5–0.6 weight — one claim per cask, contested),
> values for the new verbs (**rack** = READY-tempo minus overflow loss, pair-scanned ·
> **assay** = finish-first, 2.2 when a die sits one short · **hopex/tollhouse** load options via
> `aiLoadOpt` — v45c: both decisions **net against the open lading row** (pay the hop when it
> opens the gate, reaches an order, or hops are slack; stamp only when +2★ −1 pip beats any
> order the lower face forfeits), the **Braumeister at 3.6** in the hire table (second only to the Cellarman),
> and new-tile placement prefs (Kiln → Assay → Bonded → Cooperage → Racking → Hop Exchange
> first). MC pair (GM/CM): the rollouts inherit all of the above; **`aiMCOptions` now samples
> the new branches** (every rack swap pair · every assay target · the hopex/tollhouse
> use-or-pass), and the playout determinizer **shuffles the hidden lading deck** (it was a
> perfect-information leak for one build). **Oracle reads (short, n=30-40/count):**
> trader>journeyman **65%** (the 60% lint passes again — the lading/de-mint sense widened the
> gap v4.3 had squeezed) · pace 2p 14.6 / 3p 13.8 / 4p 12.6 avg rounds, dice trigger ~100% ·
> **FULL battery (2026-07-31, on the revised build):** sim 500/count — 0 crashes/0 deadlocks
> across 1500 games, pace 2p 14.6 (82% band) / 3p 14.0 (80.6%) / 4p 13.3 (73.6%), dice
> trigger 98.6–99.8% · render-smoke **ALL PASS** incl. GM/CM through the real render layer ·
> ladder: jour>app **89.2%** · trader>jour **55.8%** n=120 (pooled with the oracle's 65%
> n=40 → **~58%** — the known lint hover persists at scale; the short oracle's 65% was the
> small-n flatter; standing rule: greedy tiers gate robustness, not strategy) · GM>trader
> **87.5%** pooled (42/48 @ bulk 120ms) · CM>GM **66.7%** pooled (16/24 @ bulk 400ms; a
> 16-game pre-extension baseline read 81.3) — **every rung ≥60%, 0 errors.** PATHWAYS at
> n=200/lane (supersedes the n=40 oracle — the "breadth cold 12.5%" was noise): 2p 50.5/49.5
> fair · 3p majority 30.5 / lifter 29.0 / **builder 40.5 (hot, +7 over fair)** · 4p majority
> 32.5 / **lifter 19.5 (mildly cold, −5.5)** / builder 25.5 / breadth 22.5 (fine). Pool
> sweep (n=40/count): 11 too fast · **12 (live) is on the fast edge under greedy play** (4p
> band 73.6%) · **13 holds the band best everywhere** (82.5/92.5/82.5) · 14 slows to 16–17
> rds (92% bands) — a designer dial call; greedy racers under-read human pace. Flow probe
> (600 games) ran clean on v4.5b: no blocked channels (the economy is slack — hops surplus),
> building gains via the fee channel are rare (~0.1–0.3×/game each; London's prize is the
> real faucet), Keut is the least-brewed export (~7% of brews), late-phase weak-decision
> share rises to ~13% at 2–3p. NOTE the probe counts fee GAINS, not verb USAGE — rack/assay/
> tollhouse/lading utilization is still uninstrumented (the standing gap).

> **v4.0 “Bright Beer” (2026-07-21): the AI was REBUILT with the streamline — and P5 is SHIPPED
> same-day.** All five tiers are LIVE in `play.html`: **Apprentice / Journeyman / Trader** (the
> compact value-heuristic ladder; journeyman is the solid operator, the trader adds the scoring
> systems — Flight push, tempered majority swing, endgame sense) and the rebuilt Monte-Carlo
> pair — the **Guildmaster** (flat MC: enumerate the prompt's options, clone (S,UI), determinize
> the decks, journeyman rollouts to game end, margin objective; `GUILD_MS` 250) and the
> **Cellarmaster** (trader rollouts + one round of sequential halving; `CELLAR_MS` 1200). The v4
> search space is far smaller, so the whole MC block is ~100 lines (`aiMCDecide`/`aiMCOptions`).
> **Personas** (the pathway oracle's lanes) ride the Trader: majority · lifter · builder ·
> breadth — `PERSONAS=1 node playtests/sim.js` prints the per-lane PATHWAYS report (v40 read at
> 4p: 25.0 / 24.5 / 29.5 / 21.0% — fair 25). **Gates (KEY v40):** ladder — journeyman>apprentice
> 75.0% · trader>journeyman 69.2% (n=120 each) · **GM>trader 95.8%** (46/48, 4 shards @120ms) ·
> **CM>GM 62.5%** (20/32, 4 shards @ bulk 400ms; the historic pattern — bulk budgets read low) —
> every rung ≥60%, 0 errors (`playtests/ai-ladder-vhanse-v40.txt`); render-smoke ALL PASS incl.
> full GM & CM games through the REAL render layer. The `ai-tune.js` CEM tuner stays retired —
> the v4 heuristics carry no weight table.
>
> **v4.3 “Open Quay” (2026-07-26): the greedy tiers were RE-TAUGHT to the v4 economy** —
> fee-netted acquisition values (`aiFeeCost`), true Flight marginals (`aiFlightMarg`),
> cheapest-net recipe/specialist picks, the shared-station dodge cut with the toll, a
> dice-clock race push when ahead (`aiClockPush`) and horizon sense (`aiLateGame`: options
> fade, banking accelerates at runway ≤4). **Rung read: trader>journeyman ~55% pooled (n=700)**
> — under the 60% lint because journeyman inherits the shared fee sense (the skeleton got
> smarter for every tier); widening the gap by weakening journeyman was rejected. The MC pair
> sits on the improved trader policy. Everything below this line is the v3 record, kept
> for the method.


> **v3.1 addendum (2026-07-12):** the Trader gained a fourth persona — **racer**, the charter-pump
> clock-racer modeled on the first human playtest's winning line (author a kontor-charter Privilege
> early · pump cheap fast casks through it · dispatch to close the clock once ahead). Built as the
> standing pressure-test opponent; seat it as `trader`/`racer` (`playtests/v31-matrix.js` uses it).


> The plan for an AI opponent you can play against in `play.html`, with **variable difficulty** and **any mix of humans and AIs at 2–4p** (current build **v3.0-A.1 “Path A”**) — plus a derived **physical automa deck** for tabletop solo play. Compares the candidate systems (heuristic policy, flat Monte Carlo, MCTS, depth-limited search, learning) and lays out a staged path. Queued in `DESIGN.md` §21 (v0.9 "Still open / next": *"a solo Automa from the existing bot"*).
>
> **STATUS — ALL THREE PHASES SHIPPED (Phase 3: 2026-06-12, `play.html` `KEY → v24`).**
> **v3.0-A retarget (2026-07-11):** all five tiers were retargeted to the Path A grammar (stay-home Floor, Dispatch, slot/cask stops, over-deploy, Hall shelf spaces, Flight unlocks) with the ladder gate re-validated at 600 games — every rung ≥60%, 0 errors (`playtests/ai-ladder-vhanse-v3a-v1.txt`); the CM>GM edge widened in the 162-game strong-play corpus (`playtests/logs/v3-corpus/`, mixed tables: CM 70% per-seat vs GM 16%).
> **Phase 3:** the **Guildmaster** tier is live — flat Monte Carlo over the canonical engine (clone `(S,UI)` per option, Journeyman rollouts to game end, margin objective, `GUILD_MS` ⚙ 250ms/decision budget). Measured at 2p: **Guildmaster > Trader 99.0%** (n=200 at a reduced 40ms test budget; avg score 63.4 vs 26.8) — the flat-MC step-change §2B predicted, with **no engine refactor** (same-scope global swap, `aiSimulating` guards). Flat MC has not plateaued, so UCT/max-n (§2C) stays unbuilt by its own criterion. Full ladder: 66.2% / 62.2% / 99.0% (`playtests/ai-ladder-v24.txt`). *(Perf: the GM enumerates only genuinely high-leverage prompts — **stop ORDERING is delegated to the trader heuristic** (`aiStops`), not Monte-Carlo'd. The same up-to-4 stops resolve this turn whatever the order, and the heuristic already sorts them Source→Brew→Age→Ship, so MC-ing the permutation was ~40% of the GM's per-turn compute / main-thread freeze for ~no strength: cutting it ~halves the per-turn MC count (≈8→≈4.6) with the ladder gate intact — GM still > Trader. The Cellarmaster shares the same enumerator, so it benefits too.)*
>
> *(Phase 1 & 2 record:)* **Phases 1 & 2 shipped 2026-06-11.**
> **Phase 1:** AI seats with the **Apprentice / Journeyman / Trader** ladder are live — per-seat selection in New Game, paced/instant turns, human-input lockout, no-cheating tiers. The §6 ladder gate is **validated** (2p, N=1000/pairing: Journeyman > Apprentice 66.4%, Trader > Journeyman 62.2%, Trader > Apprentice 72.1%; 0 crashes/deadlocks across all runs). Phase 1 notes vs the plan below: the Trader tier gained more than a persona lean to make the ladder real — a majority-*swing* destination score (own delta + rivals' loss), exact goal marginals, an end-weighted Hall, the Q5 climb, an own-casks-first load policy, and same-turn line-aware deploys.
> **Phase 2:** the Trader's weights are a **tuning surface** (`AI_W` + a per-seat `p.ai.w` override) and `playtests/ai-tune.js` is the **CEM optimizer** over it (candidate vs incumbent + Journeyman + a 4p table, inside the canonical engine; ~2 min per run). First full run **validated the incumbent** (best candidate 50.4% vs defaults — KEEP) and showed the surface is a **plateau** (±20% weight drift ≈ no change), i.e. Trader strength is robust to balance retunes; one directional signal was adopted (`leanVal` → 1.05). **After any balance pass: re-run the tuner; adoption is a number-copy + the standard gates.**
> Harnesses: `ai-ladder.js` (ladder + mixed-table gates, incl. the Guildmaster pairing at a reduced `GUILD_MS`) · `ai-render-smoke.js` (real render layer, incl. a Guildmaster game) · `ai-tune.js` (weight re-tuning). Details: `DESIGN.md` §9 (tooling milestones). Remaining queue: the **physical automa deck** (§7 — derive from the tuned bot once the ⚙ numbers settle) and optional sub-Guildmaster MC budget tiers.

---

## 1. What the codebase already gives us (the load-bearing facts)

The feasibility of every option below hangs on four properties the repo already has:

1. **The game state is one JSON-serializable object.** `play.html` keeps everything in `S` (players, slots, deck, clock) + a small `UI` interaction state; undo literally works by `JSON.stringify(S)` (`snapshot()`/`doUndo()`). **Cloning a position is trivial and cheap** — the prerequisite for any simulation-based AI.
2. **The engine is a UI-driven state machine with no hidden coupling to the DOM.** Every decision is a `UI.sub`/`UI.stage` prompt resolved by a plain function (`doMove`, `chooseLine`, `resolveStop`, `brewPick`, `ageAllot`, `loadOnto`, `charterDest`, `benefitPick`, `endTurn`…). The sim harness proves `render`/`log`/`save`/`snapshot` can be stubbed to no-ops and the engine driven headlessly.
3. **A competent heuristic bot already exists and is battle-hardened** (`playtests/sim.js`): it navigates the real `UI.sub`/`UI.stage` machine, is topology-agnostic and toll-aware, has **persona variants** (volume / prestige / majority leans), and has survived thousands of games at 2–4p with 0 crashes / 0 deadlocks. Its blind spots are documented (never ships Bergen in greedy mode, rarely climbs to Q4–Q5, charter-heavy at 4p).
4. **Full-game playouts are ~2 ms.** 1500 headless games run in ~3 s. That number is what makes Monte Carlo methods *practical in the browser*: a few hundred greedy playouts per decision ≈ 0.5–2 s, easily hidden in a Web Worker.

Game-theoretic profile (digital client): **perfect information** (goals are visible in the hotseat UI; see §6.4), **deterministic in play** except the face-down Upgrade-deck refill order, **2–4 players** (not zero-sum two-player — rules out classic alpha-beta), ~12–25 rounds, and a turn that is a *chain* of small decisions (move ≤2 options × line 2 × stop order × sub-choices) — modest branching per decision point (~2–10), combinatorial per whole turn (tens to low hundreds of distinct turn outcomes).

---

## 2. Candidate systems — the comparison

### A. Heuristic policy bot (port the sim bot into `play.html`)
The bot picks each decision directly from handwritten rules (what `sim.js` does today: work the Wharf, brew the best affordable recipe, age the cask closest to Ready, deploy, ship to the best reachable destination, earn upgrades by delivering, charter only as relief).

- **Strength:** beats beginners; the documented blind spots make it exploitable by anyone who's played a few games. Personas raise the ceiling a notch (they actually contest Bergen and the Hall).
- **Difficulty dial:** coarse — tiers are *different heuristic sets* (handicapped greedy → greedy → persona), plus decision noise (ε-greedy among legal moves). Honest (no resource cheating) but the top tier is capped at "the best rules we hand-wrote."
- **Effort:** **days.** The hard part (a robust engine-driving bot) is already written; the work is porting it into the page scope, adding AI seats, and pacing its actions so a human can watch.
- **Latency:** instant. **Multiplayer:** free — it just plays its seats.
- **Maintenance under rule churn:** good — heuristics read engine constants (`DEST`, `STYLES`, `CELLROLE`), so most ⚙ retunes flow through automatically; only *strategic* rewrites (new mechanics) need bot edits.

### B. Flat Monte Carlo (no tree) — "greedy playouts as an evaluator"
For each legal option at the current decision point, clone `S`, take that option, then let **the greedy bot play everyone to game end** K times (re-shuffling the unseen Upgrade deck per playout); pick the option with the best mean *score margin*. No UCT, no tree — just simulation as a one-ply evaluation function.

- **Strength:** a real jump over A. Flat MC with a competent playout policy fixes exactly the heuristic bot's weakness — it *discovers* that a Bergen delivery or a Hall climb pays, because the playouts score it, without anyone hand-writing that rule. At this branching factor (~2–10 options/decision) flat MC captures most of MCTS's benefit.
- **Difficulty dial:** **excellent and continuous** — K (playouts per option) scales smoothly from "barely better than greedy" to strong; also softmax-sample among top options for mid tiers.
- **Effort:** **~1–2 weeks** on top of A. Needs the engine's mutators callable on a *cloned* (S, UI) pair rather than the globals — the one real refactor (see §5.1) — plus a Web Worker so the UI doesn't freeze.
- **Latency:** ~0.2–2 s per decision at K=10–100 per option (playout ≈ 2 ms). A turn is ~3–8 decision points, so a few seconds per AI turn — fine with a "thinking…" indicator.
- **Maintenance:** **the best of all options.** It evaluates by *playing the actual current rules*, so every ⚙ retune is absorbed for free. For a game still in active balance flux, this property is gold.

### C. Full MCTS (UCT, max-n backup)
The same simulation core as B, but build a tree over *sequences* of decision points (each `UI.sub` prompt = a node; the player-to-move maximizes their own component of a per-player score vector — the standard max-n adaptation for >2 players). Use the greedy bot as the rollout policy below the tree frontier; determinize the Upgrade deck per iteration.

- **Strength:** the highest ceiling of the practical options. The tree lets it plan *within* a turn (stop ordering, load-then-launch chains) and a ply or two of opponent response — e.g., seeing that deploying a cask hands a rival a juicy slot action, or timing the Sailed-Ships clock.
- **Difficulty dial:** the classic one — iteration/time budget per decision; also exploration constant and rollout truncation (cut playouts at N rounds + static eval = faster but needs an eval function).
- **Effort:** **~2–4 weeks** on top of B (tree bookkeeping, max-n backup, transposition-free sequencing through chained sub-decisions, tuning). The known MCTS sharp edges for this game: multi-step turns mean the "action" granularity must be the *decision point*, not the whole turn (whole-turn enumeration explodes); and n-player MCTS can drift toward "paranoid" or "kingmaker" lines without a margin-based objective (§6.5).
- **Latency:** 1–5 s per decision at meaningful strength; budget-capped, worker-isolated.
- **Maintenance:** same as B (simulation absorbs retunes); the tree code itself is rules-agnostic.

### D. Depth-limited max-n / expectimax with a handcrafted evaluation
Enumerate whole turn-plans 1–2 ply deep and score leaves with a static eval (current score + engine value + majority position + tempo + slot/clock pressure).

- **Strength:** potentially strong *if the eval is good* — and that's the catch. Valuing an unfinished engine in a tightly-coupled euro (what is a third vessel worth in round 4 vs a Bergen presence lead?) is exactly the hard part; the greedy bot's blind spots are evidence of how hard.
- **Effort/maintenance:** the worst combination — the eval is a second balance surface that must be re-tuned after **every** ⚙ change, in a repo whose whole workflow is rapid retuning. Each balance pass would silently invalidate the AI.
- **Verdict:** dominated by B/C here. (B/C replace the handcrafted eval with playouts.) Only worth revisiting if playout speed ever becomes a problem.

### E. Learning-based (self-play RL / AlphaZero-style)
- **Verdict: not now.** No training infra, a JS engine, and — decisive — the game is mid-balance: every ⚙ retune (and v0.x rules change) invalidates a trained policy. Revisit post-1.0 if ever.
- **E′ — the lightweight cousin worth doing: offline weight tuning of the heuristic bot via the sim harness.** Parameterize A's heuristics (destination value weights, charter threshold, upgrade-buy threshold, majority aggression…) and let a simple optimizer (CEM / hill-climb / round-robin tournaments) tune them with `playtests/sim.js` as the fitness function — 1500 games ≈ 3 s makes evaluation nearly free, and the persona machinery is already the template. This raises A's ceiling and *also* improves B/C (better playout policy ⇒ better Monte Carlo evaluations). It additionally doubles as a balance tool: a tuned bot is a sharper sim probe than the hand-greedy one.

### Summary table

| | **A Heuristic** | **B Flat MC** | **C MCTS** | **D Static search** | **E RL** |
|---|---|---|---|---|---|
| Strength ceiling | low–mid | mid–high | **high** | mid (eval-bound) | highest (theoretical) |
| Difficulty dial | coarse (tiers + noise) | **smooth (K)** | **smooth (budget)** | depth (coarse) | n/a now |
| Dev effort | **days** | ~1–2 wks | ~2–4 wks | ~2 wks + endless eval tuning | months |
| Per-move latency | instant | 0.2–2 s | 1–5 s | <1 s | — |
| Survives ⚙ retunes | good | **best** | **best** | **worst** | worst |
| 2–4p / mixed seats | free | free (margin objective) | max-n backup | max-n | — |
| Reuses existing assets | sim bot wholesale | sim bot as playout | B + tree | little | harness as trainer |

---

## 3. Recommended path — three phases, each independently shippable

**Phase 1 — AI seats running the ported sim bot (Path A).** Immediate playable opponent; multi-human + multi-AI for free; difficulty = *Apprentice* (greedy + decision noise + no majority awareness) / *Journeyman* (full greedy) / *Trader* (persona, randomly or chosen lean). This is mostly integration work, not AI work.

**Phase 2 — tune the policy with the harness (E′).** Parameterize and optimize the heuristic weights offline; fix the documented blind spots (Bergen, the Q4–Q5 climb) by letting the optimizer find them rather than hand-coding. *Trader* gets honestly stronger; the playout policy for Phase 3 gets better too.

**Phase 3 — Monte Carlo on top (B, then C if wanted).** Add the clone-and-playout evaluator in a Web Worker as *Guildmaster* difficulty; K is the strength knob. Flat MC first — it may well be strong enough; graduate to UCT/max-n only if flat MC plateaus noticeably below "challenging for the designer."

**Phase 3+ — the CELLARMASTER (shipped, v1.2).** The Guildmaster's flat MC, as built, uses a **journeyman rollout** for speed — and the journeyman never enshrines at the Hall and ships cheap volume, so the search **systematically under-prices the quality / Hall / Novgorod-scaling lanes** (oracle: GM brews Q4+ ~0.6–0.8/game, Hall ~0.3–0.5; its biggest win-correlate is *majority* points). That's exactly the documented "flat MC needs a *competent* playout policy" caveat (§39), and it makes the GM **exploitable by a committed quality+Hall+Reach plan** it can neither price nor defend. Rather than slow the GM (it's the fast robustness oracle), v1.2 adds a distinct top tier — the **Cellarmaster** — that fixes all three of the GM's weak axes:
- **Cheap-but-competent rollout** — the **completion bias is tier-agnostic** (`aiDeepActive` → `aiDeepRollout()` flips `aiDest`/the harbor logic to climb to Q4+ and **enshrine / ship high-Q to Novgorod** *for any rollout tier*). So the rollout runs the **journeyman** policy *with that bias on* — it still prices the deep/Hall lane, but at ~10× the playouts of a Trader rollout for the same budget ⇒ much lower variance, steadier picks. (`CELLAR_ROLL='trader'` swaps in the slower, higher-fidelity rollout if ever wanted.)
- **Determinized hidden future** — each playout reshuffles the unseen Building & ship decks, so estimates are robust instead of over-fit to the one frozen RNG order a JSON clone locks in (a real GM weakness).
- **Sequential halving** — a large budget (`CELLAR_MS`, ~1.5 s in-page) is concentrated on the real contenders (sample all → drop the worst half → repeat), not spread uniform round-robin.
Same anti-kingmaker **margin** objective; rollout seats are *trader*, never *cellarmaster*, so there's no nested-search recursion. **Result:** beats the Guildmaster **~62%** head-to-head at a throttled bulk budget (stronger in-page), and brews/enshrines markedly more (Q4+ ~1.0, Hall ~0.8 even at a starved budget). Gates: `ai-ladder.js` adds a `guildmaster vs cellarmaster` rung (cellarmaster ≥60% = the new top rung; **shard it** — `CMN`/`CELLAR_MS` envs, the pairing is doubly slow); `ai-render-smoke.js` runs a cellarmaster game; `sim-analyze.js` profiles it via `TIERS=cellarmaster CELLAR_MS=…`.

**Phase 3++ — the EXPANSION content (v1.9: the Specialty Beers + Jopenbier modules).** The strong AI was wired to *utilize* the opt-in expansion so it stays a real opponent/oracle when the toggles are on. The **Specialty Beers** (Gose · Zerbster · Duckstein) ride the normal export draft (`S.exports`), so the Trader/GM/Cellarmaster already buy, brew, and ship them and their printed signatures resolve in the engine — **no AI change needed**. The **Jopenbier capstone** is the always-acquirable Q6 moonshot *outside* the draft, so it needed explicit wiring (in **both** the in-page AI and the `sim.js` deep persona): `aiBuyableExports` offers the recipe to the Trader/Cellarmaster + the deep rollout (so the MC can **price** it); `aiSource` banks 4 hops for it; `caskValueAt` returns its self-contained value (+ dock vintage) so a ripe one ranks correctly; and a new **`aiJopenHold`** implements the *cellar-then-cash* policy — a deployed Jopenbier is **held** (vintage builds) until it is ripe (≥ cap−1) or the game is ending, and is **never stranded**. **Oracle (`JOPEN=1 CELLAR=1 PERSONAS=1`, `sim-results-v68-jopenbier-ai.txt`):** the deep persona pursues and lands the capstone ~**0.07–0.11/game** — a genuinely hard, rarely-completed moonshot (the intended high-variance lane) — with **0 crashes/deadlocks**, and the **deep lane stays slightly-below-fair (47.7% / 28.3% / 23.7% vs 50/33/25) — unchanged by the capstone, by design.** `sim.js` gained a `JOPEN=1` hook + a per-run **Jopenbier-delivered/game** stat; `ai-render-smoke.js` runs a Cellarmaster game with both expansions on. *(Tuning the capstone's numbers — `JOPEN_BASE`/vintage/ready — stays a human/strong-MC table question; the AI proves it's pursued and not degenerate, not that 8★+vintage is perfectly balanced.)*

**Path C tried — turn-level UCT (built, opt-in, NOT the default).** Implemented a determinized UCT over the active player's whole turn (`aiCellarMCTS`/`cmAdvance`, behind `CELLAR_MCTS`): every branching prompt in a turn is a tree node (single-agent — all in-turn prompts are mine — maximizing end-game margin), journeyman+deep as the rollout below the frontier, decks reshuffled per iteration, robust-child at the root. **Verdict: it did not earn the default.** At the budgets this environment can sim-test it came in ~53% vs the GM (n=30, wide CI) against the flat MC's gated **62%**, and it is **slower per decision** (replay-from-root each iteration → fewer iterations than flat at equal wall-clock, spread over a whole tree → the root children get *fewer* samples than flat's concentrated 1-ply). That is exactly §39's prediction ("flat MC captures most of MCTS's benefit at this branching factor, ~2–10 options"): a tree pays off when branching is large and the budget is generous, neither of which holds here. So per the sim-gate discipline (a new default must clear the rung), **`CELLAR_MCTS` defaults false**; the code stays for the record and for a future attempt with a higher budget + a no-replay (state-caching) implementation. *If Path C is ever revisited:* cache node states instead of replaying from root (the replay cost is what starves it), and verify at a budget ≫ the in-page default before defaulting it on.

Ladder at the end: **Apprentice → Journeyman → Trader → Guildmaster → Cellarmaster**, spanning "new player can win" to "the designer's arch-nemesis," with no tier ever cheating on resources.

**Why this ordering fits a game still in development.** The AI inherits rules revisions through the same property the sim harness already exploits: it drives the canonical engine's own functions, never a reimplementation — change `play.html` and every tier plays the new rules immediately. The tiers then differ only in how much *strategic* rework a revision costs: **Guildmaster (B/C) absorbs anything**, because playouts evaluate the rules as they now are; the heuristic tiers read engine constants (`DEST`, `STYLES`, `CELLROLE`), so numeric ⚙ retunes flow through untouched; and Phase 2 turns the residual hand-tuning into a *re-runnable optimization* — after a rules change, re-tuning is minutes of sim time, not an editing session. The one revision class that always costs bot work is a **new decision type** (a new `UI.sub`/`UI.stage` prompt): any AI must be taught what the new choice *is*. That cost is contained because the bot dispatches on the prompt machine — a new mechanic is one new case in one dispatcher, and the existing re-run checklist (`CLAUDE.md`) already gates every engine change on a clean sim, so a missed case surfaces as a stuck bot immediately, not at the table.

**The AI is a design instrument, not just an opponent.** AI-vs-AI ladders become a standing regression test after every balance pass (the tier ordering must hold), and a *widening* Guildmaster-vs-Trader gap after a revision is a signal the new rules contain a discoverable line the heuristics can't see — a degenerate-strategy detector that fires before a human playtest. This is the same role the persona harness played in v0.9/v0.10 (it caught the majority-bot artifact and the Hall starvation), upgraded with a search-based probe that doesn't share the hand-written bot's blind spots.

---

## 4. Difficulty design principles

- **Never cheat on the economy.** No bonus goods, no free presence. Euro players forgive a weak bot; they don't forgive a dishonest one. All tiers differ only in *decision quality*.
- **Dials that degrade gracefully:** ε-noise among legal moves (Apprentice); feature blindness — ignore majorities/goals (Apprentice); persona lean commitment (Trader, also gives each AI a readable personality); playout count K / time budget (Guildmaster).
- **Personality as flavor:** seat an AI as "the Bergen factor" (majority persona) or "the Hall purist" (prestige persona) — leans double as both difficulty texture and table variety, and they're already implemented in the harness.
- **Mixed tables:** any seat may be human or AI at any tier; nothing in the engine cares (it's already hotseat-sequential).

## 5. Integration architecture (`play.html`)

1. **The one real refactor (needed for Phase 3, harmless before):** make the engine's mutators operate on an explicit `(S, UI)` pair (or a context object) instead of the module-global `let`s, so a cloned state can be advanced without touching the live game. Mechanical change; the sim's append-in-scope trick is the workaround we'd be retiring. Keep `play.html` the canonical reference implementation per `CLAUDE.md` — the sim harness keeps working (and should be re-run + `KEY` bumped on landing).
2. **AI seats:** a per-player `ai: {tier, persona}` flag set in the setup modal; `endTurn` → if `cur().ai`, schedule the AI driver.
3. **The AI driver is the sim bot's `botActOnce()` loop with pacing:** resolve one `UI.sub` decision every ~400–700 ms with the existing log narrating (the log already explains every action — free explainability), plus an "instant AI turns" toggle.
4. **Hidden info policy:** goals are face-up in the hotseat UI, so the AI reading them is consistent with the digital client; for purists, a "blind AI" option masks rival goals from the bot. Physical-rules fidelity matters more for the printed automa (§7).
5. **Objective function (B/C):** maximize **own score minus best rival's score**, not raw score — the margin objective is what keeps a Monte Carlo player from kingmaking with rival-cask shipping and from ignoring the leader at 3–4p.
6. **Web Worker without breaking the single-file page:** build the worker from a `Blob` of the page's own engine source (the same extract-the-`<script>` move `sim.js` makes) — `play.html` stays one file.
7. **Housekeeping:** state-shape change (`ai` flags) ⇒ bump the save `KEY`; after any engine refactor run `node playtests/sim.js 500` (+ `PERSONAS=1`) and commit the results per `CLAUDE.md`.

## 6. Validation

- **The harness is the test rig:** AI-vs-AI round-robins across tiers must show a strictly increasing win-rate ladder (each tier beats the one below ≥60% at 2p) — otherwise a "harder" setting is a lie.
- Re-run the standard gates (0 crashes / 0 deadlocks, pace in the 12–25 band) with AI seats mixed in.
- Human playtest the *feel*: turn pacing, log readability, whether Guildmaster latency is acceptable.

## 7. The physical automa deck (complement, not a substitute)

"Automa" on the table means a card-driven bot (Automa Factory / Garphill style), and this design is unusually automa-friendly: **the bot needs no private economy** — it could ship abstract casks on a simplified track. A workable shape: a ~14-card deck where each card names **a line to run + a per-station priority row** (e.g., Harbor: load > launch > charter; Market: take the displayed upgrade matching an icon), with the automa scoring deliveries/majorities normally but skipping brewing's bookkeeping via a fixed maturation row. Difficulty = deck composition + how many stops it resolves per card.

- **Author it from data, not intuition:** Phase 2's tuned bot tells us the empirical action frequencies and destination priorities a deck must encode — derive the cards from sim logs rather than guessing.
- **Printing is trivial:** `printables.html` is data-driven; an `AUTOMA_CARDS` array on the existing recipe-card footprint (1.85×2.55″) slots straight into `buildPages()` + the checklist (confirmed against the page's layout engine).
- **Sequencing:** do this *after* Phase 2 — the deck is a distillation of a bot we trust — and only once the ⚙ numbers settle. Printed cards are the one artifact in this proposal that **cannot** absorb a rules revision; while the game is in active development the digital tiers are the automa, and the deck is the end-state export.

## 8. Risks & open questions

- **Phase 3 latency at high player counts** (playouts lengthen with player count): mitigate with rollout truncation + the delivery-score proxy, or cap Guildmaster's AI-seat budget.
- **The (S, UI) de-globalization** touches every mutator — mechanical but wide; it must land with a full sim re-run and `KEY` bump (it's exactly the kind of engine change `CLAUDE.md`'s checklist exists for).
- **Does flat MC suffice, or is the tree needed?** Decide empirically: if Guildmaster-flat beats Trader <65%, build UCT.
- **Blind-AI default?** (mask rival goals or not) — designer call; cosmetic either way in the digital client.
- ⚙ Open: pacing delays, tier names, what "new player" mistakes the Apprentice should flavor-misplay (the toll left with v4.3).
