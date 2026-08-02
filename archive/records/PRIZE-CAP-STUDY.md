# The Bergen prize-cap study — per-house (v4.6b, live) vs per-die (the recorded dial)

**Status: EXPLORATION — designer to rule.** (2026-08-02, designer-called: "I think it would
be beneficial to run an AB test to see if the limit of 1 makes sense as well per player. Is
it really that bad if I want multiple specialists or recipes in one go? Some have costs and
you'd be limited by hops or space. It makes a big turn fun but can be a limiting factor I
suppose.") This is the **per-die expansion recorded as a dial** at v4.5b
(`V45B-OPEN-ORDERS.md` §4) — now measured. Harness: `playtests/prize-cap-test.js` (the
swap-test pattern: the canonical engine + a surgical source patch on the v4.6b cap line;
trader tier, no prize term in the policy — one policy plays both worlds). Outputs:
`playtests/prize-cap-{A,B}.txt` (300/count) · `prize-cap-{A,B}-lanes.txt` (4p oracle, 200).

## 0. The fact that reframes the question

**Bergen is the ONLY capped prize.** Bruges (recipes) and London (buildings) already grant
**per cask** — two casks at Bruges = two recipe picks (each at its `H` = Q−2 fee), two at
London = two buildings placed (+3★ each). "Multiple recipes in one go" is the LIVE rule and
measurably happens (~1.4 double-cask Bruges sails/game at 2p; ~0.2 double-takes/game — the
fee is the real throttle: ~2.2 recipe fizzles/game at 2p). The per-die grammar is the house
style; the v4.6b cap is the exception line on the mat.

## 1. What actually throttles specialists (why per-die is contained)

1. **Two seats per house, for the whole game** — per-die can never inflate totals past 2n;
   it can only move WHEN seat 2 fills (and convert extras to goods).
2. **Never two of a kind** — a double must be two different designs.
3. **The display of 4, gap until end of turn** (v4.4c) — later picks in the same sail see a
   thinner rack (load order = pick order matters MORE under per-die).
4. **Seat-gates** on three guild singles.
5. **The fizzle consolation** — an unresolvable prize pays 2 goods; under per-die this fires
   PER CASK (the sneaky side effect: a full-seat house's 3-cask Bergen run = 6 goods).

## 2. The A/B (trader, 300 games/count · 4p lane oracle 200)

| Metric | A cap-1 (2p/3p/4p) | B per-die (2p/3p/4p) | Read |
|---|---|---|---|
| Rounds | 13.3 / 13.0 / 12.4 | 13.0 / 12.9 / 12.4 | no pace shift |
| Bergen delivery share | 29.7 / 28.4 / 28.6% | 28.4 / 29.2 / 29.2% | **no new magnetism** |
| 2+same-house Bergen sails /g | 0.94 / 0.68 / 0.61 | 0.85 / 0.64 / 0.68 | the incidence bound |
| Double-seat sails /g | **0.00** (impossible) | **0.42 / 0.29 / 0.22** | the fun event: ~1 per 2.5–4.5 games |
| Spec prizes taken /g | 2.25 / 3.78 / 4.97 | 2.52 / 3.96 / 5.28 | +0.2–0.3 seats/game |
| Fizzles → consolation goods /g | 1.2 / 1.8 / 3.3 | 2.3 / 3.0 / 4.2 | **+~1 good/game table-wide** |
| Specs per seat · both-filled | 1.48–1.57 · 60–65% | 1.57–1.59 · 67% | seat-2 fills a touch sooner |
| Winner margin | 14.3 / 9.9 / 8.4 | 15.4 / 10.2 / 8.8 | flat |
| 4p lanes (maj/lift/build/breadth) | 27 / 20 / 27 / 26 | 20.5 / 25.5 / 23.5 / 30.5 | within the ±5 noise floor (n=200) |

**Robustness:** 0 crashes / 0 deadlocks, 2,200 games. The pending-prize pipeline absorbs
per-die with no engine change beyond the one patched line.

## 3. Reads

- **The cap is nearly free to remove** under greedy play: pace, share, margin, lanes all
  flat. The whole effect is bounded by ~0.6–0.9 double-cask Bergen sails/game, of which
  ~⅓–½ convert to an actual double seat; the rest fizzle to goods.
- **The big turn is real but rare** — a house seats 2 in one sail about once every 3–5
  games (greedy floor; humans would engineer it more).
- **The consolation mint is the one new faucet**: +~1 good/game table-wide (a full-seat
  house's extra casks pay 2 each). Small; arguably thematic (Bryggen pays the crews'
  victuals). A "consolation once per house per ship" hybrid would kill it — but re-adds
  exactly the cap sentence the change would delete.
- **Greedy caveat (standing):** the tiers don't STACK casks to farm Bergen — B's numbers
  are a floor. A human double-cask run costs 2 brews + aging + a 2-berth hull at Bergen and
  pays ≤2 tiles ever (the seat ceiling) — good play, not degeneracy.

## 4. The design ledger (beyond the numbers)

**For per-die:** uniform destination grammar (every port prize per-cask — the mat line
SHRINKS: "each cask aboard: its house seats a specialist"); no cross-cask memory inside a
sail (the component-state line likes it); the designer's stated instinct — big turns are
fun, and the destinations should grease the wheels; load order gets more texture (pick 1 of
4, then 2 of 3…).

**For the cap:** the guild singles are "scarce, first-come" BY DESIGN — per-die lets one
2-cask house vacuum two singles in a single swoop, closing the contestation window rivals
get under cap-1; the consolation faucet, however small, lands at the port that already owns
the richest majority (9/5/2).

**Recommendation (designer to rule):** the data says per-die is SAFE at every count; the
call is taste — uniform grammar + the fun spike (per-die) vs single-tile contestation + no
faucet (cap-1). The per-die line fits the v4.6b spirit ("grease the wheels") and the house
grammar; if adopted, the watch is guild-single concentration under human play, and the dial
to keep in pocket is the consolation (2 goods → 1, or first-fizzle-only) — not the prize.
