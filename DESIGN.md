# Brewhouses of the Hanse — Design

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
|**Length**     |≈ 45–60 min at 2p · medium                                                          |
|**Genre**      |Medium euro · engine building · a shared action grid (the Wharf) + a private brewery + a sea board |
|**Weight**     |*Great Western Trail / Distilled* — not Lacerda                                     |
|**Theme**      |A merchant brewing house in the Hanseatic League, Hamburg, c. 1350                  |
|**Status**     |**v8.0g “Brewer & Merchant”** — live (`play.html`, KEY `hanse-v80g`). The shape: §6. The log: §9. The state of play and what comes next: §10 — the designer's own table first, then the oracle read; never a corpus before a human table. |

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
  ★ is earned, unspendable score.
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

## 6. The current architecture — v8.0 “Brewer & Merchant”

**In one breath.** Twelve dice per player: ten in the *personal supply*, one on the *warm
Gruit* in vessel 1, one standing at sea as the *starter post*. A die leaves the supply as a
**cask** (Brew), a **post** (a die on a segment of a lane, +1 each time a Ship sails through)
or a **Kontor building** (a tile of yours in a Kontor's slot, marked with a die that is the
delivery modifier and climbs +1 per delivery there), and never returns; **the first empty
supply ends the game**. **The quality count**: the quality you may deliver anywhere = the
number of your dice at sea. **A delivery scores two dice**: the cask's and your building die
there; nothing else. Ships are shared, 2/3 berths, bound for a far Kontor or wild (named by
the first load); nobody owns one; a full Ship sails at once. The Harbor must commission, and
the commission lets you post on that Ship's lane; its alternate builds or raises at a Kontor.
Bruges by cart only: the yard (goods or a recipe, shrinking as it fills; Gruit's only door) or
the hall (an ⚜ and a Q2+ cask: cask die + the hall die, which climbs). ⚜ come only from far
deliveries. The wharf's private buildings are a Great Western Trail engine: four tiles per
player on any vacant slot, firing on visit, tier 2 by the Flip, printed points, no die; the
buildings sell actions at a price and never hand out goods. No kettle, no market track, no
bands. The end: pips at sea + docked dice + standing tiles + the fixed majority pairs + the
Flight on beers delivered.

**The shape, system by system:**

- **The turn** — Move to an adjacent station, then work its whole counter: the primary, the
  alternate, a Load at each flanking slot, your own private building there; any order, all
  optional except the Harbor's commission.
- **The die is the cask** — Brew sets a supply die at the start value; only a hand turns it
  (the Cellar's Age 3, the Age 2 bonus, the Cold Store / Lagering Cellar, the Braumeister);
  Ready at the quality; a Raise die at the wharf may push it to quality + 1; read as it boards
  against the port's die floor (London 2 · Bergen 3 · Novgorod 4); parked at delivery, never
  scoring again.
- **The sea** — five segments in a tree from Hamburg (W1 · W2 → London; E1 → Bergen; E1 · E2 →
  Novgorod), one post seat per colour on each; a segment is unlocked while any post stands on
  it; a lane is open to everyone while its branch is unlocked; your own chain opens a Kontor's
  building slots (1 on side A · 2 on side B).
- **The Kontore** — a delivery = cask die + building die; the die parks in the field (presence,
  the majority pair, the Flight); every building die there +1; 1 ⚜; the prize (London a Build
  with the fee waived · Bergen a specialist · Novgorod Raise die).
- **Bruges** — the Cart at the Cellar; the yard's three zones (Best: a recipe fee-waived or 2
  goods · Good: a recipe at its fee or 1 good · OK: 1 good); the hall (1 ⚜ + Q2+: cask die +
  the hall die; 2 · 2 · 1 goods on the first places).
- **The wharf engine** — Public Works dealt four at setup, washed away by the tide, never
  rebuilt; private buildings on vacant ground (Granary / Kaufhaus · Scriptorium / Brewers'
  Guildhall · Cold Store / Lagering Cellar · Counting House / Shipping Office), tier 1 for
  1 `G` 1 `H`, the Flip for 2 `G` 1 `H`, 2 / 4 ★.
- **Specialists** — ten singles, two seats, earned only (Bergen's prize, the Gain 1 specialist
  bonus): asymmetric powers.
- **The clock and the score** — the first empty supply; round 18 backstops; the score is read
  off standing components.

The derivation, the designer's review and the implementation plan: `plan/V8-PLAN.md` §12–§13.

---

## 7. The tooling (how we verify)

- **`playtests/verify-v8.js`** — the v8 rule battery (59 checks in 15 groups). Runs in
  seconds; **always** after an engine change. The v5/v6 batteries live with their frozen
  builds under `archive/v5/playtests/` and `archive/v6/playtests/`.
- **`playtests/sim.js [N]`** — drives the *canonical* `play.html` engine headlessly (extracts
  the script, runs it in a Node `vm`, appends a bot in-scope — the engine's own in-page AI).
  The **robustness/pace gate**: 0 crashes / 0 deadlocks across 2–4p, the twelve-dice identity
  at every end, pace in the band. Prints USAGE before VALUE. Env hooks: `TIER=` · `PERSONAS=1`
  (the committed lanes) · `MIX=1` · `SUPPLY=` · `SRCN=` · the MC budgets (override-only-if-set
  — a ruled default is never silently forced off).
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

**Where the build stands (2026-09-07).** v8.0g on every surface: `RULES.md`, the manifest, the
registry, `play.html` (KEY `hanse-v80g`), `components.js`, `print.html` (the v8 kit: the sea
board, the re-faced tiles, the ⚜ tokens and chits, the tri-fold aid) and `rulebook.html`, all
re-derived on 2026-09-06/07. Gates: verify 59/59; the sim clean at 2–4p (0 crashes / 0
deadlocks, the twelve-dice identity), greedy pace ≈ 14–15 / 13–14 / 13–14 rounds, 100% in the
13–18 band. The art the new faces still lack is queued in `art/PROMPTS.md`.

**Next.** The designer's own table. Then the oracle read: re-derive the probe fleet from
`archive/v5/playtests/` when called. **Never a corpus before a human table.**

**Every number is a placeholder until the table.** The levers live in the engine's dials block
(`play.html`): `SUPPLY_DICE` 10 (THE pace dial) · `MAX_ROUND` 18 · `KONTOR_MIN` 2 / 3 / 4 ·
`kontorSlotsN` 1 / 2 · `WORKS_DEAL` 4 · `SETUP_WILD` 2 · `HALL_DIE_START` 2 · `HALL_PLACES_N`
6 / 8 · `HALL_PRIZES` 2 · 2 · 1 · `YARD_ZONES` · `YARD_GOODS` 2 / 1 / 1 · `BREW_SUR` and
`BOND_FEE` 1 `G` · the fees (Hulk 1 `G`; tier 1 1 `G` 1 `H`; the Flip 2 `G` 1 `H`; the recipe
fees) · the majority pairs · the Flight ladder 3 / 6 / 10 · the private points 2 / 4.

**Ruled defaults, confirmed by the designer's rule of silence** (v8.0g): anyone may load an
unlocked lane; the building die climbs +1 on any delivery there, plus Raise die; private
buildings take no die; five segments with E1 shared; 1 ⚜ per far delivery, none from Bruges,
start at 0; the Hulk has no gate; every Kontor prize is free; the Carter's +1 at the yard; the
hall as framed.

**Open rulings, queued by the designer:**

- **The building die's start face per Kontor.** Today every Kontor building's die stands at 1;
  the designer wants Novgorod's to pay a little more once its chain is built. The lever is a
  per-Kontor start face (say 1 · 1 · 2); read the Novgorod delivery count at the table first —
  the die floor of 4 already makes it the high-quality port.
- **The hall's payout** — *each delivery there costs 1 ⚜ and arrives by cart* stands as framed,
  to be revisited once the core is ironed out. The v7 read is the warning: priced wrong, the
  hall goes dead (in v7.0b PRESENT never beat DELIVER in 100+ matched landings).

**Watches for the designer's table:**

- **The die floors** (London 2 · Bergen 3 · Novgorod 4). How often a Malt Kiln or Bonded Store
  slot is chosen to make a floor; whether Bergen at 3 starves the beginner's port of Hopped
  (the Kiln is its door); whether Novgorod at 4 is reached before the end at 2p.
- **The at-cost faces.** Goods are scarcer now that Gain 2 goods and the die-paid prizes are
  the only faucets: do the export brews starve at 3–4p (the lever is `BREW_SUR`, never Gruit)?
  How often the Bonded post fires, and whether Novgorod's two-segment lane makes the Store a
  must-load slot. Whether the Warehouse's +1 makes Bergen (one segment) the Q3 dump (the lever
  is which Kontor tile carries the read, not the read).
- **The docked Cogs.** The first sail's round; whether the setup Cogs get named before the
  first commission; the Public Work under a setup Cog leaving on the first tide.
- **The warm Gruit.** The first-round feel: turn one carts a Gruit to the yard without a Brew.
- **The private ladder.** The Granary → Kaufhaus step is *Cart 2 + 2★* for 2 `G` 1 `H`; does
  the Flip still earn its fee?
- **The sea tempo.** The greedy seats fill Ships slowly (Hulks of three wait); the load and
  commission values want a human read before any tuning corpus.
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
  chain toward a Kontor building, the private ladder, the Flight and the hall.

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
- **The sea board** — Hamburg, the cart road, the five segments, the four Kontor panels; side
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
  cask resolves at its Kontor: cask die + your building die, park, 1 ⚜, the prize. **The
  field** — the panel's space for parked dice. **Presence** — your parked dice there. **The
  majority pair** — the two ★ values paid to the two leaders. **Prize** — London a Build with
  the fee waived · Bergen a specialist · Novgorod Raise die.
- **The cart** — the Cellar's alternate: one Ready cask to Bruges by road. **The yard** — the
  goods door: places in three zones (Best · Good · OK); Gruit's only door. **The hall** — the
  guild of brewmasters: a Q2+ cask and 1 ⚜; cask die + **the hall die** (neutral, starts at 2,
  +1 per present). **Place** — a printed die space on the yard or the hall. **Present** —
  enter the hall. **Invitation ⚜** — earned 1 per far delivery (+1 with a Kontorhaus), spent to
  present; no cap.
- **Public Work** — the brown, die-less shared family dealt at setup, passive on its slot's
  traffic, washed away by **the tide** (it departs with the Ship that sails from its slot).
  **Private building** — a tile of yours on any vacant slot, owner-only, no die, printed
  points 2 / 4; **tier 1 / tier 2**, tier 2 by **the Flip**; fires **On visit** at the station
  its slot flanks. **Build** — the one verb for a private building, a Flip or a Kontor
  building; three doors (the Brewhouse's alternate, the Build bonus, London's prize).
- **Raise die** — turn a die +1: at sea (cap 6) or a boarding cask at the wharf (cap quality +
  1). **Specialist** — a purple tile, earned free, never two of a kind; 2 seats. **Recipe** —
  permission to brew; the exports print a fee. **The Flight** — distinct beers delivered, 3 / 4
  / 5 → 3 / 6 / 10★. **Goods** — grain and hops, the only currency. **★** — the scoring unit.
