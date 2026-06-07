# Brewhouses of the Hanse — Turn & Round Economy (v0.9 — "The Wharf")

> Operational rules. Numbers are placeholders ⚙. **v0.7 is a ground-up reel-in to *Great Western Trail / Distilled* weight.** It keeps what was loved — the shared 2×2 of stations ringed by slots, the dual-role cask, the merchant-shipping fantasy, and the theme — and sheds about half the rules. The whole game now happens at **the Wharf**: four stations (Market · Brewhouse · Cellar · Harbor) ringed by 8 slots, where the work runs **Source → Brew → Age → Ship.** A brewed cask matures privately, then sits on a shared **slot** as a public **action-building** *and* your cargo-in-waiting, then **ships to a destination** for points and leaves. The two old value tracks (reach/standing) are gone — **the volume-vs-prestige lean now lives in *where you ship*.** Supersedes v0.6 (`DESIGN.md` §21, 2026-06-05).

---

## 0. Setup (symmetric)

Each house starts with:
- **3 `G` (grain), 2 `H` (hops)** — plus **seat compensation: +1 `G` for every seat after the first** ⚙ (so seats P1…P5 start with 3/4/4/4/4 `G`). Turn order is fixed, which gives the first player a small structural edge; the free opening placement plus this +1 `G` neutralize it (sim-validated: it flattens the first-player win-rate at 2–3p essentially to fair). Storage cap 8 ⚙.
- The **Gruit** and **Hopped** recipes (the on-ramp — fixed, symmetric, so everyone can brew immediately and *gaining an export recipe means more*). More recipes are acquired at the Market.
- **2 open vessels** (the brewing throughput; cap 4 ⚙ via upgrades).
- A **warm start so the Wharf is live on turn 1:** one built **Cog** placed on a slot (bound to **Bruges**), and **one Ready Gruit in a vessel** (deploy it to a slot on turn 1) ⚙ — no starting cask sits on the shared slots. First voyage is reachable by turn 2–3, not turn 6.
- An empty **brewery board** (vessels + upgrade slots — see `COMPONENTS.md` §4).

The shared board is seeded so the ring is **alive from turn 1:** all four **destinations are open**, and **2–3 neutral buildings** ⚙ plus the warm-start **Cogs** are placed in perimeter slots **spread across different lines** (no single line is stacked with the shared tiles ⚙) so there is no obvious opening camp — every direction is worth something on turn 1. **Deal 3 of the 4 export beers** into play this game. Each beer carries a **fixed quality** — **Broyhan** and **Keut** are Q3, **Mumme** is Q4, **Bock** is Q5 — so dropping one varies the *ladder shape*: drop a Q3 beer → the full Q3→Q4→Q5 climb; drop **Mumme** → no Q4 tier; drop **Bock** → no Q5 tier (the variable export tier). **Shuffle all Upgrade tiles into a face-down Upgrade deck and deal 4 ⚙ face-up beside it (randomly placed) — the Upgrade display; the deck stays face-down as a 5th stack and refills the display as tiles are taken (§3).** Set the **Sailed-Ships track** to its player-scaled length. Each player places a worker on any station — **opening placement is free** (no occupancy toll, §1). **Choose a first player — fixed for the whole game** (turn order does not rotate ⚙; the free opening placement **and the +1 `G` per later seat** above are the seat balancers).

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
- **C · Harbor** — *Ship:* load Ready casks onto your ships; they deliver when full.

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
- a **ship** (a Cog or Hulk → placed on a slot, bound to a destination; §5) — *always-available supply*,
- an **upgrade** (a Room/Modifier → installed on your brewery; §6) — taken from the **face-up Upgrade display**.

> **The Market display (Option B).** Recipes and ships are always in stock (you can always buy a build option). **Upgrades, by contrast, sit in a small face-up display** — a row of **4 ⚙** tiles dealt (randomly placed) from a shuffled **Upgrade deck that sits face-down beside them as a 5th stack**; buy one (pay its cost) and the row **refills** from the top of the deck. The *same display* is what the engine-kontore hand out free on delivery (§5) — so the Upgrade you can grab, by buying or by shipping, depends on **what's currently face-up.** This is the contested "what's in store" tension; recipes/ships stay reliable so your build plan never stalls.

### B · Brewhouse — *Brew*
**Load** one recipe you hold (paying its `G/H` cost) into an **open vessel** — a young cask at step 0. (Recipes are permanent; brewing never consumes them.) One load per Brewhouse.

### D · Cellar — *Age*
Gain a **pool of 3 age points** ⚙ and **allocate them freely across your vessels** (pour into one cask or spread). Each cask also ages **+1 automatically at the start of your turn** ⚙, so maturing never depends on reaching this station. When a cask reaches **Ready**, deploy it to an open slot (§2).

### C · Harbor — *Ship*
**Load** one of your **deployed casks** (sitting on a slot) onto one of **your ships** (any ship — no line-coincidence needed). A ship **sails the instant it is full** (§5); you may also **launch a partial ship early** here (the relief valve). *(A cask must be on a slot to be loaded onto an owned ship — that is what makes deploying it the gateway to scoring.)*

Or **Charter** (the always-available relief valve, §5): pay **⚙2 `G`** to send **one** Ready cask — from a vessel **or** a slot — on an immediate **single-cask voyage** to a destination it qualifies for. It delivers normally (scores + the destination benefit) and, being a voyage, **advances the Sailed-Ships clock**. One cask for the price keeps owned Cogs/Hulks the efficient path, but the Charter guarantees you **never deadlock** (when every slot is full and you hold no ship, or a Ready cask clogs a vessel, you can always charter your way out).

> **Why the stations aren't split builder/cash-out.** v0.6 put builders and cash-outs on opposite diagonals so they never shared a line. v0.7 keeps the legible Source → Brew → Age → Ship layout and instead leans on the **occupancy toll** (§1) to keep players from camping one spot. *(The diagonal was prototyped in v0.8 testing; the occupancy toll preserved legibility better while still making position matter.)*

---

## 4. The slots (the ring around the stations) — a transient mix of buildings

The **8 slots** (2 beside each line) are the shared commons. They hold a churning mix:

- **Casks** (your deployed Ready casks — public action-buildings + your cargo; they leave when shipped).
- **Ships** (owned infrastructure you built; they load casks and sail away — §5).
- **Neutral buildings** (2–3 seeded at setup; shared base actions; permanent) — so the slots are alive from turn 1.

**One rule for all of them:** when a line fires, the active player **may use each building in its two slots.** All building actions resolve **on the active player's turn, for the active player** — there are **no out-of-turn gains** (the thing that felt counter-intuitive in v0.6 is gone). Cask and neutral actions are **free and public** (a rival using your cask's action is incidental — it is on *your* line, doing *your* work, while you wait to ship it).

### Signature cask actions (by type — public, chunky, production-advancing) ⚙
Each is a "support action" in the Lisboa sense — it pushes production forward, and the climb makes higher types stronger:

| Type | Q | Signature slot action |
|---|---|---|
| **Gruit** | 1 | **gain** 2 goods |
| **Hopped** | 2 | **Age** any 1 of your casks 2 steps |
| **Export Q3** *(Broyhan · Keut)* | 3 | **Load** — load a Ready cask onto a ship for free |
| **Export Q4** *(Mumme)* | 4 | **Reach** — +1 presence at a kontor you've delivered to (majority help) |
| **Export Q5** *(Bock)* | 5 | **Wild** — take any one base action (Market / Brewhouse / Cellar / Harbor) as a bonus |

> The action follows the **quality**, not the name: whichever export beers are dealt this game, a Q3 cask always grants **Load**, a Q4 (Mumme) **Reach**, a Q5 (Bock) **Wild**. If Mumme or Bock is the undealt beer, that action simply isn't available this game.

> *Why this fixes the old "lackluster tile":* the action is chunky and advances *your* turn, and **which type you brew is now an engine choice** — you're deciding which action-building to put on your lines, not just paying a cost.

---

## 5. Ships & destinations (the cash-out)

### Ships — owned, single-use carriers (build → load → sail)
- **Build** (Market): a **Cog** (capacity **2**) or **Hulk** (capacity **3**) ⚙ goes on a slot, **bound to a destination** of your choice, inheriting that destination's **quality gate**.
- **Load:** put a cask **from a slot** aboard — via the **Harbor action** (always available) **or** when the **ship's line fires** (a bonus free load). It may be your own or a **rival's** deployed cask (§ below).
- **Sail** (the instant it is **full**, or via an early **Harbor launch**): every cask aboard is **delivered** to the ship's destination → it **scores for its owner** (§9) and leaves the board; the **ship tile is consumed onto the shared Sailed-Ships track** (§8) — single-use, build another to ship again.

### Charter — the single-cask relief valve (no tile; an outside hull)
Owned ships are consumed when they sail, and the slots are tight, so you always need an escape that can't be locked out. At the **Harbor** you may always **Charter**: pay **⚙2 `G`** to ship **one** Ready cask — from a **vessel** *or* a **slot** — on an **immediate single-cask voyage** to a destination it qualifies for. It **delivers** (scores + benefit, §9) and **advances the Sailed-Ships clock** (§8) like any voyage; it just carries one cask for the fare, so building Cogs/Hulks stays the efficient race. The Charter is the **deadlock guard**: when every slot is full and you own no ship, or a Ready cask clogs a vessel, a charter always frees you (you can always gain the 2 `G`). *(Theme: a 1350 brewmaster who hasn't a hull of their own books space on someone else's.)*

### Destinations — *where you ship is the strategic lean* (all open from start)
The old two value tracks are replaced by destinations, each with a distinct **benefit** and a **quality gate** (the only "level-up" limiter — better places want better beer):

| Destination | Gate ⚙ | Value ⚙ | Majority (1st/2nd/3rd) ⚙ | Benefit on delivery (the owner takes it) ⚙ |
|---|---|---|---|---|
| **Bruges** (Hub) | Q1 | low (+2) | small (2) | **gain 2 goods** (liquidity) — takes any beer, the volume on-ramp |
| **London** (Steelyard) | Q2 | mid (+3) | small (2) | **take 1 Upgrade from the face-up display** (§3) — *the engine destination* (accessible upgrades) |
| **Bergen** (Monopoly) | Q2 | mid (+3) | **richest (10/6/3)** | *(no upgrade)* — its whole draw is the **biggest majority** (the monopoly play) |
| **Novgorod** (Long Haul) | Q3 | **high (+5)** | small (3) | **take 1 Upgrade from the display** — premium only; pays the most *and* a perk |
| **The Hall** (Prestige) | Q2 | **prestige ∝ quality (Q×2)** | — | *(none)* — out of commerce (the scarcity/Westvleteren lean) |

- **London & Novgorod each let the owner take one tile from the Market's shared face-up Upgrade display** (§3) — *free*, where buying it would cost goods. Because the display is a small, churning row, **you don't fully know which Upgrade will be on offer when your cask arrives** — that uncertainty is the point. **London is the *engine* destination** (the accessible Q2 upgrade kontor); **Bergen no longer grants an upgrade** — its draw is the rich majority, so the two are no longer clones.
- **Majorities are tiered & ranked (Lacerda-style):** at each kontor, count delivered casks; **1st/2nd/3rd place take the destination's majority tiers** (Bergen **10/6/3** ⚙; Bruges/London **2**, Novgorod **3** ⚙ — minor, 1st-place-only, so the majority *lean* lives at Bergen while the others stay value-led). **In a 2-player game, 2nd place is skipped** (winner-take-all at each kontor). Tied players split the sum of the tiers they collectively occupy ⚙. Presence at a kontor = your delivered casks there. *(Concentrating the rich majority at Bergen keeps the three leans — volume / prestige / majority — balanced; broad tiered majorities at every kontor were found to over-feed the volume lean and starve prestige.)*
- **The cask's owner always scores the delivery and takes any benefit** — even when a **rival** shipped it (§ below). This is the climb-and-variety engine: deliver → earn an upgrade → brew better → deliver better (the Distilled "selling funds your next still" feel).

### Shipping a rival's cask (the non-destructive interaction)
On your turn you may load a **rival's deployed cask** onto **your** ship (only casks on slots — never their brewery). When it sails:
- the **destination is your ship's binding** (you chose where), but it must be **legal for that cask's quality**;
- the **owner scores the delivery and picks its benefit** — they always gain (it is never purely harmful);
- **you** get the freed slot, the filled ship (toward *your* end-clock), a small **loader bonus** ⚙, and you control the **timing**.

> Net positive-sum with a timing twist: you help a rival a little, on *your* schedule, while capping what they were holding out for and advancing your own game. Theme cover: *a 1350 brewmaster does not fully control where their casks end up.* The tuning knobs are the **loader bonus** and the **value gap** between a cask's best destination and where a rival can force it (§ Open).

---

## 6. The brewery & upgrades (your private engine)

Your brewery board is private and safe. It holds your **vessels** (start 2, cap 4 ⚙ — throughput), your **recipes**, and your **upgrades**. Upgrades are the engine-building / "get ahead" layer and where strategies diverge. They come from the Market's **face-up Upgrade display** (§3): **buy** one (pay its goods cost) **or earn** one free by delivering to London / Novgorod (§5; Bergen's draw is its majority, not an upgrade). **Buying is deliberately dear (4–5 `G` ⚙) — about a kontor delivery's worth of goods — so the *deliver → earn an upgrade → brew better* cycle is the privileged path and buying is a costed bootstrap/fallback, not a shortcut.** There are two families — **Rooms** (permanent capability) and **Modifiers** (asymmetric perks).

#### Upgrade reference — every variant ⚙ (this is the full set the display draws from)

| # | Room (capability) | Effect ⚙ | Buy cost ⚙ |
|---|---|---|---|
| 1 | **Extra Vessel** | +1 brewing lane (vessels start 2, cap **4**) — repeatable | `5 G` |
| 2 | **Aging Cellar** | maturation **−1 step**; **unlocks the L5 export** beer | `5 G` |
| 3 | **Warehouse** | goods storage **8 → 12** | `4 G` |
| 4 | **Quay** | load **2 casks** in one Harbor visit (instead of 1) | `5 G` |
| 5 | **Cooperage** | **+1 cask loaded** per Harbor visit (stacks with Quay) | `4 G` |

| # | Modifier (asymmetric perk) | Effect ⚙ | Buy cost ⚙ |
|---|---|---|---|
| 6 | **Granary Right** | whenever you gain grain, **+1 extra** | `4 G` |
| 7 | **Hop Garden** | whenever you gain hops, **+1 extra** | `4 G` |
| 8 | **Royal Patent** | your ships sail with **+1 capacity** | `5 G` |
| 9 | **Staple Right** | **+1 good** whenever you deliver to a kontor | `5 G` |
| 10 | **Guild Seat** | **+1 age point** at the Cellar | `4 G` |
| 11 | **Burgher Status** | **+1 presence** at every kontor you've reached (majority help) | `5 G` |

> **Buy cost vs. earning:** delivering to a kontor hands you a display tile **free** (riding a voyage that already pays value + a majority), so buying — which yields *only* the upgrade — is priced at a comparable **4–5 `G` ⚙** to stay competitive without dominating. Supply: **~2 copies of each ⚙** (more Extra Vessels, the repeatable one) — so an upgrade can be **contested** (only so many copies exist). Goals (§9) reward different brewery/delivery shapes, so the winning engine varies by game — the *Great Western Trail* ideal (a blend beats a one-note rush).

---

## 7. Goods & storage

`G` grain and `H` hops are the **only** currency — recipes, brew inputs, ships, upgrades, loader benefits. Storage cap **8 ⚙** (Warehouse +4). There is **no money** and **no spendable prestige** — delivered points are score only.

---

## 8. End of the game

- **The Sailed-Ships track fills.** Each voyage (a ship sailing full or launched, **or a Charter §5**) advances the shared, visible **Sailed-Ships track** by one. When it fills, the end is triggered — **finish the round** (equal turns for all) → **score**. It is **self-accelerating** (the more the table ships, the sooner it ends) and the master length dial. Because the shared clock fills *faster* with more players, its length **scales steeply: ~7 / 11 / 15 / 19 slots for 2 / 3 / 4 / 5 players ⚙** (≈ +4 per player; a 500-game sim showed the old linear ~6/8/10/12 ended 4–5p games in ~8 rounds, under the target band).
- A **MAX_ROUND ceiling** ⚙ backstops a slow table at the top of the **12–25-round target band** (**≈25 ⚙**). Good play ends earlier on the clock; the ceiling just guarantees no game drags. *(Pace tuning — the Sailed-Ships length is the primary dial, the Charter cost and `MAX_ROUND` the secondary ones — wants a human playtest.)*

> A reach-leaning player can **race** the clock by sailing ships fast; a prestige-leaning player keeps a steadier pace to buy more delivering turns. The clock is on the table, shared and steerable.

---

## 9. Scoring (end-game)

No separate reach/standing tracks. You score from **what you delivered**:

1. **Delivery value** — sum your delivered casks' values at each destination (kontore = trade value; **the Hall = prestige**, scaling with quality).
2. **Majorities** — the **tiered, ranked** route-majority at each kontor: by delivered-cask count, **1st/2nd/3rd place take that kontor's majority tiers** (§5 — Bergen **10/6/3** ⚙ is the rich one; the others minor). **2-player games skip 2nd** (winner-take-all); tied players split the sum of the tiers they occupy ⚙.
3. **Goals** — you hold **3 goal tiles** (dealt at setup); **your best 2 score** ⚙ (the variety layer).
4. **Tiebreak:** most goods, then most casks on slots.

> The volume-vs-prestige tension lives here as a **lean**, not two silos: spread casks wide across kontore for value + majorities, *or* send your best out of commerce to the Hall for big single hits — coupled by shared casks, scarce slots, scarce ships, and the one shared end clock.

---

## Open / to tune

- **Warm-start contents** (1 Cog on a slot; the Gruit starts Ready in a vessel) and **starting vessels** (2?) vs the **Sailed-Ships length** — the joint pace dials; target first voyage ≈ turn 2–3, a **12–25-round game**, and a 2p game ≈ 45–60 min.
- **Charter cost** (⚙2 `G`) and whether it advances the clock — the relief-valve dials. Too cheap and it eclipses owning ships (the merchant fantasy); too dear and the deadlock guard bites. It must stay *strictly worse per cask* than a Cog/Hulk.
- **Cask-action strengths** (free Source 2 / Age 2 / free Load / +1 presence / Wild) — keep them chunky without making the slots swingy. Whether *every* cask bears an action or only "set-working" ones.
- **Occupancy toll** (⚙1 `G` to move onto a rival-occupied station; opening placement free) — the de-rondel / seat-balance dial. Gentle by design; watch that it never becomes a dominant tax handed back and forth, and confirm it actually spreads players in human play (the greedy sim can't show this).
- **Destination values, gates, and majority bonuses** — the heart of the variety; how hard to gate the rich destinations behind quality (the climb) vs leaving them open (variety).
- **Shipping a rival's cask:** the **loader bonus** size and the **best-vs-forced destination value gap** — the non-destructive interaction dials (watch mild kingmaking on who you help).
- **Slot pressure:** 8 slots shared by casks + ships + neutral buildings — tight by design; whether 2p locks some and 5p needs relief; whether a clogged vessel is too punishing.
- **Upgrades/modifiers:** which come from deliveries vs the Market; how asymmetric the modifiers run.
- **Goals:** how many, shared vs personal, and the best-few cap (the GWT blend lever).
