# GATEKEEPER-v70b — standing review #4 (2026-09-02)

**Scope:** the game as of **v7.0b “The Guild”** (`KEY hanse-v70b`, the v7.0 TEST BUILD),
judged as a game and weighted toward whether the v7 program landed its brief: the ten
directives and the feel corrections the designer recorded after the v6.5b human table
(`V7-PLAN.md` §4–5).

**Evidence:** the full canon read; a **30-game 2p corpus** driven through the canonical
engine (20 Cellarmaster mirrors, 10 Cellarmaster vs Guildmaster, fixed rollout budgets so
the six parallel shards were fair, every game seeded; every turn recorded with its
events, goods, per-player and board snapshots); **two independent analyses** of that
corpus, written blind to each other and to the design notes from the rules, the engine
and a neutral summary of the brief; the prior review `GATEKEEPER-v51.md`. The corpus and
the analyses stay out of the repo by charter; the numbers that carry the verdict are in
the appendix.

**How to read the evidence.** No human table has played any v7 build, and the corpus is
bots at two players. The strongest search tier idles 30% of its turns in this build; a
control replay under the engine's own wall-clock budget idled more, and an instrumented
run showed the search cannot tell “act now” from “end turn” (their playout margins differ
by less than the noise) while station choice carries a wide signal. Two readings follow
and both are true: the search is a poor human proxy at the stop level, AND a bot that
cannot tell acting from passing is reporting that deferral costs nothing in this build.
Findings that hold under the greedy tiers as well (the invitation flood, the frozen
ladders, the dead FLIP, London as the build door, the ceiling endings) are structural.
Claims only a table can settle are marked as such.

---

## 1 · The verdict

**No — not yet. A pass at the purchase order today, on the right chassis.** v7.0b kept
what the game already did well: the brew loop, the tide, the berth race, a market that
visibly falls, and a score a player can trace to components (both analysts re-derived all
60 seat totals from the parked dice and the printed lines; the v6 “I cannot trace 85★”
complaint is answered). Everything v7 added on top is inert under the strongest search
tier the engine has. Invitations were earned 314 times and spent 14; 111 of the 120
majority ladders never left rung one and the contract deck ran dry in 16 games; the
private flag was never planted in 181 commissions; the refresh arm was never taken; one
Venture face is 29 of the 30 L2s built and two faces never appeared; 21 of 30 games
ended on the round-22 backstop with a quarter of all dice still in the tray; the pace
identity of 10–15 turns a seat came in at 20.8. What the build rewards is throughput to
the far ports plus the London double landing that hands two free builds. The winner's two
best turns are about two thirds of their total and the average margin is 26★. The core is
sound and the new engine is unlit. The flip is a design pass (the price of a present, the
clock), not a tuning pass, and then a human table.

**The brief, scored.** Ten directives and the feel corrections, against the corpus:

| Directive | Landed? | What the corpus shows |
|---|---|---|
| D1 directional value | partial | only the printed Novgorod +3 and the Staple Houses make a port pay more; no Venture or specialist makes a beer or a port better for the table |
| D2 private buildings as THE core, dice tracking use | form, not weight | Ventures built in 28 of 30 games; ledger pips ≈4% of the score; one L2 face; 24 action Ventures never fired by anyone |
| D3 Works in all 8 slots, sail away, no refill | landed | the deal varies every game; the thinning works; a quarter of the tiles never move |
| D4 dice are the clock, several ways to spend | no | 70% backstop endings; 213 of 780 dice never spent; the second and third sinks take a handful |
| D5 legible short-term goals | mostly | recipe, build, specialist are legible; “exceed Ready on a ship” never became a goal (LIFT 6 picks) |
| D6 engine then Kontore; load-vs-score friction sets the majorities | half | majorities are 18% of the score at base rung, decided by cask count; the friction is one turn |
| D7 market down only, specialists may touch it | landed | Hopped ends at or below +1 in 24 games; the Coper stepped twice; not an accelerant (nobody hurries) |
| D8 the sea rethought, per-player unlocks | by removal | the sea is gone; the gate never refused a load and bound 3% of seat-turns; nothing develops a Kontor |
| D9 ownership on the table, Skute gone | half | the Skute's job moved to SAIL-now (84 single-cask sails); zero flags; 11 rival hulls bounced |
| D10 reward classes split; halls; earned invitations; the spark | split yes, spark no | cask tiles carry only commodity verbs; 14 presents; 300 invitations hoarded; the ladders never moved |
| Pace 10–15 turns a seat | no | 20.8; 52% of turns hold one verb or none |
| The flat market | fixed | — |
| CHART too much | fixed by removal | nothing replaced its depth |
| Score legibility | fixed | all 60 totals reconcile from components |
| Payoff happening TO the player | partial | 18% of landings still resolve off-turn on a rival's sail, prizes chosen for the absent owner |
| The runaway leader | intact | 12 of 30 games decided by more than 25★ |

**The v5.1 flags, four versions on.** The human-table cycle happened and produced v7.
The builder lane still underpays (the mason's mark became the ledger; 4% of the score).
The 3p seat drift is untested (this corpus is 2p only; 2p reads clean, 10–10 in the
mirrors). The majority lane's lever became the ladders, which are frozen.

## 2 · The panel

**The Critic — no, with the signature intact.** The die-is-the-cask compression still has
no owner in the genre, and v7 added a second ownable idea on paper: an invitation economy
where the heat of a race sets the prize. On the table the corpus describes, that idea does
not exist. A present pays die plus the card's bonus; a delivery pays die plus marker plus
the demand line plus a two-star prize, and in more than a hundred matched opportunities
the present was never the better number. Contracts, invitations, demand cards, halls and
ladders are a page of teach producing fourteen events in thirty games. The engine core is
one tile reached through one port. *Flips when a present is the move a good player wants
to make three times a game, and a second L2 face gets built by choice.*

**The Buyer — hold.** The hook still sells in a sentence, and the v7 kit is cleaner than
v5's (no sea board, no bag). But the last human verdict on this game was “regression”
(v6.5b), and the first read of the rebuild says its new systems stand unused. A buyer does
not stock a rebuild on that pair of facts. *Flips after two or three human tables at 3–4p
say the invitation race is what they talked about afterwards.*

**The Optimizer — no, and the reasons are nameable.** Deterministic, all-public, authored
variance: the depth substrate survived the rebuild. But the corpus shows one line: source,
brew cheap Gruit and Hopped, land two casks at London together, overbuild to Great Copper,
run Hulks to Novgorod. Search at the top tier finds it and finds nothing else, and it beat
the quality-first persona ten games to none. Deferral is free: the strongest tier idles
30% of its turns and loses nothing for it, because the round counter ends the game and the
dice do not. The runaway is intact. Seat order is clean at 2p. *Flips when the dice end
70% of games and a second lane beats the throughput line in a fair share of them.*

**The Bridge Player — yes on the loop, no on the first game.** The turn is easy to teach
(move, work the station, load at the flanks), the short-term goals are legible (a recipe
from Bruges, a build from London, a specialist from Bergen), and the score is traceable.
But the first game has traps a learner walks into: a die-1 Gruit with one legal door (17
seats sat on two or more Ready Gruit for five to twenty-one turns), a 1G Hulk bounced by
a rival's commission the next turn, cargo left on a docked hull scoring nothing, and a
walk across a 2×2 that forces a dead turn when the useful station is diagonal. *Flips
when the Gruit lock and the bounce are closed and a first game ends on the dice.*

## 3 · Strengths (mechanical, not vibes)

- **The die-is-the-cask, still.** Brew, age, load, land, park: one component carries
  value, presence, majority weight, the ledger and the clock. Scoring reconciled for all
  60 seats without a ledger sheet.
- **Search-brew as authored variance.** The brew is a choice of tile, not a draw; the
  cask mix is strategy (403 brews, and the bonus picks track the board).
- **The berth race has teeth.** A quarter of all sails carried both players' cargo;
  topping off a rival's hull sails their cask on your clock; the Supercargo pays the
  hitch-hiker. Interaction without take-that.
- **The tide.** Eight Works dealt, no refill: the board thins into ground the Ventures
  inherit, and four games ended with no Work standing. Legible and thematic.
- **The market only falls, and it reads.** Hopped's collapse is the clearest arc in every
  transcript; half the non-Gruit casks still land at the top price because the glut is
  per type per sail, so a timing decision exists.
- **The far-port climb pays.** Novgorod pays more than three times Bruges per cask; a
  Novgorod Hulk is the game's biggest legible payoff.
- **London's prize as the build door works as a door:** 57 of 113 Venture actions came
  through it. The problem is what stands behind the door, not the door.

## 4 · Weaknesses and cut corners

- **The hall is priced dead.** `RULES.md` §9: DELIVER = die + marker + the demand line
  (+1) + a prize (2★ or the thing); PRESENT = die + the card's bonus (2–5). At the opening
  market a present loses by three stars before the prize is counted; only a +5 card
  against a glutted beer ties. Spending an invitation also advances a ladder that pays
  whoever LEADS that Kontor, so the spend is a private cost for a public good. Nobody pays
  it, at any tier. `aiPresentGood` encodes exactly this arithmetic.
- **The contract deck starves itself.** Fourteen cards; claims and letters both draw
  from it; only a spend returns one. The deck ran dry in 16 of 30 games and
  `landingClose` silently skips the promised first-landing letter when the deck is empty
  (14 of 170 first landings). No hand limit, so invitations are hoarded: five a seat at
  the end, eleven at most.
- **The engine core is one tile.** Great Copper is 29 of 30 L2s; Assay Loft never
  appeared; Lagering Cellar three times; FLIP five times in 113 builds, because London's
  waiver makes the 2G overbuild free while a FLIP costs 2G. The ledger is 4% of the score
  and 51 of 76 ledger dice never ticked. “Dice that track public usage” is a rounding
  error against the usage itself: a rival's use pays you 1★ and pays them a brew.
- **The dice are not the clock.** 21 of 30 games on the backstop; 213 of 780 dice never
  left the tray; landings run one per 3.5 turns. Deferral costs nothing, which is what
  lets a search bot idle 30% of its turns and what a human will feel as slack. The
  program's own watch (`V7-PLAN.md` §11 q6, `DESIGN.md` §10) named the 2p ceiling share
  at 27–31% for the greedy tiers; under search it is 70%.
- **Gruit is the hidden currency.** 36% of brews, a third of all parked majority dice, 90
  of 138 Bruges landings. A 1G die-1 cask buys a recipe, a letter and majority weight, and
  the same die has one legal door, so it is also the game's worst trap.
- **Ownership never reached the table.** Zero flags. Eleven of twenty hull displacements
  bounced a rival's commissioned hull, seven within four turns of the commission; the 1G
  Hulk fee buys nothing that survives the rival's next Harbor visit.
- **The Works tail stands unused.** Victualling Yard, Ropewalk, Customs House, Weigh
  House and the Staples mostly stand all game on slots no ship docks at; the Malt Kiln is
  the tile every load wants. The v5.1 finding, four versions on.
- **Rules text that defers to v5.8.** The core five specialists' texts, Keut's presence
  perk, the Alderman's line and the Flight's “(n−1)², min 3” (a threshold in the engine,
  a floor to a reader; 12 seats scored 0 with two beers) are not stated in the one rules
  document.
- **Pace.** 20.8 turns a seat against the 10–15 identity; 52% of turns hold one verb or
  none, 5.5% hold the 15★+ combos. Many bites and two meals.

## 5 · The depth dial

- **Too thin:** the hall economy (a page of rules, fourteen events) · the flag (a
  component with no job) · the Venture hand beyond Great Copper · the far-lane gate
  (never refused a load; bound 3% of seat-turns) · the Coper and the refresh arm · three
  specialists never seated (Innkeeper, Town Crier, Chandler) · the Works tail.
- **Too punishing or swingy:** the die-1 Gruit lock · the hull bounce · cargo stranded at
  the end (it decided cmgm-s6-g4 by one star) · 18% of landings resolved off-turn with
  the prize chosen for the absent owner · the London double landing as a 30–50★ spike.
- **Where skill converts:** the Cellarmaster beat the Guildmaster 10–0; the search finds
  the London build, the Novgorod Hulk, the top-off. The gradient is real and it funnels
  into one line.
- **Legible loss: yes on the audit, half on agency.** Every star traces to a die or a
  printed line, and the loser can name the turn that beat them (“they landed two at
  London”). What the corpus's losers cannot name is their own reachable cleaner line,
  because they mostly lost to idling, a locked Gruit or a bounced hull rather than to a
  choice they would make differently. That is the bot half; only a table shows the human
  half.

## 6 · The comp face-off

**vs Great Western Trail.** Wins: theme, component compression, an hour shorter, a score
you can audit. Loses, and worse than at v5.1: GWT runs three clocks that pressure each
other; v7.0b runs a dice clock that fires in 30% of games and a round counter that fires
in 70%. GWT's co-built track re-solves the puzzle live; v7's board thins by the tide,
which is good, but the strategic layer solves from the front to one line. Draws: indirect
interaction. *Keep-it case today:* none for a GWT owner; it returns when the halls light
and the dice end the game.

**vs Distilled.** Wins: still deterministic and all-public where Distilled is card-market
variance; the v5.1 “out-depth Distilled” claim holds at the substrate. Loses: the object
fantasy (Distilled's bottle beats a parked die), and the five-alarm check is wired if not
ringing: at bot level the strategy space is one line, and Distilled's spirits offer more
than one. Draws: theme niche. *Keep-it case:* the player who bounced off Distilled's luck
still has a home here, once there is a second way to win.

## 7 · Pull diagnosis

Intended: depth pull with a fantasy layer (halls, invitations, the guild). Running on:
depth pull in the loop, one-line depth at the strategic layer, and a macro tempo loose
enough that it never stings, which is a comfort-pull drift a heavy game cannot afford.
The variety layer (eight of twelve Works, the demand cards, the contract deck, the ship
deck) is real and freshens setup; it is not carrying retention and should not have to.
The fantasy layer is unlit. Nothing here says the intent was wrong; it says the price
list is.

## 8 · The path forward

**Must-fix before shelf-ready**

1. **Price the hall so the prestige lane exists.** Problem: PRESENT never beats DELIVER,
   and the rung a spend buys is a public good. Move: a present keeps the Kontor's prize
   (the thing or 2★) and pays die + bonus, off the market and never glutting, so it is
   the way to sell into a falling market; the rung a spend buys belongs to the spender
   (the spender's parked dice count +1 there, a marker on the ladder in their colour);
   admission widened so the card's quality band suffices. Test: 30 search games; pass =
   three or more presents a seat, half the ladders at rung 3+, the deck never dry.
2. **Make the dice the clock.** Problem: 70% backstop, deferral free, pace 20.8. Move:
   `PRES_POOL` 13→10 ⚙ first; if landings stay at one per 3.5 turns the cadence is the
   lever (the second kettle's fee, Load-any), never the round counter. Test: pass = 70%
   of games end on the dice, median rounds ≤18, search-tier idle turns under 15%.
3. **A hand limit on invitations, and a letter that always draws.** Move: hold at most
   two ⚜ (face-up, public, no memory); a third must be spent or go under the deck. The
   letter draws from the bottom of the display when the deck is empty, and the engine
   logs it. Test: the deck never empties in 30 games.
4. **Close the two traps.** The Gruit lock: a Bruges Cog is always commissionable from a
   fixed stock (the packet), so the warm-start door never shuts. The bounce: a flagged
   hull cannot be displaced, which gives the flag its first job. Test: no seat with two
   or more Ready Gruit idle five turns; flags planted once the AI has a path to them.
5. **One rules document.** Print the core five, Keut's perk, the Alderman's line, and
   settle the Flight as “3+ distinct beers: 4/9/16★, fewer score 0”. Doc pass, no KEY.
6. **The human table.** Two or three games at 3–4p on the build after items 1–5, with
   the `V7-PLAN.md` §11 questions asked. Pass = the invitation race is what they talk
   about, and a first game ends on the dice.

**Would elevate it over the comps**

7. **Break the Great Copper monoculture.** London waives the L1 fee only; an L2 always
   costs 2G; Assay Loft and Lagering Cellar priced to compete with the free Cellar. Test:
   no L2 face above half of builds.
8. **A die at 1 holds no majority weight** (presence yes, weight no): prices the Gruit
   farm on the component itself, with nothing to remember. Test: Gruit under 20% of
   parked majority dice.
9. **The Works tail.** The tide sweeps by traffic, not only by sailing (a Work fires a
   printed number of times, then goes), or the ship display reaches every slot. Test: no
   Work standing all game in more than a fifth of deals.
10. **The 3p/4p seat read** (v5.1 item 3, still open; this corpus is 2p only).
11. **The specialist probe** (three never seated; the Bergen prize taken as ★ 17 times).

**Nice to have**

12. **The 2×2 walk:** a “stay” option or the diagonal at 1G. Ask the table first: does
    the walk feel like planning or waiting?
13. **Off-turn landings:** the owner chooses the prize at their next turn start (a marker
    on the parked die), if the table calls the current resolution “happening to me”.

**If only one thing gets done: item 1.** The invitation race is the v7 thesis and the
only counterweight to the throughput line; until a present is the move a good player
wants to make, the ladders, the deck, the majorities and the volume-versus-prestige lean
are all reading zero. Prepare item 2 for the same table.

## 9 · What only a human table can answer

1. Will humans present at all at the current price, for the ladder or the feel of it?
2. Is the flag worth 1G to a person as insurance on a Hulk filled over three turns?
3. Does the Ready-Gruit lock catch a human, or does a human simply not brew a second Gruit?
4. Does deferral feel free? A Ready cask with the hull two moves away: planning or waiting?
5. Is the London double build found and then chased, so it becomes the game?
6. Do the far ports read as a climb, or as not worth the walk (Novgorod unreached in 13 games)?
7. Does the falling market create a race to sell, or resignation?
8. Does the thinning wharf feel like it is becoming yours when most of the ground holds one Great Copper?
9. Nine sub-actions off one move (cmcm-s1-g3 turn 29): Lacerda density or an AP wall?
10. Do the 18% off-turn landings read as the berth race or as the v6 disease?

---

## Appendix · the numbers that carry the verdict (2p, bots, 30 games)

| Measure | Value |
|---|---|
| Games / seats | 30 / 60 (20 CM mirrors, 10 CM vs GM), 0 crashes |
| Rounds avg (min–max) | 20.8 (15–22); ceiling endings 21, dice endings 9 |
| Turns per seat holding ≤1 verb / 15★+ combos | 52% / 5.5% |
| Search-tier idle turns | ≈30% (88 forced by the must-move 2×2, the rest search failures) |
| Winner / loser avg total | 63 / 37; margin avg 26.4, median 23; >25★ in 12 games |
| P1 wins (mirrors) | 10 of 20 |
| CM vs GM | 10–0 |
| Score buckets (all ★) | deliveries 56% · majorities 18% · Flight 13% · bank 9% · ledger 4% · guild <1% |
| Winner's two best turns | ≈64% of their total |
| Invitations earned / spent / held at end | 314 / 14 / 300 |
| Ladders at rung 1 at the end | 111 of 120; all four unmoved in 21 games |
| Contract deck empty | 16 games; 14 of 170 first landings drew no letter |
| Private flag / refresh arm | 0 of 181 commissions / 0 of 270 prize choices |
| L2 faces built | 30: Great Copper 29 (27 overbuilds, 2 flips), Lagering 1; Assay Loft 0 |
| Venture actions via London's prize | 57 of 113; FLIP 5 |
| Ledger dice never ticked | 51 of 76; no die reached the cap |
| Dice at the end | parked 45% · presence 4% · ledgers 10% · in vessels 13% · aboard docked hulls 1% · never spent 27% |
| Brews by beer | Gruit 36% · Hopped 31% · Broyhan 11% · Bock 10% · Keut 7% · Mumme 6%; Q4+ 16% |
| ★ per delivered cask | Bruges 2.7 · Bergen 4.7 · London 5.4 · Novgorod 9.3 |
| Gruit share of parked majority dice / Bruges landings | 122 of 353 / 90 of 138 |
| Seats stuck with 2+ Ready Gruit for 5+ turns | 17 (max 21 turns) |
| Sails | 203: full 95, SAIL-now 108; single-cask 84; both players' cargo 51 |
| Deliveries landed off-turn | 61 of 339 (18%) |
| Hull displacements bouncing a rival's hull | 11 of 20 |
| Far-lane gate | 0 refusals; a legal load blocked in 37 seat-turns |
| Works standing at the end (per deal) | avg 2.2; Victualling 8 · Ropewalk 8 · Customs 7 · Weigh House 6 over the corpus |
| Specialists never seated | Innkeeper, Town Crier, Chandler; Coper fired twice |
| Novgorod never reached | 13 games; first landing avg round 17.8 |
