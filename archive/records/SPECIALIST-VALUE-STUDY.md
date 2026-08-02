# The specialist value study — all 13 designs, throughout the game (v4.6d)

**Status: MEASURED 2026-08-02 → the recommended pass RULED at v4.7 "Every Cask" (same
day):** Grain Factor 1G→2G · Supercargo 1H→2H · Town Crier's gate cut · Innkeeper reworked
(his 4th vessel ages its own cask +1 at turn start). **Re-probe on the v4.7 build**
(400/arm vs a fresh 800-game control at 37.5%): **Town Crier's mid-game NEGATIVE is gone**
(−5.0 → +0.3; start +3.8 → +5.3) · **Innkeeper is out of the red** (−1.2/−1.7 → +1.8/+0.3)
· the outliers **cooled in the richer per-cask meta** — Supercargo +29.0 → +23.0 start
(+6.5 → +10.8 mid) · Grain Factor +23.3 → +13.5 (+10.5 → +7.3). *Caveat: the free-grant
probe reads POWER — the new fees bite only the PAID channels (Hiring Post / hire bonus);
Bergen's per-cask prize hands tiles free, so the human-table share is the residual watch.*

*(Original status: designer-called — "I think we need to conduct a thorough analysis of
how valuable each specialist is throughout the game.")* Harness: `playtests/spec-value-probe.js` (the `probe-imps-v87` lineage). Outputs:
`playtests/specval-*.txt`.

## Instruments

1. **Free-grant probe (causal).** Seat P0 with one design and read the win-rate lift vs an
   800-game no-grant control — arm `start` (before turn 1) and arm `mid` (first open seat
   from turn 6; realized 77–91%). 3p trader, 400 games/cohort, 11,600 probe games total.
   Control P0 win **37.0%** (the 3p P0 seat edge; OBS agrees 35/35/30). SE ≈ 3pts — treat
   deltas under ~6 as directional.
2. **Observational corpus** (1,500 games): organic seats/game, average seat turn, win% when
   held. Selection-biased (the AI seats what it likes); the probe is the truth, the corpus
   shows what the AI *finds*.

**Caveats:** greedy tiers are a FLOOR for combo/hold tiles (they don't plan double-loads,
lading chains, or bump lines); the grant waives seat-gates; the grant occupies 1 of 2 seats,
so every delta is NET of the crowded-out organic pick. All 3p — copies scale max(2, n−1) by
count.

## The table (win-rate delta vs control 37.0%)

| Design | Fee | Start Δ | Mid Δ | Organic seats/g | Avg seat turn | Held-win (OBS) |
|---|---|---|---|---|---|---|
| **Supercargo** | 1H | **+29.0** | +6.5 | 0.17 | 6.8 | 32.2% |
| **Grain Factor** | 1G | **+23.3** | **+10.5** | 0.54 | 6.4 | **45.8%** |
| **Guild Scholar** | 2G | **+18.8** | +2.5 | 0.22 | 5.2 | 31.2% |
| **Shipwright** | 1H | **+18.3** | +4.3 | 0.11 | 7.1 | 26.6% |
| Cellarman | 2H | +13.0 | +4.3 | 0.77 | 6.1 | 32.0% |
| Braumeister | 1G1H | +9.8 | +1.5 | 0.67 | 6.0 | 36.5% |
| Alderman | 2G | +8.3 | +5.0 | 0.33 | 7.5 | 44.8% |
| Stevedore (v4.6d) | 1G | +7.0 | −0.5 | 0.66 | 6.0 | 33.4% |
| Hop Gardener | 2H | +6.0 | +6.3 | 0.44 | 6.8 | 31.0% |
| Chandler | 1G | +4.3 | +6.5 | 0.29 | 6.4 | 35.9% |
| Town Crier | 1G | +3.8 | **−5.0** | 0.09 | 6.8 | 39.1% |
| Chronicler | 1G1H | +0.3 | **+5.3** | 0.03 | 10.3 | 50.0% |
| **Innkeeper** | 2G | **−1.2** | −1.7 | 0.28 | 7.6 | 30.8% |

**The Stevedore buff isolated** (PREBUFF=1 re-run, slot-only): pre-buff +6.5/+0.8 vs
post-buff +7.0/−0.5 — **noise-level under greedy play.** The greedy tiers rarely HOLD two
Ready casks at commission time, so the maiden-2 window barely binds for them; the buff's
ceiling (fill a Cog at commission; 2-of-3 a Hulk) is a **planned human line** — safe to
ship, its value shows at the table, not in this oracle.

## Reads

- **Supercargo is the outlier** (+29, the biggest lift ever probed on this game): a 1H tile
  that pays 1G1H every time a rival sails your cask, in a 3p economy with ~8 shared sails a
  game. The AI barely seats it (0.17/g — `aiSpecVal` blind), so live tables haven't felt it
  yet. **Dial (not ruled): fee 1H → 1G1H or 2H, or once per ROUND instead of per sail.**
- **Grain Factor is the strongest core drip** — both instruments agree (+23.3 causal, 45.8%
  held-win observational, best mid-game value +10.5). At 1G and ×max(2,n−1) copies it is
  the de-facto auto-pick. **Dial: fee 1G → 2G, or watch at the table first.**
- **The openers decay on schedule**: Scholar +18.8 → +2.5 (recipes are bought by mid-game —
  exactly the build-around-opener design), Cellarman +13 → +4.3, Shipwright +18.3 → +4.3
  (free commissions ride the whole game; 1H is cheap — **watch**).
- **Chronicler is the one riser** (+0.3 → +5.3), per its collector design; the AI is blind
  to it (0.03 seats/g, gate + undervalue) but its 50% held-win hints at the human ceiling.
- **Town Crier goes NEGATIVE mid-game** (−5.0): most bumps fire early via load bonuses; a
  mid-seat doubles a drip that has mostly dried up, and its 2-port gate delays it into
  exactly that window. **Dial: cut the gate, or face 2 → 3, or retire to the box.**
- **Innkeeper is dead weight even granted FREE** (−1.2/−1.7): with all three vessels open
  from the start (v45h), a 4th cellar almost never binds for the tray-limited AI — the seat
  costs more than the capacity pays. **Dial: rework the benefit (e.g. the tile's cask also
  ages +1 at turn start, or fee 2G → free), or accept it as a human wide-brew niche and
  watch a table.**
- **AI-only flag:** `aiSpecVal` over-seats Cellarman (0.77/g for +13) and under-seats
  Supercargo/Grain Factor/Shipwright relative to their probe truth — a greedy re-teach
  candidate; it does NOT gate these reads (the probe bypasses the picker).

## Recommendation shape (designer to rule)

The roster's timing texture is working as designed — openers decay, collectors rise, drips
hold. The pricing outliers are **Supercargo (too cheap for its drip)** and **Innkeeper
(pays nothing for its price)**, with **Town Crier** the weakest overall line and **Grain
Factor** the auto-pick among cores. One clean pass: Supercargo → 2H · Grain Factor → 2G ·
Town Crier gate cut · Innkeeper reworked (tile-cask ages +1 at turn start) — then re-probe
the four and re-read a human table.
