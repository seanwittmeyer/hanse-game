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

**Results (500 games · 0 errors · pace 17.6–18.0):**

| Arm | CM win | GM win | GM-hall win | lane Δ | hall★/pl (committed) | non-Order faucet inv/pl | Novgorod dead | crowns |
|---|---|---|---|---|---|---|---|---|
| anchor | 61% | 16% | 23% | +7 | 13.6 | 0.93 | **12%** | 6.7% |
| lite | 65% | 17% | 18% | +1 | 12.8 | 0.68 | 17% | 4.7% |
| stars | 55% | 25% | 20% | −5 | 10.3 | 0.77 | 19% | 5.0% |
| bldgonly | 57% | 25% | 18% | −7 | 9.7 | 0.48 | 18% | 5.0% |
| caskonly | 57% | 19% | 24% | +5 | 10.8 | 0.41 | 20% | 4.7% |

**Findings:**
1. **The lane Δ is noise-dominated at n=100** — the flagship config read −2 in Pass 1 and
   +7 in Pass 2 (the anchor was the same dials). Pooled across ALL seven pips-bearing arms
   (n=700/seat): GM 20.1% · GM-hall 21.3% — **the committed lane plays at parity with
   equal-strength uncommitted play**. That satisfies criterion 1 (viable, not dominant);
   single-arm Δs should not be over-read. Pass 3 is therefore a REPLICATION pass.
2. **Loudness tracks the faucet total**: both-faucets configs land committed hall★ ~13
   (breaching the ≤10 criterion — a quarter of a winning score); single-faucet and
   trimmed-★ configs land ~10.
3. **Access splits cleanly**: the Chancery contributes ~0.5/player, the ⚜ cask ~0.4;
   Orders stay the largest earned source. Either faucet alone roughly meets the ≥0.5 bar;
   both together overshoot into the loudness problem.
4. **Novgorod is the standing cost**: 12–20% dead across every dialed arm vs 8% base
   (CI ±~7 pp — the arms are not distinguishable from each other, but all sit above base).
   The mechanism is structural: the Reliquary (die 5+) and the eastern run bid for the same
   ripe dice. Dial options for the designer, none tested here: an eased Reliquary minimum
   is anti-thematic; a **Novgorod-side pull** (e.g. a hall-mode Order naming Novgorod at
   higher ★) or simply accepting ~15% at strong-play tables (the 2p historical residual
   was 33%) are the live candidates.

## §2b · Pass 3 — replication (5 arms × 100 games; pooled n = 200–300 per config)

Same protocol, same budgets, same contention. Every arm is a RE-RUN — the verdict reads
pooled numbers only (per-seat CI at n=200 ≈ ±5.7 pp, n=300 ≈ ±4.6 pp):

| Arm | Re-runs | Pooled n after Pass 3 |
|---|---|---|
| `base2` | base | 200 |
| `confirmA` | full/anchor (PIPS+ICW 0.12+IBLDG) | 300 |
| `confirmB` | stars (+HSTARS 1,3,5,7) | 200 |
| `confirmC` | caskonly | 200 |
| `confirmD` | bldgonly | 200 |

*(all five arms ran 100/100 clean; the pooled verdict is §3)*

**Pre-registered decision criteria for the recommended print (set before Pass-2 results):**
1. **Lane**: the committed seat ≥ the same-budget GM (Δ ≥ 0; ideally +5 pp or better).
2. **Compensation**: committed hall★ ≥ the committed seat's majority deficit vs the field
   (≈ 3–4★) — but total hall★/player ≤ ~10 (the Hall is A lane, not the game; Pass-1 `full`'s
   13★ read as too loud).
3. **Access**: invite flow renewable — the non-Order faucets together ≥ ~0.5/player, with
   Order claims still the largest single source (the Contract row stays the lane's gate).
4. **Kontor health**: Novgorod dead-port ≤ ~12% (base read 8%; Pass-1 dialed arms 14–16%
   is the ceiling of acceptable) and no other port regressing past base.
5. **Pace**: within ~1 round of the in-corpus base (17.4).
6. **Print cost** breaks ties: fewer new components wins (the Chancery = 1 tile; the cask ⚜
   = a replacement-tile set).

## §3 · The pooled verdict table (1,500 games · `playtests/lane-pool.js`)

Every Pass-3 arm ran 100/100 games, 0 errors. Pooled BY CONFIG across all three passes
(CI = ±1.96·se):

| Config | n | GM win | GM-hall win | committed total | committed hall★ | Novgorod dead | pace |
|---|---|---|---|---|---|---|---|
| off (base) | 200 | 19.0±5.4 | 21.0±5.6 | 43.8 | 2.4 | 11.5% | 17.3 |
| pips+both (ICW .12+bldg) | 300 | 21.7±4.7 | 22.0±4.7 | 52.3 | **13.0** | 14.0% | 18.1 |
| **pips+bldg** | 200 | 20.0±5.5 | 19.5±5.5 | 51.5 | **9.7** | **14.5%** | **17.5** |
| pips+cask | 200 | 21.0±5.6 | 23.0±5.8 | 51.9 | 11.7 | 17.0% | 18.1 |
| pips+both+trimmed★ | 200 | 21.0±5.6 | 20.0±5.5 | 47.3 | 9.1 | 16.0% | 17.8 |

**The confirmed findings:**
1. **The lane is at PARITY in every pips config** — the committed seat wins neither more nor
   less than the same-budget GM (all Δs within CI). What the dials change is the lane's
   *economy*, not its win rate: the committed seat's TOTAL rises from 43.8 (base — hall play
   was a scoring hole patched by other channels) to ~52, with hall★ 9.7–13.0 where base paid
   2.4. Volume at the Hall becomes a real way to score — not a trap, not a magnet.
2. **The pooled base rate corrects the Novgorod scare**: base itself runs 11.5% dead at
   these budgets (Pass 1's 8% was the optimistic tail). The dialed cost is therefore
   **+3 pp (pips+bldg) to +5.5 pp (pips+cask)** — real but mild; the Reliquary-vs-eastern-run
   bid for die-5s is the mechanism. Confirm-D alone read 11% — indistinguishable from base.
3. **Loudness confirms Pass 2**: both-faucets ≈ 13 hall★ (breaches the ≤10 criterion);
   single-faucet ≈ 9.7–11.7; trimmed-★ ≈ 9.1.
4. **The count LADDER is dead** (two nulls) — cut from the design space. Pips is the volume
   term: component-true (the die shows its score) and quality-responsive.
5. Crowns breathe at 4.3–6.7% in every dialed config (base ~0–0.7%). Pace holds within
   +0.2–0.8 rounds of base. Shelf capacity never binds (worst fill 2.3 of 4). Seat-win
   spreads stay flat under rotation — the anti-jackpot structure held across 1,500 games.

## §4 · Verdict & the recommended print ⚙ (NOT ruled — the designer decides)

**Recommended: `HALL_PIPS = 1` + `INV_BLDG = 1` (the Guild Chancery) — and nothing else.**

| Criterion (pre-registered, §2b) | pips+bldg reads |
|---|---|
| 1 · lane viable, not dominant | 19.5% vs GM 20.0% — parity ✔ |
| 2 · compensates majorities, ≤10 hall★ | committed hall★ 9.7 ≥ the ~3.5★ majority deficit; under the loudness bar ✔ |
| 3 · renewable access, Orders still the gate | Chancery ~0.4–0.5/player · Orders ~0.94 (the largest earned source) ✔ (borderline on the 0.5 bar — the first-showing engine covers the start) |
| 4 · Kontor health | Novgorod 14.5% vs base 11.5% (+3 pp — the mildest faucet config); London/Bergen improve ✔ |
| 5 · pace | 17.5 vs 17.3 ✔ |
| 6 · print cost | ONE new tile + one board line — the cheapest print ✔ |

**What it prints:** the Hall board gains one line — *"at game end, every die on a shelf
scores its pips"* — and the Guildhall sheet gains the **Guild Chancery** tile (building,
qty 1, fee 1 `G`, mark start 2: *Gain 1 ⚜ Invitation*), guaranteed into the deal in hall
mode (**deal 17 of 21** ⚙ — the deal size holds; the Chancery displaces a random single,
exactly as tested).

> **RULED 2026-08-14** — the designer: *“Make the change flipping the dials if you think
> that is the right solution.”* Shipped as **v4.16b “Guild Ledger”** (`KEY hanse-v416b`):
> `HALL_PIPS=1` + `INV_BLDG=1` are hall mode’s printed defaults; the ⚜ cask bonus stays an
> unprinted dial; the ladder is cut. The watches in §4 stand for the first human table.

**The optional richness dial** (designer's taste, not sim-forced): the **⚜ cask tiles**
(`INV_CASK_W` ≈ 0.12 — a *Gain 1 Invitation* load bonus in the printed mix) lift access
further and push committed hall★ to ~13 — a quarter of a winning total — at +2.5 pp more
Novgorod cost and a replacement-tile print. The sims say it works; they also say it makes
the Hall loud. If the table wants the Hall louder, this is the knob — and `HSTARS 1,3,5,7`
(trim the once-each ★) is the counter-knob that pulls ~4★ back out.

**Cut:** `HALL_LADDER` (two nulls — pips does volume better, on the component itself).

**Standing watches for the human table:** the Novgorod bid (structural, ~+3 pp; dials if it
bites live: a hall-mode Order naming Novgorod at premium ★, or acceptance — the 2p
historical residual was 33%) · the Chronicler under the eased 20-deck (unrepriced — the
v4.15 watch stands, now sharpened: hall mode adds ~1 claim/player of flow) · the ★-dominant
menu picks (menus matter mostly on repeat visits; the menu study's recommended print still
applies) · the committed-lane persona is an instrument, not a rule — human commitment may
run hotter than the MC's.

*Corpora: `playtests/lane-corpus/` (Pass 1) · `lane-corpus2/` (Pass 2) · `lane-corpus3/`
(Pass 3), AGG.json in each; the pooled table: `node playtests/lane-pool.js`. All 150 shards
ran ~2.5× oversubscribed on 4 cores, uniform across arms and passes (the standing bulk
rule); tier win rates are within-corpus reads, not absolute strengths. Nothing here is
ruled — the recommendation awaits the designer.*
