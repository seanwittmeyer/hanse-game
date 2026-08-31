# Brewhouses of the Hanse — THE V7 PROGRAM (reflection + plan)

*Designer-ruled 2026-08-31. This document is the **v7-era read-FIRST** after `CLAUDE.md`.
It is written to stand alone: a fresh session reads this and knows where the game is, why
the v6 program fell short at a human table, what the designer has ruled for v7, and how we
work from here. It supersedes `V6-PLAN.md` as direction (that file stays as history).*

**Status: PAPER. Nothing in §4 is built. The v6.5b build stays live at root as the test
bed until the designer rules otherwise.**

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
- **P3 — ENGINE:** `play.html` v7 (`KEY hanse-v70`) + a fresh verify battery + sim
  re-pointed at the new counters (contracts earned, invitations spent, hall
  presentations, per-player unlocks, building usage dice).
- **P4 — THE TABLE LOOP:** short human playtests EARLY and often, each against the §7.2
  feel metrics; sims run alongside for robustness only. The oracle/ladder rebuild serves
  the table, not the other way around.
- **P5 — KIT:** print + rulebook + aids after the numbers settle.

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
