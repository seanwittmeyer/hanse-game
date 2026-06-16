# Archive — Brewhouses of the Hanse, v0.16.1 "The Wharf"

A frozen, **playable** snapshot of the game as it stood on 2026-06-16, just before the
v1.0 "Demand" clean-sheet began.

- **Play it:** open `archive/play.html` (live: `…/archive/play.html` on the Pages site).
  It is the complete v0.16.1 reference implementation — hotseat + AI seats, fully offline.
- **Save isolation:** this copy uses its own `localStorage` key (`hanse-archive-v0.16.1`),
  so playing the archive never touches — and is never wiped by — the live/v1.0 build.
- **Full source revert point:** branch `archive/main-v0.16.1` (commit `31311b7`) holds the
  entire repo at this version (docs, pages, playtests). This folder is just the play page.

Why it exists: v1.0 reconceives the slot/scoring layer around **board-authored demand**
(see `/V1-PLAN.md`, `/RULES-v1.md`, `/COMPONENTS-v1.md`). The Wharf build was good and worth
keeping reachable.
