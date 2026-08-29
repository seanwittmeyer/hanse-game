# Archive — v5.8 "Pay the Second" (frozen, playable)

**This folder is the frozen, playable v5.8 build** (save `KEY hanse-v58`), archived
**2026-08-29** as v6 development begins at the repo root. It is a complete, self-contained
snapshot: the four pages, the shared card library (`components.js`), `nav.js`/`net.js`,
`vendor/`, and every `art/` asset the pages reference.

## Play it
Open **`archive/v5/play.html`** — locally, or at that path on the live site. `print.html`
is the v5.8 print-and-play kit; `rulebook.html` the printed rulebook; `index.html` the
v5.8 landing page.

## Instruments
The **`playtests/`** folder inside THIS directory drives THIS archived build (each harness
reads `../play.html` relative to itself): `verify-v4.js` (the rule battery) · `sim.js`
(the headless sim) · `strategy-probe.js` · `flow-probe.js` · `prize-probe.js` ·
`ai-ladder.js` · `ai-render-smoke.js` · `aid-overflow.js` · `net-probe.js`/`net-smoke.mjs`.

## Docs
The v5.8 doc set is snapshotted alongside: `RULES.md` · `COMPONENTS.md` · `DESIGN.md` ·
`STYLE.md` · `AUTOMA.md` (the repo's v5-era README is preserved as `REPO-README.md`).
Designer decision records remain at `../records/`.

## THIS FOLDER IS FROZEN — never edit it.
All v6 work happens at the repo root. Nothing in `archive/v5/` may be changed.
