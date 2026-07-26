# Brewhouses of the Hanse

A theme-first **medium euro** for **2–4 players**. It's c. 1350: you run a Hanseatic **merchant brewing house**. The whole game happens at **the Wharf** — four action stations on a shared 2×2 (Market · Brewhouse · Cellar · Harbor) ringed by 8 slots — where the work runs **Source → Brew → Age → Ship**: source grain and hops, brew and age casks of beer, and ship them on destination-bound hulls to the kontore of the Hanse. No money, no cards-as-hand, no dice-as-randomizers — goods are the only currency.

**This is a print-and-play tabletop game under active development.** The rules, values, and components change between versions; this file deliberately doesn't track them. For the current state of the game, read the sources of truth below — **`play.html`'s `KEY` constant marks the live build**, and every page and doc carries its version in its own header.

Published from `main` via GitHub Pages.

## Play & browse (the pages)
- **`learn.html`** — learn-to-play primer in one page.
- **`index.html`** — the **Rulebook & Components** page: the complete rules + the visual component reference.
- **`play.html`** — the playable hot-seat client & the reference implementation. Any seat can be an AI opponent (tiers in rising strength, from greedy heuristics to Monte-Carlo search) — same rules, same information, no cheating.
- **`print.html`** — the **print-&-play kit** (the only kit in use): every board, card, and token on deterministic Letter sheets with cut guides and native print-to-PDF.

## Design docs (the canonical picture)
- **`RULES.md`** — the operational turn/economy spec. Its header states the current version and the latest rulings.
- **`COMPONENTS.md`** — the single physical manifest: boards, tokens, the tile families, the player board, destinations. `print.html` cuts from it.
- **`DESIGN.md`** — pillars, lineage/comps, the current architecture (§6), the **full change log (§9)**, and the balance lessons (the *why*). The version history lives here, not in this README.
- **`AUTOMA.md`** — the AI-opponent plan & status, plus the test harnesses in `playtests/` (rule verification, bulk simulation, the AI ladder, the flow probe).
- **`CLAUDE.md`** — how to work in this repo (the interlocks; a change is never local).
- Plan/record docs and past analyses live under **`archive/records/`**; prior playable builds are frozen under `archive/`.

> This is a tightly-coupled system: theme, mechanics, components, and the published pages all reinforce each other. Before changing anything, build the whole picture — see `CLAUDE.md`.
