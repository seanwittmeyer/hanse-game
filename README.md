# Merchant Brewer of the Hanse

A theme-first **medium euro** for **2–4 players**. It's c. 1350 in Hamburg: you run a Hanseatic **merchant brewing house**. The work runs **Gain goods → Brew → Age → Ship** at **the Wharf** (four stations ringed by eight slots), and nothing sails without your dice at sea. No money, no cards-as-hand, no dice-as-randomizers: goods are the only currency, and twelve quality dice are your whole game.

**A print-and-play tabletop game under active development.** Values and components change between versions; `play.html`'s `KEY` marks the live build. Published from `main` via GitHub Pages.

## The pages
- **`index.html`** — the landing page.
- **`rulebook.html`** — the **printed rulebook** (US Letter, duplex — it goes in the box). Rulebook + player aid = the complete rules.
- **`play.html`** — the playable hot-seat client and the reference implementation. Any seat can be an AI opponent (greedy heuristics up to Monte-Carlo search); same rules, same information, no cheating.
- **`print.html`** — the **print-and-play kit**: every board, tile, card and token on deterministic sheets with cut guides and native print-to-PDF.

## The documents
- **`RULES.md`** — the rules: the latest snapshot, nothing else.
- **`COMPONENTS.md`** — the component list, with sizes and counts.
- **`DESIGN.md`** — why the game is the way it is: pillars, the architecture, the one change log, the lessons, the state of play and the open watches.
- **`STYLE.md`** — the term registry: every word printed on a component comes from it.
- **`AUTOMA.md`** — the AI opponents and the harnesses in `playtests/` (the rule battery, the bulk sim).
- **`CLAUDE.md`** — how to work in this repo (a change is a ruling, never a local edit).
- **`plan/`** — the program plans. **`art/`** — the art, its prompts (`art/PROMPTS.md`) and the icon accounting (`art/ICONS.md`).
- **`archive/`** — everything before v8: the frozen v5.8 and v6.5b builds and the pre-v8 records. Never edited.

> A tightly-coupled system: theme, mechanics, components and the published pages all state the same facts. Before changing anything, build the whole picture — see `CLAUDE.md`.
