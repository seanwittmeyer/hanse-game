# V53-BOURSE — the ruled v5.3 plan (2026-08-22, the third letter)

**Status: RULED · this document is the implementation record.** Version **v5.3 "The
Bourse"** · save `KEY hanse-v53`. The third designer letter of 2026-08-22 — ruled in the
same session as v5.2 "Groundwork" and the v5.2b letter, off the live 2p game (the
"feels long / haven't built an engine" read), the v5.2b oracle (Ventures dead at every
tier), and the maneuvering-space thread.

## 0 · The rulings (the designer's words)

**The bourse (two messages, the second refining the first):** *"I want to establish a
beer value market. Each beer has a track for its value… (one for each beer except gruit
and jopenbier) set the value for that beer type at delivery. In Bergen, we can set the
bonus to be specialist + adjust market by 1. Some of the public benefits on owned
buildings can be a −1, +1, or +2 manipulate."* Then: *"maybe you decrease the value on
brew and increase on arrival at Kontor… this would balance the loosening of the game and
give players an opportunity to specialize… the tracks could work a little like the value
tracks in Lisboa… and/or the influence tracks in Maracaibo."* The decisions, ruled:
**"Die plus Track. Bulk rise then score. One marker per beer, they can share a single
track."**

**The venture split:** *"Player buildings have a private action for the owner and a
public action for everyone. Public benefits should be simple — gain 1 good, +1 any die,
etc. Owner gets both when activated. That will grease the wheels."*

**The furniture:** *"It's hard enough to open a building right now… so I'd like to think
of public buildings as a way to start the game. You never put a die on them because they
simply start the game. Randomly choose 3 or 4 public buildings and place them out
randomly. That's the start of the game. Rest to the box."*

**The open ground:** *"Players can build L1 buildings on any open slot until all slots
are full, then they can replace others. You still can't replace another player's L1/L2,
maybe we handle that later if it's an issue."*

## 1 · The Bourse (§5c)

One shared track **−1 · 0 · +1 · +2 · +3** ⚙ (`BOURSE_MIN`/`BOURSE_MAX`, sim `BMIN`/
`BMAX`), a **price marker per in-play beer except Gruit & Jopenbier**, all starting 0.
A delivered cask scores **DIE + TRACK** (never below 0; Novgorod/Staple/Manifest ★ ride
on top; the die itself never moves — gates, presence, majorities, the clock unchanged).
**BULK RISE THEN SCORE:** as a Ship arrives, each tracked beer's marker rises +1 per cask
of it aboard (cap), THEN every cask scores at the new value. **Every brew** of a tracked
beer slips its marker −1 (floor). **Shifts** (never a new action): Bergen's prize adds
*shift any marker ±1* per delivered cask; the Venture public lines print ±1 and +2▲.

## 2 · Public Works = the start of the game (§5a)

`setupWorksN` ⚙: **3 at 2p · 4 at 3–4p** (the ruling said "3 or 4"), drawn at random from
all 13, placed on random slots; **the rest to the box**. Die-less, neutral, passive; no
deck, no display, no build channel, no fees, no maturity — **the v5.2 investor grammar
retires after one letter** (`bldgTick`/`bldgDepart` stay as inert "a use" seams). The
mason's-mark scoring lane leaves `scorePlayer`; the dice serve casks + presence alone —
the runway loosens by ~2 committed dice/player (the designer's maneuvering-space ask; the
pool-14 question re-measures after this).

## 3 · Ventures: the open ground + the public lines (§5b)

**L1 on any open slot; wharf full → may replace a Public Work (boxed); never another
player's L1/L2. L2 over your own L1 (unchanged).** Every face gains a **public line**
(`pub` ⚙): Rack/Brewery *age +1* · Counting/Assay Loft *+1 good* · Factor *Bourse ±1* ·
Staple Rights *Bourse +2▲* · Warehouse *+1 good* · Residence *Bourse ±1* — a free `vpub`
stop for WHOEVER activates a line through the slot; the owner also keeps the ringed
line (vact stops + passive faces). London's prize = a Venture, fee waived; none playable
→ forfeit (the v4.9b grammar). The *Gain 1 building* bonus reprints as **Open 1 Venture**.

## 4 · Engine & harness

`play.html` (KEY hanse-v53): S.bourse + tracked/bourseShift/bourseFmt · the brew crash in
brewCommit · bulk-rise in sailShip + die+track in deliverCask · pendingShift (Bergen) in
grantPrize/afterSail · enterBshift/bshiftPick + aiShiftPick · vpub stops (activateLine/
refreshStops/resolveStop/stopAvail/stopLabel) · ventureL1Slots = open-ground · setup
furniture draw + bourse init · the build channels dormant (display never fills — survey/
benefit offer Ventures alone) · AI: aiVpubValue, bourse-aware shift heuristic, MC bshift
options · humanGate/actorSeat bshift (the Bergen rider can belong to a non-active seat).
verify-v4 **352/352** (§28 rewritten as the Bourse battery — crash/floor/bulk-rise/cap/
under-score/Bergen shift/clamps; §32 the open ground; §32c the public lines; setup =
furniture + bourse init). sim.js: `SETUP_WORKS` implicit, `BMIN`/`BMAX` hooks pending ⚙,
counters bshiftUp/Down · brewCrash · vpubGold/vpubStep · bourseAvg/furn. components.js/
print.html: two-line Venture faces · de-chipped furniture · the Bourse strip + 8 price
markers NEW · Bergen mat/aid reprints. index/learn/rulebook/RULES/COMPONENTS/STYLE
reprinted; the Bourse diagram replaces the mason's-mark diagram.

## 5 · Gates at the ruling

verify **352/352** · sim smokes clean 2–4p, 0 crashes/0 deadlocks (ventures 1.7–5.3/game
— the family is ALIVE again vs 0.1–0.3 under the v5.2b ladder; climbs land; shifts move;
end-track avg +0.2…+2.1) · render smoke ALL PASS (GM/CM included). The full oracle on
v5.3 follows when the designer calls it.

## 6 · Watches (RULES §Open #20)

The track ends ⚙ (+3 may cap too low at 4p — smoke end-avg ran +2.1) · solo-Skute
pump-and-sell (a single cask still rises before it scores) · the public-line goods faucet
(7–47 freebies/game in smokes) · the Bergen shift per cask (a 3-cask sail moves the
market 3) · the furniture draw's feel-bad deals (no-Kiln games · double-ephemeral games)
· 16 venture tiles vs 8 slots at 4p (rival L1s never displace — ground may lock) · the
runway loosening vs the pool-14 question · the retired investor lane's ~4–8★ redistributes.

## 7 · The v5.3b rider (same day, ruled)

*"One of the public buildings should have a +/-1 bourse."* — **the Tollhouse is the toll
bench**: a cask loading at its slot lets the **loader shift any Bourse marker ±1** (queued
via the pendingShift grammar, resolving as the load flow closes). The stamp face (−1 die
for +3★) retires — it measured dead through v4.12b, v5.1 and v5.2 at every tier — along
with its loadopt choice point (a dormant seam). Carrier choice per BALANCE-PROPOSAL-v52
§3b (the deadest tile takes the market job); easily moved to another tile if the designer
prefers. `KEY hanse-v53b` · verify 351/351.
