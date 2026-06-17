# Brewhouses of the Hanse — Design (v1.0 “Living Slots”)

> The working design doc: **why the game is the way it is**, the **current architecture**, the
> **change log**, and the **balance lessons** carried forward. Operational rules live in
> `RULES.md`; the manifest in `COMPONENTS.md`; the active plan in `PLAN.md`.
>
> **This file was compacted (2026-06-16).** The full pre-v1.0 design record — every dated
> session log, the v0.5/v0.6 reach-vs-standing architecture, the blow-by-blow v0.7→v0.16
> epilogues, and the old standalone `CHANGELOG.md` (now folded in below, §9) — is preserved
> verbatim in **`archive/v0.16/DESIGN.md`** and the **`archive/main-v0.16.1`** branch. Nothing
> is lost; this is the slim, current version.

---

## 1. Snapshot

|               |                                                                                   |
|---------------|-----------------------------------------------------------------------------------|
|**Players**    |2–4                                                                                  |
|**Length**     |≈ 45–60 min at 2p · medium                                                          |
|**Genre**      |Medium euro · engine building · shared action grid (the Wharf) + private brewery    |
|**Weight**     |*Great Western Trail / Distilled* — not Lacerda                                     |
|**Theme**      |A merchant brewing house in the Hanseatic League, c. 1350                           |
|**Status**     |**v1.0 “Living Slots”** — design locked into the specs; the **`play.html` rebuild is the next step.** The last *playable* build is v0.16.1 (`archive/play.html`). |

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

- **No dice** — fully deterministic; the managed-uncertainty seat is the *steerable* variance of
  the building/recipe displays and the cask-action draw (Orléans-lite), not randomness.
- **No cards-as-hand** — all cardlike content is tiles (the action system is on the board).
- **No money** — pre-modern barter: **goods (grain `G`, hops `H`) are the only currency;**
  reputation/standing is earned, unspendable score.

## 4. Theme & who you are

c. 1350, the Hanse at its height; Hamburg was literally *"the brewhouse of the Hanse."* The
pivotal innovation is **hopped beer**, which (unlike perishable gruit ale) survives a sea voyage
— a preservable, shippable export. You run a **merchant brewing house**: source grain & hops,
brew, age, and push casks across the Baltic/North-Sea network to the great trading posts
(**kontore** — Bruges · London · Bergen · Novgorod) for value and majorities, or withdraw your
finest into the local guild **Hall** for prestige. The deeper axis is **reach vs reputation**
(industrial Leffe vs Trappist Westvleteren), pulled back into the 14th century.

---

## 5. Design lineage & comps

The target depth and the lessons we steer by (the soul-review the designer ran early in v1.0):

| Comp | Its soul | What we take |
|---|---|---|
| **Lisboa** (Lacerda) | a relentless multi-use squeeze + system interlock | the **cask squeeze** as the soul; the **living slots** as the interlock |
| **Great Western Trail** (Pfister) | a player-built track; tempo; win by several engines | **owned buildings author the shared board**; the **five lanes** |
| **Orléans** (Stockhausen) | steerable variance (bag-building) | the **building/recipe displays + cask-action draw** as managed, not random, variance |
| **Agricola** (Rosenberg) | one rule → a whole decision economy; scarcity/blocking | scarce **vessels/slots/ships** + the **occupancy toll** + clogged-vessel back-pressure |
| **Wingspan** (Hargrave) | a compounding engine; a content spine; "one more turn" | **transform-buildings** + a **building deck** of content under one grammar |
| **Obsession / Viticulture / Unconscious Mind** | theme-mechanism fusion; an approachable bridge | hopped-beer-as-cargo + the **legible scoring spine** |

**Differentiation:** "monks/houses brew beer" is occupied (*Ora et Labora*). Our distinct
ground is the **economic philosophy** — reach-vs-reputation across a beer-trade network —
expressed through the **dual-role cask** and the **player-authored living slots**.

---

## 6. The current architecture (v1.0 “Living Slots”)

Canonical detail is in `PLAN.md` / `RULES.md` / `COMPONENTS.md`; the shape:

- **The Wharf** — four stations (A Market·Source → B Brewhouse·Brew → D Cellar·Age →
  C Harbor·Ship) ringed by **8 slots**. Move orthogonally, activate a row/column, resolve up to
  4 stops (slot·station·station·slot); occupancy toll (or the **Floor**, below).
- **The dual-role cask** — quality Q1–Q5 + a slot-action; three states: maturing (private) →
  deployed (public, contestable) → delivered (scored, gone).
- **The keystone — living, composable slots.** A slot holds a **building** (owned modifier) and
  an **occupant** (a cask, or a ship that holds casks): *dock → building → ship → cargo.* A
  building, under one grammar — *"it modifies the occupant docked on it"* — either **boosts a
  delivery's value** (the variable "demand") or **transforms** the occupant (quality / cargo /
  route). **Owned-but-shared:** the owner benefits most; rivals may route through for less + a
  small points "wharfage." Buildings replace v0.16's goal tiles, neutral buildings, and most
  upgrades — one content family under one rule. **A line is half-fixed (its two stations) and
  half-emergent (its two slots), so your engine *grows into the board*** — placing a building
  beside a high-traffic line is the core optimization (the heart of v1.0).
- **Legible scoring.** *In-game:* **Hall enshrine = fixed** (the beginner floor) · **kontor
  deliver = variable** (base + the value-buildings shipped through). *End-game:* **majorities**
  (delivered-cask count) + **the Flight** (distinct quality tiers, (tiers−1)²).
- **The five lanes — each a complete path** (no half-measures; braiding emerges, it isn't a
  goal): **Prestige/Hall · Demand/value · Volume/majority · Range/Flight · Authorship/engine.**
- **The Floor** — a private line you may run instead of a grid line, powered by your built-up
  brewery (engine payoff + the boutique brewer's self-sufficiency; `PLAN.md` §1B).
- **Kept from v0.16:** ships sail-when-full; the Charter relief valve (scarce contracts); the
  Sailed-Ships end clock; the no-dice/cards/money constraints.

---

## 7. The tooling (how we verify — unchanged through v1.0)

- **`playtests/sim.js`** — drives the *canonical* `play.html` engine headlessly (extract the
  script, run in a `vm`, append a bot in-scope). The **robustness/pace gate**: 0 crashes / 0
  deadlocks across 2–4p, pace in the 12–25-round band. `PERSONAS=1` / `CELLAR=N` commit bots to
  the lanes (the **strategy** oracle — the greedy bot can't judge leans). `sim-analyze.js` =
  openings/timing/sequencing.
- **AI seats** (`AUTOMA.md`): Apprentice / Journeyman / Trader / **Guildmaster** (flat Monte
  Carlo over the engine itself). Gates: `ai-ladder.js` (every higher tier ≥60% at 2p) +
  `ai-render-smoke.js`. `ai-tune.js` (CEM over the Trader weights) re-runs after a balance pass.
- **After any engine change:** bump the save `KEY`, run the gates, save the sim output, publish
  to `main`. *(These harnesses target the v0.16 engine; they'll be re-pointed as v1.0's
  `play.html` is rebuilt.)*

---

## 8. Balance lessons carried forward (the distilled gold)

Hard-won across v0.9→v0.16; they constrain every future change:

- **"No pure path wins."** Balance the *leans*, and measure them with **persona-committed bots**
  (`PERSONAS`/`CELLAR`), never the greedy bot — which is a robustness/pace oracle only and
  systematically under-pilots prestige & deep.
- **Correct *friction* with a *structure* lever, not the *value* lever.** (v0.15: a free local
  Enshrine was fixed by a *structural* throttle — deploy-first, contestable — not a fee.)
- **Bock cost is the WRONG rebalance lever.** The 3G3H probe was tested and rejected twice (it
  re-breaks Q5 reachability and the AI ladder, and doesn't fix the imbalance). The real axis is
  **Hall-side vs kontore-side.** Bock is ungated at **3G2H** (one hop was the whole wall).
- **Majorities reward shipping WIDE** (presence = cask count) — "go for majorities" is a *volume*
  play, not a concentrate-on-one specialist. Big majorities tilt the game to the kontore, so the
  **Hall needs a matching prestige curve** to stay balanced.
- **When the incentive is backwards, find the rule that inverted it** — don't pile on relief
  valves. (v0.16: three patches collapsed into one loop once benefit went back to delivery.)
- **A "sail full" rule structurally lengthens the game;** the clock (`SAILED_CAP`) is the
  round-count lever, not the ship rules.
- **Fixed turn order has a real first-player edge;** **seat compensation (+1 `G` per later seat)**
  + free opening placement flatten it.
- **Content, not rules.** Depth belongs in placement/timing/interaction and a deck of content
  under one grammar — not in action complexity (the v0.7 reel-in is the founding lesson).

---

## 9. Change log (compact — full rationale in `archive/v0.16/DESIGN.md`)

**v1.1 (IN DESIGN — the differentiation pass)** *(2026-06-17)* — Design review (the designer's read):
with steerable brew piles, beers now differ **only by quality + cost-mix**, so the two Q3s
(Broyhan/Keut) are interchangeable and London/Novgorod collapse into "a building + a similar
majority." The fix — **differentiate by ROLE**: each kontor rewards a different axis, each beer
serves one. Decisions captured (to build as one pass, sim-gated — persona + oracle):

- **Kontor identities — four unique benefits, four lanes:**
  - **Bruges (Hub)** — Q1 gate, **2 goods** (liquidity), low flat value → the *economy* lane.
    **No quality ceiling** (decided): a premium cask at Bruges still earns the Flight (beer-type,
    quality-blind) + majority (count, quality-blind); only the *value* premium is forgone — a real
    tradeoff, not waste. The steep value gradient + the Charter/Enshrine relief valves (anti-strand)
    make floors-only the right call; verify in sim that high-Q→low-value is rare.
  - **London (Steelyard)** — Q2, **take a Building and place it on arrival** (free, immediate — the
    *only* place gaining-and-placing is one step; elsewhere it's to-hand) → the *engine/authorship* lane.
  - **Bergen (Bryggen)** — Q2, **a free Reach** (+1 presence, any kontor) on delivery; the big **9/5/2**
    majority is the draw → the *majority* lane (the benefit compounds the majority you chase).
  - **Novgorod (Peterhof)** — Q3, **a free recipe** (exotic styles) + value **scales with quality**
    (Q3→2 · Q4→4 · **Q5→6**) → the *quality climb* lane; finally the reason to brew Bock.
- **Beer niches (steerable piles KEPT):** Gruit = fuel (keep). **Hopped → fast (ready 1)** (quick Q2
  engine access; sharpens "brew now vs hold"). **Broyhan → fast Q3 (ready 1)** (the rush/tempo Q3).
  **Keut → the specialist** — *open fork:* a light **+1-presence** perk (the majority beer) **vs**
  **set-collection** (escalating value, rewards going all-in). **Mumme/Bock** = the climb, paid by
  Novgorod-scaling + the Hall + the Flight. Creates the **broad-vs-deep** axis (5 beers → Flight, or
  one beer flooded into a kontor).
- **Trade-factors (presence markers) — a finite PERSONAL supply (~8–10 ⚙, sim-tuned):** *your delivered
  casks already ARE your presence — this just caps the supply and routes Reach through it.* A **kontor
  delivery** and a **+1 Reach** (Bergen benefit / Keut perk / Reach action) each place **one**; the
  **Hall needs none**. Out of markers → you can only Enshrine or stop contesting kontore. Payoffs:
  (1) gives "+1 presence" a **real cost** (kills the Reach-snowball worry — Reach now trades a future
  delivery for present standing); (2) sharpens **kontore (finite) vs the Hall (unlimited)** with a
  built-in **pivot to prestige** once your standing is spent; (3) caps the volume lane. **PERSONAL CAP
  ONLY** (decided) — *not* an end-trigger; the Sailed-Ships clock stays the single, tuned pace dial. The
  *"last marker → final round"* dual-trigger is a **deferred** option (revisit only after the cap is simmed).

**v1.0 build + first tune (`play.html` KEY v47→v49)** *(2026-06-17)* — The keystone `play.html` rebuild
shipped (two-layer slots; building-driven kontor value; goals/neutrals/most upgrades folded into the
Building family; London/Novgorod → a free Building; steerable brew piles; the Floor; private
improvements). Then two follow-ups: **(a)** *owned-but-shared made real* — a rival routing through your
value building now banks a **reduced** bonus (half) and hands you the **wharfage** (RULES §5b), and the
bots were repointed to **author + route** their own value buildings (the demand lane now self-pilots, so
the lane reads are honest); **(b)** *first balance dial* — the **Hall ladder trimmed 4/6/8/10 → 3/5/7/9**.
The committed-persona PATHWAYS report had the **prestige** lane hot (3p ≈ 50%, fair 33%); the single Hall
trim pulled it back to ~fair and tightened the five lanes across 3–4p (prestige now the slightly-lower,
higher-variance lane *by design*). One dial, sim-gated — per the lessons (§8). *(Guildmaster sims must be
**sharded** — ≤20 games/shard, multiple shards per player count, run in parallel; notes in
`playtests/ai-ladder.js` & `sim-analyze.js`.)*

**v1.0 “Living Slots”** *(2026-06-16)* — The design graduates to **1.0**, locked into the specs
(`RULES.md` / `COMPONENTS.md`); the `play.html` rebuild is the next step. Reset to the bookmarked keystone after a
demand-board detour was tried and abandoned. **Living, composable slots:** owned **buildings**
modify the casks/ships docked to them (one grammar; value-boost *or* transform; owned-but-shared
wharfage), folding goals + neutral buildings + most upgrades into one family. **Legible scoring:**
Hall fixed / kontor variable (building-driven) / majorities + Flight. **Five lanes as complete
paths** + the **Floor** (private line). v0.16 fully archived; top-level files version-stamped
v1.0. See `PLAN.md`.

**v0.16.1** — Bruges/Bergen liquidity = 2 goods of the owner's *choice*; brewing vessel cap 4→3.
**v0.16 “Full Ships”** — Ships **sail only when full** (partial early-launch retired); destination
benefit **and** points seal **on delivery**, in load order (numbered berths); the **Charter** is
gated by a **scarce contract** (start 2, buy `1 G`, flat `2 G` fare — retiring the escalating
fare row). Fixed a backwards incentive (benefit-on-load → never sail).
**v0.15 “Enshrine”** — The **Hall goes local**: Enshrine a deployed Q2+ cask for prestige, no
boat. Throttle is **structural** (deploy-first, contestable), not a fee; ladder re-trimmed to
**4/6/8/10**. Ships/Charter kontore-only. Added **Trophy Room** + **Patron's Favor**. Revived the
under-powered volume lane.
**v0.14** — **Bock un-gated** (3G2H, the Aging Cellar a pathway not a gate) → the Q5 climb
reachable. Pathways resolve to **contested kontore vs the uncontested Hall**; 3G3H probe rejected.
**v0.13** — **The Flight** (range: (tiers−1)², min 3) + **the Masterpiece** + a majority cooldown
— making the quality climb pay.
**v0.12 (.1–.3)** — Rival-loading restored (tactical denial); **variable cask actions** drawn at
brew (decoupled from quality); **Gruit pinned to Source**; **upgrades earned-only** (no goods-buy);
**Hall = printed ladder**; clock re-centered to 7/11/14.
**v0.11 (A & B, .1–.3)** — **Neutral, destination-bound ships** off a shared deck (commission →
load → sail); **ship market of 3**; deck → 20 hulls. Batch A: Towncrier reined in, charter-fare
experiments, the **export premium**. (Printed destinations *removed* a strategy axis → the Trader
rebuilt around "which hull to feed.")
**v0.10** — **Big tiered majorities at every kontor** (Bergen 9/5/2 the anchor); per-cask values
cut so points live in the majority race; Hall bumped to balance.
**v0.9** — **Tiered, ranked majorities** (2p skips 2nd); the **London = engine / Bergen = majority**
split; **seat compensation**. The "prestige is marginal" worry was a greedy-bot artifact (fixed by
persona bots).
**v0.8** — Occupancy toll (the de-rondel dial); the **“Wharf” naming**; export beers carry
**fixed quality, deal 3 of 4**; all six neutral buildings.
**v0.7 “The Wharf”** — A ground-up **reel-in to GWT/Distilled weight** (≈ half the rules cut).
The four-station loop, the dual-role cask in three states, **destinations replace the two value
tracks**, deliver→earn-upgrade, the **Charter** relief valve, the **Sailed-Ships** clock. Cut: the
demand market, type frontier, Fairs, route lanes, the Hall-as-a-station, working-cask Floor, twins,
aging cubes.
**v0.1–v0.6** *(the Lacerda-grade origin, superseded by v0.7)* — The shared 2×2 action grid, the
double-sided cask (working ↔ enshrined), reach-vs-standing tracks, a demand market, the Brewhouse
Floor, recipe cards, ships-as-single-use-carriers. Too much game; the right amount of theme — which
the v0.7 reel-in resolved.

**Tooling milestones:** the headless `sim.js` harness + persona/Cellarmaster lean probes; the
4-tier AI ladder (Apprentice/Journeyman/Trader/**Guildmaster** flat-MC); `sim-analyze.js`;
`ai-tune.js` (CEM). All drive the canonical engine, so every rules revision is absorbed
automatically.

---

## 10. Glossary

- **The Wharf** — the whole core area: the four stations + the 8 slots.
- **Station** — one of the four action spaces (Market · Brewhouse · Cellar · Harbor).
- **Slot** — one of the 8 perimeter spaces; holds a building and/or an occupant (cask/ship).
- **Line** — a row or column: its two stations + their two slots (the 4-stop activation).
- **Cask** — the dual-role tile: quality + a slot-action; maturing → deployed → delivered.
- **Building** — an owned slot tile that modifies the occupant docked on it (value or transform).
- **Wharfage** — the small points cut a building's owner takes when a rival routes through it.
- **The Floor** — your private line: run your built-up brewery instead of a grid line.
- **Kontor** — a foreign trading post (Bruges/London/Bergen/Novgorod); ship there for value +
  majority.
- **The Hall** — the local guild hall; **Enshrine** a cask there for fixed prestige (no ship).
- **The Flight** — the end-game range bonus for distinct quality tiers delivered.
- **The lanes** — the five complete paths to victory: Prestige/Hall · Demand/value ·
  Volume/majority · Range/Flight · Authorship/engine.
