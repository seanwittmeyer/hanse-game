# CLAUDE.md

## Response style
- Be concise. Keep feedback efficient.
- Don't put text, data, or code inline unless necessary — reference files/locations instead of pasting their contents.

## Deploy
- The site is published from the `main` branch via GitHub Pages (classic, no workflow). Develop on the feature branch, then fast-forward `main` to publish.

## Working on this game — read this first
**A change is never local.** This is a tightly-coupled euro game: theme, mechanics, components, and the published pages all reinforce each other. Before touching anything, build the whole picture — a tweak to one number or rule ripples through scoring balance, the theme's logic, the component counts, and several docs. If you can't explain how a change affects each axis below, you don't understand it yet.

### What the game is
*Brewhouses of the Hanse* — a 2–5p medieval-Hanseatic brewing euro (c. 1350), **medium / *Great Western Trail*–*Distilled* weight** (v0.7 reeled it in from a Lacerda-grade v0.6). You run a merchant brewing house and walk **one loop on a shared 2×2 grid: Source → Brew → Age → Ship.** No dice, no money (goods are the only currency), no spendable prestige. *(v0.7 "The Wharf" — see `DESIGN.md` §21.)*

### The spine (internalize this — everything hangs off it)
- **The loop IS the grid, and the forced-move circuit walks it.** Cells: **A Market (Source) · B Brewhouse (Brew) · D Cellar (Age) · C Harbor (Ship)**; the clockwise circuit A→B→D→C→A = Source→Brew→Age→Ship. A turn = move to an adjacent cell, activate its row XOR column, resolve up to 4 stops (cap·cell·cell·cap) **in any (player-chosen) order**. Both cells fire; **cells are never blocked** (no twins). Every base verb always works; ring buildings only *add*.
- **The dual-role cask in 3 states** is the whole game in one object: **maturing** (private vessel, ages to Ready) → **on the wharf** (a shared perimeter slot — your cargo-in-waiting + a **public, chunky, loop-advancing action** by type) → **delivered** (shipped to a destination → scores → gone). A cask is only ever one state; shipping converts it. **Only wharf casks are public/contestable; the brewery is private.**
- **The wharf = the 8-slot perimeter ring**, a transient mix of **deployed casks · owned ships (single-use: build → load → sail → Sailed-Ships track) · 2–3 seeded neutral buildings**. **One fire rule:** on a line, the active player may use each building on it; cask/neutral actions are free & public and resolve **on the active player's turn** (no out-of-turn skims).
- **Value lives in *destinations*, not two tracks.** Ship to the **kontore** (Bruges/London/Bergen/Novgorod) for trade value + majorities (volume), or to **the Hall** for prestige (scarcity). Same verb, different destination — that's the volume-vs-prestige lean. **Aging** is the value-over-time signal. *(The demand market, type frontier, Fairs, route lanes, and the Hall-as-a-cell are CUT.)*
- **The brewery (private) = vessels (start 2, cap 4) + a maturation track + recipes (start Gruit+Hopped) + upgrades (Rooms + Modifiers, mostly earned by delivering).** Deliver → earn an upgrade → brew better → deliver better.
- **Non-destructive interaction:** you may **ship a rival's wharf cask** on your ship — they score it & pick its benefit; you get the slot/ship/timing. **Scoring:** delivery value (by destination) + majorities + goals (best few). **End clock:** the shared **Sailed-Ships track fills** → finish the round → score (any voyage advances it — an owned ship sailing *or* a `2 G` single-cask **Charter**, the Harbor relief valve that keeps the tight ring from ever deadlocking).

### Doc map — where the canonical picture lives
- `RULES.md` — operational turn/economy rules (the v0.7 spec).
- `DESIGN.md` — pillars, rationale, dated session log (the *why*). **§21 = v0.7 "The Wharf"** (live); §1–§20 = how we got here.
- `COMPONENTS.md` / `TILES.md` — the object manifest and the five tile families (casks · ships · neutral buildings · recipes · upgrades) + destinations + goals.
- `PLAYERBOARD.md` — the private brewery (vessels, the maturation track, recipes, upgrades).
- **All five HTML pages are v0.7, current** (2026-06-05): `learn.html` (beginner) · `index.html` (components) · `rulebook.html` (full rules) · `printables.html` (cut sheets) · `play.html` (the playable reference implementation: DATA → STATE → TURN MACHINE → CELL HANDLERS → SCORING → RENDER). `play.html` is canonical again — correctness fixes there are rules fixes.
- `CHANGELOG.md` — compact version history (v0.1→v0.7) + the balance lessons carried forward. `README.md` orients the repo.

### Before you commit any game change, check the interlocks
1. **Theme** — does it still make medieval-brewing sense? Mechanics are dressed as brewing/trade for a reason.
2. **The loop & the lean** — does it keep the Source→Brew→Age→Ship loop legible, and does it shift the volume(kontore)-vs-prestige(Hall) lean? That's the heart; keep it medium-weight (interesting choices, not mental burden).
3. **Components/tiles** — does it change counts, tile families, costs, or the type/destination ladders (`COMPONENTS.md`/`TILES.md`)?
4. **All surfaces** — update `RULES.md` AND the affected docs together; then the pages. Numbers are tunable `⚙` placeholders; doc tables restate them, so a number change is a multi-file edit.
5. **`play.html` is the v0.7 reference implementation** (all pages are v0.7). It carries one engine-level addition beyond the prose spec — the **Charter** relief valve (`RULES.md` §5, `DESIGN.md` §21·E′): a `2 G` single-cask Harbor voyage that keeps the tight wharf from ever deadlocking. After any engine change, **smoke-test headlessly** (see below) and **bump the save `KEY`**. Pace target: **~12–25 rounds** (`MAX_ROUND` ceiling ≈25; the Sailed-Ships length is the primary dial).

### Simulating / smoke-testing the engine — `playtests/sim.js`
A reusable headless harness already exists. **Use it; don't rebuild it.** Run: `node playtests/sim.js [N]` (default `N=500`; prints a per-2/3/4p summary). Save each run as `playtests/sim-results-v<KEY>.txt`.

**Strategy — drive the *canonical* engine, never a reimplementation (which would drift from `play.html`).** How it works:
- **Extract** `play.html`'s `<script>` and **append** a heuristic bot + game-runner into the **same lexical scope**, then run the combined source once in a Node `vm` with a stubbed DOM/`localStorage`. *Why append-in-scope:* the engine's `S`, `UI`, `undoStack`, `setupN` are `let`-declared → **not** exposed on the `vm` context, so you can't drive from outside; sharing scope lets the bot reach them and call `freshState`/`endTurn`/etc. directly.
- **Speed:** override `render`/`log`/`save`/`snapshot` to no-ops (they're reassignable function declarations). 1500 games run in ~3 s.
- **The bot navigates the engine's own UI state machine** — it switches on `UI.sub` (`move·line·stops·cell·brew·age·source·convert·reach·wild·load·deploy·benefit·end`) and `UI.stage` (`shipdest·place·charter_cask·charter_dest`), calling the **same functions the buttons call** (`doMove`, `chooseLine`, `resolveStop`, `brewPick`, `ageAllot`, `harborLoad`, `loadOnto`, `buyTile`, `buyDisplayUp`, `benefitPick`, `endTurn`…). Greedy heuristics: walk the loop, brew the highest affordable recipe, age the cask closest to Ready, deploy Ready casks, ship to the best-value *reachable* destination, build a Cog when ship-less, **earn upgrades by delivering** (buy only when flush), and **Charter only as a relief valve** (wharf jammed / `S.ending` / no hull & can't build).
- **Game-over detection:** loop `botActOnce()` until `S.ending && S.active===S.first && UI.sub==='end'` (gameOver fires inside `endTurn` and leaves `UI.sub==='end'`); a guard counter trips on any runaway.

**What it measures / the bar:** **0 crashes and 0 deadlocks** across 2/3/4p (the hard gate), rounds & % in the 12–25 band, end-trigger (clock vs `MAX_ROUND` ceiling — should be ~100% clock), winner totals/margins/ties, seat win-rate (first-player fairness), the **upgrade earned-via-ship vs bought split**, charters/game, and winner delivery-by-destination/lean.

**Re-run checklist after an engine change:** (1) bump the `KEY`; (2) `node playtests/sim.js 500`; (3) assert crash- & deadlock-free and pace in band; (4) commit the harness output as `sim-results-v<KEY>.txt`.

**Known bot blind spots — read results with these in mind** (the bot is greedy, not human): it value-ranks kontore so **never ships to Bergen** (majorities under-exercised); it rarely climbs to Q4–Q5 so **the Hall/prestige lean and the GWT "blend beats pure" thesis are under-tested**; it charters heavily at 4p (the genuinely tight ring). **Trust** the robustness, pace, and earn-vs-buy findings; **treat** lean/majority/blend as not-yet-tested until the bot is taught to value majorities and pursue the Hall, then re-run.
