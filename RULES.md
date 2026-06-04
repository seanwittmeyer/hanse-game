# Brewhouse of the Hanse — Turn & Round Economy (v0.6)

> Operational rules. Numbers are placeholders ⚙. v0.6 keeps the spine (**dual-role cask · demand market · 2×2 build×cash-out grid · reach vs standing as timing**) and rebuilds the player board and the **reach** engine: the **Brewhouse Floor** (4 multi-use slots), recipes as **dual-use cards**, **ships as single-use carriers**, and the **Sailed-Ships clock** as the end trigger (`DESIGN.md` §20, 2026-06-04). Supersedes v0.5 where they conflict.

---

## 0. Setup (symmetric)

Each house starts with **3 `G`, 2 `H`**, the **Gruit baseline** (printed on the board, always brewable) **+ 2 random premium recipe cards**, **1 open vessel** (cap 3), an empty **4-slot Brewhouse Floor**, storage 8, and the printed Larder / Brew-room / Quay twins. Bruges route open; far routes closed. **Type frontier opens at Hopped; the premium summit (L3–L5) is dealt in a variable order each game.** Set each type's marker to its starting **market value**. See `PLAYERBOARD.md`.

> **Recipes are dual-use cards.** Gruit is the universal baseline; every *other* recipe is a **card collected from the Market** (its on-collect boon fires once, then it **tucks under the board's bottom edge** showing only its permanent **brew strip** — type + cost profile `n G · n H · n steps`). Your fanned row of strips **is** your recipe book; you brew from any tucked strip forever. You **can't brew a type you hold no strip for.** Soft cap = **6 tuck guides** (a 7th forces a discard). The Market's recipe supply is gated by the current **type frontier**. See §3·A.

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

- **Working** — **installed into an open Brewhouse Floor slot**, and **assigned to a station (Market / Brewhouse / Harbor) when you install it**. Installing a Ready cask as working is **free, but needs an open Floor slot.** If the Floor is full (4 slots, shared with rooms), the Ready cask **clogs its vessel** until you free a slot or move the cask out — so Floor scarcity and brewing back-pressure are *one* tension. Private, uncontested. It **soups up that station**: its `work` action fires whenever you use the station — or its **twin** when a rival blocks the cell (at the **Brewhouse** the boost is a flat **+2 to the advance pool**). Scores nothing on its own. Pull it out later to deploy or enshrine.
- **Reach** — **made presence in a shared slot** — either **deployed** at the Harbor (Bruges only without a Quay room) or **delivered by a ship** when it sails to its destination kontor. **The cask *is* your presence** on that route (= reach) while it sits there, and a deployed cask yields a **line action** when its line fires. It is exposed — any player may enshrine it. *(Ownership in a shared slot is shown by your colored disc.)*
- **Standing** — **enshrined**: pulled off the board to the standing stack; the owner banks the type's current **market value** on their standing track. The cask's board presence is gone — **reach and standing never co-exist on one cask; enshrining converts it.**

---

## 3. The four cell actions

> **Build × cash-out grid.** Builders (Market, Brewhouse) sit on one diagonal; cash-outs (Harbor, Hall) on the other. Cell map: **A=Market · B=Harbor · C=Hall · D=Brewhouse.** Every line is one builder + one cash-out — and **builders pump the market up, cash-outs realize value and pull it down.**
>
> **Tableau twins:** the fallback for a rival-blocked cell is your private twin (Market→Larder, Brewhouse→brew-room, Harbor→Quay), upgradable via rooms and your installed **working casks**. The Hall has no twin.

### A · Market *(builder)*
- Take **2 goods** (any mix), **OR** acquire **1 tile/card** from the face-up display, paying its goods cost.
- **Recipe cards** are collected here (their only acquisition point). On collect, the card **fires a one-time boon** (below), then **tucks under the board's bottom edge** as a permanent brew strip; and **collecting a recipe raises that type's market value +1** (investment stokes demand, respecting the `pump ≤ drop` guardrail). **Route lanes, ships, and Fair tiles** go into an empty perimeter slot; **rooms** install on your Floor. Tile costs ⚙: recipe 1–2 · lane/ship/Fair 2 · room 3.
- **Recipe acquisition boons (one-time, on collect — ≈ a free action, scaling by tier) ⚙:**
  - **L2 Hopped — *Stocked Pantry:*** +2 `G` 2 `H`.
  - **L3 — *Brewmaster's Push:*** advance 3 across your vessels (a free Brewhouse).
  - **L4 — *Grand Market:*** take 2 goods **and** buy one slot tile (lane / ship / Fair / room) at **−1**.
  - **L5 — *Master's Privilege:*** **choose one** — advance 3 / +2 `G` 2 `H` / a free Market / a free Harbor deploy of a Ready cask.
  - *Guardrail:* boons grant **resources / tempo / small presence only — never standing or raw VP** (only L5 offers a single *reach* assist), so the cash-out cells keep their job.
- **Soft cap = 6 tuck guides.** Collecting a 7th forces you to **discard a strip** (lose that brewable type) — softened, because you already banked the boon.
- *(Founding-style hook ⚙: your first/bottom strip is your founding style; one optional Goal rewards casks of that type.)*
- **Twin (blocked): Larder** = +1 `G` (Larder room → +2 `G`).

### D · Brewhouse *(builder)*
- **Passive aging:** at the start of your turn, **all your brews advance 1 step automatically** ⚙ — beer ages over time, so brewing no longer depends on reaching this cell.
- **The action:** gain a **pool of 3 advance points** ⚙ and **allocate them freely across your vessels** (pour them all into one cask or spread them), **and** optionally **LOAD** 1 recipe from one of your tucked brew strips (paying inputs) into an empty vessel. Each **working cask installed at the Brewhouse adds +2** to the pool ⚙.
- Brew lengths (LOAD→READY), by level: **L1 Gruit 2 · L2 Hopped 3 · L3 3 · L4 4 · L5 4** ⚙ (gruit skips AGE; L3–L5 summit names dealt per game). **Age dwell** is counted by one **aging cube**: Gruit skip · L2/L3 1 · L4 2 · L5 3.
- More **vessels** = more throughput. **Start 1, cap 3** — but **Extra Vessel is a Room that consumes a Floor slot** (running 3 vessels spends 2 of your 4 Floor slots). A Ready cask occupies its vessel until you install it as working (needs an open Floor slot — else it **clogs**), deploy/load it, or enshrine it (back-pressure).
- **Twin (blocked): brew-room** = a smaller built-in pool of **2** advance points, no load (Faster Fermenter room gives the full pool + load).

### B · Harbor *(cash-out — REACH)*
- The Harbor offers **one** of: **direct-deploy**, **launch a partial ship**, or the **dockwork** fallback.
- **Direct-deploy 1 Ready cask** into an **empty perimeter slot at Bruges** — **Bruges only** without a **Quay room** (the Quay room upgrades direct-deploy to **any** open qualifying route). London / Bergen / Novgorod presence otherwise comes **only through a ship** (see §4). You gain **1 presence** on the route (reach, marked by your disc), and **that type's market value drops −1** (the realize −1 fires when the cask becomes presence — on deploy or on sail).
- **Launch a partial ship** (relief valve): cast off one of *your* ships before it is full — its aboard casks deliver as presence now, you bank the destination bonus, and the ship moves to the Sailed-Ships track (§4).
- While in a shared slot, a deployed cask **fires a line action** when its line runs (whoever runs it — §4), and it **counts as your presence** for route value & majorities until it is enshrined.
- **Routes:** **Bruges open from start.** Bergen / London / Novgorod open only once a **Route Lane** tile for them sits in a slot. Presence is clamped to each route's **player-scaled** capacity ⚙: `base {Bruges 2 · London 1 · Bergen 0 · Novgorod 2} + player count` — route caps only **clamp presence and settle majorities** now (no longer an end trigger, §7).
- **Twin (blocked): Quay** = direct-deploy a ready cask to **Bruges only** (Quay room → any open qualifying route).
- **Weak alternate — *dockwork* (no deploy/load):** +1 good, **or** +1 to one open route's value.

### C · Hall *(cash-out — STANDING)*
- **Enshrine one cask** — either a Ready cask from your brewery **or a deployed cask sitting in *any* shared slot** (yours or a rival's). The cask goes to the standing stack; **its owner** advances their **standing track by that type's current market value**, the cask's **goal flips face-up** in the owner's row, and that type's market value drops **−1**.
- **Any player may enshrine any deployed cask.** Doing so frees the slot for you and pays the owner standing — but **caps what the owner was holding out for**. This is the positive-interaction / transience engine: nobody hoards a slot forever, and nobody gets attacked.
- The Hall has **no twin** and is never blocked — anyone running a Hall line may enshrine.
- **Weak alternate — *petition* (no enshrine):** +1 **flat** standing, **or** peek/swap one of your face-up goals.
- *(Self-enshrine when the market favors your type; force a rival's cask down when you want the slot or want to cap their upside.)*

---

## 4. Slot tiles & the demand market

The **8 shared perimeter slots** hold a churning mix — **deployed casks** (reach + actions, enshrine-able), **Fair tiles**, **route lanes**, and **ships** (single-use carriers). Casks are the transient flow (enshrined off); infrastructure is sticky; a ship is a *consumable* (it sails away).

- **Casks → fire an ACTION** when their line runs (advance a brew, +1 presence, pump a type ⚙ — kept simple, resolved for the active player). **Lanes → fire a per-kontor skim** to the **owner** (whoever runs the line — differentiated, below). **Ships → fire a LOAD** (below). The split gives the families distinct identities.
- **The Fair tile → the paid market lever.** A Fair's line action lets the **active player pay 1 `G` to raise one type's market value +1**; the **fee goes to the Fair's owner** (the owner pays the supply when self-using — never free). Because pumping is a *line* action, placement matters: a Fair on a Hall line lets you **pay → pump → enshrine high in one activation** (pump-and-dump) before rivals react.

### Ships — single-use carriers (load → fill → sail)
- **Build** (Market): a ship goes in a perimeter slot, **assigned to a destination kontor**, with capacity **Cog 2 / Hulk 3**, inheriting that route's **quality gate**.
- **Load** (when the ship's line fires — by *anyone*): the active player may put one **Ready** cask that meets the gate aboard. The **loader takes a small benefit**; the **owner skims a good** (toll-baron, like a Fair). *(The realize −1 happens later, when the cask becomes presence on sail.)*
- **Sail** (automatic when **full**): every cask aboard **drops as presence (reach)** at the destination, the **owner banks a per-kontor destination bonus**, and the **ship tile moves to the shared Sailed-Ships track** — it is **consumed** (single-use; build a new ship to ship again). Each voyage = one Sailed-Ships slot = the game clock (§7). The owner may **launch a partial ship early via a Harbor action** (§3·B).
- **Destination bonuses (owner, on delivery) ⚙:** **Bruges** +2 `G` · **London** a Privilege · **Bergen** a monopoly toll / majority help · **Novgorod** the biggest (a presence / standing kicker).
- **Ships are the way to reach the far kontore.** Harbor direct-deploy reaches **Bruges only** (Quay room → any open route); London / Bergen / Novgorod presence comes through a ship. This is the **merchant** reach engine (routes + ships), mirroring the **standing** engine (rooms + summit brewing).

### Route lanes — differentiated skims ⚙
A lane still raises its route's end value **and** fires a skim, but the skim is **per-kontor and authorial**, not a flat +1 `G`:
- **Bruges:** +1 `G` (liquidity) · **Bergen:** a toll (a rival who delivers/loads to Bergen pays the lane owner a good) · **London:** advance/draw on the **Privilege** track · **Novgorod:** +1 `H` or advance a brew a step.

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

Two clocks race; **whichever fires first → finish the round** (so all have equal turns) **→ score.** There is **no turn limit**, and **city saturation is no longer an end trigger** (route caps remain only to clamp presence and settle majorities).

- **Primary — the Sailed-Ships track fills.** Each voyage adds one ship to the **shared, visible Sailed-Ships track**; when the track is full the end is triggered. It is **self-accelerating** — the more the table ships, the sooner it ends (a Hulk's 3-presence burst is still just one slot). Slot count is the master length dial: **~6 / 8 / 10 / 12 for 2 / 3 / 4 / 5p ⚙.**
- **Backup — N casks enshrined total** (player-scaled ⚙). Any enshrine (by anyone) advances it, so it can't deadlock; with only 4 Floor slots (and vessels that clog), players are forced to cash out — **one clock always moves.**

*(Optional flourish ⚙: milestone slots on the Sailed-Ships track advance the type frontier / refill the Market, tying shipping tempo to the market boom.)*

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

- **Sailed-Ships slot counts** (~6 / 8 / 10 / 12) and the **N-enshrined backstop** number (player-scaled) — the two end-clock dials (§7).
- **Ship build cost** vs single-use payoff; **destination-bonus magnitudes** (Bruges / London / Bergen / Novgorod).
- How hard the **6-card recipe soft cap** should bite, and recipe-card **costs / boon sizes** (the variable-value dials, with the `pump ≤ drop` guardrail).
- Whether the **realize −1** fires **per cask** on a multi-cask sail, or once per voyage.
- Floor pressure: how strong a **working cask's station boost** is, and whether a Ready cask **clogging its vessel** is too punishing.
- Cost / action-economy of enshrining a *rival's* deployed cask (watch eviction-timing kingmaking).
- Market step sizes, floor/ceiling, Fair cost; brew lengths, vessel cap, route capacities — the tempo dials.
- The optional **Sailed-Ships milestone flourish** (frontier advance / Market refill on milestone slots).
