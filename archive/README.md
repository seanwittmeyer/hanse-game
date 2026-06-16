# Archive — Brewhouses of the Hanse, v0.16.1 "The Wharf"

A frozen, **playable** snapshot of the game as it stood on 2026-06-16, just before the
v1.0 "Demand" clean-sheet began.

- **Play it:** open `archive/play.html` (live: `…/archive/play.html` on the Pages site).
  It is the complete v0.16.1 reference implementation — hotseat + AI seats, fully offline.
- **Save isolation:** this copy uses its own `localStorage` key (`hanse-archive-v0.16.1`),
  so playing the archive never touches — and is never wiped by — the live/v1.0 build.
- **Full source revert point:** branch `archive/main-v0.16.1` (commit `31311b7`) holds the
  entire repo at this version (docs, pages, playtests). This folder is just the play page.
- **In-tree snapshot:** `archive/v0.16/` holds file-by-file copies of the v0.16.1 design docs
  and pages (RULES · COMPONENTS · DESIGN · CHANGELOG · README · AUTOMA · the four HTML pages),
  kept for easy reference while the canonical root files are edited forward. **Reference only —
  do not edit.**

Why it exists: the next chapter reconceives scoring + the slot layer around **living,
composable Wharf slots** (see `/PLAN.md`). The Wharf build was good and worth keeping reachable.
