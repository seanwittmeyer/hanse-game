# Brewhouse of the Hanse — The Player Board (Brewery) v0.6

> The private tableau. Symmetric for all players (locked). Numbers ⚙ are placeholders. v0.6 replaces the separate **room slots + personal cask slots** with one row of **4 multi-use Brewhouse Floor slots** (Room **or** working Cask), turns recipes into **dual-use cards** tucked along the bottom edge (replacing the recipe book), and tracks age with **one aging cube** (`DESIGN.md` §20, 2026-06-04). Supersedes v0.5 where they conflict.

---

## Purpose

The board must hold these things legibly and **doubles as the brewing-process tracker**:
1. the **brewing track** (Load → Ferment → Age → Ready), with the **aging cube** counting the Age dwell,
2. **vessel lanes** (start 1, cap 3 — throughput),
3. the **Brewhouse Floor** (4 multi-use slots, each a **Room** *or* a **working Cask** — depth vs engine, contested),
4. **goods storage** (with its cap),
5. the **recipe-card tuck zone** along the bottom edge (the fanned brew strips of your collected recipe cards),
6. the **standing track** (your banked standing total) + a **goal row** (enshrined casks' face-up goals),
7. the printed **Larder + Brew-room + Quay** twins.

Grid = the verbs; this board = the noun the brewing verb acts on. No action is duplicated from the grid.

---

## Layout

```
┌────────────────────────────────────────────────────────────┐
│  ⚑ HOUSE crest   STORAGE ▢▢▢▢ ▢▢▢▢ (cap 8)   STANDING ▶──── │
│                                                              │
│  BREWING TRACK                                               │
│   Vessel 1  [ LOAD ]→[ FERMENT ]→[ AGE ◉ ]→[ READY ]        │
│   Vessel 2  ▒▒▒▒▒ locked — install Extra Vessel (a Room) ▒▒  │
│   Vessel 3  ▒▒▒▒▒ locked — install Extra Vessel (a Room) ▒▒  │
│        (gruit skips AGE; ◉ = aging cube counts the Age dwell)│
│                                                              │
│  BREWHOUSE FLOOR  [ Room|Cask ] [ ⛁ ] [ ⛁ ] [ ⛁ ]           │
│        (4 multi-use slots — each a Room OR a working Cask)   │
│                                                              │
│  GOAL ROW     [♦ goal] [♦ goal] …  (enshrined casks, face-up)│
│                                                              │
│  LARDER (Market: +1 G) · BREW-ROOM (Brewhouse: pool 2) ·     │
│                          QUAY (Harbor: deploy→Bruges)        │
├──────────────────────────────────────────────────────────── ┤
│  RECIPE TUCK ▤[Gruit·printed] ▤[type·cost] ▤ ▤ ▤ ▤  (6 max)  │  ← cards tucked under the bottom edge
└────────────────────────────────────────────────────────────┘
```

> A **print-ready visual** of this layout lives in `printables.html` → **Player Boards** view (one board per player colour, Letter/A4 landscape). It is generated from this spec; keep the two in sync.

---

## 1. Brewing track

- Spaces: **Load · Ferment · Age · Ready.** A cask token advances one space per Brewhouse advance point.
- **Quality (Q1–Q5) is printed on the cask tile** — static, set at brew. **Age is tracked by the cask's position** on this Load→Ferment→Age→Ready track, plus **one aging cube** per brew that counts the **Age dwell**:

| Level | Advances (Load→Ready) ⚙ | Age dwell (aging cube) |
|---|---|---|
| L1 Gruit | 2 | **skips Age** (Ferment→Ready) |
| L2 Hopped | 3 | 1 |
| L3 summit | 3 | 1 |
| L4 summit | 4 | 2 |
| L5 summit | 4 | 3 |

- A cask at **Ready** stays in its vessel (occupying it) until you **install** it as working (needs an open **Floor slot** — see §3), **deploy/load** it (Harbor or a ship → reach), or **enshrine** it (Hall → standing). If you have no open Floor slot, a Ready cask **clogs its vessel** — so Floor scarcity and brewing back-pressure are **one** tension. That is the throughput squeeze.

## 2. Vessel lanes — throughput (start 1, cap 3)

- One lane open at start; lanes 2 & 3 are **covered** until you install an **Extra Vessel**.
- The Brewhouse action allocates a **pool of advance points** across your vessels, so each extra lane multiplies what one Brewhouse fire can do — the engine's core scaling.
- **Extra Vessel is a Room** (see §3): unlocking a lane **consumes a Floor slot**, so running 3 vessels spends **2 of your 4 Floor slots** — wide brewing trades directly against depth.

## 3. The Brewhouse Floor — 4 multi-use slots (Room | working Cask)

- **One row of 4 Floor slots.** Each slot holds **either a Room** (permanent depth) **or a working Cask** (temporary engine) — never a dedicated place for each kind of thing. This replaces v0.5's separate **4 room slots + 3 cask slots** (~7 dead squares → **4 live, contested** ones).
- **Rooms** (from `TILES.md` E) are permanent installs: Extra Vessel (unlocks a lane) · Aging Cellar · Warehouse (+storage) · Counting-house (+1 standing on enshrine) · Faster Fermenter (restores the brew-room twin's full pool + load) · Larder / Quay upgrades · Cooperage.
- **Working casks** are temporary: **installing a Ready cask as working is free but needs an open Floor slot.** A working cask is **assigned to a station (Market / Brewhouse / Harbor) on install** and **soups it up** — its `work` action fires when you use that station, and it's your fallback there when a rival blocks the cell (at the Brewhouse, a flat **+2** to the advance pool). It scores nothing while working; pull it out later to **deploy/load** (reach) or **enshrine** (standing).
- **The squeeze is now constant and visible:** every parked engine-cask is a room you didn't build, and vice versa; if all 4 slots are full, a finished cask **clogs its vessel** until you free a slot — the Brass "can't build wide and deep" tension, made physical (this is §13 option (c), forced-commit).

## 4. Storage

- Cap **8 goods** ⚙ (a printed track). **Warehouse** room +4 each. Overflow is lost — the cap (with tiny skims) contains the rich-get-richer risk (PLAYTEST F5).

## 4a. Recipe-card tuck zone (v0.6) — the Lisboa tuck

- Recipes are **dual-use cards**, collected **only at the Market**. On collect a card fires a **one-time boon** (see `RULES.md` §3·A), then **tucks under the board's bottom edge** showing only its **permanent brew strip** — its **type + cost profile** (`n G · n H · n steps`). Your fanned row of strips **is** your recipe book; you brew from any tucked strip forever.
- **Gruit baseline** is **printed on the board** (always brewable, the bottom/founding strip). You **cannot brew a type you hold no strip for.**
- **Soft cap = the board edge: 6 tuck guides.** Collecting a 7th forces you to **discard a strip** (lose that brewable type) — softened, because you already banked the card's boon.
- *(Founding-style hook ⚙: your first/bottom strip is your founding style; one optional Goal rewards casks of that type — a reason to care about acquisition order.)*

## 4b. The standing track & goal row (v0.5, unchanged)

- The **standing track** is your banked standing total: each **enshrine** advances it by the type's **market value** at that instant (the variable-value layer — there are no separate VP tokens). Each enshrined cask's **goal** flips face-up into the **goal row** (best 3 score). Nothing is hidden in the stack.

## 5. Tableau twins — occupancy becomes opportunity

Each public **builder** verb has a private **twin** here; the twin fires **only when a rival blocks that cell** (locked) — and your **installed working casks** sharpen it. Upgraded, the twin makes you *want* to step onto the crowded cell. (The Hall has no twin — it's open to all.)

- **Larder** (Market twin): +1 G base; a **Larder** room → +2 G.
- **Brew-room** (Brewhouse twin): a smaller built-in advance pool (**2**), no load; a **Faster Fermenter** room restores the full pool + load.
- **Quay** (Harbor twin): **deploy** one ready cask **→ Bruges only**; a **Quay** room → deploy to any open qualifying route. (The Quay room is the **builder's** alternative to the merchant's ships for reaching the far kontore.)

Because the **Floor is only 4 slots** — and rooms compete with working casks (and vessels) for them — you can develop **one** twin deeply at most; different players want different cells jammed, and each walks a different circuit. That's the wide phase-space on a tiny board.

---

## Starting setup (symmetric)

| Item | Start ⚙ |
|---|---|
| Goods | **3 G, 2 H** |
| Recipes | **Gruit baseline** (printed) **+ 2 random premium recipe cards** (tucked); more collected from the Market |
| Standing | **0** (advanced by market value at each enshrine) |
| Vessels | 1 open (lanes 2–3 locked) |
| Brewhouse Floor | **4 slots, empty** (each holds a Room *or* a working Cask) |
| Rooms | none |
| Storage | 8 |
| Worker | placed turn 1 (see Turn-1 rule) |

**Turn-1 rule (refined):** on your first turn you **place** your worker on any cell and activate one of its two lines (no move). From turn 2, the normal **move-then-activate** applies. This makes first placement a genuine decision.

---

## Why these starting numbers (from the opening analysis)

- 2 G 1 H + gruit-only was too thin and forced an identical gruit opening; **3 G 2 H + both recipes** puts the gruit-vs-hopped tempo fork on turn 1 and lets a 3-cost tooling opening exist.
- With the **build×cash-out diagonal**, the two cash-outs (Harbor, Hall) are dead on turn 1 (no Ready cask), so opening *variety* comes from which **builder** line you run (Market+Harbor top row, Market+Hall left col, Harbor+Brewhouse right col, Hall+Brewhouse bottom row) and the gruit-vs-premium load fork — not from forced cell parity.

## Open / to tune

- **Floor-slot count (4?) vs vessel cap (3)** interplay — the central depth-vs-breadth squeeze, now that rooms, working casks, and Extra Vessels all compete for the same 4 slots.
- Whether a Ready cask **clogging its vessel** (Floor full) is too punishing.
- How strong a **working cask's station boost** should be (e.g. the Brewhouse flat **+2**).
- How hard the **6-card recipe tuck cap** should bite (discard pain vs already-banked boon).
- Larder / Brew-room / Quay upgrade magnitudes.
