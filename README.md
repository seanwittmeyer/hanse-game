# Brewhouse of the Hanse

A theme-first heavy euro for **2–5 players** (~15–20 min each). It's c. 1350: you run a Hanseatic **merchant brewing house** — source grain & hops, brew casks, and either get them across the trade routes to the kontore (**reach**) or enshrine them in the Hall (**standing**). No dice, no money; goods are the only currency. *(Prototype — v0.6; all numbers are tunable `⚙` placeholders.)*

Published from `main` via GitHub Pages.

## Play & browse (the pages)
- **`play.html`** — the playable hot-seat client **and** the de-facto reference implementation.
- **`learn.html`** — learn-to-play in one page.
- **`rulebook.html`** — the full rules.
- **`index.html`** — component visualizer.
- **`printables.html`** — print-&-play cut sheets + the player boards (one per colour).

## Design docs (the canonical picture — read these to understand the whole game)
- **`DESIGN.md`** — pillars, rationale, locked decisions, dated session log (the *why*). §19 = v0.5, §20 = v0.6.
- **`RULES.md`** — the operational turn/economy spec.
- **`PLAYERBOARD.md`** — the private tableau (brewing track, the 4-slot Brewhouse Floor, recipe tuck, twins, standing track).
- **`COMPONENTS.md`** / **`TILES.md`** — the full object manifest and the tile families + recipe-card deck.
- **`CHANGELOG.md`** — compact version history (v0.1→v0.6) + the balance lessons carried forward.
- **`CLAUDE.md`** — how to work in this repo (the interlocks; a change is never local).

> This is a tightly-coupled system: theme, mechanics, components, and the published pages all reinforce each other. Before changing anything, build the whole picture — see `CLAUDE.md`.
