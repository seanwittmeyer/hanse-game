# Working Title: *Brewhouse of the Hanse*

> A theme-first heavy euro about a merchant brewing house in the Hanseatic League. You brew hopped beer — the one cargo that survives the voyage — and push it across the Baltic and North Sea trade network. Every cask you keep working is **reach**; every cask you commit to a foreign post is **standing**. The whole game is the tension between the two.

---

## 1. Snapshot

|               |                                                                                     |
|---------------|-------------------------------------------------------------------------------------|
|**Players**    |2–5                                                                                  |
|**Length**     |15–20 min / player (≈ 30 min at 2p, ≈ 100 min at 5p)                                 |
|**Genre**      |Heavy euro · engine building · shared action grid + private tableau                  |
|**Sensibility**|Theme-at-the-heart, Lacerda-grade interlocking systems (*Vinhos*, *Lisboa*, *Kanban*)|
|**Status**     |Core mechanic + theme locked. Scoring axis and era structure still open.             |

---

## 2. Design Pillars (the north star)

1. **The mechanic *is* the theme.** The central dual-role tile and the authenticity-vs-reach tension are the same object. Nothing is bolted on.
2. **One coherent strategic tension, two real win conditions.** Volume/reach (the "Leffe" player) vs scarcity/reputation (the "Westvleteren" player). Both score; they pull against each other.
3. **Crisp turns, deep decisions.** Line activation is capped at 4 stops so turns stay fast even at 5 players. The depth lives in routing and commitment, not in turn length.
4. **Interaction through a shared board, not take-that.** Occupancy reshapes everyone's options; blocking is positional pressure, never an attack that hard-locks a player.

---

## 3. Hard Constraints (non-negotiable rules)

These are deliberate. Each one is solved *thematically*, not worked around.

- **No dice.** Fully deterministic — heavy-euro native.
- **No cards.** All cardlike content is **tiles** (often double-sided). The action system lives on the board, not in a hand.
- **No money.** Pre-modern trade ran on barter, in-kind goods, and obligation. **Goods are the medium of exchange** (grain, hops, casks). **Reputation/standing is earned and unspendable** — it is score, and it unlocks engine, but it is never paid out.

---

## 4. Theme & Setting

**Era:** c. 1350, the Hanseatic League at its height.

**Why beer, why now:** Hamburg was literally called *the brewhouse of the Hanse*. The pivotal innovation is **hopped beer**, which (unlike perishable **gruit** ale) survives a sea voyage and so becomes a preservable, shippable export commodity. That gives you a built-in path divergence inside the theme: gruit (cheap, local, perishable) vs hopped (premium, travels).

**The trade network:** casks move out to the great foreign trading posts (**kontore**) — **Bergen** (Bryggen), **London** (the Steelyard), **Bruges**, **Novgorod** (Peterhof) — for presence, majorities, and standing.

**The deeper axis (the real heart):** the modern beer world hands us a perfect tension. **Trappist authenticity (Westvleteren — capped production, no advertising, mystique-as-marketing) vs heritage-brand reach (Leffe — industrial scale, global shelf space, diluted story).** This game pulls that conflict back into the 14th century: *do you keep casks in commerce for reach, or take them out of commerce to become heritage and pure standing?* That decision is the dual-role tile (§8).

---

## 5. Who You Are

A **merchant brewing house** — a family/firm operating inside a League city. You source grain and hops, brew, ship along the network, and establish standing at the kontore. You are a builder of a vertically integrated trade-and-production engine, balancing the temptation of volume against the value of reputation.

---

## 6. Core Mechanic — The Shared Action Grid

The signature system. A **2×2 grid of four action cells sits on the main board and is shared by all players.** Each player has a worker on it.

```
        s1        s2
   s8 [ A ]----[ B ] s3
        |    \/    |
        |    /\    |        (no diagonal movement)
   s7 [ C ]----[ D ] s4
        s6        s5

  Top row    : s8 · A · B · s3
  Bottom row : s7 · C · D · s4
  Left col   : s1 · A · C · s6
  Right col  : s2 · B · D · s5
```

### Worker movement

- On your turn you **must move your worker to an orthogonally adjacent cell** (A↔B, A↔C, B↔D, C↔D). **Never the diagonal.**
- You then **activate either the row or the column** that your worker's cell belongs to.

### Line activation (the pipeline)

- A line is a **4-stop pipeline:** `cap tile → cell → cell → cap tile`.
- **Maximum 4 actions per turn:** the two cells on the line, plus the **one perimeter slot adjacent to each of those two cells** on that line.
- Each of the **8 perimeter slots belongs to exactly one line** (the row *or* the column of its adjacent cell) — never both. Two caps per line, no overlap.

### Emergent consequences (why the geometry is good)

- **Cells are generalists** (each sits in two lines, fires often). **Slot tiles are specialists** (each sits in one line, fires only when you run that line). So **placing a tile commits it to a row XOR a column** — a meaningful decision every time.
- **The forced orthogonal move makes you walk a circuit.** Ping-ponging the top edge (A↔B) reliably feeds the top row + both columns, but *never* the bottom row. To service the bottom you must march a worker down to C/D. **Which loop you walk is your engine's rhythm.**
- You can't camp a single line — a one-trick engine starves.

### The scoring-pile variant

- One cell (e.g. **D**) is the **score pile / Kontor**. It is not an action.
- The **two slots adjacent to the score pile (s4, s5) go dark**, reducing perimeter slots from 8 to 6.
- The only lines reaching D are **bottom row** (via C) and **right column** (via B), so **only a worker at B or C can deposit.** Banking therefore costs you a fired stop — the spend-vs-score tension falls out of the geometry for free.

### Two rules to pin down (currently assumed)

- **Both cells in an activated line trigger regardless of which one the worker stands on** — the worker only gates *which line is legal*. (**LOCKED: yes.**)
- **Resolution order within a line:** **WORKING DECISION — free order for now** (player resolves the up-to-4 stops in any order); revisit if turn length / AP suffers. (Fixed/directional remains the fallback if free order proves too fiddly.)

> **⚠ Kontor model under revision (supersedes the §6 "scoring-pile variant" and §7 "not an action").** The Kontor is a **stood-on action cell whose action is the top tile of its enshrinement stack** — it is simultaneously an action space *and* the score pile, and its action **mutates as casks are enshrined onto it.** Full rules pending; §6/§7/§10 to be reconciled once finalized.

---

## 7. The Four Cells (Hanse mapping)

|Cell |Station                  |Action                                                                                        |
|-----|-------------------------|----------------------------------------------------------------------------------------------|
|**A**|**Market**               |Draw goods and tiles from the shared supply (your acquisition engine)                         |
|**B**|**Brewhouse**            |Convert grain + hops → casks                                                                  |
|**C**|**Harbor**               |Ship casks out for reach / market presence                                                    |
|**D**|**Kontor** *(score pile)*|Commit casks to a foreign post (Bergen / London / Bruges / Novgorod) for standing & majorities|

> Mapping is tunable — the flow Market → Brewhouse → Harbor/Kontor is the intuition, not a fixed law.

---

## 8. Dual-Role Tiles — The Heart

The single most important object. **Double-sided tiles** that are either engine or score depending on *where they sit*:

- **In a perimeter slot (action face out):** the tile is **working** — it modifies/adds output when its line fires. This is **reach** (the Leffe move): the cask is in commerce, driving the business.
- **Moved to the score pile (flip to goal face):** the tile is **enshrined** — it no longer fires; it is now **standing/reputation** (the Westvleteren move): taken out of commerce to become heritage and pure score.

Because you can only enshrine when your worker is in line with the Kontor, **cashing out always costs a turn of engine.** That spend-vs-score decision is the spine of the game. Double-sided tiles are tactile, self-documenting, and need no cards.

---

## 9. Perimeter Slots — Owned Tiles & the Toll

- Perimeter slot tiles (ships, trading privileges, recipes — Dubbel/Tripel/gruit/barrel-aged styles) are **owned by the player who placed them.**
- **When *any* player fires a line through an owned slot, the owner collects a bonus** (a skim, paid in goods — consistent with no-money). Parking on a high-traffic line and taxing every rival who runs it is a position worth fighting for.
- **Acquisition:** tiles enter via the **Market** cell, paid in goods.
- **Balance lever to watch:** rich-get-richer. Keep slots scarce, tolls modest, and make placement cost a turn (building infrastructure costs real tempo).

---

## 10. Occupancy Rules — Hybrid (toll + block)

The grid is shared and, with 4 cells and up to 5 workers, will be **near-permanently occupied**, so these rules are the *main economic loop*, not an edge case. The hybrid is keyed to grid geography:

- **Production cells (Market, Brewhouse, Harbor) → pay-to-use TOLL.** Occupied cell can still be used; you **pay the resident worker's owner in goods.** Keeps turns flowing; turns the central stations into taxable real estate.
- **Scoring cell (Kontor) → BLOCK-to-alternate.** You **cannot pay your way in.** If it's occupied you wait or take the fallback. Banking standing must be the contested, un-buyable thing — this protects the spend-vs-score tension and prevents pay-to-win endgames.

### Alternate action when occupied → routes to your tableau

The fallback when a cell is taken is to **perform a private version in your own tableau** (e.g. Brewhouse blocked → brew in your own brew-room at whatever rate you've built). This is *why the tableau exists* and why blocking never hard-locks anyone. The more house you've built, the less a block stings — which keeps blocking honest at 5 players.

> **Most important numbers to tune:** toll prices and fallback strength. Because occupancy is near-constant, these two dials set the entire game's feel.

---

## 11. The Private Tableau

The counterpart to the shared grid. Clean division of labor:

- **Shared grid = the VERBS.** Where you spend your turn and collide with others. Lean, rhythmic, contested.
- **Tableau = the NOUNS.** Where outputs land and compound — warehouses, brew-rooms, banked goods and tiles. Private, uncontested, where specialization deepens. Also the private fallback when the commons is crowded (§10).

**The loop:** act on the public grid → goods & tiles flow into your tableau → tableau stores/converts/scores → feeds back capacity that strengthens your next public action. (Lungs and body.)

**Turn-length discipline:** **only one surface fires per turn.** The grid action produces/moves; the tableau scores passively and only *acts* on a fallback turn. Letting both fire every turn blows the time budget.

---

## 12. Turn Structure (working sketch)

1. **Move** your worker to an orthogonally adjacent cell (mandatory).
2. **Choose** the row or column of that cell.
3. **Resolve** the line, up to 4 stops (cap → cell → cell → cap), in fixed order.
   - Pay tolls in goods for any occupied production cell you use; owners of fired slot tiles collect their skim.
   - If a cell you want is blocked (Kontor) or you elect the fallback, perform the private tableau version instead.
4. Goods/tiles flow to your tableau; any enshrined tile flips to its goal face in the Kontor.

*(Round/era framing and end-game trigger TBD — see §13–14.)*

---

## 13. Scoring — Current Thinking + The Open Fork

The authenticity-vs-reach axis is already baked into the dual-role tile. Scoring should make those **two genuinely competing win conditions**, not two flavors of one point-salad.

**THE KEY OPEN DECISION** — what does the limited tableau reward?

- **(a) Breadth** — many ports & styles served (the reach / Leffe player), or
- **(b) Depth** — a few rooms refined to high value (the reputation / Westvleteren player), or
- **(c) Forced commit** — tableau space is limited so both score but actively pull against each other, and you must lean one way.

> Recommendation to pressure-test in Claude Code: **(c)**. Limited tableau space + Kontor majorities should make "spread wide vs go deep" the central strategic identity — the Vinhos-grade thing the whole design has been circling.

Likely scoring inputs: enshrined dual-role tiles (standing), Kontor majorities at the four posts, completed tableau sets/rooms, fulfilled port demand.

---

## 14. Deferred Fork — The "Era Arc" (Option 3)

The Hanse frame gives the **quality-vs-volume tension now**. What it does *not* yet give is the **historical sweep**: an era clock advancing across centuries, with refrigeration / rail / bottling / advertising / consolidation unlocking new actions and steadily eroding the value of authenticity.

- **Defer-able:** the core game works without it.
- **If added:** a shared era track is a common clock that unlocks tech for everyone; your own upgrades compound on top. It would deepen the Leffe/Westvleteren arc into a literal timeline.
- **Cost:** structural complexity + the no-money rule bites hardest in an "industrial brand" late game. Fix is keeping **casks as the universal medium and reputation unspendable** throughout.

---

## 15. Design Lineage & Comps

- **Vital Lacerda — *Vinhos*, *Lisboa*, *Kanban*:** the target depth; *Lisboa*/*Kanban* specifically for **shared occupancy reshaping everyone's options.**
- **Toll economies — *Keyflower*, *Princes of Florence*:** the pay-to-use model for production cells.
- **Block-to-alternate — *Caylus*, *Keyflower*:** the model for the contested Kontor.
- **Uwe Rosenberg — *Ora et Labora* (2011):** the title to **differentiate from** (medieval monastery producing beer/whiskey, rotating production wheel).

---

## 16. Differentiation

"Monks/houses make beer" is occupied territory (*Ora et Labora*). This game's distinct ground is the **economic philosophy**, not the production: the **authenticity-vs-reach inversion** (Westvleteren vs Leffe pulled into the 14th-century Hanse), expressed through one object — **the double-sided cask tile that is engine when working and score when enshrined.** Nobody has built *"Vinhos, but the tension is authenticity vs reach across beer trade."* That's the hook.

---

## 17. Decision Queue (for the next session)

Prioritized — top items unblock the most downstream work.

1. **Scoring axis** (§13): breadth / depth / forced-commit. *Sets the strategic identity of the entire game.*
2. **Toll prices & fallback strength** (§10). *The two most load-bearing numbers; occupancy is near-constant.*
3. **Tableau structure** (§11): what are the "rooms," how many, how do they convert and score?
4. **Line resolution order** (§6): confirm fixed/directional vs free.
5. **Confirm both-cells-trigger rule** (§6).
6. **Goods taxonomy:** how many resource types? (grain, hops, water, casks… + grapes if a wine path is wanted.)
7. **End-game trigger** and round/era framing (§12–14).
8. **Era arc** (§14): in for v1, or defer to expansion?

---

## 18. Glossary

- **Cell** — one of the four shared action spaces (A/B/C/D).
- **Line** — a row or column; a 4-stop pipeline (cap · cell · cell · cap).
- **Slot** — one of the 8 (or 6) perimeter spaces holding an owned tile; belongs to exactly one line.
- **Cap tile** — the slot tile at either end of an activated line.
- **Dual-role tile / cask** — double-sided tile; **working** (action face, in a slot = reach) or **enshrined** (goal face, in the score pile = standing).
- **Kontor** — the score pile cell; a foreign trading post (Bergen / London / Bruges / Novgorod).
- **Toll / skim** — goods paid to a resident worker (occupied cell) or to a slot-tile owner (fired line).
- **Tableau** — your private board of rooms/warehouses; output, fallback actions, and scoring.
- **Reach** vs **Standing** — the two competing value types: volume/commerce vs scarcity/reputation.
