# Brewhouses of the Hanse — Design (live build v8.0b “Brewer & Merchant”)

> The working design doc: **why the game is the way it is**, the **current architecture**,
> the **change log**, the **balance lessons** and the **open watches**. Operational rules
> live in `RULES.md` (clean rules, no history — this file carries the history); the
> physical manifest in `COMPONENTS.md`; the printed copy registry in `STYLE.md`.
>
> **This file was compacted twice (2026-06-16 · 2026-08-23).** The second pass reduced the
> pre-v5.0 change-log narrative to a digest and removed the retired study/playtest
> artifacts from the repo — **every full entry, record and corpus is preserved in git
> history.** Nothing is lost; this is the slim, current version.
>
> **Authorship:** all commits to this repo are authored as **Sean Wittmeyer**.

---

## 1. Snapshot

|               |                                                                                   |
|---------------|-----------------------------------------------------------------------------------|
|**Players**    |2–4                                                                                  |
|**Length**     |≈ 45–60 min at 2p · medium                                                          |
|**Genre**      |Medium euro · engine building · shared action grid (the Wharf) + private brewery    |
|**Weight**     |*Great Western Trail / Distilled* — not Lacerda                                     |
|**Theme**      |A merchant brewing house in the Hanseatic League, c. 1350                           |
|**Status**     |**v8.0b “Brewer & Merchant”** — live (`play.html`, KEY `hanse-v80c`; designer-ruled 2026-09-06 — the shape in §6, the derivation in `V8-PLAN.md` §12–§13, the log in §9; the designer's own table is next, then the oracle read — never a corpus before a human table). *The v5 line, kept as history:* **v5.7 “Plain Sail”** was the last v5 build (records `archive/records/V55-FOUR-HANDS.md` + `V54-THE-TIDE.md` + `V5-DECISIONS.md`); the v5 line in one breath: **v5.0** opened the wharf (census stacks · Manifests · primary/alternate stations), **v5.1** made buildings riders and specialists station superpowers, **v5.2** split the buildings into two families (shared PUBLIC WORKS · private dual-use VENTURES), and **v5.3** made the Public Works die-less setup furniture, gave every Venture face a public line, opened the ground to L1s — and put the **beer-value BOURSE** at the middle of the economy (delivery = die + track · bulk rise then score · brews crash their own price). **v5.3b** reprints the Tollhouse as the toll bench (a load there shifts any Bourse marker ±1). **v5.4** makes every Public Work ephemeral — the wharf is a tide that washes the furniture away and thins into bare ground for the Ventures. **v5.5** re-derives the Venture hand as **four themed tiles (brew · age · die · points)** and adds the **FLIP** — a standing L1 turns over to its own L2 in place, spending no hand tile — so four tiles can become four buildings that each reach L2. **v5.6** turns the Bourse into a **GLUT**: every marker opens at the top and a sail steps each beer aboard down one (never per cask); the only way up is a shift you build. Every **Kontor prize becomes “the thing OR ★”** and the consolation retires. **v5.7** cuts the **Manifests** — the Bourse is the demand layer, so the demand card was a duplicate that also broke the component-state line. Details: §9; watches: §10. |

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
  rolled. The managed-uncertainty seat is the *steerable* variance of the displays, the
  stacks and the Manifest deal (Orléans-lite), not randomness.
- **No cards-as-hand** — all cardlike content is tiles on the table (the one exception, the
  Venture hand, is public and identical for every house).
- **No money** — pre-modern barter: **goods (grain `G`, hops `H`) are the only currency;**
  reputation/standing is earned, unspendable score.
- **The component-state hard line (ruled 2026-07-12):** ALL game state is carried by
  physical components — no rule may require memory, a ledger, or app-side tracking.

## 4. Theme & who you are

c. 1350, the Hanse at its height; Hamburg was literally *"the brewhouse of the Hanse."* The
pivotal innovation is **hopped beer**, which (unlike perishable gruit ale) survives a sea voyage
— a preservable, shippable export. You run a **merchant brewing house**: source grain & hops,
brew, age, and push casks across the Baltic/North-Sea network to the great trading posts
(**kontore** — Bruges · London · Bergen · Novgorod) for value and majorities — and, in hall
mode, pour your finest at the guild's public **Tastings** for prestige. The deeper axis is
**reach vs reputation** (industrial Leffe vs Trappist Westvleteren), pulled back into the
14th century.

---

## 5. Design lineage & comps

The target depth and the lessons we steer by:

| Comp | Its soul | What we take |
|---|---|---|
| **Lisboa** (Lacerda) | a relentless multi-use squeeze + system interlock | the **cask squeeze** as the soul; the **living slots** as the interlock |
| **Great Western Trail** (Pfister) | a player-built track; tempo; win by several engines | the **dual-use Venture hand**; win by several engines |
| **Orléans** (Stockhausen) | steerable variance (bag-building) | the **displays + searchable stacks + Manifest deal** as managed, not random, variance |
| **Agricola** (Rosenberg) | one rule → a whole decision economy; scarcity/blocking | scarce **vessels/slots/ships** + clogged-vessel back-pressure; the guild-single specialists |
| **Wingspan** (Hargrave) | a compounding engine; a content spine; "one more turn" | a **content roster under one grammar** (works · ventures · specialists · beers) |
| **Maracaibo / Lisboa** | negative feedback priced into the economy | **the Bourse** — your own volume crashes your price; the market as the counterweight to a loose economy |
| **Obsession / Viticulture / Unconscious Mind** | theme-mechanism fusion; an approachable bridge | hopped-beer-as-cargo + the **legible scoring spine** |

**Differentiation:** "monks/houses brew beer" is occupied (*Ora et Labora*). Our distinct
ground is the **economic philosophy** — reach-vs-reputation across a beer-trade network —
expressed through the **dual-role cask die**, the **two building families** and the
**player-moved market**.

---

## 6. The current architecture (v8.0 “Brewer & Merchant” — the shape; the v5.7 body below stands as history)

**v8.0 in one breath (2026-09-06 — `RULES.md` is canonical; the derivation is `V8-PLAN.md`
§12–§13):** eleven dice, ten in the *personal supply* and one standing at sea as the *starter
post*; a die leaves the supply as a cask (BREW), a post (a die on a segment of a lane, +1 per
Ship sailing through) or a Kontor building (a tile of yours in a Kontor's slot, marked with a
die that is the delivery modifier and climbs +1 per landing there), and never returns; the
first empty supply ends the game. **The quality count**: the quality you may deliver anywhere =
the number of your dice at sea. **A landing scores two dice**: the cask's + your building die
there. Ships 2/3 berths per Kontor plus wild hulls named by the first load; nobody owns a hull;
sails when full; the Harbor must commission and the commission lets you post on that lane;
its alternate builds or raises at a Kontor. Bruges by cart only: the yard track (a recipe or
goods, shrinking as it fills; Gruit's only door) or the hall (an ⚜ + a Q2+ cask: cask die +
the hall die). ⚜ come only from far landings. The wharf's private buildings are a Great
Western Trail engine: four tiles per player, tier 2 on tier 1 by the FLIP, printed points 2/4,
no die. No kettle, no market track, no bands. The end: pips at sea + docked dice at pips +
standing tiles + fixed majority pairs + the Flight on beers landed.

*The v5.7 architecture, as it stood (history):*

Canonical detail in `RULES.md` / `COMPONENTS.md`; the shape:

- **The Wharf** — four stations ringed by 8 slots; move orthogonally, activate the **row or
  column**; sharing a station costs nothing. **Stations print a PRIMARY and an ALTERNATE:**
  the worker's own station fires its primary, the line's other station its alternate —
  Market **Source 3 / 1** ⚙ · Brewhouse **search the stack / top tile** · Cellar **Age 3 /
  1** ⚙ · Harbor **Commission** (the hull's printed fee 2/1/0 `G` by size + one free load)
  **/ Load 1 onto ANY docked Ship**. The line is read **LIVE** — a hull or Venture landing
  on a line slot mid-turn opens its stop this activation.
- **THE DIE IS THE CASK** — the whole lifecycle on one component: printed start value at
  brew (= quality − aging steps; Gruit starts Ready), age points turn it up (**never on its
  own**), **Ready at the quality**, load-side lifts push past it (cap 6), **gates read the
  die as it boards**, delivery parks it at the kontor — pips (+ the Bourse marker) = the
  banked ★, body = presence, majorities and the clock. 13 dice ⚙ per player, public — and
  **no die ever stands on a building.**
- **Slots hold a building and/or a ship — never casks.** A slot = the building and/or a
  **load of the ship** docked there (one Ready cask from YOUR vessels; its printed **load
  bonus** fires as it boards). Casks are private until aboard — the interaction is the
  **berth race**: topping off a hull sails everyone's cargo on your clock.
- **TWO building families — every face a modifier of its own slot; no building adds an
  action.** **PUBLIC WORKS** (brown, die-less furniture — and **THE TIDE**, v5.4): 3 (2p) / 4 (3–4p) ⚙
  stand from setup, the rest are the **bag**; **every one sails away with the Ship at its
  slot** (boxed, never recycled) and the bag re-furnishes at end of turn until it runs dry —
  so an overpowered tile burns out on the voyage it fuels and the **late wharf thins into
  bare ground the Ventures inherit**. Nobody builds one, nobody owns one, no die, no fee; passive on their slot's traffic (Kiln ×2
  die+1 · Tollhouse toll-bench Bourse ±1 · Customs −1 minimum · Ropewalk cross-quay load ·
  Cooperage +1 berth +1★/load · Weigh House 2 Manifest lines · Staple House ×4 matching-sail
  +2★ ⚙ · Bonded/Victualling ephemerals). **VENTURES** (private, the owner's colour ring,
  NO die — the only family players build): the identical **hand of 4 dual-use tiles, one
  per THEME — brew · age · die · points (v5.5)**, each tile carrying its L1 on one face and
  its own theme's L2 on the other (so "one side facing per theme" is the component, not a
  rule); **every face prints a PUBLIC line** (age +1/+2 · +1 good · Bourse ±1/±2 — a free
  stop for whoever activates the line) above the ringed **owner line** (the owner collects
  both). **THREE WAYS ON (v5.5):** play an **L1** onto any open slot — wharf full → it may
  replace a Public Work (boxed), never a rival's tile; **FLIP** a standing L1 of yours in
  place to its own L2, **spending no hand tile** (the engine-building door — four tiles can
  each reach L2 instead of collapsing into two); or **OVERBUILD** a second hand tile
  L2-side up onto your own L1 (that L1 boxed), which is how a *different* theme's L2 lands
  on ground you hold. Fees grain-only (L1 1 `G` · L2 2 `G` ⚙, the FLIP paying the L2 fee;
  London's prize waives). The pairs: **Mash Tun/Great Copper** (brew top tile → 2 goods + a
  full brew) · **Warehouse/Assay Loft** (Age 2 + load onto any hull → 2 `H` certifies the
  whole cellar) · **Rack House/Lagering Cellar** (swap 2 dice → die +1, cap 6) ·
  **Counting House/Staple Rights** (+1★/load → +2★/own cask sailed).
- **THE BOURSE — THE GLUT (v5.6).** One track (−1…+3 ⚙) **printed on the Destinations
  board**, a price marker per in-play beer except Gruit & Jopenbier, **every marker opening
  at the TOP (+3 ⚙)**. Delivery = **die + marker** (floor 0). **SCORE, THEN THE GLUT:** the
  casks are paid at the marker printed right now, and *then* **each beer TYPE that was
  aboard steps down ONE — never per cask** (the Lisboa rule: the event happened, move one;
  no counting at the table). **The brew crash retires** — a brew two turns before the sale
  was noise. **The only way UP is a shift**, and shifts belong to buildings and private
  Venture lines (+ Bergen's prize): holding a price up is an engine you build. Scarcity is
  where the game starts and every shipment spends it — first to a beer cashes the top, the
  fourth sells into the crater, and the beer nobody sailed is still worth +3.
- **EVERY PRIZE IS THE PORT'S THING *OR* ★ (v5.6)** — per cask, the owner's choice, in
  boarding order; **the 2-goods consolation is gone from the whole game**. A full bench, an
  empty hand, a shelf of every recipe: none of them punishes you, because the ★ was always
  on the table. **Novgorod pays +3★** ⚙ (was +2) — it offers no thing to choose against, so
  it must out-pay every other port's ★ option or Bergen simply dominates it.
- **Everything is earned, not bought** — recipes (Bruges' prize · the *Gain 1 recipe*
  bonus, at the `H` = Q−3 formula fee, paid at EVERY channel, Bruges included; the Q3s
  free), Ventures (London's prize fee-waived · the *Open 1 Venture* bonus), specialists
  (Bergen's prize free **per cask** — plus a Bourse shift ±1; no seat → 2 goods · the
  *Gain 1 specialist* bonus at the printed fee). The Market sells nothing; goods buy
  brews, commissions and fees. **The fee rides the ITEM; never fee-on-fee.**
- **MANIFESTS** — a 12-card ⚙ demand deck; every **non-Bruges** hull carries one (dealt as
  it enters the display; Bruges sails plain). Three generic lines per card (named starter ·
  quality tier · die face · combo → 1–4★); at sail each delivered cask may claim **one
  line it satisfies**, each line once per voyage; the card recycles pristine. The variable
  economy riding the very hull you race to fill.
- **The player board** — 3 vessel slots + 2 specialist seats, all open from the start; the
  recipe cards beside it carry the Flight (COLLECTED → COMPLETED on the beer's first
  LOAD). **Specialists are station superpowers** — 15 designs ⚙: the core five drips at
  max(2, n−1) copies + the ten guild singles; 2 seats — the squeeze is picking two of what
  THIS game shows.
- **Legible scoring** — deliveries (die + Bourse; **Novgorod +2★/die**) + the bank
  (Manifest claims · Cooperage wharfage · Staple premiums · 1★ bumps — commissions and
  builds bank NOTHING in play) + majorities (parked dice; 4/2/0 · 5/3/1 · 9/5/2 · 8/5/2 ⚙)
  + the Flight ((shipped−1)², min 3) + the printed end-lines (the Alderman).
  Tiebreak: vessel dice, then goods.
- **The clock — the quality dice alone:** the first **EMPTY TRAY** (a player's last die
  committed — parked, in a vessel, aboard an unfilled hull) sets the final round; dice
  never return, so the runway is public and countable (**13** ⚙; `PRES_POOL` = THE pace
  dial); MAX_ROUND 25 backstop. Sails end nothing. Pace target ~12–25 rounds.
- **TABLED (seams kept):** the Trade Roads expansion (`registerExpansion` spine intact) ·
  the v5.2 investor/maturity grammar (`bldgTick`/`bldgDepart` inert) · the RIDER_SCOPE dial
  (0 = print). *(The Tollhouse stamp's `loadopt` choice point was removed whole 2026-08-23 —
  an orphan seam nothing could reach, carrying live copy for a retired rule.)*

## 7. The tooling (how we verify)

- **`playtests/verify-v8.js`** — the v8 rule battery (57 checks in 15 groups). Runs in
  seconds; **always** after an engine change. The v5/v6 batteries live with their frozen
  builds under `archive/v5/playtests/` and `archive/v6/playtests/`.
- **`playtests/sim.js [N]`** — drives the *canonical* `play.html` engine headlessly
  (extracts the script, runs it in a Node `vm`, appends a bot in-scope — the engine's own
  in-page AI). The **robustness/pace gate**: 0 crashes / 0 deadlocks across 2–4p, pace in
  the 12–25 band. Env hooks: `TIER=` · `PERSONAS=1` (the PATHWAYS lane oracle) · `POOL=` ·
  dial hooks (override-only-if-set — a ruled default is never silently forced off).
- **The v5-era probe fleet** (`strategy-probe.js` · `flow-probe.js` · the prize probes ·
  `ai-ladder.js` · `ai-render-smoke.js` · `aid-overflow.js`) lives at
  `archive/v5/playtests/`; the v8 equivalents re-derive when the designer calls the full
  validation, after the human table.
- **AI seats** (`AUTOMA.md`): Apprentice / Journeyman / Trader (greedy — robustness/pace
  oracles only) + **Guildmaster** (flat MC; defaults to the designer's 'quality' persona
  at 2–3p) / **Cellarmaster** (deep MC — pure search). Gates: `ai-ladder.js` (every rung
  ≥60%; shard the MC rungs) + `ai-render-smoke.js` (full AI games through the real render
  layer) + `aid-overflow.js` (the player-aid fit).
- **After any engine change:** bump the save `KEY`, run verify + a light sim smoke (the
  designer calls full batteries), publish to `main`. **Bulk runs FAN OUT** — shards as
  parallel background processes, analyzers tolerant of partial corpora.

---

## 8. Balance lessons carried forward (the distilled gold)

Hard-won across v0.9→v5.2; they constrain every future change:

- **"No pure path wins."** Balance the *leans*, and measure them with **persona-committed
  bots**, never the greedy bot — which is a robustness/pace oracle only and systematically
  under-pilots deep/prestige lines.
- **Correct *friction* with a *structure* lever, not the *value* lever.** (v0.15: a free
  local Enshrine was fixed by a *structural* throttle, not a fee. v4.10: Novgorod was fixed
  by the gate, not the premium — the +3★ arm was a null.)
- **Bock *total* cost is the WRONG lever for the deep-lane imbalance.** Raising the total
  re-breaks Q5 reachability; shifting the **ratio** (grain↔hops) while holding the total is
  the safe move. Don't raise the **total**.
- **Majorities reward shipping WIDE** (presence = cask count) — "go for majorities" is a
  *volume* play. Big majorities tilt the game to the kontore, so any prestige lane needs a
  matching curve to stay balanced.
- **When the incentive is backwards, find the rule that inverted it** — don't pile on
  relief valves. (v0.16: three patches collapsed into one loop once benefit went back to
  delivery. v4.9d: the Flight read "brewed" when the designer meant "shipped" — a bug, not
  a dial.)
- **A "sail full" rule structurally lengthens the game;** the clock is the round-count
  lever, not the ship rules. Since v4.5 the clock is the dice pool alone — **the tray size
  is THE pace dial** (measured repeatedly: ±1 die ≈ ±1 round).
- **Fixed turn order has a real first-player edge;** free opening placement + P1's natural
  turn-1 edge flatten it; compensation goods over-correct under strong play.
- **Content, not rules.** Depth belongs in placement/timing/interaction and a roster of
  content under one grammar — not in action complexity (the v0.7 reel-in is the founding
  lesson).
- **The pole test: a lane may run HOT; the failure is NEGATION.** Rebalance only when one
  pole *negates the value* of another. Judge by the negation test, not win-rate deltas
  alone.
- **Every ruling that touches a printed face needs its `COMPONENTS.md` note** or the kit
  silently drifts (the v4.13 lesson — the printed Novgorod minimum lagged three letters).
- **Reward reachability beats reward size.** A dead lane is almost never underpaid — it is
  unreachable under the clock (Novgorod, the dead building shelf, the priced-shut v5.2
  ladder). Fix the door, not the prize.
- **Component-state discipline finds bad rules early.** The mechanics the hard line
  rejected (the shelf Hall's once-per-player ★, the Chronicler's end-count pile, seat
  records for Manifests) were also the *design* failures.

---

## 9. Change log

*Newest first. The v5 letters in detail; the pre-v5.0 record is a digest — every full
entry is preserved in git history (this file before 2026-08-23).*

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

**QUEUED — the at-cost actions pass (the designer's direction, 2026-09-07, not yet ruled):**
*"I'd like to shift away from so many free resource giveaways and replace them with discounted
or at-cost actions"* — Great Western Trail's grammar (discard a card for $2; hire for +$2), e.g.
*pay 1 grain: Brew* as a line that lets you brew now instead of next turn. The inventory of the
free faucets and a first cut of priced faces is in the session record; the ruling is the
designer's.

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
review (`V8-PLAN.md` §12) ruled that v7 never broke the overlap between the station actions
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

### v7.0b “Build Leaves the Counter” (2026-09-01, designer-ruled — `KEY hanse-v70b`)

*"Build can't be the market alt action. That is an action limited to delivery prizes
and cask bonuses."*

- **BUILD is not a station verb.** The Market's ALTERNATE reverts to **Source 1** ⚙
  (the v5.0 lesser-counter lineage; the dormant `ALT_SOURCE` dial wakes). Building is
  **earned**: the only two Venture doors are **London's prize** (the fee waived — the
  v5.6 prize grammar) and a cask's **BUILD load bonus** (at the printed face fee) —
  which restores the v5.8 channel law: *everything is earned; the wharf's counters
  sell nothing.*
- **BUILD takes the SAIL seat in the 8-verb pool** (seat 7; offsets and censuses
  stand — each Q3+ beer's SAIL tiles reprint as BUILD tiles). Sail-early keeps its
  ONE home at the Harbor's ALTERNATE, per the v7.0a one-verb-one-home law; the SAIL
  bonus, its picker and its AI seat retire from the engine whole.
- **Why the SAIL seat and not another:** the seat's lineage is the door verb — *Open 1
  Venture* (v5) → *Chart 1* (v6) → SAIL (v7.0) — and SAIL was the pool's only verb
  that duplicated a standing station ALTERNATE.
- Surfaces: `play.html` (STN_A · the pool · fireCaskAct's build case · the sailbq
  flow retired · AI verb/station values · the aid, tips and bar copy) ·
  `components.js` `CASK_POOL` · `print.html` (wharf cross · both aid faces · the
  checklist) · `rulebook.html` §5/§6/§8 · `RULES.md` §3/§4/§5 · `COMPONENTS.md`
  §0/§10 · `STYLE.md` §4e · `CLAUDE.md`/`V7-PLAN.md` §10.
- Gates: `verify-v7.js` **69/69** (3 new: the Market-ALT read · the pool seat · the
  bonus opens the priced build flow) · sim smoke 0 crashes / 0 deadlocks 2–4p ·
  render smoke clean · **KEY bump** `hanse-v70a` → `hanse-v70b`.

### v7.0a “The Second Kettle” (2026-08-31, designer-ruled — `KEY hanse-v70a`)

*"Allow two brews in one visit to the brewhouse station, simply increase the cost of the
second by 1 hop… I'd also simplify so brew always allows search… these conditional rules
(free here, pay there for the specialists for example, or top of deck vs search there)
are confusing to players."*

- **ONE BREW GRAMMAR — every brew is a full search.** The top-tile draw retires from
  every channel it lived on: the Brewhouse's alternate, the cask tiles' *Brew 1* load
  bonus, and the Mash Tun L1 (all reprint as full brews — search the stack, choose the
  tile, pay the recipe's cost). The search/top split was exactly the free-here-lesser-
  there conditionality the ruling strips.
- **THE SECOND KETTLE ⚙:** the Brewhouse's alternate seat prints **+1 `H`** on top of
  the recipe's cost — a second full brew per visit, priced. (The one-day "second
  runnings" name retired with the top-tile draw it described; *the double kettle*
  stays the station's nickname.)
- **THE SPECIALIST FEES RETIRE WHOLE** (`SPEC_FEE`, the tile's fee pill, the vestigial
  hire flow): Bergen's free prize is the ONE channel, so a printed fee was conditional
  noise. The recipe fee stands — it is UNIFORM (`H` = Q−3 at every channel, Bruges
  included), which is the simple kind.
- **The ruling overrides the station-verb panel's recommendation, eyes open** (the
  panel had said: keep, unpriced — §10). The A/B on the AS-RULED build (225 games/count
  ×2 arms, journeyman, 0 crashes): rounds, brews, winner totals and margins all
  ~flat — the fee barely changes bot behavior — but **ceiling-endings rise 2p
  28.9%→37.8% · 3p 17.3%→23.1% · 4p 7.6%→13.3%** (dice commit a beat slower, so more
  bot games reach the round-22 backstop; the same drift the panel measured on the old
  form). Caveats both ways: greedy bots can't VALUE the search the fee now buys (a
  human's second kettle chooses its tile), and the v5.8 watch already knew skilled 2p
  seats hold dice. **The human table reads it** (§11 Q6); the dial if 2p drags: the
  fee ⚙ (off, or +1G), or the 13-dice/MAX_ROUND pair — never a re-map (§10).
- Gates: `verify-v7.js` **66/66** (4 new: the surcharge paid · the +1H availability
  read · search-everywhere · the hire/fee retirement) · sim smoke 0 crashes /
  0 deadlocks 2–4p · render smoke clean · **KEY bump** `hanse-v70` → `hanse-v70a`.
- **The P5 rulebook pass landed the same day** (doc-only — no rules change, no KEY
  move): `rulebook.html` re-derived whole from `RULES.md` v7.0a — the same 4-page
  letter frame and teaching voice, every section re-cut to the v7 truth (the six-stop
  visit · the second kettle · the ledger · the lane gates · DELIVER vs PRESENT · the
  contract's four lives · the ladders · deal-8-no-bag · the down-only Bourse · round
  22), fit-gated per page headlessly (0 overflow) and audited by a 12-domain
  adversarial drift pass against `RULES.md`/the engine. Two RULES.md alignments fell
  out of the pass: the stale "kit/rulebook still archived" intro line, and the
  refresh-the-demand arm now states the engine's no-seated-dice gate.
- **The P5 print pass landed the same day** (kit-only — no rules change, no KEY move):
  `print.html` re-cut whole from the archived v6.5b kit to this build per
  `COMPONENTS.md` §0/§10 — new shared faces in `components.js` (the ⚜ contract letter ·
  the demand tile · ladder markers · flags), the sea/Tastings/house-marker families
  pruned, and one live drift closed (the app's hull tiles had still printed the v6
  Skute-era fees; the shared `HULL` re-cut fixed app and kit in one edit — the
  §2-charter's argument for wide passes, in one line). Gates: verify 66/66 · headless
  render smokes of BOTH pages clean · the aid fit-measured to its panel (0 overflow).

### v7.0 “The Guild” (2026-08-31, designer-called: “design a plan and build out a new version” — the plan and sheet live in `V7-PLAN.md`)
The v6 program (“The Voyage” — sea map, transit, the current, posts/factors) was ruled a
**regression in feel** at the 2026-08-31 human table (`V7-PLAN.md` §1: the sea ran
itself, no engine-building core, payoffs resolved off-turn, scores illegible). **P0:**
the complete v6.5b build froze playable at `archive/v6/`. **v7 re-derives from the TEN
DIRECTIVES** (`V7-PLAN.md` §4), keeping the praised v6.5 turn shape (MOVE adjacent ·
work the station) and the v5.8 wharf spine, and building the engine core the program
kept owing:
- **The VENTURES return** (the v5.5 themed cardboard whole) on the **LEDGER grammar**:
  BUILD is the Market's ALTERNATE at last (the starved-door lesson); an L1 stands a
  tray die at face 1 (one die per ground, for life) — **a RIVAL's use ticks it (cap 6,
  then 1★ per serve ⚙); the owner uses it free; the pips score to the owner at end**.
  A Venture's action serves the whole table, always on the user's own components; an
  L1 takes open ground (1 `G` ⚙) or replaces a Public Work (2 `G` ⚙).
- **The sea retires whole; sailing is instant and enacted again.** The development game
  re-homes to **per-player lane gates** (London ← your die parked at Bruges · Novgorod
  ← Bergen — your parked dice ARE the unlock) and the Kontor panel.
- **The second loop: contracts → ⚜ invitations → PRESENT at the halls → the majority
  LADDERS.** One card, four lives; every ⚜ spent at a Kontor makes its majority richer
  — the friction of loading sets the majorities' worth (D6), and the race is a marker
  the whole table watches.
- **The market goes DOWN ONLY** (D7): every up-shift retires except the Coper
  specialist ⚙; certification and presenting are the structural ways to sell without
  spending the price.
- **All 8 Public Works stand at setup, the bag retires** (D3) · **the Skute retires;
  the private flag and SAIL-now arrive** (D9) · the Brewhouse becomes the double kettle
  · load bonuses re-pool (LIFT · SAIL in; hire · venture-gain off the tiles, D10).
- The drafted sheet ran a **four-lens adversarial red team** before the build
  (constitution · deadlock · fidelity · rules-lawyer); the eleven accepted findings —
  the replace-build, the rival-only ledger, the outnumber lane gate, the Gruit-proof
  halls, the empty-hull displacement, the Cog/Hulk fee inversion (Cog free · Hulk 1 `G`
  ⚙), one claim per turn, the refresh prize arm, the demand market line, Novgorod's
  premium stated once — are recorded at `V7-PLAN.md` §10.11.
- **Same-day addenda (designer-called 2026-08-31):** (1) **THE CLERK'S RECAP** — at the
  start of your turn the app reads back everything that came to you between your turns
  (casks landed on rival clocks with their ★, the drip ★ named by their tracked bank
  buckets — staple · wharfage · Chronicler · ledger overflow · prizes · presence —
  goods, ledger ticks per Venture, ⚜ drawn/spent, cards picked at gated prizes), shown
  on the turn bar at MOVE and written to the log. An app-side legibility affordance of
  the MIRROR (§11 Q8): at the table you watched it happen — no component, no rule, no
  KEY bump; a per-seat baseline snapshot at your turn's end, diffed at your next start.
  (2) **The Specialist face reprints** (`components.js`): the title moves to the FOOT,
  just above the action line — the character's head stays clear; the cost pill keeps
  the top-right corner.
- The recap ran a **four-lens adversarial review** before landing (state/compat ·
  arithmetic · charter/UX · coverage holes; every finding independently re-verified
  against the running engine). Six confirmed findings, all fixed: the boot resume now
  recomputes the recap (every mid-game save lands exactly at the recap moment); a
  Venture RAISED or ADVANCED via London's prize on a rival clock reads back (the
  baseline carries face+level, not just the die); the ⚜ hand diffs by CONTENTS so a
  letter drawn and an ⚜ spent in one window BOTH read (the drawn card named); prize
  fees attach to their recipe line and goods deltas label as nets when mixed; the bar
  block is size-capped (the two-fixed-rows contract); a round-stamped baseline
  suppresses reads from a stale cached build.
- Gates RUN at the build (2026-08-31): `playtests/verify-v7.js` **62/62 PASS** (55 at
  the engine pass + 7 recap checks incl. the review-fix cases; stable over repeated
  runs) · `playtests/sim.js` smoke **0 crashes / 0 deadlocks** across 2–4p at
  journeyman AND both MC tiers · a full-render smoke (3 AI games through the real
  render layer) clean · rounds landed inside the 10–25 band at every count ·
  `KEY hanse-v70` · MAX_ROUND 22 ⚙. **Sims gate robustness only (the §7 process law) —
  every number is ⚙ until the human table reads it; the build's question list is
  `V7-PLAN.md` §11.**

### v5.8 “Pay the Second” (2026-08-24, designer-ruled — record `archive/records/V58-PAY-THE-SECOND.md`)
*"At all player counts, majorities pay out. For 2p, pay our second place. Only pay if
participated (0 if no dice in that Kontor). I'm surprised 2p didn't do this already."*

- **2p majorities now pay FIRST AND SECOND** (`MAJ_TIERS_2P` 1 → 2 ⚙); only 3rd is skipped.
  The tier triples are UNCHANGED on every printed face — this is the *number of places paid*,
  not the numbers.
- **The presence gate is now PRINTED.** *"No parked dice at a Kontor, no share of its
  majority"* was always the engine's behaviour (`majorityAwards` drops `pr=0` before ranking)
  but appeared on **no component and in no document** — a player could not read it off the
  table. That is the component-state line (ruled 2026-07-12) and it had been quietly broken
  for as long as majorities have existed. Now on the aid, in the rulebook, and in `RULES.md`.
- **Two printed-surface errors found by the touch list and corrected:** the rulebook's
  2-player sidebar read *"Majorities pay first and third place only"* — wrong twice (the
  engine paid **first only**; "first and third" describes nothing) — and the Destinations
  board's short note still printed **Novgorod +2★** when v5.6 ruled it to **+3★**. The
  long-form note had been updated; the short string is the one that renders. **Any board
  proofed between v5.6 and v5.8 carries the wrong premium** (`COMPONENTS.md` §10).
- **Why:** the 1,850-game MC oracle showed the 2p runaway is the *winner-take-all majority*,
  not the market — 26★ (4+5+9+8) decided by an 18% cask edge with no consolation.
- **DELIVERED, measured on the live build (200 games/count, journeyman):** 2p margin
  **22.1 → 19.4★**, blowouts >25★ **38.0% → 32.5%**, close games ≤10★ **27.2% → 33.5%**;
  3p/4p unmoved (14.8 / 12.6 — they already paid a second place), pace and band unchanged
  (15.3 / 14.6 / 13.7, band 84/89/86%). Winner totals rise **78.3 → 84.3** at 2p: the pool
  is bigger, not redistributed. **The cleanest signal is the decomposition — the majority's
  share of the 2p margin more than HALVED, 8.42★ → 3.9★**, and second place now collects
  15.5★ of a 34.9★ pool where it used to collect ~7 of 22.3. *Note the headline margin fell
  less than the 250-game arm predicted (that arm read 21.1 → 16.5 against its own baseline);
  the bucket read is the apples-to-apples one and it is unambiguous.*
- **Deliberately NOT taken (yet):** the re-tiering that pairs with it (London/Bergen 9/5/2,
  Bruges 5/4/2). At guildmaster the pair reaches **25.9★** where this half alone reaches 30.4
  — but that is a second ruling, and the designer took the easy half first.
- Gates: verify **386/386** (new §14pre battery — the second place, the presence gate at 2/3/4p,
  a Kontor nobody sailed to, and the tie split) · sim clean · render smoke PASS · aid ALL FIT ·
  `KEY hanse-v58`.

### v5.7 “Plain Sail” (2026-08-23, designer-ruled — record `archive/records/V57-PLAIN-SAIL.md`)
*"Ditch the manifests for now."*

**The letter that didn't feel right, and why.** The original Letter 4 proposed three ways to
make Manifests into goals — and two of them added *more* Manifest machinery (claim markers, an
all-lines-satisfied condition) to a layer the designer had already called **bolted on**. The
letter was trying to fix the card instead of asking what job it was doing.

**Then v5.6 made the question answerable.** Count the systems answering *"what is this cask
worth?"*: the **die** · the **port premium** · the **Bourse marker** · the **Manifest**. Before
the Glut the Bourse barely moved (end-track 0.4–1.1, and a ratchet), so the Manifest was the
only live variable demand in the game. **After the Glut the Bourse opens at +3, every sail
moves it, and it is printed on a board everyone reads.** The Bourse does the Manifest's job,
better, publicly, with nothing to remember.

So the Manifest was the **duplicate** — and it was the duplicate that had **no physical claim
marker** (a confirmed component-state violation: three lines each claimable once per voyage,
tracked in players' heads), resolved as a **post-sail rebate** rather than a plan, and paid
roughly **8%** of a winning score. Retired whole; git history holds the cards.

**Two dependencies had to be re-derived** — neither is a free subtraction:
- **The Weigh House** (its entire face was *"claim 2 Manifest lines"*) becomes **"On sail:
  this cargo does NOT glut."** It certifies the shipment so the market does not absorb it —
  the only way to sell without spending the price. Thematically exact for a weigh house, costs
  no new component, and it lands precisely where §10 said the game was short (up-shifts
  running 4.3–5.0 against 9.2–15.0 glut steps). It is also the tool the specialist lane needs.
- **The Chronicler** (+2★ per claim) becomes **+1★ per delivered cask** ⚙. Same job — a
  scoring specialist paid per shipment — on a trigger that still exists.
- **Hall mode's ⚜ faucet** re-homes from the claim to the **voyage** (the first cask you
  deliver on a sail).

- Engine: the whole `MANIFESTS` block, `manDealTo`/`manClaim`/`manMatches`/`manPick`/
  `manLine*`/`aiManBonus`, the `pendingMan` queue, the `man` prompt and its human-gate/actor
  entries all removed; `S.manifestDeck` gone from the save shape; `CHRON_PTS` added and paid
  inside `deliverCask`; the Weigh House's `certified` flag skips the glut in `sailShip`.
  Kit: `MANIFESTS_P`, `manifestTile`, `manLineFace` and the `.mftile` CSS removed;
  `print.html` drops the card sheet, the deck well and the checklist row. KEY `hanse-v57`.
- Gates: verify **378/378** (§21 retired whole; the Weigh House battery re-derived to the
  certification, plus a check that **no Manifest machinery survives in the engine**) · sim
  **0 crashes / 0 deadlocks** · aid ALL FIT.
- Read (20×3): pace **16.4 / 13.7 / 13.1**, winner totals **80.0 / 77.2 / 73.3** — down from
  v5.6's 89/89/78 by about the 8% the Manifests were paying, exactly as predicted. **Margins
  stay high (23.3 / 14.4 / 16.4) and the short-game tail widened (min 8–9, band 95/80/70%)** —
  see §10; the runaway watch is now the live one.
  *Superseded by the full oracle (1,500 games, 2026-08-24): pace **14.7 / 14.5 / 13.7**, band
  **84 / 88 / 87%**, totals **78.3 / 78.8 / 71.0**, margins **22.1 / 15.1 / 12.7**. The 20-game
  read's short-game tail was small-sample noise; the margin held, and §10 now names its cause.*

### v5.6 “The Glut” (2026-08-23, designer-ruled — record `archive/records/V56-THE-GLUT.md`)
*"When a ship delivers casks to a kontor, each type of beer is moved down the track 1 space.
The only time it goes up is with the bourse ±1, +1, or +2 actions. Those should be reserved
to buildings and most likely private actions."*

**The Lisboa read, decomposed.** The designer brought Lisboa's economy track as the model and
three lessons came out of it: **one step per EVENT, not per unit** (our old rise was "+1 per
cask, cap +3" — that is counting at the table); **monotone decay is trivially trackable** (a
marker that only walks one way needs no sign read); and **the counterweight lives elsewhere
and grows** — Lisboa's better ships pay more per good, and *we already have that ladder* in
the die, the Novgorod premium and the Venture L2s.

**What was actually broken.** Three things, and the sim named all three. (1) **The seller
controlled both ends and they cancelled** — a 3-cask single-beer Hulk pumped its own price +3
and then sold at the new price, so *the game paid you for monoculture and there was never a
reason to mix a hull*. (2) **The crash was on the wrong beat** — a brew fired 10–20×/game,
two to four turns before the sale, by which time someone's arrival had erased it: *the
dominant force in the market was noise*. (3) **Legibility** — the printed marker was not the
price you would get; you had to compute the post-arrival number to value a load.

**The ruling.** Markers open at **+3** and only fall. A sail: **score first, then one step
down per beer TYPE aboard**. The brew crash retires. Up only via shifts, which live on
buildings and private Venture lines. **The printed marker IS the price** — the legibility fix
falls out of the mechanic for free.

**Three paths were put up; the designer ruled the middle one and rejected the other two for
good reasons.** *Path 1* (brew posts up / sale eats down, per cask) was the most textured and
the least trackable — dropped against the stated preference for something players can track.
*Path 3* (decay per KONTOR, not per beer) was the one I recommended, and the designer killed
it with the decisive objection: **"you don't necessarily choose a port destination, that is
chosen by luck of the draw as ships become available and by other players commissioning
them… If a kontor is hot and I commission a ship, I'm actually supporting market saturation."**
*A market you cannot steer is a tax, not a decision.* Kept as the standing lesson.

**And the prizes, which turned out to be the same letter.** The `prize-probe.js` read showed
**Bergen dead 35.5% of the time — every single one "seats already full"** — while carrying the
game's richest majority (9/5/2). The port you most want presence at was the port that stopped
paying first. The designer's fix beat mine: *"we don't need a fallback as the points are the
fallback."* Every prize becomes **the thing OR ★**, per cask, always a choice — which costs
**no points at all** where my ★-conversion would have added 8–16★, and dissolves the feel-bad
at the root (you were never forced to take the thing). The **2-goods consolation retires from
the whole game**. The designer's own emergent line: *"I may try to get two casks on a boat to
bergen, one for points and the other for the specialist, with both dice working for the
majority."*

**Novgorod +2 → +3 ⚙ (raised, then ruled).** With the others able to pay ★, Bergen strictly
dominated Novgorod — lower minimum (2 vs 3), richer majority, equal payout, *plus* an optional
specialist. Novgorod's premium is flat, not per-pip, so it could not out-scale. At +3 it
becomes what the designer named it: **the port that only pays money, and pays the most.**

- Engine: `BOURSE_START=3` · `BOURSE_SAIL_STEP=-1` · the glut deferred until after the delivery
  loop in `sailShip` (so the seller cashes the printed price) · the `brewCommit` crash deleted ·
  `PRIZE_PTS=2` + `prizeStars()` wired into all three prize flows, with `aiRecipeVal()` added so
  the AI can price a card against the points · `DEST.novgorod.vbonus` 2→3 · a `bankP` bucket in
  the score breakdown. KEY `hanse-v56`.
- Gates: verify **391/391** (new §20f: one-step-per-TYPE · the mixed hull · the floor · the
  shift-only rise · the Novgorod collision · London never forfeits · *no path pays the retired
  consolation*) · sim **0 crashes / 0 deadlocks** · render smoke ALL PASS · aid ALL FIT.
- First read: glut steps **9.2 / 12.2 / 15.0** per game, markers falling **+3 → 0.5–1.4** by the
  end, brew crashes **0.0** (retired, confirmed), prizes taken as ★ **2.0–3.5/game**. Pace
  **15.3 / 15.0 / 13.6** — *better* than v5.5's 12.0/14.4/12.8, because a decaying market makes
  late deliveries cheaper and the game runs longer. **Watch: winner totals rose to 89/89/78 and
  margins to 15.7–20.8 — see §10.**

### v5.5 “Four Hands” (2026-08-23, designer-ruled — record `archive/records/V55-FOUR-HANDS.md`)
*"The private venture buildings on the wharf are also implemented in an odd way… I think
the 4 tiles and placement before was a little too rigid. It works in Great Western Trail
because you have a pool of 10+ buildings but here there are less slots and less buildings.
I also wonder if the benefits are good enough."*

**The rigidity was arithmetic, not taste.** Under v5.2–v5.4 an L2 could only be reached by
spending a *second* hand tile over your own L1 — so four tiles bought **at most two
buildings**, and the second one cost you a face you had already paid to place. GWT gets away
with a strict climb because it deals from a pool of ten-plus; here the hand is four and the
ground is eight slots that the tide keeps churning. The sim agreed: **L2 climbs ran ~0.6–1.3
per game** against 4–7 L1 placements. The L2 half of the family was, in practice, printed
and unread.

**The FLIP is the fix, and it costs no new component.** A standing L1 already *is* its own
L2 — the L2 was always printed on the back of that same cardboard. v5.5 simply stops
forbidding the obvious move: **pay the L2 fee and turn the tile over in place, spending no
hand tile.** Overbuild survives for the case it was actually good at — putting a *different*
theme's L2 on ground you already hold. Three ways on, one component, no new rule to teach
(the tile teaches it by being two-sided).

**THE FOUR THEMES.** Pairing an L1 with an unrelated L2 was what made the old hand read as a
grab-bag. Re-derived, each tile is one **theme** with its own L1 and L2 — brew · age · die ·
points — so "you can only have one side facing per theme" needs no rule at all, and a player
who wants the *age* engine knows exactly which piece of cardboard to reach for.

| Theme | L1 | L2 | public (L1 · L2) |
|---|---|---|---|
| **brew** | **Mash Tun** — BREW the stack's top tile | **Great Copper** — 2 goods **and** a full BREW | +1 good · age +2 |
| **age** | **Warehouse** — Age 2, then load 1 Ready onto **any** hull | **Assay Loft** — 2 `H`: **every** maturing cask to READY | +1 good · age +1 |
| **die** | **Rack House** — swap 2 vessel dice | **Lagering Cellar** — a vessel die **+1** (cap 6) | age +1 · Bourse ±1 |
| **points** | **Counting House** — **+1★** per load here | **Staple Rights** — **+2★** per own cask sailed | Bourse ±1 · Bourse ±2 |

**What retired, and why (the designer's own read, tile by tile).** `Factor's Desk` (re-deal
a Manifest) — *"I am still not a fan of manifests… so Factor's Desk doesn't feel great"*: a
power that is only as good as a system under review. `Guild Residence` (2★ per Venture at
end) — *"players will simply upgrade to it at the end if easy enough to do so. Not a
strategic move or a contributor to an engine"*: an end-count is a scoring line wearing a
building's clothes, and under the FLIP it would have been strictly the best last purchase.
`Brewery` (a full BREW) — a duplicate of the Brewhouse's own primary, so the *brew* theme
keeps the search at **L2** and gives L1 the blind top tile instead. The old `Warehouse`
(+1 cask may board) — *"only good if you can utilize that… I don't see a consistent engine
taking advantage of it without aging being part of it (maybe it is age 2 + load anywhere)"*:
taken verbatim.

**The buffs make an L2 pay L2 value.** `Staple Rights` **+1★ → +2★** per own cask (*"it
takes work to upgrade to it as an L2… by the time you have it you need to brew, load and
ship, so that investment is worth a higher value"*). `Assay Loft` **1 `H` → one cask** becomes
**2 `H` → EVERY maturing cask** — the same price per cask at two, a genuine engine at four.
`Counting House` **+1 good → +1★** — the good was worth roughly nothing next to its own
public line (*"+1 good is not that great, it ends up being +2 with the public benefit"*), and
★ on a load is the *points* theme doing its own job. `Great Copper` pays **2 goods + the
search**, so the brew engine funds itself.

**The lane this opens.** The designer named it: *"Swap 2 dice is great, I could build an
engine that makes level 5 Hopped and Gruit casks — a potential lane that is only possible
through an engine with Venture buildings."* Assay makes casks READY, Great Copper brews
them, Lagering Cellar lifts them, Staple Rights makes them premium. That is four L2s that
chain, and the FLIP is what makes holding all four reachable.

- Engine: `VENTURES` re-keyed to `brew`/`age`/`die`/`points`; new kinds `vbrew2` · `vagel` ·
  `vlift` · `vgoodstar`; `flipVenture(slot,pid)` + `ventureFlip(key,free)` (paying
  `V_FEE_L2` — you are buying the upgrade, not the ground); `enterAge(…,ctx.thenLoad)` and
  `enterSource(…,ctx.thenBrew)` chain the two multi-step faces; `VSTAR_PTS` 1→2,
  `ASSAY_COST` `{h:2}`, `VRES_PTS` deleted. KEY `hanse-v55`.
- **The dead-stop fix (same day, found on the v5.6 full re-read).** v5.5 shipped with
  `stopAvail`'s `vact` branch answering only `vswap`/`vbrew`/`vready`; **`vagel` (Warehouse),
  `vbrew2` (Great Copper) and `vlift` (Lagering Cellar) fell through to `false`** — three of
  the eight faces were greyed for the human and skipped by the bot. The `vstep2` public line
  fell through to a bare `true`. Fixed: every kind answers, and a **§20d-bis battery walks
  the whole family** so a new face can never ship dead again.
- Gates: verify **382/382** (§20d themed-pair/FLIP/overbuild · §20d-bis the dead-stop walk ·
  §20e the new L2 powers) · sim **0 crashes / 0 deadlocks** · render smoke ALL PASS · aid ALL
  FIT. **FLIPS run 1.9–3.6/game** against 0.7–0.8 overbuild climbs — the door the letter
  opened is the one players use.
- **PACE — the numbers reported before the fix are void.** They were measured with three of
  eight faces dead. Alive, the family is strong and the game runs **FAST**: 2p **12.0 (50%
  in band)** · 3p **14.4 (91.7%)** · 4p **12.8 (83.3%)**, every miss on the SHORT side. The
  tray (13 ⚙) is THE dial and it is the designer's ruling — untouched. §10 carries it.

### v5.4 “The Tide” (2026-08-23, designer-ruled off playtest #37)
*"I want engine building to pay off, I want the bourse more dynamic, I think the public
buildings should sail with the ships (that way something overpowered burns out)."*
Playtest #37 (3p, 12 rounds, 80–43–39) made all three the same problem. The furniture deal
gave **two Malt Kilns** — which fired on every lift and enabled a Q2 Hopped to clear
Novgorod's 3+ band for **8★, matching the Q6 capstone** — while **Peterhof and the Weigh
House never fired once** in twelve rounds, because no hull ever docked on their slots. Half
the wharf was overpowered and half was scenery, permanently, from setup.
- **THE TIDE (ruled):** every Public Work is ephemeral. A Ship sailing from a slot takes
  that slot's tile with it, **boxed, never recycled**; the premiums, lifts and Manifest
  doubling all resolve while it still stands. The `eph` flag retires as a special case —
  the Bonded Store and Victualling Yard keep only their *extra* faces. The wharf
  **re-furnishes from a bag at END of turn** back to the setup count, so the gap stands for
  the rest of the turn the tile sailed on and **an L1 Venture may claim the cleared
  ground**. The bag never takes a burned tile back, so the wharf is rich early and **thins
  into bare ground late** — which is what makes the Ventures the only permanent thing on
  the board, and the answer to "engine building should pay off."
- **The Venture door was STARVED, not priced shut (ruled — through existing systems, not a
  new action).** In #37 a Guildmaster and a Cellarmaster both finished with **full hands**:
  neither ever hit London, and neither ever drew a cask carrying *Open 1 Venture* — a Q3+
  verb printing ~1 tile in each export's six. The verb **drops to Q2+**, so **Hopped** (12
  tiles, the most-brewed beer) now prints **2** of them. This is the §8 reachability lesson
  applied verbatim: *fix the door, not the prize.*
- **The market's missing brake (ruled):** `Staple Rights`' public line was **+2▲ up-only**,
  the one shift in the game with no counterweight — it fired four times in #37 and helped
  peg **three of four beers at +3** while the one beer nobody shipped sat at −1. It becomes
  **±2**.
- Gates: verify **364/364** (a §20c tide battery: the bag, the burn, the end-of-turn
  refill, the Venture exemption, a dry bag leaving bare ground) · render-smoke ALL PASS ·
  aid ALL FIT · **sim 30/count: 0 crashes, 0 deadlocks**, pace **16.4 / 15.9 / 14.5** at
  2/3/4p, band **90% / 100% / 96.7%**.
- **The arc reads in the data.** Venture L1 placements **3.4 / 5.0 / 6.1** per game with
  ~1.7 standing per player at end — against **2 in the whole of playtest #37**, where two
  MC seats built none. The wharf strips as intended: at 4p the tide burns ~5 tiles a game
  and leaves **0.9 standing**. On the Bourse, 4p down-shifts now **outnumber** up-shifts
  (**▼8.5 vs ▲7.2**, from ▼6.0/▲8.7 before) and the end-track average fell **2.2 → 0.9**:
  the ratchet is a market again.
- **Cost, recorded honestly: pace tightened.** 4p runs **14.5** (was ~15.6) and 2p band
  compliance slipped to **90%** (min 11). The chain is traceable — more Ventures on the
  board → more public lines fired → the goods faucet at 4p is now **31.0 freebies/game** →
  cheaper brewing → dice burn faster. That is the standing §10 "public-line goods faucet"
  watch, confirmed under a wider Venture population. **No dial was touched**: the tray size
  is THE pace lever (§8) and moving it is the designer's ruling, not this letter's.
  KEY `hanse-v54`.

### The stamp's seam leaves the engine (2026-08-23, designer-ruled)
*"Retired stamp — fix it."* The v5.3b Tollhouse rework retired the stamp face (−1 die for
+3★) but left its **`loadopt` choice point** standing as a "kept seam." It was an orphan —
nothing ever set `UI.sub='loadopt'` or filled `UI.loadopt`, so the prompt was unreachable —
yet it still carried **live player-facing copy for a retired rule** (*"stamp the cask? the
die drops 5 → 4 and you score +3★"*), which is exactly what `STYLE.md` §4c forbids, and a
score-breakdown row advertising *"Tollhouse +3★ per stamped cask."* Removed whole:
`loadOptGo` · `aiLoadOpt` · the `aiStep` and `aiMCOptions` cases · the `AI_MC_SUBS` fork ·
the prompt · the `hideEnd` entry · the dead `useOpt` parameter on `loadCommit` · the
`bankO` row. **The seam's real value was never the code** — it is in git history, where
the charter says retired things live.
- **Two live defects surfaced behind the dead copy.** (1) The score breakdown never gave
  **Staple premiums** (`bankSt`) a row, so the remainder math folded them into *Placed
  presence* — a player reading the modal saw their Staple ★ attributed to bumps. It now
  prints its own line, matching `RULES.md` §11.5. (2) **`sim.js`'s `toll` counter watched
  `bankO`** — the retired stamp's payout — so it reported **0.00 every game** while the
  toll bench was firing normally. The §10 watch *"does the Tollhouse finally see
  traffic?"* was structurally unanswerable. It now counts bench firings.
- Gates: verify **352/352** (the §20 toll-bench battery gains the seam-is-gone check) ·
  sim + render smokes clean · **no `KEY` bump** — the removed code was unreachable, so
  behaviour is byte-identical at the table (the v5.3b repo-hygiene precedent).

### The golden rule — component copy carries no rules (2026-08-23, designer-ruled)
*"Rules never live in the components… and they don't live on the boards or in the play
interface."* Landed as `STYLE.md` §4c + the trigger grammar (*On load / On sail / On sail
to <Kontor> / On line / At end* — the trigger on its own line, the action below; the cask
tiles are the model). Tooltips compress to *name (family): trigger, effect* — the
furniture lecture is gone. The **Staple Houses take proper names** (Bruges Hanzehuis ·
London Steelyard · Bergen Bryggen · Novgorod Peterhof). The **Tastings' printed home is
RESOLVED**: rules live in `RULES.md` + `rulebook.html` only, and an in-development system
stays out of the rulebook entirely — the §10 watch closes. Gates: verify 351/351 · smokes
clean · no KEY bump (copy only).

### Repo hygiene — `play.html` sheds its version history (2026-08-23, designer-ruled)
*"We don't track version history in play.html."* The engine file now states the current
rules only: the 62KB KEY-comment changelog and every per-line version/date tag stripped
from comments and player-facing copy (~80KB lighter). Behavior unchanged — verify
**351/351** · sim + render smokes clean · no `KEY` bump (doc-text-only). Version history
lives here (§9), in `archive/records/` and git.

### v5.3b — the toll bench (2026-08-22, same day — designer-ruled)
*"One of the public buildings should have a ±1 bourse."* The **Tollhouse reprints as the
toll bench** — a cask loading at its slot lets the **loader shift any Bourse marker ±1**
(queued, resolves as the load flow closes — the `pendingShift` grammar). The dead stamp
face (−1 die for +3★ — unused through three versions) retires with its `loadopt` choice
point (dormant seam). KEY `hanse-v53b`; verify **351/351** · smokes clean.

### v5.3 “The Bourse” (2026-08-22, the third letter — designer-ruled; record `archive/records/V53-BOURSE.md`)
- **The beer-value market:** one track (−1…+3 ⚙ `BOURSE_MIN/MAX`), a price marker per
  in-play beer except Gruit & Jopenbier, start 0. A delivered cask scores **DIE + TRACK**
  (ruled — the die stays the cask; floor 0; Novgorod/Staple/Manifest ride on top);
  **BULK RISE THEN SCORE** (ruled — arrivals lift each beer +1/cask FIRST, then the casks
  score); every **brew** slips its beer −1 (the supply crash); shifts ride **Bergen's
  prize** (*specialist + adjust the market by 1* — ruled; the 2-goods fallback stays) and
  the Ventures' **public lines** — never a new action.
- **Public Works = the start of the game** (ruled — *"you never put a die on them because
  they simply start the game"*): `setupWorksN` ⚙ 3 (2p) / 4 (3–4p) random tiles on random
  slots, the rest to the box; die-less neutral furniture — no deck, no display, no build
  channel, no fee, no maturity. The v5.2 investor grammar retires after ONE letter
  (`bldgTick`/`bldgDepart` inert seams); the mason's-mark scoring lane leaves
  `scorePlayer` — the dice serve casks + presence alone (~2 dice/player of runway freed =
  the designer's maneuvering-space ask).
- **The open ground** (ruled): an L1 takes ANY open slot; wharf FULL → it may replace a
  Public Work (boxed); NEVER another player's L1/L2; L2 over your own L1 unchanged;
  London's prize = a Venture fee-waived; the bonus verb reprints **Open 1 Venture**.
- **Every Venture face prints a PUBLIC line** (ruled — *"the owner gets both… that will
  grease the wheels"*): vstep age+1 (Rack/Brewery) · vgold +1 good (Counting/Assay/
  Warehouse) · vshift1 ±1 (Factor/Residence) · vshift2 +2▲ (Staple Rights) — free `vpub`
  stops for whoever activates the line.
- The Lisboa/Maracaibo thread the designer named becomes the game's negative-feedback
  loop: the loosened economy (Source 3 · no dice on buildings) is counterweighted by the
  market your own volume moves. KEY `hanse-v53`.
- Gates: verify **352/352** (§28 the Bourse battery · §32 open ground · §32c public
  lines) · sim smokes clean — **VENTURES ALIVE AGAIN** (1.7–5.3/game vs 0.1–0.3 under the
  v5.2b ladder; climbs land; shifts move; end-track avg +0.2…+2.1) · render-smoke ALL
  PASS. Watches → §10. The v5.2b full-oracle corpus stands as the pre-Bourse baseline; the
  fresh oracle runs when the designer calls it.

### v5.2b — the second letter (2026-08-22, same day — designer-ruled off the first hands-on read)
- **The ladder is the ground:** an L1 Venture REPLACES a Public Work YOU invested in (pips
  bank · die home · public tile boxed; never an open slot) — superseded by v5.3's open
  ground, but the build-then-redevelop arc it named survives as the wharf-full
  redevelopment rule.
- **The *Brew 1* load bonus takes the TOP tile** — the search is the station's edge (the
  Brewhouse primary + the Brewery Venture search; the Brewer's Mate lifts the station
  alternate only).
- **Market PRIMARY = Source 3** ⚙ (*"the game is slower because of the lack of
  resources"* — the first pure faucet widening since v0; sim hook `SRCN`).
- **The Bergen fallback confirmed & printed** — a prize with no seat to fill pays **2
  goods** (1 `G` + 1 `H`; *"a competition is good"*). KEY `hanse-v52b`; verify 349/349.
- **The full v5.2b oracle landed same-day** (records `ORACLE-STUDY-v52.md` +
  `BALANCE-PROPOSAL-v52.md`): **Ventures dead at EVERY tier** (GM 0.13–0.33/game — the
  ladder priced the door shut; the designer's public/private split + the Bourse became
  v5.3) · Weigh House/Ropewalk/Tollhouse/Staple effects ~never fire (the bourse-carrier
  rework became the toll bench) · pool sweep: **14 = +1.6 rounds, the best band on record
  (RECOMMENDED)** · the London multi-prize door-slam awaits a ruling.

### v5.2 “Groundwork” (2026-08-22 — designer-ruled in-session; record `archive/records/V52-GROUNDWORK.md`)
The two building families, built in one conversation: *buildings are modifiers to the
items in that slot — the line is clear and clean.*
- **PUBLIC WORKS** — the shared family turns **brown** and fully **passive** (no building
  adds an action; every face fires on its own slot's traffic). The v5.2 form gave the
  builder an **investor's die maturing at 6** (+6★ · die home · tile demolished) — retired
  at v5.3. Roster 13/9: Kiln ×2 · Tollhouse · **Customs −1** (ruled — −2 was "almost
  broken") · **Ropewalk reworked** (a load here also loads 1 onto a DIFFERENT Ship) ·
  Cooperage · Weigh House · **Staple House ×4 NEW** (*Stapelrecht* — +2★ ⚙/cask on a
  matching sail) · the ephemerals. **Rich Berth CUT** ("meh", dead through two buffs);
  Capstan to the expansion lot; Granary/MQ/Racking/Assay/Abbey/Hopex/Exchange absorbed
  into—
- **VENTURES** — the GWT family: an identical **hand of 4 dual-use tiles** per house (L1
  from hand / L2 over your own L1 — one cardboard, never both faces). Private, the
  **owner's ring**, **no die**, never overbuilt by a rival. Rack House/Brewery · Counting
  House/Assay Loft · Factor's Desk/Staple Rights · Warehouse/Guild Residence. The retired
  v5.1 riders' ideas live on in these faces.
- Engine: the family split (`b.v`/`vAt`) · `placevent`/`vredeal` flows · `rwChain` ·
  Staple premiums in `sailShip` · both families in the survey verb, the London prize and
  the AI. The v5.1 rider plumbing retires whole. KEY `hanse-v52`; verify 338/338.

### v5.1r — the rider-scope study letter (2026-08-21 — designer-called; NOTHING ruled)
`KEY hanse-v51r`. The mark re-fund A/B (record `archive/records/RIDER-SCOPE-AB-v51.md`):
**no arm passes** — the wide rider window is a structural null (collects ~0.2–0.5/game),
faces +1 is noise. The reframe: ticks fell ~40% at v5.1 but **end pips only ~5–10%** —
saturation and the printed start faces absorbed it. Scope stayed 0; nothing printed.
**The 2026-08-22 ORACLE study rides the same letter** (record
`archive/records/ORACLE-STUDY-v51r.md`; `strategy-probe.js` refit as the oracle
instrument): the skilled game is an **engine-then-harvest crescendo** (~+4–5 rounds over
greedy; 30% of GM 2p games hit the 25-round ceiling); **majorities + the Flight finish
winners** at every tier while raw Bruges-volume loses; flags — the 2p majority lane
(79–82%), the 3–4p greedy seat gradient, **Novgorod dead 25–27% at 2–3p under skill**,
the dead shelf dead at every tier. Healthy: the Manifest economy, no runaway leader, a
plural 3–4p lane ecology. Watches → §10.

### v5.1 “Wharf Hands” (2026-08-19 — designer-ruled; record `archive/records/V51-WHARF-HANDS.md`)
The manifesto: *"the core actions come from the wharf stations, and the major resources
come from Kontore and cask load bonuses. Specialists should modify the station actions…
the buildings are modifiers and less actions to take."* One amendment — **the Almoner's
Stall retires outright** (*"bypassing casks to simply place dice out"*; presence flows
ONLY through casks, always free) — and one constraint (**component text MINIMAL — icons
carry resources and actions**).
- **Stops become RIDERS** — a converted building boosts the matching STATION action fired
  on its line, primary and alternate alike, once per activation (Granary · MQ ×2 ·
  Racking/Assay/Abbey inside the Age flow · Hopex in Age AND Load · Capstan warp-first);
  the Merchants' Exchange held as the sole base slot action. *(The whole rider grammar
  retired at v5.2 — its ideas live in the Venture faces.)*
- **The shelf turns** — retired: Scrivener's Hall · Hiring Post · Almoner's Stall; buffed:
  Customs −2 (floor 1) · Rich Berth buy-the-empty-berth; new: Ropewalk · Weigh House.
- **Station superpowers** — the specialist roster rewords icon-first; Chandler's swap
  rides the station Source; **Broker** (Market alt = Source 2) and **Brewer's Mate**
  (Brewhouse alt searches) join — 15 designs / 25 tiles.
- Gates: verify 354/354 · sim 300/count clean — pace 16.6/15.7/14.8, band 89.7/92.0/87.0%
  (riders bought ~+1 round DEEPER into the band; the best 4p band on record).

### v5.0 “Open Wharf” (2026-08-18 — designer-ruled off the 4p human playtest; record `archive/records/V5-OPEN-WHARF.md`)
The brief: *"less tight, less a vs. b, more fluid where needed."*
- **Census stacks** — each beer's supply is a real searchable stack of its own printed
  tiles (the kit census IS the play supply), shuffled at setup; a **full Brew searches and
  chooses**; the alternate takes the top tile; **a delivered cask's tile returns to the
  BOTTOM** (ruled); an empty stack can't brew — supply is a visible, finite,
  self-refreshing loop.
- **Manifests** — the 15-Order row retires whole; a **12-card ⚙ demand deck** rides every
  non-Bruges hull (3 generic lines each; ONE claim per delivered cask; each line once per
  voyage; the card recycles pristine — the component IS the state). Boarding gates
  unchanged ("Gate remains — ready and quality"). Chronicler → +2★/claim; Exchange →
  re-manifest.
- **Primary/alternate stations** — Market 2/1 · Brewhouse search/top · Cellar 3/1 ·
  Harbor commission / Load-1-any. The A/B said the grammar slows the game ~+1.5 rounds
  INTO the band — the echo strength is the pace dial, 1/1 is the print.
- Gates: verify 321/321 · sim 300/count clean · pace 15.3/14.4/14.0, band 86/87/79%.

### The v4 era — “Bright Beer” → “Champion’s Tour” (2026-07-21 → 2026-08-15 · digest)
The streamline spine and its tuning arc, in order; every full entry, gate line and study
record is in git history.

- **v4.0 “Bright Beer”** — the keystone: **THE DIE IS THE CASK** (start = quality − steps ·
  Ready at quality · lifts cap 6 · parks as ★/presence/clock) · **no deploy** (slots hold a
  building and/or a ship, never casks) · one green shared building family · everything
  earned, never bought · the Hall/Dispatch/the Floor turn tabled.
- **v4.1–v4.3** — the dice become the **ONE clock** (the Sailed-Ships track cut) · **the
  fee rides the ITEM** (every acquirable prints its own wharf fee; never fee-on-fee) ·
  Novgorod = the die +2★ · the **occupancy toll cut** (sharing is free).
- **v4.4–v4.5b** — the commission regains its **maiden load** · the **EMPTY-TRAY** end
  trigger (commitment, not parked-out) · the commission ★ mint and **automatic aging CUT**
  · the die-manipulation building pass (Racking · Assay · Hop Exchange · Tollhouse · the
  ephemeral Bonded Store) · the Braumeister · **Ladings** (the order row — the demand
  layer that became Orders, then the v5.0 Manifests) · fees print in grain only · the
  recipe tariff (`H` = Q−2, later Q−3) paid at every channel, Bruges included.
- **The v4.6 letters** — the Agricola program: the specialist roster grows to 13 (the
  guild singles; seat-gates) · Bergen corrected to **every shipper** (≤1/house/ship) · the
  **LIVE line** · the Stevedore in every load flow · the specialist value study (the
  instrument for every price pass since).
- **v4.7–v4.8** — **every cask pays its port's prize** (one grammar, all four kontors —
  measured per-die-safe first) · the specialist price pass · dead orders stripped · six
  per-beer piles · **per-hull commission fees 2/1/0** (dispatch speed dear, tonnage free).
- **The v4.9 letters** — the **mason's mark** trial (a build = a quality die on the tile,
  ticked by use, pips at end — the build economy for six versions, retired at v5.3) ·
  printed start faces · **the pool is 13** (the 13th die funds the marks; the die, not the
  faces, is the pace lever) · an untakeable build prize is **forfeit** · recipes ease to
  **`H` = Q−3** · **the Flight qualifies on LOAD** (the designer's read: the recipe cards
  move right when shipped) · the player board enters the app.
- **v4.10–v4.12b** — the **Novgorod gate returns to 3+** (the gate halved dead-port; the
  +3★ premium arm was a null — structure, not value) · presence priced 2 `G` (v4.11), then
  scoped to the Almoner alone (v4.12; the Almoner itself retired at v5.1) · the buildings
  & specialists review (Chronicler uncapped · Town Crier +2★/die · Innkeeper reworked ·
  Assay 1 `H`→Ready · Cooperage wharfage, eased +2→+1 off the BUILDING-POWER study: no
  single tile macro-warps; the dead shelf is real and tier-agnostic).
- **v4.13–v4.14** — the presentation release (diagrams from real components · one site
  nav · the surface-reconciliation pass that minted the "every ruling needs its
  COMPONENTS note" law) · the **expansion beers return** re-derived on the v4 spine
  (Specialty draft 3-of-7, pinned signatures; **Jopenbier** the plain Q6 capstone, always
  acquirable, the sixth Flight step).
- **v4.15–v4.17b — the Hall's three swings** — the Guildhall shelves (menus, once-per-★ —
  cut: a component-state violation and *"a dumping ground… no reason to engage"*) → the
  volume-lane study (pips + the Chancery; the Chancery survives) → **THE TASTINGS**: the
  Hall as a cycle of public contests — benches filled by poured Ready casks, **the bench
  filling IS the judging** (highest die 1st; ties → the earlier pour; the door-slam is a
  move), unconvened benches 1★/die, category sets, the **champion's tour** (the winning
  die parks as presence) — the surviving hall shape, behind its toggle. Contracts renamed
  **Orders** along the way (the registry's collision rule: the tile is the Order, the
  sequence prints as *boarding order*).

### Before v4 — v0.1 → v3.4 (digest)
- **v0.x** — the founding line: worker placement on a shared wharf, the deploy state, the
  Hall, charters. **v0.7 reeled the weight in** from Lacerda-grade to GWT-weight — the
  founding lesson (*content, not rules*). v0.15/v0.16 minted the structure-lever and
  incentive-inversion lessons (§8).
- **v1.x** — the **component-state hard line** (ruled 2026-07-12) · demand dice (v1.2) ·
  the balanced warm start.
- **v2.x** — Privileges & Works (owner-value vs anyone-transform) · the 50-cell score
  track · the table pass (v2.9.1 was the long-standing frozen playable).
- **v3.x** — **tally dice** (the die-as-cask precursor) · Path A (the structured Floor
  turn) · the shelved table-pass exploration. Superseded whole by the v4.0 streamline.

### Parking lot — recorded for future discussion (NOT decided)
- **Legible goals & strategic arcs** (2026-08-02, the designer at the pool ruling):
  *"Without legible goals or strategic arcs in the game, it can feel repetitive."* The
  current arc carriers: the Manifests (short goals), the Flight (a private arc),
  majorities (a slow arc), the Bourse (a shared arc). Candidate directions when this
  opens: public milestone tiles, a visible endgame preview, kontor development arcs.
- **The premium fee dial** — still parked: (a) a surcharge when a kontor PRIZE hands over
  a premium tile (today prizes are always free); (b) a BREW surcharge on the top beers.
- **Asymmetric starting powers** — deal-2-keep-1 of something (the old improvements idea;
  today's Venture hands are identical by design). An opening-asymmetry / replay lever;
  needs a set balanced enough that any pair is fair.
- **The Hanse Diet** (deferred) — +4★ where you lead; no presence grants. Revisit with
  human data.
- **The Trade Roads review pass** — the Overland expansion awaits its re-derivation;
  carry-ins recorded in git history.
- **"Recall your own Venture to hand"** — the shelved 4p ground-lock relief valve (v5.2
  watch); only if the lock rate demands it.
- **The pool-14 question** — the v5.2b sweep RECOMMENDED 14 (+1.6 rounds, the best band on
  record); v5.3 freed ~2 dice/player of runway instead — re-measure on the Bourse build
  before any dial.
- **The London multi-prize door-slam** — flagged by the v5.2b oracle, awaiting a ruling.

---

## 10. Open watches (the live ⚙ shortlist)

*Moved here from `RULES.md` §Open (2026-08-23). The designer calls full batteries; these
are the things to read when one runs — or when a human table sits down.*

**v7 WATCHES (2026-08-31 — the station-verb panel: 3 proposals · 2 sim probes · a judge):**

- **THE V8 PROGRAM (2026-09-04 → the review complete and the plan built 2026-09-06 — `V8-PLAN.md` §12–§13).** The designer's diagnosis, corrected on review: v7 never broke the overlap between the station actions and the core loop, so walking source · brew · age · ship IS the game, everything else hangs off it, and free goods made goods the only resource — an efficiency game without soul. The target is DEPTH (interlocking prerequisites, asymmetric powers, a sea worth a die), and the recorded failure mode is the optimizer's instinct cancelling it (`CLAUDE.md` §1, THE SECOND OVERRIDE). The ruled game: eleven dice; a die ends as a cask, a post or a Kontor building; the quality count (your dice at sea) is the one gate; a landing is two dice; the yard and the hall at Bruges; a GWT private-building engine on the wharf; no kettle, no market track. Every watch below stays as history until the mirror is built (§13.6) and the designer's own table has played it. **No corpus before that table.** Open rulings: `V8-PLAN.md` §13.7.
- **THE FIRST ORACLE READ (2026-09-02 — `archive/records/GATEKEEPER-v70b.md`, standing review #4; 30 search-tier 2p games + two blind analyses).** The watch above was right and the number is worse: under the Cellarmaster **21 of 30 2p games end on the ceiling** (the greedy read was 27–31%) with 27% of the dice never spent and deferral reading as free to the search. The two new watches it opens: **the hall price** (PRESENT never beat DELIVER in 100+ matched landings — 314 ⚜ earned, 14 spent, 111/120 ladders frozen, the 14-card contract deck dry in 16 games) and **the one-tile engine** (Great Copper 29 of 30 L2s, 57 of 113 Venture actions through London's per-cask waived prize, the ledger ≈4% of the score). Its §8 queue is the agenda; the §9 table questions gate every reading.
- **THE SECOND KETTLE (v7.0a — the designer RULED past the panel, eyes open).** The
  station-verb panel had recommended keeping the double kettle unpriced: in three
  independent ~150–300-game arms a +1H fee on the *top-tile* alternate suppressed only
  ~10–20% of second-kettle use while pushing **2p MAX_ROUND-ceiling endings 27–31% →
  39–41%** (the v6-drag marker). The designer weighed that and ruled the fee IN — as
  part of a SIMPLIFICATION the panel never tested: **every brew is now a full search**
  (the top-tile draw and its free-here/lesser-there conditionality retire everywhere),
  so the +1H buys a real brew, not a lesser one. The relocation findings stand un-
  overruled (Brew-top@Market = the self-funding kettle and measurably stronger
  degenerate corridor play; removal outright = ~50% 2p ceiling endings). **THE WATCH:
  the 2p ceiling-ending share under the as-ruled build** — the A/B against v7.0 is in
  the §9 v7.0a entry; if a human 2p table drags, the panel's read says look HERE
  first, and the dial is the fee (⚙, off or +1G), never a re-map. The panel's
  relocation and stack watches (below) carry unchanged. *(The one-day "second
  runnings" name retired with the top-tile draw it described.)*
- **THE STACK, not the seat:** Brewhouse + a flanking Mash Tun/Great Copper on s2/s3
  = 3–4 brews per visit over docking hulls — watch a Gruit tempo mill at the table;
  the lever is Venture faces or hull placement, never the station map.
- **THE COLD CELLAR:** bots run a hot Market⇄Harbor corridor (~47–54% of moves) and
  visit the Cellar least (~11–14%) — greedy bots under-age by construction, so this
  is a QUESTION for the table (§11 Q6's added ask), not yet a finding.
- **2p ceiling endings 27–31%** at baseline: a 13-dice / MAX_ROUND-22 dial question
  the v5.8 watch already knew (skilled seats hold dice) — never fix it with a brew fee.

**DIALED at v5.8 (2026-08-24): 2p majorities now pay a SECOND PLACE**, and the presence gate
(*no parked dice at a Kontor, no share of it*) is finally PRINTED rather than engine-only. Live
read: 2p margin **19.4★** (was 22.1), blowouts **32.5%** (was 38), majority-share of the margin
**3.9★** (was 8.4). **The runaway is dented, not closed** — deliveries still carry 9–10★ of it,
and at guildmaster the margin is still ~30★. **The queued second half is the re-tiering**
(London/Bergen 9/5/2 · Bruges 5/4/2), which at GM takes the pair to 25.9★ where this half alone
reaches 30.4 — costed at about +3★ of total inflation. Not ruled; read this half at a table first.

**THE HIGH-SKILL ORACLE (2026-08-24, 1,850 Monte-Carlo games — 3.0h, 4-core queue at
concurrency 4, `GUILD_MS=60` / `CELLAR_MS=150`). FOUR RESULTS, TWO OF THEM REVERSALS:**

**1 · THE RUNAWAY IS WORSE AT SKILL, NOT BETTER.** 2p margin **21.1★ (journeyman) → 34.0★
(guildmaster)**; blowouts >25★ **35% → 59%**. It is not a bot artifact — strong play *exploits*
it. Every margin number published before this read is a lower bound.

**2 · DEPTH IS NOT DEAD — the greedy read was an ARTIFACT.** The v5.6 finding ("a specialist
cannot keep three vessels full, so it backfills with free Gruit") was the *bot* failing, not the
game. At skill the specialist **ships as many casks as anyone**:

| | ships | ★/cask | Flight ★ | lane lift |
|---|---|---|---|---|
| depth · journeyman | 4.68 | 1.34 | 0.0 | −35.7 |
| depth · guildmaster | **7.14** | 3.17 | 0.2 | −17.7 |
| depth · cellarmaster | **7.18** | 3.19 | 0.0 | −17.8 |
| breadth · guildmaster | 7.42 | 4.78 | 11.3 | +13.2 |

**The gap is now purely PRICE, not pipeline** — equal volume, casks worth 66% as much, plus the
whole Flight ladder. And the mechanism is the Bourse: a specialist ships the *same beer* every
voyage, so **that one marker walks to the floor and stays there** while breadth spreads the glut
across five. **The Glut punishes specialisation by construction**, and §10's own "up-shifts run
3:1 short" is why nothing can lift it back. *The lever is the up-shift supply, not the Flight and
not the vessels.* (Earlier §10 text naming the per-cask value curve and vessel count still holds
for the value half; the pipeline half is retired.)

**RULED (designer, 2026-08-24): DEPTH RETIRES AS A STANDALONE HEURISTIC LANE.** *"We can ditch
depth as a heuristic lane. If done well, it likely requires a pairing with another strategic
lane such as buildings and specialists."* The lane answered its question — pure specialisation
is **not** a strategy in this game and is not asked to become one; if a specialist line lives,
it is **depth PAIRED with the engine** (the shift-supply the specialist props its own marker
with: Venture Bourse lines, the toll bench, Bergen's shift prize, the drip specialists). The
pure lane and its machinery (`DEPTH_CAP`, the tilt, the MC brew constraint) are out of the
engine; the roster is **majority · lifter · builder · breadth**. **The seam for its return:** a
*paired* lane (depth × builder) is only worth building AFTER the up-shift supply question is
settled — on today's 3:1 shortfall it would measure the same wall. The specialisation watch
folds into the up-shift-supply watch; it is no longer its own line.

**3 · BREADTH IS THE DOMINANT LANE AT EVERY TIER** — lift **+17.3 / +13.2 / +16.7** at
journeyman / GM / CM. Majority collapses with skill (+13.7 → +11.1 → −1.4); lifter and builder
sit near par. Only breadth is strongly positive everywhere.

**4 · THE CLOCK IS NOT THE DICE AT A STRONG TABLE.** At journeyman 100% of games end on the
empty tray. At guildmaster **28% of 2p games end on the MAX_ROUND 25 backstop** (CM 2p 12%;
3p/4p 4–13%), and games run **4–6 rounds longer** (GM 20.7 / 18.8 / 18.2 · CM 19.6 / 16.2 / 15.3
vs journeyman 14.7 / 14.5 / 13.7). Skilled seats **hold dice rather than commit them**, so the
tray never empties. The backstop is load-bearing, which it was never meant to be. **Watch: the
tray as a clock only works on players who spend it.**

**THE MAJORITY ARMS, TESTED AT GUILDMASTER (225 games each, 2026-08-24).** *"What if London and
Bergen are both 9/5/2, Bruges is 5/4/2?"* — measured against four alternatives:

| majority table | 2p | 3p | 4p | 2p blowouts | 2p winner ★ |
|---|---|---|---|---|---|
| A · current (4/2/0 · 5/3/1 · 9/5/2 · 8/5/2) | 34.0 | 19.4 | 15.3 | 58.7% | 81.1 |
| B · London+Bergen 9/5/2, Bruges 5/4/2 | 36.4 | 19.1 | 15.0 | 69.4% | 82.8 |
| C · Bergen down to 5/3/1 | 33.2 | 19.6 | 17.7 | 60.0% | 76.0 |
| D · current, 2p pays a second place | 30.4 | 20.7 | 15.9 | 46.7% | 86.2 |
| **E · B + D together** | **25.9** | **16.8** | **12.7** | **45.3%** | 89.5 |

**Re-tiering alone does NOTHING, and the reason is structural: THE MAJORITY DOES NOT STEER THE
SHIPS.** Quadrupling London's majority (3.8★ → 7.2★ paid) moved London's cargo share **20.0% →
20.9%**; flattening Bergen moved Bergen's **23.9% → 22.8%**. Destination comes from the supply
draw and rival commissions, not from choice — so a majority is a **rider on deliveries**, and
re-weighting a rider on the thing that already decides the game only re-prices the same voyages.

**What DOES work is the PAIR, and only the pair.** At 2p the engine slices the tiers to first
place only, so *only the first number in each triple is ever read* — 4·5·9·8 = **26★ of pure
winner-take-all**. D lets second place exist; B makes it worth taking (seconds go 2/3/5/5 →
4/5/5/5). **Neither half moves the needle alone; together they are the only arm that improves all
three counts.** *At journeyman E was WORSE than D — the reversal is skill: a strong leader sweeps
majorities, so the consolation has to be real.* **Nothing dialed — a table read first.**
*Noise: SE on a 2p margin at 225 games ≈ 3★; A→E (8.1★) is solid, A→D (3.6★) and A→B (2.4★) are
suggestive only.*

**LADDER AT v5.7 (this oracle):** journeyman > apprentice **82.5%** · trader > journeyman
**67.5%** · guildmaster > trader **58.3%** (35/60) · cellarmaster > guildmaster **77.8%**. The GM
rung is **search-budget sensitive** — 68.8% at `GUILD_MS=120`, 58.3% at the `=60` this oracle
ran. Not a game finding; a reminder that an MC rung's win-rate is a function of its budget, which
is why `GM_ROLLS` now exists.

**THE LIVE ONE — RUNAWAY MARGINS ARE *THROUGHPUT*, NOT THE MARKET (full oracle, 2026-08-24,
1,500 games).** Pace **14.66 / 14.50 / 13.68**, band **84 / 88 / 87%**, winner totals
**78.3 / 78.8 / 71.0**. Margins **22.1 / 15.1 / 12.7** — and the decomposition names the cause:

| winner − 2nd | 2p | 3p | 4p |
|---|---|---|---|
| deliveries | **9.8** | **8.4** | **6.0** |
| majorities | **8.4** | 3.6 | 3.2 |
| bank | 2.1 | 1.2 | 1.6 |
| flight | 1.6 | 1.6 | 1.6 |
| guild | 0.2 | 0.1 | 0.2 |

**The winner's casks are barely worth more than second's — 5.52★ vs 5.18★ (+6.6%). They ship
+1.3 more of them (+17.9%).** The gap is *volume*, and majorities then amplify it: at 2p
`majorityAwards` slices the tiers to first place only, so the four destination majorities are
**26★ of pure winner-take-all** (4+5+9+8) riding on an 18% cask edge — one extra cask at a port
flips 9★ with no consolation. 3p/4p pay tier 2 and the margin falls by a third. Shape at 2p:
median 18.8, p90 44.4, **38% of games blow past 25★**, only 27% land inside 10★; at 4p median
10.8, 12% blowouts, 51% close.

**This EXONERATES the Bourse and the prizes** — the suspects this watch itself named. If the
market front-loaded value onto the leader, per-cask value would diverge; it does not (+6.6%). Bank
(where prizes-as-★ land) is 2.1★ of a 22★ gap. **`BOURSE_START` and `PRIZE_PTS` come OFF the
lever list.** The live levers are the ones that touch throughput and the majority cliff:
2p majority tiers (first-only → pay a second place) · the tray (`POOL`, the pace dial) · the
berth economy. **Nothing dialed — read it at a table first: a 22★ gap between two players who
brewed nearly as well is a feel-bad, but a 2p euro is *meant* to be a race, and the sim bots
never contest a majority deliberately.**

**v5.7 “Plain Sail” — the two re-derivations are unplayed:**
- **The Weigh House now certifies** (*"this cargo does not glut"*). It is the only way to sell
  without spending the price, and it is deliberately strong — a Hulk sailing certified banks
  three casks at the top marker and the market never notices. Watch whether it becomes the
  must-have tile, and whether the tide taking it away (it sails with the ship, v5.4) is enough
  of a brake.
- **The Chronicler pays +1★ per delivered cask.** Flat and safe by design, but the sim shows it
  seated rarely (0.0–2.0 ★/game). If it stays unseated it wants a sharper face, not a bigger
  number.
- **Does the demand layer leave a hole?** That was the whole reason to subtract first: play it
  and see whether the Ships feel flat. If they do, the queued answer is a **market line on the
  hull** (*"this beer does not glut" · "+1 to this beer" · "−1 to a beer of your choice"*) —
  one line, fires at the sail, nothing to track, and it would be the up-shift supply §10 keeps
  asking for.

**v5.6 “The Glut” — BUILT, and two numbers to watch:**
- **TOTALS AND MARGINS ROSE — and the cause I named here was WRONG (superseded 2026-08-24).**
  Winner totals **89.3 / 89.5 / 78.3** and margins **20.8 / 15.7 / 16.8** on the v5.6 read. I
  blamed the +3 open and Novgorod. The 1,500-game decomposition says otherwise: per-cask value
  is +6% for the winner, cask *count* is +18%. **`BOURSE_START` / `PRIZE_PTS` / `BOURSE_MAX` are
  not margin levers** — see THE LIVE ONE above.
- **A 6-ROUND GAME appeared at 2p** (min 6, band 83.3%). One outlier in twelve, but the clock
  is the empty tray and a richer early market means dice commit faster. Watch whether it
  repeats.
- **Does the shift engine beat the decay? NO — measured, 1,500 games (2026-08-24).** Glut steps
  **8.8 / 12.6 / 16.4** per game against up-shifts of only **3.4 / 4.3 / 5.7**. The track opens
  at **+3** and ends at **1.4 / 0.7 / 0.4** — at 4p the market finishes on the floor. Decay wins
  by roughly 3:1, so **holding a price up is not currently a buildable engine**, which is exactly
  what the depth lane needed. The up-shift supply (Venture public lines · the toll bench ·
  Bergen's prize) is **under-provisioned by about a factor of two**. This is the first place to
  look for the depth fix — and the queued *market line on the hull* (v5.7 watch below) would put
  the supply where every player already looks.
- **Is "concentrate and be first" legible at the table?** A 3-cask single-beer hull costs one
  step; a mixed hull costs one per beer. That is the Bourse saying *concentrate* while the
  Flight says *spread* — the intended fork. Watch whether players see it.

**THE FLIGHT COUNTERFACTUAL (measured 2026-08-23) — removing it is NOT enough.** *"I do wonder
if we removed the flight, would depth be more enticing?"* Measured with `FLIGHT=off` (the whole
ladder zeroed for **everyone**, 20 games × 2/3/4p, on the pre-Glut build):

| | depth ★ | field ★ | gap |
|---|---|---|---|
| 2p | 36.4 | 62.5–68.3 | **−28** |
| 3p | 46.4 | 60.8–73.5 | **−20** |
| 4p | 48.5 | 55.8–60.6 | **−9** |

With the Flight **fully removed**, depth still loses by 20–28★ at 2p/3p; only at 4p does it
approach parity. The field loses the ladder too, so the relative gap closes only by what depth
was *uniquely* missing — and the rest survives: **depth still ships 6.3–7.4 casks against the
field's 7.0–9.3.** The Flight was masking the delivery gap, not causing it. **The lever is the
per-cask value curve, not the ladder** (Gruit 1★ → Bock 5★ is linear while the *time* cost is
roughly 1:4 — quality is not paid for the wait). *Caveat: measured on the pre-Glut build; the
new market changes the arithmetic and this wants a re-run.*

**RULED AND BUILT — the Letter B decisions (ruled 2026-08-23; landed v5.6 “The Glut” /
v5.7 “Plain Sail”). Kept here as the record of what each line was asking for:**
- **THE BOURSE = PURE DECAY.** *"When a ship delivers casks to a kontor, each type of beer is
  moved down the track 1 space. The only time it goes up is with the bourse ±1, +1, or +2
  actions."* One step per beer TYPE per delivery — never per cask (the Lisboa rule: the event
  happened, move one). **The brew crash retires.** Up-shifts are **reserved to buildings and
  private (Venture) actions**.
- **EVERY PRIZE IS "THE PORT'S THING **OR** ★" — per cask, exclusive, always a choice.** The
  **2-goods consolation retires**: *"we don't need a fallback as the points are the fallback."*
  A 2-cask Bergen hull can take the specialist on one and the ★ on the other, both dice
  parking for the majority.
- **THE STRIP MOVES ONTO THE DESTINATIONS BOARD** — ONE track, spaces wide enough to hold every
  beer token; tokens are **colour-matched AND named**. The **Manifest deck well leaves that
  board** (*"it didn't really fit there anyways"*).
- **The Novgorod collision — RULED (designer, 2026-08-23): the others pay 2★ (`PRIZE_PTS`) and
  Novgorod goes to +3★/die.** Without it Bergen strictly dominated Novgorod: same-or-better
  payout, a lower minimum (2 vs 3), the richest majority (9/5/2), *and* an optional specialist.
  Novgorod is now the port that only pays money — and pays the most. Its +3★ is flat per die,
  not per-pip; the 2026-08-24 oracle clears it of the margin (bank is 2.1★ of a 22★ gap).

**COMPONENT-STATE VIOLATION — the Manifest claim (designer-confirmed 2026-08-23):** a card
prints three demand lines, each claimable **once per voyage**, and **nothing physical marks a
spent line.** With a 3-cask hull the table tracks spent lines in its head — the engine keeps it
in a UI-only `used[]`. That breaks the hard line (ruled 2026-07-12). Designer verdict: the
Order tiles had the same disease from the other end (*"we forgot to claim the bonuses much of
the game"*) and the whole layer — **Orders / Manifests / Invitations — reads as bolted on
rather than integrated**, so it gets its own pass later, not a patch now. The named direction:
connect a claim to something the game already does (the ⚜-to-sell-a-Ready-cask-to-a-brewhall
thread).

**THE LADDER HOLDS AT v5.7 — every rung, and a sample-size lesson.** journeyman > apprentice
**85.0%** (40) · trader > journeyman **62.5%** (40) · guildmaster > trader **68.8%** (80) ·
cellarmaster > guildmaster **87.5%** (16). *The MC rung first read **58.3%** on 24 games and
tripped the gate; re-run as 4×20 shards it came back 65 / 60 / 70 / 80%.* **A 24-game rung is
one game wide of the 60% bar — never call an MC rung failed on a single short shard; fan out
and pool.**

**DEPTH AT SCALE — the greedy-tier confirmation (full oracle, 600 games, 2026-08-24).** The
v5.7 lane read on the shipped build, `PERSONAS=1` × 200 per count:

| lane | win-rate | ★ |
|---|---|---|
| breadth | **53.4%** | 72.4 |
| majority | 49.7% | 71.5 |
| lifter | 39.6% | 65.9 |
| builder | 37.4% | 66.5 |
| **depth** | **0.4%** | **18.5** |

**Depth wins 1 game in 250.** The Glut did not rescue it, and the reason is now measured
rather than inferred: **the market falls about 3× faster than anyone can prop it** (the shift
entry above), so "concentrate and hold your price up" is a plan the component supply cannot
pay for. Note the same arithmetic at the top of the game: the *winner* out-earns second by only
**+6% per cask** and **+18% on cask count**. **Value is not what wins — throughput is** — and
depth is the lane that buys value with throughput. Any fix that does not move that ratio will
not move depth.

**THE DEPTH READ — the answer, across every tier (2026-08-23).** *"I'd love for there to be
an equally balanced point return on going all in on 1 or 2 beers instead of trying to brew all
5."* Measured with the new lane: **there is not, at any skill level.**

| tier | depth win-rate 2p/3p/4p | depth ★ | field ★ |
|---|---|---|---|
| trader (N=24) | **11.1% / 0% / 0%** | 38.8 / 36.4 / 41.3 | 61–80 |
| guildmaster, constrained (N=6) | **50% / 0% / 0%** | — *(pre-breakdown build)* | — |
| cellarmaster, constrained (N=4) | **0% / 0% / 0%** | 34.0 / 43.0 / 49.7 | 50–86 |

And the contrast that names it: **the same GM seats, free to abandon the lane, reached flight
4.0 beers in every count, scored ★71.8–74.8 and won 33–75%.** Specialization is not merely
weaker — **the strongest search available declines it whenever it is allowed to.**

**THE GAP IS NOT THE FLIGHT.** ★ by bucket (trader, deliveries/bank/majorities/flight):
field `37.6–43.0 / 8.4–12.3 / 12.7–15.3 / 11.3–13.7` · depth `22.0 / 6.8 / 3.2 / 0.0`.
The Flight is roughly **a third**; the largest bucket is **DELIVERIES, −11…−16★**. And it is
not "ships fewer casks" — depth brews 6.8–9.0 and ships 5.6–7.5, **par at 2p**. Its casks are
worth **~3.4★ each against the field's ~5.1★**.

**The mechanism (the finding that should drive the fix):** a seat committed to a quality beer
**cannot keep three vessels full** — a Q5 cask holds one for several turns — so it backfills
with the free Gruit (Ready at brew), and **a Gruit die is worth 1★**. *Specializing in quality
starves the pipeline, and the pipeline refills with the cheapest thing on the board.* The
levers, bluntest last: **the per-cask value curve** (Gruit 1★ → Bock 5★ is linear while the
TIME cost is ~1:4 — quality is not paid for the wait) · **the Flight cliff** (worth ~10★, real,
cannot close 28★ alone) · **vessel count / aging speed** (direct, and dangerous at a pace
already running 12–14 rounds).

*Instrument caveats, kept honest: samples are small at GM/CM (2–5 seats per lane per count);
`DEPTH_CAP` leaks — casks brewed before the seat commits can still ship, so some seats reach 3
styles (visible as `bock+gruit+hopped`), which makes the measured depth seats **less**
specialized than intended and the gap if anything understated.*

**THE MC TIERS REFUSE TO SPECIALIZE — an instrument finding worth keeping** *(the constraint
code retired with the lane, 2026-08-24; the lesson below is standing and applies to ANY future
lane the MC must respect — a paired depth×builder lane included).* The first
GM/CM lane read came back with depth at **flight 4.0/3.7/2.8 beers** — the cap never bound.
Cause: `aiMCDecide` picks by **sampled margin**, so a persona tilt is invisible to it; the
persona only flavours the rollout policy. Given the option, **the strongest search available
discovers that opening a third style scores better and takes it.** That is evidence about the
game, not just the harness — but it also meant the lane was measuring a broad seat wearing a
depth label. Fixed by CONSTRAINING the MC's brew options (a committed depth seat is offered
only styles it already ships), so the search must play the strategy in order to price it.
**Lesson: a persona that only tilts is invisible to a search tier — a lane the MC must respect
has to remove options, not weight them.**

**THE DEPTH LANE (v5.6, built 2026-08-23 — RETIRED by ruling 2026-08-24, its question
answered; kept as the record of what it was).** The PATHWAYS
lanes were majority · lifter · builder · breadth: **a seat for going wide and none for its
opposite**, so no lane read on record could speak to *"an equally balanced point return on
going all in on 1 or 2 beers."* `depth` is breadth's mirror (re-brew and re-ship the same beer;
prop its own marker; `DEPTH_CAP=2` ⚙ stops it opening a third style, or the free warm Gruit
drifts it back to breadth and the lane measures nothing). `PTIER=` reads the lanes at any tier.

**THE LIVE ONE — PACE, now that the family actually fires:**
- v5.5 shipped with three of eight Venture faces **dead** (`stopAvail` fell through on
  `vagel`/`vbrew2`/`vlift`). Fixed on the v5.6 re-read — and the corrected read is that the
  game runs **FAST**: 2p **12.0 rounds, 50% in band** · 3p **14.4, 91.7%** · 4p **12.8,
  83.3%**. Every out-of-band game is SHORT (min 9). Cause is structural, not a bug: the
  Warehouse (Age 2 + a load anywhere), the Great Copper (2 goods + a full brew) and the
  Lagering Cellar (die +1) are real engine faces, and an engine that fires commits dice
  faster. **The tray (13 ⚙) is THE dial and it is the designer's ruling — untouched.** The
  levers, in order of bluntness: tray size · thinning `vgold` (2 of 8 faces) · pricing the
  chained faces. **Measure at a human table before dialing** — a 12-round game that feels
  full is not the same problem as one that feels cut short.

**v5.5 “Four Hands” — the Venture family re-derived, every number unplayed:**
- **Does the FLIP make Ventures too cheap to spread?** Smokes show **FLIPS 1.9–3.6/game**
  vs overbuild climbs 0.6–1.0 — the intended reversal. But L1 placements also rose (4.1–6.8),
  so the wharf carries more rings than it did; watch whether the tide still finds bare ground
  to refill onto, and whether a 4p wharf goes all-Venture by mid-game.
- **Is overbuild now dead cardboard?** It survives for one job — a *different* theme's L2 on
  ground you hold. If a human table never once prefers it to a FLIP, the rule is paying rent
  it doesn't earn and should collapse into the FLIP alone.
- **`Assay Loft` at 2 `H` → EVERY maturing cask.** The buff is deliberately steep and scales
  with cellar width; the greedy bots barely reach for it (**assay 0.0/game** in smokes — they
  don't hold casks long enough to have a cellar to certify), so this number is **unmeasured,
  not proven safe**. The human table is the instrument here.
- **`Staple Rights` at +2★.** Staple★/player runs 0.3–0.5 in smokes, so the doubling is not
  yet visibly moving totals — but the bots also under-pilot the deep lines it rewards.
- **The chained faces** (`Warehouse` Age 2 → load anywhere; `Great Copper` 2 goods → brew):
  two-step owner lines are new to the family. Watch them at the table for turn-length drag,
  the thing the primary/alternate split was meant to avoid.

**v5.4 “The Tide” — the new economy, every number unplayed:**
- **Does the wharf strip too hard at 4p?** Smokes end with **1.4 works standing / 0.6 in
  the bag** at 4p. That is the intended arc (bare ground for the Ventures) but a wharf with
  no Kiln late may lock Q2 beers out of Novgorod entirely — watch whether the quality ladder
  over-corrects.
- **Bag size vs player count.** 13 tiles serve 2p comfortably (4.6 left) and 4p barely
  (0.6). Consider a count-scaled bag, or accept that 4p is meant to run the wharf dry.
- **The Staple Houses now pay once and go.** Watch whether a one-shot destination premium
  still reads as worth steering toward, or becomes a lottery on where the hull happened to sit.
- **The cleared-ground window** (the gap holds until end of turn): does anyone actually
  claim it with an L1, or is the refill too fast to matter at the table?
- **Open 1 Venture at Q2+** — 2 tiles in Hopped's 12. Watch for the opposite failure: too
  many Ventures too early, and the wharf full of rings by round 6.
- **PACE, the live one.** v5.4 cost ~1 round at 4p (**14.5**, band 96.7%) and dropped 2p to
  **90%** in band. **v5.5 re-read (24×3):** 2p **18.8 / 100%** (recovered and then some),
  3p **15.3 / 95.8%**, 4p **14.8 / 91.7%**. Every out-of-band game is a **short** one
  (min 11) — nothing runs long. So the watch narrows: the multiplayer counts still finish
  ~1–2 rounds fast, and the cause is unchanged — the public-line goods faucet scales with
  the Venture population (**28.2 goods freebies/game at 4p**, and v5.5 puts more rings on
  the wharf). Two candidate levers if a human table agrees it runs hot: the **tray size**
  (the ruled pace dial; the v5.2b sweep already recommended 14) or **thinning `vgold`**,
  which still prints on 2 of 8 Venture faces. Measure before dialing — **no dial was touched
  in v5.4 or v5.5.**

**v5.3 “The Bourse” — every number unplayed:**
- **The track ends** (−1…+3): does +3 cap too low under 4p volume? (smoke end-avg +2.1 at
  4p — the market may run hot).
- **Bulk-rise-then-score:** a single-cask sail still pumps its own price +1 — watch
  solo-Skute pump-and-sell.
- **The public-line goods faucet** (7–47 freebies/game in smokes — watch inflation; vgold
  prints on 3 of 8 faces).
- **The Bergen shift** (±1 per delivered cask — a 3-cask sail moves the market 3; cap per
  sail?).
- **The furniture draw** (3–4 random tiles = the whole public wharf — watch feel-bad
  deals: no-Kiln games, double-ephemeral games).
- **The open ground at 4p** (16 venture tiles vs 8 slots — the redevelopment rule fires
  often; never-replaceable rival L1s may lock ground).
- **The runway loosening** (no dice to buildings — pace re-measure vs the pool-14
  question; the retired investor lane's ~4–8★/player redistributes — watch winner totals).
- **The toll bench** (v5.3b): does the loader's ±1 read at the table, and does the
  Tollhouse finally see traffic? **Re-read this one from scratch** — until 2026-08-23 the
  sim's `toll` counter watched the retired stamp's `bankO` and reported 0.00 every game, so
  every "the Tollhouse never fires" reading on record is an instrument artifact, not
  evidence. The counter now counts bench firings.

**Carried from the v5.2b oracle:** the have/have-not gap (0-build seats) · the London
prize's pull (builds ran 86–94% prize-channel) · Source-3 pace both ways · the Bergen
consolation faucet (a seatless slam-load pays 6 goods) · whether the *Brew 1* tiles cool
at top-tile · Weigh House/Ropewalk/Staple fire rates (the Tollhouse got its rework;
these still wait).

**Carried from the v5.1r oracle (skill-level reads):** the 2p majority lane (79–82% —
the sharpest lane in the game) · the 2p GM ceiling (30% of skilled 2p games hit
MAX_ROUND 25) · the 3–4p greedy seat gradient (human table decides) · **Novgorod dead
25–27% at 2–3p under skill** (the standing fourth-Kontor-at-two thread).

**Standing:** 2p texture (the thinned interaction set) · the Manifest schedule (claim
rates, die-6 reachability, Bruges' traffic share) · **the Jopenbier value question**
(Bock reaches face 6 in one turn for less — what the capstone buys is the sixth Flight
step, Kiln-independence and 8★ at Novgorod; options recorded: as-is / cheaper brew / a
printed Danzig perk) · the Tastings at a human table (the slam share 43% · the Hall
bidding Novgorod's ripe dice — the designed tension) · the greedy tiers are
robustness/pace oracles only (strategy reads = MC tiers + probes + humans).

---

## 11. Glossary (v5.3b)

- **The Wharf** — the whole core area: the four stations + the 8 slots.
- **Station** — one of the four action spaces (Market · Brewhouse · Cellar · Harbor),
  each printing a **PRIMARY** action (your worker here) and an **ALTERNATE** (the line's
  other station).
- **Slot** — one of the 8 perimeter spaces; seats **a building and/or a ship** (≤1 of
  each) — never casks.
- **Line** — a row or column: its two stations + their two slots (the whole activation).
- **The quality die** — THE component: set at brew to the cask's printed **start value**,
  turned up by age points (**READY at the quality**), lifted past it only at load (cap 6),
  read by **gates** as it boards, **parked at the kontor** on delivery — pips (+ the
  Bourse marker) = the banked ★, body = presence, majorities and the clock. 13 per player
  ⚙, public — it never turns on its own, and **no die ever stands on a building.**
- **Cask** — a brewed beer in two states: **maturing** (private vessel) → **delivered**
  (boarded, sailed, parked). Its printed action is a **load bonus**, fired as it boards.
- **Public Work** — the shared brown family: die-less furniture (3–4 stand from setup;
  the rest are **the bag**). Passive on its own slot's traffic; free to use; nobody builds
  or owns one. **The tide takes every one of them** — a Ship sailing from its slot carries
  the tile off, boxed and never recycled — and the bag re-furnishes the wharf at end of
  turn until it runs dry. A full wharf also lets an L1 redevelop one.
- **Venture** — the private family and the only one players build: the identical **hand
  of 4 dual-use tiles** (L1 face / L2 face — one cardboard), ringed in the owner's
  colour, no die. Every face prints a **public line** (for whoever activates the line)
  above the ringed **owner line**. L1 on any open slot (wharf full → replace a Public
  Work; never a rival's); L2 only over your own L1.
- **The Bourse** — the beer-value track (−1…+3 ⚙): one price marker per in-play beer
  except Gruit & Jopenbier. Delivery = die + marker; arrivals lift +1/cask before
  scoring; brews crash −1; Bergen/public-lines/the toll bench shift it (**±1 and ±2** —
  v5.4 gave the up-only line its brake).
- **Manifest** — the demand card riding every non-Bruges Ship: three lines, each
  claimable once per voyage by a delivered cask; the card recycles pristine.
- **Specialist** — the private seat tile (15 designs ⚙: the core 5 at max(2, n−1) copies
  + the 10 guild singles; 2 seats), a **station superpower** — earned free as Bergen's
  prize (per cask) or at its printed fee via the load bonus.
- **Ship (Skute · Cog · Hulk)** — neutral destination-bound hulls (1/2/3 berths);
  **commission** at the Harbor (the printed fee 2/1/0 `G` + one free load; no ★); a hull
  **sails the moment it is full** — a Skute on its first load (the relief valve as a
  component).
- **Kontor** — a delivery port (Bruges · London · Bergen · Novgorod): a gate (a die
  read) · value = the die + the Bourse · a prize · a majority.
- **Presence / bump** — your parked dice at a kontor; a **bump** parks a tray die at face
  1 (1★ · presence · clock), only where you've delivered, only through casks.
- **The Flight** — distinct beers **SHIPPED** (the recipe cards on the board's COMPLETED
  side, moved on the beer's first LOAD): (beers−1)², min 3.
- **The clock** — the first **EMPTY TRAY** (every die committed) sets the final round;
  sails end nothing (`MAX_ROUND` 25 ⚙ the backstop; the 13-die pool ⚙ is THE pace dial).
- **TABLED (seams kept)** — the Trade Roads · the investor/maturity grammar · the
  RIDER_SCOPE dial. (The Tollhouse stamp's seam left the engine 2026-08-23.)
