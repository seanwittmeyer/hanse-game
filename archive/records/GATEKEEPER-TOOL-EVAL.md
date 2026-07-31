# Tool Evaluation — `/brewhouse-gatekeeper` as the holistic-review instrument

*Evaluation record, 2026-07-31. Subject: the `/brewhouse-gatekeeper` skill
(`.claude/skills/brewhouse-gatekeeper/` — `SKILL.md` + `references/{comps,gatekeepers,pull-framework}.md`),
evaluated against its real outputs and the program they produced. Occasion: the review-#2 →
v4.5b cycle (playtest #24 → `GATEKEEPER-v45.md` → designer rulings → `V45B-OPEN-ORDERS.md`,
all same-day). Question put: is this skill a good tool for this kind of holistic design review?*

**A correction to the record first:** the archive holds **four** convocations, not two —
`GATEKEEPER.md` (v2.8, "the first standing gatekeeper review" per DESIGN.md §9),
`GATEKEEPER-v32d.md` (directed question: the $64 price frame), `GATEKEEPER-v34.md` (directed
question: is tile ownership holding the game back), and `GATEKEEPER-v45.md` (titled "Review
#2"). All four follow SKILL.md's eight-section output exactly; git cannot order the first
three against the skill's creation (all enter at the import commit `b64837f`), but they are
the same instrument in use. The #1/#2 numbering is therefore ambiguous — see §5, item 5.

---

## 1 · Fit: did the lenses find anything, or just format the playtest?

**Honest split: the *what* mostly came from the table; the *why-it-matters, how-it-connects,
what-order, and what-exactly-to-build* came from the skill.** Review #2's preamble concedes
the input: the designer arrived with four felt problems ("scores high / banking unclear ·
buildings unexciting & dice under-manipulated · auto-aging devalues Age · actions/arcs/goals
disconnected"), and the review's four headline weaknesses map one-to-one onto them. Even the
keystone call — "If Sean does exactly one thing: cut auto-aging" — elevates the designer's own
read (DESIGN.md §9: "the designer's read on #24 stands: 'automatic aging devalues age'").

But three findings demonstrably could **only** have come from the skill's reference lenses,
and each changed the program:

- **The Distilled five-alarm.** `comps.md` plants a tripwire: "If Brewhouses is *less* deep
  than Distilled, that's a five-alarm finding." Review #2 fires it: "**Critical finding:
  Brewhouses is currently at risk of being *less deep* than Distilled** — the five-alarm
  threshold in the dossier." No table datum ranks the game against Distilled; this is pure
  dossier work, and it is what turned four complaints into *urgency* — the justification that
  the fixes "each add a coupled decision to every mid-game turn."
- **The spread diagnosis.** `gatekeepers.md` defines the pattern ("Critic no / Buyer yes →
  sells but doesn't earn its weight; a hook with a hollow core"); the review applies it
  verbatim ("The spread: Critic no / Buyer yes — the classic *hook with a hollow core*
  pattern") and derives the identity-level headline from it: "the game is named for a
  component it barely lets you play." The playtest produced complaints; the panel machinery
  produced the *one sentence* the whole v4.5b program answers (8 of 17 buildings now touch a die).
- **The pull diagnosis.** `pull-framework.md`'s fork ("flag subsystems whose tuning is at war
  with the intended engine") becomes the review's §7: "comfort-tuned subsystems (auto-age,
  dealt bonuses, mint) sitting under a depth-tuned spine … subsystems at war with the intended
  engine. The fix direction is all one way: tighten, choose, print the goal." The table said
  "disconnected and random"; the framework unified five separate fixes into one direction.

Two further contributions sit between lens and formatting: the **causal chain** (mint → hull
flood → berth-race death → "the game drifts multiplayer-solitaire") is Optimizer-lens work —
the table showed five empty hulls; the interaction-loss reading comes from `gatekeepers.md`'s
Optimizer brief ("multiplayer-solitaire drift (does what opponents do actually matter?)").
And the **Ladings' component form** — "face-up row of 3 … claimed on a qualifying delivery,
refill at end of turn" — shipped nearly verbatim, down to example tiles ("Bergen · die 5+ →
4★" appears unchanged in the v4.5b schedule) and the refill timing matching the v4.4c display
rhythm. That is design contribution, not formatting.

**Fit verdict: real.** The archetypes are not decoration — the adopted program is traceable
to specific reference-file text a plain summary of #24 would not have produced. The earlier
corpus confirms it in the other direction: v3.4's directed question got "**No — ownership is
not what's holding the game back** … the elegant move is a targeted amputation, not a
redesign" — the skill pushing back on the designer's own hypothesis, which is exactly the
anti-sycophancy SKILL.md demands ("Sycophancy is the failure mode that makes this skill worthless").

## 2 · Blind spots: what the skill systematically does not see

1. **It has no data-intake step naming the repo's instruments.** SKILL.md's grounding is
   generic ("Look for rules docs … spreadsheets, and any playtest notes"). The reviews *did*
   read corpora (v32d: "the 15-game Cellarmaster corpus"; #2: "the full #24 diagnostic dump …
   sim reads are marked as such") — but that discipline came from the repo's CLAUDE.md
   context, not the skill. Nothing in the skill mandates reading sim/PATHWAYS/flow-probe/
   ladder outputs, and nothing imports the standing caveat (DESIGN.md §8: measure lanes "with
   **persona-committed bots** … never the greedy bot"). The skill is portable in name
   ("whichever Waterworks Games title is in the working directory") but its evidence
   discipline is currently inherited by accident of environment.
2. **It does not check the designer-rulings ledger or the balance lessons.** DESIGN.md §8's
   hardest-won lesson — "Correct *friction* with a *structure* lever, not the *value* lever"
   — is nowhere in the skill, and review #2 twice reached for the value lever where the
   designer then applied the structural one: the review proposed "Commission ★ = **berths −
   1**" (a re-price); the ruling was *cut the mint entirely*. The review proposed "raise
   [the Cellar] to **4 points** ⚙ to compensate"; the ruling was "The Cellar stays at 3
   (designer-held; no compensation raise)." The repo's own §8 predicted both rulings better
   than the review did. Not fatal — the designer layer caught it — but it is a systematic
   lean the skill does nothing to correct.
3. **It has no component-state / print-first gate.** One concrete miss: review #2's lading
   examples include "**deliver the same beer to two kontore → 3★**." That order requires
   remembering which *beer* a previously parked die was — state no component carries once the
   die parks (pips and body only). It is exactly the class of rule the 2026-07-12 hard line
   excludes, and the shipped 15-tile schedule quietly contains only conditions readable at
   the moment of delivery (inference: the record does not state why it was dropped). The
   review clearly *absorbed* the print ethos elsewhere ("Each is one line, one icon, read off
   the tile") but nothing in the skill enforces it per proposal.
4. **It never closes its own loop.** Review #2 printed falsifiable tests ("winner bank ≤
   ~25% of total; ≤2 empty docked hulls"; "count die-manipulations per game … target: most
   turns touch one") and four "flips my vote" lines — and no mechanism exists to re-score
   them after v4.5b shipped. v32d improvised a "delta verdict" section ("the v2.8 exploit
   list is verifiably closed"); the skill does not require one, and #2 has none.
5. **It does not audit itself against prior reviews.** v2.8's board complained "the scoring
   stack runs five systems where three would do"; review #2 then added a sixth source
   (ladings) and a bank sub-line (Tollhouse stamps) while diagnosing, in the same document,
   a "score-word collision" whose fix is "shrinking the infrastructure share." Reasonable
   trade — ladings are earned beer income — but no step forces the panel to notice it is
   re-opening its own prior finding.

## 3 · Calibration risks: does the archetype framing push genre-conventional advice?

**The pull exists and is visible, but the two-layer process (skill proposes, designer rules)
absorbed it this cycle.** The Bridge Player's flip line ("Give me a visible order to chase")
and weakness #4 ("No mid-game arcs") are stock euro instincts — order rows, mid-game goals,
engine arcs. Here they happened to land on the designer's own felt problem ("actions/arcs/
goals disconnected") and on a game with a tabled prestige axis waiting for "the Hall's
spiritual heir," and the designer said "I like this a lot." But the same instinct, aimed at a
build without that hole, would have added a scoring system to a game whose founding lesson is
the v0.7 reel-in ("Content, not rules") and whose pillar is "Crisp turns, deep decisions."
The creep is measurable: the scoring spine now runs six sources where the skill's own first
review wanted three (§2.5 above).

Against the hard lines, the record is mostly clean: **earned-not-bought** was actively used,
not violated (the Braumeister pitched as "the *earned* replacement for the cut auto-age");
**app-never-a-crutch** was explicitly honored ("the click-for-breakdown modal helps the app;
the fix for the *game* is shrinking the infrastructure share" — the mirror doctrine,
internalized); determinism respected throughout. The one hard-line collision is the
two-kontore lading (§2.3). The one lens-vs-pillar tension worth standing watch on: the
Optimizer's "one economy notch tighter" instinct vs the pole test (§8: "a lane may run HOT;
the failure is NEGATION") — tightening is genre-correct for depth pull, but this repo
rebalances on negation, not on heat, and the skill doesn't know that.

## 4 · Cost and moment: when should the board convene?

The history answers this cleanly. Playtest **#23** produced three designer rulings
(v4.1/v4.2/v4.3 — fees, toll, prices) with **no** convocation: parameter-level problems,
handled at the bench. Playtest **#24** produced one direct ruling for the mechanical fault
(v4.5's end-trigger stall — fixed before the board met; the review then ratified it: "the
empty-tray clock (v4.5) is the right trigger") and a convocation for the systemic residue —
four complaints spanning economy, components, an axis, and identity. Across the project the
cadence is roughly **one full review per version line** (v2.8 · v3.2d · v3.4 · v4.5), never
per playtest — which matches the skill's own trigger text ("Especially trigger this AFTER a
big design change or a few rounds of optimization").

**Convene when:** (a) a human playtest's complaints are cross-subsystem or identity-level
(the pitch-promise gap class), not parameter-level; (b) a keystone line has settled through
its patch letters and needs a "did it land" verdict; (c) a structural fork needs
adjudication — the v3.4 directed-question mode, which works well and should be codified;
(d) before external exposure (wide playtesting, launch — LAUNCH-PLAN already targets external
gatekeepers). **Do not convene for:** single-dial tuning, engine bugs, or post-program
verification — the last wants a cheaper regression mode (§5.4), not a full board.

## 5 · Concrete improvements to the skill

1. **Add a data-intake manifest step.** Before writing: enumerate and read the newest
   sim/PATHWAYS/flow-probe/ladder outputs and human playtest notes; tag every quantitative
   claim with its source class (human table · greedy sim · persona oracle · MC); import the
   standing caveat that greedy tiers are a robustness/pace oracle only. Today this rigor is
   borrowed from CLAUDE.md; the skill should carry it itself.
2. **Add a standing-rulings and balance-lessons check.** Read DESIGN.md §8 and the CLAUDE.md
   rulings (designer-held dials included) before §8-of-the-review; any proposal reaching for
   a value lever (re-price, compensate) must either argue why a structure lever won't do or
   flag itself as contradicting a named lesson. Evidence: both of review #2's value-lever
   proposals (berths−1; Cellar 4) were overridden in exactly the direction §8 prescribes.
3. **Add a component-state / print gate per path-forward item.** Each proposal names the
   physical component that carries any new state and passes "readable at the moment it
   matters." Would have caught the two-kontore lading before the designer had to.
4. **Add a follow-up/regression mode.** A light convocation (not the full board) that runs
   after a program ships: re-score the four "flips my vote" lines and the review's own
   printed tests against the new build; record flipped / not-flipped / still-open. v32d's
   "delta verdict" is the prototype; make it first-class so verification stops costing a
   full review. (First candidate: v4.5b's open tests — bank share, empty hulls,
   die-manipulations per turn, and the 2p ~20+-round greedy pace watch.)
5. **Keep a review ledger.** One block per convocation: number, date, build KEY, question
   put, verdict, open items. Fixes the numbering ambiguity (four records; the newest titles
   itself "#2") and gives improvement 4 — and a prior-review consistency check (the
   scoring-systems creep, §2.5) — something mechanical to run against.
6. **Refresh the comp-dossier discipline.** `comps.md` freezes the game at "medium-heavy
   (~3.3)"; the canon says GWT/Distilled weight, ≈45–60 min at 2p, "not Lacerda." Instruct
   the reviewer to re-derive weight/length/audience from the current canon each run and to
   cross-read DESIGN.md §5's own lineage table (which already encodes what each comp is
   *for*) rather than trusting the dossier's constants.

## 6 · Verdict

**Yes, with changes — this is the right instrument for milestone-grade holistic review, and
the v4.5b cycle is close to a best case for it.** The skill did what a summary cannot: it
converted four felt complaints into one identity-level diagnosis with lens-only findings
(the Distilled five-alarm, the hook-with-a-hollow-core spread, the comfort-drift call), a
causal account of the game's lost interaction, and a component-shaped program the designer
accepted nearly whole and shipped same-day — while its anti-sycophancy held across four
convocations (including telling the designer his own hypothesis was wrong, v3.4). Its
weaknesses are real but all of one kind: it does not know this repo's accumulated law — the
instrument suite, the balance lessons, the component-state hard line, its own prior verdicts
— so its rigor is currently on loan from CLAUDE.md and from the designer-ruling layer that
caught its value-lever leans and its one hard-line miss. Add the intake manifest, the
rulings-ledger check, the per-proposal component gate, and the regression mode, keep it on
the once-per-version-line cadence the history already shows, and it stops being a good tool
that got the right context by luck and becomes a reliable one.
