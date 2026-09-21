# Merchant Brewer of the Hanse — Design

> The design story: **why the game is the way it is**, the **current architecture**, **the one
> change log**, the **balance lessons**, and **the state of play with its open watches** (§10).
> Operational rules live in `RULES.md`; the manifest in `COMPONENTS.md`; the printed-copy
> registry in `STYLE.md`; the program plans in `plan/`. Everything before v8.0 — the v5.7
> architecture, the v0.1 → v7.0b log, the parking lot, the pre-v8 watches and glossary — lives
> in `archive/records/DESIGN-HISTORY-pre-v8.md`; the frozen playable builds at `archive/v5/`
> (v5.8) and `archive/v6/` (v6.5b). Every full entry, record and corpus is in git history.

---

## 1. Snapshot

|               |                                                                                   |
|---------------|-----------------------------------------------------------------------------------|
|**Players**    |2–4 (a 5p mode runs, untuned)                                                        |
|**Length**     |≈ 45–60 min at 2p, up to 90 at 4p · medium                                          |
|**Genre**      |Medium euro · engine building · a shared action grid (the Wharf) + a private brewery + a sea board |
|**Weight**     |*Great Western Trail / Distilled* — not Lacerda                                     |
|**Theme**      |A merchant brewing house in the Hanseatic League, Hamburg, c. 1350                  |
|**Status**     |**v8.2 “The Simple Core”** — live (`play.html`, KEY `hanse-v82a`). The shape: §6. The log: §9. The state of play and what comes next: §10 — the designer's own table first, then the oracle read; never a corpus before a human table. |

---

## 2. Design pillars (the north star)

1. **The mechanic *is* the theme.** Hopped beer survives the voyage → it *is* the export cargo.
   Nothing is bolted on.
2. **The squeeze is the soul.** *You can't brew everything, and you can't deliver everywhere.*
   Choosing your beers and your destinations is the game.
3. **Crisp turns, deep decisions.** Medium weight: actions are simple; depth lives in placement,
   timing, routing, and interaction — not in turn length or rules mass.
4. **Interaction through a shared board, never take-that.** Occupancy and the living slots
   reshape everyone's options; pressure, never a hard-lock.
5. **Legible scoring.** A player can name how they're winning. Clarity is a feature.

## 3. Hard constraints (solved thematically, not worked around)

- **No dice-as-randomizers** — fully deterministic; the quality die is a **marker**, never
  rolled. The managed-uncertainty seat is the *steerable* variance of the displays and the
  searchable stacks (Orléans-lite), not randomness.
- **No cards-as-hand** — all cardlike content is tiles on the table (the one exception, the
  hand of private building tiles, is public and identical for every player).
- **No money** — pre-modern barter: **goods (grain `G`, hops `H`) are the only currency;**
  grain is taken and hops are earned (§6); ★ is earned, unspendable score.
- **The component-state constitution:** every value and state is tracked with components on
  the board; players never remember states or values and never do complex calculations — the
  arithmetic ceiling is one die plus one printed marker; no rule may require memory, a ledger
  or app-side tracking (`CLAUDE.md` §1).

## 4. Theme & who you are

c. 1350, the Hanse at its height; Hamburg was literally *"the brewhouse of the Hanse."* The
pivotal innovation is **hopped beer**, which (unlike perishable gruit ale) survives a sea voyage
— a preservable, shippable export. You run a **merchant brewing house**: source grain & hops,
brew, age, and push casks across the North-Sea and Baltic network to the great trading posts
(**kontore** — Bruges · London · Bergen · Novgorod) for value and majorities — and, by cart,
present your finest at the Bruges hall of brewmasters. The deeper axis is **brewer vs
merchant**: the beer you can make against the sea you have opened.

---

## 5. Design lineage & comps

The target depth and the lessons we steer by:

| Comp | Its soul | What we take |
|---|---|---|
| **Lisboa** (Lacerda) | a relentless multi-use squeeze + system interlock | **the interlock**: one die builds the thing (a post), another opens what makes it score (the chain, the Kontor building); the same verb with different prerequisites sends players down different paths |
| **Great Western Trail** (Pfister) | a player-built track; tempo; win by several engines | **the private-building ladder** on the wharf (tier 1 → the Flip), buildings that sell actions at a price, and winning by several engines |
| **Orléans** (Stockhausen) | steerable variance (bag-building) | the **displays + the searchable cask stacks** as managed, not random, variance |
| **Agricola** (Rosenberg) | one rule → a whole decision economy; scarcity/blocking | scarce **vessels, slots and Ships**; the berth race; the specialists as asymmetric powers |
| **Wingspan** (Hargrave) | a compounding engine; a content spine; "one more turn" | a **content roster under one grammar** (Public Works · private buildings · Kontor buildings · specialists · beers) |
| **Obsession / Viticulture / Unconscious Mind** | theme-mechanism fusion; an approachable bridge | hopped-beer-as-cargo + the **legible scoring spine** |

**Differentiation:** "monks/houses brew beer" is occupied (*Ora et Labora*). Our distinct
ground is the **economic philosophy** — a brewer AND a merchant across a beer-trade network —
expressed through **the one die that is a cask, a post and a building**, and **the quality
count** that ties the brewery to the sea.

---

## 6. The current architecture — v8.2 “The Simple Core”

**In one breath.** Twelve dice per player: ten in the *personal supply*, one on the *warm
Gruit* in vessel 1, one standing at sea as the *starter post*. A die leaves the supply as a
**cask** (Brew), a **post** (a die on a segment of a lane, +1 each time a Ship sails through)
or a **Kontor building** (a tile of yours in a Kontor's slot, marked with a die that is the
delivery modifier — it starts at the slot's printed face, London 1 · Bergen 1 · Novgorod 2,
and climbs +1 per delivery there), and never returns; **the first empty
supply ends the game**. **The quality count**: the quality you may deliver anywhere = the
number of your dice at sea. **A delivery scores two dice**: the cask's and your building die
there; nothing else. Ships are shared, 2/3 berths, bound for a far Kontor or wild (named by
the first load); nobody owns one; a full Ship sails at once. The Harbor must commission, and
the commission lets you post on that Ship's lane; its alternate builds or raises at a Kontor.
Bruges by cart only: the yard (grain or a recipe, shrinking as it fills; Gruit's only door) or
the hall (three shelves of specialists with die floors 2 · 3 · 4: the cask's die buys a card
into that shelf's seat and stands on the shelf, scoring its pips at the end). The wharf's
private buildings are a Great Western Trail engine: four tiles per
player on any vacant slot, firing on visit, tier 2 by the Flip, printed points, no die; the
buildings sell actions at a price and never hand out goods. No kettle, no market track, no
bands. The end: pips at sea + docked dice + standing tiles + the fixed majority pairs + the
Flight on the recipe cards crossed to the right of the board.

**The shape, system by system:**

- **The turn** — Move to an adjacent station, then work it: **one printed action** (the
  Market's is two — *Gain 2 grain · Build*), plus what each flanking slot offers — a **Load**
  at the Ship docked there, a **Cart** at the **Bruges Road**, and your own private building
  firing. Any order, all optional except the Harbor's commission. **The shared core is one
  verb a station; the layers — the Works, the private tiles, the specialists, the post tiles,
  the prizes — are where the extra actions live.**
- **The goods** — grain is taken: the Market's Gain 2 grain, every Gruit tile's Gain 2 grain,
  the yard's grain prizes; every fee is grain, so grain builds the engine. Hops are earned and
  price only beer: **the dividend**, 1 hop as each cask of yours boards a Ship or is carted
  (your Kontorhaus pays it again; the Hop gardener doubles it), and the **Gain 2 hops** bonus;
  only the Hop merchant sells them (Gain 3 hops at the Market). A 1-hop beer pays for itself
  as it leaves; a 2- or 3-hop beer wants a Kontorhaus, a bonus tile or the merchant, so the sea
  and the hall are the doors to Mumme and Bock. 3 grain and 3 hops to start.
- **The die is the cask** — Brew sets a supply die at the start value; only a hand turns it
  (the Cellar's Age 3, the Age 2 bonus, the Cold Store / Lagering Cellar, the Braumeister);
  Ready at the quality; a Raise die at the wharf may push it to quality + 1; read as it boards
  against the port's die floor (London 2 · Bergen 3 · Novgorod 4); parked at delivery, never
  scoring again.
- **The sea** — four segments in a tree from Hamburg (W1 · W2 → London; E1 → Bergen; E1 · E2 →
  Novgorod; E1 shared), one post seat per colour on each and **one post tile**, dealt face up
  from eight: standing a post there pays that tile's **bonus action**, once, to each player who
  plants one. A segment is unlocked while any post stands on
  it; a lane is open to everyone while its branch is unlocked; your own chain opens a Kontor's
  building slots (1 on side A · 2 on side B).
- **The Kontore** — a delivery = cask die + building die; the die parks in the field (presence,
  the majority pair, the Flight); every building die there +1; the prize (London a Build with
  the fee waived · Bergen Cart 1 · Novgorod Raise die).
- **Bruges** — the Cart at the Cellar (and Bergen's prize); the yard's three zones (Best: a
  recipe fee-waived or 2 grain · Good: a recipe at its fee or 1 grain · OK: 1 grain); the
  hall's three shelves (Journeyman 2 · Master 3 · Alderman 4, on the cask's die): a present
  takes a specialist into that shelf's seat and stands the die on the shelf's place, pips at
  the end, the Bruges presence.
- **The wharf engine** — the **Bruges Road** on a random slot (shared, permanent: the cart's
  door); Public Works dealt three, washed away by the tide, never
  rebuilt; private buildings on vacant ground (Granary / Kaufhaus · Scriptorium / Brewers'
  Guildhall · Cold Store / Lagering Cellar · Counting House / Shipping Office), tier 1 for
  2 `G`, the Flip for 3 `G`, 2 / 4 ★. **Build is one verb with four doors** — a post, a Kontor
  building, a private tile, the Flip — at the Market, the *Build* bonus and London's prize.
- **Specialists** — eighteen singles in three shelf decks, dealt 3 / 4 a shelf each game;
  three seats, one per shelf; earned only at the hall: asymmetric powers, the engine's tech
  tree. The Alderman shelf pays powers, not end-counts (a contract a present · builds 1 `G`
  less · a post on any segment · a fourth vessel).
- **Contracts** — sixteen cards, two dealt face up to each player at setup: *what* (a beer or a
  quality floor) and *where* (a far Kontor, any far Kontor, the yard, the hall, or a spread),
  for ★ scored the moment a matching cask lands. One life, no currency between the goal and
  the payoff.
- **The clock and the score** — the first empty supply; round 24 backstops; the score is read
  off standing components.

The derivation, the designer's review and the implementation plan: `plan/V8-PLAN.md` §12–§13.

---

## 7. The tooling (how we verify)

- **`playtests/verify-v8.js`** — the v8 rule battery (64 checks in 16 groups). Runs in
  seconds; **always** after an engine change. The v5/v6 batteries live with their frozen
  builds under `archive/v5/playtests/` and `archive/v6/playtests/`.
- **`playtests/sim.js [N]`** — drives the *canonical* `play.html` engine headlessly (extracts
  the script, runs it in a Node `vm`, appends a bot in-scope — the engine's own in-page AI).
  The **robustness/pace gate**: 0 crashes / 0 deadlocks across 2–4p, the twelve-dice identity
  at every end, pace in the band. Prints USAGE before VALUE. Env hooks: `TIER=` · `PERSONAS=1`
  (the committed lanes) · `MIX=1` · `SUPPLY=` · `SRCN=` · `MUST=` · the MC budgets (override-only-if-set
  — a ruled default is never silently forced off).
- **`playtests/oracle.js [N]`** — the TURN ORACLE: the same harness, writing a per-turn trace
  of every game (what each work turn handed its seat, the dice and goods it spent, the ★ it
  moved, what befell the other seats on that clock) as JSON lines; env as `sim.js` plus
  `COUNTS=` · `SEED=` / `GOFF=` (shards) · `OUT=` · `PLAY=` (another build on the same metrics).
  **`playtests/oracle-study.js <dir>`** reads the shards, tolerant of partial corpora, and prints
  the turn study: little wins (each turn classed by its best event — big · small · petty ·
  empty), the ★ silence, the phases, the passive read (a rival's clock), the goal arcs
  (first-time milestones, the arcs completed a seat, the dead ends), the hall's shelves, the score
  by part, the paths to victory, the lanes; `--timeline=label:n:game` prints one game turn by
  turn. The designer calls it; its outputs stay out of the repo.
- **The v5-era probe fleet** (`strategy-probe.js` · `flow-probe.js` · the prize probes ·
  `ai-ladder.js` · `ai-render-smoke.js` · `aid-overflow.js`) lives at
  `archive/v5/playtests/`; the v8 equivalents re-derive when the designer calls the full
  validation, after the human table.
- **AI seats** (`AUTOMA.md`): Apprentice / Journeyman / Trader (greedy — robustness/pace
  oracles only) + **Guildmaster** (flat MC) / **Cellarmaster** (deep MC — pure search).
- **After any engine change:** bump the save `KEY`, run verify + a light sim smoke (the
  designer calls full batteries), publish to `main`. **Bulk runs FAN OUT** — shards as
  parallel background processes, analyzers tolerant of partial corpora.

---

## 8. Balance lessons carried forward (the distilled gold)

Hard-won across v0.9 → v7; they constrain every future change:

- **"No pure path wins."** Balance the *leans*, and measure them with **persona-committed
  bots**, never the greedy bot — which is a robustness/pace oracle only and systematically
  under-pilots deep/prestige lines.
- **Correct *friction* with a *structure* lever, not the *value* lever.** (A free local action
  was fixed by a structural throttle, not a fee; Novgorod was fixed by its gate, not its
  premium — the premium arm was a null.)
- **A beer's *total* brew cost is the WRONG lever for a deep-lane imbalance.** Raising the
  total re-breaks the top quality's reachability; shifting the **ratio** (grain ↔ hops) while
  holding the total is the safe move.
- **Majorities reward shipping WIDE** (presence = cask count) — "go for majorities" is a
  *volume* play. Big majorities tilt the game to the Kontore, so any prestige lane needs a
  matching curve to stay balanced.
- **When the incentive is backwards, find the rule that inverted it** — don't pile on relief
  valves. (Three patches once collapsed into one loop when benefit went back to delivery; the
  Flight once read "brewed" when the designer meant "shipped" — a bug, not a dial.)
- **A "sail full" rule structurally lengthens the game;** the clock is the dice, not the ship
  rules. **The supply size is THE pace dial** (measured repeatedly: ±1 die ≈ ±1 round).
- **Fixed turn order has a real first-player edge;** free opening placement + P1's natural
  turn-1 edge flatten it; compensation goods over-correct under strong play.
- **Content, not rules.** Depth belongs in placement/timing/interaction and a roster of
  content under one grammar — not in action complexity.
- **The pole test: a lane may run HOT; the failure is NEGATION.** Rebalance only when one
  pole *negates the value* of another. Judge by the negation test, not win-rate deltas alone.
- **Every ruling that touches a printed face lands on the manifest and the kit together** or
  the kit silently drifts (a printed minimum once lagged three versions).
- **Reward reachability beats reward size.** A dead lane is almost never underpaid — it is
  unreachable under the clock. Fix the door, not the prize.
- **Component-state discipline finds bad rules early.** The mechanics the constitution
  rejected (a once-per-player ★ nobody could track, an end-count pile, seat records for
  demand cards) were also the *design* failures.
- **Free goods make goods the only resource** — an efficiency game without a soul. A building
  sells an action at a price; it never hands out goods.
- **Depth is not dead when a greedy bot says so.** The "a specialist cannot keep three vessels
  full" finding was the bot failing, not the game: at skill the specialist shipped as many casks
  as anyone, and the gap that remained was the market's price, a structure since retired. Judge
  a lane only from a lane committed to it, at skill.

---

## 9. Change log

*Newest first. The v8 line in full; everything before v8.0 is in
`archive/records/DESIGN-HISTORY-pre-v8.md`.*

### v8.2 — The simple core: one action a station, the Bruges Road, post tiles, contracts (2026-09-21, designer-ruled — `KEY hanse-v82a`)

*"I struggle with the number of actions a player takes… I'd like to get back to 1 verb per
station, and to group like actions."* Then, through the reading: *"Build is build. It's ok to
have options but we don't need them separated."* · *"I don't know what raise die is. This is an
example of us speaking code."* · *"Remove load from the stations — you can load when you visit a
station adjacent to the ship you want to load."* · *"Let's add a permanent, randomly placed,
shared building for the Bruges Road."* · *"The goal is to simplify the shared core which gives
us space for the extra layers like malt kiln."* · *"Think contracts which are a mix of
specified quality levels, beer types, and destinations."*

**The ruling.** The shared core drops to **one printed action a station** — Market **Gain 2
grain · Build** · Brewhouse **Brew** · Harbor **Commission** (the must) **+ the maiden load** ·
Cellar **Age 3** — and the work that left the stations moves to the ground a player is standing
on. **Load is geography**: one Load at each flanking slot that holds a Ship, and only there
(the Market's *Load 1 any* retires; a face may still grant more — the Ropewalk, the Stevedore,
the *Load 1* bonus). **Cart is the Bruges Road**, a new shared tile dealt to a random slot
before the Works: work the station it flanks and you may cart; the tide never takes it and
nothing builds over it (the Cellar's *Cart 1* retires, the `CART_STATION` dial with it).
**Build is one verb with four doors** — a post · a Kontor building · a private tile · the Flip —
printed once, at the Market, the *Build* bonus and London's prize (*Build a Kontor* retires as
a second name, and the commission's free Post folds into it). **Raise die** retires as a printed
*name*: the faces print the `die-plus1` glyph with what it points at (*a die at sea +1*, *the
boarding cask +1*); every face that had it keeps it.

**The sea grows a reason to post.** Each segment carries a **post tile** — a disc printing one
bonus action, four dealt face up from eight at setup — and **standing a post there pays that
action**, once, to each player who plants one. The vocabulary is the cask bonuses' own (*Gain 2
grain · Gain 2 hops · Age 2 · Brew · Gain 1 recipe · Load 1 · Cart 1*), and **Post and Build are
deliberately not on it**: the designer's throttle — *"we can't hand out those dice like
candy"* — keeps dice to sea expensive. The starter post takes its tile at setup, so "W1 or E1?"
is a real opening choice. **The quality count stays as the connector** (weighed for removal in
the same conversation and kept), and so do the Kontor minimums.

**Contracts replace the hall's end-count.** Sixteen cards; **two dealt face up to each player**
at setup (a contract naming an undealt export is redrawn, so none is ever dead). Each prints
*what* (a beer, or a quality floor read on the beer's printed quality) and *where* (a far
Kontor, any far Kontor, the yard, the hall — or a spread: two Kontore, all three, one by sea
and one by road), and pays its ★ **the moment a matching cask lands**; the card turns face down.
One cask fills one contract, the higher where it matches two. The v7 post-mortem is the
design: that contract had **four lives** (claim → invitation → present → ladder) and the corpus
read 314 invitations earned against 14 spent, 111 of 120 ladders at rung 1, the deck dry in 16
games. One life, no currency in between, no display race that scales with throughput.

**The Alderman shelf becomes powers.** Four of its six never seated in the whole corpus — the
standing watch — because they were end-counts in a game whose goals now live on cards:
**Alderman** takes a contract on each present · **Burgher** builds for 1 `G` less · **Navigator**
posts on any segment of a lane, not only the lowest · **Steward** is a fourth vessel. The
Guildmaster and the Chronicler keep their ★ drips, which fire in play.

**Why.** The oracle's own number was the diagnosis: a work turn handed its seat **4.2–4.7
events from round one**, so the base turn was already as big as the built turn and the private
ladder had nowhere to grow (the Flip lands for 48% of 2p seats and tops at ~7★ of 30). Cutting
the station to one action gives the layers their runway: a turn starts small and the engine you
buy is what makes it big. The 2×2's ring reads as the work order for the first time — Market →
Brewhouse → Cellar → Harbor is *Gain goods → Brew → Age → Ship*, a clockwise lap — and the
decision moves from "which two things here, in what order" to "which way round the wharf".
Two merges were the board finally printing what the rules already said: *boards-or-carted* was
one trigger in §4 and §11 but two verbs on the board, and London's prize already called a post
a Build.

**Dials.** `WORKS_DEAL` 4 → **3** (the Road takes a slot, so the vacant ground holds where it
was) · `MAX_ROUND` 18 → **24** (turns do less, so the rounds go up; the designer's line — *"easier
and faster turns allows for the number of rounds to go up"*) · `SUPPLY_DICE` **10** unchanged
(12 dice a player; the pace dial stays parked until the table speaks).

**Components.** New: the **Bruges Road** (1 slot-sized tile), the **post tiles** (8 discs, 4
dealt), the **contract cards** (16). Changed: the Wharf board's four station cells, the sea
board's segment seats, the four Alderman faces.

**Surfaces.** `RULES.md` (rewritten whole; §12 contracts is new, §13 folds the buildings and
the specialists together) · `COMPONENTS.md` · `STYLE.md` (the Bruges Road, the post tile, the
contract and *fulfil* enter; retired: *primary / alternate*, *Raise die*, *Build a Kontor*, the
station Load, the station Cart, the commission's Post) · `DESIGN.md` §1/§6/§9/§10 ·
`rulebook.html` · `print.html` · `components.js` · `play.html` · `AUTOMA.md`.

### v8.1a — The specialists become the hall's shelves: three decks, three floors, three seats (2026-09-20, designer-ruled — `KEY hanse-v81a`)

**The ruling.** The hall is no longer a scoring door priced in invitations; it is where the
specialists are earned. The Bruges panel prints **three shelves** — **Journeyman · Master ·
Alderman** — each with a **die floor** (2 · 3 · 4) and its places (3 on side A · 4 on B). The
eighteen specialists are three shelf decks of six; each game deals 3 (A) · 4 (B) of each shelf
face up onto the Market & Stores board, the rest to the box; nothing refills a shelf. **A
present**: a carted cask (count permitting, exactly as the sea reads it) whose die meets a
shelf's floor takes one of that shelf's cards into the matching seat on the player board
(three seats, one per shelf) and **stands its die on the shelf's next place**. No ★ now: the
die scores its pips at the end like a die at sea, and it is the Bruges presence (the 4 / 2
pair). The player board grows a third seat. Retired: the ⚜ invitation and both its sinks (the
hall's fee, the hop trade), the neutral hall die and its climb, the 2 · 2 · 1 grain places,
the specialist display and the *Gain 1 specialist* bonus. **Bergen's prize is Cart 1** (a
cask to Bruges by road, count permitting, on the deliverer's clock). **The Kontorhaus pays the
dividend again** (1 hop more on your delivery there). The eighth cask bonus is **Gain 2
hops**. Hops stay a cube and a currency, the designer's line — *differentiate the two goods
as currency, not remove one*: they are earned by the dividend, the Kontorhaus, the bonus and
the Hop gardener, and sold only by the Hop merchant.

**The roster (18).** Journeyman (die 2): Braumeister · Cellarman · Carter · **Maltster** (the
Market's Gain 2 grain pays 3) · **Hop gardener** (the dividend pays 2) · **Cooper** (the
Cellar's Age 3 reads Age 4). Master (die 3): Stevedore · Lodesman · Shipmaster · Agent · **Hop
merchant** (Gain 3 hops instead of 2 grain at the Market) · **Brewer's mate** (the
Brewhouse's Brew may fill a second open vessel at its cost). Alderman (die 4): Guildmaster
(+2★ per present, the taking one included) · Chronicler (+1★ per cask delivered anywhere) ·
Alderman (+2★ per Kontor with 3+ dice of yours) · **Burgher** (+1★ per private tile standing)
· **Navigator** (+2★ per far Kontor whose branch your posts hold whole) · **Steward** (every
cask still in your vessels scores its die).

**Why.** Two reads agreed. The oracle's: the ⚜ economy was stillborn — the first invitation
landed with 3–5 rounds left at every count, 70–80% of the ⚜ earned died unspent, the trade
fired for 3–6% of seats, and the hall was the last arc anyone completed (presents 0.2 / 0.3 /
0.5 a seat at 2 / 3 / 4p, the first in round 10 / 10 / 8). The designer's: the specialists
arrived passively (Bergen's prize, a bonus tile) from a display nobody steered toward, and the
hall had no reason to exist beside the Kontors. The designer's direction — *take away the
specialists and bake them into the hall as a tech tree; the skills a deck dealt per shelf by
player count, so each game evolves with the skills in play; keep the hop tokens* — makes the
hall the engine's door. The die's face is the key to a shelf and the sea's count gates the
cart, so a brewer who ages is paid at the hall and a merchant who posts is paid at sea, and
the same cask can go either way: the brewer-vs-merchant lean, on one component.

**The build (five oracle passes; journeyman 2 / 3 / 4p, 60 games a count; the Guildmaster at
2 / 3p).** The pass landed here, the cart count-gated as the sea reads it: presents 1.1 / 1.0
/ 1.3 a seat (from 0.2 / 0.3 / 0.5), 79–89% of seats presenting, the first present in round
6 / 6 / 4 (from 10 / 10 / 8); shelves taken a seat Journeyman .8 / .7 / .8 · Master .2 / .2 /
.4 · Alderman .1 / .1 / .1; the sea unmoved — deliveries 1.1 / 1.2 / 1.5 (from 1.1 / 1.4 /
1.7), seats never delivering far 39 / 26 / 18% (from 39 / 21 / 12), sails 1.1 / 1.8 / 2.7,
Kontor builds 1.4 / 1.6 / 1.4; hops held at the end 1.8 / 1.9 / 2.5 (from 1.1 / 1.3 / 1.5);
rounds 13.3 / 12.3 / 11.5. The Guildmaster (2 / 3p): presents 0.8 / 1.0, the Alderman shelf
.3 / .3, the first present in round 12 / 9. The lanes (Trader): merchant 85 / 57 / 48% wins ·
specialist 76 / 38 / 28 · hall 44 / 38 / 26 · majority 59 / 36 / 28 · breadth 60 / 47 / 25 ·
builder 22 / 16 / 15 · brewer 4 / 2 / 5 (a harness defect, `AUTOMA.md`). Three relaxed gates
were tried and rejected — the die alone (no count), presence only, and count +1 at Bruges each
drained the sea (39 → 44–55% of seats never delivering far at 2–3p): **the count gate on the
cart is what sequences sea-before-hall**, and it stays. An Alderman climb (every die on the
top shelf +1 per present anywhere) was drafted and dropped — a neutral clock by another name,
untested at a table.

**Components.** The player board 7.65 → 9.7 in (a third seat; two per letter sheet still). The
Market & Stores board 11.2 → 13.2 in tall (three shelves of four wells replace the display of
four). The specialist tiles 10 → 18, each printing its shelf and the shelf's floor. Out of the
box: the hall die and the 16 ⚜ tokens. The Bruges panel: three shelf strips of places replace
the hall row and the die's seat.

**Surfaces.** `RULES.md` §1 · §3 · §4 · §8 · §9 · §10 · §13 · §15 · `COMPONENTS.md` ·
`STYLE.md` (shelf and floor enter; the eighteen by shelf; retired: Invitation / ⚜, the hall
die, the hop trade, the specialist display, Gain 1 specialist) · `AUTOMA.md` ·
`rulebook.html` (every section the ⚜ touched, and the beers table's export fees corrected to
grain — a v8.0j drift the re-read caught) · `print.html` (the Bruges panel, the Market &
Stores board, the player boards, the eighteen tiles, the aid, the checklist; the ⚜ tokens
gone) · `components.js` (the eighteen faces with shelf and floor, the Kontorhaus line, the Gain
2 hops bonus, the three-seat board) · `play.html` (engine, AI, render; KEY `hanse-v81a`) ·
`index.html` · `art/ICONS.md` · `art/PROMPTS.md` (eight portraits queued, stand-ins in use).

**Engine.** `SHELVES` (floors 2 · 3 · 4) · `HALL_DEAL` 3 / 4 · `SSLOTS` 3 · `KONTORHAUS_H` 1 ·
`TRADE_H` 3 (the Hop merchant) · `BURGHER_PTS` 1 · `NAVIGATOR_PTS` 2 · Bergen's prize `cart` ·
the `hops` cask bonus; gone: `TRADE_INV`, `HALL_DIE_START`, `HALL_PLACES_N`, `HALL_PRIZES`,
`START_INV`, `INV_PER_LANDING`, `IMP_DISPLAY`. The AI: `aiHallPick` (the card by its prior,
the die's pips and the seat's lane), `aiCartDoor` on it, `aiSpecVal` for eighteen, Bergen's
Cart through the pending pipeline and the human-gate. The battery: a shelves group replaces
the invitations group.

**Watches (§10).** The Alderman shelf's teeth (four of its six cards never seat in the
corpus); the Shipmaster and the Stevedore against Bergen's Cart; the Hop merchant's Market;
hops piling up at the end; the 4p cargo; Bergen's Cart on a rival's clock.

### v8.0j — Grain is taken, hops are earned: the dividend, the hop trade, every fee in grain (2026-09-13, designer-ruled — `KEY hanse-v80j`)

*"I'd like to consider a change where gaining grain is the result of different mechanics/actions
than hops… I want there to be a functional difference. Look at Lisboa for inspiration."* Then,
after the options and the pushback: *"Let's proceed with your recommendation. Dividend, market
trade, 1 [hop] per cask loaded, 3 for an invitation. Gruit to grain only."* — with the goods-and-
costs rebalance in scope: *"changes are not surgical, they are holistic and reverberate
throughout the rest of the game."*

**The ruling.** Grain is taken; hops are earned. The Market's primary is a choice: **Gain 2
grain**, or **the hop trade — pay 1 ⚜: Gain 3 hops**. **The dividend**: as each cask of yours
boards a Ship or is carted, take 1 hop (a second cask under the Stevedore pays a second; the
Victualling Yard doubles the tile's bonus, never the dividend). Every Gruit tile prints **Gain 2
grain**; the yard's zone prizes (2 / 1 / 1) and the hall's place prizes (2 · 2 · 1) pay grain.
**Every fee is grain**: the recipes Broyhan 1 · Keut 1 · Mumme 2 · Bock 3, a tier 1 2 `G`, the
Flip 3 `G` (the Hulk, the Bonded post and the Granary's surcharge already were). Hops price only
beer. Each Ship berth prints a *+1 hop* reminder; the Market board prints the trade, the Cellar
the dividend. The starting goods are 3 grain and **3 hops**. The retired term *Gain N goods · any
mix* leaves the registry; *Gain N grain* and *Gain N hops* replace it, with new icon sets queued
in `art/PROMPTS.md`.

**The four options explored** (the Lisboa read: one good bought, the other earned): (1) the split
Market — grain as the primary, hops only from the tiles; (2) a hop garden — a shared die that
climbs each round and pays hops to the posts beside it; (3) the commission pays hops — a Ship's
berths return hops to the commissioner; (4) the invitation trade. The designer's first call was
(3), *"1 hop per berth"*, with the must removed. The pushback: a commission paying hops floods
the merchant — the goods ledger (v8.0i, 3p greedy, per seat) read grain in 8.8 / out 8.5, hops
in 9.0 / out 7.3, and a commission payout of ~2.4 casks' worth a seat would have put ~5 goods
more into the hands that already ship; the hall would read the same as the yard once both pay
the same good; and the must, tied to the commission, was the other half of the same idea. The
recommendation carried: the dividend (hops follow the cask that leaves, so the merchant and the
hall brewer both earn them, one per die), the trade (a second use for the ⚜, in tension with
the hall), Gruit to grain. *"Loaded"* is read as boards-or-carted, the moment the cask bonus
already fires, so the table learns one trigger; the berth icon is the reminder. The must stays,
as a dial (`COMM_MUST`, sim hook `MUST=`), for the designer to flip.

**The oracle read, and the rebalance it forced.** Landed as ruled with the old fees, the greedy
oracle collapsed: 10.4 / 9.2 / 9.6 rounds at 2 / 3 / 4p (v8.0i: 16.8 / 14.4 / 14.6), no sail at
2p, Gruit brews doubled (8.4 a game at 2p against 3.8). The cause was structural, not the AI's
values: with hops die-bound before the first ⚜ (the cart dividend the only faucet) and grain
flooding from the Gruit loop (a die → 2 grain from the tile, 1–2 from the zone, 1 hop), the
Market's grain had no buyer, the greedy seats' breathing turn vanished, and every turn spent a
die. Sixteen variants ran, five games a count: the AI's cart bonus removed, start hops 3 and 4,
the dividend on boarding only, the yard's grain 1 / 1 / 0, a Gain 1 hop choice at the Market,
the brew grain costs raised. Start hops 3 alone brought the sea back (sails 1.2 / 2.0 / 2.2) but
not the pace; nothing else moved the rounds. **Every fee in grain** did: tier 1 2 `G`, the Flip
3 `G` (the surfaces already said "every fee is grain"; the engine and the tile faces had kept
1 `G` 1 `H` and 2 `G` 1 `H`). With hops pricing only beer and grain paying for the engine, the
oracle reads 13.2 / 12.8 / 12.0 rounds (100% in band), sails 0.8 / 2.0 / 4.2, Gruit brews 3.0 /
4.2 / 4.2, Market grain 4.4 a seat (v8.0i: 4.4), Mumme and Bock brewed again (0.3 / 0.7 a
seat), both goods tight at the end (1.2 `G` 1.4 `H` a seat held). The any-mix faucet is retired.

**Engine.** `DIVIDEND_H` 1 · `TRADE_INV` 1 / `TRADE_H` 3 · `COMM_MUST` 1 · `START_GOODS` 3 / 3 ·
`T1_FEE` 2 `G` · `FLIP_FEE` 3 `G` · `RECIPE_FEE` 1 / 1 / 2 / 3 `G`; `gainGrain` resolves every
grain gain without a prompt; the Market prompt offers the grain or the trade; `dividend` fires in
`loadCommit`, `yardLand` and `hallPresent`; the AI: `aiHopGap` · `aiTradeValue` · `aiGrainValue`
· `aiWantTrade` · `aiGruitBrewValue` (a Gruit brew priced as its cart, never as a delivery — the
die is the clock). **Surfaces:** `RULES.md` §1 · §3 · §7 · §10 · §11 · §12 · §13, the manifest,
the registry, `AUTOMA.md`, `play.html`, `components.js` (the Gruit tile, the recipe fees, the
berth reminder, the icon map), `print.html` (the Market and Cellar badges, the aid, the legend),
`rulebook.html`, `art/ICONS.md` and `art/PROMPTS.md` (the queued gain icons), `CLAUDE.md` §8.
**Gates:** verify 61/61 (a new group: the goods split); the sim clean at 2–4p, the twelve-dice
identity; the kit and the rulebook render clean, the rulebook fit-checked to the baseline.

### v8.0i — Four segments, the recipe card crosses the board, one aid sheet, the Bonded post after the climb (2026-09-13, designer-ruled — `KEY hanse-v80i`)

*"1. Fix the segments to be consistent. 2. Recipe cards no longer need a back side, when loaded
for the first time, that recipe card moves from the left side of the player board to the right
side. 3. Every player gets a player aid. I print the single page twice rather than having a
separate file with one on it. Keeping things simple. 4. Pick the most consistent and intuitive
path and bake it into the rules and play."* The four rulings that closed the full read of
2026-09-12: the rulebook, the kit and the registry swept against the rules master.

**Four segments.** The sea board has four segments (W1 · W2 → London; E1 → Bergen; E1 · E2 →
Novgorod; E1 shared) and always did: the board, the engine and the rulebook printed four while
the rules master, the manifest, the registry, this file and the kit's checklist said "five", the
plan's lane-step count. Every surface now says four.

**The recipe card is the Flight record.** The card is single-faced; the brewed face retires from
the kit with its "flip on your first brew" label, a rule no document held. Your recipe cards stand
to the left of your player board; the first time a cask of a beer boards a Ship or is carted, its
card crosses to the right, and the cards on your right are your Flight (3 / 4 / 5 → 3 / 6 / 10★).
The designer's "loaded" is read as the moment a cask leaves the brewery, boards or is carted:
Gruit only ever carts and the Flight's fifth beer needs it, and it is the moment the cask bonus
already fires, so the table learns one trigger. The read moves at one margin only: a cask aboard a
docked Ship at the end now counts (its card crossed), where the tile-under-die read did not. The
engine reads the Flight off the components (the beers delivered plus the beers aboard docked
Ships), no new state; the app splays the crossed cards to the right of the board. One consequence
ruled with it: the Brewers' Guildhall's "you hold every dealt recipe" left no card to cross, so
the Flip now hands over every dealt recipe you lack, free (`guildhallGrant`); the cards are literal
on the table.

**One aid sheet.** The kit's tri-fold sheet cuts into three aids; the manifest counted four. The
sheet stays one file, printed twice for four players; the checklist and the manifest say so.

**The Bonded post stands after the climb.** `RULES.md` §7 listed the Bonded Store's offer before
the lane's posts climb; the engine climbed first, so the new post stood at 1. The engine's order
is the ruling: every post enters at face 1, the Store's printed face stays true, and the sail
reads tide · the posts climb · the Store's offer · the casks deliver. The rules master, the
rulebook and the app's log now say it in that order.

**Closed in the same pass, from the full read.** The rulebook's gaps against the rules master
(London's prize names its kinds; the cart's "they do not stack"; side A's yard zones; the
commission's "when it can" and the displaced Ship's return to the deck; the wild and held-whole
Post cases; the cap of 6 on every Raise die and building die; the Ropewalk's once per load; the
Cooperage's full berth; the private tile's "no die"; the Cellarman's "never past Ready"; the
Alderman's Bruges rider; the Chronicler's "far"; the majorities' two leaders; the hall's size;
the empty stack; the Ship deck's mix; "about 15 turns" on the cover); the specialist display's
end-of-turn refill written into `RULES.md` §1; the registry drift in player copy: *port* for
Kontor (ten sites), *Build at a Kontor* for the printed *Build a Kontor* (seven), *neutral
Ships*, *hires*, *grade*, *house* for player, the app's *Gruit Ale* and *Hopped Beer*; and the
code's version-tagged comments, three never-called generators (the overland board, the building
back, the cover tile) and the dead brewed-face CSS. Surfaces: `RULES.md`
§1/§3/§4/§7/§8/§9/§10/§11/§12/§15 · `COMPONENTS.md` (the sea board, the player boards, the cask
tiles, the recipe cards, the aids) · `STYLE.md` §1/§2 · `rulebook.html` (§4–§14, fit-checked
headless) · `print.html` (the recipe sheets, the aid, the checklist) · `components.js`
(`recipeCard`, the player board's Flight ladder) · `play.html` (`flightStyles` · `inFlight` ·
`flightCross` · `guildhallGrant` · the sail log order · the tableau's Flight splay) · the battery
(59; the Flight and Guildhall checks re-cut) · the sim's header. Gates: verify 59/59; the sim clean
at 2–4p (0 crashes / 0 deadlocks, the twelve-dice identity; 9 of 9 greedy games ended on the
dice); the app driven headless to a game's end without an error.

### v8.0h — The building die's start face per Kontor (2026-09-12, designer-ruled — `KEY hanse-v80h`)

*"R1 — Use 1, 1, 2. The extra bump plus deliveries increases Novgorod over time."* The Kontor
building die no longer stands at 1 everywhere: it stands at **the slot's printed face** —
**London 1 · Bergen 1 · Novgorod 2** — and climbs +1 per delivery there and by Raise die as
before. The reasoning is the designer's: Novgorod already asks the most (a die of 4 to board,
posts on every segment to build) and its building should pay a little more from the first
delivery, with the climb compounding on top; London and Bergen stay where they were. It is a
structure lever, not a value lever — one printed number per slot on the sea board, read off the
component, no table to remember — and it lands as one fact on every surface: `RULES.md` §2/§3/§8,
the manifest's sea board row, the registry's Kontor building row, the rulebook (§9 and the panels'
lane lines), the kit (each building slot prints its start face beside the port's die floor), the
app's prompts, tooltips and help row, the card face (the die seat reads *a supply die stands here
at the slot's printed face*), the engine (`KB_START` beside `KONTOR_MIN`; `kbuildPick` seats the
die at `kbStart(k)`) and the AI (`aiKBuildValue` credits the extra pip). The battery checks the
three faces and seats a Novgorod building at 2 with the twelve-dice identity intact.

**Recorded, not ruled — the hall's payout, the designer's direction.** The payout stays cask die +
hall die. The designer is weighing a hall die that reads 4–10 rather than 1–6, and one that counts
*down* rather than up: an early present pays most, and over the game a player is drawn instead to
the Kontors they invested in; a hall delivery is always good, but an early one is likely a lower
cask unless a player builds their game around it — and then needs the others' posts to reach the
Kontor network that pays their investment. The engine's read (in chat, 2026-09-12): the arc
agrees with the *invest early* pull; a custom 4–10 die is print-and-play-unfriendly, and the same
fact fits the constitution better as **numbered places** (the hall's places print their value,
best first, first come first served — the neutral hall die retires); the ⚜ gate then makes the
first far delivery the key to the best place and sharpens the berth race; the scale wants
watching (Hopped 2 + a 10 place is 12★ against an early delivery's 3–5★); at 2p six places fill
early. The numbers and the form are the designer's; nothing built.

### The rename — Merchant Brewer of the Hanse (2026-09-12, designer-ruled; no rules change, no KEY bump)

*"The new title is the Merchant Brewer of the Hanse, or merchant brewer for short."* The title
names the player, not the building: v8's thesis is *a good brewer AND a good merchant*, and the
name now says so. **Merchant Brewer of the Hanse** on every surface that prints the title — the
rulebook's cover, running head and footer; the kit's masthead, the aid's header and the sheet
labels; the app's title; the landing page; the six documents' headers; the charter's §7; the
gatekeeper skill — with *Merchant Brewer* as the short form. Unchanged by design: the build name
*Brewer & Merchant* (a version name, not the title), the save-key prefix `hanse-`, the repository
and its Pages address, and the archived builds, which keep the name they were played under. The
studio's game record still carries the old title; the studio's tools expose no rename, so that is
the designer's own edit.

### The re-read after the re-cut — the registry drift closed (2026-09-08, designer-ruled — no `KEY` bump)

*"Make the revisions for the items you identified."* The first full read of the re-cut canon,
with the kit rendered headless and every face inspected, found the leftovers a surgical pass
leaves: the rulebook printed *BUILD* in capitals, said *raise* where the verb is *Raise die*,
called the Harbor's alternate *Build a Kontor building*, counted the visit in *stops* (the noun
`STYLE.md` §2 bans — and the registry's own *must* and *resolve* rows still used), said *whenever*
for a repeat, *score track* for the score ring, *neutral Ships* for shared ones, and *90 minutes*
where `DESIGN.md` said 45–60 at 2p; the app's Kontor tooltip still called the minimum *Q2* and
eight boarding reminders read *Q2+* where the gate is the die floor; the recipe cards printed
*wharf fee* for the registry's *fee*; the Kontor building tile's condition line ran under its die
seat, so a standing die hid the end of *a Ship bound here*. **Ruled under the rule of silence:**
the ban on *stop* stands and the noun is *action* in player copy (a visit offers up to six
actions); the length prints as one range on every surface, **45–90 minutes** (45–60 at 2p, up to
90 at 4p). Surfaces: `RULES.md` §2/§7/§12 · `STYLE.md` §1/§2 · `rulebook.html` (the hero, §4,
§5, §6, §8, §9, §10) · `play.html` (the tooltips and reminders) · `components.js` (the recipe
card, the Kontor tile) · `DESIGN.md` §1/§10. No rule changed: verify 59/59, the sim clean.

### The repo re-cut (2026-09-07, designer-ruled — no `KEY` bump)

*"Clean up Claude.md. It tells you how to get started and how to be a game designer… Any game
change history belongs in design.md and anything older than 8.0 belongs in the archive.
Design.md is the only change log that tells the story of how the game developed. None of that
should live in comments in the code, components, play, or any rulebook. Rules.md is where the
latest rules live and nothing else… Plans can go into a plan directory… Components.md is just
the components list… Keep style efficient… remove any commentary in the code that is also
captured in design.md and rules.md… Icons.md should be a small accounting of icons available
for the html files."*

The canon was re-cut so a session reads the whole game in less context and loses nothing
across a compaction. `CLAUDE.md` is the start-up and the designer's charter alone (the
overrides, the constitution, the read ladder, the ruling protocol, the doc map, the harness).
`RULES.md` is the pure v8 snapshot: the tunable marks, the cross-references and the
justifications left it. `COMPONENTS.md` is the list, with sizes and counts. `STYLE.md` is the
v8 registry alone. This file is the one story, with the state of play in §10 and a v8 glossary
in §11. The plans moved to `plan/` (`V8-PLAN.md`); everything before v8.0 to `archive/`: the
v6 plan beside its frozen build, the v7 plan and the pre-v8 design history, component body,
registry entries and the icon program's rounds under `archive/records/`. `art/ICONS.md` is an
accounting of the icon files; `art/PROMPTS.md` stays the art repository. The code's comments
(`play.html`, `components.js`, `print.html`, `nav.js`) now say what the code does and carry no
version, date or ruling; the stale banner that still called every far Kontor's minimum Q2 went
with them. No rule changed: verify 59/59, the sim clean.

### v8.0g — The designer's batch: deliver · Raise die · Ship, per-port die minimums, the slots (2026-09-07, designer-ruled — `KEY hanse-v80g`)

*"Deliver, raise die, ship. Carter sounds fine to me. Many of the items have already been ruled on. If I
don't comment, assume I am affirmatively confirming the assumptions… Per port minimums remain in the
game. London Q2+, Bergen Q3+, Novgorod Q4+. This means a hopped raised by 1 is Q3 and can go to Bruges
by cart, London, or Bergen… Building slots in Kontors — 1 for 2 player, 2 for 3/4 player… Each of the
Kontor bonuses is free."*

**The registry's three pairs, ruled.** *Deliver* is the one word for a cask arriving at its Kontor —
*land / landing / landed* retire from every surface (the v5 word returns; the score line, the tile
lines, the ⚜ rule, the Flight and the app's log all say *deliver*). *Raise die* is the one verb on the
one `die-plus1` glyph: the Malt Kiln, the Bonded Store and the Lagering Cellar *Raise die* a boarding
cask (cap quality + 1) exactly as the Harbor, the Counting House, the Shipping Office, the Guildhouse
and Novgorod's prize *Raise die* at sea (cap 6) — *lift* retires. *Ship* is the component's only name
in player copy — *hull* retires from the rules, the rulebook and the kit.

**Per-port minimums return, on the die.** Each far Kontor panel prints a **die floor — London 2 ·
Bergen 3 · Novgorod 4** ⚙ — read on the cask's die **as it boards**, after the slot's Raise die (a
Hopped at 2 boards for Bergen from a Malt Kiln's slot). The quality count still gates the beer's
printed quality; the port gates the die; Gruit never boards. A wild Ship's first cask may name only a
port its die meets, and the Shipmaster names an unfull wild Ship only a port every cask aboard meets.
This is the v5 *board* grammar back (`STYLE.md` §2: *the minimum reads the die here*) and it gives
Novgorod its identity without a market: the far Kontor wants a 4, so a Bock or a raised Mumme, and the
designer's stated intent is that Novgorod's dice end up worth more.

**The building slots: 1 on side A (2p), 2 on side B (3–4p)** (was 2 / 3). One builder per slot, one
per player per Kontor, the chain the only door — confirmed in the same breath: *sailing needs every
segment unlocked by anyone; building needs your own post on every segment.*

**Confirmed by the designer's rule of silence ("if I don't comment, I confirm"):** the plan's §13.7
defaults 1 (anyone may load an unlocked lane), 2 (the building die climbs +1 on any delivery, plus
Raise die), 3 (private buildings take no die), 5 (five segments, E1 shared), 7 (1 ⚜ per far delivery,
none from Bruges, start at 0), 9 (the Hulk has no gate), 10 (London any Build with the fee waived ·
Bergen a specialist · Novgorod a Raise die — *every Kontor prize is free*); the Carter's +1 at the
yard; the hall as framed (*each delivery there costs 1 ⚜ and arrives by cart* — revisited once the
core is ironed out). **Queued, the designer's direction:** *the building die's start face per Kontor*
— today every Kontor building's die stands at 1 and is the delivery modifier, +1 per delivery there,
its pips at the end; the designer wants Novgorod's to pay a little more once a player has set it up
(the lever is a per-Kontor start face; nothing turned yet). Engine: `KONTOR_MIN` per Kontor with
`kMin`, `canTake` reads `boardDie` against it, the wild naming filters by it, `kontorSlotsN` 1 / 2.
Surfaces: `RULES.md` §2/§4/§5/§7/§8/§9/§12 · `rulebook.html` §7 example, §8, §9, §10 (the panels print
the die floors) · `COMPONENTS.md` §0 · `STYLE.md` §2/§4c/§4f · `components.js` (the Kiln, the private
and Kontor tiles, the specialists, the player board) · `print.html` (the sea board's panels and slots,
the aid, the teach) · `README.md` · `index.html` · `CLAUDE.md` · `AUTOMA.md` · the battery (59) · the sim.

### v8.0f — Two wild Cogs at setup, and one action, one term (2026-09-07, designer-ruled — `KEY hanse-v80f`)

*"R1 — Start the game with 2 wild ships. Random placement at startup. R2 — remove source from the
lexicon. The action isn't source, it's gain goods. Default is two. This is a pattern I want to
really clean up throughout — remove situations where you use two terms for the same thing."*

**The docked hulls return.** The deck's two wild Cogs dock at setup on two random slots (a Ship may
stand over a Public Work — the tide is the tide), at every player count; the deck of 16 keeps the
wild Hulk and the display of 3 is dealt from it; the kit is unchanged. The wild face keeps the lane
read honest: the first cask names the port among the open lanes, so a pre-docked hull is a target
to brew toward and the berth race from move one, never a shortcut past the sea. The v5/v6 warm
start is now whole again in v8 terms — the warm Gruit (v8.0e) and the docked hulls.

**One action, one term.** The registry's law from today: an action has ONE printed name wherever
it appears. *Source* leaves the lexicon — the Market's primary prints **Gain 2 goods**, the cask
bonus's own words on the cask bonus's own `goods-2` glyph, so a new player meets the action once.
The same pattern, hunted: the bonus tiles and the building lines now print the station verb's
name — **Brew** (was *Brew 1* on the tile, *Brew once* on the Granary, Kaufhaus and Guildhall),
**Age 2** (was *Age +2* on the tile, *Age +2 more (Age 5)* on the Cold Store — stale since v8.0b
put the tile on any slot), **Load 1** (was *Load 1 more*), **Kontor building** (the aid had a
second row calling it a *Kontor tile*). A count rides the name; a verb with no count is one of the
thing. The rulebook's building table takes Title Case on its action names with the rest of the
kit. The spoken work order is *Gain goods → Brew → Age → Ship*. **Left for the designer, the
audit's open pairs:** *deliver / land* (the rulebook says a cask *lands*; the die is still the
*delivery modifier* and the score line reads *Delivered dice*) · *lift / Raise* — two verbs on one
`die-plus1` glyph (a building lifts a boarding cask past its quality; Raise turns a die at sea) ·
*hull / Ship* in prose. Engine: `SETUP_WILD` ⚙; `P_ACT_TXT` and the faces; the battery reads the
docked Cogs and the deck of 16. Surfaces: `RULES.md` §1/§2/§3/§5/§12 · `rulebook.html` §1/§2/§4/§5/§7/§8
· `COMPONENTS.md` (the Ship row, the board row, §0) · `STYLE.md` §2/§3/§4c/§4f · `components.js` (the
cask tiles, `STD_ACT`) · `print.html` (the station face, the teach, the aid, the checklist) ·
`README.md` · `CLAUDE.md` · `AUTOMA.md` · the battery (59) · the sim.

### v8.0e — The warm Gruit, and the points glyph (2026-09-07, designer-ruled — `KEY hanse-v80e`)

*"We also should start with a ready gruit with die on it."* The v5/v6 warm start returns in half:
**every player opens with a Ready Gruit in vessel 1 — its own die set at 1 on it, the top Gruit tile
under it.** The die is a **twelfth** per player, like the starter post's eleventh — never from the
supply; the supply keeps its ten and the kit goes to 48 dice. That accounting was measured, not
assumed. The first cut took the die from the ten (the pre-ruling read touched the round-18 ceiling
in a quarter of 2p/3p games, and a die spent at setup looked like the right direction); the sim
answered that the Gruit itself is the accelerator — its bonus goods and the yard's Best prize on turn
one make every seat spend faster — so taking a die as well double-dipped the clock:

| greedy sim, 6 games/count | 2p | 3p | 4p | in the 10–18 band |
|---|---|---|---|---|
| before the ruling (4 games) | 17.3 | 15.3 | 15.8 | 100% (a quarter on the ceiling at 2p/3p) |
| the Gruit's die from the ten | 13.2 | 10.7 (min 7) | 11.2 (min 7) | 83 / 67 / 83% |
| **the twelfth die (ruled)** | **14.8** | **13.7** | **13.8** | **100%, 13–18** |

Turn one can now cart a Gruit to the yard without spending a Brew — the first-round feel the v8
build lost with the warm start (its other half, the docked hulls, stays the designer's open question,
§10). Engine: `WARM_GRUIT` ⚙ in `freshState`; the identity reads twelve; the AI needs nothing new (a
Ready Gruit is carted by the standing cart logic). **The points glyph:** the private tiles print
their points as the **`star-2` / `star-4` glyph alone** (the plain-value star family the art round
14 landed), never a star beside a numeral. Surfaces: `RULES.md` §2 · `rulebook.html` §1/§4/§13 ·
`COMPONENTS.md` (the dice rows, §0) · `STYLE.md` §4f · `components.js` (`privateTile`, the player
board's dice line) · `print.html` (the checklist, the dice count) · `index.html` · the battery (59) ·
the sim (the twelve-dice identity).

### v8.0d — At cost (2026-09-07, designer-ruled — `KEY hanse-v80d`)

*"I'd like to shift away from so many free resource giveaways and replace them with discounted
or at-cost actions… 'pay 1 grain to brew' is a good action that can help me get a brew in without
having to wait until my next turn." — then, on the paper cut: "Don't change the gruit casks. You
can change the rest."* The grammar is Great Western Trail's: a building never hands you money, it
sells you an action at a price you choose to pay. **The four faces that handed out goods for
nothing but a visit or a sail now sell verbs.** The **Granary** reads *pay 1 `G`: Brew once* (a
full brew at its recipe cost plus the grain, with its search — the second brew a turn early,
bought); the **Kaufhaus** is that line plus *Cart 2*; the **Bonded Store** keeps its load lift
and, at the sail, lets *each shipper pay 1 `G`: Post on the Ship's lane* (a supply die at face 1
on the lowest segment they do not hold, boarding order; an off-turn shipper is asked through the
human-gate — the non-commissioner's door to the sea); the **Warehouse** stops paying goods at the
landing and *vouches*: *your quality count reads +1 for a Ship bound here* (a standing read like
the Customs House and the Lodesman; a wild Ship once its chit names the Kontor). The Warehouse
is now the brewer's Kontor tile — ship one grade higher there — beside the Kontorhaus (⚜, the
hall lane) and the Guildhouse (Raise, the pips). **Untouched, by ruling or by class:** Gruit's
sixteen *Gain 2 goods* tiles and the exports' bonus tiles (a die pays for them), the yard's and
the hall's goods prizes (a cask pays), Source 2 (the base action), the Carter's +1 (an asymmetric
power). Rejected on the way: *the Warehouse fires the landing cask's bonus again* — an off-turn
Brew/Build/Load resolved during a rival's sail, and a Load that could sail another Ship
mid-landing; the landing stays two dice and a rider that needs no decision. **Watches for the
table:** goods are scarcer (Source 2 and the die-paid prizes are the only faucets) — read whether
the export brews starve at 3–4p; the Bonded post is strong where a lane is long (Novgorod) and
dead where the shipper holds it whole; the Granary's surcharge makes a Hopped cost 2 `G` 1 `H`
off-station — the brewer lane reads whether the tempo earns it. Engine: `BREW_SUR` and
`BOND_FEE` (1 `G` ⚙ each); the brew flow carries a surcharge (`canBrewAt`); the sail pipeline
opens with the bond offers (`pendingBond` → `bondpost`, human-gated); `countAt` reads the
Warehouse; the AI prices the priced brew as a brew minus the fee, the bond post as a post minus
the fee under the last-dice rule, and takes the Warehouse when its count trails its recipes.
Surfaces: `RULES.md` §4/§7/§8/§12 · `rulebook.html` §7 example, §8, §9 · `COMPONENTS.md` §0, the
Works table, the Kontor tile row · `STYLE.md` §4f (the *pay X: Y* grammar) · `components.js` (four
faces) · `print.html` (the aid) · the battery (58) · the sim's counters (priced brews · Bonded
offers → posts).

**The app's action bar re-derived to the registry (2026-09-07, designer-flagged: *"remove all of the
extra nonsense"*).** A stop button had grown a station prefix and a reminder suffix (*[icon]
Market · Load 1 · any docked Ship*). It now prints exactly what the station face prints — the
verb's icon and its printed words (*Source 2 · Load 1 · Brew · Build · Commission · Build a
Kontor · Raise · Age 3 · Cart 1*, the private tile by name, a docked Ship as *Load 1 · Cog →
Bergen 1/2*); the reminders ride the tooltip (`STN_VERB` in `play.html`), and *stops* left the
player copy (`STYLE.md` §2 bans the noun). A view change: no `KEY` bump.

### v8.0c — Gain 2 (2026-09-07, designer-ruled — `KEY hanse-v80c`)

*"Granary T1 and Warehouse have a gain good plus 1 hop. This seems silly. Why not just make it
gain two?"* The fixed 1 `G` + 1 `H` pair was a carry-over from the plan's first cut (the Hop Garden
that grew into a Maltings), not a ruling; its only mechanical effect was to make the tile weaker
than *Gain 2 goods* by forbidding two hops, and its only printed effect was a two-icon plus-line
no other face uses. **Both faces now read *Gain 2 goods, any mix* on the `goods-2` glyph** — the
one goods grammar the cask tiles, the Kaufhaus, the Bonded Store, the yard and the hall already
speak. The brakes on a goods faucet are structural (the owner's visit at the flanked station,
move-adjacent cadence, the fee, the vacant slot, the cap of 8 per good), not the mix; an owner
steering it into hops to fund a Bock is the engine buying off the pinch, which is the Great
Western Trail ruling working. Watch: the Granary → Kaufhaus step is now *cart 2 + 2★* for
2 `G` 1 `H`, a smaller step than before; the table reads whether the Flip still earns its fee.
Engine: the Granary's stop and the Warehouse's landing line are the same 2-goods prompt the
Bonded Store uses (a landing on a rival's turn splits automatically off-turn); the dead
`pgoods11` kind retired. Surfaces: `RULES.md` §8/§12 · `rulebook.html` §7 example, §8 table,
§9 · `COMPONENTS.md` §0 · `components.js` (both faces) · `print.html` (the aid) · the battery.

*(The at-cost direction the designer gave the same day was ruled and landed as v8.0d, above.)*

### v8.0b — the free ground (2026-09-06, designer-ruled — `KEY hanse-v80b`)

The designer's first read of the v8.0 build ruled four things about the wharf's private
buildings, and asked for the app to show its choices. **(1) A private tile is not tied to a
station**: it stands on ANY of the 8 slots the player chooses and fires *On visit* — when its
owner works the station that slot flanks. The slot picks the station, not the tile's name (a
Cold Store beside the Market fires on Market visits); the one-per-station cap goes with it, so
two of your tiles may flank one station. **(2) Vacant ground only**: a tile never replaces a
Public Work (the +1 `G` replace door and its engine seam `REPLACE_EXTRA` are retired); a full
wharf has no ground until the tide clears a slot — the tide is now the only thing that opens
ground, which makes the sail a build event too. **(3) Four Public Works at every count** ⚙
(was 6 at 2–3p): four slots open from the start, so the first BUILD has ground on turn one
instead of waiting on the first sail. **(4) The Guildhall re-faced**: with the tile unbound
from the Brewhouse, "brew twice this visit" had no station to hang on; its line is now *On
visit: BREW once (a full brew, with its search)* — the same engine door as the station's
PRIMARY, fired wherever the tile stands, which is strictly the more flexible line. **The
app (`play.html`)**: every choice now glows on the board — the hand tiles and the standing
tier 1 when a BUILD opens, the vacant slots at placement, the Kontor set at a Kontor build,
the recipe cards in a brew, the display's specialists, the stacks in a search, the dice at a
RAISE, the yard and hall rows at a cart — and clicking the glowing piece is the same call the
button makes; the hand tiles are tappable at any time and flip to show their tier 2 face
(a view, never a rule). Surfaces: `RULES.md` §1/§3/§12 · `rulebook.html` §5/§8 ·
`COMPONENTS.md` §0 · `STYLE.md` §4f (*On visit* joins the trigger set) · `components.js`
(the tile prints *On visit*, no station name) · `print.html` (aid + checklist + sheet label)
· `verify-v8.js` (57/57, group 11 rewritten). **Same day, the casing rule (STYLE.md §4c
rule 4, designer-ruled): nothing prints in all caps** — action names Title Case wherever they
name the action, states sentence case, emphasis bold — landed on every player-facing surface
(the rules master, the rulebook, the aid, the faces, the app), and the full re-read that followed
closed the drift the surgical passes had left: the rulebook's "when you work its station", the
private-building tables still labelled by station (the designs are Granary · Scriptorium · Cold
Store · Counting House, not Market · Brewhouse · Cellar · Harbor), the engine's dead
second-brew remnant, the retired word *tray* on the Market & Stores board, and the docs' stale
instrument names and counts.

### v8.0 “Brewer & Merchant” (2026-09-06, designer-ruled — `KEY hanse-v80a`)

*"We are essentially making a new game."* The v7.0b oracle read and the designer's three-batch
review (`plan/V8-PLAN.md` §12) ruled that v7 never broke the overlap between the station actions
and the core loop, that free goods made goods the only resource, and that the optimizer's
instinct had cancelled depth (THE SECOND OVERRIDE, `CLAUDE.md` §1). v8 re-derives the game on
the kept turn: eleven dice and the personal supply; a new sea board where posts unlock
segments for everyone and your own chain from Hamburg opens a Kontor's building slots; Kontor
building tiles marked with a die that modifies every landing of yours there; the quality count
as the one gate; two-dice landings; the cart at the Cellar, the yard track and the hall die at
Bruges; invitations only from far landings; a Great Western Trail private-building engine with
printed points and no dice; wild Ships; no kettle, no Bourse, no contracts, no demands, no
ladders, no flags. The implementation plan (§13) was merged from two lenses and cross-checked
(43 corrections). v7 is not archived: "it was a bust." The rules: `RULES.md` v8.0. The engine:
`play.html` (the phases of §13.6). The rulebook and the kit landed the same day: `rulebook.html`
re-derived whole (four pages, fit-gated) and `print.html` cut as the v8.0 kit — the sea board on
its own double-sided sheet over the portolan chart (side B front, side A back), the Wharf's
re-printed station faces, the Market board without its contract shelf, the private tiles (tier 1
front / tier 2 back, printed ★), the twelve Kontor building tiles, the ⚜ tokens and the three
chits, the wild hulls, the eight-verb cask stacks, the ten specialists, the v8 tri-fold aid and
the manifest. The faces that still ride stand-in art are queued in `art/PROMPTS.md`.


**Before v8.0.** The v0.1 → v7.0b story — the wharf's opening, the Bourse and the Glut, the
tide, the four-hand Venture engine, the v6 voyage, the v7 ledger — is
`archive/records/DESIGN-HISTORY-pre-v8.md`, with the designer's decision records and studies
beside it. The frozen playable builds: v5.8 “Pay the Second” at `archive/v5/` and v6.5b “work
the station” at `archive/v6/`. v7.0b “The Guild” was ruled a bust and was not archived as a
build; its record is git history, `archive/records/V7-PLAN.md` and
`archive/records/GATEKEEPER-v70b.md`.

---

## 10. The state of play and the open watches

**Where the build stands (2026-09-21).** v8.2 on every surface: `RULES.md` (rewritten whole),
the manifest, the registry, `play.html` (KEY `hanse-v82a`), `components.js`, `print.html` (the
Bruges Road on the Works sheet, the eight post-tile discs, the sixteen contract cards, the
wharf board's four one-action stations, the aid) and `rulebook.html` (§5 the stations, §6 the
turn, §8 the Build's four doors, §9 the post tiles, §11 the Road and the contracts, §12 the
Alderman shelf's powers, §13 round 24). Gates (2026-09-21): **verify 70/70** (three new groups:
the Bruges Road · the contracts · one action a station); the sim clean at 2–4p (0 crashes / 0
deadlocks, the twelve-dice identity); a full 3p game driven through the real UI headless with no
page error; all three pages render clean headless. First read off the smoke (2–3 games a count,
the greedy tiers — a floor, never a verdict): rounds 11–13.5 with every game in the 10–18 band;
contracts filled **1.5 / 3.0 / 2.5 a game** for **6 / 13 / 10★**; carts 10–12 a game (the Road is
cheap in actions, as designed); presents 2.3–3.7; the hall's Journeyman shelf still takes nearly
all of them. The AI draws no contract from the Alderman yet (the card seats rarely at these
tiers).

**The full oracle (2026-09-13, designer-called, on v8.0j — the read behind v8.1a's shelves; kept
as the baseline the shelves are measured against).** The turn oracle (§7) traced 500 games a
count at the greedy tiers, 500 a count on the committed lanes, 250 mixed, 160 at the noisy
Apprentice, 15 a count at the Guildmaster, 6 at the Cellarmaster, and the v8.0i build on the
same metrics. **Little
wins:** a work turn hands its seat 4.2–4.7 events; 53–59% of turns end in a ★ or a lasting
piece, 30–34% in progress (a brew, aging, a load, a commission), 11–13% in goods alone (the
Market's rest turn), none empty; ★ move on half the turns; a seat's longest run of own turns
without ★ is 2–3 and only 3% of seats sit five dry (the Apprentice: 6–7% empty turns, 9–12%
five dry). Rounds 1–4 hand out lasting pieces (61–83% of turns: a tile, a post, a building, a
recipe, a card crossing) but little ★ (0.7–1.6 a turn); rounds 9+ hand out ★ (3+ a turn).
Against v8.0i the turns are denser (+1 event and +25–50% ★ a turn), the Market's share of turns
fell from 23% to 17%, the game runs three rounds shorter. **Goal arcs:** the first export brew,
the first tile and the yard's fee-waived recipe land by round 2 for everyone; the commission,
the post and a Kontor building by round 3–5 for 81–96% of seats (the E1 starter's chain hands
Bergen's building over at once); the Flight's third beer for 81–90% by round 8–9. The
differentiating arcs come late and to a minority: the Flip 48 / 63 / 84% (2 / 3 / 4p), a
specialist 55–78%, the hall 19–42%, Flight 4 31–52%, Flight 5 1–7%, the trade 3–6%. Seats
complete 3.8–4.8 of six arcs; winners' arc sets are diverse (11–22 distinct a count; at 4p the
winner tends to hold all six). **The sea is the late act:** first load round 6, first delivery
round 10 / 8 / 7 in games of 13.5 / 12.3 / 11.6 rounds; 38–45% of 2p seats (21–24% at 3p, 10–19%
at 4p) never deliver far; the first ⚜ arrives with 3–5 rounds left, so 70–80% of the ⚜ earned
die unspent and the hall and the trade barely fire. At 2p the wharf is a parking lot: 4.9 Ships
commissioned a game, 1.0 sails, 3.9★ of docked dice a seat at the end; the must is not the
cause (optional: 0.8 sails, 52% never deliver) nor the Hulk's third berth (Hulk at 2: +0.1
sails) — two seats load different hulls for different Kontors. Half the seats end with a Ready
cask in a vessel (v8.0i: a third). **The Guildmaster** (flat MC) delivers more (1.7–1.8 a seat,
8★), presents more (0.5–0.7), commissions 9–13 Ships a game, saves its big plays for the final
round (62–73% big turns; the lead changes in 20–33% of final rounds), and at 2p loiters — 17%
empty turns, 40% die turns, 27% of games to the round-18 backstop: with one rival the clock is
soft. The Cellarmaster (deep MC, a glance of six games a count) reads the same: 16 rounds at 2p
with a third of games on the backstop, 12–17% empty turns, 1.2 / 1.7 / 2.2 deliveries a seat,
9–12 Ships commissioned a game, the ⚜ held at the end 1.4–2.3, the final round its biggest
(54–67% big turns). **The lanes** (Trader): merchant 85 / 50 / 47% wins · specialist 65 / 41 / 29 · breadth
68 / 44 / 31 · majority 59 / 32 / 16 · hall 42 / 36 / 27 · builder 25 / 23 / 18 · brewer 6 / 7
/ 7; the brewer persona as coded farms Gruit (5 of 6 brews at 2p) and is a harness defect to
recode before it is read again; the builder's ladder tops at ~7★ of 30, a support lane. **The
score:** sea pips are the largest slice (31–33%), deliveries 16–19%, majorities 11%, the wharf
11–14%, the Flight 10–11%, the hall 3–8%.

**Gatekeeper review #5 (2026-09-14, on v8.0j; the review lives in chat).** Verdict: *not yet — a
conditional yes*: the best chassis the project has had, judged as a medium-heavy euro, and not
shelf-ready. Against review #4's six must-fixes: the dice clock, the Gruit lock and the one rules
document landed; the hall as a lane landed in part (a placeholder by the designer's word); the
invitation drain did not (three quarters of the ⚜ earned die unspent); no v8 build has met a
human table (the 37 studio playtests are all v0.10–v5.3b). The must-fixes it names, in order:
the human table at 2p and 4p; two players made to sail (a paid sail at the Harbor first, 1 grain
an empty berth); the ⚜ drained (after the sea); the seat edge read (greedy mirrors: the first
seat wins 63–68% at 2p, the second 41% and the first 13% at 4p — a table question, the display
and the Works its suspects); the weight said honestly (medium-heavy, or two systems folded);
the dividend given its sentence (the return cargo). Would elevate: the hall with teeth so the
brewer is a path; Novgorod made somebody's plan (11–13% of deliveries at every tier); the 4p
"touch every row" watch; the ladder's ceiling. The one change if only one lands: the 2p sail,
with the table as its gate.

**Next.** The designer's own table, carrying the 2p sea and the Alderman shelf as its
questions. The probe fleet re-derives from `archive/v5/playtests/` when called. **Never a
corpus before a human table.**

**Every number is a placeholder until the table.** The levers live in the engine's dials block
(`play.html`): `SUPPLY_DICE` 10 (THE pace dial) · `MAX_ROUND` 18 · `KONTOR_MIN` 2 / 3 / 4 ·
`KB_START` 1 / 1 / 2 · `kontorSlotsN` 1 / 2 · `WORKS_DEAL` 3 (the Bruges Road takes a slot first) · `SETUP_WILD` 2 · `START_GOODS` 3 `G` 3 `H` · `DIVIDEND_H` 1 · `KONTORHAUS_H` 1 · `TRADE_H` 3 (the Hop merchant) · `COMM_MUST` 1 · `SHELVES` (floors 2 / 3 / 4) · `HALL_DEAL`
3 / 4 · `SSLOTS` 3 · `GMASTER_PTS` 2 · `CHRON_PTS` 1 · `BURGHER_CUT` 1 `G` · `CONTRACT_DEAL` 2 · the sixteen contracts' ★ · `POST_TILE_POOL` (eight discs, four dealt) · `MAX_ROUND` 24 · `YARD_ZONES` · `YARD_GOODS` 2 / 1 / 1 · `BREW_SUR` and
`BOND_FEE` 1 `G` · the fees, all grain (Hulk 1 `G`; tier 1 2 `G`; the Flip 3 `G`; the recipe
fees) · the majority pairs · the Flight ladder 3 / 6 / 10 · the private points 2 / 4.

**Ruled defaults, confirmed by the designer's rule of silence** (v8.0g): anyone may load an
unlocked lane; the building die climbs +1 on any delivery there, plus any face's +1; private
buildings take no die; four segments, E1 shared; the Hulk has no gate; every Kontor prize is
free; the Carter's +1 at the yard; the hall's shelves as ruled (v8.1a: the cart count-gated as
the sea reads it, the die's face the key, no ★ at the present); and v8.2's: a Ship may dock over
the Bruges Road, a post tile pays every player who plants there (not only the first), a contract
is never refilled and never expires, one cask fills one contract (the higher where two match).

**Open rulings, queued by the designer:**

- None queued. The hall's payout (open since v8.0h) closed with v8.1a: the hall pays a
  specialist and the die's pips, never ★ on a neutral die.

**Watches for the designer's table (v8.2 first):**

- **Does the turn feel light enough — and does the engine still grow?** The whole ruling rests
  on one bet: a base turn of one action plus its slots leaves room for the layers (the Works,
  the private ladder, the specialists, the post tiles, the prizes) to make a turn big again. Read
  whether an early turn feels thin and a late turn feels earned, or whether both feel small.
- **The Bruges Road's slot.** It falls at random, so one station is the cart's station every
  game. Read whether that station becomes the hot corner (and whether a hull docked over the Road
  makes that slot the best ground on the board), and whether Gruit, the yard's recipes and the
  hall stay reachable when the Road falls far from a seat's walk. The smoke says carts are UP
  (10–12 a game): watch the sea against it — the levers are the contracts and the Kontor
  building, never the count.
- **Contracts.** 1.5–3 of the 4–8 dealt get filled in the greedy smoke. Read whether two face-up
  cards actually steer a human's beers and destinations from turn one, whether the spreads (two
  Kontore · all three · one by sea and one by road) are read as goals or as accidents, and
  whether the ★ (3–10) sit right beside a delivery's 3–8★. The levers, in order: the ★ values ·
  the deal of 2 · the mix of the sixteen.
- **The post tiles.** Standing a post now pays a bonus action. Read whether the first post is
  taken for the tile rather than the lane, whether the four dealt discs make the opening
  (W1 or E1?) a real choice, and whether posts now drain the supply too fast (the clock is the
  dice — `SUPPLY_DICE` 10 is still THE pace dial, and `MAX_ROUND` is now 24).
- **The Market's Build.** One action a lap now buys a post OR a Kontor building OR a tile OR the
  Flip. That is the game's lean, on one pick. Read whether it is the turn everyone wants (and
  whether the Market becomes a must-visit that flattens the walk), and whether the quality count
  still climbs fast enough for a Q4–5 beer to reach the sea.
- **The Alderman shelf's new powers** (a contract a present · builds 1 `G` less · a post on any
  segment · a fourth vessel). Four cards that never seated in the whole v8.1 corpus. Read whether
  a human now aims a die-4 cask at that shelf.
- **The 2p sea.** The oracle's first question for the table: two seats load different hulls for
  different Kontors, so 4.9 Ships dock and one sails a game, and 39% of seats never deliver
  far (unchanged by the shelves: the hall opens in round 6 now, the sea in round 8 still).
  Neither the must (optional is worse)
  nor the Hulk's third berth is the cause. The structure levers, in the order to try: a paid
  sail at the Harbor (a docked Ship carrying your cask sails now, 1 grain an empty berth — the
  same verb at a price, the berth race kept, a grain sink, no round upkeep) · fewer docked
  hulls at 2p (the display of 3 → 2, or side A with fewer slots) · the Cog sailing at one cask
  at 2p only (the berth race lost). At 3–4p the sea fills (1.8 / 2.8 sails a game). Two lines
  the greedy seats never fire — the Granary's pay-to-Brew, the Bonded Store's post — are read
  from the committed lanes and the table, never from the greedy average.
- **The hall's shelves** (v8.1a). The Journeyman shelf is the table's rung (a seat in .7–.8
  presents a game, 79–89% of seats); the Master shelf .2–.4; **the Alderman shelf .1 (the
  Guildmaster .3)** — Guildmaster · Chronicler · Alderman · Burgher never seat in the corpus,
  and the greedy tiers hold no die-4 cask for it. Read at the table whether a human aims a
  Mumme or an aged Keut at the top shelf; if the four end-scoring cards are dead there too,
  the candidate lines, in order: Guildmaster +2★ per card held · Chronicler +2★ per Kontor
  delivered at · Alderman +3★ per majority pair held · Burgher +1★ per tile and +2★ per Flip.
  Also: the Shipmaster (a Ship sails unfull) and the Stevedore (Load 2) against Bergen's Cart
  — thin in the corpus, both; whether a shelf dealt 3 at 2p runs out too early; the 4p cargo
  (presents 1.3 a seat with four cards a shelf); and Bergen's Cart on a rival's clock (a
  present resolved during another seat's sail — does it read at the table, or wait for the
  deliverer's next turn?).
- **The 2p clock.** The Guildmaster loiters at 2p (17% empty turns, 27% of games to the
  round-18 backstop): with one rival, deferral reads as free — the v7 finding, alive at 2p.
  Read whether a human pair stalls; the lever is what an idle turn costs (the tide, the rival's
  sail), never the backstop.
- **Is there more than one engine tile, and do the dice end the game?** The v7 read's two
  structural findings (one Venture face was the engine; 21 of 30 search-tier 2p games ended on
  the ceiling because deferral read as free). v8's answer is the supply clock and the ladder;
  the table confirms it.
- **The Public Works roster.** The filler seven (Malt Kiln ×2 · Customs House · Ropewalk ·
  Cooperage · Bonded Store · Victualling Yard) stand until the roster pass after the core; the
  Weigh House and the four Staple Houses sit out until then.
- **The registry audit** — one action, one term — is a standing gate: a new face never prints
  a second name for a standing action.
- **Legible goals and strategic arcs** — the designer's standing question (*"without legible
  goals or strategic arcs in the game, it can feel repetitive"*): the arc carriers now are the
  chain toward a Kontor building, the private ladder, the Flight and the hall's three shelves.
  The oracle's
  read: the universal arcs (the first tile, the yard's recipe, Bergen's building, a two-segment
  chain, now the Journeyman shelf) land by round 5–6 for nearly everyone and read as the game's
  grammar; the
  differentiating arcs (the Flip, the Master and Alderman shelves, Flight 4, Novgorod) land late and for
  a minority; winners' arc sets are diverse. The table decides whether the late arcs read as
  goals a player steers toward or as afterthoughts the clock cuts off.

---

## 11. Glossary

- **The Wharf** — the whole core area: the four stations + the 8 slots. **Station** — one of
  the four action spaces (Market · Brewhouse · Cellar · Harbor), each printing a primary and
  an alternate. **Slot** — one of the 8 perimeter spaces; seats a building and/or a Ship,
  never casks; each flanks a station (Market s1·s8 · Brewhouse s2·s3 · Harbor s6·s7 · Cellar
  s4·s5).
- **The quality die** — THE component: a cask (set at brew to the start value, aged to Ready,
  read as it boards, parked at delivery), a post, or a Kontor building marker. **The personal
  supply** — your unspent dice; the first empty supply sets the final round.
- **Cask** — a brewed beer on its tile, its die riding it. **Vessel** — an aging well on the
  player board. **Ready** — the die at the quality. **Cask bonus** — the tile's printed line,
  fired once as the cask boards or is carted. **Stack** — a beer's face-up tile supply; a Q2+
  Brew searches it.
- **Ship** — a shared tile bound for a far Kontor or wild: Cog 2 berths · Hulk 3; sails when
  full. **Berth** — one cask space. **Wild Ship** — named by the first load with a **Kontor
  chit**. **The berth race** — topping off a shared Ship sails everyone's cargo on your clock.
- **The sea board** — Hamburg, the cart road, the four segments (E1 shared), the four Kontor panels; side
  A (2p) / side B (3–4p). **Lane** — the branch of segments from Hamburg to a Kontor.
  **Segment** — one step of a lane, with a post seat per colour. **Post** — a die of yours at
  face 1 on a segment; +1 per Ship through. **Unlocked / open** — a segment with any post; a
  lane whose every segment is unlocked, open to all. **The chain** — your own posts on every
  segment of a branch. **Kontor building** — a tile of yours (Warehouse · Kontorhaus ·
  Guildhouse) in a Kontor's **building slot**, marked with the **building die** (the delivery
  modifier, +1 per delivery there). **The quality count** — your dice at sea: the quality you
  may deliver.
- **Kontor** — a trading post: Bruges (by cart), London, Bergen, Novgorod (by Ship). **The
  minimum** — a far Kontor's die floor, read on the die as the cask boards. **Deliver** — a
  cask resolves at its Kontor: cask die + your building die, park, the prize. **The
  field** — the panel's space for parked dice. **Presence** — your parked dice there. **The
  majority pair** — the two ★ values paid to the two leaders. **Prize** — London a Build with
  the fee waived · Bergen Cart 1 · Novgorod Raise die.
- **The cart** — the Cellar's alternate, and Bergen's prize: one Ready cask to Bruges by road.
  **The yard** — the grain door: places in three zones (Best · Good · OK); Gruit's only door.
  **The hall** — the guild of brewmasters: three **shelves** of specialists (Journeyman ·
  Master · Alderman), each with a **floor** (die 2 · 3 · 4), a deck of six dealt 3 / 4, and
  its places. **Present** — a carted cask whose die meets a shelf's floor takes a card into
  that shelf's seat; the die stands on the shelf's place and scores its pips at the end.
  **Place** — a printed die space on the yard or a shelf.
- **Public Work** — the brown, die-less shared family dealt at setup, passive on its slot's
  traffic, washed away by **the tide** (it departs with the Ship that sails from its slot).
  **Private building** — a tile of yours on any vacant slot, owner-only, no die, printed
  points 2 / 4; **tier 1 / tier 2**, tier 2 by **the Flip**; fires **On visit** at the station
  its slot flanks. **Build** — the one verb for a private building, a Flip or a Kontor
  building; three doors (the Brewhouse's alternate, the Build bonus, London's prize).
- **Raise die** — turn a die +1: at sea (cap 6) or a boarding cask at the wharf (cap quality +
  1). **Specialist** — a purple tile, earned at the hall, never bought; three seats, one per
  shelf. **Recipe** —
  a single-faced card, permission to brew; the exports print a fee; it crosses your board into
  the Flight. **The Flight** — the recipe cards to the right of your board, one per beer that
  has boarded or been carted, 3 / 4 / 5 → 3 / 6 / 10★. **Goods** — grain and hops, the only currency: grain is taken, hops are earned. **The dividend** — 1 hop as a cask of yours boards a Ship or is carted; the Kontorhaus pays it again. **Gain 2 hops** — the eighth cask bonus. **The Hop merchant** — the Master-shelf specialist who sells hops at the Market (Gain 3 hops instead of 2 grain). **★** — the scoring unit.
