# PLATFORM-STUDY — Hanse onto the Play PDX lobby/backend (2026-08-05)

**The ask (designer):** PDX (`seanwittmeyer/v0-pdx-game`) has a working online-multiplayer lobby/backend. Explore folding Hanse in as a second game on the same platform — keep the two games as separate as possible, minimal impact to PDX, and judge whether this becomes the unified platform for all Waterworks games.

**Scope note:** this commit is a study only — no game change, no engine change. Implementing Phase 1 below IS an engine change and takes the standing session-start canon read + a `KEY` bump at that time.

---

## 1. What PDX's platform actually is

Next.js 16 / React 19 / zustand, Supabase (anon key, browser-only client — `lib/supabase/client.ts`, 22 lines). Deployed v0.app → GitHub → Vercel.

**The whole backend is one table** (`scripts/001_create_games_table.sql` + 5 patch migrations):

```
games(code PK, state JSONB, host_id TEXT, player_slots JSONB, last_action_log JSONB,
      status waiting|in_progress|completed|ended, is_public, max_players,
      last_heartbeat, ended_by, ended_reason, created_at, updated_at)
```

- **Sync model: client-authoritative full-state blob, last write wins.** The acting client writes the entire `state` jsonb (`syncGameState`, `lib/multiplayer.ts:513–546` — no CAS on the gameplay path). Ordering is a monotonic `stateVersion` *inside* the blob (`bumpStateVersion` :492–494); receivers drop non-newer versions. Wall clocks are explicitly not trusted (documented clock-skew post-mortem).
- **Transport:** Supabase Realtime `postgres_changes` UPDATE on the row (`subscribeToGame` :900–972, REPLICA IDENTITY FULL so the whole row rides each event) + a 2 s polling fallback (:975–996) + a separate display-only presence channel (:1206–1279).
- **Sync cadence: turn/phase boundaries only** — `syncToRemote` (`lib/store.tsx:3652–3707`, 300 ms debounce) is called from exactly five phase/turn-boundary sites, not per micro-action. Payload discipline exists (`toSyncableState` :504–510 strips a nested snapshot and truncates the log to 200 — Supabase Realtime's per-record cap has already been hit and solved once).
- **Lobby:** 6-char room codes (:7–14), QR join, public-games list w/ heartbeat (:133–153), lowest-free-slot join under CAS retry (:364–469), host-set `max_players` (2–4), automa seats in `player_slots` (`"automa:tyler"`, :218–254), implicit start when full or host start-early, device transfer by name (:825–880). Identity is a sessionStorage client id (:17–26) — **no auth, open RLS (`USING(true)` ×4), trusted-lobby posture throughout** (incl. an ungated `/live` ops dashboard).
- **Automa watchdog:** if the current seat is a bot and `stateVersion` stalls 12 s + slot·3 s, any client takes over the bot's turn; LWW resolves races (`store.tsx:3793–3823`). Proven pattern worth porting.

**How game-agnostic is it?** The *mechanism* (codes, blob+version sync, realtime+poll, presence, heartbeat, status lifecycle, CAS idiom) is generic. The *typing and routing* are 100% PDX:

- **No `game_type` discriminator anywhere** — DB, types, routes, storage keys. Every list query would happily serve both games' rooms mixed.
- `MultiplayerGame.state` is typed as PDX's `GameState` (:155–169); join/automa flows synthesize **PDX player objects** into the blob (:239–254).
- The platform reads exactly these blob fields: `players[].name`, `stateVersion`, `gameLog`, `turnNumber`, `currentPlayerIndex`, `gameEnded` — plus **one SQL reach-in**: `endAbandonedGames` filters `.eq("state->turnNumber", 1)` (:623).
- The PDX game renders at `/`; `/game/[code]` is only a join redirector; the 3,172-line `game-launcher.tsx` lobby is a PDX setup screen (expansions etc.).
- Rules code (`game-actions.ts`, `game-data.tsx`) imports zero multiplayer; `multiplayer.ts` imports zero rules. **The seam is clean — it's just monomorphic.**

## 2. What the Hanse engine offers (`play.html`, KEY `hanse-v49d`)

Single file, one 2,891-line classic script. Findings that matter for remote play:

- **The full game state is the serializable pair `(S, UI)`** (L902–903). `S` round-trips `JSON.parse(JSON.stringify(S))` cleanly (the engine itself relies on it: `snapshot` L942, `doUndo` L943, MC-AI clone L2635). `UI` carries real mid-turn state — the resolution stack AND the prize queue (`pendingBenefits/pendingRecipe/pendingSpec/pendingLading`, each entry `{pid,…}` possibly naming a NON-active seat). Sync must always carry the pair.
- **Blob size:** ~4–6 KB without `S.log`; ≤ ~57 KB with the capped-140 HTML log. An order of magnitude under what the PDX channel already carries.
- **Action surface:** ~40 named global functions the buttons call by inline `onclick` (`doMove`, `chooseLine`, `resolveStop`, `brewPick`, `ageAllot`, `loadCommit`, `surveyPick`, `placeBldgOn`, `benefitPick`, … `endTurn`). Function declarations → already reachable on `window`. **One commit point: `endTurn()` (L1966)** — after it `UI={sub:'move'}`, `S` stable, save fires.
- **Render is a pure read of `(S,UI)`** (L2714): assign the pair, call `render()` — exactly what `doUndo` and the MC restore already do mid-game. Zero DOM reads in the turn machine or scoring. No blocking dialogs (`prompt/confirm/alert`: none). No game logic on timers (the only state-touching `setTimeout` is the AI pacer).
- **Headless drivability is proven** — `playtests/sim.js` extracts the script, appends a driver in-scope, stubs DOM/localStorage, no-ops `render/save/log/snapshot`, and plays thousands of full games through `aiStep()` (fully synchronous). A server-side validator, if ever wanted, is a small lift on the same harness.
- **AI seats live in `S`** (`p.ai={tier,persona}`), separable from render — a remote client can run bot turns unchanged.
- **Gaps (all additive, none structural):**
  - **A. No seat identity.** Every action resolves the actor via `cur()`; nothing says "this browser may only act seat 2." The render layer's only gate is `aiTurn()`.
  - **B. `S.active` is NOT the full authorization rule.** The prize pipeline (`afterSail` L1914) queues picks for cask OWNERS — `precipePick/bspecPick/benefitPick/ladingPick` act on `b.pid`, and a non-active player even places a London building on the shared board. **`humanGate()` (L2676) already computes exactly "whose input is required now" — it is the ready-made authorization oracle.** This is core and frequent (every sail with rivals' casks aboard), not an edge case.
  - **C. `S`/`UI` are `let`-bound, not on `window`** — an ~8-line `window.HANSE` accessor fixes reach from a parent frame.
  - **D. Saves are turn-boundary only and `boot()` hard-resets `UI={sub:'move'}` (L3493)** — applying a mid-turn `S` without its `UI` lets the turn be silently replayed. Sync `(S,UI)` together; never use the localStorage path for net games.
  - **E. Undo spans turns** (stack cleared only on AI→human handoff, L1974) — a remote-takeback exploit; must be clamped in net play.
  - **F. No version stamp inside the blob** — `KEY` (L927) is only a storage key. Net games need `engineKey` carried in the payload and checked.
  - **G. Decks are open in `S`** (`buildDeck/impDeck/ladingDeck/shipDeck` in full order) — a blob holder can read future draws. Acceptable for friendly playtesting; redaction is a later option.
  - **H. `p.name` flows unescaped into `innerHTML`** (`log()` L1114 → render L2718) — harmless hotseat, stored XSS the moment names arrive from a remote lobby. Escape at ingest.
  - No URL-param handling exists yet (net boot mode is new but trivial); lucide loads from unpinned unpkg CDN (hygiene: pin/vendor).

## 3. Judgement

**Yes — technically this is a good fit, and the cheap version is also the right version.** The two systems independently converged on the *same* sync shape: turn-boundary, full-state-blob, last-write-wins with a monotonic in-blob version, over a jsonb row + Realtime. Hanse's state is smaller than PDX's, cleanly serializable, and the engine already exposes a discrete action surface with one commit point. Nothing needs rearchitecting on either side.

- **Straightforward:** the platform mechanism reuse (codes/join/presence/realtime/heartbeat/status), the envelope trick below (Hanse rows satisfy the exact blob fields PDX's platform code reads, so even `endAbandonedGames` keeps working), the iframe+postMessage embed (keeps the repos fully separate and the Hanse dev loop — KEY bumps, sims, Pages deploys — untouched), running Hanse's own AI tiers in net games (host client runs them; PDX's watchdog pattern ports later).
- **The one real design problem:** out-of-turn prize picks (gap B). Turn-granularity sync alone is insufficient — the protocol needs a mid-turn **actor handoff**. The engine hands us the predicate (`humanGate`), so this is contained: authority = "the current **actor**" (queue head's `pid`, else `S.active`), and the bridge syncs on actor-change as well as on `endTurn`. Exactly one client is ever authorized to write — LWW stays safe.
- **Hurdles, bounded:** ~50–100 lines of engine additions behind a net flag (seat gating, accessor, undo clamp, escaping, version stamp); a `game_type` migration + 4 query filters in PDX; a Hanse-specific lobby-lite + room route in PDX (deliberately NOT generalizing the 3,172-line PDX launcher — some duplication is the minimal-impact choice).
- **Accepted limitations (posture, unchanged by this project):** trusted lobby — no auth, open RLS, spoofable seats, open deck order in the blob, no server validation. Fine for playtesting among friends; recorded, not fixed here.
- **Rejected alternatives:** porting Hanse into React/zustand (weeks, forks the canonical mirror, violates the separation goal) and building Hanse its own backend (duplicates a working platform, abandons unification).
- **Unified-platform verdict:** the second game is what forces the platform to exist. Deliverables that generalize: `game_type` on the row, the **envelope contract** (the ~6 fields any game's blob must expose), the extracted `platform core` module, and the iframe/postMessage **game-adapter protocol**. A third game then costs roughly Phase 1 + a thin lobby page. PDX itself never has to migrate — it already satisfies the contract natively.

## 4. Architecture

**Platform shell (PDX repo) + iframed game client (Hanse's own published `play.html`) + postMessage bridge. Repos stay separate; Hanse stays canonical in its own repo and keeps deploying to GitHub Pages.**

**Row envelope** (`games.state` for `game_type='hanse'`) — satisfies every field the platform reads today:

```js
{ stateVersion, updatedAt,                 // platform ordering (same convention as PDX)
  turnNumber: S.turn,                      // keeps endAbandonedGames (multiplayer.ts:623) working
  currentPlayerIndex: actorSeat,           // whose input is required (handoff-aware)
  gameEnded: !!S.over,
  players: S.players.map(p => ({name})),   // lobby list / rename / transfer surface
  engineKey: KEY,                          // room pinned to the Hanse build
  hanse: { S, UI } }                       // the payload proper (log tail-trimmed)
```

**Bridge protocol (postMessage, explicit origins both ways):**

| msg | dir | payload |
|---|---|---|
| `HELLO` | game→shell | `{engineKey}` — shell verifies against the room's pinned key |
| `INIT` | shell→game | `{seat, setup:{n,names,aiSeats}}` (host, fresh) or `{seat, state:{S,UI}}` (join/resume) |
| `COMMIT` | game→shell | `{S, UI, actor, over, results?}` — fired at `endTurn` AND on actor-change (prize handoff) |
| `STATE` | shell→game | `{S, UI, actor}` — on remote update; game applies, clears undo, renders |
| `RESYNC` | either | request a full refresh |

**Authority rule:** `actorSeat(S,UI)` = head of the pending prize queue's `pid` (mirror of `humanGate()`), else `S.active`. The shim gates all ~40 action functions on `actorSeat()===mySeat` (one wrapper loop, not 40 edits) + a pointer-events overlay for UX. Only the actor's client writes; everyone else renders.

**Flow:** create room (envelope with names, `hanse:null`, status `waiting`) → joins update `players[].name` under CAS → on full/start-early the HOST's iframe boots `freshState(n, names)` + marks AI seats → first `COMMIT` fills `hanse:{S,UI}` → guests' iframes `INIT` from the blob. AI turns run on the host's client (watchdog takeover later). On `S.over`, shell marks the row `completed`.

**Version policy:** rooms pin `engineKey` at creation; a KEY bump strands in-flight rooms exactly like it clears local saves today — that IS the standing dev culture, now with a clear "room was started on an older build" message. Iframe src defaults to the live Pages URL (`?src=` override for local dev), so Hanse deploys stay one `git push` and the platform always embeds the live mirror.

## 5. The plan

**P0 — Platform prep (PDX, ~half day).** Migration: `ALTER TABLE games ADD COLUMN game_type TEXT NOT NULL DEFAULT 'pdx'` + index `(game_type, status)`. Thread `.eq('game_type','pdx')` into the four list queries (`fetchPublicGames :133` · `fetchAllGames :883` · `fetchCompletedGames :1172` · `/live :212`) and write it in `createMultiplayerGame`. Extract `lib/platform/core.ts` by MOVING the generic pieces (code gen, client id, active-games ledger, subscribe, polling, presence, heartbeat, status lifecycle, CAS idiom) and re-exporting from `multiplayer.ts` so zero PDX call sites change. **Gate: PDX plays unchanged (vitest + a 2-browser smoke).**

**P1 — Hanse net shim (hanse repo, ~1–2 days).** Engine additions behind `?net=1` (an engine change → canon read + KEY bump + `verify-v4` + light sim, per standing rules): `window.HANSE` accessor; net boot path (skip setup modal + localStorage, await `INIT`); `actorSeat()` + the action-gating wrapper; unconditional undo clamp on commit/apply in net mode; escape `p.name` at ingest; stamp `S.schema=KEY` in `freshState`; the postMessage shim (`net.js` or a guarded inline block). **Gate: two browser tabs play a full 2p game through a 20-line harness page that hand-shuttles envelopes — protocol proven with no backend involved.** Solo `play.html` behavior byte-identical without the flag.

**P2 — Platform hosting (PDX, ~1–2 days).** `lib/hanse/multiplayer.ts` on `core.ts` (`game_type='hanse'`, envelope create/join/start — no PDX seat synthesis). Routes: `/hanse` lobby-lite (create/join/QR/public list, seat names, AI-seat toggles exposing Hanse's five tiers, start) + `/hanse/[code]` room page (iframe + bridge: subscribe→`STATE`, `COMMIT`→bump→UPDATE, presence, host-runs-bots, engineKey guard). `/live` gains a `game_type` column/filter. **Gate: full 2p online game across two devices via Supabase; PDX regression smoke repeats.**

**P3 — Hardening & platform-ization (as earned).** Port the automa watchdog for Hanse bots; rejoin/device-transfer for Hanse rooms; spectator (read-only `STATE` feed); optional deck redaction; pin/vendor lucide; write `PLATFORM-CONTRACT.md` (envelope fields + adapter protocol any future game implements — the unified-platform deliverable); optionally have PDX declare the same contract explicitly (docs only, no behavior change).

**Not doing:** PDX game-code changes (zero — its rules/store/UI are untouched), auth build-out, server-authoritative validation, a React port of Hanse, generalizing the PDX lobby UI.

**Effort to first cross-device Hanse game: ~3–5 focused days**, risk concentrated in P1's handoff edges — which the tab harness de-risks before the platform is ever involved.

## 6. Open dials for the designer

1. **Player counts online:** cap at 2–4 for v1 (5p runs but isn't tuned; PDX platform assumes ≤4 — `PLAYER_COLORS` etc.)?
2. **Iframe source:** live Pages URL (always the latest mirror; KEY bumps strand in-flight rooms — matches current culture) vs a vendored per-deploy snapshot (stable rooms, extra publish step)? Study assumes live Pages.
3. **Undo policy in net play:** none, or "within your own uncommitted segment" (study assumes the latter — closest to a friendly table's takeback)?
4. **`/live` depth for Hanse:** envelope basics only (v1) or a Hanse detail panel later?
5. **Spectators:** worth a read-only seat in v1, or wait for P3?
