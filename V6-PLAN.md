# Brewhouses of the Hanse — THE V6 PROGRAM ("The Voyage", working title)

*Designer-ruled 2026-08-29. This is the working plan for the v6 build-out — the ruling,
the constitution, the architecture at paper level, the carry/retire ledger, the phases,
and the open forks. It is the v6-era read-FIRST after `CLAUDE.md`. The complete v5.8 game
is frozen playable at `archive/v5/` and is never edited; the root docs and pages continue
to describe the live v5.8 build until Phases 2–3 replace them.*

**Status: Phase 3 TEST BUILD LIVE (2026-08-29, designer-called: "build it — play.html and
RULES.md, ignore the rest as we test").** `RULES.md` is v6.0; `play.html` runs it (`KEY
hanse-v60`); a fresh `playtests/` gates it (verify-v6 **51/51** · sim 0 crashes / 0
deadlocks). **v6.1 "the deep markers" (2026-08-30, designer-called: "deepening the markers
is likely the thing"):** the CHART verb now UPGRADES a standing marker — a post flips onto
a scarce **establishment** tile (Toll Court · Victualling Post · Pilot's Rest, 2 each ⚙,
2 G ⚙) and a factor flips to the port's **KONTORHAUS** (3 G ⚙; four powers printed per
panel: Bruges 1 G/cask · London free charts · Bergen TRADE ±2 · Novgorod +1★/cask); the
Chandler re-derives to the **Wharfinger** (posts' tolls +1 G). `KEY hanse-v61` · verify-v6
**63/63** · 300-game corpus clean, upgrades in live AI use at every count. **v6.2 "the
walk is the choice" (2026-08-30, designer-called: bring back the adjacency frame — fewer
options per turn, GWT-style):** F1 re-ruled — the v6.0 four-verb menu retires; the turn is
**WALK (adjacent, mandatory) · ONE printed station action · one flanking load**, with the
sea folded onto the desks (Market: Source · Chart · Trade — Harbor: Commission · Load-any ·
Sail; Brewhouse/Cellar stay deep singles). The missing components landed the same pass:
the **Bourse price board** now renders on the Destinations panel (the printed track IS the
sale value) and the sea map shows **open post/factor seat sockets** and upgraded-marker
badges. `KEY hanse-v62` · verify-v6 **71/71** · 300-game corpus 0/0; the 2p ceiling share
eased 60%→42% (the walk commits dice faster); greedy bots under-visit the sea desks (SAIL
~1/game) — a bot blind spot to re-read at the Phase 4 oracle, not a balance verdict. **The kit pulled forward (2026-08-30, designer-called: "build out the
gaps — everything lines up and matches"):** `components.js` re-derived (Pilot · Surveyor ·
Wharfinger · the Supercargo/Chronicler text · the *Chart 1* load bonus) and grew the v6
families (establishment tiles · closure tiles · double-sided house markers); `print.html`
is CUT TO v6.2 — THE SEA MAP board sheet, the Kontor panels print factor seats + the
Kontorhaus powers, the wharf stations print their short menus, the aid is the
walk·act·load rewrite, round backstop 40, Ventures/Tastings tabled off the sheets;
`COMPONENTS.md` carries the §0 kit delta. **v6.3 "the line returns" (2026-08-30,
designer-called: back to choose-the-lane — primary/alt and the lane loads; adjacency
orthogonal, never the diagonal):** F1 re-ruled again — the turn is **MOVE (adjacent) ·
activate the ROW or COLUMN · resolve the stops in any order, all optional**: the worker's
station fires its PRIMARY, the line's other station its ALTERNATE, and the line's two end
slots each LOAD 1 — every seat a single verb, never a menu, and the eight v6 verbs exactly
fill the eight seats (Market *Source 3 / Chart* · Brewhouse *Brew / Trade* · Harbor
*Commission / Load-any* · Cellar *Age 3 / Sail*). The line is read LIVE (a commission onto
a cap slot opens its load this activation). Every surface re-cut the same pass (`RULES.md`
§2–3 · the wharf tiles + the aid in `print.html` · `COMPONENTS.md` §0 · the engine + AI +
verify). `KEY hanse-v63` · verify-v6 **70/70** · sim clean 0/0 · first read: rounds ~21
(from ~32 under the walk), SAIL ~5.5/game and TRADE ~10.5/game — the alternates get worked
as ride-alongs on lines chosen for other reasons. **v6.4 "the street model" (2026-08-31,
designer-called: "I go to Harbor street — my guy works the main building and picks things
up at the shops nearby"):** the ALT principle is ruled — **every station's printed
ALTERNATE is its own lesser counter**, served to the line's visitor (the v5.8 alts always
were: Source 1 · top-tile · Age 1 · Load-any). The two sea alts re-seat to obey it:
Harbor *Commission / SAIL* · Cellar *Age 3 / LOAD 1 any* (Market Chart and Brewhouse
Trade already read as their stations' own counters). Turn shapes after the swap: the
Harbor row = Commission + Load (up to four boardings with the maiden load and the caps —
the fewer/bigger pillar at work) · the Cellar row = Age + Sail · the Brewhouse column =
Brew + Load. **v6.5 (designer-ruled 2026-08-30) — THE AP CUT: the line retires whole.**
A turn = MOVE adjacent · **work the station's OWN counter** — its PRIMARY + its
ALTERNATE + a LOAD at each of its two flanking slots (Market s1·s8 · Brewhouse s2·s3 ·
Harbor s6·s7 · Cellar s4·s5) — any order, all optional. The row/column choice, the
far-station read, and the pawn-on-half record retire (the face cleans up with them:
the P/A pair top-left — big/small — and the name bottom-left); each verb now lives at exactly ONE station beside its natural partner
(Age+Load = the shipping visit · Brew+Trade · Commission+Sail · Source+Chart).
**v6.5b (designer-ruled 2026-08-30): the sea swap** — Chart and Sail trade seats:
**Market *Source 3 / SAIL*** (the goods faucet beside the push it funds) · **Harbor
*Commission / CHART*** (the shipmaster's desk runs the whole sea program — hulls,
passages, posts, factors, upgrades). `KEY hanse-v65b` · verify-v6 72/72 · sim clean (0/0; rounds ~24–26 at 2–4p, SAIL/TRADE/
CHART all live — the Phase 4 oracle re-reads pace at skill). **v6.4b:** the station tiles
split on the diagonal into **row/column worker halves** (the diagonal is the tile's axis —
PRIMARY large on the line at the outside corner, the ALT nearly as large at the inside;
the name arcs between the two icons through the tile's middle; the halves carry no mark;
the standing pawn records the worked line — app board + print board, no mechanic
change; the app also takes half-clicks at the line pick). Still v5.8: `rulebook.html` and the DESIGN
architecture sections (the Phase 2 docs pass). **Fork calls taken for the test build
(all ⚙, designer re-rules freely):** F1 the LINE (re-ruled v6.3: P/A seats + the cap loads; the one-day v6.2 walk-menu interim
retired) · F2 neutral hulls + the current + the SAIL push (1 G ⚙) · F3 the current at the
round marker, all ships one sweep, nearest-Kontor first · F4 posts/factors are plain house
markers (6 ⚙; the venture tiles wait boxed for P2) · F5 the map as §2 (Wadden Coast/Skagen
open · Dover Strait/the Sound closed at 2 G ⚙) · F6 Public Works carried whole with the
tide (the Weigh House certification rides the hull) · F7 the Flight carried unchanged ⚙ ·
F8 commissioning stays a Harbor option · F9 the sea renders as an app panel (board form at
P5) · F10 the 13-die pool kept ⚙, MAX_ROUND 40 ⚙. **First instrument reads and the live
watches sit in the session log (chat) — the 2p ceiling share and the pool size are the
first table questions.**

---

## 0 · The ruling

**v6 doubles down on brew-and-ship.** The wharf stays the brewing loop — lean and quick.
The sea becomes the second loop the game has been missing: a **map** of shipping lanes to
chart, waypoints to hold, Kontore to develop, and a market to work — because **the voyage
now takes time**. A full Ship departs and then *travels*, leg by leg, its quality dice
riding it in public view, and its casks are **priced at landing**, not at departure. The
two loops need each other: the wharf without the sea piles up unsold beer; the sea without
the wharf sails empty hulls. Specialists become **placed people** — wharf crew, ship's
crew, Kontor agents — each one buying back turns in the loop where they stand.

**The ruled pace identity: fewer deliveries, faster turns.** A handful of voyages per
player, each an event you prepare (assemble the cargo, choose the lane, time the market,
race the landing) — reached through many small, quick turns instead of few fat ones.
Scarce landings structurally reprice **value over volume**, which is the fix the v5
runaway/breadth findings kept asking for, made with the structure lever.

*The identity line: **brew fast, sail far — the price is set the day you make port.***

**Rulings this program consciously amends:** "ships are pure logistics" (v5.7) — a Ship
at sea is now a place where the game happens; the one-arena Wharf spine (the whole loop
no longer lives on four stations); the weight target moves one notch (GWT-plus — still
never Lacerda-hours). "The mechanic is the theme" is *strengthened*: the Hanse was a map
of lanes and Kontore, and v6 finally plays it.

---

## 1 · THE CONSTITUTION (gates every mechanic — before theme, before balance)

1. **Component-state supremacy (designer-ruled 2026-08-29, elevating the 2026-07-12 hard
   line).** This is a tabletop board game. **Every value and every state is tracked with
   components on the board.** Players never remember states or values, and never do
   complex calculations — **the arithmetic ceiling is one die plus one printed marker.**
   If a mechanic needs memory, a ledger, or a sum a player can't do at a glance, the
   mechanic is out — not patched, out.
2. **Easy to learn, easy to execute.** One verb per turn; a new player can execute any
   verb correctly after seeing it done once. Depth lives in *which* verb and *when* —
   never in how many sub-steps a verb hides.
3. **The die is the cask — all laws carried whole.** Never rolled; never turns on its
   own; dice never return; no die ever stands on a building; tray + in play + parked is
   always the full count, public.
4. **Goods are the only currency.** No money, no spendable prestige; everything earned.
5. **Interaction through the shared board.** Neutral hulls, the berth race extended into
   the landing race, contested lanes and markets. No take-that on players; any hazards
   are neutral and printed.
6. **Icons over prose.** `STYLE.md` stays rank 1; the v6 term family is reserved in its
   §4d and locked at the Phase 2 registry pass.
7. **The goal is fun.** Barrier low, table-talk high, the score legible off the standing
   components at any moment.

---

## 2 · The architecture (paper level — each element with its component answer)

**The two loops.**
- **THE WHARF — the brewing loop. It creates.** Stations and slots, thinned: source,
  brew, age, load. Casks exist here and nowhere else.
- **THE SEA — the shipping loop. It converts.** The map: lanes, legs, waypoints, the four
  Kontore. ★ exist here and nowhere else beyond the wharf's small change.

**The keystone — the voyage in transit.** A full Ship departs its slot and moves onto the
map, leg by leg, dice aboard. *Component state:* the Ship tile itself stands on the
printed leg; the dice ride it; there is nothing to remember — the map IS the tracker.

**Priced at landing.** Casks deliver when the Ship enters the Kontor space, at the
marker printed **at that moment** (die + marker, the v5.6 arithmetic unchanged — exactly
one die plus one printed marker, the constitutional ceiling). The glut lands after, one
step per beer type aboard, the Lisboa rule carried. *Component state:* the Bourse track
is read at landing; nothing is promised earlier, so nothing is remembered.

**The map.** A sea board: the home Wharf reaching through waypoints (the Wadden coast,
the Sound, Visby ⚙) to the four Kontore. Lanes are chains of 2–4 legs ⚙. Bruges is short
and open from setup; the far Kontore start **closed** until someone charts the way — the
v5 squeeze line "the hulls decide which ports are open" becomes "the lanes we opened
decide," which is player agency and shared infrastructure in one. *Component state:*
closed legs are covered by printed closure tiles; charting removes the tile (first to
chart takes its printed privilege ⚙); open is visible, cost is printed on the leg.

**Posts and factors — "develop destinations."** A **post** is your marker on a waypoint:
your Ships passing it collect its printed line ⚙. A **factor** is your standing piece at
a Kontor: your landings there improve per its printed line ⚙ (a lift, a glut shield, a
better prize — Phase 1 picks). *Component state:* both are standing player markers on
printed spaces; every benefit is printed where it fires.

**The current — the drift.** At a fixed, visible moment ⚙ (candidate: when the round
marker advances), **every Ship at sea moves one leg, together, in one sweep.** Nobody
sails alone by default; the table watches a shared countdown. The **SAIL** verb pushes
any one Ship an extra leg — toward your pumped market, or (a rival's push) onto a crashed
one. *Component state:* the round marker is the current's clock; a single all-ships sweep
means no per-ship "moved?" memory exists. (Vocabulary note: **"the tide" is taken** by
the v5.4 Public Works rule — the drift is *the current*, per `STYLE.md` §4d.)

**The turn — one verb, fast ⚙:**
- **WORK** — move on the wharf, fire your station and its slot (the lean beat: source /
  brew / age / load; the v5 line-sweep retires).
- **SAIL** — advance one Ship at sea one leg.
- **CHART** — open a closed leg, or place a post / establish a factor (printed fees).
- **TRADE** — a market action where you have standing (a shift ⚙ — the up-shift supply
  finally becomes a *verb*, which is what the v5 Glut findings demanded).

**Specialists — placed people, one loop each.** Wharf crew (Braumeister, Cellarman —
production drips), ship's crew (ride a specific Ship: a Pilot advancing it at your turn
start, a Supercargo paying out mid-voyage ⚙), Kontor agents (a Factor holding your price
against the glut ⚙). *Component state:* the tile physically stands where the person
works — board, Ship, or Kontor panel; whom you hire and where you post them is readable
across the table and IS your lane.

**What the wharf gives up to pay for the sea (the weight ledger):** the line-sweep and
its optional-stops menu; the Venture two-line grammar (public lines, the FLIP/overbuild
ladder) — the tiles' ideas re-derive as posts, factors, and Kontor development; the
display-luck of destinations. The wharf gets *simpler* so the sea can be the game.

---

## 3 · Carry · retire · re-derive (the ledger)

**CARRY (unchanged unless a re-read forces it):** the quality dice and every die law ·
the cask tiles, beers, recipes, brew costs, the searchable stacks · the Bourse track and
the glut (one step per type, at landing) · the Kontor panels, parking fields, minimums,
prizes-as-choice, majorities ⚙ (numbers re-read for the new landing count) · the three
hull sizes (re-derived: **size vs speed** — the Skute fast, the Hulk slow tonnage ⚙) ·
the score ring · goods, caps, fees · the empty-tray clock (re-read below) · the sim
discipline (canonical engine, fan-out, outputs in chat).

**RETIRE:** the instant sail-and-deliver · the wharf Venture grammar whole (public
lines, FLIP, overbuild — the audit showed half the family dead and the public lines
arming rivals) · the line activation's optional-stops sweep · destination-by-display-luck.

**RE-DERIVE:** the Venture tiles' second life as posts/factors (or clean new tiles — fork
F4) · commission → departure (fork F8) · the Public Works on a thinned wharf (fork F6) ·
the specialist roster onto the placed-people grammar · the Flight ⚙ under the new landing
economy (fork F7) · MAX_ROUND and the pace band in *turns*, not just rounds.

---

## 4 · The hard problems (solve on paper in Phase 1 — each must pass the constitution)

1. **End-game cargo.** The last tray empties while Ships are mid-sea. Opening bid: unfinished
   voyages land at the nearest charted node at half value ⚙ — but the rule must be
   calculation-free off the components (candidate: "score the die, ignore the marker").
2. **Involuntary landings.** A rival's SAIL push forcing your cargo ashore early is the
   interaction AND a feel-bad — the push wants a real printed cost ⚙.
3. **2p map thinness.** Shrink the map by count, or seed neutral traffic ⚙.
4. **The clock re-read.** Dice still commit at load, but landings are lumpy and house
   turns don't spend dice — re-derive the end trigger and backstop for the new cadence.
   (The v5 skill finding stands: a tray clock only works on players who spend it.)
5. **Turn parity.** A SAIL or CHART turn must matter as much as a WORK turn, or the sea
   becomes a chore lane. If a verb is ever "the turn you take when you can't do better,"
   it isn't done.
6. **Simultaneity at the current.** Two Ships entering Kontore in one sweep: landing
   order = a fixed printed order (candidate: lane order clockwise ⚙) — never a choice to
   remember, never a negotiation.

---

## 5 · The phases & their gates

- **P0 — DONE this commit:** v5.8 frozen playable at `archive/v5/` (game + docs +
  instruments; its own README); root `playtests/` retired with it; charter (`CLAUDE.md`)
  and registry (`STYLE.md` §4d) updated; this plan landed.
- **P1 — PAPER (now):** the one-page v6 rules sketch · the map graph (nodes/legs per
  player count) · the component-delta manifest · every open fork below resolved by the
  designer. **Gate:** each mechanic passes the constitution *in writing* — the checklist
  answer ("where does this state live?") recorded per mechanic.
- **P2 — DOCS:** `RULES.md` rewritten as v6.0 · `COMPONENTS.md` v6 manifest ·
  `STYLE.md` full registry pass (the §4d reservations locked or renamed) · `DESIGN.md`
  gains the v6 architecture section; this plan absorbs into it when stable. **Gate:**
  surfaces agree; no orphaned v5 term or value anywhere outside `archive/`.
- **P3 — ENGINE:** `play.html` rebuilt for v6 (`KEY hanse-v60`) · a fresh `playtests/`
  (verify-v6 battery · sim.js re-pointed with v6 counters: voyages, legs, charts, posts,
  pushes, landings · AI tiers re-taught — new decision types are the one revision class
  that costs bot work). **Gate:** verify green · 0 crashes / 0 deadlocks 2–4p. **The
  math returns here.**
- **P4 — ORACLE:** pace band re-derived (turn count AND wall-clock) · the lane oracle
  rebuilt for v6 lanes · the ladder · margins, seat spread, first-player read at skill.
  **Gate:** the pole test — no lane negated; the runaway read at 2p.
- **P5 — KIT:** `print.html` v6 · `rulebook.html` · the aids — only after the ⚙ numbers
  settle. **Gate:** aid fit · the v4.13 law (every printed face has its COMPONENTS note).

**Publishing:** root pages stay v5.8-true until P3 flips them (the archive link keeps v5
playable forever — a save-`KEY` change lands only when the v6 engine does). Docs publish
to `main` as they land, per the charter.

---

## 6 · Open forks (designer decisions, wanted for P1)

- **F1 · WORK's shape:** station+slot (recommended — the fast beat) vs keeping the v5
  row/column line in a thinned form.
- **F2 · Hull ownership:** neutral hulls + the current + SAIL pushes (recommended — the
  berth race survives) vs owned convoys.
- **F3 · The current's cadence:** all Ships at the round marker (recommended — one sweep,
  zero memory) vs per-turn drift.
- **F4 · The old Venture tiles' second life:** re-cut as posts/factors vs clean new
  components (the dual-use L1/L2 idea may survive as post→factor upgrades).
- **F5 · Map size & closure by player count;** which Kontore start closed ⚙.
- **F6 · Public Works fate** on the thinned wharf (keep with the tide; trim the roster ⚙).
- **F7 · The Flight** under fewer landings ⚙ (distinct beers shipped still reads clean —
  the cards ARE the tracker — but the curve wants a re-read).
- **F8 · Commissioning:** keep as a WORK option at the Harbor vs fold into departure.
- **F9 · The board:** a separate sea board vs one board wrapping the Wharf in the map
  (kit cost vs table legibility — `COMPONENTS.md` question).
- **F10 · The pace dial:** the 13-die pool re-read for the new cadence (dice per player ⚙,
  and whether SAIL/CHART turns should carry any clock cost at all).

---

## 7 · What success looks like (so P4 has a target before any number exists)

Value beats volume (a fatter, better-timed voyage outscores one-more-cheap-landing) · at
skill, at least three of {market-timer · lane-builder · quality-runner · wide-lander}
live by the pole test · every state readable off a component by a stranger walking past
the table · a turn executes in well under a minute · the 2p margin no longer a blowout
coin-flip · wall-clock inside 45–75 min at every count.
