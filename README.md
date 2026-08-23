# Brewhouses of the Hanse

A theme-first **medium euro** for **2–4 players**. It's c. 1350: you run a Hanseatic **merchant brewing house**. The whole game happens at **the Wharf** — four action stations on a shared 2×2 (Market · Brewhouse · Cellar · Harbor) ringed by 8 slots — where the work runs **Source → Brew → Age → Ship**: source grain and hops, brew and age casks of beer, and ship them on destination-bound hulls to the kontore of the Hanse. No money, no cards-as-hand, no dice-as-randomizers — goods are the only currency.

**This is a print-and-play tabletop game under active development.** The rules, values, and components change between versions; this file deliberately doesn't track them. **`play.html`'s `KEY` constant marks the live build.**

Published from `main` via GitHub Pages.

## The pages
- **`index.html`** — the landing page: a summary and the links.
- **`rulebook.html`** — the **printed rulebook** (US Letter, duplex — it goes in the box). Rulebook + Player Aid = the complete rules.
- **`play.html`** — the playable hot-seat client & the reference implementation. Any seat can be an AI opponent (tiers in rising strength, from greedy heuristics to Monte-Carlo search) — same rules, same information, no cheating.
- **`print.html`** — the **print-&-play kit** (the only kit in use): every board, card, and token on deterministic sheets with cut guides and native print-to-PDF.

## The documents
- **`RULES.md`** — **the one rules document**: clean operational rules, no design or decision history.
- **`COMPONENTS.md`** — the single physical manifest: boards, tokens, the tile families, the player board, destinations. `print.html` cuts from it.
- **`DESIGN.md`** — why the game is the way it is: pillars, the current architecture, the change log, the balance lessons, and the **open watches**.
- **`STYLE.md`** — the Term Registry: every word printed on a component comes from it.
- **`AUTOMA.md`** — the AI-opponent plan & status, plus the test harnesses in `playtests/` (rule verification, bulk simulation, the AI ladder).
- **`CLAUDE.md`** — how to work in this repo (the interlocks; a change is never local).
- The v5-era decision records live under **`archive/records/`**; everything older is preserved in git history.

> This is a tightly-coupled system: theme, mechanics, components, and the published pages all reinforce each other. Before changing anything, build the whole picture — see `CLAUDE.md`.
