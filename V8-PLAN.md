# V8-PLAN.md — the v8 program: "a good brewer AND a good merchant"

*Drafted 2026-09-04 from the designer's ruling of the same day. Paper phase only: no engine
change, no simulation, no playtest claim anywhere in this document. Every number is a ⚙
placeholder with a one-line rationale. The designer rules the forks in §7; nothing below is
canon until ruled. Read after `CLAUDE.md`; it supersedes `V7-PLAN.md` as the program document
the moment the designer rules §7 (until then v7.0b stays the live build at root).*

***REVIEW IN PROGRESS (2026-09-06).** The designer's review of the first plan is arriving in
batches. All three batches are recorded verbatim in **§12** with their readings; they correct the
premise in §0/§2 and overturn parts of §6 and §7 (route access, the quality gate, scoring,
ships, invitations, the kettle, the word "tray"). The review is COMPLETE (2026-09-06); the
re-cut of the plan from all of it is **§13 — THE IMPLEMENTATION PLAN**, which supersedes §6–§11
in full. Read §12 and §13; §6–§11 stand only as the record of the first cut.*

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

**Premise correction (designer, 2026-09-06 — §12.1):** the paragraph above states the symptoms
the oracle measured, not the disease. v7's job was to BREAK the tight overlap between the wharf
station actions and the core loop (source · brew · age · ship); it did not, so walking the loop
literally is playing the game, everything else is loosely added on, and what results is an
efficiency game dressed as an engine builder — it lacks soul, and its exciting-looking
decisions are neither interesting nor challenging. Free goods did not make goods irrelevant;
they made goods the ONLY resource, which is what made play linear. v8's purpose is DEPTH, and
the recorded failure mode of the assistant is that its optimizing instinct cancels depth.

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
the build door · the +3 flat premium as the only directional value · (by five of five variants) the contract and demand decks, the private flag, the per-beer Bourse. **The specialists were proposed for retirement by all five variants and the designer overruled it (F10): they stay.**

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

*SUPERSEDED 2026-09-06 by §13 (the designer's review, §12, overturned the quality gate, the
market track, the kettle, the invitation faucets, the word "tray" and more). Kept as the record of
the first cut; do not build from it.*

### 6.0 The thesis

**Two loops, four stations.** The brewer's loop runs Market (source; the cart to Bruges) →
Brewhouse (brew, build) → Cellar (age, load); the merchant's runs Harbor (commission, then
invest) → the sea; the Cellar's LOAD is where they meet. The clock is the v7 clock, unchanged: ten dice instead of thirteen, the first empty tray ends
the game. **What is new is that every die now has TWO destinations that compete** — a cask parked
in a Kontor field, on a bench place or in the yard, or a **post** on a lane or a **seat** in a
Kontor that decides what the casks are worth — and that the merchant's destination costs no goods,
so the dice can actually run out (in v7.0b they did not: 21 of 30 games hit the round ceiling with
27% of the dice unspent). The tray is only
the runway (designer-ruled 2026-09-04: no formal two-ended tray — the dice come from one place;
the tension is the DESTINATION, read off the boards in your colour). A cask beyond Bruges is worth
**its die + the Kontor's market cell for its quality band**; the marker rises only when a seat is
opened there, and falls one step per landing sail to the floor. Whether a cask may board at all is
read off **your own dice at that Kontor**: none, and only a 5 boards; three, and a Hopped boards.
Mumme and Bock cannot be taken without dice of yours standing beyond Bruges. Bruges is the road:
Gruit sells at the yard for a fixed 3 goods; any Q2+ beer is enshrined in the hall with an
invitation, on a bench whose places rise in price and admission. **Every invitation is a fork in
the hand:** a present at Bruges, or a seat opened at a far Kontor while your cask lands there.

**A brewer-only seat** brews well and boards only its best dice, sells into markers rivals raise
and glut, never earns Bock, never opens a seat. **A merchant-only seat** owns lanes and seats,
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
| **A · Market** — the merchant's desk | **SOURCE 2** ⚙ — take 2 goods, any mix (designer-ruled 2026-09-04: no per-visit hop cap — goods are hard enough to get; hops pinch by price, not by cap) | **CART 1** — one Ready cask to Bruges by road, resolved at once (§6.4); no cask-tile bonus fires on the cart ⚙. (F9 ruled 2026-09-04: no station gives a recipe.) |
| **B · Brewhouse** — the kettle | **BREW** — pay a recipe into an open vessel; a tray die at the printed start value; search the beer's stack, choose the tile. The station's kettle brews Q1–2; **Q3–4 need a Mash Tun standing on the wharf, Q5 a Great Copper** (yours free; a rival's: 1 good to its owner, one brew) | **BUILD** — place or FLIP one of your wharf tiles on ANY open slot at its printed fee **+1 `G`** ⚙ (the valve; a flanking stop builds at the plain fee) |
| **C · Harbor** — the shipmaster's desk | **COMMISSION** — take a hull from the display (Cog free · Hulk 1 `G` ⚙; a Hulk only toward a lane whose post 2 is filled) and dock it on any shipless slot, or over an EMPTY docked hull, which returns to the deck ⚙. **A Harbor visit must commission when it can** (F3 ruled 2026-09-04: ships keep coming). Then, if you hold a Ready cask, **load 1 onto it free — the maiden load**: first aboard lands first, before the glut, and opens a seat first | **INVEST** — stand a tray die at face 1 in your own seat on the lowest open post of any lane; post 1 costs no goods, post 2 its printed fee. **INVEST is open only after this visit's commission** ⚙ — bring a ship, stand a post |
| **D · Cellar** | **AGE 3** — turn your aging dice up three steps, split freely (F5 ruled 2026-09-04: aging is a visit and a cask bonus — upkeep, never goods) | **LOAD 1** — one Ready cask onto any docked Ship |

**Aging is upkeep (F5 ruled 2026-09-04):** the Cellar's AGE, the *Age +1* cask bonus and the Cold
Store tile are the only hands that turn a die; no good is ever spent on a step. Time passes only
when you tend it — one less thing to track, and a reason to visit the Cellar.

**A Ship sails when full, and only then (F13 ruled 2026-09-04):** no SAIL verb, no early sail;
premature sailing, if it ever returns, is a specialist's line. At the end of the game every docked
Ship sails and its casks land at their die only ⚙.

**A flanking stop**, each once: **LOAD 1** Ready cask onto the Ship docked there (every hull is open to every player — no
freight, no fee); and **BUILD** a wharf tile from hand onto that slot at its fee
(replacing a Public Work +1 `G`, the Work boxed) or **FLIP** your L1 there to its L2. Wharf tiles
are passive: they fire when their station is worked (the kettle licenses BREW from anywhere on the
wharf). The Public Work at the slot fires on the load as today.

**Nobody owns a hull (F3 ruled 2026-09-04).** Every docked Ship is open to every player: the berth
race is the interaction, as it always was, and nothing is tracked. **The commissioner's return is
printed into the act:** the choice of destination and slot (the Kiln, the Cooperage), the maiden
load (first aboard, first to land, first to open a seat), and the Harbor's INVEST, which only a
commission unlocks. A ship on the wharf benefits the table; commissioning it benefits the
commissioner first.

**Setup:** workers start off the board; the first move is to any station. In REVERSE turn order,
each player stands one tray die free in their own seat on any leg's post 1 (**the starter post**, F14 ruled 2026-09-04: a post of your choosing): every seat
begins with a lane, a die beyond Bruges, and a die at sea from turn zero. Start 3 `G` 2 `H`,
1 ⚜, Gruit + Hopped, the warm Ready Gruit; 10 dice.

**What the four verbs alone give you:** Gruit, Hopped, the cart, a Cog you can board only with
your best dice. No ★ beyond the bench, and one ⚜ to sit there with.

### 6.2 The BREWER loop

- **Sourcing:** SOURCE 2, any mix; start 3 `G` 2 `H`; cap 8 ⚙. Faucets: the Bruges goods
  row · your Hop Garden/Maltings · kettle fees paid by rivals · the *Gain 2 goods* tile.
  **The walk sets the budget:** a split seat sees each station every fourth turn, so 3–4 Market
  visits in 14 turns = 6–8 goods + 5 start + two carts (~5) + a store tile (~3) ≈ **20 goods**,
  against ~24 wanted (six casks ~13 · two tiles ~4 · two recipes ~4 · a post 2 ~1–2 · a Hulk 1).
  The gap is the design; every seat drops something. The merchant's dice cost no goods (post 1
  free; seats cost ⚜), so goods bind the brewer and the tray binds both.
- **Recipes are EARNED, never bought at a station (F9 ruled 2026-09-04):** start Gruit + Hopped;
  deal 3 of the 4 exports, one card per player per export ⚙. Two doors, both earned: **the Bruges
  prize** — a cask of yours landing at Bruges, by either door, may take ONE recipe from the display
  at its printed fee, if its printed requirement reads true; and **the *Gain 1 recipe* cask tile**
  — at its fee, the requirement waived (the search-brew is the competition for that tile). Fees
  in hops, so you plan ahead: **Broyhan 1 `H` · Keut 1 `G` · Mumme 1 `G` 1 `H` + ① · Bock 1 `G`
  2 `H` + ②** ⚙ — ①/② are dice of yours on posts or buildings beyond Bruges (never the field),
  printed as icons. From nothing to a first Bock: tile 2 + FLIP 2 + recipe 3 + brew 5 = 12 goods,
  a Bruges landing and two investments.
- **The wharf hand — 3 tiles** ⚙, die-less, goods only, L1/L2 by the FLIP: **KETTLE** (L1 Mash Tun:
  Q3–4 may brew · L2 Great Copper: Q5 may brew, and its owner BREWs twice a visit) · **STORE** (L1
  Hop Garden: +1 `H` when you work its station · L2 Maltings: +1 `G` +1 `H`) · **COLD STORE** (L1:
  one aging cask of yours +1 step as you work its station · L2 Lagering Cellar: one Ready cask +1
  past its quality, cap 6). **Fees L1 1 `G` 1 `H` · FLIP 1 `G` 1 `H`** ⚙.
- **Specialists (F10 ruled 2026-09-04: they stay):** 2 seats on the player board; the door is
  **Bergen's prize** — a cask of yours landing at Bergen may seat one specialist from the display
  of 4, free ⚙ (level up through buildings AND specialists). The roster is re-cut in P1 from the
  v7 fifteen: the jobs the board now does retire (Coper, Herald, Shipwright, Supercargo); the two
  the rulings named join (automatic aging, F5 · an unfull sail, F13); the core five carry.
- **The cask and its die:** unchanged law (set at brew, aged to Ready, lifted to 6, read as it
  boards, parked at landing). **The cask tile parks under the die** at the Kontor, on the bench
  and in the yard: the beer's identity stands with its die (the quality band, the Flight), and
  each beer's stack is its supply for the game ⚙. Load-bonus pool ⚙ (7): *Gain 2 goods · Age +1 ·
  Load 1 more · LIFT · Brew 1 · Gain 1 recipe · POST (stand a tray die on any open post, fee
  waived)* — the brewer's cask that pays the merchant's loop. Presence, BUILD and CHART leave the
  tiles; Gruit's tile is blank ⚙.

### 6.3 The MERCHANT loop — THE SEA BOARD (F1 ruled 2026-09-04: a new board)

One new board, double-sided by player count. It prints **the Wharf** at the centre (the 2×2 in
miniature, the cart road leaving the Cellar side, the two lanes leaving the Harbor side), **the
cart road to Bruges**, **two lanes of legs** — west **W1 the Wadden Coast · W2 the Dover Strait →
London**; east **E1 the Skagerrak → Bergen · E2 the Sound → Novgorod** — and **the four Kontor
panels**. Map and lanes are the same thing; the board gives ownership and every destination a
printed home (`archive/records/` will carry the mock; the page "The Sea Board" is the first cut).

**Three kinds of piece at sea (the designer's question, answered):**
- **A POST is a die only** — your die in **your own seat** on a leg (one seat per colour on every
  leg: **posts never block**, everyone may hold every leg; the die is the owner, the pips the
  return). Post 1 costs no goods; post 2 its printed fee and admits Hulks; post 2 prints an ⚜ for
  the first player to fill it.
- **A KONTOR BUILDING is a tile of yours + a die** — the Warehouse, then the Kontorhaus, in the
  Kontor's **two sockets, first come** — the only exclusivity at sea, and the race worth having.
  Opened with ⚜ + a die while your cask lands there (§ F8).
- **A WHARF TILE is a building only, no die** (kettle · store · cold store) — goods on the wharf.

**Who benefits (F2 ruled 2026-09-04: option A):** two layers, both printed. *Public:* a Kontor
building raises that Kontor's marker and its majority pair for EVERY delivery there. *Private:*
the builder's die turns +1 each time a RIVAL's cask lands there, and a post die turns +1 each
time ANY Ship sails its leg — you open the destination for the table and are paid in pips as the
table uses it. *Yours alone:* **YOUR MINIMUM** is a count of your own colour on that Kontor's lane
and panel — posts, buildings and parked casks; Novgorod counts both east legs. **There is no
separate tracker: the count is the tracker.** More posts and buildings of yours at a Kontor
admit lower dice there, so the same investment that raises the market widens what you may sell
into it. The Flight pays breadth across beers; the majorities pay breadth across Kontore; ten
dice make both hard.

**Side A (2p):** two seats per leg, a bench of six. **Side B (3–4p):** four
seats, the bench of eight, the full yard. Two building sockets per Kontor on both sides.

Each far Kontor panel prints, top to bottom: the name and minimum · **YOUR MINIMUM** · the market
track 0…+3 with one marker and a printed base cell · the two building sockets with their ⚜ price,
the floor mark and the majority pair · the parking field (tile under die) · the letter line and
the landing order.

| Printed socket ⚙ | Cost | Die | Turns +1 (cap 6; pips at the end) | For everyone |
|---|---|---|---|---|
| **Post 1** (your seat on leg 1) | 0 goods (the die) | a tray die, face 1, at the Harbor | **any Ship sails this lane** | the lane OPENS (Cogs) |
| **Post 2** (your seat on leg 2) | Bergen 1 `G` · London 1 `G` · Novgorod 1 `G` 1 `H` | as post 1; the first to fill it takes the printed ⚜ | any Ship sails this lane; **owner: your cask landing here +1** ⚙ (A's sea lift) | **Hulks** may sail here |
| **Warehouse** (a tile of yours + a die, socket 1) | **1 ⚜** + a tray die, while landing here | face 1 | **a rival's cask lands here** | marker **+1**; the floor is **1**; majority pair L1 |
| **Kontorhaus** (a tile of yours + a die, socket 2; needs the Warehouse) | **2 ⚜** + a tray die, while landing here | face 1 | a rival's cask lands here | marker **+1**; majority pair L2 |

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

### 6.4 Bruges — the road, the yard, the bench

Reached by the cart only (the Market's CART 1). No route, no track, no minimum, no letter. Two
doors, and the cart always resolves (the bench if legal and chosen, else the yard). **Either door
pays the Bruges prize: the landing cask may take ONE recipe at its printed fee and requirement
(§6.2).** The doors:
- **THE YARD — a fixed price (F7 ruled 2026-09-04):** any Ready cask landing here → **3 goods** ⚙,
  any mix; park the die (tile under it) in the yard field. Only Gruit should. Gruit's only door.
  The die is Bruges presence, no majority weight, a Flight beer. Gruit costs 1 `G` to brew and
  sells for 3: easy, fast and cheap — a distraction good enough to compete for a die, never the
  points generator. No row, no fall: it is not the central beer.
- **THE BENCH — 8 places** ⚙ (2p: 6), filled left to right; each prints a **quality band** and a
  **bonus**, alternating so the low door closes late ⚙: `Q2+ +2 · Q2+ +2 · Q3+ +3 · Q2+ +2 · Q3+
  +3 · Q4+ +4 · Q3+ +3 · Q5 +5`. PRESENT a Q2+ cask: spend 1 ⚜, take the NEXT open place if the
  tile meets its band, score **die + bonus**, park the die on the place (Bruges majority weight).
  Gruit never. **The Bruges pair prints under the last filled place** (1/0 → 2/1 → 3/1 → 4/2 → 5/2
  → 6/3 → 8/4 → 9/4 ⚙); the rightmost die breaks every Bruges tie. The spent invitations are the
  ladder.

### 6.5 Invitations ⚜ — earned, capped, two sinks

Tokens, 16 ⚙. **Start with 1. No hand cap** (F17 ruled 2026-09-04: hard to earn is limit enough); held face-up.
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
seat** · the **POST** tile. Nothing else takes a die; BUILD and recipes take goods.

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
| aging paid in goods | retired; AGE is a visit, a cask bonus or the Cold Store — upkeep, never goods |
| recipes too easy / Bock too hard | earned at Bruges or on a cask tile, priced in hops, the top rungs needing far dice; the Bock stack 12 goods; Q4+ reads a higher cell and the bench's top places |
| ships a public good | open hulls, nothing owned; the commissioner is paid by the act — destination, slot, the maiden load, INVEST unlocked |
| buildings optional | the kettle is the only Q3+ door; a tile's slot owns its hull; seats are the only far value |
| the London double-build spike | Kontor prizes retired; the best die is 9–11★ |
| Gruit the hidden currency | the cart only; a fixed 3 goods; no majority weight; a blank tile; each Gruit is a tenth of the runway |
| the hall priced dead | die + a bench bonus of 2–5 against die + a cell of 0–3; ⚜ with two sinks |
| the dice not the clock | 10 dice; two visible sinks; the merchant's dice cost no goods |
| the ledger 4% | posts tick per sail on their lane, seats per rival landing, every die from face 1 |
| ownership never on the table | tiles own hulls; dice stand in posts and seats; standing sets the minimum |

## 7 · THE FORKS (the designer rules each; ★ = the recommendation)

*SUPERSEDED 2026-09-06 by §12.3 (the status of every fork after the review) and §13.7 (the rulings
still needed). The rows below show the rulings as they stood on 2026-09-04.*

**Ruled 2026-09-04 (sixth reading): F4 the bench, provisionally · F10 specialists STAY · F11 Public Works stay and get a real pass · F12 cart only · F17 no invitation cap.** **Ruled 2026-09-04 (fifth reading): F7 Gruit is fixed — 1 `G` to brew, 3 goods at the yard; not the central beer, so no row and no fall.** **Ruled 2026-09-04 (fourth reading): F9 recipes are earned — the Bruges prize and the cask tile, never a station (the Market's ALT is the CART) · F5 reaffirmed: no automatic aging, a specialist may bring it back.** **Ruled 2026-09-04 (third reading): F3 nobody owns a hull, a Harbor visit commissions when it can and INVEST follows · F5 the explicit AGE action · F13 ships sail when full, no verb.** **Ruled 2026-09-04 (second reading): F1 a sea board · F2 YOUR MINIMUM · F14 a starter post of your choosing; posts never block, the Kontor buildings do.** **Ruled 2026-09-04, on reading the first cut: no formal tray.** Which end a die comes from adds
nothing; the dice come from one place. What matters is how much each die earns at its
destination on the boards — that is the tension in action. The two-ended tray, its ⚜ milestones
and its strip are out of the plan; the runway is the v7 tray, and the split is read off the
boards in your colour.

| # | Fork | Options | ★ and why |
|---|---|---|---|
| F1 | The sea's shape | **RULED 2026-09-04: a new sea board** — the v6 geography as owned legs; map and lanes are one thing; the mock is the page "The Sea Board" | ruled |
| F2 | Route access | **RULED 2026-09-04: (a) YOUR MINIMUM** — your own dice on the lane and at the Kontor set what may board; the count is the tracker; a building's marker step is public, its ticks private | ruled |
| F3 | Hull ownership | **RULED 2026-09-04: nobody owns a hull.** Every Ship is open; nothing tracked. The commissioner is paid by the act: destination, slot, the maiden load, and INVEST — which a Harbor visit unlocks only by commissioning | ruled |
| F4 | The hall | **RULED 2026-09-04 (provisional): the rising bench** — fine for the first table; the designer wants a few alternative paths explored later (demand cards, benches by quality) | ruled |
| F5 | Aging | **RULED 2026-09-04: the explicit AGE action** at the Cellar, the *Age* cask bonus and the Cold Store — upkeep, never goods; no calendar routine; automatic aging may return as a specialist's line | ruled |
| F6 | Socket dice | (a) all at face 1, each ticking on its printed event · (b) fixed coupons + rent (E) | (a): one grammar |
| F7 | Gruit's price | **RULED 2026-09-04: fixed** — 1 `G` to brew, 3 goods at the yard; no row, no fall. Gruit is a means to an end, a distraction good enough to compete for a die | ruled |
| F8 | Opening a seat | (a) ⚜ + a die at a landing, by anyone (D) · (b) goods + a die at the Harbor (E) · (c) the second seat owner-only (red team) | (a): requirement 9 verbatim; the ⚜ is a fork in the hand; the second seat's private prize is small so the snipe is dead |
| F9 | Recipes | **RULED 2026-09-04: earned, never bought at a station** — the Bruges prize (either door) and the *Gain 1 recipe* cask tile, at a hops fee; the far-dice requirement stays printed on Mumme and Bock ⚙; the search-brew is the competition for the tile | ruled |
| F10 | Specialists | **RULED 2026-09-04: they STAY** — level up your operation through buildings AND specialists; players love asymmetric powers. Two seats; the door is Bergen's prize ⚙; the roster is re-cut in P1 (the jobs the board now does retire; automatic aging and the unfull sail join) | ruled |
| F11 | Public Works | **RULED 2026-09-04: keep** — done right they make the start of the game fun, and they have not been done right since v1/v2: the roster gets a real design pass in P1 (each Work must be worth walking to); deal 6 at 2–3p, 4 at 4p; the tide | ruled |
| F12 | Bruges by cart | **RULED 2026-09-04: cart only** — that is how it would have been anyway; it justifies Gruit's destination; the hall gives big returns on your best beers by invitation, without a trading network | ruled |
| F13 | SAIL | **RULED 2026-09-04: a Ship sails when full, and only then.** No SAIL verb; premature sailing at most a specialist's line later; docked cargo lands at die only at the end | ruled |
| F14 | The starter post | **RULED 2026-09-04: one free die in your own seat on any post 1** · posts never block (one seat per colour); the Kontor buildings' two sockets are the only exclusivity; side A / side B by count | ruled |
| F15 | The wharf hand | (a) 3 tiles kettle · store · cold store · (b) 4 licensed producers (D) | (a) |
| F16 | Quality bands | (a) two numbers per market cell + bands on the bench, the tile under the die · (b) die-only cells | (a): without it a lifted Keut equals a Bock and Bock dies again |
| F17 | The ⚜ cap | **RULED 2026-09-04: no cap** — invitations are hard to earn; that friction is the limit | ruled |

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
  Store · Hop Garden; new verbs: INVEST · OPEN · CART · POST), `COMPONENTS.md` §0 as the v8
  kit delta. **The Public Works roster re-designed** (F11: each Work worth walking to) and **the
  specialist roster re-cut** (F10). A second red-team pass on the ruled sheet. Docs only; the v7.0b build stays live at
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

**Leave in the box:** the demand cards, the ladder markers, the flags, the other
Bourse markers; deal 6 of the 12 Public Works. Specialists: the core five plus two hand-written seats (automatic
aging · an unfull sail) until the P1 roster.

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

---

## 12 · The designer's review of the first plan — batch 1 (2026-09-06)

*Recorded the day it arrived. The designer's instruction with it: "Process and document the
notes but don't go all in on anything until I share the rest of my review." So this section
records, reads and flags; the re-cut of §6–§11 and of the page "Brewer & Merchant" waited for
the last batch. Batch 2 is §12.6–§12.7, batch 3 (the last) is §12.8–§12.9; §12.3 and §12.4
are kept current across batches. The review closed 2026-09-06 with the instruction to build
the implementation plan for the rules and `play.html` from all of it — that plan is §13. Where a note overturns a ruling in §7, the §7 row still shows the old ruling until
the re-cut; §12.3 is the authoritative status table meanwhile.*

### 12.1 The review, verbatim

> Your premise at the top of the doc isn't right. It to be pedantic but you will overindex on
> things like this so it's important to cover it. 7 failed because it was supposed to break the
> tight overlap between the wharf station actions and the core loop of source, brew, age, and
> ship. All you need to do is walk that loop literally and you are playing the game. Everything
> else is just loosely added on but doesn't contribute to the game in meaningful ways resulting
> in a simulation engine building game that is actually just an efficiency game. It lacks soul
> as a result and the decisions that seem exciting are actually uninteresting and not
> challenging. Goods being free actually means being the only resource in the game, which makes
> game play linear. I'll touch on the other statements below but the big thing here is the game
> lacks soul and the v7 explorations were intended to address that. Instead of meaningful
> change, we actually regressed significantly which resulted in this exercise. I want to add
> depth to the game and your tendency to optimize cancelled out progress. I'm going to walk you
> through feedback for the entire document in one go. Consider it all as we develop the plan.
>
> Forks.
>
> There is no tray. The dice sit in a pile as a personal supply next to the player board. You
> can stop using that term. Personal supply is fine. No ruling required, just drop the
> formality of where the dice come from. This is a board game played on a table with friends
> in person, not an app.
>
> The dice as the clock is nothing new, neither is having multiple destinations for them. We
> are just balancing out the game and making the sea as a destination more impactful in the
> game. You only have so many dice, find balance between casks, buildings, and the sea to
> maximize their values and win.
>
> Route access. Your minimum is a weird way to document this. The deal is straightforward. The
> sea is a board which has lanes towards each of the Kontor destinations. Players must build
> posts to unlock these shipping lanes and those who build out the tree from Hamburg (where we
> are presumably) to any given Kontor become eligible to build the Kontor buildings. Anyone can
> unlock a segment of a shipping lane and when they do by building a post, the die deployed
> there increases in value from 1 up to a total of 6. All dice on the sea board are scored at
> the end of the game, one point per pip. Multiple players may place posts on the same line but
> only one may build in each Kontor building slot, and they must have built the full chain of
> posts to do so.
>
> Ships. Hulls are either 2 or 3 with a combination for each Kontor. I want to add a set of
> wild ships which the destination is set by the last player to load it, following quality
> rules. This needs to be addressed further but we will get there.
>
> The hall is good for now, we will explore it further later but the gist is that I have this
> local opportunity to display my best brews at the guild of brewmasters. This would be by
> invitation only and you only get invitations by brewing beer and delivering them to Kontors.
>
> Aging is just an action taken by your worker at the cellar and some cask bonuses. No auto
> aging except with specialists.
>
> Gruit is simple. It's a lucrative distraction you use to get ahead. Goods are tight and it's
> a quick and easy way to get them at the cost of a die. Necessary but worth it as long as you
> don't brew it too much.
>
> Kontor buildings require a die. The die sets the value modifier for the player for their
> brews delivered there. We are simplifying the scoring of beers because humans are not
> calculators or software when sitting and playing a board game. The cask die is at most
> 1+ready quality (plus 1 die is an action modifier we have in places) plus the Kontor
> modifier. That's it. Kontor buildings address that value die. Maybe other elements in the
> game too to beef up the strategic lane.
>
> The Lisboa comment was misinterpreted. This is important. I like Lisboa because of how
> interconnected the game systems and mechanics are in that board game. You build ships using
> one resource and open public buildings with another. This means getting value out of a shop
> requires the resource to build it plus the resource to open the public buildings which gives
> it value for scoring. Shops serve a second purpose of generating goods, a secondary currency
> for other actions so diversifying shops is good to ensure you have all types of goods but the
> scoring of shops is based on public buildings and majorities of each type of shop (good)
> which promotes going all in on a particular type. Public buildings are associated with a row
> or column and are limited in number so there is a race to ensure a public building is set to
> score your types of buildings. You use the same type of action to build a shop or open a
> public building but the requirements send you off on other paths to prepare the
> prerequisites. I love the interplay here. I want more of this kind of depth in brewmasters.
> It was not a comment on production vs civic works but an attempt to push us towards a way of
> thinking about game systems and theory as we design our game.
>
> That all said, recipes, invitations, and buildings are those prerequisites to these core
> actions of brew, taste in the hall, and engine build as a way to get ahead.
>
> Specialists are not necessary but they are a way to bring in asymmetric player powers.
> People love these in games and I want them here. They can be powerfully enough to push you to
> try a given strategy or help you scratch an itch or shortcut parts of the game which is fun
> when you can get the most out of them. We can consider them later but it's something fun
> that adds depth. We need to make sure our simulation tools are designed to capture this
> depth or they will always push you to simplify (which is what you suggest).
>
> That is all for this batch. Process and document the notes but don't go all in on anything
> until I share the rest of my review.

### 12.2 The reading, note by note

**The premise.** §0 and §2 described what the oracle measured (free goods, an inert hall,
optional buildings, a round-counter clock). The disease is one level up: the station actions
and the core loop are the same four verbs, so the loop is walkable without a single decision
that is not an efficiency decision. Depth is the target, not tightness. Free goods are not a
missing sink; they made goods the only resource and the play linear. **The assistant's
recorded failure mode: optimizing cancels depth** — every simplification the reviews and the
sims recommended (retire the specialists, one marker, one count) pulled toward the efficiency
game the designer is trying to leave. This goes to the charter with batch 2 (§12.5).

**No tray — the personal supply.** The dice sit in a pile beside the player board. The word
"tray" is retired from every surface at the re-cut (21 uses in this document, the page, the
teach). No ruling; a wording. The game is played at a table, and the plan must read like one.

**The dice and their destinations.** Nothing new to announce: the dice were always the clock
and always had destinations. v8 balances the destinations and makes the sea a destination that
matters. The designer's own sentence is the thesis, and replaces §6.0's: *"You only have so
many dice, find balance between casks, buildings, and the sea to maximize their values and
win."* Note the THREE destinations — casks · buildings · the sea. Buildings take dice; the
Kontor buildings certainly (below), and whether the wharf tiles do again is a batch-2
question (§12.4).

**Route access — the post chain replaces YOUR MINIMUM.** The rule as the designer states it:
- The sea board has lanes from Hamburg (the Wharf's home — `DESIGN.md` already calls Hamburg
  "the brewhouse of the Hanse") toward each Kontor. A lane is a chain of segments.
- A player unlocks a segment by building a POST there: a die of theirs, placed at 1, that
  turns up toward 6 (the trigger is a batch-2 question). Anyone may post on any segment;
  several players may hold posts on the same segment or line.
- Every die on the sea board scores one point per pip at the end of the game.
- A player who has built the FULL chain of posts from Hamburg to a Kontor becomes eligible to
  build in that Kontor's building slots; one builder per slot.
- No per-player quality count, no printed 0→5+ row, no "seat". The count that gated cargo is
  gone; what a chain of posts earns is eligibility, pips and (per the next note) a value die.

**Ships.** Hulls of 2 or 3 berths, a combination for each Kontor (the deck stays Kontor-bound,
mixed sizes per Kontor). NEW: a set of WILD ships whose destination is set by the last player
to load them, "following quality rules" — which quality rules survive is a batch-2 question,
since YOUR MINIMUM is gone (a printed per-Kontor minimum quality is the obvious candidate).
The designer flags this as unfinished.

**The hall.** Stands for now: a local guild of brewmasters where you display your best brews,
by invitation only. **Invitations come only from brewing beer and delivering it to Kontors.**
That overturns the post-2 invitation and narrows the letter: the faucet is delivery, full
stop. Rate (per landing, per first landing per Kontor, per Ship) is a batch-2 question.

**Aging.** Confirmed as ruled: the Cellar action and cask bonuses; no automatic aging except
by a specialist.

**Gruit.** Confirmed as ruled: a lucrative distraction, goods for a die, worth it in
moderation.

**Kontor buildings and the SIMPLIFIED SCORE.** A Kontor building requires a die, and that die
IS the player's value modifier for their own brews delivered there. The score of a delivered
cask is: **the cask die (Ready quality, at most +1 from a lift) + the player's Kontor
modifier. That's it.** No market track, no cells, no bands, no per-landing glut, no demand
line, no premium: humans are not calculators. The public marker and the floor from §6.3 are
overturned unless batch 2 restores something of them; the building's die is private value,
and "other elements" may join it to beef up the strategic lane (open).

**Lisboa, re-read.** The reference was to SYSTEM INTERLOCK, not to a production/civic split.
The pattern the designer wants more of: one resource builds the thing, a second resource opens
the thing that makes it score; the built thing also yields a secondary currency, so
diversifying is good, while scoring by majority per type pushes toward going all in; the
scoring pieces are few and tied to a row or column, so there is a race for them; and the same
action type serves both builds while the prerequisites send you down other paths to prepare.
**The mapping the designer gives: recipes, invitations and buildings are the prerequisites to
the core actions of brew, taste in the hall, and engine build.** The plan's job is to make
each core action need a prerequisite earned somewhere else, and to have the prerequisites
pull in different directions.

**Specialists.** Asymmetric player powers, wanted: strong enough to push a strategy, scratch
an itch or shortcut a part of the game. Considered later, and the simulation tools must be
built to capture that depth or they will keep recommending simplification — which the
assistant did, five times over, in §5 and §7.

### 12.3 Status of the plan after batch 1

| Plan element (§) | Status | Note |
|---|---|---|
| The premise (§0, §2 lede, §4's framing) | **corrected** | §0 carries the correction; §2/§4 re-written at the re-cut |
| §6.0 thesis | **replaced** | by the designer's sentence: balance casks, buildings and the sea |
| The turn (MOVE · P + A · flanks) | stands | kept by the ruling of 2026-09-04 |
| "The tray" | **retired word** | "personal supply"; 21 uses to change |
| F2 YOUR MINIMUM (§6.3, the panel rows, the recipe requirement) | **overturned** | the post chain: posts unlock segments, a full chain earns building eligibility |
| Posts: a die at 1 → 6, 1★/pip, several players per segment | stands, restated | the tick trigger open |
| Kontor building sockets, one builder each | stands | prerequisite: the full chain |
| The market track, cells, floor, glut per landing (§6.3) | **overturned** | score = cask die + the player's Kontor modifier |
| F16 quality bands, two-number cells | **overturned (batch 2)** | the QUALITY COUNT: the quality you may ship to a Kontor = the number of your dice on posts and Kontor buildings (5 → Bock); per-Kontor or global is the one open reading |
| Ships Kontor-bound, 2/3 berths | stands | plus WILD ships (new, unfinished) |
| F3 nobody owns a hull, commission when able | **confirmed (batch 3)** | commissioning is REQUIRED on a Harbor visit; the commission lets you post on THAT ship's destination lane ("elegant"); the Harbor needs an alternate that makes it a must-visit |
| F4 the bench (the hall) | stands, provisional | "display my best brews at the guild" |
| Invitations from letters + post 2 (§6.5) | **overturned** | only from delivering beer to Kontors (batch 1); they are the HALL's key and the third scoring path, built to compete with the Kontor majorities (batch 2); rate open |
| F17 no cap | stands | |
| F5 aging | confirmed | |
| F7 Gruit | confirmed | |
| F9 recipes earned (Bruges prize + cask tile) | **confirmed (batch 2), narrowed (batch 3)** | the Bruges prize pays only at the YARD (a cask that does not enter the hall); the *gain recipe* tile stays; a private wharf building may make recipes cheaper or grant them all; the far-dice requirement folds into the quality count |
| F10 specialists stay | confirmed, strengthened | asymmetric powers wanted; sim tools must capture them |
| F11 Public Works | **confirmed (batch 2)** | early chaos for replayability, early wins, a push down a lane; the roster is designed only AFTER the core is settled |
| F12 cart only | stands | |
| F13 sails full | stands, end-game amended (batch 3) | at the end, dice on docked Ships score pips only — no sail, no bonus; brews in vessels score nothing |
| F14 the starter post | **confirmed (batch 2), amended** | "something to try"; the starter die is an ELEVENTH die, not one of the ten; the "seat" wording goes |
| F6 socket dice | open | a post die climbs 1→6 (batch 1); the trigger is the re-cut's to propose |
| F8 opening a Kontor building | **re-cut (batch 3)** | a die from the supply + the full chain of posts; the Harbor's ALTERNATE is the recommended door (§12.9) |
| F15 the wharf hand (Kettle · Store · Cold Store) | **overturned (batch 3)** | no kettle, no licence: recipes limit the brewer, the quality count limits the merchant; the wharf buildings are a GWT-style private-building engine instead (§12.9) |
| §6.7 scoring skeleton, §10 cut list, §11 questions | **re-cut in §13** | |
| London's prize | **ruled (batch 3)** | a building or a post |
| Kontor buildings | **confirmed (batch 3)** | simple: they raise the value of the owner's brews delivered there; more later |

### 12.4 Questions still open before the re-cut (kept current; ✔ = answered by a later batch)

1. **Lane openness.** Once every segment of a lane holds at least one post (anyone's), may every
   player's Ships sail it, or only players holding a post on each segment? The text reads as
   public once unlocked; confirm.
   *(2026-09-06, on the chain: "Building slots are opened once all of the leading posts to it
   are filled with your dice. You need the whole branch of the tree built with posts (dice)
   before you can build at Kontors." — the BUILDING gate is settled: your OWN die on every
   segment from Hamburg to that Kontor. Whether SAILING needs your own posts too, or only
   the segments unlocked by anyone, is still this question.)*
2. **The post tick.** What turns a post die from 1 toward 6: any Ship sailing its segment (the
   current recommendation), the owner's own landings, or a build action?
3. **Segments per lane** on the board: the mock has two to London, one to Bergen, one more to
   Novgorod. Keep, or set by the chain-length the designer wants for each Kontor?
4. **Delivering without a building.** A cask landing at a Kontor where you hold no building
   scores its die alone? And is the Kontor modifier one die per player per Kontor, or per slot?
   *(batch 2 fixes the shape: the score is two dice added, the cask's and your building's;
   with no building, presumably the cask die alone — confirm.)*
5. **The modifier die's value.** Set at 1 and raised by a later action, or ticking on use like
   a post, or set by the number of posts in the chain? Does it also score 1★/pip at the end
   ("all dice on the sea board")?
6. **Wild ships:** which "quality rules" — ✔ batch 2: the QUALITY COUNT (the last loader's
   count of dice on posts and Kontor buildings sets what may ride, and they name the port).
   Left: whether the count is read per destination or across the whole sea board (below).
7. **Invitation rate:** one per landing, one per first landing at each Kontor, or per Ship?
   Does a Bruges yard landing count as "delivering to a Kontor"? *(batch 2: an ⚜ is "a formal
   declaration of Kontor brews" — so per Kontor delivery, and never from Bruges; the rate is
   still the dial.)*
8. **Majorities at the Kontore** by parked casks: unchanged, or folded into the building die?
9. **Do wharf buildings take a die** ("casks, buildings, and the sea")? If yes, the v7 ledger
   grammar returns in some form and the personal supply feeds three destinations, not two.
10. **Hamburg** printed as the home port on the sea board? (Theme already says so.)
11. **The quality count: per Kontor or global?** "The quality you can ship to a Kontor is equal
    to the number of dice you have on posts and Kontor buildings." Read A (global): count every
    die of yours at sea, one number for every port — teaches once, five at sea ships Bock
    anywhere the lane is open. Read B (per lane): count only the dice on that Kontor's chain
    and in its building slots — ties the merchant to a destination, three ports need three
    investments. Batch 1's chain (eligibility per Kontor) and batch 2's sentence (one count)
    fit either. The re-cut needs one.
    **✔ Ruled 2026-09-06: GLOBAL.** "The quality count is from all dice for the whole board.
    Otherwise you would never reach 4 or 5 before running out of dice." One number, every
    port, and it governs Bruges too.
12. **Does the starter (eleventh) die count** toward the quality count? If yes, Hopped (Q2)
    needs one more die at sea from the first turn; if no, nothing sails before the first INVEST.
    **✔ Ruled 2026-09-06: it counts.** "This is why you can deliver to Bruges with a gruit.
    Consistency is a great thing!" The count is 1 from setup, so a Q1 Gruit may go to Bruges on
    turn one; a Hopped needs a second die at sea; Bock needs five.
13. **The hall's payout.** "As simple as adding two dice": the cask die + the place's printed
    bonus, or the cask die + a second die of some kind? And what an "easy benefit" is in
    numbers, so the hall really competes with a Kontor majority.
14. **The search-brew's menu.** Batch 2 names build · gain recipe · gain specialist as the
    missing pieces a cask tile may carry. Does *gain specialist* on a tile replace Bergen's
    prize as the specialist door, or join it?
15. **Kontor building cost.** With invitations as the hall's key, what opens a building slot:
    goods, a die alone (the chain being the prerequisite), or something else?
    *(batch 3: a die, on the chain; the Harbor's alternate is the recommended door — §12.9.)*
16. **The Harbor's alternate.** Batch 3 asks for one "that makes it a space you need to go
    to". Recommendation in §12.9: BUILD a Kontor building there. Ruling wanted.
17. **The private-building engine.** Batch 3 replaces the kettle hand with a GWT-style ladder
    of private buildings on the wharf slots, strictly better than the stations and building
    on each other. The ladder itself is designed in §13; the designer rules the faces.
18. **Novgorod's prize.** Bruges' yard pays a recipe, Bergen a specialist, London a building
    or a post (batch 3). Novgorod is unnamed; §13 proposes one.

### 12.5 Process lesson, to land in the charter with batch 2

Proposed `CLAUDE.md` §1 line, beside THE OVERRIDE: **"THE SECOND OVERRIDE — optimizing cancels
depth (designer-ruled 2026-09-06). The instinct that pulls every review toward fewer parts,
one marker, one count, no asymmetry produced v7's efficiency game and killed its soul. Depth is
the target: interlocking prerequisites (Lisboa), asymmetric powers, a sea worth a die. A
simulation or review that recommends simplification must first show it is not measuring
depth away; the sim tools are built to capture asymmetry and interlock or they are not used
as judges."* The `AUTOMA.md`/`playtests` consequence: the v8 bots and the persona lanes must
represent the specialists and the prerequisite chains before any corpus is read.

### 12.6 Batch 2 (2026-09-06), verbatim

> Recipes are good as they are. They don't need to be easy to get but can't be impossible. Our
> current solution of brew + search is actually a great solution because it allows a player to
> do what they are already doing (brewing which is essential in the game) but also get that
> missing piece they are missing. This can be build, gain recipe, gain specialist, etc. It also
> means players don't have to gain a recipe if they have them all. Nice balance as a relief
> valve.
>
> Public works are something I like because it adds some chaos to the beginning of the game to
> make it more replayable. You don't know what the starting buildings will be or what little
> combos will be waiting for early moves. This makes the game fun because it helps give players
> early wins as well as push players down a strategic lane. We probably want to iron out the
> details of the core game before we dream up what these should be.
>
> The starter die is fine, something to try. It probably wants to be number 11.
>
> Quality band is something I don't understand. I mentioned before that I want scoring as
> simple as adding two dice. That's it. For quality, I think it needs to be as simple as
> possible. For example, quality you can ship to a Kontor is equal to the number of dice you
> have on posts and Kontor buildings. You have 5? You can deliver bocks. You must be a merchant
> to deliver better beers.
>
> Invitations are intended to be a formal declaration of Kontor brews as a way to access the
> hall in Bruges. You want to tap and taste your finest brews but the hall is invite only. Get
> invites to get brews out for an easy benefit. It provides a third pathway for points. I want
> it to compete with the majorities in the Kontors or be a strategy when the Kontors won't be
> your source of points.
>
> Ok, that's batch two. Next up is my review in the teach and reference.

### 12.7 The reading of batch 2

**Recipes — F9 confirmed, and the search-brew promoted.** The brew-and-search is kept as THE
general door to a missing piece, not a recipe door only: a cask tile may carry *build*, *gain
recipe*, *gain specialist* and the like. Brewing is what every player does anyway, so the
search is a decision inside an essential action, and it is self-limiting — a player who holds
every recipe simply takes another tile. Recipes stay not-easy and never impossible: the
Bruges prize and the tile, at a fee. The "dice beyond Bruges" requirement printed on Mumme and
Bock is no longer a separate rule: the quality count (below) already says who may SHIP a
Mumme or a Bock; whether the recipe itself should also be gated is for the re-cut to decide,
and the simpler answer is no.

**Public Works — F11 confirmed, sequenced.** Their purpose is stated: chaos at the opening,
replayability, an early win, a nudge into a lane. Their roster is designed only after the core
is settled — so the P1 "Works pass" moves behind the core sheet, and the paper table's first
games may run with the v7 roster as filler or with none.

**The starter die — F14 confirmed, as an eleventh die.** Ten in the personal supply, one
already standing at sea from setup. Component count: 11 dice per colour, 44 in the box. It is
"something to try": a paper-table dial, not a law.

**The quality gate — the QUALITY COUNT replaces every band and every cell.** Quality you may
ship to a Kontor = the number of your dice standing on posts and Kontor buildings. Five dice
at sea ships Bock; two ships Hopped; a pure brewer ships nothing above Gruit, and Gruit only
goes to Bruges. This is the whole "you must be a merchant to deliver better beers" in one
count, with no printed ladder, no band on a tile, no two-number cell. It is close to what F2
tried to say and far simpler: count up, not "lowest die admitted". The one reading to settle
is per-Kontor versus global (§12.4 q11). Scoring is likewise two dice added: the cask die and
your building die at that Kontor.

**Invitations — the hall's key, the third path.** An invitation is a formal declaration of a
Kontor brew: you earn it by delivering to a Kontor, you spend it to tap and taste your finest
brew at the Bruges hall for an easy benefit. The hall is the third scoring pathway beside
Kontor landings and Kontor majorities, and must be sized to compete with the majorities — or
to be the plan when the Kontors will not be your points. Consequences for the re-cut: the
hall's payout is simple and generous; invitations are not the currency that opens Kontor
buildings (F8 re-opens on goods or the die alone); the bench-by-bands design of F4 must be
re-read against "as simple as adding two dice".

**What batch 2 closes from §12.4:** q6 (the wild ships follow the quality count), most of q7
(an ⚜ is per Kontor delivery, never from Bruges). **What it opens:** q11–q15.

**Addendum, same day (the designer, on q11 and q12):** the quality count is GLOBAL — every die
of yours on posts and Kontor buildings anywhere on the sea board, one number for every
destination, Bruges included; and the starter die counts, so the count opens at 1 and a Gruit
can be carted to Bruges from the first turn. The reason given for global is the dice budget:
with eleven dice, a per-lane count could never reach 4 or 5. The rule as it now stands, one
sentence: *the quality you may deliver anywhere = the number of your dice standing at sea.*

### 12.8 Batch 3 (2026-09-06), verbatim — the last

> I like how the commission ship action allows you to build a post on a lane for that ship's
> destination. This is an elegant solution. I want to make sure that commissioning a ship is
> required when the harbor is visited. We want to make sure that players are commissioning
> ships. It should be something that you need to do and if everyone is doing it, the wharf is
> full of options of destinations. I think the harbor station should have an alternate action
> that makes it a space you need to go to.
>
> The use of kettle/mash tun is confusing and I worry it's unnecessary complexity for little
> gain. We already have recipes as the resource required to unlock better brews and posts
> required to unlock sensitizations for them. The private buildings can extend this by making
> them cheaper (once built you immediately have all recipes) but I don't want to make it too
> difficult.
>
> Kontor buildings are simple they increase the value of brews delivered there for the player
> who owns them. I think we can expand them further with other actions but let's start here.
>
> Recipes are available only to beers delivered to Bruges that don't go into the hall.
>
> At the end of the game, the dice on docked ships are only worth the pips value, no sailing
> or bonuses. No value for brews in your vessels.
>
> London's price is building buildings or posts.
>
> One note on buildings - these are intended to help implement the engine building element
> of the game. I really like how great western trail works with buildings. You know the base
> buildings which give you a little bit of everything but the private buildings are strictly
> better and they build on each other. As we build out the slots on the wharf, I want to feel
> like I can build an engine to scale up with my operations to cut corners or skip ahead.
>
> As I mentioned before, I don't like the need to build a kettle. You already have your brew
> house board. The recipes are enough to limit your capabilities.
>
> Ok that's all for my review. Process all of these batches of my review thoroughly (have two
> sub agents read through the artifact, play.html, the previous rules, and my review content
> then dive in) and prepare a plan for building out the rules and play.html combine the two
> agents to check your work. I want to have a comprehensive plan to implement v8. Build the
> plan revised from all of my feedback.

### 12.9 The reading of batch 3

**The Harbor.** Commissioning is REQUIRED whenever the Harbor is visited and a Ship can be
docked, so the wharf stays full of destinations. The commission is what lets you post: the
post goes on the lane of THAT Ship's destination, which the designer calls elegant — it is
kept as the merchant's opening move. The Harbor then needs an ALTERNATE that makes it a
place you must go to. Recommendation: **BUILD a Kontor building** there (a die from your
supply onto a building slot of a Kontor whose chain of posts you hold), so both merchant sinks
live at the Harbor and the station is the merchant's desk the way the Brewhouse is the
brewer's. Alternatives considered for §13: hire a specialist from the display; charter a wild
Ship. Ruling wanted (§12.4 q16).

**No kettle, no licence.** The Mash Tun / Great Copper gate is retired. The brewer is limited
by RECIPES (earned at the yard or on a cask tile) and the merchant by the QUALITY COUNT
(dice at sea). A private wharf building may make recipes cheaper, up to "once built you hold
every recipe". Not difficult, not layered.

**Kontor buildings, plainly.** A Kontor building raises the value of the owner's brews
delivered there: the landing scores the cask die plus the building die. That is all for now;
other actions may hang off them later.

**Recipes at the yard only.** The Bruges prize pays a recipe only to a cask that goes to the
yard, never to one that enters the hall. The cart's two doors are therefore: the yard (three
goods + a recipe, Gruit's only door) or the hall (an invitation, points). The *gain recipe*
cask tile stays as the second door.

**The end.** Every die on a docked Ship scores its pips and nothing else: no final sail, no
Kontor building die, no bonus. Brews still in vessels score nothing. This is a clean
end-trigger rule with no last-round sail to adjudicate.

**London's prize: a building or a post.** A cask landing at London lets you stand a die on a
post or a Kontor building slot you are eligible for (fee waived, the die still spent). With
Bruges (the yard: a recipe), Bergen (a specialist) and now London, three of the four prizes
are named; Novgorod's is proposed in §13.

**The wharf engine, Great Western Trail's way.** The four stations are the base buildings: a
little of everything for everyone. Private buildings on the slots are strictly better and
build on each other; as the slots fill, a player's engine scales their operation, cuts
corners and skips ahead. No kettle in it. §13 designs the ladder: each private building
upgrades the verb of the station it flanks, and the higher tiers require the lower.

**Addendum (the designer, same day) — the chain, exactly.** "Building slots are opened once
all of the leading posts to it are filled with your dice. You need the whole branch of the
tree built with posts (dice) before you can build at Kontors." So eligibility to build at a
Kontor = a die of YOURS on every segment of the branch from Hamburg to it; a rival's posts on
the way do not count for you, and a Novgorod building needs your dice on every segment of
the Bergen branch and the Sound beyond it. Posts never block, so two players can each hold
the whole branch; the building slots are the only exclusivity.

**The instruction.** The review is complete. The plan for building out the rules and
`play.html` is to be prepared from all three batches, with two independent sub-agents
reading the page, the engine, the previous rules and the review, then combined and
cross-checked. That work is §13.

---

## 13 · THE IMPLEMENTATION PLAN — v8 from the whole review (2026-09-06)

***THE GO (the designer, 2026-09-06 — §12.10 and §12.11 verbatim).** The rulings below amend
§13 and are the law the build follows; where §13's body still reads the older call, §12.11's
reading wins: Kontor buildings are TILES from each player's own set, placed in a slot and marked
with the builder's die (the die is the delivery modifier, climbs +1 on ANY landing there, scores
its pips) · wharf tiles carry PRINTED points (2 on tier 1, 4 on tier 2), no dice · every Kontor's
minimum is Q2 for now (the beer's printed quality) · a wild Ship's port is named by the FIRST cask
loaded (a chit on the hull) · Gruit takes a tile (all "Gain 2 goods", no search), its bonus fires
on the CART, and the yard is a TRACK of three zones whose prize shrinks as it fills (best: a recipe
or 2 goods · good: a recipe at its fee or 1 good · ok: 1 good) · the CART moves to the Cellar's
alternate and LOAD 1 to the Market's (the designer's own wondering, adopted as a dial) · the LIFT
cask bonus goes, lifts live only on wharf buildings, six is the top face · posts cost an action and
a die · the prefix tree · a lane anyone unlocked is open to all · v7 is NOT archived ("it was a
bust"); the root build is replaced in place. The rules are composed in `RULES.md` v8.0 from this.*

*How this section was made. Two sub-agents each read `CLAUDE.md`, this file (§1 and §12 as law over
§6–§11), the reviewed page "Brewer & Merchant", `RULES.md` (v7.0b), `play.html`, `components.js`,
`playtests/verify-v7.js`, `playtests/sim.js`, `STYLE.md` and `COMPONENTS.md`. One took the RULES
lens (the sheet, the teach, the deltas), one the ENGINE lens (the state model, the handlers, the
render, the AI, the battery, the build order). Their reports are session material (the
scratchpad); this section is their merge, and each then checked the merge against its own report
(§13.1 records the disagreements and the call). Every ⚙ is a placeholder with its rationale. **This
section supersedes §6–§11.** No engine change has been made; this is the plan for making it.*

***AMENDED AFTER THE GO — v8.0b “the free ground” (the designer, 2026-09-06, on the first
read of the built mirror).** Four rulings supersede the §13.2 §12 text and the number sheet below,
and stand in `RULES.md` §12: (1) a private tile is NOT tied to a station — it stands on ANY of the
8 slots the player chooses and fires *On visit*, when its owner works the station that slot
flanks (the slot picks the station, not the tile's name; no per-station cap); (2) vacant ground
only — never over a Public Work, never a rival's tile (the +1 `G` replace door is retired; the
tide is the only thing that opens ground); (3) four Public Works at every player count ⚙ (was
6 / 4); (4) the Brewers' Guildhall's line is *On visit: Brew once (a full brew, with its search)*,
not "brew twice this visit". The same read asked the app to glow every choice on the board and
let the hand tiles be tapped over (a view, never a rule), and ruled the casing law (`STYLE.md`
§4c rule 4: nothing prints in all caps). Record: `DESIGN.md` §9 (v8.0b). **v8.0c (2026-09-07):**
the Granary and the Warehouse read *Gain 2 goods, any mix* (the fixed 1 `G` + 1 `H` pair was the
first cut's Hop Garden/Maltings carried unexamined). **Queued, the designer's direction the same
day, not yet ruled:** move away from free resource giveaways toward discounted or at-cost actions
in Great Western Trail's grammar (e.g. *pay 1 grain: Brew* — a brew now, not next turn); the
inventory and a first cut await the ruling.*

### 13.0 The game in one breath

Eleven dice: ten in your **personal supply**, one standing at sea as your **starter post**. A die
leaves the supply as a **cask** (BREW), a **post** (a die on a segment of a lane) or a **Kontor
building** (a die in a Kontor's slot), and never returns; the first empty supply ends the game.
**The quality count**: the quality of beer you may deliver anywhere = the number of your dice
standing at sea. A landing scores **two dice**: the cask's and your building's at that Kontor.
Posts and building dice climb as the sea is used and score their pips at the end. Bruges is
reached by cart only: **the yard** pays goods and a recipe, **the hall** pays cask die + the hall
die for an invitation, and invitations come only from landing beer at the far Kontore. The Harbor
must commission a Ship, which lets you post on that Ship's lane, or build at a Kontor whose branch
you hold. The wharf's **private buildings** are a Great Western Trail engine: strictly better than
the stations, tier 2 on tier 1, owner-only, goods only. No kettle, no market track, no bands, no
tray. Humans are not calculators.

### 13.1 The merge — where the two lenses disagreed, and the call

| # | Question | Rules lens | Engine lens | The call, and why |
|---|---|---|---|---|
| M1 | What a Kontor building IS | the die alone, in a printed slot | a tile of yours + a die (12 tiles) | **The die is the building.** The colour is the owner, the face the value, the pips the return; batch 3 says simple. A tile is a later seam if "other actions" hang off buildings. |
| M2 | What turns a building die | +1 after each of your OWN landings there, plus a RAISE arm | +1 on each RIVAL landing there | **+1 on ANY landing there** (own or rival), cap 6. One grammar for every die at sea: it climbs as its place is used (§1: "you invest in the line and you get a benefit as it is used"). Own-only (the Lisboa "all in" push) and rival-only are the dials, §13.7 q2. The Harbor's RAISE arm stays. |
| M3 | Where a new post goes | the lowest segment of the lane you do not hold (a prefix from Hamburg) | any open segment of the lane | **The prefix.** "Build out the tree from Hamburg"; a chain is then always "one more segment"; nothing to remember. |
| M4 | Printed per-port die minimums | keep v7's (2+/2+/3+) as the port's gate on the DIE, so the wild Ship's "quality rules" bind | none; the count is the only gate | **None.** Batch 2: quality "as simple as possible"; one gate per thing. A wild Ship's namer picks any open Kontor; "following quality rules" is read as the count, which every cask aboard already passed at its load (the count is the player's gate, not the port's). The minimums return only if the table finds Novgorod without an identity (its depth, pair and prize give it one); §13.7 q4. |
| M5 | The hall's payout | **the HALL DIE**: cask die + a neutral die starting at 2, +1 per present, cap 6; places park and weigh | printed rising places 2,2,3,3,4,4,5,5 | **The hall die.** Literally two dice, one component, the same climb-as-used grammar, and a race in the open: every present raises the next. The printed bench is the dial if the table wants a fixed ladder. |
| M6 | Post fees | none: the die is the price | the far segment 1 `G` | **None.** The designer's own reason for the global count is the dice budget; the merchant's dice cost no goods so the supply empties (the clock). Goods bind the brewer and the wharf engine; the Hulk's 1 `G` stays. |
| M7 | Ships in the deck | 18: per Kontor Cog ×3 · Hulk ×2, wild Cog ×2 · Hulk ×1 | 16 | **18** (the v7 tile count re-faced; three wild hulls). |
| M8 | Kontor building slots | 2 on side A, 3 on side B; one per player per Kontor | 2 everywhere | **Side A prints 2, side B prints 3 with the third marked "4p"**: two players share two, three race for two, four race for three. One per player per Kontor. |
| M9 | The lift cap | quality + 1 | 6 | **Quality + 1.** Batch 1 verbatim: "the cask die is at most 1 + ready quality". |
| M10 | The Hulk | loads only toward a Kontor where a building die stands (anyone's) | no gate | **No gate for the first table** (one rule fewer; the count and the chain already make the sea an investment); the building gate is the dial if Hulks run free (§13.7). |
| M11 | Tiebreak | vessel dice, then goods | the quality count, then goods | **The count, then goods.** Vessels are worth nothing at the end (batch 3). |
| M12 | Public Works filler | v7 roster minus the Weigh House | also minus the four Staple Houses and the Cooperage's ★ | **Both cuts.** A landing is two dice and nothing else, so no Work may add ★ to a cask; the Customs House is re-faced "your count reads +1 for a Ship at this slot". Seven tiles stand as filler until the Works pass. |
| M13 | London's prize | any BUILD, fee waived (a post, a Kontor building, a wharf tile or FLIP) | a post or a Kontor building | **Any build.** Batch 3: "building buildings or posts"; the die is still spent for a post or a Kontor die. |
| M14 | Recipe fees | Broyhan 1H · Keut 1G · Mumme 1G1H · Bock 1G2H | v7's H = Q−3 | **The rules lens's fees** (on the page the designer called "good as they are"; hops are the pinch). |

Everything else the two lenses agreed on: the sailing gate is public (a lane is open once every
segment holds anyone's post; still the designer's call, §13.7 q1) · the post tick is any Ship
sailing through · no die on a wharf building · Gruit never boards a Ship · one ⚜ per cask of yours
landed at a far Kontor, none from Bruges, start with none · the Flight counts beers LANDED (3/6/10)
· Novgorod's prize turns one die of yours at sea +1 · the end scores docked dice at pips and
vessels at nothing · the Harbor's ALTERNATE is BUILD at a Kontor.

### 13.2 THE RULES SHEET — v8.0, the draft the mirror is built from

*In the register of `RULES.md`: operational, numbered, no history. ⚙ marks a placeholder; the
rationale is in brackets or in the number sheet (§13.2.16).*

**2–4 players · c. 1350 · Hamburg.** You run a merchant brewing house of the Hanse. Goods are the
only currency. You must be a brewer AND a merchant: the work runs Source → Brew → Age → Ship, and
nothing sails without your dice at sea. Most ★ when the dice run out wins.

#### 1 · Components and setup

Each player: **3 `G` · 2 `H`** (storage cap 8 each) · the **Gruit** and **Hopped** recipe cards ·
a **player board** (3 vessels · 2 specialist seats · the personal supply space · a rack for the
hand) · **11 quality dice**: **10 in the personal supply, 1 the starter post** · **the hand of 4
private building tiles**, one per station, tier 1 up (§12) · **0 ⚜**. [A warm Ready Gruit at
setup is a table dial, off by default: it would open the supply at 9 and muddle the teach.]

Shared: **the Wharf** (4 stations, 8 slots; §4) with **Public Works dealt onto random slots, 6 at
2–3p / 4 at 4p** ⚙ (the rest to the box; nothing refills) · **the sea board**, side A (2p) / side B
(3–4p): Hamburg at the centre, the cart road to Bruges, the five **segments** (§8) each printing
one **post seat per colour**, the three far **Kontor panels** each printing its **building slots**
(2 on A; 3 on B, the third marked 4p ⚙), its **majority pair**, its **field** and its **prize**,
and the **Bruges panel** printing **the yard field**, **the hall** (6 places on A, 8 on B ⚙) and
**the hall die's seat** · **the hall die** (neutral) on its seat at **2** ⚙ · **recipes**: deal 3
of the 4 export beers, 4 copies each ⚙ [nobody is locked out of a dealt beer]; the undealt export's
cards and cask tiles go to the box · **cask tiles** in face-up searchable stacks per dealt export
and for Hopped (Gruit takes no tile) · **no Ship is docked at setup** (the first Harbor visit
commissions by law) · **the Ship deck** (18: per far Kontor Cog ×3 · Hulk
×2; wild Cog ×2 · Hulk ×1 ⚙), display of 3 · **the Specialist deck**, display of 4 · **16 ⚜
tokens** ⚙ · score discs on the ring.

**The starter post.** In REVERSE turn order each player stands their eleventh die at **face 1 in
their own seat on the FIRST segment of either lane** (W1 or E1). Every seat begins with one die at
sea and a quality count of 1. Workers start off the board; each seat's first turn places its
worker on any station.

#### 2 · The personal supply and the end

Your unspent dice sit in a pile beside your board. **A die leaves the supply only as a cask
(BREW), a post (POST) or a Kontor building (BUILD), and never returns.** Every die of yours is
therefore public: in the supply, a vessel, aboard a Ship, a Kontor field, the yard, a hall place, a
post seat or a building slot.

**The first EMPTY supply sets the final round**: finish the round, then score (§15). MAX_ROUND
18 ⚙ backstops [10–15 turns a seat; posts cost no goods, so the supply empties even when the
goods are gone].

#### 3 · The turn: MOVE, then WORK THE STATION

1. **MOVE** your worker to an **adjacent** station (orthogonal; never stay; turn one places
   anywhere). Sharing costs nothing.
2. **WORK THE STATION**, its stops in any order, each at most once, all optional except the one
   printed **must**: its **PRIMARY** · its **ALTERNATE** · **each of its two flanking slots**
   (LOAD one Ready cask onto the Ship docked there, §7; and **your own private building** standing
   there fires, §12). The station is read live: a Ship commissioned onto a flanking slot this
   visit opens that slot's load.

#### 4 · The Wharf: four stations, eight slots

```
   A Market ── B Brewhouse       slots: Market s1·s8 · Brewhouse s2·s3
      │            │                    Harbor s6·s7 · Cellar s4·s5
   C Harbor ── D Cellar
```

| Station | PRIMARY | ALTERNATE (same visit) |
|---|---|---|
| **A · Market** | **SOURCE 2** ⚙: 2 goods, any mix [goods must bind] | **CART 1**: one Ready cask of yours to Bruges by road, resolved at once at the yard or the hall (§10). No cask bonus fires on the cart. |
| **B · Brewhouse** | **BREW**: pay a recipe's goods; a supply die into an open vessel at the beer's start value; **search the beer's stack and choose the tile** (§5) | **BUILD, the wharf**: place a private building from your hand onto an open slot, or a Public Work's slot, flanking its station, or FLIP your standing tier 1, at its fee (§12) |
| **C · Harbor** | **COMMISSION — must, when it can**: a Ship from the display at its fee (**Cog free · Hulk 1 `G`** ⚙) onto a shipless slot or over an EMPTY docked Ship (which returns to the deck); the display refills. **Then POST**: a supply die at face 1 on **the lowest segment of that Ship's lane where you hold no post** (a wild Ship: any lane; a lane you hold whole: no post). If you hold a Ready cask you may load it now, free: the maiden load, a LOAD in every respect (§7), taken after the post. | **BUILD, a Kontor**: where **your own post stands on every segment of its branch**, a supply die at face 1 into an open building slot (one per player per Kontor) — **or RAISE**: turn one die of yours at sea +1 (cap 6) (§8) |
| **D · Cellar** | **AGE 3**: turn your aging dice up three steps, split freely | **LOAD 1** Ready cask onto **any** docked Ship |

"When it can" = a Ship is on display, a slot is free or an EMPTY hull can be displaced, and you can
pay one of the hulls shown. Otherwise the commission lapses for that visit.

**A slot holds one building (below: a Public Work or a private building) and/or one Ship (above);
never casks.**

#### 5 · The cask and the die · brewing · the search

**The die is the cask.** BREW sets a supply die to the printed start value; aging turns it up to
the quality (**Ready**); a lift may push it to **quality + 1 at most** ⚙; it is read as it boards;
it parks at landing.

| Beer | Q | Brew | Start · steps | Tiles |
|---|---|---|---|---|
| Gruit | 1 | `G` | 1 · 0 | none |
| Hopped | 2 | `G H` | 1 · 1 | 12 |
| Broyhan | 3 | `G H H` | 2 · 1 | 6 |
| Keut | 3 | `G G H` | 1 · 2 | 6 |
| Mumme | 4 | `G H H H` | 1 · 3 | 6 |
| Bock | 5 | `G G H H H` | 2 · 3 | 6 |

**The search.** Every BREW of a Q2+ beer searches that beer's stack and takes ONE tile; the tile
rides under the die. **Its bonus fires once, as the cask boards a Ship.** The nine bonuses ⚙
[batch 2: the missing piece may be a build, a recipe, a specialist, and so on]: *Gain 2 goods ·
Age +2 · Load 1 more · LIFT (this die +1 as it boards, cap Q+1) · Brew 1 (a full brew at its
cost, with its search) · Gain 1 recipe (from the display at its fee) · Gain 1 specialist (from
the display into an open seat) · BUILD (one build you are eligible for: a wharf tile at its fee,
or a Kontor building die) · POST (a supply die on the next segment of any lane, no commission).*
Each export's six tiles print six different bonuses; Hopped's twelve print the nine verbs, three
of them twice. **Gruit takes no tile and never searches** (it never boards): a parked die with
no tile under it IS a Gruit. A landed tile stays under its die; an empty stack means that beer
cannot brew now.

#### 6 · Aging

A die turns up only when something turns it: the Cellar's AGE 3, a cask's *Age +2*, your Cold
Store (§12), the Braumeister (§14). No good is ever spent on a step. No automatic aging except by a specialist (the Braumeister, §14).

#### 7 · Ships · loading · the berth race · sailing

**Cog 2 berths · Hulk 3.** Each Ship is bound for a printed far Kontor or is **WILD**. No Ship goes
to Bruges. **Nobody owns a hull**; anyone may load any docked Ship.

**LOAD** (a flanking stop · the Cellar's LOAD 1 · *Load 1 more* · the Stevedore): one Ready cask
from YOUR vessels onto a docked Ship, if all of: (1) **the quality count**: the beer's printed Q
≤ the number of your dice at sea (§8); (2) **the lane is open**: every segment of the Ship's
Kontor's branch holds at least one post, anyone's ⚙ [§13.7 q1]; a wild Ship needs some open lane;
(3) **not Gruit** (the cart only). Casks are private until they board: the interaction is the
**berth race** (topping off a hull sails everyone's cargo on your clock).

**A WILD Ship**: the player whose cask FILLS it **names its Kontor** at once, any far Kontor whose
lane is open; a Kontor chit goes on the hull. The port adds no rule: every cask aboard passed its
owner's count at the load.

**A full Ship SAILS AT ONCE.** No SAIL verb (the Shipmaster excepted, §14). On sailing: the slot's
Public Work departs with it (the tide, boxed) · **every post on every segment of its lane turns
+1** (cap 6) · each cask aboard **LANDS in boarding order** (§9) · the hull returns to the deck.

#### 8 · The sea board: segments, posts, the chain, the buildings, the count

| Branch | Segments from Hamburg | Kontor |
|---|---|---|
| West | W1 the Wadden Coast → W2 the Dover Strait | London |
| East | E1 the Skagerrak | Bergen |
| East, beyond | E1 the Skagerrak → E2 the Sound | Novgorod |

⚙ [the mock's tree; a merchant holding every segment counts 5 and ships Bock with no building;
Bergen is the beginner's port]. Each segment prints **one post seat per colour**: posts never
block; every player may hold every segment.

- **A POST is a die of yours at face 1 in your seat on a segment.** It costs the die and nothing
  else ⚙. It enters by the commission's POST (§4), the *POST* tile, the Shipping Office, or
  London's prize. **Your posts grow from Hamburg**: a new post takes the lowest segment of its
  lane you do not yet hold.
- **A post turns +1 each time any Ship sails through its segment** (cap 6).
- **A segment is unlocked while any post stands on it; a lane is open while every segment of its
  branch is unlocked** ⚙ [§13.7 q1].
- **A KONTOR BUILDING is a die of yours at face 1 in one of the Kontor's building slots.** You
  may found one only where **your own post stands on every segment of that Kontor's branch**
  (Novgorod: E1 and E2). **One builder per slot; one building per player per Kontor.** It enters
  by the Harbor's BUILD, the *BUILD* tile, or London's prize.
- **A building die turns +1 each time any cask lands at that Kontor** (cap 6) and each time you
  RAISE it (the Harbor's BUILD arm, Novgorod's prize, the Counting House).
- **THE QUALITY COUNT: the quality you may deliver anywhere = the number of your dice standing at
  sea** (posts + building dice, the starter post included). Count 1 carts a Gruit; 2 ships a
  Hopped; 5 a Bock. Read at the LOAD and at the CART, against the beer's printed Q. No tracker:
  the dice are the count.
- **Every die at sea scores 1★ per pip at the end** (§15).

#### 9 · Landing · the prizes

When your cask LANDS at a far Kontor, in boarding order: (1) **score cask die + your building die
there** (no building: the cask die alone); nothing else. (2) **Park the die in the field, tile
under it** (a parked cask die never scores again; only post and building dice score pips). (3) **Every building die at that Kontor +1** (cap 6). (4) **Take 1 ⚜** ⚙. (5) **Take
the Kontor's prize.**

| Kontor | Branch | Prize ⚙ | Pair ⚙ |
|---|---|---|---|
| **London** | W1 · W2 | **one BUILD of any kind**, the goods fee waived, the die still spent | 5 / 2 |
| **Bergen** | E1 | **a specialist** from the display into an open seat, free | 5 / 2 |
| **Novgorod** | E1 · E2 | **turn one die of yours at sea +1** (cap 6) | 7 / 3 |
| **Bruges** (the cart) | the road | **the yard: one recipe** at its fee; the hall: none | 4 / 2 by hall dice |

#### 10 · Bruges: the cart, the yard, the hall, invitations

**THE CART** (the Market's ALTERNATE) sends one Ready cask of yours to Bruges, count permitting
(a Gruit needs 1). No Ship, no lane, no ⚜ earned, no bonus fired. Two doors:

- **THE YARD**: any beer. **Take 3 goods, any mix** ⚙; park the die in the yard field, tile under
  it (a Flight beer; no majority weight); **then take one recipe from the display at its fee**.
  **Gruit's only door.**
- **THE HALL** (the guild of brewmasters): **a Q2+ cask and 1 ⚜.** Spend the ⚜; **score cask
  die + the hall die**; park your die on the next open place, its tile under it; **then the hall die turns +1**
(cap 6). No recipe. Gruit never. Hall full: the yard.

**Invitations ⚜**: tokens, no cap and no ceiling (16 printed; more from the bank if ever needed). **The only faucet: 1 ⚜ per cask of yours landing at a far
Kontor** ⚙. **The only sink: the hall.** The hall's places are the Bruges majority (§15).

#### 11 · Recipes

Start with Gruit and Hopped. Exports are earned, never bought at a station: **the yard** or the
***Gain 1 recipe* tile**, at the card's fee: **Broyhan 1 `H` · Keut 1 `G` · Mumme 1 `G` 1 `H` ·
Bock 1 `G` 2 `H`** ⚙. Nothing else prints on a card. The Scriptorium waives the fee; the Brewers'
Guildhall grants every recipe (§12). Holding every recipe, you simply take another tile.

#### 12 · The private buildings: the wharf engine

The four stations are the base: a little of everything for everyone. **Your private buildings
are strictly better and build on each other.** Your hand holds **4 tiles, one per station**, tier
1 on one face, tier 2 on the other. **A tile stands only on a slot flanking its station and
fires only when YOU work that station** (a flanking stop); rivals never use it; the tide never
takes it; **no die stands on it**; a docked Ship may stand above it. **At most one private
building of yours per station.**

**Three doors, one verb**: the Brewhouse's ALTERNATE · a cask's *BUILD* tile · London's prize.
**Tier 1**: from hand onto an open flanking slot for **1 `G` 1 `H`** ⚙, or onto a Public Work,
replacing it, for **+1 `G`** ⚙ (the Work boxed); never onto a rival's tile. **Tier 2 is the
FLIP**: your standing tier 1 turns over in place for **2 `G` 1 `H`** ⚙; it requires the tier 1 and
nothing else. Every tier 2 contains its tier 1.

| Station | Tier 1 (fires when you work it) | Tier 2, the FLIP ⚙ | The corner it cuts |
|---|---|---|---|
| **Market** | **Granary**: +1 `G` +1 `H` | **Kaufhaus**: +2 goods, any mix, AND your CART carries 2 casks | goods every visit; two Bruges landings at once |
| **Brewhouse** | **Scriptorium**: recipes cost you no fee, at every door | **Brewers' Guildhall**: you hold **every recipe**, AND you may BREW twice this visit | the recipe ladder for goods; the second brew |
| **Cellar** | **Cold Store**: AGE +2 more (Age 5) | **Lagering Cellar**: Age +2 more AND one Ready cask of yours +1 (cap Q+1) | aging in one visit; the lift you own |
| **Harbor** | **Counting House**: RAISE one die of yours at sea +1 (cap 6) | **Shipping Office**: RAISE +1 AND **POST once more** (no second commission) | pips now; the count faster |

#### 13 · Public Works (filler until the roster pass, which comes after the core)

Shared, die-less, passive on their slot's traffic, free for whoever's traffic it is; **every one
departs with the Ship that sails from its slot** (the tide). Deal 6 / 4. The filler ⚙: *Malt Kiln
×2 (a loading die +1, cap Q+1) · Customs House (your count reads +1 for a Ship at this slot) ·
Ropewalk (a load here may also load onto another Ship) · Cooperage (+1 berth) · Bonded Store (the
boarding die +1; on sail every shipper +2 goods) · Victualling Yard (the bonus fires twice)*. Out
until the pass: the Weigh House (no glut) and the four Staple Houses (no ★ beyond two dice).

#### 14 · Specialists (two seats; the door: Bergen's prize or the *Gain 1 specialist* tile)

Asymmetric powers, each pushing a lane; a sketch of ten singles for the P1 pass ⚙: **Braumeister**
(turn start: age one cask +1; the one automatic-aging door) · **Shipmaster** (working the Harbor,
sail one docked Ship carrying a cask of yours unfull) · **Cellarman** (your brew starts +1) ·
**Stevedore** (each load: up to 2) · **Agent** (a rival's landing where you hold a building:
that die +1 more) · **Lodesman** (your count reads +1) · **Carter** (your cart carries 2; the
yard pays you 4) · **Guildmaster** (each present +2★) · **Chronicler** (each landing +1★) ·
**Alderman** (end: +2★ per Kontor with 3+ dice of yours parked). The Shipmaster naming an unfull wild
Ship names its Kontor. Retired: Coper, Herald, Shipwright, Supercargo, Innkeeper, Guild Scholar,
Town Crier; the rest of the v7 fifteen (Grain Factor, Hop Gardener among them) are held for the
roster pass as optional drips.

#### 15 · End of the game and the final score

When the round after the first empty supply is complete: (1) landings and presents were scored
as they happened; (2) **pips at sea**: every post and building die of yours; (3) **docked
Ships**: every die of yours aboard, its pips only, nothing sails, nothing parks; (4) **majorities**
at each far Kontor by dice in the field, at Bruges by dice on hall places, the printed pair to the
two leaders, no dice no share, ties split; (5) **the Flight**: distinct beers LANDED (tiles under
your dice at the Kontore, the yard, the hall): **3 → 3★ · 4 → 6★ · 5 → 10★** ⚙; (6) specialist end
lines. **Vessels score nothing.** Tiebreak: the quality count, then goods.

#### 16 · The number sheet

| Number | Value ⚙ | Rationale |
|---|---|---|
| Dice | 11 = 10 + the starter | ruled |
| SOURCE · goods cap · start | 2 · 8 · 3G 2H, 0 ⚜ | goods bind; the hall is earned; a warm Gruit is a table dial |
| The yard | 3 goods + a recipe at its fee | ruled |
| The hall die | starts 2, +1 per present, cap 6 | two dice; rises with the table |
| Hall places | 6 (A) / 8 (B) | 16 ⚜ in the box |
| ⚜ faucet | 1 per cask landed at a far Kontor | a declaration per brew |
| Segments | W1 W2 · E1 · E1 E2 | count 5 at full sea |
| Building slots | 2 (A) / 3 (B, the third at 4p); one per player per Kontor | one short of the table at 3–4p |
| Post die | 1, +1 per sail through, cap 6, no fee | §1; the supply empties |
| Building die | 1, +1 per landing there, +1 per RAISE, cap 6 | one grammar for every sea die (q2) |
| Kontor chits | 3 | a wild hull's named port |
| Ships | 18 (5 per Kontor + 3 wild), display 3, Cog free, Hulk 1G | the wharf stays full |
| Recipe fees | Broyhan 1H · Keut 1G · Mumme 1G1H · Bock 1G2H | "good as they are" |
| Tier fees | T1 1G1H · FLIP 2G1H · replace a Work +1G | goods bind the engine |
| Lift cap | Q + 1 | ruled |
| Cask pool | 9 verbs; exports 6 each, Hopped 12; Gruit none | the general door |
| Public Works | deal 6 / 4 | F11 |
| Pairs | London 5/2 · Bergen 5/2 · Novgorod 7/3 · Bruges 4/2 | v7's rungs 2–3 |
| The Flight | 3/4/5 → 3/6/10 | breadth vs all-in |
| MAX_ROUND | 18 | must never fire |

### 13.3 The teach (twelve sentences)

1. You are a Hanseatic brewer in Hamburg in 1350; beer you cannot carry is worth nothing, so you are a merchant too, and the player who does both best wins.
2. Your eleven dice are your whole game: one already stands at sea as your starter post, ten wait in your personal supply, and every die you spend becomes a cask, a post on a lane or a Kontor building and never comes back; when anyone's supply is empty we finish the round and score.
3. Each turn move your worker to a neighbouring station and work it: its big action, its small action, and the two slots beside it, where you may load a Ready cask onto the Ship docked there and where your own private building fires.
4. The Market gives two goods or carts one Ready cask to Bruges; the Brewhouse brews or builds on the wharf; the Harbor must commission a Ship, which then lets you post a die on that Ship's lane, and as its small action builds or raises at a Kontor whose branch you hold; the Cellar ages three steps or loads one cask onto any Ship.
5. To brew, pay the recipe, set a die in a vessel at the beer's start, and search that beer's stack for the tile you want: its bonus fires once, when the cask boards a Ship, and it can be goods, aging, a load, a lift, a brew, a recipe, a specialist, a build or a post.
6. The die is the cask: it climbs only when you age it, and at the beer's quality it is Ready.
7. The sea is a tree of segments from Hamburg: a post is a die of yours on one, it climbs every time a Ship sails through, when every segment of a branch has someone's post the lane is open to everyone, and when every segment has YOUR post you may build at that Kontor: a die in a slot, one builder per slot.
8. Count your dice at sea: that is the quality you may deliver anywhere, so a Gruit goes to Bruges from turn one, a Hopped needs two, a Bock needs five; you must be a merchant to sell better beer.
9. Ships hold two or three casks and sail the moment they are full; anyone may load any Ship; a wild Ship goes where the player who fills it says; each cask that lands scores its own die plus your building die at that Kontor, parks in the field, and pays you an invitation and the Kontor's prize.
10. Bruges is reached by cart only: the yard pays three goods and a recipe for any cask and is Gruit's only door, or with an invitation a Q2+ cask enters the hall and scores its die plus the hall die, which then climbs.
11. Your four private buildings each upgrade one station and each flips to a stronger face: more goods, free recipes then all recipes, faster aging and a lift, extra pips and posts.
12. At the end add the pips of every die of yours at sea and on docked Ships, the majorities at each Kontor by parked casks and at Bruges by hall dice, and the Flight for three or more different beers landed; the landings and the hall were scored as they happened.

### 13.4 The deltas

**`RULES.md`, section by section:** head rewritten (the count and the sea in the summary) · §1
Setup rewritten (11 dice, no tray, the starter post, the sea board A/B, 0 ⚜, the hand of 4 private
tiles, Works 6/4, the deck 18 with wild hulls and no Bruges hulls, no contracts/demands/Bourse/
ladders, the hall die) · §2 The turn kept, the flank clause re-cut ("your own private building
fires") · §3 The Wharf rewritten (the station table above) · §4 The cask kept with the lift cap
Q+1 and the nine-verb pool · §5 Ventures → **§12 The private buildings** · §6 The lanes → **§8
The sea board** · §7 Ships rewritten (the three load conditions, wild Ships, the post tick) · §8
The Bourse retired · §9 The Kontore rewritten (two dice; the prize table) · §10 Contracts → **§10
Bruges** and **Invitations** · §11 Ladders → **Majorities** (fixed pairs) · §12 Specialists
rewritten · §13 Goods kept · §14 The end rewritten · §15 Scoring rewritten · §16 Expansions
re-read (the specialty beers ride the count; Jopenbier Q6 needs count 6).

**`STYLE.md` registry — register:** personal supply · Hamburg · the sea board · lane (re-derived:
the branch to one Kontor) · segment (supersedes *leg*) · branch · post / POST (re-derived) ·
unlocked / open · the chain · Kontor building (a die in a slot) · building slot · RAISE · the
quality count · wild Ship · the cart / CART · the yard · the hall (re-derived) · the hall die ·
place · present (re-derived: Bruges only) · Invitation (re-derived) · private building
(supersedes *Venture*) · tier 1 / tier 2 · BUILD (re-derived: three doors) · Granary · Kaufhaus ·
Scriptorium · Brewers' Guildhall · Cold Store · Lagering Cellar · Counting House · Shipping
Office · Shipmaster · Agent · Lodesman · Carter · Guildmaster · the Flight (re-derived: landed).
**Retire:** tray · kettle · the second kettle · Mash Tun · Great Copper · YOUR MINIMUM · socket ·
seat (Kontor sense; the specialist seat stays) · market cell · quality band · market track/marker
· the Bourse · price marker · shift · the glut · Venture · ledger die · overbuild · theme · L1/L2
as labels · lane gate · contract · claim · demand card · demand well · majority ladder · ladder
marker · private flag · SAIL (as a verb) · presence placement · Coper · Herald · Shipwright ·
Guild Scholar · Town Crier · Assay Loft · Rack House · Staple Rights · Warehouse (v5.5) · minimum (the printed die floor) · Weigh
House (until the pass) · Skute · the bag · the first-landing letter · INVEST · OPEN · leg ·
Kontorhaus (the tile sense) · bench.

**`COMPONENTS.md` — the box:**

| Component | v7.0b | v8 ⚙ | State |
|---|---|---|---|
| The Wharf board | 1 | 1 | re-printed station faces |
| The Destinations board | 1 | 0 | **retired** |
| **The sea board** | 0 | 1, double-sided | **new**: Hamburg, the road, 5 segments (2 seats per colour on A, 4 on B), 3 far panels (2/3 slots · pair · field · prize), the Bruges panel (yard field · 6/8 places · the hall die seat) |
| Market & Stores board | 1 | 1 | the Bourse lane struck; displays Ships 3 · specialists 4 · recipes; the ring |
| Player boards | 4 | 4 | 3 vessels · 2 seats · the supply space · a rack; no tray |
| Quality dice | 52 | **44** (11 × 4) | the same dice are casks, posts, buildings |
| **The hall die** | 0 | 1, neutral | **new** |
| Private building tiles | 16 Ventures | **16** (4 × 4 colours, T1/T2) | re-faced; the ledger seat struck |
| Kontor building tiles | 0 | 0 | the die is the building |
| Public Works | 12 | 12 (7 as filler) | roster pass after the core |
| Ship tiles | 18 | **18** (5 per Kontor + 3 wild) | re-faced; no Bruges hulls |
| Cask tiles | 52 | **36** | the nine-verb pool; Gruit takes no tile (its 16 go) |
| **Kontor chits** | 0 | 3 | **new**: a wild hull's named port |
| Recipe cards | 24 | 24 | fees only; no far-dice icons |
| Specialist tiles | 15 | ~10 | roster pass in P1 |
| Contracts · demands · ladder markers · flags · Bourse markers | 14 · 12 · 4 · 4 · 8 | 0 | **retired** |
| **⚜ tokens** | 0 | 16 | **new** (the contract backs or wooden) |
| Workers · score discs · goods · aids | as now | as now | aids re-printed |

Headline: one new board, one neutral die, sixteen tokens, three chits, eight fewer dice, sixteen
fewer cask tiles, four decks and trackers out, no new tile family.

### 13.5 THE ENGINE PLAN — `play.html`, `components.js`, the battery, the harness

#### 13.5.1 Keep · change · retire · new

**Keep verbatim:** the shell, CSS (the dormant v6 `.seamap` grid at lines 373–403 is the sea
board's display pattern), nav, Studio, diag, undo, save/load (`KEY` → `hanse-v80a`), the boot ·
MOVE adjacency and the stop machine (`doMove` · `beginStops` · `refreshStops` · `resolveStop` ·
`stopAvail` · `resume`) · the search-brew (`enterBrew` · `brewPick` · `brewverb` · `brewCommit` ·
the piles) · the Cellar (`enterAge` · `ageAllot` · `loadany`) · the ship-deck grammar (`SHIP_CAP`
· `COMMISSION_COST` · display 3 · `commSlots` with EMPTY-hull displacement · `refillShipDisplay` ·
the maiden load) · the tide in `sailShip` · the Public Works as filler (`BUILDINGS`, `boardDie`,
Ropewalk, Cooperage's berth, Bonded, Victualling) · specialists (`IMPROVEMENTS`, `hireable`,
`grantUpgrade`, the Bergen prize, the drips) · the render grammar (`shopgrid` + ⊞/⊟, `pfit`,
`fitCards`, the wharf grid, `HC.playerBoard`) · the MC pair, `humanGate`, `actorSeat`,
`maybeRunAI`, the tiers, the harness discipline.

**Change:** the Harbor handler (mandatory commission; `commPlace` → `enterPost` on that lane; ALT
`kbuild`/raise) · the Market ALT `source1` → `cart` · the Brewhouse ALT `brewtop` → `pbuild` ·
`canTake` (Ready · Q ≤ `qualityCount` · lane open · not Gruit · berth free) · `landDeliver` (face
+ own building die; park; tick every building there; +⚜; prize) · `checkDiceEnd` on `p.supply` ·
`scorePlayer` buckets · `gameOver` (docked pips) · the Flight re-keyed on LANDING · the recap
diffs · `diagText` · `studioPayload` keys · `SRC_PRIMARY` 2.

**Retire whole:** the Bourse (`tracked/bourseVal/bourseShift`, `S.bourse`, the glut, the Coper) ·
contracts and demands (`CONTRACTS7`, `DEMANDS7`, `claimContract`, `cpick`, `landPresent`,
`landCanPresent`, `refillContracts/Demand`) · the ladders (`LADDERS`, `S.ladder`, `ladder*`) · the
flag (`FLAG_FEE`, `flagOut`, `commFlagOK`, `t.own`) · the Ventures and the ledger (`VENTURES`,
`ledgerTick`, `vAt`…, `enterVact`, rack/assay; the FLIP grammar is RE-USED for the private tiers)
· the second kettle (`brewtop`, `sur`) · SAIL-now as a STATION verb (the code stays as the Shipmaster's stop) · presence placement (`addPresence`, `reach`,
the tour, `bonusPres`) · prize-as-★ (`PRIZE_PTS`, `prizeStars`), the Novgorod premium (`vbonus`),
the demand line · the outnumber gate (`laneOpenFor` as written, `DEST.gateway/gate`) ·
`trayDice/diceInFlight/presPool/spendPresDisc` · the Guild Tastings and Trade Roads blocks and
the specialty/Jopenbier wiring (git keeps them; the expansion spine stays as a seam) · the dormant
`commitBldg` family.

**New:** the sea state and its reads · the eleven-dice supply and the starter phase · the
Harbor's post and Kontor build · wild Ships · the yard/hall split · invitations from landings ·
the private ladder · the prizes (London any-build, Novgorod raise) · the scoring.

#### 13.5.2 The state model

```
// constants (⚙ unless "ruled")
SUPPLY_DICE 10 (ruled) · STARTER_DIE 1 (ruled, counts)
SEGMENTS { w1 'the Wadden Coast', w2 'the Dover Strait', e1 'the Skagerrak', e2 'the Sound' }
LANES { london:['w1','w2'], bergen:['e1'], novgorod:['e1','e2'] } · FAR = [london,bergen,novgorod]
KONTOR_SLOTS kontorSlotsN(n) = n>=4 ? 3 : 2 (side B prints 3, the third covered at 3p) · POST_ORDER 'prefix' · POST_TICK 'any-sail' · BLDG_TICK 'any-landing'
LANE_MODE 'public' (dial 'own') · GRUIT_SEA false · SRC_PRIMARY 2 · CART_GOODS 3
HALL_DIE_START 2 · HALL_PLACES {A:6, B:8} · HALL_MIN_Q 2 · INV_PER_LANDING 1 · START_INV 0
MAJ_PAIR { london:[5,2], bergen:[5,2], novgorod:[7,3], bruges:[4,2] } · FLIGHT 3/6/10 on landed · MAX_ROUND 18
SHIP_DECK_MIX 18 (per Kontor cog×3 hulk×2; wild cog×2 hulk×1) · COMMISSION_COST {cog:{}, hulk:{g:1}} · MAIDEN_LOAD 1
CASK_ACT_POOL [source, age, load, lift, brew, recipe, build, post, spec] · LIFT_CAP 'q+1' · Gruit act 'none' (no tile, no search)
RECIPE_FEE {broyhan:{h:1}, keut:{g:1}, mumme:{g:1,h:1}, bock:{g:1,h:2}} · recipeFeeFor(p,st) = scriptorium ? {} : RECIPE_FEE[st] · hasRecipe(p,st) = p.recipes.includes(st) || guildhall
INV ceiling: none (16 printed)
PRIVATES { granary/kaufhaus (A) · scriptorium/guildhall (B) · coldstore/lagering (D) · counting/shipping (C) } · T1_FEE {g:1,h:1} · FLIP_FEE {g:2,h:1} · REPLACE_FEE +1G
WORKS_DEAL {2:6, 3:6, 4:4} · NOV_PRIZE 'raise' · PILE_RETURN false (the tile parks under the die)

S = { players, turn, active, first, ending, endReason, over, log, exports, piles, phase:'starter'|'play', starterQueue,
      slots{ sid → null | {type:'ship', ship, dest:'london'|'bergen'|'novgorod'|'wild', load:[cask]} },
      buildings{ sid → null | {b:key} | {p:key, tier, owner} },
      sea:{ posts:{ w1:{pid→face}, w2, e1, e2 }, kontor:{ london:{slots:[null|{pid,face}]}, bergen, novgorod } },
      hall:{ die:2, places:[null|{pid,style,q,face}] }, yard:[{pid,style,q,face}],
      shipDeck, shipDisplay, impDeck, impDisplay, sailed, sessionId, endedAt, studioSent, schema }
P = { id, name, color, ai, grain, hops, storage, cell, placed, supply:10, vessels[3], recipes[], upgrades[], invites:0,
      hand:['granary','scriptorium','coldstore','counting'], delivered:[{style,q,dest,val,face,bdie,hall?,yard?}], bank, _recap }
      // no landed{} cache: flightBeers(p) = distinct styles in p.delivered (the tile under the die)

// derived, never stored
qualityCount(p) = posts of p + building dice of p (GLOBAL; the starter counts)
countAt(p,sid)  = qualityCount(p) + (Customs House at sid ? 1 : 0) + (Lodesman ? 1 : 0)   // the cart reads countAt(p,null)
canShipQ(p,q,sid) = q <= countAt(p,sid)
hasChain(p,k)   = LANES[k].every(seg => S.sea.posts[seg][p.id] != null)     // your OWN die on every segment
segUnlocked(seg)= Object.keys(S.sea.posts[seg]).length > 0
laneOpenFor(p,k)= k==='bruges' ? false : LANE_MODE==='own' ? hasChain(p,k) : LANES[k].every(segUnlocked)
nextPostSeg(p,k)= LANES[k].find(seg => S.sea.posts[seg][p.id] == null)    // the prefix rule
bldgDie(p,k)    = (S.sea.kontor[k].slots.find(s => s && s.pid===p.id) || {}).face || 0
canKBuild(p,k)  = hasChain(p,k) && !bldgAt(p,k) && an open slot && p.supply>0
canTake(p,c,sid)= ship at sid && berth free && caskReady(c) && c.style!=='gruit' && canShipQ(p,c.q)
                  && (ship.dest==='wild' ? FAR.some(k=>laneOpenFor(p,k)) : laneOpenFor(p,ship.dest))
landingValue(p,c,k) = clamp(c.die, 1, q+1) + bldgDie(p,k)
hallValue(c)    = clamp(c.die, 1, q+1) + S.hall.die
mustCommission(p) = at the Harbor && display non-empty && (a shipless slot or an EMPTY hull) && some hull affordable
endTrigger()    = S.players.some(p => p.supply <= 0)
seaPips(p) · dockedPips(p) · parkedAt(p,k) = k==='bruges' ? p's dice on hall places : p's dice in k's field   // the yard weighs nothing
the hall die is neutral: never in seaPips, the identity or any count
```

**The component-state invariants, asserted by the battery:** (1) the eleven-dice identity holds
after every mutation: `supply + vessels + aboard + posts + building dice + delivered = 11`; (2) the
count, the chain, lane openness, the majority, the Flight and the end trigger are functions of
the pieces, never cached; (3) a die's face is its whole record; (4) `p.invites` is a count with
no history; (5) a landing's value is frozen at landing and equals face + building die; (6) every
`UI.pending*` queue is empty before `endTurn` completes.

#### 13.5.3 The turn machine and the handlers

- **Setup and the starter phase.** `freshState`: `p.supply=10`, no warm Gruit, `S.sea` empty,
  the hall die at 2, the Works dealt, the deck 18 shuffled, no hull docked. `UI.sub='starter'`: in
  reverse order each seat picks W1 or E1 (`starterPick(seg)` stands the eleventh die at 1
  without touching the supply); then `S.phase='play'`. `boot` restores `starter` when
  `S.phase==='starter'`; `actorSeat()` returns `S.starterQueue[0]` in that phase.
- **Market.** PRIMARY `enterSource(2)`. ALTERNATE `cart`: pick a Ready cask with `canShipQ` →
  `cartdoor`: **YARD** (always) → `yardLand` (park in `S.yard`, `enterSource(3)`, then the recipe
  prize through the pending pipeline) · **HALL** (`invites>0 && q>=2 && an open place`) →
  `hallPresent` (−1 ⚜, score `hallValue`, park on the next place, `S.hall.die++`).
- **Brewhouse.** PRIMARY kept; `brewCommit` calls `spendDie`; the pool is nine verbs.
  ALTERNATE `pbuild` (below). `fireCaskAct` v8: `source`→2 goods · `age`→`enterAge(2)` · `load` ·
  `lift` (boarding) · `brew` · `recipe`→`enterRecipeGain` · `build`→`enterBuildMenu(free:false)`
  (a wharf tile · a FLIP · a Kontor die) · `post`→`enterPost(ALL_LANES, free)` ·
  `spec`→`enterSpecGain` · `none` is a no-op. `caskCensus` drops the Q3-only brew filter; new
  `CASK_OFF` so each export's six are distinct; Gruit brews take the single-verb branch with no
  search. The Guildhall's second brew is a second `{cell:'B'}` stop pushed by `beginStops`.
- **Harbor.** `beginStops` marks the commission stop `must:true` when `mustCommission(p)`;
  `endTurn` refuses while a `must` stop is still available; `aiStep` resolves it first.
  `commPick` → `commPlace(slot)`: pay, displace an EMPTY hull, dock (`dest` may be `'wild'`),
  `refreshStops`, then `enterPost(lanesOf(dest))` with `postTargets` = the prefix segment of each
  lane (`nextPostSeg`), `postSkip` allowed; then the maiden load. ALTERNATE `kbuild`: pick a Kontor
  from `kbuildTargets(p)` → `spendDie`, a slot `{pid, face:1}`; or `raise`: `enterRaise(rt,
  scope:'sea')`, one prompt shared with Novgorod's prize and the Counting House.
- **Cellar.** Kept.
- **Loading, wild Ships, sailing, landing.** `canTake` as above; `boardDie` keeps the Kiln/Bonded/
  LIFT lifts under the Q+1 cap. When a hull fills: a printed Kontor → `sailShip` at once; wild →
  `UI.sub='wilddest'` (the open lanes; no skip) → `wildPick(k)` sets `sh.dest`, then `sailShip`
  (the suspended `loadCommit` tail becomes `loadAfterCommit`). `sailShip`: the tide · Bonded ·
  the post ticks on every segment of the lane · hull to the deck · `pendingLandings`.
  `landDeliver`: `val=face+bldgDie`; park (no `pileReturn`: the tile stays under the die; `S.yard`
  and the hall places carry `style`); tick every building die at that Kontor; +⚜; prize.
  `afterSail` order: landings (inline, no choice) → the yard's recipe → Bergen's seat → London's
  build → Novgorod's raise → `pendingActs` → `resume`.
- **The prizes.** Bruges (the yard only): `precipe`. Bergen: `bspec`. London: `lprize` =
  `enterBuildMenu(free:true)`: a post (any lane, the prefix rule) · a Kontor die · a wharf tile
  or FLIP (fee waived) · decline. Novgorod: `nprize` = `enterRaise(scope:'sea')`.
- **The specialists' hooks.** Braumeister (turn start, kept) · Shipmaster (`beginStops` pushes a
  `{kind:'shipmaster'}` stop at the Harbor: the kept `sailNowShips/enterSailNow/sailNowPick`,
  naming a wild hull's port) · Cellarman (kept) · Stevedore (kept) · Agent (`landDeliver`'s tick
  loop: +1 more on the Agent's building when the lander is a rival) · Lodesman (`countAt` +1) ·
  Carter (`cartN(p)` +1; the yard pays 4) · Guildmaster (`hallPresent` +2★ to `bank`; keyed
  `gmaster`, never `guildmaster`, which is an AI tier) · Chronicler (kept) · Alderman (end line).
  `buildImpDeck` = the ten singles, one copy each.
- **The private ladder.** `PRIVATES` as data (station · tier · req · fee · kind); `enterPBuild`
  → pick a key → `placepriv` (a glowing flank slot) → `commitPrivate` (over a Work +1G, the Work
  boxed; a tier 2 only on your own tier 1 of that station); the owner-only `pact` stop in
  `beginStops`, dispatching by kind (`enterSource(1G1H)` · the Kaufhaus's cart 2, the `cart`
  flow looping like `enterLoad` with `cartN = 1 + kaufhaus + carter`, each cask choosing its own
  door · the Scriptorium/Guildhall as passive reads in `recipeFeeFor`/`hasRecipe`/the second
  brew stop · the Cold Store's `enterAge(2)` · the Lagering lift as the kept `vlift` flow on a
  Ready vessel · the Counting House's `enterRaise` · the Shipping Office's `enterPost`).
- **The end.** `spendDie` → `checkDiceEnd` → `S.ending`; `endTurn` finishes the round; `gameOver`
  scores `deliv + hall + sea + docked + maj + flight + guild + bank`; vessels 0; tiebreak the
  count, then goods.
- **The human-gate heads.** `humanGate/actorSeat` read the owner `pid` on `UI.post`, `UI.kb`,
  `UI.raise`, `UI.pb`/`placepriv`, `UI.buildmenu`, `bspec`, `nprize`: London's any-build on a
  rival's sail may open a wharf placement for a non-active seat.
- **The `UI.sub` roster:** `starter · move · stops · source · cart · cartdoor · brew · brewverb ·
  age · load · wilddest · commission (stage place) · post · kbuild · raise · buildmenu · pbuild ·
  placepriv · pact · sailnow (the Shipmaster only) · recipegain · specgain · precipe · bspec ·
  lprize · nprize · end`. Retired: `parti ·
  placebldg · reach · build · placevent · sailnow · rack · assay · landc · cpick · copshift · tour
  · pour`.

#### 13.5.4 Render (the existing grammar only: components big, prose small)

- **The Sea panel** replaces `renderDests`: the dormant `.seamap` grid — Hamburg's cap, the segment
  cells (name, one seat square per colour, a filled seat = `dieFace` in the colour; glowing when
  a legal post target), the Kontor caps (crest, pair, prize icon, the building slots as die seats,
  the field's parked casks as value chips); the panel header carries one chip per player:
  `ownSq + qualityCount` ("your dice at sea = the quality you may deliver"), a mirror of a count
  made by eye. **Bruges** as a fourth row: the road, the yard's parked casks, the hall as a
  `shopgrid` strip of places with the hall die BIG at its head. The ⊞/⊟ toggle switches compact and
  wide.
- **The wharf grid**: `pBldgFace` gains the private branch (`HC.privateTile`, the owner ring, no
  ledger seat); a wild hull prints a dashed destination seat, the Kontor chit overlays it once
  named; station alt icons `A:cart · B:build · C:kontorhaus · D:package-plus`.
- **The Harbor dialogs**: `commission` (kept) → `post` (the legal prefix segments glow) ·
  `kbuild`/`raise` (the eligible caps glow) · `wilddest` (the open caps glow, no skip) ·
  `cartdoor` (two buttons: THE YARD · +3 goods · a recipe / THE HALL · ⚜ · die + hall die).
- **The sidebar**: the ship display (wild included) · the specialist display · an Invitations
  line per player · the Clock reads `p.supply` as a pile of die glyphs "/10" · the player board
  gets the supply seat and the ⚜ count; the delivered tags mark yard/hall.
- **`components.js`**: `CASK_POOL` to nine verbs (Gruit blank) · recipes with fees only ·
  `SHIP_DEST` + Wild (a dashed seat, no gate chip) · `SHIP_DECK` 18 · `BUILDINGS` filler (Customs
  re-faced; Weigh House, Staples behind `v8:false`) · `VENTURES/ventureTile` → `PRIVATES/privateTile`
  (the `btile` anatomy, T1/T2 chip, no ledger seat) · NEW `seaBoard(side)` (the print face) · NEW
  `inviteToken` · `playerBoard` (11 dice, the supply seat, the Flight 3/6/10) · `IMPROVE` re-cut.
  `print.html` and `rulebook.html` inherit every face and every number from `HC` or restate each
  once.

#### 13.5.5 The AI seats, and the sim built to capture depth (THE OVERRIDE)

- **What `aiStep` learns:** `aiStarterPick` (E1 by default; the merchant persona W1) ·
  `aiPostValue(p,seg,free)` = expected pips + the count gain (a held recipe's Q = count + 1 → +3 ⚙)
  + the chain gain (+2 ⚙ toward an open slot) + lane-opening value − the die's cask value ·
  `aiCountTarget` (never brew a die you cannot ship within two visits) · `aiCommValue` prices
  the whole act (berths + its best post + the maiden load; a wild hull the max over lanes) ·
  `aiKBuildValue` (own landings expected × (1 + ticks) + pips + the count) · `aiCartDoor` (the hall
  when `face + hall die` beats 3 goods and the recipe need; a Gruit always the yard) ·
  `aiWildPick` (Σ landing value + majority swing + prize) · `aiPBuildValue` (uplift per visit ×
  visits left − fee) · the nine verbs in `aiVerbValue` · `aiLondonPick`, Novgorod's raise on the
  busiest lane's lowest post · `aiLateGame` on `min supply ≤ 3`.
- **The MC pair:** `AI_MC_SUBS` += `starter post kbuild raise cart cartdoor wilddest pbuild
  placepriv lprize nprize`; `aiMCOptions` enumerates every legal target; the rollout policy is the
  trader; `scorePlayer` stays the value function.
- **Personas built to capture depth:** `brewer · merchant · hall · majority · builder ·
  specialist · breadth`, plus `MIX=1` (one persona per seat at random per game). **The law: no
  system may be judged dead unless a persona committed to it ran in the corpus, and every report
  prints USAGE before VALUE** (per verb, tile, specialist, building and prize: fired per seat,
  then the committed lane's win rate). A recommendation to cut a part must cite the committed lane.

#### 13.5.6 The battery (`playtests/verify-v8.js`, ~75 checks in 15 groups) and the sim counters

0 identity and setup (KEY · supply 10, no warm Gruit, no hull docked · the starter phase in
reverse order · Works dealt, no bag · deck 18 with 3 wild, no Bruges hull · the hall die at 2,
neutral: in no count, no identity, no pips · no contract/demand/ladder/bourse fields) · 1 the supply and the end (`spendDie` on brew/post/kbuild · the eleven-dice identity
after every verb · `checkDiceEnd` at 0 · MAX_ROUND 18 · no verb at supply 0) · 2 the quality count
(global · the starter counts · Hopped 2, Bock 5 · the same read at every port and the cart ·
`canTake` refuses above the count · a building raises it) · 3 the chain (your OWN die on every
segment · Novgorod needs E1 and E2 · two players may each hold a chain · one builder per slot ·
one per player per Kontor) · 4 the mandatory commission (`must` when possible · `endTurn`
refuses · no must when the display is empty or every slot holds a loaded hull or no hull is
affordable · the AI resolves it first · EMPTY-hull displacement) · 5 the post (only that Ship's
lane · the prefix segment · a wild hull offers every lane · a full chain offers none · no fee ·
the tile and London's prize offer every lane · the maiden load after the post) · 6 lanes, loading,
wild, sailing (public/own modes · a wild berth needs an open lane · `wilddest` on the last load ·
no STATION verb sails unfull, the Shipmaster's stop does · the post tick on every segment sailed
· the tide · Gruit never boards · Customs and the Lodesman read +1 on the count) · 7 landing
(face + own building die · no building → face · every building there ticks · no premium/market/
demand/★ · boarding order · the tile parks) · 8 Bruges (the cart's doors, `cartN` casks · the yard's 3 goods and
recipe · the hall's ⚜, next place, face + hall die, the die climbs, no recipe · Gruit never
presents · the yard weighs nothing, the hall places ARE the Bruges weight · no bonus on the cart) · 9 invitations (1 per far
landing · none from Bruges · a count, no cap) · 10 prizes (Bergen a seat · London any build ·
Novgorod a raise · the recipe tile at its fee) · 11 the private ladder (flank slots only · over a
Work +1G · never over a rival · tier 2 on your own tier 1 · one per player per station ·
owner-only stops · the Guildhall's recipe read · no die) · 12 the end (docked dice at face only
· vessels 0 · every sea die's pips · fixed pairs, the presence gate, ties split · the Flight on
landed · the buckets · the tiebreak) · 13 Gruit, aging, no kettle (1G, Ready at brew, no tile, no search,
the yard only · no die turns by itself · brew needs only recipe, goods, a vessel and a die · the
second kettle is gone) · 14 the retired symbols are undefined · 15 the AI never stalls (every
`UI.sub` has a case · a 3-seat game runs to `S.over` · the human-gate heads).

**Sim counters:** commissions (must-forced share) · posts per seat and segment · Kontor builds
and raises · chains completed · the count at the end · casks stranded by the count · sails, wild
sails by port · landings by Kontor · the landing value split (face vs building die) · post and
building ticks · sea pips' share of the score · docked dice at the end · ⚜ earned/spent/held ·
hall presents (by place, by Q) vs Kontor landings · yard casks (Gruit vs Q2+) · recipes by door ·
private builds per key and the tier-2 rate · Works fired · specialists seated and the win rate of
seats holding each · search-brew verb picks · end trigger (supply vs backstop) · rounds and the
10–15 band · the margin by bucket · the PERSONAS/MIX lane report, USAGE before VALUE.

### 13.6 THE BUILD ORDER

Each phase is one commit on the feature branch, gated, then fast-forwarded to `main` the same
turn. The battery is `verify-v8.js` from phase 1; the v7 build and its instruments are frozen at
`archive/v7/` in phase 0. Sizes are lines of `play.html` touched/new.

| # | Commit | Content | Gate | Size | Risk |
|---|---|---|---|---|---|
| 0 | **Freeze v7.0b** | copy the root build + `verify-v7.js` + `sim.js` to `archive/v7/`; `V7-PLAN.md` closes with the pointer | the v7 battery green from its own folder | copy | none |
| 1 | **The docs first** | `RULES.md` v8.0 from §13.2 · `COMPONENTS.md` §0 · `STYLE.md` §4 registry · `DESIGN.md` §6/§9/§10 · `AUTOMA.md` | every number states once; the registry has no orphan | docs | drift between the sheet and the engine: the engine's constants are copied from the sheet, never invented |
| 2 | **The supply, the sea data, the end** | `KEY hanse-v80a`; `SUPPLY_DICE`, `p.supply`, `spendDie`, `checkDiceEnd`; `SEGMENTS/LANES/FAR`, `S.sea`, `S.hall`, `S.yard`; the derived reads; the starter phase; DELETE every retired system with its call sites (render, diag, recap, AI); `landDeliver` two dice + ⚜ + the building tick; `scorePlayer` v8; `gameOver` docked pips; a minimal `aiStep` case for every new prompt (a random legal pick; `starter` → E1) | groups 0–2, 7, 12, 14 green; `sim.js 3` crash-free | −1500 / +350 | the biggest diff; a surviving call site throws at load: open the page in a browser before pushing |
| 3 | **The sea board render** | `renderSea` on `.seamap`, the caps, the count chips, Bruges (yard + hall strip + the hall die); `renderVoyage` supply pile; `renderShop` minus contracts; `renderTableaus`; the aid | group 0 green; a visual check at desktop and phone width | +260 / −180 | fit on phone |
| 4 | **The Harbor** | `must` stops and `endTurn`'s refusal; `enterPost/postPick/postSkip` after `commPlace` (the prefix rule); `kbuild`/`raise` as the ALT; the post ticks in `sailShip`; the prompts and the glowing map; minimal AI cases | groups 3–5, 6 (ticks) green; `sim.js 3` | +320 / −90 | the `must` rule vs "all stops optional": the End Turn button and the AI both read `mustStopsLeft()`; a stuck bot shows as a runaway |
| 5 | **Loading under the count, wild Ships** | `canTake` v8; `wilddest` (the suspended `loadCommit` tail → `loadAfterCommit`); the deck 18 with wild; `shipCard('Wild')`; `boardDie` under Q+1 | group 6 green; `sim.js 3` | +160 / −60 | the mid-load prompt inside a Stevedore double load; save/load mid-`wilddest` |
| 6 | **Bruges** | `cart/cartdoor/yardLand/hallPresent`, the hall die, `INV_PER_LANDING`, `precipe` yard-only, the Flight on landed | groups 8–9 green; `sim.js 3` | +220 / −40 | the yard's prize on the active seat's own turn: route through `afterSail` as today |
| 7 | **The private ladder** | `PRIVATES`, `pbuild/placepriv/commitPrivate`, the `pact` stops, `privateTile`, the Scriptorium/Guildhall reads, the Kaufhaus cart 2, the Lagering lift, the Counting House raise, the Shipping Office post | group 11 green; `sim.js 3` | +280 (+60 components.js) | flank-only ground vs the Works: a 4p table can lock a station's two slots early; the counter "private builds per station" reads it |
| 8 | **Prizes, specialists, Works filler** | `lprize/nprize`, the `spec`/`post`/`build` tiles, the roster re-cut, Customs re-faced, Weigh House and Staples out, `WORKS_DEAL` | groups 10, 13 green; `sim.js 3` | +150 / −80 | low |
| 9 | **The AI seats** | the value functions above replacing the minimal cases, `AI_MC_SUBS` + `aiMCOptions`, the seven personas, the human-gate heads | group 15 green; `sim.js 5` crash-free at 2–4p | +420 / −150 | the largest judgement surface; greedy first, MC options second; the deadlock guard must never trip |
| 10 | **The battery and the harness, whole** | all 15 groups; the sim counters; `MIX=1`; the USAGE-before-VALUE report | all green; `sim.js 10`: 0 crashes, 0 deadlocks | +450 / +120 | none to rules |
| 11 | **The kit and the book** | `print.html` (the sea board sheet A/B, 18 Ships, 52 casks, 16 private tiles, 16 ⚜, the filler Works, the v8 aid), `rulebook.html` re-derived from `RULES.md` v8.0, `index.html`, `nav.js` | the fit check per page; the render smoke | print +300; rulebook whole | the kit and the engine must state the same numbers: each read from `HC` or restated once |

Playable hot-seat after phase 4; every verb after phase 8; the mirror complete after phase 11.
Total ≈ −2100 / +2600 lines in `play.html` (≈4900 after), +150 in `components.js`, two new harness
files. Every phase lands on `main` the same turn it passes its gate. Every phase from 2 on ships a
minimal `aiStep` case for each new prompt so the smoke never stalls (a `must` commission or a
`wilddest` with no case would loop).

### 13.7 The rulings still needed (ranked by what each unblocks; the default the build ships)

1. **Sailing an unlocked lane.** Once every segment holds anyone's post, may every player load
   toward that Kontor (**default**), or only players holding their own post on every segment?
   Decides whether a brewer-only seat can sell at all and what wild Ships mean.
2. **The building die's climb.** +1 on any landing there plus RAISE (**default**), own landings
   only, or rival landings only.
3. **Do the wharf's private buildings take a die?** **Default no**: goods bind the wharf, dice
   bind the sea.
4. **Per-port die minimums.** None (**default**: the count is the player's gate, the port adds
   none; the wild Ship's "quality rules" are the count); v7's 2+/2+/3+ as the port's gate on the
   die if Novgorod needs an identity or the wild namer needs a bound.
5. **The tree.** Five segments, E1 shared (**default**), or one more in the east.
6. **The hall's payout.** The hall die from 2 (**default**) or a printed rising bench; and whether
   die + 2 to die + 6 is the "easy benefit" that competes with a 5/2 or 7/3 pair.
7. **The invitation rate.** One per cask landed at a far Kontor, none from Bruges, start with
   none (**default**); per landing Ship; per first landing per Kontor.
8. **Building slots.** 2 on A, 3 on B with the third at 4p, one per player per Kontor (**default**).
9. **The Hulk.** No gate (**default**), or only toward a Kontor where a building stands.
10. **The prizes' reach.** London any build with the fee waived (**default**) or posts and Kontor
    dice only; Novgorod's raise (**default**), or 2 goods, or an ⚜.

Held for the table, not the designer: a warm Gruit at setup (off), Works 6/4, the private faces
and fees as drafted, the specialist roster, the Flight's 3/6/10, MAX_ROUND 18.

### 13.8 Process: what this plan changes in the charter

- **The second override lands in `CLAUDE.md` §1** (§12.5 verbatim): optimizing cancels depth; the
  sims are built to capture asymmetry and interlock or they are not judges; USAGE before VALUE.
- **The phases law is re-cut**: the designer asked for the plan to build the rules AND the mirror,
  so the sequence is **the docs (phase 1) → the mirror (phases 2–11) → the designer's own table on
  the mirror or the kit → the oracle read**, never a corpus before a human table. "Paper first,
  no engine change until P3" (§9) is superseded by this section; the mirror IS the paper for a
  designer who plays it.
- **The page "Brewer & Merchant" is re-cut whole from §13** the same day, and `CLAUDE.md` §7 and
  `DESIGN.md` §10 state the ruled game in one paragraph each.

### 13.9 The cross-check (the two lenses read the merge; what changed)

The rules lens returned 20 corrections, the engine lens 23. Applied above: no automatic aging
*except by a specialist* · the maiden load is a LOAD in every respect · the hall parks the tile
under the die · a parked cask die never scores again · the undealt export to the box; no hull
docked at setup · the Shipmaster names an unfull wild Ship's port · a private building may stand
under a Ship; at most one per station · the specialist roster states every retirement · the
Brewhouse ALT may replace a Work · the teach's Harbor sentence · Kontor chits (3) in the box ·
"minimum" retired from the registry · the M2 rationale's misquote struck · Hopped's twelve print
the nine, three twice · **the warm Gruit dropped** (ten in the supply, a table dial) · **Gruit
takes no tile** (its sixteen retire; a tile-less parked die IS a Gruit; cask tiles 52 → 36) ·
RAISE is one prompt over any die of yours at sea, shared by the Harbor arm, Novgorod's prize and
the Counting House · the Lagering lift is the kept vessel lift · `hand` on the player, no
`landed` cache · `RECIPE_FEE` and the Scriptorium/Guildhall reads · `countAt` with the Customs
House and the Lodesman · Bruges' majority by hall places in `parkedAt` · `buildmenu` behind the
BUILD tile and London's prize · the Guildhall's second brew as a stop · the cart loops for the
Kaufhaus and the Carter · `kontorSlotsN` · the tile stays under the die everywhere · `boot`
restores the starter phase · the hall die is neutral in every count · no ⚜ ceiling · every build
phase ships minimal AI cases · the building tick lands in phase 2. **Kept against the rules
lens's objection, as the designer's questions** (§13.7): no printed per-port minimums (q4), the
building die climbing on any landing (q2), no Hulk gate (q9).

### 12.10 The designer on the merge calls (2026-09-06, on reading §13), verbatim

> Kontor buildings are tiles and ownership is marked with the builder's die. I would live to
> have a whole set of Kontor buildings to make the deliveries more interesting and variable.
>
> Building dice are one of two things. I think Kontor buildings are dice that mark a delivery
> modifier. They can be worth points at the end for consistency. The wharf buildings can have
> dice or they can simply be tiles which are worth face value. You upgrade/replace them to make
> them worth more. I think we make the wharf tiles have printed values on them instead since
> dice is a tight race. For posts, dice increase as ships pass them regardless of who has casks
> loaded on the ships.
>
> Tree of posts grows from Hamburg kind of like a tech tree. No blocking between players but the
> string of posts always starts at Hamburg. You can do it all so you pick a lane.
>
> Each Kontor still has quality minimums. 2 for London, 3 for Bergen, 4 for Novgorod. This is an
> adjustment. It shifts the building bonus into the most accessible port and motivates upgrades
> to higher quality brews.
>
> Yea, wild ship is chosen by the first loaded cask so we need a way to track this. It may be
> finicky.
>
> The hall gains value as the collection of brews grows - I like this. Maybe the first brews
> also give an action/resource prize. They still require invitations.
>
> Post costs an action to put it there and a die, no goods.
>
> Gruit takes a cask tile and a die but there is no search because they all have the gain 2
> goods bonus. Gruit must also be brewed in a vessel but there is no aging as it is ready on
> brew. No change from the previous versions.
>
> Lift cap is +1, that means die lift bonuses only happen in the wharf buildings. This means the
> highest die value is 6 (bock plus 1, how about that? Perfect for a D6).
>
> A lane once opened with anyone's posts is open to all.
>
> I don't make comments on the artifact, just here. Let me read the plan and then I'll give you
> the go. Capture the comments here while I read the plan.

**The reading, and what each changes in §13 (applied at the go):**

- **Kontor buildings are tiles, from a SET, marked with the builder's die.** M1 overturned. A
  building is a tile placed in a Kontor's slot with the builder's die on it; the die is the
  delivery modifier (cask die + your die there) and scores its pips at the end. The set is a
  roster of Kontor building tiles with varied effects on deliveries there, a design pass of its
  own (like the Works roster). The engine: `S.sea.kontor[k].slots[i] = {tile, pid, face}`; a
  Kontor-building deck and display; `kontorBuildingTile` returns to `components.js`; the box
  gains the set. Open: dealt to the slots at setup (a fixed market per game) or drawn from a
  display when you build; and the roster's effects.
- **Wharf tiles carry printed values; no dice on the wharf.** §13.7 q3 ruled no, and more: a
  private building prints a value (worth "face value"), raised by the FLIP or a replacement.
  Read as ★ at the end per standing tile (tier 1 low, tier 2 higher) beside its verb; the
  numbers are the designer's. `PRIVATES[key].pts` and a `wharf` scoring bucket.
- **Posts climb on any sail, regardless of whose casks.** M2's post half confirmed; the prefix
  tree from Hamburg confirmed (M3); "you can do it all so you pick a lane".
- **Per-port quality minimums return: London 2 · Bergen 3 · Novgorod 4.** M4 overturned, with
  new numbers (v7 was 2/2/3). London is the accessible port and the place a building bonus is
  worth most; Bergen wants an export; Novgorod wants a Mumme or a Bock. Read against the beer's
  printed Q like the count (the die is the dial). `KONTOR_MIN {london:2, bergen:3, novgorod:4}`
  in `canTake` and in `wildDests`; printed on the panels and the Ship tiles.
- **A wild Ship's port is named by the FIRST cask loaded.** The Kontor chit goes on the hull at
  the first load; every later load reads it like a printed hull. Finicky at the table; the chit
  is the tracker. `loadCommit` on an empty wild hull opens `wilddest` before the load resolves.
- **The hall die stands; the first places may print a small prize** (an action or a resource)
  beside the die's climb; invitations still required. `HALL_PLACES[i].prize` as a seam.
- **A post costs an action and a die, no goods.** M6 confirmed.
- **Gruit takes a tile and a die, no search; every Gruit tile prints Gain 2 goods; brewed in a
  vessel, Ready on brew.** The §13.9 "Gruit takes no tile" is overturned: Gruit's sixteen tiles
  return (cask tiles 52), the stack is uniform so there is no search. Open: whether the tile's
  Gain 2 goods fires at the yard (then a Gruit pays 3 + 2 goods for one grain) or the yard's
  three goods is the payoff and the tile rides only as the Flight's record.
- **The LIFT cask bonus goes; lifts live only on wharf buildings; the cap is Q+1, so 6 is the
  top face.** `CASK_ACT_POOL` drops `lift` (eight verbs); the Lagering Cellar and the Malt Kiln
  are the only lifts.
- **A lane once opened with anyone's posts is open to all.** §13.7 q1 ruled public.
- **Comments come here, never on the artifact.** The page is re-cut after the go.

### 12.11 The go (2026-09-06), verbatim

> Kontor buildings start in your player supply.
>
> Yes, tier two require more work to upgrade so they are worth more. We can discuss what this
> looks like but right now, make them worth 2 points for the front and 4 on the back.
>
> Gruit's gain 2 goods was gained on load. Maybe we switch things up. Make it gain 2 goods on
> cart and you put your gruit die in Bruges. Bruges has a track, You gain the prize on the track.
> At first, you can choose a recipe or an extra 2 goods. As the track progresses, the benefit
> reduces. So early gruit is more option. I think it can be 3 zones for the benefits - best,
> good, ok. This makes the gain 2 vs cart gruit more interesting as well. At first, if it's gain
> 2 va gain3, why bother brewing gruit. It also makes me wonder if the cart action should be on
> Cellar station instead since it's pretty much the same action as source early.
>
> Right. Minimum beer to a Kontor is the Kontor quality. Minimum ready value is printed on the
> cask tiles, no change on either of these from before.
>
> Remember, brewing gruit is still a thing. You still gain the tile, use the die, and deliver it.
> The difference is there is no search because they all have the same bonus and you cart
> instead of load.
>
> No need to archive v7. It was a bust. Read the docs before building.
>
> I'm reading the artifact but it has open questions we already addressed.
>
> Your cask can sail a lane as long as anyone has unlocked it. This addresses the finicky rule
> of only some of the casks can go, etc.
>
> Building dice increment one for any ship landing regardless of ownership landing.
>
> No dice on wharf buildings. Just points printed on the tiles.
>
> Per port min should all be the same right now, plus 2.
>
> The tree is fine.
>
> Ok. That's it. Update the plan then compose the rules, build out play.html updating
> components and other elements as needed following style.md, then report back when done. Once
> all of that is done, I'll give you the next instructions.

**The reading, as built:**

- **Kontor buildings: each player's own set.** Three tiles per player ⚙ (Warehouse · Kontorhaus
  · Guildhouse), each with a different landing effect, each usable once, at any far Kontor whose
  branch you hold; placed in a slot and marked with a supply die at 1. The die adds its face to
  every landing of yours there, climbs +1 on any landing there, scores its pips. One per player
  per Kontor. Twelve tiles in the box.
- **Wharf tiles print points: 2 (tier 1) · 4 (tier 2).** No dice on the wharf. Scored at the
  end per standing tile.
- **Gruit and the yard.** Gruit's tile prints *Gain 2 goods* and fires on the CART (every cask
  bonus fires on the cart as on a load). The yard is a track of places in three zones; the
  carted die parks on the next place and takes the zone's prize: BEST (places 1–3 ⚙): a recipe
  at no fee OR 2 goods · GOOD (4–6): a recipe at its fee OR 1 good · OK (7+): 1 good. Any beer
  may go to the yard; Gruit may go nowhere else. The yard's three fixed goods (F7) are replaced
  by the tile's two plus the zone's prize.
- **The cart moves to the Cellar** (AGE 3 / CART 1) and **LOAD 1 to the Market** (SOURCE 2 /
  LOAD 1), a dial `CART_STATION`: the designer's reason is that source and cart were the same
  early choice at one station.
- **Minimums: Q2 at every far Kontor** (the beer's printed quality); the cask's Ready value
  prints on its tile as before.
- **Gruit brews as before**: a die, a vessel, Ready on brew, a tile without a search, then the
  cart.
- **No archive.** The root build is replaced in place; the v7 instruments are replaced by the v8
  ones.
- **Lanes public · building dice tick on any landing · the tree · no dice on the wharf**:
  confirmed as read.
