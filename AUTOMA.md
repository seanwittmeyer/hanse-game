# Automa / AI Opponent — Proposal (pre-implementation)

> A design proposal for an AI opponent you can play against in `play.html`, with **variable difficulty** and **any mix of humans and AIs at 2–5p** — plus a derived **physical automa deck** for tabletop solo play. Nothing here is implemented yet; this doc compares the candidate systems (heuristic policy, flat Monte Carlo, MCTS, depth-limited search, learning) and recommends a staged path. Queued in `DESIGN.md` §21 (v0.9 "Still open / next": *"a solo Automa from the existing bot"*).

---

## 1. What the codebase already gives us (the load-bearing facts)

The feasibility of every option below hangs on four properties the repo already has:

1. **The game state is one JSON-serializable object.** `play.html` keeps everything in `S` (players, slots, deck, clock) + a small `UI` interaction state; undo literally works by `JSON.stringify(S)` (`snapshot()`/`doUndo()`). **Cloning a position is trivial and cheap** — the prerequisite for any simulation-based AI.
2. **The engine is a UI-driven state machine with no hidden coupling to the DOM.** Every decision is a `UI.sub`/`UI.stage` prompt resolved by a plain function (`doMove`, `chooseLine`, `resolveStop`, `brewPick`, `ageAllot`, `loadOnto`, `charterDest`, `benefitPick`, `endTurn`…). The sim harness proves `render`/`log`/`save`/`snapshot` can be stubbed to no-ops and the engine driven headlessly.
3. **A competent heuristic bot already exists and is battle-hardened** (`playtests/sim.js`): it navigates the real `UI.sub`/`UI.stage` machine, is topology-agnostic and toll-aware, has **persona variants** (volume / prestige / majority leans), and has survived thousands of games at 2–5p with 0 crashes / 0 deadlocks. Its blind spots are documented (never ships Bergen in greedy mode, rarely climbs to Q4–Q5, charter-heavy at 4p).
4. **Full-game playouts are ~2 ms.** 1500 headless games run in ~3 s. That number is what makes Monte Carlo methods *practical in the browser*: a few hundred greedy playouts per decision ≈ 0.5–2 s, easily hidden in a Web Worker.

Game-theoretic profile (digital client): **perfect information** (goals are visible in the hotseat UI; see §6.4), **deterministic in play** except the face-down Upgrade-deck refill order, **2–5 players** (not zero-sum two-player — rules out classic alpha-beta), ~12–25 rounds, and a turn that is a *chain* of small decisions (move ≤2 options × line 2 × stop order × sub-choices) — modest branching per decision point (~2–10), combinatorial per whole turn (tens to low hundreds of distinct turn outcomes).

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
| 2–5p / mixed seats | free | free (margin objective) | max-n backup | max-n | — |
| Reuses existing assets | sim bot wholesale | sim bot as playout | B + tree | little | harness as trainer |

---

## 3. Recommended path — three phases, each independently shippable

**Phase 1 — AI seats running the ported sim bot (Path A).** Immediate playable opponent; multi-human + multi-AI for free; difficulty = *Apprentice* (greedy + decision noise + no majority awareness) / *Journeyman* (full greedy) / *Trader* (persona, randomly or chosen lean). This is mostly integration work, not AI work.

**Phase 2 — tune the policy with the harness (E′).** Parameterize and optimize the heuristic weights offline; fix the documented blind spots (Bergen, the Q4–Q5 climb) by letting the optimizer find them rather than hand-coding. *Trader* gets honestly stronger; the playout policy for Phase 3 gets better too.

**Phase 3 — Monte Carlo on top (B, then C if wanted).** Add the clone-and-playout evaluator in a Web Worker as *Guildmaster* difficulty; K is the strength knob. Flat MC first — it may well be strong enough; graduate to UCT/max-n only if flat MC plateaus noticeably below "challenging for the designer."

Ladder at the end: **Apprentice → Journeyman → Trader → Guildmaster**, spanning "new player can win" to "experienced designer gets pushed," with no tier ever cheating on resources.

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
5. **Objective function (B/C):** maximize **own score minus best rival's score**, not raw score — the margin objective is what keeps a Monte Carlo player from kingmaking with rival-cask shipping and from ignoring the leader at 3–5p.
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

- **Phase 3 latency at 5p** (playouts lengthen with player count): mitigate with rollout truncation + the delivery-score proxy, or cap Guildmaster at ≤4 AI seats.
- **The (S, UI) de-globalization** touches every mutator — mechanical but wide; it must land with a full sim re-run and `KEY` bump (it's exactly the kind of engine change `CLAUDE.md`'s checklist exists for).
- **Does flat MC suffice, or is the tree needed?** Decide empirically: if Guildmaster-flat beats Trader <65%, build UCT.
- **Blind-AI default?** (mask rival goals or not) — designer call; cosmetic either way in the digital client.
- ⚙ Open: pacing delays, tier names, whether Apprentice should also misplay the toll (flavor of "new player" mistakes).
