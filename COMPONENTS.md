# Brewhouses of the Hanse — Components & Tile Deck (v0.7 — "The Wharf")

> Manifest for the v0.7 reel-in (`DESIGN.md` §21, 2026-06-05 — **supersedes v0.6/§20 where they conflict**). **All counts and values are placeholders ⚙;** the goal here is to enumerate *what objects exist and what each does*. Anything ⚙ is a tuning dial; ❓ is open.
>
> **v0.7 headline shifts:** the game is one loop — **Source → Brew → Age → Ship** — walked on the grid. The cask is a **dual-role action-tile** that matures privately, sits on the shared **wharf** (the perimeter ring) as a public **action-building**, then **ships to a destination** for points and leaves. **Cut from the box vs v0.6:** the demand-market track, the type-frontier display, **Fair** tiles, **route-lane** tiles, **Privilege** tiles (folded into Upgrades), the recipe **card deck** with its boons/tuck (recipes are now plain permission tiles), **aging cubes**, and the tableau-twin printing. **Added:** **neutral building** tiles and **destination benefit / modifier** tiles. Net: noticeably *fewer* parts and unique designs — squarely *Great Western Trail* footprint, not Lacerda.

---

## 1. Boards

| Component | Qty | Purpose |
|---|---|---|
| **Main board** | 1 | The **2×2 action grid** — the loop **A Market (Source) · B Brewhouse (Brew) · D Cellar (Age) · C Harbor (Ship)**; the clockwise circuit A→B→D→C walks the loop — plus the **8 perimeter slots = the wharf** (deployed casks, owned ships, seeded neutral buildings) and the shared **Sailed-Ships track** (the end clock). |
| **Destination / Route board** | 1 | The four **kontore** (Bruges · London · Bergen · Novgorod) and the **Hall**, each with its **quality gate**, **delivery value**, **benefit**, and (kontore) a **majority track**. Delivered cask tiles sit at their destination; this is where reach (volume) and prestige (the Hall) are tallied. |
| **Player brewery boards** | 5 | Each private & untouchable: **vessel lanes** (start 2, cap 4 ⚙ — brewing throughput), the **maturation track** (Brew → … → Ready, per cask), a **recipe rack** (the types you may brew), **upgrade slots** (Rooms + Modifiers), and **goods storage** (cap 8). No grid actions are duplicated here — the brewery is the *noun* the loop's verbs act on. |

### The wharf — the perimeter ring (8 slots)
- **8 live slots, 2 capping each line** (**2-player may lock some to ~6 ⚙**). They hold a **churning mix**: **deployed casks** (your Ready casks = public action-buildings + cargo-in-waiting; they leave when shipped), **ships** (owned single-use carriers; they sail away), and **2–3 neutral buildings** (shared base actions, seeded at setup so the ring is alive turn 1). **One fire rule:** on a line, the active player may use each building on it — all resolving **on the active player's turn** (no out-of-turn skims). Recipes and upgrades are **not** wharf tiles (they live on your brewery board).

---

## 2. Tokens & player bits

| Component | Qty (⚙) | Notes |
|---|---|---|
| **Grain cubes** | ~60 | Brewing input #1; the medium of exchange. |
| **Hops cubes** | ~40 | Brewing input #2; needed for Hopped & the export (the beer that travels). |
| **Worker pawns** | 1 / player | The grid worker that walks the loop. |
| **Ownership discs** | ~20 / player color | Mark a cask's owner once it sits on the **wharf** or is **delivered** (casks are a shared-pool tile, so ownership is by disc, not by color set). |
| **Majority markers** | per kontor | Resolve route majorities at scoring. |
| **First-player / round marker** | 1 | Turn order / round clock. |

> **No VP tokens, no standing markers, no demand-market markers, no aging cubes** (all retired). Score is tallied at game end from delivered casks + majorities + goals — there is no running points track to maintain mid-game beyond the **Sailed-Ships** end clock.

> **Casks are a shared supply with fixed global counts** (L1×16 · L2×20 · L3×12 · L4×8 · L5×4 ⚙) drawn from by all players — you **brew** them (never buy), so the rare export casks are a **contested** resource. A player's cap is "what's left to brew." No per-player cask colors; ownership is a disc once a cask hits the wharf.

---

## 3. The tile families

Five tile families + the destination board. **Casks (A) are the content heart; the rest is the lean economy around them.** No card deck (recipes are plain tiles).

### A. Cask tiles — the dual-role hero (~60 tiles, shared supply)
Single working face: **type · quality (Q1–Q5, printed) · one signature action**. A cask lives in **three states** (`RULES.md` §2): **maturing** (private vessel) → **on the wharf** (a shared slot — your cargo-in-waiting + private inventory + a **public action-building**) → **delivered** (shipped → scores → gone). Brewed from a recipe you hold; ages to Ready; deploys to the wharf; ships to a destination.

| Level | Type | Quality ⚙ | Brew inputs ⚙ | Maturation steps ⚙ | Signature wharf-action ⚙ | Qty ⚙ |
|---|---|---|---|---|---|---|
| **L1** | **Gruit Ale** | 1 | `G` | 1 | **Source** — take 2 goods | 16 |
| **L2** | **Hopped Beer** | 2 | `G H` | 2 | **Age** — advance a cask 2 steps | 20 |
| **L3** | *export ⚙* | 3 | `G H H` | 2 | **Load** — load a Ready cask onto a ship free | 12 |
| **L4** | *export ⚙* | 4 | `G G H H` | 3 | **Reach** — +1 presence at a kontor you've delivered to | 8 |
| **L5** | *export ⚙* | 5 | premium; needs Aging Cellar | 3 | **Wild** — take any one base verb as a bonus | 4 |

> **Export roster (dealt to L3–L5 in a variable order each game) ⚙:** real Hanse export beers — **Bock** (Einbeck), **Mumme** (Braunschweig), **Broyhan** (Hannover), **Keut** (Low Countries). The fixed on-ramp is **Gruit → Hopped**; the export is variable, so the efficient climb differs every game.

*Gruit is the cheap, fast workhorse — it keeps your goods flowing (its action) and reaches Bruges, but it never makes prestige. The export casks are scarce, slow, and the key to the rich destinations.*

### B. Ship tiles — owned single-use carriers (~13 tiles)
Built at the **Market**, placed in a wharf slot, **bound to a destination** (inheriting its quality gate). **Load → fill → sail:** loaded via the Harbor verb or a bonus load when the ship's line fires; the instant it is **full** (or launched early) it **sails** — casks deliver, the **ship is consumed onto the Sailed-Ships track** (the end clock). Build another to ship again.

| Ship | Capacity | Qty ⚙ |
|---|---|---|
| **Cog** | 2 | ~8 |
| **Hulk** | 3 | ~5 |

> **Charter** (no tile — an outside hull): at the Harbor you may always pay **⚙2 `G`** to ship **one** Ready cask (vessel or wharf) on an immediate single-cask voyage (it still consumes a Sailed-Ships slot). Strictly worse per cask than owning a Cog/Hulk, it's the relief valve that keeps the tight ring from ever deadlocking (`RULES.md` §5). It adds **no component** — just an action on the board.

### C. Neutral building tiles — the shared base, seeded in the ring (~6 designs ⚙)
A small set placed in perimeter slots **at setup** (shared, permanent). They keep the wharf alive from turn 1 and give everyone a base action where they sit — e.g., **Market Stall** (+1 good), **Cooper** (advance a cask 1), **Crane** (free load onto a ship), **Counting-House** (convert/relabel goods). The active player may use the one on their line, free. ~2–3 in play per game ⚙.

### D. Recipe tiles — permission to brew a type (~10 tiles ⚙)
A small face-up Market supply. A recipe = **a type you may brew + its `G/H` cost** — nothing more (the v0.6 on-collect boons, the 6-card tuck, and frontier-gating are **cut**). Acquired at the Market; **permanent** (brewing never consumes it). Start: **Gruit + Hopped** (fixed); collect export recipes to climb. ❓ light hand limit.

### E. Upgrade tiles — the private brewery engine (Rooms + Modifiers, ~24 ⚙)
Installed on your brewery board. They come from the Market's **face-up Upgrade display** (option B): a row of ~4 ⚙ tiles drawn from a shuffled Upgrade supply, refilling as taken. **Buy** one (pay its cost) **or earn** one *free* by delivering to **London / Bergen / Novgorod** — the *same* display — closing the loop (deliver → upgrade → brew better → deliver better). (Recipes & ships are a separate always-available supply.)
- **Rooms** (permanent capability): **Extra Vessel** (+1 brewing lane), **Aging Cellar** (faster maturation; unlocks the L5 export), **Warehouse** (+storage), **Quay** (a stronger Harbor / deploy reach), **Cooperage**, etc.
- **Modifiers** (asymmetric, permanent perks — these subsume v0.6's Privileges): e.g., *"when you gain hops, +1 extra,"* *"your ships sail with +1 capacity,"* *"+1 good when you deliver to Bruges."* The variety levers that make different players' engines diverge.

### F. Destination board (not tiles) + majority markers
The four kontore + the Hall, each with its **gate / value / benefit** (`RULES.md` §5) and (kontore) a majority track. Delivered cask tiles sit at their destination, marked by ownership discs.

### G. Goal / objective tiles — the variety layer (~10 ⚙)
A small set (shared draft or per-player) rewarding different delivery/brewery shapes — most distinct types delivered, most casks to one kontor, most premium delivered, most ships sailed, a fullest brewery, etc. **Best few score** ⚙ (the *Great Western Trail* blend lever: a one-note rush should lose to a board-read blend).

---

## 4. Approximate box footprint

- **1 main board** (grid + wharf + Sailed-Ships track) · **1 destination board** · **5 brewery boards**
- **5 tile families + goals**, on the order of **~120 tiles** total ⚙ (down from v0.6 — recipe deck, Fair, lane, and Privilege families removed; neutral buildings + modifiers added), with **only ~30 unique designs** (the bulk is cask & upgrade copies).
- **~100 wooden cubes** (grain/hops) · **~20 ownership discs / color** · **5 workers** · majority + first-player markers. **No VP/standing/demand/aging tokens.**

This is squarely **medium *Great Western Trail* footprint** — substantial table presence, far short of a Lacerda sprawl, matching the v0.7 weight target (`DESIGN.md` §21A).

---

## 5. Resolved & still-open

**Resolved (now canonical — see `DESIGN.md` §21, `RULES.md`, `TILES.md`):**
- **The loop = the grid:** A Market (Source) · B Brewhouse (Brew) · D Cellar (Age) · C Harbor (Ship); the circuit walks it; cells never blocked.
- **The cask = a dual-role action-tile** in three states (mature → wharf → delivered); shipping converts it; only wharf casks are public/contestable.
- **The wharf = the ring** holding casks + ships + seeded neutral buildings; one fire rule; no out-of-turn gains.
- **Value lives in destinations,** not two tracks: kontore (trade/volume + majorities) vs the Hall (prestige). Aging is the value-over-time signal.
- **Recipes are plain permission tiles;** Privileges fold into Upgrades/Modifiers; Fairs, lanes, the demand market, twins, and aging cubes are **cut**.

**Still open ⚙ / ❓:**
1. **Cask counts & maturation lengths** vs the Sailed-Ships clock length — the joint pace dials.
2. **Destination values / gates / majority bonuses** and which **upgrades/modifiers** come from which destination — the variety heart.
3. **Neutral-building set** (which 6 designs, how many in play, scaling by player count).
4. **Ring pressure** at 2p (lock slots?) and 5p (relief?); whether a clogged vessel is too punishing.
5. **Goals:** count, shared vs personal, best-few cap.
