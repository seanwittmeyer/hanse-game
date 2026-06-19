# Brewhouses of the Hanse — Reviewer's Report (v1.6 "Hops", KEY v63)

*A data-driven review & coaching brief. Built from ~6,000 fast-bot games (greedy/persona/trader/journeyman)
+ a 900-game strong-AI slate (CM/GM/Trader, 60 games × 2–4p × 5 matchups) + the v40/v60/v61 history.
Harness: `playtests/sim.js` (+ FREE_IMP hook), `sim-analyze.js`, `gm-arc.js`, `run-matchups.sh` +
`combine-matchups.js`. All numbers are from the canonical `play.html` engine.*

---

## 1. Verdict

**A genuinely good medium euro that is structurally sound and, at 3–4 players, impressively well-balanced —
with two sharp edges an expert table will find immediately: a player-count strategy flip, and a turn-order
bias that *reverses* with skill.** The squeeze is real, the lanes are legible, and nothing is broken. But it
is **not one game across player counts** — the winning strategy at 2p (go deep / use the uncontested Hall)
is close to the *losing* strategy at 4p (where you must rush volume and control the clock). That's
interesting, not fatal — but it must be taught, and the 2p table plus the seat rule need a balance pass.

**Is it "solvable" by a single lane?** No — and that's a credit to the design. No lane wins across all
counts; at 4p the five lanes sit within ~4 points of fair. The closest thing to a solve is **player-count-
specific**: at 2p, "take the second seat and play quality/Hall" is a near-dominant package (the deep AI wins
70% there). Fix the 2p Hall over-reward and the seat rule and there is no solve.

---

## 2. Is it sound? (robustness & pace) — YES

- **0 crashes / 0 deadlocks** across every configuration (thousands of games, 2–5p).
- **Clock-dominant finishes** (~96–99% end on the Sailed-Ships track, not the round ceiling).
- **Pace in band:** ~13–17 rounds for volume play, stretching to ~21 for deep play (deep sails fewer/fuller
  ships, so the clock fills slower). Both inside the 12–25 target.
- Score totals are tight (winner ~33–47), margins small (avg 8–13) — a close game, as intended.

Robustness is not a question. The rest of this report is about *balance* and *strategy*.

---

## 3. The five lanes — who gravitates where, and what wins

Committed-persona win-rates (per-capita vs fair; N=1000/count, the lane oracle):

| Lane | 2p (fair 50) | 3p (fair 33) | 4p (fair 25) |
|---|---|---|---|
| **Prestige / Hall** | **55–60%** | **37–41%** | 26.5% |
| **Deep / Q5 climb** | **53%** | 36% | 26.7% |
| Volume / majority | 45–47% | 31–33% | 24–26% |
| Demand / value-buildings | 42–46% | 31–33% | 22.8% |

**Read:** the *uncontested* lanes (Hall, the quality climb) dominate at low counts and converge to fair at
4p. The *contested* lanes (volume/majority/demand) need a crowd to pay off — they're player-count-sensitive,
while the Hall is a constant. So **heads-up, prestige/deep is the meta; at a full table, everything
equalizes.** This is the single most important structural fact about the game.

*(Caveat: persona bots are forced into a lane. They measure each lane's raw payoff, not optimal blended play.
The strong-AI slate, below, shows what happens when bots choose freely.)*

---

## 4. THE HEADLINE: the optimal strategy flips with player count

The strong-AI slate makes this undeniable. The Cellarmaster (deep specialist) vs the Trader (volume rusher):

| Matchup | Cellarmaster (deep) | Trader (volume) | Game length |
|---|---|---|---|
| **CMvTr 2p** | **70.0%** | 30.0% | 16.3 rounds |
| CMvTr 3p | 37.0% | 29.5% | 16.4 rounds |
| **CMvTr 4p** | **17.5%** | **32.5%** | 15.5 rounds |

At 2p the deep bot **crushes** the volume bot (70%). At 4p the *same* deep bot, against the *same* volume
bot, **loses** (17.5% vs 32.5%). The mechanism is the **clock-rush**:

- The Trader ships **7–8 cheap casks/game**; the Cellarmaster ships **~5 richer casks**.
- A table of volume rushers **fills the Sailed-Ships clock fast** (CM-vs-Trader games end ~15–16 rounds vs
  ~21–22 in a CM mirror). The deep player's Q4/Q5 investment — which *delivers at median round 12* — **never
  matures before the rushers end the game.**
- At 4p there are more rushers and a 13-cap clock, so the game ends before the climb pays. The deep player
  is left holding maturing premium casks at scoring.

**This is why "deep" is the stars-align lane: its payoff needs a long game it cannot unilaterally
guarantee, and a crowd of rushers denies it.** It is a real, teachable strategic tension — but it also means
the "strongest AI" (the Cellarmaster) is **mis-calibrated for 4p**: it over-commits to a climb that the
board won't reward, and a good volume player beats it.

**The unifying winning thread at every count: use the Hall.** Every winning profile enshrines (the 4p
winning Trader ships the Hall **1.6–1.8/game**; the 2p winning CM blends Hall + climb). Every losing profile
under-uses it (the Guildmaster, Hall 0.2–0.5/game, is the clearest loser). The Hall is the efficient,
uncontested, fixed points-per-cask floor — and it is currently **under-priced relative to how reliably it
wins.**

---

## 5. Strength ladder (with the budget caveat that matters)

The slate ran at a throttled bulk budget (Guildmaster 45ms / Cellarmaster 70ms per decision; in-page they
get 250ms / 1500ms). **At that budget the Guildmaster is under-strength** — it loses to the free,
full-strength Trader at every count (GMvTr: Trader 52/40/36%). That is a *budget artifact*, not a real
inversion: at a realistic 150–250ms the Guildmaster beats the Trader ~62% (historical `ai-ladder`/`gates`).

What *is* robust from the slate:

- **Cellarmaster > Guildmaster** at every count (CMvGM 63/48/31%), consistent with history. The CM's edge is
  precisely the lane the GM can't price — it climbs more (Q4+ up to 1.3/g) and enshrines/ships-Novgorod more.
- The **authoritative ladder** (proper budgets, from history): Apprentice < Journeyman (~85%) < Trader
  (~71%) < Guildmaster (~62%) < Cellarmaster (~62–72%). It holds — but note the top two rungs are
  **budget-sensitive**: the "strongest AI" depends on think-time, and a fast flat-MC Guildmaster rivals the
  Cellarmaster at equal compute.
- The **Guildmaster's strategic blind spot is real and exploitable**: it ships the Hall 0.2–0.5/game and
  cannot value the deep/prestige lanes — a committed quality+Hall plan beats it (this is *why* the
  Cellarmaster exists).

---

## 6. Turn order — broken for experts, and it *reverses*

Seat win-rate from the mirror matchups (every seat the same tier, so any spread is pure turn order):

| | P1 | P2 | P3 | P4 |
|---|---|---|---|---|
| **CMvCM 2p** | 28.3% | **71.7%** | | |
| **GMvGM 2p** | 33.3% | **66.7%** | | |
| CMvCM 3p | 21.7% | 35.0% | 43.3% | |
| GMvGM 3p | 26.7% | 35.0% | 38.3% | |
| CMvCM 4p | 15.0% | 40.0% | 20.0% | 25.0% |
| GMvGM 4p | 25.0% | 28.3% | 23.3% | 23.3% |

- **2p is unambiguous and corroborated by both strong tiers: the second player wins ~67–72%.** The greedy
  and persona bots show the *opposite* (P1-favored, up to 59%). So the **+1G seat compensation is tuned to
  weak play and over-corrects for skilled play.** It's a flat +1G to *every* seat after the first, which
  *amplifies* a natural reactivity/second-mover edge that strong players exploit (move second → see the
  opener → answer it; the toll only bites if you choose to follow them).
- **3p tilts to later seats** (P1 worst) under both strong tiers.
- **4p is noisy/near-fair** (GMvGM 4p is essentially fair; CMvCM 4p shows P1 low but P2 high — partly the CM's
  4p mis-calibration). The clean, robust problem is **2p**.

For coaching expert players, this is the most important single fact at the table: **at 2p, take the second
seat.** For the designer, the seat rule needs a rethink (compensate P1, not P2; or rotate the start player;
or make the comp skill-robust).

---

## 7. Your two questions, answered

### Q1 — Why don't bots engage Q4/Q5? (~80% incentive/structure; the tooling is *not* blind)
- **We are getting data for that part of the game.** The Cellarmaster and the deep persona *do* climb (~1
  Q4+/game) and enshrine — and win at a competitive (not dominant) rate. The lane is **playable, not dead.**
- The medium bots skip it for **real reasons**: the clock barely fits the arc (first Q5 *delivery* at median
  R12 in ~13-round games; only 15–21% of Trader games ever deliver a Q5), cheap beers cycle ~3× faster, and
  the hops bottleneck (now that recipes are hops-led) gates it. Cheap volume is tempo-optimal for flexible
  play, *especially* against a clock-rush.
- The Guildmaster's avoidance is partly a genuine **tooling** limit — its journeyman rollout can't price the
  deep payoff — but the Cellarmaster proves the engine and harness *can* evaluate the long arc.
- **Even optimal play blends** (CM: Q5 ~0.4–0.6/game, never all-in). So Q4/Q5 reads as a **selective
  capstone** (a Novgorod premium, a Hall enshrine, the 5th Flight beer), not a stackable pure lane. If you
  want it to be a *pure* path, the lever is the **clock/payoff window** (give the climb room, or throttle the
  rush) — **not** Bock's cost (already shown to be the wrong lever).

### Q2 — Why are improvements under-used? (the barrier is the *action*, not the goods — and Hop Garden is now king)
Free-starting-improvement win-rate vs fair (N=2000/count, greedy; one distinct improvement/player):

| Improvement | 2p | 3p | 4p |
|---|---|---|---|
| **Hop Garden** | **+10.1** | **+12.7** | **+7.4** |
| Aging Cellar | +3.4 | +2.6 | −0.2 |
| Granary | +2.6 | +0.9 | +6.1 |
| Lagering | +1.1 | +1.7 | +1.2 |
| Harbor Crane | −5.4 | −4.3 | −3.3 |
| Extra Vessel | −7.1 | −5.9 | −5.4 |
| Private Quay | −4.3 | −6.8 | −5.9 |

- **Your Granary instinct was right — pre-Hops.** The hops-led rebalance you shipped moved the crown to
  **Hop Garden** (hops is now the binding constraint on quality and the climb). It's the clear #1 at every
  count; Granary is now middling.
- **The barrier is action-economy, not cost.** Even handed out *free*, the best improvement only adds ~+10%
  win-rate. At **4–5G plus a whole Market action** — the most contested station — that lift rarely beats the
  tempo lost. Skipping them early is *rational*. **Your "buy improvements at the Cellar" idea is the right
  lever**: move the purchase to the least-contested station to cut the opportunity cost without touching the
  price.
- The throughput improvements (Crane/Vessel/Quay) score *negative* even when free — partly because the greedy
  bot can't pilot them (the Floor that's meant to justify Extra Vessel is never run). Judge the **passive**
  tier as the clean signal: **Hop Garden ≫ Granary ≈ Cellar ≈ Lagering**, throughput perks unproven.

---

## 8. How to win — coaching brief by player count

- **2 players:** *Take the second seat if seating is open* (≈70% with strong play). Climb quality and **lean
  on the Hall** — it's uncontested and under-priced, so a quality+enshrine plan over-performs. The game runs
  long (you control the clock together), so the climb has room. Deny your opponent the rich Bergen majority.
- **3 players:** Transitional. A slight edge to quality/deep + a later seat, but volume is viable. Secure one
  majority you can defend (Bergen pays most), enshrine your best, and don't get rushed off the clock.
- **4 players:** **Rush volume.** Ship cheap casks fast (7–8/game), bank majorities, **enshrine the Hall late
  (the winning Trader ships it 1.6–1.8/game)**, and *end the game before the deep players cash in.* **Do not
  over-invest in the Q4/Q5 climb** — it won't mature before a rusher closes the clock. Bruges/Bergen early,
  Novgorod opportunistically, Hall to close.
- **Universal:** Enshrine. Every winning profile uses the Hall; every losing one under-uses it. If you only
  learn one thing, it's that the Hall is the efficient floor — and it's *more* than a floor right now.

---

## 9. Prioritized design levers (for the studio)

1. **The 2p meta + Hall over-reward (highest priority).** At 2p the Hall/quality package + the 2nd seat is
   near-dominant. Lever: trim the Hall ladder *at 2p* (or generally), and/or compensate P1 instead of P2.
   The Hall is the common thread in every winning line — it's under-contested and over-paid.
2. **Seat compensation is backwards for experts.** Flat +1G to later seats amplifies a second-mover edge.
   Compensate P1, rotate the start, or make the comp skill-robust. (2p is the acute case.)
3. **The 4p deep trap / clock-rush.** Deep play is structurally punished at 4p. If the deep lane should be
   viable at 4p, give the climb room (slower clock at high counts, or a way to protect maturing casks from a
   rush) — *not* a cheaper Bock.
4. **The improvement economy is dead.** Even free, most improvements are marginal; bought at the Market they
   never clear the tempo bar. Move the purchase to the **Cellar**, and/or make the Floor actually pilotable
   so Extra Vessel earns its place. Hop Garden is the one that already works.
5. **The "developer / authorship" lane is vestigial.** The rival-overbuild bonus scored **0 in all 900
   strong-AI games** — 8 slots are never contested enough to overbuild. Either tighten the ring (fewer slots,
   or more building pressure) or accept that "authorship" is really just the demand lane.

---

## 10. Bottom line for expert coaching

> **The game is not solvable, but it is two different games.** Heads-up it's a quality-and-prestige race the
> second player is favored to win; at a full table it's a volume-and-tempo race where the deep climb is a
> trap and the clock is the weapon. The constant across both is the Hall: it is the most reliable points
> engine in the box, and the field systematically under-uses it. Win by enshrining more than your
> opponents — then add the lane the player count rewards.
