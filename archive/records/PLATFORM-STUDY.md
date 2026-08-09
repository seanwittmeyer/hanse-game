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

**P0 — Platform prep (PDX, ~half day).** Migration: `ALTER TABLE games ADD COLUMN game_type TEXT NOT NULL DEFAULT 'pdx'` + index `(game_type, status)`. Thread `.eq('game_type','pdx')` into the four list queries (`fetchPublicGames :133` · `fetchAllGames :883` · `fetchCompletedGames :1172` · `/live :212`) and write it in `createMultiplayerGame`. **Guard the PDX join path against cross-contamination** (found in verification): `joinMultiplayerGame` (:364) synthesizes PDX player objects into whatever row the code matches — it must reject `game_type!=='pdx'`, and `/game/[code]` should redirect hanse rooms to `/hanse/[code]` instead of running the PDX name-form flow. Extract `lib/platform/core.ts` by MOVING the generic pieces (code gen, client id, active-games ledger, subscribe, polling, presence, heartbeat, status lifecycle, CAS idiom) and re-exporting from `multiplayer.ts` so zero PDX call sites change. **Gate: PDX plays unchanged (vitest + a 2-browser smoke).**

**P1 — Hanse net shim (hanse repo, ~1–2 days).** Engine additions behind `?net=1` (an engine change → canon read + KEY bump + `verify-v4` + light sim, per standing rules): `window.HANSE` accessor; net boot path (skip the setup modal, await `INIT`, and **no-op `save()`/skip `load()` entirely** so net games never touch the local hotseat slot under `KEY`); `actorSeat()` + the action-gating wrapper; unconditional undo clamp on commit/apply in net mode; escape `p.name` at ingest; stamp `S.schema=KEY` in `freshState`; the postMessage shim (`net.js` or a guarded inline block). **Gate: two browser tabs play a full 2p game through a 20-line harness page that hand-shuttles envelopes — protocol proven with no backend involved.** Solo `play.html` behavior byte-identical without the flag.

**P2 — Platform hosting (PDX, ~1–2 days).** `lib/hanse/multiplayer.ts` on `core.ts` (`game_type='hanse'`, envelope create/join/start — no PDX seat synthesis). Routes: `/hanse` lobby-lite (create/join/QR/public list, seat names, AI-seat toggles exposing Hanse's five tiers, start) + `/hanse/[code]` room page (iframe + bridge: subscribe→`STATE`, `COMMIT`→bump→UPDATE, presence, host-runs-bots, engineKey guard). `/live` gains a `game_type` column/filter. **Gate: full 2p online game across two devices via Supabase; PDX regression smoke repeats.**

**P3 — Hardening & platform-ization (as earned).** Port the automa watchdog for Hanse bots; rejoin/device-transfer for Hanse rooms; spectator (read-only `STATE` feed); optional deck redaction; pin/vendor lucide; write `PLATFORM-CONTRACT.md` (envelope fields + adapter protocol any future game implements — the unified-platform deliverable); optionally have PDX declare the same contract explicitly (docs only, no behavior change).

**Not doing:** PDX game-code changes (zero — its rules/store/UI are untouched), auth build-out, server-authoritative validation, a React port of Hanse, generalizing the PDX lobby UI.

**Effort to first cross-device Hanse game: ~3–5 focused days**, risk concentrated in P1's handoff edges — which the tab harness de-risks before the platform is ever involved.

## 6. Pre-approval verification pass (2026-08-05, same session)

Every load-bearing claim was re-checked against source before this plan was declared ready:

- **Sync-shape match** — read directly: PDX's write path is a bare full-blob UPDATE ordered by in-blob `stateVersion` (`syncGameState` :513–546, `bumpStateVersion` :492), synced at turn/phase boundaries only; the schema and open RLS confirmed in `scripts/001_create_games_table.sql`.
- **Out-of-turn surface is complete and closed** — read directly: `afterSail` (play.html:1914–1944) drains the four prize queues in strict order; each human pick blocks the flow (`UI.sub` → `precipe/benefit/bspec/lading`) and acts on the queue entry's `pid`; unaffordable prizes auto-resolve (consolation/forfeit) with no input; load-bonus `pendingActs` fire for `S.active` only. `humanGate()` (:2675–2683) reads exactly these five cases (four queue heads + `UI.tmp.placeBldg.owner`) — `actorSeat()` is a mechanical rewrite of it. No other engine path solicits input from a non-active seat (Supercargo/Bonded payouts are automatic `gain()`s).
- **Engine facts** — read directly: `let S`/`let UI` (:902–903), `KEY` (:927), turn-boundary `save()` + `boot()`'s `UI={sub:'move'}` reset (:3491–3496), undo clearing only on AI→human handoff (:1974), zero `location.search`/`prompt`/`confirm`/`alert`.
- **Envelope coverage** — every blob field the platform reads (`players[].name`, `stateVersion`, `turnNumber`, `currentPlayerIndex`, `gameEnded`, plus the `state->turnNumber` SQL at multiplayer.ts:623) is carried at the envelope's top level.
- **Two holes found and folded into the plan:** the PDX join-path cross-contamination guard (now in P0) and the net-mode local-save no-op (now in P1).
- **One item not verifiable from this sandbox:** the live Pages site's response headers (the session's egress proxy denies `*.github.io` — confirmed a policy denial, not a GitHub response). GitHub Pages offers no mechanism for custom headers and does not send `X-Frame-Options`/`frame-ancestors` on Pages responses, so embedding is expected to work; **P2 therefore opens with a two-minute embed smoke** (iframe the live `play.html` from a local Next page) before any bridge work, and the standing fallback — a vendored per-deploy snapshot under PDX `public/hanse/` — changes nothing about the protocol if ever needed.

## 7. Topology question (designer-raised pre-approval): monorepo / native port?

*"Would it make sense to build Hanse so it runs natively in the pdx-game repo — a monorepo with the games sectioned out — since we want to add other games on the same platform?"* Two separate decisions are bundled in that question; they get different answers.

**(a) How the game runs — own engine behind the adapter vs React-native rewrite. Recommendation: adapter, firmly, for Hanse.** A native port means reimplementing the rules in React/zustand — a second implementation of a game whose single-file engine is the CANONICAL MIRROR of the rules, while the design is at its hottest (seven KEY bumps 08-02 → 08-04). Every designer ruling would land twice, and the entire instrument bench — `sim.js`, `verify-v4.js`, the probes, the ladder — extracts `play.html`'s script and drives the engine's own functions; a port either forks that bench or drifts from it. The repo's own standing lesson applies verbatim: *"drive the canonical engine, never a reimplementation (which would drift from play.html)."* The adapter keeps one implementation, one mirror, one bench. (A FUTURE game designed digital-first can absolutely be written platform-native in React and register through the same `game_type`/registry — the contract supports native modules and iframe adapters equally. Hanse is special because its value is precisely that it is NOT platform-native.)

**(b) Where the code lives — two repos vs monorepo. Recommendation: two repos now; revisit on a named trigger.** The genuine monorepo wins are atomic platform+adapter commits (no protocol version skew between repos) and same-origin serving (deploy = one unit, no live-Pages-vs-room KEY skew). The costs, for this studio, outweigh them today: the hanse repo is a design studio, not just a game — Pages-from-main IS the playtest deployment (publish-to-main-per-turn doctrine), and the standing agent workflow (root `CLAUDE.md`, the session skills, the records archive, the sim paths) assumes repo root; PDX is a v0.app-synced auto-deploying app, and restructuring it into workspace packages risks the working deployment while buying nothing the adapter needs; and "sectioning out" PDX itself into `games/pdx` is a large refactor of exactly the thing this plan promises not to touch. Note the integration work is IDENTICAL either way — seat gating, actor handoff, envelope, bridge are about making the engine multiplayer, not about where files live. A monorepo would relocate the plan, not shrink it.

**The monorepo's runtime benefit is available inside the two-repo plan as a dial:** vendor a pinned Hanse snapshot into PDX `public/hanse/` at build time (same-origin, atomic deploys, stable rooms) instead of pointing the iframe at live Pages (always-fresh, matches playtest culture). Both work with zero protocol change; §7-dial 2 already carries this choice.

**Revisit topology when any of these fires:** Hanse's design freezes (a v1.0/print-settled build), a third game arrives, or cross-repo protocol churn becomes a felt annoyance. The P3 `PLATFORM-CONTRACT.md` is what makes that later move cheap — the postMessage/envelope contract is exactly the seam a monorepo would cut along, so nothing done now is thrown away.

## 8. SHIPPED — P0 + P1 (2026-08-09, designer-approved "go all in")

The engine moved v4.9d → **v4.11 "Factor's Fee"** under this study (the 08-06/08-08 letters); every architecture fact the plan rests on held (the `(S,UI)` pair, `endTurn`, the prize queues, `humanGate`), and the shim was cut against v4.11.

**P1 — the hanse net shim (hanse `8eb7861`, `KEY hanse-v411n1`, published to main).** ~30 engine lines behind `?net=1` (the `NET` const · save/load bypass · `actorSeat()` — humanGate's oracle as a seat id · `syncFlagsFromS()` · `S.schema` stamp · `aiSpeedOverride` · the `window.HANSE` accessor · net boot) + `net.js` (the postMessage bridge: HELLO/INIT/STATE/COMMIT/RESYNC · gating wrappers over the whole ~44-function action surface · botRunner-only AI · undo cleared at every commit/apply · names escaped at ingest · the status banner) + `playtests/net-harness.html` (a two-seat table on one page — the parent-shell protocol in miniature) + two standing gates: `net-probe.js` (two REAL engine+net.js clients in vm with a router — full-game convergence byte-identical, single-writer held, two-way play, and the S3 handoff round-trip) and `net-smoke.mjs` (Playwright: real iframes/postMessage — a full AI game converges byte-identical; human mirroring, gating and the banner verified). **Gates: verify 212/212 (unchanged) · sim 3/count clean · net-probe ALL PASS · net-smoke ALL PASS · solo boot byte-equivalent (no netbar, NET=false, shim inert).** The harness runs on the live Pages site (`playtests/net-harness.html`) — a playable two-seat online-table demo with zero backend, which also settles §6's embed question for the same-origin case.

**P0 — platform prep (PDX `9e12bb3`, feature branch ONLY — PDX main untouched).** `scripts/add-game-type-column.sql` (**apply in Supabase BEFORE deploying this branch** — the new queries reference the column) · `lib/platform/core.ts` (the game-agnostic mechanism + `PlatformGameRow<TState>`; imports only the supabase client) · `multiplayer.ts` re-exports/wraps it PDX-typed (all 51 existing imports resolve; export parity 43/43 audited) · `game_type='pdx'` stamped on create and filtered into the three list queries + `/live` · foreign-code guards on `joinMultiplayerGame` **and two further write paths the completion audit found** (`joinOpenSeat` via `?joinseat=`, `transferPlayerSlot` via the transfer route) · `/game/[code]` + the transfer route hand non-pdx rooms to `/<game_type>/<code>`. **Gates: vitest 86 passed (baseline-identical) · next build clean with zero Supabase env · tsc --noEmit 0 errors.**

**Carried watches:** the shared active-games ledger will surface game-2 entries in PDX's list once game 2 writes it (P2 filters by fetched game_type) · `endAbandonedGames` sweeps cross-game BY DESIGN (the hanse envelope must carry top-level `turnNumber` — P2 contract item; conscious sign-off recorded) · the wrong-game handoff link 404s until `/hanse` exists (P2) · realtime channels are code-keyed, not type-guarded (safe: reachable only after a guarded join/create).

**Next: P2** — `lib/hanse/multiplayer.ts` on `core.ts` (envelope create/join/start), `/hanse` lobby-lite + `/hanse/[code]` room page whose bridge is the harness router with the Supabase row as the store, `/live` game_type column.

### P2 + P3 SHIPPED (2026-08-09, same session — PDX `1dccf66` on the feature branch · hanse `9ea696d` on main)

**P2 (PDX):** `lib/hanse/` — `config` (iframe → the live Pages `play.html`, `NEXT_PUBLIC_HANSE_URL` + `?src=` overrides) · `envelope` (the row contract, pure + 6 unit tests) · `multiplayer` (create/join/AI-seats/start-early/resize/claim-by-name/leave on core with CAS retries; LWW gameplay writes; a hanse-own `hanse_active_games` ledger — the shared-ledger watch from §8 is closed, each game lists only its own tables). `app/hanse` lobby-lite + `app/hanse/[code]` room: waiting room (seats/QR/host controls, auto-start on full) + the bridge (HELLO pins `engineKey`, host INITs setup, COMMIT→`wrapCommit`→row, remote→STATE, never echo the sender). `/live` gains a read-only "Other platform games" section. **P3:** staggered automa watchdog (12s+seat·3s takeover, demoted when another writer resumes) · spectator = seat −1 (net.js banner says "watching") · rejoin via ledger + `?as=` name claim · lucide 1.31.0 vendored (play/index/print off the unpkg `@latest` CDN — zero external requests) · `context/PLATFORM-CONTRACT.md` (the row/envelope/adapter contract + PDX's native conformance — the unified-platform deliverable). Deck redaction DECLINED (trusted-lobby posture, recorded dial).

**Gates:** PDX vitest 92 (6 new) · `tsc --noEmit` 0 · build clean (`/hanse` static, `/hanse/[code]` dynamic) · production-server render smoke of both routes — which caught a REAL crash pre-commit (core's `subscribeToGame` on the null unconfigured client; guarded at the call site per core's contract). Hanse net-probe + net-smoke re-run ALL PASS after the part-2 letter.

**Additional testing + the PDX main push (2026-08-09, designer-directed).** The hanse conformance gates grew to **S1–S8** (`net-probe.js`: 2p/3p/4p full-game convergence · undo clamps in/across segments · spectator seat −1 · mid-handoff DEVICE TRANSFER with three-client convergence · RESYNC · key-mismatch refusal — ALL PASS, zero bridge changes needed) and the browser smoke gained a live guest reload/rejoin leg (the harness re-seats late HELLOs — the platform room page's exact rejoin behavior) plus correct playwright timeout plumbing and failure diagnostics; hanse `933ecce`, verify now **228/228** (the battery grew under the designer's parallel letters). PDX gained **pre-migration resilience** so main-deploy order is free: `isMissingGameTypeError` (core, unit-tested against the three observed Postgres/PostgREST shapes) lets every PDX list query retry filterless and the insert fall back to the legacy row shape — the app behaves exactly as pre-platform until the migration runs — while HANSE refuses untyped rows with a run-the-migration message; plus the room page's **setup watchdog** (host gone before the table filled → a seated client bootstraps the engine, staggered) and the sendSetup seat fix. Gates: vitest 95 · tsc clean · build clean · pages smoke clean. **PDX `main` fast-forwarded to `59a0739`** (P0+P2+P3+resilience — the deploy). The migration remains the switch that turns hanse tables on.

**Not verifiable from this sandbox:** the cross-device Supabase round-trip (no egress/env here). The 10-minute live check after deploying: (1) run `scripts/add-game-type-column.sql` in Supabase; (2) merge/deploy the PDX branch; (3) two devices → `/hanse` → create + join → play two turns each way, sail a rival's cask to Bergen (the handoff: the owner's device gets the pick), add a Guildmaster seat and watch the host drive it, close the host tab mid-bot-turn (watchdog takes over ≤ ~20s), finish a game (standings on both + in `/hanse` results). The child protocol itself is already conformance-proven by the hanse-repo gates.

## 9. Open dials for the designer

1. **Player counts online:** cap at 2–4 for v1 (5p runs but isn't tuned; PDX platform assumes ≤4 — `PLAYER_COLORS` etc.)?
2. **Iframe source:** live Pages URL (always the latest mirror; KEY bumps strand in-flight rooms — matches current culture) vs a vendored per-deploy snapshot (stable rooms, extra publish step)? Study assumes live Pages.
3. **Undo policy in net play:** none, or "within your own uncommitted segment" (study assumes the latter — closest to a friendly table's takeback)?
4. **`/live` depth for Hanse:** envelope basics only (v1) or a Hanse detail panel later?
5. **Spectators:** worth a read-only seat in v1, or wait for P3?
