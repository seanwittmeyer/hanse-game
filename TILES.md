# Brewhouse of the Hanse — Tile List (v0.1)

> The full deck. Derived from the locked architecture in `DESIGN.md`. **Every number is a placeholder ⚙** — this fixes *what each tile is and does*, not final balance. Seven families (A–G). Casks (A) are the heart; the rest is the economy around them.

---

## 0. Conventions

- **Goods:** `G` = grain cube, `H` = hops cube. The only spendable currency (no money).
- **Faces:** infrastructure tiles are single-face; **cask tiles are double-sided** — **working/reach face** (in a slot: type · quality · a **line action**) ↔ **standing face** (enshrined: a **goal**). v0.5: a cask lives **working** (personal slot), **reach** (deployed to a shared slot = your presence) or **standing** (enshrined) — see `DESIGN.md` §19.
- **Line-fire rule:** an owned **slot tile** fires when *any* player activates that line. **Casks fire an ACTION** (resolved for the active player); **lanes & ships fire a RESOURCE skim** (to the owner); the **Fair** fires a **paid market pump** (active player pays, fee to owner). Keep payoffs small — the rich-get-richer dial. ⚙
- **Acquisition:** all tiles enter from a **face-up Market display**, paid in goods at the **Market** cell. Casks are the exception: you collect a **recipe into your book** (§C′) and **brew** it — and **buying a recipe raises that type's market value +1**. Recipe supply is gated by the current **type frontier** (§A).
- **Reach vs Standing accumulate separately** but the **demand market couples them** (§A′): realizing a type either way pulls its value down. The two never convert; the *timing* between them is the game.

---

## A. Cask tiles — the dual-role hero (~60 tiles)

A cask tile carries, by face:

- **Working/reach face**: `TYPE` · `QUALITY` · a **line action**. Installed in a **personal slot** it soups up a station (engine); **deployed** to a shared perimeter slot it **is your presence** on a route (reach) and **fires its action** when the line runs (resolved for the active player). A deployed cask is **enshrine-able by any player**.
- **Standing face** (enshrined): a **goal** (end-game scoring). The cask is pulled off the board; the owner banks the type's current **market value** (§A′) on their standing track and the goal flips face-up in their row.

> **The three-state fork** (`RULES.md` §2): a Ready cask is **working** (engine), **reach** (deployed = presence), or **standing** (enshrined) — only one at a time. Enshrining converts it: the board presence leaves, the value is banked.

### Types & recipes (two layers)

> **v0.3 — the recipe book (2026-06-03).** A **type** is a global quality rung (below); a **recipe** is a *collected instance* of a type with its own cost profile, held in your private **book** (§C′). You can't brew a type you hold no recipe for. The ladder is **anchored spine + variable summit**: Gruit→Hopped are fixed and historical (hops is what opens the sea routes), and the premium tiers **L3–L5 are filled by historical Hanse beers dealt in a variable order/subset each game** — so the efficient path differs every game.

| Level | Type | Q | Typical inputs ⚙ | Brew path | Deploys to (reach) | Enshrine? | Start market value ⚙ | Qty |
|---|---|---|---|---|---|---|---|---|
| **L1** | **Gruit Ale** | 1 | `G` | LOAD→FERMENT→READY (skips AGE) | Bruges / nearest only (perishable) | ❌ | — (single-face) | 16 |
| **L2** | **Hopped Beer** | 2 | `G H` | LOAD→FERMENT→AGE→READY | Bruges / London / Bergen | ✅ | 4 | 20 |
| **L3** | *summit ⚙* | 3 | `G H H` ⚙ | + longer AGE | London / Bergen / Novgorod | ✅ | 6 | 12 |
| **L4** | *summit ⚙* | 4 | `G G H H` ⚙ | + longer AGE | Bergen / Novgorod | ✅ | 8 | 8 |
| **L5** | *summit ⚙* | 5 | premium; needs **Aging Cellar** | longest AGE | Novgorod | ✅ | 11 | 4 |

> **Summit roster (dealt to L3–L5 in variable order each game) ⚙:** real Hanse export beers — **Bock** (Einbeck, the origin of the word "bock"), **Mumme** (Braunschweig, thick dark prestige export shipped absurdly far), **Broyhan** (Hannover), **Keut** (Low Countries). Reskins the anachronistic *Dubbel/Tripel* placeholders. Each carries a light mechanical hook (e.g. Bock needs the Aging Cellar; Mumme = slow but high-standing). ⚙
>
> **Typical inputs are the *type's* baseline; the actual cost is on the collected recipe** — two L3 recipes can read `G H H` vs `G G` vs a faster-but-pricier mix. *Which recipes you draw*, not just which type, defines your engine — the diceless variability + asymmetry lever.

*Gruit is reach-only — perishable, never heritage. It's cheap early-engine fuel and cheap local reach, and it can never be enshrined. That single fact is the Westvleteren/Leffe line drawn in the components.*

### Market quality-gates (the Quality → Destination interlock)

A route only accepts presence from casks of sufficient quality:

| Route | Min quality to ship | Why |
|---|---|---|
| **Bruges (Hub)** | Q1 | takes everything, low value |
| **London (Steelyard)** | Q2 | |
| **Bergen (Monopoly)** | Q2 | narrow, contested |
| **Novgorod (Long Haul)** | Q3 | only the premium survives the voyage |

### Goal pool (standing face — the goal-matching DNA, the 3-way cycle)

> **v0.3 — cycled goals + best-3 cap (`DESIGN.md` §19, 2026-06-03, "fix D").** Every enshrine-able cask carries **one** goal. The pool is a **3-way symmetric cycle — 3 reach-rewarding · 3 standing-rewarding · 3 engine-rewarding, all capped** — deliberately authored so **no goal rewards the axis the enshrine act already pays.** A pure-standing player therefore draws goals that score ~0 without reach/engine, which is what makes blending pay (the GWT ideal). **Only your best 3 enshrined goals score**, so the goal axis stays a bonus (~one-third of a typical score), not the game. *(Supersedes the old g1–g10 single-axis pool.)*

| # | Goal (end-game) ⚙ | Rewards | Pulls you toward |
|---|---|---|---|
| g1 | `+1 / route you hold presence on (max 4)` | **Reach** | breadth |
| g2 | `+1 per 2 presence markers on the board` | **Reach** | volume |
| g6 | `+4 / route majority you hold (max 2)` | **Reach** | destination/commitment |
| g3 | `+2 / other enshrined cask of the SAME style (max 6)` | **Standing** | depth/set |
| g4 | `+2 / enshrined Q3+ cask you own (max 6)` | **Standing** | quality |
| g10 | `+3 flat` | **Standing** | safe/scarcity |
| gV | `+2 / distinct enshrined style` | **Engine** | spread/climb |
| gC | `+2 / top enshrined quality reached` | **Engine** | summit |
| g8 | `+2 / filled brewery room` | **Engine** | tableau depth |

> Enshrining is therefore a **double choice**: bank the type's **market value** now (timing — §A′), and commit to a scoring *direction* (the goal). Because the goal usually rewards a *different* axis than the standing you just banked, the goal is what tempts a one-note player to blend. *(The old "set the shared stack's top action" role is retired — the stack is sediment; value lives on tracks, goals face-up.)*

---

## A′. The demand market — the value-over-time signal (v0.5)

One shared **value track**, one marker per type. **A cask's enshrine payout = its type's market value at that instant** (banked on the owner's standing track). This single number is the whole variable-value layer — it folds in the old "printed standing + VP tokens" (both retired).

- **DOWN −1:** each time a type is **realized** — **deployed for reach OR enshrined for standing.** So the volume crowd flooding a type erodes the prestige crowd's payout. Every turn you leave a cask out reaching, others selling your type may be bleeding its value down. *(This is also the type-frontier driver — enough realizations of the frontier type unlocks the next tier, §A.)*
- **UP +1 (auto):** **buying a recipe** of a type (your engine investment stokes demand).
- **UP +1 (paid):** a **Fair** pump (§B′) — pay a good to raise a type.
- A new tier **enters high** (frontier unlock) then erodes. **Guardrail ⚙:** a pump (+1) is never larger than a realize-drop (−1), and the track has a floor & ceiling, so it can't be farmed into inflation.

> **The self-enshrine timer:** cash your type while it's high; don't get caught holding when reach-floods or a rival's enshrine tank it. **Builders pump, cash-outs dump** — and because pumping (recipe-buy / Fair) and dumping (enshrine) can both sit on one line, you can **pump-and-dump in a single activation**.
>
> **Components:** one market marker per live type. No VP tokens.

---

## B. Route tiles — author the scoring landscape (~19 tiles)

Placed in a perimeter slot (committed to row XOR column). **Two jobs:** raise that route's end-game value on the board, *and* fire a shipping skim when the line activates. Owned & taxable.

| Route tile | Route-value boost ⚙ | Line action (owner) ⚙ | Qty |
|---|---|---|---|
| **Bergen Lane** | +2 / +3 | `+1 G skim` (owner) | 4 |
| **Novgorod Lane** | +3 / +4 / +5 | `+1 G skim` (owner) | 5 |
| **Bruges Lane** | +1 / +2 / +3 | `+1 G skim` (owner) | 6 |
| **London Lane** | +2 (+grants a Privilege when placed) | `+1 G skim` (owner) | 4 |

> **⚠ Balance fix (v0.2):** Lane line-actions were `+1 presence`, which ran away (a 3p sim hit 12 presence on a cap-4 route and ended the game on turn 4). **Presence now comes only from shipping** and is **clamped to route capacity**; Lane skims pay a tiny `+1 G` instead.

> A route's end-game value = sum of the boosts players slotted onto it. **Players author what scores** by what they place — and rivals decide whether to pile onto a rich route (majority fight) or open a neglected one.

---

## B′. Fair tiles — the paid market lever (~4 tiles, NEW v0.5)

A slot tile. Its **line action lets the active player pay 1 `G` to raise one beer type's market value +1**; the **fee goes to the Fair's owner** (the owner pays the supply when self-using — never free). The toll-baron market stall: build it on a line you run, ideally a **Hall line**, to **pump → enshrine high in one activation** before rivals react. Placement (which line) is the decision.

| Fair tile | Effect ⚙ | Qty |
|---|---|---|
| **Town Fair** | pay 1 `G` → +1 a type's market value (fee to owner) | 3 |
| **Hansetag** | pay 1 `G` → +1, and +1 to a *second* type at half-step ⚙ | 1 |

---

## C. Ship tiles — owned resource faucets (~10 tiles)

A ship is a **slot tile** that, when its line fires (any activator), **skims a resource (`G`/`H`) to its owner** — sticky infrastructure that pays you while it sits. *(v0.5 retires the route-bound cargo-container / sail mechanic — casks now deploy directly into slots, so ships are simple faucets.)*

| Ship tile | Effect ⚙ | Qty |
|---|---|---|
| **Cog** | line-fire → owner +1 `G` | 4 |
| **Hulk** | line-fire → owner +1 `G` or `H` (bigger faucet) | 3 |
| **Toll Exemption** | ignore one skim/fee you'd owe per turn | 2 |
| **Pilot** | ignore one waypoint cost | 1 |

---

## C′. Recipe tiles — your private book (collected, not slotted)

Recipes are a **private book**, not slot tiles. You **collect** recipe tiles from the Market display (gated by the current type frontier, §A) and keep them; each names a **type** and carries its **own cost profile** — `n G · n H · n brew-steps`. You brew from the book; you **cannot brew a type you hold no recipe for** (Gruit is the universal baseline, always in the book). *(Supersedes the 2026-06-02 claim-on-fire slot model.)*

- **Variable cost within a type:** two L3 recipes can read `G H H`, `G G`, or a faster-but-pricier mix — so *which* recipes you draw, not just *which type*, defines your engine. The diceless variability + asymmetry engine.
- **The depth-pull tension:** a tempting high-type recipe collected for cheap then *sits in your book wanting to be brewed*, pulling a reach-committed player up the ladder.
- **Frontier-gated supply:** only recipes of currently-unlocked types appear in the Market. As types saturate and advance (§A′/§A), higher-tier recipes enter — skewing temptation upward.

| Recipe tile (variants per type) | Type | Buy cost ⚙ | Brew cost profile ⚙ | Qty |
|---|---|---|---|---|
| **Recipe · Hopped** | L2 | `1 G` | e.g. `G H` / `G G H` (faster) | 5 |
| **Recipe · summit L3** | L3 | `1 G 1 H` | `G H H` / `G G` / … | 4 |
| **Recipe · summit L4** | L4 | `2 G` | `G G H H` / … | 3 |
| **Recipe · summit L5** | L5 | `2 G 1 H` | premium; needs Aging Cellar to brew | 2 |

> Start of game: **Gruit baseline + 2 random premium recipes** in the book (a random pair from the unlocked tiers). ⚙

---

## D. Privilege tiles — Steelyard rewards (12 unique)

Gained chiefly via the **London** route / London Lane. Ongoing perks; held by the player (not in a slot unless noted). ❓ slot vs free.

1. **Steelyard Charter** — ignore all tolls on one line each turn.
2. **Royal Patent** — your Harbor ships +1 step (stacks with Cog).
3. **Guild Seat** — Brewhouse advances +1 extra brew step.
4. **Customs Waiver** — place infrastructure for 1 fewer good.
5. **Factor's License** — draw 1 extra tile at the Market.
6. **Letter of Credit** — once/round, treat 1 `G` as 1 `H` or vice-versa.
7. **Warehouse Right** — +2 goods storage.
8. **Staple Right** — when you ship, +1 presence.
9. **Burgher Status** — +1 standing each scoring for every route majority you hold.
10. **Brewers' Privilege** — gruit may ship one route farther.
11. **Patron's Ear** — first to the Market each round draws +1.
12. **Hanseatic Seal** *(endgame)* — +1 VP per route you have presence on.

---

## E. Room / Upgrade tiles — tableau engine (8 types, ~24 tiles)

Installed into tableau room slots. Where **depth** lives. Also upgrade the blocked-cell trickle.

| Room | Effect ⚙ | Qty |
|---|---|---|
| **Extra Vessel** | +1 parallel brewing lane | 4 |
| **Faster Fermenter** | FERMENT auto-advances (skip 1 step) | 3 |
| **Aging Cellar** | AGE costs 1 fewer step; **unlocks Barrel-aged** | 3 |
| **Warehouse** | +goods storage; may store finished casks | 3 |
| **Larder** | Market-trickle fallback → +2 `G` instead of +1 | 3 |
| **Quay** | Harbor-trickle fallback → ship 2 steps instead of 1 | 3 |
| **Counting-house** | when you enshrine, +1 standing | 3 |
| **Cooperage** | +1 presence whenever you ship (or barrel capacity if barrels adopted) | 2 |

---

## F. Public Hall tiles — *deprecated in v0.5* ❓

The shared-stack "top tile = current action" mechanic is **retired** — the standing stack is pure sediment now (value lives on each player's standing track; goals sit face-up in a personal row, best 3 score). These public-action tiles are cut, or kept only as optional **one-time setup bonuses** if a shared-action element is wanted back. ⚙

---

## G. Starting setup (per player)

- 1 **worker**, placed on the grid.
- Tableau printed with **Larder** (Market trickle +1 `G`) and **Quay** (Harbor trickle, 1 step) — upgradeable by Family E.
- **1 vessel lane** open on the brewing track.
- Starting stake: **3 `G`, 2 `H`**, **standing 0**, **3 empty personal cask slots**, and **the Gruit baseline + 2 random premium recipes** in your **recipe book**. ⚙
- Asymmetric starting brewing-house tiles = possible variant. ❓

---

## Deck size — answering the "needs cards?" worry

| Family | Tiles | Unique designs |
|---|---|---|
| A Casks | ~60 | ~5 types × ~9 goals |
| B Routes (lanes) | 19 | ~4 |
| B′ Fair | 4 | 2 |
| C Ships (faucets) | 10 | 4 |
| C′ Recipes (book) | 14 | 4 (variants per type) |
| D Privileges | 12 | 12 |
| E Rooms | 24 | 8 |
| **Total** | **~145** | **~38 unique faces** |

**~145 tiles but only ~38 unique designs** — the bulk is *copies* (casks, rooms). That's Castles-of-Burgundy / Carcassonne tile-scale, not card-scale. Cards aren't needed; tiles preserve determinism and the physical working↔standing flip.

---

## Open tuning notes

1. **Skim strength** (A working actions, B/C line actions) — the central rich-get-richer dial.
2. **Goal distribution** — are the three axes balanced, or does one goal dominate?
3. **Quality-gate severity** — does Q3-gating Novgorod choke the long-haul path too hard?
4. **Standing curve** (3/5/7/10 by level L2–L5) vs goal bonuses — keep enshrining-for-goals competitive with enshrining-for-flat-standing (g10).
5. **Privilege/room acquisition** — Market display for all, or thematic sources (London for privileges, a build action for rooms)?
6. **Brewing-step counts** — exact length of FERMENT/AGE per style sets the whole tempo economy.
