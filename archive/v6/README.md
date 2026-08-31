# Archive — v6.5b "The Voyage" (frozen, playable — the v6 TEST BUILD)

**This folder is the frozen, playable v6.5b test build** (save `KEY hanse-v65b`), archived
**2026-08-31** as v7 development begins at the repo root. It is a complete, self-contained
snapshot: the four pages, the shared card library (`components.js`), `nav.js`/`net.js`,
`vendor/`, and every `art/` asset the pages reference.

The v6 program ("The Voyage" — the sea map, voyages in transit, the current, posts and
factors) was ruled **a regression in feel** at the 2026-08-31 human table; the diagnosis
and the ten directives that drive v7 live in the repo root's `V7-PLAN.md`. This snapshot
preserves the build that table played, exactly as it stood.

## Play it
Open **`archive/v6/play.html`** — locally, or at that path on the live site. `print.html`
is the v6.5b print-and-play kit. (`rulebook.html` here is the v5.8 rulebook the build
shipped beside — the v6 program never reprinted it; `index.html` is the era's landing page.)

## Instruments
The **`playtests/`** folder inside THIS directory drives THIS archived build (each harness
reads `../play.html` relative to itself): `verify-v6.js` (the 72-check rule battery) ·
`sim.js` (the headless sim).

## Docs
The v6.5b doc set is snapshotted alongside: `RULES.md` · `COMPONENTS.md` (§0 is the v6.5b
kit delta) · `STYLE.md` (§4d is the v6 term family) · `AUTOMA.md`. The v6 program plan
stays at the repo root as `V6-PLAN.md` (history); designer decision records at `../records/`.

## THIS FOLDER IS FROZEN — never edit it.
All v7 work happens at the repo root. Nothing in `archive/v6/` may be changed.
