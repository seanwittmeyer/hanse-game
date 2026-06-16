# Brewhouses of the Hanse — Turn & Round Economy (v0.16 — "Full Ships")

> Operational rules. Numbers are placeholders ⚙. **v0.7 is a ground-up reel-in to *Great Western Trail / Distilled* weight.** It keeps what was loved — the shared 2×2 of stations ringed by slots, the dual-role cask, the merchant-shipping fantasy, and the theme — and sheds about half the rules. The whole game now happens at **the Wharf**: four stations (Market · Brewhouse · Cellar · Harbor) ringed by 8 slots, where the work runs **Source → Brew → Age → Ship.** A brewed cask matures privately, then sits on a shared **slot** as a public **action-building** *and* your cargo-in-waiting, then **ships to a destination** for points and leaves. The two old value tracks (reach/standing) are gone — **the volume-vs-prestige lean now lives in *where you ship*.** Supersedes v0.6 (`DESIGN.md` §21, 2026-06-05).

---

## 0. Setup (symmetric)

Each house starts with:
- **3 `G` (grain), 2 `H` (hops)** — plus **seat compensation: +1 `G` for every seat after the first** ⚙ (so seats P1…P5 start with 3/4/4/4/4 `G`). Turn order is fixed, which gives the first player a small structural edge; the free opening placement plus this +1 `G` neutralize it (sim-validated: it flattens the first-player win-rate at 2–3p essentially to fair). Storage cap 8 ⚙.
- The **Gruit** and **Hopped** recipes (the on-ramp — fixed, symmetric, so everyone can brew immediately and *gaining an export recipe means more*). More recipes are acquired at the Market.
- **2 open vessels** (the brewing throughput; cap 3 ⚙ — one Extra Vessel upgrade).
- **2 charter contracts** ⚙ (the scarce certificates that let you Charter — §5; buy more at the Market for `1 G`).
- A **warm start so the Wharf is live on turn 1:** **a guaranteed Hulk → Bruges plus one more ship** ⚙ dealt from the **ship deck** onto slots (§5 — so the Gruit on-ramp always has a hull; a **ship market of 3** ⚙ sits face-up beside the Market), and **one Ready Gruit in a vessel** per player (deploy it to a slot on turn 1) ⚙ — no starting cask sits on the shared slots. First voyage is reachable by turn 2–3, not turn 6.
- An empty **brewery board** (vessels + upgrade slots — see `COMPONENTS.md` §4).

The shared board is seeded so the ring is **alive from turn 1:** all four **destinations are open**, and **2–3 neutral buildings** ⚙ plus the **two warm-start ships** are placed in perimeter slots **spread across different lines** (no single line is stacked with the shared tiles ⚙) so there is no obvious opening camp — every direction is worth something on turn 1. **Deal 3 of the 4 export beers** into play this game. Each beer carries a **fixed quality** — **Broyhan** and **Keut** are Q3, **Mumme** is Q4, **Bock** is Q5 — so dropping one varies the *ladder shape*: drop a Q3 beer → the full Q3→Q4→Q5 climb; drop **Mumme** → no Q4 tier; drop **Bock** → no Q5 tier (the variable export tier). **Shuffle all Upgrade tiles into a face-down Upgrade deck and deal 4 ⚙ face-up beside it (randomly placed) — the Upgrade display; the deck stays face-down as a 5th stack and refills the display as tiles are taken (§3).** Set the **Sailed-Ships track** to its player-scaled length. Each player places a worker on any station — **opening placement is free** (no occupancy toll, §1). **Choose a first player — fixed for the whole game** (turn order does not rotate ⚙; the free opening placement **and the +1 `G` per later seat** above are the seat balancers).

> **What's gone from v0.6** (the reel-in): the demand-market value track, the type frontier, Fairs, route-lane tiles, the Hall as an action station, the working-cask Floor state, the fires-when-blocked tableau twins, differentiated lane skims, recipe on-collect boons / the 6-card tuck, and aging cubes. **Casks are no longer presence while they sit; presence/standing happens at *delivery*.** Stations are never closed (no twins; the only station cost is a small occupancy toll, §1) — interaction lives on the slots and the loaded casks.

---

## 1. The Wharf — stations & slots (the spine)

The four action stations sit in a 2×2 ringed by 8 slots — together, **the Wharf**. The production order is Source → Brew → Age → Ship, but you move where the board is best, not simply round a circle:

```
        A ── B            A  Market   (Source)  → B  Brewhouse (Brew)
        │    │            │                        │
        C ── D            C  Harbor   (Ship)   ←  D  Cellar    (Age)

  Production order A→B→D→C  =  Source → Brew → Age → Ship   (you needn't follow it in a circle)
  (orthogonal moves only — never the diagonal)
```

- **A · Market** — *Source:* gain goods, or acquire a recipe / ship / upgrade.
- **B · Brewhouse** — *Brew:* turn a recipe + goods into a young cask in a vessel.
- **D · Cellar** — *Age:* mature your casks toward Ready.
- **C · Harbor** — *Ship:* load your Ready casks onto the shared ships; they deliver when full.

**A line** (a row or a column) is its **two stations plus any tiles in their two slots**; every activation is a useful two-step segment:
`rowT = Market+Brewhouse` · `colR = Brewhouse+Cellar` · `rowB = Harbor+Cellar` · `colL = Market+Harbor`.

### The turn

> **Turn 1 only:** *place* your worker on any station (free — no occupancy toll) and activate one of its two lines (no move).

1. **Move** your worker to an **orthogonally adjacent** station (A↔B, A↔C, B↔D, C↔D — never diagonal). Mandatory from turn 2. **If you move onto a station a rival already occupies, pay 1 `G`** ⚙ to the supply — the **occupancy toll** (a gentle nudge to spread out; capped at what you hold, never blocks; opening placement is free).
2. **Activate** the **row OR column** of your worker's station.
3. **Resolve** that line's up-to-4 stops — **slot · station · station · slot** — in **any order you choose:**
   - **Each station:** take its action (below). **Stations are never closed** — a rival never stops you using one (you only pay the occupancy toll above for *moving onto* it; no twins). Interaction lives on the slots and the loaded casks.
   - **Each slot:** if it holds a building (a deployed cask, a ship, or a neutral building), you **may use its action** — see §4.

> **Both stations on the line always fire; the worker only gates *which line is legal*.** Because base actions are always available and the cask/ship actions only *add*, you are never stalled waiting for the board to align — a populated Wharf **accelerates** your turns.

---

## 2. The cask — its three states (the spine in one object)

A cask carries a **type** (a quality rung Q1–Q5, printed) and one **signature action** (by type). It lives in exactly one of three states — the dual-role tile restored and made fun:

1. **Maturing** *(private, in a vessel).* Brewed at step 0; it ages toward **Ready** (passive +1 each of your turns, plus the Cellar action). Higher types take longer. Scores nothing.
2. **On a slot** *(public).* The instant a cask is Ready you **deploy it** to an open slot you choose (free). Now it is three things at once — your **cargo-in-waiting**, your private inventory, **and a public action-building**: whenever its line fires, the active player (you *or* a rival) may take its **signature action**. It scores nothing yet. *(If no slot is open, the Ready cask **clogs its vessel** until you free one or ship something — the back-pressure that keeps you moving.)*
3. **Delivered** *(scored, gone).* Loaded onto a ship and **shipped to a destination** (§5). It scores there for its owner and leaves the board — the transient churn. A cask is only ever one state; shipping converts it.

> **You only "lose control" of a cask once it's on a slot — the public commons.** Your brewery (maturing casks, recipes, upgrades) is private and untouchable. The slots are where rivals can act on, and even ship, your casks (§4, §5). That single boundary bounds the interaction.

---

## 3. The four stations (the actions)

Every base action **always works**; slot buildings only add bonus copies of these actions (§4).

### A · Market — *Source*
Take **2 goods** (any mix), **OR** acquire **one** tile, paying its goods cost ⚙:
- a **recipe** (a new brewable type — your climb to the export tier; export recipes cost more) — *always-available supply*,
- a **commission** (pay `2 G`, place one of the **3 face-up ships** — neutral hulls, destination printed — on any open slot, and free-load one Ready cask aboard; §5),
- a **charter contract** (pay `1 G` ⚙ — the scarce certificate spent to Charter; §5).

*(Upgrades are **not** acquired here — they're earned only by delivering to London / Novgorod, §6. The face-up Upgrade display sits at the Market for reference, but you can't buy from it.)*

> **The Market display.** Recipes and ships are always in stock (you can always buy a build option). **Upgrades, by contrast, sit in a small face-up display** — a row of **4 ⚙** tiles dealt (randomly placed) from a shuffled **Upgrade deck that sits face-down beside them as a 5th stack**; when one is taken the row **refills** from the top of the deck. **Upgrades are *not for sale* (v0.12.3) — they're earned only by delivering to London / Novgorod** (§5), which lets the owner take one face-up tile free. So the Upgrade you can grab depends on **what's currently face-up** *and* on your reaching those two kontore — the contested "what's in store" tension, now firmly tied to shipping. *(Removing the goods-buy makes London/Novgorod the essential engine route — and the data: buying was only ~5–8% of upgrades, dominated by chartering-to-earn, so cutting it simplifies without losing a real path.)*

### B · Brewhouse — *Brew*
**Load** one recipe you hold (paying its `G/H` cost) into an **open vessel** — a young cask at step 0. (Recipes are permanent; brewing never consumes them.) One load per Brewhouse.

### D · Cellar — *Age*
Gain a **pool of 3 age points** ⚙ and **allocate them freely across your vessels** (pour into one cask or spread). Each cask also ages **+1 automatically at the start of your turn** ⚙, so maturing never depends on reaching this station. When a cask reaches **Ready**, deploy it to an open slot (§2).

### C · Harbor — *Ship*
**Load** a **deployed cask** (sitting on a slot — **yours or a rival's**, v0.12) onto **any ship on the Wharf** whose quality minimum it meets (no line-coincidence needed). **You choose the ship/destination.** If you loaded a **rival's** cask, **you** take a **loader bonus** (`1 G` ⚙) for choosing where it goes (the only thing paid at load). **The destination's benefit and points both seal on DELIVERY, not on loading** (§5) — loading is a commitment, not a payout. A ship **sails only when it is full** (v0.16 — partial early-launch is retired); the instant the last berth fills, every cask aboard delivers. *(A cask must be on a slot — or, for the commissioner's free load, a vessel — to board a ship. A hull you cannot fill waits for more cargo, or you charter the cask out.)*

Or **Enshrine** (v0.15 — the Hall is local, no boat): take one of **your deployed casks** (on a slot, **Q2+**) and withdraw it into the **Hall** for prestige — **no ship, no fare.** It scores the Hall's printed prestige ladder (§5) and, like any voyage, **advances the Sailed-Ships clock**. **One enshrinement per Harbor visit** (**two** with the **Trophy Room**, §6). The cask must be **on a slot** (not straight from a vessel), so a prized cask sits publicly first — a rival may **load it to a kontor before you enshrine** (the v0.12 rival-loading lever). The Hall pays **no immediate benefit** (prestige only; the **Patron's Favor** modifier adds 1 good, §6).

Or **Charter** (the always-available relief valve, §5): spend a **charter contract** (a scarce ownable certificate — you start with **2**, and buy more at the Market for **1 `G`** ⚙, one Market acquire, unlimited supply) **plus a flat `2 G` fare** ⚙ to send **one** Ready cask — from a vessel **or** a slot — on an immediate **single-cask voyage** to a **kontor** it qualifies for (Charter is **kontore-only**; the Hall is reached by Enshrine, not chartered). It delivers normally (scores + the destination benefit) and, being a voyage, **advances the Sailed-Ships clock**. The scarce contract — not a price curve — is the throttle (v0.16, retiring the escalating fare row): it keeps the shared Cogs/Hulks the efficient path while guaranteeing you **never deadlock** (when every slot is jammed, no hull fits your cargo, or a Ready cask clogs a vessel, you can always **Move → Market → buy a contract → charter** your way out).

> **Why the stations aren't split builder/cash-out.** v0.6 put builders and cash-outs on opposite diagonals so they never shared a line. v0.7 keeps the legible Source → Brew → Age → Ship layout and instead leans on the **occupancy toll** (§1) to keep players from camping one spot. *(The diagonal was prototyped in v0.8 testing; the occupancy toll preserved legibility better while still making position matter.)*

---

## 4. The slots (the ring around the stations) — a transient mix of buildings

The **8 slots** (2 beside each line) are the shared commons. They hold a churning mix:

- **Casks** (your deployed Ready casks — public action-buildings + your cargo; they leave when shipped).
- **Ships** (neutral, destination-bound hulls from the shared deck; anyone loads their own casks; they sail away — §5).
- **Neutral buildings** (2–3 seeded at setup; shared base actions; permanent) — so the slots are alive from turn 1.

**One rule for all of them:** when a line fires, the active player **may use each building in its two slots.** All building actions resolve **on the active player's turn, for the active player** — there are **no out-of-turn gains** (the thing that felt counter-intuitive in v0.6 is gone). Cask and neutral actions are **free and public** (a rival using your cask's action is incidental — it is on *your* line, doing *your* work, while you wait to ship it).

### Variable cask actions (drawn at brew — public, chunky, production-advancing) ⚙ (v0.12)
Each cask carries **one signature slot-action**, **drawn at brew from the pool below** — *decoupled from quality* (a Bock might carry **Source**; a Keut might carry **Reach**). The action is **printed on the cask tile** so you read it without a tooltip. *Why variable:* casks now reliably bear useful actions, so you no longer depend on whether the random **Crane** building came out — it loosens the slot/loading bottleneck. **Exception — Gruit is fixed to Source (+2 goods)** ⚙ (v0.12.2): the Q1 on-ramp keeps a simple, legible, thematic action (sold local for goods); only **Q2+ casks draw** from the pool.

| Action | Effect ⚙ |
|---|---|
| **Source** | **gain** 2 goods |
| **Age** | **age** any 1 of your casks 2 steps |
| **Load** | **load** a Ready cask onto a ship for free |
| **Reach** | **+1 presence** at a kontor you've reached (majority help) |
| **Convert** | **convert** up to 2 goods `G ↔ H` |
| **Draw** | **draw** a goal from the supply (pay `1 G`, hand cap 4) |
| **Wild** | take any one **base action** — *Q4+ casks only* (too strong on a cheap cask) |

> The action is **independent of the beer type/quality** (only **Wild** is gated, to Q4+). The pace dial to watch: more cask actions means more to *do* per cask, which slows the Sailed-Ships clock — the clock length compensates ⚙.

> *Why this fixes the old "lackluster tile":* the action is chunky and advances *your* turn; **what you draw shapes your engine**, and a useful action no longer depends on a random building being in the game.

---

## 5. Ships & destinations (the cash-out)

### Ships — neutral, destination-bound shared hulls (v0.11 Batch B: commission → load → sail)
**Nobody owns a ship.** Each tile is **printed** with its hull (**Cog** cap 2 · **Hulk** cap 3 ⚙) and its **destination** (inheriting that destination's quality minimum), and comes off a shuffled **ship deck** (**20 hulls** ⚙ — **kontore only: Bruges / London / Bergen / Novgorod, 5 each** (11 Cog / 9 Hulk); the **Hall is never a ship destination** — it is reached locally, by Enshrine (§3)). A **ship market of 3 ⚙ sits face-up** beside the Market — you **commission any one of the three**, then refill from the deck. *(The display is 3 rather than 1 so a single ill-bound hull can never stall the yard, and commissioning is a real pick — choose the hull bound where **your** cargo wants to go.)*
- **Commission** (Market): pay **2 `G`** ⚙ and place the **face-up ship** on any open slot (then flip the next). What you buy is **tempo and placement** — the hull exists where you want it and you are positioned to feed it first.
- **Load:** put a cask from a slot — **yours or a rival's (v0.12)** — aboard any ship it qualifies for, via the **Harbor action** (always available) **or** when the **ship's line fires** (a bonus free load). When you load a **rival's** cask, **you choose the destination**, the **owner** scores it and banks the destination benefit, and **you take a `1 G` loader bonus** for placing it. *(Loading your own cask is the common case; loading a rival's is a tactical placement play — v0.12 brought it back as a clean, self-interested option.)*
- **Commission** (Market, 2 `G` ⚙): place a **face-up ship** on an open slot **and immediately load one of your Ready casks** — from a **slot or a vessel** (skipping deploy) — aboard for free, if it meets the hull's quality minimum (**the commissioner's berth** — your reason to spend on a hull: a secured berth to a destination you chose). Commissioning is what feeds the **merchant goal**.
- **Everything seals on DELIVERY (v0.16 — benefit and points together).** When a ship sails, each cask is delivered and its **owner banks both halves at once:**
  - the destination's **benefit** — **Bruges/Bergen → 2 goods · London/Novgorod → take an Upgrade from the display** (ships sail to kontore only; the Hall pays prestige and is reached by Enshrine, not a ship — §3), **and**
  - the cask's **points** — its **value ★** (incl. the export premium) + its count toward the kontor **majorities**.
  Benefits resolve **in load order** — the ship's **first / second / third berths** — so a full Hulk pays out 1st-berth, then 2nd, then 3rd. *(Reversing v0.11.2's benefit-on-load: loading now banks nothing on its own; the payoff is the completed voyage, which is what gives filling-and-sailing its urgency. The cask's owner is paid even if a rival loaded the cask; the loader took only the `1 G` loader bonus, at load.)*
- **Sail — only when FULL (v0.16).** A ship casts off the instant its last berth fills; every cask aboard is **delivered**. **Filling earns no bonus** — the filler only chose which cask completed it. **There is no early launch** — a part-loaded hull waits for more cargo (yours or a rival's), or you **charter** the stranded cask out. *(This is the "ships sail full" rule: no dribbling half-empty hulls; you make the hull work, Brass-style.)*
- The voyage **advances the Sailed-Ships clock by one** (a marker — §8), and the **hull returns to the bottom of the ship deck** (the yard refits it; the supply never dries up).
- **The interaction:** shared hulls make cargo space and sail timing the contest — racing to fill a rich-bound ship, commissioning where *your* casks can reach, launching early to deny a fuller load, or **loading a rival's cask to a destination of your choosing** (v0.12; owner scores, you take the loader bonus — a placement/denial play). *(The v0.11 cut of rival-loading was reversed in v0.12: the cleaner "you pick the destination, owner scores, you bank `1 G`" form tested well and the human wanted the tactical lever the margin-greedy bots couldn't value.)*

### Charter — the single-cask relief valve, gated by a scarce contract (v0.16)
Ships sail only when full and the slots are tight, so you always need an escape that can't be locked out — but it must not become a highway. The throttle is a **scarce ownable certificate, not a price curve** (v0.16, retiring the v0.11 escalating fare row): the **charter contract.** Each house **starts with 2 ⚙**; you **buy more at the Market** (`1 G` ⚙, one Market acquire — the real cost is the whole Market visit's tempo; supply unlimited). At the **Harbor** you may **Charter** by **spending one contract + a flat `2 G` fare** ⚙ to ship **one** Ready cask — from a **vessel** *or* a **slot** — on an **immediate single-cask voyage** to a **kontor** it qualifies for (kontore-only; the Hall is enshrined, not chartered). It **delivers** (scores + benefit, §9) and **advances the Sailed-Ships clock** (§8) like any voyage; one cask for the contract+fare keeps building Cogs/Hulks the efficient race. The Charter remains the **deadlock guard**: because contracts are always buyable at the Market, **Move → Market → buy a contract → charter** is always a legal escape (and you can always Source goods), so when every slot is full, no hull fits your cargo, or a Ready cask clogs a vessel, you can never lock. *(Theme: a 1350 brewmaster who hasn't a hull of their own books space on someone else's — and needs the right paperwork to do it.)*

### Destinations — *where you ship is the strategic lean* (all open from start)
The old two value tracks are replaced by destinations, each with a distinct **benefit** and a **quality gate** (the only "level-up" limiter — better places want better beer):

| Destination | Gate ⚙ | Value ⚙ | Majority (1st/2nd/3rd) ⚙ | Benefit on delivery (the owner takes it) ⚙ |
|---|---|---|---|---|
| **Bruges** (Hub) | Q1 | low (+1) | **4 / 2 / 0** | **gain 2 goods, any mix** (liquidity, owner's choice) — takes any beer, the volume on-ramp |
| **London** (Steelyard) | Q2 | mid (+2) | **5 / 3 / 1** | **take 1 Upgrade from the face-up display** (§3) — *the engine destination* (accessible upgrades) |
| **Bergen** (Bryggen) | Q2 | mid (+2) | **richest 9 / 5 / 2** | **gain 2 goods, any mix** (liquidity, owner's choice) — its goods are token; the **majority is its draw** |
| **Novgorod** (Long Haul) | Q3 | **high (+4)** | rich **8 / 5 / 2** | **take 1 Upgrade from the display** — premium only; pays the most *and* a perk |
| **The Hall** (Prestige) | Q2 | **prestige by quality — a printed ladder: Q2→4 · Q3→6 · Q4→8 · Q5→10** ⚙ | — | *(none)* — out of commerce; reached by the **local Enshrine** (no ship, no fare — §3), the scarcity/Westvleteren lean |

- **Export premium ⚙ (v0.11 Batch A3):** a delivered **Q4** cask scores **+1** and a **Q5** cask **+2** at **any kontor**, on top of the kontor's value (the Hall already scales with quality). The high climb earns its freight on the same voyage that builds your majorities.
- **Benefits pair off: liquidity vs the engine.** **Bruges & Bergen** each hand the owner **2 goods** on delivery (liquidity); **London & Novgorod** each let the owner **take one tile from the Market's shared face-up Upgrade display** (§3) — *free*, where buying it would cost goods. Because the display is a small, churning row, **you don't fully know which Upgrade will be on offer when your cask arrives** — that uncertainty is the point. **London is the *engine* destination** (the accessible Q2 upgrade kontor); **Bergen's** goods are deliberately token (≈ a Market visit) — **its draw is the richest majority**, so the two stay distinct.
- **The majority is a *big* end-game motivator — every kontor pays a tiered, ranked majority (Lacerda-style):** at each kontor, count delivered casks; **1st/2nd/3rd place take the destination's majority tiers**. **Bruges 4/2/0 · London 5/3/1 · Novgorod 8/5/2 · Bergen 9/5/2** ⚙ — **Bergen is the rich anchor** (its weak goods benefit is offset by the biggest majority); Novgorod rides high for its hard Q3 reach. Delivery *value* is deliberately low (so the points live in the majority race, not in flat per-cask value). **In a 2-player game, 2nd place is skipped** (winner-take-all at each kontor). Tied players split the sum of the tiers they collectively occupy ⚙. Presence at a kontor = your delivered casks there. *(Big majorities tilt scoring toward the kontore, so the **Hall's prestige ladder (4/6/8/10 by quality)** keeps the volume-vs-prestige axis balanced — re-trimmed in v0.15 when the Hall became a local Enshrine (the boat's friction was masking how high the ladder ran), `DESIGN.md` §21. **Note:** because presence = cask count, **majorities reward shipping wide**, so "go for majorities" is a *volume* play — there is no separate concentrate-on-one specialist that beats it.)*
- **The cask's owner always scores the delivery and takes the benefit.** This is the climb-and-variety engine: deliver → earn an upgrade → brew better → deliver better (the Distilled "selling funds your next still" feel).

> **Rival-loading — cut in v0.11, restored in v0.12.** v0.11 removed the original "ship a rival's cask" rule (the oracle declined it; the table found it confusing). v0.12 brought back a **cleaner form**: you may load a rival's deployed cask onto any ship, **you choose the destination**, the **owner scores it + banks the benefit**, and **you take a `1 G` loader bonus**. The human wanted the tactical placement/denial lever (the margin-maximizing bots can't value it, so it read "anti-optimal" only in sim — a bot blind spot, not a design flaw). It now sits alongside the rest of the shared-hull interaction: commissioning where *your* cargo goes (and the free berth it grants), the destination benefit the owner banks **on delivery**, and racing to **fill** a rich-bound hull before a rival does (or hijack-loading their cask elsewhere to deny them the berth).

---

## 6. The brewery & upgrades (your private engine)

Your brewery board is private and safe. It holds your **vessels** (start 2, cap 4 ⚙ — throughput), your **recipes**, and your **upgrades**. Upgrades are the engine-building / "get ahead" layer and where strategies diverge. They come from the Market's **face-up Upgrade display** (§3) and are **earned only by delivering to London / Novgorod** (§5; Bruges & Bergen hand you goods instead) — **there is no goods-buy (v0.12.3).** This makes the *deliver → earn an upgrade → brew better → deliver better* cycle the **only** path to upgrades, and the two upgrade-kontore essential to engine-building. There are two families — **Rooms** (permanent capability) and **Modifiers** (asymmetric perks).

#### Upgrade reference — every variant ⚙ (this is the full set the display draws from)

*(The **`G` figure** below is the upgrade's **retired buy price** (v0.12.3 removed the goods-buy), kept only as a **relative-value / rarity indicator** for tuning — there is no way to purchase an upgrade in play; you **earn** one by delivering to London / Novgorod.)*

| # | Room (capability) | Effect ⚙ | Buy cost ⚙ |
|---|---|---|---|
| 1 | **Extra Vessel** | +1 brewing lane (vessels start 2, cap **3** — one per house) | `5 G` |
| 2 | **Aging Cellar** | maturation **−1 step** (a Bock matures in 2) — a *pathway*, not a gate (v0.14) | `5 G` |
| 3 | **Warehouse** | goods storage **8 → 12** | `4 G` |
| 4 | **Quay** | load **2 casks** in one Harbor visit (instead of 1) | `5 G` |
| 5 | **Cooperage** | **+1 cask loaded** per Harbor visit (stacks with Quay) | `4 G` |
| 6 | **Trophy Room** | **Enshrine 2 casks** at the Hall per Harbor action (instead of 1) — the prestige-throughput room (v0.15) | `5 G` |

| # | Modifier (asymmetric perk) | Effect ⚙ | Buy cost ⚙ |
|---|---|---|---|
| 6 | **Granary Right** | whenever you gain grain, **+1 extra** | `4 G` |
| 7 | **Hop Garden** | whenever you gain hops, **+1 extra** | `4 G` |
| 8 | **Patron's Favor** | when you **enshrine** at the Hall, **gain 1 good** (the patrons reward your standing) — the prestige lane's economic hook (v0.15, replaced Royal Patent) | `4 G` |
| 9 | **Staple Right** | **+1 good** whenever you deliver to a kontor | `5 G` |
| 10 | **Guild Seat** | **+1 age point** at the Cellar | `4 G` |
| 11 | **Burgher Status** | **+1 presence** at every kontor you've reached (majority help) | `5 G` |

> **Earning (v0.12.3):** delivering to **London / Novgorod** hands you a display tile **free**, riding a voyage that already pays value + a majority — this is the **only** way to gain an upgrade (the goods-buy was removed; the data showed buying was ~5–8% of upgrades and dominated by chartering-to-earn). Supply: **~2 copies of each ⚙** (more Extra Vessels, the repeatable one) — so an upgrade can be **contested** (only so many copies exist, and the face-up display churns). Goals (§9) reward different brewery/delivery shapes, so the winning engine varies by game — the *Great Western Trail* ideal (a blend beats a one-note rush).

---

## 7. Goods & storage

`G` grain and `H` hops are the **only** currency — recipes, brew inputs, ships, upgrades, loader benefits. Storage cap **8 ⚙** (Warehouse +4). There is **no money** and **no spendable prestige** — delivered points are score only.

---

## 8. End of the game

- **The Sailed-Ships track fills.** Each voyage (a ship sailing **full**, a **Charter**, **or an Enshrine** §5/§3) advances the shared, visible **Sailed-Ships track** by one. When it fills, the end is triggered — **finish the round** (equal turns for all) → **score**. It is **self-accelerating** (the more the table ships, the sooner it ends) and the master length dial. Because the shared clock fills *faster* with more players, its length **scales steeply: ~7 / 11 / 14 / 17 slots for 2 / 3 / 4 / 5 players ⚙** (≈ +3–4 per player). *(Pace history: the old linear ~6/8/10/12 ended 4–5p games too fast; v0.10 steepened to 7/11/15/19; v0.12's variable cask actions slowed rounds so v0.12.1 trimmed to 6/10/13/16; then v0.12.2–.3 — Gruit pinned to Source goods + removing the upgrade-buy goods-sink — sped rounds back up, so v0.12.3 re-centered to 7/11/14/17 to land 2–4p mid-band at ~15–16 rounds.)*
- A **MAX_ROUND ceiling** ⚙ backstops a slow table at the top of the **12–25-round target band** (**≈25 ⚙**). Good play ends earlier on the clock; the ceiling just guarantees no game drags. *(Pace tuning — the Sailed-Ships length is the primary dial, the Charter cost and `MAX_ROUND` the secondary ones — wants a human playtest.)*

> A reach-leaning player can **race** the clock by sailing ships fast; a prestige-leaning player keeps a steadier pace to buy more delivering turns. The clock is on the table, shared and steerable.

---

## 9. Scoring (end-game)

No separate reach/standing tracks. You score from **what you delivered**:

1. **Delivery value** — sum your delivered casks' values at each destination (kontore = trade value **+ the export premium ⚙: Q4 +1, Q5 +2**; **the Hall = prestige**, scaling with quality).
2. **Majorities** — the **tiered, ranked** route-majority at *every* kontor: by delivered-cask count, **1st/2nd/3rd place take that kontor's majority tiers** (§5 — Bruges 4/2/0 · London 5/3/1 · Novgorod 8/5/2 · Bergen 9/5/2 ⚙; Bergen the rich anchor). **This is a big chunk of the score** — the per-cask delivery values are low on purpose. **2-player games skip 2nd** (winner-take-all); tied players split the sum of the tiers they occupy ⚙.
3. **Goals** — you hold **3 goal tiles** (dealt at setup; **hand cap 4** ⚙ — the Towncrier can add a 4th); **your best 2 score** ⚙ (the variety layer).
4. **The Flight ⚙ (v0.13) — your *range***. Count the **distinct quality tiers (Q1–Q5) among the casks you delivered** and score a back-loaded ladder — **(tiers − 1)², with a minimum of 3 tiers to score**: **3 tiers → 4 · 4 → 9 · 5 (full ladder) → 16** ⚙. Two tiers (the free Gruit + Hopped) score nothing, so the Flight is a true **climber's reward** — *"not how high, but how complete the range of the house."* The full 5-tier flight needs a **Bock**. This is the **quality pole** of the reach-vs-quality axis: go *wide* (many kontore, majorities) **or** go *deep* (the full ladder, the Flight).
5. **The Masterpiece ⚙ (v0.13)** — the **first time you deliver the game's top export tier** (Q5 Bock when dealt, else the highest dealt = Q4): a one-time **+3 ★ and +3 goods** — the magnum-opus moment that pays the climb back.
6. **Tiebreak:** most goods, then most casks on slots.

> The reach-vs-quality tension lives here as a **lean**, not two silos: spread casks **wide** across kontore for value + majorities, *or* climb **deep** for the Flight + the Hall's prestige — coupled by shared casks, scarce slots, scarce ships, and the one shared end clock.

---

## Open / to tune

- **Warm-start contents** (2 ships dealt from the deck; the Gruit starts Ready in a vessel), the **ship-deck mix** (~20 hulls ⚙ — size, Cog/Hulk ratio, destination spread), the **commission fee** (2 `G` ⚙, with its free berth) vs the **Sailed-Ships length** — the joint pace dials; target first voyage ≈ turn 2–3, a **12–25-round game**. ⚙ watch: shared hulls run charter-heavier at 4–5p (the tight ring; the GM oracle shows ~42% of 4p deliveries are charters) — contract scarcity and deck mix per count are the ready dials.
- **The charter throttle** (v0.16 — a scarce **contract**, not a fare curve): starting contracts (⚙2), the Market buy cost (⚙`1 G`), the flat fare (⚙`2 G`), and whether a charter advances the clock — the relief-valve dials. Contracts replaced the escalating fare row so the throttle is a legible, ownable certificate; the GM oracle shows 4p still leans ~42% on charters (the tight ring), so contract scarcity / hull mix per count is the live dial there. The deadlock guard holds because contracts are always buyable.
- **Cask-action strengths** (free Source 2 / Age 2 / free Load / +1 presence / Wild) — keep them chunky without making the slots swingy. Whether *every* cask bears an action or only "set-working" ones.
- **Occupancy toll** (⚙1 `G` to move onto a rival-occupied station; opening placement free) — the de-rondel / seat-balance dial. Gentle by design; watch that it never becomes a dominant tax handed back and forth, and confirm it actually spreads players in human play (the greedy sim can't show this).
- **Destination values, gates, and majority bonuses** — the heart of the variety; how hard to gate the rich destinations behind quality (the climb) vs leaving them open (variety).
- **The shared-hull interaction (v0.16):** whether forcing ships to sail full reads as fair (or strands cargo on an unfillable hull → frustration), whether benefit-on-delivery in load order is clean at the table, and the charter-reliance at 4p (GM ~42%) — the live interaction dials.
- **Slot pressure:** 8 slots shared by casks + ships + neutral buildings — tight by design; whether 2p locks some and 5p needs relief; whether a clogged vessel is too punishing.
- **Upgrades/modifiers:** which come from deliveries vs the Market; how asymmetric the modifiers run.
- **Goals:** how many, shared vs personal, and the best-few cap (the GWT blend lever).
