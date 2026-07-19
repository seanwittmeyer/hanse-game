# Play-by-play review notes — v2.9.1 (KEY v94), 30 sim games + 4 human logs

30 narrated games from `narrate.js` (10 per player count, seeds 211–220 / 311–320 / 411–420, reproducible),
mixed Trader-persona / Guildmaster / Cellarmaster seats, 0 errors. Quantitative companion: `node playtests/pbp-stats.js`.
Human logs in `logs/human/` (older rules iterations — buildings-to-hand era — read for behavior, not arithmetic).
Prior baseline: `REVIEW-NOTES.md` (v92, the review that produced v2.9 "Ground Rent").

## Quantitative summary (pbp-stats)

| n | rounds avg | sails | charters | enshrines | overbuilds | spoilage | tolls | rival loads |
|---|---|---|---|---|---|---|---|---|
| 2p (10) | 14.6 | 3.7 | 0.4 | 1.8 | 0.4 | 0.0 | 3.4 | 1.0 |
| 3p (10) | 18.8 | 5.5 | 1.3 | 2.9 | 3.0 | 0.3 | 13.0 | 3.5 |
| 4p (10) | 16.4 | 6.5 | 1.4 | 5.4 | 5.1 | 0.5 | 23.3 | 5.0 |

End triggers: 26/30 clock, 4/30 round-ceiling (2p-10, 3p-2, 3p-8, 4p-5 — all MC-heavy stall tables).
Below/at the 12-round band floor: 2p-4/6/7/9 (R11), 3p-5 (R11), 4p-3 (R9), 4p-6 (R10).
Winners: Cellarmaster 13 · Guildmaster 8 · Trader 9. Delivery-value shapes: Novgorod = 56× Q3=2 chaff
vs the jackpot tail (Q4=9/10, Q5=12); Bruges = 97× Q1=1; Hall = 48× Q3=5 vs 22× Q5=9.
Q2=1 Novgorod deliveries ×4 = the old zero-point exploit now paying the v2.9 floor.

---

# 2p games 1–5 (reader batch A)

**GAME 2p-1 (seed 211) · TraderV[volume] vs Guild[GM] · Guild wins 38–25 · ends R13 by clock**

- Story: Guild won on one lane — Novgorod scaling + a value privilege. Bock Q5=12 and Keut Q3=5 at Novgorod (both shipped from under his own Burgomaster's Favor) plus Novgorod majority +8 and a 4-beer Flight (9). TraderV led 25–4 as late as R12 on cheap Bruges volume + two Keut enshrines, then got overtaken by two Novgorod deliveries.
- The winning turn — R13 t26: TAP Hopped from vessel → survey → author Gauger's Office; TAP Gruit off a slot → +G2+H1 → fit Hop Gardener; deploy Keut under Burgomaster's Favor; load → Cog sails Novgorod → 6/6, final round. One turn = 2 taps, 2 tiles, a delivery, and the door slammed at Guild's peak.
- Little wins: TraderV's R3 t5 (source → brew → deploy → load → Cog sails Bruges → double liquidity benefit) is the clean trader loop; R7 t14 Guild triple-ages Bock 0→READY in one Right-col activation.
- Failures: TraderV stalled R9–R12 — repeated "no Ready cask to deploy," 2 casks parked under non-value neutrals (die never set), Keut monoculture. His Bock, brewed R13, died in the vessel unshipped. Guild's R8–R11 (score stuck at 4 for five rounds) is the MC hoard-then-burst artifact.
- Interaction: mild. Shared-hull symbiosis early. Two occupancy tolls, both paid by TraderV. No rival-loading, no overbuild, no spoilage.
- Endgame: TraderV himself ticked 4/6 and 5/6 with fallback Keut enshrines while behind on engine — he armed the clock Guild then fired.
- v2.9.1: Gauger's Office authored with the new text but never shipped through. Min-1★ visible on every Gruit/Hopped delivery.
- Surprise: a 21-point comeback in two rounds purely from one privilege + Novgorod scaling. Reads great; also shows how invisible the MC's setup phase is until it detonates.

**GAME 2p-2 (seed 212) · Cellar[CM] vs TraderP[prestige] · Cellar wins 59–5 · ends R16 by clock**

- Story: total blowout, the ugliest game of the set. Cellar scored on every lane — Hall 23 (Bock 9, Mumme-as-Q5 9, Broyhan 5), Bergen majority +9, Bruges +4, 5-beer Flight = 16. TraderP scored 5, all before R8.
- Star sighting: R16 — Cellar's Mumme enshrined as **Q5 for 9★** (deployed under Malt Kiln R14): the +1-quality lift counted for the Hall ladder. Quality-lift-counts-for-points working exactly as v2.9.1 intends — a 2★ swing on one tile.
- Combo of the game: R14 t27 — TAP Gruit off slot, fit Grain Factor AND Coppersmith, deploy Bock under Bruges Hanzehuis + Mumme under Malt Kiln, enshrine Bock Q5 (tick 4/6). Then two more enshrines R15/R16 — Cellar ticked the final three clock steps solo.
- The failure that defines the game: TraderP's two Q5 Bocks **stranded on a 2/3 London Hulk that never sailed** (loaded R11, R15). Under "sail only when full," the leader simply never contributed the third cask, then ended the clock. Two Bocks + a London Steelyard privilege = ~20 unbanked points, dead on the water.
- TraderP had effectively no scoring action for the game's last 8 rounds (vessels clogged by 3-step Bock maturation while broke).
- Dockside pickup sighting: R5 — TraderP commissions the Cog→London directly ON his deployed Hopped.
- Tolls: TraderP paid all 3 — the trailing seat kept eating the fee.
- Endgame: at 2p cap 6, three enshrines = half the clock in the leader's sole control.
- Unfun flag: the "starved seat" scenario at its worst — one seat playing solitaire for 8 rounds.

**GAME 2p-3 (seed 213) · Guild[GM] vs Cellar[CM] · Cellar wins 44–15 · ends R16 by clock**

- Story: MC-vs-MC, the grindiest, lowest-texture game of the five. Cellar won on **majorities** (Bergen +9, Novgorod +8 = 17 of 44) plus one Bock→Novgorod (6) and one Broyhan enshrine (5).
- Opening combo: R1 t2 Cellar deploys his Ready Gruit, immediately TAPS it off the slot for +G2, and fits Coppersmith AND Grain Factor on turn one — his starting cask as a cash converter (deploy-then-self-tap = a 1-turn goods pump; slightly degenerate-looking).
- Failure texture: the warm-start Hulk→Novgorod sat "nothing eligible to load" from R4 to R11 — seven rounds of a dead 3-berth hull. First sail R8 (Sailed 1/6 at the halfway point). Rounds 3–7 are near-uniform "no Ready cask to deploy" filler.
- Guild's midgame collapsed: score 7 from R9 through R14; his Mumme, brewed R16, never matured.
- **Zero player buildings the entire game** — the wharf ends with two neutral Cooperages. Nobody bought or surveyed a single tile; almost every kontor delivery paid the 1★ floor. The whole value-privilege/demand-die layer simply didn't happen (goods poverty most of the game).
- Interaction: Cellar took the loader bonus twice on Guild's casks — both times it also handed Guild a delivery; rival-loading read as symbiotic.
- Endgame: R15 t30 Cellar mega-turn — charter Gruit→Bruges (tick 4), fill-and-sail the Cog with Guild's cask (tick 5), then R16 enshrine (tick 6). Leader ticked the last three steps alone, again.
- Unfun flag: a 16-round game where the first delivery lands R4 and the board barely changes for five rounds.

**GAME 2p-4 (seed 214) · TraderM[majority] vs TraderP[prestige] · TraderM wins 42–26 · ends R11 by clock**

- Story: the fastest, punchiest game. TraderM (majority persona) won mostly on **Hall prestige** (Bock 9 + Broyhan 5) plus Bergen +9 and Bruges +4. TraderP took Novgorod (+8) with quality-lifted deliveries.
- Best v2.9.1 evidence: quality lifts paid in the digest — TraderM's Q2 Hopped under the neutral **Gauger's Office** delivered to Novgorod as "Hopped Q3=2"; TraderP's Broyhans under **Malt Kiln** delivered as "Broyhan Q4=4" twice. The lift changing the Novgorod payout bracket is the new rule doing points work.
- Little wins: R9 TraderM Bottom-row double-age takes Bock 1/3→READY→deploy→**enshrine Q5 same turn** (9★). R5 TraderP: commission Hulk→Bergen, loader bonus shipping TraderM's Hopped, then brew and deploy.
- Toll war: TraderM paid **five occupancy tolls in his first seven turns** — at 2p the toll fires constantly when both bots chase the Market/Brewhouse row; a real tax on the follower.
- Failures: TraderP bought Staple Hall R10 and authored Burgomaster's Favor on the literal last turn — ~5G of infrastructure that never scored.
- Endgame: TraderM ticked 4 and 5 with enshrines then filled the Novgorod Hulk himself R11 for 6/6 — the third cask was his own, sailing two of TraderP's Broyhans with it (TraderP scored those, 8★ — the clock-slam had a real cost, which is healthy).
- The most fun log to read — constant shipping, mixed hulls, tolls, lifts scoring.

**GAME 2p-5 (seed 215) · Cellar[CM] vs Guild[GM] · Guild wins 52–33 · ends R15 by clock**

- Story: Guild won broad — Novgorod (Mumme Q4=**10**, Broyhan 5) + London majority +5, Novgorod majority +8, Flight 9, and the batch's only **floor score: +6**.
- THE v2.9 sighting — R15 t30, Guild's mega-turn: sails the London Cog (tick 5), then **pays 1G ground rent, overbuilds his own Connoisseur's Cellar** (FLIPS to his floor, 3★ at end), authors Staple Hall — then **pays ground rent again and overbuilds the Staple Hall he just placed with another Staple Hall** (second FLIP), deploys Broyhan under Burgomaster's Favor, fills the Novgorod Hulk (tick 6/6), game over. Ground rent, flip, and floor scoring all fired — but as a **self-overbuild points pump: 2G + spare tiles = 6★**, never as denial. Degenerate line; flag it.
- Guild's building empire came almost free: survey cask actions handed him four tiles vs one bought. Survey ≫ Market purchase on this evidence.
- Demand-die showcase: Mumme shipped from under Burgomaster's Favor → die 6 + Novgorod base 4 = 10★, the game's biggest delivery.
- Rival-loading fest (healthiest interaction of the batch): R10 Guild **dockside-pickup** — commissions the Novgorod Hulk directly ON Cellar's deployed Bock; R11 Guild loader-bonus on Cellar's Hopped→Bergen; R14 Cellar returns the favor loading Guild's Mumme→Novgorod (which became Guild's 10★). Every rival load helped the owner as much as the loader.
- Failures: Cellar's R12–R15 sag — score frozen 5 rounds, 5 occupancy tolls paid; his only Q5 was routed by Guild, not himself.
- Endgame: Guild ticked 5 AND 6 inside one turn with the overbuild spree sandwiched between — total end control.
- No spoilage despite deployed Q1 Gruits early — by the time anyone had a Ready Q4+, the Q1s were long shipped.

**BATCH A TRENDS (2p-1..5):**
1. MC beats heuristic every time; the strongest seat won all 5 (one 59–5 starvation spectacle).
2. **Enshrine is the 2p clock weapon** — in 4/5 games the winner personally ticked the final 2–3 steps, usually via enshrines. At cap 6, three enshrines = half the clock under sole leader control. Leaders slam the door at their peak; trailers' premium casks die un-shipped.
3. **"Sail only when full" + a hostile clock = stranded premium cargo** — the rival's inaction is a free, invisible denial play. The single biggest unfun pattern in the batch.
4. Novgorod scaling + one value privilege = the headline payouts (12, 10, 9). Burgomaster's Favor the standout tile. Bergen's +9 bought with 2–3 Q2 Hoppeds in 4/5 winning scores — cheap for what it pays.
5. v2.9 audit: ground rent + FLIP + floor scoring sighted once (self-inflicted 2G→6★ pump); quality-lift-for-points repeatedly and working great; min-1★ everywhere; dockside pickup twice; **spoilage: zero sightings** (deployed Q1s ship before anyone holds a Ready Q4+ at 2p tempo).
6. Rival-loading read as symbiotic, never hostile — no bot dumped a rival's Q5 to a 1★ port (but see 4p batch).
7. Tolls tax the follower (counts track the losing seat).
8. The building economy is optional — and games are duller without it (2p-3: zero tiles, flattest read). Survey dominates Market purchase.
9. Dead-turn stretches for the trailing seat are common and long (~8 rounds in 2p-2). "No Ready cask to deploy" + clogged 3-step vessels is the shared signature.
10. Flight separates winners (4–5 beers = 9–16 pts vs 0–4).

---

# 2p games 6–10 (reader batch B)

**GAME 2p-6 (seed 216) · TraderV def. TraderP 31–26 · R11, CLOCK**

- The *volume* trader won through the **Hall** — 19 of 22 delivery points are enshrines (Bock 9, Keut 5, Keut 5) plus London majority +5. The persona label meant nothing; enshrine tempo decided it.
- Little win: R3 the warm-start Hulk→London sails and the London benefit pays **three free buildings in load order** — the benefit-on-delivery rule reading clean and fun.
- Hurdle: whiff-spam turns recur all game (4 straight null stops). TraderP built two value privileges but converted little; Rich Berth never fired.
- Interaction: TraderP paid 4 tolls chasing V's stations; no rival-loading, no overbuild, no Tap.
- Endgame: after sails at R3/R4, **all four remaining ticks were enshrines**. TraderV ticked 4 of 6 and closed at R11 while ahead — unilateral clock control via enshrine spam.
- Bergen and Novgorod untouched; a Q3 Keut enshrined for 5 beats almost any kontor delivery in this game. Ended below the pace band.

**GAME 2p-7 (seed 217) · Cellar2 def. Cellar 36–22 (CM mirror) · R11, CLOCK**

- Cellar2 balanced lanes — Hall 16 (Keut **Q4**=7 via Malt Kiln, Bock 9), Bruges die 4, flight 9. Cellar hoarded 3 specialists + 3 buildings, won two majorities, delivered cheap, flight 0.
- v2.9.1 load-bearing sighting: deploy Keut under neutral Malt Kiln → "enshrines **Keut Q4**" → 7★ instead of 5. A Q3 brew scoring the Q4 Hall rung.
- Turn of the game: R10 — commission Cog→Bruges, **dockside pickup on Cellar's deployed Hopped** (loader bonus + destination choice), free-load own Gruit → 2/2 **sails the same turn**.
- Charter used exactly as designed (R10: buy Almoner's → deploy under it → Charter Hopped→Bergen, free Reach).
- Failure: Cellar's three consecutive Floor no-op turns R7–R9; buys two specialists (6G) on the penultimate turn — dead money.
- Endgame: Cellar2 enshrines Bock at R11 for tick 6/6 while ahead — the leader slams the door with an enshrine, again. Below pace band.
- The winner owned ONE specialist; the loser's collection never converted.

**GAME 2p-8 (seed 218) · Guild def. TraderM 57–26 · R17, CLOCK**

- A Guildmaster clinic — 31 delivery (Mumme→Novgorod 9+9, Mumme→Bergen 6), 17 majority, flight 9. **Almoner's Stall (+3 where you don't lead) fired on nearly every big delivery** — Guild kept routing premium casks through it to whichever kontor he didn't yet lead.
- Little wins: R2 first **Tap** sighting — TAP a deployed Hopped → survey → free Almoner's Stall → redeploy the same Hopped under it (slot recycled into a private privilege in one turn). R13 monster turn — load, age to Ready, buy Cellarman, deploy under Almoner, 3/3 → **Hulk sails Novgorod, 9+9**; the refine benefit then ages *TraderM's* Bock (the loser's consolation prize).
- Failure (structural): TraderM commissions the **Hulk→Novgorod at R3 with one Keut aboard**, then can't feed it — Q2 monoculture can't board a Novgorod hull. The dead hull blocks a slot ~10 rounds and finally becomes *Guild's* Mumme vehicle. Premature destination-gated commissions are a trap.
- TraderM starved (G0 H0 at R8/R13/R14), 4 deployed casks never shipped; majority persona ended with majorities 4.
- Endgame: Guild's R17 kill shot — commission Cog→Bergen, **dockside pickup on own Mumme**, free-load Keut → 2/2 sails → 6/6 closed while ~30 up. The one game comfortably inside the pace band.
- Watch: Almoner's Stall may be too abusable — a leader can almost always find a kontor he "doesn't lead."

**GAME 2p-9 (seed 219) · Cellar def. TraderP 48–20 · R11, CLOCK**

- The deep lane executed perfectly — Lagerkeeper R1 + Bock recipe R3 + Coppersmith R5 → **two Q5 Bocks to Novgorod (6+6)**, Bergen charter, majorities 17, flight 9.
- Little win: "Lagering Cellar ages every maturing cask" — the 2G Lagerkeeper accelerating Bock off-turn; bought R1, paying by R5.
- Turn of the batch: R8 — commission Hulk→Novgorod, **dockside pickup on own deployed Bock** (1/3), free-load Broyhan (2/3), brew mid-turn, load second Bock (3/3) → sails; refine ages a fresh Hopped straight to Ready. Score 2 → 28 across one turn cycle.
- Failure: TraderP bought the Bock recipe R4, didn't brew it until R10; two free Hires contributed nothing ("free ≠ useful").
- Endgame: **TraderP, 41 points down, enshrines Bock at R11 to close the clock himself** — a bot artifact but a real design note: the trailing player ending the game early is anti-climactic. Below pace band.
- Charter + free Reach is quietly excellent for majority math (Bergen 9 secured partly by two Reach pips).

**GAME 2p-10 (seed 220) · Guild2 def. Guild 24–21 (GM mirror) · R25, ROUND CEILING, clock only 5/6**

- **The stall diagnosis** (28 consecutive no-op turns, R9–R22, both seats "work the Floor" to zero effect): NOT a hard deadlock — Guild sat on G8, 2 contracts, and a deployed Q2 Hopped the whole time; Enshrine, Charter, and a one-cask hull fill were all legal. The MC seats *valued every clock-ticking move below a free pass*:
  - Zero-sum mirror incentives: the trailer never wants the clock to move; every sail also pays the rival — mutual stall is the Nash of the mirror.
  - **The Floor is a costless infinite pass** — no toll, no station requirement; a whiffing cask action = a pure null move. Only MAX_ROUND terminates.
  - Value starvation: both seats Hopped-monocultured; neither GM bought a single Q3+ recipe all game → kontor deliveries worth ~1★, dominated by "do nothing."
  - Board texture: by R8 buildings covered effectively all 8 slots, so new hulls could only enter via dockside pickup.
- The break: R22 Guild2 finally commissions (the MC horizon starting to "see" the R25 ceiling); R23 Guild double-sails (fills the 21-round-old Bruges Hulk, tops the R8 London Cog) — 2/6→4/6 in one turn.
- v2.9 sightings (the only ones in the batch), R23: **ground rent paid twice**; a FLIP to floor; and the degenerate one — **Guild pays 1G to displace his own Burgomaster's Favor and authors… Burgomaster's Favor in the same slot**. Self-overbuild-with-the-identical-tile = a 1G → +3★ end-game converter. Both R23 overbuilds were floor-bonus farming.
- v2.9.1: Malt Kiln lift counting at kontore ("Hopped delivered as Q3" at London/Bergen).
- Interaction when they played: rival-loading ×3, dockside pickups ×3.
- Verdict: lowest totals (24–21) across the longest game. 28 no-op turns would be unwatchable at a table.

**BATCH B TRENDS (2p-6..10):**
1. **Pace bimodal and skewing fast**: three R11 clock games (below band), one R17, one R25 ceiling stall. The 2p cap of 6 + enshrine-ticks closes normal games fast, while a motivated stall is unbounded until MAX_ROUND.
2. Enshrine = the 2p clock weapon; the Hall out-earns kontore for cheap casks (Keut 5 vs ~1★ deliveries); the final tick belongs to whoever wants the game over — including, once, the player losing by 41.
3. v2.9.1 gauge/kiln lift verified both ways (Hall + kontor). Deploy-under-kiln → enshrine deserves a balance eye.
4. v2.9 ground rent / flip verified once and immediately gamed (self-overbuilds farming +3, incl. identical-tile replace). Consider: floor bonus only on rival displacement; whether re-authoring the same building should be legal.
5. No spoilage in 5 games — the confluence never arises at 2p tempo.
6. Dockside pickup is the tempo engine of v94 — commission→pickup→free-load→same-turn-sail decided three games.
7. Stranded destination-gated hulls are a trap (blocking ~10 rounds, then serving the rival); hull-completion incentives are asymmetric.
8. **The Floor is an unlimited free pass** — 2p-10 is the proof. Candidate levers (structure, per the lessons): require the Floor to resolve ≥1 effect, tick something on all-pass rounds, or cask decay.
9. Whiff-spam readability: most logged turns carry 3–5 null stop lines.

---

# 3p games 1–5 (reader batch C)

**GAME 3p-1 (seed 311) — Cellar 61 · TraderV 47 · Guild 39 — R24, clock 10/10**

- Cellarmaster won on a balanced sheet (25 dlv / 20 maj / 16 flight, 5 beers) capped by a perfectly-timed close: R24 ages Bock to Ready, deploys under his own Burgomaster's Favor, loads onto Guild's Bruges Cog for the 10th tick — Bock Q5=7 sealed as the track filled. Bruges +4, London +5, Bergen anchor +9.
- Little wins: double dockside pickup (R12 commission onto own Hopped; R17 Hulk→Bergen docks ON TraderV's Keut — loader bonus AND destination choice). The R13 London sail minting three free buildings in one event.
- v2.9.1: neutral Malt Kiln gauged quality for points three times (Hopped→Novgorod as Q3=2; Broyhan→Bergen as Q4; R22 Keut enshrined as **Q4=7**).
- Failure — Guild's dead middle: score 3 from R2 to R16, hoarding Bock+Keut through Floor loops before bursting at R16. 14 rounds at 3 points reads terribly.
- Failure — slow hulls: the Cooperage-boosted 4-cask Hulk→Novgorod took R3→R15 to fill. **+1 capacity under sail-only-when-full is an anti-synergy: a bigger hull is a slower clock.** The R20 Cog→Novgorod never sailed (a Broyhan stranded).
- Interaction: heavy rival-loading economy (cross-loading to force the first Bruges sail); Bruges liquidity showers made Bruges sails everybody's payday. Tolls fired ~15 times — a steady follower tax with no decision content.
- Endgame: ticks 6–9 carried by Enshrines once the wharf built up — the relief valves doing the pacing work. Clock at R24, near the ceiling.
- Quaymaster bought R23, never used (artifact).

**GAME 3p-2 (seed 312) — Guild 37 · TraderP 27 · TraderM 20 — R25, 9/10, ENDED BY CEILING**

- Guild won an ugly stalemate on two chartered premium deliveries — R20 **Mumme→Novgorod = 10★** — plus Bergen +9 / Novgorod +8 farmed with ~8 straight turns of "+1 presence" reach actions in R19–25.
- **WHY THE LAST TICK NEVER CAME:** after tick 9 at R20, the wharf was **fully built (8 buildings on 8 slots)** and all cask berths jammed by 8 deployed casks. That killed the ship channel (nothing re-opens a slot for a hull — overbuild only swaps building for building). The remaining tick verbs — Charter and Enshrine — need a **deployed** cask (v2.8 Deploy First), and the lock bites: **Guild, the only seat with contracts and gold, had deployed:0 and could not deploy** ("no open slot", R25); the seats that COULD tick spent R21–25 in dead Floor loops (one missing a 9★ Bock enshrine — bot blindness); the leader rationally refused to gift a rival a delivery. Structural congestion locked out the leader; the ceiling ended it.
- v2.9 ground rent — both real sightings: R11 Guild pays 1G, overbuilds TraderM's Bruges Hanzehuis (FLIPS to TraderM's floor, +3 banked at end); R14 TraderP self-displaces Rich Berth. Also rent-as-friction: three consecutive "ground rent (1G) unaffordable: no legal slot" denials of a free Survey.
- Little win: TraderM's flipped Hanzehuis Wild became his engine — fired on the Floor ~7 times. The flip genuinely compensates.
- Brutal moment: R19 Guild charters **Bock Q5 → Bergen for 1★** — deployed under a RIVAL's Staple Hall, so no die, no premium. A five-quality cask worth one point. Rules working as written; devastating to read.
- Mass strandings: TraderM ended with THREE full vessels never delivered; TraderP with 2 full vessels + 5 frozen deployed casks. ~12 dead Floor-loop turns across seats in R21–25.
- Endgame control: nobody controlled it; the ceiling did. **The leader benefits from the stall — exactly backwards for a race clock.**

**GAME 3p-3 (seed 313) — Cellar 48 · TraderV 44 · TraderP 26 — R23, clock 10/10**

- Cellar won through the Hall: **Bock Q5=9 twice + Keut Q3=5** (23 of 48), then stole the Bergen anchor (+9, sole presence via Reach) with the game-ending charter.
- Signature combo: R11 — brew Bock, TAP a slot-Gruit for goods, fit the Quaymaster, triple-age Bock 0→READY in the same activation, deploy. Brew-to-Ready in one turn; repeated R14→R16.
- v2.9.1 Gauger's Office: authored R8 with the new text — but never paid (the only cask deployed there was already Q5). The neutral Malt Kiln did the actual gauging work again.
- Failure — TraderP flatlined at 26 from R11: four Bocks brewed, **zero delivered** — the prestige persona never enshrined a single one (9★ each, sitting there).
- Failure — the ship channel died at R10: last hull commissioned R10; for thirteen rounds no ship entered play; ticks 5→10 were four Enshrines + one Charter. Deploy-lock from R19. Same congestion signature as 3p-2, rescued only because the Cellarmaster used the relief valves.
- Endgame control — the batch's best MC play: at R23 Cellar was BEHIND (38 v 44). Taps a vessel, fits Coppersmith, then charters Hopped→Bergen: 1★ delivery, but it plants sole Bergen presence (+9) and slams the clock before TraderV can convert two full Bock vessels. **Charter as a majority-steal-and-close weapon.**
- Winner delivered only 2 casks to kontore all game; 26 of his delivery points were the Hall. The uncontested-Hall lane wins outright when the wharf jams.

**GAME 3p-4 (seed 314) — Cellar 62 · TraderM 33 · Guild 30 — R14, clock 10/10 (fastest, best game)**

- Cellarmaster ran a Bock factory: deliveries **43** — Novgorod Bock Q5=**12, 12, 6** + Bruges Bock=7 + Broyhan Q4=4. The 12s: Bock deployed under his own Burgomaster's Favor (die capped 6) + Novgorod base 6. Brew Bock → triple-age → deploy under Favor → **let rivals ship it** was the whole game.
- The degenerate-adjacent engine: rivals repeatedly paid to deliver the winner's Bocks (R9 TraderM free-loads Cellar's Bock — Cellar banks 12; R12 Guild ditto — 6). The bots fed the leader ~25 points for 2G. A human table would decline — but the temptation structure is clear.
- **SPOILAGE — and it sang:** R14 "Cellar's stale Gruit has soured" — Guild's Ready Mumme evicts a deployed Q1 from under Staple Hall, loads next action onto the Novgorod Cog, delivers **9★**. Exactly the churn-pricing the rule was built for.
- Little wins: R6 TraderM's one-action ship (commission Cog→Bruges with dockside pickup + free-load = 2/2 → sails immediately). R8 Guild's mirror: full hull in one turn.
- Pace: 10 ticks in 14 rounds — 6 commissioned hulls + 2 charters + 2 warm ships; almost every round had a sail or a load. **This is the game working as designed** — constant interaction, no dead turns, no deploy-lock.
- v2.9: rival-privilege zero-die deliveries sighted (Bock via TraderM's Peterhof = 6, no bump).
- Fun to read: yes — the most tabletop-feeling log of the five.

**GAME 3p-5 (seed 315) — TraderP 33 · TraderV 29 · TraderM 26 — R11, clock 10/10 (all-trader)**

- Three heuristic traders. TraderP won on majorities (20) over a razor-thin field. Keut monoculture in full bloom: flight beers 2/2/3. Nobody brewed Bock.
- The clock burned in 11 rounds — cheap Keuts filled every hull instantly, then 4 enshrines of Q3/Q4 chaff finished it. Cap 10 offers no resistance to a spam table.
- **The batch's nastiest hostile move:** R10 TraderP commissions a Cog→**Bergen**, dockside-picks TraderM's Keut, then uses the free-load to grab **TraderM's Mumme Q4 off its London Steelyard slot** and sail it to Bergen — 1★ to the owner instead of a ~7★ London play, destination chosen by the attacker. Commission-as-weapon.
- Little wins: Malt-Kiln enshrine (Broyhan gauged to Q4, Hall pays **7**); the R6 London sail minting three buildings at once.
- Failure — the final tick as a blunder: R11 TraderM, in 3rd, enshrines a Keut (5★) and closes the game, handing TraderP the win. Bots don't check standings before ticking; a human in 3rd never ends this game.
- Anemic ceilings: winning score 33; the game ended before anyone's second gear.

**BATCH C TRENDS (3p-1..5):**
1. **Cellarmaster is 3-for-3** (61, 48, 62) and won three different ways. The MC edge is mostly *converting Bocks* — traders brew them but reliably fail to deliver/enshrine them.
2. **Burgomaster's Favor is the batch's strongest tile.** Rich Berth, Almoner's Stall, Customs House, and Gauger's Office never visibly scored across all five games. **Gauger's Office: authored once, zero gauged deliveries** — while the neutral Malt Kiln produced 6+ quality-lift scorings.
3. Pace variance extreme: 24, 25(ceiling), 23, 14, 11 on the same cap-10 clock. The clock measures table temperament more than it paces the game.
4. **3p-2 exposes a real structural hole: a fully-built wharf permanently closes the ship channel** — then every remaining clock verb needs a deployed cask and an open berth, and the seat with the resources may be structurally unable to tick. Watch items: a building cap, a guaranteed ship berth, or letting a hull dock on a built slot.
5. **Deploy-lock is the shared root of the dead turns** (~15–18 fully dead turns across games 2 and 3, zero in 4 and 5). The unfun tail is congestion-triggered, not just a bot artifact.
6. Rival-loading mostly feeds the leader (2G bought ~25★ in 3p-4); the one hostile use shows the sharp edge humans will find. The incentive asymmetry (1G vs up to 12★) deserves a look.
7. **Privilege-pays-owner-only creates silent point bonfires** (Q5→Bergen for 1★; Q5→Novgorod 6 with no die) — a serious newbie trap since the loss only surfaces at delivery.
8. New-mechanic scorecard: rent paid 2× + blocked Surveys 3× (the fee has teeth); flips banked 2/2 + flipped Wild real turn-value; spoilage 1× and the batch's best single moment; ≥1★ constant; kiln quality-for-points confirmed.
9. **Enshrine carries the late clock** whenever the wharf builds out — beyond "relief"; it changes what the endgame is (local, non-interactive) in congested games.
10. Bruges liquidity + London building-mint are the fun benefit moments; Bergen's Reach quietly decided two games (+9 anchors from Reach chains, not deliveries). Novgorod's refine whiffed ~12× ("nothing maturing").
11. London majority unawarded twice; Cooperage +1 capacity makes hulls slower under sail-when-full.
12. No seat bias visible; scores track game length + MC presence.

---

# 3p games 6–10 (reader batch D)

**GAME 3p-6 (seed 316) — TraderV 39 · Cellar 37 · Guild 35 — R19, clock 10/10**

- TraderV (volume) won on deliveries 22 + flight 9 + a Hall spike (Bock 9 at R12) + a privilege corner (Burgomaster's, London Steelyard, Connoisseur's). Majorities nearly irrelevant (5). Podium spread 39/37/35 — excellent closeness.
- Little wins: Cellar's R4 loader-bonus play (loading TraderV's Gruit to fill the Cog — +1G, the tick, AND double Bruges liquidity); TraderV's R15 Floor turn (Bock convert + Hopped survey → free Cooperage over the neutral Malt Kiln + flipped-Wild income, untolled). Dockside pickups ×3.
- Failure: Cellar burned FOUR consecutive turns (R8–R11) on a null Floor survey — "wharf fully built and the ground rent (1G) is unaffordable" — while holding G0. A starved seat doing nothing for four rounds mid-game.
- Guild's churn waste: placed Rich Berth R13, overbuilt his OWN Rich Berth R15 — floor already full (3 specialists + 1 flip) → **tile to the box, banking nothing**. Bought tile → 1G rent → zero return.
- Interaction: constant rival-loading with loader bonuses (5+); occupancy tolls landed almost exclusively on Guild (7+) — the follower bleeds 1G most turns.
- Endgame: Guild filled the Bruges Hulk at R19 to trigger 10/10, but the trigger helped TraderV, who spent the final turn deploying two fresh Bocks that never scored.
- v2.9 sightings: 6 overbuilds with rent paid; two neutral tear-downs; floor-full→box once; **SPOILAGE at R18** ("TraderV's stale Gruit has soured" as Cellar's Ready Mumme took the berth); min-1★ everywhere; kiln lift at Novgorod.
- The winner's 22 delivery points: 15 from just three casks; the rest 1★ chaff shipped for flight/clock — chaff-shipping as a strategy reads flat.

**GAME 3p-7 (seed 317) — TraderM 29 · Cellar 28 · Guild 27 — R16, clock 10/10**

- Lowest-scoring game of the batch, 3-point total spread. TraderM won on flight 9 + a 5★ Hall Broyhan + majorities 10 — with only 10 delivery points. Nobody built a demand-die engine; nearly every delivery paid the 1★ floor.
- Deal luck: exports Keut + Broyhan + Bock — no Q4, so the ladder had a hole and everyone monocultured Q2/Q3.
- Little wins: TraderM's R7 commission → dockside pickup + free-load → instant 2/2 sail; Guild's London sail paying three free buildings in one event.
- Failure: slot deadlock R13–R16 — "no open slot to deploy onto" for all three seats; 8 slots choked and NOBODY overbuilt (zero ground-rent events — everyone too cash-poor when it mattered).
- Guild over-invested in specialists (4, ~12G) and finished last; its Bock delivered to Bergen for 1★ (deployed under a Works — no die).
- Endgame: Cellar's cheap enshrines ticked 6, 8, 9; the clock driven ~half by enshrines. Nobody controlled the end — it arrived.
- Watch-item: **when no player builds value privileges, delivery scoring collapses to the 1★ floor** and the game decides on majorities/flight alone.

**GAME 3p-8 (seed 318) — Guild 40 · TraderV 28 · TraderP 25 — R25 CEILING, sailed only 7/10**

- Guild won with SIX deliveries — 19 majority + flight 9 + floor 6 — by being the only player who ever ticked the clock after R6: his three charters were the game's only voyages in its last 19 rounds.
- **DIAGNOSIS — why voyages dried up:** (1) both warm hulls sailed by R6; after R5, NO player commissioned another ship for 20 rounds. (2) The traders parked 4 casks each + full vessels with no hull, then found the Floor loop. (3) From R16 to R25 both traders did nothing but work the Floor — **the loop is self-funding: Floor fires a cask's survey → free building → 1G rent → overbuild → flip → the flip is a Wild paying ~+2G/turn forever → funds the next rent.** 14+ overbuilds, the building deck EMPTIED by R22, then pure Wild-farming into full storage. **The ground rent priced the churn at 1G; the Floor Wild engine pays 2G/flip/turn — rent is underwater against its own reward.**
- The floor bonus doing the wrong work: TraderP and TraderV each banked **floor 12** (4 flips × 3★) — their second-biggest category — earned in a closed loop that advanced nothing. Five more tiles boxed.
- The commission gap: traders sat on G8 for 8 rounds and never spent 2G on a hull (bot artifact, but it exposes the hole: **nothing nudges voyage supply; the clock is 100% opt-in**).
- Early foreshadowing: R9–R14 both traders spammed "Survey — rent unaffordable" — wharf full by R9, five rounds nobody could churn, deploys hit "no open slot" with no ships to drain them.
- v2.9 sightings dense: rent ~15×; neutral kiln torn down 2×; floor-full→box 5×; **Gauger's Office authored at R20 and displaced-to-box three turns later, never firing**; Novgorod paid kiln-lifted Keut Q4=4.
- Nice sequence amid the wreckage: R12 hire Grain Factor free via a deployed cask's action, then charter Mumme→Bergen; a charter's Novgorod refine ("Keut ages +1 → READY").
- Verdict: worst read of the batch — ~30 near-identical dead turns. Bot-amplified, but **the Floor/survey/rent economy made stalling PROFITABLE rather than merely passive.**

**GAME 3p-9 (seed 319) — Cellar2 42 · Cellar 38 · Guild 14 — R13 (fastest), clock 10/10**

- Two Cellarmasters raced the clock and lapped the Guildmaster. Cellar2 weaponized the relief valves: **charter Gruit→Bruges on TURN 2 (R1!)**, charter Hopped→Bergen R3 — early sole presence (Bergen +9 uncontested from one Q2 charter). Then commissions, two enshrines, done by R13.
- The clock ledger: 10 ticks = 2 charters + 4 enshrines + 4 sails — **the relief valves supplied 60% of the clock.** The mirror image of 3p-8: the same optional clock, floored instead of stalled.
- Guild starved by tempo, not play: bought Mumme R9, brewed R12, still 2/3 mature at game end. 14 points — a deep/slow build is unplayable against a 13-round rush.
- Little wins: R12 triple (load Guild's Broyhan for the bonus, choose London, complete the sail, take a free Staple Hall from the London benefit); Malt Kiln lift carrying an enshrine (Hopped as Q3 = 5★).
- Cheap-enshrine efficiency: Hopped Q2 → 3★ + a tick + zero logistics, twice. Compare: a 1★ Bruges delivery needs a hull, a berth, and a fill.
- Interaction: brisk and positive — three loader bonuses, a pickup, liquidity showers; zero negative contact.
- v2.9: none of the churn suite — game too short. Min-1★ visible; Novgorod Q3→2 paid.
- Surprising/degenerate: **chartering a Q1 Gruit to Bruges on turn 2 is net-positive** (2G → 2 goods + 1★ + presence + a tick) — charter-as-tempo looks undercosted when majorities at an empty kontor are worth 4–9★. Two rush seats compress the game below where a Mumme/Bock build can exist.

**GAME 3p-10 (seed 320) — Cellar 65 · Guild 45 · TraderP 38 — R18, clock 11/10**

- The batch's best game and biggest score. Cellar won on ALL lanes: 24 deliveries (Hall 15 incl. Bock 9), majorities 19, **flight 16 from FIVE beers**, floor 6. A genuine full-spectrum engine.
- **Ground-rent economy verdict: 10 overbuilds and it CHURNED HEALTHILY here** — spread R13–R17 among all three players, funded by real income, mixing neutral tear-downs with rival displacement. Flips modest (2/2/4) and the game still shipped. This is what v2.9 was for; 3p-8 is what happens when nothing else competes for the same turns.
- But TraderP showed the seed of the pathology: overbuilt HIS OWN privileges three times (incl. Burgomaster's over Burgomaster's), converting his value engine into 12 floor points — **self-displacement played as a scoring line, not a cost.**
- The R17 mega-turn is worth reading twice: overbuild (kiln flips), enshrine (tick 8), fill the London Hulk (tick 9) which pays Guild a London benefit mid-turn (Guild authors, displacing his own Almoner's), then Cellar authors Peterhof displacing his own just-placed Customs House, floor fills, Peterhof itself boxed, Customs House re-authored. **On a table this is a 10-minute resolution sandwich** — and the self-displace/re-author shuffle looks like rules abuse even when legal.
- Spoilage sighting: R16 "TraderP's stale Gruit has soured" — Cellar's Bock seized the berth under Bergen Bryggen. Working as intended against parked Q1s.
- Novgorod scaling shone (Bock Q5=6, kiln-lifted Keut Q4=4); the warm-start Gauger's Office was torn down before its lift ever scored — 0-for-2 on Gauger sightings this batch.
- Interaction: richest of the five — loader bonuses, pickups, tolls heavy on Guild (~8).
- Endgame: Guild triggered 10/10 while trailing by 27 — desperation, not control; Cellar added an 11th tick in the final round.
- Fun to read: yes — the design working: quality climb paid three ways, churn priced but alive, five-beer flight rewarded.

**BATCH D TRENDS (3p-6..10):**
1. Clock entirely opt-in and it shows: 19/16/25/13/18. The two extremes both alarm — 3p-9's 13-round charter/enshrine rush (deep builds can't mature) and 3p-8's 25-round ceiling (zero commissions for 20 rounds). **Voyage supply has no floor.**
2. **The Floor survey loop is the biggest red flag**: free building every turn; rent 1G < the ~2G/turn a flipped Wild pays back; each overbuild ADDS a Wild. Rent as priced does not deter churn — it subsidizes it. Candidate levers: Survey not a repeatable free-building faucet from the Floor; escalating rent; flipped Wilds don't produce goods (only the end-game 3★).
3. **Floor +3★ is being farmed, not suffered** — largely via SELF-displacement (meant as compensation; played as a purchasable score at 1G+tile). Floor-full→box fired 7× — the cap works, but only after 12 points bank.
4. Ground-rent economy is bimodal: healthy (3p-6, 3p-10), dormant (3p-7/3p-9 — short or cash-poor), pathological (3p-8). The can't-pay clause also creates dead turns for broke players.
5. **Demand dice are the difference between 29-point and 65-point games.** When nobody ships from their own privileges (3p-7), delivery scoring collapses to the 1★ floor. Ugliest line: Bock Q5 → Bergen for 1★.
6. Cheap enshrines look undercosted vs kontor logistics; combined with turn-2 charters the prestige lane doubles as a game-shortener.
7. Scorecard: rent 30+; flips abundant; box 7×; spoilage 2×, both satisfying; ≥1★ everywhere; **Gauger's Office appeared 3× and scored 0 — the Malt Kiln did all the visible lift work.**
8. **Bergen is free money** — sole/dominant presence paid +9 in four of five games (once off ONE chartered Q2). The anchor is chronically uncontested at 3p.
9. Winners' profile: no winner won on kontor value alone; every winner had 9+ from flight and/or a Hall spike; deliveries-heavy seats finished 2nd.
10. Interaction arc: strong open/mid, decays into private Floor turns whenever slots jam or hulls vanish. The toll consistently taxes the Guildmaster seat hardest.
11. Bot artifacts confirmed (traders never commission/charter — the direct cause of 3p-8's ceiling) — but the design question each exposes is real: the game currently permits tables where these behaviors deadlock or degenerate the shared economy.
12. Closeness: two 3-way podiums within 4 points (great); blowouts came from tempo mismatch — pace variance, not scoring variance, produces the blowouts.

---

# 4p games 1–5 (reader batch E)

**GAME 4p-1 (seed 411) — Cellar 40 · TraderP 30 · TraderV 29 · Guild 5 — R13, clock 13/13**

- Cellarmaster wins on breadth: 4-beer Flight, Mumme→Novgorod ×2, a 5★ Hall Keut, and **6 floor points minted on the literal final turn** — after sailing to 13/13, it paid ground rent twice to overbuild its OWN Staple Hall and then its own just-authored Burgomaster's Favor. 1G + a build ≈ 3★, zero interaction, no time to answer.
- TraderP ran the pure prestige line (double Keut enshrine + Novgorod pairs); TraderV rode majorities (18, Bergen +9). Cellar's multi-lane spread beat both.
- **Guildmaster imploded: 5 points** — hoarded specialists R1–R8, first delivery R12; the hoard never burst because the clock ran out at R13. A 5-point 4p seat is a red flag.
- Little win: TraderV's commission engine — commission, free-load a rival's deployed cask, pocket the 1G (×3); it drove 18 majority points. The Novgorod refine quietly accelerated TraderP's Keut treadmill.
- Failure: Guild's buildings paid rivals' geography; Cellar slot-starved mid-game holding Ready Q4s.
- Interaction: three-owner Bruges sails showering liquidity on everyone; TraderV steering Cellar's Mumme onto a Novgorod Cog handed Cellar 4★ for 1G — **the loader bonus looks underpriced relative to the value gifted.** No hostile overbuild all game.
- Endgame: ticks 6-7-8 were three consecutive enshrines (R9–R10); Cellar controlled the exact end and weaponized the final turn.
- v2.9: rent ×2 (both self-inflicted), FLIPs ×2, London Gruit Q1=1 (floor working). No spoilage, no boxes, no Gauger.

**GAME 4p-2 (seed 412) — TraderM 47 · Cellar 45 · TraderV 45 · Guild 24 — R16, clock 13/13**

- TraderM wins on **majorities 21** + 4-beer flight. Its engine: park two casks on the Floor and loop Keut's *reach* action for free presence — dead-simple, never tolled, out-earned everyone's shipping. Cellar (Bock Q5→Bruges = 7★) and TraderV (Bock→Novgorod 6, Hall Bock 9) both hit 45. Two-point margin, three lanes viable — the good-news story of the batch.
- Little win: **the 4-cask London Hulk** — neutral Cooperage let the Hulk carry 4; when Cellar completed it, the London benefit paid **TraderM two free Specialists** on a hull Cellar filled. Rich, swingy, fun.
- **v2.9 floor-compensation failure, repeatedly:** Cellar bought 4 specialists early → floor full → when Guild and TraderV overbuilt Cellar's tiles, both went **to the box, nothing banked**. The compensation evaporates exactly for specialist-heavy players. Guild then boxed its OWN Reliquary and Cooperage in a bizarre double self-overbuild — 2G for zero.
- **Spoilage:** R16 "TraderV's stale Gruit has soured" — worked as spec'd.
- Quality-lift note: TraderV enshrined "Keut Q4" (Malt Kiln) for the 7★ rung — kiln lifts raising the Hall rung (confirmed intended per RULES v2.9.1).
- Failure: Guild scored 24 with 4 specialists + 3 buildings — over-invested engine, shipped 7. TraderV went specialist-less and nearly won — **specialists look optional.**
- R4–R8 doldrums: "Brew: no open vessel or affordable recipe" three rounds running; the warm Hulk→Bergen unfillable until R6.
- Endgame: enshrines ticked 8/10/11/13; TraderV triggered the end and finished third. R16 — the healthiest pacing of the five.
- Rent-gate sighted: "wharf fully built and the ground rent (1G) is unaffordable" ×2 — broke players locked out of free buildings.

**GAME 4p-3 (seed 413, all-trader) — TraderP 30 · TraderM 27 · TraderV 26 · TraderV2 24 — R9 (below band), clock 13/13**

- **Diagnosis of the R9 collapse:** 13 ticks = 5 sails + **8 enshrines** (every seat, rounds 5–9, ~2/round). Enshrine is simultaneously the traders' cheapest score (Keut Q3 → 5★, no hull, no fill, no partner) AND a full tick — four enshrine-happy seats detonate a cap-13 clock.
- Accelerant #1: the warm start seeded TWO Bruges hulls; both sailed by R3 on starting Gruit/Keut ballast — 4 ticks inside 4 rounds before anyone had an engine.
- Accelerant #2: Keut monoculture — live from turn 1, matures in 2, Hall-pays 5. **Nothing makes the 5★ enshrine slower than a 1★ Bruges sail.**
- Consequence: the v2.9/2.9.1 layer never switched on — zero overbuilds/rent/floor/spoilage; Bock recipes bought and never brewed; only 4 player buildings ever hit the wharf; London went completely undelivered ("London[none]") — an entire kontor dead in a 9-round game.
- Winning score 30 in a 4p euro is itself a symptom: nobody got past Q4 (TraderV's "Keut Q4" enshrines came from the Gauger's neutral slot — its one visible work).
- Interaction healthy early (rival loads with destination choice ×2, pickups ×2), then R5–R9 is four players solitaire-enshrining.
- Notably unfun: the last 3 rounds are a countdown, not a contest.

**GAME 4p-4 (seed 414) — Cellar 46 · Guild 46 · TraderP 39 · TraderM 36 — R19, sailed 15/13, clock**

- Dead heat at 46. Cellar wins tiebreak on the **5-beer Flight (16)** + Hall 17 (Mumme-as-Q5 9) with only 8 majority; Guild matches via a monster Bergen lane (+9, Mumme Q4=6 with die) after a classic MC slow burn (5 at R10 → 46 at R19). **Best game of the batch — two totally different roads to the same total.**
- **v2.9.1 Gauger's Office sighted working:** Guild bought it R10; TraderM deployed Hopped under it and the FINAL shows "Bergen: Hopped Q3=1" — a Q2 graded to Q3 for points. Gate-and-points as one rule, on the table.
- Quality-lift-to-Hall again: Cellar's Mumme under Guild's Malt Kiln → enshrined "Mumme Q5" for 9.
- Guild's R19 finish (play of the batch): commission Hulk→Bergen, dockside pickup boards its Broyhan, free-load, load Mumme — sails 3/3 same turn (15/13), collecting **three Bergen Reaches** and sealing Bergen +9. Hoard-then-burst executed perfectly.
- Self-overbuild floor mint again: both 46-point leaders flipped their OWN tiles late (one during a rival's sail via the London benefit). Both "displaced-owner" compensations in this game were self-dealt.
- Spoilage ×2 (Guild's Mumme sours TraderM's stale Gruit; later Cellar's) — cleared clogged berths for premium casks; reads well.
- Failure: Cellar's warm 4-berth Hulk→Novgorod took **R2 to R9 to fill** — "sail only when full" + big hulls = slot rot. Guild stockpiled 4 charter contracts and never chartered. Mid-game slot famine R12–R15 ("no open slot" ×3 seats). Rent-poverty gate ×2.
- Endgame: Cellar ticked 13 with an enshrine AND sailed 14/13 in the same turn; Guild piled on 15/13. The player who triggered the end tied-won it.
- The London 3-sail paid four different people (loader bonus + free Lagerkeeper + free Stevedore + a building author) — **deliveries as communal fireworks is this design at its best.**

**GAME 4p-5 (seed 415, GM mirror + traders) — Guild2 37 · Guild 34 · TraderV 31 · TraderP 10 — R25 CEILING, sailed 11/13**

- **Diagnosis — the ticks died in all three sources.** Last commission R9; 4 sails total, all by R9. After that only charters and enshrines trickled. From R22 to R25: zero ticks. Sails needed a slot — but by R10 the ring was 8 buildings deep and it ENDED with 8 buildings and zero ships. Charters needed contracts (exhausted / unaffordable). Enshrine needed appetite (TraderP sat on 5 deployed Q2s and enshrined nothing).
- **The overbuild churn (14 rents, most banking nothing):** TraderV's Floor fired survey every turn from R16 — free building, 1G, overbuild, own floor full → "returned to the box" 6+ times. Guild ran the same loop. By t86 "Survey: the Building display is empty" — **they burned the entire deck churning tiles into the box, and the churn is what bricked the ring for ships.**
- The 25 Taps are the other face: with no outlets, GMs tapped casks for goods (one turn taps all three vessels); Tap became the idle animation.
- **TraderP is the starved-seat horror story: 10 points, 2 deliveries** — G0 H0 for most of R9–R25, 4–5 casks marooned, its Floor loop literally `reach +1 / load → nothing` for TEN consecutive turns. No hulls existed to rival-load its casks out. **The system offered it no exit.**
- Majority attrition grinding: R22–R24 GMs see-saw majority scores purely from reach ticks — **presence can be ground from the Floor forever without ever delivering.**
- Guild2 wins 37 on Bergen/majority upkeep + a Q4 Hall Mumme + floor 6 (the rare productive self-overbuilds). Winner decided by who wasted the dead rounds least.
- Positive before the freeze: early triple-owner Bruges Hulk; a Broyhan Q4 enshrine (kiln); spoilage (Guild2's Mumme sours TraderP's Gruit — the ONE thing that ever un-stuck a TraderP slot).
- **This is the game the pace band exists to catch:** ceiling end, 11/13, ~40 functionally dead turns across R16–R25.

**BATCH E TRENDS (4p-1..5):**
1. **Clock variance out of control: R9/R13/R16/R19/R25 on the same cap-13.** Tick sources are all player-elective and correlated with table temperament. The Sailed-Ships track measures *player mood*, not game progress.
2. **Enshrine does three jobs and is best-in-class at all of them** (cheapest score, tick, slot-clearer). 4p-3's collapse was 8/13 ticks from enshrines. Consider a throttle on the Q3 rung specifically (Q3=5 vs a 1★ Bruges sail is a 5:1 efficiency gap at identical tick cost).
3. **The self-overbuild floor mint is a live exploit** — seen winning (4p-1's champion, +6 on the final turn; both 46-leaders in 4p-4; Guild2's margin in 4p-5). Rule candidate: floor bonus only when a RIVAL displaces you.
4. **The floor-full box clause voids the compensation exactly when it matters** — specialists share the 4 slots, so the players most invested in the board are the least protected; and the box let GMs churn the deck into the trash.
5. **Ground rent at 1G discriminates backwards** — never deterred a rich seat; repeatedly locked broke players out of their free Survey. The tax bites the poor and waves the churners through.
6. **Wharf slot economics are the deep issue behind both pathological games**: 8 slots host buildings AND casks AND hulls; nothing evicts a *building* for a ship — spoilage evicts casks, overbuild replaces buildings with buildings, nothing reclaims a slot for the harbor.
7. Quality-lift tiles upgrade the HALL ladder (confirmed intended — RULES v2.9.1: a gauged cask enshrines a rung higher, one rule with the kilns). Gauger's Office authored 3× and never clearly cashed — the older kilns did the work.
8. v2.9 verified working as written across the batch (rent ~20×, teardowns, spoilage ×4, ≥1★ everywhere).
9. **Rival-loading is the batch's best interaction; the loader bonus (1G) is tiny against the value handed over** — bots do it to fill hulls; humans may refuse to gift 6★ to the leader for 1G.
10. AI postscript: Cellarmaster strongest as advertised; **Guildmaster is bimodal — hoard-then-burst is a bet on game length, which is currently a coin flip.**

---

# 4p games 6–10 (reader batch F)

**GAME 4p-6 (seed 416) — TraderV 33 · Cellar 30 · Guild 21 · TraderM 22 — R10 (below band), clock 13/13**

- TraderV won at 33 on a thin spread (two Gruit-Bruges, Bergen, Bock→Novgorod=6, two Q2 enshrines, majorities 14). Nobody cracked 35.
- Clock-burn diagnosis (why R10): 13 ticks = 6 sails + 3 charters + 4 enshrines. Both warm hulls sailed on Gruit/Hopped ballast by R3. **Cellar chartered a Gruit→Bruges on turn 1** — the ≥1★ floor plus Bruges liquidity makes a turn-1 trash charter net-positive. Q2 enshrines are 3★-per-action ticks. The AIs monetize every relief valve, and every valve ticks: ~1.3 ticks/round from R1.
- Little wins: TraderM's model tempo turn (commission Cog→Bruges, dockside pickup of Guild's Hopped, free-load own Hopped = 2/3 in one action); right-col "brew + triple age" turns turning a Q4/Q5 around in one visit.
- Failures: Guild wandered (3 of 4 deliveries were 1★ Gruit-Bruges); a Cog→Novgorod sat "nothing eligible" three rounds.
- Interaction: 3 rival loads, all benign; Bruges liquidity chains; no overbuilds, no toll wars.
- Endgame: nobody "controlled" the end so much as tripped over it.
- v2.9: ≥1★ everywhere; zero churn economy — game too short. **A 10-round 4p game where final scores fit inside 12 points and no player building was ever contested — the opening of a good game scored halfway through.** The culprit is cap-13 + warm hulls + cheap valves, not player speed.

**GAME 4p-7 (seed 417) — Guild 45 · Cellar 40 · TraderP 33 · TraderV 28 — R14, sailed 14/13, clock**

- Guild won broad — 18 delivery across all four kontore, 15 majority, flight 9, floor 3. Signature score: **Bruges Gruit Q1=5** — a trash Gruit deployed under its own Bruges Hanzehuis delivering 5★. Q1 + privilege = premium cask; the v2.3 delivery arithmetic working exactly as intended.
- TraderP showed the deep lane clean: brewed Bock three times, enshrined Q5 twice (9+9) — 18 Hall points, finished 3rd. Deep = high per-act, low breadth, as designed.
- Little wins: Floor-survey → free Connoisseur's; a Cellar-station stack (author + fit Lagerkeeper + free hire Cellarman in one line); Tap-as-recall.
- Failures: Guild scoreless through R8 (MC hoard). R11 double-stall on "wharf fully built and rent unaffordable." **Stranded cask: Cellar rival-loaded TraderP's Ready Bock onto a Cog→Novgorod that never filled — TraderP's best cask died on the hull at game end. Rival "help" that killed points.**
- Negative interaction, the sharp kind: **Guild took the loader bonus and shipped TraderV's Q5 Bock to Bergen for 1★** — a 1G bribe to torch a rival's best cask at the cheapest kontor. Legal, thematic, brutal ("Bergen: Bock Q5=1").
- v2.9: first overbuild at R11 (Cellar self-flips Almoner's, authors Peterhof). The endgame tell: **after the final sail, both TraderV and Guild self-overbuilt their own tiles purely to flip them** — 1G converts a wharf tile into a guaranteed 3★ floor tile once its use value is over. Three players finished with floor 3.
- Endgame: Guild's commission+rival-load+sail overshot the track (14/13) and authored the last building in the same benefit chain. In band (R14). **The batch's best narrative game** (the Gruit=5, the Bock griefing, the double-Q5-enshrine).

**GAME 4p-8 (seed 418, GM×2 + CM×2) — Cellar 45 · Cellar2 44 · Guild 27 · Guild2 16 — R20, clock 13/13**

- (Note: this game had 34 occupancy tolls — the shadowing tax at its heaviest — and only 4 rival loads.)
- Cellar won 45 almost entirely off the Hall + Flight — enshrines of Bock 9, Broyhan 5, Hopped 3, one Mumme→Novgorod=4, **flight 16 (5 beers)**, only 7 majority. Cellar2 lost by 1 with the mirror build. The two CMs 45/44; the two GMs 27/16.
- Slowest game of the batch: 20 rounds for 13 ticks (0.65/round vs 4p-6's 1.3). Only 4 sails all game; the rest 6 enshrines + 3 charters.
- Little wins: Cellar2's R1 mega-turn — brew, deploy, TAP, then fit **three Specialists** in one Cellar visit; Lagering payoff visible later. Guild2's commission→Bergen with pickup of Guild's Bock + free-load own Bock = instant 2/2 sail.
- Failures, many: **Guild2 scoreless until R16**, finished 16 with flight 1 — a whole seat effectively absent. Mid-game morass R7–R14: "nothing to load" ×12, "no open slot" ×3, dead Floor loops, one turn of four consecutive TAPs just to un-jam. The lone Cog→Novgorod unfillable for 9 rounds.
- Interaction: nearly none — two CMs quietly farming the uncontested Hall next to two GMs failing to launch is a solitaire read.
- Endgame: Cellar2's enshrine filled the track at R20; the winner had banked its last enshrine one turn earlier. R20 of MAX 25 — the ceiling in sight.
- **The anti-4p-6 — same clock, half the speed.** When nobody feeds hulls, the only working valves are Enshrine and Charter, and the game becomes parallel Hall-farming.

**GAME 4p-9 (seed 419) — Cellar 56 · TraderM 38 · TraderP 34 · TraderV 33 — R19, sailed 14/13, clock**

- Cellar posted the batch-high 56: **Bock→Novgorod=12** (base 6 + die maxed 6 — the game's biggest single delivery), Hall Mumme-as-Q5=9 + Hopped-as-Q3=5 + Broyhan=5, **flight 16**, majorities only 7. Pure deep/quality lane, executed end-to-end.
- v2.9.1 grading visibly potent: Hall lines show "Hopped Q3" (Hop Yard) and "Mumme Q5" (Malt Kiln). Gauger's Office authored twice but never clearly cashed.
- **SPOILAGE:** "TraderP's stale Gruit has soured — a premium Q4 cask takes the berth" — Cellar's Ready Mumme evicts a Q1 that had deadened a slot ~8 rounds. Worked exactly as intended.
- The overbuild churn (12 rents): TraderM turned its Floor survey into a loop from R12 — three flips banked (floor 9), then the floor filled and **five straight tiles boxed**, including a triple-overbuild in one turn, 3G for zero net. **The rent + floor-cap braked the value correctly, but the mechanism happily eats tiles.**
- Mid-game build freeze: R6–R11, "Survey — rent unaffordable" ~12× — table-wide G0 poverty + a full ring killed the building game for five rounds.
- Failures: TraderV spent **R12–R19 in the Floor loop** (eight consecutive contentless turns) with three casks rotting in vessels; "no open slot" ×8 across R10–R13.
- Negative interaction: **TraderM rival-loaded Cellar's Ready Mumme to Bergen for 1★** ("Bergen: Mumme Q5=1") — the premium-cask grief again. Six loader bonuses total, most benign.
- Endgame: TraderP's double-tick (enshrine 12/13 + own sail 13/13) triggered the final round; Cellar answered with the perfect closer — commission Cog→Novgorod, dockside-pickup TraderM's Hopped, free-load its Bock, sail 14/13, **bank 12★ on the game's final tick** (a fifth of its total).
- Majorities split healthily. In band (R19).

**GAME 4p-10 (seed 420) — TraderM 53 · Guild 35 · TraderP 34 · Cellar 26 — R19, sailed 14/13, clock**

- TraderM (majority persona) won the majority lane outright — 21 majority (Bergen +9 **uncontested**, Novgorod +8, Bruges +4) + **floor 9 (3 flips)** + flight 9. First majority-persona win of the batch, and it needed the floor lane.
- **Overbuild frenzy — 16 rents, the churn at full boil:** both neutral seeds torn down by R8; real hostile displacements ×4 (TraderM over Guild's Staple Hall; Cellar over TraderP's Steelyard, TraderP's Bryggen, Guild's Festkeller). **The victim-compensation inversion is the headline: TraderP scored 12 floor points largely from BEING overbuilt** — more than its majority lane (10). Displacement looks almost consensual.
- Then the cap bit: from R12 TraderP's floor was full and **five straight tiles went to the box**; at t64 the terminal symptom — **"Survey: the Building display is empty"** — the churn exhausted the building supply; every survey from R16 was dead. New failure mode on record: **ground-rent churn can consume the tile deck.**
- TraderP's late game is the most degenerate read: R12–R19, every turn = Floor, fire 4 flipped Wilds for goods (ending G8 H3 unspent), survey an empty display. Seven near-identical dead turns producing resources with no outlet — floor 12 + victim-pay carried it to 3rd. **Rewarded for idling.**
- Cellar (the strongest tier) finished LAST at 26 — four Hall enshrines but majorities 1, flight 4. **Hall-only without breadth loses when a majority player runs the kontore unopposed — good evidence deep isn't dominant.**
- Little wins: R2 Floor-survey → free Staple Hall (fastest building of the batch); TraderM's commission→Bruges + pickup of own Keut + free-load Mumme = instant sail + double liquidity + follow-up enshrine, two ticks in one turn.
- Clock shape: hot open (4 sails by R6), then a long enshrine-only middle (ticks 5–10, R11–R18), sails resumed R18–19. **Enshrine is the mid-game's metronome.**
- v2.9.1: Gauger's authored, a Gruit parked under it left on a rival hulk for 1 — the tile never visibly paid. No spoilage. ≥1★ pervasive.

**BATCH F TRENDS (4p-6..10):**
1. **Pace wildly bimodal at 4p**: 10/14/20/19/19 on the same cap-13. Determinant is tick *quality*: trader tables spam cheap ticks and burn out by R10; MC-hoard tables starve hulls and crawl to R20. If the 12-round floor matters, the levers are the Q1/Q2 tick price (enshrine floor, charter floor) and/or warm-start hull count — not SAILED_CAP alone (cap-13 produced both R10 and R20).
2. **The ground-rent economy churns into the box, not the market**: (a) end-game self-overbuild = 1G → guaranteed 3★; (b) floor-cap overflow — 10 tiles boxed across 4p-9/-10, pure destruction the bots kept paying for; (c) **display exhaustion** — 4p-10 emptied the building supply by R16, killing Survey table-wide. Rent gates correctly against the poor and waves the churners through.
3. **Victim compensation inverts the threat**: being displaced is now worth +3 guaranteed vs a use-value you might never cash; the only true attack is displacing someone whose floor is full — which no bot did deliberately.
4. **Rival-loading is the game's sharpest knife and its saddest accident**: the grief play (1G to ship a rival's Q5 to a 1★ kontor) ×2; the accident — a rival-loaded cask stranded on a never-filled hull.
5. v2.9.1 grading is the strongest quiet combo (+1-quality tiles lift the Hall ladder: Q3+kiln = 7★ enshrine). Gauger's Office 3× authored, never cashed.
6. Spoilage: 1 sighting in 5 games; when it fired it fixed exactly its target. At this rate nearly dead weight; the bigger jam source is Ready casks parked under privileges waiting for the right ship.
7. **The Floor is a too-comfortable idle** — 7–8 consecutive contentless turns; flipped-Wild engines make it strictly better late; majority presence can be ground from the Floor forever without delivering.
8. **Tempo king: commission + dockside pickup + free load** (9+ uses) — the best turn in every log it appears in.
9. Lane health: winners from four different profiles (volume-thin 33, broad GM 45, deep CM 45/56, majority+floor 53). Deep/Hall strong but loses unaccompanied.
10. Every game ended by CLOCK, three with overshoot; the final tick is frequently a scoring weapon.
11. **Score spread tracks length**: R10 game topped at 33; R19–20 games at 45–56. Short games don't just end early — they end *shallow*; the game's whole second act (churn, floor, grading) lives after R10.

---

# HUMAN GAMES (4 logs pasted 2026-07-11 — `logs/human/`; older buildings-to-hand era rules; read for behavior)

- **g1 (3p late slice):** every deploy targeted under a value tile (Mumme→Reliquary, Bock→Peterhof, Gruit→Hanse Diet); reciprocal rival-loading on the same Cog (Olli ships Adaline's Keut, Adaline ships Olli's Hopped) with London paying both; the endgame a charter/enshrine race at premium value (charter Bock→Bergen, enshrine Bock Q5 consecrated) — plus one bot-like cheap closer (Gruit→Bruges charter past the cap). Sean times a self-overbuild AFTER the cask under it shipped.
- **g2 (3p mid/late):** Sean's Floor turn used exactly as designed (dodge the contested Harbor line, fire 2 flipped Wilds + source, still brew a Bock); Bock assembly lines all around (Sean brews Bock ×4 in the slice); Sean overbuilds OLLI's Connoisseur's Cellar to author Rich Berth — targeted displacement at a live route; one human "mis-deploy" (Mumme under Rich Berth, a ship-target tile) — watch cask-vs-ship target legibility on the printed tiles.
- **g3 (2p, Specialty Beers):** the 3-Bock Novgorod Hulk as the shared finisher — Sean loads two Bocks, Olli tops it with his own Bock to trigger the sail: when the table climbs, the high-gate hull becomes the richest shared object instead of a freeze. Tap used as slot-hygiene (tap Hopped/Gruit off slots to clear berths for Bocks — the churn v2.9's spoilage now automates). Both players repeatedly deploy Bocks under the SAME Connoisseur's Cellar — one well-placed privilege becomes the table's routing hub. Presence drip via Reach actions nearly every turn.
- **Standing contrast with the sims (consistent with the v92 human read):** humans live on Q4–Q5 and route deploys deliberately — the demand-lane bottleneck is bot skill, not design; human interaction is denser and reciprocal; humans race the same clock but with premium cargo. The sim pathologies humans DO share: the charter/enshrine endgame race, deploy-slot scarcity, and cheap-cask clock closers.

---

# SYNTHESIS — v94 trends across 30 sim games + 4 human logs

## The v2.9/v2.9.1 fixes: verdict against the v92 baseline
1. **Zero-point deliveries: FIXED.** ≥1★ floor visible constantly; the "sell beer for nothing to end the game" exploit is gone (4 old zero-cases now pay 1).
2. **The overbuild carousel: PRICED, in normal games.** Typical games run 0–6 overbuilds (v92: ~11+ churn at 3p); 3p-10 shows genuinely healthy churn. Table-wide floor points ≈ 5.9/game (~5–6% of table scores, inside the <10% target).
3. **But the churn re-routed rather than died — two new patterns:**
   - **The self-overbuild floor mint:** 1G + a spare tile → +3★ at end. Seen winning (final-turn +6 with no counterplay; identical-tile replace sighted). The compensation designed for VICTIMS is mostly being self-dealt (and in 4p-10, being a victim out-paid the victim's own majority lane).
   - **The Floor survey loop (stall tables only):** Floor cask-survey = a free-building faucet; each overbuild adds a flipped Wild paying ~2G/turn, which funds the next 1G rent — **the rent is underwater against its own reward.** In 3p-8/4p-5/4p-10 this consumed the ENTIRE building deck ("display is empty") and bricked the ring.
4. **Spoilage: WORKS, RARE.** 8 firings in 30 games (0 at 2p); every sighting was the intended premium-evicts-parked-Gruit moment and read great. It under-fires because the jam it targets (Q1 squatters) is less common than the jam it can't touch (Ready premium casks waiting under privileges for the right ship).
5. **Gauger's Office (v2.9.1): the rule works, the tile doesn't.** The lift-counts-for-points rule scored repeatedly — via the NEUTRAL/owned Malt Kiln and Hop Yard (incl. lifting Hall rungs: Q3+kiln=7★, Mumme-as-Q5=9★ — confirmed intended per RULES). The Gauger tile itself: authored ~8× across 30 games, visibly scored ~once (2p-4). The ⚙ watch ("costlier kiln twin — candidate for a distinct identity or reprice") is confirmed by play.

## The five headline trends (what players actually do)
**A. The clock is opt-in, and pace is therefore bimodal.** Rounds ran R9–R25 at every player count on fixed caps. Fast tables (trader/rush): warm hulls sail on ballast by R3, Q2/Q3 enshrines and turn-1 Gruit charters tick ~1.3/round → 7 games ended at/below the 12-round band floor, shallow (winning 4p score of 30; "the opening of a good game scored halfway through"). Slow tables (MC-hoard/stall): nobody commissions, the ring fills, and 4 games hit the R25 ceiling — including a 28-turn mutual-stall Nash at 2p (the trailer never wants a tick; every sail pays the rival; the Floor is a costless infinite pass). **The Sailed-Ships track currently measures table temperament, not game progress.** Candidate levers (structural, per the lessons): price the cheap ticks (Q1/Q2 enshrine/charter), warm-start hull count, a voyage-supply floor — not SAILED_CAP alone (the same cap produced both R9 and R25).

**B. Enshrine does three jobs and is best-in-class at all of them** — cheapest score (Keut Q3→5★, no hull/fill/partner), a full clock tick, and a slot-clearer. It is the 2p door-slam (the leader personally ticked the last 2–3 steps in most 2p games), the mid-game metronome at 4p, and the whole late clock in congested games. 8/13 ticks in the 9-round 4p-3. The Q3 rung specifically (5★ vs a 1★ Bruges sail at identical tick cost) is the outlier.

**C. The wharf-jam terminal state is the game's one real structural hole.** 8 slots host buildings + casks + hulls; **nothing ever reclaims a slot for a ship** (spoilage evicts casks, overbuild swaps building-for-building). Fully-built ring → ship channel permanently closed → deploy-lock strands Ready casks → Charter/Enshrine (deploy-first) die too → in 3p-2 the only seat with contracts+gold was structurally unable to tick, and **the leader benefits from the stall — exactly backwards for a race clock.** The human logs never show this (humans ship the tiles' targets out), but three sim tables found it independently.

**D. The demand-die lane is the game's ceiling AND its variance engine — and it works when piloted.** Headline scores all route premium casks through owned privileges (Bock Q5=12 at Novgorod ×4; Gruit Q1=5 at Bruges; Mumme=10). When nobody authors privileges (2 games), every delivery collapses to the 1★ floor and the game decides on majorities/flight — flat, 29-point tables. Mirror trap: **privilege-pays-owner-only silently bonfires premium casks deployed under rival/neutral tiles** (Bock Q5→Bergen=1★ ×3) — rules-correct, thematically fine, and a newbie trap that only surfaces at delivery. Burgomaster's Favor is the strongest tile in the box; Rich Berth, Almoner's Stall (1 great game, else idle), Customs House and Gauger's rarely/never scored.

**E. Interaction is the healthiest system — with one asymmetric edge.** Commission→dockside-pickup→free-load→same-turn-sail is the best turn in nearly every log (9+ uses at 4p); London/Bruges benefit showers pay whole tables on one sail; rival-loading fires constantly. The edge: **the loader takes 1G while the owner banks up to 12★** — bots gift the leader (~25★ for 2G in 3p-4); the hostile line exists and is sharp (ship a rival's Q5 to a 1★ kontor — 3 sightings; strand a rival's best cask on a never-filling hull — 1). Humans will find both. Tolls are a steady follower tax (23/game at 4p, tracks the losing seat).

## Secondary observations
- **Bergen is free money** — the +9 anchor went sole/uncontested in most games, often via Reach chains and charters with barely any Bergen hull traffic; presence can be ground from the Floor without ever delivering (4p-5).
- **Flight separates winners** (4–5 beers = 9/16 pts; every CM win carried 9+); monoculture punished as designed.
- **Sail-only-when-full + big hulls = slot rot**: Novgorod hulls froze 7–10 rounds in 5+ games; Cooperage's +1 capacity makes a hull SLOWER (anti-synergy); rival inaction on a 2/3 hull is free invisible denial that killed ~20 points in 2p-2.
- **The final tick is a scoring weapon** (bank 12★ on the closing sail; three overshoot finishes) — good drama; but bots in 3rd place also close games early (a standings-blind artifact humans won't share).
- Novgorod's refine benefit whiffs often ("nothing maturing" ~12×/batch); London majority occasionally unawarded; Quaymaster still bought-never-used by bots (parity re-probe still open).
- **Specialists look optional** (a specialist-less trader nearly won 4p-2; free Hires often contributed nothing) — the floor-slot competition (v2.9) actively punishes specialist collectors when their tiles get boxed.
- Score spread tracks game length: R10 tables top out ~33; R19–20 tables reach 45–65. **The game's whole second act (churn, floor, grading, Q5 economy) lives after R10** — another reason the pace floor matters.

## Known bot artifacts to discount (carried + updated)
Keut/Hopped monoculture; traders never commission/charter proactively (direct cause of one ceiling); deploy-under-ship-target/rival tiles; Quaymaster never used; MC hoard-then-burst (GM is bimodal — its bet on game length is a coin flip at current pace variance); Floor-loop dead turns; standings-blind clock ticks; last-turn dead purchases. Each artifact nonetheless marks a state the rules permit.

## Candidate design levers surfaced (recorded, NOT decided — for the designer)
1. **Floor bonus only when a rival displaces you** (kills the self-mint; keeps the victim compensation). Cheapest, most targeted.
2. **Throttle the Floor-survey faucet / churn loop** — e.g. Survey from the Floor once per turn, escalating ground rent, or flipped Wilds pay no goods (only the end-game +3). Protects the tile deck.
3. **A ship-channel guarantee** — e.g. a hull may always dock on a built (building-only) slot, or a standing harbor berth — so a fully-built wharf can't permanently close the clock.
4. **Price the cheap ticks** — the Q3 Hall rung, or the enshrine/charter tick for Q1–Q2 cargo (half-tick? fare?) — the pace-floor lever the logs point at (not SAILED_CAP).
5. **Gauger's Office identity/reprice** (already ⚙-watched; confirmed a dud in play).
6. Watch: loader-bonus asymmetry at human tables; Bergen anchor pricing; Cooperage under sail-when-full; Almoner's Stall leader-abuse; specialist-vs-floor slot competition.
