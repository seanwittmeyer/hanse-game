# FRESH EYES — an outside read on *Brewhouses of the Hanse*

**Consultant's working document · 2026-07-11**

Scope: I read the canon (`CLAUDE.md`, `DESIGN.md`, `RULES.md`, `COMPONENTS.md`), the engine
sections of `play.html` (constants → scoring), the two review corpora
(`playtests/logs/REVIEW-NOTES-v94.md`, `REVIEW-NOTES.md`), the three human logs
(`playtests/logs/human/`), and ground-truthed four raw play-by-plays (`pbp-2p-10`, `pbp-3p-8`,
`pbp-3p-4`, `pbp-4p-3`). I did not read the archive, the repo history, or any prior internal
v3.0 exploration. Everything below is derived from the live v2.9.1 game and its evidence.
All proposed numbers are tuning placeholders, marked ⚙ per house convention.

**The one-paragraph verdict.** This is a real game — the dual-role cask, the living slots, and
the deliver→author→deliver-better loop are a distinctive, publishable core, and the healthy
logs (3p-4, 3p-10, 4p-4) show it singing. But the game currently asks a physical table to be a
*spreadsheet*: the demand die is a computed cell, the slot is a filing tray, and the stations
are flowcharts. The digital build hides this (auto-greying, auto-recompute, previews); cardboard
cannot. The good news is surgical: the die is the only piece of state in the game that is
*derived* rather than *owned*, and it can be removed without touching the keystone. The station
menus can compress to printed two-verb faces by re-homing two verbs that grew there for
historical reasons. And the Floor and the clock — the two systems the evidence shows misbehaving
— need structure levers that are cheap and already half-designed. None of this makes the game
smaller. It makes the same decisions visible on the table instead of in someone's head.

---

## 1. Diagnosis — where the table cost actually lives

### 1.1 The slot stack is a filing system, not board state

Assemble the worst legal slot from `COMPONENTS.md` §1/§3/§7 and `RULES.md` §5:

> building tile + owner frame + ship tile + up to 4 cask cards tucked under the hull (Cooperage)
> + **one demand die per cask** + a +1-quality marker per lifted cask + an owner disc per cask
> + load-order preserved by tuck position + (Jopenbier) a vintage cube.

That is 10–14 physical pieces expressing *one* of eight slots, several of them derived values
that must be re-staged when anything upstream changes. `COMPONENTS.md` §17 already concedes the
carrier problem in writing: gap #3 (*"2.5″ cask cards can't sit in the die-sized printed
berths; where cargo cards go and how load order is preserved is undefined"*) and gap #12
(*"demand dice supply (8) unverified"*). The designer's brief describes exactly this stack from
the table side. The manifest and the table agree: **the stack is over its physical budget**, and
the overage is concentrated in one place — the tokens that carry *computed value* (dice,
markers) rather than *owned things* (casks, hulls, tiles, discs).

### 1.2 The demand die is a computed cell pretending to be a token

The die's job (`RULES.md` §5a/§7, `caskBldgValue`/`shipBldgValue`/`deliverCask` in the engine)
is to freeze a bonus at load and pay it at delivery. Sensible digitally. On a table it fails
three separate ways:

1. **It is set by a formula, not a read.** Census of the 12 privilege designs: 4 are flat
   (Staple +3, the four kontor charters +4), 1 scales per quality (Burgomaster), 1 is
   quality-gated (Connoisseur Q4+), 2 are **majority-state-dependent** (Hanse Diet "where you
   LEAD", Almoner "where you do NOT lead"), 2 fire **at the sail, on the ship's slot**
   (Rich Berth +2, Festkeller Hulk +3), 1 pays at a different destination class (Reliquary,
   Hall only). On top of every one of them: the Q4/Q5 premium (+2/+3), the set-not-accumulate
   rule, and the hard cap at 6. A player setting a die answers up to five questions per cask.
2. **The die's value isn't knowable when the table wants to set it.** The spec says
   capture-on-load, but the physical instinct (and the digital preview, `caskPreviewBonus`) is
   to stage the die at *deploy* — "this cask will bank 5." That forecast is wrong for
   Hanse Diet/Almoner (the lead changes), wrong when a Rich Berth appears or vanishes under the
   hull, wrong when the building underneath is overbuilt. Hence the designer's exact complaint:
   *swap a building and you re-calculate all the dice.* The rule as written avoids this only by
   forbidding the table's natural behavior — a losing fight.
3. **It multiplies.** One die per cask, per berth, per hull, plus quality markers. Gap #12 is
   real: a 4p wharf with two loaded Hulks and three staged privileges wants ~10 carriers.

And here is the sharp part: the evidence says the *lane* the die serves is essential while the
*carrier* is not. Trend D of the v94 synthesis: every headline score routes premium casks
through owned privileges (Bock Q5 = 12 at Novgorod ×4; Gruit Q1 = 5 at Bruges; Mumme = 10), and
when nobody authors privileges the game collapses to the 1★ floor and flat 29-point tables
(3p-7, 4p-3). The variable-demand layer is the game's ceiling. The die is merely its bookkeeping
— and §3 below shows the bookkeeping can be paid out at a different *moment* and disappear.

### 1.3 The stations are flowcharts, not faces

Census of the four stations as actually implemented (engine `enterCell` → sub-flows, `RULES.md`
§4):

| Station | Face today | Real decision surface |
|---|---|---|
| **Market** | take 2 goods OR acquire 1 tile | 3 goods-mixes + ~4 recipes + 4 buildings (each with 8-slot placement + ground-rent check) + 3 ships (placement + dockside pickup + free-load picker) + contract ≈ **15 live buttons**, but shaped as one pick — the designer is right that this one is already the model |
| **Brewhouse** | Brew **AND** Deploy-anywhere | recipe pick × steerable-pile read, then a deploy with 8 candidate targets |
| **Cellar** | open chained menu: Age (allot 3) · **Tap ×N** (v83 repeatable) · buy Specialist ×N · Blend, any order until Done | the deepest flow in the game; the logs show it used as a combo engine (4p-8: brew + deploy + TAP + **three Specialists in one visit**) and as an idle animation (4p-5: "25 Taps… with no outlets, GMs tapped casks for goods; Tap became the idle animation") |
| **Harbor** | ONE of Load / Enshrine / Charter | each verb opens its own cask-picker → ship/destination picker; Charter is a 2-stage flow |

Then multiply by the line: a public activation is *slot · station · station · slot, any order,
all optional*, where each stop can open one of the above. The whiff problem is structural: the
raw logs carry 3–5 null stop lines per turn ("no Ready cask to deploy", "nothing to load" —
batch B trend 9), which the digital build greys out but a table must adjudicate by hand, stop by
stop. **The turn is not too long because the actions are big; it is too long because each stop
is a menu and half the menus are empty.**

### 1.4 Secondary frictions — cheap, mostly keep

- *Effective quality* (kilns/Gauger/Duckstein, cap Q5) is one marker and one read; it is fine,
  and v2.9.1's "a lift counts for gates and points alike" is the right one-rule form. Keep.
- *The occupancy toll* is one coin at a defined moment. Keep (it does quiet good work — 23
  tolls/game at 4p tax the shadower).
- *Load order in berths* matters only for benefit sequencing at delivery; with §3's change it
  matters less and the "tuck under the hull edge in order" fix (gap #3) suffices.
- *The three-colour tile taxonomy* (v2.4.1) is genuinely good and should be kept exactly as is —
  it is the reason the sharing rule can be one sentence.

### 1.5 The pathologies that are NOT component problems — but intersect both themes

The v94 corpus surfaces four behavioral holes I have to treat as design inputs, because any
Theme-1/Theme-2 rework must not worsen them and ideally repairs them:

- **The clock is opt-in and bimodal** — R9 and R25 on the same cap at every player count
  (synthesis trend A; ground-truthed: 4p-3's 13 ticks = 5 sails + 8 chaff enshrines by R9;
  2p-10's 28 consecutive Floor no-ops to the ceiling). The Sailed-Ships track "measures table
  temperament, not game progress."
- **Enshrine does three jobs** (cheapest score, full tick, slot-clearer) and is best-in-class at
  all of them (trend B). It is the leader's door-slam at 2p and the stampede at 4p.
- **The wharf-jam terminal state** — nothing ever reclaims a slot for a *ship*; a fully-built
  ring closes the harbor channel permanently (3p-2: the only seat with contracts and gold was
  structurally unable to tick; the leader benefits from the stall).
- **The Floor is a costless infinite pass and, with Survey, a self-funding loop** (2p-10;
  ground-truthed 3p-8: survey → free building → 1G rent → overbuild → flip → Wild pays ~2G/turn
  → funds the next rent — "rent is underwater against its own reward", and the loop consumed the
  entire building deck in three games).

The human logs (g1–g3) confirm which of these are real and which are bot artifacts: humans
pilot the demand lane beautifully (every deploy targeted under a value tile), race the same
clock with premium cargo, and use the Floor as designed — but they *share* the
charter/enshrine endgame race, the deploy-slot scarcity, and the cheap-cask closers (g1 ends on
a Gruit→Bruges charter past the cap). And g2 contains the tell for Theme 2's trap: a human
mis-deploys a Mumme under Rich Berth (a ship-target tile), and g1 has Sean deploying a Bock
under *Olli's* Peterhof — under current owner-only rules that is a silent zero. The traps are
human-real.

---

## 2. Theme 1 — line activation

### 2.1 What "one action per station" should mean here

The designer's instinct is right and the Market proves it: a station face should be a printed
**this-or-that** — two verbs, each of which may open exactly one bounded picker. The offenders
are the Cellar (an open, chaining, repeatable menu), the Brewhouse (an AND), and the Harbor
(three verbs, two of them multi-stage). The fix is not to shrink the actions but to **re-home
two verbs that only live at stations for historical reasons** (Tap, and the third Harbor verb)
and print what remains.

### 2.2 The proposed station faces (≤2 verbs, printed)

| Station | Printed face ⚙ | Notes — what it absorbs, what it sheds |
|---|---|---|
| **A · Market** | **SOURCE 2 goods ⚙ — or — ACQUIRE 1 tile** (recipe · Privilege/Building · ship commission · contract) | Unchanged in substance; this is already the model. The face prints the four acquire icons in one row. |
| **B · Brewhouse** | **BREW 1 recipe — or — DEPLOY 1 Ready cask to ANY slot** | Was AND; becomes OR. This is the real sharpening: *brew-and-deploy-same-visit* dies, and that is a feature — it forces the "hold which, deploy when" beat onto separate turns and gives the Floor its moment (§4). The Brewhouse keeps the wharf-wide deploy as its identity: it is the cask hub, the global valve behind the slot-local rule in §2.3. |
| **D · Cellar** | **AGE (3 points ⚙ across vessels) — or — HIRE (buy 1 Specialist from the display)** | Exactly the designer's suggestion. Blend (expansion) prints as an alternate use of the AGE verb ⚙ ("age, or marry two Ready casks"). **Tap is retired as a station verb** — see below. Multi-specialist turns (4p-8's three-in-one-visit) die; good — that was engine-race compression the scarce deck was meant to prevent. |
| **C · Harbor** | **LOAD 1 cask onto a hull — or — DISPATCH 1 deployed cask** (to the **Hall**, free, prestige ladder · or to a **kontor**, spend a contract + `2 G` ⚙ fare) | Enshrine and Charter are already siblings — single-cask, deploy-first, clock-relevant sendings. Unifying them as **Dispatch** makes the Harbor a true this-or-that with one shared gesture (pick a deployed cask → pick where it goes) and one rules paragraph instead of two. The Quaymaster exception reads identically ("Dispatch from your vessels"). |

**Where Tap goes.** Tap has three jobs in the logs: cash conversion (tap a Gruit for goods),
vessel un-jamming, and **recall** — clearing your own slot for a better cask (humans use it
exactly so in g3). The first two are covered by the Floor (vessel casks fire their actions
*without* being discarded — strictly better) and by Deploy/Dispatch. The third is the only
irreplaceable job, and it folds into Deploy as one printed line:

> **Upgrade-in-place ⚙:** you may deploy a Ready cask onto a slot holding **your own**
> lower-quality cask; the lesser cask returns to the box.

This generalizes v2.9's spoilage downward for your own casks only (spoilage stays the
cross-player Q4-over-Q1 rule), covers the recall use-case with zero new verbs, and kills the
repeatable-Tap menu depth (v83) that the logs show degenerating into an idle animation (4p-5)
and a jam-flush spasm (4p-8's "four consecutive TAPs"). What is genuinely lost: the tap-a-cask
cash spike (2p-2's Tap-Gruit-then-fit-two-Specialists turn) and Tap-as-vessel-liberation. The
first is an intended nerf (deploy-then-self-tap on turn 1 was flagged "slightly degenerate" in
2p-3); the second is real — watch vessel clog in sim, and if it bites, the dial is the Cellar's
AGE verb gaining "…or discard one Ready vessel cask for its action" ⚙ as a printed sub-line,
NOT a return of open-ended Tap.

**What this costs, honestly.** The Brewhouse OR removes the tightest tempo loop in the game
(source → brew → deploy → load in one activation — TraderV's R3 "clean trader loop" in 2p-1).
Turns get one notch less explosive and the game maybe half a round longer per delivery cycle.
I consider that a *pacing benefit* given the R9–R11 collapses, but it must be A/B'd (§6.4). The
Cellar OR removes Tap→Buy chaining, which was the Flexible Cellar's showcase — accept it; the
chain was digital-native cleverness the table pays for in menu depth.

### 2.3 Slot-locality: "a slot acts on itself; a station reaches the wharf"

The designer asks for real analysis of restricting deploy/load to the activated slot. My
conclusion: **adopt it for slots, keep the stations global, and state it as one principle.**

> **The locality rule ⚙:** a *slot's* stop acts on that slot — an empty (or building-only)
> slot's stop deploys a Ready cask **onto that slot**; a ship's stop loads **one cask from that
> ship's own line** aboard. A *station's* verb reaches the whole wharf — the Brewhouse deploys
> to any slot; the Harbor loads any eligible cask onto any hull.

**For (and it is strong):**

- It answers the confused player *exactly*: the stop does what it says, where it is. A line
  becomes fully readable at a glance — "fire the top row: deploy here, Market, Brewhouse, load
  the Cog from this row."
- It converts placement from a reach gesture into board strategy. Which line you fire determines
  where cargo can appear and which hull it can board — privileges, hulls, and casks on *your*
  lines become the engine-grows-into-the-board heart of v1.0, now with teeth. The g3 human
  pattern ("both players deploy Bocks under the SAME Connoisseur's Cellar — one well-placed
  privilege becomes the table's routing hub") gets sharper, because the hub's *line* matters too.
- It is a natural throttle on deploy/load tempo without a new counter (max two local deploys per
  line + one Brewhouse global).
- The ship-stop's line-local load is thematically the gangplank: casks board from the quay they
  stand on.

**Against (what breaks), and the mitigations:**

1. **Deploy-lock arrives earlier.** Today "no open slot" needs all 8 occupied; under locality a
   player can be locked out with 5 open slots that happen to sit off their lines. 3p-2's
   terminal congestion is the nightmare case. Mitigations: the Brewhouse global deploy is the
   standing valve (one move away from anywhere, by design of the 2×2); upgrade-in-place and
   spoilage open occupied slots; and §6's ship-channel guarantee drains the ring. This is the
   single biggest risk of the package — it gets a dedicated sim metric (blocked-deploy rate,
   §6.4).
2. **Hull-fill slows** → sail-when-full games lengthen; the fill-a-hull interaction (the game's
   best system) gets rarer per turn. Mitigation: the Harbor Load stays global (the harbormaster
   reaches the whole wharf), so a committed shipper is untouched — what slows is *incidental*
   loading, which is exactly the "oops, the line happened to let me" texture the designer is
   trying to make deliberate. Rival-loading lives mostly on the Harbor verb and commission's
   free load; both stay global, so the interaction layer keeps its reach.
3. **The v1.4 deploy-combo** (deploy onto a pending empty slot, then fire the cask's action this
   turn) simplifies away: under locality, deploying *is* that slot's stop, so a fresh cask acts
   on future activations, not this one. That is a small tempo nerf and a big legibility win (no
   more stop-mutation mid-line). State it as the rule: *a cask acts on later activations.*

**Verdict:** adopt, two-tier. If sim shows the blocked-deploy rate spiking at 4p, the fallback
is locality-for-load only (ship stops line-local, deploy stays anywhere) — but I'd fight for the
full principle first; it is the single change that most makes the physical line *read*.

### 2.4 The turn after the change (worked example)

> Move to the Brewhouse. Choose the top row. Four stops, any order, each one printed thing:
> **s8**: deploy my Ready Mumme onto s8 (it sits under my Staple Hall — banked when it departs,
> §3). **Market**: acquire — commission the Cog→Novgorod onto s3 (dockside pickup still legal).
> **Brewhouse**: brew Bock (top of the Q5 pile shows *Survey* — tempting, but I take it).
> **s3**: the Cog's stop — load one cask *from this row*: my Mumme steps aboard.

Every stop was local, visible, and one decision. That is the game the brief is asking for, and
it is the same game — nothing in the example was newly forbidden except reaching across the
board from a slot.

### 2.5 Validation specific to Theme 1

`sim.js` drives the engine's own UI machine, so the bot needs the deploy/load target changes
mirrored (its `UI.sub==='deploy'` and load flows). Gates: 500 games 2–4p, 0 crash/deadlock;
pace in band; **new counters**: blocked-deploy rate per seat-turn (alarm ⚙ >8%), hull
fill-time distribution (alarm if median fill >4 rounds ⚙), rival-load frequency (should hold
within ~30% of v94's 5.0/game at 4p ⚙). Then PERSONAS/CELLAR for lane drift and the ladder for
skill-tier integrity (v1.3 showed deploy-model changes compress tiers — expect an `ai-tune`
pass).

---

## 3. Theme 2 — the slot stack without the dice

### 3.1 What the die actually does

Strip it to functions: (1) **defer** a bonus earned at the slot to the delivery moment;
(2) **cap/merge** stacked bonuses (set-not-accumulate, max 6); (3) **telegraph** value at stake
on a hull. Function (2) only exists because (1) lets bonuses stack across time (dock bonus +
sail bump). Function (3) is nice but the score track can carry it. So the die exists to serve
the *deferral* — and the deferral itself is the design choice to interrogate.

Why was payment deferred to delivery? The v0.16 lesson ("benefit-on-load removed the reason to
sail") applies to the **destination's** benefit and points — if the *kontor* paid at load,
nobody would fill hulls. It does not apply to the **building's** bonus, which is earned at the
dock, by the dock's owner, for work the dock did. Pay the building at its own moment and the
carrier has nothing left to carry.

### 3.2 Candidate 1 — **"Bank at the Gangplank"** (keep the privileges, kill the carrier)

> **Rule ⚙:** when **your** cask departs a slot bearing **your** value tile — by Load, by
> Dispatch (Hall or kontor), or by a rival loading it away — **bank the tile's printed ★ on the
> score track immediately.** The tile prints one or two flat numbers and nothing else rides the
> cask. Delivery stays exactly v2.3: *the destination's starting value, on delivery* — plus
> nothing, because the building already paid.

Consequences, walked through:

- **The recompute problem dies.** Nothing on a slot or a ship carries derived state. Overbuild a
  building mid-turn: no die to re-derive, because value is only ever read at one instant — the
  departure — from the tile that is physically there at that instant. The designer's
  "re-calculate all the dice" scenario cannot occur.
- **The stack shrinks to owned things:** building + owner frame + hull + cask cards + one
  optional +1Q marker (below) + discs. Dice (8) leave the box; gap #12 closes; gap #3 reduces to
  "tuck cargo in order."
- **The lead-dependent tiles become honest** — "where you lead" is checked once, at departure,
  against the presence discs on the destination board (a physical read), instead of being a
  moving target a staged die silently lies about. (I still re-text them; see the disposition
  table.)
- **The quality premium survives as print, not arithmetic:** each privilege prints two values —
  e.g. Staple Hall: **+3★ (Q4+: +5★ ⚙)**. One read at one moment. "Quality Pays" (v1.8) is
  preserved as a second printed number, not a formula.
- **Ship-target value tiles cannot survive as value** (their moment — "at the sail" — is the
  deferral). Rich Berth and Festkeller are redesigned as works (§3.6) — and the logs mourn
  neither: across 30 games "Rich Berth, Almoner's Stall, Customs House and Gauger's rarely/never
  scored" (batch C trend 2), while ship-target privileges caused mis-deploys even at the human
  table (g2's Mumme under Rich Berth).
- **The cap-6 rule is deleted, not replaced.** A cask departs one slot; there is nothing to
  stack. One rule fewer.
- **Stranding softens.** 2p-2's defining failure (two Q5 Bocks + a Steelyard privilege ≈ 20 pts
  dead on a 2/3 hull the leader refused to fill) splits: the privilege ★ banks at load, so the
  hostage is only the destination value. Rival inaction remains a lever (good — it is
  interaction) but stops being a total bonfire (the "saddest accident" of batch F).
- **The grief play reprices itself.** "1G to ship a rival's Q5 to a 1★ kontor" (4p-7, 4p-9)
  still exists — but if the victim's cask stood on their own privilege, they banked it at the
  hostile load. The knife stays sharp (destination choice + majority denial) without deleting
  10+ points in silence. The newbie trap ("deployed under a rival's tile = silent zero") shrinks
  to a visible non-event: no ★ banked *at the moment of departure*, when attention is on the
  slot — feedback at the teachable instant instead of rounds later at delivery.

What it costs — honest ledger:

- **Anticipation on the hull.** The loaded die telegraphed "this hull carries 9★." Gone;
  replaced by score movement at load. The drama relocates from delivery to departure. I think
  the table *feels* this as a gain (immediate payoff at your own action) but it is a real change
  to the reward rhythm — the v0.16 "urgency to fill and sail" softens slightly for privilege
  owners. The destination value + majority + benefit + Flight all still seal at delivery, which
  keeps sailing the main event.
- **Score-track traffic.** More mid-turn banking. The Hall already banks live; the pad/track is
  in the box (§3 supply). Acceptable.
- **A rules asymmetry to teach:** buildings pay at departure; destinations pay at arrival. One
  sentence — *"the dock pays when the cask leaves it; the port pays when the cask arrives"* —
  and it is thematically exact.

**The +1-quality marker stays (alone).** A kiln lift must ride to delivery because quality is
read at the destination (Novgorod scaling, Hall ladder, gates). One marker type, six in the box,
placed at departure. This is the only carrier left, and it is a *fact about the cask*, not a
computed value — the acceptable kind of token.

### 3.3 Candidate 2 — **"Works on the Wharf, Demand at the Kontor"** (no value on slots at all)

The deeper cut, answering the designer's "are there other ways buildings could manipulate the
loop *without touching cask value*":

> **Rules ⚙:** every slot tile is a **work** (green) — quality, capacity, gates, tempo, actions,
> routing; the blue owner-only value class is retired. The variable-demand layer moves to the
> **destination board**: at setup, deal each kontor one face-up **Demand tile** ⚙ from a small
> deck (e.g. *Bruges: each Q2+ cask +2★* · *London: Hopped/Broyhan +3★* · *Novgorod: Q5 +3★* ·
> *Bergen: each 2nd cask you deliver here +3★*). When a kontor has received N ⚙ deliveries,
> its tile is replaced from the deck (demand satisfied; the market moves). Authorship is paid
> structurally: **+2★ ⚙ at game end per building you own standing on the wharf** (the builder's
> mark — the wharf itself is the record, mirroring the floor bonus).

Strengths: the deepest possible simplification of slot state (a deployed cask is *just a cask*;
nothing on the wharf ever needs recomputation, because works are self-evident at use); the
demand layer becomes a **shared, public, readable market** — "what pays where" is one glance at
the destination board, which directly serves the designer's "easy-to-understand paths that are a
puzzle"; setup variety (which demand tiles came out) replaces draft-luck flatness; the newbie
trap is *gone*, not softened — there is no owner-only value to bonfire a cask on.

Weaknesses, and they are structural: it **guts the authored-value keystone** — the
deliver→author-a-privilege→route-through-it loop is the game's GWT inheritance and its
five-lane demand path; a builder's-mark endgame ★ is a pale substitute for "my Staple Hall made
that Bock worth 12." The privilege *contest* (squat, deny, overbuild a live route — the human
g2 highlight: "Sean overbuilds Olli's Connoisseur's Cellar — targeted displacement at a live
route") loses its object. And rotating demand tiles are a new subsystem with their own upkeep
(the replace-after-N counter is exactly the kind of tracked state we are removing elsewhere).
It also adds a component family, net of the dice it removes.

### 3.4 Candidate 3 — fixed-denomination chits (rejected)

Replace the d6 with printed ★-chits taken from the tile at load. Rejected without prototyping:
it keeps the deferral, so it keeps the recompute-on-overbuild problem, the cap/stacking rule,
and the carrier clutter — it swaps a die for a pile. It is Candidate 1's cost with none of its
payoff. Recorded so nobody re-walks it.

### 3.5 Trade ledger

| Axis | C1 · Bank at the Gangplank | C2 · Demand at the Kontor |
|---|---|---|
| Slot-stack pieces removed | dice (8), cap rule, sail-bump | dice, cap rule, markers *mostly*, the blue class itself |
| Keystone (authored value) | **preserved intact** | replaced by builder's-mark endgame ★ |
| Privilege contest / denial | preserved | object removed |
| Newbie bonfire trap | softened + feedback moved to the teachable moment | eliminated |
| New subsystems | none | demand deck + rotation counter |
| Component delta | −8 dice | −dice, +demand tiles (~12 ⚙) |
| Rules delta | −cap rule, −wharfage-era arithmetic remnants; +1 sentence (pay-at-departure) | −privilege rules; +demand-market rules |
| Blast radius (engine) | `captureLoad`/`deliverCask`/`loadBonus` + ~8 tile re-texts | scoring spine + tile family + new deck + AI valuation rewrite |
| Risk to the five lanes | low (demand lane keeps its shape) | high (demand lane changes owner: from *you* to *the board*) |

**Recommendation: build Candidate 1.** It removes exactly what the brief complains about (the
carrier, the recompute) while preserving the thing the brief praises ("the buildings are rich
and make each play interesting and strategic"). Keep Candidate 2 on the shelf as the named
fallback if C1 playtests still find owner-only value too trap-prone at real tables — and note
that C2's *demand-tile* idea is separable: it could later ride on top of C1 as an expansion
module (a rotating bonus above the printed kontor values) on the existing expansion spine.

### 3.6 The building vocabulary after C1 — loop-manipulating works

Redesigns forced by C1, plus new works that answer the designer's "manipulate the loop" ask.
Every effect below is positional, self-evident at use, and carries zero tracked state:

| Tile | Disposition ⚙ | Why |
|---|---|---|
| Rich Berth | → work: **"a hull docked here may sail with one berth empty"** ⚙ | converts the dead ship-privilege into the pressure valve the logs beg for (slot rot, 2/3 hostage hulls, 2p-2) — and it is the anti-Cooperage, a real choice |
| Festkeller | → cut from base ⚙ (or Specialty Beers flavor) | Hulk-only value never scored in 30 games |
| Cooperage | keep, but note the anti-synergy is now *opposed* by Rich Berth′ | +1 berth = slower hull under sail-full (3p-1) — with Rich Berth′ in the deck the pair is a genuine speed/size axis |
| Customs House | keep (−1 gate) | clean work, occasionally decisive |
| Gauger's Office | **cut**; its lift is the Malt Kiln (2 copies already) | confirmed dud — authored ~8×, scored ~once, across 30 games |
| Malt Kiln / Hop Yard / Smoke Kiln | keep (+1Q marker at departure) | the quiet best combo in the corpus (Q3+kiln = 7★ Hall) |
| Brewmaster's Workshop | keep (acts-as-Wild while docked) | positional, stateless |
| Staple Hall / kontor charters / Connoisseur / Burgomaster | keep as C1 privileges, flat prints + Q4+ line; Burgomaster re-text: **"+★ = the departing cask's quality (max 5 ⚙)"** — a pip-count read | Burgomaster is the strongest tile in the box (batch C); the pip-read keeps it legible; watch its price ⚙ |
| Hanse Diet / Almoner's Stall | re-text to board-readable, non-oscillating conditions ⚙: Diet → *"+2★ and place 1 presence at the destination"*; Almoner → *"+3★ if you have no presence disc at the destination yet"* | "lead/do-not-lead" is the last majority-state read in the value layer; the Almoner form is checkable from a single disc glance and keeps its catch-up soul |
| Reliquary | keep (+2★ on a Hall dispatch from here) | already pays at its own moment |
| **New — Pilot's House** ⚙ | work, ship-target: *"a hull docked here may change its printed destination to an adjacent-gate kontor when it sails"* ⚙ | routing as loop-manipulation; dissolves the premature-commission trap (2p-8's dead Novgorod Hulk blocking a slot ten rounds) |
| **New — Open Staithe** ⚙ | work, cask-target: *"a cask may deploy here before it is Ready; it matures +1 at its owner's turn while docked"* ⚙ | the public cellar: frees vessels, feeds the climb, keeps the cask contestable — pure source→brew→age→ship manipulation, zero value math |

That is a full deck's worth of loop-touching variety with **no formulas anywhere on the wharf**.

---

## 4. The Floor — a deliberate one-turn tension

### 4.1 The three faces in evidence

1. **The designed use** (human g2): dodge the contested Harbor line, fire two flipped Wilds +
   a cask's source, and still brew a Bock — a deliberate, paying stay-home turn. This is what
   the designer wants more of.
2. **The costless infinite pass** (pbp-2p-10, ground-truthed): 28 consecutive Floor no-ops —
   *"Floor — Hopped's age action / nothing to age"* — because the mirror's Nash is mutual stall
   and the Floor is the only line with no cost, no toll, no station, and no minimum effect.
3. **The self-funding loop** (pbp-3p-8, ground-truthed): Floor → cask's Survey → free building →
   1G rent → overbuild → flip → flipped Wild pays ~2G/turn → fund the next rent — fourteen-plus
   overbuilds, the deck emptied, the ring bricked. Rent is underwater against its own reward.

The designer's ask — *"the thing you need to do sometimes, but doing it means you can't visit
the wharf"* — is already half true (it is mutually exclusive with the lines). What's missing is
that it costs nothing else, gates nothing, and can be null. Per the house lessons (§8: structure
levers, not value levers), three structural changes:

### 4.2 The mechanisms

1. **The Floor is a stay-home ⚙: choosing it means you do not move this turn.** Your worker
   stays where it stands; you run the house instead of walking the wharf. Cost = position and
   tempo — next turn you move from where you *were*, not where you wished to be. This single
   rule creates the exact tension named in the brief: *the wharf line I need is one move away;
   the Floor is calling; I cannot have both AND keep my route.* It is also free to print (it is
   the absence of a move) and thematically perfect.
2. **Acquisition verbs do not fire from the Floor ⚙: Survey and Hire (and Wild-as-Survey/Hire)
   are wharf-only.** You cannot survey the guild from your cellar. This severs the 3p-8 loop at
   its faucet (no free building per Floor turn) while keeping the Floor's production identity —
   Source, Age, Convert, Load, Reach, Brew-via-Wild all still fire. The flipped-Wild engine
   survives as *income*, not as *board churn*.
3. **A null Floor is not a legal line ⚙: if no Floor stop would have an effect, you must choose
   a public line.** Kills the pure pass (2p-10) without touching anything else. The greyed-stop
   logic (`stopAvail`) already computes this; the printed rule is one sentence.

Plus one scoring-side companion (it is a Floor-economy fix as much as a churn fix):

4. **The floor bonus pays only for rival displacement ⚙** — a tile you overbuild yourself flips
   (Wild) but banks nothing at game end. This kills the self-overbuild mint (winning games in
   4p-1/4p-4/2p-5 at 1G + a spare tile → +3★, "the compensation designed for victims is mostly
   being self-dealt") while keeping the victim's compensation whole. It is the cheapest, most
   targeted of the levers the corpus surfaced, and I endorse it as-is.

Held in reserve (dials, not the package): *no two consecutive Floor turns* ⚙ (a Floor token that
exhausts and readies on a public line) if stay-home + no-acquire still leaves stall tables; an
escalating ground rent ⚙ if churn persists.

### 4.3 What the Floor feels like after

The Floor becomes a **harvest turn**: you take it when your held casks and flips genuinely pay
(three maturing casks + two Wilds = a real income spike), accepting that your worker loses a
beat of position — and you cannot take it at all when your house is empty. The boutique/vertical
lane the designer deliberately buffed (v2.4's Lagerkeeper economy) is untouched; what is removed
is the Floor as *default idle* and as *board-churn engine*. Watch-item stays: the 4-slot floor
area shared with Specialists remains the brake, and the "you basically hacked the game"
dominance check re-runs in PERSONAS/CELLAR after the change.

---

## 5. Paths to victory

### 5.1 Why the table fixated on presence/majorities

Three compounding reasons, all structural, none of them "majorities are overtuned":

1. **Visibility.** Majorities are the only lane with a public, per-kontor scoreboard that ticks
   on *every* delivery (the presence discs). The Hall's ladder is a payout table; the Flight
   lives on a private strip; the demand lane lives in (currently) dice. Humans optimize what the
   board shows them counting.
2. **Zero infrastructure.** Every other lane needs a chain (brew→age→deploy→hull→gate→fill, or
   author→route→depart); a majority point is a side effect of anything shipping anywhere. When
   "keeping going with shipping" got hard (slot famine, stranded hulls — the very frictions in
   §1.5), majorities kept paying while the other lanes stalled — so they *felt* primary because
   they were the only lane whose faucet never clogged.
3. **Bergen is free money.** The +9 anchor went sole/uncontested in most 3p games (batch D
   trend 8), often via Reach chains and charters with barely any Bergen hull traffic — and
   presence can be ground from the Floor forever without delivering (4p-5's see-saw). The
   biggest tile in the majority chart is also the cheapest to farm — of course the table stared
   at it.

### 5.2 Why the Hall and the Flight went under-explored

The Hall's problem is *identity confusion*, not value: in the sims it is primarily a **clock
weapon** (trend B — cheapest score + full tick + slot-clearer; the 2p door-slam; 8 of 13 ticks
in 4p-3), so players meet it as "the thing that ends the game," not "the prestige lane."
Its payouts are fine (Q5=9 headlines constantly). The Flight's problem is *invisibility plus
end-loading*: (beers−1)² pays nothing until the 3rd beer and nothing visible ever, and the brew
ladder prices the 4th/5th beer as a luxury — yet it separates winners in the corpus (every CM
win carried 9–16). Both lanes work; neither *advertises*.

### 5.3 The clock fix is a paths fix — price the cheap tick

> **Rule ⚙: an Enshrine advances the Sailed-Ships track only for a Q4+ cask.** Q2/Q3 enshrines
> score their ladder value but do not tick. (Bolder variant, more sim-risk: enshrines never
> tick; only kontor voyages — sails and kontor Dispatches — advance the track ⚙.)

This one rule attacks four findings at once: the 4p-3 stampede (its 8 chaff-enshrine ticks
vanish → the R9 collapse can't happen), the 2p leader door-slam (slamming now requires premium
cargo — a real cost, like 2p-4's healthy close), the "trailing player ends the game"
anticlimax (a loser's chaff enshrine no longer closes anything), and the Hall's identity (it
becomes the *patient* lane — prestige as an alternative to the clock race, not its accelerator —
which is exactly the volume-vs-prestige lean the spine wants). Deadlock safety holds: the
Charter (buy a contract `1 G` + fare `2 G` ⚙) remains the always-reachable tick, and Enshrine
still relieves *slots* even when it doesn't tick. Pair with a `SAILED_CAP` re-check ⚙ (expect
−1 at 2p if games lengthen) and re-run the pole test: a hot prestige lane is acceptable; watch
only for negation.

### 5.4 Make the lanes visible — new real estate, not new rules

Under the constraint "not simpler; more strategic between easy-to-understand paths," the answer
is **not** new scoring lanes. The game already has six (Hall, demand, majority, Flight,
authorship/floor, and the boutique/Floor-economy hybrid) — more than most shelfmates. What it
lacks is equal *presence* for them on the table:

- **The Hall becomes a display, not a table:** a printed Hall board with a row per quality rung;
  enshrined casks *sit there* face-up with the owner's disc. The prestige lane gets the same
  glanceable "who's ahead" the majority chart has — without adding a contest (it stays
  uncontested by design).
- **The Flight strips move to public view** ⚙ (a per-player row on/near the destination board
  rim, marked on first delivery of each beer). When the table can see "Adaline is one beer from
  16," breadth becomes a race you *watch* — the strip already exists (`COMPONENTS.md` §12);
  this is a relocation, not a component.
- **Enforce the finite presence discs as the printed Reach cap** — the manifest already says it
  (*"finite supply = your trade-factor cap"*, §4); make the rulebook say it loudly and consider
  12 ⚙ (from 14) so the Floor-ground Reach chains (4p-5) hit a wall. This is the structural
  answer to Bergen-as-free-money: reinforcing the anchor costs standing you could have spent
  owning slots and riding ships.

### 5.5 Do we need genuinely new paths?

No — and I'd resist them. The corpus's healthiest games (3p-10, 4p-4) already show four
different winning profiles on the same table. Every candidate "new path" I can construct
(contracts-as-collection, per-round demand fulfilment, a wharf-development track) either
duplicates an existing lane or adds tracked state — the exact currency this whole pass is
spending down. The one *reframing* worth taking: after §4's fixes, name the floor/authorship
package (flips + builder's play + boutique economy) as an explicit lane in the rulebook's
"legible fork" text, so the player who wants to build tall at home knows they are on a path,
not exploiting one. New *content* (more works like Pilot's House/Open Staithe, more specialty
beers — the designer's own note that "the differences between the base 6 beers isn't enough but
the specialty beers add zest") is the correct place for expansion energy: content, not rules —
the founding lesson.

---

## 6. The recommended package

### 6.1 P0 — build first (one keystone pass, sim-gated as a unit)

1. **Bank at the Gangplank** (§3.2): dice out of the box; privileges pay printed ★ at departure;
   quality premium as a printed second line ⚙; cap-6 rule deleted; +1Q marker is the sole rider.
2. **Tile pass riding on it** (§3.6): Rich Berth′ (sail one short ⚙), Festkeller cut ⚙, Gauger
   cut, Diet/Almoner re-texts ⚙, Burgomaster pip-read ⚙; add Pilot's House ⚙ + Open Staithe ⚙.
3. **Two-verb station faces** (§2.2): Market Source/Acquire · Brewhouse Brew/Deploy-anywhere ·
   Cellar Age/Hire · Harbor Load/Dispatch; Tap retired; upgrade-in-place deploy ⚙.
4. **The locality rule** (§2.3): slot stops act on their slot (local deploy; line-local ship
   load); stations reach the wharf.
5. **The Floor pass** (§4.2): stay-home ⚙; no Survey/Hire from the Floor ⚙; null Floor illegal;
   floor bonus rival-only ⚙.
6. **The clock pass** (§5.3): Q4+-only enshrine ticks ⚙; `SAILED_CAP` re-check ⚙.
7. **The ship-channel guarantee** ⚙: a hull may be commissioned onto a **building-only** slot
   (it docks at the work; the building applies) — a fully-built ring can never close the harbor
   again (3p-2's hole).
8. **The lane-visibility pass** (§5.4): Hall display board; public Flight strips; the printed
   presence-disc cap (12 ⚙).

Items 1–2 are Theme 2; 3–4 are Theme 1; 5 the Floor; 6–8 the pace/paths repairs the evidence
demands. They are one package because they trade against each other: locality (4) leans on the
Brewhouse valve kept in (3) and the channel guarantee (7); the enshrine detick (6) leans on
Dispatch (3) and Charter's availability; the Floor pass (5) leans on Survey staying wharf-side.

### 6.2 P1 — after the package reads clean at a table

Burgomaster/Bergen/Almoner price tuning ⚙; the Cellar "discard one Ready cask for its action"
sub-line ⚙ if vessel clog returns; the demand-tile module (C2's separable idea) as expansion
content; Specialist parity re-probe (Quaymaster's identity survives the package — re-check its
pick-rate); the Hanse Diet parking-lot item folds into the Diet re-text.

### 6.3 What I would NOT change, and why

- **The 2×2 + 8 slots, move-then-activate, three-line choice** — the identity; the v76 swap
  experiment already proved the geometry is load-bearing (Source+Brew must share a line).
- **The dual-role cask and its three states** — the best idea in the game; every change above
  routes *around* it.
- **Sail-only-when-full** — the fill tension powers the game's best interaction; its pain points
  are treated at the edges (Rich Berth′, Pilot's House, gangplank banking) instead of at the rule.
- **Deploy-first + the Quaymaster exception + Commission's vessel door** — the v2.8 grammar is
  one sentence and the public-showing risk is the point; Dispatch inherits it unchanged.
- **Privileges & Works owner-only sharing** (v2.3) — C1 keeps it; the one-sentence rule is the
  right architecture even though its feedback moment needed fixing.
- **The occupancy toll, ground rent existence, spoilage** — priced friction that works; only the
  floor-bonus *destination* changes (rival-only).
- **Majority values, the Hall ladder values, recipe costs (especially Bock's total — the
  twice-rejected 3G3H), the Flight formula** — the lesson file is explicit: structure over
  value; nothing in the evidence indicts these numbers, only their visibility and the
  cheap-tick economy around them.
- **The three expansions and the expansion spine** — untouched; base byte-identity preserved.
- **The steerable cask-action piles, the display-of-4 markets, the three-colour taxonomy, the
  warm start** — all pulling their weight in the logs.

### 6.4 Validation plan (the repo's own tooling)

1. **Engine + KEY bump**; targeted `verify-v95` ⚙ checks: bank-at-departure fires on
   load/dispatch/rival-load and not for rival-owned tiles; no die state anywhere; locality
   targeting (slot-local deploy, line-local ship load, Brewhouse/Harbor global);
   upgrade-in-place; stay-home Floor (worker position unchanged); Survey/Hire refused from the
   Floor; null-Floor refused; Q2/Q3 enshrine does not tick; hull-onto-building-slot commission;
   rival-only floor bonus.
2. **Update the harness bot** for the new deploy/load targets and the Dispatch stage (it drives
   the UI machine, so `sim.js` and the in-page AI both need their target enumerations refreshed;
   expect an `ai-tune.js` CEM pass afterwards — the Trader's destination weights shift when
   privilege ★ banks early).
3. **Robustness gate:** `node playtests/sim.js 500` — 0 crash/deadlock 2–4p, pace in the 12–25
   band, clock-dominant. **New counters** (add to the harness summary): blocked-deploy rate
   (alarm >8% of seat-turns ⚙), hull median fill-time (alarm >4 rounds ⚙), dead-turn rate (a
   turn with zero effects; target < half of v94's), building-deck exhaustion (target: never),
   enshrine share of ticks (target <35% ⚙), rounds-spread (target: interquartile within 12–25
   at every count — the bimodality is the headline metric).
4. **Lane health:** `PERSONAS=1 CELLAR=1` PATHWAYS at 400 ⚙ ×2–4p — apply the pole/negation
   test, not raw win-rate deltas; expect prestige to cool (enshrine loses tempo value) and the
   floor lane to cool (mint closed); alarm only on negation.
5. **Skill gates:** `ai-ladder.js 600` (0 errors, tiers ≥60% at shipped budgets — remember the
   v1.3 precedent that deploy-model changes compress tiers; budget a re-tune) and
   `ai-render-smoke.js`.
6. **The narrated read:** re-run the 30-game `narrate.js` corpus on the same seeds
   (211–220/311–320/411–420) + `pbp-stats.js`, and diff against `REVIEW-NOTES-v94.md` on the
   named pathologies: 2p-10 (stall must break via null-Floor + stay-home), 3p-8 (loop must
   break at the Survey faucet), 3p-2 (channel guarantee must un-brick the ring), 4p-3 (R9
   collapse must not occur without chaff ticks), 2p-2 (stranded-Bock points must partially
   bank). Each prior pathology is now a regression test with a named seed.
7. **Then a human table** — the package's real questions (does departure-banking *feel* as good
   as the die reveal; does stay-home Floor read as tension or punishment; does locality read as
   strategy or handcuffs) are table questions. Instrument via the Studio ingest.

### 6.5 Risks and rollback lines

- **Locality chokes 4p** → fall back to load-locality only (keep slot-local ship loads, restore
  deploy-anywhere from empty slots) — one flag in the deploy targeting.
- **Departure-banking makes loading too safe** (privilege owners stuff doomed hulls) → the
  bank moves to "when the hull sails / when dispatched" ⚙ — still die-free (the tile is read at
  the sail from the slot the cask departed; requires remembering provenance, so this is the
  *last* resort — prefer re-pricing tiles).
- **Enshrine detick slows games past band** → first lever is `SAILED_CAP` −1/−1/−2 ⚙; second is
  restoring Q3 ticks ⚙ (keep Q1/Q2 detick — the chaff is the proven offender).
- **Tap's absence clogs vessels** → the Cellar AGE sub-line (§2.2), never open-ended Tap.

---

## Appendix A — slot-tile disposition under the package (all base designs)

| Tile | Verb today | Package disposition |
|---|---|---|
| Staple Hall ×2 | value | privilege · prints **+3★ / Q4+ +5★ ⚙** · banks at departure |
| Bruges/London/Bergen/Novgorod charters ×4 | value | privilege · **+4★ to the printed kontor ⚙** (destination known from the hull/dispatch at departure) |
| Burgomaster's Favor ×2 | value | privilege · **+★ = cask quality (max 5 ⚙)** — pip-count read |
| Connoisseur's Cellar | value | privilege · **Q4+ only: +4★ ⚙ (Q5: +6★ ⚙)** |
| Hanse Diet | value | privilege · re-text: **+2★ and place 1 presence at the destination ⚙** |
| Almoner's Stall | value | privilege · re-text: **+3★ if you have no presence at the destination ⚙** |
| Reliquary | value | privilege · **+2★ ⚙ when dispatched to the Hall from here** |
| Rich Berth ×2 | value(ship) | → **work: a hull here may sail one berth short ⚙** |
| Festkeller | value(ship) | → cut from base ⚙ |
| Malt Kiln ×2 · Hop Yard · (Smoke Kiln exp.) | transform | keep — +1Q marker placed at departure |
| Cooperage ×2 | transform | keep |
| Customs House ×2 | transform | keep |
| Gauger's Office | transform | cut (Malt Kiln covers the lift) |
| Brewmaster's Workshop | transform | keep |
| Salt House (exp.) | value | privilege · goods at departure ⚙ |
| Parti-Gyle Tun (exp.) | transform | keep |
| **Pilot's House (new)** | work(ship) | may re-destination the hull at the sail ⚙ |
| **Open Staithe (new)** | work(cask) | un-Ready casks may deploy here; +1 maturation/owner-turn ⚙ |

## Appendix B — evidence index (claim → game)

- Slot stack over budget → `COMPONENTS.md` §17 gaps 1/3/4/10/12; designer brief.
- Die-lane essential / carrier not → v94 synthesis trend D; 3p-4 (Bock=12s); 3p-7 & 4p-3
  (1★-floor collapse); 2p-5 (Mumme=10).
- Recompute/forecast failure → engine `caskPreviewBonus` vs `captureLoad`; Diet/Almoner
  lead-dependence; designer brief.
- Station menu depth → engine `enterCell`/Cellar menu/Harbor stages; 4p-8 (3 Specialists/visit);
  4p-5 (25 Taps as idle); whiff-spam batch B trend 9.
- Locality tension cases → 3p-2 (deploy-lock terminal), 2p-8 (dead destination-gated hull),
  g3 (privilege as routing hub).
- Floor pathology → pbp-2p-10 (28 no-ops, ground-truthed), pbp-3p-8 (survey loop,
  ground-truthed), 4p-10 (deck exhaustion, "rewarded for idling"); designed use → human g2.
- Self-mint / victim inversion → 2p-5, 2p-10 (identical-tile), 4p-1 (final-turn +6), 4p-10
  (victim out-paid own lane); lever = rival-only bonus (corpus lever #1).
- Clock bimodality / enshrine economy → trend A/B; pbp-4p-3 (8 chaff-enshrine ticks,
  ground-truthed); 2p-2/2p-6/2p-7 (door-slams); 3p-9 (turn-1 Gruit charter).
- Stranding/grief → 2p-2 (~20 pts), 4p-7 & 4p-9 (Q5→1★ grief), 4p-7 (rival "help" strand).
- Majorities fixation → batch D trend 8 (Bergen free money), 4p-5 (Floor-ground Reach),
  §4 manifest (finite discs already spec'd).
- Humans validate the demand lane and share the clock race → human-log synthesis in both
  review files; g1 line 94 (Bock under a rival's Peterhof — the trap is human-real).
