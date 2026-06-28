# Background art for the cards & tiles (printables2.html)

These images sit **behind** the cask cards (2.5″ square) and ship tiles (2.5″ square) in
`printables2.html`. A card's own text/icons are drawn on top, with a dark scrim for legibility.

## How to use
1. Generate each image (prompts below) with **gemini-3.1-flash-image**.
2. Save it into this `art/` folder with the **exact filename** listed.
3. In `printables2.html` set `const ART_ON=false` → **`true`** (search "ART slot").
   Until then the slot shows a faint diagonal-hatch placeholder.

## Filenames (the code maps to these)
- Casks: `cask-gruit.png` · `cask-hopped.png` · `cask-broyhan.png` · `cask-keut.png` ·
  `cask-mumme.png` · `cask-bock.png` · `cask-gose.png` · `cask-zerbster.png` ·
  `cask-duckstein.png` · `cask-jopenbier.png`
- Ships: `ship-cog.png` · `ship-hulk.png`
- Buildings (v5 — 2″ building CARDS, full-bleed art behind the name/effect/cost): `building-<key>.png`,
  one per `BUILDINGS` key in `printables2.html` — `building-richberth.png` · `building-staple.png` ·
  `building-burgomstr.png` · `building-connoiss.png` · `building-hansediet.png` · `building-festkeller.png` ·
  `building-reliquary.png` · `building-almoner.png` · `building-ch_bruges.png` · `building-ch_london.png` ·
  `building-ch_bergen.png` · `building-ch_novgo.png` · `building-maltkiln.png` · `building-hopyard.png` ·
  `building-cooperage.png` · `building-customs.png` · `building-gauger.png` · `building-workshop.png` ·
  `building-salthouse.png` · `building-smokekiln.png` · `building-partigyle.png`.
  (The building card BACK is the generic Wild + ★ "displaced" face — no art.)

> **Model note (current):** generated with Google's **`gemini-3.1-flash-image`** (nano-banana class) via the
> Generative Language API — `:generateContent` with `responseModalities:["IMAGE"]` + `imageConfig.aspectRatio:"1:1"`.
> The reusable generator (`gen.py`) lives in the session scratchpad; **the API key is never committed.**
> `ART_ON` is already `true` in `printables2.html`. Output is JPEG-in-`.png` at 1024² — the same as the
> existing cask/ship art (browsers decode by content, not extension).

## Shared style block — paste at the top of EVERY prompt
> Medieval Hanseatic League harbor town, c. 1350. Hand-painted illustration in the style of an aged
> manuscript illumination / old-map vignette — painterly, soft warm light, muted earthy palette.
> **FULL-BLEED square 1:1 composition: the painted scene fills the ENTIRE square edge to edge, bleeding
> off all four sides — especially the LEFT and RIGHT edges, where the surrounding town/landscape continues
> past the frame. ABSOLUTELY NO parchment border, NO paper margin, NO frame, NO vignette ring, NO drawn
> frame line, NO cream/ivory mat, NO rounded corners — the artwork goes right to every edge.** No text,
> no letters, no numbers, no signs/signage, no people in the foreground, no modern objects. **Frame the
> MAIN SUBJECT as a complete, wide establishing view: the whole structure is fully visible and comfortably
> contained with a little breathing room — it must NOT be awkwardly cropped or run off the top, and it sits
> naturally in a setting that extends to the left and right edges.** Keep the **top ~22% and bottom ~28%**
> visually simple and a touch darker (calm sky / shadow / still water / muted ground or ceiling) so overlaid
> card text stays readable — **but do NOT leave an empty band; the painting still fills those areas.**
> Slightly desaturated and low-contrast so it reads as a background. ~1024×1024, PNG.

> **Why this changed (v6 art pass):** the earlier block asked for a "gentle parchment texture / subtle
> vignette" and to "place the subject in the center band" — which baked a parchment border into the output
> and cropped interior subjects (Connoisseur's Cellar, Brewmaster's Workshop, Parti-Gyle Tun felt cut off).
> The full-bleed + complete-subject framing above fixes both. **Two gotchas to watch:** (1) a proper place
> name in the subject (e.g. "Bergen Bryggen", "Novgorod Peterhof") can make the model paint a **text title
> banner or a gate sign** — describe the structure generically and append an explicit "no written words /
> no signage" instruction; (2) the model still occasionally adds a parchment mat anyway — append an explicit
> "no parchment border / no drawn frame line / bleeds off all four edges" instruction and regenerate.

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

## Notes
- Keep all ten cask images **consistent** (same wharf, same angle/lighting) so the deck reads as one family —
  only the wood/contents/mood change per beer. Same for the two ships, and for the 21 building structures.
- If a beer's color clashes with its card tint, lean the art toward the card's color (the card's `--c`
  shows through the scrim at the edges).
