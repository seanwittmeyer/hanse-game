# TASTING STUDY (v4.17 "The Tastings") — is the contest cycle ready for the table?

*Designer-ruled 2026-08-15: "Build B and run a 200 CM/GM each, with some chaos to simulate
some variable humans. I want this tested and iterated before we take it to the printer for
our game night crew."*

**Instrument:** `playtests/tasting-probe.js` (KEPT) — 3p tables of **Cellarmaster (220 ms,
pure search) + Guildmaster (100 ms, the 'quality' persona) + the CHAOS SEAT** (a Trader at
noise 0.15 — that often it takes a random legal action: the variable human — its persona
rotating majority/lifter/builder/breadth/hall per game). Seats rotate per game. Each arm =
200 games (20 shards × 10), three arm-agents × 3 concurrent shards (~9–10 processes on 4
cores — uniform contention; within-corpus reads only).

## §1 · Round 1 — the engagement bracket (3 arms × 200)

| Arm | Config | The question |
|---|---|---|
| `base` | HALL off | the control — pace · ports · seat baselines |
| `tast` | printed defaults (START_INV 1 · 1st ★ 5/5/7/6/7/9) | does the cycle run at the printed numbers? |
| `hot` | START_INV 2 · every 1st ★ +2 | the rich bracket — if benches STILL don't convene, the bottleneck is structural (⚜/Ready-cask supply), not value |

**Pre-registered criteria (set before results):**
1. **Engagement:** benches convene — judged ≥ ~1.5/game at defaults; pours ≥ ~1/player.
2. **Contest, not solitaire:** door-slams present but not dominant (~5–25% of judgings);
   the 1st-place spread not owned by one seat type.
3. **Economics:** hall★ ~4–8 per engaged player · pace within ~1 round of base · Novgorod
   dead-port ≤ base +5 pp.
4. **The chaos seat:** noise must not pay (chaos wins ≤ GM wins) and must not collapse
   (chaos wins > 10%).
5. **No degeneracy:** unconvened ≤ ~1.5/game (few stranded dice); the set rate > 0.

*(results pending — Round 1 running)*

## §2 · Round 2 — the tuned print

*(designed off the Round-1 read)*

## §3 · Verdict — the game-night print ⚙
