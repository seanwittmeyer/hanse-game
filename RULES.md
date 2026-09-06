# Brewhouses of the Hanse — The Rules (v8.0 "Brewer & Merchant" · test build)

*The one rules document. Clean operational rules only — the v8 program, the designer's review
and the implementation plan live in `V8-PLAN.md`; design rationale in `DESIGN.md`. Numbers
marked ⚙ are tunable placeholders. This is the v8.0 test build: `play.html` (`KEY hanse-v80b`),
this document, `COMPONENTS.md` §0, `STYLE.md` §4f, `rulebook.html` and the print kit
(`print.html`) are current.*

**2–4 players · c. 1350 · Hamburg. You run a merchant brewing house of the Hanseatic League.**
Goods are the only currency — no money, no spendable prestige. You must be a brewer and a
merchant: the work runs **Source → Brew → Age → Ship**, and nothing sails without your dice at
sea. The winner is the player with the most ★ when the dice run out.

---

## 1. Setup

Each player starts with (⚙):

- **3 `G` (grain), 2 `H` (hops)** — storage cap **8 of each good**.
- The **Gruit** and **Hopped** recipe cards. More recipes are earned (§11).
- A **player board**: 3 vessels · 2 specialist seats · the space for the **personal supply**.
- **11 quality dice: 10 in the personal supply, 1 the starter post** (below). A die leaves the
  supply as a cask (Brew), a post (Post) or a Kontor building (Build) and never returns. The
  first **empty supply sets the final round** (§14).
- The **hand of 4 private building tiles** ringed in your colour — four designs, tier 1 face
  up (§12).
- The **set of 3 Kontor building tiles** in your colour — Warehouse · Kontorhaus · Guildhouse
  (§8).
- **0 ⚜ invitations.**

Shared board:

- **The Wharf** — 4 stations ringed by 8 slots (§3). **Public Works: shuffle the roster and
  deal 4 ⚙ onto random slots** at every player count — four slots stand open from the start;
  the rest go to the box. Nothing refills a slot.
- **The sea board** — side A (2p) / side B (3–4p): Hamburg at the centre, the cart road to
  Bruges, the five **segments** (§8), each printing one **post seat per colour**; the three far
  **Kontor panels** (London · Bergen · Novgorod), each printing its **building slots** (2 on
  side A · 3 on side B, the third for 4p ⚙), its **minimum**, its **majority pair**, its
  **field** and its **prize**; and the **Bruges panel**, printing **the yard track** (three
  zones), **the hall** (6 places on A · 8 on B ⚙) and **the hall die's seat**.
- **The hall die** (neutral) on its seat at **2** ⚙.
- **Recipes:** deal **3 of the 4 export beers**, **4 copies each** ⚙; the undealt export's cards
  and cask tiles go to the box.
- **Cask tiles** in face-up stacks, one per in-play beer (a Q2+ Brew searches its stack; Gruit's
  stack is uniform and is not searched).
- The **Ship deck** — 18 ⚙: per far Kontor Cog ×3 (2 berths, free) · Hulk ×2 (3 berths, 1 `G`);
  **wild** Cog ×2 · Hulk ×1. Shuffled, display of **3** ⚙. **No Ship is docked at setup.**
- The **Specialist deck** (10 singles ⚙), display of **4**.
- **16 ⚜ invitation tokens**, **3 Kontor chits** (for wild Ships), score discs on the ring.

**The starter post.** In reverse turn order each player stands their eleventh die at **face 1 in
their own seat on the first segment of either lane** (W1 or E1). Every seat begins with one die
at sea and a quality count of 1.

Workers start off the board — each seat's first turn places its worker on any station. First
player fixed.

---

## 2. The turn — Move · work the station

1. **Move** — move your worker to an **adjacent station** (orthogonal; never stay; turn 1 places
   anywhere). Sharing costs nothing.
2. **Work the station** — resolve its stops **in any order**, each at most once, **all optional
   except the one printed *must***:
   - its printed **primary** action;
   - its printed **alternate** action;
   - **each of its two flanking slots** — **load one Ready cask** onto the Ship docked there
     (§7); and **your own private building** standing there fires (§12).

The station is read live — a Ship commissioned onto a flanking slot this visit opens that
slot's load if it has not been used.

---

## 3. The Wharf — four stations, eight slots

```
        A ── B            A  Market     B  Brewhouse
        │    │
        C ── D            C  Harbor     D  Cellar
```

| Station | Primary | Alternate (the same visit) |
|---|---|---|
| **A · Market** | **Source 2** ⚙ — take 2 goods, any mix | **Load 1** Ready cask onto **any** docked Ship (§7) |
| **B · Brewhouse** | **Brew** — pay a recipe's goods; a supply die into an open vessel at the beer's printed start value; **a Q2+ Brew searches the beer's stack and chooses the tile** (§5) | **Build, the wharf** — place a private building from your hand onto any vacant slot, or Flip your standing tier 1, at its fee (§12) |
| **C · Harbor** | **Commission — *must*, when it can** — take a Ship from the display at its fee (**Cog free · Hulk 1 `G`** ⚙), dock it on a shipless slot or over an empty docked Ship (which returns to the deck); the display refills at once. **Then Post**: stand a supply die at face 1 on **the lowest segment of that Ship's lane where you hold no post** (a wild Ship: any lane; a lane you hold whole: no post). If you hold a Ready cask you may load it onto the new Ship now, free — **the maiden load, a Load in every respect** (§7), taken after the post. | **Build, a Kontor** — at a far Kontor where **your own post stands on every segment of its branch**, place one of your Kontor building tiles in an open slot and stand a supply die on it at face 1 (§8) — **or Raise**: turn one die of yours at sea +1 (cap 6) |
| **D · Cellar** | **Age 3** — turn your aging dice up three steps, split freely | **Cart 1** — send one Ready cask of yours to Bruges by road, resolved at once at the yard or the hall (§10) |

*"When it can"* = a Ship is on display, a slot is free or an empty hull can be displaced, and
you can pay one of the hulls shown. Otherwise the commission lapses for that visit.

**The slots flank the stations:** Market **s1·s8** · Brewhouse **s2·s3** · Harbor **s6·s7** ·
Cellar **s4·s5**. **A slot holds one building (bottom: a Public Work or a private building)
and/or one Ship (top) — never casks.**

**The Public Works** (die-less, passive on their own slot's traffic, free for whoever's
traffic it is; the filler roster until the roster pass ⚙):

- **Malt Kiln** (×2): a cask loading here — its die **+1** (cap quality + 1).
- **Customs House**: your quality count reads **+1** for a Ship docked here.
- **Ropewalk**: a load here — you may **also load 1 Ready cask onto a different docked Ship**
  (once per load flow).
- **Cooperage**: the Ship here has **+1 berth** (it sails full only when that berth is also
  full).
- **Bonded Store**: *On load here:* the boarding die **+1** (cap quality + 1) · *On sail from
  this slot:* every player with a cask aboard gains 2 goods, any mix.
- **Victualling Yard**: *On load here:* the boarding cask's bonus fires **×2**.

**The tide: every Public Work departs with the Ship that sails from its slot** (boxed, gone for
good — nothing refills).

---

## 4. The cask & the die

**The die is the cask.** Brew sets a supply die to the printed start value (quality − aging
steps); aging turns it up to the quality (**Ready**) and it never turns on its own; a **lift**
(the Malt Kiln, the Bonded Store, the Lagering Cellar — wharf buildings only) may push it to
**quality + 1 at most** ⚙, so **6 is the highest face**; it is read as it boards; it parks at
landing and **never scores again**.

| Beer | Q | Brew | Start · steps | Tiles ⚙ |
|---|---|---|---|---|
| Gruit | 1 | `G` | 1 · 0 (Ready at brew) | 16, all *Gain 2 goods* |
| Hopped | 2 | `G H` | 1 · 1 | 12 |
| Broyhan | 3 | `G H H` | 2 · 1 | 6 |
| Keut | 3 | `G G H` | 1 · 2 | 6 |
| Mumme | 4 | `G H H H` | 1 · 3 | 6 |
| Bock | 5 | `G G H H H` | 2 · 3 | 6 |

**The eight cask bonuses ⚙:** *Gain 2 goods · Age +2 · Load 1 more (onto any eligible docked
Ship — a normal load; its cask's bonus fires too) · Brew 1 (a full brew at its cost, with its
search) · Gain 1 recipe (from the display, at its fee) · Gain 1 specialist (from the display,
into an open seat) · Build (one build you are eligible for: a private building at its fee, a
Flip at its fee, or a Kontor building with a supply die) · Post (a supply die at face 1 on the
next segment of any lane — no commission needed)*. **A bonus fires once, as its cask boards a
Ship or is carted** (after any sail it completes). Each export's six tiles print six different
bonuses; Hopped's twelve print the eight, four of them twice; **Gruit's sixteen all print
*Gain 2 goods***, so a Gruit brew takes the top tile without a search. A landed tile stays
under its die. An empty stack means that beer cannot brew now.

---

## 5. Brewing and the search

Brew = the Brewhouse's primary, a cask's *Brew 1*, or a Brewers' Guildhall's brew on visit.
Pay the recipe's goods, set a supply die into an open vessel at the beer's start value, and
take a tile from the beer's stack: **a Q2+ brew searches the stack and chooses**; **Gruit takes
the top tile**. You may brew any beer whose recipe you hold; there is no kettle and no licence.
Gruit is Ready at brew; it never boards a Ship (§7) — it goes to Bruges by cart (§10).

---

## 6. Aging

A die turns up only when something turns it: the Cellar's **Age 3**, a cask's ***Age +2***,
your **Cold Store** or **Lagering Cellar** (§12), the **Braumeister** (§13). No good is ever
spent on a step. No automatic aging except by a specialist.

---

## 7. Ships, loading, the berth race, sailing

Ships are shared hulls: **Cog 2 berths (free) · Hulk 3 berths (1 `G`)** ⚙. Each is bound for a
printed far Kontor, or is **wild**. No Ship goes to Bruges. **Nobody owns a hull**; anyone may
load any docked Ship.

- **Commission** (the Harbor, §3): pay the fee, dock the hull, then Post, then the maiden load.
- **Load** (a flanking stop · the Market's Load 1 · *Load 1 more* · the Stevedore): one Ready
  cask from your vessels onto a docked Ship, if all of:
  1. **the minimum**: the beer's printed quality is **Q2 or more** ⚙ (so Gruit never boards);
  2. **the quality count**: the beer's printed quality **≤ the number of your dice standing at
     sea** (§8) — the Customs House and the Lodesman read +1;
  3. **the lane is open**: every segment of the Ship's Kontor's branch holds at least one post,
     anyone's (§8). **A wild Ship with no Kontor yet**: some lane is open to you.
- **A wild Ship**: the player whose cask is **the first loaded** names its Kontor at once — any
  far Kontor whose lane is open — and sets that Kontor's chit on the hull. Every later load reads
  the chit like a printed Kontor.
- Casks are private until they board: the interaction is the **berth race** — topping off a
  shared hull sails everyone's cargo on your clock.
- **A full Ship sails at once.** No station verb sails a Ship unfull (the Shipmaster, §13,
  excepted). On sailing: the slot's Public Work departs with it (the tide) · the Bonded Store
  pays as printed · **every post on every segment of its lane turns +1** (cap 6) · each cask
  aboard **lands in boarding order** (§9) · the hull returns to the deck; the display refills.

---

## 8. The sea board — segments, posts, the chain, the buildings, the count

Lanes leave Hamburg as a tree of **segments** ⚙:

| Branch | Segments from Hamburg | Kontor |
|---|---|---|
| West | W1 the Wadden Coast → W2 the Dover Strait | London |
| East | E1 the Skagerrak | Bergen |
| East, beyond | E1 the Skagerrak → E2 the Sound | Novgorod |

Each segment prints **one post seat per colour**: posts never block; every player may hold
every segment.

- **A Post is a die of yours at face 1 in your seat on a segment.** It costs an action and the
  die — never goods. It enters by the commission's Post (§3), the *Post* cask bonus, the
  Shipping Office (§12) or London's prize (§9). **Your posts grow from Hamburg**: a new post
  always takes the lowest segment of its lane you do not yet hold.
- **A post turns +1 each time any Ship sails through its segment** (cap 6), whoever loaded it.
- **A segment is unlocked while any post stands on it; a lane is open while every segment of
  its branch is unlocked.** An open lane is open to every player's Ships.
- **A Kontor building is one of your three Kontor building tiles placed in a Kontor's slot,
  marked with a supply die at face 1.** You may build only at a far Kontor where **your own
  post stands on every segment of that Kontor's branch** (Novgorod: E1 and E2). **One builder
  per slot; one building per player per Kontor**; each tile is used once. It enters by the
  Harbor's Build (§3), the *Build* cask bonus or London's prize.
- **The building die is the delivery modifier**: every cask of yours landing there scores its
  die + this die (§9). **The building die turns +1 each time any cask lands at that Kontor**
  (cap 6), whoever landed it, and each time you Raise it.
- **The tile's line fires on each landing of yours there** ⚙: **Warehouse** — gain 1 `G` 1 `H` ·
  **Kontorhaus** — gain 1 ⚜ more · **Guildhouse** — Raise one die of yours at sea +1.
- **The quality count: the quality you may deliver anywhere = the number of your dice standing
  at sea** (posts + building dice, the starter post included). Count 1 carts a Gruit; 2 ships a
  Hopped; 5 a Bock. It is read at the Load and at the Cart against the beer's printed quality.
  No tracker: the dice are the count.
- **Every die at sea scores 1★ per pip at the end** (§15).

---

## 9. Landing — two dice, an invitation, the prize

When your cask **lands** at a far Kontor, in boarding order:

1. **Score cask die + your building die at that Kontor** (no building: the cask die alone).
   Nothing else — no market, no premium, no demand.
2. **Park the die in the Kontor's field, its tile under it** (presence, the majority, the
   Flight). A parked cask die never scores again.
3. **Every building die at that Kontor turns +1** (cap 6). If the building is yours, its tile's
   line fires (§8).
4. **Take 1 ⚜** ⚙.
5. **Take the Kontor's prize:**

| Kontor | Minimum ⚙ | Branch | Prize ⚙ | Majority pair ⚙ |
|---|---|---|---|---|
| **London** | Q2 | W1 · W2 | **one Build of any kind**, the goods fee waived, the die still spent (a post · a Kontor building · a private building or Flip) — or nothing | 5 / 2 |
| **Bergen** | Q2 | E1 | **a specialist** from the display into an open seat, free — or nothing | 5 / 2 |
| **Novgorod** | Q2 | E1 · E2 | **Raise one die of yours at sea +1** (cap 6) | 7 / 3 |
| **Bruges** (the cart) | — | the road | the yard track's zone prize (§10); the hall: none | 4 / 2 by hall places |

---

## 10. Bruges — the cart, the yard, the hall, invitations

**The Cart** (the Cellar's alternate; with a Kaufhaus or the Carter it carries 2 — they do not stack) sends one Ready cask
of yours to Bruges, count permitting (a Gruit needs 1). No Ship, no lane, no ⚜ earned. **Its
cask bonus fires as it is carted.** It resolves at once at one of two doors:

- **The yard** — any beer; **Gruit's only door.** Park the die on the yard track's **next open
  place**, tile under it, and take the zone's prize ⚙: **Best** (places 1–3; side A 1–2) — **a
  recipe from the display, its fee waived, or 2 goods** · **Good** (4–6; side A 3–4) — **a
  recipe at its fee, or 1 good** · **OK** (7 and beyond) — **1 good**. A yard die is presence
  and a Flight beer; it carries no majority weight.
- **The hall** (the guild of brewmasters) — **a Q2+ cask and 1 ⚜.** Spend the ⚜; **score cask
  die + the hall die**; park your die on the hall's next open place, tile under it, and take the
  place's printed prize if any (places 1–3 print **2 · 2 · 1 goods** ⚙); **then the hall die
  turns +1** (cap 6). No recipe. Gruit never. Hall full: the yard.

**Invitations ⚜:** tokens, face-up, **no cap**. **The only faucet: 1 ⚜ per cask of yours landing
at a far Kontor** ⚙ (the Kontorhaus pays a second). **The only sink: the hall.** The hall's
places are the Bruges majority (§15).

---

## 11. Recipes

Start with Gruit and Hopped. Exports are **earned, never bought at a station**: **the yard**
(§10) or the ***Gain 1 recipe* bonus** (§4), at the card's printed fee — **Broyhan 1 `H` ·
Keut 1 `G` · Mumme 1 `G` 1 `H` · Bock 1 `G` 2 `H`** ⚙ (the yard's Best zone waives it). Nothing
else prints on a card. The **Scriptorium** waives every fee; the **Brewers' Guildhall** grants
every dealt recipe (§12). Holding every recipe, a bonus recipe simply pays nothing.

---

## 12. The private buildings — the wharf engine

The four stations are the base: a little of everything for everyone. **Your private buildings
are strictly better and build on each other.** Your hand holds **4 tiles** — four designs,
tier 1 on one face and tier 2 on the other. **A tile stands on any vacant slot of the 8 — you
choose — and fires on visit: whenever you work the station that slot flanks** (a flanking stop,
§2). Its slot picks its station, not its name: a Cold Store beside the Market fires on your
Market visits. Rivals never use it; the tide never takes it; a docked Ship may stand above it;
**no die stands on it**. No limit per station — two of your tiles may flank one station.

**Three doors, one verb — Build:** the Brewhouse's alternate · a cask's *Build* bonus ·
London's prize. **Tier 1** is placed from hand onto a **vacant slot** — no building on it; a
docked Ship above is fine — for **1 `G` 1 `H`** ⚙; **never onto a Public Work, never onto a
rival's tile** (a full wharf has no ground until the tide clears a slot). **Tier 2 is the Flip**:
your standing tier 1 turns over in place for **2 `G` 1 `H`** ⚙; it requires the tier 1 and
nothing else. Every tier 2 contains its tier 1.

**Each tile prints its points: tier 1 = 2★, tier 2 = 4★** ⚙, scored at the end while it stands.

| Tier 1 (fires on visit) | Tier 2, the Flip |
|---|---|
| **Granary** — +1 `G` +1 `H` | **Kaufhaus** — +2 goods, any mix, and your Cart carries 2 casks |
| **Scriptorium** — recipes cost you no fee, at every door | **Brewers' Guildhall** — you hold every dealt recipe, and on visit: Brew once (a full brew, with its search) |
| **Cold Store** — Age +2 more (Age 5) | **Lagering Cellar** — Age +2 more and one Ready cask of yours +1 (cap quality + 1) |
| **Counting House** — Raise one die of yours at sea +1 (cap 6) | **Shipping Office** — Raise +1 and Post once more (no second commission) |

---

## 13. The player board & the specialists

3 vessels · 2 seats. Specialists are earned (Bergen's prize, or the *Gain 1 specialist* bonus),
never bought; never two of a kind. The roster of ten singles ⚙:

- **Braumeister** — at the start of your turn: age one of your casks +1.
- **Shipmaster** — when you work the Harbor: one docked Ship carrying a cask of yours sails
  unfull; a wild one, you name its Kontor.
- **Cellarman** — your brews' dice start +1 (never past Ready).
- **Stevedore** — each time you load, load up to 2 casks.
- **Agent** — a rival's cask lands where you hold a building: that building die +1 more.
- **Lodesman** — your quality count reads +1.
- **Carter** — your Cart carries 2 casks; the yard's goods prizes pay you +1.
- **Guildmaster** — each present of yours at the hall: +2★.
- **Chronicler** — each cask you land — at a far Kontor, the yard or the hall: +1★.
- **Alderman** — game end: +2★ per Kontor with 3+ dice of yours parked (Bruges: hall places).

## 14. End of the game — the dice clock

**One clock: the first empty personal supply.** Finish the round so every seat has equal turns,
then score. Dice never return. **MAX_ROUND 18** ⚙ backstops. At the end **nothing sails**: a die
aboard a docked Ship scores its pips only; brews in vessels score nothing.

## 15. Scoring

1. **Landings and presents** — scored as they happened: cask die + building die (a far Kontor)
   · cask die + the hall die (the hall) · the Chronicler's and Guildmaster's ★.
2. **Pips at sea** — every post and building die of yours, 1★ per pip.
3. **Docked Ships** — every die of yours aboard, 1★ per pip.
4. **Private buildings** — each standing tile's printed ★ (2 / 4).
5. **Majorities** — at each far Kontor by dice in the field, at Bruges by dice on hall places:
   the printed pair to the two leading players; no dice there, no share; ties split the summed
   places; third place pays nothing.
6. **The Flight** — distinct beers landed (tiles under your dice at the Kontore, the yard and
   the hall): **3 → 3★ · 4 → 6★ · 5 → 10★** ⚙.
7. **The Guild** — the Alderman's printed line.
8. Tiebreak: the quality count, then goods.

*(Every value above is read off standing components: dice at sea, parked dice, tiles.
Nothing is remembered.)*

## 16. Expansions

**Specialty Beers** and **Jopenbier** ride the count (Gose Q2 · Zerbster Q3 · Duckstein Q2 with
its innate lift · Jopenbier Q6 needs count 6 and lifts to 6 by aging). Their toggles stay off
in the test build.
