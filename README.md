# Brewhouse of the Hanse

A theme-first **medium euro** for **2–5 players** (~45–60 min at 2p). It's c. 1350: you run a Hanseatic **merchant brewing house**. The whole game is **one legible loop — Source → Brew → Age → Ship — walked on a shared 2×2 action grid.** A brewed **cask** is the hero: it matures in your private brewery, then sits on the shared **wharf** (the perimeter ring) as a public **action-building** *and* your cargo-in-waiting, then **ships to a destination** for points and leaves. Where you ship is the choice — the **kontore** (volume & majorities) or the **Hall** (prestige). No dice, no money; goods are the only currency. *(Prototype — **v0.7 "The Wharf"**; all numbers are tunable `⚙` placeholders.)*

> **v0.7 is a ground-up reel-in to *Great Western Trail / Distilled* weight** — *too much game, the right amount of theme.* It keeps the grid, the ring, the dual-role cask, the merchant-shipping fantasy, and the theme, and cuts roughly half the rules (the demand market, the type frontier, Fairs, route lanes, the working-cask Floor, the twins, the recipe-card machinery). See `DESIGN.md` §21.

Published from `main` via GitHub Pages.

## Play & browse (the pages — all v0.7 "The Wharf")
- **`learn.html`** — learn-to-play in one page.
- **`play.html`** — the playable hot-seat client & de-facto reference implementation.
- **`rulebook.html`** — the full rules.
- **`index.html`** — component visualizer.
- **`printables.html`** — print-&-play cut sheets + player boards.

> **✅ v0.7 is complete repo-wide:** the markdown specs **and all five HTML pages** are on v0.7. (The playable `play.html` adds one engine-level relief valve, the **Charter** — a `2 G` single-cask Harbor voyage that keeps the tight wharf from deadlocking; see `RULES.md` §5.)

## Design docs (the canonical picture — read these to understand the whole game)
- **`DESIGN.md`** — pillars, rationale, dated session log (the *why*). **§21 = v0.7 "The Wharf"** (the live design); §1–§20 are the record of how we got here.
- **`RULES.md`** — the operational turn/economy spec (v0.7).
- **`PLAYERBOARD.md`** — the private brewery (vessels, the maturation track, recipes, upgrades).
- **`COMPONENTS.md`** / **`TILES.md`** — the object manifest and the tile families (casks · ships · neutral buildings · recipes · upgrades · destinations · goals).
- **`CHANGELOG.md`** — compact version history (v0.1→v0.7) + the balance lessons carried forward.
- **`CLAUDE.md`** — how to work in this repo (the interlocks; a change is never local).

> This is a tightly-coupled system: theme, mechanics, components, and the published pages all reinforce each other. Before changing anything, build the whole picture — see `CLAUDE.md`.
