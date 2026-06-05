# Brewhouse of the Hanse — Turn & Round Economy (v0.7 — "The Wharf")

> Operational rules. Numbers are placeholders ⚙. **v0.7 is a ground-up reel-in to *Great Western Trail / Distilled* weight.** It keeps what was loved — the shared 2×2 grid, owned/transient tiles in the perimeter ring, the dual-role cask, the merchant-shipping fantasy, and the theme — and sheds about half the rules. The whole game is now **one legible production loop, walked on the grid: Source → Brew → Age → Ship.** A brewed cask is the hero tile: it matures privately, then sits on the shared **wharf** as a public **action-building** *and* your cargo-in-waiting, then **ships to a destination** for points and leaves. The two old value tracks (reach/standing) are gone — **the volume-vs-prestige lean now lives in *where you ship*.** Supersedes v0.6 (`DESIGN.md` §21, 2026-06-05).

---

## 0. Setup (symmetric)

Each house starts with:
- **3 `G` (grain), 2 `H` (hops).** Storage cap 8 ⚙.
- The **Gruit** and **Hopped** recipes (the on-ramp — fixed, symmetric, so everyone can brew immediately and *gaining a summit recipe means more*). More recipes are acquired at the Market.
- **2 open vessels** (the brewing throughput; cap 4 ⚙ via upgrades).
- A **warm start so the loop is live on turn 1:** one built **Cog** placed in a ring slot (bound to **Bruges**), and **one Ready cask on the wharf** (a Gruit) ⚙. First voyage is reachable by turn 2–3, not turn 6.
- An empty **brewery board** (vessels + upgrade slots — see `PLAYERBOARD.md`).

The shared board is seeded so the ring is **alive from turn 1:** all four **destinations are open**, and **2–3 neutral buildings** ⚙ are placed in perimeter slots (shared base actions everyone may use). Deal the **summit roster** (Bock / Mumme / Broyhan / Keut) onto the L3–L5 rungs in a random order each game (the variable summit). Set the **Sailed-Ships track** to its player-scaled length.

> **What's gone from v0.6** (the reel-in): the demand-market value track, the type frontier, Fairs, route-lane tiles, the Hall as an action cell, the working-cask Floor state, the fires-when-blocked tableau twins, differentiated lane skims, recipe on-collect boons / the 6-card tuck, and aging cubes. **Casks are no longer presence while they sit; presence/standing happens at *delivery*.** Cells are never blocked (no twins) — interaction lives on the shared wharf.

---

## 1. The loop & the grid (the spine)

The four action cells **are** the production loop, and the forced-move circuit **walks** it:

```
        A ── B            A  Market   (Source)  → B  Brewhouse (Brew)
        │    │            │                        │
        C ── D            C  Harbor   (Ship)   ←  D  Cellar    (Age)

  Clockwise circuit A→B→D→C→A  =  Source → Brew → Age → Ship → (repeat)
  (orthogonal moves only — never the diagonal)
```

- **A · Market** — *Source:* gain goods, or acquire a recipe / ship / upgrade.
- **B · Brewhouse** — *Brew:* turn a recipe + goods into a young cask in a vessel.
- **D · Cellar** — *Age:* mature your casks toward Ready.
- **C · Harbor** — *Ship:* load Ready casks onto your ships; they deliver when full.

**Lines** (a row or a column) pair two adjacent loop-steps, so every activation is a useful two-step segment:
`rowT = Market+Brewhouse` · `colR = Brewhouse+Cellar` · `rowB = Harbor+Cellar` · `colL = Market+Harbor`.

### The turn

> **Turn 1 only:** *place* your worker on any cell and activate one of its two lines (no move).

1. **Move** your worker to an **orthogonally adjacent** cell (A↔B, A↔C, B↔D, C↔D — never diagonal). Mandatory from turn 2.
2. **Activate** the **row OR column** of your worker's cell.
3. **Resolve** that line's up-to-4 stops — **cap · cell · cell · cap** — in **any order you choose:**
   - **Each cell:** take its action (below). **Cells are never blocked** — a rival's worker on a cell does not stop you (no twins, no tolls). Interaction lives on the wharf, not the cells.
   - **Each cap slot:** if it holds a building (a deployed cask, a ship, or a neutral building), you **may use its action** — see §4.

> **Both cells on the line always fire; the worker only gates *which line is legal*.** Because base verbs are always available and the cask/ship actions only *add* to the loop, you are never stalled waiting for the board to align — a populated ring **accelerates** your circuit.

---

## 2. The cask — its three states (the spine in one object)

A cask carries a **type** (a quality rung Q1–Q5, printed) and one **signature action** (by type). It lives in exactly one of three states — the dual-role tile restored and made fun:

1. **Maturing** *(private, in a vessel).* Brewed at step 0; it ages toward **Ready** (passive +1 each of your turns, plus the Cellar action). Higher types take longer. Scores nothing.
2. **On the wharf** *(public, in a shared ring slot).* The instant a cask is Ready you **deploy it** to an open perimeter slot you choose (free). Now it is three things at once — your **cargo-in-waiting**, your private inventory, **and a public action-building**: whenever its line fires, the active player (you *or* a rival) may take its **signature action**. It scores nothing yet. *(If the wharf has no open slot, the Ready cask **clogs its vessel** until you free a slot or ship something — the back-pressure that forces you to keep the loop moving.)*
3. **Delivered** *(scored, gone).* Loaded onto a ship and **shipped to a destination** (§5). It scores there for its owner and leaves the board — the transient churn. A cask is only ever one state; shipping converts it.

> **You only "lose control" of a cask once it's on the wharf — the public commons.** Your brewery (maturing casks, recipes, upgrades) is private and untouchable. The wharf is where rivals can act on, and even ship, your casks (§4, §5). That single boundary bounds the interaction.

---

## 3. The four cells (the verbs)

Every base verb **always works**; ring buildings only add bonus copies of these verbs (§4).

### A · Market — *Source*
Take **2 goods** (any mix), **OR** acquire **one** tile from the face-up market row, paying its goods cost ⚙:
- a **recipe** (a new brewable type — your climb to the summit; summit recipes cost more),
- a **ship** (a Cog or Hulk → placed into a ring slot, bound to a destination; §5),
- an **upgrade** (a Room/modifier → installed on your brewery; §6).

### B · Brewhouse — *Brew*
**Load** one recipe you hold (paying its `G/H` cost) into an **open vessel** — a young cask at step 0. (Recipes are permanent; brewing never consumes them.) One load per Brewhouse.

### D · Cellar — *Age*
Gain a **pool of 3 advance points** ⚙ and **allocate them freely across your vessels** (pour into one cask or spread). Each cask also ages **+1 automatically at the start of your turn** ⚙, so maturing never depends on reaching this cell. When a cask reaches **Ready**, deploy it to an open wharf slot (§2).

### C · Harbor — *Ship*
**Load** one of your **wharf casks** onto one of **your ships** (any ship — no line-coincidence needed). A ship **sails the instant it is full** (§5); you may also **launch a partial ship early** here (the relief valve). *(A cask must be on the wharf to be loaded onto an owned ship — that is what makes deploying it the gateway to scoring.)*

Or **Charter** (the always-available relief valve, §5): pay **⚙2 `G`** to send **one** Ready cask — from a vessel **or** the wharf — on an immediate **single-cask voyage** to a destination it qualifies for. It delivers normally (scores + the destination benefit) and, being a voyage, **advances the Sailed-Ships clock**. One cask for the price keeps owned Cogs/Hulks the efficient path, but the Charter guarantees the loop never deadlocks (when the ring is full and you hold no ship, or a Ready cask clogs a vessel, you can always charter your way out).

> **Builders & cash-outs blur on purpose now.** v0.6's "every line is one builder + one cash-out" rule is retired in favor of the **walkable loop**: legibility (the board teaches the loop) beat the old anti-snowball constraint, which the warm start and faster pace made unnecessary.

---

## 4. The wharf (the perimeter ring) — a transient mix of buildings

The **8 perimeter slots** (2 capping each line) are the shared commons. They hold a churning mix:

- **Casks** (your deployed Ready casks — public action-buildings + your cargo; they leave when shipped).
- **Ships** (owned infrastructure you built; they load casks and sail away — §5).
- **Neutral buildings** (2–3 seeded at setup; shared base actions; permanent) — so the ring is alive from turn 1.

**One rule for all of them:** when a line fires, the active player **may use each building on that line.** All building actions resolve **on the active player's turn, for the active player** — there are **no out-of-turn gains** (the thing that felt counter-intuitive in v0.6 is gone). Cask and neutral actions are **free and public** (a rival using your cask's action is incidental — it is on *your* circuit, doing *your* work, while you wait to ship it).

### Signature cask actions (by type — public, chunky, loop-advancing) ⚙
Each is a "support action" in the Lisboa sense — it pushes the loop forward, and the climb makes higher types stronger:

| Type | Q | Signature wharf-action |
|---|---|---|
| **Gruit** | 1 | **Source** — take 2 goods |
| **Hopped** | 2 | **Age** — advance any 1 of your casks 2 steps |
| **Summit L3** | 3 | **Load** — load a Ready cask onto a ship for free |
| **Summit L4** | 4 | **Reach** — +1 presence at a kontor you've delivered to (majority help) |
| **Summit L5** | 5 | **Wild** — take any one base verb (Source / Brew / Age / Ship) as a bonus |

> *Why this fixes the old "lackluster tile":* the action is chunky and advances *your* loop, and **which type you brew is now an engine choice** — you're deciding which action-building to put on your circuit, not just paying a cost.

---

## 5. Ships & destinations (the cash-out)

### Ships — owned, single-use carriers (build → load → sail)
- **Build** (Market): a **Cog** (capacity **2**) or **Hulk** (capacity **3**) ⚙ goes into a perimeter slot, **bound to a destination** of your choice, inheriting that destination's **quality gate**.
- **Load:** put a **wharf** cask aboard — via the **Harbor verb** (always available) **or** when the **ship's line fires** (a bonus free load). Loading is not restricted by where the cask sits on the wharf, and may take a **rival's** wharf cask (§ below).
- **Sail** (the instant it is **full**, or via an early **Harbor launch**): every cask aboard is **delivered** to the ship's destination → it **scores for its owner** (§9) and leaves the board; the **ship tile is consumed onto the shared Sailed-Ships track** (§8) — single-use, build another to ship again.

### Charter — the single-cask relief valve (no tile; an outside hull)
Owned ships are consumed when they sail, and the wharf is tight, so the loop needs an escape that can't be locked out. At the **Harbor** you may always **Charter**: pay **⚙2 `G`** to ship **one** Ready cask — from a **vessel** *or* the **wharf** — on an **immediate single-cask voyage** to a destination it qualifies for. It **delivers** (scores + benefit, §9) and **advances the Sailed-Ships clock** (§8) like any voyage; it just carries one cask for the fare, so building Cogs/Hulks stays the efficient race. The Charter is the **deadlock guard**: when the ring is full and you own no ship, or a Ready cask clogs a vessel, a charter always frees you (you can always Source the 2 `G`). *(Theme: a 1350 brewmaster who hasn't a hull of their own books space on someone else's.)*

### Destinations — *where you ship is the strategic lean* (all open from start)
The old two value tracks are replaced by destinations, each with a distinct **benefit** and a **quality gate** (the only "level-up" limiter — better places want better beer):

| Destination | Gate ⚙ | Identity — value + benefit (owner picks where a choice is offered) ⚙ |
|---|---|---|
| **Bruges** (Hub) | Q1 | low value · **liquidity:** gain goods. Takes any beer — the volume on-ramp. |
| **London** (Steelyard) | Q2 | mid value · **a brewery upgrade** (the engine destination). |
| **Bergen** (Monopoly) | Q2 | mid value · **a modifier tile** + the richest **majority** (narrow & contested). |
| **Novgorod** (Long Haul) | Q3 | **highest value** · premium only — the volume summit. |
| **The Hall** (Prestige) | Q2 | **prestige points** scaling with the cask's quality — taken *out of commerce* (the scarcity/Westvleteren lean). |

- **Most delivered casks at a kontor = its majority bonus** ⚙ (Bergen rewards this most). Presence at a kontor = your delivered casks there.
- **The cask's owner always scores the delivery and picks any offered benefit** — even when a **rival** shipped it (§ below). This is the climb-and-variety engine: deliver → earn an upgrade/modifier → brew better → deliver better (the Distilled "selling funds your next still" loop).

### Shipping a rival's cask (the non-destructive interaction)
On your turn you may load a **rival's wharf cask** onto **your** ship (only wharf casks — never their brewery). When it sails:
- the **destination is your ship's binding** (you chose where), but it must be **legal for that cask's quality**;
- the **owner scores the delivery and picks its benefit** — they always gain (it is never purely harmful);
- **you** get the freed slot, the filled ship (toward *your* end-clock), a small **loader bonus** ⚙, and you control the **timing**.

> Net positive-sum with a timing twist: you help a rival a little, on *your* schedule, while capping what they were holding out for and advancing your own game. Theme cover: *a 1350 brewmaster does not fully control where their casks end up.* The tuning knobs are the **loader bonus** and the **value gap** between a cask's best destination and where a rival can force it (§ Open).

---

## 6. The brewery & upgrades (your private engine)

Your brewery board is private and safe. It holds your **vessels** (start 2, cap 4 ⚙ — throughput), your **recipes**, and your **upgrade slots**. Upgrades are the engine-building / "get ahead" layer and where strategies diverge:

- **Rooms** (permanent): **Extra Vessel** (a brewing lane), **Aging Cellar** (faster maturation; unlocks the L5 summit), **Warehouse** (+storage), **Quay** (a stronger Harbor), etc. ⚙
- **Modifiers** (asymmetric, permanent): e.g., *"when you gain hops, +1 extra"* — the variety levers, mostly **earned by delivering** (London / Bergen rewards), some buyable at the Market.

Goals (§9) reward different brewery/delivery shapes, so the winning engine varies by game — the *Great Western Trail* ideal (a blend, chosen as you read the board, beats a one-note rush).

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
2. **Majorities** — the route-majority bonus at each kontor (most delivered casks; ties split ⚙).
3. **Goals** — resolve your goal/objective tiles; **best few score** ⚙ (the variety layer).
4. **Tiebreak:** most goods, then most casks on the wharf.

> The volume-vs-prestige tension lives here as a **lean**, not two silos: spread casks wide across kontore for value + majorities, *or* send your best out of commerce to the Hall for big single hits — coupled by shared casks, scarce wharf slots, scarce ships, and the one shared end clock.

---

## Open / to tune

- **Warm-start contents** (1 Cog + 1 Ready cask?) and **starting vessels** (2?) vs the **Sailed-Ships length** — the joint pace dials; target first voyage ≈ turn 2–3, a **12–25-round game**, and a 2p game ≈ 45–60 min.
- **Charter cost** (⚙2 `G`) and whether it advances the clock — the relief-valve dials. Too cheap and it eclipses owning ships (the merchant fantasy); too dear and the deadlock guard bites. It must stay *strictly worse per cask* than a Cog/Hulk.
- **Cask-action strengths** (free Source 2 / Age 2 / free Load / +1 presence / Wild) — keep them chunky without making the ring swingy. Whether *every* cask bears an action or only "set-working" ones.
- **Destination values, gates, and majority bonuses** — the heart of the variety; how hard to gate the rich destinations behind quality (the climb) vs leaving them open (variety).
- **Shipping a rival's cask:** the **loader bonus** size and the **best-vs-forced destination value gap** — the non-destructive interaction dials (watch mild kingmaking on who you help).
- **Ring pressure:** 8 slots shared by casks + ships + neutral buildings — tight by design; whether 2p locks some and 5p needs relief; whether a clogged vessel is too punishing.
- **Upgrades/modifiers:** which come from deliveries vs the Market; how asymmetric the modifiers run.
- **Goals:** how many, shared vs personal, and the best-few cap (the GWT blend lever).
