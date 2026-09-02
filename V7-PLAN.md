# Brewhouses of the Hanse — THE V7 PROGRAM (reflection + plan)

*Designer-ruled 2026-08-31. This document is the **v7-era read-FIRST** after `CLAUDE.md`.
It is written to stand alone: a fresh session reads this and knows where the game is, why
the v6 program fell short at a human table, what the designer has ruled for v7, and how we
work from here. It supersedes `V6-PLAN.md` as direction (that file stays as history).*

**Status: TEST BUILD LIVE (2026-08-31, designer-called: "we are going to design a plan
and build out a new version of the game").** P0 is DONE — the complete v6.5b build is
frozen playable at `archive/v6/` (the v5.8 pattern) and the root is the v7 workbench.
§10 below is the P1 MECHANIC SHEET — every directive answered with its component, every
fork call taken ⚙ (the designer re-rules freely, the v6 test-build precedent). The v7.0
test build runs at root: `play.html` (`KEY hanse-v70b`) · `RULES.md` · `COMPONENTS.md` §0 ·
`STYLE.md` §4e · a fresh `playtests/verify-v7.js`. The §11 question list is what this
build asks the human table.**

---

## 0 · Why this document exists

On 2026-08-31 the designer played v6.5b at a live 3-player table (vs Guildmaster and
Cellarmaster AI seats) and ruled the build **a significant regression in feel** despite
green instruments — the game dragged, the sea ran itself without occupying the player's
mind, the engine-building core the v6 program promised never materialized, score totals
were illegible, and the game's biggest moment (a 9★+11★ Novgorod landing) resolved
off-turn, executed by an opponent. The full diagnostic log lives in the session record;
its evidence is condensed in §1.1 so this document needs no other source.

The same review found **two process failures** in how the design assistant worked, both
now corrected as standing law (§7): treating simulator output as the game's truth, and a
working vocabulary ("furniture", "scenery") that framed components as background — the
exact opposite of the charter's rule that every component is a mechanic with implications
across the entire game.

---

## 1 · The reflection

### 1.1 The build — what the table showed (v6.5b, 3p, captured round 18)

State at capture: Sean (human) 85★ vs 45★/37★ (AI); 8 voyages landed; game not over and
projecting to round 25–30. The evidence, item by item:

- **The payoff half of the game happens TO you, not BY you.** Landings resolve inside
  the current's automated between-turn sweep — land, deliver, prizes, glut, factor-step,
  ten log lines nobody enacted. The human's best moment (Broyhan 9★ + Bock 11★ at
  Novgorod) was triggered by an *opponent's* SAIL push, off-turn. Bruges and Bergen are
  one leg out, so ~half of all voyages need zero attention after loading.
- **Sea development completes by mid-game, then becomes untracked background income.**
  Establishment supply at round 18: 1/0/0. Both passages open. Bruges factor seats full.
  From there the sea is a stream of +1G/+2G toll drips minted during automated sweeps on
  shared boats — no payer, no moment, no anticipation. Designer: *"I don't feel like I am
  working towards the solution there, I feel like it automatically happens — it doesn't
  require attention so it isn't in my mind as I play, which is worse than it being a
  burden or not existing in the first place."*
- **Nothing to build.** `worksBag` empty at round 18; three Public Works left and the
  tide takes those; no build verb anywhere; the Ventures dormant. *"The previous version
  had buildings I could build which were very legible and tangible. I lose this here...
  I don't feel like the game has an engine building core, which is what I wanted to be a
  core add in the v6 project."*
- **The dice clock slowed at both ends.** Brewing lost its second access (one Brew seat
  in v6.5, where v5.8 reached brewing from two lines), and the sea's fee sinks compete
  directly with brew costs. The human ended **G8 / H0** — grain-rich from tolls and unable
  to brew anything but Gruit, with empty vessels and nothing at sea: a no-goals state.
  The sea pays grain; brewing needs hops; the plumbing is crossed. The die's only exit
  was brewing (presence never fired all game — `presBonus` 0/0/0 for all seats).
- **The market flattened into a constant.** Bourse at capture: +2/+3/+2/+2 — every
  marker high, every delivery ambiently inflated, no price signal, no timing decision.
  The motivational read (designer): *"I actually wanted to avoid manipulating the market.
  I didn't want to mess up a potential future turn and I didn't want to help others. It
  started high so no motivation to help myself either."*
- **CHART violated the constitution.** One verb hiding a four-way submenu (open / post /
  factor / upgrade × location). Designer: *"I wanted depth and I got a long list of
  options that all felt the same with meh rewards I needed to spend more attention
  watching."* The tax structure is invisible where GWT's is painted on the path.
- **Ownership is too thin to motivate.** Shared hulls + flank loading + shared slot
  benefits: *"why would I put a ship on a good slot if I can't exclusively utilize it?
  The lack of ownership of the ship and lack of ownership of the benefit... abstracts
  the whole mechanic."*
- **Score illegibility.** 85★ untraceable by its owner (*"I have no idea how I got that
  many"*); a Bruges landing paid three identical "+2★ (no recipe in reach)" consolation
  lines where a prize moment should be; the big Novgorod scores gave no completed-goal
  satisfaction because no goal had been legible beforehand.
- **The runaway is intact.** 85–45–37 at round 18, throughput-shaped, majorities riding
  delivery counts (15/13/12).

**What worked at the same table** (keep-list evidence, not consolation): the wharf loop's
rhythm (move → brew → age+load reads as a clean drumbeat; turns are fast); the search-brew
(*"I like the ability to visit brew and search for the benefit I want"*); the Bock arc
exists mechanically (age to 5, prop the marker, 11★ at Novgorod); Brew+Trade pairing used
naturally; component-state discipline total (the diagnostic rebuilds the whole game);
the best teach of any version.

### 1.2 The process — what the program got wrong about how it worked

1. **Instruments were treated as the truth.** Sims measure crash-freedom, round bands,
   margins, verb counts. They cannot measure attention, ownership, anticipation,
   legibility, or fun — the exact dimensions v6 existed to improve. Green gates were
   reported as ground gained while the human experience regressed. A greedy bot cannot
   feel an absence.
2. **The turn structure churned while the core ask went unbuilt.** v6.2 walk → v6.3 line
   → v6.4 street model → v6.5 station → v6.5b seat swap, in days — while the designer's
   repeated ask (private buildings / an engine-building core; kontor-boosting buildings)
   *"kept coming up short."* Structure edits are cheap and legible to the assistant;
   system design is the actual work.
3. **Vocabulary shaped mindset.** "Die-less furniture", "setup furniture", "the sea as
   scenery" — language that classifies components as background produces designs where
   they behave as background. The designer's law stands: **we design mechanics, systems
   and rules with implications for the entire game; no component is noise.** The v5-era
   "furniture" phrasing in legacy docs does not carry into v7 vocabulary.

---

## 2 · What v6.5b is (the state a new session inherits)

- **Live build:** `play.html` v6.5b, `KEY hanse-v65b`. Turn = MOVE to an adjacent
  station (orthogonal) · work that station's PRIMARY + ALTERNATE + a load at each of its
  two flanking slots, all optional. Seats: Market *Source 3 / Sail* · Brewhouse *Brew
  (search) / Trade* · Harbor *Commission / Chart* · Cellar *Age 3 / Load-any*.
- **The sea:** 4 waypoints (Wadden Coast, Dover Strait, Skagen, the Sound), lanes of 1–2
  legs; the current advances every ship one leg at the round marker; cargo priced at
  landing; posts/factors via CHART, upgradable to establishments/Kontorhaus (supply 2
  each); passages open once for everyone.
- **Instruments:** `playtests/verify-v6.js` (72 checks) · `playtests/sim.js` (greedy/MC
  tiers). Both green on this build — see §1.2.1 for what that does and does not mean.
- **Frozen reference:** the complete v5.8 game at `archive/v5/` (never edited). The v5.8
  engine still carries the Ventures, the line activation, and the pre-v6 systems v7 will
  want to re-read — it is the best reference for directives 2 and 3 below.
- **Docs:** `RULES.md` / `COMPONENTS.md` §0 / `STYLE.md` §4d are v6.5b-current;
  `rulebook.html` and `DESIGN.md`'s architecture sections still describe v5.8;
  `V6-PLAN.md` is now history.
- **P0 candidate for v7 (designer to confirm):** freeze v6.5b (pages + verify) to
  `archive/v6/` the way v5.8 was frozen, so the v7 rebuild starts clean while the last
  test bed stays playable.

---

## 3 · What carries into v7 unquestioned

The die-is-the-cask laws (never rolled, never turns on its own, dice never return, tray +
in-play + parked always public) · the component-state CONSTITUTION (every value and state
on a component; arithmetic ceiling one die + one printed marker; a mechanic that needs
memory is out, not patched) · goods as the only currency · the **search-brew loop**
(designer: *"the brew loop works"*) · move-adjacent wharf rhythm with fast, low-AP turns ·
icons over prose and the `STYLE.md` registry · the app/print mirror discipline (edit card
faces in `components.js`, never per-page) · the sim harness discipline (canonical engine,
fan-out, outputs in chat) **subordinated to the human table per §7**.

---

## 4 · THE TEN DIRECTIVES (designer-ruled 2026-08-31 — the v7 inputs)

*Recorded faithfully, including the designer's own open questions. These are inputs to
the v7 paper phase — sketched directions, not final rules. Where the designer wrote "I
don't know" / "who knows" / "we can see", that fork is theirs to close.*

**D1 · Directional value: some Kontore better, some beers better — via specialists and
buildings (private and shared) in combination.** The remembered joy to recapture: an
early version's public building that made deliveries to one Kontor **+4** — *"when the
+4 Bruges building was there, we all raced to deliver our Gruits there to make them more
valuable."* Shared, visible, temporary value spikes that create table-wide races.

**D2 · Private buildings return — THE engine-building core.** They carry **dice to track
public usage (scoring for the owner)** and print strong actions that push the owner
toward one strategic lane or another. *(This has been asked for repeatedly and the
program kept coming up short — treat it as priority one, not a feature among many. The
v5 Ventures and the pre-v5.3 investor-die grammar in `archive/v5/` and git history are
the raw material to re-read.)*

**D3 · Public buildings start in ALL 8 slots.** They still sail away with the Ship at
their slot — **but they do not refill** (the bag retires). Random draw from the pool at
setup (alongside the starting ships) makes every game's board variable. The building
designs are good; the actions can be improved.

**D4 · The dice are the clock — with MULTIPLE spend channels.** Brewing stays (as-is).
Dice also go **onto private buildings to generate value** (D2), and **into whatever the
second loop becomes** — *"maybe that is the sea, maybe it is a kontor destinations board,
maybe it is a hall shelf, who knows."* The clock only works when players have several
competing ways to spend it (the quick-points vs action-benefit vs future-brew tension).

**D5 · Short-term goals, legible at the table:** (a) brew better beer — get the recipe,
get the goods, brew, age; (b) increase cask quality — exceed Ready values for beer on
ships (the lift game); (c) build my engine.

**D6 · Long-term goals:** use the engine to get ahead, and **win the Kontore**. If
majorities are the thing, focus there — and **the friction between loading a cask and
scoring it should determine how much the majorities are worth.**

**D7 · The market goes DOWN ONLY.** Decay is an accelerant: beers are great when in
demand and value decays as supply increases. Maybe **specialists** can manipulate it —
but the baseline is one-way. *(This deliberately reverses the v5.6/v6 "the only way up
is a shift" doctrine and retires TRADE-as-up-shift; the flat-at-the-top market of §1.1
is the evidence. Note for the paper phase: the v5.8 oracle found a one-way market walks
a specialist's single marker to the floor — the designer's sketch answers with
specialist manipulation and D10's hall pricing; hold that tension in §6.)*

**D8 · If the sea stays the path, rethink it.** Posts along the way: keep. **Factors
should be a bigger factor.** **Passage unlocks become PER PLAYER** — *"such a small
event for unlocking something for everyone made it a dud, and I don't know why everyone
got to benefit from me unlocking a destination that really didn't cost anything."*
Posts re-derive as **private buildings** — each player the same set of 2 double-sided
tiles, choose the side when built (or L1→L2 upgrade), **with dice to mark passage** — or
as public with ownership tolls. And **explore building/upgrading the Kontore
themselves** — *"maybe the first deliveries are free but you need to improve them to
make additional deliveries or to expand the markets. I don't know."*

**D9 · Ship ownership on the table.** Maybe public ships AND private ones. **Remove the
Skute** — the single-berth hull isn't needed now that search-brewing lets you pick the
bonus you want. *(Paper-phase note: the Skute was also the deadlock relief valve —
verify what, if anything, relieves a stuck board in the v7 structure.)*

**D10 · The brew loop works — and the reward classes split.** Cask tiles carry the
commodity actions (goods, brew, age, sail, chart, recipe, presence-as-bonus...);
**reserved OFF the tiles: specialists, buildings, and maybe invitations.** The designer's
sketch of the second loop, recorded whole:

- **Presenting your brews.** Halls, possibly **in the Kontore**. You need an
  **invitation** to present a beer; presenting is how you gain ★ — *"this is where the
  market rate pays a bonus to make the numbers tangible."* Hall bonuses are
  **points-only**.
- **Demand cards:** hall placements possibly as cards on the Destinations board with
  **beer type and quality requirements** — variable demand per Kontor per game.
- **Invitations are EARNED by a dedicated mechanic** — not a station action, not a tile
  bonus. Candidate: **CONTRACTS return** — awarded on loading beer onto ships, keyed to
  beer type / quality / destination or combinations; *"I would love it if they built on
  more, but we can see."* Also liked: **first delivery per player at each Kontor awards
  an invitation.**
- **The sea as a tech tree / conveyor** each player unlocks (possibly built on the sea
  as it stands), where delivery to a Kontor grants access to either a high-quality
  resource (**building / specialist / die value**) — or the alternative use: **present
  the delivered beer at that Kontor's hall** (pay the invitation, choose a place, score
  at the printed rate).
- **The spark:** *"maybe the number of spent invitations in a given kontor sets the
  value of the majority winner. The hotter a race for a majority, the higher the value.
  This starts to be more exciting."* (Constitution check, recorded now: the spent
  invitations physically accumulating at a Kontor ARE the tracker — this passes
  component-state supremacy cleanly, and it operationalizes D6's friction-sets-value.)

---

## 5 · The designer's feel corrections (rulings on pace, market, chart, presence, language)

- **Pace identity:** quick low-AP turns → MANY turns is fine. If turns are combo-sized
  (like v6.5's station visit), the target is **10–15 total turns**. Reference points:
  Lacerda games that give a dozen dense turns of quick, stringable low-AP actions;
  **Speakeasy** — a ton of options, each bite-sized, the pool shrinking through worker
  blocking and through your own clearly-legible needs. **A lot of legibility is a good
  thing.**
- **The market failure was motivational, not numeric:** started high → no reason to help
  yourself; touching it risks your own future turns or helps rivals → nobody touches it.
  D7's down-only baseline removes the dead choice.
- **CHART:** depth was wanted; a long same-y option list with meh rewards was delivered.
  One verb must not hide a menu (the constitution already said so).
- **Presence:** its silence at the table is **fine** — it was a recurring feel-bad, it is
  not an essential mechanic, do not boost it. At most it survives as a cask-tile bonus.
- **Language law:** no component is "furniture", "scenery", or noise — in docs, in chat,
  or in thinking. If a component reads as background at the table, that is a design
  failure to fix, not a category to file it under.

---

## 6 · Open tensions (resolve WITH the designer at the paper phase — never silently)

1. **Down-only market vs single-beer strategies** — decay punishes shipping the same
   beer repeatedly (the v5.8 oracle's floor-walk finding). The designer's sketch answers
   with specialist manipulation (D7) and hall pricing (D10); the paper phase must make
   one of those a real counterweight or accept the push toward breadth.
2. **10–15 combo turns vs the 13-die pool and multiple die sinks** — the clock math is
   fully open again (dice per player, what commits a die, what the backstop is).
3. **Per-player unlocks and private posts vs shared-board interaction** — v7 moves the
   ownership dial hard toward private; the berth race / shared-hull interaction pillar
   needs a deliberate new home (D9's public+private ship split is the likely seam).
4. **Slot economy under D2+D3** — 8 slots, all starting with public buildings that burn
   away, private buildings arriving, ships docking: the sequencing and ground-scarcity
   curve is a design in itself (and the late-game ground now has an inheritor again).
5. **The Kontor as a place** (D8's build-the-Kontor + D10's halls + majorities + the
   destinations board) — several sketches point at one component: the Kontor panel as
   the game's second board. The paper phase should design it once, holistically.
6. **What the sea keeps** if the tech-tree/conveyor frame wins: the current, transit
   time, and priced-at-landing were v6's genuinely new mechanics; which survive
   per-player unlocks is a real fork, not an assumption.

---

## 7 · Process law for the v7 program (the correction, made standing)

1. **The human table is the top oracle.** Sims gate robustness and pace only (0 crashes,
   0 deadlocks, round bands). No claim of design improvement may rest on bot numbers.
   Every engine milestone ends in a **human playtest question list** — the specific feel
   questions that build is asking the table — not a sim verdict.
2. **Feel metrics are named per phase and asked explicitly after every table:**
   attention (is each loop in your mind between turns?) · ownership (who enacts the
   payoff moments?) · anticipation (what are you looking forward to?) · legibility (can
   you trace your score and name your goals?) · pace (did any stretch drag?).
3. **Designer directives get built as directed before alternatives are argued.** The
   "asked several times, came up short" pattern ends. Pushback is one paragraph, once,
   before building — never instead of building.
4. **Vocabulary discipline per §5.** The registry (`STYLE.md`) stays rank 1; internal
   docs and chat follow the same law.
5. **Structure churn is rationed.** Turn-shape edits are cheap; systems are the work.
   A phase that ships only structure edits has not advanced the program.
6. **One-document handoffs.** Every phase end updates this document (or its successor)
   so a clean session can always resume from the repo alone.

---

## 8 · Suggested phases

- **P0 — FREEZE (pending designer confirmation):** v6.5b → `archive/v6/` (pages +
  verify battery), the v5.8 pattern; root becomes the v7 workbench.
- **P1 — PAPER, with the designer, directive by directive:** each of D1–D10 becomes a
  mechanic sketch with its component answer and constitution check; the §6 tensions get
  ruled; the clock math (D4 + the 10–15-turn identity) is derived on paper. Nothing
  builds until the designer signs the sheet.
- **P2 — DOCS:** `RULES.md` v7.0 · `COMPONENTS.md` manifest · `STYLE.md` registry pass
  (contracts, invitations, halls, the market's new grammar).
- **P3 — ENGINE:** `play.html` v7 (`KEY hanse-v70a`) + a fresh verify battery + sim
  re-pointed at the new counters (contracts earned, invitations spent, hall
  presentations, per-player unlocks, building usage dice).
- **P4 — THE TABLE LOOP:** short human playtests EARLY and often, each against the §7.2
  feel metrics; sims run alongside for robustness only. The oracle/ladder rebuild serves
  the table, not the other way around.
- **P5 — KIT:** print + rulebook + aids after the numbers settle. **LANDED WHOLE
  2026-08-31** — `print.html` + `components.js` cut the full `COMPONENTS.md` §0 kit
  (contracts ⚜ · demand cards · the ladder-printed Destinations board · ship deck 18 ·
  the Venture sheet · flags + ladder markers · the v7 tri-fold aid + checklist), and
  `rulebook.html` re-derived whole from `RULES.md` the same day (4 pages, fit-gated,
  audited against the rules by a 12-domain adversarial pass).

---

## 9 · What success feels like (the §7-of-v6 test, rewritten in the designer's terms)

At the table: you can name your short-term goal (a better brew, a lift, an engine piece)
and your long-term goal (the engine paying off, a Kontor race) at any point in the game ·
the payoff moments are enacted by the player who built them, on their turn · the second
loop occupies your mind between turns because something you own is developing there · a
race the whole table can see (a hot Kontor, a spiking beer, a majority worth more every
invitation) is running at most moments · you can trace your score to decisions you
remember making · quick turns, 10–15 meaningful ones each, inside 45–75 minutes · and
the engine you built is the story you tell afterward.

---

## 10 · THE P1 MECHANIC SHEET (drafted + red-teamed 2026-08-31 — every fork call ⚙, the designer re-rules freely)

*Each directive gets its mechanic, its component answer, and its constitution check. The
v6 test-build precedent governs: the calls are taken so a build exists to play; every one
is a dial, none is a ruling. Before anything built, the sheet ran a four-lens adversarial
review (constitution · deadlock/degenerate play · directive fidelity · rules-lawyer);
§10.11 records what that pass changed. §11 is the table's question list.*

### 10.0 · The shape in one breath

**v7 = the v5.8 wharf drumbeat + the engine-building core the program kept owing.** The
sea map, the current, transit, posts, factors, establishments and house markers retire
whole (the v6 sea ran itself — §1.1). Sailing returns to the **instant, enacted
resolution**: a full Ship sails and lands at once, on the turn of the player whose load
(or SAIL) launched it. *(Recorded fork, closing §6.6: transit time and load-vs-landing
pricing risk retire WITH the map — the table evidence was that automated transit killed
attention; §11 asks whether the pricing-risk tension is missed.)* The development game
the sea was carrying re-homes to three places players own and enact: **the VENTURES**
(D2 — private buildings with usage-ledger dice), **the per-player LANE GATES** (D8/D10 —
the far Kontore open through your standing at their gateways), and **the KONTOR PANEL**
(D1/D6/D10 — demand cards, halls, invitation-fed majority ladders). The market goes
down-only (D7). The turn keeps v6.5's praised shape: MOVE adjacent · work the station's
whole counter.

### 10.1 · D2 first — THE VENTURES RETURN (the engine-building core, priority one)

The v5.5 themed hand carries whole as cardboard — **4 dual-use tiles per player (brew ·
age · die · points), L1 face / own-theme L2 face, the FLIP** — re-derived onto a new
grammar:

- **BUILD is a station verb at last** (the starved-door lesson): the Market's ALTERNATE
  is **BUILD — place or advance ONE of your Venture tiles; the fee prints on the face
  going down**, one grammar, never a menu. An L1 from hand goes onto an **open slot
  (1 `G` ⚙) or REPLACES a Public Work (2 `G` ⚙ — the worn tile boxed; never a rival's
  Venture)**; your standing L1 **FLIPS** to its own L2 (2 `G` ⚙); a second hand tile
  **overbuilds** your own L1 with a different theme's L2 (2 `G` ⚙, the L1 boxed). The
  replace mode is load-bearing: the wharf starts FULL (D3), so building IS how ground
  opens early — the tide keeps opening more.
- **THE LEDGER DIE (the D2 ask, verbatim: "dice to track public usage, scoring for the
  owner").** Building an L1 stands a **tray die** on the tile at face 1 — committed for
  good (a real clock decision, D4's second spend channel). **Each time the Venture
  serves a RIVAL — its action used by them, or its printed trigger fired by their
  traffic — the ledger die turns +1** (cap 6; a rival serve past the cap pays the owner
  **1★ at once** ⚙, so a busy engine never goes dead). **The owner's own use is free
  and ticks nothing** — "public usage" means the rivals'. At game end the owner scores
  the ledger's pips (face 1 untouched = 1★, the founding pip — printed). **One ledger
  die per ground, for life: it keeps its pips through the FLIP and the overbuild; no
  second die ever stands on one slot.** *(Amends the v5.3 "no die on a building" law by
  direct directive; the law survives whole for Public Works.)*
- **A Venture's action serves the whole table — always on the USING player's own
  components.** Whoever works the adjacent station may use the flanking Venture, once
  per visit; a rival's use ticks your ledger. Your building is a toll booth on their
  street — the interaction pillar kept without the v5 public-line noise (that grammar
  retires), and placement is the game: build where THEY walk.
- **The faces (v5.5's, designer-praised, carried):** brew — **Mash Tun** (Brew: the top
  tile) / **Great Copper** (2 goods + a full search Brew) · age — **Warehouse** (Age 2,
  then load 1 of your Ready casks onto any eligible Ship) / **Assay Loft** (pay 2 `H`:
  every one of YOUR maturing casks to READY) · die — **Rack House** (swap the dice of 2
  of your vessel casks) / **Lagering Cellar** (one of your vessel dice +1, cap 6) ·
  points — **Counting House** (*trigger:* a rival's load at this slot ticks the ledger;
  YOUR loads here **+1★** each) / **Staple Rights** (*trigger:* your casks sailed from
  this slot **+2★** each; a rival's sail from it ticks once).
- *Constitution:* state = the tile + one die; arithmetic = turn a die one step; a
  stranger reads the engine's earnings off the standing pips. PASS.

### 10.2 · D3 — the Public Works start in ALL 8 slots, and the bag retires

Setup shuffles the roster and deals **8 tiles onto the 8 slots**. The tide is unchanged
— a Ship sailing from a slot takes its Work, boxed, gone — but **nothing refills**: the
wharf starts furnished and strips to bare ground, the ground the Ventures inherit (and
BUILD's replace mode clears deliberately). Roster ⚙ 12 (deal 8): Malt Kiln ×2 · Customs
· Ropewalk · Cooperage · Weigh House · Staple Houses ×4 · Bonded Store · Victualling
Yard. **The Tollhouse retires** ⚙ — its toll-bench face was an up-shift, and D7
reserves the market's one hand for a specialist.

### 10.3 · D7 — the market goes DOWN ONLY

The Bourse carries v5.6's furniture (one printed track −1…+3 ⚙, a named colour-matched
marker per in-play beer except Gruit & Jopenbier, all opening at +3 ⚙, a DELIVER = die
+ marker as printed, floor 0, then one step down per beer TYPE delivered). What
changes: **every up-shift channel retires** — TRADE, the factor's step, the toll bench,
Bergen's shift-prize arm. The exceptions, exactly two:
- **the Coper** ⚙ (a new guild specialist — the designer's "maybe specialists can
  manipulate it"): after the glut of a sail that landed your cask (any turn), step ONE
  beer you landed back +1;
- **the Weigh House** (carried): a certified cargo does not glut.
And the structural counterweights for single-beer play (§6.1): **a PRESENTED cask
neither reads the marker nor gluts its beer** (§10.5) — the hall is where a committed
brewer sells outside the market. Recorded as the live §6.1 watch, not a solved
question.

### 10.4 · D8 + D10a — the sea becomes each player's ladder (per-player lane gates)

The map retires; the geography stays as **four lanes in two branches**: Bruges → London
(west), Bergen → Novgorod (east). **Bruges and Bergen are open to everyone from setup.
London and Novgorod open PER PLAYER, and stay a developing track:** you may commission
toward, or load toward, a far Kontor only **while your parked dice at its gateway
OUTNUMBER your parked dice at the far Kontor itself** (London ← Bruges · Novgorod ←
Bergen). Your first London delivery needs one Bruges die; your third needs three — the
gateway is a standing you keep growing (the designer's "first deliveries free but you
need to improve them to make additional deliveries", built with zero new components:
**the two piles of parked dice ARE the tracker**, and anyone reads the gate by
comparing them). Demand-seat dice count — a die on a hall seat IS a parked die of its
Kontor.

*(The §7.3 pushback paragraph, recorded once: D8 also sketched keeping posts, making
factors bigger, and posts-as-private-buildings. This sheet retires all three WITH the
map they lived on — the table evidence (§1.1) was that sea furniture became untracked
background income, and every re-derivation of a post is a drip that fires off-turn. The
asks' jobs re-home enacted: "posts along the way" → the Ventures (standing private
infrastructure that earns from rivals' traffic, on the board players actually walk);
"factors should be a bigger factor" → the hall/ladder presence game at the Kontor
panel; "build/upgrade the Kontore" → the outnumber-gate above + the ladders the table
pumps. If the designer wants sea furniture back, the fork is open — but it should be
furniture a player ENACTS, or it will fail §1.1 again.)*

### 10.5 · D10 — the second loop: CONTRACTS → INVITATIONS → the HALLS → the LADDERS

The designer's sketch, built as one physical lifecycle — **one card, four lives**:

1. **In the display it is a CONTRACT** (a goal): a row of 3 ⚙ face-up cards, each
   printing a LOAD condition ⚙ (a quality band · a die face · a hull size · a
   destination). **When your load matches a displayed contract, you may claim it — ONE
   claim per turn** ⚙ (the throughput-leader brake); the display refills at end of
   turn. Claiming is enacted, on your turn, at the friction point D6 names (loading).
2. **In your hand it is an ⚜ INVITATION** — face-up in front of you (the race is
   public) — the admission the halls demand.
3. **Spent, it is a PRESENTATION**: when your cask lands at a Kontor, instead of
   DELIVERING you may **PRESENT it — spend 1 ⚜; the cask must match the Kontor's
   demand card and take an open seat** (2 ⚙ per card; the same player may fill both).
   A present scores **die + the card's printed bonus ★** — the demand card IS the
   hall's price; the Bourse stays outside the doors (no marker, no glut, no prize, no
   Novgorod premium). The die parks ON the seat — presence, majority weight and the
   lane gates read it like any parked die. No card in the well, or no open seat → no
   present at that Kontor.
4. **Its ashes fuel the LADDER (the spark, verbatim):** every ⚜ spent at a Kontor
   advances that Kontor's printed **MAJORITY LADDER** one step. The ladder's marker IS
   the majority's current value — the whole table watches a race heat up. The spent
   card returns to the bottom of the contract deck.

**The demand cards are their own 12-card deck** ⚙ (deal 1 per Kontor at setup; a full
card retires at once — its dice slide to the parking field — and a fresh card deals at
end of turn; retired cards to the demand deck's bottom). **The halls do not admit
Gruit** (the spam brake): the mix ⚙ — **one type card per export beer** (+3★; undealt
exports' cards to the box — D1's "some beers better", variable per game) · *Q2+* +2★
×2 · *Q2–3* +3★ ×2 · *Q4+* +4★ ×2 · *die 5+* +5★ ×2. **Every demand card also prints
a market line ⚙: a matching DELIVER at this Kontor scores +1★** — the shared, ticketless
race D1 remembers ("we all raced to deliver our Gruits"), while the invited present
takes the big bonus, the seat and the ladder step.

**The ⚜ faucets:** contracts (the main), and **the first-landing letter** ⚙ (the
designer "also liked" it): the first time your cask lands at a Kontor, draw 1 contract
from the deck to hand — resolved after the sail fully resolves.

*Constitution:* every state is a card position or a parked die; the spent-⚜ count
lives on a printed ladder with one marker; a present pays die + one printed constant.
PASS.

### 10.6 · D1 + D6 — directional value & majorities worth the friction

- **D1's shared, visible, temporary spikes** are the demand cards (the +1★ market line
  pays every matching DELIVER; the card leaves when its seats fill) and the four Staple
  Houses in the works deal (+2★ destination premiums the tide will take).
- **D6's "friction sets the majority's worth"** is the ladder: majorities open CHEAP ⚙
  (base 1st/2nd: Bruges 3/1 · London 4/2 · Bergen 5/2 · Novgorod 5/2) and climb one
  printed step per ⚜ spent there (6 steps ⚙, topping at 9/4 · 10/5 · 11/5 · 11/5 ⚙).
  **Third place retires** ⚙ — two places pay at every count (the v5.8 2p ruling
  generalized; the presence gate stays printed: no parked dice, no share). *(Red-team
  watch, recorded: at 2p a solo pump part-gifts the rival's guaranteed second place,
  and ladder inflation can amplify a throughput leader — §11 asks; the dials on file
  are "2p steps raise 1st only" and "a spender who leads the Kontor doesn't advance
  the ladder".)*

### 10.7 · D9 — ship ownership on the table; the Skute retires

- Deck ⚙ 18: **Cog 2 berths (free) · Hulk 3 berths (1 `G`)** ⚙ — the Skute leaves, and
  the fee INVERTS from v5.8: with SAIL-now in the game, tonnage is the luxury and the
  small hull the commodity (red-team: a free 3-berth otherwise strictly dominates).
  Display of 3 ⚙.
- **The PRIVATE FLAG** ⚙ (1 per player): commissioning, you may plant your flag —
  **+1 `G`** ⚙ — and the hull is YOURS: only your casks board it, **only you may
  SAIL-now it**. The flag returns when it sails. Public hulls stay the berth race; the
  flag is the "why would I put a ship on a good slot" answer.
- **The deadlock valves:** the Harbor's ALTERNATE is **SAIL — a docked Ship carrying
  1+ of YOUR casks sails NOW**, unfull, free ⚙ (never a rival's tempo weapon: no cask
  of yours aboard, no sail; a flagged hull sails early only for its owner). And **a
  commission may take a slot holding an EMPTY Ship — the displaced hull returns to the
  deck** ⚙, so a hull nobody loads can never blockade the wharf. (A full Ship still
  sails at once.)

### 10.8 · D4/D5 — the clock, the turn, the stations

- **The turn (v6.5's praised shape, kept):** MOVE to an adjacent station (orthogonal;
  turn 1 places anywhere) · work its PRIMARY + its ALTERNATE + one load at each of its
  two flanking slots + each flanking Venture's action — any order, all optional, each
  stop once per visit (a stop is per-slot: used is used, even for a new arrival).
- **The stations** ⚙: **Market** *Source 3 / Source 1* (**v7.0b, designer-ruled
  2026-09-01: BUILD leaves the counter** — building is limited to delivery prizes and
  cask bonuses; the Market's ALTERNATE reverts to the lesser counter) · **Brewhouse** *Brew / the
  second kettle* (the double kettle — the second brew access v6.5 lost, restored in
  one visit; **v7.0a, designer-ruled same day: BOTH brews are full searches — the
  top-tile draw retires everywhere as a conditional rule — and the second kettle
  prints +1 `H` ⚙ on its seat**) · **Harbor** *Commission / Sail-now* · **Cellar**
  *Age 3 / Load 1 any*.
- **The clock, derived on paper (§6.2):** 13 dice ⚙ = ~8–10 brews + 2–4 ledger dice +
  0–2 presence. Three vessels turn a cask in ~2–3 visits; with the double kettle a
  committed brewer spends ~1 die/turn — the tray empties in **~11–15 turns**, the §5
  identity. Pool stays **13 ⚙** (THE pace dial, the designer's), **MAX_ROUND 22 ⚙**
  backstops just past the band (25–30 was the v6 drag; the backstop must not invite
  it).
- **The load bonuses** re-derive per D10's reservation (specialists, buildings and
  invitations come OFF the cask tiles): the 8-verb pool ⚙ is *Gain 2 goods · Age +2 ·
  Load 1 more · Place 1 presence · Gain 1 recipe (its fee) · Brew 1 (a full brew,
  v7.0a) · LIFT (this cask's die +1 as it boards, cap 6) · BUILD (place or advance
  ONE of your Ventures, its printed fee — v7.0b: it takes the SAIL seat; sail-early
  keeps its one home at the Harbor's ALTERNATE)*. The *hire* and *venture* verbs left
  the tiles at v7.0 (Bergen's prize and the build door are those channels — and v7.0a
  strips the printed specialist fees whole: a fee with no live channel was the
  free-here-pay-there conditionality the designer ruled out); **v7.0b returns *build*
  to the tiles as the door itself** — with London's prize the only two ways a Venture
  reaches ground.

### 10.9 · What carries untouched

The die-is-the-cask laws whole · brew costs, recipe fees (`H` = Q−3, every channel),
searchable census stacks, deal 3-of-4 exports · READY/minimum/lift grammar · the prize
choice per cask (Bruges recipe · London **one BUILD, fee waived** ⚙ (the CHART prize
retires with the sea) · Bergen a specialist · each also 2★, or **refresh the Kontor's
demand card** ⚙ — the dud-card valve; Novgorod's +3★ premium is part of its DELIVER
line, and it offers no prize at all) · the Flight ((n−1)², min 3, qualifying on the
LOAD as ever) · goods cap 8 · the specialist grammar (2 seats, earned never bought,
display 4) with the sea singles (Pilot · Surveyor · Wharfinger) retiring, the
**Chandler returning** and the **Coper** + **Herald** ⚙ entering · the score ring ·
Specialty Beers & Jopenbier toggles · the Waterworks Studio ingest.

### 10.10 · The retire ledger (v6 → v7)

The sea map board · voyages in transit · the current · SAIL-as-leg-push · CHART and its
whole family (passages, posts, factors, establishments, Kontorhaus, closures, house
markers) · TRADE · the Supercargo's trigger reverts to v5.8's ("a Ship sails your cask
on a rival's turn") · the Skute · the works bag · the Tollhouse ⚙ · the Guild Tastings
expansion (superseded by the core halls; components stay boxed in git).

### 10.11 · The red-team record (2026-08-31 — what the adversarial pass changed)

Four lenses (constitution · deadlock · fidelity · rules-lawyer) reviewed the drafted
sheet before the build; the accepted findings, so the reasoning survives:

1. **BUILD was dead at setup** (all 8 slots furnished, the v5.5 replace clause dropped)
   → the replace mode returns at a 2 `G` ⚙ premium.
2. **The ledger die had no home** through FLIP/overbuild → one die per ground for life.
3. **Self-ticking was farmable** (Counting House + own loops) and D2 says *public*
   usage → **rival-only ticks**; the cap gained the 1★ overflow ⚙ so busy engines
   never go dead.
4. **Gruit could spam the halls** (off-Bourse + die-1 presents) → the halls admit Q2+
   only; present pays die + bonus (no marker — also the constitution's two-addend fix).
5. **Empty hulls could blockade slots** (free far-Kontor commissions rivals can't
   load) → commissioning over an empty hull displaces it to the deck.
6. **A free 3-berth Hulk strictly dominated the Cog** once SAIL-now landed → fees
   invert (Cog free · Hulk 1 `G` ⚙).
7. **The lane gate was a solved checkbox** ("1+ ever") re-creating D8's "didn't cost
   anything" → the OUTNUMBER gate (gateway pile > far pile), a developing track.
8. **Contract claims scaled with load throughput** (the v5.8 runaway's own axis) → one
   claim per turn ⚙.
9. **A mismatched demand card froze a hall all game** → the prize choice gained the
   refresh arm ⚙; the deck mix went always-live + type cards (which also lands D1's
   "some beers better").
10. **Demand cards paid only ticket-holders** (not D1's table-wide race) → the +1★
    matching-DELIVER market line ⚙.
11. **Novgorod's +3★ was stated three ways** → it is the DELIVER line's premium, once;
    Novgorod prints no prize; presents never pay it.
12. A dozen rules-lawyer holes (maiden load = a LOAD in every respect · Venture
    actions act on the user's own components · seat dice are parked dice · letter
    timing after the sail · London's prize = any one BUILD · used stops stay used ·
    glut counts DELIVERED casks per type · warm hulls dock at s6·s7 ⚙ · ⚜ hands face
    up · LAND is the umbrella verb, DELIVER and PRESENT the resolutions) → printed in
    `RULES.md` v7.0 directly.

Deferred with dials on file (not built): the 2p ladder-pump subsidy · ladder-as-
runaway-amplifier · a die sink inside the hall loop (D4's "into the second loop") ·
per-source score-drip legibility · off-turn landings on shared hulls (the flag is the
v7.0 mitigation; the "threshold defer" dial is recorded).

---

## 11 · The question list this build asks the table (§7.1 — ask after every game)

1. **Attention/ownership:** with transit gone, does every landing feel enacted? Does a
   rival topping off a shared hull carrying your cask still read as the berth race
   (good) or as theft of your moment (the v6 disease, back)? Would you want the
   "resolve my cask at my turn start" defer instead?
2. **The engine core:** do the Ventures + ledger dice FEEL like engine building — is
   "one more tick" in your mind between rival turns? Is rival-only ticking legible?
   Is 4 tiles the right hand?
3. **The second loop:** contracts → ⚜ → present → ladder — is the lifecycle legible in
   one teach? Does the ladder make a majority race the table talks about — and does it
   crown the leader instead (the recorded 2p dials)?
4. **The market:** does down-only + the demand market line give the timing decision v6
   lacked? Is the Coper/certify/present trio enough of a counterweight for a committed
   brewer (§6.1)? Do you miss the load-now/price-later risk transit carried (§6.6)?
5. **The lane gates:** does the OUTNUMBER gate read as building your standing (a tech
   tree) or as a toll? Is gateway>far the right shape, or too harsh at Novgorod?
6. **Pace:** 10–15 turns per seat? Does the double kettle (plus brew Ventures) run
   hot? Is 13 dice / MAX_ROUND 22 right for the new spend channels?
   *(Panel-probed 2026-08-31 — the station-verb panel: watch the STACK, not the seat —
   the Brewhouse plus a flanking Mash Tun/Great Copper on s2/s3 is 3–4 brews a visit
   over docking hulls (a Gruit tempo-mill risk; the lever would be Venture faces or
   hull placement, never the station map). Bots double-brew ~1.2–1.4/player/game — a
   floor. 2p already ends on the MAX_ROUND ceiling 27–31% of bot games — a 13-dice/22
   dial question, NOT kettle heat; a brew fee measurably worsens it. Also ask: **which
   two stations did you bounce between — did the Cellar ever pull you?** The bots run
   a hot Market⇄Harbor corridor and a cold Cellar.)*
7. **The private flag & SAIL-now:** does one flag per player keep the berth race alive
   at 4p? Does the free unfull sail get used for tempo, or does it deflate full-hull
   racing?
8. **Score legibility:** at game end, can every player trace their total unaided —
   including the in-play drips (wharfage, staple, Chronicler)?

---

## 12 · The first oracle read (2026-09-02 — standing review #4)

Before any table: a **30-game 2p corpus** through the canonical engine (20 Cellarmaster
mirrors · 10 Cellarmaster vs Guildmaster · fixed rollout budgets · every turn recorded),
**two blind analyses** of it (rules + engine + a neutral brief only), and the gatekeeper
review built on both — **`archive/records/GATEKEEPER-v70b.md`**. The corpus and the
analyses stay out of the repo (charter §4); the review's appendix carries the numbers.

**Verdict: PASS-FOR-NOW on the right chassis.** The loop, the tide, the berth race, the
falling market and score legibility all landed (every seat total re-derived from
components). The v7 systems are inert under search: 314 ⚜ earned / 14 spent, 111 of 120
ladders at rung 1, the contract deck dry in 16 games, 0 flags in 181 commissions, Great
Copper 29 of 30 L2s, 21 of 30 games on the round-22 backstop with 27% of dice unspent,
pace 20.8 turns a seat. The review's §8 is the queue; **item 1 (price the hall: a present
keeps the prize, the rung belongs to the spender) is the one thing**, item 2 (the dice as
the clock, `PRES_POOL` 13→10 first) rides the same table. Read the §7 process law before
acting on any of it: the corpus is bots at 2p, the search tier idles 30% of its turns
(instrument AND game — the review says which reading each claim rests on), and the §11
questions above are what the table answers.
