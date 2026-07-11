# v3 Path A — the plan of changes (thought exercise · NOT yet built)

> **Status: DIRECTION DOCUMENT (2026-07-11).** Synthesis of the fresh-eyes exploration
> (`FRESH-EYES.md`) and the designer's response to it. This is the follow-through of the thought
> exercise — a complete change plan + component list for a v3.0 "Path A" build. **No build yet;
> no rules/engine/page changes ride on this commit.** Every number is ⚙. Where the designer has
> ruled, the item is marked **[ruled]**; where the fresh-eyes doc proposed and the designer has
> not yet spoken, **[open ⚙]** with the evidence pointer.
>
> Standing inputs: the v94 play-by-play corpus (`playtests/logs/REVIEW-NOTES-v94.md`), the human
> logs, `FRESH-EYES.md`, and the designer's 2026-07-11 responses (quoted where load-bearing).

---

## 0. The design stance (from the designer's response)

1. **Fewer options per stop, not weaker actions.** "Or vs and is not as important to me as more
   choice adds to the analysis paralysis" — the cap is **≤2 actions per station**, printed.
2. **The dice stay.** Bank-at-the-gangplank is rejected on institutional memory: *"we used to
   score points when casks are loaded but it meant there was little motivation to fill ships.
   Filling the ship means everyone gets their reward."* The die remains the ONE component that
   tracks value regardless of source. The fix is (a) simplify **what sets it** and (b) redesign
   the **carrier UX** (ships become a component built to hold cubes + dice) — *"it is possible
   that the mechanics are sound but the UX of the components isn't."*
3. **Buildings loosen what the stations tighten.** As stations compress to ≤2 verbs, buildings
   become the growing supply of actions *and* value manipulation (the Agricola read: the board
   gains places to act as the game progresses).
4. **Cask actions become specific gains** — "gain 1 building, brew 1 cask, gain 1 upgrade,
   enshrine 1 cask, gain 1 recipe" — not general verbs.
5. **The Floor becomes the engine you build**, structured (slot-limited, Flight-unlocked), and
   it must adopt real pull (a station-grade action) at the price of not visiting the wharf.
6. **Lanes:** majorities stay; the Hall stays; the Flight becomes (also) an **unlock track**.
   The clock stays **dispatch-count only** (sails + charters + enshrines — collectively
   *dispatches*). "More end-game trackers is more analysis paralysis. The game-as-spreadsheet is
   the biggest issue."

---

## 1. The turn (spine unchanged)

Move to an adjacent station (mandatory from turn 2) → choose **row · column · Floor** → resolve
the line's stops in any order, all optional. Occupancy toll 1G ⚙ on public lines while sharing a
station; the Floor never tolled. **[ruled: spine untouched]**

**The locality rule [ruled]:** *a slot's stop acts on that slot; a station's verb reaches the
whole wharf.* Deploy at a slot deploys **onto that slot**; a ship's stop loads **onto that
ship**. The Brewhouse's deploy and the Harbor's load remain the two global valves.

---

## 2. The four station faces (≤2 actions each) [ruled, with one open variant]

| Station | Face ⚙ | Notes |
|---|---|---|
| **A · Market** | **SOURCE 2 goods / ACQUIRE 1 tile** | Acquire = any ONE of: recipe · Privilege/Building (place at once) · ship commission · charter contract — *(variant V1, below: + Specialist)*. The commission wizard shrinks: place the hull on a legal slot; the only free load is the **dockside pickup** (place it ON a boardable cask). |
| **B · Brewhouse** | **BREW 1 recipe / DEPLOY 1 Ready cask → any open slot** | The wharf-wide deploy lives here and only here (the global valve behind locality). |
| **D · Cellar** | **AGE (3 points ⚙ across vessels) / UPGRADE (buy 1 Specialist from the display)** | Tap is retired as a verb (its recall job lives in over-deploy, §3). Blend (Specialty Beers) prints as an alternate use of AGE ⚙. |
| **C · Harbor** | **LOAD 1 cask → a hull / DISPATCH 1 deployed cask** | **Dispatch [ruled]** = one gesture, two routes: the **Hall** (free, prestige ladder, Q2+) or a **kontor** (spend a contract + 2G ⚙ fare). Quaymaster reads "Load/Dispatch from your vessels." |

- **Or vs and:** default reading ⚙ — Market and Brewhouse are **or**; Harbor and Cellar are
  **either or both, each once** (the designer wrote "load + dispatch", "age + upgrade"). This is
  a table question; the cap (≤2 printed actions, each once) is the rule that matters. **[open ⚙]**
- **Variant V1 [open ⚙, designer-floated]:** move the Specialist purchase into Market ACQUIRE
  (one shop for everything). Then the Cellar face becomes **AGE / TAP-ONE?** or simply **AGE**
  (+Blend with the expansion). Trade: one-stop shopping and a thinner Cellar vs a 5-way Acquire
  and the loss of the Cellar's second job. Decide at the paper table.

---

## 3. The wharf slots — occupancy, over-deploy, over-build [ruled]

A slot = `[building?] + [ship | cask]`, as today. Three churn rules, one family:

1. **Over-build** (exists, kept): place a building on an occupied building slot for the **1G
   ground rent** ⚙; the displaced tile flips to its owner's floor as a **Wild** — **and banks
   NOTHING at game end** (§6). Neutral tiles are discarded.
2. **Over-deploy your own [ruled — the designer's twist]:** you may deploy a higher-quality
   Ready cask onto a slot holding **your own** lower-quality cask. The displaced cask is
   **tapped on the way out** — fire its printed action once, then it returns to the box. *"You
   store a cask to reserve the space… you 'tap' when you over-deploy."* This is Tap, reborn as a
   placement rule instead of a menu: parking a cask = reserving the berth + a banked action.
3. **Spoilage, generalized [ruled ⚙]:** **any player** may deploy a Ready cask of higher quality
   onto **any Gruit (Q1)** — the stale ale is dumped (boxed, no tap; spoiled beer serves nobody).
   *(v2.9's Q4-over-Q1 rule widens to any-higher-over-Q1; rival non-Gruit casks remain safe.)*

Together: the ring never locks, parked casks are a deliberate reservation with a payoff, and
Gruit squatting is everyone's problem to solve. **Ship-channel guarantee [open ⚙, from
FRESH-EYES §6.1.7]:** a hull may be commissioned onto a building-only slot (it docks at the
work) — recommended so a fully-built ring can never close the harbor (the 3p-2 hole).

---

## 4. Ships, dice, and the carrier UX [ruled: dice stay; component redesign]

**The mechanics hold; the carrier changes.** Delivery stays v2.3: *destination starting value +
the ONE die*. The two moves:

### 4a. Simplify what sets the die — one read, no formula

The die is set to **the single printed ★ on the privilege** at the moment the cask departs the
slot. No quality premium arithmetic, no lead-state check at set-time, no sail bump, no cap rule
(no tile prints above 6; one die per cask; ship-slot value tiles are retired as value — §5).
Setting a die = reading one number off the tile under the cask. The quality climb is paid where
quality is *read from the components*: Novgorod's printed scale, the Hall's printed ladder, and
the quality-gated privileges (Connoisseur), not by a premium formula. *(This retires the v1.8
+2/+3 premium as arithmetic; its job moves into tile design — watch the climb's payout in sim ⚙.)*

### 4b. The hull becomes a carrier component ⚙

A redesigned ship tile/board sized for its cargo (closes `COMPONENTS.md` §17 gaps #3/#12):

- printed: hull name · destination chip · quality gate · **its destination's value row**
  (e.g. the Novgorod hull prints Q3→2 · Q4→4 · Q5→6) · numbered berths.
- each berth is a **well** holding: the owner's **cask cube** ⚙ (colour = owner) + the cask's
  **demand die** (if any) + the **+1Q marker** (if lifted).
- the cask **card** leaves the wharf at load and goes to its owner's **manifest row** (beside
  the player board), standing on end / face-up: it carries beer identity + quality to delivery.
  When the hull sails: slide manifest cards to *delivered* (mark the Flight strip, place the
  presence disc), read each berth's die + the hull's printed value row, return cubes and dice.
- load order = berth numbers (already printed).

Open carrier questions to settle at the paper table ⚙: whether the manifest row reads better
than tucking cards under the hull's edge; whether the die should instead be set to the **total**
(base+bonus, since the destination is known at load — needs a d10/d12 or value chips, but makes
delivery a pure die-read); cube supply per player (≈6 ⚙).

---

## 5. Buildings — the growing action board [ruled in direction; catalog ⚙]

**One grammar, one new clause.** A building modifies the occupant docked on it (unchanged) —
**and a building-only slot's stop is now a this-or-that: DEPLOY here, or the building's printed
ACTION (if it has one).** The wharf literally grows action spaces as tiles are authored — the
Agricola read. Three colour-coded types stay (PRIVILEGE blue · BUILDING/work green · SPECIALIST
purple).

### 5a. Privileges (blue — set the die for the OWNER's departing cask; one printed ★)

| Tile | Printed effect ⚙ | Qty ⚙ |
|---|---|---|
| Staple Hall | die **3** (any kontor) | 2 |
| Bruges Hanzehuis / London Steelyard / Bergen Bryggen / Novgorod Peterhof | die **4**, only to the printed kontor | 1 each |
| Connoisseur's Cellar | die **5**, Q4+ casks only | 1 |
| Burgomaster's Favor | die **= the cask's quality** (pip-count read, max 5) | 2 |
| Hanse Diet | die **2** + place 1 presence at the destination | 1 |
| Almoner's Stall | die **3** if you have **no presence disc** at the destination yet | 1 |
| Reliquary | die **2**, on a Hall dispatch from here | 1 |
| Salt House *(exp)* | owner +1G +1H when the cask departs | 1 |

*(Rich Berth and Festkeller leave the privilege class — their "at the sail" moment is the
recompute problem. Redesigns below.)*

### 5b. Works (green — serve any dock; several now carry a printed ACTION for their slot's stop)

| Tile | Effect ⚙ | Action on the stop? ⚙ | Qty ⚙ |
|---|---|---|---|
| Malt Kiln | docked cask ships +1Q (marker at departure, cap Q5) | — | 2 |
| Hop Yard | Q2+ docked cask ships +1Q | — | 1 |
| Cooperage | ship here carries +1 cask | — | 2 |
| Customs House | ship here boards casks one gate lower | — | 2 |
| Brewmaster's Workshop | docked cask acts as Wild while it stays | — | 1 |
| **Rich Berth′** (redesign) | a hull docked here may **sail one berth short** | — | 2 |
| **Pilot's House** (new) | — | stop: **re-destination one docked hull** to an adjacent-gate kontor ⚙ | 1 |
| **Open Staithe** (new) | an **un-Ready** cask may deploy here; +1 maturation on its owner's turn | — | 1 |
| **Rope Walk** (new) | — | stop: **gain 1 charter contract** | 1 |
| **Grain Exchange** (new) | — | stop: **convert up to 2 goods** G↔H | 1 |
| **Mission Quay** (new) | — | stop: **age one of your vessel casks +1** | 1 |
| Smoke Kiln / Parti-Gyle Tun *(exp)* | as today | — | 1+1 |
| ~~Gauger's Office~~ | **cut** (confirmed dud — authored ~8×, scored ~once in 30 games) | | — |
| ~~Festkeller~~ | **cut from base** ⚙ (never scored; candidate expansion flavor) | | — |

Deck ≈ **22 tiles / 19 designs** ⚙ · Wharf display of 4 · 2 neutral green works seeded at setup
(unchanged). The action-works are deliberately station-fragments: small, once-per-activation,
and they make *lines with authored tiles* strictly richer — the designer's "buildings loosen
what the stations tighten."

### 5c. Specialists (purple — the Floor's crew; bought per §2, or V1 at the Market)

| Tile | Effect ⚙ | Note |
|---|---|---|
| Cellarman | your brews mature one step sooner (Ready −1) | keep |
| Grain Factor | gain grain → +1 extra | keep |
| Hop Gardener | gain hops → +1 extra | keep |
| Stevedore | your Harbor LOAD sets out 2 casks | keep |
| Quaymaster | LOAD/DISPATCH straight from your vessels | keep (the deploy-first exception) |
| Lagerkeeper | **rework ⚙:** +2 to your Floor's AGE pool (was: all vessels +1/turn) | avoids double-dipping with the Floor's new Age (§6) |
| Coppersmith | **rework ⚙:** counts as one already-unlocked Floor slot of your choice (was +1 vessel) | vessel count now lives on the unlock track (§7) |

Deck = n−1 copies each, display of 4, area cap — **now the Floor's specialist slots** (§6).

---

## 6. The Floor — the engine you build [ruled in direction; numbers ⚙]

The Floor is a structured private line on the player board, with **slot rows**:

- **CASK slots (vessels)** — start **2** ⚙ (grows via the Flight track, §7; designer: "increase
  the number of cask slots" relative to buildings)
- **SPECIALIST slots** — start **2** ⚙ (grows via §7)
- **FLIPPED-BUILDING slots — capped at 2** ⚙, never more ("up to 2 displaced buildings")

**Activating the Floor** (instead of a public line) resolves, any order, all optional:

1. **AGE 3 points ⚙ across your vessels** — the Floor adopts the Cellar's signature: *"you would
   need to activate your floor to age faster than 1 per cask per turn"* **[ruled]**. (The
   passive +1/turn auto-age stays ⚙; the Cellar station also keeps AGE — a deep brewery can do
   either, and the wharf-Cellar remains worth visiting for UPGRADE. Watch double-aging pace in
   sim ⚙.)
2. **Each vessel cask's printed action** (the cask stays — holding casks powers the house).
3. **One Wild per flipped building** (max 2 by the cap).

**Flipped buildings bank NOTHING at game end [ruled]** — *"if a building goes into a floor slot,
it shouldn't give the 3 point overbuild benefit."* The floor-points lane is **removed**; a flip
is engine (a Wild stop), not score. This closes the self-overbuild mint and the victim-payday
inversion in one stroke, harder than any rival-only clause.

Guardrails carried from the evidence **[open ⚙ each, recommended]**:
- **A null Floor is not a legal line** (kills the 2p-10 mutual-stall pass).
- **Stay-home** ⚙: choosing the Floor means your worker does not move this turn (the positional
  price that makes wharf-vs-Floor the "two good things, one turn" agony).
- **Churn watch:** acquisition actions (gain-building/gain-specialist) DO fire from the Floor in
  this design (they are cask actions, and casks are the Floor) — the 3p-8 survey-loop risk is
  re-priced by no-flip-points + the 2-flip cap + rent, but it gets a dedicated sim counter
  (buildings gained from Floor turns/game ⚙) before the table.

---

## 7. The Flight as an unlock track [ruled in direction; triggers ⚙]

The player board carries one **Flight/unlock strip** — a row of beer spaces (Gruit · Hopped ·
the 3 dealt exports · Jopenbier when on):

- **Unlocks (new):** mark a beer when you **first BREW it** ⚙. Your 2nd distinct beer unlocks
  **Floor slot 3**, the 3rd unlocks **slot 4**, the 4th **slot 5**, the 5th **slot 6** ⚙ — each
  unlocked slot is placed on the **cask or specialist row, your choice** ⚙ (the flip row stays
  capped at 2). Brewing breadth literally grows your house.
- **Points (kept ⚙):** distinct beers **DELIVERED** still score the Flight ladder
  ((beers−1)², min 3) — same strip, a second mark (e.g. flip the beer chit face-down on
  delivery ⚙). **[open ⚙: designer floated "instead of points (or maybe both)" — default:
  both, with the ladder available to re-tune down if breadth double-pays.]**
- One strip, two mark states, zero new trackers: brewed = unlocked, delivered = scored.

*(Interlock: Coppersmith reworked (§5c) so vessel growth doesn't double-source. The base game's
five beer types mean max 4 unlocks — slots 3–6 — reachable but not free; the Jopenbier capstone
adds a 5th ⚙.)*

---

## 7b. The Hall — the shelf board [ruled in direction; values ⚙]

**The fixed 3/5/7/9 payout table becomes a BOARD** — the Orléans read (Beneficial Deeds): a
printed Hall with **shelf rows gated by quality**, each shelf holding a small number of **cask
spaces**, each space printing **one bonus icon**. Enshrining is now *placing your beer in the
guild's hall* — visibly, permanently, on a shelf the whole table reads.

**The structure ⚙:**

| Shelf | Gate | Row ★ ⚙ | Spaces ⚙ | Space bonuses (one icon each, from the §8 gain vocabulary) ⚙ |
|---|---|---|---|---|
| IV — the High Board | Q5 | **9** | 2–3 | unlock 1 Floor slot · +3★ · gain 1 Building (free, placed at once) |
| III — the Masters' Shelf | Q4+ | **7** | 3 | gain 1 Specialist (free) · place 2 presence · age all vessels +1 |
| II — the Long Shelf | Q3+ | **5** | 4 | place 1 presence · gain 1 recipe (free) · +3 goods · age a cask +2 |
| I — the Common Shelf | Q2+ | **3** | 4–5 | +2 goods · +1 contract · age +2 · +1G +1H |

*(Row ★ = the familiar ladder, kept as the row label — one read. The space adds one bonus
icon — a second read. Nothing is computed anywhere.)*

**The rules ⚙:**

- **Enshrine (via Dispatch, or the Q4+ cask action)** = choose any **open space on a shelf whose
  gate your cask's effective quality meets** — a Bock may take a Common-Shelf space for its
  bonus instead of the High Board's glory (a real, readable choice). Bank the **row ★**, take
  the **space's bonus**, **mark the space with your cube** (the cask card retires; the cube is
  the trophy and the record).
- **Never nothing:** if every shelf you qualify for is full, enshrine anyway for the best
  qualifying row's ★ — no bonus, no cube ⚙. The Hall stays the always-open outlet; only the
  *honors* are scarce.
- Kiln/gauge lifts reach higher shelves (effective quality, one rule as everywhere); the
  **Reliquary** privilege still adds its +2★ ⚙ on the way in; an enshrine still **ticks the
  clock as a dispatch** (§9, unchanged).
- Active spaces per shelf scale with player count ⚙ (≈ n+1, bounded by the printed row — the
  same convention as the Trade Roads slots).

**What this buys:** the Hall becomes the table's second visible race (the majority chart's
missing twin) — every enshrine is a public claim rivals price, and the "quiet private ladder"
problem dies at the root. The bonus menu speaks the same icon language as the cask actions (§8)
and the action-works (§5b), so it teaches for free; a High-Board space feeding the Floor unlock
track (§7) ties the prestige and engine lanes together with zero new rules.

**What it costs, honestly:** the Hall's designed identity was the **uncontested pole**
(contested kontore vs the uncontested Hall). The shelf board contests the *honors* while the
overflow keeps the *outlet* uncontested — the intended compromise, and the pole-test watch-item
⚙: if space-racing makes late enshrines feel negated, widen shelves or fatten the overflow.
Second watch: bonuses make cheap enshrines *more* attractive — the Common Shelf must stay
goods/tempo only (never engine pieces), and the enshrine-tick pace dial (§9) stays on standby.
Third: at the corpus's ~2–5 enshrines/game, shelves fill mostly at 3–4p — pressure, not
starvation, but the counts ⚙ want sim + table reads.

**Component:** one printed Hall board (supersedes the passive "display shelf" idea in §9);
reuses the player cubes (§10 supply check ⚙).

---

## 8. Cask actions — specific gains [ruled in direction; pool ⚙]

The 8-verb pool is replaced by **concrete acquisition verbs**, steerable piles unchanged (top of
each quality pile face-up; Gruit pinned):

| Action ⚙ | Effect | Pile gate ⚙ |
|---|---|---|
| **Gain 2 goods** | any mix | Q1 (Gruit pin) · Q2+ |
| **Age a cask +2** | one vessel cask | Q2+ |
| **Load 1 cask** | onto any eligible hull (free) | Q2+ |
| **Place 1 presence** | at a kontor you've delivered to | Q2+ |
| **Gain 1 recipe** | take a dealt-export recipe card, pay its buy cost −1G ⚙ | Q2+ |
| **Gain 1 building** | from the Wharf display, place at once (rent applies) | Q3+ |
| **Gain 1 specialist** | from the Cellar display, free | Q3+ |
| **Brew 1 cask** | pay its cost into an open vessel | Q4+ |
| **Enshrine 1 cask** | dispatch one deployed Q2+ cask to the Hall ⚙ *(ticks the clock as a dispatch — watch in sim ⚙)* | Q4+ |

Cut: Convert (→ the Grain Exchange work), Wild (→ the Workshop's dock effect and flipped-tile
Wilds only ⚙). Nine verbs, every one a specific gain — "what do I get" is printed, not derived.

---

## 9. Lanes, scoring, and the clock

- **In-game:** the Hall **shelf board** (row ★ + space bonus, via Dispatch — §7b) · kontor
  deliveries (destination starting value + the die). **[ruled: both stay as lanes]**
- **End-game:** kontor **majorities** (unchanged tiers; presence discs finite — printed cap 12 ⚙
  as the Reach wall **[open ⚙]**) · the **Flight** (points and/or unlocks, §7). **Floor bonus:
  gone** (§6).
- **The clock [ruled]:** the Sailed-Ships track advances **only on dispatches** — a full hull
  sailing, a charter, an enshrine. No new trackers. *(The Q-gated enshrine tick from FRESH-EYES
  §5.3 remains on the shelf as a pace dial ⚙ — the corpus's R9 stampedes and leader door-slams
  are real; re-read after this package changes the tempo economy.)*
- **Lane visibility:** the Hall shelf board (§7b) IS the display **[ruled]**; the Flight strips
  public **[open ⚙, recommended]**.

---

## 10. Full component list (v3 Path A box, base game) ⚙

| Family | Count ⚙ | Notes |
|---|---|---|
| Wharf board | 1 | 4 stations (new ≤2-action faces printed) · 8 slots · Sailed-Ships track |
| Destination board | 1 | 4 kontore (values + majority tiers) |
| **Hall board** | 1 | 4 quality-gated shelves × 2–5 bonus spaces (§7b); claimed with cubes |
| Player boards | 4 | vessels/specialist/flip **slot rows with unlock covers** + Flight/unlock strip + manifest row + storage + contracts |
| Cask cards | ~62 | 6 beers (16 Gruit · 20 Hopped · 6/6 Q3s · 8 Mumme · 6 Bock) — unchanged |
| Cask-action piles | 4 piles (Q2–Q5) | the §8 specific-gain verbs; top card face-up |
| **Hull boards** | 20 (11 Cog · 9 Hulk) | **new carrier format**: destination chip + gate + printed value row + numbered berth wells (§4b) |
| **Cask cubes** | ~32 (8 × 4 colours) ⚙ | ride the berth wells + mark Hall shelf spaces (§7b) |
| Demand dice (d6) | 8 | set to ONE printed number, once, at departure |
| +1Q markers | 6 | the only other rider |
| Privileges & Buildings deck | ~22 tiles / 19 designs | §5a/§5b (Gauger + Festkeller out; 5 new works in) |
| Specialist tiles | 21 (7 designs × 3) | §5c (two reworked) |
| Recipe cards | 16 export + printed starters | unchanged |
| Charter contracts | 20 | unchanged |
| Goods cubes | ~100 (60G/40H) | unchanged |
| Worker pawns | 4 | may **stay home** on Floor turns ⚙ |
| Presence discs | **12**/colour ⚙ | finite = the Reach cap |
| First-player + round markers | 2 | unchanged |

Removed from the v2.9 box: the Gauger's Office and Festkeller tiles, the developer/floor-points
concept, the Tap rules text, the cap-6/premium die arithmetic, the Convert & Wild cask actions.
Added: hull boards + cubes, 5 new works, unlock covers, the Hall shelf.

---

## 11. Open questions for the paper table (the ⚙ shortlist)

1. Market **V1** — Specialists into ACQUIRE, thinning the Cellar? (§2)
2. Or/and defaults per station (§2).
3. Die = bonus-only (d6) vs die = total (d10/chips) on the hull (§4b); manifest row vs tuck.
4. Retiring the v1.8 quality premium: does the climb still pay enough through
   Novgorod/Hall/Connoisseur? (§4a — first PATHWAYS read answers this.)
5. Floor guardrails: stay-home? null-Floor-illegal? acquisition-from-Floor churn counter. (§6)
6. Flight: both unlocks AND points, or unlocks-first with a trimmed ladder? Brewed vs delivered
   triggers. (§7)
7. Enshrine-as-cask-action (Q4+): does a line-fired enshrine tick feel right? (§8)
8. The shelved pace dial: Q-gated enshrine ticks, if R≤11 collapses persist. (§9)
9. Ship-channel guarantee: hull onto building-only slots. (§3)
10. The Hall board: space counts per shelf (n+1?), the bonus menu, whether a premium cask taking
    a low shelf banks the low row's ★ or its quality row's ★ (default: the low row — the bonus
    is the trade), and the pole-test read once contested honors land. (§7b)

## 12. Validation plan (when we DO build)

Standard gates (KEY bump · `sim.js 500` 0-crash/0-deadlock · pace 12–25 · `ai-ladder` ≥60% ·
`ai-render-smoke` · `ai-tune` re-run) **plus** the new counters from FRESH-EYES §6.4:
blocked-deploy rate (locality risk, alarm >8% ⚙), hull median fill-time, dead-turn rate,
enshrine share of ticks, rounds interquartile (the bimodality metric), buildings-gained-from-
Floor (the churn faucet), and Flight-unlock timing. Then the **same-seed 30-game narrate diff**
against `REVIEW-NOTES-v94.md` — each named v94 pathology (2p-10 stall · 3p-8 loop · 3p-2 brick ·
4p-3 stampede · 2p-2 stranding) is a regression test with a seed. Then the human table, with the
§9 visibility set in cardboard.

## 13. Explicitly unchanged

The 2×2 + 8-slot wharf and move-then-activate · the dual-role cask in three states ·
sail-only-when-full · deploy-first + the Quaymaster exception + commission's vessel door ·
Privileges-pay-owner / Works-serve-all · the destination values, majority tiers, the Hall's
row-★ curve (3/5/7/9 survives as the shelf labels, §7b) ·
recipe costs (Bock total stays 5 — the twice-rejected probe) · the occupancy toll · the ground
rent · the warm start · the three-colour taxonomy · the steerable piles · the three expansions
on their spine (Jopenbier's vintage cube remains the one bespoke rider, by identity).

---

## Appendix — the two independent fresh-eyes passes vs this plan

Two clean-context explorations answered the same brief independently: `FRESH-EYES.md` (this
repo's agent pass) and `v3-thoughts.md` (a second, separate session). Neither saw the other or
any prior internal exploration. Where they agree, treat it as strong signal; where this plan
diverges from both, it is because the designer has ruled.

**Both passes independently converged on:** ≤2-verb printed station faces · slot stops act on
their own slot · retiring the demand die by moving the privilege payout to a single immediate
moment ("bank at the gangplank" / "bank it at the sale") · keeping the Privilege class and the
authored-demand lane (both explicitly reject the all-Works wharf) · cutting the Gauger's Office ·
a null Floor being illegal · the Hall as a physical display + the Flight made publicly visible ·
no new scoring lanes · pricing the cheap enshrine tick as a pace dial · the same validation
shape (same-seed pathology regression tests).

**Where they fork from each other:**
- **Tap's ghost:** `FRESH-EYES` retires Tap entirely (recall lives in upgrade-in-place/spoilage);
  `v3-thoughts` moves Tap to the Floor as its signature self-throttling harvest verb. This plan
  takes the designer's third answer — Tap as the over-deploy bonus (§3.2).
- **Load locality:** `FRESH-EYES` keeps the Harbor's global Load; `v3-thoughts` deletes it
  (ship-local only, Harbor = Enshrine/Charter). This plan keeps Load global per the designer's
  "load + dispatch" face (§2) — the ship-local variant remains a live dial ⚙.
- **The ship channel:** commission-onto-building-slots (`FRESH-EYES`) vs the Tide + a paid
  sail-one-short Dispatch (`v3-thoughts`). This plan carries the first as [open ⚙] (§3); the
  Tide/paid-early-sail ideas join the dial shelf ⚙.

**The one place this plan overrules both (by designer ruling):** the dice stay (§4). Both
consultants chose immediate banking; both anticipated the v0.16 objection the designer raised —
their versions keep the DESTINATION's value + benefit + majority + Flight sealing at delivery,
so hull-filling motivation is preserved; only the *building's* cut banks early, and
`v3-thoughts` §3.2 argues bank-at-departure is the only fully memoryless timing. Recorded here
so the fork is decided with both cases on the table: **(i)** dice-stay + one-read set + carrier
UX (this plan, §4) vs **(ii)** no dice, privilege ★ banks at departure, delivery = printed
lookup. If the paper table finds the die still finicky even at one-read, (ii) is the tested,
twice-independently-derived fallback.
