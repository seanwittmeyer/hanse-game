# DICE experiment — die-only ownership + value, finite dice pool as a second end trigger

*2026-07-19 · engine KEY v84 · experiment lives in the working tree behind `DICE=1` (env-gated, base byte-identical when off; not committed, not published)*

## The proposal tested

1. **One component.** A player-colour d6 rides every cask that leaves the brewery. The die is
   the **ownership marker** (colour) *and* the **value carrier** (pips). Set at deploy/load to the
   cask's effective quality; **adjusted live** whenever a building modifies it; **clamped 1–6**;
   never recalculated — delivery = *read the die, bank the pips*.
2. **Kontor delivery = the die.** The flat +1 kontor base, Novgorod's quality scaling, and the
   v1.8 Q4/Q5 premium are all removed/folded into the die. The Hall keeps its printed 3/5/7/9
   ladder and **returns** the die (prestige = the unlimited overflow — the v1.1 barrel design).
3. **Finite pool, new end trigger.** A kontor delivery or a Reach *spends* a die (it stays at the
   kontor as presence; majorities = count dice). When any player's last die is **spent at a
   kontor** the game end triggers (finish the round → score). Tray-empty mid-game only *throttles*
   (no deploy / vessel-load / Reach until Tap or Enshrine recovers a die).

## What the sims say (persona+Cellarmaster oracle, 400 games/count; greedy 500/count)

**Robustness: 0 crashes / 0 deadlocks in every configuration (≈5,900 games).**

Pace & trigger split (oracle):

| Pool N | rounds 2/3/4p | in-band % | dice-trigger % | ceiling % |
|---|---|---|---|---|
| baseline | 14.7 / 15.5 / 15.0 | 82 / 95 / 97 | — | 0.5 / 1.8 / 1.0 |
| **8** | 16.0 / 12.9 / 11.0 | 63 / 50 / 37 | 37 / 69 / 83 | 32 / 13 / 4 |
| **10** | 15.6 / 14.1 / 12.0 | 72 / 75 / 53 | 27 / 54 / 68 | 23 / 7 / 2 |
| **12** | 15.7 / 14.8 / 14.0 | **83 / 86 / 83** | 11 / 35 / 37 | 12 / 4 / 1 |
| **14** | 14.7 / 15.3 / 14.1 | 83 / 95 / 88 | 4 / 15 / 23 | 4 / 3 / 1 |

Lane win-rates (vol/dem/pres/maj/deep vs fair):

| Count | Baseline | DICE N=12 |
|---|---|---|
| 2p (fair 50) | 43.8 / 38.9 / **63.6** / 47.5 / 51.5 | 46.2 / 35.1 / 46.3 / 54.9 / 54.5 |
| 3p (fair 33) | 24.9 / 32.3 / 40.6 / 38.0 / 31.3 | 31.2 / 24.9 / 34.1 / 37.7 / 35.8 |
| 4p (fair 25) | 24.6 / 18.8 / 30.6 / 27.1 / 24.3 | 21.5 / 26.9 / 23.5 / 26.5 / 26.3 |

Other reads at N=12 vs baseline:
- **Winner scores** rise slightly (2/3/4p: 40→43.5 · 48→52 · 46→51) — quality now pays at *every*
  kontor, lifting average delivery value even though the top is capped.
- **Quality climb intact**: deep-lane Q4+/game 0.6–0.8 (baseline 0.7–0.9); at N=8 it collapsed
  to 0.3 (games too short to climb) — the pool size, not the die cap, drives this.
- **Die saturation is rare**: 2.5–3.0% of kontor deliveries clamp at 6; <1 pip lost/game.
- **Destination mix**: Bruges up ~3pts (cheap volume favoured), Novgorod down 3–8pts (its
  scaling identity is now everywhere), Hall share unchanged.
- **First-player edge** unchanged-to-slightly-better (2p P1 59%→~55%).
- 2p prestige — the documented hot watch-item (63.6%) — cools to 46–50%.

### Failure modes found (and what they teach)

1. **Trigger semantics are load-bearing.** Counting *in-flight* dice (deployed/aboard) toward
   "out" ended games at round ~8 — deploying wide would end the game while your dice were still
   working. The shipped rule — **out = all N dice spent at kontore** — restores the band. The tray
   still gates placement mid-game, which is the interesting part of the constraint.
2. **The dice clock scales opposite to the sailed clock.** Flat N binds hardest at 4p
   (dice-trigger 37–63%) and barely at 2p (11–24%). Per-count N (≈10/12/13) is the evening dial
   if wanted; flat 12 is playable at all counts and physically simplest.
3. **When dice run dry, Enshrine and Tap are the relief valves** (both recover dice; Enshrine
   also ticks the clock). The greedy/persona bots under-use them → a 12–14% round-25-ceiling
   tail at 2p that a human table (which pivots to prestige) largely wouldn't hit. Thematically
   clean: *out of trade standing → prestige is what remains*. The Charter is no longer the
   universal escape (it needs a die for a vessel cask) — the rules text must name Tap/Enshrine
   as the recovery moves.

## Physical audit (everything must live on a component)

| State | Today | Under DICE |
|---|---|---|
| Cask ownership on slot/ship | ownership disc | **die colour** |
| Cask current value | mental: base+building+premium (+die when routed) | **die pips** |
| Kontor presence / majorities | disc per delivery | **your dice at the kontor** (count them) |
| Value-building bonus | shared demand d6, set at load, returns | **turn the cask's own die at load** |
| Quality transform (Kiln/Yard) | +1-quality marker | **turn the die at dock** (die = effective quality; gates read the die) |
| >6 premium overflow | read off cask's printed Q | **gone** (hard cap 6) |
| End clock | Sailed-Ships track | Sailed-Ships **plus** empty-tray-and-none-on-the-Wharf |
| Building ownership | owner marker | unchanged (printables2's colour owner frames) |

**Timing rule that keeps the die legible** (resolves the one ambiguity found): *on the Wharf the
die shows what the cask IS; in a berth it shows what it will FETCH.* Deploy → die = printed Q.
Dock on a transform → turn it (+1); gate checks read the die. Load into a berth → check the gate
first, then turn the die up by the value building's ★. Delivery → read, bank, leave the die.

Component delta: **−56 ownership discs, −8 shared demand dice, −6 quality markers, −the premium
and overflow rules; +48 player-colour d6 (12 × 4)**. Rules text gets shorter; per-delivery math
disappears (no fractions, no recalculation, min 1 / max 6).

## What the change costs (be honest about these at the table)

- **The big-delivery spike is gone.** Today a routed Bock can bank 9–11★; the cap is 6. The
  Lisboa-style payoff moment becomes a steadier drip. Sim says lanes survive; the *feel* is a
  table question.
- **Building value anti-scales with quality** (a Gruit gains +3 from Staple, a Bock +1 — it
  saturates). v1.8 existed because the climb didn't pay; here the climb pays through base pips
  and Novgorod/Hall/majorities instead. Oracle says the climb holds at N=12 — watch it live.
- **Demand persona dips below fair at 2–3p** (35/25%). Dials if adopted: building costs,
  wharfage, or a printed owner/rival split (see below).
- **Novgorod loses its printed identity** (scaling). It keeps gate Q3 + refine + the 8/5/2
  majority. Option: a printed destination-side premium ("Q4+ delivers +2★ here") — one printed
  number, no math chain — if the climb needs more pull.
- **Dice are fragile state** (table bumps). Mitigation: the printables2 cask cards already carry
  a die-well (`cc-mark`); dice sit in wells on cards and in berth boxes on ships.
- **Reach gets expensive** (a die that could carry 3–5★ of cargo). That's arguably the point
  (v1.1 wanted Reach to have a real cost), but Bergen's benefit weakens with it.

## Recommendation

The idea **holds up better than expected** — clean physicality, less math, lane balance as good
as or tighter than baseline, and the finite pool creates a real, visible tension without breaking
pace at **N=12**. Adopt-with-eyes-open items: the capped demand ceiling, Bruges volume creep,
Novgorod's identity, and the 2p dice-trigger being mostly a cap rather than a clock.

Suggested execution order if adopted (each step sim-gated):
1. Freeze the rule set above as a **named variant** in `play.html` (URL/New-Game toggle instead
   of env), KEY bump.
2. Retune ⚙ dials on the oracle: `DICE_N` per count (10/12/13 probe), Bruges majority [4/2/0 →
   3/2/0 probe], optional Novgorod printed premium.
3. UI: render the die on cask tiles/berths (the `dieFace` renderer exists), dice-tray count per
   player, trigger warning.
4. Re-run the full gates (sim 500, ladder, render-smoke) + `ai-tune.js` after the balance pass.
5. Docs/pages ripple: RULES §5a/§6/§7/§10/§11, COMPONENTS §2/§3C/§G, DESIGN §9 entry,
   learn/index; printables2: drop ownership discs, add 12 dice/colour to the checklist, die-well
   callouts on cask/ship cards, destinations board value row → die iconography.
6. Table-test the *feel* items no sim can judge: the capped spike, die-turning ergonomics,
   the countdown tension of visible trays.

## Addendum — Model B ("the destination handles half"), designer follow-up

The anti-scaling critique above is **specific to Model A**, where the die carries quality and the
cap-6 eats high-Q building bonuses. The designer's intended model splits differently:

- **Model B ('mods'):** the die carries **modifications only**, starting at its floor of **1** —
  which is exactly what replaces the old flat +1 kontor base. The **destination pays its printed
  part separately** (Novgorod keeps its printed Q-scaling 2/4/6; the other kontore print nothing).
  Delivery = printed part + die pips. Staple is +3 for *every* cask — **no anti-scaling** — and
  the big-delivery spike survives (Q5 → Novgorod through a premium Staple = 6 + 6 = 12, matching
  baseline). Gate checks stay on printed quality (the +1-quality markers for Malt Kiln / Hop Yard
  remain, unlike Model A which folded them into the die).
- **B + premium:** the v1.8 Q4/Q5 premium kept, expressed as a die adjustment.

Oracle at N=12 (same battery; `DICEV=mods`, `DICEP=1` for premium):

| Config | rounds 2/3/4p | band % | dice-trig % | saturation | winner score |
|---|---|---|---|---|---|
| A (quality) | 15.7/14.8/14.0 | 83/86/83 | 11/35/37 | 2.5–3.0% | 43.5/52.0/50.8 |
| **B (mods)** | 15.4/14.8/14.1 | 81/87/85 | 13/34/38 | **0.0–0.1%** | 39.7/47.7/45.8 |
| **B + premium** | 15.1/14.6/13.6 | 81/85/80 | 13/36/40 | 0.5–0.7% | 39.1/46.7/45.1 |

Lane win-rates (vol/dem/pres/maj/deep):

| Count | B (mods) | B + premium |
|---|---|---|
| 2p (fair 50) | 50.5/36.5/49.5/36.5/56.8 | 46.2/39.0/52.4/50.5/53.0 |
| 3p (fair 33) | 29.3/29.1/**43.3**/28.7/34.5 | 32.3/25.0/34.1/33.8/37.3 |
| 4p (fair 25) | 25.3/24.2/29.2/26.3/21.3 | 24.7/24.7/20.7/27.8/26.8 |

**Reads:** Model B's clamp virtually never bites (the 1–6 window is roomy for mods alone);
scores return to baseline levels (B ≈ today's economics with the base-1 folded into the die
floor); Novgorod's identity is restored; pace and the dice-trigger profile match Model A.
Without the premium, prestige runs hot at 3p (43.3%) — the pre-v1.8 "climb pays only at
Novgorod/Hall" tilt reappearing. **With the premium kept as a die adjustment, B posts the
tightest lane balance of any tested config** (including baseline) and stays ~clamp-free.

**B's costs vs A:** delivery is two reads + one addition (printed part + pips) instead of
read-one-die; the +1-quality markers stay (A eliminated them); a bare cask's die shows 1
(it doesn't display quality — the card's printed Q does). **B's wins vs A:** no anti-scaling,
no spike loss, Novgorod identity intact, near-zero saturation, smallest delta from the tuned
live economy. Robustness: B greedy 500×3 → 0 crashes/deadlocks.

**Revised recommendation: Model B + premium at N=12 is the frontrunner** for a table test.
(2p ceiling tail ~10–15% persists in all configs — the bot enshrine/tap blind spot; watch live.)

### Addendum 2 — pool size N=14 (designer probe: fund the presence/majority lane)

Hypothesis: +2 dice flow into Reach/Keut presence, giving the majority lane real room. Confirmed
(B+premium, oracle 400/count; per-lane `reach/g` = presence dice spent, now in the PATHWAYS rows):

| Metric | N=12 | N=14 |
|---|---|---|
| majority-lane reach/g (2/3/4p) | 3.2 / 3.5 / 3.9 | 3.7 / 4.1 / 4.4 |
| majority-lane maj points | 11.2 / 13.8 / 11.8 | 11.9 / 14.7 / 12.3 |
| majority-lane win (fair 50/33/25) | 49.0 / 28.4 / 22.0 | 40.8 / **33.8 / 24.9** |
| lane-spread (sum dev from fair) | 23 / 18.5 / 10.7 | 27 / **6.2 / 4.5** |
| rounds · band | 15.1/15.3/13.7 · 79/89/80% | 14.7/15.5/14.4 · 81/**95/90**% |
| dice trigger | 14 / 33 / 45% | 5 / 18 / 20% |
| 2p ceiling tail | 9.8% | **2.8%** |

N=14 posts the tightest 3p/4p lane balance of any config tested (spread 6.2/4.5) and nearly
eliminates the 2p dry-out/ceiling wart; greedy robustness 500×3 → 0 crashes, bands 94–98%.
The trade: at 2p the dice-pool end trigger fades to ~5% — there it's a *cap* (you can run out of
presence), not a clock; at 3–4p it still fires ~20% (greedy ~32%). 2p lane reads are ±10pts at
n≈100/lane — directional only; 3–4p are stable.

Component symmetry: 14 dice × 4 players = **56 dice — exactly the 56 ownership discs they
replace.**

**Final recommendation: Model B + premium, 14 dice/player** (`DICE=1 DICEV=mods DICEP=1
DICEN=14`). Keep per-count N as a dial only if the 2p trigger should matter more.

## Raw outputs

`base-greedy.txt` · `base-oracle.txt` · `dice8-greedy.txt` · `dice8-oracle.txt` ·
`dice10-oracle.txt` · `dice12-greedy.txt` · `dice12-oracle.txt` · `dice14-oracle.txt`
(sim.js gained `DICE=1` / `DICEN=n` env hooks + die-use/saturation/trigger reporting.)
