# Brewhouse of the Hanse — Turn & Round Economy (v0.1)

> Operational rules. Numbers are placeholders ⚙. Incorporates the fixes from `PLAYTEST.md` (Bruges-open, Brewhouse advance-all, skim caps).

---

## 1. The turn

On your turn, in order:

1. **Move** your worker to an **orthogonally adjacent** cell (A↔B, A↔C, B↔D, C↔D — never diagonal). Mandatory.
2. **Activate** the **row OR column** of your worker's cell.
3. **Resolve** that line's up-to-4 stops — **cap slot · cell · cell · cap slot** — in **any order**:
   - **Each cell:** take its public action if the cell is free or holds *your* worker; if a **rival** worker sits there, take your **tableau fallback** for that action instead.
   - **Each cap slot:** if it holds an owned tile, that tile fires its line action; the **owner** collects (the skim), whoever activated the line.

> Both cells on the line always fire. The worker's position only gates *which line is legal* and *which cells are blocked to you*.

---

## 2. The four cell actions

### A · Market
- Take **2 goods** (any mix `G`/`H`) from the supply, **OR** acquire **1 tile** from the face-up Market display, paying its cost in goods.
- Tile costs ⚙: recipe 1–2 · route/ship 2 · room 3 · (privileges come from London, §Harbor).
- **Tableau fallback (blocked):** Larder trickle = +1 `G` (upgradable).

### B · Brewhouse
- **Advance ALL your brews 1 step** on the track, **and** optionally **LOAD** 1 recipe (paying its inputs) into an empty vessel.
- Brew lengths (LOAD→READY): **Gruit 2 · Hopped 3 · Dubbel 3 · Tripel 4 · Bock 5.** ⚙ (the tempo dial — gruit skips AGE)
- More **vessels** (Extra Vessel rooms) = more brews advanced per fire = your throughput engine.
- **Tableau fallback (blocked):** advance brews only (no public load bonus). *Brewing is the one action with a true private twin — it always happens here anyway.*

### C · Harbor
- **Ship 1 READY cask** (2 with a Hulk): move its tile into an **open perimeter slot** (now working), and place **1 presence** on a route the cask quality-qualifies for, advancing 1 space (+ range mods: Cog, etc.).
- **Routes:** **Bruges is open from the start.** Bergen / London / Novgorod open only once a Route Lane tile for them sits in a slot.
- **London delivery** grants a **Privilege tile** (its route payout).
- **Tableau fallback (blocked):** Quay trickle = ship to Bruges only, 1 step (upgradable).

### D · Kontor
- Choose one: **use the current top-of-stack action**, **or ENSHRINE** — move one of your working casks from a slot to the **top of the stack**, flipped to its standing face. It stops skimming; you bank its standing; its goal is now live; it sets the new top action.
- Enshrining is bundled by geometry with a brew (right column B-D) or a ship (bottom row C-D).
- **Occupancy:** the Kontor is **not** tolled or blocked to a fallback — anyone may fire a Kontor line; the top action / enshrine is available to whoever runs it. ❓ (revisit if it needs contention)

---

## 3. Goods, storage & skims

- `G` grain and `H` hops are the only currency. Spent on tiles, brewing inputs, tolls.
- **Storage cap:** ⚙ ~8 goods, raised by **Warehouse**. Caps the skim-runaway risk (PLAYTEST F5).
- **Skims kept tiny** (typically +1 good or a non-goods nudge) for the same reason. The rich-get-richer dial.

---

## 4. Round & turn order

- Play proceeds in **seating order**; one **turn each = one round**.
- **First-player marker** passes clockwise each round.
- Single era for v1 (era arc deferred, §14).

---

## 5. End-game trigger

The game enters its **final round** the moment **either**:
- the shared **Kontor stack reaches N enshrined tiles** — N ≈ **12 (2p), scaling +3/player** ⚙ — *the heritage clock*; **or**
- **any one route's presence spaces are full** — *the reach clock*.

Both archetypes can therefore drive the ending. Finish the current round so all players have equal turns, then score.

## 6. Scoring sequence (end-game)

1. **Reach / Destination:** for each route, **your presence × that route's slotted value.**
2. **Majorities:** route-majority bonuses at each kontor (most presence; tie = shared/split ⚙).
3. **Standing:** sum of your enshrined casks' standing values.
4. **Goals:** resolve each enshrined cask's goal against final state (the goal-matching layer).
5. **Tiebreak:** most goods, then most working casks in slots.

> Reach (1–2) and Standing (3–4) are **separate accumulations** that never convert — the two real win conditions. Limited slots, vessels, and turns force the lean between them (§13 option c).

---

## Open / to tune

- Brew lengths & vessel count — the master tempo dials.
- End-game N and whether the reach-clock trigger fires too early/late.
- Whether the Kontor needs contention (currently open to all).
- Skim values & storage cap (the runaway dial).
- Compensation for the depth path's tempo cost (goal bonuses g3/g4 vs volume).
