# Icons — the accounting

*The icon files the pages can use, at `art/icons/<slug>.png` (512², transparent, the c.1350
sticker style). `components.js` maps a Lucide name or a virtual name to a file in `ICON_ART`;
`LU(name)` emits the art `<img>` when the name is mapped, else the Lucide glyph; `LUX` forces
Lucide. To add an icon: drop the PNG here, add its `ICON_ART` entry, call `LU`. New briefs go in
`art/PROMPTS.md`; the production record (the prompts, the rounds, the Lucide → PNG inventory) is
archived at `archive/records/ICON-ROUNDS.md`.*

## In use on the v8 surfaces (the faces · play · print · the rulebook)

| Slug | `ICON_ART` key | Meaning |
|---|---|---|
| `goods` · `goods-1` · `goods-2` | `coins` · `goods-1` · `goods-2` | goods, any mix · Gain 1 good · Gain 2 goods |
| `grain` · `hops` | direct (the goods tokens) | the grain and hops cubes' art on the .7 in tokens |
| `quality-die` | `dices` | the quality die |
| `die-1` … `die-6` | `dice-N` | a die face: a start face; the die floor on the Kontor panels |
| `die-plus1` | `die-plus1` | Raise die |
| `die-q` | `die-q` | the minimum's row on the aid legend (the die meets the Kontor's floor) |
| `quality-1` … `quality-6` | `quality-N` | a cask of quality N |
| `cask` | `beer` | a cask |
| `ready` | `check` | Ready |
| `star` · `star-1` … `star-6` · `star-plus1` · `star-plus2` | `star` · `star-N` · `star-plusN` | ★ · printed points (star-2 / star-4 on the private tiles) · +1★ / +2★ (the Chronicler, the Guildmaster) |
| `ship` · `sail` | `sailboat` · `sail` | a Ship · the trigger berth / the sail |
| `kontor` · `kontor-bruges` · `kontor-london` · `kontor-bergen` · `kontor-novgorod` | `landmark` · `kontor-*` | the Kontore and the four crests |
| `kontorhaus` | `kontorhaus` | a Kontor building |
| `post` | `post` | a post |
| `mail` | `mail` | the ⚜ invitation |
| `hall` | `crown` | the hall |
| `cart` | `truck` | the cart |
| `build` | `search` · `hammer` | Build |
| `building` | `building-2` | a building / a building slot |
| `bonus-load` | `package-plus` | Load 1 |
| `recipe` | `scroll-text` | a recipe |
| `specialist` | `wrench` | a specialist |
| `presence` | `map-pin` | presence (parked dice) |
| `station-market` · `station-brew` · `station-age` · `station-harbor` | `store` · `flask-conical` · `hourglass` · `ship` | the four stations' verbs: Gain goods · Brew · Age · Commission |
| `station-age-2` · `station-age-3` | `age-2` · `age-3` | Age 2 · Age 3 |
| `wharf` | `anchor` | the Wharf |
| `chart` | `compass` | the Lodesman's mark |

## On disk and mapped, but no v8 face calls them (free to reuse or retire)

`bourse` · `bourse-plus1` · `bourse-plus2` · `bourse-minus1` · `bourse-pm1` · `bourse-pm2` ·
`closure` · `contract` · `current` · `factor` · `redeal` · `swap-dice` · `venture-build` ·
`die-minus1` · `die-plus2` · `die-plus3` · `goods-3` · `station-age-1` ·
`station-brew-top` · `star-minus1` · `star-minus2` · `star-minus3` · `star-plus3` · `star-plus4`.

## The larger art the pages load (in `art/`, not `art/icons/`)

`scene-market` · `scene-brewhouse` · `scene-cellar` · `scene-harbor` (the station cells) ·
`seamap` (the sea board's chart) · `wharf-board` (the app's dock backdrop) · `brewhouse` (the
cask card's aging ground) · `favicon`. The tile art — `cask-<beer>` · `ship-<hull>` · `ship-back`
· `wharf-<kontor>` · `building-<key>` · `private-*` · `kontor-tile-*` · `improve-<slug>.jpg` — is
inventoried with its briefs in `art/PROMPTS.md`.
