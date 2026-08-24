# v5.7 “Plain Sail” — the Manifests leave

*Designer-ruled 2026-08-23: **“Ditch the manifests for now.”** `KEY hanse-v57`.*

---

## 1. Why the letter didn't feel right

The original Letter 4 offered three ways to make Manifests into goals. Two of them added
**more Manifest machinery** — claim markers, an all-lines-satisfied condition — to a layer the
designer had already diagnosed as **bolted on**. The letter was trying to fix the card instead
of asking what job the card was doing.

## 2. What made the question answerable

Count the systems answering ***“what is this cask worth?”***

1. the **die** (quality × aging)
2. the **port premium** (Novgorod +3★)
3. the **Bourse marker** — variable, moves with play
4. the **Manifest** — variable, per hull

**Before v5.6 the Bourse barely moved** (end-track 0.4–1.1, and it was a ratchet), so the
Manifest was the only live variable demand in the game. **After the Glut** the Bourse opens at
+3, every sail moves it, and it prints on a board everyone reads. **The Bourse does the
Manifest's job — better, publicly, with nothing to remember.**

So the Manifest was the **duplicate**, and it was the duplicate that:

- had **no physical claim marker** — three lines, each claimable once per voyage, tracked in
  players' heads. A confirmed **component-state violation** (the hard line, ruled 2026-07-12);
- resolved as a **post-sail rebate**, not a plan you brewed toward;
- paid roughly **8%** of a winning score;
- and that the designer had twice said they were not a fan of.

**Retired whole**, the way the Tollhouse stamp went — git history holds the twelve cards.

## 3. Why subtract before replacing

Path B was on the table (keep a card on the hull, change it from a *demand* into a **market
line**: *"this cargo does not glut"* · *"+1 to this beer"* · *"−1 to a beer of your choice"*).
It is elegant, and it lands where §10 says the game is short.

**A went first anyway.** The diagnosis was *bolted on*, and the honest response to bolted-on is
to take it out and see whether you miss it — not to bolt something else into the hole while it
is still warm. Path B stays queued, better aimed for having waited.

## 4. The two re-derivations — neither was free

Both had their **entire face** built on the retired layer, so this subtraction forced two
design decisions.

### The Weigh House — *"On sail: this cargo does NOT glut"*

Was: *each cask delivered off this Ship may claim two Manifest lines.*

Now it **certifies the shipment** — the casks score and the market does not absorb them. The
only way in the game to sell without spending the price. Thematically exact (a weigh house
certifies), costs no new component, and it lands precisely where `DESIGN.md` §10 said the
economy was short: up-shifts running **4.3–5.0** against **9.2–15.0** glut steps per game. It
is also the tool the specialist lane has been missing — a depth player's whole problem is
out-pumping their own decay, and a certified Hulk simply skips it.

*Deliberately strong, and watched:* the tide (v5.4) takes it away on the very sail it fuels.

### The Chronicler — *"Deliver a cask: +1★"* ⚙

Was: *claim a Manifest demand: +2★.*

Same job — a scoring specialist paid per shipment — on a trigger that still exists. Kept flat
and safe on purpose: this is a subtraction letter, not the place to smuggle in a new engine.

### Hall mode's ⚜ faucet

Re-homed from the claim to the **voyage** — the first cask you deliver on a sail pays one.
Comparable rate, and it survives the layer it used to depend on.

## 5. Gates

| Gate | Result |
|---|---|
| `verify-v4.js` | **378/378 ALL PASS** — §21 retired whole; the Weigh House battery re-derived to certification (with its uncertified control); a new Chronicler check; and a gate asserting **no Manifest machinery survives in the engine** |
| `sim.js` (20 × 2/3/4p) | **0 crashes / 0 deadlocks** |
| `ai-render-smoke.js` | ALL PASS |
| `aid-overflow.js` | ALL FIT |

**Read:** pace **16.4 / 13.7 / 13.1** · winner totals **80.0 / 77.2 / 73.3**, down from v5.6's
89/89/78 **by about the 8% the Manifests were paying — exactly as predicted before the cut.**

**The watch that got worse, and it is now the live one:** margins **23.3 / 14.4 / 16.4**, and
the short-game tail widened (band **95 / 80 / 70%**, every miss a *short* game, min 8–9). Two
letters running have widened the spread. Levers, cheapest first: `BOURSE_START` (3→2) ·
`PRIZE_PTS` (2→1) · the tray. **Nothing dialed — this one wants a human table.**
