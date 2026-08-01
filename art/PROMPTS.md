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
- Buildings (v5 — 2″ building CARDS, full-bleed art behind the name/effect/cost): `building-<key>.png`,
  one per `BUILDINGS` key in `print.html` — `building-richberth.png` · `building-staple.png` ·
  `building-burgomstr.png` · `building-connoiss.png` · `building-hansediet.png` · `building-festkeller.png` ·
  `building-reliquary.png` · `building-almoner.png` · `building-ch_bruges.png` · `building-ch_london.png` ·
  `building-ch_bergen.png` · `building-ch_novgo.png` · `building-maltkiln.png` · `building-hopyard.png` ·
  `building-cooperage.png` · `building-customs.png` · `building-gauger.png` · `building-workshop.png` ·
  `building-salthouse.png` · `building-smokekiln.png` · `building-partigyle.png`.
  (The building card BACK is the generic Wild + ★ "displaced" face — no art.)

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

### v3.0-A — the five NEW works (queued; printables2 rides interim stand-ins until these exist)
- **building-pilot.png** — a harbour pilot's house on a headland, a small lookout tower with a signal beacon and a pilot gig boat below. *(stand-in: ship-cog.png)*
- **building-staithe.png** — an open riverside staithe, casks racked in the open air on a timber wharf, sun and drying breeze. *(stand-in: building-festkeller.png)*
- **building-ropewalk.png** — a long low ropewalk shed, great coils of hemp rope and a rope-twisting frame stretching into perspective. *(stand-in: ship-back.png)*
- **building-grainex.png** — a grain exchange hall, an open arcaded corn market with sacks, scoops and a balance scale. *(stand-in: building-gauger.png)*
- **building-missionq.png** — a small seamen's mission chapel on the quay, a lantern over its door, nets and a moored skiff beside. *(stand-in: building-reliquary.png)*

### v4.5b — the five DICE-PASS buildings + the Braumeister (queued; the kit rides interim stand-ins until these exist)
- **building-racking.png** — a racking hall: two casks side-by-side on a stillage with a siphon hose running between them, beer mid-transfer. *(stand-in: building-partigyle.png)*
- **building-assay.png** — an assay house: a clerk's bench with a balance scale, a gauging rod and a sample tankard of beer under a wax seal. *(stand-in: building-connoiss.png)*
- **building-hopex.png** — a hop exchange: an arcaded market stall heaped with sacks of green hop cones, a hanging steelyard scale. *(stand-in: building-hopyard.png)*
- **building-tollhouse.png** — a tollhouse on the quay: a striped toll bar over the cartway, a stamped ledger and a strongbox at the window. *(stand-in: building-burgomstr.png)*
- **building-bonded.png** — a bonded store: a stone-vaulted warehouse with casks behind an iron grille, a great padlock and a customs seal on the door. *(stand-in: building-salthouse.png)*
- **improve-braumeister.jpg** — a long wooden mash paddle over a gleaming copper kettle (the specialist object-shot grammar: one tool, beige field). *(stand-in: a copy of improve-coppersmith.jpg, shipped as improve-braumeister.jpg)*
- **building-abbey.png** — an abbey cellar (v45d): a candle-lit stone undercroft beneath a monastery, great tuns racked in the vaults, a monk with a lantern. *(stand-in: building-festkeller.png)*

## Notes
- Keep all ten cask images **consistent** (same wharf, same angle/lighting) so the deck reads as one family —
  only the wood/contents/mood change per beer. Same for the two ships, and for the 21 building structures.
- If a beer's color clashes with its card tint, lean the art toward the card's color (the card's `--c`
  shows through the scrim at the edges).
