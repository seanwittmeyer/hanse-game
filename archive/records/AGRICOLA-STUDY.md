# The Agricola Card Study — occupations & improvements as the lens on Brewhouses' specialists & buildings

> **Status: ADOPTED as v4.6 "Guildbook"** (designer-ruled 2026-08-02, same day — the cost
> markup: *"Guild scholar… should [cost] 2G and make recipes free (my preference)"*). The
> build's deltas from §5's draft numbers, all cost-pass driven: Guild Scholar 2G/recipes-FREE
> (the ruling) · Innkeeper's gate 2→**3 distinct brewed** (the warm-start Gruit made 2 a
> formality) · Supercargo per-cask → **flat 1G1H per qualifying sail** (off-turn resolution
> must be choice-free) · Shipwright "+1 good" → **"commissions are free"** (same net, one
> sentence, no prompt). Chronicler kept capped +5 (the ladPts leash). Deck dials as proposed:
> core five × max(2,n−1) + guild eight ×1; buildings print 20, deal 17. The record entry:
> `DESIGN.md` §9 v4.6.

> *(The original commission below — kept as written.)* **Status: RESEARCH + PROPOSAL ONLY**
> (designer-commissioned 2026-08-02). Nothing in this doc
> is adopted; no rules, engine, component or page change rides it. The ask, verbatim: *"we have
> an interesting system right now where specialists and buildings are playing the same role of
> adding the variety the game shines with. It reminds me of how the cards in agricola work in a
> similar manner. Some are super powerful but must be earned while others are easily utilized
> for medium bonus… I think we could probably reach further to make these more exciting in the
> game while contributing to the core loop and goals of running the best brewhouse in the hanse."*
> Companion precedent: `HALL-STUDY.md` (the Orléans research that became Three Coins) and the
> v45d GWT building-ladder ruling — this study adds the **Agricola axis** those two didn't cover:
> the private rule-bender.

---

## 1 · How Agricola's card system works (the anatomy)

Agricola (Rosenberg, 2007) runs THREE card channels over one worker-placement spine
(take resources → build rooms → grow family → feed it). The channels differ by **who may use
them, what they cost, and what texture of power they carry**:

| Channel | Private/Public | Access & cost | Count (2007 box) | Power texture |
|---|---|---|---|---|
| **Occupations** (yellow) | private — dealt to your hand, played to your tableau | an ACTION SPACE + escalating food (1 food the first, 2 each after ⚙) | ~169 across the E·I·K decks | ongoing **rule-benders**: "whenever you take/do X, also Y" |
| **Minor improvements** (orange) | private — dealt, played as a RIDER on other actions | printed goods cost + often a **prerequisite** ("you need 2 occupations in play") | ~139 across E·I·K | one-shot converters, discounts, small VP, capacity tweaks |
| **Major improvements** (red) | PUBLIC — a fixed display of 10 anyone may buy | printed goods cost; the Hearth **trades up** from the Fireplace | 10 | **conversion engines** (ovens/fireplaces: grain→food) + endgame VP for held stock (Joinery/Pottery/Basketmaker) + the Well's drip |

The 2016 revised edition curated this down to one polished deck (the A-deck) — the telling
design admission: **the card SYSTEM was right, per-card sprawl was the cost.**

## 2 · The seven load-bearing principles (what actually makes it work)

1. **Cards hook EXISTING verbs, they don't add verbs.** Wood Cutter = "+1 wood every time you
   take wood." The rules mass stays flat; the combinatorics live in *which of your verbs got
   better*. A player's tableau is a private remix of the same shared grammar.
2. **Three power textures, deliberately mixed:** the **drip** (Wood Cutter — small, always-on,
   never wrong), the **build-around spike** (Wet Nurse — room-building becomes family growth;
   it doesn't help a plan, it *IS* a plan), and the **endgame collector** (Braggart — a VP
   ladder for improvements in play; you steer the whole game toward its count). The public
   majors add a fourth: the **converter** (ovens: a posted exchange rate).
3. **The cost grammar throttles the power.** Occupations cost a worker-action (tempo — the one
   currency that always hurts) plus escalating food; strong minors are gated by
   **prerequisites** (occupation count); majors are public and merely priced. Power that bends
   rules is paid in tempo and commitment, not just goods.
4. **Prerequisites make "earned" legible.** "Requires 3 occupations" is visible commitment —
   the spike arrives mid-game, after the table can see you building toward it.
5. **The deck is the replay engine; curation beats per-card balance.** Rosenberg shipped known
   imbalance (E/I/K let groups pick complexity; drafting emerged as the fix for dealt-hand
   variance). The lesson the revised edition drew: a **smaller, curated roster** with the same
   texture spread plays better than sprawl.
6. **The I-deck is the interaction axis:** cards that trigger off RIVALS' actions ("each time
   another player does X, you get Y") — the only channel where someone else's turn is your
   income. Used sparingly; it's texture, not the spine.
7. **Every card is self-recording.** The card in front of you IS its own audit — no memory, no
   ledger. (Agricola's version of our component-state hard line, and why the whole system
   ports at all.)

Representative cards behind the archetypes (loose wording, from the E·I·K era): *Wood Cutter*
(wood drip), *Conservator* (renovate wood→stone directly — a rule-bend), *Grocer* (a printed
private stack of goods bought cheaply — a personal market), *Wet Nurse / Lover* (rooms→family
growth — THE build-arounds), *Braggart* (endgame VP ladder), minors like *Beanfield* (a field
that is also VP), *Drinking Trough* (+2 capacity per pasture), *Loom* (harvest food + endgame
VP per sheep); majors: *Fireplace→Cooking Hearth* (the trade-up), *Clay/Stone Oven* (bake
rate), *Well* (VP + a timed drip), *Joinery/Pottery/Basketmaker's Workshop* (harvest
conversion + endgame VP for held stock).

## 3 · The mapping onto Brewhouses (what is already isomorphic)

| Agricola | Brewhouses today | Fit |
|---|---|---|
| Occupation (private rule-bender) | **Specialist** (2 seats, earned at Bergen ≤1/ship or fee via Hiring Post/hire bonus) | exact — same seat, same "whenever" grammar |
| Minor improvement (cheap utility) | the **free/1G building tier** (Granary · Mission Quay · Almoner's · Scrivener's · Hiring Post · Assay · Tollhouse) | exact — the v45d "honest utilities" |
| Major improvement (public priced power) | the **2–3G power tier** (Racking · Abbey · Hopex · Kiln · Bonded · ship-shapers) — the v45d GWT ladder | exact |
| Ovens (goods→survival converter) | **Hop Exchange / Abbey Cellar** (hops→pips/readiness — goods→quality) | already built, v45d |
| Fireplace→Hearth trade-up | **overbuild** (one payment, displaced tile boxed) | built — and *deliberately* lossy (the churn-mint watch says don't add keep-both chains) |
| Occupation action-cost throttle | the **2 seats** + Bergen ≤1/ship + printed fees | built — keep; the squeeze is the throttle |
| Prerequisites on strong minors | **— missing —** | the biggest untapped "earned" lever |
| Endgame-collector cards (Braggart/Loom) | **— missing —** (only the Flight & majorities score at end) | open seat, private-side only |
| Build-around spikes (Wet Nurse) | **— missing —** (all 5 specialists are drips) | open seat |
| I-deck interaction triggers | only the berth race itself; no card pays you on a rival's action | open seat, use sparingly |
| Dealt hands / drafting | **FORBIDDEN** (hard constraint: no cards-as-hand) | port the variance to the deck: wide roster → thin FACE-UP display (the game's stated Orléans-lite seat) |

**What must NOT port** (the filter that killed ideas below): anything adding tally dice (the
12-pool is THE clock — inviolable); hidden hands; ongoing effects with no component to carry
them; **building-side endgame scoring** (buildings have no owner — endgame conversion belongs
to private tiles only); keep-both trade-up chains (the churn/+3★ mint watch).

## 4 · The current sets under this lens

**Specialists (5 designs · max(2,n−1) copies · all drips):** Cellarman (start +1), Grain
Factor / Hop Gardener (goods drips — literal Wood Cutters), Stevedore (load 2), Braumeister
(turn-start age tick). Verb coverage: *gain-goods ×2, brew-start, turn-start, load.* **Verbs no
specialist touches:** deliver/park · sail timing · commission · presence/majority · lading
claim · recipe acquisition · the rival's turn · game end. Texture coverage: drips only — **no
spike, no collector, no interaction, no prerequisite.** And at 5 designs the whole roster shows
every game: there is no "which specialists came out this time?" — the exports deal 3-of-4, the
buildings shuffle, but the specialist economy is constant.

**Buildings (17 tiles · 15 designs):** the Agricola shape is already here post-v45d — a utility
floor (echo verbs, free–1G), a power tier (die manipulation, 2–3G, grain-only fees), one event
tile (Bonded — the Orléans-events trial), plus ship-shapers. Gaps: the event family is a family
of ONE; nothing touches the **lading row** (the shared variable economy nobody can steer);
nothing touches **wharf geometry** (a hull on a dead slot stays dead); and the three
ship-shapers (Cooperage/Customs/Rich Berth) are **uninstrumented** — the v45c counters cover
the die verbs only, so we can't run the v45d utilization play on them.

**The designer's read, confirmed:** the two families ARE the occupation/improvement split, and
both are one texture short of Agricola's spread. The variety ceiling is not more copies of the
same texture — it's the missing archetypes (spike · collector · interaction · prerequisite)
plus **roster variance** (a deck wider than the table sees per game).

## 5 · PROPOSALS (all numbers ⚙ · nothing adopted · names are working names)

### 5a · Specialists — keep the five drips as the floor, add the missing textures

| # | Specialist ⚙ | Trigger (existing verb) | Effect ⚙ | Fee ⚙ | Earn-gate ⚙ (component audit) | Agricola archetype | Why it serves the loop |
|---|---|---|---|---|---|---|---|
| K1–K5 | **Cellarman · Grain Factor · Hop Gardener · Stevedore · Braumeister** | — | KEEP as printed — the proven drip floor | as printed | none | Wood Cutter class | the always-fine medium bonus the ask names |
| P1 | **Innkeeper** | (new seat use) | **this tile IS a 4th vessel** — one cask may mature ON the card (die + tile sit on it) | 2G | **2 distinct beers brewed** (your flipped cards) | Wet Nurse — the build-around | runway for brew-and-hold, the launder workbench, the quality line post-v45e; spends a seat AND a gate — a plan, not a perk |
| P2 | **Supercargo** | a hull sails carrying your cask on a RIVAL's turn | gain **1 good per your cask aboard** (max 2) | 1H | none | I-deck interaction | prices the berth race's sharp edge — sailing on someone else's clock now pays freight; interaction the 2p watch wants |
| P3 | **Chronicler** | game end | **+1★ per claimed lading** at your seat (cap +5 ⚙) | 1G1H | **1 lading claimed** | Braggart — the collector | makes the order row a committed lane, not just opportunism; ⚠ ladPts≥6 is already the top win signal — start capped |
| P4 | **Alderman** | game end | **+2★ per kontor where you have ≥3 parked dice** | 2G | none | Loom — endgame per-stock | rewards flooding a port (the volume line); audits straight off the mats |
| P5 | **Guild Scholar** | gaining a recipe | recipe fees cost **1H less** (min 0) | 1G | none | "cheaper X" occupation | softens the v45e tariff for the breadth/Flight line without touching the formula; the Bock rush still pays 2H+brew |
| P6 | **Town Crier** | presence bump | your bumps park at **face 2** (2★, same clock spend) | 1G | **delivered to 2 kontore** | rule-bend drip | the bump line becomes real value; Novgorod stays flat (premium is delivery-only); the name honours the v0.11 Towncrier |
| P7 | **Chandler** | any time, 1×/turn | swap **1 grain ↔ 1 hops** with the stores | 1G | none | Grocer — the private market | smooths the G/H mix as hops turn binding (three v45e/d sinks); pure tempo, no mint |
| P8 | **Shipwright** | you commission | gain **1 good** (the yard's retainer) | 1H | none | verb drip | makes hull-authoring a lane; ⚠ gatekeeper #5 calls commissions the legible trap — this must not paper over the trap, watch pick-rate |

### 5b · Buildings — deepen the event family, touch the row and the geometry, instrument before cutting

| # | Building ⚙ | Fires | Effect ⚙ | Fee ⚙ | Agricola archetype | Why it serves the loop |
|---|---|---|---|---|---|---|
| B1 | **Victualling Yard** *(EPHEMERAL)* | on load here / at sail | the boarding cask's **load bonus fires TWICE**; when the hull sails, the Yard sails with it (boxed) | 2G | event/one-shot spike | the Bonded Store's sibling — the designer's Orléans-events seed becomes a FAMILY (place it on the ship YOUR plan feeds, harvest, the slot reopens) |
| B2 | **Merchants' Exchange** | slot stop | **cycle one open lading** to the bottom of the deck; reveal its replacement at once | 2G | converter/steer | the first hand on the shared variable economy — deny the order a rival brews toward, or refresh a dead row; priced interaction |
| B3 | **Warping Capstan** | slot stop | **move one EMPTY hull** to any shipless slot | 2G | geometry utility | cures dead-corner hulls, sets up Kiln-under-hull plays; the wharf becomes authorable geometry, not just tiles |
| B4 | **Cooperage · Customs · Rich Berth** | — | NO change yet — **extend the sim verb-usage counters to the ship-shapers first**, re-read, then reprice/cut | — | (the v45d method) | evidence before surgery: Racking/Tollhouse earned their v45d rework off a utilization read; these three never got one |
| B5 | **Deck subset deal** | setup | print **~20–21 designs, deal 17** per game (guarantee 1 Kiln + 1 Mission Quay ⚙; shuffle the rest in) | — | E/I/K deck variance | the exports' deal-3-of-4 grammar applied to the wharf — every game a different building economy, zero new rules |
| B6 | *(rejected on principle)* | — | endgame-scoring buildings · keep-both trade-ups · lift-at-delivery tiles | — | — | no owner = no endgame credit; churn-mint watch; "gates read the die as it boards" stays one clean read |

### 5c · System dials (the structural half of the proposal)

| Dial ⚙ | Today | Proposed | The Agricola lesson it imports |
|---|---|---|---|
| Specialist roster | 5 designs × max(2,n−1) — full visibility every game | **~12 designs × 1–2 copies** (deal all into the deck; display of 4 unchanged) | the deck is the replay engine; the DISPLAY becomes the roadmap (no hands — the hard constraint routes variance through the face-up market) |
| Earn-gates | none | **2–3 spike specialists carry printed prerequisites** (flipped cards · parked dice · claimed ladings — all component-audited) | "super powerful but must be earned," printed on the tile |
| Seats | 2, open from start (v45h) | **keep 2** | the throttle; with a wider roster, picking 2 of what THIS game shows is the new squeeze |
| Fee grammar | specialists G/H mixed · buildings grain-only | keep; price spikes above drips (P1/P3/P4 ≥ the drip tier) | cost grammar throttles power |
| Texture mix | drips only (specialists) | per game aim ⚙: ~6 drips · 2 spikes · 2 collectors · 1–2 interaction | the E/I/K spread inside one curated deck |
| Parking-lot tie-in | "asymmetric starting improvements — deal 2 keep 1" (parked) | a 12-design roster finally makes this viable — leave parked, note the dependency | dealt-hand agency without hands: deal 2 TILES, keep 1 |

## 6 · Risks & watch-list ties

- **ladPts≥6 is the standing top win-signal** (v45h validation): Chronicler (P3) feeds it —
  ship capped, PATHWAYS before uncapping.
- **The commission trap** (gatekeeper #5): Shipwright (P8) makes commissions cheaper for one
  seat; if the trap is structural, a specialist rebate hides it — read pick-rate AND the
  commissions/game watch together.
- **Hops carry three sinks** (v45e watch): Chandler (P7) and Guild Scholar (P5) both relieve
  hops pressure — land AFTER the flow-probe re-read, not before, or the read is polluted.
- **The Flight**: P5 accelerates breadth; watch Flight-share of winner scores.
- **Rules mass**: every proposal is one printed sentence on one tile hooked to an existing
  verb — the Agricola discipline. Anything needing two sentences gets cut or simplified.
- **Engine cost**: each new specialist/building is one case in the existing dispatchers
  (`fireCaskAct`/load flow/`hasUpgrade` checks) + AI teaches + `aiMCOptions` branches + verify
  checks — the v4.5b dice-pass precedent says ~a session per 5–6 tiles including gates.

## 7 · If adopted — the validation path

1. Designer marks up the tables (keep/cut/reprice per row — every number ⚙).
2. Prototype in two waves: wave 1 = P1/P2/P4/P7 + B1/B5 (the texture spread with the least
   watch-list contact), wave 2 = the rest after the flow-probe re-read.
3. Per the standing checklist: KEY bump · verify-v4 (+new targeted checks per tile) · light sim;
   **extend sim.js verb-usage counters to every new design + the ship-shapers (B4) in the same
   change**.
4. Full battery + PATHWAYS on the designer's call; the persona-duel harness re-run (the wide
   roster should widen lane texture — that's the point; the pole test judges it).
5. Print kit: new tiles ride `components.js` (one edit, both pages); COMPONENTS §7/§6 counts;
   the checklist row counts; learn/index one-liners.
