# The Table Pass, Round 2 — the wide net (v3.0 options)

> **Status: PACKAGE β BUILT (2026-07-08) — playable as `play3b.html` (v3.0-B “The Roster”, KEY
> `hanse-3b-v1`), on the 3A foundation (slot-local stops · seals · the one commission gesture).**
> As-built decisions beyond §2/§9 (all ⚙): verbs are PORTABLE (any tile at any station — the
> station is a place: its two adjacent slots + occupancy + the toll; the four quarters keep their
> names as geography); the base roster is Source · Brew · Send · Build · Reach — **no base Age
> verb** (beer ages by TIME: the auto-age tick, plus the Cellarman/Lagerkeeper journeymen); the
> RECALL replaces moving-and-flipping (unflip all + run the brewery; a bare brewery takes 2 goods);
> the 7 Specialists → 7 JOURNEYMAN roster tiles (max 3 sockets; Coppersmith Brew+3rd vessel ·
> Cellarman mature-one-to-Ready · Grain Factor 2G1H · Hop Gardener 1G2H · Stevedore Send×2 ·
> Lagerkeeper all-maturing+2 · Quaymaster Send-from-vessels), hired via Build / the Q3+ Hire cask
> action / London; the flipped-building floor caps separately at 4; FAIR DAYS at ⅓ and ⅔ of the
> clock pay the leader HALF each kontor's 1st tier (off under The Trade Roads); the clock is
> trimmed to 5/8/10 and the round ceiling raised to 45 (turns are THIN — one verb — so the v2.x
> 12–25-round band does not apply; judge pace by clock-dominance). Gate results
> (`playtests/sim3b-results-v1.txt`): 0 crashes/deadlocks at 500×2–4p · clock 99.6–100% · rounds
> avg 23–26. **Lane read (`sim3b-personas-v1.txt`): remarkably balanced — all four lanes 22–40%
> across counts, no hot pole.** Watch-items: the greedy bot never reaches Q5 (Q4+/g ~0.4 — the
> quality climb leans on journeymen the bot under-buys; a table question), and the 3p seat spread
> read 17pts (P2-favoured) at n=500. Blending is dormant in 3B (no Cellar menu to host it).
>
> *(Original exploration header below, kept for the record.)*
>
> **Status: EXPLORATION (2026-07-08) — no rules changed.** Round 1 (`TABLE-PASS.md`) diagnosed
> the table costs and proposed the conservative repair: one-verb stations, slot-local stops,
> seals for dice. The designer's follow-up brief: *"reach wide and far… pull from other great
> games and give elements new life when paired with different themes… let's level up."* The
> precedent named: adopting the Lacerda tiered 1st/2nd/3rd majorities. This round does that
> deliberately, eight times, then composes three coherent v3.0 packages.
>
> Ground rules held throughout: the five pillars (the mechanic IS the theme · the squeeze ·
> crisp turns, deep decisions · shared-board interaction · legible scoring), the hard
> constraints (no randomizing dice · no cards-as-hand · no money), the pole test (hot is fine,
> negation is the failure), and the v0.7 founding lesson (content, not rules). Everything ⚙.

---

## How to read this

Each option names its **lineage** (the game whose mechanic gets new life here), the **Hanse
mapping** (what it becomes in *our* fiction and systems), what it **deletes from the table**
(the physical-cost test from Round 1), what it **risks**, and what it **composes with**.
Options 1–2 rebuild the turn engine (the true "level up" bets). Options 3–5 replace one
subsystem each. Options 6–8 add structure or drama. §9 composes packages; §10 says how to
decide cheaply.

---

## 1 · THE BREWER'S CALENDAR — time-track turns *(the thematic bet)*

**Lineage:** Thebes · Glen More · Tokaido · Patchwork — *actions cost time; whoever is furthest
behind acts next.*

**The marriage:** this game's stated soul-signal is **value-over-time** — beer needs time, and
right now time is simulated with upkeep (auto-age ticks, age pools, maturation tracks, a
Lagerkeeper that ticks every turn). The time-track mechanic makes time the *board*:

- A shared **calendar track** (the sailing year, spring fairs → Michaelmas ⚙). Every action
  prints a **day cost** ⚙: Source 1 · Brew 2 · Ship 2 · Build 1 · the Floor 1 (the cheap
  home day). Your marker advances; **the player furthest back moves next** (sometimes twice —
  the catch-up drama is built in).
- **Maturation = the calendar.** A brewed cask is stamped with its ready-day (today + its
  printed days; a marker on the calendar or a dial on the vessel). *No auto-age upkeep, no age
  actions, no maturation tracks, no per-turn Lagerkeeper tick.* The **Cellar station is
  deleted** — the wharf becomes three stations, and "Age" stops being something you *do* and
  becomes something you *wait for*, which is the truest sentence about beer this game has ever
  had. Aging Cellar / Lagerkeeper become printed **−days** effects.
- **The clock unifies.** The year IS the end condition (season closes ⚙) — the Sailed-Ships
  track either retires or becomes the calendar's voyage stamps. One clock, not two.
- **Turn-order problems dissolve.** Fixed-first-player edge (a real open item since v1.7) is
  gone — time self-balances the order. The occupancy toll can retire too: crowding is priced
  in days (a shared station costs +1 day ⚙) or simply left to slot competition.

**Deletes from the table:** the Cellar station and its whole menu · auto-age ticks · age pools ·
maturation tracks · the second clock · the first-player question · (optionally) the toll.
**Risks:** "whose turn is it" needs the calendar to be unmissably central; per-turn passives
must re-home to day-based triggers; the sim/AI turn engine is a genuine rebuild; pace retune is
total. **Composes with:** seals (B1), one-verb stations (A1 — natural fit: one verb = one
printed day cost), the Convoy (option 8 — fairs as calendar dates). **Identity check:** wharf,
casks, slots, ships, kontore, Hall, majorities all survive intact — only *when* changes.

## 2 · THE ROSTER — exhaust-and-recall verbs; the Floor becomes the breath *(the rhythm bet)*

**Lineage:** Concordia — *play actions from a hand until you must spend a turn recalling them* —
expressed as **tiles, not cards** (constraint §3 honored): Orléans/Teotihuacan-style
**flip-to-exhaust**.

**The Hanse mapping:** your player board prints a **roster of verb tiles** — your journeymen:
`Source · Brew · Ship · Build · Reach` ⚙. A wharf turn = move, then **flip ONE roster tile**
and do its verb at your station (+ the adjacent slot stops, per Round 1's slot-local grammar).
Flipped tiles stay flipped. **The Floor turn = the RECALL**: unflip everything and run your
brewery (each vessel cask's action). The wharf-vs-Floor fork stops being a preference and
becomes the game's **breathing rhythm** — push your roster four, five turns deep and you get
tempo but a desperate recall; breathe early and you're safe but slow. *I need both; I can only
have one now* — structurally guaranteed, every game, for every player.

- **Specialists dissolve into the roster.** Hiring the Stevedore = adding a better `Ship ×2`
  tile to a printed empty socket; the Quaymaster = a `Ship (from vessels)` tile; the Grain
  Factor upgrades your `Source`. The specialist deck + display + n−1 scarcity + the 4-slot cap
  **all retire** — buying an engine piece now visibly lengthens your private line, and the
  Floor-as-the-line-you-built (Round 1 §A3) gets its full expression.
- Stations stop being menus entirely — the roster tile carries the verb; the station is a
  *place* (occupancy, toll, adjacency all keep working).

**Deletes:** station menus · the whole Specialist subsystem (deck/display/cap) · Tap · the
"what can I do" scan (your unflipped tiles ARE the answer, face-up on your board).
**Risks:** roster sizes/costs are a fresh tuning surface; the recall turn must not be a dead
turn at a bare brewery (floor of `recall = unflip + 2 goods` ⚙); interaction check — does
watching a rival's roster deplete create the right pressure (it should: "she must recall next
turn — the Bruges hull is mine"). **Composes with:** everything in Round 1; Fair Days;
*conflicts* with the Calendar only in effort (both rebuild the turn engine — pick one bet).

## 3 · THE BOURSE — living kontor prices *(demand as supply-and-demand)*

**Lineage:** Navegador's market wheels · Container's crashing prices · the Hanse's own grain
boards.

**The mapping:** each kontor gets a **price dial (1–6★ ⚙)**. Deliver there: bank the current
price (Novgorod still quality-scaled ⚙), then the price **drops one step**. The price **rises
one step whenever a ship bound there is commissioned** — demand signaled by boats, zero upkeep,
and suddenly commissioning is a public statement rivals can snipe ("he just bumped Bergen —
board his hull before he does").

- Crowded lanes crash, neglected lanes ripen: **the market does the Flight's anti-monoculture
  job by itself** → the Flight can retire ⚙ → the scoring stack drops to *deliveries ·
  majorities · Hall · floor bonus* — a real legibility win.
- The whole demand-carry problem (dice, seals, capture-on-load) **vanishes**: nothing rides any
  cask; value is read off a dial at the moment of delivery.

**Deletes:** demand dice/seals · the premium arithmetic · the Flight (and its end-game math).
**Risks:** this *replaces* the authored-demand keystone — privileges as value tiles lose their
job (they'd become price-protection/price-bump tiles ⚙, or the slot layer goes all-Buildings —
the same identity question as Round 1's B3, stated honestly); last-delivery price-sniping needs
the dial floor (≥1★, kept). **Composes with:** Round 1 stations pass; Fair Days (prices reset
at fairs); *mutually exclusive* with seals — they are two answers to one question.

## 4 · FAIR DAYS — scheduled interim majority scorings *(the El Grande adoption)*

**Lineage:** El Grande — the definitive majorities-with-scoring-rounds game. The exact shape of
the Lacerda-tiers adoption the designer cited: a classic hallmark, re-themed.

**The mapping:** two **Fair marks** printed on the Sailed-Ships track (≈⅓ and ⅔ ⚙). When the
voyage marker crosses one: an immediate majority scoring at **reduced tiers** (1st only, or
half-tiers ⚙); the finale scores full tiers as today. Thematically airtight (the Hansetag; the
spring and autumn fairs).

- The table's favorite lane (last night's fixation) gets **drama instead of end-game math**;
  deliveries acquire *deadlines* ("ship before the Fair") — the mid-game shipping stall gets a
  motive; and because the clock is player-driven, racing or stalling the Fair is itself a
  strategic weapon.

**Deletes:** nothing (adds two bounded pause-points). **Risks:** early-leader snowball if the
interim tiers are too rich (keep them small); two scoring pauses at 4p must stay under a minute
(1st-only tiers do). **Composes with:** literally everything; the natural partner of option 8.

## 5 · HOUSE ALMANACS — private building sets *(the GWT adoption)*

**Lineage:** Great Western Trail's private building tiles (a/b sides) — the mechanic that makes
GWT's shared board co-authored yet personal.

**The mapping:** the shared Wharf deck + display retire. Each house owns a **printed set of ~6
slot tiles** ⚙ (its Privileges & Buildings, double-sided a/b — pick a side at setup for
asymmetry, the parked variable-powers idea landing at last). Authoring = placing *your own*
tile from *your own* supply, cost printed on it.

- **Ownership becomes visually free** — your tiles are your color; the owner-ring token dies.
  "Whose privilege is that" — the question every physical slot stack forces — stops existing.
- Setup variance (which sides) replaces display churn; London's benefit re-homes to "place one
  of your tiles free"; Survey likewise.

**Deletes:** the Wharf deck · the display + refill flow · the draw bag · owner rings · display
AP ("what's face-up?"). **Risks:** loses the shared-market race for tiles (real interaction —
partially recompensed by the fiercer *slot* race, since everyone can always author); needs
per-house sets balanced in aggregate (the GWT problem, solved by GWT's a/b discipline).
**Composes with:** everything; especially strong with seals (each house's seals match its tiles
— component elegance) and the Roster (private engine identity end to end).

## 6 · THE TIDE — the drifting quay *(the wild one)*

**Lineage:** Kanban's conveyor · Glen More's flowing tiles; the theme is free: *the tide*.

**The mapping:** the 8 slots become directional — each round's end (or each Fair ⚙), **every
deployed cask drifts one slot toward the Harbor corner**, aging +1 as it drifts (aging = the
tide; the auto-age tick becomes one visible sweep). Buildings stay put and act on whatever
drifts onto them — a kiln fires as casks pass; a berth is prime real estate because the tide
delivers cargo TO it. Deploy becomes *upstream planning*: place your Bock three slots out so it
arrives ready exactly when the Bergen hull docks.

**Deletes:** per-player auto-age bookkeeping (one batched sweep instead) · most deliberate age
actions. **Risks:** the sweep is its own upkeep (8 pieces max, but every round); collision rules
(what does a cask drift *into*?) breed edge cases — the exact opposite of the table pass's goal
if not ruthlessly simple; hijack timing gets sharper and possibly meaner. **Verdict:** the most
novel board-feel on offer and the least proven — a variant-deck experiment, not a base bet.
**Composes with:** Fair Days (drift on fairs only = less upkeep, chunkier planning).

## 7 · THE GUILD ROUND — role selection *(the Puerto Rico adoption — flagged as a fork)*

**Lineage:** Puerto Rico / San Juan — pick a role, *everyone* performs it, the picker gets the
privilege; unpicked roles accumulate a good.

**The mapping:** the four stations become four **role tiles** (+ the Floor as a fifth). Rounds:
in turn order, each player picks an untaken role; *everyone* executes its one verb; the picker
gets the printed privilege (Source picker +1 good · Ship picker sends free/first ⚙). Untaken
roles gain a good for their next picker.

**Deletes:** downtime (the 4p killer — everyone acts on every pick) · worker movement ·
adjacency · the toll · lines. **Risks:** that deletion list IS the identity cost — the spatial
wharf, the geography of the living slots, "where you work" — the things Rounds 1–2 elsewhere
*sharpen* — dissolve. **Verdict:** the best 4–5p *table feel* of anything here and the wrong
skeleton for *this* game; filed as the sibling-game / big-box-variant fork, not a v3 candidate.

## 8 · THE CONVOY — pulsed sailing *(shared deadlines)*

**Lineage:** Le Havre/Agricola's harvest pulse; the Hanse's actual convoy sailings (Umlandfahrt).

**The mapping:** hulls don't sail the moment they fill — **all full hulls sail together when
the convoy departs** (at each Fair mark, option 4; or every N voyages ⚙). Loading becomes
booking passage; the wharf breathes in a shared rhythm ("the convoy leaves after Olli's turn —
is my Mumme aboard or not"). The sail-when-full rule survives inside it (only full hulls join
the convoy; part-filled hulls wait for the next).

**Deletes:** nothing; converts continuous trickle into event drama. **Risks:** slows tempo
(the v0.16 lesson — "sail full" already lengthens structurally; convoy compounds it → the
clock dial must give it back); berth-blocking between convoys needs the Charter valve intact.
**Composes with:** Fair Days as one unified pulse (Fair = convoy sails → majorities score →
prices shift if the Bourse is in). Together they give the mid-game the *shape* the playtest
said it lacked.

---

## 9 · Three coherent packages (the options, composed)

**α — THE LEDGER** *(conservative-plus: same skeleton, half the table load, more drama)*
Round 1 (one-verb stations · slot-local stops · seals) **+ Fair Days + House Almanacs**.
Nothing about the game's identity moves; the physical game sheds the dice, the menus, the
deck/display/bag, and the owner rings, and gains two dramatic scorings. Effort: 2–3 normal
keystones. Retires the gatekeeper's AP flag and the playtest's top three complaints outright.

**β — THE ROSTER** *(the rhythm bet: the Floor becomes the game's breath)*
One-verb stations · slot-local stops · seals **+ option 2** (exhaust-verbs, recall-Floor,
specialists-as-roster-tiles) **+ Fair Days**. Deletes menus AND the whole specialist subsystem;
makes wharf-vs-home the mandatory pulse. The elevator pitch gains a hook: *"push your crew or
bring them home."* Effort: turn-engine rework, but bounded (the verbs already exist as code
paths). The bet: Concordia's engine is the most-loved low-AP engine in the hobby for a reason.

**γ — THE CALENDAR** *(the thematic bet: time is the board)*
Option 1 (time-track, Cellar deleted, one clock) · seals · **+ the Convoy** (fairs as calendar
dates). The most differentiating swing available: no other brewing game makes *time itself* the
resource, and this theme has been asking for it since v0.1 ("aging is the value-over-time
signal"). Effort: the largest — turn engine + clock + AI retune. The pitch becomes singular:
*"the beer game where the board is a year."*

Cross-cutting note: **the Bourse (3)** can substitute for seals inside any package (α′/β′/γ′
variants) — choose *authored* demand (privileges + seals) or *market* demand (dials), never
both. The Tide (6) and the Guild Round (7) stay filed as experiments/forks.

## 10 · How to decide without betting the repo

The v1–v2 discipline (code-first, sim-gated) is right for keystones that keep the turn engine.
β and γ change the turn engine — for those, **paper first**: the calendar is a printed strip
and a pawn; the roster is six penny tiles on the player aid. One evening each, using the
archived v2.9.1 set as the base kit (`archive/v2.9/printables.html`), answers the only question
that matters — *does the rhythm feel like Brewhouses?* — before a line of engine code moves.
α needs no paper: its pieces are all sim-gateable increments on the live engine.

Suggested order: **paper-test β and γ against each other · sim-build α's seals meanwhile**
(α is on every path — seals + one-verb stations survive under β and γ unchanged). Whichever
bet wins the table, α's work is never wasted. If neither bet convinces, α alone is a shippable
v3.0 and the Bourse remains the held card for v4.

---

*Round 3 offer: once reactions land, the next iteration goes deep on the chosen package —
exact faces/costs ⚙, the component manifest delta, the sim/AI plan, and the migration map
(what each of RULES/COMPONENTS/pages changes), same discipline as every keystone.*
