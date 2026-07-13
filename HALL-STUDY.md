# The Hall Study — shelf board revisit (design mode, 2026-07-12)

*Inputs: 4 parallel research passes (Orléans/Altiplano deep-dive · a 10-game trophy/warehouse/delivery
survey · the complete internal bonus catalog · a 5-family shelf-power design space) + hard evidence
from the two strong-play corpora (288 games: `playtests/logs/v3-corpus/`, `logs/v31-pressure/`).
This is a study with a recommended package — no ruling is implemented here.*

---

## 1. The Hall as built (v3.1)

Four quality-gated shelves (Q2→3★ · Q3→5★ · Q4→6★ · Q5→8★), each a row of printed one-shot honor
spaces (15 spaces, 13 distinct honors), claimed with a cask cube via a free Harbor **Dispatch** of a
deployed Q2+ cask; spaces/shelf = players+1; higher casks may claim lower shelves; all-full → best
row ★ anyway (never nothing); every enshrine ticks the shared clock.

**What the 288-game record says:**

- **Traffic is healthy**: every shelf sees claims at every count; the overflow floor has *never*
  fired. The Hall is 24% of winners' deliveries; pure-Hall play (67%+ share) wins only 14% while
  braided play (1–66%) wins ~40% — the stars-align lane, as designed.
- **The honor economy is lopsided**: of 478 honors taken in the pressure corpus — presence 112
  (23%, the largest family), recipe 75, +3★ 52, age 48, unlock 42, goods 83, specialist 25,
  contract 22, G+H 13, **building 10, age-all 8** (the two near-dead spaces).
- **The step-down tell**: 18% of Q5 enshrines skip the High Board, almost always to take `place 2
  presence` on the Masters' Shelf — the strongest honor points *away* from prestige, into the
  majority race (watch-item W1, three corpora running).

## 2. What the research says (distilled)

**Orléans (Beneficial Deeds)** — floor-first placement (every act pays, scarcity rides on top) is
the right skeleton; our row-★-always matches it. Its two failure modes: *sniped completions*
(placing the second-to-last tile hands a rival the prize — avoid any "whoever completes" bonus
that excludes those present) and *fixed boards starving 2p* (our n+1 scaling is the fix; confirm
3-space shelves don't feel sparse across a whole 2p game). Deeds feed a **multiplier**, not flat
points — commitment fuels compounding, which is why it feels consequential.

**Altiplano (warehouse)** — safe-baseline + all-or-nothing stretch works *because* the baseline is
safe; enshrining should also read as **decongestion** (it frees a slot and a vessel pipeline), not
just banking. Its lock-in trap (needing one exact good with no substitute) is the trap our
step-down *access* already prevents — keep the access, fix the *incentive*.

**The wide survey (GWT, Hansa Teutonica, Village, Everdell, Troyes, Arnak, Distilled, Teotihuacan,
Merv, Endeavor)** — three findings matter most:
1. **Climax = visibility + irreversible scarcity, not bigger numbers.** Village's chronicle and
   Distilled's flipped awards read as consequential because the claim is public and gone forever.
   Arnak's 2/6/11 curve is the cleanest template: **shrink the pool and raise the value together.**
2. **Ongoing-power claims are the second climax axis** (Hansa's privilege offices, Endeavor's
   culture cards): being seen racing for a thing only one player can *hold* — but they carry a
   memory burden, so ration them.
3. **Set-completion works better as a gate or a position-read than as stacking bonuses** (Everdell,
   Teotihuacan); Troyes' punish-the-absent cathedral is the inverse philosophy — named and
   **rejected**: never-nothing is our pillar.
   AP-control pattern worth keeping: affordability must stay a **single-glance number** (our
   quality gate already is one).

**The internal catalog** — the decisive finding: **11 of the 13 honors duplicate rewards that
already exist in 3–7 other systems** (free specialist ×4 doors · free building ×4 · recipe ×3 ·
presence ×6 · age ×7 · goods everywhere). The Hall's rewards don't say "the Hall" — that's why it
reads transactional. Meanwhile the base game has clean, *unused* design space: score modifiers,
end-game set reads, free station-action grants, storage/clock touches — and three deliberate
absences to respect (no die manipulation beyond one-read, no turn-order moves, no rival-touching).

## 3. Diagnosis

The Hall's *skeleton* is right (floor-first, gates, n+1, cubes, ticks). Its *reward vocabulary* is
wrong in three ways:

- **D1 — duplication**: honors are an errand board of things you could get elsewhere, so claims
  feel like shopping, not enshrining.
- **D2 — misaligned summit**: the strongest honor (pres2) exports value to the majority lane and
  makes stepping DOWN the sharp play; the High Board is just "more of the same, pricier."
- **D3 — no compounding**: nothing in the Hall rewards *returning* to the Hall; every claim is a
  terminal transaction (the survey says the consequential boards compound — multiplier, set, or
  standing power).

## 4. Directions

### Direction A — "The Hall pays in Hall" *(recommended next table test — 3 space swaps, zero new state)*

Keep the board, the gates, the ★ rows, the claim grammar. Re-cut three spaces so the reward
vocabulary points back at the Hall and the summit is unreachable by step-down:

| Shelf | Now | Proposed | Why |
|---|---|---|---|
| High (Q5·8★) | `+3★` | **Vintner's Pride — “+ this cask's quality ★”** (8+5=13 on a true Bock; single space) | The summit, quality-keyed: a stepped-down cask structurally cannot match it. Additive, one-read — *not* 2×Q (that re-imports the premium arithmetic v3.0-A deleted). |
| High (Q5·8★) | `gain 1 Building (free)` — 10 takes/126 games, near-dead | **The Full Cupboard — “end game: +2★ per shelf holding your cube”** | The set read (Arnak/Everdell): zero state — score by glancing at cube colors. Rewards *returning* to the Hall (D3) with breadth the Flight doesn't already pay. |
| Masters (Q4·6★) | `place 2 presence` — the step-down magnet | **The Quiet Hour — “this dispatch does not advance the clock”** | The deep player's own tempo valve (“the Hall keeps its own hours”) — replaces the majority-export with more *time*, the thing the climb actually needs. One space, once claimed, gone. |

Demote presence to the single existing `place 1 presence` on the Long Shelf (the lane-coupling
survives at a fair price; W1 closes). Everything else stays. **Component cost: reprint one board
panel. Engine cost: 3 honor handlers + HALL_SHELVES data. AP cost: none** — same decision shape,
each new space reads in ≤6 words, and two of the three are resolved by looking at the board.

### Direction B — "Standing honors" *(the bigger swing — hold for an expansion module)*

1–2 spaces per shelf become **while-your-cube-is-here powers** (Hansa/Endeavor axis): *Open Gate —
your casks board hulls 1 gate lower* · *Deep Cellar — storage +2* · *Standing Custom — your later
enshrines +1★*. Cubes never leave, so the cube IS the state — but at 4p this is up to 8 live perks
to remember across the table. MED memory burden; violates nothing but strains the "no complex
state" constraint. Verdict: **prototype as an opt-in module** (“Hall Offices”), not base.

### Direction C — "The placement race" *(structural, zero-state, half-adopted)*

Score cube *positions*, not just claims: First Keg (+1★ first cube on a shelf), Last Round
(shelf-completing cube: +2★ to EVERY cube present — anti-snipe by construction), Full Cupboard.
Fully adopting C dilutes honor identity and adds end-game counting rows; **adopt only Full
Cupboard** (into Direction A) and shelve the rest. Per-shelf majorities are explicitly rejected —
the Hall is the *uncontested* counterweight by pillar.

## 4E. Direction E — "The Guild's Three Coins" *(v2 — redrafted to the 2026-07-12 designer rulings)*

**The core (ruled):** enshrining = choosing exactly ONE coin — the cask's whole value cashes as
FAME, CRAFT, or FAVOR. Unbundling is the tension ("you choose if this Bock scores 13, or if it's
worth more as 2 presence").

**The board (ruled shape):** four shelves, gates unchanged. Each shelf prints **three coin spaces
— one FAME · one CRAFT · one FAVOR — each claimable ONCE** (your cask cube marks the spent coin).
**The else-path (ruled):** a shelf whose three coins are gone still takes casks — **★ = the cask's
quality**, no cube, nothing to mark. Volume play stays live forever; the coins are the race.
12 coins per game, fixed — no player-count scaling table needed, and Hall cube demand caps at 12.

### The mined CRAFT column (from 288 games — `playtests/pairings-miner.js`)

The logs ruled OUT station-action grants: the structural combos are already free at the table —
`brew+source` is the game's most-played turn (1,467 exact · 2,409 co-occur), `brew+deploy` 2,221,
`deploy+load` 1,513 (slot locality did its job). What no single turn can do today: **load twice**
(Stevedore only) · **brew twice** (rare Q4+ cask action only) · **finish maturation** (nothing
ages TO Ready; time is the true bottleneck). CRAFT sells exactly those — novel pairings, rising
with the shelf ⚙:

| Shelf | FAME ⚙ | CRAFT (the dispensation) ⚙ | FAVOR ⚙ |
|---|---|---|---|
| Common Q2+ | 4★ | **The Guild's Batch** — take 2 goods AND brew one recipe, now | +3 goods |
| Long Q3+ | 6★ | **The Double Gyle** — brew twice, now (pay both costs) | a free recipe (a dealt export) |
| Masters Q4+ | 9★ | **The Stevedore's Shift** — load 2 casks, free, now | **2 presence** |
| High Q5+ | 13★ | **The Lagerkeeper's Miracle** — age ALL your casks to Ready | a free **Building (placed) or Specialist** |

- FAVOR per ruling: items over goods; **presence only on the Masters' (Q4) shelf** — the
  connective tissue survives at one priced door; the Q5 FAVOR is a better coin than presence.
- CRAFT names are flavor drafts; every effect is one printed line, resolved instantly, no markers.
- The deploy-first pillar is respected: no coin moves a cask from vessel to ship unseen (that
  stays the Quaymaster's paid, permanent exception).

### The clock rulings (and their consequences to sim)

- **Enshrines do NOT tick the Sailed-Ships track** (ruled) — only full sails and kontor charters
  end-drive. The Hall stops being a clock weapon (the racer playtest lesson closes structurally).
- **New third end trigger (ruled): the first player to spend their last presence disc (12) ends
  the game** — finish the round, score. The volume lane gets its own finish line, symmetric to the
  ships clock; the Hall races its 12 coins.
- **Consequences to verify by corpus before numbers firm up:** (1) enshrines were 30–45% of clock
  ticks — removing them slows the shared clock, so `SAILED_CAP` needs a downward retune ⚙ (or the
  presence trigger carries the pace; measure, don't guess); (2) the else-path is non-ticking and
  free — bounded only by cask production economics (Q5 else = 5★ vs Novgorod 6+die keeps ships
  strictly better per premium cask — verify no dump loop at Q2–Q3); (3) presence-out at 12 discs:
  reachable ~round 15–20 by a committed volume seat per corpus delivery rates — confirm the three
  pressures still land games in the 12–25 band (MAX_ROUND backstop unchanged).

### ⚗ The presence-clock sim (2026-07-12 — KEY `hanse-v31e`, toggles `EXP_HALLV2`/`EXP_PRESEND`/`PRES_ALL`)

Three Coins v2 + the disc clock are BUILT (behind New Game ⚗ toggles; 74 verify checks green; 0
crashes in ~4,800 sweep games + 24 tier games). Findings:

**The cube count: 15 is right under natural play.** Greedy sweep (400 games/count/config):
- POOL 12 — too hot: rounds 15.4–17.1, 4p drops to 81% in-band, brews/seat 6.3–8.5 (below target).
- **POOL 15 — the target zone: rounds 18.8–21.0 (98–99.5% in-band), presence endings 69–82%,
  brews/seat 9.9 / 8.4 / 7.2 at 2/3/4p, ~3–6 discs of bump headroom.** 2p/3p sit inside the 8–11
  brew goal; 4p runs slightly under (candidate: 16 at 4p ⚙, or accept — the race is the point).
- POOL 18 — too slack: ceiling endings 51–55%, rounds 22.6–23.3.
- `PRES_ALL` (Hall dispatches spend a disc too — "the disc marks the house wherever the beer went")
  reads nearly identical under natural play and is the cleaner rule (unifies the arithmetic:
  pool ≈ total deliveries + bumps). Recommended if the clock ships.

**The structural finding (the real result): a presence-ONLY clock hands trailing players a stall
lever.** With real MC tiers, 9/12 (kontor-only) and 6/12 (`PRES_ALL`) probe games ran to the
round-25 backstop: the disc pool is PRIVATE, so a player who is behind simply stops spending —
unlike the ships clock, no rival's normal play can push the game to a close. The greedy bots race
(92%+ presence endings); experts stall. *(Caveat: the MC tiers weren't retrained for the variant —
but the incentive analysis holds: a private pool can't be a sole clock.)* Options if the direction
proceeds: (a) keep the presence trigger AND lower `MAX_ROUND` to ~20 as an honest co-clock ⚙;
(b) hybrid — presence trigger + a slimmer ships clock, first to fire wins; (c) drop to
presence-as-accelerator only. The sim files: `playtests/sim-hall2-*.txt` · probes:
`playtests/logs/hall2-probe*/`.

### Tabled + the hard line

- **Crowns / displayed casks: TABLED** (ruled). Ownerless tiles on plinths can't say whose they
  are without new components — revisit only with a clean component answer.
- **The component-state hard line (ruled, standing):** every piece of game state must be carried
  by a physical component on the table — no memory, no ledger, no app-tracked value. Presence
  cubes and printed board spaces are the vocabulary limit. v3.0 exists because the game had
  drifted toward a calculator; `play.html` is a mirror, never a crutch.

## 5. What deliberately does NOT change

Never-nothing overflow · quality gates · n+1 scaling · step-down *access* (the anti-lock-in valve;
only its incentive moves) · enshrine ticks the clock (The Quiet Hour is the single, claimable
exception) · no rival-touching honors, no turn-order moves, no die arithmetic (pillars).

## 6. Open questions for the table

1. Does Vintner's Pride (13★ Bock) overheat the deep lane, or finally give it its capstone? (Sim
   probe: PATHWAYS prestige win-rate; the greedy 2p prestige lane already runs hot at 67% — watch.)
2. Is one non-ticking dispatch per game enough of a valve to matter — and does it read clearly at
   the table ("no tick" must be visible: flip the space's chit onto the track?).
3. 2p sparseness (Orléans lesson): 3 active spaces/shelf across an 18-round 2p game — enough churn?
4. Cask-cube supply: 8/colour shared between berth wells and Hall claims — Full Cupboard raises
   Hall cube demand; recount the worst case (§17 gap #6).

---
*Next step on a ruling: implement Direction A behind the normal interlocks (RULES §7b ·
COMPONENTS §11B · play.html HALL_SHELVES/hallBonus · printables2 hall board · learn/index),
KEY bump, gates, PATHWAYS + a 40-game shelf-focused corpus.*
