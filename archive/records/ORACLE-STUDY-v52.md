# ORACLE-STUDY-v52 — the full v5.2b battery (2026-08-22)

**Instrument:** `playtests/strategy-probe.js` (the v5.1r oracle refit with the v5.2 family
ledger: per-tile build/tick/maturity table · the Venture ledger · staple★) + `sim.js`
(family counters, `SRCN`/`STAPLE`/`POOL` dials) . **Build:** `KEY hanse-v52b` — the study
was ordered on v5.2 and RESTARTED when the same-day v5.2b letter landed mid-run (the
ground-succession Ladder, the top-tile Brew bonus, Source 3, the printed Bergen fallback);
the abandoned v5.2 stage-1 corpus is kept as the Source-2/open-ladder A arm.

**Corpora** (all committed in `playtests/`): trader OBS 300/count (`oracle-v52b-trader-obs`)
· GM 60/count ×2/3/4p @ GUILD_MS 120 (`oracle-v52b-gm-{2,3,4}p`) · CM 3p ×24 @ CELLAR_MS
400 (`oracle-v52b-cm-3p`) · PATHWAYS 200/lane (`sim-results-vhanse-v52b-pathways200`) ·
sim 300/count base + `SRCN=2` + `POOL=14` + `POOL=15` arms · the v5.2 morning corpus
(`oracle-v52-trader-obs`, `sim-results-vhanse-v52*`). 4-core box; greedy stages and MC
stages run as separate uniform-contention waves (4 procs each).

## 1 · Pace & the dials

| arm (jour 300/count) | 2p | 3p | 4p | band |
|---|---|---|---|---|
| v5.2 (Source 2 · open ladder) | 17.3 | 16.4 | 15.6 | 90/96/93% |
| **v5.2b base** (Source 3 · pool 13) | 16.5 | 15.5 | 14.2 | 90/92/87% |
| v5.2b `SRCN=2` | 17.1 | 15.4 | 15.3 | 92/87/88% |
| v5.2b `POOL=14` | **18.0** | **17.1** | **15.9** | **98/97/94%** |
| v5.2b `POOL=15` | 18.9 | 18.1 | 17.3 | 99/99/98% |

- **Source 3** speeds the game ~½–1 round and lifts winner totals +3–5★ (60/68/65 vs the
  SRC2 arm's lower totals at longer rounds) — richer rounds, shorter arc. The designer's
  grind read (whole activations on +1-good alternates) is the thing it removes.
- **Each die buys ~+1 round**; pool 14 = +1.5/+1.6/+1.7 with the BEST band profile on
  record; pool 15 = +2.4/+2.6/+3.1. Under SKILL the game already crescendos — GM plays
  **19.9 / 18.7 / 17.1** on pool 13, and 2p GM hits the 25-round ceiling in 15% of games
  — so pool 15 at 2p would collide with MAX_ROUND. The one-die-at-a-time step (v4.9b's
  own discipline) is pool 14.
- Live anchor: the designer's 2p game vs the CM ran 16 rounds and "felt long… I want
  round 13 to feel like 2/3." Pool 14 + Source 3 lands the CM-table arc at ~17½–18;
  pool 15 at ~19.

## 2 · THE HEADLINE — Ventures are dead at every tier

| tier | placements/g (2/3/4p) | hand left | placement round |
|---|---|---|---|
| trader | 0.13 / 0.18 / 0.30 | 3.94/4 | 12.6–15.6 |
| GM | 0.13 / 0.33 / 0.28 | 3.89/4 | **17.5–23.0** |
| CM 3p | 0.08 | — | — |

Not a greedy blind spot — the **search tiers won't buy the line either**. The ground-
succession Ladder prices an L1 at: the fee + a standing Public Work + its future ticks +
the maturity +6★ — against a face that needs 3+ activations to pay. The few seats that DO
place one over-win (GM 3p 1-vent 50% vs 33 baseline; trader 2p 64.7%) — the powers are
fine, **the door is priced shut**. Climbs are extinct (0.00–0.07). The v5.2 open-slot
corpus ran 6–10× the volume, so the collapse is the letter's ladder, not the family.
The designer's same-day direction (public benefit line on every Venture + the beer-value
market) is the system-level answer — see BALANCE-PROPOSAL-v52 §3.

## 3 · Public Works — utilization by design

Pooled trader-300 + GM-60 reads (`blt/g` · ticks/build · maturity%):

- **Malt Kiln — the engine, healthy.** 1.2–1.45 blt/g every tier, 2.0–3.4 tk/bld, matures
  28–78% (count-scaled). The one tile the whole wharf funds.
- **Cooperage — healthy, watch the self-mint.** 0.5–0.7 blt/g, ~1–1.9 tk/bld, matures
  19–55%. Wharfage +1★/load + maturity is the strongest owner line (the live 2p game: 3
  ticks + mature = 9★ and the door-slam).
- **Bonded / Victualling — alive under skill.** GM sail-away rates 26–29% (trader 5–13%);
  the ephemeral cash-out grammar works.
- **Weigh House — popular tile, dead effect.** Built 0.34–0.78/g (a cheap 3-pip die
  stand!) but ticks 0.03–0.11/build: the two-Manifest-lines window (delivered off THIS
  slot's Ship, cask satisfying 2 lines) ~never opens.
- **Ropewalk — dead effect.** Ticks 0.00–0.13/build; the cross-quay chain (ship here +
  load here + second ship elsewhere with room + second Ready cask) is too deep a
  conjunction even for the GM.
- **Tollhouse — dead, third version running.** 0.05–0.23 blt/g, ~0 ticks at every tier.
- **Customs — near-dead.** ≤0.17 blt/g; the −1 (v5.2's own nerf from −2) only bites at
  Novgorod's 3+ gate, and Novgorod is the cold port.
- **Staple Houses ×4 — never assemble.** 0.01–0.25 blt/g, staple★/player 0.1 at every
  tier; the `STAPLE=4` arm moved it 0.1→0.2 — **reachability, not reward** (the v0.15
  lesson re-confirmed). The premium wants the bourse tie-in (the proposal).
- **Build timing under GM: 6/16/36/42 by quarter** — buildings are an endgame annuity
  under skill. The maturity mechanic fires (Kiln/Cooperage) but mid-game engines don't
  exist — the designer's live complaint verbatim.

## 4 · Lanes, ports, seats

- **PATHWAYS (v5.2b):** majority 52.5/43/31 · lifter 47.5/37.5/27.5 · builder 19.5/21.5 ·
  breadth 20. Majority cooler than v5.2's 59.5/46.5/36 but still the top lane at every
  count; builder cold.
- **CM 3p lanes:** the BANK lane leads (26% of seats · 42% win — maturity + Manifests);
  majority-leaning seats rare and cold under deep search (7% · 20%). Winners' composition
  33 deliv / 25 maj / 19 bank / 16 flight.
- **Ports:** Novgorod dead-port 2p GM **26.7%** (the §18 watch persists) · 13.3% 3p ·
  3.3% 4p. London 2p 8–17% dead. Bruges ~0.
- **Seats:** 2p P1 53.3% (GM) / 49.3 (trader — Source 3 eased the v5.2 57.0 read); 4p GM
  scattered (n=60).
- **The door-slam (live game):** a 3-cask London delivery = 3 per-cask build prizes = a
  whole tray committed in one beat — the CM converted 4 dead dice into ~13★ AND slammed
  the clock. Legal, strong, abrupt — flagged to the designer (per-sail prize cap is the
  candidate dial).

## 5 · Verdict list → BALANCE-PROPOSAL-v52.md

Buffs/reworks: Ventures (systemic — the public/private split), Weigh House, Ropewalk,
Tollhouse, Customs, Staple Houses (bourse carriers). Nerf candidates: none macro-warping;
watch the Cooperage self-line and the London multi-prize slam. Dials: pool 14 (recommend)
· Source 3 (landed) · STAPLE stays 2 pending the bourse. New ground: the beer-value
market (designer-directed, same session).
