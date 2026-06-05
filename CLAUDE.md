# CLAUDE.md

## Response style
- Be concise. Keep feedback efficient.
- Don't put text, data, or code inline unless necessary — reference files/locations instead of pasting their contents.

## Deploy
- The site is published from the `main` branch via GitHub Pages (classic, no workflow). Develop on the feature branch, then fast-forward `main` to publish.

## Working on this game — read this first
**A change is never local.** This is a tightly-coupled euro game: theme, mechanics, components, and the published pages all reinforce each other. Before touching anything, build the whole picture — a tweak to one number or rule ripples through scoring balance, the theme's logic, the component counts, and several docs. If you can't explain how a change affects each axis below, you don't understand it yet.

### What the game is
*Brewhouse of the Hanse* — a 2–5p medieval-Hanseatic brewing euro (c. 1350). You run a merchant brewing house: source grain/hops, brew casks, and either get them across trade routes to the kontore (**reach** — Harbor direct-deploy to Bruges, or ship them to the far kontore) or **enshrine** them in the Hall (**standing**). No dice, no money (goods are the only currency; standing is never spent). Tiles throughout, plus one small **recipe-card** deck. *(v0.6 — see `DESIGN.md` §20.)*

### The spine (internalize this — everything hangs off it)
- **The dual-role cask in 3 states** is the whole game in one object: **working** (in a **Brewhouse Floor** slot — soups up a station, scores nothing) → **reach** (*is* your presence on a route — either Harbor-deployed into a shared perimeter slot, where it fires a line action and anyone can enshrine it, or **ship-delivered as committed route presence** that can't be enshrined) → **standing** (enshrined — owner banks the type's market value). A cask is only ever one state; enshrining converts a cask and removes its presence.
- **The demand market couples reach and standing.** Each beer type has one shared value. Realizing a type *either way* (reach OR enshrine) drops its value −1; buying its recipe or paying a Fair pumps it +1. So the volume crowd erodes the prestige crowd's payout — the reach-vs-standing lean is a **timing** decision, not a silo.
- **The 2×2 action grid + lines.** Cells: **A Market · B Harbor · C Hall · D Brewhouse**. Builders (Market/Brewhouse) on one diagonal *pump* the market; cash-outs (Harbor/Hall) on the other *realize* it — so every line pairs one builder with one cash-out. A turn = move to an adjacent cell, activate its row XOR column, resolve up to 4 stops (cap·cell·cell·cap) **in any (player-chosen) order**. Both cells fire; a rival on a cell forces your private **tableau twin** (Hall has no twin, never blocked). 8 perimeter slots hold the churn: deployed casks, route lanes, **ships (single-use destination carriers: load → fill → sail)**, Fairs (paid pump lever).
- **The player board = the Brewhouse Floor.** 4 multi-use slots, each a **Room** (permanent) *or* a **working Cask** (temporary); vessels (start 1, cap 3) are separate but **Extra Vessel is a Room that eats a Floor slot**. Recipes are **dual-use cards** (big one-time boon on collect + a permanent brew strip tucked under the board's edge, 6-card soft cap).
- **Scoring axes:** Reach (presence × route value + majorities; engine = routes + ships) + Standing (banked market value; engine = rooms + summit brewing) + Goals (on enshrined casks, best 3, and they reward the axis you *didn't* bank — nudging a blend). **End clock:** the shared **Sailed-Ships track fills** (each voyage = one slot; self-accelerating), backstopped by **N casks enshrined** total; whichever first → finish the round → score. *(City saturation is no longer an end trigger.)*

### Doc map — where the canonical picture lives
- `RULES.md` — operational turn/economy rules (the spec). **`play.html` is the de-facto reference implementation** (single self-contained file: DATA → STATE → TURN MACHINE → CELL HANDLERS → SCORING → RENDER); correctness fixes in `play.html` are rules fixes. Keep the two in sync.
- `DESIGN.md` — pillars, rationale, locked decisions, session log (the *why*).
- `COMPONENTS.md` / `TILES.md` — the full object manifest and the tile families (six tile families + the recipe-card deck).
- `PLAYERBOARD.md` — the private tableau (brewing track + aging cube, vessels, the 4-slot Brewhouse Floor, twins, recipe-card tuck zone, standing track).
- `learn.html` (beginner), `rulebook.html` (full rules), `index.html` (component visualizer), `printables.html` — the published pages; they restate the rules and **must stay aligned** with `play.html`/`RULES.md`.
- `CHANGELOG.md` — compact version history (v0.1→v0.6) + the balance lessons carried forward (distilled from the now-retired playtest sims). `README.md` orients the repo.

### Before you commit any game change, check the interlocks
1. **Theme** — does it still make medieval-brewing sense? Mechanics are dressed as brewing/trade for a reason.
2. **The two axes** — does it shift the reach↔standing balance or the demand-market coupling? That's the heart; don't unbalance it accidentally.
3. **Components/tiles** — does it change counts, tile families, costs, or the type ladder (`COMPONENTS.md`/`TILES.md`)?
4. **All surfaces** — update `RULES.md` AND the affected pages AND `play.html` together. Numbers are tunable `⚙` placeholders kept in the `DATA` block; doc tables restate them, so a number change is a multi-file edit.
5. **Smoke-test `play.html` headlessly** before merge: extract the inline `<script>`, run it in a mocked-DOM `vm` context, drive a bot via the rendered buttons' `onclick` strings, and assert 2–5p games run crash-free to game-over. Bump the save `KEY` only on a saved-state *shape* change. *(See `CHANGELOG.md` → "Working the repo.")*
