# Brewhouses of the Hanse — Term Registry & Style (v1.0 · 2026-08-02)

**This file is rank 1.** Every word printed on a component comes from this registry; the
general style guide (the designer's house standard) sits in §G below and governs sentence
shape. Rulebook = `RULES.md`. Code identifiers (`p.bank`, `specGate`, `DEST[..].gate`) are
NOT player-facing and keep their names — only printed/rendered copy is governed here.

## §1. Term Registry — nouns

| Canonical | POS | Definition | Icon | Plural | Caps | Banned variants | Locked |
|---|---|---|---|---|---|---|---|
| Kontor | n | One of the four delivery ports (Bruges · London · Bergen · Novgorod) | landmark | kontore | Yes | ~~port~~, ~~destination~~, ~~trading post~~ (flavor only) | ○ |
| the Wharf | n | The shared core: 4 stations ringed by 8 slots | anchor | — | Yes | ~~the board~~ | ● |
| station | n | One of the 4 action spaces (Market · Brewhouse · Cellar · Harbor) | — | stations | No | ~~space~~, ~~cell~~ | ● |
| slot | n | One of the 8 perimeter spaces; seats a building and/or a ship | — | slots | No | — | ● |
| line | n | A row or column: 2 stations + their 2 slots | layout-grid | lines | No | — | ● |
| tally die | n | The one component: cask maturation, value, presence, clock | dices | tally dice | No | ~~demand die~~ | ● |
| tray | n | Your unspent tally dice (empty tray = the end trigger) | — | trays | No | ~~pool~~ (dev term) | ● |
| cask | n | A brewed beer on a tile, die riding it | beer | casks | No | — | ● |
| vessel | n | A maturation slot on your player board | — | vessels | No | — | ● |
| Ship | n | A neutral hull bound for a printed Kontor: Skute 1 · Cog 2 · Hulk 3 | sailboat | Ships | Yes | ~~hull~~ (allowed for the empty tile in Capstan copy only) | ● |
| berth | n | One cask space on a Ship | — | berths | No | — | ● |
| minimum | n | A Kontor's printed die floor, read as the cask boards (die N+) | dice-N | minimums | No | ~~gate~~ | ○ |
| requirement | n | A printed condition that must read true off your components before a Specialist may be seated | — | requirements | No | ~~seat-gate~~, ~~gate~~, ~~prerequisite~~ | ○ |
| Specialist | n | A private purple tile; 2 seats per house | wrench | Specialists | Yes | ~~improvement~~, ~~upgrade~~ | ● |
| seat | n | A Specialist space on your player board | — | seats | No | — | ● |
| building | n | A green tile on a slot; serves whoever activates it | building-2 | buildings | No | ~~work~~, ~~privilege~~ (retired families) | ● |
| recipe | n | A card granting permission to brew a beer | scroll-text | recipes | No | — | ● |
| the Flight | n | Your flipped (brewed) recipe cards; scores (n−1)² | unlock | — | Yes | — | ● |
| lading | n | An order tile: a Kontor + a condition → printed ★ | scroll-text | ladings | No | ~~order~~ (ok as gloss), ~~goal~~, ~~contract~~ | ○ |
| presence | n | Your parked dice at a Kontor | map-pin | — | No | ~~bump~~ (the act is "place presence") | ○ |
| prize | n | What a Kontor pays the cask's owner on delivery | — | prizes | No | ~~benefit~~, ~~reward~~ | ● |
| fee | n | The wharf price printed on an acquirable item | — | fees | No | ~~cost~~ (generic ok), ~~price~~ | ● |
| goods | n | Grain + hops, collectively | coins | — | No | ~~resources~~ | ● |
| score track | n | The 50-cell ring; your disc records ★ scored in play | star | — | No | ~~the bank~~ | ○ |
| ★ | n | The scoring unit (spoken "stars") | star | — | — | ~~VP~~, ~~points~~ (prose ok, never mixed on one surface) | ● |

## §2. Verb lexicon (locked — no synonyms in printed copy)

| Verb | Means | Banned variants |
|---|---|---|
| **score** | Add ★ to your score-track disc at once | ~~bank~~ |
| **deliver** | A cask resolves at its Kontor: score the die, park it, take the prize | ~~ship (v)~~, ~~sell~~ |
| **sail** | A full Ship departs; its casks then deliver in load order | ~~ship (v)~~, ~~depart~~ |
| **park** | Set a tally die on a Kontor mat (pips up) | ~~place~~ (for dice) |
| **place presence** | Park 1 tray die (face 1) at a Kontor you have delivered to | ~~bump~~ |
| **board** | A cask moves from your vessel onto a berth (the minimum reads the die here) | ~~embark~~ |
| **load** | Put 1 Ready cask from your vessels onto a docked Ship | — |
| **brew** | Pay a recipe; a tray die becomes the cask at its start value | — |
| **age** | Turn a maturing die up (stops at the quality: Ready) | ~~mature (v)~~ |
| **lift** | A building turns the boarding die past its quality (cap 6) | ~~boost~~ |
| **commission** | Harbor: pay 1 G, place a display Ship on a shipless slot | ~~buy a ship~~, ~~charter~~ |
| **raise** | Place a building tile on a slot (score +3★) | ~~build~~, ~~construct~~ |
| **seat** | Place a Specialist into an open seat | ~~hire~~ (allowed as the load-bonus label only) |
| **claim** | Take a matching lading on delivery; score its ★ at once | ~~fulfil~~ |
| **gain / spend / pay** | Per the house guide §4.5 | — |
| **warp** | Move an empty hull to another shipless slot (Capstan) | ~~move~~ (for ships) |
| **overbuild** | Raise on an occupied slot (one payment; the old tile is boxed) | — |

Trigger words per guide §4.4 — **"whenever" is banned**: use *when* (single moment) or
*each time* (repeats).

## §3. Canonical orders (every surface, no exceptions)

| Category | Master order |
|---|---|
| Goods | Grain · Hops |
| Stations | Market · Brewhouse · Cellar · Harbor (Source → Brew → Age → Ship… spoken: the work order) |
| Kontore | Bruges · London · Bergen · Novgorod |
| Beers | Gruit · Hopped · Broyhan · Keut · Mumme · Bock (by quality, Broyhan before Keut) |
| Scoring | Delivered dice · Scored in play · Majorities · the Flight · Guild ★ |
| Ships | Skute · Cog · Hulk |

## §4. Applied decisions (2026-08-02, designer-called)

1. **~~bank~~ → score.** "Banks 5★" → "scores 5★"; "banks at once" → "score at once"; the
   scoring category "the bank" → **"scored in play"** (column label: *scored*).
2. **~~gate~~ → minimum** (Kontor die floor) and **requirement / "requires:"** (Specialist
   condition). Two concepts, two words; "gate" survives nowhere on a component.
3. **Deliver / Sail / ~~ship (v)~~.** One verb per beat: a full Ship **sails**; each cask
   **delivers**. "Ship" is a noun only. ("Voyage" = the counter noun for a completed sail.)
4. **~~bump~~ → place presence** (the die **parks** at face 1; Town Crier: at face 2).
5. **~~port / destination~~ → Kontor** in rules copy ("trading posts" allowed once, in
   flavor). A Ship is "bound for its printed Kontor."
6. **~~whenever~~ → when / each time** (Grain Factor, Hop Gardener, Supercargo, Stevedore
   cards re-templated).

Dev shorthand (bank, gate, bump, pool, GM/CM…) stays legal in `CLAUDE.md`, `DESIGN.md`
history, `AUTOMA.md`, `archive/`, code identifiers, and playtest harnesses — the registry
governs what a PLAYER reads.

## §5. Deferred to the next copy pass (logged, not yet applied)

- Em-dash purge + passive-voice pass over `RULES.md` prose (guide §7/§9) — the rulebook
  reads well but predates the guide; a full §13 scan is a dedicated pass.
- Title-case audit of card titles and type lines (§3).
- The localization fill targets (§11) — English currently runs past 75% in the aid backs.

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
