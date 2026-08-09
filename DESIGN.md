# Brewhouses of the Hanse — Design (live build v4.12b “Light Wharfage” on the v4.0 spine)

> **v4.0 status (2026-07-21):** the streamline keystone is LIVE (`play.html`, KEY `hanse-v40`;
> ruled off `archive/records/V4-STREAMLINE.md` from human playtesting). The v3 line’s plan docs
> (`archive/records/V3-PATH-A.md` · `archive/records/HALL-STUDY.md`) remain as records; v2.9.1 stays frozen playable at
> `archive/v2.9/play.html`.

> The working design doc: **why the game is the way it is**, the **current architecture**, the
> **change log**, and the **balance lessons** carried forward. Operational rules live in
> `RULES.md`; the manifest in `COMPONENTS.md`; the active plan in `archive/records/PLAN.md`.
>
> **This file was compacted (2026-06-16).** The full pre-v1.0 design record — every dated
> session log, the v0.5/v0.6 reach-vs-standing architecture, the blow-by-blow v0.7→v0.16
> epilogues, and the old standalone `CHANGELOG.md` (now folded in below, §9) — is preserved
> verbatim in **`archive/v0.16/DESIGN.md`** and the **`archive/main-v0.16.1`** branch. Nothing
> is lost; this is the slim, current version.
>
> **Authorship:** all commits to this repo are authored as **Sean Wittmeyer**.

---

## 1. Snapshot

|               |                                                                                   |
|---------------|-----------------------------------------------------------------------------------|
|**Players**    |2–4                                                                                  |
|**Length**     |≈ 45–60 min at 2p · medium                                                          |
|**Genre**      |Medium euro · engine building · shared action grid (the Wharf) + private brewery    |
|**Weight**     |*Great Western Trail / Distilled* — not Lacerda                                     |
|**Theme**      |A merchant brewing house in the Hanseatic League, c. 1350                           |
|**Status**     |**v4.12b “Light Wharfage”** — live (`play.html`, KEY `hanse-v412b`; designer-ruled 2026-08-09 off the BUILDING-POWER-STUDY): the **Cooperage wharfage eases +2★ → +1★** per cask loaded there. Beneath it **v4.12 “Open Brewhouse”** (brew joins the Q3+ load-bonus pool · the presence fee scopes to the Almoner’s Stall alone · the roster pass — Cellarman uncapped, Innkeeper reworked, Chronicler +3★/Contract uncapped, Town Crier +2★/placed die · the building pass — Assay 1H→Ready, Cooperage wharfage, Exchange up-to-3, Capstan any-Ship), **v4.11 “Factor’s Fee”** (presence priced; the pool stays 13), **v4.10 “Eastern Gate”** (the Novgorod minimum returns to 3+, the +2★ premium holds), **v4.9d “Loaded Flight”** (the Flight qualifies on LOAD; the player board enters the app) and **v4.9c “Light Tariff”** (recipes `H` = Q−3). Beneath those, the v4.9b base: <br>**v4.9b “Cornerstones”** — TRIAL (KEY `hanse-v49b`; designer-ruled 2026-08-04 off the table talk): **the mark starts at the tile’s PRINTED face** ⚙ (utilities 1 · workhorses 2 · ship-riders/ephemerals/rare powers 3) · **the pool is 13** (the 13th die funds the marks) · **an untakeable build prize is FORFEIT** (no goods fallback — “gaining goods is a game action itself”; Bruges/Bergen consolations stand, scope flagged). Battery (n=300/count + POOL=12 isolation + PATHWAYS 100/lane, 0 crashes): pace recovers to 12.0/11.3/11.2 (the 13th die buys ~+1 round; start faces alone hold at ~10.5) · winner totals recover to 48.5/55.0/55.3 · **marks end at ~5.2/5.5/5.1 pips/player** (≈ the old +3★ mint’s total, now traffic-shaped) · lanes DEAD FLAT (3p 34/33/33 · 4p 27/27/24/22). verify **207/207**. Parking lot: the roster rethink + the ephemeral “tycoon” lane. Beneath it **v4.9 “Mason’s Mark”** — TRIAL (`KEY hanse-v49`; designer-ruled 2026-08-04, mid-playtest): **a build scores no ★ — the builder stands one of their 12 quality dice on the tile at face 1**; every use by any player turns it up (cap 6); **the pips score at game end**. The die is committed (empty-tray clock; no die → no build) and returns — pips scored at once — only when the building leaves play. Implementer’s fills flagged: tray-sourced · start 1/cap 6 · leave-play = score-now+return · no-die-no-build · tick = action resolved / lift-shaper effect actually used. Gates: verify **204/204** · A/B sim 300/count vs the v4.8 corpus **0 crashes/0 deadlocks** (see §9) · aid fit ALL FIT · render-smoke ALL PASS. Beneath it **v4.8 “Harbor Rates”** (`KEY hanse-v48`; designer-ruled 2026-08-04, mid-playtest): **the commission fee is PER HULL — Skute 2 `G` · Cog 1 `G` · Hulk FREE** (2/1/0 for 1/2/3 berths; was flat 1 `G`) — dispatch speed is dear, tonnage free; the fee prints on the trigger berth (chipless = free), the Shipwright waives whatever is printed. Gates: verify **192/192** · A/B sim 300/count each side **0 crashes/0 deadlocks** — commissions thin 6.8/9.6/12.4 → 5.5/7.9/10.5 per game (2/3/4p; the hull flood eases), voyages + pace + delivery split HOLD, commission grain roughly halves (6.2/8.6/11.4 → 2.6/4.2/6.6 — returned to brews/Kiln fees; winner totals +1–2★) · PATHWAYS spot 100/lane: 2p 50/50 · 3p 36/32/32 flat · **4p builder 43% warm / breadth 12% cold — THE watch** (free Hulks feed the line-author; full 200/lane before any dial). Beneath it **v4.7 “Every Cask”** (`KEY hanse-v47`; designer-ruled 2026-08-02, five rulings): **every cask pays its port’s prize** (one grammar, all four kontors — Bergen’s cap cut off the PRIZE-CAP-STUDY) · the **specialist price pass** (Grain Factor 2G · Supercargo 2H · Town Crier ungated · Innkeeper reworked — his vessel ages its own cask; re-probe: the negatives are gone, the outliers cooled) · **the pool stays 12 — RULED** (the designer accepts the pace; the “legible goals/arcs” remark recorded in the parking lot) · **dead ladings stripped at setup** (deck always 14-in-play) · the **AI pass** (aiSpecVal re-taught · GM quality-persona 2–3p only · Exchange damped). Gates: verify **186/186** · sim 500/count + PATHWAYS 200/lane **0 crashes** — pace 12.8/12.3/11.4 · Bergen 23–29% (no per-cask magnetism) · lanes near-fair. Beneath it **v4.6d “Longshore”** (KEY `hanse-v46d`; designer-ruled 2026-08-02): **the Stevedore loads 2 in EVERY load flow** (slot stop · maiden load · Load bonus; verify **180/180**), and the same-day **specialist value study** measured all 13 designs (probe + corpus, `archive/records/SPECIALIST-VALUE-STUDY.md`: Supercargo +29 / Grain Factor +23 the pricing outliers · Innkeeper negative even free · Town Crier −5 mid · openers decay on schedule · dials proposed, NOT ruled). Beneath it **v4.6c “Living Line”** (KEY `hanse-v46c`; designer-ruled 2026-08-02 off live play turn 8): **the line is read LIVE** — a hull commissioned/warped onto an active line slot mid-turn (or a building raised there) opens that slot’s stop this same activation; each stop still fires once (verify **176/176** · sim + GM spot crash-free). Beneath it **v4.6b “Every Shipper”** (KEY `hanse-v46b`; designer-ruled 2026-08-02 off live play): **the Bergen prize read CORRECTED** — the ship grants a specialist to **every house with a cask aboard, max ONE per house per ship** (the v4.5b “≤1 per SHIP, load order decides” was a misinterpretation; load order = pick order off the shrinking display; the designer’s line: *the destinations should grease the wheels — the guaranteed faucet when the display channels don’t show the right tiles*). Gates at v4.6b: verify **170/170** · sim 500/count + PATHWAYS 200/lane **0 crashes/0 deadlocks** — pace 2p 13.6 · 3p 12.5 · 4p 11.9 · lanes: **3p builder cooled 40.5 → 32.0** (near-flat) · **4p lifter recovered 19.5 → 26.0** (24/26/29.5/20.5; breadth 20.5 the standing mild cold) · **Bergen delivery share 25–28%** every count — the widened faucet does not double-magnetize (§9). Beneath it **v4.6 “Guildbook”** (KEY `hanse-v46`; designer-ruled 2026-08-02 off `archive/records/AGRICOLA-STUDY.md`): the specialist roster grows to **13 designs** (the 5 core drips at max(2,n−1) + **8 guild singles** — Guild Scholar recipes-free 2G · Innkeeper 4th-vessel (gate: 3 brewed) · Supercargo rival-sail freight · Chronicler end +1★/lading cap 5 (gate: a claim) · Alderman end +2★/kontor≥3 dice · Town Crier face-2 bumps (gate: 2 ports) · Chandler G↔H swap · Shipwright commissions-free; three print **seat-gates**, two print **end-game ★**), the building box prints **20 — setup deals 17** (+Victualling Yard ephemeral double-bonus · Merchants’ Exchange lading-cycle · Warping Capstan empty-hull warp), and **Guild ★** join end-scoring. Gates at v4.6 (light): verify **168/168** · sim 12 crash-free, every new system firing. Beneath it **v4.5b “Open Orders”** (KEY `hanse-v45h` — the 2026-08-01 letters: **v45h floor-covers-off** (all 3 vessels + both seats open from the start — the Flight keeps its ladder, sheds its unlock duty; a capacity loosener trial) · **v45g aging-required** (a Q3+ export never STARTS Ready — start caps at Q−1; the Cellarman-Broyhan ready-at-brew leak closed) · **v45f the master's hand** (the Guildmaster defaults to the designer's 'quality' persona — see AUTOMA.md) · **v45e the RECIPE TARIFF** (recipes cost **H = Q−2** at EVERY channel, the Bruges prize included — Broyhan/Keut 1H · Mumme 2H · **Bock 3H**: the rush the designer flagged as 'maybe the only true power strategy' now pays 6H before its first delivery) · v45c **Assay ±1** + lading-aware AI load options + verb-usage counters; **v45d the GWT-style POWER LADDER** (designer-ruled off the utilization read): the **Racking Hall swaps ANY two vessel dice UNCAPPED** at 3 G — the launder engine (rack an aged Bock’s 5 onto a Ready Gruit; pips only MOVE) · **fees print in GRAIN only** (grain buys infrastructure, hops power quality) · the **Hop Exchange is a slot-stop action** (pay ≤2H, vessel dice +1 each, past quality fine) · **Tollhouse +3★ instant** (net +2, any quality) · the **ABBEY CELLAR joins** (2 G; pay 3H — ALL maturing casks to Ready; replaces one Assay, deck stays 17); designer-ruled 2026-07-31 off gatekeeper review #2 + playtest #24; the record `archive/records/V45B-OPEN-ORDERS.md`): the #24 program — **the commission ★ mint is CUT** (a commission banks nothing; the hull + the v4.4 instant load are the reward) · **automatic aging is CUT** (dice turn only when something turns them; Cellar stays 3 ⚙) · **the DICE PASS** (building deck rebuilt: Racking Hall swap · Assay House ×2 ±1 · Hop Exchange pay-1H +1 · Tollhouse −1 for +2★ · Bonded Store +1 and sails away with its hull paying contributors 2 goods — the ephemeral trial; the Annex + 5 duplicate tiles out; 17 tiles, 8 touch a die) · **specialists at max(2, n−1) copies of 5 designs** (the **Braumeister** joins: ripest maturing cask +1 at your turn start; **Bergen grants ≤1 specialist per ship**) · **LADINGS** — the order layer (15 ⚙, row of 3: kontor + die-min/named-beer → 2–5★; a qualifying delivery claims one, one per cask, ★ bank at once; refill at END of turn — every kontor’s delivery value becomes a variable economy). Gates at v4.5b (FULL battery 2026-07-31): verify **118+** · sim 500/count 0 crashes (pace 2p 14.6 · 3p 14.0 · 4p 13.3 — the early '2p ~20+ rds' read was 3-game noise) · PATHWAYS 200/lane (3p builder hot 40.5 · 4p lifter 19.5 mildly cold) · flow-probe 600 clean · render-smoke ALL PASS · ladder every rung ≥60% (trader>jour ~58 pooled — the standing lint hover) · pool sweep: 12 fast-edged under greedy play, 13 holds the band best (designer dial call). Beneath it **v4.5 “Empty Tray”** (KEY `hanse-v45`; designer-ruled 2026-07-31 off human playtest #24): **the end trigger is the first EMPTY TRAY** (a house’s last die COMMITTED — parked or riding; the #24 stall of dice stuck aboard unfilled hulls is cured) and **the pool is 12** ⚙ (was 14 — speed). Gates at v4.5 (light): verify **95/95** · sim 30 crash-free (dice trigger 100%), pace read in §9. Beneath it: **v4.4 “Maiden Load”** (`KEY hanse-v44`; designer-ruled 2026-07-31): **the commission regains its free load** — pay 1 G, place the hull (★ = berths banked), then optionally **load ONE Ready cask from your own vessels** onto it at once (a normal load — gate read as boarded after lifts, the bonus fires; a Skute sails on it; commission + Skute = the old charter as pure components). v4.4c: the **specialist display refills at END of turn** (a take leaves a gap; ships/buildings refill at once). Gates at v4.4c (light per the standing rule): verify **93/93** · sim 9 crash-free. Beneath it: **v4.3 “Open Quay”** (`KEY hanse-v43`; designer-ruled 2026-07-26 — the third ruling off playtest #23): **the occupancy toll is CUT** (sharing a station costs nothing) and the greedy AI tiers are re-taught to the v4 economy. Gates at v4.3: verify 87/87 · sim/PATHWAYS/flow-probe 0 crashes · render-smoke ALL PASS · GM>trader 85.4% · CM>GM 54.2% pooled @ bulk budgets · trader>jour ~55% (watch). Beneath it: **v4.2 “Tariff”** (designer-ruled 2026-07-26 — the second ruling off playtest #23; same-day markups: Bock 1G2H · specialists −1G with Cellarman → 2H · ONE payment per placement): **the fee rides the ITEM** (every acquirable recipe/specialist/building prints its own wharf fee ⚙ — recipes 1H/1G/2H/**1G2H**, specialists 2H/1G/2H/1G, buildings free/1G/**2G**; never fee-on-fee — using a building charges nothing, and a paid fee COVERS the ground rent (one payment per placement); kontor prizes free) and **Novgorod pays the die +2★** (refine cut; 6–8★ deliveries — the premium path’s pull beyond the majority). Beneath it: **v4.1 “Counting House”** (designer-ruled 2026-07-26 off human playtest #23, the first v4 table: *“more intentional — keep the earned spread, price the shortcuts”*). Two changes on the v4.0 spine: **paid at the wharf, free at the kontor** (recipe/building/specialist gains via Scrivener’s Hall, the Hiring Post or the gain load-bonuses cost the 1 `G` wharf fee ⚙; kontor prizes stay free) and **the dice are the ONE clock** (the Sailed-Ships track cut — trigger and component; the 14th die parked sets the final round; `PRES_POOL` is THE pace dial; MAX_ROUND 25 backstop). Full v4.2b battery (designer-called, 2026-07-26): verify **83/83** · sim 1500 + PATHWAYS 600 + flow-probe 1500 — **0 crashes/0 deadlocks** · ladder GM>trader **91.7%** (44/48 sharded) · CM>GM **66.7%** pooled · render-smoke ALL PASS · **jt rung 52% — the greedy trader needs a fee-economy retune (AI-only, flagged)**; the flow probe’s reads live in §9/v4.2 and `playtests/flow-v42b.txt`. The v4.0 base: **v4.0 “Bright Beer”** (designer-ruled 2026-07-21 off `archive/records/V4-STREAMLINE.md`, from human playtesting). The streamline keystone: **THE DIE IS THE CASK** — set at brew to the printed start value (quality − aging steps; Gruit 0 steps = Ready at brew), turned up by age points (stops at quality = READY), lifted past quality only by buildings at load (Malt Kiln +1, cap 6), parked at the kontor on delivery (pips = the banked ★ 1–6, body = presence, majorities and the second clock). **NO DEPLOY** — slots hold a building and/or a ship; casks go vessel → hull → kontor; over-deploy/souring/rival-loading/the Staithe are gone with the state. **Stations print ONE action each** (Source 2 · Brew · Age 3 · Commission `1 G`, bank ★ = berth count). **ONE green building family** — every building serves whoever activates it, the builder banks +3★; the 12 Privileges, ownership and rent-to-owner are cut. **The Hall, Dispatch/charters, the Floor turn and all three expansion toggles are TABLED.** Ships come in three sizes (Skute 1 · Cog 2 · Hulk 3, display of 4) — a Skute sails on its first load (the relief valve as a component). Prizes: Bruges recipe · London building(+3★) · Bergen specialist · Novgorod refine (+2), gate raised to die 4. Clocks: sailed 7/10/13 ⚙ + the 14th die parked. Gates at KEY v40: `verify-v4` 71/71 · sim 450 (150×2–4p) **0 crashes/0 deadlocks**, band 91–95%, both clocks live (presence 11–18%), all four ports trafficked (Novgorod 15–18% at gate 4). |

---

## 2. Design pillars (the north star)

1. **The mechanic *is* the theme.** Hopped beer survives the voyage → it *is* the export cargo.
   Nothing is bolted on.
2. **The squeeze is the soul.** *You can't brew everything, and you can't deliver everywhere.*
   Choosing your beers and your destinations is the game.
3. **Crisp turns, deep decisions.** Medium weight: actions are simple; depth lives in placement,
   timing, routing, and interaction — not in turn length or rules mass.
4. **Interaction through a shared board, never take-that.** Occupancy and the living slots
   reshape everyone's options; pressure, never a hard-lock.
5. **Legible scoring.** A player can name how they're winning. Clarity is a feature.

## 3. Hard constraints (solved thematically, not worked around)

- **No dice** — fully deterministic; the managed-uncertainty seat is the *steerable* variance of
  the building/recipe displays and the cask-action draw (Orléans-lite), not randomness.
- **No cards-as-hand** — all cardlike content is tiles (the action system is on the board).
- **No money** — pre-modern barter: **goods (grain `G`, hops `H`) are the only currency;**
  reputation/standing is earned, unspendable score.

## 4. Theme & who you are

c. 1350, the Hanse at its height; Hamburg was literally *"the brewhouse of the Hanse."* The
pivotal innovation is **hopped beer**, which (unlike perishable gruit ale) survives a sea voyage
— a preservable, shippable export. You run a **merchant brewing house**: source grain & hops,
brew, age, and push casks across the Baltic/North-Sea network to the great trading posts
(**kontore** — Bruges · London · Bergen · Novgorod) for value and majorities, or withdraw your
finest into the local guild **Hall** for prestige. The deeper axis is **reach vs reputation**
(industrial Leffe vs Trappist Westvleteren), pulled back into the 14th century.

---

## 5. Design lineage & comps

The target depth and the lessons we steer by (the soul-review the designer ran early in v1.0):

| Comp | Its soul | What we take |
|---|---|---|
| **Lisboa** (Lacerda) | a relentless multi-use squeeze + system interlock | the **cask squeeze** as the soul; the **living slots** as the interlock |
| **Great Western Trail** (Pfister) | a player-built track; tempo; win by several engines | **owned buildings author the shared board**; the **five lanes** |
| **Orléans** (Stockhausen) | steerable variance (bag-building) | the **building/recipe displays + cask-action draw** as managed, not random, variance |
| **Agricola** (Rosenberg) | one rule → a whole decision economy; scarcity/blocking | scarce **vessels/slots/ships** + the **occupancy toll** + clogged-vessel back-pressure |
| **Wingspan** (Hargrave) | a compounding engine; a content spine; "one more turn" | **transform-buildings** + a **building deck** of content under one grammar |
| **Obsession / Viticulture / Unconscious Mind** | theme-mechanism fusion; an approachable bridge | hopped-beer-as-cargo + the **legible scoring spine** |

**Differentiation:** "monks/houses brew beer" is occupied (*Ora et Labora*). Our distinct
ground is the **economic philosophy** — reach-vs-reputation across a beer-trade network —
expressed through the **dual-role cask** and the **player-authored living slots**.

---

## 6. The current architecture (v4.0 “Bright Beer” spine · v4.5b “Open Orders” live)

Canonical detail in `RULES.md` / `COMPONENTS.md` / `archive/records/V4-STREAMLINE.md`; the shape:

- **The Wharf** — four stations ringed by 8 slots; move orthogonally, activate the **row or
  column**; sharing a station costs nothing (v4.3 — the toll is cut). **Stations print ONE action each:** Market *Source 2* ·
  Brewhouse *Brew* · Cellar *Age 3* · Harbor *Commission* (pay the Ship’s **printed fee —
  Skute 2 `G` · Cog 1 `G` · Hulk free**, v4.8 ⚙; place it on a
  shipless slot, then **one free load** — a Ready cask from your vessels may board the new
  hull at once, v4.4). **A commission banks NO ★ (v4.5b)** — tempo, not points. **Aging is
  never automatic (v4.5b):** a die turns only when something turns it (Cellar 3 · Mission
  Quay · Age bonuses · Assay · Racking · Cellarman start · Braumeister tick).
- **THE DIE IS THE CASK** — the whole lifecycle on one component: printed start value at brew
  (= quality − aging steps; Gruit starts Ready), age points turn it up, **Ready at the
  quality**, building lifts push past it (cap 6), **gates read the die as it boards**, delivery
  parks it at the kontor — pips = the banked ★, body = presence, majorities and the clock.
- **Slots hold a building and/or a ship — never casks.** A slot stop = the building’s printed
  action and/or a **load of the ship** docked there (one Ready cask from YOUR vessels; its
  printed **load bonus** fires as it boards). Casks are private until aboard — the interaction
  is the **berth race**: topping off a hull sails everyone’s cargo on your clock.
- **ONE green building family** — nobody owns the use: every building serves whoever
  activates it; the builder **stands a quality die on the tile at face 1 (v4.9)** — every
  use turns it up (cap 6), the pips score at game end. **The box prints 20 ⚙ — setup deals 17 (v4.6; ≥1 Kiln + ≥1 Mission
  Quay guaranteed): every wharf a different economy. The v4.5b dice pass + the v45d power
  ladder: 9 die-touching designs; fees print in grain only — hops pay for USING the power
  tiles. The event family is TWO (Bonded Store · Victualling Yard — both sail away); the
  Merchants’ Exchange steers the lading row; the Warping Capstan moves empty hulls.** Action buildings
  print verbs (Granary/Scrivener’s/Mission Quay/Hiring Post/Almoner’s + **Racking Hall**
  swap-ANY-two-uncapped 3G, the launder engine (v45d) · **Assay House** die ±1 · **Abbey
  Cellar** pay-3H-all-maturing-to-Ready (v45d) · **Hop Exchange** pay-≤2H vessel-dice +1 each,
  past quality fine (v45d)); load-lift buildings shape the boarding die / the
  hull (Malt Kiln +1 · **Tollhouse** −1 for +3★ instant · **Bonded
  Store** +1 and SAILS AWAY with its hull paying contributors 2 goods — the ephemeral trial ·
  Cooperage +1 berth · Customs −1 gate · Rich Berth sails short). Faucets: London’s prize +
  the *Gain 1 building* bonus — never bought. Overbuild for ONE payment; displaced tile boxed.
- **Everything is earned, not bought** — recipes (Bruges · bonuses · Scrivener’s), buildings
  (London · bonuses), specialists (Bergen — **per cask, the uniform prize grammar**, v4.7 ·
  Hiring Post ·
  bonuses; **13 designs, v4.6** — the 5 core drips at max(2, n−1) copies + the 8 **guild
  singles**, three behind printed **seat-gates** (flipped cards · claimed tiles · parked
  dice) and two carrying **end-game ★** lines; 2 seats — the squeeze is picking two of what
  THIS game shows). The
  Market sells nothing; goods buy brews, commissions and rent — **and (v4.2) every
  acquirable item prints its own wharf fee**, paid via the wharf channels, waived as a kontor
  prize (never a fee to USE a building; the Scholar and Shipwright waive their verbs’ costs
  outright — v4.6).
- **The player board** — 3 vessel slots + 2 specialist seats, **all open from the start**
  (v45h — the covers are off for now); the recipe cards carry the Flight (flipped = brewed).
- **LADINGS — the order row (v4.5b):** a face-up row of 3 kontor orders (die-min or named
  beer → printed 2–5★); a qualifying delivery **claims one** (one per cask, ★ bank at once);
  the row refills at END of turn. The row makes every kontor’s delivery value a **variable
  economy** — the mid-game arc the #24 table missed.
- **Legible scoring** — deliveries (the parked dice, 1–6★ each; **Novgorod +2★ per die**, v4.2) + the bank
  (**lading ★** · Tollhouse stamps · 1★ bumps · departing buildings’ dice — commissions and
  builds bank NOTHING in play, v4.5b/v4.9) + **the mason’s marks** (each die standing on your
  buildings scores its pips — v4.9) + majorities
  (parked dice; 4/2/0 · 5/3/1 · 9/5/2 · 8/5/2) + the Flight ((brewed−1)², min 3) + **Guild ★**
  (v4.6 — the Chronicler/Alderman print end-game lines; audit = tiles at seat + dice on mats).
  Tiebreak: vessel dice, then goods.
- **The clock (v4.5) — the quality dice alone:** the first **EMPTY TRAY** (a player’s last die
  committed — parked, in a vessel, aboard an unfilled hull, or standing on a building) sets the
  final round; dice never return, so the runway is public and countable (**13** ⚙ — v4.9b, the
  13th funds the marks; `PRES_POOL` = THE pace dial); MAX_ROUND 25 backstop. Sails end nothing.
- **TABLED (seams kept):** the Hall (prestige lane), Dispatch/charters, the Floor turn, the
  three expansion toggles (`registerExpansion` spine intact), the MC AI tiers (P5).

## 7. The tooling (how we verify — unchanged through v1.0)

- **`playtests/sim.js`** — drives the *canonical* `play.html` engine headlessly (extract the
  script, run in a `vm`, append a bot in-scope). The **robustness/pace gate**: 0 crashes / 0
  deadlocks across 2–4p, pace in the 12–25-round band. `PERSONAS=1` / `CELLAR=N` commit bots to
  the lanes (the **strategy** oracle — the greedy bot can't judge leans). `sim-analyze.js` =
  openings/timing/sequencing.
- **AI seats** (`AUTOMA.md`): Apprentice / Journeyman / Trader / **Guildmaster** (flat Monte
  Carlo, fast oracle) / **Cellarmaster** (v1.2 — deep Monte Carlo: competent trader+completion-biased
  rollout, determinized decks, sequential halving; beats the GM ~62%). Gates: `ai-ladder.js` (every higher
  tier ≥60% at 2p; the GM & Cellarmaster rungs **sharded**) + `ai-render-smoke.js`. `ai-tune.js` (CEM over
  the Trader weights) re-runs after a balance pass.
- **After any engine change:** bump the save `KEY`, run the gates, save the sim output, publish
  to `main`. *(The harnesses drive the live `play.html` engine — they extract its `<script>` and
  run it in a Node `vm`, so they track the current build.)*

---

## 8. Balance lessons carried forward (the distilled gold)

Hard-won across v0.9→v0.16; they constrain every future change:

- **"No pure path wins."** Balance the *leans*, and measure them with **persona-committed bots**
  (`PERSONAS`/`CELLAR`), never the greedy bot — which is a robustness/pace oracle only and
  systematically under-pilots prestige & deep.
- **Correct *friction* with a *structure* lever, not the *value* lever.** (v0.15: a free local
  Enshrine was fixed by a *structural* throttle — deploy-first, contestable — not a fee.)
- **Bock *total* cost is the WRONG lever for the deep-lane imbalance.** The 3G3H probe (raising the
  TOTAL to 6) was tested and rejected twice (it re-breaks Q5 reachability and the AI ladder, and
  doesn't fix the imbalance). The real axis for that is **Hall-side vs kontore-side.** *(v1.6 nuance:
  shifting Bock's **ratio** while holding the total — 3G2H → **2G3H** — is a different, safe move; it
  was done to give **hops** a demand, not to retune the deep lane, and sim confirmed Q5 timing & the
  ladder held. The lesson stands: don't raise the **total**.)*
- **Majorities reward shipping WIDE** (presence = cask count) — "go for majorities" is a *volume*
  play, not a concentrate-on-one specialist. Big majorities tilt the game to the kontore, so the
  **Hall needs a matching prestige curve** to stay balanced.
- **When the incentive is backwards, find the rule that inverted it** — don't pile on relief
  valves. (v0.16: three patches collapsed into one loop once benefit went back to delivery.)
- **A "sail full" rule structurally lengthens the game;** the clock (`SAILED_CAP`) is the
  round-count lever, not the ship rules.
- **Fixed turn order has a real first-player edge;** **free opening placement** + P1's natural
  turn-1 edge flatten it. (v1.7 REMOVED the +1 `G`/later-seat compensation — it over-corrected under strong play.)
- **Content, not rules.** Depth belongs in placement/timing/interaction and a deck of content
  under one grammar — not in action complexity (the v0.7 reel-in is the founding lesson).
- **The pole test (designer, v2.9): a lane may run HOT; the failure is NEGATION.** The game walks
  fine lines between its poles — the Floor vs the wharf lines, and the Hall vs the kontore vs the
  charters. A hot lane (e.g. prestige in the v93 PATHWAYS read) is acceptable; rebalance only when
  one pole *negates the value* of another (nobody sane picks the other side). Measure with
  persona/CELLAR runs, judge by the negation test, not by win-rate deltas alone.

---

## 9. Change log (compact — full rationale in `archive/v0.16/DESIGN.md`)

### n2 net-shim — the MC sim fence (2026-08-09, off the first live 3p platform table; KEY `hanse-v412bn2`, NO game change)
The GM/CM's `aiMCDecide` swaps the global `S` for playout clones (every clone seat a rollout
bot) and drives the same action functions net.js wraps — so under `?net=1` every playout step
fired the shim's commit: table UKZ3SA published **8,153** imagined states, every seat became
`ai:trader`, and the humans were locked out of their own game. Fix: net.js is **inert while
`HANSE.aiSimulating` is up** (wrappers pass through, `commit()` refuses); every INIT carries
the platform's `aiSeats` and **`p.ai` is re-stamped from that seat map** on every apply and
before every publish (contamination self-heals); a hidden tab stops *initiating* bot turns
(the watchdog takeover stops racing a throttled host); COMMIT carries `diag{seat,runner}`.
`net-probe` gains **S9** (the fence regression — pre-fix one GM turn = 464 commits, post-fix 2).
Gates: verify 228/228 · sim 3 clean · net-probe S1–S9 + browser smoke ALL PASS.

### 2026-08-09 — the surface-reconciliation pass (no rules change, no KEY bump)
A session-start read of the full canon caught the components lagging three ruled letters.
**The real one: the printed Novgorod minimum was still `4+`.** v4.10 returned the gate to
**3+** and every rules surface followed — but `components.js`'s `SHIP_DEST` and `print.html`'s
`DESTS` kept `req:4`, so **every Novgorod Ship tile's trigger berth and the Destinations
board's Novgorod panel printed a minimum the engine does not enforce** (and the kit's own
manifest, two sheets away, already read 3+). Corrected on both. With it: the Market & Stores
Ships shelf and the manifest's Wharf row still quoted the **flat 1 G commission** (per-hull
2/1/0 since v4.8); the manifest header still read v4.9; `learn.html`'s quick reference still
paid London **+3★** (the mint left at v4.9); `COMPONENTS.md` §8 still printed the recipe fee
as **`H` = Q−2** (Q−3 since v4.9c) and pointed at v4.9d as live; `DESIGN.md`'s own header and
§10 glossary still had the +3★ builder, a **brewed** Flight and a 12-die pool. All aligned.
The v4.10 reprint note is now recorded in `COMPONENTS.md` (it had none — which is why the
tile never got reprinted; **every ruling that touches a printed face wants its COMPONENTS
note, or the kit silently drifts**). Print-face and doc only: the engine is untouched, so no
`KEY` bump (an in-progress game survives). Gates: verify **228/228** · sim 3 clean.

*Same day, designer-ruled — **the rulebook's icons print BIG**:* on `index.html`, wherever the
kit's **art** exists the icon **drops its chip entirely** (the circle in the §5/§8/§14/§16
tables, the dark plate in the §6 die lifecycle) and renders at **40–42px** (30px in the §15
glossary cards) — *“right now they are nothing more than a blob of coloured pixels.”* Only the
**lucide line-glyph fallbacks** keep a chip, because a 1.9px stroke needs one to read: the six
with no art (Move · Choose a line · Resolve · Majority · the Flight · the clock) and the
**grain/hops colour glyphs the components themselves print** (unmapped by the 2026-08-03 art
ruling — at cost-chip size the art muddies, so the Icon Key showing the glyph is *correct*).
The chip is sized to the art's footprint so the icon column still lines up. Inline icons stay at
1 em (they are words in a sentence) and the **§18 tile previews are untouched** — those are the
real printed faces at preview scale. `:has()` carries the branch, so it follows the art map
automatically as icons land.

### 2026-08-09 — the rulebook goes VISUAL (presentation, no rules change)
Designer: *“make the rules a little more visual — diagrams where it makes sense, using the
icon images, components, and visuals like lines, arrows… loading is a block of text.”*
Three of `index.html`’s heaviest paragraphs become **pictures built from the real printed
components** — `components.js` is the same library `print.html` cuts from, so the rulebook
shows a player the exact pieces on their table, not an illustration of them:
**(1) LOADING** (§8) — the Ready cask tile, the player’s die **sitting on its printed seat**
→ a bold arrow carrying the rule (*the die is read as it boards*) → the Cog tile with its
berths; the slot’s modifiers (Kiln/Bonded +1 · Customs −1 · Tollhouse −1 for +3★) ride as
chips beneath. **(2) SAILING & DELIVERY** (§8) — a loaded Cog (cask tiles seated on its real
berths, dice up) → *it sails* → the Kontor plate with the parked die; the three delivery
outcomes become numbered steps. **(3) THE MASON’S MARK** (§7) — the Kiln tile printed → *you
build it* → the die standing on it at the printed face → *every use, any player* → the die at
5, scoring its pips. **The visual language is fixed** so it can be extended cheaply: piece →
arrow → piece, the rule ON the arrow, modifiers as chips, outcomes numbered — a `.dgm` block
and a six-function builder (`cmp` · `seat` · `arr` · `piece` · `chip` · `step`). Section
headings that carry a diagram take their icon at 34px. *Not yet done:* `learn.html` still
teaches in prose — the same kit would serve it, and the Wharf/turn and the die lifecycle are
the obvious next two.

### v4.12b “Light Wharfage” (2026-08-09, same day — designer-ruled off the BUILDING-POWER-STUDY)
The Cooperage wharfage eases **+2★ → +1★** per cask loaded at its slot. The study’s top
flag (the only design stacking a direct mint + a top-tier mark + an above-bar builder win,
GM-sharpened to +11.8pp); capacity, the tick and the mark stand — only the mint halves.
The long-tail buff proposals (Rich Berth · Customs · Capstan · Hiring Post · Tollhouse)
are recorded in the study §8 — proposed, not ruled. Lesson applied again: the value dial
turns on the reward channel players already race; the tail’s cures are structure dials.

### v4.12 “Open Brewhouse” (2026-08-09 — designer-ruled: the buildings & specialists review)
One batch, four moves, off the designer’s tile-by-tile letter. **(1) Brew joins the Q3+
load-bonus pool** (*“brew is a true throttle”*) — survey/hire/brew all gate at Q3+; the
print mix gives each Q3+ beer exactly ONE brew tile of six. **(2) The presence fee scopes
to the Almoner’s Stall alone** — the cask-action bump and Keut’s perk are free again
(v4.11 partially unwound; the 300/count re-read holds pace at 13.3/13.0/12.3, band
70/72/62% — the pace watch moves to the live table). **(3) The roster pass:** the v45g
never-starts-Ready cap REPEALED (the Cellarman’s Broyhan starts Ready — *“that is what
makes this specialist powerful”*) · Braumeister/Scholar/Shipwright rewordings · the
Innkeeper reworked (3+ casks brewing at once → age one +1 at turn start; the 4th-vessel
rig and the gate cut) · the Chronicler +3★/Contract uncapped+ungated · the Town Crier +2★
per placed die (face-2 parks retire; the ⚙ dial is his bonus — 3★ floated). **(4) The
building pass:** Assay pays 1 `H` for one-cask-to-Ready · the Cooperage adds +2★ per load
· the Exchange replaces up to 3 Contracts · the Capstan warps any docked Ship (full where
it lands → it sails). Lesson applied: reward channels players already want (Contracts,
presence-as-strategy) get VALUE dials; reach problems keep STRUCTURE dials.

### v4.11 “Factor’s Fee” (2026-08-08 — designer-ruled off the three-playtest set)
**Placing presence costs 2 G per die; the pool stays 13.** Three live 3p games (16 · 8 ·
10 rounds) exposed the free bump as the racer’s unpriced clock lever — bumps and rounds
moved almost 1:1 (3 bumps → 16 rds · 7 → 10 · 8 → 8; the 8-round game was the Almoner’s
Stall converting every right-column activation into a free die-commit). The four-way probe
(300/count: base · pool-14 · bump-2G · both): the fee alone lifts pace 12.9/12.1/11.9 →
**14.8/14.3/13.8** (band 53–66% → 82–88%) and voyages RISE — the length is real play; the
14th die measured +1.1 rounds and was **declined** (“far too long” risk). The fee prices
the exploit instead of widening everyone’s runway — the racer can still race, but pays
tempo. One grammar at every channel (reach bonus · Almoner · Keut’s perk · Crier’d parks),
printed as the pay-verb: *2G → +1 presence*. Watches: the Town Crier (2★ per 2G park,
relatively stronger) · the Almoner’s start-1 mark ticks slower · Chandler’s G↔H swap
gains a job · the first human win of the series (10-rd, the full 5-beer Flight + zero
buildings) says the breadth lane is live.

### v4.10 “Eastern Gate” (2026-08-06 — designer-ruled off playtest #32 + the three-way probe)
**The Novgorod gate returns to die 3+ (the export band); the +2★ premium holds (5–8★).**
Playtest #32 re-framed the port: not dead but a STRAND port — the 4+ gate was where the
clock race bit (one delivery, one abandoned half-Cog, ~14★ of the table's quality cargo
stranded). The deciding A/B/C (port-probe, 300/count: base · gate-3 · premium-+3): **the
gate halves the dead-port at every count** (2p 61.9→33.2 · 3p 30.3→11.9 · 4p 11.6→5.5%
Bock-dealt), lifts delivery share to 16.5–20.8% (healthy — 25% would be even-split) and
cuts slot-stranded hulls ~40%; **the +3★ arm was a null** — share and dead-rate flat. The
v0.15 lesson re-confirmed: the bottleneck was reachability under the clock — a structure
problem — not reward size. The gate now coincides with the band the grammar already draws
(v45g: every Q3+ beer ages before it ships): *Novgorod takes export-grade beer.* New
interplay: a Kiln’d Hopped (die 3) makes the run; a Kiln’d Gruit (die 2) still cannot.
Residual: the 2p dead rate (~33%) — the fourth-Kontor-at-two thread (RULES Open #8).

### v4.9d “Loaded Flight” (2026-08-04 — designer-ruled off the #30 board talk)
**The Flight qualifies on LOAD, not brew** — the designer: *“the recipe cards sit on the
left side until they are loaded on a ship, then moved to the right side of the board showing
they are completed. This is a bug in our current implementation.”* The record is now
`p.shipped` (set on a beer’s first `loadCommit`); the Innkeeper’s `flight3` gate reads the
same record (printed line → *3 distinct beers shipped*); the warm Gruit counts when it
ships; the AI’s new-style margins re-point at unshipped styles and the first load of a
style learns the Flight step. **The player board enters the app** — the print anatomy,
live: recipe cards COLLECTED (left column) → COMPLETED (right column, the Flight read off
the board), vessels + specialist seats as printed wells seating the real tiles, stats in
the bottom corners. *Refined same-day to the designer's sketch — the LITERAL board:* the
print component itself (7.65×3.85″, one shared `components.js playerBoard` generator for
the print sheet AND the app) now prints the ★ score seat, the dice/grain/hops supply
ledge, the **Flight ladder** (beers shipped 1–5 → 0/0/4/9/16★) and a **Contracts pile
zone**; the app seats the real tiles in its wells at true size (a 2.4×1″ cask tile in a
2.4×1″ well) and the recipe cards splay BESIDE the board — collected left, completed right,
bottom bars only, placeholders printed on both sides. This is the legibility fix the
#29/#30 read priced (~55% of a winner’s total was off-track; the Flight’s 16★ the largest
invisible mass — now a printed ladder and a pile of checked cards). The brew piles render
the current single-faced tile (the old aging-side display retired). *Watch ⚙: the Flight tightens (ship, not brew — strand a beer in a vessel
and it scores nothing); pace/totals re-read in the next battery.*

### v4.9c “Light Tariff” (2026-08-04 — designer-ruled off playtests #29/#30 + the probes)
The designer: *“I don’t think novogrod is structurally dead, but i think it is tough if
bock isn’t in the game to justify the cost of brewing there. Maybe we adjust costs for
recipes — keut/broyhan free, mumme 1H and bock 2H.”* **The formula drops to `H` = Q−3**
(the v45e grammar — hops only, every channel, Bruges included — stands; the Scholar still
waives). The measured backdrop: recipe channel blocked 11–19 turns/game · hops binding
(8–23% of players end at 0 `H`; the Abbey ~never fires) · Novgorod undelivered 71/33/23%
by count · #30 bought Mumme at 2 `H` only on its final round. *A/B (port probe 300/count,
v4.9b → v4.9c):* recipe-channel blockage **11.0/14.1/18.8 → 2.8/1.4/2.2** turns/game ·
Bock’s brew share **3.6/7.0/8.4% → 8.2/13.8/13.0%** (≈ its untaxed rate) · Novgorod
dead-port **2p 73→54% · 3p 38/19 → 23/17 · 4p 23/25 → 20/5%** (Bock-dealt/no-Bock) · end
hops rise, H0-players fall (22.6→15.8% at 2p). The 2p port stays the cold spot ⚙; the Bock
rush and the Scholar’s 2 `G` price are the standing watches.

### v4.9b “Cornerstones” (2026-08-04 — designer-ruled off the table talk on the unplayed v4.9)
The table’s read affirmed the mark’s direction — *“capturing that benefit incentivizes
placing better buildings AND the table benefits; you want the best building to get the most
out of it”* — and ruled three balance moves. **(1) PRINTED START FACES** ⚙: the mark starts
at the tile’s printed face — busy free utilities **1** (Granary · Mission Quay · Almoner’s ·
Assay) · paid workhorses **2** (Scrivener’s · Hiring Post · Malt Kiln · Hop Exchange ·
Merchants’ Exchange) · ship-riders, ephemerals and rare powers **3** (Cooperage · Customs ·
Rich Berth · Tollhouse · Racking · Abbey · Bonded · Victualling · Capstan) — the designer’s
two axes: *“ones that require ships to sail start higher”* (tick-rarity) and *“the cost to
place should still factor in”* (the fee is part of the deal). The tile prints the face (a
die glyph beside the fee chip — the cask start-value grammar). **(2) THE POOL IS 13** ⚙ —
*“maybe it allows us to add one die to each player’s supply”*: the 13th die funds the mark
economy (the v4.9 A/B ran ~2 rounds under the band; the isolation sweep confirms the start
faces alone don’t buy the pace back — the die does). **(3) THE BUILD PRIZE FORFEITS when
untakeable** — the 2-goods fallback is CUT on the London/build path (*“I don’t want an
alternate gain goods if you can’t do the action — that is a game action itself”*). Scope
flag ⚙: the Bruges (unaffordable recipe) and Bergen (no seat) consolations were ruled at
v4.7 and STAND; if the principle is general, say so and the grammar unifies on forfeit.
*Battery (n=300/count + POOL=12 isolation 150/count + PATHWAYS 100/lane — 0 crashes/0
deadlocks):* pace **12.0/11.3/11.2** (v4.9: 10.9/10.6/10.0; v4.8: 12.8/12.1/11.6 — the
13th die buys ~+1 round; band 42–52%, still fast-edged under greedy racers) · winner totals
**48.5/55.0/55.3** (most of the mint’s value returns, now traffic-shaped) · **marks end at
5.2/5.5/5.1 pips/player** (v4.9: 2.8–3.4) · builds/game up ~10% · deliveries recover to
6.2/5.9/5.9 · lanes **DEAD FLAT** (2p 51/49 · 3p 34/33/33 · 4p 27/27/24/22 — the healthiest
oracle read on record). verify **207/207** (start-face battery + the forfeit + pool 13; a
latent intermittent in the Bruges-prize check — the Guild Scholar’s waiver — cured).
*Parking lot (recorded, NOT built):* **rethink the building roster** with the mark economy
in mind — and the designer’s seed: *“the one-time use (sails with the boat) could be a lane
for players to be the real-estate tycoon”* — the ephemerals (Bonded · Victualling) already
churn (start 3 → tick on loads → sail away → score + die back); a deeper ephemeral family
is the candidate expansion of that lane. *Watches ⚙:* the 2p tick drought stands (≈3
ticks/game) · greedy racers under-read human pace (the band read is their floor, not the
table’s) · the Racking/Capstan marks start 3 but tick ~0.1–0.3/game — if a tile’s mark is
its whole pull, it may want a start-4 tier or a roster cut (the rethink).
*Strategy study (same day — the full oracle battery + the two-systems read the designer
asked for; `archive/records/STRATEGY-STUDY-v49b.md`, instrument `playtests/strategy-probe.js`):*
sim 500/count + PATHWAYS 200/lane + ladder + smoke ALL CLEAN — builder lane healthy-not-hot
(3p 32.5 · 4p 27.5). **Buildings are load-bearing**: a NOBUILD ablation seat wins ≈half
baseline (the ~6★ mark hole; deliveries identical) — 83–85% of builds arrive as the London
prize; winners build ~2.0 vs the field’s ~1.5; the Kiln is the tick king (2.5–2.9/build);
the start-3 power tier sits as static ~3★ annuities (traffic, not face, is the
roster-rethink lever); the self-tick share falls 50%→24% from 2p→4p (the table funds the
mark, as intended — and the 2p drought is structural). **Specialists are texture + skill
headroom**: a NOSPEC ablation seat loses ≈nothing under greedy play (the Bergen 2-goods
consolation covers the channel) while the free-grant ceilings (SPECIALIST-VALUE-STUDY) stay
strongly positive — the gap is the human game; behaviour shifts are real (Braumeister
holders make ~1.5 fewer Age visits — the drip substitutes; Grain Factor/Hop Gardener
compress sourcing rather than inflate stock; Stevedore lifts loads/deliveries; Alderman is
the sleeper at +5.6Δ/3p; Chandler reads weak; Innkeeper still needs human hands).
Overbuild-as-die-denial: **unobserved in 1,200 bot games** — a live-table watch, not a
cleared one. *The Guildmaster oracle* (2p×24 + 3p×48 @ 120ms — directional) separates
search play from the racers: it runs **18.5–21.9 rounds** (the pace-under-read confirmed —
the 12–25 band holds both), builds **more and late** (44–53% of builds in the final
quarter: the mark as endgame annuity), **pays** the Hiring-Post channel for 24–33% of its
seats, and **revives Racking** (1.3 ticks/build, self-worked) — narrowing the true dead
shelf to **Tollhouse · Cooperage · Customs · Rich Berth** at every strength; Alderman
confirms at all tiers, Supercargo turns +11.9 at 3p, Braumeister inverts negative in long
games.
*UI/component pass (same day, designer-ruled off live play):* **(1)** the cask die renders
as **the player’s die** — solid colour body, white pips — wherever it lives (aging in a
vessel · loaded aboard a hull · the mason’s die on a building); the thin colour ring read
as a neutral die at table scale. **(2)** **Every Ship tile cuts the same 2.5×3″ blank**
(the Hulk footprint; berth counts unchanged — a Skute prints 1 well, a Cog 2, the space
below is port art) on `print.html` AND `play.html` — one die-cut, and hull size reads from
the berth wells, not the tile edge. **(3)** the mason’s die moves to the tile’s
**bottom-right** corner (it sat on the action line’s icon at bottom-left).

### v4.9 “Mason’s Mark” (2026-08-04 — designer-ruled mid-playtest · A TRIAL)
The designer’s ask, verbatim in spirit: *when I build a building, I don’t gain 3 points —
I place a die on it; any player’s activation increases it; its value scores at game end.*
**The build mint becomes a die investment.** The builder stands **one of their 12 quality
dice** on the tile at **face 1**; each USE of the building — any player: its action
resolved, or its lift/shaper effect actually serving a load or sail (Tollhouse only when
stamped · Customs only on a below-minimum board · Cooperage when the extra berth fills ·
Rich Berth on the short sail) — turns the die **+1 (cap 6)**; **the pips score at game
end**. The die is **committed** (the empty-tray clock counts it; **no tray die → no
build** — an untakeable London prize falls to the printed 2-goods consolation) and returns
to the tray — **its pips scored at once** — only when the building leaves play (overbuilt,
or an ephemeral sails away). Setup’s neutral deals carry no die. *Why it sings:* the die
is already the game’s one component-grammar — cask, presence, clock — and the mark adds
the fourth verse: **the builder finally cares that RIVALS use the building** (the “why
build for everyone?” question gets a better answer than a flat mint: author the corner
everyone needs, and their traffic pays you); building now **competes with brewing for the
same runway** (a real portfolio choice on 12 dice); late builds decay naturally (no more
round-12 +3★ mints); ownership returns to the wharf **visually** (a colour die standing
on the tile) without owner-pays rules. *Implementer’s fills flagged for the designer:*
tray-sourced + committed · start 1 / cap 6 · leave-play = score-now + die-back ·
no-die-no-build · the per-kind “use” readings above. *Engine:* `S.buildings[slot]` grows
`{owner, die}` (setup deals stay bare) · `bldgTick`/`bldgDepart` · `diceInFlight` counts
standing marks · `scorePlayer` gains `bldg` · the survey/London channels gate on tray
dice · greedy survey value re-taught (2.4 base, hard late decay; the MC tiers price it
through `scorePlayer` for free) · the mark renders as an owner-colour die standing on the
tile (`pBldgFace`). *Gates:* verify **204/204** (the mark battery: place-at-1 ·
rival-tick · owner-tick · cap 6 · end pips · kiln-lift tick · ephemeral score-and-return ·
no-die-no-build + London consolation · neutral-deals-bare · last-die-build triggers the
end) · A/B vs the v4.8 corpus in §9-adjacent report (n=300/count, 0 crashes) · aid fit ·
render smoke ALL PASS. *Watches ⚙ (RULES §Open #4):* build-rate collapse vs sleeper-line
(greedy tiers under-read engine investments — MC/persona/human reads govern) · the
die-vs-runway squeeze · overbuild as die-denial · the 2p tick drought (fewer rivals =
slower marks).

### v4.8 “Harbor Rates” (2026-08-04 — designer-ruled mid-playtest)
The designer’s ruling, verbatim in spirit: *ship costs should be 2/1/0 grain for a 1/2/3
berth.* The flat 1 `G` commission becomes a **per-hull fee printed on the trigger berth**
— **Skute 2 `G` · Cog 1 `G` · Hulk chipless (free)**. The price is **dispatch speed, not
tonnage**: the Skute is the instant charter (one cask sails NOW — the relief valve turns
dear), the free Hulk is pure tonnage that demands the berth race before anything moves.
The Shipwright (1 `H`) now waives 0–2 `G` by hull — his ceiling rises, his floor drops
(AI value left at the v4.7 teach; flag for the next specialist probe). *Engine:*
`COMMISSION_COST` keys by hull · `commCostFor(p,ship)` · `commAffordable()` gates the
Harbor (a free Hulk holds it open at 0 goods — the relief function is structurally
protected) · greedy/MC hull picks skip unaffordable hulls and net the printed fee.
*Gates:* verify **192/192** (the schedule battery: hulk-free · skute-2G · cog-1G ·
unaffordable-unpickable · harbor-open-at-0-goods · Shipwright-waives-2G) · **A/B sim,
n=300/count each side (1,800 games + 300 PATHWAYS), 0 crashes/0 deadlocks**:
commissions/game 6.8/9.6/12.4 → **5.5/7.9/10.5** (2/3/4p — the never-filled-hull flood
thins ~15–20%) while **voyages sailed hold flat** (5.5/8.2/10.8) and deliveries tick UP —
same cargo on fewer hulls; **commission grain roughly halves** (6.2/8.6/11.4 →
2.6/4.2/6.6/game — the freed grain shows up as +0.2–0.3 brews/player, more Kiln fees paid,
winner totals +1–2★); pace ±0.3 rounds, band inches up at every count; delivery split
stable (Bergen 25–28 holds, Novgorod ~10–12 holds); hull mix tilts to Hulks (share of
commissions 37–41% → 39–47%), Cogs take the biggest cut, Skutes thin from an already-low
greedy base. *PATHWAYS spot (100/lane):* 2p 50/50 · 3p 36/32/32 near-flat · **4p builder
43% / breadth 12% — the WATCH** ⚙: free Hulks are line-author fuel (Kiln lifts 7.2 →
9.5/game at 4p corroborates); half-size oracle, so **recorded, not dialed** — a full
200/lane + persona-duel read before any tune (pole test governs: hot is fine, negation is
the failure). *Table watches ⚙:* the Skute at 2 `G` as the HUMAN panic valve (bots barely
charter; a clogged goods-poor human now pays a Source action’s worth for relief) · free
Hulk + maiden load as a 0-cost cask outlet (self-limiting — the aboard die commits toward
your own clock) · Shipwright feel at 1 `H`. *(components.js prints the fee on the ship
tile — chipless Hulk; sim.js gains a commissions-by-hull counter; the A/B corpora:
`playtests/sim-results-v47a-shipcost-before.txt` · `sim-results-v48-shipcost-after.txt`.)*

### v4.7a “Six Piles” (2026-08-03 — off the rulebook editorial review)
The editor’s rubric pass (graded 76/100) surfaced one real rules hole: the cask-pile
procedure was never written, and the engine’s one-face-up-bonus-per-QUALITY-tier could not
be performed at a table for the two Q3 beers. Ruled: **the cask supply is six face-up
piles, one per beer** — a brew takes that beer’s top tile, the printed bonus rides, every
top is public (`pileTop` keys by beer; KEY `hanse-v47a`; verify 186/186). The same pass
made the rulebook explicit where it was silent — the **bonus-after-sail** timing line (and
Example 2 now shows the deferred beat), the **deck-guarantee swap procedure**, goods
**overflow is lost**, dry decks **shrink their displays**, Ships return to the deck
**bottom** — plus a first-game variant (guild singles out), a live-line example, the
em-dash/jargon prose pass over §§4–8, and the last three term residues (market→display,
placed→built, the Cellarman “lift”→“higher start”).

### 2026-08-03 — the Term Registry pass (language, not rules)
The fifteen-item terminology review, designer-ruled: **player** (~~house~~) · **Kontor /
Kontore** locked (~~port~~, ~~destination~~ banned — "destination" reserved for a future
category of delivery sites) · the board is the **Destinations board** and it carries the
**Contract row** (~~lading~~ → **Contract**; the pick was delegated — chosen for table
familiarity and no collision with *load order*) · the die is the **cask quality die**
(~~tally die~~) · the building verb is **build** (~~raise~~/~~place~~; the load bonus reads
*Build 1 building*) · **★ as the glyph everywhere** (no "points"/"stars" text; **Age N**
replaces ~~age points~~) · **printed action** (~~verb~~) · the turn step is **resolve the
line** ("stop" leaves player copy) · **aging** (~~maturing~~) · **supply / display**
(~~pool~~). Registry frozen in `STYLE.md` §1–§4. Applied across `index.html` ·
`learn.html` · `play.html` · `print.html` · `components.js` and the normative text of
`RULES.md` / `COMPONENTS.md` (version-letter quotes keep their period wording). The
`index.html` rulebook is re-cut as a pure SNAPSHOT — no version tags, no change history,
the "Tabled" section dropped (18 sections; the Tile Reference is §18). The print kit moves
the Contract row onto the Destinations board. Language only — no rules change, no KEY bump.

### Parking lot — recorded for future discussion (NOT yet decided)
- **LEGIBLE GOALS & STRATEGIC ARCS (2026-08-02, the designer's own words at the pool
  ruling):** *"Without legible goals or strategic arcs in the game, it can feel
  repetitive."* The pool stayed 12 for pace — but the remark names the real thread: what a
  player CHASES and can SEE themselves chasing. The current arc carriers: the lading row
  (short goals), the Flight ladder (a private arc), majorities (a slow arc), seat-gates
  (micro-arcs). Candidate directions when this opens: public milestone tiles ("first to
  X"), a visible endgame scoring preview, kontor development arcs, richer lading chains.
  No mechanism proposed yet — the next study when the designer calls it.
- ~~The Bergen per-die prize~~ **RESOLVED (2026-08-02) → v4.7 "Every Cask"** — measured
  (`PRIZE-CAP-STUDY.md`), then ruled: every cask pays its prize at all four ports.
- **Delivery arithmetic + rival effect + wharfage: RESOLVED (2026-07-04) → v2.3 "Privileges & Works"** (§9).
  Path C of the options exercise: value = a privilege (owner-only), transform = a work (anyone), wharfage and
  the rival-½ retired, ship-slot value buildings folded into the one demand die (max 6 on the sum). The
  deferred sub-question — whether transform authorship needs an owner kicker ("B's penny on works only") — is
  a dial held in reserve for the improvement-parity / balance pass.
- **Enshrine — public-first vs vessel-direct: RESOLVED (2026-07-04) — deploy-first stands.** Enshrine stays
  from **deployed casks only**; the v0.15 structural throttle (contestable before it scores) is kept and gets
  stated in the rulebook as a principle ("the Hall demands a public showing"). The vessel-direct idea is
  withdrawn; the counterplay to hostile dock-loading is the Charter relief valve + Tap recall.
- **Improvement-tile parity: FIRST PASS SHIPPED (2026-07-04) → v2.4 "Three Tiles"** (§9). The fresh
  free-grant probe (`probe-imps-v87`) measured the spread at −1.5…+17.3 win-rate pts; v2.4 re-prices
  (Vessel/Quay 4→3, Lagering 3→2 + per-vessel tick, Hop Garden 3→4) plus the new access paths (Hire ·
  London's choice) lift the floor. RE-PROBE after v88 and iterate — parity is a dial, not a one-shot.
- **The Hanse Diet (deferred, 2026-07-04).** The probe showed **0 die-sets in 1,000 games** (the
  lead-AND-route parlay never assembles for greedy play). Designer intuition: **+4★ where you lead** (make
  it wanted; NO presence grants — runaway risk). Revisit with Cellarmaster/human data.
- **The Floor/vertical-integration lane: RESOLVED (2026-07-11) → v3.0-A** — the Floor became the STAY-HOME turn (structured slot rows + Flight unlocks; flips score 0). The old watch-item text follows for the record. Designer: deliberately buffed (per-vessel
  Lagering · cheaper Vessel/Quay · displaced-building Wilds) to sharpen "compete on the crowded wharf vs
  build tall at home." Watch for dominance ("you basically hacked the game"); the 4-tile area cap stays the
  brake for now.
- **The Trade Roads review pass (2026-07-04).** The Overland expansion gets its own dedicated exercise.
  Carry-ins from the consistency audit: Keut's +1 presence is orphaned when majorities are off; Frankfurt's
  free-Q3 can create a 6th delivered beer (the Flight edge); the +2 clock cells have no printed home; the
  free-Improvement grant sits outside the `n − 1` printed supply; several node bonuses auto-resolve where a
  table would offer the owner a choice.
- **Asymmetric starting improvements (variable powers).** Deal each player **two** improvements; they keep
  **one** as a starting private power. Turns the (now symmetric) improvement set into an opening-asymmetry /
  replay lever. Needs: a power set balanced enough that any pair is fair, and a draft/keep-one rule. Open.
- **The premium fee dial — PARTIALLY RESOLVED (2026-07-26) → v4.2 “Tariff”** (§9): the wharf-side
  premium is now the per-item fee schedule itself (Bock 2G2H · Cellarman 3G · the load-lifts 2G ·
  Jopenbier 2G2H recorded). STILL PARKED: (a) a surcharge when a kontor PRIZE hands over a
  premium tile (today prizes are always free); (b) a BREW surcharge on the top beers. Revisit
  after the fee economy reads at a human table.
- **The Hall as a DICE SINK (recorded 2026-07-26, NOT built — the Hall’s return shape).**
  Designer: with the dice as the one clock, the Hall could be *“a place for dice to go”* —
  opening a **volume** path (park many cheap low casks, race the 14-die clock) against the
  **value** path (fewer, lifted, high-pip deliveries — and the risk of dice left in the tray
  when the end fires). The Hall seam (`DEST.hall`, D12) is exactly where this docks: a fifth
  destination whose gate is LOW but whose pay curve rewards count over pips, so it pressures
  the clock rather than the score ceiling. Design it with the pole test in mind (volume may run
  hot; the failure is negation).
- **The greedy-tier refresh — DONE at v4.3 (2026-07-26).** Re-taught to the v4 economy:
  fee-netted acquisition values, true Flight marginals, cheapest-net picks, no station dodge,
  dice-clock racing when ahead, horizon sense (options fade at runway ≤4). Trader>journeyman
  lands ~55% pooled (n=700) — under the historic 60% lint because journeyman inherits the
  shared fee sense; iterations that widened the gap by *weakening* the skeleton were rejected.
  Standing rule stands: the greedy tiers gate robustness/pace; strategy reads = MC tiers +
  flow probe + humans.
- **Starting building — RESOLVED (2026-07-04): there is no starting building.** The "1 random Building in
  hand" setup is cut (with the whole buildings-in-hand concept — buildings are always chosen from the display
  and placed on acquisition). The opening-asymmetry idea it served may return later as a **more diversified /
  expanded improvements set** — fold into the asymmetric-starting-improvements discussion above.


**v4.5b "Open Orders" — the #24 program: de-mint · no auto-age · the dice pass · 5th
specialist · LADINGS** *(2026-07-31, KEY `hanse-v45b`, designer-ruled off gatekeeper review
#2 (`archive/records/GATEKEEPER-v45.md`) + playtest #24; the plan/digest:
`archive/records/V45B-OPEN-ORDERS.md`)* — Five structural moves against #24's three
headlines (the bank out-earning beer, the flat mid-game, aging devalued). **(1) COMMISSION
DE-MINT** — a commission banks NOTHING; 1 G buys the hull + the v4.4 instant load. #24's
winner banked 9★ off three commissions while shipping thin — the mint out-earned beer and
flooded the wharf with hulls that never filled (the same hulls that jammed the old end
trigger). Tempo, not points. **(2) AUTO-AGING CUT** — dice turn only when something turns
them. The designer's read on #24 stands: "automatic aging devalues age" — when time alone
ripens every cask, the Cellar, the Cellarman and the whole Age axis lose their price. The
Cellar stays at 3 (designer-held; no compensation raise). **(3) THE DICE PASS** — the
building deck's center of mass moves onto the die: Racking Hall (swap two maturing dice) ·
Assay House ×2 (one maturing die ±1 — the v45c letter restored the ruled minus after a +1-only implementation shortfall) · Hop Exchange (pay 1H → boarding +1) · Tollhouse
(boarding −1 for +2★ — quality traded for points, the volume line's friend) · Bonded Store
(boarding +1; EPHEMERAL — sails away with its hull, paying every contributing house 2 goods:
the designer's Orléans-events idea as a pure component, and the answer to "why would I build
a tile everyone uses" — you place it on the ship YOUR plan feeds, harvest it, and the slot
reopens). The echo-verb Annex and one each of Granary/Scrivener's/Cooperage/Customs/Kiln are
cut: 17 tiles, 8 touch a die (was 3). **(4) SPECIALISTS** — max(2, n−1) copies per design
(2p stops being literally thin), the **Braumeister** joins (start of your turn: your ripest
maturing cask ages +1 — the earned, deterministic heir of the cut auto-age), and **Bergen
grants at most ONE specialist per ship sailed** (designer-ruled; the per-die expansion is a
recorded dial) — the #24 double-goods-stack needed a full hull, not one lucky Hulk. **(5)
LADINGS — the order layer** (the designer: "I like this a lot"; the Hall's spiritual heir):
15 tiles ⚙, a face-up row of 3 — each names a kontor (or any), a die-min or named beer, and
2–5★; a qualifying delivery claims one (one per cask, ★ bank at once); the row refills at
END of turn. Design answer to the fixed-vs-kontor question: BOTH — fixed printed rewards on
tiles, but the rotating row makes every kontor's delivery value a variable economy ("Bruges
for the recipe or London for the 4★ order" is now a real turn). *Volume-vs-quality (the
designer's standing worry), restated post-program: brewing rate-limits the volume line
(Gruit Ready-at-brew), aging rate-limits quality (3 points routed through Cellar/MQ/
Braumeister/Assay); volume pays through bumps, low-die ladings, wide majorities and the
Flight; quality through pips, Novgorod's premium, high-die ladings and Bergen. The 12-die
pool prices both. PATHWAYS re-read pending.* *Engine:* commPlace de-minted · braumeisterTick
replaces passiveFerment · BUILDINGS rebuilt (+enterRack/enterAssay/loadCommit options/Bonded
sail-away) · LADINGS deck/row/claim/refill + pendingLading queue · IMP_COPIES max(2,n−1) ·
Bergen specGiven flag · greedy AI re-taught (de-mint values, aiLadingBonus on load/commission
picks, rack/assay/loadopt/lading handlers, Braumeister at 3.6). *Gates (light):* `verify-v4`
**118/118** (20 new v4.5b checks: de-mint · no auto-age · Braumeister tick · rack swap-and-
cap · assay · hopex paid gate-make · tollhouse stamp · bonded lift/sail-away/once-per-house ·
lading queue/claim/one-per-cask/end-turn refill · Bergen ≤1/ship · deck counts) · sim 9
crash-free — an early 3-game read suggested 2p slowed to ~20+ rounds, but the full battery
(n=500/count) corrected it: 2p 14.6 avg (82% band) · 3p 14.0 · 4p 13.3. *(components.js: buildings/ladings/Braumeister card data + the
ladingTile face; print.html prints the new set.)*

**v4.7 "Every Cask" — one prize grammar, the price pass, the pool ruled, dead orders out**
*(2026-08-02, KEY `hanse-v47`, designer-ruled — five rulings, one version)* —
**(1) Every cask pays its port's prize.** The designer: "Per die (or per cask) prize makes
sense. Make that consistent throughout all 4 kontors." Bruges/London always were per-cask;
Bergen's per-house cap (v4.6b, hours old) is cut — the `PRIZE-CAP-STUDY` had measured
per-die ≈ cap on every macro metric, and the mat line SHRINKS to the uniform grammar. The
throttles are components: 2 seats · no duplicates · the display's end-of-turn gap ·
seat-gates · the 2-goods consolation. **(2) The specialist price pass** (the
`SPECIALIST-VALUE-STUDY` dials, ruled): Grain Factor 1G→2G · Supercargo 1H→2H · the Town
Crier's 2-ports gate cut · the Innkeeper reworked — his 4th vessel ages its own cask +1 at
turn start (`innkeeperTick`). *Re-probe (n=400/arm vs fresh 800-control):* Town Crier's mid
NEGATIVE is gone (−5.0 → +0.3) · Innkeeper out of the red (−1.2 → +1.8) · the outliers cool
in the richer per-cask meta (Supercargo +29 → +23 · Grain Factor +23 → +13.5; free-grant
probes read POWER — the new fees bite the paid channels). **(3) The pool stays 12 — RULED.**
The designer: "right now the game feels like as long as it wants to be. Any more may drag
it out. Without legible goals or strategic arcs in the game, it can feel repetitive." The
pool question closes; the LEGIBILITY remark is recorded in the parking lot as the next
design thread. **(4) Dead orders stripped** — setup returns the one undealt-beer lading to
the box (deck always 14-in-play of 15 printed; deterministic: exactly one export sits out).
**(5) The AI pass** — `aiSpecVal` re-taught to the probe truth + late-decay on the openers ·
the GM's 'quality' persona gated to 2–3p (pure search at 4p+ — the #26 starvation) · the
Exchange over-cycle damped (1.1 → 0.7). *Gates (2026-08-02):* verify **186/186** · sim
500/count + PATHWAYS 200/lane **0 crashes/0 deadlocks** (~5,300 games with the probes) —
pace 2p 12.8 · 3p 12.3 · 4p 11.4 (the ruled-accepted speed; 4p band 47.6% is the fast
tail) · **Bergen share 23–29%, NO per-cask magnetism** · lanes near-fair every count (3p
37/33.5/29.5 · 4p 20/27/30/23). *Watch ⚙:* the consolation faucet + Bergen share at a HUMAN
table (humans stack same-house casks; greedy bots don't) · the 4p fast tail · GM-at-4p
seat quality post-gate.*

**v4.6d "Longshore" — the Stevedore lifts every load** *(2026-08-02, KEY `hanse-v46d`,
designer-ruled: "the stevedore should be revised to allow two loads when loading. Right now,
it is limited to slot loading but I think it would be more powerful the other way")* — The
Stevedore's 2-cask lift now rides **every load flow**: the slot stop (as before), the
**commission's maiden load** (fill a Cog at commission; 2 of 3 on a Hulk), and the *Load*
bonus. One line — `enterLoad` lifts `loadsLeft` to 2 for the holder — so every future load
channel inherits it. The card face reprints: *"Whenever you load, load up to 2 casks."*
*Gates (light):* verify **180/180** (maiden-2 · sequential boards · Load-bonus-2) · sim
crash-free. *The same day, the designer-called SPECIALIST VALUE STUDY measured all 13
designs (free-grant probe start/mid vs 800-game control + a 1,500-game observational
corpus — `archive/records/SPECIALIST-VALUE-STUDY.md`): the buffed Stevedore reads +7.0
win-pts seated at start (the buff itself is noise under greedy play — its ceiling is a
planned human line); the outliers are **Supercargo +29.0** (1H is too cheap for a
per-rival-sail freight drip) and **Grain Factor +23.3/+10.5** (the auto-pick core), while
**Innkeeper is NEGATIVE even granted free** (v45h's three open vessels gutted the 4th) and
**Town Crier goes −5.0 mid**; Scholar/Cellarman/Shipwright decay on schedule and the
Chronicler is the one riser (+0.3 → +5.3), per design. Dials proposed in the record —
designer to rule.*

**v4.6c "Living Line" — the line is read live** *(2026-08-02, KEY `hanse-v46c`,
designer-ruled off live play turn 8: "I was expecting to be able to also load it by
activating that slot as well… The line can evolve as you take your turn")* — The engine
snapshotted a line's stops at activation, so a hull **commissioned** onto an active line
slot mid-turn (the reported case: a Cog onto the Kiln slot of the player's own Left col —
maiden-loaded, then stranded at 1/2 with the slot stop never offered), a hull **warped**
there (Capstan), or a **building raised** there (London prize / benefit placement)
contributed no stop. The table has no snapshot — the components in front of you ARE the
state — so the mirror now reads the line LIVE: `resolveStop` records used stops
(`UI.usedStops`), and `refreshStops()` fires after every mid-turn placement
(`commPlace` · `capPlace` · `commitBldg`), adding a newly-valid slot stop unless already
used (each stop still at most once per activation; the disappearing direction was already
live via `stopAvail`). The greedy and MC tiers pick the refreshed stops up automatically
(UI.stops is re-read every decision) — a small free AI upgrade: they can now top off a hull
they commission onto their own line. *Gates (light):* verify **176/176** (the living-line
battery: commission-opens · once-per-activation · building-opens · off-line-inert ·
warp-opens) · sim 12 + GM spot crash-free. *(RULES §2/§6 + the aids gain the explicit
live-line sentence — the canon had never stated the snapshot question either way.)*

**v4.6b "Every Shipper" — the Bergen prize read corrected** *(2026-08-02, KEY `hanse-v46b`,
designer-ruled off live play: "this rule was misinterpreted. The ship provides the benefit
to every player with a cask, but with a per player limit of 1… The destinations should
grease the wheels a little bit now that they can be the sole source of
buildings/recipes/[specialists] if the right casks and buildings aren't out")* — The v4.5b
"≤1 specialist per SHIP, load order decides" line was a **misreading of the ruling**, caught
at the table when a rival's berth-1 seed cask swallowed the head's prize: Bergen now grants
a specialist to **EVERY house with a cask aboard — at most ONE per house per ship** (three
own casks still seat one). Load order keeps a real job: it is **pick order** off the
shrinking display (v4.4c — a take's gap stands until end of turn), so boarding first still
buys first choice. *Why it fits:* the kontor prizes are the game's only **guaranteed**
faucets — when the display/verb channels don't show the right tiles, the ports must carry
the acquisition economy alone; a prize a rival can silently absorb by seeding one cheap cask
breaks that promise (and punished exactly the shared-hull cooperation the berth race is
meant to reward). The per-house cap keeps the throttle: a hulk can never seat 3 tiles on one
house. *(The v4.5b "per-die expansion" dial is superseded — per-HOUSE sits between per-ship
and per-die and is now the printed rule.)* *Engine:* `sailShip`'s `specGiven` boolean → a
per-owner map (the Bonded/Supercargo `paid={}` pattern); the pending-spec queue, pickers,
gates and the 2-goods fallback already handled multiple heads per sail. Bergen's mat, the
kontor tooltip, the aid row and the footer reprint. *Gates (2026-08-02, the designer-called
oracle re-run):* verify **170/170** (check 22 rewritten: same-owner 2-cask → 1 prize · mixed
2-cask → 2 in load order · 3-cask hulk with a double → exactly 2) · sim **500/count 0
crashes/0 deadlocks** — pace 2p 13.6 · 3p 12.5 · 4p 11.9 avg (~1 round faster than the
v4.5b battery; the delta is the whole v4.6+b program, not this letter alone — band 56–67%,
fast-edged: the pool-13 question stands) · **PATHWAYS 200/lane (the oracle): 3p builder
COOLED 40.5 → 32.0** (near-flat 34.5/33.5/32.0 — the v4.5b hot-lane watch clears) · **4p
lifter RECOVERED 19.5 → 26.0** (24 / 26 / 29.5 / 20.5 — builder mildly warm, breadth's mild
cold is the standing v40 shape) · 2p majority 55/45. **Bergen's delivery share holds at
25–28% every count** (Bruges 34–42 still leads) — the widened faucet does NOT
double-magnetize Bergen (the swap-study fear); dice trigger ≥97.5%. *Watch ⚙ (RULES §Open
#5):* Bergen share + specialists/game as humans (not greedy racers) work the wider faucet;
the dial is the per-house cap. The 4p greedy seat spread (P1 17% in the journeyman cohort)
wants a table read — tier artifact or real.*

**v4.6 "Guildbook" — the Agricola program: guild specialists · the dealt building deck**
*(2026-08-02, KEY `hanse-v46`, designer-ruled off the `archive/records/AGRICOLA-STUDY.md`
markup: "Let's implement this but before you do, consider the costs… Guild scholar…
should [cost] 2G and make recipes free (my preference)")* — The study's read adopted: the
specialists and buildings ARE Agricola's occupation/improvement channels, and each was one
texture short. **(1) THE SPECIALIST ROSTER 5 → 13 designs** — the core five drips keep
max(2, n−1) copies; **eight GUILD designs join at 1 copy each** (scarce, first-come): Guild
Scholar 2G — recipes FREE at every channel, Bruges included (the designer's markup over the
study's −1H draft) · Innkeeper 2G, *gate 3 distinct brewed* — the tile IS a 4th vessel (the
Wet-Nurse-class build-around; the gate raised from the study's 2 because the warm-start Gruit
made 2 a formality) · Supercargo 1H — a hull sailing your cask on a RIVAL's turn pays 1G1H
(the I-deck texture; flattened from per-cask to per-sail so off-turn resolution is
choice-free) · Chronicler 1G1H, *gate a lading claimed* — end +1★/claimed lading CAP +5 (the
Braggart; capped because ladPts≥6 is the standing top win-signal) · Alderman 2G — end
+2★/kontor with 3+ parked dice (the Loom; volume-lane collector) · Town Crier 1G, *gate
delivered to 2 kontore* — bumps park at FACE 2 (pips=★ audit holds; Novgorod bumps stay
flat) · Chandler 1G — swap 1G↔1H once/turn (via gain(), so the Hop Gardener combo is REAL —
1G→2H, capped by the stamp) · Shipwright 1H — commissions FREE (reworked from the study's
"+1 good" — same net, one sentence, no prompt, never goods-locked). **Three spikes print
SEAT-GATES** (Agricola's prerequisites) — every gate reads off components: flipped cards ·
claimed tiles · parked dice. **(2) THE BUILDING DECK +3 designs, and the box prints 20 —
SETUP DEALS 17** (≥1 Kiln + ≥1 Mission Quay guaranteed; the exports' deal-3-of-4 grammar on
the wharf): Victualling Yard 2G EPHEMERAL — the boarding cask's bonus fires TWICE, sails
away with its hull (the Bonded Store's event family grows to two) · Merchants' Exchange 2G —
cycle one open lading under the deck, replacement posts at once (the first hand on the
shared order economy) · Warping Capstan 2G — move one EMPTY hull to any shipless slot (dead
geometry becomes authorable). **(3) Guild ★ join end-scoring** (a `guild` component in
scorePlayer; the Final Standing table gains the column; the audit is tiles-at-seat + dice-on-
mats). *Engine:* IMPROVEMENTS/SPEC_FEE/SPEC_GATE + specGate in grantableBuy · recipeFeeFor/
commCostFor waiver helpers on every channel · innkeeper vessels.push in grantUpgrade ·
towncrier ×2 in addPresence · supercargo + victual in sailShip · victual double-push in
loadCommit · chandlerSwap + chUsed re-arm in endTurn · exchange/capstan flows + MC branches ·
BUILD_DECK_DEAL subset in buildBuildingDeck · aiSpecVal/aiCapPair/aiChandler + re-taught
hire/prize picks. *Harnesses:* verify-v4 **168/168** (28 new checks: waivers incl. Bruges ·
gates · face-2 bumps · rival-sail freight · the 4th vessel · collector caps · double-fire +
sail-away · cycle-now vs end-turn refill · empty-only warps · the 17-of-20 deal ×20 runs ·
grain-only audit at 20) · sim.js counters extended (exchange/capstan/victual/chandler/
supercargo + the ship-shapers instrumented at last — the study's B4) · sim 12 crash-free,
all new systems firing. *Watches (⚙, also RULES §Open #13):* Chronicler vs the ladPts
signal · Shipwright vs the commission trap · hops relief (Chandler+Scholar) pollutes the
flow-probe baseline — re-run it · the greedy AI over-cycles the Exchange (~8/game in one
smoke sample — damp the verb value if it muddies reads) · PATHWAYS + persona-duel re-read
before the next human table.*

**v45h "open floor" — the covers come off** *(2026-08-01, KEY `hanse-v45h`, designer-ruled:
"remove floor slot locks. We want to allow all of the slots to be open for now")* — All 3
vessel slots and both specialist seats **open from the start**; the printed covers leave the
board (for now — the unlock seam stays inert in the engine for their return). The Flight
keeps its scoring ladder ((brewed−1)², min 3) and sheds its unlock duty; the AI's 2nd/3rd-brew
kickers go with it. *Why it fits the moment:* the v45e/g letters made quality slower and
hops-hungry — a third vessel from turn one gives every line more runway (brew-and-hold gets
room; the launder engine gets a workbench), and the capacity gate no longer taxes narrow
lines that brewed one beer deep. *Watch ⚙:* the 2nd-brew incentive weakens — if the Flight's
early rungs stop pulling, the dial is the ladder's low end, not the covers.*

**v45g "no beer before its time" — aging required for every Q3+** *(2026-08-01, KEY
`hanse-v45g`, designer-ruled: "make sure aging is required for everything Q3+")* — The base
table already held the invariant (every export ≥1 step); the ONE leak was the **Cellarman on
Broyhan**: +1 on a start of 2 made the fast Q3 **Ready at brew**, erasing the Age axis for the
cheapest export. The fix is a cap in `startDieFor`: **a Q3+ export never starts Ready** (start
≤ Q−1). Cellarman steps after: Broyhan 1 (his lift is void there — his value moves up-ladder),
Keut 1, Mumme 2, Bock 2; Gruit/Hopped (Q1/Q2) untouched. Building routes to instant readiness
(Racking's transfer, the Abbey) are unaffected — those are earned infrastructure, not a brew
start.*

**v45f "the master's hand" — the Guildmaster plays the designer's line** *(2026-08-01, KEY
`hanse-v45f`, designer-ruled: "Teach the guildmaster to emulate my game play. Quality early
and often. Maximize points per cask but hopped when needed.")* — The GM gains a standing
**'quality' persona** (rollout-seat bias + greedy-fallback teaches + a small style prior on
the MC option margins) — see `AUTOMA.md` for the mechanism and probe (pips/delivered cask
2.93 vs the journeyman's 2.63; Mumme+Bock share up a third; Hopped held at ~33% as the tempo
valve). Design note: the pure-margin MC would NOT play this line unaided post-v45e — quality
now costs real hops — so the persona also banks hops toward the next high recipe; the
**Cellarmaster stays pure search** as the unbiased contrast (if the CM starts beating the GM
by out-VOLUMING it, that's a balance datum, not an AI bug).*

**v45e "the recipe tariff" — H = Q−2, and Bruges pays too** *(2026-08-01, KEY `hanse-v45e`,
designer-ruled: "Instead of being free, the cost (in hops) should be q-2… early bock recipe
and only brewing it (and one of each of the others for the flight) might be the only true
power strategy")* — The recipe fee becomes a printed FORMULA — **`H` = Q−2** (Broyhan/Keut 1H
· Mumme 2H · Bock 3H) — and it applies at **every** channel: the Bruges prize grants the PICK,
never the waiver (no affordable pick → the 2-goods consolation). The Bock rush is taxed
twice-over: 3H to hold the recipe, 2G3H per brew — the 3G2H opening can't touch it on turn
one. The formula also finishes the v45d currency grammar: grain buys infrastructure, hops buy
recipes and quality. *Keut note:* its old 1G fee is gone — at 1H it now prices level with
Broyhan (it was the least-brewed export at ~7%; a small tailwind). *Watch ⚙:* hops carry
THREE sinks added in two letters (recipes · Hop Exchange ≤2H · Abbey 3H) — the flow probe's
"hops slack" read needs re-running; if hops flip to binding, the dials are the formula offset
and the Market mix. And the designer's standing worry — a viable LOW-quality path — now leans
on the launder engine, the Kiln/Tollhouse, low-die ladings and the majorities; the PATHWAYS
lifter/majority lanes are the gauge. *Gates:* verify **134/134** · sim 60 crash-free (winner
totals dip ~58–66 → ~51–55 — the tariff bites; pace holds).*

**v45d "the power ladder" — the deck gets its GWT curve** *(2026-08-01, KEY `hanse-v45d`,
designer-ruled off the v45c utilization read — the Racking Hall at 0.0 and the Tollhouse at
~0.1 uses/game — and the comp: "consider buildings in Great Western Trail; some are cheap and
meh and others are more costly with more power")* — Five moves. **(1) THE RACKING HALL IS
UNCAPPED** (fee 3G, the deck's most expensive tile): swap the dice of ANY two of your vessel
casks — the whole die transfers (the designer's ask verbatim: "what if I could use a Bock to
create level 5 Gruits?"). The launder engine: age a Bock to 5, rack its die onto a Ready
Gruit, ship a 5-pip Gruit (Novgorod pays 7★) while the Bock re-matures from 1. Pips only
MOVE — the throttles are the aging rate (~4 points/cycle), the 3 vessels, the slot stop and
qty 1. Racking = transferring mature beer between casks; period-true blending. **(2) FEES
PRINT IN GRAIN ONLY** — grain buys infrastructure, HOPS power quality (the currency split the
slack-hops flow-probe read wanted). **(3) THE HOP EXCHANGE BECOMES A SLOT-STOP ACTION** (2G):
pay up to 2H ⚙, each hop turns a vessel die +1 — past quality is fine (the building-lift
exception), cap 6; the on-load path is cut. **(4) TOLLHOUSE +3★ INSTANT** (net +2 — any
quality; the stamped die must still make the gate; the designer's Q3-only intuition answered:
the loss is always exactly one pip). **(5) THE ABBEY CELLAR JOINS** (2G, replaces one Assay —
deck stays 17): slot stop, pay 3H — ALL your maturing casks age to READY; the premium aging
well. The deck now tiers: cheap utilities (free–1G) · situational mid (2G) · power (2–3G:
Racking/Abbey/Hopex). 9 of 17 tiles touch a die. *Engine:* rack uncap + vesselCasks
eligibility · enterHopex/hopexAllot (age-flow UI) · enterAbbey/abbeyGo · canTake/loadCommit
hopex paths cut · aiRackVal (READY-gain + surplus-transfer) · hopex/abbey AI verbs + MC
options · sim counters rewired (+abbey). *Gates:* verify **132/132** (10 new checks incl.
the launder play + grain-only fee audit) · sim crash-free; usage re-read after landing.
*Watch ⚙:* the launder rate at a human table (dials: the 3G fee, qty, or a once-per-turn
stamp); hops economy now has real sinks — re-read slack; Tollhouse at +3 vs the lading
netting.*

**v4.5 "Empty Tray" — the tray is the trigger, and it holds 12** *(2026-07-31, KEY
`hanse-v45`, designer-ruled off human playtest #24 — the first v4.4 table)* — Two changes.
**(1) THE END TRIGGER IS THE EMPTY TRAY:** the first house to COMMIT its last tally die —
parked, riding a vessel, or aboard an unfilled hull (the tray reads 0) — sets the final round.
Parked-out is no longer required. The #24 stall this cures: the human ran the pool down to 2,
both dice stuck (one on a 1/3 Novgorod Cog, one maturing), no tray die to brew with — the
game could not be ended by the player who had spent their whole runway. Commitment is the
honest clock read: the tray is the component in front of you. **(2) THE POOL IS 12 ⚙** (was
14) — the same table asked for a shorter game; commitment-triggering alone shaves ~2 dice of
runway, the pool cut shaves the rest. *Engine:* `checkDiceEnd` (fires on brew/bump/park + the
endTurn safety net) replaces the parked-out trigger; `PRES_POOL` 12. *Gates (light):*
`verify-v4` **95/95** (updated: parking the last die still ends [reason now 'dice']; new: the
last BREW empties the tray and ends; 12/house) · sim 30 (10×2–4p) **0 crashes/0 deadlocks**,
dice trigger 100% — pace reads 2p 13.4 · 3p 13.0 · 4p 11.7 avg (band 90/60/60%; sub-12 games
are now common under greedy play, which never holds dice back — ⚙ re-read at a human table;
the pool is the dial back UP if real play runs too fast).*

**v4.4c — the specialist display refills at end of turn** *(2026-07-31, KEY `hanse-v44c`,
designer-ruled)* — A taken specialist leaves a **gap for the rest of the turn**; the display
restocks from the deck **when the turn ends**. Chained same-turn hires (a Bergen prize into a
Hiring Post stop) can no longer dip into a freshly revealed tile, and the restock happens on
the turn boundary in rivals' view — the physical table's rhythm. **Ships and buildings keep
their immediate refills.** *Engine:* `takeImpFromDisplay` drops its refill; `endTurn` calls
`refillImpDisplay`. *Gates (light):* `verify-v4` **93/93** (new: no mid-turn refill · the
end-turn restock) · sim 9 crash-free. *(The v44b letter beneath: bankB/bankC counters for the
score-breakdown modal — a playtest aid, no rule.)*

**v4.4 "Maiden Load" — the commission's free load returns** *(2026-07-31, KEY `hanse-v44`,
designer-ruled: "when I commission a ship, I should be able to load a ship with 1 cask as a
part of commissioning… we had this previously but we want it in the game")* — Commissioning
now includes **ONE optional free load**: after paying the 1 G and placing the hull (★ = berths
banked), the commissioner may **at once load one Ready cask from their own vessels** onto it —
a NORMAL load (the gate reads the die as it boards, after the slot's lifts — a Kiln beneath
the hull lifts the boarding die; the cask's printed load bonus fires; a full hull sails, a
Skute immediately). The pre-v4 grammar (v2.8's "commission is the one universal vessel-direct
door") returns in v4 form: vessel-direct only — the deploy-era dockside pickup stays gone with
the deploy state. **Commission + Skute = the old charter as pure components** (1 G, one cask,
sails now) — the relief valve gains a throttle the player controls. *Engine:* `commPlace`
chains into the standard load flow (`enterLoad` on the new hull), so gates, lifts, load
bonuses, sails and every AI tier inherit the rule through the existing load prompt; the greedy
commission valuation gains a small loadable-hull bump. *Gates (KEY v44, light per the standing
rule):* `verify-v4` **91/91** (new: the commission offers the load · the gate is respected ·
commission+Skute sails and delivers at once) · sim 9 (3×2–4p) **0 crashes/0 deadlocks**, pace
in band. *Watch (⚙): commission tempo — place+load in one station action accelerates
deliveries and the dice clock; re-read pace at the next human table.*

**v4.3 "Open Quay" — the toll falls** *(2026-07-26, KEY `hanse-v43`, the designer's third
ruling off playtest #23)* — **The occupancy toll is CUT** *("Yea, we ditched the occupancy
toll.")* — sharing a station costs nothing; the friction the toll priced is carried by the
components instead (the berth race, the shared building family, the displays/draft, the
majorities). Lesson honoured (v0.15: structure over value): the toll was a *value* lever on a
*structural* problem the v4 board no longer has — with ONE action per station and 8 shared
slots, company at a station is already self-limiting. Same ruling, AI-only: the **greedy tiers
re-taught** to the v4 economy (fee-netted values via `aiFeeCost`, Flight marginals via
`aiFlightMarg`, horizon sense via `aiLateGame`/`aiClockPush`, no shared-station dodge); the
double-cost list stays ZERO (recipe fee is one-time, brew cost per-brew — confirmed fine).
Gates: verify 87/87 · sim 500 + PATHWAYS 200 + flow probe all 0 crashes · render-smoke ALL
PASS · GM>trader 85.4% (41/48) · CM>GM 54.2% pooled (13/24 at bulk budgets — statistically
indistinguishable from v4.2b's 66.7%; the bulk-budget rung reads low by pattern) ·
trader>jour ~55% pooled (watch, see parking lot).

**v4.2 "Tariff" — per-item fees & the Novgorod premium** *(2026-07-26, KEY `hanse-v42`, the
designer's second ruling off playtest #23)* — Two changes on v4.1, same day. **(1) THE FEE
RIDES THE ITEM, not the channel** *("Recipes used to have different costs based on the recipe,
same with specialists… maybe it is clear that some buildings have fees and others don't — that
will need to come clearly from the design of the tile. I think some buildings should be
free.")* — every acquirable item prints its OWN wharf fee ⚙, paid at any wharf channel, waived
as a kontor prize: **recipes** Broyhan 1H · Keut 1G · Mumme 2H · **Bock 1G2H** (the premium
climb — the designer marked it down from the first-pass 2G2H; expansion fees recorded for their return — Gose 1G · Zerbster
1H · Duckstein 1G1H · Jopenbier 2G2H); **specialists** **Cellarman 3G** (the playtest-proven
tempo monster) · Grain Factor 2G · Hop Gardener 2H · Stevedore 2G; **buildings** two tiers +
a FREE tier read straight off the tile (chip = fee, chipless = free): Granary/Mission
Quay/Almoner's free · Scrivener's/Hiring Post/Annex 1G · the four load-lifts (Kiln/Cooperage/
Customs/Rich Berth) 2G. **NEVER fee-on-fee** (designer: "we don't want a fee + fee") — using a
building is free; at Scrivener's/the Hiring Post you pay only the item's own price. **(2)
NOVGOROD PAYS THE DIE +2★** *("I didn't realize it provided an age for a long time… I never
played there for that reason")* — the refine prize is CUT; the mat prints **value = die +2**
(6–8★ at gate 4; gate 4 keeps the audit clean — a face-1 die there is always a bump). This
also dissolves the refine anti-synergy + missing-fallback gap the playtest-#23 review flagged.
*Engine:* RECIPE_FEE/SPEC_FEE/BUILDINGS[k].fee + per-option affordability gates; DEST.vbonus in
deliverCask + the AI valuations; the refine/brefine machinery removed. All fee numbers are
first-pass ⚙ awaiting the designer's markup. *Gates (KEY v42b — the FULL battery, designer-called):* verify-v4 **83/83** (per-item fees ·
free tier · prize-paths free · Novgorod 6★/8★) · sim 500×2–4p (journeyman) **0 crashes/0
deadlocks**, band 97.6–99.6%, rounds 23.0/20.7/18.7 · PATHWAYS 200×3 — 2p majority 51.5/lifter
48.5 · 3p 31.5/35/33.5 · 4p **31/21/23.5/24.5** (fair 25 — majority warm, lifter cool; pole
test: no negation, recorded not dialed) · ladder: jour>app 70 · **trader>jour 52 (n=150,
FAILED — the greedy trader's weights predate the fee economy; an AI-only retune is flagged,
the game gate is the MC pair)** · GM>trader **91.7** (44/48 sharded) · CM>GM **66.7** pooled
(16/24 at bulk budgets) · render-smoke ALL PASS. *The FLOW PROBE (new — `flow-probe.js`, 250
trader games/count, LIVE vs NOFEE A/B; corpus `flow-v42b.txt`):* fees are **pace-neutral**
(±0.3 rounds) and trim volume 4–10%; the Novgorod +2 lifts its traffic ~+2–3 pts; **grain is
the binding currency** (turn-start ~1.2 G vs ~2.5 H; starved turns 11→14% under fees — every
infrastructure sink is G) so **H-fees are soft, G-fees bite double**; the **2G load-lift tier
prices the wharf channel out** (Kiln/Cooperage/Customs wharf-acquisitions ~0.1/game vs 0.3–0.5
free — London becomes their only real door); **hire is the most-blocked want** (14–25
player-rounds/game); decision quality holds under fees (move: 46–51% two-good options; late
game degrades — weak options 2%→19–24%, the Hall-as-dice-sink's slot); **2p runs
ceiling-heavy** (60–70% at round 25 — a 2p-specific POOL dial is the candidate). Dial
candidates recorded for the designer: lifts 2G→1G1H · Cellarman/POOL (see below). All ⚙.
*v4.2c markup (designer, same day — KEY `hanse-v42c`):* **specialist fees −1G** (Cellarman →
**2H** — the premium moves into the slack currency, per the probe; Grain Factor 1G · Hop
Gardener 2H · Stevedore 1G); **ONE PAYMENT PER PLACEMENT** — the double-cost audit ("no item
may cost an access fee AND an item fee") reads **ZERO**: a fee-paid building gain covers the
ground rent, rent (1G) survives only under otherwise-free placements onto built slots; **2p
running long is ACCEPTED** (no pool dial); and the greedy-tier worry is recorded — *"I worry
we over-index on those AI players"* — the non-MC tiers are demoted to robustness/pace oracles
(re-teach queued), strategy reads lean on the MC pair, the flow probe and humans. Gates:
verify **86/86** · sim 9 crash-free (light, per the standing rule).

**v4.1 "Counting House" — the fee & the one clock** *(2026-07-26, KEY `hanse-v41`, designer-ruled
off human playtest #23 — the FIRST v4 table: "I like how the game is playing as it is more
intentional… better to have the various items needed spread throughout instead of easy access
markets")* — Two rulings. **(1) PAID AT THE WHARF, FREE AT THE KONTOR:** if a wharf channel
offers what a kontor prize gives free, the channel charges — gaining a **recipe / building /
specialist** via Scrivener's Hall, the Hiring Post, or the *Gain 1 recipe/building/specialist*
load bonuses costs the **1 `G` WHARF_FEE** ⚙ (one dial, the 1G grammar: toll · commission ·
rent · fee); Bruges/London/Bergen prizes stay free, so the voyage stays the premium faucet. The
fee PRINTS on the two building tiles (cost chip) and on the three acquisition verbs (piles/tiles).
**(2) THE DICE ARE THE ONE CLOCK:** the Sailed-Ships track is CUT — trigger and component
("you never get them back so it's a finite resource with choosing their uses"); the **14th
tally die a house parks** sets the final round, MAX_ROUND 25 stays the rules-side backstop,
and sails end nothing (the Skute's job reduces to deadlock relief). `PRES_POOL` (14) is now
THE pace dial. *Also recorded, not built (parking lot):* the premium-prize fee dial (better
kontor-gained buildings/specialists; a Bock/Jopenbier surcharge) and **the Hall as a DICE
SINK** — the volume-vs-value fork on the one clock. *Engine:* WHARF_FEE + gates on the three
channels (prize paths untouched); SAILED_CAP/`sailedCap`/the 'clock' endReason removed; the
in-page ICONTIP tooltips (stale v3 text since the v4.0 rebuild) rewritten to v4. *Gates (KEY
v41, light per the standing rule):* `verify-v4` **79/79** (new: fees charged on all three wharf
channels · every prize path provably free · sails never end the game) · sim 9 games (3×2–4p)
**0 crashes/0 deadlocks**, 100% in the 12–25 band — pace reads longer (avg ~20–24, ceiling
share 33–67% ⚙) but the greedy tiers are documented non-racers of the pool; human races decide
the POOL dial. All numbers ⚙.

**v4.0 "Bright Beer" — the streamline keystone** *(2026-07-21, KEY `hanse-v40`, designer-ruled off
`archive/records/V4-STREAMLINE.md` from human playtesting: "streamline, simplify, make the resources and actions more
intentional")* — Six directives, one build. **(1) The Floor turn is CUT** (AP without payoff — often
ignored at the table). **(2) THE DIE IS THE CASK:** start value printed on the tile (= quality − aging
steps; designer's example: Broyhan Q3/1 step starts at 2; ruled: Gruit ages 0 steps — Ready at brew),
age points turn it up, Ready at the quality, buildings lift it past (cap 6) — so the humble beer has
the most headroom; gates read the die as boarded (ruled), Novgorod's gate RAISED to 4 with its printed
scale cut. **(3) ALL buildings serve everyone; +3★ to the builder;** the 12 Privileges/ownership/rent-
to-owner cut; building actions drawn from the cask-action verbs; overbuild open at 1 G (ruled "more
variable" — the restraint is a dial). **(4) The Hall TABLED** (the prestige lane returns later — seam
kept). **(5) NO DEPLOY:** slots = building + ship only; a ship's slot stop loads 1 Ready cask from
YOUR vessels and fires its printed action — cask actions are LOAD BONUSES now; over-deploy/souring/
rival-loading/Staithe/Quaymaster die with the state. **(6) Board = one action per station** (Source 2 ·
Brew · Age 3 · Commission 1G + ★ = berth count); the Skute (1-berth, sails on its first load) replaces
the whole Dispatch/charter/contract subsystem as a COMPONENT; ship display 4, deck 6/10/8 sk/c/h.
Prizes: Bruges recipe · London building(+3★) · Bergen specialist · Novgorod refine +2. Specialists
trimmed to 4 (Cellarman = start +1 · Grain Factor · Hop Gardener · Stevedore), 2 seats, EARNED free.
Flight unlocks: 2nd distinct brew → vessel 3, 3rd → seat 2. NEW COMPONENT: the score track (build/
commission/bump ★ need a home — the hard line). Presence bumps park a tray die at face 1 = 1★ (ruled).
*Engine:* play.html 4545 → ~2700 lines; the MC tiers (GM/CM), personas and the pathway oracle are
TABLED to the P5 rebuild — setup offers Apprentice/Journeyman/Trader; sim.js rewritten to drive the
engine's own aiStep; `verify-v4.js` replaces verify-v3 (71 targeted checks). *Gates (KEY v40):*
verify-v4 **71/71** · sim 150×2–4p **0 crashes / 0 deadlocks**, rounds 2p 19.0 / 3p 15.2 / 4p 14.0
(91–95% in the 12–25 band after the cap sweep 8/10/12 → **7/10/13** ⚙), triggers split clock 74–82% /
presence 11–18% / ceiling ≤15%, delivery spread Bruges 32–36 / London 23–24 / Bergen 26–28 / Novgorod
15–18%, seat spreads flat; a full in-browser game through the real render layer, 0 console errors.
*P4 + P5 (same day, designer-called "finish p4/p5"):* **the kit refreshed to v4** — printables2 prints
single-faced casks (die seat · printed START value · load bonus), the Skute/Cog/Hulk ship sheets, the
one green building family (17, single-faced — no owner rings, no WILD backs), 3+2 player boards, the
kontore-only Destinations board (the Hall panel out; parked-dice primer in), the 7/10/13 clock and the
score ring; contracts/cubes/markers left the sheets; index.html and learn.html rewritten to v4 (banners
off). **The P5 oracle rebuild:** GM/CM return as a compact flat-MC block (clone (S,UI) · determinized
decks · journeyman/trader rollouts · margin objective; CM adds sequential halving), personas return as
the four v4 lanes (majority · lifter · builder · breadth) on the Trader, and the ladder/render-smoke
harnesses are rebuilt (`ai-tune` stays retired — no weight table). *Full battery (KEY v40):* sim 500×3
— **1500 games, 0 crashes/0 deadlocks**, band 91–95%, presence trigger 11–15%; **PATHWAYS 4p
25.0/24.5/29.5/21.0%** (fair 25 — builder warm, breadth low; pole test: no negation, recorded not
dialed); **ladder** jour>app 75.0 · trader>jour 69.2 (n=120) · **GM>trader 95.8** (46/48 sharded) ·
**CM>GM 62.5** (20/32 at bulk budgets) — all rungs ≥60%, 0 errors; **render-smoke ALL PASS** incl. GM/CM
through the real render layer. *Watch (⚙):* the R1–R6 risks in `archive/records/V4-STREAMLINE.md` §2 (2p texture, recipe
faucet, London/Bergen heat, the +3★ build rate, clock feel, the tabled prestige lane) — now with the
oracle live to read them.

**v3.4 "Tally Dice" — the disc/die unification** *(2026-07-19, KEY `hanse-v34`, designer-ruled "all in")* —
**The presence disc and the demand die become ONE component: 14 player-colour d6 per house.** A die from the
tray rides every deployed cask (face **1** — ownership in plain sight), is **turned to the Privilege's printed
N at departure** (the v3.0-A one-read carrier, unchanged), rides the hull's berth well, and **parks at the
destination on delivery** — it IS the house's presence for majorities, and the same public pool stays the v3.2
presence clock (last die placed = final round). The kontore's flat **+1★ base folds into the die's floor of 1**
(Bruges/London/Bergen print no value; Novgorod's printed scale rides on top; a bare delivery pays exactly what
it did). **Physical gates fall out of the component:** no die in the tray → no deploy, no vessel-direct load,
no Reach (tap-outs/sourings/displacements return dice). Box: −56 presence discs −8 shared demand dice → +56
tally dice; component-gap #10 (shared-die supply) closes by construction. **Method:** the design was
oracle-tested first as a standalone experiment on the v84-era engine (models A "die = quality+mods" vs B
"die = mods on a floor of 1" over an 8/10/12/14 pool sweep, ~8k games — model B at 14 dice won: near-zero
saturation, baseline scores, tightest lane balance; `playtests/dice-experiment/REPORT.md`), then ported onto
the v3.3 canon, which had independently adopted the finite-pool presence clock with discs — the unification
was the remaining step. *Gates (KEY v34):* `verify-v3` **93/93** (the rival-privilege check updated: a rival's
slot sends the die at its floor of 1; new bare-slot floor + Bruges-delivery checks); sim 300 + PATHWAYS 300 vs
a same-day v3.3 baseline — **0 crashes/deadlocks, pace in band**. *⚙ watch items (persona-oracle reads, greedy
tier):* privileged flat-kontor deliveries pay 1 less than v3.3 → 2p prestige warmed 50→70% (dial: +1 on the
Staple/charter prints, NOT the die floor); the tray gates slow greedy delivery flow → the round-ceiling share
rises (13→40% at 3p; the presence trigger still fires 17–51%) — a real-tier corpus on the designer's call.
All numbers ⚙.

**v3.4a "The Component Refit"** *(2026-07-19, designer-ruled)* — The table was drowning in 2.5″ squares:
the CASK becomes a **2.4×1″ double-sided tile** (aging / wharf sides; the wharf side prints the tally-die
seat), the BUILDING drops to **2.5×1.32″** (v3.4c width; wharf side tight: name · cost · one effect line; floor side just
WILD; ownership = a little house token — the owner frames/rings retire), and the SHIP becomes a **vertical carrier** — ALL berths (v3.4b): full-width 1″ wells filled bottom→top,
the TOP berth the TRIGGER printing the hull's identity (the last cask covers it = the sail; Cog 2.5×2″ ·
Hulk 2.5×3″; the berth cube proxy retires — board state is the
physical stack). The app mirrors it: two-zone slots (inner building band · outer occupant), cargo ON the
printed berths, side slots rotated 90°.

**v3.3 "Three Coins" (the consolidation)** *(2026-07-14, KEY `hanse-v33`)* — The four v3.2 patches fold
into ONE version, with one ruled simplification: **a displaced tile with no open Floor slot is SIMPLY
DISCARDED** (the v3.2a +3★ consolation removed — flips are engine, and the 1G ground rent already prices
the eviction). From v3.3 the app **mirrors the print kit**: the card faces come from a shared component
library (`components.js`) used by both `print.html` and `play.html`.

**v3.2d "The Flight on the cards"** *(2026-07-14, superseded into v3.3)* — Recipe cards go **double-sided**
(cost face / **BREWED** face — a big check): flip on the first brew of that beer. The flipped cards ARE the
Flight — the unlock currency AND the ladder record: **the Flight now scores distinct beers BREWED** ⚙ (was
delivered; one on-component record, per the component-state hard line). The player board sheds its Flight
strip, recipe rack and rules box (pure slots); **Gruit + Hopped become starter cards** (one each per player;
Gruit dealt flipped — the warm start). With v3.2a (displaced tiles pay +3★), v3.2b (launch rows cube-marked),
v3.2c (Gain-recipe/specialist cask actions free).

**v3.2 "Three Coins"** *(2026-07-13, `play.html` KEY `hanse-v32`)* — The Hall study (`archive/records/HALL-STUDY.md` — Orléans/
Altiplano/Hamlet research + the internal bonus catalog + the pairings miner) diagnosed the v3.1 Hall as
transactional: 11 of its 13 honors duplicated rewards purchasable in 3–7 other systems. The designer ruled
Direction E v2 canon: **each shelf prints THREE one-shot COINS — FAME (pure ★: 5/7/10/13) · CRAFT (a novel
power, now: batch-brew · double gyle · double load · age-all-to-Ready — mined from real-game pipeline friction)
· FAVOR (a free thing: +4 goods · 2 recipes · a free kontor delivery NOW · a Building/Specialist)** — an
enshrine buys exactly ONE (points and powers unbundled), or **launches** for ★ = quality (the never-nothing
volume floor). And **the presence clock**: 14 discs per house, **public**; every delivered cask (kontor or
Hall) and every presence bump spends one; the last disc placed sets the final round — the runway is countable,
and majorities compete with guaranteed ★ for the same discs. Enshrines stop ticking the ships track (free
enshrines keep the Hall hot early); the Sailed-Ships track retunes 7/10/13 → **5/8/10** and runs alongside —
first trigger fires. The 2p prestige watch and the Masters'-Shelf presence-honor coupling (v31-pressure W1)
both dissolve — the presence honor is cut; presence now costs clock. *Component consequences:* the Three Coins
Hall board (12 coin spaces), 14 presence discs/colour (was 12), END marks at 5/8/10.

**v3.1 "One Row"** *(2026-07-12, `play.html` KEY `hanse-v31`)* — The first human-vs-Cellarmaster playtest
(76–28 in 8 rounds; the log in the session record) ruled four dials and one structure. **THE STRUCTURE — the
player board is ONE ROW:** the vessel row, Specialist row and flip shelf collapse into a single Floor line of
**7 printed slots** (slots 1–2 open; covers on 3–7; **slot 1 printed VESSEL-ONLY** so a tile can never take the
last brewing slot). A slot holds ONE of: a maturing cask · a seated Specialist · a face-down flip. **The Flight
is the forcing mechanism** — each new distinct beer BREWED (from the 2nd) auto-opens the next cover (the
row-choice is gone); the Coppersmith (reworked: +1 Floor slot, seats no tile) and the High Board honor open one
too. Seat an upgrade early → brew one-at-a-time until the next new beer. **THE DIALS (playtest findings):**
Bruges Hanzehuis die 4→3 (the 1G-Gruit-through-die-4 pump paid 5★/grain — the Q1 port's charter now pays less);
Connoisseur's Cellar die 5→4; the Hall rows 3/5/7/9 → **3/5/6/8** (the shelf honors carry real value — free
Building/Specialist/unlock — so the high rows pay less raw ★); SAILED_CAP 2p 6→**7** (one seat raced the
6-clock out in 8 rounds, ending the game before the engine player's first Mumme paid). *Lesson kept: the port
gate is itself the quality read — Bruges needed a smaller die, not a minq gate.*

**v3.0-A.1 "Pickup Pays the Fee"** *(2026-07-11, `play.html` KEY `hanse-v3a-v2`)* — Designer-ruled tightening of
commissioning: placing a hull **onto a cask slot** is legal only when that cask **qualifies for the hull's printed
destination** (the existing effective-quality gate), and the dockside pickup now **consumes the commission's free
load** — boarding that cask is the whole reward; no second load. Empty-slot commissions keep the full free load
(any player's deployed cask, or a Ready cask from your vessels). The printed squeeze: a ring of parked Q1 Gruits
walls off every higher-gate hull (a Bruges hull still boards Q1) — the intended answer is over-deploying better
beer (the Q1s sour) while the Gruit source-lines keep the table flush. *Gates: sim 500/count 0-crash, pace 97–100%
in band; verify-v3 51/51; render-smoke + fast ladder PASS.*

**v3.0-A "Path A" — the keystone rebuild** *(2026-07-11, `play.html` KEY `hanse-v3a-v1`)* — The full build of
`archive/records/V3-PATH-A.md`: the designer-ruled synthesis of the clean-context FRESH-EYES exploration (two independent passes)
and the 2026-07-11 physical playtest ("too much at each station; too much in the slots; the Floor should be the
engine you build"). The prior live build (v2.9.1, KEY v94) is archived, playable, at `archive/v2.9/`. Eight moves,
one build: **(1) stations compress to printed THIS-or-THATs** — Market SOURCE/ACQUIRE · Brewhouse
BREW/DEPLOY-anywhere · Cellar AGE/UPGRADE (+Blend exp) · Harbor LOAD/DISPATCH; Tap is retired (its recall job →
over-deploy's tap-out; its cash job → the Floor). **(2) Slot locality** — a slot's stop acts ON THAT SLOT; the
stations keep the two wharf-wide valves. **(3) Over-deploy** — your own lower READY cask is tapped on the way out
(its action fires once, then boxed); anyone's Q1 sours (boxed, no action); Staithe-maturing casks safe except the
Q1 rule. **(4) One-read dice** — a Privilege prints ONE die number, set once at departure; the v1.8 quality
premium, the cap-6 sum rule, and the ship-slot sail-bump are deleted as arithmetic (their job moves into printed
values: Novgorod's scale, the shelf gates, Connoisseur/Burgomaster); Rich Berth reworked (sails one berth short),
Gauger + Festkeller cut, five new works in (Pilot's House · Open Staithe · Rope Walk · Grain Exchange · Mission
Quay — the last three print an ACTION on their slot's stop: the wharf grows action spaces as it is authored).
**(5) The Hall becomes a shelf board** (the Orléans read) — four quality-gated shelves (row ★ 3/5/7/9 kept as the
labels), one printed honor per space, claimed with cubes, n+1 active spaces, never-nothing overflow; Enshrine +
Charter fold into the one Harbor DISPATCH (a deployed cask → the Hall free, or a kontor via contract + fare).
**(6) The Floor is STAY-HOME** — an alternative to moving (Age-3 pool + every vessel cask's action + ≤2 flip
Wilds; null Floor illegal; never tolled) and **flips score NOTHING** (the floor-points lane removed — a flip is
engine, not score; closes the self-overbuild mint). **(7) The Flight is (also) an unlock track** — each distinct
beer BREWED (from the 2nd) removes a cover from the vessel row (to 4) or Specialist row (to 4); delivered beers
still score the ladder. **(8) Nine specific-gain cask actions** ("what do I get" is printed); Convert → the Grain
Exchange, the pool Wild cut. Component consequences: the Hall shelf board, player boards with unlock covers + a
2-space flip shelf + the Flight/unlock strip, the hull as a carrier (numbered berth wells holding cask cube +
demand die + 1Q marker), cask cubes. As-built deviations + the ⚙ shortlist: `archive/records/V3-PATH-A.md` §11/§14. *Gates: sim
500/count 0-crash/0-deadlock, pace 95–100% in band; ai-ladder 600 all rungs ≥60%, 0 errors; render-smoke ALL PASS
incl. expansions; verify-v3 46 targeted rule checks; an independent plan-vs-build audit (16 findings, all fixed
or recorded). First strong-play corpus (162 games, GM/CM/mixed — `playtests/logs/v3-corpus/REVIEW-v3-corpus.md`):
clock-dominant (158/162), pace 17–19 rounds, tick economy carried over intact, every new mechanism live, the
Hall's presence honors couple it into the majority race; watch-items W1 (2p majority weight) and the MC tiers'
under-authored demand lane. Behavioral read (`BEHAVIOR.txt`): the winning shape is the full-breadth ladder —
chaff early for presence/unlocks, 2–3 premium casks late split between Novgorod and the shelves; Bock the best
performer (4.24★/kontor cask · 47% of deliveries in winner hands); flight 16+ wins 70%.*

**v2.9.1 "Graded at the Gauge" — a gate adjusted is a quality adjusted** *(2026-07-06, `play.html` KEY v94)* —
Designer clarification off the v2.9 review: *"when a gate is adjusted with a building, it should also adjust the
quality — hopped is Q3 for scoring."* The **Gauger's Office** was the one gate-only adjuster (it admitted a cask
above its quality but scored it at the un-lifted value — the actual root of the v2.9 zero-point bug); it is now a
**QUALITY lift, one rule with the kilns**: +1 effective quality (cap Q5), counted for **gates and points alike**
(engine: `caskEffQ` gains the gauger; the separate gate-relief in `gateNeed`/`commPickupOK` is removed so it can't
double-count). A gauged Q2 into Novgorod scores as Q3 (2★); a gauged cask enshrines a rung higher — exactly as a
kiln'd cask always has. The **≥1★ kontor floor stays** as the backstop for the two remaining sub-gate doors:
**Customs-admitted boardings** (the ship's bar drops; the beer isn't better) and **Overland sub-gate road
charters**. *Watch (⚙): the Gauger is now a costlier Malt Kiln twin (3G/qty1 vs kiln 2G/qty2) — candidate for a
distinct identity or a reprice.* *Gates (KEY v94): `verify-v94` 18 checks PASS (grading · no double-count ·
the Customs backstop · rent · floor bonus · spoilage) · sim 500 → 0 crash/deadlock, pace in band · render-smoke
ALL PASS · ladder: 0 errors, fast tiers pass; the GM rung reads 58.3% (n=120, measured twice — loaded and idle)
at the ladder's 120ms BULK handicap (the gauged-enshrine line feeds the trader's tempo), while **the SHIPPED
in-page GM (250ms) passes at 75.8%** (n=120, idle — `ai-ladder-v94-gm250.txt`); CM 70% at n=30 (an earlier 40%
was n=10 noise). Verdict: every rung ≥60% at shipped budgets — the gate holds; the bulk handicap's shortfall is
a measurement artifact, now documented in the ladder header (re-measure at GUILD_MS=250 on an idle box whenever
the GM rung reads 55–60%; MC tiers are time-budgeted, so concurrent load weakens them).*

**v2.9 "Ground Rent" — the churn priced (the gatekeeper pass, part 1)** *(2026-07-06, `play.html` KEY v93)* —
Designer-ruled off the first standing gatekeeper review (`archive/records/GATEKEEPER.md`, built on 15 narrated sim games + 3
human logs — the overbuild carousel, the enshrine treadmill, and the zero-point delivery were its must-fixes).
Four changes. **(1) Overbuild costs a `1 G` GROUND RENT** — paid by the builder to the stores (self, rival or
neutral alike); can't pay → occupied slots aren't legal targets, and every placement path (Market buy · Survey
· London benefit · Trade Roads grant) prechecks a legal target, so a free building can never force an
unaffordable eviction. **(2) The immediate developer +3★ is RETIRED → the end-game FLOOR BONUS** — a displaced
building banks nothing at displacement; it still flips to its owner's floor (a Wild on its back) and each
flipped building **still on your floor at game end scores +3★ ⚙** (candidate 2 if hot). The floor's 4 slots
stay SHARED with Specialists — the private engine now spends banked-points capacity, and a tile arriving at a
full floor is **returned to the box** (nothing banks — the old "+3 even when discarded" pump is closed, and
self-overbuild no longer prints points). **(3) SPOILAGE** — a Ready **Q4+** cask may deploy ONTO a deployed
**Q1** cask (any owner's, own included): the stale ale is boxed, the premium cask takes the berth (buffs the
climb; unclogs the Gruit squatters the playtest logs flagged; hops preserve — thematically exact). **(4) Every
kontor pays ≥1★** — Novgorod's Q-scale floors at 1 (a Gauger/Customs-lifted below-gate cask used to sell for
0; the "sell beer for nothing to end the game" clock exploit is gone). *Rejected from the same review (designer):
the Hall one-rung-per-tier limit (the Hall stays a repeatable, competitive destination — the alternative path,
not a Flight clone) and the Taproom (conflicts with the Hall's and the Floor's identities; tabled).* Plus a bot
fix: `aiDeploy` no longer parks casks under ship-target privileges (Rich Berth/Festkeller — the die could never
set). *Gates (KEY v93):* sim 500 → **0 crash/deadlock** at 2–4p, pace in band (2p 15.8 / 3p 17.3 / 4p 16.9;
95–100% in 12–25; ~95–98% clock-ended); ladder 600 **PASS** (GM 75.8 / CM 60.0; `ai-ladder-v93.txt`);
render-smoke ALL PASS; the same-seed narrate re-runs kill the carousel (3p-3 dev 12→0 · 3p-4 dev 45→12;
spoilage, rent, and the can't-pay guard all fire). The **ai-tune run was REJECTED on gate** — its DEFAULTS
had drifted from the live AI_W so "beats the incumbent" was mis-baselined, and adopting broke the ladder
(GM 59.2%); weights kept at v1.3, DEFAULTS re-synced (`ai-tune-v93.txt`). *Watch (⚙): the floor-bonus
value (3 vs 2) once persona/human data lands; dev-share of table scores (target < 10%); whether spoilage
wants a Q2 extension (currently Q1-only); **the prestige/Hall lane runs hot in the v93 PATHWAYS read**
(3p 50.3% / 4p 35.9% vs fair 33.3/25 — the designer wants the Hall competitive, values are the later dial).*

**v2.8 "Deploy First" — the final vessel-outlet grammar** *(2026-07-05, `play.html` KEY v92)* —
Designer-ruled, three points. **(1) Deploy first, everywhere:** Load, Charter and Enshrine all require the
cask be **DEPLOYED** — the Charter's old vessel reach (v2.2's "one of two doors") is gone; a public showing
is the price of every sale, and the risk (a rival may ship your public cask somewhere you didn't want) is
the point. **(2) The Quaymaster is the one invested exception** — Load, Charter or Enshrine straight from
your own vessels (3G + the buy action; supersedes v2.7 "Quaymaster's Key", KEY v91, which had opened
Enshrine-from-vessels; v2.8 completes the trio with Charter). This is the tile's whole identity: it buys
out the public-showing risk. **(3) Commission is the one universal vessel-direct door** — its free load now
takes **ANY player's deployed cask** (rival-loading rules: owner scores, commissioner takes the 1G + chose
the destination) **or a Ready cask straight from your own vessels** ("we want to promote that" — designer).
*Why:* one memorable sentence replaces three per-verb exceptions; the Quaymaster gets a sharp, sellable
job; commissioning gains real pull as the only free vessel outlet. *Gates (KEY v92):* `verify-v92` 11
checks PASS + v87 (two tests updated to the new grammar) /v88/v89/v90 green; sim 500 → **0 crash/deadlock**
at 2–4p (the deadlock watch after Charter lost universal vessel reach — commission's vessel door + the
Quaymaster cover it), pace in band (2p 15.6 / 3p ~16.7 / 4p 16.2, ≥95% in 12–25, ~98% clock-ended);
render-smoke ALL PASS. *Watch (⚙): the Quaymaster's pick-rate (it now sells risk-avoidance — re-probe
parity); charter rate at 4p held ~2.3/game.*

**v2.6 "Dockside Pickup" — commission onto casks** *(2026-07-04, `play.html` KEY v90)* — Designer-approved:
**Commission may place the face-up ship ONTO a slot whose cask can board it** (effective quality vs the
gate; Customs/Gauger on that slot count) — the cask **loads at once as a normal load** (its dock privilege
captured on the die; **a rival's cask follows the v0.12 rival-loading rules** — owner scores on delivery,
the commissioner chose the destination and takes the 1G). The regular free-load follows; **a hull filled by
the pickup sails immediately** ("boats pick casks up; commissioning is worth more" — designer). No new
arithmetic: cask-target tiles set the die, ship-target tiles bump at sail — disjoint, no double-dip.
*Gates (KEY v90):* `verify-v90` 8 checks PASS + v87/v88/v89 green; sim 300 → 0 crash/deadlock, pace in band
(avg ~16, band 98%+); render-smoke ALL PASS. *Watch (⚙): pace — the Cog insta-sail combo adds sails/turn;
`SAILED_CAP` is the dial if the round count drifts down.*

**v2.5 "Warm Wharf" — the table-feel pass** *(2026-07-04, `play.html` KEY v89)* — Two designer asks.
**(1) Greyed, not hidden:** every stop / harbor option now renders but is **disabled when it has no legal
effect right now** (`stopAvail`/`actAvail`/`btnOff`) — the list re-renders after each stop, so **resolve
order can light a greyed stop up** (deliberate: "I may choose the order of actions to make it activatable").
**(2) Two NEUTRAL starting Buildings:** setup deals 2 random **green** Buildings (transform verb — a
PRIVILEGE is a personal grant and is never neutral) from the deck onto open slots, owner-less, alongside
the 2 warm-start ships — the wharf opens with working infrastructure; overbuilding a neutral tile banks
nothing and discards it. *Gates (KEY v89):* `verify-v89` 10 checks PASS + v87/v88 still green; sim 300
0 crash/deadlock, pace in band; render-smoke ALL PASS. *(Parked to discuss: commissioning a ship ONTO a
slot with an eligible cask, auto-loading it — the designer's Bruges-ship-onto-a-Gruit example.)*

**v2.4.1 — the naming pass: PRIVILEGE · BUILDING · SPECIALIST** *(2026-07-04, rides KEY v88 — display
text only, no state change; the v2.1.1 precedent)* — the designer settled the triad: the green
serves-everyone slot tiles are simply **BUILDINGS**; the purple private tiles become **SPECIALISTS**
("improving your personal Brewhouse board" — you hire them); the blue owner-only tiles stay
**PRIVILEGES** (Stapelrecht, charters, favors — personal grants). The shared Market display is the
**Wharf display** (it holds both slot types). Badges, prompts, logs, aid, rules, manifests, and both
printables kits re-labelled; `value`/`transform` remain internal verb keys.

**v2.4 "Three Tiles" — the tile-taxonomy + Floor-lane pass** *(2026-07-04, `play.html` KEY v88)* —
**The designer-directed follow-through on the improvement-parity / buildings review** (the probe evidence:
`playtests/probe-imps-v87.txt` — a −1.5…+17.3 win-rate spread across the seven improvements — and
`probe-bldgs-v87.txt`). **(1) Three first-class tile types, colour-coded on every surface** — the designer's
fix for "buildings" covering two behaviours: **PRIVILEGE** (bright **blue** `#2e7bab`; the owner-only value
tiles on the slots), **WORK** (**green** `#3f5c30`; the serves-any-dock transform tiles), **IMPROVEMENT**
(**purple** `#5b3a8e`; the private brewery tiles). Mechanics unchanged from v2.3 — the pass renames and
recolours (tile badges now read *Privilege / Work / Improvement*; `value`/`transform` survive as internal
verb keys only; ownership, display-and-place, overbuild all stand). **(2) London's benefit is a CHOICE** — a
free Building (display → placed at once) **or** a free Improvement (display → yours at once) ⚙. **(3) The
`Hire` cask action** joins the Q3+ pool (like Wild's Q4+ gate): take an eligible Improvement from the Cellar
display, free — the improvements' Survey, and a second access path that lifts the family's floor ⚙. **(4)
Floor-lane buffs** (the designer's vertical-integration lane — *"do I compete and pay fees in the crowded
wharf, or vertically integrate on my Floor?"*): **Lagering Cellar** now ages **EVERY** maturing cask +1 each
of your turns (was one) and costs **2G** (was 3); **Extra Vessel 4G→3G**; **Private Quay 4G→3G**; **Hop
Garden 3G→4G** (the +17-pt probe outlier pays a premium in the hops-led economy). Left alone by direction:
**Connoisseur & Festkeller** (human favourites that justify the quality path against the Q2/Q3 ceiling), the
**Almoner** (it sets the die; watch the load-vs-delivery lead drift), the **4-tile improvements area** (kept
as the Floor-lane brake). **The Hanse Diet is deferred** (parking lot: +4-where-you-lead candidate, no
presence grants). *Gates (KEY v88):* `verify-v88` — **13 checks PASS** (re-prices · per-vessel Lagering ·
the Hire pool gate/picker/dead-case/AI-auto · London's improvement path + AI fallback · the type badges);
`verify-v87` still green (the v2.3 arithmetic untouched); base `sim.js 500` + PATHWAYS 400 + EXP/JOPEN 300 +
OVERLAND 300 → **0 crash/deadlock, pace in band, clock-dominant**; improvements now actually flow (2p
~0.7→**1.7**/game, 3p ~**4.2** — Hire is the feeder); `ai-render-smoke` **ALL PASS**; `ai-ladder 600` — **0 errors**, fast
rungs pass (journeyman 89.7 · trader 72.8); the two MC rungs re-measured **sharded at real budgets, 10
games/shard** (the new shard discipline): **GM > trader 66%** (50 games, `GUILD_MS=250` — the in-run 59.2%
was the throttled-budget artifact) and **CM > GM 74%** (50 games, `CELLAR_MS=220`) — **ladder PASS**
(`oracle-tgm-v88.txt` · `oracle-gmcm-v88.txt`); `ai-tune` → **KEEP the incumbent `AI_W`** (best 50.9%).
*PATHWAYS (⚙ recorded not dialed):* prestige stays the hot greedy-persona lane (2p 58 / 3p 41 / 4p 35 vs
fair 50/33/25 — same direction as v87); holding the Hall-curve dial until the improvement economy settles
and a human table reads it.
*Parity re-probe (`probe-imps-v88.txt`):* the free-grant spread **compressed 19 → ~13 pts** and the outlier
tamed (Hop Garden **+17.3 → +8.0**; Cellar +4.5 · Lagering +4.0 · Granary +1.5 · Crane −0.5 · Vessel/Quay
−4.8) — with Hire + the cheaper prices, everyone gets improvements, so any single tile's marginal value
drops (the intended floor-lift; note a granted tile also pre-fills one of the 4 area slots, a real cost now
that the area is the Floor-lane brake). **New watch-item — the 2p/3p first-seat edge widened** (greedy sim:
2p spread 2.0→6.0 pts, 3p 2.6→6.6; trader-mirror baseline P1 53.3→59.8%): at 2p the improvement deck holds
ONE copy of each type (n−1) and P1 now reaches it first via Hire. Candidate dial if human play confirms:
2p deck = n copies (not n−1), NOT seat compensation (the v1.7 lesson — it over-corrects). Recorded.

**v2.3 "Privileges & Works" — the delivery-arithmetic keystone** *(2026-07-04, `play.html` KEY v87)* —
**The designer-approved rework of the rival "reduced effect" + wharfage tangle** (Path C of the 2026-07-04
options exercise; the parked parking-lot conversation, resolved). The design target, in the designer's words:
*complexity from strategy, not analysis — deep decisions good, hard-because-of-arithmetic bad.* **(1) One
sharing rule along the printed verb** — a **VALUE building is a PRIVILEGE**: it pays **its owner only** (a
Staple Hall / kontor charter / patron's favor is a personal grant); a rival's cargo docking there banks
**nothing** — the v1.0 rival-½ share is gone. A **TRANSFORM building is a WORK**: it serves **whoever docks**
(unchanged in behaviour — now stated as the rule). The audit evidence made this the honest fix: the table
rules never actually stated the ½ (only the engine halved — RULES/index/printables all said "set the die to
the printed ★"), and wharfage fired invisibly on transforms and per-cask from ship-slot buildings — arithmetic
no table could track. **(2) Wharfage retired wholesale** — `wharfageRate`, `p.wharfage`, the score-table
column, the tableau chip, the printables' wharfage chips: no payments between players at delivery, ever. The
building contest is **structural** — occupancy denial (squat on a rival's privilege; they clear you by
rival-loading), overbuild (+3★ banked to the displaced owner), and the occupancy toll. *(Lesson honoured:
correct friction with a structure lever, not a value lever.)* **(3) Delivery = starting value + THE die,
nothing else** — the ship-slot value buildings **fold into the one demand die** (a rich berth **bumps its
owner's casks' dice at the sail**; a die-less cask takes one at the bump value; **hard max 6 on the sum** —
the old third scoring term and its uncapped top-end are gone). **(4) Tile redesigns:** **Festkeller** (its "a
FULL ship" condition had been vacuous since v0.16 sail-when-full) → the big-hull specialist, *a HULK here:
each of the owner's casks' dice +3*; **Almoner's Stall** (its wharfage-rate boost died with wharfage) → the
catch-up privilege, *a cask from here to a kontor where you do NOT lead +3★* (the mirror of the Hanse Diet);
**Salt House** stays a goods perk but pays only its owner's casks (a privilege, not a die). The `BTGT`
'owner' target is gone — every building modifies its docked occupant. All magnitudes ⚙.
*Gates (KEY v87):* **`verify-v87` — 30 targeted checks PASS** (privilege die + cap · rival-banks-nothing ·
no-payment · works-serve-rivals · ship-slot fold + the one-die cap · Festkeller Hulk/Cog · Almoner lead/trail
· Salt House owner-only · the v86 regressions: Floor, toll, overbuild, effQ, Cooperage sail, human-gate,
refine, Flight 6→25); base `sim.js 500` → **0 crash/deadlock 2–4p, 96–100% pace-in-band, clock 96–99%**, seats
51/49 at 2p; `EXPANSION+JOPEN 300` + `OVERLAND 300` → **0 crash/deadlock, pace in band**; `ai-render-smoke`
**ALL PASS**; `ai-ladder 600` — **0 errors**, fast rungs pass (journeyman 86.2% · trader 69.2% · GM 61.7%);
the in-ladder GM|CM smoke rung (n=10, tiny budget) read a noise 50%, so the rung was re-measured **sharded at
full budget** (3×25, `CELLAR_MS=220` — `oracle-gmcm-v87.txt`): **Cellarmaster 74.7%** (v86: 73.3%) — **ladder
PASS**; `ai-tune` (CEM) → **KEEP the incumbent `AI_W`** (best challenger 48.5%).
*PATHWAYS re-baseline (400×, ⚙ recorded not tuned):* 2p **prestige eased 56→53%** (the v86 watch-item), deep
~52, majority ~53, volume ~47, demand ~41; **3p prestige reads hot (44.9% vs fair 33.3)** and 4p warm (31.6 vs
25) — expected direction (kontor-lane bots lost the rival-½ income while the Hall's fixed ladder is untouched,
and the greedy personas under-author their own privileges). **Decision: recorded, not dialed** — the CM-vs-CM
oracle (v86) showed the Hall at a healthy 22.5% of strong-play deliveries, the improvement-parity pass is
still parked, and the Hall-curve/Enshrine-throttle dials stay available; re-read after parity + a human table.

**v2.2 "One Grammar" — the rules-consistency keystone** *(2026-07-04, `play.html` KEY v86)* —
**The designer-approved pass that collapses the grown-per-version verb exceptions into single rules** (the
full audit + decision trail: the 2026-07-04 consistency exercise). The ten changes: **(1) The FLOOR is the
standing 3rd line** — move, then choose *row / column / Floor* (every vessel cask's action + a Wild per
flipped building, any order, all optional, resolved through the normal stops picker); the occupancy toll
applies **only to a public line while sharing the station** (the Floor is never tolled; the old toll-fork UI
state is gone). **(2) One vessel-outlet grammar** — *casks leave your vessels only by Deploy or Charter*;
Private Quay stays as the invested exception (it upgrades your Harbor Load to reach your vessels); the
**commission free-load is deployed-casks-only**. Enshrine stays deployed-only — stated as a principle: *the
Hall demands a public showing.* **(3) One gate rule** — every load/charter/commission check uses **effective
quality** (the raw-q variants in `commEligible`/`commLoad`/`charterDest` are gone; a kilned/Duckstein cask
now charters and commission-loads at its effective quality). **(4) Positional building mods** — a building
modifies whatever is docked on it *now* (`slotEffAct`); the Workshop no longer permanently rewrites a cask's
action, and **Tap fires the modified action**. **(5) Overbuild, one rule** — ANY displacement (self = rival):
the owner banks **+3★ immediately** (benefits-when-gained; the flipped card's printed back is the record),
the tile flips to their floor as a Wild, **discarded if the 4 slots are full** (no hand exists). **(6)
Buildings always from the display, placed at once** — Market buy, London benefit, Survey; the entire
buildings-in-hand concept is CUT (`p.hand`, `placeHeld`, the off-turn `pendingBuilds` queue, both blind deck
draws) and there is **no starting building**. **(7) Benefits resolve when gained, owner's choice** — whoever's
turn it is (Bruges goods-mix · Bergen Reach · London building+placement · **Novgorod refine is now a choice**
of which maturing cask); AI-owned pendings auto-resolve, human-owned pendings **pause an AI's turn via the
human-gate** (the pass-the-device moment). **(8) The demand die is a real d6** — building ★ + the Q4/Q5
premium, SET not accumulated, **hard max 6** (the overflow badge is gone); destinations never touch the die
(they are the cask's *starting value*). **(9) Jopenbier joins the Flight** ("a beer you brew like the
others") — six types with the capstone on, `FLIGHT_PTS[6]=25` (the formula's own (n−1)²; also closes the
6-distinct-beers-scored-zero hole). **(10) A ship sails whenever it becomes full** — including when its
capacity *shrinks* (a Cooperage overbuilt under a part-loaded hull was a strand). Plus dead-state removal:
the Novgorod free-recipe flow, `enterBldgLine`, the `BTGT` 'line' target, `p.commissioned` ("merchant goal").
*Gates (KEY v86):* **`verify-v86` — 26 targeted checks PASS** (Floor stops · toll public-only · overbuild
banking/flip/discard · die cap 6 · commission pool/effQ · vessel-charter effQ · the Cooperage sail · the full
human-gate benefit flow · refine choice · Flight 6→25); base `sim.js 500` → **0 crash/deadlock 2–4p, 98–100%
pace-in-band, clock 96–99%**, seat spreads healthy; `EXPANSION+JOPEN 300` and `OVERLAND 300` → **0
crash/deadlock, pace in band** (one genuine bug caught and fixed at the gate: `aiPickBuilding` made null-safe
for sim/human seats); `ai-render-smoke` **ALL PASS** (its Jopenbier assertion updated to the new Flight rule);
`ai-ladder 600` **PASS — 0 errors, every rung ≥60%** (journeyman 87.7% · trader 71.5% · GM 62.5% · CM 60.0%;
mixed 3–4p tables 0 errors); `ai-tune` (CEM, 10 gens + confirmation) → **KEEP the incumbent `AI_W`** (best
challenger 44.3% vs incumbent — the v2.2 grammar didn't shift the Trader's weight landscape).
*Oracle runs (sharded, full budgets — `playtests/oracle-gmcm-v86.txt` / `oracle-cmcm-v86.txt`):* **GM-vs-CM
73.3%** to the Cellarmaster over 75 games at `CELLAR_MS=220` (the ≥60% gate holds with room; v84 A/B was 66.7%);
**CM-vs-CM mirror** (36 games) — ~17.9 rounds, winner ~33★, delivery share **Bruges 41% / Hall 22.5% / Bergen
17% / London 13% / Novgorod 6%** (Enshrine a real lane at strong play), win-rate climbing with Flight breadth
(3-tier 54% → 4-tier 65%).
*Watch-items for the persona oracle (⚙, recorded not tuned):* the PATHWAYS lanes moved with the die cap +
benefit changes — 2p prestige reads **hot (~56%)** with deep ~53% and majority ~37% (3p ≈ 29/33/36/28/36) —
re-baseline after the parked wharfage/rival-effect and improvement-parity conversations rather than dialing
now; the die cap trims only the top-end premium combos (Connoisseur/kontor charters + Q5 → 6). All numbers ⚙.

**v85 — "Frankfurt opens": the deep-node 2-slot cap is lifted** *(2026-06-28, `play.html` KEY v85)* —
The Trade Roads' deep ◆ terminals were hard-capped at **2 active slots** regardless of player count
(`olSlotsActive`: `if(node.deep)a=Math.min(a,2)`), which orphaned two of **Frankfurt's** four printed
Rhineland slots — its **+2 age** and **+6★** were never claimable. v85 **removes the cap**: every node —
deep or not — now scales **n+1**, bounded by its printed slot count, so **Frankfurt's 4 slots all activate**
(3 at 2p · 4 at 3p+) and **Pskov** stays scarce simply by having a single printed slot. "Deep ◆" now denotes
a high-gate terminal, not a 2-slot cap; scarcity is the slot count. Also folded in — a **physical-component**
change with no engine effect (`play.html` doesn't model the cask supply, so it lives in `COMPONENTS.md` + the
printables): the **cask floor is raised to a minimum of 6 tiles per type** (Bock 4→6, Jopenbier 3→6) for
"more cask tiles." *Gates (KEY v85):* base `sim.js 500` → 0 crash/deadlock 2–4p, pace in band, clock-dominant;
`OVERLAND=1 sim.js 500` → 0 crash/deadlock 2–4p, **100% pace-in-band**, clock 91–97%; `ai-render-smoke` (incl.
Overland + the Cellarmaster with all three expansions) **PASS**. Bump discards stale v84 state.

**v84 — "Cellarmaster bites": the deep-MC rollout policy becomes the Trader** *(2026-06-28, `play.html` KEY v84)* —
The **Cellarmaster** (the deep Monte-Carlo arch-nemesis) ran *journeyman* rollouts, which ship to the first
fillable hull and never model deliberately stacking the rich anchors (Bergen 9 / Novgorod 8) — the lane a strong
human wins on. v84 switches its rollout policy to the **Trader** (`CELLAR_ROLL='trader'`: value-ranked
destinations + `aiMajSwing` + the Hall), so the deep playouts finally price anchor-stacking. Equal-budget A/B
(CMN=30, CELLAR_MS=220): the trader-rollout Cellarmaster beats the Guildmaster **66.7%** (vs the journeyman
rollout's 50%) and plays tighter (rounds 22→18, clock 77%→100%). The Guildmaster keeps its journeyman rollout
(the fast robustness oracle). **AI-only — no rules/engine/state-shape change;** the KEY bump just discards stale
v83 saves. *(The `v2.1.1` repo-wide doc/printables alignment pass rides on this same KEY — no rules change.)*

**v83 — "Free Tap": the Cellar's Tap becomes repeatable (multi-tap per visit)** *(2026-06-27, `play.html` KEY v83)* —
The Cellar **Tap** (discard a Ready cask from a vessel/slot → fire its action once, freeing the vessel or
recalling it off a slot) was **once per visit**. v83 makes it **repeatable**: tap any number of your Ready casks
in one Cellar visit, in any order with **Age** (still once — it's a fixed pool), **Blend**, and **buy-Improvement**
(which already repeated). So *Age · Tap · Tap · buy an Improvement* is one legal visit. **Why:** the once-cap was
an artificial restriction on the only flexible station; lifting it lets a held-cask-heavy brewery cash several
casks' actions (and unclog several vessels) in a turn — a real engine/Floor-adjacent play, and a stronger
relief valve for the wharf-clog Tap was added (v1.3) to cure. **Self-limiting:** each tap *consumes* a cask, so
the option is bounded by your Ready casks (no loop), and tapping spends cargo you could have shipped/enshrined —
a genuine trade-off, not free value. **Engine (small diff):** `cellarCanTap` drops the `usedTap` gate; the render
shows a Tap button per Ready cask every visit; `usedTap` is **repurposed as a throttle that keeps the greedy
AI/sim bot tapping once** (jam-relief) so the v82 robustness/balance profile is preserved for a clean A/B; the MC
`legalActions` already enumerates per-target, so the **strong AI (GM/CM) gains multi-tap** as a real search
option. **Methodology (same as v82):** the greedy bot is throttled → `sim.js` is a no-regression gate only; the
real measure is the **MC oracle** A/B (does multi-tap shift the strong AI's pace — more taps = fewer voyages =
a slower clock? — or its win composition). *Gates (KEY v83):* `verify-cellar` (rewritten test (c): two Ready
Gruits → both tapped in one visit, +4 grain) + `ai-render-smoke` (incl. full Cellarmaster w/ all expansions, now
free to multi-tap) **PASS**; base `sim.js 500` → **0 crash/deadlock 2–4p, ~98–100% pace-in-band, clock-dominant**
(unchanged vs v82, as designed); AI-ladder (**errors 0** across 28 MC rungs; tiers healthy) + GM/CM oracle A/B (v83 vs v82) in
`playtests/oracle-{gm,cm}-v83*.txt`. **Measured verdict (2p oracle, small-N/directional):** multi-tap lengthens
strong-AI games a **mild ~+1.5 rounds** (GM 21.2→22.6, CM 21.1→22.8 — the CM ships slightly fewer casks,
1.7→1.5/player, since a tap spends cargo), still **well inside the 12–25 band** (ceiling 25); GM's **winner
ceiling rose** (29.6→35.7 — it extracts more value from the freed option); upgrade acquisition is ~flat. So the
change reads as a **small buff to the strong-AI's engine play** with a **modest pace cost**, no robustness/ladder
regression. *(Open ⚙: if multi-tap ever pushes strong-AI games to the ceiling systematically, the lever is the
clock `SAILED_CAP`, NOT re-capping Tap — per the lessons; and the greedy bot could be taught to exploit multi-tap
so `sim.js` prices it. At +1.5 rounds, no action needed yet.)*

**v82 — "Scarce Improvements": the private upgrades become a contested deck + display of 4** *(2026-06-27, `play.html` KEY v82)* —
The private brewery improvements were an **always-available catalog** (every house could fit one of each of the 7
types, supply-unlimited). v82 makes them a **shuffled deck of `n − 1` copies of each type** (n = players: 2p →
7 tiles · 3p → 14 · 4p → 21) feeding a **face-up display of 4** at the Cellar that refills from the deck — the
**same deck/display grammar already used for the Buildings** (`buildImpDeck`/`refillImpDisplay`/`takeImpFromDisplay`,
mirroring the building functions; `IMP_DISPLAY=4`). **Only the 4 face-up tiles are buyable**, and with `n − 1`
copies the table **competes** for them — not everyone can fit every improvement, so the engine choice gains the
same scarcity/contention the public slots already have (the 4p ring's tension now reaches the private engine).
Wiring kept the blast radius small: `buyImprovement` takes the tile from the display + refills; `cellarCanImp`,
the in-page `aiCellar`, and the MC `legalActions` all gate on `S.impDisplay`; the Cellarmaster/Guildmaster MC
playouts **shuffle the hidden `impDeck`** per playout (determinized, like the building deck); the render shows
the display with a deck-left count; the debug payload prints it. The Overland "free Improvement" Staple Right
stays a **granted fit** (not a purchase from the display), so the expansion is untouched. **Methodology note (the
key read):** the **greedy sim bot buys ≈0 improvements** (the long-documented blind spot — robustness sim shows
`bought 0.0/game`), so `sim.js` is *inert* to this change and only serves as a no-regression gate; the genuine
measure is the **MC AI (Guildmaster/Cellarmaster) oracle**, which *does* buy improvements via search — so the
ladder + the `sim-analyze` GM/CM cohorts (upgrades/game · first-upgrade timing · win-rate) are the real test.
*Gates (KEY v82):* `verify-cellar` (the Tap→Buy chain, with Granary forced face-up) + `ai-render-smoke` (incl. a
full Cellarmaster game with all three expansions, through the real render layer) **PASS**; base `sim.js` 500 +
OVERLAND 300 → **0 crash/deadlock 2–4p (+5p), 100% pace-in-band, clock-dominant**; AI-ladder + GM/CM oracle A/B
(v82 vs v81) recorded in `playtests/`. *(Open ⚙ for the persona/strong-AI oracle, not the greedy bot: whether
`n − 1` copies + a 4-wide display is the right scarcity, or the display width / copy count wants a tune; and
whether the greedy/persona bot should be taught to value improvements so `sim.js` can price the lane.)*

**v81 — Overland: a human-playtest tuning pass (charter east · Novgorod=quality · n+1 slots · manual brew · free casks)** *(2026-06-22, `play.html` KEY v81)* —
Five interlocking fixes from a live 2p playtest, all ⚙. **(1) The charter opens the EAST at its next road node, not the
kontor sea gate.** Visby's gate is Q2, but the only eastern voyage trigger was shipping/chartering to the **Novgorod
kontor** (Q3 sea gate) — so a Q2 couldn't reach Visby (reachability was effectively Q3 though the board read Q2). A
charter now gates on the **next unreached road node** (`olCharterGate`; east-only — the west kontore already match
their road's early-node gates), so a **Q2 Hopped opens the eastern lane at Visby** early. A *sub-gate* charter advances
the caravan + claims the node but takes **no under-gate kontor sea benefit** (so a Q1 can't farm London's Building, etc.).
**(2) Novgorod pays ★ = the delivered cask's effective quality** (`qpts`: Q3→3 · Q4→4 · Q5→5) — the deep market finally
rewards the climb on arrival (was a flat node ★). **(3) n+1 active slots per node** (2p→3 · 3p/4p→4; deep ◆ stay scarce
at 2) — at 2p the old 2-slot towns felt too rigid to make the network a real space of choice. **(4) The `brew` slot is
MANUAL** for the active player — choose a recipe you hold + pay it (via the existing brew picker; off-turn/AI/sim
auto-brew the highest affordable, so harness coverage holds). **(5) NEW free-cask slots** rack a **free Gruit** (Cologne)
/ **free Q3** (Frankfurt) straight into an open vessel — the Rhineland *craft* lane gets a way to cellar a cask without
the Q2→Q5 procession (Frankfurt traded its flat-points slot for the free Q3, keeping its enshrine outlet). *Decisions
taken with the designer mid-playtest:* Novgorod-only quality scaling (not the whole east, for now); free casks on the
Rhineland craft lane. *Gated (KEY v81):* syntax + `ai-render-smoke` (real layer, all three expansions) PASS; `sim.js`
base + OVERLAND **0 crash/deadlock 2–4p**, pace in band, clock-dominant; targeted unit checks confirm the Q2→Visby
charter, n+1 counts, Novgorod qpts (Q5→5/Q3→3), and the free casks. Synced to `printables.html` (the tech-tree diagram)
+ `RULES.md`/`COMPONENTS.md` §12. *(Open ⚙ for the persona oracle, not the greedy bot: whether the whole east should
scale by quality, the exact free-cask placements, and a richer "skip the procession" high-recipe slot if the manual
brew + recipe/quality slots still feel insufficient in play.)*

**v80 — Overland: the western 4-player slot duplicates the lane signature** *(2026-06-22, `play.html` KEY v80)* —
A small Trade Roads tune. A town's active slot count scales with player count (2p→2 … 4p→4) for **supply** (more
claimants need more slots, else everyone is shoved to overflow); the marginal **4th slot** had been a generic
**+★ points** filler everywhere. The **western** towns now make that 4p slot a **duplicate of the lane's signature
bonus** instead — **Cologne/Tønsberg → a 2nd brew · Antwerp → a 2nd Building to hand · London → a 2nd free
Improvement · Bergen → a 2nd vessel** — so the extra-at-4p slot *reinforces lane identity* rather than paying
anonymous points. The **East stays as-is** (it IS the depth/**points** lane, and its non-points actions are uneven —
Visby's best is a weak +2 age), and the deep ◆ nodes (Frankfurt/Pskov, capped at 2 active slots) are untouched.
Only 4p games change; 2p/3p are byte-identical. *(Lesson applied: the 4th slot's job is supply-scaling, not a points
buff — so a lane-signature duplicate serves that job and the theme better than filler points.)* Sim-gated (KEY v80):
base + OVERLAND **0 crash/deadlock 2–4p**, pace in band, clock-dominant; AI ladder + render-smoke clean.

**v2.1 “Staple Rights” — The Trade Roads, REDESIGNED to claimable slots** *(2026-06-21, `play.html` KEY v79)* —
**Table feedback retired the founder/recurring-perk town model in favour of a slot-claim model** (the Hanse
*Stapelrecht*). Each **town** now carries **2–4 PRINTED SLOTS**, each a **distinct ONE-SHOT bonus** drawn from
across the game and **flavoured by lane** — so the lane choice is an identity, not a number: **Rhineland =
knowledge/craft** (recipe · +quality · +age · free brew), **London = infrastructure** (Buildings to hand · goods),
**Bergen = logistics** (contracts · goods), **East = depth/value** (vessel · +quality · big points; **Pskov = pure
points**). **Claiming:** movement stays **one node per voyage per owner** (quality gates depth — the anti-flatness
rule kept), then **each cask aboard claims a slot at that node, in LOAD ORDER** (first loaded picks first); a 2-cask
voyage to your frontier = two slots. The **active player picks** an open slot (a new `olclaim` picker on the
sail-resolution pending queue, mirroring the Bergen-reach/London-building flow); rivals & the AI auto-pick the
highest-value open slot. **Never nothing:** a full town pays the line's small **overflow** bonus and your road
still extends. Active slot count **scales with player count** (2p→2 … 4p→4); the deep ◆ towns (Frankfurt/Pskov)
stay **scarce at 2**. **The Rhine Charter** added: a **Q4+** Charter takes the *Rhine road* — the cask delivers at
Bruges (full keystone) but the caravan **leaps Hamburg→Cologne, skipping the contested Bruges node** (marked
satisfied, so later Bruges voyages continue to Frankfurt) — the quality brewer's express. **Why the change:**
the recurring perks (esp. `refine` = +1 age **every turn**) were exactly the *per-turn tabletop upkeep* a physical
euro should avoid, and the founder/half-★ model was a flat winner-take-all race; discrete on-arrival slot bonuses
fix both and make each lane *play* differently. The motivating diagnostics were three real 2p games (a Jopenbier
capstone that fell flat — its dock-cellar vintage never accrued because a deployed cask is shipped immediately —
and two Overland games whose recurring perks read as upkeep). *Composes with the v1.4.1 Flexible Cellar* (below).
*Scoring* is still the inland network ★ (node delivery pts + slot bonuses, banked live) replacing majorities.
*Sim-gated (KEY v79, `sim-results-v79.txt`):* base regression + OVERLAND both **0 crash/deadlock 2–4p**, pace
**100% in the 12–25 band** (avg ~18–20 rounds), clock-dominant; `ai-render-smoke` drives the **slot picker + the
Rhine leap** and a full Cellarmaster game with all three expansions on through the **real** render layer; the AI
ladder is clean (0 errors). *Open ⚙ (for the persona oracle, not the greedy bot):* the exact slot magnitudes &
per-lane delivery points (first pass — East currently the point-heavy lane by design); a **manual bonus-resolution**
picker for the choice-bearing slots (v1 auto-resolves the bonus, the player only picks *which slot*); whether to
bump core-city delivery points to sharpen the lane point-gradient.

**v76 EXPERIMENT — the Brewhouse↔Cellar grid swap: TESTED, then REVERTED** *(2026-06-21, sim-gated, not shipped)* —
A playtest hypothesis — swap the Brewhouse(Brew) and Cellar(Age) stations in the 2×2. A mirror-match A/B (360 games,
gm+cm × 2–4p, `playtests/sim-results-v76-swap-ab.txt`) showed it **breaks clock-dominance**: GM games end on the
sailed-ships clock only **23–50%** of the time (base 83–97%), drift ~2–4 rounds to the round ceiling, and score
~2–6 pts lower. **Cause (line-usage probe, real turns only):** the swap pulls **Brew off its shared line with
Source** — you can no longer gather goods *and* brew them in one activation, so Brew firing falls ~28%→22% and the
whole engine slows. (The Age↔Ship split first blamed was a red herring — Age+Ship is the *least*-used line, ~18–21%;
aging is free anyway.) **Lesson:** the load-bearing line is **Source+Brew** (the engine's heartbeat), not the
delivery pairing — and *balancing for its own sake can flatten the texture that makes the game fun*; the occupancy
toll + variable slots already supply the interesting friction. Reverted; the Flexible Cellar (below) was kept and
shipped standalone.

**v1.4.1 “Flexible Cellar” — the Cellar visit becomes an any-order, chaining menu** *(2026-06-21, `play.html` KEY v78)* —
A small UI/flow fix to a too-rigid station. The
Cellar **forced Age first, then exactly ONE of { Tap, buy Improvement }** — which blocked legitimate combos. It is
now a **flexible menu worked through in ANY ORDER until Done — { Age · Tap a cask · Blend (expansion) · buy an
Improvement }** — and, crucially, the steps **chain**: what one step produces is available to a later step *in the
same visit*. The two motivating combos now work: **Tap → Buy** (Tap a Gruit for **+2 goods**, then buy a private
Improvement with that grain) and **Tap → Age** (Tap a "wild" cask to **brew**, then use the Cellar's **Age** on the
freshly-brewed cask). **Age & Tap stay once-per-visit** (Age grants the fixed pool; Tap is the relief valve); Blend
and Improvement-buy repeat while legal (self-limited by Ready casks / goods / the `IMP_AREA_CAP`). *No new powers —
just the removal of the artificial ordering and the "one-of" restriction.* **Engine note:** the menu re-uses the
legacy `UI.sub==='tap'` literal (so the in-page AI and the headless sim/bot keep driving it unchanged) with its real
state on a persistent `UI.cellar` record; each menu choice routes back through `resume('cellarmenu')` so the visit
continues, and the menu auto-exits to the line once no legal option remains. `snapshot()` is taken before every
mutating step, so Undo unwinds one menu step at a time. *Gates (KEY v77):* render-smoke **PASS** (incl. the Blend
path + a Cellarmaster game with all three expansions on); sim 300 = **0 crash/deadlock 2–4p**, clock-dominant
(2p 100% · 3p 96% · 4p 95.7%), pace in band; AI ladder clean. The greedy bots age-first-then-tap/buy exactly as
before (no behavior/pace regression); the new chaining is a human/strong-AI affordance. *(Gates re-confirmed at
KEY v78 after the v76 swap was reverted: render-smoke PASS, sim 300 clock-dominant 2p 96% · 3p 95% · 4p 96%.)*

**v2.0 “The Trade Roads” (Overland) — the inland geography as the Hanse NETWORK** *(2026-06-20, `play.html` KEY v75)* —
The third opt-in expansion, and the successful re-take of the inland geography on the lesson the earlier attempts
taught: **a second geography must be powered by the engine's output and feed back into it — route THROUGH the
keystone, never beside it.** It lands on a small **EXPANSION SPINE** (a `registerExpansion` registry +
`fire`/`collect`/`expSetup`/`expRender` hook seams) so the whole feature is **one self-contained block** the core
never tangles with — adding the next expansion is append-a-module; removing one is delete-a-block.
*The model* (a first **siloed-roads** cut — 4 independent linear tracks, KEY v74 — was reworked at the table's
request into a connected map): the board is a **tree rooted at HAMBURG (home)** with **two roads from the start** —
**West** to the **Bruges gateway** (which branches to **London**, **Bergen**, and the **Rhineland** spur) and
**East** on the long deep haul to **Novgorod**. London/Bergen routes pass *through* Bruges (the gateway is
structurally first); Novgorod is the independent deep lane.
*The loop (rides the Ship action — no new station):* a **VOYAGE** to a kontor (one ship, any casks — full keystone:
demand die · Q4/Q5 premium · the Flight; or a Charter) advances each owner's **caravan ONE node** along that
kontor's route — **per voyage, not per cask** (the fix for the old "2 casks = 2 towns" flatness: casks drive
*value*, voyages drive *depth*). **Quality GATES depth** (you only step onto a node a cask on that voyage can
clear), so **reach (breadth) and quality (depth) both win**. **Presence markers ARE the caravan trail**
(repurposed from the now-majority-less barrels) — the board shows who's gone where & how deep.
Reaching a node, **each cask aboard CLAIMS an open Staple-Right SLOT there, in load order** (v2.1 — the
founder/recurring-perk model was retired as per-turn tabletop upkeep): a **distinct ONE-SHOT bonus** + the node's
delivery ★, **flavoured by lane** — **Rhineland = craft** (recipe · a brew action · +age) · **London =
infrastructure** (a Building — from the display, placed at once (v2.2) · a free Improvement) · **Bergen = logistics** (charter contracts · goods · a
vessel) · **East = depth/value** (a vessel · +quality · big points). A full node pays the line's small **overflow**
(never nothing); active slot count **scales with player count** and the deep ◆ terminals (Frankfurt/Pskov) stay
**scarce**. **Bruges is the lone no-slots gateway** (recipe OR 2 goods); the other kontore — **London/Bergen/Novgorod**
— now **also carry slots**, claimed when the caravan reaches them, on top of their base sea benefit. **Frankfurt** is
a points + free-**Enshrine** outlet; **Pskov** is just a delivery (**one slot +8★, then +5★** each later visit). The
**Rhine Charter** (a Q4+ Charter) skips Bruges → Cologne. **Kontor majorities turn OFF** (`replacesMajorities`);
**Reach / Bergen's benefit re-home** to a caravan road step via the `reach`/`voyage` hooks (no orphans). The caravan
rides voyages so it's **clock-tied** (every step is a Sailed-Ships tick); `SAILED_CAP` **+2** pays it back.
*Gates (KEY v75):* base + EXPANSION **unchanged**; **OVERLAND 300 → 0 crash/deadlock 2–4p, 100% pace-in-band,
clock-dominant**, winner inland **~17–19★** (the siloed cut's ~33★ over-weight corrected); render-smoke clean incl.
a **full Trade Roads test** (voyage → reach the gateway → 2nd voyage founds a town → score → majorities off → salt
perk) + a Cellarmaster game with **all three** expansions on; **ladder PASS, errors 0**. *Watch-items (tuning, ⚙):*
the West-broad/East-deep ★ balance; 2p clock length (clock bonus trimmed 3→2); whether the deep East (Pskov, Q5)
is reachable enough in human play; a road-beer specialty + richer cross-road set-scoring are noted future
extensions. **Specialty Beers & Jopenbier remain inline** (pre-spine) — an optional later migration, not required.

**v1.9 “Beer Atlas” — Option A complete (blending + thematic Buildings); Inland Road / Option B rolled back** *(2026-06-20, `play.html` KEY v73)* —
Two things happened here, recorded together because the second is the reason the first was re-done cleanly.
**(A) Option A is completed** with the two pieces that were "staged next" after the capstone: **Blending** — a
**Cellar** action (with Specialty Beers on): combine **two Ready vessel casks → one premium cask at +1 quality**
(the higher +1, cap Q5; it inherits the higher beer), in a freed vessel — the deep player's *active* turn (reach
Q5 without Bock; a use for two aged casks). A human Cellar action; the v1 AI skips it (a forced render-smoke test
covers the engine). And **three thematic Buildings**, in the deck only when Specialty Beers is on (`exp:true`):
**Salt House** (a cask shipped from here → its owner +1 G +1 H on delivery), **Smoke Kiln** (+1 quality, cap Q5,
via `caskEffQ`), **Parti-Gyle Tun** (deploy a cask here → a free small Gruit to an open vessel; added to
`aiPickBuilding`'s preference). *Gates (KEY v73, `sim-results-v73.txt`):* base + EXPANSION **0 crash/deadlock
2–4p, pace in band**; render-smoke clean incl. the **BLEND test** (two Q3 → a Q4) + a Cellarmaster game with both
expansions on; ladder errors 0. With this, **Option A — the Beer Atlas — is complete**: characters (Specialty
Beers) + a depth capstone (Jopenbier) + the combo/throughput polish (blending + thematic Buildings).
**(B) The Inland Road (Option B) was ROLLED BACK.** It was prototyped across v69–v72 (an additive overland
tech-ladder → a contested charter board → a version that *replaced* the kontor majorities). A post-build audit
found it **sat beside the engine, not through it**: a caravanned cask never ran `deliverCask`, so it **bypassed
the keystone** (value-buildings, the demand die, the Q4/Q5 quality premium) and **never counted for the Flight**;
the v72 "replace majorities" move then **deleted a tuned lane** (Volume — one of the five) for an untuned
charter-count race, orphaning Reach/Keut/presence and mis-counterweighting the Hall. Rather than surgically
unpick it from the latest build, we **reset `main` to the foundation (`82e9aa9`)** — base + Quality Pays +
Specialty Beers + Jopenbier — and **re-applied only the genuine Option-A work** (blending + thematic Buildings),
which had been entangled with the Inland commit `1d8328f`. The Inland work is **preserved on
`archive/option-b-inland`** for a future, properly-integrated Option B. **Lesson:** a second geography must
*express* the engine (route through buildings · let quality/premium matter · feed the Flight) and **extend** a
lane rather than delete one — and keep expansion modules in **separate commits** so one can be dropped without
unpicking another. All numbers ⚙.

**v1.9 “Jopenbier” — the EXPANSION CAPSTONE (a 2nd opt-in toggle)** *(2026-06-20, `play.html` KEY v68)* — **The
depth counterweight that completes the roster arc: a slow, dear, super-valuable Q6 “vintage” beer (Danzig).**
Where the three Specialty Beers add *breadth* (characters across the low/mid band), Jopenbier is the all-in
*deep* play — two incompatible plans on turn one. Its own toggle, independent of Specialty Beers. Design calls,
each chosen to avoid rippling a tuned system: **(1) “Q6” is display-only — scored SELF-CONTAINED** (`deliverCask`
special-cases it: `JOPEN_BASE` 8 at a kontor / `JOPEN_HALL` 9 enshrined, never the Q-keyed Hall/Novgorod/premium
tables), so a sixth rung can’t leak into any balance dial. **(2) Aging-as-value (the novelty the game lacked):**
once DEPLOYED it *cellars on the dock* — **+1★ vintage per owner-turn, cap 5** (`jopenVintageTick` in `endTurn`),
folded into its delivered value; the longer (riskier) you hold it the bigger the payoff, and it stays
contestable on the slot (a rival can hijack-ship it to deny the peak). **(3) Floor synergy:** pinned to
**Source**, so the long ready-4 maturation funds itself on the Floor (the existing vessels-power-the-Floor rule
does the work — no new code). **(4) Always *acquirable*, not drafted** (the looming moonshot every game it’s on)
and **excluded from the Flight** (a capstone, not part of your range — this also dodges the `FLIGHT_PTS[6]`
edge). **(5) The race-to-end:** the slowness + the visible recipe give the end-clock a second job — rivals push
the Sailed-Ships track to deny a maturing Jopenbier. *Gates (KEY v68, `sim-results-v68.txt`):* base regression +
EXPANSION + JOPEN all **0 crash/deadlock** 2–4p, pace in band; `ai-render-smoke` drives the capstone end-to-end
(banks `JOPEN_BASE`+vintage, records Q6, Flight-excluded) through the **real** render layer; ladder 0 errors.
*Note (AI wired — KEY v68 follow-up):* the **Cellarmaster, the deep MC-rollout, and the `sim.js` deep persona
now pursue the capstone** — acquire → bank 4 hops → brew → **cellar-then-cash** (`aiJopenHold`: hold a deployed
Jopenbier until ripe or ending, never strand it; `caskValueAt` prices it self-contained so a ripe one ranks
right). Oracle (`JOPEN=1 CELLAR=1 PERSONAS=1`, `sim-results-v68-jopenbier-ai.txt`): the deep lane lands it
~**0.07–0.11/game** (a rarely-completed moonshot, by design) with **0 crash/deadlock** and the **deep lane
unchanged — slightly-below-fair, do not buff to fair**. So the strong AI is now a real opponent/oracle for it
(human playtests + sim); tuning the capstone's numbers stays a human/strong-MC table question. All numbers ⚙.
**This completes Option A’s core** (characters + a depth capstone); **blending** and **thematic buildings**
remain as optional future polish.

**v1.9 “Specialty Beers” — EXPANSION (opt-in)** *(2026-06-20, `play.html` KEY v67)* — **The first expansion
module: an opt-in toggle that turns the beer roster from a ladder you climb into characters you main.**
*Diagnosis (the unlock):* the base beers are **rungs, not characters** — the two Q3s are near-duplicates, a
deployed cask's slot-action comes from the shared *quality* pile (so the beer name carries no board identity),
and higher quality is strictly *more*. The game has **exactly one breadth incentive (the Flight) and zero
depth incentive** — so maining a single beer is never correct (Keut, with its bolted-on +1-presence, is the
lone exception that proves the rule). *The fix (this module):* a **New Game checkbox** ("Specialty Beers")
that adds three new pinned-signature beers to the export draft (**3 of 7**, C(7,3)=35 ladders vs the base
C(4,3)=4); **OFF by default → the base game is byte-for-byte unchanged** (the whole point — the expansion
never touches the base unless you opt in). *The agency resolution:* base climb beers **keep the steerable
pile**; a specialty beer is **pinned** (its slot-action is fixed/printed) — this just **generalizes Gruit's
existing `pin:true`**, so drafting a pinned beer *is* the agency, and the Orléans-lite steer is preserved.
The three (each one printed signature, reusing existing engine paths so the blast radius is tiny):
**Gose** (Goslar, Q2 `2G`, no hops — the grain-path) — *Salt Trade:* a kontor delivery throws off **+1G +1H**
(liquidity, via `deliverCask`); **Zerbster** (Zerbst, Q3 `3H` — the hop-bomb) — *Parti-Gyle:* brewing it also
fills an open vessel with a **free small Gruit** (the weak second runnings — throughput + the Flight; lost if
no vessel is open); **Duckstein** (Königslutter, Q2 `1G1H`, ready 2) — *Smoke-Hardy:* ships & scores as **+1
effective quality** (reuses `caskEffQ`, exactly like an innate Malt Kiln — a humble beer that reaches the
Novgorod long-haul). *Sim gates (KEY v67, `sim-results-v67.txt`):* **base regression** clean (0 crash/deadlock
2–4p, pace + behavior identical to the v66 baseline — proves the toggle truly isolates) and **expansion on**
clean (0 crash/deadlock, pace 16–17 rounds in-band); `ai-render-smoke` passes including a forced all-specialty
game through the **real** render layer; the AI ladder shows **0 errors** (the 59% journeyman→trader rung is
the documented v1.3 compression, not a regression — base AI/rules untouched). *Known reads / open ⚙ (for the
persona oracle, not the greedy bot — which can't pilot signatures):* the specialty beers skew lower-quality so
the greedy ceiling dips a touch; **Gose's liquidity** wants a persona/strong-AI check for a goods-snowball;
all magnitudes are first-pass ⚙. *Staged next (Option A's arc, each its own sim-gated increment):* **Jopenbier**
the vintage/"Q6" super-beer (aging-as-value + the Floor-works-while-aging hook + the race-to-end drama, scored
**self-contained** so it can't ripple the Q-keyed tables) → **blending** (the deep player's active turn) →
**thematic buildings** (Parti-Gyle Tun · Salt House · Smoke Kiln). Asymmetry stays a *base*-game item, a
separate axis. *(This is the "Beer Atlas" path — content under one grammar, riding the existing deal-3
machinery. Design discussion + the rejected/deferred forks: the Renown depth-track and the eastern kontor are
held as sim-gated maybes; the destination-board swap is the deliberate heavier horizon.)*

**v1.8 “Quality Pays”** *(2026-06-19, `play.html` KEY v66)* — **Uncapped the value-Building bonus to reward the
quality climb.** Base kontor values are tiny (Bruges/London/Bergen = 1), so the in-game points live in the
**value-Buildings** — but those were **flat** (Staple +3, charters +4, Connoisseur Q4+→**flat 4**), so a Q5 Bock
banked the same demand as a Q1 Gruit. Quality only paid at Novgorod/Hall → the climb looked unattractive (the
persona oracle confirmed it: even the *deep* lane delivers only ~0.5 Q5/game). Fix: a value-Building now adds a
**quality premium** on top of its printed ★ — **+1★ per tier above Q2, gated at Q4** (Q4 +2★, Q5 +3★). Gated at
Q4 so it rewards the **climb**, not the cheap Q3 volume game; the Hall’s reliquary is excluded (its 3/5/7/9
ladder already scales). A Bock through a value building is now worth its investment — e.g. Bruges base 1 +
Staple 6 + a Rich Berth 2 = **9**. **Sims (persona oracle, 400×3):** lane win-rates & pace hold at **baseline**
(the earlier *ungated* +1-per-tier version leaked into the volume lanes — majority 34→49% at 2p — so it was
re-gated to Q4+); the **quality ceiling rises** (3p winner-max 74→92) while the median is flat (+1). The greedy
bots still don’t *climb* (a known blind spot — the payoff is for human/Cellarmaster play); the sim’s job here
was to prove **no regression**, and it does. *(Parking lot: if play shows the climb still under-rewarded, the
next dial is a steeper premium or scaling the Rich-Berth/Festkeller ship value too — not the base values.)*

**v1.7 “Even Footing”** *(2026-06-19, `play.html` KEY v64)* — A pre-playtest balance/feel pass, grounded in
the v63 strong-AI study (CM/GM/Trader, 900 games + the persona oracle). Four changes: **(1) Seat compensation
REMOVED (`SEAT_COMP` 1→0) — equal starts.** The +1 `G`/later-seat comp was tuned to the *greedy* bot's
first-mover edge, but the strong-AI mirrors showed it OVER-corrects under skilled play (second player won
**~67–72%** at 2p, later seats favored at 3p). P1's turn-1 (choose the line, place + activate the warm Gruit
for 2 goods, no toll) is compensation enough. **(2) Improvements are CHEAPER (−1 `G` each) and bought at the
CELLAR** (alongside Tap), not the Market — the free-starting-improvement experiment showed even a *free*
improvement only swings win-rate ~+10% (Hop Garden, the new #1 in the hops economy) down to −7% (Extra
Vessel), so the real barrier was the *Market action* opportunity cost, not goods. The least-contested Cellar
lowers that bar. **(3) The developer lane made physical — a building a RIVAL overbuilds now FLIPS into its
owner's improvements area:** worth **+3★** at game end AND carrying a **Wild action on its back**, fired when
you work the **Floor** (so being displaced enriches the private alt-line vs paying the toll — the
v0.16-era "alt line" question, given a hook). Self-displacement still pays nothing (anti-farm). **(4) The
improvements area is CAPPED at `IMP_AREA_CAP` = 4** tiles total (bought improvements + flipped buildings), so
the engine is a real choice, not an open buffet. Gates: sim 2–4p 0 crash/deadlock, pace in band; render-smoke
clean (incl. GM/CM); ladder fast tiers hold. *Note: the flipped-building feature is **bot-untestable** — the
AI never overbuilds (developer scored 0 across all 900 v63 games) — so it is crash-validated only; its balance
is a table question. The Wild cadence (Floor-fired) and `IMP_AREA_CAP` are first-pass ⚙.*

**v1.6 “Hops”** *(2026-06-19, `play.html` KEY v63)* — **Economy rebalance: the export ladder is now
HOPS-LED, giving hops a real demand.** Diagnosis: grain was a near-monopoly currency — it pays the
occupancy toll, *every* tile/ship/charter/contract buy, **and** the grain half of every beer, while hops
was spent on almost nothing but the hops half of recipes (Granary ≫ Hop Garden by construction, since
gains are flexible and you'd take grain anyway). Fix (theme: *hops = the beer that travels* → the
currency of range/quality): **Mumme 2G2H → 1G3H**, **Bock 3G2H → 2G3H** (**totals unchanged** — the
rejected 3G3H probe raised the total; this only shifts the ratio, so the Q5 climb timing holds), and the
export **recipe-card buys** lean hops (Broyhan 1H, Mumme 2H, Bock 1G1H; **Keut stays 1G** — the
deliberate grain-path Q3 alternative, so hops is a *choice* not a tax). This makes **Hop Garden** a
genuine pick vs **Granary** without nerfing Granary (you brew far more than you buy, so +1 grain/Source
stays fine). AI/bot Source heuristic now banks hops (target 3) when it owns a hops-led export, so the
climb stays fundable in sim. Gates: sim 2–4p 0 crash/deadlock, pace in band, Q5 still reached; ladder 0
errors + every tier ≥60%; render-smoke clean. *(Recommended follow-up: re-run `ai-tune.js` — the
Trader weights govern destination valuation, not recipe cost, so no retune was forced, but a balance
pass warrants a check.)* Parking-lot items above (asymmetric starting improvements; the random
starting-building question) recorded for later.

**v1.5 “Improvements”** *(2026-06-19, `play.html` KEY v62)* — *(KEY v62 follow-up: **off-turn Building
rewards now queue to the owner.** When a rival tops off and sails a hull carrying your cask, your
London/Novgorod Building benefit no longer auto-grants a **random** tile — it's **queued to the start of
your next turn**, where you choose from the display via the normal picker, same as an on-turn delivery.
An unplaced hand Building scores nothing, so a reward queued past game-end costs nothing — matching the
old outcome. The AI resolves its queue with `aiBenefit` (preference-ranked, no longer random).)* Three new **private brewery improvements**
(bought for goods at the Market — costs below are the v1.5-era prices, **superseded by v1.7's "−1 G
each, bought at the Cellar" cut**; current costs are `3 G`/`3 G`/`4 G`, see COMPONENTS.md §9): **Harbor Crane** (`4 G`, your Harbor load sets out **2 casks**, not 1),
**Lagering Cellar** (`4 G`, each of **your turns** +1 age to one maturing cask — a *faster-climb* perk,
distinct from Aging Cellar's −1-step), and **Private Quay** (`5 G`, load **Ready casks straight from your
vessels** onto ships — skipping deploy/the slot entirely). Implementation: the load flow now accepts a
**vessel cask-ref (`v:i`)** alongside slot ids (mirrors the existing Charter/Enshrine vessel-load path);
Crane sets `loadsLeft=2` on the Harbor load; Lagering ticks in `endTurn` after the auto-ferment. The first
two are **ex-Buildings reborn**: Harbor Crane and Lagering Cellar were the only two *line-effect* buildings
(awkward in the "a building modifies its docked occupant" grammar), so they left the green public deck for
the purple private set — where a tempo/throughput perk belongs. Values are first-pass ⚙. Robustness re-run
clean (0 crash/deadlock, pace in band 2–4p); the greedy sim bot doesn't proactively buy improvements (a
known blind spot), so the effects are exercised on purchase, not auto-piloted.

**v1.4 “Deploy”** *(2026-06-19, `play.html` KEY v60)* — Made **deploy a first-class line action** (building on
v1.3's "deploy rides the line"). **An empty slot's default line-action IS "Deploy"** (shown as *"{building?}
Deploy"*) — so a line reads e.g. *slot Deploy · station · station · slot Deploy*, and you spend a stop to set
**one** Ready cask onto **any** open slot (several Deploy stops → several casks/turn; the Brewhouse station also
offers Deploy, with its icon now on the board; the Cellar shows the Tap icon). The **combo:** deploying onto
*another* empty slot still pending on the line flips that slot's Deploy into the **cask's action stop** — place
where you'll still act and take the action this turn (control over execution for advanced play). This replaces
v1.3's narrower "deploy here onto the triggering slot only." Rationale: removing the old free/anytime deploy
makes the game **easier to learn and play** (one fewer floating action), and the empty-slot-default framing
makes the line legible — every stop *is* an action. *(In-page shipped; sim harness + AI ladder/oracle re-runs
and the page-doc sweep follow.)*

**v1.3 “Tap a Cask”** *(2026-06-19, `play.html` KEY v59)* — Reworked **deploy** and added **Tap** to cure the
wharf clog/seize (an all-AI game locked up: slots jam → vessels back up → brewing stalls). **Deploy is no
longer a free anytime action** — it rides **line activation**: deploy a Ready cask onto an **empty slot of
the line you fire** (placement becomes a real decision — fire your value-building's line to route demand),
or onto **any** open slot via the **Brewhouse**. New **Tap** (a Cellar action): discard a Ready cask from a
**vessel or a slot**, fire its action once, free the lane / **recall** it off a slot for a better cask. Clock
trimmed (`SAILED_CAP` 7/11/14→6/10/13) since deploy-gating + Tap cut voyages/round; AI re-tuned for the new
model (move-time demand-routing + adopted `ai-tune` weights). Robustness PASS (0 deadlocks 2–4p, clock-
dominant pace ~19–20 rounds). **Known tradeoff:** tying deploy to board position adds variance that
**compresses adjacent AI tiers** — the journeyman→trader rung fell 64%→~57% (even re-tuned it can't reach the
60% gate); the GM still beats the Trader ~62%. For a *human* the same change reads as added placement *depth*
rather than luck — a playtest call.

**v1.2 “Dice” — the Cellarmaster AI** *(2026-06-18, `play.html` KEY v57)* — A new top AI tier above the
Guildmaster, built after diagnosing the GM's strategic blind spot: its flat-MC uses a **journeyman rollout**
(never enshrines, ships cheap volume), so it under-prices the quality/Hall/Novgorod lanes and over-indexes
majorities — exploitable by a committed quality+Hall+Reach plan. The **Cellarmaster** fixes all three weak
axes — a **competent, completion-biased rollout** (Trader + deep climb/enshrine, so the MC can *price* the
deep lanes), **determinized hidden decks per playout** (no RNG-locking), and a **large budget spent by
sequential halving**. Beats the Guildmaster **~62%** head-to-head (throttled bulk budget; stronger in-page);
the Guildmaster is **kept** as the fast robustness oracle. Gates extended: `ai-ladder.js` adds a
`guildmaster vs cellarmaster` rung (shard it — `CMN`/`CELLAR_MS`), `ai-render-smoke.js` runs a cellarmaster
game, `sim-analyze.js` profiles `TIERS=cellarmaster`. Full rationale in `AUTOMA.md` (Phase 3+).

**v1.2 “Dice” — design fixes** *(2026-06-18, `play.html` KEY v56)* — Two table-feedback fixes, sim-gated
(robustness + PATHWAYS + AI ladder, all clean): **(1) the developer lane** — a building a *rival* overbuilds
now scores its owner **+3★** at game end (it served its purpose; you're paid for authoring a slot worth
overbuilding). Self-displacement pays nothing (anti-farm). This gives the **Authorship/engine lane** a
displacement payoff that bites most at 4p, where the ring fills. **(2) presence only where you've delivered**
— a free Reach (the cask action, the Bergen benefit, the Keut perk) can no longer plant presence at a kontor
you've never shipped to (it was letting the Bergen benefit seed unearned majority standing — e.g. a player
holding Novgorod presence with zero Novgorod deliveries). Reach is simply a dead action until your first
delivery — the simple, intuitive rule. Lanes stayed balanced (4p ≈ vol/dem/pres/maj/deep 24/24/26/26/25).
*(Also repaired the stale `sim-analyze.js`/`sim.js` hooks that still referenced v0.16-era functions — goals'
`drawPick`, `almsPick`, `pickCaskAct`, the old `deliverCask` signature — so the GM oracle cohort runs again.)*

**v1.2 “Dice”** *(2026-06-18)* — Shipped the **demand-dice tracking**: a value-building bonus is now
captured-on-ship-through onto a **reusable d6 that rides the cask in the berth** — its **pips = the ★
banked on delivery** — while a quality transform rides a **+1-quality marker**; ship value buildings
and the wharfage cut resolve **live**. This replaced the earlier value-chit denomination idea (one
re-rollable die per cask, no chit-counting). Plus a **`play.html` UI overhaul**: the slots now render
the **real printables tiles** — full-square slots showing cask / ship / building tiles, a **stacked
slot with tap-to-swap**, and the market, brew-pile, and brewery tiles — with **buildings = green,
upgrades = purple**. (Still 2–4p; the v1.1 differentiation pass and scoring tune carry forward.)

**v1.1 SESSION STATE — what shipped + playtest feedback + next steps** *(2026-06-18, `play.html` KEY v50→v55)**
This session implemented the v1.1 differentiation pass (Stage 1) and several fixes/reverts, then a real
2-player table test surfaced the dominant problem to solve next. **Read this before resuming.**

- **SHIPPED to `main` (live, KEY v55):**
  - *The Floor (v50)* — fixed to run **in lieu of** the public line, not in addition (run every vessel cask's
    action instead of the contested line; no toll).
  - *Building economy (v51)* — buildings are gained **to hand**, **placed at the Market**, and **placement
    over an existing building REPLACES it** (the displaced tile returns to its owner's hand; slots never lock).
  - *Tune (v49) + Flight (v52)* — Hall trimmed 4/6/8/10 → **3/5/7/9**; the **Flight counts distinct BEERS**
    (not quality tiers — there are always 5 beer types, so the 5-beer flight is always reachable).
  - *5-player support REMOVED* — the game is **2–4p** (UI, docs, sim/ladder defaults all 2–4p).
  - *Default seats* — names Sean/Olli/Adaline/Jillian; **seats 2 & 3 default to Guildmaster AI**.
  - *Building tiles render as FULL tiles* (not a corner icon) + a tap-free **"Buildings on the Wharf"** panel +
    a **target glyph** (cask/ship/line/owner) — the first pass at the legibility problem (still insufficient — see below).
  - *Stage 1 differentiation (v53)* — the four kontor identities + beer niches **as in the entry below**, EXCEPT:
    **London is to-hand, NOT "on arrival"** (on-arrival would re-open the board-fill the to-hand throttle just
    closed). **Novgorod's benefit is now `age` (refine a maturing cask +1), NOT `recipe`** (v54 — the arc showed
    the free recipe was redundant: players buy recipes cheap by ~R8, before they can reach Novgorod's Q3 gate).
  - *Auto-aging* — tried REMOVED (v54), then **REVERTED (v55)** — see feedback below.

- **THE DOMINANT FEEDBACK (next session's #1 priority): the game is hard to learn and `play.html` LACKS THE
  DATA A PLAYER NEEDS TO PLAY.** Too much to track, not enough surfaced on-screen. This is now the top problem
  — *no more mechanics until the UI/onboarding gives players the information to make decisions.* (The full-tile
  buildings + the Buildings panel + target glyphs were a start; insufficient.) Likely work: a clear turn/legal-
  action surface, per-player "what can I do / what do I have" at a glance, the goods economy and the maturation
  state made obvious, a guided first-game/onboarding, and the player aid pulled into the live flow.

- **Arc analysis (v53/v54):** the **Trader climbs eagerly** (full recipe set ~R8, Q5 ~40%)
  but the **Guildmaster oracle stays CHEAP** (~1.3 recipes, Q5 7–27%, climbs late/rarely) — cheap-volume is
  optimal-flexible; **the quality climb is a committed, high-variance lane, not the default** (so the Stage-1
  persona "quality lanes hot" was largely a *forced-persona artifact*, and we did **not** trim quality rewards).
  Buildings are authored **before** the recipe set fills (R1–4 vs R8–16) — healthy.

- **The goods squeeze (from the 2p table test):** income ≈ 2/turn (a Market source) vs Mumme 4 / Bock 5 / ship 2
  / charter 2 → **hand-to-mouth**; a high-Q plan can **starve and strand** (a 2nd Mumme was still maturing when
  the short 2p clock — 7 voyages — ended the game). Auto-aging removal made this worse (it stole the income turns)
  → reverted. **Open levers (decide with intent, sim first):** (a) *fund-the-climb legibility* — teach/strengthen
  the **Gruit + Bruges/Bergen goods loop** that funds high-Q (lean teaching before buffing income); (b) **2p
  runway** — `SAILED_CAP[2]` 7 → 8–9, or accept 2p as the fast/cheap variant.

- **STILL OPEN / queued (after the UI work):**
  1. **Trade-factor presence CAP (Stage 2)** — the finite-barrel cap, *personal-cap-only* (entry below). Reassess
     magnitude now that auto-aging is back and the climb self-limits.
  2. The **goods/income** + **2p clock** levers above.
  3. *"Is the quality climb meant to be the default or a committed option?"* — design-intent question (Trader says
     default, oracle says committed). If "worth it for all," make the climb cheaper/faster, not richer.
  4. Optional: revive **Keut set-collection** (casks are type-tiles → a 3-space strip tracks the count).

- **Physical-tracking model** is recorded in `COMPONENTS.md §2` (casks = type-tiles + an owner barrel that
  becomes kontor presence = the trade-factor cap; the kettle display; per-vessel maturation marker; the Flight
  strip; score-on-delivery). No hidden state.

**v1.1 (IN DESIGN — the differentiation pass)** *(2026-06-17)* — Design review (the designer's read):
with steerable brew piles, beers now differ **only by quality + cost-mix**, so the two Q3s
(Broyhan/Keut) are interchangeable and London/Novgorod collapse into "a building + a similar
majority." The fix — **differentiate by ROLE**: each kontor rewards a different axis, each beer
serves one. Decisions captured (to build as one pass, sim-gated — persona + oracle):

- **Kontor identities — four unique benefits, four lanes:**
  - **Bruges (Hub)** — Q1 gate, **2 goods** (liquidity), low flat value → the *economy* lane.
    **No quality ceiling** (decided): a premium cask at Bruges still earns the Flight (beer-type,
    quality-blind) + majority (count, quality-blind); only the *value* premium is forgone — a real
    tradeoff, not waste. The steep value gradient + the Charter/Enshrine relief valves (anti-strand)
    make floors-only the right call; verify in sim that high-Q→low-value is rare.
  - **London (Steelyard)** — Q2, **take a Building and place it on arrival** (free, immediate — the
    *only* place gaining-and-placing is one step; elsewhere it's to-hand) → the *engine/authorship* lane.
  - **Bergen (Bryggen)** — Q2, **a free Reach** (+1 presence, any kontor) on delivery; the big **9/5/2**
    majority is the draw → the *majority* lane (the benefit compounds the majority you chase).
  - **Novgorod (Peterhof)** — Q3, **a free recipe** (exotic styles) + value **scales with quality**
    (Q3→2 · Q4→4 · **Q5→6**) → the *quality climb* lane; finally the reason to brew Bock.
- **Beer niches (steerable piles KEPT):** Gruit = fuel (keep). **Hopped → fast (ready 1)** (quick Q2
  engine access; sharpens "brew now vs hold"). **Broyhan → fast Q3 (ready 1)** (the rush/tempo Q3).
  **Keut → the +1-presence majority specialist** (DECIDED): a Keut delivered to a kontor plants an
  extra presence (2 standing for 1 cask) — the beer you flood Bergen with. *(Set-collection was the
  other fork; **tabled** — its only elegant counter is the delivered Keut tiles on a 3-space strip, and
  since casks ARE type-identifiable tiles we can revive it later if wanted, but +1-presence needs zero new
  components.)* **Mumme/Bock** = the climb, paid by Novgorod-scaling + the Hall + the Flight. Creates the
  **broad-vs-deep** axis (5 beers → Flight, or one beer flooded into a kontor).
- **Trade-factors (presence markers) — a finite PERSONAL supply (~8–10 ⚙, sim-tuned):** *your delivered
  casks already ARE your presence — this just caps the supply and routes Reach through it.* A **kontor
  delivery** and a **+1 Reach** (Bergen benefit / Keut perk / Reach action) each place **one**; the
  **Hall needs none**. Out of markers → you can only Enshrine or stop contesting kontore. Payoffs:
  (1) gives "+1 presence" a **real cost** (kills the Reach-snowball worry — Reach now trades a future
  delivery for present standing); (2) sharpens **kontore (finite) vs the Hall (unlimited)** with a
  built-in **pivot to prestige** once your standing is spent; (3) caps the volume lane. **PERSONAL CAP
  ONLY** (decided) — *not* an end-trigger; the Sailed-Ships clock stays the single, tuned pace dial. The
  *"last marker → final round"* dual-trigger is a **deferred** option (revisit only after the cap is simmed).

**v1.0 build + first tune (`play.html` KEY v47→v49)** *(2026-06-17)* — The keystone `play.html` rebuild
shipped (two-layer slots; building-driven kontor value; goals/neutrals/most upgrades folded into the
Building family; London/Novgorod → a free Building; steerable brew piles; the Floor; private
improvements). Then two follow-ups: **(a)** *owned-but-shared made real* — a rival routing through your
value building now banks a **reduced** bonus (half) and hands you the **wharfage** (RULES §5b), and the
bots were repointed to **author + route** their own value buildings (the demand lane now self-pilots, so
the lane reads are honest); **(b)** *first balance dial* — the **Hall ladder trimmed 4/6/8/10 → 3/5/7/9**.
The committed-persona PATHWAYS report had the **prestige** lane hot (3p ≈ 50%, fair 33%); the single Hall
trim pulled it back to ~fair and tightened the five lanes across 3–4p (prestige now the slightly-lower,
higher-variance lane *by design*). One dial, sim-gated — per the lessons (§8). *(Guildmaster sims must be
**sharded** — ≤20 games/shard, multiple shards per player count, run in parallel; notes in
`playtests/ai-ladder.js` & `sim-analyze.js`.)*

**v1.0 “Living Slots”** *(2026-06-16)* — The design graduates to **1.0**, locked into the specs
(`RULES.md` / `COMPONENTS.md`); the `play.html` rebuild is the next step. Reset to the bookmarked keystone after a
demand-board detour was tried and abandoned. **Living, composable slots:** owned **buildings**
modify the casks/ships docked to them (one grammar; value-boost *or* transform; owned-but-shared
wharfage), folding goals + neutral buildings + most upgrades into one family. **Legible scoring:**
Hall fixed / kontor variable (building-driven) / majorities + Flight. **Five lanes as complete
paths** + the **Floor** (private line). v0.16 fully archived; top-level files version-stamped
v1.0. See `archive/records/PLAN.md`.

**v0.16.1** — Bruges/Bergen liquidity = 2 goods of the owner's *choice*; brewing vessel cap 4→3.
**v0.16 “Full Ships”** — Ships **sail only when full** (partial early-launch retired); destination
benefit **and** points seal **on delivery**, in load order (numbered berths); the **Charter** is
gated by a **scarce contract** (start 2, buy `1 G`, flat `2 G` fare — retiring the escalating
fare row). Fixed a backwards incentive (benefit-on-load → never sail).
**v0.15 “Enshrine”** — The **Hall goes local**: Enshrine a deployed Q2+ cask for prestige, no
boat. Throttle is **structural** (deploy-first, contestable), not a fee; ladder re-trimmed to
**4/6/8/10**. Ships/Charter kontore-only. Added **Trophy Room** + **Patron's Favor**. Revived the
under-powered volume lane.
**v0.14** — **Bock un-gated** (3G2H, the Aging Cellar a pathway not a gate) → the Q5 climb
reachable. Pathways resolve to **contested kontore vs the uncontested Hall**; 3G3H probe rejected.
**v0.13** — **The Flight** (range: (tiers−1)², min 3) + **the Masterpiece** + a majority cooldown
— making the quality climb pay.
**v0.12 (.1–.3)** — Rival-loading restored (tactical denial); **variable cask actions** drawn at
brew (decoupled from quality); **Gruit pinned to Source**; **upgrades earned-only** (no goods-buy);
**Hall = printed ladder**; clock re-centered to 7/11/14.
**v0.11 (A & B, .1–.3)** — **Neutral, destination-bound ships** off a shared deck (commission →
load → sail); **ship market of 3**; deck → 20 hulls. Batch A: Towncrier reined in, charter-fare
experiments, the **export premium**. (Printed destinations *removed* a strategy axis → the Trader
rebuilt around "which hull to feed.")
**v0.10** — **Big tiered majorities at every kontor** (Bergen 9/5/2 the anchor); per-cask values
cut so points live in the majority race; Hall bumped to balance.
**v0.9** — **Tiered, ranked majorities** (2p skips 2nd); the **London = engine / Bergen = majority**
split; **seat compensation**. The "prestige is marginal" worry was a greedy-bot artifact (fixed by
persona bots).
**v0.8** — Occupancy toll (the de-rondel dial); the **“Wharf” naming**; export beers carry
**fixed quality, deal 3 of 4**; all six neutral buildings.
**v0.7 “The Wharf”** — A ground-up **reel-in to GWT/Distilled weight** (≈ half the rules cut).
The four-station loop, the dual-role cask in three states, **destinations replace the two value
tracks**, deliver→earn-upgrade, the **Charter** relief valve, the **Sailed-Ships** clock. Cut: the
demand market, type frontier, Fairs, route lanes, the Hall-as-a-station, working-cask Floor, twins,
aging cubes.
**v0.1–v0.6** *(the Lacerda-grade origin, superseded by v0.7)* — The shared 2×2 action grid, the
double-sided cask (working ↔ enshrined), reach-vs-standing tracks, a demand market, the Brewhouse
Floor, recipe cards, ships-as-single-use-carriers. Too much game; the right amount of theme — which
the v0.7 reel-in resolved.

**Tooling milestones:** the headless `sim.js` harness + persona/Cellarmaster lean probes; the
5-tier AI ladder (Apprentice/Journeyman/Trader/**Guildmaster** flat-MC/**Cellarmaster** deep-MC); `sim-analyze.js`;
`ai-tune.js` (CEM). All drive the canonical engine, so every rules revision is absorbed
automatically.

---

## 10. Glossary (v4.5b)

- **The Wharf** — the whole core area: the four stations + the 8 slots.
- **Station** — one of the four action spaces (Market · Brewhouse · Cellar · Harbor), each
  printing **ONE action**.
- **Slot** — one of the 8 perimeter spaces; seats **a building and/or a ship** (≤1 of each) —
  never casks.
- **Line** — a row or column: its two stations + their two slots (the 4-stop activation).
- **The tally die** — THE component: set at brew to the cask's printed **start value**, turned up
  by age points (**READY at the quality**), lifted past it only by buildings at load (cap 6),
  read by **gates** as it boards, **parked at the kontor** on delivery — pips = the banked ★,
  body = presence, majorities and the clock; a build stands one on the tile as the **mason's
  mark** (v4.9). 13 per player (v4.9b), public — and it never turns on its own (v4.5b).
- **Cask** — a brewed beer in two states: **maturing** (private vessel) → **delivered** (boarded,
  sailed, parked). Its printed action is a **load bonus**, fired as it boards a hull.
- **Building** — the ONE green family: **no owner** — serves whoever activates it; the builder
  **stands a quality die on the tile at its printed start face** (v4.9/v4.9b — every use turns it
  up, cap 6; the pips score at game end; the +3★ mint is CUT).
  Action buildings print verbs (incl. Racking Hall swap · Assay 1H→Ready, v4.12 ·
  the Hop Exchange pay-hops lift · the Abbey Cellar, v45d);
  load-lift buildings shape the boarding die / the hull (Kiln/Bonded +1 die ·
  Tollhouse −1 for +3★, v45d · Cooperage +1 berth · Customs −1 gate · Rich Berth sails short). The
  **Bonded Store** is ephemeral — it sails away with its hull (v4.5b).
- **Specialist** — the purple private tile (13 designs — v4.6: the core 5 at max(2, n−1)
  copies + the 8 guild singles; 2 seats), **earned, never bought**: free as Bergen's prize
  (**per cask** — the uniform grammar, v4.7); the Hiring Post /
  hire bonus pay the tile's **printed wharf fee** (v4.2/v4.7).
- **Ship (Skute · Cog · Hulk)** — neutral destination-bound hulls (1/2/3 berths); **commission**
  at the Harbor (the hull's **printed fee — 2/1/0 G by size**, v4.8 — + one free load; **no ★** — v4.5b); a hull **sails the moment it is full**
  — a Skute on its first load (the relief valve as a component).
- **Kontor** — a delivery port (Bruges/London/Bergen/Novgorod): a gate (a die read) · value = the
  parked die · a prize · a majority.
- **Presence / bump** — your parked dice at a kontor; a **bump** parks a tray die at face 1
  (1★ · presence · clock), only where you've delivered.
- **Lading (v4.5b)** — an order tile in the face-up row of 3: a kontor (or any) + a die
  minimum / named beer → printed 2–5★. A qualifying delivery **claims** it (one per cask; the
  ★ bank at once); the row refills at end of turn.
- **The Flight** — distinct beers **SHIPPED** (v4.9d — the recipe cards on the board's COMPLETED
  side, moved there on that beer's first LOAD): (beers−1)², min 3 (v45h: pure scoring — the
  slot-unlock duty left with the covers).
- **The clock (v4.5 — the dice alone)** — the first **EMPTY TRAY** (every die committed) sets the final
  round; sails end nothing (`MAX_ROUND` 25 ⚙ the backstop; the **13-die** pool (v4.9b) is THE pace dial).
- **TABLED (v4.0, seams kept)** — the Hall (prestige lane) · Dispatch/charters · the Floor turn ·
  the Privileges/ownership/wharfage line · the three expansion toggles · the old five-lane
  framing. They return re-derived on the v4 spine (the terms live on in §9's history).
