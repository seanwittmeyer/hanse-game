# Brewhouses of the Hanse

A theme-first **medium euro** for **2–5 players** (~45–60 min at 2p). It's c. 1350: you run a Hanseatic **merchant brewing house**. The whole game happens at **the Wharf** — four action stations on a shared 2×2 (Market · Brewhouse · Cellar · Harbor) ringed by 8 slots, where the work runs **Source → Brew → Age → Ship.** A brewed **cask** matures in your private brewery, then sits on a shared **slot** as a public **action-building** *and* your cargo-in-waiting, then **ships out on a neutral, destination-bound hull** (v0.11: ships belong to the wharf, not to players) for points and leaves. Where you ship is the choice — the **kontore** (volume & majorities) or the **Hall** (prestige). No dice, no money; goods are the only currency. *(Prototype — **v0.10 "The Wharf"**; all numbers are tunable `⚙` placeholders.)*

> **"The Wharf" began as v0.7's ground-up reel-in to *Great Western Trail / Distilled* weight** — *too much game, the right amount of theme* — keeping the stations, the slots, the dual-role cask, the merchant-shipping fantasy, and the theme while cutting roughly half the rules (the demand market, the type frontier, Fairs, route lanes, the working-cask Floor, the twins, the recipe-card machinery). **v0.8** added occupancy pressure (a 1 `G` station toll), the *Wharf / stations / slots* naming, **fixed-quality export beers (deal 3 of 4)**, and all six neutral buildings; **v0.9** added **tiered/ranked majorities** (concentrated at Bergen, 2-player skips 2nd), the **London = engine** identity, and **seat compensation** (+1 `G` per later seat); **v0.10** made the majority a **big end-game motivator at every kontor** (Bruges 5/3/0 · London 6/4/2 · Novgorod 8/5/2 · **Bergen 10/6/3** the anchor), with low per-cask delivery values and the Hall bumped to **Q×2.5** to balance the kontore-vs-prestige tilt; **Bergen normalized** to goods. See `DESIGN.md` §21.

Published from `main` via GitHub Pages.

## Play & browse (the pages — four, all "The Wharf")
- **`learn.html`** — learn-to-play primer in one page.
- **`index.html`** — the **Rulebook & Components** page: the complete rules + the visual component reference (absorbs the former separate rulebook).
- **`play.html`** — the playable hot-seat client & de-facto reference implementation. **Any seat can be an AI opponent** (per-seat in New Game): **Apprentice / Journeyman / Trader / Guildmaster** in rising strength — Traders commit to a volume/prestige/majority lean; the Guildmaster evaluates each option by Monte Carlo playouts (expect a brief think per decision) — same rules, same information, no cheating; turns narrated in the log at an adjustable speed. (`AUTOMA.md` Phases 1–3.)
- **`printables.html`** — the full print-&-play kit: every board, tile, card, and token on deterministic Letter-landscape sheets with an **ART / CUT layer toggle** (shared registration marks for laser cutting), per-sheet SVG cut export, and a manufacturing checklist.

> **✅ v0.10 is live repo-wide:** the markdown specs **and all four HTML pages** are on v0.10 "The Wharf." (The playable `play.html` adds one engine-level relief valve, the **Charter** — a single-cask Harbor voyage whose fare is a shared market price printed under the Sailed-Ships track (`2–5 G` by position); it keeps the tight slots from deadlocking; see `RULES.md` §5.)

## Design docs (the canonical picture — read these to understand the whole game)
- **`DESIGN.md`** — pillars, rationale, dated session log (the *why*). **§21 = "The Wharf"** (the live design, v0.7 origin → v0.8 → v0.9 → v0.10 refinements); §1–§20 are the record of how we got here.
- **`RULES.md`** — the operational turn/economy spec (v0.10).
- **`COMPONENTS.md`** — the single physical manifest: boards · tokens · the five tile families (casks · ships · neutral buildings · recipes · upgrades) · the **player brewery board** · destinations · goals. *(Absorbs the former `TILES.md` + `PLAYERBOARD.md`.)*
- **`AUTOMA.md`** — the AI-opponent plan: system comparison (heuristic / Monte Carlo / MCTS / …) + the staged path. **Phases 1–3 are shipped** (AI seats · the offline weight tuner · the Monte Carlo Guildmaster).
- **`CHANGELOG.md`** — compact version history (v0.1→v0.10) + the balance lessons carried forward.
- **`CLAUDE.md`** — how to work in this repo (the interlocks; a change is never local).

> This is a tightly-coupled system: theme, mechanics, components, and the published pages all reinforce each other. Before changing anything, build the whole picture — see `CLAUDE.md`.
