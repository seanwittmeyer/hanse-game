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
| Public Work | n | The shared brown family (v5.3): die-less setup furniture — 3–4 stand at random from setup; passive on its slot's traffic; never built in play | building-2 | Public Works | Yes | ~~public building~~ | ○ v5.3 |
| investor | n | RETIRED at v5.3 (the Public Works are die-less setup furniture) — historical: the v5.2 builder whose die ticked on use | — | — | — | — | ✕ v5.3 |
| matures | v | RETIRED at v5.3 with the investor's die — historical: the v5.2 die-reaches-6 payout | — | — | — | — | ✕ v5.3 |
| Venture | n | A private dual-use tile (v5.2): owner-only, the owner's colour ring, no die; an L1 face and an L2 face on one tile | home | Ventures | Yes | ~~private building~~ (prose ok, never printed) | ○ v5.2 |
| L1 / L2 | n | A Venture tile's two faces: L1 plays from hand (the Ladder); L2 lands only over your own L1 (the Climb) | — | — | Yes | ~~level one~~ spelled out | ○ v5.2 |
| the Ladder | n | RETIRED at v5.3 (the open ground replaced it) — historical: the v5.2/v5.2b build-order rule | — | — | — | — | ✕ v5.3 |
| the open ground | n | The v5.3 placement rule: an L1 takes any open slot; wharf full → it may replace a Public Work; never another player's L1/L2 | — | — | Yes | — | ○ v5.3 |
| the Bourse | n | The beer-value market (v5.3): one track (−1…+3 ⚙), a price marker per in-play beer except Gruit & Jopenbier; a delivered cask scores die + marker | trending-up | — | Yes | ~~market~~ (the Market is the station) · ~~beer market~~ in component text | ○ v5.3 |
| price marker | n | A beer's marker on the Bourse strip | — | price markers | Yes | ~~value marker~~ | ○ v5.3 |
| shift | v | Move a price marker (±1, or +2▲ up-only) — Bergen's prize + the Ventures' public lines | trending-up | shifts | Yes | ~~manipulate~~ on components (rules prose may say the market is manipulated) | ○ v5.3 |
| public line | n | The top line of a Venture face — fires for whoever activates a line through the slot | — | public lines | Yes | — | ○ v5.3 |
| owner line | n | The ringed private line of a Venture face — the owner alone (the owner collects both lines) | — | — | Yes | ~~private action~~ | ○ v5.3 |
| Staple House | n | The destination-premium Public Work (×4, one Kontor crest each): a matching sail from its slot pays every cask +2★ ⚙ | landmark | Staple Houses | Yes | ~~Staple~~ alone in rules copy | ○ v5.2 |
| recipe | n | A card granting permission to brew a beer | scroll-text | recipes | No | — | ● |
| exports | n | The four dealt-3-of-4 beers (Broyhan · Keut · Mumme · Bock) | — | — | No | — | ● |
| the Flight | n | Your completed (shipped) recipe cards — moved to the board’s COMPLETED side on that beer’s first load (v4.9d); scores (n−1)² | unlock | — | Yes | — | ● |
| stack | n | A beer's face-up cask-tile supply (v5.0): a full Brew searches it and chooses the tile; the alternate takes the top tile; a delivered cask's tile returns to the bottom | — | stacks | No | ~~pile~~ (the pre-v5.0 term) | ● |
| primary action | n | The action a station fires when YOUR worker stands on it (v5.0) | — | — | No | — | ● |
| alternate action | n | The lesser action a station fires as the line's OTHER station (v5.0) | — | — | No | ~~alt~~ (allowed as the chip label only) | ● |
| Manifest | n | The demand card riding a non-Bruges Ship (v5.0): three **demand lines** (a beer/tier · a die-as-parked · a combo → ★); a delivered cask may claim ONE line it satisfies — each line once per voyage; the card returns under the deck at sail (hall mode: the claim also pays an ⚜ Invitation) | contract | Manifests | Yes | ~~Order~~ (the tile retired at v5.0; lineage ~~lading~~ → ~~Contract~~ → ~~Order~~ → Manifest), ~~goal~~ | ● |
| presence | n | Your parked dice at a Kontor | map-pin | — | No | ~~bump~~ (the act is "place presence") | ● |
| prize | n | What a Kontor pays the cask's owner on delivery | — | prizes | No | ~~benefit~~, ~~reward~~ | ● |
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
| **resolve** | Work through your line: its 2 stations + 2 slots — any order, each once, all optional | ~~resolve the stops~~ |
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
| A turn | Move · Choose a line · Resolve the line |

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
17. **The index.html rulebook is a snapshot** — no version tags, no change history, no dev
    pointers; it reads as the only rulebook a new player will ever see. Versions and
    rationale live in `RULES.md` / `DESIGN.md`.

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
| rider | n | The design term for a building's printed `[host icon] here:` line (v5.1): it boosts the matching STATION action fired on its line — primary and alternate alike, once per activation; the tile prints only the host-icon line + effect icons, never the word "rider" | ○ provisional |
| ~~Scrivener's Hall~~ · ~~Hiring Post~~ · ~~Almoner's Stall~~ | — | RETIRED tiles (v5.1 — the shelf turn; acquisition = Kontor prizes + load bonuses; presence placement is FREE and flows only through casks) | — |
| Ropewalk · Weigh House | n | The v5.1 building names (loads-here +1 · two Manifest lines per cask delivered off the Ship here) | ○ provisional |
| Broker · Brewer's Mate | n | The v5.1 Specialist names (your Market alternate is Source 2 · your Brewhouse alternate searches the stack) | ○ provisional |
| parti-gyle | n/adj | Zerbster’s printed signature (v4.15b): as the cask boards, an optional free Gruit into an open vessel (a tray die), then Load 1 more | ○ provisional (period brewing term — the second runnings) |
| smoke-hardy | adj | Duckstein’s printed signature: its die turns +1 as it boards (cap 6) | ○ provisional |

*(Designer to lock or rename on the next registry pass; printed copy uses these until then.
Salt Trade left the printed faces at v4.15b — no entry needed.)*

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
