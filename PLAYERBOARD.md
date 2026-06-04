# Brewhouse of the Hanse — The Player Board (Brewery) v0.5

> The private tableau. Symmetric for all players (locked). Numbers ⚙ are placeholders. v0.5 adds **personal cask slots** (the *working* state) and a **standing track** (`DESIGN.md` §19, 2026-06-03).

---

## Purpose

The board must hold these things legibly and **doubles as the brewing-process tracker**:
1. the **brewing track** (Load → Ferment → Age → Ready),
2. **vessel lanes** (start 1, cap 3 — throughput),
3. **room slots** (installed upgrades — depth),
4. **personal cask slots** (3 — *working* casks that soup up your stations),
5. **goods storage** (with its cap),
6. the **recipe book** (collected recipes),
7. the **standing track** (your banked standing total) + a **goal row** (enshrined casks' face-up goals),
8. the printed **Larder + Quay** twins.

Grid = the verbs; this board = the noun the brewing verb acts on. No action is duplicated from the grid.

---

## Layout

```
┌────────────────────────────────────────────────────────────┐
│  ⚑ HOUSE crest   STORAGE ▢▢▢▢ ▢▢▢▢ (cap 8)   STANDING ▶──── │
│                                                              │
│  BREWING TRACK                                               │
│   Vessel 1  [ LOAD ]→[ FERMENT ]→[ AGE • • ]→[ READY ]       │
│   Vessel 2  ▒▒▒▒▒ locked — install Extra Vessel ▒▒▒▒▒        │
│   Vessel 3  ▒▒▒▒▒ locked — install Extra Vessel ▒▒▒▒▒        │
│        (gruit skips AGE: Ferment → Ready)                    │
│                                                              │
│  ROOM SLOTS   ▢   ▢   ▢   ▢      (4 — scarce: forces a lean) │
│  CASK SLOTS   ▢   ▢   ▢          (3 — working casks)         │
│                                                              │
│  RECIPE BOOK  [Gruit] [▤ recipe: cost · steps] [▤] …  (open) │
│  GOAL ROW     [♦ goal] [♦ goal] …  (enshrined casks, face-up)│
│                                                              │
│  LARDER (Market twin: +1 G)   QUAY (Harbor twin: deploy→Bruges)│
└────────────────────────────────────────────────────────────┘
```

> A **print-ready visual** of this layout lives in `printables.html` → **Player Boards** view (one board per player colour, Letter/A4 landscape). It is generated from this spec; keep the two in sync.

---

## 1. Brewing track

- Spaces: **Load · Ferment · Age · Ready.** A cask token advances one space per Brewhouse step.
- **Age is a maturing zone.** Basic styles pass through in one step; premium styles linger extra advances there (the aging pips • •):

| Level | Advances (Load→Ready) | In Age |
|---|---|---|
| L1 Gruit | 2 | **skips Age** (Ferment→Ready) |
| L2 Hopped | 3 | 1 |
| L3 summit | 3 | 1 |
| L4 summit | 4 | 2 |
| L5 summit | 5 | 3 (needs **Aging Cellar** room) |

- A cask at **Ready** stays in its vessel (occupying it) until you **install** it (personal slot), **deploy** it (Harbor → reach), or **enshrine** it (Hall → standing) — so a finished cask you sit on **clogs a vessel**. That back-pressure is the throughput tension.

## 2. Vessel lanes — throughput (start 1, cap 3)

- One lane open at start; lanes 2 & 3 are **covered** until you install an **Extra Vessel** room.
- The Brewhouse action advances **all** vessels one step, so each extra lane multiplies what one Brewhouse fire does — the engine's core scaling.

## 3. Room slots — depth (4 slots, scarce)

- Four slots for installed **Room tiles**; **Extra Vessel is itself a room** that uncovers a lane.
- Scarcity is deliberate: with only 4 slots and 2 of them potentially eaten by vessels, you **cannot build wide and deep** — this is §13 option (c), forced-commit, made physical on the board.
- Room menu (from `TILES.md` E): Extra Vessel · Aging Cellar (unlock Bock, shorten Age) · Warehouse (+storage) · Counting-house (+1 standing on enshrine) · Faster Fermenter · Larder/Quay upgrades · Cooperage.

## 4. Storage

- Cap **8 goods** ⚙ (a printed track). **Warehouse** room +4 each. Overflow is lost — the cap (with tiny skims) contains the rich-get-richer risk (PLAYTEST F5).

## 4a. Recipe book (v0.3)

- A **printed strip of recipe slots** (open-ended). Holds the **Gruit baseline** (printed) plus every recipe you **collect** from the Market. Each collected recipe is a small card showing its **type** and **cost profile** (`n G · n H · n brew-steps`).
- You **brew from the book** (no slot-ring claim). You **cannot brew a type you hold no recipe for.** Two recipes of the same type can differ — *which* you collect is your engine's shape.
- The book is **private and permanent** (recipes don't churn) — the counterweight to the transient slot ring (`TILES.md` §C′).

## 4b. Personal cask slots & the standing track (v0.5)

- **3 personal cask slots** hold *working* casks. A Ready cask installed here **soups up its station** — its action is added when you take that station, and it's your fallback there when a rival blocks the cell. It scores nothing while working; pull it out later to **deploy** (reach) or **enshrine** (standing). Scarce (3) → keep-vs-cash-out is a live choice.
- The **standing track** is your banked standing total: each **enshrine** advances it by the type's **market value** at that instant (this is the variable-value layer — there are no separate VP tokens). Each enshrined cask's **goal** flips face-up into the **goal row** (best 3 score). Nothing is hidden in the stack.

## 5. Tableau twins — occupancy becomes opportunity

Each public **builder** verb has a private **twin** here; the twin fires **only when a rival blocks that cell** (locked) — and your **installed working casks** sharpen it. Upgraded, the twin makes you *want* to step onto the crowded cell. (The Hall has no twin — it's open to all.)

- **Larder** (Market twin): +1 G base; a **Larder** room → +2 G.
- **Brew-room** (Brewhouse twin): advance all, no load; a **Faster Fermenter** room restores the load.
- **Quay** (Harbor twin): **deploy** one ready cask **→ Bruges only**; a **Quay** room → deploy to any open qualifying route.

Because only **4 room slots** exist, you can develop **one** twin deeply — so different players want different cells jammed, and each walks a different circuit. That's the wide phase-space on a tiny board.

---

## Starting setup (symmetric)

| Item | Start ⚙ |
|---|---|
| Goods | **3 G, 2 H** |
| Recipes | **Gruit baseline + 2 random premiums**, in your **recipe book**; more collected from the Market |
| Standing | **0** (advanced by market value at each enshrine) |
| Vessels | 1 open (lanes 2–3 locked) |
| Personal cask slots | 3 empty |
| Rooms | none |
| Storage | 8 |
| Worker | placed turn 1 (see Turn-1 rule) |

**Turn-1 rule (refined):** on your first turn you **place** your worker on any cell and activate one of its two lines (no move). From turn 2, the normal **move-then-activate** applies. This makes first placement a genuine decision.

---

## Why these starting numbers (from the opening analysis)

- 2 G 1 H + gruit-only was too thin and forced an identical gruit opening; **3 G 2 H + both recipes** puts the gruit-vs-hopped tempo fork on turn 1 and lets a 3-cost tooling opening exist.
- With the **build×cash-out diagonal**, the two cash-outs (Harbor, Hall) are dead on turn 1 (no Ready cask), so opening *variety* comes from which **builder** line you run (Market+Harbor top row, Market+Hall left col, Harbor+Brewhouse right col, Hall+Brewhouse bottom row) and the gruit-vs-premium load fork — not from forced cell parity.

## Open / to tune

- Number of room slots (4?) vs vessel cap (3) interplay — the central depth-vs-breadth squeeze.
- Age maturing representation (pips vs counter).
- Whether a Ready cask clogging a vessel is too punishing.
- Larder/Quay upgrade magnitudes.
