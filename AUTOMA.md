# Automa / AI Opponents

*The current state of the AI seats in `play.html` and the harnesses that gate them. The
history lives in `DESIGN.md`; this doc describes what stands today.*

## The ladder — five tiers, live in `play.html`

Any seat may be human or AI, any mix, 2–4p. **No tier ever cheats on the economy** — no bonus
goods, no free dice; tiers differ only in decision quality.

| Tier | Engine | Character |
|---|---|---|
| **Apprentice** | greedy + decision noise, feature-blind | "a new player can win" |
| **Journeyman** | the full greedy skeleton | the solid operator |
| **Trader** | greedy + the scoring systems (the Flight push, the majority swing, endgame sense); carries the persona vocabulary | the strong heuristic |
| **Guildmaster** | **flat Monte Carlo** — enumerate the prompt's options, clone `(S,UI)`, determinize the decks, journeyman rollouts to game end, margin objective; budget `GUILD_MS` ⚙ 250 | the fast search oracle |
| **Cellarmaster** | **deep MC** — trader rollouts, determinized decks, **sequential halving** concentrating the budget on real contenders; `CELLAR_MS` ⚙ 1200 | the designer's arch-nemesis |

- **Objective = margin** (own score minus best rival's), never raw score — the anti-kingmaker
  rule for 3–4p search.
- **The MC pair samples every v8 prompt as a first-class option** (`AI_MC_SUBS`): the starter
  post, the move, the stops (a `must` commission is the only option while it stands), the
  brew, the load (the maiden load too), the commission, the post, the Kontor build, the
  private build and its slot, the Build's menu, the cart and its door, the Shipmaster's sail.

## What the seats know — the two loops

The greedy skeleton (inherited by every tier, and by the MC rollouts) is taught the v8 game
as two loops that need each other:

- **The quality count as a target.** A seat never brews a die its count cannot ship (one post
  away is a bet); a held recipe one above the count makes the next post worth more
  (`aiCountGap`). A Gruit is brewed for the yard's grain and the cart's dividend, never for the
  sea: `aiGruitBrewValue` prices a Gruit brew as its cart (the yard's next zone, the tile's
  grain, the dividend's hop when hops are short, the Flight), never as a delivery — the die is
  the clock, and a seat short of hops posts or builds sooner than it farms Gruit.
- **When to post vs brew.** `aiPostValue` prices a post as its pips to come (any Ship through
  the segment ticks it), the count it unlocks, the chain it completes toward an open building
  slot, and the lane it opens for the table — against the same die as a cask. The last dice of
  the supply are casks unless the post is worth more.
- **The mandatory commission** is priced whole (`aiCommValue`: the berths, the post it grants,
  the maiden load), damped once the wharf already holds three Ships; the Harbor's `must` stop
  is always resolved first.
- **The Kontor building** (`aiKBuildValue`): casks to deliver × the modifier, the pips, the slot's start face (Novgorod's 2), the
  count; the tile by the seat's lane (the Kontorhaus for a hop-short seat, the Guildhouse once
  dice stand at sea, else the Warehouse). **The +1** (`aiRaisePick`) turns the lowest die,
  building dice first.
- **The priced lines**: the Granary's brew is priced as a brew minus its grain
  (`aiPactValue`); the Bonded Store's post offer as a post against the same die as a cask,
  minus the fee, under the last-dice rule (`aiBondPost`); the Warehouse is the seat's Kontor building
  when its count trails its recipes (`aiKTile`).
- **The goods split.** Grain is a flow the seat tops up at the Market when a wanted recipe or
  fee is short of it (every fee is grain); hops arrive as the dividend and price only beer, so a
  load and a cart are each priced a hop higher
  (`aiLoadValue` · `aiCartValue`). **The Hop merchant's Market** (`aiTradeValue`) is taken
  when a brewable recipe is short of hops.
- **The brewer lane, recut** (2026-10-11): the committed brewer no longer farms Gruit (its Gruit tilt
  is gone; it brews UP, weighting a brew by its quality and taking the one-post-away bet), ages
  (the Cellar's Age and the Cold Store carry its tilt), posts when — and only when — its beers want
  the count, aims a high die at the hall's upper shelves (`aiHallPick`), wants the high recipes and
  the brewer's cards (Cellarman · Braumeister · Cooper · Steward). Read its lane only from
  `PERSONAS=1` at the trader tier, as every lane is read.
- **The post tiles** (2026-10-11): `aiPostValue` reads the segment's tile — the bonus action it
  pays rides the die's worth (0.6–2.5), so the seat chooses between segments by their tiles and
  the Bonded Store's priced post is weighed with its tile.
- **The harness hooks** (`playtests/sim.js`, override-only-if-set): `SUPPLY=` · `WORKS=` (the
  Public Works dealt) · `FLIGHT=0` (the ladder off) · `CPTS=` (the contracts' ★ scaled) ·
  `ENDRULE=first|second|last|lastcall` (the final-round rule) · `COG1=1` and `DISPLAY=n` (2p
  only: a one-cask Cog · a smaller display) · `PAYSAIL=1` (a paid sail after the maiden load, the
  seat paying whenever it can). The reads: posts by door (the Market · the *Post* bonus ·
  London · the Shipping Office · the Bonded Store), the Market's Build by option, the post tiles
  taken, dice spent a game, and **the racer** — whether the first supply to empty won.
- **The station map** (v8.2): one action a station — the Market's `source` plus its `build`
  (the one verb, four doors: a post · a Kontor building · a private tile · the Flip, valued as
  the best of them), the Brewhouse's `brew`, the Harbor's `comm` (the must, then the maiden
  load), the Cellar's `age`. **The cart and the load are SLOT stops**: `aiStationScore` prices a
  flanking hull's load and the **Bruges Road**'s cart into the move.
- **Contracts** (`aiContractValue`): a landing is worth its contract's ★ at 0.55 weight, read
  into `aiLoadValue` (per destination) and `aiCartValue` (the yard and the hall doors), so a
  seat steers its casks at the cards it holds.
- **The cart's door** (`aiCartDoor` · `aiHallPick`): the hall when the best card the cask's
  die reaches (its prior, `aiSpecVal`, plus the die's pips and the seat's lane) beats the
  yard's zone; a shippable export yields to the sea (two dice, a prize) unless the game is
  ending. **The yard's prize**: a recipe in the BEST/GOOD zones when one is wanted, else the
  goods. **Bergen's Cart** rides the same pick, on the deliverer's clock.
- **A wild Ship's port** (`aiWildPick`): the seat's own building die there, the majority
  swing, the prize. **The private ladder** (`aiPBuildValue`): the printed ★ plus the verb's
  uplift over the visits left, net of the fee; tier 2 needs the tier 1.
- Ageing is priced by the casks it makes READY this visit (the load's precondition), so a
  seat with maturing casks walks to the Cellar.

## Personas — the lanes the sims commit to (THE SECOND OVERRIDE)

`AI_PERSONAS = brewer · merchant · hall · majority · builder · specialist · breadth` ride the
Trader (and the GM's rollout seat). Each is a committed lean: the **brewer** casks first and
posts only when a recipe is stranded; the **merchant** posts and builds at the Kontore before
the third brew; the **hall** carts every cask that reaches a shelf; the **majority**
stacks one Kontor's field; the **builder** climbs the private ladder; the **specialist** fills
its three seats, the Alderman shelf first; **breadth** brews for the Flight.

**The law (CLAUDE.md §1):** a simulation or review that recommends simplification must first
show it is not measuring depth away. The sim seats the personas (`PERSONAS=1`, round-robin;
`MIX=1` one per seat at random) and **prints USAGE before VALUE**: every verb, tile,
specialist, building and prize reports how often it fired per game before any lane's win rate
is read. **No part may be judged dead unless a persona committed to it ran in the corpus**; a
recommendation to cut a part must cite the committed lane's result, never the greedy average.

## Harnesses & gates

- **`playtests/verify-v8.js`** — the rule battery (70 checks in 19 groups): identity and
  setup · the supply and the end · the quality count · the chain and the buildings · the
  mandatory commission · the post · lanes, loading, wild Ships, sailing · delivery = two dice ·
  Bruges and the yard · the hall's shelves · the prizes · the private ladder · the end and the
  score · Gruit, aging, no kettle · the AI never stalls · the goods split · the Bruges Road · the contracts · one action a
  station. Seconds, always.
- **`playtests/sim.js`** — the robustness/pace gate riding the engine's own `aiStep`: 0 crashes
  / 0 deadlocks across 2–4p, the twelve-dice identity at every end, the pace band, the trigger
  split, and the v8 usage counters (posts, Kontor builds, +1s, sails and wild ports,
  deliveries and the building-die share, ticks, carts by door and zone, the presents by
  shelf and the hall pips, private builds and flips, building stops, specialists seated and
  their share of wins, the
  cask bonuses fired, the Works fired, the count at the end, stranded casks, the sea pips'
  share of the score, docked pips, deliveries by Kontor); `PERSONAS=1` prints the lane report
  after the usage.
- **`playtests/oracle.js`** — the TURN ORACLE: the same harness writing a per-turn trace of
  every game (what each work turn handed its seat, the dice and goods it spent, the ★ it
  moved, what befell the other seats on that clock) as JSON lines, sharded by `SEED=` /
  `GOFF=` / `OUT=`; `PLAY=` traces another build on the same metrics.
  **`playtests/oracle-study.js <dir>`** reads the shards (partial corpora welcome) and prints
  the turn study: little wins, the ★ silence, the phases, the passive read, the goal arcs,
  the hall's shelves, the score by part, the paths to victory, the lanes; `--timeline=label:n:game`
  prints one game turn by turn. USAGE first, as the law asks; the designer calls it.
- **`playtests/render-check.js [pages]`** — loads `rulebook.html`, `print.html` and `play.html`
  in a headless Chromium and fails on any page error (the battery never loads the kit or the
  rulebook, and both have broken on one stray apostrophe). **`playtests/ui-game.js [n] [tier]`**
  drives one whole AI game through the real UI, render on. Both need `playwright-core` and a
  Chromium — `playtests/_browser.js` finds them (`PW_CORE=` · `PW_CHROME=`; its header says how
  to install one).
- **How the harness instruments the engine:** the drivers wrap engine functions by reassigning
  them inside the vm (`var __fooV2=foo; foo=function(){…}`); every wrapper saves the original
  under a name used nowhere else in the driver — a second wrapper saved under the same name
  calls itself forever. The Node-side report never sees the vm's symbols: a value it needs (the
  supply, a hook) is read from the env or carried out in the game's result record.
- **Standing rule:** the greedy tiers gate **robustness and pace**, never strategy or balance —
  they under-pilot deep lines by construction. Strategy reads = the MC tiers, the committed
  lanes, and the human table.

## Difficulty design principles

- **Never cheat on the economy.** Euro players forgive a weak bot, not a dishonest one.
- **Dials that degrade gracefully:** ε-noise and feature blindness (Apprentice) · persona lean
  (readable table personality) · MC budget (`GUILD_MS`/`CELLAR_MS`).
- **Mixed tables are free** — the engine is hotseat-sequential; nothing cares which seats are
  human; a prize or a placement that belongs to a human seat pauses the AI (the human-gate).

## Open (AI-only; none gates a rules read)

- **The brewer persona, recut (2026-10-11):** it brews up now (the Gruit tilt is gone) and wins
  11–40% on v8.2 at N=16 (100% of one 2p run — small N); its result is a lane read again, from
  `PERSONAS=1` only. The builder is the weak lane (0–25%, ★17–24) and the pure merchant is weak
  at 4p; neither is dead, and no value lever moves until the table has read them.
- **The Alderman shelf is the bots' blind spot:** the greedy tiers present there for 0.1 seats
  a game and the Guildmaster for 0.3; Guildmaster · Chronicler · Alderman · Burgher never seat.
  A committed Alderman lane (hold a die-4 cask for the shelf) is wanted before those cards are
  read as dead. Unchanged on v8.2 (0.0–0.1 presents a seat), so the AI never draws a contract
  from the Alderman's power either.
- Contracts: a seat values a landing by the contract it fills (`aiContractValue`) but plans no
  further back than the landing — at 1.5× the ★ (`CPTS=1.5`) the fill rate does not move. A
  look-ahead (brew the style the card names, aim the hull where it points) is wanted before
  the contracts' ★ are read from the sim.
- The 2p sea: two greedy seats load different hulls for different Kontors (v8.2: 7 Ships dock a
  game, 0.6–0.9 sail; 50–65% of seats never deliver far). The `PAYSAIL=1` prototype (a paid sail
  after the maiden load) wakes it ×3–4 at every count; the load and commission values want a
  read at a human table before any tuning corpus. The Guildmaster loitered at 2p on v8.0j (17%
  empty turns, 27% of games to the then round-18 ceiling): deferral reads as free with one rival.
- The GM's rollouts at 4p; sub-Guildmaster MC budget tiers; a blind-AI option — optional ideas.
- The physical automa deck (a card-driven tabletop bot) waits until the ⚙ numbers settle.
- `aiSpecVal`'s priors for the eight new cards (Maltster · Hop gardener · Cooper · Hop
  merchant · Brewer's mate · Burgher · Navigator · Steward) are first guesses; the Hop
  merchant's Market is never taken by the greedy tiers.
