# `play.html` — Next-Session Improvement Brief (v0.5)

> Handoff notes for improving the hot-seat play client. Written while the v0.5 engine is fresh in context. `play.html` is a single self-contained file (HTML + CSS + one inline `<script>`). It is the playtest tool **and** the de-facto reference implementation, so correctness fixes here are also rules fixes.

---

## 0. Fast ramp — where things live in the file

One inline `<script>`. Sections, in order:

- **DATA** — `STYLES` (the 5 type rungs + their `work` action), `SUMMIT_ROSTER`/`SUMMIT_KEYS`, `FRONTIER_AT`, `ROUTES`, `ROUTE_CAP_BASE`, `START_VAL`/`VAL_FLOOR`/`VAL_CEIL` (the demand market), `SHOP`, `GOALS` (cycled 9), `SLOTS`/`LINES`/`CELLNAME`/`cellOfLine`/`ADJ`.
- **STATE** — `S` (game), `UI` (interaction: `sub`/`stage`/`queue`/`cell`/`tmp`/`fair`), `KEY` (`hanse-hotseat-v5` — **bump on any state-shape change** or old saves crash).
- **SETUP** — `newPlayer` (note `pslots:[null,null,null]`, `standing:0`), `dealSummit`/`applySummit`, `freshState`.
- **MARKET** — `marketDrop` / `marketPump` / `advanceFrontier`.
- **TURN MACHINE** — `doMove → chooseLine → (fireSkim per cap) → nextCell → [cell resolution] → fair stage → endTurn`; `checkTriggers` (2-of-4 cities + `MAX_TURN`).
- **MECHANICS** — `deployable(p)` (Ready vessel casks + pslot casks), `takeCask`, `deployCask`, `addPresence`, `routeFilled`.
- **CELL HANDLERS** — Market (`marketGoods`/`buyTile`/`placeTile`/`applyRoom`), Brewhouse (`brewAdvance`/`brewLoad`), Harbor (`shipStart`/`shipPick`/`shipRoute`/`installCask`/`quayFallback`), Hall (`enshrineStart`/`enshrineBank`/`enshrineReady`/`enshrineDeployed`).
- **SCORING** — `scorePlayer` (reach + maj + standing-track + best-3 goals), `gameOver`.
- **RENDER** — `render` → `renderBar`/`renderGrid`/`renderRoutes`/`renderKontor`/`renderShop`/`renderTableaus`; `cellPrompt`/`cellActions` drive the action bar.

**Smoke-test pattern** (verify any engine change before merge):
```bash
node -e 'const fs=require("fs");const h=fs.readFileSync("play.html","utf8");
const re=/<script>([\s\S]*?)<\/script>/g;let m,last;while((m=re.exec(h)))last=m[1];
fs.writeFileSync("/tmp/play.js",last)'
# then eval /tmp/play.js with a mocked document/localStorage and drive a bot
# (see the harness used in chat 2026-06-03; the old playtests/*.js drivers are STALE — pre-v0.5 ship API)
```

---

## 1. Top two — the fixes that matter most

### ① Free-order line resolution (currently board-order) — *correctness + depth*
`RULES.md` §1 says resolve a line's up-to-4 stops **in any order**. The engine resolves cells in fixed board order (`chooseLine` queues `L.cells`, `nextCell` shifts), and **fires the Fair stop dead last** (after the cells). Two real combos are broken by this:

- **Pump-and-dump is impossible.** The marquee v0.5 combo (Fair pump → enshrine high on the same Hall line) can't happen — the enshrine (a cell) resolves *before* the Fair pump, so you always bank the pre-pump value. This is the single most-advertised v0.5 interaction and it doesn't work.
- **Brew-then-enshrine is impossible.** On the bottom row (C Hall, D Brewhouse), board order enshrines before brewing, so you can't advance a cask to Ready *then* enshrine it in the same activation.

**Fix:** make line resolution a player-chosen order. Present the up-to-4 stops (2 cells + up to 2 caps, incl. the Fair) as a menu; resolve one at a time until all done, then End Turn. This is the spec-faithful version and it dissolves the Fair-ordering bug entirely.
- Touch: `chooseLine` (stop building a fixed queue; build a *set* of pending stops), `nextCell` → a generic `resolveStop`, `cellActions`/`cellPrompt` (add a stop-picker stage), `renderBar`.
- Risk: medium — it restructures the turn loop. Keep the per-cell handlers intact; only the *scheduler* changes.
- Quick partial fix if short on time: just fire the **Fair before the cells** (offer pump first). Restores pump-and-dump; leaves brew-then-enshrine unsolved.

### ② Working casks must actually do something — *the missing soul of the 3-state design*
Right now installing a cask to a personal slot (`installCask`) only **holds** it (relieves vessel back-pressure). The whole point of the *working* state (`RULES.md` §2/§3) is that it **soups up a station**. As-is, the personal slots have no engine-vs-score teeth, so the third cask state is cosmetic — and that's the part you most wanted real.

**Design decision to make first (see §6):** what does a working cask add, and to which station? Each type already carries a `work` action in `STYLES` (gruit→+1G, hopped→+1H, dubbel→+1G, tripel→advance a brew, bock→+1 presence). Recommended model: **when you install a working cask you assign it to a station (Market / Brewhouse / Harbor); using that station — or falling back to its twin when blocked — also fires the cask's `work` action.** That gives personal slots a real, escalating payoff and makes "keep it working vs cash it out" a live choice, with the 3 slots forcing specialization.
- Touch: `installCask` (add a station-assignment step or store `{cask, station}`), the three station handlers (apply installed-cask bonuses), `renderTableaus` (show what's installed where), `cellActions` twins.
- Risk: low-medium. Self-contained once the model is fixed.

---

## 2. Other correctness / faithfulness gaps

- **Resolution-order note in-page** says "board order" — update once ① lands.
- **`shipBuyRoute` is dead code** (leftover from the retired ship-cargo model) — safe to delete.
- **End-clock under review** (`RULES.md` §7): enshrining a deployed cask now *un-saturates* a route, so 2-of-4-cities can oscillate and rarely fires in sim. This is partly a balance question (own it on the sim track) but the client should at least make the clock legible and handle a route dropping back below cap gracefully (it does, but verify).
- **Quality gate on deploy** is enforced in `shipRoute`; double-check the Quay twin path (`quayFallback`) also respects it (Bruges Q1 — fine, but confirm).

---

## 3. UX / playability (it's a hot-seat tool — make it pleasant to actually run a game)

Prioritized by play-value:

1. **Undo** (high value for a prototype). Hot-seat misclicks are constant. State is already serializable (`save()`); push a pre-action snapshot onto an undo stack and add an Undo button. Even single-level undo helps a lot.
2. **Decision support overlays** — surface consequences at the moment of choice:
   - At the Hall: "Enshrine *Mumme* → **+8 standing** (market 8 → 7)." Show the live market value next to each enshrine-able cask.
   - At the Harbor: show each route's `presence × value` and which are full / quality-eligible.
   - At the Market: show that buying a recipe **pumps** its type (+1), and the Fair's pump preview (already partly there).
3. **Demand-market HUD** — the market is the timing heart; make it a first-class, always-visible strip with up/down arrows on last change, floor/ceiling marks, and "who's holding what type" hints. (`renderKontor` has a text version — promote it.)
4. **Reach board clarity** — per-route: each player's presence (colored), the slotted value, the current **majority leader**, and the saturation bar toward the end-clock. Make "2 of 4 cities" unmissable.
5. **The any-player-enshrine affordance** — when on a Hall line, deployed casks already become clickable (`enshrine_slot` stage). Add a hover/preview showing whose cask it is and what the owner would bank, so the "friendly eviction" reads clearly.
6. **Mobile/responsive pass** — confirm the grid + side panels stack cleanly on a phone (earlier commits did a mobile pass; re-check after any layout edits).
7. **Onboarding** — a one-time "how a turn works" hint, plus the existing links to `learn.html`. Optional inline tooltips on the four cells.

---

## 4. Feature completeness (deferred subsystems — schedule, don't rush)

- **Privileges (Family D)** — entirely unimplemented; London delivery should grant one (`TILES.md` §D). This is a whole subsystem; decide if it's in v1 or deferred before building.
- **Ship/lane variety** — only Cog/Hulk (faucets) and the 4 lanes exist; `TILES.md` lists Toll Exemption, Pilot, a 2nd Fair (Hansetag). Add if they earn their keep.
- **Counting-house / Cooperage / Faster Fermenter / Quay / Larder rooms** — present and wired; spot-check each actually applies (esp. Faster Fermenter and Quay twins).

---

## 5. Balance instrumentation (bridges to the sim track)

- Add a hidden **sandbox panel** (toggle) exposing the live dials: `START_VAL`/floors/ceil, route caps, Fair cost, brew lengths, `FRONTIER_AT`. Lets you tune mid-playtest without editing source. Cheap, high leverage for the balance push.
- All numbers are ⚙ placeholders — keep them in the DATA block (they already are) so the future MCTS sim and the client read from the same constants conceptually.

---

## 6. Design decisions to lock *before* coding (so the session moves fast)

1. **Working-cask boost (blocks ②):** does an installed cask attach to a chosen station and fire its `work` action when you use/fallback that station? (Recommended: yes.) Or a simpler always-on perk? Define the cask→station mapping.
2. **Free-order resolution (blocks ①):** full player-chosen stop order, or just "Fair fires first"? (Recommended: full free order — it's the spec and it unlocks brew-then-enshrine too.)
3. **Privileges in v1 or deferred?** (Recommended: defer until the two-axis loop is tuned.)
4. **End-clock under the deploy/enshrine model** — keep 2-of-4-cities (and accept oscillation), or move the trigger? (Likely resolve on the sim track first; client just needs to render whatever wins.)

---

## 7. Release discipline

- **Bump `KEY`** (`hanse-hotseat-v5` → `v6`) whenever the saved-state shape changes, or returning players' old saves crash on load.
- **Smoke-test headlessly** (§0) before every merge; the inline JS must `new Function()`-parse and a scripted game must run crash-free at 2–4p.
- We deploy from **`main`** (classic GH Pages, no workflow). Develop on `claude/brewhouse-game-design-eduS4`, then fast-forward `main` to publish.
- The old `playtests/3p-sim-driver.js` / `multi-sim.js` are **stale** (pre-v0.5 ship API) and won't run; the clean MCTS sim is a separate next-session track.

---

## Suggested order for the session

1. Lock the 4 decisions in §6 (5 min).
2. **②** Working-cask station boost (self-contained, high payoff).
3. **①** Free-order resolution (fixes pump-and-dump + brew-then-enshrine).
4. **Undo** + the Hall/Harbor decision-support overlays (§3.1–3.2).
5. Promote the demand-market + reach HUDs (§3.3–3.4).
6. Sandbox dial panel (§5) if time allows.

Smoke-test after each; bump `KEY` once (after ②/①); merge to `main`.
