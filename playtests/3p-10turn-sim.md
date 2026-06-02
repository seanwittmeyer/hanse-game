# Playtest — 3-Player, 10 Turns Each (engine simulation)

> ⚠ **Historical record (v0.2 engine, pre-2026-06-02).** Captured *before* the "living slot ring" revision (ships as cargo-containers, casks-as-cargo, recipes claim-on-fire — see `DESIGN.md` §19). The driver (`3p-sim-driver.js`) has since been updated to the new model; the throughput/pace findings below still stand, but the cask-in-slot mechanics described are superseded.

> Driven through the **actual `play.html` engine** headlessly (deterministic seed), three scripted strategies. This reflects the real, locked rules — so the problems below are real, not narrative guesses. Bots are greedy 1-ply, so *some* imbalance is bot quality; the items marked **ENGINE** are independent of bot skill.

**Strategies:** Crimson = Volume/reach · Azure = Quality/standing · Forest = Engine/hybrid.

## Final result (after 10 turns each)

| House | Total | Reach | Majorities | Standing | Goals |
|---|---|---|---|---|---|
| **Crimson** (reach) | **31** | 25 | 6 | 0 | 0 |
| **Azure** (standing) | 6 | 3 | 3 | 0 | 0 |
| **Forest** (hybrid) | 2 | 2 | 0 | 0 | 0 |

Heritage clock: **0 / 15 enshrined.** Reach clock: **London saturated in Round 4** (ending flagged). Final route presence: London `{Crimson:12, Forest:1}`, Bruges `{Crimson:1}`, Novgorod `{Azure:1}`, Bergen unopened.

## Findings

### ✅ Structural wins
1. **Build × cash-out grid works.** All four line-combos appeared; openings diverged (Crimson & Azure → Kontor+Brewhouse, Forest → Market+Kontor); **no dominant turn-1**. Every turn resolved one builder + one cash-out, exactly as intended.

### ❌ ENGINE — balance breaks (independent of bot skill)
2. **Route-Lane presence skim runs away (top priority).** A slotted Route Lane skims **+1 presence to its owner every time its line fires — by anyone, uncapped, free.** Crimson's single London Lane piled up to **12 presence on a cap-4 route.** This is the rich-get-richer skim risk (PLAYTEST F5) made concrete, and it's the engine's biggest break.
3. **The reach clock ends the game absurdly early.** London (cap 4) saturated in **Round 4** of an intended ~10, triggering the final round. Causes: (a) the runaway lane skim, (b) **presence isn't clamped to capacity** (12 > 4), (c) route caps (3–4) are tiny relative to presence income.
4. **Standing path failed completely — 0 enshrinements all game.** Standing requires **brew → ship → (working in a slot) → enshrine** — strictly longer than reach — and Azure never completed it. Everyone scored **standing 0 and goals 0** (no enshrined casks ⇒ no goal bonuses ever fire).
5. **Severe reach ≫ standing imbalance (31 / 6 / 2).** Quantifies PLAYTEST #1's "depth must be compensated" worry: reach is fast and cheap, standing slow and fragile.

### ⚠️ Economy / pacing (partly bot, partly tuning)
6. **Goods inflate to the cap and waste — especially hops.** Players pinned at H7–H8 (storage 8) for most of the game. The **Kontor top action ("Cloth Hall: +1G +1H") is available on every Kontor visit**, acting as an unlimited goods faucet that outpaces the sinks.
7. **Kontor became a goods faucet, not a scoring cell.** Because enshrine was rarely available, nearly every Kontor visit defaulted to "use top action" for free goods — the cell almost never did its real job.
8. **Map underused.** Bergen never opened; Novgorod saw 1 presence. Players funnel to wherever a Lane skim pays.
9. **Twins barely fired at 3p.** Only one Larder built; bots usually found unblocked lines. Confirms twin payoff scales with player count; 2–3p occupancy is light.

## Recommended fixes (tuning, not structure)

- **Kill the runaway:** Route-Lane skim should **not grant presence** (presence comes only from *shipping*) — make it a tiny good or a one-time bonus. **#1 priority.**
- **Clamp presence to route capacity**, and re-tune route caps + the reach-clock threshold (currently far too tight).
- **Make standing viable & rewarding:** consider letting you **enshrine a Ready cask directly** (drop the mandatory ship step), and/or raise standing VP, and/or make the heritage clock the primary ending. Ensure goal bonuses can actually score.
- **Add goods sinks / throttle the Kontor faucet:** the top-of-stack action shouldn't be free goods every turn; raise brew/tile costs or lower income.

**Bottom line:** the *new grid is validated*; the *scoring economy is badly mis-tuned* — reach (via the lane skim) is runaway, standing is non-functional, and goods inflate. These are dial problems, and the route-Lane presence skim is the first dial to turn.

---

## Full turn-by-turn log

```

— Round 1 · Crimson (VOLUME/reach) —
   Crimson places their worker at Kontor.
   Crimson activates the Bottom row · Kontor + Brewhouse.
   Crimson uses the Kontor top action: Cloth Hall.
   Crimson advances all brews.
   Crimson loads Gruit Ale (goal: +1 / working cask in slots).
   = G3/H3 | brews:1 slots:0 presence:0 enshrined:0 | ~0vp

— Round 1 · Azure (QUALITY/standing) —
   Azure places their worker at Brewhouse.
   Azure activates the Bottom row · Kontor + Brewhouse.
   Azure uses the Kontor top action: Cloth Hall.
   Azure advances all brews.
   Azure loads Hopped Beer (goal: +2 / brewery room).
   = G3/H2 | brews:1 slots:0 presence:0 enshrined:0 | ~0vp

— Round 1 · Forest (ENGINE/hybrid) —
   Forest places their worker at Market.
   Forest activates the Left col · Market + Kontor.
   Forest builds Room · Larder (Market twin → +2G).
   Forest uses the Kontor top action: Cloth Hall.
   = G2/H3 | brews:0 slots:0 presence:0 enshrined:0 | ~0vp

— Round 2 · Azure (QUALITY/standing) —
   Azure moves their worker to Kontor.
   Azure activates the Bottom row · Kontor + Brewhouse.
   Azure uses the Kontor top action: Cloth Hall.
   Azure advances all brews.
   = G4/H3 | brews:1 slots:0 presence:0 enshrined:0 | ~0vp

— Round 2 · Forest (ENGINE/hybrid) —
   Forest moves their worker to Kontor.
   Forest activates the Bottom row · Kontor + Brewhouse.
   Forest uses the Kontor top action: Cloth Hall.
   Forest advances all brews.
   Forest loads Hopped Beer (goal: +2 / enshrined Q4+).
   = G2/H3 | brews:1 slots:0 presence:0 enshrined:0 | ~0vp

— Round 2 · Crimson (VOLUME/reach) —
   Crimson moves their worker to Market.
   Crimson activates the Left col · Market + Kontor.
   Crimson buys a London Lane (+2) — place it in a slot.
   ↳ London route opens (value 2).
   Crimson uses the Kontor top action: Cloth Hall.
   = G2/H4 | brews:1 slots:1 presence:0 enshrined:0 | ~0vp

— Round 3 · Forest (ENGINE/hybrid) —
   Forest moves their worker to Brewhouse.
   Forest activates the Bottom row · Kontor + Brewhouse.
   Forest uses the Kontor top action: Cloth Hall.
   Forest advances all brews.
   = G3/H4 | brews:1 slots:0 presence:0 enshrined:0 | ~0vp

— Round 3 · Crimson (VOLUME/reach) —
   Crimson moves their worker to Kontor.
   Crimson activates the Left col · Market + Kontor.
   ↳ Crimson’s London Lane skims +1 presence.
   Crimson buys a Cog — place it in a slot.
   Crimson uses the Kontor top action: Cloth Hall.
   = G1/H5 | brews:1 slots:2 presence:1 enshrined:0 | ~5vp

— Round 3 · Azure (QUALITY/standing) —
   Azure moves their worker to Market.
   Azure activates the Left col · Market + Kontor.
   ↳ Crimson’s London Lane skims +1 presence.
   Azure buys a Novgorod Lane (+3) — place it in a slot.
   ↳ Novgorod route opens (value 3).
   Azure uses the Kontor top action: Cloth Hall.
   = G3/H3 | brews:1 slots:1 presence:0 enshrined:0 | ~0vp

— Round 4 · Crimson (VOLUME/reach) —
   Crimson moves their worker to Brewhouse.
   Crimson activates the Bottom row · Kontor + Brewhouse.
   Crimson uses the Kontor top action: Cloth Hall.
   = G2/H6 | brews:1 slots:2 presence:2 enshrined:0 | ~7vp

— Round 4 · Azure (QUALITY/standing) —
   Azure moves their worker to Kontor.
   Azure activates the Left col · Market + Kontor.
   ↳ Crimson’s London Lane skims +1 presence.
   Azure acquires Recipe · Dubbel.
   Azure uses the Kontor top action: Cloth Hall.
   = G3/H3 | brews:1 slots:1 presence:0 enshrined:0 | ~0vp

— Round 4 · Forest (ENGINE/hybrid) —
   Forest moves their worker to Kontor.
   Forest activates the Left col · Market + Kontor.
   ↳ Crimson’s London Lane skims +1 presence.
   Forest builds Room · Extra Vessel.
   Forest uses the Kontor top action: Cloth Hall.
   ★ London is saturated — final round! (reach clock)
   = G1/H5 | brews:1 slots:0 presence:0 enshrined:0 | ~0vp

— Round 5 · Crimson (VOLUME/reach) —
   Crimson moves their worker to Kontor.
   Crimson activates the Left col · Market + Kontor.
   ↳ Crimson’s London Lane skims +1 presence.
   Crimson buys a Cog — place it in a slot.
   Crimson uses the Kontor top action: Cloth Hall.
   = G1/H7 | brews:1 slots:3 presence:5 enshrined:0 | ~13vp

— Round 5 · Azure (QUALITY/standing) —
   Azure moves their worker to Market.
   Azure activates the Left col · Market + Kontor.
   ↳ Crimson’s London Lane skims +1 presence.
   Azure builds Room · Counting-house (+1 standing/enshrine).
   Azure uses the Kontor top action: Cloth Hall.
   = G1/H4 | brews:1 slots:1 presence:0 enshrined:0 | ~0vp

— Round 5 · Forest (ENGINE/hybrid) —
   Forest moves their worker to Brewhouse.
   Forest activates the Bottom row · Kontor + Brewhouse.
   Forest uses the Kontor top action: Cloth Hall.
   Forest advances all brews.
   Forest loads Gruit Ale (goal: +2 / Novgorod presence).
   = G1/H6 | brews:2 slots:0 presence:0 enshrined:0 | ~0vp

— Round 6 · Crimson (VOLUME/reach) —
   Crimson moves their worker to Brewhouse.
   Crimson activates the Bottom row · Kontor + Brewhouse.
   Crimson uses the Kontor top action: Cloth Hall.
   = G2/H8 | brews:1 slots:3 presence:6 enshrined:0 | ~15vp

— Round 6 · Azure (QUALITY/standing) —
   Azure moves their worker to Kontor.
   Azure activates the Left col · Market + Kontor.
   ↳ Crimson’s London Lane skims +1 presence.
   Azure acquires Recipe · Hopped.
   Azure uses the Kontor top action: Cloth Hall.
   = G1/H5 | brews:1 slots:1 presence:0 enshrined:0 | ~0vp

— Round 6 · Forest (ENGINE/hybrid) —
   Forest moves their worker to Kontor.
   Forest activates the Left col · Market + Kontor.
   ↳ Crimson’s London Lane skims +1 presence.
   Forest acquires Recipe · Hopped.
   Forest uses the Kontor top action: Cloth Hall.
   = G1/H7 | brews:2 slots:0 presence:0 enshrined:0 | ~0vp

— Round 7 · Crimson (VOLUME/reach) —
   Crimson moves their worker to Harbor.
   Crimson activates the Top row · Market + Harbor.
   ↳ Azure’s Novgorod Lane skims +1 presence.
   Crimson buys a Cog — place it in a slot.
   Crimson will ship Gruit Ale to Bruges — choose a slot.
   Crimson ships to Bruges (+1 presence) and the cask works in a slot.
   = G0/H8 | brews:0 slots:5 presence:9 enshrined:0 | ~23vp

— Round 7 · Azure (QUALITY/standing) —
   Azure moves their worker to Brewhouse.
   Azure activates the Bottom row · Kontor + Brewhouse.
   ↳ Crimson’s Gruit Ale skims +1G.
   Azure uses the Kontor top action: Cloth Hall.
   Azure advances all brews.
   = G2/H6 | brews:1 slots:1 presence:1 enshrined:0 | ~6vp

— Round 7 · Forest (ENGINE/hybrid) —
   Forest moves their worker to Brewhouse.
   Forest activates the Bottom row · Kontor + Brewhouse.
   ↳ Crimson’s Gruit Ale skims +1G.
   Forest uses the Kontor top action: Cloth Hall.
   = G2/H8 | brews:2 slots:0 presence:0 enshrined:0 | ~0vp

— Round 8 · Crimson (VOLUME/reach) —
   Crimson moves their worker to Market.
   Crimson activates the Left col · Market + Kontor.
   ↳ Crimson’s London Lane skims +1 presence.
   Crimson buys a Cog — place it in a slot.
   Crimson uses the Kontor top action: Cloth Hall.
   = G1/H8 | brews:0 slots:6 presence:10 enshrined:0 | ~25vp

— Round 8 · Azure (QUALITY/standing) —
   Azure moves their worker to Kontor.
   Azure activates the Bottom row · Kontor + Brewhouse.
   ↳ Crimson’s Gruit Ale skims +1G.
   Azure uses the Kontor top action: Cloth Hall.
   = G3/H7 | brews:1 slots:1 presence:1 enshrined:0 | ~6vp

— Round 8 · Forest (ENGINE/hybrid) —
   Forest moves their worker to Harbor.
   Forest activates the Right col · Harbor + Brewhouse.
   Forest will ship Hopped Beer to London — choose a slot.
   Forest ships to London (+1 presence) and the cask works in a slot.
   Forest advances all brews.
   Forest loads Hopped Beer (goal: +2 / enshrined Q4+).
   = G1/H7 | brews:2 slots:1 presence:1 enshrined:0 | ~2vp

— Round 9 · Crimson (VOLUME/reach) —
   Crimson activates the Bottom row · Kontor + Brewhouse.
   ↳ Crimson’s Gruit Ale skims +1G.
   Crimson uses the Kontor top action: Cloth Hall.
   Crimson advances all brews.
   Crimson loads Hopped Beer (goal: +2 / brewery room).
   = G3/H7 | brews:1 slots:6 presence:10 enshrined:0 | ~25vp

— Round 9 · Azure (QUALITY/standing) —
   = G6/H8 | brews:1 slots:1 presence:1 enshrined:0 | ~6vp

— Round 9 · Forest (ENGINE/hybrid) —
   = G2/H8 | brews:2 slots:1 presence:1 enshrined:0 | ~2vp

— Round 10 · Crimson (VOLUME/reach) —
   = G6/H8 | brews:1 slots:6 presence:11 enshrined:0 | ~27vp

— Round 10 · Azure (QUALITY/standing) —
   = G8/H8 | brews:1 slots:1 presence:1 enshrined:0 | ~6vp

— Round 10 · Forest (ENGINE/hybrid) —
   = G2/H8 | brews:2 slots:1 presence:1 enshrined:0 | ~2vp

================ FINAL (after 10 turns each) ================
Heritage clock: 0 / 15 enshrined  |  ending=true
Crimson  TOTAL  31  = reach 25 + maj 6 + standing 0 + goals 0
Azure    TOTAL   6  = reach 3 + maj 3 + standing 0 + goals 0
Forest   TOTAL   2  = reach 2 + maj 0 + standing 0 + goals 0
route bruges    value 1 open=true presence={"0":1}
route london    value 2 open=true presence={"0":12,"2":1}
route bergen    value 0 open=false presence={}
route novgorod  value 3 open=true presence={"1":1}
```

---

## v0.2 re-run (after balance fixes)

Applied: lane skim → +1G (no presence) · presence clamped to caps (8/6/5/9) · enshrine direct from a Ready cask · standing values 3/5/7/10 · Kontor seed goods cut.

```
Heritage clock: 2 / 15 enshrined  |  ending=false
Crimson  TOTAL   1  = reach 1 + maj 0 + standing 0 + goals 0  (enshrined 0)
Azure    TOTAL   7  = reach 0 + maj 0 + standing 3 + goals 4  (enshrined 1)
Forest   TOTAL   4  = reach 1 + maj 0 + standing 3 + goals 0  (enshrined 1)
route bruges    value 1 cap 8 filled 2 pres={"0":1,"2":1}
route london    value 2 cap 6 filled 0 pres={}
route bergen    value 0 cap 5 filled 0 pres={}
route novgorod  value 0 cap 9 filled 0 pres={}
```

**Outcome:** the runaway is gone (no turn-4 end), standing now functions (enshrinements + goal points appear), and scores are close. **But** the re-run exposed the next problem: the game is **throughput-bound** — 1 vessel + multi-step brews ⇒ only ~2–4 casks/player in 10 turns ⇒ scores stay low (1/7/4) and neither end-clock fires. Fine reach-vs-standing balance still needs a stronger bot or human playtest. Next dials: brewing pace / vessel economy / end-clock thresholds.
