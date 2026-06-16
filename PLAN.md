# Brewhouses of the Hanse — the next chapter: PLAN

> **Status: plan, opened 2026-06-16 (reset).** This replaces the abandoned "demand-board"
> detour (the `*-v1` files, deleted; the *"Leffe at a party / quality is a construct"* thread
> and everything after it is **discarded**). It returns to the **keystone we bookmarked early
> in the design chat**: the *living, composable Wharf slots*. The live game (v0.16.1) is frozen
> at branch `archive/main-v0.16.1`, playable at `archive/play.html`, and snapshotted file-by-file
> in `archive/v0.16/`. From here we edit the **canonical** `RULES.md` / `COMPONENTS.md` forward.

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

## 2. Scoring — the clear spine (build everything back from this)

The whole point of the reset: **make the win obvious.** Four sources, two in-game and two
end-game:

**In-game points (you bank these as you play):**
1. **Enshrine at the Hall — FIXED rate.** Withdraw a cask to the Hall for a **known, fixed**
   number of points (a simple ladder by quality). *The easy, beginner path to victory — low
   risk, always available, and there's a whole game in just this.*
2. **Deliver to a kontor — VARIABLE rate.** Ship a cask to a kontor and score its value — and
   that value is **modified by the buildings on the Wharf** your cask/ship passed through (the
   "demand"). *The risk/reward path: read the board, route your brews, maximize value.*

**End-game points (the long game):**
3. **Majorities** — at each kontor, by **delivered-cask count.** Easy to track. *Go big:
   become dominant in a few kontore.*
4. **The Flight** — distinct quality tiers delivered (the range reward). Kept as-is.

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

1. **This plan** (+ resolve F1–F3). ✓ opening now.
2. **Edit the canonical `RULES.md`** forward to the new path (the keystone + the clear scoring).
   *(The designer's next requested step.)*
3. **Edit `COMPONENTS.md`** — the building family (the new content deck, one grammar), the
   reconceived destination/scoring table, the cuts.
4. **Rebuild `play.html`** to the new rules (sandbox first; keep v0.16.1 live until ready).
5. **HTML docs** (`learn` / `index`) then **`printables`** last.
6. Sim-gate throughout (crash/deadlock-free, pace 12–25, lanes balanced, AI ladder).

## 8. Guardrails

- **Clarity is the product this time.** If a player can't state how they're winning, the rule
  is too clever — cut it. The scoring spine (§2) is the north star.
- **Content, not rules.** Depth lives in the *building deck* (many tiles, one placement
  grammar), not in new subsystems.
- **One soul, in the cask + the slots.** Don't re-grow a second parallel scoring board.
- **Keep v0.16's lessons:** correct *friction* with structure not value; one dial at a time;
  always sim-gated before publish.
