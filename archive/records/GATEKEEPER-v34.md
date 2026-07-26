# Gatekeeper Review — v3.4 "Tally Dice" (KEY `hanse-v34`)

*Standing review-board verdict, 2026-07-19. The designer's question: **is the OWNERSHIP of
slot tiles (blue Privileges pay their owner only · owner frames · ground-rent overbuild ·
displacement flips) holding the game back from a more elegant approach?** Reviewed against
the full v3.4 canon (complete reads of `RULES.md` and `play.html` this session), the v3.2d
review and its 15-game Cellarmaster corpus, the v3.4 PATHWAYS A/B
(`playtests/sim-results-vhanse-v34*.txt` vs a same-day v3.3 baseline), and the tally-dice
oracle record (`playtests/dice-experiment/REPORT.md`). No table data fabricated; claims
only a human table can settle are marked.*

---

## 1 · The verdict

**No — ownership is not what's holding the game back. It is the demand lane's depth
engine, and the corpus proves it. But the ownership SYSTEM is carrying about twice the
rules and components that the depth actually requires, and the elegant move is a targeted
amputation, not a redesign.** Ownership pays for itself in exactly one place: the blue
Privilege's owner-only departure — that single conditional generates authorship,
departure-sequencing (the skill whose whiff decided a corpus game by 24 points), the
denial-squat, and the racer archetype. Everywhere else it is dead weight: **green works
carry owners whose ownership has no effect in play** (a coloured frame that actively
*disinforms* — a green tile in a red ring looks like it pays red, and the two setup-seeded
neutral works prove the game runs ownerless greens without a hiccup), and the
**displacement machinery (rent → flip → Floor-Wild → none-open-discard → neutral-discard)
is a five-branch rule servicing a ~0.6-per-game event whose scoring was already stripped in
v3.3.** Trim ownership to the blues, make every displaced tile a plain discard, and the
taxonomy teaches itself — *blue pays you, green serves all, purple is private* — with half
the frames and none of the false signals. The game overall remains v3.2d's conditional
yes; v3.4's component unification moved it closer to shelf-ready, and this trim is the
same knife applied one system over.

**The delta verdict (did v3.4 land?):** Yes, cleanly — verify 93/93, render-smoke full
pass, PATHWAYS A/B run same-day against v3.3. The disc/die unification is a pure elegance
win (−56 discs −8 shared dice −1 rules concept; ownership of *casks* is now one component
everywhere). Two watch items are honestly open: privileged flat-kontor deliveries pay 1★
less (the demand lane cooled; 2p prestige warmed 50→70% in the greedy-persona oracle —
the dial is +1 on the Staple/charter prints, and it needs a PATHWAYS A/B before adopting),
and the tray gates raised the greedy bots' round-ceiling share (a real-tier corpus, on the
designer's call, before touching any pace dial).

## 2 · The panel

**The Critic — the taxonomy is one class too heavy.** The blue tile earns its ink: an
owned, placed, contestable promise of demand is the GWT player-built-track idea compressed
into one tile, and "set the die as your barrel leaves your charter" is theme and mechanism
in a single gesture. But I count three ownership rules where the design uses one: green
works have owners that never matter, frames mark tiles whose frames mean nothing, and the
displacement flip feeds a Floor-Wild stop that scores nothing and fires almost never. A
$64-shelf euro doesn't get to carry vestigial organs. *Flips to strong yes when:* greens
are ownerless, displacement is one sentence ("pay 1G; the tile is discarded"), and the
deck-integrity trio from v3.2d (Rope Walk · Pilot's House · Open Staithe) is finally
priced or cut — that item is now two reviews old.

**The Buyer — the frames are a cost and a demo stumble; the authorship is part of the
pitch.** "Buy the trading privilege, then route your own beer through it" sells the Hanse
fantasy in one sentence — keep it. What I can't have on a con floor is the question "why
didn't my +3 fire?" — the answer ("check the frame colour under the tile the cask left")
is a two-token read that new players will get wrong in their first game. Halving the
frames (blues only) removes the false-positive reads and trims the BOM I already flagged
at v3.2d. *Flips when:* the frame count drops, and the teach can say "blue pays you,
green serves everyone" with no exceptions clause.

**The Optimizer — do not de-own the Privileges; that's where the skill lives.** The
corpus's best legible-loss story is ownership-shaped: two Privileges bought and never
routed through, a 24-point deficit the loser can name. Departure-sequencing (deploy onto
*your* tile, leave from it, die turned to N) is a genuine planning layer; the denial-squat
is real interaction; the racer archetype is built on authored geometry. Any "elegant"
proposal that pays the privilege to whoever departs — or moves privileges off-board into
personal tableaus — deletes exactly this. My concerns run the other way: the v3.4 −1★ on
privileged flat-kontor deliveries cools the demand lane (demand persona was already the
low lane at 2–3p in the v3.4 PATHWAYS), so the privilege *prints* likely want +1 back.
*Flips to strong yes when:* the print-bump A/B lands demand within fair, and a human
table confirms the unrouted-privilege loss reads as misplay, not gotcha (carried from
v3.2d).

**The Bridge Player — the colour taxonomy is good pedagogy being undermined by the
frames.** "Blue is yours, green is everyone's, purple is on your board" is a genuinely
teachable sentence — better than GWT's building rules. The problem is the second signal:
every placed tile sits in a player-coloured ring, so the table shows *two* colour systems
and only one of them matters. New players will read the ring on a green work as meaning
something (it doesn't, in play), and will miss that the ring on a blue tile is the one
that gates their die. One ownership signal, on the tiles where ownership is real, is
strictly easier to teach. *Flips when:* the green frames go, and learn.html finally
gains the rival-loading sentence — **third review in a row: the game's signature rule is
still absent from its teaching page.**

## 3 · Strengths (mechanics, with receipts)

- **Owner-only departure is a one-conditional depth engine.** `privDie` gates on
  `bd.owner===owner` — one check — and from it fall authorship, routing, the squat, and
  the corpus's Lisboa-grade regret story. That is an exceptional depth-per-rule ratio.
  The elegance problem is *around* it, not in it.
- **v3.4 made cask ownership one component everywhere.** The tally die is owner, value,
  presence, and clock in a single object; every deployed cask, berth, and kontor pile now
  reads by die colour. The board's ownership legibility *improved* this version — which
  sharpens the contrast with the tile-frame system it left behind.
- **The ownerless green already exists and works.** Setup seeds two neutral works; the
  rules handle them in half a sentence ("no owner; overbuilt = discarded"). Extending
  that to every green is a deletion, not a design.
- **The ground rent is a good rule.** One flat fee, paid to the stores, priced the
  overbuild carousel out of existence (v3.2d corpus: ~0.6/game, exploit closed). Keep it
  exactly as is — it's the displacement *aftermath* that's overbuilt, not the fee.

## 4 · Weaknesses and cut corners (ownership-weighted)

- **Green-work ownership is a dead concept with a live cost.** Its only in-play effects:
  where a displaced tile flips (about to be moot), an AI tie-break, and a tooltip. For
  that the game pays 24 frames, a placement step, and a standing false signal on the
  board.
- **The displacement chain is five branches for a rare event.** Rent → rival flip-to-Floor
  → self flip-to-Floor → none-open discard → neutral discard. v3.3 already stripped its
  points ("flips are engine, never score"); what's left is a consolation Wild worth ~one
  Floor stop per several games. The chain exists to soften an eviction the rent already
  prices.
- **The v3.4 privilege haircut is unaddressed.** Privileged flat-kontor deliveries pay 1★
  less than v3.3 (the die floor replaced the base *under* the privilege too). Cheap to
  fix at the prints; wrong to leave ambient.
- **Carried, still open from v3.2d:** the three under-earning green tiles; the
  rival-loading teach sentence; the human-validation set (2p clocks, FAME-race feel,
  unrouted-privilege feel); the BOM-vs-price call.

## 5 · The depth dial

Unchanged in shape from v3.2d — **loss legibility: PASS**, three archetypes live, no
dominant line — with two v3.4-specific cautions. The demand lane sits low at 2–3p in the
persona oracle (24.9–37.5% vs fair) and the −1★ haircut is the likely culprit: **too
thin, by one pip, at the prints.** The tray gates add a real constraint (deploy/Reach need
a die in hand) that humans will navigate by tapping and enshrining — the greedy bots
don't, so their ceiling share rose; treat bot pace as noise until the real-tier corpus
runs. Ownership itself sits exactly where the dial wants it: the blue conditional is
depth; everything being trimmed is neither depth nor difficulty, just mass.

## 6 · The comp face-off

Standing verdicts from v3.2d hold (deeper than Distilled; wins interaction vs GWT, loses
systems density). The ownership question sharpens one line of it: **GWT's buildings are
owner-used but never owner-*decorated*** — hand icons on the tile, no frames, no
displacement consolation — and that economy of signal is part of why its player-built
board reads at a glance. Post-trim, Brewhouses' slot layer would actually beat GWT's on
teachability (three colours, one sentence) while keeping the contested-placement depth GWT
doesn't have (GWT buildings are never displaced; ours are, for a fee). Distilled has no
authored-board layer at all — this system, cleaned, is a differentiator against both.

## 7 · Pull diagnosis

Depth pull, matching intent — unchanged. The ownership system serves depth *only through
the blue tiles*; the frames, green owners, and flip machinery contribute to no pull engine
at all (they are not depth, not variety, not comfort, not fantasy — they are upkeep).
Note for the fantasy sliver: "your die rides your barrel out of your charter house" is
the strongest theme-mechanism fusion sentence the game now owns — v3.4 accidentally
improved the fantasy voice; the art pass should cash it.

## 8 · The path forward

**Must-fix before shelf-ready:**
1. **The ownership trim.** Greens are ownerless once placed (frames on blues only, 24→~12;
   green displacement = discard, like neutrals); ALL displaced tiles are discarded — the
   flip-to-Floor Wild is cut (the Workshop keeps Wild-on-dock). One rules sentence
   replaces five branches. *Test: verify-v3 + sim regression (expect a negligible AI
   Floor-value shift); a blind reader states the three-colour rule with no exception
   clause.*
2. **The privilege print bump A/B.** Staple 3→4, kontor charters 4→5, Hanzehuis 3→4
   (Burgomaster stays =Q; Connoisseur stays 4 pending data) — restores v3.3 delivery
   totals under the die floor. *Test: PATHWAYS 400×3 vs v3.4 baseline; demand within
   ±5 of fair at 3–4p; 2p prestige back under ~55%.*
3. **Carried v3.2d items, now overdue:** the deck-integrity trio (price Rope Walk, rework
   or cut Pilot's House and Open Staithe); the rival-loading sentence in learn.html
   (third flag); the human-validation set — to which add v3.4's own questions: do the
   tray gates read as tension or as a stall at a human 2p table, and does the die-turn
   departure ritual land as satisfying or as bookkeeping?
4. **The real-tier corpus on v3.4** (designer-gated): CM/GM games to check the ceiling
   share and the tray-gate feel at strong play before touching `SAILED_CAP`/`PRES_POOL`.

**Would elevate it above the comps:**
5. **Explore the die-armed privilege** (a design direction, not a decision): the owner
   arms their privilege by parking a tally die ON it, pre-turned to N; a departing cask
   *picks the die up*; the tile sits unarmed until re-armed from the pool. One component
   grammar across demand, volume, and presence — the privilege lane would spend the same
   14-die budget as everything else, the frame question dissolves for blues too (the die
   IS the ownership mark), and "arm the charter" is a thematic gesture. It changes the
   pool economy, so it needs the full oracle battery first — but it is the natural end
   of the road v3.4 started, and the only version of "more elegant ownership" on the
   table that *adds* depth instead of spending it.
6. The die-set departure ritual printed on the blue tiles (carried from v3.2d §8.5 — now
   stronger, since the die is the player's own colour).

**If Sean does only one thing: the ownership trim (#1).** It is the rare change that is
simultaneously a rules deletion, a component deletion, a teach improvement, and a
legibility fix — and it costs the depth engine nothing, because the depth was never in
the frames.
