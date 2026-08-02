# Human playtest #25 — 3p, 12 rounds, dice trigger (2026-08-02 · KEY hanse-v46)

**Seats:** Sean (human) · Olli (Guildmaster AI) · Adaline (Cellarmaster AI).
**Result:** Adaline **57** · Sean **45** · Olli **34** — margin 12 · 9 voyages · ended by
Adaline's empty tray at round 11 (final round 12; `endReason: dice`). Studio playtest id
50edecf1 (#25). *Ran pre-v4.6b/c/d — the misread Bergen throttle and the frozen line were
live; both letters trace to this session's table.*

## Final decomposition (the loss lives in ONE column)

| | deliv | bank | maj | flight | TOTAL |
|---|---|---|---|---|---|
| Adaline (CM) | 19 (7 casks) | **20** (9 build★ · 8 lading★ · 3 bumps) | 14 | 4 | **57** |
| Sean | 18 (6 casks) | **3** (1 build) | 15 | **9** | 45 |
| Olli (GM) | 14 (4 casks) | 7 | 9 | 4 | 34 |

Sean matched the winner on deliveries (18/19), beat her on majorities (15/14) and the
Flight (9/4 — the only 4-beer flight; the 7★ Kiln-lifted Novgorod Mumme was the game's
single best delivery). **The entire 12-point loss is the bank: 20 vs 3** — three raises,
two lading claims (3★+5★) and three bumps vs one raise, zero, zero.

## The four pacing questions (the designer's ask)

1. **Start too slow? No.** First voyage round 2 (Sean's Skute), 5 voyages by turn 8, every
   prize channel flowing. The warm start does its job; what reads "slow" is the human's
   bank sitting at 0 while the engine builds.
2. **Mid-game infra? Working — with a twist.** The Kiln lifted six boardings in rounds 8–12
   alone; the Capstan→Rich-Berth warp authored the mid-game's tempo lane. The twist: **3 of
   the 7 placed buildings landed in the final round as London-prize placements** — pure
   +3★ mints, never fired as actions. The **late-London convert** (die ★ + 3★/cask prize +
   die-6 ladings) is the strongest closing line in the game: Adaline's final Hulk was worth
   ~14 deliv + 6 build + 5 lading ★ AND the trigger.
3. **End too soon? It ends when the LEADER says so.** 12 rounds is in-band and exactly the
   sim's 3p pace — the human table did NOT run slower, because the Cellarmaster raced. The
   felt abruptness is **trigger control**: 3 cheap bumps let Adaline dump pool dice fast
   (each = 1★ + presence + clock) and slam the door 12 up, while Sean sat on 4 unspent tray
   dice, a Ready Broyhan, and a 1/2 Cog. *This is the human-table evidence §Open #1 was
   waiting for.* Pool 13 ≈ +1 round — it likely buys Sean's second Cog sail (+~8: die 3★ +
   the open London·Broyhan lading 3★ + ~2 majority swing → 53) but NOT the 17-point bank
   gap. The clock length is fine; the racer's *control* of it is the design question (and
   bumps are its engine — note the Town Crier doubles exactly this).
4. **Can strategies execute? Yes — but the bank is the swing layer.** Quality/breadth ran
   clean end to end. What the human line never touched: ladings (0 claims — the row ran
   die-6/named-beer heavy; his one qualifying window was the stranded Cog) and the build
   mint. The CM won on layer coverage, not on out-brewing.

## The two fixes this table caused, verified against this very log

Round ~10, Sean's Bottom-row turn: Cellar turns BOTH Broyhans Ready → commissions the
Cog→London **onto s7 (his own active line)** → the maiden load takes one Broyhan → the
frozen stops list never offers the s7 top-off. The Cog strands at 1/2 holding ~8★
(die + open lading + majority shift). **v4.6c (living line) opens that stop; and Sean held
the STEVEDORE — under v4.6d the maiden load alone boards both Broyhans and the Cog sails on
the spot.** Either of the two same-day rulings converts the play. Corollary: the slot-only
Stevedore, seated round 2, visibly never fired once in 12 rounds — every load he made was a
single-cask maiden or slot load. The buff repairs the exact dead tile he experienced.

## Carried forward

- §Open #1 stamped: human pace ≈ greedy pace when a racer sits at the table; the pool-13
  call is now about **runway for the non-racer**, not average length.
- Watch (new): **bump-commit speed as trigger control** — the racer's lever; Town Crier
  amplifies it. Dial candidates if it sours: bump parks don't spend pool dice ⚙, or the
  trigger needs parked-not-riding again (v4.5 reverted that for the #24 stall — tread
  carefully).
- The late-London building mint (prize placements as pure end-game ★) — watch whether the
  display should thin or the prize should require an ACTIVATED placement late; no dial
  proposed yet.
- Ladings ran die-6-heavy all game (row luck): the standing dead-Keut strip + a possible
  die-min spread audit ⚙.
