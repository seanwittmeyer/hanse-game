# Brewhouse of the Hanse — The Player Board (Brewery) v0.1

> The private tableau. Symmetric for all players (locked). Numbers ⚙ are placeholders. Derived from `DESIGN.md` §19 ("Tableau — your private brewery") and the opening analysis in `PLAYTEST.md`.

---

## Purpose

The board must hold five things legibly and **doubles as the brewing-process tracker**:
1. the **brewing track** (Load → Ferment → Age → Ready),
2. **vessel lanes** (start 1, cap 3 — throughput),
3. **room slots** (installed upgrades — depth),
4. **goods storage** (with its cap),
5. the printed **Larder + Quay** fallbacks.

Grid = the verbs; this board = the noun the brewing verb acts on. No action is duplicated from the grid.

---

## Layout

```
┌────────────────────────────────────────────────────────────┐
│  ⚑ HOUSE crest            STORAGE  ▢▢▢▢ ▢▢▢▢   (cap 8, +Warehouse) │
│                                                              │
│  BREWING TRACK                                               │
│   Vessel 1  [ LOAD ]→[ FERMENT ]→[ AGE • • ]→[ READY ]       │
│   Vessel 2  ▒▒▒▒▒ locked — install Extra Vessel ▒▒▒▒▒        │
│   Vessel 3  ▒▒▒▒▒ locked — install Extra Vessel ▒▒▒▒▒        │
│        (gruit skips AGE: Ferment → Ready)                    │
│                                                              │
│  ROOM SLOTS   ▢   ▢   ▢   ▢      (4 — scarce: forces a lean) │
│                                                              │
│  LARDER  (Market fallback: +1 G)   QUAY (Harbor fallback:    │
│                                     ship 1 cask → Bruges)    │
└────────────────────────────────────────────────────────────┘
```

---

## 1. Brewing track

- Spaces: **Load · Ferment · Age · Ready.** A cask token advances one space per Brewhouse step.
- **Age is a maturing zone.** Basic styles pass through in one step; premium styles linger extra advances there (the aging pips • •):

| Style | Advances (Load→Ready) | In Age |
|---|---|---|
| Gruit | 2 | **skips Age** (Ferment→Ready) |
| Hopped | 3 | 1 |
| Dubbel | 3 | 1 |
| Tripel | 4 | 2 |
| Bock | 5 | 3 (needs **Aging Cellar** room) |

- A cask at **Ready** stays in its vessel (occupying it) until **shipped** at the Harbor — so a finished cask you can't or won't ship **clogs a vessel**. That back-pressure is the throughput tension.

## 2. Vessel lanes — throughput (start 1, cap 3)

- One lane open at start; lanes 2 & 3 are **covered** until you install an **Extra Vessel** room.
- The Brewhouse action advances **all** vessels one step, so each extra lane multiplies what one Brewhouse fire does — the engine's core scaling.

## 3. Room slots — depth (4 slots, scarce)

- Four slots for installed **Room tiles**; **Extra Vessel is itself a room** that uncovers a lane.
- Scarcity is deliberate: with only 4 slots and 2 of them potentially eaten by vessels, you **cannot build wide and deep** — this is §13 option (c), forced-commit, made physical on the board.
- Room menu (from `TILES.md` E): Extra Vessel · Aging Cellar (unlock Bock, shorten Age) · Warehouse (+storage) · Counting-house (+1 standing on enshrine) · Faster Fermenter · Larder/Quay upgrades · Cooperage.

## 4. Storage

- Cap **8 goods** ⚙ (a printed track). **Warehouse** room +4 each. Overflow is lost — the cap (with tiny skims) contains the rich-get-richer risk (PLAYTEST F5).

## 5. Larder & Quay — printed fallbacks

- **Larder** (Market blocked): +1 G; a Larder-upgrade room raises it.
- **Quay** (Harbor blocked): ship **one ready cask to Bruges only** (still a real shipment — placed in a slot, +1 presence); a Quay-upgrade room raises it.
- The more brewery you've built, the less a block stings.

---

## Starting setup (symmetric)

| Item | Start ⚙ |
|---|---|
| Goods | **3 G, 2 H** |
| Recipes | **1 Gruit + 1 Hopped** (the fast-vs-slow fork, live turn 1) |
| Vessels | 1 open (lanes 2–3 locked) |
| Rooms | none |
| Storage | 8 |
| Worker | placed turn 1 (see Turn-1 rule) |

**Turn-1 rule (refined):** on your first turn you **place** your worker on any cell and activate one of its two lines (no move). From turn 2, the normal **move-then-activate** applies. This makes first placement a genuine decision.

---

## Why these starting numbers (from the opening analysis)

- 2 G 1 H + gruit-only was too thin and forced an identical gruit opening; **3 G 2 H + both recipes** puts the gruit-vs-hopped tempo fork on turn 1 and lets a 3-cost tooling opening (e.g. place a Route Lane + load a brew) exist.
- **Top Row (Market+Brewhouse) remains the natural opening** because Harbor is dead with no ready cask; accepted — opening *variety* now comes from Market choice (goods / which recipe / which Lane) and the load fork, not from forcing artificial parity across cells.

## Open / to tune

- Number of room slots (4?) vs vessel cap (3) interplay — the central depth-vs-breadth squeeze.
- Age maturing representation (pips vs counter).
- Whether a Ready cask clogging a vessel is too punishing.
- Larder/Quay upgrade magnitudes.
