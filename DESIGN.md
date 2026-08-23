# Brewhouses of the Hanse — Design (live build v5.3b “The Bourse” on the v4.0 spine)

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
|**Status**     |**v5.3b “The Bourse”** — live (`play.html`, KEY `hanse-v53b`; designer-ruled 2026-08-22, records `archive/records/V53-BOURSE.md` + `V5-DECISIONS.md`). The v5 line in one breath: **v5.0** opened the wharf (census stacks · Manifests · primary/alternate stations), **v5.1** made buildings riders and specialists station superpowers, **v5.2** split the buildings into two families (shared PUBLIC WORKS · private dual-use VENTURES), and **v5.3** made the Public Works die-less setup furniture, gave every Venture face a public line, opened the ground to L1s — and put the **beer-value BOURSE** at the middle of the economy (delivery = die + track · bulk rise then score · brews crash their own price). **v5.3b** reprints the Tollhouse as the toll bench (a load there shifts any Bourse marker ±1). Details: §9; watches: §10. |

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

## 6. The current architecture (v5.3b “The Bourse”)

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
  action.** **PUBLIC WORKS** (brown, die-less **setup furniture**): 3 (2p) / 4 (3–4p) ⚙
  random tiles stand from setup on random slots, the rest to the box — nobody builds one,
  nobody owns one, no die, no fee, no maturity; passive on their slot's traffic (Kiln ×2
  die+1 · Tollhouse toll-bench Bourse ±1 · Customs −1 minimum · Ropewalk cross-quay load ·
  Cooperage +1 berth +1★/load · Weigh House 2 Manifest lines · Staple House ×4 matching-sail
  +2★ ⚙ · Bonded/Victualling ephemerals). **VENTURES** (private, the owner's colour ring,
  NO die — the only family players build): the identical **hand of 4 dual-use tiles**;
  **every face prints a PUBLIC line** (age +1 · +1 good · Bourse ±1/+2▲ — a free stop for
  whoever activates the line) above the ringed **owner line** (the owner collects both);
  **the open ground:** an L1 takes any open slot — wharf full → it may replace a Public
  Work (boxed) — never a rival's tile; an L2 only over your own L1 (the spent L1 boxed);
  fees grain-only (L1 1 `G` · L2 2 `G` ⚙; London's prize waives).
- **THE BOURSE** — one track (−1…+3 ⚙), a price marker per in-play beer except Gruit &
  Jopenbier, start 0. Delivery = **die + marker** (floor 0); **bulk rise then score** (a
  landing Ship lifts each beer +1/cask first); every **brew crashes its own beer −1**;
  shifts ride Bergen's prize (±1/cask), the Ventures' public lines and the toll bench —
  never a new action. The market is the negative-feedback loop pricing the loosened
  economy: the wharf's own volume moves it.
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
  + the Flight ((shipped−1)², min 3) + the printed end-lines (Alderman · Guild Residence).
  Tiebreak: vessel dice, then goods.
- **The clock — the quality dice alone:** the first **EMPTY TRAY** (a player's last die
  committed — parked, in a vessel, aboard an unfilled hull) sets the final round; dice
  never return, so the runway is public and countable (**13** ⚙; `PRES_POOL` = THE pace
  dial); MAX_ROUND 25 backstop. Sails end nothing. Pace target ~12–25 rounds.
- **TABLED (seams kept):** the Trade Roads expansion (`registerExpansion` spine intact) ·
  the v5.2 investor/maturity grammar (`bldgTick`/`bldgDepart` inert) · the Tollhouse stamp
  choice point (dormant) · the RIDER_SCOPE dial (0 = print).

## 7. The tooling (how we verify)

- **`playtests/verify-v4.js`** — the targeted rule battery (§-per-system; 351 checks at
  v5.3b). Runs in seconds; **always** after an engine change.
- **`playtests/sim.js [N]`** — drives the *canonical* `play.html` engine headlessly
  (extracts the script, runs it in a Node `vm`, appends a bot in-scope — the engine's own
  in-page AI). The **robustness/pace gate**: 0 crashes / 0 deadlocks across 2–4p, pace in
  the 12–25 band. Env hooks: `TIER=` · `PERSONAS=1` (the PATHWAYS lane oracle) · `POOL=` ·
  dial hooks (override-only-if-set — a ruled default is never silently forced off).
- **`playtests/strategy-probe.js`** — the skilled-play oracle instrument (GM/CM corpora,
  openings, timing, lane reads). **`playtests/flow-probe.js`** — the turn-level
  economy/decision oracle.
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
  Tollhouse finally see traffic?

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
- **Public Work** — the shared brown family: die-less **setup furniture** (3–4 random
  tiles stand from setup; the rest boxed). Passive on its own slot's traffic; free to
  use; nobody builds or owns one. Ephemerals sail away; a full wharf lets an L1
  redevelop one.
- **Venture** — the private family and the only one players build: the identical **hand
  of 4 dual-use tiles** (L1 face / L2 face — one cardboard), ringed in the owner's
  colour, no die. Every face prints a **public line** (for whoever activates the line)
  above the ringed **owner line**. L1 on any open slot (wharf full → replace a Public
  Work; never a rival's); L2 only over your own L1.
- **The Bourse** — the beer-value track (−1…+3 ⚙): one price marker per in-play beer
  except Gruit & Jopenbier. Delivery = die + marker; arrivals lift +1/cask before
  scoring; brews crash −1; Bergen/public-lines/the toll bench shift it.
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
  Tollhouse stamp · the RIDER_SCOPE dial.
