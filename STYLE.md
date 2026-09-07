# Brewhouses of the Hanse — Term Registry & Style (v1.1 · 2026-08-03)

**This file is rank 1.** Every word printed on a component comes from this registry; the
general style guide (the designer's house standard) sits in §G below and governs sentence
shape. Rulebook = `RULES.md`. Code identifiers (`p.bank`, `specGate`, `DEST[..].gate`,
`S.ladingRow`) are NOT player-facing and keep their names — only printed/rendered copy is
governed here.

## §1. Term Registry — nouns

| Canonical | POS | Definition | Icon | Plural | Caps | Banned variants | Locked |
|---|---|---|---|---|---|---|---|
| player | n | You; the person at a seat ("brewing house" survives as Overview flavor only) | — | players | No | ~~house~~ | ● |
| Kontor | n | One of the four trading posts of the League (Bruges · London · Bergen · Novgorod) | landmark | Kontore | Yes | ~~port~~, ~~destination~~ (reserved for a future category of delivery sites) | ● |
| Destinations board | n | The board holding the four Kontor panels + the Manifest deck well (v5.0) | — | — | Yes | ~~Kontor board~~, ~~kontor mats~~ | ● |
| Market & Stores board | n | The shared displays (Ships · buildings · Specialists · recipes) ringed by the score track | — | — | Yes | ~~Supply board~~ | ● |
| the Wharf | n | The shared core: 4 stations ringed by 8 slots | anchor | — | Yes | ~~the board~~ | ● |
| station | n | One of the 4 action spaces (Market · Brewhouse · Cellar · Harbor) | — | stations | No | ~~space~~, ~~cell~~ | ● |
| slot | n | One of the 8 perimeter spaces; seats a building and/or a Ship | — | slots | No | — | ● |
| line | n | A row or column: 2 stations + their 2 slots | layout-grid | lines | No | — | ● |
| quality die | n | THE component (full name at first mention: **cask quality die**): the die shows the cask's current quality — maturation, value, presence, clock | dices | quality dice | No | ~~tally die~~, ~~demand die~~ | ● |
| tray | n | Your unspent quality dice (empty tray = the end trigger) | — | trays | No | ~~pool~~ (dev term) | ● |
| cask | n | A brewed beer on a tile, its quality die riding it | beer | casks | No | — | ● |
| vessel | n | An aging slot on your player board | — | vessels | No | — | ● |
| Ship | n | A neutral tile bound for a printed Kontor: Skute 1 · Cog 2 · Hulk 3 | sailboat | Ships | Yes | ~~hull~~ (allowed for the empty tile in Capstan copy only) | ● |
| berth | n | One cask space on a Ship | — | berths | No | — | ● |
| minimum | n | A Kontor's printed die floor, read as the cask boards (die N+) | dice-N | minimums | No | ~~gate~~ | ● |
| requirement | n | A printed condition that must read true off your components before a Specialist may be seated | — | requirements | No | ~~seat-gate~~, ~~gate~~, ~~prerequisite~~ | ● |
| Specialist | n | A private purple tile; 2 seats per player | wrench | Specialists | Yes | ~~improvement~~, ~~upgrade~~ | ● |
| seat | n | A Specialist space on your player board | — | seats | No | — | ● |
| building | n | The umbrella noun for both slot families (v5.2): a Public Work or a Venture | building-2 | buildings | No | ~~privilege~~ (retired family) | ● |
| Public Work | n | The shared brown family: die-less furniture — 3–4 stand at random from setup, the rest are the bag; passive on its slot's traffic; never built in play; **every one sails away with the Ship at its slot** (v5.4, the tide) | building-2 | Public Works | Yes | ~~public building~~ | ○ v5.4 |
| investor | n | RETIRED at v5.3 (the Public Works are die-less setup furniture) — historical: the v5.2 builder whose die ticked on use | — | — | — | — | ✕ v5.3 |
| matures | v | RETIRED at v5.3 with the investor's die — historical: the v5.2 die-reaches-6 payout | — | — | — | — | ✕ v5.3 |
| Venture | n | A private dual-use tile (v5.2): owner-only, the owner's colour ring, no die; **one THEME per tile (v5.5)** — its L1 on one face, its own theme's L2 on the other | home | Ventures | Yes | ~~private building~~ (prose ok, never printed) | ○ v5.2 |
| L1 / L2 | n | A Venture tile's two faces: L1 plays from hand onto open ground; L2 is reached by the FLIP or the OVERBUILD (v5.5) | — | — | Yes | ~~level one~~ spelled out | ○ v5.2 |
| the FLIP | n | Turning your own standing L1 over in place to its own theme's L2 — no hand tile spent, the L2 fee paid (v5.5) | repeat | flips | Yes | ~~upgrade~~ · ~~flip up~~ | ○ v5.5 |
| overbuild | v | Spending a SECOND hand tile L2-side up onto one of your own L1s (that L1 boxed) — the way a different theme's L2 reaches ground you hold (v5.5) | — | overbuilds | Yes | ~~build over~~ · ~~replace~~ (that is the Public Work rule) | ○ v5.5 |
| theme | n | One of the Venture hand's four: **brew · age · die · points** — one tile each, so only one side of a theme is ever facing (v5.5) | — | themes | Yes | ~~suit~~ · ~~track~~ | ○ v5.5 |
| the Ladder | n | RETIRED at v5.3 (the open ground replaced it) — historical: the v5.2/v5.2b build-order rule | — | — | — | — | ✕ v5.3 |
| the open ground | n | The v5.3 placement rule: an L1 takes any open slot; wharf full → it may replace a Public Work; never another player's L1/L2 | — | — | Yes | — | ○ v5.3 |
| the Bourse | n | The beer-value market: one track (−1…+3 ⚙) **printed on the Destinations board (v5.6)**, a price marker per in-play beer except Gruit & Jopenbier; a delivered cask scores die + marker. **It only falls on its own** | trending-up | — | Yes | ~~market~~ (the Market is the station) · ~~beer market~~ in component text | ○ v5.3 |
| the glut | n | The v5.6 rule: after a sail resolves, **each beer TYPE that was aboard steps its marker down one** — once per beer, never per cask. Prose noun; no component prints the word | — | — | No | ~~the crash~~ (the retired brew rule) · ~~decay~~ | ○ v5.6 |
| price marker | n | A beer's marker on the Bourse track. **Colour-matched to its beer and printed with the beer's NAME** (v5.6); every marker starts at the top | — | price markers | Yes | ~~value marker~~ · ~~beer token~~ in rules copy | ○ v5.3 |
| shift | v | Move a price marker (±1 or ±2) — Bergen's prize + the Ventures' public lines | trending-up | shifts | Yes | ~~manipulate~~ on components (rules prose may say the market is manipulated) | ○ v5.3 |
| public line | n | The top line of a Venture face — fires for whoever activates a line through the slot | — | public lines | Yes | — | ○ v5.3 |
| owner line | n | The ringed private line of a Venture face — the owner alone (the owner collects both lines) | — | — | Yes | ~~private action~~ | ○ v5.3 |
| Staple House | n | The destination-premium Public Work family (×4): a matching sail from its slot pays every cask +2★ ⚙. The four tiles print PROPER NAMES (ruled 2026-08-23): **Bruges Hanzehuis · London Steelyard · Bergen Bryggen · Novgorod Peterhof** — "Staple House" is the family noun in rules copy | landmark | Staple Houses | Yes | ~~Staple~~ alone in rules copy | ○ v5.2 |
| recipe | n | A card granting permission to brew a beer | scroll-text | recipes | No | — | ● |
| exports | n | The four dealt-3-of-4 beers (Broyhan · Keut · Mumme · Bock) | — | — | No | — | ● |
| the Flight | n | Your completed (shipped) recipe cards — moved to the board’s COMPLETED side on that beer’s first load (v4.9d); scores (n−1)² | unlock | — | Yes | — | ● |
| stack | n | A beer's face-up cask-tile supply (v5.0; simplified v7.0a): **every Brew searches it and chooses the tile** — the top-tile draw is retired; a delivered cask's tile returns to the bottom | — | stacks | No | ~~pile~~ (the pre-v5.0 term) | ● |
| primary action | n | The action a station fires when YOUR worker stands on it (v5.0) | — | — | No | — | ● |
| alternate action | n | The lesser action a station fires as the line's OTHER station (v5.0) | — | — | No | ~~alt~~ (allowed as the chip label only) | ● |
| ~~Manifest~~ | n | **RETIRED at v5.7** — the demand card left the kit; the Bourse is the demand layer. Lineage kept: ~~lading~~ → ~~Contract~~ → ~~Order~~ → ~~Manifest~~. *Boarding order* survives as the sequence noun | — | — | — | — | ✕ v5.7 |
| presence | n | Your parked dice at a Kontor | map-pin | — | No | ~~bump~~ (the act is "place presence") | ● |
| prize | n | What a Kontor pays the cask's owner on delivery — **always the port's thing OR ★, the owner's choice per cask (v5.6)**. There is no consolation | — | prizes | No | ~~benefit~~, ~~reward~~, ~~fallback~~ (retired at v5.6) | ● |
| fee | n | The wharf price printed on an acquirable item | — | fees | No | ~~cost~~ (generic ok), ~~price~~ | ● |
| goods | n | Grain + hops, collectively | coins | — | No | ~~resources~~ | ● |
| display | n | A face-up row components are taken from (Ships 4 · buildings 4 · Specialists 4) | — | displays | No | ~~pool~~ (face-down decks and general stock = "supply") | ● |
| score track | n | The 50-cell ring; your disc records ★ scored in play | star | — | No | ~~the bank~~ | ● |
| step | n | +1 on an aging die ("Age 3" = 3 steps, split freely) | — | steps | No | ~~age point~~ | ● |
| ★ | n | The scoring unit — the glyph, on every surface | star | — | — | ~~VP~~, ~~points~~ (text), ~~stars~~ (text) | ● |

## §2. Verb lexicon (locked — no synonyms in printed copy)

| Verb | Means | Banned variants |
|---|---|---|
| **score** | Add ★ to your score-track disc at once | ~~bank~~ |
| **deliver** | A cask resolves at its Kontor: score the die, park it, take the prize | ~~ship (v)~~, ~~sell~~ |
| **sail** | A full Ship departs; its casks then deliver in boarding order | ~~ship (v)~~, ~~depart~~ |
| **park** | Set a quality die on the Destinations board (pips up) | ~~place~~ (for dice) |
| **place presence** | Park 1 tray die (face 1) at a Kontor you have delivered to | ~~bump~~ |
| **board** | A cask moves from your vessel onto a berth (the minimum reads the die here) | ~~embark~~ |
| **load** | Put 1 Ready cask from your vessels onto a docked Ship | — |
| **brew** | Pay a recipe; a tray die becomes the cask at its start value | — |
| **age** | Turn an aging die up (stops at the quality: Ready); the Cellar prints **Age 3** | ~~mature (v)~~ |
| **lift** | A building turns the boarding die past its quality (cap 6) | ~~boost~~ |
| **commission** | Harbor: pay the Ship's printed fee (Skute 2 G · Cog 1 G · Hulk free — v4.8), place it on a slot without a Ship | ~~buy a ship~~, ~~charter~~ |
| **build** | Place a building tile from the display on a slot; the builder stands a tray die on it at the tile's printed start face (v4.9b — every use turns it up; pips score at game end) | ~~raise~~, ~~place~~ (for buildings), ~~construct~~ |
| **seat** | Place a Specialist into an open seat | ~~hire~~ (allowed as the load-bonus label only) |
| **claim** | Take a Manifest demand line your delivered cask satisfies; score its ★ at once (each line once per voyage) | ~~fulfil~~ |
| **resolve** | Work through your station's stops: its 2 printed actions + its 2 flanking slots — any order, each once, all optional | ~~resolve the stops~~ |
| **gain / spend / pay** | Per the house guide §4.5 | — |
| **warp** | Move an empty hull to another shipless slot (Capstan) | ~~move~~ (for ships) |
| **overbuild** | Build on an occupied slot (one payment; the old tile is boxed) | — |

Trigger words per guide §4.4 — **"whenever" is banned**: use *when* (single moment) or
*each time* (repeats). **"stop" (n) is banned in player copy** — a rider building fires
*with the station action on its line* (the tile prints `[host icon] here:` — v5.1); an
action building fires *when you resolve its slot*; a load-lift fires *when a cask loads
here*.

## §3. Canonical orders (every surface, no exceptions)

| Category | Master order |
|---|---|
| Goods | Grain · Hops |
| Stations | Market · Brewhouse · Cellar · Harbor (Source → Brew → Age → Ship… spoken: the work order) |
| Kontore | Bruges · London · Bergen · Novgorod |
| Beers | Gruit · Hopped · Broyhan · Keut · Mumme · Bock (by quality, Broyhan before Keut) |
| Scoring | Delivered dice · Scored in play · Majorities · Buildings (the standing dice) · the Flight · Guild ★ |
| Ships | Skute · Cog · Hulk |
| A turn | Move · Work the station |

## §4. Applied decisions

*2026-08-02, designer-called:*

1. **~~bank~~ → score.** "Banks 5★" → "scores 5★"; "banks at once" → "score at once"; the
   scoring category "the bank" → **"scored in play"** (column label: *scored*).
2. **~~gate~~ → minimum** (Kontor die floor) and **requirement / "requires:"** (Specialist
   condition). Two concepts, two words; "gate" survives nowhere on a component.
3. **Deliver / Sail / ~~ship (v)~~.** One verb per beat: a full Ship **sails**; each cask
   **delivers**. "Ship" is a noun only. ("Voyage" = the counter noun for a completed sail.)
4. **~~bump~~ → place presence** (the die **parks** at face 1; Town Crier: at face 2).
5. **~~whenever~~ → when / each time** (Grain Factor, Hop Gardener, Supercargo, Stevedore
   cards re-templated).

*2026-08-03, designer-called (the fifteen-item review):*

6. **~~house~~ → player** in all rules copy; "a merchant brewing house" survives only as
   Overview flavor (the fiction, not the seat).
7. **Kontor locked** — ~~port~~ and ~~destination~~ banned for the four; plural **Kontore**;
   "destination" is reserved for a future *category* of delivery sites (the Hall, a trade
   map). "Trading post" allowed once as the flavor gloss.
8. **The Destinations board** = the board with the four Kontor panels AND the Manifest
   deck well (v5.0 — the Order row retired; the cards ride the Ships).
9. **~~lading~~ → ~~Contract~~ → ~~Order~~ → Manifest** (v5.0, designer-ruled 2026-08-18 —
   "item 2B with the manifest"; the Order tile leaves the kit whole). The old Order/order
   collision dissolves with it; printed copy still prefers **boarding order** for the
   sequence ("deliver in boarding order"). A card's three conditions are its **demand
   lines** ("claim ONE demand"); the deck is **the Manifest deck**.
10. **~~tally die~~ → quality die** (full name **cask quality die** at first mention — the
    die shows the cask's current quality).
11. **The building verb is build** (~~raise~~, ~~place~~ banned); the builder stands a die on
    the tile (v4.9); the load bonus reads **Build 1 building**.
12. **★ is written as the glyph everywhere** — "points" and "stars" as text are banned on
    every surface, learn-page prose included. ~~Age points~~ → **Age N** (N steps, split
    freely).
13. **~~printed verb~~ → printed action.**
14. **The turn step is "resolve the line"** (~~resolve the stops~~); "stop" leaves player
    copy entirely.
15. **~~maturing~~ → aging** (the state adjective; *age* stays the verb; Ready unchanged).
16. **~~pool~~ → supply / display** (supply = face-down decks + general stock; display =
    a face-up row).
17. **The printed rulebook (`rulebook.html`) is a snapshot** — no version tags, no change
    history, no dev pointers; it reads as the only rulebook a new player will ever see.
    Versions and rationale live in `DESIGN.md`; the maintained rules master is `RULES.md`.

Dev shorthand (bank, gate, bump, pool, lading, tally, GM/CM…) stays legal in `CLAUDE.md`,
`DESIGN.md` history, `AUTOMA.md`, `archive/`, code identifiers, and playtest harnesses —
the registry governs what a PLAYER reads.

## §4b. Provisional entries (v4.15 — in play, NOT yet designer-locked)

| Term | POS | Definition | Locked |
|---|---|---|---|
| Invitation | n | The ⚜ letter-CARD that admits a cask to a Tasting: earned per Manifest claim (v5.0) and at the Guild Chancery; each player starts with 2 (v4.17b); spent to pour (v4.17; a card since 2026-08-18) | ○ provisional |
| the Guild Tastings / the Hall | n | The contest board (v4.17): the open Tasting row + the Taproom floor | ○ provisional |
| ~~enshrine~~ · ~~shelf~~ · ~~the crown~~ | — | RETIRED with the shelf Hall (v4.17 — the tastings replace the lexicon) | — |
| Guild Chancery | n | The Hall’s building (v4.16b): resolve its slot → gain 1 ⚜ Invitation; always dealt in hall mode | ○ provisional |
| Tasting | n | A contest tile (v4.17): a category + a bench of die spaces + the prize ladder; capitalized like Manifest | ○ provisional |
| pour | v | Enter a Tasting: spend 1 ⚜ + a matching Ready cask — its die stands on the bench (v4.17) | ○ provisional |
| bench | n | A Tasting’s printed die spaces; the bench filling IS the judging | ○ provisional |
| the Taproom floor | n | The board strip where judged dice stand (committed — the audit) | ○ provisional |
| convene | v | A bench fills and is judged; an unconvened bench at game end pays 1★/die | ○ provisional |
| the champion’s tour | n | The winning cask’s die parks as presence (face 1) at a Kontor its owner has delivered to (v4.17b) | ○ provisional |
| ~~rider~~ | — | RETIRED grammar (v5.2 — the rider scope A/B read NULL and the two-family split replaced it; a building modifies its OWN slot's traffic, never a station action) | — |
| ~~Scrivener's Hall~~ · ~~Hiring Post~~ · ~~Almoner's Stall~~ | — | RETIRED tiles (v5.1 — the shelf turn; acquisition = Kontor prizes + load bonuses; presence placement is FREE and flows only through casks) | — |
| Ropewalk · Weigh House | n | Public Works: the Ropewalk's cross-quay load (v5.2 — a load here also loads 1 Ready cask onto a DIFFERENT Ship) · the Weigh House's two Manifest lines per cask delivered off the Ship here | ○ provisional |
| the tide | n | The v5.4 rule that every **Public Work** sails away with the Ship at its slot (boxed, never recycled); the **bag** re-furnishes the wharf at end of turn until it runs dry, so the late wharf thins into open ground. Prose noun — no component prints the word | — | — | Yes | ~~ephemeral~~ (the whole family is ephemeral now — the word no longer distinguishes a tile) | ○ v5.4 |
| the bag | n | The Public Works supply: the tiles setup did not stand. Draw from it at end of turn to re-furnish the wharf | shopping-bag | — | No | ~~the Works deck~~ (it is a bag, like Ships and Specialists) | ○ v5.4 |
| the toll bench | n | The Tollhouse's v5.3b face (prose nickname — the tile still titles *Tollhouse*): a cask loading at its slot lets the LOADER shift any price marker ±1; the stamp (−1 die for +3★) is RETIRED | ○ provisional |
| trigger words (tiles) | — | The ruled component grammar (2026-08-23, supersedes the `load:`/`sail:` shorthands): **On load** (a cask loads at this slot) · **On sail** / **On sail to <Kontor>** (a Ship sails from this slot) · **On line** (a line through this slot is activated) · **At end** · **At turn start**. A face with more than a bare trigger+action puts the TRIGGER ON ITS OWN LINE, the action below it — the cask tiles' icon+text pattern is the model. Icon-first after the trigger, never a sentence | ● ruled |
| ~~Broker~~ · ~~Brewer's Mate~~ | — | RE-DERIVED at v6.0 → **Pilot** · **Surveyor** (§4d) — the v5.1 alternates retired with the line activation | ✕ v6.0 |
| parti-gyle | n/adj | Zerbster’s printed signature (v4.15b): as the cask boards, an optional free Gruit into an open vessel (a tray die), then Load 1 more | ○ provisional (period brewing term — the second runnings) |
| smoke-hardy | adj | Duckstein’s printed signature: its die turns +1 as it boards (cap 6) | ○ provisional |

*(Designer to lock or rename on the next registry pass; printed copy uses these until then.
Salt Trade left the printed faces at v4.15b — no entry needed.)*

## §4c. THE GOLDEN RULE (designer-ruled 2026-08-23)

**Rules never live in the components — not the physical tiles, not the web components, not
the boards, and not the play interface.** Players learn rules from the rulebook and the
player aid; they do not learn or track rule changes on tiles, boards, or tooltips.

1. **Component copy = name + trigger + effect.** Nothing else: no family lore, no design
   history, no "how this fits the game." E.g. a tile prints *On load* / *1 marker ±1*; the
   app tooltip reads *Tollhouse (Public Work): On load, adjust 1 Bourse marker ±1.* — and
   stops there.
2. **Boards carry data and slots, never paragraphs.** A track prints its cells and labels;
   the teaching lives in the rulebook.
3. **Tooltips are reminders in the same grammar** — one line, plain English, mirroring the
   printed face; never a lesson.
4. **Nothing prints in all caps (designer-ruled 2026-09-06).** An action name is Title Case
   wherever it names the action — *Build · Brew · Post · Raise · Cart · Flip · Load · Commission
   · Source · Age · Present · Move* — matching *Source 2 / Load 1 / Age 3* on the boards; a
   state is sentence case (*Ready* keeps its capital as a term; *empty · wild · vacant* do not);
   emphasis is **bold**, never capitals; a heading may set title-case text in small caps
   (CSS), never `text-transform: uppercase`. The same casing on every surface — the rules
   master, the rulebook, the aid, the faces, the app's prompts, buttons and log.
5. **A rule that has no printed home yet lives in `RULES.md` only.** In-development systems
   (e.g. the Guild Tastings) stay OUT of `rulebook.html` until they leave development —
   rules live in `RULES.md` and `rulebook.html`, nowhere else.

## §4d. The v6 term family (PROVISIONAL — reserved 2026-08-29; locked at the `V6-PLAN.md` Phase 2 registry pass)

*Reserved now so every v6 draft uses ONE vocabulary from the first sketch. Player copy
does not print these until Phase 2 locks them; the designer renames freely at that pass.*

| Term | POS | Working definition | Collision notes |
|---|---|---|---|
| voyage | n | A loaded Ship's passage across the map, departure → landing | **RE-DERIVATION:** the v5 sense (§4.3, "the counter noun for a completed sail") retires with the instant sail; one word, one meaning — Phase 2 confirms |
| lane | n | A sea route on the map: a chain of legs from the Wharf to a Kontor | — |
| leg | n | One printed segment of a lane; a Ship at sea stands on exactly one | — |
| chart | v | Open a closed leg (pay its printed fee); first to chart takes the leg's printed privilege | **NEAR-COLLISION:** ~~charter~~ stays banned as a commission synonym (§2); *chart* is map-opening ONLY and never touches ship acquisition |
| landing | n | The moment a Ship enters its Kontor space — casks deliver, **priced at the marker printed at landing** | — |
| post | n | Your marker on a waypoint leg; fires its printed line as your Ships pass | — |
| factor | n | Your standing piece at a Kontor — destination development; its benefit prints on the Kontor panel | *Grain Factor* (Specialist) keeps its name; context separates crew from standing — Phase 2 re-reads |
| the current | n | The drift: at the printed cadence ⚙ every Ship at sea advances one leg, together, in one visible sweep | **"the tide" is TAKEN** (§4b, the v5.4 Public Works rule) — the drift is never called the tide |
| destination | n | The §4.7 reservation ("a future *category* of delivery sites — a trade map") comes due in v6 | Phase 2 rules its exact scope vs the locked *Kontor* |
| upgrade | v | Deepen a standing marker via CHART: a post flips onto an establishment tile; a factor flips to the Kontorhaus (v6.1) | never *build/develop* — one verb for the move |
| establishment | n | The post-upgrade tile family (scarce supply, 2 each ⚙): **Toll Court · Victualling Post · Pilot's Rest** — the tile IS the state | — |
| Kontorhaus | n | The factor's upgraded side; its power prints ON the Kontor panel, one per port | **the proper names Hanzehuis/Steelyard/Bryggen/Peterhof are TAKEN** (§4b, the Staple House faces) — the generic *Kontorhaus* on purpose |
| Wharfinger | n | The tolls Specialist (v6.1 re-derive of the Chandler's swap): your posts' tolls +1 G | *Chandler* retires from the roster with its swap |
| ~~the walk~~ | — | RETIRED at v6.3 — the turn frame is again the v5 **line activation** (MOVE adjacent · row/column · stops), so *line* (§4) is the word; the stations print **PRIMARY / ALTERNATE** single verbs — each ALT the station's own lesser counter (v6.4: Market Source 3/Chart · Brewhouse Brew/Trade · Harbor Commission/Sail · Cellar Age 3/Load-any) | ✕ v6.3 |
| ~~the line (turn term)~~ | — | RETIRED at v6.5 — the AP cut: a turn is MOVE adjacent · **work the station** (its OWN PRIMARY + ALTERNATE + a load at each of its two flanking slots, any order, all optional); *line* survives as board-geometry prose only, and the **On line** trigger (§4b) is dormant pending the Phase 2 re-read | ✕ v6.5 |
| Pilot | n | The turn-start drip Specialist (v6.0 re-derive of the Broker): a Ship with your cask advances one leg | *Grain Factor*-style crew noun; the art rides the broker stand-in |
| Surveyor | n | The chart Specialist (v6.0 re-derive of the Brewer's Mate): your passage & post fees waived (factor-side fees stand) | — |
| On enter | trig | The sea tile trigger (v6.1): a Ship enters this leg — the establishment grammar; a condition follows per §4 (e.g. *On enter · your cask aboard*) | joins the ruled tile-trigger set (§4b) at the Phase 2 lock |

## §4e. The v7 term family (PROVISIONAL — reserved 2026-08-31; locked at the v7 registry lock)

*Reserved so every v7 surface uses ONE vocabulary from the first build. The designer
renames freely. The §4d v6 sea family (voyage · lane-as-map · leg · chart · landing ·
post · factor · the current · establishment · Kontorhaus · On enter · Pilot · Surveyor ·
Wharfinger) is RETIRED with the sea map — historical, never printed again.*

| Term | POS | Working definition | Collision notes |
|---|---|---|---|
| Venture | n | RE-DERIVED (v7): the private family returns — the themed hand of 4 dual-use tiles (v5.5 cardboard), now carrying the owner's **ledger die** | the v5.2–v5.5 entries above describe the retired grammar; the FLIP and theme entries carry |
| ledger die | n | The tray die standing on a Venture at face 1 (one die per ground, for life — it rides the FLIP and the overbuild); **each time the Venture serves a RIVAL it turns +1** (cap 6; past the cap a rival serve pays the owner 1★ ⚙); the owner's own use ticks nothing; its pips score to the owner at game end | amends the v5.3 "no die on a building" law for Ventures ONLY (designer-directed, D2); Public Works stay die-less |
| build | v | RE-DERIVED (v7 · re-channeled v7.0b): place or advance ONE of your Venture tiles (an L1 onto open ground or replacing a Public Work · the FLIP · the overbuild); the fee prints on the face going down. **Never a station verb** — the only doors are a cask's **BUILD load bonus** (its printed fee) and **London's prize** (the fee waived) | the v4.9 investor sense in §2 is historical |
| the second kettle | n | The Brewhouse's ALTERNATE (designer-ruled v7.0a, same day): a **second full Brew** — search and choose like any brew — at **the recipe's cost + 1 hop** ⚙ | supersedes ~~the second runnings~~ (a one-day term: it named the top-tile draw, retired with it — every brew searches now); *the double kettle* stays the station's nickname; *parti-gyle / second runnings* survives only as Zerbster's flavor |
| lane gate | n | The per-player unlock of a far Kontor: open **while your parked dice at the branch's gateway OUTNUMBER your parked dice at the far Kontor** (London ← Bruges · Novgorod ← Bergen) | *chart* (v) stays retired; nothing is charted in v7 |
| LAND | v | The umbrella event: a sailed cask arrives at its Kontor and resolves as a DELIVER or a PRESENT — rules keyed to "land" fire either way (the Chronicler · the first-landing letter · presence eligibility) | splits the old ~~deliver~~ overload; §2's *deliver* entry narrows to resolution A |
| present | v | Resolve a landed cask at the Kontor's hall: spend 1 ⚜ + match the demand card + take an open seat — score **die + the card's bonus** (no marker, no glut, no premium, no prize); the die parks ON the seat (a parked die of the Kontor); the ladder advances | ~~pour~~ (the Tastings verb) retires with the expansion |
| contract | n | A display card printing a LOAD condition; CLAIMED by a matching load (one claim per turn ⚙). Lineage: ~~lading~~ → ~~Contract~~ → ~~Order~~ → ~~Manifest~~ (all retired) → **contract returns** (v7) | the demand layer is the Bourse + demand cards, never the contract |
| claim / draw | v | **CLAIM** = take a matching contract from the DISPLAY on a load (the Herald pays on claims); **DRAW** = take the contract deck's top card (the first-landing letter) | two verbs, never mixed |
| Invitation (⚜) | n | A claimed or drawn contract, kept face-up — the guild's admission, spent to PRESENT | carries the §4b ⚜ identity; the Tastings expansion that minted it retires |
| demand card | n | The face-up card in a Kontor's well (its own 12-card deck ⚙; never Gruit): a requirement + a hall bonus ★ + the market line (*a matching DELIVER here +1★* ⚙) + 2 die seats; full → it retires, a fresh one deals at end of turn | — |
| majority ladder | n | The Kontor panel's printed 6-step track of 1st/2nd payouts; **every ⚜ spent there advances its marker** | ~~the Ladder~~ (v5.2 build-order rule) stays retired — "majority ladder", always qualified |
| private flag | n | Your one flag marker: planted at commission (+1 `G` ⚙), it makes the hull yours alone (your casks, your early sail); it returns when the Ship sails | — |
| sail | v | RE-DERIVED (v7): a Ship sails — full (automatic) or early via the Harbor's ALTERNATE (any docked Ship with 1+ of YOUR casks; a flagged hull only by its owner). One verb, one meaning again; the v6 leg-advance sense retires | ~~depart~~ (v6) retires |
| the tide | n | CARRIES (v5.4): every Public Work departs with the Ship that sails from its slot — but v7 retires **the bag**: nothing refills; the wharf strips to open ground | — |
| Coper | n | The market's one hand (specialist ⚙): after your landing resolves, step ONE beer you landed +1 | period beer-trader; designer to confirm the name |
| Herald | n | The contracts specialist ⚙: each claim pays 1 `G` 1 `H` | — |

## §4f. The v8 term family (PROVISIONAL — reserved 2026-09-06 at the v8.0 build; locked at the v8 registry pass)

*Reserved so every v8 surface uses ONE vocabulary from the first build. The designer renames
freely. The §4e v7 family entries below that name a retired grammar (the ledger die · lane gate
· contract · claim/draw · demand card · majority ladder · private flag · the second kettle ·
Coper · Herald) are RETIRED with v7 — historical, never printed again.*

| Term | POS | Working definition | Collision notes |
|---|---|---|---|
| personal supply | n | Your unspent quality dice, a pile beside your player board; the first EMPTY supply sets the final round | supersedes ~~tray~~ (§1), which retires from every surface |
| Hamburg | n | The home port; the root of the sea board's tree; where the Wharf stands | theme only until printed on the sea board |
| the sea board | n | The board printing Hamburg, the cart road, the five segments and the four Kontor panels; side A (2p) / side B (3–4p) | replaces the ~~Destinations board~~ (§1), retired |
| lane | n | RE-DERIVED: the branch of segments from Hamburg to one Kontor | the §4d map sense returns in this form |
| segment | n | One printed step of a lane; prints one post seat per colour | supersedes ~~leg~~ (§4d) |
| branch | n | The segments a Kontor's lane runs through, Hamburg to the Kontor (Novgorod's includes E1) | — |
| post | n | RE-DERIVED: a die of yours at face 1 in your seat on a segment; +1 each time any Ship sails through; scores its pips | the §4d marker sense retires |
| POST | v | Stand a supply die as a post on the lowest segment of a lane you do not yet hold (the commission's post · the cask bonus · the Shipping Office · London's prize) | — |
| unlocked / open | adj | A segment is unlocked while any post stands on it; a lane is open while every segment of its branch is unlocked — open to every player | — |
| the chain | n | Your own posts on every segment of a branch; the prerequisite for a Kontor building there | — |
| Kontor building | n | One of your three Kontor building tiles (Warehouse · Kontorhaus · Guildhouse) placed in a Kontor's slot and marked with a supply die at face 1; the die is the delivery modifier (+1 per landing there) and scores its pips | *Kontorhaus* re-derives from §4d as a TILE name; *Warehouse* returns re-faced |
| building slot | n | A far Kontor panel's printed space for one Kontor building; one builder per slot; one per player per Kontor | ~~socket~~ · ~~seat~~ (Kontor sense) retire; *seat* stays for specialists and post seats |
| RAISE | v | Turn one die of yours at sea +1 (cap 6): the Harbor's second arm, Novgorod's prize, the Counting House, the Shipping Office, the Guildhouse | ~~raise~~ was banned as a build synonym (§2); it is now its own verb, never a build |
| the quality count | n | The number of your dice standing at sea (posts + building dice, the starter post included): the quality you may deliver anywhere | ~~YOUR MINIMUM~~ retires |
| minimum | n | RE-DERIVED: a far Kontor's printed quality floor (Q2), read against the beer's printed quality as the cask boards | the §1 die-floor sense retires |
| wild Ship | n | A Ship with no printed Kontor; the FIRST cask loaded names its Kontor with a chit | — |
| Kontor chit | n | The token that names a wild Ship's Kontor, set on the hull by the first load | — |
| the cart / CART | n / v | The Cellar's ALTERNATE: one Ready cask of yours to Bruges by road; its cask bonus fires as it is carted | — |
| the yard | n | Bruges' goods door: a track of places in three zones (BEST · GOOD · OK); the carted die parks on the next place and takes the zone's prize; Gruit's only door | — |
| the hall | n | RE-DERIVED: Bruges' guild of brewmasters; a Q2+ cask and 1 ⚜; cask die + the hall die; the die parks on the next place | the §4b Tastings sense is retired |
| the hall die | n | The neutral die on the Bruges panel, starting at 2, +1 per present, cap 6; in no count, no pips | — |
| place | n | One of the hall's or the yard's printed die spaces | ~~bench~~ retires |
| present | v | RE-DERIVED: enter the hall (1 ⚜ + a Q2+ cask); at Bruges only, by cart | — |
| Invitation (⚜) | n | RE-DERIVED: a token, earned 1 per cask of yours landing at a far Kontor (+1 with a Kontorhaus), spent to present; no cap | — |
| private building | n | The family players build on the wharf: a tile of yours on any VACANT slot (never over a Public Work, never a rival's tile — designer-ruled 2026-09-06), tier 1 / tier 2 (the FLIP), owner-only, no die, printed points 2 / 4; it fires **On visit** | supersedes ~~Venture~~ |
| On visit | trig | The private building tile's trigger: its line fires when its OWNER works the station its slot flanks — the slot picks the station, not the tile's name (designer-ruled 2026-09-06) | joins the §4b tile-trigger set |
| tier 1 / tier 2 | n | A private building tile's two faces (replaces ~~L1 / L2~~ as the printed label; the FLIP carries); the points print as the `star-2` / `star-4` glyph alone (v8.0e) | — |
| the warm Gruit | n | The Ready Gruit every player starts with in vessel 1: its own die (the twelfth, never from the supply) at 1 on it, the top Gruit tile under it (v8.0e) | KEPT from the v5 warm start |
| BUILD | v | RE-DERIVED: one build you are eligible for — a private building or a FLIP on the wharf, or a Kontor building at a Kontor whose chain you hold; three doors: the Brewhouse's ALT (wharf) · the Harbor's ALT (Kontor) · the cask bonus · London's prize | the §4e v7 sense retires |
| Granary · Kaufhaus · Scriptorium · Brewers' Guildhall · Cold Store · Lagering Cellar · Counting House · Shipping Office | n | The eight private building faces | *Cold Store*, *Lagering Cellar*, *Counting House* return re-faced |
| Warehouse · Kontorhaus · Guildhouse | n | The three Kontor building tiles: the Warehouse *vouches* (your count reads +1 for a Ship bound there — a standing read, v8.0d); the Kontorhaus and the Guildhouse fire on your landing | — |
| pay X: Y | grammar | The at-cost line (designer-ruled 2026-09-07, v8.0d): a printed price, a colon, a verb — paying is optional ("may"), the verb then fires once; the Granary / Kaufhaus *pay 1 G: Brew once* · the Bonded Store *On sail: each shipper may pay 1 G: Post on its lane*. Cost before effect (§G §4); on a face the `G` chip, a colon, the verb's icon | never *buy*, never *for*; no building hands out goods |
| Shipmaster · Agent · Lodesman · Carter · Guildmaster | n | The new specialists (§13 of the rules) | *Agent* avoids the §4d *factor* collision |
| the tide | n | KEPT: every Public Work departs with the Ship at its slot; a private building never | — |
| LAND | v | KEPT, narrowed: a sailed cask arrives at its Kontor and scores cask die + your building die there | — |
| the Flight | n | RE-DERIVED: distinct beers LANDED (tiles under your dice at the Kontore, the yard and the hall), 3/6/10 | — |
| lift | v | KEPT, narrowed: a wharf building turns a die past its quality, cap quality + 1 | the LIFT cask bonus retires |

**Retired at v8 (never printed again):** tray · the second kettle · kettle · Mash Tun · Great
Copper (as licences) · YOUR MINIMUM · socket · market cell · quality band · market track /
price marker · the Bourse · shift · the glut · Venture · ledger die · overbuild · theme · L1 / L2
· the open ground · lane gate · contract · claim / draw · demand card · demand well · majority
ladder · ladder marker · private flag · SAIL (as a station verb) · presence placement · Place 1
presence · Coper · Herald · Shipwright · Guild Scholar · Town Crier · Supercargo · Innkeeper ·
Assay Loft · Rack House · Staple Rights · Weigh House (until the pass) · Skute · the bag · the
first-landing letter · INVEST · OPEN · leg · factor · establishment · bench.

## §5. Deferred to the next copy pass (logged, not yet applied)

- Em-dash purge + passive-voice pass over `RULES.md` prose (guide §7/§9) — the rulebook
  reads well but predates the guide; a full §13 scan is a dedicated pass.
- Title-case audit of card titles and type lines (§3).
- The localization fill targets (§11) — English currently runs past 75% in the aid backs.
- "pips" vs "face" kept as registered (two concepts: the number showing vs the side up);
  revisit on the §14 pass-6 cold read.

---

# §G. The house style guide (v1.0, the designer's standard — governs sentence shape)

*The full text as issued 2026-08-02; the registry above is its §2 filled in.*

**Three sources of truth, ranked:** 1. the Term Registry above · 2. this guide · 3.
`RULES.md`. Card text never introduces a rule the rulebook does not contain. The rulebook
never uses a word the registry does not define.

Key sections applied in this repo today: §1 first principles (component text is interface;
one term, one meaning; costs before effects; icons carry load; every word costs) · §4
templating (clause order **[Timing] [Condition] [Cost] [Effect] [Limit] [Duration]**; one
effect per line; ":" after trigger/cost; the trigger-word table; the verb lexicon; "you
may" = optional, bare imperative = mandatory) · §5 numbers (numerals always; number before
icon; en-dash ranges; true minus) · §6 canonical order + the mirror rule · §7 punctuation
(serial comma; no em dashes or semicolons in player copy; bold = registry terms, italic =
flavor/reminder) · §13 banned constructions (the scan list) · §14 change control (term
freeze before art lock; the seven proofing passes).

For the complete general standard (localization, accessibility, component caps, QA
matrix), see the designer's style-guide document of 2026-08-02 — adopt-by-reference; any
conflict resolves in the order above.
