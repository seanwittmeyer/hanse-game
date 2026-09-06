# Automa / AI Opponents

*The current state of the AI seats in `play.html` and the harnesses that gate them (v8.0
"Brewer & Merchant"). History and per-version teaching notes live in `DESIGN.md` §9 and git
history; this doc describes what stands today.*

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
  brew, the load, the commission and its post, the Kontor build and the RAISE, the private
  build and its slot, London's build menu, the cart and its door, the Shipmaster's sail.

## What the seats know — the two loops

The greedy skeleton (inherited by every tier, and by the MC rollouts) is taught the v8 game
as two loops that need each other:

- **The quality count as a target.** A seat never brews a die its count cannot ship (one post
  away is a bet); a held recipe one above the count makes the next post worth more
  (`aiCountGap`). A Gruit is brewed for the yard's goods, never for the sea.
- **When to post vs brew.** `aiPostValue` prices a post as its pips to come (any Ship through
  the segment ticks it), the count it unlocks, the chain it completes toward an open building
  slot, and the lane it opens for the table — against the same die as a cask. The last dice of
  the supply are casks unless the post is worth more.
- **The mandatory commission** is priced whole (`aiCommValue`: the berths, the post it grants,
  the maiden load), damped once the wharf already holds three hulls; the Harbor's `must` stop
  is always resolved first.
- **The Kontor building** (`aiKBuildValue`): casks to deliver × the modifier, the pips, the
  count; the tile by the seat's lane (the Kontorhaus for the hall lane or an ⚜-poor seat, the
  Guildhouse once dice stand at sea, else the Warehouse). **RAISE** turns the lowest die,
  building dice first.
- **The cart's door** (`aiCartDoor`): the hall when cask die + the hall die (+ the
  Guildmaster) beats the yard's zone; a shippable export yields to the sea (two dice, an ⚜, a
  prize) unless the game is ending. **The yard's prize**: a recipe in the BEST/GOOD zones
  when one is wanted, else the goods.
- **A wild Ship's port** (`aiWildPick`): the seat's own building die there, the majority
  swing, the prize. **The private ladder** (`aiPBuildValue`): the printed ★ plus the verb's
  uplift over the visits left, net of the fee; tier 2 needs the tier 1.
- Ageing is priced by the casks it makes READY this visit (the load's precondition), so a
  seat with maturing casks walks to the Cellar.

## Personas — the lanes the sims commit to (THE SECOND OVERRIDE)

`AI_PERSONAS = brewer · merchant · hall · majority · builder · specialist · breadth` ride the
Trader (and the GM's rollout seat). Each is a committed lean: the **brewer** casks first and
posts only when a recipe is stranded; the **merchant** posts and builds at the Kontore before
the third brew; the **hall** presents every Q2+ cask it holds an ⚜ for; the **majority**
stacks one Kontor's field; the **builder** climbs the private ladder; the **specialist** takes
Bergen first and seats both; **breadth** brews for the Flight.

**The law (CLAUDE.md §1):** a simulation or review that recommends simplification must first
show it is not measuring depth away. The sim seats the personas (`PERSONAS=1`, round-robin;
`MIX=1` one per seat at random) and **prints USAGE before VALUE**: every verb, tile,
specialist, building and prize reports how often it fired per game before any lane's win rate
is read. **No part may be judged dead unless a persona committed to it ran in the corpus**; a
recommendation to cut a part must cite the committed lane's result, never the greedy average.

## Harnesses & gates

- **`playtests/verify-v8.js`** — the rule battery (57 checks in 15 groups): identity and
  setup · the supply and the end · the quality count · the chain and the buildings · the
  mandatory commission · the post · lanes, loading, wild Ships, sailing · landing = two dice ·
  Bruges · invitations · the prizes · the private ladder · the end and the score · Gruit,
  aging, no kettle · the AI never stalls. Seconds, always.
- **`playtests/sim.js`** — the robustness/pace gate riding the engine's own `aiStep`: 0 crashes
  / 0 deadlocks across 2–4p, the eleven-dice identity at every end, the pace band, the trigger
  split, and the v8 usage counters (posts, Kontor builds, RAISEs, sails and wild ports,
  landings and the building-die share, ticks, carts by door and zone, the hall die, ⚜,
  private builds and flips, building stops, specialists seated and their share of wins, the
  cask bonuses fired, the Works fired, the count at the end, stranded casks, the sea pips'
  share of the score, docked pips, landings by Kontor); `PERSONAS=1` prints the lane report
  after the usage.
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

- The sea tempo: the greedy seats still fill hulls slowly (Hulks of three wait); the load and
  commission values want a read at a human table before any tuning corpus.
- The GM's rollouts at 4p; sub-Guildmaster MC budget tiers; a blind-AI option — optional ideas.
- The physical automa deck (a card-driven tabletop bot) waits until the ⚙ numbers settle.
