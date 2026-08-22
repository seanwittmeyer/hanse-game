# V52-GROUNDWORK — the ruled v5.2 plan (2026-08-22)

**Status: RULED · this document is the implementation record** (the V51 precedent).
Version **v5.2 "Groundwork"** · save `KEY hanse-v52`. Source: the 2026-08-22 buildings
rethink — one in-session conversation from "explain the v5.1 rationale" to "Build it,
commit and push to main." The v5.1 rider grammar retires whole; the building system
re-derives on the designer's stated model.

## 0 · The rulings (the designer's words)

The intent: *"buildings are modifiers to the items in that slot — a docked ship, a loading
cask, maybe an empty slot itself… That way the line is clear and clean. You choose a line
consisting of a primary action based on your worker, an alternate action, and two slots.
The buildings modify their slots."* And the correction of v5.1's reading: *"the ones with
'before a load here' — these feel like action buildings that were reworded."*

The two families: *"One set is the neutral buildings… These would be the ones with mason
dice on them tracking uses. Think of the builder as the investor — they funded the
construction of that building and want a return on it — their die increasing. Everyone
uses it and the investor gets the points. The private GWT buildings are different. They
are private buildings with a private benefit. They have no dice because the action or
power printed on them is the return on the investment if used well."*

The ladder: *"you must build in order: Public building → private L1 → private L2. This
means L1 and L2 can't be overbuilt and players are incentivized to get public buildings
out there. It also means it's harder to spam the wharf and take up slots."*

The dual-use climb: *"you don't flip the tile but you overbuild, so you choose an L1 to
skip when you overbuild an L1 just as you skip an L2 by building an L1."*

Tile calls: *"Customs house minus 1 for the Kontor. This is already almost broken given
London and Bergen are both 2+."* · *"Rich berth is meh."* (cut) · *"Change ropewalk to
load here and get an additional load to a different ship."* · *"The set of 4 private
tiles each is good and manageable, and that's solid expansion ground."* · *"Die returns
to your hand in overbuild… Overbuild still pays out points for pips. That is better in
general."* · Visual: *"The private buildings should have a color ring around the edge
showing ownership. The public buildings should become brown instead of green to not
confuse with green player."*

Soul statement (the standing constraint): *"This is a game about wharf management — how
can you as a connected brewmaster wield your influence and knowledge of the wharf to make
the right beer and deliver it to the right places to win. It's not so much about brewing
itself as it is what, where, and when."*

## 1 · Public Works (brown · shared · the investor's die)

Passive slot modifiers only — no building adds an action for anyone. Build = display →
slot (London free / the survey verb at the printed grain fee); the investor's die stands
at the printed face and ticks on ANY use. **Maturity (proposed in the dive, unobjected,
built): at 6 — +6★ banked, the die home, the tile demolished, the slot opens.** Overbuild
(public only): pips bank + die home (ruled). Neutral setup seeds: no die, never mature.

Roster (13 tiles / 9 designs · deal 11 = all non-Staples + 2 of 4 Staples): Malt Kiln ×2
(2G·2) · Tollhouse (1G·3) · Customs −1 floor 1 (2G·3, ruled) · Ropewalk cross-quay load
(2G·3, ruled) · Cooperage (2G·3) · Weigh House (2G·3) · **Staple House ×4** (2G·2 ⚙ —
+2★/cask on a matching-Kontor sail; the designer's +4 is the A/B arm, sim hook `STAPLE=`)
· Bonded Store · Victualling Yard (ephemerals). **Retired:** Granary · Mission Quay ·
Racking Hall · Assay House · Abbey Cellar · Hop Exchange · Merchants' Exchange (ideas →
the Ventures) · **Rich Berth (cut, ruled)** · Warping Capstan (expansion lot).

## 2 · Ventures (private · the owner's ring · no die)

An identical hand of **4 dual-use tiles** per house. L1 plays from hand — **THE LADDER
(ruled): only while one of your mason's dice STANDS on a Public Work** (checked at
placement; the dice are the permit — no memory). L2 lands only by overbuilding your OWN
L1 with a second hand tile (the spent L1 boxed; same ground). Each side played forfeits
the tile's other face. Never overbuilt by a rival; an L2 never displaced. No die — the
clock untouched. Fees ⚙ L1 1G · L2 2G (waived as the London prize; the prize and the
survey verb offer BOTH families).

| Tile | L1 | L2 |
|---|---|---|
| Rack House / **Brewery** | swap 2 vessel dice (line stop) | BREW, full search (line stop) |
| Counting House / **Assay Loft** | loads here +1 good | pay 1H — 1 cask READY (line stop) |
| Factor's Desk / **Staple Rights** | re-deal this Ship's Manifest pre-load | own casks sailed from here +1★ ⚙ |
| Warehouse / **Guild Residence** | loads here +1 cask | end: 2★/Venture in play ⚙ |

The pairings put a tempo-now face against an engine-later face (the dual-use agony);
new pairings are the ruled expansion ground.

## 3 · Engine & harness

`play.html` (KEY hanse-v52): the family split ({v,lvl,owner} · vAt/vKind · bKeyAt blind
to ventures) · maturity in bldgTick · hasPublicDie/canVentureL1/L2 gates · venturePick/
placeVentOn/commitVenture + benefitVenture · the vact owner-stops in activateLine/
refreshStops/resolveStop · beginLoadStop→vredeal · rwChain (the Ropewalk chain, tick on
the crossing) · Staple/Staple-Rights in sailShip · vgood/vload in the load flows · the
Residence in scorePlayer · AI: aiVentureVal/aiVentSlot/aiPubBuildVal priors, both
families in the survey/benefit decisions and the MC option spaces · ALL v5.1 rider
plumbing removed (RIDER_SCOPE included). `components.js`: WORK_FOOT brown · VENTURES +
ventureTile + the blue owner-only foot; kit stand-in art off the retired tiles' freed
files (briefs queued). `print.html`: the Public Works sheet (13) + the double-sided
ringed Venture sheet (16). sim.js: STAPLE hook · matured/ropeX/ventL1/ventL2/vre
counters. strategy-probe.js: the maturity cause + the Venture ledger.

## 4 · Gates at the ruling

verify-v4 **338/338** (the §32 Groundwork battery + §7b/§11/§20/§28 rewrites replace the
rider batteries) · sim smokes clean 2–4p, 0 crashes/0 deadlocks (ventures place, climbs
land, maturities fire ~0.6–1.4/game, cross-quay loads run). **The full oracle battery and
the utilization/balance proposal follow immediately** (designer-ordered in the same
message) — `ORACLE-STUDY-v52.md` + `BALANCE-PROPOSAL-v52.md`.

## 5 · Watches (RULES §Open #19)

The have/have-not gap (0-builders get nothing now) · the London-prize pull (86–94% of
builds pre-v5.2) · 4p ground pressure (ventures never leave; maturity + overbuild are the
churn) · ventures commit no die (the runway discount vs the ladder's ante) · maturity
pacing by start face · STAPLE +2 vs +4 ⚙ · the greedy venture mix (the bots over-favour
the Warehouse L1 — a prior, not a verdict) · the Cooperage's shared-Ship berth (the one
non-loader-only face) · every new number ⚙ unplayed.
