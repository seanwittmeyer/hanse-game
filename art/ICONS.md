# Icon Manifest — every icon in the game (for PNG illustration)

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
(kit boards/aids) · `index.html` §14 Icon Key. Registry terms per `STYLE.md`.

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
| Specialist | `wrench` | `specialist` | Specialist tiles, Bergen prize, seats, Hiring Post | A private purple tile. **Also currently the Cellarman & Braumeister tile crests and the *Gain 1 Specialist* bonus — see splits below.** |
| Recipe | `scroll-text` | `recipe` | recipe cards/fees, Bruges prize, *Gain 1 recipe* bonus | **SPLIT.** Today `scroll-text` also serves Contract, Scrivener's Hall and Customs House. The recipe icon should be its own art (a brewing scroll/formula). |
| Contract | `scroll-text` | `contract` | Contract tiles, the row, claims, Chronicler | **SPLIT from recipe.** A Kontor bonus tile — suggest a sealed document (wax seal) so recipe vs Contract never blur. |
| Presence | `map-pin` | `presence` | *Place 1 presence* bonus, Almoner's Stall, Kontor mats | Your parked dice at a Kontor; the action parks a tray die at face 1. A die-on-a-pin or a banner-stake. |

## 2. Stations & the Wharf

| Concept | Lucide today | Suggested slug | Where it appears | Meaning / notes |
|---|---|---|---|---|
| Market — Source | `store` | `station-market` | station cell, aids | Take 2 goods, any mix. |
| Brewhouse — Brew | `flask-conical` | `station-brew` | station cell, aids, *Brew 1* bonus | Pay a recipe into an open vessel. A copper kettle beats the chemistry flask, thematically. **Shared with the *Brew 1* load bonus — sharing is fine (same verb).** |
| Cellar — Age | `hourglass` | `station-age` | station cell, aids, *Age +2* bonus, Abbey Cellar | Turn aging dice up. **Shared with the Age bonus (fine) and the Abbey Cellar tile crest (give the Abbey its own crest — see §4).** |
| Harbor — Commission | `ship` | `station-harbor` | station cell, aids | Pay 1 G, place a display Ship, load 1 Ready cask. Distinct from the Ship-tile icon: suggest a crane/quay scene. |
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
| Scrivener's Hall | `scroll-text` | `bldg-scriveners` | **Split** — quill over a desk; must not read as Recipe/Contract. |
| Mission Quay | `church` | `bldg-missionquay` | Age +2. Chapel-on-the-quay. |
| Hiring Post | `wrench` | `bldg-hiringpost` | **Split from Specialist** — a posting board / handshake. |
| Almoner's Stall | `heart` | `bldg-almoner` | Place 1 presence. Alms bowl. |
| Racking Hall | `repeat` | `bldg-racking` | Swap two dice. Two casks with transfer hose. |
| Assay House | `scale` | `bldg-assay` | ±1 one aging die. Balance scale is right. |
| Abbey Cellar | `hourglass` | `bldg-abbey` | **Split from Age** — an abbey arch over casks. |
| Hop Exchange | `sprout` | `bldg-hopex` | **Split from Hops** — a trading hall with hop sacks. |
| Malt Kiln | `flame` | `bldg-maltkiln` | Boarding die +1. Kiln flame is right. |
| Tollhouse | `ticket` | `bldg-tollhouse` | Die −1 for +3★. A toll stamp/seal. |
| Bonded Store | `warehouse` | `bldg-bonded` | Ephemeral; sails with the Ship. |
| Cooperage | `package` | `bldg-cooperage` | +1 berth. Barrel hoops/cooper's tools. |
| Customs House | `scroll-text` | `bldg-customs` | **Split** — minimum −1: a customs ledger/stamp, not a scroll. |
| Rich Berth | `anchor` | `bldg-richberth` | **Split from Wharf** — sails one berth short: a cushioned mooring/gilded bollard. |
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

## 7. Count summary

- **Distinct PNGs recommended:** 15 core + 5 station/wharf + 2 new bonus arts (build, plus splits riding core) + 18 building crests + 13 specialist crests + 11 reference = **~64 illustrations** (die faces 1–6 count as 6 of the core 15).
- **Priority order for the illustrator:** §1 core alphabet → §3 load bonuses (they print smallest) → §4/§5 tile crests (they can lean on the tiles' full-bleed art already generated) → §2 stations → §6 reference.
- **Hard requirements:** legible at ~4 mm print size (the bonus chips), one silhouette per concept, and the four splits that currently cause real table ambiguity: **recipe vs Contract**, **build-a-building (drop the magnifier)**, **Granary vs Goods**, **Exchange vs Chandler**.
