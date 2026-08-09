# BUILDING-POWER STUDY — v4.12 "Open Brewhouse" (2026-08-09)

**Question (designer):** run simulations — is any building over-powered?

**Instrument:** `playtests/bldg-power-probe.js` (NEW, kept — the port-probe convention). Drives
the canonical engine; hooks `commitBldg` / `bldgTick` / `bldgDepart` (gated on
`!aiSimulating`) and reads standing marks + `bankO`/`bankW` at game end. Three lenses per
design: **traffic** (uses/game · die ticks · rival-tick share), **the mark** (end+departed
pips per build — the builder's payoff per die), **the winner** (P(win | built d) against the
*built-anything* bar, netting the generic winners-build-more effect), plus the two direct
mints (Tollhouse `bankO` · Cooperage `bankW`). Ablation knob `EXCL=<key>` strips a design's
tiles after the 17-deal (arm decks run 1–2 tiles thin — noted).

**Corpus:** OBS 500 games × 2/3/4p (trader) · ablations 300×3p each for
cooperage/exchange/maltkiln/assay + 300×4p cooperage · a GM oracle arm 36×3p
(`GUILD_MS=120` — the greedy tiers under-read engine investments; the standing caveat
applies to every number here: greedy bots are a robustness/pace oracle, humans decide).
**0 crashes / 0 deadlocks across all 3,236 games.** Raw outputs: `playtests/bldg-power-*.txt`.

---

## Verdict in one paragraph

**No building breaks the game** — removing any single design moves the macro economy ≤1.6★
on a ~65★ winner (Kiln −1.6 · Cooperage −1.0/−1.1 · Exchange/Assay ~0). The power story is
**per-builder and per-count**: the **Cooperage (v4.12's +2★-per-load) is the top flag** —
the only design that stacks a direct mint (≈5★/game at 4p), a top-tier mark (4.2–4.7
pips/build) and an above-bar builder win (+5.3/+3.0/+8.1 by count, n=507). The **Merchants'
Exchange (v4.12's up-to-3) is the second flag** — the most *consistent* builder-win lift in
the corpus (+6.5/+7.1/+5.1, n=414) riding a self-serving control effect. The **cheap
utilities' marks outgrow their tier at 4p** (Granary +10.2 lift; Scrivener's +8.0). The
**Malt Kiln stays the traffic king** (a quarter of ALL building uses; the best mark at
4.7–5.0 pips) but shares its power — rivals take 70–79% of its ticks, and its builder lift
is only +1–3. The **Assay House at 1H→Ready is NOT over-powered by this evidence** — heavy
traffic, below-bar builder win, null ablation: a true shared utility, metered by its price.
The **dead shelf persists** at the other tail (Rich Berth: **0 builds in 1,500 trader
games**; Customs/Capstan/Hiring Post/Tollhouse barely move — the GM arm re-checks below).

---

## 1. The builder-win lift (the "does building it predict winning" lens)

P(win | built design d) minus P(win | built anything) — the bar already absorbs the generic
"winners build more" correlation (built-any lift over 1/n: +1.7/+2.0/+1.9 by count).
Pooled builds n in parentheses; ±3pp ≈ noise at n≈200.

| design | 2p | 3p | 4p | n | read |
|---|---|---|---|---|---|
| **exchange** | **+6.5** | **+7.1** | **+5.1** | 414 | the one design above the bar at EVERY count |
| **scriveners** | +3.7 | **+6.5** | **+8.0** | 387 | climbs with count |
| **cooperage** | **+5.3** | +3.0 | **+8.1** | 507 | + the direct mint below |
| **granary** | +2.7 | +3.4 | **+10.2** | 482 | the 4p spike |
| tollhouse | −1.7 | +7.8 | +5.5 | 195 | thin n, barely used — see the shelf |
| abbey | +7.7 | +4.4 | −4.8 | 572 | count-inconsistent |
| maltkiln | +1.4 | +3.3 | +2.2 | 1123 | mild — its power is shared (below) |
| racking | +3.0 | +0.7 | +2.3 | 553 | flat |
| victual / bonded / hopex / missionq | ~0 mixed | | | | texture, not power |
| **assay** | −4.8 | +1.3 | −4.4 | 544 | heavy use, no builder edge |
| capstan/customs/hiringpost 2p "lifts" | | | | ≤79 | tiny-n artifacts |

## 2. Traffic & the mark (uses/game on a dealt wharf · pips per build)

| design | uses/g 2p→4p | pips/build 2p→4p | rival-tick % (4p) | note |
|---|---|---|---|---|
| **maltkiln** | 2.6 → **8.6** | 4.05 → **4.96** | 78.5% | ~¼ of all building traffic; the most reliable 5★ die in the game; guaranteed-dealt, 2 copies |
| **exchange** | 1.8 → 3.6 | 4.08 → 4.55 | 73.6% | up-to-3 tripled its per-stop work |
| granary | 1.1 → 3.3 | 2.82 → 4.00 | 75.2% | a start-1 utility ticking to 4★ at 4p |
| **assay** | 0.8 → 2.9 | 2.40 → 3.64 | 74.9% | the table's new favourite; the 1H price meters it |
| **cooperage** | 1.0 → 2.5 | 4.00 → **4.73** | 83.2% | every load = a tick since v4.12 |
| scriveners | 0.5 → 2.0 | 3.09 → 4.40 | 74.3% | |
| hopex | 0.6 → 2.1 | 2.87 → 3.83 | 74.9% | |
| missionq | 1.4 → 2.6 | 2.16 → 2.68 | 76.6% | 2 copies split its traffic; the weakest mark |
| racking/abbey/bonded/victual | 0.1–0.6 | 3.2–3.6 | | occasional |
| tollhouse/customs/richberth/capstan | ≤0.13 | — | | **the dead shelf** |

## 3. The direct mints (★ created in play, per dealt game)

| source | 2p | 3p | 4p |
|---|---|---|---|
| **Cooperage wharfage (+2★/load, v4.12)** | **1.97** | **2.69** | **4.99** |
| Tollhouse stamps (+3★) | 0.24 | 0.31 | 0.31 |

At 4p the Cooperage mints **16× the Tollhouse** — ~5★/game pumped through one tile, on top
of its mark and its builder lift. (For scale: a claimed Contract averages ~3★; the winner's
total is ~65.)

## 4. Ablations (the causal check — remove the design, 300 games, vs the 500-game base)

| arm | rounds | winner avg | margin | Δwinner vs base |
|---|---|---|---|---|
| base 3p | 12.8 | 66.1 | 10.1 | — |
| no-**cooperage** 3p | 12.8 | 65.1 | 9.4 | **−1.0** |
| no-**exchange** 3p | 12.7 | 66.3 | 10.3 | +0.2 |
| no-**maltkiln** 3p | 12.9 | 64.5 | 9.7 | **−1.6** |
| no-**assay** 3p | 12.7 | 66.0 | 10.3 | −0.1 |
| base 4p | 12.5 | 64.9 | 9.5 | — |
| no-**cooperage** 4p | 12.3 | 63.8 | 9.3 | **−1.1** |

No arm reshapes pace or totals materially. Substitution is visible and healthy: without the
Cooperage at 4p, Kiln builds rise 0.87→1.00 and Kiln uses 8.6→9.8 (the traffic re-homes).
The Exchange's null ablation + consistent builder lift says its power is **positional** (who
wins) rather than inflationary (how much everyone scores) — the harder kind to see at a
table, and the reason it's flagged despite the null.

## 5. The GM oracle arm (36×3p, GUILD_MS=120 — direction only, n≈13–26 builds/design)

`playtests/bldg-power-gm3p.txt`. The GM plays 16.3 rounds (vs the trader's 12.8 — search
under-races the clock, the standing read) and its builder bar sits at 34.4%.

- **Cooperage: the flag SHARPENS.** Builder win 46.2% → **+11.8pp over the GM bar** (vs
  +3.0 at trader 3p) on a 3.92-pip mark — search-play converts the tile into wins *harder*
  than greedy play does, even while minting less (1.39★/g — deliberate, fewer spray loads).
- **Exchange: the flag TEMPERS.** Builder win 23.1% → **−11.3pp under the GM bar** (uses
  still 2.1/g). The trader's consistent +7 lift may partly be a greedy-policy artifact (the
  trader self-serves the row mechanically); under search the builds don't convert. Human
  table decides — the tile stays on watch, not on trial.
- **Racking revives under search** (0.64 builds/g · 0.94 uses · 4.05 pips — the
  STRATEGY-STUDY's read repeats), and the GM likes the **Victualling Yard** (0.63 builds ·
  45.0% builder win, +10.6pp, n=20).
- **The dead shelf does NOT revive:** Customs and Rich Berth 0 builds, Capstan 0.07 —
  dead at both tiers.

## 6. Mechanisms (why these and not others)

- **Cooperage:** it rewards the game's most-played verb (loading) unconditionally, at the
  slot hulls prefer (+1 capacity attracts commissions AND holds ships longer), and v4.12
  made every such load both +2★ *and* a tick. Reward density × traffic density.
- **Exchange:** the active player rewrites the shared Contract row toward their OWN Ready
  casks — up to three times per stop since v4.12. The builder authors it onto their line and
  passes it most often. Control of a shared economy, exercised asymmetrically.
- **Granary/Scrivener's at 4p:** start-face-1/2 utilities on a wharf with 4 players' traffic
  tick toward 4★+ marks — the v4.9b "busy utilities start low" pricing assumed less traffic
  than a 4p table generates.
- **Kiln:** power fully shared (rival ticks ~78%) — it lifts whoever loads there. Its
  builder edge is the mark alone, and the mark is the game's best. It is load-bearing
  infrastructure (biggest ablation drop), not a private engine.

## 7. Dial candidates (NOT ruled — for the designer)

1. **Cooperage** — (a) +2★ → **+1★** per load; or (b) pay the wharfage **only on the extra
   berth** (the cask that boards beyond printed capacity — the v4.9 tick grammar, ties the
   reward to the building actually working); or (c) leave the ★ and drop its mark start
   3→2. (a) is the smallest change; (b) is the most thematic.
2. **Merchants' Exchange** — (a) up-to-3 → **up-to-2**; or (b) replacements post at **end of
   turn** (deny-only in the moment — kills the self-serve, keeps the control); or (c) fee
   2G → 3G (the Racking tier). Watch a human table first: the lift is positional and bots
   may overuse the self-serve pattern.
3. **Granary/Scrivener's** — no change yet; if 4p human tables confirm, the dial is the
   printed start face (they're already 1/2) or per-count mark caps — a bigger hammer than
   the evidence warrants today.
4. **Kiln** — none. Its dominance is the intended shared engine; the deal guarantee already
   treats it as infrastructure. If a dial is ever wanted it is qty 2→1 or ms 2→1, not the
   effect.
5. **The dead shelf** (Rich Berth · Customs · Capstan · Hiring Post · Tollhouse) — the
   UNDER-powered tail is the larger design surface this study re-confirms; the roster-rethink
   parking-lot item stands.

**Standing caveats:** greedy-trader corpus (the designer's rule: strategy conclusions lean
on MC tiers, probes and humans); builder-win lifts are correlational even after netting the
built-any bar; ablation decks run 1–2 tiles thin; overbuild-as-die-denial remains unobserved
in bot play.

---

## 8. Rulings & the tail-buff proposals (2026-08-09, same day)

**RULED — v4.12b "Light Wharfage": the Cooperage wharfage eases +2★ → +1★ ⚙ per load.**
A/B re-read (200/count, trader): the mint 2.69 → **1.65**★/g at 3p and 4.99 → **2.29** at
4p (it now tracks load traffic exactly); builder-win settles to ≈bar at 3p (−0.5, was
+3.0) and **+3.0** at 4p (was +8.1). Capacity, the tick-per-load and the mark stand.
verify 228/228 · sim clean.

**PROPOSED — buffs for the under-powered long tail (NOT ruled).** Each pairs the measured
diagnosis with a primary move and an alternate. The through-line is the v0.15 lesson: these
tiles' problems are REACH problems (nobody has a reason to route play through them), so the
primary moves are structure dials, not bigger numbers.

1. **Rich Berth** (0 builds in 1,500 trader games · 2G · start 3) — *diagnosis:* its tempo
   is purchasable elsewhere (a 2G Skute is "sail now" without a build, a die, or a slot),
   and the short sail pays nobody. *Primary:* **"The Ship here may sail one berth short —
   the player who sails it gains 2 goods"** (the harbor buys the empty berth). Uses the
   Bonded Store's existing pay-goods grammar, gives an ACTIVE reason to route hulls here,
   stays a ship-shaper. *Alternate:* drop the fee to free (chipless) — the minimum move.
   *Fallback:* cut the design for a new one (the roster-rethink parking lot).
2. **Customs House** (≤0.05 builds · 2G · start 3) — *diagnosis:* below-gate Ready casks
   are rare, low-pip deliveries are poor value, and the free presence bump (v4.12) does the
   cheap-body job without a voyage. *Primary:* **−1 → −2 quality required (min 1) — the
   smuggler's door:** a die-1 Gruit already boards London/Bergen; at −2 it boards a
   NOVGOROD hull and delivers at 1+2 = 3★ — cheap-beer fleets gain a real port, and the
   cold 2p Novgorod (Open #3/#8) gains a feeder. *Watch if adopted:* Novgorod majority
   (8/5/2) via gruit spam — the berth race and the 13-die clock are the natural caps.
   *Alternate:* keep −1, fee 2G → free.
3. **Warping Capstan** (≤0.11 builds · 2G · start 3; the v4.12 any-ship widening did not
   revive it) — *diagnosis:* a warp pays nothing immediate, and the commission already
   places hulls at will; geometry authorship is invisible to greedy play and merely thin
   under search. *Primary:* **the warp includes ONE load of the warped Ship** (the
   commission's maiden-load grammar: after the warp you may load 1 Ready cask from your
   vessels onto it — its bonus fires; full → it sails). Warp-and-load makes the Capstan a
   second Harbor: fetch the hull to your cargo. *Alternate:* fee 2G → 1G alongside.
4. **Hiring Post** (≤0.04 builds · 1G · start 2) — *diagnosis:* Bergen oversupplies
   specialists free per cask; the Post's only offer is paying a fee Bergen waives, and the
   paid channel runs ~0.1/game. *Primary:* **hires at the Post are FREE (the tile waives
   the specialist's printed fee).** The Scrivener's stays the honest fee channel because
   recipe fees are real (hops); specialist fees are 1–2 goods, so the waiver costs the
   economy nothing measurable and gives the wharf a Bergen-alternative that needs no
   voyage. *Alternate:* the specialist display refills AT ONCE on a hire here (beat the
   end-of-turn gap).
5. **Tollhouse** (~0.1 stamps/game · 1G · start 3) — *diagnosis:* net +2★ for a pip loses
   to simply loading elsewhere, and the sharp decline case is measured: the lower face
   forfeits Contracts (the v45c AI nets exactly this). *Primary:* **the stamped cask may
   claim a Contract at EITHER face — pre- or post-stamp.** No numbers change; the measured
   decline reason disappears; the stamp becomes a clean "bank 3★, keep your order."
   *Alternate (blunt):* +3★ → +4★ (net +3).

*Held deliberately:* the Merchants' Exchange stays on WATCH (the GM arm tempered its flag —
a human table decides before any dial); Granary/Scrivener's 4p heat is a watch, not a
change; the Kiln is untouched infrastructure. If several tail buffs land at once, re-read
pace — more live tiles = more committed dice = a faster clock.
