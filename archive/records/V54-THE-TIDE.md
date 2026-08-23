# v5.4 “The Tide” — the decision record

*Designer-ruled 2026-08-23, off **playtest #37** (3p · 12 rounds · Olli 80 · Adaline 43 ·
Sean 39). Operational rules: `RULES.md` §5a. Manifest: `COMPONENTS.md` §6a + §10.
Rationale + gates: `DESIGN.md` §9.*

---

## The brief

> *"I want engine building to pay off, I want the bourse more dynamic, I think the public
> buildings should sail with the ships (that way something overpowered burns out)."*
> — and, on the Venture door: *"Ventures shouldn't become a free action, we just need to
> allow players the opportunity through existing systems."*

## What the playtest showed

Three complaints, one cause.

- **The furniture deal decided the game.** Setup drew **two Malt Kilns**. They fired on
  every lift in the log and enabled a **Q2 Hopped to clear Novgorod's 3+ band for 8★** —
  exactly matching the Q6 Jopenbier capstone. Meanwhile **Novgorod Peterhof and the Weigh
  House never fired once** in twelve rounds, because no hull ever docked on their slots.
  Half the wharf was overpowered and half was scenery, permanently, from setup.
- **Engine building never happened.** 2 Ventures placed all game, both by the human, one
  (`Staple Rights`) paying **0★** because its hull never filled. A **Guildmaster and a
  Cellarmaster both finished with full hands** — not because building is weak, but because
  neither ever hit London and neither ever drew a cask carrying *Open 1 Venture*.
- **The Bourse ratcheted and stopped.** Three of four beers ended pegged at **+3**; the
  fourth, the only beer nobody shipped, sat at −1. `Staple Rights`' public line — **+2▲,
  up-only** — fired four times. The loop had an accelerator and no brake.

## The rulings

1. **THE TIDE.** Every Public Work is ephemeral: a Ship sailing from a slot takes that
   slot's tile with it, **boxed, never recycled**. Everything the tile does resolves while
   it still stands, so it always pays what it owed before it goes. The `eph` flag retires
   as a special case.
2. **The bag.** Setup stands 3 (2p) / 4 (3–4p); the rest become the **Public Works bag**.
   At the **END of the turn** the bag re-furnishes the wharf back to that count. The gap
   therefore holds for the rest of the turn — **an L1 Venture may claim the cleared
   ground** before the tide fills it.
3. **The bag runs dry.** Burned tiles never return, so the wharf is rich in furniture early
   and **thins into bare ground late** — the ground the Ventures inherit. **A Venture is
   never taken by the tide.** This is what makes engine building pay off: the ring is the
   only permanent thing on the board.
4. **The Venture door widens through an existing system** (ruled: *not* a new free action).
   ***Open 1 Venture* drops from Q3+ to Q2+**, so **Hopped** — 12 tiles, the most-brewed
   beer in the game — now prints **2** of them. The §8 lesson applied verbatim: *a dead
   lane is unreachable, not underpaid. Fix the door, not the prize.*
5. **The market gets a brake.** `Staple Rights`' public line becomes **±2** (was +2▲).

### Calls made inside the ruling
- **Staple Houses sail like everything else.** One family rule, no exceptions — and since
  #37 showed Peterhof as permanent dead scenery, rotation gets the Staples firing *more*,
  not less.
- **Refill at end of turn, not on the sail.** The gap is information, and it leaves the
  cleared ground claimable.

## Gates

- `verify-v4.js` **364/364** — including a new **§20c tide battery**: setup bags the
  remainder · an ordinary Public Work burns on a sail · the gap holds mid-turn · the
  end-of-turn refill tops back up · **a Venture is never taken** · a dry bag leaves bare
  ground without stalling.
- `sim.js 30` — **0 crashes / 0 deadlocks**, pace **16.4 / 15.9 / 14.5** at 2/3/4p, band
  **90% / 100% / 96.7%**.
- `ai-render-smoke.js` ALL PASS · `aid-overflow.js` ALL FIT (the aid was at its exact
  ceiling; copy was cut to pay for the tide line).

## The arc, in the data

(30 games per count)

| | Venture L1 placed | L2 climbs | standing at end / player | works standing at end |
|---|---|---|---|---|
| 2p | 3.4 | 2.3 | 1.7 | 3.0 |
| 3p | 5.0 | 3.2 | 1.7 | 2.7 |
| 4p | **6.1** | **3.9** | 1.5 | **0.9** |

Venture placement rises with player count and the wharf strips as intended — against
**2 Ventures in the whole of playtest #37**, where two MC seats built none at all.

On the Bourse, 4p down-shifts now **outnumber** up-shifts (**▼8.5 vs ▲7.2**, from ▼6.0 /
▲8.7 before) and the end-track average fell **2.2 → 0.9**: the ratchet is a market again.

### The cost, recorded

Pace tightened: 4p runs **14.5** (was ~15.6) and 2p band compliance slipped to **90%**.
The chain is traceable — more Ventures → more public lines → the 4p goods faucet is now
**31.0 freebies/game** → cheaper brewing → dice burn faster. **No dial was touched**: the
tray size is THE pace lever and moving it is a separate ruling. Logged as the live §10
watch.

## Watches opened (→ `DESIGN.md` §10)

- Does the wharf strip **too** hard at 4p? A late wharf with no Kiln may lock Q2 beers out
  of Novgorod entirely — watch for the quality ladder over-correcting.
- **Bag size vs player count** — 13 tiles serve 2p comfortably and 4p barely.
- A **one-shot** Staple House: still worth steering toward, or a lottery on hull placement?
- Does anyone actually **claim the cleared-ground window** at the table?
- **Open 1 Venture at Q2+** — watch the opposite failure: the wharf full of rings by round 6.
