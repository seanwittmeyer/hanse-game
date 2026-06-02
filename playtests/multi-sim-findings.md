# Multi-Game Sim — the "living slot ring" engine (2026-06-02)

> 400 games each at 3p and 4p, run through the **real `play.html` engine** headlessly via `multi-sim.js`. Each game uses a distinct seed (so the random opening recipe and bot tie-breaks vary). Five scripted archetypes, improved greedy 1-ply bots tuned to actually build and use ships. Bots are still weak, so treat *magnitudes* as soft — but the **directional** findings are robust and several are engine/design issues independent of bot skill.

## Headline numbers (3-player)

| | |
|---|---|
| Winning score | avg **12.5**, median 12, range 2–33 |
| End clock | heritage **0%** · reach **4%** · neither/cap **96%** (avg ending round ~16) |

| Archetype | win% | avg score | reach / maj / stand / goals |
|---|---|---|---|
| QUALITY/standing | **50%** | 10.7 | 1.8 / 0.1 / **7.2** / 1.6 |
| PREMIUM/long | **52%** | 10.5 | 2.2 / 0.4 / 6.3 / 1.6 |
| ENGINE/hybrid | 43% | 9.4 | 2.3 / 0.4 / 4.9 / 1.8 |
| VOLUME/reach | **13%** | 6.3 | 3.9 / 2.4 / 0.0 / 0.0 |
| TEMPO/wide | **9%** | 5.6 | 3.6 / 2.0 / 0.0 / 0.0 |

4-player is the same shape (standing archetypes 41% each; reach archetypes ~8–9%).

## Finding 1 — Standing strictly dominates reach (points-per-action)

The two reach archetypes win **~10–13%**; the three standing-leaning ones win **43–52%**. Root cause is **points-per-action**, amplified by low throughput:

- One **enshrine** = one Kontor visit = **5–7 pts** banked (Dubbel 5 / Tripel 7), plus a goal.
- One **shipment** = one Harbor visit = **1 presence × route value (1–3)** = 1–3 pts, and you need many to matter.

Because the game is **throughput-bound** (1 vessel, 3–5-step brews → only a few ready casks all game), the volume player never gets enough shipments to compete, while a standing player banks 5–7 per cask. Reach is underpaid per action *and* starved of volume. **This is the central balance issue.**

## Finding 2 — The ship-toll economy misfires (ships are passive +1 G generators, not cargo containers)

Per game: ships **built 2.7**, ships **sailed 0.1**, cargo delivered **0.2**, tolls **0.6** — but **idle dock-fees 8.9**.

Ships almost never fill (cap 3–4) because throughput is too low to feed them, so their cap-fires mostly find no eligible cask and pay the owner the **+1 G idle dock-fee**. That idle fee — not tolls, not sail dividends — is **~93% of all ship income**, so a ship currently behaves as a slightly-better Route Lane (guaranteed +1 G per line-fire) rather than the speculative toll-baron container it was designed to be. Bots build ~2.7 ships *precisely because* the idle fee is reliable free income.

> When shipments *do* happen they load a ship 84–93% of the time — the loading/toll mechanic works; there's just **almost no cargo flowing** to fill the holds.

## Finding 3 — Both end-clocks are effectively dead

The **heritage clock never fired** (0/800 games): threshold is `6 + 3×players` = 15 (3p) / 18 (4p) enshrined, but bots manage only ~3–6 total enshrinements in 16 rounds. The **reach clock** fired in only 2–4% of games (a route filling to cap 5–9). So **96–98% of games run to the round cap** with no organic ending. Pacing is broken — same throughput root cause as Finding 1.

## Finding 4 — The random opening is meaningfully unfair

Win% by the random premium recipe each house starts with:

| Start | 3p win-of-its-games | 4p |
|---|---|---|
| **Tripel** | **43%** | **37%** |
| Dubbel | 32% | 23% |
| Hopped | 25% | 14% |

A **Tripel** opening wins ~1.7× as often as a **Hopped** opening, because standing dominates (Finding 1) and Tripel enshrines for 7 vs Hopped's 3. The fixed `Gruit + Hopped` start it replaced was at least symmetric; the random premium injects a real first-mover luck swing that compounds with the standing-dominance problem.

## Suggested dials (not yet applied — design decisions)

1. **Kill or shrink the ship idle dock-fee.** A ship with no cask to load should do little/nothing, so its income comes from **tolls + sail dividends** (cargo flow) as intended. This alone re-points ships at the toll-baron fantasy.
2. **Pay reach more, or raise throughput.** Options: higher route values / a reach-majority that scales / cheaper-or-faster vessels / passive maturation, so a shipment competes with an enshrine on points-per-action and volume players can generate volume.
3. **Lower the heritage threshold** (e.g., `4 + 2×players`) and/or **lower route caps** so a clock actually fires; or add a fixed round limit.
4. **Re-fair the opening:** fixed symmetric start, OR start with 2 recipes, OR a small draft — anything that removes the Tripel-luck swing (or accept it once standing no longer dominates).

> Findings 1 & 3 are the same throughput knot the v0.2 re-sim already flagged; the slot-ring rework didn't address pace and (via the idle fee) added passive income. A dedicated throughput/economy pass is the highest-leverage next step.

---

## Applied after this sim (2026-06-02)

Two of the four dials were decided and applied; the big rebalance (Findings 1 & 3) was **deferred** by choice.

- **Removed the ship idle dock-fee** (Finding 2). A ship with no eligible cask now simply waits — it earns only via tolls + the sail dividend, so it's a genuine speculative container, not a passive +1 G generator. Re-sim: idle dock-fees **8.9 → 0.0** per game; ship income is now tolls (~0.5) + sails only.
- **Opening is now 2 random premium recipes** (a random pair from Hopped/Dubbel/Tripel) instead of 1 (Finding 4). Re-sim win% by starting pair: `dubbel+hopped` 28% · `hopped+tripel` 33% · `dubbel+tripel` 39% — the swing narrowed from ~1.7× (single recipe) to ~1.4×.

**Known consequence (deferred):** removing the idle fee — which had been quietly propping up the ship-building reach archetypes — **sharpened standing-dominance** (QUALITY/standing 50% → **72%** at 3p; reach archetypes now win 3–8%). This is expected and lands squarely in the deferred **throughput + reach** rebalance (Findings 1 & 3), which remains the top open balance task. The heritage clock still never fires; the reach clock now fires ~10% (3p) thanks to slightly more early brewing options from the second recipe.
