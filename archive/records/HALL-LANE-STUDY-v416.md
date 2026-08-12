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

*(results pending — the pass is running)*

## §2 · Pass 2 — (to be designed off the Pass-1 read)

## §3 · Pass 3 — confirmation

## §4 · Verdict & the recommended print ⚙

*(nothing here is ruled — the recommendation awaits the designer)*
