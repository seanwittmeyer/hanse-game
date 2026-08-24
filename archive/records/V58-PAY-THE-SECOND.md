# v5.8 “Pay the Second” — the decision record

**Ruled 2026-08-24 by the designer.** `KEY hanse-v58`.

> *"At all player counts, majorities pay out. For 2p, pay our second place. Only pay if
> participated (0 if no dice in that Kontor). I'm surprised 2p didn't do this already."*

## The ruling

1. **Majorities pay at every player count.** With **2 players, first AND second place both
   pay** — only the 3rd tier is skipped. (`MAJ_TIERS_2P` 1 → 2 ⚙.)
2. **Presence gates the majority, at every count.** No parked dice at a Kontor, no share of
   its majority. A Kontor nobody sailed to pays nobody.
3. **The printed tier triples do not change** — 4/2/0 · 5/3/1 · 9/5/2 · 8/5/2 stand. This
   ruling changes *how many places pay*, not what they pay.

## What was actually broken

**Clause 2 was already the engine's behaviour and appeared on no component.** `majorityAwards`
has always filtered `pr>0` before ranking, so an absent seat could never inherit a tier — but
the rule was written down nowhere: not on the player aid, not in the rulebook, not in
`RULES.md`. A player could not read it off the table. That is the component-state hard line
(ruled 2026-07-12), quietly broken for as long as majorities have existed. The designer
surfaced it by assuming it was already true.

The touch list for clause 1 then turned up two more printed-surface errors:

- **`rulebook.html`** told 2-player tables that *"Majorities pay **first and third** place
  only. Skip the second place tier at every Kontor."* Wrong twice over: the engine paid
  **first only**, and "first and third" describes no coherent rule. Live on the site.
- **`print.html`** rendered Novgorod's prize note as *"every delivered die scores **+2★**"*.
  v5.6 ruled Novgorod to **+3★** and updated the long-form note — but `BNOTE_SHORT` is the
  string that actually prints, and it was missed. **Any Destinations board proofed between
  v5.6 and v5.8 carries the wrong premium.** (`COMPONENTS.md` §10.)

Both are the same failure mode the charter's override names: a ruling that landed on the
engine and the nearest doc, but not on every surface that states the fact.

## Why this lever

The 1,850-game Monte-Carlo oracle (2026-08-24) decomposed the 2p runaway and found it was
**not** the Bourse and **not** the prizes. At 2p the engine paid first place only, making the
four destination majorities **26★ (4+5+9+8) of pure winner-take-all**, riding on an 18% cask
edge with no consolation whatsoever. Re-tiering the ports was measured and does nothing on its
own — quadrupling London's majority payout moved its cargo share 20.0% → 20.9%, because
destination comes from the ship supply and rival commissions, not from choice. The majority is
a **rider on deliveries**; the number of places paid is the part that bites.

## Delivered (200 games/count, journeyman, live build)

| | 2p | 3p | 4p |
|---|---|---|---|
| margin | **19.4★** (was 22.1) | 14.8 (was 15.1) | 12.6 (was 12.7) |
| blowouts >25★ | **32.5%** (was 38.0) | 18.0% | 11.0% |
| close ≤10★ | **33.5%** (was 27.2) | 44.5% | 49.5% |
| winner total | 84.3 (was 78.3) | 79.2 | 70.2 |
| rounds · band | 15.3 · 84% | 14.6 · 89% | 13.7 · 86% |

**The decomposition is the clean read: the majority's share of the 2p margin more than halved,
8.42★ → 3.9★.** Second place now collects 15.5★ of a 34.9★ pool where it used to collect ~7 of
22.3. Winner totals rise because the pool grew, not because it was redistributed. 3p/4p are
unmoved, as expected — they already paid a second place.

**The runaway is dented, not closed.** Deliveries still carry 9–10★ of the 2p margin, and at
guildmaster it remains ~30★.

## Queued, not ruled

The **re-tiering** that pairs with this (London and Bergen both 9/5/2, Bruges 5/4/2). At
guildmaster the pair reaches **25.9★** where this half alone reaches 30.4 — the two halves are
"let second place exist" and "make second place worth taking", and at skill neither works
alone. Costed at roughly **+3★** of total inflation. The designer took the easy half first;
this one wants a table read behind it.

## Gates

verify **386/386** (new §14pre battery: the second place, the presence gate at 2p/3p/4p, a
Kontor nobody sailed to, and the tie split) · sim **0 crashes / 0 deadlocks** · render smoke
**PASS** · aid **ALL FIT** · syntax OK · `KEY hanse-v58`.

## Surfaces touched

`play.html` (dial + KEY + the scorepad note) · `RULES.md` §Scoring 7 · `rulebook.html` (the
2p sidebar + the end-game majority line) · `print.html` (the aid Majority row + the Novgorod
short note + a stale comment) · `COMPONENTS.md` §10 · `DESIGN.md` §9/§10 · `CLAUDE.md` §7 ·
`playtests/verify-v4.js`.
