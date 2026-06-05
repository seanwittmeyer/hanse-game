# Brewhouses of the Hanse — The Player Board (Brewery) v0.7 — "The Wharf"

> The private tableau. Symmetric for all players. Numbers ⚙ are placeholders. **v0.7 reels the brewery back to one clean job — it is where casks are *made and matured* (the private half of the loop), and where your *upgrades* compound.** Everything contested now lives on the shared **wharf** (the perimeter ring), not here, so the brewery is **private and untouchable** (`DESIGN.md` §21). Supersedes v0.6.
>
> **Gone from v0.6:** the 4-slot multi-use Brewhouse Floor, the working-cask state, the tableau twins (Larder/Brew-room/Quay), the recipe-card tuck zone, aging cubes, and the standing track (there is no standing track — score is delivered, not banked). **The brewery = vessels + maturation + recipes + upgrades + storage.**

---

## Purpose

The grid is the **verbs** (Source / Brew / Age / Ship); the brewery is the **noun those verbs act on** — your kettles and cellar. It must legibly hold:
1. the **vessel lanes** (start 2, cap 4 — brewing throughput),
2. the **maturation track** each brewing cask crawls (Brew → … → Ready),
3. the **recipe rack** (the types you may brew),
4. the **upgrade area** (Rooms + Modifiers — the engine you build, mostly earned by delivering),
5. **goods storage** (with its cap).

No grid action is duplicated here. Nothing on this board is contestable by rivals — they can only act on your casks **once they're on the wharf.**

---

## Layout

```
┌──────────────────────────────────────────────────────────────┐
│  ⚑ HOUSE crest        STORAGE ▢▢▢▢ ▢▢▢▢  (G/H, cap 8)         │
│                                                                │
│  VESSELS  (brewing throughput — start 2, cap 4)                │
│   Vessel 1  [ BREW ]→[ ferment ]→[ AGE ]→[ READY ▸ wharf ]     │
│   Vessel 2  [ BREW ]→[ ferment ]→[ AGE ]→[ READY ▸ wharf ]     │
│   Vessel 3  ▒▒ locked — add an Extra Vessel (upgrade) ▒▒       │
│   Vessel 4  ▒▒ locked — add an Extra Vessel (upgrade) ▒▒       │
│        (a cask advances 1/turn passively + via the Cellar)     │
│                                                                │
│  RECIPES  ▤Gruit ▤Hopped  ▤ ▤ …   (the types you may brew)     │
│                                                                │
│  UPGRADES  [ Room|Modifier ] [ ] [ ] [ ] …                     │
│        (Rooms = capability · Modifiers = asymmetric perks)     │
└──────────────────────────────────────────────────────────────┘
```

> A print-ready visual of this layout lives in `printables.html` → **Player Boards** view (one per colour). It is generated from this spec; keep the two in sync. *(printables.html is updated in a later pass — see `DESIGN.md` §21 engine deltas.)*

---

## 1. Vessels & the maturation track (start 2, cap 4)

- **Two vessel lanes open at start** (the v0.6 single-vessel bootleneck is gone — parallel brewing from turn 1). Lanes 3 & 4 are unlocked by the **Extra Vessel** upgrade. More vessels = more casks maturing at once = the core throughput dial.
- A **Brew** action (cell B) loads a recipe you hold into an open vessel as a young cask at **step 0**.
- The cask **matures along its track to Ready:** it advances **+1 automatically at the start of each of your turns** (maturing never depends on reaching a cell), and the **Cellar** action (cell D) gives a **pool of advance points** ⚙ you allocate across your vessels. Maturation length is set by type (Gruit 1 · Hopped 2 · export 2–3 ⚙).
- When a cask reaches **Ready**, you **deploy it to an open wharf slot** you choose (free) — now it is public (its action fires; it can be shipped, by you or a rival). **If the wharf is full, the Ready cask clogs its vessel** until you free a wharf slot or ship something — the back-pressure that keeps the loop moving and forces cash-outs.

## 2. Recipes (the types you may brew)

- A **recipe rack** holds the types you can brew. You **start with Gruit + Hopped** (fixed, symmetric); collect **export recipes** at the Market to climb. A recipe is permanent and is **only** *type + brew cost* — no boons, no tuck, no discard cap (the v0.6 recipe-card machinery is cut). You cannot brew a type you hold no recipe for; Gruit & Hopped are always available.

## 3. Upgrades (the private engine — where you "get ahead")

- An **upgrade area** holds **Rooms** (permanent capability — Extra Vessel, Aging Cellar, Warehouse, Quay, Cooperage) and **Modifiers** (asymmetric perks — *"when you gain hops, +1,"* *"ships +1 capacity,"* etc.). See `TILES.md` §E.
- Upgrades are the engine-building layer and where strategies diverge. **Most are earned by *delivering*** (the London / Bergen / Novgorod destination benefits), some bought at the Market — closing the loop **deliver → upgrade → brew better → deliver better** (the Distilled "selling funds your next still" feel). ❓ whether the upgrade area is capped or open.

## 4. Storage

- Cap **8 goods** ⚙ (a printed track). **Warehouse** room +4. Overflow is lost — the cap (with small skims) contains the rich-get-richer risk. `G` and `H` are the only currency; there is **no money** and **no spendable prestige**.

---

## Starting setup (symmetric)

| Item | Start ⚙ |
|---|---|
| Goods | **3 G, 2 H** |
| Recipes | **Gruit + Hopped** (printed/fixed); more collected at the Market |
| Vessels | **2 open** (lanes 3–4 locked behind Extra Vessel) |
| Upgrades | none |
| Storage | 8 |
| **Warm start** | **1 built Cog** (in a ring slot, bound to Bruges) **+ 1 Ready Gruit in a vessel** (deploy it turn 1) ⚙ — so the loop is live and a first voyage is reachable turn 2–3 |
| Worker | placed turn 1 (see Turn-1 rule, `RULES.md` §1) |

> **Why these starting numbers** (`DESIGN.md` §21E): the pace model showed v0.6's first voyage at **turn 6** (goods- and geometry-bound, not brew-bound), so v0.7 starts you **mid-loop** — 2 vessels, a warm Cog + cask, all destinations open, base verbs always usable. *Gaining a export recipe means more* because you start with only the on-ramp.

---

## Open / to tune

- **Starting vessels (2?) & warm-start contents** vs the Sailed-Ships clock length — the joint pace dials.
- **Maturation lengths** per type vs the Cellar advance pool (the tempo economy).
- **Upgrade area:** capped (a depth squeeze) or open (free engine growth); which upgrades come from deliveries vs the Market.
- Whether a Ready cask **clogging its vessel** (wharf full) is too punishing.
