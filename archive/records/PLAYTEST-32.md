# Playtest #32 — 3p live, v4.9d "Loaded Flight" (2026-08-05)

**Seats:** Sean (human, 1st) · Olli (Guildmaster AI) · Adaline (Cellarmaster AI).
**Result:** Adaline **43** · Sean 31 · Olli 29. **9 rounds** — dice trigger (Adaline's tray
emptied on the last seat of round 9 → the round was already complete → immediate end).
8 voyages. Studio record `f7e789f7` (#32). The fastest live game yet (#29 ran 10).

## Bookkeeping audit — clean
Every column re-derived from the raw state and matched to the star, including the subtle
ones: Bruges majority split (Adaline 6 bodies 1st 4★; Sean 2 vs Olli 1+1 presence = a
2nd-place TIE, split 1/1), London 5/3/1 with presence bumps counted, Bergen 9★ to Olli on
two bodies, Novgorod 8★ to Sean on one. presPool/tray/vessel/mark counts reconcile for all
three seats. Flight fired on LOAD as ruled (v4.9d), including Olli's Bock — loaded on a hull
that never sailed, still a shipped beer for the Flight. Kiln lift fired only when the load
passed its slot (Sean's Gruit → die 2 → legal at London's 2+ gate); Olli's off-slot Novgorod
load correctly got no lift. Two-specialist Bergen haul (Alderman+Stevedore off one 2-cask
ship) is correct v4.7 per-cask grammar. **No engine faults found.**

## The story — a volume-tempo race beat a premium line by 12
Adaline played the racer: **6 brews**, mostly cheap instant-Ready Gruit, 7 deliveries
(5 at Bruges), one 5★ Bock at London, 4-beer Flight (9★), TWO buildings whose marks she
then **self-worked** (Racking 3→5 — including the launder: an uncapped rack put die 2 on a
Q1 Gruit, delivered for 2★), Kiln 2→3. Her Gruit loop is self-refunding: brew 1G → load
(+2 goods bonus) → 1★ + a per-cask Bruges prize (2 recipes mid-game, 2-goods consolations
late) → a die committed to the clock. She converted her whole tray by round 9 and ended the
game with ~14★ of the table's quality cargo still in the water:

- **Strand ledger:** Sean Bock die 5 + Hopped die 2 READY in vessels (≈9★ with the Novgorod
  premium) · Olli Bock die 5 riding the Cog→Novgorod at 1/2 (≈7★). All of it quality-side.
- **Counterfactual:** even Sean's best final turn (rowB from Harbor → top the s4 Cog with
  the Bock → 5+2=7★; no Novgorod contract in the row, no Kiln on that line, majorities
  unchanged) reaches **38, not 43** — and hands Olli +12 (delivery + Novgorod 2nd tier).
  The game was decided rounds 6–8, not on the last turn. The losing call was the second
  Bock (brew at 2, Ready at 5) into a visibly draining tray — Adaline's pool was public
  the whole time.

## Design signals
1. **The volume lean, quantified live.** Bodies-not-pips majorities + per-cask prizes +
   the Flight + the clock ALL pay cheap casks; only the deliv pips and Novgorod's premium
   pay quality — and quality also carries the strand risk. 43–31–29 with every stranded
   die a premium one. Third straight live 3p game (this, #30, #29) where the winner's
   engine was tempo, not quality. → Next battery: a strand-pips counter in sim.js + a
   volume-vs-quality persona duel at 3p before touching any value (v0.15: structure lever,
   not value lever).
2. **Pace:** 9 rounds vs the 12.0/11.3/11.2 sim means and the ~12–25 band. The CM races
   the clock deliberately; live 3p is landing at 9–10. Flag for the pool-13 watch — not a
   tune (designer holds the dial).
3. **v4.9c Bock at half-tax:** all three houses brewed it — the tariff kept the style
   alive — but 2 of 3 casks stranded. Novgorod's problem has shifted from *dead port* to
   **strand port**: its 4+ gate is where the clock race bites (1 delivery, 1 half-loaded
   Cog abandoned).
4. **Roster notes:** Abbey Cellar built by the GM and NEVER used — a static 3★ annuity,
   live (the pay-3H price stayed out of reach); Alderman seated and scored **0** (dice
   spread 2/2/1 — first live counter to the study's +5.6 sleeper read). The setup-dealt
   Mission Quays worked all game with no die — correct v4.9, and the contrast with owned
   marks read fine at the table.
5. **v4.9d legibility, first live outing:** the Flight ladder + completed cards were on
   the boards; Adaline's 4-beer flight was visible from mid-game. No "invisible 16★"
   complaint this time.

## Watches fed
"The Flight tightens — strand a beer → no score" (fired, hard) · "die-vs-runway squeeze"
(weaponized by the racer) · pool-13 fast tail (now a live pattern) · Abbey/Alderman roster
rethink · the volume-vs-quality lean probe (NEW — queue for the next battery).
