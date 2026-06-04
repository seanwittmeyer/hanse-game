# Brewhouse of the Hanse — Tile List (v0.6)

> The full deck. Derived from the locked architecture in `DESIGN.md` (**§20, v0.6 — supersedes v0.5/§19 where they conflict**). **Every number is a placeholder ⚙** — this fixes *what each tile is and does*, not final balance. **Six tile families (A, B, B′, C, D, E) + one card deck (C′).** Casks (A) are the heart; the rest is the economy around them.
>
> **v0.6 headline shifts:** recipes move **tile → a face-up Market card deck** (one-time boon + permanent tucked brew strip — §C′, no longer slot/book tiles); ships become **single-use destination carriers** consumed to the **Sailed-Ships track** (the new primary end clock — the *Toll Exemption / Pilot* tiles retire with the faucet framing — §C); route lanes fire **differentiated per-kontor skims** (§B); working casks now live on the **4-slot Brewhouse Floor** alongside rooms. The **spine is unchanged.**

---

## 0. Conventions

- **Goods:** `G` = grain cube, `H` = hops cube. The only spendable currency (no money).
- **Faces:** infrastructure tiles are single-face; **cask tiles are double-sided** — **working/reach face** (in a slot: type · quality · a **line action**) ↔ **standing face** (enshrined: a **goal**). v0.6: a cask lives **working** (a **Brewhouse Floor** slot, shared with rooms), **reach** (deployed/sailed to a shared slot = your presence) or **standing** (enshrined) — see `DESIGN.md` §20.
- **Recipes are CARDS, not tiles (v0.6):** a small **face-up Market card deck** (§C′) — each card a one-time on-collect boon **and** a permanent brew strip you tuck under the board's bottom edge (Lisboa-style). They are *not* slot tiles and *not* a separate book of tiles.
- **Line-fire rule:** an owned **slot tile** fires when *any* player activates that line. **Casks fire an ACTION** (resolved for the active player); **lanes fire a differentiated per-kontor RESOURCE skim** (to the owner); **ships are LOADED** (the active player puts a Ready cask aboard — loader takes a small benefit, owner skims a good); the **Fair** fires a **paid market pump** (active player pays, fee to owner). Keep payoffs small — the rich-get-richer dial. ⚙
- **Acquisition:** all tiles enter from a **face-up Market display**, paid in goods at the **Market** cell; **recipe cards** are likewise taken **only at the Market**. Casks are the exception: you **brew** them from a tucked recipe strip (§C′) out of the shared supply — and **collecting a recipe card raises that type's market value +1**. Recipe supply is gated by the current **type frontier** (§A).
- **Reach vs Standing accumulate separately** but the **demand market couples them** (§A′): realizing a type either way pulls its value down. The two never convert; the *timing* between them is the game.
- **End clock:** the **Sailed-Ships track fills** (primary) **or N casks enshrined** (backup) → finish the round → score. City saturation is no longer a trigger (v0.6).

---

## A. Cask tiles — the dual-role hero (~60 tiles)

A cask tile carries, by face:

- **Working/reach face**: `TYPE` · `QUALITY` (printed Q1–Q5, static, set at brew) · a **line action**. Installed in a **Brewhouse Floor slot** (one of 4, shared with rooms) it soups up a station (engine). As **reach** it **is your presence** on a route, two ways: **Harbor direct-deploy** (Bruges, or any route with a Quay room) puts the cask in a **shared perimeter slot** (owner marked by a **disc**), where it **fires its action** when the line runs *and* is **enshrine-able by any player**; **ship delivery** drops it as a **committed presence marker** on the route — *not* a slot, so it fires no action and **cannot be enshrined** (locked-in reach).
- **Standing face** (enshrined): a **goal** (end-game scoring). The cask is pulled off the board; the owner banks the type's current **market value** (§A′) on their standing track and the goal flips face-up in their row.

> **The three-state fork** (`RULES.md` §2): a Ready cask is **working** (engine, on the Floor), **reach** (deployed or ship-delivered = presence), or **standing** (enshrined) — only one at a time. Enshrining converts it: the board presence leaves, the value is banked. **Age** is tracked by position on the brewing track plus one **aging cube**; **quality** is fixed at brew.

### Types & recipes (two layers)

> **v0.6 — recipes are cards (was the v0.3 "book").** A **type** is a global quality rung (below); a **recipe** is a *collected instance* of a type with its own cost profile, held as a **tucked brew strip from a Market card** (§C′). You can't brew a type you hold no recipe strip for. The ladder is **anchored spine + variable summit**: Gruit→Hopped are fixed and historical (hops is what opens the sea routes), and the premium tiers **L3–L5 are filled by historical Hanse beers dealt in a variable order/subset each game** — so the efficient path differs every game.
>
> **Reach access (v0.6):** Harbor **direct-deploy reaches Bruges only**; **London / Bergen / Novgorod presence comes through a ship** (or via the **Quay** room, which upgrades direct-deploy to any open route). The "Deploys to" column below is the *quality-gate reach* a cask is eligible for once carried there.

| Level | Type | Q | Typical inputs ⚙ | Brew path | Reaches (quality-gated) | Enshrine? | Start market value ⚙ | Qty |
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

Placed in a perimeter slot (committed to row XOR column). **Two jobs:** raise that route's end-game value on the board, *and* fire a **differentiated, per-kontor skim** when the line activates (v0.6 — no longer a flat `+1 G`; the skim is now per-kontor and authorial). Owned & taxable. Each route is also a **ship destination** — a ship built to it inherits its **quality gate** and its **destination bonus** is what the ship's owner banks on delivery.

| Route tile | Route-value boost ⚙ | Lane line action — differentiated skim (owner) ⚙ | Destination bonus on sail (owner) ⚙ | Qty |
|---|---|---|---|---|
| **Bruges Lane** (Hub) | +1 / +2 / +3 | **+1 `G`** (liquidity) | **+2 `G`** | 6 |
| **London Lane** (Steelyard) | +2 (+grants a Privilege when placed) | **advance/draw on the Privilege track** | **a Privilege** | 4 |
| **Bergen Lane** (Monopoly) | +2 / +3 | **toll** — a rival who delivers/loads to Bergen pays the lane owner a good | **a monopoly toll / majority help** | 4 |
| **Novgorod Lane** (Long Haul) | +3 / +4 / +5 | **+1 `H` or advance a brew a step** | **the biggest — a presence/standing kicker** | 5 |

> **⚠ Balance fix (v0.2, still holds):** Lane line-actions were `+1 presence`, which ran away (a 3p sim hit 12 presence on a cap-4 route and ended the game on turn 4). **Presence now comes only from deploy/ship delivery** and is **clamped to route capacity**; lane skims pay the small differentiated benefits above.

> A route's end-game value = sum of the boosts players slotted onto it. **Players author what scores** by what they place — and rivals decide whether to pile onto a rich route (majority fight) or open a neglected one. **Only Bruges is reachable by Harbor direct-deploy**; the other three are reached only via **ships** (or the Quay room).

---

## B′. Fair tiles — the paid market lever (~4 tiles, NEW v0.5)

A slot tile. Its **line action lets the active player pay 1 `G` to raise one beer type's market value +1**; the **fee goes to the Fair's owner** (the owner pays the supply when self-using — never free). The toll-baron market stall: build it on a line you run, ideally a **Hall line**, to **pump → enshrine high in one activation** before rivals react. Placement (which line) is the decision.

| Fair tile | Effect ⚙ | Qty |
|---|---|---|
| **Town Fair** | pay 1 `G` → +1 a type's market value (fee to owner) | 3 |
| **Hansetag** | pay 1 `G` → +1, and +1 to a *second* type at half-step ⚙ | 1 |

---

## C. Ship tiles — single-use destination carriers (~13 tiles, v0.6)

A ship is a **slot tile built at the Market tied to a destination kontor**, inheriting that route's **quality gate**, with **capacity Cog 2 / Hulk 3**. Lifecycle: **load → fill → sail** — the *reach* engine that mirrors the standing engine (rooms + summit brewing). *(v0.6 retires the v0.5 "faucet" framing AND the **Toll Exemption** / **Pilot** tiles.)*

- **Load** (when the ship's line fires, by *anyone*): the active player may put one **Ready** cask that meets the gate aboard. The **loader takes a small benefit**; the **owner skims a good** (toll-baron, like a Fair). *(The type's realize −1 fires when the cask becomes presence, i.e. on sail.)*
- **Sail** (the instant the ship is **full**): every cask aboard **drops as presence (reach)** at the destination, the **owner banks the per-kontor destination bonus** (§B), and the **ship tile is consumed to the shared Sailed-Ships track** (the primary end clock — `DESIGN.md` §20-F). A new ship must then be built. *(Relief valve: the owner may launch a partial ship early via a Harbor action.)*
- **Ships are the only way to reach London / Bergen / Novgorod** (Harbor direct-deploy reaches Bruges only; the **Quay** room upgrades direct-deploy to any open route — the builder's alternative to ships).

| Ship tile | Capacity | On delivery | Qty ⚙ |
|---|---|---|---|
| **Cog** | 2 | owner banks the destination bonus; tile → Sailed-Ships track | ~8 |
| **Hulk** | 3 | owner banks the destination bonus; tile → Sailed-Ships track | ~5 |

> **Single-use ⇒ more copies than v0.5** (each voyage consumes a tile to the Sailed-Ships track). A Hulk's 3-presence burst still costs only **one** track slot, so the clock stays smooth.

---

## C′. Recipe cards — the dual-use Market deck (CARDS, not tiles — v0.6)

Recipes are a **small face-up CARD deck**, acquired **only at the Market** (gated by the current type frontier, §A). Each card is **dual-use**, rhyming with the dual-role cask — a **one-time boon on collect** *and* a **permanent brew strip** you keep. *(Supersedes the v0.3 "private book of tiles" and the 2026-06-02 claim-on-fire slot model — recipe **tiles** are removed from the box.)*

- **On collect — a big one-time boon (≈ a free action), scaling by tier ⚙:**
  - **L2 Hopped — *Stocked Pantry:*** +2 `G` 2 `H`
  - **L3 — *Brewmaster's Push:*** advance 3 across your vessels (a free Brewhouse)
  - **L4 — *Grand Market:*** take 2 goods **and** buy one slot tile (lane/ship/Fair/room) at **−1**
  - **L5 — *Master's Privilege:*** **choose one** — advance 3 / +2 `G` 2 `H` / a free Market / a free Harbor deploy of a Ready cask
  - **Guardrail:** boons grant **resources / tempo / small presence only — never standing or raw VP** (only L5 offers a single *reach* assist), so the cash-out cells keep their job.
- **Permanent brew strip:** the card **tucks under the bottom edge of the player board** (Lisboa-style), showing only its **type + cost profile** (`n G · n H · n steps`). Your fanned row of strips **is** your recipe book; you brew from any tucked strip forever. You **cannot brew a type you hold no strip for** (Gruit is the printed baseline, always brewable).
- **Soft cap = the board edge: 6 tuck guides.** Collecting a 7th forces you to **discard a strip** (lose that brewable type) — softened because you already banked the card's boon.
- **Still pumps the type +1 on collect** (unchanged; respects the `pump ≤ drop` guardrail, §A′).
- **Variable cost within a type:** two L3 cards can read `G H H`, `G G`, or a faster-but-pricier mix — so *which* cards you draw, not just *which type*, defines your engine.
- **Founding-style hook (optional):** your **first/bottom** strip is your *founding style*; one optional Goal rewards casks of that type — a cheap reason to commit early and to care about acquisition order.
- **Frontier-gated supply:** only cards of currently-unlocked types appear in the Market; higher tiers enter as types saturate and advance (§A′/§A).

| Recipe card (variants per type) | Type | Buy cost ⚙ | On-collect boon ⚙ | Brew cost profile ⚙ | Qty |
|---|---|---|---|---|---|
| **Recipe · Hopped** | L2 | `1 G` | *Stocked Pantry* (+2 `G` 2 `H`) | e.g. `G H` / `G G H` (faster) | 5 |
| **Recipe · summit L3** | L3 | `1 G 1 H` | *Brewmaster's Push* (advance 3) | `G H H` / `G G` / … | 4 |
| **Recipe · summit L4** | L4 | `2 G` | *Grand Market* (2 goods + a slot tile at −1) | `G G H H` / … | 3 |
| **Recipe · summit L5** | L5 | `2 G 1 H` | *Master's Privilege* (choose one) | premium; needs Aging Cellar to brew | 2 |

> Start of game: **Gruit baseline** (printed on the board, always brewable) **+ 2 random premium recipe cards** (a random pair from the unlocked tiers). Deck ~**14 cards ⚙**. ⚙

---

## D. Privilege tiles — Steelyard rewards (12 unique)

Gained chiefly via the **London** route / London Lane. Ongoing perks; held by the player (not in a slot unless noted). ❓ slot vs free.

1. **Steelyard Charter** — ignore all tolls on one line each turn.
2. **Royal Patent** — your ships sail with +1 effective capacity (an extra cask aboard before they fill).
3. **Guild Seat** — Brewhouse advances +1 extra brew step.
4. **Customs Waiver** — place infrastructure for 1 fewer good.
5. **Factor's License** — draw 1 extra tile at the Market.
6. **Letter of Credit** — once/round, treat 1 `G` as 1 `H` or vice-versa.
7. **Warehouse Right** — +2 goods storage.
8. **Staple Right** — when a cask of yours is delivered (deploy/sail), +1 presence.
9. **Burgher Status** — +1 standing each scoring for every route majority you hold.
10. **Brewers' Privilege** — gruit may ship one route farther.
11. **Patron's Ear** — first to the Market each round draws +1.
12. **Hanseatic Seal** *(endgame)* — +1 standing per route you have presence on.

---

## E. Room / Upgrade tiles — tableau engine (8 types, ~24 tiles)

Installed into a **Brewhouse Floor slot** (one of 4, shared with working casks — v0.6: building a room is spending one of your contested Floor squares). Where **depth** lives. Also upgrade the weak cash-out alternates.

| Room | Effect ⚙ | Qty |
|---|---|---|
| **Extra Vessel** | +1 parallel brewing lane (start 1, cap 3) — **as a Room it consumes a Floor slot** (the build-wide-vs-deep squeeze) | 4 |
| **Faster Fermenter** | FERMENT auto-advances (skip 1 step) | 3 |
| **Aging Cellar** | AGE costs 1 fewer step; **unlocks Barrel-aged** | 3 |
| **Warehouse** | +goods storage; may store finished casks | 3 |
| **Larder** | Market alternate fallback → +2 `G` instead of +1 | 3 |
| **Quay** | **upgrades Harbor direct-deploy from Bruges-only to any open route** (the builder's alternative to running ships) | 3 |
| **Counting-house** | when you enshrine, +1 standing | 3 |
| **Cooperage** | +1 presence whenever a cask of yours is delivered (or barrel capacity if barrels adopted) | 2 |

---

## F. Public Hall tiles — *deprecated in v0.5* ❓

The shared-stack "top tile = current action" mechanic is **retired** — the standing stack is pure sediment now (value lives on each player's standing track; goals sit face-up in a personal row, best 3 score). These public-action tiles are cut, or kept only as optional **one-time setup bonuses** if a shared-action element is wanted back. ⚙

---

## G. Starting setup (per player)

- 1 **worker**, placed on the grid.
- Tableau printed with the **Larder** (Market alternate) and **Quay** (Harbor) twins — upgradeable by Family E.
- **1 vessel lane** open on the brewing track (cap 3).
- A **Brewhouse Floor of 4 empty multi-use slots** (each will hold a Room *or* a working Cask).
- Starting stake: **3 `G`, 2 `H`**, **standing 0**, the **Gruit baseline** (printed, always brewable) **+ 2 random premium recipe cards** tucked under the board, a set of **ownership discs** and an **aging-cube** allotment from the shared supply. ⚙
- Asymmetric starting brewing-house tiles = possible variant. ❓

---

## Deck size — answering the "needs cards?" worry

| Family | Count | Unique designs |
|---|---|---|
| A Casks (tiles) | ~60 | ~5 types × ~9 goals |
| B Routes / lanes (tiles) | 19 | ~4 |
| B′ Fair (tiles) | 4 | 2 |
| C Ships (tiles, **single-use**) | ~13 | 2 (Cog · Hulk) |
| D Privileges (tiles) | 12 | 12 |
| E Rooms (tiles) | 24 | 8 |
| **Tile total** | **~132** | **~33 unique faces** |
| C′ Recipes (**cards**, v0.6) | ~14 | 4 (variants per type) |

**~132 tiles + a ~14-card recipe deck**, but only ~33 unique tile designs — the bulk is *copies* (casks, rooms). That's Castles-of-Burgundy / Carcassonne tile-scale. The lone deck is the **recipe cards** (the Lisboa tuck needs cards, not tiles); everything else stays tiles to preserve determinism and the physical working↔standing flip.

---

## Open tuning notes

1. **Skim strength** (A working actions, B/C line actions) — the central rich-get-richer dial.
2. **Goal distribution** — are the three axes balanced, or does one goal dominate?
3. **Quality-gate severity** — does Q3-gating Novgorod choke the long-haul path too hard?
4. **Standing curve** (3/5/7/10 by level L2–L5) vs goal bonuses — keep enshrining-for-goals competitive with enshrining-for-flat-standing (g10).
5. **Privilege/room acquisition** — Market display for all, or thematic sources (London for privileges, a build action for rooms)?
6. **Brewing-step counts** — exact length of FERMENT/AGE per style sets the whole tempo economy.
