# V5-OPEN-WHARF — the ruled v5.0 plan (2026-08-18)

**Status: RULED · this document is the implementation record** (the V4-STREAMLINE precedent).
Version **v5.0 "Open Wharf"** · save `KEY hanse-v50`. Source: the 2026-08-18 design session off
the 4-player human playtest (3 new players, 1 returning from v2) — the designer's brief: *less
tight, less a-vs-b, more fluid where needed* — followed by the three-item deep dive, the
critical re-read, and the ruling.

## 0 · The rulings (verbatim)

> "Ok, start with item 1. Upon delivery, cask tiles return to the stack. Then item 2B with the
> manifest. This should be optional but point bonuses. They should be generic but only apply to
> non-bruges ships. Bruge continues as is. The rest come from a manifest deck which displays 3
> beer types/quality requirements/combos each with a point value. Each only achievable once.
> Gate remains - ready and quality. Lastly, 3A is good. Use your revised suggestion."

> "Do the buildings and specialists after all of this after we check in."

**Scope fence:** the building rider pass and the specialist rewording pass are explicitly
DEFERRED — they follow this build *and a check-in*. Buildings and specialists ship UNCHANGED
here except where a retired system forces a rework (Chronicler · Merchants' Exchange — §4).

---

## 1 · Item 1 — THE CENSUS BREW (the piles become real, searchable stacks)

The Orléans/Altiplano read: brewing lets you sort through that beer's cask-tile stack and
CHOOSE the load bonus. Gruit stays all-same (pinned). **Ruled addendum: upon delivery, cask
tiles return to the stack** — flow depletion, not boxed depletion.

- **The engine models the PRINTED census.** Each beer's supply is an ordered face-up stack of
  its printed tiles (counts + verb mixes exactly as the kit cuts them — COMPONENTS §4):
  Gruit ×16 (pinned Source) · Hopped ×12 (source ×3 · age ×3 · load ×2 · reach ×2 · recipe ×2)
  · Broyhan ×6 (load·reach·recipe·survey·hire·brew) · Keut ×6 (hire·brew·source·age·load·reach)
  · Mumme ×6 (recipe·survey·hire·brew·source·age) · Bock ×6 (reach·recipe·survey·hire·brew·source)
  · expansion pinned: Gose ×8 (goods3) · Zerbster ×6 (zgyle) · Duckstein ×8 (reach) ·
  Jopenbier ×6 (source). Each stack is SHUFFLED at setup and sits face-up.
- **Brew (the full action) = SEARCH:** look through the beer's whole stack, take ANY tile —
  the chosen tile is the cask (its verb rides as the load bonus). This applies to the primary
  Brewhouse station, the `Brew 1 cask` load bonus, and every building that prints the brew verb.
- **The ALT Brewhouse (item 3) takes the TOP tile only** — the one constrained brew.
- **Depletion is real:** an empty stack = that beer cannot be brewed right now (every tile is
  out riding a cask). **A delivered cask's tile returns to the BOTTOM of its stack** (ruled);
  a cask consumed by a Tasting pour returns the same way. The warm-start Gruit takes a tile;
  Zerbster's free Gruit takes a tile (stack empty → the half lapses).
- The old one-face-up-card `pileTop` system retires (`pileDraw`/`refillPiles`/`takePileTop`).

*Why bottom, not shuffled back:* the return order is deterministic at the table (slide it
under), and it keeps the alt's top-tile honest — you can see what is coming.

## 2 · Item 2 — THE MANIFESTS (ruled 2B: generic demand cards on non-Bruges Ships)

**THE INTERPRETATION, STATED (flag for the designer to correct):** each Manifest card prints
**three demand lines** (a beer/tier condition, a die condition, or a combo — each with a printed
★ value). The card rides **every non-Bruges Ship**; **Bruges hulls stay plain** (the on-ramp
continues as is). When the Ship sails, each delivered cask **may claim ONE line it satisfies**
(owner's choice, resolved in boarding order); **each line is claimable once per voyage**; the ★
bank at once to the track. Purely **optional bonus — never a boarding gate** ("Gate remains —
ready and quality": READY and the Kontor minimum are the only gates, unchanged). When the Ship
sails, **the card returns to the bottom of the Manifest deck** — no tiles-at-seat, no record.

- **The deck: 12 cards ⚙** — covers the maximum float (8 slots + 4 display) so a non-Bruges
  hull is never dealt dry. A card is dealt the moment a non-Bruges hull enters the ship display
  (warm-start non-Bruges seeds included) and travels with the hull to its slot.
- **The line vocabulary (tier language — deal-proof under every draft):**
  named starters **Gruit 1★ · Hopped 2★** · tiers **Q2-or-under 1★ · Q3+ 2★ · Q4+ 3★** ·
  die **3+ 1★ · 4+ 2★ · 5+ 3★ · 6 3★** · combos **Q3+ & die 5+ 4★ · Q4+ & die 5+ 4★ ·
  Q4+ & die 6 4★ · Q≤2 & die 3+ 3★** (the lifted-fresh line). All values ⚙.
- **Die conditions read the PARKED face** (post-lift, pre-Novgorod-premium). A combo reads
  tier AND die on ONE cask.
- **Component-state audit:** claims resolve entirely inside the sail's delivery sequence (lay
  the claiming die on the line as you resolve, then park it) — nothing persists; the card goes
  back under the deck pristine. ★ live on the score track.
- **THE ORDER SYSTEM RETIRES WHOLE:** the 15-tile Order row/deck, `claimLading`, the row render,
  the player-board Orders zone, and the Order strips leave the kit. The Manifest is the demand
  layer's heir — the demand rides the SHIP you are racing to fill, which is the fluidity brief.
- **Hall re-seam:** the ⚜-Invitation-per-Order-claim (Tastings, paused) moves to
  **⚜ per Manifest line claimed** — same faucet grammar, `invGrant(src:'man')`.

### The manifest deck (⚙ all 12, three lines each)

| # | line 1 | line 2 | line 3 |
|---|--------|--------|--------|
| m1 | Hopped → 2★ | die 4+ → 2★ | Q4+ & die 5+ → 4★ |
| m2 | Gruit → 1★ | Q3+ → 2★ | die 6 → 3★ |
| m3 | Q≤2 → 1★ | die 5+ → 3★ | Q3+ & die 5+ → 4★ |
| m4 | die 3+ → 1★ | Q4+ → 3★ | Q≤2 & die 3+ → 3★ |
| m5 | Hopped → 2★ | die 4+ → 2★ | Q3+ & die 5+ → 4★ |
| m6 | Gruit → 1★ | Q4+ → 3★ | die 6 → 3★ |
| m7 | Q≤2 → 1★ | Q3+ → 2★ | Q4+ & die 5+ → 4★ |
| m8 | die 3+ → 1★ | die 5+ → 3★ | Q4+ & die 6 → 4★ |
| m9 | Gruit → 1★ | die 4+ → 2★ | Q4+ → 3★ |
| m10 | Hopped → 2★ | Q3+ → 2★ | die 5+ → 3★ |
| m11 | Q≤2 → 1★ | die 3+ → 1★ | Q4+ & die 5+ → 4★ |
| m12 | Q3+ → 2★ | die 4+ → 2★ | Q4+ & die 6 → 4★ |

## 3 · Item 3 — PRIMARY / ALT LINE ACTIVATION (3A, the revised table)

The worker's station fires its **PRIMARY** action; the OTHER station on the chosen line fires
its **ALTERNATE** (lesser) action. Slots are untouched — building actions and Ship loads
resolve at full strength on either line. Must-move stands; row-or-column stands.

| Station | PRIMARY (worker here) | ALTERNATE (other station on the line) |
|---|---|---|
| Market | Source 2 | **Source 1** ⚙ |
| Brewhouse | Brew — **search the stack, choose the tile** | Brew — **the TOP tile only** |
| Cellar | Age 3 | **Age 1** ⚙ |
| Harbor | Commission (printed fee + the maiden load) | **Load 1 Ready cask onto ANY docked Ship** ⚙ |

- The Harbor alt is the wharf-wide load (demoted from a primary candidate in the re-read — as
  a primary it would gut the manifests' demand tension and the slot-load's value). The
  Stevedore lifts it to 2 like every load flow (v4.6d).
- **The pace sweep is the make-or-break gate** (the v76 lesson: the Source+Brew heartbeat is
  the load-bearing line; alt access must not blow the 12–25 band). ALT_SOURCE/ALT_AGE ride sim
  env dials (override-only-if-set); results are REPORTED, never silently retuned.
- **Gate clarity (ruled: "Gate remains — ready and quality"):** boarding needs BOTH — the cask
  READY (die at its quality) AND the die ≥ the Kontor minimum as it boards. One-Q-less never
  admits a non-Ready cask; the Customs House lowers only the Kontor minimum, never READY. The
  Ship tile's trigger berth prints both (the READY glyph joins the die chip); the rulebook
  gains the clarity paragraph.

## 4 · Implementer's fills (FLAGGED — the v4.9 precedent; correct any at the check-in)

1. **Brew-verb scope:** the full search applies to every brew channel; ONLY the alt-station
   stop is top-tile.
2. **Tile return order:** the delivered tile returns to the stack BOTTOM (deterministic; keeps
   the alt honest). Pours return the same way.
3. **One line per delivered cask** (a Hulk can claim up to 3 different lines in one sail);
   combo lines read tier AND die on ONE cask.
4. **Deal timing:** the Manifest is dealt when the hull ENTERS THE DISPLAY (public information
   while you choose what to commission), rides to the slot, returns at sail.
5. **CHRONICLER rework (forced — the claimed-Order record is gone):** *"Claim a Manifest
   demand: +2★ at once"* ⚙ — banked with the claim, no end-record (component-state clean).
6. **MERCHANTS' EXCHANGE rework (forced):** *"Re-manifest up to 2 non-Bruges Ships (docked or
   in the display)"* ⚙ — the old card cycles under the deck, a new one is dealt at once.
7. **Hall-mode ⚜:** the per-claim Invitation moves to the Manifest claim (§2).
8. **Manifest card = 2×1.32in** (the building-card footprint) ⚙ — tucks under the hull's foot
   on the slot; 12 cards on one print sheet.
9. Die conditions read the parked face (post-lift, pre-premium).

## 5 · Retired / touched surfaces

- **Retired:** `LADINGS` + row/deck + `claimLading`/`ladingPick` + `p.ladings` + the Orders
  render row + the player-board Orders zone + the Order print strips + the Chronicler's
  end-line + the Order term (STYLE registry: the **Manifest** enters; the Order tile leaves).
- **Engine:** census stacks + search-brew + returns · manifest deal/claim pipeline
  (`UI.manResQ` index-based — JSON-clone safe; afterSail order recipe → building → spec →
  **manifest** → tour → acts) · primary/alt stations · AI teaches (`aiPileVerb`,
  `aiManifestBonus`, alt-aware cell/line values, MC `brewverb`/`man` branches) ·
  `humanGate`/`actorSeat` heads swap lading → man · KEY `hanse-v50`.
- **Harnesses:** net.js GATED (`ladingPick`→`manPick`, +`brewVerbPick`) · sim.js counters
  (ladings→manifest lines) + ALT dials · verify batteries rewritten (census/brew/manifest/
  primary-alt/hall re-seam) + a census-vs-kit drift check.
- **Kit:** components.js `manifestTile` (+CSS) · `ladingTile` retired · shipCard READY chip ·
  playerBoard Orders zone removed · print.html manifest sheet + Order strips out + station
  faces print primary+alt + aid/checklist.
- **Docs/pages:** RULES · COMPONENTS · DESIGN §9 · CLAUDE snapshot · STYLE · index (Examples
  reworked) · learn · rulebook.

## 6 · Gates (this build)

`verify-v4` rewritten and green · `sim 300/count` + A/B vs the pre-change commit (git
worktree) · `PERSONAS=1 sim 100` · render-smoke · aid-overflow · ALT dial sweep readouts ·
pace vs the 12–25 band reported. Full-oracle batteries and human tables come after the
check-in.

## 7 · Open dials ⚙

ALT_SOURCE 1 · ALT_AGE 1 · Harbor-alt loads 1 (Stevedore 2) · manifest line values (§2 table)
· MAN deck 12 · Chronicler +2★/claim · Exchange re-manifests 2 · manifest card 2×1.32in.
