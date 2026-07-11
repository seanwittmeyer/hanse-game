# v3-thoughts — a fresh-eyes read on the table pass

> **Who wrote this and from what.** An outside consultant's exploration, answering the designer's
> two-theme brief (station complexity / the slot stack) plus the Floor and paths-to-victory
> questions. Evidence base: `RULES.md`, `COMPONENTS.md`, `DESIGN.md` (incl. the §8 balance
> lessons, which I treat as canon), the `play.html` engine (line cites throughout), the printed
> kit (`printables2.html`, `index.html`), the 30-game v94 AI corpus
> (`playtests/logs/REVIEW-NOTES-v94.md`), the v92 review (`REVIEW-NOTES.md`), all three human
> logs (`playtests/logs/human/human-2026-07-11-g*.log`), and three raw play-by-plays
> (`pbp-2p-1.log`, `pbp-3p-2.log`, `pbp-4p-5.log`). No prior internal exploration was consulted.
> Every number I propose is a ⚙ placeholder.

---

## 0. The executive read

The game underneath is good. The demand lane works when piloted (v94 synthesis D), interaction
is the healthiest system (v94 synthesis E), humans use the Floor exactly as designed
(`human-g2:66`), and the building deck genuinely makes plays differ. The table cost is not the
*game* — it is four specific accounting behaviors layered onto it:

1. **The turn serializes two full station menus plus two slot stops**, and a large fraction of
   those stops are dead. 10–13% of every raw log is a fizzled sub-stop ("no Ready cask to
   deploy", "nothing to load") — 106 of 1,157 lines in `pbp-4p-5.log` alone.
2. **The slot stack is a dozen physical pieces pretending to be two layers** — and the one
   component that exists *only* to remember deferred arithmetic is the demand die. The engine
   itself never stores a die: it re-derives the value at delivery (`play.html:1710–1722`). The
   physical die is a memory crutch for math the components don't carry.
3. **Verbs don't act where they stand.** You fire a Deploy stop on one line and place the cask
   anywhere on the wharf (`play.html:918, 1533`); you fire Load at the Harbor and reach any cask
   and any ship on the board. The player who called this confusing was right — the stop and the
   place are decoupled, which is exactly why the wharf reads as "a lot going on."
4. **The second act starves.** Multi-cask shipping is an early-game phenomenon; the back half of
   3p/4p games is carried by enshrines, charters, and Floor grinding, and in the sampled full
   games the Sailed-Ships clock *never filled* (`pbp-3p-2` ended R25 at 9/10; `pbp-4p-5` R25 at
   11/13). Majorities then read as the primary goal because they're the only *visible, contested*
   score left on the table.

The recommended package (§6) is one coherent move: **make every stop act where it stands, and
make every point bank the moment it is earned.** That single stance answers both themes — it
collapses the station menus to printed this-or-that faces, restores deploy/load to the activated
line, deletes the demand die without deleting the demand *lane*, and frees the Floor to become
the deliberate one-turn tension the brief asks for. The printed board is already most of the way
there: `printables2.html:1438–1442` prints station faces *simpler than the rules actually are*
(no charter icon at the Market, no Tap icon at the Cellar). Build the game the board already
prints.

---

## 1. Diagnosis — where the table cost actually lives

### 1.1 The turn is two menus deep, and half the stops fizzle

Measured from the engine (`STATION_ACTS` at `play.html:549–554`, handlers cited inline):

| Station | Raw menu | Concrete clickables | Nesting |
|---|---|---|---|
| **A Market** (`play.html:1301–1349`, render `3096–3103`) | 8 items: 3 goods-mixes + 4 acquire categories + skip | ~15 (3 mixes · ≤3 recipes · contract · ≤3 hulls · ≤4 buildings) | Commission spawns *two* sub-menus (placement `1421–1433`, free-load `1438–1453`); a building buy spawns placement incl. overbuild (`1379–1389`) |
| **B Brewhouse** (`1457–1544`) | 2 phases, brew AND deploy | ≤6 recipes, then Ready-casks × open-slots | Deploy targets all 8 slots + spoilage targets |
| **C Harbor** (`1810–1855`, render `3104–3125`) | 3 verbs + skip | Load = any wharf cask × any ship; Charter = cask × 4 kontore | Every verb has two target picks |
| **D Cellar** (`1503–1592`) | 4 verbs + Done, **any order, repeat until done** | Tap re-enters the full 8-verb cask-action dispatch (`fireCaskAct 1582–1592`) per tapped cask | The deepest station by far |

Two of these fire **every turn** (both stations on a line always fire, `1258–1266`), plus two
slot stops. The human logs show the result: every activation walks stops that do nothing —
`human-g3` alone logs "no Ready cask to deploy" / "nothing to load" / "Brew: no open vessel"
eleven times in a two-player slice. On a table, each of those is a player re-scanning a menu to
conclude "nothing." The AI corpus puts numbers on it: 35/309 fizzled lines at 2p, 63/822 at 3p,
106/1157 at 4p (`pbp-2p-1`, `pbp-3p-2`, `pbp-4p-5`). The review notes flag the ceiling case as
"a 10-minute resolution sandwich" (`REVIEW-NOTES-v94.md:278`).

The designer's instinct is correct and the print kit already agrees: the shipped station faces
(`printables2.html:1438–1442`) show Market as 4 icons (the charter-contract buy is *omitted*),
Cellar as 2 icons (Tap is *omitted*), Harbor as 3, Brewhouse as 2. The board is aspirationally
simpler than the engine. Close the gap from the rules side.

### 1.2 The slot stack: a dozen pieces pretending to be two layers

`COMPONENTS.md:15` models a slot as "max two layers." The worst legal case (a Hulk on an owned
privilege) is physically: **owner frame (2.5″) + building card (2.0″) + ship card (2.5″) + up to
3 cask cards (2.5″ each) + up to 3 demand dice + up to 3 ownership discs + up to 3 quality
markers** (`printables2.html:985, 1130–1132`; `COMPONENTS.md:37–38, 52`). Three concrete
failures inside that pile:

- **The ship covers the building.** A 2.5″ ship card fully occludes the 2.0″ building modifying
  it. The one tile that changes what the stack *means* is the one you can't see.
- **Cargo has no home.** §17 gap #3 (`COMPONENTS.md:348`): 2.5″ cask cards can't sit in the
  die-sized printed berths; where cargo goes and how load order is preserved is *undefined* —
  and load order is load-bearing (benefits + delivery resolve in it, `index.html:337`).
- **One square, two jobs.** The cask back prints a single dashed square dual-labelled
  "quality die / presence marker" (`printables2.html:1106`) — a cask needing both has nowhere
  to put them.

The human logs show this stack accreting constantly — casks deployed "under" a named building is
the single most common event shape (`human-g1:29,44,53,73,94,105,113`; `human-g3` stacks
Connoisseur's Cellar four separate times).

### 1.3 The demand die is deferred arithmetic wearing a component costume

This is the sharpest thing the engine read surfaced: **the digital game does not have demand
dice.** There is no stored die. `captureLoad` (`play.html:1638–1641`) freezes a *reference* —
the cask's effective quality and *which building* it shipped through — and `deliverCask`
(`1710–1722`) re-derives the number at delivery: building ★ (`caskBldgValue 970–987`) + Q4/Q5
premium (`:985`) + ship-slot bump at the sail (`shipBldgValue 990–993`), owner-gated
(`bldgShare :1091`), capped at 6. The rendered die (`dieFace :1087`) is a *display* of that
computation.

The physical game therefore asks players to be the CPU. The derivation lives nowhere near the
components: the +2/+3 premium is printed only on the aid card (`printables2.html:1185`) and in
rulebook prose (`index.html:331, 384, 589`) — not on the die, not on the building, not on the
destination board. Worse, for two tiles the number **cannot be known when the die is set**: the
Hanse Diet and the Almoner pay by *who leads the kontor at the moment of delivery*
(`play.html:977–978`) — leadership can change while the hull waits to fill, so a die "set on
capture" is wrong by rule. (The Hanse Diet probe already found 0 die-sets in 1,000 games —
`DESIGN.md` parking lot — the tile is unplayable *and* unphysical.)

The downstream costs are documented, not hypothetical:

- **The silent bonfire.** "Privilege-pays-owner-only creates silent point bonfires… a serious
  newbie trap since the loss only surfaces at delivery" (`REVIEW-NOTES-v94.md:219, 471`); the
  worst sighting is a Q5 Bock chartered to Bergen for **1★** because it stood under a rival's
  Staple Hall (`:179`). The arithmetic being invisible is *why* it's a trap.
- **Stranded value.** "Sail only when full + a hostile clock = stranded premium cargo — the
  single biggest unfun pattern in the batch" (`:84`); two Bocks + a Steelyard privilege = ~20
  unbanked points dead on a 2/3 hull for 8 rounds (`2p-2`).
- **Recalculation.** A deployed cask's prospective die changes every time the tile under it
  changes (`caskPreviewBonus :1093` recomputes per render); with overbuild churn at 3.0–5.1 per
  game at 3–4p (v94 stats) and building swaps mid-game in the human logs
  (`human-g1:122–124`, `human-g2:101–103`), the table re-derives values it never wrote down.
- **Supply is unverified** (§17 gap #12) and the die competes with the presence disc for the one
  printed square (§1.2).

Verdict: the die is not the *demand lane* — it is the demand lane's **bookkeeping**, and the
bookkeeping is the only part that hurts. §3 keeps the lane and deletes the ledger.

### 1.4 Verbs don't act where they stand

- **Deploy**: fired from any empty slot's stop or the Brewhouse, targets **all 8 slots**
  (`emptySlots() :918`, `deployTo :1533`). The line only matters for the advanced
  action-replacement combo (`:1512–1515, 1542`) — a rule subtle enough that its main effect is
  making the simple question "where can I put this?" have a non-obvious answer.
- **Load**: the Harbor verb reaches **any cask on the wharf** (incl. rivals') onto **any ship**
  (`harborLoadPool :1810`, `myShips :925`). Meanwhile the engine *already contains* the local
  precedent: a ship activated as a line stop loads **only onto itself**
  (`enterShipLineFire :1873–1877`).

The playtester's complaint ("you could activate deploy but deploy the cask to any slot, not the
slot you activated") is a correct reading of a real inconsistency: cask stops act on their own
slot; ship stops act on their own slot; empty-slot stops act on the whole board. One of these
things is not like the others.

### 1.5 The second act starves — and that's why majorities felt like the game

Ground truth from the raw logs: in `pbp-4p-5` every multi-cask sea delivery lands by ~R9; the
back two-thirds of the game contains **no sea delivery at all** — the clock crawls on enshrines
and single-cask charters, flatlines at 11/13 from R22, and the game ends on the round ceiling.
`pbp-3p-2` is the same shape (last sea delivery ~R14, ends R25 at 9/10). The review corpus
generalizes it: "voyage supply has no floor" (`REVIEW-NOTES-v94.md:286`), "nothing ever reclaims
a slot for a ship… fully-built ring → ship channel permanently closed → deploy-lock" (`:469`),
destination-gated hulls freezing 7–10 rounds in 5+ games (`:478`), and — the damning inversion —
"the leader benefits from the stall — exactly backwards for a race clock" (`:469`).

Now overlay what stays *visible* while shipping starves: the majority chart. Presence accrues
from many cheap faucets — Reach actions, Keut's perk, Bergen's benefit — and the human logs show
"+1 presence" firing constantly (`human-g3` logs it eight times in a slice) while "Bergen is
free money — the +9 anchor went sole/uncontested in most games… presence can be ground from the
Floor without ever delivering" (`REVIEW-NOTES-v94.md:476, 354`). The sim's winning profiles are
actually *braided* (no winner on kontor value alone; every winner carried 9+ of flight and/or a
Hall spike — `:294`), and Hall-only finished last outright in `4p-10`. So the table's fixation
was not a values problem — **it was a visibility problem on a starving board.** The two paths
the table under-explored are precisely the two with no mid-game physical presence: the Hall (a
quiet fixed ladder; zero enshrines in the 2p human game) and the Flight (an end-game quadratic
that exists only on a strip on your own board). Meanwhile the AI corpus shows Enshrine is, if
anything, *over*-efficient (cheapest score + a full clock tick + a slot-clear; 8 of 13 ticks in
`4p-3`; the Q3 rung at 5★ vs a 1★ Bruges sail — `:467`). The humans didn't find the game's best
verb. That is a legibility indictment, not a balance one.

---

## 2. Theme 1 — line activation

### 2.1 The design stance

One sentence, printable on the player aid:

> **A line has four stops — slot · station · station · slot — and every stop acts where it
> stands.**

Everything below is that sentence applied. It is also the *v0.7 reel-in lesson* (§8: "content,
not rules — depth belongs in placement/timing/interaction") applied to the one place rules mass
crept back in: the stations.

### 2.2 The ≤2-action station faces

Each station becomes a printed **this-or-that** (or one two-beat action). Sub-decisions survive
*inside* a choice (which recipe, which hull) — that's depth — but the *menu* is two entries, and
the face can carry it in two icons.

**A · Market — `TAKE 2 GOODS ⚙ or BUY 1`.**
Exactly the designer's instinct, formalized. BUY 1 = one purchase from any open display: a
recipe, a slot tile (Privilege/Building, placed at once), a hull (Commission, `2 G` ⚙), or a
charter contract (`1 G` ⚙). This is the current rule (`RULES.md §4A`) *presented* as one verb
with four shelves — the change is that it stops being read as five parallel actions. One real
simplification inside it: **Commission's free-load rider should be re-examined** (§2.5) — it is
the single heaviest nested decision in the game (place + dockside pickup + free load,
`play.html:1421–1453`), and it is a Harbor-shaped verb living at the Market.

**B · Brewhouse — `BREW 1 or RACK 1` (rack = deploy to any open slot).**
Today the Brewhouse is brew-AND-deploy (`STATION_ACTS :551`). Making it this-or-that does two
jobs: (1) it is the station-menu cap applied honestly — the one AND station becomes a choice;
(2) it preserves exactly one **wildcard deploy door** after deploy goes line-local (§2.3), so
placement flexibility is nerfed, not deleted. The cost is real tempo — brew-then-deploy in one
visit is currently a common human turn (`human-g2:28–36` does both plus a commission). I would
accept that cost deliberately: the squeeze ("you can't hold everything", `RULES.md §3`) gets
sharper when brewing and clearing the brewery compete for the same stop. ⚙ If sim shows the
2-vessel engine chokes (brew rate collapse, pace drift beyond band), fall back to brew-AND-rack
but keep rack as the *only* any-slot door. The v76 lesson stands guard here: Source+Brew is the
engine's heartbeat — the Market/Brewhouse row keeps both faucets (goods, brew) intact, so the
heartbeat line survives this pass untouched.

**D · Cellar — `AGE 3 ⚙ or HIRE 1`.**
Age (allocate 3 points across vessels, once) or buy one Specialist from the display. The
designer already blessed this pair. The two departures:
- **Tap leaves the Cellar and becomes a Floor verb** (§4). Tap is the deepest nesting in the
  game (repeat-any-number, each tap re-entering the 8-verb action dispatch,
  `play.html:1553–1592`), it's thematically *domestic* (you tap a cask at your own house), and
  the Floor needs a job that is genuinely its own. This single move converts the Cellar from
  the heaviest station to the lightest, and gives Theme 4 its answer for free.
- **Blend** (expansion) rides the AGE face as its expansion-added second mode (⚙: "Age 3 or
  Blend" when Specialty Beers is on) — expansions may thicken a face; the base game never does.

**C · Harbor — `SAIL: Enshrine or Charter`.**
The big one. **Load stops being a station action entirely** — loading is what a *ship's slot
stop* does (§2.4), which the engine already implements (`enterShipLineFire :1873`). The Harbor
face keeps the two hull-less voyage verbs, both taking a deployed cask (deploy-first grammar
untouched), both ticking the clock. The Harbor stays the cash-out corner — it just stops being
a superset of everything nautical. Specialist rewires are mechanical: **Stevedore** → "when you
fire a ship's load stop, load up to 2 casks" ⚙; **Quaymaster** → unchanged in spirit ("your
Load/Charter/Enshrine may take casks from your vessels") — it modifies wherever those verbs now
live.

Printed faces after the pass (vs `printables2.html:1438–1442`, which is nearly this already):

| Station | Face |
|---|---|
| Market | `2🪙 / 🛒¹` |
| Brewhouse | `🍺¹ / 🛢→any` |
| Cellar | `3⏳ / 🔧¹` |
| Harbor | `👑 / 🎟` |

### 2.3 Restricting Deploy to the activated line — analyzed, and recommended

**The rule:** an empty slot's stop is *"Deploy here."* You place a Ready cask onto **that
slot**. A line with two open slots = two deploy opportunities, each with a fixed address. The
Brewhouse RACK is the one exception (any open slot), bought by giving up your brew.

**What it buys:**
- *Legibility.* The stop and the place are the same thing — the playtester's confusion is
  structurally impossible. "Where can my cask go this turn?" is answered by looking at the line
  you're standing on.
- *Placement becomes strategy instead of convenience.* Deploying under your Staple Hall now
  requires activating the Staple Hall's line — which is exactly the v1.0 keystone bet ("landing
  a high-impact modifier on a slot of a line you fire often is the core optimization",
  `RULES.md §5`). Today that bet is diluted: you can author a privilege on a line you never
  visit and still route everything through it from anywhere. Line-local deploy makes building
  *placement* — the game's signature authorship act — bite every turn thereafter. The rich get
  richer in the right way: the wharf becomes a map of commitments, not a bag of slots.
- *A rules deletion.* The action-replacement combo (`play.html:1512–1515`) — deploy onto another
  pending empty stop and it flips to the cask's action, but never on the stop you spent — dies.
  Replace with the plain rule: **a deployed cask acts from your next activation** ⚙. One less
  paragraph nobody could teach.

**What it costs / what breaks:**
- *Deploy pressure concentrates.* At 4p the ring already jams (deploy-lock is "the shared root of
  the dead turns", `REVIEW-NOTES-v94.md:217`; "no open slot" ×8 in `4p-9`). Cutting a turn's
  deploy targets from "all open slots" to "this line's open slots (+Brewhouse wildcard)" makes
  jams *locally* worse even when the ring has holes elsewhere. **This change cannot ship without
  the churn/relief work in §6** (Tap-recall on the Floor, spoilage, and a ship-channel floor).
  This is the single biggest risk in the package — gate it hard.
- *Tempo loss on multi-deploy turns.* Today one line can deploy several casks anywhere; now each
  deploy has an address. Human logs show 1 deploy/turn is the overwhelming norm, so the
  practical loss is small — but the sim must confirm (deploys/turn, Ready-cask dwell time).
- *First-turn and warm-start seeding* must guarantee open slots are distributed across lines
  (the current seeder already spreads ships across lines, `RULES.md §1` — extend to a hard
  guarantee ⚙).

**Verdict: do it.** It converts a floating verb into board geography, which is what this game's
identity (stations + slots + lines) says verbs should be. But it rides or dies with the relief
valves — see validation (§6.2).

### 2.4 Restricting Load to the activated line — recommended in the ship-local form

Two different proposals hide under "restrict load to the line"; they should be separated:

**(a) Ship-local (recommended):** *the ship you load must be on the line you activated* — i.e.
loading IS the ship-slot's stop, the Harbor's global Load is deleted. The engine already runs
this rule for line-fired ships (`:1873–1877`); the pass just deletes the redundant global door.
Consequences:
- A hull's *berth placement* becomes a real decision for the commissioner: dock it on a line
  people (including you) will activate. Ships join buildings as things you *place into
  geography* — the wharf's two layers finally play by one rule.
- Rival-loading survives intact (activate the ship's line, load their deployed cask, take the
  `1 G` ⚙, choose nothing — the destination is printed). Denial play survives. The interaction
  the corpus calls healthiest is untouched.
- Cargo stays wharf-global: the cask you load may stand on any slot. **Do not** line-restrict
  the cargo side (option b below).

**(b) Cargo-local (rejected):** *the cask must also be on the line.* This demands cask and hull
share a line — a two-turn planning conjunction on a churning 8-slot ring. It would multiply the
stranded-hull pathology the corpus already flags as the top unfun pattern (`:84`), and it makes
rival-denial trivial (deploy anywhere off the hull's line = unloadable). The one-sentence rule
survives without it: *stops act where they stand; cargo has already made its public showing and
may come from anywhere.*

**What (a) costs:** filling hulls gets slower — you must route turns past the hull's line. The
corpus says hull-*destination* mismatch, not loading reach, is the real fill bottleneck (2p-3's
Novgorod hulk sat "nothing eligible to load" for 7 rounds with global load available), so the
marginal cost should be small — but "sail only when full" + slower fills is exactly the
combination that starves the clock (§1.5). Same gate as §2.3: pace and fill-rate in sim, and the
§6 clock work as a package.

**Commission's free-load rider** under (a): keep it (it is the one moment loading is legal
anywhere, because you are literally standing at the Market buying the hull), but I'd flag it ⚙
as the next simplification candidate if the table still groans — dockside pickup
(`play.html:1418–1433`) already covers its best use with less procedure.

### 2.5 What this does to a turn

Before: move → pick of 3 lines → 4 stops, two of which open 3–8-item menus (one recursive),
two of which may target the whole board.
After: move → pick of 3 lines → 4 stops, each a this-or-that or a fixed-address act:
*deploy here / take-2-or-buy-1 / brew-or-rack / load this ship / age-or-hire / enshrine-or-charter.*

Turn length shrinks where it hurt (menu-scanning, target-scanning), and **nothing was removed
from the decision space that mattered**: what to brew, where to author, which line to fire,
where the cask pays off. Analysis paralysis lived in the *option enumeration*, not the strategy.
The strategy survives; the enumeration dies.

---

## 3. Theme 2 — the slot stack, and the game without demand dice

### 3.1 What must be true of any fix

The standing rule (`COMPONENTS.md §17` header): all game state must live in the components on
the table. §1.3 established that the die fails this by construction — it *stores a number* whose
*derivation* is off-component, is sometimes undefined at set-time (lead-dependent tiles), and
must survive board churn the digital game absorbs silently. So the question is not "what carries
the die's job" but "does the die's job — **deferred value** — need to exist at all?"

It doesn't. The game already banks four things immediately and physically: goods (cubes),
presence (discs), quality (markers), score (the track). Only privilege value *waits*. The fix is
to stop it waiting.

### 3.2 Candidate A — "Bank it at the sale" (recommended)

**The rule:** *a Privilege pays its owner ★ — on the score track, immediately — whenever the
owner's cask departs that slot toward a sale* (loaded onto a hull, chartered, or enshrined; the
Reliquary pays at enshrine as it always did). The premium (Q4 +2★ / Q5 +3★ ⚙) pays at the same
moment, read off the cask's effective quality as it departs. Ship-target privileges (Rich Berth,
Festkeller) pay their owner **at the sail**, per qualifying cask aboard ⚙. Delivery itself
becomes a pure printed lookup: **destination starting value (+ Novgorod's Q-scaling / the Hall
ladder), never less than 1★** — nothing rides, nothing is remembered.

What disappears: the 8 dice, the max-6 cap rule, "set not accumulated", the bump-at-the-sail
re-touch, the die/disc square conflict, §17 gaps #3 (dice-in-berths half) and #12 — and every
recalculation moment, because *nothing on the board carries pending value*. A loaded ship is
just cask cards in load order under a hull card.

What is genuinely *lost* — state it honestly:
- **The riding jackpot.** A die showing 6 on a berth is a visible prize and a denial target.
  Some drama moves from "watch the cargo" to "watch the score track." I judge this a good trade:
  the same visibility that made the die dramatic made its *absence* a silent bonfire (§1.3), and
  the score track is the one place spectators actually look.
- **Delivery risk on privilege value.** Today a stranded hull strands the die's points; under A
  the privilege ★ banked at load even if the hull never sails. This softens the corpus's
  "single biggest unfun pattern" (stranded premium cargo, `:84`) — mostly a feature — but it
  also means a player can farm privilege ★ into a hull that never needs to sail. Two guards ⚙:
  the destination/majority/Flight value (usually the larger share) still requires delivery; and
  loading still consumes a berth on a full-sails clock. Watch in sim: privilege-★-per-loaded-
  cask-never-delivered. If it's abusable, the fallback is *bank-at-the-sail* (privilege pays
  when the hull departs, not when the cask boards) — still memoryless at the table, since the
  cask is sitting in load order under the hull whose privilege slot is known… **no** — it is
  not: the *source* slot's tile can change between load and sail. Bank-at-load is the only
  fully memoryless timing. Prefer it; guard it with tuning, not memory.
- **The 6-cap.** The cap existed to bound die stacking. With banking split into two immediate
  events (slot tile at departure, ship tile at sail) there is no single sum to cap; bound value
  by the printed ★ instead (retune Connoisseur/charters ⚙ if the top end runs hot; per §8,
  values are the *last* dial, so first just watch it).

The lead-dependent tiles resolve cleanly: **the Hanse Diet / Almoner check leadership at the
moment of departure** — a table-checkable instant. (Both tiles remain weak per the probe data;
that's a content retune, not this pass's job.)

**Does A force a building rethink? No.** Every tile keeps its text modulo the timing word: "a
cask from here delivers +3★" becomes "when your cask ships from here: +3★." The roster,
costs, the Privilege/Building split, ownership frames, overbuild — all stand. That is the point:
A deletes the ledger, not the lane. The demand lane's *strategy* (author privileges on lines you
fire, route your best casks through them) is identical; only the accounting moment moved.

### 3.3 Candidate B — the all-Works wharf (value class retired)

The structurally different alternative, for the ledger: **no tile touches cask value at all.**
Every slot tile is a green Work that transforms the loop; delivery value is entirely the printed
destination table, with quality as the only value dial (extend Novgorod-style Q-scaling to more
kontore ⚙). The blue Privileges convert to owner-utility: goods on events, gate relief for the
owner, free deploys, tempo. The building vocabulary for manipulating Source→Brew→Age→Ship
*without touching value* is already rich in the box and can grow (all exist today or are
one-step extensions):

- **Quality**: Malt Kiln / Hop Yard / Gauger / Smoke Kiln (+1 effective Q — one marker, one
  meaning; the only rider worth keeping).
- **Capacity/gates**: Cooperage (+1 berth), Customs House (−1 gate).
- **Aging**: *a cask docked here ages +1 on its owner's turn* ⚙ (a public lagering dock — new,
  fills the "deployed casks are frozen" gap).
- **Brewing**: Parti-Gyle Tun (deploy → free Gruit).
- **Action**: Brewmaster's Workshop (docked cask acts as Wild).
- **Tempo/geography**: *a slot that counts as adjacent for your move* ⚙, *deploy here free even
  when occupied* ⚙, *a hull here may sail one cask short* ⚙ (a printed dispatch valve — see
  §5.3).

**Ledger, A vs B:**

| | A — bank at the sale | B — all-Works wharf |
|---|---|---|
| Components deleted | 8 dice, cap rule, premium-timing rules | same, **plus** the blue class itself |
| Building rethink | none (timing word only) | total: 12 privilege designs replaced |
| The demand lane | intact (accounting moved) | **deleted** — one of the five lanes gone |
| Delivery arithmetic | printed lookup | printed lookup (even flatter) |
| Risk | privilege-★ farming on unsailed hulls (tunable ⚙) | kontor value flattens; "author the board" loses its scoring teeth; contradicts v94 synthesis D ("the demand-die lane is the game's ceiling AND its variance engine — and it works when piloted") |
| Fit to the designer's own read | "buildings are rich and make each play interesting" — kept | weakened: buildings become plumbing |

**Recommendation: A.** B is the cleaner *table*, but it amputates the lane the evidence says is
the game's ceiling and the humans' best-played system (`REVIEW-NOTES-v94.md:444–449`: "humans
execute the demand lane the bots fumble"). A gets ~90% of B's physical simplification at ~0% of
its identity cost. Adopt B's *vocabulary list* as building-deck content either way (content,
not rules — §8).

### 3.4 The stack after the pass

Worst-case slot: **owner frame + building + hull + cask cards tucked in load order + one disc
per cask** (+ at most one quality marker per cask). No dice, no pending values, no
recalculation. The remaining §17 work stands on its own (maturation markers #1, cargo tuck
procedure #3, Jopenbier strip #4, Blend carrier #10) and none of it is arithmetic.

---

## 4. The Floor — a deliberate one-turn tension

The evidence is unambiguous about today's Floor: humans use it well but rarely (one deliberate
Floor turn in three human logs — `human-g2:66`, a beautiful one: toll dodged, two flipped Wilds,
8 goods, a Bock brewed); weak play uses it constantly as a **costless infinite pass** (28
consecutive no-op turns in `2p-10`; 25 Floor turns in `pbp-4p-5`; whole final rounds all-Floor;
"the Floor survey loop is the biggest red flag", `REVIEW-NOTES-v94.md:287`) — while winners
repeatedly post **floor 0** in the score line. It is simultaneously too available and not
*for* anything.

The brief's target — "the thing you need to do sometimes, but it means you can't visit the
wharf" — needs the Floor to have (a) a job the wharf cannot do, (b) a real cost, (c) no idle
mode. Three mechanisms, one coherent identity — **the Floor is harvest day**:

1. **Tap lives only on the Floor** (moved from the Cellar, §2.2). Tap is the cash-out/recall
   verb — fire a Ready cask's action once and discard it (from a vessel *or recall it off a
   slot*, clearing the slot). Now "I need a Floor turn" has a concrete trigger: casks to cash,
   vessels to unclog, a slot of mine to clear before a rival ships it somewhere hostile. And
   because Tap consumes casks, the Floor **self-throttles** — the harvest is only as rich as
   what you grew. This also keeps Tap-as-relief-valve alive for the line-local deploy world
   (§2.3), where recall matters more.
2. **The Floor must do work: choose it only if it resolves at least one effect** ⚙ (the corpus's
   own candidate lever, `:155`). The null pass dies; `2p-10`'s mutual-stall Nash becomes
   illegal. (Pair with the existing MAX_ROUND backstop untouched.)
3. **Throttle the flipped-Wild faucet: Wilds fired from flipped buildings may not Survey** ⚙
   (or: one Survey per Floor turn ⚙). This severs the self-funding churn loop the notes
   documented (Floor-survey → free tile → 1G rent → flip → Wild income → next rent,
   `:254, 287`) without touching the honest uses (goods, age, load, reach).

What I would **not** do: tax the Floor (a toll or fee). The Floor's whole meaning is the
untolled private alternative — the pole test (§8) says the failure mode is *negation*, and a fee
negates it for the poor exactly when it's their catch-up line. Cost it in **opportunity**
(no wharf progress, no deploy, no clock touch — a Floor turn never ticks the Sailed-Ships track)
— that is already true and already the right currency; it just needs the idle mode removed so
the opportunity cost is always being *paid for something*.

The one-turn tension then reads exactly as the brief wants: the wharf line advances your
board position; the Floor converts your held position into resources and freed capacity. Both
good; one turn; pick.

---

## 5. Paths to victory

### 5.1 Why the table fixated on presence/majorities

Diagnosed in §1.5; the short form: majorities are the only path with a **shared, printed,
mid-game scoreboard** (the destination board's majority chart + physical presence discs), they
are fed by cheap ubiquitous faucets (Reach/Keut/Bergen), and the competing paths went dark —
delivery ★ hid inside die arithmetic, the Hall is a quiet private ladder, the Flight is an
invisible end-game quadratic. Add the second-act shipping starvation and majorities weren't just
the most visible game — they were at times the only game still moving. The sim data confirms the
fixation is perceptual: winning profiles braid four lanes (`:294, 438`), Hall-only finishes
last (`4p-10`), and the anchor being "free money" (`:476`) is an *under-contest* problem —
i.e., again, visibility and pacing, not values.

### 5.2 New paths? No — found paths.

Under the constraint "not simpler; more strategic between easy-to-understand paths," adding a
sixth lane is the wrong move: the game already has five and the table found one and a half. The
streamlining *is* the path work — every point that banks immediately (§3.2) is a point a rival
watches happen. Concrete moves, cheapest first:

1. **Put the Hall on the table.** Enshrined casks currently vanish into a number. Give the Hall
   a printed board with quality-rung rows where the enshrined cask cards physically lie ⚙ (the
   designer has ruled out rung *limits* — this is display, not scarcity). Every enshrine
   becomes a visible, growing shrine rivals price. The 2p human game with zero enshrines
   (`human-g3`) doesn't happen at a table where the Hall is a place.
2. **Make the Flight tick in public.** Keep the (beers−1)² end bonus ⚙, but bank a visible
   **+1★ ⚙ the moment each new beer past the second is first delivered** (marked on the shared
   destination board, not just the private strip). Cheap, immediate, teaches the incentive
   mid-game, and the end bonus still rewards commitment. (Retune the end curve down by the
   banked amount if needed ⚙ — value-neutral, visibility-positive.)
3. **Price the cheap ticks, structurally not punitively** ⚙: the corpus's Q3-enshrine-vs-1★-sail
   5:1 efficiency gap (`:361`) is the Hall eating the clock. Before touching the Hall *ladder*
   (a value lever), try the structure lever: **an Enshrine ticks the clock only if it's your
   first Enshrine that round** ⚙, or the Hall demands the cask stand deployed a full round
   first ⚙. Keep the Hall's identity (repeatable, uncontested, the deliberate alternative) —
   throttle its *clock* dividend, which is what made it the sim's exploit.
4. **Give the second act a floor** (the shipping-collapse fixes, §5.3) so the volume lane stays
   playable past R10 — the best cure for majority-fixation is other things worth racing.

### 5.3 Keeping shipping going (the structural holes)

Three ⚙ sketches, all structure levers (§8), all sim-gateable, in priority order:

- **The Tide (ship-channel floor):** at the start of a round in which **no hull sits on the
  wharf**, the oldest hull in the ship market washes onto the emptiest slot for free ⚙. Directly
  answers "nothing nudges voyage supply; the clock is 100% opt-in" (`:256`) and "nothing ever
  reclaims a slot for a ship" (`:469`) with zero new player decisions.
- **The Dispatch (paid early sail):** at the Harbor, a player may pay `2 G` ⚙ to sail a hull
  one berth short (its casks deliver normally). A goods-priced valve for the stranded-hull /
  hostile-clock pattern (`:84`) that keeps "sails when full" as the default physics. (Watch: it
  weakens the denial game; price it so denial usually still wins ⚙.)
- **Spoilage widens** ⚙ (Q4+ takes a Q2's berth, not just Q1) only if deploy-lock persists
  after line-local deploy ships — per the corpus, spoilage under-fires because the real jam is
  premium casks, which it can't touch (`:435`).

And one deletion for coherence: with the Gauger's Office now a strict kiln twin that costs more
and never scored ("the rule works, the tile doesn't", `:462`), fold it — replace with one of
§3.3's loop-vocabulary tiles (the public lagering dock is my pick ⚙: it fills a real hole,
"deployed casks are frozen while they wait").

---

## 6. The package, the validation, and what I would not touch

### 6.1 Build order (each step independently shippable, in this order)

1. **The stop pass** (§2): this-or-that station faces · Tap→Floor · Harbor = Enshrine/Charter ·
   ship-local Load · line-local Deploy with the Brewhouse RACK wildcard · delete the
   action-replacement combo.
2. **The bank pass** (§3A): privileges pay at departure · ship privileges at the sail · dice,
   cap, and premium-timing rules deleted · Hanse Diet/Almoner check lead at departure ·
   delivery = printed lookup, ≥1★ floor kept.
3. **The Floor pass** (§4): must-resolve-one ⚙ · no Survey from flipped Wilds ⚙ · Tap's new home
   (lands with step 1).
4. **The second-act pass** (§5.3): the Tide ⚙ · the Dispatch ⚙ · enshrine clock throttle ⚙ ·
   Hall board + Flight live-ticks (print work, near-zero rules cost).

Steps 1–2 are the designer's two themes and belong in one keystone version (they share the
one-sentence philosophy); 3 rides along; 4 can trail after the first human table on 1–3.

### 6.2 Validation plan (the repo's own tooling)

- **Bump the save KEY**; update the sim/AI drivers for the new UI states (the harness bots
  switch on `UI.sub`/`UI.stage` and call the same functions the buttons call — the stop pass
  changes both; budget real work here, the gates are only as honest as the bot's coverage of
  the new grammar).
- **`node playtests/sim.js 500`** — the hard gate: 0 crashes, **0 deadlocks** at 2–4p. The
  specific new-risk counters to add/watch: deploy-lock frequency and dwell (line-local deploy is
  the package's biggest risk), hull fill-time (ship-local load), brew rate (Brewhouse
  this-or-that), pace in the 12–25 band. If deploy-lock rises, the fallback ladder is: widen
  spoilage ⚙ → RACK also from Harbor ⚙ → revert deploy to any-slot (keeping everything else).
- **`PERSONAS=1 CELLAR=1` PATHWAYS** — the lanes must stay braided; judge by the **negation
  test** (§8), not win-rate deltas. Watch privilege-★-on-undelivered-casks (the §3.2 farming
  guard) and dev-share (<10% target held).
- **`node playtests/ai-ladder.js 600`** (0 errors, tiers ≥60% at shipped budgets — expect a
  Trader re-tune via `ai-tune.js` after the value-timing change) and **`ai-render-smoke.js`**
  through the real render layer.
- **Same-seed narrations** — re-run the pathology seeds and check the pathologies specifically:
  `2p-10` (the null-Floor Nash must be impossible), `3p-8` (the survey loop must not
  self-fund), `4p-5` (the R10+ shipping desert must shrink; the clock should fill), `2p-2` (the
  stranded-Bock catastrophe should read as tension, not a bonfire).
- **A human table before step 4**, with three questions scripted: does a turn feel like four
  quick stops? did anyone ask "where can I deploy?" (the answer must be pointable-at)? did
  anyone look at the Hall board unprompted?

### 6.3 What I would NOT change, and why

- **The 2×2 + 8 slots, move-then-activate, the three lines.** The identity; every fix above
  works *through* it, none around it.
- **The Source+Brew adjacency** (v76 lesson: the heartbeat line — tested, reverted once
  already).
- **The dual-role cask and deploy-first.** The public-showing price is the soul of the
  interaction; §2–3 make it *cheaper to read*, not weaker.
- **Sail-when-full as the default physics** (the Dispatch is a priced exception, not a repeal —
  v0.16's backwards-incentive lesson stands).
- **The Charter/Enshrine relief valves, the Quaymaster exception, rival loading, the loader
  bonus.** The interaction layer is the corpus's healthiest system; don't touch what isn't
  bleeding.
- **The Hall's repeatability and its fixed ladder values** (designer-ruled; throttle the clock
  tick structurally if needed, never the rungs first).
- **Majority tier values** ⚙ — re-measure only *after* the visibility/second-act work; the
  fixation evidence says perception, not payout (and Bergen's "free money" is an under-contest
  symptom the same work addresses).
- **Bock's total cost** (§8: tested and rejected twice — the deep-lane dial is Hall-vs-kontore,
  not recipe cost) and **the deep lane's slightly-low, high-variance seat** (by design; do not
  buff to fair).
- **No dice-as-randomizers, no hand, no money** — note the pass *strengthens* compliance: the
  one die in the box goes away.
- **The three-tile taxonomy and the building deck's richness** — Candidate A exists precisely
  to keep them; variety stays content under one grammar.
- **The steerable brew piles, the recipe ladder, the export draft** — untouched; the beer-roster
  breadth the table enjoyed (Specialty/Jopenbier) is expansion content and stays opt-in.

---

*The one-sentence version of this whole document: the game's depth was never the problem — its
memory was. Make every stop act where it stands, make every point bank when it's earned, give
the Floor a harvest to bring in, and let the table see all five roads. The rest is ⚙.*
