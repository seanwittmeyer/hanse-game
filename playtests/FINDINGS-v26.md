# Findings — simulated strategy & design-health review (v0.10, engine v26)

> Compiled 2026-06-12 from the headless corpora: **1,200 trader games** (2–4p, `analysis-trader-v26.txt`), **300 trader games at 5p**, **400 journeyman games at 2p**, the **Guildmaster oracle** (30 GM-vs-Trader games at 2p, `analysis-gm-v26.txt`), the AI ladder runs (v22–v25), the CEM tuner run (`ai-tune-v23.txt`), and the standing sim gates (~20k+ games this cycle). **Caveat for everything below:** bot play ≠ human play; the Guildmaster oracle ran at the reduced 40ms budget and n=30 (directional, not statistical). Treat FLAGs as hypotheses for the human playtest, not verdicts.

---

## A. Strategy findings

1. **The game has a huge unexplored skill ceiling.** The Monte Carlo Guildmaster beats the best heuristic tier 99% at 2p, averaging ~63 points where good heuristic play averages ~45 — roughly **18 points of discoverable play** above "competent." The tier ladder is strictly ordered at every count.
2. **Openings are policy-dependent, not scripted.** Among traders, Brewhouse-first beats Market-first **57.4% vs 42.4%** at 2p (your 3G/2H already covers a brew — sourcing first wastes a tempo). But journeymen show the *reverse* (Market-first 51.1% vs Brewhouse-first 46.9%), and the Guildmaster prefers **Cellar/colR openings** (brew + age in one activation off the warm start) that neither heuristic rates. The best first move depends on the plan behind it.
3. **Majorities decide games.** Largest winner-vs-loser gap at 2–4p (+6.2 pts, ahead of delivery +5.5 and goals +3.9); still +5.6 at 5p. The v0.10 "big motivating majorities" intent is confirmed in play, and the winner's score splits into healthy near-thirds (~19 delivery / ~16 majority / ~19 goals).
4. **Bergen presence is near-mandatory for winners:** 86% of winners deliver there at least once vs 67% of losers (and only 27% of losing traders against the Guildmaster managed it).
5. **The early upgrade engine separates winners:** first upgrade ~round 6.6 with a never-rate 3× lower than losers'. The earned-vs-bought split stays ~95/5 — the "deliver → earn an upgrade" privileged path works as designed.
6. **Destination arcs match the design's value-over-time story:** Bruges is the early game (83–87% of its casks by round 5), Bergen/Novgorod the midgame, **London (57–62%) and the Hall (80–88%) are late-game** destinations at every count.
7. **London's engine identity works — but only under strong play.** Heuristic tiers feed it 0.2–0.4 casks/game (near-dead); the Guildmaster feeds it **1.0/game** and converts the free upgrades into 3.4 upgrades/game. The identity is real but subtle.
8. **Strong play declines the signature interaction.** The Guildmaster loads rivals' casks only 0.6×/game (traders 1.4–2.7), and teaching the Trader an own-casks-first load policy was worth ~4 points of win-rate by itself. Optimal play treats shipping a rival's cask as a mistake unless it completes your own sail.
9. **The Q4+/Q5 export climb is skipped by the strongest player at 2p:** 77% of the Guildmaster's *wins* never brew a Q4+ cask (traders brew ~1.0/game). Wide volume + majorities appears to dominate the climb at 2p.
10. **Charter usage scales with player count:** ~1.4/player at 2–4p → **1.9/player at 5p** (≈9–10 charters per 5p game table-wide). The relief valve is a highway on the tightest ring.
11. **The three Trader leans converge:** volume/prestige/majority profiles and win-rates sit within ~2 points of each other — the leans are table personality, not distinct dominant strategies (consistent with the v0.10 insight that majority play *is* volume play).
12. **Pace and the end clock are rock solid:** ~100% of games end on the Sailed-Ships clock (the MAX_ROUND backstop effectively never fires), averages 13.9–14.8 rounds at every count, in the 12–25 band.
13. **Seat fairness holds after compensation:** post-`SEAT_COMP` seat win-rate spreads run 2–4 points at all counts.
14. **Robustness:** 0 crashes / 0 deadlocks across every harness run this cycle (~20k+ games).

---

## B. Solvable or broken? — design-health verdicts

**Nothing is broken in the hard sense** — no runaway axis (the historical lesson #1 is currently respected: score thirds are balanced), no degenerate infinite line, no deadlock, no seat lock. **The game is demonstrably not solved**: a 99% gap between good heuristics and search means the decision space is deep, and the policy-dependent openings (#2) mean even turn 1 has no universal answer. That said, four findings deserve designer attention:

| # | Aspect | Verdict | Evidence & the dial |
|---|---|---|---|
| B1 | **Shipping a rival's cask** (the signature non-destructive interaction) | **FLAG — anti-optimal as designed** | #8: the better the player, the less they use it; the +1G loader bonus doesn't cover gifting a delivery + benefit + majority presence. An interaction that optimal play declines will atrophy at experienced tables. Dials (already listed as open in `RULES.md`): raise the loader bonus (2G? a free age/load?), or sharpen the timing leverage. Wants a human read first — humans may use it more vindictively/tactically than the margin-maximizing bots. |
| B2 | **The Q4–Q5 export climb at 2p** | **FLAG — possibly dominated** | #9. If confirmed, the Leffe-vs-Westvleteren axis collapses toward volume at 2p specifically (persona sims at 3–5p show prestige viable, so this looks count-specific). Verify before acting: a full-budget (`GUILD_MS=250`) oracle run + a 3–5p oracle cohort; if it holds, 2p-specific dials exist (the Hall already has 2p-skip-2nd precedent on majorities; a 2p Hall bump or cheaper Q4 reach are candidates). |
| B3 | **Charter volume at 5p** | **WATCH** | #10: ~2 charters/player/game means the "pricey flex" is routine infrastructure on the tight 5p ring. May be exactly what the relief valve is for — or may erode the merchant fantasy (own ships) at high counts. The parked escalating-fare idea (`DESIGN.md` §21) is the ready dial. |
| B4 | **Bergen as a mandatory stop / London as an expert-only kontor** | **WATCH** | #4 and #7 together: Bergen's 10/6/3 anchor makes it near-compulsory, while London rewards only skilled play. That asymmetry might be fine (an anchor is *supposed* to pull; a subtle kontor rewards mastery) but check at the human table that Bergen doesn't feel like a tax and London doesn't feel dead. `COMPONENTS.md` §6 already carries the "does London need a sharper pull?" question — #7 says the pull exists but is hard to see. |

**Explicitly healthy** (checked and fine): opening variety (#2), the volume-vs-prestige lean at 3–5p (persona-validated v0.10), majority weight (#3 — big but not dominant), goals at ~⅓ of score, the warm start (first voyage round ~2.1 for everyone — it works and doesn't decide games), pace/clock (#12), seat fairness (#13), upgrade economy (#5).

---

## C. What this can't tell you

The bots maximize points without table-talk, spite, or risk preference; humans use the interactive tools (rival-loads, slot blocking, toll pressure) differently. The Guildmaster oracle is n=30 at a reduced think budget. Every FLAG above is a *hypothesis with a measurement attached* — the human playtests (now flowing to Waterworks Studio) are the arbiter, and `sim-analyze.js` re-runs in minutes after any dial change to check the shape moved the way you wanted.
