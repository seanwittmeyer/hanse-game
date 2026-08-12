# Brewhouses of the Hanse — Turn & Round Rules (v4.16 “Standing Orders”)

> **v4.16 “Standing Orders” (designer-called 2026-08-12 — Contracts become ORDERS; the Hall
> must be a lane).** Two things, one letter. **(1) The rename is RULED:** the Kontor bonus
> tiles are **Orders** on every player surface (the lineage: *lading* → *Contract* → **Order**;
> the registry’s old collision worry is resolved by copy — the tile is always the capitalized
> **Order**, and the boarding sequence now prints as ***boarding order***). **(2) The
> volume-lane program is IN STUDY:** the designer’s brief — *going volume at the Hall should
> compensate for the forgone majority points, with renewable access via Invitations* — enters
> the engine as four sim-tunable dials ⚙, ALL OFF until the lane study rules: **HALL_PIPS**
> (every enshrined die also scores its **pips** at game end — the fifth port) ·
> **HALL_LADDER** (end ★ by your enshrine **count**, the Flight’s grammar) · **INV_CASK_W**
> (a ⚜ *Gain 1 Invitation* load bonus joins hall-mode pile draws) · **INV_BLDG** (the **Guild
> Chancery** — a hall-mode building: activate → +1 ⚜ Invitation; fee 1 `G`, mark starts at 2).
> The lane oracle is `playtests/hall-lane-probe.js` (3p Cellarmaster · Guildmaster · a
> committed hall-persona Guildmaster); the study record is
> `archive/records/HALL-LANE-STUDY-v416.md`. The recommended print lands in §12 when ruled.

> **v4.15b “Second Runnings” (designer-ruled 2026-08-10 — the specialty signatures
> simplify).** *“Keep it simple”* — each specialty beer’s identity IS its pinned load bonus.
> **Gose = GAIN ANY 3 GOODS** (a new pinned bonus; the Salt Trade delivery perk is **cut** —
> *“a better gruit when you have the grain”*, the 2 `G` brew justified). **Zerbster = ONE
> compound bonus:** as its cask boards — **a FREE Gruit into an open vessel** (optional; a
> tray die, Ready at 1) **then Load 1 more cask** (the confusing brew-time parti-gyle prompt
> is cut; the second runnings ride the load). **Duckstein unchanged** (*“the race cask”* —
> free presence + smoke-hardy). **Jopenbier unchanged** — the designer’s Bock-parity worry
> is recorded with its analysis and dial options in §Open #14; nothing ruled.

> **v4.15 “Guildhall” (designer-ruled 2026-08-10 — the Hall returns through Contracts).**
> A third opt-in setup toggle: **the Hall comes back as a Contract-fed shelf board.** In hall
> mode the Contract deck **swaps to an eased 20-tile schedule** ⚙ (rewards 1–3★, routine
> conditions) and **every claimed Contract also pays an ⚜ INVITATION**. **Enshrine:** spend an
> Invitation + one **Ready** vessel cask whose **die meets a shelf’s minimum** — the die
> **stands on any open space** of that shelf (spaces are IDENTICAL: nothing is printed on
> them — the anti-jackpot ruling: the old Hall’s one-best-honor handed the fixed first player
> a guaranteed early lead) and the owner picks **ONE option from the shelf’s printed menu**.
> **The ★ option is ONCE per player per shelf** (order-independent — last pays the same as
> first; the ★ die stands on the shelf’s left edge as the record); repeat visits pay in
> **free actions**. The shelves ⚙: **Taproom** die 2+ — fixed 2★ + 2 goods · **Guild Table**
> die 3+ — 4★ / Age 3 / Gain 3 goods · **Masters’ Shelf** die 4+ — 6★ / Brew 1 / Load 1
> more · **Reliquary** die 5+ — 9★ / Brew 1 / **the Guild’s Seal** (claim 1 open Contract
> outright — its ★ AND its Invitation). **The engine:** your **first die on each shelf earns
> a new Invitation** (one claim can seed the whole climb; four freebies, then 1 claim per
> visit). A die on **all four shelves** at game end: **+6★** ⚙ (the crown). The enshrined die
> is committed and parked (a clock beat; no majority weight — the Hall pays no majority).
> **Simulation-tunable:** the shelf table is data — the sim sweeps ★ values and menus
> (`HALL=1 · HALL_STARS · HALL_MENU`) to measure which benefits belong. Watches ⚙: the
> Chronicler (+3★/claim, uncapped) under the eased deck · the Seal loop’s claim rate · Age 3
> vs the Cellar’s identity · P1 tempo (the anti-jackpot claim is exactly the thing to
> falsify at the table).

> **v4.14 “Beer Atlas” (designer-ruled 2026-08-09 — the expansion beers return).**
> The two beer expansions come off the v4.0 shelf, **re-derived on the v4 spine** (the die is
> the cask · no deploy · load bonuses · the empty-tray clock · the `H` = Q−3 fee formula); the
> Trade Roads stays tabled. Both are **opt-in New Game toggles**; the base game is unchanged
> with them off. **(1) SPECIALTY BEERS** — Gose · Zerbster · Duckstein join the export deal:
> **draft 3 of 7, always including at least one of Mumme/Bock** ⚙ (the climb stays in every
> game). Each is **pinned** (every tile of its pile prints the same load bonus) and carries a
> printed signature: **Gose** (Q2 · 2 `G`, no hops · bonus *Gain 2 goods*) — **Salt Trade:**
> every Kontor delivery pays its owner **+1 `G` +1 `H`** · **Zerbster** (Q3 · 3 `H`, no grain ·
> bonus *Load 1 more*) — **Parti-Gyle:** brewing it **may** also fill an open vessel with a
> free **Gruit** (no goods — but a **tray die**; the second runnings are priced by the clock) ·
> **Duckstein** (Q2 · 1 `G` 1 `H` · bonus *Place 1 presence*) — **Smoke-Hardy:** its die turns
> **+1 as it boards** (cap 6; minimum AND value — a Q2 that makes the Novgorod band; the old
> ready-2 print collapses to **ready 1**: the die floors at 1, so a second step never printed).
> All three recipes are **free** on the formula (Q3 and below). **(2) JOPENBIER** (its own
> toggle) — the vintage capstone re-derives as a **plain Q6**: the old dock-vintage rode the
> deploy state and is **cut**; the four-step climb IS the vintage now. Brew 2 `G` 4 `H` · die
> starts **2**, Ready at **6** · delivers **6★ anywhere, 8★ at Novgorod** (the old 8★ falls
> out of the printed premium) · the die-6 Contract magnet · a **sixth Flight type** (6 shipped
> → 25★ ⚙). **Never drafted — always acquirable** when on, at every recipe channel, fee
> **3 `H`** (the formula; the Scholar waives). Watches ⚙: the Assay’s 1 `H`-to-Ready on a
> four-step climb · Gose under the goods drips · Duckstein+Cellarman (Ready at brew, boards
> at 3) · the Contract deck thins when a specialty deal strips base-named orders (§7b).

> **v4.13 “Plain Sight” (designer-ruled 2026-08-09 — a PRESENTATION release).**
> **No rule changes at all.** Everything below is unchanged from v4.12b; the version marks a
> pass over how the game READS, on every surface. **(1)** The rulebook’s **art icons print
> big** — wherever the kit’s art exists the icon drops its chip and renders full size (only
> the line-glyph fallbacks keep one). **(2)** A **named Kontor wears its own crest**
> everywhere; the generic glyph is reserved for *a* Kontor in the abstract — and the open
> **Contract row renders the printed tile itself**, capped at its true 2 × 0.9 in. **(3)** The
> heavy paragraphs become **diagrams built from the real components** — Loading, Sailing &
> delivery, the Mason’s Mark (piece → arrow → piece). **(4)** **One site navigation** across
> all four pages; the play app keeps the **Player Aid** and shows Aid + Rules in its bar on
> non-mobile. **(5)** The print kit: the Destinations board’s **Contract slots are
> component-true and centred** (they had inherited the building footprint and overflowed the
> board), the **Overlay proof reaches the Kontor panels** (12 mm dice ghosted into each
> parking field), and the **component manifest is a packing list** — quantity, a line of
> theme, and where the piece goes — instead of a lesson that overran its sheet.
> *(The `KEY` bump to `hanse-v413` is the version marker; it clears any in-progress game.)*

> **v4.12b “Light Wharfage” (designer-ruled 2026-08-09, same day — off the
> BUILDING-POWER-STUDY).** The **Cooperage wharfage eases to +1★** ⚙ per cask loaded at its
> slot (was +2★). The study’s top flag: the only design stacking a direct mint (≈5★/game at
> 4p — 16× the Tollhouse) on a top-tier mark and an above-bar builder win, sharpened to
> +11.8pp under the GM oracle. Capacity, the tick-per-load and the mark stand — only the
> mint halves. The **long-tail buff proposals** (Rich Berth · Customs · Capstan · Hiring
> Post · Tollhouse) are **recorded in the study §8 — proposed, NOT ruled.**

*(Language: the 2026-08-03 **Term Registry pass** governs all printed copy — player ·
Kontor · Order · cask quality die · build · Age N · aging · resolve the line · the ★
glyph; see `STYLE.md` §4. The version letters below keep their period wording.)*

> **v4.12 “Open Brewhouse” (designer-ruled 2026-08-09 — the buildings & specialists review,
> one batch).** Four moves. **(1) BREW joins the Q3+ load-bonus pool** — the pool gates read
> *survey/hire/brew* all at Q3+ (brew was Q4+): *“brew is a true throttle.”* The print mix
> guarantees each Q3+ beer **one** brew tile of its six, never all. **(2) The presence fee
> SCOPES to the Almoner’s Stall alone** — the *place 1 presence* cask action and Keut’s perk
> are **free** again; only the Almoner charges the 2 G factor’s fee (v4.11 partially
> unwound; the 300/count re-read: pace 13.3/13.0/12.3, band 70/72/62% — between the free-bump
> floor and the every-channel fee; live-pace watch ⚙). **(3) The roster pass:** the
> Cellarman’s v45g never-starts-Ready cap is **REPEALED** (*“we start gruit ready — it is
> what makes this specialist powerful”*; his Broyhan starts READY at 3) · Braumeister reads
> **age 1 cask +1** · Scholar/Shipwright read **pay no fee** · the **INNKEEPER is reworked**
> — the 4th-vessel tile is cut; *brewing 3+ casks at once: age one +1 at your turn start*;
> ungated · the **CHRONICLER pays +3★ per claimed Contract, uncapped and ungated** (*“make
> that strategy more valuable”*) · the **TOWN CRIER pays +2★ per placed presence die** ⚙
> (the die parks at face 1 — 3★ total; face-2 retires; the dial is his bonus — 3★ floated) ·
> the Supercargo is reworded (rules unchanged). **(4) The building pass:** the **Assay
> House** — pay 1 `H`: ONE maturing cask ages straight to READY (was ±1) · the **Cooperage**
> — +1 capacity AND each cask loaded there scores its loader **+2★** · the **Merchants’
> Exchange** — replace **up to 3** open Contracts · the **Warping Capstan** — warp **any
> docked Ship**, cargo riding (full where it lands, it sails). No specialist prints a
> requirement any more (the earn-gate seam stays).

> **v4.11 “Factor’s Fee” (designer-ruled 2026-08-08 — off the three-playtest set: #34’s 16
> rounds · the 8-round Almoner race · the 10-round Flight win).** **Placing presence costs
> 2 G per die** — every channel: the *place 1 presence* load bonus, the Almoner’s Stall,
> and Keut’s on-delivery bump (the Town Crier’s face-2 parks pay the same fee). The free
> bump was the racer’s unpriced clock lever — live bumps and rounds moved almost 1:1
> (3 bumps → 16 rds · 7 → 10 · 8 → 8). The pace probe (300/count): the fee lifts rounds
> 12.9/12.1/11.9 → **14.8/14.3/13.8** (band 53–66% → 82–88%) with voyages UP — the added
> length is play, not drag. **The pool stays 13** — the 14th die was measured (+1.1 rounds)
> and declined (“far too long” risk). No tray die — or no 2 G — no placed presence.

> **v4.10 “Eastern Gate” (designer-ruled 2026-08-06 — off playtest #32 + the three-way port
> probe).** **The Novgorod minimum returns to die 3+** — the export band (every Q3+ beer ages
> before it ships, v45g) — and the **+2★ premium holds** (5–8★ per die). The deciding A/B/C
> (300/count: base · gate-3 · premium-+3): the gate HALVES the dead-port at every count
> (2p 61.9→33.2 · 3p 30.3→11.9 · 4p 11.6→5.5% Bock-dealt), lifts the delivery share to a
> healthy 16.5–20.8%, and cuts slot-stranded Novgorod hulls ~40% (#32's strand-port read);
> the bigger premium moved NOTHING — the port's problem was reachability under the clock,
> not reward (the v0.15 lesson: structure lever, not value lever). A Kiln’d Hopped (die 3)
> now makes the run; a Kiln’d Gruit (die 2) still cannot.

> **v4.9d “Loaded Flight” (designer-ruled 2026-08-04 — off the #30 board talk).** **The
> Flight qualifies on LOAD, not on brew** — the old read was a bug: *"the recipe cards sit
> on the left side until they are loaded on a ship, then moved to the right side showing
> they are completed."* A recipe card lives ON the player board: **COLLECTED (left)** until
> that beer's **first cask loads onto a Ship**, then moved to the **COMPLETED side (right)**
> — the completed cards ARE the Flight record, and the **Innkeeper's gate reads the same
> record** (its printed line becomes *3 distinct beers shipped*). The warm-start Gruit
> counts when it ships. The play app now renders the print board's anatomy live — collected
> left · vessels + seats as printed wells · completed right · stats in the bottom corners —
> and the brew piles show the current single-faced tile. *(The Flight was the largest
> invisible mass in the #29/#30 legibility read — now it is a column of cards on the board.)*

> **v4.9c “Light Tariff” (designer-ruled 2026-08-04 — off playtests #29/#30 + the same-day
> port/flow probes).** **The recipe tariff EASES — the formula drops to `H` = Q−3: Keut and
> Broyhan FREE · Mumme 1 `H` · Bock 2 `H`** ⚙ (expansions on the same line). The designer's
> read: Novgorod is not structurally dead — *"it is tough to justify the cost of brewing
> there if bock isn't in the game."* The measured backdrop: the recipe channel blocked
> (wanted-but-unaffordable) 11–19 turns/game · hops BINDING (8–23% of players end at 0 `H`;
> the Abbey ~never fires) · Novgorod undelivered in 71/33/23% of games by count · #30's
> table bought Mumme at 2 `H` only on its final round. The **v45e grammar STANDS**: a
> formula, hops only, paid at EVERY channel — the Bruges prize included; the Guild Scholar
> still waives. Watches ⚙: the Bock rush (its tax halves) · the Scholar's 2 `G` seat (his
> waiver now saves at most 2 `H`) · the hops economy + Novgorod share re-read (the A/B).

> **v4.9b “Cornerstones” (designer-ruled 2026-08-04 — the table talk on the unplayed
> v4.9).** Three balance moves on the mark. **(1) The mark starts at the tile’s PRINTED
> face** ⚙ — busy free utilities **1** (Granary · Mission Quay · Almoner’s · Assay) · paid
> workhorses **2** (Scrivener’s · Hiring Post · Malt Kiln · Hop Exchange · Merchants’
> Exchange) · ship-riders, ephemerals and rare powers **3** (Cooperage · Customs · Rich
> Berth · Tollhouse · Racking · Abbey · Bonded · Victualling · Capstan) — *“ones that
> require ships to sail start higher; the cost to place still factors in.”* **(2) The pool
> is 13** ⚙ (was 12) — the 13th die funds the mark economy (the v4.9 A/B ran ~2 rounds
> under the band). **(3) An untakeable BUILD prize is FORFEIT** — the 2-goods fallback is
> CUT on the London/build path (*“gaining goods is a game action itself”*; the Bruges/
> Bergen consolations stand — scope flagged in §Open). Parking lot: the building-roster
> rethink and the ephemeral “real-estate tycoon” lane (DESIGN §9).

> **v4.9 “Mason’s Mark” (designer-ruled 2026-08-04, mid-playtest — A TRIAL).** **A build
> scores no ★. Instead the builder stands ONE OF THEIR QUALITY DICE on the tile at face 1**
> — the mason’s mark. **Each time the building is used — by ANY player — the die turns up 1**
> (cap 6), and at game end **the die scores its pips to the builder**. The die is COMMITTED
> like any die: it counts toward the empty-tray clock (**no tray die → no build**; an
> untakeable London prize pays the printed 2-goods consolation), and it returns to the tray —
> **its pips scored at once** — only when the building leaves play (overbuilt, or an
> ephemeral sails away). Setup’s neutral deals carry no die and tick nothing. *“Used” =*
> an action building’s slot resolved; a lift/shaper’s effect actually serving a load or
> sail (the Tollhouse only when stamped · Customs only on a below-minimum board · the
> Cooperage when its extra berth fills · the Rich Berth on a short sail). Implementer’s
> fills flagged for the designer: tray-sourced + committed · start 1, cap 6 · leave-play =
> score-now + die back · no-die-no-build.

> **v4.8 “Harbor Rates” (designer-ruled 2026-08-04, mid-playtest).** **The commission fee
> is PER HULL — Skute 2 `G` · Cog 1 `G` · Hulk FREE** ⚙ (2/1/0 for 1/2/3 berths; was a flat
> 1 `G`). The price is **dispatch speed, not tonnage**: the Skute sails on its first load —
> the instant charter turns dear — while the free Hulk demands three casks (the berth race)
> before anything moves. The fee **prints on the Ship’s trigger berth** (chipless = free —
> the buildings’ grammar); the **Shipwright waives whatever is printed** (2 `G` on a Skute,
> nothing on a Hulk). A/B at n=300/count: commissions thin ~15–20% (the hull flood eases),
> voyages and pace hold, ~half the table’s commission grain returns to brews and Kiln fees;
> watch ⚙: the 4p builder lane warms in a 100/lane PATHWAYS spot-read (free Hulks feed the
> line-author) — full-oracle re-read before the next tune.

> **v4.7a “Six Piles” (2026-08-03 — off the rulebook editorial review).** The cask supply
> is **SIX face-up piles, one per beer** — a brew takes the **top tile of that beer’s
> pile**; the bonus printed on the tile rides the cask; every pile top is public (the
> steering). The engine kept one face-up top per QUALITY tier, which no table can perform
> for the two Q3 beers — `pileTop` now keys by beer (Broyhan and Keut steer independently;
> KEY `hanse-v47a`). The same review made the rulebook explicit where it was silent: the
> **bonus-after-sail** timing line, the **deck-guarantee swap procedure**, goods **overflow
> is lost**, a dry deck **shrinks its display/row**, and the emptied Ship returns to the
> **bottom** of the deck. Rules content otherwise unchanged.

> **v4.7 “Every Cask” (designer-ruled 2026-08-02 — five rulings, one version).**
> **(1) EVERY CASK PAYS ITS PORT’S PRIZE** — one grammar at all four kontors: Bruges a
> recipe · London a building · **Bergen a specialist — per cask** (the v4.6b per-house cap
> is cut; the `PRIZE-CAP-STUDY` measured per-die safe) · Novgorod’s **+2★ premium** is its
> prize. The throttles are the components: 2 seats · never two of a kind · the display’s
> end-of-turn gap · seat-gates · the 2-goods consolation per unresolvable prize.
> **(2) THE SPECIALIST PRICE PASS** (off the `SPECIALIST-VALUE-STUDY`): **Grain Factor
> 1G → 2G** · **Supercargo 1H → 2H** (the +23/+29 probe outliers) · the **Town Crier’s
> 2-ports gate is CUT** (−5 mid — it gated the tile into a dry window) · the **INNKEEPER
> REWORKED** — his 4th vessel now **ages its own cask +1 at the start of your turn** (the
> tile was negative even granted free). **(3) THE POOL STAYS 12** — designer: *“the game
> feels like as long as it wants to be… any more may drag it out.”* **(4) DEAD ORDERS
> STRIPPED** — at setup, a lading naming a beer **not dealt this game returns to the box**
> (the deck is always 14: the one undealt export takes its order with it). **(5) The AI
> pass** — `aiSpecVal` re-taught to the probe truth · the Guildmaster’s ‘quality’ persona
> holds at 2–3p, pure search at 4p+ (#26) · the Exchange over-cycle damped (`AUTOMA.md`).

> **v4.6d “Longshore” (designer-ruled 2026-08-02).** The **Stevedore loads 2 in EVERY load
> flow** — the ship-slot stop (as before), the **commission’s maiden load**, and the *Load*
> bonus alike (“more powerful the other way” — it was slot-only). A Stevedore commission can
> fill a Cog outright and put 2 of 3 on a Hulk.

> **v4.6c “Living Line” (designer-ruled 2026-08-02, off live play turn 8).** **The line is
> read LIVE — “the line can evolve as you take your turn.”** A hull **commissioned** or
> **warped** onto a slot of your ACTIVE line mid-turn — or a **building raised** there —
> **opens that slot’s stop this same activation** (each stop still fires at most once; a
> used stop never returns; a ship sailing off closes its stop, as always). The reported
> case: commission a Cog onto your line’s Kiln slot, maiden-load it at the Harbor, then
> **top it off at the slot stop** — it sails.

> **v4.6b “Every Shipper” (designer-ruled 2026-08-02).** The **Bergen prize read is
> CORRECTED**: the ship grants a specialist to **EVERY house with a cask aboard — at most ONE
> per house per ship** (three of your own casks still seat one). The v4.5b “≤1 per SHIP, load
> order decides” line was a **misinterpretation** of the ruling, not the ruling. Load order
> still decides **pick order** off the shrinking display (v4.4c: a take’s gap stands until
> end of turn). The designer’s line: *the destinations should grease the wheels — they can be
> the **sole source** of buildings, recipes, and specialists when the right casks and
> buildings aren’t out.*

> **v4.6 “Guildbook” (designer-ruled 2026-08-02 — off the `archive/records/AGRICOLA-STUDY.md`
> markup).** The Agricola program: the private and public card channels each gain the textures
> the study named missing. **(1) THE SPECIALIST ROSTER: 5 → 13 designs** — the 5 core drips
> keep **max(2, n−1)** copies; **8 new GUILD designs print 1 copy each** (scarce, first-come):
> **Guild Scholar** (2 `G` — your recipes are **FREE** at every channel, Bruges included; the
> designer’s markup) · **Innkeeper** (2 `G`, *gate: 3 distinct beers brewed* — the tile IS a
> **4th vessel**) · **Supercargo** (1 `H` — a hull sailing your cask on a **rival’s** turn pays
> you 1 `G` 1 `H`) · **Chronicler** (1 `G` 1 `H`, *gate: a lading claimed* — end: **+1★ per
> claimed lading, max +5**) · **Alderman** (2 `G` — end: **+2★ per kontor with 3+ parked
> dice**) · **Town Crier** (1 `G`, *gate: delivered to 2 kontore* — your bumps park at **face
> 2**) · **Chandler** (1 `G` — once per turn swap 1 `G` ↔ 1 `H`) · **Shipwright** (1 `H` —
> your commissions are **free**). Three spikes carry printed **SEAT-GATES** read off the table
> (flipped cards · claimed tiles · parked dice) — power that must be **earned**. **(2) THE
> BUILDING DECK: +3 designs, and the box now prints 20 — SETUP DEALS 17** ⚙ (≥1 Malt Kiln +
> ≥1 Mission Quay guaranteed; the exports’ deal-3-of-4 grammar on the wharf): **Victualling
> Yard** (2 `G`, EPHEMERAL — the boarding cask’s load bonus fires **twice**; sails away with
> its hull) · **Merchants’ Exchange** (2 `G` — slot stop: **cycle one open lading** under the
> deck; its replacement posts at once) · **Warping Capstan** (2 `G` — slot stop: **move one
> EMPTY hull** to any shipless slot). **(3) Guild ★ join end-scoring** (§11) — the collectors
> are private and component-audited. All numbers ⚙.

> **v4.5b “Open Orders” (designer-ruled 2026-07-31 — off gatekeeper review #2 + playtest
> #24; the record: `archive/records/V45B-OPEN-ORDERS.md`).** Five moves, one program:
> **(1) The commission ★ mint is CUT** — a commission banks **nothing**; 1 `G` buys the hull
> + the v4.4 instant load (tempo, not points). **(2) Automatic aging is CUT** — dice turn
> only when something turns them (the Cellar stays at 3 ⚙; Mission Quay, the Age bonuses,
> the Cellarman — and the new **Braumeister** — are the hands). **(3) The DICE PASS** — the
> building deck’s center of mass moves to die-manipulation: **Racking Hall** (swap two
> maturing dice) · **Assay House ×2** (one maturing die ±1, v45c) · **Hop Exchange** (pay 1 `H` →
> boarding die +1) · **Tollhouse** (boarding die −1 → **+2★**) · **Bonded Store** (boarding
> die +1; **ephemeral** — it sails away with its hull, paying every contributing house 2
> goods); the echo-verb Annex and one each of Granary/Scrivener’s/Cooperage/Customs/Kiln are
> cut — 17 tiles, **8 touch a die** (was 3). **(4) Specialists** — **max(2, n−1) copies** of
> each of **5 designs** (the **Braumeister** joins: at the start of your turn your ripest
> maturing cask ages +1), and **Bergen grants at most ONE specialist per ship sailed** (load
> order decides). **(5) LADINGS — the new order layer:** a face-up **row of 3** kontor order
> tiles (a kontor + a die minimum or a named beer → printed **2–5★**); delivering a
> qualifying cask **claims one** (one per cask; the ★ bank at once); the row refills at the
> **end of the turn**. The row makes every kontor’s delivery value a **variable economy** —
> read it before you sail. The live build is `play.html` (**KEY `hanse-v49d`**; beneath v4.7, the v4.6d/c/b letters and v4.6 sit the 2026-08-01 letters, designer-ruled: **v45h** — the floor covers are OFF for now: all 3 vessels + both seats open from the start (the Flight keeps its ladder, loses its unlock duty) · **v45g** — **aging is required for every Q3+ beer**: an export never STARTS Ready (start caps at Q−1; the Cellarman-Broyhan ready-at-brew leak closed) · **v45f** — the Guildmaster plays the designer's quality line (`AUTOMA.md`) · **v45e the RECIPE TARIFF** — the recipe fee is the formula **H = Q−2** (Broyhan/Keut 1 `H` · Mumme 2 `H` · Bock 3 `H`), paid at **every** channel, the Bruges prize included (the prize is the pick, never the waiver; the Bock rush taxed) · v45c Assay **±1** · **v45d the POWER LADDER**: the Racking Hall swaps ANY two vessel dice **uncapped** (3 `G`), fees print in **grain only**, the Hop Exchange becomes a pay-hops vessel-lift action, the Tollhouse pays **+3★**, and the **Abbey Cellar** joins — pay 3 `H`, ALL maturing casks age to Ready).

> **v4.5 “Empty Tray” (designer-ruled 2026-07-31 — off human playtest #24).** Two changes.
> **(1) The end trigger is the EMPTY TRAY:** the first house to **commit its last tally die**
> — parked, riding a vessel, or aboard an unfilled hull; the tray reads **0** — sets the final
> round. Parked-out is no longer required (the #24 stall: a player’s last dice sat aboard
> hulls that never filled, and the end could not be triggered at all). **(2) The pool is 12**
> ⚙ (was 14) — the game runs shorter.

> **v4.4 “Maiden Load” (designer-ruled 2026-07-31).** **The commission regains its free
> load:** after paying the 1 `G` and placing the hull *(★ = berths at the time; the mint is
> cut at v4.5b)*, the commissioner
> may **at once load ONE Ready cask from their own vessels** onto the new hull — a **normal
> load** (the gate reads the die as it boards, after the slot’s lifts; the cask’s load bonus
> fires; a full hull sails — a Skute immediately). Optional, never forced. Commission +
> Skute = the old charter as pure components (1 `G`, one cask, sails now).

> **v4.3 “Open Quay” (designer-ruled 2026-07-26 — the third ruling off playtest #23).** **The
> occupancy toll is CUT:** sharing a station costs nothing — move where the board is best,
> full stop. The interaction lives where the components put it: the **berth race**, the shared
> buildings, the displays/draft and the majorities. *(AI-only, same ruling: the greedy tiers
> are re-taught to the v4 economy — fee-netted values, Flight marginals, horizon sense; the MC
> tiers stay the strategy oracle.)*

> **v4.2 “Tariff” (designer-ruled 2026-07-26 — the second ruling off playtest #23).** Two
> changes on v4.1. **(1) The fee rides the ITEM, not the channel:** every acquirable recipe /
> specialist / building carries its **own printed wharf fee** ⚙ — recipes Broyhan `1H` · Keut
> `1G` · Mumme `2H` · Bock `1G2H`; specialists Cellarman `2H` · Grain Factor `1G` · Hop
> Gardener `2H` · Stevedore `1G` (v4.2c markup); buildings free (chipless) / `1G` / `2G` by tile — paid at
> ANY wharf channel (Scrivener’s Hall · the Hiring Post · the gain load-bonuses). Kontor
> prizes stay free, and there is **never a fee-on-fee**: using a building charges nothing of
> its own. **(2) Novgorod pays the die +2★** — the refine prize is cut; every die parked there
> banks **pips +2** (6–8★ at gate 4), printed on the kontor mat.

> **v4.1 “Counting House” (designer-ruled 2026-07-26, off human playtest #23 — the first v4
> table).** Two changes on the v4.0 spine. **(1) Paid at the wharf, free at the kontor:**
> gaining a **recipe / building / specialist** through a wharf channel — Scrivener’s Hall, the
> Hiring Post, or the *Gain 1 recipe/building/specialist* load bonuses — costs the **1 `G`
> wharf fee** ⚙; the kontor prizes stay free. **(2) The dice are the ONE clock:** the
> Sailed-Ships track is **cut** (trigger and component) — the **14th tally die a house parks**
> sets the final round; dice never return, so the pool is the whole runway (`MAX_ROUND` 25
> stays the rules-side backstop; sails end nothing).

> **v4.0 “Bright Beer” (designer-ruled 2026-07-21, off `archive/records/V4-STREAMLINE.md`).** The streamline
> keystone. **The tally die is the whole cask:** set to the printed **start value at brew**
> (start = quality − aging steps), turned up as the beer ages, **Ready when it reaches the
> quality**, lifted past quality only by buildings (**hard cap 6**), and **parked at the kontor
> on delivery** — pips = the banked ★, the body = presence and the end clock. **There is no
> deploy:** slots hold **a building and/or a ship (≤1 of each)**, never casks; casks go straight
> from your vessels onto hulls. **All buildings serve everyone** and pay their builder **+3★**;
> the owner-pays Privileges are gone. **Stations print ONE action each.** **The Hall is tabled.**
> All numbers ⚙.

> **Status: live.** Supersedes v3.4 “Tally Dice” (`RULES.md` history in git; the v3 line’s plan
> docs — `archive/records/V3-PATH-A.md`, `archive/records/HALL-STUDY.md` — remain as records). Prior playable archives:
> `archive/v2.9/` (v2.9.1) · `archive/play.html` (v0.16.1).

---

## 0. What v4.0 keeps and cuts (read first)

**Keeps:** the 2×2-stations + 8-slot Wharf and move-then-activate; row-or-column lines;
ships that **sail when full**, benefits sealing **on delivery** in boarding order;
the four Kontore and tiered majorities; the steerable brew piles; the Flight on the recipe
cards (distinct beers **SHIPPED** — v4.9d, (n−1)² min 3); goods as the only currency; the warm start;
the **dice end clock** (v4.1 — the one clock); no dice-as-randomizers (the quality die is a
**marker**, never rolled) · no cards-as-hand · no money.

**Cuts (whole systems):** the **deploy state** and everything on it (over-deploy, tap-out,
souring, the Open Staithe, slot locality for casks, rival loading, deploy-first + both its
exception doors) · the **stay-home Floor turn** (Age pool, vessel-cask Floor actions, flip
Wilds) · the **Hall** (Three Coins, launches, enshrine — tabled, seam kept) · **Dispatch**
(Kontor charters, contracts, fares) · all 12 **Privileges** and tile **ownership** (frames,
rent-to-owner) · the Market’s Acquire (recipes/tiles are **earned, not bought**) · the Cellar’s
Specialist buy · the dockside pickup of deployed casks *(the commission’s own free load —
vessel-direct — RETURNED at v4.4)* · the Quaymaster, Lagerkeeper and
Coppersmith · Wilds and face-down flips · the three expansion toggles (**tabled** with the Hall)
· **the Sailed-Ships track** (v4.1 — sails end nothing; the dice are the clock).

---

## 1. Setup (symmetric)

Each player starts with (⚙):
- **3 `G` (grain), 2 `H` (hops)** — storage cap 8 ⚙; goods gained above the cap are lost (the cube supply itself is not a limit).
- The **Gruit** and **Hopped** recipe **cards**, on the board's **COLLECTED side** (v4.9d — a
  card completes, moving RIGHT, when that beer's first cask LOADS; the warm Gruit is brewed
  but counts for the Flight only once it ships). More recipes are **earned** (§7): Bruges’ prize, cask load
  bonuses, building actions.
- A **player board** (§8): **3 vessel slots** and **2 specialist seats — all open from the
  start (v45h: the covers are off for now)**. The Flight keeps its scoring ladder.
- **13 QUALITY DICE ⚙ (player-colour d6 — v4.9b; the 13th funds the mason’s marks) — the
  player’s whole runway, in public view.** A die
  leaves your tray at **brew** (it IS the cask’s aging marker and value), rides the Ship’s
  berth, and **parks at the Kontor on delivery** — presence, the ★ scored (the pips), and the clock,
  all one component. A die also leaves the tray at **build** (v4.9 — it stands on the tile as
  the mason’s mark). **No die in the tray → no brew, no build, no placing presence — and an
  EMPTY tray sets the final round (§10).**
- A **warm-start Ready Gruit** in vessel 1 (die at 1).

Shared board: the **Wharf** (4 stations + 8 slots); the four Kontore (Bruges/London/Bergen/
Novgorod) open — **the Hall is off the table**; **deal 3 of the 4 export beers** (the variable
ladder); stack the **cask tiles in six face-up piles, one per beer** (each shuffled; every pile top visible); shuffle the **Ship deck** (Skute 1 · Cog 2 · Hulk 3 berths, each bound for a printed Kontor) and deal
a face-up **display of 4** ⚙; shuffle the **Building deck** — **deal 17 of the 20 printed
tiles** ⚙ (≥1 Malt Kiln + ≥1 Mission Quay: if the deal lacks one, swap it in from the set-aside tiles for a random dealt tile and reshuffle; the undealt 3 stay in the box — v4.6;
all neutral, §5) — and deal a Wharf
**display of 4** ⚙; shuffle the **Specialist deck** (**5 core designs × max(2, n−1) + the 8
guild singles** — v4.6) and deal a **display of 4**; shuffle the **Order deck** (15 ⚙, §7b) and deal a face-up
**row of 3** ⚙. **Warm start on the slots:** a
guaranteed **Hulk → Bruges** + one more dealt ship, and **two neutral Buildings** dealt from the
deck (setup deals score nobody). Each player places a worker on any station — **opening
placement free.** First player fixed all game.

---

## 2. The Wharf — stations & slots (the spine)

```
        A ── B            A  Market   (Source)  → B  Brewhouse (Brew)
        │    │            │                        │
        C ── D            C  Harbor   (Ship)   ←  D  Cellar    (Age)

  Production order A→B→D→C = Source → Brew → Age → Ship   (move where the board is best)
  (orthogonal moves only — never the diagonal)
```

The turn:
1. **Move** your worker to an orthogonally adjacent station (from turn 2) and **choose the
   station’s row or its column.** Sharing a station costs **nothing** (v4.3 — the occupancy
   toll is cut; move where the board is best).
2. **Resolve the line — its two stations and its two slots, in any order; every part optional.** A line offers:
   - its **two stations** — each fires its ONE printed verb (§4);
   - its **two slots** — each offers **the building’s printed action** (if a building stands
     there) **and/or a LOAD of the ship docked there** (if a ship stands there) — each once
     (§5–6). An empty slot does nothing — **author it.**
   **The line is read LIVE (v4.6c):** a Ship commissioned or warped onto a line slot
   mid-turn — or a building built there — opens that slot this same activation
   (each stop still at most once; a ship sailing off closes its stop).

---

## 3. The cask & the die (the soul)

A cask tile prints its **quality Q1–Q5**, its **START DIE value**, and **one load-bonus action**
(printed on the tile taken at brew — one pile per beer, v4.7a; Gruit pinned to *Gain 2 goods*). The
**quality die on the tile is aging, boarding, value, presence and clock in one number:**

- **At brew:** take a die from your tray, set it to the printed **start value = quality − aging
  steps**. *(Gruit ages 0 steps — fresh ale, Ready at brew, die 1.)*
- **Aging:** each step turns the die **+1**, **never past the quality** — the cask is
  **READY when die = quality.** **Dice never turn on their own (v4.5b — automatic aging is
  cut):** the hands on an aging die are the **Cellar** (3 points ⚙), **Mission Quay** (+2),
  the **Age +2** load bonuses, the **Assay House** (pay 1 `H` — one cask to Ready, v4.12), the **Racking Hall** (an uncapped
  swap, v45d), the **Hop Exchange** (pay `H` — past quality is fine, v45d), the **Abbey
  Cellar** (pay 3 `H` — everything aging to Ready, v45d), the **Cellarman** (a higher
  start) and the **Braumeister** (+1 to your ripest at turn start).
- **Loading:** a Ready cask boards a Ship whose **minimum its die meets, read as it boards** —
  after the slot’s lifts (a Malt Kiln or Bonded Store here turns the die **+1, cap 6**; a
  Customs House lowers the Ship’s minimum by 1 — the cask sells at its die; a Tollhouse may drop
  the die 1 for **+3★**, v45d).
- **Delivery:** the die **parks at the Kontor showing its face** — the pips ARE the ★ scored
  (never less than 1), the body is your presence there and a beat of the end clock (§10).

| Beer | Q | Aging steps | Die starts | Brew cost | Earned (wharf fee `H` = Q−3 ⚙ — every channel, Bruges too · v4.9c) |
|---|---|---|---|---|---|
| Gruit | Q1 | 0 (Ready at brew) | 1 | `G` | starter |
| Hopped | Q2 | 1 | 1 | `G H` | starter |
| Broyhan | Q3 | 1 | 2 | `G H H` | dealt export · **free** (v4.9c) |
| Keut | Q3 | 2 | 1 | `G G H` | dealt export · **free** (v4.9c) |
| Mumme | Q4 | 3 | 1 | `G H H H` | dealt export · fee `H` |
| Bock | Q5 | 3 | 2 | `G G H H H` | dealt export · fee `H H` (the taxed climb — v4.9c) |
| *Gose* ⚙ | Q2 | 1 | 1 | `G G` | *expansion* export · **free** · Gain 3 goods (§12 · v4.15b) |
| *Zerbster* ⚙ | Q3 | 1 | 2 | `H H H` | *expansion* export · **free** · Parti-Gyle (§12) |
| *Duckstein* ⚙ | Q2 | 1 | 1 | `G H` | *expansion* export · **free** · Smoke-Hardy (§12) |
| *Jopenbier* ⚙ | Q6 | 4 | 2 | `G G H H H H` | *capstone* (own toggle) · always acquirable · fee `H H H` (§12) |

*(The Cellarman starts your dice one higher — a Bock at 3, and a Broyhan at 3: **READY at
brew** (the v45g never-starts-Ready cap is repealed, v4.12 — that power is the point). A
start value never exceeds the quality. Keut’s printed perk: its delivery also **places 1
presence**, free — a tray die parks at face 1 at that Kontor.)*

> **The squeeze (state it to players):**
> - **You can’t brew everything** — 2 vessels (a 3rd behind the Flight), the recipe faucets,
>   and 13 dice for the whole game.
> - **You can’t deliver everywhere** — the hulls in the market decide which ports are open;
>   berths are shared and race away.
> - **You can’t hold everything** — a Ready cask clogs a vessel until a hull appears; goods cap
>   at 8.
> - **You can’t be everywhere** — one worker, one line a turn; the rest of the board works on your rivals’ clocks.

---

## 4. The four stations — ONE printed action each

- **A · Market — SOURCE:** take **2 goods** (any mix).
- **B · Brewhouse — BREW:** pay a recipe you hold into an **open vessel** + a **tray die** set
  to the start value; the cask IS the **top tile of that beer’s pile** — its printed bonus rides (every pile top is public; v4.7a).
  *(A beer's recipe card completes — moves to the board's right side, the Flight record —
  when its **first cask LOADS onto a Ship**, not at brew — v4.9d, §6/§8.)*
- **D · Cellar — AGE:** **AGE 3** ⚙ — turn your aging dice up three steps, split freely —
  with auto-aging cut (v4.5b) this is the deepest well.
- **C · Harbor — COMMISSION:** pay the Ship’s **printed fee** — **Skute 2 `G` · Cog 1 `G` ·
  Hulk free** ⚙ (v4.8: 2/1/0 for 1/2/3 berths — dispatch speed is dear, tonnage is free) —
  and place it on a slot **without a Ship** (a building is fine); the display of 4 refills.
  Then **one free load** (v4.4): you may at once load **1 Ready cask from your
  vessels** onto the new Ship — a normal load (§6; its bonus fires; a Skute sails on it).
  Optional. **A commission scores NO ★ (v4.5b)** — the Ship and the instant load are the whole
  reward; commissions pay in tempo, not points.

---

## 5. The slots & the buildings — one green family

The 8 slots each hold up to **one building** (bottom) and **one ship** (top). **Every building
serves whoever activates it; nobody owns the use.** Building one — London’s prize (free) or a *Gain 1
building* action (pay the **tile’s printed wharf fee** ⚙, v4.2 — a chipless tile is free),
always **from the Wharf display of 4, placed at once** — **stands one of the builder’s quality
dice on the tile at its PRINTED START FACE (v4.9b ⚙ — 1/2/3 by tier)**: each use by any
player turns it up 1 (cap 6), and the pips score to the builder at game end. No tray die →
no build; **a build prize that can’t be taken is forfeit** (no goods fallback — v4.9b). **Using a building never costs a fee of its own** — at Scrivener’s Hall / the Hiring
Post you pay only the recipe’s / specialist’s printed fee. **Overbuild — ONE payment per
placement (v4.2c):** a fee-paid gain **covers the ground** (no rent); the **1 `G` ⚙ ground
rent** applies only when an otherwise-free placement (London’s prize, or a chipless tile)
lands on a built slot. The displaced tile is **returned to the box — its die scores its pips at once and returns to
its owner’s tray (v4.9)**. ⚙ *watch: overbuild as die-denial (killing a grown mark refunds
the die but caps its growth) — the dials are the rent and restrict-to-full-board.*

**The deck (the box prints 20 ⚙ — SETUP DEALS 17 each game, v4.6; all green — v4.5b “the dice
pass”: 9 die-touching designs; v45d “the power ladder”, GWT-style): fees print in GRAIN ONLY —
grain buys infrastructure, hops power the beer (the Hop Exchange, Abbey Cellar and Assay House are paid
in `H` to USE, never to gain). The cheap tiles are honest utilities; the 3 `G`/2 `G` power tier
swings; the dealt subset makes every wharf a different economy.**

| Building | Fires | Effect ⚙ | Qty ⚙ | Wharf fee ⚙ | Mark starts ⚙ |
|---|---|---|---|---|---|
| Granary | resolve its slot | **Gain 2 goods** (any mix) | 1 | free | 1 |
| Scrivener’s Hall | resolve its slot | **gain 1 recipe** (at the recipe’s fee) | 1 | 1 `G` | 2 |
| Mission Quay | resolve its slot | **Age +2** (your vessels) | 2 | free | 1 |
| Hiring Post | resolve its slot | **gain 1 specialist** (at its fee) | 1 | 1 `G` | 2 |
| Almoner’s Stall | resolve its slot | **Pay 2 G: place 1 presence** (§7) | 1 | free | 1 |
| **Racking Hall** *(power)* | resolve its slot | **swap the dice of ANY two of your vessel casks — no quality cap** (the beer transfers whole; global cap 6). *The launder engine: rack an aged Bock’s 5 onto a Ready Gruit — the 5-pip Gruit ships, the Bock re-ages from 1.* | 1 | 3 `G` | 3 |
| **Assay House** | resolve its slot | **pay 1 `H`: ONE maturing cask ages to READY** (its die straight to its quality — v4.12) | 1 | 1 `G` | 1 |
| **Abbey Cellar** *(power)* | resolve its slot | **pay 3 `H`: ALL your aging casks age to READY** (each die to its quality) | 1 | 2 `G` | 3 |
| **Hop Exchange** *(power)* | resolve its slot | **pay up to 2 `H` ⚙ — turn your vessel dice +1 per hop** (any split; **past quality is fine**; cap 6) | 1 | 2 `G` | 2 |
| **Malt Kiln** | on load here | the boarding cask’s **die +1** (cap 6) | 2 | 2 `G` | 2 |
| **Tollhouse** | on load here | the boarding cask **may turn its die −1** (never below the Kontor’s minimum): **score +3★ at once** (net +2, any quality) | 1 | 1 `G` | 3 |
| **Bonded Store** | on load here / at sail | the boarding die **+1** (cap 6); **when this Ship sails, the Store sails with it** (returned to the box) and **every player with a cask aboard gains 2 goods** | 1 | 2 `G` | 3 |
| **Cooperage** | passive · on load | the Ship here: **+1 ship capacity** — and **each cask loaded here scores its loader +1★** ⚙ (v4.12b — was +2, eased off the power study) | 1 | 2 `G` | 3 |
| **Customs House** | passive | the Ship here: **−1 quality required** to board (sells at the die) | 1 | 2 `G` | 3 |
| **Rich Berth** | passive | the Ship here may **sail one berth short** (min 1) | 1 | 2 `G` | 3 |
| **Victualling Yard** *(v4.6 · ephemeral)* | on load here / at sail | the boarding cask’s **load bonus fires TWICE**; **when this Ship sails, the Yard sails with it** (boxed) | 1 | 2 `G` | 3 |
| **Merchants’ Exchange** *(v4.6)* | resolve its slot | **replace UP TO 3 open Orders** (v4.12) — each cycled to the bottom of its deck, its replacement revealed **at once, in place** (the end-of-turn refill is untouched) | 1 | 2 `G` | 2 |
| **Warping Capstan** *(v4.6)* | resolve its slot | **move ANY docked Ship** (cargo rides) to any shipless slot — **full where it lands, it sails at once** (v4.12) | 1 | 2 `G` | 3 |

*(Action buildings print the same verbs as the cask piles — the wharf and the cargo speak one
language. The Kiln, Hop Exchange and Racking Hall are the “improve the humble beer” engines: a
Gruit can carry a 6. The **Bonded Store is the ephemeral trial** — an Orléans-style event as a component: place
it on the slot whose ship serves YOUR plan; it pays its lift while it stands, pays everyone
aboard when it goes, and its slot opens again.)*

**One-fire rule:** on a line, the active player may use each slot’s building action once and
load each slot’s ship once — all optional, any order, resolved on the active player’s turn,
and read LIVE (v4.6c): a Ship or building landing on a line slot mid-turn opens its slot.

---

## 6. Ships & loading (the cash-out)

- **Ships** are neutral, each bound for a printed Kontor, off a shuffled deck; a face-up **display of 4**
  ⚙. **Skute 1 · Cog 2 · Hulk 3** berths ⚙ (deck blend **6/10/8** ⚙ — 24 Ships, 6 per Kontor). **Commission** (§4C) pays
  the Ship’s **printed fee (2/1/0 `G` by size — v4.8)** and places it on any shipless slot; it scores nothing (v4.5b).
- **LOAD (resolve a slot with a docked Ship):** take **one READY cask from YOUR vessels** whose **die meets the
  Ship’s minimum** (after this slot’s lifts — Kiln/Bonded Store; Customs lowers the
  minimum; the Tollhouse may stamp the die down for **+3★**, v45d), seat it in the lowest berth (the die
  rides the tile), and **fire the cask’s printed load bonus** (§6b) — **after any sail the
  load completes** (deliveries and prizes resolve first, then the bonus). **A beer's FIRST
  load moves its recipe card to the board's COMPLETED side — the Flight record (v4.9d).** The freed vessel is open
  again. *(The Stevedore loads **2** in EVERY load flow — v4.6d. The **commission**
  includes one such load onto its new Ship — §4C.)*
- **A ship SAILS the moment it is full** — a **Skute sails on its first load.** Each cask aboard
  **delivers in boarding order**: score ★ = its die, park the die at the Kontor, resolve the Kontor’s
  prize (owner’s choice, **when gained** — **every cask pays its Kontor’s prize, v4.7**: one
  grammar at all four Kontors; boarding order = pick order),
  and the cask **may claim one open CONTRACT it qualifies for** (§7b). The Ship returns to the
  bottom of the deck; a Bonded Store on the slot sails away with it (§5). 
- Casks are **private until aboard** — there is no loading of rival casks, and nothing on the
  wharf to hijack. The race is for **berths**: topping off a Ship sails *everyone’s* cargo, on
  your clock.

### 6b. The load bonuses — eight specific gains (the cask piles ⚙)

| Action | Effect | Pile minimum ⚙ |
|---|---|---|
| **Gain 2 goods** | any mix | Q1 (Gruit pin) · Q2+ |
| **Age +2** | 2 steps across your vessels | Q2+ |
| **Load 1 more cask** | onto **any** eligible Ship on the wharf (its bonus fires too) | Q2+ |
| **Place 1 presence** | a tray die → a Kontor you’ve delivered to (§7) — **free here** (only the Almoner’s Stall charges 2 G, v4.12) | Q2+ |
| **Gain 1 recipe** | pay the **card’s printed fee** ⚙ — a dealt export | Q2+ |
| **Gain 1 building** | pay the **tile’s printed fee** ⚙ (no chip = free) — display → any legal slot; **your die stands on it** (v4.9) | Q3+ |
| **Gain 1 specialist** | pay the **tile’s printed fee** ⚙ — from the display (open seat required) | Q3+ |
| **Brew 1** | pay its cost into an open vessel (tray die) | Q3+ (v4.12) |

*(Enshrine left with the Hall. Every pile top is face-up — brew toward the bonus you want (v4.7a: one pile per beer).
**Paid at the wharf, free at the Kontor** (v4.2 — the fee rides the ITEM): the three
acquisition gains cost the chosen item’s **own printed fee**, here and at Scrivener’s Hall /
the Hiring Post. London’s and Bergen’s prizes waive it — **a recipe’s fee (`H` = Q−3, v4.9c — the Q3s free) is paid
everywhere, the Bruges prize included (the v45e grammar)**. No building ever adds a fee of its own.)*

---

## 7. The Kontore & prizes (the Destinations board)

| Kontor | Minimum ⚙ | Value | Prize on delivery ⚙ | Majority (1/2/3) ⚙ |
|---|---|---|---|---|
| **Bruges** (Hub) | 1 | the die | **Gain 1 recipe** — dealt exports, **at its `H` = Q−3 fee — the Q3s free** (v4.9c; the prize is the pick, never the waiver; no affordable pick → 2 goods) | 4 / 2 / 0 |
| **London** (Steelyard) | 2 | the die | **A building** (display → placed; **your die stands on it** — v4.9) | 5 / 3 / 1 |
| **Bergen** (Bryggen) | 2 | the die | **A specialist** (display, free) — **per cask** (v4.7, the uniform grammar; load order = pick order) | 9 / 5 / 2 (anchor) |
| **Novgorod** (Peterhof) | **3** (the export band ⚙ — v4.10) | **the die +2★** ⚙ (5–8) | — (the value premium IS the prize) | 8 / 5 / 2 |

- **The minimum reads the DIE as it boards** (post-lift) — a Kiln’d Hopped (die 3) makes
  Novgorod now (v4.10); a Kiln’d Gruit (die 2) still cannot. One number rules boarding and
  value alike.
- **Prizes resolve WHEN GAINED, owner’s choice** (a rival tops off a Ship carrying your cask →
  you pick your prize right then). No queues.
- **Novgorod’s premium is printed on the mat** (v4.2): every *delivered* die there counts
  **pips +2** — for the score AND the end-game audit. (Minimum 3 — v4.10 — means delivered dice
  show 3–6, so a face-1 die at Novgorod is always placed presence, worth its flat 1★.)
- **Presence** = your parked dice there. **Placing presence** (the cask action, Keut’s perk)
  is **free (v4.12 — the v4.11 fee is scoped back)**: take a **tray die**, park it at a Kontor
  you’ve **already delivered to** at **face 1** (1★ + majority weight + the clock; a seated
  Town Crier adds +2★ per die). **Only the Almoner’s Stall charges the 2 G factor’s fee** for
  the same placement. No tray die → no placing presence.

### 7b. Orders — the order row (v4.5b)

A shuffled **Order deck (15 ⚙)** feeds a face-up **row of 3** beside the Kontor mats. Each
tile names a **Kontor** (or *any*), a **condition** — a minimum die face (*die 4+*) or a named
beer (*Mumme*) — and a printed reward (**2–5★** ⚙).

- **Claim = a qualifying delivery.** When your cask delivers at the named Kontor and its
  **parked face** meets the condition (the face after all lifts/stamps — exactly what the die
  shows as it parks), you **may take one matching tile**: it comes to you (the record), its ★
  **score at once**. **One Order per delivered cask;** several casks on one ship may each
  claim (boarding order — earlier casks pick first).
- **The row refills at the END of the turn** (the v4.4c rhythm) — a claimed order leaves a gap
  the rest of the turn; the deck never reshuffles claimed tiles, and a dry deck leaves the
  row short. (Every display refills only while its deck lasts.)
- **Setup strips the dead orders (v4.7):** an Order naming a beer **not dealt this game**
  returns to the box — every order in the deck is claimable.
- **The row is the variable economy:** the same die-5 Bock is worth more the turn a *Novgorod
  die 5+ → 3★* order lies open — read the row before you brew, lift and sail. *(The schedule
  leans low on Novgorod — its printed **+2★ premium** already pays the climb.)*

**The schedule (15 ⚙):** Bruges — die 3+→2★ · die 4+→3★ · Keut→3★ · die 5+→4★ · London —
die 4+→3★ · die 5+→4★ · Broyhan→3★ · die 6→5★ · Bergen — die 4+→3★ · die 5+→4★ · Mumme→4★ ·
Novgorod — die 5+→3★ · Bock→4★ · die 6→4★ · any Kontor — die 6→3★.

*(**Hall mode — v4.15:** the Guildhall toggle REPLACES this deck with its eased 20-tile
schedule (1–3★), and every claim also pays an ⚜ Invitation — §12.)*

---

## 8. The player board (private) — 3 vessels · 2 seats

- **3 vessel slots** — each holds one aging/Ready cask (its die on the tile). **All open
  from the start (v45h).**
- **2 specialist seats** — **both open from the start (v45h).**
  A player never owns two of a type; specialists are **earned free** (Bergen, Hiring Post, the
  cask verb) — never bought.
- **Recipe cards** sit BESIDE the board (v4.9d): **COLLECTED to its LEFT** until that beer's
  first cask **loads onto a Ship**, then moved to the **COMPLETED pile on its RIGHT** — **the
  completed cards ARE the Flight record.** The board itself **prints the Flight ladder**
  (beers shipped 1–5 → 0/0/4/9/16★ ⚙) and a **Orders zone** (claimed tiles pile there),
  plus the ★ score seat and the dice/grain/hops supply ledge — §11 read straight off the
  table.

**The SPECIALISTS (13 designs ⚙, v4.6 — the 5 CORE at max(2, n−1) copies + the 8 GUILD at 1
copy each · display of 4 · each prints its wharf fee ⚙ — free as Bergen’s prize, **per
cask** (v4.7). **No tile prints a requirement (v4.12** — the Innkeeper’s and Chronicler’s
gates are cut; the earn-gate seam stays for future tiles**).** A taken
tile’s gap stands for the rest of the turn — the display refills from the deck at the END of
the turn (v4.4c; ships and buildings refill at once):**

*The core five (the drip floor):*
- **Cellarman** (fee `2H`) — your dice **start one higher** (never above quality; a Bock
  starts at 3 — and a Broyhan at 3, **Ready at brew**: the v45g cap is repealed, v4.12).
- **Grain Factor** (fee `2G`, v4.7 — was 1G, the probe’s auto-pick) — each time you gain
  grain (any faucet): **+1 `G`**.
- **Hop Gardener** (fee `2H`) — each time you gain hops (any faucet): **+1 `H`**.
- **Stevedore** (fee `1G`) — **each time you load, you may load 2 casks** (the slot load, the
  commission’s maiden load, and the *Load* bonus alike — v4.6d; each cask fires its bonus).
- **Braumeister** (fee `1G` `1H`, v4.5b) — **at the start of your turn, age 1 cask +1**
  (v4.12 wording; the app ages your ripest — the die closest to Ready). The earned heir of
  the cut auto-age.

*The guild eight (v4.6 — one copy each):*
- **Guild Scholar** (fee `2G`) — **when gaining recipes, pay no fee** (v4.12 wording): the
  `H` = Q−3 fee is waived at every channel, the Bruges prize included.
- **Innkeeper** (fee `2G`) — **brewing 3+ casks at once: age one +1 at the start of your
  turn** (v4.12 rework — with 3+ casks in your vessels at turn start, the ripest maturing
  ages +1; the 4th-vessel tile and the requirement are cut; the Braumeister’s tick may
  stack).
- **Supercargo** (fee `2H`, v4.7 — was 1H, the probe’s +29 outlier) — each time a Ship
  carrying **your** cask sails on a **rival’s** turn: gain **1 `G` 1 `H`**.
- **Chronicler** (fee `1G` `1H`) — **game end: +3★ per Order tile at your seat** ⚙
  (v4.12 — uncapped, no requirement: Orders are hard to claim, so the strategy pays).
- **Alderman** (fee `2G`) — **game end: +2★ per Kontor where you have 3+ parked dice** ⚙.
- **Town Crier** (fee `1G`) — **each presence die you place scores +2★** ⚙ (v4.12 — the die
  parks at face 1 as ever, so a placement banks 3★ total; still one die, one clock beat;
  delivery-bound as ever).
- **Chandler** (fee `1G`) — **once per turn** you may swap **1 `G` ↔ 1 `H`** with the stores
  (a free action; the Grain Factor / Hop Gardener drips apply — that is the combo).
- **Shipwright** (fee `1H`) — **when commissioning Ships, pay no fee** (v4.12 wording — the
  Ship’s printed `G` fee is waived: 2 `G` on a Skute, nothing on a Hulk).

---

## 9. Goods & storage

`G` grain · `H` hops — the **only** currency. Storage cap **8** ⚙. No money; no spendable
prestige. The faucets: the Market (2 + specialists), Granaries, *Gain 2 goods* load bonuses.

---

## 10. End of the game (the dice clock)

**ONE clock (v4.5): the first EMPTY TRAY.** The moment a player **commits its last quality die**
— to a brew, a placed presence, or with every remaining die already riding vessels/Ships — its
**tray reads 0** and the final round is set (finish the round → score). Parked-out is NOT
required: dice aboard unfilled Ships count as committed. Dice never return — the 13 dice are the
player’s whole runway, always countable: tray + in play + parked (dice on your buildings included) = **13** ⚙ (v4.9b).
Sails end nothing; ships are pure logistics.

A **MAX_ROUND ceiling** (~25 ⚙) backstops a slow table. Pace target **~12–25 rounds.** ⚙ *The
tray size (13 dice — v4.9b) is THE pace dial now.*

---

## 11. Scoring — the clear spine

**Scored in play (onto the score track as it happens):**
1. **Deliveries** — ★ = the die, parked at the Kontor (the pips remain the audit; Novgorod
   +2★ on top).
2. **Orders** — the claimed tile’s printed ★ (v4.5b; the tiles at your seat are the audit).
3. **Tollhouse stamps** — **+3★** per stamped cask (v45d; the die drops 1 — net +2).
4. **Cooperage wharfage** — **+1★** per cask loaded at its slot (v4.12b ⚙).
5. **Placed presence** — 1★ each (the face-1 die; a seated Town Crier adds +2★ per die).
6. **A departing building’s die** — its pips, scored as the tile leaves play (v4.9; the die
   returns to its owner’s tray).

*(Commissions score **nothing** — v4.5b. The score track + your parked dice + your claimed
tiles remain the whole audit trail; no memory required.)*

**End-game:**
7. **Majorities** — at each Kontor, by **parked dice** (Bruges 4/2/0 · London 5/3/1 · Bergen
   9/5/2 · Novgorod 8/5/2 ⚙; 2p skips 2nd; ties split).
8. **The Flight** — distinct beers **SHIPPED** (the completed cards on your board — v4.9d): **(beers−1)², min 3**
   (3→4 · 4→9 · 5→16 · 6→25 ⚙).
9. **Buildings — the Mason’s Marks (v4.9)** — each die standing on one of your buildings
   scores **its pips** (1–6★). The dice on the tiles are the audit.
10. **The Guild (v4.6)** — a seated **Chronicler** (+3★ per claimed Order ⚙ — v4.12) or
   **Alderman** (+2★ per Kontor with 3+ parked dice ⚙) scores its printed line — the audit is
   the tiles at your seat and the dice on the mats.
11. **Tiebreak:** the summed dice in your vessels, then most goods.

> **The legible fork:** ship **wide** (majorities + prizes) or ship **lifted** (Kiln-fed dice,
> the Novgorod bar), **build** (dice that grow on the tiles you author) or **brew broad** (the
> Flight). A new player picks one; an expert braids two.

---

## 12. Expansions (v4.14 “Beer Atlas” — two live opt-in toggles)

*Two independent **New Game toggles**, freely mixable. With both off the base game is
unchanged. Everything else — Kontore, majorities, Orders, the Flight, the clock, scoring —
runs as written: the expansions are roster content under the existing grammar. Every
expansion beer is **pinned**: all its cask tiles print the same load bonus (drafting a pinned
beer IS the agency — the Gruit rule, generalized).*

### Specialty Beers

Setup deals **3 of 7** exports (the base four + these three), guaranteeing **at least one of
Mumme/Bock** ⚙ so the quality climb, Novgorod’s traffic and the pinnacle stay meaningful.
Recipe fees ride the standard formula (`H` = Q−3 — all three **free**), paid at every channel.

| Beer (town) | Q · steps · brew ⚙ | The pinned bonus IS the signature (v4.15b) |
|---|---|---|
| **Gose** (Goslar) | Q2 · 1 · `G G` (no hops) | ***Gain any 3 goods*** — the better Gruit when you have the grain (the goods drips apply) |
| **Zerbster** (Zerbst) | Q3 · 1 · `H H H` (no grain) | ***Parti-gyle:* a free Gruit + Load 1 more** — as its cask boards, you **may** fill an open vessel with a free **Gruit** (no goods, but a **tray die**; Ready at 1), then load 1 more cask onto any eligible Ship (the fresh Gruit itself qualifies at a die-1 port) |
| **Duckstein** (Königslutter) | Q2 · 1 · `G H` | ***Place 1 presence*** *(free)* + **Smoke-Hardy** — its die turns **+1 as it boards** (cap 6): read for the minimum AND parked as the value. The race cask — a Q2 that makes Novgorod’s 3+ band; a Malt Kiln under the Ship stacks (boards at 4) |

### Jopenbier — the capstone (a second, independent toggle)

The **Q6 vintage** of Danzig — the all-in deep plan. **Never drafted:** with the toggle on it
is **always acquirable** at every recipe channel (Bruges’ prize · the *Gain 1 recipe* bonus ·
Scrivener’s Hall) at its printed fee **3 `H`** ⚙ (the formula; the Guild Scholar waives).
Brew **2 `G` 4 `H`** ⚙; the die starts at **2** and wants **four aging steps** — the longest
climb in the game (the Cellarman starts it at 3). Ready at **6**: it delivers **6★ anywhere,
8★ at Novgorod**, qualifies for every die-6 Order, and counts for the Flight as a **sixth
beer** (6 shipped → **25★** ⚙). Building lifts are void on it (the cap is 6); the Tollhouse
may still stamp it (5 + 3★). *The re-derivation (v4.14): the old dock-vintage (+1★ per turn
deployed) rode the deploy state and is **cut** — its jobs re-home on the spine: aging-as-value
= the four priced steps · the race-to-end = the empty-tray clock (four steps of runway on one
die, in every rival’s view) · contestability = the berth race.*

### The Guildhall — Invitations (a third toggle, v4.15)

**The Hall as an Order-fed shelf board.** With the toggle on:

- **The Order deck swaps** to the eased 20-tile schedule ⚙ (rewards 1–3★; conditions
  routine — die 2+/3+ across all four Kontore, four named staples, three *any-Kontor* tiles).
  Every **claimed Order also pays an ⚜ Invitation** (a small tile at your seat).
- **Enshrine (during your turn):** spend 1 Invitation + one **Ready** cask from your vessels
  whose **die ≥ a shelf’s minimum** (read off the vessel — no load-lifts; vessel-side lifts
  such as the Hop Exchange’s past-quality pump count). The die **parks on any open space** of
  that shelf — spaces are identical — and you pick **one menu option**. The die is committed:
  a clock beat, no majority weight, never returns. The cask’s load bonus does **not** fire
  (the Hall takes the cask whole).

| Shelf | Min | The menu — choose one ⚙ | Spaces (2/3/4p) ⚙ |
|---|---|---|---|
| **The Reliquary** | die 5+ | **9★** *(once per player)* · **Brew 1** (pay its cost) · **the Guild’s Seal** — claim 1 open Order outright (its ★ and its Invitation pay as any claim) | 2 / 3 / 4 |
| **The Masters’ Shelf** | die 4+ | **6★** *(once per player)* · **Brew 1** (pay its cost) · **Load 1 more cask** (any eligible Ship; its bonus fires) | 3 / 4 / 5 |
| **The Guild Table** | die 3+ | **4★** *(once per player)* · **Age 3** (a free Cellar pour) · **Gain 3 goods** | 3 / 4 / 5 |
| **The Taproom** | die 2+ | fixed: **2★ + Gain 2 goods** (every visit) | 3 / 4 / 5 |

- **The ★ option is once per player per shelf** — the ★ die stands on the shelf’s **left
  edge** (the record); action dice stand right. Arriving last pays the same as arriving
  first: first-come races **capacity only**, never a printed jackpot.
- **The engine:** your **first die on each shelf earns a new Invitation** — one claim can
  fund the whole climb; every repeat visit costs a fresh claim. Game end: a die on **all
  four shelves → +6★** ⚙ (the crown).
- The Hall pays **no majority** — its lane competes with the majority race for the same
  ripe dice; the fork is the point.

### The Trade Roads — TABLED

The Overland module (an inland map of claimable Staple-Right slots replacing the majorities)
still awaits its v4 re-derivation. The `registerExpansion` seam carries it, dormant.

---

## Open / to-tune (the ⚙ shortlist)

1. **The clock** — the dice alone; **v4.5: the first EMPTY TRAY triggers** (commitment, not
   parked-out) and the pool is **12** ⚙ — THE pace dial. The full v4.5b battery (n=500/count):
   2p 14.6 avg (82% band) · 3p 14.0 (81%) · 4p 13.3 (74%) — the early "2p ~20+ rounds" watch
   was 3-game noise. The pool sweep says **12 is on the fast edge under greedy play; 13 holds
   the 12–25 band best at every count** — greedy racers under-read human pace, so the dial
   call waits for a human table. **The human table arrived (playtest #25, 2026-08-02,
   `archive/records/PLAYTEST-25.md`): 12 rounds at exactly the sim's 3p pace** — a racing
   seat (the Cellarmaster) nulls the "humans run longer" assumption. The felt problem is
   **trigger CONTROL, not length**: the leader dumped tray dice via cheap placed presence and slammed
   the door 12 up while the human's engine peaked. Pool 13 buys the non-racer ~1 round
   (~half the felt gap in #25); the deeper watch is presence-commit speed as the racer's lever. **RULED at v4.11: the lever is PRICED — 2 G per placed presence** (the 8-round Almoner race decided it); the pool stays 13, the 14th die declined. **AMENDED at v4.12: the fee SCOPES to the Almoner’s Stall alone** — the cask-action bump and Keut’s perk are free again. The 300/count re-read: pace 13.3/13.0/12.3 (band 70/72/62%) — between the free-bump floor (12.9/12.1/11.9) and the every-channel fee (14.8/14.3/13.8); the Crier’s richer 3★ placement partially substitutes. Watch ⚙: live pace at a human table.
   **#26 (4p all-AI, `PLAYTEST-26.md`) repeats the signature:** 11 rounds — UNDER the band
   floor — with the Cellarmaster again choosing the horn. **#27 (3p all-AI,
   `PLAYTEST-27.md`) completes the picture: 15 rounds, in-band, and a GUILDMASTER raced
   the clock and won** while the Cellarmaster died holding 11 goods and 2 immature casks.
   Three tables read 12 / 11 / 15: the clock is fast **when someone races it** — trigger
   control is a strategy, tier- and count-agnostic, and the engine-vs-conversion tension
   is real. **RULED at v4.7: THE POOL STAYS 12** — the designer: *"right now the game feels
   like as long as it wants to be. Any more may drag it out. Without legible goals or
   strategic arcs in the game, it can feel repetitive."* The pool question is CLOSED; the
   open thread it leaves is **legibility** — goals/arcs a player can see and chase (the
   Orders are that layer; recorded in DESIGN §9's parking lot). **RE-OPENED AND RE-RULED
   at v4.9b:** the mason's mark spends the same runway as brews (the v4.9 A/B ran ~2 rounds
   under the band), so the designer added the 13th die — *"maybe it allows us to add one die
   to each player's supply"* — to fund the marks, not to lengthen the game (the POOL=12
   isolation run proves the die, not the start faces, is the pace lever; the 500/count
   battery reads 11.8/11.4/11.3).
2. **The recipe faucet** — Bruges + the priced verbs, all at **`H` = Q−2 (v45e — Bruges pays
   too)**. Watch: does the 3 `H` Bock tariff kill the rush or the style? And hops now carry
   three sinks (recipes · Hop Exchange · Abbey) — re-read whether slack flips to binding. If
   the Flight stalls, the dials are the formula's offset (Q−2 → Q−3) and verb frequency.
   **MEASURED at v4.9b (flow re-baseline + the port probe, 2026-08-04 — off playtest #29's
   H-0/0/1 table): hops are BINDING, not slack.** The recipe channel reads
   wanted-but-unaffordable **11–19 turns/game** (2p→4p; the no-fee arm reads ~0), Bock's brew
   share runs at ~half its no-fee rate (3.6–8.4% vs 13.9–18.1%), 8–23% of players END at 0
   hops, and the **Abbey ~never fires** (0.07–0.37/game despite being dealt in 40–52% of
   games — its 3 `H` price sits above the table's standing float). The tariff is doing its
   ruled job (taxing the climb); the question left for the designer is whether the Abbey's
   price point and the Bock style are acceptable casualties. **RULED at v4.9c (2026-08-04):
   the offset dial is PULLED — the formula drops to `H` = Q−3** (Keut/Broyhan free · Mumme
   1 `H` · Bock 2 `H`). The residual watches move to the new letter: the Bock rush at its
   halved tax, the Scholar's price, and whether freed hops revive the Abbey/Hop Exchange.
3. **Novgorod at minimum 4 → 3 (RULED v4.10)** — is die-4 boarding reachable enough (Mumme+, or Kiln’d Q3)? Its
   pull is now the **+2★ die premium** (6–8★ deliveries, v4.2) + the 8/5/2 majority — watch
   whether +2 overshoots (the dial is the printed premium).
   **MEASURED at v4.9b (the port probe, 2026-08-04 — off playtest #29's dead table): the port
   goes UNDELIVERED in ~71% of 2p · ~33% of 3p · ~23% of 4p games — tier-agnostic** (the GM
   oracle reads 67%/31% at 2p/3p) — and its 8/5/2 majority evaporates with it. It is NOT a
   no-Bock artifact: a no-Bock deal guarantees Mumme and roughly HALVES the 3p dead rate
   (38% → 19%) — the reach problem is the climb ECONOMY vs gate-2 traffic, not the deal, so
   the "export-aware ship deck" dial targets the wrong cause. Candidate dials for the
   designer (not ruled): the premium (+2 → +3), a pinnacle-aware gate, or embracing the
   boom-market identity — but the 2p rate says the fourth Kontor barely exists at two (feeds
   Open #8). The end-state clog is mild (~1.4–1.9 of 4 market hulls).
   **RULED at v4.10 (2026-08-06): the GATE returns to 3 — the export band — and the premium
   holds at +2★.** The deciding A/B/C (base / gate-3 / premium-+3, 300/count): the gate
   halves the dead rate at every count (2p 61.9→33.2 · 3p 30.3→11.9 · 4p 11.6→5.5%) and
   lifts share to 16.5–20.8% without magnetizing; the +3★ arm was a NULL — reward was never
   the bottleneck. Residual watch: the 2p dead rate (~33%) — the fourth-Kontor-at-two
   thread stays with Open #8.
4. **The mason’s-mark economy (v4.9 trial)** — a build now spends a CLOCK die for 1–6
   deferred ★ keyed to traffic. Watches: does building collapse under the value drop (the
   greedy read) or become the sleeper line (author the busy corner, let rivals pump your
   die); the die-vs-runway tension (builders spend the same dice that brew); overbuild as
   die-denial; early-vs-late build decay (a round-12 build barely ticks). Dials: the start
   face, the cap, ticks-per-use, or scoring pips ×2.
   **MEASURED at v4.12 (`archive/records/BUILDING-POWER-STUDY-v412.md` + the kept
   `playtests/bldg-power-probe.js` — 3,236 games: OBS 500×2/3/4p + 5 ablations + a GM arm):
   NO design is macro-warping — removing any single tile moves winner totals ≤1.6★. The
   flags are per-builder: the COOPERAGE (v4.12's +2★/load) stacks a direct mint
   (2.0/2.7/**5.0**★ per game by count — 16× the Tollhouse at 4p) on a 4.2–4.7-pip mark and
   a +5/+3/+8pp builder-win lift; the MERCHANTS' EXCHANGE carries the corpus's most
   consistent lift (+6.5/+7.1/+5.1 — POSITIONAL power: its ablation is a null); the cheap
   utilities' marks outgrow their tier at 4p (Granary lift +10.2 · Scrivener's +8.0); the
   KILN stays the intended shared engine (~¼ of all traffic · the best mark at 4.7–5.0 pips
   · rival ticks ~78% · lift only +1–3 · the biggest ablation drop). The ASSAY at 1H→Ready
   reads clean (heavy traffic, below-bar lift, null ablation). The dead shelf re-confirms
   (Rich Berth 0 builds in 1,500 trader games · Customs/Capstan/Hiring Post ≤0.11
   builds/game). Dial candidates live in the study §7. **RULED at v4.12b (same day): the wharfage eases +2★ → +1★** — the rest of the dials (and the §8 tail-buff proposals) stay open.**
5. **Bergen heat** — specialist prize + the 9/5/2 anchor (dial: tiers or the prize). *The
   London/Bergen benefit SWAP is ruled OUT (designer, 2026-08-02): each Kontor pairs a durable
   pull with a decaying one (Bergen: enduring majority + self-exhausting prize · London:
   evergreen +3★ mint + modest majority) — the swap would double-magnetize Bergen and kill
   London late, and the A/B read (`playtests/swap-test-v45h.txt`) showed the spec faucet
   thinning ~10–15% besides. If heat needs a dial it is the tiers or the throttle, never the
   mint's address.* **The per-die A/B ran and WAS ADOPTED at v4.7** (the dial recorded at
   v4.5b → measured (`archive/records/PRIZE-CAP-STUDY.md`: per-die ≈ cap on every macro
   metric) → designer-ruled: **every cask pays its prize, all four Kontore, one grammar**).
   The residual watch: the consolation faucet (2 goods per unresolvable prize) at a human
   table, and Bergen's share as humans stack same-player casks.
6. **The commission fee schedule (v4.8)** — **Skute 2 `G` · Cog 1 `G` · Hulk free** ⚙
   (2/1/0 by berth). The A/B (n=300/count): commissions thin ~15–20%, voyages/pace hold,
   ~half the commission grain returns to the economy — the hull flood eases without choking
   throughput. Watches: the **Skute at 2 `G` as the HUMAN panic valve** (greedy bots barely
   used it; a goods-poor clogged player now pays a full Source action for relief — the free
   Hulk keeps the Harbor open, but needs help filling) · **free Hulk + maiden load = a 0-cost
   vessel outlet** (self-limiting — the die aboard commits toward YOUR clock — but a table
   read is wanted) · the **4p builder-lane warm read** (43% at 100/lane; full oracle before
   any dial). The dials: the Skute/Cog prices, never the Hulk’s berth count.
7. **The Skute rate** — deck blend 6/10/8. With the sailed clock cut the Skute is pure
   deadlock relief — and at 2 `G` (v4.8) it is PRICED relief; too few = the strand risk
   returns (too many is now merely inefficient). Watch with Open #6.
8. **2p texture** — the thinned interaction set (berths, majorities, the draft): does it
   hold at two?
9. **The fee schedule** ⚙ (v4.7 pass · v4.9c recipes): recipes the `H` = Q−3 formula (free/free/1 `H`/2 `H` — v4.9c) · specialists
   Cellarman `2H` · Grain Factor `2G` · Hop Gardener `2H` · Stevedore `1G` · Braumeister
   `1G1H` · guild `2G`/`2G`/`2H`/`1G1H`/`2G`/`1G`/`1G`/`1H` (the v4.7 price pass repriced
   the two probe outliers — re-probe reads in `SPECIALIST-VALUE-STUDY.md`) · buildings
   free/`1G`–`3G` in grain only (v45d).
10. **The greedy (non-MC) tiers** — re-taught at v4.3 (fee-netted values, Flight marginals,
   horizon sense; both tiers share the new skeleton) and at v4.5b (de-mint values, Order
   sense, the new verbs). Trader>journeyman reads ~55% pooled (n=700, v4.3) — real but under
   the historic 60% lint, because journeyman inherits the shared fee sense. Standing rule
   stands (designer 2026-07-26: *“I worry we over-index on those AI players”*): strategy/
   balance conclusions lean on the MC tiers, the flow probe and humans; the greedy tiers are
   robustness/pace oracles.
11. **The CONTRACT schedule** ⚙ (v4.5b) — 15 tiles, row of 3. Watch: claim rate (orders should
   be contested, not automatic), the die-6 orders’ reachability, whether the beer-named
   orders read as recipe nudges, and Novgorod’s lean (its +2★ premium already pays).
12. **The dice pass** ⚙ — 9 die-touching designs in the printed 20. Watch: does the Tollhouse’s
   stamp (−1 die for +3★) stay a real choice; does the Bonded Store’s send-off read at the
   table (the ephemeral family is now TWO — the Victualling Yard joined it, v4.6); Assay/Racking usage rates.
13. **The Guildhall (v4.15 · lane study v4.16)** ⚙ — **the volume-lane battery RAN**
   (2026-08-12, `HALL-LANE-STUDY-v416.md`: 1,500 CM/GM games, three passes, committed-lane
   persona seats). Confirmed: the lane plays at **parity** in every pips config (viable,
   never a magnet); the **recommended print — `HALL_PIPS` + the Guild Chancery — awaits the
   ruling** (enshrined dice score their pips at end · the Chancery pays an ⚜ per
   activation); the count LADDER is cut (two nulls); the ⚜ cask tiles are the optional
   richness dial (+~3 hall★, +2.5 pp Novgorod). NEW measured watch: the **Novgorod bid** —
   the Reliquary and the eastern run want the same die-5s (+3 pp dead-port under the
   recommended print; dial if it bites live: a hall-mode Order naming Novgorod at premium
   ★). Standing watches: the **Chronicler** (+3★/claim, uncapped) runs hot under the eased
   20-deck — reprice or cap before a human table (hall mode adds ~1 claim/player of flow);
   the **Seal loop** (a Reliquary regular out-claiming the row — dial: Seal once-per-game);
   **Age 3 vs the Cellar** (the Hall must not out-cellar the station — dial to Age 2); 2p
   majority starvation (shelves narrow at two, but the dice leave the mats). P1 tempo read
   FLAT across the 1,500-game corpus (the anti-jackpot structure held).
14. **The expansion beers (v4.14 · pins v4.15b)** ⚙ — the re-derivation watches: the
   **Assay House** at 1 `H`-to-Ready buys Jopenbier’s whole four-step climb (the sharpened
   Bock-Assay watch — dials: the Assay’s reach, or accept the single tile in a 17-of-20
   deal) · **Gose as the goods pump** (the pin is now *Gain 3 goods* per load — 2 `G` in,
   3 out, plus the Grain Factor/Hop Gardener drips on the gains; watch the Gose-cycling
   engine at a human table) · **Duckstein + Cellarman** (Ready at brew, boards at 3 for
   1 `G` 1 `H`) · **Zerbster’s zgyle chain** (a free Gruit + Load 1 more fires per BOARD —
   a Cog/Hulk topping off with Zerbsters compounds; the tray-die price is the leash) · the
   **Order deck thins** when a specialty deal strips base-named orders (as low as ~12 in
   play — the dial is specialty-named Order tiles, not yet printed) · the greedy tiers
   under-pilot the signatures (the persona/MC reads govern, as ever). **The Jopenbier
   question (designer-flagged 2026-08-10, OPEN):** once aged it can’t get better — the die
   caps at 6 — and Bock reaches the same face in ONE turn (brew at 2 · Cellar +3 = Ready 5 ·
   Kiln at load = 6) for 2 `G` 3 `H`, where Jopenbier pays 2 `G` 4 `H` + a 3 `H` fee + the
   four-step climb. What the premium actually buys: the sixth Flight step (25★ vs 16★) ·
   Kiln-independence (die 6 at ANY port, no building under the Ship) · 8★ at Novgorod.
   Options on the table (nothing ruled): *(a)* keep as-is — a capstone prices in drama, not
   efficiency; *(b)* cheaper brew (2 `G` 3 `H`); *(c)* a printed perk (e.g. +2★ delivered
   at Novgorod — the Danzig trade — making the vintage line 10★); *(d)* the “jopendie”
   (a d8/start-2 joke with real teeth — REJECTED by the component grammar, one die family).
15. **The v4.6 roster** ⚙ — the watches from the study: the **Chronicler vs the ladPts≥6 win
   signal** (the cap +5 is the leash); the **Shipwright vs the commission-trap read**
   (gatekeeper #5 — a free commission must not paper over a structural trap); **hops relief**
   (Chandler + Scholar land before the flow-probe re-read — re-baseline it); the greedy AI
   **over-cycles the Merchants’ Exchange** (~8/game in early smoke — a robustness tic, not a
   rule problem; the v4.7 AI pass damped the verb); the **specialist value study
   ran at v4.6d and its dials were RULED at v4.7** (`SPECIALIST-VALUE-STUDY.md` —
   Supercargo → 2H · Grain Factor → 2G · Town Crier ungated · Innkeeper reworked; the
   re-probe of the four is the v4.7 gate); the **deal-17-of-20** and the
   guild singles want a PATHWAYS + persona-duel re-read before any human table. **PATHWAYS
   re-ran at v4.6b (200/lane):** 3p builder **cooled 40.5 → 32.0** (near-flat 34.5/33.5/32.0)
   · 4p lifter **recovered 19.5 → 26.0** (24/26/29.5/20.5 — breadth's mild cold is the
   standing v40 shape) · 2p majority 55/45 — the guild layer did not tilt a lane. The
   persona-duel re-read still stands.
