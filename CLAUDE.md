# CLAUDE.md

## Response style
- Be concise. Keep feedback efficient.
- Don't put text, data, or code inline unless necessary — reference files/locations instead of pasting their contents.

## Deploy
- The site is published from the `main` branch via GitHub Pages (classic, no workflow). Develop on the feature branch, then fast-forward `main` to publish.

## Working on this game — read this first
**A change is never local.** This is a tightly-coupled euro game: theme, mechanics, components, and the published pages all reinforce each other. Before touching anything, build the whole picture — a tweak to one number or rule ripples through scoring balance, the theme's logic, the component counts, and several docs. If you can't explain how a change affects each axis below, you don't understand it yet.

### What the game is
*Brewhouse of the Hanse* — a 2–5p medieval-Hanseatic brewing euro (c. 1350). You run a merchant brewing house: source grain/hops, brew casks, and either **deploy** them across trade routes to the kontore (**reach**) or **enshrine** them in the Hall (**standing**). No dice, no cards (all tiles), no money (goods are the only currency; standing is never spent).

### The spine (internalize this — everything hangs off it)
- **The dual-role cask in 3 states** is the whole game in one object: **working** (in a personal slot — soups up a station, scores nothing) → **reach** (deployed to a shared perimeter slot — *is* your presence, fires a line action, anyone can enshrine it) → **standing** (enshrined — owner banks the type's market value). A cask is only ever one state; enshrining converts reach→standing and removes board presence.
- **The demand market couples reach and standing.** Each beer type has one shared value. Realizing a type *either way* (deploy OR enshrine) drops its value −1; buying its recipe or paying a Fair pumps it +1. So the volume crowd erodes the prestige crowd's payout — the reach-vs-standing lean is a **timing** decision, not a silo.
- **The 2×2 action grid + lines.** Cells: **A Market · B Harbor · C Hall · D Brewhouse**. Builders (Market/Brewhouse) on one diagonal *pump* the market; cash-outs (Harbor/Hall) on the other *realize* it — so every line pairs one builder with one cash-out. A turn = move to an adjacent cell, activate its row XOR column, resolve up to 4 stops (cap·cell·cell·cap) **in any (player-chosen) order**. Both cells fire; a rival on a cell forces your private **tableau twin** (Hall has no twin, never blocked). 8 perimeter slots hold the churn: deployed casks, route lanes, ships (faucets), Fairs (paid pump lever).
- **Scoring axes:** Reach (presence × route value + majorities) + Standing (banked market value) + Goals (on enshrined casks, best 3, and they reward the axis you *didn't* bank — nudging a blend). **End clock:** the round 2 of 4 kontor cities saturate.

### Doc map — where the canonical picture lives
- `RULES.md` — operational turn/economy rules (the spec). **`play.html` is the de-facto reference implementation** (single self-contained file: DATA → STATE → TURN MACHINE → CELL HANDLERS → SCORING → RENDER); correctness fixes in `play.html` are rules fixes. Keep the two in sync.
- `DESIGN.md` — pillars, rationale, locked decisions, session log (the *why*).
- `COMPONENTS.md` / `TILES.md` — the full object manifest and the seven tile families.
- `PLAYERBOARD.md` — the private tableau (brewing track, vessels, rooms, twins, personal slots, standing track).
- `learn.html` (beginner), `rulebook.html` (full rules), `index.html` (component visualizer), `printables.html` — the published pages; they restate the rules and **must stay aligned** with `play.html`/`RULES.md`.
- `PLAY-TODO.md` — running improvement brief for the client. `PLAYTEST.md` is a dated v0.1 snapshot (stale in places).

### Before you commit any game change, check the interlocks
1. **Theme** — does it still make medieval-brewing sense? Mechanics are dressed as brewing/trade for a reason.
2. **The two axes** — does it shift the reach↔standing balance or the demand-market coupling? That's the heart; don't unbalance it accidentally.
3. **Components/tiles** — does it change counts, tile families, costs, or the type ladder (`COMPONENTS.md`/`TILES.md`)?
4. **All surfaces** — update `RULES.md` AND the affected pages AND `play.html` together. Numbers are tunable `⚙` placeholders kept in the `DATA` block; doc tables restate them, so a number change is a multi-file edit.
5. **Smoke-test `play.html` headlessly** before merge (see `PLAY-TODO.md` §0): extract the inline `<script>`, run it in a mocked-DOM `vm` context, drive a bot via the rendered buttons' `onclick` strings, and assert 2–5p games run crash-free to game-over. Bump the save `KEY` only on a saved-state *shape* change.
