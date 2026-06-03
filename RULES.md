# Brewhouse of the Hanse — Turn & Round Economy (v0.5)

> Operational rules. Numbers are placeholders ⚙. v0.5 rebuilds the core loop around the **dual-role cask tile** and the **demand market** (`DESIGN.md` §19, 2026-06-03). Supersedes the v0.3/v0.4 ship-cargo + VP-token framing where they conflict.

---

## 0. Setup (symmetric)

Each house starts with **3 `G`, 2 `H`**, the **Gruit baseline** (always brewable) **+ 2 random premium recipes in its book**, **1 open vessel** (cap 3), **3 personal slots** (empty), storage 8, and the printed Larder + Quay twins. Bruges route open; far routes closed. **Type frontier opens at Hopped; the premium summit (L3–L5) is dealt in a variable order each game.** Set each type's marker to its starting **market value**. See `PLAYERBOARD.md`.

> **Recipes are a private book.** Gruit is the universal baseline; every *other* recipe is **collected from the Market into your book** and carries its own cost profile (`n G · n H · n brew-steps`). You **can't brew a type you hold no recipe for.** The Market's recipe supply is gated by the current **type frontier**.

---

## 1. The turn

> **Turn 1 only:** *place* your worker on any cell and activate one of its two lines (no move). Move-then-activate begins on turn 2.

On your turn, in order:

1. **Move** your worker to an **orthogonally adjacent** cell (A↔B, A↔C, B↔D, C↔D — never diagonal). Mandatory.
2. **Activate** the **row OR column** of your worker's cell.
3. **Resolve** that line's up-to-4 stops — **cap slot · cell · cell · cap slot** — in **any order**:
   - **Each cell:** take its public action if free or holding *your* worker; if a **rival** worker sits there, take your **tableau twin** instead.
   - **Each cap slot:** the owned tile in it fires its line action (skim to the owner / paid lever for the active player — §3).

> Both cells on the line always fire. The worker's position only gates *which line is legal* and *which cells are blocked to you*.

---

## 2. The cask's three states (the spine)

A brewed cask, once **Ready** in a vessel, lives in exactly one of three states. This is the whole game in one object:

- **Working** — installed in one of your scarce **personal slots**. Private, uncontested. It **soups up a station**: its action is added to that station when you use it (and is your fallback there when a rival blocks the cell). Scores nothing on its own. Pull it out later to deploy or enshrine.
- **Reach** — **deployed into a shared perimeter slot**, bound to a route it quality-qualifies for. **The cask *is* your presence** on that route (= reach) while it sits there, and it yields a **line action** when its line fires. It is exposed — any player may enshrine it.
- **Standing** — **enshrined**: pulled off the board to the standing stack; the owner banks the type's current **market value** on their standing track. The cask's board presence is gone — **reach and standing never co-exist on one cask; enshrining converts it.**

---

## 3. The four cell actions

> **Build × cash-out grid.** Builders (Market, Brewhouse) sit on one diagonal; cash-outs (Harbor, Hall) on the other. Cell map: **A=Market · B=Harbor · C=Hall · D=Brewhouse.** Every line is one builder + one cash-out — and **builders pump the market up, cash-outs realize value and pull it down.**
>
> **Tableau twins:** the fallback for a rival-blocked cell is your private twin (Market→Larder, Brewhouse→brew-room, Harbor→Quay), upgradable via rooms and your installed **working casks**. The Hall has no twin.

### A · Market *(builder)*
- Take **2 goods** (any mix), **OR** acquire **1 tile** from the face-up display, paying its goods cost.
- **Recipes** go straight into your **book** — and **buying a recipe raises that type's market value +1** (investment stokes demand). **Route lanes, ships, and Fair tiles** go into an empty perimeter slot; **rooms** install on your tableau. Tile costs ⚙: recipe 1–2 · lane/ship/Fair 2 · room 3.
- **Twin (blocked): Larder** = +1 `G` (Larder room → +2 `G`).

### D · Brewhouse *(builder)*
- **Advance ALL your brews 1 step**, **and** optionally **LOAD** 1 recipe from your book (paying inputs) into an empty vessel.
- Brew lengths (LOAD→READY), by level: **L1 Gruit 2 · L2 Hopped 3 · L3 3 · L4 4 · L5 5** ⚙ (gruit skips AGE; L3–L5 summit names dealt per game).
- More **vessels** = more throughput. **Start 1, cap 3.** A Ready cask occupies its vessel until you move it to a personal slot, deploy it, or enshrine it (back-pressure).
- **Twin (blocked): brew-room** = advance all, no load (Faster Fermenter room restores the load).

### B · Harbor *(cash-out — REACH)*
- **Deploy 1 Ready cask** into an **empty perimeter slot**, bound to a route the cask's quality qualifies for. You gain **1 presence** on that route (reach), and **that type's market value drops −1** (you've put stock on the shelf).
- While deployed, the cask **fires a line action** when its line runs (whoever runs it — §4), and it **counts as your presence** for route value & majorities until it is enshrined.
- **Routes:** **Bruges open from start.** Bergen / London / Novgorod open only once a **Route Lane** tile for them sits in a slot. Presence is clamped to each route's **player-scaled** capacity ⚙: `base {Bruges 2 · London 1 · Bergen 0 · Novgorod 2} + player count`.
- **Twin (blocked): Quay** = deploy a ready cask to **Bruges only** (Quay room → any open qualifying route).

### C · Hall *(cash-out — STANDING)*
- **Enshrine one cask** — either a Ready cask from your brewery **or a deployed cask sitting in *any* shared slot** (yours or a rival's). The cask goes to the standing stack; **its owner** advances their **standing track by that type's current market value**, the cask's **goal flips face-up** in the owner's row, and that type's market value drops **−1**.
- **Any player may enshrine any deployed cask.** Doing so frees the slot for you and pays the owner standing — but **caps what the owner was holding out for**. This is the positive-interaction / transience engine: nobody hoards a slot forever, and nobody gets attacked.
- The Hall has **no twin** and is never blocked — anyone running a Hall line may enshrine.
- *(Self-enshrine when the market favors your type; force a rival's cask down when you want the slot or want to cap their upside.)*

---

## 4. Slot tiles & the demand market

The **8 shared perimeter slots** hold a churning mix — **deployed casks** (reach + actions, enshrine-able), **Fair tiles**, **route lanes**, and **ships** (resource faucets). Casks are the transient flow (enshrined off); infrastructure is sticky.

- **Casks → fire an ACTION** when their line runs (advance a brew, +1 presence, pump a type ⚙ — kept simple, resolved for the active player). **Ships & lanes → fire RESOURCES** (a small `G`/`H` skim to the **owner**, whoever runs the line). The split gives the two families distinct identities.
- **The Fair tile → the paid market lever.** A Fair's line action lets the **active player pay 1 `G` to raise one type's market value +1**; the **fee goes to the Fair's owner** (the owner pays the supply when self-using — never free). Because pumping is a *line* action, placement matters: a Fair on a Hall line lets you **pay → pump → enshrine high in one activation** (pump-and-dump) before rivals react.

### The market (one shared value track per type)
- A cask's **enshrine payout = its type's market value at that instant** (banked on the owner's standing track). This single number replaces the old printed-standing + VP-token split.
- **DOWN −1:** each time a type is realized — **deployed (reach) OR enshrined (standing)**. So volume floods erode the prestige payout: every turn you leave a cask out reaching, others selling your type may be bleeding its value down.
- **UP +1:** **buying a recipe** of a type (auto), or a **Fair** pump (paid). A new tier **enters high** (frontier unlock), then erodes.
- **Guardrail ⚙:** a pump (+1) is never larger than a realize-drop (−1), and the track has a floor & ceiling, so the market can't be farmed into inflation.

---

## 5. Goods & storage

- `G` grain and `H` hops are the only currency — tiles, brew inputs, tolls, Fair pumps. Storage cap **8 ⚙** (Warehouse +4). Skims kept tiny. Standing is **never** spent.

---

## 6. Round & turn order

- Seating order; one **turn each = one round**. **First-player marker** passes clockwise each round. Single era for v1.

---

## 7. End of the game

The game enters its **final round** the moment **2 of the 4 kontor cities are saturated** — a route is saturated when its presence (deployed casks) fills its capacity. Reach players race to slam a second city full and **end it**; standing players **enshrine casks back off the routes** to keep them from filling and buy more turns. Finish the round so all have equal turns, then score. ⚙ *(under review for the deploy-then-enshrine model — enshrining a deployed cask now un-saturates a route.)*

### 7b. Type frontier (the value/era clock)
The **type frontier** advances as a type saturates — once ⚙ N realizations of the current frontier type have happened league-wide, the **next premium tier unlocks** (its recipes enter the Market). Paces the value economy; not an end trigger.

---

## 8. Scoring (end-game)

1. **Reach:** for each route, **your presence (deployed casks) × that route's slotted value.**
2. **Majorities:** route-majority bonus at each kontor (most presence; tie split ⚙).
3. **Standing:** your **standing track** total (sum of market values banked at enshrine).
4. **Goals:** resolve your enshrined casks' face-up goals against final state — **best 3 score** (the cycled pool, `TILES.md`).
5. **Tiebreak:** most goods, then most deployed casks.

> **Reach** (1–2) and **Standing** (3) are separate accumulations that never convert — but the **market couples them**: realizing a type either way pulls its value down, so the volume crowd erodes the prestige crowd's payout. The lean between them is a *timing* decision, not a silo.

---

## Open / to tune

- Market step sizes, floor/ceiling, Fair cost (the variable-value dials).
- Personal-slot count (3?) and how strong a working cask's station boost is.
- Cost / action-economy of enshrining a *rival's* deployed cask (watch eviction-timing kingmaking).
- Whether ships stay as faucets or fold into lanes.
- End trigger under the deploy-then-enshrine reach model (§7).
- Brew lengths, vessel cap, route capacities — the tempo dials.
