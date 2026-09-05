# V8-PLAN.md — the v8 program: "a good brewer AND a good merchant"

*Drafted 2026-09-04 from the designer's ruling of the same day. Paper phase only: no engine
change, no simulation, no playtest claim anywhere in this document. Every number is a ⚙
placeholder with a one-line rationale. The designer rules the forks in §7; nothing below is
canon until ruled. Read after `CLAUDE.md`; it supersedes `V7-PLAN.md` as the program document
the moment the designer rules §7 (until then v7.0b stays the live build at root).*

---

## 0 · Why this document exists

On 2026-09-04, with the first oracle read of v7.0b on the table (`archive/records/GATEKEEPER-v70b.md`:
the loop closes on four station verbs, goods are free, buildings are an add-on, the hall is priced
dead, the dice are not the clock, one delivery is two thirds of a score), the designer ruled that
v7 never addressed the core problem and that v8 is essentially a new game on a kept turn grammar.
The ruling, verbatim, is §1. This document maps the loop that failed (§2), lists what stays and
what goes (§3), states the ruling as ten tests a paper design must pass (§4), summarises the five
independent variants drafted against it (§5), lays out the recommended core assembled from them
and hardened by three adversarial reviews (§6), lists the forks the designer must rule (§7),
records what the reviews changed (§8), and sets the phases (§9), the paper cut list (§10) and the
first-table questions (§11). The variants and reviews themselves are session material, not repo
canon; this document carries everything the next session needs.

## 1 · The designer's ruling (2026-09-04, verbatim)

> Map out the loop of the game and each action and or resource required. I think the core issue we
> failed to address is the core loop can be completed with the 4 station actions (source brew age
> load). Aging is tough because it implies time so spending resources doesn't make sense for it.
> Gaining the core currency of goods is silly because it's free via a market visit as well as the
> cheapest bonus. The true resources with a required investment are recipes which are too easy or
> too hard to get, and ships which struggle with the prisoner's dilemma because you pay for a public
> benefit. Buildings are still an issue because they don't matter when an added on layer as they are
> today. They need to be essential.
>
> I think we need two interlocking loops on the game and some key actions need to be separated from
> the stations as the main action selection mechanism. The game should require that you be a good
> brewer and a good merchant. These two should be in tension.
>
> The goal to brew is great and maybe source should be tight and access to better beer types earned.
> Once brewing, I think we should expand on the merchant role of creating and accessing a market. In
> Lisboa, you build shops spending influence and money. Your shops give you goods to sell for money
> but aren't worth points unless you open public buildings which costs your lobbyists. Majorities
> maintain player interaction. This is a nice tension I'd like to draw from in this game.
>
> I think recipes plus buildings should be required to brew and deliver better beers. I think access
> to better Kontore requires buildings and dice (investment in shipping lanes and destination
> infrastructure for sales). Dice are limited as the game clock so the more you invest, the less you
> brew. It should feel like they are limited and required to be in both.
>
> I think gruit should be limited to land deliveries to Bruges but anything can go there to be
> enshrined in the hall with invitations (gruit for goods income, better beers to the hall for
> points). Invitations should be earned through various actions but limited so using them in Bruges
> should be a special thing. Deliveries to the other Kontore should require a trade route that is
> unlocked and invested in. Maybe there is an ownership aspect to it (thinking of the sea board in
> v6 but the posts and unlocked routes are owned - you invest in the line and you get a benefit as
> it is used). This starts to feel like I have to do merchant activities to deliver beer but I need
> to do brewing activities to gain points and realize a return on my investment. The market value of
> beer in each Kontor is increased by infrastructure built there (build the kontorhaus and posts
> along the way for bigger ships means better beers net more in points). I think 10 dice is right
> which means lower scores but more strategy in making each die valuable. Right now, it's too easy
> to make a single die worth nothing or a ton of points and you point out two thirds of your score
> comes from your best delivery, I think these changes will make the game harder but more
> intentional.
>
> I want to keep the current move and activate the primary/alt action plus adjacent buildings/ships
> but the core actions can change to make this significant shift work.
>
> We are essentially making a new game.

## 2 · The loop that failed — v7.0b, mapped

```
   A Market ── B Brewhouse        slots: Market s1·s8 · Brewhouse s2·s3
      │            │                     Harbor s6·s7 · Cellar s4·s5
   C Harbor ── D Cellar
```

**The turn:** MOVE adjacent (no staying) · PRIMARY + ALTERNATE + a load at each flanking slot + each
flanking Venture's action. **The verbs:** Market SOURCE 3 / SOURCE 1 · Brewhouse BREW (search the
tile) / the second kettle (+1 `H`) · Harbor COMMISSION (Cog free · Hulk 1 `G`, one free load, the
flag) / SAIL-now · Cellar AGE 3 / LOAD 1 any.

**The loop in one line:** Market (goods, free) → Brewhouse (recipe + goods + a die → a cask at its
start value) → Cellar (Age 3 → Ready) → a docked hull (a flank load; sails full or on SAIL-now) →
the Kontor (DELIVER: die + marker + Novgorod +3 + demand +1, park, prize · PRESENT: ⚜ + match +
seat: die + bonus, ladder +1) → the prize feeds a recipe (Bruges), a build (London), a specialist
(Bergen) back into the loop. **The four station verbs close it alone.**

| Resource | Sources | Sinks | Did it bind? |
|---|---|---|---|
| Goods `G`/`H` (cap 8) | Market 4 a visit, free · *Gain 2 goods* tile · Great Copper · Bonded Store · Supercargo/Herald | brews 1–5 · second kettle 1 `H` · Hulk 1 `G` · flag 1 `G` · L1 1 `G` (2 replacing) · L2 2 `G` · recipe `H` = Q−3 · Assay Loft 2 `H` | no — seats idled at the cap |
| Quality dice (13) | the tray | brew · a Venture's ledger die · presence placement | no — 27% never left the tray; 70% of games hit the round-22 backstop |
| Recipes | start Gruit + Hopped · Bruges' prize · the *Gain 1 recipe* tile; fee `H` = Q−3 | — | a 1 `G` Gruit bought one (too easy); Bock rarely paid (too hard) |
| Cask tiles | one searchable stack per beer; the tile = the load bonus (8 verbs) | return under the stack | authored variance — a keep |
| Vessels (3) | the player board | — | a die-1 Gruit had one legal door; 17 of 60 seats sat locked |
| Ships | deck 18, display 3, bound for a printed Kontor; sail full or on SAIL-now | back to the deck | the commissioner paid, rivals boarded and bounced it; 0 flags in 181 commissions |
| Ventures | hand of 4, BUILD tile or London's prize (waived); a ledger die ticked by rival use | — | 29 of 30 L2s were Great Copper; the ledger 4% of the score; optional |
| Public Works | 12, deal 8, passive on the slot; the tide | — | five rarely fired; the Kiln was the one every load wanted |
| Specialists | 15, display 4, 2 seats; Bergen's prize | — | three never seated |
| Contracts ⚜ | deck 14; claim on a load; the first-landing letter | spend to PRESENT | 314 earned, 14 spent; the deck dry in 16 of 30 games |
| The Bourse | a marker per export beer at +3, −1 per type per landing sail | — | worked and read |
| The Kontore | Bruges min 1 (recipe) · London min 2, gate (a build) · Bergen min 2 (a specialist) · Novgorod min 3, gate (+3★) | — | Novgorod paid 9.3★ a cask, Bruges 2.7; Gruit was 36% of brews |

**Nothing forced a building, a bought recipe, a paid hull or an invitation between a player and a
delivery.** That is the ruling's diagnosis, and it reads true in every corpus number.

## 3 · What stays, what goes

**KEEP (the designer's keeps + the constitution):** the turn grammar (MOVE adjacent · PRIMARY +
ALTERNATE + the two flanking slots) · the die is the cask · search-brew (the tile is the bonus) ·
goods as the only currency · the four Kontore on two branches · the berth race (shared hulls sail
full, landings in boarding order) · the market only falls · the tide · majorities by parked dice,
two places · scoring off standing components · the Term Registry and the mirror discipline.

**RETIRED or RE-OPENED by the ruling:** the loop closing on four verbs · free goods · aging paid in
goods · recipes as a Bruges freebie · ships as a paid public good · buildings as an optional layer ·
13 dice · Gruit as a scoring cask anywhere · the hall priced below the market · the London prize as
the build door · the +3 flat premium as the only directional value · (by five of five variants) the
specialists, the contract and demand decks, the private flag, the per-beer Bourse.

## 4 · The ruling as ten tests (a paper design passes all ten)

- **R1** A brewer-only seat has nowhere to sell beyond Bruges; a merchant-only seat has nothing to sell.
- **R2** The loop cannot close on the four station verbs; a building and an earned recipe stand between a player and a Q3+ delivery.
- **R3** Goods bind: a competent seat runs short of goods at least twice a game; hops are the pinch.
- **R4** Aging costs visits or turns, never goods or dice.
- **R5** Every far delivery rides infrastructure somebody built; the builder benefits when it is used; the infrastructure level sets the Kontor's price.
- **R6** Gruit lands only at Bruges, for goods; the Bruges hall enshrines Q2+ beer for an invitation; invitations are earned, capped, and spent 2–4 times a seat.
- **R7** A commissioner is never worse off for a rival boarding the hull.
- **R8** 10 dice; a die is worth 2–11★ and never 0; no single turn is half a score.
- **R9** 10–15 turns a seat; the dice end the game, never the round counter.
- **R10** Every state on a component; one die + one printed number; nothing remembered.

## 5 · The five variants (drafted blind to each other, 2026-09-04)

| | Thesis | Its best idea (taken into §6) | Its cost |
|---|---|---|---|
| **A · The Owned Sea** | the v6 map returns, owned: passage dice on legs, post tiles sliding under them, three Kontorhaus levels that set each port's marker, floor and Hulk admission | the deeper post's owner line — *your cask landing here +1* (the sea lift) | a second board; four post faces; 2p ticks on one rival |
| **B · The Kontor Boards** | no sea; each Kontor a socket row where your tile + die is route, ledger, majority weight and clock at once | **YOUR MINIMUM** — your dice at a Kontor set the quality that may board there; seats at face 1 ticking per rival landing; the rising bench | 16 Kontor tiles + 8 brew tiles; a funnelled one-socket brewer |
| **C · Buildings Are the Actions** | thin station verbs; every strong verb on a flank-bound Venture; tolls for rival use | **the ground owns the hull** — a Ship on your tile is private, on public ground shared | a post at +1★ may not be worth a die |
| **D · The Lisboa Transposition** | licences on private buildings; civic works opened with invitations at a landing; the market's floor is the civic dice | **⚜ open the Kontor seats** · the falling Bruges goods row · aging by the calendar | a turn-start routine; two decks |
| **E · The Economist** | map-agnostic budget: 6 casks · 3 bonds · 1 spare; a die worth 2–9★ bounded by quality + one marker | the **priced recipe ladder** whose top rungs need dice beyond Bruges; SOURCE 2 and the ~8-good gap; the mandatory maiden load | keeps the specialists and both decks |

All five converged, independently, on: a building as the only door to Q3+ beer · one value marker
per Kontor replacing the per-beer Bourse · dice invested at the Kontore or on lanes that score
their pips · Bruges as the goods door plus a hall with a capped invitation hand · the specialists
retired · MAX_ROUND 16–18. The forks are where they split (§7).

## 6 · THE RECOMMENDED CORE (v3 — after the comparator, the teach pass and the red team)

### 6.0 The thesis

**The brewer's row and the merchant's row.** The top of the 2×2 is the brewer's (Market: source
and learn · Brewhouse: brew and build); the bottom is the merchant's (Harbor: commission and
invest · Cellar: the cellar door — load and cart). Ten quality dice, and every one ends somewhere public: a cask parked in a Kontor field, on a
bench place or in the yard — or a **post** on a lane or a **seat** in a Kontor. The tray is only
the runway (designer-ruled 2026-09-04: no formal two-ended tray — the dice come from one place;
the tension is the DESTINATION, read off the boards in your colour). A cask beyond Bruges is worth
**its die + the Kontor's market cell for its quality band**; the marker rises only when a seat is
opened there, and falls one step per landing sail to the floor. Whether a cask may board at all is
read off **your own dice at that Kontor**: none, and only a 5 boards; three, and a Hopped boards.
Mumme and Bock cannot be LEARNED without dice of yours standing beyond Bruges. Bruges is the road:
Gruit sells into a goods row that falls as it fills; any Q2+ beer is enshrined in the hall with an
invitation, on a bench whose places rise in price and admission. **Every invitation is a fork in
the hand:** a present at Bruges, or a seat opened at a far Kontor while your cask lands there.

**A brewer-only seat** brews well and boards only its best dice, sells into markers rivals raise
and glut, never learns Bock, never opens a seat. **A merchant-only seat** owns lanes and seats,
raises markers for rivals' Bock, holds pips and standing, and has nothing to land — and holds no
majority share without a cask of its own parked there.

### 6.1 The station map

```
   A Market ── B Brewhouse        the brewer's row     slots: Market s1·s8 · Brewhouse s2·s3
      │            │
   C Harbor ── D Cellar           the merchant's row   slots: Harbor s6·s7 · Cellar s4·s5
```

| Station | PRIMARY | ALTERNATE |
|---|---|---|
| **A · Market** — the merchant's desk | **SOURCE 2** ⚙ — take 2 goods, any mix (designer-ruled 2026-09-04: no per-visit hop cap — goods are hard enough to get; hops pinch by price, not by cap) | **LEARN** — take 1 recipe card from the display at its printed fee, if its printed requirement reads true |
| **B · Brewhouse** — the kettle | **BREW** — pay a recipe into an open vessel; a tray die at the printed start value; search the beer's stack, choose the tile. The station's kettle brews Q1–2; **Q3–4 need a Mash Tun standing on the wharf, Q5 a Great Copper** (yours free; a rival's: 1 good to its owner, one brew) | **BUILD** — place or FLIP one of your wharf tiles on ANY open slot at its printed fee **+1 `G`** ⚙ (the valve; a flanking stop builds at the plain fee) |
| **C · Harbor** — the shipmaster's desk | **COMMISSION** — take a hull from the display (Cog free · Hulk 1 `G` ⚙; a Hulk only toward a lane whose post 2 is filled), dock it on any shipless slot, **load 1 Ready cask onto it now** (a commission needs a Ready cask) | **INVEST** — stand a tray die at face 1 on the lowest open post of any lane; post 1 costs **no goods** ⚙ (the die is the price), post 2 its printed fee |
| **D · Cellar** — the cellar door | **LOAD 1** — one Ready cask onto any docked Ship | **CART 1** — one Ready cask to Bruges, resolved at once (§6.4); no cask-tile bonus fires on the cart ⚙ |

**Aging is the calendar ⚙ (fork F5):** at the start of your turn, before MOVE, every aging die in
your vessels turns +1 and stops at its quality (READY). No verb, no good; a forgotten turn
under-ages only the forgetter. The Cold Store tile (below) is the one way to hurry.

**Sailing needs no verb:** a full Ship sails at once. At the **end of your turn** you may also sail
any docked Ship **you own** with 1+ cask aboard, or any **shared** Ship carrying a cask of yours —
unfull, free.

**A flanking stop**, each once: **LOAD 1** Ready cask onto the Ship docked there (a rival's private
hull: **1 good to its owner**, the freight — the only transfer a load ever makes; a payee at the
cap: the excess to the supply); and **BUILD** a wharf tile from hand onto that slot at its fee
(replacing a Public Work +1 `G`, the Work boxed) or **FLIP** your L1 there to its L2. Wharf tiles
are passive: they fire when their station is worked (the kettle licenses BREW from anywhere on the
wharf). The Public Work at the slot fires on the load as today.

**The ground owns the hull.** A Ship docked on a slot holding YOUR wharf tile is **yours**: riders
pay you the freight, only you sail it early, nobody displaces it. On a Public Work or open ground
it is **shared**: free loads, any player with a cask aboard may sail it at their turn end. The
commissioner chooses the ground; no peg, no flag. The maiden load means no hull is ever empty.

**Setup:** workers start off the board; the first move is to any station. In REVERSE turn order,
each player stands one tray die free on any open post 1 (**the starter post** ⚙): every seat
begins with a lane, a die beyond Bruges, and a die at sea from turn zero. Start 3 `G` 2 `H`,
1 ⚜, Gruit + Hopped, the warm Ready Gruit; 10 dice.

**What the four verbs alone give you:** Gruit, Hopped, the cart, a Cog you can board only with
your best dice. No ★ beyond the bench, and one ⚜ to sit there with.

### 6.2 The BREWER loop

- **Sourcing:** SOURCE 2, any mix; start 3 `G` 2 `H`; cap 8 ⚙. Faucets: the Bruges goods
  row · your Hop Garden/Maltings · freight and kettle fees paid by rivals · the *Gain 2 goods* tile.
  **The walk sets the budget:** a split seat sees each station every fourth turn, so 3–4 Market
  visits in 14 turns = 6–8 goods + 5 start + two carts (~5) + a store tile (~3) ≈ **20 goods**,
  against ~24 wanted (six casks ~13 · two tiles ~4 · two recipes ~4 · a post 2 ~1–2 · a Hulk 1).
  The gap is the design; every seat drops something. The merchant's dice cost no goods (post 1
  free; seats cost ⚜), so goods bind the brewer and the tray binds both.
- **Recipes (LEARN, the Market):** start Gruit + Hopped; deal 3 of the 4 exports, one card per
  player per export ⚙. **Broyhan 1 `H` · Keut 1 `G` · Mumme 1 `G` 1 `H` + ① · Bock 1 `G` 2 `H` +
  ②** ⚙ — ①/② are dice of yours on posts or seats beyond Bruges (never the field), printed as two
  icons. The *Gain 1 recipe* tile LEARNs at its fee with the requirement waived, once. From
  nothing to a first Bock: tile 2 + FLIP 2 + LEARN 3 + brew 5 = 12 goods and two investments.
- **The wharf hand — 3 tiles** ⚙, die-less, goods only, L1/L2 by the FLIP: **KETTLE** (L1 Mash Tun:
  Q3–4 may brew · L2 Great Copper: Q5 may brew, and its owner BREWs twice a visit) · **STORE** (L1
  Hop Garden: +1 `H` when you work its station · L2 Maltings: +1 `G` +1 `H`) · **COLD STORE** (L1:
  one aging cask of yours +1 step as you work its station · L2 Lagering Cellar: one Ready cask +1
  past its quality, cap 6). **Fees L1 1 `G` 1 `H` · FLIP 1 `G` 1 `H`** ⚙. A tile's slot also decides
  which docked hulls are yours (§6.1).
- **The cask and its die:** unchanged law (set at brew, aged to Ready, lifted to 6, read as it
  boards, parked at landing). **The cask tile parks under the die** at the Kontor, on the bench
  and in the yard: the beer's identity stands with its die (the quality band, the Flight), and
  each beer's stack is its supply for the game ⚙. Load-bonus pool ⚙ (7): *Gain 2 goods · Age +1 ·
  Load 1 more · LIFT · Brew 1 · Gain 1 recipe · POST (stand a tray die on any open post, fee
  waived)* — the brewer's cask that pays the merchant's loop. Presence, BUILD and CHART leave the
  tiles; Gruit's tile is blank ⚙.

### 6.3 The MERCHANT loop — the Destinations board re-cut

Each far Kontor panel (London · Bergen · Novgorod) prints, top to bottom: **the lane** (post 1 ·
post 2) · **YOUR MINIMUM** · **the market track** 0…+3 with one marker, a printed base cell, and
**two numbers in every cell (Q1–3 | Q4+)** · **two seats** (Warehouse · Kontorhaus) with their ⚜
price, the floor mark beside the track, and the majority pair · the minimum · the parking field
(tile under die) · the letter line · the landing order.

| Printed socket ⚙ | Cost | Die | Turns +1 (cap 6; pips at the end) | For everyone |
|---|---|---|---|---|
| **Post 1** | 0 goods (the die) | a tray die, face 1, at the Harbor | **any Ship sails this lane** | the lane OPENS (Cogs) |
| **Post 2** | Bergen 1 `G` · London 1 `G` · Novgorod 1 `G` 1 `H` | as post 1 | any Ship sails this lane; **owner: your cask landing here +1** ⚙ (A's sea lift) | **Hulks** may sail here |
| **Warehouse seat** | **1 ⚜** + a tray die, while landing here | face 1 | **a rival's cask lands here** | marker **+1**; the floor is **1**; majority pair L1 |
| **Kontorhaus seat** (needs the Warehouse) | **2 ⚜** + a tray die, while landing here | face 1 | a rival's cask lands here | marker **+1**; majority pair L2 |

- **OPEN (off the stations):** when a Ship lands, each player with a cask aboard — in boarding
  order — may open ONE seat there before their first cask delivers: the ⚜ spent, the die stood,
  the marker moved up to the seat's floor if it sits left. You must be landing to open.
- **YOUR MINIMUM** (replaces every gate and every rent): count your dice on this panel and its
  lane (posts + seats + parked casks). London · Bergen: **0 → 5+ · 1 → 4+ · 2 → 3+ · 3+ → 2+** ⚙;
  Novgorod one step steeper (**0 → closed · 1 → 5+ · 2 → 4+ · 3+ → 3+**). A great brewer's Bock
  always sails; a Hopped needs standing. The same count the recipe cards ask for.
- **Value:** DELIVER = **die + the cell's number for the cask's band** (the tile under the die says
  which); then the marker steps down ONE per landing sail, never below the floor. Cells ⚙: 0 →
  `0|0` · 1 → `1|1` · 2 → `1|2` · 3 → `2|3`. Base cell London 1 · Bergen 1 · Novgorod 1 (its
  minimum 3 is its edge) ⚙. No premium, no prize, no demand line. **Landings score onto the ring as
  they happen;** a parked die is weight and presence only, never re-scored.
- **Majorities:** the pair printed beside the last filled seat — **L0 3/1 · L1 5/2 · L2 7/3** ⚙ —
  to the two leaders by dice on the panel (parked casks + seats; posts never count). **A seat die is
  weight only beside a parked cask of yours** (no cask, no share — the merchant must land to
  collect). Tied for first: each takes the second line; nobody takes the first ⚙.
- **Ships:** deck 16 ⚙ (Cog ×10 · Hulk ×6; no Bruges hulls; *needs POST 2* printed on the Hulks),
  display 3. Cargo aboard at the end lands at its die only and parks (weight yes, letter no) ⚙.
- **Covers ⚙:** 2p — London post 2 and the London Kontorhaus covered, the bench at 6; 3p — the
  London Kontorhaus covered, the bench at 8; 4p — all open, the bench at 8. Public Works: deal 6
  at 2–3p, 4 at 4p ⚙ (open ground scales with the hands that want it).

### 6.4 Bruges — the road, the goods row, the bench

Reached by the cart only (the Cellar's CART 1). No route, no track, no minimum, no letter. Two
doors, and the cart always resolves (the bench if legal and chosen, else the yard):
- **THE YARD — a falling goods row** ⚙: `3G1H · 2G1H · 2G1H · 2G · 2G · 1G1H · 1G · 1G · 1G · 1G`
  (2p: a stop after space 6). Park the die (tile under it) on the next open space, take what it
  prints. Any Ready cask may; only Gruit should. Gruit's only door. The die is Bruges presence,
  no majority weight, a Flight beer. A full row buys nothing more.
- **THE BENCH — 8 places** ⚙ (2p: 6), filled left to right; each prints a **quality band** and a
  **bonus**, alternating so the low door closes late ⚙: `Q2+ +2 · Q2+ +2 · Q3+ +3 · Q2+ +2 · Q3+
  +3 · Q4+ +4 · Q3+ +3 · Q5 +5`. PRESENT a Q2+ cask: spend 1 ⚜, take the NEXT open place if the
  tile meets its band, score **die + bonus**, park the die on the place (Bruges majority weight).
  Gruit never. **The Bruges pair prints under the last filled place** (1/0 → 2/1 → 3/1 → 4/2 → 5/2
  → 6/3 → 8/4 → 9/4 ⚙); the rightmost die breaks every Bruges tie. The spent invitations are the
  ladder.

### 6.5 Invitations ⚜ — earned, capped, two sinks

Tokens, 12 ⚙. **Start with 1. Hand cap 2**, face-up; a third earned is refused (dial: cap 3).
Faucets, printed where they fire: **the letter** — your first landing at each far Kontor (read off
the field; none at Bruges) · **the post-2 letter** — each lane's post 2 prints an ⚜: whoever fills it takes it (the die
covers the icon; a race read off the board). **Two
sinks:** PRESENT at the bench (the brewer's capstone) or OPEN a seat while landing (the merchant's
standing). 3–5 earned, 2–4 spent a seat ⚙. *(Dial if ⚜ run short: a contract display of 2 claimed
on a Q3+ / die 4+ / Hulk load.)*

### 6.6 The dice budget and the clock

**The tray is the runway only** — the v7 tray: ten dice, public, never returning. There is no
formal two-ended tray (designer-ruled 2026-09-04): which end a die leaves from adds nothing,
because the dice come from one place. **The split is read off the boards:** your dice on posts
and seats are the merchant's; in vessels, aboard hulls, in fields, on the bench and in the yard
the brewer's — every die ends somewhere public in your colour, and getting the most from each
die's destination is the tension in action. Sinks: **BREW** · **INVEST a post** · **OPEN a
seat** · the **POST** tile. Nothing else takes a die; LEARN and BUILD take goods.

A typical competent seat ⚙: **6 casks · 3 bonds · 1 spare** (the starter post is one of the
three). 8·2·0 is the brewer-only line; 3·5·2 the merchant-only line; both lose to the split.
**The first EMPTY tray sets the final round** (equal turns); MAX_ROUND 18 ⚙ backstops and should
never fire — the merchant's dice cost no goods, so a seat whose goods are gone can still spend a
die, and the tray empties.

### 6.7 Scoring skeleton

| Bucket | Read off | Band | Intended share ⚙ |
|---|---|---|---|
| Landings (far) | die + the cell for its band, onto the ring at landing | 2–9★ | ~45% |
| The bench | die + the place's bonus, onto the ring | 4–11★ | ~10% |
| Socket pips | every post and seat die of yours, at the end | 1–6★ each | ~20% |
| Majorities | the pair beside the last filled seat; Bruges under the last filled place | — | ~18% |
| The Flight | distinct beers landed (tiles under dice, the yard counts): 3/4/5 → 3/6/10★ ⚙ | — | ~7% |
| Tiebreak | vessel dice, then goods | | |

A competent seat ≈ 45★; the best die ≈ 9–11★, a fifth of a score. No die is worth 0: a carted cask
is goods and a Flight beer; a socket die is at least its founding pip.

### 6.8 The v7.0b failures, answered

| v7.0b | v8 |
|---|---|
| the loop closes on four verbs | Q3+ needs a kettle; every far ★ needs standing; the bench needs an ⚜ |
| goods free | SOURCE 2; a ~4-good gap on the ring walk; hops the pinch by price (recipes, brews and tiles priced in `H`) |
| aging paid in goods | the calendar; the Cold Store hurries one cask |
| recipes too easy / Bock too hard | LEARN priced in hops with far-dice requirements; the Bock stack 12 goods; Q4+ reads a higher cell and the bench's top places |
| ships a public good | the ground owns the hull; freight to the owner; the maiden load |
| buildings optional | the kettle is the only Q3+ door; a tile's slot owns its hull; seats are the only far value |
| the London double-build spike | Kontor prizes retired; the best die is 9–11★ |
| Gruit the hidden currency | the cart only; a falling row; no majority weight; a blank tile |
| the hall priced dead | die + a bench bonus of 2–5 against die + a cell of 0–3; ⚜ with two sinks |
| the dice not the clock | 10 dice; two visible sinks; the merchant's dice cost no goods |
| the ledger 4% | posts tick per sail on their lane, seats per rival landing, every die from face 1 |
| ownership never on the table | tiles own hulls; dice stand in posts and seats; standing sets the minimum |

## 7 · THE FORKS (the designer rules each; ★ = the recommendation)

**Ruled 2026-09-04, on reading the first cut: no formal tray.** Which end a die comes from adds
nothing; the dice come from one place. What matters is how much each die earns at its
destination on the boards — that is the tension in action. The two-ended tray, its ⚜ milestones
and its strip are out of the plan; the runway is the v7 tray, and the split is read off the
boards in your colour.

| # | Fork | Options | ★ and why |
|---|---|---|---|
| F1 | The sea's shape | (a) a lane of 2 posts on each far panel · (b) the v6 map with legs and 4 post faces (A) · (c) Kontor seats only (B) | (a): ownership without a second board; the map is a later print option |
| F2 | Route access | (a) YOUR MINIMUM by your dice there, no rent (B) · (b) own-or-rent, 1 good to the post-1 owner (E) · (c) strict own passage (A) | (a): no transfer; the same count as the recipe card; a brewer's best dice always sail |
| F3 | Hull ownership | (a) the ground owns the hull (C) · (b) a commissioner's peg + freight (D/E) · (c) free hulls, investors board (B) | (a): no new component; wharf tiles gain a second job |
| F4 | The hall | (a) the rising bench with quality bands (B + red team) · (b) demand cards (A/D/E) · (c) falling quality benches (C) | (a): the bench is the ladder, no deck, the race heats |
| F5 | Aging | (a) the calendar, +1 at turn start (D) · (b) Cellar AGE by visit (E) | (a): time passes whether you visit or not; the Cellar becomes the door; the corpus's idle Cellar visits vanish |
| F6 | Socket dice | (a) all at face 1, each ticking on its printed event · (b) fixed coupons + rent (E) | (a): one grammar |
| F7 | Gruit's price | (a) the falling goods row (D) · (b) flat 3 goods | (a): the brake on the Gruit farm |
| F8 | Opening a seat | (a) ⚜ + a die at a landing, by anyone (D) · (b) goods + a die at the Harbor (E) · (c) the second seat owner-only (red team) | (a): requirement 9 verbatim; the ⚜ is a fork in the hand; the second seat's private prize is small so the snipe is dead |
| F9 | Recipes | (a) LEARN at the Market with far-dice requirements · (b) the bench grants a recipe (A/C) | (a) |
| F10 | Specialists | (a) retire to an expansion seam (5/5) · (b) keep 2 seats | (a): their jobs are buildings and sockets now |
| F11 | Public Works | (a) keep 12; deal 6 at 2–3p, 4 at 4p; the tide · (b) retire (D) | (a): the tide is a keep |
| F12 | Bruges by cart | (a) cart only · (b) hulls + a packet (B) | (a): Bruges is special because it is the road |
| F13 | SAIL | (a) off the stations: owner at turn end, shared by any cask-holder · (b) a Harbor verb | (a) |
| F14 | The starter post | (a) one free post-1 die per seat at setup · (b) a clean start | (a): every seat has a die at sea on turn 0 |
| F15 | The wharf hand | (a) 3 tiles kettle · store · cold store · (b) 4 licensed producers (D) | (a) |
| F16 | Quality bands | (a) two numbers per market cell + bands on the bench, the tile under the die · (b) die-only cells | (a): without it a lifted Keut equals a Bock and Bock dies again |
| F17 | The ⚜ cap | (a) 2 · (b) 3 · (c) a refused ⚜ banks 1★ | (a) first; (c) if letters are refused on big landings |

## 8 · What the reviews changed (three adversarial passes on the first synthesis)

- **The teach pass** (19 rules after the teach; nine need an example, six of them "who pays a good
  to whom"): one transfer per load, never two; nothing paid to a neutral die (the League post is
  gone); a free starter post so every seat has a die at sea from turn zero; the Kontorhaus "first guest" ⚜
  dropped (a memory state); eleven print lines the panels need (freight on the hull, *needs POST 2*,
  the floor marks, ties, the end-cargo line, "if you cannot present, the yard"); the weekend cut
  list (§10) and the ten table questions (§11).
- **The comparator** (D and C scored highest against the ruling; the first synthesis third for
  taking each variant's safest organ): INVEST to the Harbor and LEARN to the Market; SAIL off the
  stations; the ground owns the hull; ⚜ open the Kontor seats; seats at face 1; the Bock stack cut;
  the falling row; YOUR MINIMUM; "seat" for the Kontor sockets and "place" for the bench.
- **The red team** (the seat ladder was a prisoner's dilemma; the marker was quality-blind; goods
  not dice were the clock): the second seat's private prize made small so nobody waits; **two
  numbers in every market cell and bands on the bench, the tile parked under the die**; post 1 for
  no goods so the tray empties; (its one-hop-a-visit cap was overruled by the designer on 2026-09-04 — goods are hard enough to get); the cart fires no
  tile bonus and Gruit's tile is blank; seat weight needs a parked cask; TICK replaced by POST; the
  budget re-derived from the four-corner walk; seventeen rulings on holes (§6 carries them).

## 9 · The phases (paper first; no simulation until a human table has ruled)

- **P0 — the rulings.** The designer rules §7. Then `V8-PLAN.md` §6 is re-cut to the ruled values
  and this document becomes the program (the v7 paragraph in `CLAUDE.md` moves to history).
- **P1 — the mechanic sheet.** `RULES.md` re-derived whole as the v8 rules (paper; no engine), the
  registry pass in `STYLE.md` (new nouns: post · seat · place · bench · the yard · the cart · Cold
  Store · Hop Garden; new verbs: LEARN · INVEST · OPEN · CART · POST), `COMPONENTS.md` §0 as the v8
  kit delta. A second red-team pass on the ruled sheet. Docs only; the v7.0b build stays live at
  root until P3.
- **P2 — the paper table (the top oracle).** The §10 cut list built in a weekend; the designer's own
  2p table, then 3p; the §11 questions asked after every game; the rulings that fall out recorded
  in `archive/records/`. Nothing else gates this phase.
- **P3 — the mirror.** Only after P2's rulings: `play.html` re-derived (DATA → STATE → TURN MACHINE
  → CELL HANDLERS → SCORING → RENDER; the AI seats re-taught the two rows; `KEY hanse-v80a`), the
  verify battery re-derived, `print.html` and `rulebook.html` cut to the ruled kit, `index.html`.
- **P4 — the oracle read.** The first corpus and gatekeeper #5, after the human table has played the
  mirror — never before.

## 10 · The paper cut list (a weekend, from the v7.0b kit)

**Re-print:** the Destinations board (three far panels + Bruges, as §6.3–6.4 print them; two letter
sheets tiled — the one component that cannot be annotated) · four player aids (the turn, the four verb pairs, the fee table, a WHO-PAYS-WHOM table
with three lines, the end) · sixteen export recipe cards (fees + the two requirement icons) · four
station labels over the Wharf board's verb boxes.

**Re-face (stickers):** the wharf hand from the v5.5 Venture cardboard (kettle: Mash Tun / Great
Copper · store: Hop Garden / Maltings · cold store: Cold Store / Lagering Cellar; the die tiles
boxed) · every *Place presence* / *BUILD* / *Chart* cask tile → POST · Gruit's tiles blanked · 16
Ship tiles (the Bruges Cogs and two Hulks pulled; *needs POST 2* on the Hulks).

**Add:** three market markers (Bourse markers, beer faces dotted over) · a 2p cover strip for the
bench and the two London sockets · 12 ⚜ (the contract cards face-down) · socket dice are the tray
dice themselves (10 of each colour; three boxed).

**Leave in the box:** the demand cards, the ladder markers, the flags, the specialists, the other
Bourse markers; deal 6 of the 12 Public Works.

## 11 · Ten questions for the first table (ask after game one)

1. Where did your first die go, and when did a die of yours first go the other way — a post after casks, or a cask after posts?
2. Name every good you paid to another player, and who to — which payments were forgotten, and did the payee catch them?
3. Did you ever hold a recipe you could not brew? For how many turns, and what unblocked it?
4. What was your best single die worth, and did you know it when you brewed it?
5. How many ⚜ did you earn, how many did you spend, on which sink, and was there a place or seat you wanted and could not reach?
6. When the marker fell after a rival's landing, did you feel it — a verb you time, or a tax you notice at scoring?
7. Did any Ship sit unfull for more than three rounds, and who finally sailed it?
8. Did anyone cart a Q3+ cask to the yard, and why — no ⚜, a band, no standing, or the clock?
9. On the last round, what did the rival's dice on the boards — posts and seats against casks — tell you about their plan?
10. If you could stand one more die anywhere on the board right now, where — and what did you do with that die instead?
