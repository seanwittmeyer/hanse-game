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

## 4E. Direction E — "The Guild's Three Coins" *(designer-sparked, 2026-07-12 — supersedes A as the contender; absorbs D)*

The designer's read: the Hall lacks TENSION because every enshrine is additive (★ + honor, no fork),
and presence is the *intended* connective tissue between the Hall and the kontor game — the flaw was
bundling it with the stars, not its existence. The fix: **unbundle points from actions**. Enshrining
= choosing exactly ONE coin; the cask's whole value cashes in that currency.

**The board:** four shelves (gates unchanged), each printing THREE COINS — choose one ⚙:

| Shelf | FAME (★) | CRAFT (dispensation) | FAVOR (influence) |
|---|---|---|---|
| Common Q2+ | 4★ | free **Source** now | +3 goods |
| Long Q3+ | 6★ | free **Brew** or **Deploy** now | 1 presence + 2 goods |
| Masters Q4+ | 9★ | free **Load** or **Acquire** now | 2 presence |
| High Q5+ | 13★ | one station fires **BOTH actions** this turn | 3 presence |

- **CRAFT is the differentiator**: the whole v3.0-A grammar is once-per-visit this-or-that; the Hall
  becomes the game's ONLY repetition-dealer, topping out at "break the this-or-that" (the designer's
  "enshrine → brew ×2, no points for the Mumme that bought it"). No kontor can imitate it.
- **FAVOR prices the presence coupling** instead of banishing it (revises the Direction-A rec):
  2 presence now costs you 9★ of fame — a real fork, not a bundle. W1 closes by economics.
- **12 printed coin texts replace 15 honor spaces** — the duplicate-errand economy is deleted
  wholesale; board rules get SIMPLER. One choice of three printed options = a station-face decision
  shape. Zero markers; only FAME touches the score track.

**The tension layer (Direction D + the Hamlet read):** the enshrined cask tile STAYS on its plinth
(n+1 per shelf). At game end each beer type's finest displayed cask takes its **Crown (+3★ ⚙)** —
highest quality, earliest-placed tiebreak. With fixed-quality beers the tiebreak makes most crowns a
visible **first-to race** (Hamlet's first-half); kilns/blending let latecomers outbrew an incumbent
(the most/best-half). This is the Hall's RISK axis, the piece the current design lacks:

> Kontore pay **certain value now** (printed + die, locked at delivery, plus slow majority equity).
> The Hall pays **your chosen coin now — but its biggest prize stays contested until the end.**

**Dump-case guards:** free entry stays (the deadlock valve); a junk cask buys a junk coin; full
shelf → floor FAME only (never-nothing intact); every enshrine still ticks the clock.

**Flags before commitment:** (1) CRAFT is compounding tempo — sim before numbers; (2) FAME 13 vs
Novgorod 11+die needs a corpus check (ships must stay attractive to the deep player); (3) plinth
real estate — 4 shelves × up to 5 cask tiles is a genuinely bigger board; (4) crowns skirt the cut
goal system — kept on the right side by being one judged number per beer with a printed tiebreak,
not a card subsystem.

**Next step on a ruling:** mock the Three Coins board in printables2 + engine behind a toggle +
an E-vs-v3.1 corpus, so the next human table plays both.

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
