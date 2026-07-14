# Gameplay analysis — the CM corpus, v3.2d (2026-07-14)

> 15 turn-by-turn games on the canonical engine (`KEY hanse-v32d`), every table anchored by
> Cellarmaster seats, personas varied through trader seats + two Guildmaster cross-checks.
> Method, budgets, contention and matrix: `README.md` (this folder). Raw logs: `pbp-*.log`.
> Quantitative sweep: `DIR=cm-v32d node playtests/pbp-stats.js` (with the caveats in §6).

## 1 · The fifteen games

| Game | Seats | Rounds | End trigger* | Result (winner first) |
|---|---|---|---|---|
| 2p-1 | CM mirror | 25 | ships clock (R25) | **47–45** — a 2-point nailbiter |
| 2p-2 | CM mirror | 20 | ships clock | 53–29 (Hall sweep beat Bruges-volume) |
| 2p-3 | racer vs CM | 17 | presence clock | CM 53–15 |
| 2p-4 | CM vs prestige | 25 | presence clock (R25) | CM 74–17 |
| 2p-5 | GM vs CM | 25 | ships clock | **GM 58–43 — the kontor line wins** |
| 3p-1 | CM mirror | 17 | presence clock | 53–37–35 |
| 3p-2 | CM mirror | 19 | ships clock | 50–29–29 |
| 3p-3 | V + CM + CM | 20 | ships clock | CM 66–44–44 |
| 3p-4 | CM + M + racer | 23 | ships clock (+ last disc same round) | CM 65–46–37 |
| 3p-5 | CM + GM + CM | 21 | ships clock | CM 76–47–44 |
| 4p-1 | CM mirror | 24 | ships clock | 45–43–42–32 — another tight mirror |
| 4p-2 | CM mirror | 20 | ships clock | **48–48–47–41 — four-way photo finish** |
| 4p-3 | CM+V+CM+P | 21 | presence clock | CM 59–43–42–32 |
| 4p-4 | racer+CM+GM+CM | 22 | ships clock | **racer 50–49–49–43** |
| 4p-5 | V+CM+P+M | 16 | presence clock | CM 59–27–23–16 |

*\*Attributed from the in-log trigger lines — the narrate digest header predates the v3.2
dual clock and mislabels presence endings as "ROUND CEILING" (see §6).*

**Zero crashes, zero deadlocks, zero unknown-prompt bails across ~800 turns.** No game hit
the true round-25 backstop without a clock also firing.

## 2 · Pace & the dual clock

- Rounds: **2p avg 22.4 · 3p 20.0 · 4p 20.6** — inside the 12–25 band, but strong play sits
  near the top of it (the greedy corpus ran 15–17).
- **Trigger split is genuinely dual**: ships clock 10 of 15, presence clock 5 of 15 — the
  v3.2 design intent ("the corpus splits endings between the two triggers") holds at strong
  play, and 3p-4 hit both in the same round.
- **⚙ Watch-item (2p pace):** three of five 2p games ran to round 25 and 2p averages 3.2
  full sails per game against a 5-cell track — heads-up CMs starve the shared hulls (each
  prefers enshrine tempo over filling the rival's cog). The game *ends* correctly (presence
  discs backstop it) but 2p at strong play is a long, grindy 22–25 rounds. Candidate dials:
  2p `SAILED_CAP` 5→4, or a 2p presence pool 14→12. Human 2p pace (playtests ran 8–11
  rounds pre-v3.2) may not reproduce this — verify at the table before touching a number.

## 3 · Balance — what strong play looks like

**Skill expression is enormous.** The Cellarmaster beat committed trader personas by 2–4×
(53–15, 74–17, 59–27–23–16). At GWT weight that's a feature — the ceiling is real — but it
means preview tables with one strong player will look lopsided; demo scripts should seat
equals.

**Equal-skill games are tight.** The mirrors produced 47–45 (2p), 53–37–35 / 50–29–29 (3p),
and 48–48–47–41 / 45–43–42–32 (4p) — including a four-way photo finish decided on the
tiebreak. Winner scores 41–76; typical strong-play winner ≈50–60.

**No lane negates another (the standing pole test passes):**
- The **Hall's FAME race is the hottest lane** — 51 of a possible 52 FAME coins were claimed
  (98%); most winners banked the Q4/Q5 coins (10/13★). It runs hot, per design ("the honors
  go to the quick").
- **The kontor line beats it when played well**: 2p-5's Guildmaster won 58–43 on pure
  Novgorod scaling (Mumme 4/4/7 + Bock 9) against a CM holding both top FAME coins. Bergen's
  9-point anchor decided several games; majorities were 0–23 points of winner totals.
- **The racer (the human playtest's charter-pump line) is competitive but no longer broken**:
  it won 4p-4 by exactly one point and lost everywhere else — exactly what the v3.1 dials
  (Hanzehuis die 3, clock 7→v3.2 retune) were meant to achieve.
- **The Flight pays twice, visibly**: flight-16 (5 distinct brews) appears in 9 of 15 winner
  lines and the unlock track kept every mirror player brewing broad.
- **Specialists now flow at strong play**: Hop Gardener ×5, Cellarman ×4, Quaymaster ×3,
  Lagerkeeper ×3, Grain Factor ×3, Stevedore ×2 across the corpus (they barely moved in
  older greedy corpora). The Coppersmith never sold — the Flight opens slots fast enough.
- **⚙ Recorded, not dialed** (per the negation criterion): CRAFT/FAVOR coins are bought
  selectively (29 of 104 openings; the Masters' free-passage FAVOR is the favourite — 9
  claims, and 2p-1's winner spent a Q5 *for zero stars* just to buy the passage that closed
  the clock while ahead — a genuinely great endgame story). FAME's near-100% claim rate vs
  CRAFT/FAVOR's 28% says the power coins are priced about right as situational, but if a
  future pass wants the Hall cooler, FAME 5/7/10/13 is the dial.

## 4 · Mechanism liveness (does the signature stuff actually happen?)

Per game across 15 games (14 with logs at time of counting; 4p-1 folded into totals below):

| Mechanism | Rate | Read |
|---|---|---|
| Full sails | 3.2 (2p) → ~6 (4p) | shared hulls carry the volume game |
| Rival-loading (loader bonus) | **~2.8/game** | the signature interaction fires constantly |
| Commission dockside pickups | ~1.2/game | commissioning-as-tempo is live |
| Hall enshrines (coins+launches) | 4–10/game | the Hall is the most-trafficked destination at strong play |
| Kontor charters ("by charter") | **~1.7/game** | healthy relief valve — not spammed, not dead |
| The Masters' passage (free delivery) | 9 total | the marquee FAVOR coin |
| Launches (★=quality floor) | ~1/game | the never-nothing floor works, unspammed |
| Over-deploy: own tap-outs / soured Q1s | 7 / 11 total | placement-as-attack is real but occasional |
| Overbuilds (+ ground rent) | ~0.6/game | the churn the v2.8 gatekeeper flagged is *gone* at strong play |
| Displaced-tile +3★ discards | 2 total | edge case, working |
| Occupancy tolls | 5.6 (2p) → 24 (4p) | the 4p wharf is properly contested |
| **Pilot's House re-destinations** | **0** | ⚙ dead tile at strong play — reprice or rework |
| **Open Staithe deploys** | **1** | ⚙ near-dead — same |
| Null/thin turns | **0 in ~800 turns** | the turn floor holds at strong play |

## 5 · The gatekeeper pass (fresh, this build, this corpus)

**The Critic — yes.** The dual-role cask still earns the game's existence next to GWT and
Distilled, and v3.2d finally made the scoring legible enough to say out loud: coins + dies +
majorities + flight, four numbers. The 2p-1 finish (burn a Bock for a free passage to slam
the clock) is the kind of story reviewers retell. Remaining wrinkle: two of the five new
works are furniture (§4) — a 27-tile deck should have zero dead cards.

**The Optimizer — yes, with a watchlist.** The v2.8 exploit list is closed: no overbuild
carousel (ground rent), no zero-point deliveries (≥1★ floor), no enshrine treadmill (coins
are one-shot; launches floor at quality). New watchlist: the FAME race is the strongest
opening meta (98% claimed — first-Q3-to-the-Long-Shelf is close to an opening book), and 2p
strong play grinds long. Neither negates a lane; both are dials, not surgery.

**The Bridge Player — yes-ish.** Zero null turns and the log reads like a story — but the
skill cliff is steep (2–4× blowouts vs committed-but-inferior lines), so the *teach* has to
set expectations: this is a game you get better at for ten plays. The browser demo with the
5-tier AI is the perfect onboarding ramp and should be a launch asset, not a dev tool.

**The Buyer — yes if the box looks the part.** The demo table shows constant interaction
(rival loads ~3/game, tolls, coin races), a dramatic dual-clock ending, and a 75–120 min
runtime. That sells at GWT weight. What's still missing for the con floor is entirely
presentation: art, iconography at arm's length, and a rulebook that survives Grogan.

**Panel verdict: the "great bones" spread of v2.8 has become "ship it once the paint dries."**
The three structural leaks that review flagged (slot economy, Hall treadmill, zero-point
deliveries) are all verifiably closed in this corpus. What remains is polish-tier: two dead
tiles, a 2p pace dial, demo-table choreography, and everything §4 of the launch plan says
about presentation.

## 6 · Tooling debts this corpus surfaced (fix before the next big read)

1. `narrate.js` digest header: label presence-clock endings (`S.endReason`) instead of the
   binary CLOCK/ROUND CEILING guess; its "flight beers" line still lists *delivered* distinct
   beers while `sc.flight` correctly scores *brewed* (v3.2d) — relabel to avoid misreads.
2. `pbp-stats.js`: `charters` regex matches the retired "charters a" phrasing — v3.2's line
   is "by charter" (this analysis recounted by hand); `taps` counts the retired TAPS verb.
3. Neither blocks anything — the raw logs carry the truth — but the next corpus reader
   shouldn't have to re-derive these.

## 7 · What this means for the launch (bridge to `LAUNCH-PLAN.md`)

The engine clears the review bar mechanically: signature interaction that actually fires,
closed exploit list, dual-clock endings with drama, enormous skill ceiling with tight
equal-skill finishes. The pre-campaign design list is short and finite — 2p pace dial ·
two dead work-tiles · FAME-race watch · demo choreography — and none of it is structural.
Everything else that decides the raise is presentation and audience work, which is the
launch plan's department.
