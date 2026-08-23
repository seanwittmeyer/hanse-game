# v5.5 “Four Hands” — the Venture family re-derived

*Designer-ruled 2026-08-23, in-session, immediately after v5.4 “The Tide”. `KEY hanse-v55`.
The rationale digest lives in `DESIGN.md` §9; the operational rules in `RULES.md` §5b; the
manifest in `COMPONENTS.md` §6b and its §10 delta.*

---

## 1. The ask

> *"The private venture buildings on the wharf are also implemented in an odd way. When a
> venture is built, the player may choose to place an L1 in an open slot, flip an L1 to an
> L2 in the same slot, or overbuild an L2 on top of an existing L1. This allows a player to
> get more buildings out. I think the 4 tiles and placement before was a little too rigid.
> It works in Great Western Trail because you have a pool of 10 + buildings but here there
> are less slots and less buildings. I also wonder if the benefits are good enough."*

Then, tile by tile, with a per-face verdict — reproduced in §3 because the ruling is those
verdicts, not a summary of them.

---

## 2. The diagnosis — the rigidity was arithmetic

Under v5.2–v5.4 an L2 could be reached **one way only**: spend a *second* hand tile,
L2-side up, over one of your own L1s. Two consequences the family never recovered from:

1. **Four tiles bought at most two buildings.** Every climb consumed two of four, and the
   spent L1 — already paid for and already placed — went in the box.
2. **The L2 half of the sheet was printed and unread.** The sim put **L2 climbs at
   0.6–1.3 per game** against **4–7 L1 placements**. Half the family's design surface was
   effectively out of the game.

GWT survives a strict climb because it deals from a pool of ten-plus buildings. Here the
hand is **four** and the ground is **eight slots the tide keeps churning** (v5.4). The
ratio does not transfer — that is the whole of the "too rigid" read, and it is arithmetic
rather than taste.

---

## 3. The ruling

### 3a. THE FLIP — the third way on, costing no new component

A standing L1 **already is** its own L2: the L2 was always printed on the back of that same
piece of cardboard. v5.5 stops forbidding the obvious move.

> **FLIP:** pay the **L2 fee (2 `G`)** and turn a **standing L1 of yours over in place** to
> its own L2 face. **No hand tile is spent.**

**OVERBUILD survives** for the one job it was actually good at: putting a **different**
theme's L2 onto ground you already hold. **PLAY AN L1** is unchanged (any open slot; wharf
full → it may replace a Public Work; never a rival's tile).

Three ways on, one component, and **no new rule to teach** — the tile teaches it by being
two-sided.

### 3b. THE FOUR THEMES

Pairing an L1 with an unrelated L2 is what made the old hand read as a grab-bag. Re-derived,
**each tile is one theme** carrying its own L1 and L2:

| Theme | L1 | L2 | Public line (L1 · L2) |
|---|---|---|---|
| **brew** | **Mash Tun** — on the line: BREW the stack's **top tile** | **Great Copper** — on the line: **gain 2 goods AND BREW** (full search) | +1 good · **age +2** |
| **age** | **Warehouse** — on the line: **Age 2**, then load 1 Ready cask onto **ANY** docked Ship | **Assay Loft** — on the line: pay **2 `H`** — **EVERY** maturing cask to READY | +1 good · age +1 |
| **die** | **Rack House** — on the line: **swap** the dice of 2 vessel casks | **Lagering Cellar** — on the line: a vessel cask's **die +1** (cap 6) | age +1 · Bourse ±1 |
| **points** | **Counting House** — your loads here: **+1★** each | **Staple Rights** — Ships sailing from here: your casks **+2★** each | Bourse ±1 · Bourse ±2 |

The designer's own framing:

> *"As far as sides, if we have 4 themes (brew, age, die, points), maybe we match the L2
> sides with like minded L1 sides. You can only have one side facing for each theme."*

**One tile per theme makes that a property of the component, not a rule.** A player who
wants the *age* engine knows which piece of cardboard to reach for.

### 3c. What retired, and why — the designer's verdicts

| Face | Verdict | Disposition |
|---|---|---|
| `Factor's Desk` (re-deal a Manifest) | *"I am still not a fan of manifests (and we have talked about improvements there) so Factor's Desk doesn't feel great."* | **RETIRED.** A power is only as good as the system it operates on, and that system is under review. |
| `Guild Residence` (2★ per Venture at end) | *"Benefits lots of buildings so you need them to use it well, and I am worried players will simply upgrade to it at the end if easy enough to do so. Not a strategic move or a contributor to an engine so we probably want a replacement."* | **RETIRED.** An end-count is a scoring line wearing a building's clothes — and under the FLIP it would have become strictly the best final purchase, which is precisely the failure named. |
| `Brewery` (a full BREW) | *"Brewery is good but you already have one."* | **RETIRED as a duplicate.** The *brew* theme keeps the full search at **L2** (Great Copper) and gives L1 the **blind top tile** instead, so the two faces differ from each other and from the Brewhouse. |
| `Warehouse` L1 (+1 cask may board) | *"Only good if you can utilize that and it is in the cask tile decks so I don't see a consistent engine taking advantage of it without aging being part of it (maybe it is age 2 + load anywhere)."* | **REBUILT to the designer's own suggestion, verbatim:** Age 2, then load 1 Ready cask onto ANY docked Ship. |

### 3d. The buffs — an L2 must pay L2 value

> *"Each of the L2s should feel that good and powerful. Assay makes casks ready, brew brews
> them, staple rights make them premium in value, and maybe guild wants to be a private die
> manipulator."*

| Change | From | To | Why |
|---|---|---|---|
| `Staple Rights` | +1★ per own cask | **+2★** ⚙ | *"It takes work to upgrade to it as an L2 so it should have L2 value. By the time you have it you need to brew, load and ship so that investment is worth a higher value."* |
| `Assay Loft` | 1 `H` → **one** cask READY | **2 `H` → EVERY** maturing cask READY | *"Assay loft is good, it basically says free ready (since you gain a good as the public benefit) but I wonder if we make it 2H → all ready."* Same price per cask at two; a genuine engine at four. |
| `Counting House` | +1 good per load | **+1★** ⚙ per load | *"+1 good is not that great, it ends up being +2 with the public benefit."* ★ on a load is the *points* theme doing its own job. |
| `Great Copper` | (was `Brewery`: BREW) | **2 goods + a full BREW** | *"Make 2 goods, brew, and public age 2. That feels right for a fun engine building."* Taken as given — the brew engine funds itself. |
| `Lagering Cellar` | (new — replaces the Residence's slot) | a vessel cask's **die +1**, cap 6 | *"Maybe guild wants to be a private die manipulator. +1 die value to boost."* A **lift**, not aging: it may pass the cask's quality. |

### 3e. The lane this opens

Named by the designer while reading the Rack House:

> *"Swap 2 dice is great, I could build an engine that makes level 5 hopped and gruit casks
> (potential lane that is only possible through an engine with venture buildings)."*

**Assay Loft** makes casks READY · **Great Copper** brews them · **Lagering Cellar** lifts
them past their quality · **Staple Rights** makes them premium on the sail. Four L2s that
chain — and **the FLIP is what makes holding all four reachable at all.** That is the whole
point of the letter: *"I want engine building to pay off"* now has a family that can be
built into an engine.

---

## 4. What landed

**Engine (`play.html`):** `VENTURES` re-keyed to `brew`/`age`/`die`/`points`; new kinds
`vbrew2` · `vagel` · `vlift` · `vgoodstar`; `flipVenture(slot,pid)` + `ventureFlip(key,free)`
paying `V_FEE_L2` (**you are buying the upgrade, not the ground**); `enterAge(…, ctx.thenLoad)`
and `enterSource(…, ctx.thenBrew)` chain the two multi-step owner lines; `VSTAR_PTS` 1→2;
`ASSAY_COST` `{h:2}`; `VRES_PTS` deleted with the Residence. `KEY hanse-v55`.

**Kit (`components.js`):** the `VENTURES` array rewritten as four themed entries with
explicit `art:` paths; `VPUB_STEP2` (`station-age-2`) added for the Great Copper's public
chip. **No new art is wanted by this letter** — every face draws on glyphs the kit already
owns. Six of the eight portraits carry over unchanged; **two are WANTED** and briefed in
`art/PROMPTS.md`: `venture-factor-l1` (now **Mash Tun**, currently wearing the retired
Factor's Desk) and `venture-warehouse-l2` (now **Lagering Cellar**, currently wearing the
retired Guild Residence).

**Surfaces:** `RULES.md` §3/§4/§5b/§6/§7/§8 + scoring · `COMPONENTS.md` §6b + §10 delta ·
`DESIGN.md` §1/§6/§9/§10 · `CLAUDE.md` §7 · `STYLE.md` (the FLIP · overbuild · theme enter
the registry) · `rulebook.html` (the three ways + a per-theme table + the scoring line) ·
`print.html` (the Venture sheet header + the manifest row) · `art/PROMPTS.md` ·
`art/ICONS.md`. Same pass, two drift fixes the re-derivation surfaced:

- the **Lagering Cellar's crest slug** aligned to `snowflake` on every surface (the engine
  had been saying `thermometer-snowflake` while the printed face said `snowflake` — one
  term, one icon);
- the **diagnostic dump** now names a Venture by its **face, level and owner** (`VENT Great
  Copper L2 [Sean]`). It had been printing **`BLDG undefined`** for every ring on the wharf,
  because a Venture carries no `b.b` and the slot loop only knew the Public Work branch.
  That is the surface the designer reads a playtest through, so a family-wide rewrite that
  left it blind would have made the next read useless. Gated by a check in §20d.

---

## 5. Gates

| Gate | Result |
|---|---|
| `verify-v4.js` | **380/380 ALL PASS** — new §20d (themed pairs · FLIP · overbuild) and §20e (the new L2 powers) |
| `sim.js 24` (2–4p, 72 games) | **0 crashes / 0 deadlocks.** Rounds 18.8 / 15.3 / 14.8; band 100% / 95.8% / 91.7% |
| `ai-render-smoke.js` | **ALL PASS** (7 configurations, all toggles) |
| `aid-overflow.js` | **ALL FIT** — 6 aid faces within their cards |

**The FLIP is the move players make:** **2.3–3.7 FLIPS per game** against **0.6–1.0**
overbuild climbs. The door the letter opened is the one that gets used — and L1 placements
rose too (4.1 → 6.8 across the counts), so the wharf now carries more rings than it did.

**Pace, honestly:** every out-of-band game is a **short** one (min 11 rounds) — nothing runs
long. 2p **recovered** from v5.4's dip (90% → 100% in band, 16.4 → 18.8 rounds); 3p and 4p
still finish ~1–2 rounds fast (95.8% / 91.7%). The cause is unchanged from the v5.4 watch —
the public-line goods faucet scales with the Venture population, and v5.5 puts more rings on
the wharf. **No pace dial was touched.** The levers, if a human table agrees it runs hot,
stay where §10 records them: the **tray size** (the ruled dial) or **thinning `vgold`** (now
on 2 of 8 faces). Measure before dialing.

**Known blind spot:** `Assay Loft` at 2 `H` is **unmeasured, not proven safe** — the greedy
bots reach for it **0.0 times per game** because they never hold a cellar wide enough to be
worth certifying. That buff is the steepest in the letter and the human table is its only
real instrument.
