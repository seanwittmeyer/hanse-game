# v5.6 “The Glut” — the market only falls, and every prize pays

*Designer-ruled 2026-08-23. `KEY hanse-v56`. Operational rules: `RULES.md` §5c + §7.
Manifest: `COMPONENTS.md` §2 + its §10 delta. Rationale digest: `DESIGN.md` §9; watches §10.*

---

## 1. The ruling, in the designer's words

> *"When a ship delivers casks to a kontor, each type of beer is moved down the track 1 space.
> The only time it goes up is with the bourse ±1, +1, or +2 actions. Those should be reserved
> to buildings and most likely private actions."*

> *"we don't need a fallback as the points are the fallback."*

> *"The strip we build can simply be added to the destination board. One track with spaces big
> enough for all of the beer tokens to fit. Beer tokens match color and have a name on them."*

---

## 2. Where it came from — Lisboa, decomposed

The designer brought Lisboa's economy track as the model: shops generate goods, each type
steps down **once per activation regardless of how many goods**, and better ships built later
pay more per good so volume replaces unit price. Three lessons came out of it:

1. **One step per EVENT, not per unit.** Our rise was *"+1 per cask, cap +3"* — that is
   counting at the table. Lisboa says: the event happened, move one.
2. **Monotone decay is trivially trackable.** A marker that only ever walks one direction
   needs no sign read and no arithmetic.
3. **The counterweight lives elsewhere and grows.** Lisboa's better ships; *our* die, the
   Novgorod premium, and the Venture L2s. **We already had the ladder.**

## 3. What was actually broken (all three measured)

1. **The seller controlled both ends and they cancelled.** A 3-cask single-beer Hulk pumped
   its own price +3 and then sold at the new price. **The game paid you for monoculture, and
   there was never a reason to mix a hull.**
2. **The crash was on the wrong beat.** A brew fired **10–20×/game**, two to four turns before
   the sale, by which time a rival's arrival had erased it. **The dominant force in the market
   was noise** — and a rival's brew crashed *your* price for free, unseen, with no decision
   attached.
3. **Legibility.** The printed marker was not the price you would get; you had to compute the
   post-arrival number to value a load. Arithmetic on a component.

## 4. The paths, and why two were rejected

Three were put up. The designer ruled the middle and killed the others for good reasons.

| path | shape | verdict |
|---|---|---|
| **1 · The Posting** | brew posts up, sale eats down, **per cask** | **Rejected** — most textured, least trackable, against the stated preference. |
| **2 · The Glut** | markers open high; one step down per beer TYPE per sail | **RULED.** |
| **3 · The Saturated Port** | decay per KONTOR, not per beer | **Rejected**, and it was the one I recommended. |

**Path 3's rejection is the lesson worth keeping.** The designer:

> *"you don't necessarily choose a port destination, that is chosen by luck of the draw as
> ships become available in the supply and by other players commissioning them… If a kontor
> is hot (+3/cask) and I commission a ship, I'm actually supporting market saturation
> especially if I can't fill the ship in that turn."*

**A market you cannot steer is a tax, not a decision.** Port agency is a 4-wide draw-limited
pick followed by a berth race you may lose — too weak to hang a market on. Corollary, now
standing: **the Kontore are weather you read, not a lever you pull. Do not build more
port-steering levers.**

## 5. THE GLUT

- Every marker **opens at +3** ⚙ (`BOURSE_START`). Track **−1 … +3** ⚙.
- **SCORE, THEN THE GLUT.** Casks deliver at the marker **printed right now**. Once the sail
  resolves, **each beer TYPE that was aboard steps down ONE** (floor −1) — *never per cask*.
- **The brew crash retires.**
- **The only way UP is a shift**, and shifts belong to **buildings and private Venture lines**
  (+ Bergen's prize). Holding a price up is an engine you build.

**Why it works:** scarcity is where the game begins and every shipment spends it. First to a
beer cashes the top; the fourth sells into the crater; the beer nobody sailed is still worth
+3. **The printed marker IS the price** — the legibility fix falls out of the mechanic for
free. And a 3-cask single-beer hull costs one step while a mixed hull costs one per beer, so
**the Bourse says *concentrate and be first* while the Flight says *spread*** — a real fork
where there was none.

## 6. EVERY PRIZE IS THE THING **OR** ★

`prize-probe.js` (built for this letter) found **Bergen dead 35.5% of the time — every single
one "seats already full"** — while carrying the game's richest majority (9/5/2). *The port you
most want presence at was the port that stopped paying first.*

The feel-bad was never the rate; it was the **shape of the fallback**. "2 goods" announces
*you did the wrong thing* for having successfully filled your bench.

**The designer's fix beat mine.** I proposed converting a saturated prize to ★, which added
8–16★ per player and needed its own balance pass. Theirs: make it **a choice, always** —

- **Bruges** — a recipe at its fee · **or 2★** ⚙
- **London** — a Venture, fee waived · **or 2★**
- **Bergen** — a Specialist, free · **or shift a marker ±1** · **or 2★**
- **Novgorod** — no thing to pick; **+3★** ⚙ per delivered die

**The 2-goods consolation is struck from the whole game.** You were never forced to take the
thing, so a full bench cannot punish you. The designer's own emergent line:

> *"I may try to get two casks on a boat to bergen, one for points and the other for the
> specialist, with both dice working for the majority."*

### 6a. The Novgorod collision (raised by me, ruled by the designer)

With the others able to pay ★, **Bergen strictly dominated Novgorod**: lower minimum (2 vs 3),
richer majority, equal payout, *plus* an optional specialist. Novgorod's premium is **flat, not
per-pip**, so it could never out-scale. Ruled: **+2 → +3★**. Novgorod becomes what the designer
named it — **the port that only pays money, and pays the most**, bought with the highest
minimum in the game.

## 7. The component ruling

- **The Bourse strip LEAVES THE KIT** and reprints as **a lane on the Destinations board**.
  Cells wide enough to hold **every token at once** (they all stack at +3 on setup).
- **The markers recut: colour-matched to their beer AND printed with the beer's name.** Four
  unlabelled discs on one shared lane was the legibility failure.
- **The Manifest deck well leaves the Destinations board** — *"it didn't really fit there
  anyways."*
- All four Kontor panels reprint with the prize as a **choice**; every *2-goods* line struck.

## 8. Gates

| Gate | Result |
|---|---|
| `verify-v4.js` | **391/391 ALL PASS** — new **§20f**: one-step-per-TYPE · the mixed hull · the floor · shift-only rise · the Novgorod collision · London never forfeits · *no engine path pays the retired consolation* |
| `sim.js` (2–4p) | **0 crashes / 0 deadlocks** |
| `ai-render-smoke.js` | **ALL PASS** |
| `aid-overflow.js` | **ALL FIT** (the aid overflowed by 4px on the first pass — copy cut, never shrunk) |

**First read:** glut steps **9.2 / 12.2 / 15.0** per game · markers falling **+3 → 0.5–1.4** ·
brew crashes **0.0** (retired, confirmed) · prizes taken as ★ **2.0–3.5/game**. Pace
**15.3 / 15.0 / 13.6** — **better** than v5.5's 12.0/14.4/12.8, because a decaying market makes
late deliveries cheaper and the game runs longer.

**Watch, and it is the honest cost of this letter:** winner totals rose to **89.3 / 89.5 /
78.3** (were ~71–90) and margins to **20.8 / 15.7 / 16.8**. Two unpriced causes: markers now
*open* at +3 instead of 0, and Novgorod went to +3★. **A 20★ margin at 2p is runaway
territory.** A 6-round 2p game also appeared (1 in 12). Levers, cheapest first: `BOURSE_START`
(3→2) · `PRIZE_PTS` (2→1) · `BOURSE_MAX`. **Nothing dialed — read it at a table first.**

**And the shift engine may be under-provisioned:** shifts run **UP 4.3–5.0 vs DOWN 2.7–5.2**
against **9.2–15.0 glut steps**. On those numbers the market falls faster than anyone can prop
it — which matters most to the specialist lane, whose whole viability now rests on out-pumping
its own decay.
