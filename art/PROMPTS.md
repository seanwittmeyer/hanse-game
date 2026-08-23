# Background art for the cards & tiles (print.html)

These images sit **behind** the cask cards (2.5″ square) and ship tiles (2.5″ square) in
`print.html`. A card's own text/icons are drawn on top, with a dark scrim for legibility.

## How to use
1. Generate each image (prompts below) with **gemini-3.1-flash-image**.
2. Save it into this `art/` folder with the **exact filename** listed.
3. In `print.html` set `const ART_ON=false` → **`true`** (search "ART slot").
   Until then the slot shows a faint diagonal-hatch placeholder.

## Filenames (the code maps to these)
- Casks: `cask-gruit.png` · `cask-hopped.png` · `cask-broyhan.png` · `cask-keut.png` ·
  `cask-mumme.png` · `cask-bock.png` · `cask-gose.png` · `cask-zerbster.png` ·
  `cask-duckstein.png` · `cask-jopenbier.png`
- Ships: `ship-cog.png` · `ship-hulk.png`
- Buildings (2″ building CARDS, full-bleed art behind the name/effect/cost): `building-<key>.png`,
  one per `BUILDINGS` key in `components.js` — the live v4.6 set (every design owns its file since
  the 2026-08-02 art pass): `building-granary.png` · `building-scriveners.png` · `building-missionq.png` ·
  `building-hiringpost.png` · `building-almoner.png` · `building-racking.png` · `building-assay.png` ·
  `building-abbey.png` · `building-hopex.png` · `building-maltkiln.png` · `building-tollhouse.png` ·
  `building-bonded.png` · `building-cooperage.png` · `building-customs.png` · `building-richberth.png` ·
  `building-victual.png` · `building-exchange.png` · `building-capstan.png`.
  (Legacy files from retired tiles — staple/burgomstr/connoiss/hansediet/festkeller/reliquary/ch_*/
  gauger/workshop/salthouse/smokekiln/partigyle/hopyard — stay in `art/` as an archive; nothing
  references them. The building card BACK is the generic Wild + ★ "displaced" face — no art.)
- Specialists (2″ SQUARE cards, object-shot art): `improve-<slug>.jpg` — the canonical SPEC lives
  BELOW ("The specialist object-shot SPEC", moved out of `components.js` 2026-08-22 — components
  stays clean; each IMPROVE row still carries its one-line `art:` brief as data).
  Live v4.6 set: cellarman · grain-factor · hop-gardener · stevedore · braumeister · guild-scholar ·
  innkeeper · supercargo · chronicler · alderman · town-crier · chandler · shipwright (all own files
  since 2026-08-02; coppersmith/lagerkeeper/quaymaster stay as legacy).

> **Model note (current):** generated with Google's **`gemini-3.1-flash-image`** (nano-banana class) via the
> Generative Language API — `:generateContent` with `responseModalities:["IMAGE"]` + `imageConfig.aspectRatio:"1:1"`.
> The reusable generator (`gen.py`) lives in the session scratchpad; **the API key is never committed.**
> `ART_ON` is already `true` in `print.html`. Output is JPEG-in-`.png` at 1024² — the same as the
> existing cask/ship art (browsers decode by content, not extension).

## Shared style block — paste at the top of EVERY prompt
> A single old north-European merchant-town building, c. 1350. Hand-painted illustration in the style of an
> aged manuscript illumination / old-map vignette — painterly, soft warm light, muted earthy palette.
> **FULL-BLEED square 1:1: the painting fills the ENTIRE square edge to edge with NO parchment border, NO
> paper margin, NO frame, NO drawn frame line, NO cream/ivory mat, NO vignette ring, NO rounded corners, NO
> overlay of any kind — the artwork reaches every edge cleanly.** **A SINGLE building is the clear subject:
> ONE structure, centered and fairly large in the frame, shown COMPLETE and uncropped (the whole building
> visible, not running off the top/sides/bottom) — a PORTRAIT of that one building, like a single icon being
> added to a game. It is NOT a city panorama, NOT a row of many buildings, NOT a wide harbor scene, NOT a
> townscape.** Keep the immediate surroundings simple, sparse and uncluttered (a little plain ground / quay /
> sky — at most a faint hint of a neighbour, never a crowd) so the eye reads ONE building. No text, no letters,
> no numbers, no signs/signage, no people in the foreground, no modern objects. Keep the **top ~22% and bottom
> ~28%** calm and a touch darker (plain sky / shadow / still water / muted ground) so overlaid card text stays
> readable, but still painted (no empty band). Slightly desaturated, low-contrast, reads as a background.
> ~1024×1024, PNG.

> **Why this is a SINGLE building (v6.2 art pass):** a first full-bleed pass (v6.1) over-corrected into wide
> *city / harbor scenes* — each card became a townscape rather than "one building being added to the game,"
> which lost the original set's icon feel. v6.2 reverts to a **single hero-building portrait** per card while
> keeping the full-bleed / no-parchment-frame fix. **Three gotchas, in order of nuisance:** (1) the model
> intermittently bakes a **parchment mat + drawn frame line** anyway (worst on interiors — Ratskeller cellar,
> tun-house). Append an explicit "no parchment border / no drawn frame line / bleeds off all four edges" line;
> if it still frames, **auto-crop the mat** (the `trimframe` pass below) — a deterministic fallback. (2) A
> proper place name in the subject (Bergen Bryggen, Novgorod Peterhof) and a leading bare "Hanseatic League"
> can make the model paint a **title banner / gate sign**, especially when there is a lot of empty sky/water to
> fill — describe the structure generically, open with "A single … building" (not a proper noun), and forbid
> "any title/caption/lettering in the sky or water." (3) "the town continues past the edges" wording brings
> back the panorama — say "ONE building alone, not a row."

> **`trimframe` fallback (deterministic):** if a render still ships with a parchment mat, detect a light, warm,
> low-saturation border on the outer edges and crop it, then re-scale to 1024². Classify a pixel as mat if
> `r>185, g>172, b>145, 3<(r−b)<78, (max−min)<74` (cream/ivory, warm — bluish sky is excluded since it needs
> `r>b`). Treat it as a true frame only when a border is found on **all four sides** (so a sky-only top is never
> trimmed); for a partial mat whose bottom edge is water (e.g. London Steelyard), force a fixed ~5% crop. A few
> px of inner drawn frame-line may survive the mat crop — take a second ~2–3% pass to clear it.

---

## Cask cards — subject: a brewing house's cask waiting on the wharf to be shipped
Base subject: *a single sturdy wooden beer cask (barrel) standing on a weathered timber wharf/dock at
the water's edge, a coil of rope and a crate nearby, a Hanseatic harbor town softly blurred behind.*
Vary the wood tone, contents glow, and mood per beer:

- **cask-gruit.png** — a small, humble herb-ale cask; cool **grey-green** tones, sprigs of gruit herbs, plain and rustic.
- **cask-hopped.png** — a standard hopped-beer cask; warm **amber-gold** tones, hop vines curling around it.
- **cask-broyhan.png** — a fine pale Hannover beer cask; bright **copper** tones, clean and well-made.
- **cask-keut.png** — a stout export cask bound tight with extra rope for the long haul; earthy **walnut brown**.
- **cask-mumme.png** — a rich dark Braunschweig "Mumme" cask; deep **gold-brown**, opulent, a faint glow.
- **cask-bock.png** — a strong dark bock cask, premium and heavy; deep **maroon/oxblood red** tones.
- **cask-gose.png** — a salty coastal Goslar gose cask; pale **sage-green**, sea-salt crust, brine and light.
- **cask-zerbster.png** — a very hoppy Zerbst cask; herbal **green** tones, abundant hop cones.
- **cask-duckstein.png** — a smoke-cured Königslutter cask beside a glowing kiln; smoky **brown**, drifting smoke.
- **cask-jopenbier.png** — a vintage Danzig "Jopenbier" cask aging in a candlelit cellar; dark **wine-red**, dusty, cobwebbed, precious.

## Kontor panels (Market & Stores board) — subject: the DESTINATION as a place (2026-07-05)
Wide **16:9 landscape banners** behind the destination panels' parchment stat-plates — unlike the building
cards these ARE scenes (a port you sail to), so the single-building rule does not apply. Same shared style
block, with the full-bleed / no-lettering gotchas, plus "calm sky and lower foreground" (the plate covers the
middle band; the panel foot is the open presence zone, so the waterline should read there). Files:
`kontor-bruges.png` · `kontor-london.png` · `kontor-bergen.png` · `kontor-novgorod.png` · `kontor-hall.png`.

- **kontor-bruges.png** — a Flemish canal-side merchant wharf: stepped-gable brick trading houses on a stone
  quay, ONE wooden treadwheel crane, laden flat barges, still canal water across the foreground; slate-blue over warm brick.
- **kontor-london.png** — the walled riverside trading enclave (the Steelyard): stone river-gate + timber warehouses
  behind a busy wharf, a small crane, one moored cog, wide calm water; warm golden-ochre afternoon light.
- **kontor-bergen.png** — the Bryggen harbourfront: tall narrow pointed wooden gabled trading houses (ochre/rust/green),
  jetties with dried fish and barrels, cold fjord + dark mountains behind, pale northern light.
- **kontor-novgorod.png** — a white-stone walled river compound with helmet-domed churches over a broad slow river,
  wooden palisade + log jetty, birches and early snow, cold pale light with red-brown accents.
- **kontor-hall.png** — the candlelit brick-Gothic guild-hall interior: soaring dark timber roof, long oak tables,
  ONE venerated beer cask enshrined on a stone dais between tall candles, amber glow into violet shadow.

## Ship tiles — subject: the neutral Hanseatic hull the cask is loaded onto
- **ship-cog.png** — *a single-masted, clinker-built Hanseatic **cog** with one square sail, a small sturdy
  merchant ship, moored at a wooden wharf in calm harbor water; modest size.* Cool **blue-grey sea** tones.
- **ship-hulk.png** — *a larger Hanseatic **hulk** with a broad rounded hull and a big square sail, a heavier
  cargo carrier, under open sky on the Baltic/North Sea.* Slightly grander, warmer **sea-green/blue** tones.

## Building cards — subject: the Hanseatic institution / structure itself
Each building is a recognizable medieval structure, centered, with calm sky above and calm ground/water below
for the overlaid name (top) and effect/cost (foot). *Value buildings = trading privileges & patrons; transform
buildings = the brewer's craft & harbor works.* The subjects used:

- **building-richberth.png** — a prime stone-and-timber deepwater dock berth, mooring posts & bollards, a richly laden ship's bow at the best berth.
- **building-staple.png** — a grand staple warehouse (Stapelhaus), a tall stepped-gable brick hall with great loading doors, bales & crates stacked before it.
- **building-burgomstr.png** — a stately burgomaster's gabled patrician townhouse, fine brickwork, a small crest above the door.
- **building-connoiss.png** — a vaulted Ratskeller tasting cellar, stone arches by candlelight, fine casks and a goblet of dark beer.
- **building-hansediet.png** — the great Hanseatic assembly hall (Hansetag chamber), a grand civic hall with arched doorway and banners.
- **building-festkeller.png** — a lively festival beer hall, a timbered hall hung with garlands and banners, full casks and long tables.
- **building-reliquary.png** — a small ornate stone chapel / reliquary shrine, a relic casket on an altar beneath a rose window.
- **building-almoner.png** — a humble almshouse / almoner's charity stall, a modest dispensary with a bread shelf and alms bowl.
- **building-ch_bruges.png** — the Bruges kontor house (Hanzehuis), an elegant Flemish stepped-gable brick merchant house by a canal.
- **building-ch_london.png** — the London Steelyard (Stalhof), a walled riverside compound of brick warehouses on the Thames, gate and crane.
- **building-ch_bergen.png** — the Bergen Bryggen, a row of tall narrow colourful wooden Hanseatic wharf houses along the quay.
- **building-ch_novgo.png** — the Novgorod Peterhof, a fortified Russian timber trading yard with a log stockade and a small onion-domed church behind.
- **building-maltkiln.png** — a malthouse with a malt kiln, a tall pyramidal kiln roof with a vent cowl, golden malt drying, a warm fire glow.
- **building-hopyard.png** — a hop garden, tall timber trellises strung with climbing hop vines heavy with green cones, a drying shed behind.
- **building-cooperage.png** — a cooper's workshop, stacks of barrel staves and iron hoops, a half-built cask on a workbench.
- **building-customs.png** — a customs & toll house at the harbour gate, a small fortified gatehouse with a weighing beam, scales and a tollbar.
- **building-gauger.png** — a gauger's office, a small counting house where casks are measured with gauging rods and rulers.
- **building-workshop.png** — a brewmaster's workshop, a brewhouse interior with a great gleaming copper kettle, mash paddles, steam rising.
- **building-salthouse.png** — a salt warehouse, a timber storehouse with gleaming white mounds of sea salt and salt sacks (the salt trade).
- **building-smokekiln.png** — a smokehouse / smoke kiln, a dark timber curing hut with drifting blue woodsmoke from its roof.
- **building-partigyle.png** — a brewing tun-house, a large wooden mash/lauter tun splitting the runnings, wort flowing into vessels.

### v3.0-A — the five works (historical): only Mission Quay survived into the v4 deck
Pilot's House / Open Staithe / Rope Walk / Grain Exchange were cut with the v4.0 streamline —
their briefs are retired with them. **building-missionq.png LANDED 2026-08-02:** a small seamen's
mission chapel on the quay, a lantern over its door, nets and a moored skiff beside.

### v4.5b — the dice-pass buildings + the Braumeister — ALL LANDED 2026-08-02 (stand-ins retired)
- **building-racking.png** — a racking hall (interior): two casks side-by-side on a stillage with a siphon hose running between them, beer mid-transfer.
- **building-assay.png** — an assay office (interior): a clerk's bench with a balance scale, a gauging rod and a sample tankard of beer by candlelight.
- **building-hopex.png** — a hop exchange: an arcaded market stall heaped with sacks of green hop cones, a hanging steelyard scale.
- **building-tollhouse.png** — a tollhouse on the quay: a striped toll bar over the cartway, a strongbox at the window.
- **building-bonded.png** — a bonded store: a stone-vaulted warehouse with casks behind an iron grille, a great padlock and a customs seal on the door.
- **building-abbey.png** — an abbey cellar (interior, v45d): a candle-lit stone undercroft, great tuns racked in the vaults, a lantern glowing on a barrel.
- **improve-braumeister.jpg** — a long wooden mash paddle over a gleaming copper kettle (the specialist object-shot grammar: one tool, beige field).

### v4.6 "Guildbook" — the art pass of 2026-08-02 (all landed; generated with gen.py, this doc's model note)
*The v4.0 core actions (their stand-ins retired):*
- **building-granary.png** — a tall timber-framed granary barn, a raised loading door with a hoist beam, grain sacks stacked before it. *(shipped with a `trimframe` mat crop)*
- **building-scriveners.png** — a narrow stepped-gable brick scrivener's hall, one tall leaded window glowing, an arched oak door.
- **building-hiringpost.png** — a small open-sided timber muster hall on the wharf, rope coils and tool racks under its deep eaves.

*The v4.6 deck additions:*
- **building-victual.png** — a victualling yard: a wide-doored timber provisioning store by the quay, stacked crates, netted sacks and water casks.
- **building-exchange.png** — a merchants' exchange: an arcaded stone hall, open ground-floor loggia, a small bell turret. *(band-cropped — see the letterbox gotcha)*
- **building-capstan.png** — a great wooden warping capstan alone on a stone quay, hawser wound on its drum, push-bars fitted, bollards and harbor water behind. *(band-cropped)*

*The guild-eight specialists (object shots — the components.js spec; one tool on the flat beige field):*
- **improve-guild-scholar.jpg** — a bundle of sealed recipe scrolls tied with cord, red wax seals.
- **improve-innkeeper.jpg** — a foaming glazed stoneware ale jug with a pewter lid.
- **improve-supercargo.jpg** — a rolled ship's manifest with a hanging wax seal across a rope-bound sea chest.
- **improve-chronicler.jpg** — an open leather-bound chronicle with a goose-quill pen (pages blank — the no-text rule).
- **improve-alderman.jpg** — a gilded chain of office with a medallion on a crimson velvet cushion.
- **improve-town-crier.jpg** — a polished brass handbell with a turned dark-wood handle.
- **improve-chandler.jpg** — a hand-held balance: a sack of barley on one pan, green hop cones on the other (the G↔H swap in one read).
- **improve-shipwright.jpg** — a shipwright's adze resting across a curved oak ship-rib timber.

> **The LETTERBOX gotcha (learned this pass — add it to the mat gotchas above):** wide-scene and
> interior subjects intermittently come back as a 16:9 painting inside flat dark bars (top/bottom) —
> a failure the cream-mat classifier cannot see. Append *"the painting fills the WHOLE square — no
> letterbox, no flat solid bands at the top or bottom edge; paint the sky (or ceiling) to the very
> top edge and the ground (or floor) to the very bottom edge"*, and compose interiors vertically.
> If bands persist, the deterministic fix: detect flat rows (per-row stddev &lt; ~6 on grayscale),
> crop the bands, center square-crop, upscale to 1024².

## Notes
- Keep all ten cask images **consistent** (same wharf, same angle/lighting) so the deck reads as one family —
  only the wood/contents/mood change per beer. Same for the two ships, and for the 18 live building designs
  (painterly single-structure portraits; the specialists are the second family — woodcut object-shots on the
  flat beige field, spec in `components.js`).
- If a beer's color clashes with its card tint, lean the art toward the card's color (the card's `--c`
  shows through the scrim at the edges).

## Queued (2026-08-09 — designer, off the v4.12 review)
- **icons/bonus-load.png REPLACEMENT** — the *Load 1 more* load-bonus wants its **own,
  distinct icon**: today `bonus-load.png` reads too close to the generic load/package
  glyph, and the verb (an EXTRA cask going aboard, on top of the load you already made) has
  no visual of its own. Brief: a small wax-sealed cask swinging from a rope-and-hook (or a
  dockside crane arm) **above a ship's open hold** — the extra cask in mid-air, going
  aboard. Same c.1350 sticker treatment as the rest of `art/icons/` (one object, warm
  palette, transparent margin, readable at .3in). **Keep the filename** (`bonus-load.png`)
  so the kit swaps it in with no code change.

## Queued (2026-08-17 — the Tastings-board kit pass)
- **building-chancery.png** — the GUILD CHANCERY tile (v4.16b, the Guildhall sheet) has no
  art yet; the building card renders art-less and the page logs a 404. Brief: a clerk's
  writing office off the guildhall — a standing desk, ledger and seal wax, a rack of
  folded letters (the ⚜ Invitations going out). Same painterly single-structure treatment
  as the other 18 building portraits (one building, warm palette, consistent angle/light)
  so the family reads as one.

## v5.1 "Wharf Hands" — new building tiles (2026-08-19)
- **building-ropewalk.png** — a long medieval ropewalk shed on the quay: twisted hemp
  strands stretched down a narrow timber gallery, coils of finished rope by the door;
  the c.1350 sticker-set style (chunky, warm parchment palette, no text).
- **building-weighhouse.png** — a stone Hanseatic weigh house (Waag): a great iron beam
  balance hanging over the door, sacks and a barrel on the scale pans; same sticker style.

## v5.1 — new specialist tiles
- **improve-broker.jpg** — a wax-sealed ledger and a small coin scale on a market cloth
  (the Broker); object-shot on parchment, purple-tile framing as the other specialists.
- **improve-brewer-s-mate.jpg** — a young brewer hefting a long mash rake beside an open tun
  (the Brewer's Mate); same object-shot framing.

## v5.2b — the Source-3 station face (2026-08-22)
- **goods-3.png** — the Market PRIMARY face rose to Source 3 (v5.2b): the round-5
  numbered-Source treatment exactly (the goods basket + the landed numeral), a "3"
  in place of the "2". Until it lands, the board prints the plain basket (`goods.png`)
  as the stand-in — swap the ICON_ART 'goods-3' entry to 'goods-3' when the file exists.

## v5.3b — THE GENERATION LIST (2026-08-22, the kit wording/restyle pass — the open queue in one place)

*Everything the kit currently fakes with a stand-in, ranked. Icons take the c.1350
sticker treatment (`art/icons/` — one object, warm palette, transparent margin, readable
at .3in); tiles take the painterly single-structure portrait treatment (same wharf
angle/light as the other building faces).*

### Icons
1. **bourse.png — NEW, the highest-value icon on the list.** *(2026-08-22: the tally-board round REJECTED — “a market establishing prices wouldn’t be a plank with a stick in a hole”; rebriefed FORMAL: an abacus / a banner-mounted track / a fine rail-and-slider price board — options round out.)* The Bourse has no period
   glyph: every price-shift face (the Tollhouse toll bench · the Factor's Desk / Guild
   Residence ±1 chips · the Staple Rights +2▲ chip · the Bourse strip header · the aid
   legend) currently falls back to the lucide `trending-up` arrow — the one modern glyph
   left on the table. Brief: a merchant's **tally board with a peg moved up a notch** —
   a small dark-wood board with a column of drilled holes, a bone peg sitting one hole
   higher, a subtle upward arrowhead worn into the wood. One object; the ±1/+2▲ numerals
   print BESIDE the icon, so the icon carries no number.
2. **goods-3.png** — **LANDED 2026-08-22** in the corrected AGE-icon numeral recipe (size .42H, stroke .028H, drop shadow — goods-2 re-cut to match); the ICON_ART stand-in flipped.
3. **bonus-load.png replacement** — REBRIEFED 2026-08-22 (designer): a cask on a dock CART, a ship behind — you can load a cask anywhere; the crane-sling concept retired. Options round out.
4. *(Optional)* **trigger chips** — `load:` / `sail:` / `line:` print as words today
   (the kit-pass shorthand). Three tiny glyphs (a cask on a hook · a departing sail · a
   two-station bracket) would finish the icon-first grammar; words are acceptable until
   then.

### Building tiles (Public Works)
1. **building-ropewalk.png** — **LANDED 2026-08-22 (pick C** — the stone-quay gallery**)**; the Capstan stand-in retired.
2. **building-weighhouse.png** — **LANDED 2026-08-22 (pick E** — the dark-stone Waag**)**; the gauger stand-in retired.
3. *(Optional)* **Staple House crest variants ×4** (`building-staple-bruges/london/
   bergen/novgorod.png`) — all four share the generic `building-staple.png` today; each
   tile already prints its Kontor crest chip, so one shared portrait is playable. A
   variant set (the same warehouse, the port's banner over the door) would let the four
   read apart at arm's length.

### Venture tiles ×8 — ALL EIGHT LANDED 2026-08-22 (the options round's picks)
Rack House C · Brewery A · Counting House C · Assay Loft A · Factor's Desk C · Staple
Rights A · Warehouse C · Guild Residence B — saved as `venture-<k>-l<1|2>.png`, the eight
`art:` fields in `components.js` VENTURES swapped over (mats/letterbox bands cropped at
landing). The borrowed-portrait era ends. Original briefs kept below for regeneration: Save as `venture-<k>-l<1|2>.png`;
the eight `art:` fields in `components.js` VENTURES swap over when they land. Portraits
want a **smaller, private-workshop scale** than the civic Public Works — these are the
player's own yard:
- **venture-rack-l1.png** *Rack House* (now: Racking Hall art) — a low timber rack shed,
  two cask cradles, a cellarman's ladder.
- **venture-rack-l2.png** *Brewery* (now: Abbey art) — a private brewhouse: copper
  kettle through the door, steam at the louvre, the owner's pennant.
- **venture-counting-l1.png** *Counting House* (now: Granary art) — a narrow gabled
  counting room, a lit window, coin chest and ledger visible.
- **venture-counting-l2.png** *Assay Loft* (now: Assay art) — an upper-floor loft with
  a fine balance at the window, hop samples in dishes.
- **venture-factor-l1.png** *Factor's Desk* (now: Exchange art) — a factor's writing
  desk under a quayside awning, manifests on a spike.
- **venture-factor-l2.png** *Staple Rights* (now: Rich Berth art) — a charter with a
  great seal nailed to a warehouse door, casks queued beneath.
- **venture-warehouse-l1.png** *Warehouse* (now: Hop Exchange art) — a half-timbered
  private store, crane beam over the loading door.
- **venture-warehouse-l2.png** *Guild Residence* (now: Mission Quay art) — a stepped-
  gable townhouse with the guild chain over the lintel — the VP face, the richest
  portrait of the eight.

### Specialists — LANDED 2026-08-22
- **improve-broker.jpg** (pick A — ledger + coin scale on the cloth) · **improve-brewer-s-mate.jpg** (pick E — the young brewer at the tun, the one figure-shot in the object family, designer-ruled).

## The specialist object-shot SPEC (moved verbatim from components.js, 2026-08-22)

```
// ============================================================================
// SPECIALIST TILE ART — IMAGE-GENERATION SPEC (for the art agent; v2.6.1)
// ============================================================================
// Generate ONE image per Specialist, saved as art/improve-<slug>.jpg (JPEG, not PNG — a flat-field
// object shot with no transparency needs no alpha channel, and compresses ~8x smaller at quality
// ~88 with no visible loss; every other art/ family stays .png) where <slug> = the kit's own
// slug(d.nm) (lowercased, non-alphanumeric runs → a single hyphen — e.g. Coppersmith →
// improve-coppersmith.jpg, Grain Factor → improve-grain-factor.jpg; NOTE the hyphen — a prior
// version of this comment said "grainfactor"/"hopgardener" with no hyphen, which does not match
// what slug() actually emits at runtime; always derive the filename from slug(), not by hand).
// STYLE (all seven, identical treatment):
//   • a plain warm BEIGE field (parchment #e9dcc0-ish), edge-to-edge — NO scene, NO border
//   • ONE object centered — the specialist's trade tool (the art: brief on each row below);
//     medieval-woodcut / muted-gouache feel, readable at 1 inch print size
//   • no text, no people, no player-colour hues (the purple foot bar is added by the kit)
// The card is now SQUARE (2in×2in, matching the Building card): this art sits full-bleed behind a
// scrim; name on top, effect+cost in the purple foot — so keep the object in the middle 60% of the frame.
// The briefs (also carried per-row as art:'…'):
//   coppersmith    → a gleaming copper brew kettle                     (legacy file)
//   cellarman      → an oak cask racked on a wooden stillage
//   grain-factor   → a tied burlap sack overflowing with barley
//   hop-gardener   → a climbing hop bine with cones on a tall pole
//   stevedore      → a medieval wooden treadwheel harbor crane
//   braumeister    → a long wooden mash paddle over a copper kettle (v4.5b)
//   lagerkeeper    → stacked casks dusted with frost and icicles        (legacy file)
//   quaymaster     → a private wooden jetty with a rope-wound mooring bollard (legacy file)
// The guild eight (v4.6 — all landed 2026-08-02):
//   guild-scholar  → a bundle of sealed recipe scrolls (red wax seals)
//   innkeeper      → a foaming glazed stoneware ale jug with a pewter lid
//   supercargo     → a sealed ship's manifest across a rope-bound sea chest
//   chronicler     → an open chronicle with a goose-quill pen (blank pages)
//   alderman       → a gilded chain of office on a crimson velvet cushion
//   town-crier     → a polished brass handbell, dark-wood handle
//   chandler       → a hand balance — barley on one pan, hop cones on the other
//   shipwright     → a shipwright's adze across a curved oak ship rib
// ============================================================================
```
