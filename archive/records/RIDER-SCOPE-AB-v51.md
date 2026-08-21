# RIDER-SCOPE A/B — re-funding the mason's mark (v5.1r study letter)

**Date:** 2026-08-21 · **Called:** the designer's "do item 2" off `GATEKEEPER-v51.md` §Path-forward
item 2. · **Build:** `play.html` `KEY hanse-v51r` (the RIDER_SCOPE dial enters, default 0 = the
v5.1 print — NO ruled behavior changes; the KEY bump is the engine-change discipline).
**Status: RESULTS + A RECOMMENDATION — nothing here is ruled. The designer rules.**

## 1. The question and the pre-registered bar

v5.1 converted the building stops to riders and the mason's-mark ticks fell ~40% vs v5.0
(2.5/5.3/6.9 per game vs 4.3/7.8/11.4; end pips ~4.5/5.2/4.6/player vs ~5.4). The gatekeeper
review flagged the mark economy as under-funded and proposed two levers:

- **Arm B — WIDE scope** (the recommended move): a rider fires with **any matching Source/Age
  action resolved while its line is active** — the station action AND the load-bonus echoes —
  not the station action only. Still once per activation; still only on lines whose stations
  host the verb (a Granary off the Market's two lines never fires — placement stays authorship).
- **Arm C — faces** (the fallback): the utility riders (Granary · Mission Quay · Assay) start
  their mark at **+1** (ms 1 → 2).
- **Arm D — both** (run because neither B nor C passed alone).

**The pre-registered pass (from the review): end pips ≥ ~5.5 · the PATHWAYS builder lane ≥25%
at 3–4p · chosen (non-London) builds up — with the 12–25 band holding.**

## 2. Method

The canonical engine, never a reimplementation. `play.html` gains `RIDER_SCOPE` ⚙ (0 = the
print · 1 = wide; `wideRiders()` collects the active line's unused riders into the bonus
`Source`/`goods3`/`Age` dispatch in `fireCaskAct`); sim hooks `RSCOPE`/`MSPLUS`
(override-only-if-set — the v4.16b discipline; MSPLUS mutates `BUILDINGS.ms` sim-side, no
engine change). New instrumentation kept in `playtests/sim.js`: **builds by channel** (chosen =
the survey load-bonus · prize = London/Bergen) and the **wide-scope exposure pair** (bonus
Source/Age fires/game · fires that collected ≥1 rider). `verify-v4.js` gains the §33 battery
(13 checks: scope-0 identity · the wide collection + tick + once-per-activation · the die-riders
inside the bonus Age flow · authorship off-line) — **367/367 PASS**.

Corpora (journeyman, 300/count + PATHWAYS 100/count per arm, all **0 crashes / 0 deadlocks**):
`sim-results-vhanse-v51r-{base,wide,faces,both}.txt` + `…-pathways.txt` variants.

**Caveat, pre-registered:** the greedy tiers were NOT re-taught to price the wide window or the
higher faces — arm effects are a floor under bot play. §4 shows the floor is structural, not
just policy.

## 3. Results (2p/3p/4p per line)

| metric | A base (print) | B wide | C faces+1 | D both |
|---|---|---|---|---|
| pace (rounds) | 16.7/15.9/14.7 | 16.6/15.1/15.0 | 16.7/15.4/14.9 | 16.4/15.7/14.9 |
| 12–25 band % | 90.0/90.7/85.0 | 91.7/84.7/86.7 | 92.0/89.0/86.3 | 89.7/90.7/86.0 |
| mark ticks/game | 3.0/5.3/7.5 | 2.6/5.1/7.4 | 2.5/4.8/6.7 | 2.7/5.2/7.0 |
| **end pips/player** | 5.1/4.9/4.7 | 4.8/4.8/4.8 | 4.8/5.1/4.9 | **5.4/5.4/4.9** |
| builds/game | 3.4/4.6/5.8 | 3.2/4.4/5.9 | 3.0/4.6/5.8 | 3.4/4.7/5.8 |
| — chosen (survey) | 0.5/0.5/0.5 | 0.5/0.5/0.5 | 0.5/0.5/0.5 | 0.5/0.6/0.6 |
| — prize | 2.9/4.1/5.3 | 2.7/4.0/5.4 | 2.5/4.0/5.3 | 2.9/4.1/5.2 |
| PATHWAYS builder 3p/4p | 20/15% | 26/19% | 23/12% | 25/22% |
| winner total | 57.0/61.5/60.6 | 57.5/61.6/60.3 | 57.0/59.6/60.6 | 56.6/62.0/60.8 |
| Novgorod share | 19.7/20.6/20.6% | 19.1/18.8/20.7% | 19.9/19.0/20.9% | ~20% |

Pace, band, winner totals, delivery splits and the trigger mix are **stable across all four
arms** — neither dial disturbs the game's shape. Run-to-run noise on the mark metrics is
~±0.3 (this base corpus itself reads 5.1/4.9/4.7 pips where the committed v5.1 corpus read
4.5/5.2/4.6).

**No arm passes the bar.** End pips never reach 5.5 (D comes closest at 5.4/5.4/4.9); the
builder lane clears 25% at 3p in B and D but never at 4p (19/22%); chosen builds are flat
(~0.5/game) in every arm.

## 4. The exposure diagnostic — why WIDE is a null

The counter pair tells it plainly: bonus Source/Age actions fire **5.9 / 8.9 / 11.8** times per
game (2/3/4p) — plenty of raw exposure — but the wide window **collects a rider only 0.2 / 0.3
/ 0.4 times per game (~3% of fires)**. The coincidence the rule needs — a bonus Source/Age
fires × the active line hosts the verb (2 of 4 lines each) × that line's cap holds the matching
rider × it wasn't already used by the station action this activation — is structurally rare.
At ~0.3 extra collections/game the lever cannot re-fund a 2–4-tick/game gap **even with a
perfectly-taught policy**, unless play warps to manufacture the coincidence. The wide scope
buys a broader printed rule, not an economy.

## 5. What the null teaches — the mark economy held better than the tick count implied

Ticks fell ~40% at v5.1 but **end pips fell only ~5–10%** (v5.0 ~5.4 → v5.1 ~4.7–5.1 across
corpora). The printed start faces (1/2/3 by tier) and the cap-6 saturation absorbed most of the
drop — many v5.0 ticks were landing on already-high dice. The under-funding the review flagged
is real but small: **~0.5 pips/player**, about half a build's worth. The builder lane at 4p
(12–22% across arms, n=100 noise ±~9pp) remains the softer signal; note this batch's base
PATHWAYS also flipped the hot lane from lifter (the committed v5.1 read, 61/50% at 2–3p) to
majority (48–51%) — the n=100 lane read swings, which itself argues for a bigger oracle before
any lane-driven retune.

## 6. Recommendation (PROPOSED — the designer rules)

1. **Do not widen the rider scope.** Arm B is a measured null (§4) and it trades away the crisp
   printed teach ("boosts the station action here") for a conditional that almost never
   triggers. Keep `RIDER_SCOPE` as the tested seam, default 0.
2. **Do not print faces+1 on this evidence.** Arm C moved pips ~+0.1–0.2 — inside noise. Arm D
   (both) reached 5.4/5.4/4.9, the best read, but D's lift is mostly C's compounding and still
   misses the bar; printing two dials for +0.4 pips is a bad trade.
3. **Re-frame item 2 for the human table:** the question is whether the mark economy *feels*
   thin at ~4.7–5.4 pips, not whether the tick counter dropped. If a live table says yes, the
   honest levers in order are a broader faces pass (workhorses +1 too), or pricing rider ticks
   on *activation* rather than *use* — both new studies, neither justified by this one.

## 7. Kept instrumentation

`playtests/sim.js` — `RSCOPE`/`MSPLUS` hooks · builds-by-channel (chosen/prize) · the exposure
pair (bonusSA/wideHits), all on the dashboard permanently. `playtests/verify-v4.js` — the §33
rider-scope battery (the dial's contract stays enforced even while it defaults 0).
