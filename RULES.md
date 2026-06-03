# Brewhouse of the Hanse — Turn & Round Economy (v0.1)

> Operational rules. Numbers are placeholders ⚙. Incorporates the fixes from `PLAYTEST.md` (Bruges-open, Brewhouse advance-all, skim caps).

---

## 0. Setup (symmetric)

Each house starts with **3 `G`, 2 `H`**, **0 VP tokens**, the **Gruit baseline** (always brewable) **+ 2 random premium recipes in its book** (a random pair from the unlocked tiers), **1 open vessel** (cap 3), storage 8, and the printed Larder + Quay. Bruges route open; far routes closed. **Type frontier opens at Gruit→Hopped; the premium summit (L3–L5) is dealt in a variable order each game.** Kontor stack seeded with 2 public tiles. See `PLAYERBOARD.md`.

> **Recipes are a private book, brewed from the book (v0.3).** Gruit is the universal baseline; every *other* recipe is **collected from the Market display into your book** and carries its **own cost profile** (`n G · n H · n brew-steps`) — two recipes of the same type can cost differently. You **can't brew a type you hold no recipe for.** The Market's recipe supply is gated by the current **type frontier**, which advances as a type's market saturates (§5b · §A/A′ in `TILES.md`). *(Supersedes the claim-on-fire slot model.)*

---

## 1. The turn

> **Turn 1 only:** *place* your worker on any cell and activate one of its two lines (no move). The move-then-activate sequence below begins on turn 2.

On your turn, in order:

1. **Move** your worker to an **orthogonally adjacent** cell (A↔B, A↔C, B↔D, C↔D — never diagonal). Mandatory.
2. **Activate** the **row OR column** of your worker's cell.
3. **Resolve** that line's up-to-4 stops — **cap slot · cell · cell · cap slot** — in **any order**:
   - **Each cell:** take its public action if the cell is free or holds *your* worker; if a **rival** worker sits there, take your **tableau fallback** for that action instead.
   - **Each cap slot:** if it holds an owned tile, that tile fires its line action; the **owner** collects (the skim), whoever activated the line.

> Both cells on the line always fire. The worker's position only gates *which line is legal* and *which cells are blocked to you*.

---

## 2. The four cell actions

> **Build × cash-out grid.** The two *builders* (Market, Brewhouse) sit on one diagonal; the two *cash-outs* (Harbor, Kontor) on the other — they never share a line. Cell map: **A=Market · B=Harbor · C=Kontor · D=Brewhouse.** So every line is one builder + one cash-out, and each turn you ship for reach **or** enshrine for standing, never both.
>
> **Tableau twins:** the "fallback" for a blocked cell is your **private twin** (Market→Larder, Brewhouse→brew-room, Harbor→Quay), upgradable via rooms. A twin fires **only when a rival blocks the cell** — so a developed tableau makes stepping onto a crowded cell *desirable*. Kontor has no twin (open to all).

### A · Market
- Take **2 goods** (any mix `G`/`H`) from the supply, **OR** acquire **1 tile** from the face-up Market display, paying its cost in goods.
- Tile costs ⚙: recipe 1–2 · route/ship 2 · room 3 · (privileges come from London, §Harbor).
- **Routes and ships are placed into an empty perimeter slot** (commit it to that line's row XOR column). A **ship** also names the **route it will support** when placed. **Recipes are collected straight into your book** (not a slot, §0); rooms install directly to your tableau.
- **Twin (blocked): Larder** = +1 `G`; a **Larder** room bumps it to +2 `G`. (The public Market's tile-buying is its irreplaceable edge — the Larder is goods only.)

### D · Brewhouse
- **Advance ALL your brews 1 step** on the track, **and** optionally **LOAD** 1 recipe (paying its inputs) into an empty vessel.
- Brew lengths (LOAD→READY), by type level: **L1 Gruit 2 · L2 Hopped 3 · L3 3 · L4 4 · L5 5.** ⚙ (the tempo dial — gruit skips AGE; the L3–L5 summit names are dealt per game, `TILES.md` §A)
- More **vessels** (Extra Vessel rooms) = more brews advanced per fire = your throughput engine. **Start 1, cap 3.** A Ready cask occupies its vessel until shipped (back-pressure).
- **Room slots: 4 (scarce).** Extra Vessel is itself a room — so going wide on vessels costs depth elsewhere. This is the forced-commit squeeze (§13c).
- **Twin (blocked): brew-room** = advance all, no load; a **Faster Fermenter** room restores the load so the twin equals the public action.

### B · Harbor
- **Ship 1 READY cask** to a route the cask's quality qualifies for. You gain **1 presence** on that route (reach) **and mint VP tokens for the sale** (the cask's type value on the value track, §6). The cask itself becomes **cargo:**
  - **If a ship supporting that route has room, the cask loads aboard it** (preferred). If it's a **rival's** ship, that owner collects a **+1 `G` toll** for the carriage. When a ship is **full it sails** — its cargo is delivered (already counted as each shipper's presence) and the **owner** takes a sail dividend (+1 presence on the route, +1 `G`); the ship leaves its slot (transient).
  - **If no ship has room on the route, it's a basic shipment** — you still place your 1 presence; the cask is simply delivered. (Ships are a **booster**, not a gate.)
- **Ships** (§A) are route-bound containers placed in a slot. **A ship's own line-action is to load:** when its cap fires, it pulls one of the **owner's** ready, route-eligible casks aboard (owner +1 presence), sailing when full. So a ship is owned infrastructure that profits from *all* traffic on its route — the toll-baron play.
- **Routes:** **Bruges is open from the start.** Bergen / London / Novgorod open only once a Route Lane tile for them sits in a slot. **Presence is clamped to each route's capacity**, which is **player-scaled** ⚙: `base {Bruges 2 · London 1 · Bergen 0 · Novgorod 2} + player count` (so 2p → `{4, 3, 2, 4}`, 4p → `{6, 5, 4, 6}`). Filling routes fires the reach end-clock (2-of-4 cities, §5). *(v0.3 — supersedes the old fixed 8/6/5/9 caps, which paced 2p far too slowly.)*
- **London delivery** grants a **Privilege tile** (its route payout).
- **Twin (blocked): Quay** = ship a ready cask to **Bruges only** (loading a Bruges ship if one has room, else a basic shipment); a **Quay** room lets it ship to any open qualifying route.

### C · Kontor
- Choose one: **use the current top-of-stack action**, **or ENSHRINE a Ready cask straight from your brewery** to the **top of the stack** (standing face). You bank its standing; its goal goes live; it sets the new top action.
  - You bank its standing, **mint VP tokens for the enshrinement** (its type value on the value track, §6), set its goal live, and set the new top action.
  - This is the **reach-vs-standing fork made physical:** a Ready cask either **ships** (becomes reach — cargo/presence) **or enshrines** (becomes standing). It is never both. *(Casks no longer live as standalone working slot tiles; reach now flows through ships, so enshrining is from the brewery, not from a slot.)*
  - *(v0.2 balance: direct-from-Ready enshrine was added because the old brew→ship→enshrine chain made standing far too slow — a 3p sim produced **zero** enshrinements in 10 turns.)*
- Enshrining is bundled by geometry with an **acquire** (left column, Market+Kontor) or a **brew** (bottom row, Brewhouse+Kontor).
- **Occupancy:** the Kontor is **not** tolled or blocked to a fallback — anyone may fire a Kontor line; the top action / enshrine is available to whoever runs it. ❓ (revisit if it needs contention)

---

## 3. Goods, storage & skims

- `G` grain and `H` hops are the only currency. Spent on tiles, brewing inputs, tolls.
- **Storage cap:** ⚙ ~8 goods, raised by **Warehouse**. Caps the skim-runaway risk (PLAYTEST F5).
- **Skims kept tiny** (typically +1 good or a non-goods nudge) for the same reason. The rich-get-richer dial.
- **VP tokens** are a **spendable 3rd resource** (v0.3), minted on a sale (ship or enshrine) scaled by the type's value-track position. Spend for tempo/power (sinks ⚙) **or** bank as **1 VP each** at end (§6). They modify value; they never replace printed cask VP. Not subject to the storage cap. ⚙

---

## 4. Round & turn order

- Play proceeds in **seating order**; one **turn each = one round**.
- **First-player marker** passes clockwise each round.
- Single era for v1 (era arc deferred, §14).

---

## 5. End-game trigger

The game enters its **final round** the moment **2 of the 4 kontor cities are saturated** — a city is saturated when its route's presence spaces are full (player-scaled capacities ⚙, §2 Harbor: `base {Bruges 2 · London 1 · Bergen 0 · Novgorod 2} + player count`). This is the **visible, player-steerable clock**: reach players race to slam a second city full and **end it**; standing players, wanting more turns to enshrine, **deliver to the empty cities** to keep both from filling. Finish the current round so all players have equal turns, then score.

*(v0.3 — supersedes the v0.1 twin clocks: Kontor-stack-N and single-route-full.)*

### 5b. Type frontier (the value/era clock)

Separately, the **type frontier** advances as a type's market **saturates** — once **⚙ N casks of the current frontier type have been sold league-wide** (shipped + enshrined), that type's value-track marker ticks **down** and the **next premium tier unlocks** (its recipes enter the Market). One causal loop: production drops value *and* opens the summit. This is not an end-game trigger — it paces the value economy through the game.

## 6. Scoring sequence (end-game)

1. **Reach / Destination:** for each route, **your presence × that route's slotted value.**
2. **Majorities:** route-majority bonuses at each kontor (most presence; tie = shared/split ⚙).
3. **Standing:** sum of your enshrined casks' printed standing values.
4. **Goals:** resolve each enshrined cask's goal against final state (the goal-matching layer).
5. **VP tokens:** **+1 VP per banked token.** Tokens are minted at each **sale** (ship or enshrine) scaled by that type's position on the **value track** at that moment — the variable-value layer, **captured live and locked in metal**, but tallied here (or spent mid-game instead, §3). *Cask tiles keep their printed VP; tokens are a modifier on top, never a replacement.*
6. **Tiebreak:** most goods, then most casks in transit (loaded as cargo in ships).

> Reach (1–2) and Standing (3–4) are **separate accumulations** that never convert — the two real win conditions. VP tokens (5) are minted by **both** paths (every sale), so the variable-value race rewards either archetype. Limited slots, vessels, and turns force the lean between them (§13 option c).

---

## Open / to tune

- Brew lengths & vessel count — the master tempo dials.
- **End trigger:** does **2-of-4 cities** fire too early/late at different player counts; route capacities.
- **Type frontier (§5b):** the saturation threshold N that flips a tier — paces the whole value economy.
- **Value track:** length & step size; **VP-token yield curve** per type/value position; the 1–2 token **spend sinks**.
- Whether the Kontor needs contention (currently open to all).
- Skim values & storage cap (the runaway dial).
- Compensation for the depth path's tempo cost (goal bonuses g3/g4 vs volume).
