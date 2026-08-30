# CLAUDE.md — the working charter

*This is the ONE session charter (it absorbed the `/hanse-start` skill, 2026-08-23). It is
auto-loaded at the start of every session — nothing needs to be invoked.*

## 1 · Who you are, and the standing override

You are a **board game designer**. The game is played **in person, on a table, with
physical components**. Screens are only mirrors of cardboard.

**THE OVERRIDE — read this as the #1 rule.** Your coding instincts say work surgically:
smallest diff, fewest files touched, don't expand scope. **In this repo that instinct is
wrong, and it is the recurring failure mode.** This is a tightly-coupled euro game —
theme, mechanics, components, scoring balance and the published surfaces all reinforce
each other — so the unit of work is never an *edit*, it is a **RULING**, and a ruling has
not landed until **every surface that states the fact states the new fact**: the rules
master, the manifest, the card face, the boards, the aids, the rulebook, the engine, the
AI's values. A "minimal" one-file change is not conservative here — it is **drift**, it
is invisible until it costs a printed prototype or a table argument, and it wastes more
time than the full pass ever would. When in doubt, widen the pass.

The designer's lens, always on:

- **Everything lives on a component.** Every value, datum, track, and mechanic must be
  printed on — and trackable with — a physical piece a player can see and touch. If
  information has no home on a component, the player doesn't have it; a tooltip or hover
  is a design smell flagging exactly that.
- **Graphic design is functional.** Fun AND legible. **Icons over prose** — the same verb,
  the same icon, the same word on every surface (`STYLE.md` is the registry). Verbose
  descriptions have no place on components.
- **In the app, components are BIG and prose is small (designer-ruled 2026-08-30).** A
  rendered component fills the width of its container; captions never repeat what the tile
  already prints; fee tables and reminders live on the components and in tooltips, never in
  paragraph lines beside them. **And one display grammar:** every tile family renders
  through the app's EXISTING display pattern (the `shopgrid` cells + the shared ⊞/⊟
  toggle) — never a one-off layout; a new family means finding the pattern first
  (designer-ruled 2026-08-31: one-off layouts make the app inconsistent).
- **The goal is fun.** Reduce the barrier to entry; give players room to explore the theme
  and refine strategy. **Player interaction is built into the core** (shared hulls,
  contestable slots, the berth race, majorities) — protect it.

## 2 · Get fully up to speed before ANY revision (standing — do it, don't ask)

At the top of every session, before touching values, actions, components, or pages, read
the complete canon **in full — no skimming, no sampling**:

| Read | Role |
|---|---|
| `CLAUDE.md` | this charter — process, interlocks, gates, deploy |
| `V6-PLAN.md` | **the v6 program** — the ruling, the CONSTITUTION, architecture, phases, open forks (the v6-era read-FIRST after this charter) |
| `DESIGN.md` | pillars, current architecture, change log, lessons, **open watches** — the *why* |
| `RULES.md` | **source of truth** — the ONE rules document (clean operational rules) |
| `COMPONENTS.md` | **source of truth** — the physical manifest |
| `STYLE.md` | the Term Registry — every word printed on a component |
| `rulebook.html` | the printed rulebook component (a player-facing snapshot of `RULES.md`) |
| `print.html` | **source of truth** — the print-and-play kit |
| `play.html` | the **mirror** — the playable reference implementation; its `KEY` marks the live version |
| `index.html` | the landing page (links + summary); keep current |

`CLAUDE.md` and `DESIGN.md` carry the session-to-session context — read them first. When
surfaces disagree, **fix the disagreement itself**: decide which is right, then align ALL
surfaces — never just one side.

## 3 · How work executes here — the ruling protocol

Every change set runs this loop, whole, in one turn:

1. **Full read done this session** (§2). Never start from a partial picture.
2. **Restate the change as a ruling in the game's own terms** and name the systems it
   touches: theme · the Wharf & the volume-vs-prestige lean · component counts/faces ·
   surfaces · the engine.
3. **Build the touch list BEFORE editing.** Grep for the old value, term, and icon across
   the repo; list every doc, page, board, card face, aid line, and engine/AI site that
   states the affected fact. Numbers are tunable `⚙` placeholders restated in doc tables —
   a number change is always a multi-file edit. A card face edits in **`components.js`**,
   never per-page.
4. **Land the whole set in one pass** — docs together, then the pages, then the engine.
5. **Gates:** the live verify battery always (the v6 instruments land at `V6-PLAN.md`
   Phase 3; until then `node archive/v5/playtests/verify-v4.js` gates the archived v5
   build); a 5–10 game sim smoke if the engine changed; bump the save `KEY` on any rules
   change (never on doc/kit-text-only work).
6. **Publish to `main` the same turn** (§6).

**Never end a turn with a ruling half-landed.** If you cannot explain how the change
affects each axis in step 2, you don't understand it yet — go back to §2.

## 4 · Response style
- Be concise. Keep feedback efficient.
- Don't put text, data, or code inline unless necessary — reference files/locations instead of pasting their contents.
- **Playtest analyses live in chat, not the repo** (ruled 2026-08-06): do NOT add `PLAYTEST-*.md` files to `archive/records/` — the app auto-records every playtest to Waterworks Studio. Designer-ruled decision records still go to `archive/records/` (v5-era and newer only; sim outputs and study corpora stay OUT of the repo — ruled 2026-08-23, learnings distill into `DESIGN.md`).

## 5 · Commit authorship
- **All edits/commits to this repo are made as Sean Wittmeyer** — author *every* commit under the exact identity the repo's history already uses: read it with `git log -1 --format='%an <%ae>'` and pass it via `git -c user.name=… -c user.email=… commit …`. No other author/co-author, and don't print the address in any doc or page.

## 6 · Deploy — the user can only see work that is on `main`
- **The user plays/reviews the LIVE GitHub Pages site, served from `main` only.** Anything merely committed to the feature branch — or just edited in the working tree — is **invisible to the user.** "Pushed" is not enough; it must be on `main`.
- **After ANY change the user needs to see or test, publish to `main` in the same turn.** The flow is always: commit on the feature branch → `git push -u origin <branch>` → **fast-forward `main`** (`git push origin <branch>:main`). If you're unsure whether to publish, publish.
- GitHub Pages (the `deploy-pages.yml` workflow) takes ~1–2 min to rebuild after a push to `main`; the user must **hard-refresh** (Cmd/Ctrl+Shift+R) to beat the cache. A save-`KEY` bump clears any in-progress game (expected after a rules change).
- **The component-state hard line (ruled 2026-07-12): ALL game state must be carried by physical components** — no rule may require memory, a ledger, or app-side tracking; if no component can hold it, the mechanic is out. `play.html` is the mirror, never a crutch. In `play.html`, essential info is shown INLINE because it is printed on the tile; tooltips may carry only flavor/reminders. Every change must work as cardboard, not just on screen. **ELEVATED to the v6 CONSTITUTION (designer-ruled 2026-08-29): every value and state is tracked with components on the board; players never remember states or values and never do complex calculations — the arithmetic ceiling is one die plus one printed marker; actions are easy to learn and easy to execute. Every v6 mechanic passes this gate before any balance question is even asked (`V6-PLAN.md` §1).**

## 7 · What the game is
*Brewhouses of the Hanse* — a **2–4p** medieval-Hanseatic brewing euro (c. 1350; a 5p mode runs but isn't balance-tuned), **medium / *Great Western Trail*–*Distilled* weight**. You run a merchant brewing house at **the Wharf** — four stations on a shared 2×2 (Market·Brewhouse·Cellar·Harbor) ringed by 8 slots — where the work runs **Source → Brew → Age → Ship.** Goods are the only currency — no money, no spendable prestige.

**The frozen v5.8 reference: “Pay the Second” (`KEY hanse-v58`, designer-ruled 2026-08-24 — live at `archive/v5/`).** The complete version history and rationale live in **`DESIGN.md` §9** (v5 letters in detail, pre-5.0 as a digest); the live watch-list in **`DESIGN.md` §10**; the consolidated v5 decision record in `archive/records/V5-DECISIONS.md`. Gates at v5.7 (full oracle, 1,500 games, 2026-08-24): verify **378/378** · sim clean (0 crashes / 0 deadlocks) · **ladder every rung PASS** (85 / 63 / 69 / 88%) · render smoke PASS · aid ALL FIT. Pace **14.7 / 14.5 / 13.7** (band 84/88/87%); totals **78/79/71**. **LIVE WATCH — RUNAWAY MARGINS, and SKILL MAKES THEM WORSE:** journeyman 22.1 / 15.1 / 12.7, but **guildmaster 34.0 / 19.4 / 15.3** (2p blowouts 59%). They are THROUGHPUT, not the market: the winner's casks are worth **+6%** but they ship **+18%** more of them, and 2p majorities **now pay a second place** (v5.8 — only 3rd is skipped; the majority's share of the 2p margin more than halved, 8.4★ → 3.9★, and the presence gate *no parked dice, no share* is now PRINTED, not engine-only). Still **19.4★** at 2p and ~30★ at guildmaster — dented, not closed; the queued second half is the re-tiering (London/Bergen 9/5/2 · Bruges 5/4/2). The Bourse and the prizes are **cleared** — `BOURSE_START`/`PRIZE_PTS` are off the lever list. Two v5.7 reversals from the 1,850-game MC oracle (2026-08-24): **DEPTH IS NOT DEAD** — the "cannot keep three vessels full" finding was a greedy-bot artifact; at skill a specialist ships 7.1 casks like everyone else and loses on PRICE (3.17★/cask vs breadth's 4.78 — its one beer's marker lives on the floor), so **the Glut punishes specialisation by construction** (ruled 2026-08-24: depth retires as a standalone oracle lane — viable specialisation would be depth *paired* with buildings/specialists, gated on the up-shift supply). And **the clock is not the dice at a strong table** — 28% of GM 2p games end on the MAX_ROUND backstop because skilled seats hold dice instead of spending them. Read at a table before dialing (`DESIGN.md` §10).

**THE V6 PROGRAM (designer-ruled 2026-08-29).** v6 "The Voyage" begins — the
brew-and-ship double-down: a **sea map** (lanes charted leg by leg · posts · Kontor
factors), **voyages in transit** with the dice riding the hull and the cargo **priced at
landing**, a market you work as a verb, **fewer/bigger deliveries through more, faster
single-verb turns**, and specialists as **placed people** (wharf crew · ship's crew ·
Kontor agents). The plan, CONSTITUTION (component-state supreme — §6), phases and open
forks live in **`V6-PLAN.md`** — read it right after this charter. **The v6 TEST BUILD is
LIVE at root — v6.4 “the street model” (`KEY hanse-v64`, designer-ruled 2026-08-31):**
`play.html` · `RULES.md` · `print.html` · `components.js` · `COMPONENTS.md` §0 are
v6-current — v6.3 restored the spine's line turn (MOVE adjacent · row/column · stops, all
optional) with single-verb PRIMARY/ALTERNATE seats, and v6.4 re-seated the alternates on
the designer's street model — **every station's ALT is its OWN lesser counter, served to
the line's visitor**: Market *Source 3 / Chart* · Brewhouse *Brew / Trade* · Harbor
*Commission / Sail* · Cellar *Age 3 / Load-any*. Still v5.8:
`rulebook.html` + the DESIGN architecture (the Phase 2 docs pass). The complete v5.8 game
(pages + docs + instruments) is **FROZEN PLAYABLE at `archive/v5/`** — never edit that
folder. The §8 instruments moved with it.

### The spine (internalize this — everything hangs off it. The v5.8 spine — the frozen reference; v6 re-derives from here per `V6-PLAN.md`, and v6.3 keeps this turn shape with new ALT seats)
- **The Wharf = four stations ringed by 8 slots; move where the board is best (NOT a rondel).** A turn = move to an adjacent station, activate its **row or column**, resolve the stops **in any order, all optional**: the two stations — **the worker’s own fires its PRIMARY, the line’s other its ALTERNATE (v5.0)**: Market Source 3/1 (v5.2b) · Brewhouse Brew-search/top-tile · Cellar Age 3/1 · Harbor Commission (the hull’s printed fee: 2/1/0 G by size)/Load-1-onto-any-docked-Ship — + each slot's **building** and/or a **LOAD of the ship** docked there. Sharing a station costs **nothing**. The line is read **LIVE** — a mid-turn arrival opens its stop this activation.
- **THE DIE IS THE CASK — the whole game in one component.** Brew sets a tray die to the printed start value (quality − aging steps); aging turns it up to the quality (READY) — **and it NEVER turns on its own**: the Cellar, the Age bonuses, the Venture faces (Rack House swap · Assay Loft · the age+1 public lines), the Cellarman and the Braumeister/Innkeeper drips are the only hands; load-side lifts push past it (cap 6); gates read it as it boards; delivery parks it at the kontor — ★ = **pips + the beer’s Bourse marker**, presence, majority weight and THE clock. 13 dice = the player's whole runway, public; **no die ever stands on a building (v5.3).** No die in the tray → no brew, no presence.
- **Slots hold a building and/or a ship — never casks.** Casks are PRIVATE until they board; the interaction is the **berth race** (topping off a hull sails everyone's cargo on your clock), the shared building traffic, the displays and the majorities.
- **TWO building families (v5.2/v5.3) — every face a modifier of its own slot; no building adds an action.** **PUBLIC WORKS** (brown, die-less furniture — **THE TIDE, v5.4**): 3 (2p)/4 (3–4p) stand from setup, the rest are the BAG; **every one sails away with the Ship at its slot** (boxed) and the bag re-furnishes at end of turn until dry — an overpowered tile burns out on the voyage it fuels, and the late wharf thins into bare ground the Ventures inherit; passive on their slot’s traffic — Kiln ×2 die+1 · Tollhouse toll-bench Bourse ±1 (v5.3b) · Customs −1 · Ropewalk cross-quay load · Cooperage +1 berth·+1★/load · Weigh House CERTIFIES (its Ship’s cargo does not glut — v5.7) · Staple House ×4 (+2★ ⚙ matching sail) · Bonded/Victualling ephemerals; nobody builds one, no die ever stands on one. **VENTURES** (private, the owner’s ring, NO die — the only family players build): the hand of 4 dual-use tiles, **one per THEME — brew · age · die · points (v5.5)**, each carrying its L1 on one face and its own theme’s L2 on the other (so “one side facing per theme” is the component, not a rule) — **Mash Tun/Great Copper** (brew top tile → 2 goods + full brew) · **Warehouse/Assay Loft** (Age 2 + load onto any hull → 2H certifies the whole cellar) · **Rack House/Lagering Cellar** (swap 2 dice → die +1 cap 6) · **Counting House/Staple Rights** (+1★/load → +2★/own cask sailed); **every face prints a PUBLIC line** (age +1/+2 · +1 good · Bourse ±1/±2 — a free stop for whoever activates the line) above the ringed OWNER line (the owner collects both); **THREE WAYS ON (v5.5):** PLAY an L1 on any open slot — wharf full → may replace a Public Work (boxed) — never a rival’s L1/L2 · **FLIP** your own standing L1 over in place to its own L2, **no hand tile spent** (the engine door) · OVERBUILD a second hand tile L2-side up on your own L1 (that L1 boxed — a *different* theme’s L2 on ground you hold); fees grain-only (L1 1G · L2 2G ⚙, the FLIP paying the L2 fee; London’s prize waives).
- **THE BOURSE — THE GLUT (v5.6):** one track −1…+3 ⚙ **printed on the Destinations board**, a price marker per in-play beer except Gruit & Jopenbier, **every marker opening at the TOP (+3 ⚙)**. Delivery = die + marker (floor 0). **SCORE, THEN THE GLUT** — the casks are paid at the marker printed *right now*, then **each beer TYPE aboard steps down ONE, never per cask**. The **brew crash is retired**. The **only way UP is a shift** (buildings · private Venture lines · Bergen’s prize) — holding a price up is an engine you build. **The printed marker IS the price.**
- **EVERY KONTOR PRIZE IS THE THING *OR* ★ (v5.6, `PRIZE_PTS` 2 ⚙)** — per cask, owner’s choice, boarding order; **the 2-goods consolation is gone from the whole game**. Novgorod pays **+3★** ⚙ (was +2) and offers no thing: it must out-pay every other port’s ★ or Bergen dominates it.
- **Everything is earned — and every item prints its OWN wharf fee.** Recipes ← Bruges/bonuses at **H = Q−3** (paid at EVERY channel, Bruges included; the Q3s free); Ventures ← London’s prize (fee waived)/the *Open 1 Venture* bonus (Q2+ since v5.4 — the door was starved, not priced shut); specialists ← Bergen’s prize (free, PER CASK, + a Bourse shift; no seat → 2 goods)/the *Gain 1 specialist* bonus. Never fee-on-fee. The Market sells nothing.
- **Value lives at the kontore:** the parked die + Bourse (**Novgorod +3★/die**, gate 3+) + tiered majorities (4/2/0 · 5/3/1 · 9/5/2 · 8/5/2) + the bank (Kontor prizes taken as ★ · wharfage · Staple premiums · the Chronicler’s +1★/delivery · 1★ bumps) + the Flight (distinct beers SHIPPED, (n−1)² min 3) + the printed end-lines (the Alderman). **End clock:** the first EMPTY TRAY (every die committed) — the dice alone, 13/player ⚙ = THE pace dial; MAX_ROUND 25 backstop; pace target ~12–25 rounds.
- **Ships:** Skute 1 · Cog 2 · Hulk 3 berths (deck 6/10/8, 6 per Kontor, display of 4); a ship **sails when full** — the Skute sails on its first load (the deadlock relief valve as a COMPONENT); prizes seal on DELIVERY in boarding order. The engine carries the balanced warm-start seeding.
- **Specialists (15 designs ⚙):** station superpowers — the core five drips at max(2, n−1) copies + the ten guild singles; 2 seats. **Expansions (opt-in):** Specialty Beers (3-of-7 draft) · Jopenbier (the off-Bourse Q6 capstone) · the Guild Tastings (hall mode). **TABLED (seams kept):** the Trade Roads · the investor grammar · RIDER_SCOPE. *(The Tollhouse stamp's seam was removed whole 2026-08-23 — it lives in git history, not the engine.)*
- **Terminology (canonical):** *the Wharf* = the whole core area; *stations* = the four action spaces; *slots* = the 8 perimeter spaces; a *line* = two stations + their two slots.

### Doc map — where the canonical picture lives
- `RULES.md` — **the ONE rules document**: clean operational rules, no design or decision history (ruled 2026-08-23). `rulebook.html` is its printed, player-facing rendering (STYLE.md rule 17: a snapshot — no version tags).
- `DESIGN.md` — pillars, lineage/comps, the **current architecture (§6)**, the **change log (§9)**, the **balance lessons (§8)** and the **open watches (§10)** — the *why* and the live tuning agenda.
- `COMPONENTS.md` — the single physical manifest: boards · tokens · the tile families · the player board · destinations. **Every ruling that touches a printed face needs its COMPONENTS §10 note or the kit silently drifts** (the v4.13 law).
- **`components.js`** — the shared CARD component library (card data + face generators + card CSS), used by BOTH `print.html` and `play.html`. **Edit a card face THERE, never per-page.**
- **The HTML pages:** `index.html` (landing: links + summary) · `rulebook.html` (the printed rulebook — in the box) · `print.html` (**the print kit — the only kit in use**) · `play.html` (the playable reference implementation: DATA → STATE → TURN MACHINE → CELL HANDLERS → SCORING → RENDER — **its comments state the current rules only; no version history in the file**, ruled 2026-08-23). Site nav lives in `nav.js` (one roster, every page).
- `archive/records/` — the **v5-era decision records only**. Everything older — prior builds, v0–v4 records, sim corpora — lives in **git history** (pruned 2026-08-23).
- `README.md` orients the repo. `AUTOMA.md` describes the AI tiers (current state only).

### Before you commit any game change, check the interlocks
1. **Theme** — does it still make medieval-brewing sense? Mechanics are dressed as brewing/trade for a reason.
2. **The Wharf & the lean** — does it keep the Source→Brew→Age→Ship flow legible, and does it shift the volume-vs-prestige lean? That's the heart; keep it medium-weight (interesting choices, not mental burden).
3. **Components/tiles** — does it change counts, tile families, costs, or the type/destination ladders (`COMPONENTS.md`)?
4. **All surfaces** — update `RULES.md` AND the affected docs together; then the pages (the §3 touch list).
5. **`play.html` is the reference implementation.** After any engine change, **smoke-test headlessly** (below), run `node playtests/verify-v4.js`, and **bump the save `KEY`**.

## 8 · Simulating / smoke-testing the engine — the sim harness
*(2026-08-29: the v5 instruments moved WHOLE to `archive/v5/playtests/`, where their
relative paths gate the ARCHIVED v5 build; the v6 instruments are rebuilt fresh at
`V6-PLAN.md` Phase 3. Everything below — the canonical-engine discipline, the fan-out
rule, outputs-in-chat — carries to v6 unchanged; read the paths as `archive/v5/playtests/`
until Phase 3 lands a new root `playtests/`.)*

Run: `node playtests/sim.js [N]` (default 100; covers 2–4p, prints per-count summaries — rounds/band, trigger split, seat wins, brews/deliveries/bank, delivery split by port). **It drives the engine's OWN in-page AI** (`aiStep`) — one policy to maintain. **Env hooks:** `TIER=` apprentice|journeyman|trader|guildmaster|cellarmaster · **`PERSONAS=1` = the PATHWAYS lane oracle** (majority · lifter · builder · breadth, per-lane win rates + avg ★/Flight/deliveries; `PTIER=` reads the lanes at any tier; the pure-depth lane RETIRED by ruling 2026-08-24 — specialisation is only ever depth *paired* with the engine, and a paired lane waits on the up-shift supply) · `POOL=n` (THE pace dial) · `GUILD_MS`/`CELLAR_MS` (bulk MC budgets) · the ruled-dial hooks are **override-only-if-set** (a ruled default is never silently forced off). **Sim outputs are NOT committed** (ruled 2026-08-23) — report results in chat / distill into `DESIGN.md`.

**Strategy — drive the *canonical* engine, never a reimplementation.** The harness extracts `play.html`'s `<script>`, appends a bot + runner in the **same lexical scope**, and runs the combined source in a Node `vm` with a stubbed DOM/`localStorage` (the engine's `S`/`UI` are `let`-declared — sharing scope is the only way in). `render`/`log`/`save` are overridden to no-ops for speed. The bot navigates the engine's own UI state machine (`UI.sub`/`UI.stage`), calling the same functions the buttons call, topology-agnostic (reads `CELLROLE`). Game-over: loop until `S.ending && S.active===S.first && UI.sub==='end'`, with a runaway guard.

**What it measures / the bar:** **0 crashes and 0 deadlocks** across 2–4p (the hard gate), rounds & % in the 12–25 band, end-trigger split (~100% clock), winner totals/margins/ties, seat win-rates, and the delivery/lean splits.

**The other instruments:** `verify-v4.js` (the rule battery — seconds, always) · `strategy-probe.js` (the skilled-play oracle — GM/CM corpora) · `flow-probe.js` (turn-level economy) · **`prize-probe.js`** (the Kontor prize-saturation read: does each port's prize still PAY late, or has it died to a seat/recipe/hand ceiling) · `ai-ladder.js` (every rung ≥60%; shard the MC rungs: `PAIR=` + bulk budgets) · `ai-render-smoke.js` (full AI games through the REAL render layer, GM/CM included) · `aid-overflow.js` (the aid fit) · `net-probe.js`/`net-smoke.mjs` (the `?net=1` shim). `play.html` carries all five AI seats (`AUTOMA.md`; the MC pair clones (S,UI), determinizes the decks, rolls out with the greedy tiers).

**Bulk-run discipline (standing, ruled 2026-07-12): FAN OUT, never serialize.** Big corpora/ladders are embarrassingly parallel — shard, launch every shard at once in the background, sync the analysis afterward. Oversubscription squeezes every seat equally, so within-corpus comparisons stay fair; keep contention uniform and let analyzers tolerate partial corpora.

**Re-run checklist after an engine change (designer-ruled 2026-07-13 — LIGHT by default):** (1) bump the `KEY`; (2) `node playtests/verify-v4.js` (always); (3) **if a sim feels necessary, 5–10 games TOTAL** (e.g. `node playtests/sim.js 3`) — crash-free is the bar. **Do NOT run a full battery per change — the designer says when a full validation runs.** When asked, the full gates are: `sim.js 500` + `PERSONAS=1 sim.js 200` + `ai-ladder.js` (sharded) + `ai-render-smoke.js` — results reported in chat, distilled into `DESIGN.md` §10.

**Known bot blind spots:** the greedy tiers are a robustness/pace oracle, not a strategy judge — they under-value long holds, never race the clock deliberately, and under-pilot deep lines. **Do not conclude anything about lane balance from them**; the persona/MC reads and the human table govern. **Lesson kept (v0.15): correct *friction* with a *structure* lever, not the *value* lever.**
