# Brewhouses of the Hanse — “Living Slots” reset — PLAN (SHIPPED · live build now v2.0 “The Trade Roads”)

> **Status: SHIPPED — this plan opened as the v1.0 “Living Slots” reset (2026-06-16); v1.7–v2.0 shipped on top, live build now v2.0 “The Trade Roads”.** The
> keystone rebuild this plan called for has **shipped**: the *living, composable Wharf slots*, the
> differentiation pass (v1.1), and the demand dice (v1.2) are all live repo-wide (`RULES.md` /
> `COMPONENTS.md` / all four HTML pages on **v1.6 “Hops”**). This plan replaced the abandoned
> "demand-board" detour (the `*-v1` files, deleted; the *"Leffe at a party / quality is a
> construct"* thread and everything after it is **discarded**) and returned to the **keystone we
> bookmarked early in the design chat**: the *living, composable Wharf slots*. The prior live game
> (v0.16.1) is frozen at branch `archive/main-v0.16.1`, playable at `archive/play.html`, and
> snapshotted file-by-file in `archive/v0.16/`. From there we edited the **canonical** `RULES.md` /
> `COMPONENTS.md` forward. **Working mode:** v0.16 is fully archived, so the **top-level files are
> the v1.x working set** — cleaned up and **version-stamped as they're edited.**
>
> **What shipped since this plan opened:** v1.0 keystone (living slots + the one Building family +
> the Floor) → v1.1 differentiation (four distinct kontor benefits; Hall ladder 3/5/7/9; fast
> Hopped/Broyhan + Keut presence; the Flight scores distinct **beers**, no Masterpiece) → v1.2
> the **demand dice** (a reusable d6 per value-building bonus rides the cask in the ship's berth;
> pips = ★ banked on delivery, max 5; a stranded cask banks nothing — replacing a denomination of
> value chits) → **v1.3/v1.4** deploy-as-a-line-action + **Tap** → **v1.5** three private improvements
> (Harbor Crane · Lagering Cellar · Private Quay) + off-turn Building rewards **queued to the owner** →
> **v1.6 “Hops”** the **hops-led export ladder** (Mumme 1G3H · Bock 2G3H, totals unchanged) giving hops
> a real demand. The roadmap below (§7) is checked off accordingly.

---

## 0. The reset — what we keep, what we threw out

**Thrown out** (the detour): demand expressed as **tiles installed at the destinations**. It
was *meh* and, as the audit confirmed, **not living** — ~5 install slots, filled early, frozen
for the rest of the game, with a backwards owner incentive. Dead end.

**Kept / returned to** (the gold from the first messages of the chat):
- The **squeeze is the soul** — *you can't brew everything, and you can't deliver everywhere.*
  Choosing **which beers to brew** and **where to send them** *is* the game (the Lisboa
  single-object squeeze, in the cask).
- The **grid works** — Source → Brew → Age → Ship, choosing lines, is good and stays.
- The **living slots are where authorship belongs** — buildings sit on the **Wharf slots**
  (not the destinations) and modify the **casks and ships docked to them** (the composable
  "dock → building → cask / ship" idea the designer flagged as *fun*). This is GWT's
  player-built track: you author the shared board by what you place, and the board churns.
- **Scoring must be simple and legible** — a player should be able to see the win and form a
  strategy fast. That clarity is the missing *"why am I doing this?"*

---

## 1. The soul, stated plainly

You are a Hanseatic brewing house. **You cannot brew every beer, and you cannot ship to every
market.** Every turn is the same honest squeeze: *what do I brew, and where does it go?* The
Wharf is how you do it (Source → Brew → Age → Ship); the **living slots** are where you build
the advantages that make your beer worth more; the **destinations** are where the choice pays
off. Two kinds of payoff pull against each other — **go big** (dominate a kontor's majority) or
**go right** (route your brews through demand for maximum value) — over the steady, beginner-safe
floor of **enshrining at the Hall.**

---

## 1A. The whole-game review — every thread we carry (NOT just the keystone)

The living slots (§3) are the centerpiece, but this is a **review of the whole game**, not a
one-mechanic fix. Here is every thread from the early design chat — the comps lessons and the
designer's five points — and where each lives. The few cuts are deliberate and named; nothing
is dropped by accident.

**The five lanes — each a COMPLETE path (no half-measures).** The trap we keep falling into is
doing many things halfway. The discipline now: **every lane is a fully-executed, integrated,
balanced path to victory.** *Braiding two lanes is NOT a goal we chase* — it's the natural
strategy that **emerges** when the lanes are individually strong and well balanced. Build each
one whole:

| Lane | The loop (what you do) | Scores | Supported by | Its risk / cost |
|---|---|---|---|---|
| **Prestige / the Hall** | brew Q2+ → deploy → enshrine | **in-game, fixed** (3/5/7/9, shipped v1.1) | deploy-then-enshrine; prestige-throughput buildings | low/steady; a capped ceiling — the beginner's whole game |
| **Demand / value** | author value-buildings → route casks through them → deliver | **in-game, variable** | the building deck; commissioning ships onto your buildings | contested (rivals dock too); you must read & route |
| **Volume / majority** | brew wide → ship many → dominate kontore by count | **end-game, count** | cheap-cask throughput; Cooperage; Kontor Privilege | deferred payoff; head-to-head races |
| **Range / the Flight** | climb the ladder → deliver every tier incl. Bock | **end-game, (tiers−1)²** | Kiln (step up); Aging Loft; the export recipes | high-variance; needs the full set (a Bock) |
| **Authorship / engine** | build buildings → tax traffic → run your Floor (§1B) | **wharfage + it powers the rest** | London/Novgorod earn buildings; the private Floor | investment-heavy, slow to pay |

**The bar for each lane:** a player committed to *only* that lane has a **real, complete game**;
and **no lane dominates or is dead.** That double test — *complete on its own* and *balanced
against the rest* — is the standard for every number we set.

**The comps → decisions:**
- **Lisboa** (multi-use squeeze + interlock) → the **squeeze** is the soul (§1); the **living
  slots** are the interlock — your buildings reshape everyone's options.
- **Great Western Trail** (player-built track, tempo, win-by-two) → **owned buildings author the
  shared board**; the **five lanes**; tempo via line-activation + the shared end clock.
- **Orléans** (steerable variance) → the **building display**, the **cask-action drawn at brew**,
  and the **3-of-4 dealt exports** give *steerable* variance — you shape and read a shifting
  offer, not a solved board. (No dice; this is the managed-uncertainty seat.)
- **Agricola** (one rule → an economy; scarcity/blocking) → scarce **vessels, slots, ships**, the
  **occupancy toll**, the **clogged-vessel back-pressure** — taking what you need squeezes others.
- **Wingspan** (compounding engine, content spine, one-more-turn) → **transform-buildings** + a
  **populated Wharf** that accelerates your turns; the **building deck** is the content spine.
- **Obsession / Viticulture / Unconscious Mind** (theme-mechanism fusion, approachable bridge) →
  hopped-beer-as-cargo, the Wharf, enshrine; the **legible scoring spine** is the on-ramp, with
  depth in routing / timing / authorship.

**The designer's five points:**
- **#1 — the cask squeeze + the stable fallback.** The squeeze is the soul (§1, §4); the deployed
  cask is public/contestable/hijack-loadable; the **alternate-action-when-blocked** (the boutique
  brewer's *private floor* — tap a maturing cask instead of paying the toll) is carried (`RULES.md`
  §2, ⚙) — the original v0.1 feel.
- **#2 — split volume from majority.** Done — the two kontor axes (**demand value** vs **majority
  count**) are different temperaments; see the lanes above.
- **#3 — owned, composable buildings on the living slots.** The keystone (§3).
- **#4 — content, not rules; approachable but deep.** One building family **replaces goals +
  neutral buildings + most upgrades**; legible scoring; depth lives in the deck and the routing.

**Deliberate cuts (named):** the demand-board-*at-destinations*; the "quality-is-a-construct"
removal of intrinsic quality value (quality keeps the **Flight, the gates, and the Hall**, and the
climb still pays); the **peak-window** idea (not adopted); everything from the abandoned detour.

---

## 1B. The Floor — your private line (the engine-builder's puzzle)

Every core action lives on the grid; the **Floor** is a **private line you run instead of a grid
line**, powered by the **casks in your vessels.** It grants **no new actions** — it takes your
engine's actions **without fighting for grid position**, so a house that has **built a strong
brewery moves faster and can't be blocked.** This is where the **dual-role cask earns the other
half of its impact:** a maturing/Ready cask in a vessel **works for you before it ships** (its
action, on your Floor), so *how you use a cask* — **hold it** (keep its action private) vs
**deploy it** (free the vessel, make it public cargo) — is a real decision every turn. The carried
v0.1 "alternate action when blocked" (#1), grown into a core engine.

**The shape (⚙):** on your turn you may **work the Wharf** (move + activate a grid line — the
default) **OR work your Floor** (= the slot-actions of the casks in your vessels + your
improvements). A *bare* brewery is a weak Floor; a *full* one (more vessels, more action-bearing
casks held) is a strong private engine — so the Floor **scales with what you've built**: early a
fallback, late a tempo weapon. It powers the **Authorship/engine** and **deep** lanes.

**This revives the vessel as an engine axis.** Because a held cask now has Floor value, **Extra
Vessel finally pays** (more held actions + more throughput) — fixing a chronically-dead upgrade
(the designer has *never* bought one, like the Warehouse). Starting vessel count / cap / repeat
are a live ⚙ (`COMPONENTS.md` §3E), with the goal that *adding a vessel is a tempting decision*.

**Tensions to settle (⚙):** the Floor must not strictly beat the grid early (or the grid goes
unused); whether it advances the clock / costs anything; full turn-alternative vs the lighter
occupancy fallback (`RULES.md` §2). Develop alongside the lanes.

---

## 2. Scoring — the clear spine (build everything back from this)

The whole point of the reset: **make the win obvious.** Four sources, two in-game and two
end-game:

**In-game points (you bank these as you play):**
1. **Enshrine at the Hall — FIXED rate.** Withdraw a cask to the Hall for a **known, fixed**
   number of points (a simple ladder by quality). *The easy, beginner path to victory — low
   risk, always available, and there's a whole game in just this.*
2. **Deliver to a kontor — VARIABLE rate.** Ship a cask to a kontor and score its value — and
   that value is **modified by the value-buildings on the Wharf** your cask/ship passed through (the
   "demand"). *(Shipped v1.2: this bonus is tracked physically by a reusable **d6 “demand die”**
   that rides the cask in the ship's berth — its pips, max 5, are the ★ banked on delivery; a
   stranded cask never banks.)* *The risk/reward path: read the board, route your brews, maximize
   value.*

**End-game points (the long game):**
3. **Majorities** — at each kontor, by **delivered-cask count.** Easy to track. *Go big:
   become dominant in a few kontore.*
4. **The Flight** — the range reward, `(n−1)²` (min 3 → 3:4 / 4:9 / 5:16). *(Shipped v1.1: it
   now counts distinct **beers** delivered, not quality tiers; the Masterpiece was cut.)*

> **The strategic fork is now legible:** the **Hall** is the steady floor (fixed); the
> **kontore** are the risk/reward, with **two distinct ways to score there** — the **evolving
> demand** (variable, in-game, via the living slots) *and* the **majority** (count, end-game,
> dead-simple to track). A new player can pick a lane on turn 1; an expert braids two.

*(Everything else from v0.16 scoring — the per-cask value table, the export premium, goal
tiles, the Masterpiece — is on the table for cutting in service of this clarity; see §5.)*

---

## 3. The keystone — living, composable Wharf slots

The 8 slots around the four stations are a **churning, composable commons.** A slot can hold:
- a **ship** (docked, destination-bound, sails when full),
- a **cask** (deployed — your cargo + a public action), and/or
- a **building** (an owned modifier).

**Composability (the fun):** a slot's **building modifies the cask or ship docked at it.** The
"dock → building → cask" / "ship → building" stack the designer wanted: e.g. a building that
**raises the value** a docked cask delivers for, that **changes a ship's rules/route**, or that
**transforms** a cask docked there. **A line is still only 4 spaces** — slot · station · station
· slot — and one or two of those slots may simply carry a modifier. So the board stays legible:
most slots are casks/ships; a few are buildings that make the goods passing through them worth
more.

**Why the slots are the fun — the heart of v1.0 (the designer's read).** A line is *half
fixed, half emergent*: the two **stations** are the steady base actions; the two **slots**
beside them **evolve over the game.** So every turn you fire a line, half of what it does is the
engine you've **grown into the board** — and the thrill is landing a **building on a slot of a
line you fire often** (a high-traffic line), so a high-impact modifier rides your busiest turns.
Because each slot belongs to **one** line (its row *xor* column), **placing a building commits it
to a line** — the meaningful row-vs-column choice the original design prized, now with a
compounding payoff. That single image — *my line's two slots got better because I built them* —
is the tension, the pushback (rivals route through or crowd your slot), and the optimization the
whole design is for. Turns run **thin early, compounding late** (the Wingspan arc), as the slots
fill with what you author.

**Buildings ARE the demand** — but *living*, because they sit on the **transient, contested
slots** (not frozen at a destination). What's worth more this game is **what's been built on the
Wharf**, and the Wharf churns. **This is the rethemed "goal":** the old personal goal tiles
become **public buildings that modify kontor scoring** — authored on the shared board, read by
everyone, fought over.

**Owned, but shared** (the recurring ask): a building is **placed by a player** and **benefits
its owner most**, but it sits on the shared ring, so it shapes the line for everyone — *position
+ authorship*, never a goods-skim toll (which caused rich-get-richer in v0.6). *(Exact
owner-edge = an open fork, §6.)*

---

## 4. The squeeze, kept honest (so the choices bite)

- **You can't brew everything:** limited vessels (start 2, cap 3), the recipe ladder (Gruit /
  Hopped → the export tiers), and time. Committing a vessel to a slow Bock is real opportunity
  cost.
- **You can't deliver everywhere:** limited ships, scarce slots, the destination gates (better
  rooms want better beer), and the one end clock. Where a cask goes is a *commitment*.
- The **living slots** make both squeezes *contested and authored* — your buildings are the
  edge you build, and rivals can route through them too.

---

## 5. What carries from v0.16, what changes (first read — to detail in the doc edits)

**Carries:** the Wharf & the turn (move, occupancy toll, activate a line, resolve stops); the
dual-role cask (maturing → deployed → delivered) + its slot-action; ships sail-when-full;
Charter (relief valve); **Enshrine at the Hall** (now framed as the *fixed* beginner path);
**majorities**; **the Flight**; the no-dice/no-cards/no-money constraints; the medium GWT/Distilled
weight; the sim-gate discipline.

**Changes / to design:** the **buildings-on-slots** system (the keystone — §3); **kontor
delivery value becomes building-modified** (the variable "demand", replacing the fixed value
table); **goal tiles dissolve** into the public buildings. **Likely cut for clarity:** the
export-premium table and the Masterpiece (fold their intent into the building/Flight system) —
confirm during the doc edits.

---

## 6. Open forks — the questions for this plan (asked alongside)

Three decisions set the keystone's shape; everything else sizes off them:

- **F1 — What a building DOES** (the modifier vocabulary): does it **amplify the delivery
  value** of its docked cask (clean "demand"), **transform** the cask/ship (quality / cargo /
  route), or **both** (a deck of building types under one placement grammar)?
- **F2 — Ownership & access:** **owned-but-shared** (owner benefits most, rivals may still route
  through), **owned-exclusive**, or **neutral/shared**? And the owner's edge = points-cut /
  position / both?
- **F3 — Composability depth:** **building + one occupant** (cask *or* ship — two-tier, most
  legible), **building + ship + casks** (three-tier, richer), or **buildings stand alone** and
  modify the line around them?

---

## 7. Roadmap

1. **This plan** (+ resolve F1–F3). ✓ done (F1–F3 resolved in the shipped v1.0–v1.2 builds).
2. **Edit the canonical `RULES.md`** forward to the new path (the keystone + the clear scoring). ✓ shipped (v1.4 “Deploy”).
3. **Edit `COMPONENTS.md`** — the building family (the new content deck, one grammar), the
   reconceived destination/scoring table, the cuts. ✓ shipped (v1.4 “Deploy”; the demand dice replaced the value chits).
4. **Rebuild `play.html`** to the new rules (sandbox first; keep v0.16.1 live until ready). ✓ shipped — `play.html` is now on **v1.6 “Hops”** (v0.16.1 archived).
5. **HTML docs** (`learn` / `index`) then **`printables`** last. ✓ shipped — all four pages on **v1.6 “Hops”**.
6. Sim-gate throughout (crash/deadlock-free, pace 12–25, lanes balanced, AI ladder). ✓ ongoing — the standing gate for every change.

## 8. Guardrails

- **Clarity is the product this time.** If a player can't state how they're winning, the rule
  is too clever — cut it. The scoring spine (§2) is the north star.
- **No half-measures.** Every lane is a complete, balanced path to victory — finish each one;
  don't half-build five (the trap we keep falling into).
- **Content, not rules.** Depth lives in the *building deck* (many tiles, one placement
  grammar), not in new subsystems.
- **Theme is a deliverable, not a coat of paint.** The building deck must be *fun and thematic*
  for **both verbs** (value & transform) — the names, the flavor, and the effects together (the
  original goals & upgrades set the bar). Never ship a stat block where a Hanse institution
  belongs (`COMPONENTS.md` §3C).
- **One soul, in the cask + the slots.** Don't re-grow a second parallel scoring board.
- **Keep v0.16's lessons:** correct *friction* with structure not value; one dial at a time;
  always sim-gated before publish.
