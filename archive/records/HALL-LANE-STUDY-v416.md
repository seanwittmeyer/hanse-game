# HALL-LANE STUDY (v4.16 "Standing Orders") — is volume at the Hall a real lane?

*Designer-called, 2026-08-12: "Run a larger sample to balance the hall destination bonuses.
It should be a lane or strategy to go volume there. That means going there should compensate
for the lack of majorities points and should have a mechanism to allow continued access via
invites. Rethink how access via invitation [works] … maybe a bonus on some casks and maybe a
new building which gives an invite on activation … I want 100 cm/gm games per test …
three passes."*

**Instrument:** `playtests/hall-lane-probe.js` (KEPT) — 3p tables of **Cellarmaster (220 ms,
pure search) + Guildmaster (100 ms, the standing 'quality' persona) + a COMMITTED-LANE
Guildmaster (100 ms, the new 'hall' persona)**, seats rotated per game; hall mode on, the
beer toggles off. **The lane read:** the committed seat's win rate against the plain GM at
the same budget — a healthy lane ≈ equal thirds (the CM is the strong benchmark). Each arm
is 100 games (10 shards × 10, seats rotated), run as 5 parallel arm-agents × 2 concurrent
shards (10 processes on 4 cores — ~2.5× oversubscription, uniform across every arm and
every pass; within-corpus comparisons stay fair per the standing bulk rule).

**The dial surface under test (v4.16, all OFF in the live build until ruled):**

| Dial | What it does | The brief it serves |
|---|---|---|
| `HALL_PIPS` | every enshrined die also scores its **pips** at game end | the fifth port — the majority-compensation term |
| `HALL_LADDER` | end ★ by your enshrine **count** (Flight grammar, e.g. 0/2/5/9/14) | volume per se |
| `INV_CASK_W` | the ⚜ *Gain 1 Invitation* load bonus joins hall-mode pile draws (weight = the printed-mix share) | renewable access — "a bonus on some casks" |
| `INV_BLDG` | the **Guild Chancery** joins the deal (activate → +1 ⚜) | renewable access — "a new building" |

Invitation flow is tallied at the source (`p.invSrc`: order · first · cask · bldg · menu) —
the access question is answered by the split, not just the total.

## §1 · Pass 1 — which mechanism carries the lane? (5 arms × 100 games)

| Arm | Dials |
|---|---|
| `base` | all off — the v4.15 Hall (control) |
| `pips` | HALL_PIPS=1 |
| `ladder` | HALL_LADDER=0,2,5,9,14 |
| `faucets` | INV_CASK_W=0.12 · INV_BLDG=1 (access only, no scoring change) |
| `full` | HALL_PIPS=1 + the faucets |

**Results (500 games · 0 crashes/0 errors · pace 17.2–18.7 under 2.5× contention — read
deltas, not absolutes; win-rate CI at n=100/seat ≈ ±8 pp):**

| Arm | CM win | GM win | **GM-hall win** | lane Δ | hall★/pl (committed) | maj (committed) | ens/pl | Novgorod dead | crowns |
|---|---|---|---|---|---|---|---|---|---|
| base | 63% | 17% | 20% | +3 | 2.6 | 11.4 | 0.64–0.79 | 8% | 0.7% |
| pips | 59% | 16% | **25%** | **+9** | 8.3 | 11.7 | 1.15–1.31 | 16% | 4.0% |
| ladder | 65% | 17% | 18% | +1 | 6.5 | 11.2 | 1.10–1.18 | 14% | 1.3% |
| faucets | **47%** | 25% | **28%** | +3 | 3.6 | 11.6 | 0.93–1.14 | 14% | 1.3% |
| full | 56% | 23% | 21% | −2 | 13.1 | 11.6 | 1.73–1.90 | 14% | 5.3% |

**Findings:**
1. **Pips is the lane-maker.** The fifth-port term gives the committed seat its only real
   edge (+9 pp over the same-budget GM) — and it is component-true: the die standing on the
   shelf shows its score. The count **ladder is a null** (+1 pp): it pays cheap dice like
   ripe ones and duplicates the Flight's grammar without its identity.
2. **The faucets lift the whole lane, not just the committed seat** — both GM seats close on
   the CM (63→47%), engagement rises ~40%, and the invite flow becomes renewable
   (per player: order ~1.0 · first ~0.9 · bldg 0.40 · cask 0.40). Access, not value, was
   the binding constraint at v4.15 — the menu study's low enshrine counts are explained.
3. **Full overshoots**: with pips AND both faucets at study weights, every seat hall-plays
   (~13 hall★/player, a quarter of a winning total), pace stretches to 18.7, and the
   committed seat's edge vanishes (−2 pp) — commitment stops differentiating when the lane
   is that loud. The Hall should be A lane, not the game.
4. **Majority compensation works**: the committed seat's majority deficit (~3.5★ vs the CM)
   is covered by the pips swing (+6★ over base) with room to spare.
5. **The cost**: Novgorod dead-port worsens 8% → 14–16% every dialed arm (the Reliquary and
   the eastern run want the same die-5s) — the standing watch for Pass 2/3. London
   *improves* (13% → 3–8%; brew-menu picks feed it). Crowns start breathing (0.7% → 4–5.3%).

## §2 · Pass 2 — magnitude & print cost (5 arms × 100 games)

The question shifts from *which mechanism* to *how much of it* — and which faucet earns its
print (the cask ⚜ needs replacement tiles; the Chancery is one tile).

| Arm | Dials | The question |
|---|---|---|
| `anchor` | PIPS=1 · ICW=0.12 · IBLDG=1 | the Pass-1 `full` re-run — the cross-pass bridge + n=200 on the flagship |
| `lite` | PIPS=1 · ICW=0.06 · IBLDG=1 | temper the invite flood — does the committed edge return? |
| `stars` | PIPS=1 · ICW=0.12 · IBLDG=1 · HSTARS=1,3,5,7 | trim the once-each ★ — re-center value on the DICE (volume per se) |
| `bldgonly` | PIPS=1 · ICW=0 · IBLDG=1 | the cheapest print — does the Chancery alone renew access? |
| `caskonly` | PIPS=1 · ICW=0.12 · IBLDG=0 | the faucet isolation — does the ⚜ tile alone carry? |

*(results pending)*

## §3 · Pass 3 — confirmation

## §4 · Verdict & the recommended print ⚙

*(nothing here is ruled — the recommendation awaits the designer)*
