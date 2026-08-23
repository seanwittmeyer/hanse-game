# Icon Manifest — every icon in the game (for PNG illustration)

> **LANDED & WIRED (2026-08-03):** the full in-scope set is generated and live in the kit —
> **29 icons** in `art/icons/` (grain · hops · goods · quality-die · die-1…6 · star · ready ·
> cask · ship · kontor + the 4 city crests · build · specialist · recipe · contract · presence ·
> station-market/brew/age/harbor · station-age-3 · wharf · bonus-load) + the **4 station
> SCENES** (`art/scene-market/brewhouse/cellar/harbor.png`). Wiring: `components.js` `LU()`
> is art-aware via `ICON_ART` (a mapped name emits the `<img class="ai ic">`; `LUX` keeps raw
> Lucide for the skipped crest contexts); lading headers print their kontor's crest; the
> Wharf's station cells are the scene + title + the action's icon only (the Cellar's = the age
> mark with the printed 3 — designer-ruled). `print.html` + the shared card faces are swapped;
> `play.html`'s app chrome went art-aware 2026-08-03 (its `LU` reads the shared `ICON_ART`; the board wears the dock-island backdrop + the scene station cells); `index/learn.html` still ride Lucide.
>
> **Production record (regenerable):** master prompt = the c.1350 sticker adaptation, bold-contour
> revision 2 (watercolor/gouache over sepia ink, shallow isometric base, die-cut sticker border,
> upper-left light; goods = no base · architecture = lavender diamond tile · ships = sea patch);
> generated 1024² on white via gemini-3.1-flash-image, alpha-keyed (edge flood-fill, soft shadow
> kept, orphan-shadow components dropped), shipped at 512². Crests share ONE heater-shield
> template — only field colour + charge vary — over the cog-in-profile base band; `kontor.png`
> is the 2×2 composite (Bruges·London / Bergen·Novgorod). Die faces 1–6 are derived from one
> blank die with programmatic pips (standard d6 layout); `station-age-3.png` composites a serif
> numeral 3 (sepia fill, cream sticker stroke) onto the age icon. Scenes: painterly full-bleed
> manuscript panels, calm top ~20% for the title, no text/people.

> **Round 2 (designer review, 2026-08-03):** goods NUMBERS ride the goods colours (gold grain /
> green hops) wherever a cost or gain prints; the white action circles RETIRE — cask tiles show
> the bare action icon at the circle's old height, buildings at TWICE it; **the numbered
> QUALITY-cask set joins** (`quality-1…6` — a side-lying wax-sealed cask, numeral overlaid
> age-3 style) and replaces cask-icon+number at quality call sites; **`die-q`** (the ?-die,
> same numeral style) is the parked-die VALUE mark on Kontor panels; **`sail.png`** = the ship
> over a forward arrow (the trigger berth + the Load & Sail aid); **`building.png` returns as
> the batch-3 HOUSE** — the noun for PLACE-a-building contexts (slots, London's prize, the
> displays) while the trowel `build.png` stays the verb; the Wharf stations gain a light-tan
> frame; Kontor panel crests double and hang over the scene, big-row icons grow and hug their
> numbers, and Novgorod's on-delivery cell is cut (redundant to its +2 value).

> **Round 3 (designer picks, 2026-08-03):** crest set finalized — **Bruges A · London A
> (regenerated) · Bergen C · Novgorod B**, joint mark recomposed. **station-harbor REDESIGNED**
> per the designer's mockup: the Harbor is where a ship is COMMISSIONED, not loaded — the icon
> is now a fresh-planked hull on launch stocks with a prominent stack of GOLD coins (bold
> outlines) composited lower-right, so the purchase reads at a glance. (The retired crane art
> stays in the candidates folder.)

> **Round 4 (designer review, 2026-08-03):** building action rows tighten (icon hugs the text;
> descriptions print SENTENCE CASE, never small-caps); the load-lift grammar is **[die-mark] on
> load** — a new **die MODIFIER set** joins (`die-plus1/2/3` sepia · `die-minus1` RED, numeral
> overlaid die-q style; class `dlift` — NOT `dl`, which print.html's sheet chrome owns) wired
> to Malt Kiln, Tollhouse, Bonded Store and the Hop Exchange; **sail.png remade** with a white
> black-outlined arrow (the sticker-sepia arrow vanished at berth size) and the ship-tile
> imagery enlarged (trigger cask-&-sail .42in; the waiting berths' cask ghost full-strength —
> the grey-out read as empty); the four station scenes are the round-2 picks (Market A ·
> Brewhouse B · Cellar A · Harbor A — wider, airier framing).
>
> **Round 5 (designer, 2026-08-03):** tile anatomy — the cask start line reads **"[die] start
> on N · [check] ready on N"** with BOTH numbers large (one line, never wrapped) and the cask
> action chip grows to .44in with negative margins so nothing else on the tile moves; building
> feet BOTTOM-ALIGN (one .5in icon size via the shared `.ac` slot — load-lifts pass `effIc` —
> the icon pulls ~1mm left, long text wraps UPWARD, the cost sits on the same baseline).
>
> **Round 4b (designer, same session): grain & hops LEFT the icon map** — at cost-chip size the
> art muddies, so wheat/sprout print as the coloured Lucide glyphs (numbers keep their goods
> colours) on every cost and inline effect; the art survives only where it prints big: the .7in
> goods TOKENS (special-cased in `tok()`) and the standalone `grain.png`/`hops.png` files.

> **Round 6 (designer picks, 2026-08-19):** the numbered-face pass — **age-1 = option A** (the
> standing `station-age-1.png`, the exact age-3 twin; already the Cellar's alt chip) and
> **goods-2 = option A** (**LANDED** `goods-2.png`: the goods basket + a "2" in the landed
> white/black numeral treatment, bottom-right like every numbered icon) — the **Market's
> PRIMARY face wears it** (play `STATION_ICON` + the print station face). The brew-search
> spyglass set is **REJECTED**. **The brew ruling:** the PRIMARY Brewhouse (brew + CHOOSE the
> cask tile from the stack) gets a NEW icon — the options round is out; the ALT Brewhouse
> (take the TOP tile, blind) takes the EXISTING pot (`station-brew.png`) when the primary's
> icon lands (until then the alt keeps the `layers` stand-in so the face never prints the pot
> twice).

> **Round 7 (designer picks, 2026-08-19): brew-CHOOSE LANDS.** Three option rounds converged —
> tiles-beside-the-pot C → + the white black-outlined DOWN-ARROW (the sail grammar, drawn
> programmatically) D → the tiles become a DECK (only the top face shows its cask) with the
> stack and arrow enlarged, **pick A** → **`station-brew-choose.png`** (the pot kept identical
> throughout via image-edit; arrow: L .29H · t .036H · tip .615H/.242W over the stack). Wired:
> the **Brewhouse PRIMARY face** on play (`STATION_ICON`) and the print Wharf board; the **ALT
> chip takes the plain pot** (`flask-conical` → `station-brew`) — the `layers` stand-in
> retires. The plain pot = the plain top-of-stack brew, per the round-6 ruling.

> **Round 8 (designer, 2026-08-19): the brew faces SWAP — the arrow means TOP TILE.** The
> arrow-on-the-stack art reads "take the top of the stack", so it is the **ALT** icon; the
> **plain pot is the PRIMARY** brew-and-SEARCH. The file renames to **`station-brew-top.png`**
> (key `brew-top`); play swaps its chips, and the **print station faces gain the same
> `[primary] / [smaller alt]` pair** as the app (all four stations — Market `goods-2`/`coins` ·
> Brewhouse pot/`brew-top` · Harbor `ship`/`package-plus` · Cellar `age-3`/`age-1`), so the
> arrow art still prints.

> **Round 9 (designer, 2026-08-22): the numbered-goods pair matches the AGE recipe.** The
> goods-2/goods-3 numerals had rendered LARGER, thinner-outlined and shadowless next to the
> age icons; both re-cut with the exact age treatment — DejaVuSans-Bold at **.42H**, black
> stroke **.028H**, the soft **drop shadow** (offset .012/.018H, blur .012H, alpha 160),
> anchor .94W/.97H — validated by re-rendering the age-1 digit over the landed file (mean
> channel diff < 8). `goods-3.png` LANDS (the Source-3 face swaps off the plain-basket
> stand-in); `goods-2.png` replaced in place. Same round: the BOURSE tally-board set is
> REJECTED (rebriefed formal — abacus / banner track / rail-and-slider board) and BONUS-LOAD
> is rebriefed as a cask on a dock cart with the ship behind; both option rounds are out.

> **Round 10 (designer picks, 2026-08-22): the BOURSE FAMILY ships (base A) + the cart-only
> bonus-load (pick A).** The Bourse icon = the guild banner bearing the beer cask; the family
> derives the marks in the age/goods numeral recipe — `bourse-plus1/-plus2/-pm1` white,
> `bourse-minus1` RED. Wired at every former trending-arrow site (Tollhouse toll bench ·
> Venture public lines ±1/±2 · the Bourse strip header · the aid legends · the in-app
> headers) — the last modern glyph on the table retires. `bonus-load.png` is replaced in
> place by the bold-contour cask-on-cart (no ship — a cask loads anywhere). Same round: the
> ship-tile header drops its little ship icon and ready check (name · [die] N+ · fee).

> **Round 11 (designer, 2026-08-23): the numbered STAR family + the house palette.** Seven
> point-shift marks composite off `star.png` in the standing numeral recipe — `star-plus1..4`
> white, `star-minus1..3` RED — and replace the +N★ text chips on the tile faces (Cooperage ·
> the four Staple Houses · Staple Rights · Guild Residence [★+2]×[home] · Chronicler ·
> Alderman · Town Crier) at a .26in `starmark` size (the .1in-icon lesson applies). Same
> round: the four house colours (red·blue·green·yellow) are named `--house-*` vars in
> play.html's styles; the Venture feet wear them.

> **Round 12 (designer picks, 2026-08-23): swap-dice · venture-build · redeal.**
> `swap-dice.png` = two die faces corner-to-corner, the ⇄ struck centre at .55W in the
> numeral treatment (pick E, mark enlarged) — the Rack House cell. `venture-build.png` =
> the house + the bold gold coin stack front-right, the commission grammar (pick B) — the
> Guild Residence ×-cell and the Open-1-Venture bonus. `redeal.png` = the contract scroll
> + the gemini-drawn white/black refresh cycle at the lower right (pick C), the mark then
> color-keyed out and re-composited at 1.5× on the clean scroll — the Factor's Desk cell.
> All three fill the stand-ins named by the v5.3c venture-grammar pass.

> **Scope ruling (designer, 2026-08-03, mid-program):** §4 building crests, §5 specialist
> crests and §6 reference glyphs are **SKIPPED** — those surfaces keep their Lucide glyphs
> (the tiles already carry full-bleed art). **ADDED: one icon per Kontor** — a city crest
> with the cog-in-profile across its base (the shared "destination" band): `kontor-bruges` ·
> `kontor-london` · `kontor-bergen` · `kontor-novgorod` — and the generic `kontor` icon
> composes all four. Style: the c.1350 sticker adaptation (bold-contour revision 2);
> icons are TRANSPARENT PNGs keyed from white; the working set lives in `art/icons/`.
>
> **Merges/redesigns (designer, 2026-08-03):** *building* + *Build 1 building* are ONE icon
> — **`build.png`**, the mason's trowel on bricks (the workshop-house building icon is
> superseded; the noun and the verb share the build mark). **`contract.png`** is the tall
> pictogram scroll (the sealed-packet direction was cut). **recipe** is being redesigned as
> a BOOK (not a scroll); **presence** as a die-with-arrow-toward-a-Kontor-crest.

**Purpose:** the complete inventory of Lucide placeholder icons to be replaced by
illustrated PNG icons. One PNG per **concept** — where one Lucide glyph currently serves
several concepts, the *Split?* column says whether the concepts should share the new art
or get their own. File-name suggestions use `art/icons/<slug>.png`.

Sources of truth: `components.js` (card faces) · `play.html` (app UI) · `print.html`
(kit boards/aids + the Player Aid legend). Registry terms per `STYLE.md`.

## 1. The core alphabet (highest reuse — these appear on nearly every surface)

| Concept | Lucide today | Suggested slug | Where it appears | Meaning / notes for the illustrator |
|---|---|---|---|---|
| Grain | `wheat` | `grain` | goods costs/gains everywhere; Grain Factor card | A brewing input and the medium of exchange. Pairs with Hops — same visual weight, instantly distinct at 4 mm. Gold/amber. |
| Hops | `sprout` | `hops` | goods costs/gains everywhere; Hop Gardener, Hop Exchange | The quality currency — recipes and lifts run on it. Green. Must read against the grain icon at tiny sizes. |
| Goods (any mix) | `coins` | `goods` | *Gain 2 goods* bonus, Granary, consolation prize | Grain + hops collectively. Consider a grain-sack + hop-cone pair rather than coins (the game has no money). |
| Cask quality die | `dices` | `quality-die` | die seats on cask tiles, tray counts, aid, §14 | THE component: the die that rides a cask. A d6 with visible pips; the single most-repeated icon in the game. |
| Die face / minimum N | `dice-1`…`dice-6` | `die-1`…`die-6` | Ship tiles (minimum), Contract conditions, start values | Six literal die faces. On Ships/Contracts they mean "die N or better boards/claims". Keep faces bold and count-at-a-glance. |
| ★ (the scoring unit) | `star` | `star` | every ★ value, score track, Novgorod premium | The only score symbol — text never writes "points". Must work at map-pin size and in table cells. |
| Ready | `check` | `ready` | die lifecycle, aid, app state | Die = quality; the cask may board. A checkmark or a bunghole-sealed cask stamp. |
| Cask / Quality | `beer` | `cask` | cask tiles, quality chips (Q1–Q5), brew UI | A brewed beer on its tile; beside a number it reads "quality N". |
| Ship | `sailboat` | `ship` | Ship tiles, displays, aid | A neutral tile bound for its printed Kontor (Skute/Cog/Hulk). Distinct from the Harbor *station* icon below. |
| Kontor | `landmark` | `kontor` | Destinations board, delivery UI, Contract headers | A trading post of the League (Bruges · London · Bergen · Novgorod). A gabled Hanse counting-house works. |
| Building | `building-2` | `building` | building tiles, London prize, §14 | The green shared-family tile. |
| Specialist | `wrench` | `specialist` | Specialist tiles, Bergen prize, seats, the hire bonus | A private purple tile. **Also currently the Cellarman & Braumeister tile crests and the *Gain 1 Specialist* bonus — see splits below.** |
| Recipe | `scroll-text` | `recipe` | recipe cards/fees, Bruges prize, *Gain 1 recipe* bonus | **SPLIT.** Today `scroll-text` also serves Contract, Scrivener's Hall and Customs House. The recipe icon should be its own art (a brewing scroll/formula). |
| Contract | `scroll-text` | `contract` | Contract tiles, the row, claims, Chronicler | **SPLIT from recipe.** A Kontor bonus tile — suggest a sealed document (wax seal) so recipe vs Contract never blur. |
| Presence | `map-pin` | `presence` | *Place 1 presence* bonus, Keut's perk, Kontor mats | Your parked dice at a Kontor; the action parks a tray die at face 1. A die-on-a-pin or a banner-stake. |

## 2. Stations & the Wharf

| Concept | Lucide today | Suggested slug | Where it appears | Meaning / notes |
|---|---|---|---|---|
| Market — Source | — (real: `goods-3` briefed) | `station-market` | station cell, aids | Take 3 goods, any mix (v5.2b ⚙). **The numbered `goods-3.png` is briefed (PROMPTS.md)** — the plain `goods.png` basket stands in; `goods-2.png` retires with the Source-2 face; the stall art `station-market.png` stays for scene/reference use. |
| Brewhouse — Brew (search) | `flask-conical` | `station-brew` | station cell (the PRIMARY face), aids, *Brew 1* bonus | **Round 8 swap:** the plain pot = the primary brew-and-SEARCH (pay a recipe, search the beer's stack and choose the tile). |
| Cellar — Age | `hourglass` | `station-age` | station cell, aids, *Age +2* bonus, Abbey Cellar | Turn aging dice up. **Shared with the Age bonus (fine) and the Abbey Cellar tile crest (give the Abbey its own crest — see §4).** |
| Harbor — Commission | `ship` | `station-harbor` | station cell, aids | Pay 1 G, place a display Ship, load 1 Ready cask. Distinct from the Ship-tile icon: suggest a crane/quay scene. |
| **Bourse ±2 (the public line)** | `bourse-pm1` (stand-in) | `bourse-pm2` | the `Staple Rights` Venture face's public chip; the app's stop label | **WANTED (v5.4).** The line was `+2▲` up-only and became **±2** — the market's missing brake. The ± glyph is the new information, so the ±1 art stands in and reads the SIGN right and the number wrong. Brief: the `bourse-pm1` treatment with a **2**. |
| **Venture “+1 good” faces** | — (real: `goods-1`) | `goods-1` | the `Counting House` owner line + every `gain 1 good` public chip (Counting House L1/L2, Warehouse L1); the printed Wharf board's Market alt chip | **DONE (2026-08-23):** the Counting House wore the plain basket under a text `+1` badge; the numbered icon replaced it and the badge CSS was deleted. A printed face never carries text an icon can say. |
| Market ALT — Source 1 | — (real: `goods-1`) | `goods-1` | the station face's alt chip | **DONE (round 12b, 2026-08-23):** the basket + a "1" in the standing numeral recipe — the goods-2/3 triplet completes and the alt chip wears it. |
| Brewhouse ALT — top tile (blind) | — (real: `brew-top`) | `station-brew-top` | the station face's alt chip; the alt-brew UI | **DONE (rounds 7-8):** the pot + tile deck + white down-arrow — the arrow points at the TOP of the stack: take the top tile. The `layers` stand-in is retired. |
| Cellar ALT — Age 1 | — (real: `age-1`) | `station-age-1` | the station face's alt chip | Exists (`art/icons/station-age-1.png`) — the one-pip age chip. |
| Harbor ALT — Load 1, any Ship | `package-plus` | — | the station face's alt chip | The load icon covers it (same verb, any docked Ship). |
| The Wharf | `anchor` | `wharf` | glossary, aid headers | The whole core area. **Also currently the Rich Berth crest — split (see §4).** |

## 3. The eight load bonuses (printed on cask tiles — need the tightest, most legible set)

| Concept | Lucide today | Suggested slug | Notes |
|---|---|---|---|
| Gain 2 goods | `coins` | `bonus-goods` | Same art as *Goods* is fine. |
| Age +2 | `hourglass` | `bonus-age` | Same art as the Age station is fine (same verb). |
| Load 1 more | `package-plus` | `bonus-load` | Loads another cask onto any Ship. **Also the Stevedore's crest — sharing is acceptable (same verb), or give the Stevedore a treadwheel-crane crest.** |
| Place 1 presence | `map-pin` | `bonus-presence` | Same art as *Presence*. |
| Gain 1 recipe | `scroll-text` | `bonus-recipe` | Same art as *Recipe* once split from Contract. |
| Build 1 building | `search` | `bonus-build` | **MISMATCH — replace.** A magnifying glass currently stands for "build a building". New art: a trowel/mason's hammer or a rising gable. Highest-priority fix in the set. |
| Gain 1 Specialist | `wrench` | `bonus-specialist` | Same art as *Specialist*. |
| Brew 1 | `flask-conical` | `bonus-brew` | Same art as *Brew*. |

## 4. Building tile crests (18 designs — each tile face carries one)

| Building | Lucide today | Suggested slug | Collision / note |
|---|---|---|---|
| Granary | `coins` | `bldg-granary` | **Split from Goods** — a grain store deserves its own crest (silo/sacks). |
| ~~Scrivener's Hall~~ | `scroll-text` | `bldg-scriveners` | **RETIRED (v5.1)** — art kept in `art/` for the archive. |
| Mission Quay | `church` | `bldg-missionquay` | Age +2. Chapel-on-the-quay. |
| ~~Hiring Post~~ | `wrench` | `bldg-hiringpost` | **RETIRED (v5.1)** — art kept in `art/` for the archive. |
| ~~Almoner's Stall~~ | `heart` | `bldg-almoner` | **RETIRED (v5.1, ruled)** — art kept in `art/` for the archive. |
| Racking Hall | `repeat` | `bldg-racking` | Swap two dice. Two casks with transfer hose. |
| Assay House | `scale` | `bldg-assay` | ±1 one aging die. Balance scale is right. |
| Abbey Cellar | `hourglass` | `bldg-abbey` | **Split from Age** — an abbey arch over casks. |
| Hop Exchange | `sprout` | `bldg-hopex` | **Split from Hops** — a trading hall with hop sacks. |
| Malt Kiln | `flame` | `bldg-maltkiln` | Boarding die +1. Kiln flame is right. |
| Tollhouse | `ticket` | `bldg-tollhouse` | Die −1 for +3★. A toll stamp/seal. |
| Bonded Store | `warehouse` | `bldg-bonded` | Ephemeral; sails with the Ship. |
| Cooperage | `package` | `bldg-cooperage` | +1 berth. Barrel hoops/cooper's tools. |
| Customs House | `scroll-text` | `bldg-customs` | **Split** — minimum −1: a customs ledger/stamp, not a scroll. |
| Rich Berth | `anchor` | `bldg-richberth` | **Split from Wharf** — pay 2G, the last berth fills and it sails (v5.1): a cushioned mooring/gilded bollard. |
| Ropewalk | `cable` | `bldg-ropewalk` | NEW (v5.1) — loads here +1: a long rope-twisting shed, coiled hawsers. |
| Weigh House | `weight` | `bldg-weighhouse` | NEW (v5.1) — two Manifest lines per delivered cask: the public crane-scale house. |
| Victualling Yard | `boxes` | `bldg-victual` | Ephemeral; bonus fires twice. Provision crates. |
| Merchants' Exchange | `arrow-right-left` | `bldg-exchange` | Cycles a Contract. **Also the Chandler's crest — split.** |
| Warping Capstan | `ship-wheel` | `bldg-capstan` | Moves an empty hull. A capstan drum (not a ship's wheel). |

## 5. Specialist tile crests (13 designs)

| Specialist | Lucide today | Suggested slug | Collision / note |
|---|---|---|---|
| Cellarman | `wrench` | `spec-cellarman` | **Split** — his art brief is "an oak cask racked on a stillage"; crest to match. |
| Grain Factor | `badge-plus` | `spec-grainfactor` | **badge-plus is shared with Hop Gardener — split both**: grain sack crest. |
| Hop Gardener | `badge-plus` | `spec-hopgardener` | Hop bine on a pole crest. |
| Stevedore | `package-plus` | `spec-stevedore` | Treadwheel harbor crane (his art brief). |
| Braumeister | `wrench` | `spec-braumeister` | **Split** — mash paddle over a kettle (his art brief). |
| Guild Scholar | `graduation-cap` | `spec-scholar` | Recipes free. |
| Innkeeper | `bed` | `spec-innkeeper` | The tile is a 4th vessel. |
| Supercargo | `luggage` | `spec-supercargo` | Sealed manifest over a chest (his art brief). |
| Chronicler | `book-open` | `spec-chronicler` | **Also the player-aid icon — split**: open chronicle with quill. |
| Alderman | `gavel` | `spec-alderman` | Chain of office (his art brief) beats a gavel. |
| Town Crier | `megaphone` | `spec-towncrier` | Presence parks at face 2. Handbell beats a megaphone, period-wise. |
| Chandler | `arrow-right-left` | `spec-chandler` | **Split from Merchants' Exchange** — swap 1G↔1H: candle + scales. |
| Shipwright | `hammer` | `spec-shipwright` | Adze over a hull rib (his art brief). |

## 6. Reference & UI glyphs (rulebook, aids, boards — lower priority, still in the set)

| Concept | Lucide today | Suggested slug | Where | Note |
|---|---|---|---|---|
| Majority | `trophy` | `majority` | scoring, Kontor mats, §14 | End-game Kontor ranking by parked dice. A laurel or guild banner. |
| The Flight | `unlock` | `flight` | scoring, recipe cards, §14 | Distinct beers brewed. **Mismatch — an unlock padlock is a v3 leftover; suggest a fan of flipped recipe cards or a tasting flight.** |
| The clock | `timer` | `clock` | end-of-game copy, aid | The first empty tray sets the final round. An emptying dice tray beats an hourglass (already used for Age). |
| Move | `footprints` | `move` | rulebook turn tables | One step, orthogonal. |
| Choose a line | `layout-grid` | `line` | rulebook turn tables, glossary | A row or column: 2 stations + 2 slots. |
| Resolve the line | `list-checks` | `resolve` | rulebook turn tables | Any order, all optional, each once. |
| On delivery (prize chip) | `gift` | `prize` | Kontor panels (print kit) | The per-cask prize marker on each panel. A small chest/bale. |
| Draw bag (refill) | `shopping-bag` | `bag` | Market & Stores shelf labels (print kit) | Refill the display from this family's bag. A burlap sack. |
| Player aid | `book-open` | `aid` | aid card headers | Split from Chronicler (see §5). |
| The Hall *(tabled)* | `crown` | `hall` | tabled seams only | Not in the current box — art optional. |
| Trade Roads *(tabled)* | `truck` | `traderoads` | expansion sheet only | Tabled expansion — art optional; a wagon if drawn. |

## 7. Count summary & what remains

- **Landed (2026-08-03): all 29 in-scope icons + the 4 station scenes** — §1 core (incl. die
  faces), §2 stations/wharf, §3's two new arts (build · bonus-load; the other six bonuses share
  core art by design), and the added Kontor crest family. **Nothing is left to generate under
  the current scope ruling.**
- **Remaining (all designer-SKIPPED, riding Lucide until re-ruled):** §4 building crests (18) ·
  §5 specialist crests (13) · §6 reference glyphs (majority · flight · clock · move · line ·
  resolve · prize · bag · aid · the tabled hall/traderoads) — plus the two tabled-expansion
  icon sets. Re-open any of these as its own wave if wanted.
- **Wiring remaining:** `play.html` app-chrome Lucide → art (the card faces already swapped via
  the shared library) — pending the designer's print-kit review. *(The index/learn icon
  passes closed with those pages — retired 2026-08-23.)*
- **Hard requirements (met):** legible at ~4 mm (QC'd on parchment/dark/sea + 4 mm strips), one
  silhouette per concept, and the four ambiguity splits: **recipe vs Contract** (book vs
  pictogram scroll) · **build drops the magnifier** (trowel-on-bricks) · Granary/Exchange
  crest collisions dissolved by the §4 skip (crests stay glyphs; the shared verbs ride art).
